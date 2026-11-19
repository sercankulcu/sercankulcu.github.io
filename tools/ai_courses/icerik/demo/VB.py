# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Notları Ne Etkiliyor?',
    'problem': ('Okulun sorusu: “Öğrencilere hangi alışkanlık için öneri verelim?” Elde 26 öğrencinin anket ve not verisi var. '
                'Değişken seçip ilişkiye bakın; bir noktaya tıklayarak onu analizden çıkarın.'),
    'html': '''
<svg viewBox="0 0 380 290" width="380" height="290" role="img" aria-label="Seçilen iki değişkenin saçılım grafiği ve regresyon doğrusu"></svg>
<div class="ai-side">
  <label>Yatay eksen (x)</label>
  <select class="ai-x" aria-label="Yatay eksen"><option value="0" selected>Haftalık çalışma (saat)</option><option value="1">Gece uykusu (saat)</option><option value="2">Günlük telefon (saat)</option><option value="3">Derse devam (%)</option></select>
  <label>Dikey eksen (y)</label>
  <select class="ai-y" aria-label="Dikey eksen"><option value="4" selected>Dönem notu</option><option value="0">Haftalık çalışma (saat)</option><option value="1">Gece uykusu (saat)</option><option value="2">Günlük telefon (saat)</option></select>
  <div class="ai-ctl"><button type="button" data-o="1" class="is-on">Aykırı öğrenci dahil</button></div>
  <div class="ai-out"></div>
  <div class="ai-out ai-o2" style="font-size:13px"></div>
</div>''',
    'css': ('.ds-deck .ai-demo select { font: inherit; font-size: 13.5px; padding: 3px 6px; border: 1.5px solid var(--ds-border); '
            'border-radius: 8px; background: var(--ds-bg); color: var(--ds-text); margin-top: -4px; }'),
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var sx = root.querySelector(".ai-x"), sy = root.querySelector(".ai-y"), ob = root.querySelector("[data-o]");
  var AD = ["Çalışma (sa/hafta)", "Uyku (sa)", "Telefon (sa/gün)", "Devam (%)", "Not"];
  var KISA = ["çalışma", "uyku", "telefon", "devam", "not"];
  var tohum = 5;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function gauss() { return (rnd() + rnd() + rnd() - 1.5) / 0.5; }
  var veri = [];
  for (var i = 0; i < 25; i++) {
    var cal = 2 + rnd() * 16, uyku = 5.2 + rnd() * 3.4, tel = 1 + rnd() * 5.5;
    var dev = Math.min(100, 55 + 2 * cal + 8 * rnd());
    var not = 28 + 2.4 * cal + 3 * (uyku - 5) - 2.2 * tel + 4.5 * gauss();
    veri.push([cal, uyku, tel, dev, Math.max(5, Math.min(100, not))]);
  }
  veri.push([19, 7.5, 2, 96, 31]);
  var AYK = veri.length - 1, cik = {};
  function f(v, d) { return v.toFixed(d).replace(".", ","); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function istat(xi, yi, haric) {
    var p = veri.filter(function (v, i) { return !haric[i]; }), n = p.length, mx = 0, my = 0;
    p.forEach(function (v) { mx += v[xi]; my += v[yi]; }); mx /= n; my /= n;
    var sxy = 0, sxx = 0, syy = 0;
    p.forEach(function (v) { sxy += (v[xi] - mx) * (v[yi] - my); sxx += (v[xi] - mx) * (v[xi] - mx); syy += (v[yi] - my) * (v[yi] - my); });
    var b = sxy / sxx;
    return { n: n, r: sxy / Math.sqrt(sxx * syy), b: b, a: my - b * mx };
  }
  var X0 = 46, Y0 = 10, PW = 320, PH = 236;
  function ciz() {
    var xi = +sx.value, yi = +sy.value;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var xs = veri.map(function (v) { return v[xi]; }), ys = veri.map(function (v) { return v[yi]; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var dx = (x1 - x0) * 0.06 || 1, dy = (y1 - y0) * 0.06 || 1; x0 -= dx; x1 += dx; y0 -= dy; y1 += dy;
    function px(v) { return X0 + (v - x0) / (x1 - x0) * PW; }
    function py(v) { return Y0 + (1 - (v - y0) / (y1 - y0)) * PH; }
    for (var t = 0; t <= 4; t++) {
      var gy = Y0 + t * PH / 4, gv = y1 - t * (y1 - y0) / 4;
      svg.appendChild(mk("path", { d: "M" + X0 + " " + gy + " H" + (X0 + PW), "class": "grid" }));
      svg.appendChild(mk("text", { x: X0 - 5, y: gy + 4, "class": "lbl", "text-anchor": "end" }, f(gv, 0)));
      var gx = X0 + t * PW / 4, xv = x0 + t * (x1 - x0) / 4;
      svg.appendChild(mk("text", { x: gx, y: Y0 + PH + 15, "class": "lbl", "text-anchor": "middle" }, f(xv, xi === 1 ? 1 : 0)));
    }
    svg.appendChild(mk("path", { d: "M" + X0 + " " + Y0 + " V" + (Y0 + PH) + " H" + (X0 + PW), "class": "axis" }));
    svg.appendChild(mk("text", { x: X0 + PW / 2, y: Y0 + PH + 32, "class": "lbl", "text-anchor": "middle" }, AD[xi] + " →"));
    svg.appendChild(mk("text", { x: 12, y: Y0 + PH / 2, "class": "lbl", "text-anchor": "middle", transform: "rotate(-90 12 " + (Y0 + PH / 2) + ")" }, AD[yi] + " →"));
    var s = istat(xi, yi, cik);
    if (xi !== yi) {
      var kl = mk("clipPath", { id: "ai-vb-klip" });
      kl.appendChild(mk("rect", { x: X0, y: Y0, width: PW, height: PH }));
      svg.appendChild(kl);
      var cizgi = mk("path", { d: "M" + px(x0) + " " + py(s.a + s.b * x0) + " L" + px(x1) + " " + py(s.a + s.b * x1), "stroke-width": 2.5, "clip-path": "url(#ai-vb-klip)" });
      cizgi.style.stroke = "var(--ds-accent)";
      svg.appendChild(cizgi);
    }
    veri.forEach(function (v, i) {
      var c = mk("circle", { cx: px(v[xi]), cy: py(v[yi]), r: i === AYK ? 6 : 5, "stroke-width": 2 });
      c.style.cursor = "pointer";
      if (cik[i]) { c.style.fill = "none"; c.style.stroke = "var(--ds-muted)"; c.style.strokeDasharray = "2 2"; }
      else { c.style.fill = i === AYK ? "#e9a23b" : "var(--ds-link)"; c.style.stroke = "var(--ds-bg)"; c.style.fillOpacity = 0.85; }
      c.addEventListener("click", function (ev) { ev.stopPropagation(); if (cik[i]) delete cik[i]; else cik[i] = 1; ciz(); });
      svg.appendChild(c);
    });
    ob.classList.toggle("is-on", !cik[AYK]);
    ob.textContent = cik[AYK] ? "Aykırı öğrenci çıkarıldı" : "Aykırı öğrenci dahil";
    var tam = istat(xi, yi, {}), kok = {}; kok[AYK] = 1;
    var aykSiz = istat(xi, yi, kok);
    var guc = Math.abs(s.r) > 0.7 ? "güçlü" : Math.abs(s.r) > 0.4 ? "orta" : "zayıf";
    outs[0].innerHTML = "n = " + s.n + " öğrenci<br>Pearson r = <b>" + f(s.r, 2) + "</b> (" + guc + ", " + (s.r >= 0 ? "artı" : "eksi") + ")<br>" +
      "Doğru: " + KISA[yi] + " ≈ " + f(s.a, 1) + (s.b >= 0 ? " + " : " − ") + f(Math.abs(s.b), 2) + " × " + KISA[xi];
    outs[1].innerHTML = "Turuncu nokta sınavda hastalanan öğrenci. Onunla r = " + f(tam.r, 2) + ", onsuz r = " + f(aykSiz.r, 2) +
      ": tek bir kayıt sonucu değiştirebilir, önce veriyi tanıyın.";
  }
  sx.addEventListener("change", ciz);
  sy.addEventListener("change", ciz);
  ob.addEventListener("click", function () { if (cik[AYK]) delete cik[AYK]; else cik[AYK] = 1; ciz(); });
  ciz();
''',
    'not': ('Veri bilimi bir <b>soruyla</b> başlar ve karara varır: keşifsel analiz, temizleme, ilişki ölçme ve sonucu anlatma. '
            'Korelasyon neden değildir: çok çalışan öğrenci derse de çok gelir; öneri vermeden önce bunu ayırmak gerekir.'),
}
