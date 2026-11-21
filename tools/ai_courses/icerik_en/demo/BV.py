# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Word Count over Search Logs',
    'problem': ('A site\'s search logs do not fit on one machine; worker machines must count together how often each word was searched. '
                'Go step by step: Map → Shuffle → Reduce. Change the number of workers and the combiner, and watch the time.'),
    'html': '''
<svg viewBox="0 0 390 290" width="390" height="290" role="img" aria-label="Data flow between Map and Reduce workers"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-a="ileri" class="is-on">Next step ▶</button><button type="button" data-a="bas">Restart</button></div>
  <label>Workers = <b class="ai-m">3</b></label>
  <input type="range" min="1" max="4" step="1" value="3" aria-label="Number of workers">
  <div class="ai-ctl"><button type="button" data-c="1">Combiner</button></div>
  <div class="ai-out"></div>
  <div class="ai-out ai-o2" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var range = root.querySelector("input"), mEl = root.querySelector(".ai-m"), cb = root.querySelector("[data-c]");
  var SATIR = ["info host info", "disk info node", "cpu info query", "host node info disk", "query info cpu", "info disk disk",
    "node host info", "cpu query info info", "host disk node", "info cpu host", "query node info", "disk info host cpu"];
  var SOZ = ["info", "host", "disk", "node", "cpu", "query"];
  var RENK = ["var(--ds-link)", "var(--ds-good)", "#e9a23b", "var(--ds-accent)", "#8a63d2", "var(--ds-muted)"];
  var adim = 0, comb = false;
  var ADLAR = ["Split", "Map", "Shuffle", "Reduce"];
  function f(v, d) { return v.toFixed(d); }
  function mk(tag, at, txt) {
    var e = document.createElementNS(SVGNS, tag);
    for (var a in at) { if (a === "font-size") e.style.fontSize = at[a] + "px"; else if (a === "font-weight") e.style.fontWeight = at[a]; else e.setAttribute(a, at[a]); }
    if (txt) e.textContent = txt; return e;
  }
  function bolum(w) { var h = 0; for (var i = 0; i < w.length; i++) h = (h * 31 + w.charCodeAt(i)) % 1000; return h; }
  function calistir(M) {
    var parca = [];
    for (var m = 0; m < M; m++) parca.push([]);
    SATIR.forEach(function (s, i) { parca[Math.floor(i * M / SATIR.length)].push(s); });
    var harita = parca.map(function (p) {
      var cift = [];
      p.forEach(function (s) { s.split(" ").forEach(function (w) { cift.push([SOZ.indexOf(w), 1]); }); });
      var sozSay = cift.length;
      if (comb) {
        var t = {}; cift.forEach(function (c) { t[c[0]] = (t[c[0]] || 0) + 1; });
        cift = Object.keys(t).map(function (k) { return [+k, t[k]]; }).sort(function (a, b) { return a[0] - b[0]; });
      }
      return { sozSay: sozSay, cift: cift };
    });
    var hedef = SOZ.map(function (w) { return bolum(w) % M; });
    var gelen = [], akis = [], ag = 0;
    for (var r = 0; r < M; r++) { gelen.push([]); akis.push([]); for (var q = 0; q < M; q++) akis[r].push(0); }
    harita.forEach(function (h, m) {
      h.cift.forEach(function (c) { var r = hedef[c[0]]; gelen[r].push(c); akis[m][r]++; if (r !== m) ag++; });
    });
    var sonuc = gelen.map(function (g) {
      var t = {}; g.forEach(function (c) { t[c[0]] = (t[c[0]] || 0) + c[1]; });
      return Object.keys(t).map(function (k) { return [+k, t[k]]; }).sort(function (a, b) { return a[0] - b[0]; });
    });
    var tMap = 0, tRed = 0;
    harita.forEach(function (h) { tMap = Math.max(tMap, 30 + 10 * h.sozSay + (comb ? 2 * h.sozSay : 0)); });
    gelen.forEach(function (g) { tRed = Math.max(tRed, 20 + 4 * g.length); });
    var tKar = 15 + 4 * ag;
    return { parca: parca, harita: harita, gelen: gelen, sonuc: sonuc, akis: akis, ag: ag, sure: [5 + 2 * SATIR.length, tMap, tKar, tRed] };
  }
  function ciz() {
    var M = +range.value;
    mEl.textContent = M;
    var R = calistir(M);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var GAP = 8, TOP = 20, BH = (290 - TOP - 2 - GAP * (M - 1)) / M;
    var MX = 2, MW = 178, RX = 236, RW = 152;
    svg.appendChild(mk("text", { x: MX + 4, y: 13, "class": "lbl" }, "Map workers"));
    svg.appendChild(mk("text", { x: RX + 4, y: 13, "class": "lbl" }, "Reduce workers"));
    function kutu(x, y, w, h, aktif) {
      var r = mk("rect", { x: x, y: y, width: w, height: h, rx: 8, "class": "box" });
      r.style.fill = aktif ? "color-mix(in srgb, var(--ds-link) 10%, var(--ds-bg))" : "var(--ds-bg)";
      r.style.stroke = aktif ? "var(--ds-link)" : "var(--ds-border)";
      r.style.strokeWidth = 1.5;
      svg.appendChild(r);
    }
    function nok(x, y, c, etiket) {
      var e = mk("circle", { cx: x, cy: y, r: etiket ? 6.5 : 3.6 }); e.style.fill = RENK[c[0]]; svg.appendChild(e);
      if (etiket) { var t = mk("text", { x: x, y: y + 3.5, "text-anchor": "middle", "font-size": 9.5, "font-weight": 700 }, String(c[1])); t.style.fill = "var(--ds-bg)"; svg.appendChild(t); }
    }
    if (adim >= 2) {
      for (var m = 0; m < M; m++) for (var r = 0; r < M; r++) {
        var n = R.akis[m][r]; if (!n) continue;
        var y1 = TOP + m * (BH + GAP) + BH / 2, y2 = TOP + r * (BH + GAP) + BH / 2;
        var p = mk("path", { d: "M" + (MX + MW) + " " + y1 + " C" + (MX + MW + 30) + " " + y1 + " " + (RX - 30) + " " + y2 + " " + RX + " " + y2, fill: "none", "stroke-width": Math.min(9, 0.8 + n * 0.55) });
        p.style.stroke = m === r ? "var(--ds-good)" : "var(--ds-muted)"; p.style.opacity = 0.55;
        svg.appendChild(p);
      }
    }
    var LH = Math.min(11, (BH - 14) / (R.parca[0].length + 1.4));
    R.parca.forEach(function (pc, m) {
      var y = TOP + m * (BH + GAP);
      kutu(MX, y, MW, BH, adim === 1);
      svg.appendChild(mk("text", { x: MX + MW - 6, y: y + 11, "class": "lbl", "text-anchor": "end", "font-size": 10 }, "W" + (m + 1)));
      if (adim < 1) {
        pc.forEach(function (s, i) { svg.appendChild(mk("text", { x: MX + 7, y: y + 12 + i * LH, "font-size": Math.min(10, LH), "class": "txt" }, s)); });
      } else {
        var h = R.harita[m], dx = comb ? 15 : 8.6, per = Math.floor((MW - 14) / dx);
        h.cift.forEach(function (c, i) { nok(MX + 10 + (i % per) * dx, y + 14 + Math.floor(i / per) * (comb ? 15 : 9), c, comb); });
        svg.appendChild(mk("text", { x: MX + 7, y: y + BH - 5, "class": "lbl", "font-size": 10 }, h.cift.length + " (word, count) pairs"));
      }
    });
    for (var r2 = 0; r2 < M; r2++) {
      var y = TOP + r2 * (BH + GAP);
      kutu(RX, y, RW, BH, adim === 3);
      if (adim === 2) {
        var g = R.gelen[r2].slice().sort(function (a, b) { return a[0] - b[0]; }), dx2 = comb ? 15 : 8.6, per2 = Math.floor((RW - 14) / dx2);
        g.forEach(function (c, i) { nok(RX + 10 + (i % per2) * dx2, y + 12 + Math.floor(i / per2) * (comb ? 15 : 9), c, comb); });
        if (!g.length) svg.appendChild(mk("text", { x: RX + 8, y: y + 14, "class": "lbl", "font-size": 10 }, "no keys"));
      } else if (adim === 3) {
        var so = R.sonuc[r2], lh = Math.min(13, (BH - 4) / Math.max(1, so.length));
        so.forEach(function (c, i) {
          var yy = y + 4 + lh * (i + 0.75);
          var e = mk("circle", { cx: RX + 11, cy: yy - 3.5, r: 4 }); e.style.fill = RENK[c[0]]; svg.appendChild(e);
          svg.appendChild(mk("text", { x: RX + 20, y: yy, "class": "txt", "font-size": Math.min(11.5, lh) }, SOZ[c[0]] + ": " + c[1]));
        });
        if (!so.length) svg.appendChild(mk("text", { x: RX + 8, y: y + 14, "class": "lbl", "font-size": 10 }, "no keys"));
      }
    }
    var top = 0; for (var k = 0; k <= adim; k++) top += R.sure[k];
    var sat = [];
    for (k = 0; k < 4; k++) sat.push((k <= adim ? "" : "<span style=\"color:var(--ds-muted)\">") + ADLAR[k] + ": " + R.sure[k] + " ms" + (k <= adim ? "" : "</span>"));
    outs[0].innerHTML = "<b>Step " + (adim + 1) + "/4: " + ADLAR[adim] + "</b><br>" + sat.join(" · ") + "<br>Elapsed time: <b>" + top + " ms</b>";
    var r1 = calistir(1), tek = r1.sure[0] + r1.sure[1] + r1.sure[2] + r1.sure[3];
    var tum = R.sure[0] + R.sure[1] + R.sure[2] + R.sure[3];
    var acik = ["The text was split into " + M + " parts; each worker reads its own part.",
      "Each worker emitted a (word, " + (comb ? "count" : "1") + ") pair per word. The slowest worker sets the step time.",
      R.ag + " pairs crossed the network; a given word always goes to the same Reduce worker (gray: network, green: local).",
      "Each Reduce worker summed its own words. Total " + tum + " ms; with one worker " + tek + " ms."];
    outs[1].innerHTML = acik[adim];
  }
  root.querySelectorAll("[data-a]").forEach(function (b) {
    b.addEventListener("click", function () { adim = b.dataset.a === "bas" ? 0 : Math.min(3, adim + 1); ciz(); });
  });
  cb.addEventListener("click", function () { comb = !comb; cb.classList.toggle("is-on", comb); ciz(); });
  range.addEventListener("input", ciz);
  ciz();
''',
    'not': ('A big data course teaches moving computation to the data: Map and Reduce tasks run independently, so adding workers speeds things up, '
            'but network traffic and the slowest worker set a limit. The <b>combiner</b> cuts the number of pairs on the network.'),
}
