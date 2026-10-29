/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* Bölüm 2 ek sunumu: Minimaks ve Alfa-Beta Budaması — etkileşimli slaytlar.
   deck.js'ten sonra yüklenir. Her demo data-demo özniteliğiyle bulunur ve sayfa yüklenince ilk durumunu çizer:
     b02m-xox-oyun   YZ'ye karşı XOX (YZ hamleden önce her boş karenin değerini yazar)
     b02m-agac       soyut ağaçta adım adım minimaks / alfa-beta (data-tree, data-mode)
     b02m-tahmin     düğmeyle açılan cevap
     b02m-nim        Nim konumunun tam oyun ağacı ve minimaks değerleri
     b02m-xox-lab    XOX konum kurma: her boş karenin değeri, seçilen hamle ve gerekçesi
     b02m-xox-agac   orta oyun XOX konumunun tam ağacında adım adım minimaks
     b02m-sirala     hamle sıralaması: aynı ağaçta alfa-betanın değerlendirdiği yaprak sayısı
     b02m-xox-sayac  boş XOX tahtasından tam arama: düğüm sayıları ve süreler
     b02m-d4         YZ'ye karşı Dörtlü Bağla (derinlik sınırlı minimaks ve alfa-beta)
     b02m-d4-sira    Dörtlü Bağla başlangıç konumunda derinliğe göre düğüm sayıları
   Tüm değerler bu betikte hesaplanır; window.b02mOzSinama() minimaks ile alfa-betayı rastgele ağaç ve
   konumlarda karşılaştırır. */
