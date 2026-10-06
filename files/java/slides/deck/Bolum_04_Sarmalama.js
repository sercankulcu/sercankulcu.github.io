/* Bölüm 4: Sarmalama - setter koruması deneme alanı */
(function () {
  document.querySelectorAll('.ds-deck [data-demo="j042-saat"]').forEach(function (demo) {
    var LIMIT = { saat: 24, dakika: 60, saniye: 60 };
    var BAS = { saat: 9, dakika: 5, saniye: 30 };
    var deger = {};
    var alan = demo.querySelector('[data-k="alan"]');
    var giris = demo.querySelector('[data-k="deger"]');
    var code = demo.querySelector(".j042-lab__code");
    var time = demo.querySelector(".j042-lab__time");
    var status = demo.querySelector(".ds-deck__status");

    function gecerli(a, v) { return v >= 0 && v < LIMIT[a]; }
    function iki(v) { var s = String(Math.abs(v)); if (s.length < 2) s = "0" + s; return (v < 0 ? "-" : "") + s; }
    function buyuk(a) { return a.charAt(0).toUpperCase() + a.slice(1); }

    function ciz(son) {
      var bozuk = false;
      Object.keys(LIMIT).forEach(function (a) {
        var f = demo.querySelector('[data-f="' + a + '"]');
        var ok = gecerli(a, deger[a]);
        if (!ok) bozuk = true;
        f.querySelector("b").textContent = deger[a];
        f.classList.toggle("is-bad", !ok);
        f.classList.toggle("is-hot", a === son);
      });
      time.textContent = iki(deger.saat) + ":" + iki(deger.dakika) + ":" + iki(deger.saniye);
      time.classList.toggle("is-bad", bozuk);
      return bozuk;
    }
    function oku() {
      var v = parseInt(giris.value, 10);
      if (isNaN(v)) v = 0;
      if (v < -999) v = -999;
      if (v > 999) v = 999;
      giris.value = v;
      return v;
    }
    function setter() {
      var a = alan.value, v = oku();
      code.innerHTML = 's.set' + buyuk(a) + '(' + v + ');';
      if (gecerli(a, v)) {
        deger[a] = v;
        ciz(a);
        status.innerHTML = "Koşul <b>doğru</b> (0 ≤ " + v + " &lt; " + LIMIT[a] + "): setter değeri atadı.";
      } else {
        ciz(null);
        status.innerHTML = "Koşul <b>yanlış</b>: setter " + v + " değerini <b>reddetti</b>, nesne geçerli kaldı.";
      }
    }
    function dogrudan() {
      var a = alan.value, v = oku();
      code.innerHTML = 's.' + a + ' = ' + v + ';   <span class="cm">/* alan public olsaydı */</span>';
      deger[a] = v;
      var bozuk = ciz(a);
      status.innerHTML = bozuk ? "Hiçbir kontrol yok: nesne artık <b>geçersiz</b> bir durumda!" : "Değer bu kez geçerli, ama bunu kontrol eden <b>kimse yoktu</b>.";
    }
    function sifirla() {
      Object.keys(BAS).forEach(function (a) { deger[a] = BAS[a]; });
      code.innerHTML = "s.setSaat(9); s.setDakika(5); s.setSaniye(30);";
      ciz(null);
      status.innerHTML = "Bir alan ve değer seçip iki yolu karşılaştırın.";
    }
    demo.querySelector('[data-op="set"]').addEventListener("click", setter);
    demo.querySelector('[data-op="direct"]').addEventListener("click", dogrudan);
    demo.querySelector('[data-op="reset"]').addEventListener("click", sifirla);
    giris.addEventListener("keydown", function (ev) { if (ev.key === "Enter") setter(); });
    sifirla();
  });
})();
