# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Klimayı Bulanık Kurallar Yönetir',
    'problem': ('Klima, "hava sıcak ve nemliyse fanı hızlı çalıştır" gibi sözel kurallarla yönetiliyor. '
                'Sıcaklığı ve nemi değiştirin; hangi kuralların ne kadar tetiklendiğini ve çıkan fan hızını izleyin.'),
    'html': '''
<svg viewBox="0 0 390 290" width="390" height="290" role="img" aria-label="Sıcaklık, nem ve fan hızı üyelik fonksiyonları"></svg>
<div class="ai-side">
  <label>Sıcaklık = <b class="ai-t">27</b> °C</label>
  <input type="range" class="ai-rt" min="10" max="40" step="0.5" value="27" aria-label="Sıcaklık">
  <label>Bağıl nem = <b class="ai-h">%65</b></label>
  <input type="range" class="ai-rh" min="20" max="100" step="1" value="65" aria-label="Nem">
  <div class="ai-out" style="font-size:12.5px;line-height:1.5"></div>
  <div class="ai-out"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var rt = root.querySelector(".ai-rt"), rh = root.querySelector(".ai-rh");
  var tEl = root.querySelector(".ai-t"), hEl = root.querySelector(".ai-h");
  var X0 = 40, PW = 336, PH = 50, TOPS = [18, 112, 206];
  var C3 = ["var(--ds-link)", "#e9a23b", "var(--ds-bad)"];
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function f(v, d) { return v.toFixed(d).replace(".", ","); }
  function trap(x, a, b, c, d) {
    if (x < a || x > d) return 0;
    if (x >= b && x <= c) return 1;
    return x < b ? (x - a) / (b - a) : (d - x) / (d - c);
  }
  var SIC = { lo: 10, hi: 40, ad: "Sıcaklık (°C)", t: [["soğuk", [10, 10, 16, 22]], ["ılık", [18, 24, 24, 30]], ["sıcak", [26, 32, 40, 40]]] };
  var NEM = { lo: 20, hi: 100, ad: "Bağıl nem (%)", t: [["kuru", [20, 20, 40, 60]], ["nemli", [40, 60, 100, 100]]] };
  var FAN = { lo: 0, hi: 100, ad: "Fan hızı (%)", t: [["düşük", [0, 0, 20, 40]], ["orta", [25, 50, 50, 75]], ["yüksek", [60, 80, 100, 100]]] };
  var KURAL = [[0, -1, 0], [1, 0, 0], [1, 1, 1], [2, 0, 1], [2, 1, 2]];
  function uy(v, d, i) { var p = d.t[i][1]; return trap(v, p[0], p[1], p[2], p[3]); }
  function hesapla(T, H) {
    var g = KURAL.map(function (k) { var a = uy(T, SIC, k[0]); return k[1] < 0 ? a : Math.min(a, uy(H, NEM, k[1])); });
    var cik = [0, 0, 0];
    KURAL.forEach(function (k, i) { cik[k[2]] = Math.max(cik[k[2]], g[i]); });
    var pay = 0, payda = 0;
    for (var y = 0; y <= 100; y += 0.5) {
      var m = 0;
      for (var j = 0; j < 3; j++) m = Math.max(m, Math.min(cik[j], uy(y, FAN, j)));
      pay += m * y; payda += m;
    }
    return { g: g, cik: cik, hiz: payda ? pay / payda : 0 };
  }
  function eksen(d, top, renkler, deger, kirp) {
    function px(v) { return X0 + (v - d.lo) / (d.hi - d.lo) * PW; }
    function py(m) { return top + PH - m * PH; }
    svg.appendChild(mk("text", { x: X0, y: top - 6, "class": "lbl" }, d.ad));
    d.t.forEach(function (t, i) {
      var p = t[1], s = "M" + px(p[0]) + " " + py(0) + " L" + px(p[1]) + " " + py(1) + " L" + px(p[2]) + " " + py(1) + " L" + px(p[3]) + " " + py(0);
      if (kirp) {
        var h = kirp[i], dd = "M" + px(p[0]) + " " + py(0);
        for (var y = p[0]; y <= p[3]; y += 0.5) dd += " L" + px(y).toFixed(1) + " " + py(Math.min(h, uy(y, d, i))).toFixed(1);
        var fl = mk("path", { d: dd + " L" + px(p[3]) + " " + py(0) + " Z" });
        fl.style.fill = renkler[i]; fl.style.opacity = 0.3; svg.appendChild(fl);
      }
      var e = mk("path", { d: s });
      e.style.fill = "none"; e.style.stroke = renkler[i]; e.style.strokeWidth = 2;
      svg.appendChild(e);
      var lb = mk("text", { x: px((p[1] + p[2]) / 2), y: top + 12, "text-anchor": "middle", "class": "lbl" }, t[0]);
      lb.style.fill = "color-mix(in srgb, " + renkler[i] + " 75%, var(--ds-text))"; lb.style.fontWeight = 700; svg.appendChild(lb);
    });
    svg.appendChild(mk("path", { d: "M" + X0 + " " + (top + PH) + " H" + (X0 + PW), "class": "axis" }));
    for (var v = d.lo; v <= d.hi; v += (d.hi - d.lo) / 5) svg.appendChild(mk("text", { x: px(v), y: top + PH + 13, "text-anchor": "middle", "class": "lbl" }, String(v)));
    var dl = mk("path", { d: "M" + px(deger) + " " + (top - 2) + " V" + (top + PH) });
    dl.style.stroke = "var(--ds-text)"; dl.style.strokeWidth = 2; dl.setAttribute("stroke-dasharray", "5 3");
    svg.appendChild(dl);
    return px;
  }
  function ciz() {
    var T = +rt.value, H = +rh.value, r = hesapla(T, H);
    tEl.textContent = f(T, 1); hEl.textContent = "%" + H;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    eksen(SIC, TOPS[0], C3, T);
    eksen(NEM, TOPS[1], ["var(--ds-link)", "var(--ds-good)"], H);
    var px = eksen(FAN, TOPS[2], C3, r.hiz, r.cik);
    svg.appendChild(mk("text", { x: px(r.hiz) + (r.hiz > 70 ? -4 : 4), y: TOPS[2] - 6, "text-anchor": r.hiz > 70 ? "end" : "start", "class": "lbl" }, "ağırlık merkezi " + f(r.hiz, 0)));
    var ad = ["soğuk → düşük", "ılık ∧ kuru → düşük", "ılık ∧ nemli → orta", "sıcak ∧ kuru → orta", "sıcak ∧ nemli → yüksek"];
    outs[0].innerHTML = ad.map(function (a, i) {
      var w = Math.round(r.g[i] * 60);
      return '<span style="display:inline-block;width:62px;height:9px;margin-right:6px;border:1px solid var(--ds-border);border-radius:3px;vertical-align:middle;background:linear-gradient(90deg, var(--ds-accent) ' +
        w + 'px, transparent ' + w + 'px)"></span>' + (r.g[i] > 0 ? "<b>" + f(r.g[i], 2) + "</b> " : "0 ") + a;
    }).join("<br>");
    var ust = hesapla(Math.min(40, T + 1), H).hiz;
    outs[1].innerHTML = "Fan hızı: <b>%" + f(r.hiz, 0) + "</b><br><span style=\"font-size:13px\">1 °C daha sıcakta %" + f(ust, 0) +
      ". Keskin bir eşik kuralı hızı sıçratırdı; bulanık kurallar yumuşak geçiş verir.</span>";
  }
  svg.addEventListener("click", function (ev) {
    var b = svg.getBoundingClientRect();
    var vx = (ev.clientX - b.left) / b.width * 390, vy = (ev.clientY - b.top) / b.height * 290;
    var u = (vx - X0) / PW;
    if (u < 0 || u > 1) return;
    if (vy < TOPS[0] + PH + 16) rt.value = Math.round((10 + u * 30) * 2) / 2;
    else if (vy < TOPS[1] + PH + 16) rh.value = Math.round(20 + u * 80);
    ciz();
  });
  rt.addEventListener("input", ciz);
  rh.addEventListener("input", ciz);
  ciz();
''',
    'not': ('Uzman bilgisi sözel kurallar olarak yazıldı; bulanık mantık her kuralı <b>kısmen</b> tetikler, sonuçları birleştirip '
            'ağırlık merkeziyle tek bir sayıya çevirir. Matematik model gerekmez.'),
}
