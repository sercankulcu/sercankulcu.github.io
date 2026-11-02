/* Copyright (c) Sercan Külcü. All rights reserved. */
/* Two companion hazelnut papers (ICLEMAS 2025): "Selection of the Most Suitable Parameters ... ShuffleNet" and
   "Comparison of the Performance of ResNet-50 and ShuffleNet ...". One script serves both decks; every block
   runs only if its elements exist. Matrices and accuracies are taken from the papers' figures and text; the
   optimizer lab and the channel-shuffle diagram are illustrations and say so on their slides. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };
  const CLS = ["bad (damaged)", "inner (kernel)", "good (quality)"];
  /* confusion matrices: rows = predicted class, columns = true class (MATLAB layout) */
  const M = {
    sgdm: { n: "ShuffleNet + SGDM", short: "SGDM", col: "var(--pv-s1)", A: [[3632, 1, 1], [0, 3657, 1], [1, 3, 3743]], tr: 99.79, te: 99.94, rep: [.9997, .9994, .9997] },
    adam: { n: "ShuffleNet + ADAM", short: "ADAM", col: "var(--pv-s2)", A: [[3633, 0, 1], [0, 3659, 1], [0, 2, 3743]], tr: 99.89, te: 99.96, rep: [.9997, 1, .9998] },
    rms: { n: "ShuffleNet + RMSprop", short: "RMSprop", col: "#1baf7a", A: [[3632, 1, 0], [1, 3654, 1], [0, 6, 3744]], tr: 99.89, te: 99.92, rep: [.9997, .9998, .9997] },
    resnet: { n: "ResNet-50", short: "ResNet-50", col: "#8a5cd1", A: [[3633, 1, 0], [0, 3658, 0], [0, 2, 3745]], tr: 99.92, te: 99.97, rep: [.9997, 1, .9999] }
  };
  /* the comparison paper reports the SGDM run simply as "ShuffleNet" (same matrix and training figure) */
  M.shuf = Object.assign({}, M.sgdm, { n: "ShuffleNet", short: "ShuffleNet", img: "sgdm" });
  function total(A) { return A.reduce(function (s, r) { return s + r.reduce(function (a, b) { return a + b; }, 0); }, 0); }
  function diag(A) { return A[0][0] + A[1][1] + A[2][2]; }

  /* ---------- accuracy and error counts per model ---------- */
  function accuracy(prefix, keys) {
    const host = $(prefix + "-acc");
    if (!host) return;
    const W = 720, rowH = 54, L = 160, R = 560, T = 6, H = T + rowH * keys.length + 24;
    const c = PV.svg(host, W, H, "Training and test accuracy, and misclassified test images");
    const g = c.svg, x = PV.linear(99.7, 100, L, R);
    for (let v = 99.7; v <= 100.0001; v += 0.05) {
      PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * keys.length, class: "gl" });
      PV.el(g, "text", { x: x(v), y: T + rowH * keys.length + 16, "text-anchor": "middle", class: "tk" }, v.toFixed(2) + "%");
    }
    PV.el(g, "text", { x: R + 70, y: T + rowH * keys.length + 16, "text-anchor": "middle", class: "tk" }, "errors");
    keys.forEach(function (k, i) {
      const m = M[k], y = T + rowH * i, err = total(m.A) - diag(m.A);
      PV.el(g, "text", { x: L - 10, y: y + rowH / 2 + 4, "text-anchor": "end", class: "tt" }, m.n);
      PV.hbar(g, x(99.7), y + 8, x(m.tr) - x(99.7), 16, "mk", m.col).setAttribute("opacity", 0.45);
      PV.el(g, "text", { x: x(m.tr) + 6, y: y + 21, class: "vl" }, "training " + m.tr.toFixed(2) + "%");
      PV.hbar(g, x(99.7), y + 28, x(m.te) - x(99.7), 16, "mk", m.col);
      PV.el(g, "text", { x: x(m.te) + 6, y: y + 41, class: "tt" }, "test " + m.te.toFixed(2) + "%");
      for (let e = 0; e < err; e++) PV.el(g, "circle", { cx: R + 40 + (e % 5) * 12, cy: y + 18 + Math.floor(e / 5) * 12, r: 4.5, fill: "var(--ds-bad, #c0392b)" });
      PV.el(g, "text", { x: R + 106, y: y + rowH / 2 + 4, class: "tt" }, err);
      const hit = PV.el(g, "rect", { x: 0, y: y, width: W, height: rowH, class: "hit", "aria-label": m.n });
      PV.hover(c, hit, "<b>" + m.n + "</b><br>training accuracy " + m.tr + "%<br>test accuracy " + m.te + "%<br>" + err + " of " + total(m.A).toLocaleString("en") + " matrix images misclassified");
    });
  }

  /* ---------- confusion matrix explorer: one class against the rest ---------- */
  function matrix(prefix, keys) {
    const host = $(prefix + "-cm");
    if (!host) return;
    const out = $(prefix + "-cm-out"), note = $(prefix + "-cm-note");
    let key = keys[0], cls = 0;
    function draw() {
      const m = M[key], A = m.A, N = total(A);
      const tp = A[cls][cls], fp = A[cls].reduce(function (s, v) { return s + v; }, 0) - tp;
      const fn = A[0][cls] + A[1][cls] + A[2][cls] - tp, tn = N - tp - fp - fn;
      const W = 360, H = 300, X0 = 104, Y0 = 26, S = 80;
      const c = PV.svg(host, W, H, "Confusion matrix of " + m.n);
      const g = c.svg;
      const SH = ["bad", "inner", "good"];
      PV.el(g, "text", { x: X0 + 1.5 * S, y: 14, "text-anchor": "middle", class: "tk" }, "true class");
      PV.el(g, "text", { x: 12, y: Y0 + 1.5 * S, "text-anchor": "middle", class: "tk", transform: "rotate(-90 12 " + (Y0 + 1.5 * S) + ")" }, "predicted");
      SH.forEach(function (s, i) {
        PV.el(g, "text", { x: X0 - 8, y: Y0 + S * i + S / 2 + 4, "text-anchor": "end", class: i === cls ? "tt" : "tk" }, s);
        PV.el(g, "text", { x: X0 + S * i + S / 2, y: Y0 + 3 * S + 16, "text-anchor": "middle", class: i === cls ? "tt" : "tk" }, s);
      });
      for (let r = 0; r < 3; r++) for (let q = 0; q < 3; q++) {
        const v = A[r][q], role = r === cls && q === cls ? "TP" : r === cls ? "FP" : q === cls ? "FN" : "TN";
        const fill = role === "TP" ? "#1baf7a" : role === "FP" ? "var(--pv-s2)" : role === "FN" ? "var(--pv-s1)" : "var(--pv-base)";
        const op = role === "TN" ? 0.12 : role === "TP" ? 0.75 : v ? 0.55 : 0.15;
        PV.el(g, "rect", { x: X0 + S * q + 1, y: Y0 + S * r + 1, width: S - 2, height: S - 2, rx: 6, fill: fill, "fill-opacity": op });
        PV.el(g, "text", { x: X0 + S * q + S / 2, y: Y0 + S * r + S / 2, "text-anchor": "middle", class: "tt", style: role === "TP" ? "fill:#fff" : "" }, v.toLocaleString("en"));
        PV.el(g, "text", { x: X0 + S * q + S / 2, y: Y0 + S * r + S / 2 + 16, "text-anchor": "middle", class: "tk", style: role === "TP" ? "fill:#fff" : "" }, role);
      }
      const sens = tp / (tp + fn), spec = tn / (tn + fp), prec = tp / (tp + fp), f1 = 2 * prec * sens / (prec + sens);
      const rows = [
        ["Overall accuracy", diag(A).toLocaleString("en") + " / " + N.toLocaleString("en"), diag(A) / N],
        ["Sensitivity TP / (TP + FN)", tp + " / " + (tp + fn), sens],
        ["Specificity TN / (TN + FP)", tn + " / " + (tn + fp), spec],
        ["Precision TP / (TP + FP)", tp + " / " + (tp + fp), prec],
        ["F1 (precision, sensitivity)", "", f1]
      ];
      out.innerHTML = rows.map(function (r) { return "<tr><td>" + r[0] + "</td><td class='num'>" + r[1] + "</td><td class='num'><b>" + r[2].toFixed(4) + "</b></td></tr>"; }).join("");
      note.innerHTML = "Class <b>" + CLS[cls] + "</b> as positive: " + fp + " false positive" + (fp === 1 ? "" : "s") + " (orange), " + fn + " false negative" + (fn === 1 ? "" : "s") + " (blue). " +
        "Reported in the paper for " + m.short + ": sensitivity " + m.rep[0] + ", specificity " + m.rep[1] + ", F1 " + m.rep[2] + ".";
    }
    PV.seg($(prefix + "-cm-m"), function (v) { key = v; draw(); });
    PV.seg($(prefix + "-cm-c"), function (v) { cls = +v; draw(); });
  }

  /* ---------- training-progress figures ---------- */
  function curves(prefix) {
    const img = $(prefix + "-curve-img");
    if (!img) return;
    const seg = $(prefix + "-curve-m");
    PV.seg(seg, function (v) {
      img.src = "img/hazelnut/acc_" + (M[v].img || v) + ".webp";
      img.alt = "MATLAB training progress of " + M[v].n;
      const nt = $(prefix + "-curve-note");
      if (nt) nt.textContent = M[v].n + ": the paper reports " + M[v].tr.toFixed(2) + "% training and " + M[v].te.toFixed(2) + "% test accuracy.";
    });
    Array.prototype.forEach.call(seg.querySelectorAll("button"), function (b) { const v = b.dataset.v; new Image().src = "img/hazelnut/acc_" + (M[v].img || v) + ".webp"; });
  }

  /* ---------- channel shuffle (illustration of the ShuffleNet operation) ---------- */
  function shuffle(prefix) {
    const host = $(prefix + "-shuf");
    if (!host) return;
    const gs = $(prefix + "-shuf-g"), ns = $(prefix + "-shuf-n");
    const GC = ["var(--pv-s1)", "var(--pv-s2)", "#1baf7a", "#8a5cd1"];
    function draw() {
      const G = +gs.value, n = +ns.value, C = G * n;
      $(prefix + "-shuf-g-out").textContent = G;
      $(prefix + "-shuf-n-out").textContent = n;
      const W = 360, H = 270, xl = 70, xr = 290, T = 16, step = Math.min(30, (H - 40) / C);
      const c = PV.svg(host, W, H, "Channel shuffle with " + G + " groups");
      const g = c.svg;
      PV.el(g, "text", { x: xl, y: 10, "text-anchor": "middle", class: "tk" }, "after group conv");
      PV.el(g, "text", { x: xr, y: 10, "text-anchor": "middle", class: "tk" }, "after shuffle");
      for (let i = 0; i < C; i++) {
        const gi = Math.floor(i / n), k = i % n, j = k * G + gi;
        const y0 = T + 8 + i * step + Math.floor(i / n) * 4, y1 = T + 8 + j * step + Math.floor(j / n) * 4;
        PV.el(g, "path", { d: "M" + (xl + 12) + " " + y0 + " C" + (xl + 110) + " " + y0 + " " + (xr - 110) + " " + y1 + " " + (xr - 12) + " " + y1, fill: "none", stroke: GC[gi], "stroke-width": 1.6, "stroke-opacity": 0.75 });
        PV.el(g, "circle", { cx: xl, cy: y0, r: 8, fill: GC[gi] });
        PV.el(g, "circle", { cx: xr, cy: y1, r: 8, fill: GC[gi] });
      }
      for (let q = 0; q < G; q++) {
        const ya = T + 8 + q * n * step + q * 4 - 10, yb = ya + (n - 1) * step + 20;
        PV.el(g, "text", { x: xl - 16, y: (ya + yb) / 2 + 4, "text-anchor": "end", class: "tk" }, "group " + (q + 1));
        PV.el(g, "rect", { x: xr - 14, y: ya, width: 28, height: yb - ya, rx: 6, fill: "none", stroke: "var(--ds-border-base)" });
        PV.el(g, "text", { x: xr + 20, y: (ya + yb) / 2 + 4, class: "tk" }, "→ group " + (q + 1));
      }
      $(prefix + "-shuf-note").textContent = "Each of the " + G + " next groups now receives one channel from every previous group, so information flows between groups at no extra cost (" + C + " channels, reshape → transpose → flatten).";
    }
    [gs, ns].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  }

  /* ---------- optimizer lab: SGDM, ADAM, RMSprop on a toy 2-D loss ---------- */
  function optim(prefix) {
    const host = $(prefix + "-opt");
    if (!host) return;
    const lr = $(prefix + "-opt-lr"), st = $(prefix + "-opt-steps"), out = $(prefix + "-opt-out");
    /* elongated valley: f = 0.5 (a x^2 + b y^2), steep across, flat along; SGDM follows Eq. 1-2 of the paper (v = beta v + (1 - beta) g) */
    const a = 0.25, b = 6;
    const f = function (p) { return 0.5 * (a * p[0] * p[0] + b * p[1] * p[1]); };
    const grad = function (p) { return [a * p[0], b * p[1]]; };
    function run(kind, alpha, steps) {
      let p = [-4.2, 1.5];
      const path = [p.slice()];
      let v = [0, 0], m = [0, 0], s = [0, 0];
      for (let t = 1; t <= steps; t++) {
        const gr = grad(p);
        for (let i = 0; i < 2; i++) {
          if (kind === "sgdm") { v[i] = 0.9 * v[i] + (1 - 0.9) * gr[i]; p[i] -= alpha * v[i]; }
          else if (kind === "adam") {
            m[i] = 0.9 * m[i] + 0.1 * gr[i]; s[i] = 0.999 * s[i] + 0.001 * gr[i] * gr[i];
            const mh = m[i] / (1 - Math.pow(0.9, t)), sh = s[i] / (1 - Math.pow(0.999, t));
            p[i] -= alpha * mh / (Math.sqrt(sh) + 1e-8);
          } else { s[i] = 0.9 * s[i] + 0.1 * gr[i] * gr[i]; p[i] -= alpha * gr[i] / (Math.sqrt(s[i]) + 1e-8); }
          if (!isFinite(p[i]) || Math.abs(p[i]) > 50) p[i] = Math.sign(p[i] || 1) * 50;
        }
        path.push(p.slice());
      }
      return path;
    }
    function draw() {
      const alpha = +lr.value / 1000, steps = +st.value;
      $(prefix + "-opt-lr-out").textContent = alpha.toFixed(3);
      $(prefix + "-opt-steps-out").textContent = steps;
      const W = 720, H = 150, L = 10, R = 710, T = 6, B = 144;
      const c = PV.svg(host, W, H, "Optimizer paths on a toy loss surface");
      const g = c.svg;
      const x = PV.linear(-5, 5, L, R), y = PV.linear(-1.8, 1.8, B, T);
      [0.05, 0.3, 1, 2.5, 5].forEach(function (lv) {
        PV.el(g, "ellipse", { cx: x(0), cy: y(0), rx: x(Math.sqrt(2 * lv / a)) - x(0), ry: y(0) - y(Math.sqrt(2 * lv / b)), fill: "none", stroke: "var(--ds-border-base)" });
      });
      PV.el(g, "circle", { cx: x(0), cy: y(0), r: 4, fill: "var(--ds-text)" });
      PV.el(g, "text", { x: x(0) + 8, y: y(0) - 8, class: "tk" }, "minimum");
      const K = [["sgdm", "SGDM", "var(--pv-s1)"], ["adam", "ADAM", "var(--pv-s2)"], ["rms", "RMSprop", "#1baf7a"]];
      const res = [];
      K.forEach(function (k) {
        const p = run(k[0], alpha, steps);
        const clip = function (v, lo, hi) { return Math.max(lo, Math.min(hi, v)); };
        PV.el(g, "path", { d: p.map(function (q, i) { return (i ? "L" : "M") + clip(x(q[0]), L, R).toFixed(1) + " " + clip(y(q[1]), T, B).toFixed(1); }).join(" "), fill: "none", stroke: k[2], "stroke-width": 2 });
        const e = p[p.length - 1];
        PV.el(g, "circle", { cx: clip(x(e[0]), L, R), cy: clip(y(e[1]), T, B), r: 5, fill: k[2], stroke: "var(--ds-bg)", "stroke-width": 1.5 });
        res.push(k[1] + " " + f(e).toExponential(1));
      });
      PV.el(g, "circle", { cx: x(-4.2), cy: y(1.5), r: 5, fill: "none", stroke: "var(--ds-text)", "stroke-width": 1.5 });
      PV.el(g, "text", { x: x(-4.2) + 8, y: y(1.5) + 4, class: "tk" }, "start");
      out.innerHTML = "Loss after " + steps + " steps: " + res.join(" · ") + ". Momentum carries SGDM past the valley floor in swings; ADAM and RMSprop rescale each direction, which speeds progress along the flat axis but makes RMSprop jitter at large rates.";
    }
    [lr, st].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  }

  /* Selection deck */
  accuracy("hz-sel", ["sgdm", "adam", "rms"]);
  matrix("hz-sel", ["adam", "sgdm", "rms"]);
  curves("hz-sel");
  shuffle("hz-sel");
  optim("hz-sel");
  /* Comparison deck */
  accuracy("hz-cmp", ["resnet", "shuf"]);
  matrix("hz-cmp", ["resnet", "shuf"]);
  curves("hz-cmp");
  shuffle("hz-cmp");
  ["hz-sel-rel", "hz-cmp-rel"].forEach(function (id) { const t = $(id); if (t) PV.sortable(t); });
})();
