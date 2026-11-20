/* Bölüm 3: Sayı Sistemleri — etkileşimli demolar (taban dönüştürücü, bit gezgini) */
(function () {
  var deckEl = document.getElementById("ds-deck");
  var EN = String(deckEl && deckEl.getAttribute("lang")).toLowerCase().indexOf("en") === 0;
  var tx = function (tr, en) { return EN ? en : tr; };
  function pad(s, n) { while (s.length < n) s = "0" + s; return s; }
  function group4(s) { s = pad(s, Math.ceil(s.length / 4) * 4); return s.replace(/(\d{4})(?=\d)/g, "$1 "); }
  function hexTxt(v) { var s = v.toString(16).toUpperCase(); if (/^[A-F]/.test(s)) s = "0" + s; return s + "h"; }

  /* ---------- taban dönüştürücü ---------- */
  document.querySelectorAll('.ds-deck [data-demo="m03-conv"]').forEach(function (demo) {
    var inp = demo.querySelector("[data-num]"), from = demo.querySelector("[data-from]"), to = demo.querySelector("[data-to]");
    var out = demo.querySelector("[data-out]"), lad = demo.querySelector("[data-ladder]"), status = demo.querySelector(".ds-deck__status");
    var PAT = { 2: /^[01]+$/, 8: /^[0-7]+$/, 10: /^[0-9]+$/, 16: /^[0-9a-f]+$/i };
    function calc() {
      var b = parseInt(from.value, 10);
      var t = inp.value.trim().replace(/[hbod]$/i, function (m) { return (b === 16 && /[bd]/i.test(m)) ? m : ""; });
      if (!t || !PAT[b].test(t)) { status.innerHTML = tx("Bu tabanda geçersiz rakam var.", "Invalid digit for this base."); out.innerHTML = ""; lad.textContent = ""; return; }
      var v = parseInt(t, b);
      if (!isFinite(v) || v > 4294967295) { status.innerHTML = tx("En fazla 32 bit (4.294.967.295) desteklenir.", "Up to 32 bits (4,294,967,295) supported."); return; }
      out.innerHTML = '<div>' + tx('onluk', 'decimal') + '<b>' + v + '</b></div><div>' + tx('onaltılık', 'hex') + '<b>' + hexTxt(v) + '</b></div><div>' + tx('sekizli', 'octal') + '<b>' + v.toString(8) + 'o</b></div><div>' + tx('ikili', 'binary') + '<b>' + group4(v.toString(2)) + "b</b></div>";
      var tb = parseInt(to.value, 10), q = v, rows = [], digits = [];
      do {
        var nq = Math.floor(q / tb), r = q % tb;
        rows.push(pad(String(q), 10) + " ÷ " + tb + " = " + pad(String(nq), 10) + tx("   kalan ", "   rem ") + r + (r > 9 ? " = " + r.toString(16).toUpperCase() : ""));
        digits.push(r.toString(16).toUpperCase());
        q = nq;
      } while (q > 0 && rows.length < 40);
      if (rows.length > 8) rows = rows.slice(0, 4).concat(["   … (" + (rows.length - 7) + tx(" satır daha) …", " more rows) …")]).concat(rows.slice(-3));
      lad.textContent = rows.join("\n");
      status.innerHTML = tx("Kalanlar aşağıdan yukarı okunur → <b>", "Read the remainders bottom-up → <b>") + digits.reverse().join("") + "</b> (" + tx(tb + " tabanında", "base " + tb) + ")";
    }
    [inp, from, to].forEach(function (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); });
    calc();
  });

  /* ---------- bit gezgini ---------- */
  document.querySelectorAll('.ds-deck [data-demo="m03-bits"]').forEach(function (demo) {
    var row = demo.querySelector("[data-bits]"), out = demo.querySelector("[data-out]"), status = demo.querySelector(".ds-deck__status");
    var v = 0x2D, btns = [];
    for (var k = 7; k >= 0; k--) {
      (function (k) {
        var b = document.createElement("button");
        b.type = "button";
        b.innerHTML = "<span>" + k + "</span><span></span>";
        b.addEventListener("click", function () { v ^= (1 << k); render("bit " + k + tx(" değiştirildi", " toggled")); });
        row.appendChild(b);
        btns[k] = b;
      })(k);
    }
    function render(msg) {
      v &= 0xFF;
      for (var k = 0; k < 8; k++) {
        var on = (v >> k) & 1;
        btns[k].classList.toggle("is-on", !!on);
        btns[k].lastChild.textContent = on;
        btns[k].setAttribute("aria-label", "bit " + k + " = " + on);
      }
      var s = v >= 128 ? v - 256 : v;
      var sm = (v & 0x80) ? "−" + (v & 0x7F) : String(v);
      var oc = (v & 0x80) ? "−" + ((~v) & 0x7F) : String(v);
      var hi = v >> 4, lo = v & 15;
      var bcd = (hi < 10 && lo < 10) ? String(hi * 10 + lo) : tx("geçersiz", "invalid");
      var g = v ^ (v >> 1);
      var ones = 0; for (var t = v; t; t >>= 1) ones += t & 1;
      var cells = [
        [tx("onaltılık", "hex"), hexTxt(v)], [tx("işaretsiz", "unsigned"), String(v)], [tx("ikiye tümleyen", "two's complement"), String(s).replace("-", "−")], [tx("işaret-büyüklük", "sign-magnitude"), sm],
        [tx("birler tümleyeni", "ones' complement"), oc], [tx("paketli BCD", "packed BCD"), bcd], [tx("Gray kodu", "Gray code"), pad(g.toString(2), 8)], [tx("PF (1 sayısı)", "PF (count of 1s)"), (ones % 2 ? "0" : "1") + " (" + ones + ")"]
      ];
      out.innerHTML = cells.map(function (c) { return "<div>" + c[0] + "<b>" + c[1] + "</b></div>"; }).join("");
      status.innerHTML = msg || tx("Bitlere tıkla ya da bir işlem seç.", "Click the bits or pick an operation.");
    }
    demo.querySelectorAll("[data-op]").forEach(function (b) {
      b.addEventListener("click", function () {
        var op = b.dataset.op, old = v;
        if (op === "not") { v = ~v & 0xFF; render(tx("<b>NOT</b>: tüm bitler terslendi (birler tümleyeni)", "<b>NOT</b>: every bit flipped (ones' complement)")); }
        else if (op === "neg") { v = (256 - v) & 0xFF; render(tx("<b>NEG</b>: tersle + 1 → ", "<b>NEG</b>: invert + 1 → ") + hexTxt(old) + " → " + hexTxt(v) + (old === 0x80 ? tx(" (+128 8 bite sığmaz; −128'in negatifi yine −128!)", " (+128 does not fit in 8 bits; −(−128) is still −128!)") : "")); }
        else if (op === "inc") { v = (v + 1) & 0xFF; render("<b>+1</b>" + (old === 0xFF ? tx(" · FFh + 1 = 00h: elde (CF)", " · FFh + 1 = 00h: carry (CF)") : (old === 0x7F ? tx(" · +127 + 1 = −128: işaretli taşma (OF)", " · +127 + 1 = −128: signed overflow (OF)") : ""))); }
        else if (op === "shl") { v = (v << 1) & 0xFF; render(tx("<b>SHL</b>: sola kaydırma = ×2", "<b>SHL</b>: shift left = ×2") + ((old & 0x80) ? tx(" · dışarı atılan 1 CF'ye gider", " · the 1 shifted out goes to CF") : "")); }
        else { v = 0; render(tx("sıfırlandı", "cleared")); }
      });
    });
    render();
  });
})();
