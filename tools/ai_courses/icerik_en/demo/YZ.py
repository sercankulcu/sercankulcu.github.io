# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'A Warehouse Robot Finds Its Way',
    'problem': ('A warehouse robot must travel from cell <b>R</b> between the shelves to the item in cell <b>H</b>. '
                'Click a cell to add or remove a shelf; compare how many cells the two search methods examine.'),
    'html': '''
<svg viewBox="0 0 390 262" width="390" height="262" role="img" aria-label="Warehouse grid"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-a="bfs">Breadth-first (BFS)</button><button type="button" data-a="astar" class="is-on">A* search</button></div>
  <div class="ai-ctl"><button type="button" data-r="1">Reset shelves</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px">Blue cells are states the search examined, orange cells the path found. A* uses the remaining Manhattan distance to the goal as a <b>heuristic</b>, so it looks at fewer cells.</div>
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
      ? "<b>" + (alg === "astar" ? "A*" : "BFS") + "</b>: " + r.gorulen.length + " cells examined, path " + (r.yol.length - 1) + " steps.<br>" +
        "Comparison: BFS " + a.gorulen.length + " cells, A* " + b.gorulen.length + " cells. Both find the shortest path."
      : "<b>No path:</b> the shelves block the goal completely. The search stopped after " + r.gorulen.length + " cells.";
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
    'not': ('The problem is first set up as a <b>state space</b>: each cell is a state, each move an action, the target cell the goal. '
            'The search algorithm finds a path in this space; nothing is learned.'),
}
