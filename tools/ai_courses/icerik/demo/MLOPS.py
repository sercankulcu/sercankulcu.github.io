# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Model Üretimde Sessizce Bozuluyor',
    'problem': ('Bankanın sahtecilik modeli olağan dışı büyük işlemleri işaretliyor; fiyatlar her hafta biraz artıyor. '
                'Haftayı ilerletin, kaymayı (PSI) ve doğruluğu izleyin; alarm çalınca modeli yeniden eğitin.'),
    'html': '''
<svg viewBox="0 0 390 288" width="390" height="288" role="img" aria-label="Eğitim ve bu haftanın dağılımı, doğruluk ve PSI eğrileri"></svg>
<div class="ai-side">
  <label>Üretimdeki hafta: <b class="ai-h">8</b></label>
  <input type="range" min="0" max="24" step="1" value="8" aria-label="Hafta">
  <div class="ai-ctl"><button type="button" data-e="1">Yeniden eğit</button><button type="button" data-s="1">Baştan al</button></div>
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px">PSI, bu haftanın dağılımını eğitim verisiyle on dilimde karşılaştırır. <b>0,2</b> üstü alarm sayılır. Etiketler geç gelir; PSI ise hemen hesaplanır.</div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), range = root.querySelector("input"), hEl = root.querySelector(".ai-h");
  var out = root.querySelectorAll(".ai-out")[0];
  var tohum = 11;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function gauss() { return Math.sqrt(-2 * Math.log(rnd())) * Math.cos(2 * Math.PI * rnd()); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt !== undefined) e.textContent = txt; return e; }
  function f(v, n) { return v.toFixed(n).replace(".", ","); }
  var HAFTA = 24, N = 500, ALARM = 0.2, veri = [];
  for (var t = 0; t <= HAFTA; t++) {
    var mu = 0.11 * t, hf = [];
    for (var i = 0; i < N; i++) {
      var sahte = rnd() < 0.08;
      hf.push([sahte ? mu + 3.1 + 0.6 * gauss() : mu + gauss(), sahte ? 1 : 0]);
    }
    veri.push(hf);
  }
  function dogruluk(hf, esik) { var d = 0; hf.forEach(function (p) { if ((p[0] > esik ? 1 : 0) === p[1]) d++; }); return d / hf.length; }
  var modeller = {};
  function model(w) {
    if (modeller[w]) return modeller[w];
    var hf = veri[w], en = -9, enD = -1;
    for (var e = -2; e <= 7; e += 0.05) { var d = dogruluk(hf, e); if (d > enD) { enD = d; en = e; } }
    var xs = hf.map(function (p) { return p[0]; }).sort(function (a, b) { return a - b; }), sin = [];
    for (var q = 1; q < 10; q++) sin.push(xs[Math.floor(q * xs.length / 10)]);
    modeller[w] = { esik: en, sinir: sin };
    return modeller[w];
  }
  function psi(m, hf) {
    var say = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    hf.forEach(function (p) { var k = 0; while (k < 9 && p[0] >= m.sinir[k]) k++; say[k]++; });
    var s = 0;
    say.forEach(function (c) { var a = Math.max(c / hf.length, 1e-4), e = 0.1; s += (a - e) * Math.log(a / e); });
    return s;
  }
  var egitim = [0];
  function aktif(w) { var r = 0; egitim.forEach(function (e) { if (e <= w && e > r) r = e; }); return r; }
  var XA0 = 8, XA1 = 384, A0 = -3.4, A1 = 8.4, YA = 96;
  function ax(v) { return XA0 + (v - A0) / (A1 - A0) * (XA1 - XA0); }
  var XW0 = 40, XW1 = 380;
  function wx(w) { return XW0 + w / HAFTA * (XW1 - XW0); }
  function hist(hf) {
    var B = 36, h = []; for (var i = 0; i < B; i++) h.push(0);
    hf.forEach(function (p) { var k = Math.floor((p[0] - A0) / (A1 - A0) * B); if (k >= 0 && k < B) h[k]++; });
    return h;
  }
  function ciz() {
    var w = +range.value, r = aktif(w), m = model(r);
    hEl.textContent = w;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var hr = hist(veri[r]), hc = hist(veri[w]), mx = 0, B = hr.length, bw = (XA1 - XA0) / B;
    hr.concat(hc).forEach(function (v) { if (v > mx) mx = v; });
    hc.forEach(function (v, i) {
      var hh = v / mx * 76, b = mk("rect", { x: XA0 + i * bw + 0.5, y: YA - hh, width: bw - 1, height: hh });
      b.style.fill = "color-mix(in srgb, #e9a23b 60%, var(--ds-bg))"; svg.appendChild(b);
    });
    var d = "M" + XA0 + " " + YA;
    hr.forEach(function (v, i) { var y = YA - v / mx * 76; d += " V" + y + " H" + (XA0 + (i + 1) * bw); });
    d += " V" + YA;
    var ref = mk("path", { d: d }); ref.style.fill = "none"; ref.style.stroke = "var(--ds-link)"; ref.style.strokeWidth = 1.8; svg.appendChild(ref);
    svg.appendChild(mk("path", { d: "M" + XA0 + " " + YA + " H" + XA1, "class": "axis" }));
    var ex = ax(m.esik), el = mk("line", { x1: ex, y1: 10, x2: ex, y2: YA, "stroke-dasharray": "4 3" });
    el.style.stroke = "var(--ds-accent)"; el.style.strokeWidth = 2; svg.appendChild(el);
    var et = mk("text", { x: ex + 4, y: 20 }, "modelin eşiği"); et.style.fontSize = "11px"; et.style.fill = "var(--ds-accent)"; svg.appendChild(et);
    var l1 = mk("text", { x: XA0, y: 12 }, "— eğitim (hafta " + r + ")"); l1.style.fontSize = "11px"; l1.style.fill = "var(--ds-link)"; svg.appendChild(l1);
    var l2 = mk("text", { x: XA0, y: 26 }, "■ bu hafta"); l2.style.fontSize = "11px"; l2.style.fill = "#e9a23b"; svg.appendChild(l2);
    var l3 = mk("text", { x: XA1, y: YA + 13, "text-anchor": "end", "class": "lbl" }, "İşlem tutarı →"); l3.style.fontSize = "11px"; svg.appendChild(l3);
    var Y1 = 122, Y2 = 186, P1 = 200, P2 = 260, sonDog = 0, sonPsi = 0, dyol = "";
    var g1 = mk("text", { x: XW0 - 4, y: Y1 + 4, "text-anchor": "end", "class": "lbl" }, "%100"); g1.style.fontSize = "10px"; svg.appendChild(g1);
    var g2 = mk("text", { x: XW0 - 4, y: Y2 + 4, "text-anchor": "end", "class": "lbl" }, "%40"); g2.style.fontSize = "10px"; svg.appendChild(g2);
    var g3 = mk("text", { x: XW0 + 4, y: Y2 - 5 }, "doğruluk"); g3.style.fontSize = "11px"; g3.style.fill = "var(--ds-link)"; svg.appendChild(g3);
    svg.appendChild(mk("path", { d: "M" + XW0 + " " + Y1 + " V" + Y2 + " H" + XW1, "class": "axis" }));
    for (var t = 0; t <= w; t++) {
      var mt = model(aktif(t)), dg = dogruluk(veri[t], mt.esik), ps = psi(mt, veri[t]);
      var y = Y1 + (1 - Math.max(0, (dg - 0.4) / 0.6)) * (Y2 - Y1);
      dyol += (t ? " L" : "M") + wx(t) + " " + y;
      var ph = Math.min(1, ps / 0.8) * (P2 - P1), bar = mk("rect", { x: wx(t) - 5, y: P2 - ph, width: 10, height: ph });
      bar.style.fill = ps > ALARM ? "var(--ds-bad)" : "color-mix(in srgb, var(--ds-good) 70%, var(--ds-bg))"; svg.appendChild(bar);
      if (t === w) { sonDog = dg; sonPsi = ps; }
    }
    var dl = mk("path", { d: dyol }); dl.style.fill = "none"; dl.style.stroke = "var(--ds-link)"; dl.style.strokeWidth = 2.5; svg.appendChild(dl);
    egitim.forEach(function (e) {
      if (e === 0 || e > w) return;
      var v = mk("line", { x1: wx(e), y1: Y1, x2: wx(e), y2: P2, "stroke-dasharray": "2 3" });
      v.style.stroke = "var(--ds-good)"; v.style.strokeWidth = 2; svg.appendChild(v);
      var vt = mk("text", { x: wx(e), y: Y1 - 3, "text-anchor": "middle" }, "eğitildi"); vt.style.fontSize = "10px"; vt.style.fill = "var(--ds-good)"; svg.appendChild(vt);
    });
    var ay = P2 - ALARM / 0.8 * (P2 - P1), al = mk("line", { x1: XW0, y1: ay, x2: XW1, y2: ay, "stroke-dasharray": "5 3" });
    al.style.stroke = "var(--ds-accent)"; al.style.strokeWidth = 1.5; svg.appendChild(al);
    var at = mk("text", { x: XW0 - 4, y: ay + 4, "text-anchor": "end" }, "0,2"); at.style.fontSize = "10px"; at.style.fill = "var(--ds-accent)"; svg.appendChild(at);
    var pt = mk("text", { x: XW0 + 4, y: P1 + 2 }, "PSI (kayma)"); pt.style.fontSize = "11px"; pt.style.fill = "var(--ds-muted)"; svg.appendChild(pt);
    svg.appendChild(mk("path", { d: "M" + XW0 + " " + P1 + " V" + P2 + " H" + XW1, "class": "axis" }));
    for (var k = 0; k <= HAFTA; k += 4) {
      var kt = mk("text", { x: wx(k), y: P2 + 13, "text-anchor": "middle", "class": "lbl" }, k); kt.style.fontSize = "10px"; svg.appendChild(kt);
    }
    var hk = mk("text", { x: XW1, y: P2 + 26, "text-anchor": "end", "class": "lbl" }, "hafta →"); hk.style.fontSize = "10px"; svg.appendChild(hk);
    var cl = mk("line", { x1: wx(w), y1: Y1, x2: wx(w), y2: P2 }); cl.style.stroke = "var(--ds-text)"; cl.style.opacity = 0.35; svg.appendChild(cl);
    var ilk = dogruluk(veri[r], m.esik);
    out.innerHTML = "Hafta " + w + ": PSI = <b>" + f(sonPsi, 2) + "</b> " + (sonPsi > ALARM ? "→ <b>ALARM</b>" : "(sakin)") +
      "<br>Doğruluk <b>%" + f(100 * sonDog, 1) + "</b> (eğitildiği hafta %" + f(100 * ilk, 1) + ")" +
      "<br>Model hafta " + r + " verisiyle eğitildi.";
  }
  range.addEventListener("input", ciz);
  root.querySelector("[data-e]").addEventListener("click", function () { var w = +range.value; if (egitim.indexOf(w) < 0) egitim.push(w); ciz(); });
  root.querySelector("[data-s]").addEventListener("click", function () { egitim = [0]; ciz(); });
  ciz();
''',
    'not': ('Model yazılım gibi bir kez kurulup bırakılmaz: MLOps <b>izleme</b>, alarm ve otomatik yeniden eğitim hattını kurar. '
            'Kayma, doğruluk düşmeden önce yakalanır.'),
}
