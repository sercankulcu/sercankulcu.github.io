/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* Veri Yapıları laboratuvarı: sunuma gömülü, Java kodunu satır satır izleyen çalışma alanı (deck.js'ten sonra yüklenir).
   <div class="ds-deck__demo lab-demo" data-demo="dsy-lab">
     <script type="text/x-java" data-algo="secimli">…sunumdaki Java kodu…</script>   (bir ya da daha çok algoritma)
     <template class="lab-ornekler">
       <option data-algo="secimli" data-girdi="64, 25, 12, 22, 11">Seçimli sıralama: 64, 25, 12, 22, 11</option>
     </template>
   </div>
   Her algoritmanın modeli (MODELLER) girdiyi çözümler, gerekirse koddaki örnek değerleri girdiyle değiştirir ve işlemi
   gerçekten yürütür: her adımda çalışan satır, değişkenler, yapının çizimi, çıktı ve Türkçe açıklama üretilir.
   Geri düğmesi bir önceki adımın kaydını gösterir; adımlar girdi değişince yeniden hesaplanır.
   Modeller DOM kullanmaz; node altında require edilerek test edilir (module.exports). */
(function () {
  "use strict";

  /* ---------- ortak yardımcılar ---------- */
  function LabHata(msg) { this.msg = msg; }
  function hata(msg) { throw new LabHata(msg); }
  function kopya(x) { return x == null ? x : JSON.parse(JSON.stringify(x)); }
  function liste(d) { return "{" + d.join(", ") + "}"; }
  function jListe(d) { return "[" + d.join(", ") + "]"; }
  function jDouble(v) {
    if (Object.is(v, -0)) return "-0.0";
    if (Number.isInteger(v)) return v.toFixed(1);
    return String(v);
  }
  function kisa(v) {
    if (Number.isInteger(v)) return String(v);
    var t = (Math.round(v * 100) / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    return t.length > 5 ? (Math.round(v * 10) / 10).toFixed(1) : t;
  }
  function sayilar(t, en, enCok, alt, ust) {
    var p = String(t).split(/[,;\s]+/).filter(function (x) { return x !== ""; });
    if (p.length < en || p.length > enCok) hata("Girdi " + (en === enCok ? en : "en az " + en + ", en çok " + enCok) + " tam sayı içermeli.");
    return p.map(function (x) {
      if (!/^[-+]?\d+$/.test(x)) hata("“" + x + "” bir tam sayı değil; sayılar virgülle ayrılmalı.");
      var v = parseInt(x, 10);
      if (v < alt || v > ust) hata("Sayılar " + alt + " ile " + ust + " arasında olmalı (" + v + " uygun değil).");
      return v;
    });
  }
  function ikiParca(t, ad) {
    var p = String(t).split("|");
    if (p.length !== 2) hata("Girdi “" + ad + "” biçiminde, iki parçanın arasında | işaretiyle yazılmalı.");
    return p;
  }
  /* satırdaki ilk {…} ifadesini yeni öğelerle değiştirir */
  function suslu(satir, d) { return satir.replace(/\{[^}]*\}/, liste(d)); }
  function yerlestir(satirlar, anahtar, f) {
    return satirlar.map(function (s) { return s.indexOf(anahtar) >= 0 ? f(s) : s; });
  }

  /* izleyici: anahtar metin → satır numarası; her adım bir kayıt */
  function Izci(satirlar) { this.s = satirlar; this.adimlar = []; this.cikti = ""; this.ciktiAd = "Çıktı"; }
  Izci.prototype.satir = function (anahtar, kacinci) {
    var k = kacinci || 1;
    for (var i = 0; i < this.s.length; i++) if (this.s[i].indexOf(anahtar) >= 0 && --k === 0) return i + 1;
    throw new Error("Kodda satır bulunamadı: " + anahtar);
  };
  Izci.prototype.kaydet = function (anahtar, msg, vars, g, iz, ek) {
    var a = { satir: anahtar == null ? 0 : (Array.isArray(anahtar) ? this.satir(anahtar[0], anahtar[1]) : this.satir(anahtar)),
      msg: msg, vars: kopya(vars), g: kopya(g), cikti: this.cikti, ciktiAd: this.ciktiAd };
    if (iz != null) a.iz = iz;
    if (ek) for (var k in ek) a[k] = ek[k];
    this.adimlar.push(a);
  };

  /* dizi satırı: ad, değerler, işaretçiler {ad: indis}, sınıflar {indis: sınıf} */
  function sira(ad, d, isaret, sinif, ekle) {
    var r = { ad: ad, d: d.map(function (v) { return v == null ? "" : typeof v === "number" ? kisa(v) : String(v); }), c: [], p: [] };
    for (var i = 0; i < d.length; i++) { r.c.push(""); r.p.push(""); }
    if (sinif) for (var k in sinif) if (k >= 0 && k < d.length && sinif[k]) r.c[k] = (r.c[k] ? r.c[k] + " " : "") + sinif[k];
    if (isaret) for (var a in isaret) {
      var x = isaret[a];
      if (x == null) continue;
      if (x >= 0 && x < d.length) r.p[x] = r.p[x] ? r.p[x] + "," + a : a;
      else if (x === d.length) r.son = (r.son ? r.son + "," : "") + a;
    }
    if (ekle) for (var e in ekle) r[e] = ekle[e];
    return r;
  }
  function vlist(o) {
    var r = [];
    for (var k in o) if (o[k] != null) r.push([k, String(o[k])]);
    return r;
  }

  var MODELLER = {};

  /* ---------- Bölüm 2: ikili arama, önek ortalamaları ---------- */
  function aramaGirdisi(t) {
    var p = ikiParca(t, "sıralı sayılar | aranan");
    var d = sayilar(p[0], 1, 10, -99, 999), h = sayilar(p[1], 1, 1, -99, 999)[0];
    var s = d.slice().sort(function (x, y) { return x - y; });
    return { a: s, hedef: h, siralandi: s.join() !== d.join() };
  }
  MODELLER.ikiliArama = {
    etiket: "Girdi (sıralı sayılar | aranan)",
    coz: aramaGirdisi,
    calis: function (g, Z) {
      var a = g.a, n = a.length, lo = null, hi = null, mid = null, tur = 0;
      Z.ciktiAd = "Dönüş değeri";
      function A(k, msg, iz, sinif) {
        var c = {};
        for (var i = 0; i < n; i++) if (lo != null && (i < lo || i > hi)) c[i] = "is-off";
        if (sinif) for (var x in sinif) c[x] = sinif[x];
        Z.kaydet(k, msg, vlist({ hedef: g.hedef, lo: lo, hi: hi, mid: mid, "a[mid]": mid != null ? a[mid] : null, tur: tur }),
          { satir: [sira("a", a, { lo: lo, hi: hi, mid: mid }, c)] }, iz);
      }
      A("int ikiliArama", "ikiliArama, " + n + " öğeli sıralı a dizisi ve hedef = " + g.hedef + " ile çağrılır." +
        (g.siralandi ? " Girdi sıralı olmadığından dizi küçükten büyüğe sıralanarak kullanılır." : ""));
      lo = 0; hi = n - 1;
      A("int lo = 0", "lo = 0, hi = a.length − 1 = " + hi + "; arama aralığı a[0.." + hi + "].");
      for (;;) {
        if (lo > hi) {
          A("while (lo <= hi)", "lo = " + lo + " > hi = " + hi + ": aralık boşaldı, döngü biter.");
          Z.cikti = "-1";
          A("return -1", "Hedef " + g.hedef + " dizide yok; " + tur + " turdan sonra −1 döndürülür.", "R -1");
          return;
        }
        tur++; mid = null;
        A("while (lo <= hi)", "lo = " + lo + " ≤ hi = " + hi + ": aralıkta " + (hi - lo + 1) + " öğe var; " + tur + ". tur başlar.");
        mid = Math.floor((lo + hi) / 2);
        A("int mid", "mid = (" + lo + " + " + hi + ") / 2 = " + mid + " (tam sayı bölmesi); a[" + mid + "] = " + a[mid] + ".",
          "M " + lo + " " + hi + " " + mid, sin(mid, "is-cmp"));
        if (a[mid] === g.hedef) {
          Z.cikti = String(mid);
          A("if (a[mid] == hedef)", "a[" + mid + "] = " + a[mid] + " hedefe eşit: bulundu, " + mid + " döndürülür (" + tur + " tur).", "R " + mid, sin(mid, "is-done"));
          return;
        }
        A("if (a[mid] == hedef)", "a[" + mid + "] = " + a[mid] + " ≠ " + g.hedef + "; aranan değer bu konumda değil.", null, sin(mid, "is-cmp"));
        if (a[mid] < g.hedef) {
          lo = mid + 1;
          A("if (a[mid] < hedef)", "a[" + mid + "] = " + a[mid] + " < " + g.hedef + ": hedef sağ yarıda olabilir; lo = mid + 1 = " + lo + ".");
        } else {
          hi = mid - 1;
          A("else hi = mid - 1", "a[" + mid + "] = " + a[mid] + " > " + g.hedef + ": hedef sol yarıda olabilir; hi = mid − 1 = " + hi + ".");
        }
      }
    }
  };
  function sin(i, c) { var o = {}; o[i] = c; return o; }

  function onekGirdisi(t) { return { x: sayilar(t, 1, 7, -99, 99) }; }
  MODELLER.onekOrt1 = {
    etiket: "Girdi (virgülle ayrılmış sayılar)",
    coz: onekGirdisi,
    calis: function (g, Z) {
      var x = g.x, n = null, a = null, j = null, i = null, top = null, say = 0;
      Z.ciktiAd = "Dönüş değeri";
      function A(k, msg, iz, cx, ca) {
        var rows = [sira("x", x, { i: i, j: i == null ? j : null }, cx)];
        if (a) rows.push(sira("a", a, { j: j }, ca));
        Z.kaydet(k, msg, vlist({ n: n, j: j, i: i, top: top == null ? null : jDouble(top), toplama: say }), { satir: rows }, iz);
      }
      A("double[] onekOrt1", "onekOrt1, x = " + liste(x) + " dizisiyle çağrılır; a[j], x[0..j] öğelerinin ortalaması olacak.");
      n = x.length;
      A("int n = x.length", "n = x.length = " + n + ".");
      a = x.map(function () { return 0; });
      A("double[] a = new double[n]", "a dizisi " + n + " öğeyle oluşturulur; double öğeler 0.0 başlar.");
      for (j = 0; j < n; j++) {
        top = 0; i = null;
        A("double top = 0", "j = " + j + ": top = 0; x[0.." + j + "] baştan toplanacak.");
        for (i = 0; i <= j; i++) {
          top += x[i]; say++;
          var c = {};
          for (var q = 0; q <= i; q++) c[q] = "is-cmp";
          c[i] = "is-set";
          A("top += x[i]", "i = " + i + ": top += x[" + i + "] = " + x[i] + " → top = " + jDouble(top) + "; şimdiye kadar " + say + " toplama yapıldı.", null, c);
        }
        i = null;
        a[j] = top / (j + 1);
        A("a[j] = top / (j + 1)", "a[" + j + "] = " + jDouble(top) + " / " + (j + 1) + " = " + jDouble(a[j]) + "; iç döngü bu j için " + (j + 1) + " toplama yaptı.",
          null, null, sin(j, "is-set"));
      }
      j = null;
      Z.cikti = jListe(a.map(jDouble));
      A("return a", "Dış döngü bitti; a döndürülür. Toplam " + say + " toplama: 1 + 2 + … + n = n(n + 1)/2 = " + (n * (n + 1) / 2) + ", yani O(n²).",
        "A " + jListe(a.map(jDouble)) + " T " + say);
    }
  };
  MODELLER.onekOrt2 = {
    etiket: "Girdi (virgülle ayrılmış sayılar)",
    coz: onekGirdisi,
    calis: function (g, Z) {
      var x = g.x, n = null, a = null, j = null, top = null, say = 0;
      Z.ciktiAd = "Dönüş değeri";
      function A(k, msg, iz, cx, ca) {
        var rows = [sira("x", x, { j: j }, cx)];
        if (a) rows.push(sira("a", a, { j: j }, ca));
        Z.kaydet(k, msg, vlist({ n: n, j: j, top: top == null ? null : jDouble(top), toplama: say }), { satir: rows }, iz);
      }
      A("double[] onekOrt2", "onekOrt2, x = " + liste(x) + " dizisiyle çağrılır; toplam bir önceki turdan sürdürülecek.");
      n = x.length; a = x.map(function () { return 0; }); top = 0;
      A("int n = x.length", "n = " + n + "; a dizisi " + n + " öğeyle (0.0) oluşturulur ve top = 0.0 ile başlar.");
      for (j = 0; j < n; j++) {
        top += x[j]; say++;
        var c = {};
        for (var q = 0; q < j; q++) c[q] = "is-cmp";
        c[j] = "is-set";
        A("top += x[j]", "j = " + j + ": top += x[" + j + "] = " + x[j] + " → top = " + jDouble(top) + "; bu tek toplama x[0.." + j + "] toplamını verir (şimdiye kadar " + say + " toplama).", null, c);
        a[j] = top / (j + 1);
        A("a[j] = top / (j + 1)", "a[" + j + "] = " + jDouble(top) + " / " + (j + 1) + " = " + jDouble(a[j]) + ".", null, null, sin(j, "is-set"));
      }
      j = null;
      Z.cikti = jListe(a.map(jDouble));
      A("return a", "Döngü bitti; a döndürülür. Toplam " + say + " toplama: her j için bir toplama, yani O(n).", "A " + jListe(a.map(jDouble)) + " T " + say);
    }
  };

  /* ---------- Bölüm 3: seçimli ve eklemeli sıralama ---------- */
  function siralamaGirdisi(t) { return { d: sayilar(t, 2, 10, -99, 999) }; }
  MODELLER.secimli = {
    etiket: "Girdi (virgülle ayrılmış sayılar)",
    coz: siralamaGirdisi,
    kod: function (s, g) { return yerlestir(s, "int[] dizi = {", function (x) { return suslu(x, g.d); }); },
    calis: function (g, Z) {
      var d = g.d.slice(), n = null, i = null, j = null, mi = null, gec = null, k = 0, yerinde = 0;
      function A(key, msg, iz, sinif) {
        var c = {};
        for (var q = 0; q < yerinde; q++) c[q] = "is-done";
        if (sinif) for (var x in sinif) c[x] = (c[x] ? c[x] + " " : "") + sinif[x];
        Z.kaydet(key, msg, vlist({ n: n, i: i, j: j, minIndis: mi, gecici: gec, "karşılaştırma": k }),
          { satir: [sira("dizi", d, { i: i, j: j, min: mi }, c)] }, iz);
      }
      A("int[] dizi", "dizi " + d.length + " öğeyle oluşturulur: " + liste(d) + ".");
      n = d.length;
      A("int n = dizi.length", "n = dizi.length = " + n + "; dış döngü n − 1 = " + (n - 1) + " tur dönecek.");
      for (i = 0; ; i++) {
        j = null; mi = null; gec = null;
        if (i >= n - 1) {
          yerinde = n;
          A("for (int i = 0", "i = " + i + ": i < n − 1 koşulu yanlış, dış döngü biter. Dizi sıralandı: " + liste(d) + " (" + k + " karşılaştırma).",
            "K " + k);
          return;
        }
        A("for (int i = 0", "i = " + i + ": i < n − 1 koşulu doğru; dizi[" + i + "] konumuna dizi[" + i + ".." + (n - 1) + "] aralığının en küçük öğesi getirilecek.");
        mi = i;
        A("int minIndis = i", "minIndis = i = " + i + "; şimdilik en küçük aday dizi[" + i + "] = " + d[i] + ".", null, sin(i, "is-cmp"));
        for (j = i + 1; j < n; j++) {
          k++;
          var dogru = d[j] < d[mi], c = {};
          c[j] = "is-cmp"; c[mi] = "is-cmp";
          A("if (dizi[j] < dizi[minIndis])", "j = " + j + ": dizi[" + j + "] = " + d[j] + " < dizi[" + mi + "] = " + d[mi] +
            " karşılaştırması " + (dogru ? "doğru." : "yanlış; minIndis değişmez."), null, c);
          if (dogru) {
            mi = j;
            A("minIndis = j;", "minIndis = " + j + "; yeni en küçük aday " + d[j] + ".", null, sin(j, "is-cmp"));
          }
        }
        j = null;
        gec = d[mi];
        A("int gecici = dizi[minIndis]", "j = n olduğundan iç döngü bitti. gecici = dizi[" + mi + "] = " + gec +
          (mi === i ? "; en küçük öğe zaten yerinde, takas aynı konumda yapılır." : "; takas başlar."), null, sin(mi, "is-cmp"));
        d[mi] = d[i];
        A("dizi[minIndis] = dizi[i]", "dizi[" + mi + "] = dizi[" + i + "] = " + d[i] + ".", "S " + d.join(","), sin(mi, "is-set"));
        d[i] = gec; yerinde = i + 1;
        A("dizi[i] = gecici", "dizi[" + i + "] = gecici = " + gec + "; dizi[0.." + i + "] artık sıralı ve yerinde.", "S " + d.join(","), sin(i, "is-set"));
      }
    }
  };
  MODELLER.eklemeli = {
    etiket: "Girdi (virgülle ayrılmış sayılar)",
    coz: siralamaGirdisi,
    calis: function (g, Z) {
      var a = g.d.slice(), n = a.length, k = null, anahtar = null, j = null, kars = 0, sirali = 1;
      function A(key, msg, iz, sinif) {
        var c = {};
        for (var q = 0; q < sirali; q++) c[q] = "is-done";
        if (sinif) for (var x in sinif) c[x] = sinif[x];
        Z.kaydet(key, msg, vlist({ k: k, anahtar: anahtar, j: j, "karşılaştırma": kars }), { satir: [sira("a", a, { k: k, j: j }, c)] }, iz);
      }
      A("static void eklemeliSirala", "eklemeliSirala, a = " + liste(a) + " dizisiyle çağrılır; tek öğeli a[0..0] başlangıçta sıralı sayılır.");
      for (k = 1; ; k++) {
        j = null; anahtar = null;
        if (k >= n) {
          A("for (int k = 1", "k = " + k + " = a.length: döngü biter. Dizi sıralandı: " + liste(a) + " (" + kars + " karşılaştırma).", "K " + kars);
          return;
        }
        anahtar = a[k];
        A("int anahtar = a[k]", "k = " + k + ": anahtar = a[" + k + "] = " + anahtar + "; anahtar sıralı a[0.." + (k - 1) + "] kısmına yerleştirilecek.", null, sin(k, "is-cmp"));
        j = k;
        A("int j = k", "j = k = " + k + "; anahtarın yeri bu konumdan sola doğru aranır.", null, sin(j, "is-cmp"));
        for (;;) {
          if (j > 0) {
            kars++;
            var buyuk = a[j - 1] > anahtar, c = {};
            c[j - 1] = "is-cmp";
            A("while (j > 0", "j = " + j + " > 0 ve a[" + (j - 1) + "] = " + a[j - 1] + " > anahtar = " + anahtar + " karşılaştırması " +
              (buyuk ? "doğru: " + a[j - 1] + " bir sağa kayacak." : "yanlış: anahtarın yeri bulundu, döngü biter."), null, c);
            if (!buyuk) break;
          } else {
            A("while (j > 0", "j = 0: dizinin başına ulaşıldı, döngü biter.");
            break;
          }
          a[j] = a[j - 1];
          A("a[j] = a[j - 1]", "a[" + j + "] = a[" + (j - 1) + "] = " + a[j] + " (sağa kaydırma).", "S " + a.join(","), sin(j, "is-set"));
          j--;
          A("j--", "j bir azalır: j = " + j + ".");
        }
        a[j] = anahtar; sirali = k + 1;
        A("a[j] = anahtar", "a[" + j + "] = anahtar = " + anahtar + "; a[0.." + k + "] artık sıralı.", "S " + a.join(","), sin(j, "is-set"));
      }
    }
  };

  /* ---------- Bölüm 4: çağrı yığını ---------- */
  /* çerçeve: ad (çağrı), y (yerel değişkenler), d (durum) */
  function CagriIzi(Z, kok) { this.Z = Z; this.fr = [{ ad: "main", y: "", d: "" }]; this.cagri = 0; this.kok = kok; }
  CagriIzi.prototype.ust = function () { return this.fr[this.fr.length - 1]; };
  CagriIzi.prototype.A = function (k, msg, iz, ek) {
    var fr = this.fr.map(function (f, i, all) { return { ad: f.ad, y: f.y, d: f.d, c: i === all.length - 1 ? "is-top" : "" }; });
    var u = this.ust(), v = { "derinlik": this.fr.length - 1, "çağrı sayısı": this.cagri };
    var vars = (u.v || []).concat(vlist(v));
    var g = { cerceve: fr };
    if (ek) g.satir = ek;
    this.Z.kaydet(k, msg, vars, g, iz);
  };
  CagriIzi.prototype.gir = function (ad, y, v) { this.cagri++; this.fr.push({ ad: ad, y: y, d: "çalışıyor", v: v }); };
  CagriIzi.prototype.cik = function () { this.fr.pop(); };

  MODELLER.faktoriyel = {
    etiket: "Girdi (n, 0–10)",
    coz: function (t) { return { n: sayilar(t, 1, 1, 0, 10)[0] }; },
    kod: function (s, g) { return yerlestir(s, "System.out.println(faktoriyel(", function (x) { return x.replace(/faktoriyel\(\d+\)/, "faktoriyel(" + g.n + ")"); }); },
    calis: function (g, Z) {
      var C = new CagriIzi(Z);
      C.ust().d = "bekliyor: faktoriyel(" + g.n + ")";
      C.A("System.out.println(faktoriyel(", "main, faktoriyel(" + g.n + ") çağrısını yapar; çağrı yığınına yeni bir çerçeve eklenecek.");
      function f(n) {
        C.gir("faktoriyel(" + n + ")", "n = " + n, [["n", String(n)]]);
        var taban = n <= 1;
        C.A("if (n <= 1)", "Yeni çerçeve: n = " + n + ". n <= 1 koşulu " + (taban ? "doğru: taban durum." : "yanlış: özyinelemeli adım."), "C " + n);
        if (taban) {
          C.ust().d = "dönüş 1";
          C.A("return 1;", "faktoriyel(" + n + ") = 1 döner; bu çerçeve yığından çıkar.", "R 1");
          C.cik();
          return 1;
        }
        C.ust().d = "bekliyor: faktoriyel(" + (n - 1) + ")";
        C.A("return n * faktoriyel(n - 1)", "Çarpım için önce faktoriyel(" + (n - 1) + ") çağrılır; n = " + n + " olan çerçeve dönüşü bekler.");
        var r = f(n - 1), v = Math.imul(n, r);
        C.ust().d = "dönüş " + v;
        C.ust().v = [["n", String(n)], ["faktoriyel(n - 1)", String(r)]];
        C.A("return n * faktoriyel(n - 1)", "faktoriyel(" + (n - 1) + ") = " + r + " döndü; " + n + " * " + r + " = " + v + " döndürülür ve çerçeve yığından çıkar.", "R " + v);
        C.cik();
        return v;
      }
      var r = f(g.n);
      C.ust().d = "";
      Z.cikti = r + "\n";
      C.A("System.out.println(faktoriyel(", "faktoriyel(" + g.n + ") = " + r + " ekrana yazılır; çağrı yığınında yalnız main kaldı. En büyük derinlik " + Math.max(1, g.n) + " çerçeve.", "O " + r);
    }
  };
  MODELLER.toplam = {
    etiket: "Girdi (virgülle ayrılmış sayılar)",
    coz: function (t) { return { a: sayilar(t, 1, 8, -99, 999) }; },
    kod: function (s, g) {
      s = yerlestir(s, "int[] a = {", function (x) { return suslu(x, g.a); });
      return yerlestir(s, "System.out.println(toplam(", function (x) { return x.replace(/toplam\(a, \d+\)/, "toplam(a, " + g.a.length + ")"); });
    },
    calis: function (g, Z) {
      var a = g.a, C = new CagriIzi(Z), hl = null;
      function dz() { var c = {}; if (hl != null) c[hl[0]] = hl[1]; return [sira("a", a, null, c)]; }
      C.A("int[] a = {", "a dizisi oluşturulur: " + liste(a) + ".", null, dz());
      C.ust().d = "bekliyor: toplam(a, " + a.length + ")";
      C.A("System.out.println(toplam(", "main, toplam(a, " + a.length + ") çağrısını yapar: ilk " + a.length + " öğenin toplamı istenir.", null, dz());
      function f(n) {
        C.gir("toplam(a, " + n + ")", "n = " + n, [["n", String(n)]]);
        var taban = n === 0;
        hl = null;
        C.A("if (n == 0)", "Yeni çerçeve: n = " + n + ". n == 0 koşulu " + (taban ? "doğru: boş önekin toplamı 0." : "yanlış: özyinelemeli adım."), "C " + n, dz());
        if (taban) {
          C.ust().d = "dönüş 0";
          C.A("return 0;", "toplam(a, 0) = 0 döner; çerçeve yığından çıkar.", "R 0", dz());
          C.cik();
          return 0;
        }
        C.ust().d = "bekliyor: toplam(a, " + (n - 1) + ")";
        C.A("return toplam(a, n - 1) + a[n - 1]", "Önce toplam(a, " + (n - 1) + ") çağrılır; a[" + (n - 1) + "] sonra eklenecek.", null, dz());
        var r = f(n - 1), v = (r + a[n - 1]) | 0;
        hl = [n - 1, "is-set"];
        C.ust().d = "dönüş " + v;
        C.ust().v = [["n", String(n)], ["toplam(a, n - 1)", String(r)], ["a[n - 1]", String(a[n - 1])]];
        C.A("return toplam(a, n - 1) + a[n - 1]", "toplam(a, " + (n - 1) + ") = " + r + " döndü; " + r + " + a[" + (n - 1) + "] = " + r + " + " + a[n - 1] + " = " + v + " döndürülür.", "R " + v, dz());
        C.cik();
        return v;
      }
      var r = f(a.length);
      hl = null;
      C.ust().d = "";
      Z.cikti = r + "\n";
      C.A("System.out.println(toplam(", "toplam(a, " + a.length + ") = " + r + " ekrana yazılır. " + (a.length + 1) + " çağrı yapıldı, her biri O(1) iş: O(n).", "O " + r, dz());
    }
  };
  MODELLER.fib = {
    etiket: "Girdi (n, 0–7)",
    coz: function (t) { return { n: sayilar(t, 1, 1, 0, 7)[0] }; },
    kod: function (s, g) { return yerlestir(s, "System.out.println(fib(", function (x) { return x.replace(/fib\(\d+\)/, "fib(" + g.n + ")"); }); },
    calis: function (g, Z) {
      var C = new CagriIzi(Z), bilinen = {};
      C.ust().d = "bekliyor: fib(" + g.n + ")";
      C.A("System.out.println(fib(", "main, fib(" + g.n + ") çağrısını yapar.");
      function f(n) {
        C.gir("fib(" + n + ")", "n = " + n, [["n", String(n)]]);
        var tekrar = bilinen[n] ? " fib(" + n + ") daha önce de hesaplanmıştı; aynı iş yeniden yapılıyor." : "";
        if (n <= 1) {
          C.ust().d = "dönüş " + n;
          C.A("if (n <= 1) return n;", "Yeni çerçeve: n = " + n + " ≤ 1, taban durum: fib(" + n + ") = " + n + " döner." + tekrar, "C " + n + " R " + n);
          bilinen[n] = true;
          C.cik();
          return n;
        }
        C.A("if (n <= 1) return n;", "Yeni çerçeve: n = " + n + " > 1, özyinelemeli adım." + tekrar, "C " + n);
        C.ust().d = "bekliyor: fib(" + (n - 1) + ")";
        C.A("return fib(n - 1) + fib(n - 2)", "Önce fib(" + (n - 1) + ") çağrılır; fib(" + (n - 2) + ") ondan sonra hesaplanacak.");
        var x = f(n - 1);
        C.ust().d = "bekliyor: fib(" + (n - 2) + ")";
        C.ust().v = [["n", String(n)], ["fib(n - 1)", String(x)]];
        C.A("return fib(n - 1) + fib(n - 2)", "fib(" + (n - 1) + ") = " + x + " döndü; şimdi fib(" + (n - 2) + ") çağrılır.");
        var y = f(n - 2), v = (x + y) | 0;
        C.ust().d = "dönüş " + v;
        C.ust().v = [["n", String(n)], ["fib(n - 1)", String(x)], ["fib(n - 2)", String(y)]];
        C.A("return fib(n - 1) + fib(n - 2)", "fib(" + (n - 2) + ") = " + y + " döndü; " + x + " + " + y + " = " + v + " döndürülür.", "R " + v);
        bilinen[n] = true;
        C.cik();
        return v;
      }
      var r = f(g.n);
      C.ust().d = "";
      Z.cikti = r + "\n";
      C.A("System.out.println(fib(", "fib(" + g.n + ") = " + r + " ekrana yazılır. Toplam " + C.cagri + " çağrı yapıldı; aynı değerler tekrar tekrar hesaplandığı için çağrı sayısı üstel büyür.", "O " + r);
    }
  };
  MODELLER.hizliUs = {
    etiket: "Girdi (x, n)",
    coz: function (t) { var p = sayilar(t, 2, 2, -99, 999); if (p[1] < 0 || p[1] > 99) hata("Üs n 0 ile 99 arasında olmalı."); return { x: p[0], n: p[1] }; },
    kod: function (s, g) { return yerlestir(s, "System.out.println(hizliUs(", function (x) { return x.replace(/hizliUs\([^)]*\)/, "hizliUs(" + g.x + ", " + g.n + ")"); }); },
    calis: function (g, Z) {
      var C = new CagriIzi(Z), X = BigInt(g.x), tasma = false;
      function L(v) { var r = BigInt.asIntN(64, v); if (r !== v) tasma = true; return r; }
      C.ust().d = "bekliyor: hizliUs(" + g.x + ", " + g.n + ")";
      C.A("System.out.println(hizliUs(", "main, hizliUs(" + g.x + ", " + g.n + ") çağrısını yapar.");
      function f(n) {
        C.gir("hizliUs(" + g.x + ", " + n + ")", "x = " + g.x + ", n = " + n, [["x", String(g.x)], ["n", String(n)]]);
        if (n === 0) {
          C.ust().d = "dönüş 1";
          C.A("if (n == 0) return 1;", "Yeni çerçeve: n = 0, taban durum: x⁰ = 1 döner.", "C 0 R 1");
          C.cik();
          return 1n;
        }
        C.A("if (n == 0) return 1;", "Yeni çerçeve: n = " + n + " ≠ 0.", "C " + n);
        C.ust().d = "bekliyor: hizliUs(" + g.x + ", " + Math.floor(n / 2) + ")";
        C.A("long y = hizliUs(x, n / 2)", "y için hizliUs(x, " + n + " / 2) = hizliUs(" + g.x + ", " + Math.floor(n / 2) + ") çağrılır; üs her çağrıda yarıya iner.");
        var y = f(Math.floor(n / 2));
        C.ust().v = [["x", String(g.x)], ["n", String(n)], ["y", String(y)]];
        C.ust().d = "y = " + y;
        C.A("long y = hizliUs(x, n / 2)", "Dönen değer y = " + y + ".");
        var v;
        if (n % 2 === 0) {
          v = L(y * y);
          C.ust().d = "dönüş " + v;
          C.A("if (n % 2 == 0) return y * y;", "n = " + n + " çift: y * y = " + v + " döndürülür.", "R " + v);
        } else {
          C.A("if (n % 2 == 0) return y * y;", "n = " + n + " tek; koşul yanlış.");
          v = L(L(X * y) * y);
          C.ust().d = "dönüş " + v;
          C.A("return x * y * y", "n tek olduğundan x * y * y = " + g.x + " * " + y + " * " + y + " = " + v + " döndürülür.", "R " + v);
        }
        C.cik();
        return v;
      }
      var r = f(g.n);
      C.ust().d = "";
      Z.cikti = r + "\n";
      C.A("System.out.println(hizliUs(", "hizliUs(" + g.x + ", " + g.n + ") = " + r + " ekrana yazılır. " + C.cagri + " çağrı yapıldı: O(log n)." +
        (tasma ? " Sonuç long sınırını aştığı için Java'daki gibi taşma oldu (64 bit, mod 2⁶⁴)." : ""), "O " + r);
    }
  };
  MODELLER.ikiliAra = {
    etiket: "Girdi (sıralı sayılar | aranan)",
    coz: aramaGirdisi,
    kod: function (s, g) { return yerlestir(s, "System.out.println(ikiliAra(", function (x) { return x.replace(/ikiliAra\(a, [^)]*\)/, "ikiliAra(a, " + g.hedef + ", 0, " + (g.a.length - 1) + ")"); }); },
    calis: function (g, Z) {
      var a = g.a, x = g.hedef, C = new CagriIzi(Z), lo = null, hi = null, mid = null, son = null;
      function dz() {
        var c = {};
        for (var i = 0; i < a.length; i++) if (lo != null && (i < lo || i > hi)) c[i] = "is-off";
        if (mid != null) c[mid] = son || "is-cmp";
        return [sira("a", a, { lo: lo, hi: hi, mid: mid }, c)];
      }
      C.ust().d = "bekliyor: ikiliAra(a, " + x + ", 0, " + (a.length - 1) + ")";
      C.A("System.out.println(ikiliAra(", "main, a = " + liste(a) + " içinde " + x + " değerini ikiliAra(a, " + x + ", 0, " + (a.length - 1) + ") ile arar." +
        (g.siralandi ? " Girdi sıralı olmadığından dizi sıralanarak kullanılır." : ""), null, dz());
      function f(l, h) {
        lo = l; hi = h; mid = null; son = null;
        C.gir("ikiliAra(lo = " + l + ", hi = " + h + ")", "lo = " + l + ", hi = " + h, [["x", String(x)], ["lo", String(l)], ["hi", String(h)]]);
        if (l > h) {
          C.ust().d = "dönüş -1";
          C.A("if (lo > hi) return -1;", "Yeni çerçeve: lo = " + l + " > hi = " + h + ", aralık boş: taban durum, −1 döner.", "C " + l + " " + h + " R -1", dz());
          C.cik();
          return -1;
        }
        C.A("if (lo > hi) return -1;", "Yeni çerçeve: lo = " + l + " ≤ hi = " + h + "; aralıkta " + (h - l + 1) + " öğe var.", "C " + l + " " + h, dz());
        var m = Math.floor((l + h) / 2);
        mid = m;
        C.ust().v = [["x", String(x)], ["lo", String(l)], ["hi", String(h)], ["mid", String(m)]];
        C.A("int mid = (lo + hi) / 2", "mid = (" + l + " + " + h + ") / 2 = " + m + "; a[" + m + "] = " + a[m] + ".", null, dz());
        if (a[m] === x) {
          son = "is-done";
          C.ust().d = "dönüş " + m;
          C.A("if (a[mid] == x) return mid;", "a[" + m + "] = " + a[m] + " = x: taban durum, bulundu; " + m + " döner.", "R " + m, dz());
          C.cik();
          return m;
        }
        C.A("if (a[mid] == x) return mid;", "a[" + m + "] = " + a[m] + " ≠ " + x + ".", null, dz());
        var r;
        if (x < a[m]) {
          C.ust().d = "bekliyor: ikiliAra(a, " + x + ", " + l + ", " + (m - 1) + ")";
          C.A("return ikiliAra(a, x, lo, mid - 1)", x + " < a[" + m + "] = " + a[m] + ": sol yarıda aranır, ikiliAra(a, " + x + ", " + l + ", " + (m - 1) + ") çağrılır.", null, dz());
          r = f(l, m - 1);
          lo = l; hi = h; mid = m; son = null;
          C.ust().d = "dönüş " + r;
          C.A("return ikiliAra(a, x, lo, mid - 1)", "Alt çağrı " + r + " döndürdü; bu çerçeve aynı değeri döndürür (kuyruk çağrısı).", "R " + r, dz());
        } else {
          C.ust().d = "bekliyor: ikiliAra(a, " + x + ", " + (m + 1) + ", " + h + ")";
          C.A("return ikiliAra(a, x, mid + 1, hi)", x + " > a[" + m + "] = " + a[m] + ": sağ yarıda aranır, ikiliAra(a, " + x + ", " + (m + 1) + ", " + h + ") çağrılır.", null, dz());
          r = f(m + 1, h);
          lo = l; hi = h; mid = m; son = null;
          C.ust().d = "dönüş " + r;
          C.A("return ikiliAra(a, x, mid + 1, hi)", "Alt çağrı " + r + " döndürdü; bu çerçeve aynı değeri döndürür (kuyruk çağrısı).", "R " + r, dz());
        }
        C.cik();
        return r;
      }
      var r = f(0, a.length - 1);
      lo = hi = mid = null;
      C.ust().d = "";
      Z.cikti = r + "\n";
      C.A("System.out.println(ikiliAra(", r >= 0 ? r + " ekrana yazılır: " + x + " değeri a[" + r + "] konumunda." : "−1 ekrana yazılır: " + x + " dizide yok.", "O " + r, dz());
    }
  };

  /* ---------- Bölüm 7: parantez kontrolü ve postfix değerlendirme ---------- */
  function karakter(c) { return "'" + c + "'"; }
  MODELLER.parantez = {
    etiket: "Girdi (yalnız ( ) [ ] { } karakterleri)",
    coz: function (t) {
      var s = String(t).replace(/\s+/g, "");
      if (!s.length || s.length > 12) hata("Girdi 1 ile 12 arasında parantez karakteri içermeli.");
      if (!/^[()[\]{}]+$/.test(s)) hata("Girdide yalnız ( ) [ ] { } karakterleri olmalı.");
      return { s: s };
    },
    calis: function (g, Z) {
      var s = g.s.split(""), y = [], c = null, acik = null, pos = null;
      Z.ciktiAd = "Dönüş değeri";
      function A(k, msg, iz, ys) {
        var cs = {};
        for (var i = 0; i < s.length; i++) if (pos != null && i < pos) cs[i] = "is-off";
        if (pos != null && pos < s.length) cs[pos] = "is-cmp";
        var yc = {};
        if (ys) yc[ys[0]] = ys[1];
        Z.kaydet(k, msg, vlist({ c: c == null ? null : karakter(c), acik: acik == null ? null : karakter(acik), "yigin.size()": y.length }),
          { satir: [sira("s", s, { c: pos < s.length ? pos : null }, cs), sira("yigin", y.length ? y : [], y.length ? { tepe: y.length - 1 } : null, yc, { bos: "boş", yigin: true })] }, iz);
      }
      A("boolean gecerliMi", "gecerliMi(\"" + g.s + "\") çağrılır: " + s.length + " karakter soldan sağa taranacak.");
      A("Deque<Character> yigin", "Açık parantezleri tutacak boş bir yığın oluşturulur.");
      function son(v, msg, k) { Z.cikti = String(v); A(k, msg, "R " + v); }
      for (pos = 0; pos < s.length; pos++) {
        c = s[pos]; acik = null;
        if (c === "(" || c === "[" || c === "{") {
          A("if (c == '('", "c = " + karakter(c) + " bir açılış parantezi; koşul doğru.");
          y.push(c);
          A("yigin.push(c)", karakter(c) + " yığının tepesine eklendi; tepe artık " + karakter(c) + ", boyut " + y.length + ".", "Y " + jListe(y), [y.length - 1, "is-set"]);
          continue;
        }
        A("if (c == '('", "c = " + karakter(c) + " bir kapanış parantezi; else dalına geçilir.");
        if (!y.length) {
          son(false, "Yığın boş: " + karakter(c) + " kapanışının eşleşeceği açılış yok; false döner.", "if (yigin.isEmpty()) return false;");
          return;
        }
        A("if (yigin.isEmpty()) return false;", "Yığın boş değil (boyut " + y.length + ").");
        acik = y.pop();
        A("char acik = yigin.pop()", "acik = pop() = " + karakter(acik) + "; yığında " + y.length + " öğe kaldı.", "Y " + jListe(y));
        var es = { "(": ")", "[": "]", "{": "}" }[acik] === c;
        var sat = { "(": "return (a == '('", "[": "|| (a == '['", "{": "|| (a == '{'" }[acik];
        A(sat, "eslesir(" + karakter(acik) + ", " + karakter(c) + "): " + karakter(acik) + " ile " + karakter(c) + (es ? " aynı türden; true döner." : " farklı türden; false döner."));
        if (!es) {
          son(false, "eslesir false döndü: " + karakter(acik) + " açılışı " + karakter(c) + " ile kapanamaz; gecerliMi false döner.", "if (!eslesir(acik, c)) return false;");
          return;
        }
        A("if (!eslesir(acik, c)) return false;", "Eşleşme doğru; sıradaki karaktere geçilir.");
      }
      pos = s.length; c = null; acik = null;
      son(!y.length, "Bütün karakterler işlendi. Yığın " + (y.length ? y.length + " kapanmamış açılış içeriyor; false döner." : "boş; bütün parantezler eşleşti, true döner."), "return yigin.isEmpty();");
    }
  };
  MODELLER.postfix = {
    etiket: "Girdi (tek haneli sayılar ve + - * / işleçleri)",
    coz: function (t) {
      var s = String(t).replace(/\s+/g, "");
      if (!s.length || s.length > 12) hata("İfade 1 ile 12 arasında karakter içermeli (boşluklar atılır).");
      if (!/^[0-9+\-*/]+$/.test(s)) hata("İfadede yalnız 0–9 rakamları ve + - * / işleçleri olmalı.");
      return { s: s };
    },
    calis: function (g, Z) {
      var s = g.s.split(""), y = [], c = null, sag = null, sol = null, pos = null;
      Z.ciktiAd = "Dönüş değeri";
      function A(k, msg, iz, ys, ek) {
        var cs = {};
        for (var i = 0; i < s.length; i++) if (pos != null && i < pos) cs[i] = "is-off";
        if (pos != null && pos < s.length) cs[pos] = "is-cmp";
        var yc = {};
        if (ys) yc[ys[0]] = ys[1];
        Z.kaydet(k, msg, vlist({ c: c == null ? null : karakter(c), sag: sag, sol: sol, "yigin.size()": y.length }),
          { satir: [sira("ifade", s, { c: pos < s.length ? pos : null }, cs), sira("yigin", y, y.length ? { tepe: y.length - 1 } : null, yc, { bos: "boş", yigin: true })] }, iz, ek);
      }
      A("int postfixDegerlendir", "postfixDegerlendir(\"" + g.s + "\") çağrılır; ifade soldan sağa bir kez taranacak.");
      A("Deque<Integer> yigin", "İşlenenleri tutacak boş bir yığın oluşturulur.");
      function hataAdimi(k, msg, iz) { Z.cikti = iz.slice(2); A(k, msg, iz, null, { hata: true }); }
      for (pos = 0; pos < s.length; pos++) {
        c = s[pos]; sag = sol = null;
        if (/\d/.test(c)) {
          A("if (Character.isDigit(c))", "c = " + karakter(c) + " bir rakam; işlenen olarak yığına girecek.");
          y.push(c.charCodeAt(0) - 48);
          A("yigin.push(c - '0')", "c − '0' = " + y[y.length - 1] + " yığının tepesine eklendi; boyut " + y.length + ".", "Y " + jListe(y), [y.length - 1, "is-set"]);
          continue;
        }
        A("if (Character.isDigit(c))", "c = " + karakter(c) + " bir işleç; iki işlenen yığından alınacak.");
        if (!y.length) { hataAdimi("int sag = yigin.pop()", "Yığın boş: pop() NoSuchElementException fırlatır. İşleç için işlenen yok; ifade geçersiz.", "E NoSuchElementException"); return; }
        sag = y.pop();
        A("int sag = yigin.pop()", "sag = pop() = " + sag + " (sağ işlenen önce çıkar).", "Y " + jListe(y));
        if (!y.length) { hataAdimi("int sol = yigin.pop()", "Yığın boş: ikinci pop() NoSuchElementException fırlatır. " + karakter(c) + " için tek işlenen var; ifade geçersiz.", "E NoSuchElementException"); return; }
        sol = y.pop();
        A("int sol = yigin.pop()", "sol = pop() = " + sol + " (sol işlenen ikinci çıkar).", "Y " + jListe(y));
        var sat = { "+": "case '+'", "-": "case '-'", "*": "case '*'", "/": "default:" }[c];
        if (c === "/" && sag === 0) { hataAdimi(sat, "hesapla(" + sol + ", '/', 0): sıfıra bölme; Java ArithmeticException (/ by zero) fırlatır.", "E ArithmeticException"); return; }
        var v = c === "+" ? (sol + sag) | 0 : c === "-" ? (sol - sag) | 0 : c === "*" ? Math.imul(sol, sag) : (sol / sag) | 0;
        A(sat, "hesapla(" + sol + ", " + karakter(c) + ", " + sag + ") = " + sol + " " + c + " " + sag + " = " + v + (c === "/" ? " (tam sayı bölmesi)." : "."));
        y.push(v);
        A("yigin.push(hesapla", "Sonuç " + v + " yığına geri konur; boyut " + y.length + ".", "Y " + jListe(y), [y.length - 1, "is-set"]);
      }
      pos = s.length; c = null; sag = sol = null;
      if (!y.length) { hataAdimi("return yigin.pop()", "İfade bitti ama yığın boş; pop() NoSuchElementException fırlatır.", "E NoSuchElementException"); return; }
      var r = y.pop();
      Z.cikti = String(r);
      A("return yigin.pop()", "İfade bitti; tepedeki " + r + " döndürülür." + (y.length ? " Yığında " + y.length + " değer daha kaldı: işleç eksik, ifade aslında kusurlu." : ""), "R " + r);
    }
  };

  /* ---------- Bölüm 9: yığın ve kuyrukla ağaç gezinmeleri ---------- */
  function agacGirdisi(t) {
    var p = String(t).split(/[,;\s]+/).filter(function (x) { return x !== ""; });
    if (!p.length || p.length > 15) hata("Girdi en çok 15 öğe (4 düzey) içermeli.");
    if (p[0] === "-") hata("Kök boş olamaz: ilk öğe bir değer olmalı.");
    var dugum = p.map(function (x, i) {
      if (x === "-") return null;
      if (!/^[A-Za-z0-9ÇĞİÖŞÜçğıöşü]{1,3}$/.test(x)) hata("“" + x + "” uygun değil; değerler en çok 3 harf ya da rakam, boş yer için - olmalı.");
      return { i: i, v: x };
    });
    dugum.forEach(function (d, i) {
      if (!d || i === 0) return;
      if (!dugum[(i - 1) >> 1]) hata((i + 1) + ". öğe (" + d.v + ") boş bir konumun çocuğu; ebeveyni olmayan düğüm olamaz.");
    });
    dugum.forEach(function (d) {
      if (!d) return;
      d.sol = dugum[2 * d.i + 1] || null;
      d.sag = dugum[2 * d.i + 2] || null;
    });
    return { dugum: dugum, kok: dugum[0] };
  }
  function agacG(g, isaretler, ziyaret, kap, kapAd, kapUc) {
    var c = {};
    for (var k in ziyaret) c[k] = "is-done";
    kap.forEach(function (d) { c[d.i] = (c[d.i] ? c[d.i] + " " : "") + "is-in"; });
    for (var a in isaretler) if (isaretler[a]) c[isaretler[a].i] = (c[isaretler[a].i] ? c[isaretler[a].i] + " " : "") + "is-cur";
    var etiket = {};
    for (var b in isaretler) if (isaretler[b]) etiket[isaretler[b].i] = etiket[isaretler[b].i] ? etiket[isaretler[b].i] + "," + b : b;
    var dl = g.dugum.map(function (d) { return d ? { i: d.i, v: d.v } : null; }).filter(Boolean);
    var vals = kap.map(function (d) { return d.v; });
    var isr = {};
    if (vals.length) isr[kapUc] = kapUc === "ön" ? 0 : vals.length - 1;
    return { agac: { d: dl, c: c, e: etiket }, satir: [sira(kapAd, vals, isr, null, { bos: "boş", yigin: kapAd === "yigin" })] };
  }
  function ad(d) { return d ? d.v : "null"; }
  function ust1(y) { return y.slice().reverse().map(ad); }
  MODELLER.kokBastaYigin = {
    etiket: "Girdi (düzey sırasıyla değerler, boş yer için -)",
    coz: agacGirdisi,
    calis: function (g, Z) {
      var y = [], gec = null, zz = {};
      function A(k, msg, iz) {
        Z.kaydet(k, msg, vlist({ gecici: gec ? gec.v : "—", "yigin.size()": y.length }), agacG(g, { gecici: gec }, zz, y, "yigin", "tepe"), iz);
      }
      A("public void kokBastaYigin", "kokBastaYigin, kök " + g.kok.v + " ile çağrılır; kök null değil.");
      A("Deque<AgacDugumu> yigin", "Bekleyen düğümler için boş bir yığın oluşturulur.");
      y.push(g.kok);
      A("yigin.push(kok)", "Kök " + g.kok.v + " yığına itildi.");
      for (;;) {
        var iz = "W " + jListe(ust1(y));
        if (!y.length) { gec = null; A("while (!yigin.isEmpty())", "Yığın boş; gezinme bitti. Kök önde sıra: " + Z.cikti.trim() + ".", iz); return; }
        A("while (!yigin.isEmpty())", "Yığında " + y.length + " düğüm var; döngü sürer.", iz);
        gec = y.pop();
        A("AgacDugumu gecici = yigin.pop()", "gecici = pop() = " + gec.v + "; yığında " + y.length + " düğüm kaldı.");
        zz[gec.i] = 1; Z.cikti += gec.v + " ";
        A("System.out.print(gecici.veri", gec.v + " yazdırıldı: düğüm, çocuklarından önce ziyaret edilir.", "P " + gec.v);
        if (gec.sag) { y.push(gec.sag); A("yigin.push(gecici.sag)", "Sağ çocuk " + gec.sag.v + " yığına itildi (önce sağ itilir, sol tepede kalsın)."); }
        else A("if (gecici.sag != null)", gec.v + " düğümünün sağ çocuğu yok.");
        if (gec.sol) { y.push(gec.sol); A("yigin.push(gecici.sol)", "Sol çocuk " + gec.sol.v + " yığına itildi; tepe artık " + gec.sol.v + ", sıradaki ziyaret odur."); }
        else A("if (gecici.sol != null)", gec.v + " düğümünün sol çocuğu yok.");
      }
    }
  };
  MODELLER.kokOrtadaYigin = {
    etiket: "Girdi (düzey sırasıyla değerler, boş yer için -)",
    coz: agacGirdisi,
    calis: function (g, Z) {
      var y = [], gec = null, zz = {};
      function A(k, msg, iz) {
        Z.kaydet(k, msg, vlist({ gecici: ad(gec), "yigin.size()": y.length }), agacG(g, { gecici: gec }, zz, y, "yigin", "tepe"), iz);
      }
      A("public void kokOrtadaYigin", "kokOrtadaYigin, kök " + g.kok.v + " ile çağrılır.");
      A("Deque<AgacDugumu> yigin", "Boş bir yığın oluşturulur.");
      gec = g.kok;
      A("AgacDugumu gecici = kok", "gecici = kök = " + gec.v + "; önce en soldaki düğüme inilecek.");
      for (;;) {
        var iz = "W " + jListe(ust1(y)) + " " + ad(gec);
        if (!y.length && !gec) { A("while (!yigin.isEmpty() || gecici != null)", "Yığın boş ve gecici null; gezinme bitti. Kök ortada sıra: " + Z.cikti.trim() + ".", iz); return; }
        A("while (!yigin.isEmpty() || gecici != null)", gec ? "gecici = " + gec.v + " null değil; döngü sürer." : "gecici null ama yığında " + y.length + " düğüm var; döngü sürer.", iz);
        if (gec) {
          A("if (gecici != null)", "gecici = " + gec.v + ": sola inilecek.");
          y.push(gec);
          A("yigin.push(gecici)", gec.v + " yığına itildi; sol alt ağacı bitince ziyaret edilecek.");
          gec = gec.sol;
          A("gecici = gecici.sol", gec ? "gecici = sol çocuk = " + gec.v + "." : "Sol çocuk yok: gecici = null.");
        } else {
          A("if (gecici != null)", "gecici null: sol uca ulaşıldı, else dalı.");
          gec = y.pop();
          A("gecici = yigin.pop()", "gecici = pop() = " + gec.v + "; sol alt ağacı tamamlandı.");
          zz[gec.i] = 1; Z.cikti += gec.v + " ";
          A("System.out.print(gecici.veri", gec.v + " yazdırıldı (sol alt ağaçtan sonra, sağdan önce).", "P " + gec.v);
          gec = gec.sag;
          A("gecici = gecici.sag", gec ? "gecici = sağ çocuk = " + gec.v + "; sağ alt ağaç aynı biçimde gezilecek." : "Sağ çocuk yok: gecici = null.");
        }
      }
    }
  };
  MODELLER.kokSondaYigin = {
    etiket: "Girdi (düzey sırasıyla değerler, boş yer için -)",
    coz: agacGirdisi,
    calis: function (g, Z) {
      var y = [], sim = null, gec = null, zz = {}, gecVar = false;
      function A(k, msg, iz) {
        Z.kaydet(k, msg, vlist({ simdiki: ad(sim), gecici: gecVar ? ad(gec) : "—", "yigin.size()": y.length }),
          agacG(g, { simdiki: sim, gecici: gecVar ? gec : null }, zz, y, "yigin", "tepe"), iz);
      }
      sim = g.kok;
      A("AgacDugumu simdiki = kok", "kokSondaYigin, kök " + g.kok.v + " ile çağrılır; simdiki = " + sim.v + ".");
      A("Deque<AgacDugumu> yigin", "Boş bir yığın oluşturulur.");
      for (;;) {
        var iz = "W " + jListe(ust1(y)) + " " + ad(sim);
        if (!sim && !y.length) { A("while (simdiki != null || !yigin.isEmpty())", "simdiki null ve yığın boş; gezinme bitti. Kök sonda sıra: " + Z.cikti.trim() + ".", iz); return; }
        A("while (simdiki != null || !yigin.isEmpty())", sim ? "simdiki = " + sim.v + "; döngü sürer." : "simdiki null ama yığında " + y.length + " düğüm var; döngü sürer.", iz);
        if (sim) {
          A("if (simdiki != null)", "simdiki = " + sim.v + ": sola inilecek.");
          y.push(sim);
          A("yigin.push(simdiki)", sim.v + " yığına itildi; iki alt ağacı bitince yazdırılacak.");
          sim = sim.sol;
          A("simdiki = simdiki.sol", sim ? "simdiki = sol çocuk = " + sim.v + "." : "Sol çocuk yok: simdiki = null.");
          continue;
        }
        A("if (simdiki != null)", "simdiki null; else dalı.");
        var tepe = y[y.length - 1];
        gec = tepe.sag; gecVar = true;
        A("AgacDugumu gecici = yigin.peek().sag", "Tepedeki " + tepe.v + " düğümünün sağ çocuğuna bakılır: gecici = " + ad(gec) + ".");
        if (gec) {
          A("if (gecici == null)", "gecici null değil: sağ alt ağaç henüz gezilmedi.");
          sim = gec;
          A("simdiki = gecici", "simdiki = " + sim.v + "; sağ alt ağaca inilecek.");
          continue;
        }
        A("if (gecici == null)", "Sağ çocuk yok: tepedeki düğümün iki alt ağacı da bitti.");
        gec = y.pop();
        A(["gecici = yigin.pop()", 1], "gecici = pop() = " + gec.v + ".");
        zz[gec.i] = 1; Z.cikti += gec.v + " ";
        A(["System.out.print(gecici.veri", 1], gec.v + " yazdırıldı (çocuklarından sonra).", "P " + gec.v);
        for (;;) {
          var devam = y.length && gec === y[y.length - 1].sag;
          A("while (!yigin.isEmpty()", !y.length ? "Yığın boş; iç döngü biter." :
            devam ? gec.v + ", tepedeki " + y[y.length - 1].v + " düğümünün sağ çocuğu: o düğümün de iki alt ağacı bitti." :
              gec.v + ", tepedeki " + y[y.length - 1].v + " düğümünün sağ çocuğu değil; iç döngü biter.");
          if (!devam) break;
          gec = y.pop();
          A(["gecici = yigin.pop()", 2], "gecici = pop() = " + gec.v + ".");
          zz[gec.i] = 1; Z.cikti += gec.v + " ";
          A(["System.out.print(gecici.veri", 2], gec.v + " yazdırıldı.", "P " + gec.v);
        }
      }
    }
  };
  MODELLER.seviyeSirasi = {
    etiket: "Girdi (düzey sırasıyla değerler, boş yer için -)",
    coz: agacGirdisi,
    calis: function (g, Z) {
      var q = [], gec = null, zz = {};
      function A(k, msg, iz) {
        Z.kaydet(k, msg, vlist({ gecici: gec ? gec.v : "—", "kuyruk.size()": q.length }), agacG(g, { gecici: gec }, zz, q, "kuyruk", "ön"), iz);
      }
      A("public void seviyeSirasi", "seviyeSirasi, kök " + g.kok.v + " ile çağrılır; kök null değil.");
      A("Queue<AgacDugumu> kuyruk", "Boş bir kuyruk oluşturulur (FIFO).");
      q.push(g.kok);
      A("kuyruk.add(kok)", "Kök " + g.kok.v + " kuyruğun sonuna eklendi.");
      for (;;) {
        var iz = "W " + jListe(q.map(ad));
        if (!q.length) { gec = null; A("while (!kuyruk.isEmpty())", "Kuyruk boş; gezinme bitti. Düzey sırası: " + Z.cikti.trim() + ".", iz); return; }
        A("while (!kuyruk.isEmpty())", "Kuyrukta " + q.length + " düğüm var; döngü sürer.", iz);
        gec = q.shift();
        A("AgacDugumu gecici = kuyruk.poll()", "gecici = poll() = " + gec.v + " (kuyruğun önündeki düğüm).");
        zz[gec.i] = 1; Z.cikti += gec.v + " ";
        A("System.out.print(gecici.veri", gec.v + " yazdırıldı.", "P " + gec.v);
        if (gec.sol) { q.push(gec.sol); A("kuyruk.add(gecici.sol)", "Sol çocuk " + gec.sol.v + " kuyruğun sonuna eklendi."); }
        else A("if (gecici.sol != null)", gec.v + " düğümünün sol çocuğu yok.");
        if (gec.sag) { q.push(gec.sag); A("kuyruk.add(gecici.sag)", "Sağ çocuk " + gec.sag.v + " kuyruğun sonuna eklendi; bir düzeyin düğümleri sırayla kuyrukta bekler."); }
        else A("if (gecici.sag != null)", gec.v + " düğümünün sağ çocuğu yok.");
      }
    }
  };

  /* ---------- Bölüm 13: sıralı birleşim/kesişim, bit vektörü ---------- */
  MODELLER.birlesimKesisim = {
    etiket: "Girdi (sıralı a | sıralı b)",
    coz: function (t) {
      var p = ikiParca(t, "sıralı a | sıralı b"), not = false;
      function k(x) {
        var d = sayilar(x, 0, 8, -99, 999), s = d.slice().sort(function (u, v) { return u - v; }).filter(function (v, i, a) { return !i || v !== a[i - 1]; });
        if (s.join() !== d.join()) not = true;
        return s;
      }
      var a = k(p[0]), b = k(p[1]);
      if (!a.length && !b.length) hata("Kümelerden en az biri boş olmamalı.");
      return { a: a, b: b, duzeltildi: not };
    },
    calis: function (g, Z) {
      var a = g.a, b = g.b, i = null, j = null, bir = [], kes = [];
      Z.ciktiAd = "Sonuç";
      function A(k, msg, iz, ca, cb, cbir, ckes) {
        var c1 = {}, c2 = {};
        for (var q = 0; q < a.length; q++) if (i != null && q < i) c1[q] = "is-off";
        for (q = 0; q < b.length; q++) if (j != null && q < j) c2[q] = "is-off";
        if (ca != null) c1[ca] = "is-cmp";
        if (cb != null) c2[cb] = "is-cmp";
        var x = {}, y = {};
        if (cbir) x[bir.length - 1] = "is-set";
        if (ckes) y[kes.length - 1] = "is-set";
        Z.kaydet(k, msg, vlist({ i: i, j: j, "a[i]": i != null && i < a.length ? a[i] : null, "b[j]": j != null && j < b.length ? b[j] : null }),
          { satir: [sira("a", a, { i: i }, c1, { bos: "boş" }), sira("b", b, { j: j }, c2, { bos: "boş" }), sira("bir", bir, null, x, { bos: "boş" }), sira("kes", kes, null, y, { bos: "boş" })] }, iz);
      }
      A("void birlesimKesisim", "a = " + liste(a) + " ve b = " + liste(b) + " sıralı dizileriyle çağrılır." +
        (g.duzeltildi ? " Girdi sıralı ve tekrarsız olmadığından kümeler sıralanıp tekrarlar atılarak kullanılır." : ""));
      i = 0; j = 0;
      A("int i = 0, j = 0", "İki imleç dizilerin başında: i = 0, j = 0.");
      for (;;) {
        if (!(i < a.length && j < b.length)) {
          A("while (i < a.length && j < b.length)", (i >= a.length ? "i = a.length" : "j = b.length") + ": dizilerden biri bitti, ana döngüden çıkılır. Artık ortak öğe olamaz; kesişim tamam.");
          break;
        }
        A("while (i < a.length && j < b.length)", "İki dizide de öğe var; a[" + i + "] = " + a[i] + " ile b[" + j + "] = " + b[j] + " karşılaştırılacak.", null, i, j);
        if (a[i] < b[j]) {
          bir.push(a[i]);
          A("if (a[i] < b[j])", "a[" + i + "] = " + a[i] + " < b[" + j + "] = " + b[j] + ": " + a[i] + " yalnız a'da; birleşime eklenir, i ilerler.", null, i, null, true);
          i++;
        } else if (a[i] > b[j]) {
          bir.push(b[j]);
          A("else if (a[i] > b[j])", "a[" + i + "] = " + a[i] + " > b[" + j + "] = " + b[j] + ": " + b[j] + " yalnız b'de; birleşime eklenir, j ilerler.", null, null, j, true);
          j++;
        } else {
          A("else {", "a[" + i + "] = b[" + j + "] = " + a[i] + ": ortak öğe.", null, i, j);
          bir.push(a[i]); kes.push(a[i]);
          A("bir.add(a[i]);  kes.add(a[i])", a[i] + " hem birleşime hem kesişime eklenir.", null, i, j, true, true);
          i++; j++;
          A("i++;  j++;", "İki imleç birlikte ilerler: i = " + i + ", j = " + j + ".");
        }
      }
      while (i < a.length) {
        bir.push(a[i]);
        A("while (i < a.length) bir.add", "a dizisinde kalan a[" + i + "] = " + a[i] + " doğrudan birleşime eklenir.", null, i, null, true);
        i++;
      }
      if (i === a.length) A("while (i < a.length) bir.add", "a dizisinde kalan öğe yok.");
      while (j < b.length) {
        bir.push(b[j]);
        A("while (j < b.length) bir.add", "b dizisinde kalan b[" + j + "] = " + b[j] + " doğrudan birleşime eklenir.", null, null, j, true);
        j++;
      }
      Z.cikti = "bir = " + jListe(bir) + ", kes = " + jListe(kes);
      A("while (j < b.length) bir.add", "Birleşim " + jListe(bir) + ", kesişim " + jListe(kes) + ". Her adımda en az bir imleç ilerlediği için en çok n + m adım: O(n + m).",
        "B " + jListe(bir) + " K " + jListe(kes));
    }
  };
  function ikili(v) { var s = (v >>> 0).toString(2); while (s.length < 8) s = "0" + s; return s.slice(-8); }
  function bitler(v) { return ikili(v).split(""); }
  function kumeOf(v) { var r = []; for (var b = 0; b < 32; b++) if ((v >>> b) & 1) r.push(b); return "{" + r.join(", ") + "}"; }
  MODELLER.bitVektor = {
    etiket: "Girdi (A öğeleri | B öğeleri, 0–7)",
    coz: function (t) {
      var p = ikiParca(t, "A öğeleri | B öğeleri");
      return { A: sayilar(p[0], 1, 8, 0, 7), B: sayilar(p[1], 1, 8, 0, 7) };
    },
    kod: function (s, g) {
      var n = 0;
      return s.map(function (x) {
        if (x.indexOf("for (int x : new int[]{") < 0) return x;
        n++;
        return suslu(x, n === 1 ? g.A : g.B);
      });
    },
    calis: function (g, Z) {
      var a = null, b = null, x = null, bir = null, kes = null, fark = null, var3 = null;
      Z.ciktiAd = "Sonuç";
      function A(k, msg, iz, deg) {
        var rows = [], bas = ["7", "6", "5", "4", "3", "2", "1", "0"];
        function r(adi, v) {
          if (v == null) return;
          var c = {};
          if (deg === adi) bitler(v).forEach(function (bit, q) { if (bit === "1") c[q] = "is-set"; });
          rows.push(sira(adi, bitler(v), null, c, { bas: rows.length ? null : bas }));
        }
        r("a", a); r("b", b); r("bir", bir); r("kes", kes); r("fark", fark);
        Z.kaydet(k, msg, vlist({ x: x, a: a == null ? null : a + " (" + ikili(a) + ")", b: b == null ? null : b + " (" + ikili(b) + ")", var3: var3 }), { satir: rows }, iz);
      }
      a = 0; b = 0;
      A("int a = 0, b = 0", "İki küme boş başlar: a = 0, b = 0 (bütün bitler 0). Bit k = 1 ise k kümededir.");
      g.A.forEach(function (v) {
        x = v;
        var once = a; a |= 1 << x;
        A("a |= 1 << x", "x = " + x + ": 1 << " + x + " = " + (1 << x) + " (" + ikili(1 << x) + "); a = " + once + " | " + (1 << x) + " = " + a + "." +
          (once === a ? " Bit zaten 1'di; küme değişmez." : ""), null, "a");
      });
      g.B.forEach(function (v) {
        x = v;
        var once = b; b |= 1 << x;
        A("b |= 1 << x", "x = " + x + ": b = " + once + " | " + (1 << x) + " = " + b + "." + (once === b ? " Bit zaten 1'di." : ""), null, "b");
      });
      x = null;
      bir = a | b;
      A("int bir = a | b", "Birleşim: a | b = " + bir + " → " + kumeOf(bir) + "; iki kümeden birinde olan her bit 1.", null, "bir");
      kes = a & b;
      A("int kes = a & b", "Kesişim: a & b = " + kes + " → " + kumeOf(kes) + "; iki kümede de olan bitler 1.", null, "kes");
      fark = a & ~b;
      A("int fark = a & ~b", "Fark: a & ~b = " + fark + " → " + kumeOf(fark) + "; a'da olup b'de olmayan bitler 1.", null, "fark");
      var3 = ((a >> 3) & 1) === 1;
      Z.cikti = "bir = " + kumeOf(bir) + ", kes = " + kumeOf(kes) + ", fark = " + kumeOf(fark) + ", var3 = " + var3;
      A("boolean var3", "Üyelik: (a >> 3 & 1) = " + ((a >> 3) & 1) + "; var3 = " + var3 + " (3, a kümesinde " + (var3 ? "var" : "yok") + "). Her işlem O(1).",
        "S " + a + " " + b + " " + bir + " " + kes + " " + fark + " " + var3);
    }
  };

  /* ---------- Bölüm 14: Kruskal ve Prim ---------- */
  var HARF = "ABCDEFGHIJ";
  function cizgeGirdisi(t) {
    var p = String(t).split(/[,;]+/).map(function (x) { return x.trim(); }).filter(Boolean), maks = 0, E = [];
    if (!p.length || p.length > 20) hata("Girdi 1 ile 20 arasında kenar içermeli.");
    p.forEach(function (x) {
      var m = /^([A-Ja-j])\s*[-–]\s*([A-Ja-j])\s*[:=]\s*(\d{1,2})$/.exec(x);
      if (!m) hata("“" + x + "” anlaşılamadı; kenarlar A-B:4 biçiminde, düğümler A–J, ağırlıklar 0–99 olmalı.");
      var u = HARF.indexOf(m[1].toUpperCase()), v = HARF.indexOf(m[2].toUpperCase());
      if (u === v) hata(m[1].toUpperCase() + " düğümünde kendine dönen kenar olamaz.");
      maks = Math.max(maks, u, v);
      E.push([u, v, parseInt(m[3], 10)]);
    });
    return { n: maks + 1, E: E };
  }
  function konumlar(n, metin) {
    var k = [];
    if (metin) metin.split(/\s+/).forEach(function (x) {
      var m = /^([A-J]):(-?\d+),(-?\d+)$/.exec(x);
      if (m) k[HARF.indexOf(m[1])] = [parseInt(m[2], 10), parseInt(m[3], 10)];
    });
    for (var i = 0; i < n; i++) if (!k[i]) { k = null; break; }
    if (k) return k.slice(0, n);
    var r = [];
    for (var j = 0; j < n; j++) {
      var t = -Math.PI / 2 + 2 * Math.PI * j / n;
      r.push([Math.round(200 + 150 * Math.cos(t)), Math.round(140 + 110 * Math.sin(t))]);
    }
    return r;
  }
  function kAd(e) { return HARF[e[0]] + "–" + HARF[e[1]]; }
  function cizgeG(g, ken, dug) {
    return { d: g.konum.map(function (p, i) { return { ad: HARF[i], x: p[0], y: p[1], c: dug[i] || "" }; }),
      k: g.E.map(function (e, i) { return { u: e[0], v: e[1], w: e[2], c: ken[i] || "" }; }) };
  }
  /* uzun kenar listesinde bas'tan başlayan en çok 11 öğe; öncesi ve sonrası birer özet etiketiyle */
  function pencere(l, bas, onceAd) {
    var r = l.slice(bas, bas + 11);
    if (bas > 0) r.unshift({ t: bas + " kenar " + onceAd, c: "is-ozet" });
    if (l.length > bas + 11) r.push({ t: "+" + (l.length - bas - 11) + " kenar", c: "is-ozet" });
    return r;
  }
  /* java.util.PriorityQueue ile aynı yığın düzeni (eşit önceliklerde aynı sıra) */
  function JPQ(cmp) { this.q = []; this.cmp = cmp; }
  JPQ.prototype.add = function (x) {
    var q = this.q, k = q.length;
    q.push(x);
    while (k > 0) { var p = (k - 1) >>> 1, e = q[p]; if (this.cmp(x, e) >= 0) break; q[k] = e; k = p; }
    q[k] = x;
  };
  JPQ.prototype.poll = function () {
    var q = this.q;
    if (!q.length) return null;
    var r = q[0], x = q.pop(), n = q.length;
    if (n) {
      var k = 0, half = n >>> 1;
      while (k < half) {
        var c = 2 * k + 1, cv = q[c], rr = c + 1;
        if (rr < n && this.cmp(cv, q[rr]) > 0) { c = rr; cv = q[c]; }
        if (this.cmp(x, cv) <= 0) break;
        q[k] = cv; k = c;
      }
      q[k] = x;
    }
    return r;
  };
  MODELLER.kruskal = {
    etiket: "Girdi (kenarlar: A-B:4, …)",
    coz: cizgeGirdisi,
    calis: function (g, Z) {
      var n = g.n, E = g.E.map(function (e, i) { return [e[0], e[1], e[2], i]; }), par = null, rank = null, T = [], top = 0, durum = {}, cur = null;
      Z.ciktiAd = "Dönüş değeri";
      function A(k, msg, iz, degisen) {
        var ken = {}, dug = {};
        for (var i in durum) ken[i] = durum[i];
        if (cur != null) { ken[cur[3]] = (ken[cur[3]] ? ken[cur[3]] + " " : "") + "is-cur"; dug[cur[0]] = dug[cur[1]] = "is-cur"; }
        var cip = sirali ? pencere(sirali.map(function (e) { return { t: kAd(e) + " " + e[2], c: (durum[e[3]] || "") + (cur && cur[3] === e[3] ? " is-cur" : "") }; }), islenen, "işlendi") : [];
        var eb = null;
        if (par) {
          eb = par.map(function (x, v) { return x === v ? null : HARF[v] + "→" + HARF[x]; }).filter(Boolean).join(" ") || "hepsi kök";
          (degisen || []).forEach(function (x) { dug[x] = (dug[x] ? dug[x] + " " : "") + "is-in"; });
        }
        Z.kaydet(k, msg, vlist({ e: cur ? "{" + HARF[cur[0]] + ", " + HARF[cur[1]] + ", " + cur[2] + "}" : null, "T.size()": T.length, "ağırlık": top, ebeveyn: eb }),
          { cizge: cizgeG(g, ken, dug), cip: { ad: "E sıralı", d: cip } }, iz);
      }
      var sirali = null, islenen = 0;
      A("List<int[]> kruskal", "kruskal(n = " + n + ", E) çağrılır; çizgede " + n + " düğüm ve " + E.length + " kenar var.");
      sirali = E.slice().sort(function (a, b) { return a[2] - b[2]; });
      A("E.sort(", "Kenarlar ağırlığa göre sıralanır; sıralama kararlı olduğundan eşit ağırlıklılar girdi sırasını korur. O(m log m).",
        "S " + sirali.map(function (e) { return kAd(e) + e[2]; }).join(" "));
      par = []; rank = [];
      for (var i = 0; i < n; i++) { par.push(i); rank.push(0); }
      A("UnionFind uf = new UnionFind(n)", "new UnionFind(" + n + "): her düğüm kendi kümesinin kökü (ebeveyn[v] = v); hiçbir kenar seçilmedi.");
      A("List<int[]> T = new ArrayList", "T, seçilen kenarların boş listesi.");
      function find(x, yol) {
        if (par[x] !== x) { var r = find(par[x], yol); if (par[x] !== r) { par[x] = r; yol.push(x); } }
        return par[x];
      }
      for (var q = 0; q < sirali.length; q++) {
        var e = sirali[q];
        cur = e; islenen = q;
        A("for (int[] e : E)", "Sıradaki en hafif kenar " + kAd(e) + " (" + e[2] + ").");
        var yol = [], kx = find(e[0], yol), ky = find(e[1], yol), not = "", deg = yol.slice();
        if (yol.length) not = " Yol kısaltma: " + yol.map(function (x) { return HARF[x]; }).join(", ") + " artık doğrudan köke bağlı.";
        if (kx === ky) {
          durum[e[3]] = "is-ret";
          A("if (uf.union(e[0], e[1]))", "find(" + HARF[e[0]] + ") = find(" + HARF[e[1]] + ") = " + HARF[kx] + ": iki uç aynı kümede; kenar döngü kurar, union false döner." + not,
            "X " + kAd(e) + e[2], deg);
        } else {
          var aciklama;
          if (rank[kx] < rank[ky]) { par[kx] = ky; deg.push(kx); aciklama = "sira[" + HARF[kx] + "] < sira[" + HARF[ky] + "] olduğundan ebeveyn[" + HARF[kx] + "] = " + HARF[ky]; }
          else if (rank[kx] > rank[ky]) { par[ky] = kx; deg.push(ky); aciklama = "sira[" + HARF[kx] + "] > sira[" + HARF[ky] + "] olduğundan ebeveyn[" + HARF[ky] + "] = " + HARF[kx]; }
          else { par[kx] = ky; rank[ky]++; deg.push(kx); aciklama = "sıralar eşit; ebeveyn[" + HARF[kx] + "] = " + HARF[ky] + " ve sira[" + HARF[ky] + "] = " + rank[ky]; }
          A("if (uf.union(e[0], e[1]))", "find(" + HARF[e[0]] + ") = " + HARF[kx] + ", find(" + HARF[e[1]] + ") = " + HARF[ky] + ": kökler farklı, union true döner; " + aciklama + "." + not,
            null, deg);
          T.push(e); top += e[2]; durum[e[3]] = "is-tree";
          A("T.add(e)", kAd(e) + " (" + e[2] + ") ağaca eklendi: |T| = " + T.length + ", toplam ağırlık " + top + ".", "A " + kAd(e) + e[2]);
        }
        if (T.length === n - 1) {
          A("if (T.size() == n - 1) break", "|T| = " + T.length + " = n − 1: kapsayan ağaç tamamlandı, kalan kenarlara bakılmaz.");
          break;
        }
        A("if (T.size() == n - 1) break", "|T| = " + T.length + " < n − 1 = " + (n - 1) + "; döngü sürer.");
      }
      cur = null;
      Z.cikti = "T = [" + T.map(function (e) { return kAd(e) + " " + e[2]; }).join(", ") + "], ağırlık " + top;
      A("return T", T.length === n - 1 ? "T döndürülür: " + T.length + " kenar, toplam ağırlık " + top + " (minimum kapsayan ağaç)." :
        "Bütün kenarlar denendi ama |T| = " + T.length + " < n − 1: çizge bağlı değil, T bir minimum kapsayan ormandır (ağırlık " + top + ").", "T " + top);
    }
  };
  MODELLER.prim = {
    etiket: "Girdi (kenarlar: A-B:4, …; başlangıç A)",
    coz: cizgeGirdisi,
    calis: function (g, Z) {
      var n = g.n, adj = [], agacta = [], T = [], top = 0, pq = null, cur = null, durum = {}, ek = [];
      for (var i = 0; i < n; i++) { adj.push([]); agacta.push(false); }
      g.E.forEach(function (e, k) { adj[e[0]].push([e[1], e[2], k]); adj[e[1]].push([e[0], e[2], k]); });
      Z.ciktiAd = "Dönüş değeri";
      function cmp(a, b) { return a[2] < b[2] ? -1 : a[2] > b[2] ? 1 : 0; }
      function A(k, msg, iz) {
        var ken = {}, dug = {};
        for (var x in durum) ken[x] = durum[x];
        if (pq) pq.q.forEach(function (e) { if (!ken[e[3]]) ken[e[3]] = agacta[e[1]] ? "is-ret" : "is-aday"; });
        if (cur) ken[cur[3]] = (ken[cur[3]] ? ken[cur[3]] + " " : "") + "is-cur";
        agacta.forEach(function (b, v) { if (b) dug[v] = "is-done"; });
        if (cur) dug[cur[1]] = (dug[cur[1]] ? dug[cur[1]] + " " : "") + "is-cur";
        var cip = pq ? pencere(pq.q.map(function (e, s) { return { e: e, s: s }; }).sort(function (a, b) { return cmp(a.e, b.e) || a.s - b.s; }).map(function (o) {
          return { t: kAd(o.e) + " " + o.e[2], c: agacta[o.e[1]] ? "is-ret" : "" };
        }), 0) : [];
        Z.kaydet(k, msg, vlist({ e: cur ? "{" + HARF[cur[0]] + ", " + HARF[cur[1]] + ", " + cur[2] + "}" : null, "T.size()": T.length, "ağırlık": top }),
          { cizge: cizgeG(g, ken, dug), cip: { ad: "pq", d: cip, bos: "boş" } }, iz);
      }
      A("List<int[]> prim", "prim(adj, s = A) çağrılır; n = adj.size() = " + n + ".");
      A("boolean[] agacta", "agacta dizisi: başlangıçta hiçbir düğüm ağaçta değil.");
      pq = new JPQ(cmp);
      A("PriorityQueue<int[]> pq", "Kenarları ağırlığa göre veren boş bir öncelikli kuyruk (min-heap) oluşturulur.");
      A("List<int[]> T = new ArrayList", "T, seçilen kenarların boş listesi.");
      agacta[0] = true;
      A("agacta[s] = true", "A düğümü ağaca girer.");
      adj[0].forEach(function (f) { pq.add([0, f[0], f[1], f[2]]); });
      A("for (int[] e : adj.get(s))", adj[0].length ? "A düğümünün kenarları kuyruğa eklenir: " + adj[0].map(function (f) { return "A–" + HARF[f[0]] + " " + f[1]; }).join(", ") + "." :
        "A düğümünün kenarı yok; kuyruk boş kalır.");
      for (;;) {
        if (!pq.q.length || T.length >= n - 1) {
          cur = null;
          A("while (!pq.isEmpty() && T.size() < n - 1)", T.length >= n - 1 ? "|T| = n − 1 = " + (n - 1) + ": bütün düğümler ağaçta, döngü biter." :
            "Kuyruk boş ama |T| = " + T.length + " < n − 1: A düğümünün bileşeni bitti, çizge bağlı değil.");
          break;
        }
        cur = null;
        A("while (!pq.isEmpty() && T.size() < n - 1)", "Kuyrukta " + pq.q.length + " aday var ve |T| = " + T.length + " < " + (n - 1) + "; döngü sürer.");
        cur = pq.poll();
        A("int[] e = pq.poll()", "En hafif aday " + kAd(cur) + " (" + cur[2] + ") kuyruktan alınır.");
        if (agacta[cur[1]]) {
          durum[cur[3]] = durum[cur[3]] === "is-tree" ? "is-tree" : "is-ret";
          A("if (agacta[e[1]]) continue", HARF[cur[1]] + " zaten ağaçta: bu kayıt bayat, kenar döngü kurar; atlanır.", "X " + kAd(cur) + cur[2]);
          continue;
        }
        A("if (agacta[e[1]]) continue", HARF[cur[1]] + " ağaçta değil: kenar ağacı dışarıya bağlayan en hafif kenar.");
        agacta[cur[1]] = true;
        A("agacta[e[1]] = true", HARF[cur[1]] + " düğümü ağaca girer.");
        T.push(cur); top += cur[2]; durum[cur[3]] = "is-tree";
        A("T.add(e)", kAd(cur) + " (" + cur[2] + ") T listesine eklendi: |T| = " + T.length + ", toplam ağırlık " + top + ".", "A " + kAd(cur) + cur[2]);
        ek = [];
        var v = cur[1];
        adj[v].forEach(function (f) { if (!agacta[f[0]]) { pq.add([v, f[0], f[1], f[2]]); ek.push(HARF[v] + "–" + HARF[f[0]] + " " + f[1]); } });
        A("for (int[] f : adj.get(e[1]))", ek.length ? HARF[v] + " düğümünün ağaç dışındaki komşuları kuyruğa eklenir: " + ek.join(", ") + "." :
          HARF[v] + " düğümünün ağaç dışında komşusu yok; kuyruğa yeni aday eklenmez.");
      }
      cur = null;
      Z.cikti = "T = [" + T.map(function (e) { return kAd(e) + " " + e[2]; }).join(", ") + "], ağırlık " + top;
      A("return T", "T döndürülür: " + T.length + " kenar, toplam ağırlık " + top + (T.length === n - 1 ? " (minimum kapsayan ağaç)." : "; çizge bağlı olmadığından yalnız A düğümünün bileşeni kapsandı."), "T " + top);
    }
  };

  /* girdi metni + kod satırları → adımlar */
  function calistir(algo, kodMetni, girdi, konumMetni) {
    var M = MODELLER[algo];
    if (!M) throw new Error("Bilinmeyen algoritma: " + algo);
    var satirlar = kodMetni.replace(/^\n/, "").replace(/\s+$/, "").split("\n");
    var g;
    try { g = M.coz(girdi); } catch (e) { if (e instanceof LabHata) return { satirlar: satirlar, hata: e.msg, adimlar: [] }; throw e; }
    if (g.n != null && g.E) g.konum = konumlar(g.n, konumMetni);
    if (M.kod) satirlar = M.kod(satirlar, g);
    var Z = new Izci(satirlar);
    M.calis(g, Z);
    return { satirlar: satirlar, adimlar: Z.adimlar, etiket: M.etiket };
  }

  if (typeof module !== "undefined" && module.exports) module.exports = { MODELLER: MODELLER, calistir: calistir, JPQ: JPQ };
  if (typeof document === "undefined") return;
  if (["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) < 0) return;

  /* ---------- arayüz ---------- */
  var PLAY_MS = 750;
  var KW = /\b(int|long|double|boolean|char|void|static|public|private|final|class|new|for|while|if|else|return|break|continue|switch|case|default|null|true|false)\b/g;
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function btn(act, text, label) {
    var b = el("button", "ds-deck__button ds-deck__button--sm", esc(text));
    b.type = "button"; b.dataset.act = act;
    if (label) b.setAttribute("aria-label", label);
    return b;
  }
  function yorumYeri(s) {
    var q = null;
    for (var i = 0; i < s.length - 1; i++) {
      var c = s.charAt(i);
      if (q) { if (c === "\\") i++; else if (c === q) q = null; }
      else if (c === "'" || c === '"') q = c;
      else if (c === "/" && s.charAt(i + 1) === "/") return i;
    }
    return s.length;
  }
  function renkli(s) {
    var k = yorumYeri(s), kod = s.slice(0, k), cm = s.slice(k);
    return esc(kod).replace(KW, '<span class="lab-kw">$1</span>') + (cm ? '<span class="lab-cm">' + esc(cm) + "</span>" : "");
  }

  /* ağaç çizimi: dizi gösterimindeki indisten konum */
  function agacSvg(a) {
    var W = 320, H = 132, R = 12, pos = {}, p = [];
    a.d.forEach(function (d) {
      var dz = Math.floor(Math.log2(d.i + 1)), sira0 = d.i - (Math.pow(2, dz) - 1), adet = Math.pow(2, dz);
      pos[d.i] = [W * (sira0 + 0.5) / adet, 16 + dz * 34];
    });
    a.d.forEach(function (d) {
      if (d.i === 0) return;
      var u = pos[(d.i - 1) >> 1], v = pos[d.i];
      p.push('<line class="line" x1="' + u[0].toFixed(1) + '" y1="' + u[1] + '" x2="' + v[0].toFixed(1) + '" y2="' + v[1] + '"/>');
    });
    a.d.forEach(function (d) {
      var xy = pos[d.i], c = a.c[d.i] || "", e = a.e[d.i];
      p.push('<g class="lab-n ' + c + '"><circle cx="' + xy[0].toFixed(1) + '" cy="' + xy[1] + '" r="' + R + '"/>' +
        '<text class="txt" x="' + xy[0].toFixed(1) + '" y="' + xy[1] + '" text-anchor="middle" dominant-baseline="central">' + esc(d.v) + "</text>" +
        (e ? '<text class="lab-lbl" x="' + (xy[0] + R + 2).toFixed(1) + '" y="' + (xy[1] - R + 2) + '">' + esc(e) + "</text>" : "") + "</g>");
    });
    return '<svg class="ds-svg lab-svg" viewBox="-6 0 ' + (W + 12) + " " + H + '" role="img" aria-label="İkili ağaç">' + p.join("") + "</svg>";
  }
  function cizgeSvg(z) {
    var xs = z.d.map(function (d) { return d.x; }), ys = z.d.map(function (d) { return d.y; });
    var x0 = Math.min.apply(null, xs) - 26, y0 = Math.min.apply(null, ys) - 25, x1 = Math.max.apply(null, xs) + 26, y1 = Math.max.apply(null, ys) + 25, p = [];
    z.k.forEach(function (k) {
      var a = z.d[k.u], b = z.d[k.v], mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      p.push('<g class="lab-k ' + k.c + '"><line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/>' +
        '<text class="lab-w" x="' + mx + '" y="' + my + '" text-anchor="middle" dominant-baseline="central">' + k.w + "</text></g>");
    });
    z.d.forEach(function (d) {
      p.push('<g class="lab-n ' + d.c + '"><circle cx="' + d.x + '" cy="' + d.y + '" r="23"/><text class="txt" x="' + d.x + '" y="' + d.y +
        '" text-anchor="middle" dominant-baseline="central">' + d.ad + "</text></g>");
    });
    return '<svg class="ds-svg lab-svg is-cizge" viewBox="' + x0 + " " + y0 + " " + (x1 - x0) + " " + (y1 - y0) + '" role="img" aria-label="Ağırlıklı çizge">' + p.join("") + "</svg>";
  }
  function satirHtml(r) {
    var isaretli = r.son || r.p.some(Boolean), harf = 0;
    r.d.forEach(function (v) { harf += Math.max(2, String(v).length) + 1; });
    var sik = r.d.length > 10 || harf > 30;
    var h = '<div class="lab-row' + (r.yigin ? " is-yigin" : "") + (isaretli ? "" : " is-sade") + (sik ? " is-sik" : "") + '"><b>' + esc(r.ad) + '</b><div class="lab-cells">';
    if (!r.d.length) h += '<span class="lab-bos">' + esc(r.bos || "boş") + "</span>";
    r.d.forEach(function (v, i) {
      h += '<span class="lab-cell ' + (r.c[i] || "") + '">' + (r.bas ? "<i>" + esc(r.bas[i]) + "</i>" : "") + "<span>" + esc(v) + "</span><em>" + esc(r.p[i] || "") + "</em></span>";
    });
    if (r.son) h += '<span class="lab-cell is-son"><span></span><em>' + esc(r.son) + "</em></span>";
    return h + "</div></div>";
  }

  document.querySelectorAll('.ds-deck [data-demo="dsy-lab"]').forEach(function (demo) {
    var kodlar = {};
    demo.querySelectorAll('script[type="text/x-java"]').forEach(function (s) { kodlar[s.dataset.algo] = s.textContent; });
    var tpl = demo.querySelector("template.lab-ornekler");
    var ornekler = tpl ? Array.from(tpl.content.querySelectorAll("option")).map(function (o) {
      return { ad: o.textContent.trim(), algo: o.dataset.algo, girdi: o.dataset.girdi || "", konum: o.dataset.konum || "" };
    }).filter(function (o) { return MODELLER[o.algo] && kodlar[o.algo] != null; }) : [];
    if (!ornekler.length) return;
    var slide = demo.closest(".ds-deck__slide");

    var bar = el("div", "lab-bar");
    var pick = el("select");
    pick.setAttribute("aria-label", "Hazır örnek");
    ornekler.forEach(function (o, i) { var op = el("option", null, esc(o.ad)); op.value = i; pick.appendChild(op); });
    var btns = el("div", "lab-btns");
    var bBack = btn("back", "◀ Geri", "Bir adım geri"), bStep = btn("step", "Adım ▶", "Bir adım ilerle");
    var bPlay = btn("play", "Oynat", "Adımları otomatik oynat"), bReset = btn("reset", "Sıfırla", "İlk adıma dön");
    [bBack, bStep, bPlay, bReset].forEach(function (b) { btns.appendChild(b); });
    bar.appendChild(pick); bar.appendChild(btns);

    var gir = el("label", "lab-girdi");
    var girAd = el("span");
    var girIn = el("input");
    girIn.type = "text"; girIn.spellcheck = false; girIn.autocomplete = "off";
    var bUy = btn("apply", "Uygula", "Girdiyle yeniden çalıştır");
    gir.appendChild(girAd); gir.appendChild(girIn); gir.appendChild(bUy);

    var main = el("div", "lab-main");
    var pKod = el("div", "lab-panel");
    var kodBas = el("p", "lab-title", "Kod");
    var kod = el("div", "lab-code");
    kod.setAttribute("aria-label", "Java kodu");
    pKod.appendChild(kodBas); pKod.appendChild(kod);
    var pSag = el("div", "lab-panel lab-sag");
    var yapi = el("div", "lab-yapi");
    var vars = el("div", "lab-vars");
    vars.setAttribute("aria-label", "Değişkenler");
    var cikSat = el("div", "lab-out");
    var cikBas = el("b");
    var cik = el("span");
    cikSat.appendChild(cikBas); cikSat.appendChild(cik);
    cik.setAttribute("aria-live", "polite");
    [yapi, vars, cikSat].forEach(function (x) { pSag.appendChild(x); });
    main.appendChild(pKod); main.appendChild(pSag);
    var status = el("p", "lab-status");
    status.setAttribute("aria-live", "polite");
    [bar, gir, main, status].forEach(function (x) { demo.appendChild(x); });

    var ex = ornekler[0], run = null, k = 0, rows = [], timer = null, sigan = 8;

    function yukle(girdi) {
      stop();
      sigan = 8;
      run = calistir(ex.algo, kodlar[ex.algo], girdi, girdi === ex.girdi ? ex.konum : "");
      girAd.textContent = MODELLER[ex.algo].etiket;
      girIn.setAttribute("aria-label", MODELLER[ex.algo].etiket);
      kod.innerHTML = "";
      rows = run.satirlar.map(function (s, i) {
        var d = el("div", "lab-ln", "<i>" + (i + 1) + "</i><span>" + (renkli(s) || " ") + "</span>");
        kod.appendChild(d);
        return d;
      });
      kod.classList.toggle("is-dar", run.satirlar.some(function (s) { return s.length > 46; }));
      k = 0;
      render();
    }
    function stop() {
      if (!timer) return;
      clearInterval(timer); timer = null;
      bPlay.textContent = "Oynat"; bPlay.setAttribute("aria-label", "Adımları otomatik oynat");
    }
    function play() {
      if (timer) { stop(); render(); return; }
      if (!run.adimlar.length) return;
      if (k >= run.adimlar.length - 1) k = 0;
      bPlay.textContent = "Durdur"; bPlay.setAttribute("aria-label", "Otomatik oynatmayı durdur");
      timer = setInterval(function () {
        if (!slide.classList.contains("is-active") || k >= run.adimlar.length - 1) { stop(); render(); return; }
        k++; render();
      }, PLAY_MS);
      render();
    }
    function render() {
      var A = run.adimlar[k], P = k > 0 ? run.adimlar[k - 1] : null, n = run.adimlar.length;
      rows.forEach(function (r, i) {
        r.classList.toggle("is-current", !!A && A.satir === i + 1);
        r.classList.toggle("is-prev", !!A && !!P && P.satir === i + 1 && A.satir !== i + 1);
        r.classList.toggle("is-error", !!A && !!A.hata && A.satir === i + 1);
      });
      var cur = A && A.satir ? rows[A.satir - 1] : null;
      if (cur) {
        var top = cur.offsetTop - kod.offsetTop, lh = cur.offsetHeight || 16;
        if (top < kod.scrollTop + lh || top + 2 * lh > kod.scrollTop + kod.clientHeight) kod.scrollTop = Math.max(0, top - kod.clientHeight / 3);
      } else kod.scrollTop = 0;
      if (!A) {
        yapi.innerHTML = ""; vars.innerHTML = ""; cik.textContent = "";
        kodBas.textContent = "Kod"; cikBas.textContent = "Çıktı";
        status.classList.add("is-error");
        status.innerHTML = "<b>Girdi hatası:</b> " + esc(run.hata || "girdi çözümlenemedi") + " Hazır örneklerden biri seçilebilir ya da girdi düzeltilip Uygula düğmesine basılabilir.";
      } else {
        var g = A.g, h = "";
        if (g.agac) h += agacSvg(g.agac);
        if (g.cizge) h += cizgeSvg(g.cizge);
        if (g.cerceve) {
          /* tepe üstte; sahneye sığmayan ara çerçeveler tek satırda özetlenir */
          var fr = g.cerceve.slice().reverse(), enCok = Math.min(sigan, g.satir ? 6 : 8);
          if (fr.length > enCok) fr = fr.slice(0, enCok - 2).concat([{ ozet: fr.length - enCok + 1 }], fr.slice(-1));
          h += '<div class="lab-frames" aria-label="Çağrı yığını (tepe üstte)">' + fr.map(function (f) {
            if (f.ozet) return '<div class="lab-frame is-ozet">… ' + f.ozet + " çerçeve daha</div>";
            return '<div class="lab-frame ' + (f.c || "") + '"><b>' + esc(f.ad) + "</b><span>" + esc(f.d || "") + "</span></div>";
          }).join("") + "</div>";
        }
        if (g.cip) {
          h += '<div class="lab-row"><b>' + esc(g.cip.ad) + '</b><div class="lab-chips">' + (g.cip.d.length ? g.cip.d.map(function (c) {
            return '<span class="' + esc(c.c || "") + '">' + esc(c.t) + "</span>";
          }).join("") : '<span class="lab-bos">' + esc(g.cip.bos || "boş") + "</span>") + "</div></div>";
        }
        (g.satir || []).forEach(function (r) { h += satirHtml(r); });
        yapi.innerHTML = h;
        if (g.cerceve && yapi.scrollHeight > yapi.clientHeight + 1 && sigan > 3 && yapi.clientHeight > 0) { sigan--; render(); return; }
        var once = {};
        if (P) P.vars.forEach(function (v) { once[v[0]] = v[1]; });
        vars.innerHTML = A.vars.length ? A.vars.map(function (v) {
          var d = P && once[v[0]] !== v[1];
          return '<span class="' + (d ? "is-changed" : "") + '"><i>' + esc(v[0]) + "</i> = <b>" + esc(v[1]) + "</b></span>";
        }).join("") : '<span class="lab-bos">—</span>';
        kodBas.innerHTML = "Kod <b>· adım " + (k + 1) + " / " + n + "</b>";
        cikBas.textContent = A.ciktiAd;
        var yeni = P && P.cikti !== A.cikti;
        cik.innerHTML = A.cikti ? '<span class="' + (yeni ? "is-new" : "") + '">' + esc(A.cikti.replace(/\n$/, "")) + "</span>" : "—";
        status.classList.toggle("is-error", !!A.hata);
        status.textContent = A.msg;
        if (A.hata) status.innerHTML = "<b>Hata:</b> " + esc(A.msg);
      }
      bBack.disabled = !A || k === 0;
      bStep.disabled = !A || k >= n - 1;
      bPlay.disabled = !A || n < 2;
      bReset.disabled = !A || k === 0;
    }

    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-act]");
      if (!b || b.disabled) return;
      var act = b.dataset.act;
      if (act === "step") { stop(); if (k < run.adimlar.length - 1) k++; render(); }
      else if (act === "back") { stop(); if (k > 0) k--; render(); }
      else if (act === "play") play();
      else if (act === "reset") { stop(); k = 0; render(); }
    });
    bUy.addEventListener("click", function () { yukle(girIn.value); });
    girIn.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); yukle(girIn.value); } });
    pick.addEventListener("change", function () {
      ex = ornekler[+pick.value];
      girIn.value = ex.girdi;
      yukle(ex.girdi);
    });
    girIn.value = ex.girdi;
    yukle(ex.girdi);
  });
})();
