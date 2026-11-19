# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Müşteri Yorumu Olumlu mu?',
    'problem': ('Bir e-ticaret sitesine günde binlerce yorum geliyor; olumsuzlar hemen müşteri hizmetlerine gitmeli. '
                'Hazır bir yorum seçin ya da kendiniz yazın; model sözcükleri tek tek puanlar.'),
    'html': '''
<svg viewBox="0 0 400 236" width="400" height="236" role="img" aria-label="Yorumun sözcükleri, sözcük puanları ve toplam duygu puanı"></svg>
<div class="ai-side">
  <select aria-label="Hazır yorum"></select>
  <input type="text" aria-label="Yorum metni" maxlength="140">
  <div class="ai-ctl"><button type="button" class="is-on" data-a="neg">“değil” ve “-me” etkisini hesapla</button></div>
  <div class="ai-out"></div>
</div>''',
    'css': '''
.ds-deck .ai-demo select, .ds-deck .ai-demo input[type=text] { width: 100%; box-sizing: border-box; padding: 5px 8px; border: 1.5px solid var(--ds-border); border-radius: 8px; background: var(--ds-bg); color: var(--ds-text); font: inherit; font-size: 13.5px; }''',
    'js': r'''
  var svg = root.querySelector("svg"), out = root.querySelector(".ai-out");
  var sec = root.querySelector("select"), kutu = root.querySelector("input[type=text]"), nb = root.querySelector("[data-a=neg]");
  var HAZIR = [
    "Kargo çok hızlı geldi, ürün kaliteli ve sağlam. Tavsiye ederim.",
    "Ürün güzel ama kargo çok geç geldi, paketi de ezikti.",
    "Fiyatı pahalı değil, kalitesi de fena değil.",
    "Hiç beğenmedim, kutusu kırık geldi, iade ettim.",
    "Ekranı iyi değil ama pili harika, memnunum."
  ];
  var SOZ = [["harika", 3], ["mükemmel", 3], ["berbat", -3], ["rezalet", -3], ["güzel", 2], ["kaliteli", 2], ["kalitesiz", -2],
    ["iyi", 2], ["memnun", 2], ["tavsiye", 2], ["beğen", 2], ["sev", 2], ["sağlam", 1], ["hızlı", 1], ["kötü", -2], ["bozuk", -2],
    ["kırık", -2], ["ezik", -2], ["fena", -2], ["iade", -1], ["geç", -1], ["yavaş", -1], ["pahalı", -1], ["sorun", -1], ["ucuz", 1]];
  var FIIL = { "beğen": 1, "sev": 1 };
  var olumsuzlama = true;
  HAZIR.forEach(function (h, i) { var o = document.createElement("option"); o.value = i; o.textContent = (i + 1) + ". " + h.slice(0, 34) + "…"; sec.appendChild(o); });
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt !== undefined) e.textContent = txt; return e; }
  function bul(s) {
    for (var i = 0; i < SOZ.length; i++) {
      var k = SOZ[i][0];
      if (s.indexOf(k) === 0 && (k.length >= 4 || FIIL[k] || s.length <= k.length + 3)) {
        var neg = FIIL[k] && /^(me|ma)/.test(s.slice(k.length));
        return [SOZ[i][1], neg ? 1 : 0];
      }
    }
    return null;
  }
  function coz(metin) {
    var tok = metin.toLocaleLowerCase("tr").split(/[^a-zçğıöşüâî]+/).filter(function (t) { return t.length > 0; });
    var res = [], carpan = 1, guclu = 1;
    tok.forEach(function (t) {
      var r = { t: t, w: 0, not: "" };
      if (t === "ama" || t === "fakat" || t === "ancak") { carpan = 1.5; r.not = "sonrası ×1,5"; }
      else if (t === "çok" || t === "hiç") { guclu = 1.5; r.not = "güçlendirir"; }
      else if (t === "değil" || t === "degil") {
        r.not = "olumsuzlar";
        if (olumsuzlama) for (var j = res.length - 1; j >= 0; j--) if (res[j].w !== 0) { res[j].w = -res[j].w; res[j].ters = 1; break; }
      } else {
        var b = bul(t);
        if (b) {
          r.w = b[0] * guclu * carpan;
          if (b[1] && olumsuzlama) { r.w = -r.w; r.ters = 1; }
          guclu = 1;
        }
      }
      res.push(r);
    });
    return res;
  }
  function f(v) { return (v > 0 ? "+" : v < 0 ? "−" : "") + (Math.round(Math.abs(v) * 10) / 10).toString().replace(".", ","); }
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
    svg.appendChild(mk("text", { x: Math.max(45, Math.min(355, mx)), y: GY - 20, "text-anchor": "middle", "class": "txt" }, "toplam " + f(top))).style.fontSize = "13px";
    [["olumsuz", GX0, "start"], ["nötr", GX0 + GW / 2, "middle"], ["olumlu", GX0 + GW, "end"]].forEach(function (e) {
      svg.appendChild(mk("text", { x: e[1], y: GY + 30, "text-anchor": e[2], "class": "lbl" }, e[0]));
    });
    var karar = top > 0.5 ? "olumlu" : top < -0.5 ? "olumsuz" : "nötr";
    var say = res.filter(function (r) { return r.w !== 0; }).length;
    out.innerHTML = res.length + " sözcük, " + say + " tanesi duygu taşıyor.<br>Toplam puan <b>" + f(top) + "</b> → karar: <b style=\"color:" + (karar === "olumlu" ? "var(--ds-good)" : karar === "olumsuz" ? "var(--ds-bad)" : "var(--ds-muted)") + "\">" + karar + "</b>" +
      (karar === "olumsuz" ? "<br><span style=\"font-size:13px\">Yorum müşteri hizmetlerine yönlendirilir.</span>" : "") +
      (olumsuzlama ? "" : "<br><span style=\"font-size:13px\">Olumsuzlama kapalı: “iyi değil” hâlâ övgü sayılıyor.</span>");
  }
  sec.addEventListener("change", function () { kutu.value = HAZIR[+sec.value]; ciz(); });
  kutu.addEventListener("input", ciz);
  nb.addEventListener("click", function () { olumsuzlama = !olumsuzlama; nb.classList.toggle("is-on", olumsuzlama); ciz(); });
  sec.value = 4; kutu.value = HAZIR[4];
  ciz();
''',
    'not': ('Bilgisayar metni önce <b>sözcüklere</b> böler, sonra her sözcüğe bir ağırlık verir. Türkçede “beğenmedim” gibi ekler '
            'anlamı tersine çevirir; dil işleme bu yapıyı modele öğretmek zorundadır.'),
}
