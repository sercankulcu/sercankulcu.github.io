/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Enhancing Radar PPI-Based Maritime Object Detection Using Hybrid Preprocessing and Deep Learning Approach"
   (IEEE Access 14, 2026): interactive slides. Numbers are taken from Tables 2–10 of the paper; the preprocessing
   lab and the loss-weight toy re-implement the described steps in the browser and say so on their slides. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };

  const CLASSES = ["All", "Fixed", "Target", "Landmass"];
  const METRICS = { p: "Precision", r: "Recall", m50: "mAP50", m95: "mAP50-95" };
  /* [P, R, mAP50, mAP50-95] for All, Fixed (class 0), Target (1), Landmass (2) */
  const RESULTS = {
    raw: {
      "YOLOv5s": [[.748, .820, .810, .663], [.471, .501, .426, .237], [.816, .946, .966, .760], [.944, .996, .994, .961]],
      "YOLOv8s": [[.803, .837, .840, .685], [.545, .569, .553, .307], [.883, .947, .971, .780], [.979, .995, .995, .968]],
      "YOLOv10s": [[.717, .766, .788, .637], [.474, .368, .385, .213], [.822, .911, .947, .737], [.851, .971, .976, .922]],
      "YOLOv11s": [[.770, .804, .809, .662], [.471, .448, .426, .235], [.857, .939, .963, .763], [.971, .994, .994, .956]],
      "YOLOv12s": [[.810, .836, .850, .686], [.542, .548, .576, .321], [.883, .962, .985, .787], [.999, .992, .995, .961]]
    },
    prep: {
      "YOLOv5s": [[.859, .890, .902, .742], [.710, .672, .718, .445], [.904, .993, .988, .807], [.966, .999, .995, .970]],
      "YOLOv8s": [[.887, .891, .910, .762], [.721, .699, .743, .472], [.946, .978, .991, .830], [.995, .997, .995, .983]],
      "YOLOv10s": [[.815, .859, .885, .742], [.681, .620, .686, .424], [.872, .963, .975, .833], [.895, .986, .989, .960]],
      "YOLOv11s": [[.839, .878, .884, .739], [.635, .660, .674, .417], [.903, .970, .976, .823], [.976, .999, .995, .966]],
      "YOLOv12s": [[.886, .904, .917, .748], [.752, .757, .772, .503], [.917, .978, .988, .774], [.992, .989, .995, .971]]
    },
    enh: {
      "YOLOv8s + P2": [[.898, .942, .941, .789], [.759, .843, .833, .567], [.963, .985, .992, .823], [.990, .998, .995, .974]],
      "YOLOv12s + P2": [[.901, .933, .946, .807], [.785, .826, .853, .595], [.945, .977, .989, .847], [.992, .996, .995, .978]],
      "YOLOv8s + P2 + Loss": [[.895, .967, .957, .813], [.769, .936, .883, .617], [.939, .981, .994, .835], [.996, .996, .995, .988]],
      "YOLOv12s + P2 + Loss": [[.889, .964, .958, .812], [.752, .916, .883, .612], [.943, .988, .994, .836], [.992, .998, .995, .988]]
    }
  };
  const MI = { p: 0, r: 1, m50: 2, m95: 3 };

  /* ---------- 1. Table 2: instances per class and split ---------- */
  (function split() {
    const host = $("ppi-split");
    if (!host) return;
    const SPL = ["Train", "Validation", "Test"];
    const D = { Fixed: [724, 233, 127], Target: [2001, 665, 340], Landmass: [2479, 832, 446] };
    const COL = { Fixed: "var(--pv-s1)", Target: "var(--pv-s2)", Landmass: "var(--ppi-s3)" };
    const W = 360, H = 230, L = 46, R = 352, T = 12, B = 200;
    const c = PV.svg(host, W, H, "Annotated instances per class and split");
    const g = c.svg;
    const y = PV.linear(0, 2500, B, T);
    for (let v = 0; v <= 2500; v += 500) {
      PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" });
      PV.el(g, "text", { x: L - 6, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v);
    }
    const band = (R - L) / 3, bw = 22, gap = 2;
    SPL.forEach(function (s, i) {
      const x0 = L + band * i + (band - 3 * bw - 2 * gap) / 2;
      Object.keys(D).forEach(function (k, j) {
        const v = D[k][i], bx = x0 + j * (bw + gap);
        PV.vbar(g, bx, B, bw, B - y(v), "mk", COL[k]);
        const hit = PV.el(g, "rect", { x: bx - 1, y: T, width: bw + 2, height: B - T, class: "hit", "aria-label": k + " " + s });
        PV.hover(c, hit, "<b>" + k + "</b> · " + s + "<br>" + v.toLocaleString("en") + " instances");
      });
      PV.el(g, "text", { x: L + band * i + band / 2, y: B + 18, "text-anchor": "middle", class: "tk" }, s);
    });
  })();

  /* ---------- 2. preprocessing lab on the raw PPI frame ---------- */
  (function lab() {
    const canvas = $("ppi-lab");
    if (!canvas) return;
    const ksl = $("ppi-lab-k"), kout = $("ppi-lab-k-out"), info = $("ppi-lab-info");
    const src = new Image();
    let base = null, W = 0, H = 0, step = "closed";
    const cache = {};
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    src.onload = function () {
      W = canvas.width = src.naturalWidth; H = canvas.height = src.naturalHeight;
      ctx.drawImage(src, 0, 0);
      base = ctx.getImageData(0, 0, W, H);
      compute();
      draw();
    };
    src.src = canvas.dataset.src;

    /* 1–4: HSV mask for the yellow echo hues, masked grey image, Gaussian adaptive threshold (11 × 11) */
    function compute() {
      const d = base.data, n = W * H;
      const mask = new Uint8Array(n), gray = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const r = d[4 * i] / 255, g = d[4 * i + 1] / 255, b = d[4 * i + 2] / 255;
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b), dl = mx - mn;
        let h = 0;
        if (dl > 0) h = mx === r ? 60 * (((g - b) / dl) % 6) : mx === g ? 60 * ((b - r) / dl + 2) : 60 * ((r - g) / dl + 4);
        if (h < 0) h += 360;
        const s = mx ? dl / mx : 0;
        if (h >= 35 && h <= 75 && s >= 0.35 && mx >= 0.45) { mask[i] = 1; gray[i] = 0.299 * d[4 * i] + 0.587 * d[4 * i + 1] + 0.114 * d[4 * i + 2]; }
      }
      /* separable Gaussian, sigma as OpenCV uses for an 11 × 11 block */
      const K = 5, sig = 0.3 * ((11 - 1) * 0.5 - 1) + 0.8, wts = [];
      let sum = 0;
      for (let k = -K; k <= K; k++) { const w = Math.exp(-k * k / (2 * sig * sig)); wts.push(w); sum += w; }
      for (let k = 0; k < wts.length; k++) wts[k] /= sum;
      const tmp = new Float32Array(n), mean = new Float32Array(n);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        let a = 0;
        for (let k = -K; k <= K; k++) a += wts[k + K] * gray[y * W + Math.min(W - 1, Math.max(0, x + k))];
        tmp[y * W + x] = a;
      }
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        let a = 0;
        for (let k = -K; k <= K; k++) a += wts[k + K] * tmp[Math.min(H - 1, Math.max(0, y + k)) * W + x];
        mean[y * W + x] = a;
      }
      const bin = new Uint8Array(n);
      for (let i = 0; i < n; i++) bin[i] = gray[i] > 0 && gray[i] >= mean[i] - 8 ? 1 : 0;
      cache.mask = mask; cache.gray = gray; cache.bin = bin;
    }

    /* 5: closing = dilation then erosion with a k × k rectangle (separable max / min) */
    function morph(img, k, isMax) {
      const r = (k - 1) / 2, out = new Uint8Array(W * H), tmp = new Uint8Array(W * H);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        let v = isMax ? 0 : 1;
        for (let t = -r; t <= r; t++) {
          const xx = x + t;
          const p = xx < 0 || xx >= W ? (isMax ? 0 : 1) : img[y * W + xx];
          if (isMax ? p : !p) { v = isMax ? 1 : 0; break; }
        }
        tmp[y * W + x] = v;
      }
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        let v = isMax ? 0 : 1;
        for (let t = -r; t <= r; t++) {
          const yy = y + t;
          const p = yy < 0 || yy >= H ? (isMax ? 0 : 1) : tmp[yy * W + x];
          if (isMax ? p : !p) { v = isMax ? 1 : 0; break; }
        }
        out[y * W + x] = v;
      }
      return out;
    }
    function regions(img) {
      const seen = new Uint8Array(W * H), stack = [];
      let count = 0;
      for (let i = 0; i < W * H; i++) {
        if (!img[i] || seen[i]) continue;
        let size = 0;
        stack.push(i); seen[i] = 1;
        while (stack.length) {
          const j = stack.pop(), x = j % W, y = (j - x) / W;
          size++;
          if (x > 0 && img[j - 1] && !seen[j - 1]) { seen[j - 1] = 1; stack.push(j - 1); }
          if (x < W - 1 && img[j + 1] && !seen[j + 1]) { seen[j + 1] = 1; stack.push(j + 1); }
          if (y > 0 && img[j - W] && !seen[j - W]) { seen[j - W] = 1; stack.push(j - W); }
          if (y < H - 1 && img[j + W] && !seen[j + W]) { seen[j + W] = 1; stack.push(j + W); }
        }
        count++;
      }
      return count;
    }
    function draw() {
      if (!base) return;
      /* the paper's kernels act on 1280 px frames; this image is W px wide, so scale the kernel and keep it odd */
      const k = +ksl.value, ke = Math.max(1, 2 * Math.round((k * W / 1280 - 1) / 2) + 1);
      kout.textContent = k + " × " + k;
      const out = ctx.createImageData(W, H), o = out.data, d = base.data, n = W * H;
      let shown = null;
      if (step === "original") o.set(d);
      else if (step === "mask") for (let i = 0; i < n; i++) { const m = cache.mask[i]; o[4 * i] = m ? d[4 * i] : 0; o[4 * i + 1] = m ? d[4 * i + 1] : 0; o[4 * i + 2] = m ? d[4 * i + 2] : 0; o[4 * i + 3] = 255; }
      else if (step === "gray") for (let i = 0; i < n; i++) { const v = cache.gray[i]; o[4 * i] = o[4 * i + 1] = o[4 * i + 2] = v; o[4 * i + 3] = 255; }
      else {
        shown = step === "bin" ? cache.bin : (cache["k" + ke] || (cache["k" + ke] = morph(morph(cache.bin, ke, true), ke, false)));
        for (let i = 0; i < n; i++) { const v = shown[i] ? 255 : 0; o[4 * i] = o[4 * i + 1] = o[4 * i + 2] = v; o[4 * i + 3] = 255; }
      }
      ctx.putImageData(out, 0, 0);
      const TXT = {
        original: "Raw simulator frame: yellow echoes on the blue PPI disc, green interface text around it.",
        mask: "Eq. (1): pixels whose hue, saturation and value fall in the yellow echo range are kept; the blue disc and the green text disappear.",
        gray: "The masked image in grey levels, ready for local thresholding.",
        bin: "Eqs. (2)–(3): each pixel is compared with the Gaussian-weighted mean of its 11 × 11 neighbourhood. Echoes become solid white but stay fragmented.",
        closed: "Eq. (4): dilation then erosion with a " + k + " × " + k + " kernel (on 1280 px frames; " + ke + " × " + ke + " on this " + W + " px image) bridges gaps between echo fragments."
      };
      let extra = "";
      if (shown) extra = " <b>" + regions(shown).toLocaleString("en") + "</b> separate white regions" + (step === "closed" ? " at " + k + " × " + k : "") + ".";
      info.innerHTML = TXT[step] + extra;
    }
    PV.seg($("ppi-lab-step"), function (v) { step = v; ksl.disabled = v !== "closed"; draw(); });
    ksl.addEventListener("input", draw);
  })();

  /* ---------- 3. kernel size viewer (Fig. 2) ---------- */
  (function kernels() {
    const img = $("ppi-k-img");
    if (!img) return;
    const sl = $("ppi-k"), out = $("ppi-k-out"), note = $("ppi-k-note");
    const K = [0, 1, 3, 5, 7, 9, 11, 13];
    const NOTE = {
      0: ["", "Original frame. The yellow circle in the next panels marks a fragmented echo."],
      1: ["miss", "1 × 1 changes nothing: the echo is a row of separate dashes."],
      3: ["miss", "Still fragmented: small kernels leave the discontinuities that cause split detections."],
      5: ["miss", "Gaps begin to close, but the circled echo is still broken."],
      7: ["extra", "Most fragments connect; below 7 × 7 discontinuities remain."],
      9: ["extra", "Nearly continuous, with some small gaps left."],
      11: ["ok", "The chosen setting: fragments of land and coastline join without visibly merging separate echoes."],
      13: ["extra", "Over-smoothing begins: more risk of merging independent reflections, so sizes above 11 × 11 were not used."]
    };
    const LAB = { ok: "chosen", miss: "fragmented", extra: "trade-off" };
    function draw() {
      const k = K[+sl.value];
      img.src = "img/ppi/k" + k + ".webp";
      img.alt = k ? "Binary radar frame after closing with a " + k + " × " + k + " kernel" : "Original radar PPI frame";
      out.textContent = k ? k + " × " + k : "original";
      const n = NOTE[k];
      note.innerHTML = (n[0] ? '<span class="pv-badge pv-badge--' + n[0] + '">' + LAB[n[0]] + "</span> " : "") + n[1];
    }
    /* load every panel up front so dragging the slider never shows an empty frame */
    K.forEach(function (k) { new Image().src = "img/ppi/k" + k + ".webp"; });
    sl.addEventListener("input", draw);
    draw();
  })();

  /* ---------- 4. P2 layer: how many feature cells does a small object cover? ---------- */
  (function strides() {
    const host = $("ppi-p2");
    if (!host) return;
    const sl = $("ppi-p2-size"), out = $("ppi-p2-size-out");
    const LV = [{ n: "P2", s: 4, add: true }, { n: "P3", s: 8 }, { n: "P4", s: 16 }, { n: "P5", s: 32 }];
    function draw() {
      const z = +sl.value;
      out.textContent = z + " × " + z + " px";
      const W = 380, rowH = 38, L = 120, R = 330, H = rowH * LV.length + 30;
      const c = PV.svg(host, W, H, "Feature cells covered by a " + z + " pixel object at each scale");
      const g = c.svg;
      const x = PV.linear(0, 8, L, R);
      [0, 1, 2, 4, 8].forEach(function (v) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: 4, y2: rowH * LV.length + 4, class: v === 1 ? "ax" : "gl" });
        PV.el(g, "text", { x: x(v), y: rowH * LV.length + 20, "text-anchor": "middle", class: "tk" }, v);
      });
      PV.el(g, "text", { x: R, y: H - 1, "text-anchor": "end", class: "tk" }, "cells across the object →");
      LV.forEach(function (lv, i) {
        const cells = z / lv.s, y = 4 + rowH * i + 9;
        PV.el(g, "text", { x: 0, y: y + 14, class: "tt" }, lv.n + " / " + lv.s);
        PV.el(g, "text", { x: 0, y: y + 28, class: "tk" }, (640 / lv.s) + " × " + (640 / lv.s) + (lv.add ? " · new" : ""));
        PV.hbar(g, x(0), y, Math.max(1, x(Math.min(cells, 8)) - x(0)), 18, "mk", cells < 1 ? "var(--ds-bad)" : lv.add ? "var(--pv-s2)" : "var(--pv-s1)");
        PV.el(g, "text", { x: x(Math.min(cells, 8)) + 6, y: y + 14, class: "vl" }, cells.toFixed(2) + (cells < 1 ? " (< 1 cell)" : ""));
      });
    }
    sl.addEventListener("input", draw);
    draw();
  })();

  /* ---------- 5. area-aware loss: box checker and loss share ---------- */
  (function loss() {
    const host = $("ppi-loss-box");
    if (!host) return;
    const bw = $("ppi-loss-w"), bh = $("ppi-loss-h"), ww = $("ppi-loss-weight");
    const boxOut = $("ppi-loss-box-out"), share = $("ppi-loss-share"), wOut = $("ppi-loss-weight-out");
    /* training instances (Table 2); the 8 × 8 threshold is about the median buoy size, so half of the buoy boxes are taken as small */
    const N = 724 + 2001 + 2479, SMALL = 362;
    function draw() {
      const w = +bw.value, h = +bh.value, wt = +ww.value;
      const small = w * h < 64;
      boxOut.innerHTML = w + " × " + h + " = <b>" + (w * h) + " px²</b> → weight <b>" + (small ? "2.0" : "1.0") + "</b>" + (small ? " (small box)" : "");
      const S = 6, c = PV.svg(host, 200, 200, "Box of " + w + " by " + h + " pixels against an 8 by 8 reference");
      const g = c.svg;
      for (let i = 0; i <= 32; i += 4) {
        PV.el(g, "line", { x1: 4 + i * S, x2: 4 + i * S, y1: 4, y2: 196, class: "gl" });
        PV.el(g, "line", { x1: 4, x2: 196, y1: 4 + i * S, y2: 4 + i * S, class: "gl" });
      }
      PV.el(g, "rect", { x: 4 + 12 * S, y: 4 + 12 * S, width: 8 * S, height: 8 * S, fill: "none", stroke: "var(--ds-muted)", "stroke-width": 1.5, "stroke-dasharray": "4 3" });
      PV.el(g, "rect", { x: 4 + (16 - w / 2) * S, y: 4 + (16 - h / 2) * S, width: w * S, height: h * S, fill: small ? "var(--pv-s2)" : "var(--pv-s1)", opacity: .35, stroke: small ? "var(--pv-s2)" : "var(--pv-s1)", "stroke-width": 2 });
      wOut.textContent = "w = " + wt.toFixed(1);
      const p = SMALL * wt / (N - SMALL + SMALL * wt) * 100;
      share.innerHTML =
        '<div class="ppi-share"><i style="width:' + p.toFixed(1) + '%"></i></div>' +
        "Small boxes carry <b>" + p.toFixed(1) + "%</b> of the box loss (" + (SMALL / N * 100).toFixed(1) + "% of the boxes)." +
        (wt > 2 ? " Beyond 2.0 the paper saw overall accuracy fall: larger objects lose too much influence." : wt === 2 ? " The paper's choice." : "");
    }
    [bw, bh, ww].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 6. results explorer (Tables 3–5) ---------- */
  (function explorer() {
    const host = $("ppi-ex");
    if (!host) return;
    const note = $("ppi-ex-note");
    const st = { stage: "prep", cls: "1", metric: "m95" };
    PV.seg($("ppi-ex-stage"), function (v) { st.stage = v; draw(); });
    PV.seg($("ppi-ex-cls"), function (v) { st.cls = v; draw(); });
    PV.seg($("ppi-ex-metric"), function (v) { st.metric = v; draw(); });
    function draw() {
      if (!st.stage || !st.cls || !st.metric) return;
      const src = RESULTS[st.stage], ci = +st.cls, mi = MI[st.metric];
      const names = Object.keys(src);
      const W = 720, rowH = 32, L = 170, R = 600, T = 6, H = T + rowH * names.length + 30;
      const c = PV.svg(host, W, H, METRICS[st.metric] + " for class " + CLASSES[ci]);
      const g = c.svg;
      const x = PV.linear(0, 1, L, R);
      for (let v = 0; v <= 1.0001; v += 0.2) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * names.length, class: v ? "gl" : "ax" });
        PV.el(g, "text", { x: x(v), y: T + rowH * names.length + 16, "text-anchor": "middle", class: "tk" }, v.toFixed(1));
      }
      let best = null;
      names.forEach(function (m, i) {
        const v = src[m][ci][mi], y = T + rowH * i + 7;
        if (!best || v > src[best][ci][mi]) best = m;
        const enh = st.stage === "enh";
        PV.el(g, "text", { x: L - 8, y: y + 13, "text-anchor": "end", class: "tt" }, m);
        PV.hbar(g, x(0), y, x(v) - x(0), 18, "mk", enh ? "var(--pv-s2)" : "var(--pv-s1)");
        /* change against the raw baseline of the same backbone */
        const baseName = m.split(" ")[0], raw = RESULTS.raw[baseName][ci][mi];
        const d = v - raw;
        PV.el(g, "text", { x: x(v) + 6, y: y + 13, class: "vl" }, v.toFixed(3) + (st.stage === "raw" ? "" : "  (" + (d >= 0 ? "+" : "−") + Math.abs(d).toFixed(3) + " vs raw)"));
        const hit = PV.el(g, "rect", { x: 0, y: y - 7, width: W, height: rowH, class: "hit", "aria-label": m });
        const row = src[m][ci];
        PV.hover(c, hit, "<b>" + m + "</b> · " + CLASSES[ci] + "<br>P " + row[0].toFixed(3) + " · R " + row[1].toFixed(3) + "<br>mAP50 " + row[2].toFixed(3) + " · mAP50-95 " + row[3].toFixed(3) + "<br>raw " + baseName + ": " + raw.toFixed(3));
      });
      note.innerHTML = "Highest " + METRICS[st.metric] + ": <b>" + best + "</b> (" + src[best][ci][mi].toFixed(3) + ")." +
        (ci === 1 ? " Fixed objects (buoys) are the hardest class at every stage." : "");
    }
    draw();
  })();

  /* ---------- 7. the fixed-object journey ---------- */
  (function journey() {
    const host = $("ppi-jr");
    if (!host) return;
    PV.seg($("ppi-jr-m"), function (metric) {
      const mi = MI[metric];
      const STG = ["Raw", "Preprocessed", "+ P2", "+ P2 + Loss"];
      const S = [
        { n: "YOLOv8s", col: "var(--pv-s1)", v: [RESULTS.raw.YOLOv8s[1][mi], RESULTS.prep.YOLOv8s[1][mi], RESULTS.enh["YOLOv8s + P2"][1][mi], RESULTS.enh["YOLOv8s + P2 + Loss"][1][mi]] },
        { n: "YOLOv12s", col: "var(--pv-s2)", v: [RESULTS.raw.YOLOv12s[1][mi], RESULTS.prep.YOLOv12s[1][mi], RESULTS.enh["YOLOv12s + P2"][1][mi], RESULTS.enh["YOLOv12s + P2 + Loss"][1][mi]] }
      ];
      const W = 720, H = 226, L = 50, R = 600, T = 16, B = 192;
      const c = PV.svg(host, W, H, METRICS[metric] + " of the fixed class across the four stages");
      const g = c.svg;
      const lo = 0.2, hi = 1.0;
      const x = PV.linear(0, 3, L + 30, R - 30), y = PV.linear(lo, hi, B, T);
      for (let v = lo; v <= hi + 1e-9; v += 0.2) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
        PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v.toFixed(1));
      }
      STG.forEach(function (s, j) { PV.el(g, "text", { x: x(j), y: B + 20, "text-anchor": "middle", class: "tk" }, s); });
      S.forEach(function (s, k) {
        PV.el(g, "path", { d: s.v.map(function (v, j) { return (j ? "L" : "M") + x(j) + " " + y(v); }).join(" "), fill: "none", stroke: s.col, "stroke-width": 2 });
        s.v.forEach(function (v, j) {
          PV.el(g, "circle", { cx: x(j), cy: y(v), r: 5, fill: s.col, stroke: "var(--ds-bg)", "stroke-width": 2 });
          PV.el(g, "text", { x: x(j), y: y(v) + (k ? 18 : -10), "text-anchor": "middle", class: "vl" }, v.toFixed(3));
          const hit = PV.el(g, "circle", { cx: x(j), cy: y(v), r: 12, class: "hit", "aria-label": s.n + " " + STG[j] });
          PV.hover(c, hit, "<b>" + s.n + "</b> · " + STG[j] + "<br>Fixed class " + METRICS[metric] + ": " + v.toFixed(3));
        });
        PV.el(g, "text", { x: R - 20, y: y(s.v[3]) + (k ? 20 : -2), class: "tt" }, s.n);
      });
    });
  })();

  /* ---------- 8. inference latency (Tables 6–7) ---------- */
  (function latency() {
    const host = $("ppi-lat");
    if (!host) return;
    const D = {
      raw: [["YOLOv5s", 36.3, 4.8, 29.2, 66.6], ["YOLOv8s", 35.5, 4.2, 27.8, 49.2], ["YOLOv10s", 33.8, 4.2, 28.3, 48.1], ["YOLOv11s", 35.4, 4.8, 28.6, 58.2], ["YOLOv12s", 37.9, 4.8, 32.0, 59.2]],
      prep: [["YOLOv5s", 25.3, 3.9, 20.7, 48.4], ["YOLOv8s", 25.0, 3.0, 21.2, 36.8], ["YOLOv10s", 22.6, 2.2, 20.2, 39.0], ["YOLOv11s", 25.4, 3.8, 20.6, 39.5], ["YOLOv12s", 28.0, 2.4, 25.2, 38.9],
        ["YOLOv8s + P2", 31.0, 8.0, 25.4, 75.4], ["YOLOv12s + P2", 32.2, 1.7, 30.0, 44.1], ["YOLOv8s + P2 + Loss", 27.7, 1.9, 25.2, 35.9], ["YOLOv12s + P2 + Loss", 33.6, 2.7, 30.0, 47.9]]
    };
    PV.seg($("ppi-lat-set"), function (k) {
      const rows = D[k];
      const W = 720, rowH = 27, L = 170, R = 640, T = 6, H = T + rowH * rows.length + 32;
      const c = PV.svg(host, W, H, "Inference latency, " + (k === "raw" ? "raw" : "preprocessed") + " images");
      const g = c.svg;
      const x = PV.linear(0, 80, L, R);
      for (let v = 0; v <= 80; v += 10) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * rows.length, class: v ? "gl" : "ax" });
        PV.el(g, "text", { x: x(v), y: T + rowH * rows.length + 16, "text-anchor": "middle", class: "tk" }, v);
      }
      PV.el(g, "text", { x: R, y: H - 1, "text-anchor": "end", class: "tk" }, "milliseconds per image (RTX 3050 Laptop, 640 × 640)");
      rows.forEach(function (r, i) {
        const y = T + rowH * i + rowH / 2, enh = r[0].indexOf("P2") >= 0, col = enh ? "var(--pv-s2)" : "var(--pv-s1)";
        PV.el(g, "text", { x: L - 8, y: y + 4, "text-anchor": "end", class: "tt" }, r[0]);
        PV.el(g, "line", { x1: x(r[3]), x2: x(r[4]), y1: y, y2: y, stroke: col, "stroke-width": 1.5, opacity: .6 });
        PV.el(g, "rect", { x: x(r[1] - r[2]), y: y - 6, width: x(r[1] + r[2]) - x(r[1] - r[2]), height: 12, rx: 3, fill: col, opacity: .25 });
        PV.el(g, "circle", { cx: x(r[1]), cy: y, r: 5, fill: col, stroke: "var(--ds-bg)", "stroke-width": 2 });
        PV.el(g, "text", { x: x(r[4]) + 6, y: y + 4, class: "vl" }, r[1].toFixed(1) + " ms");
        const hit = PV.el(g, "rect", { x: 0, y: y - rowH / 2, width: W, height: rowH, class: "hit", "aria-label": r[0] });
        PV.hover(c, hit, "<b>" + r[0] + "</b><br>mean " + r[1] + " ms · sd " + r[2] + "<br>min " + r[3] + " · max " + r[4] + " ms");
      });
    });
  })();

  /* ---------- 9. Table 9: accuracy vs computational cost ---------- */
  (function backbones() {
    const host = $("ppi-bb");
    if (!host) return;
    const D = [
      ["YOLOv5s", .859, .890, .902, .742, 9.1, 24.0, 25.3, 0], ["YOLOv8s", .887, .891, .910, .762, 11.1, 28.7, 25.0, 0],
      ["YOLOv10s", .815, .859, .885, .742, 8.1, 24.8, 22.6, 0], ["YOLOv11s", .839, .878, .884, .739, 9.4, 21.6, 25.4, 0],
      ["YOLOv12s", .886, .904, .917, .748, 9.3, 21.5, 28.0, 0], ["EfficientNet-B0", .836, .884, .891, .744, 5.3, 2.6, 10.7, 1],
      ["GhostNet", .850, .896, .899, .751, 5.2, 7.1, 10.7, 1], ["MobileNetV3", .851, .889, .894, .747, 5.4, 11.2, 13.8, 1],
      ["ShuffleNetV2", .834, .880, .885, .740, 2.3, 1.8, 9.1, 1]
    ];
    const LABEL = { "YOLOv8s": [8, -8], "YOLOv12s": [-8, -8, "end"], "EfficientNet-B0": [8, 14], "GhostNet": [8, -8], "MobileNetV3": [8, 4], "ShuffleNetV2": [8, 4] };
    PV.seg($("ppi-bb-m"), function (metric) {
      const j = metric === "m50" ? 3 : 4;
      const W = 720, H = 268, L = 56, R = 690, T = 14, B = 228;
      const c = PV.svg(host, W, H, "GFLOPs versus " + METRICS[metric]);
      const g = c.svg;
      const x = PV.log(1.5, 40, L, R);
      const lo = metric === "m50" ? 0.88 : 0.735, hi = metric === "m50" ? 0.92 : 0.765, stp = metric === "m50" ? 0.01 : 0.005;
      const y = PV.linear(lo, hi, B, T);
      for (let v = lo; v <= hi + 1e-9; v += stp) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
        PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v.toFixed(3));
      }
      [2, 5, 10, 20].forEach(function (v) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: B, y2: B + 5, class: "ax" });
        PV.el(g, "text", { x: x(v), y: B + 19, "text-anchor": "middle", class: "tk" }, v);
      });
      PV.el(g, "line", { x1: L, x2: R, y1: B, y2: B, class: "ax" });
      PV.el(g, "text", { x: R, y: B + 36, "text-anchor": "end", class: "tk" }, "GFLOPs (log scale) →");
      D.forEach(function (d) {
        const cx = x(d[6]), cy = y(d[j]), col = d[8] ? "var(--pv-s2)" : "var(--pv-s1)";
        PV.el(g, "circle", { cx: cx, cy: cy, r: 6, fill: col, stroke: "var(--ds-bg)", "stroke-width": 2 });
        const lb = LABEL[d[0]];
        if (lb) PV.el(g, "text", { x: cx + lb[0], y: cy + lb[1], "text-anchor": lb[2] || "start", class: "vl" }, d[0]);
        const hit = PV.el(g, "circle", { cx: cx, cy: cy, r: 13, class: "hit", "aria-label": d[0] });
        PV.hover(c, hit, "<b>" + d[0] + "</b><br>P " + d[1] + " · R " + d[2] + "<br>mAP50 " + d[3] + " · mAP50-95 " + d[4] + "<br>" + d[5] + " M params · " + d[6] + " GFLOPs<br>" + d[7] + " ms / image");
      });
    });
  })();

  /* ---------- 10. DAAN external validation (Table 10) ---------- */
  (function daan() {
    const host = $("ppi-daan");
    if (!host) return;
    const D = [["Raw", 3301, 41, 1339, .6983, .6750], ["Preproc.", 4296, 230, 344, .9149, .7243], ["Preproc. + P2", 4306, 315, 334, .9169, .7406], ["Preproc. + P2 + Loss", 4329, 315, 311, .9218, .7451]];
    const W = 720, H = 196, L = 56, R = 700, T = 14, B = 162;
    const c = PV.svg(host, W, H, "Missed detections and false alarms on DAAN");
    const g = c.svg;
    const y = PV.linear(0, 1400, B, T);
    for (let v = 0; v <= 1400; v += 350) {
      PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" });
      PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v);
    }
    const band = (R - L) / D.length, bw = 44;
    D.forEach(function (d, i) {
      const x0 = L + band * i + band / 2 - bw - 1;
      PV.vbar(g, x0, B, bw, B - y(d[3]), "mk", "var(--pv-s1)");
      PV.vbar(g, x0 + bw + 2, B, bw, Math.max(1, B - y(d[2])), "mk", "var(--pv-s2)");
      PV.el(g, "text", { x: x0 + bw / 2, y: y(d[3]) - 5, "text-anchor": "middle", class: "vl" }, d[3]);
      PV.el(g, "text", { x: x0 + bw * 1.5 + 2, y: y(d[2]) - 5, "text-anchor": "middle", class: "vl" }, d[2]);
      PV.el(g, "text", { x: L + band * i + band / 2, y: B + 18, "text-anchor": "middle", class: "tk" }, d[0]);
      const hit = PV.el(g, "rect", { x: L + band * i, y: T, width: band, height: B - T, class: "hit", "aria-label": d[0] });
      PV.hover(c, hit, "<b>" + d[0] + "</b><br>TP " + d[1] + " · FP " + d[2] + " · FN " + d[3] + "<br>mAP50 " + d[4] + " · mAP50-95 " + d[5]);
    });
  })();

  document.querySelectorAll("#ds-deck table.pv-sort").forEach(PV.sortable);
})();