(function () {
  "use strict";
  var tarayici = typeof document !== "undefined";
  if (tarayici && ["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) < 0) return;
  var INF = Infinity;

  /* ================= yardımcılar: sayı biçimi ve Türkçe ekler ================= */
  function sayi(n) {
    if (n === INF) return "+∞";
    if (n === -INF) return "−∞";
    var s = String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (n < 0 ? "−" : "") + s;
  }
  function isaretli(n) { return n > 0 && isFinite(n) ? "+" + sayi(n) : sayi(n); }
  var BIRLER = ["sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
  var ONLAR = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
  var HARF = { A: "a", B: "be", C: "ce", D: "de", E: "e", F: "fe", G: "ge", H: "he", I: "ı", J: "je", K: "ke", L: "le",
    M: "me", N: "ne", O: "o", P: "pe", R: "re", S: "se", T: "te", U: "u", V: "ve", Y: "ye", Z: "ze", X: "iks" };
  function okunus(x) {
    if (typeof x === "number") {
      if (!isFinite(x)) return "sonsuz";
      var n = Math.abs(Math.round(x));
      if (n === 0) return "sıfır";
      if (n % 10) return BIRLER[n % 10];
      if (n % 100) return ONLAR[(n % 100) / 10];
      if (n % 1000) return "yüz";
      if (n % 1000000) return "bin";
      return "milyon";
    }
    var s = String(x);
    return HARF[s.charAt(s.length - 1)] || s.toLowerCase();
  }
  /* tur: "de" bulunma, "den" ayrılma, "e" yönelme, "i" belirtme, "in" ilgi, "si" iyelik */
  function ek(x, tur) {
    var w = okunus(x), un = w.match(/[aeıioöuü]/g), u = un ? un[un.length - 1] : "e";
    var son = w.charAt(w.length - 1), unlu = /[aeıioöuü]/.test(son), sert = /[fstkçşhp]/.test(son);
    var a = /[aıou]/.test(u) ? "a" : "e";
    var i4 = { a: "ı", "ı": "ı", o: "u", u: "u", e: "i", i: "i", "ö": "ü", "ü": "ü" }[u];
    var e;
    if (tur === "de") e = (sert ? "t" : "d") + a;
    else if (tur === "den") e = (sert ? "t" : "d") + a + "n";
    else if (tur === "e") e = (unlu ? "y" : "") + a;
    else if (tur === "i") e = (unlu ? "y" : "") + i4;
    else if (tur === "si") e = (unlu ? "s" : "") + i4;
    else e = (unlu ? "n" : "") + i4 + "n";
    return (typeof x === "number" ? sayi(x) : String(x)) + "'" + e;
  }
  function bas(t) { return t.charAt(0).toLocaleUpperCase("tr-TR") + t.slice(1); }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function karistir(a, rnd) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function simdi() { return (typeof performance !== "undefined" ? performance : Date).now(); }
  function ms(t) { return t < 10 ? String(Math.round(t * 10) / 10).replace(".", ",") : String(Math.round(t)); }

  /* ================= soyut oyun ağacı ================= */
  /* spec: iç içe diziler, sayı = yaprak. Kök MAX; katmanlar MAX/MIN diye değişir. İç düğümlere
     enine sırayla harf verilir (A, B, C, …). */
  var HARFLER = "ABCDEFGHIJKLMNPRSTUVYZ";
  function agacKur(spec, kokMax) {
    var dugum = [];
    function mk(s, derinlik, ata, sira) {
      var n = { id: dugum.length, derinlik: derinlik, max: (derinlik % 2 === 0) === (kokMax !== false), ata: ata, sira: sira, cocuk: [] };
      dugum.push(n);
      if (typeof s === "number") { n.yaprak = true; n.deger = s; }
      else if (s && s.cocuk) { /* hazır düğüm nesnesi (XOX, Nim) */
        for (var k in s) if (k !== "cocuk") n[k] = s[k];
        s.cocuk.forEach(function (c, i) { n.cocuk.push(mk(c, derinlik + 1, n, i)); });
        if (!n.cocuk.length) n.yaprak = true;
      } else s.forEach(function (c, i) { n.cocuk.push(mk(c, derinlik + 1, n, i)); });
      return n;
    }
    var kok = mk(spec, 0, null, 0), kuyruk = [kok], h = 0;
    while (kuyruk.length) {
      var n = kuyruk.shift();
      if (!n.yaprak) n.ad = HARFLER.charAt(h++ % HARFLER.length);
      n.cocuk.forEach(function (c) { kuyruk.push(c); });
    }
    return { kok: kok, dugum: dugum, yaprakSay: dugum.filter(function (n) { return n.yaprak; }).length };
  }
  function tamMinimaks(n) {
    if (n.yaprak) return n.deger;
    var v = n.max ? -INF : INF;
    n.cocuk.forEach(function (c) { var w = tamMinimaks(c); v = n.max ? Math.max(v, w) : Math.min(v, w); });
    return v;
  }
  function tamAlfaBeta(n, a, b, say) {
    if (n.yaprak) { say.yaprak++; return n.deger; }
    var v = n.max ? -INF : INF;
    for (var k = 0; k < n.cocuk.length; k++) {
      var w = tamAlfaBeta(n.cocuk[k], a, b, say);
      if (n.max) { v = Math.max(v, w); a = Math.max(a, v); } else { v = Math.min(v, w); b = Math.min(b, v); }
      if (a >= b) break;
    }
    return v;
  }
  function rol(n) { return n.max ? "MAX" : "MIN"; }

  /* olay listeleri: her olay bir adım; mesaj tam Türkçe cümle */
  function izMinimaks(agac, o) {
    o = o || {};
    var ev = [], F = o.fmt || sayi;
    function yAd(c) { return o.yaprakAd ? o.yaprakAd(c) : "Yaprak " + sayi(c.deger) + " okunur"; }
    function rec(n) {
      ev.push({ t: "gir", n: n, m: n.ata ? n.ad + " düğümüne inilir (" + rol(n) + "): değer " + (n.max ? "−∞" : "+∞") + " ile başlar." :
        n.ad + " (" + rol(n) + ") aranmaya başlar: değer −∞ ile başlar, çocuklar soldan sağa ziyaret edilir." });
      var v = n.max ? -INF : INF;
      n.cocuk.forEach(function (c, k) {
        var w = c.yaprak ? c.deger : rec(c), once = v;
        v = n.max ? Math.max(v, w) : Math.min(v, w);
        var son = k === n.cocuk.length - 1;
        var m = (c.yaprak ? yAd(c) : ek(c.ad, "in") + " değeri " + F(w)) + " → " + n.ad + " (" + rol(n) + "): " +
          (n.max ? "max" : "min") + "(" + F(once) + ", " + F(w) + ") = " + F(v) + ".";
        if (son) m += n.ata ? " " + n.ad + " tamamlandı, değeri " + F(v) + " olarak " + ek(n.ata.ad, "e") + " döner." : "";
        ev.push({ t: "guncelle", n: n, c: c, v: v, son: son, m: m });
      });
      return v;
    }
    var v = rec(agac.kok), en = null;
    agac.kok.cocuk.forEach(function (c) { if (en === null && tamMinimaks(c) === v) en = c; });
    ev.push({ t: "bitti", v: v, en: en, m: "Kökün değeri " + F(v) + ": " + rol(agac.kok) + ", " + (en.ad ? ek(en.ad, "e") + " giden" : "kalın kenardaki") +
      " hamleyi seçer. " + sayi(agac.yaprakSay) + " yaprağın hepsi değerlendirildi." });
    return ev;
  }
  function izAlfaBeta(agac) {
    var ev = [];
    function aralik(a, b) { return "[" + sayi(a) + ", " + sayi(b) + "]"; }
    function rec(n, a, b) {
      ev.push({ t: "gir", n: n, a: a, b: b, m: n.ata ? n.ad + " düğümüne inilir (" + rol(n) + "): [α, β] = " + aralik(a, b) + " aralığı yukarıdan gelir." :
        n.ad + " (" + rol(n) + ") aranmaya başlar: α = −∞, β = +∞." });
      var v = n.max ? -INF : INF, en = null;
      for (var k = 0; k < n.cocuk.length; k++) {
        var c = n.cocuk[k], w = c.yaprak ? c.deger : rec(c, a, b).v, once = v, a0 = a, b0 = b;
        if (n.max) { if (w > v) { v = w; en = c; } a = Math.max(a, v); } else { if (w < v) { v = w; en = c; } b = Math.min(b, v); }
        var son = k === n.cocuk.length - 1;
        var m = (c.yaprak ? "Yaprak " + sayi(w) + " okunur" : ek(c.ad, "in") + " değeri " + sayi(w)) + " → " + n.ad + " (" + rol(n) + "): değer = " +
          (n.max ? "max" : "min") + "(" + sayi(once) + ", " + sayi(w) + ") = " + sayi(v) + ", " + (n.max ? "α = max(" + sayi(a0) + ", " + sayi(v) + ") = " + sayi(a) : "β = min(" + sayi(b0) + ", " + sayi(v) + ") = " + sayi(b)) + ".";
        if (son) m += n.ata ? " " + n.ad + " tamamlandı, " + sayi(v) + " olarak " + ek(n.ata.ad, "e") + " döner." : "";
        ev.push({ t: "guncelle", n: n, c: c, v: v, a: a, b: b, son: son, m: m });
        if (a >= b) {
          if (!son) {
            var kalan = n.cocuk.slice(k + 1);
            var neden = n.max ? n.ad + " en az " + sayi(v) + " verir; yukarıdaki MIN " + ek(b, "i") + " zaten garanti ediyor, " + ek(n.ad, "i") + " seçmez."
              : n.ad + " en fazla " + sayi(v) + " verir; yukarıdaki MAX " + ek(a, "i") + " zaten garanti ediyor, " + ek(n.ad, "i") + " seçmez.";
            ev.push({ t: "buda", n: n, v: v, kalan: kalan, m: n.ad + " düğümünde " + (n.max ? "α = " + sayi(a) + " ≥ β = " + sayi(b) : "β = " + sayi(b) + " ≤ α = " + sayi(a)) +
              ": kalan " + (kalan.length === 1 ? "çocuk" : sayi(kalan.length) + " çocuk") + " budandı. " + neden +
              (n.ata ? " " + n.ad + ", " + sayi(v) + " olarak " + ek(n.ata.ad, "e") + " döner." : "") });
          }
          break;
        }
      }
      return { v: v, en: en };
    }
    var r = rec(agac.kok, -INF, INF), say = { yaprak: 0 };
    tamAlfaBeta(agac.kok, -INF, INF, say);
    ev.push({ t: "bitti", v: r.v, en: r.en, m: "Kökün değeri " + sayi(r.v) + ": " + rol(agac.kok) + ", " + ek(r.en.ad, "e") + " giden hamleyi seçer. " +
      sayi(agac.yaprakSay) + " yaprağın " + ek(say.yaprak, "si") + " değerlendirildi, " + ek(agac.yaprakSay - say.yaprak, "si") + " budandı." });
    return ev;
  }
  /* k. adıma kadar olayları uygula */
  function durum(agac, ev, k) {
    var s = { deg: {}, bitti: {}, gez: {}, ab: {}, kes: {}, kesKenar: {}, yigin: [], cur: null, yaprak: 0, en: null, m: "" };
    function kesAlt(n) { s.kes[n.id] = true; n.cocuk.forEach(kesAlt); }
    for (var i = 0; i <= k && i < ev.length; i++) {
      var e = ev[i];
      s.m = e.m;
      if (e.t === "gir") {
        s.gez[e.n.id] = true; s.yigin.push(e.n); s.cur = e.n; s.deg[e.n.id] = e.n.max ? -INF : INF;
        if (e.a !== undefined) s.ab[e.n.id] = [e.a, e.b];
      } else if (e.t === "guncelle") {
        if (e.c.yaprak) { s.gez[e.c.id] = true; s.bitti[e.c.id] = true; s.deg[e.c.id] = e.c.deger; s.yaprak++; }
        s.cur = e.n; s.deg[e.n.id] = e.v;
        if (e.a !== undefined) s.ab[e.n.id] = [e.a, e.b];
        if (e.son) { s.bitti[e.n.id] = true; s.yigin.pop(); }
      } else if (e.t === "buda") {
        e.kalan.forEach(function (c) { kesAlt(c); });
        s.kesKenar[e.kalan[0].id] = true;
        s.bitti[e.n.id] = true; s.yigin.pop(); s.cur = e.n;
      } else if (e.t === "bitti") {
        s.cur = null; s.en = e.en; s.yigin = [];
      }
    }
    return s;
  }

  /* ---------- ağaç çizimi (SVG metni) ---------- */
  function yerlesim(agac, o) {
    var yap = [], derin = 0;
    (function dfs(n) { derin = Math.max(derin, n.derinlik); if (n.yaprak) yap.push(n); n.cocuk.forEach(dfs); })(agac.kok);
    var adim = yap.length > 1 ? (o.W - o.solPay - o.sagPay) / (yap.length - 1) : 0;
    yap.forEach(function (n, i) { n.x = yap.length > 1 ? o.solPay + i * adim : o.W / 2; });
    (function yuk(n) {
      n.y = o.ust + n.derinlik * o.dy;
      if (!n.yaprak) { n.cocuk.forEach(yuk); n.x = (n.cocuk[0].x + n.cocuk[n.cocuk.length - 1].x) / 2; }
    })(agac.kok);
    return { derin: derin, H: o.ust + derin * o.dy + o.alt };
  }
  function ucgen(x, y, w, h, max) {
    return max ? x + "," + (y - h / 2) + " " + (x + w / 2) + "," + (y + h / 2) + " " + (x - w / 2) + "," + (y + h / 2)
      : x + "," + (y + h / 2) + " " + (x + w / 2) + "," + (y - h / 2) + " " + (x - w / 2) + "," + (y - h / 2);
  }
  function degSinif(v, renkli) { return !renkli || v === 0 ? "" : v > 0 ? " b02m-pos" : " b02m-neg"; }
  /* s: durum (null → hepsi görünür, değer yok), o: seçenekler */
  function agacSvg(agac, s, o) {
    var L = yerlesim(agac, o), out = [], w = o.w || 34, h = o.h || 28;
    var etiket = o.katman || ["MAX", "MIN", "MAX", "MIN", "MAX", "MIN"];
    if (o.katmanYaz !== false) {
      for (var d = 0; d <= L.derin; d++) {
        var lb = d === L.derin && !o.karisik ? "yaprak" : (agac.kok.max === (d % 2 === 0) ? "MAX" : "MIN");
        if (o.katman) lb = etiket[d] || lb;
        out.push('<text class="lbl" x="2" y="' + (o.ust + d * o.dy + 4) + '" text-anchor="start">' + lb + "</text>");
      }
    }
    agac.dugum.forEach(function (n) {
      if (!n.ata) return;
      var c = ["b02m-e"];
      if (s) {
        if (s.kes[n.id]) c.push("is-cut");
        else if (!s.gez[n.id]) c.push("is-new");
        if (s.en === n || (s.enler && s.enler[n.id])) c.push("is-best");
      }
      var y1 = n.ata.y + (o.dugumH ? o.dugumH / 2 : h / 2), y2 = n.y - (n.yaprak && !o.dugumH ? 12 : (o.dugumH ? o.dugumH / 2 : h / 2));
      out.push('<line class="' + c.join(" ") + '" x1="' + n.ata.x + '" y1="' + y1 + '" x2="' + n.x + '" y2="' + y2 + '"/>');
      if (s && s.kesKenar[n.id]) {
        out.push('<text class="b02m-cutl" x="' + ((n.ata.x + n.x) / 2 + (n.x >= n.ata.x ? 6 : -6)) + '" y="' + ((y1 + y2) / 2) + '" text-anchor="' + (n.x >= n.ata.x ? "start" : "end") + '">budandı</text>');
      }
    });
    agac.dugum.forEach(function (n) {
      var c = ["b02m-g"];
      if (s) {
        if (s.kes[n.id]) c.push("is-cut");
        else if (s.cur === n) c.push("is-cur");
        else if (s.yigin.indexOf(n) >= 0) c.push("is-stack");
        else if (!s.gez[n.id]) c.push("is-new");
      }
      out.push('<g class="' + c.join(" ") + '">');
      if (o.dugumCiz) out.push(o.dugumCiz(n, s));
      else if (n.yaprak) {
        out.push('<rect class="b02m-n" x="' + (n.x - 15) + '" y="' + (n.y - 12) + '" width="30" height="24" rx="4"/>');
        out.push('<text class="b02m-lv" x="' + n.x + '" y="' + (n.y + 5) + '" text-anchor="middle">' + sayi(n.deger) + "</text>");
      } else {
        out.push('<polygon class="b02m-n" points="' + ucgen(n.x, n.y, w, h, n.max) + '"/>');
        if (n.ad && o.adYaz !== false) out.push('<text class="b02m-nm" x="' + n.x + '" y="' + (n.y + (n.max ? 8 : 1)) + '" text-anchor="middle">' + n.ad + "</text>");
      }
      if (s && !n.yaprak && s.deg[n.id] !== undefined && !s.kes[n.id] && o.degerYaz !== false) {
        var v = s.deg[n.id], tmp = !s.bitti[n.id];
        out.push('<text class="b02m-v' + (tmp ? " is-tmp" : "") + degSinif(v, o.renkli) + '" x="' + (n.x + (o.degerDx || 20)) + '" y="' + (n.y + 5) + '" text-anchor="start">' + (o.degerYazi ? o.degerYazi(v) : sayi(v)) + "</text>");
      }
      if (s && s.ab[n.id] && !s.kes[n.id] && o.abYaz !== false) {
        out.push('<text class="b02m-ab" x="' + (n.x - 21) + '" y="' + (n.y + 5) + '" text-anchor="end">[' + sayi(s.ab[n.id][0]) + ", " + sayi(s.ab[n.id][1]) + "]</text>");
      }
      out.push("</g>");
    });
    return '<svg class="ds-svg" viewBox="0 0 ' + o.W + " " + L.H + '" width="' + o.W + '" height="' + L.H + '" role="img" aria-label="' + esc(o.aria || "Oyun ağacı") + '">' + out.join("") + "</svg>";
  }

  /* ================= XOX ================= */
  var CIZGI = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  var KARE = ["sol üst", "üst orta", "sağ üst", "sol orta", "merkez", "sağ orta", "sol alt", "alt orta", "sağ alt"];
  var SIRA_MKK = [4, 0, 2, 6, 8, 1, 3, 5, 7], SIRA_DUZ = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  function xKazanan(b) {
    for (var i = 0; i < 8; i++) { var l = CIZGI[i]; if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) return b[l[0]]; }
    return "";
  }
  function xDolu(b) { for (var i = 0; i < 9; i++) if (!b[i]) return false; return true; }
  function rakip(p) { return p === "X" ? "O" : "X"; }
  function xUc(w, d, ceza) { return (ceza ? 10 - d : 1) * (w === "X" ? 1 : -1); }
  function xMM(b, p, d, ceza, say) {
    say.n++;
    var w = xKazanan(b);
    if (w) return xUc(w, d, ceza);
    if (xDolu(b)) return 0;
    var en = p === "X" ? -INF : INF;
    for (var i = 0; i < 9; i++) {
      if (b[i]) continue;
      b[i] = p;
      var v = xMM(b, rakip(p), d + 1, ceza, say);
      b[i] = "";
      if (p === "X" ? v > en : v < en) en = v;
    }
    return en;
  }
  function xAB(b, p, d, a, be, sira, ceza, say, kok) {
    say.n++;
    var w = xKazanan(b);
    if (w) return xUc(w, d, ceza);
    if (xDolu(b)) return 0;
    var en = p === "X" ? -INF : INF;
    for (var k = 0; k < 9; k++) {
      var i = sira[k];
      if (b[i]) continue;
      b[i] = p;
      var v = xAB(b, rakip(p), d + 1, a, be, sira, ceza, say, null);
      b[i] = "";
      if (p === "X") { if (v > en) { en = v; if (kok) kok.en = i; } a = Math.max(a, en); }
      else { if (v < en) { en = v; if (kok) kok.en = i; } be = Math.min(be, en); }
      if (a >= be) break;
    }
    return en;
  }
  function xTT(b, p, gorulen) { /* geçiş tablolu tam arama: her konum bir kez */
    var key = b.join(",") + p;
    if (gorulen.has(key)) return gorulen.get(key);
    var w = xKazanan(b), v;
    if (w) v = w === "X" ? 1 : -1;
    else if (xDolu(b)) v = 0;
    else {
      v = p === "X" ? -INF : INF;
      for (var i = 0; i < 9; i++) {
        if (b[i]) continue;
        b[i] = p; var u = xTT(b, rakip(p), gorulen); b[i] = "";
        v = p === "X" ? Math.max(v, u) : Math.min(v, u);
      }
    }
    gorulen.set(key, v);
    return v;
  }
  function xTehdit(b, p) { /* p'nin bir hamlede tamamlayabileceği kareler */
    var t = [];
    for (var i = 0; i < 9; i++) {
      if (b[i]) continue;
      b[i] = p; if (xKazanan(b) === p) t.push(i); b[i] = "";
    }
    return t;
  }
  /* sıradaki p için her boş karenin minimaks değeri (X'in bakış açısıyla), seçim, gerekçe, düğüm sayıları */
  function xAnaliz(b, p, ceza) {
    var deg = {}, say = { n: 1 }, en = null;
    var t0 = simdi();
    for (var k = 0; k < 9; k++) {
      var i = SIRA_MKK[k];
      if (b[i]) continue;
      b[i] = p; deg[i] = xMM(b, rakip(p), 1, ceza, say); b[i] = "";
      if (en === null || (p === "X" ? deg[i] > deg[en] : deg[i] < deg[en])) en = i;
    }
    var t1 = simdi(), sab = { n: 0 }, kok = { en: null };
    var abv = xAB(b, p, 0, -INF, INF, SIRA_MKK, ceza, sab, kok);
    var t2 = simdi();
    return { deg: deg, en: en, mm: say.n, ab: sab.n, abv: abv, abEn: kok.en, tmm: t1 - t0, tab: t2 - t1, gerekce: en === null ? "" : bas(xGerekce(b, p, en, deg, ceza)) };
  }
  function xGerekce(b, p, i, deg, ceza) {
    var r = rakip(p), v = deg[i] * (p === "X" ? 1 : -1), ad = KARE[i] + " kare";
    var kayip = 0, toplam = 0;
    for (var k in deg) { toplam++; if (deg[k] * (p === "X" ? 1 : -1) < 0) kayip++; }
    var ek2 = kayip && v >= 0 ? (kayip === toplam - 1 ? " Diğer karelerin hepsi kaybettirir." : " Diğer karelerden " + sayi(kayip) + " tanesi kaybettirir.") : "";
    b[i] = p;
    var kazandi = xKazanan(b) === p, tehdit = xTehdit(b, p).length;
    b[i] = "";
    var rt = xTehdit(b, r);
    var hamle = ceza ? 10 - Math.abs(deg[i]) : 0;
    if (kazandi) return ad + " üçlüyü tamamlar: hemen kazanır.";
    if (rt.indexOf(i) >= 0 && rt.length > 1) return "Rakibin iki ayrı kazanma tehdidi var; biri kapatılsa da kayıp önlenemez. " + ad + " kaybı en çok geciktiren seçenektir.";
    if (rt.indexOf(i) >= 0) return ad + " rakibin kazanacağı kareyi kapatır: engellemezse " + r + " bir sonraki hamlede kazanır." + (v > 0 ? " Engellerken kazanmayı da zorlar." : "") + ek2;
    if (tehdit >= 2) return ad + " çatal kurar: iki ayrı kazanma tehdidi oluşur, rakip ikisini birden kapatamaz." + ek2;
    if (v > 0) return ad + " kazanmayı zorlar: rakip ne yaparsa yapsın" + (ceza ? " en geç " + sayi(hamle) + " hamle içinde" : "") + " kazanılır." + ek2;
    if (v === 0) return ad + " beraberliği garanti eder; iki taraf da hatasız oynarsa oyun berabere biter." + ek2;
    return "Her kare kaybettiriyor; " + ad + " kaybı en çok geciktirir" + (ceza ? " (" + sayi(hamle) + " hamle)" : "") + " ve rakibe hata yapma fırsatı bırakır.";
  }
  /* XOX konumundan oyun ağacı (agacKur'a uygun düğüm nesneleri) */
  function xAgacSpec(b, p, d, hamle) {
    var w = xKazanan(b), n = { tahta: b.slice(), hamle: hamle, p: p, cocuk: [] };
    if (w) { n.deger = xUc(w, d, true); n.son = w + " kazanır"; return n; }
    if (xDolu(b)) { n.deger = 0; n.son = "berabere"; return n; }
    for (var i = 0; i < 9; i++) {
      if (b[i]) continue;
      b[i] = p; n.cocuk.push(xAgacSpec(b, rakip(p), d + 1, i)); b[i] = "";
    }
    return n;
  }
  function miniTahta(n, x, y, hc) {
    var out = [], c = hc || 11, x0 = x - 1.5 * c, y0 = y - 1.5 * c;
    for (var i = 0; i < 9; i++) {
      var cx = x0 + (i % 3) * c, cy = y0 + Math.floor(i / 3) * c;
      out.push('<rect class="b02m-mb' + (i === n.hamle ? " is-son" : "") + '" x="' + cx + '" y="' + cy + '" width="' + c + '" height="' + c + '"/>');
      if (n.tahta[i]) out.push('<text class="' + (n.tahta[i] === "X" ? "b02m-mx" : "b02m-mo") + '" x="' + (cx + c / 2) + '" y="' + (cy + c * 0.8) + '" text-anchor="middle" style="font-size:' + (c * 0.9) + 'px">' + n.tahta[i] + "</text>");
    }
    return out.join("");
  }

  /* ================= Nim ================= */
  function nimSpec(h) {
    var n = { yigin: h.slice(), cocuk: [] };
    h.forEach(function (x, i) {
      for (var k = 1; k <= x; k++) { var t = h.slice(); t[i] -= k; n.cocuk.push(nimSpec(t)); }
    });
    return n;
  }

  /* ================= Dörtlü Bağla ================= */
  var D4W = 7, D4H = 6, D4KAZ = 1000;
  var D4PEN = [], D4HUC = [];
  (function () {
    function ekle(c, r, dc, dr) {
      var w = [];
      for (var k = 0; k < 4; k++) w.push((r + k * dr) * D4W + c + k * dc);
      D4PEN.push(w);
    }
    for (var r = 0; r < D4H; r++) for (var c = 0; c < D4W; c++) {
      if (c + 3 < D4W) ekle(c, r, 1, 0);
      if (r + 3 < D4H) ekle(c, r, 0, 1);
      if (c + 3 < D4W && r + 3 < D4H) ekle(c, r, 1, 1);
      if (c - 3 >= 0 && r + 3 < D4H) ekle(c, r, -1, 1);
    }
    for (var i = 0; i < D4W * D4H; i++) D4HUC.push([]);
    D4PEN.forEach(function (w, k) { w.forEach(function (i) { D4HUC[i].push(k); }); });
  })();
  /* pencere puanı: X = 1. oyuncu (MAX), O = 2. oyuncu (MIN) */
  function pPuan(a, b) {
    if (a && b) return 0;
    if (a === 3) return 5;
    if (a === 2) return 2;
    if (b === 3) return -5;
    if (b === 2) return -2;
    return 0;
  }
  function D4() {
    this.t = new Int8Array(D4W * D4H); this.h = new Int8Array(D4W);
    this.c1 = new Int8Array(D4PEN.length); this.c2 = new Int8Array(D4PEN.length);
    this.puan = 0; this.hamle = 0;
  }
  D4.prototype.oyna = function (c, p) {
    var i = this.h[c]++ * D4W + c, ws = D4HUC[i], kaz = false;
    this.t[i] = p; this.hamle++;
    for (var k = 0; k < ws.length; k++) {
      var w = ws[k];
      this.puan -= pPuan(this.c1[w], this.c2[w]);
      if (p === 1) { if (++this.c1[w] === 4) kaz = true; } else if (++this.c2[w] === 4) kaz = true;
      this.puan += pPuan(this.c1[w], this.c2[w]);
    }
    if (c === 3) this.puan += p === 1 ? 3 : -3;
    return kaz;
  };
  D4.prototype.geri = function (c, p) {
    var i = --this.h[c] * D4W + c, ws = D4HUC[i];
    this.t[i] = 0; this.hamle--;
    for (var k = 0; k < ws.length; k++) {
      var w = ws[k];
      this.puan -= pPuan(this.c1[w], this.c2[w]);
      if (p === 1) this.c1[w]--; else this.c2[w]--;
      this.puan += pPuan(this.c1[w], this.c2[w]);
    }
    if (c === 3) this.puan -= p === 1 ? 3 : -3;
  };
  D4.prototype.bastan = function () { /* değerlendirme fonksiyonu sıfırdan (öz-sınama için) */
    var s = 0, self = this;
    D4PEN.forEach(function (w) {
      var a = 0, b = 0;
      w.forEach(function (i) { if (self.t[i] === 1) a++; else if (self.t[i] === 2) b++; });
      s += pPuan(a, b);
    });
    for (var r = 0; r < D4H; r++) { var v = this.t[r * D4W + 3]; if (v === 1) s += 3; else if (v === 2) s -= 3; }
    return s;
  };
  var SIRA_ORTA = [3, 2, 4, 1, 5, 0, 6], SIRA_SOL = [0, 1, 2, 3, 4, 5, 6];
  /* p: sıradaki (1 MAX, 2 MIN); kaz: bir önceki hamle kazandı mı; değer hep 1. oyuncunun bakışıyla */
  function d4MM(g, der, ply, p, kaz, sira, say) {
    say.n++;
    if (kaz) return p === 1 ? -(D4KAZ - ply) : D4KAZ - ply;
    if (g.hamle === D4W * D4H) return 0;
    if (der === 0) return g.puan;
    var en = p === 1 ? -INF : INF;
    for (var k = 0; k < D4W; k++) {
      var c = sira[k];
      if (g.h[c] >= D4H) continue;
      var kz = g.oyna(c, p), v = d4MM(g, der - 1, ply + 1, 3 - p, kz, sira, say);
      g.geri(c, p);
      if (p === 1 ? v > en : v < en) en = v;
    }
    return en;
  }
  function d4AB(g, der, ply, p, kaz, a, b, sira, say, kok) {
    say.n++;
    if (kaz) return p === 1 ? -(D4KAZ - ply) : D4KAZ - ply;
    if (g.hamle === D4W * D4H) return 0;
    if (der === 0) return g.puan;
    var en = p === 1 ? -INF : INF;
    for (var k = 0; k < D4W; k++) {
      var c = sira[k];
      if (g.h[c] >= D4H) continue;
      var kz = g.oyna(c, p), v = d4AB(g, der - 1, ply + 1, 3 - p, kz, a, b, sira, say, null);
      g.geri(c, p);
      if (p === 1) { if (v > en) { en = v; if (kok) kok.en = c; } a = Math.max(a, en); }
      else { if (v < en) { en = v; if (kok) kok.en = c; } b = Math.min(b, en); }
      if (a >= b) break;
    }
    return en;
  }
  /* kökte her sütunun minimaks değeri (der derinlik); parça parça çalışır: her çağrı bir sütun */
  function d4KokSutun(g, c, der, p, sira, say) {
    var kz = g.oyna(c, p), v = d4MM(g, der - 1, 1, 3 - p, kz, sira, say);
    g.geri(c, p);
    return v;
  }

  /* ================= öz-sınama ================= */
  function rastgele(tohum) {
    var s = tohum >>> 0 || 1;
    return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  }
  function ozSinama(tur) {
    var rnd = rastgele(12345), hata = [], sayac = { agac: 0, xox: 0, d4: 0 };
    tur = tur || 200;
    /* 1) rastgele soyut ağaçlar, her iki kök türü */
    for (var t = 0; t < tur; t++) {
      var derin = 1 + Math.floor(rnd() * 4);
      var spec = (function mk(d) {
        if (d === 0) return Math.floor(rnd() * 21) - 10;
        var b = 1 + Math.floor(rnd() * 4), a = [];
        for (var i = 0; i < b; i++) a.push(mk(rnd() < 0.15 ? 0 : d - 1));
        return a;
      })(derin);
      if (typeof spec === "number") spec = [spec];
      [true, false].forEach(function (km) {
        var ag = agacKur(spec, km), m = tamMinimaks(ag.kok), say = { yaprak: 0 }, ab = tamAlfaBeta(ag.kok, -INF, INF, say);
        if (m !== ab) hata.push("ağaç " + JSON.stringify(spec) + ": minimaks " + m + ", alfa-beta " + ab);
        var ev = izAlfaBeta(ag), s = durum(ag, ev, ev.length - 1);
        if (ev[ev.length - 1].v !== m || s.yaprak !== say.yaprak) hata.push("iz " + JSON.stringify(spec));
        sayac.agac++;
      });
    }
    /* 2) rastgele XOX konumları: her karenin değeri ve kök değeri */
    for (t = 0; t < Math.min(tur, 300); t++) {
      var b = ["", "", "", "", "", "", "", "", ""], p = "X", n = Math.floor(rnd() * 8);
      for (var k = 0; k < n && !xKazanan(b); k++) {
        var bos = []; for (var i = 0; i < 9; i++) if (!b[i]) bos.push(i);
        b[bos[Math.floor(rnd() * bos.length)]] = p; p = rakip(p);
      }
      if (xKazanan(b) || xDolu(b)) continue;
      [true, false].forEach(function (ceza) {
        var an = xAnaliz(b, p, ceza);
        var kokMM = an.deg[an.en];
        if (kokMM !== an.abv) hata.push("XOX " + b.join(".") + " " + p + ": minimaks " + kokMM + ", alfa-beta " + an.abv);
        if (an.abEn !== an.en) hata.push("XOX seçim farklı " + b.join("."));
        [SIRA_DUZ, SIRA_MKK].forEach(function (sr) {
          for (var i = 0; i < 9; i++) {
            if (b[i]) continue;
            b[i] = p;
            var v2 = xAB(b, rakip(p), 1, -INF, INF, sr, ceza, { n: 0 }, null);
            b[i] = "";
            if (v2 !== an.deg[i]) hata.push("XOX kare " + i + " " + b.join("."));
          }
        });
      });
      sayac.xox++;
    }
    /* 3) rastgele Dörtlü Bağla konumları: her sütunda minimaks = tam pencereli alfa-beta; kök değerleri */
    for (t = 0; t < Math.min(tur, 60); t++) {
      var g = new D4(), q = 1, bitti = false, m2 = Math.floor(rnd() * 18);
      for (k = 0; k < m2; k++) {
        var acik = []; for (var c = 0; c < D4W; c++) if (g.h[c] < D4H) acik.push(c);
        if (g.oyna(acik[Math.floor(rnd() * acik.length)], q)) { bitti = true; break; }
        q = 3 - q;
      }
      if (bitti) continue;
      if (g.puan !== g.bastan()) hata.push("D4 değerlendirme artımlı ≠ baştan");
      var der2 = 1 + Math.floor(rnd() * 4), kokV = q === 1 ? -INF : INF;
      for (c = 0; c < D4W; c++) {
        if (g.h[c] >= D4H) continue;
        var v1 = d4KokSutun(g, c, der2, q, SIRA_ORTA, { n: 0 });
        var kz = g.oyna(c, q), v3 = d4AB(g, der2 - 1, 1, 3 - q, kz, -INF, INF, SIRA_SOL, { n: 0 }, null);
        g.geri(c, q);
        if (v1 !== v3) hata.push("D4 sütun " + c + ": minimaks " + v1 + ", alfa-beta " + v3);
        kokV = q === 1 ? Math.max(kokV, v1) : Math.min(kokV, v1);
      }
      [SIRA_ORTA, SIRA_SOL].forEach(function (sr) {
        var r = d4AB(g, der2, 0, q, false, -INF, INF, sr, { n: 0 }, { en: null });
        if (r !== kokV) hata.push("D4 kök: minimaks " + kokV + ", alfa-beta " + r);
      });
      if (g.puan !== g.bastan()) hata.push("D4 geri alma sonrası değerlendirme bozuk");
      sayac.d4++;
    }
    return { tamam: hata.length === 0, sayac: sayac, hata: hata.slice(0, 10) };
  }

  var cekirdek = { agacKur: agacKur, tamMinimaks: tamMinimaks, tamAlfaBeta: tamAlfaBeta, izMinimaks: izMinimaks, izAlfaBeta: izAlfaBeta,
    durum: durum, xMM: xMM, xAB: xAB, xTT: xTT, xAnaliz: xAnaliz, D4: D4, d4MM: d4MM, d4AB: d4AB, d4KokSutun: d4KokSutun,
    SIRA_ORTA: SIRA_ORTA, SIRA_SOL: SIRA_SOL, SIRA_MKK: SIRA_MKK, SIRA_DUZ: SIRA_DUZ, ozSinama: ozSinama, ek: ek, sayi: sayi,
    agacSvg: agacSvg, isaretli: isaretli };
  if (!tarayici) { if (typeof module === "object" && module.exports) module.exports = cekirdek; return; }
  window.b02mOzSinama = ozSinama;
  window.b02mCekirdek = cekirdek;

  /* ================= DOM demoları ================= */
  var stage = document.getElementById("ds-deck-stage") || document;
  function demolar(ad) { return Array.prototype.slice.call(stage.querySelectorAll('[data-demo="' + ad + '"]')); }
  function dugme(kutu, op) { return kutu.querySelector('[data-op="' + op + '"]'); }
  function sonra(f) { setTimeout(f, 0); }

  /* ---------- adım adım ağaç (minimaks / alfa-beta) ---------- */
  var AGACLAR = {
    T1: [[[5, 6], [7, 4]], [[3, 2], [8, 9]], [[4, 1], [2, 7]]],
    T2: [[[3, 7], [9, 1]], [[4, 2], [6, 8]]]
  };
  function adimlayici(kutu, agac, ev, o) {
    var gor = kutu.querySelector(".b02m-view"), st = kutu.querySelector(".b02m-status"), bilgi = kutu.querySelector(".b02m-info");
    var oynat = dugme(kutu, "oynat"), k = -1, zam = null;
    function ciz() {
      var s = k < 0 ? { deg: {}, bitti: {}, gez: {}, ab: {}, kes: {}, kesKenar: {}, yigin: [], cur: null, yaprak: 0, en: null } : durum(agac, ev, k);
      gor.innerHTML = agacSvg(agac, s, o);
      st.textContent = k < 0 ? o.ilk : s.m;
      if (bilgi) bilgi.innerHTML = "Adım <b>" + (k + 1) + " / " + ev.length + "</b> · Değerlendirilen yaprak: <b>" + s.yaprak + " / " + agac.yaprakSay + "</b>" +
        (s.yigin.length ? " · Yığın: " + s.yigin.map(function (n) { return n.ad; }).join(" ▸ ") : "");
      dugme(kutu, "geri").disabled = k < 0;
      dugme(kutu, "adim").disabled = k >= ev.length - 1;
    }
    function dur() { if (zam) { clearInterval(zam); zam = null; } oynat.textContent = "Oynat"; oynat.setAttribute("aria-label", "Adımları otomatik oynat"); }
    kutu.addEventListener("click", function (e) {
      var b = e.target.closest("[data-op]");
      if (!b) return;
      var op = b.getAttribute("data-op");
      if (op === "adim") { dur(); k = Math.min(ev.length - 1, k + 1); ciz(); }
      else if (op === "geri") { dur(); k = Math.max(-1, k - 1); ciz(); }
      else if (op === "sifirla") { dur(); k = -1; ciz(); }
      else if (op === "oynat") {
        if (zam) { dur(); return; }
        if (k >= ev.length - 1) k = -1;
        oynat.textContent = "Durdur"; oynat.setAttribute("aria-label", "Otomatik oynatmayı durdur");
        zam = setInterval(function () { if (k >= ev.length - 1) { dur(); return; } k++; ciz(); }, o.hiz || 900);
      }
    });
    /* başka slayta geçilince oynatma durur */
    var slayt = kutu.closest(".ds-deck__slide");
    if (slayt && window.MutationObserver) new MutationObserver(function () { if (!slayt.classList.contains("is-active")) dur(); }).observe(slayt, { attributes: true, attributeFilter: ["class"] });
    ciz();
  }
  var AGAC_O = { W: 720, solPay: 82, sagPay: 30, ust: 20, dy: 60, alt: 22 };
  demolar("b02m-agac").forEach(function (kutu) {
    var agac = agacKur(AGACLAR[kutu.getAttribute("data-tree")] || AGACLAR.T1), ab = kutu.getAttribute("data-mode") === "alfabeta";
    var ev = ab ? izAlfaBeta(agac) : izMinimaks(agac);
    var o = {}; for (var k in AGAC_O) o[k] = AGAC_O[k];
    o.aria = (ab ? "Alfa-beta" : "Minimaks") + " adımlayıcısı: MAX kökü, MIN ve MAX katmanları, yapraklar";
    o.ilk = ab ? "Başlangıç: kök A'da α = −∞, β = +∞. Adım düğmesiyle derinlik öncelikli arama başlar; budanan dallar kesik çizgiyle gösterilir."
      : "Başlangıç: değerler yapraklarda. Adım düğmesiyle derinlik öncelikli arama başlar; değerler yapraktan köke yükselir.";
    adimlayici(kutu, agac, ev, o);
  });

  /* ---------- tahmin: düğmeyle açılan cevap ---------- */
  demolar("b02m-tahmin").forEach(function (kutu) {
    var b = dugme(kutu, "goster"), cv = kutu.querySelector(".b02m-cevap");
    b.addEventListener("click", function () {
      var acik = cv.classList.toggle("is-acik");
      b.textContent = acik ? "Cevabı gizle" : "Cevabı göster";
      b.setAttribute("aria-expanded", acik ? "true" : "false");
    });
  });

  /* ---------- statik ağaçlar (tahmin slaytı vb.) ---------- */
  demolar("b02m-agac-statik").forEach(function (kutu) {
    var agac = agacKur(AGACLAR[kutu.getAttribute("data-tree")] || AGACLAR.T1);
    var o = {}; for (var k in AGAC_O) o[k] = AGAC_O[k];
    if (kutu.getAttribute("data-mode") === "alfabeta-son") {
      var ev = izAlfaBeta(agac);
      o.aria = "Alfa-beta aramasının sonu: değerler, [α, β] aralıkları ve budanan dallar";
      kutu.innerHTML = agacSvg(agac, durum(agac, ev, ev.length - 1), o);
      return;
    }
    o.aria = "Oyun ağacı: yapraklarda değerler, iç düğümler boş";
    kutu.innerHTML = agacSvg(agac, { deg: {}, bitti: {}, gez: {}, ab: {}, kes: {}, kesKenar: {}, yigin: [], cur: null, en: null }, o).replace(/ is-new/g, "");
  });

  /* ---------- XOX tahta yardımcıları ---------- */
  function xTahtaKur(kutu, tikla) {
    var t = kutu.querySelector(".b02m-board"), hucre = [];
    for (var i = 0; i < 9; i++) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "b02m-cell"; b.dataset.i = i;
      b.addEventListener("click", function () { tikla(parseInt(this.dataset.i, 10)); });
      t.appendChild(b); hucre.push(b);
    }
    return hucre;
  }
  function xTahtaCiz(hucre, b, deg, en, bakis, kazCizgi) {
    hucre.forEach(function (h, i) {
      h.className = "b02m-cell" + (i === en ? " is-best" : "") + (kazCizgi && kazCizgi.indexOf(i) >= 0 ? " is-win" : "");
      if (b[i]) {
        h.innerHTML = '<span class="' + (b[i] === "X" ? "b02m-X" : "b02m-O") + '">' + b[i] + "</span>";
        h.setAttribute("aria-label", KARE[i] + " kare: " + b[i]);
      } else if (deg && deg[i] !== undefined) {
        var v = deg[i] * bakis;
        h.innerHTML = '<span class="b02m-cv' + (v > 0 ? " b02m-pos" : v < 0 ? " b02m-neg" : "") + '">' + isaretli(v) + "</span>";
        h.setAttribute("aria-label", KARE[i] + " kare: boş, değer " + isaretli(v));
      } else {
        h.innerHTML = "";
        h.setAttribute("aria-label", KARE[i] + " kare: boş");
      }
    });
  }
  function kazCizgisi(b) {
    for (var i = 0; i < 8; i++) { var l = CIZGI[i]; if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) return l; }
    return null;
  }

  /* ---------- Oyunla Başlangıç: YZ'ye karşı XOX ---------- */
  demolar("b02m-xox-oyun").forEach(function (kutu) {
    var st = kutu.querySelector(".b02m-status"), yzB = dugme(kutu, "yz"), b, insan, yz, sira, an, bitti;
    var hucre = xTahtaKur(kutu, function (i) {
      if (bitti || sira !== insan || b[i]) return;
      b[i] = insan; sira = yz; ilerle(KARE[i] + " kareye " + insan + " kondu. ");
    });
    function bitis() {
      var w = xKazanan(b);
      if (w) { bitti = true; st.innerHTML = "<b>" + (w === yz ? "YZ kazandı." : "İnsan oyuncu kazandı.") + "</b> " + (w === yz ? "Rakibin hatası minimaks değerlerinde hemen görünür: kaybettiren karelerin değeri eksiydi." : "Tam ağacı arayan YZ'ye karşı bu sonuç beklenmez."); xTahtaCiz(hucre, b, null, null, 1, kazCizgisi(b)); return true; }
      if (xDolu(b)) { bitti = true; st.innerHTML = "<b>Berabere.</b> İki taraf da hatasız oynadığında XOX'un sonucu budur."; xTahtaCiz(hucre, b, null, null, 1); return true; }
      return false;
    }
    function ilerle(on) {
      yzB.disabled = true;
      if (bitis()) return;
      if (sira === yz) {
        an = xAnaliz(b, yz, true);
        var bakis = yz === "X" ? 1 : -1;
        xTahtaCiz(hucre, b, an.deg, an.en, bakis);
        st.innerHTML = (on || "") + "YZ (" + yz + ") her boş kareyi tam ağaçla değerlendirdi; sayılar YZ'nin gözünden değer (+ kazanır, 0 berabere, − kaybeder). " +
          "Seçim: <b>" + KARE[an.en] + " kare (" + isaretli(an.deg[an.en] * bakis) + ")</b>. " + an.gerekce + " <span class=\"b02m-muted\">(" + sayi(an.mm) + " düğüm)</span>";
        yzB.disabled = false;
      } else {
        xTahtaCiz(hucre, b, null, null, 1);
        st.innerHTML = (on || "") + "Sıra insan oyuncuda (" + insan + "): boş bir kareye tıklanır.";
      }
    }
    yzB.addEventListener("click", function () {
      if (bitti || sira !== yz || !an) return;
      b[an.en] = yz; sira = insan;
      ilerle("YZ " + KARE[an.en] + " kareye oynadı. ");
    });
    function yeni(yzBaslar, ornek) {
      b = ["", "", "", "", "", "", "", "", ""]; bitti = false;
      insan = yzBaslar ? "O" : "X"; yz = rakip(insan); sira = "X";
      if (ornek) { b[0] = "X"; sira = "O"; ilerle("Örnek: sol üst köşeye X kondu. "); }
      else ilerle(yzBaslar ? "Yeni oyun: YZ (X) başlar. " : "Yeni oyun: insan oyuncu X ile başlar. ");
    }
    dugme(kutu, "yeni-ben").addEventListener("click", function () { yeni(false); });
    dugme(kutu, "yeni-yz").addEventListener("click", function () { yeni(true); });
    yeni(false, true);
  });

  /* ---------- XOX laboratuvarı: konum kur, değerler, gerekçe ---------- */
  var HAZIR = {
    bos: { b: "         ", p: "X" },
    catal: { b: "XO  X   O", p: "X" },
    engel: { b: "XX  O    ", p: "O" },
    "ceza-ornek": { b: "XO X   O ", p: "X" }
  };
  demolar("b02m-xox-lab").forEach(function (kutu) {
    var st = kutu.querySelector(".b02m-status"), bilgi = kutu.querySelector(".b02m-info"), b, p, ceza = true, an;
    var siraB = dugme(kutu, "sira"), cezaB = dugme(kutu, "ceza");
    var hucre = xTahtaKur(kutu, function (i) {
      b[i] = b[i] === "" ? "X" : b[i] === "X" ? "O" : "";
      hesapla();
    });
    function hesapla() {
      siraB.textContent = "Sıra: " + p + (p === "X" ? " (MAX)" : " (MIN)");
      cezaB.textContent = "Derinlik cezası: " + (ceza ? "açık" : "kapalı");
      var w = xKazanan(b), nx = 0, no = 0;
      b.forEach(function (c) { if (c === "X") nx++; else if (c === "O") no++; });
      var uyari = nx - no > 1 || no - nx > 1 ? " Taş sayıları sırayla oynanan bir oyunda oluşamaz." : "";
      if (w || xDolu(b)) {
        xTahtaCiz(hucre, b, null, null, 1, w ? kazCizgisi(b) : null);
        st.innerHTML = (w ? "<b>" + w + " kazanmış:</b> oyun bitti, değerlendirilecek hamle yok." : "<b>Tahta dolu:</b> berabere.") + uyari;
        bilgi.innerHTML = "&nbsp;";
        return;
      }
      an = xAnaliz(b, p, ceza);
      xTahtaCiz(hucre, b, an.deg, an.en, 1);
      st.innerHTML = "Sıra " + ek(p, "de") + " (" + (p === "X" ? "MAX, en büyüğü seçer" : "MIN, en küçüğü seçer") + "): <b>" + KARE[an.en] + " kare, " + isaretli(an.deg[an.en]) + "</b>. " + an.gerekce + uyari;
      bilgi.innerHTML = "Minimaks: <b>" + sayi(an.mm) + "</b> düğüm (" + ms(an.tmm) + " ms) · Alfa-beta: <b>" + sayi(an.ab) + "</b> düğüm (" + ms(an.tab) + " ms) · kök değeri ikisinde de <b>" + isaretli(an.abv) + "</b>";
    }
    function yukle(ad) { var h = HAZIR[ad]; b = h.b.split("").map(function (c) { return c === " " ? "" : c; }); p = h.p; hesapla(); }
    kutu.addEventListener("click", function (e) {
      var d = e.target.closest("[data-op]");
      if (!d) return;
      var op = d.getAttribute("data-op");
      if (op === "sira") { p = rakip(p); hesapla(); }
      else if (op === "ceza") { ceza = !ceza; hesapla(); }
      else if (op === "oyna") { if (an && !xKazanan(b) && !xDolu(b)) { b[an.en] = p; p = rakip(p); hesapla(); } }
      else if (HAZIR[op]) yukle(op);
    });
    yukle("ceza-ornek");
  });

  /* ---------- XOX orta oyun ağacı: adım adım minimaks ---------- */
  demolar("b02m-xox-agac").forEach(function (kutu) {
    var konum = (kutu.getAttribute("data-pos") || "  XXOO XO").split("").map(function (c) { return c === " " ? "" : c; });
    var agac = agacKur(xAgacSpec(konum, "X", 0, -1));
    var o = { W: 720, solPay: 92, sagPay: 50, ust: 26, dy: 74, alt: 26, karisik: true, dugumH: 36, renkli: true, degerDx: 26,
      degerYazi: isaretli, katman: ["MAX (X)", "MIN (O)", "MAX (X)", "MIN (O)"],
      aria: "Orta oyun XOX konumunun tam oyun ağacı" };
    o.dugumCiz = function (n) {
      var out = [miniTahta(n, n.x, n.y, 12)];
      if (!n.yaprak) {
        out.push('<polygon class="b02m-n" points="' + ucgen(n.x - 30, n.y - 9, 14, 11, n.max) + '"/>');
        out.push('<text class="b02m-nm" x="' + (n.x - 30) + '" y="' + (n.y + 12) + '" text-anchor="middle">' + n.ad + "</text>");
      } else {
        out.push('<text class="b02m-v' + degSinif(n.deger, true) + '" x="' + n.x + '" y="' + (n.y + 33) + '" text-anchor="middle">' + isaretli(n.deger) + "</text>");
      }
      return out.join("");
    };
    var ev = izMinimaks(agac, { fmt: isaretli, yaprakAd: function (c) {
      return "Oyun sonu (" + c.son + ", derinlik " + sayi(c.derinlik) + ") okunur: değer " + isaretli(c.deger);
    } });
    ev.forEach(function (e) { e.m = e.m.replace(/\((MAX)\)/g, "(MAX, X)").replace(/\((MIN)\)/g, "(MIN, O)"); });
    o.ilk = "Başlangıç: X'in sırası, üç boş kare. Her düğüm bir konum; turuncu kare o konuma götüren hamle. Değerler oyun sonlarından köke yükselir.";
    adimlayici(kutu, agac, ev, o);
  });

  /* ---------- Nim ağacı ---------- */
  demolar("b02m-nim").forEach(function (kutu) {
    var gor = kutu.querySelector(".b02m-view"), st = kutu.querySelector(".b02m-status"), goster = true, h = [1, 2];
    var degB = dugme(kutu, "degerler");
    function ciz() {
      var agac = agacKur(nimSpec(h));
      agac.dugum.forEach(function (n) { if (n.yaprak) n.deger = n.max ? -1 : 1; });
      var s = { deg: {}, bitti: {}, gez: {}, ab: {}, kes: {}, kesKenar: {}, yigin: [], cur: null, en: null, enler: {} };
      agac.dugum.forEach(function (n) { s.gez[n.id] = true; s.bitti[n.id] = true; if (goster) s.deg[n.id] = tamMinimaks(n); });
      var kokV = tamMinimaks(agac.kok), kazanan = [];
      if (goster) agac.kok.cocuk.forEach(function (c) { if (tamMinimaks(c) === kokV && kokV > 0) { s.enler[c.id] = true; kazanan.push(c); } });
      var yap = agac.yaprakSay, adim = 46;
      var o = { W: Math.max(360, Math.min(720, 120 + (yap - 1) * adim)), solPay: 82, sagPay: 34, ust: 18, dy: 52, alt: 32, karisik: true, renkli: true, degerDx: 17,
        degerYazi: isaretli, aria: "Nim(" + h.join(", ") + ") oyun ağacı", katman: ["MAX (A)", "MIN (B)", "MAX (A)", "MIN (B)", "MAX (A)"] };
      o.dugumCiz = function (n, s2) {
        var lab = n.yigin.join(",");
        if (n.yaprak) return '<rect class="b02m-n" x="' + (n.x - 16) + '" y="' + (n.y - 11) + '" width="32" height="22" rx="4"/>' +
          '<text class="b02m-lv" x="' + n.x + '" y="' + (n.y + 4) + '" text-anchor="middle" style="font-size:11px">' + lab + "</text>" +
          (goster ? '<text class="b02m-v' + degSinif(n.deger, true) + '" x="' + n.x + '" y="' + (n.y + 25) + '" text-anchor="middle" style="font-size:12px">' + isaretli(n.deger) + "</text>" : "");
        return '<polygon class="b02m-n" points="' + ucgen(n.x, n.y, 32, 25, n.max) + '"/>' +
          '<text class="b02m-nm" x="' + n.x + '" y="' + (n.y + (n.max ? 8 : 0)) + '" text-anchor="middle" style="font-size:10.5px">' + lab + "</text>";
      };
      o.degerYaz = goster;
      o.w = 32; o.h = 25;
      var svg = agacSvg(agac, s, o);
      gor.innerHTML = svg;
      var x = h.reduce(function (a, c) { return a ^ c; }, 0);
      var xorYazi = h.length > 1 ? h.join(" ⊕ ") + " = " + x : String(x);
      if (!goster) { st.innerHTML = "Değerler gizli: kökün değeri ve kazandıran hamle önce elle bulunur. Nim toplamı " + xorYazi + "."; return; }
      if (kokV > 0) {
        var hm = kazanan.map(function (c) { return "(" + c.yigin.join(", ") + ")"; }).join(", ");
        var xorH = kazanan.filter(function (c) { return c.yigin.reduce(function (a, v) { return a ^ v; }, 0) === 0; }).length === kazanan.length;
        st.innerHTML = "Kök (" + h.join(", ") + "): değer <b>+1</b>, sıradaki A kazanır → <b>N konumu</b>. Kazandıran hamle: <b>" + hm + "</b>. Nim toplamı " + xorYazi +
          " ≠ 0; XOR'u 0 yapan hamle " + (xorH ? "aynısı ✓" : "farklı ✗") + ".";
      } else {
        st.innerHTML = "Kök (" + h.join(", ") + "): değer <b>−1</b>, sıradaki A her hamlede kaybeder → <b>P konumu</b>. Nim toplamı " + xorYazi + ": XOR 0 iken kazandıran hamle yoktur.";
      }
    }
    kutu.addEventListener("click", function (e) {
      var d = e.target.closest("[data-op]");
      if (!d) return;
      var op = d.getAttribute("data-op");
      if (op === "degerler") { goster = !goster; degB.textContent = goster ? "Değerleri gizle" : "Değerleri göster"; }
      else { h = op.split("-").map(Number); kutu.querySelectorAll("[data-pos]").forEach(function (x) { x.setAttribute("aria-pressed", x === d ? "true" : "false"); }); }
      ciz();
    });
    ciz();
  });

  /* ---------- hamle sıralaması ---------- */
  var SIRALA_ILK = [[[12, 5, 30], [8, 21, 3], [25, 14, 9]], [[7, 18, 2], [27, 11, 16], [4, 23, 19]], [[15, 1, 26], [10, 22, 6], [20, 13, 24]]];
  function siraUygula(spec, kip, rnd) {
    if (typeof spec === "number") return spec;
    function v(s, mx) { if (typeof s === "number") return s; var a = s.map(function (c) { return v(c, !mx); }); return mx ? Math.max.apply(null, a) : Math.min.apply(null, a); }
    return (function rec(s, mx) {
      if (typeof s === "number") return s;
      var kids = s.map(function (c) { return rec(c, !mx); });
      if (kip === "karistir") karistir(kids, rnd);
      else if (kip === "iyi" || kip === "kotu") {
        var yon = (kip === "iyi") === mx ? -1 : 1;
        kids.sort(function (a, b) { return yon * (v(a, !mx) - v(b, !mx)); });
      }
      return kids;
    })(spec, true);
  }
  demolar("b02m-sirala").forEach(function (kutu) {
    var gor = kutu.querySelector(".b02m-view"), st = kutu.querySelector(".b02m-status"), spec = SIRALA_ILK, ozgun = SIRALA_ILK, rnd = rastgele(2026);
    var AD = { ozgun: "Özgün sıra", karistir: "Karıştırılmış sıra", iyi: "En iyi sıra", kotu: "En kötü sıra", yeni: "Yeni değerler" };
    function ciz(kip) {
      var agac = agacKur(spec), ev = izAlfaBeta(agac), s = durum(agac, ev, ev.length - 1);
      var o = { W: 720, solPay: 64, sagPay: 18, ust: 18, dy: 56, alt: 18, adYaz: false, degerYaz: false, abYaz: false, w: 26, h: 22, aria: "Hamle sıralaması: alfa-beta ile değerlendirilen ve budanan yapraklar" };
      o.dugumCiz = function (n) {
        if (n.yaprak) return '<rect class="b02m-n" x="' + (n.x - 11) + '" y="' + (n.y - 11) + '" width="22" height="22" rx="3"/><text class="b02m-lv" x="' + n.x + '" y="' + (n.y + 4) + '" text-anchor="middle" style="font-size:11px">' + n.deger + "</text>";
        return '<polygon class="b02m-n" points="' + ucgen(n.x, n.y, 26, 22, n.max) + '"/>' + (n.ata ? "" : '<text class="b02m-v" x="' + (n.x + 20) + '" y="' + (n.y + 5) + '">' + tamMinimaks(n) + "</text>");
      };
      var svg = agacSvg(agac, s, o).replace(/<text class="b02m-cutl"[^<]*<\/text>/g, "");
      gor.innerHTML = svg;
      var kok = tamMinimaks(agac.kok);
      st.innerHTML = "<b>" + AD[kip] + ":</b> değerlendirilen yaprak <b>" + s.yaprak + " / " + agac.yaprakSay + "</b>, kökün değeri <b>" + kok + "</b>" +
        (kip === "ozgun" || kip === "yeni" ? "" : " (özgün sırada da " + kok + ")") + ". Kuram: en iyi sırada 3² + 3¹ − 1 = 11, sırasız minimaksta 27 yaprak.";
    }
    kutu.addEventListener("click", function (e) {
      var d = e.target.closest("[data-op]");
      if (!d) return;
      var op = d.getAttribute("data-op");
      if (op === "yeni") {
        var deg = []; for (var i = 1; i <= 30; i++) deg.push(i);
        karistir(deg, rnd);
        var k = 0; ozgun = [0, 1, 2].map(function () { return [0, 1, 2].map(function () { return [deg[k++], deg[k++], deg[k++]]; }); });
        spec = ozgun;
      } else spec = op === "ozgun" ? ozgun : siraUygula(ozgun, op, rnd);
      ciz(op);
    });
    ciz("ozgun");
  });

  /* ---------- XOX boş tahtadan tam arama: sayaç ---------- */
  demolar("b02m-xox-sayac").forEach(function (kutu) {
    function yaz(ad, n, t, v) {
      var r = kutu.querySelector('[data-row="' + ad + '"]');
      r.querySelector(".b02m-n1").textContent = sayi(n);
      r.querySelector(".b02m-t1").textContent = ms(t) + " ms";
      r.querySelector(".b02m-v1").textContent = isaretli(v);
    }
    function calis() {
      var b = ["", "", "", "", "", "", "", "", ""], t0, say, v;
      t0 = simdi(); say = { n: 0 }; v = xMM(b, "X", 0, true, say); yaz("mm", say.n, simdi() - t0, v);
      t0 = simdi(); say = { n: 0 }; v = xAB(b, "X", 0, -INF, INF, SIRA_DUZ, true, say, null); yaz("ab-duz", say.n, simdi() - t0, v);
      t0 = simdi(); say = { n: 0 }; v = xAB(b, "X", 0, -INF, INF, SIRA_MKK, true, say, null); yaz("ab-mkk", say.n, simdi() - t0, v);
      var gr = new Map(); t0 = simdi(); v = xTT(b, "X", gr); yaz("tt", gr.size, simdi() - t0, v);
    }
    dugme(kutu, "hesapla").addEventListener("click", calis);
    sonra(calis);
  });

  /* ---------- Dörtlü Bağla ---------- */
  function d4Ciz(g, son, kazP) {
    var r = 22, a = 46, out = ['<rect class="b02m-d4bg" x="2" y="2" width="' + (D4W * a + 4) + '" height="' + (D4H * a + 4) + '" rx="10"/>'];
    for (var y = 0; y < D4H; y++) for (var c = 0; c < D4W; c++) {
      var i = y * D4W + c, v = g.t[i], cx = 4 + c * a + a / 2, cy = 4 + (D4H - 1 - y) * a + a / 2;
      out.push('<circle class="' + (v === 1 ? "b02m-d41" : v === 2 ? "b02m-d42" : "b02m-d40") + (kazP && kazP.indexOf(i) >= 0 ? " is-win" : "") + '" cx="' + cx + '" cy="' + cy + '" r="' + r + '"/>');
      if (i === son) out.push('<circle class="b02m-d4son" cx="' + cx + '" cy="' + cy + '" r="7"/>');
    }
    return '<svg class="ds-svg" viewBox="0 0 ' + (D4W * a + 6) + " " + (D4H * a + 6) + '" role="img" aria-label="Dörtlü Bağla tahtası, 7 sütun 6 satır">' + out.join("") + "</svg>";
  }
  function d4KazananPencere(g) {
    for (var k = 0; k < D4PEN.length; k++) if (g.c1[k] === 4 || g.c2[k] === 4) return D4PEN[k];
    return null;
  }
  demolar("b02m-d4").forEach(function (kutu) {
    var gor = kutu.querySelector(".b02m-view"), st = kutu.querySelector(".b02m-status"), bilgi = kutu.querySelector(".b02m-info");
    var sutunlar = kutu.querySelector(".b02m-cols"), yzB = dugme(kutu, "yz"), derB = kutu.querySelector(".b02m-der"), siraB = dugme(kutu, "sira");
    var g, insan, yz, sira, bitti, son = -1, der = 5, ortadan = true, an = null, nesil = 0, mesgul = false, renk = { 1: "Kırmızı", 2: "Mavi" };
    var sb = [];
    for (var c = 0; c < D4W; c++) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "b02m-col"; b.dataset.c = c;
      b.addEventListener("click", function () { insanOyna(parseInt(this.dataset.c, 10)); });
      sutunlar.appendChild(b); sb.push(b);
    }
    function etiket(v) {
      if (v >= D4KAZ - 100) return "kazanç";
      if (v <= -(D4KAZ - 100)) return "kayıp";
      return isaretli(v);
    }
    function sutunCiz() {
      sb.forEach(function (b, c) {
        var v = an && an.deg[c] !== undefined ? an.deg[c] * (yz === 1 ? 1 : -1) : null;
        b.className = "b02m-col" + (an && an.en === c ? " is-best" : "") + (v !== null && v >= D4KAZ - 100 ? " b02m-pos" : v !== null && v <= -(D4KAZ - 100) ? " b02m-neg" : "");
        b.innerHTML = '<span class="b02m-cn">' + (c + 1) + "</span><span>" + (v === null ? (an ? "dolu" : "↓") : etiket(v)) + "</span>";
        b.disabled = bitti || g.h[c] >= D4H || sira !== insan;
        b.setAttribute("aria-label", "Sütun " + (c + 1) + (v === null ? "" : ", YZ için puan " + etiket(v)));
      });
      derB.textContent = "Derinlik " + der;
      siraB.textContent = "Sıra: " + (ortadan ? "ortadan dışa" : "soldan sağa");
    }
    function ciz(kaz) { gor.innerHTML = d4Ciz(g, son, kaz ? d4KazananPencere(g) : null); sutunCiz(); }
    function bitis(kz, p) {
      if (kz) { bitti = true; an = null; ciz(true); st.innerHTML = "<b>" + renk[p] + " dörtlü yaptı: " + (p === yz ? "YZ kazandı." : "insan oyuncu kazandı.") + "</b>" + (p === insan ? " Derinlik sınırı olan YZ ufkunun ötesini göremez." : ""); return true; }
      if (g.hamle === D4W * D4H) { bitti = true; an = null; ciz(); st.innerHTML = "<b>Tahta doldu: berabere.</b>"; return true; }
      return false;
    }
    function insanOyna(c) {
      if (bitti || sira !== insan || g.h[c] >= D4H || mesgul) return;
      son = g.h[c] * D4W + c;
      var kz = g.oyna(c, insan);
      sira = yz; an = null;
      if (bitis(kz, insan)) return;
      dusun("Sütun " + (c + 1) + ": " + renk[insan] + " taş düştü. ");
    }
    /* YZ: önce her sütunun minimaks değeri (parça parça), sonra tek bir alfa-beta araması */
    function dusun(on) {
      var no = ++nesil, sira2 = ortadan ? SIRA_ORTA : SIRA_SOL, deg = {}, say = { n: 1 }, tmm = 0, k = 0;
      mesgul = true; yzB.disabled = true; an = null; ciz();
      st.innerHTML = (on || "") + "YZ düşünüyor (derinlik " + der + ")…";
      bilgi.innerHTML = "&nbsp;";
      function parca() {
        if (no !== nesil) return;
        while (k < D4W && g.h[sira2[k]] >= D4H) k++;
        if (k < D4W) {
          var c = sira2[k++], t0 = simdi();
          deg[c] = d4KokSutun(g, c, der, yz, sira2, say);
          tmm += simdi() - t0;
          setTimeout(parca, 0);
          return;
        }
        var en = null;
        sira2.forEach(function (c) { if (deg[c] !== undefined && (en === null || (yz === 1 ? deg[c] > deg[en] : deg[c] < deg[en]))) en = c; });
        var sab = { n: 0 }, kok = { en: null }, t1 = simdi(), abv = d4AB(g, der, 0, yz, false, -INF, INF, sira2, sab, kok), tab = simdi() - t1;
        mesgul = false;
        an = { deg: deg, en: en, mm: say.n, ab: sab.n, tmm: tmm, tab: tab, abv: abv, abEn: kok.en };
        ciz();
        st.innerHTML = (on || "") + "YZ'nin seçimi: <b>sütun " + (en + 1) + "</b> (" + etiket(deg[en] * (yz === 1 ? 1 : -1)) + "). " + gerekce(en);
        bilgi.innerHTML = "Minimaks: <b>" + sayi(an.mm) + "</b> düğüm, " + ms(tmm) + " ms · Alfa-beta: <b>" + sayi(an.ab) + "</b> düğüm, " + ms(tab) + " ms · " +
          (abv === deg[en] && kok.en === en ? "aynı değer, aynı sütun ✓" : "FARK: " + abv + " / " + deg[en]);
        yzB.disabled = false;
      }
      setTimeout(parca, 30);
    }
    function gerekce(c) {
      var v = an.deg[c] * (yz === 1 ? 1 : -1), kaybettiren = 0;
      for (var k in an.deg) if (an.deg[k] * (yz === 1 ? 1 : -1) <= -(D4KAZ - 100)) kaybettiren++;
      var ek2 = kaybettiren && v > -(D4KAZ - 100) ? " " + sayi(kaybettiren) + " sütun derinlik sınırı içinde kayba götürüyor." : "";
      var kz = g.oyna(c, yz); g.geri(c, yz);
      if (kz) return "Bu sütun dörtlüyü tamamlar: hemen kazanır.";
      var rk = g.oyna(c, insan); g.geri(c, insan);
      if (v >= D4KAZ - 100) return "Derinlik " + der + " içinde zorlanmış kazanç görüyor: en geç " + sayi(D4KAZ - v) + " hamlede." + (rk ? " Aynı sütun rakibin dörtlüsünü de engeller." : "");
      if (rk) return "Rakip bu sütuna oynasaydı dörtlü yapacaktı: engeller." + ek2;
      if (v <= -(D4KAZ - 100)) return "Her sütun derinlik sınırı içinde kaybettiriyor; kaybı en çok geciktiren sütun seçildi.";
      return "Bu sütunda derinlik sınırı içinde zorunlu bir kazanç ya da kayıp yok; ufuktaki konumların değerlendirme puanı (açık ikili ve üçlüler, orta sütun) en iyi olan sütun seçildi." + ek2;
    }
    yzB.addEventListener("click", function () {
      if (bitti || sira !== yz || !an || mesgul) return;
      var c = an.en;
      son = g.h[c] * D4W + c;
      var kz = g.oyna(c, yz);
      sira = insan;
      var not = "YZ sütun " + ek(c + 1, "e") + " oynadı. ";
      an = null;
      if (bitis(kz, yz)) return;
      ciz();
      st.innerHTML = not + "Sıra insan oyuncuda (" + renk[insan] + "): bir sütun düğmesine tıklanır.";
      bilgi.innerHTML = "&nbsp;";
      yzB.disabled = true;
    });
    function yeni(yzBaslar, ornek) {
      nesil++; mesgul = false; g = new D4(); bitti = false; son = -1; an = null;
      insan = yzBaslar ? 2 : 1; yz = 3 - insan; sira = 1;
      if (ornek) {
        [3, 3, 2].forEach(function (c, k) { son = g.h[c] * D4W + c; g.oyna(c, k % 2 ? 2 : 1); });
        sira = 2;
        dusun("Örnek konum: Kırmızı 4. ve 3. sütunlara, Mavi 4. sütuna oynadı. ");
      } else if (yzBaslar) dusun("Yeni oyun: YZ (Kırmızı) başlar. ");
      else { ciz(); yzB.disabled = true; st.innerHTML = "Yeni oyun: insan oyuncu Kırmızı ile başlar; bir sütun düğmesine tıklanır."; bilgi.innerHTML = "&nbsp;"; }
    }
    function yeniden() { if (!bitti && sira === yz) dusun(""); else sutunCiz(); }
    kutu.addEventListener("click", function (e) {
      var d = e.target.closest("[data-op]");
      if (!d) return;
      var op = d.getAttribute("data-op");
      if (op === "yeni-ben") yeni(false);
      else if (op === "yeni-yz") yeni(true);
      else if (op === "der-") { if (der > 1) { der--; yeniden(); } }
      else if (op === "der+") { if (der < 7) { der++; yeniden(); } }
      else if (op === "sira") { ortadan = !ortadan; yeniden(); }
    });
    yeni(false, true);
  });

  /* ---------- Dörtlü Bağla: derinliğe göre düğüm sayıları (başlangıç konumu) ---------- */
  demolar("b02m-d4-sira").forEach(function (kutu) {
    var satirlar = Array.prototype.slice.call(kutu.querySelectorAll("[data-d]")), k = 0;
    function parca() {
      if (k >= satirlar.length) return;
      var r = satirlar[k++], d = parseInt(r.getAttribute("data-d"), 10), g = new D4(), s1 = { n: 0 }, s2 = { n: 0 }, s3 = { n: 0 };
      var v1 = d4MM(g, d, 0, 1, false, SIRA_ORTA, s1);
      var v2 = d4AB(g, d, 0, 1, false, -INF, INF, SIRA_SOL, s2, null);
      var v3 = d4AB(g, d, 0, 1, false, -INF, INF, SIRA_ORTA, s3, null);
      var h = r.querySelectorAll("td");
      h[1].textContent = sayi(s1.n); h[2].textContent = sayi(s2.n); h[3].textContent = sayi(s3.n);
      h[4].textContent = v1 === v2 && v2 === v3 ? isaretli(v1) : "FARK";
      setTimeout(parca, 0);
    }
    setTimeout(parca, 200);
  });
})();
