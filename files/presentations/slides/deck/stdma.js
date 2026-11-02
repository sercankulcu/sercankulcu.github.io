/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Enabling space time division multiple access in IETF 6TiSCH protocol" (Turk J Elec Eng & Comp Sci 27(6), 2019):
   interactive slides. Network-size results come from Table 2 of the paper; the scheduler playground is a simplified
   greedy illustration of the time × channel × antenna idea and says so on its slide. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };

  /* ---------- 1. space time scheduler playground on the 9-node tree of Fig. 3 ---------- */
  (function playground() {
    const host = $("st-sched"), net = $("st-net");
    if (!host) return;
    const out = $("st-out");
    /* grid units of 40 m; interference reaches 100 m = 2.5 units (Table 1) */
    const POS = { 1: [0, 0], 2: [-1, 1], 3: [1, 1], 4: [-1, 2], 5: [1, 2], 6: [-1, 3], 7: [1, 3], 8: [-1, 4], 9: [1, 4] };
    const PARENT = { 2: 1, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7 };
    const RINT = 2.5;
    function dist(a, b) { return Math.hypot(POS[a][0] - POS[b][0], POS[a][1] - POS[b][1]); }
    function bearing(a, b) { return (Math.atan2(POS[b][0] - POS[a][0], -(POS[b][1] - POS[a][1])) * 180 / Math.PI + 360) % 360; }
    /* antenna k of A antennas covers [k·360/A − 180/A, k·360/A + 180/A); antenna 0 faces the root (north) */
    function sector(a, b, A) { if (A === 1) return 0; const w = 360 / A; return Math.floor(((bearing(a, b) + w / 2) % 360) / w); }
    function hears(rx, rxAnt, tx, txTarget, A) {
      /* does the transmission tx → txTarget reach node rx while rx listens on antenna rxAnt? */
      if (rx === tx || dist(tx, rx) > RINT) return false;
      if (A === 1) return true;
      return sector(tx, rx, A) === sector(tx, txTarget, A) && sector(rx, tx, A) === rxAnt;
    }
    function schedule(A, C) {
      const queue = {};
      Object.keys(PARENT).forEach(function (n) { queue[n] = [+n]; });
      const slots = [];
      let left = 0;
      Object.keys(PARENT).forEach(function (n) { let k = +n; while (k !== 1) { left++; k = PARENT[k]; } });
      let guard = 0;
      while (left > 0 && guard++ < 200) {
        const tx = [], busy = {};
        /* deepest nodes first, so long paths start early */
        const order = Object.keys(PARENT).map(Number).sort(function (a, b) { return POS[b][1] - POS[a][1] || a - b; });
        order.forEach(function (n) {
          if (!queue[n].length || busy[n]) return;
          const p = PARENT[n];
          if (busy[p]) return;
          for (let c = 0; c < C; c++) {
            const pa = sector(p, n, A);
            const ok = tx.every(function (t) {
              if (t.c !== c) return true;
              /* the new transmission must not be heard by an existing receiver, and vice versa */
              return !hears(t.to, t.ant, n, p, A) && !hears(p, pa, t.from, t.to, A);
            });
            if (ok) { tx.push({ from: n, to: p, c: c, ant: pa }); busy[n] = busy[p] = 1; break; }
          }
        });
        tx.forEach(function (t) { queue[t.from].shift(); if (t.to !== 1) queue[t.to].push(1); left--; });
        slots.push(tx);
      }
      return slots;
    }
    function drawNet(A, slot) {
      const S = 200, sc = 36, ox = 100, oy = 22;
      const c = PV.svg(net, S, S, "Nine-node tree rooted at node 1"), g = c.svg;
      Object.keys(PARENT).forEach(function (n) {
        const a = POS[n], b = POS[PARENT[n]];
        PV.el(g, "line", { x1: ox + a[0] * sc * 1.6, y1: oy + a[1] * sc, x2: ox + b[0] * sc * 1.6, y2: oy + b[1] * sc, stroke: "var(--ds-border)", "stroke-width": 1.5 });
      });
      (slot || []).forEach(function (t) {
        const a = POS[t.from], b = POS[t.to];
        PV.el(g, "line", { x1: ox + a[0] * sc * 1.6, y1: oy + a[1] * sc, x2: ox + b[0] * sc * 1.6, y2: oy + b[1] * sc, stroke: ["var(--pv-s1)", "var(--pv-s2)", "#1baf7a", "#6250d6"][t.c], "stroke-width": 4 });
      });
      Object.keys(POS).forEach(function (n) {
        const p = POS[n];
        PV.el(g, "circle", { cx: ox + p[0] * sc * 1.6, cy: oy + p[1] * sc, r: 10, fill: n === "1" ? "var(--ds-text)" : "var(--ds-bg)", stroke: "var(--ds-text)", "stroke-width": 1.5 });
        PV.el(g, "text", { x: ox + p[0] * sc * 1.6, y: oy + p[1] * sc + 4, "text-anchor": "middle", style: "font:700 11px system-ui,sans-serif;fill:" + (n === "1" ? "var(--ds-bg)" : "var(--ds-text)") }, n);
      });
    }
    const cur = { A: 1, C: 2 };
    function draw() {
      const A = cur.A, C = cur.C;
      const slots = schedule(A, C);
      /* one row per (channel, parallel transmission on that channel): spatial reuse shows up as extra rows */
      let per = 1;
      slots.forEach(function (tx) { for (let ch = 0; ch < C; ch++) per = Math.max(per, tx.filter(function (t) { return t.c === ch; }).length); });
      const L = 40, cw = Math.min(46, 460 / slots.length), W = L + slots.length * cw + 6, rh = 22, T = 18;
      const rows = C * per, H = T + rows * rh + 6;
      const c = PV.svg(host, W, H, "Slotframe needed to deliver one packet from every node"), g = c.svg;
      for (let s = 0; s < slots.length; s++) PV.el(g, "text", { x: L + s * cw + cw / 2, y: 12, "text-anchor": "middle", class: "tk" }, s + 1);
      for (let ch = 0; ch < C; ch++) PV.el(g, "text", { x: L - 6, y: T + ch * per * rh + 13, "text-anchor": "end", class: "tk" }, "ch " + (ch + 1));
      slots.forEach(function (tx, s) {
        const k = {};
        tx.forEach(function (t) {
          const r = t.c * per + (k[t.c] || 0);
          k[t.c] = (k[t.c] || 0) + 1;
          const yy = T + r * rh;
          const col = ["var(--pv-s1)", "var(--pv-s2)", "#1baf7a", "#6250d6"][t.c];
          PV.el(g, "rect", { x: L + s * cw + 1, y: yy + 1, width: cw - 2, height: rh - 2, rx: 3, fill: col });
          PV.el(g, "text", { x: L + s * cw + cw / 2, y: yy + 15, "text-anchor": "middle", style: "fill:#fff;font:700 " + (cw < 30 ? 9 : 11) + "px system-ui,sans-serif;pointer-events:none" }, t.from + "→" + t.to);
        });
        const col = PV.el(g, "rect", { x: L + s * cw, y: T, width: cw, height: rows * rh, fill: "transparent" });
        col.addEventListener("mouseenter", function () { drawNet(A, tx); });
      });
      for (let ch = 0; ch <= C; ch++) PV.el(g, "line", { x1: L, x2: L + slots.length * cw, y1: T + ch * per * rh, y2: T + ch * per * rh, class: "ax" });
      drawNet(A, slots[0]);
      const omni = schedule(1, C).length, three = schedule(3, C).length;
      out.innerHTML = "<b>" + slots.length + " slots</b> to deliver one packet from each of the 8 nodes (20 hop transmissions) with " + A + " antenna" + (A > 1 ? "s" : "") + " and " + C + " channel" + (C > 1 ? "s" : "") + ". " +
        "Same channels: omni needs " + omni + ", three antennas " + three + ". Hover a slot to see who transmits.";
    }
    PV.seg($("st-ant"), function (v) { cur.A = +v; draw(); });
    PV.seg($("st-ch"), function (v) { cur.C = +v; draw(); });
  })();

  /* ---------- 2. capacity gain factor 2π / √(αβ) ---------- */
  (function capacity() {
    const a = $("st-cap-a"), b = $("st-cap-b"), out = $("st-cap-out");
    if (!a) return;
    function draw() {
      const A = +a.value, B = +b.value;
      $("st-cap-a-out").textContent = A + "°"; $("st-cap-b-out").textContent = B + "°";
      const f = 360 / Math.sqrt(A * B);
      out.innerHTML = "Capacity can grow by a factor of <b>" + f.toFixed(2) + "×</b> " + (A === 180 && B === 180 ? "(two 180° antennas)" : A === 120 && B === 120 ? "(three 120° antennas)" : "") + ". Omni-directional limit (Gupta–Kumar): per-node throughput Θ(1/√(n log n)) in random networks.";
    }
    [a, b].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 3. Table 2: PRR, delay and energy by network size ---------- */
  (function size() {
    const host = $("st-size");
    if (!host) return;
    const D = {
      25: [[94.87, 1267, 3.21], [97.94, 595, 1.55], [100, 536, 1.26]],
      49: [[83.55, 1560, 3.65], [87.61, 1174, 1.82], [88.77, 1094, 1.49]],
      73: [[61.04, 2254, 4.09], [63.49, 1594, 1.89], [66.74, 1544, 1.65]]
    };
    const M = { prr: [0, "PRR (%)", 100, 20, 2], delay: [1, "Delay (ms)", 2500, 500, 0], energy: [2, "Energy (mWh)", 5, 1, 2] };
    const COL = ["var(--pv-base)", "var(--pv-s1)", "var(--pv-s2)"];
    PV.seg($("st-size-m"), function (k) {
      const m = M[k], cats = ["25", "49", "73"];
      const W = 720, H = 236, L = 56, R = 700, T = 30, B = 200;
      const c = PV.svg(host, W, H, m[1] + " by network size and antenna count"), g = c.svg;
      const y = PV.linear(0, m[2], B, T);
      for (let v = 0; v <= m[2] + 1e-9; v += m[3]) { PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" }); PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v); }
      PV.el(g, "text", { x: L, y: 12, class: "tk" }, m[1] + " · 4 channels, 1 packet/s, 100% link success");
      const band = (R - L) / 3, bw = 58;
      cats.forEach(function (n, i) {
        [0, 1, 2].forEach(function (a) {
          const v = D[n][a][m[0]], bx = L + band * i + band / 2 - 1.5 * bw - 2 + a * (bw + 2);
          PV.vbar(g, bx, B, bw, B - y(v), "mk", COL[a]);
          PV.el(g, "text", { x: bx + bw / 2, y: y(v) - 5, "text-anchor": "middle", class: "vl" }, v.toFixed(m[4]));
          const hit = PV.el(g, "rect", { x: bx, y: T, width: bw, height: B - T, class: "hit", "aria-label": n + " nodes, " + (a + 1) + " antennas" });
          const r = D[n][a];
          PV.hover(c, hit, "<b>" + n + " nodes · " + (a + 1) + " antenna" + (a ? "s" : "") + "</b><br>PRR " + r[0] + "%<br>delay " + r[1] + " ms<br>energy " + r[2] + " mWh");
        });
        PV.el(g, "text", { x: L + band * i + band / 2, y: B + 20, "text-anchor": "middle", class: "tt" }, n + " nodes");
      });
    });
  })();

  /* ---------- 4. figure viewers ---------- */
  function viewer(segId, imgId, noteId, notes) {
    const img = $(imgId);
    if (!img) return;
    PV.seg($(segId), function (v) { img.src = "img/stdma/" + v + ".webp"; img.alt = notes[v][0]; $(noteId).innerHTML = notes[v][1]; });
    Object.keys(notes).forEach(function (k) { new Image().src = "img/stdma/" + k + ".webp"; });
  }
  viewer("st-f6-v", "st-f6-img", "st-f6-note", {
    fig6a: ["PRR under 100% link success", "<b>100% link success.</b> With 1 channel the single antenna collapses to under 20% PRR at 2 packets/s, while 2–3 antennas keep far more. With 4 channels the antennas still help at high rates."],
    fig6b: ["PRR under 80% link success", "<b>80% link success.</b> Retransmissions add traffic and collisions, so directional antennas matter even more; the gain reaches up to 100% PRR improvement."],
    fig7a: ["Delay of SF-DA", "<b>Delay.</b> More antennas mean more parallel transmissions and shorter queues, so the mean delay drops at every traffic level."],
    fig7b: ["Energy of SF-DA", "<b>Energy.</b> A 180° antenna needs half the transmit power of omni for the same range; fewer collisions mean fewer retransmissions. The saving grows as links get worse."]
  });
})();
