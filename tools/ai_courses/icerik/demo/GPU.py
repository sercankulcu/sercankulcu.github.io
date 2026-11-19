# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Binlerce Sayıyı Birlikte Topla',
    'problem': ('Bir ağın kaybını hesaplamak için milyonlarca sayı toplanır; GPU bunu ağaç biçiminde, çiftleri aynı anda toplayarak yapar. '
                'İş parçacığı sayısını değiştirin, adım adım izleyin; Amdahl yasası sınırı gösterir.'),
    'html': '''
<svg viewBox="0 0 390 288" width="390" height="288" role="img" aria-label="Ağaç biçiminde paralel toplama ve Amdahl eğrisi"></svg>
<div class="ai-side">
  <label>İş parçacığı sayısı p = <b class="ai-p">4</b></label>
  <input type="range" class="ai-rp" min="0" max="4" step="1" value="2" aria-label="İş parçacığı sayısı">
  <label>Programın seri kısmı = <b class="ai-s">%10</b></label>
  <input type="range" class="ai-rs" min="1" max="50" step="1" value="10" aria-label="Seri kısım oranı">
  <div class="ai-ctl"><button type="button" data-o="1">Adım adım oynat</button></div>
  <div class="ai-out"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), rp = root.querySelector(".ai-rp"), rs = root.querySelector(".ai-rs");
  var pEl = root.querySelector(".ai-p"), sEl = root.querySelector(".ai-s"), out = root.querySelector(".ai-out");
  var PLER = [1, 2, 4, 8, 16], N = 16, tohum = 3, timer = null, adimGoster = 99;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt !== undefined) e.textContent = txt; return e; }
  function f(v, n) { return v.toFixed(n).replace(".", ","); }
  var RENK = ["var(--ds-link)", "#e9a23b", "var(--ds-good)", "var(--ds-accent)", "#9b6bd6", "#2bb3b3", "#c46ab0", "#8a9a3a"];
  var deger = []; for (var i = 0; i < N; i++) deger.push(1 + Math.floor(rnd() * 9));
  function plan(p) {
    var duzey = [deger.map(function (v, i) { return { v: v, x: 12 + (i + 0.5) * 366 / N, adim: 0, is: -1 }; })], adim = 0;
    while (duzey[duzey.length - 1].length > 1) {
      var ust = duzey[duzey.length - 1], yeni = [];
      for (var j = 0; j < ust.length / 2; j++) {
        var a = ust[2 * j], b = ust[2 * j + 1];
        yeni.push({ v: a.v + b.v, x: (a.x + b.x) / 2, adim: adim + Math.floor(j / p) + 1, is: j % p, a: a, b: b });
      }
      adim += Math.ceil(yeni.length / p);
      duzey.push(yeni);
    }
    return { duzey: duzey, adim: adim };
  }
  function hiz(s, p) { return 1 / (s + (1 - s) / p); }
  function ciz() {
    var p = PLER[+rp.value], s = +rs.value / 100, pl = plan(p), T = pl.adim;
    pEl.textContent = p; sEl.textContent = "%" + rs.value;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var DY = 34, Y0 = 16;
    pl.duzey.forEach(function (d, l) {
      d.forEach(function (n) {
        if (!n.a) return;
        var acik = n.adim <= adimGoster;
        [n.a, n.b].forEach(function (c) {
          var e = mk("line", { x1: c.x, y1: Y0 + (l - 1) * DY, x2: n.x, y2: Y0 + l * DY, "class": "line" });
          e.style.opacity = acik ? 1 : 0.25; svg.appendChild(e);
        });
      });
    });
    pl.duzey.forEach(function (d, l) {
      d.forEach(function (n) {
        var acik = n.adim <= adimGoster, y = Y0 + l * DY, r = l ? 11 : 9.5;
        var c = mk("circle", { cx: n.x, cy: y, r: r });
        c.style.fill = l === 0 ? "var(--ds-bg)" : (acik ? "color-mix(in srgb, " + RENK[n.is % 8] + " 45%, var(--ds-bg))" : "var(--ds-bg)");
        c.style.stroke = l === 0 ? "var(--ds-border)" : (acik ? RENK[n.is % 8] : "var(--ds-border)");
        c.style.strokeWidth = n.adim === adimGoster ? 3 : 1.5;
        if (!acik) c.style.strokeDasharray = "2 2";
        svg.appendChild(c);
        var t = mk("text", { x: n.x, y: y + 4, "text-anchor": "middle" }, acik ? n.v : "?");
        t.style.fontSize = n.v > 99 ? "10px" : "11.5px"; t.style.fontWeight = l ? 700 : 400; t.style.fill = acik ? "var(--ds-text)" : "var(--ds-muted)";
        svg.appendChild(t);
      });
    });
    var gor = Math.min(adimGoster, T);
    var ad = mk("text", { x: 384, y: Y0 + 4 * DY + 4, "text-anchor": "end", "class": "lbl" }, "adım " + gor + " / " + T);
    ad.style.fontSize = "12px"; ad.style.fontWeight = 700; svg.appendChild(ad);
    var ad2 = mk("text", { x: 6, y: Y0 + 4 * DY + 4, "class": "lbl" }, "renk = iş parçacığı");
    ad2.style.fontSize = "10.5px"; svg.appendChild(ad2);
    var X0 = 40, X1 = 380, Y1 = 196, Y2 = 268, ust = Math.min(1 / s, 40) * 1.1;
    function lx(q) { return X0 + Math.log(q) / Math.log(1024) * (X1 - X0); }
    function ly(v) { return Y2 - Math.min(v, ust) / ust * (Y2 - Y1); }
    svg.appendChild(mk("path", { d: "M" + X0 + " " + Y1 + " V" + Y2 + " H" + X1, "class": "axis" }));
    var dz = "", am = "";
    for (var q = 0; q <= 100; q++) {
      var pp = Math.pow(1024, q / 100);
      if (pp <= ust) dz += (dz ? " L" : "M") + lx(pp) + " " + ly(pp);
      am += (q ? " L" : "M") + lx(pp) + " " + ly(hiz(s, pp));
    }
    var dl = mk("path", { d: dz, "stroke-dasharray": "4 3" }); dl.style.fill = "none"; dl.style.stroke = "var(--ds-muted)"; dl.style.strokeWidth = 1.5; svg.appendChild(dl);
    var al = mk("path", { d: am }); al.style.fill = "none"; al.style.stroke = "var(--ds-link)"; al.style.strokeWidth = 2.5; svg.appendChild(al);
    if (1 / s <= ust) {
      var sl = mk("line", { x1: X0, y1: ly(1 / s), x2: X1, y2: ly(1 / s), "stroke-dasharray": "5 3" });
      sl.style.stroke = "var(--ds-accent)"; sl.style.strokeWidth = 1.3; svg.appendChild(sl);
    }
    var st = mk("text", { x: X1, y: ly(Math.min(1 / s, ust)) - 4, "text-anchor": "end" }, "sınır " + f(1 / s, 1) + "×");
    st.style.fontSize = "10.5px"; st.style.fill = "var(--ds-accent)"; svg.appendChild(st);
    var hp = hiz(s, p), mp = mk("circle", { cx: lx(p), cy: ly(hp), r: 5 });
    mp.style.fill = "var(--ds-accent)"; mp.style.stroke = "var(--ds-bg)"; mp.style.strokeWidth = 1.5; svg.appendChild(mp);
    [1, 4, 16, 64, 256, 1024].forEach(function (k) {
      var t = mk("text", { x: lx(k), y: Y2 + 13, "text-anchor": "middle", "class": "lbl" }, k); t.style.fontSize = "10px"; svg.appendChild(t);
    });
    var xl = mk("text", { x: X1, y: Y2 + 25, "text-anchor": "end", "class": "lbl" }, "çekirdek sayısı →"); xl.style.fontSize = "10px"; svg.appendChild(xl);
    var yl = mk("text", { x: X0 - 4, y: Y1 + 4, "text-anchor": "end", "class": "lbl" }, f(ust, 0) + "×"); yl.style.fontSize = "10px"; svg.appendChild(yl);
    var yl2 = mk("text", { x: X0 - 4, y: Y2, "text-anchor": "end", "class": "lbl" }, "0"); yl2.style.fontSize = "10px"; svg.appendChild(yl2);
    var tl = mk("text", { x: X0, y: Y1 - 12, "class": "lbl" }, "Amdahl: hızlanma (kesik çizgi: ideal)"); tl.style.fontSize = "10.5px"; svg.appendChild(tl);
    var simdi = 0;
    pl.duzey.forEach(function (d) { d.forEach(function (n) { if (n.a && n.adim === gor) simdi++; }); });
    out.innerHTML = (gor < T ? "Adım " + gor + ": <b>" + simdi + "</b> toplama aynı anda yapıldı.<br>" : "") + "16 sayı, <b>" + p + "</b> iş parçacığı: <b>" + T + " adım</b> (tek iş parçacığıyla 15). Hızlanma " + f(15 / T, 2) + "×." +
      "<br>Amdahl: seri kısım %" + rs.value + " iken " + p + " çekirdek <b>" + f(hp, 2) + "×</b>; sonsuz çekirdekle bile en çok <b>" + f(1 / s, 1) + "×</b>.";
  }
  function dur() { if (timer) { clearInterval(timer); timer = null; } }
  rp.addEventListener("input", function () { dur(); adimGoster = 99; ciz(); });
  rs.addEventListener("input", ciz);
  root.querySelector("[data-o]").addEventListener("click", function () {
    dur(); adimGoster = 0; ciz();
    var T = plan(PLER[+rp.value]).adim;
    timer = setInterval(function () { adimGoster++; ciz(); if (adimGoster >= T) dur(); }, 550);
  });
  ciz();
''',
    'not': ('Paralel programlama dersi, işi <b>bağımsız parçalara</b> bölmeyi öğretir: n sayının toplamı log n adımda biter. '
            'Ama seri kalan küçük bir kısım bile hızlanmanın tavanını belirler.'),
}
