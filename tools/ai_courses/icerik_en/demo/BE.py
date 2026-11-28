# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Searching a Help Center',
    'problem': ('A shopping site\'s help center has nine articles, and customers type questions in their own words. '
                'Pick a sample question or type your own; articles are ranked by TF-IDF weights and cosine similarity.'),
    'html': '''
<svg viewBox="0 0 390 286" width="390" height="286" role="img" aria-label="Similarity of the articles to the query"></svg>
<div class="ai-side">
  <input type="text" value="my order arrived damaged" aria-label="Search query" maxlength="60">
  <div class="ai-ctl"><button type="button" data-q="my order arrived damaged" class="is-on">arrived damaged</button><button type="button" data-q="how much is the shipping fee">shipping fee</button><button type="button" data-q="when is my money refunded">refund</button><button type="button" data-q="password reset">password</button></div>
  <div class="ai-ctl"><button type="button" data-m="tfidf" class="is-on">TF-IDF</button><button type="button" data-m="tf">Counts only (TF)</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px"></div>
</div>''',
    'css': '''
.ds-deck .ai-demo input[type=text] { width: 100%; box-sizing: border-box; padding: 5px 10px; border: 1.5px solid var(--ds-border); border-radius: 8px; background: var(--ds-bg); color: var(--ds-text); font: inherit; font-size: 14px; }
''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out"), inp = root.querySelector("input[type=text]");
  var qBtn = root.querySelectorAll("[data-q]"), mBtn = root.querySelectorAll("[data-m]");
  var belge = [
    ["What is the shipping fee?", "Shipping is free on orders over 150 TL; for smaller orders the shipping fee is 39 TL."],
    ["How do I cancel my order?", "An order can be cancelled on the My Orders page before it is shipped."],
    ["How do I return an item?", "You can return an item within 14 days; it ships free with the return code."],
    ["When is my money refunded?", "Once the return is approved, the money is refunded to your card within 3 to 7 business days."],
    ["Paying in installments", "Credit cards allow up to 6 monthly installments; debit cards do not."],
    ["I forgot my password", "Click Forgot password on the login page; a reset link is sent to your e-mail."],
    ["Where is my order?", "The tracking number is on the My Orders page; an order usually arrives in 2 days."],
    ["Can I change the billing address?", "The billing address of a placed order cannot be changed; fix it in account settings for new orders."],
    ["Damaged item arrived", "Photograph the damaged item and write to us within 48 hours; we will exchange or refund it."]
  ];
  var mod = "tfidf";
  function kelimeler(s) { return s.toLowerCase().split(/[^a-zçğıöşüâî0-9]+/).filter(function (w) { return w.length > 1; }); }
  function kok(w) { return w.length > 4 ? w.slice(0, 4) : w; }
  function say(s) { var t = {}; kelimeler(s).forEach(function (w) { var k = kok(w); t[k] = (t[k] || 0) + 1; }); return t; }
  var tf = belge.map(function (b) { return say(b[0] + " " + b[1]); });
  var df = {};
  tf.forEach(function (t) { for (var k in t) df[k] = (df[k] || 0) + 1; });
  var N = belge.length;
  function idf(k) { return df[k] ? Math.log(N / df[k]) : 0; }
  function vek(t) { var v = {}; for (var k in t) v[k] = mod === "tf" ? t[k] : t[k] * idf(k); return v; }
  function boy(v) { var s = 0; for (var k in v) s += v[k] * v[k]; return Math.sqrt(s); }
  function kos(a, b) { var s = 0; for (var k in a) if (b[k]) s += a[k] * b[k]; var n = boy(a) * boy(b); return n ? s / n : 0; }
  function kac(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt != null) e.textContent = txt; return e; }
  function f2(x) { return x.toFixed(2); }
  function ciz() {
    var qt = say(inp.value), qv = vek(qt);
    var sk = belge.map(function (b, i) { return [kos(qv, vek(tf[i])), i]; });
    sk.sort(function (a, b) { return b[0] - a[0] || a[1] - b[1]; });
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.appendChild(mk("text", { x: 4, y: 13, "class": "lbl" }, "Article"));
    svg.appendChild(mk("text", { x: 386, y: 13, "class": "lbl", "text-anchor": "end" }, "cosine similarity"));
    var BX = 214, BW = 136;
    sk.forEach(function (s, r) {
      var y = 22 + r * 29.4, ilk = r === 0 && s[0] > 0;
      if (ilk) { var bg = mk("rect", { x: 0, y: y, width: 390, height: 27, rx: 6 }); bg.style.fill = "color-mix(in srgb, var(--ds-good) 14%, var(--ds-bg))"; svg.appendChild(bg); }
      var t = mk("text", { x: 6, y: y + 18, "class": "txt" }, (r + 1) + ". " + belge[s[1]][0]);
      t.style.fontSize = "12.5px"; if (ilk) t.style.fontWeight = 700;
      svg.appendChild(t);
      var g = mk("rect", { x: BX, y: y + 8, width: BW, height: 11, rx: 3 }); g.style.fill = "var(--ds-border)"; g.style.opacity = 0.35; svg.appendChild(g);
      var bar = mk("rect", { x: BX, y: y + 8, width: Math.max(0, s[0] * BW), height: 11, rx: 3 });
      bar.style.fill = ilk ? "var(--ds-good)" : "var(--ds-link)"; svg.appendChild(bar);
      var n = mk("text", { x: 386, y: y + 18, "class": "txt", "text-anchor": "end" }, f2(s[0])); n.style.fontSize = "12px"; svg.appendChild(n);
    });
    var terim = Object.keys(qt).map(function (k) { return "<span style=\"white-space:nowrap\">" + kac(k) + (mod === "tf" ? "" : " <b>" + f2(idf(k)) + "</b>") + (df[k] ? "" : " (none)") + "</span>"; });
    var es = sk.filter(function (s) { return s[0] > 0; }).length;
    outs[0].innerHTML = (terim.length ? "Term stems" + (mod === "tf" ? "" : " and IDF") + ": " + terim.join(", ") : "Empty query.") +
      "<br>Matching articles: <b>" + es + "</b> / " + N + (sk[0][0] > 0 && sk[1][0] > 0 ? " · gap between 1st and 2nd: <b>" + f2(sk[0][0] - sk[1][0]) + "</b>" : "");
    if (sk[0][0] > 0) {
      var b = belge[sk[0][1]][1];
      outs[1].innerHTML = "Top result: " + b.split(" ").map(function (w) { var k = kelimeler(w); return k.length && qt[kok(k[0])] ? "<b>" + kac(w) + "</b>" : kac(w); }).join(" ");
    } else outs[1].textContent = "No article contains a query term.";
  }
  qBtn.forEach(function (b) { b.addEventListener("click", function () { inp.value = b.getAttribute("data-q"); qBtn.forEach(function (o) { o.classList.toggle("is-on", o === b); }); ciz(); }); });
  mBtn.forEach(function (b) { b.addEventListener("click", function () { mod = b.getAttribute("data-m"); mBtn.forEach(function (o) { o.classList.toggle("is-on", o === b); }); ciz(); }); });
  inp.addEventListener("input", function () { qBtn.forEach(function (o) { o.classList.toggle("is-on", o.getAttribute("data-q") === inp.value); }); ciz(); });
  ciz();
''',
    'not': ('IDF down-weights words such as “my” and “order” that appear in many articles, so the distinctive “damaged” '
            'stands out. Compare with the TF button. Cutting each word to its first four letters is a crude stemmer: damage, damaged → dama.'),
}
