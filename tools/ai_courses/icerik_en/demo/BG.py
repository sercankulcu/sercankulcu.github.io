# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Find the Rings in the Image',
    'problem': ('On an assembly line a camera must count the ring-shaped gaskets on the belt. A template slides over every position '
                'and similarity is measured. Change the confidence threshold and suppression, and check the boxes.'),
    'html': '''
<svg viewBox="0 0 390 284" width="390" height="284" role="img" aria-label="Scene, candidate boxes and ground-truth boxes"></svg>
<div class="ai-side">
  <div class="ai-ctl"><svg class="ai-sab" viewBox="0 0 40 40" width="40" height="40" aria-label="Template"></svg><span style="font-size:13px;color:var(--ds-muted)">12×12 template</span></div>
  <label>Confidence threshold = <b class="ai-t">0.62</b></label>
  <input type="range" min="30" max="95" value="62" aria-label="Confidence threshold">
  <div class="ai-ctl"><button type="button" data-b="nms" class="is-on">Non-maximum suppression</button><button type="button" data-b="harita">Score map</button></div>
  <div class="ai-out"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), sab = root.querySelector(".ai-sab"), out = root.querySelector(".ai-out");
  var range = root.querySelector("input"), tEl = root.querySelector(".ai-t");
  var bBtn = root.querySelectorAll("[data-b]");
  var W = 64, H = 42, C = 6, K = 12, Y0 = 2, KM = (K - 1) / 2;
  var secim = { nms: true, harita: false };
  var tohum = 21;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function gauss() { return (rnd() + rnd() + rnd() + rnd() - 2) / 0.58; }
  function uz(x, y) { return Math.hypot(x - KM, y - KM); }
  function halka(x, y) { var d = uz(x, y); return d >= 2.9 && d <= 5.6; }
  var sablon = [], i, x, y;
  for (y = 0; y < K; y++) for (x = 0; x < K; x++) sablon.push(halka(x, y) ? 220 : 90);
  var img = [];
  for (i = 0; i < W * H; i++) img.push(90);
  function koy(ox, oy, f) { for (var yy = 0; yy < K; yy++) for (var xx = 0; xx < K; xx++) { var v = f(xx, yy); if (v !== null) img[(oy + yy) * W + ox + xx] = v; } }
  var gercek = [[4, 4], [40, 3], [26, 27]];
  koy(4, 4, function (a, b) { return halka(a, b) ? 220 : null; });
  koy(40, 3, function (a, b) { return halka(a, b) ? 150 : null; });
  koy(26, 27, function (a, b) { return a === 7 || a === 8 ? 95 : (halka(a, b) ? 210 : null); });
  koy(48, 26, function (a, b) { return uz(a, b) <= 5.6 ? 210 : null; });
  koy(7, 26, function (a, b) { return a < 2 || a > 9 || b < 2 || b > 9 ? 215 : null; });
  koy(21, 10, function (a, b) { return halka(a, b) && !(a >= 6 && b >= 2 && b <= 9) ? 215 : null; });
  function yumusat(im, w, h) {
    var r = [];
    for (var yy = 0; yy < h; yy++) for (var xx = 0; xx < w; xx++) {
      var s = 0;
      for (var b = -1; b <= 1; b++) for (var a = -1; a <= 1; a++) {
        var q = Math.min(h - 1, Math.max(0, yy + b)), p = Math.min(w - 1, Math.max(0, xx + a));
        s += im[q * w + p] * (a ? 1 : 2) * (b ? 1 : 2);
      }
      r.push(s / 16);
    }
    return r;
  }
  img = img.map(function (v) { return Math.max(0, Math.min(255, v + 25 * gauss())); });
  var esle = yumusat(img, W, H);
  sablon = yumusat(sablon, K, K);
  var ms = 0, ss = 0;
  sablon.forEach(function (v) { ms += v / (K * K); });
  sablon.forEach(function (v) { ss += (v - ms) * (v - ms); });
  var skor = [], adaylar = [];
  for (y = 0; y <= H - K; y++) for (x = 0; x <= W - K; x++) {
    var m = 0, a, b, s1 = 0, s2 = 0;
    for (b = 0; b < K; b++) for (a = 0; a < K; a++) m += esle[(y + b) * W + x + a] / (K * K);
    for (b = 0; b < K; b++) for (a = 0; a < K; a++) {
      var d = esle[(y + b) * W + x + a] - m;
      s1 += d * (sablon[b * K + a] - ms); s2 += d * d;
    }
    var n = s1 / Math.sqrt(s2 * ss + 1e-9);
    skor.push(n);
    adaylar.push([n, x, y]);
  }
  adaylar.sort(function (p, q) { return q[0] - p[0]; });
  function iou(p, q) {
    var w = Math.max(0, Math.min(p[0], q[0]) + K - Math.max(p[0], q[0])), h = Math.max(0, Math.min(p[1], q[1]) + K - Math.max(p[1], q[1]));
    return w * h / (2 * K * K - w * h);
  }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var k in at) e.setAttribute(k, at[k]); if (txt) e.textContent = txt; return e; }
  function gri(v) { v = Math.round(v); return "rgb(" + v + "," + v + "," + v + ")"; }
  var g0 = mk("g", { "shape-rendering": "crispEdges" }), pik = [];
  for (i = 0; i < W * H; i++) { var r = mk("rect", { x: 3 + (i % W) * C, y: Y0 + Math.floor(i / W) * C, width: C + 0.3, height: C + 0.3 }); g0.appendChild(r); pik.push(r); }
  svg.appendChild(g0);
  var kat = mk("g", {});
  svg.appendChild(kat);
  for (i = 0; i < K * K; i++) { var t = mk("rect", { x: (i % K) * 10 / 3, y: Math.floor(i / K) * 10 / 3, width: 3.6, height: 3.6 }); t.style.fill = gri(sablon[i]); sab.appendChild(t); }
  function ciz() {
    var esik = +range.value / 100;
    tEl.textContent = esik.toFixed(2);
    var sx = W - K + 1;
    for (i = 0; i < W * H; i++) {
      if (secim.harita) {
        var px = (i % W) - 6, py = Math.floor(i / W) - 6, v = -1;
        if (px >= 0 && py >= 0 && px < sx && py <= H - K) v = skor[py * sx + px];
        pik[i].style.fill = v > 0 ? "color-mix(in srgb, #e9a23b " + Math.round(v * 100) + "%, var(--ds-bg))" : "var(--ds-bg)";
      } else pik[i].style.fill = gri(img[i]);
    }
    while (kat.firstChild) kat.removeChild(kat.firstChild);
    var gecen = adaylar.filter(function (p) { return p[0] >= esik; });
    var tut = [];
    if (secim.nms) gecen.forEach(function (p) { if (tut.every(function (q) { return iou([p[1], p[2]], [q[1], q[2]]) < 0.3; })) tut.push(p); });
    else tut = gecen;
    var eslesti = [false, false, false], dogru = 0, yanlis = 0, iouT = 0;
    tut.forEach(function (p) {
      var en = -1, ei = 0;
      gercek.forEach(function (g, j) { var v = iou([p[1], p[2]], g); if (!eslesti[j] && v > ei) { ei = v; en = j; } });
      if (en >= 0 && ei >= 0.5) { eslesti[en] = true; dogru++; iouT += ei; p.dogru = true; } else { yanlis++; p.dogru = false; }
    });
    gercek.forEach(function (g) {
      var r = mk("rect", { x: 3 + g[0] * C - 2, y: Y0 + g[1] * C - 2, width: K * C + 4, height: K * C + 4, rx: 3, "stroke-dasharray": "5 3" });
      r.style.fill = "none"; r.style.stroke = "var(--ds-link)"; r.style.strokeWidth = 1.6;
      kat.appendChild(r);
    });
    tut.slice().reverse().forEach(function (p) {
      var r = mk("rect", { x: 3 + p[1] * C, y: Y0 + p[2] * C, width: K * C, height: K * C });
      r.style.fill = "none"; r.style.stroke = p.dogru ? "var(--ds-good)" : "var(--ds-bad)";
      r.style.strokeWidth = secim.nms ? 2.6 : 1.2; r.style.opacity = secim.nms ? 1 : 0.75;
      kat.appendChild(r);
      if (secim.nms) {
        var arka = mk("rect", { x: 3 + p[1] * C, y: Y0 + p[2] * C, width: 30, height: 15 });
        arka.style.fill = "var(--ds-bg)"; arka.style.opacity = 0.9;
        kat.appendChild(arka);
        var e = mk("text", { x: 3 + p[1] * C + 3, y: Y0 + p[2] * C + 12, "class": "lbl" }, p[0].toFixed(2));
        e.style.fill = p.dogru ? "var(--ds-good)" : "var(--ds-bad)"; e.style.fontWeight = "700";
        kat.appendChild(e);
      }
    });
    var kacan = 3 - dogru;
    out.innerHTML = adaylar.length + " windows scanned, above threshold <b>" + gecen.length + "</b><br>" +
      (secim.nms ? "After suppression: " + tut.length + " boxes<br>" : "Suppression off: every candidate is a box<br>") +
      "Correct: <b>" + dogru + "</b> &nbsp;False: <b>" + yanlis + "</b> &nbsp;Missed: <b>" + kacan + "</b><br>" +
      "Mean IoU: " + (dogru ? (iouT / dogru).toFixed(2) : "–") +
      "<div style=\"font-size:12.5px;color:var(--ds-muted);margin-top:3px\">Dashed blue: ground truth. Green: correct detection, red: false.</div>";
  }
  bBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var k = btn.getAttribute("data-b"); secim[k] = !secim[k]; btn.classList.toggle("is-on", secim[k]); ciz();
    });
  });
  range.addEventListener("input", ciz);
  ciz();
''',
    'not': ('Image processing transforms the image; computer vision draws a <b>decision</b> from it: box, label, confidence. '
            'The course teaches how to measure detection with IoU, true/false detections and threshold choice.'),
}
