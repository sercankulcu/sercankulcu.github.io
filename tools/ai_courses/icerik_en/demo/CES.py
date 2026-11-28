# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Delivery Robots Bid for Packages',
    'problem': ('Three delivery robots work on campus with no manager. Each package is auctioned; each robot bids the extra distance '
                'it would add to its route, and the cheapest wins. Run auctions step by step or click the map to add packages.'),
    'html': '''
<svg viewBox="0 0 390 270" width="390" height="270" role="img" aria-label="Robots, packages and routes"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-a="0">Reset</button><button type="button" data-a="1">One auction</button><button type="button" data-a="2">Allocate all</button></div>
  <label>Packages = <b class="ai-n">7</b></label>
  <input type="range" min="3" max="12" step="1" value="7" aria-label="Number of packages">
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var range = root.querySelector("input"), nEl = root.querySelector(".ai-n");
  var ROB = [[34, 36], [356, 54], [196, 246]];
  var RENK = ["var(--ds-link)", "#e9a23b", "var(--ds-good)"];
  var tohum = 5;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  var HAVUZ = [];
  while (HAVUZ.length < 12) {
    var p = [26 + rnd() * 338, 22 + rnd() * 210], ok = true;
    HAVUZ.concat(ROB).forEach(function (q) { if (Math.hypot(p[0] - q[0], p[1] - q[1]) < 38) ok = false; });
    if (ok) HAVUZ.push(p);
  }
  var gorev, rota, sira, son, ek = [];
  function d(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
  function m(px) { return Math.round(px * 2); }
  function uzunluk(r, rt) { var s = 0, o = ROB[r]; rt.forEach(function (g) { s += d(o, gorev[g]); o = gorev[g]; }); return s; }
  function ekle(r, rt, g) {
    var en = Infinity, yer = 0, taban = uzunluk(r, rt);
    for (var i = 0; i <= rt.length; i++) {
      var y = rt.slice(); y.splice(i, 0, g);
      var c = uzunluk(r, y) - taban;
      if (c < en) { en = c; yer = i; }
    }
    return [en, yer];
  }
  function kur() {
    var n = +range.value;
    nEl.textContent = n;
    gorev = HAVUZ.slice(0, n).concat(ek);
    rota = [[], [], []]; sira = 0; son = null;
  }
  function ihale() {
    if (sira >= gorev.length) return;
    var g = sira, teklif = rota.map(function (rt, r) { return ekle(r, rt, g); }), k = 0;
    for (var r = 1; r < 3; r++) if (teklif[r][0] < teklif[k][0]) k = r;
    rota[k].splice(teklif[k][1], 0, g);
    son = { g: g, t: teklif.map(function (x) { return x[0]; }), k: k };
    sira++;
  }
  function sirayla() {
    var rr = [[], [], []];
    for (var g = 0; g < gorev.length; g++) { var r = g % 3, e = ekle(r, rr[r], g); rr[r].splice(e[1], 0, g); }
    return rr.reduce(function (s, rt, r) { return s + uzunluk(r, rt); }, 0);
  }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function ciz() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var cer = mk("rect", { x: 1, y: 1, width: 388, height: 268, rx: 10 });
    cer.style.fill = "color-mix(in srgb, var(--ds-muted) 7%, var(--ds-bg))"; cer.style.stroke = "var(--ds-border)";
    svg.appendChild(cer);
    var sahip = {};
    rota.forEach(function (rt, r) {
      var s = "M" + ROB[r][0] + " " + ROB[r][1];
      rt.forEach(function (g) { s += " L" + gorev[g][0].toFixed(1) + " " + gorev[g][1].toFixed(1); sahip[g] = r; });
      var p = mk("path", { d: s }); p.style.fill = "none"; p.style.stroke = RENK[r]; p.style.strokeWidth = 3; p.style.strokeLinejoin = "round";
      svg.appendChild(p);
    });
    gorev.forEach(function (g, i) {
      var c = mk("rect", { x: g[0] - 9, y: g[1] - 9, width: 18, height: 18, rx: 4 });
      c.style.fill = sahip[i] === undefined ? "var(--ds-bg)" : "color-mix(in srgb, " + RENK[sahip[i]] + " 45%, var(--ds-bg))";
      c.style.stroke = son && son.g === i ? "var(--ds-accent)" : sahip[i] === undefined ? "var(--ds-muted)" : RENK[sahip[i]];
      c.style.strokeWidth = son && son.g === i ? 3 : 1.6;
      svg.appendChild(c);
      var t = mk("text", { x: g[0], y: g[1] + 4, "text-anchor": "middle", "class": "lbl" }, String(i + 1));
      t.style.fill = "var(--ds-text)"; svg.appendChild(t);
    });
    ROB.forEach(function (o, r) {
      var c = mk("circle", { cx: o[0], cy: o[1], r: 13 });
      c.style.fill = RENK[r]; c.style.stroke = "var(--ds-bg)"; c.style.strokeWidth = 2; svg.appendChild(c);
      var t = mk("text", { x: o[0], y: o[1] + 4, "text-anchor": "middle", "class": "lbl" }, "R" + (r + 1));
      t.style.fill = "var(--ds-bg)"; t.style.fontWeight = 700; svg.appendChild(t);
    });
    if (son) {
      outs[0].innerHTML = "Auction for package " + (son.g + 1) + ", extra-distance bids:<br>" + son.t.map(function (v, r) {
        var s = "R" + (r + 1) + " " + m(v) + " m";
        return r === son.k ? "<b>" + s + "</b>" : s;
      }).join(" · ") + "<br>→ <b>R" + (son.k + 1) + "</b> wins. Packages left: " + (gorev.length - sira);
    } else outs[0].innerHTML = gorev.length + " packages awaiting auction. Start with “One auction”.";
    var top = rota.reduce(function (s, rt, r) { return s + uzunluk(r, rt); }, 0);
    outs[1].innerHTML = sira < gorev.length ? "Allocated " + sira + " / " + gorev.length + " packages, total distance so far " + m(top) + " m." :
      "Total distance: <b>" + m(top) + " m</b> with auctions, " + m(sirayla()) + " m with round-robin. Each robot bid knowing only its own route.";
  }
  root.querySelectorAll("[data-a]").forEach(function (b) {
    b.addEventListener("click", function () {
      var a = +b.dataset.a;
      if (a === 0) kur(); else if (a === 1) ihale(); else while (sira < gorev.length) ihale();
      ciz();
    });
  });
  range.addEventListener("input", function () { ek = []; kur(); while (sira < gorev.length) ihale(); ciz(); });
  svg.addEventListener("click", function (ev) {
    if (gorev.length >= 16) return;
    var b = svg.getBoundingClientRect();
    var x = (ev.clientX - b.left) / b.width * 390, y = (ev.clientY - b.top) / b.height * 270;
    var yeni = [Math.min(376, Math.max(14, x)), Math.min(256, Math.max(14, y))];
    ek.push(yeni); gorev.push(yeni);
    while (sira < gorev.length) ihale();
    ciz();
  });
  kur(); while (sira < gorev.length) ihale(); ciz();
''',
    'not': ('The problem was solved not by one program but by <b>negotiating agents</b>: in the Contract Net protocol a manager announces a task '
            'and agents bid according to their own cost. Adding a robot does not break a central plan.'),
}
