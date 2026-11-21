# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Who Should Start the Campaign?',
    'problem': ('A club will hand its announcement to one person in the friendship network of its 18 members. Click a person to see '
                'their centrality, find the communities, then watch the news spread from that person step by step.'),
    'html': '''
<svg viewBox="0 0 390 284" width="390" height="284" role="img" aria-label="Friendship network of the club members" style="cursor:pointer"></svg>
<div class="ai-side">
  <div class="ai-ctl">Size: <button type="button" data-o="der">Degree</button><button type="button" data-o="ara" class="is-on">Betweenness</button></div>
  <div class="ai-ctl"><button type="button" data-t="1">Find communities</button><button type="button" data-y="1">Start spreading</button></div>
  <label>Pass-on probability p = <b class="ai-p">0.4</b></label>
  <input type="range" min="0.1" max="0.9" step="0.1" value="0.4" aria-label="Pass-on probability">
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var range = root.querySelector("input"), pEl = root.querySelector(".ai-p");
  var oBtn = root.querySelectorAll("[data-o]"), tBtn = root.querySelector("[data-t]"), yBtn = root.querySelector("[data-y]");
  var ad = ["Ayşe", "Can", "Ece", "Mert", "Deniz", "Selin", "Bora", "Elif", "Kaan", "Zeynep", "Onur", "Ada", "Emre", "Naz", "Umut", "İpek", "Arda", "Defne"];
  var P = [[52, 52], [112, 30], [30, 116], [98, 104], [158, 70], [70, 168], [252, 40], [318, 28], [362, 92], [298, 104], [232, 116], [346, 160], [146, 214], [216, 252], [272, 206], [206, 182], [112, 258], [306, 256]];
  var E = [[0, 1], [0, 2], [0, 3], [1, 3], [1, 4], [2, 3], [2, 5], [3, 4], [3, 5],
    [6, 7], [6, 9], [6, 10], [7, 8], [7, 9], [8, 9], [8, 11], [9, 10], [9, 11],
    [12, 15], [12, 16], [12, 13], [13, 15], [13, 16], [13, 14], [14, 15], [14, 17], [13, 17],
    [4, 10], [4, 15], [5, 12]];
  var n = P.length, kom = [];
  for (var i = 0; i < n; i++) kom.push([]);
  E.forEach(function (e) { kom[e[0]].push(e[1]); kom[e[1]].push(e[0]); });
  var bc = [];
  for (i = 0; i < n; i++) bc.push(0);
  for (var s = 0; s < n; s++) {
    var S = [], pr = [], sg = [], d = [], q = [s], v, w;
    for (i = 0; i < n; i++) { pr.push([]); sg.push(0); d.push(-1); }
    sg[s] = 1; d[s] = 0;
    while (q.length) { v = q.shift(); S.push(v); kom[v].forEach(function (w) {
      if (d[w] < 0) { q.push(w); d[w] = d[v] + 1; }
      if (d[w] === d[v] + 1) { sg[w] += sg[v]; pr[w].push(v); } }); }
    var dl = []; for (i = 0; i < n; i++) dl.push(0);
    while (S.length) { w = S.pop(); pr[w].forEach(function (v) { dl[v] += sg[v] / sg[w] * (1 + dl[w]); }); if (w !== s) bc[w] += dl[w] / 2; }
  }
  var bmax = 0; bc.forEach(function (b) { if (b > bmax) bmax = b; });
  var norm = (n - 1) * (n - 2) / 2;
  var olcu = "ara", sec = 4, etiket = null, bilen = null, yeni = {}, adim = 0, timer = null, tohum = 5;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  var renk = ["var(--ds-link)", "var(--ds-good)", "#e9a23b", "var(--ds-accent)", "var(--ds-muted)"];
  function f2(x) { return x.toFixed(2); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt != null) e.textContent = txt; return e; }
  function sira(arr, i) { var r = 1; arr.forEach(function (x) { if (x > arr[i]) r++; }); return r; }
  function topluluk() {
    var lab = []; for (var i = 0; i < n; i++) lab.push(i);
    var sirasi = lab.slice(), t = 3;
    for (var tur = 0; tur < 20; tur++) {
      for (i = n - 1; i > 0; i--) { t = (t * 16807) % 2147483647; var j = t % (i + 1), x = sirasi[i]; sirasi[i] = sirasi[j]; sirasi[j] = x; }
      var degisti = false;
      sirasi.forEach(function (v) {
        var say = {}; kom[v].forEach(function (w) { say[lab[w]] = (say[lab[w]] || 0) + 1; });
        var best = 0, l;
        for (l in say) if (say[l] > best) best = say[l];
        if ((say[lab[v]] || 0) === best) return;
        var en = 1e9; for (l in say) if (say[l] === best && +l < en) en = +l;
        lab[v] = en; degisti = true;
      });
      if (!degisti) break;
    }
    var esle = {}, k = 0; lab = lab.map(function (l) { if (!(l in esle)) esle[l] = k++; return esle[l]; });
    var m = E.length, Q = 0;
    for (var c = 0; c < k; c++) {
      var ic = 0, dt = 0;
      E.forEach(function (e) { if (lab[e[0]] === c && lab[e[1]] === c) ic++; });
      for (i = 0; i < n; i++) if (lab[i] === c) dt += kom[i].length;
      Q += ic / m - Math.pow(dt / (2 * m), 2);
    }
    return { lab: lab, k: k, Q: Q, tur: tur + 1 };
  }
  function ciz() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    E.forEach(function (e) {
      var l = mk("line", { x1: P[e[0]][0], y1: P[e[0]][1], x2: P[e[1]][0], y2: P[e[1]][1], "class": "line" });
      var kopru = etiket && etiket.lab[e[0]] !== etiket.lab[e[1]];
      var akti = bilen && ((bilen[e[0]] && yeni[e[1]] === e[0]) || (bilen[e[1]] && yeni[e[0]] === e[1]));
      l.style.strokeWidth = akti ? 3.5 : 1.5; l.style.opacity = akti ? 1 : 0.55;
      if (akti) l.style.stroke = "var(--ds-accent)";
      if (kopru) l.style.strokeDasharray = "4 3";
      svg.appendChild(l);
    });
    for (var i = 0; i < n; i++) {
      var deger = olcu === "der" ? kom[i].length / 5 : bc[i] / bmax;
      var r = 7 + 11 * Math.sqrt(deger);
      var c = mk("circle", { cx: P[i][0], cy: P[i][1], r: r });
      var dolgu = "color-mix(in srgb, var(--ds-link) 22%, var(--ds-bg))";
      if (etiket) dolgu = "color-mix(in srgb, " + renk[etiket.lab[i] % 5] + " 55%, var(--ds-bg))";
      if (bilen) dolgu = bilen[i] ? "var(--ds-accent)" : "color-mix(in srgb, var(--ds-muted) 18%, var(--ds-bg))";
      c.style.fill = dolgu;
      c.style.stroke = i === sec ? "var(--ds-text)" : "var(--ds-bg)"; c.style.strokeWidth = i === sec ? 3 : 1.5;
      svg.appendChild(c);
      var t = mk("text", { x: P[i][0], y: P[i][1] + r + 11, "class": "lbl", "text-anchor": "middle" }, ad[i]);
      t.style.fontSize = "11px"; if (i === sec) t.style.fontWeight = 700;
      svg.appendChild(t);
    }
    var dg = kom.map(function (k) { return k.length; });
    outs[0].innerHTML = "<b>" + ad[sec] + "</b>: degree <b>" + dg[sec] + "</b> (rank " + sira(dg, sec) + "), betweenness <b>" +
      f2(bc[sec] / norm) + "</b> (rank " + sira(bc, sec) + ")";
    if (bilen) {
      var b = 0; for (i = 0; i < n; i++) if (bilen[i]) b++;
      var gr = {}; if (etiket) for (i = 0; i < n; i++) if (bilen[i]) gr[etiket.lab[i]] = 1;
      outs[1].innerHTML = "Step <b>" + adim + "</b>: " + b + " / " + n + " people heard the news" + (timer ? "…" : ". Spreading stopped.") +
        (etiket ? " Communities reached: <b>" + Object.keys(gr).length + "</b> / " + etiket.k : "");
    } else if (etiket) {
      outs[1].innerHTML = "Label propagation stopped after " + etiket.tur + " rounds: <b>" + etiket.k + "</b> communities, modularity Q = <b>" + f2(etiket.Q) + "</b>. Dashed edges are bridges between communities.";
    } else outs[1].textContent = "Betweenness counts how many shortest paths pass through a person; bridges score high even with few friends.";
  }
  function dur() { if (timer) { clearInterval(timer); timer = null; } }
  function yay() {
    dur(); bilen = {}; bilen[sec] = true; yeni = {}; adim = 0;
    var p = +range.value, son = [sec], denendi = {};
    timer = setInterval(function () {
      var sonraki = [];
      son.forEach(function (v) { kom[v].forEach(function (w) {
        var k = v + "-" + w;
        if (!bilen[w] && !denendi[k]) { denendi[k] = 1; if (rnd() < p) { bilen[w] = true; yeni[w] = v; sonraki.push(w); } } }); });
      adim++; son = sonraki;
      if (!son.length) dur();
      ciz();
    }, 550);
    ciz();
  }
  svg.addEventListener("click", function (ev) {
    var bb = svg.getBoundingClientRect();
    var x = (ev.clientX - bb.left) / bb.width * 390, y = (ev.clientY - bb.top) / bb.height * 284, en = 0, ed = 1e9;
    for (var i = 0; i < n; i++) { var dd = Math.hypot(P[i][0] - x, P[i][1] - y); if (dd < ed) { ed = dd; en = i; } }
    sec = en; dur(); bilen = null; ciz();
  });
  oBtn.forEach(function (b) { b.addEventListener("click", function () { olcu = b.getAttribute("data-o"); oBtn.forEach(function (o) { o.classList.toggle("is-on", o === b); }); ciz(); }); });
  tBtn.addEventListener("click", function () { etiket = topluluk(); tBtn.classList.add("is-on"); dur(); bilen = null; ciz(); });
  yBtn.addEventListener("click", yay);
  range.addEventListener("input", function () { pEl.textContent = (+range.value).toFixed(1); });
  ciz();
''',
    'not': ('By degree, people with many friends such as Mert stand out, but the bridge between groups is Deniz (betweenness). Starting '
            'the news at a bridge carries it into several communities; this is how influencers are chosen.'),
}
