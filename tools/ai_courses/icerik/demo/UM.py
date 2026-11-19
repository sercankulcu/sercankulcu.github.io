# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Gizil Uzaydan Yeni Yüzler',
    'problem': ('Bir oyun stüdyosu 60 çizgi yüzden yeni karakterler üretmek istiyor. Model her yüzü iki sayıya (z₁, z₂) '
                'sıkıştırmayı öğrendi; kaydırıcılarla ya da soldaki düzleme tıklayarak yeni yüz üretin.'),
    'html': '''
<svg viewBox="0 0 400 290" width="400" height="290" role="img" aria-label="Gizil uzay, üretilen yüz ve iki yüz arasında ara değerleme"></svg>
<div class="ai-side">
  <label>z₁ = <b class="ai-z1">0</b></label>
  <input type="range" class="ai-r1" min="-2.5" max="2.5" step="0.1" value="0" aria-label="Gizil değişken z1">
  <label>z₂ = <b class="ai-z2">0</b></label>
  <input type="range" class="ai-r2" min="-2.5" max="2.5" step="0.1" value="0" aria-label="Gizil değişken z2">
  <div class="ai-ctl"><button type="button" data-a="rnd">Rastgele yüz üret</button><button type="button" data-a="ab">A → B ara değerle</button></div>
  <div class="ai-out"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), out = root.querySelector(".ai-out");
  var r1 = root.querySelector(".ai-r1"), r2 = root.querySelector(".ai-r2");
  var z1El = root.querySelector(".ai-z1"), z2El = root.querySelector(".ai-z2");
  var tohum = 5;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function nrm() { return Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(2 * Math.PI * rnd()); }
  var D = 6, ORT = [0.5, 0.5, 0.5, 0.5, 0.3, 0.5];
  var L1 = [0.05, -0.08, -0.06, 0.2, 0.06, 0], L2 = [-0.03, 0.15, 0.15, -0.03, 0.14, 0.03];
  var X = [];
  for (var n = 0; n < 60; n++) {
    var a = nrm(), b = nrm(), x = [];
    for (var d = 0; d < D; d++) x.push(ORT[d] + a * L1[d] + b * L2[d] + 0.025 * nrm());
    X.push(x);
  }
  var mu = [];
  for (var d1 = 0; d1 < D; d1++) { var s = 0; X.forEach(function (x) { s += x[d1]; }); mu.push(s / X.length); }
  var C = [];
  for (var i = 0; i < D; i++) { C.push([]); for (var j = 0; j < D; j++) {
    var t = 0; X.forEach(function (x) { t += (x[i] - mu[i]) * (x[j] - mu[j]); }); C[i].push(t / X.length); } }
  var iz = 0; for (var k0 = 0; k0 < D; k0++) iz += C[k0][k0];
  function carp(M, v) { return M.map(function (row) { var s = 0; row.forEach(function (c, j) { s += c * v[j]; }); return s; }); }
  function ic(u, v) { var s = 0; u.forEach(function (c, j) { s += c * v[j]; }); return s; }
  var V = [], LAM = [];
  for (var bil = 0; bil < 2; bil++) {
    var v = [1, 0.5, 0.3, 0.8, 0.2, 0.1];
    for (var it = 0; it < 200; it++) {
      v = carp(C, v);
      V.forEach(function (u) { var p = ic(u, v); v = v.map(function (c, j) { return c - p * u[j]; }); });
      var nn = Math.sqrt(ic(v, v)); v = v.map(function (c) { return c / nn; });
    }
    if ((bil === 0 && v[3] < 0) || (bil === 1 && v[1] < 0)) v = v.map(function (c) { return -c; });
    V.push(v); LAM.push(ic(v, carp(C, v)));
  }
  var aciklanan = (LAM[0] + LAM[1]) / iz;
  function kodla(x) { return [0, 1].map(function (k) { return ic(x.map(function (c, j) { return c - mu[j]; }), V[k]) / Math.sqrt(LAM[k]); }); }
  function uret(z) {
    return mu.map(function (m, j) { var y = m + z[0] * Math.sqrt(LAM[0]) * V[0][j] + z[1] * Math.sqrt(LAM[1]) * V[1][j]; return Math.min(1, Math.max(0, y)); });
  }
  var kodlar = X.map(kodla);
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function yuz(g, cx, cy, s, p) {
    var rx = s * (0.72 + 0.3 * p[0]);
    var bas = mk("ellipse", { cx: cx, cy: cy, rx: rx, ry: s });
    bas.style.fill = "color-mix(in srgb, #e9a23b 30%, var(--ds-bg))"; bas.style.stroke = "var(--ds-text)"; bas.style.strokeWidth = Math.max(1, s / 30);
    g.appendChild(bas);
    var gx = s * (0.22 + 0.16 * p[5]), gr = s * (0.04 + 0.15 * p[1]), gy = cy - s * 0.2, ka = (p[2] - 0.5) * 0.9;
    [-1, 1].forEach(function (yon) {
      var e = mk("circle", { cx: cx + yon * gx, cy: gy, r: gr }); e.style.fill = "var(--ds-text)"; g.appendChild(e);
      var kx = cx + yon * gx, ky = gy - gr - s * 0.12, kl = s * 0.2;
      var dx = kl * Math.cos(ka), dy = kl * Math.sin(ka);
      var kas = mk("path", { d: "M" + (kx - yon * dx) + " " + (ky + dy) + " L" + (kx + yon * dx) + " " + (ky - dy) });
      kas.style.stroke = "var(--ds-text)"; kas.style.strokeWidth = Math.max(1.2, s / 18); kas.style.strokeLinecap = "round"; g.appendChild(kas);
    });
    var my = cy + s * 0.42, mw = s * 0.34, eg = (p[3] - 0.5) * s * 0.7, ac = p[4] * s * 0.3;
    var agiz = mk("path", { d: "M" + (cx - mw) + " " + my + " Q" + cx + " " + (my + eg) + " " + (cx + mw) + " " + my +
      " Q" + cx + " " + (my + eg + ac * 2) + " " + (cx - mw) + " " + my + " Z" });
    agiz.style.fill = "color-mix(in srgb, var(--ds-bad) 55%, var(--ds-bg))"; agiz.style.stroke = "var(--ds-text)"; agiz.style.strokeWidth = Math.max(1, s / 30);
    g.appendChild(agiz);
  }
  var LX = 6, LY = 22, LS = 168;
  function lx(z) { return LX + (z + 3) / 6 * LS; }
  function ly(z) { return LY + (3 - z) / 6 * LS; }
  var z = [0.6, -0.4], A = [-1.4, -0.7], B = [1.3, 1.1], timer = null;
  function ciz() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var cer = mk("rect", { x: LX, y: LY, width: LS, height: LS, rx: 6, "class": "box" }); svg.appendChild(cer);
    cer.style.cursor = "crosshair";
    cer.addEventListener("click", function (ev) {
      var bb = svg.getBoundingClientRect();
      var vx = (ev.clientX - bb.left) / bb.width * 400, vy = (ev.clientY - bb.top) / bb.height * 290;
      dur(); z = [Math.round(((vx - LX) / LS * 6 - 3) * 10) / 10, Math.round((3 - (vy - LY) / LS * 6) * 10) / 10]; ciz();
    });
    svg.appendChild(mk("text", { x: LX, y: 14, "class": "lbl" }, "Gizil uzay (tıklayın)"));
    svg.appendChild(mk("text", { x: LX + LS - 4, y: LY + LS - 6, "text-anchor": "end", "class": "lbl" }, "z₁ →"));
    svg.appendChild(mk("text", { x: LX + 6, y: LY + 14, "class": "lbl" }, "z₂ ↑"));
    var ex = mk("path", { d: "M" + lx(0) + " " + LY + " V" + (LY + LS) + " M" + LX + " " + ly(0) + " H" + (LX + LS), "class": "grid" });
    ex.style.pointerEvents = "none"; svg.appendChild(ex);
    kodlar.forEach(function (c) {
      var e = mk("circle", { cx: lx(c[0]), cy: ly(c[1]), r: 2.4 }); e.style.fill = "var(--ds-muted)"; e.style.pointerEvents = "none"; svg.appendChild(e);
    });
    var ab = mk("path", { d: "M" + lx(A[0]) + " " + ly(A[1]) + " L" + lx(B[0]) + " " + ly(B[1]), "class": "line" });
    ab.style.strokeDasharray = "4 3"; ab.style.pointerEvents = "none"; svg.appendChild(ab);
    [[A, "A"], [B, "B"]].forEach(function (q) {
      var t = mk("text", { x: lx(q[0][0]), y: ly(q[0][1]) + 4, "text-anchor": "middle", "class": "txt" }, q[1]);
      t.style.fontSize = "12px"; t.style.fill = "var(--ds-link)"; t.style.fontWeight = 700; t.style.pointerEvents = "none"; svg.appendChild(t);
    });
    var m = mk("circle", { cx: lx(z[0]), cy: ly(z[1]), r: 6 });
    m.style.fill = "var(--ds-accent)"; m.style.stroke = "var(--ds-bg)"; m.style.strokeWidth = 2; m.style.pointerEvents = "none"; svg.appendChild(m);
    var p = uret(z);
    yuz(svg, 295, 108, 82, p);
    svg.appendChild(mk("text", { x: 6, y: 216, "class": "lbl" }, "A’dan B’ye ara değerleme:"));
    for (var i = 0; i < 7; i++) {
      var t = i / 6;
      yuz(svg, 30 + i * 57, 254, 24, uret([A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])]));
    }
    r1.value = z[0]; r2.value = z[1];
    z1El.textContent = z[0].toFixed(1).replace(".", ","); z2El.textContent = z[1].toFixed(1).replace(".", ",");
    var yak = 1e9; X.forEach(function (x) { var s = 0; x.forEach(function (c, j) { s += (c - p[j]) * (c - p[j]); }); yak = Math.min(yak, Math.sqrt(s)); });
    out.innerHTML = "İki sayı → 6 yüz ölçüsü. Gülümseme <b>" + p[3].toFixed(2).replace(".", ",") + "</b>, göz boyu <b>" +
      p[1].toFixed(2).replace(".", ",") + "</b>, ağız açıklığı <b>" + p[4].toFixed(2).replace(".", ",") + "</b>.<br>" +
      "En yakın eğitim yüzüne uzaklık " + yak.toFixed(2).replace(".", ",") + (yak > 0.06 ? ": <b>yeni bir yüz</b>." : ": eğitim yüzüne çok yakın.") +
      "<br><span style=\"font-size:13px\">İki boyut, verideki çeşitliliğin %" + Math.round(100 * aciklanan) + "’ini taşıyor.</span>";
  }
  function dur() { if (timer) { clearInterval(timer); timer = null; } }
  r1.addEventListener("input", function () { dur(); z = [+r1.value, z[1]]; ciz(); });
  r2.addEventListener("input", function () { dur(); z = [z[0], +r2.value]; ciz(); });
  root.querySelector("[data-a=rnd]").addEventListener("click", function () {
    dur(); A = B; B = [Math.max(-2.5, Math.min(2.5, Math.round(nrm() * 10) / 10)), Math.max(-2.5, Math.min(2.5, Math.round(nrm() * 10) / 10))]; z = B.slice(); ciz();
  });
  root.querySelector("[data-a=ab]").addEventListener("click", function () {
    dur(); var adim = 0;
    timer = setInterval(function () {
      var t = adim / 30; z = [A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])]; ciz();
      if (++adim > 30) dur();
    }, 50);
  });
  ciz();
''',
    'not': ('Model yüzleri ezberlemedi; verinin <b>gizil yapısını</b> öğrendi. Düzlemdeki her nokta yeni ama inandırıcı bir yüz '
            'verir; VAE ve difüzyon aynı fikri milyonlarca boyuta taşır.'),
}
