/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Integration of Steerable Smart Antennas to IETF 6TiSCH Protocol for High Reliability Wireless IoT Networks"
   (IEEE Access 9, 2021): interactive slides built from the paper's equations (1)–(8) and Tables 1–2.
   The RSSI learning run and the autonomous-cell hash are illustrations and say so on their slides. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };

  /* link model of Section III: G(θ) = 10(1 + cos θ) − 15 dB; RSS = P_TX + P_PL − 10K log10(d/d0) + G */
  const PTX = 0, PPL = -52, K = 2.5, SENS = -95;
  function gain(deg) { return 10 * (1 + Math.cos(deg * Math.PI / 180)) - 15; }
  function rss(d, g) { return PTX + PPL - 10 * K * Math.log10(Math.max(d, 1)) + g; }
  function range(g) { return Math.pow(10, (PTX + PPL + g - SENS) / (10 * K)); }
  function angDiff(a, b) { let d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; }

  /* ---------- 1. antenna pattern, range and one link ---------- */
  (function antenna() {
    const host = $("tsch-ant");
    if (!host) return;
    const st = $("tsch-ant-dir"), rb = $("tsch-ant-rb"), rd = $("tsch-ant-rd"), out = $("tsch-ant-out");
    function draw() {
      const dir = +st.value, b = +rb.value, d = +rd.value;
      $("tsch-ant-dir-out").textContent = dir + "°"; $("tsch-ant-rb-out").textContent = b + "°"; $("tsch-ant-rd-out").textContent = d + " m";
      const S = 260, o = S / 2, sc = 1.35;
      const c = PV.svg(host, S, S, "Transmission range of the steered antenna versus an omni-directional antenna"), g = c.svg;
      PV.el(g, "rect", { x: 0, y: 0, width: S, height: S, rx: 10, fill: "var(--ds-bg)", stroke: "var(--ds-border)" });
      [25, 50, 75].forEach(function (r) {
        PV.el(g, "circle", { cx: o, cy: o, r: r * sc, fill: "none", stroke: "var(--ds-border-base)", "stroke-dasharray": "3 4" });
        PV.el(g, "text", { x: o + 3, y: o - r * sc - 2, class: "tk" }, r + " m");
      });
      PV.el(g, "circle", { cx: o, cy: o, r: range(0) * sc, fill: "none", stroke: "var(--pv-s1)", "stroke-width": 2 });
      let p = "";
      for (let a = 0; a <= 360; a += 3) {
        const r = range(gain(a - dir)) * sc, t = a * Math.PI / 180;
        p += (a ? "L" : "M") + (o + r * Math.sin(t)).toFixed(1) + " " + (o - r * Math.cos(t)).toFixed(1);
      }
      PV.el(g, "path", { d: p + "Z", fill: "color-mix(in srgb, var(--pv-s2) 18%, transparent)", stroke: "var(--pv-s2)", "stroke-width": 2 });
      const bt = b * Math.PI / 180, rx = o + d * sc * Math.sin(bt), ry = o - d * sc * Math.cos(bt);
      const gs = gain(b - dir), rs = rss(d, gs), ro = rss(d, 0);
      PV.el(g, "line", { x1: o, y1: o, x2: rx, y2: ry, stroke: rs >= SENS ? "var(--ds-good)" : "var(--ds-bad)", "stroke-width": 1.5, "stroke-dasharray": "4 3" });
      PV.el(g, "circle", { cx: o, cy: o, r: 5, fill: "var(--ds-text)" });
      PV.el(g, "circle", { cx: rx, cy: ry, r: 6, fill: rs >= SENS ? "var(--ds-good)" : "var(--ds-bad)", stroke: "var(--ds-bg)", "stroke-width": 2 });
      const fmt = function (v) { return v.toFixed(1) + " dBm" + (v >= SENS ? " ✓" : " ✗"); };
      out.innerHTML =
        "<tr><td>Gain toward the receiver G(θ)</td><td class='num'><b>" + (gs >= 0 ? "+" : "") + gs.toFixed(1) + " dB</b></td></tr>" +
        "<tr><td>RSS, steerable</td><td class='num'><b style='color:" + (rs >= SENS ? "var(--ds-good)" : "var(--ds-bad)") + "'>" + fmt(rs) + "</b></td></tr>" +
        "<tr><td>RSS, omni-directional</td><td class='num'>" + fmt(ro) + "</td></tr>" +
        "<tr><td>Range: boresight / omni / back</td><td class='num'>" + range(5).toFixed(0) + " / " + range(0).toFixed(0) + " / " + range(-15).toFixed(0) + " m</td></tr>";
    }
    [st, rb, rd].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 2. RSSI-based direction learning (Algorithms 1–2) on one 40 m link ---------- */
  (function learning() {
    const host = $("tsch-rssi");
    if (!host) return;
    const btn = $("tsch-rssi-run"), steps = $("tsch-rssi-step"), out = $("tsch-rssi-out");
    let seed = 1;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    function runOne() {
      /* each slotframe both nodes point a random direction (discrete steps); the receiver keeps the best RSSI seen */
      const N = 120, step = +steps.value, dirs = 360 / step, D = 40, bearing = rnd() * 360, back = (bearing + 180) % 360;
      let best = -Infinity, first = null;
      const series = [];
      for (let t = 0; t < N; t++) {
        const tx = Math.floor(rnd() * dirs) * step, rx = Math.floor(rnd() * dirs) * step;
        const v = rss(D, gain(angDiff(tx, bearing)) + gain(angDiff(rx, back)));
        if (v >= SENS && v > best) { best = v; if (first === null) first = t; }
        series.push(best === -Infinity ? null : best);
      }
      return { s: series, first: first };
    }
    function draw() {
      $("tsch-rssi-step-out").textContent = steps.value + "°";
      const runs = [runOne(), runOne(), runOne(), runOne()];
      const W = 470, H = 196, L = 46, R = 460, T = 10, B = 168;
      const c = PV.svg(host, W, H, "Best RSSI over time for four node pairs"), g = c.svg;
      const x = PV.linear(0, 119, L, R), y = PV.linear(-96, -80, B, T);
      for (let v = -96; v <= -80; v += 4) { PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" }); PV.el(g, "text", { x: L - 6, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v); }
      PV.el(g, "text", { x: R, y: H - 2, "text-anchor": "end", class: "tk" }, "slotframes →");
      const omni = rss(40, 0), bestCase = rss(40, 10);
      PV.el(g, "line", { x1: L, x2: R, y1: y(omni), y2: y(omni), stroke: "var(--pv-s1)", "stroke-width": 1.5, "stroke-dasharray": "6 4" });
      PV.el(g, "text", { x: R - 4, y: y(omni) + 14, "text-anchor": "end", class: "tk" }, "omni " + omni.toFixed(0) + " dBm");
      PV.el(g, "line", { x1: L, x2: R, y1: y(bestCase), y2: y(bestCase), stroke: "var(--ds-good)", "stroke-width": 1.5, "stroke-dasharray": "6 4" });
      PV.el(g, "text", { x: R - 4, y: y(bestCase) - 5, "text-anchor": "end", class: "tk" }, "facing each other " + bestCase.toFixed(0) + " dBm");
      const COL = ["var(--pv-s2)", "#1baf7a", "#6250d6", "#e87ba4"];
      runs.forEach(function (r, k) {
        let d = "";
        r.s.forEach(function (v, t) { if (v !== null) d += (d ? "L" : "M") + x(t) + " " + y(v); });
        PV.el(g, "path", { d: d, fill: "none", stroke: COL[k], "stroke-width": 2 });
      });
      const final = runs.map(function (r) { return r.s[r.s.length - 1]; });
      out.innerHTML = "Final best RSSI of the four pairs: <b>" + final.map(function (v) { return v === null ? "–" : v.toFixed(1); }).join(", ") + " dBm</b>. " +
        "With coarser steering steps the pairs settle further from the −82 dBm optimum.";
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); draw(); });
    steps.addEventListener("input", draw);
    draw();
  })();

  /* ---------- 3. receive probability during discovery ---------- */
  (function discovery() {
    const a = $("tsch-pr-a"), b = $("tsch-pr-b"), n = $("tsch-pr-n"), out = $("tsch-pr-out");
    if (!a) return;
    function draw() {
      const A = +a.value, B = +b.value, Nn = +n.value;
      $("tsch-pr-a-out").textContent = A + "°"; $("tsch-pr-b-out").textContent = B + "°"; $("tsch-pr-n-out").textContent = Nn;
      const p1 = (A / 360) * (B / 360), p2 = (A / 360) * (Nn / (Nn + 1));
      out.innerHTML =
        "<tr><td>Discovery: P(R) = α/2π · β/2π</td><td class='num'><b>" + (p1 * 100).toFixed(1) + "%</b></td><td class='num'>≈ " + (1 / p1).toFixed(0) + " tries</td></tr>" +
        "<tr><td>Leaf → parent: P(R) = α/2π · n/(n+1)</td><td class='num'><b>" + (p2 * 100).toFixed(1) + "%</b></td><td class='num'>≈ " + (1 / p2).toFixed(1) + " tries</td></tr>" +
        "<tr><td>Omni-directional</td><td class='num'><b>100%</b></td><td class='num'>1 try</td></tr>";
    }
    [a, b, n].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 4. autonomous cells (Eq. 3) on the Fig. 4 topology ---------- */
  (function cells() {
    const host = $("tsch-cell");
    if (!host) return;
    const lenSel = $("tsch-cell-L"), out = $("tsch-cell-out");
    const LINKS = [[1, 2], [2, 3], [2, 4]], LHOP = 4;
    /* any deterministic hash works as long as every node computes the same one; this one is for illustration */
    function hash(a, b) { let h = (a * 2654435761 + b * 40503) >>> 0; h ^= h >>> 13; h = Math.imul(h, 1274126177) >>> 0; return (h ^ (h >>> 16)) >>> 0; }
    function draw() {
      const L = +lenSel.value;
      $("tsch-cell-L-out").textContent = L;
      const cellsMap = {};
      const rows = [];
      LINKS.forEach(function (l) {
        [[l[0], l[1]], [l[1], l[0]]].forEach(function (p) {
          const own = p[0], nb = p[1];
          const slot = hash(nb, own) % L, ch = hash(Math.min(own, nb), Math.max(own, nb)) % LHOP;
          /* the receiver computes slotRX = hash(IDo, IDn) with its own and the sender's id: the same slot;
             the channel hash is taken over the unordered id pair so both ends also pick the same channel */
          rows.push({ tx: own, rx: nb, slot: slot, ch: ch });
          const k = slot + "_" + ch;
          (cellsMap[k] = cellsMap[k] || []).push(own + "→" + nb);
        });
      });
      const W = 720, cw = Math.min(30, 640 / L), ch = 30, X0 = 60, Y0 = 22, H = Y0 + ch * LHOP + 24;
      const c = PV.svg(host, W, H, "Autonomous slotframe with cells computed from node identifiers"), g = c.svg;
      for (let s = 0; s < L; s++) PV.el(g, "text", { x: X0 + s * cw + cw / 2, y: 14, "text-anchor": "middle", class: "tk" }, s);
      for (let k = 0; k < LHOP; k++) PV.el(g, "text", { x: X0 - 8, y: Y0 + k * ch + ch / 2 + 4, "text-anchor": "end", class: "tk" }, "ch " + k);
      for (let s = 0; s < L; s++) for (let k = 0; k < LHOP; k++) PV.el(g, "rect", { x: X0 + s * cw, y: Y0 + k * ch, width: cw, height: ch, fill: "var(--ds-bg)", stroke: "var(--ds-border-base)" });
      let clashes = 0;
      Object.keys(cellsMap).forEach(function (k) {
        const p = k.split("_").map(Number), list = cellsMap[k], clash = list.length > 1;
        if (clash) clashes++;
        const r = PV.el(g, "rect", { x: X0 + p[0] * cw + 1, y: Y0 + p[1] * ch + 1, width: cw - 2, height: ch - 2, rx: 3, fill: clash ? "var(--ds-bad)" : "var(--pv-s1)" });
        PV.el(g, "text", { x: X0 + p[0] * cw + cw / 2, y: Y0 + p[1] * ch + ch / 2 + 4, "text-anchor": "middle", style: "fill:#fff;font:700 " + (cw < 24 ? 8 : 10) + "px system-ui,sans-serif" }, list.length > 1 ? "×" + list.length : list[0]);
        PV.hover(c, r, "<b>slot " + p[0] + ", channel " + p[1] + "</b><br>" + list.join("<br>") + (clash ? "<br>two links share this cell" : ""));
      });
      out.innerHTML = "6 directed links, " + Object.keys(cellsMap).length + " cells" + (clashes ? ", <b style='color:var(--ds-bad)'>" + clashes + " shared</b> (hash collision)" : ", no collisions") +
        ". Each sender's Tx cell is exactly its neighbour's Rx cell, with no 6P negotiation.";
    }
    lenSel.addEventListener("input", draw);
    draw();
  })();

  /* ---------- 5. cell cost (Eqs. 4–8, Table 1) ---------- */
  (function cost() {
    const host = $("tsch-cost");
    if (!host) return;
    const it = $("tsch-cost-it"), out = $("tsch-cost-out");
    const DT = 0.015, LS = 51;
    function draw() {
      const I = +it.value, C = Math.ceil(DT * LS / I - 1e-9);
      $("tsch-cost-it-out").textContent = I.toFixed(2) + " s";
      /* Table 1 gives Cs = 296 (omni) and 240 (steerable) cells per unit C, and Ca = 80 autonomous cells */
      const omni = 296 * C, steer = 240 * C + 80, ratio = steer / omni;
      const W = 470, H = 200, L = 120, R = 440, T = 16;
      const c = PV.svg(host, W, H, "Required cells, omni versus steerable"), g = c.svg;
      const max = Math.max(omni, steer), nk = PV.nice(max, 4), x = PV.linear(0, nk.max, L, R);
      for (let v = 0; v <= nk.max; v += nk.step) { PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + 120, class: v ? "gl" : "ax" }); PV.el(g, "text", { x: x(v), y: T + 136, "text-anchor": "middle", class: "tk" }, v); }
      [["Omni", omni, 0], ["Steerable (SAA6)", 240 * C, 80]].forEach(function (r, i) {
        const y = T + 20 + i * 52;
        PV.el(g, "text", { x: L - 8, y: y + 18, "text-anchor": "end", class: "tt" }, r[0]);
        PV.hbar(g, x(0), y, x(r[1]) - x(0), 28, "mk", i ? "var(--pv-s2)" : "var(--pv-s1)");
        if (r[2]) PV.hbar(g, x(r[1]) + 2, y, x(r[1] + r[2]) - x(r[1]) - 2, 28, "mk", "color-mix(in srgb, var(--pv-s2) 45%, var(--ds-bg))");
        PV.el(g, "text", { x: x(r[1] + r[2]) + 6, y: y + 18, class: "vl" }, (r[1] + r[2]) + (r[2] ? " (" + r[1] + " + " + r[2] + ")" : ""));
      });
      PV.el(g, "text", { x: L, y: H - 4, class: "tk" }, "cells (Cs; light part: autonomous Ca)");
      out.innerHTML =
        "<tr><td>Tx cells per node C = ⌈D<sub>t</sub>·L<sub>s</sub> / I<sub>t</sub>⌉</td><td class='num'><b>" + C + "</b></td></tr>" +
        "<tr><td>C<sub>t</sub><sup>steer</sup> / C<sub>t</sub><sup>omni</sup></td><td class='num'><b style='color:" + (ratio < 1 ? "var(--ds-good)" : "var(--ds-bad)") + "'>" + ratio.toFixed(2) + "</b></td></tr>";
    }
    it.addEventListener("input", draw);
    draw();
  })();

  /* ---------- 6. Fig. 6 viewer ---------- */
  (function results() {
    const img = $("tsch-f6-img");
    if (!img) return;
    const note = $("tsch-f6-note");
    const N = {
      a: "<b>Synchronization latency.</b> Time until the whole network is synchronized grows with size. Pure steerable antennas are much slower (narrow coverage during discovery); SAA6 stays close to omni by repeating control frames in autonomous cells.",
      b: "<b>Shared-cell collisions.</b> Denser networks (shorter distance) collide more. Steerable antennas cut shared-cell collisions by more than 20% without tuning the EB interval.",
      c: "<b>PDR vs transmission interval</b> (4 channels). Short intervals run out of cells; SAA6 delivers up to about 30 percentage points more packets (≈ 95% vs 65% at 3 s) thanks to spatial separation.",
      d: "<b>PDR vs channels</b> (3 s interval). With few channels, cells reuse channel offsets and interfere; direction acts as a third scheduling dimension. With a single channel SAA6 still delivers about 76% vs 33% for omni.",
      e: "<b>Energy.</b> Lower receive probability means more retransmissions; the longer range of SAA6 lowers energy by about 8% at 100% and about 13% at 70% receive probability in Fig. 6(e)."
    };
    PV.seg($("tsch-f6-v"), function (v) { img.src = "img/tsch/f6" + v + ".webp"; img.alt = "Figure 6(" + v + ")"; note.innerHTML = N[v]; });
    ["a", "b", "c", "d", "e"].forEach(function (k) { new Image().src = "img/tsch/f6" + k + ".webp"; });
  })();
})();
