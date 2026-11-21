# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Is the Credit Model Fair to Both Groups?',
    'problem': ('The model scores each application from 0 to 100; scores above the threshold are approved. Group B scores lower because of historical data. '
                'Move the thresholds and watch how two fairness metrics change.'),
    'html': '''
<svg viewBox="0 0 390 282" width="390" height="282" role="img" aria-label="Score distributions of two groups and approval thresholds"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-m="ortak" class="is-on">Shared threshold</button><button type="button" data-m="ozel">Per-group threshold</button></div>
  <label>Group A threshold = <b class="ai-ta">55</b></label>
  <input type="range" class="ai-ra" min="0" max="100" value="55" aria-label="Group A threshold">
  <label>Group B threshold = <b class="ai-tb">55</b></label>
  <input type="range" class="ai-rb" min="0" max="100" value="55" aria-label="Group B threshold">
  <div class="ai-ctl"><button type="button" data-e="onay">Equalize approval rates</button><button type="button" data-e="gpo">Equalize opportunity</button></div>
  <div class="ai-out ai-tab"></div>
</div>''',
    'css': '''
.ds-deck .ai-demo .ai-tab table { border-collapse: collapse; width: 100%; font-size: 13.5px; }
.ds-deck .ai-demo .ai-tab td, .ds-deck .ai-demo .ai-tab th { padding: 1px 4px; text-align: right; }
.ds-deck .ai-demo .ai-tab th { color: var(--ds-muted); font-weight: 600; }
.ds-deck .ai-demo .ai-tab td:first-child { text-align: left; }
.ds-deck .ai-demo .ai-tab .ai-fark { margin-top: 4px; }
.ds-deck .ai-demo > svg { width: 340px; height: auto; }
.ds-deck .ai-demo .ai-side { gap: 4px; }
.ds-deck .ai-demo .ai-out { padding: 5px 9px; }
''',
    'js': r'''
  var svg = root.querySelector("svg"), out = root.querySelector(".ai-tab");
  var ra = root.querySelector(".ai-ra"), rb = root.querySelector(".ai-rb");
  var ta = root.querySelector(".ai-ta"), tb = root.querySelector(".ai-tb");
  var mBtn = root.querySelectorAll("[data-m]"), eBtn = root.querySelectorAll("[data-e]");
  var X0 = 26, XW = 354, BW = 4;
  var tohum = 11;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function gauss() { return (rnd() + rnd() + rnd() + rnd() - 2) / 0.58; }
  function uret(nOde, nOdeme, mOde, mOdeme) {
    var g = [], i;
    for (i = 0; i < nOde; i++) g.push([Math.round(Math.min(98, Math.max(2, mOde + 12 * gauss()))), 1]);
    for (i = 0; i < nOdeme; i++) g.push([Math.round(Math.min(98, Math.max(2, mOdeme + 12 * gauss()))), 0]);
    return g;
  }
  var gruplar = [
    { ad: "A", veri: uret(24, 16, 68, 42), y: 122 },
    { ad: "B", veri: uret(18, 22, 55, 33), y: 250 }
  ];
  var ortak = true;
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function px(s) { return X0 + s / 100 * XW; }
  function olc(g, t) {
    var on = 0, p = 0, tp = 0, dogru = 0;
    g.veri.forEach(function (d) {
      var o = d[0] >= t;
      if (o) on++;
      if (d[1]) { p++; if (o) tp++; }
      if (o === (d[1] === 1)) dogru++;
    });
    return { onay: on / g.veri.length, gpo: tp / p, dogru: dogru };
  }
  function yuzde(v) { return Math.round(v * 100) + "%"; }
  function ciz() {
    var t = [+ra.value, +rb.value];
    ta.textContent = t[0]; tb.textContent = t[1];
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    gruplar.forEach(function (g, gi) {
      var th = t[gi];
      var sh = mk("rect", { x: px(th), y: g.y - 104, width: px(100) - px(th), height: 104 });
      sh.style.fill = "var(--ds-link)"; sh.style.opacity = 0.1;
      svg.appendChild(sh);
      svg.appendChild(mk("path", { d: "M" + X0 + " " + g.y + " H" + (X0 + XW), "class": "axis" }));
      svg.appendChild(mk("text", { x: 4, y: g.y - 88, "class": "txt" }, g.ad));
      var kutu = {};
      g.veri.slice().sort(function (a, b) { return b[1] - a[1]; }).forEach(function (d) {
        var b = Math.min(24, Math.floor(d[0] / BW));
        kutu[b] = (kutu[b] || 0) + 1;
        var c = mk("circle", { cx: px(b * BW + BW / 2), cy: g.y - 6.5 - (kutu[b] - 1) * 12, r: 5.6 });
        c.style.fill = d[1] ? "var(--ds-good)" : "var(--ds-bad)";
        c.style.opacity = d[0] >= th ? 1 : 0.32;
        svg.appendChild(c);
      });
      var ln = mk("path", { d: "M" + px(th) + " " + (g.y - 104) + " V" + (g.y + 3) });
      ln.style.stroke = "var(--ds-accent)"; ln.style.strokeWidth = 2.5;
      svg.appendChild(ln);
      var et = mk("text", { x: px(th) + (th > 80 ? -5 : 5), y: g.y - 92, "class": "lbl", "text-anchor": th > 80 ? "end" : "start" }, "approve →");
      svg.appendChild(et);
    });
    [0, 25, 50, 75, 100].forEach(function (s) {
      svg.appendChild(mk("text", { x: px(s), y: 268, "text-anchor": "middle", "class": "lbl" }, String(s)));
    });
    svg.appendChild(mk("text", { x: X0 + XW / 2, y: 281, "text-anchor": "middle", "class": "lbl" }, "model score"));
    var a = olc(gruplar[0], t[0]), b = olc(gruplar[1], t[1]);
    var dp = Math.round(Math.abs(a.onay - b.onay) * 100), eo = Math.round(Math.abs(a.gpo - b.gpo) * 100);
    var acc = Math.round((a.dogru + b.dogru) / 80 * 100);
    out.innerHTML = "<table><tr><th></th><th>approved</th><th>repayers approved (TPR)</th></tr>" +
      "<tr><td>Group A</td><td>" + yuzde(a.onay) + "</td><td>" + yuzde(a.gpo) + "</td></tr>" +
      "<tr><td>Group B</td><td>" + yuzde(b.onay) + "</td><td>" + yuzde(b.gpo) + "</td></tr></table>" +
      "<div class=\"ai-fark\">Demographic parity gap: <b>" + dp + " pts</b><br>Equal opportunity gap: <b>" + eo + " pts</b><br>Accuracy: " + acc + "%</div>";
  }
  function kip(o) {
    ortak = o;
    mBtn[0].classList.toggle("is-on", o); mBtn[1].classList.toggle("is-on", !o);
    if (o) rb.value = ra.value;
  }
  mBtn[0].addEventListener("click", function () { kip(true); ciz(); });
  mBtn[1].addEventListener("click", function () { kip(false); ciz(); });
  ra.addEventListener("input", function () { if (ortak) rb.value = ra.value; ciz(); });
  rb.addEventListener("input", function () { if (ortak) ra.value = rb.value; ciz(); });
  eBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      kip(false);
      var anah = btn.getAttribute("data-e"), hedef = olc(gruplar[0], +ra.value)[anah], en = null;
      for (var s = 0; s <= 100; s++) {
        var f = Math.abs(olc(gruplar[1], s)[anah] - hedef) * 1000 + Math.abs(s - ra.value) * 0.01;
        if (en === null || f < en[0]) en = [f, s];
      }
      rb.value = en[1];
      ciz();
    });
  });
  ciz();
''',
    'not': ('The same threshold treats the two groups differently; closing one gap opens the other. The course teaches making these measurements, '
            'stating openly which fairness definition was chosen, and making the model auditable.'),
}
