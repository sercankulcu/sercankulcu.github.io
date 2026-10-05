/* Bölüm 8 Yığın: 8086 yığın simülatörü (PUSH/POP, SP, SS:SP çevresi) */
document.querySelectorAll('.ds-deck [data-demo="m08-stack"]').forEach(function (demo) {
  var box = demo.querySelector(".m08-stk");
  var log = demo.querySelector(".m08-log");
  var status = demo.querySelector(".ds-deck__status");
  var spOut = demo.querySelector("[data-sp]");
  var inputs = {};
  demo.querySelectorAll("input[data-reg]").forEach(function (inp) { inputs[inp.dataset.reg] = inp; });
  var TOP = 0xFFFE, CELLS = 6;
  var mem, sp, lines;

  function hex4(v) { return ("0000" + (v & 0xFFFF).toString(16).toUpperCase()).slice(-4) + "h"; }
  function readReg(r) {
    var t = inputs[r].value.trim().replace(/h$/i, "");
    if (!/^[0-9a-fA-F]{1,4}$/.test(t)) return null;
    return parseInt(t, 16);
  }
  function writeReg(r, v) { inputs[r].value = hex4(v).slice(0, 4); }

  function draw() {
    box.innerHTML = "";
    for (var i = 0; i < CELLS; i++) {
      var a = TOP - 2 * i;
      var s = document.createElement("span");
      var live = a >= sp;
      var v = mem.hasOwnProperty(a) ? hex4(mem[a]) : "····";
      s.textContent = a.toString(16).toUpperCase() + ": " + v;
      if (!live) s.style.opacity = ".45";
      if (a === sp) { s.classList.add("is-top"); s.textContent += " ←SP"; }
      box.appendChild(s);
    }
    spOut.textContent = hex4(sp);
    log.innerHTML = lines.slice(-9).join("<br>");
  }

  function reset() {
    mem = {}; mem[TOP] = 0; sp = TOP; lines = ["; .COM: [FFFEh] = 0000h (DOS)"];
    writeReg("AX", 0x1212); writeReg("BX", 0x3434); writeReg("CX", 0x0008);
    status.innerHTML = "SP = <b>FFFEh</b>. Bir PUSH ya da POP düğmesine basın.";
    draw();
  }

  demo.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-op]");
    if (!b) return;
    var op = b.dataset.op, r = b.dataset.r;
    if (op === "reset") { reset(); return; }
    if (op === "push") {
      var v = readReg(r);
      if (v === null) { status.innerHTML = r + " geçerli bir 16 bit hex değer değil (ör. 12AB)."; return; }
      if (((sp - 2) & 0xFFFF) < TOP - 2 * (CELLS - 1)) { status.innerHTML = "Gösterim alanı doldu (" + CELLS + " word). Gerçek yığın daha derine inebilir; önce POP yapın."; return; }
      sp = (sp - 2) & 0xFFFF; mem[sp] = v;
      lines.push("PUSH " + r + "  ; [" + hex4(sp) + "] ← " + hex4(v));
      status.innerHTML = "<b>PUSH " + r + "</b>: SP − 2 = " + hex4(sp) + ", sonra [SS:SP] ← " + hex4(v) + ".";
    } else {
      var val = mem.hasOwnProperty(sp) ? mem[sp] : 0;
      var old = sp;
      writeReg(r, val);
      sp = (sp + 2) & 0xFFFF;
      lines.push("POP  " + r + "  ; " + r + " ← " + hex4(val));
      if (old === TOP) {
        status.innerHTML = "<b>Alt taşma!</b> Yığında yalnızca DOS'un 0000h'si vardı; " + r + " = 0000h oldu ve SP = " + hex4(sp) + " (sarma). Programın son RET'i artık DOS'a dönemez.";
      } else if (old < TOP - 2 * (CELLS - 1)) {
        status.innerHTML = "SP yığın alanının dışında (" + hex4(old) + "). Okunan değer çöptür.";
      } else {
        status.innerHTML = "<b>POP " + r + "</b>: " + r + " ← [" + hex4(old) + "] = " + hex4(val) + ", sonra SP + 2 = " + hex4(sp) + ". Bellekteki değer silinmez.";
      }
    }
    draw();
  });
  reset();
});
