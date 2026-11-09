/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Improving Synchronization Time in 6TiSCH Networks with Smart Antennas" (SIU 2022): interactive slides.
   The link-budget and beam-alignment labs evaluate Eq. (1) with the paper's parameters and a smooth
   pattern through the three gains of Fig. 1; the result charts use values read from the vector plots
   of Figs. 3 and 4. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };
  const DEG = Math.PI / 180;
  /* Eq. (1): P_TX = 0 dBm, P_PL = -40 dB, K = 2.5, d0 = 1 m */
  function rss(d, g1, g2) { return 0 - 40 - 25 * Math.log10(Math.max(1, d)) + g1 + g2; }
  /* receiver threshold implied by the 50 m range of an omnidirectional link (Table I) */
  const TH = rss(50, 0, 0);
  /* 5 dBi at boresight, -5 dBi at ±90°, -15 dBi behind (Fig. 1) */
  function gain(a) { return -5 + 10 * Math.cos(a); }
  function range(g) { return Math.pow(10, (-40 - TH + g) / 25); }

  /* ---------- 1. antenna pattern and link budget ---------- */
  (function link() {
    const host = $("sy-link");
    if (!host) return;
    const sa = $("sy-a"), sb = $("sy-b"), sd = $("sy-d"), out = $("sy-link-out");
    function draw() {
      const a = +sa.value, b = +sb.value, d = +sd.value;
      $("sy-a-out").textContent = a + "°";
      $("sy-b-out").textContent = b + "°";
      $("sy-d-out").textContent = d + " m";
      const ga = gain(a * DEG), gb = gain(b * DEG), r = rss(d, ga, gb), ro = rss(d, 0, 0);
      const W = 720, H = 200;
      const c = PV.svg(host, W, H, "Antenna pattern and link between two nodes");
      const g = c.svg;
      /* polar pattern of one antenna */
      const cx = 120, cy = 90, R = 82, gp = PV.linear(-20, 5, 0, R);
      [-15, -5, 5].forEach(function (v) {
        PV.el(g, "circle", { cx: cx, cy: cy, r: gp(v), fill: "none", stroke: "var(--ds-border-base)", "stroke-dasharray": "3 3" });
        PV.el(g, "text", { x: cx + 3, y: cy - gp(v) - 2, class: "tk" }, v + " dBi");
      });
      let p = "";
      for (let t = 0; t <= 360; t += 4) {
        const rr = gp(gain(t * DEG)), x = cx + rr * Math.sin(t * DEG), y = cy - rr * Math.cos(t * DEG);
        p += (t ? " L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      PV.el(g, "path", { d: p + " Z", fill: "var(--pv-s1)", "fill-opacity": 0.18, stroke: "var(--pv-s1)", "stroke-width": 2 });
      PV.el(g, "circle", { cx: cx, cy: cy, r: gp(0), fill: "none", stroke: "var(--pv-base)", "stroke-width": 1.5 });
      PV.el(g, "text", { x: cx, y: H - 4, "text-anchor": "middle", class: "tk" }, "steerable pattern (blue) vs omni 0 dBi (grey)");
      /* the two nodes, each with its beam offset from the line of sight */
      const x1 = 300, x2 = 300 + Math.min(1, d / 130) * 300, y0 = 80;
      PV.el(g, "line", { x1: x1, x2: x2, y1: y0, y2: y0, stroke: r >= TH ? "var(--pv-s1)" : "var(--ds-border-base)", "stroke-width": r >= TH ? 3 : 1.5, "stroke-dasharray": r >= TH ? "" : "5 4" });
      function node(x, off, dirSign, lab) {
        const th = (dirSign > 0 ? 0 : Math.PI) + off * DEG;
        PV.el(g, "path", { d: "M" + x + " " + y0 + " L" + (x + 40 * Math.cos(th - 0.35)).toFixed(1) + " " + (y0 + 40 * Math.sin(th - 0.35)).toFixed(1) + " A40 40 0 0 1 " + (x + 40 * Math.cos(th + 0.35)).toFixed(1) + " " + (y0 + 40 * Math.sin(th + 0.35)).toFixed(1) + " Z", fill: "var(--pv-s2)", "fill-opacity": 0.3, stroke: "var(--pv-s2)" });
        PV.el(g, "circle", { cx: x, cy: y0, r: 7, fill: "var(--ds-text)" });
        PV.el(g, "text", { x: x, y: y0 + 30, "text-anchor": "middle", class: "tt" }, lab);
      }
      node(x1, a, 1, "A");
      node(x2, -b, -1, "B");
      PV.el(g, "text", { x: (x1 + x2) / 2, y: y0 - 14, "text-anchor": "middle", class: "vl" }, d + " m");
      PV.el(g, "text", { x: 300, y: 140, class: "vl" }, "gain A " + ga.toFixed(1) + " dBi + gain B " + gb.toFixed(1) + " dBi");
      PV.el(g, "text", { x: 300, y: 160, class: "tt" }, "RSS " + r.toFixed(1) + " dBm  (omni: " + ro.toFixed(1) + " dBm)");
      PV.el(g, "text", { x: 300, y: 180, class: "tk" }, "threshold " + TH.toFixed(1) + " dBm, the level an omni link reaches at 50 m");
      out.innerHTML = (r >= TH ? "<b>Link up.</b> " : "<b>Link down.</b> ") +
        "With these beam angles the pair reaches " + range(ga + gb).toFixed(0) + " m (omni: 50 m). " +
        (a === 0 && b === 0 ? "Both beams aligned: the longest reach." : a >= 150 && b >= 150 ? "Both nodes face away: strong protection from this direction." : "");
    }
    [sa, sb, sd].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 2. chance that one beacon meets one listener ---------- */
  (function align() {
    const host = $("sy-al");
    if (!host) return;
    const sd = $("sy-al-d"), sn = $("sy-al-n"), out = $("sy-al-out");
    /* fraction of (transmit angle, receive angle) pairs with RSS above the threshold */
    function frac(d, txFixed, rxFixed) {
      const S = 180;
      let ok = 0, n = 0;
      for (let i = 0; i < (txFixed ? 1 : S); i++) for (let j = 0; j < (rxFixed ? 1 : S); j++) {
        const t = txFixed ? 0 : (i + 0.5) / S * 2 * Math.PI, r = rxFixed ? 0 : (j + 0.5) / S * 2 * Math.PI;
        n++;
        if (rss(d, gain(t), gain(r)) >= TH) ok++;
      }
      return ok / n;
    }
    function draw() {
      const d = +sd.value, k = +sn.value;
      $("sy-al-d-out").textContent = d + " m";
      $("sy-al-n-out").textContent = k;
      /* Algorithm 2: a random direction with probability 1/(k+1), otherwise one of the k listed neighbours,
         so each side points exactly at the other with probability a = 1/(k+1); any other choice is treated
         as a random angle */
      const a = 1 / (k + 1);
      const rr = frac(d, false, false), fr = frac(d, true, false), ff = frac(d, true, true);
      const awareFixed = a * a * ff + 2 * a * (1 - a) * fr + (1 - a) * (1 - a) * rr;
      const rows = [
        { k: "Omnidirectional", v: d <= 50 ? 1 : 0, col: "var(--pv-base)" },
        { k: "Steerable, random directions", v: rr, col: "var(--pv-s2)" },
        { k: "Steerable, neighbour-aware", v: awareFixed, col: "var(--pv-s1)" }
      ];
      const W = 720, rowH = 46, L = 220, R = 640, T = 6, H = T + rowH * 3 + 24;
      const c = PV.svg(host, W, H, "Probability that one beacon reaches one listener");
      const g = c.svg, x = PV.linear(0, 1, L, R);
      for (let v = 0; v <= 1.0001; v += 0.25) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * 3, class: "gl" });
        PV.el(g, "text", { x: x(v), y: T + rowH * 3 + 16, "text-anchor": "middle", class: "tk" }, Math.round(v * 100) + "%");
      }
      rows.forEach(function (r, i) {
        const y = T + rowH * i + 10;
        PV.el(g, "text", { x: L - 10, y: y + 17, "text-anchor": "end", class: "tt" }, r.k);
        PV.hbar(g, x(0), y, Math.max(1, x(r.v) - x(0)), 26, "mk", r.col);
        PV.el(g, "text", { x: x(r.v) + 6, y: y + 18, class: "vl" }, (r.v * 100).toFixed(1) + "%");
      });
      out.innerHTML = d > range(10) ? "Beyond about 126 m even two aligned beams cannot close the link." :
        d > 50 ? "Beyond 50 m only steerable antennas can connect, and only when the beams point at each other: knowing the neighbour's direction pays off." :
          awareFixed > rr ? "Pointing at known neighbours raises the chance " + (awareFixed / Math.max(rr, 1e-9)).toFixed(1) + "× over random directions." :
            "Both choices give the same chance here.";
    }
    [sd, sn].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 3. Figs. 3 and 4: synchronization time against network size ---------- */
  const NODES = [25, 35, 45, 55, 65, 75];
  function lines(host, series, ymax, label, legendHost) {
    const on = series.map(function () { return true; });
    function draw() {
      const W = 720, H = 260, L = 50, R = 700, T = 10, B = 226;
      const c = PV.svg(host, W, H, label);
      const g = c.svg;
      const x = PV.linear(25, 75, L + 10, R - 10), y = PV.linear(0, ymax, B, T);
      const step = ymax / 5;
      for (let v = 0; v <= ymax + 1e-9; v += step) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
        PV.el(g, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v);
      }
      NODES.forEach(function (n) { PV.el(g, "text", { x: x(n), y: B + 16, "text-anchor": "middle", class: "tk" }, n); });
      PV.el(g, "text", { x: (L + R) / 2, y: H - 2, "text-anchor": "middle", class: "tk" }, "number of nodes · y: minutes until the network is synchronized");
      series.forEach(function (s, i) {
        if (!on[i]) return;
        const d = s.v.map(function (v, k) { return (k ? "L" : "M") + x(NODES[k]).toFixed(1) + " " + y(v).toFixed(1); }).join(" ");
        PV.el(g, "path", { d: d, fill: "none", stroke: s.col, "stroke-width": 2.5, "stroke-dasharray": s.dash || "" });
        s.v.forEach(function (v, k) {
          PV.el(g, "circle", { cx: x(NODES[k]), cy: y(v), r: 3.5, fill: s.col });
        });
      });
      NODES.forEach(function (n, k) {
        const hit = PV.el(g, "rect", { x: x(n) - 20, y: T, width: 40, height: B - T, class: "hit", "aria-label": n + " nodes" });
        PV.hover(c, hit, "<b>" + n + " nodes</b><br>" + series.map(function (s, i) { return on[i] ? s.k + ": " + s.v[k].toFixed(1) + " min" : ""; }).filter(Boolean).join("<br>"));
      });
    }
    series.forEach(function (s, i) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "is-on";
      legendHost.appendChild(b);
      b.innerHTML = "<i style='display:inline-block;width:14px;height:4px;margin-right:5px;border-radius:2px;vertical-align:middle;background:" + s.col + "'></i>" + s.k;
      b.addEventListener("click", function () {
        on[i] = !on[i];
        b.classList.toggle("is-on", on[i]);
        draw();
      });
    });
    draw();
  }

  (function fig3() {
    const host = $("sy-f3");
    if (!host) return;
    lines(host, [
      { k: "Omni", v: [2.41, 3.79, 3.86, 5.03, 8.43, 15.87], col: "var(--pv-base)" },
      { k: "Omni + autonomous cells", v: [1.26, 1.69, 0.84, 1.43, 1.06, 1.41], col: "var(--pv-base)", dash: "6 4" },
      { k: "Steerable", v: [4.52, 3.41, 3.99, 5.93, 7.23, 9.82], col: "var(--pv-s2)" },
      { k: "Steerable + scan packet", v: [5.85, 4.32, 3.89, 3.48, 4.80, 3.86], col: "var(--pv-s1)" },
      { k: "Steerable + autonomous cells", v: [2.15, 2.25, 1.90, 1.97, 1.71, 1.25], col: "#1baf7a", dash: "6 4" }
    ], 20, "Synchronization time with one frequency channel", $("sy-f3-leg"));
  })();

  (function fig4() {
    const host = $("sy-f4");
    if (!host) return;
    const R1 = [4.52, 3.40, 3.98, 5.91, 7.23, 9.81], R2 = [14.31, 8.30, 10.05, 10.34, 25.52, 41.89];
    const S1 = [5.85, 4.32, 3.88, 3.48, 4.79, 3.86], S2 = [12.37, 7.60, 7.18, 8.46, 14.18, 34.45];
    lines(host, [
      { k: "Random direction, 1 channel", v: R1, col: "var(--pv-s2)", dash: "6 4" },
      { k: "Random direction, 2 channels", v: R2, col: "var(--pv-s2)" },
      { k: "Scan packet, 1 channel", v: S1, col: "var(--pv-s1)", dash: "6 4" },
      { k: "Scan packet, 2 channels", v: S2, col: "var(--pv-s1)" }
    ], 50, "Synchronization time of steerable antennas with and without scan packets", $("sy-f4-leg"));
    const body = $("sy-f4-gain");
    if (body) {
      body.innerHTML = NODES.map(function (n, k) {
        const g1 = (1 - S1[k] / R1[k]) * 100, g2 = (1 - S2[k] / R2[k]) * 100;
        const f = function (v) { return "<td class='num' style='color:" + (v >= 0 ? "var(--ds-good)" : "var(--ds-bad)") + "'>" + (v >= 0 ? "−" : "+") + Math.abs(v).toFixed(0) + "%</td>"; };
        return "<tr><td class='num'>" + n + "</td>" + f(g1) + f(g2) + "</tr>";
      }).join("");
    }
  })();
})();
