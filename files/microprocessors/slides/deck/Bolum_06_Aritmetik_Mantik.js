/* Bölüm 6: Aritmetik ve Mantıksal İşlemler sunumu demoları */
(function () {
  const EN = String(document.getElementById("ds-deck").getAttribute("lang")).toLowerCase().indexOf("en") === 0;
  const tx = (tr, en) => EN ? en : tr;
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
  function sd(n) { return n < 0 ? "−" + -n : String(n); }

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
        out.innerHTML = ""; status.innerHTML = tx(n + " bitlik aralık dışında; değerler " + lo + " … " + lim + " arasında olmalı.", "Out of the " + n + "-bit range; values must be between " + lo + " … " + lim + ".");
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
      var rows = '<div class="m06-bits">' + tx("hedef  ", "dest   ") + bin(a, n) + "  = " + hex(a, w) + "h</div>";
      if (!one) rows += '<div class="m06-bits">' + tx("kaynak ", "src    ") + bin(b, n) + "  = " + hex(b, w) + "h</div>";
      rows += '<div class="m06-bits"><b>' + tx("sonuç  ", "result ") + bin(r, n) + "  = " + hex(r, w) + "h</b>  (" + tx("işaretsiz ", "unsigned ") + r + tx(", işaretli ", ", signed ") + sd(signed(r, n)) + ")</div>";
      var chips = Object.keys(f).map(function (k) {
        return '<span class="' + (f[k] === 1 ? "is-on" : "") + '">' + k + " = " + f[k] + "</span>";
      }).join("");
      out.innerHTML = rows + '<div class="m06-chips">' + chips + "</div>";
      status.innerHTML = store ? tx("Sonuç hedefe yazılır.", "The result is written to dest.") : "<b>" + op + "</b>" + tx(" sonucu saklamaz; yalnızca bayraklar değişir.", " stores no result; only the flags change.");
      if (f.AF === "?") status.innerHTML += tx(" AF tanımsızdır; CF ve OF daima 0.", " AF is undefined; CF and OF are always 0.");
      if (op === "INC" || op === "DEC") status.innerHTML += tx(" INC/DEC CF'yi değiştirmez.", " INC/DEC leave CF unchanged.");
      if (op === "NOT") status.innerHTML += tx(" NOT hiçbir bayrağı etkilemez.", " NOT affects no flags.");
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
        out.innerHTML = ""; status.innerHTML = tx("Değerler seçilen boyuta sığmalı (" + q("alab").textContent + ": " + an + " bit, işlenen: " + n + " bit).", "Values must fit the chosen size (" + q("alab").textContent + ": " + an + " bits, operand: " + n + " bits).");
        return;
      }
      var au = ((a % aMax) + aMax) % aMax, bu = ((b % bMax) + bMax) % bMax;
      var av = sg ? (au >= aMax / 2 ? au - aMax : au) : au, bv = sg ? (bu >= bMax / 2 ? bu - bMax : bu) : bu;
      var html = "", msg = "";
      if (isMul) {
        var p = av * bv, P = Math.pow(2, 2 * n), pu = ((p % P) + P) % P;
        var hi = Math.floor(pu / bMax), lo = pu % bMax;
        var fits = sg ? (p >= -bMax / 2 && p < bMax / 2) : p < bMax;
        html = '<div class="m06-bits">' + sd(av) + " × " + sd(bv) + " = <b>" + sd(p) + "</b></div>";
        html += '<div class="m06-chips">' + (n === 8 ? reg("AX", pu, 4) + "<span>AH = " + hex(hi, 2) + "h</span><span>AL = " + hex(lo, 2) + "h</span>" :
          reg("DX", hi, 4) + reg("AX", lo, 4)) + '<span class="' + (fits ? "" : "is-on") + '">CF = OF = ' + (fits ? 0 : 1) + "</span></div>";
        msg = fits ? tx("Sonuç alt yarıya sığdı; üst yarı yalnızca " + (sg ? "işaret uzantısı" : "sıfır") + ".", "The result fits in the lower half; the upper half is just " + (sg ? "sign extension" : "zero") + ".") : tx("Sonuç üst yarıya taştı → CF = OF = 1.", "The result spills into the upper half → CF = OF = 1.");
      } else {
        if (bv === 0) { out.innerHTML = '<div class="m06-bits"><b>' + tx("Bölme hatası", "Divide error") + ' → INT 0</b></div>'; status.innerHTML = tx("Sıfıra bölme.", "Division by zero."); return; }
        var qt = Math.trunc(av / bv), rm = av - qt * bv;
        var ok = sg ? (qt >= -bMax / 2 && qt < bMax / 2) : qt < bMax;
        html = '<div class="m06-bits">' + sd(av) + " / " + sd(bv) + tx(" → bölüm <b>", " → quotient <b>") + sd(qt) + tx("</b>, kalan <b>", "</b>, remainder <b>") + sd(rm) + "</b></div>";
        if (!ok) { out.innerHTML = html + '<div class="m06-bits"><b>' + tx("Bölme hatası", "Divide error") + ' → INT 0</b></div>'; status.innerHTML = tx("Bölüm " + (n === 8 ? "AL'ye" : "AX'e") + " sığmıyor.", "The quotient does not fit in " + (n === 8 ? "AL" : "AX") + "."); return; }
        var qu = ((qt % bMax) + bMax) % bMax, ru = ((rm % bMax) + bMax) % bMax, w = n / 4;
        html += '<div class="m06-chips">' + reg(n === 8 ? "AL" : "AX", qu, w) + reg(n === 8 ? "AH" : "DX", ru, w) + "<span>" + tx("bayraklar tanımsız", "flags undefined") + "</span></div>";
        msg = sg ? tx("IDIV sıfıra doğru keser; kalan bölünenle aynı işaretli.", "IDIV truncates toward zero; the remainder has the sign of the dividend.") : tx("Bölüm " + (n === 8 ? "AL" : "AX") + ", kalan " + (n === 8 ? "AH" : "DX") + ".", "Quotient in " + (n === 8 ? "AL" : "AX") + ", remainder in " + (n === 8 ? "AH" : "DX") + ".");
      }
      out.innerHTML = html;
      status.innerHTML = msg;
    }
    demo.querySelectorAll("input, select").forEach(function (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); });
    calc();
  });
})();

