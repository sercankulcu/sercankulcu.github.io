/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* Veri Yapıları laboratuvarı: sunuma gömülü, Java kodunu satır satır izleyen çalışma alanı (deck.js'ten sonra yüklenir).
   <div class="ds-deck__demo lab-demo" data-demo="dsy-lab">
     <script type="text/x-java" data-algo="secimli">…sunumdaki Java kodu…</script>   (bir ya da daha çok algoritma)
     <template class="lab-ornekler">
       <option data-algo="secimli" data-girdi="64, 25, 12, 22, 11">Seçimli sıralama: 64, 25, 12, 22, 11</option>
     </template>
   </div>
   Her algoritmanın modeli (MODELLER) girdiyi çözümler, gerekirse koddaki örnek değerleri girdiyle değiştirir ve işlemi
   gerçekten yürütür: her adımda çalışan satır, değişkenler, yapının çizimi, çıktı ve açıklama üretilir.
   Geri düğmesi bir önceki adımın kaydını gösterir; adımlar girdi değişince yeniden hesaplanır.
   İki dilli: laboratuvarın en yakın lang özniteliği (html dışında) "en" ile başlıyorsa arayüz, açıklamalar ve hata
   iletileri İngilizcedir; İngilizce sunumdaki Java kodu İngilizce adlar kullanır, modeller satırları her modelin
   en tablosundaki İngilizce anahtarlarla bulur (tablo: Türkçe anahtar → İngilizce anahtar).
   Modeller DOM kullanmaz; node altında require edilerek test edilir (module.exports). */
(function () {
  "use strict";

  /* ---------- ortak yardımcılar ---------- */
  var EN = false;
  function tx(tr, en) { return EN ? en : tr; }
  function pl(n, w, ws) { return n + " " + (n === 1 ? w : (ws || w + "s")); }
  function DD() { return tx("Dönüş değeri", "Return value"); }
  function BOS() { return tx("boş", "empty"); }
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
  function trEksi(x) { return String(x).replace("-", "−"); }
  function kisa(v) {
    if (Number.isInteger(v)) return String(v);
    var t = (Math.round(v * 100) / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    return t.length > 5 ? (Math.round(v * 10) / 10).toFixed(1) : t;
  }
  function sayilar(t, en, enCok, alt, ust) {
    var p = String(t).split(/[,;\s]+/).filter(function (x) { return x !== ""; });
    if (p.length < en || p.length > enCok) hata(tx("Girdi " + (en === enCok ? en : "en az " + en + ", en çok " + enCok) + " tam sayı içermeli.",
      "The input must contain " + (en === enCok ? (en === 1 ? "exactly one integer" : "exactly " + en + " integers") : "between " + en + " and " + enCok + " integers") + "."));
    return p.map(function (x) {
      if (!/^[-+]?\d+$/.test(x)) hata(tx("“" + x + "” bir tam sayı değil; sayılar virgülle ayrılmalı.", "“" + x + "” is not an integer; separate the numbers with commas."));
      var v = parseInt(x, 10);
      if (v < alt || v > ust) hata(tx("Sayılar " + trEksi(alt) + " ile " + ust + " arasında olmalı (" + trEksi(v) + " uygun değil).",
        "Numbers must be between " + trEksi(alt) + " and " + ust + " (" + trEksi(v) + " is out of range)."));
      return v;
    });
  }
  function ikiParca(t, ad) {
    var p = String(t).split("|");
    if (p.length !== 2) hata(tx("Girdi “" + ad + "” biçiminde, iki parçanın arasında | işaretiyle yazılmalı.", "Write the input as “" + ad + "”, with a | between the two parts."));
    return p;
  }
  /* satırdaki ilk {…} ifadesini yeni öğelerle değiştirir */
  function suslu(satir, d) { return satir.replace(/\{[^}]*\}/, liste(d)); }
  function yerlestir(satirlar, anahtar, f) {
    return satirlar.map(function (s) { return s.indexOf(anahtar) >= 0 ? f(s) : s; });
  }

  /* izleyici: anahtar metin → satır numarası; her adım bir kayıt. İngilizce kipte anahtar, modelin en tablosundan çevrilir. */
  function Izci(satirlar, ke) { this.s = satirlar; this.ke = ke || null; this.adimlar = []; this.cikti = ""; this.ciktiAd = tx("Çıktı", "Output"); }
  Izci.prototype.satir = function (anahtar, kacinci) {
    var k = kacinci || 1, a = EN && this.ke && this.ke[anahtar] != null ? this.ke[anahtar] : anahtar;
    for (var i = 0; i < this.s.length; i++) if (this.s[i].indexOf(a) >= 0 && --k === 0) return i + 1;
    throw new Error("Kodda satır bulunamadı: " + a);
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
  var ETK_SAYI = ["Girdi (virgülle ayrılmış sayılar)", "Input (comma-separated numbers)"];

  /* ---------- Bölüm 2: ikili arama, önek ortalamaları ---------- */
  function aramaGirdisi(t) {
    var p = ikiParca(t, tx("sıralı sayılar | aranan", "sorted numbers | target"));
    var d = sayilar(p[0], 1, 10, -99, 999), h = sayilar(p[1], 1, 1, -99, 999)[0];
    var s = d.slice().sort(function (x, y) { return x - y; });
    return { a: s, hedef: h, siralandi: s.join() !== d.join() };
  }
  MODELLER.ikiliArama = {
    etiket: ["Girdi (sıralı sayılar | aranan)", "Input (sorted numbers | target)"],
    en: { "int ikiliArama": "int binarySearch", "if (a[mid] == hedef)": "if (a[mid] == target)", "if (a[mid] < hedef)": "if (a[mid] < target)" },
    coz: aramaGirdisi,
    calis: function (g, Z) {
      var a = g.a, n = a.length, lo = null, hi = null, mid = null, tur = 0;
      Z.ciktiAd = DD();
      function A(k, msg, iz, sinif) {
        var c = {};
        for (var i = 0; i < n; i++) if (lo != null && (i < lo || i > hi)) c[i] = "is-off";
        if (sinif) for (var x in sinif) c[x] = sinif[x];
        Z.kaydet(k, msg, vlist({ [tx("hedef", "target")]: g.hedef, lo: lo, hi: hi, mid: mid, "a[mid]": mid != null ? a[mid] : null, [tx("tur", "round")]: tur }),
          { satir: [sira("a", a, { lo: lo, hi: hi, mid: mid }, c)] }, iz);
      }
      A("int ikiliArama", tx("ikiliArama, " + n + " öğeli sıralı a dizisi ve hedef = " + g.hedef + " ile çağrılır." +
        (g.siralandi ? " Girdi sıralı olmadığından dizi küçükten büyüğe sıralanarak kullanılır." : ""),
        "binarySearch is called with a sorted array a of " + pl(n, "item") + " and target = " + g.hedef + "." +
        (g.siralandi ? " The input was not sorted, so it is sorted in ascending order first." : "")));
      lo = 0; hi = n - 1;
      A("int lo = 0", tx("lo = 0, hi = a.length − 1 = " + hi + "; arama aralığı a[0.." + hi + "].", "lo = 0, hi = a.length − 1 = " + hi + "; the search range is a[0.." + hi + "]."));
      for (;;) {
        if (lo > hi) {
          A("while (lo <= hi)", tx("lo = " + lo + " > hi = " + hi + ": aralık boşaldı, döngü biter.", "lo = " + lo + " > hi = " + hi + ": the range is empty, so the loop ends."));
          Z.cikti = "-1";
          A("return -1", tx("Hedef " + g.hedef + " dizide yok; " + tur + " turdan sonra −1 döndürülür.", "The target " + g.hedef + " is not in the array; −1 is returned after " + pl(tur, "round") + "."), "R -1");
          return;
        }
        tur++; mid = null;
        A("while (lo <= hi)", tx("lo = " + lo + " ≤ hi = " + hi + ": aralıkta " + (hi - lo + 1) + " öğe var; " + tur + ". tur başlar.",
          "lo = " + lo + " ≤ hi = " + hi + ": " + pl(hi - lo + 1, "item") + " left in the range; round " + tur + " begins."));
        mid = Math.floor((lo + hi) / 2);
        A("int mid", tx("mid = (" + lo + " + " + hi + ") / 2 = " + mid + " (tam sayı bölmesi); a[" + mid + "] = " + a[mid] + ".",
          "mid = (" + lo + " + " + hi + ") / 2 = " + mid + " (integer division); a[" + mid + "] = " + a[mid] + "."),
          "M " + lo + " " + hi + " " + mid, sin(mid, "is-cmp"));
        if (a[mid] === g.hedef) {
          Z.cikti = String(mid);
          A("if (a[mid] == hedef)", tx("a[" + mid + "] = " + a[mid] + " hedefe eşit: bulundu, " + mid + " döndürülür (" + tur + " tur).",
            "a[" + mid + "] = " + a[mid] + " equals the target: found, " + mid + " is returned (" + pl(tur, "round") + ")."), "R " + mid, sin(mid, "is-done"));
          return;
        }
        A("if (a[mid] == hedef)", tx("a[" + mid + "] = " + a[mid] + " ≠ " + g.hedef + "; aranan değer bu konumda değil.",
          "a[" + mid + "] = " + a[mid] + " ≠ " + g.hedef + "; the target is not at this position."), null, sin(mid, "is-cmp"));
        if (a[mid] < g.hedef) {
          lo = mid + 1;
          A("if (a[mid] < hedef)", tx("a[" + mid + "] = " + a[mid] + " < " + g.hedef + ": hedef sağ yarıda olabilir; lo = mid + 1 = " + lo + ".",
            "a[" + mid + "] = " + a[mid] + " < " + g.hedef + ": if the target is present, it is in the right half; lo = mid + 1 = " + lo + "."));
        } else {
          hi = mid - 1;
          A("else hi = mid - 1", tx("a[" + mid + "] = " + a[mid] + " > " + g.hedef + ": hedef sol yarıda olabilir; hi = mid − 1 = " + hi + ".",
            "a[" + mid + "] = " + a[mid] + " > " + g.hedef + ": if the target is present, it is in the left half; hi = mid − 1 = " + hi + "."));
        }
      }
    }
  };
  function sin(i, c) { var o = {}; o[i] = c; return o; }

  function onekGirdisi(t) { return { x: sayilar(t, 1, 7, -99, 99) }; }
  MODELLER.onekOrt1 = {
    etiket: ETK_SAYI,
    en: { "double[] onekOrt1": "double[] prefixAverage1", "double top = 0": "double total = 0", "top += x[i]": "total += x[i]", "a[j] = top / (j + 1)": "a[j] = total / (j + 1)" },
    coz: onekGirdisi,
    calis: function (g, Z) {
      var x = g.x, n = null, a = null, j = null, i = null, top = null, say = 0;
      Z.ciktiAd = DD();
      function A(k, msg, iz, cx, ca) {
        var rows = [sira("x", x, { i: i, j: i == null ? j : null }, cx)];
        if (a) rows.push(sira("a", a, { j: j }, ca));
        Z.kaydet(k, msg, vlist({ n: n, j: j, i: i, [tx("top", "total")]: top == null ? null : jDouble(top), [tx("toplama", "additions")]: say }), { satir: rows }, iz);
      }
      A("double[] onekOrt1", tx("onekOrt1, x = " + liste(x) + " dizisiyle çağrılır; a[j], x[0..j] öğelerinin ortalaması olacak.",
        "prefixAverage1 is called with x = " + liste(x) + "; a[j] will be the average of x[0..j]."));
      n = x.length;
      A("int n = x.length", "n = x.length = " + n + ".");
      a = x.map(function () { return 0; });
      A("double[] a = new double[n]", tx("a dizisi " + n + " öğeyle oluşturulur; double öğeler 0.0 başlar.", "a is created with " + pl(n, "element") + ", all 0.0 (the default for double)."));
      for (j = 0; j < n; j++) {
        top = 0; i = null;
        A("double top = 0", tx("j = " + j + ": top = 0; x[0.." + j + "] baştan toplanacak.", "j = " + j + ": total = 0; x[0.." + j + "] is summed from scratch."));
        for (i = 0; i <= j; i++) {
          top += x[i]; say++;
          var c = {};
          for (var q = 0; q <= i; q++) c[q] = "is-cmp";
          c[i] = "is-set";
          A("top += x[i]", tx("i = " + i + ": top += x[" + i + "] = " + x[i] + " → top = " + jDouble(top) + "; şimdiye kadar " + say + " toplama yapıldı.",
            "i = " + i + ": total += x[" + i + "] = " + x[i] + " → total = " + jDouble(top) + "; " + pl(say, "addition") + " so far."), null, c);
        }
        i = null;
        a[j] = top / (j + 1);
        A("a[j] = top / (j + 1)", tx("a[" + j + "] = " + jDouble(top) + " / " + (j + 1) + " = " + jDouble(a[j]) + "; iç döngü bu j için " + (j + 1) + " toplama yaptı.",
          "a[" + j + "] = " + jDouble(top) + " / " + (j + 1) + " = " + jDouble(a[j]) + "; the inner loop made " + pl(j + 1, "addition") + " for this j."),
          null, null, sin(j, "is-set"));
      }
      j = null;
      Z.cikti = jListe(a.map(jDouble));
      A("return a", tx("Dış döngü bitti; a döndürülür. Toplam " + say + " toplama: 1 + 2 + … + n = n(n + 1)/2 = " + (n * (n + 1) / 2) + ", yani O(n²).",
        "The outer loop is done; a is returned. " + pl(say, "addition") + " in all: 1 + 2 + … + n = n(n + 1)/2 = " + (n * (n + 1) / 2) + ", so O(n²)."),
        "A " + jListe(a.map(jDouble)) + " T " + say);
    }
  };
  MODELLER.onekOrt2 = {
    etiket: ETK_SAYI,
    en: { "double[] onekOrt2": "double[] prefixAverage2", "top += x[j]": "total += x[j]", "a[j] = top / (j + 1)": "a[j] = total / (j + 1)" },
    coz: onekGirdisi,
    calis: function (g, Z) {
      var x = g.x, n = null, a = null, j = null, top = null, say = 0;
      Z.ciktiAd = DD();
      function A(k, msg, iz, cx, ca) {
        var rows = [sira("x", x, { j: j }, cx)];
        if (a) rows.push(sira("a", a, { j: j }, ca));
        Z.kaydet(k, msg, vlist({ n: n, j: j, [tx("top", "total")]: top == null ? null : jDouble(top), [tx("toplama", "additions")]: say }), { satir: rows }, iz);
      }
      A("double[] onekOrt2", tx("onekOrt2, x = " + liste(x) + " dizisiyle çağrılır; toplam bir önceki turdan sürdürülecek.",
        "prefixAverage2 is called with x = " + liste(x) + "; the running total carries over from one round to the next."));
      n = x.length; a = x.map(function () { return 0; }); top = 0;
      A("int n = x.length", tx("n = " + n + "; a dizisi " + n + " öğeyle (0.0) oluşturulur ve top = 0.0 ile başlar.",
        "n = " + n + "; a is created with " + pl(n, "element") + " (0.0) and total starts at 0.0."));
      for (j = 0; j < n; j++) {
        top += x[j]; say++;
        var c = {};
        for (var q = 0; q < j; q++) c[q] = "is-cmp";
        c[j] = "is-set";
        A("top += x[j]", tx("j = " + j + ": top += x[" + j + "] = " + x[j] + " → top = " + jDouble(top) + "; bu tek toplama x[0.." + j + "] toplamını verir (şimdiye kadar " + say + " toplama).",
          "j = " + j + ": total += x[" + j + "] = " + x[j] + " → total = " + jDouble(top) + "; this single addition gives the sum of x[0.." + j + "] (" + pl(say, "addition") + " so far)."), null, c);
        a[j] = top / (j + 1);
        A("a[j] = top / (j + 1)", "a[" + j + "] = " + jDouble(top) + " / " + (j + 1) + " = " + jDouble(a[j]) + ".", null, null, sin(j, "is-set"));
      }
      j = null;
      Z.cikti = jListe(a.map(jDouble));
      A("return a", tx("Döngü bitti; a döndürülür. Toplam " + say + " toplama: her j için bir toplama, yani O(n).",
        "The loop is done; a is returned. " + pl(say, "addition") + " in all, one per j, so O(n)."), "A " + jListe(a.map(jDouble)) + " T " + say);
    }
  };

  /* ---------- Bölüm 3: seçimli ve eklemeli sıralama ---------- */
  function siralamaGirdisi(t) { return { d: sayilar(t, 2, 10, -99, 999) }; }
  MODELLER.secimli = {
    etiket: ETK_SAYI,
    en: { "int[] dizi": "int[] arr", "int n = dizi.length": "int n = arr.length", "int minIndis = i": "int minIndex = i",
      "if (dizi[j] < dizi[minIndis])": "if (arr[j] < arr[minIndex])", "minIndis = j;": "minIndex = j;", "int gecici = dizi[minIndis]": "int temp = arr[minIndex]",
      "dizi[minIndis] = dizi[i]": "arr[minIndex] = arr[i]", "dizi[i] = gecici": "arr[i] = temp" },
    coz: siralamaGirdisi,
    kod: function (s, g) { return yerlestir(s, tx("int[] dizi = {", "int[] arr = {"), function (x) { return suslu(x, g.d); }); },
    calis: function (g, Z) {
      var d = g.d.slice(), n = null, i = null, j = null, mi = null, gec = null, k = 0, yerinde = 0, D = tx("dizi", "arr");
      function A(key, msg, iz, sinif) {
        var c = {};
        for (var q = 0; q < yerinde; q++) c[q] = "is-done";
        if (sinif) for (var x in sinif) c[x] = (c[x] ? c[x] + " " : "") + sinif[x];
        Z.kaydet(key, msg, vlist({ n: n, i: i, j: j, [tx("minIndis", "minIndex")]: mi, [tx("gecici", "temp")]: gec, [tx("karşılaştırma", "comparisons")]: k }),
          { satir: [sira(D, d, { i: i, j: j, min: mi }, c)] }, iz);
      }
      A("int[] dizi", tx("dizi " + d.length + " öğeyle oluşturulur: " + liste(d) + ".", "arr is created with " + pl(d.length, "item") + ": " + liste(d) + "."));
      n = d.length;
      A("int n = dizi.length", tx("n = dizi.length = " + n + "; dış döngü n − 1 = " + (n - 1) + " tur dönecek.",
        "n = arr.length = " + n + "; the outer loop will make n − 1 = " + pl(n - 1, "pass", "passes") + "."));
      for (i = 0; ; i++) {
        j = null; mi = null; gec = null;
        if (i >= n - 1) {
          yerinde = n;
          A("for (int i = 0", tx("i = " + i + ": i < n − 1 koşulu yanlış, dış döngü biter. Dizi sıralandı: " + liste(d) + " (" + k + " karşılaştırma).",
            "i = " + i + ": i < n − 1 is false, so the outer loop ends. The array is sorted: " + liste(d) + " (" + pl(k, "comparison") + ")."),
            "K " + k);
          return;
        }
        A("for (int i = 0", tx("i = " + i + ": i < n − 1 koşulu doğru; dizi[" + i + "] konumuna dizi[" + i + ".." + (n - 1) + "] aralığının en küçük öğesi getirilecek.",
          "i = " + i + ": i < n − 1 is true; the smallest item of arr[" + i + ".." + (n - 1) + "] will be moved to arr[" + i + "]."));
        mi = i;
        A("int minIndis = i", tx("minIndis = i = " + i + "; şimdilik en küçük aday dizi[" + i + "] = " + d[i] + ".",
          "minIndex = i = " + i + "; the smallest candidate so far is arr[" + i + "] = " + d[i] + "."), null, sin(i, "is-cmp"));
        for (j = i + 1; j < n; j++) {
          k++;
          var dogru = d[j] < d[mi], c = {};
          c[j] = "is-cmp"; c[mi] = "is-cmp";
          A("if (dizi[j] < dizi[minIndis])", tx("j = " + j + ": dizi[" + j + "] = " + d[j] + " < dizi[" + mi + "] = " + d[mi] +
            " karşılaştırması " + (dogru ? "doğru." : "yanlış; minIndis değişmez."),
            "j = " + j + ": arr[" + j + "] = " + d[j] + " < arr[" + mi + "] = " + d[mi] + " is " + (dogru ? "true." : "false; minIndex stays.")), null, c);
          if (dogru) {
            mi = j;
            A("minIndis = j;", tx("minIndis = " + j + "; yeni en küçük aday " + d[j] + ".", "minIndex = " + j + "; the new smallest candidate is " + d[j] + "."), null, sin(j, "is-cmp"));
          }
        }
        j = null;
        gec = d[mi];
        A("int gecici = dizi[minIndis]", tx("j = n olduğundan iç döngü bitti. gecici = dizi[" + mi + "] = " + gec +
          (mi === i ? "; en küçük öğe zaten yerinde, takas aynı konumda yapılır." : "; takas başlar."),
          "j = n, so the inner loop is done. temp = arr[" + mi + "] = " + gec +
          (mi === i ? "; the smallest item is already in place, so it is swapped with itself." : "; the swap begins.")), null, sin(mi, "is-cmp"));
        d[mi] = d[i];
        A("dizi[minIndis] = dizi[i]", tx("dizi[" + mi + "] = dizi[" + i + "] = " + d[i] + ".", "arr[" + mi + "] = arr[" + i + "] = " + d[i] + "."), "S " + d.join(","), sin(mi, "is-set"));
        d[i] = gec; yerinde = i + 1;
        A("dizi[i] = gecici", tx("dizi[" + i + "] = gecici = " + gec + "; dizi[0.." + i + "] artık sıralı ve yerinde.",
          "arr[" + i + "] = temp = " + gec + "; arr[0.." + i + "] is now sorted and final."), "S " + d.join(","), sin(i, "is-set"));
      }
    }
  };
  MODELLER.eklemeli = {
    etiket: ETK_SAYI,
    en: { "static void eklemeliSirala": "static void insertionSort", "int anahtar = a[k]": "int key = a[k]", "a[j] = anahtar": "a[j] = key" },
    coz: siralamaGirdisi,
    calis: function (g, Z) {
      var a = g.d.slice(), n = a.length, k = null, anahtar = null, j = null, kars = 0, sirali = 1;
      function A(key, msg, iz, sinif) {
        var c = {};
        for (var q = 0; q < sirali; q++) c[q] = "is-done";
        if (sinif) for (var x in sinif) c[x] = sinif[x];
        Z.kaydet(key, msg, vlist({ k: k, [tx("anahtar", "key")]: anahtar, j: j, [tx("karşılaştırma", "comparisons")]: kars }), { satir: [sira("a", a, { k: k, j: j }, c)] }, iz);
      }
      A("static void eklemeliSirala", tx("eklemeliSirala, a = " + liste(a) + " dizisiyle çağrılır; tek öğeli a[0..0] başlangıçta sıralı sayılır.",
        "insertionSort is called with a = " + liste(a) + "; the one-item prefix a[0..0] counts as sorted."));
      for (k = 1; ; k++) {
        j = null; anahtar = null;
        if (k >= n) {
          A("for (int k = 1", tx("k = " + k + " = a.length: döngü biter. Dizi sıralandı: " + liste(a) + " (" + kars + " karşılaştırma).",
            "k = " + k + " = a.length: the loop ends. The array is sorted: " + liste(a) + " (" + pl(kars, "comparison") + ")."), "K " + kars);
          return;
        }
        anahtar = a[k];
        A("int anahtar = a[k]", tx("k = " + k + ": anahtar = a[" + k + "] = " + anahtar + "; anahtar sıralı a[0.." + (k - 1) + "] kısmına yerleştirilecek.",
          "k = " + k + ": key = a[" + k + "] = " + anahtar + "; key will be inserted into the sorted part a[0.." + (k - 1) + "]."), null, sin(k, "is-cmp"));
        j = k;
        A("int j = k", tx("j = k = " + k + "; anahtarın yeri bu konumdan sola doğru aranır.", "j = k = " + k + "; we look for key's place, moving left from here."), null, sin(j, "is-cmp"));
        for (;;) {
          if (j > 0) {
            kars++;
            var buyuk = a[j - 1] > anahtar, c = {};
            c[j - 1] = "is-cmp";
            A("while (j > 0", tx("j = " + j + " > 0 ve a[" + (j - 1) + "] = " + a[j - 1] + " > anahtar = " + anahtar + " karşılaştırması " +
              (buyuk ? "doğru: " + a[j - 1] + " bir sağa kayacak." : "yanlış: anahtarın yeri bulundu, döngü biter."),
              "j = " + j + " > 0, and a[" + (j - 1) + "] = " + a[j - 1] + " > key = " + anahtar + " is " +
              (buyuk ? "true: " + a[j - 1] + " moves one place right." : "false: key's place is found, so the loop ends.")), null, c);
            if (!buyuk) break;
          } else {
            A("while (j > 0", tx("j = 0: dizinin başına ulaşıldı, döngü biter.", "j = 0: we reached the start of the array, so the loop ends."));
            break;
          }
          a[j] = a[j - 1];
          A("a[j] = a[j - 1]", tx("a[" + j + "] = a[" + (j - 1) + "] = " + a[j] + " (sağa kaydırma).", "a[" + j + "] = a[" + (j - 1) + "] = " + a[j] + " (shift right)."), "S " + a.join(","), sin(j, "is-set"));
          j--;
          A("j--", tx("j bir azalır: j = " + j + ".", "j drops by one: j = " + j + "."));
        }
        a[j] = anahtar; sirali = k + 1;
        A("a[j] = anahtar", tx("a[" + j + "] = anahtar = " + anahtar + "; a[0.." + k + "] artık sıralı.", "a[" + j + "] = key = " + anahtar + "; a[0.." + k + "] is now sorted."), "S " + a.join(","), sin(j, "is-set"));
      }
    }
  };

  /* ---------- Bölüm 4: çağrı yığını ---------- */
  /* çerçeve: ad (çağrı), y (yerel değişkenler), d (durum) */
  function bekl(x) { return tx("bekliyor: ", "waiting: ") + x; }
  function donus(v) { return tx("dönüş ", "returns ") + v; }
  function CagriIzi(Z, kok) { this.Z = Z; this.fr = [{ ad: "main", y: "", d: "" }]; this.cagri = 0; this.kok = kok; }
  CagriIzi.prototype.ust = function () { return this.fr[this.fr.length - 1]; };
  CagriIzi.prototype.A = function (k, msg, iz, ek) {
    var fr = this.fr.map(function (f, i, all) { return { ad: f.ad, y: f.y, d: f.d, c: i === all.length - 1 ? "is-top" : "" }; });
    var u = this.ust(), v = { [tx("derinlik", "depth")]: this.fr.length - 1, [tx("çağrı sayısı", "calls")]: this.cagri };
    var vars = (u.v || []).concat(vlist(v));
    var g = { cerceve: fr };
    if (ek) g.satir = ek;
    this.Z.kaydet(k, msg, vars, g, iz);
  };
  CagriIzi.prototype.gir = function (ad, y, v) { this.cagri++; this.fr.push({ ad: ad, y: y, d: tx("çalışıyor", "running"), v: v }); };
  CagriIzi.prototype.cik = function () { this.fr.pop(); };
  function cagriDegistir(s, ad, desen, yeni) {
    return yerlestir(s, "System.out.println(" + ad + "(", function (x) { return x.replace(new RegExp(ad + desen), yeni); });
  }

  MODELLER.faktoriyel = {
    etiket: ["Girdi (n, 0–10)", "Input (n, 0–10)"],
    en: { "System.out.println(faktoriyel(": "System.out.println(factorial(", "return n * faktoriyel(n - 1)": "return n * factorial(n - 1)" },
    coz: function (t) { return { n: sayilar(t, 1, 1, 0, 10)[0] }; },
    kod: function (s, g) { var F = tx("faktoriyel", "factorial"); return cagriDegistir(s, F, "\\(\\d+\\)", F + "(" + g.n + ")"); },
    calis: function (g, Z) {
      var C = new CagriIzi(Z), F = tx("faktoriyel", "factorial");
      C.ust().d = bekl(F + "(" + g.n + ")");
      C.A("System.out.println(faktoriyel(", tx("main, faktoriyel(" + g.n + ") çağrısını yapar; çağrı yığınına yeni bir çerçeve eklenecek.",
        "main calls factorial(" + g.n + "); a new frame will be pushed onto the call stack."));
      function f(n) {
        C.gir(F + "(" + n + ")", "n = " + n, [["n", String(n)]]);
        var taban = n <= 1;
        C.A("if (n <= 1)", tx("Yeni çerçeve: n = " + n + ". n <= 1 koşulu " + (taban ? "doğru: taban durum." : "yanlış: özyinelemeli adım."),
          "New frame: n = " + n + ". n <= 1 is " + (taban ? "true: base case." : "false: recursive step.")), "C " + n);
        if (taban) {
          C.ust().d = donus(1);
          C.A("return 1;", tx("faktoriyel(" + n + ") = 1 döner; bu çerçeve yığından çıkar.", "factorial(" + n + ") returns 1; this frame is popped off the stack."), "R 1");
          C.cik();
          return 1;
        }
        C.ust().d = bekl(F + "(" + (n - 1) + ")");
        C.A("return n * faktoriyel(n - 1)", tx("Çarpım için önce faktoriyel(" + (n - 1) + ") çağrılır; n = " + n + " olan çerçeve dönüşü bekler.",
          "Before multiplying, factorial(" + (n - 1) + ") is called; the frame with n = " + n + " waits for it to return."));
        var r = f(n - 1), v = Math.imul(n, r);
        C.ust().d = donus(v);
        C.ust().v = [["n", String(n)], [F + "(n - 1)", String(r)]];
        C.A("return n * faktoriyel(n - 1)", tx("faktoriyel(" + (n - 1) + ") = " + r + " döndü; " + n + " * " + r + " = " + v + " döndürülür ve çerçeve yığından çıkar.",
          "factorial(" + (n - 1) + ") returned " + r + "; " + n + " * " + r + " = " + v + " is returned and the frame is popped."), "R " + v);
        C.cik();
        return v;
      }
      var r = f(g.n);
      C.ust().d = "";
      Z.cikti = r + "\n";
      C.A("System.out.println(faktoriyel(", tx("faktoriyel(" + g.n + ") = " + r + " ekrana yazılır; çağrı yığınında yalnız main kaldı. En büyük derinlik " + Math.max(1, g.n) + " çerçeve.",
        "factorial(" + g.n + ") = " + r + " is printed; only main is left on the call stack. The stack was at most " + pl(Math.max(1, g.n), "frame") + " deep."), "O " + r);
    }
  };
  MODELLER.toplam = {
    etiket: ETK_SAYI,
    en: { "System.out.println(toplam(": "System.out.println(sum(", "return toplam(a, n - 1) + a[n - 1]": "return sum(a, n - 1) + a[n - 1]" },
    coz: function (t) { return { a: sayilar(t, 1, 8, -99, 999) }; },
    kod: function (s, g) {
      var F = tx("toplam", "sum");
      s = yerlestir(s, "int[] a = {", function (x) { return suslu(x, g.a); });
      return cagriDegistir(s, F, "\\(a, \\d+\\)", F + "(a, " + g.a.length + ")");
    },
    calis: function (g, Z) {
      var a = g.a, C = new CagriIzi(Z), hl = null, F = tx("toplam", "sum");
      function dz() { var c = {}; if (hl != null) c[hl[0]] = hl[1]; return [sira("a", a, null, c)]; }
      C.A("int[] a = {", tx("a dizisi oluşturulur: " + liste(a) + ".", "Array a is created: " + liste(a) + "."), null, dz());
      C.ust().d = bekl(F + "(a, " + a.length + ")");
      C.A("System.out.println(toplam(", tx("main, toplam(a, " + a.length + ") çağrısını yapar: ilk " + a.length + " öğenin toplamı istenir.",
        "main calls sum(a, " + a.length + "): it asks for the sum of the first " + pl(a.length, "item") + "."), null, dz());
      function f(n) {
        C.gir(F + "(a, " + n + ")", "n = " + n, [["n", String(n)]]);
        var taban = n === 0;
        hl = null;
        C.A("if (n == 0)", tx("Yeni çerçeve: n = " + n + ". n == 0 koşulu " + (taban ? "doğru: boş önekin toplamı 0." : "yanlış: özyinelemeli adım."),
          "New frame: n = " + n + ". n == 0 is " + (taban ? "true: the sum of an empty prefix is 0." : "false: recursive step.")), "C " + n, dz());
        if (taban) {
          C.ust().d = donus(0);
          C.A("return 0;", tx("toplam(a, 0) = 0 döner; çerçeve yığından çıkar.", "sum(a, 0) returns 0; the frame is popped."), "R 0", dz());
          C.cik();
          return 0;
        }
        C.ust().d = bekl(F + "(a, " + (n - 1) + ")");
        C.A("return toplam(a, n - 1) + a[n - 1]", tx("Önce toplam(a, " + (n - 1) + ") çağrılır; a[" + (n - 1) + "] sonra eklenecek.",
          "sum(a, " + (n - 1) + ") is called first; a[" + (n - 1) + "] will be added afterward."), null, dz());
        var r = f(n - 1), v = (r + a[n - 1]) | 0;
        hl = [n - 1, "is-set"];
        C.ust().d = donus(v);
        C.ust().v = [["n", String(n)], [F + "(a, n - 1)", String(r)], ["a[n - 1]", String(a[n - 1])]];
        C.A("return toplam(a, n - 1) + a[n - 1]", tx("toplam(a, " + (n - 1) + ") = " + r + " döndü; " + r + " + a[" + (n - 1) + "] = " + r + " + " + a[n - 1] + " = " + v + " döndürülür.",
          "sum(a, " + (n - 1) + ") returned " + r + "; " + r + " + a[" + (n - 1) + "] = " + r + " + " + a[n - 1] + " = " + v + " is returned."), "R " + v, dz());
        C.cik();
        return v;
      }
      var r = f(a.length);
      hl = null;
      C.ust().d = "";
      Z.cikti = r + "\n";
      C.A("System.out.println(toplam(", tx("toplam(a, " + a.length + ") = " + r + " ekrana yazılır. " + (a.length + 1) + " çağrı yapıldı, her biri O(1) iş: O(n).",
        "sum(a, " + a.length + ") = " + r + " is printed. " + (a.length + 1) + " calls were made, each doing O(1) work: O(n)."), "O " + r, dz());
    }
  };
  MODELLER.fib = {
    etiket: ["Girdi (n, 0–7)", "Input (n, 0–7)"],
    coz: function (t) { return { n: sayilar(t, 1, 1, 0, 7)[0] }; },
    kod: function (s, g) { return cagriDegistir(s, "fib", "\\(\\d+\\)", "fib(" + g.n + ")"); },
    calis: function (g, Z) {
      var C = new CagriIzi(Z), bilinen = {};
      C.ust().d = bekl("fib(" + g.n + ")");
      C.A("System.out.println(fib(", tx("main, fib(" + g.n + ") çağrısını yapar.", "main calls fib(" + g.n + ")."));
      function f(n) {
        C.gir("fib(" + n + ")", "n = " + n, [["n", String(n)]]);
        var tekrar = bilinen[n] ? tx(" fib(" + n + ") daha önce de hesaplanmıştı; aynı iş yeniden yapılıyor.", " fib(" + n + ") was computed before; the same work is being repeated.") : "";
        if (n <= 1) {
          C.ust().d = donus(n);
          C.A("if (n <= 1) return n;", tx("Yeni çerçeve: n = " + n + " ≤ 1, taban durum: fib(" + n + ") = " + n + " döner.",
            "New frame: n = " + n + " ≤ 1, base case: fib(" + n + ") returns " + n + ".") + tekrar, "C " + n + " R " + n);
          bilinen[n] = true;
          C.cik();
          return n;
        }
        C.A("if (n <= 1) return n;", tx("Yeni çerçeve: n = " + n + " > 1, özyinelemeli adım.", "New frame: n = " + n + " > 1, recursive step.") + tekrar, "C " + n);
        C.ust().d = bekl("fib(" + (n - 1) + ")");
        C.A("return fib(n - 1) + fib(n - 2)", tx("Önce fib(" + (n - 1) + ") çağrılır; fib(" + (n - 2) + ") ondan sonra hesaplanacak.",
          "fib(" + (n - 1) + ") is called first; fib(" + (n - 2) + ") will be computed after it."));
        var x = f(n - 1);
        C.ust().d = bekl("fib(" + (n - 2) + ")");
        C.ust().v = [["n", String(n)], ["fib(n - 1)", String(x)]];
        C.A("return fib(n - 1) + fib(n - 2)", tx("fib(" + (n - 1) + ") = " + x + " döndü; şimdi fib(" + (n - 2) + ") çağrılır.",
          "fib(" + (n - 1) + ") returned " + x + "; now fib(" + (n - 2) + ") is called."));
        var y = f(n - 2), v = (x + y) | 0;
        C.ust().d = donus(v);
        C.ust().v = [["n", String(n)], ["fib(n - 1)", String(x)], ["fib(n - 2)", String(y)]];
        C.A("return fib(n - 1) + fib(n - 2)", tx("fib(" + (n - 2) + ") = " + y + " döndü; " + x + " + " + y + " = " + v + " döndürülür.",
          "fib(" + (n - 2) + ") returned " + y + "; " + x + " + " + y + " = " + v + " is returned."), "R " + v);
        bilinen[n] = true;
        C.cik();
        return v;
      }
      var r = f(g.n);
      C.ust().d = "";
      Z.cikti = r + "\n";
      C.A("System.out.println(fib(", tx("fib(" + g.n + ") = " + r + " ekrana yazılır. Toplam " + C.cagri + " çağrı yapıldı; aynı değerler tekrar tekrar hesaplandığı için çağrı sayısı üstel büyür.",
        "fib(" + g.n + ") = " + r + " is printed. " + pl(C.cagri, "call") + " in all; because the same values are computed again and again, the number of calls grows exponentially."), "O " + r);
    }
  };
  MODELLER.hizliUs = {
    etiket: ["Girdi (x, n)", "Input (x, n)"],
    en: { "System.out.println(hizliUs(": "System.out.println(fastPower(", "long y = hizliUs(x, n / 2)": "long y = fastPower(x, n / 2)" },
    coz: function (t) { var p = sayilar(t, 2, 2, -99, 999); if (p[1] < 0 || p[1] > 99) hata(tx("Üs n 0 ile 99 arasında olmalı.", "The exponent n must be between 0 and 99.")); return { x: p[0], n: p[1] }; },
    kod: function (s, g) { var F = tx("hizliUs", "fastPower"); return cagriDegistir(s, F, "\\([^)]*\\)", F + "(" + g.x + ", " + g.n + ")"); },
    calis: function (g, Z) {
      var C = new CagriIzi(Z), X = BigInt(g.x), tasma = false, F = tx("hizliUs", "fastPower");
      function L(v) { var r = BigInt.asIntN(64, v); if (r !== v) tasma = true; return r; }
      C.ust().d = bekl(F + "(" + g.x + ", " + g.n + ")");
      C.A("System.out.println(hizliUs(", tx("main, hizliUs(" + g.x + ", " + g.n + ") çağrısını yapar.", "main calls fastPower(" + g.x + ", " + g.n + ")."));
      function f(n) {
        C.gir(F + "(" + g.x + ", " + n + ")", "x = " + g.x + ", n = " + n, [["x", String(g.x)], ["n", String(n)]]);
        if (n === 0) {
          C.ust().d = donus(1);
          C.A("if (n == 0) return 1;", tx("Yeni çerçeve: n = 0, taban durum: x⁰ = 1 döner.", "New frame: n = 0, base case: x⁰ = 1 is returned."), "C 0 R 1");
          C.cik();
          return 1n;
        }
        C.A("if (n == 0) return 1;", tx("Yeni çerçeve: n = " + n + " ≠ 0.", "New frame: n = " + n + " ≠ 0."), "C " + n);
        C.ust().d = bekl(F + "(" + g.x + ", " + Math.floor(n / 2) + ")");
        C.A("long y = hizliUs(x, n / 2)", tx("y için hizliUs(x, " + n + " / 2) = hizliUs(" + g.x + ", " + Math.floor(n / 2) + ") çağrılır; üs her çağrıda yarıya iner.",
          "To get y, fastPower(x, " + n + " / 2) = fastPower(" + g.x + ", " + Math.floor(n / 2) + ") is called; the exponent halves with every call."));
        var y = f(Math.floor(n / 2));
        C.ust().v = [["x", String(g.x)], ["n", String(n)], ["y", String(y)]];
        C.ust().d = "y = " + y;
        C.A("long y = hizliUs(x, n / 2)", tx("Dönen değer y = " + y + ".", "The returned value is y = " + y + "."));
        var v;
        if (n % 2 === 0) {
          v = L(y * y);
          C.ust().d = donus(v);
          C.A("if (n % 2 == 0) return y * y;", tx("n = " + n + " çift: y * y = " + v + " döndürülür.", "n = " + n + " is even: y * y = " + v + " is returned."), "R " + v);
        } else {
          C.A("if (n % 2 == 0) return y * y;", tx("n = " + n + " tek; koşul yanlış.", "n = " + n + " is odd; the condition is false."));
          v = L(L(X * y) * y);
          C.ust().d = donus(v);
          C.A("return x * y * y", tx("n tek olduğundan x * y * y = " + g.x + " * " + y + " * " + y + " = " + v + " döndürülür.",
            "n is odd, so x * y * y = " + g.x + " * " + y + " * " + y + " = " + v + " is returned."), "R " + v);
        }
        C.cik();
        return v;
      }
      var r = f(g.n);
      C.ust().d = "";
      Z.cikti = r + "\n";
      C.A("System.out.println(hizliUs(", tx("hizliUs(" + g.x + ", " + g.n + ") = " + r + " ekrana yazılır. " + C.cagri + " çağrı yapıldı: O(log n)." +
        (tasma ? " Sonuç long sınırını aştığı için Java'daki gibi taşma oldu (64 bit, mod 2⁶⁴)." : ""),
        "fastPower(" + g.x + ", " + g.n + ") = " + r + " is printed. " + pl(C.cagri, "call") + " were made: O(log n)." +
        (tasma ? " The result went past the range of long, so it overflowed just as in Java (64 bits, mod 2⁶⁴)." : "")), "O " + r);
    }
  };
  MODELLER.ikiliAra = {
    etiket: ["Girdi (sıralı sayılar | aranan)", "Input (sorted numbers | target)"],
    en: { "System.out.println(ikiliAra(": "System.out.println(binarySearch(", "return ikiliAra(a, x, lo, mid - 1)": "return binarySearch(a, x, lo, mid - 1)",
      "return ikiliAra(a, x, mid + 1, hi)": "return binarySearch(a, x, mid + 1, hi)" },
    coz: aramaGirdisi,
    kod: function (s, g) { var F = tx("ikiliAra", "binarySearch"); return cagriDegistir(s, F, "\\(a, [^)]*\\)", F + "(a, " + g.hedef + ", 0, " + (g.a.length - 1) + ")"); },
    calis: function (g, Z) {
      var a = g.a, x = g.hedef, C = new CagriIzi(Z), lo = null, hi = null, mid = null, son = null, F = tx("ikiliAra", "binarySearch");
      function dz() {
        var c = {};
        for (var i = 0; i < a.length; i++) if (lo != null && (i < lo || i > hi)) c[i] = "is-off";
        if (mid != null) c[mid] = son || "is-cmp";
        return [sira("a", a, { lo: lo, hi: hi, mid: mid }, c)];
      }
      C.ust().d = bekl(F + "(a, " + x + ", 0, " + (a.length - 1) + ")");
      C.A("System.out.println(ikiliAra(", tx("main, a = " + liste(a) + " içinde " + x + " değerini ikiliAra(a, " + x + ", 0, " + (a.length - 1) + ") ile arar." +
        (g.siralandi ? " Girdi sıralı olmadığından dizi sıralanarak kullanılır." : ""),
        "main searches a = " + liste(a) + " for " + x + " with binarySearch(a, " + x + ", 0, " + (a.length - 1) + ")." +
        (g.siralandi ? " The input was not sorted, so the array is sorted first." : "")), null, dz());
      function f(l, h) {
        lo = l; hi = h; mid = null; son = null;
        C.gir(F + "(lo = " + l + ", hi = " + h + ")", "lo = " + l + ", hi = " + h, [["x", String(x)], ["lo", String(l)], ["hi", String(h)]]);
        if (l > h) {
          C.ust().d = donus(-1);
          C.A("if (lo > hi) return -1;", tx("Yeni çerçeve: lo = " + l + " > hi = " + h + ", aralık boş: taban durum, −1 döner.",
            "New frame: lo = " + l + " > hi = " + h + ", the range is empty: base case, −1 is returned."), "C " + l + " " + h + " R -1", dz());
          C.cik();
          return -1;
        }
        C.A("if (lo > hi) return -1;", tx("Yeni çerçeve: lo = " + l + " ≤ hi = " + h + "; aralıkta " + (h - l + 1) + " öğe var.",
          "New frame: lo = " + l + " ≤ hi = " + h + "; " + pl(h - l + 1, "item") + " in the range."), "C " + l + " " + h, dz());
        var m = Math.floor((l + h) / 2);
        mid = m;
        C.ust().v = [["x", String(x)], ["lo", String(l)], ["hi", String(h)], ["mid", String(m)]];
        C.A("int mid = (lo + hi) / 2", "mid = (" + l + " + " + h + ") / 2 = " + m + "; a[" + m + "] = " + a[m] + ".", null, dz());
        if (a[m] === x) {
          son = "is-done";
          C.ust().d = donus(m);
          C.A("if (a[mid] == x) return mid;", tx("a[" + m + "] = " + a[m] + " = x: taban durum, bulundu; " + m + " döner.",
            "a[" + m + "] = " + a[m] + " = x: base case, found; " + m + " is returned."), "R " + m, dz());
          C.cik();
          return m;
        }
        C.A("if (a[mid] == x) return mid;", "a[" + m + "] = " + a[m] + " ≠ " + x + ".", null, dz());
        var r;
        if (x < a[m]) {
          C.ust().d = bekl(F + "(a, " + x + ", " + l + ", " + (m - 1) + ")");
          C.A("return ikiliAra(a, x, lo, mid - 1)", tx(x + " < a[" + m + "] = " + a[m] + ": sol yarıda aranır, ikiliAra(a, " + x + ", " + l + ", " + (m - 1) + ") çağrılır.",
            x + " < a[" + m + "] = " + a[m] + ": search the left half; binarySearch(a, " + x + ", " + l + ", " + (m - 1) + ") is called."), null, dz());
          r = f(l, m - 1);
          lo = l; hi = h; mid = m; son = null;
          C.ust().d = donus(r);
          C.A("return ikiliAra(a, x, lo, mid - 1)", tx("Alt çağrı " + r + " döndürdü; bu çerçeve aynı değeri döndürür (kuyruk çağrısı).",
            "The recursive call returned " + r + "; this frame returns the same value (a tail call)."), "R " + r, dz());
        } else {
          C.ust().d = bekl(F + "(a, " + x + ", " + (m + 1) + ", " + h + ")");
          C.A("return ikiliAra(a, x, mid + 1, hi)", tx(x + " > a[" + m + "] = " + a[m] + ": sağ yarıda aranır, ikiliAra(a, " + x + ", " + (m + 1) + ", " + h + ") çağrılır.",
            x + " > a[" + m + "] = " + a[m] + ": search the right half; binarySearch(a, " + x + ", " + (m + 1) + ", " + h + ") is called."), null, dz());
          r = f(m + 1, h);
          lo = l; hi = h; mid = m; son = null;
          C.ust().d = donus(r);
          C.A("return ikiliAra(a, x, mid + 1, hi)", tx("Alt çağrı " + r + " döndürdü; bu çerçeve aynı değeri döndürür (kuyruk çağrısı).",
            "The recursive call returned " + r + "; this frame returns the same value (a tail call)."), "R " + r, dz());
        }
        C.cik();
        return r;
      }
      var r = f(0, a.length - 1);
      lo = hi = mid = null;
      C.ust().d = "";
      Z.cikti = r + "\n";
      C.A("System.out.println(ikiliAra(", r >= 0 ? tx(r + " ekrana yazılır: " + x + " değeri a[" + r + "] konumunda.", r + " is printed: " + x + " is at a[" + r + "].") :
        tx("−1 ekrana yazılır: " + x + " dizide yok.", "−1 is printed: " + x + " is not in the array."), "O " + r, dz());
    }
  };

  /* ---------- Bölüm 7: parantez kontrolü ve postfix değerlendirme ---------- */
  function karakter(c) { return "'" + c + "'"; }
  MODELLER.parantez = {
    etiket: ["Girdi (yalnız ( ) [ ] { } karakterleri)", "Input (only the characters ( ) [ ] { })"],
    en: { "boolean gecerliMi": "boolean isBalanced", "Deque<Character> yigin": "Deque<Character> stack", "yigin.push(c)": "stack.push(c)",
      "if (yigin.isEmpty()) return false;": "if (stack.isEmpty()) return false;", "char acik = yigin.pop()": "char open = stack.pop()",
      "return (a == '('": "return (open == '('", "|| (a == '['": "|| (open == '['", "|| (a == '{'": "|| (open == '{'",
      "if (!eslesir(acik, c)) return false;": "if (!matches(open, c)) return false;", "return yigin.isEmpty();": "return stack.isEmpty();" },
    coz: function (t) {
      var s = String(t).replace(/\s+/g, "");
      if (!s.length || s.length > 12) hata(tx("Girdi 1 ile 12 arasında parantez karakteri içermeli.", "The input must contain 1 to 12 bracket characters."));
      if (!/^[()[\]{}]+$/.test(s)) hata(tx("Girdide yalnız ( ) [ ] { } karakterleri olmalı.", "The input may contain only the characters ( ) [ ] { }."));
      return { s: s };
    },
    calis: function (g, Z) {
      var s = g.s.split(""), y = [], c = null, acik = null, pos = null;
      Z.ciktiAd = DD();
      function A(k, msg, iz, ys) {
        var cs = {};
        for (var i = 0; i < s.length; i++) if (pos != null && i < pos) cs[i] = "is-off";
        if (pos != null && pos < s.length) cs[pos] = "is-cmp";
        var yc = {};
        if (ys) yc[ys[0]] = ys[1];
        Z.kaydet(k, msg, vlist({ c: c == null ? null : karakter(c), [tx("acik", "open")]: acik == null ? null : karakter(acik), [tx("yigin.size()", "stack.size()")]: y.length }),
          { satir: [sira("s", s, { c: pos < s.length ? pos : null }, cs), sira(tx("yigin", "stack"), y.length ? y : [], y.length ? { [tx("tepe", "top")]: y.length - 1 } : null, yc, { bos: BOS(), yigin: true })] }, iz);
      }
      A("boolean gecerliMi", tx("gecerliMi(\"" + g.s + "\") çağrılır: " + s.length + " karakter soldan sağa taranacak.",
        "isBalanced(\"" + g.s + "\") is called: " + pl(s.length, "character") + " will be scanned left to right."));
      A("Deque<Character> yigin", tx("Açık parantezleri tutacak boş bir yığın oluşturulur.", "An empty stack is created to hold the opening brackets."));
      function son(v, msg, k) { Z.cikti = String(v); A(k, msg, "R " + v); }
      for (pos = 0; pos < s.length; pos++) {
        c = s[pos]; acik = null;
        if (c === "(" || c === "[" || c === "{") {
          A("if (c == '('", tx("c = " + karakter(c) + " bir açılış parantezi; koşul doğru.", "c = " + karakter(c) + " is an opening bracket; the condition is true."));
          y.push(c);
          A("yigin.push(c)", tx(karakter(c) + " yığının tepesine eklendi; tepe artık " + karakter(c) + ", boyut " + y.length + ".",
            karakter(c) + " is pushed onto the stack; the top is now " + karakter(c) + ", size " + y.length + "."), "Y " + jListe(y), [y.length - 1, "is-set"]);
          continue;
        }
        A("if (c == '('", tx("c = " + karakter(c) + " bir kapanış parantezi; else dalına geçilir.", "c = " + karakter(c) + " is a closing bracket; we take the else branch."));
        if (!y.length) {
          son(false, tx("Yığın boş: " + karakter(c) + " kapanışının eşleşeceği açılış yok; false döner.",
            "The stack is empty: there is no opener to match " + karakter(c) + "; false is returned."), "if (yigin.isEmpty()) return false;");
          return;
        }
        A("if (yigin.isEmpty()) return false;", tx("Yığın boş değil (boyut " + y.length + ").", "The stack is not empty (size " + y.length + ")."));
        acik = y.pop();
        A("char acik = yigin.pop()", tx("acik = pop() = " + karakter(acik) + "; yığında " + y.length + " öğe kaldı.",
          "open = pop() = " + karakter(acik) + "; " + pl(y.length, "item") + " left on the stack."), "Y " + jListe(y));
        var es = { "(": ")", "[": "]", "{": "}" }[acik] === c;
        var sat = { "(": "return (a == '('", "[": "|| (a == '['", "{": "|| (a == '{'" }[acik];
        A(sat, tx("eslesir(" + karakter(acik) + ", " + karakter(c) + "): " + karakter(acik) + " ile " + karakter(c) + (es ? " aynı türden; true döner." : " farklı türden; false döner."),
          "matches(" + karakter(acik) + ", " + karakter(c) + "): " + karakter(acik) + " and " + karakter(c) + (es ? " are the same kind; true is returned." : " are different kinds; false is returned.")));
        if (!es) {
          son(false, tx("eslesir false döndü: " + karakter(acik) + " açılışı " + karakter(c) + " ile kapanamaz; gecerliMi false döner.",
            "matches returned false: " + karakter(acik) + " cannot be closed by " + karakter(c) + "; isBalanced returns false."), "if (!eslesir(acik, c)) return false;");
          return;
        }
        A("if (!eslesir(acik, c)) return false;", tx("Eşleşme doğru; sıradaki karaktere geçilir.", "They match; we move on to the next character."));
      }
      pos = s.length; c = null; acik = null;
      son(!y.length, tx("Bütün karakterler işlendi. Yığın " + (y.length ? y.length + " kapanmamış açılış içeriyor; false döner." : "boş; bütün parantezler eşleşti, true döner."),
        "All characters are processed. The stack " + (y.length ? "still holds " + pl(y.length, "unclosed opener") + "; false is returned." : "is empty; every bracket was matched, so true is returned.")),
        "return yigin.isEmpty();");
    }
  };
  MODELLER.postfix = {
    etiket: ["Girdi (tek haneli sayılar ve + - * / işleçleri)", "Input (single digits and the operators + - * /)"],
    en: { "int postfixDegerlendir": "int evaluatePostfix", "Deque<Integer> yigin": "Deque<Integer> stack", "yigin.push(c - '0')": "stack.push(c - '0')",
      "int sag = yigin.pop()": "int right = stack.pop()", "int sol = yigin.pop()": "int left = stack.pop()", "yigin.push(hesapla": "stack.push(apply",
      "return yigin.pop()": "return stack.pop()" },
    coz: function (t) {
      var s = String(t).replace(/\s+/g, "");
      if (!s.length || s.length > 12) hata(tx("İfade 1 ile 12 arasında karakter içermeli (boşluklar atılır).", "The expression must contain 1 to 12 characters (spaces are ignored)."));
      if (!/^[0-9+\-*/]+$/.test(s)) hata(tx("İfadede yalnız 0–9 rakamları ve + - * / işleçleri olmalı.", "The expression may contain only the digits 0–9 and the operators + - * /."));
      return { s: s };
    },
    calis: function (g, Z) {
      var s = g.s.split(""), y = [], c = null, sag = null, sol = null, pos = null;
      Z.ciktiAd = DD();
      function A(k, msg, iz, ys, ek) {
        var cs = {};
        for (var i = 0; i < s.length; i++) if (pos != null && i < pos) cs[i] = "is-off";
        if (pos != null && pos < s.length) cs[pos] = "is-cmp";
        var yc = {};
        if (ys) yc[ys[0]] = ys[1];
        Z.kaydet(k, msg, vlist({ c: c == null ? null : karakter(c), [tx("sag", "right")]: sag, [tx("sol", "left")]: sol, [tx("yigin.size()", "stack.size()")]: y.length }),
          { satir: [sira(tx("ifade", "expr"), s, { c: pos < s.length ? pos : null }, cs), sira(tx("yigin", "stack"), y, y.length ? { [tx("tepe", "top")]: y.length - 1 } : null, yc, { bos: BOS(), yigin: true })] }, iz, ek);
      }
      A("int postfixDegerlendir", tx("postfixDegerlendir(\"" + g.s + "\") çağrılır; ifade soldan sağa bir kez taranacak.",
        "evaluatePostfix(\"" + g.s + "\") is called; the expression will be scanned once, left to right."));
      A("Deque<Integer> yigin", tx("İşlenenleri tutacak boş bir yığın oluşturulur.", "An empty stack is created to hold the operands."));
      function hataAdimi(k, msg, iz) { Z.cikti = iz.slice(2); A(k, msg, iz, null, { hata: true }); }
      for (pos = 0; pos < s.length; pos++) {
        c = s[pos]; sag = sol = null;
        if (/\d/.test(c)) {
          A("if (Character.isDigit(c))", tx("c = " + karakter(c) + " bir rakam; işlenen olarak yığına girecek.", "c = " + karakter(c) + " is a digit; it goes onto the stack as an operand."));
          y.push(c.charCodeAt(0) - 48);
          A("yigin.push(c - '0')", tx("c − '0' = " + y[y.length - 1] + " yığının tepesine eklendi; boyut " + y.length + ".",
            "c − '0' = " + y[y.length - 1] + " is pushed onto the stack; size " + y.length + "."), "Y " + jListe(y), [y.length - 1, "is-set"]);
          continue;
        }
        A("if (Character.isDigit(c))", tx("c = " + karakter(c) + " bir işleç; iki işlenen yığından alınacak.", "c = " + karakter(c) + " is an operator; two operands will be popped from the stack."));
        if (!y.length) { hataAdimi("int sag = yigin.pop()", tx("Yığın boş: pop() NoSuchElementException fırlatır. İşleç için işlenen yok; ifade geçersiz.",
          "The stack is empty: pop() throws NoSuchElementException. The operator has no operands; the expression is invalid."), "E NoSuchElementException"); return; }
        sag = y.pop();
        A("int sag = yigin.pop()", tx("sag = pop() = " + sag + " (sağ işlenen önce çıkar).", "right = pop() = " + sag + " (the right operand comes off first)."), "Y " + jListe(y));
        if (!y.length) { hataAdimi("int sol = yigin.pop()", tx("Yığın boş: ikinci pop() NoSuchElementException fırlatır. " + karakter(c) + " için tek işlenen var; ifade geçersiz.",
          "The stack is empty: the second pop() throws NoSuchElementException. " + karakter(c) + " has only one operand; the expression is invalid."), "E NoSuchElementException"); return; }
        sol = y.pop();
        A("int sol = yigin.pop()", tx("sol = pop() = " + sol + " (sol işlenen ikinci çıkar).", "left = pop() = " + sol + " (the left operand comes off second)."), "Y " + jListe(y));
        var sat = { "+": "case '+'", "-": "case '-'", "*": "case '*'", "/": "default:" }[c];
        var H = tx("hesapla", "apply");
        if (c === "/" && sag === 0) { hataAdimi(sat, tx("hesapla(" + sol + ", '/', 0): sıfıra bölme; Java ArithmeticException (/ by zero) fırlatır.",
          "apply(" + sol + ", '/', 0): division by zero; Java throws ArithmeticException (/ by zero)."), "E ArithmeticException"); return; }
        var v = c === "+" ? (sol + sag) | 0 : c === "-" ? (sol - sag) | 0 : c === "*" ? Math.imul(sol, sag) : (sol / sag) | 0;
        A(sat, H + "(" + sol + ", " + karakter(c) + ", " + sag + ") = " + sol + " " + c + " " + sag + " = " + v + (c === "/" ? tx(" (tam sayı bölmesi).", " (integer division).") : "."));
        y.push(v);
        A("yigin.push(hesapla", tx("Sonuç " + v + " yığına geri konur; boyut " + y.length + ".", "The result " + v + " is pushed back onto the stack; size " + y.length + "."), "Y " + jListe(y), [y.length - 1, "is-set"]);
      }
      pos = s.length; c = null; sag = sol = null;
      if (!y.length) { hataAdimi("return yigin.pop()", tx("İfade bitti ama yığın boş; pop() NoSuchElementException fırlatır.",
        "The expression is over but the stack is empty; pop() throws NoSuchElementException."), "E NoSuchElementException"); return; }
      var r = y.pop();
      Z.cikti = String(r);
      A("return yigin.pop()", tx("İfade bitti; tepedeki " + r + " döndürülür." + (y.length ? " Yığında " + y.length + " değer daha kaldı: işleç eksik, ifade aslında kusurlu." : ""),
        "The expression is over; the top value " + r + " is returned." + (y.length ? " " + (y.length === 1 ? "1 more value remains" : y.length + " more values remain") +
        " on the stack: an operator is missing, so the expression is actually malformed." : "")), "R " + r);
    }
  };

  /* ---------- Bölüm 9: yığın ve kuyrukla ağaç gezinmeleri ---------- */
  function agacGirdisi(t) {
    var p = String(t).split(/[,;\s]+/).filter(function (x) { return x !== ""; });
    if (!p.length || p.length > 15) hata(tx("Girdi en çok 15 öğe (4 düzey) içermeli.", "The input may contain at most 15 items (4 levels)."));
    if (p[0] === "-") hata(tx("Kök boş olamaz: ilk öğe bir değer olmalı.", "The root cannot be empty: the first item must be a value."));
    var dugum = p.map(function (x, i) {
      if (x === "-") return null;
      if (!/^[A-Za-z0-9ÇĞİÖŞÜçğıöşü]{1,3}$/.test(x)) hata(tx("“" + x + "” uygun değil; değerler en çok 3 harf ya da rakam, boş yer için - olmalı.",
        "“" + x + "” is not valid; a value is at most 3 letters or digits, and - marks an empty slot."));
      return { i: i, v: x };
    });
    dugum.forEach(function (d, i) {
      if (!d || i === 0) return;
      if (!dugum[(i - 1) >> 1]) hata(tx((i + 1) + ". öğe (" + d.v + ") boş bir konumun çocuğu; ebeveyni olmayan düğüm olamaz.",
        "Item " + (i + 1) + " (" + d.v + ") is the child of an empty slot; a node cannot exist without a parent."));
    });
    dugum.forEach(function (d) {
      if (!d) return;
      d.sol = dugum[2 * d.i + 1] || null;
      d.sag = dugum[2 * d.i + 2] || null;
    });
    return { dugum: dugum, kok: dugum[0] };
  }
  /* kap: bekleyen düğümler; kuyrukMu ise ön uç 0. indiste, değilse yığının tepesi son indiste */
  function agacG(g, isaretler, ziyaret, kap, kuyrukMu) {
    var c = {};
    for (var k in ziyaret) c[k] = "is-done";
    kap.forEach(function (d) { c[d.i] = (c[d.i] ? c[d.i] + " " : "") + "is-in"; });
    for (var a in isaretler) if (isaretler[a]) c[isaretler[a].i] = (c[isaretler[a].i] ? c[isaretler[a].i] + " " : "") + "is-cur";
    var etiket = {};
    for (var b in isaretler) if (isaretler[b]) etiket[isaretler[b].i] = etiket[isaretler[b].i] ? etiket[isaretler[b].i] + "," + b : b;
    var dl = g.dugum.map(function (d) { return d ? { i: d.i, v: d.v } : null; }).filter(Boolean);
    var vals = kap.map(function (d) { return d.v; });
    var isr = {};
    if (vals.length) isr[kuyrukMu ? tx("ön", "front") : tx("tepe", "top")] = kuyrukMu ? 0 : vals.length - 1;
    return { agac: { d: dl, c: c, e: etiket }, satir: [sira(kuyrukMu ? tx("kuyruk", "queue") : tx("yigin", "stack"), vals, isr, null, { bos: BOS(), yigin: !kuyrukMu })] };
  }
  function ad(d) { return d ? d.v : "null"; }
  function ust1(y) { return y.slice().reverse().map(ad); }
  var ETK_AGAC = ["Girdi (düzey sırasıyla değerler, boş yer için -)", "Input (values in level order, - for an empty slot)"];
  function dugumSay(n) { return tx(n + " düğüm", pl(n, "node")); }
  MODELLER.kokBastaYigin = {
    etiket: ETK_AGAC,
    en: { "public void kokBastaYigin": "public void preorderIterative", "Deque<AgacDugumu> yigin": "Deque<TreeNode> stack", "yigin.push(kok)": "stack.push(root)",
      "while (!yigin.isEmpty())": "while (!stack.isEmpty())", "AgacDugumu gecici = yigin.pop()": "TreeNode temp = stack.pop()",
      "System.out.print(gecici.veri": "System.out.print(temp.data", "yigin.push(gecici.sag)": "stack.push(temp.right)", "if (gecici.sag != null)": "if (temp.right != null)",
      "yigin.push(gecici.sol)": "stack.push(temp.left)", "if (gecici.sol != null)": "if (temp.left != null)" },
    coz: agacGirdisi,
    calis: function (g, Z) {
      var y = [], gec = null, zz = {}, G = tx("gecici", "temp");
      function A(k, msg, iz) {
        Z.kaydet(k, msg, vlist({ [G]: gec ? gec.v : "—", [tx("yigin.size()", "stack.size()")]: y.length }), agacG(g, { [G]: gec }, zz, y, false), iz);
      }
      A("public void kokBastaYigin", tx("kokBastaYigin, kök " + g.kok.v + " ile çağrılır; kök null değil.", "preorderIterative is called with root " + g.kok.v + "; the root is not null."));
      A("Deque<AgacDugumu> yigin", tx("Bekleyen düğümler için boş bir yığın oluşturulur.", "An empty stack is created for the pending nodes."));
      y.push(g.kok);
      A("yigin.push(kok)", tx("Kök " + g.kok.v + " yığına itildi.", "The root " + g.kok.v + " is pushed onto the stack."));
      for (;;) {
        var iz = "W " + jListe(ust1(y));
        if (!y.length) { gec = null; A("while (!yigin.isEmpty())", tx("Yığın boş; gezinme bitti. Kök önde sıra: ", "The stack is empty; the traversal is over. Preorder: ") + Z.cikti.trim() + ".", iz); return; }
        A("while (!yigin.isEmpty())", tx("Yığında " + y.length + " düğüm var; döngü sürer.", "The stack holds " + pl(y.length, "node") + "; the loop continues."), iz);
        gec = y.pop();
        A("AgacDugumu gecici = yigin.pop()", tx("gecici = pop() = " + gec.v + "; yığında " + y.length + " düğüm kaldı.", "temp = pop() = " + gec.v + "; " + pl(y.length, "node") + " left on the stack."));
        zz[gec.i] = 1; Z.cikti += gec.v + " ";
        A("System.out.print(gecici.veri", gec.v + tx(" yazdırıldı: düğüm, çocuklarından önce ziyaret edilir.", " is printed: a node is visited before its children."), "P " + gec.v);
        if (gec.sag) { y.push(gec.sag); A("yigin.push(gecici.sag)", tx("Sağ çocuk " + gec.sag.v + " yığına itildi (önce sağ itilir, sol tepede kalsın).",
          "The right child " + gec.sag.v + " is pushed (right goes first, so that left ends up on top).")); }
        else A("if (gecici.sag != null)", gec.v + tx(" düğümünün sağ çocuğu yok.", " has no right child."));
        if (gec.sol) { y.push(gec.sol); A("yigin.push(gecici.sol)", tx("Sol çocuk " + gec.sol.v + " yığına itildi; tepe artık " + gec.sol.v + ", sıradaki ziyaret odur.",
          "The left child " + gec.sol.v + " is pushed; " + gec.sol.v + " is now on top and will be visited next.")); }
        else A("if (gecici.sol != null)", gec.v + tx(" düğümünün sol çocuğu yok.", " has no left child."));
      }
    }
  };
  MODELLER.kokOrtadaYigin = {
    etiket: ETK_AGAC,
    en: { "public void kokOrtadaYigin": "public void inorderIterative", "Deque<AgacDugumu> yigin": "Deque<TreeNode> stack", "AgacDugumu gecici = kok": "TreeNode temp = root",
      "while (!yigin.isEmpty() || gecici != null)": "while (!stack.isEmpty() || temp != null)", "if (gecici != null)": "if (temp != null)",
      "yigin.push(gecici)": "stack.push(temp)", "gecici = gecici.sol": "temp = temp.left", "gecici = yigin.pop()": "temp = stack.pop()",
      "System.out.print(gecici.veri": "System.out.print(temp.data", "gecici = gecici.sag": "temp = temp.right" },
    coz: agacGirdisi,
    calis: function (g, Z) {
      var y = [], gec = null, zz = {}, G = tx("gecici", "temp");
      function A(k, msg, iz) {
        Z.kaydet(k, msg, vlist({ [G]: ad(gec), [tx("yigin.size()", "stack.size()")]: y.length }), agacG(g, { [G]: gec }, zz, y, false), iz);
      }
      A("public void kokOrtadaYigin", tx("kokOrtadaYigin, kök " + g.kok.v + " ile çağrılır.", "inorderIterative is called with root " + g.kok.v + "."));
      A("Deque<AgacDugumu> yigin", tx("Boş bir yığın oluşturulur.", "An empty stack is created."));
      gec = g.kok;
      A("AgacDugumu gecici = kok", tx("gecici = kök = " + gec.v + "; önce en soldaki düğüme inilecek.", "temp = root = " + gec.v + "; first we walk down to the leftmost node."));
      for (;;) {
        var iz = "W " + jListe(ust1(y)) + " " + ad(gec);
        if (!y.length && !gec) { A("while (!yigin.isEmpty() || gecici != null)", tx("Yığın boş ve gecici null; gezinme bitti. Kök ortada sıra: ",
          "The stack is empty and temp is null; the traversal is over. Inorder: ") + Z.cikti.trim() + ".", iz); return; }
        A("while (!yigin.isEmpty() || gecici != null)", gec ? tx("gecici = " + gec.v + " null değil; döngü sürer.", "temp = " + gec.v + " is not null; the loop continues.") :
          tx("gecici null ama yığında " + y.length + " düğüm var; döngü sürer.", "temp is null but the stack holds " + pl(y.length, "node") + "; the loop continues."), iz);
        if (gec) {
          A("if (gecici != null)", tx("gecici = " + gec.v + ": sola inilecek.", "temp = " + gec.v + ": walk left."));
          y.push(gec);
          A("yigin.push(gecici)", gec.v + tx(" yığına itildi; sol alt ağacı bitince ziyaret edilecek.", " is pushed; it will be visited once its left subtree is done."));
          gec = gec.sol;
          A("gecici = gecici.sol", gec ? tx("gecici = sol çocuk = ", "temp = left child = ") + gec.v + "." : tx("Sol çocuk yok: gecici = null.", "No left child: temp = null."));
        } else {
          A("if (gecici != null)", tx("gecici null: sol uca ulaşıldı, else dalı.", "temp is null: we reached the left end, so the else branch runs."));
          gec = y.pop();
          A("gecici = yigin.pop()", tx("gecici = pop() = " + gec.v + "; sol alt ağacı tamamlandı.", "temp = pop() = " + gec.v + "; its left subtree is done."));
          zz[gec.i] = 1; Z.cikti += gec.v + " ";
          A("System.out.print(gecici.veri", gec.v + tx(" yazdırıldı (sol alt ağaçtan sonra, sağdan önce).", " is printed (after its left subtree, before its right)."), "P " + gec.v);
          gec = gec.sag;
          A("gecici = gecici.sag", gec ? tx("gecici = sağ çocuk = " + gec.v + "; sağ alt ağaç aynı biçimde gezilecek.", "temp = right child = " + gec.v + "; the right subtree is traversed the same way.") :
            tx("Sağ çocuk yok: gecici = null.", "No right child: temp = null."));
        }
      }
    }
  };
  MODELLER.kokSondaYigin = {
    etiket: ETK_AGAC,
    en: { "AgacDugumu simdiki = kok": "TreeNode current = root", "Deque<AgacDugumu> yigin": "Deque<TreeNode> stack",
      "while (simdiki != null || !yigin.isEmpty())": "while (current != null || !stack.isEmpty())", "if (simdiki != null)": "if (current != null)",
      "yigin.push(simdiki)": "stack.push(current)", "simdiki = simdiki.sol": "current = current.left", "AgacDugumu gecici = yigin.peek().sag": "TreeNode temp = stack.peek().right",
      "if (gecici == null)": "if (temp == null)", "simdiki = gecici": "current = temp", "gecici = yigin.pop()": "temp = stack.pop()",
      "System.out.print(gecici.veri": "System.out.print(temp.data", "while (!yigin.isEmpty()": "while (!stack.isEmpty()" },
    coz: agacGirdisi,
    calis: function (g, Z) {
      var y = [], sim = null, gec = null, zz = {}, gecVar = false, S = tx("simdiki", "current"), G = tx("gecici", "temp");
      function A(k, msg, iz) {
        Z.kaydet(k, msg, vlist({ [S]: ad(sim), [G]: gecVar ? ad(gec) : "—", [tx("yigin.size()", "stack.size()")]: y.length }),
          agacG(g, { [S]: sim, [G]: gecVar ? gec : null }, zz, y, false), iz);
      }
      sim = g.kok;
      A("AgacDugumu simdiki = kok", tx("kokSondaYigin, kök " + g.kok.v + " ile çağrılır; simdiki = " + sim.v + ".", "postorderIterative is called with root " + g.kok.v + "; current = " + sim.v + "."));
      A("Deque<AgacDugumu> yigin", tx("Boş bir yığın oluşturulur.", "An empty stack is created."));
      for (;;) {
        var iz = "W " + jListe(ust1(y)) + " " + ad(sim);
        if (!sim && !y.length) { A("while (simdiki != null || !yigin.isEmpty())", tx("simdiki null ve yığın boş; gezinme bitti. Kök sonda sıra: ",
          "current is null and the stack is empty; the traversal is over. Postorder: ") + Z.cikti.trim() + ".", iz); return; }
        A("while (simdiki != null || !yigin.isEmpty())", sim ? tx("simdiki = " + sim.v + "; döngü sürer.", "current = " + sim.v + "; the loop continues.") :
          tx("simdiki null ama yığında " + y.length + " düğüm var; döngü sürer.", "current is null but the stack holds " + pl(y.length, "node") + "; the loop continues."), iz);
        if (sim) {
          A("if (simdiki != null)", tx("simdiki = " + sim.v + ": sola inilecek.", "current = " + sim.v + ": walk left."));
          y.push(sim);
          A("yigin.push(simdiki)", sim.v + tx(" yığına itildi; iki alt ağacı bitince yazdırılacak.", " is pushed; it will be printed once both of its subtrees are done."));
          sim = sim.sol;
          A("simdiki = simdiki.sol", sim ? tx("simdiki = sol çocuk = ", "current = left child = ") + sim.v + "." : tx("Sol çocuk yok: simdiki = null.", "No left child: current = null."));
          continue;
        }
        A("if (simdiki != null)", tx("simdiki null; else dalı.", "current is null; the else branch runs."));
        var tepe = y[y.length - 1];
        gec = tepe.sag; gecVar = true;
        A("AgacDugumu gecici = yigin.peek().sag", tx("Tepedeki " + tepe.v + " düğümünün sağ çocuğuna bakılır: gecici = " + ad(gec) + ".",
          "Look at the right child of " + tepe.v + ", the node on top: temp = " + ad(gec) + "."));
        if (gec) {
          A("if (gecici == null)", tx("gecici null değil: sağ alt ağaç henüz gezilmedi.", "temp is not null: the right subtree has not been traversed yet."));
          sim = gec;
          A("simdiki = gecici", tx("simdiki = " + sim.v + "; sağ alt ağaca inilecek.", "current = " + sim.v + "; walk down into the right subtree."));
          continue;
        }
        A("if (gecici == null)", tx("Sağ çocuk yok: tepedeki düğümün iki alt ağacı da bitti.", "No right child: both subtrees of the node on top are done."));
        gec = y.pop();
        A(["gecici = yigin.pop()", 1], tx("gecici = pop() = ", "temp = pop() = ") + gec.v + ".");
        zz[gec.i] = 1; Z.cikti += gec.v + " ";
        A(["System.out.print(gecici.veri", 1], gec.v + tx(" yazdırıldı (çocuklarından sonra).", " is printed (after its children)."), "P " + gec.v);
        for (;;) {
          var devam = y.length && gec === y[y.length - 1].sag;
          A("while (!yigin.isEmpty()", !y.length ? tx("Yığın boş; iç döngü biter.", "The stack is empty; the inner loop ends.") :
            devam ? tx(gec.v + ", tepedeki " + y[y.length - 1].v + " düğümünün sağ çocuğu: o düğümün de iki alt ağacı bitti.",
              gec.v + " is the right child of " + y[y.length - 1].v + " on top: both subtrees of that node are done too.") :
              tx(gec.v + ", tepedeki " + y[y.length - 1].v + " düğümünün sağ çocuğu değil; iç döngü biter.",
                gec.v + " is not the right child of " + y[y.length - 1].v + " on top; the inner loop ends."));
          if (!devam) break;
          gec = y.pop();
          A(["gecici = yigin.pop()", 2], tx("gecici = pop() = ", "temp = pop() = ") + gec.v + ".");
          zz[gec.i] = 1; Z.cikti += gec.v + " ";
          A(["System.out.print(gecici.veri", 2], gec.v + tx(" yazdırıldı.", " is printed."), "P " + gec.v);
        }
      }
    }
  };
  MODELLER.seviyeSirasi = {
    etiket: ETK_AGAC,
    en: { "public void seviyeSirasi": "public void levelOrder", "Queue<AgacDugumu> kuyruk": "Queue<TreeNode> queue", "kuyruk.add(kok)": "queue.add(root)",
      "while (!kuyruk.isEmpty())": "while (!queue.isEmpty())", "AgacDugumu gecici = kuyruk.poll()": "TreeNode temp = queue.poll()",
      "System.out.print(gecici.veri": "System.out.print(temp.data", "kuyruk.add(gecici.sol)": "queue.add(temp.left)", "if (gecici.sol != null)": "if (temp.left != null)",
      "kuyruk.add(gecici.sag)": "queue.add(temp.right)", "if (gecici.sag != null)": "if (temp.right != null)" },
    coz: agacGirdisi,
    calis: function (g, Z) {
      var q = [], gec = null, zz = {}, G = tx("gecici", "temp");
      function A(k, msg, iz) {
        Z.kaydet(k, msg, vlist({ [G]: gec ? gec.v : "—", [tx("kuyruk.size()", "queue.size()")]: q.length }), agacG(g, { [G]: gec }, zz, q, true), iz);
      }
      A("public void seviyeSirasi", tx("seviyeSirasi, kök " + g.kok.v + " ile çağrılır; kök null değil.", "levelOrder is called with root " + g.kok.v + "; the root is not null."));
      A("Queue<AgacDugumu> kuyruk", tx("Boş bir kuyruk oluşturulur (FIFO).", "An empty queue is created (FIFO)."));
      q.push(g.kok);
      A("kuyruk.add(kok)", tx("Kök " + g.kok.v + " kuyruğun sonuna eklendi.", "The root " + g.kok.v + " is added at the back of the queue."));
      for (;;) {
        var iz = "W " + jListe(q.map(ad));
        if (!q.length) { gec = null; A("while (!kuyruk.isEmpty())", tx("Kuyruk boş; gezinme bitti. Düzey sırası: ", "The queue is empty; the traversal is over. Level order: ") + Z.cikti.trim() + ".", iz); return; }
        A("while (!kuyruk.isEmpty())", tx("Kuyrukta " + q.length + " düğüm var; döngü sürer.", "The queue holds " + pl(q.length, "node") + "; the loop continues."), iz);
        gec = q.shift();
        A("AgacDugumu gecici = kuyruk.poll()", tx("gecici = poll() = " + gec.v + " (kuyruğun önündeki düğüm).", "temp = poll() = " + gec.v + " (the node at the front of the queue)."));
        zz[gec.i] = 1; Z.cikti += gec.v + " ";
        A("System.out.print(gecici.veri", gec.v + tx(" yazdırıldı.", " is printed."), "P " + gec.v);
        if (gec.sol) { q.push(gec.sol); A("kuyruk.add(gecici.sol)", tx("Sol çocuk " + gec.sol.v + " kuyruğun sonuna eklendi.", "The left child " + gec.sol.v + " is added at the back of the queue.")); }
        else A("if (gecici.sol != null)", gec.v + tx(" düğümünün sol çocuğu yok.", " has no left child."));
        if (gec.sag) { q.push(gec.sag); A("kuyruk.add(gecici.sag)", tx("Sağ çocuk " + gec.sag.v + " kuyruğun sonuna eklendi; bir düzeyin düğümleri sırayla kuyrukta bekler.",
          "The right child " + gec.sag.v + " is added at the back of the queue; the nodes of each level wait in the queue in order.")); }
        else A("if (gecici.sag != null)", gec.v + tx(" düğümünün sağ çocuğu yok.", " has no right child."));
      }
    }
  };

  /* ---------- Bölüm 13: sıralı birleşim/kesişim, bit vektörü ---------- */
  MODELLER.birlesimKesisim = {
    etiket: ["Girdi (sıralı a | sıralı b)", "Input (sorted a | sorted b)"],
    en: { "void birlesimKesisim": "void unionIntersection", "bir.add(a[i]);  kes.add(a[i])": "union.add(a[i]);  inter.add(a[i])",
      "while (i < a.length) bir.add": "while (i < a.length) union.add", "while (j < b.length) bir.add": "while (j < b.length) union.add" },
    coz: function (t) {
      var p = ikiParca(t, tx("sıralı a | sıralı b", "sorted a | sorted b")), not = false;
      function k(x) {
        var d = sayilar(x, 0, 8, -99, 999), s = d.slice().sort(function (u, v) { return u - v; }).filter(function (v, i, a) { return !i || v !== a[i - 1]; });
        if (s.join() !== d.join()) not = true;
        return s;
      }
      var a = k(p[0]), b = k(p[1]);
      if (!a.length && !b.length) hata(tx("Kümelerden en az biri boş olmamalı.", "At least one of the sets must be non-empty."));
      return { a: a, b: b, duzeltildi: not };
    },
    calis: function (g, Z) {
      var a = g.a, b = g.b, i = null, j = null, bir = [], kes = [];
      Z.ciktiAd = tx("Sonuç", "Result");
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
          { satir: [sira("a", a, { i: i }, c1, { bos: BOS() }), sira("b", b, { j: j }, c2, { bos: BOS() }), sira(tx("bir", "union"), bir, null, x, { bos: BOS() }), sira(tx("kes", "inter"), kes, null, y, { bos: BOS() })] }, iz);
      }
      A("void birlesimKesisim", tx("a = " + liste(a) + " ve b = " + liste(b) + " sıralı dizileriyle çağrılır." +
        (g.duzeltildi ? " Girdi sıralı ve tekrarsız olmadığından kümeler sıralanıp tekrarlar atılarak kullanılır." : ""),
        "Called with the sorted arrays a = " + liste(a) + " and b = " + liste(b) + "." +
        (g.duzeltildi ? " The input was not sorted and duplicate-free, so the sets are sorted and duplicates removed." : "")));
      i = 0; j = 0;
      A("int i = 0, j = 0", tx("İki imleç dizilerin başında: i = 0, j = 0.", "Both cursors start at the front: i = 0, j = 0."));
      for (;;) {
        if (!(i < a.length && j < b.length)) {
          A("while (i < a.length && j < b.length)", (i >= a.length ? "i = a.length" : "j = b.length") + tx(": dizilerden biri bitti, ana döngüden çıkılır. Artık ortak öğe olamaz; kesişim tamam.",
            ": one array is used up, so the main loop ends. No common items can follow; the intersection is complete."));
          break;
        }
        A("while (i < a.length && j < b.length)", tx("İki dizide de öğe var; a[" + i + "] = " + a[i] + " ile b[" + j + "] = " + b[j] + " karşılaştırılacak.",
          "Both arrays still have items; a[" + i + "] = " + a[i] + " will be compared with b[" + j + "] = " + b[j] + "."), null, i, j);
        if (a[i] < b[j]) {
          bir.push(a[i]);
          A("if (a[i] < b[j])", tx("a[" + i + "] = " + a[i] + " < b[" + j + "] = " + b[j] + ": " + a[i] + " yalnız a'da; birleşime eklenir, i ilerler.",
            "a[" + i + "] = " + a[i] + " < b[" + j + "] = " + b[j] + ": " + a[i] + " is only in a; it goes into the union and i advances."), null, i, null, true);
          i++;
        } else if (a[i] > b[j]) {
          bir.push(b[j]);
          A("else if (a[i] > b[j])", tx("a[" + i + "] = " + a[i] + " > b[" + j + "] = " + b[j] + ": " + b[j] + " yalnız b'de; birleşime eklenir, j ilerler.",
            "a[" + i + "] = " + a[i] + " > b[" + j + "] = " + b[j] + ": " + b[j] + " is only in b; it goes into the union and j advances."), null, null, j, true);
          j++;
        } else {
          A("else {", tx("a[" + i + "] = b[" + j + "] = " + a[i] + ": ortak öğe.", "a[" + i + "] = b[" + j + "] = " + a[i] + ": an item in both."), null, i, j);
          bir.push(a[i]); kes.push(a[i]);
          A("bir.add(a[i]);  kes.add(a[i])", a[i] + tx(" hem birleşime hem kesişime eklenir.", " goes into both the union and the intersection."), null, i, j, true, true);
          i++; j++;
          A("i++;  j++;", tx("İki imleç birlikte ilerler: i = " + i + ", j = " + j + ".", "Both cursors advance: i = " + i + ", j = " + j + "."));
        }
      }
      while (i < a.length) {
        bir.push(a[i]);
        A("while (i < a.length) bir.add", tx("a dizisinde kalan a[" + i + "] = " + a[i] + " doğrudan birleşime eklenir.", "The leftover a[" + i + "] = " + a[i] + " goes straight into the union."), null, i, null, true);
        i++;
      }
      if (i === a.length) A("while (i < a.length) bir.add", tx("a dizisinde kalan öğe yok.", "No items are left in a."));
      while (j < b.length) {
        bir.push(b[j]);
        A("while (j < b.length) bir.add", tx("b dizisinde kalan b[" + j + "] = " + b[j] + " doğrudan birleşime eklenir.", "The leftover b[" + j + "] = " + b[j] + " goes straight into the union."), null, null, j, true);
        j++;
      }
      Z.cikti = tx("bir = ", "union = ") + jListe(bir) + tx(", kes = ", ", inter = ") + jListe(kes);
      A("while (j < b.length) bir.add", tx("Birleşim " + jListe(bir) + ", kesişim " + jListe(kes) + ". Her adımda en az bir imleç ilerlediği için en çok n + m adım: O(n + m).",
        "Union " + jListe(bir) + ", intersection " + jListe(kes) + ". Every step advances at least one cursor, so there are at most n + m steps: O(n + m)."),
        "B " + jListe(bir) + " K " + jListe(kes));
    }
  };
  function ikili(v) { var s = (v >>> 0).toString(2); while (s.length < 8) s = "0" + s; return s.slice(-8); }
  function bitler(v) { return ikili(v).split(""); }
  function kumeOf(v) { var r = []; for (var b = 0; b < 32; b++) if ((v >>> b) & 1) r.push(b); return "{" + r.join(", ") + "}"; }
  MODELLER.bitVektor = {
    etiket: ["Girdi (A öğeleri | B öğeleri, 0–7)", "Input (items of A | items of B, 0–7)"],
    en: { "int bir = a | b": "int union = a | b", "int kes = a & b": "int inter = a & b", "int fark = a & ~b": "int diff = a & ~b", "boolean var3": "boolean has3" },
    coz: function (t) {
      var p = ikiParca(t, tx("A öğeleri | B öğeleri", "items of A | items of B"));
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
      Z.ciktiAd = tx("Sonuç", "Result");
      function A(k, msg, iz, deg) {
        var rows = [], bas = ["7", "6", "5", "4", "3", "2", "1", "0"];
        function r(adi, v, lbl) {
          if (v == null) return;
          var c = {};
          if (deg === adi) bitler(v).forEach(function (bit, q) { if (bit === "1") c[q] = "is-set"; });
          rows.push(sira(lbl || adi, bitler(v), null, c, { bas: rows.length ? null : bas }));
        }
        r("a", a); r("b", b); r("bir", bir, tx("bir", "union")); r("kes", kes, tx("kes", "inter")); r("fark", fark, tx("fark", "diff"));
        Z.kaydet(k, msg, vlist({ x: x, a: a == null ? null : a + " (" + ikili(a) + ")", b: b == null ? null : b + " (" + ikili(b) + ")", [tx("var3", "has3")]: var3 }), { satir: rows }, iz);
      }
      a = 0; b = 0;
      A("int a = 0, b = 0", tx("İki küme boş başlar: a = 0, b = 0 (bütün bitler 0). Bit k = 1 ise k kümededir.", "Both sets start empty: a = 0, b = 0 (all bits 0). Bit k = 1 means k is in the set."));
      g.A.forEach(function (v) {
        x = v;
        var once = a; a |= 1 << x;
        A("a |= 1 << x", "x = " + x + ": 1 << " + x + " = " + (1 << x) + " (" + ikili(1 << x) + "); a = " + once + " | " + (1 << x) + " = " + a + "." +
          (once === a ? tx(" Bit zaten 1'di; küme değişmez.", " The bit was already 1; the set is unchanged.") : ""), null, "a");
      });
      g.B.forEach(function (v) {
        x = v;
        var once = b; b |= 1 << x;
        A("b |= 1 << x", "x = " + x + ": b = " + once + " | " + (1 << x) + " = " + b + "." + (once === b ? tx(" Bit zaten 1'di.", " The bit was already 1.") : ""), null, "b");
      });
      x = null;
      bir = a | b;
      A("int bir = a | b", tx("Birleşim: a | b = " + bir + " → " + kumeOf(bir) + "; iki kümeden birinde olan her bit 1.", "Union: a | b = " + bir + " → " + kumeOf(bir) + "; every bit that is in either set is 1."), null, "bir");
      kes = a & b;
      A("int kes = a & b", tx("Kesişim: a & b = " + kes + " → " + kumeOf(kes) + "; iki kümede de olan bitler 1.", "Intersection: a & b = " + kes + " → " + kumeOf(kes) + "; the bits that are in both sets are 1."), null, "kes");
      fark = a & ~b;
      A("int fark = a & ~b", tx("Fark: a & ~b = " + fark + " → " + kumeOf(fark) + "; a'da olup b'de olmayan bitler 1.", "Difference: a & ~b = " + fark + " → " + kumeOf(fark) + "; the bits that are in a but not in b are 1."), null, "fark");
      var3 = ((a >> 3) & 1) === 1;
      Z.cikti = tx("bir = ", "union = ") + kumeOf(bir) + tx(", kes = ", ", inter = ") + kumeOf(kes) + tx(", fark = ", ", diff = ") + kumeOf(fark) + tx(", var3 = ", ", has3 = ") + var3;
      A("boolean var3", tx("Üyelik: (a >> 3 & 1) = " + ((a >> 3) & 1) + "; var3 = " + var3 + " (3, a kümesinde " + (var3 ? "var" : "yok") + "). Her işlem O(1).",
        "Membership: (a >> 3 & 1) = " + ((a >> 3) & 1) + "; has3 = " + var3 + " (3 is " + (var3 ? "in" : "not in") + " set a). Each operation is O(1)."),
        "S " + a + " " + b + " " + bir + " " + kes + " " + fark + " " + var3);
    }
  };

  /* ---------- Bölüm 14: Kruskal ve Prim ---------- */
  var HARF = "ABCDEFGHIJ";
  function cizgeGirdisi(t) {
    var p = String(t).split(/[,;]+/).map(function (x) { return x.trim(); }).filter(Boolean), maks = 0, E = [];
    if (!p.length || p.length > 20) hata(tx("Girdi 1 ile 20 arasında kenar içermeli.", "The input must contain 1 to 20 edges."));
    p.forEach(function (x) {
      var m = /^([A-Ja-j])\s*[-–]\s*([A-Ja-j])\s*[:=]\s*(\d{1,2})$/.exec(x);
      if (!m) hata(tx("“" + x + "” anlaşılamadı; kenarlar A-B:4 biçiminde, düğümler A–J, ağırlıklar 0–99 olmalı.",
        "“" + x + "” could not be read; write edges as A-B:4, with vertices A–J and weights 0–99."));
      var u = HARF.indexOf(m[1].toUpperCase()), v = HARF.indexOf(m[2].toUpperCase());
      if (u === v) hata(tx(m[1].toUpperCase() + " düğümünde kendine dönen kenar olamaz.", "A self-loop at vertex " + m[1].toUpperCase() + " is not allowed."));
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
  function kenarSay(n) { return tx(n + " kenar", pl(n, "edge")); }
  /* uzun kenar listesinde bas'tan başlayan en çok 11 öğe; öncesi ve sonrası birer özet etiketiyle */
  function pencere(l, bas, onceAd) {
    var r = l.slice(bas, bas + 11);
    if (bas > 0) r.unshift({ t: kenarSay(bas) + " " + onceAd, c: "is-ozet" });
    if (l.length > bas + 11) r.push({ t: "+" + kenarSay(l.length - bas - 11), c: "is-ozet" });
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
    etiket: ["Girdi (kenarlar: A-B:4, …)", "Input (edges: A-B:4, …)"],
    coz: cizgeGirdisi,
    calis: function (g, Z) {
      var n = g.n, E = g.E.map(function (e, i) { return [e[0], e[1], e[2], i]; }), par = null, rank = null, T = [], top = 0, durum = {}, cur = null;
      Z.ciktiAd = DD();
      function A(k, msg, iz, degisen) {
        var ken = {}, dug = {};
        for (var i in durum) ken[i] = durum[i];
        if (cur != null) { ken[cur[3]] = (ken[cur[3]] ? ken[cur[3]] + " " : "") + "is-cur"; dug[cur[0]] = dug[cur[1]] = "is-cur"; }
        var cip = sirali ? pencere(sirali.map(function (e) { return { t: kAd(e) + " " + e[2], c: (durum[e[3]] || "") + (cur && cur[3] === e[3] ? " is-cur" : "") }; }), islenen, tx("işlendi", "processed")) : [];
        var eb = null;
        if (par) {
          eb = par.map(function (x, v) { return x === v ? null : HARF[v] + "→" + HARF[x]; }).filter(Boolean).join(" ") || tx("hepsi kök", "all roots");
          (degisen || []).forEach(function (x) { dug[x] = (dug[x] ? dug[x] + " " : "") + "is-in"; });
        }
        Z.kaydet(k, msg, vlist({ e: cur ? "{" + HARF[cur[0]] + ", " + HARF[cur[1]] + ", " + cur[2] + "}" : null, "T.size()": T.length, [tx("ağırlık", "weight")]: top, [tx("ebeveyn", "parent")]: eb }),
          { cizge: cizgeG(g, ken, dug), cip: { ad: tx("E sıralı", "E sorted"), d: cip } }, iz);
      }
      var sirali = null, islenen = 0;
      A("List<int[]> kruskal", tx("kruskal(n = " + n + ", E) çağrılır; çizgede " + n + " düğüm ve " + E.length + " kenar var.",
        "kruskal(n = " + n + ", E) is called; the graph has " + pl(n, "vertex", "vertices") + " and " + pl(E.length, "edge") + "."));
      sirali = E.slice().sort(function (a, b) { return a[2] - b[2]; });
      A("E.sort(", tx("Kenarlar ağırlığa göre sıralanır; sıralama kararlı olduğundan eşit ağırlıklılar girdi sırasını korur. O(m log m).",
        "The edges are sorted by weight; the sort is stable, so edges of equal weight keep their input order. O(m log m)."),
        "S " + sirali.map(function (e) { return kAd(e) + e[2]; }).join(" "));
      par = []; rank = [];
      for (var i = 0; i < n; i++) { par.push(i); rank.push(0); }
      A("UnionFind uf = new UnionFind(n)", tx("new UnionFind(" + n + "): her düğüm kendi kümesinin kökü (ebeveyn[v] = v); hiçbir kenar seçilmedi.",
        "new UnionFind(" + n + "): every vertex is the root of its own set (parent[v] = v); no edge is chosen yet."));
      A("List<int[]> T = new ArrayList", tx("T, seçilen kenarların boş listesi.", "T is the empty list of chosen edges."));
      function find(x, yol) {
        if (par[x] !== x) { var r = find(par[x], yol); if (par[x] !== r) { par[x] = r; yol.push(x); } }
        return par[x];
      }
      for (var q = 0; q < sirali.length; q++) {
        var e = sirali[q];
        cur = e; islenen = q;
        A("for (int[] e : E)", tx("Sıradaki en hafif kenar " + kAd(e) + " (" + e[2] + ").", "The next lightest edge is " + kAd(e) + " (" + e[2] + ")."));
        var yol = [], kx = find(e[0], yol), ky = find(e[1], yol), not = "", deg = yol.slice();
        if (yol.length) not = tx(" Yol kısaltma: " + yol.map(function (x) { return HARF[x]; }).join(", ") + " artık doğrudan köke bağlı.",
          " Path compression: " + yol.map(function (x) { return HARF[x]; }).join(", ") + " now " + (yol.length === 1 ? "points" : "point") + " directly to the root.");
        if (kx === ky) {
          durum[e[3]] = "is-ret";
          A("if (uf.union(e[0], e[1]))", tx("find(" + HARF[e[0]] + ") = find(" + HARF[e[1]] + ") = " + HARF[kx] + ": iki uç aynı kümede; kenar döngü kurar, union false döner.",
            "find(" + HARF[e[0]] + ") = find(" + HARF[e[1]] + ") = " + HARF[kx] + ": both ends are in the same set; the edge would close a cycle, so union returns false.") + not,
            "X " + kAd(e) + e[2], deg);
        } else {
          var aciklama;
          if (rank[kx] < rank[ky]) { par[kx] = ky; deg.push(kx); aciklama = tx("sira[" + HARF[kx] + "] < sira[" + HARF[ky] + "] olduğundan ebeveyn[" + HARF[kx] + "] = " + HARF[ky],
            "rank[" + HARF[kx] + "] < rank[" + HARF[ky] + "], so parent[" + HARF[kx] + "] = " + HARF[ky]); }
          else if (rank[kx] > rank[ky]) { par[ky] = kx; deg.push(ky); aciklama = tx("sira[" + HARF[kx] + "] > sira[" + HARF[ky] + "] olduğundan ebeveyn[" + HARF[ky] + "] = " + HARF[kx],
            "rank[" + HARF[kx] + "] > rank[" + HARF[ky] + "], so parent[" + HARF[ky] + "] = " + HARF[kx]); }
          else { par[kx] = ky; rank[ky]++; deg.push(kx); aciklama = tx("rütbeler eşit; ebeveyn[" + HARF[kx] + "] = " + HARF[ky] + " ve sira[" + HARF[ky] + "] = " + rank[ky],
            "the ranks are equal; parent[" + HARF[kx] + "] = " + HARF[ky] + " and rank[" + HARF[ky] + "] = " + rank[ky]); }
          A("if (uf.union(e[0], e[1]))", tx("find(" + HARF[e[0]] + ") = " + HARF[kx] + ", find(" + HARF[e[1]] + ") = " + HARF[ky] + ": kökler farklı, union true döner; ",
            "find(" + HARF[e[0]] + ") = " + HARF[kx] + ", find(" + HARF[e[1]] + ") = " + HARF[ky] + ": different roots, so union returns true; ") + aciklama + "." + not,
            null, deg);
          T.push(e); top += e[2]; durum[e[3]] = "is-tree";
          A("T.add(e)", tx(kAd(e) + " (" + e[2] + ") ağaca eklendi: |T| = " + T.length + ", toplam ağırlık " + top + ".",
            kAd(e) + " (" + e[2] + ") joins the tree: |T| = " + T.length + ", total weight " + top + "."), "A " + kAd(e) + e[2]);
        }
        if (T.length === n - 1) {
          A("if (T.size() == n - 1) break", tx("|T| = " + T.length + " = n − 1: kapsayan ağaç tamamlandı, kalan kenarlara bakılmaz.",
            "|T| = " + T.length + " = n − 1: the spanning tree is complete, so the remaining edges are skipped."));
          break;
        }
        A("if (T.size() == n - 1) break", tx("|T| = " + T.length + " < n − 1 = " + (n - 1) + "; döngü sürer.", "|T| = " + T.length + " < n − 1 = " + (n - 1) + "; the loop continues."));
      }
      cur = null;
      Z.cikti = "T = [" + T.map(function (e) { return kAd(e) + " " + e[2]; }).join(", ") + "], " + tx("ağırlık ", "weight ") + top;
      A("return T", T.length === n - 1 ? tx("T döndürülür: " + T.length + " kenar, toplam ağırlık " + top + " (minimum kapsayan ağaç).",
        "T is returned: " + pl(T.length, "edge") + ", total weight " + top + " (a minimum spanning tree).") :
        tx("Bütün kenarlar denendi ama |T| = " + T.length + " < n − 1: çizge bağlantılı değil, T bir minimum kapsayan ormandır (ağırlık " + top + ").",
          "Every edge was tried but |T| = " + T.length + " < n − 1: the graph is not connected, so T is a minimum spanning forest (weight " + top + ")."), "T " + top);
    }
  };
  MODELLER.prim = {
    etiket: ["Girdi (kenarlar: A-B:4, …; başlangıç A)", "Input (edges: A-B:4, …; start A)"],
    en: { "boolean[] agacta": "boolean[] inTree", "agacta[s] = true": "inTree[s] = true", "if (agacta[e[1]]) continue": "if (inTree[e[1]]) continue", "agacta[e[1]] = true": "inTree[e[1]] = true" },
    coz: cizgeGirdisi,
    calis: function (g, Z) {
      var n = g.n, adj = [], agacta = [], T = [], top = 0, pq = null, cur = null, durum = {}, ek = [];
      for (var i = 0; i < n; i++) { adj.push([]); agacta.push(false); }
      g.E.forEach(function (e, k) { adj[e[0]].push([e[1], e[2], k]); adj[e[1]].push([e[0], e[2], k]); });
      Z.ciktiAd = DD();
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
        Z.kaydet(k, msg, vlist({ e: cur ? "{" + HARF[cur[0]] + ", " + HARF[cur[1]] + ", " + cur[2] + "}" : null, "T.size()": T.length, [tx("ağırlık", "weight")]: top }),
          { cizge: cizgeG(g, ken, dug), cip: { ad: "pq", d: cip, bos: BOS() } }, iz);
      }
      A("List<int[]> prim", tx("prim(adj, s = A) çağrılır; n = adj.size() = " + n + ".", "prim(adj, s = A) is called; n = adj.size() = " + n + "."));
      A("boolean[] agacta", tx("agacta dizisi: başlangıçta hiçbir düğüm ağaçta değil.", "The inTree array: at first no vertex is in the tree."));
      pq = new JPQ(cmp);
      A("PriorityQueue<int[]> pq", tx("Kenarları ağırlığa göre veren boş bir öncelikli kuyruk (min-heap) oluşturulur.", "An empty priority queue (a min-heap) is created that hands out edges by weight."));
      A("List<int[]> T = new ArrayList", tx("T, seçilen kenarların boş listesi.", "T is the empty list of chosen edges."));
      agacta[0] = true;
      A("agacta[s] = true", tx("A düğümü ağaca girer.", "Vertex A joins the tree."));
      adj[0].forEach(function (f) { pq.add([0, f[0], f[1], f[2]]); });
      var aKen = adj[0].map(function (f) { return "A–" + HARF[f[0]] + " " + f[1]; }).join(", ");
      A("for (int[] e : adj.get(s))", adj[0].length ? tx("A düğümünün kenarları kuyruğa eklenir: " + aKen + ".", "A's edges are added to the queue: " + aKen + ".") :
        tx("A düğümünün kenarı yok; kuyruk boş kalır.", "A has no edges; the queue stays empty."));
      for (;;) {
        if (!pq.q.length || T.length >= n - 1) {
          cur = null;
          A("while (!pq.isEmpty() && T.size() < n - 1)", T.length >= n - 1 ? tx("|T| = n − 1 = " + (n - 1) + ": bütün düğümler ağaçta, döngü biter.",
            "|T| = n − 1 = " + (n - 1) + ": every vertex is in the tree, so the loop ends.") :
            tx("Kuyruk boş ama |T| = " + T.length + " < n − 1: A düğümünün bileşeni bitti, çizge bağlantılı değil.",
              "The queue is empty but |T| = " + T.length + " < n − 1: A's component is finished; the graph is not connected."));
          break;
        }
        cur = null;
        A("while (!pq.isEmpty() && T.size() < n - 1)", tx("Kuyrukta " + pq.q.length + " aday var ve |T| = " + T.length + " < " + (n - 1) + "; döngü sürer.",
          "The queue holds " + pl(pq.q.length, "candidate") + " and |T| = " + T.length + " < " + (n - 1) + "; the loop continues."));
        cur = pq.poll();
        A("int[] e = pq.poll()", tx("En hafif aday " + kAd(cur) + " (" + cur[2] + ") kuyruktan alınır.", "The lightest candidate, " + kAd(cur) + " (" + cur[2] + "), is taken from the queue."));
        if (agacta[cur[1]]) {
          durum[cur[3]] = durum[cur[3]] === "is-tree" ? "is-tree" : "is-ret";
          A("if (agacta[e[1]]) continue", tx(HARF[cur[1]] + " zaten ağaçta: bu kayıt bayat, kenar döngü kurar; atlanır.",
            HARF[cur[1]] + " is already in the tree: this entry is stale and the edge would close a cycle, so it is skipped."), "X " + kAd(cur) + cur[2]);
          continue;
        }
        A("if (agacta[e[1]]) continue", tx(HARF[cur[1]] + " ağaçta değil: kenar ağacı dışarıya bağlayan en hafif kenar.", HARF[cur[1]] + " is not in the tree: this is the lightest edge leaving the tree."));
        agacta[cur[1]] = true;
        A("agacta[e[1]] = true", tx(HARF[cur[1]] + " düğümü ağaca girer.", "Vertex " + HARF[cur[1]] + " joins the tree."));
        T.push(cur); top += cur[2]; durum[cur[3]] = "is-tree";
        A("T.add(e)", tx(kAd(cur) + " (" + cur[2] + ") T listesine eklendi: |T| = " + T.length + ", toplam ağırlık " + top + ".",
          kAd(cur) + " (" + cur[2] + ") is added to T: |T| = " + T.length + ", total weight " + top + "."), "A " + kAd(cur) + cur[2]);
        ek = [];
        var v = cur[1];
        adj[v].forEach(function (f) { if (!agacta[f[0]]) { pq.add([v, f[0], f[1], f[2]]); ek.push(HARF[v] + "–" + HARF[f[0]] + " " + f[1]); } });
        A("for (int[] f : adj.get(e[1]))", ek.length ? tx(HARF[v] + " düğümünün ağaç dışındaki komşuları kuyruğa eklenir: " + ek.join(", ") + ".",
          "The edges from " + HARF[v] + " to vertices outside the tree are added to the queue: " + ek.join(", ") + ".") :
          tx(HARF[v] + " düğümünün ağaç dışında komşusu yok; kuyruğa yeni aday eklenmez.", HARF[v] + " has no neighbors outside the tree; no new candidates are added."));
      }
      cur = null;
      Z.cikti = "T = [" + T.map(function (e) { return kAd(e) + " " + e[2]; }).join(", ") + "], " + tx("ağırlık ", "weight ") + top;
      A("return T", tx("T döndürülür: " + T.length + " kenar, toplam ağırlık " + top + (T.length === n - 1 ? " (minimum kapsayan ağaç)." : "; çizge bağlantılı olmadığından yalnız A düğümünün bileşeni kapsandı."),
        "T is returned: " + pl(T.length, "edge") + ", total weight " + top + (T.length === n - 1 ? " (a minimum spanning tree)." : "; the graph is not connected, so only A's component is spanned.")), "T " + top);
    }
  };

  /* girdi metni + kod satırları → adımlar; dil "en" ise İngilizce kip */
  function calistir(algo, kodMetni, girdi, konumMetni, dil) {
    var M = MODELLER[algo];
    if (!M) throw new Error("Bilinmeyen algoritma: " + algo);
    var onceki = EN;
    EN = /^en/i.test(String(dil || ""));
    try {
      var satirlar = kodMetni.replace(/^\n/, "").replace(/\s+$/, "").split("\n");
      var etiket = tx(M.etiket[0], M.etiket[1]);
      var g;
      try { g = M.coz(girdi); } catch (e) { if (e instanceof LabHata) return { satirlar: satirlar, hata: e.msg, adimlar: [], etiket: etiket }; throw e; }
      if (g.n != null && g.E) g.konum = konumlar(g.n, konumMetni);
      if (M.kod) satirlar = M.kod(satirlar, g);
      var Z = new Izci(satirlar, M.en);
      M.calis(g, Z);
      return { satirlar: satirlar, adimlar: Z.adimlar, etiket: etiket };
    } finally { EN = onceki; }
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
  function agacSvg(a, ing) {
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
    return '<svg class="ds-svg lab-svg" viewBox="-6 0 ' + (W + 12) + " " + H + '" role="img" aria-label="' + (ing ? "Binary tree" : "İkili ağaç") + '">' + p.join("") + "</svg>";
  }
  function cizgeSvg(z, ing) {
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
    return '<svg class="ds-svg lab-svg is-cizge" viewBox="' + x0 + " " + y0 + " " + (x1 - x0) + " " + (y1 - y0) + '" role="img" aria-label="' + (ing ? "Weighted graph" : "Ağırlıklı çizge") + '">' + p.join("") + "</svg>";
  }
  function satirHtml(r, ing) {
    var isaretli = r.son || r.p.some(Boolean), harf = 0;
    r.d.forEach(function (v) { harf += Math.max(2, String(v).length) + 1; });
    var sik = r.d.length > 10 || harf > 30;
    var h = '<div class="lab-row' + (r.yigin ? " is-yigin" : "") + (isaretli ? "" : " is-sade") + (sik ? " is-sik" : "") + '"><b>' + esc(r.ad) + '</b><div class="lab-cells">';
    if (!r.d.length) h += '<span class="lab-bos">' + esc(r.bos || (ing ? "empty" : "boş")) + "</span>";
    r.d.forEach(function (v, i) {
      h += '<span class="lab-cell ' + (r.c[i] || "") + '">' + (r.bas ? "<i>" + esc(r.bas[i]) + "</i>" : "") + "<span>" + esc(v) + "</span><em>" + esc(r.p[i] || "") + "</em></span>";
    });
    if (r.son) h += '<span class="lab-cell is-son"><span></span><em>' + esc(r.son) + "</em></span>";
    return h + "</div></div>";
  }

  document.querySelectorAll('.ds-deck [data-demo="dsy-lab"]').forEach(function (demo) {
    /* dil: html dışındaki en yakın lang özniteliği (sunum kökü) */
    var dilEl = demo.closest("[lang]");
    var ing = !!dilEl && dilEl !== document.documentElement && /^en/i.test(dilEl.getAttribute("lang") || "");
    function ux(tr, en) { return ing ? en : tr; }
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
    pick.setAttribute("aria-label", ux("Hazır örnek", "Example"));
    ornekler.forEach(function (o, i) { var op = el("option", null, esc(o.ad)); op.value = i; pick.appendChild(op); });
    var btns = el("div", "lab-btns");
    var bBack = btn("back", ux("◀ Geri", "◀ Back"), ux("Bir adım geri", "One step back")), bStep = btn("step", ux("Adım ▶", "Step ▶"), ux("Bir adım ilerle", "One step forward"));
    var bPlay = btn("play", ux("Oynat", "Play"), ux("Adımları otomatik oynat", "Play the steps automatically")), bReset = btn("reset", ux("Sıfırla", "Reset"), ux("İlk adıma dön", "Back to the first step"));
    [bBack, bStep, bPlay, bReset].forEach(function (b) { btns.appendChild(b); });
    bar.appendChild(pick); bar.appendChild(btns);

    var gir = el("label", "lab-girdi");
    var girAd = el("span");
    var girIn = el("input");
    girIn.type = "text"; girIn.spellcheck = false; girIn.autocomplete = "off";
    var bUy = btn("apply", ux("Uygula", "Apply"), ux("Girdiyle yeniden çalıştır", "Run again with this input"));
    gir.appendChild(girAd); gir.appendChild(girIn); gir.appendChild(bUy);

    var main = el("div", "lab-main");
    var pKod = el("div", "lab-panel");
    var kodBas = el("p", "lab-title", ux("Kod", "Code"));
    var kod = el("div", "lab-code");
    kod.setAttribute("aria-label", ux("Java kodu", "Java code"));
    pKod.appendChild(kodBas); pKod.appendChild(kod);
    var pSag = el("div", "lab-panel lab-sag");
    var yapi = el("div", "lab-yapi");
    var vars = el("div", "lab-vars");
    vars.setAttribute("aria-label", ux("Değişkenler", "Variables"));
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
      run = calistir(ex.algo, kodlar[ex.algo], girdi, girdi === ex.girdi ? ex.konum : "", ing ? "en" : "tr");
      girAd.textContent = run.etiket;
      girIn.setAttribute("aria-label", run.etiket);
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
      bPlay.textContent = ux("Oynat", "Play"); bPlay.setAttribute("aria-label", ux("Adımları otomatik oynat", "Play the steps automatically"));
    }
    function play() {
      if (timer) { stop(); render(); return; }
      if (!run.adimlar.length) return;
      if (k >= run.adimlar.length - 1) k = 0;
      bPlay.textContent = ux("Durdur", "Pause"); bPlay.setAttribute("aria-label", ux("Otomatik oynatmayı durdur", "Stop autoplay"));
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
        kodBas.textContent = ux("Kod", "Code"); cikBas.textContent = ux("Çıktı", "Output");
        status.classList.add("is-error");
        status.innerHTML = ux("<b>Girdi hatası:</b> ", "<b>Input error:</b> ") + esc(run.hata || ux("girdi çözümlenemedi", "the input could not be parsed")) +
          ux(" Hazır örneklerden biri seçilebilir ya da girdi düzeltilip Uygula düğmesine basılabilir.", " Pick one of the examples, or fix the input and press Apply.");
      } else {
        var g = A.g, h = "";
        if (g.agac) h += agacSvg(g.agac, ing);
        if (g.cizge) h += cizgeSvg(g.cizge, ing);
        if (g.cerceve) {
          /* tepe üstte; sahneye sığmayan ara çerçeveler tek satırda özetlenir */
          var fr = g.cerceve.slice().reverse(), enCok = Math.min(sigan, g.satir ? 6 : 8);
          if (fr.length > enCok) fr = fr.slice(0, enCok - 2).concat([{ ozet: fr.length - enCok + 1 }], fr.slice(-1));
          h += '<div class="lab-frames" aria-label="' + ux("Çağrı yığını (tepe üstte)", "Call stack (top first)") + '">' + fr.map(function (f) {
            if (f.ozet) return '<div class="lab-frame is-ozet">… ' + (ing ? f.ozet + (f.ozet === 1 ? " more frame" : " more frames") : f.ozet + " çerçeve daha") + "</div>";
            return '<div class="lab-frame ' + (f.c || "") + '"><b>' + esc(f.ad) + "</b><span>" + esc(f.d || "") + "</span></div>";
          }).join("") + "</div>";
        }
        if (g.cip) {
          h += '<div class="lab-row"><b>' + esc(g.cip.ad) + '</b><div class="lab-chips">' + (g.cip.d.length ? g.cip.d.map(function (c) {
            return '<span class="' + esc(c.c || "") + '">' + esc(c.t) + "</span>";
          }).join("") : '<span class="lab-bos">' + esc(g.cip.bos || ux("boş", "empty")) + "</span>") + "</div></div>";
        }
        (g.satir || []).forEach(function (r) { h += satirHtml(r, ing); });
        yapi.innerHTML = h;
        if (g.cerceve && yapi.scrollHeight > yapi.clientHeight + 1 && sigan > 3 && yapi.clientHeight > 0) { sigan--; render(); return; }
        var once = {};
        if (P) P.vars.forEach(function (v) { once[v[0]] = v[1]; });
        vars.innerHTML = A.vars.length ? A.vars.map(function (v) {
          var d = P && once[v[0]] !== v[1];
          return '<span class="' + (d ? "is-changed" : "") + '"><i>' + esc(v[0]) + "</i> = <b>" + esc(v[1]) + "</b></span>";
        }).join("") : '<span class="lab-bos">—</span>';
        kodBas.innerHTML = ux("Kod <b>· adım ", "Code <b>· step ") + (k + 1) + " / " + n + "</b>";
        cikBas.textContent = A.ciktiAd;
        var yeni = P && P.cikti !== A.cikti;
        cik.innerHTML = A.cikti ? '<span class="' + (yeni ? "is-new" : "") + '">' + esc(A.cikti.replace(/\n$/, "")) + "</span>" : "—";
        status.classList.toggle("is-error", !!A.hata);
        status.textContent = A.msg;
        if (A.hata) status.innerHTML = ux("<b>Hata:</b> ", "<b>Error:</b> ") + esc(A.msg);
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
