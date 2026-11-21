# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Does the New Recommender Work?',
    'problem': ('Does the new recommendation model raise the purchase rate? Half of the visitors see the old model (A), half the new one (B). '
                'Change the sample size and the true difference, and repeat the experiment.'),
    'html': '''
<svg viewBox="0 0 390 284" width="390" height="284" role="img" aria-label="Confidence intervals of repeated A/B experiments"></svg>
<div class="ai-side">
  <label>Visitors per group n = <b class="ai-n">1000</b></label>
  <input type="range" min="200" max="6000" step="200" value="1000" data-r="n" aria-label="Sample size">
  <label>True difference (B − A) = <b class="ai-d">+1.0</b> points</label>
  <input type="range" min="0" max="3" step="0.5" value="1" data-r="d" aria-label="True difference">
  <div class="ai-ctl"><button type="button" data-k="1">New experiment</button><button type="button" data-k="20">Repeat 20 times</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var rN = root.querySelector("[data-r=n]"), rD = root.querySelector("[data-r=d]");
  var nEl = root.querySelector(".ai-n"), dEl = root.querySelector(".ai-d"), kBtn = root.querySelectorAll("[data-k]");
  var P0 = 0.10, tohum = 21, gecmis = [];
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function f1(x) { return x.toFixed(1); }
  function isa(x) { return (x > 0 ? "+" : x < 0 ? "−" : "") + f1(Math.abs(x)); }
  function phi(z) {
    var t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z / 2);
    return z >= 0 ? (1 + y) / 2 : (1 - y) / 2;
  }
  function deney() {
    var n = +rN.value, p1 = P0 + rD.value / 100, a = 0, b = 0;
    for (var i = 0; i < n; i++) { if (rnd() < P0) a++; if (rnd() < p1) b++; }
    var pa = a / n, pb = b / n, fark = pb - pa;
    var se = Math.sqrt(pa * (1 - pa) / n + pb * (1 - pb) / n);
    var pp = (a + b) / (2 * n), se0 = Math.sqrt(pp * (1 - pp) * 2 / n);
    var z = se0 > 0 ? fark / se0 : 0, p = 2 * (1 - phi(Math.abs(z)));
    return { a: a, b: b, n: n, fark: fark * 100, alt: (fark - 1.96 * se) * 100, ust: (fark + 1.96 * se) * 100, p: p, anl: p < 0.05 };
  }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt != null) e.textContent = txt; return e; }
  var X0 = 14, PW = 362, XMIN = -6, XMAX = 8, Y0 = 24, RH = 18;
  function px(v) { return X0 + (Math.max(XMIN, Math.min(XMAX, v)) - XMIN) / (XMAX - XMIN) * PW; }
  function ciz() {
    nEl.textContent = rN.value; dEl.textContent = isa(+rD.value);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    for (var v = XMIN; v <= XMAX; v += 2) {
      svg.appendChild(mk("path", { d: "M" + px(v) + " " + (Y0 - 6) + " V" + (Y0 + 12 * RH), "class": "grid" }));
      svg.appendChild(mk("text", { x: px(v), y: Y0 + 12 * RH + 15, "class": "lbl", "text-anchor": "middle" }, (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v)));
    }
    svg.appendChild(mk("text", { x: 195, y: 278, "class": "lbl", "text-anchor": "middle" }, "B − A difference (percentage points), 95% CI"));
    var sifir = mk("path", { d: "M" + px(0) + " " + (Y0 - 8) + " V" + (Y0 + 12 * RH) }); sifir.style.stroke = "var(--ds-text)"; sifir.style.strokeWidth = 1.5; svg.appendChild(sifir);
    var gd = +rD.value, gl = mk("path", { d: "M" + px(gd) + " " + (Y0 - 8) + " V" + (Y0 + 12 * RH), "stroke-dasharray": "5 3" });
    gl.style.stroke = "#e9a23b"; gl.style.strokeWidth = 2; svg.appendChild(gl);
    var gt = mk("text", { x: px(gd) + 4, y: 12, "class": "lbl" }, "true difference"); gt.style.fill = "#e9a23b"; gt.style.fontWeight = 700; svg.appendChild(gt);
    var st = mk("text", { x: px(0) - 4, y: 12, "class": "lbl", "text-anchor": "end" }, "no difference"); svg.appendChild(st);
    var son = gecmis.slice(-12);
    son.forEach(function (e, i) {
      var y = Y0 + (11 - (son.length - 1 - i)) * RH + RH / 2, renk = e.anl ? "var(--ds-good)" : "var(--ds-muted)";
      var l = mk("path", { d: "M" + px(e.alt) + " " + y + " H" + px(e.ust) }); l.style.stroke = renk; l.style.strokeWidth = i === son.length - 1 ? 4 : 2.5; svg.appendChild(l);
      [e.alt, e.ust].forEach(function (u) { var c = mk("path", { d: "M" + px(u) + " " + (y - 4) + " V" + (y + 4) }); c.style.stroke = renk; c.style.strokeWidth = 2; svg.appendChild(c); });
      var c = mk("circle", { cx: px(e.fark), cy: y, r: i === son.length - 1 ? 5 : 3.5 }); c.style.fill = renk; c.style.stroke = "var(--ds-bg)"; svg.appendChild(c);
    });
    var e = gecmis[gecmis.length - 1], an = 0;
    gecmis.forEach(function (x) { if (x.anl) an++; });
    outs[0].innerHTML = "Last experiment: A " + f1(100 * e.a / e.n) + "%, B " + f1(100 * e.b / e.n) + "%<br>Difference " + isa(e.fark) + " points, CI [" + isa(e.alt) + ", " + isa(e.ust) + "]<br>p = <b>" +
      (e.p < 0.001 ? "&lt; 0.001" : e.p.toFixed(3)) + "</b> → " + (e.anl ? "<b>significant</b>" : "not significant");
    outs[1].innerHTML = "With this setting <b>" + an + "</b> of " + gecmis.length + " experiments were significant (" + Math.round(100 * an / gecmis.length) + "%). " +
      (gd === 0 ? "With a true difference of zero, the significant ones are <b>false alarms</b>." : "Green: the interval excludes zero.");
  }
  function yeni(k) { for (var i = 0; i < k; i++) gecmis.push(deney()); ciz(); }
  function sifirla() { gecmis = []; yeni(12); }
  rN.addEventListener("input", sifirla);
  rD.addEventListener("input", sifirla);
  kBtn.forEach(function (b) { b.addEventListener("click", function () { yeni(+b.getAttribute("data-k")); }); });
  sifirla();
''',
    'not': ('With a small sample the intervals are wide: a real improvement comes out “not significant” in most experiments. '
            'Computing the required n before starting the test keeps you from throwing away a good model.'),
}
