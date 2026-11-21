# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Reject the Defective Part',
    'problem': ('Every screw on the line is measured; defective ones are longer on average, but the distributions overlap. '
                'Change the defect rate and error cost to move the Bayes boundary; click the chart to measure a part.'),
    'html': '''
<svg viewBox="0 0 390 270" width="390" height="270" role="img" aria-label="Length distributions of good and defective parts"></svg>
<div class="ai-side">
  <label>Defect rate (prior) P(D) = <b class="ai-p">20%</b></label>
  <input type="range" class="ai-rp" min="2" max="50" step="1" value="20" aria-label="Defect rate">
  <label>Missing a defect costs <b class="ai-c">1</b>× scrapping a good one</label>
  <input type="range" class="ai-rc" min="1" max="20" step="1" value="1" aria-label="Cost ratio">
  <div class="ai-ctl"><button type="button" data-r="1">Reset</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var rp = root.querySelector(".ai-rp"), rc = root.querySelector(".ai-rc");
  var pEl = root.querySelector(".ai-p"), cEl = root.querySelector(".ai-c");
  var X0 = 36, Y0 = 12, PW = 344, PH = 196, LO = 42, HI = 64;
  var MS = 50, SS = 1.8, MK = 56, SK = 2.4;
  var olcum = 53.2;
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function f(v, d) { return v.toFixed(d); }
  function nor(x, m, s) { return Math.exp(-0.5 * (x - m) * (x - m) / (s * s)) / (s * Math.sqrt(2 * Math.PI)); }
  function px(x) { return X0 + (x - LO) / (HI - LO) * PW; }
  function ayir(x, pk, c) { return pk * nor(x, MK, SK) * c > (1 - pk) * nor(x, MS, SS); }
  function ciz() {
    var pk = +rp.value / 100, c = +rc.value;
    pEl.textContent = rp.value + "%"; cEl.textContent = c;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var N = 172, dx = (HI - LO) / N, maks = 0, i, x;
    for (i = 0; i <= N; i++) { x = LO + i * dx; maks = Math.max(maks, (1 - pk) * nor(x, MS, SS), pk * nor(x, MK, SK)); }
    function py(v) { return Y0 + PH - v / maks * (PH - 8); }
    var esik = [], once = null;
    for (i = 0; i < N; i++) {
      x = LO + (i + 0.5) * dx;
      var a = ayir(x, pk, c);
      var r = mk("rect", { x: px(LO + i * dx), y: Y0 + PH + 3, width: PW / N + 1.2, height: 10 });
      r.style.fill = a ? "var(--ds-bad)" : "var(--ds-good)"; r.style.opacity = 0.75;
      svg.appendChild(r);
      var b = mk("rect", { x: px(LO + i * dx), y: Y0, width: PW / N + 1.2, height: PH });
      b.style.fill = a ? "var(--ds-bad)" : "var(--ds-good)"; b.style.opacity = 0.07;
      svg.appendChild(b);
      if (once !== null && once !== a) esik.push(LO + i * dx);
      once = a;
    }
    [[MS, SS, 1 - pk, "var(--ds-good)"], [MK, SK, pk, "var(--ds-bad)"]].forEach(function (s) {
      var d = "";
      for (var j = 0; j <= N; j++) { var xx = LO + j * dx; d += (j ? " L" : "M") + px(xx).toFixed(1) + " " + py(s[2] * nor(xx, s[0], s[1])).toFixed(1); }
      var p = mk("path", { d: d });
      p.style.fill = "none"; p.style.stroke = s[3]; p.style.strokeWidth = 2.6;
      svg.appendChild(p);
    });
    esik.forEach(function (t) {
      svg.appendChild(mk("path", { d: "M" + px(t) + " " + Y0 + " V" + (Y0 + PH + 13), "class": "line", "stroke-dasharray": "5 3" }));
      svg.appendChild(mk("text", { x: px(t) + 4, y: Y0 + 12, "class": "lbl" }, "x* = " + f(t, 1)));
    });
    svg.appendChild(mk("path", { d: "M" + X0 + " " + Y0 + " V" + (Y0 + PH) + " H" + (X0 + PW), "class": "axis" }));
    for (var t = 44; t <= 64; t += 4) svg.appendChild(mk("text", { x: px(t), y: Y0 + PH + 28, "text-anchor": "middle", "class": "lbl" }, String(t)));
    svg.appendChild(mk("text", { x: X0 + PW / 2, y: Y0 + PH + 46, "text-anchor": "middle", "class": "lbl" }, "Screw length (mm) →"));
    svg.appendChild(mk("text", { x: 14, y: Y0 + PH / 2, "text-anchor": "middle", "class": "lbl", transform: "rotate(-90 14 " + (Y0 + PH / 2) + ")" }, "P(class) · p(length | class)"));
    var l1 = mk("text", { x: px(MS) - 14, y: py((1 - pk) * nor(MS, MS, SS)) + 14, "text-anchor": "end", "class": "lbl" }, "good"); l1.style.fill = "var(--ds-good)"; svg.appendChild(l1);
    var l2 = mk("text", { x: px(MK) + 10, y: py(pk * nor(MK, MK, SK)) - 6, "class": "lbl" }, "defective"); l2.style.fill = "var(--ds-bad)"; svg.appendChild(l2);
    var q = mk("path", { d: "M" + px(olcum) + " " + (Y0 + PH - 14) + " l-6 12 h12 z" });
    q.style.fill = "var(--ds-text)"; svg.appendChild(q);
    var kac = 0, yan = 0, D = 0.02;
    for (x = 30; x < 80; x += D) {
      if (ayir(x + D / 2, pk, c)) yan += nor(x + D / 2, MS, SS) * D; else kac += nor(x + D / 2, MK, SK) * D;
    }
    var hata = pk * kac + (1 - pk) * yan, mal = 1000 * (pk * kac * c + (1 - pk) * yan);
    var et = esik.length ? esik.map(function (t) { return f(t, 1) + " mm"; }).join(" and ") : "none (all one class)";
    outs[0].innerHTML = "Decision boundary: <b>" + et + "</b><br>Missed defects " + f(100 * kac, 1) + "% · good parts scrapped " + f(100 * yan, 1) + "%" +
      "<br>Total error <b>" + f(100 * hata, 1) + "%</b> · cost per 1000 parts " + f(mal, 0);
    var ps = pk * nor(olcum, MK, SK), pn = (1 - pk) * nor(olcum, MS, SS), post = ps / (ps + pn);
    outs[1].innerHTML = "Measured part (▲) " + f(olcum, 1) + " mm: P(D | length) = " + f(100 * post, 1) + "% → <b>" +
      (ayir(olcum, pk, c) ? "rejected" : "accepted") + "</b>. As the cost rises the boundary moves left: total error grows, the costly error shrinks.";
  }
  svg.addEventListener("click", function (ev) {
    var b = svg.getBoundingClientRect();
    var vx = (ev.clientX - b.left) / b.width * 390;
    var x = LO + (vx - X0) / PW * (HI - LO);
    if (x < LO || x > HI) return;
    olcum = x; ciz();
  });
  rp.addEventListener("input", ciz);
  rc.addEventListener("input", ciz);
  root.querySelector("[data-r]").addEventListener("click", function () { rp.value = 20; rc.value = 1; olcum = 53.2; ciz(); });
  ciz();
''',
    'not': ('Pattern recognition decides with <b>probability and cost</b>: the same measurement changes class when the defect '
            'rate or the cost of an error changes. The Bayes rule gives the boundary that minimizes expected loss.'),
}
