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

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function Limit() {}
  function InputError(msg) { this.message = msg; }

  /* ---------- izleyici: modeller adımları buraya yazar ---------- */
  function Tracer() { this.steps = []; this.out = ""; this.cur = null; this.viewFn = null; this.varsFn = null; }
  Tracer.prototype.fn = function (f) { this.cur = f; };
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
    if (!/^-?\d+$/.test(s)) fail("“" + s + "” bir tam sayı değil");
    var v = parseInt(s, 10);
    if (v < min || v > max) fail(v + " izin verilen aralığın (" + min + "–" + max + ") dışında");
    return v;
  }
  function nums(text, min, max, lo, hi) {
    var t = tokens(text);
    if (t.length < lo) fail("en az " + lo + " sayı gerekir");
    if (t.length > hi) fail("en fazla " + hi + " sayı girilebilir");
    return t.map(function (s) { return int(s, min, max); });
  }
  /* "30" → {op: def, x: 30}; "ara 30" → {op: "ara", x: 30}; "al" → {op: "al"} */
  function ops(text, def, words, min, max, hi) {
    var t = tokens(text);
    if (!t.length) fail("girdi boş");
    if (t.length > hi) fail("en fazla " + hi + " işlem girilebilir");
    return t.map(function (s) {
      var m = /^([a-zçğıöşü]+)\s*(-?\d+)?$/i.exec(s), w;
      if (/^-?\d+$/.test(s)) return { op: def, x: int(s, min, max) };
      if (!m) fail("“" + s + "” anlaşılamadı");
      w = m[1].toLowerCase();
      if (!(w in words)) fail("“" + m[1] + "” işlemi bu laboratuvarda yok");
      var need = words[w];
      if (need.arg && m[2] == null) fail("“" + s + "”: işlemin bir sayısı olmalı");
      if (!need.arg && m[2] != null) fail("“" + s + "”: bu işlem sayı almaz");
      return { op: need.op, x: m[2] != null ? int(m[2], min, max) : null };
    });
  }
  function edges(text, maxN, weighted, directed) {
    var t = tokens(text), E = [], n = 0;
    if (!t.length) fail("girdi boş");
    if (t.length > 24) fail("en fazla 24 kenar girilebilir");
    t.forEach(function (s) {
      var re = weighted ? /^(\d+)\s*[-–>]\s*(\d+)\s*:\s*(-?\d+)$/ : /^(\d+)\s*[-–>]\s*(\d+)$/;
      var m = re.exec(s);
      if (!m) fail("“" + s + "” kenar biçiminde değil (ör. " + (weighted ? (directed ? "0>1:5" : "0-1:5") : "0-1") + ")");
      var u = int(m[1], 0, maxN - 1), v = int(m[2], 0, maxN - 1);
      if (u === v) fail("“" + s + "”: düğüm kendine bağlanamaz");
      var e = { u: u, v: v };
      if (weighted) e.w = int(m[3], 1, 99);
      E.forEach(function (f) {
        if ((f.u === u && f.v === v) || (!directed && f.u === v && f.v === u)) fail("“" + s + "” kenarı iki kez yazılmış");
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
    if (!n) return { h: 40, s: T(W / 2, 24, p.empty || "boş liste (NULL)", "lab-n", "middle") };
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
          var tx = x0 + j * sp + (j > i ? 6 : bw - 22), dep = 16 + 5 * Math.abs(j - i);
          back = Math.max(back, dep);
          s += '<path class="lab-a" d="M' + r1(sx) + " " + r1(y0 + bh) + " C" + r1(sx) + " " + r1(y0 + bh + dep) + " " + r1(tx) + " " + r1(y0 + bh + dep) + " " + r1(tx) + " " + r1(y0 + bh + 1) + '" marker-end="url(#' + mk + ')"/>';
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
    if (!n && !p.head) s += T((W - extraW) / 2, 30, p.empty || "boş ağaç (NULL)", "lab-n", "middle");
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
      s += R(pos.H.x - 16, pos.H.y - 11, 32, 22, cl("lab-box", p.headHl), 4) + T(pos.H.x, pos.H.y + 4, "baş", "lab-v", "middle", ' style="font-size:11px"');
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
    if (!p.list.length) return { h: 40, s: T(W / 2, 24, "boş liste (NULL)", "lab-n", "middle") };
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
    return '<svg class="lab-svg" viewBox="0 0 ' + VW + " " + r1(Math.max(y, 40)) + '" preserveAspectRatio="xMidYMin meet" role="img" aria-label="Yapının çizimi">' + defs + body + "</svg>";
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
    label: "Girdi (sayı = ekle, al)",
    parse: function (text) { return ops(text, "ekle", { al: { op: "al" }, a: { op: "al" } }, -999, 999, 30); },
    run: function (list, mode, Tr) {
      var M = 6, q = [], on = 0, arka = 0, x = null, yeni = null, res = [];
      for (var i = 0; i < M; i++) q.push(null);
      function used(i) { var k = on; while (k !== arka) { k = (k + 1) % M; if (k === i) return true; } return false; }
      Tr.varsFn = function () {
        var v = [["MAX_QUEUE_SIZE", String(M)], ["on", String(on)], ["arka", String(arka)]];
        if (yeni !== null) v.push(["yeni", String(yeni)]);
        if (x !== null) v.push(["x", String(x)]);
        return v;
      };
      Tr.viewFn = function (ex) {
        var hl = {};
        for (var i = 0; i < M; i++) if (q[i] !== null && !used(i)) hl[i] = "is-dim";
        if (ex.look != null) hl[ex.look] = "is-look";
        var ptr = [["on", on], ["arka", arka]];
        if (yeni !== null) ptr.push(["yeni", yeni]);
        return [{ t: "ring", name: "kuyruk", cells: q.slice(), hl: hl, ptr: ptr }];
      };
      Tr.fn("kuyruk_ekle");
      Tr.at(null, "Başlangıçta kuyruk boş: <code>on = arka = 0</code>. Dizide " + M + " yuva var; dairesel kuyruk en çok " + (M - 1) + " öğe tutar, çünkü bir yuva dolu ile boşu ayırmak için boş bırakılır.");
      list.forEach(function (o) {
        x = null; yeni = null;
        if (o.op === "ekle") {
          Tr.fn("kuyruk_ekle");
          yeni = (arka + 1) % M;
          Tr.at("e1", "<code>kuyruk_ekle(" + o.x + ")</code> çağrıldı: <code>yeni = (arka + 1) % " + M + " = (" + arka + " + 1) % " + M + " = " + yeni + "</code>.", { look: yeni });
          if (yeni === on) {
            Tr.at("e2", "<code>yeni == on</code> (" + yeni + "): arka bir adım ilerlese öne çarpacak, yani kuyruk dolu. " + o.x + " eklenmeden <code>false</code> döner; <code>arka</code> değişmez.", { look: yeni });
            Tr.print("ekle(" + o.x + ") → false\n"); res.push("ekle " + o.x + " false");
            yeni = null;
            return;
          }
          Tr.at("e2", "<code>yeni</code> (" + yeni + ") ile <code>on</code> (" + on + ") farklı: kuyrukta yer var.", { look: yeni });
          arka = yeni; q[yeni] = o.x;
          Tr.at("e3", "<code>arka = " + yeni + "</code> ve <code>kuyruk[" + yeni + "] = " + o.x + "</code>: " + o.x + " kuyruğun arkasına yazıldı.");
          Tr.at("e4", "<code>true</code> döner; kuyrukta artık " + size() + " öğe var.");
          Tr.print("ekle(" + o.x + ") → true\n"); res.push("ekle " + o.x + " true");
        } else {
          Tr.fn("kuyruk_al");
          if (on === arka) {
            Tr.at("a1", "<code>kuyruk_al</code> çağrıldı. <code>on == arka</code> (" + on + "): kuyruk boş; alınacak öğe yok, <code>false</code> döner.");
            Tr.print("al → false\n"); res.push("al false");
            return;
          }
          Tr.at("a1", "<code>kuyruk_al</code> çağrıldı. <code>on</code> (" + on + ") ile <code>arka</code> (" + arka + ") farklı: kuyruk boş değil.");
          on = (on + 1) % M;
          Tr.at("a2", "<code>on = (on + 1) % " + M + " = " + on + "</code>: <code>on</code> artık öndeki öğenin yuvasını gösterir.", { look: on });
          x = q[on];
          Tr.at("a3", "<code>*x = kuyruk[" + on + "] = " + x + "</code> ve <code>true</code> döner. Yuvadaki değer silinmez; yalnızca kuyruğun dışında kalır (soluk gösterilir).", { look: on });
          Tr.print("al → " + x + "\n"); res.push("al " + x);
        }
      });
      function size() { return (arka - on + M) % M; }
      x = null; yeni = null;
      Tr.fn(Tr.cur);
      Tr.at(null, "İşlemler bitti: <code>on = " + on + "</code>, <code>arka = " + arka + "</code>, kuyrukta " + size() + " öğe var.");
      res.push("on " + on + " arka " + arka);
      return res.join("\n");
    }
  };

  /* ---------- 06: bağlı yığın ---------- */
  models.lstack = {
    label: "Girdi (sayı = push, pop)",
    parse: function (text) {
      var l = ops(text, "push", { pop: { op: "pop" }, p: { op: "pop" } }, -999, 999, 24), size = 0;
      l.forEach(function (o) { size += o.op === "push" ? 1 : (size ? -1 : 0); if (size > 7) fail("yığında aynı anda en fazla 7 düğüm çizilebilir"); });
      return l;
    },
    run: function (list, mode, Tr) {
      var nodes = {}, top = null, yeni = null, eski = null, x = null, idc = 0, res = [], freed = null;
      function chain() { var a = [], p = top; while (p != null) { a.push(p); p = nodes[p].next; } return a; }
      Tr.varsFn = function () {
        var v = [["top", ptrTo(nodes, top)]];
        if (yeni != null) v.push(["yeni", ptrTo(nodes, yeni)]);
        if (eski !== null) v.push(["eski", eski === "N" ? "NULL" : ptrTo(nodes, eski)]);
        if (x !== null) v.push(["*x", String(x)]);
        return v;
      };
      Tr.viewFn = function () {
        var order = chain(), ids = [];
        [yeni, eski === "N" ? null : eski].forEach(function (k) { if (k != null && order.indexOf(k) < 0 && ids.indexOf(k) < 0) ids.push(k); });
        ids = ids.concat(order);
        var ptrs = [["top", top]];
        if (yeni != null) ptrs.push(["yeni", yeni]);
        if (eski !== null && eski !== "N") ptrs.push(["eski", eski]);
        return [{ t: "list", empty: "boş yığın: top = NULL", nodes: ids.map(function (k) { var d = nodes[k]; return { id: k, v: d.v, next: d.next, hl: k === freed ? "is-dim" : "" }; }), ptrs: ptrs }];
      };
      Tr.fn("push");
      Tr.at(null, "Başlangıçta yığın boş: <code>top = NULL</code>. Her <code>push</code> yeni bir düğüm ayırır ve onu en üste bağlar; <code>pop</code> en üstteki düğümü çıkarıp belleğini geri verir.");
      list.forEach(function (o) {
        yeni = null; eski = null; x = null; freed = null;
        if (o.op === "push") {
          Tr.fn("push");
          var id = "n" + (idc++);
          nodes[id] = { v: "?", next: null };
          yeni = id;
          Tr.at("p1", "<code>push(&amp;top, " + o.x + ")</code>: <code>malloc</code> yeni bir düğüm ayırdı; alanları henüz atanmadı.");
          Tr.at("p2", "<code>yeni</code> NULL değil, yani bellek ayrılabildi.");
          nodes[id].v = o.x;
          Tr.at("p3", "<code>yeni-&gt;deger = " + o.x + "</code>.");
          nodes[id].next = top;
          Tr.at("p4", "<code>yeni-&gt;bag = *top</code>: yeni düğüm eski üstü (" + (top == null ? "NULL" : nodes[top].v) + ") gösterir. Bu satır önce gelmeli; yoksa eski liste kaybolur.");
          top = id;
          Tr.at("p5", "<code>*top = yeni</code>: yığının üstü artık " + o.x + ".");
          Tr.at("p6", "<code>true</code> döner; yığında " + chain().length + " düğüm var.");
          Tr.print("push(" + o.x + ") → true\n"); res.push("push " + o.x + " true");
        } else {
          Tr.fn("pop");
          eski = top == null ? "N" : top;
          Tr.at("o1", "<code>pop(&amp;top, &amp;x)</code>: <code>eski = *top</code> " + (top == null ? "NULL oldu." : "en üstteki düğümü (" + nodes[top].v + ") gösterir. Yeni düğüm ayrılmaz."));
          if (top == null) {
            Tr.at("o2", "<code>eski == NULL</code>: yığın boş; <code>false</code> döner.");
            Tr.print("pop → false\n"); res.push("pop false");
            return;
          }
          Tr.at("o2", "<code>eski</code> NULL değil: yığın boş değil.");
          x = nodes[eski].v;
          Tr.at("o3", "<code>*x = eski-&gt;deger = " + x + "</code>.");
          top = nodes[eski].next;
          Tr.at("o4", "<code>*top = eski-&gt;bag</code>: üst bir düğüm ilerledi; yeni üst " + (top == null ? "NULL (yığın boşaldı)" : nodes[top].v) + ".");
          freed = eski;
          Tr.at("o5", "<code>free(eski)</code>: düğümün belleği geri verildi; <code>eski</code> artık kullanılmamalı.");
          var keep = eski; eski = null; freed = null; delete nodes[keep];
          Tr.at("o6", "<code>true</code> döner; çıkan değer " + x + ".");
          Tr.print("pop → " + x + "\n"); res.push("pop " + x);
        }
      });
      yeni = null; eski = null; x = null;
      var c = chain().map(function (k) { return nodes[k].v; });
      Tr.at(null, "İşlemler bitti. Yığın üstten alta: " + (c.length ? c.join(", ") : "boş") + ".");
      res.push("yigit " + c.join(" "));
      return res.join("\n");
    }
  };

  /* ---------- 08: postfix hesaplama ---------- */
  models.peval = {
    label: "Girdi (postfix ifade, tek basamaklı sayılar)",
    parse: function (text) {
      var e = text.replace(/\s+/g, "");
      if (!e.length) fail("ifade boş");
      if (e.length > 21) fail("ifade en fazla 21 karakter olabilir");
      if (!/^[0-9+\-*\/]+$/.test(e)) fail("yalnızca rakamlar ve + − * / kullanılabilir");
      var d = 0;
      for (var i = 0; i < e.length; i++) {
        if (/\d/.test(e[i])) d++;
        else { if (d < 2) fail("“" + e[i] + "” işleci için yığında iki işlenen yok (" + (i + 1) + ". karakter)"); d--; }
      }
      if (d !== 1) fail("ifadenin sonunda yığında tek değer kalmalı; " + d + " değer kalıyor");
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
      Tr.at(null, "<code>eval(\"" + esc(e) + "\")</code>: ifade soldan sağa okunur. İşlenen yığına itilir; işleç gelince üstteki iki değer alınır, sonuç geri itilir.");
      for (n = 0; n < e.length; n++) {
        c = null; op1 = null; op2 = null;
        Tr.at("for", "<code>expr[" + n + "]</code> = '" + esc(e[n]) + "', dizgi sonu değil; döngü sürer.");
        c = e[n];
        Tr.at("c", "<code>c = '" + esc(c) + "'</code>.");
        if (/\d/.test(c)) {
          y[++top] = +c;
          Tr.at("d", "'" + c + "' bir rakam: <code>y[++top] = '" + c + "' - '0'</code>; " + c + " yığına itildi, <code>top = " + top + "</code>.");
        } else {
          op2 = y[top--]; op1 = y[top--];
          Tr.at("o", "'" + esc(c) + "' bir işleç: önce sağ işlenen <code>op2 = " + fmtF(op2) + "</code>, sonra sol işlenen <code>op1 = " + fmtF(op1) + "</code> yığından alındı.");
          var r = c === "+" ? op1 + op2 : c === "-" ? op1 - op2 : c === "*" ? op1 * op2 : op1 / op2;
          r = Math.fround(r);
          y[++top] = r;
          Tr.at(c, "<code>op1 " + esc(c) + " op2 = " + fmtF(op1) + " " + esc(c) + " " + fmtF(op2) + " = " + fmtF(r) + "</code> yığına itildi.");
          res.push(c + " " + r.toFixed(6));
        }
      }
      c = null; op1 = null; op2 = null;
      Tr.at("for", "<code>expr[" + n + "]</code> = '\\0': ifade bitti, döngüden çıkılır.");
      Tr.at("r", "<code>return y[top]</code>: yığında kalan tek değer sonuçtur: <b>" + fmtF(y[top]) + "</b>.");
      Tr.print("eval → " + fmtF(y[top]) + "\n");
      res.push("sonuc " + y[top].toFixed(6));
      return res.join("\n");
    }
  };

  /* ---------- 08: infix → postfix ---------- */
  models.postfix = {
    label: "Girdi (infix ifade, ör. a*(b+c)-d)",
    parse: function (text) {
      var e = text.replace(/\s+/g, "");
      if (!e.length) fail("ifade boş");
      if (e.length > 19) fail("ifade en fazla 19 karakter olabilir");
      if (!/^[a-zA-Z0-9+\-*\/%()]+$/.test(e)) fail("yalnızca harf, rakam, + − * / % ve parantez kullanılabilir");
      var d = 0, prev = "op";
      for (var i = 0; i < e.length; i++) {
        var ch = e[i], kind = /[a-zA-Z0-9]/.test(ch) ? "x" : ch === "(" ? "(" : ch === ")" ? ")" : "op";
        if (kind === "(") { d++; if (prev === "x" || prev === ")") fail((i + 1) + ". karakterdeki “(” önünde işleç olmalı"); }
        else if (kind === ")") { d--; if (d < 0) fail((i + 1) + ". karakterdeki “)” için açılan parantez yok"); if (prev !== "x" && prev !== ")") fail((i + 1) + ". karakterdeki “)” önünde işlenen olmalı"); }
        else if (kind === "x") { if (prev === "x" || prev === ")") fail("işlenenler tek karakterdir; " + (i + 1) + ". karakterden önce işleç olmalı"); }
        else if (prev === "op" || prev === "(") fail((i + 1) + ". karakterdeki “" + ch + "” işleci için sol işlenen yok");
        prev = kind;
      }
      if (d !== 0) fail("açılan parantezlerden " + d + " tanesi kapanmamış");
      if (prev === "op") fail("ifade bir işleçle bitemez");
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
          { t: "arr", name: "cikti", cells: oc, ptr: [["k", k]], cw: 19 }];
      };
      Tr.fn("postfix");
      Tr.at(null, "<code>postfix(\"" + esc(e) + "\", cikti)</code>: yığının dibinde <code>'#'</code> var (isp = −1); işlenenler doğrudan çıktıya yazılır, işleçler önceliklerine göre yığında bekletilir.");
      for (pos = 0; pos < e.length; pos++) {
        var ch = e[pos];
        Tr.at("for", "<code>*e = '" + esc(ch) + "'</code>: dizgi bitmedi.");
        if (/[a-zA-Z0-9]/.test(ch)) {
          out[k++] = ch;
          Tr.at("alnum", "'" + ch + "' bir işlenen: <code>cikti[k++] = '" + ch + "'</code>; çıktı şimdi \"" + out.join("") + "\".");
        } else if (ch === ")") {
          Tr.at("rp", "')' geldi: '(' bulunana dek yığındakiler çıktıya aktarılır.");
          while (y[top] !== "(") {
            Tr.at("rpw", "<code>y[top] = '" + esc(y[top]) + "'</code>, '(' değil.");
            out[k++] = y[top--];
            Tr.at("rpo", "'" + esc(out[k - 1]) + "' yığından çıktıya alındı: \"" + out.join("") + "\".");
          }
          Tr.at("rpw", "<code>y[top] = '('</code>: döngü durur.");
          top--;
          Tr.at("rpt", "<code>top--</code>: '(' atıldı; parantezler çıktıya yazılmaz.");
        } else {
          Tr.at("op", "'" + esc(ch) + "' bir işleç: yığındaki işlecin önceliği <code>isp</code>, gelenin önceliği <code>icp</code> ile karşılaştırılır.");
          while (ISP[y[top]] >= ICP[ch]) {
            Tr.at("opw", "<code>isp('" + esc(y[top]) + "') = " + ISP[y[top]] + " ≥ icp('" + esc(ch) + "') = " + ICP[ch] + "</code>: yığındaki işleç önce yazılmalı.");
            out[k++] = y[top--];
            Tr.at("opo", "'" + esc(out[k - 1]) + "' çıktıya alındı: \"" + out.join("") + "\".");
          }
          Tr.at("opw", "<code>isp('" + esc(y[top]) + "') = " + ISP[y[top]] + " &lt; icp('" + esc(ch) + "') = " + ICP[ch] + "</code>: döngü durur.");
          y[++top] = ch;
          Tr.at("push", "<code>y[++top] = '" + esc(ch) + "'</code>: gelen işleç yığına itildi.");
        }
      }
      Tr.at("for", "<code>*e = '\\0'</code>: ifade bitti.");
      while (top > 0) {
        Tr.at("end", "<code>top = " + top + " &gt; 0</code>: yığında kalan '" + esc(y[top]) + "' çıktıya alınacak.");
        out[k++] = y[top--];
        Tr.at("end", "Çıktı: \"" + out.join("") + "\".");
      }
      Tr.at("end", "<code>top = 0</code>: yığında yalnızca '#' kaldı.");
      Tr.at("fin", "<code>cikti[k] = '\\0'</code>: postfix ifade <b>" + esc(out.join("")) + "</b>.");
      Tr.print(out.join("") + "\n");
      return out.join("");
    }
  };

  /* ---------- 11: ikili arama ağacı ---------- */
  models.bst = {
    label: "Girdi (sayı = ekle, ara 30, sil 30)",
    parse: function (text) {
      var l = ops(text, "ekle", { ara: { op: "ara", arg: 1 }, sil: { op: "sil", arg: 1 }, ekle: { op: "ekle", arg: 1 } }, 0, 999, 24), c = 0;
      l.forEach(function (o) { if (o.op === "ekle") c++; });
      if (c > 15) fail("en fazla 15 ekleme yapılabilir");
      return l;
    },
    run: function (list, mode, Tr) {
      var N = {}, kok = null, idc = 0, res = [], V = {}, P = {}, extra = null;
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
      Tr.at(null, "Başlangıçta ağaç boş: <code>kok = NULL</code>. Her işlem kökten başlayıp karşılaştırmalarla tek bir yol boyunca iner.");
      list.forEach(function (o) {
        var x = o.x; V = { x: x }; P = {}; extra = null;
        if (o.op === "ekle") {
          Tr.fn("arama_agacina_ekle");
          var q = null, p = kok;
          V.q = "NULL"; V.p = nm(p); P = { p: p };
          Tr.at("e1", "<code>arama_agacina_ekle(" + x + ", &amp;kok)</code>: <code>q = NULL</code>, <code>p = *L</code> (" + (p == null ? "boş ağaç" : "kök " + N[p].v) + ").", { look: p });
          while (true) {
            if (p == null) { Tr.at("e2", "<code>p == NULL</code>: inilecek düğüm kalmadı; " + x + " ağaçta yok, eklenecek yer bulundu."); break; }
            Tr.at("e2", "<code>p</code> NULL değil (" + N[p].v + "): döngü sürer.", { look: p });
            q = p; V.q = nm(q); P.q = q;
            Tr.at("e3", "<code>q = p</code>: <code>q</code> bir adım geride kalarak ebeveyni tutar.", { look: p });
            if (x < N[p].v) { p = N[p].l; V.p = nm(p); P.p = p; Tr.at("e4", x + " &lt; " + N[q].v + ": sola inilir, <code>p = p-&gt;solcocuk</code> (" + nm(p) + ").", { look: p }); }
            else if (x > N[p].v) { Tr.at("e4", x + " &lt; " + N[p].v + " değil.", { look: p }); p = N[p].r; V.p = nm(p); P.p = p; Tr.at("e5", x + " &gt; " + N[q].v + ": sağa inilir, <code>p = p-&gt;sagcocuk</code> (" + nm(p) + ").", { look: p }); }
            else {
              Tr.at("e4", x + " &lt; " + N[p].v + " değil.", { look: p });
              Tr.at("e5", x + " &gt; " + N[p].v + " de değil.", { look: p });
              Tr.at("e6", x + " zaten ağaçta: \"Benzer deger var.\" yazılır ve <code>FALSE</code> döner. Ağaç değişmez.", { look: p });
              Tr.print("Benzer deger var.\n"); res.push("ekle " + x + " FALSE");
              return;
            }
          }
          var r = "n" + (idc++); N[r] = { v: x, l: null, r: null }; extra = r; V.r = "→" + x;
          Tr.at("e7", "<code>r = ogeal()</code>: yeni düğüm ayrıldı; iki çocuğu da NULL.");
          Tr.at("e8", "<code>r-&gt;veri = " + x + "</code>.");
          extra = null;
          if (kok == null) { kok = r; Tr.at("e9", "<code>*L == NULL</code>: ağaç boştu, yeni düğüm kök oldu.", { done: r }); }
          else if (x < N[q].v) { Tr.at("e9", "<code>*L</code> NULL değil.", { look: q }); N[q].l = r; Tr.at("e10", x + " &lt; " + N[q].v + ": <code>q-&gt;solcocuk = r</code>; " + x + ", " + N[q].v + " düğümünün sol çocuğu oldu.", { done: r }); }
          else { Tr.at("e9", "<code>*L</code> NULL değil.", { look: q }); Tr.at("e10", x + " &lt; " + N[q].v + " değil.", { look: q }); N[q].r = r; Tr.at("e11", x + " &gt; " + N[q].v + ": <code>q-&gt;sagcocuk = r</code>; " + x + ", " + N[q].v + " düğümünün sağ çocuğu oldu.", { done: r }); }
          Tr.at("e12", "<code>TRUE</code> döner.", { done: r });
          Tr.print("ekle(" + x + ") → TRUE\n"); res.push("ekle " + x + " TRUE");
        } else if (o.op === "ara") {
          Tr.fn("arama_agacinda_ara");
          var L = kok; V.L = nm(L); P = { L: L };
          Tr.at(null, "<code>arama_agacinda_ara(" + x + ", kok)</code> çağrıldı; <code>L</code> kökten başlar.", { look: L });
          while (true) {
            if (L == null) {
              Tr.at("a1", "<code>L == NULL</code>: inilecek alt ağaç kalmadı.");
              Tr.at("a5", x + " ağaçta yok: <code>NULL</code> döner.");
              Tr.print("ara(" + x + ") → NULL\n"); res.push("ara " + x + " NULL");
              return;
            }
            Tr.at("a1", "<code>L</code> NULL değil (" + N[L].v + ").", { look: L });
            if (x === N[L].v) {
              Tr.at("a2", x + " == " + N[L].v + ": bulundu, düğümün adresi döner.", { done: L });
              Tr.print("ara(" + x + ") → bulundu\n"); res.push("ara " + x + " bulundu");
              return;
            }
            Tr.at("a2", x + " ≠ " + N[L].v + ".", { look: L });
            var was = N[L].v;
            if (x < was) { L = N[L].l; V.L = nm(L); P.L = L; Tr.at("a3", x + " &lt; " + was + ": sol alt ağaca inilir, <code>L = L-&gt;solcocuk</code> (" + nm(L) + ").", { look: L }); }
            else { Tr.at("a3", x + " &lt; " + was + " değil.", { look: L }); L = N[L].r; V.L = nm(L); P.L = L; Tr.at("a4", x + " &gt; " + was + ": sağ alt ağaca inilir, <code>L = L-&gt;sagcocuk</code> (" + nm(L) + ").", { look: L }); }
          }
        } else {
          Tr.fn("sil");
          var pp = kok, bag = "&amp;kok", bagRef = { o: null, s: null };
          V.p = nm(pp); V.bag = "&kok"; P = { p: pp };
          Tr.at("s1", "<code>sil(" + x + ", &amp;kok)</code>: <code>p = *L</code>, <code>bag = L</code>; <code>bag</code>, p'yi gösteren işaretçinin adresidir.", { look: pp });
          while (true) {
            if (pp == null) { Tr.at("s2", "<code>p == NULL</code>: arama bitti."); break; }
            if (N[pp].v === x) { Tr.at("s2", "<code>p-&gt;veri == " + x + "</code>: silinecek düğüm bulundu.", { look: pp }); break; }
            Tr.at("s2", N[pp].v + " ≠ " + x + ": aramaya devam.", { look: pp });
            var left = x < N[pp].v;
            bagRef = { o: pp, s: left ? "l" : "r" }; V.bag = "&(" + N[pp].v + ")->" + (left ? "solcocuk" : "sagcocuk");
            Tr.at("s3", x + (left ? " &lt; " : " &gt; ") + N[pp].v + ": <code>bag = &amp;p-&gt;" + (left ? "solcocuk" : "sagcocuk") + "</code>.", { look: pp });
            pp = left ? N[pp].l : N[pp].r; V.p = nm(pp); P.p = pp;
            Tr.at("s4", "<code>p = *bag</code> (" + nm(pp) + ").", { look: pp });
          }
          if (pp == null) {
            Tr.at("s5", x + " ağaçta yok: yordam bir şey yapmadan döner.");
            Tr.print("sil(" + x + ") → yok\n"); res.push("sil " + x + " yok");
            return;
          }
          Tr.at("s5", "<code>p</code> NULL değil.", { look: pp });
          if (N[pp].l != null && N[pp].r != null) {
            Tr.at("s6", N[pp].v + " düğümünün iki çocuğu var: yerine sol alt ağacın en büyüğü konacak.", { look: pp });
            var bo = pp, bs = "l"; V.b = "&(" + N[pp].v + ")->solcocuk";
            Tr.at("s7", "<code>b = &amp;p-&gt;solcocuk</code>: sol alt ağacın kökü " + N[N[pp].l].v + ".", { look: N[pp].l });
            var cur = N[pp].l;
            while (N[cur].r != null) {
              Tr.at("s8", N[cur].v + " düğümünün sağ çocuğu var: sağa inilir.", { look: cur });
              bo = cur; bs = "r"; V.b = "&(" + N[cur].v + ")->sagcocuk"; cur = N[cur].r;
              Tr.at("s9", "<code>b = &amp;(*b)-&gt;sagcocuk</code> (" + N[cur].v + ").", { look: cur });
            }
            Tr.at("s8", N[cur].v + " düğümünün sağ çocuğu yok: sol alt ağacın en büyüğü " + N[cur].v + ".", { look: cur });
            N[pp].v = N[cur].v;
            Tr.at("s10", "<code>p-&gt;veri = " + N[cur].v + "</code>: değer silinecek düğümün yerine taşındı.", { look: cur });
            bagRef = { o: bo, s: bs }; V.bag = V.b; pp = cur; V.p = nm(pp); P = { p: pp };
            Tr.at("s11", "<code>bag = b; p = *b</code>: artık en çok bir çocuğu olan bu düğüm silinecek.", { look: pp });
          } else Tr.at("s6", N[pp].v + " düğümünün en çok bir çocuğu var.", { look: pp });
          var child = N[pp].l != null ? N[pp].l : N[pp].r;
          if (bagRef.o == null) kok = child; else N[bagRef.o][bagRef.s] = child;
          var gone = pp; extra = gone;
          Tr.at("s12", "<code>*bag = " + (child == null ? "NULL" : "çocuk (" + N[child].v + ")") + "</code>: düğüm ağaçtan ayrıldı; " + (child == null ? "yaprak olduğu için yerine NULL yazıldı." : "tek çocuğu ebeveynine bağlandı."), { dim: gone });
          extra = null; delete N[gone]; V.p = "(serbest)"; P = {};
          Tr.at("s13", "<code>free(p)</code>: düğümün belleği geri verildi.");
          Tr.print("sil(" + x + ") → silindi\n"); res.push("sil " + x + " silindi");
        }
      });
      V = {}; P = {}; extra = null;
      Tr.at(null, "İşlemler bitti. Kök ortada sıra: " + (inorder(kok, []).join(" ") || "boş") + " — artan sıradadır.");
      res.push("inorder " + inorder(kok, []).join(" "));
      res.push("preorder " + preorder(kok, []).join(" "));
      return res.join("\n");
    }
  };

  /* ---------- 02: dinamik dizi (realloc ile ikiye katlama) ---------- */
  models.dyn = {
    label: "Girdi (virgülle ayrılmış sayılar)",
    parse: function (text) { return nums(text, -999, 999, 1, 16); },
    run: function (list, mode, Tr) {
      var veri = null, boyut = 0, kap = 0, kopya = 0, x = null, yeni = null, res = [];
      Tr.varsFn = function () {
        var v = [["x", x == null ? "–" : String(x)], ["boyut", String(boyut)], ["kap", String(kap)]];
        if (yeni != null) v.push(["yeni", String(yeni)]);
        v.push(["toplam kopya", String(kopya)]);
        return v;
      };
      Tr.viewFn = function (ex) {
        if (veri == null) return [{ t: "arr", name: "veri", cells: [], noIdx: true }];
        var hl = {}; for (var i = 0; i < kap; i++) if (i >= boyut) hl[i] = "";
        if (ex.look != null) hl[ex.look] = "is-look";
        return [{ t: "arr", name: "veri", cells: veri.slice(0, kap).map(function (v, i) { return i < boyut ? v : null; }), hl: hl, ptr: [["boyut", boyut]], cw: 22 }];
      };
      Tr.fn("ekle");
      Tr.at(null, "Boş dinamik dizi: <code>{veri = NULL, boyut = 0, kap = 0}</code>. Dolunca kapasite ikiye katlanır; her büyütmede eski öğeler yeni bloğa taşınır.");
      list.forEach(function (v) {
        x = v; yeni = null;
        if (boyut === kap) {
          Tr.at("c", "<code>ekle(&amp;d, " + v + ")</code>: <code>boyut == kap</code> (" + boyut + "): dizi dolu, büyütülmeli.");
          yeni = kap ? 2 * kap : 1;
          Tr.at("y", "<code>yeni = " + (kap ? "2 * kap" : "1") + " = " + yeni + "</code>" + (kap ? ": kapasite ikiye katlanır." : ": ilk blok tek hücreliktir."));
          var t = []; for (var i = 0; i < yeni; i++) t.push(veri && i < boyut ? veri[i] : null);
          Tr.at("r", "<code>realloc</code> " + yeni + " hücrelik blok verdi; eski " + boyut + " öğe yeni bloğa taşındı.");
          kopya += boyut;
          Tr.at("n", "<code>t</code> NULL değil: bellek ayrılabildi.");
          veri = t;
          Tr.at("v", "<code>d-&gt;veri = t</code>: dizi artık yeni bloğu gösterir (toplam " + kopya + " kopya).");
          kap = yeni;
          Tr.at("k", "<code>d-&gt;kap = " + kap + "</code>.");
        } else Tr.at("c", "<code>ekle(&amp;d, " + v + ")</code>: <code>boyut</code> (" + boyut + ") &lt; <code>kap</code> (" + kap + "): yer var, büyütme gerekmez.");
        yeni = null;
        veri[boyut++] = v;
        Tr.at("w", "<code>d-&gt;veri[" + (boyut - 1) + "] = " + v + "</code>, ardından <code>boyut</code> " + boyut + " oldu.", { look: boyut - 1 });
        Tr.at("ret", "1 döner. Şimdiye dek " + boyut + " ekleme için toplam " + kopya + " öğe kopyalandı; ekleme başına ortalama " + fmtF(kopya / boyut) + ".");
        Tr.print("ekle(" + v + "): boyut " + boyut + ", kap " + kap + "\n");
        res.push("ekle " + v + " boyut " + boyut + " kap " + kap + " kopya " + kopya);
      });
      x = null;
      Tr.at(null, boyut + " ekleme bitti: kapasite " + kap + ", toplam kopya " + kopya + " (en çok 2n). Ekleme başına amortize maliyet O(1)'dir.");
      return res.join("\n");
    }
  };

  /* ---------- 03: ikili arama ---------- */
  models.bsearch = {
    label: "Girdi (aranan: artan sıralı sayılar)",
    parse: function (text) {
      var m = /^\s*(-?\d+)\s*:(.*)$/.exec(text);
      if (!m) fail("biçim “aranan: sayı, sayı, …” olmalı (ör. 18: 4, 13, 18)");
      var a = nums(m[2], -999, 999, 1, 15);
      for (var i = 1; i < a.length; i++) if (a[i] <= a[i - 1]) fail("liste kesin artan sırada olmalı (" + a[i - 1] + ", " + a[i] + ")");
      return { x: int(m[1], -999, 999), a: a };
    },
    run: function (d, mode, Tr) {
      var a = d.a, x = d.x, left = 0, right = a.length - 1, mid = null, tur = 0;
      Tr.varsFn = function () { var v = [["aranan", String(x)], ["left", String(left)], ["right", String(right)]]; if (mid != null) v.push(["middle", String(mid)]); v.push(["tur", String(tur)]); return v; };
      Tr.viewFn = function (ex) {
        var hl = {}; for (var i = 0; i < a.length; i++) if (i < left || i > right) hl[i] = "is-dim";
        if (mid != null) hl[mid] = ex.found ? "is-done" : "is-look";
        var ptr = [["left", left], ["right", right]]; if (mid != null) ptr.push(["middle", mid]);
        return [{ t: "arr", name: "list", cells: a.slice(), hl: hl, ptr: ptr, noDiff: true }];
      };
      Tr.fn("binsearch");
      Tr.at(null, "<code>binsearch(list, " + x + ", 0, " + (a.length - 1) + ")</code>: arama aralığı tüm dizi. Her turda aralığın ortasındaki öğe aranan ile karşılaştırılır ve aralık yarıya iner.");
      while (true) {
        if (left > right) {
          Tr.at("w", "<code>left</code> (" + left + ") &gt; <code>right</code> (" + right + "): aralık boşaldı, döngü biter.");
          Tr.at("nf", x + " listede yok: −1 döner (" + tur + " tur).");
          Tr.print("binsearch → -1\n");
          return "-1 " + tur;
        }
        tur++; mid = null;
        Tr.at("w", left + " ≤ " + right + ": " + tur + ". tur.");
        mid = Math.floor((left + right) / 2);
        Tr.at("m", "<code>middle = (" + left + " + " + right + ") / 2 = " + mid + "</code>; <code>list[" + mid + "] = " + a[mid] + "</code>.");
        var c = a[mid] < x ? -1 : a[mid] > x ? 1 : 0;
        Tr.at("s", "<code>COMPARE(" + a[mid] + ", " + x + ") = " + c + "</code>.");
        if (c === -1) { left = mid + 1; Tr.at("lt", a[mid] + " &lt; " + x + ": aranan sağ yarıda; <code>left = " + left + "</code>."); }
        else if (c === 1) { right = mid - 1; Tr.at("gt", a[mid] + " &gt; " + x + ": aranan sol yarıda; <code>right = " + right + "</code>."); }
        else {
          Tr.at("eq", a[mid] + " == " + x + ": bulundu, <code>" + mid + "</code> döner (" + tur + " tur).", { found: 1 });
          Tr.print("binsearch → " + mid + "\n");
          return mid + " " + tur;
        }
      }
    }
  };

  /* ---------- 03: n-vezir (geri izleme) ---------- */
  models.queens = {
    label: "Girdi (tahta boyutu n, 1–8)",
    parse: function (text) { var t = tokens(text); if (t.length !== 1) fail("tek bir sayı girilmeli"); return int(t[0], 1, 8); },
    run: function (n, mode, Tr) {
      var q = [], depth = 0, calls = [], placed = 0, tries = 0;
      for (var i = 0; i < n; i++) q.push(-1);
      Tr.varsFn = function (ex) {
        var v = [["n", String(n)], ["r", String(depth)]];
        if (ex.c != null) v.push(["c", String(ex.c)]);
        v.push(["q", "[" + q.slice(0, depth).join(", ") + "]"], ["çağrılar", calls.length ? calls.join(" › ") : "–"]);
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
      Tr.at(null, "<code>yerlestir(0, " + n + ")</code>: her satıra bir vezir konur. Bir satırda uygun sütun yoksa çağrı 0 döner ve bir önceki satır sıradaki sütunu dener (geri izleme).");
      function place(r) {
        depth = r; calls.push("yerlestir(" + r + ")");
        if (r === n) {
          Tr.at("base", "<code>r == n</code>: " + n + " vezir de yerleşti, çözüm bulundu; 1 döner.", { done: 1 });
          calls.pop();
          return true;
        }
        Tr.at("base", "<code>r = " + r + "</code> &lt; " + n + ": " + r + ". satıra vezir aranıyor.");
        for (var c = 0; c < n; c++) {
          depth = r;
          Tr.at("for", "Sütun <code>c = " + c + "</code> deneniyor.", { c: c });
          tries++;
          var bad = null;
          for (var k = 0; k < r; k++) if (q[k] === c || Math.abs(q[k] - c) === r - k) { bad = k; break; }
          if (bad != null) {
            Tr.at("if", "<code>uygun(" + r + ", " + c + ")</code> = 0: " + bad + ". satırdaki vezir (sütun " + q[bad] + ") " + (q[bad] === c ? "aynı sütunda" : "aynı çaprazda") + ".", { c: c, bad: bad });
            continue;
          }
          Tr.at("if", "<code>uygun(" + r + ", " + c + ")</code> = 1: üstteki vezirlerle çakışma yok.", { c: c });
          q[r] = c; placed++;
          Tr.at("set", "<code>q[" + r + "] = " + c + "</code>: vezir (" + r + ", " + c + ") karesine kondu.", { show: 1 });
          Tr.at("rec", "<code>yerlestir(" + (r + 1) + ", " + n + ")</code> çağrılır: sıradaki satır.", { show: 1 });
          if (place(r + 1)) {
            depth = r;
            Tr.at("rec", "Alt çağrı 1 döndürdü: çözüm yukarı iletilir.", { done: 1 });
            calls.pop();
            return true;
          }
          depth = r;
          Tr.at("rec", "<code>yerlestir(" + (r + 1) + ")</code> 0 döndü: (" + r + ", " + c + ") çıkmaza götürdü; sıradaki sütun denenecek.", { c: c });
        }
        Tr.at("back", r + ". satırda uygun sütun kalmadı: 0 döner, bir üst satıra geri dönülür.");
        calls.pop();
        return false;
      }
      var ok = place(0);
      depth = ok ? n : 0;
      Tr.at(null, ok ? "Çözüm: <code>q = [" + q.join(", ") + "]</code>; " + tries + " deneme, " + placed + " yerleştirme yapıldı." : n + " × " + n + " tahtada çözüm yok (" + tries + " deneme).", ok ? { done: 1 } : {});
      Tr.print(ok ? "q = " + q.join(" ") + "\n" : "cozum yok\n");
      return (ok ? "q " + q.join(" ") : "yok") + "\ndeneme " + tries + " yerlestirme " + placed;
    }
  };

  /* ---------- 04: tek yönlü bağlı liste ---------- */
  models.slist = {
    label: "Girdi (sayı = sıralı ekle, sil 30)",
    parse: function (text, mode) {
      if (mode === "devrik") return nums(text, -999, 999, 0, 7);
      var l = ops(text, "ekle", { sil: { op: "sil", arg: 1 }, ekle: { op: "ekle", arg: 1 } }, -999, 999, 20), size = 0;
      l.forEach(function (o) { if (o.op === "ekle") size++; if (size > 7) fail("listede aynı anda en fazla 7 düğüm çizilebilir"); });
      return l;
    },
    run: function (list, mode, Tr) {
      var N = {}, bas = null, idc = 0, P = {}, V = {}, fixed = null, last = [], res = [];
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
        var ptrs = [["bas", bas]]; Object.keys(P).forEach(function (k) { if (P[k] != null) ptrs.push([k, P[k]]); });
        return [{ t: "list", nodes: order.map(function (id) { return { id: id, v: N[id].v, next: N[id].next, hl: ex.dim === id ? "is-dim" : ex.look === id ? "is-look" : "" }; }), ptrs: ptrs }];
      };
      function vals() { return chain().map(function (id) { return N[id].v; }); }
      if (mode === "devrik") {
        list.forEach(function (v) { var id = "n" + (idc++); N[id] = { v: v, next: null }; if (fixed) N[fixed[fixed.length - 1]].next = id; else bas = id; fixed = (fixed || []).concat([id]); });
        fixed = fixed || [];
        Tr.fn("liste_devrik_al");
        V = { "*list": nm(bas) };
        Tr.at(null, "Liste: " + (vals().join(" → ") || "boş") + ". <code>liste_devrik_al</code> yeni düğüm ayırmadan yalnızca bağları ters çevirir; üç işaretçi (<code>r</code>, <code>q</code>, <code>p</code>) birlikte ilerler.");
        var p = bas, q = null, r = null;
        P = { p: p }; V = { p: nm(p), q: "NULL", r: "–" };
        Tr.at("d1", "<code>p = *list</code> (" + nm(p) + "), <code>q = NULL</code>.");
        while (true) {
          if (p == null) { Tr.at("d2", "<code>p == NULL</code>: tüm bağlar çevrildi, döngü biter."); break; }
          Tr.at("d2", "<code>p</code> NULL değil (" + N[p].v + ").", { look: p });
          r = q; V.r = nm(r); P.r = r;
          Tr.at("d3", "<code>r = q</code> (" + nm(r) + ").");
          q = p; V.q = nm(q); P.q = q;
          Tr.at("d4", "<code>q = p</code> (" + nm(q) + ").");
          p = N[p].next; V.p = nm(p); P.p = p;
          Tr.at("d5", "<code>p = p-&gt;bag</code> (" + nm(p) + "): p, bağ değişmeden önce ilerletildi.");
          N[q].next = r;
          Tr.at("d6", "<code>q-&gt;bag = r</code>: " + N[q].v + " artık " + (r == null ? "NULL" : r && N[r].v) + " gösteriyor.", { look: q });
        }
        bas = q; V["*list"] = nm(bas);
        Tr.at("d7", "<code>*list = q</code>: eski son düğüm (" + (q == null ? "NULL" : N[q].v) + ") listenin başı oldu.");
        P = {}; V = { "*list": nm(bas) };
        Tr.at(null, "Ters çevrilmiş liste: " + (vals().join(" → ") || "boş") + ".");
        Tr.print(vals().join(" ") + "\n");
        return "liste " + vals().join(" ");
      }
      Tr.fn("sirali_ekle");
      V = { bas: "NULL" };
      Tr.at(null, "Başlangıçta liste boş: <code>bas = NULL</code>. Sayılar <code>sirali_ekle</code> ile artan sırayı bozmadan eklenir; <code>sil</code> değeri arar ve düğümü listeden çıkarır.");
      list.forEach(function (o) {
        P = {}; V = { bas: nm(bas) };
        if (o.op === "ekle") {
          Tr.fn("sirali_ekle");
          var y = "n" + (idc++); N[y] = { v: o.x, next: null };
          var onceki = null, p = bas;
          P = { yeni: y, p: p }; V = { "yeni->deger": String(o.x), onceki: "NULL", p: nm(p) };
          Tr.at("i1", "<code>yeni_oge(" + o.x + ")</code> ile ayrılan düğüm <code>sirali_ekle</code>'ye verildi: <code>onceki = NULL</code>, <code>p = *bas</code>.", { look: y });
          while (p != null && N[p].v < o.x) {
            Tr.at("i2", "<code>p</code> NULL değil ve " + N[p].v + " &lt; " + o.x + ": ilerlenir.", { look: p });
            onceki = p; P.onceki = onceki; V.onceki = nm(onceki);
            Tr.at("i3", "<code>onceki = p</code> (" + N[p].v + ").");
            p = N[p].next; P.p = p; V.p = nm(p);
            Tr.at("i4", "<code>p = p-&gt;bag</code> (" + nm(p) + ").", { look: p });
          }
          Tr.at("i2", p == null ? "<code>p == NULL</code>: listenin sonuna gelindi." : N[p].v + " &lt; " + o.x + " değil: yer bulundu.", { look: p });
          N[y].next = p;
          Tr.at("i5", "<code>yeni-&gt;bag = p</code> (" + nm(p) + "): önce yeni düğüm arkasındakine bağlanır.", { look: y });
          if (onceki == null) { bas = y; V.bas = nm(bas); Tr.at("i6", "<code>onceki == NULL</code>: " + o.x + " listenin başına girdi, <code>*bas = yeni</code>.", { look: y }); }
          else { Tr.at("i6", "<code>onceki</code> NULL değil.", { look: onceki }); N[onceki].next = y; Tr.at("i7", "<code>onceki-&gt;bag = yeni</code>: " + o.x + ", " + N[onceki].v + " düğümünden sonra listeye girdi.", { look: y }); }
          Tr.print("ekle(" + o.x + "): " + vals().join(" ") + "\n");
          res.push("ekle " + o.x + ": " + vals().join(" "));
        } else {
          Tr.fn("sil");
          var on2 = null, q = bas, x = o.x;
          P = { p: q }; V = { x: String(x), onceki: "NULL", p: nm(q) };
          Tr.at("s1", "<code>sil(&amp;bas, " + x + ")</code>: <code>onceki = NULL</code>, <code>p = *bas</code>.", { look: q });
          while (q != null && N[q].v !== x) {
            Tr.at("s2", N[q].v + " ≠ " + x + ": ilerlenir.", { look: q });
            on2 = q; P.onceki = on2; V.onceki = nm(on2);
            Tr.at("s3", "<code>onceki = p</code> (" + N[q].v + ").");
            q = N[q].next; P.p = q; V.p = nm(q);
            Tr.at("s4", "<code>p = p-&gt;bag</code> (" + nm(q) + ").", { look: q });
          }
          Tr.at("s2", q == null ? "<code>p == NULL</code>: liste bitti." : "<code>p-&gt;deger == " + x + "</code>: silinecek düğüm bulundu.", { look: q });
          if (q == null) {
            Tr.at("s5", x + " listede yok: <code>false</code> döner.");
            Tr.print("sil(" + x + ") → false\n"); res.push("sil " + x + " false");
            return;
          }
          Tr.at("s5", "<code>p</code> NULL değil.", { look: q });
          if (on2 == null) { bas = N[q].next; V.bas = nm(bas); Tr.at("s6", "<code>onceki == NULL</code>: silinen baştaki düğüm; <code>*bas = p-&gt;bag</code> (" + nm(bas) + ").", { dim: q }); }
          else { Tr.at("s6", "<code>onceki</code> NULL değil.", { look: on2 }); N[on2].next = N[q].next; Tr.at("s7", "<code>onceki-&gt;bag = p-&gt;bag</code>: " + N[on2].v + " artık " + nm(N[q].next) + " gösteriyor; " + x + " atlandı.", { dim: q }); }
          var g = q; delete P.p; delete N[g]; V.p = "(serbest)";
          Tr.at("s8", "<code>free(p)</code>: düğümün belleği geri verildi.");
          Tr.at("s9", "<code>true</code> döner.");
          Tr.print("sil(" + x + ") → true\n"); res.push("sil " + x + " true");
        }
      });
      P = {}; V = { bas: nm(bas) };
      Tr.at(null, "İşlemler bitti. Liste: " + (vals().join(" → ") || "boş") + ".");
      res.push("liste " + vals().join(" "));
      return res.join("\n");
    }
  };

  /* ---------- 09: genelleştirilmiş liste derinliği ---------- */
  models.glist = {
    label: "Girdi (liste, ör. (a, (b, c), d))",
    parse: function (text) {
      var s = text.replace(/\s+/g, ""), i = 0, idc = 0, count = 0;
      function list() {
        if (s[i] !== "(") fail("liste “(” ile başlamalı (" + (i + 1) + ". karakter)");
        i++;
        var a = [];
        if (s[i] === ")") { i++; return a; }
        while (true) {
          var d = { id: "g" + (idc++) };
          if (s[i] === "(") { d.atom = false; d.sub = list(); }
          else if (/[a-zA-Z0-9]/.test(s[i] || "")) { d.atom = true; d.v = s[i++]; }
          else fail((i + 1) + ". karakterde atom ya da alt liste bekleniyordu");
          a.push(d); count++;
          if (s[i] === ",") { i++; continue; }
          if (s[i] === ")") { i++; return a; }
          fail((i + 1) + ". karakterde “,” ya da “)” bekleniyordu");
        }
      }
      var L = list();
      if (i !== s.length) fail("listeden sonra fazladan karakter var");
      if (count > 14) fail("en fazla 14 öğe çizilebilir");
      return L;
    },
    run: function (L, mode, Tr) {
      var frames = [], cur = null, res;
      function show(d) { if (!d) return "NULL"; return d.atom ? "→" + d.v : "→(alt liste)"; }
      Tr.varsFn = function () {
        var v = [];
        if (cur) { v.push(["p", show(cur.p)], ["m", String(cur.m)]); if (cur.n != null) v.push(["n", String(cur.n)]); }
        v.push(["çağrı derinliği", String(frames.length)]);
        return v;
      };
      Tr.viewFn = function () {
        var hl = {}, ptrs = {};
        frames.forEach(function (f, k) { if (f.p) { (ptrs[f.p.id] = ptrs[f.p.id] || []).push(k === frames.length - 1 ? "p" : "p" + (k + 1)); hl[f.p.id] = k === frames.length - 1 ? "is-look" : "is-done"; } });
        function copy(list) { return list.map(function (d) { return { id: d.id, atom: d.atom, v: d.v, sub: d.sub ? copy(d.sub) : null, hl: hl[d.id] || "" }; }); }
        return [{ t: "glist", list: copy(L), ptrs: ptrs }];
      };
      Tr.fn("derinlik");
      Tr.at(null, "<code>derinlik(L)</code>: her düzey için özyinelemeli bir çağrı açılır. Etiketi 1 olan öğe bir alt liste gösterir; o alt listenin derinliği ayrıca hesaplanır.");
      function depth(list) {
        var f = { p: list.length ? list[0] : null, m: 0, n: null }; frames.push(f); cur = f;
        Tr.at("d1", (frames.length > 1 ? frames.length + ". düzey çağrı: " : "") + "<code>p = L</code>, <code>m = 0</code>.");
        if (!list.length) {
          Tr.at("d2", "<code>L == NULL</code>: boş liste, 0 döner.");
          frames.pop(); cur = frames[frames.length - 1] || null;
          return 0;
        }
        Tr.at("d2", "<code>L</code> NULL değil.");
        for (var k = 0; k <= list.length; k++) {
          f.p = k < list.length ? list[k] : null; f.n = null; cur = f;
          if (!f.p) { Tr.at("d3", "<code>p == NULL</code>: bu düzeyin sonu."); break; }
          Tr.at("d3", "<code>p</code> NULL değil: " + (f.p.atom ? "atom " + f.p.v : "bir alt liste") + ".");
          if (f.p.atom) Tr.at("d4", "<code>p-&gt;isaret == 0</code>: atom, derinliğe katkısı yok.");
          else {
            Tr.at("d4", "<code>p-&gt;isaret == 1</code>: alt listenin derinliği hesaplanacak.");
            Tr.at("d5", "<code>derinlik(p-&gt;L_bag)</code> çağrılır.");
            var n = depth(f.p.sub); cur = f; f.n = n;
            Tr.at("d5", "Alt çağrı döndü: <code>n = " + n + "</code>.");
            if (f.m < n) { f.m = n; Tr.at("d6", "<code>m &lt; n</code>: <code>m = " + n + "</code>."); }
            else Tr.at("d6", "<code>m</code> (" + f.m + ") ≥ <code>n</code>: değişmez.");
          }
          Tr.at("d7", "<code>p = p-&gt;bag</code>: sıradaki öğe.");
        }
        var r = f.m + 1;
        Tr.at("d8", "<code>return m + 1 = " + r + "</code>" + (frames.length > 1 ? ": çağıran düzeye döner." : "."));
        frames.pop(); cur = frames[frames.length - 1] || null;
        return r;
      }
      res = depth(L);
      Tr.at(null, "Listenin derinliği <b>" + res + "</b>.");
      Tr.print("derinlik = " + res + "\n");
      return String(res);
    }
  };

  /* ---------- ağaç girdisi: düzey sırası, boş için - ---------- */
  function levelTree(text, max) {
    var t = tokens(text);
    if (!t.length) fail("girdi boş");
    if (t[0] === "-") return { root: null, N: {} };
    var N = {}, q = [], idc = 0, k = 1, count = 0;
    function mk(s) {
      if (!/^[a-zA-Z0-9]$/.test(s)) fail("“" + s + "”: düğümler tek karakter (harf ya da rakam) olmalı; boş için -");
      var id = "t" + (idc++); N[id] = { v: s, l: null, r: null }; count++; return id;
    }
    var root = mk(t[0]); q.push({ id: root, d: 0 });
    while (q.length && k < t.length) {
      var p = q.shift();
      for (var side = 0; side < 2 && k < t.length; side++) {
        var s = t[k++];
        if (s === "-") continue;
        var c = mk(s); N[p.id][side ? "r" : "l"] = c;
        if (p.d + 1 > 5) fail("ağaç en çok 6 düzey olabilir");
        q.push({ id: c, d: p.d + 1 });
      }
    }
    if (k < t.length) fail("fazladan düğüm var: “" + t[k] + "” bağlanacak ebeveyn yok");
    if (count > max) fail("en fazla " + max + " düğüm çizilebilir");
    return { root: root, N: N };
  }
  function treeOf(N, id, hl) { if (id == null) return null; return { id: id, v: N[id].v, l: treeOf(N, N[id].l, hl), r: treeOf(N, N[id].r, hl), hl: (hl && hl[id]) || "" }; }

  /* ---------- 10: gezinmeler ---------- */
  models.trav = {
    label: "Girdi (düzey sırasıyla düğümler, boş için -)",
    parse: function (text) { return levelTree(text, 15); },
    run: function (T0, mode, Tr) {
      var N = T0.N, out = "", stack = [], visited = {}, cur = null, kq = [], on = 0, arka = 0;
      mode = mode || "ortada";
      var FN = { onde: "kok_onde_dolas", ortada: "kok_ortada_dolas", sonda: "kok_sonda_dolas", duzey: "duzey_dolas" }[mode];
      Tr.varsFn = function () {
        var v = [["L", cur == null ? "NULL" : "→" + N[cur].v]];
        if (mode === "duzey") v.push(["on", String(on)], ["arka", String(arka)]);
        else v.push(["çağrılar", stack.length ? stack.join(" › ") : "–"]);
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
          parts.push({ t: "arr", name: "kuyruk", cells: cells, hl: h2, ptr: [["on", on], ["arka", arka]], cw: 22 });
        }
        return parts;
      };
      Tr.fn(FN);
      var nameT = { onde: "Kök önde (V-L-R): önce kök yazılır, sonra sol ve sağ alt ağaçlar gezilir.", ortada: "Kök ortada (L-V-R): önce sol alt ağaç, sonra kök, sonra sağ alt ağaç.", sonda: "Kök sonda (L-R-V): kök, iki alt ağacı da bittikten sonra yazılır.", duzey: "Düzey sırası: düğümler kökten başlayarak düzey düzey, soldan sağa bir kuyrukla gezilir." }[mode];
      Tr.at(null, nameT);
      function nmS(id) { return id == null ? "NULL" : N[id].v; }
      function rec(id) {
        cur = id; stack.push(id == null ? "NULL" : N[id].v); stack[stack.length - 1] = { toString: function () { return nmS(id); }, id: id };
        if (id == null) {
          Tr.at("if", "<code>" + FN + "(NULL)</code>: <code>L</code> NULL, hiçbir şey yapmadan döner.");
          stack.pop(); return;
        }
        Tr.at("if", "<code>" + FN + "(" + N[id].v + ")</code>: <code>L</code> NULL değil.");
        var vis = function () { cur = id; out += N[id].v; visited[id] = 1; Tr.print(N[id].v); Tr.at("pr", "<code>printf</code>: <b>" + N[id].v + "</b> yazıldı. Çıktı şimdi \"" + out + "\"."); };
        var go = function (side) {
          cur = id;
          var c = N[id][side];
          Tr.at(side, (side === "l" ? "Sol" : "Sağ") + " alt ağaç için <code>" + FN + "(" + nmS(c) + ")</code> çağrılır.");
          rec(c); cur = id;
        };
        if (mode === "onde") { vis(); go("l"); go("r"); }
        else if (mode === "ortada") { go("l"); vis(); go("r"); }
        else { go("l"); go("r"); vis(); }
        cur = id;
        Tr.at("end", N[id].v + " için çağrı bitti; çağırana dönülür.");
        stack.pop();
      }
      if (mode !== "duzey") {
        rec(T0.root); cur = null;
      } else {
        var MAX = 16;
        Tr.at("q0", "<code>on = arka = 0</code>; kuyruk boş.");
        if (T0.root == null) { Tr.at("q1", "<code>L</code> NULL: ağaç boş, dönülür."); }
        else {
          cur = T0.root;
          Tr.at("q1", "<code>L</code> NULL değil.");
          arka = (arka + 1) % MAX; kq[arka] = T0.root;
          Tr.at("q2", "Kök " + N[T0.root].v + " kuyruğa eklendi (<code>arka = " + arka + "</code>).");
          while (true) {
            if (on === arka) { cur = null; Tr.at("q3", "<code>on == arka</code>: kuyruk boş, <code>kuyruk_al</code> NULL döndü; döngü biter."); break; }
            on = (on + 1) % MAX; cur = kq[on];
            Tr.at("q3", "<code>kuyruk_al</code>: öndeki " + N[cur].v + " alındı (<code>on = " + on + "</code>).");
            out += N[cur].v; visited[cur] = 1; Tr.print(N[cur].v);
            Tr.at("q4", "<b>" + N[cur].v + "</b> yazıldı. Çıktı \"" + out + "\".");
            [["l", "q5", "q6", "sol"], ["r", "q7", "q8", "sağ"]].forEach(function (s) {
              var c = N[cur][s[0]];
              if (!c) { Tr.at(s[1], N[cur].v + " düğümünün " + s[3] + " çocuğu yok."); return; }
              Tr.at(s[1], N[cur].v + " düğümünün " + s[3] + " çocuğu " + N[c].v + ".");
              arka = (arka + 1) % MAX; kq[arka] = c;
              Tr.at(s[2], N[c].v + " kuyruğun arkasına eklendi (<code>arka = " + arka + "</code>).");
            });
          }
        }
      }
      cur = null;
      Tr.at(null, "Gezinme bitti: <b>" + (out || "(boş)") + "</b>.");
      return out;
    }
  };

  /* ---------- 12: kılavuzlu ikili ağaç, kök ortada gezinme ---------- */
  models.thread = {
    label: "Girdi (düzey sırasıyla düğümler, boş için -)",
    parse: function (text) { return levelTree(text, 13); },
    run: function (T0, mode, Tr) {
      var N = T0.N, ino = [], out = "", p = null, q = null, look = null;
      (function w(id) { if (id == null) return; w(N[id].l); ino.push(id); w(N[id].r); })(T0.root);
      var K = { H: { v: "baş", lc: T0.root == null ? "H" : T0.root, lt: T0.root == null, rc: "H", rt: false } };
      ino.forEach(function (id, i) {
        var n = N[id];
        K[id] = { v: n.v, lc: n.l != null ? n.l : (i ? ino[i - 1] : "H"), lt: n.l == null, rc: n.r != null ? n.r : (i < ino.length - 1 ? ino[i + 1] : "H"), rt: n.r == null };
      });
      function nm(id) { return id == null ? "–" : id === "H" ? "başlık" : "→" + K[id].v; }
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
      Tr.at(null, "Kılavuzlu ağaç: boş sol bağ kök ortada öncülü, boş sağ bağ ardılı gösterir (kesikli oklar); uçtakiler başlık düğümünü gösterir. Gezinme yığınsız ve özyinelemesizdir.");
      p = "H";
      Tr.at("t1", "<code>p = L</code>: gezinme başlık düğümünden başlar.");
      var guard = 0;
      while (guard++ < 100) {
        Tr.fn("kilavuz_kokortada_dolas");
        Tr.at("t2", "<code>kokortada_ardil_bul(" + (p === "H" ? "başlık" : K[p].v) + ")</code> çağrılır.");
        Tr.fn("kokortada_ardil_bul");
        q = p; var L = p;
        p = K[L].rc; look = K[L].rt ? L + "r" : null;
        Tr.at("a1", "<code>p = L-&gt;sagCocuk</code> (" + nm(p) + ")" + (K[L].rt ? ": bu bir kılavuz." : ": gerçek sağ çocuk."));
        if (!K[L].rt) {
          Tr.at("a2", "<code>L-&gt;sagKilavuz</code> FALSE: sağ alt ağaç var; ardıl, onun en solundaki düğüm.");
          while (!K[p].lt) {
            Tr.at("a3", "<code>p-&gt;solKilavuz</code> FALSE: " + (p === "H" ? "başlık" : K[p].v) + " düğümünün sol çocuğu var.");
            p = K[p].lc;
            Tr.at("a4", "<code>p = p-&gt;solCocuk</code> (" + nm(p) + ").");
          }
          Tr.at("a3", "<code>p-&gt;solKilavuz</code> TRUE: daha sola inilemez.");
        } else Tr.at("a2", "<code>L-&gt;sagKilavuz</code> TRUE: sağ kılavuz doğrudan ardılı gösterir.");
        look = null;
        Tr.at("a5", "Ardıl " + nm(p) + " döner.");
        Tr.fn("kilavuz_kokortada_dolas"); q = null;
        if (p === "H") { Tr.at("t3", "<code>p == L</code>: başlığa dönüldü, gezinme biter."); break; }
        Tr.at("t3", "<code>p</code> başlık değil.");
        out += K[p].v; Tr.print(K[p].v + " ");
        Tr.at("t4", "<b>" + K[p].v + "</b> yazıldı. Çıktı \"" + out.split("").join(" ") + "\".");
      }
      p = null;
      Tr.at(null, "Kök ortada sıra: <b>" + (out.split("").join(" ") || "(boş)") + "</b>.");
      return out;
    }
  };

  /* ---------- 13: maksimum heap ---------- */
  models.heap = {
    label: "Girdi (sayı = ekle, al)",
    parse: function (text) {
      var l = ops(text, "ekle", { al: { op: "al" }, ekle: { op: "ekle", arg: 1 } }, 0, 999, 30), n = 0;
      l.forEach(function (o) { n += o.op === "ekle" ? 1 : n ? -1 : 0; if (n > 15) fail("heap'te en fazla 15 öğe çizilebilir"); });
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
        return [{ t: "tree", root: node(1), dy: 36 }, { t: "arr", name: "yigin", cells: cells, hl: ah, base: 1, cw: 23 }];
      };
      Tr.fn("maksimum_yigin_ekle");
      Tr.at(null, "Maksimum heap: her düğüm çocuklarından küçük değildir; <code>yigin[1]</code> kök, <code>yigin[i]</code>'nin çocukları <code>2i</code> ve <code>2i + 1</code>. Boş yuva sarı çerçeveyle gösterilir.");
      list.forEach(function (o) {
        V = {}; hole = null;
        if (o.op === "ekle") {
          Tr.fn("maksimum_yigin_ekle");
          var item = o.x; V = { "item.x": String(item) };
          Tr.at("f", "<code>maksimum_yigin_ekle(" + item + ")</code>: heap dolu değil (<code>n = " + n + "</code>).");
          var i = ++n; h[i] = null; hole = i; V.i = String(i);
          Tr.at("i", "<code>i = ++n = " + i + "</code>: en sona bir boş yuva açıldı.");
          while (true) {
            if (i === 1) { Tr.at("w", "<code>i == 1</code>: köke gelindi."); break; }
            Tr.at("w", "<code>i = " + i + "</code>, ebeveyn <code>i / 2 = " + Math.floor(i / 2) + "</code>.");
            var pi = Math.floor(i / 2);
            if (item <= h[pi]) { Tr.at("c", item + " ≤ " + h[pi] + ": ebeveyn büyük ya da eşit, yer bulundu.", { j: pi }); break; }
            Tr.at("c", item + " &gt; " + h[pi] + ": ebeveyn aşağı inmeli.", { j: pi });
            h[i] = h[pi]; hole = pi;
            Tr.at("mv", "<code>yigin[" + i + "] = yigin[" + pi + "]</code>: " + h[i] + " aşağı kaydı; boş yuva yukarı çıktı.");
            i = pi; V.i = String(i);
            Tr.at("up", "<code>i /= 2</code>: <code>i = " + i + "</code>.");
          }
          h[i] = item; hole = null;
          Tr.at("put", "<code>yigin[" + i + "] = item</code>: " + item + " yerine yerleşti.", { j: i });
          Tr.print("ekle(" + item + ")\n");
          res.push("ekle " + item + ":" + h.slice(1, n + 1).map(function (q) { return " " + q; }).join(""));
        } else {
          Tr.fn("maksimum_yigin_al");
          if (!n) {
            Tr.at("e", "<code>maksimum_yigin_al</code>: <code>n == 0</code>, heap boş; <code>false</code> döner.");
            Tr.print("al → false\n"); res.push("al false");
            return;
          }
          Tr.at("e", "<code>maksimum_yigin_al</code>: heap boş değil (<code>n = " + n + "</code>).");
          var cik = h[1]; V = { "*cikan": String(cik) };
          Tr.at("r", "<code>*cikan = yigin[1] = " + cik + "</code>: en büyük öğe kökte.", { j: 1 });
          var deger = h[n]; h[n] = null; n--; hole = n >= 1 ? 1 : null; V["deger.x"] = String(deger);
          Tr.at("d", "<code>deger = yigin[n--] = " + deger + "</code>: son öğe yerinden alındı, <code>n = " + n + "</code>; kökteki yuva boş.");
          var ii = 1, j = 2; V.i = "1"; V.j = "2";
          Tr.at("ij", "<code>i = 1, j = 2</code>: boş yuva kökten aşağı ilerleyecek.");
          while (true) {
            if (j > n) { Tr.at("w", "<code>j = " + j + "</code> &gt; <code>n</code>: yuvanın çocuğu yok."); break; }
            Tr.at("w", "<code>j = " + j + "</code> ≤ <code>n</code>: sol çocuk " + h[j] + ".", { j: j });
            if (j < n && h[j] < h[j + 1]) { j++; V.j = String(j); Tr.at("big", "Sağ çocuk " + h[j] + " daha büyük: <code>j = " + j + "</code>.", { j: j }); }
            else Tr.at("big", (j < n ? "Sol çocuk " + h[j] + " büyük ya da eşit" : "Sağ çocuk yok") + ": <code>j = " + j + "</code>.", { j: j });
            if (deger >= h[j]) { Tr.at("c", deger + " ≥ " + h[j] + ": deger buraya sığar.", { j: j }); break; }
            Tr.at("c", deger + " &lt; " + h[j] + ": büyük çocuk yukarı çıkmalı.", { j: j });
            h[ii] = h[j]; hole = j;
            Tr.at("mv", "<code>yigin[" + ii + "] = yigin[" + j + "]</code>: " + h[ii] + " yukarı çıktı; boş yuva aşağı indi.");
            ii = j; j *= 2; V.i = String(ii); V.j = String(j);
            Tr.at("nx", "<code>i = " + ii + "</code>, <code>j = " + j + "</code>.");
          }
          if (n >= 1) { h[ii] = deger; hole = null; Tr.at("put", "<code>yigin[" + ii + "] = deger</code>: " + deger + " yerleşti.", { j: ii }); }
          else { hole = null; Tr.at("put", "Heap boşaldı; <code>yigin[1] = deger</code> yazılır ama <code>n = 0</code> olduğundan öğe sayılmaz."); }
          Tr.print("al → " + cik + "\n");
          Tr.at("ret", "<code>true</code> döner; çıkan " + cik + ".");
          res.push("al " + cik + ":" + h.slice(1, n + 1).map(function (q) { return " " + q; }).join(""));
        }
      });
      V = {}; hole = null;
      Tr.at(null, "İşlemler bitti. Heap dizisi: " + (h.slice(1, n + 1).join(", ") || "boş") + ".");
      return res.join("\n");
    }
  };

  /* ---------- 14: açık adresleme (doğrusal yoklama) ---------- */
  models.hash = {
    label: "Girdi (sayı = ekle, ara 24, sil 13)",
    parse: function (text) { return ops(text, "ekle", { ara: { op: "ara", arg: 1 }, sil: { op: "sil", arg: 1 }, ekle: { op: "ekle", arg: 1 } }, 0, 999, 24); },
    run: function (list, mode, Tr) {
      var M = 11, key = [], st = [], V = {}, look = null, ev = null, res = [], cnt = 0;
      for (var i = 0; i < M; i++) { key.push(0); st.push(0); }
      Tr.varsFn = function () { var v = [["n", String(cnt)]]; Object.keys(V).forEach(function (k) { v.push([k, V[k]]); }); return v; };
      Tr.viewFn = function (ex) {
        var hl = {}; if (look != null) hl[look] = ex.ok ? "is-done" : ex.bad ? "is-bad" : "is-look";
        var ptr = []; if (look != null) ptr.push(["i", look]); if (ev != null && ev !== look) ptr.push(["ev", ev]);
        return [{ t: "arr", name: "tablo", cells: key.map(function (k, i) { return st[i] === 1 ? k : st[i] === 2 ? "✝" : null; }), hl: hl, ptr: ptr, cw: 30 }];
      };
      Tr.fn("ekle");
      Tr.at(null, "<code>M = 11</code>, <code>h(k) = k % 11</code>. Dolu yuvada sıradaki yuvaya bakılır (doğrusal yoklama). ✝ silindi işaretidir: arama orada durmaz, ekleme o yuvayı kullanabilir.");
      function ara(k, from) {
        Tr.fn("ara");
        var i = k % M; ev = i; look = i; V = { k: String(k), i: String(i) };
        Tr.at("h", (from ? "<code>ara(" + k + ")</code>: " : "<code>ara(" + k + ")</code> çağrıldı. ") + "Ev adresi <code>i = " + k + " % 11 = " + i + "</code>.");
        for (var d = 0; d < M; d++, i = (i + 1) % M) {
          look = i; V.d = String(d); V.i = String(i);
          Tr.at("for", "<code>d = " + d + "</code>: yuva " + i + " yoklanıyor.");
          if (st[i] === 0) { Tr.at("bos", "Yuva " + i + " BOS: " + k + " olsaydı en geç burada olurdu; −1 döner (" + (d + 1) + " yoklama).", { bad: 1 }); return -1; }
          Tr.at("bos", "Yuva " + i + " boş değil" + (st[i] === 2 ? " (silindi işareti); aramaya devam." : "."));
          if (st[i] === 1 && key[i] === k) { Tr.at("eq", "Yuva " + i + " DOLU ve anahtar " + k + ": " + i + " döner (" + (d + 1) + " yoklama).", { ok: 1 }); return i; }
          Tr.at("eq", st[i] === 1 ? "Başka anahtar (" + key[i] + "): sıradaki yuvaya geçilir." : "Silinmiş yuva: sıradaki yuvaya geçilir.");
        }
        look = null;
        Tr.at("nf", "Tablonun tamamı yoklandı, " + k + " yok: −1 döner.");
        return -1;
      }
      list.forEach(function (o) {
        var k = o.x; V = {}; look = null; ev = null;
        if (o.op === "ekle") {
          Tr.fn("ekle");
          var i = k % M; ev = i; look = i; V = { k: String(k), i: String(i) };
          Tr.at("h", "<code>ekle(" + k + ")</code>: ev adresi <code>i = " + k + " % 11 = " + i + "</code>.");
          var put = -1;
          for (var d = 0; d < M; d++, i = (i + 1) % M) {
            look = i; V.d = String(d); V.i = String(i);
            Tr.at("for", "<code>d = " + d + "</code>: yuva " + i + " yoklanıyor.");
            if (st[i] !== 1) {
              Tr.at("if", "Yuva " + i + " " + (st[i] === 0 ? "BOS" : "SILINDI") + ": buraya yazılabilir.");
              key[i] = k;
              Tr.at("k", "<code>tablo[" + i + "].anahtar = " + k + "</code>.");
              st[i] = 1; cnt++;
              Tr.at("s", "<code>tablo[" + i + "].durum = DOLU</code>.", { ok: 1 });
              put = i;
              Tr.print("ekle(" + k + ") → " + i + "\n");
              Tr.at("ret", i + " döner: " + (d + 1) + " yoklama" + (d ? "; ev adresinden " + d + " yuva uzağa düştü." : "."), { ok: 1 });
              break;
            }
            Tr.at("if", "Yuva " + i + " DOLU (" + key[i] + "): sıradaki yuvaya geçilir.", { bad: 1 });
          }
          if (put < 0) { look = null; Tr.print("ekle(" + k + ") → -1\n"); Tr.at("full", "Tablo dolu: −1 döner."); }
          res.push("ekle " + k + " " + put);
        } else if (o.op === "ara") {
          var r = ara(k, false);
          Tr.print("ara(" + k + ") → " + r + "\n");
          res.push("ara " + k + " " + r);
        } else {
          Tr.fn("sil");
          V = { k: String(k) };
          Tr.at("a", "<code>sil(" + k + ")</code>: önce <code>ara(" + k + ")</code> ile yeri bulunur.");
          var j = ara(k, true);
          Tr.fn("sil"); V = { k: String(k), i: String(j) };
          if (j < 0) { look = null; Tr.at("n", "<code>i &lt; 0</code>: " + k + " yok, <code>false</code> döner."); Tr.print("sil(" + k + ") → false\n"); res.push("sil " + k + " false"); return; }
          Tr.at("n", "<code>ara</code> " + j + " döndürdü: silinecek öğe var.");
          st[j] = 2; cnt--;
          Tr.at("x", "<code>tablo[" + j + "].durum = SILINDI</code>: yuva boşaltılmaz, ✝ ile işaretlenir; böylece arkasındaki anahtarların araması kopmaz.");
          Tr.print("sil(" + k + ") → true\n");
          Tr.at("ret", "<code>true</code> döner.");
          res.push("sil " + k + " true");
        }
      });
      V = {}; look = null; ev = null;
      Tr.at(null, "İşlemler bitti: tabloda " + cnt + " anahtar, yük faktörü α = " + cnt + "/11.");
      res.push("tablo " + key.map(function (k, i) { return st[i] === 1 ? k : st[i] === 2 ? "S" : "-"; }).join(" "));
      return res.join("\n");
    }
  };

  /* ---------- 15: DFS / BFS ---------- */
  models.graph = {
    label: "Girdi (yönsüz kenarlar, ör. 0-1, 0-2)",
    parse: function (text) { return edges(text, 10, false, false); },
    run: function (G, mode, Tr) {
      var n = G.n, adj = [], ug = [], out = [], cur = null, wv = null, calls = [], tree = {}, kq = [], kon = 0, res;
      for (var i = 0; i < n; i++) { adj.push([]); ug.push(false); }
      G.E.forEach(function (e) { adj[e.u].push(e.v); adj[e.v].push(e.u); });
      adj.forEach(function (a) { a.sort(function (x, y) { return x - y; }); });
      mode = mode || "dfs";
      Tr.varsFn = function () {
        var v = [["v", cur == null ? "–" : String(cur)], ["w", wv == null ? "NULL" : "→" + wv]];
        if (mode === "dfs") v.push(["çağrılar", calls.length ? calls.map(function (c) { return "dfs(" + c + ")"; }).join(" › ") : "–"]);
        else v.push(["kuyruk", "[" + kq.slice(kon).join(", ") + "]"]);
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
        parts.push({ t: "arr", name: "ugranildi", cells: ug.map(function (u) { return u ? "T" : "F"; }), cw: 24, hl: (function () { var h = {}; ug.forEach(function (u, i) { if (u) h[i] = "is-done"; }); return h; })() });
        if (mode === "bfs") { var c = kq.slice(kon); while (c.length < 4) c.push(null); parts.push({ t: "arr", name: "kuyruk", cells: c, noIdx: true, cw: 24, ptr: kq.length > kon ? [["on", 0]] : [] }); }
        return parts;
      };
      var lists = adj.map(function (a, i) { return i + ": " + (a.join(" ") || "–"); }).join("; ");
      Tr.fn(mode);
      Tr.at(null, "Komşuluk listeleri (artan sırayla): " + lists + ". Gezinme 0 düğümünden başlar.");
      if (mode === "dfs") {
        (function dfs(v) {
          calls.push(v); cur = v; wv = null;
          ug[v] = true;
          Tr.at("m", "<code>dfs(" + v + ")</code>: <code>ugranildi[" + v + "] = TRUE</code>.");
          out.push(v); Tr.print(v + " ");
          Tr.at("p", "<b>" + v + "</b> yazıldı.");
          for (var k = 0; k <= adj[v].length; k++) {
            cur = v; wv = k < adj[v].length ? adj[v][k] : null;
            if (wv == null) { Tr.at("for", v + " düğümünün listesi bitti (<code>w == NULL</code>)."); break; }
            Tr.at("for", "<code>w</code>: " + v + " düğümünün listesinde sıradaki komşu " + wv + ".");
            if (ug[wv]) { Tr.at("if", "<code>ugranildi[" + wv + "]</code> TRUE: atlanır."); continue; }
            Tr.at("if", wv + " ziyaret edilmemiş.");
            tree[v + "-" + wv] = 1;
            Tr.at("call", "<code>dfs(" + wv + ")</code> çağrılır; " + v + " burada bekler.");
            var w0 = wv; dfs(wv); cur = v; wv = w0;
            Tr.at("call", "<code>dfs(" + w0 + ")</code> döndü; " + v + " düğümünün listesine devam.");
          }
          wv = null; calls.pop(); cur = calls.length ? calls[calls.length - 1] : null;
        })(0);
      } else {
        var v = 0; cur = null;
        Tr.at("b0", "<code>on = arka = NULL</code>: kuyruk boş.");
        cur = v; ug[v] = true; out.push(v); Tr.print(v + " ");
        Tr.at("b1", "<b>" + v + "</b> yazıldı ve işaretlendi.");
        kq.push(v);
        Tr.at("b2", v + " kuyruğa eklendi.");
        while (true) {
          wv = null;
          if (kon >= kq.length) { cur = null; Tr.at("w", "Kuyruk boş: gezinme biter."); break; }
          Tr.at("w", "Kuyruk boş değil.");
          cur = kq[kon++];
          Tr.at("al", "<code>v = kuyruk_al(…)</code>: öndeki " + cur + " alındı; listesi taranacak.");
          for (var k = 0; k <= adj[cur].length; k++) {
            wv = k < adj[cur].length ? adj[cur][k] : null;
            if (wv == null) { Tr.at("for", cur + " düğümünün listesi bitti."); break; }
            Tr.at("for", "<code>w</code>: " + cur + " düğümünün komşusu " + wv + ".");
            if (ug[wv]) { Tr.at("if", "<code>ugranildi[" + wv + "]</code> TRUE: atlanır."); continue; }
            Tr.at("if", wv + " ziyaret edilmemiş.");
            tree[cur + "-" + wv] = 1; out.push(wv); Tr.print(wv + " ");
            Tr.at("p", "<b>" + wv + "</b> yazıldı.");
            kq.push(wv);
            Tr.at("e", wv + " kuyruğun arkasına eklendi.");
            ug[wv] = true;
            Tr.at("m", "<code>ugranildi[" + wv + "] = TRUE</code>.");
          }
        }
      }
      cur = null; wv = null;
      var miss = []; ug.forEach(function (u, i) { if (!u) miss.push(i); });
      Tr.at(null, "Ziyaret sırası: <b>" + out.join(" ") + "</b>." + (miss.length ? " 0'dan ulaşılamayan düğümler: " + miss.join(", ") + " (başka bileşen)." : " Yeşil kenarlar " + (mode === "dfs" ? "derinlik" : "genişlik") + " öncelikli kapsayan ağacı oluşturur."));
      res = out.join(" ");
      return res;
    }
  };

  /* ---------- 16: union-find ile bileşen sayma ---------- */
  models.uf = {
    label: "Girdi (n=6, kenarlar 0-1, 2-3)",
    parse: function (text) {
      var t = tokens(text), n = null;
      if (t.length && /^n\s*=/.test(t[0])) { n = int(t[0].replace(/^n\s*=\s*/, ""), 1, 10); t.shift(); }
      var G = t.length ? edges(t.join(","), 10, false, true) : { n: 0, E: [] };
      if (n == null) n = Math.max(G.n, 1);
      if (G.n > n) fail("kenarlardaki düğüm numarası n'den küçük olmalı");
      return { n: n, E: G.E };
    },
    run: function (G, mode, Tr) {
      var n = G.n, ata = [], sayi = n, V = {}, hl = {}, res = [];
      for (var i = 0; i < n; i++) ata.push(null);
      Tr.varsFn = function () { var v = [["sayi", String(sayi)]]; Object.keys(V).forEach(function (k) { v.push([k, V[k]]); }); return v; };
      Tr.viewFn = function () {
        if (ata[0] === null) return [{ t: "arr", name: "ata", cells: ata.slice(), cw: 30 }];
        return [{ t: "forest", ata: ata.slice(), hl: Object.assign({}, hl) }, { t: "arr", name: "ata", cells: ata.slice(), cw: 30, hl: Object.assign({}, hl) }];
      };
      Tr.fn("bilesen_say");
      Tr.at(null, "<code>bilesen_say(" + n + ", " + G.E.length + ", u, v)</code>: kenarlar " + (G.E.map(function (e) { return "(" + e.u + "," + e.v + ")"; }).join(", ") || "yok") + ". Her kenarın iki ucu aynı kümede değilse kümeler birleştirilir.");
      for (i = 0; i < n; i++) ata[i] = -1;
      Tr.at("init", "Her düğüm ayrı bir küme: <code>ata[i] = -1</code> (kökte −düğüm sayısı tutulur).");
      Tr.at("s", "<code>sayi = " + n + "</code>.");
      function find(x) {
        Tr.fn("Kume_bul_2");
        var r = x; V.i = String(x); hl = {}; hl[x] = "is-look";
        while (ata[r] >= 0) { Tr.at("f", "<code>ata[" + r + "] = " + ata[r] + "</code> ≥ 0: " + r + " kök değil, ebeveyni " + ata[r] + "."); r = ata[r]; hl[r] = "is-look"; }
        V.r = String(r);
        Tr.at("f", "<code>ata[" + r + "] = " + ata[r] + "</code> &lt; 0: kök " + r + ".");
        while (x !== r) {
          Tr.at("w", "<code>i = " + x + "</code> ≠ <code>r</code>: yol azaltılacak.");
          var s = ata[x]; V.s = String(s);
          Tr.at("s", "<code>s = ata[" + x + "] = " + s + "</code>.");
          ata[x] = r;
          Tr.at("set", "<code>ata[" + x + "] = " + r + "</code>: " + x + " doğrudan köke bağlandı.");
          x = s; V.i = String(x);
          Tr.at("i", "<code>i = " + x + "</code>.");
        }
        Tr.at("w", "<code>i == r</code>: yol bitti.");
        Tr.at("ret", "Kök " + r + " döner.");
        delete V.i; delete V.r; delete V.s;
        return r;
      }
      for (var e = 0; e < G.E.length; e++) {
        Tr.fn("bilesen_say"); V = { e: String(e) }; hl = {};
        Tr.at("for", "<code>e = " + e + "</code>: kenar (" + G.E[e].u + ", " + G.E[e].v + ").");
        Tr.at("a", "<code>a = Kume_bul_2(" + G.E[e].u + ")</code> çağrılır.");
        var a = find(G.E[e].u);
        Tr.fn("bilesen_say"); V.a = String(a);
        Tr.at("b", "<code>a = " + a + "</code>; <code>b = Kume_bul_2(" + G.E[e].v + ")</code> çağrılır.");
        var b = find(G.E[e].v);
        Tr.fn("bilesen_say"); V.b = String(b); hl = {}; hl[a] = "is-look"; hl[b] = "is-look";
        if (a === b) { Tr.at("if", "<code>a == b</code> (" + a + "): iki uç zaten aynı kümede, birleştirme yok."); continue; }
        Tr.at("if", "<code>a = " + a + "</code>, <code>b = " + b + "</code>: farklı kümeler.");
        Tr.at("u", "<code>Birlesim_2(" + a + ", " + b + ")</code> çağrılır.");
        Tr.fn("Birlesim_2");
        var p = ata[a] + ata[b]; V.p = String(p);
        Tr.at("p", "<code>p = ata[" + a + "] + ata[" + b + "] = " + ata[a] + " + " + ata[b] + " = " + p + "</code>: birleşik kümenin −düğüm sayısı.");
        if (ata[a] > ata[b]) {
          Tr.at("if", "<code>ata[" + a + "] &gt; ata[" + b + "]</code>: " + a + " kümesinde daha az düğüm var; " + a + ", " + b + "'ye bağlanır.");
          ata[a] = b; Tr.at("i1", "<code>ata[" + a + "] = " + b + "</code>.");
          ata[b] = p; Tr.at("j1", "<code>ata[" + b + "] = " + p + "</code>.");
        } else {
          Tr.at("if", "<code>ata[" + a + "] ≤ ata[" + b + "]</code>: " + b + " kümesinde daha az ya da eşit düğüm var; " + b + ", " + a + "'ya bağlanır.");
          ata[b] = a; Tr.at("i2", "<code>ata[" + b + "] = " + a + "</code>.");
          ata[a] = p; Tr.at("j2", "<code>ata[" + a + "] = " + p + "</code>.");
        }
        Tr.fn("bilesen_say"); delete V.p;
        sayi--;
        Tr.at("dec", "<code>sayi--</code>: " + sayi + " bileşen kaldı.");
      }
      Tr.fn("bilesen_say"); V = {}; hl = {};
      Tr.print("bilesen sayisi = " + sayi + "\n");
      Tr.at("ret", "Bileşen sayısı <b>" + sayi + "</b> döner.");
      res.push("sayi " + sayi, "ata " + ata.join(" "));
      return res.join("\n");
    }
  };

  /* ---------- 17: Kruskal ve Prim ---------- */
  models.mst = {
    label: "Girdi (ağırlıklı kenarlar, ör. 0-1:28)",
    parse: function (text) { var G = edges(text, 8, true, false); if (G.n < 2) fail("en az iki düğüm gerekir"); return G; },
    run: function (G, mode, Tr) {
      var n = G.n, E = G.E.map(function (e, i) { return { u: e.u, v: e.v, w: e.w, i: i }; }), state = {}, look = null, toplam = 0, V = {}, res = [], ata = [];
      var nodeHl = {}, lab = {};
      Tr.varsFn = function () { var v = [["toplam", String(toplam)]]; Object.keys(V).forEach(function (k) { v.push([k, V[k]]); }); return v; };
      Tr.viewFn = function () {
        var ed = E.map(function (e) { return { u: e.u, v: e.v, w: e.w, hl: look === e.i ? "is-hot" : state[e.i] || "" }; });
        var parts = [{ t: "graph", n: n, edges: ed, hl: Object.assign({}, nodeHl), lab: Object.assign({}, lab) }];
        if (mode !== "prim") parts.push({ t: "arr", name: "ata", cells: ata.slice(), cw: 28 });
        return parts;
      };
      if (mode !== "prim") {
        Tr.fn("kruskal");
        for (var i = 0; i < n; i++) ata.push(null);
        Tr.at(null, "Kruskal: kenarlar küçükten büyüğe denenir; uçları farklı kümedeyse ağaca alınır, aynı kümedeyse döngü oluşturacağı için bırakılır. Kümeler union-find ile tutulur.");
        for (i = 0; i < n; i++) ata[i] = -1;
        Tr.at("init", "<code>ata[i] = -1</code>: her düğüm ayrı küme.");
        var k = E.slice().sort(function (a, b) { return a.w - b.w || a.i - b.i; });
        Tr.at("sort", "Kenarlar ağırlığa göre sıralandı: " + k.map(function (e) { return "(" + e.u + "," + e.v + ")" + e.w; }).join(" ") + ". Eşit ağırlıklarda giriş sırası korunur.");
        var find = function (x) { while (ata[x] >= 0) x = ata[x]; return x; };
        var t = 0;
        for (i = 0; ; i++) {
          look = null; V = { i: String(i), t: String(t) };
          if (!(i < k.length && t < n - 1)) { Tr.at("for", t >= n - 1 ? "<code>t = " + t + " = n − 1</code>: ağaç tamamlandı, döngü biter." : "Kenarlar bitti (<code>i = e</code>)."); break; }
          var c = k[i]; look = c.i;
          Tr.at("for", "<code>k[" + i + "]</code> = (" + c.u + ", " + c.v + "), ağırlık " + c.w + ".");
          var a = find(c.u); V.a = String(a);
          Tr.at("a", "<code>kume_bul(" + c.u + ") = " + a + "</code>.");
          var b = find(c.v); V.b = String(b);
          Tr.at("b", "<code>kume_bul(" + c.v + ") = " + b + "</code>.");
          if (a === b) { state[c.i] = "is-dim"; Tr.at("if", "<code>a == b</code>: iki uç aynı kümede; kenar döngü oluşturur, bırakılır."); continue; }
          Tr.at("if", "<code>a ≠ b</code>: döngü yok.");
          state[c.i] = "is-done"; t++; toplam += c.w; V.t = String(t);
          Tr.at("take", "<code>T[" + (t - 1) + "] = k[" + i + "]</code>: (" + c.u + ", " + c.v + ") ağaca eklendi; toplam " + toplam + ".");
          res.push(c.u + "-" + c.v + ":" + c.w);
          if (ata[a] <= ata[b]) { ata[a] += ata[b]; ata[b] = a; } else { ata[b] += ata[a]; ata[a] = b; }
          Tr.at("un", "<code>birlestir(ata, " + a + ", " + b + ")</code>: büyük küme köke alındı.");
        }
        look = null;
        if (t < n - 1) { Tr.print("agac yok\n"); Tr.at("end", "<code>t = " + t + "</code> &lt; n − 1: çizge bağlı değil, kapsayan ağaç yok."); res.push("agac yok"); }
        else { Tr.print("toplam = " + toplam + "\n"); Tr.at("end", "<code>t = n − 1</code>: minimum kapsayan ağacın maliyeti <b>" + toplam + "</b>."); }
      } else {
        Tr.fn("prim");
        var INF = 1000, w = [], sec = [], enaz = [], yakin = [];
        for (i = 0; i < n; i++) { w.push([]); sec.push(0); enaz.push(null); yakin.push(null); for (var j = 0; j < n; j++) w[i].push(i === j ? 0 : INF); }
        E.forEach(function (e) { w[e.u][e.v] = w[e.v][e.u] = e.w; });
        var edgeOf = function (u, v) { for (var q = 0; q < E.length; q++) if ((E[q].u === u && E[q].v === v) || (E[q].u === v && E[q].v === u)) return E[q].i; return null; };
        var showLab = function () { lab = {}; nodeHl = {}; for (var x = 0; x < n; x++) { if (sec[x]) nodeHl[x] = "is-done"; else if (enaz[x] != null) lab[x] = enaz[x] >= INF ? "∞" : enaz[x]; } };
        Tr.at(null, "Prim: ağaç 0 düğümünden büyür. <code>enaz[v]</code>, ağaca alınmamış v'nin ağaca en ucuz bağlantısıdır (düğüm yanındaki sayı); her turda en küçüğü seçilir.");
        sec[0] = 1; showLab();
        Tr.at("s0", "<code>secildi[0] = 1</code>: TV = {0}.");
        for (var v = 0; v < n; v++) { enaz[v] = w[0][v]; yakin[v] = 0; }
        showLab();
        Tr.at("init", "<code>enaz[v] = w[0][v]</code>, <code>yakin[v] = 0</code>: 0'a doğrudan bağlı düğümlerin maliyeti yazıldı, diğerleri ∞.");
        for (var kk = 1; kk < n; kk++) {
          look = null; V = { k: String(kk) };
          Tr.at("for", "<code>k = " + kk + "</code>: ağaca bir düğüm daha eklenecek.");
          var u = -1, mn = INF;
          for (v = 0; v < n; v++) if (!sec[v] && enaz[v] < mn) { mn = enaz[v]; u = v; }
          V.u = String(u);
          if (u < 0) { Tr.at("u", "<code>en_yakin</code> −1 döndü: kalan düğümlere bağlantı yok."); Tr.at("brk", "Çizge bağlı değil: ağaç yok, döngüden çıkılır."); res.push("agac yok"); break; }
          look = edgeOf(u, yakin[u]);
          Tr.at("u", "<code>en_yakin</code>: seçilmemişler arasında en küçük <code>enaz</code> " + u + " düğümünde (" + mn + ", " + yakin[u] + " üzerinden).");
          Tr.at("brk", "<code>u ≥ 0</code>: devam.");
          sec[u] = 1; toplam += enaz[u]; state[look] = "is-done"; res.push(yakin[u] + "-" + u + ":" + enaz[u]); showLab();
          Tr.at("add", "<code>secildi[" + u + "] = 1</code>: (" + yakin[u] + ", " + u + ") ağaca eklendi; toplam " + toplam + ".");
          for (v = 0; v < n; v++) {
            if (sec[v] || w[u][v] >= INF) continue;
            look = edgeOf(u, v);
            if (w[u][v] < enaz[v]) {
              Tr.at("if", "v = " + v + ": <code>w[" + u + "][" + v + "] = " + w[u][v] + "</code> &lt; <code>enaz[" + v + "] = " + (enaz[v] >= INF ? "∞" : enaz[v]) + "</code>.");
              enaz[v] = w[u][v]; yakin[v] = u; showLab();
              Tr.at("upd", "<code>enaz[" + v + "] = " + w[u][v] + "</code>, <code>yakin[" + v + "] = " + u + "</code>: " + v + " için daha ucuz bağlantı bulundu.");
            } else Tr.at("if", "v = " + v + ": <code>w[" + u + "][" + v + "] = " + w[u][v] + "</code> ≥ <code>enaz[" + v + "] = " + enaz[v] + "</code>: değişmez.");
          }
        }
        look = null; V = {};
        if (res[res.length - 1] !== "agac yok") { Tr.print("toplam = " + toplam + "\n"); Tr.at(null, "Minimum kapsayan ağacın maliyeti <b>" + toplam + "</b>."); }
        else Tr.at(null, "Kapsayan ağaç yok.");
      }
      res.push("toplam " + toplam);
      return res.join("\n");
    }
  };

  /* ---------- 18: Dijkstra ---------- */
  models.dijkstra = {
    label: "Girdi (yönlü kenarlar, ör. 0>1:50)",
    parse: function (text) { var G = edges(text, 8, true, true); if (G.n < 2) fail("en az iki düğüm gerekir"); return G; },
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
          { t: "arr", name: "uzaklik", cells: dist.map(f), cw: 28 },
          { t: "arr", name: "onceki", cells: prev.slice(), cw: 28, noIdx: true }];
      };
      Tr.fn("EnKisaYolBul");
      Tr.at(null, "<code>EnKisaYolBul(0, …)</code>: kaynak 0. Kenar yoksa maliyet <code>SONSUZ = 1000</code> (∞). Düğüm yanındaki sayı o anki <code>uzaklik</code> değeridir.");
      for (i = 0; i < n; i++) { gid.push(false); dist.push(c[0][i]); prev.push(0); }
      Tr.at("a1", "A1: <code>gidildi[] = FALSE</code>, <code>uzaklik[] = maliyet[0][]</code>, <code>onceki[] = 0</code>.");
      gid[0] = true; dist[0] = 0;
      Tr.at("src", "<code>gidildi[0] = TRUE</code>, <code>uzaklik[0] = 0</code>: kaynak kesinleşti.");
      for (i = 2; i < n; i++) {
        u = null; w = null; V = { i: String(i) };
        Tr.at("for", "<code>i = " + i + "</code>: " + (i - 1) + ". tur (toplam n − 2 = " + (n - 2) + " tur).");
        var mn = Infinity, pos = -1;
        for (j = 0; j < n; j++) if (dist[j] < mn && !gid[j]) { mn = dist[j]; pos = j; }
        u = pos >= 0 ? pos : null; V.u = String(pos);
        if (pos < 0) { Tr.at("min", "<code>minimumBul</code> −1 döndü: işaretsiz düğüm kalmadı."); Tr.at("brk", "<code>u &lt; 0</code>: döngüden çıkılır."); break; }
        Tr.at("min", "<code>minimumBul</code>: işaretsizler arasında en küçük uzaklık " + pos + " düğümünde (" + f(mn) + ").");
        Tr.at("brk", "<code>u ≥ 0</code>: devam.");
        gid[pos] = true;
        Tr.at("mark", "<code>gidildi[" + pos + "] = TRUE</code>: " + pos + " düğümünün uzaklığı kesinleşti.");
        for (w = 0; w < n; w++) {
          if (gid[w] || c[pos][w] >= INF) continue;
          V.w = String(w);
          var nd = dist[pos] + c[pos][w];
          if (nd < dist[w]) {
            Tr.at("if", "w = " + w + ": " + dist[pos] + " + " + c[pos][w] + " = " + nd + " &lt; " + f(dist[w]) + ": daha kısa yol.");
            dist[w] = nd; prev[w] = pos;
            Tr.at("upd", "<code>uzaklik[" + w + "] = " + nd + "</code>, <code>onceki[" + w + "] = " + pos + "</code>.");
          } else Tr.at("if", "w = " + w + ": " + dist[pos] + " + " + c[pos][w] + " = " + nd + " ≥ " + f(dist[w]) + ": değişmez.");
        }
        w = null; delete V.w;
      }
      u = null; w = null; V = {};
      Tr.print("uzaklik: " + dist.map(f).join(" ") + "\n");
      Tr.at(null, "Bitti. <code>uzaklik</code> = [" + dist.map(f).join(", ") + "]; yollar <code>onceki</code> dizisi geriye izlenerek bulunur.");
      return "uzaklik " + dist.join(" ") + "\nonceki " + prev.join(" ");
    }
  };

  /* ---------- 19-20: sıralama ---------- */
  models.sort = {
    label: "Girdi (virgülle ayrılmış sayılar)",
    parse: function (text) { return nums(text, 0, 99, 1, 12); },
    run: function (a0, mode, Tr) {
      var a = a0.slice(), n = a.length, P = {}, V = {}, look = {}, done = {}, cmp = 0, b = null, calls = [];
      var heap = mode === "heap";
      if (heap) a = [null].concat(a);
      Tr.varsFn = function () {
        var v = []; Object.keys(V).forEach(function (k) { v.push([k, V[k]]); });
        v.push(["karşılaştırma", String(cmp)]);
        if (calls.length) v.push(["çağrılar", calls.join(" › ")]);
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
      Tr.at(null, "Girdi: [" + a0.join(", ") + "]. " + {
        selection: "Seçimli sıralama: her turda kalan kısmın en küçüğü bulunup tura başlanan yere konur.",
        insertion: "Eklemeli sıralama: soldaki sıralı kısma sıradaki öğe, büyükler sağa kaydırılarak yerleştirilir.",
        bubble: "Kabarcık sıralaması (erken durmalı): sağdan sola komşu çiftler karşılaştırılır; bir turda takas olmazsa dizi sıralıdır.",
        shell: "Shell sıralaması: önce birbirinden h uzak öğeler eklemeli sıralanır; h her turda yarıya iner, h = 1 son turdur.",
        quick: "Hızlı sıralama: <code>bol</code>, pivotu (a[R]) son yerine koyar; küçükler solda, büyükler sağda kalır. İki yan özyinelemeyle sıralanır.",
        merge: "Birleştirme sıralaması: dizi yarılara bölünür, her yarı sıralanır, <code>merge</code> iki sıralı yarıyı yardımcı dizi <code>b</code> üzerinden birleştirir.",
        heap: "Heap sıralaması: <code>a[1..n]</code> önce aşağıdan yukarıya maksimum heap yapılır; sonra kök sona alınıp heap küçültülür."
      }[mode || "selection"]);
      var L = 0, R = n - 1, i, j, v;
      if (mode === "insertion") {
        for (i = L + 1; ; i++) {
          P = { i: i <= R ? i : null }; V = { i: String(i) }; look = {};
          if (i > R) { Tr.at("i", "<code>i = " + i + "</code> &gt; R: dizi sıralandı."); break; }
          Tr.at("i", "<code>i = " + i + "</code>: a[0.." + (i - 1) + "] sıralı.");
          v = a[i]; V.v = String(v); look[i] = "is-look";
          Tr.at("v", "<code>v = a[" + i + "] = " + v + "</code> bir kenara alındı.");
          j = i - 1; P.j = j; V.j = String(j);
          Tr.at("j", "<code>j = " + j + "</code>.");
          while (true) {
            if (j < L) { Tr.at("w", "<code>j &lt; L</code>: dizinin başına gelindi."); break; }
            cmp++;
            if (!(a[j] > v)) { Tr.at("w", "a[" + j + "] = " + a[j] + " &gt; " + v + " değil: yer bulundu."); break; }
            Tr.at("w", "a[" + j + "] = " + a[j] + " &gt; v = " + v + ".");
            a[j + 1] = a[j];
            Tr.at("sh", "<code>a[" + (j + 1) + "] = a[" + j + "]</code>: " + a[j] + " bir sağa kaydı.");
            j--; P.j = j >= 0 ? j : null; V.j = String(j);
            Tr.at("dec", "<code>j = " + j + "</code>.");
          }
          a[j + 1] = v; look = {}; look[j + 1] = "is-done";
          Tr.at("put", "<code>a[" + (j + 1) + "] = v</code>: " + v + " yerine kondu.");
        }
      } else if (mode === "bubble") {
        for (i = L; ; i++) {
          P = { i: i < R ? i : null }; V = { i: String(i) }; look = {};
          if (i >= R) { Tr.at("i", "<code>i = R</code>: tüm turlar bitti."); break; }
          var takas = 0; V.takas = "0";
          Tr.at("i", "Tur <code>i = " + i + "</code>.");
          Tr.at("t", "<code>takas = 0</code>.");
          for (j = R; j > i; j--) {
            P.j = j; V.j = String(j); look = {}; look[j] = "is-look"; look[j - 1] = "is-look";
            Tr.at("j", "<code>j = " + j + "</code>: a[" + (j - 1) + "] ile a[" + j + "] karşılaştırılacak.");
            if (less(a[j], a[j - 1])) {
              Tr.at("cmp", a[j] + " &lt; " + a[j - 1] + ": sıra bozuk.");
              var t = a[j]; a[j] = a[j - 1]; a[j - 1] = t; takas = 1; V.takas = "1";
              Tr.at("swap", "Takas: a[" + (j - 1) + "] = " + a[j - 1] + ", a[" + j + "] = " + a[j] + "; <code>takas = 1</code>.");
            } else Tr.at("cmp", a[j] + " &lt; " + a[j - 1] + " değil: takas yok.");
          }
          done[i] = 1; look = {}; delete P.j;
          if (!takas) { Tr.at("ret", "Bu turda hiç takas olmadı: dizi sıralı, erken çıkılır."); break; }
          Tr.at("ret", "Tur bitti; a[" + i + "] yerinde.");
        }
      } else if (mode === "shell") {
        for (var h = Math.floor(n / 2); ; h = Math.floor(h / 2)) {
          P = {}; V = { h: String(h) }; look = {};
          if (h <= 0) { Tr.at("h", "<code>h = 0</code>: sıralama bitti."); break; }
          Tr.at("h", "Aralık <code>h = " + h + "</code>: birbirinden " + h + " uzak öğeler ayrı ayrı sıralanır.");
          for (i = h; i < n; i++) {
            P = { i: i }; V = { h: String(h), i: String(i) }; look = {};
            Tr.at("i", "<code>i = " + i + "</code>.");
            v = a[i]; j = i; V.v = String(v); V.j = String(j); look[i] = "is-look";
            Tr.at("v", "<code>v = a[" + i + "] = " + v + "</code>, <code>j = " + i + "</code>.");
            while (true) {
              if (j < h) { Tr.at("w", "<code>j &lt; h</code>: zincirin başı."); break; }
              cmp++;
              if (!(a[j - h] > v)) { Tr.at("w", "a[" + (j - h) + "] = " + a[j - h] + " &gt; " + v + " değil."); break; }
              Tr.at("w", "a[" + (j - h) + "] = " + a[j - h] + " &gt; " + v + ".");
              a[j] = a[j - h]; j -= h; V.j = String(j); P.j = j;
              Tr.at("sh", "<code>a[" + (j + h) + "] = a[" + j + "]</code>: " + h + " geri kaydı; <code>j = " + j + "</code>.");
            }
            a[j] = v; look = {}; look[j] = "is-done";
            Tr.at("put", "<code>a[" + j + "] = " + v + "</code>.");
          }
        }
      } else if (mode === "quick") {
        var qs = function (L, R) {
          calls.push("qs(" + L + "," + R + ")"); Tr.fn("quicksort1"); P = { L: L, R: R }; V = {}; look = {};
          if (R <= L) { Tr.at("if", "<code>quicksort1(a, " + L + ", " + R + ")</code>: <code>R ≤ L</code>, en çok bir öğe; dönülür."); if (R === L) done[L] = 1; calls.pop(); return; }
          Tr.at("if", "<code>quicksort1(a, " + L + ", " + R + ")</code>: " + (R - L + 1) + " öğe bölümlenecek.");
          Tr.at("bol", "<code>bol(a, " + L + ", " + R + ")</code> çağrılır.");
          Tr.fn("bol");
          var i = L - 1, j = R, v = a[R];
          V = { v: String(v), i: String(i), j: String(j) }; P = { i: null, j: j }; look = {}; look[R] = "is-look";
          Tr.at("b0", "Pivot <code>v = a[" + R + "] = " + v + "</code>; <code>i = " + i + "</code>, <code>j = " + j + "</code>.");
          for (;;) {
            while (true) {
              ++i; P.i = i; V.i = String(i);
              if (less(a[i], v)) Tr.at("b1", "a[" + i + "] = " + a[i] + " &lt; " + v + ": i ilerler.");
              else { Tr.at("b1", "a[" + i + "] = " + a[i] + " &lt; " + v + " değil: i burada durur."); break; }
            }
            while (true) {
              --j; P.j = j; V.j = String(j);
              if (less(v, a[j])) {
                Tr.at("b2", v + " &lt; a[" + j + "] = " + a[j] + ": j geriler.");
                if (j === L) { Tr.at("b3", "<code>j == L</code>: dizinin başı, tarama durur."); break; }
                Tr.at("b3", "<code>j ≠ L</code>.");
              } else { Tr.at("b2", v + " &lt; a[" + j + "] = " + a[j] + " değil: j burada durur."); break; }
            }
            if (i >= j) { Tr.at("b4", "<code>i ≥ j</code>: taramalar kesişti."); break; }
            Tr.at("b4", "<code>i &lt; j</code>: iki öğe yanlış tarafta.");
            var t = a[i]; a[i] = a[j]; a[j] = t;
            Tr.at("b5", "<code>SWAP(a[" + i + "], a[" + j + "])</code>.");
          }
          var t2 = a[i]; a[i] = a[R]; a[R] = t2; done[i] = 1; look = {};
          Tr.at("b6", "<code>SWAP(a[" + i + "], a[" + R + "])</code>: pivot " + v + " son yerine (" + i + ") kondu.");
          Tr.at("b7", "<code>bol</code> " + i + " döndürür.");
          Tr.fn("quicksort1"); P = { L: L, R: R }; V = { i: String(i) };
          Tr.at("bol", "<code>i = " + i + "</code>: sol yan a[" + L + ".." + (i - 1) + "], sağ yan a[" + (i + 1) + ".." + R + "].");
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
          if (R <= L) { Tr.at("if", "<code>mergesort(a, b, " + L + ", " + R + ")</code>: tek öğe, zaten sıralı."); calls.pop(); return; }
          var m = Math.floor((R + L) / 2); V.m = String(m); P.m = m;
          Tr.at("if", "<code>mergesort(a, b, " + L + ", " + R + ")</code>.");
          Tr.at("m", "<code>m = (" + R + " + " + L + ") / 2 = " + m + "</code>.");
          Tr.at("l", "Sol yarı: <code>mergesort(a, b, " + L + ", " + m + ")</code>.");
          ms(L, m);
          Tr.fn("mergesort"); P = { L: L, m: m, R: R }; V = { m: String(m) }; look = {};
          Tr.at("r", "Sağ yarı: <code>mergesort(a, b, " + (m + 1) + ", " + R + ")</code>.");
          ms(m + 1, R);
          Tr.fn("mergesort"); P = { L: L, m: m, R: R }; V = { m: String(m) }; look = {};
          Tr.at("mg", "İki sıralı yarı <code>merge(a, b, " + L + ", " + m + ", " + R + ")</code> ile birleştirilir.");
          Tr.fn("merge");
          var i, j, k;
          for (i = m + 1; i > L; i--) b[i - 1] = a[i - 1];
          V = { i: String(i) };
          Tr.at("c1", "Sol yarı a[" + L + ".." + m + "] olduğu gibi b'ye kopyalandı; <code>i = " + i + "</code>.");
          for (j = m; j < R; j++) b[R + m - j] = a[j + 1];
          V.j = String(j);
          Tr.at("c2", "Sağ yarı a[" + (m + 1) + ".." + R + "] b'ye ters sırada kopyalandı; <code>j = " + j + "</code>. Böylece b'nin iki ucu birbirine bekçi olur.");
          for (k = L; k <= R; k++) {
            P = { k: k }; V = { i: String(i), j: String(j), k: String(k) }; look = {}; look[k] = "is-look";
            if (less(b[j], b[i])) { a[k] = b[j--]; Tr.at("k", "b[" + (j + 1) + "] = " + a[k] + " &lt; b[" + i + "] = " + b[i] + ": sağdan alındı, <code>a[" + k + "] = " + a[k] + "</code>."); }
            else { a[k] = b[i++]; Tr.at("k", "b[" + (j) + "] = " + b[j] + " &lt; b[" + (i - 1) + "] = " + a[k] + " değil: soldan alındı, <code>a[" + k + "] = " + a[k] + "</code>."); }
          }
          look = {};
          calls.pop();
        };
        ms(0, n - 1);
        b = null;
      } else if (mode === "heap") {
        var heapify = function (kok, hn) {
          Tr.fn("heapify"); var t = a[kok], j;
          V = { kok: String(kok), n: String(hn), t: String(t) }; P = { kok: kok }; look = {}; look[kok] = "is-look";
          Tr.at("t", "<code>heapify(a, " + kok + ", " + hn + ")</code>: <code>t = a[" + kok + "] = " + t + "</code>; t'nin heap içindeki yeri aranır.");
          for (j = 2 * kok; ; j *= 2) {
            V.j = String(j);
            if (j > hn) { Tr.at("for", "<code>j = " + j + "</code> &gt; " + hn + ": çocuk yok."); break; }
            P.j = j;
            Tr.at("for", "<code>j = " + j + "</code>: sol çocuk a[" + j + "] = " + a[j] + ".");
            if (j < hn && less(a[j], a[j + 1])) { j++; V.j = String(j); P.j = j; Tr.at("big", "Sağ çocuk a[" + j + "] = " + a[j] + " daha büyük: <code>j = " + j + "</code>."); }
            else Tr.at("big", "Büyük çocuk a[" + j + "] = " + a[j] + ".");
            cmp++;
            if (t >= a[j]) { Tr.at("c", t + " ≥ " + a[j] + ": t buraya sığar."); break; }
            Tr.at("c", t + " &lt; " + a[j] + ": çocuk yukarı alınır.");
            a[Math.floor(j / 2)] = a[j];
            Tr.at("mv", "<code>a[" + Math.floor(j / 2) + "] = a[" + j + "]</code>.");
          }
          a[Math.floor(j / 2)] = t; look = {}; look[Math.floor(j / 2)] = "is-hot";
          Tr.at("put", "<code>a[" + Math.floor(j / 2) + "] = " + t + "</code>.");
        };
        V = { n: String(n) };
        for (i = Math.floor(n / 2); i >= 1; i--) {
          Tr.fn("heapsort"); V = { i: String(i), n: String(n) }; P = { i: i }; look = {};
          Tr.at("k", "Heap kurma: <code>i = " + i + "</code>, <code>heapify(a, " + i + ", " + n + ")</code>.");
          heapify(i, n);
        }
        for (i = n - 1; ; i--) {
          Tr.fn("heapsort"); V = { i: String(i), n: String(i + 1) }; P = {}; look = {};
          if (i < 1) { Tr.at("s", "<code>i = 0</code>: sıralama bitti."); break; }
          Tr.at("s", "<code>i = " + i + "</code>: heap a[1.." + (i + 1) + "].");
          var t3 = a[1]; a[1] = a[i + 1]; a[i + 1] = t3; done[i + 1] = 1; V.n = String(i);
          Tr.at("sw", "<code>SWAP(a[1], a[" + (i + 1) + "])</code>: en büyük (" + a[i + 1] + ") sona alındı.");
          Tr.at("hf", "<code>heapify(a, 1, " + i + ")</code>: kök düzeltilir.");
          heapify(1, i);
        }
        done[1] = 1; a = a.slice(1);
        heap = false;
      } else {
        for (i = L; ; i++) {
          P = { i: i < R ? i : null }; V = { i: String(i) }; look = {};
          if (i >= R) { Tr.at("i", "<code>i = R</code>: son öğe kendiliğinden yerinde."); break; }
          var min = i; P.min = min; V.min = String(min);
          Tr.at("i", "Tur <code>i = " + i + "</code>.");
          Tr.at("min", "<code>min = " + i + "</code> (a[" + i + "] = " + a[i] + ").");
          for (j = i + 1; j <= R; j++) {
            P.j = j; V.j = String(j); look = {}; look[j] = "is-look"; look[min] = "is-hot";
            Tr.at("j", "<code>j = " + j + "</code>.");
            if (less(a[j], a[min])) { Tr.at("cmp", "a[" + j + "] = " + a[j] + " &lt; a[" + min + "] = " + a[min] + ": yeni en küçük."); min = j; P.min = min; V.min = String(min); Tr.at("set", "<code>min = " + j + "</code>."); }
            else Tr.at("cmp", "a[" + j + "] = " + a[j] + " &lt; a[" + min + "] = " + a[min] + " değil.");
          }
          var tt = a[i]; a[i] = a[min]; a[min] = tt; done[i] = 1; look = {}; delete P.j;
          Tr.at("swap", "<code>SWAP(a[" + i + "], a[" + min + "])</code>: tur bitti, a[" + i + "] = " + a[i] + " yerinde.");
        }
      }
      for (i = 0; i < n; i++) done[i] = 1;
      P = {}; V = {}; look = {}; calls = [];
      Tr.print(a.join(" ") + "\n");
      Tr.at(null, "Sıralı dizi: <b>" + a.join(", ") + "</b>; toplam " + cmp + " anahtar karşılaştırması.");
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
      examples.push({ name: s.dataset.name || "Örnek", mode: s.dataset.mode || "", text: s.textContent.trim() });
    });
    if (!examples.length || !fns.length) return;

    var bar = el("div", "lab-bar");
    var pick = el("select");
    pick.setAttribute("aria-label", "Hazır örnek");
    examples.forEach(function (ex, i) { var o = el("option", null, esc(ex.name)); o.value = i; pick.appendChild(o); });
    var btns = el("div", "lab-btns");
    var bBack = btn("back", "◀ Geri", "Bir adım geri"), bStep = btn("step", "Adım ▶", "Bir adım ilerle");
    var bPlay = btn("play", "Oynat", "Adımları otomatik oynat"), bReset = btn("reset", "Sıfırla", "Başa dön");
    [bBack, bStep, bPlay, bReset].forEach(function (b) { btns.appendChild(b); });
    var count = el("span", "lab-count");
    bar.appendChild(pick); bar.appendChild(btns); bar.appendChild(count);

    var inRow = el("div", "lab-in");
    var inId = uid + "-in";
    var lab = el("label", null, esc(model.label)); lab.htmlFor = inId;
    var input = el("input"); input.id = inId; input.type = "text"; input.spellcheck = false; input.autocomplete = "off";
    var bApply = btn("apply", "Uygula", "Girdiyi çalıştır");
    inRow.appendChild(lab); inRow.appendChild(input); inRow.appendChild(bApply);

    var main = el("div", "lab-main");
    var pCode = el("div", "lab-panel");
    var codeTitle = el("p", "lab-title", "Kod");
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

    function showCode(fn) {
      if (!code[fn]) fn = fns[0];
      if (fn === shownFn) return;
      shownFn = fn;
      codeTitle.innerHTML = "Kod" + (fns.length > 1 ? ": <b>" + esc(fn) + "</b>" : "");
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
      out.innerHTML = "<b>Çıktı</b><span>" + (ol.length ? esc(ol.slice(-2).join("\n")) : "(henüz yok)") + "</span>";
      out.title = ol.join("\n");
      count.textContent = "adım " + k + " / " + (steps.length - 1);
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
        status.innerHTML = "<b>Girdi okunamadı:</b> " + esc(r.error) + ". Önceki çalıştırma ekranda kalır.";
        return false;
      }
      steps = r.steps; k = 0;
      note = r.truncated ? "<b>Adım sınırına (" + MAX_STEPS + ") ulaşıldı; çalıştırma burada kesildi.</b>" : "";
      render();
      return true;
    }
    function stop() {
      if (!timer) return;
      clearInterval(timer); timer = null;
      bPlay.textContent = "Oynat"; bPlay.setAttribute("aria-label", "Adımları otomatik oynat");
    }
    function play() {
      if (timer) { stop(); return; }
      if (k >= steps.length - 1) k = 0;
      bPlay.textContent = "Durdur"; bPlay.setAttribute("aria-label", "Otomatik oynatmayı durdur");
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
