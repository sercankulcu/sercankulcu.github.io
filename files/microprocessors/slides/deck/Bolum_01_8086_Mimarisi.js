/* Bölüm 1: 8086 Mimarisi demoları */
(function () {
  function hex(n, w) { var s = n.toString(16).toUpperCase(); while (s.length < w) s = "0" + s; return s; }
  function parseHex(v) { v = String(v).trim().replace(/h$/i, ""); return /^[0-9a-f]{1,4}$/i.test(v) ? parseInt(v, 16) : null; }

  /* AX = AH : AL */
  document.querySelectorAll('.ds-deck [data-demo="m01-reg"]').forEach(function (demo) {
    var input = demo.querySelector(".m01-in");
    var bitsBox = demo.querySelector(".m01-bits");
    var halves = demo.querySelector(".m01-halves");
    var status = demo.querySelector(".ds-deck__status");
    var ax = 0x1234, bits = [];
    for (var b = 15; b >= 0; b--) {
      (function (b) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("aria-label", "bit " + b);
        btn.title = "bit " + b;
        if (b === 7) btn.className = "is-gap";
        btn.addEventListener("click", function () { ax ^= (1 << b); render("bit " + b + " tersine çevrildi"); });
        bitsBox.appendChild(btn);
        bits[b] = btn;
      })(b);
    }
    function signed(v, w) { var m = 1 << (w - 1); return v & m ? v - (m << 1) : v; }
    function render(msg) {
      ax &= 0xFFFF;
      var ah = ax >> 8, al = ax & 0xFF;
      for (var b = 0; b < 16; b++) {
        var one = (ax >> b) & 1;
        bits[b].textContent = one;
        bits[b].classList.toggle("is-one", !!one);
      }
      if (document.activeElement !== input) input.value = hex(ax, 4);
      halves.innerHTML = '<div>AH (bit 15–8)<br><b>' + hex(ah, 2) + 'h</b><br>' + ah + " / " + signed(ah, 8) + '</div>' +
        '<div>AL (bit 7–0)<br><b>' + hex(al, 2) + 'h</b><br>' + al + " / " + signed(al, 8) + '</div>';
      status.innerHTML = (msg ? msg + " · " : "") + "AX = <b>" + hex(ax, 4) + "h</b> = " + ax + " (işaretli " + signed(ax, 16) + ")";
    }
    input.addEventListener("input", function () {
      var v = parseHex(input.value);
      if (v === null) { status.innerHTML = "0–FFFF arası onaltılık bir değer gir."; return; }
      ax = v; render();
    });
    input.addEventListener("blur", function () { input.value = hex(ax, 4); });
    demo.querySelector('[data-op="incal"]').addEventListener("click", function () {
      var al = ax & 0xFF, carry = al === 0xFF;
      ax = (ax & 0xFF00) | ((al + 1) & 0xFF);
      render(carry ? "<b>INC AL</b>: AL FFh → 00h, AH değişmedi" : "<b>INC AL</b>");
    });
    demo.querySelector('[data-op="incax"]').addEventListener("click", function () {
      var carry = (ax & 0xFF) === 0xFF;
      ax = (ax + 1) & 0xFFFF;
      render(carry ? "<b>INC AX</b>: alt bayttan elde AH'ye geçti" : "<b>INC AX</b>");
    });
    render();
  });

  /* fiziksel adres hesaplayıcı */
  document.querySelectorAll('.ds-deck [data-demo="m01-addr"]').forEach(function (demo) {
    var segIn = demo.querySelector('[data-k="seg"]');
    var offIn = demo.querySelector('[data-k="off"]');
    var calc = demo.querySelector(".m01-calc");
    var map = demo.querySelector(".m01-map");
    var status = demo.querySelector(".ds-deck__status");
    function X(a) { return 10 + a * 680 / 0x100000; }
    function update() {
      var seg = parseHex(segIn.value), off = parseHex(offIn.value);
      if (seg === null || off === null) { status.innerHTML = "Kesim ve bağıl konum 0–FFFF arası onaltılık olmalı."; return; }
      var base = seg * 16, sum = base + off, pa = sum & 0xFFFFF;
      var lines = "  " + hex(seg, 4) + "h      ; kesim\n" +
        "  " + hex(base, 5) + "h     ; kesim × 10h (sola 4 bit)\n" +
        "+  " + hex(off, 4) + "h     ; bağıl konum\n" +
        "-----------\n" +
        "  " + hex(sum, sum > 0xFFFFF ? 6 : 5) + "h" + (sum > 0xFFFFF ? "    ; 1 MB aşıldı → " + hex(pa, 5) + "h (sarma)" : "     ; fiziksel adres");
      calc.textContent = lines;
      var norm = hex(pa >> 4, 4) + "h:" + hex(pa & 15, 4) + "h";
      var endSeg = base + 0xFFFF;
      var svg = '<rect class="box-empty" x="10" y="14" width="680" height="22" rx="3"/>';
      var w1 = Math.max(2, X(Math.min(endSeg, 0xFFFFF)) - X(base));
      svg += '<rect class="box" x="' + X(base) + '" y="14" width="' + w1 + '" height="22" rx="2"/>';
      if (endSeg > 0xFFFFF) svg += '<rect class="box" x="10" y="14" width="' + Math.max(2, X(endSeg - 0x100000) - 10) + '" height="22" rx="2"/>';
      svg += '<path class="line" d="M' + X(pa) + ' 8 V42" style="stroke:var(--ds-accent);stroke-width:3"/>';
      svg += '<text class="lbl" x="10" y="58" text-anchor="start">00000h</text><text class="lbl" x="690" y="58" text-anchor="end">FFFFFh</text>';
      var tx = Math.min(600, Math.max(90, X(pa)));
      svg += '<text class="txt" x="' + tx + '" y="62" text-anchor="middle" style="font-size:13px;fill:var(--ds-accent)">' + hex(pa, 5) + 'h</text>';
      map.innerHTML = svg;
      status.innerHTML = "Kesim aralığı <b>" + hex(base, 5) + "h–" + hex(endSeg & 0xFFFFF, 5) + "h</b> · normalleştirilmiş yazım <b>" + norm + "</b>";
    }
    [segIn, offIn].forEach(function (inp) {
      inp.addEventListener("input", update);
      inp.addEventListener("blur", function () { var v = parseHex(inp.value); if (v !== null) inp.value = hex(v, 4); });
    });
    demo.querySelector('[data-op="rnd"]').addEventListener("click", function () {
      segIn.value = hex(Math.floor(Math.random() * 0x10000), 4);
      offIn.value = hex(Math.floor(Math.random() * 0x10000), 4);
      update();
    });
    update();
  });
})();
