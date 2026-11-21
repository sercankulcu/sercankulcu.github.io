# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Is the Customer Review Positive?',
    'problem': ('An online store gets thousands of reviews a day; negative ones should go straight to customer service. '
                'Pick a sample review or write your own; the model scores the words one by one.'),
    'html': '''
<svg viewBox="0 0 400 236" width="400" height="236" role="img" aria-label="Words of the review, word scores and total sentiment score"></svg>
<div class="ai-side">
  <select aria-label="Sample review"></select>
  <input type="text" aria-label="Review text" maxlength="140">
  <div class="ai-ctl"><button type="button" class="is-on" data-a="neg">Apply negation (“not”, “n't”)</button></div>
  <div class="ai-out"></div>
</div>''',
    'css': '''
.ds-deck .ai-demo select, .ds-deck .ai-demo input[type=text] { width: 100%; box-sizing: border-box; padding: 5px 8px; border: 1.5px solid var(--ds-border); border-radius: 8px; background: var(--ds-bg); color: var(--ds-text); font: inherit; font-size: 13.5px; }''',
    'js': r'''
  var svg = root.querySelector("svg"), out = root.querySelector(".ai-out");
  var sec = root.querySelector("select"), kutu = root.querySelector("input[type=text]"), nb = root.querySelector("[data-a=neg]");
  var HAZIR = [
    "Shipping was very fast, the product is excellent and sturdy. I recommend it.",
    "The product is nice but shipping was very late, and the box was crushed.",
    "It is not expensive, and the quality is not bad either.",
    "Did not like it at all, the box arrived broken, I returned it.",
    "The screen is not good but the battery is great, I am happy."
  ];
  var SOZ = [["great", 3], ["excellent", 3], ["awful", -3], ["terrible", -3], ["nice", 2], ["solid", 2], ["poor", -2],
    ["good", 2], ["happy", 2], ["recommend", 2], ["like", 2], ["love", 2], ["sturdy", 1], ["fast", 1], ["bad", -2], ["faulty", -2],
    ["broken", -2], ["crushed", -2], ["worse", -2], ["return", -1], ["late", -1], ["slow", -1], ["expensive", -1], ["problem", -1], ["cheap", 1]];
  var FIIL = {};
  var olumsuzlama = true;
  HAZIR.forEach(function (h, i) { var o = document.createElement("option"); o.value = i; o.textContent = (i + 1) + ". " + h.slice(0, 34) + "…"; sec.appendChild(o); });
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt !== undefined) e.textContent = txt; return e; }
  function bul(s) {
    for (var i = 0; i < SOZ.length; i++) {
      var k = SOZ[i][0];
      if (s.indexOf(k) === 0 && (k.length >= 4 || FIIL[k] || s.length <= k.length + 3)) {
        return [SOZ[i][1], 0];
      }
    }
    return null;
  }
  function coz(metin) {
    var tok = metin.toLowerCase().split(/[^a-z']+/).filter(function (t) { return t.length > 0; });
    var res = [], carpan = 1, guclu = 1, bekleyen = false;
    tok.forEach(function (t) {
      var r = { t: t, w: 0, not: "" };
      if (t === "but" || t === "however" || t === "yet") { carpan = 1.5; r.not = "after ×1.5"; }
      else if (t === "very" || t === "really") { guclu = 1.5; r.not = "intensifies"; }
      else if (t === "not" || t === "never" || t === "no" || /n't$/.test(t)) {
        r.not = "negates";
        if (olumsuzlama) bekleyen = true;
      } else {
        var b = bul(t);
        if (b) {
          r.w = b[0] * guclu * carpan;
          if (bekleyen) { r.w = -r.w; r.ters = 1; bekleyen = false; }
          guclu = 1;
        }
      }
      res.push(r);
    });
    return res;
  }
  function f(v) { return (v > 0 ? "+" : v < 0 ? "−" : "") + (Math.round(Math.abs(v) * 10) / 10).toString(); }
  function ciz() {
    var res = coz(kutu.value), top = 0;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var x = 2, y = 4, H = 46;
    res.forEach(function (r) {
      top += r.w;
      var alt = r.w !== 0 ? f(r.w) + (r.ters ? " ↺" : "") : r.not;
      var w = Math.max(34, r.t.length * 9 + 16, alt ? alt.length * 6.2 + 6 : 0);
      if (x + w > 398) { x = 2; y += H; }
      if (y > 140) return;
      var renk = r.w > 0 ? "var(--ds-good)" : r.w < 0 ? "var(--ds-bad)" : (r.not ? "var(--ds-link)" : "var(--ds-border)");
      var yuz = Math.min(45, 12 + 9 * Math.abs(r.w));
      var k = mk("rect", { x: x, y: y, width: w, height: 28, rx: 7 });
      k.style.fill = r.w !== 0 ? "color-mix(in srgb, " + renk + " " + yuz + "%, var(--ds-bg))" : "var(--ds-bg)";
      k.style.stroke = renk; k.style.strokeWidth = 1.5;
      svg.appendChild(k);
      svg.appendChild(mk("text", { x: x + w / 2, y: y + 19, "text-anchor": "middle", "class": "txt" }, r.t)).style.fontSize = "15px";
      if (alt) { var a = mk("text", { x: x + w / 2, y: y + 40, "text-anchor": "middle", "class": "lbl" }, alt); a.style.fontSize = "11px"; svg.appendChild(a); }
      x += w + 5;
    });
    var GY = 190, GX0 = 20, GW = 360, M = 8;
    var sk = Math.max(-M, Math.min(M, top));
    var bant = [[-M, -0.5, "var(--ds-bad)"], [-0.5, 0.5, "var(--ds-muted)"], [0.5, M, "var(--ds-good)"]];
    bant.forEach(function (b) {
      var r = mk("rect", { x: GX0 + (b[0] + M) / (2 * M) * GW, y: GY, width: (b[1] - b[0]) / (2 * M) * GW, height: 12 });
      r.style.fill = "color-mix(in srgb, " + b[2] + " 30%, var(--ds-bg))"; svg.appendChild(r);
    });
    var mx = GX0 + (sk + M) / (2 * M) * GW;
    var ib = mk("path", { d: "M" + mx + " " + (GY - 8) + " l-6 -8 h12 Z" }); ib.style.fill = "var(--ds-text)"; svg.appendChild(ib);
    svg.appendChild(mk("text", { x: Math.max(45, Math.min(355, mx)), y: GY - 20, "text-anchor": "middle", "class": "txt" }, "total " + f(top))).style.fontSize = "13px";
    [["negative", GX0, "start"], ["neutral", GX0 + GW / 2, "middle"], ["positive", GX0 + GW, "end"]].forEach(function (e) {
      svg.appendChild(mk("text", { x: e[1], y: GY + 30, "text-anchor": e[2], "class": "lbl" }, e[0]));
    });
    var karar = top > 0.5 ? "positive" : top < -0.5 ? "negative" : "neutral";
    var say = res.filter(function (r) { return r.w !== 0; }).length;
    out.innerHTML = res.length + " words, " + say + " of them carry sentiment.<br>Total score <b>" + f(top) + "</b> → decision: <b style=\"color:" + (karar === "positive" ? "var(--ds-good)" : karar === "negative" ? "var(--ds-bad)" : "var(--ds-muted)") + "\">" + karar + "</b>" +
      (karar === "negative" ? "<br><span style=\"font-size:13px\">The review is routed to customer service.</span>" : "") +
      (olumsuzlama ? "" : "<br><span style=\"font-size:13px\">Negation off: “not good” still counts as praise.</span>");
  }
  sec.addEventListener("change", function () { kutu.value = HAZIR[+sec.value]; ciz(); });
  kutu.addEventListener("input", ciz);
  nb.addEventListener("click", function () { olumsuzlama = !olumsuzlama; nb.classList.toggle("is-on", olumsuzlama); ciz(); });
  sec.value = 4; kutu.value = HAZIR[4];
  ciz();
''',
    'not': ('The computer first splits the text into <b>words</b>, then gives each word a weight. A word like “not” or “didn\'t” '
            'flips the meaning of what follows; language processing has to teach the model this structure.'),
}
