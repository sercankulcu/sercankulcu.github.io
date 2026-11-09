/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "A Survey on Semantic Web and Big Data Technologies for Social Network Analysis" (IEEE BigData 2016):
   interactive slides. The RDF graph is Fig. 1, the technology data are Table I and the systems and
   comparisons named in the text; the iteration cost demo uses made-up unit costs and says so. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };

  /* ---------- 1. Fig. 1 as data: a tiny SPARQL pattern matcher ---------- */
  (function rdf() {
    const host = $("sv-rdf");
    if (!host) return;
    const P = { sercan: [70, 40], omer: [390, 40], dido: [230, 140], doruk: [70, 240], melis: [390, 240] };
    const T = [
      ["sercan", "knows", "omer"], ["sercan", "listens", "dido"], ["sercan", "fatherOf", "doruk"],
      ["omer", "follows", "dido"], ["omer", "fatherOf", "melis"], ["dido", "likes", "doruk"], ["melis", "friendOf", "doruk"]
    ];
    const Q = {
      knows: { q: [["?person", "knows", "?other"]], txt: "Who knows whom? One triple pattern, one match." },
      father: { q: [["?parent", "fatherOf", "?child"]], txt: "All parent–child pairs: the same predicate on two edges." },
      dido: { q: [["?x", "?p", "dido"]], txt: "Anything pointing at :dido, with the predicate itself as a variable." },
      friends: { q: [["?parent", "fatherOf", "?child"], ["?child", "friendOf", "?friend"]], txt: "Two patterns joined on ?child: friends of someone's child." },
      hop: { q: [["?a", "?p1", "?b"], ["?b", "?p2", "doruk"]], txt: "Two-hop paths into :doruk, the kind of path query SNA needs." }
    };
    function isVar(t) { return t.charAt(0) === "?"; }
    function solve(pats) {
      const out = [];
      (function step(i, b, used) {
        if (i === pats.length) { out.push({ b: Object.assign({}, b), used: used.slice() }); return; }
        T.forEach(function (tr, k) {
          const nb = Object.assign({}, b);
          const ok = pats[i].every(function (term, j) {
            if (!isVar(term)) return term === tr[j];
            if (nb[term] !== undefined) return nb[term] === tr[j];
            nb[term] = tr[j];
            return true;
          });
          if (ok) step(i + 1, nb, used.concat([k]));
        });
      })(0, {}, []);
      return out;
    }
    function term(t) { return isVar(t) ? t : ":" + t; }
    PV.seg($("sv-rdf-q"), function (key) {
      const q = Q[key], sol = solve(q.q), hit = {};
      sol.forEach(function (s) { s.used.forEach(function (k) { hit[k] = true; }); });
      const c = PV.svg(host, 470, 280, "RDF graph of Fig. 1 with the edges matched by the query");
      const g = c.svg;
      const defs = PV.el(g, "defs");
      ["n", "h"].forEach(function (id) {
        const m = PV.el(defs, "marker", { id: "sv-arr-" + id, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" });
        PV.el(m, "path", { d: "M0 0 L10 5 L0 10 z", fill: id === "h" ? "var(--pv-s2)" : "var(--pv-base)" });
      });
      T.forEach(function (tr, k) {
        const a = P[tr[0]], b = P[tr[2]], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
        const ux = dx / L, uy = dy / L;
        const pad = function (u, v) { return Math.min(Math.abs(46 / (u || 1e-9)), Math.abs(16 / (v || 1e-9))); };
        const s = pad(ux, uy) + 2, e = pad(ux, uy) + 4;
        const on = hit[k];
        PV.el(g, "line", { x1: a[0] + ux * s, y1: a[1] + uy * s, x2: b[0] - ux * e, y2: b[1] - uy * e, stroke: on ? "var(--pv-s2)" : "var(--pv-base)", "stroke-width": on ? 3 : 1.4, "marker-end": "url(#sv-arr-" + (on ? "h" : "n") + ")" });
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
        const lab = PV.el(g, "text", { x: mx + (dy === 0 ? 0 : 8), y: my + (dy === 0 ? -6 : 4), "text-anchor": dy === 0 ? "middle" : "start", class: on ? "tt" : "tk" }, ":" + tr[1]);
        if (on) lab.setAttribute("style", "fill:var(--pv-s2)");
      });
      const inSol = {};
      sol.forEach(function (s) { Object.keys(s.b).forEach(function (v) { inSol[s.b[v]] = true; }); });
      Object.keys(P).forEach(function (n) {
        const p = P[n], on = inSol[n];
        PV.el(g, "rect", { x: p[0] - 46, y: p[1] - 16, width: 92, height: 32, rx: 8, fill: on ? "var(--pv-s1)" : "var(--ds-surface-strong)", "fill-opacity": on ? 0.2 : 1, stroke: on ? "var(--pv-s1)" : "var(--ds-border-base)", "stroke-width": on ? 2 : 1 });
        PV.el(g, "text", { x: p[0], y: p[1] + 5, "text-anchor": "middle", class: "tt" }, ":" + n);
      });
      const vars = [];
      q.q.forEach(function (pt) { pt.forEach(function (t) { if (isVar(t) && vars.indexOf(t) < 0) vars.push(t); }); });
      $("sv-rdf-sparql").textContent = "SELECT " + vars.join(" ") + " WHERE { " + q.q.map(function (pt) { return pt.map(term).join(" "); }).join(" . ") + " }";
      $("sv-rdf-head").innerHTML = "<tr>" + vars.map(function (v) { return "<th>" + v + "</th>"; }).join("") + "</tr>";
      $("sv-rdf-body").innerHTML = sol.map(function (s) { return "<tr>" + vars.map(function (v) { return "<td>:" + s.b[v] + "</td>"; }).join("") + "</tr>"; }).join("");
      $("sv-rdf-note").textContent = q.txt + " " + sol.length + " solution" + (sol.length === 1 ? "" : "s") + ".";
    });
  })();

  /* ---------- 2. Table I: which services use which technologies ---------- */
  (function tech() {
    const host = $("sv-tech");
    if (!host) return;
    const S = {
      "Amazon": ["DynamoDB", "SimpleDB"], "eBay": ["MongoDB", "Neo4j"], "Facebook": ["Cassandra", "HBase", "Giraph", "Presto", "Neo4j"],
      "Flickr": ["MongoDB", "Neo4j"], "Foursquare": ["Cassandra", "CouchDB", "InfoGrid", "MongoDB", "Riak"], "Google+": ["BigTable"],
      "Instagram": ["Cassandra"], "LinkedIn": ["AllegroGraph", "HBase", "MongoDB", "Neo4j"], "Twitter": ["Cassandra", "FlockDB", "HBase", "Neo4j", "Pig"],
      "Yahoo!": ["HBase"], "Yandex": ["MongoDB"], "YouTube": ["BigTable"]
    };
    const K = {
      "MongoDB": "document store", "Neo4j": "graph database", "Cassandra": "wide-column store", "HBase": "wide-column store", "BigTable": "wide-column store",
      "DynamoDB": "key-value store", "SimpleDB": "key-value store", "Riak": "key-value store", "CouchDB": "document store", "InfoGrid": "graph database",
      "AllegroGraph": "graph database / triplestore", "FlockDB": "graph database", "Giraph": "graph processing", "Presto": "SQL query engine", "Pig": "data-flow language"
    };
    const cnt = {};
    Object.keys(S).forEach(function (s) { S[s].forEach(function (t) { cnt[t] = (cnt[t] || 0) + 1; }); });
    const techs = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a] || a.localeCompare(b); });
    const svc = $("sv-svc"), note = $("sv-tech-note");
    let sel = { kind: "tech", v: "MongoDB" };
    function draw() {
      const W = 380, rowH = 18, L = 100, R = 330, T = 2, H = T + rowH * techs.length + 4;
      const c = PV.svg(host, W, H, "Number of services in Table I that use each technology");
      const g = c.svg, x = PV.linear(0, 5, L, R);
      const lit = sel.kind === "tech" ? [sel.v] : S[sel.v];
      techs.forEach(function (t, i) {
        const y = T + rowH * i, on = lit.indexOf(t) >= 0;
        PV.el(g, "text", { x: L - 6, y: y + 13, "text-anchor": "end", class: on ? "tt" : "tk" }, t);
        PV.hbar(g, x(0), y + 3, x(cnt[t]) - x(0), rowH - 6, "mk", on ? "var(--pv-s2)" : "var(--pv-s1)");
        PV.el(g, "text", { x: x(cnt[t]) + 5, y: y + 13, class: "vl" }, cnt[t]);
        const hit = PV.el(g, "rect", { x: 0, y: y, width: W, height: rowH, class: "hit", tabindex: 0, "aria-label": t + ", used by " + cnt[t] });
        hit.addEventListener("click", function () { sel = { kind: "tech", v: t }; draw(); });
        hit.addEventListener("keydown", function (e) { if (e.key === "Enter") { sel = { kind: "tech", v: t }; draw(); } });
      });
      svc.innerHTML = "";
      Object.keys(S).forEach(function (s) {
        const on = sel.kind === "svc" ? s === sel.v : S[s].indexOf(sel.v) >= 0;
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = s;
        if (on) b.className = "is-on";
        b.addEventListener("click", function () { sel = { kind: "svc", v: s }; draw(); });
        svc.appendChild(b);
      });
      if (sel.kind === "tech") {
        const users = Object.keys(S).filter(function (s) { return S[s].indexOf(sel.v) >= 0; });
        note.innerHTML = "<b>" + sel.v + "</b> (" + K[sel.v] + ") is listed for " + users.length + " of 12 services: " + users.join(", ") + ".";
      } else {
        note.innerHTML = "<b>" + sel.v + "</b> uses " + S[sel.v].map(function (t) { return t + " (" + K[t] + ")"; }).join(", ") + ".";
      }
    }
    draw();
  })();

  /* ---------- 3. why iterative graph jobs suit Spark better than Hadoop (illustrative) ---------- */
  (function iter() {
    const host = $("sv-iter");
    if (!host) return;
    const it = $("sv-iter-n"), io = $("sv-iter-io");
    function draw() {
      const n = +it.value, d = +io.value, C = 1;
      $("sv-iter-n-out").textContent = n;
      $("sv-iter-io-out").textContent = d + "×";
      /* Hadoop: every iteration reads from and writes to HDFS; Spark: load once, iterate in memory, write once */
      const H1 = n * (d + C + d), S1 = d + n * C + d;
      const W = 720, H = 130, L = 120, R = 640;
      const c = PV.svg(host, W, H, "Illustrative running time of an iterative job");
      const g = c.svg, x = PV.linear(0, Math.max(H1, S1), L, R);
      [["Hadoop MapReduce", [["read", n * d, "var(--pv-base)"], ["compute", n * C, "var(--pv-s1)"], ["write", n * d, "var(--pv-s2)"]], H1],
        ["Spark (RDDs)", [["read", d, "var(--pv-base)"], ["compute", n * C, "var(--pv-s1)"], ["write", d, "var(--pv-s2)"]], S1]].forEach(function (row, i) {
        const y = 14 + i * 50;
        PV.el(g, "text", { x: L - 8, y: y + 19, "text-anchor": "end", class: "tt" }, row[0]);
        let acc = 0;
        row[1].forEach(function (s) {
          if (s[1] > 0) PV.el(g, "rect", { x: x(acc), y: y, width: Math.max(0.5, x(acc + s[1]) - x(acc) - 1), height: 28, fill: s[2], rx: 2 });
          acc += s[1];
        });
        PV.el(g, "text", { x: x(acc) + 6, y: y + 19, class: "vl" }, row[2] + " units");
      });
      $("sv-iter-out").innerHTML = "Hadoop needs <b>" + (H1 / S1).toFixed(1) + "×</b> the time in this toy model. Disk I/O grows with every iteration on Hadoop but only once on Spark, so the gap widens with more iterations and costlier I/O.";
    }
    [it, io].forEach(function (e) { e.addEventListener("input", draw); });
    draw();
  })();

  /* ---------- 4. speed-up factors reported by the studies the survey cites ---------- */
  (function speed() {
    const host = $("sv-speed");
    if (!host) return;
    const D = [
      ["Spark vs Hadoop MapReduce", 100, "up to", "[49]"],
      ["GraphX vs Hadoop MapReduce", 8, "", "[48]"],
      ["GraphX vs GraphChi, Giraph, GraphLab", 2, "", "[65]"],
      ["Giraph, GraphX vs MapReduce", 2, "", "[70]"],
      ["SPARQL→MapReduce translation vs earlier methods", 2, "", "[58]"]
    ];
    const W = 720, rowH = 30, L = 300, R = 640, T = 4, H = T + rowH * D.length + 22;
    const c = PV.svg(host, W, H, "Speed-up factors reported in the cited studies");
    const g = c.svg, x = PV.log(1, 100, L, R);
    [1, 2, 5, 10, 20, 50, 100].forEach(function (v) {
      PV.el(g, "line", { x1: x(v), x2: x(v), y1: T, y2: T + rowH * D.length, class: "gl" });
      PV.el(g, "text", { x: x(v), y: T + rowH * D.length + 16, "text-anchor": "middle", class: "tk" }, v + "×");
    });
    D.forEach(function (d, i) {
      const y = T + rowH * i;
      PV.el(g, "text", { x: L - 8, y: y + 19, "text-anchor": "end", class: "tt" }, d[0]);
      PV.hbar(g, x(1), y + 6, Math.max(2, x(d[1]) - x(1)), rowH - 12, "mk", i === 0 ? "var(--pv-s2)" : "var(--pv-s1)");
      PV.el(g, "text", { x: Math.min(x(d[1]) + 6, R - 4), y: y + 19, "text-anchor": x(d[1]) + 60 > R ? "end" : "start", class: "vl", style: x(d[1]) + 60 > R ? "fill:#fff;font-weight:700" : "" }, (d[2] ? d[2] + " " : "") + d[1] + "× " + d[3]);
      const hit = PV.el(g, "rect", { x: 0, y: y, width: W, height: rowH, class: "hit", "aria-label": d[0] });
      PV.hover(c, hit, "<b>" + d[0] + "</b><br>" + (d[2] ? d[2] + " " : "") + d[1] + "× faster, reported in " + d[3] + "<br>different workloads and clusters: not comparable across rows");
    });
  })();

  /* ---------- 5. Section IV: hybrid RDF systems by underlying platform ---------- */
  (function hybrid() {
    const host = $("sv-hyb");
    if (!host) return;
    const D = [
      ["Hadoop", ["SHARD", "nHopDB", "SHAPE", "HadoopRDF", "RAPID+", "EAGRE", "HadoopSPARQL", "CliqueSquare"]],
      ["Spark", ["SPARQLGX", "S2RDF", "SeBiDa"]],
      ["Pig", ["PigSPARQL", "SPARQling"]],
      ["HBase", ["RDFChain", "H2RDF+"]],
      ["Accumulo", ["RYA"]],
      ["Cassandra", ["CumulusRDF"]],
      ["SimpleDB", ["Stratustore"]],
      ["Trinity", ["Trinity.RDF"]]
    ];
    const note = $("sv-hyb-note");
    let cur = 0;
    function draw() {
      const W = 400, rowH = 24, L = 80, R = 360, T = 2, H = T + rowH * D.length + 4;
      const c = PV.svg(host, W, H, "Distributed RDF systems named in Section IV, by platform");
      const g = c.svg, x = PV.linear(0, 8, L, R);
      D.forEach(function (d, i) {
        const y = T + rowH * i, on = i === cur;
        PV.el(g, "text", { x: L - 6, y: y + 16, "text-anchor": "end", class: on ? "tt" : "tk" }, d[0]);
        PV.hbar(g, x(0), y + 4, x(d[1].length) - x(0), rowH - 8, "mk", on ? "var(--pv-s2)" : "var(--pv-s1)");
        PV.el(g, "text", { x: x(d[1].length) + 5, y: y + 16, class: "vl" }, d[1].length);
        const hit = PV.el(g, "rect", { x: 0, y: y, width: W, height: rowH, class: "hit", tabindex: 0, "aria-label": d[0] });
        hit.addEventListener("click", function () { cur = i; draw(); });
        hit.addEventListener("keydown", function (e) { if (e.key === "Enter") { cur = i; draw(); } });
      });
      note.innerHTML = "<b>" + D[cur][0] + "-based</b>: " + D[cur][1].join(", ") + ".";
    }
    draw();
  })();
})();
