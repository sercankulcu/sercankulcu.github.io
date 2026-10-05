/* Bölüm 1 Programlama Dilleri: 8 bitlik örnek makine dili için kodlayıcı / çözücü */
document.querySelectorAll('.ds-deck [data-demo="m01p-codec"]').forEach(function (demo) {
  var OPS = ["HALT", "ADD", "SUB", "AND", "OR"];
  var SYM = ["", "+", "−", "AND", "OR"];
  var selOp = demo.querySelector('[data-in="op"]');
  var selDst = demo.querySelector('[data-in="dst"]');
  var selSrc = demo.querySelector('[data-in="src"]');
  var inBin = demo.querySelector('[data-in="bin"]');
  var bits = demo.querySelector(".m01p-bits");
  var asm = demo.querySelector(".m01p-asmout");
  var status = demo.querySelector(".ds-deck__status");

  function pad(n, w) { var s = n.toString(2); while (s.length < w) s = "0" + s; return s; }
  function hex(n) { var s = n.toString(16).toUpperCase(); return (s.length < 2 ? "0" : "") + s + "h"; }

  function drawBits(byteStr) {
    bits.innerHTML = "";
    for (var i = 0; i < 8; i++) {
      var sp = document.createElement("span");
      sp.textContent = byteStr.charAt(i) || "·";
      sp.className = i < 4 ? "is-op" : (i < 6 ? "is-dst" : "is-src");
      if (i === 4 || i === 6) sp.className += " gap";
      bits.appendChild(sp);
    }
  }

  function show(op, dst, src) {
    var byte = (op << 4) | (dst << 2) | src;
    var b = pad(byte, 8);
    drawBits(b);
    if (op === 0) {
      asm.textContent = "HALT";
      status.innerHTML = "<b>" + b.slice(0, 4) + " " + b.slice(4) + "</b> = " + hex(byte) + " · programı durdurur" +
        (dst || src ? " (yazmaç alanları kullanılmaz)" : "");
    } else if (op <= 4) {
      asm.textContent = OPS[op] + " R" + dst + ", R" + src;
      status.innerHTML = "<b>" + b.slice(0, 4) + " " + b.slice(4) + "</b> = " + hex(byte) + " · R" + dst + " ← R" + dst + " " + SYM[op] + " R" + src;
    } else {
      asm.textContent = "??? (tanımsız işlem kodu " + pad(op, 4) + ")";
      status.innerHTML = hex(byte) + " · bu tasarımda yalnızca 0000–0100 tanımlı";
    }
    return b;
  }

  function fromSelects() {
    var op = +selOp.value, dst = +selDst.value, src = +selSrc.value;
    inBin.value = show(op, dst, src);
  }

  function fromBin() {
    var v = inBin.value.replace(/\s+/g, "");
    if (!/^[01]{0,8}$/.test(v)) { status.innerHTML = "Yalnızca 0 ve 1 yazın."; return; }
    if (v.length < 8) { drawBits(v); asm.textContent = "…"; status.innerHTML = (8 - v.length) + " bit daha gerekli."; return; }
    var byte = parseInt(v, 2), op = byte >> 4, dst = (byte >> 2) & 3, src = byte & 3;
    if (op <= 4) selOp.value = String(op);
    selDst.value = String(dst);
    selSrc.value = String(src);
    show(op, dst, src);
  }

  [selOp, selDst, selSrc].forEach(function (s) { s.addEventListener("change", fromSelects); });
  inBin.addEventListener("input", fromBin);
  fromSelects();
});
