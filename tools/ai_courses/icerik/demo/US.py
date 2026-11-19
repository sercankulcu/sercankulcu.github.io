# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Araç Neden Çalışmıyor?',
    'problem': ('Servis ustasının bilgisi dokuz EĞER–İSE kuralına yazıldı. Soldaki belirtilere tıklayarak işaretleyin; '
                'sistem ileri zincirlemeyle kuralları sırayla tetikleyip teşhise varır ve nedenini açıklar.'),
    'html': '''
<svg viewBox="0 0 390 284" width="390" height="284" role="img" aria-label="Belirtiler, ara sonuçlar ve teşhisler arasındaki kurallar"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-o="1">Örnek: akü</button><button type="button" data-o="2">Örnek: marş</button><button type="button" data-o="0">Temizle</button></div>
  <div class="ai-out" style="font-size:13px"></div>
  <div class="ai-out" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var AD = ["Farlar sönük", "Farlar parlak", "Marş sessiz", "Marşta tık sesi", "Marş dönüyor", "Gösterge boş", "Benzin kokusu",
            "Akü sağlam", "Yakıt/ateşleme", "Akü zayıf", "Marş arızalı", "Yakıt bitti", "Motor boğulmuş", "Ateşleme arızası"];
  var POS = [];
  for (var i = 0; i < 7; i++) POS.push([2, 20 + i * 38, 112]);
  POS.push([146, 112, 100]); POS.push([146, 204, 100]);
  for (var j = 0; j < 5; j++) POS.push([276, 22 + j * 52, 112]);
  var KR = [
    { ad: "K1", e: [0, 3], d: [], s: 9 }, { ad: "K2", e: [0, 2], d: [], s: 9 },
    { ad: "K3", e: [1], d: [], s: 7 }, { ad: "K4", e: [4], d: [], s: 7 },
    { ad: "K5", e: [7, 2], d: [], s: 10 }, { ad: "K6", e: [7, 4], d: [], s: 8 },
    { ad: "K7", e: [8, 5], d: [], s: 11 }, { ad: "K8", e: [8, 6], d: [], s: 12 },
    { ad: "K9", e: [8], d: [5, 6], s: 13 }
  ];
  var belirti = {}, adimlar = [], goster = 0, timer = null;
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function zincirle() {
    var bilinen = {}, adim = [], kaynak = {};
    for (var b in belirti) if (belirti[b]) bilinen[b] = true;
    var degisti = true;
    while (degisti) {
      degisti = false;
      for (var r = 0; r < KR.length; r++) {
        var k = KR[r];
        if (bilinen[k.s]) continue;
        var ok = k.e.every(function (x) { return bilinen[x]; }) && k.d.every(function (x) { return !bilinen[x]; });
        if (ok) { bilinen[k.s] = true; kaynak[k.s] = r; adim.push(r); degisti = true; break; }
      }
    }
    return { adim: adim, kaynak: kaynak };
  }
  var sonuc;
  function neden(f) {
    var r = sonuc.kaynak[f];
    if (r === undefined) return AD[f];
    var k = KR[r], p = k.e.map(neden).concat(k.d.map(function (x) { return "¬" + AD[x]; }));
    return AD[f] + " ← " + k.ad + " (" + p.join(", ") + ")";
  }
  function ciz() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    [["Belirtiler", 58], ["Ara sonuç", 196], ["Teşhis", 332]].forEach(function (h) { svg.appendChild(mk("text", { x: h[1], y: 11, "text-anchor": "middle", "class": "lbl" }, h[0])); });
    var acik = {}, tur = {};
    for (var g = 0; g < goster; g++) { acik[sonuc.adim[g]] = g + 1; tur[KR[sonuc.adim[g]].s] = true; }
    [0, 1].forEach(function (gecis) { KR.forEach(function (k, r) {
      if (!!acik[r] !== !!gecis) return;
      var t = POS[k.s];
      k.e.concat(k.d).forEach(function (x, xi) {
        var s = POS[x], x1 = s[0] + s[2], y1 = s[1] + 13, x2 = t[0], y2 = t[1] + 13, m = (x1 + x2) / 2;
        var p = mk("path", { d: "M" + x1 + " " + y1 + " C" + m + " " + y1 + " " + m + " " + y2 + " " + x2 + " " + y2 });
        p.style.fill = "none";
        p.style.stroke = acik[r] ? "var(--ds-accent)" : "var(--ds-border)";
        p.style.strokeWidth = acik[r] ? 2.6 : 1.2;
        if (xi >= k.e.length) p.setAttribute("stroke-dasharray", "4 3");
        svg.appendChild(p);
      });
    }); });
    AD.forEach(function (a, f) {
      var p = POS[f], g = mk("g", {});
      var r = mk("rect", { x: p[0], y: p[1], width: p[2], height: 26, rx: 6 });
      var on = f < 7 ? belirti[f] : tur[f];
      r.style.fill = !on ? "var(--ds-bg)" : f < 7 ? "color-mix(in srgb, var(--ds-link) 28%, var(--ds-bg))" :
        f < 9 ? "color-mix(in srgb, #e9a23b 40%, var(--ds-bg))" : "color-mix(in srgb, var(--ds-good) 40%, var(--ds-bg))";
      r.style.stroke = on ? "var(--ds-text)" : "var(--ds-border)"; r.style.strokeWidth = 1.4;
      g.appendChild(r);
      var t = mk("text", { x: p[0] + p[2] / 2, y: p[1] + 17, "text-anchor": "middle", "class": "lbl" }, (f < 7 ? (on ? "☑ " : "☐ ") : "") + a);
      t.style.fill = "var(--ds-text)"; if (on) t.style.fontWeight = 700;
      g.appendChild(t);
      if (f < 7) {
        g.style.cursor = "pointer";
        g.addEventListener("click", function () { belirti[f] = !belirti[f]; calis(); });
      }
      if (f >= 7 && tur[f]) {
        var n = acik[sonuc.kaynak[f]], c = mk("circle", { cx: p[0] - 1, cy: p[1] + 1, r: 8 });
        c.style.fill = "var(--ds-accent)"; g.appendChild(c);
        var nt = mk("text", { x: p[0] - 1, y: p[1] + 5, "text-anchor": "middle", "class": "lbl" }, String(n));
        nt.style.fill = "var(--ds-bg)"; nt.style.fontWeight = 700; g.appendChild(nt);
      }
      svg.appendChild(g);
    });
    var sat = [];
    for (var s = 0; s < goster; s++) {
      var k = KR[sonuc.adim[s]];
      sat.push(s + 1 + ". <b>" + k.ad + "</b>: " + k.e.map(function (x) { return AD[x]; }).concat(k.d.map(function (x) { return "¬" + AD[x]; })).join(" ∧ ") + " → " + AD[k.s]);
    }
    outs[0].innerHTML = sat.length ? sat.join("<br>") : "Henüz tetiklenen kural yok.";
    if (goster < sonuc.adim.length) { outs[1].innerHTML = "Çıkarım sürüyor…"; return; }
    var ts = [];
    for (var d = 9; d < 14; d++) if (tur[d]) ts.push(d);
    outs[1].innerHTML = ts.length
      ? ts.map(function (d) { return "Teşhis: <b>" + AD[d] + "</b><br>Neden? " + neden(d); }).join("<br>")
      : "Hiçbir teşhis kuralı tetiklenmedi; belirti ekleyin. (¬ = gözlenmedi)";
  }
  function calis() {
    if (timer) { clearInterval(timer); timer = null; }
    sonuc = zincirle(); goster = 0; ciz();
    if (!sonuc.adim.length) return;
    timer = setInterval(function () { goster++; ciz(); if (goster >= sonuc.adim.length) { clearInterval(timer); timer = null; } }, 450);
  }
  var ORN = [[], [0, 2], [1, 2]];
  root.querySelectorAll("[data-o]").forEach(function (b) {
    b.addEventListener("click", function () { belirti = {}; ORN[+b.dataset.o].forEach(function (x) { belirti[x] = true; }); calis(); });
  });
  belirti = { 4: true, 6: true };
  calis();
''',
    'not': ('Bilgi koddan ayrı bir <b>kural tabanında</b> durur; çıkarım motoru kuralları zincirler. Usta yeni bir kural eklediğinde '
            'program değişmez, sistem her kararını hangi kurallarla verdiğini açıklayabilir.'),
}
