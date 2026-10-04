/* Bölüm 9: Çevrimiçi Algoritmalar deneme alanları (sayfalama, kayak kiralama) */
(function () {
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---------- sayfalama ---------- */
  function run(seq, k, pol) {
    var slots = [], load = {}, last = {}, ev = [], faults = 0, t, i, j;
    for (i = 0; i < k; i++) slots.push(null);
    for (t = 0; t < seq.length; t++) {
      var p = seq[t], e = { page: p, hit: false, slot: -1, evicted: null };
      var at = slots.indexOf(p);
      if (at >= 0) { e.hit = true; e.slot = at; }
      else {
        faults++;
        var s = slots.indexOf(null);
        if (s < 0) {
          s = 0;
          if (pol === "FIFO") { for (j = 1; j < k; j++) if (load[slots[j]] < load[slots[s]]) s = j; }
          else if (pol === "LRU") { for (j = 1; j < k; j++) if (last[slots[j]] < last[slots[s]]) s = j; }
          else {
            var best = -1;
            for (j = 0; j < k; j++) {
              var nx = Infinity, u;
              for (u = t + 1; u < seq.length; u++) if (seq[u] === slots[j]) { nx = u; break; }
              if (nx > best) { best = nx; s = j; }
            }
          }
          e.evicted = slots[s];
        }
        slots[s] = p; e.slot = s; load[p] = t;
      }
      last[p] = t;
      e.slots = slots.slice(); e.faults = faults;
      ev.push(e);
    }
    return ev;
  }

  function table(seq, k, ev) {
    var cw = 40, rh = 28, lw = 74, n = seq.length, W = lw + n * cw + 4, H = rh * (k + 2) + 4, o = [], c, r;
    var rows = ["İstek"];
    for (r = 0; r < k; r++) rows.push("Ç" + (r + 1));
    rows.push("Sonuç");
    rows.forEach(function (nm, i) {
      o.push('<text class="lbl" x="' + (lw - 10) + '" y="' + (i * rh + rh / 2 + 5) + '" text-anchor="end">' + nm + "</text>");
    });
    for (c = 0; c < n; c++) {
      var x = lw + c * cw, e = ev[c];
      o.push('<text class="txt" x="' + (x + cw / 2) + '" y="' + (rh / 2 + 5) + '" text-anchor="middle">' + seq[c] + "</text>");
      for (r = 0; r < k; r++) {
        var cls = "a09-cell";
        if (e.slot === r) cls = e.hit ? "a09-hitbox" : "a09-hot";
        o.push('<rect class="' + cls + '" x="' + (x + 3) + '" y="' + ((r + 1) * rh + 3) + '" width="' + (cw - 6) + '" height="' + (rh - 6) + '" rx="4"/>');
        if (e.slots[r] !== null) o.push('<text class="txt" x="' + (x + cw / 2) + '" y="' + ((r + 1) * rh + rh / 2 + 5) + '" text-anchor="middle">' + e.slots[r] + "</text>");
      }
      o.push('<text class="txt ' + (e.hit ? "a09-good" : "a09-bad") + '" x="' + (x + cw / 2) + '" y="' + ((k + 1) * rh + rh / 2 + 5) + '" text-anchor="middle">' + (e.hit ? "✓" : "H") + "</text>");
    }
    return '<svg class="ds-svg" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Sayfalama tablosu">' + o.join("") + "</svg>";
  }

  document.querySelectorAll('.ds-deck [data-demo="a09-paging"]').forEach(function (demo) {
    var view = demo.querySelector(".a09-pg__view");
    var status = demo.querySelector(".a09-pg__status");
    var input = demo.querySelector(".a09-seq");
    var ksel = demo.querySelector(".a09-k");
    var pol = "LRU";

    function parse() {
      var m = (input.value.match(/\d/g) || []).slice(0, 16).map(Number);
      return m;
    }
    function draw() {
      var seq = parse(), k = Number(ksel.value);
      if (!seq.length) { view.innerHTML = ""; status.innerHTML = "En az bir istek girin (0–9 arası rakamlar)."; return; }
      var ev = run(seq, k, pol);
      view.innerHTML = table(seq, k, ev);
      var f = {};
      ["FIFO", "LRU", "OPT"].forEach(function (p) { f[p] = run(seq, k, p)[seq.length - 1].faults; });
      status.innerHTML = "<b>" + pol + "</b> gösteriliyor · k = " + k + " · sayfa hatası: FIFO <b>" + f.FIFO + "</b>, LRU <b>" + f.LRU + "</b>, OPT <b>" + f.OPT + "</b>";
    }
    demo.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-pol]");
      if (!b) return;
      if (b.dataset.pol === "belady") {
        input.value = "1 2 3 4 1 2 5 1 2 3 4 5"; pol = "FIFO";
        draw();
        var s3 = run(parse(), 3, "FIFO")[11].faults, s4 = run(parse(), 4, "FIFO")[11].faults;
        status.innerHTML += " · FIFO: k = 3 → " + s3 + ", k = 4 → " + s4 + " hata (Belady anomalisi). k'yı değiştirerek deneyin.";
        return;
      }
      pol = b.dataset.pol;
      draw();
    });
    ksel.addEventListener("change", draw);
    input.addEventListener("keydown", function (ev) { if (ev.key === "Enter") { ev.preventDefault(); draw(); } });
    input.addEventListener("change", draw);
    draw();
  });

  /* ---------- kayak kiralama ---------- */
  document.querySelectorAll('.ds-deck [data-demo="a09-ski"]').forEach(function (demo) {
    var view = demo.querySelector(".a09-ski__view");
    var status = demo.querySelector(".a09-ski__status");
    var v = {};

    function read() {
      demo.querySelectorAll("[data-k]").forEach(function (inp) {
        v[inp.dataset.k] = Number(inp.value);
        demo.querySelector('[data-v="' + inp.dataset.k + '"]').textContent = inp.value;
      });
    }
    function bar(y, label, val, max, cls) {
      var w = Math.max(2, 440 * val / max);
      return '<text class="lbl" x="150" y="' + (y + 22) + '" text-anchor="end">' + label + "</text>" +
        '<rect class="' + cls + '" x="160" y="' + y + '" width="' + w + '" height="32" rx="5"/>' +
        '<text class="txt" x="' + (168 + w) + '" y="' + (y + 22) + '">' + val + " TL</text>";
    }
    function draw() {
      read();
      var B = v.B, k = v.k, d = v.d;
      var alg = d < k ? d : (k - 1) + B;
      var opt = Math.min(d, B);
      var worst = (k - 1 + B) / Math.min(k, B);
      var max = Math.max(alg, opt, 1) * 1.25;
      view.innerHTML = '<svg class="ds-svg" viewBox="0 0 680 150" role="img" aria-label="Çevrimiçi maliyet ' + alg + ", en iyi maliyet " + opt + '">' +
        bar(20, "çevrimiçi (ALG)", alg, max, "a09-hot") + bar(80, "geleceği bilen (OPT)", opt, max, "box") + "</svg>";
      var ratio = (alg / opt).toFixed(2).replace(".", ",");
      status.innerHTML = (d < k ? d + " gün kiralandı, satın alma günü gelmedi." : (k - 1) + " gün kira + " + B + " TL satın alma.") +
        " Oran ALG / OPT = <b>" + ratio + "</b> · bu k için en kötü oran (d = k) = <b>" + worst.toFixed(2).replace(".", ",") +
        "</b> · en iyi deterministik: 2 − 1/B = <b>" + (2 - 1 / B).toFixed(2).replace(".", ",") + "</b>";
    }
    demo.querySelectorAll("[data-k]").forEach(function (inp) { inp.addEventListener("input", draw); });
    draw();
  });
})();
