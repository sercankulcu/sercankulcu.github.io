# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Who Should the Gate Let In?',
    'problem': ('A face recognition gate gives each person a similarity score between 0 and 1; if the score passes the threshold, the gate opens. '
                'Move the threshold or pick a scenario to see the trade-off between accepting impostors and rejecting genuine users.'),
    'html': '''
<svg viewBox="0 0 390 290" width="390" height="290" role="img" aria-label="Genuine and impostor score distributions with error curves"></svg>
<div class="ai-side">
  <label>Threshold = <b class="ai-t">0.55</b></label>
  <input type="range" min="0.2" max="0.9" step="0.01" value="0.55" aria-label="Decision threshold">
  <div class="ai-ctl"><button type="button" data-s="hava">Airport</button><button type="button" data-s="tel">Phone unlock</button><button type="button" data-s="eer">EER point</button></div>
  <div class="ai-out"></div>
  <div class="ai-out ai-o2" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var range = root.querySelector("input"), tEl = root.querySelector(".ai-t");
  var tohum = 11;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function gauss() { return Math.sqrt(-2 * Math.log(rnd() + 1e-12)) * Math.cos(2 * Math.PI * rnd()); }
  function kirp(v) { return Math.min(0.995, Math.max(0.005, v)); }
  var NG = 2000, gercek = [], sahte = [];
  for (var i = 0; i < NG; i++) gercek.push(kirp(rnd() < 0.08 ? 0.5 + 0.12 * gauss() : 0.73 + 0.08 * gauss()));
  for (var j = 0; j < NG; j++) sahte.push(kirp(rnd() < 0.05 ? 0.55 + 0.08 * gauss() : 0.33 + 0.09 * gauss()));
  var senaryo = null;
  function f(v, d) { return v.toFixed(d); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function far(t) { var n = 0; sahte.forEach(function (s) { if (s >= t) n++; }); return n / NG; }
  function frr(t) { var n = 0; gercek.forEach(function (s) { if (s < t) n++; }); return n / NG; }
  var X0 = 34, PW = 346, H1 = 150, Y2 = 180, H2 = 80;
  function px(v) { return X0 + v * PW; }
  var B = 50, hg = [], hs = [], mx = 0;
  for (var b = 0; b < B; b++) { hg.push(0); hs.push(0); }
  gercek.forEach(function (s) { hg[Math.floor(s * B)]++; });
  sahte.forEach(function (s) { hs[Math.floor(s * B)]++; });
  for (b = 0; b < B; b++) mx = Math.max(mx, hg[b], hs[b]);
  var egri = [];
  for (var k = 0; k <= 100; k++) egri.push([k / 100, far(k / 100), frr(k / 100)]);
  var eer = egri[0];
  egri.forEach(function (e) { if (Math.abs(e[1] - e[2]) < Math.abs(eer[1] - eer[2])) eer = e; });
  function esikBul(kos) { for (var k = 0; k <= 100; k++) if (kos(egri[k])) return egri[k][0]; return 0.9; }
  function ciz() {
    var t = +range.value;
    tEl.textContent = f(t, 2);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var bw = PW / B;
    for (var b = 0; b < B; b++) {
      var v0 = b / B;
      [[hs[b], "var(--ds-bad)", v0 + 0.5 / B >= t], [hg[b], "var(--ds-good)", v0 + 0.5 / B < t]].forEach(function (h) {
        var y = (h[0] / mx) * (H1 - 14);
        var r = mk("rect", { x: px(v0) + 0.5, y: H1 - y, width: bw - 1, height: y });
        r.style.fill = h[1]; r.style.opacity = h[2] ? 0.85 : 0.28;
        svg.appendChild(r);
      });
    }
    svg.appendChild(mk("path", { d: "M" + X0 + " " + H1 + " H" + (X0 + PW), "class": "axis" }));
    svg.appendChild(mk("text", { x: px(0.18), y: 18, "class": "lbl", "text-anchor": "middle" }, "impostors"));
    svg.appendChild(mk("text", { x: px(0.82), y: 18, "class": "lbl", "text-anchor": "middle" }, "genuine users"));
    svg.appendChild(mk("text", { x: X0, y: H1 + 14, "class": "lbl" }, "0"));
    svg.appendChild(mk("text", { x: X0 + PW, y: H1 + 14, "class": "lbl", "text-anchor": "end" }, "1"));
    svg.appendChild(mk("text", { x: X0 + PW / 2, y: H1 + 14, "class": "lbl", "text-anchor": "middle" }, "similarity score →"));
    svg.appendChild(mk("path", { d: "M" + X0 + " " + Y2 + " V" + (Y2 + H2) + " H" + (X0 + PW), "class": "axis" }));
    svg.appendChild(mk("text", { x: 4, y: Y2 + 8, "class": "lbl" }, "40%"));
    svg.appendChild(mk("text", { x: 4, y: Y2 + H2, "class": "lbl" }, "0%"));
    function yol(sutun) {
      return egri.map(function (e, i) { return (i ? "L" : "M") + px(e[0]) + " " + (Y2 + H2 - Math.min(1, e[sutun] / 0.4) * H2); }).join(" ");
    }
    var p1 = mk("path", { d: yol(1), fill: "none", "stroke-width": 2.5 }); p1.style.stroke = "var(--ds-bad)"; svg.appendChild(p1);
    var p2 = mk("path", { d: yol(2), fill: "none", "stroke-width": 2.5 }); p2.style.stroke = "#e9a23b"; svg.appendChild(p2);
    svg.appendChild(mk("text", { x: px(0.06), y: Y2 + 14, "class": "lbl" }, "FAR"));
    var l2 = mk("text", { x: px(0.94), y: Y2 + 14, "class": "lbl", "text-anchor": "end" }, "FRR"); svg.appendChild(l2);
    var ey = Y2 + H2 - eer[1] / 0.4 * H2;
    var ec = mk("circle", { cx: px(eer[0]), cy: ey, r: 4.5 }); ec.style.fill = "var(--ds-text)"; svg.appendChild(ec);
    svg.appendChild(mk("text", { x: px(eer[0]) + 7, y: ey - 6, "class": "lbl" }, "EER"));
    var cz = mk("path", { d: "M" + px(t) + " 24 V" + (Y2 + H2), "stroke-width": 2, "stroke-dasharray": "5 3" });
    cz.style.stroke = "var(--ds-link)"; svg.appendChild(cz);
    var fa = far(t), fr = frr(t);
    outs[0].innerHTML = "FAR (impostor accepted) = <b>" + f(100 * fa, 2) + "%</b><br>FRR (genuine rejected) = <b>" + f(100 * fr, 2) + "%</b><br>" +
      "In 10,000 attempts ≈ " + Math.round(fa * 10000) + " impostors get in, " + Math.round(fr * 10000) + " travelers are stopped.";
    var ek = "EER ≈ " + f(100 * eer[1], 1) + "% (threshold " + f(eer[0], 2) + "): the point where both errors are equal.";
    if (senaryo === "hava") ek = "<b>Airport:</b> security comes first, so the threshold gives FAR ≤ 0.1%. An officer checks rejected travelers by hand.";
    if (senaryo === "tel") ek = "<b>Phone unlock:</b> the user unlocks 80 times a day, so FRR ≤ 2%. The cost is a higher FAR; a PIN is the fallback.";
    outs[1].innerHTML = ek;
  }
  root.querySelectorAll("[data-s]").forEach(function (b) {
    b.addEventListener("click", function () {
      senaryo = b.dataset.s;
      root.querySelectorAll("[data-s]").forEach(function (x) { x.classList.toggle("is-on", x === b); });
      var t = senaryo === "hava" ? esikBul(function (e) { return e[1] <= 0.001; }) :
        senaryo === "tel" ? (function () { var s = 0.2; egri.forEach(function (e) { if (e[2] <= 0.02) s = e[0]; }); return s; })() : eer[0];
      range.value = t;
      ciz();
    });
  });
  range.addEventListener("input", function () {
    senaryo = null;
    root.querySelectorAll("[data-s]").forEach(function (x) { x.classList.remove("is-on"); });
    ciz();
  });
  ciz();
''',
    'not': ('A biometric system never says “certain”: the two distributions overlap, and the threshold is set by which error costs more. '
            'The course teaches the feature extraction that produces these scores and evaluation with FAR/FRR.'),
}
