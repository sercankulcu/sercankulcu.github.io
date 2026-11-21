# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Align Two Gene Fragments',
    'problem': ('How similar are DNA fragments of the same gene in two species? The Needleman-Wunsch table finds the best alignment. '
                'Change the sequences and scores, then click a cell to see how it was computed.'),
    'html': '''
<svg viewBox="0 0 270 270" width="270" height="270" role="img" aria-label="Dynamic programming table"></svg>
<div class="ai-side">
  <div class="ai-ctl"><label>Seq 1</label><input type="text" class="ai-a" maxlength="9" value="GATTACA" aria-label="Sequence 1"><label>Seq 2</label><input type="text" class="ai-b" maxlength="9" value="GCATGCA" aria-label="Sequence 2"></div>
  <div class="ai-sl">
    <label>Match <b class="ai-v1">+1</b></label><input type="range" class="ai-r1" min="1" max="5" step="1" value="1" aria-label="Match reward">
    <label>Mismatch <b class="ai-v2">−1</b></label><input type="range" class="ai-r2" min="0" max="5" step="1" value="1" aria-label="Mismatch penalty">
    <label>Gap <b class="ai-v3">−1</b></label><input type="range" class="ai-r3" min="0" max="5" step="1" value="1" aria-label="Gap penalty">
  </div>
  <div class="ai-out ai-hz"></div>
  <div class="ai-out ai-hc" style="font-size:13px"></div>
</div>''',
    'css': '''
.ds-deck .ai-demo input[type=text] { width: 92px; box-sizing: border-box; padding: 3px 7px; border: 1.5px solid var(--ds-border); border-radius: 8px; background: var(--ds-bg); color: var(--ds-text); font-family: monospace; font-size: 14px; letter-spacing: 1px; }
.ds-deck .ai-demo input[type=text]:focus { outline: none; border-color: var(--ds-link); }
.ds-deck .ai-demo .ai-sl { display: grid; grid-template-columns: 112px 1fr; align-items: center; gap: 4px 8px; }
.ds-deck .ai-demo .ai-hz { font-family: monospace; font-size: 14.5px; line-height: 1.15; white-space: pre; }''',
    'js': r'''
  var svg = root.querySelector("svg"), ia = root.querySelector(".ai-a"), ib = root.querySelector(".ai-b");
  var r1 = root.querySelector(".ai-r1"), r2 = root.querySelector(".ai-r2"), r3 = root.querySelector(".ai-r3");
  var hz = root.querySelector(".ai-hz"), hc = root.querySelector(".ai-hc"), sec = null;
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt !== undefined) e.textContent = txt; return e; }
  function temiz(s) { return s.toUpperCase().replace(/[^ACGT]/g, "").slice(0, 9); }
  function say(v) { return v < 0 ? "−" + (-v) : "" + v; }
  function isa(v) { return v > 0 ? "+" + v : (v < 0 ? "−" + (-v) : "0"); }
  function ciz() {
    var A = temiz(ia.value) || "A", Bs = temiz(ib.value) || "A";
    var E = +r1.value, U = -r2.value, G = -r3.value, m = A.length, n = Bs.length;
    root.querySelector(".ai-v1").textContent = isa(E); root.querySelector(".ai-v2").textContent = isa(U); root.querySelector(".ai-v3").textContent = isa(G);
    var T = [], Y = [];
    for (var i = 0; i <= m; i++) { T.push([]); Y.push([]); for (var j = 0; j <= n; j++) {
      if (i === 0 && j === 0) { T[i][j] = 0; Y[i][j] = ""; continue; }
      if (i === 0) { T[i][j] = j * G; Y[i][j] = "L"; continue; }
      if (j === 0) { T[i][j] = i * G; Y[i][j] = "U"; continue; }
      var c = T[i - 1][j - 1] + (A.charAt(i - 1) === Bs.charAt(j - 1) ? E : U), u = T[i - 1][j] + G, l = T[i][j - 1] + G;
      var b = Math.max(c, u, l); T[i][j] = b; Y[i][j] = b === c ? "D" : (b === u ? "U" : "L");
    } }
    var yol = {}, s1 = "", s2 = "", orta = "", ii = m, jj = n, es = 0, uy = 0, bo = 0;
    yol[ii + "," + jj] = true;
    while (ii > 0 || jj > 0) {
      var y = Y[ii][jj];
      if (y === "D") { var x1 = A.charAt(ii - 1), x2 = Bs.charAt(jj - 1); s1 = x1 + s1; s2 = x2 + s2; orta = (x1 === x2 ? "|" : "·") + orta; if (x1 === x2) es++; else uy++; ii--; jj--; }
      else if (y === "U") { s1 = A.charAt(ii - 1) + s1; s2 = "-" + s2; orta = " " + orta; bo++; ii--; }
      else { s1 = "-" + s1; s2 = Bs.charAt(jj - 1) + s2; orta = " " + orta; bo++; jj--; }
      yol[ii + "," + jj] = true;
    }
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var C = Math.min(28, Math.floor(268 / (Math.max(m, n) + 2))), O = 1;
    function hucre(r, c2) { return [O + (c2 + 1) * C, O + (r + 1) * C]; }
    for (var j2 = 0; j2 <= n; j2++) {
      var t = mk("text", { x: hucre(0, j2)[0] + C / 2, y: O + C / 2 + 5, "text-anchor": "middle" }, j2 ? Bs.charAt(j2 - 1) : "–");
      t.style.fontWeight = 700; t.style.fontSize = "14px"; t.style.fill = "var(--ds-link)"; svg.appendChild(t);
    }
    for (var i2 = 0; i2 <= m; i2++) {
      var t2 = mk("text", { x: O + C / 2, y: hucre(i2, 0)[1] + C / 2 + 5, "text-anchor": "middle" }, i2 ? A.charAt(i2 - 1) : "–");
      t2.style.fontWeight = 700; t2.style.fontSize = "14px"; t2.style.fill = "#e9a23b"; svg.appendChild(t2);
    }
    if (sec && (sec[0] > m || sec[1] > n)) sec = null;
    for (var r = 0; r <= m; r++) for (var c3 = 0; c3 <= n; c3++) {
      (function (r, c3) {
        var p = hucre(r, c3), uz = yol[r + "," + c3], se = sec && sec[0] === r && sec[1] === c3;
        var kare = mk("rect", { x: p[0] + 0.5, y: p[1] + 0.5, width: C - 1, height: C - 1, rx: 3 });
        kare.style.fill = uz ? "color-mix(in srgb, #e9a23b 45%, var(--ds-bg))" : "var(--ds-bg)";
        kare.style.stroke = se ? "var(--ds-accent)" : "var(--ds-border)"; kare.style.strokeWidth = se ? 2.5 : 1;
        kare.style.cursor = "pointer";
        svg.appendChild(kare);
        var v = mk("text", { x: p[0] + C / 2, y: p[1] + C / 2 + 4, "text-anchor": "middle" }, say(T[r][c3]));
        v.style.fontSize = C > 24 ? "12px" : "10.5px"; v.style.fill = "var(--ds-text)"; v.style.fontWeight = uz ? 700 : 400; v.style.pointerEvents = "none";
        svg.appendChild(v);
        kare.addEventListener("click", function () { sec = [r, c3]; ciz(); });
      })(r, c3);
    }
    hz.innerHTML = s1 + "\n" + orta + "\n" + s2;
    var aciklama = "";
    if (sec && sec[0] > 0 && sec[1] > 0) {
      var a1 = sec[0], b1 = sec[1], es2 = A.charAt(a1 - 1) === Bs.charAt(b1 - 1), w = es2 ? E : U;
      aciklama = "Cell (" + A.charAt(a1 - 1) + ", " + Bs.charAt(b1 - 1) + "): diagonal " + say(T[a1 - 1][b1 - 1]) + isa(w) + "=" + say(T[a1 - 1][b1 - 1] + w) +
        ", up " + say(T[a1 - 1][b1]) + isa(G) + "=" + say(T[a1 - 1][b1] + G) + ", left " + say(T[a1][b1 - 1]) + isa(G) + "=" + say(T[a1][b1 - 1] + G) +
        " → maximum <b>" + say(T[a1][b1]) + "</b>";
    } else if (sec) {
      aciklama = "First row and column: only gaps are placed before the sequence, each gap " + isa(G) + ".";
    }
    var ozet = "Score <b>" + say(T[m][n]) + "</b>: " + es + " matches, " + uy + " mismatches, " + bo + " gaps (orange path).";
    hc.innerHTML = ozet + (aciklama ? "<br>" + aciklama : "");
  }
  [ia, ib].forEach(function (x) { x.addEventListener("input", function () { sec = null; ciz(); }); });
  [r1, r2, r3].forEach(function (x) { x.addEventListener("input", ciz); });
  svg.addEventListener("click", function (ev) { if (ev.target === svg) { sec = null; ciz(); } });
  ciz();
''',
    'not': ('Bioinformatics turns evolution into a <b>scoring model</b>: filling the table takes m×n steps, while trying every alignment '
            'is exponential. The same idea underlies tools such as BLAST.'),
}
