/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* Canlı sınıf oyunları: ortak kod.
   1) Oyun mantığı: saf fonksiyonlar (Node ile birim testi yapılabilir: module.exports).
   2) Veri katmanı: Firebase Realtime Database (firebase-config.js doluysa) ya da yerel test modu
      (?test=1: BroadcastChannel + localStorage, aynı tarayıcının sekmeleri arasında).
   Her iki katman aynı arayüzü sunar: uid, get, set, update, remove, on, odaOlustur. */
(function (root) {
  'use strict';
  var C = {};

  /* ---------- sabitler ---------- */
  C.OYUNLAR = {
    ortalama: { ad: '2/3 Ortalaması', en: '2/3 of the Average', bolum: 2 },
    artirma: { ad: 'Kapalı Zarf Açık Artırma', en: 'Sealed-Bid Auction', bolum: 5 },
    ikilem: { ad: 'Mahkûmun İkilemi', en: "Prisoner's Dilemma", bolum: 3 },
    oylama: { ad: 'Condorcet Oylaması', en: 'Condorcet Voting', bolum: 7 }
  };
  C.SIRA = ['ortalama', 'artirma', 'ikilem', 'oylama'];
  C.ORT_MAX = 90;        /* Bölüm 2: 0 ile 90 arasında bir sayı */
  C.DEGER_MAX = 100;     /* özel değer: 0–100 TL */
  C.TEKLIF_MAX = 200;    /* teklif: 0–200 TL */
  C.GRUP = 4;            /* açık artırmada grup büyüklüğü */
  C.PC = '_pc';          /* Mahkûmun İkilemi: bilgisayar rakip (Tit-for-Tat) */
  C.GUN = 24 * 60 * 60 * 1000;
  /* Bölüm 2/3, Sam–John matrisi: kazanç = −(hapis yılı). Anahtar: benim seçimim + rakibin seçimi. */
  C.PD = { SS: -1, SI: -3, IS: 0, II: -2 };
  C.SECIM_AD = { S: 'Sessiz', I: 'İhanet' };
  C.SIRALAR = ['012', '021', '102', '120', '201', '210'];

  var EPS = 1e-9;

  /* ---------- yardımcılar ---------- */
  function rastgele(rng) { return (rng || Math.random)(); }

  C.karistir = function (dizi, rng) {
    var a = dizi.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rastgele(rng) * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };

  /* Firebase boş dizileri siler, dizileri nesneye çevirebilir: her zaman dizi döndür. */
  C.dizi = function (x) {
    if (!x) return [];
    if (Array.isArray(x)) return x.filter(function (v) { return v !== null && v !== undefined; });
    return Object.keys(x).sort(function (a, b) { return a - b; }).map(function (k) { return x[k]; });
  };

  C.sayiOku = function (metin) {
    var s = String(metin == null ? '' : metin).trim().replace(',', '.');
    if (!/^\d+(\.\d+)?$/.test(s)) return NaN;
    return Number(s);
  };

  C.bicim = function (x, basamak) {
    if (typeof x !== 'number' || !isFinite(x)) return '–';
    /* eksi işareti sunumlardaki gibi U+2212 */
    return x.toLocaleString('tr-TR', { maximumFractionDigits: basamak == null ? 2 : basamak }).replace(/^-/, '−');
  };

  C.odaKodu = function (rng) { return String(1000 + Math.floor(rastgele(rng) * 9000)); };

  /* n kişiyi en çok `boy` kişilik, boyları en çok 1 farklı gruplara böler (sıra korunur). */
  C.grupla = function (ids, boy) {
    var n = ids.length;
    if (!n) return [];
    var k = Math.ceil(n / boy), out = [], bas = 0;
    for (var g = 0; g < k; g++) {
      var b = Math.floor(n / k) + (g < n % k ? 1 : 0);
      out.push(ids.slice(bas, bas + b));
      bas += b;
    }
    return out;
  };

  /* ---------- 1. 2/3 ortalaması (Bölüm 2) ---------- */
  /* tahminler: { uid: sayı }. Hedefe en yakın tahmin(ler) kazanır; eşitlikte kazanç paylaşılır. */
  C.ortalamaSonuc = function (tahminler) {
    var ids = Object.keys(tahminler || {}).filter(function (u) {
      var v = tahminler[u];
      return typeof v === 'number' && v >= 0 && v <= C.ORT_MAX;
    });
    var n = ids.length;
    var histogram = [];
    for (var b = 0; b < 9; b++) histogram.push(0);
    if (!n) return { n: 0, ortalama: null, hedef: null, kazananlar: [], histogram: histogram, kisi: {} };
    var toplam = 0;
    ids.forEach(function (u) { toplam += tahminler[u]; });
    var ortalama = toplam / n, hedef = ortalama * 2 / 3;
    var enIyi = Infinity;
    ids.forEach(function (u) { enIyi = Math.min(enIyi, Math.abs(tahminler[u] - hedef)); });
    var kazananlar = ids.filter(function (u) { return Math.abs(tahminler[u] - hedef) - enIyi < EPS; }).sort();
    var kisi = {};
    ids.forEach(function (u) {
      var v = tahminler[u];
      histogram[Math.min(8, Math.floor(v / 10))]++;
      var kazandi = kazananlar.indexOf(u) >= 0;
      kisi[u] = { sayi: v, fark: Math.abs(v - hedef), kazandi: kazandi, pay: kazandi ? 1 / kazananlar.length : 0 };
    });
    return { n: n, ortalama: ortalama, hedef: hedef, kazananlar: kazananlar, histogram: histogram, kisi: kisi };
  };

  /* ---------- 2. Kapalı zarf açık artırma (Bölüm 5) ---------- */
  /* Aynı teklifler iki kurala göre sonuçlandırılır. Birinci fiyat: kazanan kendi teklifini öder.
     İkinci fiyat (Vickrey): kazanan ikinci en yüksek teklifi öder (grupta tek kişi varsa 0).
     En yüksek teklifte eşitlik: önce gönderen kazanır. */
  function grupSonuc(uyeler) {
    var s = uyeler.slice().sort(function (a, b) {
      return (b.teklif - a.teklif) || (a.zaman - b.zaman) || (a.uid < b.uid ? -1 : a.uid > b.uid ? 1 : 0);
    });
    var k = s[0], ikinci = s.length > 1 ? s[1].teklif : 0;
    return {
      uyeler: s.map(function (x) { return x.uid; }),
      kazanan: k.uid,
      birinci: { fiyat: k.teklif, kazanc: k.deger - k.teklif },
      ikinci: { fiyat: ikinci, kazanc: k.deger - ikinci }
    };
  }

  /* teklifler: [{ uid, teklif, deger, zaman }], mod: 'grup4' | 'sinif' */
  C.artirmaSonuc = function (teklifler, mod, rng) {
    var liste = (teklifler || []).filter(function (t) {
      return typeof t.teklif === 'number' && typeof t.deger === 'number' && t.teklif >= 0 && t.teklif <= C.TEKLIF_MAX;
    });
    var ids = liste.map(function (t) { return t.uid; });
    var harita = {};
    liste.forEach(function (t) { harita[t.uid] = { uid: t.uid, teklif: t.teklif, deger: t.deger, zaman: t.zaman || 0 }; });
    var gruplar = mod === 'sinif' ? (ids.length ? [ids.slice()] : []) : C.grupla(C.karistir(ids, rng), C.GRUP);
    var sonuc = { mod: mod === 'sinif' ? 'sinif' : 'grup4', n: liste.length, gruplar: [], kisi: {},
      gelir: { birinci: 0, ikinci: 0 }, kazanc: { birinci: 0, ikinci: 0 } };
    gruplar.forEach(function (g, gi) {
      var r = grupSonuc(g.map(function (u) { return harita[u]; }));
      sonuc.gruplar.push(r);
      sonuc.gelir.birinci += r.birinci.fiyat;
      sonuc.gelir.ikinci += r.ikinci.fiyat;
      sonuc.kazanc.birinci += r.birinci.kazanc;
      sonuc.kazanc.ikinci += r.ikinci.kazanc;
      g.forEach(function (u) {
        var w = u === r.kazanan;
        sonuc.kisi[u] = {
          grup: gi + 1, boy: g.length, deger: harita[u].deger, teklif: harita[u].teklif,
          birinci: { kazandi: w, fiyat: w ? r.birinci.fiyat : 0, kazanc: w ? r.birinci.kazanc : 0 },
          ikinci: { kazandi: w, fiyat: w ? r.ikinci.fiyat : 0, kazanc: w ? r.ikinci.kazanc : 0 }
        };
      });
    });
    return sonuc;
  };

  /* Her katılımcıya 0–100 TL arası tam sayı özel değer. */
  C.degerAta = function (ids, rng) {
    var out = {};
    ids.forEach(function (u) { out[u] = Math.floor(rastgele(rng) * (C.DEGER_MAX + 1)); });
    return out;
  };

  /* ---------- 3. Mahkûmun İkilemi (Bölüm 3) ---------- */
  /* Rastgele ikili eşleşme; tek sayıda biri bilgisayarla (C.PC) eşleşir.
     onceki verilirse (tekrarlı oyun) hâlâ odada olan çiftler korunur, kalanlar yeniden eşleşir. */
  C.ikilemEslestir = function (ids, rng, onceki) {
    var var_ = {}, out = {}, havuz = [];
    ids.forEach(function (u) { var_[u] = true; });
    if (onceki) {
      ids.forEach(function (u) {
        var r = onceki[u];
        if (r && r !== C.PC && var_[r] && onceki[r] === u) out[u] = r;
      });
    }
    ids.forEach(function (u) { if (!out[u]) havuz.push(u); });
    havuz = C.karistir(havuz.sort(), rng);
    for (var i = 0; i + 1 < havuz.length; i += 2) { out[havuz[i]] = havuz[i + 1]; out[havuz[i + 1]] = havuz[i]; }
    if (havuz.length % 2) out[havuz[havuz.length - 1]] = C.PC;
    return out;
  };

  /* Tit-for-Tat: ilk tur sessiz, sonra rakibin (öğrencinin) bir önceki seçimini kopyalar. */
  C.titForTat = function (oncekiSecim) { return oncekiSecim === 'I' ? 'I' : 'S'; };

  C.pdKazanc = function (ben, o) { return C.PD[ben + o]; };

  /* esler: { uid: rakipUid | C.PC }, secimler: { uid: 'S'|'I' }, onceki: { uid: 'S'|'I' } (bir önceki tur).
     Cevap vermeyen öğrencinin eşi o tur bilgisayara (Tit-for-Tat) karşı oynamış sayılır. */
  C.ikilemSonuc = function (esler, secimler, onceki) {
    esler = esler || {}; secimler = secimler || {}; onceki = onceki || {};
    var gecerli = function (u) { return secimler[u] === 'S' || secimler[u] === 'I'; };
    var bitti = {}, eslesmeler = [], kisi = {};
    var dagilim = { SS: 0, SI: 0, II: 0 }, sayac = { S: 0, I: 0 }, toplam = 0;
    Object.keys(esler).sort().forEach(function (u) {
      if (bitti[u] || !gecerli(u)) return;
      var r = esler[u], insan = r && r !== C.PC && gecerli(r) && esler[r] === u;
      var sa = secimler[u], sb = insan ? secimler[r] : C.titForTat(onceki[u]);
      var ka = C.pdKazanc(sa, sb), kb = C.pdKazanc(sb, sa);
      bitti[u] = true;
      kisi[u] = { secim: sa, rakip: insan ? r : C.PC, rakipSecim: sb, kazanc: ka };
      if (insan) {
        bitti[r] = true;
        kisi[r] = { secim: sb, rakip: u, rakipSecim: sa, kazanc: kb };
      }
      eslesmeler.push({ a: u, b: insan ? r : C.PC, sa: sa, sb: sb, ka: ka, kb: kb });
      dagilim[sa === sb ? sa + sb : 'SI']++;
    });
    var insanlar = Object.keys(kisi);
    insanlar.forEach(function (u) { sayac[kisi[u].secim]++; toplam += kisi[u].kazanc; });
    var n = insanlar.length;
    return {
      n: n, eslesmeler: eslesmeler, dagilim: dagilim, secim: sayac, kisi: kisi,
      ortKazanc: n ? toplam / n : null,
      herkesSessiz: C.PD.SS, herkesIhanet: C.PD.II
    };
  };

  /* ---------- 4. Condorcet oylaması (Bölüm 7) ---------- */
  /* siralar: ['021', ...] (aday indeksleri, en çok tercih edilen önce), m: aday sayısı. */
  C.oylamaSonuc = function (siralar, m) {
    m = m || 3;
    var oylar = (siralar || []).filter(function (s) {
      if (typeof s !== 'string' || s.length !== m) return false;
      for (var i = 0; i < m; i++) if (s.indexOf(String(i)) < 0) return false;
      return true;
    });
    var n = oylar.length, i, j;
    var profil = {};
    oylar.forEach(function (s) { profil[s] = (profil[s] || 0) + 1; });

    /* ikili karşılaştırma: ikili[i][j] = i'yi j'ye tercih eden seçmen sayısı */
    var ikili = [];
    for (i = 0; i < m; i++) { ikili.push([]); for (j = 0; j < m; j++) ikili[i].push(0); }
    oylar.forEach(function (s) {
      for (var a = 0; a < m; a++) for (var b = a + 1; b < m; b++) ikili[+s[a]][+s[b]]++;
    });
    var galibiyet = [];
    for (i = 0; i < m; i++) {
      galibiyet.push(0);
      for (j = 0; j < m; j++) if (i !== j && ikili[i][j] > ikili[j][i]) galibiyet[i]++;
    }
    var condorcet = null;
    for (i = 0; i < m; i++) if (n && galibiyet[i] === m - 1) condorcet = i;
    /* döngü: her aday en az bir kez yeniliyor ve hiçbir çift berabere değil (3 adayda A≻B≻C≻A) */
    var beraberlik = false;
    for (i = 0; i < m; i++) for (j = i + 1; j < m; j++) if (ikili[i][j] === ikili[j][i]) beraberlik = true;
    var dongu = n > 0 && condorcet === null && !beraberlik;

    function enIyiler(puan) {
      if (!n) return [];
      var mx = Math.max.apply(null, puan);
      return puan.map(function (p, k) { return p === mx ? k : -1; }).filter(function (k) { return k >= 0; });
    }

    var birinci = [], borda = [];
    for (i = 0; i < m; i++) { birinci.push(0); borda.push(0); }
    oylar.forEach(function (s) {
      birinci[+s[0]]++;
      for (var p = 0; p < m; p++) borda[+s[p]] += m - 1 - p;   /* Borda: 1. sıra m−1, …, son sıra 0 */
    });

    /* anında ikinci tur: salt çoğunluk (> n/2) yoksa en az birinci tercih alan elenir;
       en azda eşitlik varsa eşit adayların hepsi birlikte elenir; kalanların hepsi eşitse beraberlik. */
    var kalan = [], turlar = [], irv = [];
    for (i = 0; i < m; i++) kalan.push(i);
    while (n && kalan.length) {
      var say = {};
      kalan.forEach(function (c) { say[c] = 0; });
      oylar.forEach(function (s) {
        for (var p = 0; p < m; p++) if (say[+s[p]] !== undefined) { say[+s[p]]++; break; }
      });
      var tur = { sayim: kalan.map(function (c) { return [c, say[c]]; }), elenen: [] };
      turlar.push(tur);
      var lider = kalan.filter(function (c) { return 2 * say[c] > n; });
      if (lider.length) { irv = lider; break; }
      if (kalan.length === 1) { irv = kalan.slice(); break; }
      var mn = Math.min.apply(null, kalan.map(function (c) { return say[c]; }));
      var enAz = kalan.filter(function (c) { return say[c] === mn; });
      if (enAz.length === kalan.length) { irv = kalan.slice(); break; }
      tur.elenen = enAz;
      kalan = kalan.filter(function (c) { return enAz.indexOf(c) < 0; });
    }

    return {
      n: n, m: m, profil: profil, ikili: ikili, galibiyet: galibiyet, condorcet: condorcet, dongu: dongu,
      cogulluk: { puan: birinci, kazananlar: enIyiler(birinci) },
      borda: { puan: borda, kazananlar: enIyiler(borda) },
      irv: { turlar: turlar, kazananlar: irv }
    };
  };

  /* ---------- veri katmanı ---------- */
  function temiz(v) { return v === undefined ? null : JSON.parse(JSON.stringify(v)); }

  var FB_SURUM = '10.12.2';

  function firebaseKatmani(cfg) {
    var base = 'https://www.gstatic.com/firebasejs/' + FB_SURUM + '/';
    return Promise.all([
      import(base + 'firebase-app.js'),
      import(base + 'firebase-auth.js'),
      import(base + 'firebase-database.js')
    ]).then(function (m) {
      var A = m[0], Au = m[1], D = m[2];
      var app = A.initializeApp(cfg);
      var auth = Au.getAuth(app);
      var db = D.getDatabase(app);
      return new Promise(function (res) {
        var bitir = Au.onAuthStateChanged(auth, function (user) { bitir(); res(user); });
      }).then(function (user) {
        return user || Au.signInAnonymously(auth).then(function (c) { return c.user; });
      }).then(function (user) {
        var r = function (p) { return D.ref(db, p); };
        return {
          tur: 'firebase',
          uid: user.uid,
          get: function (p) { return D.get(r(p)).then(function (s) { return s.val(); }); },
          set: function (p, v) { return D.set(r(p), temiz(v)); },
          update: function (p, o) { return D.update(r(p), temiz(o)); },
          remove: function (p) { return D.remove(r(p)); },
          on: function (p, cb) {
            return D.onValue(r(p), function (s) { cb(s.val()); }, function (e) {
              if (root.console) console.warn('Canlı: okuma reddedildi', p, e && e.code);
              cb(null);
            });
          },
          /* oda kodu boşsa meta yazılır (true); doluysa yazılmaz (false) */
          odaOlustur: function (kod, meta) {
            return D.runTransaction(r('rooms/' + kod + '/meta'), function (cur) {
              return cur === null ? temiz(meta) : undefined;
            }).then(function (t) { return t.committed; });
          }
        };
      });
    });
  }

  function testKatmani() {
    var ANAHTAR = 'canli-test-db';
    var uid;
    try {
      uid = sessionStorage.getItem('canli-test-uid');
      if (!uid) { uid = 't' + Math.random().toString(36).slice(2, 10); sessionStorage.setItem('canli-test-uid', uid); }
    } catch (e) { uid = 't' + Math.random().toString(36).slice(2, 10); }
    var kanal = typeof BroadcastChannel === 'function' ? new BroadcastChannel('canli-test') : null;
    var aboneler = [];

    function yukle() { try { return JSON.parse(localStorage.getItem(ANAHTAR)) || {}; } catch (e) { return {}; } }
    function parcala(p) { return String(p).split('/').filter(Boolean); }
    function oku(db, p) {
      var x = db;
      parcala(p).forEach(function (k) { x = x && typeof x === 'object' ? x[k] : undefined; });
      return x === undefined ? null : x;
    }
    function bosalt(x) {
      if (!x || typeof x !== 'object') return x;
      Object.keys(x).forEach(function (k) {
        x[k] = bosalt(x[k]);
        if (x[k] === null || x[k] === undefined || (typeof x[k] === 'object' && !Object.keys(x[k]).length)) delete x[k];
      });
      return x;
    }
    function yaz(db, p, v) {
      var ks = parcala(p), x = db;
      for (var i = 0; i < ks.length - 1; i++) {
        if (!x[ks[i]] || typeof x[ks[i]] !== 'object') x[ks[i]] = {};
        x = x[ks[i]];
      }
      if (v === null || v === undefined) delete x[ks[ks.length - 1]];
      else x[ks[ks.length - 1]] = v;
    }
    function bildir(db) {
      aboneler.forEach(function (s) {
        var v = JSON.stringify(oku(db, s.yol));
        if (v !== s.son) { s.son = v; s.cb(JSON.parse(v)); }
      });
    }
    function kaydet(db) {
      db = bosalt(db);
      try { localStorage.setItem(ANAHTAR, JSON.stringify(db)); } catch (e) { /* kota */ }
      if (kanal) kanal.postMessage('degisti');
      bildir(db);
      return Promise.resolve();
    }
    if (kanal) kanal.onmessage = function () { bildir(yukle()); };
    root.addEventListener('storage', function (e) { if (e.key === ANAHTAR) bildir(yukle()); });

    return Promise.resolve({
      tur: 'test',
      uid: uid,
      get: function (p) { return Promise.resolve(oku(yukle(), p)); },
      set: function (p, v) { var db = yukle(); yaz(db, p, temiz(v)); return kaydet(db); },
      update: function (p, o) {
        var db = yukle(); o = temiz(o);
        Object.keys(o).forEach(function (k) { yaz(db, p + '/' + k, o[k]); });
        return kaydet(db);
      },
      remove: function (p) { var db = yukle(); yaz(db, p, null); return kaydet(db); },
      on: function (p, cb) {
        var s = { yol: p, cb: cb, son: undefined };
        aboneler.push(s);
        setTimeout(function () { bildir(yukle()); }, 0);
        return function () { aboneler = aboneler.filter(function (x) { return x !== s; }); };
      },
      odaOlustur: function (kod, meta) {
        var db = yukle();
        if (oku(db, 'rooms/' + kod + '/meta')) return Promise.resolve(false);
        yaz(db, 'rooms/' + kod + '/meta', temiz(meta));
        return kaydet(db).then(function () { return true; });
      }
    });
  }

  C.testModu = function () { return /[?&]test=1(&|$)/.test(root.location ? root.location.search : ''); };

  /* Adreste ?test=1 varsa (yapılandırma dolu olsa bile) yerel test modu; yoksa Firebase yapılandırması
     varsa Firebase; ikisi de yoksa null ("Kurulum tamamlanmadı"). */
  C.baglan = function () {
    if (C.testModu()) return testKatmani();
    if (root.CANLI_FIREBASE && root.CANLI_FIREBASE.databaseURL) return firebaseKatmani(root.CANLI_FIREBASE);
    return Promise.resolve(null);
  };

  /* ---------- küçük arayüz yardımcıları ---------- */
  C.kacis = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  C.siraMetni = function (sira, adaylar) {
    return String(sira).split('').map(function (k) { return adaylar[+k]; }).join(' ≻ ');
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = C;
  else root.Canli = C;
})(typeof window !== 'undefined' ? window : globalThis);
