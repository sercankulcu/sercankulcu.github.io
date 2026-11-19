# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Bir Küreyi Işıkla Boyamak',
    'problem': ('Oyun motoru her karede, ekrandaki her pikselin ne kadar parlak olacağını yüzey normali ile ışık yönünden hesaplar. '
                'Işığı kaydırıcılarla gezdirin, gölgelendirme yöntemini değiştirin, küreye tıklayıp bir pikselin hesabına bakın.'),
    'html': '''
<svg viewBox="0 0 290 290" width="290" height="290" role="img" aria-label="Piksel ızgarasında gölgelendirilmiş küre"></svg>
<div class="ai-side">
  <label>Işığın yatay açısı: <b class="ai-az">-40</b>°</label>
  <input type="range" class="ai-raz" min="-180" max="180" step="5" value="-40" aria-label="Işığın yatay açısı">
  <label>Işığın yüksekliği: <b class="ai-el">35</b>°</label>
  <input type="range" class="ai-rel" min="-30" max="90" step="5" value="35" aria-label="Işığın yüksekliği">
  <div class="ai-ctl"><button type="button" data-g="duz">Düz (yüz başına)</button><button type="button" data-g="yum" class="is-on">Yumuşak (piksel başına)</button><button type="button" data-p="1" class="is-on">Phong parlaması</button></div>
  <div class="ai-out"></div>
  <div class="ai-out ai-o2" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var raz = root.querySelector(".ai-raz"), rel = root.querySelector(".ai-rel");
  var N = 40, C = 7, OX = 5, OY = 5, R = N / 2 - 0.6;
  var gol = "yum", phong = true, sec = [13, 12];
  var LAT = 7, LON = 12, KA = 0.08, KD = 0.92, KS = 0.55, PAR = 24;
  function f(v, d) { return v.toFixed(d).replace(".", ","); }
  function mk(tag, at) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); return e; }
  var hucre = [];
  for (var j = 0; j < N; j++) for (var i = 0; i < N; i++) {
    var x = (i + 0.5 - N / 2) / R, y = (N / 2 - j - 0.5) / R;
    if (x * x + y * y > 1) continue;
    var r = mk("rect", { x: OX + i * C, y: OY + j * C, width: C, height: C, "shape-rendering": "crispEdges" });
    r.style.cursor = "pointer";
    (function (i, j) { r.addEventListener("click", function () { sec = [i, j]; ciz(); }); })(i, j);
    svg.appendChild(r);
    hucre.push({ i: i, j: j, x: x, y: y, z: Math.sqrt(1 - x * x - y * y), r: r });
  }
  var cer = mk("rect", { width: C, height: C, fill: "none", "stroke-width": 2 });
  cer.style.stroke = "var(--ds-link)"; cer.style.pointerEvents = "none";
  svg.appendChild(cer);
  var ok = mk("path", { "stroke-width": 2.5, fill: "none", "stroke-linecap": "round" });
  ok.style.stroke = "#e9a23b"; ok.style.pointerEvents = "none";
  svg.appendChild(ok);
  var gunes = mk("circle", { r: 8 });
  gunes.style.fill = "#e9a23b"; gunes.style.stroke = "var(--ds-bg)"; gunes.style.strokeWidth = 2; gunes.style.pointerEvents = "none";
  svg.appendChild(gunes);
  function birim(v) { var n = Math.hypot(v[0], v[1], v[2]); return [v[0] / n, v[1] / n, v[2] / n]; }
  function nokta(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function normal(h) {
    if (gol === "yum") return [h.x, h.y, h.z];
    var enl = Math.asin(h.y), boy = Math.atan2(h.x, h.z);
    var be = Math.PI / LAT, bb = Math.PI / LON;
    enl = (Math.floor(enl / be + LAT / 2) + 0.5 - LAT / 2) * be;
    boy = (Math.floor(boy / bb) + 0.5) * bb;
    return [Math.cos(enl) * Math.sin(boy), Math.sin(enl), Math.cos(enl) * Math.cos(boy)];
  }
  function isik(n, L) {
    var nl = nokta(n, L), d = Math.max(0, nl), s = 0;
    if (phong && nl > 0) {
      var rr = [2 * nl * n[0] - L[0], 2 * nl * n[1] - L[1], 2 * nl * n[2] - L[2]];
      s = Math.pow(Math.max(0, rr[2]), PAR);
    }
    return { nl: nl, d: d, s: s, I: KA + KD * d + KS * s };
  }
  function renk(I) {
    var t = Math.min(1, I), sp = Math.max(0, I - 1);
    var r = 40 + 190 * t, g = 85 + 115 * t, b = 140 + 95 * t;
    r += (255 - r) * Math.min(1, sp * 1.6); g += (255 - g) * Math.min(1, sp * 1.6); b += (255 - b) * Math.min(1, sp * 1.6);
    return "rgb(" + Math.round(r * 0.9 + 4) + "," + Math.round(g * 0.95) + "," + Math.round(b) + ")";
  }
  function ciz() {
    var az = +raz.value * Math.PI / 180, el = +rel.value * Math.PI / 180;
    root.querySelector(".ai-az").textContent = raz.value;
    root.querySelector(".ai-el").textContent = rel.value;
    var L = birim([Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az)]);
    var aydin = 0, secS = null;
    hucre.forEach(function (h) {
      var s = isik(normal(h), L);
      if (s.nl > 0) aydin++;
      h.r.style.fill = renk(s.I);
      if (h.i === sec[0] && h.j === sec[1]) secS = { h: h, s: s, n: normal(h) };
    });
    var mx = OX + N * C / 2, my = OY + N * C / 2, RR = R * C;
    var gx = mx + L[0] * (RR + 4), gy = my - L[1] * (RR + 4);
    gunes.setAttribute("cx", gx); gunes.setAttribute("cy", gy);
    gunes.style.opacity = L[2] < 0 ? 0.45 : 1;
    ok.setAttribute("d", "M" + (mx + L[0] * RR * 0.35) + " " + (my - L[1] * RR * 0.35) + " L" + (mx + L[0] * RR * 0.85) + " " + (my - L[1] * RR * 0.85));
    if (secS) {
      cer.setAttribute("x", OX + sec[0] * C); cer.setAttribute("y", OY + sec[1] * C);
      var n = secS.n, s = secS.s;
      outs[0].innerHTML = "Seçili piksel: N = (" + f(n[0], 2) + "; " + f(n[1], 2) + "; " + f(n[2], 2) + ")<br>" +
        "N·L = " + f(s.nl, 2) + (s.nl < 0 ? " &lt; 0, ışık arkadan geliyor" : "") + "<br>" +
        "I = " + f(KA, 2) + " + " + f(KD, 2) + "·" + f(s.d, 2) + (phong ? " + " + f(KS, 2) + "·" + f(s.s, 2) : "") +
        " = <b>" + f(s.I, 2) + "</b>";
    }
    outs[1].innerHTML = hucre.length + " pikselin <b>" + aydin + "</b> tanesi ışığa bakıyor (%" + f(100 * aydin / hucre.length, 0) + "). " +
      (gol === "duz" ? "Düz gölgelendirmede her yüzün tek normali var: kenarlar görünür." : "Normal her pikselde yeniden hesaplanır: yüzey pürüzsüz görünür.");
  }
  root.querySelectorAll("[data-g]").forEach(function (b) {
    b.addEventListener("click", function () {
      gol = b.dataset.g;
      root.querySelectorAll("[data-g]").forEach(function (x) { x.classList.toggle("is-on", x === b); });
      ciz();
    });
  });
  var pb = root.querySelector("[data-p]");
  pb.addEventListener("click", function () { phong = !phong; pb.classList.toggle("is-on", phong); ciz(); });
  raz.addEventListener("input", ciz);
  rel.addEventListener("input", ciz);
  ciz();
''',
    'not': ('Grafik dersi bu hesabı verir: <b>Lambert</b> yasası (I ∝ N·L), Phong parlaması ve normalin nerede hesaplanacağı. '
            'GPU aynı formülü milyonlarca piksel için her karede, paralel olarak çalıştırır.'),
}
