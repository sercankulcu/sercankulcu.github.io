/* Bölüm 4: Bellek Erişimi — etkin adres hesaplayıcı */
(function () {
  function hex(v, n) { var s = v.toString(16).toUpperCase(); while (s.length < n) s = "0" + s; return s; }
  function parseHex(s) {
    s = String(s || "").trim().replace(/h$/i, "");
    if (!/^[0-9a-f]{1,4}$/i.test(s)) return null;
    return parseInt(s, 16);
  }
  function parseDisp(s) {
    s = String(s || "").trim();
    if (s === "") return 0;
    var neg = false;
    if (s[0] === "-" || s[0] === "+") { neg = s[0] === "-"; s = s.slice(1).trim(); }
    var v;
    if (/^[0-9][0-9a-f]*h$/i.test(s)) v = parseInt(s.slice(0, -1), 16);
    else if (/^[0-9]+$/.test(s)) v = parseInt(s, 10);
    else return null;
    if (neg) v = -v;
    return (v < -32768 || v > 65535) ? null : v;
  }

  document.querySelectorAll('.ds-deck [data-demo="m04-ea"]').forEach(function (demo) {
    var out = demo.querySelector("[data-out]");
    var status = demo.querySelector(".ds-deck__status");
    function get(k) { return demo.querySelector('[data-k="' + k + '"]'); }
    function upd() {
      var base = get("base").value, index = get("index").value, ovr = get("ovr").value;
      var disp = parseDisp(get("disp").value);
      var regs = {}, bad = [];
      ["BX", "BP", "SI", "DI", "DS", "ES", "SS", "CS"].forEach(function (r) {
        var v = parseHex(get(r).value);
        if (v === null) bad.push(r);
        regs[r] = v;
      });
      if (disp === null) bad.push("kaydırma");
      if (bad.length) { out.innerHTML = ""; status.innerHTML = "Geçersiz değer: " + bad.join(", "); return; }
      var parts = [], terms = [], ea = 0;
      if (base) { parts.push(base); terms.push(base + " (" + hex(regs[base], 4) + "h)"); ea += regs[base]; }
      if (index) { parts.push(index); terms.push(index + " (" + hex(regs[index], 4) + "h)"); ea += regs[index]; }
      var hasDisp = disp !== 0 || (!base && !index);
      if (hasDisp) {
        var d16 = disp & 0xFFFF;
        parts.push(disp < 0 ? String(disp) : hex(d16, 4) + "h");
        terms.push(disp < 0 ? "(" + disp + ")" : hex(d16, 4) + "h");
        ea += disp;
      }
      ea = ((ea % 65536) + 65536) % 65536;
      var seg = ovr || (base === "BP" ? "SS" : "DS");
      var phys = (regs[seg] * 16 + ea) & 0xFFFFF;
      var mode;
      if (!base && !index) mode = "doğrudan (direct)";
      else if (base && index) mode = "tabanlı-indisli" + (hasDisp ? " + kaydırma" : "");
      else if (base) mode = hasDisp ? "tabanlı (based)" : "yazmaç dolaylı";
      else mode = hasDisp ? "indisli (indexed)" : "yazmaç dolaylı";
      var dsize = !hasDisp || (!base && !index) ? (!base && !index ? "d16" : "") : (disp >= -128 && disp <= 127 ? "d8" : "d16");
      var txt = (ovr ? ovr + ":" : "") + "[" + parts.join(" + ").replace("+ -", "- ") + "]";
      out.innerHTML = "<b>" + txt + "</b><br>EA = " + terms.join(" + ") + " = <b>" + hex(ea, 4) + "h</b><br>" +
        seg + " × 10h + EA = " + hex(regs[seg] * 16, 5) + "h + " + hex(ea, 4) + "h = <b>" + hex(phys, 5) + "h</b>";
      status.innerHTML = "Mod: <b>" + mode + "</b>" + (dsize ? " · kaydırma: " + dsize : "") +
        " · kesim: <b>" + seg + "</b>" + (ovr ? " (önek)" : base === "BP" ? " (BP → SS)" : " (varsayılan DS)");
    }
    demo.querySelectorAll("input, select").forEach(function (e) {
      e.addEventListener("input", upd); e.addEventListener("change", upd);
    });
    upd();
  });
})();
