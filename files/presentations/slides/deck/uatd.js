/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Transformer vs. CNN: Benchmarking RT-DETR and YOLO Models on the UATD Dataset" (UBCAK 17, 2025):
   interactive slides. Numbers are taken from Tables 2 and 3 and Fig. 2 of the paper. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };
  const MOD = [
    { n: "RT-DETR-L", col: "var(--pv-s2)", par: 32004290, gf: 103.5, p: .953, r: .964, m50: .963, m: .535, ms: 24.1 },
    { n: "YOLOv12n", col: "var(--pv-base)", par: 2558678, gf: 6.3, p: .906, r: .906, m50: .953, m: .481, ms: 3.5 },
    { n: "YOLOv8n", col: "var(--pv-s1)", par: 3007598, gf: 8.1, p: .946, r: .918, m50: .959, m: .507, ms: 2.7 }
  ];

  /* ---------- 1. Table 2: accuracy against inference time ---------- */
  (function trade() {
    const host = $("ua-trade");
    if (!host) return;
    const Y = { m: ["mAP50-95", 0.45, 0.55], m50: ["mAP50", 0.94, 0.98], p: ["Precision", 0.88, 0.98], r: ["Recall", 0.88, 0.98] };
    PV.seg($("ua-trade-m"), function (k) {
      const W = 720, H = 250, L = 60, R = 690, T = 14, B = 206;
      const c = PV.svg(host, W, H, Y[k][0] + " against inference time");
      const g = c.svg;
      const x = PV.log(1, 50, L, R), y = PV.linear(Y[k][1], Y[k][2], B, T);
      [1, 2, 5, 10, 20, 50].forEach(function (v) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: B, class: "gl" });
        PV.el(g, "text", { x: x(v), y: B + 16, "text-anchor": "middle", class: "tk" }, v + " ms");
      });
      const step = (Y[k][2] - Y[k][1]) / 4;
      for (let i = 0; i <= 4; i++) {
        const v = Y[k][1] + step * i;
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
        PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v.toFixed(3));
      }
      PV.el(g, "text", { x: (L + R) / 2, y: H - 4, "text-anchor": "middle", class: "tk" }, "inference time per image (log scale) · bubble area ∝ GFLOPs");
      PV.el(g, "text", { x: L + 4, y: T + 12, class: "tk" }, "↑ more accurate · ← faster");
      MOD.forEach(function (m) {
        const cx = x(m.ms), cy = y(m[k]), rr = 6 + Math.sqrt(m.gf) * 2.2;
        PV.el(g, "circle", { cx: cx, cy: cy, r: rr, fill: m.col, "fill-opacity": 0.35, stroke: m.col, "stroke-width": 2 });
        PV.el(g, "text", { x: cx + (m.n === "RT-DETR-L" ? -rr - 6 : rr + 6), y: cy + 4, "text-anchor": m.n === "RT-DETR-L" ? "end" : "start", class: "tt" }, m.n + " · " + m[k].toFixed(3));
        const hit = PV.el(g, "circle", { cx: cx, cy: cy, r: rr, class: "hit", "aria-label": m.n });
        PV.hover(c, hit, "<b>" + m.n + "</b><br>P " + m.p + " · R " + m.r + "<br>mAP50 " + m.m50 + " · mAP50-95 " + m.m +
          "<br>" + m.gf + " GFLOPs · " + (m.par / 1e6).toFixed(2) + " M parameters<br>" + m.ms + " ms per image");
      });
      $("ua-trade-note").textContent = k === "m" ?
        "RT-DETR-L is 0.028 above YOLOv8n in mAP50-95 but needs about 9× the time and 13× the compute." :
        k === "m50" ? "At IoU 0.5 the three models are within 0.01 of each other; the gap appears only with stricter localization." :
          k === "p" ? "YOLOv8n nearly matches RT-DETR-L on precision; YOLOv12n trails both." :
            "Recall separates the models most: RT-DETR-L finds 96.4% of the objects, the YOLO models about 91%.";
    });
  })();

  /* ---------- 2. Table 3: class-wise mAP ---------- */
  (function classes() {
    const host = $("ua-cls");
    if (!host) return;
    const C = ["Cube", "Ball", "Cylinder", "Human body", "Plane", "Circle cage", "Square cage", "Metal bucket", "Tyre", "BlueROV"];
    const V = [
      [[.974, .490], [.974, .436], [.981, .463]], [[.980, .607], [.963, .534], [.983, .561]], [[.975, .485], [.928, .397], [.879, .416]],
      [[.986, .557], [.930, .429], [.957, .481]], [[.985, .650], [.989, .596], [.977, .645]], [[.943, .511], [.937, .465], [.975, .503]],
      [[.985, .531], [.992, .518], [.992, .519]], [[.907, .434], [.912, .389], [.946, .443]], [[.915, .569], [.934, .561], [.934, .547]],
      [[.985, .521], [.969, .483], [.970, .490]]
    ];
    const sortSeg = $("ua-cls-sort");
    let metric = 1, order = "class";
    function draw() {
      const lo = metric ? 0.35 : 0.85, hi = metric ? 0.70 : 1.0;
      const idx = C.map(function (_, i) { return i; });
      if (order === "gap") idx.sort(function (a, b) { return (V[b][0][metric] - Math.max(V[b][1][metric], V[b][2][metric])) - (V[a][0][metric] - Math.max(V[a][1][metric], V[a][2][metric])); });
      const W = 720, rowH = 27, L = 100, R = 600, T = 4, H = T + rowH * C.length + 22;
      const c = PV.svg(host, W, H, (metric ? "mAP50-95" : "mAP50") + " per class");
      const g = c.svg, x = PV.linear(lo, hi, L, R);
      const st = metric ? 0.05 : 0.025;
      for (let v = lo; v <= hi + 1e-9; v += st) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * C.length, class: "gl" });
        PV.el(g, "text", { x: x(v), y: T + rowH * C.length + 16, "text-anchor": "middle", class: "tk" }, v.toFixed(metric ? 2 : 3));
      }
      idx.forEach(function (ci, r) {
        const y = T + rowH * r + rowH / 2, vals = V[ci].map(function (a) { return a[metric]; });
        const best = vals.indexOf(Math.max.apply(null, vals)), lo2 = Math.min.apply(null, vals);
        PV.el(g, "text", { x: L - 8, y: y + 4, "text-anchor": "end", class: "tt" }, C[ci]);
        PV.el(g, "line", { x1: x(lo2), x2: x(vals[best]), y1: y, y2: y, stroke: "var(--ds-border-base)", "stroke-width": 3 });
        vals.forEach(function (v, m) { PV.el(g, "circle", { cx: x(v), cy: y, r: m === best ? 6.5 : 5, fill: MOD[m].col, stroke: "var(--ds-bg)", "stroke-width": 1.5 }); });
        const gap = vals[0] - Math.max(vals[1], vals[2]);
        PV.el(g, "text", { x: R + 14, y: y + 4, class: gap > 0 ? "tt" : "tk" }, (gap > 0 ? "RT-DETR +" : "RT-DETR ") + gap.toFixed(3));
        const hit = PV.el(g, "rect", { x: 0, y: y - rowH / 2, width: W, height: rowH, class: "hit", "aria-label": C[ci] });
        PV.hover(c, hit, "<b>" + C[ci] + "</b><br>" + MOD.map(function (m, j) { return m.n + ": mAP50 " + V[ci][j][0].toFixed(3) + " · mAP50-95 " + V[ci][j][1].toFixed(3); }).join("<br>"));
      });
    }
    PV.seg($("ua-cls-m"), function (v) { metric = +v; draw(); });
    PV.seg(sortSeg, function (v) { order = v; draw(); });
  })();

  /* ---------- 3. Fig. 2: normalized confusion matrix of RT-DETR-L ---------- */
  (function cm() {
    const host = $("ua-cm");
    if (!host) return;
    const N = ["cube", "ball", "cylinder", "human body", "plane", "circle cage", "square cage", "metal bucket", "tyre", "blueROV", "background"];
    /* rows: predicted class, columns: ground truth (each column sums to about 1) */
    const A = [
      [.98, 0, 0, 0, 0, 0, 0, 0, 0, 0, .03],
      [0, .98, 0, 0, 0, .01, 0, .03, 0, .01, .27],
      [.01, 0, 1.00, 0, 0, 0, 0, 0, 0, 0, .13],
      [0, 0, 0, .99, 0, 0, .01, 0, 0, 0, .03],
      [0, 0, 0, 0, .99, 0, 0, 0, 0, 0, .11],
      [.02, .01, 0, 0, 0, .98, .01, 0, .02, 0, .16],
      [0, 0, 0, 0, 0, 0, .98, 0, 0, 0, .01],
      [0, 0, 0, 0, 0, 0, 0, .96, .01, 0, .03],
      [0, 0, 0, .01, 0, .01, 0, 0, .92, 0, .19],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, .99, .04],
      [0, .01, 0, 0, .01, 0, 0, .01, .06, 0, 0]
    ];
    const note = $("ua-cm-note");
    const W = 470, H = 450, X0 = 92, Y0 = 8, S = 32;
    const c = PV.svg(host, W, H, "Normalized confusion matrix of RT-DETR-L");
    const g = c.svg;
    N.forEach(function (n, i) {
      PV.el(g, "text", { x: X0 - 6, y: Y0 + S * i + S / 2 + 4, "text-anchor": "end", class: "tk" }, n);
      const tx = X0 + S * i + S / 2, ty = Y0 + 11 * S + 6;
      PV.el(g, "text", { x: tx, y: ty, "text-anchor": "end", class: "tk", transform: "rotate(-55 " + tx + " " + ty + ")" }, n);
    });
    PV.el(g, "text", { x: 12, y: Y0 + 5.5 * S, "text-anchor": "middle", class: "tk", transform: "rotate(-90 12 " + (Y0 + 5.5 * S) + ")" }, "predicted");
    PV.el(g, "text", { x: X0 + 5.5 * S, y: H - 2, "text-anchor": "middle", class: "tk" }, "ground truth");
    function say(i, j) {
      const v = A[i][j], p = Math.round(v * 100) + "%";
      if (j === 10 && i === 10) { note.textContent = "Background predicted as background is not counted in detection."; return; }
      if (j === 10) { note.innerHTML = v ? "<b>" + p + "</b> of the false detections on empty background are labelled <b>" + N[i] + "</b>." : "No false detection on background is labelled " + N[i] + "."; return; }
      if (i === 10) { note.innerHTML = v ? "<b>" + p + "</b> of the ground-truth " + N[j] + " objects are <b>missed</b> (no matching detection)." : "No " + N[j] + " is missed entirely."; return; }
      note.innerHTML = i === j ? "<b>" + p + "</b> of the ground-truth " + N[j] + " objects are detected as " + N[j] + "." :
        v ? "<b>" + p + "</b> of the ground-truth " + N[j] + " objects are detected as " + N[i] + "." : "No " + N[j] + " is detected as " + N[i] + ".";
    }
    A.forEach(function (row, i) {
      row.forEach(function (v, j) {
        const x = X0 + S * j, y = Y0 + S * i, bgc = j === 10 || i === 10;
        const cell = PV.el(g, "rect", { x: x + 1, y: y + 1, width: S - 2, height: S - 2, rx: 3, tabindex: 0, style: "cursor:pointer",
          fill: i === j ? "var(--pv-s1)" : bgc ? "var(--pv-s2)" : "var(--pv-base)", "fill-opacity": v ? (0.12 + 0.85 * Math.min(1, v * (i === j ? 1 : 2.5))).toFixed(2) : 0.04 });
        if (v) PV.el(g, "text", { x: x + S / 2, y: y + S / 2 + 4, "text-anchor": "middle", class: "vl", style: "font-size:10.5px;pointer-events:none;" + (i === j && v > 0.5 ? "fill:#fff" : "") }, v.toFixed(2).replace(/^0/, ""));
        ["mouseenter", "focus", "click"].forEach(function (ev) { cell.addEventListener(ev, function () { say(i, j); }); });
      });
    });
    say(1, 10);
  })();
})();
