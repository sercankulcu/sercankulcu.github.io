/* Bölüm 5.1: Kesmeler sunumu demoları */
(function () {
  var deckEl = document.getElementById("ds-deck");
  const EN = String(deckEl && deckEl.getAttribute("lang")).toLowerCase().indexOf("en") === 0;
  const tx = (tr, en) => EN ? en : tr;
  function hex(n, w) { return n.toString(16).toUpperCase().padStart(w, "0"); }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* Kesme vektörü hesaplayıcı */
  var KNOWN_TR = {
    0x00: "Bölme hatası (sıfıra bölme / bölüm taşması)", 0x01: "Tek adım (TF = 1)", 0x02: "NMI (maskelenemez kesme)",
    0x03: "Kesme noktası (breakpoint)", 0x04: "Taşma (INTO, OF = 1)", 0x05: "BIOS: ekranı yazıcıya bas",
    0x08: "IRQ0: sistem zamanlayıcısı", 0x09: "IRQ1: klavye donanım kesmesi", 0x10: "BIOS: video / ekran hizmetleri",
    0x13: "BIOS: disk hizmetleri", 0x16: "BIOS: klavye hizmetleri", 0x17: "BIOS: yazıcı", 0x19: "BIOS: önyükleme",
    0x1A: "BIOS: saat / tarih", 0x20: "DOS: programı sonlandır", 0x21: "DOS: genel hizmetler (AH ile seçilir)",
    0x33: "Fare sürücüsü"
  };
  var KNOWN_EN = {
    0x00: "Divide error (divide by zero / quotient overflow)", 0x01: "Single step (TF = 1)", 0x02: "NMI (non-maskable interrupt)",
    0x03: "Breakpoint", 0x04: "Overflow (INTO, OF = 1)", 0x05: "BIOS: print screen",
    0x08: "IRQ0: system timer", 0x09: "IRQ1: keyboard hardware interrupt", 0x10: "BIOS: video services",
    0x13: "BIOS: disk services", 0x16: "BIOS: keyboard services", 0x17: "BIOS: printer", 0x19: "BIOS: bootstrap loader",
    0x1A: "BIOS: time / date", 0x20: "DOS: terminate program", 0x21: "DOS: general services (selected by AH)",
    0x33: "Mouse driver"
  };
  var KNOWN = EN ? KNOWN_EN : KNOWN_TR;
  document.querySelectorAll('.ds-deck [data-demo="m05k-ivt"]').forEach(function (demo) {
    var input = demo.querySelector("input");
    var out = demo.querySelector(".m05k-ivt-out");
    var status = demo.querySelector(".ds-deck__status");
    function calc() {
      var t = input.value.trim().replace(/h$/i, "");
      if (!/^[0-9a-f]{1,2}$/i.test(t)) { status.innerHTML = tx("Kesme tipi 00 ile FF arasında onaltılık bir değer olmalı.", "The interrupt type must be a hex value from 00 to FF."); out.innerHTML = ""; return; }
      var n = parseInt(t, 16), a = n * 4;
      var role = KNOWN[n] || (n < 0x20 ? tx("Intel tarafından ayrılmış / BIOS", "Reserved by Intel / BIOS") : tx("DOS veya kullanıcı programlarına açık", "Free for DOS or user programs"));
      out.innerHTML = '<table class="ds-deck__table" style="width:auto;font-size:15px">' +
        "<tr><th>" + tx("Hesap", "Calculation") + "</th><td><code>" + hex(n, 2) + "h × 4 = " + hex(a, 4) + "h</code> (" + n + " × 4 = " + a + ")</td></tr>" +
        "<tr><th>IP</th><td><code>0000:" + hex(a, 4) + "h</code>" + tx(" ve ", " and ") + "<code>0000:" + hex(a + 1, 4) + "h</code></td></tr>" +
        "<tr><th>CS</th><td><code>0000:" + hex(a + 2, 4) + "h</code>" + tx(" ve ", " and ") + "<code>0000:" + hex(a + 3, 4) + "h</code></td></tr>" +
        "<tr><th>" + tx("Görev", "Role") + "</th><td>" + esc(role) + "</td></tr></table>";
      status.innerHTML = "<b>INT " + hex(n, 2) + "h</b> → " + tx("vektör", "vector") + " 0000:" + hex(a, 4) + "h";
    }
    demo.querySelector('[data-op="calc"]').addEventListener("click", calc);
    input.addEventListener("keydown", function (ev) { if (ev.key === "Enter") calc(); });
    demo.querySelectorAll("[data-n]").forEach(function (b) {
      b.addEventListener("click", function () { input.value = b.dataset.n; calc(); });
    });
    calc();
  });
})();
