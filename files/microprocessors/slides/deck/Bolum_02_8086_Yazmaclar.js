/* Bölüm 2: 8086 Yazmaçlar — etkileşimli demolar (bayrak hesaplayıcı, adres hesaplayıcı) */
(function () {
  function hex(v, d) { var s = v.toString(16).toUpperCase(); while (s.length < d) s = "0" + s; return s + "h"; }
  function parseHex(s) {
    s = String(s || "").trim().replace(/h$/i, "");
    if (!/^[0-9a-f]{1,4}$/i.test(s)) return NaN;
    return parseInt(s, 16);
  }
  function bin(v, w) {
    var s = v.toString(2);
    while (s.length < w) s = "0" + s;
    return s.replace(/(\d{4})(?=\d)/g, "$1 ");
  }
  function parity(v) { var c = 0; v &= 0xFF; while (v) { c += v & 1; v >>= 1; } return c % 2 === 0 ? 1 : 0; }

  /* ---------- bayrak hesaplayıcı ---------- */
  document.querySelectorAll('.ds-deck [data-demo="m02-flags"]').forEach(function (demo) {
    var inA = demo.querySelector("[data-a]"), inB = demo.querySelector("[data-b]"), selW = demo.querySelector("[data-w]");
    var binBox = demo.querySelector("[data-bin]"), flagBox = demo.querySelector("[data-flags]");
    var status = demo.querySelector(".ds-deck__status");
    var NAMES = [["CF", "elde"], ["ZF", "sıfır"], ["SF", "işaret"], ["OF", "taşma"], ["PF", "çiftlik"], ["AF", "yrd. elde"]];
    var last = "ADD";

    function signed(v, w) { return v >= (1 << (w - 1)) ? v - (1 << w) : v; }

    function calc(op) {
      last = op;
      var w = parseInt(selW.value, 10), mask = (1 << w) - 1, d = w / 4;
      var a = parseHex(inA.value), b = parseHex(inB.value);
      if (isNaN(a) || (op !== "INC" && isNaN(b))) { status.innerHTML = "Geçerli bir onaltılı değer gir (0–FFFF)."; return; }
      if (a > mask || (op !== "INC" && b > mask)) { status.innerHTML = "Değer " + w + " bite sığmıyor; genişliği 16 bit yap."; return; }
      if (op === "INC") b = 1;
      var r, f = {}, msb = 1 << (w - 1), af = null;
      if (op === "ADD" || op === "INC") {
        r = a + b;
        f.CF = r > mask ? 1 : 0;
        af = ((a & 0xF) + (b & 0xF)) > 0xF ? 1 : 0;
        f.OF = ((a & msb) === (b & msb) && ((r & msb) !== (a & msb))) ? 1 : 0;
      } else if (op === "SUB") {
        r = a - b;
        f.CF = r < 0 ? 1 : 0;
        af = ((a & 0xF) - (b & 0xF)) < 0 ? 1 : 0;
        f.OF = ((a & msb) !== (b & msb) && ((r & mask & msb) !== (a & msb))) ? 1 : 0;
      } else {
        r = a & b; f.CF = 0; f.OF = 0;
      }
      r = ((r % (mask + 1)) + (mask + 1)) % (mask + 1);
      f.ZF = r === 0 ? 1 : 0;
      f.SF = (r & msb) ? 1 : 0;
      f.PF = parity(r);
      f.AF = af;
      var sym = op === "SUB" ? "−" : (op === "AND" ? "∧" : "+");
      binBox.textContent = "  " + bin(a, w) + "   " + hex(a, d) + "\n" + sym + " " + bin(b, w) + "   " + hex(b, d) + "\n= " + bin(r, w) + "   " + hex(r, d);
      flagBox.innerHTML = NAMES.map(function (n) {
        var v = f[n[0]];
        var keep = (op === "INC" && n[0] === "CF");
        var txt = keep ? "–" : (v === null ? "?" : v);
        return '<div class="m02-flag' + (v === 1 && !keep ? " is-on" : "") + '">' + n[0] + "=" + txt + "<small>" + n[1] + (keep ? " (değişmez)" : (v === null ? " (tanımsız)" : "")) + "</small></div>";
      }).join("");
      var info;
      if (op === "AND") info = "Mantıksal işlem: CF = OF = 0.";
      else {
        var ua = a, ub = b, ur = op === "SUB" ? a - b : a + b;
        info = "İşaretsiz: " + ua + " " + (op === "SUB" ? "−" : "+") + " " + ub + " = " + ur + (f.CF ? " → " + w + " bite <b>sığmadı</b> (CF = 1)" : " ✓") +
          " · İşaretli: " + signed(a, w) + " " + (op === "SUB" ? "−" : "+") + " " + signed(b, w) + " → " + signed(r, w) + (f.OF ? " <b>yanlış</b> (OF = 1)" : " ✓");
      }
      status.innerHTML = "<b>" + op + "</b> · " + info;
    }
    demo.querySelectorAll("[data-op]").forEach(function (b) { b.addEventListener("click", function () { calc(b.dataset.op); }); });
    [inA, inB, selW].forEach(function (el) { el.addEventListener("change", function () { calc(last); }); });
    calc("ADD");
  });

  /* ---------- adres hesaplayıcı ---------- */
  document.querySelectorAll('.ds-deck [data-demo="m02-ea"]').forEach(function (demo) {
    var sBase = demo.querySelector("[data-base]"), sIdx = demo.querySelector("[data-index]"), inDisp = demo.querySelector("[data-disp]");
    var sOvr = demo.querySelector("[data-ovr]");
    var asm = demo.querySelector("[data-asm]"), out = demo.querySelector("[data-out]"), status = demo.querySelector(".ds-deck__status");
    function reg(n) { return parseHex(demo.querySelector('[data-reg="' + n + '"]').value); }
    function calc() {
      var base = sBase.value, idx = sIdx.value, ovr = sOvr.value;
      var dispTxt = inDisp.value.trim(), disp = dispTxt === "" ? 0 : parseHex(dispTxt);
      if (isNaN(disp)) { status.innerHTML = "Kaydırma onaltılı olmalı (0–FFFF)."; return; }
      var parts = [], ea = 0, bad = false;
      [base, idx].forEach(function (r) {
        if (!r) return;
        var v = reg(r);
        if (isNaN(v)) bad = true;
        parts.push(r); ea += v;
      });
      if (bad) { status.innerHTML = "Yazmaç değerleri onaltılı olmalı (0–FFFF)."; return; }
      if (disp || !parts.length) parts.push(hex(disp, disp > 0xFF ? 4 : 2).replace(/^([A-F])/, "0$1"));
      ea = (ea + disp) & 0xFFFF;
      var seg = ovr || (base === "BP" ? "SS" : "DS");
      var sv = reg(seg);
      if (isNaN(sv)) { status.innerHTML = "Kesim değeri onaltılı olmalı."; return; }
      var pa = (sv * 16 + ea) % 0x100000;
      var mode = !base && !idx ? "doğrudan" : (base && idx ? (disp ? "taban indisli kaydırma" : "taban indisli") : (disp ? (base ? "taban" : "indis") : "yazmaç dolaylı"));
      if (!base && !idx && !disp) mode = "doğrudan";
      asm.textContent = "MOV AL, " + (ovr ? ovr + ":" : "") + "[" + parts.join("+") + "]";
      out.innerHTML = '<div>EA (bağıl konum)<b>' + hex(ea, 4) + '</b></div><div>kesim<b>' + seg + " = " + hex(sv, 4) + '</b></div><div>fiziksel adres<b>' + hex(pa, 5) + "</b></div>";
      status.innerHTML = "Mod: <b>" + mode + "</b> · " + seg + " × 16 + EA = " + hex(sv * 16, 5) + " + " + hex(ea, 4) + (ovr ? " (kesim öneki)" : (base === "BP" ? " (BP → varsayılan SS)" : " (varsayılan DS)"));
    }
    demo.querySelectorAll("input, select").forEach(function (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); });
    calc();
  });
})();
