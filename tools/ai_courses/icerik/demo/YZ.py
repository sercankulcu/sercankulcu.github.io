# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Depo Robotu Yolunu Arıyor',
    'problem': ('Bir depo robotu <b>R</b> karesinden rafların arasından geçerek <b>H</b> karesindeki ürüne gitmeli. '
                'Kareye tıklayıp raf ekleyin ya da kaldırın; iki arama yönteminin kaç kareye baktığını karşılaştırın.'),
    'html': '''
<svg viewBox="0 0 390 262" width="390" height="262" role="img" aria-label="Depo ızgarası"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-a="bfs">Genişlik öncelikli (BFS)</button><button type="button" data-a="astar" class="is-on">A* araması</button></div>
  <div class="ai-ctl"><button type="button" data-r="1">Rafları sıfırla</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px">Mavi kareler aramanın incelediği durumlar, turuncu kareler bulunan yol. A*, hedefe kalan Manhattan uzaklığını <b>sezgisel</b> olarak kullanır; bu yüzden daha az kareye bakar.</div>
</div>''',
    'js': r'''
  var W = 12, H = 8, S = 32, OX = 3, OY = 3;
  var start = [0, 6], goal = [11, 1];
  var ilk = [[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[7,0],[7,1],[7,2],[7,3],[7,4],[5,5],[6,5],[7,5],[9,3],[10,3],[11,3]];
  var wall = {};
  var svg = root.querySelector("svg");
  var outs = root.querySelectorAll(".ai-out");
  var alg = "astar";
  var cell = {};
  var timer = null;
  function k(x, y) { return x + "," + y; }
  function sifirla() { wall = {}; ilk.forEach(function (p) { wall[k(p[0], p[1])] = true; }); }
  function mk(tag, at) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); return e; }
  for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
    (function (x, y) {
      var r = mk("rect", { x: OX + x * S, y: OY + y * S, width: S - 2, height: S - 2, rx: 4 });
      r.style.cursor = "pointer";
      r.addEventListener("click", function () {
        if ((x === start[0] && y === start[1]) || (x === goal[0] && y === goal[1])) return;
        wall[k(x, y)] = !wall[k(x, y)];
        calis();
      });
      svg.appendChild(r);
      cell[k(x, y)] = r;
    })(x, y);
  }
  [[start, "R"], [goal, "H"]].forEach(function (p) {
    var t = mk("text", { x: OX + p[0][0] * S + S / 2 - 1, y: OY + p[0][1] * S + S / 2 + 5, "text-anchor": "middle" });
    t.setAttribute("class", "txt"); t.style.pointerEvents = "none"; t.textContent = p[1];
    svg.appendChild(t);
  });
  function ara(tur) {
    var acik = [[start[0], start[1], 0]], g = {}, onceki = {}, gorulen = [], kapali = {};
    g[k(start[0], start[1])] = 0;
    while (acik.length) {
      var bi = 0;
      if (tur === "astar") {
        for (var i = 1; i < acik.length; i++) {
          var fi = acik[i][2] + Math.abs(acik[i][0] - goal[0]) + Math.abs(acik[i][1] - goal[1]);
          var fb = acik[bi][2] + Math.abs(acik[bi][0] - goal[0]) + Math.abs(acik[bi][1] - goal[1]);
          if (fi < fb) bi = i;
        }
      }
      var u = acik.splice(bi, 1)[0], ku = k(u[0], u[1]);
      if (kapali[ku]) continue;
      kapali[ku] = true; gorulen.push(ku);
      if (u[0] === goal[0] && u[1] === goal[1]) break;
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(function (d) {
        var nx = u[0] + d[0], ny = u[1] + d[1], kn = k(nx, ny);
        if (nx < 0 || ny < 0 || nx >= W || ny >= H || wall[kn] || kapali[kn]) return;
        if (g[kn] === undefined || u[2] + 1 < g[kn]) { g[kn] = u[2] + 1; onceki[kn] = ku; acik.push([nx, ny, u[2] + 1]); }
      });
    }
    var yol = [], c = k(goal[0], goal[1]);
    if (kapali[c]) { while (c) { yol.push(c); c = onceki[c]; } }
    return { gorulen: gorulen, yol: yol };
  }
  function boya(c, renk) { cell[c].style.fill = renk; }
  function calis() {
    if (timer) clearInterval(timer);
    var a = ara("bfs"), b = ara("astar"), r = alg === "astar" ? b : a;
    for (var c in cell) { cell[c].style.stroke = "var(--ds-border)"; boya(c, wall[c] ? "var(--ds-muted)" : "var(--ds-bg)"); }
    var i = 0;
    timer = setInterval(function () {
      if (i < r.gorulen.length) { boya(r.gorulen[i], "color-mix(in srgb, var(--ds-link) 28%, var(--ds-bg))"); i++; return; }
      clearInterval(timer); timer = null;
      r.yol.forEach(function (c) { boya(c, "color-mix(in srgb, #e9a23b 70%, var(--ds-bg))"); });
    }, 12);
    outs[0].innerHTML = r.yol.length
      ? "<b>" + (alg === "astar" ? "A*" : "BFS") + "</b>: " + r.gorulen.length + " kare incelendi, yol " + (r.yol.length - 1) + " adım.<br>" +
        "Karşılaştırma: BFS " + a.gorulen.length + " kare, A* " + b.gorulen.length + " kare. İkisi de en kısa yolu bulur."
      : "<b>Yol yok:</b> raflar hedefi tamamen kapatıyor. Arama " + r.gorulen.length + " kareyi inceleyip durdu.";
  }
  root.querySelectorAll("[data-a]").forEach(function (b) {
    b.addEventListener("click", function () {
      alg = b.dataset.a;
      root.querySelectorAll("[data-a]").forEach(function (x) { x.classList.toggle("is-on", x === b); });
      calis();
    });
  });
  root.querySelector("[data-r]").addEventListener("click", function () { sifirla(); calis(); });
  sifirla(); calis();
''',
    'not': ('Problem önce <b>durum uzayı</b> olarak kurulur: her kare bir durum, her adım bir eylem, hedef kare amaç. '
            'Arama algoritması bu uzayda yolu bulur; hiçbir şey öğrenilmez.'),
}
