/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Impact of temporal resampling interval on deep learning-based vessel trajectory prediction using AIS data"
   (GUFBD/GUJS 16(4), 2026): interactive slides. Result numbers are taken from Tables 4–10 of the paper;
   the resampling demo uses a synthetic track and says so on the slide. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };

  const IV = ["1", "5", "10", "20"];
  const MODELS = ["GRU", "LSTM", "BiLSTM", "Transformer", "Transformer-GRU", "Transformer-LSTM", "Baseline"];
  const BASE = "Baseline";
  const FULL = { Baseline: "Constant speed-course baseline" };

  /* [mean, sd] per interval 1, 5, 10, 20 min; the deterministic baseline has no sd */
  const ADE = {
    dec: {
      "GRU": [[46.21, 1.08], [185.55, 4.81], [374.18, 13.17], [724.43, 23.08]],
      "LSTM": [[53.95, 1.28], [223.02, 4.47], [492.28, 14.52], [917.04, 24.00]],
      "BiLSTM": [[48.07, 0.81], [198.60, 5.94], [391.46, 8.81], [771.28, 19.50]],
      "Transformer": [[58.38, 1.68], [214.22, 8.31], [475.83, 12.52], [812.34, 29.24]],
      "Transformer-GRU": [[46.84, 0.83], [178.15, 4.36], [367.35, 10.65], [645.79, 32.21]],
      "Transformer-LSTM": [[53.68, 1.15], [235.08, 7.58], [484.36, 23.13], [859.86, 37.56]],
      "Baseline": [[70.27], [191.42], [364.69], [828.75]]
    },
    apr: {
      "GRU": [[46.11, 0.76], [210.71, 5.60], [363.62, 8.89], [695.64, 19.33]],
      "LSTM": [[56.48, 1.06], [221.23, 3.34], [461.81, 10.68], [790.48, 19.88]],
      "BiLSTM": [[54.09, 1.50], [212.86, 5.14], [435.07, 10.96], [692.94, 18.98]],
      "Transformer": [[57.00, 1.44], [239.01, 6.81], [440.49, 10.48], [743.69, 33.98]],
      "Transformer-GRU": [[55.60, 1.16], [195.10, 8.73], [318.02, 13.68], [667.52, 32.69]],
      "Transformer-LSTM": [[54.49, 1.65], [249.23, 7.23], [469.16, 14.49], [804.28, 40.70]],
      "Baseline": [[68.40], [195.20], [332.50], [775.80]]
    },
    aug: {
      "GRU": [[57.61, 0.78], [240.13, 5.69], [416.05, 10.55], [748.09, 25.64]],
      "LSTM": [[60.29, 1.05], [297.58, 6.08], [546.25, 17.23], [887.53, 30.24]],
      "BiLSTM": [[54.46, 1.18], [244.53, 5.60], [419.18, 12.24], [751.60, 21.64]],
      "Transformer": [[66.78, 2.46], [271.07, 10.92], [530.72, 26.20], [927.73, 26.38]],
      "Transformer-GRU": [[60.96, 1.69], [238.19, 4.87], [411.77, 16.65], [732.29, 42.25]],
      "Transformer-LSTM": [[62.61, 1.44], [258.26, 7.15], [509.99, 11.31], [906.53, 43.57]],
      "Baseline": [[82.60], [228.40], [415.70], [915.30]]
    },
    /* Table 8: equal-weight mean of the three date means; sd is between dates */
    avg: {
      "GRU": [[49.98, 6.61], [212.13, 27.32], [384.62, 27.73], [722.72, 26.27]],
      "LSTM": [[56.91, 3.19], [247.28, 43.57], [500.11, 42.76], [865.02, 66.22]],
      "BiLSTM": [[52.21, 3.59], [218.66, 23.51], [415.24, 22.07], [738.61, 40.75]],
      "Transformer": [[60.72, 5.29], [241.43, 28.50], [482.35, 45.47], [827.92, 93.00]],
      "Transformer-GRU": [[54.47, 7.13], [203.81, 30.95], [365.71, 46.90], [681.87, 45.00]],
      "Transformer-LSTM": [[56.93, 4.94], [247.52, 11.68], [487.84, 20.64], [856.89, 51.19]],
      "Baseline": [[73.76, 7.72], [205.01, 20.35], [370.96, 41.95], [839.95, 70.42]]
    }
  };
  const RMSE_DEC = {
    "GRU": [[83.39, 1.74], [370.29, 11.84], [748.66, 17.51], [1289.23, 55.54]],
    "LSTM": [[84.52, 2.20], [431.33, 15.48], [934.97, 27.88], [1487.26, 53.11]],
    "BiLSTM": [[80.67, 1.74], [400.76, 9.49], [798.25, 16.34], [1342.47, 51.27]],
    "Transformer": [[91.55, 2.44], [404.67, 12.86], [897.97, 26.73], [1390.14, 68.54]],
    "Transformer-GRU": [[81.99, 2.63], [352.40, 9.28], [726.60, 37.77], [1104.17, 39.72]],
    "Transformer-LSTM": [[83.96, 3.37], [436.22, 14.18], [913.77, 41.22], [1416.58, 65.99]],
    "Baseline": [[102.86], [413.05], [701.95], [1746.04]]
  };
  const DATE = { dec: "31 December 2025", apr: "30 April 2025", aug: "31 August 2025", avg: "mean of the three dates" };
  const T975 = 2.776, NRUNS = 5;

  function name(m) { return FULL[m] || m; }
  function color(m) { return m === BASE ? "var(--pv-base)" : "var(--pv-s1)"; }

  /* ---------- 1. course encoding: why COG becomes (sin, cos) ---------- */
  (function cogDemo() {
    const host = $("ais-cog");
    if (!host) return;
    const a = $("ais-cog-a"), b = $("ais-cog-b"), out = $("ais-cog-out");
    function draw() {
      const A = +a.value, B = +b.value;
      $("ais-cog-a-out").textContent = A + "°";
      $("ais-cog-b-out").textContent = B + "°";
      const c = PV.svg(host, 230, 230, "Two courses on the unit circle");
      const g = c.svg, cx = 115, cy = 115, r = 88;
      PV.el(g, "circle", { cx: cx, cy: cy, r: r, fill: "none", stroke: "var(--ds-border)", "stroke-width": 1.5 });
      [["N", 0], ["E", 90], ["S", 180], ["W", 270]].forEach(function (p) {
        const t = p[1] * Math.PI / 180;
        PV.el(g, "text", { x: cx + (r + 14) * Math.sin(t), y: cy - (r + 14) * Math.cos(t) + 4, "text-anchor": "middle", class: "tk" }, p[0]);
      });
      function pt(deg) { const t = deg * Math.PI / 180; return [cx + r * Math.sin(t), cy - r * Math.cos(t)]; }
      const pa = pt(A), pb = pt(B);
      PV.el(g, "line", { x1: pa[0], y1: pa[1], x2: pb[0], y2: pb[1], stroke: "var(--ds-text)", "stroke-width": 1.5, "stroke-dasharray": "4 3" });
      PV.el(g, "line", { x1: cx, y1: cy, x2: pa[0], y2: pa[1], stroke: "var(--pv-s1)", "stroke-width": 2 });
      PV.el(g, "line", { x1: cx, y1: cy, x2: pb[0], y2: pb[1], stroke: "var(--pv-s2)", "stroke-width": 2 });
      PV.el(g, "circle", { cx: pa[0], cy: pa[1], r: 6, fill: "var(--pv-s1)", stroke: "var(--ds-bg)", "stroke-width": 2 });
      PV.el(g, "circle", { cx: pb[0], cy: pb[1], r: 6, fill: "var(--pv-s2)", stroke: "var(--ds-bg)", "stroke-width": 2 });
      const raw = Math.abs(A - B);
      const ang = Math.min(raw, 360 - raw);
      const ra = A * Math.PI / 180, rb = B * Math.PI / 180;
      const chord = Math.hypot(Math.sin(ra) - Math.sin(rb), Math.cos(ra) - Math.cos(rb));
      out.innerHTML =
        "<tr><td>Raw difference |A − B|</td><td class='num'><b>" + raw + "°</b></td></tr>" +
        "<tr><td>True turn between the courses</td><td class='num'><b>" + ang + "°</b></td></tr>" +
        "<tr><td>A as (sin, cos)</td><td class='num'>(" + Math.sin(ra).toFixed(3) + ", " + Math.cos(ra).toFixed(3) + ")</td></tr>" +
        "<tr><td>B as (sin, cos)</td><td class='num'>(" + Math.sin(rb).toFixed(3) + ", " + Math.cos(rb).toFixed(3) + ")</td></tr>" +
        "<tr><td>Distance in (sin, cos) space</td><td class='num'><b>" + chord.toFixed(3) + "</b> (max 2)</td></tr>";
    }
    a.addEventListener("input", draw);
    b.addEventListener("input", draw);
    draw();
  })();

  /* ---------- 2. resampling demo on a synthetic track ---------- */
  (function resampleDemo() {
    const host = $("ais-rs");
    if (!host) return;
    const info = $("ais-rs-info");
    const T = 220, V = 0.37;                    /* minutes, km per minute (about 12 knots) */
    /* heading (degrees, clockwise from north) along the track: a long leg, a turn to the south-east, a gentle bend */
    function heading(t) { return 70 + 75 / (1 + Math.exp(-(t - 150) / 9)) - 12 * Math.sin(t / 38); }
    const truth = [[0, 0]];
    for (let t = 0; t < T; t += 0.25) {
      const h = heading(t) * Math.PI / 180, p = truth[truth.length - 1];
      truth.push([p[0] + V * 0.25 * Math.sin(h), p[1] + V * 0.25 * Math.cos(h)]);
    }
    function at(t) { return truth[Math.round(t / 0.25)]; }
    const xs = truth.map(function (p) { return p[0]; }), ys = truth.map(function (p) { return p[1]; });
    const x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    PV.seg($("ais-rs-iv"), function (v) {
      const D = +v;
      const W = 470, H = 262, P = 16;
      const k = Math.min((W - 2 * P) / (x1 - x0), (H - 2 * P) / (y1 - y0));
      const X = function (p) { return P + (p[0] - x0) * k; }, Y = function (p) { return H - P - (p[1] - y0) * k; };
      const c = PV.svg(host, W, H, "Synthetic vessel track resampled every " + D + " minutes");
      const g = c.svg;
      PV.el(g, "rect", { x: 0, y: 0, width: W, height: H, rx: 10, fill: "var(--ds-bg)", stroke: "var(--ds-border)", "stroke-width": 1.5 });
      PV.el(g, "path", { d: truth.map(function (p, i) { return (i ? "L" : "M") + X(p).toFixed(1) + " " + Y(p).toFixed(1); }).join(""), fill: "none", stroke: "var(--pv-dim)", "stroke-width": 5, "stroke-linecap": "round" });
      const N = Math.floor(T / D);
      const pts = [];
      for (let i = 0; i <= N; i++) pts.push(at(i * D));
      PV.el(g, "path", { d: pts.map(function (p, i) { return (i ? "L" : "M") + X(p).toFixed(1) + " " + Y(p).toFixed(1); }).join(""), fill: "none", stroke: "var(--pv-s1)", "stroke-width": 2 });
      /* the last 10 resampled points are the model input, the next one is the target */
      const tgt = N, first = Math.max(0, N - 10);
      pts.forEach(function (p, i) {
        const inWin = i >= first && i < tgt;
        if (D === 1 && !inWin && i !== tgt && i % 5) return;   /* keep the 1 min view readable */
        PV.el(g, "circle", { cx: X(p), cy: Y(p), r: inWin ? 4 : 3, fill: inWin ? "var(--pv-s1)" : "var(--ds-bg)", stroke: "var(--pv-s1)", "stroke-width": 1.5 });
      });
      /* constant speed-course step from the last input point, using that point's own speed and course */
      const last = pts[tgt - 1], tLast = (tgt - 1) * D, h = heading(tLast) * Math.PI / 180;
      const csc = [last[0] + V * D * Math.sin(h), last[1] + V * D * Math.cos(h)];
      const real = pts[tgt];
      PV.el(g, "line", { x1: X(last), y1: Y(last), x2: X(csc), y2: Y(csc), stroke: "var(--pv-base)", "stroke-width": 2, "stroke-dasharray": "5 4" });
      PV.el(g, "rect", { x: X(csc) - 5, y: Y(csc) - 5, width: 10, height: 10, fill: "var(--pv-base)", transform: "rotate(45 " + X(csc) + " " + Y(csc) + ")" });
      PV.el(g, "circle", { cx: X(real), cy: Y(real), r: 7, fill: "var(--pv-s2)", stroke: "var(--ds-bg)", "stroke-width": 2 });
      const err = Math.hypot(csc[0] - real[0], csc[1] - real[1]) * 1000;
      info.innerHTML =
        "<tr><td>Points on this 220 min track</td><td class='num'><b>" + (N + 1) + "</b></td></tr>" +
        "<tr><td>History covered by 10 input steps</td><td class='num'><b>" + (10 * D) + " min</b></td></tr>" +
        "<tr><td>Real time of one prediction step</td><td class='num'><b>" + D + " min</b> (≈ " + (V * D).toFixed(2) + " km)</td></tr>" +
        "<tr><td>10 + 1 training windows from this track</td><td class='num'><b>" + Math.max(0, N + 1 - 10) + "</b></td></tr>" +
        "<tr><td>Constant speed-course miss (this toy track)</td><td class='num'><b>" + Math.round(err) + " m</b></td></tr>";
    });
  })();

  /* ---------- 3. results explorer: ADE / RMSE bars per interval ---------- */
  (function explorer() {
    const host = $("ais-ex");
    if (!host) return;
    const note = $("ais-ex-note");
    const state = { metric: "ade", date: "dec", iv: "20" };
    const setDate = PV.seg($("ais-ex-date"), function (v) { state.date = v; draw(); });
    PV.seg($("ais-ex-metric"), function (v) { state.metric = v; if (v === "rmse" && state.date !== "dec") { setDate("dec"); return; } draw(); });
    PV.seg($("ais-ex-iv"), function (v) { state.iv = v; draw(); });
    function draw() {
      if (state.metric === undefined || state.iv === undefined) return;
      const rmse = state.metric === "rmse";
      if (rmse && state.date !== "dec") state.date = "dec";
      Array.from($("ais-ex-date").querySelectorAll("button")).forEach(function (b) { b.disabled = rmse && b.dataset.v !== "dec"; });
      const src = rmse ? RMSE_DEC : ADE[state.date], j = IV.indexOf(state.iv);
      const rows = MODELS.map(function (m) { return { m: m, v: src[m][j][0], sd: src[m][j][1] }; })
        .sort(function (a, b) { return a.v - b.v; });
      const W = 720, rowH = 30, T = 8, L = 168, R = 640, H = T + rowH * rows.length + 30;
      const c = PV.svg(host, W, H, (rmse ? "RMSE" : "ADE") + " at " + state.iv + " min, " + DATE[state.date]);
      const g = c.svg;
      const top = Math.max.apply(null, rows.map(function (r) { return r.v + (r.sd || 0); }));
      const nk = PV.nice(top, 5);
      const x = PV.linear(0, nk.max, L, R);
      for (let v = 0; v <= nk.max + 1e-9; v += nk.step) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * rows.length, class: v ? "gl" : "ax" });
        PV.el(g, "text", { x: x(v), y: T + rowH * rows.length + 16, "text-anchor": "middle", class: "tk" }, Math.round(v));
      }
      PV.el(g, "text", { x: R, y: H - 1, "text-anchor": "end", class: "tk" }, (rmse ? "RMSE" : "ADE") + " (m), lower is better →");
      const bars = [];
      rows.forEach(function (r, i) {
        const y = T + rowH * i, bh = 18, by = y + (rowH - bh) / 2;
        PV.el(g, "text", { x: 8, y: by + 13, class: "tk" }, "#" + (i + 1));
        PV.el(g, "text", { x: L - 8, y: by + 13, "text-anchor": "end", class: r.m === BASE ? "vl" : "tt" }, r.m === BASE ? "CS-C baseline" : r.m);
        const bar = PV.hbar(g, x(0), by, x(r.v) - x(0), bh, "mk", color(r.m));
        bars.push(bar);
        let end = x(r.v);
        if (r.sd) {
          const a = x(r.v - r.sd), b = x(r.v + r.sd);
          PV.el(g, "path", { d: "M" + a + " " + (by + bh / 2) + " H" + b + " M" + a + " " + (by + 4) + " V" + (by + bh - 4) + " M" + b + " " + (by + 4) + " V" + (by + bh - 4), class: "eb" });
          end = b;
        }
        PV.el(g, "text", { x: end + 6, y: by + 13, class: "vl" }, r.v.toFixed(2) + (r.sd ? " ± " + r.sd.toFixed(2) : ""));
        const hit = PV.el(g, "rect", { x: 0, y: y, width: W, height: rowH, class: "hit", "aria-label": r.m });
        PV.hover(c, hit, "<b>" + name(r.m) + "</b><br>" + (rmse ? "RMSE " : "ADE ") + r.v.toFixed(2) + " m" +
          (r.sd ? "<br>± " + r.sd.toFixed(2) + " m (" + (state.date === "avg" ? "between dates" : "sd of 5 runs") + ")" : "<br>deterministic, no seed variation"),
          function () { bars.forEach(function (b) { b.classList.toggle("is-dim", b !== bar); }); },
          function () { bars.forEach(function (b) { b.classList.remove("is-dim"); }); });
      });
      const best = rows[0], second = rows[1];
      note.innerHTML = "<b>" + name(best.m) + "</b> is lowest, " + (second.v - best.v).toFixed(2) + " m ahead of " + name(second.m) + "." +
        (rmse ? " RMSE is reported for 31 December only." : "") +
        (state.date === "avg" ? " Error bars show variation between the three dates." : " Error bars: ± one sample standard deviation over 5 training runs.");
    }
    draw();
  })();

  /* ---------- 4. ranking changes across intervals (bump chart) ---------- */
  (function bump() {
    const host = $("ais-bump");
    if (!host) return;
    PV.seg($("ais-bump-date"), function (date) {
      const src = ADE[date];
      const rank = {};
      MODELS.forEach(function (m) { rank[m] = []; });
      IV.forEach(function (iv, j) {
        MODELS.slice().sort(function (a, b) { return src[a][j][0] - src[b][j][0]; })
          .forEach(function (m, r) { rank[m][j] = r + 1; });
      });
      const W = 720, H = 268, L = 40, R = 520, T = 22, B = 238;
      const c = PV.svg(host, W, H, "Rank of each method by ADE at each interval, " + DATE[date]);
      const g = c.svg;
      const x = PV.linear(0, 3, L, R), y = PV.linear(1, 7, T, B);
      IV.forEach(function (iv, j) {
        PV.el(g, "line", { x1: x(j), x2: x(j), y1: T - 8, y2: B + 8, class: "gl" });
        PV.el(g, "text", { x: x(j), y: T - 12, "text-anchor": "middle", class: "tt" }, iv + " min");
      });
      for (let r = 1; r <= 7; r++) PV.el(g, "text", { x: L - 22, y: y(r) + 4, "text-anchor": "end", class: "tk" }, "#" + r);
      const groups = [];
      const order = MODELS.filter(function (m) { return m !== "Transformer-GRU" && m !== BASE; }).concat([BASE, "Transformer-GRU"]);
      order.forEach(function (m) {
        const hi = m === "Transformer-GRU", base = m === BASE;
        const col = hi ? "var(--pv-s2)" : base ? "var(--pv-base)" : "var(--pv-s1)";
        const grp = PV.el(g, "g", { class: "mk" + (hi || base ? "" : " pv-bg") });
        groups.push(grp);
        PV.el(grp, "path", { d: rank[m].map(function (r, j) { return (j ? "L" : "M") + x(j) + " " + y(r); }).join(" "), fill: "none", stroke: col, "stroke-width": hi || base ? 2.6 : 1.6, "stroke-dasharray": base ? "6 4" : null, opacity: hi || base ? 1 : .55 });
        rank[m].forEach(function (r, j) {
          PV.el(grp, "circle", { cx: x(j), cy: y(r), r: hi || base ? 6 : 4.5, fill: col, stroke: "var(--ds-bg)", "stroke-width": 2, opacity: hi || base ? 1 : .7 });
        });
        PV.el(grp, "text", { x: R + 14, y: y(rank[m][3]) + 4, class: hi || base ? "tt" : "vl" }, (base ? "CS-C baseline" : m));
        const tip = "<b>" + name(m) + "</b><br>" + IV.map(function (iv, j) { return iv + " min: #" + rank[m][j] + " (" + src[m][j][0].toFixed(1) + " m)"; }).join("<br>");
        const hit = PV.el(g, "path", { d: rank[m].map(function (r, j) { return (j ? "L" : "M") + x(j) + " " + y(r); }).join(" ") + " M" + (R + 10) + " " + y(rank[m][3]) + " h170", fill: "none", stroke: "transparent", "stroke-width": 16, class: "hit", "aria-label": m });
        PV.hover(c, hit, tip,
          function () { groups.forEach(function (x) { x.classList.toggle("is-dim", x !== grp); }); },
          function () { groups.forEach(function (x) { x.classList.remove("is-dim"); }); });
      });
    });
  })();

  /* ---------- 5. who wins where: best learned model vs baseline ---------- */
  (function winners() {
    const body = $("ais-win");
    if (!body) return;
    body.innerHTML = ["dec", "apr", "aug"].map(function (d) {
      return "<tr><th>" + DATE[d].replace(" 2025", "") + "</th>" + IV.map(function (iv, j) {
        let best = null;
        MODELS.forEach(function (m) { if (m !== BASE && (!best || ADE[d][m][j][0] < ADE[d][best][j][0])) best = m; });
        const b = ADE[d][best][j][0], base = ADE[d][BASE][j][0];
        const baseWins = base < b;
        return "<td" + (baseWins ? " style='background:color-mix(in srgb, var(--pv-base) 22%, var(--ds-bg))'" : "") + ">" +
          (baseWins ? "<b>Baseline</b><br><small>" + base.toFixed(2) + " vs " + b.toFixed(2) + " (" + best + ")</small>"
            : "<b>" + best + "</b><br><small>" + b.toFixed(2) + " vs " + base.toFixed(2) + " (baseline)</small>") + "</td>";
      }).join("") + "</tr>";
    }).join("");
  })();

  /* ---------- 6. 95% confidence intervals (Eq. 4, computed from Tables 4, 6, 7) ---------- */
  (function forest() {
    const host = $("ais-ci");
    if (!host) return;
    const note = $("ais-ci-note");
    const st = { date: "dec", iv: "20" };
    PV.seg($("ais-ci-date"), function (v) { st.date = v; draw(); });
    PV.seg($("ais-ci-iv"), function (v) { st.iv = v; draw(); });
    function draw() {
      if (!st.date || !st.iv) return;
      const src = ADE[st.date], j = IV.indexOf(st.iv);
      const rows = MODELS.filter(function (m) { return m !== BASE; }).map(function (m) {
        const mu = src[m][j][0], h = T975 * src[m][j][1] / Math.sqrt(NRUNS);
        return { m: m, mu: mu, lo: mu - h, hi: mu + h };
      }).sort(function (a, b) { return a.mu - b.mu; });
      const base = src[BASE][j][0];
      const W = 720, rowH = 32, T = 10, L = 168, R = 640, H = T + rowH * rows.length + 34;
      const c = PV.svg(host, W, H, "95% confidence intervals of mean ADE");
      const g = c.svg;
      const lo = Math.min(base, rows[0].lo), hi = Math.max(base, rows[rows.length - 1].hi);
      const pad = (hi - lo) * 0.08;
      const x = PV.linear(lo - pad, hi + pad, L, R);
      const nk = PV.nice((hi - lo + 2 * pad), 6);
      for (let v = Math.ceil((lo - pad) / nk.step) * nk.step; v <= hi + pad; v += nk.step) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * rows.length, class: "gl" });
        PV.el(g, "text", { x: x(v), y: T + rowH * rows.length + 16, "text-anchor": "middle", class: "tk" }, Math.round(v));
      }
      PV.el(g, "text", { x: R, y: H - 2, "text-anchor": "end", class: "tk" }, "mean ADE (m) with 95% CI");
      const b0 = rows[0];
      /* shade the best model's interval so overlaps are visible */
      PV.el(g, "rect", { x: x(b0.lo), y: T, width: x(b0.hi) - x(b0.lo), height: rowH * rows.length, fill: "var(--pv-s2)", opacity: .12 });
      PV.el(g, "line", { x1: x(base), x2: x(base), y1: T - 4, y2: T + rowH * rows.length, stroke: "var(--pv-base)", "stroke-width": 2, "stroke-dasharray": "5 4" });
      PV.el(g, "text", { x: x(base) + 4, y: T + 8, class: "tk" }, "baseline " + base.toFixed(1));
      let overlap = [];
      rows.forEach(function (r, i) {
        const y = T + rowH * i + rowH / 2;
        const ov = i > 0 && r.lo <= b0.hi;
        if (ov) overlap.push(r.m);
        PV.el(g, "text", { x: L - 8, y: y + 4, "text-anchor": "end", class: "tt" }, r.m);
        PV.el(g, "line", { x1: x(r.lo), x2: x(r.hi), y1: y, y2: y, stroke: i === 0 ? "var(--pv-s2)" : "var(--pv-s1)", "stroke-width": 2.5, "stroke-linecap": "round" });
        PV.el(g, "circle", { cx: x(r.mu), cy: y, r: 5.5, fill: i === 0 ? "var(--pv-s2)" : "var(--pv-s1)", stroke: "var(--ds-bg)", "stroke-width": 2 });
        const hit = PV.el(g, "rect", { x: 0, y: y - rowH / 2, width: W, height: rowH, class: "hit", "aria-label": r.m });
        PV.hover(c, hit, "<b>" + r.m + "</b><br>mean " + r.mu.toFixed(2) + " m<br>95% CI [" + r.lo.toFixed(2) + ", " + r.hi.toFixed(2) + "]" + (ov ? "<br>overlaps the best interval" : ""));
      });
      note.innerHTML = "Best: <b>" + b0.m + "</b> [" + b0.lo.toFixed(2) + ", " + b0.hi.toFixed(2) + "]. " +
        (overlap.length ? "Overlapping intervals: " + overlap.join(", ") + " → treat these differences with caution."
          : "No other interval overlaps it: the lead is clearly separated at this setting.");
    }
    draw();
  })();

  /* ---------- 7. interpolation robustness (Table 10): two charts, one unit each ---------- */
  (function interp() {
    const hostA = $("ais-int-a"), hostB = $("ais-int-b");
    if (!hostA) return;
    const D = [
      { iv: "1 min", pct: 19.18, mean: 22.96, med: 9.46, p95: 87.80 },
      { iv: "5 min", pct: 4.95, mean: 156.38, med: 62.12, p95: 592.14 },
      { iv: "10 min", pct: 2.23, mean: 343.22, med: 133.97, p95: 1492.80 },
      { iv: "20 min", pct: 0.45, mean: 644.78, med: 294.13, p95: 3413.21 }
    ];
    function bars(host, key, title, unit, d, col) {
      const W = 340, H = 220, L = 46, R = 330, T = 22, B = 190;
      const c = PV.svg(host, W, H, title);
      const g = c.svg;
      const top = Math.max.apply(null, D.map(function (r) { return r[key]; }));
      const nk = PV.nice(top, 4);
      const y = PV.linear(0, nk.max, B, T);
      for (let v = 0; v <= nk.max + 1e-9; v += nk.step) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" });
        PV.el(g, "text", { x: L - 6, y: y(v) + 4, "text-anchor": "end", class: "tk" }, +v.toFixed(1));
      }
      PV.el(g, "text", { x: L, y: 10, class: "tt" }, title);
      const band = (R - L) / D.length, bw = 36;
      D.forEach(function (r, i) {
        const bx = L + band * i + (band - bw) / 2;
        PV.vbar(g, bx, B, bw, B - y(r[key]), "mk", col);
        PV.el(g, "text", { x: bx + bw / 2, y: y(r[key]) - 5, "text-anchor": "middle", class: "vl" }, r[key].toFixed(d));
        PV.el(g, "text", { x: bx + bw / 2, y: B + 16, "text-anchor": "middle", class: "tk" }, r.iv);
        const hit = PV.el(g, "rect", { x: L + band * i, y: T, width: band, height: B - T, class: "hit", "aria-label": r.iv });
        PV.hover(c, hit, "<b>" + r.iv + "</b><br>Interpolated bins " + r.pct + "%<br>Reconstruction error: mean " + r.mean + " m, median " + r.med + " m, 95th pct " + r.p95 + " m");
      });
    }
    bars(hostA, "pct", "Bins needing interpolation (%)", "%", 2, "var(--pv-s1)");
    PV.seg($("ais-int-stat"), function (k) {
      const label = { mean: "Mean", med: "Median", p95: "95th percentile" }[k];
      bars(hostB, k, label + " reconstruction error (m)", "m", k === "p95" ? 0 : 1, "var(--pv-s2)");
    });
  })();

  /* ---------- 8. rolling prediction figures ---------- */
  (function rolling() {
    const img = $("ais-roll-img");
    if (!img) return;
    const note = $("ais-roll-note");
    const TXT = {
      "10": "Smooth motion to the south-east. The <b>constant speed-course baseline</b> is closest (ADE 93.4 m), then BiLSTM (104.9 m); the standard Transformer deviates most (263.2 m).",
      "20": "Each step spans 20 minutes. Here the <b>standard Transformer</b> is closest (104.3 m), then the baseline (109.9 m) and GRU (116.3 m); LSTM deviates most (278.9 m)."
    };
    PV.seg($("ais-roll-iv"), function (v) {
      img.src = "img/ais/rolling_" + v + "min.webp";
      img.alt = "Rolling one-step-ahead predictions under " + v + " min resampling";
      note.innerHTML = TXT[v];
    });
  })();

  document.querySelectorAll("#ds-deck table.pv-sort").forEach(PV.sortable);
})();
