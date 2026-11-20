/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* C ile Veri Yapıları laboratuvarları: sunuma gömülü, adım adım çalışan C kodu (deck.js'ten sonra yüklenir).
   <div class="ds-deck__demo lab-root" data-demo="dsc-lab" data-lab="model-adı">
     <script type="text/x-c" data-fn="fonksiyon">C kodu (sunumdaki kod)</script>   (bir ya da daha çok parça)
     <script type="text/x-lab" data-name="Örnek adı" data-mode="kip">girdi</script> (sunumun örnekleri)
   </div>
   Kod satırının sonundaki "@@etiket" ekranda gösterilmez; model adımları bu etiketlerle satıra bağlar.
   Modeller yapıyı JS'te gerçekten işler (önceden kaydedilmiş animasyon yok): her adım için çalışan satır,
   değişkenler, yapının çizimi, çıktı ve Türkçe açıklama üretilir. Geri düğmesi kayıtlı adımlara döner.
   Node ile de yüklenir (module.exports): test betikleri modelleri C çıktısıyla karşılaştırır. */
(function (root) {
  "use strict";
  var MAX_STEPS = 6000;
  var models = {};
  /* English edition: decks with lang="en" get English interface text, notes and C identifiers
     (Node has no document: tests always run in Turkish) */
  var EN = typeof document !== "undefined" && String(((document.getElementById("ds-deck") || document.documentElement) || { getAttribute: function () { return ""; } }).getAttribute("lang") || "").toLowerCase().indexOf("en") === 0;
  var tx = function (tr, en) { return EN ? en : tr; };
  function pl(n, one, many) { return n + " " + (n === 1 ? one : many); }
  /* input words: in English, the English words are accepted besides the Turkish ones */
  function words(tr, en) {
    if (!EN) return tr;
    var o = {}, k;
    for (k in tr) o[k] = tr[k];
    for (k in en) o[k] = en[k];
    return o;
  }
  /* data-mode aliases for English decks */
  var MODE_EN = { preorder: "onde", inorder: "ortada", postorder: "sonda", level: "duzey", levelorder: "duzey", "level-order": "duzey", reverse: "devrik", invert: "devrik" };

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function Limit() {}
  function InputError(msg) { this.message = msg; }

  /* ---------- izleyici: modeller adımları buraya yazar ---------- */
  function Tracer() { this.steps = []; this.out = ""; this.cur = null; this.viewFn = null; this.varsFn = null; this.fnMap = null; }
  /* fnMap: English function names (the data-fn of the English deck's code fragments) */
  Tracer.prototype.fn = function (f) { this.cur = (this.fnMap && this.fnMap[f]) || f; };
  /* çıktı, onu üreten (son kaydedilen) adıma da yazılır: return/printf satırında görünür */
  Tracer.prototype.print = function (s) { this.out += s; if (this.steps.length) this.steps[this.steps.length - 1].out = this.out; };
  Tracer.prototype.at = function (line, note, ex) {
    if (this.steps.length >= MAX_STEPS) throw new Limit();
    ex = ex || {};
    this.steps.push({
      fn: this.cur, line: line, note: note,
      vars: this.varsFn ? this.varsFn(ex) : [],
      view: this.viewFn ? this.viewFn(ex) : [],
      out: this.out
    });
  };

  function run(name, text, mode) {
    var m = models[name];
    if (!m) throw new Error("model yok: " + name);
    var T = new Tracer(), res = null, truncated = false, data;
    if (EN) { T.fnMap = m.fnEn || null; if (mode && MODE_EN[mode]) mode = MODE_EN[mode]; }
    try { data = m.parse(String(text || ""), mode); }
    catch (e) { if (e instanceof InputError) return { error: e.message }; throw e; }
    try { res = m.run(data, mode, T); }
    catch (e) {
      if (e instanceof Limit) truncated = true;
      else if (e instanceof InputError) return { error: e.message };
      else throw e;
    }
    return { steps: T.steps, result: res, truncated: truncated };
  }

  /* ---------- girdi yardımcıları ---------- */
  function fail(msg) { throw new InputError(msg); }
  function tokens(text) {
    return text.split(/[,;\n]/).map(function (s) { return s.trim(); }).filter(function (s) { return s.length; });
  }
  function int(s, min, max) {
    if (!/^-?\d+$/.test(s)) fail(tx("“" + s + "” bir tam sayı değil", "“" + s + "” is not an integer"));
    var v = parseInt(s, 10);
    if (v < min || v > max) fail(tx(v + " izin verilen aralığın (" + min + "–" + max + ") dışında", v + " is outside the allowed range (" + min + "–" + max + ")"));
    return v;
  }
  function nums(text, min, max, lo, hi) {
    var t = tokens(text);
    if (t.length < lo) fail(tx("en az " + lo + " sayı gerekir", "at least " + lo + (lo === 1 ? " number is" : " numbers are") + " required"));
    if (t.length > hi) fail(tx("en fazla " + hi + " sayı girilebilir", "at most " + hi + " numbers can be entered"));
    return t.map(function (s) { return int(s, min, max); });
  }
  /* "30" → {op: def, x: 30}; "ara 30" → {op: "ara", x: 30}; "al" → {op: "al"} */
  function ops(text, def, words, min, max, hi) {
    var t = tokens(text);
    if (!t.length) fail(tx("girdi boş", "the input is empty"));
    if (t.length > hi) fail(tx("en fazla " + hi + " işlem girilebilir", "at most " + hi + " operations can be entered"));
    return t.map(function (s) {
      var m = /^([a-zçğıöşü]+)\s*(-?\d+)?$/i.exec(s), w;
      if (/^-?\d+$/.test(s)) return { op: def, x: int(s, min, max) };
      if (!m) fail(tx("“" + s + "” anlaşılamadı", "“" + s + "” was not understood"));
      w = m[1].toLowerCase();
      if (!(w in words)) fail(tx("“" + m[1] + "” işlemi bu laboratuvarda yok", "this lab has no “" + m[1] + "” operation"));
      var need = words[w];
      if (need.arg && m[2] == null) fail(tx("“" + s + "”: işlemin bir sayısı olmalı", "“" + s + "”: the operation needs a number"));
      if (!need.arg && m[2] != null) fail(tx("“" + s + "”: bu işlem sayı almaz", "“" + s + "”: this operation takes no number"));
      return { op: need.op, x: m[2] != null ? int(m[2], min, max) : null };
    });
  }
  function edges(text, maxN, weighted, directed) {
    var t = tokens(text), E = [], n = 0;
    if (!t.length) fail(tx("girdi boş", "the input is empty"));
    if (t.length > 24) fail(tx("en fazla 24 kenar girilebilir", "at most 24 edges can be entered"));
    t.forEach(function (s) {
      var re = weighted ? /^(\d+)\s*[-–>]\s*(\d+)\s*:\s*(-?\d+)$/ : /^(\d+)\s*[-–>]\s*(\d+)$/;
      var m = re.exec(s);
      if (!m) fail(tx("“" + s + "” kenar biçiminde değil (ör. ", "“" + s + "” is not an edge (e.g. ") + (weighted ? (directed ? "0>1:5" : "0-1:5") : "0-1") + ")");
      var u = int(m[1], 0, maxN - 1), v = int(m[2], 0, maxN - 1);
      if (u === v) fail(tx("“" + s + "”: düğüm kendine bağlanamaz", "“" + s + "”: a vertex cannot be joined to itself"));
      var e = { u: u, v: v };
      if (weighted) e.w = int(m[3], 1, 99);
      E.forEach(function (f) {
        if ((f.u === u && f.v === v) || (!directed && f.u === v && f.v === u)) fail(tx("“" + s + "” kenarı iki kez yazılmış", "edge “" + s + "” is given twice"));
      });
      E.push(e);
      n = Math.max(n, u + 1, v + 1);
    });
    return { n: n, E: E };
  }

  /* ---------- çizim ---------- */
  var VW = 380;
  function T(x, y, s, cls, anchor, extra) {
    return '<text class="' + cls + '" x="' + r1(x) + '" y="' + r1(y) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : "") + (extra || "") + ">" + esc(s) + "</text>";
  }
  function R(x, y, w, h, cls, rx) {
    return '<rect class="' + cls + '" x="' + r1(x) + '" y="' + r1(y) + '" width="' + r1(w) + '" height="' + r1(h) + '"' + (rx ? ' rx="' + rx + '"' : "") + "/>";
  }
  function L(x1, y1, x2, y2, cls, mk) {
    return '<path class="' + cls + '" d="M' + r1(x1) + " " + r1(y1) + " L" + r1(x2) + " " + r1(y2) + '"' + (mk ? ' marker-end="url(#' + mk + ')"' : "") + "/>";
  }
  function r1(v) { return Math.round(v * 10) / 10; }
  function cl(base, h) { return base + (h ? " " + h : ""); }

  /* dizi: {t:"arr", name, cells, hl:{i:sınıf}, ptr:[[etiket, i]], base, cw} */
  function rArr(p, W) {
    var n = p.cells.length, nameW = p.name ? 58 : 4, base = p.base || 0;
    var cw = Math.max(14, Math.min(p.cw || 32, Math.floor((W - nameW - 6) / Math.max(n, 1))));
    var top = p.noIdx ? 2 : 13, ch = 22, x0 = nameW, s = "", rows = {}, maxRow = 0;
    var fs = cw < 22 ? ' style="font-size:10.5px"' : "";
    if (p.name) s += T(x0 - 6, top + 15, p.name, "lab-n", "end");
    for (var i = 0; i < n; i++) {
      var v = p.cells[i], h = (p.hl && p.hl[i]) || "";
      var empty = v === null || v === undefined || v === "";
      s += R(x0 + i * cw, top, cw, ch, cl(empty ? "lab-box is-empty" : "lab-box", h));
      if (!empty) s += T(x0 + i * cw + cw / 2, top + 15.5, String(v), "lab-v", "middle", fs);
      if (!p.noIdx) s += T(x0 + i * cw + cw / 2, top - 3, String(i + base), "lab-i", "middle");
    }
    (p.ptr || []).forEach(function (q) {
      var i = q[1] - base;
      if (q[1] == null || i < -1 || i > n) return;
      var r = rows[i] = (rows[i] || 0) + 1;
      maxRow = Math.max(maxRow, r);
      s += T(x0 + i * cw + cw / 2, top + ch + 1 + 11 * r, (r === 1 ? "▲" : "") + q[0], "lab-p", "middle");
    });
    return { h: top + ch + 4 + 11 * maxRow, s: s };
  }

  /* dairesel dizi: {t:"ring", name, cells, hl, ptr} */
  function rRing(p, W) {
    var n = p.cells.length, cx = W / 2, cy = 82, Rr = 54, s = "", stack = {};
    if (p.name) s += T(cx, cy + 4, p.name, "lab-n", "middle");
    for (var i = 0; i < n; i++) {
      var a = -Math.PI / 2 + 2 * Math.PI * i / n, x = cx + Rr * Math.cos(a), y = cy + Rr * Math.sin(a);
      var v = p.cells[i], h = (p.hl && p.hl[i]) || "", empty = v === null || v === undefined;
      s += R(x - 17, y - 12, 34, 24, cl(empty ? "lab-box is-empty" : "lab-box", h), 4);
      if (!empty) s += T(x, y + 4.5, String(v), "lab-v", "middle");
      s += T(cx + (Rr + 25) * Math.cos(a), cy + (Rr + 21) * Math.sin(a) + 4, "[" + i + "]", "lab-i", "middle");
    }
    (p.ptr || []).forEach(function (q) {
      var i = q[1], k = stack[i] = (stack[i] || 0) + 1;
      var a = -Math.PI / 2 + 2 * Math.PI * i / n, rr = Rr - 22 - (k - 1) * 12;
      s += T(cx + rr * Math.cos(a), cy + rr * Math.sin(a) + 4, q[0], "lab-p", "middle");
    });
    return { h: cy + Rr + 30, s: s };
  }

  /* bağlı liste: {t:"list", nodes:[{id, v, next, hl}], ptrs:[[ad, id]]}; düğümler verilen sırayla dizilir */
  function rList(p, W, mk) {
    var n = p.nodes.length, s = "", slot = {}, labs = {}, maxRow = 0;
    if (!n) return { h: 40, s: T(W / 2, 24, p.empty || tx("boş liste (NULL)", "empty list (NULL)"), "lab-n", "middle") };
    var bw = 44, bh = 24, sp = Math.max(bw + 8, Math.min(70, Math.floor((W - bw - 8) / Math.max(n - 1, 1))));
    var x0 = Math.max(4, (W - (sp * (n - 1) + bw)) / 2);
    p.nodes.forEach(function (d, i) { slot[d.id] = i; });
    (p.ptrs || []).forEach(function (q) {
      if (q[1] == null || !(q[1] in slot)) return;
      (labs[q[1]] = labs[q[1]] || []).push(q[0]);
      maxRow = Math.max(maxRow, labs[q[1]].length);
    });
    var y0 = 6 + 12 * maxRow, back = 0;
    p.nodes.forEach(function (d, i) {
      var x = x0 + i * sp, h = d.hl || "";
      s += R(x, y0, bw - 16, bh, cl("lab-box", h)) + R(x + bw - 16, y0, 16, bh, cl("lab-box is-link", h));
      s += T(x + (bw - 16) / 2, y0 + 16.5, String(d.v), "lab-v", "middle");
      if (d.next == null) s += L(x + bw - 15, y0 + bh - 1, x + bw - 1, y0 + 1, "lab-null");
      else if (d.next in slot) {
        var j = slot[d.next], sx = x + bw - 8, sy = y0 + bh / 2;
        if (j === i + 1) s += L(sx, sy, x0 + j * sp - 1, sy, "lab-a", mk);
        else {
          var ax = x0 + j * sp + (j > i ? 6 : bw - 22), dep = 16 + 5 * Math.abs(j - i);
          back = Math.max(back, dep);
          s += '<path class="lab-a" d="M' + r1(sx) + " " + r1(y0 + bh) + " C" + r1(sx) + " " + r1(y0 + bh + dep) + " " + r1(ax) + " " + r1(y0 + bh + dep) + " " + r1(ax) + " " + r1(y0 + bh + 1) + '" marker-end="url(#' + mk + ')"/>';
        }
      }
      (labs[d.id] || []).forEach(function (t, k) {
        s += T(x + (bw - 16) / 2, y0 - 4 - 12 * k, (k === 0 ? "▼" : "") + t, "lab-p", "middle");
      });
    });
    return { h: y0 + bh + Math.max(back, 6) + 4, s: s };
  }

  /* ikili ağaç: {t:"tree", root:{id, v, l, r, hl}, ptrs:{id:[etiket]}, extra:[{id, v, lab, hl}], threads:[[id, hedef]]} */
  function rTree(p, W, mk) {
    var list = [], maxD = 0, s = "", pos = {};
    (function walk(t, d) {
      if (!t) return;
      walk(t.l, d + 1); list.push({ t: t, d: d }); walk(t.r, d + 1);
      maxD = Math.max(maxD, d);
    })(p.root, 0);
    var n = list.length, extraW = (p.extra && p.extra.length) || p.head ? 46 : 0;
    var dx = (W - 8 - extraW) / Math.max(n, 1), dy = p.dy || 38, y0 = 18 + (p.head ? 30 : 0);
    list.forEach(function (o, k) { pos[o.t.id] = { x: 4 + dx * (k + 0.5), y: y0 + o.d * dy, t: o.t }; });
    if (p.head) pos.H = { x: W - 24, y: 16 };
    if (!n && !p.head) s += T((W - extraW) / 2, 30, p.empty || tx("boş ağaç (NULL)", "empty tree (NULL)"), "lab-n", "middle");
    list.forEach(function (o) {
      var a = pos[o.t.id];
      [o.t.l, o.t.r].forEach(function (c) {
        if (!c) return;
        var b = pos[c.id], dd = Math.hypot(b.x - a.x, b.y - a.y);
        s += L(a.x + (b.x - a.x) * 13 / dd, a.y + (b.y - a.y) * 13 / dd, b.x - (b.x - a.x) * 13 / dd, b.y - (b.y - a.y) * 13 / dd, "lab-e");
      });
    });
    if (p.head && p.root) {
      var hr = pos[p.root.id];
      s += '<path class="lab-e" d="M' + r1(pos.H.x - 14) + " " + r1(pos.H.y + 6) + " Q" + r1(hr.x + 30) + " " + r1(pos.H.y + 6) + " " + r1(hr.x + 9) + " " + r1(hr.y - 9) + '"/>';
    }
    (p.threads || []).forEach(function (th) {
      var a = pos[th[0]], b = pos[th[1]];
      if (!a || !b) return;
      var mx = (a.x + b.x) / 2, my = Math.max(a.y, b.y) + 22, cls = "lab-th" + (th[2] ? " " + th[2] : "");
      if (th[1] === "H") { my = Math.min(a.y, b.y) - 4; mx = (a.x + b.x) / 2; }
      var ex = b.x + (a.x < b.x ? -10 : 10), ey = b.y + (th[1] === "H" ? 8 : 10);
      s += '<path class="' + cls + '" d="M' + r1(a.x) + " " + r1(a.y + 12) + " Q" + r1(mx) + " " + r1(my) + " " + r1(ex) + " " + r1(ey) + '" marker-end="url(#' + mk + 't)"/>';
    });
    if (p.head) {
      s += R(pos.H.x - 16, pos.H.y - 11, 32, 22, cl("lab-box", p.headHl), 4) + T(pos.H.x, pos.H.y + 4, tx("baş", "head"), "lab-v", "middle", ' style="font-size:11px"');
    }
    list.forEach(function (o) {
      var a = pos[o.t.id];
      s += '<circle class="' + cl("lab-node", o.t.hl) + '" cx="' + r1(a.x) + '" cy="' + r1(a.y) + '" r="12"/>';
      s += T(a.x, a.y + 4.5, String(o.t.v), "lab-v", "middle", String(o.t.v).length > 2 ? ' style="font-size:10px"' : "");
    });
    var ptrs = p.ptrs || {};
    Object.keys(ptrs).forEach(function (id) {
      var a = pos[id];
      if (!a) return;
      ptrs[id].forEach(function (t, k) { s += T(a.x + 13, a.y - 11 - 11 * k, t, "lab-p", "start"); });
    });
    var ey = 16;
    (p.extra || []).forEach(function (e) {
      var x = W - 22;
      s += '<circle class="' + cl("lab-node", e.hl) + '" cx="' + x + '" cy="' + (ey + 14) + '" r="12"/>' + T(x, ey + 18.5, String(e.v), "lab-v", "middle");
      if (e.lab) s += T(x, ey, e.lab, "lab-p", "middle");
      ey += 44;
    });
    return { h: Math.max(y0 + maxD * dy + 20, (p.extra && p.extra.length) ? ey : 0, 44), s: s };
  }

  /* orman (ata dizisi; kök: ata < 0): {t:"forest", ata, hl} */
  function rForest(p, W) {
    var n = p.ata.length, kids = [], roots = [], s = "", pos = {}, leaf = 0, maxD = 0;
    for (var i = 0; i < n; i++) kids.push([]);
    for (i = 0; i < n; i++) { if (p.ata[i] < 0) roots.push(i); else kids[p.ata[i]].push(i); }
    function count(v, d) { maxD = Math.max(maxD, d); if (!kids[v].length) return 1; var c = 0; kids[v].forEach(function (k) { c += count(k, d + 1); }); return c; }
    var total = 0; roots.forEach(function (r) { total += count(r, 0); });
    var dx = (W - 8) / Math.max(total, 1), dy = Math.min(34, 150 / Math.max(maxD, 1));
    function place(v, d) {
      var x;
      if (!kids[v].length) x = 4 + dx * (leaf++ + 0.5);
      else { var xs = kids[v].map(function (k) { return place(k, d + 1); }); x = (xs[0] + xs[xs.length - 1]) / 2; }
      pos[v] = { x: x, y: 16 + d * dy };
      return x;
    }
    roots.forEach(function (r) { place(r, 0); });
    for (i = 0; i < n; i++) if (p.ata[i] >= 0) {
      var a = pos[i], b = pos[p.ata[i]], dd = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      s += L(a.x + (b.x - a.x) * 12 / dd, a.y + (b.y - a.y) * 12 / dd, b.x - (b.x - a.x) * 12 / dd, b.y - (b.y - a.y) * 12 / dd, cl("lab-e", p.ehl && p.ehl[i]));
    }
    for (i = 0; i < n; i++) {
      s += '<circle class="' + cl("lab-node", p.hl && p.hl[i]) + '" cx="' + r1(pos[i].x) + '" cy="' + r1(pos[i].y) + '" r="11"/>' + T(pos[i].x, pos[i].y + 4.5, String(i), "lab-v", "middle");
    }
    return { h: 16 + maxD * dy + 18, s: s };
  }

  /* çizge: {t:"graph", n, edges:[{u, v, w, hl}], dir, hl:{i}, lab:{i: metin}, pos} */
  function rGraph(p, W, mk) {
    var n = p.n, cx = W / 2, cy = 94, Rr = Math.min(80, 30 + 9 * n), pos = p.pos || [], s = "", has = {};
    if (!p.pos) for (var i = 0; i < n; i++) {
      var a = -Math.PI / 2 + 2 * Math.PI * i / n;
      pos.push([cx + Rr * Math.cos(a) * 1.45, cy + Rr * Math.sin(a)]);
    }
    p.edges.forEach(function (e) { has[e.u + ">" + e.v] = 1; });
    p.edges.forEach(function (e) {
      var A = pos[e.u], B = pos[e.v], dx = B[0] - A[0], dy = B[1] - A[1], d = Math.hypot(dx, dy) || 1;
      var ux = dx / d, uy = dy / d, off = p.dir && has[e.v + ">" + e.u] ? 7 : 0;
      var ox = -uy * off, oy = ux * off;
      var x1 = A[0] + ux * 14 + ox, y1 = A[1] + uy * 14 + oy, x2 = B[0] - ux * (p.dir ? 15 : 14) + ox, y2 = B[1] - uy * (p.dir ? 15 : 14) + oy;
      s += L(x1, y1, x2, y2, cl("lab-ge", e.hl), p.dir ? mk + (e.hl ? e.hl.replace("is-", "") : "") : null);
      if (e.w != null) {
        var mx = (x1 + x2) / 2 + ox * 0.9, my = (y1 + y2) / 2 + oy * 0.9;
        s += R(mx - 9, my - 7, 18, 13, "lab-wb", 3) + T(mx, my + 3.5, String(e.w), cl("lab-w", e.hl), "middle");
      }
    });
    for (i = 0; i < n; i++) {
      s += '<circle class="' + cl("lab-node", p.hl && p.hl[i]) + '" cx="' + r1(pos[i][0]) + '" cy="' + r1(pos[i][1]) + '" r="13"/>' + T(pos[i][0], pos[i][1] + 4.5, String(i), "lab-v", "middle");
      if (p.lab && p.lab[i] != null) {
        var vx = pos[i][0] - cx, vy = pos[i][1] - cy, vd = Math.hypot(vx, vy) || 1;
        s += T(pos[i][0] + vx / vd * 24, pos[i][1] + vy / vd * 22 + 4, String(p.lab[i]), "lab-p", "middle");
      }
    }
    return { h: cy + Rr + 26, s: s };
  }

  /* satranç tahtası (n-vezir): {t:"board", n, q:[sütun|-1], hl:{"r,c": sınıf}} */
  function rBoard(p, W) {
    var n = p.n, cs = Math.min(26, Math.floor(196 / n)), x0 = (W - n * cs) / 2, s = "";
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) {
      var h = p.hl && p.hl[r + "," + c];
      s += R(x0 + c * cs, 4 + r * cs, cs, cs, cl((r + c) % 2 ? "lab-box is-sq" : "lab-box is-empty", h));
      if (p.q[r] === c) s += T(x0 + c * cs + cs / 2, 4 + r * cs + cs * 0.72, "♛", "lab-v", "middle", ' style="font-size:' + Math.round(cs * 0.7) + 'px"');
    }
    for (r = 0; r < n; r++) s += T(x0 - 6, 4 + r * cs + cs * 0.68, String(r), "lab-i", "end");
    for (c = 0; c < n; c++) s += T(x0 + c * cs + cs / 2, 4 + n * cs + 11, String(c), "lab-i", "middle");
    return { h: 4 + n * cs + 16, s: s };
  }

  /* genelleştirilmiş liste: {t:"glist", list:[{id, atom, v, sub, hl}], ptrs:{id:[etiket]}} */
  function rGlist(p, W, mk) {
    var s = "", bw = 52, bh = 22, gap = 20, rowH = 46, maxRow = 0;
    function width(list) { var w = 0; list.forEach(function (d) { w += Math.max(bw + gap, d.sub ? width(d.sub) : 0); }); return w; }
    var tw = width(p.list), x0 = Math.max(4, (W - tw + gap) / 2);
    function draw(list, x, row) {
      maxRow = Math.max(maxRow, row);
      var y = 14 + row * rowH, xs = [];
      list.forEach(function (d) { xs.push(x); x += Math.max(bw + gap, d.sub ? width(d.sub) : 0); });
      list.forEach(function (d, i) {
        var bx = xs[i], h = d.hl || "";
        s += R(bx, y, 14, bh, cl("lab-box is-link", h)) + R(bx + 14, y, 24, bh, cl("lab-box", h)) + R(bx + 38, y, 14, bh, cl("lab-box is-link", h));
        s += T(bx + 7, y + 15, d.atom ? "0" : "1", "lab-i", "middle");
        if (d.atom) s += T(bx + 26, y + 15.5, d.v, "lab-v", "middle");
        else if (!d.sub || !d.sub.length) s += L(bx + 15, y + bh - 1, bx + 37, y + 1, "lab-null");
        else s += L(bx + 26, y + 12, bx + 26, y + rowH - 1, "lab-a", mk);
        if (i < list.length - 1) s += L(bx + 45, y + bh / 2, xs[i + 1] - 1, y + bh / 2, "lab-a", mk);
        else s += L(bx + 39, y + bh - 1, bx + 51, y + 1, "lab-null");
        ((p.ptrs || {})[d.id] || []).forEach(function (t, k) { s += T(bx + 26, y - 3 - 11 * k, t, "lab-p", "middle"); });
        if (d.sub && d.sub.length) draw(d.sub, bx + 14, row + 1);
      });
    }
    if (!p.list.length) return { h: 40, s: T(W / 2, 24, tx("boş liste (NULL)", "empty list (NULL)"), "lab-n", "middle") };
    draw(p.list, x0, 0);
    return { h: 14 + maxRow * rowH + bh + 6, s: s };
  }

  var RENDER = { arr: rArr, ring: rRing, list: rList, tree: rTree, forest: rForest, graph: rGraph, board: rBoard, glist: rGlist };

  function draw(parts, uid) {
    var y = 2, body = "", mk = uid + "-a";
    parts.forEach(function (p) {
      var r = RENDER[p.t](p, VW, mk);
      if (p.title) { body += T(4, y + 10, p.title, "lab-n", "start"); y += 14; }
      body += '<g transform="translate(0 ' + r1(y) + ')">' + r.s + "</g>";
      y += r.h + 6;
    });
    var defs = "<defs>" + ["", "hot", "done", "look", "dim", "t"].map(function (k) {
      return '<marker id="' + mk + k + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path class="lab-ah' + (k ? " is-" + k : "") + '" d="M0 0 L10 5 L0 10z"/></marker>';
    }).join("") + "</defs>";
    return '<svg class="lab-svg" viewBox="0 0 ' + VW + " " + r1(Math.max(y, 40)) + '" preserveAspectRatio="xMidYMin meet" role="img" aria-label="' + tx("Yapının çizimi", "Drawing of the structure") + '">' + defs + body + "</svg>";
  }

  /* bir önceki adıma göre değişen hücre ve düğümler vurgulanır */
  function diffView(view, prev) {
    if (!prev) return view;
    return view.map(function (p, k) {
      var q = prev[k];
      if (!q || q.t !== p.t || q.name !== p.name || p.noDiff) return p;
      var c = JSON.parse(JSON.stringify(p));
      if (p.t === "arr" || p.t === "ring") {
        c.hl = c.hl || {};
        c.cells.forEach(function (v, i) { if (q.cells[i] !== v && !c.hl[i] && i < q.cells.length) c.hl[i] = "is-hot"; });
      } else if (p.t === "forest") {
        c.hl = c.hl || {}; c.ehl = {};
        c.ata.forEach(function (v, i) { if (q.ata[i] !== v) { if (!c.hl[i]) c.hl[i] = "is-hot"; if (v >= 0) c.ehl[i] = "is-hot"; } });
      } else if (p.t === "list") {
        var old = {};
        q.nodes.forEach(function (d) { old[d.id] = d; });
        c.nodes.forEach(function (d) { var o = old[d.id]; if ((!o || o.v !== d.v || o.next !== d.next) && !d.hl) d.hl = "is-hot"; });
      } else if (p.t === "tree") {
        var was = {};
        (function w(t) { if (!t) return; was[t.id] = t.v; w(t.l); w(t.r); })(q.root);
        (function w(t) { if (!t) return; if (was[t.id] !== t.v && !t.hl) t.hl = "is-hot"; w(t.l); w(t.r); })(c.root);
      }
      return c;
    });
  }

  /* ================= MODELLER ================= */
  /* yardımcılar */
  function fmtF(v) { var r = Math.round(v * 1000) / 1000; return String(r); }
  function ptrTo(nodes, id, nul) { return id == null ? (nul || "NULL") : "→" + nodes[id].v; }

  /* ---------- 07: dairesel kuyruk ---------- */
  models.cqueue = {
    label: tx("Girdi (sayı = ekle, al)", "Input (number = enqueue, dequeue)"),
    fnEn: { kuyruk_ekle: "enqueue", kuyruk_al: "dequeue" },
    parse: function (text) { return ops(text, "ekle", words({ al: { op: "al" }, a: { op: "al" } }, { dequeue: { op: "al" }, deq: { op: "al" }, enqueue: { op: "ekle", arg: 1 } }), -999, 999, 30); },
    run: function (list, mode, Tr) {
      var M = 6, q = [], on = 0, arka = 0, x = null, yeni = null, res = [];
      var nOn = tx("on", "front"), nArka = tx("arka", "rear"), nYeni = tx("yeni", "next");
      for (var i = 0; i < M; i++) q.push(null);
      function used(i) { var k = on; while (k !== arka) { k = (k + 1) % M; if (k === i) return true; } return false; }
      Tr.varsFn = function () {
        var v = [["MAX_QUEUE_SIZE", String(M)], [nOn, String(on)], [nArka, String(arka)]];
        if (yeni !== null) v.push([nYeni, String(yeni)]);
        if (x !== null) v.push(["x", String(x)]);
        return v;
      };
      Tr.viewFn = function (ex) {
        var hl = {};
        for (var i = 0; i < M; i++) if (q[i] !== null && !used(i)) hl[i] = "is-dim";
        if (ex.look != null) hl[ex.look] = "is-look";
        var ptr = [[nOn, on], [nArka, arka]];
        if (yeni !== null) ptr.push([nYeni, yeni]);
        return [{ t: "ring", name: tx("kuyruk", "queue"), cells: q.slice(), hl: hl, ptr: ptr }];
      };
      Tr.fn("kuyruk_ekle");
      Tr.at(null, tx("Başlangıçta kuyruk boş: <code>on = arka = 0</code>. Dizide " + M + " yuva var; dairesel kuyruk en çok " + (M - 1) + " öğe tutar, çünkü bir yuva dolu ile boşu ayırmak için boş bırakılır.",
        "The queue starts empty: <code>front = rear = 0</code>. The array has " + M + " slots; the circular queue holds at most " + (M - 1) + " items, because one slot is kept empty to tell a full queue from an empty one."));
      list.forEach(function (o) {
        x = null; yeni = null;
        if (o.op === "ekle") {
          Tr.fn("kuyruk_ekle");
          yeni = (arka + 1) % M;
          Tr.at("e1", tx("<code>kuyruk_ekle(" + o.x + ")</code> çağrıldı: <code>yeni = (arka + 1) % " + M + " = (" + arka + " + 1) % " + M + " = " + yeni + "</code>.",
            "<code>enqueue(" + o.x + ")</code> is called: <code>next = (rear + 1) % " + M + " = (" + arka + " + 1) % " + M + " = " + yeni + "</code>."), { look: yeni });
          if (yeni === on) {
            Tr.at("e2", tx("<code>yeni == on</code> (" + yeni + "): arka bir adım ilerlese öne çarpacak, yani kuyruk dolu. " + o.x + " eklenmeden <code>false</code> döner; <code>arka</code> değişmez.",
              "<code>next == front</code> (" + yeni + "): one more step would make rear run into front, so the queue is full. <code>false</code> is returned without adding " + o.x + "; <code>rear</code> does not change."), { look: yeni });
            Tr.print(tx("ekle(", "enqueue(") + o.x + ") → false\n"); res.push("ekle " + o.x + " false");
            yeni = null;
            return;
          }
          Tr.at("e2", tx("<code>yeni</code> (" + yeni + ") ile <code>on</code> (" + on + ") farklı: kuyrukta yer var.",
            "<code>next</code> (" + yeni + ") differs from <code>front</code> (" + on + "): there is room in the queue."), { look: yeni });
          arka = yeni; q[yeni] = o.x;
          Tr.at("e3", tx("<code>arka = " + yeni + "</code> ve <code>kuyruk[" + yeni + "] = " + o.x + "</code>: " + o.x + " kuyruğun arkasına yazıldı.",
            "<code>rear = " + yeni + "</code> and <code>queue[" + yeni + "] = " + o.x + "</code>: " + o.x + " is written at the rear of the queue."));
          Tr.at("e4", tx("<code>true</code> döner; kuyrukta artık " + size() + " öğe var.", "<code>true</code> is returned; the queue now holds " + size() + (size() === 1 ? " item." : " items.")));
          Tr.print(tx("ekle(", "enqueue(") + o.x + ") → true\n"); res.push("ekle " + o.x + " true");
        } else {
          Tr.fn("kuyruk_al");
          if (on === arka) {
            Tr.at("a1", tx("<code>kuyruk_al</code> çağrıldı. <code>on == arka</code> (" + on + "): kuyruk boş; alınacak öğe yok, <code>false</code> döner.",
              "<code>dequeue</code> is called. <code>front == rear</code> (" + on + "): the queue is empty; there is nothing to remove, so <code>false</code> is returned."));
            Tr.print(tx("al → false\n", "dequeue → false\n")); res.push("al false");
            return;
          }
          Tr.at("a1", tx("<code>kuyruk_al</code> çağrıldı. <code>on</code> (" + on + ") ile <code>arka</code> (" + arka + ") farklı: kuyruk boş değil.",
            "<code>dequeue</code> is called. <code>front</code> (" + on + ") differs from <code>rear</code> (" + arka + "): the queue is not empty."));
          on = (on + 1) % M;
          Tr.at("a2", tx("<code>on = (on + 1) % " + M + " = " + on + "</code>: <code>on</code> artık öndeki öğenin yuvasını gösterir.",
            "<code>front = (front + 1) % " + M + " = " + on + "</code>: <code>front</code> now points to the slot of the front item."), { look: on });
          x = q[on];
          Tr.at("a3", tx("<code>*x = kuyruk[" + on + "] = " + x + "</code> ve <code>true</code> döner. Yuvadaki değer silinmez; yalnızca kuyruğun dışında kalır (soluk gösterilir).",
            "<code>*x = queue[" + on + "] = " + x + "</code> and <code>true</code> is returned. The value is not erased from the slot; it is merely outside the queue now (shown faded)."), { look: on });
          Tr.print(tx("al → ", "dequeue → ") + x + "\n"); res.push("al " + x);
        }
      });
      function size() { return (arka - on + M) % M; }
      x = null; yeni = null;
      Tr.fn(Tr.cur);
      Tr.at(null, tx("İşlemler bitti: <code>on = " + on + "</code>, <code>arka = " + arka + "</code>, kuyrukta " + size() + " öğe var.",
        "All operations done: <code>front = " + on + "</code>, <code>rear = " + arka + "</code>, the queue holds " + size() + (size() === 1 ? " item." : " items.")));
      res.push("on " + on + " arka " + arka);
      return res.join("\n");
    }
  };

  /* ---------- 06: bağlı yığın ---------- */
  models.lstack = {
    label: tx("Girdi (sayı = push, pop)", "Input (number = push, pop)"),
    parse: function (text) {
      var l = ops(text, "push", words({ pop: { op: "pop" }, p: { op: "pop" } }, { push: { op: "push", arg: 1 } }), -999, 999, 24), size = 0;
      l.forEach(function (o) { size += o.op === "push" ? 1 : (size ? -1 : 0); if (size > 7) fail(tx("yığında aynı anda en fazla 7 düğüm çizilebilir", "at most 7 nodes can be drawn on the stack at once")); });
      return l;
    },
    run: function (list, mode, Tr) {
      var nodes = {}, top = null, yeni = null, eski = null, x = null, idc = 0, res = [], freed = null;
      var nYeni = tx("yeni", "new_node"), nEski = tx("eski", "old");
      function chain() { var a = [], p = top; while (p != null) { a.push(p); p = nodes[p].next; } return a; }
      Tr.varsFn = function () {
        var v = [["top", ptrTo(nodes, top)]];
        if (yeni != null) v.push([nYeni, ptrTo(nodes, yeni)]);
        if (eski !== null) v.push([nEski, eski === "N" ? "NULL" : ptrTo(nodes, eski)]);
        if (x !== null) v.push(["*x", String(x)]);
        return v;
      };
      Tr.viewFn = function () {
        var order = chain(), ids = [];
        [yeni, eski === "N" ? null : eski].forEach(function (k) { if (k != null && order.indexOf(k) < 0 && ids.indexOf(k) < 0) ids.push(k); });
        ids = ids.concat(order);
        var ptrs = [["top", top]];
        if (yeni != null) ptrs.push([nYeni, yeni]);
        if (eski !== null && eski !== "N") ptrs.push([nEski, eski]);
        return [{ t: "list", empty: tx("boş yığın: top = NULL", "empty stack: top = NULL"), nodes: ids.map(function (k) { var d = nodes[k]; return { id: k, v: d.v, next: d.next, hl: k === freed ? "is-dim" : "" }; }), ptrs: ptrs }];
      };
      Tr.fn("push");
      Tr.at(null, tx("Başlangıçta yığın boş: <code>top = NULL</code>. Her <code>push</code> yeni bir düğüm ayırır ve onu en üste bağlar; <code>pop</code> en üstteki düğümü çıkarıp belleğini geri verir.",
        "The stack starts empty: <code>top = NULL</code>. Each <code>push</code> allocates a new node and links it on top; <code>pop</code> unlinks the top node and frees its memory."));
      list.forEach(function (o) {
        yeni = null; eski = null; x = null; freed = null;
        if (o.op === "push") {
          Tr.fn("push");
          var id = "n" + (idc++);
          nodes[id] = { v: "?", next: null };
          yeni = id;
          Tr.at("p1", tx("<code>push(&amp;top, " + o.x + ")</code>: <code>malloc</code> yeni bir düğüm ayırdı; alanları henüz atanmadı.",
            "<code>push(&amp;top, " + o.x + ")</code>: <code>malloc</code> allocated a new node; its fields are not set yet."));
          Tr.at("p2", tx("<code>yeni</code> NULL değil, yani bellek ayrılabildi.", "<code>new_node</code> is not NULL, so the allocation succeeded."));
          nodes[id].v = o.x;
          Tr.at("p3", tx("<code>yeni-&gt;deger = " + o.x + "</code>.", "<code>new_node-&gt;data = " + o.x + "</code>."));
          nodes[id].next = top;
          Tr.at("p4", tx("<code>yeni-&gt;bag = *top</code>: yeni düğüm eski üstü (" + (top == null ? "NULL" : nodes[top].v) + ") gösterir. Bu satır önce gelmeli; yoksa eski liste kaybolur.",
            "<code>new_node-&gt;link = *top</code>: the new node points to the old top (" + (top == null ? "NULL" : nodes[top].v) + "). This line must come first, or the old list is lost."));
          top = id;
          Tr.at("p5", tx("<code>*top = yeni</code>: yığının üstü artık " + o.x + ".", "<code>*top = new_node</code>: the top of the stack is now " + o.x + "."));
          Tr.at("p6", tx("<code>true</code> döner; yığında " + chain().length + " düğüm var.", "<code>true</code> is returned; the stack has " + pl(chain().length, "node.", "nodes.")));
          Tr.print("push(" + o.x + ") → true\n"); res.push("push " + o.x + " true");
        } else {
          Tr.fn("pop");
          eski = top == null ? "N" : top;
          Tr.at("o1", tx("<code>pop(&amp;top, &amp;x)</code>: <code>eski = *top</code> " + (top == null ? "NULL oldu." : "en üstteki düğümü (" + nodes[top].v + ") gösterir. Yeni düğüm ayrılmaz."),
            "<code>pop(&amp;top, &amp;x)</code>: <code>old = *top</code> " + (top == null ? "is NULL." : "points to the top node (" + nodes[top].v + "). No new node is allocated.")));
          if (top == null) {
            Tr.at("o2", tx("<code>eski == NULL</code>: yığın boş; <code>false</code> döner.", "<code>old == NULL</code>: the stack is empty; <code>false</code> is returned."));
            Tr.print("pop → false\n"); res.push("pop false");
            return;
          }
          Tr.at("o2", tx("<code>eski</code> NULL değil: yığın boş değil.", "<code>old</code> is not NULL: the stack is not empty."));
          x = nodes[eski].v;
          Tr.at("o3", tx("<code>*x = eski-&gt;deger = " + x + "</code>.", "<code>*x = old-&gt;data = " + x + "</code>."));
          top = nodes[eski].next;
          Tr.at("o4", tx("<code>*top = eski-&gt;bag</code>: üst bir düğüm ilerledi; yeni üst " + (top == null ? "NULL (yığın boşaldı)" : nodes[top].v) + ".",
            "<code>*top = old-&gt;link</code>: top moves one node down; the new top is " + (top == null ? "NULL (the stack is now empty)" : nodes[top].v) + "."));
          freed = eski;
          Tr.at("o5", tx("<code>free(eski)</code>: düğümün belleği geri verildi; <code>eski</code> artık kullanılmamalı.", "<code>free(old)</code>: the node's memory is released; <code>old</code> must not be used any more."));
          var keep = eski; eski = null; freed = null; delete nodes[keep];
          Tr.at("o6", tx("<code>true</code> döner; çıkan değer " + x + ".", "<code>true</code> is returned; the popped value is " + x + "."));
          Tr.print("pop → " + x + "\n"); res.push("pop " + x);
        }
      });
      yeni = null; eski = null; x = null;
      var c = chain().map(function (k) { return nodes[k].v; });
      Tr.at(null, tx("İşlemler bitti. Yığın üstten alta: " + (c.length ? c.join(", ") : "boş") + ".", "All operations done. The stack from top to bottom: " + (c.length ? c.join(", ") : "empty") + "."));
      res.push("yigit " + c.join(" "));
      return res.join("\n");
    }
  };

  /* ---------- 08: postfix hesaplama ---------- */
  models.peval = {
    label: tx("Girdi (postfix ifade, tek basamaklı sayılar)", "Input (postfix expression, single-digit numbers)"),
    parse: function (text) {
      var e = text.replace(/\s+/g, "");
      if (!e.length) fail(tx("ifade boş", "the expression is empty"));
      if (e.length > 21) fail(tx("ifade en fazla 21 karakter olabilir", "the expression can have at most 21 characters"));
      if (!/^[0-9+\-*\/]+$/.test(e)) fail(tx("yalnızca rakamlar ve + − * / kullanılabilir", "only digits and + − * / may be used"));
      var d = 0;
      for (var i = 0; i < e.length; i++) {
        if (/\d/.test(e[i])) d++;
        else { if (d < 2) fail(tx("“" + e[i] + "” işleci için yığında iki işlenen yok (" + (i + 1) + ". karakter)", "the stack does not hold two operands for operator “" + e[i] + "” (character " + (i + 1) + ")")); d--; }
      }
      if (d !== 1) fail(tx("ifadenin sonunda yığında tek değer kalmalı; " + d + " değer kalıyor", "exactly one value must remain on the stack at the end; " + d + " remain"));
      return e;
    },
    run: function (e, mode, Tr) {
      var y = [], top = -1, n = -1, c = null, op1 = null, op2 = null, res = [];
      Tr.varsFn = function () {
        var v = [["n", n < 0 ? "–" : String(n)], ["c", c === null ? "–" : "'" + c + "'"], ["top", String(top)]];
        if (op1 !== null) v.push(["op1", fmtF(op1)]);
        if (op2 !== null) v.push(["op2", fmtF(op2)]);
        return v;
      };
      Tr.viewFn = function () {
        var hl = {}; if (n >= 0 && n < e.length) hl[n] = "is-look";
        for (var i = 0; i < n && i < e.length; i++) hl[i] = "is-dim";
        var cells = []; for (i = 0; i <= Math.max(top, 3); i++) cells.push(i <= top ? fmtF(y[i]) : null);
        return [{ t: "arr", name: "expr", cells: e.split(""), hl: hl, noDiff: true, cw: 18 },
          { t: "arr", name: "y", cells: cells, ptr: [["top", top]], cw: 44 }];
      };
      Tr.fn("eval");
      Tr.at(null, tx("<code>eval(\"" + esc(e) + "\")</code>: ifade soldan sağa okunur. İşlenen yığına itilir; işleç gelince üstteki iki değer alınır, sonuç geri itilir.",
        "<code>eval(\"" + esc(e) + "\")</code>: the expression is read left to right. Operands are pushed; for an operator the top two values are popped and the result is pushed back."));
      for (n = 0; n < e.length; n++) {
        c = null; op1 = null; op2 = null;
        Tr.at("for", tx("<code>expr[" + n + "]</code> = '" + esc(e[n]) + "', dizgi sonu değil; döngü sürer.", "<code>expr[" + n + "]</code> = '" + esc(e[n]) + "', not the end of the string; the loop continues."));
        c = e[n];
        Tr.at("c", "<code>c = '" + esc(c) + "'</code>.");
        if (/\d/.test(c)) {
          y[++top] = +c;
          Tr.at("d", tx("'" + c + "' bir rakam: <code>y[++top] = '" + c + "' - '0'</code>; " + c + " yığına itildi, <code>top = " + top + "</code>.",
            "'" + c + "' is a digit: <code>y[++top] = '" + c + "' - '0'</code>; " + c + " is pushed, <code>top = " + top + "</code>."));
        } else {
          op2 = y[top--]; op1 = y[top--];
          Tr.at("o", tx("'" + esc(c) + "' bir işleç: önce sağ işlenen <code>op2 = " + fmtF(op2) + "</code>, sonra sol işlenen <code>op1 = " + fmtF(op1) + "</code> yığından alındı.",
            "'" + esc(c) + "' is an operator: first the right operand <code>op2 = " + fmtF(op2) + "</code>, then the left operand <code>op1 = " + fmtF(op1) + "</code> is popped."));
          var r = c === "+" ? op1 + op2 : c === "-" ? op1 - op2 : c === "*" ? op1 * op2 : op1 / op2;
          r = Math.fround(r);
          y[++top] = r;
          Tr.at(c, "<code>op1 " + esc(c) + " op2 = " + fmtF(op1) + " " + esc(c) + " " + fmtF(op2) + " = " + fmtF(r) + tx("</code> yığına itildi.", "</code> is pushed."));
          res.push(c + " " + r.toFixed(6));
        }
      }
      c = null; op1 = null; op2 = null;
      Tr.at("for", tx("<code>expr[" + n + "]</code> = '\\0': ifade bitti, döngüden çıkılır.", "<code>expr[" + n + "]</code> = '\\0': the expression has ended; the loop exits."));
      Tr.at("r", tx("<code>return y[top]</code>: yığında kalan tek değer sonuçtur: <b>", "<code>return y[top]</code>: the single value left on the stack is the result: <b>") + fmtF(y[top]) + "</b>.");
      Tr.print("eval → " + fmtF(y[top]) + "\n");
      res.push("sonuc " + y[top].toFixed(6));
      return res.join("\n");
    }
  };

  /* ---------- 08: infix → postfix ---------- */
  models.postfix = {
    label: tx("Girdi (infix ifade, ör. a*(b+c)-d)", "Input (infix expression, e.g. a*(b+c)-d)"),
    parse: function (text) {
      var e = text.replace(/\s+/g, "");
      if (!e.length) fail(tx("ifade boş", "the expression is empty"));
      if (e.length > 19) fail(tx("ifade en fazla 19 karakter olabilir", "the expression can have at most 19 characters"));
      if (!/^[a-zA-Z0-9+\-*\/%()]+$/.test(e)) fail(tx("yalnızca harf, rakam, + − * / % ve parantez kullanılabilir", "only letters, digits, + − * / % and parentheses may be used"));
      var d = 0, prev = "op";
      for (var i = 0; i < e.length; i++) {
        var ch = e[i], kind = /[a-zA-Z0-9]/.test(ch) ? "x" : ch === "(" ? "(" : ch === ")" ? ")" : "op";
        if (kind === "(") { d++; if (prev === "x" || prev === ")") fail(tx((i + 1) + ". karakterdeki “(” önünde işleç olmalı", "the “(” at character " + (i + 1) + " must be preceded by an operator")); }
        else if (kind === ")") { d--; if (d < 0) fail(tx((i + 1) + ". karakterdeki “)” için açılan parantez yok", "the “)” at character " + (i + 1) + " has no matching “(”")); if (prev !== "x" && prev !== ")") fail(tx((i + 1) + ". karakterdeki “)” önünde işlenen olmalı", "the “)” at character " + (i + 1) + " must be preceded by an operand")); }
        else if (kind === "x") { if (prev === "x" || prev === ")") fail(tx("işlenenler tek karakterdir; " + (i + 1) + ". karakterden önce işleç olmalı", "operands are single characters; an operator is needed before character " + (i + 1))); }
        else if (prev === "op" || prev === "(") fail(tx((i + 1) + ". karakterdeki “" + ch + "” işleci için sol işlenen yok", "the operator “" + ch + "” at character " + (i + 1) + " has no left operand"));
        prev = kind;
      }
      if (d !== 0) fail(tx("açılan parantezlerden " + d + " tanesi kapanmamış", d + (d === 1 ? " opening parenthesis is" : " opening parentheses are") + " not closed"));
      if (prev === "op") fail(tx("ifade bir işleçle bitemez", "the expression cannot end with an operator"));
      return e;
    },
    run: function (e, mode, Tr) {
      var ISP = { "(": 0, "*": 13, "/": 13, "%": 13, "+": 12, "-": 12, "#": -1 };
      var ICP = { "(": 20, "*": 13, "/": 13, "%": 13, "+": 12, "-": 12 };
      var y = ["#"], top = 0, k = 0, out = [], pos = -1;
      Tr.varsFn = function () {
        var v = [["*e", pos >= 0 && pos < e.length ? "'" + e[pos] + "'" : "'\\0'"], ["top", String(top)], ["k", String(k)]];
        if (pos >= 0 && pos < e.length && ICP[e[pos]] != null) v.push(["icp(*e)", String(ICP[e[pos]])], ["isp(y[top])", String(ISP[y[top]])]);
        return v;
      };
      Tr.viewFn = function () {
        var hl = {}; for (var i = 0; i < e.length; i++) if (i < pos) hl[i] = "is-dim";
        if (pos >= 0 && pos < e.length) hl[pos] = "is-look";
        var cells = []; for (i = 0; i <= Math.max(top, 4); i++) cells.push(i <= top ? y[i] : null);
        var oc = out.slice(); while (oc.length < 6) oc.push(null);
        return [{ t: "arr", name: "e", cells: e.split(""), hl: hl, noDiff: true, cw: 19 },
          { t: "arr", name: "y", cells: cells, ptr: [["top", top]], cw: 24 },
          { t: "arr", name: tx("cikti", "out"), cells: oc, ptr: [["k", k]], cw: 19 }];
      };
      Tr.fn("postfix");
      Tr.at(null, tx("<code>postfix(\"" + esc(e) + "\", cikti)</code>: yığının dibinde <code>'#'</code> var (isp = −1); işlenenler doğrudan çıktıya yazılır, işleçler önceliklerine göre yığında bekletilir.",
        "<code>postfix(\"" + esc(e) + "\", out)</code>: the bottom of the stack holds <code>'#'</code> (isp = −1); operands go straight to the output, operators wait on the stack according to their precedence."));
      for (pos = 0; pos < e.length; pos++) {
        var ch = e[pos];
        Tr.at("for", tx("<code>*e = '" + esc(ch) + "'</code>: dizgi bitmedi.", "<code>*e = '" + esc(ch) + "'</code>: the string has not ended."));
        if (/[a-zA-Z0-9]/.test(ch)) {
          out[k++] = ch;
          Tr.at("alnum", tx("'" + ch + "' bir işlenen: <code>cikti[k++] = '" + ch + "'</code>; çıktı şimdi \"" + out.join("") + "\".",
            "'" + ch + "' is an operand: <code>out[k++] = '" + ch + "'</code>; the output is now \"" + out.join("") + "\"."));
        } else if (ch === ")") {
          Tr.at("rp", tx("')' geldi: '(' bulunana dek yığındakiler çıktıya aktarılır.", "')' arrives: operators are moved from the stack to the output until '(' is found."));
          while (y[top] !== "(") {
            Tr.at("rpw", tx("<code>y[top] = '" + esc(y[top]) + "'</code>, '(' değil.", "<code>y[top] = '" + esc(y[top]) + "'</code>, not '('."));
            out[k++] = y[top--];
            Tr.at("rpo", tx("'" + esc(out[k - 1]) + "' yığından çıktıya alındı: \"", "'" + esc(out[k - 1]) + "' is moved from the stack to the output: \"") + out.join("") + "\".");
          }
          Tr.at("rpw", tx("<code>y[top] = '('</code>: döngü durur.", "<code>y[top] = '('</code>: the loop stops."));
          top--;
          Tr.at("rpt", tx("<code>top--</code>: '(' atıldı; parantezler çıktıya yazılmaz.", "<code>top--</code>: '(' is discarded; parentheses never reach the output."));
        } else {
          Tr.at("op", tx("'" + esc(ch) + "' bir işleç: yığındaki işlecin önceliği <code>isp</code>, gelenin önceliği <code>icp</code> ile karşılaştırılır.",
            "'" + esc(ch) + "' is an operator: the precedence of the stacked operator, <code>isp</code>, is compared with that of the incoming one, <code>icp</code>."));
          while (ISP[y[top]] >= ICP[ch]) {
            Tr.at("opw", "<code>isp('" + esc(y[top]) + "') = " + ISP[y[top]] + " ≥ icp('" + esc(ch) + "') = " + ICP[ch] + tx("</code>: yığındaki işleç önce yazılmalı.", "</code>: the stacked operator must be output first."));
            out[k++] = y[top--];
            Tr.at("opo", tx("'" + esc(out[k - 1]) + "' çıktıya alındı: \"", "'" + esc(out[k - 1]) + "' goes to the output: \"") + out.join("") + "\".");
          }
          Tr.at("opw", "<code>isp('" + esc(y[top]) + "') = " + ISP[y[top]] + " &lt; icp('" + esc(ch) + "') = " + ICP[ch] + tx("</code>: döngü durur.", "</code>: the loop stops."));
          y[++top] = ch;
          Tr.at("push", tx("<code>y[++top] = '" + esc(ch) + "'</code>: gelen işleç yığına itildi.", "<code>y[++top] = '" + esc(ch) + "'</code>: the incoming operator is pushed."));
        }
      }
      Tr.at("for", tx("<code>*e = '\\0'</code>: ifade bitti.", "<code>*e = '\\0'</code>: the expression has ended."));
      while (top > 0) {
        Tr.at("end", tx("<code>top = " + top + " &gt; 0</code>: yığında kalan '" + esc(y[top]) + "' çıktıya alınacak.", "<code>top = " + top + " &gt; 0</code>: the remaining '" + esc(y[top]) + "' goes to the output."));
        out[k++] = y[top--];
        Tr.at("end", tx("Çıktı: \"", "Output: \"") + out.join("") + "\".");
      }
      Tr.at("end", tx("<code>top = 0</code>: yığında yalnızca '#' kaldı.", "<code>top = 0</code>: only '#' is left on the stack."));
      Tr.at("fin", tx("<code>cikti[k] = '\\0'</code>: postfix ifade <b>", "<code>out[k] = '\\0'</code>: the postfix expression is <b>") + esc(out.join("")) + "</b>.");
      Tr.print(out.join("") + "\n");
      return out.join("");
    }
  };

  /* ---------- 11: ikili arama ağacı ---------- */
  models.bst = {
    label: tx("Girdi (sayı = ekle, ara 30, sil 30)", "Input (number = insert, find 30, delete 30)"),
    fnEn: { arama_agacina_ekle: "bst_insert", arama_agacinda_ara: "bst_search", sil: "bst_delete" },
    parse: function (text) {
      var l = ops(text, "ekle", words({ ara: { op: "ara", arg: 1 }, sil: { op: "sil", arg: 1 }, ekle: { op: "ekle", arg: 1 } },
        { find: { op: "ara", arg: 1 }, search: { op: "ara", arg: 1 }, "delete": { op: "sil", arg: 1 }, insert: { op: "ekle", arg: 1 } }), 0, 999, 24), c = 0;
      l.forEach(function (o) { if (o.op === "ekle") c++; });
      if (c > 15) fail(tx("en fazla 15 ekleme yapılabilir", "at most 15 insertions are allowed"));
      return l;
    },
    run: function (list, mode, Tr) {
      var N = {}, kok = null, idc = 0, res = [], V = {}, P = {}, extra = null;
      var kBag = tx("bag", "link"), sSol = tx("solcocuk", "left"), sSag = tx("sagcocuk", "right");
      function tree(id, hl) { if (id == null) return null; var d = N[id]; return { id: id, v: d.v, l: tree(d.l, hl), r: tree(d.r, hl), hl: hl[id] || "" }; }
      function nm(id) { return id == null ? "NULL" : "→" + N[id].v; }
      Tr.varsFn = function () { var v = [["x", V.x == null ? "–" : String(V.x)]]; Object.keys(V).forEach(function (k) { if (k !== "x") v.push([k, V[k]]); }); return v; };
      Tr.viewFn = function (ex) {
        var hl = {}; if (ex.look != null) hl[ex.look] = "is-look"; if (ex.done != null) hl[ex.done] = "is-done"; if (ex.dim != null) hl[ex.dim] = "is-dim";
        var ptrs = {}; Object.keys(P).forEach(function (k) { if (P[k] != null && N[P[k]]) (ptrs[P[k]] = ptrs[P[k]] || []).push(k); });
        return [{ t: "tree", root: tree(kok, hl), ptrs: ptrs, extra: extra ? [{ id: extra, v: N[extra].v, lab: "r" }] : [] }];
      };
      function inorder(id, a) { if (id == null) return a; inorder(N[id].l, a); a.push(N[id].v); inorder(N[id].r, a); return a; }
      function preorder(id, a) { if (id == null) return a; a.push(N[id].v); preorder(N[id].l, a); preorder(N[id].r, a); return a; }
      Tr.fn("arama_agacina_ekle");
      Tr.at(null, tx("Başlangıçta ağaç boş: <code>kok = NULL</code>. Her işlem kökten başlayıp karşılaştırmalarla tek bir yol boyunca iner.",
        "The tree starts empty: <code>root = NULL</code>. Every operation starts at the root and, guided by comparisons, walks down a single path."));
      list.forEach(function (o) {
        var x = o.x; V = { x: x }; P = {}; extra = null;
        if (o.op === "ekle") {
          Tr.fn("arama_agacina_ekle");
          var q = null, p = kok;
          V.q = "NULL"; V.p = nm(p); P = { p: p };
          Tr.at("e1", tx("<code>arama_agacina_ekle(" + x + ", &amp;kok)</code>: <code>q = NULL</code>, <code>p = *L</code> (" + (p == null ? "boş ağaç" : "kök " + N[p].v) + ").",
            "<code>bst_insert(" + x + ", &amp;root)</code>: <code>q = NULL</code>, <code>p = *L</code> (" + (p == null ? "empty tree" : "root " + N[p].v) + ")."), { look: p });
          while (true) {
            if (p == null) { Tr.at("e2", tx("<code>p == NULL</code>: inilecek düğüm kalmadı; " + x + " ağaçta yok, eklenecek yer bulundu.", "<code>p == NULL</code>: there is nowhere further down; " + x + " is not in the tree and the insertion point is found.")); break; }
            Tr.at("e2", tx("<code>p</code> NULL değil (" + N[p].v + "): döngü sürer.", "<code>p</code> is not NULL (" + N[p].v + "): the loop continues."), { look: p });
            q = p; V.q = nm(q); P.q = q;
            Tr.at("e3", tx("<code>q = p</code>: <code>q</code> bir adım geride kalarak ebeveyni tutar.", "<code>q = p</code>: <code>q</code> trails one step behind and keeps the parent."), { look: p });
            if (x < N[p].v) { p = N[p].l; V.p = nm(p); P.p = p; Tr.at("e4", x + " &lt; " + N[q].v + tx(": sola inilir, <code>p = p-&gt;solcocuk</code> (", ": go left, <code>p = p-&gt;left</code> (") + nm(p) + ").", { look: p }); }
            else if (x > N[p].v) { Tr.at("e4", tx(x + " &lt; " + N[p].v + " değil.", x + " &lt; " + N[p].v + " is false."), { look: p }); p = N[p].r; V.p = nm(p); P.p = p; Tr.at("e5", x + " &gt; " + N[q].v + tx(": sağa inilir, <code>p = p-&gt;sagcocuk</code> (", ": go right, <code>p = p-&gt;right</code> (") + nm(p) + ").", { look: p }); }
            else {
              Tr.at("e4", tx(x + " &lt; " + N[p].v + " değil.", x + " &lt; " + N[p].v + " is false."), { look: p });
              Tr.at("e5", tx(x + " &gt; " + N[p].v + " de değil.", x + " &gt; " + N[p].v + " is false as well."), { look: p });
              Tr.at("e6", tx(x + " zaten ağaçta: \"Benzer deger var.\" yazılır ve <code>FALSE</code> döner. Ağaç değişmez.", x + " is already in the tree: \"Duplicate key.\" is printed and <code>FALSE</code> is returned. The tree does not change."), { look: p });
              Tr.print(tx("Benzer deger var.\n", "Duplicate key.\n")); res.push("ekle " + x + " FALSE");
              return;
            }
          }
          var r = "n" + (idc++); N[r] = { v: x, l: null, r: null }; extra = r; V.r = "→" + x;
          Tr.at("e7", tx("<code>r = ogeal()</code>: yeni düğüm ayrıldı; iki çocuğu da NULL.", "<code>r = get_node()</code>: a new node is allocated; both children are NULL."));
          Tr.at("e8", tx("<code>r-&gt;veri = " + x + "</code>.", "<code>r-&gt;data = " + x + "</code>."));
          extra = null;
          if (kok == null) { kok = r; Tr.at("e9", tx("<code>*L == NULL</code>: ağaç boştu, yeni düğüm kök oldu.", "<code>*L == NULL</code>: the tree was empty; the new node becomes the root."), { done: r }); }
          else if (x < N[q].v) { Tr.at("e9", tx("<code>*L</code> NULL değil.", "<code>*L</code> is not NULL."), { look: q }); N[q].l = r; Tr.at("e10", tx(x + " &lt; " + N[q].v + ": <code>q-&gt;solcocuk = r</code>; " + x + ", " + N[q].v + " düğümünün sol çocuğu oldu.", x + " &lt; " + N[q].v + ": <code>q-&gt;left = r</code>; " + x + " becomes the left child of " + N[q].v + "."), { done: r }); }
          else { Tr.at("e9", tx("<code>*L</code> NULL değil.", "<code>*L</code> is not NULL."), { look: q }); Tr.at("e10", tx(x + " &lt; " + N[q].v + " değil.", x + " &lt; " + N[q].v + " is false."), { look: q }); N[q].r = r; Tr.at("e11", tx(x + " &gt; " + N[q].v + ": <code>q-&gt;sagcocuk = r</code>; " + x + ", " + N[q].v + " düğümünün sağ çocuğu oldu.", x + " &gt; " + N[q].v + ": <code>q-&gt;right = r</code>; " + x + " becomes the right child of " + N[q].v + "."), { done: r }); }
          Tr.at("e12", tx("<code>TRUE</code> döner.", "<code>TRUE</code> is returned."), { done: r });
          Tr.print(tx("ekle(", "insert(") + x + ") → TRUE\n"); res.push("ekle " + x + " TRUE");
        } else if (o.op === "ara") {
          Tr.fn("arama_agacinda_ara");
          var L = kok; V.L = nm(L); P = { L: L };
          Tr.at(null, tx("<code>arama_agacinda_ara(" + x + ", kok)</code> çağrıldı; <code>L</code> kökten başlar.", "<code>bst_search(" + x + ", root)</code> is called; <code>L</code> starts at the root."), { look: L });
          while (true) {
            if (L == null) {
              Tr.at("a1", tx("<code>L == NULL</code>: inilecek alt ağaç kalmadı.", "<code>L == NULL</code>: there is no subtree left to descend into."));
              Tr.at("a5", tx(x + " ağaçta yok: <code>NULL</code> döner.", x + " is not in the tree: <code>NULL</code> is returned."));
              Tr.print(tx("ara(", "find(") + x + ") → NULL\n"); res.push("ara " + x + " NULL");
              return;
            }
            Tr.at("a1", tx("<code>L</code> NULL değil (" + N[L].v + ").", "<code>L</code> is not NULL (" + N[L].v + ")."), { look: L });
            if (x === N[L].v) {
              Tr.at("a2", x + " == " + N[L].v + tx(": bulundu, düğümün adresi döner.", ": found; the node's address is returned."), { done: L });
              Tr.print(tx("ara(" + x + ") → bulundu\n", "find(" + x + ") → found\n")); res.push("ara " + x + " bulundu");
              return;
            }
            Tr.at("a2", x + " ≠ " + N[L].v + ".", { look: L });
            var was = N[L].v;
            if (x < was) { L = N[L].l; V.L = nm(L); P.L = L; Tr.at("a3", x + " &lt; " + was + tx(": sol alt ağaca inilir, <code>L = L-&gt;solcocuk</code> (", ": go down into the left subtree, <code>L = L-&gt;left</code> (") + nm(L) + ").", { look: L }); }
            else { Tr.at("a3", tx(x + " &lt; " + was + " değil.", x + " &lt; " + was + " is false."), { look: L }); L = N[L].r; V.L = nm(L); P.L = L; Tr.at("a4", x + " &gt; " + was + tx(": sağ alt ağaca inilir, <code>L = L-&gt;sagcocuk</code> (", ": go down into the right subtree, <code>L = L-&gt;right</code> (") + nm(L) + ").", { look: L }); }
          }
        } else {
          Tr.fn("sil");
          var pp = kok, bag = "&amp;kok", bagRef = { o: null, s: null };
          V.p = nm(pp); V[kBag] = tx("&kok", "&root"); P = { p: pp };
          Tr.at("s1", tx("<code>sil(" + x + ", &amp;kok)</code>: <code>p = *L</code>, <code>bag = L</code>; <code>bag</code>, p'yi gösteren işaretçinin adresidir.",
            "<code>bst_delete(" + x + ", &amp;root)</code>: <code>p = *L</code>, <code>link = L</code>; <code>link</code> is the address of the pointer that points to p."), { look: pp });
          while (true) {
            if (pp == null) { Tr.at("s2", tx("<code>p == NULL</code>: arama bitti.", "<code>p == NULL</code>: the search is over.")); break; }
            if (N[pp].v === x) { Tr.at("s2", tx("<code>p-&gt;veri == " + x + "</code>: silinecek düğüm bulundu.", "<code>p-&gt;data == " + x + "</code>: the node to delete is found."), { look: pp }); break; }
            Tr.at("s2", N[pp].v + " ≠ " + x + tx(": aramaya devam.", ": keep searching."), { look: pp });
            var left = x < N[pp].v;
            bagRef = { o: pp, s: left ? "l" : "r" }; V[kBag] = "&(" + N[pp].v + ")->" + (left ? sSol : sSag);
            Tr.at("s3", x + (left ? " &lt; " : " &gt; ") + N[pp].v + ": <code>" + kBag + " = &amp;p-&gt;" + (left ? sSol : sSag) + "</code>.", { look: pp });
            pp = left ? N[pp].l : N[pp].r; V.p = nm(pp); P.p = pp;
            Tr.at("s4", "<code>p = *" + kBag + "</code> (" + nm(pp) + ").", { look: pp });
          }
          if (pp == null) {
            Tr.at("s5", tx(x + " ağaçta yok: yordam bir şey yapmadan döner.", x + " is not in the tree: the function returns without doing anything."));
            Tr.print(tx("sil(" + x + ") → yok\n", "delete(" + x + ") → absent\n")); res.push("sil " + x + " yok");
            return;
          }
          Tr.at("s5", tx("<code>p</code> NULL değil.", "<code>p</code> is not NULL."), { look: pp });
          if (N[pp].l != null && N[pp].r != null) {
            Tr.at("s6", tx(N[pp].v + " düğümünün iki çocuğu var: yerine sol alt ağacın en büyüğü konacak.", N[pp].v + " has two children: it will be replaced by the largest key of its left subtree."), { look: pp });
            var bo = pp, bs = "l"; V.b = "&(" + N[pp].v + ")->" + sSol;
            Tr.at("s7", tx("<code>b = &amp;p-&gt;solcocuk</code>: sol alt ağacın kökü " + N[N[pp].l].v + ".", "<code>b = &amp;p-&gt;left</code>: the root of the left subtree is " + N[N[pp].l].v + "."), { look: N[pp].l });
            var cur = N[pp].l;
            while (N[cur].r != null) {
              Tr.at("s8", tx(N[cur].v + " düğümünün sağ çocuğu var: sağa inilir.", N[cur].v + " has a right child: go right."), { look: cur });
              bo = cur; bs = "r"; V.b = "&(" + N[cur].v + ")->" + sSag; cur = N[cur].r;
              Tr.at("s9", "<code>b = &amp;(*b)-&gt;" + sSag + "</code> (" + N[cur].v + ").", { look: cur });
            }
            Tr.at("s8", tx(N[cur].v + " düğümünün sağ çocuğu yok: sol alt ağacın en büyüğü " + N[cur].v + ".", N[cur].v + " has no right child: the largest key of the left subtree is " + N[cur].v + "."), { look: cur });
            N[pp].v = N[cur].v;
            Tr.at("s10", tx("<code>p-&gt;veri = " + N[cur].v + "</code>: değer silinecek düğümün yerine taşındı.", "<code>p-&gt;data = " + N[cur].v + "</code>: the key is moved into the node being deleted."), { look: cur });
            bagRef = { o: bo, s: bs }; V[kBag] = V.b; pp = cur; V.p = nm(pp); P = { p: pp };
            Tr.at("s11", tx("<code>bag = b; p = *b</code>: artık en çok bir çocuğu olan bu düğüm silinecek.", "<code>link = b; p = *b</code>: now this node, which has at most one child, is deleted."), { look: pp });
          } else Tr.at("s6", tx(N[pp].v + " düğümünün en çok bir çocuğu var.", N[pp].v + " has at most one child."), { look: pp });
          var child = N[pp].l != null ? N[pp].l : N[pp].r;
          if (bagRef.o == null) kok = child; else N[bagRef.o][bagRef.s] = child;
          var gone = pp; extra = gone;
          Tr.at("s12", tx("<code>*bag = " + (child == null ? "NULL" : "çocuk (" + N[child].v + ")") + "</code>: düğüm ağaçtan ayrıldı; " + (child == null ? "yaprak olduğu için yerine NULL yazıldı." : "tek çocuğu ebeveynine bağlandı."),
            "<code>*link = " + (child == null ? "NULL" : "child (" + N[child].v + ")") + "</code>: the node is unlinked from the tree; " + (child == null ? "it is a leaf, so NULL takes its place." : "its only child is linked to its parent.")), { dim: gone });
          extra = null; delete N[gone]; V.p = tx("(serbest)", "(freed)"); P = {};
          Tr.at("s13", tx("<code>free(p)</code>: düğümün belleği geri verildi.", "<code>free(p)</code>: the node's memory is released."));
          Tr.print(tx("sil(" + x + ") → silindi\n", "delete(" + x + ") → deleted\n")); res.push("sil " + x + " silindi");
        }
      });
      V = {}; P = {}; extra = null;
      Tr.at(null, tx("İşlemler bitti. Kök ortada sıra: " + (inorder(kok, []).join(" ") || "boş") + " — artan sıradadır.", "All operations done. Inorder: " + (inorder(kok, []).join(" ") || "empty") + " — in increasing order."));
      res.push("inorder " + inorder(kok, []).join(" "));
      res.push("preorder " + preorder(kok, []).join(" "));
      return res.join("\n");
    }
  };

  /* ---------- 02: dinamik dizi (realloc ile ikiye katlama) ---------- */
  models.dyn = {
    label: tx("Girdi (virgülle ayrılmış sayılar)", "Input (comma-separated numbers)"),
    fnEn: { ekle: "append" },
    parse: function (text) { return nums(text, -999, 999, 1, 16); },
    run: function (list, mode, Tr) {
      var veri = null, boyut = 0, kap = 0, kopya = 0, x = null, yeni = null, res = [];
      var nVeri = tx("veri", "data"), nBoyut = tx("boyut", "size"), nKap = tx("kap", "cap");
      Tr.varsFn = function () {
        var v = [["x", x == null ? "–" : String(x)], [nBoyut, String(boyut)], [nKap, String(kap)]];
        if (yeni != null) v.push([tx("yeni", "newcap"), String(yeni)]);
        v.push([tx("toplam kopya", "copies"), String(kopya)]);
        return v;
      };
      Tr.viewFn = function (ex) {
        if (veri == null) return [{ t: "arr", name: nVeri, cells: [], noIdx: true }];
        var hl = {}; for (var i = 0; i < kap; i++) if (i >= boyut) hl[i] = "";
        if (ex.look != null) hl[ex.look] = "is-look";
        return [{ t: "arr", name: nVeri, cells: veri.slice(0, kap).map(function (v, i) { return i < boyut ? v : null; }), hl: hl, ptr: [[nBoyut, boyut]], cw: 22 }];
      };
      Tr.fn("ekle");
      Tr.at(null, tx("Boş dinamik dizi: <code>{veri = NULL, boyut = 0, kap = 0}</code>. Dolunca kapasite ikiye katlanır; her büyütmede eski öğeler yeni bloğa taşınır.",
        "An empty dynamic array: <code>{data = NULL, size = 0, cap = 0}</code>. When it is full, the capacity doubles; on every resize the old items are moved to the new block."));
      list.forEach(function (v) {
        x = v; yeni = null;
        if (boyut === kap) {
          Tr.at("c", tx("<code>ekle(&amp;d, " + v + ")</code>: <code>boyut == kap</code> (" + boyut + "): dizi dolu, büyütülmeli.", "<code>append(&amp;d, " + v + ")</code>: <code>size == cap</code> (" + boyut + "): the array is full and must grow."));
          yeni = kap ? 2 * kap : 1;
          Tr.at("y", tx("<code>yeni = " + (kap ? "2 * kap" : "1") + " = " + yeni + "</code>" + (kap ? ": kapasite ikiye katlanır." : ": ilk blok tek hücreliktir."),
            "<code>newcap = " + (kap ? "2 * cap" : "1") + " = " + yeni + "</code>" + (kap ? ": the capacity doubles." : ": the first block has a single cell.")));
          var t = []; for (var i = 0; i < yeni; i++) t.push(veri && i < boyut ? veri[i] : null);
          Tr.at("r", tx("<code>realloc</code> " + yeni + " hücrelik blok verdi; eski " + boyut + " öğe yeni bloğa taşındı.", "<code>realloc</code> returned a block of " + pl(yeni, "cell", "cells") + "; the old " + pl(boyut, "item was", "items were") + " moved to the new block."));
          kopya += boyut;
          Tr.at("n", tx("<code>t</code> NULL değil: bellek ayrılabildi.", "<code>t</code> is not NULL: the allocation succeeded."));
          veri = t;
          Tr.at("v", tx("<code>d-&gt;veri = t</code>: dizi artık yeni bloğu gösterir (toplam " + kopya + " kopya).", "<code>d-&gt;data = t</code>: the array now points to the new block (" + pl(kopya, "copy", "copies") + " in total)."));
          kap = yeni;
          Tr.at("k", tx("<code>d-&gt;kap = ", "<code>d-&gt;cap = ") + kap + "</code>.");
        } else Tr.at("c", tx("<code>ekle(&amp;d, " + v + ")</code>: <code>boyut</code> (" + boyut + ") &lt; <code>kap</code> (" + kap + "): yer var, büyütme gerekmez.", "<code>append(&amp;d, " + v + ")</code>: <code>size</code> (" + boyut + ") &lt; <code>cap</code> (" + kap + "): there is room; no resize is needed."));
        yeni = null;
        veri[boyut++] = v;
        Tr.at("w", tx("<code>d-&gt;veri[" + (boyut - 1) + "] = " + v + "</code>, ardından <code>boyut</code> " + boyut + " oldu.", "<code>d-&gt;data[" + (boyut - 1) + "] = " + v + "</code>, then <code>size</code> becomes " + boyut + "."), { look: boyut - 1 });
        Tr.at("ret", tx("1 döner. Şimdiye dek " + boyut + " ekleme için toplam " + kopya + " öğe kopyalandı; ekleme başına ortalama " + fmtF(kopya / boyut).replace(".", ",") + ".",
          "1 is returned. So far " + pl(kopya, "item has", "items have") + " been copied for " + pl(boyut, "append", "appends") + "; on average " + fmtF(kopya / boyut) + " per append."));
        Tr.print(tx("ekle(" + v + "): boyut " + boyut + ", kap " + kap + "\n", "append(" + v + "): size " + boyut + ", cap " + kap + "\n"));
        res.push("ekle " + v + " boyut " + boyut + " kap " + kap + " kopya " + kopya);
      });
      x = null;
      Tr.at(null, tx(boyut + " ekleme bitti: kapasite " + kap + ", toplam kopya " + kopya + " (en çok 2n). Ekleme başına amortize maliyet O(1)'dir.",
        pl(boyut, "append", "appends") + " done: capacity " + kap + ", total copies " + kopya + " (at most 2n). The amortized cost per append is O(1)."));
      return res.join("\n");
    }
  };

  /* ---------- 03: ikili arama ---------- */
  models.bsearch = {
    label: tx("Girdi (aranan: artan sıralı sayılar)", "Input (key: numbers in increasing order)"),
    parse: function (text) {
      var m = /^\s*(-?\d+)\s*:(.*)$/.exec(text);
      if (!m) fail(tx("biçim “aranan: sayı, sayı, …” olmalı (ör. 18: 4, 13, 18)", "the format must be “key: number, number, …” (e.g. 18: 4, 13, 18)"));
      var a = nums(m[2], -999, 999, 1, 15);
      for (var i = 1; i < a.length; i++) if (a[i] <= a[i - 1]) fail(tx("liste kesin artan sırada olmalı (", "the list must be strictly increasing (") + a[i - 1] + ", " + a[i] + ")");
      return { x: int(m[1], -999, 999), a: a };
    },
    run: function (d, mode, Tr) {
      var a = d.a, x = d.x, left = 0, right = a.length - 1, mid = null, tur = 0;
      Tr.varsFn = function () { var v = [[tx("aranan", "searchnum"), String(x)], ["left", String(left)], ["right", String(right)]]; if (mid != null) v.push(["middle", String(mid)]); v.push([tx("tur", "rounds"), String(tur)]); return v; };
      Tr.viewFn = function (ex) {
        var hl = {}; for (var i = 0; i < a.length; i++) if (i < left || i > right) hl[i] = "is-dim";
        if (mid != null) hl[mid] = ex.found ? "is-done" : "is-look";
        var ptr = [["left", left], ["right", right]]; if (mid != null) ptr.push(["middle", mid]);
        return [{ t: "arr", name: "list", cells: a.slice(), hl: hl, ptr: ptr, noDiff: true }];
      };
      Tr.fn("binsearch");
      Tr.at(null, tx("<code>binsearch(list, " + x + ", 0, " + (a.length - 1) + ")</code>: arama aralığı tüm dizi. Her turda aralığın ortasındaki öğe aranan ile karşılaştırılır ve aralık yarıya iner.",
        "<code>binsearch(list, " + x + ", 0, " + (a.length - 1) + ")</code>: the search range is the whole array. In each round the middle element of the range is compared with the key, and the range is halved."));
      while (true) {
        if (left > right) {
          Tr.at("w", tx("<code>left</code> (" + left + ") &gt; <code>right</code> (" + right + "): aralık boşaldı, döngü biter.", "<code>left</code> (" + left + ") &gt; <code>right</code> (" + right + "): the range is empty; the loop ends."));
          Tr.at("nf", tx(x + " listede yok: −1 döner (" + tur + " tur).", x + " is not in the list: −1 is returned (" + pl(tur, "round", "rounds") + ")."));
          Tr.print("binsearch → -1\n");
          return "-1 " + tur;
        }
        tur++; mid = null;
        Tr.at("w", left + " ≤ " + right + tx(": " + tur + ". tur.", ": round " + tur + "."));
        mid = Math.floor((left + right) / 2);
        Tr.at("m", "<code>middle = (" + left + " + " + right + ") / 2 = " + mid + "</code>; <code>list[" + mid + "] = " + a[mid] + "</code>.");
        var c = a[mid] < x ? -1 : a[mid] > x ? 1 : 0;
        Tr.at("s", "<code>COMPARE(" + a[mid] + ", " + x + ") = " + c + "</code>.");
        if (c === -1) { left = mid + 1; Tr.at("lt", a[mid] + " &lt; " + x + tx(": aranan sağ yarıda; <code>left = ", ": the key is in the right half; <code>left = ") + left + "</code>."); }
        else if (c === 1) { right = mid - 1; Tr.at("gt", a[mid] + " &gt; " + x + tx(": aranan sol yarıda; <code>right = ", ": the key is in the left half; <code>right = ") + right + "</code>."); }
        else {
          Tr.at("eq", tx(a[mid] + " == " + x + ": bulundu, <code>" + mid + "</code> döner (" + tur + " tur).", a[mid] + " == " + x + ": found; <code>" + mid + "</code> is returned (" + pl(tur, "round", "rounds") + ")."), { found: 1 });
          Tr.print("binsearch → " + mid + "\n");
          return mid + " " + tur;
        }
      }
    }
  };

  /* ---------- 03: n-vezir (geri izleme) ---------- */
  models.queens = {
    label: tx("Girdi (tahta boyutu n, 1–8)", "Input (board size n, 1–8)"),
    fnEn: { yerlestir: "place" },
    parse: function (text) { var t = tokens(text); if (t.length !== 1) fail(tx("tek bir sayı girilmeli", "enter a single number")); return int(t[0], 1, 8); },
    run: function (n, mode, Tr) {
      var q = [], depth = 0, calls = [], placed = 0, tries = 0;
      var fP = tx("yerlestir", "place"), fU = tx("uygun", "is_safe");
      for (var i = 0; i < n; i++) q.push(-1);
      Tr.varsFn = function (ex) {
        var v = [["n", String(n)], ["r", String(depth)]];
        if (ex.c != null) v.push(["c", String(ex.c)]);
        v.push(["q", "[" + q.slice(0, depth).join(", ") + "]"], [tx("çağrılar", "calls"), calls.length ? calls.join(" › ") : "–"]);
        return v;
      };
      Tr.viewFn = function (ex) {
        var hl = {}, qq = q.map(function (c, r) { return r < depth || (ex.show && r === depth) ? c : -1; });
        if (ex.c != null) hl[depth + "," + ex.c] = ex.bad != null ? "is-bad" : "is-look";
        if (ex.bad != null) hl[ex.bad + "," + q[ex.bad]] = "is-bad";
        if (ex.done) for (var r = 0; r < n; r++) hl[r + "," + q[r]] = "is-done";
        return [{ t: "board", n: n, q: qq, hl: hl }];
      };
      Tr.fn("yerlestir");
      Tr.at(null, tx("<code>yerlestir(0, " + n + ")</code>: her satıra bir vezir konur. Bir satırda uygun sütun yoksa çağrı 0 döner ve bir önceki satır sıradaki sütunu dener (geri izleme).",
        "<code>place(0, " + n + ")</code>: one queen goes in each row. If a row has no safe column, the call returns 0 and the previous row tries its next column (backtracking)."));
      function place(r) {
        depth = r; calls.push(fP + "(" + r + ")");
        if (r === n) {
          Tr.at("base", tx("<code>r == n</code>: " + n + " vezir de yerleşti, çözüm bulundu; 1 döner.", "<code>r == n</code>: all " + n + " queens are placed and a solution is found; 1 is returned."), { done: 1 });
          calls.pop();
          return true;
        }
        Tr.at("base", tx("<code>r = " + r + "</code> &lt; " + n + ": " + r + ". satıra vezir aranıyor.", "<code>r = " + r + "</code> &lt; " + n + ": looking for a place for the queen in row " + r + "."));
        for (var c = 0; c < n; c++) {
          depth = r;
          Tr.at("for", tx("Sütun <code>c = " + c + "</code> deneniyor.", "Trying column <code>c = " + c + "</code>."), { c: c });
          tries++;
          var bad = null;
          for (var k = 0; k < r; k++) if (q[k] === c || Math.abs(q[k] - c) === r - k) { bad = k; break; }
          if (bad != null) {
            Tr.at("if", tx("<code>uygun(" + r + ", " + c + ")</code> = 0: " + bad + ". satırdaki vezir (sütun " + q[bad] + ") " + (q[bad] === c ? "aynı sütunda" : "aynı çaprazda") + ".",
              "<code>is_safe(" + r + ", " + c + ")</code> = 0: the queen in row " + bad + " (column " + q[bad] + ") is " + (q[bad] === c ? "in the same column" : "on the same diagonal") + "."), { c: c, bad: bad });
            continue;
          }
          Tr.at("if", "<code>" + fU + "(" + r + ", " + c + ")</code> = 1" + tx(": üstteki vezirlerle çakışma yok.", ": no conflict with the queens above."), { c: c });
          q[r] = c; placed++;
          Tr.at("set", tx("<code>q[" + r + "] = " + c + "</code>: vezir (" + r + ", " + c + ") karesine kondu.", "<code>q[" + r + "] = " + c + "</code>: a queen is placed on square (" + r + ", " + c + ")."), { show: 1 });
          Tr.at("rec", "<code>" + fP + "(" + (r + 1) + ", " + n + ")</code>" + tx(" çağrılır: sıradaki satır.", " is called: the next row."), { show: 1 });
          if (place(r + 1)) {
            depth = r;
            Tr.at("rec", tx("Alt çağrı 1 döndürdü: çözüm yukarı iletilir.", "The inner call returned 1: the solution is passed up."), { done: 1 });
            calls.pop();
            return true;
          }
          depth = r;
          Tr.at("rec", tx("<code>yerlestir(" + (r + 1) + ")</code> 0 döndü: (" + r + ", " + c + ") çıkmaza götürdü; sıradaki sütun denenecek.", "<code>place(" + (r + 1) + ")</code> returned 0: (" + r + ", " + c + ") led to a dead end; the next column will be tried."), { c: c });
        }
        Tr.at("back", tx(r + ". satırda uygun sütun kalmadı: 0 döner, bir üst satıra geri dönülür.", "No safe column is left in row " + r + ": 0 is returned and we backtrack to the row above."));
        calls.pop();
        return false;
      }
      var ok = place(0);
      depth = ok ? n : 0;
      Tr.at(null, ok ? tx("Çözüm: <code>q = [" + q.join(", ") + "]</code>; " + tries + " deneme, " + placed + " yerleştirme yapıldı.", "Solution: <code>q = [" + q.join(", ") + "]</code>; " + pl(tries, "try", "tries") + ", " + pl(placed, "placement", "placements") + ".")
        : tx(n + " × " + n + " tahtada çözüm yok (" + tries + " deneme).", "There is no solution on a " + n + " × " + n + " board (" + pl(tries, "try", "tries") + ")."), ok ? { done: 1 } : {});
      Tr.print(ok ? "q = " + q.join(" ") + "\n" : tx("cozum yok\n", "no solution\n"));
      return (ok ? "q " + q.join(" ") : "yok") + "\ndeneme " + tries + " yerlestirme " + placed;
    }
  };

  /* ---------- 04: tek yönlü bağlı liste ---------- */
  models.slist = {
    label: tx("Girdi (sayı = sıralı ekle, sil 30)", "Input (number = sorted insert, delete 30)"),
    fnEn: { sirali_ekle: "insert_sorted", sil: "delete_key", liste_devrik_al: "invert" },
    parse: function (text, mode) {
      if (mode === "devrik") return nums(text, -999, 999, 0, 7);
      var l = ops(text, "ekle", words({ sil: { op: "sil", arg: 1 }, ekle: { op: "ekle", arg: 1 } }, { "delete": { op: "sil", arg: 1 }, insert: { op: "ekle", arg: 1 } }), -999, 999, 20), size = 0;
      l.forEach(function (o) { if (o.op === "ekle") size++; if (size > 7) fail(tx("listede aynı anda en fazla 7 düğüm çizilebilir", "at most 7 nodes can be drawn in the list at once")); });
      return l;
    },
    run: function (list, mode, Tr) {
      var N = {}, bas = null, idc = 0, P = {}, V = {}, fixed = null, last = [], res = [];
      var nBas = tx("bas", "head"), nOnceki = tx("onceki", "prev"), nYeni = tx("yeni", "temp");
      function chain() { var a = [], p = bas, g = 0; while (p != null && g++ < 50) { a.push(p); p = N[p].next; } return a; }
      function nm(id) { return id == null ? "NULL" : "→" + N[id].v; }
      Tr.varsFn = function () { var v = []; Object.keys(V).forEach(function (k) { v.push([k, V[k]]); }); return v; };
      Tr.viewFn = function (ex) {
        var order;
        if (fixed) order = fixed.slice();
        else {
          order = chain();
          Object.keys(P).forEach(function (k) {
            var id = P[k];
            if (id == null || !N[id] || order.indexOf(id) >= 0) return;
            var at = last.indexOf(id);
            if (at < 0) order.push(id); else order.splice(Math.min(at, order.length), 0, id);
          });
        }
        last = order;
        var ptrs = [[nBas, bas]]; Object.keys(P).forEach(function (k) { if (P[k] != null) ptrs.push([k, P[k]]); });
        return [{ t: "list", nodes: order.map(function (id) { return { id: id, v: N[id].v, next: N[id].next, hl: ex.dim === id ? "is-dim" : ex.look === id ? "is-look" : "" }; }), ptrs: ptrs }];
      };
      function vals() { return chain().map(function (id) { return N[id].v; }); }
      if (mode === "devrik") {
        list.forEach(function (v) { var id = "n" + (idc++); N[id] = { v: v, next: null }; if (fixed) N[fixed[fixed.length - 1]].next = id; else bas = id; fixed = (fixed || []).concat([id]); });
        fixed = fixed || [];
        Tr.fn("liste_devrik_al");
        V = { "*list": nm(bas) };
        Tr.at(null, tx("Liste: " + (vals().join(" → ") || "boş") + ". <code>liste_devrik_al</code> yeni düğüm ayırmadan yalnızca bağları ters çevirir; üç işaretçi (<code>r</code>, <code>q</code>, <code>p</code>) birlikte ilerler.",
          "List: " + (vals().join(" → ") || "empty") + ". <code>invert</code> allocates no new nodes; it only reverses the links, with three pointers (<code>r</code>, <code>q</code>, <code>p</code>) moving together."));
        var p = bas, q = null, r = null;
        P = { p: p }; V = { p: nm(p), q: "NULL", r: "–" };
        Tr.at("d1", "<code>p = *list</code> (" + nm(p) + "), <code>q = NULL</code>.");
        while (true) {
          if (p == null) { Tr.at("d2", tx("<code>p == NULL</code>: tüm bağlar çevrildi, döngü biter.", "<code>p == NULL</code>: every link is reversed; the loop ends.")); break; }
          Tr.at("d2", tx("<code>p</code> NULL değil (" + N[p].v + ").", "<code>p</code> is not NULL (" + N[p].v + ")."), { look: p });
          r = q; V.r = nm(r); P.r = r;
          Tr.at("d3", "<code>r = q</code> (" + nm(r) + ").");
          q = p; V.q = nm(q); P.q = q;
          Tr.at("d4", "<code>q = p</code> (" + nm(q) + ").");
          p = N[p].next; V.p = nm(p); P.p = p;
          Tr.at("d5", tx("<code>p = p-&gt;bag</code> (" + nm(p) + "): p, bağ değişmeden önce ilerletildi.", "<code>p = p-&gt;link</code> (" + nm(p) + "): p advances before the link is changed."));
          N[q].next = r;
          Tr.at("d6", tx("<code>q-&gt;bag = r</code>: " + N[q].v + " düğümü artık " + (r == null ? "NULL" : r && N[r].v + " düğümünü") + " gösteriyor.", "<code>q-&gt;link = r</code>: node " + N[q].v + " now points to " + (r == null ? "NULL" : "node " + N[r].v) + "."), { look: q });
        }
        bas = q; V["*list"] = nm(bas);
        Tr.at("d7", tx("<code>*list = q</code>: eski son düğüm (" + (q == null ? "NULL" : N[q].v) + ") listenin başı oldu.", "<code>*list = q</code>: the old last node (" + (q == null ? "NULL" : N[q].v) + ") becomes the head of the list."));
        P = {}; V = { "*list": nm(bas) };
        Tr.at(null, tx("Ters çevrilmiş liste: " + (vals().join(" → ") || "boş") + ".", "The reversed list: " + (vals().join(" → ") || "empty") + "."));
        Tr.print(vals().join(" ") + "\n");
        return "liste " + vals().join(" ");
      }
      Tr.fn("sirali_ekle");
      V = {}; V[nBas] = "NULL";
      Tr.at(null, tx("Başlangıçta liste boş: <code>bas = NULL</code>. Sayılar <code>sirali_ekle</code> ile artan sırayı bozmadan eklenir; <code>sil</code> değeri arar ve düğümü listeden çıkarır.",
        "The list starts empty: <code>head = NULL</code>. <code>insert_sorted</code> inserts the numbers keeping the list in increasing order; <code>delete_key</code> searches for a value and unlinks its node."));
      list.forEach(function (o) {
        P = {}; V = {}; V[nBas] = nm(bas);
        if (o.op === "ekle") {
          Tr.fn("sirali_ekle");
          var y = "n" + (idc++); N[y] = { v: o.x, next: null };
          var onceki = null, p = bas;
          P = {}; P[nYeni] = y; P.p = p; V = {}; V[tx("yeni->deger", "temp->data")] = String(o.x); V[nOnceki] = "NULL"; V.p = nm(p);
          Tr.at("i1", tx("<code>yeni_oge(" + o.x + ")</code> ile ayrılan düğüm <code>sirali_ekle</code>'ye verildi: <code>onceki = NULL</code>, <code>p = *bas</code>.",
            "The node allocated by <code>new_node(" + o.x + ")</code> is passed to <code>insert_sorted</code>: <code>prev = NULL</code>, <code>p = *head</code>."), { look: y });
          while (p != null && N[p].v < o.x) {
            Tr.at("i2", tx("<code>p</code> NULL değil ve " + N[p].v + " &lt; " + o.x + ": ilerlenir.", "<code>p</code> is not NULL and " + N[p].v + " &lt; " + o.x + ": move on."), { look: p });
            onceki = p; P[nOnceki] = onceki; V[nOnceki] = nm(onceki);
            Tr.at("i3", "<code>" + nOnceki + " = p</code> (" + N[p].v + ").");
            p = N[p].next; P.p = p; V.p = nm(p);
            Tr.at("i4", tx("<code>p = p-&gt;bag</code> (", "<code>p = p-&gt;link</code> (") + nm(p) + ").", { look: p });
          }
          Tr.at("i2", p == null ? tx("<code>p == NULL</code>: listenin sonuna gelindi.", "<code>p == NULL</code>: the end of the list is reached.") : tx(N[p].v + " &lt; " + o.x + " değil: yer bulundu.", N[p].v + " &lt; " + o.x + " is false: the place is found."), { look: p });
          N[y].next = p;
          Tr.at("i5", tx("<code>yeni-&gt;bag = p</code> (" + nm(p) + "): önce yeni düğüm arkasındakine bağlanır.", "<code>temp-&gt;link = p</code> (" + nm(p) + "): first the new node is linked to the node after it."), { look: y });
          if (onceki == null) { bas = y; V[nBas] = nm(bas); Tr.at("i6", tx("<code>onceki == NULL</code>: " + o.x + " listenin başına girdi, <code>*bas = yeni</code>.", "<code>prev == NULL</code>: " + o.x + " goes to the front of the list, <code>*head = temp</code>."), { look: y }); }
          else { Tr.at("i6", tx("<code>onceki</code> NULL değil.", "<code>prev</code> is not NULL."), { look: onceki }); N[onceki].next = y; Tr.at("i7", tx("<code>onceki-&gt;bag = yeni</code>: " + o.x + ", " + N[onceki].v + " düğümünden sonra listeye girdi.", "<code>prev-&gt;link = temp</code>: " + o.x + " enters the list after node " + N[onceki].v + "."), { look: y }); }
          Tr.print(tx("ekle(", "insert(") + o.x + "): " + vals().join(" ") + "\n");
          res.push("ekle " + o.x + ": " + vals().join(" "));
        } else {
          Tr.fn("sil");
          var on2 = null, q = bas, x = o.x;
          P = { p: q }; V = { x: String(x) }; V[nOnceki] = "NULL"; V.p = nm(q);
          Tr.at("s1", tx("<code>sil(&amp;bas, " + x + ")</code>: <code>onceki = NULL</code>, <code>p = *bas</code>.", "<code>delete_key(&amp;head, " + x + ")</code>: <code>prev = NULL</code>, <code>p = *head</code>."), { look: q });
          while (q != null && N[q].v !== x) {
            Tr.at("s2", N[q].v + " ≠ " + x + tx(": ilerlenir.", ": move on."), { look: q });
            on2 = q; P[nOnceki] = on2; V[nOnceki] = nm(on2);
            Tr.at("s3", "<code>" + nOnceki + " = p</code> (" + N[q].v + ").");
            q = N[q].next; P.p = q; V.p = nm(q);
            Tr.at("s4", tx("<code>p = p-&gt;bag</code> (", "<code>p = p-&gt;link</code> (") + nm(q) + ").", { look: q });
          }
          Tr.at("s2", q == null ? tx("<code>p == NULL</code>: liste bitti.", "<code>p == NULL</code>: the list has ended.") : tx("<code>p-&gt;deger == " + x + "</code>: silinecek düğüm bulundu.", "<code>p-&gt;data == " + x + "</code>: the node to delete is found."), { look: q });
          if (q == null) {
            Tr.at("s5", tx(x + " listede yok: <code>false</code> döner.", x + " is not in the list: <code>false</code> is returned."));
            Tr.print(tx("sil(", "delete(") + x + ") → false\n"); res.push("sil " + x + " false");
            return;
          }
          Tr.at("s5", tx("<code>p</code> NULL değil.", "<code>p</code> is not NULL."), { look: q });
          if (on2 == null) { bas = N[q].next; V[nBas] = nm(bas); Tr.at("s6", tx("<code>onceki == NULL</code>: silinen baştaki düğüm; <code>*bas = p-&gt;bag</code> (", "<code>prev == NULL</code>: the first node is being deleted; <code>*head = p-&gt;link</code> (") + nm(bas) + ").", { dim: q }); }
          else { Tr.at("s6", tx("<code>onceki</code> NULL değil.", "<code>prev</code> is not NULL."), { look: on2 }); N[on2].next = N[q].next; Tr.at("s7", tx("<code>onceki-&gt;bag = p-&gt;bag</code>: " + N[on2].v + " düğümünün bağı artık " + nm(N[q].next) + "; " + x + " atlandı.", "<code>prev-&gt;link = p-&gt;link</code>: the link of node " + N[on2].v + " is now " + nm(N[q].next) + "; " + x + " is bypassed."), { dim: q }); }
          var g = q; delete P.p; delete N[g]; V.p = tx("(serbest)", "(freed)");
          Tr.at("s8", tx("<code>free(p)</code>: düğümün belleği geri verildi.", "<code>free(p)</code>: the node's memory is released."));
          Tr.at("s9", tx("<code>true</code> döner.", "<code>true</code> is returned."));
          Tr.print(tx("sil(", "delete(") + x + ") → true\n"); res.push("sil " + x + " true");
        }
      });
      P = {}; V = {}; V[nBas] = nm(bas);
      Tr.at(null, tx("İşlemler bitti. Liste: " + (vals().join(" → ") || "boş") + ".", "All operations done. List: " + (vals().join(" → ") || "empty") + "."));
      res.push("liste " + vals().join(" "));
      return res.join("\n");
    }
  };

  /* ---------- 09: genelleştirilmiş liste derinliği ---------- */
  models.glist = {
    label: tx("Girdi (liste, ör. (a, (b, c), d))", "Input (a list, e.g. (a, (b, c), d))"),
    fnEn: { derinlik: "depth" },
    parse: function (text) {
      var s = text.replace(/\s+/g, ""), i = 0, idc = 0, count = 0;
      function list() {
        if (s[i] !== "(") fail(tx("liste “(” ile başlamalı (" + (i + 1) + ". karakter)", "a list must start with “(” (character " + (i + 1) + ")"));
        i++;
        var a = [];
        if (s[i] === ")") { i++; return a; }
        while (true) {
          var d = { id: "g" + (idc++) };
          if (s[i] === "(") { d.atom = false; d.sub = list(); }
          else if (/[a-zA-Z0-9]/.test(s[i] || "")) { d.atom = true; d.v = s[i++]; }
          else fail(tx((i + 1) + ". karakterde atom ya da alt liste bekleniyordu", "an atom or a sublist was expected at character " + (i + 1)));
          a.push(d); count++;
          if (s[i] === ",") { i++; continue; }
          if (s[i] === ")") { i++; return a; }
          fail(tx((i + 1) + ". karakterde “,” ya da “)” bekleniyordu", "“,” or “)” was expected at character " + (i + 1)));
        }
      }
      var L = list();
      if (i !== s.length) fail(tx("listeden sonra fazladan karakter var", "there are extra characters after the list"));
      if (count > 14) fail(tx("en fazla 14 öğe çizilebilir", "at most 14 elements can be drawn"));
      return L;
    },
    run: function (L, mode, Tr) {
      var frames = [], cur = null, res;
      function show(d) { if (!d) return "NULL"; return d.atom ? "→" + d.v : tx("→(alt liste)", "→(sublist)"); }
      Tr.varsFn = function () {
        var v = [];
        if (cur) { v.push(["p", show(cur.p)], ["m", String(cur.m)]); if (cur.n != null) v.push(["n", String(cur.n)]); }
        v.push([tx("çağrı derinliği", "call depth"), String(frames.length)]);
        return v;
      };
      Tr.viewFn = function () {
        var hl = {}, ptrs = {};
        frames.forEach(function (f, k) { if (f.p) { (ptrs[f.p.id] = ptrs[f.p.id] || []).push(k === frames.length - 1 ? "p" : "p" + (k + 1)); hl[f.p.id] = k === frames.length - 1 ? "is-look" : "is-done"; } });
        function copy(list) { return list.map(function (d) { return { id: d.id, atom: d.atom, v: d.v, sub: d.sub ? copy(d.sub) : null, hl: hl[d.id] || "" }; }); }
        return [{ t: "glist", list: copy(L), ptrs: ptrs }];
      };
      Tr.fn("derinlik");
      Tr.at(null, tx("<code>derinlik(L)</code>: her düzey için özyinelemeli bir çağrı açılır. Etiketi 1 olan öğe bir alt liste gösterir; o alt listenin derinliği ayrıca hesaplanır.",
        "<code>depth(L)</code>: each level gets its own recursive call. An element whose tag is 1 points to a sublist; the depth of that sublist is computed separately."));
      function depth(list) {
        var f = { p: list.length ? list[0] : null, m: 0, n: null }; frames.push(f); cur = f;
        Tr.at("d1", (frames.length > 1 ? tx(frames.length + ". düzey çağrı: ", "Level-" + frames.length + " call: ") : "") + "<code>p = L</code>, <code>m = 0</code>.");
        if (!list.length) {
          Tr.at("d2", tx("<code>L == NULL</code>: boş liste, 0 döner.", "<code>L == NULL</code>: an empty list; 0 is returned."));
          frames.pop(); cur = frames[frames.length - 1] || null;
          return 0;
        }
        Tr.at("d2", tx("<code>L</code> NULL değil.", "<code>L</code> is not NULL."));
        for (var k = 0; k <= list.length; k++) {
          f.p = k < list.length ? list[k] : null; f.n = null; cur = f;
          if (!f.p) { Tr.at("d3", tx("<code>p == NULL</code>: bu düzeyin sonu.", "<code>p == NULL</code>: the end of this level.")); break; }
          Tr.at("d3", tx("<code>p</code> NULL değil: " + (f.p.atom ? "atom " + f.p.v : "bir alt liste") + ".", "<code>p</code> is not NULL: " + (f.p.atom ? "atom " + f.p.v : "a sublist") + "."));
          if (f.p.atom) Tr.at("d4", tx("<code>p-&gt;isaret == 0</code>: atom, derinliğe katkısı yok.", "<code>p-&gt;tag == 0</code>: an atom; it adds nothing to the depth."));
          else {
            Tr.at("d4", tx("<code>p-&gt;isaret == 1</code>: alt listenin derinliği hesaplanacak.", "<code>p-&gt;tag == 1</code>: the depth of the sublist will be computed."));
            Tr.at("d5", tx("<code>derinlik(p-&gt;L_bag)</code> çağrılır.", "<code>depth(p-&gt;dlink)</code> is called."));
            var n = depth(f.p.sub); cur = f; f.n = n;
            Tr.at("d5", tx("Alt çağrı döndü: <code>n = ", "The inner call returned: <code>n = ") + n + "</code>.");
            if (f.m < n) { f.m = n; Tr.at("d6", "<code>m &lt; n</code>: <code>m = " + n + "</code>."); }
            else Tr.at("d6", "<code>m</code> (" + f.m + ") ≥ <code>n</code>" + tx(": değişmez.", ": no change."));
          }
          Tr.at("d7", tx("<code>p = p-&gt;bag</code>: sıradaki öğe.", "<code>p = p-&gt;link</code>: the next element."));
        }
        var r = f.m + 1;
        Tr.at("d8", "<code>return m + 1 = " + r + "</code>" + (frames.length > 1 ? tx(": çağıran düzeye döner.", ": back to the calling level.") : "."));
        frames.pop(); cur = frames[frames.length - 1] || null;
        return r;
      }
      res = depth(L);
      Tr.at(null, tx("Listenin derinliği <b>", "The depth of the list is <b>") + res + "</b>.");
      Tr.print(tx("derinlik = ", "depth = ") + res + "\n");
      return String(res);
    }
  };

  /* ---------- ağaç girdisi: düzey sırası, boş için - ---------- */
  function levelTree(text, max) {
    var t = tokens(text);
    if (!t.length) fail(tx("girdi boş", "the input is empty"));
    if (t[0] === "-") return { root: null, N: {} };
    var N = {}, q = [], idc = 0, k = 1, count = 0;
    function mk(s) {
      if (!/^[a-zA-Z0-9]$/.test(s)) fail(tx("“" + s + "”: düğümler tek karakter (harf ya da rakam) olmalı; boş için -", "“" + s + "”: nodes must be single characters (a letter or a digit); use - for an empty position"));
      var id = "t" + (idc++); N[id] = { v: s, l: null, r: null }; count++; return id;
    }
    var root = mk(t[0]); q.push({ id: root, d: 0 });
    while (q.length && k < t.length) {
      var p = q.shift();
      for (var side = 0; side < 2 && k < t.length; side++) {
        var s = t[k++];
        if (s === "-") continue;
        var c = mk(s); N[p.id][side ? "r" : "l"] = c;
        if (p.d + 1 > 5) fail(tx("ağaç en çok 6 düzey olabilir", "the tree can have at most 6 levels"));
        q.push({ id: c, d: p.d + 1 });
      }
    }
    if (k < t.length) fail(tx("fazladan düğüm var: “" + t[k] + "” bağlanacak ebeveyn yok", "extra node: “" + t[k] + "” has no parent to attach to"));
    if (count > max) fail(tx("en fazla " + max + " düğüm çizilebilir", "at most " + max + " nodes can be drawn"));
    return { root: root, N: N };
  }
  function treeOf(N, id, hl) { if (id == null) return null; return { id: id, v: N[id].v, l: treeOf(N, N[id].l, hl), r: treeOf(N, N[id].r, hl), hl: (hl && hl[id]) || "" }; }

  /* ---------- 10: gezinmeler ---------- */
  models.trav = {
    label: tx("Girdi (düzey sırasıyla düğümler, boş için -)", "Input (nodes in level order, - for empty)"),
    fnEn: { kok_onde_dolas: "preorder", kok_ortada_dolas: "inorder", kok_sonda_dolas: "postorder", duzey_dolas: "level_order" },
    parse: function (text) { return levelTree(text, 15); },
    run: function (T0, mode, Tr) {
      var N = T0.N, out = "", stack = [], visited = {}, cur = null, kq = [], on = 0, arka = 0;
      var nOn = tx("on", "front"), nArka = tx("arka", "rear");
      mode = mode || "ortada";
      var FN = { onde: "kok_onde_dolas", ortada: "kok_ortada_dolas", sonda: "kok_sonda_dolas", duzey: "duzey_dolas" }[mode];
      Tr.varsFn = function () {
        var v = [["L", cur == null ? "NULL" : "→" + N[cur].v]];
        if (mode === "duzey") v.push([nOn, String(on)], [nArka, String(arka)]);
        else v.push([tx("çağrılar", "calls"), stack.length ? stack.join(" › ") : "–"]);
        return v;
      };
      Tr.viewFn = function () {
        var hl = {}; Object.keys(visited).forEach(function (k) { hl[k] = "is-done"; });
        stack.forEach(function (s, i) { if (s.id && !visited[s.id]) hl[s.id] = "is-hot"; });
        if (cur != null) hl[cur] = "is-look";
        var ptrs = {}; if (cur != null) ptrs[cur] = ["L"];
        var parts = [{ t: "tree", root: treeOf(N, T0.root, hl), ptrs: ptrs, dy: 34, noDiff: true }];
        if (mode === "duzey") {
          var cells = []; for (var i = 0; i < Math.max(arka + 1, 6); i++) cells.push(kq[i] != null ? N[kq[i]].v : null);
          var h2 = {}; for (i = 0; i <= on; i++) if (cells[i] != null) h2[i] = "is-dim";
          parts.push({ t: "arr", name: tx("kuyruk", "queue"), cells: cells, hl: h2, ptr: [[nOn, on], [nArka, arka]], cw: 22 });
        }
        return parts;
      };
      Tr.fn(FN);
      var fnS = Tr.cur;
      var nameT = EN ? { onde: "Preorder (V-L-R): the root is printed first, then the left and right subtrees are traversed.", ortada: "Inorder (L-V-R): first the left subtree, then the root, then the right subtree.", sonda: "Postorder (L-R-V): the root is printed after both of its subtrees are done.", duzey: "Level order: starting at the root, the nodes are visited level by level, left to right, using a queue." }[mode]
        : { onde: "Kök önde (V-L-R): önce kök yazılır, sonra sol ve sağ alt ağaçlar gezilir.", ortada: "Kök ortada (L-V-R): önce sol alt ağaç, sonra kök, sonra sağ alt ağaç.", sonda: "Kök sonda (L-R-V): kök, iki alt ağacı da bittikten sonra yazılır.", duzey: "Düzey sırası: düğümler kökten başlayarak düzey düzey, soldan sağa bir kuyrukla gezilir." }[mode];
      Tr.at(null, nameT);
      function nmS(id) { return id == null ? "NULL" : N[id].v; }
      function rec(id) {
        cur = id; stack.push(id == null ? "NULL" : N[id].v); stack[stack.length - 1] = { toString: function () { return nmS(id); }, id: id };
        if (id == null) {
          Tr.at("if", "<code>" + fnS + "(NULL)</code>: " + tx("<code>L</code> NULL, hiçbir şey yapmadan döner.", "<code>L</code> is NULL; it returns without doing anything."));
          stack.pop(); return;
        }
        Tr.at("if", "<code>" + fnS + "(" + N[id].v + ")</code>: " + tx("<code>L</code> NULL değil.", "<code>L</code> is not NULL."));
        var vis = function () { cur = id; out += N[id].v; visited[id] = 1; Tr.print(N[id].v); Tr.at("pr", "<code>printf</code>: <b>" + N[id].v + tx("</b> yazıldı. Çıktı şimdi \"", "</b> is printed. The output is now \"") + out + "\"."); };
        var go = function (side) {
          cur = id;
          var c = N[id][side];
          Tr.at(side, EN ? "<code>" + fnS + "(" + nmS(c) + ")</code> is called for the " + (side === "l" ? "left" : "right") + " subtree."
            : (side === "l" ? "Sol" : "Sağ") + " alt ağaç için <code>" + fnS + "(" + nmS(c) + ")</code> çağrılır.");
          rec(c); cur = id;
        };
        if (mode === "onde") { vis(); go("l"); go("r"); }
        else if (mode === "ortada") { go("l"); vis(); go("r"); }
        else { go("l"); go("r"); vis(); }
        cur = id;
        Tr.at("end", tx(N[id].v + " için çağrı bitti; çağırana dönülür.", "The call for " + N[id].v + " is done; back to the caller."));
        stack.pop();
      }
      if (mode !== "duzey") {
        rec(T0.root); cur = null;
      } else {
        var MAX = 16;
        Tr.at("q0", tx("<code>on = arka = 0</code>; kuyruk boş.", "<code>front = rear = 0</code>; the queue is empty."));
        if (T0.root == null) { Tr.at("q1", tx("<code>L</code> NULL: ağaç boş, dönülür.", "<code>L</code> is NULL: the tree is empty; return.")); }
        else {
          cur = T0.root;
          Tr.at("q1", tx("<code>L</code> NULL değil.", "<code>L</code> is not NULL."));
          arka = (arka + 1) % MAX; kq[arka] = T0.root;
          Tr.at("q2", tx("Kök " + N[T0.root].v + " kuyruğa eklendi (<code>arka = " + arka + "</code>).", "The root " + N[T0.root].v + " is enqueued (<code>rear = " + arka + "</code>)."));
          while (true) {
            if (on === arka) { cur = null; Tr.at("q3", tx("<code>on == arka</code>: kuyruk boş, <code>kuyruk_al</code> NULL döndü; döngü biter.", "<code>front == rear</code>: the queue is empty, <code>dequeue</code> returned NULL; the loop ends.")); break; }
            on = (on + 1) % MAX; cur = kq[on];
            Tr.at("q3", tx("<code>kuyruk_al</code>: öndeki " + N[cur].v + " alındı (<code>on = " + on + "</code>).", "<code>dequeue</code>: the front node " + N[cur].v + " is removed (<code>front = " + on + "</code>)."));
            out += N[cur].v; visited[cur] = 1; Tr.print(N[cur].v);
            Tr.at("q4", "<b>" + N[cur].v + tx("</b> yazıldı. Çıktı \"", "</b> is printed. Output \"") + out + "\".");
            [["l", "q5", "q6", "sol", "left"], ["r", "q7", "q8", "sağ", "right"]].forEach(function (s) {
              var c = N[cur][s[0]];
              if (!c) { Tr.at(s[1], tx(N[cur].v + " düğümünün " + s[3] + " çocuğu yok.", N[cur].v + " has no " + s[4] + " child.")); return; }
              Tr.at(s[1], tx(N[cur].v + " düğümünün " + s[3] + " çocuğu " + N[c].v + ".", "The " + s[4] + " child of " + N[cur].v + " is " + N[c].v + "."));
              arka = (arka + 1) % MAX; kq[arka] = c;
              Tr.at(s[2], tx(N[c].v + " kuyruğun arkasına eklendi (<code>arka = " + arka + "</code>).", N[c].v + " is added at the rear of the queue (<code>rear = " + arka + "</code>)."));
            });
          }
        }
      }
      cur = null;
      Tr.at(null, tx("Gezinme bitti: <b>" + (out || "(boş)") + "</b>.", "Traversal done: <b>" + (out || "(empty)") + "</b>."));
      return out;
    }
  };

  /* ---------- 12: kılavuzlu ikili ağaç, kök ortada gezinme ---------- */
  models.thread = {
    label: tx("Girdi (düzey sırasıyla düğümler, boş için -)", "Input (nodes in level order, - for empty)"),
    fnEn: { kilavuz_kokortada_dolas: "tinorder", kokortada_ardil_bul: "insucc" },
    parse: function (text) { return levelTree(text, 13); },
    run: function (T0, mode, Tr) {
      var N = T0.N, ino = [], out = "", p = null, q = null, look = null;
      var hName = tx("başlık", "head");
      (function w(id) { if (id == null) return; w(N[id].l); ino.push(id); w(N[id].r); })(T0.root);
      var K = { H: { v: tx("baş", "head"), lc: T0.root == null ? "H" : T0.root, lt: T0.root == null, rc: "H", rt: false } };
      ino.forEach(function (id, i) {
        var n = N[id];
        K[id] = { v: n.v, lc: n.l != null ? n.l : (i ? ino[i - 1] : "H"), lt: n.l == null, rc: n.r != null ? n.r : (i < ino.length - 1 ? ino[i + 1] : "H"), rt: n.r == null };
      });
      function nm(id) { return id == null ? "–" : id === "H" ? hName : "→" + K[id].v; }
      Tr.varsFn = function () { return [["p", nm(p)], ["L", q == null ? "–" : nm(q)]]; };
      Tr.viewFn = function () {
        var hl = {}; Object.keys(K).forEach(function (k) { if (k !== "H" && out.indexOf(K[k].v) >= 0 && k !== p) hl[k] = "is-done"; });
        if (p != null && p !== "H") hl[p] = "is-look";
        var th = [];
        Object.keys(K).forEach(function (k) {
          if (k === "H") return;
          if (K[k].lt) th.push([k, K[k].lc, look === k + "l" ? "is-look" : ""]);
          if (K[k].rt) th.push([k, K[k].rc, look === k + "r" ? "is-look" : ""]);
        });
        var ptrs = {}; if (p != null && p !== "H") ptrs[p] = ["p"]; if (q != null && q !== "H" && q !== p) (ptrs[q] = ptrs[q] || []).push("L");
        return [{ t: "tree", root: treeOf(N, T0.root, hl), head: true, headHl: p === "H" ? "is-look" : "", threads: th, ptrs: ptrs, dy: 34, noDiff: true }];
      };
      Tr.fn("kilavuz_kokortada_dolas");
      Tr.at(null, tx("Kılavuzlu ağaç: boş sol bağ kök ortada öncülü, boş sağ bağ ardılı gösterir (kesikli oklar); uçtakiler başlık düğümünü gösterir. Gezinme yığınsız ve özyinelemesizdir.",
        "Threaded tree: an empty left link points to the inorder predecessor, an empty right link to the inorder successor (dashed arrows); the two outermost threads point to the head node. The traversal uses neither a stack nor recursion."));
      p = "H";
      Tr.at("t1", tx("<code>p = L</code>: gezinme başlık düğümünden başlar.", "<code>p = L</code>: the traversal starts at the head node."));
      var guard = 0;
      while (guard++ < 100) {
        Tr.fn("kilavuz_kokortada_dolas");
        Tr.at("t2", tx("<code>kokortada_ardil_bul(" + (p === "H" ? "başlık" : K[p].v) + ")</code> çağrılır.", "<code>insucc(" + (p === "H" ? "head" : K[p].v) + ")</code> is called."));
        Tr.fn("kokortada_ardil_bul");
        q = p; var L = p;
        p = K[L].rc; look = K[L].rt ? L + "r" : null;
        Tr.at("a1", tx("<code>p = L-&gt;sagCocuk</code> (" + nm(p) + ")" + (K[L].rt ? ": bu bir kılavuz." : ": gerçek sağ çocuk."), "<code>p = L-&gt;right_child</code> (" + nm(p) + ")" + (K[L].rt ? ": this is a thread." : ": a real right child.")));
        if (!K[L].rt) {
          Tr.at("a2", tx("<code>L-&gt;sagKilavuz</code> FALSE: sağ alt ağaç var; ardıl, onun en solundaki düğüm.", "<code>L-&gt;right_thread</code> is FALSE: there is a right subtree; the successor is its leftmost node."));
          while (!K[p].lt) {
            Tr.at("a3", tx("<code>p-&gt;solKilavuz</code> FALSE: " + (p === "H" ? "başlık" : K[p].v) + " düğümünün sol çocuğu var.", "<code>p-&gt;left_thread</code> is FALSE: " + (p === "H" ? "head" : K[p].v) + " has a left child."));
            p = K[p].lc;
            Tr.at("a4", tx("<code>p = p-&gt;solCocuk</code> (", "<code>p = p-&gt;left_child</code> (") + nm(p) + ").");
          }
          Tr.at("a3", tx("<code>p-&gt;solKilavuz</code> TRUE: daha sola inilemez.", "<code>p-&gt;left_thread</code> is TRUE: we cannot go further left."));
        } else Tr.at("a2", tx("<code>L-&gt;sagKilavuz</code> TRUE: sağ kılavuz doğrudan ardılı gösterir.", "<code>L-&gt;right_thread</code> is TRUE: the right thread points straight to the successor."));
        look = null;
        Tr.at("a5", tx("Ardıl " + nm(p) + " döner.", "The successor " + nm(p) + " is returned."));
        Tr.fn("kilavuz_kokortada_dolas"); q = null;
        if (p === "H") { Tr.at("t3", tx("<code>p == L</code>: başlığa dönüldü, gezinme biter.", "<code>p == L</code>: back at the head; the traversal ends.")); break; }
        Tr.at("t3", tx("<code>p</code> başlık değil.", "<code>p</code> is not the head."));
        out += K[p].v; Tr.print(K[p].v + " ");
        Tr.at("t4", "<b>" + K[p].v + tx("</b> yazıldı. Çıktı \"", "</b> is printed. Output \"") + out.split("").join(" ") + "\".");
      }
      p = null;
      Tr.at(null, tx("Kök ortada sıra: <b>" + (out.split("").join(" ") || "(boş)") + "</b>.", "Inorder: <b>" + (out.split("").join(" ") || "(empty)") + "</b>."));
      return out;
    }
  };

  /* ---------- 13: maksimum heap ---------- */
  models.heap = {
    label: tx("Girdi (sayı = ekle, al)", "Input (number = insert, pop)"),
    fnEn: { maksimum_yigin_ekle: "insert_max_heap", maksimum_yigin_al: "delete_max_heap" },
    parse: function (text) {
      var l = ops(text, "ekle", words({ al: { op: "al" }, ekle: { op: "ekle", arg: 1 } }, { pop: { op: "al" }, "delete": { op: "al" }, insert: { op: "ekle", arg: 1 } }), 0, 999, 30), n = 0;
      l.forEach(function (o) { n += o.op === "ekle" ? 1 : n ? -1 : 0; if (n > 15) fail(tx("heap'te en fazla 15 öğe çizilebilir", "at most 15 items can be drawn in the heap")); });
      return l;
    },
    run: function (list, mode, Tr) {
      var h = [null], n = 0, V = {}, hole = null, res = [];
      Tr.varsFn = function () { var v = [["n", String(n)]]; Object.keys(V).forEach(function (k) { v.push([k, V[k]]); }); return v; };
      Tr.viewFn = function (ex) {
        var hl = {};
        if (hole != null) hl[hole] = "is-look";
        if (ex.j != null) hl[ex.j] = "is-hot";
        function node(i) { if (i > n) return null; return { id: "h" + i, v: i === hole ? "" : h[i], l: node(2 * i), r: node(2 * i + 1), hl: hl[i] || "" }; }
        var cells = [], ah = {};
        for (var i = 1; i <= Math.max(n, 7); i++) { cells.push(i <= n ? (i === hole ? null : h[i]) : null); if (hl[i]) ah[i - 1] = hl[i]; }
        return [{ t: "tree", root: node(1), dy: 36 }, { t: "arr", name: tx("yigin", "heap"), cells: cells, hl: ah, base: 1, cw: 23 }];
      };
      var hp = tx("yigin", "heap"), dg = tx("deger", "temp");
      Tr.fn("maksimum_yigin_ekle");
      Tr.at(null, tx("Maksimum heap: her düğüm çocuklarından küçük değildir; <code>yigin[1]</code> kök, <code>yigin[i]</code>'nin çocukları <code>2i</code> ve <code>2i + 1</code>. Boş yuva sarı çerçeveyle gösterilir.",
        "Max heap: no node is smaller than its children; <code>heap[1]</code> is the root and the children of <code>heap[i]</code> are <code>2i</code> and <code>2i + 1</code>. The empty slot has a yellow frame."));
      list.forEach(function (o) {
        V = {}; hole = null;
        if (o.op === "ekle") {
          Tr.fn("maksimum_yigin_ekle");
          var item = o.x; V = { "item.x": String(item) };
          Tr.at("f", tx("<code>maksimum_yigin_ekle(" + item + ")</code>: heap dolu değil (<code>n = " + n + "</code>).", "<code>insert_max_heap(" + item + ")</code>: the heap is not full (<code>n = " + n + "</code>)."));
          var i = ++n; h[i] = null; hole = i; V.i = String(i);
          Tr.at("i", tx("<code>i = ++n = " + i + "</code>: en sona bir boş yuva açıldı.", "<code>i = ++n = " + i + "</code>: an empty slot is opened at the end."));
          while (true) {
            if (i === 1) { Tr.at("w", tx("<code>i == 1</code>: köke gelindi.", "<code>i == 1</code>: we have reached the root.")); break; }
            Tr.at("w", tx("<code>i = " + i + "</code>, ebeveyn <code>i / 2 = ", "<code>i = " + i + "</code>, parent <code>i / 2 = ") + Math.floor(i / 2) + "</code>.");
            var pi = Math.floor(i / 2);
            if (item <= h[pi]) { Tr.at("c", item + " ≤ " + h[pi] + tx(": ebeveyn büyük ya da eşit, yer bulundu.", ": the parent is greater or equal; the place is found."), { j: pi }); break; }
            Tr.at("c", item + " &gt; " + h[pi] + tx(": ebeveyn aşağı inmeli.", ": the parent must move down."), { j: pi });
            h[i] = h[pi]; hole = pi;
            Tr.at("mv", "<code>" + hp + "[" + i + "] = " + hp + "[" + pi + "]</code>: " + h[i] + tx(" aşağı kaydı; boş yuva yukarı çıktı.", " moves down; the empty slot moves up."));
            i = pi; V.i = String(i);
            Tr.at("up", "<code>i /= 2</code>: <code>i = " + i + "</code>.");
          }
          h[i] = item; hole = null;
          Tr.at("put", "<code>" + hp + "[" + i + "] = item</code>: " + item + tx(" yerine yerleşti.", " settles in its place."), { j: i });
          Tr.print(tx("ekle(", "insert(") + item + ")\n");
          res.push("ekle " + item + ":" + h.slice(1, n + 1).map(function (q) { return " " + q; }).join(""));
        } else {
          Tr.fn("maksimum_yigin_al");
          if (!n) {
            Tr.at("e", tx("<code>maksimum_yigin_al</code>: <code>n == 0</code>, heap boş; <code>false</code> döner.", "<code>delete_max_heap</code>: <code>n == 0</code>, the heap is empty; <code>false</code> is returned."));
            Tr.print(tx("al → false\n", "pop → false\n")); res.push("al false");
            return;
          }
          Tr.at("e", tx("<code>maksimum_yigin_al</code>: heap boş değil (<code>n = " + n + "</code>).", "<code>delete_max_heap</code>: the heap is not empty (<code>n = " + n + "</code>)."));
          var cik = h[1]; V = {}; V[tx("*cikan", "*out")] = String(cik);
          Tr.at("r", tx("<code>*cikan = yigin[1] = " + cik + "</code>: en büyük öğe kökte.", "<code>*out = heap[1] = " + cik + "</code>: the largest item is at the root."), { j: 1 });
          var deger = h[n]; h[n] = null; n--; hole = n >= 1 ? 1 : null; V[dg + ".x"] = String(deger);
          Tr.at("d", tx("<code>deger = yigin[n--] = " + deger + "</code>: son öğe yerinden alındı, <code>n = " + n + "</code>; kökteki yuva boş.", "<code>temp = heap[n--] = " + deger + "</code>: the last item is taken out, <code>n = " + n + "</code>; the root slot is empty."));
          var ii = 1, j = 2; V.i = "1"; V.j = "2";
          Tr.at("ij", tx("<code>i = 1, j = 2</code>: boş yuva kökten aşağı ilerleyecek.", "<code>i = 1, j = 2</code>: the empty slot will move down from the root."));
          while (true) {
            if (j > n) { Tr.at("w", "<code>j = " + j + "</code> &gt; <code>n</code>" + tx(": yuvanın çocuğu yok.", ": the slot has no child.")); break; }
            Tr.at("w", "<code>j = " + j + "</code> ≤ <code>n</code>" + tx(": sol çocuk ", ": left child ") + h[j] + ".", { j: j });
            if (j < n && h[j] < h[j + 1]) { j++; V.j = String(j); Tr.at("big", tx("Sağ çocuk " + h[j] + " daha büyük: <code>j = ", "The right child " + h[j] + " is larger: <code>j = ") + j + "</code>.", { j: j }); }
            else Tr.at("big", (j < n ? tx("Sol çocuk " + h[j] + " büyük ya da eşit", "The left child " + h[j] + " is greater or equal") : tx("Sağ çocuk yok", "There is no right child")) + ": <code>j = " + j + "</code>.", { j: j });
            if (deger >= h[j]) { Tr.at("c", deger + " ≥ " + h[j] + ": " + dg + tx(" buraya sığar.", " fits here."), { j: j }); break; }
            Tr.at("c", deger + " &lt; " + h[j] + tx(": büyük çocuk yukarı çıkmalı.", ": the larger child must move up."), { j: j });
            h[ii] = h[j]; hole = j;
            Tr.at("mv", "<code>" + hp + "[" + ii + "] = " + hp + "[" + j + "]</code>: " + h[ii] + tx(" yukarı çıktı; boş yuva aşağı indi.", " moves up; the empty slot moves down."));
            ii = j; j *= 2; V.i = String(ii); V.j = String(j);
            Tr.at("nx", "<code>i = " + ii + "</code>, <code>j = " + j + "</code>.");
          }
          if (n >= 1) { h[ii] = deger; hole = null; Tr.at("put", "<code>" + hp + "[" + ii + "] = " + dg + "</code>: " + deger + tx(" yerleşti.", " settles in place."), { j: ii }); }
          else { hole = null; Tr.at("put", tx("Heap boşaldı; <code>yigin[1] = deger</code> yazılır ama <code>n = 0</code> olduğundan öğe sayılmaz.", "The heap is now empty; <code>heap[1] = temp</code> is written, but since <code>n = 0</code> the item does not count.")); }
          Tr.print(tx("al → ", "pop → ") + cik + "\n");
          Tr.at("ret", tx("<code>true</code> döner; çıkan " + cik + ".", "<code>true</code> is returned; the popped item is " + cik + "."));
          res.push("al " + cik + ":" + h.slice(1, n + 1).map(function (q) { return " " + q; }).join(""));
        }
      });
      V = {}; hole = null;
      Tr.at(null, tx("İşlemler bitti. Heap dizisi: " + (h.slice(1, n + 1).join(", ") || "boş") + ".", "All operations done. The heap array: " + (h.slice(1, n + 1).join(", ") || "empty") + "."));
      return res.join("\n");
    }
  };

  /* ---------- 14: açık adresleme (doğrusal yoklama) ---------- */
  models.hash = {
    label: tx("Girdi (sayı = ekle, ara 24, sil 13)", "Input (number = insert, find 24, delete 13)"),
    fnEn: { ekle: "insert", ara: "search", sil: "erase" },
    parse: function (text) {
      return ops(text, "ekle", words({ ara: { op: "ara", arg: 1 }, sil: { op: "sil", arg: 1 }, ekle: { op: "ekle", arg: 1 } },
        { find: { op: "ara", arg: 1 }, search: { op: "ara", arg: 1 }, "delete": { op: "sil", arg: 1 }, erase: { op: "sil", arg: 1 }, insert: { op: "ekle", arg: 1 } }), 0, 999, 24);
    },
    run: function (list, mode, Tr) {
      var M = 11, key = [], st = [], V = {}, look = null, ev = null, res = [], cnt = 0;
      for (var i = 0; i < M; i++) { key.push(0); st.push(0); }
      Tr.varsFn = function () { var v = [["n", String(cnt)]]; Object.keys(V).forEach(function (k) { v.push([k, V[k]]); }); return v; };
      Tr.viewFn = function (ex) {
        var hl = {}; if (look != null) hl[look] = ex.ok ? "is-done" : ex.bad ? "is-bad" : "is-look";
        var ptr = []; if (look != null) ptr.push(["i", look]); if (ev != null && ev !== look) ptr.push(["ev", ev]);
        var ptr2 = []; ptr.forEach(function (q) { ptr2.push([q[0] === "ev" ? tx("ev", "home") : q[0], q[1]]); });
        return [{ t: "arr", name: tx("tablo", "table"), cells: key.map(function (k, i) { return st[i] === 1 ? k : st[i] === 2 ? "✝" : null; }), hl: hl, ptr: ptr2, cw: 30 }];
      };
      Tr.fn("ekle");
      Tr.at(null, tx("<code>M = 11</code>, <code>h(k) = k % 11</code>. Dolu yuvada sıradaki yuvaya bakılır (doğrusal yoklama). ✝ silindi işaretidir: arama orada durmaz, ekleme o yuvayı kullanabilir.",
        "<code>M = 11</code>, <code>h(k) = k % 11</code>. If a slot is occupied, the next slot is tried (linear probing). ✝ is a tombstone (deleted mark): a search does not stop there, but an insertion may reuse the slot."));
      function ara(k, from) {
        Tr.fn("ara");
        var i = k % M; ev = i; look = i; V = { k: String(k), i: String(i) };
        Tr.at("h", EN ? (from ? "<code>search(" + k + ")</code>: " : "<code>search(" + k + ")</code> is called. ") + "Home address <code>i = " + k + " % 11 = " + i + "</code>."
          : (from ? "<code>ara(" + k + ")</code>: " : "<code>ara(" + k + ")</code> çağrıldı. ") + "Ev adresi <code>i = " + k + " % 11 = " + i + "</code>.");
        for (var d = 0; d < M; d++, i = (i + 1) % M) {
          look = i; V.d = String(d); V.i = String(i);
          Tr.at("for", tx("<code>d = " + d + "</code>: yuva " + i + " yoklanıyor.", "<code>d = " + d + "</code>: probing slot " + i + "."));
          if (st[i] === 0) { Tr.at("bos", tx("Yuva " + i + " BOS: " + k + " olsaydı en geç burada olurdu; −1 döner (" + (d + 1) + " yoklama).", "Slot " + i + " is EMPTY: had " + k + " been inserted, it would be here at the latest; −1 is returned (" + pl(d + 1, "probe", "probes") + ")."), { bad: 1 }); return -1; }
          Tr.at("bos", tx("Yuva " + i + " boş değil" + (st[i] === 2 ? " (silindi işareti); aramaya devam." : "."), "Slot " + i + " is not empty" + (st[i] === 2 ? " (a tombstone); the search goes on." : ".")));
          if (st[i] === 1 && key[i] === k) { Tr.at("eq", tx("Yuva " + i + " DOLU ve anahtar " + k + ": " + i + " döner (" + (d + 1) + " yoklama).", "Slot " + i + " is USED and holds key " + k + ": " + i + " is returned (" + pl(d + 1, "probe", "probes") + ")."), { ok: 1 }); return i; }
          Tr.at("eq", st[i] === 1 ? tx("Başka anahtar (" + key[i] + "): sıradaki yuvaya geçilir.", "A different key (" + key[i] + "): move to the next slot.") : tx("Silinmiş yuva: sıradaki yuvaya geçilir.", "A deleted slot: move to the next slot."));
        }
        look = null;
        Tr.at("nf", tx("Tablonun tamamı yoklandı, " + k + " yok: −1 döner.", "The whole table was probed and " + k + " is absent: −1 is returned."));
        return -1;
      }
      list.forEach(function (o) {
        var k = o.x; V = {}; look = null; ev = null;
        if (o.op === "ekle") {
          Tr.fn("ekle");
          var i = k % M; ev = i; look = i; V = { k: String(k), i: String(i) };
          Tr.at("h", tx("<code>ekle(" + k + ")</code>: ev adresi <code>i = ", "<code>insert(" + k + ")</code>: home address <code>i = ") + k + " % 11 = " + i + "</code>.");
          var put = -1;
          for (var d = 0; d < M; d++, i = (i + 1) % M) {
            look = i; V.d = String(d); V.i = String(i);
            Tr.at("for", tx("<code>d = " + d + "</code>: yuva " + i + " yoklanıyor.", "<code>d = " + d + "</code>: probing slot " + i + "."));
            if (st[i] !== 1) {
              Tr.at("if", tx("Yuva " + i + " " + (st[i] === 0 ? "BOS" : "SILINDI") + ": buraya yazılabilir.", "Slot " + i + " is " + (st[i] === 0 ? "EMPTY" : "DELETED") + ": the key can be written here."));
              key[i] = k;
              Tr.at("k", tx("<code>tablo[" + i + "].anahtar = ", "<code>table[" + i + "].key = ") + k + "</code>.");
              st[i] = 1; cnt++;
              Tr.at("s", tx("<code>tablo[" + i + "].durum = DOLU</code>.", "<code>table[" + i + "].state = USED</code>."), { ok: 1 });
              put = i;
              Tr.print(tx("ekle(", "insert(") + k + ") → " + i + "\n");
              Tr.at("ret", tx(i + " döner: " + (d + 1) + " yoklama" + (d ? "; ev adresinden " + d + " yuva uzağa düştü." : "."), i + " is returned: " + pl(d + 1, "probe", "probes") + (d ? "; the key landed " + pl(d, "slot", "slots") + " away from its home address." : ".")), { ok: 1 });
              break;
            }
            Tr.at("if", tx("Yuva " + i + " DOLU (" + key[i] + "): sıradaki yuvaya geçilir.", "Slot " + i + " is USED (" + key[i] + "): move to the next slot."), { bad: 1 });
          }
          if (put < 0) { look = null; Tr.print(tx("ekle(", "insert(") + k + ") → -1\n"); Tr.at("full", tx("Tablo dolu: −1 döner.", "The table is full: −1 is returned.")); }
          res.push("ekle " + k + " " + put);
        } else if (o.op === "ara") {
          var r = ara(k, false);
          Tr.print(tx("ara(", "find(") + k + ") → " + r + "\n");
          res.push("ara " + k + " " + r);
        } else {
          Tr.fn("sil");
          V = { k: String(k) };
          Tr.at("a", tx("<code>sil(" + k + ")</code>: önce <code>ara(" + k + ")</code> ile yeri bulunur.", "<code>erase(" + k + ")</code>: first <code>search(" + k + ")</code> finds its slot."));
          var j = ara(k, true);
          Tr.fn("sil"); V = { k: String(k), i: String(j) };
          if (j < 0) { look = null; Tr.at("n", tx("<code>i &lt; 0</code>: " + k + " yok, <code>false</code> döner.", "<code>i &lt; 0</code>: " + k + " is absent; <code>false</code> is returned.")); Tr.print(tx("sil(", "delete(") + k + ") → false\n"); res.push("sil " + k + " false"); return; }
          Tr.at("n", tx("<code>ara</code> " + j + " döndürdü: silinecek öğe var.", "<code>search</code> returned " + j + ": there is an item to delete."));
          st[j] = 2; cnt--;
          Tr.at("x", tx("<code>tablo[" + j + "].durum = SILINDI</code>: yuva boşaltılmaz, ✝ ile işaretlenir; böylece arkasındaki anahtarların araması kopmaz.", "<code>table[" + j + "].state = DELETED</code>: the slot is not emptied but marked with ✝, so searches for the keys beyond it are not cut short."));
          Tr.print(tx("sil(", "delete(") + k + ") → true\n");
          Tr.at("ret", tx("<code>true</code> döner.", "<code>true</code> is returned."));
          res.push("sil " + k + " true");
        }
      });
      V = {}; look = null; ev = null;
      Tr.at(null, tx("İşlemler bitti: tabloda " + cnt + " anahtar, yük faktörü α = " + cnt + "/11.", "All operations done: the table holds " + pl(cnt, "key", "keys") + ", load factor α = " + cnt + "/11."));
      res.push("tablo " + key.map(function (k, i) { return st[i] === 1 ? k : st[i] === 2 ? "S" : "-"; }).join(" "));
      return res.join("\n");
    }
  };

  /* ---------- 15: DFS / BFS ---------- */
  models.graph = {
    label: tx("Girdi (yönsüz kenarlar, ör. 0-1, 0-2)", "Input (undirected edges, e.g. 0-1, 0-2)"),
    parse: function (text) { return edges(text, 10, false, false); },
    run: function (G, mode, Tr) {
      var n = G.n, adj = [], ug = [], out = [], cur = null, wv = null, calls = [], tree = {}, kq = [], kon = 0, res;
      var nUg = tx("ugranildi", "visited");
      for (var i = 0; i < n; i++) { adj.push([]); ug.push(false); }
      G.E.forEach(function (e) { adj[e.u].push(e.v); adj[e.v].push(e.u); });
      adj.forEach(function (a) { a.sort(function (x, y) { return x - y; }); });
      mode = mode || "dfs";
      Tr.varsFn = function () {
        var v = [["v", cur == null ? "–" : String(cur)], ["w", wv == null ? "NULL" : "→" + wv]];
        if (mode === "dfs") v.push([tx("çağrılar", "calls"), calls.length ? calls.map(function (c) { return "dfs(" + c + ")"; }).join(" › ") : "–"]);
        else v.push([tx("kuyruk", "queue"), "[" + kq.slice(kon).join(", ") + "]"]);
        return v;
      };
      Tr.viewFn = function () {
        var hl = {}; ug.forEach(function (u, i) { if (u) hl[i] = "is-done"; });
        if (wv != null) hl[wv] = ug[wv] ? "is-done" : "is-hot";
        if (cur != null) hl[cur] = "is-look";
        var ed = G.E.map(function (e) {
          var k1 = e.u + "-" + e.v, k2 = e.v + "-" + e.u, h = tree[k1] || tree[k2] ? "is-done" : "";
          if (cur != null && wv != null && ((e.u === cur && e.v === wv) || (e.v === cur && e.u === wv))) h = "is-hot";
          return { u: e.u, v: e.v, hl: h };
        });
        var parts = [{ t: "graph", n: n, edges: ed, hl: hl }];
        parts.push({ t: "arr", name: nUg, cells: ug.map(function (u) { return u ? "T" : "F"; }), cw: 24, hl: (function () { var h = {}; ug.forEach(function (u, i) { if (u) h[i] = "is-done"; }); return h; })() });
        if (mode === "bfs") { var c = kq.slice(kon); while (c.length < 4) c.push(null); parts.push({ t: "arr", name: tx("kuyruk", "queue"), cells: c, noIdx: true, cw: 24, ptr: kq.length > kon ? [[tx("on", "front"), 0]] : [] }); }
        return parts;
      };
      var lists = adj.map(function (a, i) { return i + ": " + (a.join(" ") || "–"); }).join("; ");
      Tr.fn(mode);
      Tr.at(null, tx("Komşuluk listeleri (artan sırayla): " + lists + ". Gezinme 0 düğümünden başlar.", "Adjacency lists (in increasing order): " + lists + ". The traversal starts at vertex 0."));
      if (mode === "dfs") {
        (function dfs(v) {
          calls.push(v); cur = v; wv = null;
          ug[v] = true;
          Tr.at("m", "<code>dfs(" + v + ")</code>: <code>" + nUg + "[" + v + "] = TRUE</code>.");
          out.push(v); Tr.print(v + " ");
          Tr.at("p", "<b>" + v + tx("</b> yazıldı.", "</b> is printed."));
          for (var k = 0; k <= adj[v].length; k++) {
            cur = v; wv = k < adj[v].length ? adj[v][k] : null;
            if (wv == null) { Tr.at("for", tx(v + " düğümünün listesi bitti (<code>w == NULL</code>).", "The list of vertex " + v + " is exhausted (<code>w == NULL</code>).")); break; }
            Tr.at("for", tx("<code>w</code>: " + v + " düğümünün listesinde sıradaki komşu " + wv + ".", "<code>w</code>: the next neighbour in the list of vertex " + v + " is " + wv + "."));
            if (ug[wv]) { Tr.at("if", "<code>" + nUg + "[" + wv + "]</code>" + tx(" TRUE: atlanır.", " is TRUE: skipped.")); continue; }
            Tr.at("if", tx(wv + " ziyaret edilmemiş.", wv + " has not been visited."));
            tree[v + "-" + wv] = 1;
            Tr.at("call", tx("<code>dfs(" + wv + ")</code> çağrılır; " + v + " burada bekler.", "<code>dfs(" + wv + ")</code> is called; " + v + " waits here."));
            var w0 = wv; dfs(wv); cur = v; wv = w0;
            Tr.at("call", tx("<code>dfs(" + w0 + ")</code> döndü; " + v + " düğümünün listesine devam.", "<code>dfs(" + w0 + ")</code> returned; continue with the list of vertex " + v + "."));
          }
          wv = null; calls.pop(); cur = calls.length ? calls[calls.length - 1] : null;
        })(0);
      } else {
        var v = 0; cur = null;
        Tr.at("b0", tx("<code>on = arka = NULL</code>: kuyruk boş.", "<code>front = rear = NULL</code>: the queue is empty."));
        cur = v; ug[v] = true; out.push(v); Tr.print(v + " ");
        Tr.at("b1", "<b>" + v + tx("</b> yazıldı ve işaretlendi.", "</b> is printed and marked."));
        kq.push(v);
        Tr.at("b2", tx(v + " kuyruğa eklendi.", v + " is added to the queue."));
        while (true) {
          wv = null;
          if (kon >= kq.length) { cur = null; Tr.at("w", tx("Kuyruk boş: gezinme biter.", "The queue is empty: the traversal ends.")); break; }
          Tr.at("w", tx("Kuyruk boş değil.", "The queue is not empty."));
          cur = kq[kon++];
          Tr.at("al", tx("<code>v = kuyruk_al(…)</code>: öndeki " + cur + " alındı; listesi taranacak.", "<code>v = deleteq(…)</code>: the front vertex " + cur + " is removed; its list will be scanned."));
          for (var k = 0; k <= adj[cur].length; k++) {
            wv = k < adj[cur].length ? adj[cur][k] : null;
            if (wv == null) { Tr.at("for", tx(cur + " düğümünün listesi bitti.", "The list of vertex " + cur + " is exhausted.")); break; }
            Tr.at("for", tx("<code>w</code>: " + cur + " düğümünün komşusu " + wv + ".", "<code>w</code>: a neighbour of vertex " + cur + " is " + wv + "."));
            if (ug[wv]) { Tr.at("if", "<code>" + nUg + "[" + wv + "]</code>" + tx(" TRUE: atlanır.", " is TRUE: skipped.")); continue; }
            Tr.at("if", tx(wv + " ziyaret edilmemiş.", wv + " has not been visited."));
            tree[cur + "-" + wv] = 1; out.push(wv); Tr.print(wv + " ");
            Tr.at("p", "<b>" + wv + tx("</b> yazıldı.", "</b> is printed."));
            kq.push(wv);
            Tr.at("e", tx(wv + " kuyruğun arkasına eklendi.", wv + " is added at the rear of the queue."));
            ug[wv] = true;
            Tr.at("m", "<code>" + nUg + "[" + wv + "] = TRUE</code>.");
          }
        }
      }
      cur = null; wv = null;
      var miss = []; ug.forEach(function (u, i) { if (!u) miss.push(i); });
      Tr.at(null, tx("Ziyaret sırası: <b>" + out.join(" ") + "</b>." + (miss.length ? " 0'dan ulaşılamayan düğümler: " + miss.join(", ") + " (başka bileşen)." : " Yeşil kenarlar " + (mode === "dfs" ? "derinlik" : "genişlik") + " öncelikli kapsayan ağacı oluşturur."),
        "Visit order: <b>" + out.join(" ") + "</b>." + (miss.length ? " Vertices unreachable from 0: " + miss.join(", ") + " (another component)." : " The green edges form the " + (mode === "dfs" ? "depth" : "breadth") + "-first spanning tree.")));
      res = out.join(" ");
      return res;
    }
  };

  /* ---------- 16: union-find ile bileşen sayma ---------- */
  models.uf = {
    label: tx("Girdi (n=6, kenarlar 0-1, 2-3)", "Input (n=6, edges 0-1, 2-3)"),
    fnEn: { bilesen_say: "components", Kume_Bul_2: "find2", Birlesim_2: "union2" },
    parse: function (text) {
      var t = tokens(text), n = null;
      if (t.length && /^n\s*=/.test(t[0])) { n = int(t[0].replace(/^n\s*=\s*/, ""), 1, 10); t.shift(); }
      var G = t.length ? edges(t.join(","), 10, false, true) : { n: 0, E: [] };
      if (n == null) n = Math.max(G.n, 1);
      if (G.n > n) fail(tx("kenarlardaki düğüm numarası n'den küçük olmalı", "the vertex numbers in the edges must be smaller than n"));
      return { n: n, E: G.E };
    },
    run: function (G, mode, Tr) {
      var n = G.n, ata = [], sayi = n, V = {}, hl = {}, res = [];
      var A = tx("ata", "parent"), nS = tx("sayi", "count"), fF = tx("Kume_Bul_2", "find2"), fU = tx("Birlesim_2", "union2");
      for (var i = 0; i < n; i++) ata.push(null);
      Tr.varsFn = function () { var v = [[nS, String(sayi)]]; Object.keys(V).forEach(function (k) { v.push([k, V[k]]); }); return v; };
      Tr.viewFn = function () {
        if (ata[0] === null) return [{ t: "arr", name: A, cells: ata.slice(), cw: 30 }];
        return [{ t: "forest", ata: ata.slice(), hl: Object.assign({}, hl) }, { t: "arr", name: A, cells: ata.slice(), cw: 30, hl: Object.assign({}, hl) }];
      };
      Tr.fn("bilesen_say");
      Tr.at(null, tx("<code>bilesen_say(" + n + ", " + G.E.length + ", u, v)</code>: kenarlar " + (G.E.map(function (e) { return "(" + e.u + "," + e.v + ")"; }).join(", ") || "yok") + ". Her kenarın iki ucu aynı kümede değilse kümeler birleştirilir.",
        "<code>components(" + n + ", " + G.E.length + ", u, v)</code>: edges " + (G.E.map(function (e) { return "(" + e.u + "," + e.v + ")"; }).join(", ") || "none") + ". If the two ends of an edge are in different sets, the sets are merged."));
      for (i = 0; i < n; i++) ata[i] = -1;
      Tr.at("init", tx("Her düğüm ayrı bir küme: <code>ata[i] = -1</code> (kökte −düğüm sayısı tutulur).", "Every vertex is a set of its own: <code>parent[i] = -1</code> (a root stores −(number of nodes))."));
      Tr.at("s", "<code>" + nS + " = " + n + "</code>.");
      function find(x) {
        Tr.fn("Kume_Bul_2");
        var r = x; V.i = String(x); hl = {}; hl[x] = "is-look";
        while (ata[r] >= 0) { Tr.at("f", "<code>" + A + "[" + r + "] = " + ata[r] + "</code> ≥ 0: " + tx(r + " kök değil, ebeveyni " + ata[r] + ".", r + " is not a root; its parent is " + ata[r] + ".")); r = ata[r]; hl[r] = "is-look"; }
        V.r = String(r);
        Tr.at("f", "<code>" + A + "[" + r + "] = " + ata[r] + "</code> &lt; 0: " + tx("kök ", "the root is ") + r + ".");
        while (x !== r) {
          Tr.at("w", "<code>i = " + x + "</code> ≠ <code>r</code>" + tx(": yol azaltılacak.", ": the path will be collapsed."));
          var s = ata[x]; V.s = String(s);
          Tr.at("s", "<code>s = " + A + "[" + x + "] = " + s + "</code>.");
          ata[x] = r;
          Tr.at("set", "<code>" + A + "[" + x + "] = " + r + "</code>: " + tx(x + " doğrudan köke bağlandı.", x + " is linked directly to the root."));
          x = s; V.i = String(x);
          Tr.at("i", "<code>i = " + x + "</code>.");
        }
        Tr.at("w", "<code>i == r</code>" + tx(": yol bitti.", ": the path is done."));
        Tr.at("ret", tx("Kök " + r + " döner.", "The root " + r + " is returned."));
        delete V.i; delete V.r; delete V.s;
        return r;
      }
      for (var e = 0; e < G.E.length; e++) {
        Tr.fn("bilesen_say"); V = { e: String(e) }; hl = {};
        Tr.at("for", "<code>e = " + e + "</code>: " + tx("kenar (", "edge (") + G.E[e].u + ", " + G.E[e].v + ").");
        Tr.at("a", "<code>a = " + fF + "(" + G.E[e].u + ")</code>" + tx(" çağrılır.", " is called."));
        var a = find(G.E[e].u);
        Tr.fn("bilesen_say"); V.a = String(a);
        Tr.at("b", "<code>a = " + a + "</code>; <code>b = " + fF + "(" + G.E[e].v + ")</code>" + tx(" çağrılır.", " is called."));
        var b = find(G.E[e].v);
        Tr.fn("bilesen_say"); V.b = String(b); hl = {}; hl[a] = "is-look"; hl[b] = "is-look";
        if (a === b) { Tr.at("if", "<code>a == b</code> (" + a + ")" + tx(": iki uç zaten aynı kümede, birleştirme yok.", ": both ends are already in the same set; no union.")); continue; }
        Tr.at("if", "<code>a = " + a + "</code>, <code>b = " + b + "</code>" + tx(": farklı kümeler.", ": different sets."));
        Tr.at("u", "<code>" + fU + "(" + a + ", " + b + ")</code>" + tx(" çağrılır.", " is called."));
        Tr.fn("Birlesim_2");
        var p = ata[a] + ata[b]; V.p = String(p);
        Tr.at("p", "<code>p = " + A + "[" + a + "] + " + A + "[" + b + "] = " + ata[a] + " + " + ata[b] + " = " + p + "</code>" + tx(": birleşik kümenin −düğüm sayısı.", ": −(number of nodes) of the merged set."));
        if (ata[a] > ata[b]) {
          Tr.at("if", "<code>" + A + "[" + a + "] &gt; " + A + "[" + b + "]</code>: " + tx(a + " kümesinde daha az düğüm var; " + a + " kökü " + b + " kökünün altına bağlanır.", "set " + a + " has fewer nodes; root " + a + " is linked under root " + b + "."));
          ata[a] = b; Tr.at("i1", "<code>" + A + "[" + a + "] = " + b + "</code>.");
          ata[b] = p; Tr.at("j1", "<code>" + A + "[" + b + "] = " + p + "</code>.");
        } else {
          Tr.at("if", "<code>" + A + "[" + a + "] ≤ " + A + "[" + b + "]</code>: " + tx(b + " kümesinde daha az ya da eşit düğüm var; " + b + " kökü " + a + " kökünün altına bağlanır.", "set " + b + " has no more nodes than set " + a + "; root " + b + " is linked under root " + a + "."));
          ata[b] = a; Tr.at("i2", "<code>" + A + "[" + b + "] = " + a + "</code>.");
          ata[a] = p; Tr.at("j2", "<code>" + A + "[" + a + "] = " + p + "</code>.");
        }
        Tr.fn("bilesen_say"); delete V.p;
        sayi--;
        Tr.at("dec", tx("<code>sayi--</code>: " + sayi + " bileşen kaldı.", "<code>count--</code>: " + pl(sayi, "component remains.", "components remain.")));
      }
      Tr.fn("bilesen_say"); V = {}; hl = {};
      Tr.print(tx("bilesen sayisi = ", "components = ") + sayi + "\n");
      Tr.at("ret", tx("Bileşen sayısı <b>" + sayi + "</b> döner.", "The number of components, <b>" + sayi + "</b>, is returned."));
      res.push("sayi " + sayi, "ata " + ata.join(" "));
      return res.join("\n");
    }
  };

  /* ---------- 17: Kruskal ve Prim ---------- */
  models.mst = {
    label: tx("Girdi (ağırlıklı kenarlar, ör. 0-1:28)", "Input (weighted edges, e.g. 0-1:28)"),
    parse: function (text) { var G = edges(text, 8, true, false); if (G.n < 2) fail(tx("en az iki düğüm gerekir", "at least two vertices are needed")); return G; },
    run: function (G, mode, Tr) {
      var n = G.n, E = G.E.map(function (e, i) { return { u: e.u, v: e.v, w: e.w, i: i }; }), state = {}, look = null, toplam = 0, V = {}, res = [], ata = [];
      var nodeHl = {}, lab = {};
      var A = tx("ata", "parent"), nEn = tx("enaz", "lowcost"), nYk = tx("yakin", "closest"), nSc = tx("secildi", "in_tree"), nEy = tx("en_yakin", "cheapest");
      Tr.varsFn = function () { var v = [[tx("toplam", "total"), String(toplam)]]; Object.keys(V).forEach(function (k) { v.push([k, V[k]]); }); return v; };
      Tr.viewFn = function () {
        var ed = E.map(function (e) { return { u: e.u, v: e.v, w: e.w, hl: look === e.i ? "is-hot" : state[e.i] || "" }; });
        var parts = [{ t: "graph", n: n, edges: ed, hl: Object.assign({}, nodeHl), lab: Object.assign({}, lab) }];
        if (mode !== "prim") parts.push({ t: "arr", name: A, cells: ata.slice(), cw: 28 });
        return parts;
      };
      if (mode !== "prim") {
        Tr.fn("kruskal");
        for (var i = 0; i < n; i++) ata.push(null);
        Tr.at(null, tx("Kruskal: kenarlar küçükten büyüğe denenir; uçları farklı kümedeyse ağaca alınır, aynı kümedeyse döngü oluşturacağı için bırakılır. Kümeler union-find ile tutulur.",
          "Kruskal: the edges are tried from lightest to heaviest; an edge whose ends are in different sets joins the tree, one whose ends are in the same set is skipped because it would form a cycle. The sets are kept with union-find."));
        for (i = 0; i < n; i++) ata[i] = -1;
        Tr.at("init", tx("<code>ata[i] = -1</code>: her düğüm ayrı küme.", "<code>parent[i] = -1</code>: every vertex is a set of its own."));
        var k = E.slice().sort(function (a, b) { return a.w - b.w || a.i - b.i; });
        Tr.at("sort", tx("Kenarlar ağırlığa göre sıralandı: " + k.map(function (e) { return "(" + e.u + "," + e.v + ")" + e.w; }).join(" ") + ". Eşit ağırlıklarda giriş sırası korunur.",
          "The edges are sorted by weight: " + k.map(function (e) { return "(" + e.u + "," + e.v + ")" + e.w; }).join(" ") + ". Equal weights keep their input order."));
        var find = function (x) { while (ata[x] >= 0) x = ata[x]; return x; };
        var t = 0;
        for (i = 0; ; i++) {
          look = null; V = { i: String(i), t: String(t) };
          if (!(i < k.length && t < n - 1)) { Tr.at("for", t >= n - 1 ? tx("<code>t = " + t + " = n − 1</code>: ağaç tamamlandı, döngü biter.", "<code>t = " + t + " = n − 1</code>: the tree is complete; the loop ends.") : tx("Kenarlar bitti (<code>i = e</code>).", "No edges are left (<code>i = e</code>).")); break; }
          var c = k[i]; look = c.i;
          Tr.at("for", tx("<code>k[" + i + "]</code> = (" + c.u + ", " + c.v + "), ağırlık " + c.w + ".", "<code>edges[" + i + "]</code> = (" + c.u + ", " + c.v + "), weight " + c.w + "."));
          var a = find(c.u); V.a = String(a);
          Tr.at("a", tx("<code>kume_bul(" + c.u + ") = ", "<code>find(parent, " + c.u + ") = ") + a + "</code>.");
          var b = find(c.v); V.b = String(b);
          Tr.at("b", tx("<code>kume_bul(" + c.v + ") = ", "<code>find(parent, " + c.v + ") = ") + b + "</code>.");
          if (a === b) { state[c.i] = "is-dim"; Tr.at("if", tx("<code>a == b</code>: iki uç aynı kümede; kenar döngü oluşturur, bırakılır.", "<code>a == b</code>: both ends are in the same set; the edge would form a cycle and is skipped.")); continue; }
          Tr.at("if", tx("<code>a ≠ b</code>: döngü yok.", "<code>a ≠ b</code>: no cycle."));
          state[c.i] = "is-done"; t++; toplam += c.w; V.t = String(t);
          Tr.at("take", tx("<code>T[" + (t - 1) + "] = k[" + i + "]</code>: (" + c.u + ", " + c.v + ") ağaca eklendi; toplam " + toplam + ".", "<code>T[" + (t - 1) + "] = edges[" + i + "]</code>: (" + c.u + ", " + c.v + ") joins the tree; total " + toplam + "."));
          res.push(c.u + "-" + c.v + ":" + c.w);
          if (ata[a] <= ata[b]) { ata[a] += ata[b]; ata[b] = a; } else { ata[b] += ata[a]; ata[a] = b; }
          Tr.at("un", tx("<code>birlestir(ata, " + a + ", " + b + ")</code>: küçük kümenin kökü büyük kümenin köküne bağlandı.", "<code>unite(parent, " + a + ", " + b + ")</code>: the root of the smaller set is linked to the root of the larger one."));
        }
        look = null;
        if (t < n - 1) { Tr.print(tx("agac yok\n", "no spanning tree\n")); Tr.at("end", tx("<code>t = " + t + "</code> &lt; n − 1: çizge bağlı değil, kapsayan ağaç yok.", "<code>t = " + t + "</code> &lt; n − 1: the graph is not connected, so there is no spanning tree.")); res.push("agac yok"); }
        else { Tr.print(tx("toplam = ", "total = ") + toplam + "\n"); Tr.at("end", tx("<code>t = n − 1</code>: minimum kapsayan ağacın maliyeti <b>", "<code>t = n − 1</code>: the cost of the minimum spanning tree is <b>") + toplam + "</b>."); }
      } else {
        Tr.fn("prim");
        var INF = 1000, w = [], sec = [], enaz = [], yakin = [];
        for (i = 0; i < n; i++) { w.push([]); sec.push(0); enaz.push(null); yakin.push(null); for (var j = 0; j < n; j++) w[i].push(i === j ? 0 : INF); }
        E.forEach(function (e) { w[e.u][e.v] = w[e.v][e.u] = e.w; });
        var edgeOf = function (u, v) { for (var q = 0; q < E.length; q++) if ((E[q].u === u && E[q].v === v) || (E[q].u === v && E[q].v === u)) return E[q].i; return null; };
        var showLab = function () { lab = {}; nodeHl = {}; for (var x = 0; x < n; x++) { if (sec[x]) nodeHl[x] = "is-done"; else if (enaz[x] != null) lab[x] = enaz[x] >= INF ? "∞" : enaz[x]; } };
        Tr.at(null, tx("Prim: ağaç 0 düğümünden büyür. <code>enaz[v]</code>, ağaca alınmamış v'nin ağaca en ucuz bağlantısıdır (düğüm yanındaki sayı); her turda en küçüğü seçilir.",
          "Prim: the tree grows from vertex 0. <code>lowcost[v]</code> is the cheapest connection of a vertex v outside the tree to the tree (the number next to the vertex); each round picks the smallest one."));
        sec[0] = 1; showLab();
        Tr.at("s0", "<code>" + nSc + "[0] = 1</code>: TV = {0}.");
        for (var v = 0; v < n; v++) { enaz[v] = w[0][v]; yakin[v] = 0; }
        showLab();
        Tr.at("init", tx("<code>enaz[v] = w[0][v]</code>, <code>yakin[v] = 0</code>: 0'a doğrudan bağlı düğümlerin maliyeti yazıldı, diğerleri ∞.", "<code>lowcost[v] = w[0][v]</code>, <code>closest[v] = 0</code>: vertices joined directly to 0 get that edge's cost, the others ∞."));
        for (var kk = 1; kk < n; kk++) {
          look = null; V = { k: String(kk) };
          Tr.at("for", "<code>k = " + kk + "</code>" + tx(": ağaca bir düğüm daha eklenecek.", ": one more vertex will join the tree."));
          var u = -1, mn = INF;
          for (v = 0; v < n; v++) if (!sec[v] && enaz[v] < mn) { mn = enaz[v]; u = v; }
          V.u = String(u);
          if (u < 0) { Tr.at("u", "<code>" + nEy + "</code>" + tx(" −1 döndü: kalan düğümlere bağlantı yok.", " returned −1: the remaining vertices cannot be reached.")); Tr.at("brk", tx("Çizge bağlı değil: ağaç yok, döngüden çıkılır.", "The graph is not connected: there is no tree; the loop exits.")); res.push("agac yok"); break; }
          look = edgeOf(u, yakin[u]);
          Tr.at("u", tx("<code>en_yakin</code>: seçilmemişler arasında en küçük <code>enaz</code> " + u + " düğümünde (" + mn + ", " + yakin[u] + " üzerinden).", "<code>cheapest</code>: among the vertices not yet in the tree, vertex " + u + " has the smallest <code>lowcost</code> (" + mn + ", via " + yakin[u] + ")."));
          Tr.at("brk", "<code>u ≥ 0</code>" + tx(": devam.", ": continue."));
          sec[u] = 1; toplam += enaz[u]; state[look] = "is-done"; res.push(yakin[u] + "-" + u + ":" + enaz[u]); showLab();
          Tr.at("add", "<code>" + nSc + "[" + u + "] = 1</code>: (" + yakin[u] + ", " + u + tx(") ağaca eklendi; toplam ", ") joins the tree; total ") + toplam + ".");
          for (v = 0; v < n; v++) {
            if (sec[v] || w[u][v] >= INF) continue;
            look = edgeOf(u, v);
            if (w[u][v] < enaz[v]) {
              Tr.at("if", "v = " + v + ": <code>w[" + u + "][" + v + "] = " + w[u][v] + "</code> &lt; <code>" + nEn + "[" + v + "] = " + (enaz[v] >= INF ? "∞" : enaz[v]) + "</code>.");
              enaz[v] = w[u][v]; yakin[v] = u; showLab();
              Tr.at("upd", "<code>" + nEn + "[" + v + "] = " + w[u][v] + "</code>, <code>" + nYk + "[" + v + "] = " + u + "</code>: " + tx(v + " için daha ucuz bağlantı bulundu.", "a cheaper connection for " + v + " is found."));
            } else Tr.at("if", "v = " + v + ": <code>w[" + u + "][" + v + "] = " + w[u][v] + "</code> ≥ <code>" + nEn + "[" + v + "] = " + enaz[v] + "</code>" + tx(": değişmez.", ": no change."));
          }
        }
        look = null; V = {};
        if (res[res.length - 1] !== "agac yok") { Tr.print(tx("toplam = ", "total = ") + toplam + "\n"); Tr.at(null, tx("Minimum kapsayan ağacın maliyeti <b>", "The cost of the minimum spanning tree is <b>") + toplam + "</b>."); }
        else Tr.at(null, tx("Kapsayan ağaç yok.", "There is no spanning tree."));
      }
      res.push("toplam " + toplam);
      return res.join("\n");
    }
  };

  /* ---------- 18: Dijkstra ---------- */
  models.dijkstra = {
    label: tx("Girdi (yönlü kenarlar, ör. 0>1:50)", "Input (directed edges, e.g. 0>1:50)"),
    fnEn: { EnKisaYolBul: "shortest_path" },
    parse: function (text) { var G = edges(text, 8, true, true); if (G.n < 2) fail(tx("en az iki düğüm gerekir", "at least two vertices are needed")); return G; },
    run: function (G, mode, Tr) {
      var n = G.n, INF = 1000, c = [], dist = [], prev = [], gid = [], u = null, w = null, look = null, V = {}, i, j;
      for (i = 0; i < n; i++) { c.push([]); for (j = 0; j < n; j++) c[i].push(i === j ? 0 : INF); }
      G.E.forEach(function (e) { c[e.u][e.v] = e.w; });
      function f(x) { return x == null ? null : x >= INF ? "∞" : x; }
      Tr.varsFn = function () { var v = []; Object.keys(V).forEach(function (k) { v.push([k, V[k]]); }); return v; };
      Tr.viewFn = function () {
        var hl = {}, lab = {};
        for (var x = 0; x < n; x++) { if (gid[x]) hl[x] = "is-done"; if (dist[x] != null) lab[x] = f(dist[x]); }
        if (u != null) hl[u] = "is-look";
        if (w != null && !gid[w]) hl[w] = "is-hot";
        var ed = G.E.map(function (e) {
          var h = "";
          if (u != null && w != null && e.u === u && e.v === w) h = "is-hot";
          else if (dist.length && prev[e.v] === e.u && gid[e.v] && e.v !== 0) h = "is-done";
          return { u: e.u, v: e.v, w: e.w, hl: h };
        });
        return [{ t: "graph", n: n, edges: ed, dir: true, hl: hl, lab: lab },
          { t: "arr", name: tx("uzaklik", "dist"), cells: dist.map(f), cw: 28 },
          { t: "arr", name: tx("onceki", "pred"), cells: prev.slice(), cw: 28, noIdx: true }];
      };
      var nD = tx("uzaklik", "dist"), nP = tx("onceki", "pred"), nG = tx("gidildi", "found"), nM = tx("minimumBul", "choose");
      Tr.fn("EnKisaYolBul");
      Tr.at(null, tx("<code>EnKisaYolBul(0, …)</code>: kaynak 0. Kenar yoksa maliyet <code>SONSUZ = 1000</code> (∞). Düğüm yanındaki sayı o anki <code>uzaklik</code> değeridir.",
        "<code>shortest_path(0, …)</code>: the source is 0. A missing edge costs <code>INF = 1000</code> (∞). The number next to a vertex is its current <code>dist</code> value."));
      for (i = 0; i < n; i++) { gid.push(false); dist.push(c[0][i]); prev.push(0); }
      Tr.at("a1", tx("A1: <code>gidildi[] = FALSE</code>, <code>uzaklik[] = maliyet[0][]</code>, <code>onceki[] = 0</code>.", "A1: <code>found[] = FALSE</code>, <code>dist[] = cost[0][]</code>, <code>pred[] = 0</code>."));
      gid[0] = true; dist[0] = 0;
      Tr.at("src", "<code>" + nG + "[0] = TRUE</code>, <code>" + nD + "[0] = 0</code>" + tx(": kaynak kesinleşti.", ": the source is final."));
      for (i = 2; i < n; i++) {
        u = null; w = null; V = { i: String(i) };
        Tr.at("for", "<code>i = " + i + "</code>: " + tx((i - 1) + ". tur (toplam n − 2 = " + (n - 2) + " tur).", "round " + (i - 1) + " (n − 2 = " + (n - 2) + " rounds in all)."));
        var mn = Infinity, pos = -1;
        for (j = 0; j < n; j++) if (dist[j] < mn && !gid[j]) { mn = dist[j]; pos = j; }
        u = pos >= 0 ? pos : null; V.u = String(pos);
        if (pos < 0) { Tr.at("min", "<code>" + nM + "</code>" + tx(" −1 döndü: işaretsiz düğüm kalmadı.", " returned −1: no unmarked vertex is left.")); Tr.at("brk", "<code>u &lt; 0</code>" + tx(": döngüden çıkılır.", ": the loop exits.")); break; }
        Tr.at("min", "<code>" + nM + "</code>: " + tx("işaretsizler arasında en küçük uzaklık " + pos + " düğümünde (", "among the unmarked vertices, vertex " + pos + " has the smallest distance (") + f(mn) + ").");
        Tr.at("brk", "<code>u ≥ 0</code>" + tx(": devam.", ": continue."));
        gid[pos] = true;
        Tr.at("mark", "<code>" + nG + "[" + pos + "] = TRUE</code>: " + tx(pos + " düğümünün uzaklığı kesinleşti.", "the distance of vertex " + pos + " is final."));
        for (w = 0; w < n; w++) {
          if (gid[w] || c[pos][w] >= INF) continue;
          V.w = String(w);
          var nd = dist[pos] + c[pos][w];
          if (nd < dist[w]) {
            Tr.at("if", "w = " + w + ": " + dist[pos] + " + " + c[pos][w] + " = " + nd + " &lt; " + f(dist[w]) + tx(": daha kısa yol.", ": a shorter path."));
            dist[w] = nd; prev[w] = pos;
            Tr.at("upd", "<code>" + nD + "[" + w + "] = " + nd + "</code>, <code>" + nP + "[" + w + "] = " + pos + "</code>.");
          } else Tr.at("if", "w = " + w + ": " + dist[pos] + " + " + c[pos][w] + " = " + nd + " ≥ " + f(dist[w]) + tx(": değişmez.", ": no change."));
        }
        w = null; delete V.w;
      }
      u = null; w = null; V = {};
      Tr.print(nD + ": " + dist.map(f).join(" ") + "\n");
      Tr.at(null, tx("Bitti. <code>uzaklik</code> = [" + dist.map(f).join(", ") + "]; yollar <code>onceki</code> dizisi geriye izlenerek bulunur.", "Done. <code>dist</code> = [" + dist.map(f).join(", ") + "]; the paths are found by tracing the <code>pred</code> array backwards."));
      return "uzaklik " + dist.join(" ") + "\nonceki " + prev.join(" ");
    }
  };

  /* ---------- 19-20: sıralama ---------- */
  models.sort = {
    label: tx("Girdi (virgülle ayrılmış sayılar)", "Input (comma-separated numbers)"),
    fnEn: { bol: "partition" },
    parse: function (text) { return nums(text, 0, 99, 1, 12); },
    run: function (a0, mode, Tr) {
      var a = a0.slice(), n = a.length, P = {}, V = {}, look = {}, done = {}, cmp = 0, b = null, calls = [];
      var heap = mode === "heap";
      var nTk = tx("takas", "swapped"), nKok = tx("kok", "root"), fBol = tx("bol", "partition");
      if (heap) a = [null].concat(a);
      Tr.varsFn = function () {
        var v = []; Object.keys(V).forEach(function (k) { v.push([k, V[k]]); });
        v.push([tx("karşılaştırma", "comparisons"), String(cmp)]);
        if (calls.length) v.push([tx("çağrılar", "calls"), calls.join(" › ")]);
        return v;
      };
      Tr.viewFn = function () {
        var hl = {}, ptr = [];
        Object.keys(done).forEach(function (k) { hl[heap ? k - 1 : k] = "is-done"; });
        Object.keys(look).forEach(function (k) { hl[heap ? k - 1 : k] = look[k]; });
        Object.keys(P).forEach(function (k) { if (P[k] != null) ptr.push([k, P[k]]); });
        var parts = [];
        if (heap) {
          var hn = V.n != null ? +V.n : n;
          var node = function (i, lim) { if (i > lim) return null; return { id: "h" + i, v: a[i], l: node(2 * i, lim), r: node(2 * i + 1, lim), hl: hl[i - 1] || "" }; };
          parts.push({ t: "tree", root: node(1, hn), dy: 30 });
          parts.push({ t: "arr", name: "a", cells: a.slice(1), hl: hl, ptr: ptr, base: 1, cw: 26 });
        } else parts.push({ t: "arr", name: "a", cells: a.slice(), hl: hl, ptr: ptr, cw: 26 });
        if (b) parts.push({ t: "arr", name: "b", cells: b.slice(), cw: 26, noDiff: true });
        return parts;
      };
      function less(x, y) { cmp++; return x < y; }
      var FN = { selection: "selection", insertion: "insertion", bubble: "bubble2", shell: "shell_sort", quick: "quicksort1", merge: "mergesort", heap: "heapsort" }[mode || "selection"];
      Tr.fn(FN);
      Tr.at(null, EN ? "Input: [" + a0.join(", ") + "]. " + {
        selection: "Selection sort: in each round the smallest item of the remaining part is found and put where the round started.",
        insertion: "Insertion sort: the next item is inserted into the sorted part on the left, shifting larger items to the right.",
        bubble: "Bubble sort (with early exit): adjacent pairs are compared from right to left; if a round makes no swap, the array is sorted.",
        shell: "Shell sort: items h apart are first insertion-sorted; h is halved each round and h = 1 is the last round.",
        quick: "Quick sort: <code>partition</code> puts the pivot (a[R]) in its final place, with smaller items to its left and larger ones to its right. Both sides are sorted recursively.",
        merge: "Merge sort: the array is split into halves, each half is sorted, and <code>merge</code> combines the two sorted halves via the helper array <code>b</code>.",
        heap: "Heap sort: <code>a[1..n]</code> is first turned into a max heap bottom-up; then the root is moved to the end and the heap shrinks."
      }[mode || "selection"] : "Girdi: [" + a0.join(", ") + "]. " + {
        selection: "Seçimli sıralama: her turda kalan kısmın en küçüğü bulunup tura başlanan yere konur.",
        insertion: "Eklemeli sıralama: soldaki sıralı kısma sıradaki öğe, büyükler sağa kaydırılarak yerleştirilir.",
        bubble: "Kabarcık sıralaması (erken durmalı): sağdan sola komşu çiftler karşılaştırılır; bir turda takas olmazsa dizi sıralıdır.",
        shell: "Shell sıralaması: önce birbirinden h uzak öğeler eklemeli sıralanır; h her turda yarıya iner, h = 1 son turdur.",
        quick: "Hızlı sıralama: <code>bol</code>, pivotu (a[R]) son yerine koyar; küçükler solda, büyükler sağda kalır. İki yan özyinelemeyle sıralanır.",
        merge: "Birleştirme sıralaması: dizi yarılara bölünür, her yarı sıralanır, <code>merge</code> iki sıralı yarıyı yardımcı dizi <code>b</code> üzerinden birleştirir.",
        heap: "Heap sort: <code>a[1..n]</code> önce aşağıdan yukarıya maksimum heap yapılır; sonra kök sona alınıp heap küçültülür."
      }[mode || "selection"]);
      var L = 0, R = n - 1, i, j, v;
      if (mode === "insertion") {
        for (i = L + 1; ; i++) {
          P = { i: i <= R ? i : null }; V = { i: String(i) }; look = {};
          if (i > R) { Tr.at("i", "<code>i = " + i + "</code> &gt; R" + tx(": dizi sıralandı.", ": the array is sorted.")); break; }
          Tr.at("i", "<code>i = " + i + "</code>: a[0.." + (i - 1) + tx("] sıralı.", "] is sorted."));
          v = a[i]; V.v = String(v); look[i] = "is-look";
          Tr.at("v", "<code>v = a[" + i + "] = " + v + "</code>" + tx(" bir kenara alındı.", " is set aside."));
          j = i - 1; P.j = j; V.j = String(j);
          Tr.at("j", "<code>j = " + j + "</code>.");
          while (true) {
            if (j < L) { Tr.at("w", "<code>j &lt; L</code>" + tx(": dizinin başına gelindi.", ": the start of the array is reached.")); break; }
            cmp++;
            if (!(a[j] > v)) { Tr.at("w", "a[" + j + "] = " + a[j] + " &gt; " + v + tx(" değil: yer bulundu.", " is false: the place is found.")); break; }
            Tr.at("w", "a[" + j + "] = " + a[j] + " &gt; v = " + v + ".");
            a[j + 1] = a[j];
            Tr.at("sh", "<code>a[" + (j + 1) + "] = a[" + j + "]</code>: " + a[j] + tx(" bir sağa kaydı.", " shifts one place right."));
            j--; P.j = j >= 0 ? j : null; V.j = String(j);
            Tr.at("dec", "<code>j = " + j + "</code>.");
          }
          a[j + 1] = v; look = {}; look[j + 1] = "is-done";
          Tr.at("put", "<code>a[" + (j + 1) + "] = v</code>: " + v + tx(" yerine kondu.", " is put in its place."));
        }
      } else if (mode === "bubble") {
        for (i = L; ; i++) {
          P = { i: i < R ? i : null }; V = { i: String(i) }; look = {};
          if (i >= R) { Tr.at("i", "<code>i = R</code>" + tx(": tüm turlar bitti.", ": all rounds are done.")); break; }
          var takas = 0; V[nTk] = "0";
          Tr.at("i", tx("Tur <code>i = ", "Round <code>i = ") + i + "</code>.");
          Tr.at("t", "<code>" + nTk + " = 0</code>.");
          for (j = R; j > i; j--) {
            P.j = j; V.j = String(j); look = {}; look[j] = "is-look"; look[j - 1] = "is-look";
            Tr.at("j", "<code>j = " + j + "</code>: " + tx("a[" + (j - 1) + "] ile a[" + j + "] karşılaştırılacak.", "a[" + (j - 1) + "] and a[" + j + "] will be compared."));
            if (less(a[j], a[j - 1])) {
              Tr.at("cmp", a[j] + " &lt; " + a[j - 1] + tx(": sıra bozuk.", ": out of order."));
              var t = a[j]; a[j] = a[j - 1]; a[j - 1] = t; takas = 1; V[nTk] = "1";
              Tr.at("swap", tx("Takas: a[", "Swap: a[") + (j - 1) + "] = " + a[j - 1] + ", a[" + j + "] = " + a[j] + "; <code>" + nTk + " = 1</code>.");
            } else Tr.at("cmp", a[j] + " &lt; " + a[j - 1] + tx(" değil: takas yok.", " is false: no swap."));
          }
          done[i] = 1; look = {}; delete P.j;
          if (!takas) { Tr.at("ret", tx("Bu turda hiç takas olmadı: dizi sıralı, erken çıkılır.", "No swap happened in this round: the array is sorted; exit early.")); break; }
          Tr.at("ret", tx("Tur bitti; a[" + i + "] yerinde.", "The round is over; a[" + i + "] is in place."));
        }
      } else if (mode === "shell") {
        for (var h = Math.floor(n / 2); ; h = Math.floor(h / 2)) {
          P = {}; V = { h: String(h) }; look = {};
          if (h <= 0) { Tr.at("h", "<code>h = 0</code>" + tx(": sıralama bitti.", ": sorting is done.")); break; }
          Tr.at("h", tx("Aralık <code>h = " + h + "</code>: birbirinden " + h + " uzak öğeler ayrı ayrı sıralanır.", "Gap <code>h = " + h + "</code>: items " + h + " apart are sorted as separate chains."));
          for (i = h; i < n; i++) {
            P = { i: i }; V = { h: String(h), i: String(i) }; look = {};
            Tr.at("i", "<code>i = " + i + "</code>.");
            v = a[i]; j = i; V.v = String(v); V.j = String(j); look[i] = "is-look";
            Tr.at("v", "<code>v = a[" + i + "] = " + v + "</code>, <code>j = " + i + "</code>.");
            while (true) {
              if (j < h) { Tr.at("w", "<code>j &lt; h</code>" + tx(": zincirin başı.", ": the start of the chain.")); break; }
              cmp++;
              if (!(a[j - h] > v)) { Tr.at("w", "a[" + (j - h) + "] = " + a[j - h] + " &gt; " + v + tx(" değil.", " is false.")); break; }
              Tr.at("w", "a[" + (j - h) + "] = " + a[j - h] + " &gt; " + v + ".");
              a[j] = a[j - h]; j -= h; V.j = String(j); P.j = j;
              Tr.at("sh", "<code>a[" + (j + h) + "] = a[" + j + "]</code>: " + tx(a[j + h] + ", " + h + " konum sağa kaydı; <code>j = ", a[j + h] + " shifts " + h + " places right; <code>j = ") + j + "</code>.");
            }
            a[j] = v; look = {}; look[j] = "is-done";
            Tr.at("put", "<code>a[" + j + "] = " + v + "</code>.");
          }
        }
      } else if (mode === "quick") {
        var qs = function (L, R) {
          calls.push("qs(" + L + "," + R + ")"); Tr.fn("quicksort1"); P = { L: L, R: R }; V = {}; look = {};
          if (R <= L) { Tr.at("if", "<code>quicksort1(a, " + L + ", " + R + ")</code>: <code>R ≤ L</code>" + tx(", en çok bir öğe; dönülür.", ", at most one item; return.")); if (R === L) done[L] = 1; calls.pop(); return; }
          Tr.at("if", "<code>quicksort1(a, " + L + ", " + R + ")</code>: " + tx((R - L + 1) + " öğe bölümlenecek.", (R - L + 1) + " items will be partitioned."));
          Tr.at("bol", "<code>" + fBol + "(a, " + L + ", " + R + ")</code>" + tx(" çağrılır.", " is called."));
          Tr.fn("bol");
          var i = L - 1, j = R, v = a[R];
          V = { v: String(v), i: String(i), j: String(j) }; P = { i: null, j: j }; look = {}; look[R] = "is-look";
          Tr.at("b0", "Pivot <code>v = a[" + R + "] = " + v + "</code>; <code>i = " + i + "</code>, <code>j = " + j + "</code>.");
          for (;;) {
            while (true) {
              ++i; P.i = i; V.i = String(i);
              if (less(a[i], v)) Tr.at("b1", "a[" + i + "] = " + a[i] + " &lt; " + v + tx(": i ilerler.", ": i moves on."));
              else { Tr.at("b1", "a[" + i + "] = " + a[i] + " &lt; " + v + tx(" değil: i burada durur.", " is false: i stops here.")); break; }
            }
            while (true) {
              --j; P.j = j; V.j = String(j);
              if (less(v, a[j])) {
                Tr.at("b2", v + " &lt; a[" + j + "] = " + a[j] + tx(": j geriler.", ": j moves back."));
                if (j === L) { Tr.at("b3", "<code>j == L</code>" + tx(": dizinin başı, tarama durur.", ": the start of the array; the scan stops.")); break; }
                Tr.at("b3", "<code>j ≠ L</code>.");
              } else { Tr.at("b2", v + " &lt; a[" + j + "] = " + a[j] + tx(" değil: j burada durur.", " is false: j stops here.")); break; }
            }
            if (i >= j) { Tr.at("b4", "<code>i ≥ j</code>" + tx(": taramalar kesişti.", ": the scans have crossed.")); break; }
            Tr.at("b4", "<code>i &lt; j</code>" + tx(": iki öğe yanlış tarafta.", ": both items are on the wrong side."));
            var t = a[i]; a[i] = a[j]; a[j] = t;
            Tr.at("b5", "<code>SWAP(a[" + i + "], a[" + j + "])</code>.");
          }
          var t2 = a[i]; a[i] = a[R]; a[R] = t2; done[i] = 1; look = {};
          Tr.at("b6", "<code>SWAP(a[" + i + "], a[" + R + "])</code>: " + tx("pivot " + v + " son yerine (" + i + ") kondu.", "the pivot " + v + " goes to its final place (" + i + ")."));
          Tr.at("b7", "<code>" + fBol + "</code> " + tx(i + " döndürür.", "returns " + i + "."));
          Tr.fn("quicksort1"); P = { L: L, R: R }; V = { i: String(i) };
          Tr.at("bol", "<code>i = " + i + "</code>: " + tx("sol yan a[" + L + ".." + (i - 1) + "], sağ yan a[" + (i + 1) + ".." + R + "].", "left side a[" + L + ".." + (i - 1) + "], right side a[" + (i + 1) + ".." + R + "]."));
          Tr.at("l", "<code>quicksort1(a, " + L + ", " + (i - 1) + ")</code>.");
          qs(L, i - 1);
          Tr.fn("quicksort1"); P = { L: L, R: R }; V = { i: String(i) }; look = {};
          Tr.at("r", "<code>quicksort1(a, " + (i + 1) + ", " + R + ")</code>.");
          qs(i + 1, R);
          calls.pop();
        };
        qs(0, n - 1);
      } else if (mode === "merge") {
        b = []; for (i = 0; i < n; i++) b.push(null);
        var ms = function (L, R) {
          calls.push("ms(" + L + "," + R + ")"); Tr.fn("mergesort"); P = { L: L, R: R }; V = {}; look = {};
          if (R <= L) { Tr.at("if", "<code>mergesort(a, b, " + L + ", " + R + ")</code>" + tx(": tek öğe, zaten sıralı.", ": a single item, already sorted.")); calls.pop(); return; }
          var m = Math.floor((R + L) / 2); V.m = String(m); P.m = m;
          Tr.at("if", "<code>mergesort(a, b, " + L + ", " + R + ")</code>.");
          Tr.at("m", "<code>m = (" + R + " + " + L + ") / 2 = " + m + "</code>.");
          Tr.at("l", tx("Sol yarı: ", "Left half: ") + "<code>mergesort(a, b, " + L + ", " + m + ")</code>.");
          ms(L, m);
          Tr.fn("mergesort"); P = { L: L, m: m, R: R }; V = { m: String(m) }; look = {};
          Tr.at("r", tx("Sağ yarı: ", "Right half: ") + "<code>mergesort(a, b, " + (m + 1) + ", " + R + ")</code>.");
          ms(m + 1, R);
          Tr.fn("mergesort"); P = { L: L, m: m, R: R }; V = { m: String(m) }; look = {};
          Tr.at("mg", tx("İki sıralı yarı <code>merge(a, b, " + L + ", " + m + ", " + R + ")</code> ile birleştirilir.", "The two sorted halves are combined by <code>merge(a, b, " + L + ", " + m + ", " + R + ")</code>."));
          Tr.fn("merge");
          var i, j, k;
          for (i = m + 1; i > L; i--) b[i - 1] = a[i - 1];
          V = { i: String(i) };
          Tr.at("c1", tx("Sol yarı a[" + L + ".." + m + "] olduğu gibi b'ye kopyalandı; <code>i = ", "The left half a[" + L + ".." + m + "] is copied to b as it is; <code>i = ") + i + "</code>.");
          for (j = m; j < R; j++) b[R + m - j] = a[j + 1];
          V.j = String(j);
          Tr.at("c2", tx("Sağ yarı a[" + (m + 1) + ".." + R + "] b'ye ters sırada kopyalandı; <code>j = " + j + "</code>. Böylece b'nin iki ucu birbirine bekçi olur.", "The right half a[" + (m + 1) + ".." + R + "] is copied to b in reverse order; <code>j = " + j + "</code>. This way each end of b acts as a sentinel for the other."));
          for (k = L; k <= R; k++) {
            P = { k: k }; V = { i: String(i), j: String(j), k: String(k) }; look = {}; look[k] = "is-look";
            if (less(b[j], b[i])) { a[k] = b[j--]; Tr.at("k", "b[" + (j + 1) + "] = " + a[k] + " &lt; b[" + i + "] = " + b[i] + tx(": sağdan alındı, <code>a[", ": taken from the right, <code>a[") + k + "] = " + a[k] + "</code>."); }
            else { a[k] = b[i++]; Tr.at("k", "b[" + (j) + "] = " + b[j] + " &lt; b[" + (i - 1) + "] = " + a[k] + tx(" değil: soldan alındı, <code>a[", " is false: taken from the left, <code>a[") + k + "] = " + a[k] + "</code>."); }
          }
          look = {};
          calls.pop();
        };
        ms(0, n - 1);
        b = null;
      } else if (mode === "heap") {
        var heapify = function (kok, hn) {
          Tr.fn("heapify"); var t = a[kok], j;
          V = {}; V[nKok] = String(kok); V.n = String(hn); V.t = String(t); P = {}; P[nKok] = kok; look = {}; look[kok] = "is-look";
          Tr.at("t", "<code>heapify(a, " + kok + ", " + hn + ")</code>: <code>t = a[" + kok + "] = " + t + "</code>" + tx("; t'nin heap içindeki yeri aranır.", "; the place of t in the heap is sought."));
          for (j = 2 * kok; ; j *= 2) {
            V.j = String(j);
            if (j > hn) { Tr.at("for", "<code>j = " + j + "</code> &gt; " + hn + tx(": çocuk yok.", ": no child.")); break; }
            P.j = j;
            Tr.at("for", "<code>j = " + j + "</code>: " + tx("sol çocuk a[", "left child a[") + j + "] = " + a[j] + ".");
            if (j < hn && less(a[j], a[j + 1])) { j++; V.j = String(j); P.j = j; Tr.at("big", tx("Sağ çocuk a[" + j + "] = " + a[j] + " daha büyük: <code>j = ", "The right child a[" + j + "] = " + a[j] + " is larger: <code>j = ") + j + "</code>."); }
            else Tr.at("big", tx("Büyük çocuk a[", "The larger child is a[") + j + "] = " + a[j] + ".");
            cmp++;
            if (t >= a[j]) { Tr.at("c", t + " ≥ " + a[j] + tx(": t buraya sığar.", ": t fits here.")); break; }
            Tr.at("c", t + " &lt; " + a[j] + tx(": çocuk yukarı alınır.", ": the child moves up."));
            a[Math.floor(j / 2)] = a[j];
            Tr.at("mv", "<code>a[" + Math.floor(j / 2) + "] = a[" + j + "]</code>.");
          }
          a[Math.floor(j / 2)] = t; look = {}; look[Math.floor(j / 2)] = "is-hot";
          Tr.at("put", "<code>a[" + Math.floor(j / 2) + "] = " + t + "</code>.");
        };
        V = { n: String(n) };
        for (i = Math.floor(n / 2); i >= 1; i--) {
          Tr.fn("heapsort"); V = { i: String(i), n: String(n) }; P = { i: i }; look = {};
          Tr.at("k", tx("Heap kurma: ", "Building the heap: ") + "<code>i = " + i + "</code>, <code>heapify(a, " + i + ", " + n + ")</code>.");
          heapify(i, n);
        }
        for (i = n - 1; ; i--) {
          Tr.fn("heapsort"); V = { i: String(i), n: String(i + 1) }; P = {}; look = {};
          if (i < 1) { Tr.at("s", "<code>i = 0</code>" + tx(": sıralama bitti.", ": sorting is done.")); break; }
          Tr.at("s", "<code>i = " + i + "</code>: heap a[1.." + (i + 1) + "].");
          var t3 = a[1]; a[1] = a[i + 1]; a[i + 1] = t3; done[i + 1] = 1; V.n = String(i);
          Tr.at("sw", "<code>SWAP(a[1], a[" + (i + 1) + "])</code>: " + tx("en büyük (" + a[i + 1] + ") sona alındı.", "the largest (" + a[i + 1] + ") moves to the end."));
          Tr.at("hf", "<code>heapify(a, 1, " + i + ")</code>" + tx(": kök düzeltilir.", ": the root is fixed."));
          heapify(1, i);
        }
        done[1] = 1; a = a.slice(1);
        heap = false;
      } else {
        for (i = L; ; i++) {
          P = { i: i < R ? i : null }; V = { i: String(i) }; look = {};
          if (i >= R) { Tr.at("i", "<code>i = R</code>" + tx(": son öğe kendiliğinden yerinde.", ": the last item is in place by itself.")); break; }
          var min = i; P.min = min; V.min = String(min);
          Tr.at("i", tx("Tur <code>i = ", "Round <code>i = ") + i + "</code>.");
          Tr.at("min", "<code>min = " + i + "</code> (a[" + i + "] = " + a[i] + ").");
          for (j = i + 1; j <= R; j++) {
            P.j = j; V.j = String(j); look = {}; look[j] = "is-look"; look[min] = "is-hot";
            Tr.at("j", "<code>j = " + j + "</code>.");
            if (less(a[j], a[min])) { Tr.at("cmp", "a[" + j + "] = " + a[j] + " &lt; a[" + min + "] = " + a[min] + tx(": yeni en küçük.", ": a new minimum.")); min = j; P.min = min; V.min = String(min); Tr.at("set", "<code>min = " + j + "</code>."); }
            else Tr.at("cmp", "a[" + j + "] = " + a[j] + " &lt; a[" + min + "] = " + a[min] + tx(" değil.", " is false."));
          }
          var tt = a[i]; a[i] = a[min]; a[min] = tt; done[i] = 1; look = {}; delete P.j;
          Tr.at("swap", "<code>SWAP(a[" + i + "], a[" + min + "])</code>: " + tx("tur bitti, a[" + i + "] = " + a[i] + " yerinde.", "the round is over; a[" + i + "] = " + a[i] + " is in place."));
        }
      }
      for (i = 0; i < n; i++) done[i] = 1;
      P = {}; V = {}; look = {}; calls = [];
      Tr.print(a.join(" ") + "\n");
      Tr.at(null, tx("Sıralı dizi: <b>" + a.join(", ") + "</b>; toplam " + cmp + " anahtar karşılaştırması.", "Sorted array: <b>" + a.join(", ") + "</b>; " + pl(cmp, "key comparison", "key comparisons") + " in total."));
      return a.join(" ") + "\nkarsilastirma " + cmp;
    }
  };

  var Lab = { models: models, run: run, tokens: tokens, draw: draw };
  if (typeof module !== "undefined" && module.exports) module.exports = Lab;
  if (root) root.DscLab = Lab;
  if (typeof document === "undefined") return;

  /* ================= ARAYÜZ ================= */
  if (["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) < 0) return;
  var PLAY_MS = 650, uidc = 0;

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function btn(act, text, label) {
    var b = el("button", "ds-deck__button ds-deck__button--sm", esc(text));
    b.type = "button"; b.dataset.act = act;
    if (label) b.setAttribute("aria-label", label);
    return b;
  }

  document.querySelectorAll('[data-demo="dsc-lab"]').forEach(function (demo) {
    var name = demo.dataset.lab, model = models[name];
    if (!model) return;
    var uid = "lab" + (++uidc), slide = demo.closest(".ds-deck__slide");
    var code = {}, fns = [], examples = [];
    demo.querySelectorAll('script[type="text/x-c"]').forEach(function (s) {
      var fn = s.dataset.fn || "kod", lines = s.textContent.replace(/^\n+|\s+$/g, "").split("\n"), labels = {};
      lines = lines.map(function (ln, i) {
        var m = /\s*@@([\w+\-*\/%]+)\s*$/.exec(ln);
        if (m) { labels[m[1]] = i; return ln.slice(0, m.index); }
        return ln;
      });
      code[fn] = { lines: lines, labels: labels }; fns.push(fn);
    });
    demo.querySelectorAll('script[type="text/x-lab"]').forEach(function (s) {
      examples.push({ name: s.dataset.name || tx("Örnek", "Example"), mode: s.dataset.mode || "", text: s.textContent.trim() });
    });
    if (!examples.length || !fns.length) return;

    var bar = el("div", "lab-bar");
    var pick = el("select");
    pick.setAttribute("aria-label", tx("Hazır örnek", "Preset example"));
    examples.forEach(function (ex, i) { var o = el("option", null, esc(ex.name)); o.value = i; pick.appendChild(o); });
    var btns = el("div", "lab-btns");
    var bBack = btn("back", tx("◀ Geri", "◀ Back"), tx("Bir adım geri", "One step back")), bStep = btn("step", tx("Adım ▶", "Step ▶"), tx("Bir adım ilerle", "One step forward"));
    var bPlay = btn("play", tx("Oynat", "Play"), tx("Adımları otomatik oynat", "Play the steps automatically")), bReset = btn("reset", tx("Sıfırla", "Reset"), tx("Başa dön", "Back to the start"));
    [bBack, bStep, bPlay, bReset].forEach(function (b) { btns.appendChild(b); });
    var count = el("span", "lab-count");
    bar.appendChild(pick); bar.appendChild(btns); bar.appendChild(count);

    var inRow = el("div", "lab-in");
    var inId = uid + "-in";
    var lab = el("label", null, esc(model.label)); lab.htmlFor = inId;
    var input = el("input"); input.id = inId; input.type = "text"; input.spellcheck = false; input.autocomplete = "off";
    var bApply = btn("apply", tx("Uygula", "Apply"), tx("Girdiyi çalıştır", "Run the input"));
    inRow.appendChild(lab); inRow.appendChild(input); inRow.appendChild(bApply);

    var main = el("div", "lab-main");
    var pCode = el("div", "lab-panel");
    var codeTitle = el("p", "lab-title", tx("Kod", "Code"));
    var codeBox = el("div", "lab-code");
    pCode.appendChild(codeTitle); pCode.appendChild(codeBox);
    var right = el("div", "lab-right");
    var view = el("div", "lab-panel lab-view");
    var vars = el("div", "lab-vars");
    var out = el("div", "lab-out");
    out.setAttribute("aria-live", "polite");
    right.appendChild(view); right.appendChild(vars); right.appendChild(out);
    main.appendChild(pCode); main.appendChild(right);
    var status = el("p", "lab-status");
    status.setAttribute("aria-live", "polite");
    demo.appendChild(bar); demo.appendChild(inRow); demo.appendChild(main); demo.appendChild(status);

    var steps = [], k = 0, mode = "", timer = null, shownFn = null, lineEls = [], note = "";

    /* a fragment's data-fn may be the Turkish or the English name of the function */
    var alias = {};
    Object.keys(model.fnEn || {}).forEach(function (t) { alias[t] = model.fnEn[t]; alias[model.fnEn[t]] = t; });
    function showCode(fn) {
      if (!code[fn] && code[alias[fn]]) fn = alias[fn];
      if (!code[fn]) fn = fns[0];
      if (fn === shownFn) return;
      shownFn = fn;
      codeTitle.innerHTML = tx("Kod", "Code") + (fns.length > 1 ? ": <b>" + esc(fn) + "</b>" : "");
      codeBox.innerHTML = "";
      lineEls = code[fn].lines.map(function (ln, i) {
        var d = el("div", "lab-ln", "<i>" + (i + 1) + "</i><span>" + esc(ln || " ") + "</span>");
        codeBox.appendChild(d);
        return d;
      });
    }
    function render() {
      var st = steps[k];
      if (!st) return;
      showCode(st.fn);
      var cur = code[shownFn].labels[st.line];
      lineEls.forEach(function (d, i) { d.classList.toggle("is-current", i === cur); });
      if (cur != null) {
        var d = lineEls[cur], top = d.offsetTop - codeBox.offsetTop;
        if (top < codeBox.scrollTop || top + d.offsetHeight > codeBox.scrollTop + codeBox.clientHeight) codeBox.scrollTop = Math.max(0, top - codeBox.clientHeight / 3);
      } else if (k === 0) codeBox.scrollTop = 0;
      view.innerHTML = draw(diffView(st.view, k > 0 ? steps[k - 1].view : null), uid);
      var prev = k > 0 ? steps[k - 1].vars : null, pm = {};
      if (prev) prev.forEach(function (v) { pm[v[0]] = v[1]; });
      vars.innerHTML = st.vars.map(function (v) {
        var ch = prev && pm[v[0]] !== v[1];
        return '<span' + (ch ? ' class="is-changed"' : "") + "><b>" + esc(v[0]) + "</b> " + esc(v[1]) + "</span>";
      }).join("");
      var ol = st.out ? st.out.replace(/\n$/, "").split("\n") : [];
      out.innerHTML = "<b>" + tx("Çıktı", "Output") + "</b><span>" + (ol.length ? esc(ol.slice(-2).join("\n")) : tx("(henüz yok)", "(none yet)")) + "</span>";
      out.title = ol.join("\n");
      count.textContent = tx("adım ", "step ") + k + " / " + (steps.length - 1);
      status.classList.remove("is-error");
      status.innerHTML = st.note + (k === steps.length - 1 && note ? " " + note : "");
      bBack.disabled = k === 0;
      bStep.disabled = k >= steps.length - 1;
    }
    function load(text) {
      stop();
      var r = run(name, text, mode);
      if (r.error) {
        status.classList.add("is-error");
        status.innerHTML = tx("<b>Girdi okunamadı:</b> ", "<b>The input could not be read:</b> ") + esc(r.error) + tx(". Önceki çalıştırma ekranda kalır.", ". The previous run stays on screen.");
        return false;
      }
      steps = r.steps; k = 0;
      note = r.truncated ? tx("<b>Adım sınırına (" + MAX_STEPS + ") ulaşıldı; çalıştırma burada kesildi.</b>", "<b>The step limit (" + MAX_STEPS + ") was reached; the run was cut off here.</b>") : "";
      render();
      return true;
    }
    function stop() {
      if (!timer) return;
      clearInterval(timer); timer = null;
      bPlay.textContent = tx("Oynat", "Play"); bPlay.setAttribute("aria-label", tx("Adımları otomatik oynat", "Play the steps automatically"));
    }
    function play() {
      if (timer) { stop(); return; }
      if (k >= steps.length - 1) k = 0;
      bPlay.textContent = tx("Durdur", "Pause"); bPlay.setAttribute("aria-label", tx("Otomatik oynatmayı durdur", "Stop automatic playback"));
      timer = setInterval(function () {
        if (!slide || !slide.classList.contains("is-active") || k >= steps.length - 1) { stop(); return; }
        k++; render();
        if (k >= steps.length - 1) stop();
      }, PLAY_MS);
    }
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-act]");
      if (!b || b.disabled) return;
      var act = b.dataset.act;
      if (act === "step") { stop(); if (k < steps.length - 1) { k++; render(); } }
      else if (act === "back") { stop(); if (k > 0) { k--; render(); } }
      else if (act === "play") play();
      else if (act === "reset") { stop(); k = 0; render(); }
    });
    bApply.addEventListener("click", function () { load(input.value); });
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); load(input.value); } });
    pick.addEventListener("change", function () {
      var ex = examples[+pick.value];
      mode = ex.mode; input.value = ex.text; load(ex.text);
    });
    mode = examples[0].mode; input.value = examples[0].text; load(examples[0].text);
  });
})(typeof window !== "undefined" ? window : null);