/* kaydırma / döndürme gezgini (Komut Kümesi sunumundan taşındı) */
(function () {
  const EN = String(document.getElementById("ds-deck").getAttribute("lang")).toLowerCase().indexOf("en") === 0;
  const tx = (tr, en) => EN ? en : tr;
  function hex2(v) { return ("0" + (v & 0xFF).toString(16).toUpperCase()).slice(-2) + "h"; }
  function bin8(v) { return ("0000000" + (v & 0xFF).toString(2)).slice(-8); }
  function signed8(v) { v &= 0xFF; return v > 127 ? v - 256 : v; }
  function sd(n) { return n < 0 ? "−" + -n : String(n); }
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
  document.querySelectorAll('.ds-deck [data-demo="m10-shift"]').forEach(function (demo) {
    var inV = demo.querySelector('[data-in="v"]');
    var out = demo.querySelector(".m10-out");
    var status = demo.querySelector(".ds-deck__status");
    var v = parseHex(inV.value) || 0, cf = 0;

    function render(prev, hot) {
      out.innerHTML = (prev !== null ? bitsRow(tx("önce", "before"), prev, hex2(prev)) : "") +
        bitsRow("AL", v, hex2(v) + " = " + v + " / " + sd(signed8(v)), hot) +
        "<div class=\"m10-chips\"><span class=\"" + (cf ? "on" : "") + "\">CF = " + cf + "</span></div>";
    }
    inV.addEventListener("input", function () {
      var x = parseHex(inV.value);
      if (x === null) { status.innerHTML = tx("Geçerli değer: 00–FF arası onaltılık sayı.", "Valid value: a hex number 00–FF."); return; }
      v = x; render(null); status.innerHTML = "AL = <b>" + hex2(v) + "</b>. " + tx("Bir komut düğmesi seçilince sonuç burada görünür.", "Pick an instruction button to see the result here.");
    });
    demo.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-op]");
      if (!b) return;
      var o = b.dataset.op, prev = v, msb = (v >> 7) & 1, lsb = v & 1, hot = [0, 0, 0, 0, 0, 0, 0, 0], msg;
      if (o === "cf") { cf ^= 1; render(null); status.innerHTML = "CF = <b>" + cf + "</b> " + tx("(RCL/RCR bu biti içeri alır).", "(RCL/RCR shift this bit in)."); return; }
      if (o === "shl") { cf = msb; v = (v << 1) & 255; hot[7] = 1; msg = tx("Sola kaydırıldı, sağdan 0 girdi; çıkan b7 = " + msb + " → CF. Değer ×2 (mod 256).", "Shifted left, 0 entered on the right; b7 = " + msb + " went out → CF. Value ×2 (mod 256)."); }
      if (o === "shr") { cf = lsb; v = v >> 1; hot[0] = 1; msg = tx("Sağa kaydırıldı, soldan 0 girdi; çıkan b0 = " + lsb + " → CF. İşaretsiz ÷2.", "Shifted right, 0 entered on the left; b0 = " + lsb + " went out → CF. Unsigned ÷2."); }
      if (o === "sar") { cf = lsb; v = (v >> 1) | (v & 0x80); hot[0] = 1; msg = tx("Aritmetik sağa kaydırma: işaret biti (" + msb + ") korundu. İşaretli ÷2: ", "Arithmetic shift right: the sign bit (" + msb + ") is kept. Signed ÷2: ") + sd(signed8(prev)) + " → " + sd(signed8(v)) + "."; }
      if (o === "rol") { cf = msb; v = ((v << 1) | msb) & 255; hot[7] = 1; msg = "b7 = " + msb + tx(" hem b0'a hem CF'ye gitti.", " went to both b0 and CF."); }
      if (o === "ror") { cf = lsb; v = (v >> 1) | (lsb << 7); hot[0] = 1; msg = "b0 = " + lsb + tx(" hem b7'ye hem CF'ye gitti.", " went to both b7 and CF."); }
      if (o === "rcl") { var c1 = cf; cf = msb; v = ((v << 1) | c1) & 255; hot[7] = 1; msg = tx("Eski CF (" + c1 + ") b0'a girdi, b7 (" + msb + ") CF'ye çıktı.", "Old CF (" + c1 + ") entered b0, b7 (" + msb + ") went out to CF."); }
      if (o === "rcr") { var c2 = cf; cf = lsb; v = (v >> 1) | (c2 << 7); hot[0] = 1; msg = tx("Eski CF (" + c2 + ") b7'ye girdi, b0 (" + lsb + ") CF'ye çıktı.", "Old CF (" + c2 + ") entered b7, b0 (" + lsb + ") went out to CF."); }
      inV.value = hex2(v).slice(0, 2);
      render(prev, hot);
      status.innerHTML = "<b>" + o.toUpperCase() + " AL, 1</b>: " + msg;
    });
    render(null);
    status.innerHTML = "AL = <b>" + hex2(v) + "</b>. " + tx("Bir komut düğmesi seçilince sonuç burada görünür.", "Pick an instruction button to see the result here.");
  });
})();
