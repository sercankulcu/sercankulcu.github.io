# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Fiyat Modelini Eğitmek',
    'problem': ('Ev fiyatını “fiyat = w·alan + b” ile tahmin eden modelin iki ağırlığı, kaybı en aza indiren yere gradyan inişiyle gidiyor. '
                'Haritada başlangıca tıklayın, öğrenme hızını değiştirin.'),
    'html': '''
<svg viewBox="0 0 390 284" width="390" height="284" role="img" aria-label="w ve b için kayıp yüzeyinin eşyükselti çizgileri" style="cursor:crosshair"></svg>
<div class="ai-side">
  <label>Öğrenme hızı η = <b class="ai-lr">0,05</b></label>
  <input type="range" min="0.01" max="0.2" step="0.01" value="0.05" aria-label="Öğrenme hızı">
  <div class="ai-ctl"><button type="button" data-m="ham" class="is-on">Ham alan</button><button type="button" data-m="olc">Ölçeklenmiş alan</button></div>
  <div class="ai-ctl"><button type="button" data-a="1">1 adım</button><button type="button" data-a="run">Çalıştır</button><button type="button" data-a="0">Sıfırla</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px"></div>
</div>''',
    'css': '''
.ds-deck .ai-demo svg { overflow: hidden; }
''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var range = root.querySelector("input"), lrEl = root.querySelector(".ai-lr");
  var mBtn = root.querySelectorAll("[data-m]"), aBtn = root.querySelectorAll("[data-a]");
  var tohum = 3;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  var X = [], Y = [], i;
  for (i = 0; i < 20; i++) { var a = 0.4 + 3.6 * rnd(); X.push(a); Y.push(1 + 1.5 * a + (rnd() + rnd() - 1) * 0.9); }
  var ort = 0, sd = 0;
  X.forEach(function (x) { ort += x / X.length; });
  X.forEach(function (x) { sd += (x - ort) * (x - ort) / X.length; });
  sd = Math.sqrt(sd);
  var mod = "ham", bas = [-1, 6], k = 30, timer = null;
  function oz() { return mod === "ham" ? X : X.map(function (x) { return (x - ort) / sd; }); }
  function kayip(w, b) { var Z = oz(), s = 0; for (var i = 0; i < Z.length; i++) { var e = w * Z[i] + b - Y[i]; s += e * e; } return s / Z.length; }
  function grad(w, b) { var Z = oz(), gw = 0, gb = 0; for (var i = 0; i < Z.length; i++) { var e = w * Z[i] + b - Y[i]; gw += 2 * e * Z[i]; gb += 2 * e; } return [gw / Z.length, gb / Z.length]; }
  function analiz() {
    var Z = oz(), m1 = 0, m2 = 0, my = 0, mxy = 0, n = Z.length;
    for (var i = 0; i < n; i++) { m1 += Z[i] / n; m2 += Z[i] * Z[i] / n; my += Y[i] / n; mxy += Z[i] * Y[i] / n; }
    var w = (mxy - m1 * my) / (m2 - m1 * m1), b = my - w * m1;
    var A = [m2, m1, m1, 1], tr = m2 + 1, dt = m2 - m1 * m1, kk = Math.sqrt(tr * tr / 4 - dt);
    var l1 = tr / 2 + kk, l2 = tr / 2 - kk;
    var u1 = Math.abs(m1) > 1e-9 ? [m1, l1 - m2] : [1, 0], n1 = Math.hypot(u1[0], u1[1]); u1 = [u1[0] / n1, u1[1] / n1];
    return { w: w, b: b, L: kayip(w, b), l1: l1, l2: l2, u1: u1, u2: [-u1[1], u1[0]] };
  }
  var W0 = -1.5, W1 = 4.5, B0 = -3, B1 = 8, X0 = 34, PW = 350, Y0 = 6, PH = 248;
  function px(w) { return X0 + (w - W0) / (W1 - W0) * PW; }
  function py(b) { return Y0 + (1 - (b - B0) / (B1 - B0)) * PH; }
  function f2(x) { return x.toFixed(2).replace(".", ","); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt != null) e.textContent = txt; return e; }
  function yol() {
    var lr = +range.value, p = [bas.slice()], d = false;
    for (var s = 0; s < k; s++) {
      var q = p[p.length - 1], g = grad(q[0], q[1]);
      var r = [q[0] - lr * g[0], q[1] - lr * g[1]];
      p.push(r);
      if (Math.abs(r[0]) + Math.abs(r[1]) > 200) { d = true; break; }
    }
    return { p: p, d: d };
  }
  function ciz() {
    lrEl.textContent = f2(+range.value);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var an = analiz();
    [0.1, 0.3, 0.7, 1.5, 3, 6, 12, 24, 48].forEach(function (c, j) {
      var d = "";
      for (var t = 0; t <= 64; t++) {
        var a = t / 64 * 2 * Math.PI, r1 = Math.sqrt(c / an.l1) * Math.cos(a), r2 = Math.sqrt(c / an.l2) * Math.sin(a);
        var w = an.w + r1 * an.u1[0] + r2 * an.u2[0], b = an.b + r1 * an.u1[1] + r2 * an.u2[1];
        d += (t ? "L" : "M") + px(w).toFixed(1) + " " + py(b).toFixed(1);
      }
      var e = mk("path", { d: d + "Z", fill: "none" }); e.style.stroke = "var(--ds-link)"; e.style.strokeWidth = 1.3; e.style.opacity = 0.85 - j * 0.07; svg.appendChild(e);
    });
    svg.appendChild(mk("path", { d: "M" + X0 + " " + Y0 + " V" + (Y0 + PH) + " H" + (X0 + PW), "class": "axis" }));
    [-1, 0, 1, 2, 3, 4].forEach(function (w) { svg.appendChild(mk("text", { x: px(w), y: Y0 + PH + 14, "class": "lbl", "text-anchor": "middle" }, w)); });
    [-2, 0, 2, 4, 6, 8].forEach(function (b) { svg.appendChild(mk("text", { x: X0 - 5, y: py(b) + 4, "class": "lbl", "text-anchor": "end" }, b)); });
    svg.appendChild(mk("text", { x: X0 + PW, y: Y0 + PH + 28, "class": "lbl", "text-anchor": "end" }, "eğim w →"));
    svg.appendChild(mk("text", { x: X0 + 6, y: Y0 + 12, "class": "lbl" }, "sabit b ↑"));
    var hedef = mk("path", { d: "M" + (px(an.w) - 6) + " " + py(an.b) + " h12 M" + px(an.w) + " " + (py(an.b) - 6) + " v12" }); hedef.style.stroke = "var(--ds-good)"; hedef.style.strokeWidth = 3; svg.appendChild(hedef);
    var yy = yol(), pts = yy.p.filter(function (q, j, arr) { for (var t = 0; t <= j; t++) if (Math.abs(arr[t][0]) > 12 || Math.abs(arr[t][1]) > 16) return t === j; return true; });
    var iz = mk("path", { d: "M" + pts.map(function (q) { return px(q[0]).toFixed(1) + " " + py(q[1]).toFixed(1); }).join(" L"), fill: "none" });
    iz.style.stroke = "var(--ds-accent)"; iz.style.strokeWidth = 1.8; svg.appendChild(iz);
    pts.forEach(function (q, j) { var c = mk("circle", { cx: px(q[0]), cy: py(q[1]), r: j === 0 ? 5 : 2.6 }); c.style.fill = j === 0 ? "var(--ds-bg)" : "var(--ds-accent)"; c.style.stroke = "var(--ds-accent)"; c.style.strokeWidth = 1.5; svg.appendChild(c); });
    var son = pts[pts.length - 1], L = kayip(son[0], son[1]);
    outs[0].innerHTML = yy.d ? "Adım " + (yy.p.length - 1) + ": kayıp patladı, <b>ıraksadı</b>. Öğrenme hızını küçültün." :
      "Adım <b>" + (pts.length - 1) + "</b>: kayıp <b>" + f2(L) + "</b> (en düşük " + f2(an.L) + ")<br>w = " + f2(son[0]) + ", b = " + f2(son[1]);
    var lmax = 1 / an.l1;
    outs[1].innerHTML = "Vadinin basıklığı (koşul sayısı) <b>" + Math.round(an.l1 / an.l2) + "</b>; kararlı kalmak için η &lt; " + f2(lmax) + ". " +
      (+range.value > lmax ? "Seçilen hız bunu aşıyor." : (an.l1 / an.l2 > 5 ? "Dar yönde salınıp uzun yönde ağır ilerler." : "Daire biçimli vadide hızla iner."));
  }
  function dur() { if (timer) { clearInterval(timer); timer = null; } aBtn[1].classList.remove("is-on"); }
  svg.addEventListener("click", function (ev) {
    var bb = svg.getBoundingClientRect(), x = (ev.clientX - bb.left) / bb.width * 390, y = (ev.clientY - bb.top) / bb.height * 284;
    bas = [W0 + (x - X0) / PW * (W1 - W0), B0 + (1 - (y - Y0) / PH) * (B1 - B0)]; k = 0; dur(); ciz();
  });
  range.addEventListener("input", ciz);
  mBtn.forEach(function (b) { b.addEventListener("click", function () { mod = b.getAttribute("data-m"); mBtn.forEach(function (o) { o.classList.toggle("is-on", o === b); }); ciz(); }); });
  aBtn.forEach(function (b) { b.addEventListener("click", function () {
    var a = b.getAttribute("data-a"); dur();
    if (a === "1") { k++; ciz(); }
    else if (a === "0") { k = 0; ciz(); }
    else { b.classList.add("is-on"); var hedefK = k + 60; timer = setInterval(function () { k++; ciz(); if (k >= hedefK || yol().d) dur(); }, 60); }
  }); });
  ciz();
''',
    'not': ('Öğrenme hızı küçükse model ağır ilerler, büyükse dar vadide sekip ıraksar. Özellikleri ölçeklemek vadiyi yuvarlar; '
            'sinir ağlarında normalleştirme bu yüzden eğitimi hızlandırır.'),
}
