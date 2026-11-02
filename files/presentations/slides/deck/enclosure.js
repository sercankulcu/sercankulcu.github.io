/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Comparative Analysis of Target Localization Accuracy in Radar PPI Images Using Geometric Enclosures"
   (Konya Journal of Engineering Sciences 14(2), 2026): interactive slides. Numbers are taken from Tables 1–5 of
   the paper; the geometry lab computes the three enclosures in the browser on example echoes. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };
  const M_PER_PX = 11.82;   /* 3 NM = 5556 m over a 470 px display radius */

  /* ---------- geometry helpers ---------- */
  function cross(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
  /* Andrew's monotone chain, counter-clockwise */
  function convexHull(pts) {
    const p = pts.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    if (p.length < 3) return p;
    const lo = [], hi = [];
    p.forEach(function (q) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); });
    for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (hi.length >= 2 && cross(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
    return lo.slice(0, -1).concat(hi.slice(0, -1));
  }
  /* polygon centroid with the shoelace formula, Eqs. (4)–(5) */
  function polyCentroid(v) {
    let a = 0, cx = 0, cy = 0;
    for (let k = 0; k < v.length; k++) {
      const p = v[k], q = v[(k + 1) % v.length], c = p[0] * q[1] - q[0] * p[1];
      a += c; cx += (p[0] + q[0]) * c; cy += (p[1] + q[1]) * c;
    }
    a /= 2;
    return Math.abs(a) < 1e-9 ? null : [cx / (6 * a), cy / (6 * a)];
  }
  /* Bowyer–Watson Delaunay triangulation; returns triangles as index triples */
  function delaunay(pts) {
    const n = pts.length;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    pts.forEach(function (p) { minX = Math.min(minX, p[0]); minY = Math.min(minY, p[1]); maxX = Math.max(maxX, p[0]); maxY = Math.max(maxY, p[1]); });
    const d = Math.max(maxX - minX, maxY - minY) * 20 + 10, mx = (minX + maxX) / 2, my = (minY + maxY) / 2;
    const P = pts.concat([[mx - d, my - d], [mx + d, my - d], [mx, my + d]]);
    let tris = [mk(n, n + 1, n + 2)];
    function mk(a, b, c) {
      const A = P[a], B = P[b], C = P[c];
      const D = 2 * (A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]));
      const ux = ((A[0] * A[0] + A[1] * A[1]) * (B[1] - C[1]) + (B[0] * B[0] + B[1] * B[1]) * (C[1] - A[1]) + (C[0] * C[0] + C[1] * C[1]) * (A[1] - B[1])) / D;
      const uy = ((A[0] * A[0] + A[1] * A[1]) * (C[0] - B[0]) + (B[0] * B[0] + B[1] * B[1]) * (A[0] - C[0]) + (C[0] * C[0] + C[1] * C[1]) * (B[0] - A[0])) / D;
      return { v: [a, b, c], x: ux, y: uy, r2: (A[0] - ux) * (A[0] - ux) + (A[1] - uy) * (A[1] - uy) };
    }
    for (let i = 0; i < n; i++) {
      const p = P[i], bad = [], keep = [];
      tris.forEach(function (t) { ((p[0] - t.x) * (p[0] - t.x) + (p[1] - t.y) * (p[1] - t.y) < t.r2 ? bad : keep).push(t); });
      const edges = {};
      bad.forEach(function (t) {
        [[t.v[0], t.v[1]], [t.v[1], t.v[2]], [t.v[2], t.v[0]]].forEach(function (e) {
          const k = Math.min(e[0], e[1]) + "_" + Math.max(e[0], e[1]);
          edges[k] = edges[k] ? null : e;
        });
      });
      Object.keys(edges).forEach(function (k) { if (edges[k]) keep.push(mk(edges[k][0], edges[k][1], i)); });
      tris = keep;
    }
    return tris.filter(function (t) { return t.v[0] < n && t.v[1] < n && t.v[2] < n; });
  }

  /* ---------- 1. geometry lab ---------- */
  (function lab() {
    const host = $("enc-lab");
    if (!host) return;
    const G = 32, CELL = 9, BOX = G * CELL;
    const out = $("enc-lab-out"), aSl = $("enc-lab-a"), aOut = $("enc-lab-a-out");
    const SHAPES = {
      /* diagonal, slightly bent echo like Fig. 8 */
      diagonal: function (x, y) { const u = (x - 16) * 0.8 + (y - 16) * 0.6, v = -(x - 16) * 0.6 + (y - 16) * 0.8 + 0.012 * u * u; return u * u / 110 + v * v / 16 <= 1; },
      crescent: function (x, y) { return (x - 15) * (x - 15) + (y - 16) * (y - 16) <= 100 && (x - 20) * (x - 20) + (y - 13) * (y - 13) > 50; },
      shadow: function (x, y) { return (x >= 6 && x <= 25 && y >= 18 && y <= 23) || (x >= 6 && x <= 11 && y >= 6 && y <= 23); },
      fragmented: function (x, y) { const e = (x - 16) * (x - 16) / 120 + (y - 16) * (y - 16) / 30 <= 1; return e && !((x + 2 * y) % 9 === 0 || (x > 18 && x < 21)); }
    };
    let grid = new Uint8Array(G * G);
    function load(name) { grid = new Uint8Array(G * G); for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) if (SHAPES[name](x, y)) grid[y * G + x] = 1; }
    let shape = "diagonal";
    load(shape);
    let paint = null;

    function compute() {
      const pts = [];
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) if (grid[y * G + x]) pts.push([x + 0.5, y + 0.5]);
      if (pts.length < 3) return { pts: pts };
      let mx = 0, my = 0, x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      pts.forEach(function (p) { mx += p[0]; my += p[1]; x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); });
      const mass = [mx / pts.length, my / pts.length];
      const bb = [(x0 + x1) / 2, (y0 + y1) / 2];
      const hull = convexHull(pts), cvx = polyCentroid(hull) || bb;
      /* alpha shape: Delaunay triangles whose circumradius is at most R; deterministic jitter breaks grid co-circularity */
      const R = +aSl.value;
      const jit = pts.map(function (p, i) { return [p[0] + ((i * 7919) % 97) / 97 * 1e-3, p[1] + ((i * 104729) % 89) / 89 * 1e-3]; });
      const tris = delaunay(jit).filter(function (t) { return Math.sqrt(t.r2) <= R; });
      let A = 0, cx = 0, cy = 0;
      const used = {};
      tris.forEach(function (t) {
        const a = pts[t.v[0]], b = pts[t.v[1]], c = pts[t.v[2]];
        const ar = Math.abs(cross(a, b, c)) / 2;
        A += ar; cx += ar * (a[0] + b[0] + c[0]) / 3; cy += ar * (a[1] + b[1] + c[1]) / 3;
        [[t.v[0], t.v[1]], [t.v[1], t.v[2]], [t.v[2], t.v[0]]].forEach(function (e) {
          const k = Math.min(e[0], e[1]) + "_" + Math.max(e[0], e[1]);
          used[k] = (used[k] || 0) + 1;
        });
      });
      const edges = Object.keys(used).filter(function (k) { return used[k] === 1; }).map(function (k) { return k.split("_").map(Number); });
      const ccv = A > 0 ? [cx / A, cy / A] : cvx;
      return { pts: pts, mass: mass, bb: bb, box: [x0, y0, x1, y1], hull: hull, cvx: cvx, tris: tris, edges: edges, ccv: ccv };
    }

    function draw() {
      aOut.textContent = (+aSl.value).toFixed(1) + " px";
      const r = compute();
      const c = PV.svg(host, BOX + 2, BOX + 2, "Echo pixels with bounding box, convex hull and concave hull");
      const g = c.svg, S = function (v) { return 1 + v * CELL; };
      PV.el(g, "rect", { x: 1, y: 1, width: BOX, height: BOX, fill: "#00007a", rx: 6 });
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        const on = grid[y * G + x];
        const cell = PV.el(g, "rect", { x: S(x), y: S(y), width: CELL, height: CELL, fill: on ? "#ffe600" : "transparent", stroke: "rgba(255,255,255,.06)", "stroke-width": .5, "data-i": y * G + x });
        cell.style.cursor = "crosshair";
      }
      const show = { bb: $("enc-show-bb").checked, cvx: $("enc-show-cvx").checked, ccv: $("enc-show-ccv").checked };
      if (r.pts.length >= 3) {
        if (show.ccv) {
          r.tris.forEach(function (t) {
            const a = r.pts[t.v[0]], b = r.pts[t.v[1]], cc = r.pts[t.v[2]];
            PV.el(g, "path", { d: "M" + S(a[0]) + " " + S(a[1]) + "L" + S(b[0]) + " " + S(b[1]) + "L" + S(cc[0]) + " " + S(cc[1]) + "Z", fill: "rgba(255,80,80,.18)", stroke: "none", "pointer-events": "none" });
          });
          r.edges.forEach(function (e) {
            const a = r.pts[e[0]], b = r.pts[e[1]];
            PV.el(g, "line", { x1: S(a[0]), y1: S(a[1]), x2: S(b[0]), y2: S(b[1]), stroke: "#ff5050", "stroke-width": 2.2, "pointer-events": "none" });
          });
        }
        if (show.cvx) PV.el(g, "polygon", { points: r.hull.map(function (p) { return S(p[0]) + "," + S(p[1]); }).join(" "), fill: "none", stroke: "#7bdff2", "stroke-width": 2, "pointer-events": "none" });
        if (show.bb) PV.el(g, "rect", { x: S(r.box[0]), y: S(r.box[1]), width: (r.box[2] - r.box[0]) * CELL, height: (r.box[3] - r.box[1]) * CELL, fill: "none", stroke: "#ffffff", "stroke-width": 1.6, "stroke-dasharray": "5 3", "pointer-events": "none" });
        function mark(p, col, shape) {
          const x = S(p[0]), y = S(p[1]);
          if (shape === "x") PV.el(g, "path", { d: "M" + (x - 5) + " " + (y - 5) + "L" + (x + 5) + " " + (y + 5) + "M" + (x - 5) + " " + (y + 5) + "L" + (x + 5) + " " + (y - 5), stroke: col, "stroke-width": 3, "pointer-events": "none" });
          else PV.el(g, "circle", { cx: x, cy: y, r: 4.5, fill: col, stroke: "#000", "stroke-width": 1, "pointer-events": "none" });
        }
        if (show.bb) mark(r.bb, "#ffffff");
        if (show.cvx) mark(r.cvx, "#7bdff2");
        if (show.ccv) mark(r.ccv, "#ff5050");
        mark(r.mass, "#22c55e", "x");
        const dist = function (p) { return Math.hypot(p[0] - r.mass[0], p[1] - r.mass[1]); };
        const rows = [["Bounding box centre", r.bb, "#ffffff"], ["Convex hull centroid", r.cvx, "#7bdff2"], ["Concave hull centroid", r.ccv, "#ff5050"]];
        const best = rows.reduce(function (a, b) { return dist(b[1]) < dist(a[1]) ? b : a; });
        out.innerHTML = rows.map(function (row) {
          const dd = dist(row[1]);
          return "<tr" + (row === best ? " class='is-ours'" : "") + "><td><i style='display:inline-block;width:10px;height:10px;border-radius:50%;background:" + row[2] + ";border:1px solid #000;margin-right:6px'></i>" + row[0] +
            "</td><td class='num'>" + dd.toFixed(2) + " px</td><td class='num'>" + (dd * M_PER_PX).toFixed(1) + " m</td></tr>";
        }).join("") + "<tr><td colspan='3' class='enc-foot'>" + r.pts.length + " echo pixels · offsets from the pixel centre of mass (green ×) · 1 px = 11.82 m</td></tr>";
      } else out.innerHTML = "<tr><td>Paint at least three echo pixels.</td></tr>";
    }

    /* paint or erase pixels by dragging on the grid */
    host.addEventListener("pointerdown", function (e) {
      const i = e.target.getAttribute && e.target.getAttribute("data-i");
      if (i === null || i === undefined) return;
      paint = grid[+i] ? 0 : 1; grid[+i] = paint; host.setPointerCapture(e.pointerId); e.stopPropagation(); draw();
    });
    host.addEventListener("pointermove", function (e) {
      if (paint === null) return;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const i = el && el.getAttribute && el.getAttribute("data-i");
      if (i !== null && i !== undefined && grid[+i] !== paint) { grid[+i] = paint; draw(); }
    });
    host.addEventListener("pointerup", function () { paint = null; });
    host.addEventListener("touchstart", function (e) { e.stopPropagation(); }, { passive: true });
    host.addEventListener("touchend", function (e) { e.stopPropagation(); });
    PV.seg($("enc-lab-shape"), function (v) { shape = v; load(v); draw(); });
    aSl.addEventListener("input", draw);
    ["enc-show-bb", "enc-show-cvx", "enc-show-ccv"].forEach(function (id) { $(id).addEventListener("change", draw); });
  })();

  /* ---------- 2. Table 1: azimuth offset search ---------- */
  (function azimuth() {
    const host = $("enc-az");
    if (!host) return;
    const TH = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    const S = [
      { n: "Vessel 2", col: "var(--pv-s1)", v: [12.54, 11.60, 10.56, 9.53, 8.31, 7.14, 6.28, 5.86, 5.99, 6.63, 7.65] },
      { n: "Vessel 4", col: "var(--pv-s2)", v: [15.71, 15.45, 14.74, 14.22, 13.34, 11.42, 9.48, 7.66, 6.10, 5.18, 5.27] },
      { n: "Total", col: "var(--ds-text)", dash: "6 4", v: [28.25, 27.05, 25.30, 23.75, 21.65, 18.56, 15.76, 13.52, 12.09, 11.81, 12.92] }
    ];
    const W = 720, H = 240, L = 50, R = 620, T = 12, B = 206;
    const c = PV.svg(host, W, H, "Mean localization error versus azimuth offset");
    const g = c.svg;
    const x = PV.linear(0, 5, L, R), y = PV.linear(0, 30, B, T);
    for (let v = 0; v <= 30; v += 5) {
      PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" });
      PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v);
    }
    TH.forEach(function (t) { PV.el(g, "text", { x: x(t), y: B + 18, "text-anchor": "middle", class: "tk" }, t.toFixed(1) + "°"); });
    PV.el(g, "text", { x: L, y: T - 2, class: "tk" }, "mean error (px)");
    PV.el(g, "line", { x1: x(4.5), x2: x(4.5), y1: T, y2: B, stroke: "var(--ds-good)", "stroke-width": 1.5, "stroke-dasharray": "4 3" });
    PV.el(g, "text", { x: x(4.5) - 4, y: T + 12, "text-anchor": "end", class: "tk", style: "fill:var(--ds-good);font-weight:700" }, "θ = 4.5°");
    S.forEach(function (s) {
      PV.el(g, "path", { d: s.v.map(function (v, i) { return (i ? "L" : "M") + x(TH[i]) + " " + y(v); }).join(" "), fill: "none", stroke: s.col, "stroke-width": 2, "stroke-dasharray": s.dash || null });
      s.v.forEach(function (v, i) { PV.el(g, "circle", { cx: x(TH[i]), cy: y(v), r: 3.5, fill: s.col, stroke: "var(--ds-bg)", "stroke-width": 1.5 }); });
      PV.el(g, "text", { x: R + 10, y: y(s.v[10]) + 4, class: "tt" }, s.n);
    });
    TH.forEach(function (t, i) {
      const hit = PV.el(g, "rect", { x: x(t) - 26, y: T, width: 52, height: B - T, class: "hit", "aria-label": t + " degrees" });
      PV.hover(c, hit, "<b>θ = " + t.toFixed(1) + "°</b><br>" + S.map(function (s) { return s.n + ": " + s.v[i].toFixed(2) + " px (" + (s.v[i] * M_PER_PX).toFixed(0) + " m)"; }).join("<br>"));
    });

    /* arc displacement of an uncorrected bias at a given range */
    const rs = $("enc-az-r"), ts = $("enc-az-t"), res = $("enc-az-out");
    function calc() {
      const r = +rs.value, t = +ts.value;
      $("enc-az-r-out").textContent = r.toLocaleString("en") + " m (" + (r / 1852).toFixed(2) + " NM)";
      $("enc-az-t-out").textContent = t.toFixed(1) + "°";
      const d = 2 * r * Math.sin(t * Math.PI / 360);
      res.innerHTML = "An uncorrected " + t.toFixed(1) + "° bias moves a target at this range by <b>" + d.toFixed(0) + " m</b> (" + (d / M_PER_PX).toFixed(1) + " px): d = 2r · sin(θ/2).";
    }
    rs.addEventListener("input", calc); ts.addEventListener("input", calc);
    calc();
  })();

  /* ---------- 3. Tables 2–4: localization error by method ---------- */
  (function results() {
    const host = $("enc-res");
    if (!host) return;
    const D = {
      "Bounding box": { t2: [697, 80.51, 76.18, 18.81, 173.74, 35.39], t4: [665, 59.37, 60.66, 5.95, 120.45, 27.40] },
      "Convex hull": { t2: [696, 71.85, 70.37, 11.90, 164.82, 36.26], t4: [649, 59.18, 60.66, 10.57, 128.14, 30.96] },
      "Concave hull": { t2: [696, 70.32, 69.17, 11.59, 161.09, 35.89], t4: [653, 58.44, 59.46, 11.23, 127.17, 29.16] }
    };
    const STAT = { mean: [1, "Mean"], median: [2, "Median"], min: [3, "Minimum"], max: [4, "Maximum"], std: [5, "Std. dev."] };
    const COL = { "Bounding box": "var(--pv-base)", "Convex hull": "var(--pv-s1)", "Concave hull": "var(--pv-s2)" };
    PV.seg($("enc-res-m"), function (k) {
      const j = STAT[k][0], meth = Object.keys(D), tg = [["t2", "Target 2"], ["t4", "Target 4"]];
      const W = 720, H = 246, L = 56, R = 700, T = 30, B = 210;
      const c = PV.svg(host, W, H, STAT[k][1] + " localization error by method");
      const g = c.svg;
      const top = Math.max.apply(null, meth.map(function (m) { return Math.max(D[m].t2[j], D[m].t4[j]); }));
      const nk = PV.nice(top, 4);
      const y = PV.linear(0, nk.max, B, T);
      for (let v = 0; v <= nk.max + 1e-9; v += nk.step) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" });
        PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v);
      }
      PV.el(g, "text", { x: L, y: 12, class: "tk" }, STAT[k][1] + " error (m) against AIS, lower is better");
      const band = (R - L) / 2, bw = 70;
      tg.forEach(function (t, i) {
        meth.forEach(function (m, q) {
          const v = D[m][t[0]][j], bx = L + band * i + band / 2 - 1.5 * bw - 2 + q * (bw + 2);
          PV.vbar(g, bx, B, bw, B - y(v), "mk", COL[m]);
          PV.el(g, "text", { x: bx + bw / 2, y: y(v) - 5, "text-anchor": "middle", class: "vl" }, v.toFixed(2));
          const hit = PV.el(g, "rect", { x: bx, y: T, width: bw, height: B - T, class: "hit", "aria-label": m + " " + t[1] });
          const row = D[m][t[0]];
          PV.hover(c, hit, "<b>" + m + "</b> · " + t[1] + "<br>" + row[0] + " measurements<br>mean " + row[1] + " · median " + row[2] + " m<br>min " + row[3] + " · max " + row[4] + " m<br>std " + row[5] + " m");
        });
        PV.el(g, "text", { x: L + band * i + band / 2, y: B + 20, "text-anchor": "middle", class: "tt" }, t[1]);
      });
    });
  })();

  /* ---------- 4. error time series (Figs. 4–6) ---------- */
  (function series() {
    const img = $("enc-ts-img");
    if (!img) return;
    const note = $("enc-ts-note");
    const N = {
      bb: ["err_bb", "Bounding box: errors from about 5 m to 175 m; Target 2 fluctuates most early (steps 0–150) and late (600–700)."],
      convex: ["err_convex", "Convex hull: range narrows to about 10–160 m and fewer outliers above 140 m."],
      concave: ["err_concave", "Concave hull: errors cluster at about 10–130 m; Target 4 stays below 80 m after step 200."]
    };
    PV.seg($("enc-ts-m"), function (v) {
      img.src = "img/enclosure/" + N[v][0] + ".webp";
      img.alt = "Localization error per step, " + v;
      note.innerHTML = N[v][1] + " All three show a U-shape with the smallest errors around steps 300–450.";
    });
    Object.keys(N).forEach(function (k) { new Image().src = "img/enclosure/" + N[k][0] + ".webp"; });
  })();

  /* ---------- 5. Table 5: alpha sensitivity ---------- */
  (function alpha() {
    const host = $("enc-alpha");
    if (!host) return;
    const A = [0.02, 0.05, 0.1, 0.2];
    const S = [
      { n: "Target 2", col: "var(--pv-s1)", m: [71.81, 70.58, 70.32, 72.19], s: [36.12, 36.01, 35.89, 37.44] },
      { n: "Target 4", col: "var(--pv-s2)", m: [59.33, 58.31, 58.44, 59.87], s: [29.45, 29.34, 29.16, 30.28] }
    ];
    const W = 720, H = 230, L = 56, R = 600, T = 14, B = 196;
    const c = PV.svg(host, W, H, "Mean error versus concave hull alpha");
    const g = c.svg;
    const x = function (i) { return L + 40 + i * (R - L - 80) / 3; };
    const y = PV.linear(56, 74, B, T);
    for (let v = 56; v <= 74; v += 2) {
      PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
      PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v);
    }
    A.forEach(function (a, i) { PV.el(g, "text", { x: x(i), y: B + 18, "text-anchor": "middle", class: "tk" }, "α = " + a); });
    PV.el(g, "rect", { x: x(1) - 14, y: T, width: x(2) - x(1) + 28, height: B - T, fill: "var(--ds-good)", opacity: .08 });
    PV.el(g, "text", { x: (x(1) + x(2)) / 2, y: T + 12, "text-anchor": "middle", class: "tk", style: "fill:var(--ds-good);font-weight:700" }, "stable range");
    S.forEach(function (s) {
      PV.el(g, "path", { d: s.m.map(function (v, i) { return (i ? "L" : "M") + x(i) + " " + y(v); }).join(" "), fill: "none", stroke: s.col, "stroke-width": 2 });
      s.m.forEach(function (v, i) {
        PV.el(g, "circle", { cx: x(i), cy: y(v), r: i === 2 ? 6.5 : 5, fill: s.col, stroke: "var(--ds-bg)", "stroke-width": 2 });
        PV.el(g, "text", { x: x(i), y: y(v) - 10, "text-anchor": "middle", class: "vl" }, v.toFixed(2));
        const hit = PV.el(g, "circle", { cx: x(i), cy: y(v), r: 13, class: "hit", "aria-label": s.n + " alpha " + A[i] });
        PV.hover(c, hit, "<b>" + s.n + "</b> · α = " + A[i] + "<br>" + v.toFixed(2) + " ± " + s.s[i].toFixed(2) + " m");
      });
      PV.el(g, "text", { x: R + 10, y: y(s.m[3]) + 4, class: "tt" }, s.n);
    });
    PV.el(g, "text", { x: R + 10, y: B - 4, class: "tk" }, "zoomed axis");
  })();
})();
