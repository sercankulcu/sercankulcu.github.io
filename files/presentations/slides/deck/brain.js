/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Meta-Learner Ensemble Model for Brain Tumor Classification" (ICEANS 2025): interactive slides.
   Numbers are taken from Table 1 and Fig. 2 of the paper; the Otsu lab runs the paper's preprocessing
   steps in the browser on the Fig. 1 images. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };
  const CLS = { none: "no tumor", glioma: "glioma", meningioma: "meningioma", pituitary: "pituitary" };

  /* ---------- 1. Fig. 1: preprocessing steps per class ---------- */
  (function pipe() {
    const seg = $("br-cls");
    if (!seg) return;
    const N = {
      none: "No tumor: thresholding keeps the whole brain; the crop removes the empty border.",
      glioma: "Glioma: the thresholded region covers almost the whole head, so the crop changes little.",
      meningioma: "Meningioma: the bright mass is clearly visible in every step and stays inside the crop.",
      pituitary: "Pituitary: the bright tumor at the skull base stays in the crop, which now fills the frame."
    };
    PV.seg(seg, function (v) {
      ["a", "b", "c", "d"].forEach(function (s) {
        const img = $("br-" + s);
        img.src = "img/brain/" + v + "_" + s + ".webp";
        img.alt = CLS[v] + " MRI, step (" + s + ")";
      });
      $("br-cls-note").textContent = N[v];
    });
    Object.keys(CLS).forEach(function (k) { ["a", "b", "c", "d"].forEach(function (s) { new Image().src = "img/brain/" + k + "_" + s + ".webp"; }); });
  })();

  /* ---------- 2. Otsu lab: median blur, Otsu threshold, largest region, ROI crop ---------- */
  (function otsu() {
    const src = $("br-otsu-src");
    if (!src) return;
    const bin = $("br-otsu-bin"), crop = $("br-otsu-crop"), hist = $("br-otsu-hist");
    const thr = $("br-otsu-thr"), out = $("br-otsu-out");
    const S = 200;
    [src, bin, crop].forEach(function (c) { c.width = S; c.height = S; });
    const sx = src.getContext("2d", { willReadFrequently: true }), bx = bin.getContext("2d"), cx = crop.getContext("2d");
    let gray = null, blurred = null, base = null, useMedian = true, otsuT = 0;
    const img = new Image();
    function median(g) {
      const o = new Uint8Array(g.length), w = [];
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
        w.length = 0;
        for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) {
          const xx = Math.min(S - 1, Math.max(0, x + i)), yy = Math.min(S - 1, Math.max(0, y + j));
          w.push(g[yy * S + xx]);
        }
        w.sort(function (a, b) { return a - b; });
        o[y * S + x] = w[12];
      }
      return o;
    }
    function otsuOf(h, n) {
      let sum = 0;
      for (let i = 0; i < 256; i++) sum += i * h[i];
      let sB = 0, wB = 0, best = 0, t = 0;
      for (let i = 0; i < 256; i++) {
        wB += h[i];
        if (!wB) continue;
        const wF = n - wB;
        if (!wF) break;
        sB += i * h[i];
        const mB = sB / wB, mF = (sum - sB) / wF, v = wB * wF * (mB - mF) * (mB - mF);
        if (v > best) { best = v; t = i; }
      }
      return t;
    }
    function largest(mask) {
      const lab = new Int32Array(S * S), stack = new Int32Array(S * S);
      let id = 0, bestN = 0, bb = null;
      for (let p = 0; p < S * S; p++) {
        if (!mask[p] || lab[p]) continue;
        id++;
        let top = 0, n = 0, x0 = S, y0 = S, x1 = 0, y1 = 0;
        stack[top++] = p; lab[p] = id;
        while (top) {
          const q = stack[--top], x = q % S, y = (q - x) / S;
          n++;
          if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
          const nb = [x > 0 ? q - 1 : -1, x < S - 1 ? q + 1 : -1, y > 0 ? q - S : -1, y < S - 1 ? q + S : -1];
          for (let k = 0; k < 4; k++) { const r = nb[k]; if (r >= 0 && mask[r] && !lab[r]) { lab[r] = id; stack[top++] = r; } }
        }
        if (n > bestN) { bestN = n; bb = { x0: x0, y0: y0, x1: x1, y1: y1, id: id }; }
      }
      return { bb: bb, lab: lab, n: bestN };
    }
    function prepare() {
      sx.clearRect(0, 0, S, S);
      sx.drawImage(img, 0, 0, S, S);
      const d = sx.getImageData(0, 0, S, S).data;
      gray = new Uint8Array(S * S);
      for (let i = 0; i < S * S; i++) gray[i] = Math.round(0.299 * d[4 * i] + 0.587 * d[4 * i + 1] + 0.114 * d[4 * i + 2]);
      blurred = median(gray);
      base = sx.getImageData(0, 0, S, S);
    }
    function run(auto) {
      if (!gray) return;
      const g = useMedian ? blurred : gray, h = new Array(256).fill(0);
      for (let i = 0; i < S * S; i++) h[g[i]]++;
      otsuT = otsuOf(h, S * S);
      if (auto) thr.value = otsuT;
      const t = +thr.value;
      $("br-otsu-thr-out").textContent = t + (t === otsuT ? " · Otsu" : "");
      const mask = new Uint8Array(S * S);
      let fg = 0;
      for (let i = 0; i < S * S; i++) if (g[i] > t) { mask[i] = 1; fg++; }
      const L = largest(mask);
      /* binary image, largest region tinted */
      const bi = bx.createImageData(S, S);
      for (let i = 0; i < S * S; i++) {
        const k = 4 * i, on = mask[i], big = L.bb && L.lab[i] === L.bb.id;
        bi.data[k] = on ? (big ? 255 : 150) : 0; bi.data[k + 1] = on ? (big ? 255 : 150) : 0; bi.data[k + 2] = on ? (big ? 255 : 150) : 0; bi.data[k + 3] = 255;
      }
      bx.putImageData(bi, 0, 0);
      /* source (grey or denoised) with the bounding box */
      const si = sx.createImageData(S, S);
      for (let i = 0; i < S * S; i++) { const k = 4 * i; si.data[k] = si.data[k + 1] = si.data[k + 2] = g[i]; si.data[k + 3] = 255; }
      sx.putImageData(si, 0, 0);
      cx.fillStyle = "#000"; cx.fillRect(0, 0, S, S);
      if (L.bb) {
        const b = L.bb, w = b.x1 - b.x0 + 1, hh = b.y1 - b.y0 + 1;
        sx.strokeStyle = "#eb6834"; sx.lineWidth = 2; sx.strokeRect(b.x0 + 0.5, b.y0 + 0.5, w - 1, hh - 1);
        const src0 = document.createElement("canvas"); src0.width = S; src0.height = S;
        src0.getContext("2d").putImageData(base, 0, 0);
        cx.drawImage(src0, b.x0, b.y0, w, hh, 0, 0, S, S);
      }
      /* histogram with the threshold */
      const W = 300, H = 150, Lm = 6, R = 294, T = 6, B = 124;
      const c = PV.svg(hist, W, H, "Grey-level histogram and threshold");
      const sg = c.svg, x = PV.linear(0, 255, Lm, R);
      /* square-root scale, so the dark background peak does not flatten the rest */
      const mx = Math.sqrt(Math.max.apply(null, h.slice(12)) || 1), y = PV.linear(0, mx, B, T);
      let path = "M" + x(0) + " " + B;
      for (let i = 0; i < 256; i++) path += " L" + x(i).toFixed(1) + " " + Math.max(T, y(Math.min(Math.sqrt(h[i]), mx))).toFixed(1);
      path += " L" + x(255) + " " + B + " Z";
      PV.el(sg, "path", { d: path, fill: "var(--pv-base)", "fill-opacity": 0.5 });
      PV.el(sg, "line", { x1: x(otsuT), x2: x(otsuT), y1: T, y2: B, stroke: "var(--pv-s1)", "stroke-width": 2, "stroke-dasharray": "4 3" });
      PV.el(sg, "line", { x1: x(t), x2: x(t), y1: T, y2: B, stroke: "var(--pv-s2)", "stroke-width": 2 });
      PV.el(sg, "text", { x: Lm, y: B + 16, class: "tk" }, "0 · dark");
      PV.el(sg, "text", { x: R, y: B + 16, "text-anchor": "end", class: "tk" }, "bright · 255");
      const area = L.bb ? ((L.bb.x1 - L.bb.x0 + 1) * (L.bb.y1 - L.bb.y0 + 1) / (S * S) * 100) : 0;
      out.innerHTML = "Foreground " + (fg / (S * S) * 100).toFixed(0) + "% of pixels · largest region " + (L.n / (S * S) * 100).toFixed(0) + "% · crop keeps <b>" + area.toFixed(0) + "%</b> of the frame. " +
        (!L.bb ? "Nothing passes the threshold: there is no region to crop." : t - otsuT > 40 ? "Too high: the largest region shrinks to the brightest structure and the crop may cut away tissue." :
          otsuT - t > 40 ? "Too low: background noise joins the foreground and the crop no longer removes the border." :
            "Near Otsu's choice: the threshold that best separates the two grey-level groups.");
    }
    function load(v) {
      img.onload = function () { prepare(); run(true); };
      img.src = "img/brain/" + v + "_a.webp";
    }
    PV.seg($("br-otsu-cls"), load);
    PV.seg($("br-otsu-med"), function (v) { useMedian = v === "on"; run(true); });
    thr.addEventListener("input", function () { run(false); });
    $("br-otsu-auto").addEventListener("click", function () { run(true); });
  })();

  /* ---------- 3. Table 1: per-class metrics of the four models ---------- */
  (function table() {
    const host = $("br-t1");
    if (!host) return;
    const C = ["glioma", "meningioma", "no tumor", "pituitary", "weighted avg"];
    const M = [
      { n: "DenseNet201", col: "var(--pv-base)", v: [[.9960, .9724, .9841], [.9804, .9804, .9804], [.9859, 1, .9929], [.9868, 1, .9934], [.9871, .9870, .9870]] },
      { n: "ResNet50", col: "#1baf7a", v: [[.9960, .9843, .9901], [.9901, .9771, .9836], [.9859, 1, .9929], [.9803, .9967, .9884], [.9881, .9880, .9880]] },
      { n: "EfficientNet-B0", col: "var(--pv-s1)", v: [[.9882, .9921, .9902], [.9869, .9837, .9853], [.9929, 1, .9964], [.9967, .9933, .9950], [.9910, .9910, .9910]] },
      { n: "Ensemble", col: "var(--pv-s2)", v: [[1, 1, 1], [.9977, .9947, .9962], [.9935, 1, .9967], [1, .9979, .9990], [.9980, .9980, .9980]] }
    ];
    const NAME = ["Precision", "Recall", "F1-score"];
    PV.seg($("br-t1-m"), function (k) {
      const j = +k, W = 720, rowH = 46, L = 110, R = 690, T = 4, H = T + rowH * C.length + 24;
      const c = PV.svg(host, W, H, NAME[j] + " per class and model");
      const g = c.svg, x = PV.linear(0.97, 1.0, L, R);
      for (let v = 0.97; v <= 1.0001; v += 0.005) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * C.length, class: "gl" });
        PV.el(g, "text", { x: x(v), y: T + rowH * C.length + 16, "text-anchor": "middle", class: "tk" }, v.toFixed(3));
      }
      C.forEach(function (cl, i) {
        const y0 = T + rowH * i, avg = i === C.length - 1;
        if (avg) PV.el(g, "rect", { x: 2, y: y0 + 1, width: W - 4, height: rowH - 2, rx: 6, fill: "var(--ds-surface-strong)" });
        PV.el(g, "text", { x: L - 10, y: y0 + rowH / 2 + 4, "text-anchor": "end", class: "tt" }, cl);
        M.forEach(function (m, q) {
          const v = m.v[i][j], yy = y0 + 8 + q * (rowH - 16) / 3;
          PV.el(g, "line", { x1: x(0.97), x2: x(v), y1: yy, y2: yy, stroke: "var(--ds-border-base)", "stroke-width": 1 });
          PV.el(g, "circle", { cx: x(v), cy: yy, r: q === 3 ? 6 : 4.5, fill: m.col, stroke: "var(--ds-bg)", "stroke-width": 1.5 });
        });
        const hit = PV.el(g, "rect", { x: 0, y: y0, width: W, height: rowH, class: "hit", "aria-label": cl });
        PV.hover(c, hit, "<b>" + cl + " · " + NAME[j] + "</b><br>" + M.map(function (m) { return m.n + ": " + m.v[i][j].toFixed(4); }).join("<br>"));
      });
    });
  })();

  /* ---------- 4. Fig. 2: confusion matrix of the ensemble ---------- */
  (function cm() {
    const host = $("br-cm");
    if (!host) return;
    const L = ["glioma", "meningioma", "no tumor", "pituitary"];
    const A = [[249, 3, 0, 2], [2, 293, 9, 2], [0, 0, 140, 0], [0, 4, 0, 296]];
    const note = $("br-cm-note");
    const W = 380, H = 330, X0 = 92, Y0 = 26, S = 70;
    const c = PV.svg(host, W, H, "Confusion matrix of the ensemble on the 1,000 test images");
    const g = c.svg;
    PV.el(g, "text", { x: X0 + 2 * S, y: 14, "text-anchor": "middle", class: "tk" }, "predicted label");
    L.forEach(function (l, i) {
      PV.el(g, "text", { x: X0 - 8, y: Y0 + S * i + S / 2 + 4, "text-anchor": "end", class: "tk" }, l);
      PV.el(g, "text", { x: X0 + S * i + S / 2, y: Y0 + 4 * S + 16, "text-anchor": "middle", class: "tk" }, l);
    });
    function say(i, j) {
      const v = A[i][j], row = A[i].reduce(function (s, a) { return s + a; }, 0);
      note.innerHTML = i === j ? "<b>" + v + "</b> of the " + row + " " + L[i] + " test images are classified correctly." :
        v ? "<b>" + v + "</b> " + L[i] + " image" + (v > 1 ? "s are" : " is") + " predicted as " + L[j] + "." +
          (i === 1 && j === 2 ? " The largest error: meningiomas called tumor-free, the costly direction in a clinic." : "") :
          "No " + L[i] + " image is predicted as " + L[j] + ".";
    }
    A.forEach(function (r, i) {
      r.forEach(function (v, j) {
        const x = X0 + S * j, y = Y0 + S * i, a = v / 300, diag = i === j;
        const cell = PV.el(g, "rect", { x: x + 1, y: y + 1, width: S - 2, height: S - 2, rx: 5, fill: diag ? "var(--pv-s1)" : "var(--pv-s2)", "fill-opacity": diag ? (0.15 + 0.8 * a).toFixed(2) : (v ? 0.15 + v / 12 : 0.04).toFixed(2), tabindex: 0, style: "cursor:pointer" });
        PV.el(g, "text", { x: x + S / 2, y: y + S / 2 + 5, "text-anchor": "middle", class: "tt", style: diag && a > 0.5 ? "fill:#fff;pointer-events:none" : "pointer-events:none" }, v);
        cell.addEventListener("mouseenter", function () { say(i, j); });
        cell.addEventListener("focus", function () { say(i, j); });
        cell.addEventListener("click", function () { say(i, j); });
      });
    });
    say(1, 2);
  })();

  const t = $("br-rel");
  if (t) PV.sortable(t);
})();
