/* Bölüm 1: Bilgisayarlar - bit ve karakter kodu deneme alanları */
(function () {
  /* ---------- 8 bit deneme alanı ---------- */
  document.querySelectorAll('.ds-deck [data-demo="j011-bits"]').forEach(function (demo) {
    var row = demo.querySelector(".j011-bitrow");
    var read = demo.querySelector(".j011-read");
    var input = demo.querySelector(".j011-num");
    var WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];
    var value = 13;
    var buttons = [];

    function pad(s, n) { while (s.length < n) s = "0" + s; return s; }

    WEIGHTS.forEach(function (w, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.innerHTML = "<span>" + (i === 0 ? "±128" : w) + "</span><span>0</span>";
      b.addEventListener("click", function () { value = value ^ w; render(); });
      row.appendChild(b);
      buttons.push(b);
    });

    function render() {
      value = value & 255;
      var bits = pad(value.toString(2), 8);
      buttons.forEach(function (b, i) {
        var one = bits.charAt(i) === "1";
        b.lastChild.textContent = one ? "1" : "0";
        b.classList.toggle("is-one", one);
        b.setAttribute("aria-label", "bit " + (7 - i) + " (ağırlık " + WEIGHTS[i] + "): " + (one ? "1" : "0"));
      });
      var signed = value >= 128 ? value - 256 : value;
      var ch = value >= 32 && value <= 126 ? "'" + String.fromCharCode(value) + "'" : "—";
      var parts = [
        ["İkili", bits.slice(0, 4) + " " + bits.slice(4)],
        ["İşaretsiz (0–255)", String(value)],
        ["İşaretli byte (−128–127)", String(signed).replace("-", "−")],
        ["Onaltılı", "0x" + pad(value.toString(16).toUpperCase(), 2)],
        ["Sekizli", "0" + value.toString(8)],
        ["ASCII karakter", ch]
      ];
      read.innerHTML = parts.map(function (p) { return "<div><span>" + p[0] + "</span><b>" + p[1] + "</b></div>"; }).join("");
    }

    function setFromInput() {
      var n = parseInt(input.value, 10);
      if (isNaN(n) || n < -128 || n > 255) { input.value = value; return; }
      value = n < 0 ? n + 256 : n;
      render();
    }

    demo.querySelectorAll("[data-op]").forEach(function (b) {
      b.addEventListener("click", function () {
        var op = b.getAttribute("data-op");
        if (op === "set") setFromInput();
        else if (op === "inv") { value = ~value & 255; render(); }
        else if (op === "inc") { value = (value + 1) & 255; render(); }
        else if (op === "shl") { value = (value << 1) & 255; render(); }
        else if (op === "zero") { value = 0; render(); }
      });
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); setFromInput(); }
    });
    input.addEventListener("keyup", function (e) { e.stopPropagation(); });
    render();
  });

  /* ---------- karakter kodu deneme alanı ---------- */
  document.querySelectorAll('.ds-deck [data-demo="j011-chars"]').forEach(function (demo) {
    var input = demo.querySelector(".j011-text");
    var cells = demo.querySelector(".j011-cells");
    var sum = demo.querySelector(".j011-sum");
    var MAX = 12;
    var EX = { ex1: "Java", ex2: "ağaç", ex3: "€ 👨‍👩‍👧" };

    function utf8(cp) {
      if (cp < 0x80) return [cp];
      if (cp < 0x800) return [0xC0 | (cp >> 6), 0x80 | (cp & 63)];
      if (cp < 0x10000) return [0xE0 | (cp >> 12), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63)];
      return [0xF0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63)];
    }
    function hex(n, w) { var s = n.toString(16).toUpperCase(); while (s.length < w) s = "0" + s; return s; }
    function show(cp) {
      if (cp === 32) return "␠";
      if (cp === 0x200D) return "ZWJ";
      if (cp < 32) return "·";
      return String.fromCodePoint(cp);
    }

    function render() {
      var text = input.value;
      var cps = Array.from(text).map(function (c) { return c.codePointAt(0); });
      var bytes = 0;
      cells.innerHTML = "";
      cps.forEach(function (cp, i) {
        var u = utf8(cp);
        bytes += u.length;
        if (i >= MAX) return;
        var d = document.createElement("div");
        d.className = "j011-cell" + (cp > 127 ? " is-wide" : "");
        d.setAttribute("role", "listitem");
        d.innerHTML = "<b>" + show(cp) + "</b>" + cp + "<br><code>U+" + hex(cp, 4) + "</code><br><code>" +
          u.map(function (x) { return hex(x, 2); }).join(" ") + "</code>";
        cells.appendChild(d);
      });
      if (!cps.length) cells.innerHTML = '<p class="ds-deck__small">Bir metin yazın.</p>';
      sum.innerHTML = "Kod noktası: <b>" + cps.length + "</b> · Java <code>length()</code> (UTF-16 char): <b>" + text.length +
        "</b> · UTF-8 bayt: <b>" + bytes + "</b>" + (cps.length > MAX ? " · (ilk " + MAX + " gösteriliyor)" : "");
    }

    demo.querySelectorAll("[data-op]").forEach(function (b) {
      b.addEventListener("click", function () { input.value = EX[b.getAttribute("data-op")]; render(); });
    });
    input.addEventListener("input", render);
    input.addEventListener("keydown", function (e) { e.stopPropagation(); });
    input.addEventListener("keyup", function (e) { e.stopPropagation(); });
    render();
  });
})();
