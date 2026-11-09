/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Overcoming resolution constraints in automated colony counting via a high-performance deep learning framework
   using SAHI" (Scientific Reports 16, 2026): interactive slides. Numbers are taken from Tables 1–6 of the paper;
   the tiling calculator uses an assumed plate resolution and says so on its slide. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };
  const MET = { p: "Precision", r: "Recall", m50: "mAP@0.5", m95: "mAP@0.5:0.95" };

  /* ---------- 1. Table 1: tiles per class ---------- */
  (function classes() {
    const host = $("col-cls");
    if (!host) return;
    const D = [
      ["Actinobacillus equuli", 12, 187], ["Actinobacillus pleuropneumoniae", 10, 281], ["Aeromonas hydrophila", 12, 178],
      ["Bacillus cereus", 6, 143], ["Bibersteinia trehalosi", 18, 517], ["Bordetella bronchiseptica", 35, 859],
      ["Brucella ovis", 12, 255], ["Clostridium perfringens", 12, 268], ["Corynebacterium pseudotuberculosis", 12, 281],
      ["Erysipelothrix rhusiopathiae", 21, 428], ["Escherichia coli", 5, 117], ["Glaesserella parasuis", 9, 192],
      ["Klebsiella pneumoniae", 6, 184], ["Listeria monocytogenes", 18, 322], ["Paenibacillus larvae", 9, 227],
      ["Pasteurella multocida", 16, 306], ["Proteus mirabilis", 3, 76], ["Pseudomonas aeruginosa", 12, 299],
      ["Rhodococcus equi", 24, 599], ["Salmonella enterica", 6, 170], ["Staphylococcus aureus", 48, 1797],
      ["Staphylococcus hyicus", 24, 621], ["Streptococcus agalactiae", 23, 603], ["Trueperella pyogenes", 16, 310]
    ];
    PV.seg($("col-cls-m"), function (k) {
      const tiles = k === "tiles";
      const rows = D.slice().sort(function (a, b) { return tiles ? b[2] - a[2] : b[2] / b[1] - a[2] / a[1]; });
      const W = 720, rowH = 14.5, L = 230, R = 650, T = 4, H = T + rowH * rows.length + 22;
      const c = PV.svg(host, W, H, tiles ? "Tiles per class" : "Tiles per original image, per class");
      const g = c.svg;
      const max = tiles ? 1800 : 40, step = tiles ? 300 : 10;
      const x = PV.linear(0, max, L, R);
      for (let v = 0; v <= max; v += step) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * rows.length, class: v ? "gl" : "ax" });
        PV.el(g, "text", { x: x(v), y: T + rowH * rows.length + 14, "text-anchor": "middle", class: "tk" }, v);
      }
      rows.forEach(function (r, i) {
        const y = T + rowH * i, v = tiles ? r[2] : r[2] / r[1];
        PV.el(g, "text", { x: L - 6, y: y + 11, "text-anchor": "end", class: "tk", style: "font-style:italic" }, r[0]);
        PV.hbar(g, x(0), y + 2, x(v) - x(0), rowH - 4, "mk", "var(--pv-s1)");
        PV.el(g, "text", { x: x(v) + 4, y: y + 11, class: "tk" }, tiles ? r[2] : v.toFixed(1));
        const hit = PV.el(g, "rect", { x: 0, y: y, width: W, height: rowH, class: "hit", "aria-label": r[0] });
        PV.hover(c, hit, "<b><i>" + r[0] + "</i></b><br>" + r[1] + " plates → " + r[2] + " tiles<br>" + (r[2] / r[1]).toFixed(1) + " tiles per plate");
      });
    });
  })();

  /* ---------- 2. tiling calculator on the Fig. 4 plate ---------- */
  (function tiling() {
    const host = $("col-tile");
    if (!host) return;
    const res = $("col-tile-res"), ov = $("col-tile-ov"), dia = $("col-tile-d"), info = $("col-tile-info");
    const S = 640, BOX = 300;
    function draw() {
      const Wn = +res.value, o = +ov.value / 100, d = +dia.value;
      $("col-tile-res-out").textContent = Wn + " px";
      $("col-tile-ov-out").textContent = Math.round(o * 100) + "%";
      $("col-tile-d-out").textContent = d + " px";
      const stride = Math.round(S * (1 - o));
      /* SAHI-style slicing: regular strides, the last slice is shifted back so it ends at the border */
      const starts = [];
      for (let p = 0; ; p += stride) { if (p + S >= Wn) { starts.push(Math.max(0, Wn - S)); break; } starts.push(p); }
      const n = starts.length, k = BOX / Wn;
      const c = PV.svg(host, BOX, BOX, n * n + " tiles of 640 pixels over a " + Wn + " pixel plate");
      const g = c.svg;
      PV.el(g, "image", { href: "img/colony/q_original.webp", x: 0, y: 0, width: BOX, height: BOX, preserveAspectRatio: "none" });
      starts.forEach(function (sy) {
        starts.forEach(function (sx) {
          PV.el(g, "rect", { x: sx * k, y: sy * k, width: S * k, height: S * k, fill: "none", stroke: "rgba(255,255,255,.55)", "stroke-width": .8 });
        });
      });
      /* two neighbouring tiles and the strip they share */
      if (n > 1) PV.el(g, "rect", { x: starts[1] * k, y: 0, width: (starts[0] + S - starts[1]) * k, height: S * k, fill: "#ffd166", opacity: .45 });
      PV.el(g, "rect", { x: starts[0] * k, y: 0, width: S * k, height: S * k, fill: "none", stroke: "#7bdff2", "stroke-width": 2.5 });
      if (n > 1) PV.el(g, "rect", { x: starts[1] * k, y: 0, width: S * k, height: S * k, fill: "none", stroke: "#ffd166", "stroke-width": 2.5 });
      const dr = d * S / Wn;
      info.innerHTML =
        "<tr><td>Stride = 640 × (1 − overlap)</td><td class='num'><b>" + stride + " px</b></td></tr>" +
        "<tr><td>Tiles per plate</td><td class='num'><b>" + n + " × " + n + " = " + n * n + "</b></td></tr>" +
        "<tr><td>Pixels processed vs plate</td><td class='num'>" + (n * n * S * S / (Wn * Wn)).toFixed(2) + "×</td></tr>" +
        "<tr><td>Resize factor to 640</td><td class='num'>" + (S / Wn).toFixed(3) + "</td></tr>" +
        "<tr><td>Colony after resizing</td><td class='num'><b style='color:var(--ds-bad)'>" + dr.toFixed(1) + " px</b></td></tr>" +
        "<tr><td>Colony inside a tile</td><td class='num'><b style='color:var(--ds-good)'>" + d + " px</b></td></tr>";
    }
    [res, ov, dia].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 3. Table 2: resized vs tiled ---------- */
  const T2 = {
    "YOLOv5n": { resized: [.537, .484, .449, .237], tiled: [.907, .915, .954, .554] },
    "YOLOv8n": { resized: [.708, .602, .613, .317], tiled: [.931, .939, .968, .584] },
    "YOLOv11n": { resized: [.727, .633, .663, .341], tiled: [.932, .941, .969, .582] }
  };
  const MI = { p: 0, r: 1, m50: 2, m95: 3 };
  function grouped(host, title, cats, series, fmt, max, step, unit) {
    const W = 720, H = 262, L = 56, R = 700, T = 34, B = 226;
    const c = PV.svg(host, W, H, title);
    const g = c.svg;
    const y = PV.linear(0, max, B, T);
    for (let v = 0; v <= max + 1e-9; v += step) {
      PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" });
      PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, fmt(v, true));
    }
    PV.el(g, "text", { x: L, y: 12, class: "tk" }, title);
    const band = (R - L) / cats.length, bw = 56;
    cats.forEach(function (cat, i) {
      series.forEach(function (s, j) {
        const v = s.values[i], bx = L + band * i + band / 2 - bw - 1 + j * (bw + 2);
        PV.vbar(g, bx, B, bw, Math.max(1, B - y(v)), "mk", s.color);
        PV.el(g, "text", { x: bx + bw / 2, y: y(v) - 5, "text-anchor": "middle", class: "vl" }, fmt(v));
      });
      PV.el(g, "text", { x: L + band * i + band / 2, y: B + 18, "text-anchor": "middle", class: "tk" }, cat);
      const hit = PV.el(g, "rect", { x: L + band * i, y: T, width: band, height: B - T, class: "hit", "aria-label": cat });
      PV.hover(c, hit, "<b>" + cat + "</b><br>" + series.map(function (s) { return s.name + ": " + fmt(s.values[i]) + (unit || ""); }).join("<br>") +
        (series.length === 2 && series[0].values[i] ? "<br>tiled / resized: " + (series[1].values[i] / series[0].values[i]).toFixed(2) + "×" : ""));
    });
  }
  (function results() {
    const host = $("col-res");
    if (!host) return;
    PV.seg($("col-res-m"), function (k) {
      const cats = Object.keys(T2);
      grouped(host, MET[k] + " on the independent 20% test set", cats, [
        { name: "Resized", color: "var(--pv-base)", values: cats.map(function (m) { return T2[m].resized[MI[k]]; }) },
        { name: "Tiled + SAHI", color: "var(--pv-s1)", values: cats.map(function (m) { return T2[m].tiled[MI[k]]; }) }
      ], function (v, axis) { return axis ? v.toFixed(1) : v.toFixed(3); }, 1, 0.2);
    });
  })();

  /* ---------- 4. Table 3: training and inference cost ---------- */
  (function cost() {
    const host = $("col-cost");
    if (!host) return;
    const cats = ["YOLOv5n", "YOLOv8n", "YOLOv11n"];
    const D = {
      train: { resized: [75, 80, 70], tiled: [290, 310, 285] },
      infer: { resized: [42, 58, 62], tiled: [285, 298, 312] }
    };
    PV.seg($("col-cost-m"), function (k) {
      const tr = k === "train";
      grouped(host, tr ? "Training time (50 epochs, approx.)" : "Whole-plate inference time (ms)", cats, [
        { name: "Resized", color: "var(--pv-base)", values: D[k].resized },
        { name: "Tiled + SAHI", color: "var(--pv-s1)", values: D[k].tiled }
      ], tr ? function (v, axis) { return axis ? (v / 60) + " h" : Math.floor(v / 60) + " h " + (v % 60) + " min"; } : function (v) { return String(Math.round(v)); },
      tr ? 360 : 350, tr ? 60 : 50, tr ? "" : " ms");
    });
  })();

  /* ---------- 5. Table 5: overlap sensitivity ---------- */
  (function overlap() {
    const host = $("col-ov");
    if (!host) return;
    const D = { 10: [.935, .939, .968, .577], 15: [.934, .939, .968, .579], 20: [.932, .941, .969, .582], 25: [.929, .942, .970, .584] };
    const O = [10, 15, 20, 25];
    PV.seg($("col-ov-m"), function (k) {
      const vals = O.map(function (o) { return D[o][MI[k]]; });
      const W = 720, H = 220, L = 60, R = 640, T = 14, B = 186;
      const c = PV.svg(host, W, H, MET[k] + " versus overlap ratio");
      const g = c.svg;
      const mid = (Math.min.apply(null, vals) + Math.max.apply(null, vals)) / 2;
      const lo = Math.floor((mid - 0.01) / 0.005) * 0.005, hi = lo + 0.02;
      const x = PV.linear(7.5, 27.5, L, R), y = PV.linear(lo, hi, B, T);
      for (let v = lo; v <= hi + 1e-9; v += 0.005) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
        PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v.toFixed(3));
      }
      O.forEach(function (o) { PV.el(g, "text", { x: x(o), y: B + 18, "text-anchor": "middle", class: "tk" }, o + "% overlap"); });
      PV.el(g, "path", { d: O.map(function (o, i) { return (i ? "L" : "M") + x(o) + " " + y(vals[i]); }).join(" "), fill: "none", stroke: "var(--pv-s1)", "stroke-width": 2 });
      O.forEach(function (o, i) {
        const sel = o === 20;
        PV.el(g, "circle", { cx: x(o), cy: y(vals[i]), r: sel ? 7 : 5, fill: sel ? "var(--pv-s2)" : "var(--pv-s1)", stroke: "var(--ds-bg)", "stroke-width": 2 });
        PV.el(g, "text", { x: x(o), y: y(vals[i]) - 11, "text-anchor": "middle", class: sel ? "tt" : "vl" }, vals[i].toFixed(3));
        const hit = PV.el(g, "circle", { cx: x(o), cy: y(vals[i]), r: 14, class: "hit", "aria-label": o + "% overlap" });
        PV.hover(c, hit, "<b>" + o + "% overlap</b><br>P " + D[o][0] + " · R " + D[o][1] + "<br>mAP@0.5 " + D[o][2] + " · mAP@0.5:0.95 " + D[o][3]);
      });
      PV.el(g, "text", { x: R + 10, y: T + 10, class: "tk" }, "zoomed axis:");
      PV.el(g, "text", { x: R + 10, y: T + 26, class: "tk" }, "0.02 range");
    });
  })();

  /* ---------- 6. Table 4: comparison with earlier methods ---------- */
  (function sota() {
    const host = $("col-sota");
    if (!host) return;
    /* name, classes, params (M), mAP@0.5, group: 0 = 5-class prior, 1 = 24-class prior, 2 = proposed */
    const D = [
      ["Faster R-CNN + ResNet-50", 5, 41.8, .865, 0], ["Faster R-CNN + ResNet-101", 5, 60.8, .876, 0], ["Faster R-CNN + ResNeXt-101", 5, 79.2, .874, 0],
      ["Faster R-CNN + HRNet", 5, 87.5, .882, 0], ["Cascade R-CNN + ResNet-50", 5, 45.3, .886, 0], ["Cascade R-CNN + ResNet-101", 5, 64.3, .892, 0],
      ["Cascade R-CNN + ResNeXt-101", 5, 83.0, .887, 0], ["Cascade R-CNN + HRNet", 5, 94.2, .891, 0], ["InceptionResNetV2", 5, 55.9, .884, 0],
      ["SE-ResNeXt50", 5, 27.6, .890, 0], ["ViT-L/16", 5, 304.3, .896, 0], ["EfficientNetB6", 5, 43, .902, 0], ["AutoML", 5, 1.8, .910, 0],
      ["YOLOv8 (original)", 24, 3.01, .913, 1], ["MobileNet", 24, 8.72, .884, 1], ["ShuffleNet", 24, 6.38, .846, 1], ["FasterNet", 24, 4.17, .867, 1],
      ["StarNet", 24, 2.22, .914, 1], ["ResNet-50", 24, 23.56, .76, 1], ["MobileNet v2", 24, 2.25, .82, 1], ["Inception", 24, 21.83, .79, 1],
      ["AlexNet", 24, 57.1, .61, 1], ["THP-CNN", 24, 0.62, .85, 1],
      ["Proposed YOLOv5n", 24, 2.5, .954, 2], ["Proposed YOLOv8n", 24, 3, .968, 2], ["Proposed YOLOv11n", 24, 2.6, .969, 2]
    ];
    const COL = ["var(--pv-base)", "var(--pv-s1)", "var(--pv-s2)"];
    const LAB = { "ViT-L/16": [0, -10, "middle"], "AlexNet": [8, 4], "THP-CNN": [8, 4], "Proposed YOLOv11n": [10, -8], "StarNet": [8, 12], "AutoML": [-8, -8, "end"], "ResNet-50": [8, 4] };
    const W = 720, H = 280, L = 56, R = 700, T = 14, B = 242;
    const c = PV.svg(host, W, H, "Parameters versus mAP@0.5 for colony detection methods");
    const g = c.svg;
    const x = PV.log(0.4, 500, L, R), y = PV.linear(0.6, 1.0, B, T);
    for (let v = 0.6; v <= 1.0001; v += 0.1) {
      PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
      PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v.toFixed(1));
    }
    [1, 3, 10, 30, 100, 300].forEach(function (v) {
      PV.el(g, "line", { x1: x(v), x2: x(v), y1: B, y2: B + 5, class: "ax" });
      PV.el(g, "text", { x: x(v), y: B + 19, "text-anchor": "middle", class: "tk" }, v + " M");
    });
    PV.el(g, "line", { x1: L, x2: R, y1: B, y2: B, class: "ax" });
    PV.el(g, "text", { x: R, y: B + 36, "text-anchor": "end", class: "tk" }, "parameters (millions, log scale) →");
    PV.el(g, "text", { x: L, y: T - 2, class: "tk" }, "mAP@0.5 ↑");
    const dots = [];
    D.slice().sort(function (a, b) { return a[4] - b[4]; }).forEach(function (d) {
      const cx = x(d[2]), cy = y(d[3]);
      const dot = PV.el(g, "circle", { cx: cx, cy: cy, r: d[4] === 2 ? 6.5 : 5, class: "mk", fill: COL[d[4]], stroke: "var(--ds-bg)", "stroke-width": 2 });
      dots.push(dot);
      const lb = LAB[d[0]];
      if (lb) PV.el(g, "text", { x: cx + lb[0], y: cy + lb[1], "text-anchor": lb[2] || "start", class: d[4] === 2 ? "tt" : "vl" }, d[0]);
      const hit = PV.el(g, "circle", { cx: cx, cy: cy, r: 11, class: "hit", "aria-label": d[0] });
      PV.hover(c, hit, "<b>" + d[0] + "</b><br>" + d[1] + " classes · " + d[2] + " M params<br>mAP@0.5 " + d[3],
        function () { dots.forEach(function (o) { o.classList.toggle("is-dim", o !== dot); }); },
        function () { dots.forEach(function (o) { o.classList.remove("is-dim"); }); });
    });
  })();

  /* ---------- 7. Table 6: five-fold cross-validation ---------- */
  (function folds() {
    const host = $("col-cv");
    if (!host) return;
    const R5 = [.658, .671, .666, .649, .669], T5 = [.970, .967, .971, .961, .968];
    const W = 720, H = 200, L = 70, R = 690, T = 10, B = 170;
    const c = PV.svg(host, W, H, "mAP@0.5 per fold, resized versus tiled");
    const g = c.svg;
    const x = PV.linear(0.6, 1.0, L, R);
    for (let v = 0.6; v <= 1.0001; v += 0.05) {
      PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: B, class: "gl" });
      PV.el(g, "text", { x: x(v), y: B + 16, "text-anchor": "middle", class: "tk" }, v.toFixed(2));
    }
    const rowH = (B - T) / 5;
    for (let i = 0; i < 5; i++) {
      const y = T + rowH * i + rowH / 2;
      PV.el(g, "text", { x: L - 10, y: y + 4, "text-anchor": "end", class: "tt" }, "Fold " + (i + 1));
      PV.el(g, "line", { x1: x(R5[i]), x2: x(T5[i]), y1: y, y2: y, stroke: "var(--ds-border)", "stroke-width": 2 });
      PV.el(g, "circle", { cx: x(R5[i]), cy: y, r: 6, fill: "var(--pv-base)", stroke: "var(--ds-bg)", "stroke-width": 2 });
      PV.el(g, "circle", { cx: x(T5[i]), cy: y, r: 6, fill: "var(--pv-s1)", stroke: "var(--ds-bg)", "stroke-width": 2 });
      PV.el(g, "text", { x: x(R5[i]) + 10, y: y + 4, class: "vl" }, R5[i].toFixed(3));
      PV.el(g, "text", { x: x(T5[i]) - 10, y: y + 4, "text-anchor": "end", class: "vl" }, T5[i].toFixed(3));
      const hit = PV.el(g, "rect", { x: 0, y: y - rowH / 2, width: W, height: rowH, class: "hit", "aria-label": "Fold " + (i + 1) });
      PV.hover(c, hit, "<b>Fold " + (i + 1) + "</b><br>Resized " + R5[i] + "<br>Tiled " + T5[i] + "<br>gain +" + ((T5[i] - R5[i]) * 100).toFixed(1) + " pp");
    }
  })();

  /* ---------- 8. qualitative viewer (Fig. 4) ---------- */
  (function viewer() {
    const img = $("col-q-img");
    if (!img) return;
    const cap = $("col-q-cap"), note = $("col-q-note");
    const N = {
      v8_resized: ["miss", "YOLOv8n, resized to 640 × 640", "1 colony missed and 5 misclassified: downsampling erased fine colony detail."],
      v8_tiled: ["ok", "YOLOv8n, tiled + NMS", "No missed colonies and no class errors; one extra box from a duplicate at a tile boundary."],
      v11_resized: ["miss", "YOLOv11n, resized to 640 × 640", "2 colonies missed and 3 misclassified."],
      v11_tiled: ["ok", "YOLOv11n, tiled + NMS", "No missed colonies and no class errors; one extra box from a duplicate at a tile boundary."],
      original: ["", "Original image", "The original plate: 26 small, closely packed colonies on blood agar."]
    };
    const LAB = { ok: "all found", miss: "errors" };
    PV.seg($("col-q-v"), function (v) {
      img.src = "img/colony/q_" + v + ".webp";
      img.alt = N[v][1];
      cap.textContent = N[v][1];
      note.innerHTML = (N[v][0] ? '<span class="pv-badge pv-badge--' + N[v][0] + '">' + LAB[N[v][0]] + "</span> " : "") + N[v][2];
    });
    Object.keys(N).forEach(function (k) { new Image().src = "img/colony/q_" + k + ".webp"; });
  })();

  document.querySelectorAll("#ds-deck table.pv-sort").forEach(PV.sortable);
})();
