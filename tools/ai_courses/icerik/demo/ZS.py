# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Gelecek Yazın Dondurma Siparişi',
    'problem': ('Bir dondurma üreticisi, son üç yılın aylık satışına bakıp gelecek ayların üretimini planlıyor. '
                'Bir yöntem ve ufuk seçin; son yılın gerçek satışları saklanmış, tahmin onlarla ölçülür.'),
    'html': '''
<svg viewBox="0 0 390 270" width="390" height="270" role="img" aria-label="Aylık dondurma satışları ve tahmin"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-y="naif">Naif</button><button type="button" data-y="ho">Hareketli ort.</button><button type="button" data-y="mn">Mevsimsel naif</button><button type="button" data-y="hw" class="is-on">Holt-Winters</button></div>
  <label>Tahmin ufku: <b class="ai-h">12</b> ay</label>
  <input type="range" min="1" max="12" step="1" value="12" aria-label="Tahmin ufku">
  <div class="ai-out"></div>
  <div class="ai-out ai-tab" style="font-size:13px"></div>
</div>''',
    'css': '''
.ds-deck .ai-demo .ai-tab table { width: 100%; border-collapse: collapse; margin: 0; font-size: 13.5px; }
.ds-deck .ai-demo .ai-tab td { padding: 1px 4px; border: 0; font-size: 13.5px; background: none; }
.ds-deck .ai-demo .ai-tab td:last-child { text-align: right; }
''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var range = root.querySelector("input"), hEl = root.querySelector(".ai-h"), yBtn = root.querySelectorAll("[data-y]");
  var tohum = 11;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  var mevsim = [-38, -34, -22, -6, 14, 34, 48, 44, 18, -8, -26, -36];
  var seri = [];
  for (var t = 0; t < 48; t++) seri.push(Math.round(80 + 0.9 * t + mevsim[t % 12] * (1 + t / 90) + (rnd() - 0.5) * 16));
  var T0 = 36, yon = "hw";
  var adi = { naif: "Naif", ho: "Hareketli ortalama (3 ay)", mn: "Mevsimsel naif", hw: "Holt-Winters" };
  function tahmin(y, h) {
    var x = seri.slice(0, T0), f = [], i;
    if (y === "naif") for (i = 0; i < h; i++) f.push(x[T0 - 1]);
    if (y === "ho") { var m = (x[T0 - 1] + x[T0 - 2] + x[T0 - 3]) / 3; for (i = 0; i < h; i++) f.push(m); }
    if (y === "mn") for (i = 0; i < h; i++) f.push(x[T0 - 12 + (i % 12)]);
    if (y === "hw") {
      var a = 0.3, b = 0.05, g = 0.3, s = [], L = 0, B;
      for (i = 0; i < 12; i++) L += x[i] / 12;
      var L2 = 0; for (i = 12; i < 24; i++) L2 += x[i] / 12;
      B = (L2 - L) / 12;
      for (i = 0; i < 12; i++) s.push(x[i] - L);
      for (i = 12; i < T0; i++) {
        var eL = L;
        L = a * (x[i] - s[i - 12]) + (1 - a) * (L + B);
        B = b * (L - eL) + (1 - b) * B;
        s.push(g * (x[i] - L) + (1 - g) * s[i - 12]);
      }
      for (i = 0; i < h; i++) f.push(L + (i + 1) * B + s[T0 - 12 + (i % 12)]);
    }
    return f;
  }
  function mae(f) { var e = 0; for (var i = 0; i < f.length; i++) e += Math.abs(f[i] - seri[T0 + i]); return e / f.length; }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt != null) e.textContent = txt; return e; }
  var X0 = 40, Y0 = 8, PW = 342, PH = 222, YMAX = 220;
  function px(i) { return X0 + i / 47 * PW; }
  function py(v) { return Y0 + (1 - v / YMAX) * PH; }
  function yol(arr, ofs) { return arr.map(function (v, i) { return (i ? "L" : "M") + px(i + ofs).toFixed(1) + " " + py(v).toFixed(1); }).join(" "); }
  function f1(x) { return x.toFixed(1).replace(".", ","); }
  function ciz() {
    var h = +range.value; hEl.textContent = h;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var test = mk("rect", { x: px(T0 - 0.5), y: Y0, width: px(T0 + h - 0.5) - px(T0 - 0.5), height: PH });
    test.style.fill = "color-mix(in srgb, #e9a23b 14%, var(--ds-bg))"; svg.appendChild(test);
    [0, 50, 100, 150, 200].forEach(function (v) {
      svg.appendChild(mk("path", { d: "M" + X0 + " " + py(v) + " H" + (X0 + PW), "class": "grid" }));
      svg.appendChild(mk("text", { x: X0 - 5, y: py(v) + 4, "class": "lbl", "text-anchor": "end" }, v));
    });
    for (var yy = 0; yy < 4; yy++) svg.appendChild(mk("text", { x: px(yy * 12 + 5.5), y: Y0 + PH + 16, "class": "lbl", "text-anchor": "middle" }, (2022 + yy) + ""));
    svg.appendChild(mk("path", { d: "M" + X0 + " " + Y0 + " V" + (Y0 + PH) + " H" + (X0 + PW), "class": "axis" }));
    svg.appendChild(mk("text", { x: px(T0 + 0.5), y: Y0 + 14, "class": "lbl" }, "saklanan yıl"));
    svg.appendChild(mk("text", { x: X0 + 4, y: Y0 + PH + 34, "class": "lbl" }, "Satış (bin kutu), aylık"));
    var gercek = mk("path", { d: yol(seri.slice(0, T0 + 1), 0), fill: "none" });
    gercek.style.stroke = "var(--ds-link)"; gercek.style.strokeWidth = 2; svg.appendChild(gercek);
    var gizli = mk("path", { d: yol(seri.slice(T0), T0), fill: "none", "stroke-dasharray": "2 3" });
    gizli.style.stroke = "var(--ds-link)"; gizli.style.strokeWidth = 1.6; gizli.style.opacity = 0.75; svg.appendChild(gizli);
    var f = tahmin(yon, h);
    var tp = mk("path", { d: yol([seri[T0 - 1]].concat(f), T0 - 1), fill: "none" });
    tp.style.stroke = "var(--ds-accent)"; tp.style.strokeWidth = 2.6; svg.appendChild(tp);
    f.forEach(function (v, i) {
      var c = mk("circle", { cx: px(T0 + i), cy: py(v), r: 3 }); c.style.fill = "var(--ds-accent)"; svg.appendChild(c);
      var e = mk("path", { d: "M" + px(T0 + i) + " " + py(v) + " V" + py(seri[T0 + i]), "class": "line" }); e.style.opacity = 0.5; svg.appendChild(e);
    });
    var m = mae(f), ort = 0;
    for (var i = 0; i < h; i++) ort += seri[T0 + i] / h;
    outs[0].innerHTML = adi[yon] + ", " + h + " ay ileri:<br>MAE = <b>" + f1(m) + "</b> bin kutu (ortalama satışın %" + f1(100 * m / ort) + "'i)";
    var sat = ["naif", "ho", "mn", "hw"].map(function (y) { return [y, mae(tahmin(y, h))]; });
    var en = sat.reduce(function (a, b) { return b[1] < a[1] ? b : a; });
    outs[1].innerHTML = "<table>" + sat.map(function (r) {
      var s = r[0] === en[0] ? "<b>" + f1(r[1]) + "</b>" : f1(r[1]);
      return "<tr><td>" + adi[r[0]] + "</td><td>" + s + "</td></tr>";
    }).join("") + "</table>";
  }
  yBtn.forEach(function (b) { b.addEventListener("click", function () { yon = b.getAttribute("data-y"); yBtn.forEach(function (o) { o.classList.toggle("is-on", o === b); }); ciz(); }); });
  range.addEventListener("input", ciz);
  ciz();
''',
    'not': ('Naif ve hareketli ortalama mevsimi göremez: yazın düz bir çizgi çizerler. Mevsimsel yöntemler geçen yılın biçimini taşır; '
            'Holt-Winters buna büyüme eğilimini de ekler.'),
}
