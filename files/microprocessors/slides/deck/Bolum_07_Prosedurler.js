/* Bölüm 7 Prosedürler demosu: CALL / RET yığın simülatörü */
(function () {
  function hex(v) { return (v & 0xFFFF).toString(16).toUpperCase().padStart(4, "0") + "h"; }
  var NAMES = { 0x0200: "yaz", 0x0300: "topla" };
  var MAXD = 5;
  document.querySelectorAll('.ds-deck [data-demo="m07p-stack"]').forEach(function (demo) {
    var regs = demo.querySelector('[data-k="regs"]');
    var log = demo.querySelector('[data-k="log"]');
    var stk = demo.querySelector('[data-k="stack"]');
    var status = demo.querySelector(".ds-deck__status");
    var ip, sp, stack, lines, ended, prev;
    function where(a) {
      var base = a & 0xFF00;
      return NAMES[base] ? NAMES[base] : (base === 0x0100 ? "main" : "?");
    }
    function render(changed) {
      regs.innerHTML = '<span class="' + (changed.indexOf("IP") >= 0 ? "is-changed" : "") + '">IP = ' + hex(ip) + "</span>" +
        '<span class="' + (changed.indexOf("SP") >= 0 ? "is-changed" : "") + '">SP = ' + hex(sp) + "</span>" +
        "<span>konum: " + (ended ? "DOS" : where(ip)) + "</span>";
      log.innerHTML = lines.slice(-6).join("<br>") || "&nbsp;";
      var html = "";
      for (var k = MAXD; k >= 0; k--) {
        var addr = 0xFFFE - 2 * k;
        var used = k < stack.length;
        var top = used && k === stack.length - 1 && !ended;
        var val = used ? hex(stack[k]) : "";
        var tag = top ? "← SP" : "";
        html += '<div class="' + (top ? "is-top" : used ? "is-used" : "") + '"><em>' + hex(addr) + "</em><span>" + val + "</span><i>" + tag + "</i></div>";
      }
      stk.innerHTML = html;
      demo.querySelectorAll("[data-op]").forEach(function (b) {
        if (b.dataset.op !== "reset") b.disabled = ended;
      });
    }
    function reset() {
      ip = 0x0100; sp = 0xFFFE; stack = [0x0000]; ended = false;
      lines = ["Program 0100h'da başladı. DOS yığına 0000h itti."];
      status.innerHTML = "Bir CALL ile başlayın.";
      render([]);
    }
    function call(target) {
      if (stack.length > MAXD) { status.innerHTML = "Gösterim sınırı: en fazla " + MAXD + " iç içe çağrı."; return; }
      var ret = (ip + 3) & 0xFFFF;
      stack.push(ret); sp = (sp - 2) & 0xFFFF;
      lines.push(hex(ip) + ": CALL " + NAMES[target] + " → push " + hex(ret) + ", IP = " + hex(target));
      ip = target;
      status.innerHTML = "Dönüş adresi <b>" + hex(ret) + "</b> yığına itildi; SP = " + hex(sp) + ".";
      render(["IP", "SP"]);
    }
    function exec() {
      ip = (ip + 2) & 0xFFFF;
      lines.push("2 baytlık bir komut yürütüldü → IP = " + hex(ip));
      status.innerHTML = "IP komut uzunluğu kadar arttı; yığın değişmedi.";
      render(["IP"]);
    }
    function ret() {
      var a = stack.pop(); sp = (sp + 2) & 0xFFFF;
      lines.push(hex(ip) + ": RET → pop " + hex(a) + ", IP = " + hex(a));
      ip = a;
      if (stack.length === 0) {
        ended = true;
        status.innerHTML = "IP = 0000h: PSP'deki <b>INT 20h</b> çalışır, program sona erdi. SP = " + hex(sp) + ".";
      } else {
        status.innerHTML = "<b>" + where(a) + "</b> içine dönüldü; SP = " + hex(sp) + ".";
      }
      render(["IP", "SP"]);
    }
    demo.addEventListener("click", function (e) {
      var b = e.target.closest("[data-op]");
      if (!b) return;
      var op = b.dataset.op;
      if (op === "reset") reset();
      else if (op === "callA") call(0x0200);
      else if (op === "callB") call(0x0300);
      else if (op === "exec") exec();
      else if (op === "ret") ret();
    });
    reset();
  });
})();
