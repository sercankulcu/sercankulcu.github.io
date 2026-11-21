# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Cleaning a Noisy Pulse',
    'problem': ('A chest-strap ECG samples at 200 Hz; 50 Hz mains hum and muscle noise have crept into the recording. '
                'Change the moving-average window length and watch the signal in both time and frequency.'),
    'html': '''
<svg viewBox="0 0 390 284" width="390" height="284" role="img" aria-label="ECG signal and amplitude spectrum"></svg>
<div class="ai-side">
  <label>Window M = <b class="ai-m">4</b> samples (<span class="ai-ms">20</span> ms)</label>
  <input type="range" min="1" max="30" value="4" aria-label="Window length">
  <div class="ai-ctl"><button type="button" data-n="hum" class="is-on">50 Hz hum</button><button type="button" data-n="kas" class="is-on">Muscle noise</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px">The dashed line is the filter’s frequency response: at M = 4 its zero falls exactly on 50 Hz. Larger M means less noise, but the sharp <b>R peak</b> gets flattened too.</div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), out = root.querySelector(".ai-out");
  var range = root.querySelector("input"), mEl = root.querySelector(".ai-m"), msEl = root.querySelector(".ai-ms");
  var nBtn = root.querySelectorAll("[data-n]");
  var FS = 200, N = 600, KMAX = 180;
  var X0 = 30, XW = 352;
  var gur = { hum: true, kas: true };
  var tohum = 5;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function gauss() { return (rnd() + rnd() + rnd() + rnd() - 2) / 0.58; }
  var temiz = [], beyaz = [], i, k;
  var dalgalar = [[-0.2, 0.12, 0.025], [-0.035, -0.15, 0.01], [0, 1.1, 0.011], [0.035, -0.28, 0.011], [0.26, 0.3, 0.045]];
  for (i = 0; i < N; i++) {
    var t = i / FS, v = 0;
    for (var b = 0; b < 4; b++) {
      dalgalar.forEach(function (d) { var u = t - (0.35 + 0.8 * b) - d[0]; v += d[1] * Math.exp(-u * u / (2 * d[2] * d[2])); });
    }
    temiz.push(v);
    beyaz.push(0.13 * gauss());
  }
  var COS = [], SIN = [];
  for (i = 0; i < N; i++) { COS.push(Math.cos(2 * Math.PI * i / N)); SIN.push(Math.sin(2 * Math.PI * i / N)); }
  function dft(x) {
    var g = [];
    for (var kk = 0; kk <= KMAX; kk++) {
      var re = 0, im = 0, idx = 0;
      for (var n = 0; n < N; n++) { re += x[n] * COS[idx]; im -= x[n] * SIN[idx]; idx += kk; if (idx >= N) idx -= N; }
      g.push(2 * Math.hypot(re, im) / N);
    }
    return g;
  }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function cizgi(dz, fx, fy, renk, kal, kesik, op) {
    var d = "";
    dz.forEach(function (v, j) { d += (j ? "L" : "M") + fx(j).toFixed(1) + " " + fy(v).toFixed(1); });
    var p = mk("path", { d: d });
    p.style.fill = "none"; p.style.stroke = renk; p.style.strokeWidth = kal; p.style.opacity = op || 1;
    if (kesik) p.setAttribute("stroke-dasharray", "4 3");
    svg.appendChild(p);
  }
  function db(v) { return (10 * Math.log10(v)).toFixed(1); }
  function ciz() {
    var M = +range.value;
    mEl.textContent = M; msEl.textContent = String(M * 5);
    var ham = [], suz = [];
    for (i = 0; i < N; i++) ham.push(temiz[i] + (gur.hum ? 0.35 * Math.sin(2 * Math.PI * 50 * i / FS + 0.4) : 0) + (gur.kas ? beyaz[i] : 0));
    var a0 = Math.floor(M / 2);
    for (i = 0; i < N; i++) {
      var s = 0;
      for (var j = i - a0; j < i - a0 + M; j++) s += ham[Math.min(N - 1, Math.max(0, j))];
      suz.push(s / M);
    }
    var Ps = 0, Ph = 0, Pf = 0;
    for (i = 0; i < N; i++) { Ps += temiz[i] * temiz[i]; Ph += (ham[i] - temiz[i]) * (ham[i] - temiz[i]); Pf += (suz[i] - temiz[i]) * (suz[i] - temiz[i]); }
    var tepeT = 0, tepeS = 0;
    for (i = 0; i < N; i++) { tepeT = Math.max(tepeT, temiz[i]); }
    var vurus = [], esik = 0;
    for (i = 0; i < N; i++) esik = Math.max(esik, suz[i]);
    esik *= 0.55;
    for (i = 1; i < N - 1; i++) {
      if (suz[i] > esik && suz[i] >= suz[i - 1] && suz[i] > suz[i + 1]) {
        if (vurus.length && i - vurus[vurus.length - 1] < 60) { if (suz[i] > suz[vurus[vurus.length - 1]]) vurus[vurus.length - 1] = i; }
        else vurus.push(i);
      }
    }
    [70, 230, 390, 550].forEach(function (c) { var m = -9; for (var q = c - 8; q <= c + 8; q++) m = Math.max(m, suz[q]); tepeS += m / 4; });
    var Gh = dft(ham), Gs = dft(suz);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var tY = function (v) { return 78 - v * 50; };
    svg.appendChild(mk("text", { x: X0 + XW, y: 138, "text-anchor": "end", "class": "lbl" }, "time (3 s) →"));
    svg.appendChild(mk("path", { d: "M" + X0 + " " + tY(0) + " H" + (X0 + XW), "class": "grid" }));
    cizgi(ham, function (j) { return X0 + j / (N - 1) * XW; }, tY, "var(--ds-muted)", 1, false, 0.55);
    cizgi(suz, function (j) { return X0 + j / (N - 1) * XW; }, tY, "var(--ds-link)", 2);
    vurus.forEach(function (q) {
      var c = mk("circle", { cx: X0 + q / (N - 1) * XW, cy: tY(suz[q]) - 7, r: 3.5 });
      c.style.fill = "var(--ds-accent)"; svg.appendChild(c);
    });
    var FY0 = 258, FH = 82, gmax = 0.42;
    var fX = function (kk) { return X0 + kk / KMAX * XW; };
    var fY = function (v) { return FY0 - Math.min(1, v / gmax) * FH; };
    svg.appendChild(mk("text", { x: X0, y: FY0 - FH - 8, "class": "lbl" }, "frequency: DFT magnitude"));
    svg.appendChild(mk("path", { d: "M" + X0 + " " + (FY0 - FH) + " V" + FY0 + " H" + (X0 + XW), "class": "axis" }));
    var H = [];
    for (k = 0; k <= KMAX; k++) {
      var w = Math.PI * 2 * (k / 3) / FS, re = 0, im = 0;
      for (var n = 0; n < M; n++) { re += Math.cos(w * n); im += Math.sin(w * n); }
      H.push(Math.hypot(re, im) / M * gmax);
    }
    cizgi(Gh, fX, fY, "var(--ds-muted)", 1.2, false, 0.7);
    cizgi(Gs, fX, fY, "var(--ds-link)", 2);
    cizgi(H, fX, fY, "var(--ds-accent)", 1.5, true);
    [0, 10, 20, 30, 40, 50, 60].forEach(function (f) {
      svg.appendChild(mk("text", { x: fX(f * 3), y: FY0 + 14, "text-anchor": "middle", "class": "lbl" }, String(f)));
    });
    svg.appendChild(mk("text", { x: X0 + XW, y: FY0 + 26, "text-anchor": "end", "class": "lbl" }, "Hz"));
    var nabiz = vurus.length > 1 ? Math.round(60 * FS * (vurus.length - 1) / (vurus[vurus.length - 1] - vurus[0])) : 0;
    out.innerHTML = (Ph > 0 ? "Signal/noise: " + db(Ps / Ph) + " dB → <b>" + db(Ps / Pf) + " dB</b><br>" : "Noise off.<br>") +
      "R peak height: <b>" + Math.round(tepeS / tepeT * 100) + "%</b><br>" +
      "Beats found: " + vurus.length + ", heart rate ≈ <b>" + nabiz + " bpm</b>";
  }
  range.addEventListener("input", ciz);
  nBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var a = btn.getAttribute("data-n"); gur[a] = !gur[a]; btn.classList.toggle("is-on", gur[a]); ciz();
    });
  });
  ciz();
''',
    'not': ('To separate noise you first look at its <b>frequency</b>. The course teaches you to design a filter from its '
            'frequency response, not by trial, and to leave the component you want intact.'),
}
