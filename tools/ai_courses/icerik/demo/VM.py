# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Market Sepetinde Gizli Kurallar',
    'problem': ('Mahalle marketi 14 kasa fişine bakıyor: kimse bir soru sormadı, hangi ürünlerin birlikte alındığını veri söylesin. '
                'Eşikleri değiştirin, Apriori kuralları yeniden bulsun; bir kurala tıklayıp sepetlerde görün.'),
    'html': '''
<svg viewBox="0 0 330 290" width="330" height="290" role="img" aria-label="14 sepet ve içindeki ürünler"></svg>
<div class="ai-side">
  <label>En az destek: <b class="ai-sup">3</b> sepet</label>
  <input type="range" class="ai-rs" min="2" max="7" step="1" value="3" aria-label="En az destek">
  <label>En az güven: <b class="ai-conf">%60</b></label>
  <input type="range" class="ai-rc" min="40" max="100" step="5" value="60" aria-label="En az güven">
  <div class="ai-out ai-say" style="font-size:13px"></div>
  <div class="ai-kur"></div>
</div>''',
    'css': ('.ds-deck .ai-demo .ai-kur { display: flex; flex-direction: column; gap: 4px; }\n'
            '.ds-deck .ai-demo .ai-kur button { border-radius: 8px; text-align: left; font-size: 13px; padding: 3px 9px; }\n'
            '.ds-deck .ai-demo .ai-kur button b { color: var(--ds-accent); }\n'
            '.ds-deck .ai-demo > svg { width: 285px; height: auto; }\n'
            '.ds-deck .ai-demo .ai-side { gap: 5px; }\n'
            '.ds-deck .ai-demo .ai-kur { gap: 3px; }\n'
            '.ds-deck .ai-demo .ai-kur button { font-size: 12.5px; padding: 2px 8px; line-height: 1.3; }'),
    'js': r'''
  var svg = root.querySelector("svg"), say = root.querySelector(".ai-say"), kurKutu = root.querySelector(".ai-kur");
  var rs = root.querySelector(".ai-rs"), rc = root.querySelector(".ai-rc");
  var URUN = ["Ekmek", "Peynir", "Zeytin", "Çay", "Simit", "Süt", "Deterjan"];
  var SEPET = [[0,1,2,3],[0,1,2],[0,3,4],[1,2,3,4],[0,5],[0,1,2,5],[3,4],[0,3,4,5],[0,1,2,6],[0,5,6],[0,1,2,3,4],[1,3,4],[0,5],[0,1,2]];
  var N = SEPET.length, secili = 0, kurallar = [];
  function f(v, d) { return v.toFixed(d).replace(".", ","); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function icerir(s, kume) { for (var i = 0; i < kume.length; i++) if (s.indexOf(kume[i]) < 0) return false; return true; }
  function destek(kume) { var n = 0; SEPET.forEach(function (s) { if (icerir(s, kume)) n++; }); return n; }
  function apriori(minS) {
    var aday = URUN.map(function (u, i) { return [i]; }), seviye = [], tum = [];
    var k = 1;
    while (aday.length) {
      var sik = aday.filter(function (c) { return destek(c) >= minS; });
      seviye.push([k, aday.length, sik.length]);
      tum = tum.concat(sik);
      var yeni = [], gor = {};
      for (var a = 0; a < sik.length; a++) for (var b = a + 1; b < sik.length; b++) {
        var x = sik[a], y = sik[b];
        if (x.slice(0, k - 1).join() !== y.slice(0, k - 1).join()) continue;
        var c = x.concat([y[k - 1]]).sort(function (p, q) { return p - q; });
        var anahtar = c.join();
        if (gor[anahtar]) continue;
        var budanir = false;
        for (var i = 0; i < c.length; i++) {
          var alt = c.slice(0, i).concat(c.slice(i + 1)).join();
          if (!sik.some(function (s) { return s.join() === alt; })) { budanir = true; break; }
        }
        if (!budanir) { gor[anahtar] = 1; yeni.push(c); }
      }
      aday = yeni; k++;
    }
    return { seviye: seviye, sik: tum };
  }
  function kurallariBul(sik, minG) {
    var r = [];
    sik.forEach(function (c) {
      if (c.length < 2) return;
      var sc = destek(c), m = c.length;
      for (var mask = 1; mask < (1 << m) - 1; mask++) {
        var A = [], B = [];
        for (var i = 0; i < m; i++) ((mask >> i) & 1 ? A : B).push(c[i]);
        var g = sc / destek(A);
        if (g >= minG) r.push({ A: A, B: B, s: sc, g: g, l: g / (destek(B) / N) });
      }
    });
    return r.sort(function (a, b) { return b.g - a.g || b.l - a.l || b.s - a.s; });
  }
  var X0 = 60, Y0 = 50, CW = 34, RH = 16.5;
  function ad(k) { return k.map(function (i) { return URUN[i]; }).join(", "); }
  function ciz() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var kr = kurallar[secili];
    URUN.forEach(function (u, i) {
      var t = mk("text", { x: 0, y: 0, "class": "lbl", transform: "translate(" + (X0 + i * CW + CW / 2 + 4) + " " + (Y0 - 6) + ") rotate(-40)" }, u);
      if (kr && (kr.A.indexOf(i) >= 0 || kr.B.indexOf(i) >= 0)) { t.style.fill = kr.A.indexOf(i) >= 0 ? "var(--ds-link)" : "var(--ds-good)"; t.style.fontWeight = 700; }
      svg.appendChild(t);
    });
    SEPET.forEach(function (s, j) {
      var y = Y0 + j * RH;
      var tamA = kr && icerir(s, kr.A), tam = kr && icerir(s, kr.A.concat(kr.B));
      if (tamA) {
        var bg = mk("rect", { x: 2, y: y + 1, width: X0 + URUN.length * CW - 2, height: RH - 2, rx: 4 });
        bg.style.fill = tam ? "color-mix(in srgb, var(--ds-good) 22%, var(--ds-bg))" : "color-mix(in srgb, var(--ds-bad) 18%, var(--ds-bg))";
        svg.appendChild(bg);
      }
      svg.appendChild(mk("text", { x: 8, y: y + RH - 4.5, "class": "lbl" }, "Fiş " + (j + 1)));
      URUN.forEach(function (u, i) {
        var var_ = s.indexOf(i) >= 0;
        var c = mk("circle", { cx: X0 + i * CW + CW / 2, cy: y + RH / 2, r: var_ ? 5.2 : 1.6 });
        c.style.fill = var_ ? (kr && kr.A.indexOf(i) >= 0 ? "var(--ds-link)" : kr && kr.B.indexOf(i) >= 0 ? "var(--ds-good)" : "var(--ds-muted)") : "var(--ds-border)";
        svg.appendChild(c);
      });
    });
  }
  function hesapla() {
    var minS = +rs.value, minG = +rc.value / 100;
    root.querySelector(".ai-sup").textContent = minS + " (%" + f(100 * minS / N, 0) + ")";
    root.querySelector(".ai-conf").textContent = "%" + rc.value;
    var ap = apriori(minS);
    kurallar = kurallariBul(ap.sik, minG);
    secili = 0;
    say.innerHTML = "Apriori: " + ap.seviye.filter(function (v) { return v[1]; }).map(function (v) { return v[0] + "-li: " + v[1] + " aday → <b>" + v[2] + "</b> sık"; }).join("; ") +
      ". <b>" + kurallar.length + "</b> kural güven eşiğini geçti" + (kurallar.length > 4 ? ", 4 tanesi:" : ":");
    while (kurElSil()) {}
    var goster = kurallar.slice(0, 3), bos = kurallar.filter(function (k) { return k.l < 1.1; })[0];
    if (bos && goster.indexOf(bos) < 0) goster.push(bos); else if (kurallar[3]) goster.push(kurallar[3]);
    kurallar = goster.concat(kurallar.filter(function (k) { return goster.indexOf(k) < 0; }));
    goster.forEach(function (k, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.innerHTML = "{" + ad(k.A) + "} → {" + ad(k.B) + "}<br>destek %" + f(100 * k.s / N, 0) + " · güven %" + f(100 * k.g, 0) + " · kaldıraç <b" + (k.l < 1.1 ? " style=\"color:var(--ds-muted)\"" : "") + ">" + f(k.l, 2) + "</b>";
      b.addEventListener("click", function () { secili = i; isaretle(); ciz(); });
      kurKutu.appendChild(b);
    });
    isaretle(); ciz();
  }
  function kurElSil() { if (kurKutu.firstChild) { kurKutu.removeChild(kurKutu.firstChild); return true; } return false; }
  function isaretle() { [].forEach.call(kurKutu.children, function (b, i) { b.classList.toggle("is-on", i === secili); }); }
  rs.addEventListener("input", hesapla);
  rc.addEventListener("input", hesapla);
  hesapla();
''',
    'not': ('Veri madenciliği <b>keşiftir</b>: soru sorulmadan veride sık tekrar eden kalıplar aranır. Kaldıraç 1 civarındaysa kural '
            'boştur (Ekmek zaten neredeyse her sepette); işe yarayan kural kaldıracı 1’in belirgin üstünde olandır.'),
}
