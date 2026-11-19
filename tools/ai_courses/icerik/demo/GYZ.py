# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Modeli Mikrodenetleyiciye Sığdır',
    'problem': ('Bir motorun üstündeki titreşim sensörü arızayı kendisi tanımalı, ama işlemcinin belleği 512 KB. '
                'Ağırlıkları kaç bitle saklayacağınızı seçin; boyut, hız ve doğruluk birlikte değişir.'),
    'html': '''
<svg viewBox="0 0 390 286" width="390" height="286" role="img" aria-label="Nicemlenmiş ağırlıklar, karar bölgeleri ve bellek göstergesi"></svg>
<div class="ai-side">
  <label>Ağırlık başına bit: <b class="ai-b">32</b></label>
  <input type="range" min="0" max="4" step="1" value="0" aria-label="Bit genişliği">
  <div class="ai-ctl"><button type="button" data-k="0" class="is-on">32</button><button type="button" data-k="1">16</button><button type="button" data-k="2">8</button><button type="button" data-k="3">4</button><button type="button" data-k="4">2</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px"><span style="color:var(--ds-link);font-weight:700">●</span> normal <span style="color:#e9a23b;font-weight:700">●</span> dengesizlik <span style="color:#9b6bd6;font-weight:700">●</span> rulman arızası. Ağ burada eğitildi (63 ağırlık); boyut, aynı oranla 300 bin ağırlıklı gerçek model için.</div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), range = root.querySelector("input"), bEl = root.querySelector(".ai-b");
  var out = root.querySelectorAll(".ai-out")[0], tus = root.querySelectorAll("[data-k]");
  var BITLER = [32, 16, 8, 4, 2], HIZ = { 32: 1, 16: 0.55, 8: 0.26, 4: 0.2, 2: 0.17 };
  var GERCEK = 300000, LIMIT = 512, H = 10;
  var tohum = 5;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function gauss() { return Math.sqrt(-2 * Math.log(rnd())) * Math.cos(2 * Math.PI * rnd()); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt !== undefined) e.textContent = txt; return e; }
  function f(v, n) { return v.toFixed(n).replace(".", ","); }
  var merk = [[0.27, 0.3], [0.73, 0.36], [0.48, 0.74]];
  function uret(n) { var d = []; for (var i = 0; i < n; i++) { var c = i % 3; d.push([Math.min(0.98, Math.max(0.02, merk[c][0] + 0.12 * gauss())), Math.min(0.98, Math.max(0.02, merk[c][1] + 0.12 * gauss())), c]); } return d; }
  var egit = uret(180), test = uret(240);
  var W1 = [], b1 = [], W2 = [], b2 = [];
  for (var j = 0; j < H; j++) { W1.push([gauss() * 0.8, gauss() * 0.8]); b1.push(0); }
  for (var c = 0; c < 3; c++) { var r = []; for (var j2 = 0; j2 < H; j2++) r.push(gauss() * 0.5); W2.push(r); b2.push(0); }
  function ileri(m, x, y) {
    var u = (x - 0.5) * 4, v = (y - 0.5) * 4, h = [], o = [];
    for (var j = 0; j < H; j++) h.push(Math.tanh(m.W1[j][0] * u + m.W1[j][1] * v + m.b1[j]));
    for (var c = 0; c < 3; c++) { var s = m.b2[c]; for (var j2 = 0; j2 < H; j2++) s += m.W2[c][j2] * h[j2]; o.push(s); }
    return { h: h, o: o, u: u, v: v };
  }
  var tam = { W1: W1, b1: b1, W2: W2, b2: b2 };
  for (var ep = 0; ep < 700; ep++) {
    var gW1 = W1.map(function () { return [0, 0]; }), gb1 = b1.map(function () { return 0; });
    var gW2 = W2.map(function (r) { return r.map(function () { return 0; }); }), gb2 = [0, 0, 0];
    egit.forEach(function (p) {
      var z = ileri(tam, p[0], p[1]), mx = Math.max(z.o[0], z.o[1], z.o[2]), e = z.o.map(function (v) { return Math.exp(v - mx); });
      var top = e[0] + e[1] + e[2], dh = [];
      for (var j = 0; j < H; j++) dh.push(0);
      for (var c = 0; c < 3; c++) {
        var g = e[c] / top - (c === p[2] ? 1 : 0);
        gb2[c] += g;
        for (var j2 = 0; j2 < H; j2++) { gW2[c][j2] += g * z.h[j2]; dh[j2] += g * W2[c][j2]; }
      }
      for (var j3 = 0; j3 < H; j3++) {
        var d = dh[j3] * (1 - z.h[j3] * z.h[j3]);
        gW1[j3][0] += d * z.u; gW1[j3][1] += d * z.v; gb1[j3] += d;
      }
    });
    var lr = 0.4 / egit.length;
    for (var j4 = 0; j4 < H; j4++) { W1[j4][0] -= lr * gW1[j4][0]; W1[j4][1] -= lr * gW1[j4][1]; b1[j4] -= lr * gb1[j4]; }
    for (var c2 = 0; c2 < 3; c2++) { b2[c2] -= lr * gb2[c2]; for (var j5 = 0; j5 < H; j5++) W2[c2][j5] -= lr * gW2[c2][j5]; }
  }
  function nicem(dizi, bit) {
    var duz = [].concat.apply([], dizi.map(function (x) { return Array.isArray(x) ? x : [x]; }));
    if (bit >= 32) return { f: function (w) { return w; }, s: 0 };
    var L = Math.pow(2, bit - 1) - 1, mx = 0;
    duz.forEach(function (w) { if (Math.abs(w) > mx) mx = Math.abs(w); });
    var s = mx / L;
    return { f: function (w) { return Math.round(w / s) * s; }, s: s };
  }
  function nicemModel(bit) {
    var q1 = nicem(W1, bit), qb1 = nicem(b1, bit), q2 = nicem(W2, bit), qb2 = nicem(b2, bit);
    return { W1: W1.map(function (r) { return r.map(q1.f); }), b1: b1.map(qb1.f), W2: W2.map(function (r) { return r.map(q2.f); }), b2: b2.map(qb2.f) };
  }
  function sinif(m, x, y) { var o = ileri(m, x, y).o; return o[0] >= o[1] && o[0] >= o[2] ? 0 : (o[1] >= o[2] ? 1 : 2); }
  function basari(m) { var d = 0; test.forEach(function (p) { if (sinif(m, p[0], p[1]) === p[2]) d++; }); return d / test.length; }
  function duzle(m) { var a = []; m.W1.forEach(function (r) { a.push(r[0], r[1]); }); a = a.concat(m.b1); m.W2.forEach(function (r) { a = a.concat(r); }); return a.concat(m.b2); }
  var RENK = ["var(--ds-link)", "#e9a23b", "#9b6bd6"];
  var tamDog = basari(tam), tamW = duzle(tam), sira = tamW.map(function (w, i) { return i; }).sort(function (a, b) { return tamW[b] - tamW[a]; });
  function ciz() {
    var k = +range.value, bit = BITLER[k], m = nicemModel(bit), qw = duzle(m), dog = basari(m);
    bEl.textContent = bit;
    tus.forEach(function (b) { b.classList.toggle("is-on", +b.dataset.k === k); });
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var mx = 0; tamW.forEach(function (w) { if (Math.abs(w) > mx) mx = Math.abs(w); });
    var X0 = 30, X1 = 384, YM = 62, YS = 40 / mx;
    var b0 = mk("text", { x: 4, y: 12, "class": "lbl" }, "Ağırlıklar (büyükten küçüğe): gri gerçek, mavi " + bit + " bit"); b0.style.fontSize = "11px"; svg.appendChild(b0);
    svg.appendChild(mk("path", { d: "M" + X0 + " " + YM + " H" + X1, "class": "grid" }));
    var y0 = mk("text", { x: X0 - 4, y: YM + 4, "text-anchor": "end", "class": "lbl" }, "0"); y0.style.fontSize = "10px"; svg.appendChild(y0);
    sira.forEach(function (idx, i) {
      var x = X0 + (i + 0.5) * (X1 - X0) / sira.length;
      var g = mk("circle", { cx: x, cy: YM - tamW[idx] * YS, r: 2.6 }); g.style.fill = "var(--ds-muted)"; g.style.opacity = 0.7; svg.appendChild(g);
      var q = mk("rect", { x: x - 2.2, y: YM - qw[idx] * YS - 1.4, width: 4.4, height: 2.8 }); q.style.fill = "var(--ds-link)"; svg.appendChild(q);
    });
    var PX = 4, PY = 120, PS = 160, G = 32, cs = PS / G;
    for (var gx = 0; gx < G; gx++) for (var gy = 0; gy < G; gy++) {
      var cl = sinif(m, (gx + 0.5) / G, 1 - (gy + 0.5) / G), rc = mk("rect", { x: PX + gx * cs, y: PY + gy * cs, width: cs + 0.3, height: cs + 0.3 });
      rc.style.fill = RENK[cl]; rc.style.opacity = 0.16; svg.appendChild(rc);
    }
    test.forEach(function (p, i) {
      if (i % 2) return;
      var ok = sinif(m, p[0], p[1]) === p[2];
      var d = mk("circle", { cx: PX + p[0] * PS, cy: PY + (1 - p[1]) * PS, r: ok ? 2.4 : 3.4 });
      d.style.fill = RENK[p[2]]; if (!ok) { d.style.stroke = "var(--ds-text)"; d.style.strokeWidth = 1.6; }
      svg.appendChild(d);
    });
    var fr = mk("rect", { x: PX, y: PY, width: PS, height: PS }); fr.style.fill = "none"; fr.style.stroke = "var(--ds-border)"; svg.appendChild(fr);
    var b1t = mk("text", { x: PX, y: PY - 6, "class": "lbl" }, "Test verisi: doğruluk %" + f(100 * dog, 1)); b1t.style.fontSize = "11px"; svg.appendChild(b1t);
    var kb = GERCEK * bit / 8 / 1024, BX = 192, BW = 190, olc = BW / 1200;
    var satir = [["Bellek", kb, f(kb, 0) + " KB", kb <= LIMIT], ["Gecikme", 1200 * HIZ[bit], f(120 * HIZ[bit], 0) + " ms", true], ["Enerji", 1200 * HIZ[bit], f(4.8 * HIZ[bit], 1) + " mJ", true]];
    satir.forEach(function (s, i) {
      var y = PY + 6 + i * 50;
      var t = mk("text", { x: BX, y: y + 4, "class": "lbl" }, s[0] + ": "); t.style.fontSize = "11px"; svg.appendChild(t);
      var v = mk("text", { x: BX + BW, y: y + 4, "text-anchor": "end" }, s[2]); v.style.fontSize = "12px"; v.style.fontWeight = 700; v.style.fill = "var(--ds-text)"; svg.appendChild(v);
      var zemin = mk("rect", { x: BX, y: y + 10, width: BW, height: 14, rx: 4 }); zemin.style.fill = "color-mix(in srgb, var(--ds-muted) 15%, var(--ds-bg))"; svg.appendChild(zemin);
      var bar = mk("rect", { x: BX, y: y + 10, width: Math.max(2, s[1] * olc), height: 14, rx: 4 });
      bar.style.fill = i === 0 ? (s[3] ? "var(--ds-good)" : "var(--ds-bad)") : "color-mix(in srgb, var(--ds-link) 60%, var(--ds-bg))"; svg.appendChild(bar);
      if (i === 0) {
        var lx = BX + LIMIT * olc, ln = mk("line", { x1: lx, y1: y + 5, x2: lx, y2: y + 29, "stroke-dasharray": "3 2" });
        ln.style.stroke = "var(--ds-accent)"; ln.style.strokeWidth = 2; svg.appendChild(ln);
        var lt = mk("text", { x: lx, y: y + 40, "text-anchor": "middle" }, "cihaz sınırı 512 KB"); lt.style.fontSize = "10px"; lt.style.fill = "var(--ds-accent)"; svg.appendChild(lt);
      }
    });
    var son = mk("text", { x: BX, y: PY + 158, "class": "lbl" }, "gecikme ve enerji tahminidir"); son.style.fontSize = "10px"; svg.appendChild(son);
    var fark = 100 * (tamDog - dog);
    out.innerHTML = bit + " bit: model <b>" + f(kb, 0) + " KB</b> → " + (kb <= LIMIT ? "<b>cihaza sığar</b>" : "sığmaz") +
      "<br>Doğruluk <b>%" + f(100 * dog, 1) + "</b> (32 bitte %" + f(100 * tamDog, 1) + (fark > 0.05 ? ", kayıp " + f(fark, 1) + " puan" : "") + ")" +
      "<br>Tahmini gecikme " + f(120 * HIZ[bit], 0) + " ms, enerji " + f(4.8 * HIZ[bit], 1) + " mJ";
  }
  range.addEventListener("input", ciz);
  tus.forEach(function (b) { b.addEventListener("click", function () { range.value = b.dataset.k; ciz(); }); });
  ciz();
''',
    'not': ('Gömülü yapay zekâ modeli küçültmeyi işin parçası sayar: 8 bit <b>nicemleme</b> çoğu zaman doğruluğu korur, belleği dörtte '
            'bire indirir. 2 bitte ise karar sınırları dağılır.'),
}
