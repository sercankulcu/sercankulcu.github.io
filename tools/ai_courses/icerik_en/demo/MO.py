# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Should We Grant the Loan?',
    'problem': ('The bank knows the income, debt ratio and repayment outcome of past applications. '
                'Click the chart to add a new application; the model decides by looking at the <b>k</b> most similar past ones.'),
    'html': '''
<svg viewBox="0 0 390 290" width="390" height="290" role="img" aria-label="Applications by income and debt ratio"></svg>
<div class="ai-side">
  <label>Neighbors k = <b class="ai-k">5</b></label>
  <input type="range" min="1" max="15" step="2" value="5" aria-label="Number of neighbors">
  <div class="ai-ctl"><button type="button" class="is-on" data-b="1">Show decision regions</button></div>
  <div class="ai-out">Click somewhere on the chart.</div>
  <div class="ai-out" style="font-size:13px"><span style="color:var(--ds-good);font-weight:700">●</span> repaid &nbsp; <span style="color:var(--ds-bad);font-weight:700">●</span> defaulted. With k = 1, see how the regions split around single examples: that is <b>overfitting</b>.</div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), out = root.querySelectorAll(".ai-out")[0];
  var range = root.querySelector("input"), kEl = root.querySelector(".ai-k"), bBtn = root.querySelector("[data-b]");
  var X0 = 42, Y0 = 10, PW = 336, PH = 244;
  var tohum = 7;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function gauss() { return (rnd() + rnd() + rnd() - 1.5) / 1.5; }
  var veri = [];
  for (var i = 0; i < 34; i++) veri.push([0.62 + 0.2 * gauss(), 0.32 + 0.18 * gauss(), 1]);
  for (var j = 0; j < 30; j++) veri.push([0.35 + 0.2 * gauss(), 0.66 + 0.18 * gauss(), 0]);
  veri.push([0.3, 0.3, 0]); veri.push([0.72, 0.7, 1]); veri.push([0.55, 0.5, 0]);
  veri = veri.map(function (p) { return [Math.min(0.97, Math.max(0.03, p[0])), Math.min(0.97, Math.max(0.03, p[1])), p[2]]; });
  var sorgu = null, bolge = true;
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function px(v) { return X0 + v * PW; }
  function py(v) { return Y0 + (1 - v) * PH; }
  function komsular(q, k) {
    return veri.map(function (p) { return [Math.hypot(p[0] - q[0], p[1] - q[1]), p]; })
      .sort(function (a, b) { return a[0] - b[0]; }).slice(0, k).map(function (x) { return x[1]; });
  }
  function tahmin(q, k) { var n = komsular(q, k), s = 0; n.forEach(function (p) { s += p[2]; }); return [s, n.length - s, n]; }
  function ciz() {
    var k = +range.value;
    kEl.textContent = k;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (bolge) {
      var G = 24;
      for (var gx = 0; gx < G; gx++) for (var gy = 0; gy < G; gy++) {
        var t = tahmin([(gx + 0.5) / G, (gy + 0.5) / G], k);
        var r = mk("rect", { x: px(gx / G), y: py((gy + 1) / G), width: PW / G + 0.5, height: PH / G + 0.5 });
        r.style.fill = t[0] > t[1] ? "var(--ds-good)" : "var(--ds-bad)";
        r.style.opacity = 0.13;
        svg.appendChild(r);
      }
    }
    svg.appendChild(mk("path", { d: "M" + X0 + " " + Y0 + " V" + (Y0 + PH) + " H" + (X0 + PW), "class": "axis" }));
    svg.appendChild(mk("text", { x: X0 + PW / 2, y: Y0 + PH + 30, "text-anchor": "middle", "class": "lbl" }, "Income →"));
    svg.appendChild(mk("text", { x: 14, y: Y0 + PH / 2, "text-anchor": "middle", "class": "lbl", transform: "rotate(-90 14 " + (Y0 + PH / 2) + ")" }, "Debt ratio →"));
    var t2 = sorgu ? tahmin(sorgu, k) : null;
    if (t2) t2[2].forEach(function (p) { svg.appendChild(mk("path", { d: "M" + px(sorgu[0]) + " " + py(sorgu[1]) + " L" + px(p[0]) + " " + py(p[1]), "class": "line", "stroke-dasharray": "3 3" })); });
    veri.forEach(function (p) {
      var c = mk("circle", { cx: px(p[0]), cy: py(p[1]), r: 4.5 });
      c.style.fill = p[2] ? "var(--ds-good)" : "var(--ds-bad)";
      c.style.stroke = "var(--ds-bg)"; c.style.strokeWidth = 1.2;
      svg.appendChild(c);
    });
    if (sorgu) {
      var q = mk("rect", { x: px(sorgu[0]) - 7, y: py(sorgu[1]) - 7, width: 14, height: 14, rx: 3 });
      q.style.fill = "var(--ds-bg)"; q.style.stroke = "var(--ds-text)"; q.style.strokeWidth = 2.5;
      svg.appendChild(q);
      var ver = t2[0] > t2[1];
      out.innerHTML = "k = " + k + ": of the " + k + " nearest applications, " + t2[0] + " repaid and " + t2[1] + " defaulted.<br>Decision: <b>" +
        (ver ? "grant the loan" : "decline the loan") + "</b> (majority vote).";
    }
  }
  svg.addEventListener("click", function (ev) {
    var b = svg.getBoundingClientRect();
    var vx = (ev.clientX - b.left) / b.width * 390, vy = (ev.clientY - b.top) / b.height * 290;
    var x = (vx - X0) / PW, y = 1 - (vy - Y0) / PH;
    if (x < 0 || x > 1 || y < 0 || y > 1) return;
    sorgu = [x, y]; ciz();
  });
  range.addEventListener("input", ciz);
  bBtn.addEventListener("click", function () { bolge = !bolge; bBtn.classList.toggle("is-on", bolge); ciz(); });
  sorgu = [0.5, 0.5];
  ciz();
''',
    'not': ('Nobody wrote the rule: the decision comes entirely from <b>examples</b>. With a small k the model memorizes noise, '
            'with a large k it misses detail; the right k is chosen on held-out test data.'),
}
