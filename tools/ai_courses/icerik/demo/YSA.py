# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Mandalina mı, Limon mu?',
    'problem': ('Ayıklama bandındaki kamera her meyvenin ağırlığını ve renk tonunu ölçüyor. Tek bir yapay nöron (algılayıcı) '
                'iki türü ayırmayı öğreniyor: eğitin, ya da bir meyveye tıklayıp etiketini değiştirin.'),
    'html': '''
<svg viewBox="0 0 390 290" width="390" height="290" role="img" aria-label="Ağırlık ve renk tonuna göre meyveler ve algılayıcının karar doğrusu"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-a="adim">Bir adım eğit</button><button type="button" data-a="tur">Bir tur</button><button type="button" data-a="on">10 tur</button><button type="button" data-a="sifir">Sıfırla</button></div>
  <div class="ai-out ai-w"></div>
  <div class="ai-out ai-m"></div>
  <div class="ai-out" style="font-size:13px"><span style="color:#e9a23b;font-weight:700">●</span> mandalina &nbsp; <span style="color:var(--ds-good);font-weight:700">●</span> limon. Bir limonu turuncuların ortasına taşıyın: hiçbir doğru ayıramaz, hata <b>sıfıra inmez</b>.</div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg");
  var outW = root.querySelector(".ai-w"), outM = root.querySelector(".ai-m");
  var X0 = 42, Y0 = 10, PW = 336, PH = 244, ETA = 0.2;
  var tohum = 11;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  var ilk = [];
  var say = [0, 0];
  while (say[0] + say[1] < 28) {
    var x = 0.06 + 0.88 * rnd(), y = 0.06 + 0.88 * rnd(), m = (y - 0.5) - 0.9 * (x - 0.5);
    if (Math.abs(m) < 0.12) continue;
    var e = m > 0 ? 1 : -1, k = m > 0 ? 0 : 1;
    if (say[k] >= 14) continue;
    say[k]++; ilk.push([x, y, e]);
  }
  var veri, w, sira, tur, sonHata, gecmis, etkin;
  function sifirla() {
    veri = ilk.map(function (p) { return p.slice(); });
    w = [0.4, 0.1, -0.12]; sira = 0; tur = 0; gecmis = []; etkin = -1; sonHata = null;
  }
  function cikti(p) { return w[0] * (p[0] - 0.5) + w[1] * (p[1] - 0.5) + w[2] >= 0 ? 1 : -1; }
  function hataSay() { var h = 0; veri.forEach(function (p) { if (cikti(p) !== p[2]) h++; }); return h; }
  function adim() {
    var p = veri[sira], y = cikti(p);
    etkin = sira;
    if (y !== p[2]) {
      var d = ETA * p[2];
      w[0] += d * (p[0] - 0.5); w[1] += d * (p[1] - 0.5); w[2] += d;
      sonHata = "Örnek " + (sira + 1) + " yanlış sınıflandı → ağırlıklar güncellendi.";
    } else sonHata = "Örnek " + (sira + 1) + " doğru → ağırlıklar değişmedi.";
    sira++;
    if (sira >= veri.length) { sira = 0; tur++; gecmis.push(hataSay()); }
  }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function px(v) { return X0 + v * PW; }
  function py(v) { return Y0 + (1 - v) * PH; }
  function f(v) { return (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(2).replace(".", ","); }
  function ciz() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var G = 24;
    for (var gx = 0; gx < G; gx++) for (var gy = 0; gy < G; gy++) {
      var r = mk("rect", { x: px(gx / G), y: py((gy + 1) / G), width: PW / G + 0.5, height: PH / G + 0.5 });
      r.style.fill = cikti([(gx + 0.5) / G, (gy + 0.5) / G]) > 0 ? "#e9a23b" : "var(--ds-good)";
      r.style.opacity = 0.13;
      svg.appendChild(r);
    }
    var uc = [];
    if (Math.abs(w[1]) > 1e-9) [0, 1].forEach(function (x) { var y = 0.5 - (w[0] * (x - 0.5) + w[2]) / w[1]; if (y >= 0 && y <= 1) uc.push([x, y]); });
    if (Math.abs(w[0]) > 1e-9) [0, 1].forEach(function (y) { var x = 0.5 - (w[1] * (y - 0.5) + w[2]) / w[0]; if (x > 0 && x < 1) uc.push([x, y]); });
    if (uc.length >= 2) {
      var l = mk("path", { d: "M" + px(uc[0][0]) + " " + py(uc[0][1]) + " L" + px(uc[1][0]) + " " + py(uc[1][1]) });
      l.style.stroke = "var(--ds-link)"; l.style.strokeWidth = 3;
      svg.appendChild(l);
    }
    svg.appendChild(mk("path", { d: "M" + X0 + " " + Y0 + " V" + (Y0 + PH) + " H" + (X0 + PW), "class": "axis" }));
    svg.appendChild(mk("text", { x: X0 + PW / 2, y: Y0 + PH + 30, "text-anchor": "middle", "class": "lbl" }, "Ağırlık (g) →"));
    svg.appendChild(mk("text", { x: 14, y: Y0 + PH / 2, "text-anchor": "middle", "class": "lbl", transform: "rotate(-90 14 " + (Y0 + PH / 2) + ")" }, "Turuncu ton →"));
    veri.forEach(function (p, k) {
      var c = mk("circle", { cx: px(p[0]), cy: py(p[1]), r: k === etkin ? 7 : 5.5 });
      c.style.fill = p[2] > 0 ? "#e9a23b" : "var(--ds-good)";
      c.style.stroke = cikti(p) !== p[2] ? "var(--ds-accent)" : "var(--ds-bg)";
      c.style.strokeWidth = cikti(p) !== p[2] ? 2.5 : 1.2;
      c.style.cursor = "pointer";
      c.addEventListener("click", function (ev) { ev.stopPropagation(); p[2] = -p[2]; etkin = k; sonHata = "Örnek " + (k + 1) + " etiketi değiştirildi."; ciz(); });
      svg.appendChild(c);
      if (k === etkin) { var h = mk("circle", { cx: px(p[0]), cy: py(p[1]), r: 11, fill: "none" }); h.style.stroke = "var(--ds-text)"; h.style.strokeWidth = 1.5; h.style.pointerEvents = "none"; svg.appendChild(h); }
    });
    var hs = hataSay();
    outW.innerHTML = "çıktı = işaret(<b>" + f(w[0]) + "</b>·ağırlık <b>" + f(w[1]) + "</b>·ton <b>" + f(w[2] - 0.5 * w[0] - 0.5 * w[1]) + "</b>)";
    outM.innerHTML = "Tur " + tur + ", sıradaki örnek " + (sira + 1) + "/" + veri.length + ".<br>" + (sonHata ? sonHata + "<br>" : "") +
      "Yanlış sınıflanan: <b>" + hs + "</b> meyve" + (hs === 0 ? " (ayrıldı ✓)" : "") + (gecmis.length ? " · tur sonu hatalar: " + gecmis.slice(-6).join(", ") : "");
  }
  root.querySelectorAll("[data-a]").forEach(function (b) {
    b.addEventListener("click", function () {
      var a = b.getAttribute("data-a");
      if (a === "adim") adim();
      else if (a === "tur" || a === "on") { for (var n = 0; n < (a === "on" ? 10 : 1); n++) { var t0 = tur; do { adim(); } while (tur === t0); } sonHata = null; }
      else sifirla();
      ciz();
    });
  });
  sifirla();
  ciz();
''',
    'not': ('Kuralı kimse yazmadı: nöron her hatada ağırlıkları hatanın yönüne biraz kaydırdı. Tek nöron yalnız <b>doğrusal</b> '
            'sınır çizebilir; ayrılamayan veride katmanlı ağa ihtiyaç doğar.'),
}
