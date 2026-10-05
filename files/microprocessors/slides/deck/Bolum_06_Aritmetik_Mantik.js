/* Bölüm 6: Aritmetik ve Mantıksal İşlemler sunumu demoları */
(function () {
  function hex(n, w) { return (n >>> 0).toString(16).toUpperCase().padStart(w, "0"); }
  function bin(n, bits) { return (n >>> 0).toString(2).padStart(bits, "0").replace(/(.{4})(?=.)/g, "$1 "); }
  function parity(v) { var c = 0; v &= 0xFF; while (v) { c += v & 1; v >>= 1; } return c % 2 === 0 ? 1 : 0; }
  function parse(t) {
    t = String(t).trim().replace(/[\s_]/g, "");
    var neg = false;
    if (t[0] === "-") { neg = true; t = t.slice(1); }
    var v = NaN;
    if (/^[0-9]+$/.test(t)) v = parseInt(t, 10);
    else if (/^[0-9][0-9a-f]*h$/i.test(t) || /^[a-f][0-9a-f]*h$/i.test(t)) v = parseInt(t.slice(0, -1), 16);
    else if (/^[01]+b$/i.test(t)) v = parseInt(t.slice(0, -1), 2);
    else if (/^0x[0-9a-f]+$/i.test(t)) v = parseInt(t.slice(2), 16);
    return neg ? -v : v;
  }
  function signed(v, n) { return v >= (1 << (n - 1)) ? v - (1 << n) : v; }

  /* Bayrak hesaplayıcı */
  document.querySelectorAll('.ds-deck [data-demo="m06-flags"]').forEach(function (demo) {
    var q = function (k) { return demo.querySelector('[data-k="' + k + '"]'); };
    var out = demo.querySelector(".m06-flag-out");
    var status = demo.querySelector(".ds-deck__status");
    function calc() {
      var op = q("op").value, n = parseInt(q("size").value, 10), M = n === 8 ? 0xFF : 0xFFFF, S = 1 << (n - 1);
      var one = ["INC", "DEC", "NEG", "NOT"].indexOf(op) >= 0;
      q("b").disabled = one;
      var a = parse(q("a").value), b = one ? 0 : parse(q("b").value);
      var lim = n === 8 ? 255 : 65535, lo = n === 8 ? -128 : -32768;
      if (isNaN(a) || isNaN(b) || a < lo || a > lim || b < lo || b > lim) {
        out.innerHTML = ""; status.innerHTML = n + " bitlik aralıkta değer girin (" + lo + " … " + lim + ").";
        return;
      }
      a &= M; b &= M;
      var r, f = { CF: null, ZF: null, SF: null, OF: null, PF: null, AF: null }, store = true;
      if (op === "ADD" || op === "INC") {
        if (op === "INC") b = 1;
        r = a + b; f.CF = op === "INC" ? "—" : (r > M ? 1 : 0); f.AF = ((a ^ b ^ r) & 0x10) ? 1 : 0;
        f.OF = ((a ^ r) & (b ^ r) & S) ? 1 : 0;
      } else if (op === "SUB" || op === "CMP" || op === "DEC" || op === "NEG") {
        var x = a, y = b;
        if (op === "DEC") y = 1;
        if (op === "NEG") { x = 0; y = a; }
        r = (x - y) & M; f.CF = op === "DEC" ? "—" : (x < y ? 1 : 0); f.AF = ((x ^ y ^ r) & 0x10) ? 1 : 0;
        f.OF = ((x ^ y) & (x ^ r) & S) ? 1 : 0;
        if (op === "CMP") store = false;
      } else if (op === "NOT") {
        r = ~a & M; f = { CF: "—", ZF: "—", SF: "—", OF: "—", PF: "—", AF: "—" };
      } else {
        r = op === "OR" ? (a | b) : op === "XOR" ? (a ^ b) : (a & b);
        f.CF = 0; f.OF = 0; f.AF = "?";
        if (op === "TEST") store = false;
      }
      r &= M;
      if (op !== "NOT") { f.ZF = r === 0 ? 1 : 0; f.SF = (r & S) ? 1 : 0; f.PF = parity(r); }
      var w = n / 4;
      var rows = '<div class="m06-bits">hedef  ' + bin(a, n) + "  = " + hex(a, w) + "h</div>";
      if (!one) rows += '<div class="m06-bits">kaynak ' + bin(b, n) + "  = " + hex(b, w) + "h</div>";
      rows += '<div class="m06-bits"><b>sonuç  ' + bin(r, n) + "  = " + hex(r, w) + "h</b>  (işaretsiz " + r + ", işaretli " + signed(r, n) + ")</div>";
      var chips = Object.keys(f).map(function (k) {
        return '<span class="' + (f[k] === 1 ? "is-on" : "") + '">' + k + " = " + f[k] + "</span>";
      }).join("");
      out.innerHTML = rows + '<div class="m06-chips">' + chips + "</div>";
      status.innerHTML = store ? "Sonuç hedefe yazılır." : "<b>" + op + "</b> sonucu saklamaz; yalnızca bayraklar değişir.";
      if (f.AF === "?") status.innerHTML += " AF tanımsızdır; CF ve OF daima 0.";
      if (op === "INC" || op === "DEC") status.innerHTML += " INC/DEC CF'yi değiştirmez.";
      if (op === "NOT") status.innerHTML += " NOT hiçbir bayrağı etkilemez.";
    }
    demo.querySelectorAll("input, select").forEach(function (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); });
    calc();
  });

  /* Çarpma / bölme hesaplayıcı */
  document.querySelectorAll('.ds-deck [data-demo="m06-muldiv"]').forEach(function (demo) {
    var q = function (k) { return demo.querySelector('[data-k="' + k + '"]'); };
    var out = demo.querySelector(".m06-flag-out");
    var status = demo.querySelector(".ds-deck__status");
    function reg(name, v, w) { return '<span class="is-on">' + name + " = " + hex(v, w) + "h</span>"; }
    function calc() {
      var op = q("op").value, n = parseInt(q("size").value, 10), isMul = op.indexOf("MUL") >= 0, sg = op[0] === "I";
      var an = isMul ? n : 2 * n;
      q("alab").textContent = isMul ? (n === 8 ? "AL" : "AX") : (n === 8 ? "AX" : "DX:AX");
      var a = parse(q("a").value), b = parse(q("b").value);
      var aMax = Math.pow(2, an), bMax = Math.pow(2, n);
      if (isNaN(a) || isNaN(b) || a < -aMax / 2 || a >= aMax || b < -bMax / 2 || b >= bMax) {
        out.innerHTML = ""; status.innerHTML = "Değerler seçilen boyuta sığmalı (" + q("alab").textContent + ": " + an + " bit, işlenen: " + n + " bit).";
        return;
      }
      var au = ((a % aMax) + aMax) % aMax, bu = ((b % bMax) + bMax) % bMax;
      var av = sg ? (au >= aMax / 2 ? au - aMax : au) : au, bv = sg ? (bu >= bMax / 2 ? bu - bMax : bu) : bu;
      var html = "", msg = "";
      if (isMul) {
        var p = av * bv, P = Math.pow(2, 2 * n), pu = ((p % P) + P) % P;
        var hi = Math.floor(pu / bMax), lo = pu % bMax;
        var fits = sg ? (p >= -bMax / 2 && p < bMax / 2) : p < bMax;
        html = '<div class="m06-bits">' + av + " × " + bv + " = <b>" + p + "</b></div>";
        html += '<div class="m06-chips">' + (n === 8 ? reg("AX", pu, 4) + "<span>AH = " + hex(hi, 2) + "h</span><span>AL = " + hex(lo, 2) + "h</span>" :
          reg("DX", hi, 4) + reg("AX", lo, 4)) + '<span class="' + (fits ? "" : "is-on") + '">CF = OF = ' + (fits ? 0 : 1) + "</span></div>";
        msg = fits ? "Sonuç alt yarıya sığdı; üst yarı yalnızca " + (sg ? "işaret uzantısı" : "sıfır") + "." : "Sonuç üst yarıya taştı → CF = OF = 1.";
      } else {
        if (bv === 0) { out.innerHTML = '<div class="m06-bits"><b>Bölme hatası → INT 0</b></div>'; status.innerHTML = "Sıfıra bölme."; return; }
        var qt = Math.trunc(av / bv), rm = av - qt * bv;
        var ok = sg ? (qt >= -bMax / 2 && qt < bMax / 2) : qt < bMax;
        html = '<div class="m06-bits">' + av + " / " + bv + " → bölüm <b>" + qt + "</b>, kalan <b>" + rm + "</b></div>";
        if (!ok) { out.innerHTML = html + '<div class="m06-bits"><b>Bölme hatası → INT 0</b></div>'; status.innerHTML = "Bölüm " + (n === 8 ? "AL" : "AX") + "'ye sığmıyor."; return; }
        var qu = ((qt % bMax) + bMax) % bMax, ru = ((rm % bMax) + bMax) % bMax, w = n / 4;
        html += '<div class="m06-chips">' + reg(n === 8 ? "AL" : "AX", qu, w) + reg(n === 8 ? "AH" : "DX", ru, w) + "<span>bayraklar tanımsız</span></div>";
        msg = sg ? "IDIV sıfıra doğru keser; kalan bölünenle aynı işaretli." : "Bölüm " + (n === 8 ? "AL" : "AX") + ", kalan " + (n === 8 ? "AH" : "DX") + ".";
      }
      out.innerHTML = html;
      status.innerHTML = msg;
    }
    demo.querySelectorAll("input, select").forEach(function (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); });
    calc();
  });
})();
