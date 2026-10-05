/* Bölüm 5: emu8086.inc Kütüphanesi sunumu demoları */
(function () {
  function hex(n, w) { return n.toString(16).toUpperCase().padStart(w, "0"); }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* GOTOXY ekranı: 80 x 25 hücre */
  document.querySelectorAll('.ds-deck [data-demo="m05l-xy"]').forEach(function (demo) {
    var grid = demo.querySelector(".m05l-xy");
    var input = demo.querySelector("input");
    var status = demo.querySelector(".ds-deck__status");
    var cells = [], cur = 0;
    for (var i = 0; i < 80 * 25; i++) {
      var s = document.createElement("span");
      s.dataset.i = i;
      grid.appendChild(s);
      cells.push(s);
    }
    function show(i) {
      cells[cur].classList.remove("is-cur");
      cur = i;
      cells[cur].classList.add("is-cur");
      var col = i % 80, row = Math.floor(i / 80), off = (row * 80 + col) * 2;
      status.innerHTML = "<b>GOTOXY " + col + ", " + row + "</b> → MOV DL," + col + " · MOV DH," + row +
        " · AH=02h · INT 10h<br>video belleği: B800:" + hex(off, 4) + "h (karakter), B800:" + hex(off + 1, 4) + "h (renk)";
    }
    grid.addEventListener("click", function (ev) {
      var t = ev.target.closest("span");
      if (!t) return;
      var i = parseInt(t.dataset.i, 10);
      var ch = input.value || " ";
      cells[i].textContent = ch;
      show(i);
      status.innerHTML += "<br>PUTC '" + esc(ch) + "' → imleç " + ((i + 1) % 80) + ", " + Math.min(24, Math.floor((i + 1) / 80)) + " konumuna ilerler";
    });
    demo.querySelector('[data-op="clear"]').addEventListener("click", function () {
      cells.forEach(function (c) { c.textContent = ""; });
      show(0);
    });
    show(0);
  });

  /* PRINT_NUM / PRINT_NUM_UNS karşılaştırması */
  document.querySelectorAll('.ds-deck [data-demo="m05l-num"]').forEach(function (demo) {
    var input = demo.querySelector("input");
    var out = demo.querySelector(".m05l-num-out");
    var status = demo.querySelector(".ds-deck__status");
    function parse(t) {
      t = t.trim().replace(/\s+/g, "");
      if (/^-?[0-9]+$/.test(t)) return parseInt(t, 10);
      if (/^[0-9a-f]+h$/i.test(t)) return parseInt(t.slice(0, -1), 16);
      if (/^0x[0-9a-f]+$/i.test(t)) return parseInt(t.slice(2), 16);
      return NaN;
    }
    function calc() {
      var n = parse(input.value);
      if (isNaN(n) || n < -32768 || n > 65535) {
        out.innerHTML = "";
        status.innerHTML = "−32768 ile 65535 arasında bir değer girin (ör. -25, 1234, FFE7h).";
        return;
      }
      var ax = n & 0xFFFF, signed = ax >= 0x8000 ? ax - 0x10000 : ax;
      var bin = ax.toString(2).padStart(16, "0").replace(/(.{4})(?=.)/g, "$1 ");
      out.innerHTML = "<div><b>AX</b><code>" + hex(ax, 4) + "h</code><br><span class='ds-deck__muted' style='font-size:12.5px'>" + bin + "</span></div>" +
        "<div><b>PRINT_NUM</b><code>" + signed + "</code></div>" +
        "<div><b>PRINT_NUM_UNS</b><code>" + ax + "</code></div>";
      status.innerHTML = ax >= 0x8000 ? "Bit 15 = 1: işaretli yorumda negatif (" + ax + " − 65536 = " + signed + ")." :
        "Bit 15 = 0: iki yorum aynı sonucu verir.";
    }
    input.addEventListener("input", calc);
    demo.querySelectorAll("[data-v]").forEach(function (b) {
      b.addEventListener("click", function () { input.value = b.dataset.v; calc(); });
    });
    calc();
  });
})();
