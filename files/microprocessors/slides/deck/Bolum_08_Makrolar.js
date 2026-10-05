/* Bölüm 8 Makrolar: makro genişletici (metin değiştirme + boyut karşılaştırması) */
document.querySelectorAll('.ds-deck [data-demo="m08-macro"]').forEach(function (demo) {
  var sel = demo.querySelector('[data-k="macro"]');
  var a = [demo.querySelector('[data-k="a1"]'), demo.querySelector('[data-k="a2"]'), demo.querySelector('[data-k="a3"]')];
  var nIn = demo.querySelector('[data-k="n"]');
  var callOut = demo.querySelector('[data-o="call"]');
  var expOut = demo.querySelector('[data-o="exp"]');
  var status = demo.querySelector(".ds-deck__status");

  /* body lines, parameter names, approximate size in bytes of one expansion, and size of an equivalent procedure body (incl. RET) */
  var M = {
    my: { name: "MyMacro", params: ["p1", "p2", "p3"], body: ["MOV AX, p1", "MOV BX, p2", "MOV CX, p3"], defs: ["1", "2", "3"] },
    putc: { name: "PUTC", params: ["char"], body: ["push ax", "mov  al, char", "mov  ah, 0eh", "int  10h", "pop  ax"], defs: ["'A'"], size: 8 },
    power: { name: "POWER", params: ["b", "e", "r"], body: ["mov  ax, 1", "mov  cx, e", "mov  bx, b", "??L:", "mul  bx", "loop ??L", "mov  r, ax"], defs: ["base", "exponent", "result"], size: 18 }
  };
  var REG16 = /^(AX|BX|CX|DX|SI|DI|BP|SP)$/i, REG8 = /^(AL|AH|BL|BH|CL|CH|DL|DH)$/i;

  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* rough 8086 size of "MOV r16, x" for MyMacro */
  function movSize(dst, src) {
    if (REG16.test(src) || REG8.test(src)) return 2;
    if (/^[-+]?[0-9]/.test(src) || /^'.'$/.test(src)) return 3;
    return dst.toUpperCase() === "AX" ? 3 : 4;
  }

  function sizeOf(m, args) {
    if (m.size) return m.size;
    return movSize("AX", args[0]) + movSize("BX", args[1]) + movSize("CX", args[2]);
  }

  function hexify(t) {
    if (/^[0-9]+$/.test(t)) { var v = parseInt(t, 10); if (v < 65536) return "0" + ("0000" + v.toString(16).toUpperCase()).slice(-4) + "h"; }
    return t;
  }

  function render(changed) {
    var m = M[sel.value];
    if (changed) m.defs.forEach(function (d, i) { a[i].value = d; });
    a.forEach(function (inp, i) { inp.disabled = i >= m.params.length; if (inp.disabled) inp.value = ""; });
    var args = m.params.map(function (p, i) { return a[i].value.trim(); });
    var n = Math.max(1, Math.min(200, parseInt(nIn.value, 10) || 1));
    if (args.some(function (x) { return !x; })) { status.innerHTML = "Tüm parametreleri doldurun."; return; }
    callOut.innerHTML = esc(m.name + " " + args.join(", ")) + (n > 1 ? "\n<span class=\"cm\">; … toplam " + n + " kez</span>" : "");
    var shown = Math.min(n, 2), out = [];
    for (var k = 0; k < shown; k++) {
      if (n > 1) out.push('<span class="cm">; ' + (k + 1) + '. kopya</span>');
      m.body.forEach(function (line) {
        var s = esc(line);
        m.params.forEach(function (p, i) {
          var val = sel.value === "my" ? hexify(args[i]) : args[i];
          s = s.replace(new RegExp("\\b" + p + "\\b", "g"), '<span class="hl">' + esc(val) + "</span>");
        });
        s = s.replace(/\?\?L/g, "??" + ("000" + k).slice(-4));
        out.push(s);
      });
    }
    if (n > 2) out.push('<span class="cm">; … ' + (n - 2) + " kopya daha</span>");
    expOut.innerHTML = out.join("\n");
    var one = sizeOf(m, args), proc = one + 1;
    var msg = "Bir kopya ≈ <b>" + one + " bayt</b>. " + n + " kullanım: makro ≈ <b>" + (one * n) + "</b> bayt, prosedür ≈ " + proc + " + " + n + " × 3 = <b>" + (proc + 3 * n) + "</b> bayt.";
    if (sel.value === "power" && n > 1) msg += " Dikkat: LOCAL olmasaydı <i>powerloop</i> etiketi tekrar ederdi; burada benzersiz adlar (??0000, ??0001) gösteriliyor.";
    if (sel.value === "my" && args.some(function (x, i) { return i > 0 && /^(AX|BX)$/i.test(x) && ["AX", "BX"].indexOf(x.toUpperCase()) < i; }))
      msg += " <b>Uyarı:</b> önceki satırda değişen bir yazmacı parametre olarak verdiniz; eski değeri okunmaz.";
    status.innerHTML = msg;
  }

  sel.addEventListener("change", function () { render(true); });
  a.concat([nIn]).forEach(function (inp) { inp.addEventListener("input", function () { render(false); }); });
  render(true);
});
