# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Gürültülü Görüntüde Kenar Bulmak',
    'problem': ('Kalite kontrol kamerası 32×32 gri tonlu bir parça görüntüsü verdi; sensör gürültülü. '
                'Adımları açıp kapatın, eşiği kaydırın: bulunan kenarların ne kadarı gerçekten şeklin sınırında?'),
    'html': '''
<svg viewBox="0 0 390 282" width="390" height="282" role="img" aria-label="Girdi ve çıktı görüntüsü, evrişim çekirdekleri"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-s="bul">1. Bulanıklaştır</button><button type="button" data-s="sob" class="is-on">2. Sobel kenar</button><button type="button" data-s="esk" class="is-on">3. Eşikle</button></div>
  <label>Eşik = <b class="ai-t">70</b></label>
  <input type="range" min="10" max="160" value="70" aria-label="Eşik">
  <div class="ai-out"></div>
  <div class="ai-out" style="font-size:13px">Her adım gerçek bir 3×3 <b>evrişim</b>. Bulanıklaştırıp eşiği biraz düşürün: gürültü kenarları azalır, F1 artar.</div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), out = root.querySelectorAll(".ai-out")[0];
  var range = root.querySelector("input"), tEl = root.querySelector(".ai-t");
  var sBtn = root.querySelectorAll("[data-s]");
  var N = 32, C = 5.5, Y0 = 18, XA = 6, XB = 208;
  var adim = { bul: false, sob: true, esk: true };
  var tohum = 3;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function gauss() { return (rnd() + rnd() + rnd() + rnd() - 2) / 0.58; }
  var temiz = [], girdi = [], x, y;
  for (y = 0; y < N; y++) for (x = 0; x < N; x++) {
    var v = 70 + x * 1.6;
    if (x >= 4 && x <= 14 && y >= 4 && y <= 13) v = 185;
    if ((x - 22.5) * (x - 22.5) + (y - 9.5) * (y - 9.5) <= 30) v = 35;
    if (y >= 18 && y <= 28 && Math.abs(x - 11) <= (y - 18) * 0.55) v = 170;
    if (y >= 20 && y <= 22 && x >= 18 && x <= 29) v = 215;
    if (y >= 25 && y <= 27 && x >= 18 && x <= 26) v = 215;
    temiz.push(v);
    girdi.push(Math.max(0, Math.min(255, v + 36 * gauss())));
  }
  var gercek = [];
  for (y = 0; y < N; y++) for (x = 0; x < N; x++) {
    var mn = 999, mx = -1;
    for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
      var q = temiz[Math.min(N - 1, Math.max(0, y + dy)) * N + Math.min(N - 1, Math.max(0, x + dx))];
      mn = Math.min(mn, q); mx = Math.max(mx, q);
    }
    gercek.push(mx - mn > 40);
  }
  var GAUSS = [1, 2, 1, 2, 4, 2, 1, 2, 1].map(function (k) { return k / 16; });
  var GX = [-1, 0, 1, -2, 0, 2, -1, 0, 1], GY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
  function evrisim(img, ker) {
    var r = [];
    for (var yy = 0; yy < N; yy++) for (var xx = 0; xx < N; xx++) {
      var s = 0, i = 0;
      for (var a = -1; a <= 1; a++) for (var b = -1; b <= 1; b++) {
        s += ker[i++] * img[Math.min(N - 1, Math.max(0, yy + a)) * N + Math.min(N - 1, Math.max(0, xx + b))];
      }
      r.push(s);
    }
    return r;
  }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function resim(x0) {
    var g = mk("g", { "shape-rendering": "crispEdges" }), hs = [];
    for (var i = 0; i < N * N; i++) {
      var r = mk("rect", { x: x0 + (i % N) * C, y: Y0 + Math.floor(i / N) * C, width: C + 0.3, height: C + 0.3 });
      g.appendChild(r); hs.push(r);
    }
    svg.appendChild(g);
    var c = mk("rect", { x: x0, y: Y0, width: N * C, height: N * C });
    c.style.fill = "none"; c.style.stroke = "var(--ds-border)";
    svg.appendChild(c);
    return hs;
  }
  svg.appendChild(mk("text", { x: XA, y: 12, "class": "lbl" }, "Girdi (gürültülü)"));
  var baslikB = mk("text", { x: XB, y: 12, "class": "lbl" }, "Çıktı");
  svg.appendChild(baslikB);
  var hA = resim(XA), hB = resim(XB);
  function boya(hs, img) { for (var i = 0; i < N * N; i++) { var v = Math.round(Math.max(0, Math.min(255, img[i]))); hs[i].style.fill = "rgb(" + v + "," + v + "," + v + ")"; } }
  boya(hA, girdi);
  var cek = [];
  function cekirdek(x0, ad, ker, metin) {
    var g = mk("g", {});
    g.appendChild(mk("text", { x: x0, y: 222, "class": "lbl" }, ad));
    for (var i = 0; i < 9; i++) {
      var r = mk("rect", { x: x0 + (i % 3) * 22, y: 228 + Math.floor(i / 3) * 17, width: 21, height: 16, rx: 2 });
      r.style.fill = "color-mix(in srgb, var(--ds-link) " + Math.round(Math.abs(ker[i]) / 4 * 45) + "%, var(--ds-bg))";
      r.style.stroke = "var(--ds-border)";
      g.appendChild(r);
      var t = mk("text", { x: x0 + (i % 3) * 22 + 10.5, y: 228 + Math.floor(i / 3) * 17 + 12.5, "text-anchor": "middle", "class": "lbl" }, metin[i]);
      t.style.fill = "var(--ds-text)"; t.style.fontSize = "11px";
      g.appendChild(t);
    }
    svg.appendChild(g);
    cek.push(g);
  }
  cekirdek(XA, "Gauss (÷16)", [1, 2, 1, 2, 4, 2, 1, 2, 1], ["1", "2", "1", "2", "4", "2", "1", "2", "1"]);
  cekirdek(XA + 90, "Sobel Gx", GX, ["−1", "0", "1", "−2", "0", "2", "−1", "0", "1"]);
  cekirdek(XA + 168, "Sobel Gy", GY, ["−1", "−2", "−1", "0", "0", "0", "1", "2", "1"]);
  var esikNot = mk("text", { x: XA + 252, y: 222, "class": "lbl" }, "Eşik");
  svg.appendChild(esikNot);
  var esikT = mk("text", { x: XA + 252, y: 248, "class": "txt" }, "");
  svg.appendChild(esikT);
  function ciz() {
    var T = +range.value;
    tEl.textContent = T;
    var img = girdi.slice(), ad = [];
    if (adim.bul) { img = evrisim(img, GAUSS); ad.push("bulanık"); }
    if (adim.sob) {
      var gx = evrisim(img, GX), gy = evrisim(img, GY);
      img = gx.map(function (v, i) { return Math.hypot(v, gy[i]) / 4; });
      ad.push("kenar gücü");
    }
    if (adim.esk) { img = img.map(function (v) { return v >= T ? 255 : 0; }); ad.push("eşik"); }
    boya(hB, img);
    baslikB.textContent = "Çıktı: " + (ad.length ? ad.join(" → ") : "girdinin aynısı");
    cek[0].style.opacity = adim.bul ? 1 : 0.3;
    cek[1].style.opacity = cek[2].style.opacity = adim.sob ? 1 : 0.3;
    esikNot.style.opacity = esikT.style.opacity = adim.esk ? 1 : 0.3;
    esikT.textContent = "≥ " + T;
    if (adim.sob && adim.esk) {
      var n = 0, d = 0, g = 0;
      for (var i = 0; i < N * N; i++) { if (gercek[i]) g++; if (img[i]) { n++; if (gercek[i]) d++; } }
      var kes = n ? d / n : 0, duy = d / g, f1 = kes + duy > 0 ? 2 * kes * duy / (kes + duy) : 0;
      out.innerHTML = "Kenar pikseli: " + n + " / 1024<br>Gerçek sınırda olan: %" + Math.round(kes * 100) +
        "<br>Sınırın yakalanan kısmı: %" + Math.round(duy * 100) + "<br>Denge (F1): <b>" + f1.toFixed(2).replace(".", ",") + "</b>";
    } else if (adim.esk) {
      var b = 0;
      img.forEach(function (v) { if (v) b++; });
      out.innerHTML = "Eşik doğrudan parlaklığa uygulandı: <b>" + b + "</b> piksel beyaz. Bu kenar değil, <b>bölge</b> ayırır.";
    } else {
      out.innerHTML = "Çıktı yine bir <b>görüntü</b>: " + (adim.sob ? "her pikselin kenar gücü (gri ton)." : (adim.bul ? "gürültü yumuşadı, kenarlar da biraz yayıldı." : "hiç adım seçilmedi."));
    }
  }
  sBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var a = btn.getAttribute("data-s"); adim[a] = !adim[a]; btn.classList.toggle("is-on", adim[a]); ciz();
    });
  });
  range.addEventListener("input", ciz);
  ciz();
''',
    'not': ('Görüntü işlemede girdi de çıktı da <b>görüntüdür</b>: süzgeçler pikselleri dönüştürür, karar vermez. '
            'Ders, hangi çekirdeğin ne yaptığını ve adımların sırasının sonucu nasıl değiştirdiğini öğretir.'),
}
