/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Bias Mitigation in Ensemble-Based Meat Freshness Classification Using Grad-CAM" (BAJECE 14, 2026):
   interactive slides. Numbers are taken from Tables I–VI of the paper; the fusion example uses made-up
   probabilities for one sample and says so on its slide. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };

  /* ---------- 1. Table I: images per class and split ---------- */
  (function split() {
    const host = $("meat-split");
    if (!host) return;
    const D = [["Fresh", 675, 178], ["Semi-fresh", 630, 159], ["Spoiled", 510, 114]];
    const W = 360, rowH = 34, L = 86, R = 300, T = 4, H = T + rowH * 3 + 26;
    const c = PV.svg(host, W, H, "Training and test images per class");
    const g = c.svg;
    const x = PV.linear(0, 900, L, R);
    for (let v = 0; v <= 900; v += 300) {
      PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * 3, class: v ? "gl" : "ax" });
      PV.el(g, "text", { x: x(v), y: T + rowH * 3 + 16, "text-anchor": "middle", class: "tk" }, v);
    }
    D.forEach(function (d, i) {
      const y = T + rowH * i + 7;
      PV.el(g, "text", { x: L - 8, y: y + 14, "text-anchor": "end", class: "tt" }, d[0]);
      PV.hbar(g, x(0), y, x(d[1]) - x(0), 20, "mk", "var(--pv-s1)");
      PV.hbar(g, x(d[1]) + 2, y, x(d[1] + d[2]) - x(d[1]) - 2, 20, "mk", "var(--pv-s2)");
      PV.el(g, "text", { x: x(d[1] + d[2]) + 6, y: y + 14, class: "vl" }, d[1] + d[2]);
      const hit = PV.el(g, "rect", { x: 0, y: y - 7, width: W, height: rowH, class: "hit", "aria-label": d[0] });
      PV.hover(c, hit, "<b>" + d[0] + "</b><br>train " + d[1] + " · test " + d[2] + "<br>total " + (d[1] + d[2]));
    });
  })();

  /* ---------- 2. Grad-CAM overlay (Figs. 10–12): image and heatmap with adjustable opacity ---------- */
  (function overlay() {
    const img = $("meat-cam-img");
    if (!img) return;
    const cam = $("meat-cam-map"), op = $("meat-cam-op"), note = $("meat-cam-note");
    const N = {
      fresh: "Fresh: bright red colour, glossy surface moisture, intact marbling. Activation sits on the meat surface, over texture-rich and moisture-reflective areas.",
      semi: "Semi-fresh: duller red-brown colour, reduced gloss, early moisture loss. Attention stays on the meat, not on the tray.",
      spoiled: "Spoiled: greenish discoloration, slime and surface changes. The highest activation covers the degraded meat surface."
    };
    function setOp() { cam.style.opacity = (+op.value / 100).toFixed(2); $("meat-cam-op-out").textContent = op.value + "%"; }
    PV.seg($("meat-cam-cls"), function (v) {
      img.src = "img/meat/gradcam_" + v + "_img.webp";
      cam.src = "img/meat/gradcam_" + v + "_cam.webp";
      img.alt = "Correctly classified " + v + " meat sample";
      cam.alt = "Grad-CAM heatmap of the proposed model";
      note.innerHTML = N[v];
    });
    op.addEventListener("input", setOp);
    setOp();
    ["fresh", "semi", "spoiled"].forEach(function (k) { new Image().src = "img/meat/gradcam_" + k + "_cam.webp"; new Image().src = "img/meat/gradcam_" + k + "_img.webp"; });
  })();

  /* ---------- 3. weighted fusion of the three predictors (Eq. 4) ---------- */
  (function fusion() {
    const host = $("meat-fuse");
    if (!host) return;
    const w1 = $("meat-w1"), w2 = $("meat-w2"), out = $("meat-fuse-out");
    const CL = ["Fresh", "Semi-fresh", "Spoiled"];
    /* illustrative class probabilities for one ambiguous sample, not values from the paper */
    const P = { "MobileNetV2 + TTA": [0.04, 0.50, 0.46], "SVM": [0.05, 0.37, 0.58], "XGBoost": [0.08, 0.42, 0.50] };
    function draw() {
      let a = +w1.value / 100, b = +w2.value / 100;
      if (a + b > 1) { b = Math.round((1 - a) * 100) / 100; w2.value = Math.round(b * 100); }
      const c3 = Math.max(0, 1 - a - b);
      $("meat-w1-out").textContent = a.toFixed(2);
      $("meat-w2-out").textContent = b.toFixed(2);
      $("meat-w3-out").textContent = c3.toFixed(2);
      const W = [a, b, c3], names = Object.keys(P);
      const fused = CL.map(function (_, k) { return names.reduce(function (s, n, j) { return s + W[j] * P[n][k]; }, 0); });
      const win = fused.indexOf(Math.max.apply(null, fused));
      const rows = names.map(function (n) { return { n: n, v: P[n] }; }).concat([{ n: "Weighted ensemble", v: fused, ens: true }]);
      const Wd = 720, rowH = 36, L = 170, R = 700, T = 20, H = T + rowH * rows.length + 6;
      const c = PV.svg(host, Wd, H, "Class probabilities of each model and of the weighted ensemble");
      const g = c.svg;
      const COL = ["var(--ppi-s3, #1baf7a)", "var(--pv-s1)", "var(--pv-s2)"];
      const x = PV.linear(0, 1, L, R);
      CL.forEach(function (cl, k) { PV.el(g, "text", { x: L + 6 + k * 120, y: 12, class: "tk" }, "■ " + cl).setAttribute("style", "fill:" + COL[k]); });
      rows.forEach(function (r, i) {
        const y = T + rowH * i + 6;
        PV.el(g, "text", { x: L - 8, y: y + 15, "text-anchor": "end", class: r.ens ? "tt" : "vl" }, r.n);
        let acc = 0;
        r.v.forEach(function (p, k) {
          const x0 = x(acc), wd = x(acc + p) - x0;
          PV.el(g, "rect", { x: x0 + (k ? 1 : 0), y: y, width: Math.max(0, wd - (k ? 1 : 0)), height: 22, fill: COL[k], rx: k === 0 || k === 2 ? 3 : 0 });
          if (p >= 0.12) PV.el(g, "text", { x: x0 + wd / 2, y: y + 15, "text-anchor": "middle", class: "vl", style: "fill:#fff;font-weight:700" }, p.toFixed(2));
          acc += p;
        });
        if (r.ens) PV.el(g, "rect", { x: L - 2, y: y - 3, width: R - L + 4, height: 28, fill: "none", stroke: "var(--ds-text)", "stroke-width": 1.5, rx: 4 });
      });
      out.innerHTML = "Decision: <b>" + CL[win] + "</b> (" + fused[win].toFixed(3) + ")." +
        (Math.abs(a - 0.5) < 0.001 && Math.abs(b - 0.3) < 0.001 ? " These are the paper's weights w = (0.5, 0.3, 0.2)." : "");
    }
    [w1, w2].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 4. Table V: comparison with other methods (dot plot) ---------- */
  (function sota() {
    const host = $("meat-sota");
    if (!host) return;
    const D = [
      ["Xception [4]", .707, .765, .692, .708], ["InceptionV3 [4]", .707, .728, .730, .717], ["ResNet50V2 [4]", .712, .780, .703, .706],
      ["MobileNetV2 [4]", .840, .888, .840, .847], ["DenseNet121 [4]", .843, .863, .832, .843], ["Xception [12]", .869, .872, .864, .875],
      ["Inception V3 [12]", .871, .871, .871, .882], ["ResNet18 [6]", .944, .945, .944, .944], ["ConvNeXt [6]", .965, .966, .965, .965],
      ["VGG16 [4]", .969, .968, .971, .970], ["Elfattah [5]", .985, .984, .985, .985], ["Büyükarıkan [4]", .989, .990, .989, .990],
      ["Elangovan [7]", .994, .980, .998, .989], ["Proposed", .9978, .9978, 1.000, .9989]
    ];
    const MI = { acc: 1, p: 2, r: 3, f1: 4 }, NAME = { acc: "Accuracy", p: "Precision", r: "Recall", f1: "F1-score" };
    PV.seg($("meat-sota-m"), function (k) {
      const j = MI[k];
      const rows = D.slice().sort(function (a, b) { return a[j] - b[j]; });
      const W = 720, rowH = 20, L = 140, R = 650, T = 4, H = T + rowH * rows.length + 26;
      const c = PV.svg(host, W, H, NAME[k] + " of meat freshness classifiers");
      const g = c.svg;
      const x = PV.linear(0.65, 1.0, L, R);
      for (let v = 0.65; v <= 1.0001; v += 0.05) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * rows.length, class: "gl" });
        PV.el(g, "text", { x: x(v), y: T + rowH * rows.length + 16, "text-anchor": "middle", class: "tk" }, v.toFixed(2));
      }
      rows.forEach(function (r, i) {
        const y = T + rowH * i + rowH / 2, ours = r[0] === "Proposed";
        PV.el(g, "text", { x: L - 8, y: y + 4, "text-anchor": "end", class: ours ? "tt" : "tk" }, r[0]);
        PV.el(g, "line", { x1: x(0.65), x2: x(r[j]), y1: y, y2: y, stroke: "var(--ds-border-base)", "stroke-width": 1 });
        PV.el(g, "circle", { cx: x(r[j]), cy: y, r: ours ? 6.5 : 5, fill: ours ? "var(--pv-s2)" : "var(--pv-s1)", stroke: "var(--ds-bg)", "stroke-width": 2 });
        PV.el(g, "text", { x: x(r[j]) + 10, y: y + 4, class: ours ? "tt" : "vl" }, r[j].toFixed(r[j] > 0.995 ? 4 : 3));
        const hit = PV.el(g, "rect", { x: 0, y: y - rowH / 2, width: W, height: rowH, class: "hit", "aria-label": r[0] });
        PV.hover(c, hit, "<b>" + r[0] + "</b><br>Accuracy " + r[1] + " · Precision " + r[2] + "<br>Recall " + r[3] + " · F1 " + r[4]);
      });
    });
  })();

  /* ---------- 5. Table VI: five-fold cross-validation ---------- */
  (function folds() {
    const host = $("meat-cv");
    if (!host) return;
    const F = [99.56, 100.00, 99.78, 98.90, 99.12];
    const WT = ["0.45 / 0.30 / 0.25", "0.45 / 0.30 / 0.25", "0.55 / 0.20 / 0.25", "0.45 / 0.30 / 0.25", "0.45 / 0.30 / 0.25"];
    const W = 720, H = 190, L = 70, R = 600, T = 8, B = 160;
    const c = PV.svg(host, W, H, "Ensemble accuracy per fold");
    const g = c.svg;
    const x = PV.linear(98.5, 100, L, R), rowH = (B - T) / 5;
    for (let v = 98.5; v <= 100.0001; v += 0.25) {
      PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: B, class: "gl" });
      PV.el(g, "text", { x: x(v), y: B + 16, "text-anchor": "middle", class: "tk" }, v.toFixed(2));
    }
    F.forEach(function (v, i) {
      const y = T + rowH * i + rowH / 2;
      PV.el(g, "text", { x: L - 10, y: y + 4, "text-anchor": "end", class: "tt" }, "Fold " + (i + 1));
      PV.el(g, "line", { x1: x(98.5), x2: x(v), y1: y, y2: y, stroke: "var(--ds-border-base)", "stroke-width": 1 });
      PV.el(g, "circle", { cx: x(v), cy: y, r: 6, fill: "var(--pv-s1)", stroke: "var(--ds-bg)", "stroke-width": 2 });
      PV.el(g, "text", { x: x(v) + 10, y: y + 4, class: "vl" }, v.toFixed(2) + "%");
      PV.el(g, "text", { x: R + 12, y: y + 4, class: "tk" }, "w = " + WT[i]);
      const hit = PV.el(g, "rect", { x: 0, y: y - rowH / 2, width: W, height: rowH, class: "hit", "aria-label": "Fold " + (i + 1) });
      PV.hover(c, hit, "<b>Fold " + (i + 1) + "</b><br>accuracy " + v.toFixed(2) + "%<br>weights (w1 / w2 / w3) " + WT[i]);
    });
  })();
})();
