/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "High-Precision Marine Radar Object Detection Using Tiled Training and SAHI Enhanced YOLOv11-OBB"
   (Sensors 26, 942, 2026): interactive slides. Numbers are taken from Tables 1–7 of the paper; the annotation lab
   re-runs Algorithm 1 in the browser and the geometry widget uses an idealized elliptical echo. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };

  /* ---------- 1. annotation lab: Algorithm 1 on the Fig. 3 frame ---------- */
  (function lab() {
    const canvas = $("obb-lab");
    if (!canvas) return;
    const tau = $("obb-lab-tau"), out = $("obb-lab-out");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const src = new Image();
    let comps = null, W = 0, H = 0, zoom = null;

    function cross(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    function hull(pts) {
      const p = pts.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
      if (p.length < 3) return p;
      const lo = [], hi = [];
      p.forEach(function (q) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); });
      for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (hi.length >= 2 && cross(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
      return lo.slice(0, -1).concat(hi.slice(0, -1));
    }
    /* minimum-area rectangle: one side lies on a hull edge, so test every edge direction */
    function minAreaRect(h) {
      let best = null;
      for (let i = 0; i < h.length; i++) {
        const a = h[i], b = h[(i + 1) % h.length];
        const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
        if (!len) continue;
        const ux = (b[0] - a[0]) / len, uy = (b[1] - a[1]) / len;
        let u0 = Infinity, u1 = -Infinity, v0 = Infinity, v1 = -Infinity;
        h.forEach(function (p) { const u = p[0] * ux + p[1] * uy, v = -p[0] * uy + p[1] * ux; u0 = Math.min(u0, u); u1 = Math.max(u1, u); v0 = Math.min(v0, v); v1 = Math.max(v1, v); });
        const area = (u1 - u0) * (v1 - v0);
        if (!best || area < best.area) best = { area: area, ux: ux, uy: uy, u0: u0, u1: u1, v0: v0, v1: v1 };
      }
      const r = best, P = function (u, v) { return [u * r.ux - v * r.uy, u * r.uy + v * r.ux]; };
      r.pts = [P(r.u0, r.v0), P(r.u1, r.v0), P(r.u1, r.v1), P(r.u0, r.v1)];
      r.angle = Math.atan2(r.uy, r.ux) * 180 / Math.PI;
      return r;
    }

    src.onload = function () {
      W = src.naturalWidth; H = src.naturalHeight;
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const o = off.getContext("2d", { willReadFrequently: true });
      o.drawImage(src, 0, 0);
      const d = o.getImageData(0, 0, W, H).data;
      /* Eq. (1): OpenCV H ∈ [20, 40] of 180 → 40°–80°; S, V ∈ [100, 255] of 255 */
      const m = new Uint8Array(W * H);
      for (let i = 0; i < W * H; i++) {
        const r = d[4 * i] / 255, g = d[4 * i + 1] / 255, b = d[4 * i + 2] / 255;
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b), dl = mx - mn;
        let hh = 0;
        if (dl > 0) hh = mx === r ? 60 * (((g - b) / dl) % 6) : mx === g ? 60 * ((b - r) / dl + 2) : 60 * ((r - g) / dl + 4);
        if (hh < 0) hh += 360;
        if (hh >= 40 && hh <= 80 && mx && dl / mx >= 100 / 255 && mx >= 100 / 255) m[i] = 1;
      }
      /* connected components, 8-connectivity */
      const seen = new Uint8Array(W * H), stack = [];
      comps = [];
      for (let i = 0; i < W * H; i++) {
        if (!m[i] || seen[i]) continue;
        const px = [];
        stack.push(i); seen[i] = 1;
        while (stack.length) {
          const j = stack.pop(), x = j % W, y = (j - x) / W;
          px.push([x, y]);
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx, yy = y + dy, k = yy * W + xx;
            if (xx >= 0 && yy >= 0 && xx < W && yy < H && m[k] && !seen[k]) { seen[k] = 1; stack.push(k); }
          }
        }
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        const corners = [];
        px.forEach(function (p) {
          x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0] + 1); y1 = Math.max(y1, p[1] + 1);
          corners.push(p, [p[0] + 1, p[1]], [p[0], p[1] + 1], [p[0] + 1, p[1] + 1]);
        });
        const hl = hull(corners);
        comps.push({ area: px.length, box: [x0, y0, x1, y1], obb: hl.length >= 3 ? minAreaRect(hl) : null });
      }
      draw();
    };
    src.src = canvas.dataset.src;

    function draw() {
      if (!comps) return;
      const t = +tau.value;
      $("obb-lab-tau-out").textContent = t + " px";
      const showA = $("obb-show-a").checked, showO = $("obb-show-o").checked;
      const kept = comps.filter(function (c) { return c.area >= t; });
      /* view: full frame, or zoomed on the largest echo */
      let vx = 0, vy = 0, vw = W, vh = H;
      if (zoom) {
        const big = kept.slice().sort(function (a, b) { return b.area - a.area; })[0];
        if (big) { const cx = (big.box[0] + big.box[2]) / 2, cy = (big.box[1] + big.box[3]) / 2; vw = vh = 120; vx = cx - 60; vy = cy - 60; }
      }
      const CW = canvas.width = 600, CH = canvas.height = Math.round(600 * vh / vw);
      ctx.imageSmoothingEnabled = !zoom;
      ctx.drawImage(src, vx, vy, vw, vh, 0, 0, CW, CH);
      const s = CW / vw, X = function (x) { return (x - vx) * s; }, Y = function (y) { return (y - vy) * s; };
      ctx.lineWidth = zoom ? 3 : 2;
      kept.forEach(function (c) {
        if (showA) { ctx.strokeStyle = "#ff3b3b"; ctx.strokeRect(X(c.box[0]), Y(c.box[1]), (c.box[2] - c.box[0]) * s, (c.box[3] - c.box[1]) * s); }
        if (showO && c.obb) {
          ctx.strokeStyle = "#39ff88";
          ctx.beginPath();
          c.obb.pts.forEach(function (p, k) { (k ? ctx.lineTo : ctx.moveTo).call(ctx, X(p[0]), Y(p[1])); });
          ctx.closePath(); ctx.stroke();
        }
      });
      let sa = 0, so = 0, sp = 0;
      kept.forEach(function (c) { if (c.obb) { sa += (c.box[2] - c.box[0]) * (c.box[3] - c.box[1]); so += c.obb.area; sp += c.area; } });
      out.innerHTML =
        "<tr><td>Contours found</td><td class='num'>" + comps.length + "</td></tr>" +
        "<tr><td>Kept (area ≥ τ)</td><td class='num'><b>" + kept.length + "</b></td></tr>" +
        "<tr><td>Echo pixels / AABB area</td><td class='num'>" + (sa ? (sp / sa * 100).toFixed(0) : "–") + "%</td></tr>" +
        "<tr><td>Echo pixels / OBB area</td><td class='num'><b>" + (so ? (sp / so * 100).toFixed(0) : "–") + "%</b></td></tr>" +
        "<tr><td>OBB area vs AABB</td><td class='num'>" + (sa ? (-(1 - so / sa) * 100).toFixed(0) : "–") + "%</td></tr>";
    }
    tau.addEventListener("input", draw);
    ["obb-show-a", "obb-show-o"].forEach(function (id) { $(id).addEventListener("change", draw); });
    PV.seg($("obb-lab-view"), function (v) { zoom = v === "zoom"; draw(); });
  })();

  /* ---------- 2. AABB vs OBB on an idealized elongated echo ---------- */
  (function geom() {
    const host = $("obb-geom");
    if (!host) return;
    const ang = $("obb-geom-a"), asp = $("obb-geom-r"), out = $("obb-geom-out");
    function draw() {
      const th = +ang.value * Math.PI / 180, r = +asp.value, a = 70, b = a / r;
      $("obb-geom-a-out").textContent = ang.value + "°";
      $("obb-geom-r-out").textContent = r.toFixed(1) + " : 1";
      const hw = Math.sqrt(a * a * Math.cos(th) ** 2 + b * b * Math.sin(th) ** 2), hh = Math.sqrt(a * a * Math.sin(th) ** 2 + b * b * Math.cos(th) ** 2);
      const S = 220, c = PV.svg(host, S, S, "Elliptical echo with axis-aligned and oriented boxes"), g = c.svg, o = S / 2;
      PV.el(g, "rect", { x: 0, y: 0, width: S, height: S, rx: 10, fill: "#00007a" });
      const deg = -ang.value;
      PV.el(g, "ellipse", { cx: o, cy: o, rx: a, ry: b, fill: "#ffe600", transform: "rotate(" + deg + " " + o + " " + o + ")" });
      PV.el(g, "rect", { x: o - hw, y: o - hh, width: 2 * hw, height: 2 * hh, fill: "none", stroke: "#ff3b3b", "stroke-width": 2 });
      PV.el(g, "rect", { x: o - a, y: o - b, width: 2 * a, height: 2 * b, fill: "none", stroke: "#39ff88", "stroke-width": 2, transform: "rotate(" + deg + " " + o + " " + o + ")" });
      const ell = Math.PI * a * b, aabb = 4 * hw * hh, obb = 4 * a * b;
      out.innerHTML =
        "<tr><td>Echo / AABB area</td><td class='num'><b style='color:#d12'>" + (ell / aabb * 100).toFixed(0) + "%</b></td></tr>" +
        "<tr><td>Echo / OBB area</td><td class='num'><b style='color:var(--ds-good)'>" + (ell / obb * 100).toFixed(0) + "%</b></td></tr>" +
        "<tr><td>AABB is larger than OBB by</td><td class='num'>" + ((aabb / obb - 1) * 100).toFixed(0) + "%</td></tr>";
    }
    [ang, asp].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 3. Table 2: resized vs tiled per YOLOv11 task ---------- */
  (function training() {
    const host = $("obb-train");
    if (!host) return;
    const D = { "Detect": [[.921, .681], [.984, .816]], "OBB": [[.955, .799], [.989, .882]], "Segment": [[.922, .668], [.985, .810]] };
    PV.seg($("obb-train-m"), function (k) {
      const j = k === "m50" ? 0 : 1, cats = Object.keys(D);
      const W = 720, H = 246, L = 56, R = 700, T = 30, B = 210;
      const c = PV.svg(host, W, H, (j ? "mAP@0.5:0.95" : "mAP@0.5") + " for resized and tiled training");
      const g = c.svg, y = PV.linear(0, 1, B, T);
      for (let v = 0; v <= 1.0001; v += 0.2) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" });
        PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v.toFixed(1));
      }
      PV.el(g, "text", { x: L, y: 12, class: "tk" }, (j ? "mAP@0.5:0.95" : "mAP@0.5") + ", YOLOv11n, test set");
      const band = (R - L) / 3, bw = 70;
      cats.forEach(function (cat, i) {
        [0, 1].forEach(function (s) {
          const v = D[cat][s][j], bx = L + band * i + band / 2 - bw - 1 + s * (bw + 2);
          PV.vbar(g, bx, B, bw, B - y(v), "mk", s ? "var(--pv-s1)" : "var(--pv-base)");
          PV.el(g, "text", { x: bx + bw / 2, y: y(v) - 5, "text-anchor": "middle", class: "vl" }, v.toFixed(3));
        });
        PV.el(g, "text", { x: L + band * i + band / 2, y: B + 20, "text-anchor": "middle", class: "tt" }, "YOLOv11-" + cat.toLowerCase());
        const hit = PV.el(g, "rect", { x: L + band * i, y: T, width: band, height: B - T, class: "hit", "aria-label": cat });
        PV.hover(c, hit, "<b>YOLOv11-" + cat.toLowerCase() + "</b><br>resized: " + D[cat][0][0] + " / " + D[cat][0][1] + "<br>tiled: " + D[cat][1][0] + " / " + D[cat][1][1] + "<br>(mAP@0.5 / mAP@0.5:0.95)");
      });
    });
  })();

  /* ---------- 4. Tables 3–4: SAHI overlap and slice size, with slice counts for a 1050 × 1024 frame ---------- */
  (function sahi() {
    const hostM = $("obb-sahi"), hostN = $("obb-sahi-n");
    if (!hostM) return;
    const OV = { x: ["0.1", "0.2", "0.4", "0.5"], d: [[.9619, .4867, .3803], [.9623, .4877, .3811], [.9613, .4888, .3917], [.9616, .4896, .3941]] };
    const SZ = { x: ["640", "512", "448", "320", "240"], d: [[.9623, .4877, .3811], [.9729, .5058, .4258], [.9707, .5085, .4466], [.9768, .5120, .4860], [.9762, .5009, .4592]] };
    const st = { set: "size", m: "2" };
    function slices(size, ov) {
      const stride = Math.round(size * (1 - ov));
      const n = function (L) { let k = 0; for (let p = 0; ; p += stride) { k++; if (p + size >= L) break; } return k; };
      return n(1050) * n(1024);
    }
    function draw() {
      const S = st.set === "size" ? SZ : OV, j = +st.m, name = ["mAP@0.5", "mAP@0.5:0.95", "mAP@0.75"][j];
      const vals = S.d.map(function (r) { return r[j]; });
      const W = 470, H = 230, L = 56, R = 450, T = 24, B = 196;
      const lo = Math.floor(Math.min.apply(null, vals) * 100 - 1) / 100, hi = Math.ceil(Math.max.apply(null, vals) * 100 + 1) / 100;
      const c = PV.svg(hostM, W, H, name + " versus " + (st.set === "size" ? "slice size" : "overlap"));
      const g = c.svg, x = function (i) { return L + 30 + i * (R - L - 60) / (S.x.length - 1); }, y = PV.linear(lo, hi, B, T);
      const step = (hi - lo) / 4;
      for (let k = 0; k <= 4; k++) { const v = lo + k * step; PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" }); PV.el(g, "text", { x: L - 6, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v.toFixed(3)); }
      PV.el(g, "text", { x: L, y: 12, class: "tk" }, name + " (zoomed axis)");
      S.x.forEach(function (lab, i) { PV.el(g, "text", { x: x(i), y: B + 18, "text-anchor": "middle", class: "tk" }, st.set === "size" ? lab + " px" : lab); });
      PV.el(g, "path", { d: vals.map(function (v, i) { return (i ? "L" : "M") + x(i) + " " + y(v); }).join(" "), fill: "none", stroke: "var(--pv-s1)", "stroke-width": 2 });
      const bi = vals.indexOf(Math.max.apply(null, vals));
      vals.forEach(function (v, i) {
        PV.el(g, "circle", { cx: x(i), cy: y(v), r: i === bi ? 6.5 : 5, fill: i === bi ? "var(--pv-s2)" : "var(--pv-s1)", stroke: "var(--ds-bg)", "stroke-width": 2 });
        PV.el(g, "text", { x: x(i), y: y(v) - 10, "text-anchor": "middle", class: "vl" }, v.toFixed(4));
      });
      /* slice counts on a 1050 × 1024 frame */
      const n = S.x.map(function (lab) { return st.set === "size" ? slices(+lab, 0.2) : slices(640, +lab); });
      const W2 = 230, H2 = 230, L2 = 40, R2 = 220, T2 = 24, B2 = 196;
      const c2 = PV.svg(hostN, W2, H2, "Slices per frame"), g2 = c2.svg;
      const nk = PV.nice(Math.max.apply(null, n), 4), y2 = PV.linear(0, nk.max, B2, T2);
      for (let v = 0; v <= nk.max; v += nk.step) { PV.el(g2, "line", { x1: L2, x2: R2, y1: y2(v), y2: y2(v), class: v ? "gl" : "ax" }); PV.el(g2, "text", { x: L2 - 6, y: y2(v) + 4, "text-anchor": "end", class: "tk" }, v); }
      PV.el(g2, "text", { x: L2, y: 12, class: "tk" }, "slices per 1050 × 1024 frame");
      const band = (R2 - L2) / n.length, bw = Math.min(26, band - 6);
      n.forEach(function (v, i) {
        const bx = L2 + band * i + (band - bw) / 2;
        PV.vbar(g2, bx, B2, bw, B2 - y2(v), "mk", "var(--pv-base)");
        PV.el(g2, "text", { x: bx + bw / 2, y: y2(v) - 4, "text-anchor": "middle", class: "vl" }, v);
        PV.el(g2, "text", { x: bx + bw / 2, y: B2 + 18, "text-anchor": "middle", class: "tk" }, S.x[i]);
      });
    }
    PV.seg($("obb-sahi-set"), function (v) { st.set = v; draw(); });
    PV.seg($("obb-sahi-m"), function (v) { st.m = v; draw(); });
  })();

  /* ---------- 5. Tables 5–6: the three tasks after SAHI ---------- */
  (function tasks() {
    const host = $("obb-pr");
    if (!host) return;
    const D = [["Detect", 4268, 326, 189], ["OBB", 4254, 409, 203], ["Segment", 4256, 620, 201]];
    const W = 360, H = 220, L = 46, R = 350, T = 24, B = 190;
    const c = PV.svg(host, W, H, "False positives and false negatives per model"), g = c.svg;
    const y = PV.linear(0, 700, B, T);
    for (let v = 0; v <= 700; v += 175) { PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" }); PV.el(g, "text", { x: L - 6, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v); }
    PV.el(g, "text", { x: L, y: 12, class: "tk" }, "errors on the test set (TP ≈ 4,260 each)");
    const band = (R - L) / 3, bw = 34;
    D.forEach(function (d, i) {
      const x0 = L + band * i + band / 2 - bw - 1;
      PV.vbar(g, x0, B, bw, B - y(d[2]), "mk", "var(--pv-s2)");
      PV.vbar(g, x0 + bw + 2, B, bw, B - y(d[3]), "mk", "var(--pv-s1)");
      PV.el(g, "text", { x: x0 + bw / 2, y: y(d[2]) - 4, "text-anchor": "middle", class: "vl" }, d[2]);
      PV.el(g, "text", { x: x0 + bw * 1.5 + 2, y: y(d[3]) - 4, "text-anchor": "middle", class: "vl" }, d[3]);
      PV.el(g, "text", { x: L + band * i + band / 2, y: B + 18, "text-anchor": "middle", class: "tk" }, d[0]);
      const hit = PV.el(g, "rect", { x: L + band * i, y: T, width: band, height: B - T, class: "hit", "aria-label": d[0] });
      PV.hover(c, hit, "<b>YOLOv11-" + d[0].toLowerCase() + "</b><br>TP " + d[1] + " · FP " + d[2] + " · FN " + d[3] + "<br>precision " + (d[1] / (d[1] + d[2])).toFixed(4) + " · recall " + (d[1] / (d[1] + d[3])).toFixed(4));
    });
  })();

  /* ---------- 6. Table 7: centroid error against AIS ---------- */
  (function centroid() {
    const host = $("obb-cen");
    if (!host) return;
    const D = {
      "Vessel 2": { Detect: [6.33, 6.05, 0.90, 14.20, 3.10], OBB: [6.30, 6.00, 1.20, 14.30, 3.04], Segment: [6.75, 6.30, 1.00, 12.80, 2.98] },
      "Vessel 4": { Detect: [5.14, 5.20, 0.10, 19.00, 2.99], OBB: [5.06, 5.10, 0.20, 19.10, 3.10], Segment: [5.62, 5.45, 0.50, 20.00, 2.93] }
    };
    const ST = { mean: [0, "Mean"], median: [1, "Median"], max: [3, "Maximum"], std: [4, "Std. dev."] };
    const COL = { Detect: "var(--pv-base)", OBB: "var(--pv-s2)", Segment: "var(--pv-s1)" };
    PV.seg($("obb-cen-m"), function (k) {
      const j = ST[k][0], vs = Object.keys(D), ms = ["Detect", "OBB", "Segment"];
      const W = 720, H = 236, L = 56, R = 700, T = 30, B = 200;
      const c = PV.svg(host, W, H, ST[k][1] + " centroid error"), g = c.svg;
      const top = Math.max.apply(null, vs.map(function (v) { return Math.max.apply(null, ms.map(function (m) { return D[v][m][j]; })); }));
      const nk = PV.nice(top, 4), y = PV.linear(0, nk.max, B, T);
      for (let v = 0; v <= nk.max + 1e-9; v += nk.step) { PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" }); PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v); }
      PV.el(g, "text", { x: L, y: 12, class: "tk" }, ST[k][1] + " distance to the AIS point (px), lower is better");
      const band = (R - L) / 2, bw = 66;
      vs.forEach(function (v, i) {
        ms.forEach(function (m, q) {
          const val = D[v][m][j], bx = L + band * i + band / 2 - 1.5 * bw - 2 + q * (bw + 2);
          PV.vbar(g, bx, B, bw, B - y(val), "mk", COL[m]);
          PV.el(g, "text", { x: bx + bw / 2, y: y(val) - 5, "text-anchor": "middle", class: "vl" }, val.toFixed(2));
          const hit = PV.el(g, "rect", { x: bx, y: T, width: bw, height: B - T, class: "hit", "aria-label": m + " " + v });
          const r = D[v][m];
          PV.hover(c, hit, "<b>" + m + "</b> · " + v + "<br>mean " + r[0] + " · median " + r[1] + " px<br>min " + r[2] + " · max " + r[3] + " px<br>std " + r[4] + " px");
        });
        PV.el(g, "text", { x: L + band * i + band / 2, y: B + 20, "text-anchor": "middle", class: "tt" }, v);
      });
    });
  })();

  /* ---------- 7. viewers: Fig. 4, Fig. 5 and Fig. 6 ---------- */
  function viewer(segId, imgId, capId, base, caps, notes, noteId) {
    const img = $(imgId);
    if (!img) return;
    PV.seg($(segId), function (v) {
      img.src = "img/obb/" + base + v + ".webp";
      img.alt = caps[v];
      if (capId) $(capId).textContent = caps[v];
      if (noteId) $(noteId).innerHTML = notes[v];
    });
    Object.keys(caps).forEach(function (k) { new Image().src = "img/obb/" + base + k + ".webp"; });
  }
  viewer("obb-f4-v", "obb-f4-img", "obb-f4-cap", "f4_",
    { detect: "Detect: axis-aligned boxes", obb: "OBB: oriented boxes", seg: "Segment: instance masks" },
    { detect: "Most targets are found, but axis-aligned boxes grow large around elongated, tilted echoes.", obb: "Oriented boxes follow each vessel's heading: tighter fits and less surrounding clutter.", seg: "Masks trace the echo silhouette and separate wakes from the main vessel echo." }, "obb-f4-note");
  viewer("obb-f5-v", "obb-f5-img", "obb-f5-cap", "f5_",
    { gt: "Ground truth (white)", detect: "Detect", obb: "OBB", seg: "Segment" },
    { gt: "Ground-truth boxes from the semi-automatic labelling.", detect: "Green: true positive · yellow: false positive · red: false negative.", obb: "Green: true positive · yellow: false positive · red: false negative.", seg: "Green: true positive · yellow: false positive · red: false negative." }, "obb-f5-note");
  viewer("obb-f6-v", "obb-f6-img", null, "fail_",
    { a: "FN: weak echo", b: "FN: wave clutter", c: "FP + FN: SAHI slicing", d: "FN: manoeuvre", e: "FP: split echo", f: "FN: merged echoes" },
    {
      a: "<b>Weak echo.</b> Attenuation or scattering makes a vessel small and faint; it falls below the detection threshold.",
      b: "<b>Wave clutter.</b> Rising sea state produces echoes that hide the vessel's signature from the OBB head.",
      c: "<b>Slicing.</b> A patch boundary splits a target (FN) while a wave artefact is accepted (FP).",
      d: "<b>Manoeuvre.</b> A turn changes the echo shape with the viewing angle and the model misses it.",
      e: "<b>Split echo.</b> One vessel appears as two (multipath during manoeuvres); NMS does not merge them.",
      f: "<b>Merged echoes.</b> Two ships merge into one return, so the count is too low; typical in dense traffic."
    }, "obb-f6-note");

  document.querySelectorAll("#ds-deck table.pv-sort").forEach(PV.sortable);
})();
