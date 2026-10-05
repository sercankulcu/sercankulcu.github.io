/* Bölüm 7 Akış Kontrolü demoları: atlama kodu hesaplayıcı ve CMP bayrak hesaplayıcı */
(function () {
  function hex(v, n) { return (v >>> 0).toString(16).toUpperCase().padStart(n, "0"); }
  function parseHex(s) {
    s = String(s).trim().replace(/h$/i, "");
    if (!/^[0-9a-f]{1,4}$/i.test(s)) return null;
    return parseInt(s, 16);
  }
  /* "FBh", "0x7f", "-5", "200" → 0..255 */
  function parseByte(s) {
    s = String(s).trim();
    var v;
    if (/^[0-9a-f]+h$/i.test(s)) v = parseInt(s.slice(0, -1), 16);
    else if (/^0x[0-9a-f]+$/i.test(s)) v = parseInt(s.slice(2), 16);
    else if (/^-?\d+$/.test(s)) v = parseInt(s, 10);
    else return null;
    if (v < -128 || v > 255) return null;
    return v & 0xFF;
  }
  function sgn(v) { return v >= 128 ? v - 256 : v; }
  function bits(v) { var b = v.toString(2).padStart(8, "0"); return b.slice(0, 4) + " " + b.slice(4); }

  /* ---------- atlama kodu ---------- */
  document.querySelectorAll('.ds-deck [data-demo="m07a-disp"]').forEach(function (demo) {
    var op = demo.querySelector('[data-k="op"]');
    var at = demo.querySelector('[data-k="at"]');
    var to = demo.querySelector('[data-k="to"]');
    var res = demo.querySelector('[data-k="res"]');
    var status = demo.querySelector(".ds-deck__status");
    function run() {
      var p = op.value.split("|"), code = p[0], len = parseInt(p[1], 10), name = p[2];
      var a = parseHex(at.value), t = parseHex(to.value);
      if (a === null || t === null) {
        res.innerHTML = "";
        status.innerHTML = "Adresleri 1–4 haneli onaltılık girin (ör. <b>010C</b>).";
        return;
      }
      var next = (a + len) & 0xFFFF;
      var d = t - next;
      if (d > 32767) d -= 65536;
      if (d < -32768) d += 65536;
      var html = "sonraki IP = " + hex(a, 4) + "h + " + len + " = <b>" + hex(next, 4) + "h</b><br>uzaklık = " +
        hex(t, 4) + "h − " + hex(next, 4) + "h = <b>" + (d >= 0 ? "+" : "−") + Math.abs(d) + "</b>";
      if (len === 2) {
        if (d < -128 || d > 127) {
          res.innerHTML = html;
          status.innerHTML = "<b>Menzil dışı!</b> rel8 yalnızca −128…+127 olabilir. Ters koşul + JMP NEAR kullanın.";
          return;
        }
        res.innerHTML = html + "<br>rel8 = " + hex(d & 0xFF, 2) + "h → makine kodu <b>" + code + " " + hex(d & 0xFF, 2) + "</b>";
      } else {
        var r = d & 0xFFFF;
        res.innerHTML = html + "<br>rel16 = " + hex(r, 4) + "h → makine kodu <b>" + code + " " + hex(r & 0xFF, 2) + " " + hex(r >> 8, 2) + "</b> (küçük uçlu)";
      }
      status.innerHTML = name + " " + hex(a, 4) + "h adresinde, hedef " + hex(t, 4) + "h.";
    }
    [op, at, to].forEach(function (el) { el.addEventListener("input", run); el.addEventListener("change", run); });
    run();
  });

  /* ---------- CMP bayrakları ---------- */
  var JUMPS = [
    ["JE/JZ", function (f) { return f.ZF; }],
    ["JNE/JNZ", function (f) { return !f.ZF; }],
    ["JA", function (f) { return !f.CF && !f.ZF; }],
    ["JAE/JNC", function (f) { return !f.CF; }],
    ["JB/JC", function (f) { return f.CF; }],
    ["JBE", function (f) { return f.CF || f.ZF; }],
    ["JG", function (f) { return !f.ZF && f.SF === f.OF; }],
    ["JGE", function (f) { return f.SF === f.OF; }],
    ["JL", function (f) { return f.SF !== f.OF; }],
    ["JLE", function (f) { return f.ZF || f.SF !== f.OF; }],
    ["JS", function (f) { return f.SF; }],
    ["JNS", function (f) { return !f.SF; }],
    ["JO", function (f) { return f.OF; }],
    ["JNO", function (f) { return !f.OF; }],
    ["JP", function (f) { return f.PF; }],
    ["JNP", function (f) { return !f.PF; }]
  ];
  document.querySelectorAll('.ds-deck [data-demo="m07a-cmp"]').forEach(function (demo) {
    var ia = demo.querySelector('[data-k="a"]');
    var ib = demo.querySelector('[data-k="b"]');
    var res = demo.querySelector('[data-k="res"]');
    var flags = demo.querySelector('[data-k="flags"]');
    var jumps = demo.querySelector('[data-k="jumps"]');
    var status = demo.querySelector(".ds-deck__status");
    function run() {
      var a = parseByte(ia.value), b = parseByte(ib.value);
      if (a === null || b === null) {
        res.innerHTML = ""; flags.innerHTML = ""; jumps.innerHTML = "";
        status.innerHTML = "Değerler −128…255 aralığında olmalı (ör. <b>-5</b>, <b>200</b>, <b>7Fh</b>).";
        return;
      }
      var r = (a - b) & 0xFF;
      var ones = r.toString(2).split("").filter(function (c) { return c === "1"; }).length;
      var f = {
        CF: a < b ? 1 : 0,
        ZF: r === 0 ? 1 : 0,
        SF: r & 0x80 ? 1 : 0,
        OF: ((a ^ b) & (a ^ r) & 0x80) ? 1 : 0,
        PF: ones % 2 === 0 ? 1 : 0,
        AF: (a & 0xF) < (b & 0xF) ? 1 : 0
      };
      res.innerHTML = "A = " + bits(a) + " (" + hex(a, 2) + "h: " + a + " / " + sgn(a) + ")<br>" +
        "B = " + bits(b) + " (" + hex(b, 2) + "h: " + b + " / " + sgn(b) + ")<br>" +
        "A − B = " + bits(r) + " = <b>" + hex(r, 2) + "h</b>";
      flags.innerHTML = ["CF", "ZF", "SF", "OF", "PF", "AF"].map(function (k) {
        return '<span class="' + (f[k] ? "is-set" : "") + '">' + k + "=" + f[k] + "</span>";
      }).join("");
      jumps.innerHTML = JUMPS.map(function (j) {
        var yes = !!j[1](f);
        return '<span class="' + (yes ? "is-yes" : "is-no") + '">' + j[0] + "</span>";
      }).join("");
      var u = a > b ? "&gt;" : a < b ? "&lt;" : "=";
      var s = sgn(a) > sgn(b) ? "&gt;" : sgn(a) < sgn(b) ? "&lt;" : "=";
      status.innerHTML = "işaretsiz: " + a + " " + u + " " + b + " · işaretli: " + sgn(a) + " " + s + " " + sgn(b);
    }
    [ia, ib].forEach(function (el) { el.addEventListener("input", run); });
    run();
  });
})();
