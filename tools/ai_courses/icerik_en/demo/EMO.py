# -*- coding: utf-8 -*-
DEMO = {
    'baslik': "Evolve the Delivery Van's Route",
    'problem': ('The delivery van leaves the depot (D), visits 11 addresses and returns. A genetic algorithm improves a population '
                'of 40 tours by crossover and mutation. Advance generations, change the mutation rate and compare.'),
    'html': '''
<svg viewBox="0 0 390 290" width="390" height="290" role="img" aria-label="Delivery points and the best tour"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-g="0">Reset</button><button type="button" data-g="1">1 generation</button><button type="button" data-g="50">50 generations</button></div>
  <label>Mutation rate = <b class="ai-m">20%</b></label>
  <input type="range" min="0" max="60" step="5" value="20" aria-label="Mutation rate">
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px">Set mutation to 0% and reset: the population fills with near-identical tours and the search often <b>stalls early</b>. Mutation preserves diversity.</div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), out = root.querySelector(".ai-out");
  var range = root.querySelector("input"), mEl = root.querySelector(".ai-m");
  var N = 12, POP = 40, KM = 0.5;
  var tohum = 11;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function ri(n) { return Math.floor(rnd() * n); }
  var sehir = [[190, 104]];
  while (sehir.length < N) {
    var p = [24 + rnd() * 342, 14 + rnd() * 180], uzak = true;
    sehir.forEach(function (q) { if (Math.hypot(p[0] - q[0], p[1] - q[1]) < 46) uzak = false; });
    if (uzak) sehir.push(p);
  }
  var D = sehir.map(function (a) { return sehir.map(function (b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }); });
  function boy(t) { var s = D[0][t[0]] + D[t[t.length - 1]][0]; for (var i = 1; i < t.length; i++) s += D[t[i - 1]][t[i]]; return s; }
  var opt = (function () {
    var M = N - 1, F = 1 << M, dp = new Float64Array(F * M).fill(Infinity), best = Infinity;
    for (var j = 0; j < M; j++) dp[(1 << j) * M + j] = D[0][j + 1];
    for (var m = 1; m < F; m++) for (var j2 = 0; j2 < M; j2++) {
      var v = dp[m * M + j2];
      if (v === Infinity) continue;
      for (var k = 0; k < M; k++) if (!(m & (1 << k))) {
        var n = (m | (1 << k)) * M + k, w = v + D[j2 + 1][k + 1];
        if (w < dp[n]) dp[n] = w;
      }
    }
    for (var j3 = 0; j3 < M; j3++) best = Math.min(best, dp[(F - 1) * M + j3] + D[j3 + 1][0]);
    return best;
  })();
  var nufus, nesil, gecmis, timer = null;
  function karis() { var t = []; for (var i = 1; i < N; i++) t.push(i); for (var j = t.length - 1; j > 0; j--) { var r = ri(j + 1), x = t[j]; t[j] = t[r]; t[r] = x; } return t; }
  function sirala() { nufus.sort(function (a, b) { return a.b - b.b; }); }
  function baslat() {
    if (timer) { clearInterval(timer); timer = null; }
    tohum = 97;
    nufus = []; for (var i = 0; i < POP; i++) { var t = karis(); nufus.push({ t: t, b: boy(t) }); }
    sirala(); nesil = 0; gecmis = [nufus[0].b];
  }
  function turnuva() { var a = nufus[ri(POP)], b = nufus[ri(POP)], c = nufus[ri(POP)]; var e = a.b < b.b ? a : b; return e.b < c.b ? e : c; }
  function ox(a, b) {
    var L = a.length, i = ri(L), j = ri(L); if (i > j) { var x = i; i = j; j = x; }
    var c = new Array(L), icinde = {};
    for (var k = i; k <= j; k++) { c[k] = a[k]; icinde[a[k]] = true; }
    var p = (j + 1) % L;
    for (var s = 0; s < L; s++) { var g = b[(j + 1 + s) % L]; if (!icinde[g]) { c[p] = g; p = (p + 1) % L; } }
    return c;
  }
  function birNesil() {
    var oran = +range.value / 100, yeni = [nufus[0], nufus[1]];
    while (yeni.length < POP) {
      var c = ox(turnuva().t, turnuva().t);
      if (rnd() < oran) { var i = ri(c.length), j = ri(c.length); if (i > j) { var x = i; i = j; j = x; } var parca = c.slice(i, j + 1).reverse(); for (var k = i; k <= j; k++) c[k] = parca[k - i]; }
      yeni.push({ t: c, b: boy(c) });
    }
    nufus = yeni; sirala(); nesil++; gecmis.push(nufus[0].b);
  }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function f(v, d) { return v.toFixed(d); }
  function ciz() {
    mEl.textContent = range.value + "%";
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    for (var i = 1; i < Math.min(8, POP); i++) {
      var tt = [0].concat(nufus[i].t, [0]), d0 = "";
      tt.forEach(function (c, k) { d0 += (k ? " L" : "M") + sehir[c][0].toFixed(1) + " " + sehir[c][1].toFixed(1); });
      var g = mk("path", { d: d0 }); g.style.fill = "none"; g.style.stroke = "var(--ds-muted)"; g.style.strokeWidth = 1; g.style.opacity = 0.25;
      svg.appendChild(g);
    }
    var t = [0].concat(nufus[0].t, [0]), d = "";
    t.forEach(function (c, k) { d += (k ? " L" : "M") + sehir[c][0].toFixed(1) + " " + sehir[c][1].toFixed(1); });
    var yol = mk("path", { d: d }); yol.style.fill = "none"; yol.style.stroke = "#e9a23b"; yol.style.strokeWidth = 3; yol.style.strokeLinejoin = "round";
    svg.appendChild(yol);
    sehir.forEach(function (p, k) {
      var c = mk("circle", { cx: p[0], cy: p[1], r: k ? 6 : 10 });
      c.style.fill = k ? "var(--ds-link)" : "var(--ds-accent)"; c.style.stroke = "var(--ds-bg)"; c.style.strokeWidth = 1.5;
      svg.appendChild(c);
      if (!k) { var tx = mk("text", { x: p[0], y: p[1] + 4, "text-anchor": "middle", "class": "lbl" }, "D"); tx.style.fill = "var(--ds-bg)"; tx.style.fontWeight = 700; svg.appendChild(tx); }
    });
    var GX = 40, GY = 222, GW = 340, GH = 50, nm = Math.max(50, gecmis.length - 1), hi = gecmis[0], lo = opt * 0.95;
    svg.appendChild(mk("path", { d: "M" + GX + " " + GY + " V" + (GY + GH) + " H" + (GX + GW), "class": "axis" }));
    var oy = GY + GH - (opt - lo) / (hi - lo) * GH;
    svg.appendChild(mk("path", { d: "M" + GX + " " + oy + " H" + (GX + GW), "class": "line", "stroke-dasharray": "4 3" }));
    svg.appendChild(mk("text", { x: GX + GW, y: oy - 4, "text-anchor": "end", "class": "lbl" }, "shortest possible"));
    var e = "";
    gecmis.forEach(function (v, k) { e += (k ? " L" : "M") + (GX + k / nm * GW).toFixed(1) + " " + (GY + GH - (v - lo) / (hi - lo) * GH).toFixed(1); });
    var ep = mk("path", { d: e }); ep.style.fill = "none"; ep.style.stroke = "var(--ds-accent)"; ep.style.strokeWidth = 2.2;
    svg.appendChild(ep);
    svg.appendChild(mk("text", { x: 14, y: GY + GH / 2, "text-anchor": "middle", "class": "lbl", transform: "rotate(-90 14 " + (GY + GH / 2) + ")" }, "best"));
    svg.appendChild(mk("text", { x: GX + GW / 2, y: GY + GH + 14, "text-anchor": "middle", "class": "lbl" }, "generation →"));
    var fark = 100 * (nufus[0].b - opt) / opt;
    out.innerHTML = "Generation <b>" + nesil + "</b> · best tour <b>" + f(nufus[0].b * KM, 1) + " km</b><br>Initial best " + f(gecmis[0] * KM, 1) +
      " km · shortest possible " + f(opt * KM, 1) + " km<br>" + (fark < 0.05 ? "<b>Shortest tour found.</b>" : f(fark, 1) + "% longer than the shortest.") +
      " " + (nesil * (POP - 2)) + " tours tried (about 20 million possible tours).";
  }
  function ilerle(n) {
    if (timer) { clearInterval(timer); timer = null; }
    if (n === 1) { birNesil(); ciz(); return; }
    var kalan = n;
    timer = setInterval(function () { birNesil(); ciz(); kalan--; if (!kalan) { clearInterval(timer); timer = null; } }, 30);
  }
  root.querySelectorAll("[data-g]").forEach(function (b) {
    b.addEventListener("click", function () {
      var n = +b.dataset.g;
      if (n === 0) { baslat(); ciz(); } else ilerle(n);
    });
  });
  range.addEventListener("input", function () { mEl.textContent = range.value + "%"; });
  baslat(); ciz();
''',
    'not': ('An evolutionary method does not <b>search for</b> a solution, it <b>breeds</b> one: it combines parts of good tours and keeps novelty with small changes. '
            'It does not guarantee the optimum, but quickly finds a good tour in huge search spaces.'),
}
