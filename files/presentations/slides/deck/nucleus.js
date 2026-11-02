/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Nucleus Segmentation in Heterogeneous Microscopy Images on the Data Science Bowl 2018 Dataset" (ICRIRET 2025):
   interactive slides. Numbers are taken from Tables 1, 3 and 4 and Fig. 2 of the paper; the IoU lab draws
   made-up nuclei and says so on its slide. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };
  const M = ["YOLOv11s-seg", "YOLOv12s-seg"], COL = ["var(--pv-s1)", "var(--pv-s2)"];

  /* paired horizontal bars, one row per metric; low = true when smaller is better */
  function pairs(host, rows, label, opt) {
    const W = 720, rowH = opt.rowH || 40, L = opt.L || 190, R = 600, T = 4, H = T + rowH * rows.length + 4;
    const c = PV.svg(host, W, H, label);
    const g = c.svg;
    rows.forEach(function (r, i) {
      const y = T + rowH * i, max = opt.max || Math.max(r.v[0], r.v[1]) * 1.05;
      const x = PV.linear(0, max, L, R);
      const best = r.low ? (r.v[0] < r.v[1] ? 0 : 1) : (r.v[0] > r.v[1] ? 0 : 1);
      PV.el(g, "text", { x: L - 10, y: y + rowH / 2 + 4, "text-anchor": "end", class: "tt" }, r.k);
      r.v.forEach(function (v, j) {
        const by = y + 4 + j * (rowH - 8) / 2, bh = (rowH - 8) / 2 - 2;
        PV.hbar(g, x(0), by, Math.max(1, x(v) - x(0)), bh, "mk", COL[j]);
        PV.el(g, "text", { x: x(v) + 6, y: by + bh - 3, class: j === best && r.v[0] !== r.v[1] ? "tt" : "vl" }, r.f ? r.f(v) : v);
      });
      if (r.v[0] !== r.v[1]) {
        const rel = (r.v[0] - r.v[1]) / r.v[1] * 100;
        PV.el(g, "text", { x: W - 4, y: y + rowH / 2 + 4, "text-anchor": "end", class: "tk" }, "v11: " + Math.abs(rel).toFixed(1) + "% " + (rel > 0 ? "higher" : "lower"));
      }
      const hit = PV.el(g, "rect", { x: 0, y: y, width: W, height: rowH, class: "hit", "aria-label": r.k });
      PV.hover(c, hit, "<b>" + r.k + "</b><br>" + M[0] + ": " + (r.f ? r.f(r.v[0]) : r.v[0]) + "<br>" + M[1] + ": " + (r.f ? r.f(r.v[1]) : r.v[1]) +
        "<br>" + (r.low ? "lower" : "higher") + " is better" + (r.v[0] === r.v[1] ? "" : " · " + M[best] + " wins"));
    });
  }

  /* ---------- 1. Table 1: architectural and computational efficiency ---------- */
  (function eff() {
    const host = $("nuc-eff");
    if (!host) return;
    const A = {
      size: [
        { k: "Parameters (M)", v: [10.08, 9.91], low: true },
        { k: "Layers", v: [203, 294], low: true },
        { k: "GFLOPs", v: [35.6, 35.6], low: true }
      ],
      train: [
        { k: "Training duration (min)", v: [35, 44], low: true, f: function (v) { return "~" + v; } },
        { k: "Training speed (it/s)", v: [2.5, 1.7], f: function (v) { return "~" + v; } },
        { k: "Peak GPU memory (GB)", v: [4.62, 5.52], low: true },
        { k: "Best epoch", v: [88, 98], low: true }
      ],
      infer: [
        { k: "Inference latency (ms)", v: [6.3, 11.3], low: true },
        { k: "Frames per second", v: [Math.round(1000 / 6.3), Math.round(1000 / 11.3)] }
      ]
    };
    const N = {
      size: "Nearly the same size and the same compute (35.6 GFLOPs), but YOLOv12s-seg is 45% deeper: 294 layers against 203.",
      train: "On the RTX 3050 laptop GPU, YOLOv12s-seg trains about 25% longer, uses about 0.9 GB more memory and reaches its best epoch later.",
      infer: "Latency nearly doubles: 6.3 ms against 11.3 ms per image. Frames per second are derived as 1000 / latency."
    };
    PV.seg($("nuc-eff-g"), function (v) {
      pairs(host, A[v], "Efficiency of the two models", { rowH: 44 });
      $("nuc-eff-note").textContent = N[v];
    });
  })();

  /* ---------- 2. Fig. 2: confusion matrices and the metrics they imply ---------- */
  (function cm() {
    const host = $("nuc-cm");
    if (!host) return;
    const C = [{ tp: 4850, fn: 834, fp: 1009 }, { tp: 4642, fn: 1042, fp: 855 }];
    function met(m) {
      const p = m.tp / (m.tp + m.fp), r = m.tp / (m.tp + m.fn);
      return { p: p, r: r, f: 2 * p * r / (p + r) };
    }
    const bars = $("nuc-cm-bars");
    PV.seg($("nuc-cm-m"), function (v) {
      const i = +v, m = C[i], W = 330, H = 290, L = 70, T = 26, S = 120;
      const c = PV.svg(host, W, H, "Confusion matrix of " + M[i]);
      const g = c.svg;
      const cells = [[m.tp, "TP", "nucleus found"], [m.fn, "FN", "nucleus missed"], [m.fp, "FP", "false nucleus"], [0, "TN", "not counted"]];
      PV.el(g, "text", { x: L + S, y: 14, "text-anchor": "middle", class: "tk" }, "predicted");
      PV.el(g, "text", { x: L + S / 2, y: T + 2 * S + 16, "text-anchor": "middle", class: "tk" }, "nucleus");
      PV.el(g, "text", { x: L + 1.5 * S, y: T + 2 * S + 16, "text-anchor": "middle", class: "tk" }, "background");
      PV.el(g, "text", { x: L - 8, y: T + S / 2 + 4, "text-anchor": "end", class: "tk" }, "nucleus");
      PV.el(g, "text", { x: L - 8, y: T + 1.5 * S + 4, "text-anchor": "end", class: "tk" }, "backgr.");
      cells.forEach(function (cl, k) {
        const cx = L + (k % 2) * S, cy = T + Math.floor(k / 2) * S, a = cl[0] / 5000;
        PV.el(g, "rect", { x: cx + 1, y: cy + 1, width: S - 2, height: S - 2, rx: 6, fill: COL[i], "fill-opacity": (0.08 + 0.85 * a).toFixed(2) });
        PV.el(g, "text", { x: cx + S / 2, y: cy + S / 2, "text-anchor": "middle", class: "tt", style: a > 0.5 ? "fill:#fff" : "" }, cl[0].toLocaleString("en"));
        PV.el(g, "text", { x: cx + S / 2, y: cy + S / 2 + 18, "text-anchor": "middle", class: "tk", style: a > 0.5 ? "fill:#fff" : "" }, cl[1] + " · " + cl[2]);
      });
      /* both models' metrics, the selected one outlined */
      const rows = [["Precision", "p"], ["Recall", "r"], ["F1-score", "f"]];
      const W2 = 360, rowH = 50, L2 = 80, R2 = 300, H2 = rowH * 3 + 22;
      const c2 = PV.svg(bars, W2, H2, "Precision, recall and F1 computed from the matrices");
      const g2 = c2.svg, x = PV.linear(0.7, 0.9, L2, R2);
      for (let t = 0.7; t <= 0.9001; t += 0.05) {
        PV.el(g2, "line", { x1: x(t), x2: x(t), y1: 0, y2: rowH * 3, class: "gl" });
        PV.el(g2, "text", { x: x(t), y: rowH * 3 + 16, "text-anchor": "middle", class: "tk" }, t.toFixed(2));
      }
      rows.forEach(function (r, k) {
        const y = rowH * k;
        PV.el(g2, "text", { x: L2 - 8, y: y + rowH / 2 + 4, "text-anchor": "end", class: "tt" }, r[0]);
        C.forEach(function (mm, j) {
          const v = met(mm)[r[1]], by = y + 6 + j * 19;
          PV.hbar(g2, x(0.7), by, x(v) - x(0.7), 16, "mk", COL[j]).setAttribute("opacity", j === i ? 1 : 0.4);
          PV.el(g2, "text", { x: x(v) + 5, y: by + 13, class: j === i ? "tt" : "vl" }, (v * 100).toFixed(1) + "%");
        });
      });
      const s = met(m);
      $("nuc-cm-note").innerHTML = "<b>" + M[i] + "</b>: precision = TP / (TP + FP) = " + (s.p * 100).toFixed(1) + "%, recall = TP / (TP + FN) = " + (s.r * 100).toFixed(1) + "%, F1 = " + (s.f * 100).toFixed(1) + "%. " +
        (i === 0 ? "More nuclei found (fewer misses), at the price of more false nuclei." : "Fewer false nuclei, but 208 more nuclei missed: recall drops.");
    });
  })();

  /* ---------- 3. IoU lab: why mAP@0.5:0.95 is stricter than mAP@0.5 ---------- */
  (function iou() {
    const host = $("nuc-iou");
    if (!host) return;
    const sh = $("nuc-iou-shift"), sc = $("nuc-iou-scale"), out = $("nuc-iou-out");
    function overlap(r1, r2, d) {
      if (d >= r1 + r2) return 0;
      if (d <= Math.abs(r1 - r2)) return Math.PI * Math.min(r1, r2) * Math.min(r1, r2);
      const a = Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1)), b = Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2));
      return r1 * r1 * (a - Math.sin(2 * a) / 2) + r2 * r2 * (b - Math.sin(2 * b) / 2);
    }
    function draw() {
      const d = +sh.value, k = +sc.value / 100, R1 = 60, R2 = R1 * k;
      $("nuc-iou-shift-out").textContent = d + " px";
      $("nuc-iou-scale-out").textContent = sc.value + "%";
      const I = overlap(R1, R2, d), U = Math.PI * (R1 * R1 + R2 * R2) - I, v = I / U;
      const W = 720, H = 200, cx = 150, cy = 98;
      const c = PV.svg(host, W, H, "Ground-truth nucleus and predicted mask");
      const g = c.svg;
      PV.el(g, "circle", { cx: cx, cy: cy, r: R1, fill: "var(--pv-base)", "fill-opacity": 0.25, stroke: "var(--ds-text)", "stroke-width": 2, "stroke-dasharray": "5 4" });
      PV.el(g, "circle", { cx: cx + d, cy: cy, r: R2, fill: "var(--pv-s1)", "fill-opacity": 0.35, stroke: "var(--pv-s1)", "stroke-width": 2 });
      PV.el(g, "text", { x: cx, y: 192, "text-anchor": "middle", class: "tk" }, "dashed: ground truth · blue: prediction");
      PV.el(g, "text", { x: 330, y: 30, class: "tt" }, "IoU = overlap / union = " + v.toFixed(3));
      let pass = 0;
      for (let t = 0; t < 10; t++) {
        const th = 0.5 + 0.05 * t, ok = v >= th - 1e-9, x0 = 330 + t * 38;
        if (ok) pass++;
        PV.el(g, "rect", { x: x0, y: 50, width: 34, height: 34, rx: 5, fill: ok ? "var(--pv-s1)" : "var(--ds-surface-strong)", stroke: "var(--ds-border-base)" });
        PV.el(g, "text", { x: x0 + 17, y: 72, "text-anchor": "middle", class: "vl", style: ok ? "fill:#fff;font-weight:700" : "" }, th.toFixed(2).slice(1));
      }
      PV.el(g, "text", { x: 330, y: 106, class: "tk" }, "IoU thresholds used by mAP@0.5:0.95 (filled = counted as a hit)");
      PV.el(g, "text", { x: 330, y: 140, class: "vl" }, "mAP@0.5 counts it: " + (v >= 0.5 ? "yes" : "no"));
      PV.el(g, "text", { x: 330, y: 162, class: "vl" }, "mAP@0.5:0.95 counts it at " + pass + " of 10 thresholds");
      out.innerHTML = v >= 0.95 ? "Almost perfect boundary: a hit at every threshold." :
        v >= 0.5 ? "A clear hit for mAP@0.5, but it fails " + (10 - pass) + " of the stricter thresholds. Small boundary errors are invisible to mAP@0.5 and costly for mAP@0.5:0.95." :
        "Below 0.5: a miss under both metrics, and the nucleus also counts as a false negative.";
    }
    [sh, sc].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 4. Tables 3 and 4: validation metrics ---------- */
  (function results() {
    const host = $("nuc-res");
    if (!host) return;
    const R = {
      mask: [
        { k: "Mask precision", v: [0.907, 0.905] }, { k: "Mask recall", v: [0.784, 0.755] },
        { k: "Mask mAP@0.5", v: [0.873, 0.839] }, { k: "Mask mAP@0.5:0.95", v: [0.528, 0.478] }
      ],
      box: [
        { k: "Box mAP@0.5", v: [0.883, 0.85] }, { k: "Box mAP@0.5:0.95", v: [0.650, 0.595] }
      ]
    };
    const N = {
      mask: "Precision is a tie; YOLOv11s-seg pulls ahead on recall and, most clearly, on the strict mask mAP@0.5:0.95, where boundary quality decides.",
      box: "Box detection is closer at IoU 0.5 and diverges under stricter thresholds, again in favour of YOLOv11s-seg."
    };
    PV.seg($("nuc-res-g"), function (v) {
      pairs(host, R[v], "Validation metrics of the two models", { rowH: 50, max: 1, L: 170 });
      $("nuc-res-note").textContent = N[v];
    });
  })();

  /* ---------- 5. Figs. 3 and 4: training curves ---------- */
  (function curves() {
    const img = $("nuc-curve-img");
    if (!img) return;
    PV.seg($("nuc-curve-m"), function (v) {
      img.src = "img/nucleus/curves" + v + ".webp";
      img.alt = "Training curves of YOLOv" + v + "s-seg over 100 epochs: precision, recall, mAP50 and mAP50-95 for boxes (B) and masks (M)";
    });
    new Image().src = "img/nucleus/curves12.webp";
  })();

  /* ---------- 6. Fig. 5: qualitative comparison ---------- */
  (function qual() {
    const org = $("nuc-q-org");
    if (!org) return;
    const a = $("nuc-q-a"), b = $("nuc-q-b"), note = $("nuc-q-note");
    const N = {
      1: "Dense fluorescence field with many small nuclei: the case where missed small nuclei show up first.",
      2: "Large, faint fluorescent nuclei: low contrast makes the mask boundary the hard part.",
      3: "Stained bright-field tissue with touching nuclei: the case where adjacent instances can merge."
    };
    PV.seg($("nuc-q-img"), function (v) {
      org.src = "img/nucleus/r" + v + "o.webp";
      a.src = "img/nucleus/r" + v + "a.webp";
      b.src = "img/nucleus/r" + v + "b.webp";
      note.textContent = N[v];
    });
    ["1", "2", "3"].forEach(function (k) { ["o", "a", "b"].forEach(function (s) { new Image().src = "img/nucleus/r" + k + s + ".webp"; }); });
  })();

  const t = $("nuc-rel");
  if (t) PV.sortable(t);
})();
