/* Bölüm 3: for döngüsü deneme alanı */
(function () {
  document.querySelectorAll('.ds-deck [data-demo="j031-for"]').forEach(function (demo) {
    var LIMIT = 200;
    var bas = demo.querySelector('[data-k="bas"]');
    var son = demo.querySelector('[data-k="son"]');
    var op = demo.querySelector('[data-k="op"]');
    var upd = demo.querySelector('[data-k="upd"]');
    var code = demo.querySelector(".j031-lab__code");
    var vals = demo.querySelector(".j031-lab__vals");
    var status = demo.querySelector(".j031-lab__status");

    function num(el, d) {
      var v = parseInt(el.value, 10);
      if (isNaN(v)) v = d;
      if (v < -50) v = -50;
      if (v > 50) v = 50;
      el.value = v;
      return v;
    }
    function test(i, o, b) {
      if (o === "<=") return i <= b;
      if (o === "<") return i < b;
      if (o === ">=") return i >= b;
      if (o === ">") return i > b;
      return i !== b;
    }
    function updText(u) {
      if (u === "1") return "i++";
      if (u === "-1") return "i--";
      if (u === "x2") return "i *= 2";
      var k = parseInt(u, 10);
      return k > 0 ? "i += " + k : "i -= " + (-k);
    }
    function step(i, u) {
      if (u === "x2") return i * 2;
      return i + parseInt(u, 10);
    }
    function esc(s) {
      return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function run() {
      var a = num(bas, 1), b = num(son, 10), o = op.value, u = upd.value;
      code.innerHTML = '<span class="kw">for</span> (<span class="kw">int</span> i = ' + a + "; i " + esc(o) + " " + b + "; " + updText(u) + ") { toplam += i; }";
      vals.innerHTML = "";
      var i = a, n = 0, toplam = 0;
      while (test(i, o, b) && n < LIMIT) {
        if (n < 60) {
          var s = document.createElement("span");
          s.textContent = i;
          vals.appendChild(s);
        }
        toplam += i;
        n++;
        i = step(i, u);
      }
      if (n >= LIMIT && test(i, o, b)) {
        var st = document.createElement("span");
        st.className = "is-stop";
        st.textContent = "…";
        vals.appendChild(st);
        status.innerHTML = "<b>" + LIMIT + " turdan sonra durduruldu</b>: koşul hiç yanlış olmuyor, bu bir <b>sonsuz döngü</b>dür.";
        return;
      }
      if (n > 60) {
        var more = document.createElement("span");
        more.textContent = "… +" + (n - 60);
        vals.appendChild(more);
      }
      if (n === 0) {
        status.innerHTML = "İlk kontrolde " + a + " " + esc(o) + " " + b + " <b>yanlış</b>: gövde <b>hiç</b> çalışmadı.";
      } else {
        status.innerHTML = "Gövde <b>" + n + "</b> kez çalıştı · toplam = <b>" + toplam + "</b> · çıkışta i = <b>" + i + "</b> (" + i + " " + esc(o) + " " + b + " yanlış).";
      }
    }
    demo.querySelector('[data-op="run"]').addEventListener("click", run);
    [bas, son].forEach(function (el) {
      el.addEventListener("keydown", function (e) { if (e.key === "Enter") run(); });
    });
    [op, upd].forEach(function (el) { el.addEventListener("change", run); });
    run();
  });
})();
