/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "A Scalable Approach for Sentiment Analysis of Turkish Tweets and Linking Tweets to News" (IEEE ICSC 2016):
   interactive slides. Numbers are taken from Tables 3–10 of the paper; the mapping lab and the Naive Bayes
   demo run on made-up Turkish examples and say so on their slides. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };

  /* lower-case Turkish text and split it into words */
  function words(s) {
    return s.toLocaleLowerCase("tr").split(/[^a-zçğıöşüâîû]+/).filter(function (w) { return w.length > 1; });
  }
  const STOP = ["bir", "ve", "ile", "bu", "da", "de", "için", "çok", "ama", "ki", "yine", "en", "ne", "şu", "gibi", "daha", "mi", "mı", "mu", "mü", "çok"];
  function fold(w) { return w.replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u"); }
  function lev(a, b) {
    const d = [];
    for (let i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  /* stand-in for Zemberek: edit-distance similarity on ASCII-folded words, plus a shared-stem rule */
  function sim(a, b) {
    const fa = fold(a), fb = fold(b);
    let s = 1 - lev(fa, fb) / Math.max(fa.length, fb.length);
    if (fa === fb && a !== b) s = 0.95;
    let p = 0;
    while (p < fa.length && p < fb.length && fa[p] === fb[p]) p++;
    if (p >= 4 && p >= 0.6 * Math.min(fa.length, fb.length)) s = Math.max(s, 0.91 + 0.01 * Math.min(p - 4, 4));
    return Math.min(1, s);
  }

  /* ---------- 1. Algorithm 2: map a tweet to the most similar news item ---------- */
  (function mapping() {
    const inp = $("tw-map-in");
    if (!inp) return;
    const thr = $("tw-map-thr"), body = $("tw-map-body"), note = $("tw-map-note");
    const NEWS = [
      "İstanbul'da yeni metro hattı hizmete açıldı",
      "Akaryakıt fiyatlarına yeni zam geldi",
      "Milli takım deplasmanda maçı kazandı"
    ];
    const PRE = {
      metro: "metro hatti nihayet acildi harika olmus",
      zam: "benzine yine zam gelmiş fiyatlar uçtu",
      mac: "takım bu akşam harika oynadı maçı hak etti",
      none: "bugün hava çok güzel"
    };
    function run() {
      const t = +thr.value / 100;
      $("tw-map-thr-out").textContent = t.toFixed(2);
      const tw = words(inp.value).filter(function (w) { return STOP.indexOf(w) < 0; });
      const sc = NEWS.map(function (n) {
        const nw = words(n).filter(function (w) { return STOP.indexOf(w) < 0; });
        const hits = [];
        tw.forEach(function (a) { nw.forEach(function (b) { const s = sim(a, b); if (s > t) hits.push(a + " ≈ " + b + " (" + s.toFixed(2) + ")"); }); });
        return { n: n, score: hits.length, hits: hits };
      });
      const max = Math.max.apply(null, sc.map(function (s) { return s.score; }));
      const win = max > 0 ? sc.findIndex(function (s) { return s.score === max; }) : -1;
      body.innerHTML = sc.map(function (s, i) {
        return "<tr" + (i === win ? " class='is-ours'" : "") + "><td>" + s.n + "</td><td class='num'><b>" + s.score + "</b></td><td style='font-size:11.5px'>" + (s.hits.join(", ") || "–") + "</td></tr>";
      }).join("");
      note.innerHTML = win < 0 ? "No word pair passes the threshold: the tweet is not linked to any news item." :
        "Linked to <b>" + NEWS[win] + "</b>." + (sc.filter(function (s) { return s.score === max; }).length > 1 ? " (Tie: the first item with the top score wins, as maxIndex does.)" : "");
    }
    PV.seg($("tw-map-pre"), function (v) { inp.value = PRE[v]; run(); });
    inp.addEventListener("input", run);
    thr.addEventListener("input", run);
  })();

  /* ---------- 2. Naive Bayes vs. Complement Naive Bayes on a tiny made-up training set ---------- */
  (function bayes() {
    const host = $("tw-nb");
    if (!host) return;
    const inp = $("tw-nb-in"), out = $("tw-nb-out");
    /* deliberately imbalanced like the paper's data: twice as many negative as positive tweets */
    const TRAIN = [
      ["neg", "trafik yine felaket berbat bir sabah"], ["neg", "zam haberi berbat gerçekten kötü"],
      ["neg", "maç rezalet hakem çok kötü"], ["neg", "bu karar kötü ve yanlış"],
      ["neg", "yine elektrik kesildi felaket"], ["neg", "fiyatlar çok pahalı rezalet"],
      ["pos", "harika bir maç tebrikler"], ["pos", "güzel haber çok sevindim"], ["pos", "başarılı bir karar tebrikler"]
    ];
    const cnt = { pos: {}, neg: {} }, tot = { pos: 0, neg: 0 }, docs = { pos: 0, neg: 0 }, vocab = {};
    TRAIN.forEach(function (d) {
      docs[d[0]]++;
      words(d[1]).forEach(function (w) { cnt[d[0]][w] = (cnt[d[0]][w] || 0) + 1; tot[d[0]]++; vocab[w] = 1; });
    });
    const V = Object.keys(vocab).length;
    function lp(c, w) { return Math.log(((cnt[c][w] || 0) + 1) / (tot[c] + V)); }
    let mode = "nb";
    function run() {
      const ws = words(inp.value).filter(function (w) { return vocab[w]; });
      /* evidence for "positive" in nats: log P(w|pos) − log P(w|neg). With two classes CNB's complement
         weights give the same word terms; the difference is that CNB ignores the class prior. */
      const rows = ws.map(function (w) { return { k: w, v: lp("pos", w) - lp("neg", w) }; });
      const prior = Math.log(docs.pos / docs.neg);
      if (mode === "nb") rows.unshift({ k: "prior (3 pos : 6 neg)", v: prior, prior: true });
      const total = rows.reduce(function (s, r) { return s + r.v; }, 0);
      const W = 360, rowH = 22, L = 150, M = 255, T = 4, H = T + rowH * Math.max(1, rows.length + 1) + 6;
      const c = PV.svg(host, W, H, "Evidence of each word for the positive class");
      const g = c.svg, x = PV.linear(-2.5, 2.5, M - 100, M + 100);
      PV.el(g, "line", { x1: M, x2: M, y1: 0, y2: H, class: "gl" });
      rows.concat([{ k: "total", v: total, tot: true }]).forEach(function (r, i) {
        const y = T + rowH * i, v = Math.max(-2.5, Math.min(2.5, r.v)), x0 = Math.min(M, x(v)), w = Math.abs(x(v) - M);
        PV.el(g, "text", { x: L - 4, y: y + 15, "text-anchor": "end", class: r.tot ? "tt" : r.prior ? "tk" : "vl" }, r.k);
        PV.el(g, "rect", { x: x0, y: y + 4, width: Math.max(1, w), height: 14, rx: 3, fill: r.v >= 0 ? "var(--pv-s1)" : "var(--pv-s2)", opacity: r.tot ? 1 : 0.75 });
        PV.el(g, "text", { x: r.v >= 0 ? x(v) + 4 : x(v) - 4, y: y + 15, "text-anchor": r.v >= 0 ? "start" : "end", class: "tk" }, (r.v >= 0 ? "+" : "") + r.v.toFixed(2));
      });
      out.innerHTML = !ws.length ? "None of these words occurs in the toy training set, so only the prior speaks." :
        "Decision: <b style='color:" + (total >= 0 ? "var(--pv-s1)" : "var(--pv-s2)") + "'>" + (total >= 0 ? "positive" : "negative") + "</b>" +
        (mode === "nb" ? " (the prior adds " + prior.toFixed(2) + " in favour of the larger negative class)." : " (no prior: the larger negative class gets no head start).");
    }
    PV.seg($("tw-nb-m"), function (v) { mode = v; run(); });
    PV.seg($("tw-nb-pre"), function (v) { inp.value = v; run(); });
    inp.addEventListener("input", run);
  })();

  /* grouped vertical bars for accuracy (%), precision and F1 of several settings */
  function bars(host, rows, label, best) {
    const W = 720, H = 250, L = 46, R = 710, T = 10, B = 196;
    const c = PV.svg(host, W, H, label);
    const g = c.svg, y = PV.linear(0, 1, B, T);
    const COL = ["var(--pv-base)", "var(--pv-s1)", "var(--pv-s2)"], NM = ["Accuracy", "Precision", "F1"];
    for (let v = 0; v <= 1.0001; v += 0.25) {
      PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: v ? "gl" : "ax" });
      PV.el(g, "text", { x: L - 6, y: y(v) + 4, "text-anchor": "end", class: "tk" }, v.toFixed(2));
    }
    const gw = (R - L) / rows.length, bw = Math.min(34, (gw - 24) / 3);
    rows.forEach(function (r, i) {
      const gx = L + gw * i + (gw - bw * 3 - 8) / 2;
      [r.a / 100, r.p, r.f].forEach(function (v, k) {
        const x = gx + k * (bw + 4);
        PV.vbar(g, x, B, bw, B - y(v), "mk", COL[k]);
        PV.el(g, "text", { x: x + bw / 2, y: y(v) - 4, "text-anchor": "middle", class: "tk", style: "font-size:10.5px" }, k ? v.toFixed(3) : r.a.toFixed(1));
      });
      PV.el(g, "text", { x: L + gw * i + gw / 2, y: B + 18, "text-anchor": "middle", class: i === best ? "tt" : "vl" }, r.k);
      if (r.k2) PV.el(g, "text", { x: L + gw * i + gw / 2, y: B + 33, "text-anchor": "middle", class: "tk" }, r.k2);
      const hit = PV.el(g, "rect", { x: L + gw * i, y: T, width: gw, height: B - T, class: "hit", "aria-label": r.k });
      PV.hover(c, hit, "<b>" + r.k + (r.k2 ? " " + r.k2 : "") + "</b><br>" + NM[0] + " " + r.a.toFixed(2) + "%<br>" + NM[1] + " " + r.p.toFixed(3) + "<br>" + NM[2] + " " + r.f.toFixed(3));
    });
  }

  /* ---------- 3. Tables 4, 6, 7 and 8: experiments explorer ---------- */
  (function experiments() {
    const host = $("tw-exp");
    if (!host) return;
    const E = {
      alg: { rows: [{ k: "Complement NB", a: 79.38, p: .977, f: .880 }, { k: "Naive Bayes", a: 78.61, p: .972, f: .873 }, { k: "Logistic Regression", a: 63.12, p: .615, f: .620 }], best: 0,
        n: "Table 4: both Bayes variants are far ahead of logistic regression; Complement NB is best on all three metrics." },
      ngram: { rows: [{ k: "Unigrams", a: 79.38, p: .977, f: .880 }, { k: "Bigrams", a: 77.91, p: .974, f: .864 }, { k: "Trigrams", a: 76.37, p: .932, f: .855 }], best: 0,
        n: "Table 6 (Complement NB, 2 classes): single words work best, as in Pang et al.; longer n-grams add features that overfit a small dataset." },
      cls: { rows: [{ k: "Neg / Pos", a: 79.38, p: .977, f: .880 }, { k: "Neg / Pos+Neu", a: 79.42, p: .985, f: .880 }, { k: "Neg / Neu / Pos", a: 67.62, p: .667, f: .794 }, { k: "SentiStrength", k2: "(3 classes)", a: 67.47, p: .562, f: .593 }], best: 1,
        n: "Table 7: two-class settings reach about 79%; adding a neutral class costs about 12 points. The public SentiStrength Twitter set behaves similarly." },
      lr: { rows: [{ k: "rate 0.7", a: 56.3, p: .565, f: .570 }, { k: "rate 0.8", a: 62.7, p: .667, f: .671 }, { k: "rate 0.9", a: 63.1, p: .641, f: .675 }, { k: "rate 1.0", a: 62.9, p: .635, f: .670 }], best: 2,
        n: "Table 8 (logistic regression, 2 classes): tuning the learning rate helps a little, but accuracy stays near 63%." }
    };
    PV.seg($("tw-exp-g"), function (v) {
      bars(host, E[v].rows, "Accuracy, precision and F1", E[v].best);
      $("tw-exp-note").textContent = E[v].n;
    });
  })();

  /* ---------- 4. Table 5: effect of dataset size ---------- */
  (function size() {
    const host = $("tw-size");
    if (!host) return;
    const N = [1000, 2000, 3000, 4000, 5000, 5500, 6000];
    const D = { a: [68.00, 71.78, 72.99, 74.78, 78.14, 79.24, 79.38], p: [.881, .790, .986, .919, .960, .931, .977], f: [.855, .800, .835, .833, .861, .868, .880] };
    PV.seg($("tw-size-m"), function (k) {
      const W = 720, H = 240, L = 56, R = 700, T = 12, B = 200;
      const pct = k === "a", lo = pct ? 65 : 0.75, hi = pct ? 82 : 1.0;
      const c = PV.svg(host, W, H, "Metric against training set size");
      const g = c.svg, x = PV.linear(1000, 6000, L, R), y = PV.linear(lo, hi, B, T);
      const st = pct ? 5 : 0.05;
      for (let v = lo; v <= hi + 1e-9; v += st) {
        PV.el(g, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
        PV.el(g, "text", { x: L - 6, y: y(v) + 4, "text-anchor": "end", class: "tk" }, pct ? v + "%" : v.toFixed(2));
      }
      N.forEach(function (n) { PV.el(g, "text", { x: x(n), y: B + 18, "text-anchor": "middle", class: "tk" }, n); });
      PV.el(g, "text", { x: (L + R) / 2, y: H - 2, "text-anchor": "middle", class: "tk" }, "tweets used");
      const v = D[k];
      PV.el(g, "path", { d: v.map(function (val, i) { return (i ? "L" : "M") + x(N[i]) + " " + y(val); }).join(" "), fill: "none", stroke: "var(--pv-s1)", "stroke-width": 2.5 });
      v.forEach(function (val, i) {
        PV.el(g, "circle", { cx: x(N[i]), cy: y(val), r: 5, fill: "var(--pv-s1)", stroke: "var(--ds-bg)", "stroke-width": 2 });
        PV.el(g, "text", { x: x(N[i]), y: y(val) - 10, "text-anchor": "middle", class: "vl", style: "font-size:11px" }, pct ? val.toFixed(1) : val.toFixed(3));
        const hit = PV.el(g, "rect", { x: x(N[i]) - 25, y: T, width: 50, height: B - T, class: "hit", "aria-label": N[i] + " tweets" });
        PV.hover(c, hit, "<b>" + N[i] + " tweets</b><br>accuracy " + D.a[i].toFixed(2) + "%<br>precision " + D.p[i].toFixed(3) + "<br>F1 " + D.f[i].toFixed(3));
      });
      $("tw-size-note").textContent = pct ? "Accuracy rises steadily from 68% to 79.4% and flattens after 5,500 tweets." :
        k === "p" ? "Precision jumps around (0.79 to 0.99): with small test sets a few tweets change it a lot." :
          "F1 dips from 0.855 to 0.800 at 2,000 tweets, then climbs to 0.880 at 6,000.";
    });
  })();

  /* ---------- 5. Table 10: single node vs. six-node cluster ---------- */
  (function speed() {
    const host = $("tw-speed");
    if (!host) return;
    const D = [["Single node", 2137], ["Cluster, 6 nodes", 637]];
    const W = 360, H = 120, L = 112, R = 300, T = 8, rowH = 40;
    const c = PV.svg(host, W, H, "Elapsed time for a 100 MB dataset");
    const g = c.svg, x = PV.linear(0, 2400, L, R);
    D.forEach(function (d, i) {
      const y = T + rowH * i;
      PV.el(g, "text", { x: L - 8, y: y + 18, "text-anchor": "end", class: "tt" }, d[0]);
      PV.hbar(g, x(0), y + 4, x(d[1]) - x(0), 22, "mk", i ? "var(--pv-s1)" : "var(--pv-base)");
      PV.el(g, "text", { x: x(d[1]) + 6, y: y + 20, class: "vl" }, d[1] + " s");
    });
    PV.el(g, "text", { x: L, y: H - 8, class: "tk" }, "speed-up " + (2137 / 637).toFixed(2) + "× on 6 nodes (ideal 6×)");
  })();

  const t = $("tw-rel");
  if (t) PV.sortable(t);
})();
