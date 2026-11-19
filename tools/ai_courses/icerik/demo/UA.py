# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Orman Kaybını Uydudan Ölçmek',
    'problem': ('Aynı bölgenin iki tarihli uydu görüntüsünde kırmızı ve yakın kızılötesi (YKÖ) bantlar var. '
                'NDVI ile bitki örtüsünü bulun, eşiği kaydırın ve kaç hektar ormanın kaybolduğunu ölçün; bir piksele tıklayıp değerine bakın.'),
    'html': '''
<svg viewBox="0 0 390 252" width="390" height="252" role="img" aria-label="İki tarihli uydu görüntüsü"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-g="renk">Görüntü</button><button type="button" data-g="ndvi">NDVI</button><button type="button" data-g="degisim" class="is-on">Değişim</button><button type="button" data-b="1">Bulutu ayıkla</button></div>
  <label>Bitki eşiği: NDVI ≥ <b class="ai-t">0,50</b></label>
  <input type="range" min="0" max="80" value="50" aria-label="NDVI eşiği">
  <div class="ai-out"></div>
  <div class="ai-out ai-pik" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), out = root.querySelector(".ai-out"), pikOut = root.querySelector(".ai-pik");
  var range = root.querySelector("input"), tEl = root.querySelector(".ai-t");
  var gBtn = root.querySelectorAll("[data-g]"), bBtn = root.querySelector("[data-b]");
  var N = 48, C = 3.75, Y0 = 16, XS = [4, 204];
  var gorunum = "degisim", bulutAyikla = false, sec = [33, 13];
  var tohum = 13;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  var ORMAN = [0.04, 0.08, 0.40, 0.03], EKIN = [0.07, 0.13, 0.34, 0.05], KURU = [0.15, 0.15, 0.27, 0.09], TOPRAK = [0.22, 0.19, 0.27, 0.14];
  var SU = [0.04, 0.07, 0.03, 0.14], KENT = [0.25, 0.24, 0.27, 0.2], KESIM = [0.19, 0.16, 0.25, 0.12], BULUT = [0.58, 0.6, 0.62, 0.6];
  var T = [[], []], x, y, i;
  for (y = 0; y < N; y++) for (x = 0; x < N; x++) {
    var ort = ORMAN, sonra = null;
    var nehir = 30 + 0.35 * (x - 24) + 2.5 * Math.sin(x / 5);
    if (x < 22 && y > 26) { var p = (Math.floor(x / 7) + Math.floor((y - 27) / 7)) % 3; ort = p === 0 ? EKIN : (p === 1 ? TOPRAK : KURU); }
    if (x > 36 && y > 36) ort = KENT;
    if (Math.abs(y - nehir) < 1.8) ort = SU;
    if (ort === ORMAN) {
      if ((x - 32) * (x - 32) / 64 + (y - 12) * (y - 12) / 30 <= 1) sonra = KESIM;
      if (x >= 12 && x <= 20 && y >= 6 && y <= 15) sonra = KESIM;
      if (Math.abs(x - 0.6 * y - 18) <= 0.8 && y < 24) sonra = KESIM;
    }
    var b2 = Math.pow((x - 40) / 6.5, 2) + Math.pow((y - 27) / 4.5, 2);
    var k1 = 0.9 + 0.2 * rnd(), k2 = 0.9 + 0.2 * rnd();
    var o2 = sonra || ort;
    var a1 = [ort[0] * k1, ort[1] * k1, ort[2] * (0.9 + 0.2 * rnd()), ort[3] * k1];
    var a2 = [o2[0] * k2, o2[1] * k2, o2[2] * (0.9 + 0.2 * rnd()), o2[3] * k2];
    if (b2 <= 1) a2 = BULUT.map(function (v) { return v * (0.95 + 0.05 * rnd()); });
    else if (b2 <= 1.3) { var w = (1.3 - b2) / 0.3; a2 = a2.map(function (v, j) { return v * (1 - w) + BULUT[j] * w; }); }
    T[0].push(a1); T[1].push(a2);
  }
  function ndvi(p) { return (p[2] - p[0]) / (p[2] + p[0]); }
  var bulutlu = [];
  for (i = 0; i < N * N; i++) {
    var bv = false;
    for (var dy = -2; dy <= 2; dy++) for (var dx = -2; dx <= 2; dx++) {
      var qx = i % N + dx, qy = Math.floor(i / N) + dy;
      if (qx >= 0 && qy >= 0 && qx < N && qy < N && T[1][qy * N + qx][3] > 0.25) bv = true;
    }
    bulutlu.push(bv);
  }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var k in at) e.setAttribute(k, at[k]); if (txt) e.textContent = txt; return e; }
  var hs = [[], []], basl = [];
  [0, 1].forEach(function (t) {
    var g = mk("g", { "shape-rendering": "crispEdges" });
    for (var j = 0; j < N * N; j++) {
      var r = mk("rect", { x: XS[t] + (j % N) * C, y: Y0 + Math.floor(j / N) * C, width: C + 0.3, height: C + 0.3 });
      g.appendChild(r); hs[t].push(r);
    }
    svg.appendChild(g);
    var bt = mk("text", { x: XS[t], y: 11, "class": "lbl" }, "");
    svg.appendChild(bt); basl.push(bt);
  });
  var secK = mk("rect", { width: C + 3, height: C + 3 });
  secK.style.fill = "none"; secK.style.stroke = "#e9a23b"; secK.style.strokeWidth = 2;
  var secK2 = secK.cloneNode();
  svg.appendChild(secK); svg.appendChild(secK2);
  var lej = mk("g", {});
  svg.appendChild(lej);
  function ramp(v) {
    var D = [[-0.3, [70, 110, 170]], [0.05, [150, 120, 80]], [0.3, [225, 210, 140]], [0.55, [120, 180, 90]], [0.9, [20, 105, 50]]];
    if (v <= D[0][0]) return D[0][1];
    for (var j = 1; j < D.length; j++) if (v <= D[j][0]) {
      var f = (v - D[j - 1][0]) / (D[j][0] - D[j - 1][0]);
      return D[j][1].map(function (c, k) { return Math.round(D[j - 1][1][k] * (1 - f) + c * f); });
    }
    return D[D.length - 1][1];
  }
  function rgb(c) { return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")"; }
  function v2(p) { return [Math.min(255, Math.round(p[0] * 700)), Math.min(255, Math.round(p[1] * 620)), Math.min(255, Math.round(p[3] * 700))]; }
  function sw(x0, renk, yazi) {
    var r = mk("rect", { x: x0, y: 205, width: 12, height: 12, rx: 2 });
    r.style.fill = renk; lej.appendChild(r);
    lej.appendChild(mk("text", { x: x0 + 16, y: 215, "class": "lbl" }, yazi));
  }
  function fmt(v, d) { return v.toFixed(d).replace(".", ","); }
  function ciz() {
    var esik = +range.value / 100;
    tEl.textContent = fmt(esik, 2);
    gBtn.forEach(function (b) { b.classList.toggle("is-on", b.getAttribute("data-g") === gorunum); });
    bBtn.classList.toggle("is-on", bulutAyikla);
    var b1 = 0, bit2 = 0, kayip = 0, kazanc = 0, bulutN = 0, gecerli = 0;
    for (i = 0; i < N * N; i++) {
      var p1 = T[0][i], p2 = T[1][i], n1 = ndvi(p1), n2 = ndvi(p2), v1 = n1 >= esik, vv2 = n2 >= esik;
      var bl = bulutAyikla && bulutlu[i];
      if (bl) bulutN++;
      else { gecerli++; if (v1) b1++; if (vv2) bit2++; if (v1 && !vv2) kayip++; if (!v1 && vv2) kazanc++; }
      if (gorunum === "renk") { hs[0][i].style.fill = rgb(v2(p1)); hs[1][i].style.fill = rgb(v2(p2)); }
      else if (gorunum === "ndvi") { hs[0][i].style.fill = rgb(ramp(n1)); hs[1][i].style.fill = rgb(ramp(n2)); }
      else {
        hs[0][i].style.fill = v1 ? "color-mix(in srgb, var(--ds-good) 70%, var(--ds-bg))" : "color-mix(in srgb, var(--ds-muted) 18%, var(--ds-bg))";
        hs[1][i].style.fill = bl ? "color-mix(in srgb, var(--ds-muted) 55%, var(--ds-bg))" :
          (v1 && !vv2 ? "var(--ds-bad)" : (!v1 && vv2 ? "var(--ds-link)" : (v1 ? "color-mix(in srgb, var(--ds-good) 35%, var(--ds-bg))" : "color-mix(in srgb, var(--ds-muted) 18%, var(--ds-bg))")));
      }
    }
    basl[0].textContent = gorunum === "degisim" ? "2019: bitki örtüsü" : "2019";
    basl[1].textContent = gorunum === "degisim" ? "2019 → 2024 değişim" : "2024";
    while (lej.firstChild) lej.removeChild(lej.firstChild);
    if (gorunum === "degisim") {
      sw(XS[0], "color-mix(in srgb, var(--ds-good) 70%, var(--ds-bg))", "bitki");
      sw(XS[1], "var(--ds-bad)", "kayıp");
      sw(XS[1] + 64, "var(--ds-link)", "kazanç");
      sw(XS[1] + 136, "color-mix(in srgb, var(--ds-muted) 55%, var(--ds-bg))", "bulut");
    } else if (gorunum === "ndvi") {
      for (var j = 0; j < 60; j++) {
        var r = mk("rect", { x: XS[0] + j * 6, y: 204, width: 6.3, height: 12 });
        r.style.fill = rgb(ramp(-0.3 + j * 1.2 / 60)); lej.appendChild(r);
      }
      var ex = XS[0] + (esik + 0.3) / 1.2 * 360;
      var m = mk("path", { d: "M" + ex + " 200 V220" }); m.style.stroke = "var(--ds-accent)"; m.style.strokeWidth = 2.5; lej.appendChild(m);
      [-0.2, 0, 0.2, 0.4, 0.6, 0.8].forEach(function (v) { lej.appendChild(mk("text", { x: XS[0] + (v + 0.3) / 1.2 * 360, y: 232, "text-anchor": "middle", "class": "lbl" }, fmt(v, 1))); });
    } else {
      lej.appendChild(mk("text", { x: XS[0], y: 215, "class": "lbl" }, "Yaklaşık doğal renk: koyu yeşil orman, mavi nehir, beyaz bulut."));
    }
    var ha = 0.09;
    out.innerHTML = "Bitki örtüsü: %" + Math.round(b1 / gecerli * 100) + " → %" + Math.round(bit2 / gecerli * 100) + "<br>" +
      "Kaybolan: <b>" + fmt(kayip * ha, 1) + " ha</b> (2019 örtüsünün <b>%" + Math.round(kayip / Math.max(1, b1) * 100) + "</b>’i)<br>" +
      "Kazanılan: " + fmt(kazanc * ha, 1) + " ha" + (bulutN ? "<br>Bulutlu " + bulutN + " piksel hesaba katılmadı." : "");
    var s = sec[1] * N + sec[0];
    secK.setAttribute("x", XS[0] + sec[0] * C - 1.5); secK.setAttribute("y", Y0 + sec[1] * C - 1.5);
    secK2.setAttribute("x", XS[1] + sec[0] * C - 1.5); secK2.setAttribute("y", Y0 + sec[1] * C - 1.5);
    pikOut.innerHTML = "Seçili piksel (30×30 m), NDVI = (YKÖ − K) / (YKÖ + K):<br>" +
      [0, 1].map(function (t) { var p = T[t][s]; return (t ? "2024" : "2019") + ": (" + fmt(p[2], 2) + " − " + fmt(p[0], 2) + ") / (" + fmt(p[2], 2) + " + " + fmt(p[0], 2) + ") = <b>" + fmt(ndvi(p), 2) + "</b>"; }).join("<br>");
  }
  svg.addEventListener("click", function (ev) {
    var bb = svg.getBoundingClientRect();
    var vx = (ev.clientX - bb.left) / bb.width * 390, vy = (ev.clientY - bb.top) / bb.height * 252;
    var t = vx >= XS[1] ? 1 : 0, cx = Math.floor((vx - XS[t]) / C), cy = Math.floor((vy - Y0) / C);
    if (cx < 0 || cy < 0 || cx >= N || cy >= N) return;
    sec = [cx, cy]; ciz();
  });
  gBtn.forEach(function (b) { b.addEventListener("click", function () { gorunum = b.getAttribute("data-g"); ciz(); }); });
  bBtn.addEventListener("click", function () { bulutAyikla = !bulutAyikla; ciz(); });
  range.addEventListener("input", ciz);
  ciz();
''',
    'not': ('Uzaktan algılama, gözün görmediği bantları <b>fiziksel bir göstergeye</b> çevirir. Ders, bant oranlarını, '
            'bulut gibi bozucuları ayıklamayı ve değişimi alan olarak ölçmeyi öğretir.'),
}
