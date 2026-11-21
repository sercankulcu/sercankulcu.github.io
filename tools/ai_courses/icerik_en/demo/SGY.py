# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Catch Suspicious Logins',
    'problem': ('Password-guessing attacks are mixed in with normal logins in the company\'s login records. The model gives each login '
                'an anomaly score. Move the threshold or click the chart; what happens when the attacker adapts?'),
    'html': '''
<svg viewBox="0 0 390 284" width="390" height="284" role="img" aria-label="Anomaly score distribution of normal logins and attacks"></svg>
<div class="ai-side">
  <label>Alarm threshold = <b class="ai-e">6.0</b></label>
  <input type="range" min="0" max="18" step="0.5" value="6" aria-label="Alarm threshold">
  <div class="ai-ctl"><button type="button" data-u="1">Attacker adapts</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px">The score is how surprising a login is compared with normal behaviour: failed attempts, hour, new device, foreign country. The model learned from normal logins only.</div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), range = root.querySelector("input"), eEl = root.querySelector(".ai-e");
  var out = root.querySelectorAll(".ai-out")[0], uBtn = root.querySelector("[data-u]");
  var tohum = 21, uyum = false;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function gauss() { return Math.sqrt(-2 * Math.log(rnd())) * Math.cos(2 * Math.PI * rnd()); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt !== undefined) e.textContent = txt; return e; }
  function f(v, n) { return v.toFixed(n); }
  function saat(m, s) { var h = (m + s * gauss()) % 24; return h < 0 ? h + 24 : h; }
  function olagan() { return { hata: Math.floor(-Math.log(rnd()) * 0.45), saat: saat(13, 3.2), cihaz: rnd() < 0.05, ulke: rnd() < 0.02 }; }
  function saldiri() { return { hata: 1 + Math.floor(-Math.log(rnd()) * 5), saat: saat(15, 7), cihaz: rnd() < 0.9, ulke: rnd() < 0.6 }; }
  function sinsi() { return { hata: rnd() < 0.6 ? 0 : 1, saat: saat(13, 4), cihaz: rnd() < 0.85, ulke: rnd() < 0.08 }; }
  var egitim = []; for (var i = 0; i < 600; i++) egitim.push(olagan());
  var KMAX = 30, sayK = [], cihazP = 0, ulkeP = 0, ort = 0, sap = 0;
  for (var k = 0; k <= KMAX; k++) sayK.push(1);
  egitim.forEach(function (g) { sayK[Math.min(g.hata, KMAX)]++; if (g.cihaz) cihazP++; if (g.ulke) ulkeP++; ort += g.saat; });
  var topK = egitim.length + KMAX + 1;
  cihazP = (cihazP + 1) / (egitim.length + 2); ulkeP = (ulkeP + 1) / (egitim.length + 2); ort /= egitim.length;
  egitim.forEach(function (g) { sap += (g.saat - ort) * (g.saat - ort); }); sap = Math.sqrt(sap / egitim.length);
  function puan(g) {
    var dh = Math.abs(g.saat - ort); if (dh > 12) dh = 24 - dh;
    var z = dh / sap;
    return -Math.log(sayK[Math.min(g.hata, KMAX)] / topK) + z * z / 2 - Math.log(g.cihaz ? cihazP : 1 - cihazP) - Math.log(g.ulke ? ulkeP : 1 - ulkeP);
  }
  var normal = [], sal = [], salU = [];
  for (var a = 0; a < 300; a++) normal.push(puan(olagan()));
  for (var b = 0; b < 30; b++) { sal.push(puan(saldiri())); salU.push(puan(sinsi())); }
  var X0 = 10, X1 = 382, SMAX = 18, B = 36, Y0 = 134;
  function px(v) { return X0 + Math.min(v, SMAX) / SMAX * (X1 - X0); }
  function hist(d) { var h = []; for (var i = 0; i < B; i++) h.push(0); d.forEach(function (v) { h[Math.min(B - 1, Math.floor(Math.min(v, SMAX - 0.01) / SMAX * B))]++; }); return h; }
  function ciz() {
    var e = +range.value, at = uyum ? salU : sal, bw = (X1 - X0) / B;
    eEl.textContent = f(e, 1);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var hn = hist(normal), ha = hist(at), mn = Math.max.apply(null, hn), ma = Math.max(8, Math.max.apply(null, ha));
    var sag = mk("rect", { x: px(e), y: 4, width: X1 - px(e), height: 240 });
    sag.style.fill = "color-mix(in srgb, var(--ds-accent) 7%, var(--ds-bg))"; svg.appendChild(sag);
    hn.forEach(function (v, i) {
      if (!v) return;
      var h = Math.max(3, Math.sqrt(v / mn) * 108), x = X0 + i * bw, r = mk("rect", { x: x + 0.5, y: Y0 - h, width: bw - 1, height: h });
      r.style.fill = (i + 0.5) * SMAX / B >= e ? "#e9a23b" : "color-mix(in srgb, var(--ds-link) 55%, var(--ds-bg))";
      svg.appendChild(r);
    });
    ha.forEach(function (v, i) {
      if (!v) return;
      var h = v / ma * 92, x = X0 + i * bw, r = mk("rect", { x: x + 0.5, y: Y0 + 1, width: bw - 1, height: h });
      r.style.fill = (i + 0.5) * SMAX / B >= e ? "var(--ds-bad)" : "color-mix(in srgb, var(--ds-bad) 30%, var(--ds-bg))";
      svg.appendChild(r);
    });
    svg.appendChild(mk("path", { d: "M" + X0 + " " + Y0 + " H" + X1, "class": "axis" }));
    var el = mk("line", { x1: px(e), y1: 4, x2: px(e), y2: 244 }); el.style.stroke = "var(--ds-accent)"; el.style.strokeWidth = 2.5; svg.appendChild(el);
    var et = mk("text", { x: Math.min(px(e) + 4, 300), y: 14 }, "alarm →"); et.style.fontSize = "11px"; et.style.fill = "var(--ds-accent)"; et.style.fontWeight = 700; svg.appendChild(et);
    var t1 = mk("text", { x: X1, y: 28, "text-anchor": "end" }, "normal logins (300, sqrt scale)"); t1.style.fontSize = "11px"; t1.style.fill = "var(--ds-link)"; svg.appendChild(t1);
    var t2 = mk("text", { x: X1, y: 236, "text-anchor": "end" }, (uyum ? "adapted " : "") + "attacks (30)"); t2.style.fontSize = "11px"; t2.style.fill = "var(--ds-bad)"; svg.appendChild(t2);
    for (var k = 0; k <= SMAX; k += 3) {
      var tk = mk("text", { x: px(k), y: 260, "text-anchor": "middle", "class": "lbl" }, k + (k === SMAX ? "+" : "")); tk.style.fontSize = "10px"; svg.appendChild(tk);
    }
    var xl = mk("text", { x: (X0 + X1) / 2, y: 278, "text-anchor": "middle", "class": "lbl" }, "Anomaly score →"); xl.style.fontSize = "11px"; svg.appendChild(xl);
    var yak = at.filter(function (v) { return v >= e; }).length, ya = normal.filter(function (v) { return v >= e; }).length;
    out.innerHTML = "Attacks caught: <b>" + yak + " / 30</b> (" + Math.round(100 * yak / 30) + "%)<br>False alarms: <b>" + ya +
      "</b> normal logins (" + f(100 * ya / 300, 1) + "%)<br>" + (ya > 20 ? "The security team cannot review this many alarms." : (yak < 24 ? "Some attacks slip through." : "The threshold is well balanced."));
  }
  range.addEventListener("input", ciz);
  svg.addEventListener("click", function (ev) {
    var b = svg.getBoundingClientRect(), vx = (ev.clientX - b.left) / b.width * 390;
    var v = Math.round((vx - X0) / (X1 - X0) * SMAX * 2) / 2;
    range.value = Math.max(0, Math.min(SMAX, v)); ciz();
  });
  uBtn.addEventListener("click", function () { uyum = !uyum; uBtn.classList.toggle("is-on", uyum); ciz(); });
  ciz();
''',
    'not': ('AI in cybersecurity <b>learns what is normal and catches deviations</b>, so it also sees attacks with no known signature. But '
            'the opponent learns too: the model and its features must be updated continuously.'),
}
