# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Segment the Tumor in an MRI Slice',
    'problem': ('In a contrast-enhanced brain MRI slice the tumor appears bright; the radiologist wants its volume. '
                'Click inside the tumor to place a seed and change the tolerance: does the region cover the tumor or leak into healthy tissue?'),
    'html': '''
<svg viewBox="0 0 262 262" width="262" height="262" role="img" aria-label="Synthetic brain MRI slice" style="cursor:crosshair"></svg>
<div class="ai-side">
  <label>Tolerance = ±<b class="ai-t">30</b> gray levels</label>
  <input type="range" min="4" max="80" value="30" aria-label="Tolerance">
  <div class="ai-ctl"><button type="button" data-b="yum">Smooth first</button><button type="button" data-b="uzm" class="is-on">Expert mask</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px"><span style="color:var(--ds-accent);font-weight:700">■</span> found region &nbsp; <span style="color:var(--ds-good);font-weight:700">▭</span> expert-drawn boundary. Pixel 3×3 mm. The closer <b>Dice</b> is to 1, the better the segmentation.</div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), out = root.querySelectorAll(".ai-out")[0];
  var range = root.querySelector("input"), tEl = root.querySelector(".ai-t");
  var bBtn = root.querySelectorAll("[data-b]");
  var N = 64, C = 4, O = 3;
  var secim = { yum: false, uzm: true };
  var tohum = 9;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function gauss() { return (rnd() + rnd() + rnd() + rnd() - 2) / 0.58; }
  var ham = [], uzman = [], x, y, i;
  for (y = 0; y < N; y++) for (x = 0; x < N; x++) {
    var e = Math.pow((x - 31.5) / 27, 2) + Math.pow((y - 32) / 30.5, 2), v = 8;
    if (e <= 1) v = 190;
    if (e <= 0.86) v = 55;
    if (e <= 0.78) v = 112;
    if (Math.pow((x - 31.5) / 18, 2) + Math.pow((y - 33) / 21, 2) <= 1) v = 150;
    if (Math.pow((x - 27) / 2.6, 2) + Math.pow((y - 31) / 7, 2) <= 1 || Math.pow((x - 36) / 2.6, 2) + Math.pow((y - 31) / 7, 2) <= 1) v = 45;
    var a = Math.atan2(y - 23, x - 42), r = Math.hypot(x - 42, y - 23);
    var t = r <= 6.2 + 1.3 * Math.sin(3 * a + 0.5) + 0.7 * Math.cos(5 * a);
    if (t) v = r > 4.5 ? 215 : 195;
    uzman.push(t);
    ham.push(v);
  }
  function ort(im) {
    var res = [];
    for (var yy = 0; yy < N; yy++) for (var xx = 0; xx < N; xx++) {
      var s = 0, n = 0;
      for (var b = -1; b <= 1; b++) for (var c = -1; c <= 1; c++) {
        var q = yy + b, p = xx + c;
        if (q >= 0 && q < N && p >= 0 && p < N) { s += im[q * N + p]; n++; }
      }
      res.push(s / n);
    }
    return res;
  }
  var img = ort(ham).map(function (v) { return Math.max(0, Math.min(255, v + 14 * gauss())); });
  var yumus = ort(img);
  var uzmanSay = 0;
  uzman.forEach(function (u) { if (u) uzmanSay++; });
  function mk(tag, at, txt) { var e2 = document.createElementNS(SVGNS, tag); for (var k in at) e2.setAttribute(k, at[k]); if (txt) e2.textContent = txt; return e2; }
  var g0 = mk("g", { "shape-rendering": "crispEdges" });
  for (i = 0; i < N * N; i++) {
    var r2 = mk("rect", { x: O + (i % N) * C, y: O + Math.floor(i / N) * C, width: C + 0.3, height: C + 0.3 });
    var g = Math.round(img[i]);
    r2.style.fill = "rgb(" + g + "," + g + "," + g + ")";
    g0.appendChild(r2);
  }
  svg.appendChild(g0);
  var sinir = "";
  for (i = 0; i < N * N; i++) if (uzman[i]) {
    x = i % N; y = Math.floor(i / N);
    var X = O + x * C, Y = O + y * C;
    if (!uzman[i - N]) sinir += "M" + X + " " + Y + "h" + C;
    if (!uzman[i + N]) sinir += "M" + X + " " + (Y + C) + "h" + C;
    if (!uzman[i - 1]) sinir += "M" + X + " " + Y + "v" + C;
    if (!uzman[i + 1]) sinir += "M" + (X + C) + " " + Y + "v" + C;
  }
  var bolgeP = mk("path", { d: "" });
  bolgeP.style.fill = "var(--ds-accent)"; bolgeP.style.opacity = 0.55;
  svg.appendChild(bolgeP);
  var uzmP = mk("path", { d: sinir });
  uzmP.style.fill = "none"; uzmP.style.stroke = "var(--ds-good)"; uzmP.style.strokeWidth = 2;
  svg.appendChild(uzmP);
  var isaret = mk("path", { d: "" });
  isaret.style.stroke = "#e9a23b"; isaret.style.strokeWidth = 2.5; isaret.style.fill = "none";
  svg.appendChild(isaret);
  var seed = [42, 23];
  function buyut() {
    var im = secim.yum ? yumus : img, tol = +range.value;
    var s0 = seed[1] * N + seed[0], icinde = new Uint8Array(N * N), kuyruk = [s0], toplam = im[s0], sayi = 1;
    icinde[s0] = 1;
    for (var h = 0; h < kuyruk.length; h++) {
      var p = kuyruk[h], px = p % N, py = Math.floor(p / N);
      var kom = [px > 0 ? p - 1 : -1, px < N - 1 ? p + 1 : -1, py > 0 ? p - N : -1, py < N - 1 ? p + N : -1];
      for (var k = 0; k < 4; k++) {
        var q = kom[k];
        if (q < 0 || icinde[q]) continue;
        if (Math.abs(im[q] - toplam / sayi) <= tol) { icinde[q] = 1; kuyruk.push(q); toplam += im[q]; sayi++; }
      }
    }
    return { m: icinde, n: sayi, ort: toplam / sayi };
  }
  function ciz() {
    tEl.textContent = range.value;
    var b = buyut(), d = "", kesisim = 0;
    for (i = 0; i < N * N; i++) if (b.m[i]) {
      d += "M" + (O + (i % N) * C) + " " + (O + Math.floor(i / N) * C) + "h4v4h-4z";
      if (uzman[i]) kesisim++;
    }
    bolgeP.setAttribute("d", d);
    uzmP.style.display = secim.uzm ? "" : "none";
    var sx = O + seed[0] * C + 2, sy = O + seed[1] * C + 2;
    isaret.setAttribute("d", "M" + (sx - 6) + " " + sy + "H" + (sx + 6) + "M" + sx + " " + (sy - 6) + "V" + (sy + 6));
    var dice = 2 * kesisim / (b.n + uzmanSay);
    out.innerHTML = "Region: " + b.n + " pixels = <b>" + (b.n * 9).toLocaleString("en-US") + " mm²</b><br>" +
      "Expert: " + uzmanSay + " pixels = " + (uzmanSay * 9).toLocaleString("en-US") + " mm²<br>" +
      "Dice score: <b>" + dice.toFixed(2) + "</b>" +
      (b.n > 2.5 * uzmanSay ? "<br>The region <b>leaked</b> into healthy tissue." : (dice < 0.75 && kesisim > 0 ? "<br>The region did not <b>cover</b> the whole tumor." : (kesisim === 0 ? "<br>The seed is outside the tumor." : "")));
  }
  svg.addEventListener("click", function (ev) {
    var bb = svg.getBoundingClientRect();
    var vx = (ev.clientX - bb.left) / bb.width * 262 - O, vy = (ev.clientY - bb.top) / bb.height * 262 - O;
    var cx = Math.floor(vx / C), cy = Math.floor(vy / C);
    if (cx < 0 || cy < 0 || cx >= N || cy >= N) return;
    seed = [cx, cy]; ciz();
  });
  range.addEventListener("input", ciz);
  bBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var k = btn.getAttribute("data-b"); secim[k] = !secim[k]; btn.classList.toggle("is-on", secim[k]); ciz();
    });
  });
  ciz();
''',
    'not': ('In medical imaging a segmentation becomes a number: volume, growth, response to treatment. The course teaches '
            'measuring a method against <b>expert labels</b> with Dice, and preprocessing against noise.'),
}
