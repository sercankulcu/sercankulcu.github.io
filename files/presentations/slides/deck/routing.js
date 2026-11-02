/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "A New Routing Objective Function for IETF 6TiSCH Protocol" (SIU 2022): interactive slides.
   Result values are read from the vector plots of Figs. 3–5 (marked ≈ on the slides). The topology,
   the threshold playground and the flapping simulation use made-up numbers and say so on their slides. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };
  const OF = [
    { n: "MRHOF", col: "var(--pv-base)" },
    { n: "SR1", col: "var(--pv-s1)" },
    { n: "SR2", col: "var(--pv-s2)" }
  ];
  const MRHOF_T = 0.75, MAX_LINK = 4; /* in ETX: 96 / 128 and 512 / 128, Contiki-NG defaults */

  /* switching threshold in ETX for each objective function (Algorithms 1 and 2) */
  function threshold(k, nb, cells) {
    if (k === 0) return MRHOF_T;
    if (k === 1) return nb > 1 && nb < 6 ? nb : 6;
    return nb > 1 && cells < 6 ? cells : 6;
  }
  /* returns { keep, thr, pc }: does a node with cost pref for its preferred parent keep it against cand? */
  function decide(k, pref, cand, nb, cells) {
    let pc = pref, thr = threshold(k, nb, cells);
    if (k > 0 && cells === 0) { pc = pref + MAX_LINK; thr = 0; }
    const keep = thr > 0 && pc < cand + thr && pc > cand - thr ? true : pc <= cand;
    return { keep: keep, thr: thr, pc: pc };
  }

  /* ---------- 1. Fig. 2: why a busy router should not switch ---------- */
  (function topo() {
    const host = $("rt-topo");
    if (!host) return;
    const P = { 1: [260, 26], 2: [180, 92], 3: [340, 92], 4: [260, 160], 5: [200, 226], 6: [320, 226], 7: [110, 284], 8: [260, 290], 9: [90, 150], 10: [430, 150], 11: [420, 290] };
    const E = { 2: 1, 3: 1, 9: 2, 10: 3, 5: 4, 6: 4, 7: 5, 8: 5, 11: 6 };
    const SUB = [5, 6, 7, 8, 11];
    let par = 2, busy = false;
    function draw() {
      const c = PV.svg(host, 520, 320, "Parent switching scenario of Fig. 2");
      const g = c.svg;
      const link = function (a, b, cls) {
        PV.el(g, "line", { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], stroke: cls ? "var(--pv-s2)" : "var(--ds-border-base)", "stroke-width": cls ? 3 : 1.5 });
      };
      Object.keys(E).forEach(function (k) { link(+k, E[k], busy && SUB.indexOf(+k) >= 0); });
      link(4, par, busy);
      PV.el(g, "line", { x1: P[4][0], y1: P[4][1], x2: P[par === 2 ? 3 : 2][0], y2: P[par === 2 ? 3 : 2][1], stroke: "var(--ds-border-base)", "stroke-width": 1, "stroke-dasharray": "4 4" });
      Object.keys(P).forEach(function (k) {
        const n = +k, root = n === 1, hub = n === 4, wait = busy && SUB.indexOf(n) >= 0;
        PV.el(g, "circle", { cx: P[n][0], cy: P[n][1], r: 17, fill: root ? "#1baf7a" : hub ? "var(--pv-s2)" : wait ? "var(--ds-surface-strong)" : "var(--ds-surface)", stroke: wait ? "var(--pv-s2)" : "var(--ds-text)", "stroke-width": wait ? 2.5 : 1.2 });
        PV.el(g, "text", { x: P[n][0], y: P[n][1] + 5, "text-anchor": "middle", class: "tt", style: root || hub ? "fill:#fff" : "" }, n);
      });
      $("rt-topo-note").innerHTML = busy ?
        "Node 4 switched to parent <b>" + par + "</b>. Until new 6TiSCH cells are negotiated, the traffic of nodes 5, 6, 7, 8 and 11 piles up in node 4's small buffer; overflow is dropped." :
        "Node 4 forwards the traffic of five descendants through parent <b>" + par + "</b>. Click <b>Switch parent</b>.";
    }
    $("rt-topo-btn").addEventListener("click", function () { par = par === 2 ? 3 : 2; busy = true; draw(); });
    $("rt-topo-reset").addEventListener("click", function () { busy = false; draw(); });
    draw();
  })();

  /* ---------- 2. threshold playground: keep or switch? ---------- */
  (function play() {
    const host = $("rt-play");
    if (!host) return;
    const s = { pref: $("rt-pref"), cand: $("rt-cand"), nb: $("rt-nb"), cells: $("rt-cells") };
    function draw() {
      const pref = +s.pref.value, cand = +s.cand.value, nb = +s.nb.value, cells = +s.cells.value;
      $("rt-pref-out").textContent = pref.toFixed(2) + " ETX";
      $("rt-cand-out").textContent = cand.toFixed(2) + " ETX";
      $("rt-nb-out").textContent = nb;
      $("rt-cells-out").textContent = cells;
      const W = 720, rowH = 34, L = 80, R = 640, T = 22, H = T + rowH * 3 + 22;
      const c = PV.svg(host, W, H, "Hysteresis band of each objective function");
      const g = c.svg, x = PV.linear(0, 14, L, R);
      for (let v = 0; v <= 14; v += 2) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T - 6, y2: T + rowH * 3, class: "gl" });
        PV.el(g, "text", { x: x(v), y: T + rowH * 3 + 16, "text-anchor": "middle", class: "tk" }, v);
      }
      PV.el(g, "text", { x: R + 8, y: T + rowH * 3 + 16, class: "tk" }, "path cost (ETX)");
      PV.el(g, "line", { x1: x(cand), x2: x(cand), y1: T - 10, y2: T + rowH * 3, stroke: "var(--ds-text)", "stroke-width": 2, "stroke-dasharray": "5 3" });
      PV.el(g, "text", { x: x(cand), y: T - 12, "text-anchor": "middle", class: "tt" }, "candidate");
      const rows = [];
      OF.forEach(function (o, k) {
        const d = decide(k, pref, cand, nb, cells), y = T + rowH * k + rowH / 2;
        PV.el(g, "text", { x: L - 10, y: y + 4, "text-anchor": "end", class: "tt" }, o.n);
        if (d.thr > 0) {
          const a = Math.max(0, d.pc - d.thr), b = Math.min(14, d.pc + d.thr);
          PV.el(g, "rect", { x: x(a), y: y - 9, width: Math.max(1, x(b) - x(a)), height: 18, rx: 4, fill: o.col, "fill-opacity": 0.22 });
        }
        PV.el(g, "circle", { cx: x(Math.min(14, d.pc)), cy: y, r: 7, fill: o.col, stroke: "var(--ds-bg)", "stroke-width": 2 });
        PV.el(g, "text", { x: W - 4, y: y + 4, "text-anchor": "end", class: "tt", style: "fill:" + (d.keep ? "var(--ds-text)" : "var(--pv-s2)") }, d.keep ? "keep" : "switch");
        rows.push("<tr><td>" + o.n + "</td><td class='num'>" + (k > 0 && cells === 0 ? "– (penalty +4 ETX)" : d.thr.toFixed(2) + " ETX") + "</td><td class='num'>" + d.pc.toFixed(2) + "</td><td><b>" + (d.keep ? "keep preferred parent" : "switch to candidate") + "</b></td></tr>");
      });
      $("rt-play-out").innerHTML = rows.join("");
    }
    Object.keys(s).forEach(function (k) { s[k].addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 3. flapping simulation: noisy link costs, two candidate parents ---------- */
  (function flap() {
    const host = $("rt-flap");
    if (!host) return;
    const sn = $("rt-noise"), sd = $("rt-deg"), sb = $("rt-fnb"), sc = $("rt-fcells"), out = $("rt-flap-out");
    let seed = 7;
    function draw() {
      const sigma = +sn.value / 100, deg = +sd.value, nb = +sb.value, cells = +sc.value, N = 240;
      $("rt-noise-out").textContent = sigma.toFixed(2) + " ETX";
      $("rt-deg-out").textContent = "+" + deg + " ETX";
      $("rt-fnb-out").textContent = nb;
      $("rt-fcells-out").textContent = cells;
      let st = seed;
      const rnd = function () { st = (st * 16807) % 2147483647; return st / 2147483647; };
      const gauss = function () { return Math.sqrt(-2 * Math.log(rnd() + 1e-12)) * Math.cos(2 * Math.PI * rnd()); };
      const c1 = [], c2 = [];
      let n1 = 0, n2 = 0;
      for (let t = 0; t < N; t++) {
        n1 = 0.8 * n1 + gauss() * sigma; n2 = 0.8 * n2 + gauss() * sigma;
        c1.push(Math.max(1, 2.0 + n1 + (t >= N / 2 ? deg : 0)));
        c2.push(Math.max(1, 2.2 + n2));
      }
      const res = OF.map(function (o, k) {
        let p = 0, sw = 0, extra = 0;
        const ch = [];
        for (let t = 0; t < N; t++) {
          const mine = p ? c2[t] : c1[t], other = p ? c1[t] : c2[t];
          if (!decide(k, mine, other, nb, cells).keep) { p = 1 - p; sw++; }
          ch.push(p);
          extra += (p ? c2[t] : c1[t]) - Math.min(c1[t], c2[t]);
        }
        return { ch: ch, sw: sw, extra: extra / N };
      });
      const W = 720, L = 70, R = 700, T = 6, B = 104, Hs = 14, H = B + 24 + 3 * (Hs + 5) + 2;
      const c = PV.svg(host, W, H, "Path costs of two parents and the parent chosen by each objective function");
      const g = c.svg, x = PV.linear(0, N - 1, L, R);
      const mx = Math.max(6, Math.ceil(Math.max.apply(null, c1.concat(c2))));
      const y = PV.linear(0, mx, B, T);
      for (let v = 0; v <= mx; v += 2) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
        PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v);
      }
      PV.el(g, "text", { x: 4, y: T + 10, class: "tk" }, "ETX");
      [[c1, "#1baf7a", "parent A"], [c2, "#8a5cd1", "parent B"]].forEach(function (s, j) {
        PV.el(g, "path", { d: s[0].map(function (v, t) { return (t ? "L" : "M") + x(t).toFixed(1) + " " + y(v).toFixed(1); }).join(" "), fill: "none", stroke: s[1], "stroke-width": 1.6 });
        PV.el(g, "text", { x: R - 4, y: T + 12 + j * 14, "text-anchor": "end", class: "tk", style: "fill:" + s[1] }, s[2]);
      });
      if (deg) {
        PV.el(g, "line", { x1: x(N / 2), x2: x(N / 2), y1: T, y2: B, stroke: "var(--ds-text)", "stroke-dasharray": "3 3" });
        PV.el(g, "text", { x: x(N / 2) + 4, y: T + 12, class: "tk" }, "parent A degrades");
      }
      res.forEach(function (r, k) {
        const yy = B + 20 + k * (Hs + 5);
        PV.el(g, "text", { x: L - 8, y: yy + 11, "text-anchor": "end", class: "tt" }, OF[k].n);
        let t0 = 0;
        for (let t = 1; t <= N; t++) {
          if (t === N || r.ch[t] !== r.ch[t0]) {
            PV.el(g, "rect", { x: x(t0), y: yy, width: Math.max(1, x(t - 1) - x(t0) + (R - L) / N), height: Hs, fill: r.ch[t0] ? "#8a5cd1" : "#1baf7a", "fill-opacity": 0.75 });
            t0 = t;
          }
        }
        PV.el(g, "text", { x: R - 4, y: yy + 11, class: "tk", "text-anchor": "end", style: "fill:#fff;font-weight:700" }, r.sw);
      });
      out.innerHTML = OF.map(function (o, k) { return "<b>" + o.n + "</b>: " + res[k].sw + " switches, +" + res[k].extra.toFixed(2) + " ETX above the best path on average"; }).join(" · ");
    }
    [sn, sd, sb, sc].forEach(function (e) { e.addEventListener("input", draw); });
    $("rt-flap-seed").addEventListener("click", function () { seed = (seed * 48271) % 2147483647; draw(); });
    draw();
  })();

  /* ---------- 4. Figs. 3–5: results against the reception ratio ---------- */
  (function results() {
    const host = $("rt-res");
    if (!host) return;
    const RX = [70, 80, 90];
    const D = {
      pdr: { t: "Packet delivery ratio (%)", lo: 40, hi: 80, st: 10, d: 1, v: [[43.7, 47.9, 67.8], [50.2, 60.6, 67.3], [48.5, 53.1, 69.9]], better: "higher",
        note: "SR1 delivers the most packets in lossy links (Rx 70–80%); at Rx 90% the three functions are within about 3 points." },
      sw: { t: "Total parent switches", lo: 0, hi: 500, st: 100, d: 0, v: [[493, 354, 111], [79, 51, 48], [270, 152, 48]], better: "lower",
        note: "The largest effect: at Rx 70% SR1 switches about 84% less often than MRHOF, SR2 about 45% less." },
      dl: { t: "Mean delay per packet (ms)", lo: 0, hi: 250, st: 50, d: 0, v: [[189, 158, 88], [128, 108, 91], [133, 122, 93]], better: "lower",
        note: "Fewer switches mean less buffering: at Rx 70% delay drops by about a third. At Rx 90% MRHOF is marginally faster." }
    };
    PV.seg($("rt-res-m"), function (k) {
      const m = D[k], W = 720, H = 270, L = 60, R = 700, T = 10, B = 236;
      const c = PV.svg(host, W, H, m.t + " against the reception ratio");
      const g = c.svg, y = PV.linear(m.lo, m.hi, B, T);
      for (let v = m.lo; v <= m.hi; v += m.st) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v === m.lo ? "ax" : "gl" });
        PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v);
      }
      const gw = (R - L) / 3, bw = 46;
      RX.forEach(function (rx, i) {
        const gx = L + gw * i + gw / 2 - 1.5 * bw - 6;
        PV.el(g, "text", { x: L + gw * i + gw / 2, y: B + 18, "text-anchor": "middle", class: "tt" }, "Rx " + rx + "%");
        OF.forEach(function (o, j) {
          const v = m.v[j][i], bx = gx + j * (bw + 6);
          PV.vbar(g, bx, B, bw, B - y(Math.max(m.lo, v)), "mk", o.col);
          PV.el(g, "text", { x: bx + bw / 2, y: y(v) - 5, "text-anchor": "middle", class: "vl" }, "≈" + v.toFixed(m.d));
          const rel = j ? (v - m.v[0][i]) / m.v[0][i] * 100 : null;
          const hit = PV.el(g, "rect", { x: bx, y: T, width: bw, height: B - T, class: "hit", "aria-label": o.n + " at Rx " + rx });
          PV.hover(c, hit, "<b>" + o.n + " · Rx " + rx + "%</b><br>" + m.t + ": ≈" + v.toFixed(m.d) + (rel === null ? "" : "<br>vs MRHOF: " + (rel > 0 ? "+" : "") + rel.toFixed(0) + "% (" + m.better + " is better)"));
        });
      });
      $("rt-res-note").textContent = m.note;
    });
  })();
})();
