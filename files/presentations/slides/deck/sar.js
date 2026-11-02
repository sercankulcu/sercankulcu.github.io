/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Impact of Input Resolution on Lightweight Small Ship Detection in SAR Imagery" (IDAP'26): interactive slides.
   All numbers are taken from Tables I–IV of the paper. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };

  /* Table I: HRSID test set, 800 px input */
  const MODELS = [
    ["YOLOv8s", 92.5, 86.2, 93.7, 62.1, 8.1], ["YOLO11s", 92.1, 83.9, 93.5, 61.8, 25.8],
    ["YOLOv5s", 88.2, 81.2, 93.5, 67.5, 26.8], ["YOLO26s", 92.0, 84.1, 93.0, 68.5, 9.5],
    ["YOLOv5n", 91.7, 84.0, 92.8, 68.3, 2.5], ["YOLOv9-tiny", 93.3, 85.6, 92.8, 69.6, 2.0],
    ["YOLO11n", 91.3, 84.3, 92.6, 68.4, 2.6], ["YOLOv8n", 91.9, 84.2, 92.6, 67.5, 3.2],
    ["YOLO10n", 93.5, 85.4, 92.6, 71.1, 2.3], ["YOLO26n", 89.8, 82.4, 91.8, 67.4, 2.4],
    ["YOLO12n", 91.4, 81.4, 91.5, 66.0, 2.6], ["YOLOv6", 92.5, 81.9, 91.2, 66.2, 4.7],
    ["YOLOv4", 90.6, 84.0, 90.1, 65.1, 64.3], ["YOLOv3-tiny", 87.9, 79.1, 86.5, 59.8, 12.1],
    ["YOLOv7-tiny", 90.7, 82.4, 81.9, 54.7, 6.2]
  ].map(function (r) { return { name: r[0], p: r[1], r: r[2], m50: r[3], m95: r[4], params: r[5] }; });

  /* Tables II and III: YOLOv8n at six input sizes (Table III measured on 250 random test images) */
  const RES = [
    { px: 640, p: 90.4, r: 84.1, m50: 90.5, m95: 66.6, ms: 4.71, fps: 212.30, mem: 211 },
    { px: 800, p: 91.9, r: 84.2, m50: 92.6, m95: 67.5, ms: 6.82, fps: 146.55, mem: 271 },
    { px: 1024, p: 93.0, r: 84.4, m50: 93.9, m95: 70.1, ms: 10.63, fps: 94.11, mem: 355 },
    { px: 1280, p: 91.3, r: 87.1, m50: 94.6, m95: 72.0, ms: 18.13, fps: 55.17, mem: 531 },
    { px: 1344, p: 93.7, r: 86.7, m50: 94.7, m95: 72.6, ms: 19.71, fps: 50.74, mem: 599 },
    { px: 1600, p: 91.6, r: 87.9, m50: 94.8, m95: 74.6, ms: 25.54, fps: 39.15, mem: 805 }
  ];

  /* ---------- 1. pixel budget: how big is a small ship after resizing? ---------- */
  (function pixelBudget() {
    const host = $("sar-px"), size = $("sar-px-res"), len = $("sar-px-len");
    if (!host) return;
    const outRes = $("sar-px-res-out"), outLen = $("sar-px-len-out"), info = $("sar-px-info");
    const WIN = 64;            /* window of the 800 px patch shown, in native pixels */
    const BOX = 250;           /* drawn size of that window */
    let stride = 32;
    PV.seg($("sar-px-stride"), function (v) { stride = +v; draw(); });
    function draw() {
      const R = +size.value, L = +len.value, B = Math.max(3, Math.round(L * 0.38));
      const k = R / 800;
      outRes.textContent = R + " px";
      outLen.textContent = L + " × " + B + " px";
      const c = PV.svg(host, BOX + 2, BOX + 2, "Small ship footprint against the feature-map grid");
      const s = BOX / WIN, g = c.svg;
      PV.el(g, "rect", { x: 1, y: 1, width: BOX, height: BOX, fill: "#111", rx: 6 });
      /* speckle-like texture so the window reads as SAR background */
      let seed = 7;
      for (let i = 0; i < 260; i++) {
        seed = (seed * 9301 + 49297) % 233280;
        const x = 1 + (seed / 233280) * BOX;
        seed = (seed * 9301 + 49297) % 233280;
        const y = 1 + (seed / 233280) * BOX;
        PV.el(g, "rect", { x: x.toFixed(1), y: y.toFixed(1), width: 1.6, height: 1.6, fill: "#555" });
      }
      const cx = 1 + BOX / 2, cy = 1 + BOX / 2;
      PV.el(g, "rect", { x: cx - L * s / 2, y: cy - B * s / 2, width: L * s, height: B * s, rx: Math.min(B * s / 2, 6), fill: "#f1f1f1" });
      /* one feature cell = stride input pixels = stride / k native pixels */
      const cell = stride / k * s;
      for (let x = cx - Math.ceil(BOX / 2 / cell) * cell; x <= 1 + BOX; x += cell) {
        if (x >= 1) PV.el(g, "line", { x1: x, y1: 1, x2: x, y2: 1 + BOX, stroke: "#3987e5", "stroke-width": 1.2, opacity: .85 });
      }
      for (let y = cy - Math.ceil(BOX / 2 / cell) * cell; y <= 1 + BOX; y += cell) {
        if (y >= 1) PV.el(g, "line", { x1: 1, y1: y, x2: 1 + BOX, y2: y, stroke: "#3987e5", "stroke-width": 1.2, opacity: .85 });
      }
      PV.el(g, "rect", { x: 1, y: 1, width: BOX, height: BOX, fill: "none", stroke: "var(--ds-border)", "stroke-width": 1.5, rx: 6 });
      const pw = L * k, ph = B * k;
      const cw = pw / stride, ch = ph / stride;
      const level = { 8: "P3", 16: "P4", 32: "P5" }[stride];
      info.innerHTML =
        "<b>On the network input:</b> " + pw.toFixed(1) + " × " + ph.toFixed(1) + " px (" + Math.round(pw * ph) + " px², " +
        "×" + (k * k).toFixed(2) + " of the native area)<br>" +
        "<b>On " + level + " (stride " + stride + "):</b> " + cw.toFixed(2) + " × " + ch.toFixed(2) + " cells" +
        (cw < 1 ? " → the ship is <b>smaller than one cell</b>; its signal is mixed with sea clutter." :
          " → the ship spans " + (cw >= 2 ? "several" : "about one") + " cell" + (cw >= 2 ? "s" : "") + " along its length.");
    }
    size.addEventListener("input", draw);
    len.addEventListener("input", draw);
    draw();
  })();

  /* ---------- 2. Table I scatter: parameters vs accuracy ---------- */
  (function scatter() {
    const host = $("sar-scatter");
    if (!host) return;
    /* label only points that are not in the dense nano cluster for the chosen metric */
    const LABELS = {
      m50: { "YOLOv8n": 1, "YOLOv8s": 1, "YOLOv4": 1, "YOLOv7-tiny": 1, "YOLOv3-tiny": 1 },
      m95: { "YOLOv8n": 1, "YOLO10n": 1, "YOLOv8s": 1, "YOLO11s": 1, "YOLOv7-tiny": 1, "YOLOv4": 1 }
    };
    PV.seg($("sar-scatter-m"), function (metric) {
      const LABEL = LABELS[metric];
      const W = 720, H = 262, L = 52, R = 700, T = 14, B = 224;
      const c = PV.svg(host, W, H, "Parameters versus " + (metric === "m50" ? "mAP50" : "mAP50:95") + " for 15 YOLO models");
      const g = c.svg;
      const x = PV.log(1.5, 80, L, R);
      const lo = metric === "m50" ? 80 : 52, hi = metric === "m50" ? 96 : 74, st = metric === "m50" ? 4 : 4;
      const y = PV.linear(lo, hi, B, T);
      for (let v = lo; v <= hi; v += st) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
        PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v + "%");
      }
      [2, 3, 5, 10, 20, 50].forEach(function (v) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: B, y2: B + 5, class: "ax" });
        PV.el(g, "text", { x: x(v), y: B + 19, "text-anchor": "middle", class: "tk" }, v + " M");
      });
      PV.el(g, "line", { x1: L, x2: R, y1: B, y2: B, class: "ax" });
      PV.el(g, "text", { x: R, y: B + 36, "text-anchor": "end", class: "tk" }, "parameters (millions, log scale) →");
      PV.el(g, "text", { x: L, y: T - 2, class: "tk" }, metric === "m50" ? "mAP50 ↑" : "mAP50:95 ↑");
      const dots = [];
      MODELS.forEach(function (m) {
        const ours = m.name === "YOLOv8n";
        const cx = x(m.params), cy = y(m[metric]);
        const dot = PV.el(g, "circle", { cx: cx, cy: cy, r: ours ? 7 : 5.5, class: "mk", fill: ours ? "var(--pv-s2)" : "var(--pv-s1)", stroke: "var(--ds-bg)", "stroke-width": 2 });
        dots.push(dot);
        if (LABEL[m.name]) {
          const right = cx < R - 90;
          PV.el(g, "text", { x: cx + (right ? 10 : -10), y: cy + (metric === "m95" && m.name === "YOLOv8n" ? 16 : 4), "text-anchor": right ? "start" : "end", class: ours ? "tt" : "vl" }, m.name);
        }
        const hit = PV.el(g, "circle", { cx: cx, cy: cy, r: 12, class: "hit", "aria-label": m.name });
        PV.hover(c, hit, "<b>" + m.name + "</b><br>Params: " + m.params + " M<br>P " + m.p + " · R " + m.r + "<br>mAP50 " + m.m50 + "% · mAP50:95 " + m.m95 + "%",
          function () { dots.forEach(function (d) { d.classList.toggle("is-dim", d !== dot); }); },
          function () { dots.forEach(function (d) { d.classList.remove("is-dim"); }); });
      });
    });
  })();

  /* ---------- 3. Table II line chart: accuracy vs input size ---------- */
  (function resLines() {
    const host = $("sar-res");
    if (!host) return;
    const W = 720, H = 290, L = 52, R = 640, T = 14, B = 250;
    const c = PV.svg(host, W, H, "mAP50 and mAP50:95 of YOLOv8n versus input size");
    const g = c.svg;
    const x = PV.linear(600, 1640, L, R), y = PV.linear(60, 100, B, T);
    for (let v = 60; v <= 100; v += 10) {
      PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
      PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v + "%");
    }
    PV.el(g, "line", { x1: L, x2: R, y1: B, y2: B, class: "ax" });
    RES.forEach(function (d) {
      PV.el(g, "line", { x1: x(d.px), x2: x(d.px), y1: B, y2: B + 5, class: "ax" });
      PV.el(g, "text", { x: x(d.px), y: B + 19, "text-anchor": "middle", class: "tk" }, d.px);
    });
    PV.el(g, "text", { x: R, y: B + 36, "text-anchor": "end", class: "tk" }, "input size (px) →");
    const S = [{ k: "m50", name: "mAP50", col: "var(--pv-s1)" }, { k: "m95", name: "mAP50:95", col: "var(--pv-s2)" }];
    S.forEach(function (s) {
      PV.el(g, "path", { d: RES.map(function (d, i) { return (i ? "L" : "M") + x(d.px) + " " + y(d[s.k]); }).join(" "), fill: "none", stroke: s.col, "stroke-width": 2, "stroke-linejoin": "round" });
      RES.forEach(function (d) { PV.el(g, "circle", { cx: x(d.px), cy: y(d[s.k]), r: 4.5, fill: s.col, stroke: "var(--ds-bg)", "stroke-width": 2 }); });
      const last = RES[RES.length - 1];
      PV.el(g, "text", { x: R + 12, y: y(last[s.k]) + 4, class: "tt" }, s.name);
      PV.el(g, "text", { x: R + 12, y: y(last[s.k]) + 19, class: "vl" }, last[s.k].toFixed(1) + "%");
    });
    /* crosshair columns */
    const cross = PV.el(g, "line", { x1: 0, x2: 0, y1: T, y2: B, stroke: "var(--ds-muted)", "stroke-width": 1, "stroke-dasharray": "3 3", opacity: 0 });
    RES.forEach(function (d, i) {
      const prev = i ? (x(RES[i - 1].px) + x(d.px)) / 2 : L;
      const next = i < RES.length - 1 ? (x(RES[i + 1].px) + x(d.px)) / 2 : R;
      const hit = PV.el(g, "rect", { x: prev, y: T, width: next - prev, height: B - T, class: "hit", "aria-label": d.px + " px" });
      PV.hover(c, hit, "<b>" + d.px + " px</b><br>P " + d.p + "% · R " + d.r + "%<br>mAP50 <b>" + d.m50 + "%</b><br>mAP50:95 <b>" + d.m95 + "%</b>",
        function () { cross.setAttribute("x1", x(d.px)); cross.setAttribute("x2", x(d.px)); cross.setAttribute("opacity", 1); },
        function () { cross.setAttribute("opacity", 0); });
    });
  })();

  /* ---------- 4. Table III bars: cost vs input size ---------- */
  (function costBars() {
    const host = $("sar-cost");
    if (!host) return;
    const META = {
      ms: { name: "Inference time (ms / image)", unit: " ms", d: 2, max: 30, step: 5 },
      fps: { name: "Throughput (FPS)", unit: " FPS", d: 2, max: 250, step: 50 },
      mem: { name: "Peak GPU memory (MB)", unit: " MB", d: 0, max: 900, step: 150 }
    };
    PV.seg($("sar-cost-m"), function (k) {
      const m = META[k];
      const W = 720, H = 234, L = 56, R = 700, T = 18, B = 198;
      const c = PV.svg(host, W, H, m.name + " of YOLOv8n per input size");
      const g = c.svg;
      const y = PV.linear(0, m.max, B, T);
      for (let v = 0; v <= m.max; v += m.step) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" });
        PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v);
      }
      PV.el(g, "text", { x: L, y: T - 6, class: "tk" }, m.name);
      const band = (R - L) / RES.length, bw = 46;
      RES.forEach(function (d, i) {
        const bx = L + band * i + (band - bw) / 2;
        PV.vbar(g, bx, B, bw, B - y(d[k]), "mk", "var(--pv-s1)");
        PV.el(g, "text", { x: bx + bw / 2, y: y(d[k]) - 6, "text-anchor": "middle", class: "vl" }, d[k].toFixed(m.d));
        PV.el(g, "text", { x: bx + bw / 2, y: B + 18, "text-anchor": "middle", class: "tk" }, d.px + " px");
        const hit = PV.el(g, "rect", { x: L + band * i, y: T, width: band, height: B - T, class: "hit", "aria-label": d.px + " px" });
        PV.hover(c, hit, "<b>" + d.px + " px</b><br>" + d.ms + " ms · " + d.fps + " FPS<br>Peak GPU memory " + d.mem + " MB");
      });
    });
  })();

  /* ---------- 5. operating point: best accuracy under an FPS requirement ---------- */
  (function opPoint() {
    const slider = $("sar-op-fps");
    if (!slider) return;
    const out = $("sar-op-fps-out"), tiles = $("sar-op-tiles"), note = $("sar-op-note"), row = $("sar-op-row");
    function draw() {
      const need = +slider.value;
      out.textContent = "≥ " + need + " FPS";
      const ok = RES.filter(function (d) { return d.fps >= need; });
      const best = ok.length ? ok.reduce(function (a, b) { return b.m95 > a.m95 ? b : a; }) : null;
      row.innerHTML = RES.map(function (d) {
        return '<button type="button"' + (d === best ? ' class="is-on"' : "") + (d.fps < need ? ' style="opacity:.4"' : "") +
          ' aria-label="' + d.px + " px, " + d.fps + ' FPS">' + d.px + "</button>";
      }).join("");
      if (!best) {
        tiles.innerHTML = "";
        note.innerHTML = "No input size reaches " + need + " FPS on the RTX 3050 Laptop GPU (the fastest, 640 px, gives 212.30 FPS).";
        return;
      }
      const base = RES[0];
      tiles.innerHTML =
        '<div class="pv-kpi is-best"><span>Input size</span><b>' + best.px + ' px</b><small>' + best.fps + " FPS</small></div>" +
        '<div class="pv-kpi"><span>mAP50</span><b>' + best.m50 + '%</b><small>+' + (best.m50 - base.m50).toFixed(1) + " pp vs 640 px</small></div>" +
        '<div class="pv-kpi"><span>mAP50:95</span><b>' + best.m95 + '%</b><small>+' + (best.m95 - base.m95).toFixed(1) + " pp vs 640 px</small></div>" +
        '<div class="pv-kpi"><span>Cost</span><b>' + best.ms + ' ms</b><small>' + best.mem + " MB peak GPU memory</small></div>";
      note.innerHTML = best.px === 1600 ? "The <b>accuracy-oriented</b> point: highest mAP50 and mAP50:95." :
        best.px === 1344 ? "Near the top: 0.1 pp below the best mAP50, 2.0 pp below the best mAP50:95." :
          best.px === 1280 ? "The paper's <b>efficiency-oriented</b> point: within 0.2 pp of the best mAP50 at 1.4× the throughput of 1600 px." :
            best.px === 1024 ? "A balanced choice: 93.9% mAP50 while staying above 90 FPS." :
              "A speed-first choice: the accuracy is lower, mostly on the strict mAP50:95 metric.";
    }
    slider.addEventListener("input", draw);
    /* clicking a size sets the requirement to that size's own throughput */
    row.addEventListener("click", function (e) {
      const b = e.target.closest("button");
      if (!b) return;
      const d = RES.find(function (r) { return String(r.px) === b.textContent; });
      slider.value = Math.floor(d.fps);
      draw();
    });
    draw();
  })();

  /* ---------- 6. qualitative viewer (Figs. 1 and 2) ---------- */
  (function viewer() {
    const img = $("sar-q-img");
    if (!img) return;
    const gt = $("sar-q-gt"), cap = $("sar-q-cap"), note = $("sar-q-note");
    const NOTES = {
      1: {
        640: ["extra", "6 detections for 5 ships: one extra box, likely bright scattering or a background structure."],
        800: ["extra", "6 detections for 5 ships: the same extra box as at 640 px."],
        1024: ["extra", "6 detections for 5 ships: the extra box remains."],
        1280: ["extra", "6 detections for 5 ships: the extra box remains."],
        1344: ["extra", "6 detections for 5 ships: the extra box remains."],
        1600: ["ok", "5 detections for 5 ships: matches the ground truth with no extra target."]
      },
      2: {
        640: ["miss", "One ship fewer than the ground truth: a small or faint target is missed."],
        800: ["miss", "One ship fewer than the ground truth."],
        1024: ["miss", "Two ships fewer than the ground truth: the largest loss in recall on this sample."],
        1280: ["miss", "One ship fewer than the ground truth."],
        1344: ["extra", "One detection more than the ground truth: an over-detection (false positive)."],
        1600: ["ok", "Closest to the ground truth: small targets are kept and no extra target appears."]
      }
    };
    const LABEL = { ok: "consistent", miss: "missed", extra: "extra" };
    let sample = "1", res = "1600";
    function draw() {
      gt.src = "img/sar/s" + sample + "_gt.webp";
      img.src = "img/sar/s" + sample + "_" + res + ".webp";
      img.alt = "YOLOv8n detections at " + res + " px, sample " + sample;
      gt.alt = "Ground truth, sample " + sample;
      cap.textContent = "YOLOv8n-" + res + " px";
      const n = NOTES[sample][res];
      note.innerHTML = '<span class="pv-badge pv-badge--' + n[0] + '">' + LABEL[n[0]] + "</span> " + n[1];
    }
    PV.seg($("sar-q-sample"), function (v) { sample = v; draw(); });
    PV.seg($("sar-q-res"), function (v) { res = v; draw(); });
  })();

  /* ---------- sortable tables ---------- */
  document.querySelectorAll("#ds-deck table.pv-sort").forEach(PV.sortable);
})();
