/* Bölüm 5: Kesmeler sunumu demoları */
(function () {
  function hex(n, w) { return n.toString(16).toUpperCase().padStart(w, "0"); }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* Kesme vektörü hesaplayıcı */
  var KNOWN = {
    0x00: "Bölme hatası (sıfıra bölme / bölüm taşması)", 0x01: "Tek adım (TF = 1)", 0x02: "NMI (maskelenemez kesme)",
    0x03: "Kesme noktası (breakpoint)", 0x04: "Taşma (INTO, OF = 1)", 0x05: "BIOS: ekranı yazıcıya bas",
    0x08: "IRQ0: sistem zamanlayıcısı", 0x09: "IRQ1: klavye donanım kesmesi", 0x10: "BIOS: video / ekran hizmetleri",
    0x13: "BIOS: disk hizmetleri", 0x16: "BIOS: klavye hizmetleri", 0x17: "BIOS: yazıcı", 0x19: "BIOS: önyükleme",
    0x1A: "BIOS: saat / tarih", 0x20: "DOS: programı sonlandır", 0x21: "DOS: genel hizmetler (AH ile seçilir)",
    0x33: "Fare sürücüsü"
  };
  document.querySelectorAll('.ds-deck [data-demo="m05k-ivt"]').forEach(function (demo) {
    var input = demo.querySelector("input");
    var out = demo.querySelector(".m05k-ivt-out");
    var status = demo.querySelector(".ds-deck__status");
    function calc() {
      var t = input.value.trim().replace(/h$/i, "");
      if (!/^[0-9a-f]{1,2}$/i.test(t)) { status.innerHTML = "00 ile FF arasında onaltılık bir değer girin."; out.innerHTML = ""; return; }
      var n = parseInt(t, 16), a = n * 4;
      var role = KNOWN[n] || (n < 0x20 ? "Intel tarafından ayrılmış / BIOS" : "DOS veya kullanıcı programlarına açık");
      out.innerHTML = '<table class="ds-deck__table" style="width:auto;font-size:15px">' +
        "<tr><th>Hesap</th><td><code>" + hex(n, 2) + "h × 4 = " + hex(a, 4) + "h</code> (" + n + " × 4 = " + a + ")</td></tr>" +
        "<tr><th>IP</th><td><code>0000:" + hex(a, 4) + "h</code> ve <code>0000:" + hex(a + 1, 4) + "h</code></td></tr>" +
        "<tr><th>CS</th><td><code>0000:" + hex(a + 2, 4) + "h</code> ve <code>0000:" + hex(a + 3, 4) + "h</code></td></tr>" +
        "<tr><th>Görev</th><td>" + esc(role) + "</td></tr></table>";
      status.innerHTML = "<b>INT " + hex(n, 2) + "h</b> → vektör 0000:" + hex(a, 4) + "h";
    }
    demo.querySelector('[data-op="calc"]').addEventListener("click", calc);
    input.addEventListener("keydown", function (ev) { if (ev.key === "Enter") calc(); });
    demo.querySelectorAll("[data-n]").forEach(function (b) {
      b.addEventListener("click", function () { input.value = b.dataset.n; calc(); });
    });
    calc();
  });

  /* Metinden INT 10h / 0Eh koduna */
  document.querySelectorAll('.ds-deck [data-demo="m05k-tty"]').forEach(function (demo) {
    var input = demo.querySelector("input");
    var pre = demo.querySelector(".m05k-tty-code");
    var scr = demo.querySelector(".m05k-tty-scr");
    var status = demo.querySelector(".ds-deck__status");
    function render() {
      var s = input.value, lines = ['<span class="kw">MOV</span> AH, 0Eh', ""], bad = 0;
      for (var i = 0; i < s.length; i++) {
        var code = s.charCodeAt(i);
        if (code > 126 || code < 32) { bad++; continue; }
        var lit = s[i] === "'" ? "27h" : "'" + esc(s[i]) + "'";
        lines.push('<span class="kw">MOV</span> AL, ' + lit + ' <span class="cm">; ' + code + " = " + hex(code, 2) + "h</span>");
        lines.push('<span class="kw">INT</span> 10h');
      }
      lines.push('<span class="kw">RET</span>');
      pre.innerHTML = lines.join("\n");
      scr.textContent = s.replace(/[^\x20-\x7e]/g, "") + "_";
      status.innerHTML = bad ? "ASCII dışı " + bad + " karakter atlandı (ör. Türkçe harfler kod sayfasına bağlıdır)." :
        "<b>" + (s.length * 2 + 2) + "</b> komut, " + s.length + " kesme çağrısı";
    }
    input.addEventListener("input", render);
    render();
  });
})();
