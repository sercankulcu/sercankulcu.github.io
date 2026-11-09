/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Radar image-based object detection and tracking for autonomous surface vehicles" (TrJMMS 12(1), 2026):
   interactive slides. Numbers are taken from Tables 1–5 of the paper; the tracker simulator and the smoothing
   demo use synthetic data and say so on their slides. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };

  /* ---------- 1. detection lab: HSV mask + area classes (Table 1) on the Fig. 5 frame ---------- */
  (function lab() {
    const canvas = $("trk-lab");
    if (!canvas) return;
    const out = $("trk-lab-out");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const src = new Image();
    let comps = null, W = 0, H = 0;
    src.onload = function () {
      W = canvas.width = src.naturalWidth; H = canvas.height = src.naturalHeight;
      ctx.drawImage(src, 0, 0);
      const d = ctx.getImageData(0, 0, W, H).data;
      /* 3 × 3 box blur stands in for the configurable Gaussian; then OpenCV H ∈ [10, 40] of 180 → 20°–80°, S, V ≥ 50 of 255 */
      const m = new Uint8Array(W * H);
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
        let r = 0, g = 0, b = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const k = 4 * ((y + dy) * W + x + dx); r += d[k]; g += d[k + 1]; b += d[k + 2]; }
        r /= 9 * 255; g /= 9 * 255; b /= 9 * 255;
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b), dl = mx - mn;
        let h = 0;
        if (dl > 0) h = mx === r ? 60 * (((g - b) / dl) % 6) : mx === g ? 60 * ((b - r) / dl + 2) : 60 * ((r - g) / dl + 4);
        if (h < 0) h += 360;
        if (h >= 20 && h <= 80 && mx && dl / mx >= 50 / 255 && mx >= 50 / 255) m[y * W + x] = 1;
      }
      /* morphological open then close, 3 × 3 */
      function morph(a, isMax) {
        const o = new Uint8Array(W * H);
        for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
          let v = isMax ? 0 : 1;
          for (let dy = -1; dy <= 1 && (isMax ? !v : v); dy++) for (let dx = -1; dx <= 1; dx++) { const p = a[(y + dy) * W + x + dx]; if (isMax ? p : !p) { v = isMax ? 1 : 0; break; } }
          o[y * W + x] = v;
        }
        return o;
      }
      const mk = morph(morph(morph(morph(m, false), true), true), false);
      const seen = new Uint8Array(W * H), stack = [];
      comps = [];
      for (let i = 0; i < W * H; i++) {
        if (!mk[i] || seen[i]) continue;
        let n = 0, x0 = W, y0 = H, x1 = 0, y1 = 0, sx = 0, sy = 0;
        stack.push(i); seen[i] = 1;
        while (stack.length) {
          const j = stack.pop(), x = j % W, y = (j - x) / W;
          n++; sx += x; sy += y; x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx, yy = y + dy, k = yy * W + xx;
            if (xx >= 0 && yy >= 0 && xx < W && yy < H && mk[k] && !seen[k]) { seen[k] = 1; stack.push(k); }
          }
        }
        comps.push({ n: n, cx: sx / n, cy: sy / n, box: [x0, y0, x1 + 1, y1 + 1] });
      }
      draw();
    };
    src.src = canvas.dataset.src;
    PV.seg($("trk-lab-show"), function () { draw(); });
    function draw() {
      if (!comps) return;
      /* thresholds are given for the 1200 px wide capture; this figure is narrower, so areas scale by (W / 1200)² */
      const k = (W / 1200) * (W / 1200);
      const T = { fixed: [1 * k, 32 * k], target: [32 * k, 196 * k], land: [196 * k, 10240 * k] };
      const show = document.querySelector("#trk-lab-show button.is-on").dataset.v;
      ctx.drawImage(src, 0, 0);
      const cnt = { target: 0, fixed: 0, land: 0, other: 0 };
      comps.forEach(function (c) {
        const cls = c.n >= T.land[0] && c.n <= T.land[1] ? "land" : c.n >= T.target[0] && c.n < T.target[1] ? "target" : c.n >= T.fixed[0] && c.n < T.fixed[1] ? "fixed" : "other";
        cnt[cls]++;
        if (show !== "all" && show !== cls) return;
        const col = { target: "#22ff66", fixed: "#ff4040", land: "#ff9f1c", other: "#888" }[cls];
        ctx.strokeStyle = col; ctx.lineWidth = 2;
        if (cls === "land") { ctx.strokeRect(c.box[0] - 1, c.box[1] - 1, c.box[2] - c.box[0] + 2, c.box[3] - c.box[1] + 2); }
        else { ctx.strokeRect(c.cx - 7, c.cy - 7, 14, 14); }
      });
      out.innerHTML =
        "<tr><td><i class='trk-dot' style='background:#22ff66'></i>Targets (32–196 px²)</td><td class='num'><b>" + cnt.target + "</b></td></tr>" +
        "<tr><td><i class='trk-dot' style='background:#ff4040'></i>Fixed objects (1–32 px²)</td><td class='num'><b>" + cnt.fixed + "</b></td></tr>" +
        "<tr><td><i class='trk-dot' style='background:#ff9f1c'></i>Landmass (196–10,240 px²)</td><td class='num'><b>" + cnt.land + "</b></td></tr>" +
        "<tr><td colspan='2' class='trk-foot'>Area thresholds of Table 1, scaled by (" + W + " / 1200)² for this figure.</td></tr>";
    }
  })();

  /* ---------- 2. tracker simulator: positional-only baseline vs motion-aware ID recovery ---------- */
  (function sim() {
    const hostA = $("trk-sim-a"), hostB = $("trk-sim-b");
    if (!hostA) return;
    const thr = $("trk-sim-thr"), lost = $("trk-sim-lost"), drop = $("trk-sim-drop"), playBtn = $("trk-sim-play"), out = $("trk-sim-out");
    const N = 160, S = 240;
    /* synthetic scene: four targets; T2 (straight) and T3 (turning) are hidden for the chosen number of frames */
    function truth(id, t) {
      if (id === 0) return [20 + 1.3 * t, 60 + 0.25 * t];
      if (id === 1) return [210 - 1.1 * t, 200 - 0.6 * t];
      if (id === 2) { const a = t / 50; return [120 + 70 * Math.cos(a), 120 + 70 * Math.sin(a)]; }
      return [60 + 0.9 * t, 220 - 1.0 * t];
    }
    function hidden(id, t) { const L = +drop.value; return (id === 1 && t >= 55 && t < 55 + L) || (id === 2 && t >= 100 && t < 100 + L); }
    let frames = [];
    function makeDetections() {
      let seed = 12345;
      const rnd = function () { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
      frames = [];
      for (let t = 0; t < N; t++) {
        const det = [];
        for (let id = 0; id < 4; id++) {
          const r1 = rnd(), r2 = rnd(), r3 = rnd();
          if (hidden(id, t) || r1 < 0.03) continue;
          const q = truth(id, t);
          if (q[0] < 0 || q[1] < 0 || q[0] > S || q[1] > S) continue;
          det.push({ gt: id, x: q[0] + (r2 - 0.5) * 1.6, y: q[1] + (r3 - 0.5) * 1.6 });
        }
        frames.push(det);
      }
    }
    function run(recover) {
      const T = +thr.value, ML = +lost.value;
      let next = 1, tracks = [], inactive = [];
      const lastId = {}, res = [];
      let switches = 0;
      frames.forEach(function (det, t) {
        const used = {}, assign = [];
        det.forEach(function (d) {
          let best = null, bd = Infinity;
          tracks.forEach(function (tr) { if (used[tr.id]) return; const dd = Math.hypot(d.x - tr.x, d.y - tr.y); if (dd < T && dd < bd) { bd = dd; best = tr; } });
          if (!best && recover) {
            /* Fig. 3, lines 7–14: predicted position of each inactive track = last position + velocity × elapsed frames */
            let bi = -1, bdd = Infinity;
            inactive.forEach(function (tr, i) {
              const k = t - tr.t, px = tr.x + tr.vx * k, py = tr.y + tr.vy * k, dd = Math.hypot(d.x - px, d.y - py);
              if (dd < T && dd < bdd) { bdd = dd; bi = i; }
            });
            if (bi >= 0) { best = inactive.splice(bi, 1)[0]; best.age = 0; tracks.push(best); }
          }
          if (!best) { best = { id: next++, x: d.x, y: d.y, vx: 0, vy: 0, t: t, age: 0, n: 0 }; tracks.push(best); }
          const k = Math.max(1, t - best.t);
          if (best.n) { best.vx = (d.x - best.x) / k; best.vy = (d.y - best.y) / k; }
          best.x = d.x; best.y = d.y; best.t = t; best.age = 0; best.n++;
          used[best.id] = 1;
          assign.push({ x: d.x, y: d.y, id: best.id, gt: d.gt });
          if (lastId[d.gt] !== undefined && lastId[d.gt] !== best.id) switches++;
          lastId[d.gt] = best.id;
        });
        tracks = tracks.filter(function (tr) {
          if (used[tr.id]) return true;
          tr.age++;
          if (tr.age > ML) { if (recover) inactive.push(tr); return false; }
          return true;
        });
        res.push(assign);
      });
      return { frames: res, switches: switches, ids: next - 1 };
    }
    function color(id) { return "hsl(" + ((id * 67) % 360) + " 85% 55%)"; }
    let A, B, cur = N - 1, timer = null;
    function compute() { makeDetections(); A = run(false); B = run(true); }
    function paint(host, R, title) {
      const c = PV.svg(host, S, S + 18, title), g = c.svg;
      PV.el(g, "rect", { x: 0, y: 18, width: S, height: S, rx: 8, fill: "#00007a" });
      PV.el(g, "text", { x: 0, y: 12, class: "tt" }, title);
      const last = {};
      for (let t = 0; t <= cur; t++) R.frames[t].forEach(function (a) {
        PV.el(g, "circle", { cx: a.x, cy: a.y + 18, r: 1.4, fill: color(a.id), opacity: 0.35 + 0.65 * (t / Math.max(1, cur)) });
        last[a.gt] = a;
      });
      R.frames[cur].forEach(function (a) {
        PV.el(g, "circle", { cx: a.x, cy: a.y + 18, r: 4.5, fill: color(a.id), stroke: "#fff", "stroke-width": 1.2 });
        PV.el(g, "text", { x: a.x + 6, y: a.y + 14, style: "fill:#fff;font:700 11px system-ui,sans-serif" }, "#" + a.id);
      });
      PV.el(g, "text", { x: S - 6, y: S + 12, "text-anchor": "end", style: "fill:#cfd3ff;font:11px system-ui,sans-serif" }, "frame " + (cur + 1) + " / " + N);
    }
    function draw() {
      $("trk-sim-thr-out").textContent = thr.value + " px";
      $("trk-sim-lost-out").textContent = lost.value;
      $("trk-sim-drop-out").textContent = drop.value;
      paint(hostA, A, "Positional-only baseline");
      paint(hostB, B, "Proposed: motion-aware ID recovery");
      const done = cur === N - 1;
      out.innerHTML = "<tr><th></th><th class='num'>ID switches</th><th class='num'>IDs generated</th></tr>" +
        "<tr><td>Baseline</td><td class='num'>" + (done ? A.switches : "…") + "</td><td class='num'>" + (done ? A.ids : "…") + "</td></tr>" +
        "<tr class='is-ours'><td>Proposed</td><td class='num'><b>" + (done ? B.switches : "…") + "</b></td><td class='num'><b>" + (done ? B.ids : "…") + "</b></td></tr>" +
        "<tr><td>Ideal</td><td class='num'>0</td><td class='num'>4</td></tr>";
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; playBtn.textContent = "▶ Play"; } }
    playBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (timer) { stop(); return; }
      cur = 0; playBtn.textContent = "❚❚ Pause";
      timer = setInterval(function () { cur++; if (cur >= N - 1) { cur = N - 1; stop(); } draw(); }, 45);
    });
    [thr, lost, drop].forEach(function (e) { e.addEventListener("input", function () { stop(); cur = N - 1; compute(); draw(); }); });
    compute(); draw();
  })();

  /* ---------- 3. relative velocity (Eqs. 6–7) ---------- */
  (function relvel() {
    const host = $("trk-rv");
    if (!host) return;
    const ids = ["trk-rv-os", "trk-rv-oc", "trk-rv-ts", "trk-rv-tc", "trk-rv-b"];
    const el = ids.map($), out = $("trk-rv-out");
    function vec(sp, co) { const a = co * Math.PI / 180; return [sp * Math.sin(a), -sp * Math.cos(a)]; }
    function draw() {
      const os = +el[0].value, oc = +el[1].value, ts = +el[2].value, tc = +el[3].value, br = +el[4].value;
      $("trk-rv-os-out").textContent = os + " kn"; $("trk-rv-oc-out").textContent = oc + "°";
      $("trk-rv-ts-out").textContent = ts + " kn"; $("trk-rv-tc-out").textContent = tc + "°"; $("trk-rv-b-out").textContent = br + "°";
      const vo = vec(os, oc), vt = vec(ts, tc), vr = [vt[0] - vo[0], vt[1] - vo[1]];
      const S = 240, o = S / 2, c = PV.svg(host, S, S, "Own ship, target and relative velocity vectors"), g = c.svg;
      PV.el(g, "rect", { x: 0, y: 0, width: S, height: S, rx: 10, fill: "#00007a" });
      PV.el(g, "circle", { cx: o, cy: o, r: 90, fill: "none", stroke: "rgba(255,255,255,.25)" });
      const pos = vec(80, br), tx = o + pos[0], ty = o + pos[1], k = 4;
      function arrow(x, y, v, col, w) {
        const ex = x + v[0] * k, ey = y + v[1] * k, a = Math.atan2(ey - y, ex - x);
        PV.el(g, "line", { x1: x, y1: y, x2: ex, y2: ey, stroke: col, "stroke-width": w });
        PV.el(g, "path", { d: "M" + ex + " " + ey + "L" + (ex - 8 * Math.cos(a - 0.4)) + " " + (ey - 8 * Math.sin(a - 0.4)) + "L" + (ex - 8 * Math.cos(a + 0.4)) + " " + (ey - 8 * Math.sin(a + 0.4)) + "Z", fill: col });
      }
      PV.el(g, "rect", { x: o - 5, y: o - 5, width: 10, height: 10, fill: "none", stroke: "#fff", "stroke-width": 2 });
      arrow(o, o, vo, "#ffffff", 2);
      PV.el(g, "rect", { x: tx - 5, y: ty - 5, width: 10, height: 10, fill: "none", stroke: "#22ff66", "stroke-width": 2 });
      arrow(tx, ty, vt, "#ffe600", 2);
      arrow(tx, ty, vr, "#ff5050", 3);
      const range = [tx - o, ty - o], rr = Math.hypot(range[0], range[1]);
      const closing = -(range[0] * vr[0] + range[1] * vr[1]) / rr;
      const sp = Math.hypot(vr[0], vr[1]);
      out.innerHTML =
        "<tr><td>|v<sub>rel</sub>| = |v<sub>target</sub> − v<sub>ship</sub>|</td><td class='num'><b>" + sp.toFixed(1) + " kn</b></td></tr>" +
        "<tr><td>Range-rate (closing speed)</td><td class='num'><b>" + (closing >= 0 ? "+" : "") + closing.toFixed(1) + " kn</b></td></tr>" +
        "<tr><td>Behaviour</td><td class='num'><b style='color:" + (closing > 0.5 ? "var(--ds-bad)" : closing < -0.5 ? "var(--ds-good)" : "var(--ds-muted)") + "'>" +
        (closing > 0.5 ? "approaching" : closing < -0.5 ? "moving away" : "constant distance") + "</b></td></tr>";
    }
    el.forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 4. exponential smoothing of a noisy speed (Eq. 8) ---------- */
  (function ema() {
    const host = $("trk-ema");
    if (!host) return;
    const al = $("trk-ema-a");
    let seed = 7;
    const rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const N = 90, raw = [];
    for (let t = 0; t < N; t++) raw.push((t < 45 ? 6 : 6 + (t - 45) * 0.12) + (rnd() - 0.5) * 3.2 + (rnd() < 0.06 ? (rnd() - 0.5) * 8 : 0));
    function draw() {
      const a = +al.value;
      $("trk-ema-a-out").textContent = "α = " + a.toFixed(2);
      const sm = [];
      raw.forEach(function (v, t) { sm.push(t ? a * v + (1 - a) * sm[t - 1] : v); });
      const W = 470, H = 176, L = 36, R = 460, T = 8, B = 154;
      const c = PV.svg(host, W, H, "Raw and smoothed relative speed"), g = c.svg;
      const x = PV.linear(0, N - 1, L, R), y = PV.linear(0, 16, B, T);
      for (let v = 0; v <= 16; v += 4) { PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" }); PV.el(g, "text", { x: L - 6, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v); }
      PV.el(g, "text", { x: R, y: H - 2, "text-anchor": "end", class: "tk" }, "frames →");
      PV.el(g, "path", { d: raw.map(function (v, i) { return (i ? "L" : "M") + x(i) + " " + y(v); }).join(" "), fill: "none", stroke: "var(--pv-base)", "stroke-width": 1.2 });
      PV.el(g, "path", { d: sm.map(function (v, i) { return (i ? "L" : "M") + x(i) + " " + y(v); }).join(" "), fill: "none", stroke: "var(--pv-s2)", "stroke-width": 2.4 });
    }
    al.addEventListener("input", draw);
    draw();
  })();

  /* ---------- 5. Tables 2 and 4: detection rates ---------- */
  (function rates() {
    const host = $("trk-rate");
    if (!host) return;
    const D = {
      targets: { name: "Target detection (Table 2)", base: [94.5, 2.7], prop: [98.7, 1.1] },
      fixed: { name: "Fixed objects (Table 4)", base: [85.3, 6.8], prop: [92.2, 3.5] }
    };
    PV.seg($("trk-rate-m"), function (k) {
      const d = D[k];
      const W = 720, H = 210, L = 150, R = 700, T = 24, rowH = 40;
      const c = PV.svg(host, W, H, d.name), g = c.svg;
      const x = PV.linear(0, 100, L, R);
      for (let v = 0; v <= 100; v += 20) { PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * 4, class: v ? "gl" : "ax" }); PV.el(g, "text", { x: x(v), y: T + rowH * 4 + 16, "text-anchor": "middle", class: "tk" }, v + "%"); }
      PV.el(g, "text", { x: L, y: 12, class: "tk" }, d.name);
      const rows = [["True positive rate", "Area-based only", d.base[0], "var(--pv-base)"], ["", "Proposed", d.prop[0], "var(--pv-s1)"], ["False positive rate", "Area-based only", d.base[1], "var(--pv-base)"], ["", "Proposed", d.prop[1], "var(--pv-s1)"]];
      rows.forEach(function (r, i) {
        const y = T + rowH * i + 9;
        if (r[0]) PV.el(g, "text", { x: 8, y: y + 14, class: "tt" }, r[0]);
        PV.el(g, "text", { x: L - 8, y: y + 14, "text-anchor": "end", class: "tk" }, r[1]);
        PV.hbar(g, x(0), y, Math.max(2, x(r[2]) - x(0)), 20, "mk", r[3]);
        PV.el(g, "text", { x: x(r[2]) + 6, y: y + 14, class: "vl" }, r[2].toFixed(1) + "%");
      });
    });
  })();
})();
