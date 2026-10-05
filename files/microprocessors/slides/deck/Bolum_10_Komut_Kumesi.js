/* Bölüm 10: Komut Kümesi demoları (bayrak hesaplayıcı, kaydırma gezgini) */
(function () {
  function hex2(v) { return ("0" + (v & 0xFF).toString(16).toUpperCase()).slice(-2) + "h"; }
  function bin8(v) { return ("0000000" + (v & 0xFF).toString(2)).slice(-8); }
  function signed8(v) { v &= 0xFF; return v > 127 ? v - 256 : v; }
  function parity(v) { var n = 0; for (var i = 0; i < 8; i++) if (v & (1 << i)) n++; return n % 2 === 0 ? 1 : 0; }
  function parseHex(s) {
    s = String(s || "").trim().replace(/h$/i, "");
    if (!/^[0-9a-fA-F]{1,2}$/.test(s)) return null;
    return parseInt(s, 16);
  }
  function bitsRow(label, v, extra, hot) {
    var s = "<div class=\"m10-bits\"><em>" + label + "</em>";
    var b = bin8(v);
    for (var i = 0; i < 8; i++) {
      if (i === 4) s += "<span class=\"gap\"></span>";
      s += "<span" + (hot && hot[i] ? " class=\"is-hot\"" : "") + ">" + b[i] + "</span>";
    }
    return s + "<b>" + (extra || "") + "</b></div>";
  }

  /* ---------- bayrak hesaplayıcı ---------- */
  document.querySelectorAll('.ds-deck [data-demo="m10-flags"]').forEach(function (demo) {
    var inA = demo.querySelector('[data-in="a"]');
    var inB = demo.querySelector('[data-in="b"]');
    var op = demo.querySelector('[data-in="op"]');
    var cin = demo.querySelector('[data-in="cf"]');
    var out = demo.querySelector(".m10-out");
    var chips = demo.querySelector(".m10-chips");
    var status = demo.querySelector(".ds-deck__status");

    function calc() {
      var a = parseHex(inA.value), b = parseHex(inB.value);
      if (a === null || b === null) { status.innerHTML = "A ve B için 00–FF arası onaltılı değer girin."; return; }
      var o = op.value, c = cin.checked ? 1 : 0, r, cf = 0, of = 0, af = 0, used = o === "ADC" || o === "SBB";
      if (!used) c = 0;
      if (o === "ADD" || o === "ADC") {
        r = a + b + c; cf = r > 255 ? 1 : 0; r &= 255;
        af = ((a ^ b ^ r) & 0x10) ? 1 : 0; of = ((a ^ r) & (b ^ r) & 0x80) ? 1 : 0;
      } else if (o === "SUB" || o === "SBB" || o === "CMP") {
        r = a - b - c; cf = r < 0 ? 1 : 0; r &= 255;
        af = ((a ^ b ^ r) & 0x10) ? 1 : 0; of = ((a ^ b) & (a ^ r) & 0x80) ? 1 : 0;
      } else {
        r = o === "AND" ? a & b : o === "OR" ? a | b : a ^ b;
      }
      var zf = r === 0 ? 1 : 0, sf = r & 0x80 ? 1 : 0, pf = parity(r);
      var sym = { ADD: "+", ADC: "+", SUB: "−", SBB: "−", CMP: "−", AND: "AND", OR: "OR", XOR: "XOR" }[o];
      out.innerHTML = bitsRow("A", a, hex2(a) + " = " + a + " / " + signed8(a)) +
        bitsRow(sym + " B", b, hex2(b) + " = " + b + " / " + signed8(b)) +
        bitsRow("sonuç", r, hex2(r) + " = " + r + " / " + signed8(r), [1, 1, 1, 1, 1, 1, 1, 1]);
      var flags = [["CF", cf], ["ZF", zf], ["SF", sf], ["OF", of], ["PF", pf]];
      if (o.length === 3 && o !== "AND" && o !== "XOR") flags.push(["AF", af]);
      chips.innerHTML = flags.map(function (f) { return "<span class=\"" + (f[1] ? "on" : "") + "\">" + f[0] + " = " + f[1] + "</span>"; }).join("");
      var msg = "İşaretsiz yorum: " + a + " " + sym + " " + b + (used ? " " + (o === "ADC" ? "+" : "−") + " " + c : "") + " → " + r;
      if (cf && (o === "ADD" || o === "ADC")) msg += " (<b>CF = 1</b>: 255'i aştı)";
      if (cf && (o === "SUB" || o === "SBB" || o === "CMP")) msg += " (<b>CF = 1</b>: ödünç alındı, a &lt; b)";
      if (of) msg += " · <b>OF = 1</b>: işaretli sonuç −128…127 dışında";
      if (o === "CMP") msg += " · CMP sonucu yazmaz, yalnız bayrakları kurar";
      if (o === "AND" || o === "OR" || o === "XOR") msg += " · mantık komutlarında CF = OF = 0";
      status.innerHTML = msg;
    }
    [inA, inB, op, cin].forEach(function (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); });
    calc();
  });

  /* ---------- kaydırma / döndürme gezgini ---------- */
  document.querySelectorAll('.ds-deck [data-demo="m10-shift"]').forEach(function (demo) {
    var inV = demo.querySelector('[data-in="v"]');
    var out = demo.querySelector(".m10-out");
    var status = demo.querySelector(".ds-deck__status");
    var v = parseHex(inV.value) || 0, cf = 0;

    function render(prev, hot) {
      out.innerHTML = (prev !== null ? bitsRow("önce", prev, hex2(prev)) : "") +
        bitsRow("AL", v, hex2(v) + " = " + v + " / " + signed8(v), hot) +
        "<div class=\"m10-chips\"><span class=\"" + (cf ? "on" : "") + "\">CF = " + cf + "</span></div>";
    }
    inV.addEventListener("input", function () {
      var x = parseHex(inV.value);
      if (x === null) { status.innerHTML = "00–FF arası onaltılı değer girin."; return; }
      v = x; render(null); status.innerHTML = "AL = <b>" + hex2(v) + "</b>. Bir komut seçin.";
    });
    demo.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-op]");
      if (!b) return;
      var o = b.dataset.op, prev = v, msb = (v >> 7) & 1, lsb = v & 1, hot = [0, 0, 0, 0, 0, 0, 0, 0], msg;
      if (o === "cf") { cf ^= 1; render(null); status.innerHTML = "CF = <b>" + cf + "</b> (RCL/RCR bu biti içeri alır)."; return; }
      if (o === "shl") { cf = msb; v = (v << 1) & 255; hot[7] = 1; msg = "Sola kaydırıldı, sağdan 0 girdi; çıkan b7 = " + msb + " → CF. Değer ×2 (mod 256)."; }
      if (o === "shr") { cf = lsb; v = v >> 1; hot[0] = 1; msg = "Sağa kaydırıldı, soldan 0 girdi; çıkan b0 = " + lsb + " → CF. İşaretsiz ÷2."; }
      if (o === "sar") { cf = lsb; v = (v >> 1) | (v & 0x80); hot[0] = 1; msg = "Aritmetik sağa kaydırma: işaret biti (" + msb + ") korundu. İşaretli ÷2: " + signed8(prev) + " → " + signed8(v) + "."; }
      if (o === "rol") { cf = msb; v = ((v << 1) | msb) & 255; hot[7] = 1; msg = "b7 = " + msb + " hem b0'a hem CF'ye gitti."; }
      if (o === "ror") { cf = lsb; v = (v >> 1) | (lsb << 7); hot[0] = 1; msg = "b0 = " + lsb + " hem b7'ye hem CF'ye gitti."; }
      if (o === "rcl") { var c1 = cf; cf = msb; v = ((v << 1) | c1) & 255; hot[7] = 1; msg = "Eski CF (" + c1 + ") b0'a girdi, b7 (" + msb + ") CF'ye çıktı."; }
      if (o === "rcr") { var c2 = cf; cf = lsb; v = (v >> 1) | (c2 << 7); hot[0] = 1; msg = "Eski CF (" + c2 + ") b7'ye girdi, b0 (" + lsb + ") CF'ye çıktı."; }
      inV.value = hex2(v).slice(0, 2);
      render(prev, hot);
      status.innerHTML = "<b>" + o.toUpperCase() + " AL, 1</b>: " + msg;
    });
    render(null);
    status.innerHTML = "AL = <b>" + hex2(v) + "</b>. Bir komut seçin.";
  });
})();
