# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Why Is the Grass Wet?',
    'problem': ('The grass is wet in the morning: did it rain, or did the sprinkler run? Click a node in the four-variable Bayesian network '
                'to set evidence (yes / no / unknown); the other nodes are updated by exact probability calculation.'),
    'html': '''
<svg viewBox="0 0 390 276" width="390" height="276" role="img" aria-label="Bayesian network of cloudy, sprinkler, rain and wet grass"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-o="0">Clear evidence</button><button type="button" data-o="1">Grass wet</button><button type="button" data-o="2">Grass wet + sprinkler on</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var AD = ["Cloudy", "Sprinkler", "Rain", "Wet grass"];
  var POS = [[195, 34], [88, 132], [302, 132], [195, 232]];
  var BW = 150, BH = 58;
  var KANIT = [null, null, null, null];
  function f(v, d) { return v.toFixed(d); }
  function ortak(c, s, r, w) {
    var pc = 0.5, ps = c ? 0.1 : 0.5, pr = c ? 0.8 : 0.2;
    var pw = s && r ? 0.99 : s || r ? 0.9 : 0;
    return (c ? pc : 1 - pc) * (s ? ps : 1 - ps) * (r ? pr : 1 - pr) * (w ? pw : 1 - pw);
  }
  function sorgula(kanit) {
    var top = 0, pay = [0, 0, 0, 0], sayi = 0;
    for (var m = 0; m < 16; m++) {
      var v = [m & 1, (m >> 1) & 1, (m >> 2) & 1, (m >> 3) & 1], uy = true;
      for (var i = 0; i < 4; i++) if (kanit[i] !== null && kanit[i] !== v[i]) uy = false;
      if (!uy) continue;
      sayi++;
      var p = ortak(v[0], v[1], v[2], v[3]);
      top += p;
      for (var j = 0; j < 4; j++) if (v[j]) pay[j] += p;
    }
    return { p: pay.map(function (x) { return top ? x / top : 0; }), ez: top, n: sayi };
  }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function ok(a, b) {
    var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    var t1 = Math.min(BW / 2 / Math.abs(ux || 1e-9), BH / 2 / Math.abs(uy || 1e-9)) + 2;
    var x1 = a[0] + ux * t1, y1 = a[1] + uy * t1, x2 = b[0] - ux * t1, y2 = b[1] - uy * t1;
    svg.appendChild(mk("path", { d: "M" + x1 + " " + y1 + " L" + x2 + " " + y2, "class": "line" }));
    var h = mk("path", { d: "M" + x2 + " " + y2 + " L" + (x2 - ux * 9 - uy * 5) + " " + (y2 - uy * 9 + ux * 5) + " L" + (x2 - ux * 9 + uy * 5) + " " + (y2 - uy * 9 - ux * 5) + " Z" });
    h.style.fill = "var(--ds-text)"; svg.appendChild(h);
  }
  function ciz() {
    var q = sorgula(KANIT);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    ok(POS[0], POS[1]); ok(POS[0], POS[2]); ok(POS[1], POS[3]); ok(POS[2], POS[3]);
    AD.forEach(function (a, i) {
      var p = POS[i], g = mk("g", {}), x = p[0] - BW / 2, y = p[1] - BH / 2, k = KANIT[i];
      var r = mk("rect", { x: x, y: y, width: BW, height: BH, rx: 9 });
      r.style.fill = k === null ? "var(--ds-bg)" : "color-mix(in srgb, var(--ds-link) 22%, var(--ds-bg))";
      r.style.stroke = k === null ? "var(--ds-border)" : "var(--ds-link)"; r.style.strokeWidth = k === null ? 1.5 : 2.5;
      g.appendChild(r);
      g.appendChild(mk("text", { x: x + 10, y: y + 20, "class": "txt" }, a));
      var et = mk("text", { x: x + BW - 10, y: y + 19, "text-anchor": "end", "class": "lbl" }, k === null ? "unknown" : k ? "evidence: yes" : "evidence: no");
      if (k !== null) { et.style.fill = "var(--ds-link)"; et.style.fontWeight = 700; }
      g.appendChild(et);
      var bg = mk("rect", { x: x + 10, y: y + 32, width: BW - 72, height: 14, rx: 3 });
      bg.style.fill = "color-mix(in srgb, var(--ds-muted) 20%, var(--ds-bg))"; g.appendChild(bg);
      var bar = mk("rect", { x: x + 10, y: y + 32, width: (BW - 72) * q.p[i], height: 14, rx: 3 });
      bar.style.fill = i === 2 ? "var(--ds-accent)" : "#e9a23b"; g.appendChild(bar);
      g.appendChild(mk("text", { x: x + BW - 10, y: y + 44, "text-anchor": "end", "class": "lbl" }, f(100 * q.p[i], 1) + "%"));
      g.style.cursor = "pointer";
      g.addEventListener("click", function () { KANIT[i] = KANIT[i] === null ? 1 : KANIT[i] === 1 ? 0 : null; ciz(); });
      svg.appendChild(g);
    });
    var ks = [];
    KANIT.forEach(function (k, i) { if (k !== null) ks.push(AD[i] + " = " + (k ? "yes" : "no")); });
    outs[0].innerHTML = "Evidence: " + (ks.length ? ks.join(", ") : "none") + "<br>P(Rain | evidence) = <b>" + f(100 * q.p[2], 1) + "%</b><br>P(Sprinkler | evidence) = " +
      f(100 * q.p[1], 1) + "%<br>Summed " + q.n + " of 16 states consistent with it · P(evidence) = " + f(q.ez, 3);
    if (KANIT[1] !== null && KANIT[2] === null) {
      var k2 = KANIT.slice(); k2[1] = null;
      var o = sorgula(k2).p[2];
      outs[1].innerHTML = "Without the sprinkler evidence P(Rain) = " + f(100 * o, 1) + "%; with it " + f(100 * q.p[2], 1) + "%. " +
        (KANIT[3] === 1 && KANIT[1] === 1 ? "The sprinkler already explains the wet grass: rain is <b>explained away</b>." : "One node changed belief in another through the network.");
    } else {
      outs[1].innerHTML = "Arrows point along causes, but inference flows both ways: back from wet grass to rain and clouds. First make the grass wet, then turn the sprinkler on.";
    }
  }
  var ORN = [[null, null, null, null], [null, null, null, 1], [null, 1, null, 1]];
  root.querySelectorAll("[data-o]").forEach(function (b) {
    b.addEventListener("click", function () { KANIT = ORN[+b.dataset.o].slice(); ciz(); });
  });
  KANIT = [null, null, null, 1];
  ciz();
''',
    'not': ('The 16 joint states of the four variables are not stored as a table; the network keeps only <b>local conditional probabilities</b>. '
            'When evidence arrives, enumeration computes the requested posterior from these small tables.'),
}
