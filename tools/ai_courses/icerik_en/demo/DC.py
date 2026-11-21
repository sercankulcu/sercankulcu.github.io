# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Augmenting a Digit Image',
    'problem': ('A handwritten digit recognizer has few examples; making new ones by rotating and shearing each image '
                '(data augmentation) means multiplying every pixel by a 2×2 matrix. Change the matrix and watch the “7”.'),
    'html': '''
<svg viewBox="0 0 390 284" width="390" height="284" role="img" aria-label="The digit 7 transformed by a matrix"></svg>
<div class="ai-side">
  <div class="ai-mat">
    <label>a = <b class="ai-v">1.00</b><input type="range" min="-2" max="2" step="0.05" value="1" data-i="0" aria-label="a"></label>
    <label>b = <b class="ai-v">0.00</b><input type="range" min="-2" max="2" step="0.05" value="0" data-i="1" aria-label="b"></label>
    <label>c = <b class="ai-v">0.00</b><input type="range" min="-2" max="2" step="0.05" value="0" data-i="2" aria-label="c"></label>
    <label>d = <b class="ai-v">1.00</b><input type="range" min="-2" max="2" step="0.05" value="1" data-i="3" aria-label="d"></label>
  </div>
  <div class="ai-ctl"><button type="button" data-p="dondur">Rotate 30°</button><button type="button" data-p="yansit">Mirror</button><button type="button" data-p="kay" class="is-on">Shear</button><button type="button" data-p="olcek">Stretch</button><button type="button" data-p="ez">Squash</button><button type="button" data-p="birim">Identity</button></div>
  <div class="ai-out"></div>
</div>''',
    'css': '''
.ds-deck .ai-demo svg { overflow: hidden; }
.ds-deck .ai-demo .ai-mat { display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px; padding: 2px 12px; border-left: 2.5px solid var(--ds-text); border-right: 2.5px solid var(--ds-text); border-radius: 6px; }
.ds-deck .ai-demo .ai-mat label { display: block; }
.ds-deck .ai-demo .ai-mat input { display: block; margin: 0 0 2px; }
''',
    'js': r'''
  var svg = root.querySelector("svg"), out = root.querySelector(".ai-out");
  var sl = root.querySelectorAll("input[type=range]"), vEl = root.querySelectorAll(".ai-v"), pBtn = root.querySelectorAll("[data-p]");
  var resim = ["#####", "....#", "...#.", "..#..", ".#...", ".#...", ".#..."];
  var CX = 195, CY = 142, K = 38, s30 = 0.5, c30 = Math.sqrt(3) / 2;
  var hazir = { birim: [1, 0, 0, 1], dondur: [c30, -s30, s30, c30], yansit: [-1, 0, 0, 1], kay: [1, 0.6, 0, 1], olcek: [1.5, 0, 0, 0.7], ez: [1, 0.5, 2, 1] };
  var ad = { birim: "", dondur: "rotation", yansit: "reflection", kay: "shear", olcek: "stretch", ez: "squash" };
  var M = hazir.kay.slice(), son = "kay";
  function f2(x) { return (Math.abs(x) < 0.005 ? 0 : x).toFixed(2); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt != null) e.textContent = txt; return e; }
  function T(p) { return [M[0] * p[0] + M[1] * p[1], M[2] * p[0] + M[3] * p[1]]; }
  function ek(p) { return (CX + p[0] * K).toFixed(1) + " " + (CY - p[1] * K).toFixed(1); }
  function poli(pts, donustur) { return "M" + pts.map(function (p) { return ek(donustur ? T(p) : p); }).join(" L") + " Z"; }
  function ok(v, renk, yazi) {
    var u = T(v), x = CX + u[0] * K, y = CY - u[1] * K;
    var l = mk("line", { x1: CX, y1: CY, x2: x, y2: y }); l.style.stroke = renk; l.style.strokeWidth = 3; svg.appendChild(l);
    var c = mk("circle", { cx: x, cy: y, r: 4.5 }); c.style.fill = renk; svg.appendChild(c);
    var t = mk("text", { x: x + 7, y: y - 5, "class": "lbl" }, yazi); t.style.fill = renk; t.style.fontWeight = 700; svg.appendChild(t);
  }
  function ciz() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    for (var g = -8; g <= 8; g++) {
      svg.appendChild(mk("path", { d: "M" + ek(T([g, -8])) + " L" + ek(T([g, 8])), "class": "grid" }));
      svg.appendChild(mk("path", { d: "M" + ek(T([-8, g])) + " L" + ek(T([8, g])), "class": "grid" }));
    }
    svg.appendChild(mk("path", { d: "M0 " + CY + " H390 M" + CX + " 0 V284", "class": "axis" }));
    var pk = [];
    resim.forEach(function (sat, r) { for (var c = 0; c < 5; c++) if (sat[c] === "#") pk.push([(c - 2.5) * 0.5, (3.5 - r) * 0.5]); });
    pk.forEach(function (p) {
      var kare = [[p[0], p[1]], [p[0] + 0.5, p[1]], [p[0] + 0.5, p[1] - 0.5], [p[0], p[1] - 0.5]];
      var o = mk("path", { d: poli(kare, false) }); o.style.fill = "none"; o.style.stroke = "var(--ds-muted)"; o.style.strokeDasharray = "2 2"; o.style.opacity = 0.7; svg.appendChild(o);
    });
    var bk = mk("path", { d: poli([[0, 0], [1, 0], [1, 1], [0, 1]], true) });
    bk.style.fill = "color-mix(in srgb, #e9a23b 30%, transparent)"; bk.style.stroke = "#e9a23b"; svg.appendChild(bk);
    pk.forEach(function (p) {
      var kare = [[p[0], p[1]], [p[0] + 0.5, p[1]], [p[0] + 0.5, p[1] - 0.5], [p[0], p[1] - 0.5]];
      var e = mk("path", { d: poli(kare, true) }); e.style.fill = "var(--ds-link)"; e.style.stroke = "var(--ds-bg)"; e.style.strokeWidth = 0.8; e.style.opacity = 0.9; svg.appendChild(e);
    });
    var det = M[0] * M[3] - M[1] * M[2], iz = M[0] + M[3], ay = iz * iz / 4 - det, oz = "";
    if (ay >= -1e-9) {
      var kk = Math.sqrt(Math.max(0, ay)), ls = [iz / 2 + kk, iz / 2 - kk], gor = [];
      ls.forEach(function (l, j) {
        var v = Math.abs(M[1]) > 1e-9 ? [M[1], l - M[0]] : (Math.abs(M[2]) > 1e-9 ? [l - M[3], M[2]] : (j === 0 ? [1, 0] : [0, 1]));
        var n = Math.hypot(v[0], v[1]); v = [v[0] / n, v[1] / n];
        var anah = v[0].toFixed(2) + "," + v[1].toFixed(2), ters = (-v[0]).toFixed(2) + "," + (-v[1]).toFixed(2);
        if (gor.indexOf(anah) >= 0 || gor.indexOf(ters) >= 0) return;
        gor.push(anah);
        var e = mk("path", { d: "M" + ek([-9 * v[0], -9 * v[1]]) + " L" + ek([9 * v[0], 9 * v[1]]) }); e.style.stroke = "var(--ds-good)"; e.style.strokeWidth = 2; e.style.strokeDasharray = "7 4"; svg.appendChild(e);
        var tx = CX + 4.2 * v[0] * K, ty = CY - 4.2 * v[1] * K;
        var t = mk("text", { x: Math.min(330, Math.max(8, tx)), y: Math.min(276, Math.max(14, ty)), "class": "lbl" }, "λ = " + f2(l)); t.style.fill = "var(--ds-good)"; t.style.fontWeight = 700; svg.appendChild(t);
      });
      oz = "Eigenvalues: <b>" + f2(ls[0]) + "</b> and <b>" + f2(ls[1]) + "</b> (green dashed lines keep their direction)";
    } else oz = "No real eigenvectors: no direction stays on its own line (there is rotation).";
    ok([1, 0], "var(--ds-accent)", "i");
    ok([0, 1], "#e9a23b", "j");
    sl.forEach(function (s, i) { s.value = M[i]; vEl[i].textContent = f2(M[i]); });
    out.innerHTML = (ad[son] ? "Transform: <b>" + ad[son] + "</b><br>" : "") + "det = <b>" + f2(det) + "</b>: area ×" + f2(Math.abs(det)) +
      (det < -1e-9 ? ", the image is <b>flipped</b>" : "") + (Math.abs(det) < 1e-9 ? ", the image <b>collapsed</b> onto a line and cannot be undone" : "") + "<br>" + oz;
  }
  sl.forEach(function (s, i) { s.addEventListener("input", function () { M[i] = +s.value; son = ""; pBtn.forEach(function (o) { o.classList.remove("is-on"); }); ciz(); }); });
  pBtn.forEach(function (b) { b.addEventListener("click", function () { son = b.getAttribute("data-p"); M = hazir[son].slice(); pBtn.forEach(function (o) { o.classList.toggle("is-on", o === b); }); ciz(); }); });
  ciz();
''',
    'not': ('The determinant tells how much area is scaled; eigenvectors give the directions the map does not bend. The same '
            'eigenvector idea finds the directions of greatest spread in PCA.'),
}
