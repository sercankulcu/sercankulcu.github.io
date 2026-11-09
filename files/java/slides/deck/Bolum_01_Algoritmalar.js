/* Bölüm 1: Algoritmalar - arama ve sıralama deneme alanları */
(function () {
  function rnd(n) { return Math.floor(Math.random() * n); }
  function draw(box, vals, kinds, marks) {
    box.innerHTML = "";
    vals.forEach(function (v, i) {
      var c = document.createElement("div");
      c.className = "j013-lab__cell" + (kinds[i] ? " is-" + kinds[i] : "");
      c.innerHTML = "<span>" + i + "</span><b>" + v + "</b><span>" + (marks[i] || "") + "</span>";
      box.appendChild(c);
    });
  }

  /* ---------- arama ---------- */
  document.querySelectorAll('.ds-deck [data-demo="j013-ara"]').forEach(function (demo) {
    var box = demo.querySelector(".j013-lab__cells");
    var status = demo.querySelector(".j013-lab__status");
    var keyIn = demo.querySelector(".j013-lab__key");
    var N = 15, dizi = [], timer = null;
    function yeni(first) {
      var s = {};
      if (first) {
        dizi = [3, 7, 12, 18, 23, 31, 36, 42, 48, 55, 61, 64, 70, 77, 89];
      } else {
        dizi = [];
        while (dizi.length < N) { var v = rnd(99) + 1; if (!s[v]) { s[v] = 1; dizi.push(v); } }
        dizi.sort(function (a, b) { return a - b; });
      }
      draw(box, dizi, {}, {});
      status.innerHTML = "Sıralı bir dizi hazır. Bir sayı yazıp yöntem seçin.";
    }
    function dur() { if (timer) { clearInterval(timer); timer = null; } }
    function hedef() {
      var h = parseInt(keyIn.value, 10);
      if (!(h >= 0 && h <= 99)) { status.innerHTML = "0 ile 99 arasında bir tam sayı girin."; return null; }
      return h;
    }
    function dogrusal(h) {
      var i = 0, say = 0;
      timer = setInterval(function () {
        var k = {}, m = {};
        for (var j = 0; j < i; j++) k[j] = "bad";
        if (i >= N) {
          dur(); draw(box, dizi, k, {});
          status.innerHTML = "Doğrusal arama: <b>" + h + " bulunamadı</b> (" + say + " karşılaştırma, sonuç −1).";
          return;
        }
        say++;
        m[i] = "i";
        if (dizi[i] === h) {
          k[i] = "ok"; dur(); draw(box, dizi, k, m);
          status.innerHTML = "Doğrusal arama: dizi[" + i + "] = " + h + " <b>bulundu</b> (" + say + " karşılaştırma).";
          return;
        }
        k[i] = "hot"; draw(box, dizi, k, m);
        status.innerHTML = "Doğrusal: dizi[" + i + "] = " + dizi[i] + " ≠ " + h + " · " + say + " karşılaştırma";
        i++;
      }, 450);
    }
    function ikili(h) {
      var alt = 0, ust = N - 1, say = 0, orta = -1, faz = 0;
      function goster(son) {
        var k = {}, m = {};
        for (var j = 0; j < N; j++) if (j < alt || j > ust) k[j] = "off";
        if (orta >= 0 && !son) { k[orta] = faz === 2 ? "ok" : "hot"; }
        if (alt <= ust) { m[alt] = "alt"; m[ust] = (m[ust] ? m[ust] + "," : "") + "üst"; }
        if (orta >= 0 && !son) m[orta] = (m[orta] ? m[orta] + "," : "") + "orta";
        draw(box, dizi, k, m);
      }
      goster(false);
      timer = setInterval(function () {
        if (alt > ust) {
          dur(); goster(true);
          status.innerHTML = "İkili arama: alan tükendi, <b>" + h + " bulunamadı</b> (" + say + " karşılaştırma, sonuç −1).";
          return;
        }
        orta = Math.floor((alt + ust) / 2); say++;
        if (dizi[orta] === h) {
          faz = 2; dur(); goster(false);
          status.innerHTML = "İkili arama: dizi[" + orta + "] = " + h + " <b>bulundu</b> (" + say + " karşılaştırma).";
          return;
        }
        faz = 1; goster(false);
        if (h < dizi[orta]) {
          status.innerHTML = "İkili: orta = " + orta + ", " + h + " &lt; " + dizi[orta] + " → sol yarı · " + say + " karşılaştırma";
          ust = orta - 1;
        } else {
          status.innerHTML = "İkili: orta = " + orta + ", " + h + " &gt; " + dizi[orta] + " → sağ yarı · " + say + " karşılaştırma";
          alt = orta + 1;
        }
      }, 900);
    }
    demo.addEventListener("click", function (e) {
      var op = e.target.dataset && e.target.dataset.op;
      if (!op) return;
      dur();
      if (op === "new") { yeni(false); return; }
      var h = hedef();
      if (h === null) return;
      if (op === "lin") dogrusal(h); else ikili(h);
    });
    yeni(true);
  });

  /* ---------- sıralama ---------- */
  document.querySelectorAll('.ds-deck [data-demo="j013-sirala"]').forEach(function (demo) {
    var box = demo.querySelector(".j013-lab__cells");
    var status = demo.querySelector(".j013-lab__status");
    var modeSel = demo.querySelector(".j013-lab__mode");
    var N = 8, dizi, bas, st, timer = null;
    function dur() { if (timer) { clearInterval(timer); timer = null; } }
    function sifirla(yeniDizi) {
      if (yeniDizi || !bas) { bas = []; for (var i = 0; i < N; i++) bas.push(rnd(90) + 10); }
      dizi = bas.slice();
      st = { i: 0, j: modeSel.value === "sec" ? 1 : 0, enk: 0, tur: 0, degisti: false, kars: 0, takas: 0, bitti: false };
      goster({}, {});
      status.innerHTML = (modeSel.value === "sec" ? "Seçmeli" : "Kabarcık") + " sıralama hazır. \"bir adım\" ile ilerleyin.";
    }
    function yerinde() {
      var k = {};
      if (modeSel.value === "sec") { for (var a = 0; a < st.i; a++) k[a] = "ok"; }
      else { for (var b = N - st.tur; b < N; b++) k[b] = "ok"; }
      if (st.bitti) for (var c = 0; c < N; c++) k[c] = "ok";
      return k;
    }
    function goster(k, m) { draw(box, dizi, k, m); }
    function sayac() { return " · " + st.kars + " karşılaştırma, " + st.takas + " takas"; }
    function adimSec() {
      if (st.i >= N - 1) { st.bitti = true; goster(yerinde(), {}); status.innerHTML = "Dizi sıralandı" + sayac() + "."; return false; }
      var k = yerinde(), m = {}, msg;
      if (st.j < N) {
        st.kars++;
        var yeni = dizi[st.j] < dizi[st.enk];
        msg = "dizi[" + st.j + "] = " + dizi[st.j] + (yeni ? " &lt; " : " ≥ ") + dizi[st.enk] + (yeni ? " → yeni en küçük" : "");
        if (yeni) st.enk = st.j;
        k[st.j] = "hot"; k[st.enk] = "hot"; m[st.i] = "i"; m[st.enk] = (m[st.enk] ? m[st.enk] + "," : "") + "enK"; m[st.j] = (m[st.j] ? m[st.j] + "," : "") + "j";
        st.j++;
      } else {
        var g = dizi[st.i]; dizi[st.i] = dizi[st.enk]; dizi[st.enk] = g;
        if (st.enk !== st.i) st.takas++;
        msg = (st.i + 1) + ". adım bitti: en küçük " + dizi[st.i] + " konum " + st.i + "'e yerleşti";
        st.i++; st.enk = st.i; st.j = st.i + 1;
        k = yerinde();
        if (st.i >= N - 1) { st.bitti = true; k = yerinde(); msg += "; dizi sıralı"; }
      }
      goster(k, m);
      status.innerHTML = msg + sayac();
      return !st.bitti;
    }
    function adimKab() {
      if (st.bitti) { goster(yerinde(), {}); status.innerHTML = "Dizi sıralandı" + sayac() + "."; return false; }
      var son = N - 1 - st.tur, k, m = {}, msg;
      if (st.j < son) {
        var j = st.j, takas = dizi[j] > dizi[j + 1];
        st.kars++;
        if (takas) { var g = dizi[j]; dizi[j] = dizi[j + 1]; dizi[j + 1] = g; st.takas++; st.degisti = true; }
        k = yerinde(); k[j] = "hot"; k[j + 1] = "hot"; m[j] = "j"; m[j + 1] = "j+1";
        msg = (st.tur + 1) + ". tur: " + (takas ? "yer değiştirdi" : "değişiklik yok");
        st.j++;
      } else {
        msg = (st.tur + 1) + ". tur bitti";
        if (!st.degisti) { st.bitti = true; msg += ": hiç takas yok, dizi sıralı"; }
        st.tur++; st.j = 0; st.degisti = false;
        if (st.tur >= N - 1) st.bitti = true;
        k = yerinde();
      }
      goster(k, m);
      status.innerHTML = msg + sayac();
      return !st.bitti;
    }
    function adim() { return modeSel.value === "sec" ? adimSec() : adimKab(); }
    demo.addEventListener("click", function (e) {
      var op = e.target.dataset && e.target.dataset.op;
      if (!op) return;
      dur();
      if (op === "new") { sifirla(true); return; }
      if (op === "step") { adim(); return; }
      if (op === "run") { timer = setInterval(function () { if (!adim()) dur(); }, 350); }
    });
    modeSel.addEventListener("change", function () { dur(); sifirla(false); });
    sifirla(true);
  });
})();
