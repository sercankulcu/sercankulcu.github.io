/* Bölüm 3: Assembly — etkileşimli demolar (AX yazmacı, fiziksel adres, bayrak hesaplayıcı) */
(function () {
  function parseHex(s, max) {
    s = String(s || "").trim().replace(/h$/i, "");
    if (!/^[0-9a-f]+$/i.test(s)) return null;
    var v = parseInt(s, 16);
    return v > max ? null : v;
  }
  function hex(v, n) { var s = v.toString(16).toUpperCase(); while (s.length < n) s = "0" + s; return s; }
  function bin(v, n) { var s = v.toString(2); while (s.length < n) s = "0" + s; return s; }
  function cells(box, list) {
    box.innerHTML = list.map(function (c) {
      return '<span' + (c.hot ? ' class="is-hot"' : "") + "><i>" + c.top + "</i><b>" + c.val + "</b></span>";
    }).join("");
  }

  /* AX = AH:AL */
  document.querySelectorAll('.ds-deck [data-demo="m03-reg"]').forEach(function (demo) {
    var inp = demo.querySelector("input");
    var bits = demo.querySelector("[data-bits]");
    var out = demo.querySelector("[data-out]");
    var status = demo.querySelector(".ds-deck__status");
    function upd() {
      var v = parseHex(inp.value, 0xFFFF);
      if (v === null) { status.innerHTML = "0000–FFFF arası onaltılık bir değer girin."; return; }
      var list = [];
      for (var b = 15; b >= 0; b--) list.push({ top: b, val: (v >> b) & 1, hot: b >= 8 });
      cells(bits, list);
      var signed = v >= 0x8000 ? v - 0x10000 : v;
      out.innerHTML = "AX = <b>" + hex(v, 4) + "h</b> · AH = <b>" + hex(v >> 8, 2) + "h</b> · AL = <b>" + hex(v & 255, 2) + "h</b><br>" +
        "işaretsiz " + v + " · işaretli " + signed;
      status.innerHTML = "Turuncu: AH (bit 15–8) · mavi: AL (bit 7–0)";
    }
    inp.addEventListener("input", upd);
    upd();
  });

  /* kesim:bağıl konum → fiziksel adres */
  document.querySelectorAll('.ds-deck [data-demo="m03-phys"]').forEach(function (demo) {
    var ins = demo.querySelectorAll("input");
    var out = demo.querySelector("[data-out]");
    var status = demo.querySelector(".ds-deck__status");
    function upd() {
      var s = parseHex(ins[0].value, 0xFFFF), o = parseHex(ins[1].value, 0xFFFF);
      if (s === null || o === null) { out.innerHTML = ""; status.innerHTML = "Her alana 0000–FFFF arası onaltılık değer girin."; return; }
      var base = s * 16, sum = base + o, p = sum & 0xFFFFF;
      out.innerHTML = hex(s, 4) + "h × 10h = " + hex(base, 5) + "h<br>" + hex(base, 5) + "h + " + hex(o, 4) + "h = <b>" + hex(p, 5) + "h</b>";
      var msg = "Normalize: <b>" + hex(p >> 4, 4) + ":" + hex(p & 15, 4) + "</b>";
      if (sum > 0xFFFFF) msg += " · 20 biti aştı (" + hex(sum, 6) + "h) → 8086'da başa sarar";
      if (p >= 0xB8000 && p < 0xB8FA0) {
        var k = (p - 0xB8000) >> 1;
        msg += " · metin ekranı: satır " + Math.floor(k / 80) + ", sütun " + (k % 80) + ((p & 1) ? " (renk baytı)" : " (karakter baytı)");
      }
      status.innerHTML = msg;
    }
    ins.forEach(function (i) { i.addEventListener("input", upd); });
    demo.querySelectorAll("[data-ex]").forEach(function (b) {
      b.addEventListener("click", function () {
        var p = b.getAttribute("data-ex").split(":");
        ins[0].value = p[0]; ins[1].value = p[1]; upd();
      });
    });
    upd();
  });

  /* 8 bit ADD/SUB bayrakları */
  document.querySelectorAll('.ds-deck [data-demo="m03-flags"]').forEach(function (demo) {
    var ins = demo.querySelectorAll("input");
    var op = demo.querySelector("[data-op]");
    var out = demo.querySelector("[data-out]");
    var fl = demo.querySelector("[data-flags]");
    var why = demo.querySelector("[data-why]");
    function sg(v) { return v >= 128 ? v - 256 : v; }
    function upd() {
      var a = parseHex(ins[0].value, 255), b = parseHex(ins[1].value, 255);
      if (a === null || b === null) { out.innerHTML = ""; fl.innerHTML = ""; why.innerHTML = "00–FF arası onaltılık değerler girin."; return; }
      var add = op.value === "add";
      var full = add ? a + b : a - b;
      var r = full & 255;
      var cf = add ? (full > 255 ? 1 : 0) : (a < b ? 1 : 0);
      var af = add ? (((a & 15) + (b & 15)) > 15 ? 1 : 0) : ((a & 15) < (b & 15) ? 1 : 0);
      var of = add ? (((a ^ r) & (b ^ r) & 128) ? 1 : 0) : (((a ^ b) & (a ^ r) & 128) ? 1 : 0);
      var ones = bin(r, 8).split("").filter(function (c) { return c === "1"; }).length;
      var pf = ones % 2 === 0 ? 1 : 0, zf = r === 0 ? 1 : 0, sf = r >> 7;
      var sym = add ? "+" : "−";
      out.innerHTML = hex(a, 2) + "h " + sym + " " + hex(b, 2) + "h = <b>" + hex(r, 2) + "h</b> (" + bin(r, 8) + "b)<br>" +
        "işaretsiz: " + a + " " + sym + " " + b + " = " + (add ? a + b : a - b) + " → " + r +
        " · işaretli: " + sg(a) + " " + sym + " " + sg(b) + " = " + (add ? sg(a) + sg(b) : sg(a) - sg(b)) + " → " + sg(r);
      cells(fl, [
        { top: "CF", val: cf, hot: cf }, { top: "ZF", val: zf, hot: zf }, { top: "SF", val: sf, hot: sf },
        { top: "OF", val: of, hot: of }, { top: "PF", val: pf, hot: pf }, { top: "AF", val: af, hot: af }
      ]);
      why.innerHTML = "<b>CF</b>: " + (add ? "işaretsiz toplam 255'i aştı mı?" : "işaretsiz çıkarmada ödünç gerekti mi (a &lt; b)?") +
        " · <b>OF</b>: işaretli sonuç −128…127 dışında mı? · <b>PF</b>: sonuçta " + ones + " adet 1 → " + (pf ? "çift" : "tek") +
        " · <b>AF</b>: alt 4 bitte " + (add ? "elde" : "ödünç") + (af ? " var" : " yok");
    }
    ins.forEach(function (i) { i.addEventListener("input", upd); });
    op.addEventListener("change", upd);
    upd();
  });
})();
