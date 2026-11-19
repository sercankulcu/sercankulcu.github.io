# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Süzgeçler Çizgiyi Nasıl Görür?',
    'problem': ('Bir okul uygulaması çocukların çizdiği işaretleri tanıyacak. Sol ızgaraya tıklayarak çizin; iki evrişim '
                'süzgeci resmi tarar, öznitelik haritalarından sınıf puanı çıkar.'),
    'html': '''
<svg viewBox="0 0 400 290" width="400" height="290" role="img" aria-label="Çizim ızgarası, evrişim süzgeçleri ve öznitelik haritaları"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-p="y">Yatay</button><button type="button" data-p="d">Dikey</button><button type="button" data-p="a">Artı</button><button type="button" data-p="s">Temizle</button></div>
  <div class="ai-out ai-r"></div>
  <div class="ai-out ai-k"></div>
  <div class="ai-out" style="font-size:13px">Çapraz bir çizgi çizin: iki süzgeç de neredeyse <b>tepki vermez</b>. Ağın başka desenler için başka süzgeçlere ihtiyacı var.</div>
</div>''',
    'css': '''
.ds-deck .ai-demo .ai-bar { display: flex; align-items: center; gap: 6px; font-size: 13px; margin: 2px 0; }
.ds-deck .ai-demo .ai-bar span:first-child { width: 72px; }
.ds-deck .ai-demo .ai-bar i { display: block; height: 10px; border-radius: 5px; background: var(--ds-link); }''',
    'js': r'''
  var svg = root.querySelector("svg"), outR = root.querySelector(".ai-r"), outK = root.querySelector(".ai-k");
  var N = 8, S = 23, IX = 4, IY = 26, FS = 12, FX = 222, FY = [26, 160], KX = 336;
  var KER = [[[-1, -1, -1], [2, 2, 2], [-1, -1, -1]], [[-1, 2, -1], [-1, 2, -1], [-1, 2, -1]]];
  var img = [];
  for (var r = 0; r < N; r++) { img.push([]); for (var c = 0; c < N; c++) img[r].push(0); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt !== undefined) e.textContent = txt; return e; }
  function hazir(t) {
    for (var r = 0; r < N; r++) for (var c = 0; c < N; c++) {
      img[r][c] = 0;
      if ((t === "y" || t === "a") && r === 3 && c >= 1 && c <= 6) img[r][c] = 1;
      if ((t === "d" || t === "a") && c === 4 && r >= 1 && r <= 6) img[r][c] = 1;
    }
  }
  function evrisim(K) {
    var m = [];
    for (var r = 0; r < N; r++) { m.push([]); for (var c = 0; c < N; c++) {
      var s = 0;
      for (var i = -1; i <= 1; i++) for (var j = -1; j <= 1; j++) {
        var rr = r + i, cc = c + j;
        if (rr >= 0 && rr < N && cc >= 0 && cc < N) s += K[i + 1][j + 1] * img[rr][cc];
      }
      m[r].push(Math.max(0, s));
    } }
    return m;
  }
  var hucre = [], harita = [[], []];
  svg.appendChild(mk("text", { x: IX, y: 16, "class": "lbl" }, "Girdi (tıklayıp çizin)"));
  for (var r2 = 0; r2 < N; r2++) for (var c2 = 0; c2 < N; c2++) {
    (function (r, c) {
      var e = mk("rect", { x: IX + c * S, y: IY + r * S, width: S - 2, height: S - 2, rx: 3 });
      e.style.cursor = "pointer"; e.style.stroke = "var(--ds-border)";
      e.addEventListener("click", function () { img[r][c] = 1 - img[r][c]; guncelle(); });
      svg.appendChild(e); hucre.push([e, r, c]);
    })(r2, c2);
  }
  ["Yatay süzgeç", "Dikey süzgeç"].forEach(function (ad, k) {
    svg.appendChild(mk("text", { x: FX, y: FY[k] - 8, "class": "lbl" }, ad));
    for (var r = 0; r < N; r++) for (var c = 0; c < N; c++) {
      var e = mk("rect", { x: FX + c * FS, y: FY[k] + r * FS, width: FS - 1, height: FS - 1, rx: 2 });
      svg.appendChild(e); harita[k].push(e);
    }
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) {
      var v = KER[k][i][j];
      var b = mk("rect", { x: KX + j * 20, y: FY[k] + 12 + i * 20, width: 19, height: 19, rx: 3 });
      b.style.fill = v > 0 ? "color-mix(in srgb, var(--ds-link) 35%, var(--ds-bg))" : "color-mix(in srgb, var(--ds-bad) 22%, var(--ds-bg))";
      svg.appendChild(b);
      var t = mk("text", { x: KX + j * 20 + 9.5, y: FY[k] + 12 + i * 20 + 14, "text-anchor": "middle", "class": "lbl" }, v > 0 ? "2" : "−1");
      t.style.fontSize = "11px"; svg.appendChild(t);
    }
    var o = mk("text", { x: KX + 30, y: FY[k] + 4, "text-anchor": "middle", "class": "lbl" }, "çekirdek");
    o.style.fontSize = "11px"; svg.appendChild(o);
  });
  var ok = mk("path", { d: "M" + (IX + N * S + 2) + " 120 L" + (FX - 4) + " 80 M" + (IX + N * S + 2) + " 130 L" + (FX - 4) + " 200", "class": "line" });
  ok.style.strokeDasharray = "3 3"; svg.appendChild(ok);
  svg.appendChild(mk("text", { x: IX, y: 236, "class": "lbl" }, "Sağda: evrişim + ReLU."));
  svg.appendChild(mk("text", { x: IX, y: 254, "class": "lbl" }, "Koyu kare = güçlü tepki."));
  function guncelle() {
    hucre.forEach(function (h) { h[0].style.fill = img[h[1]][h[2]] ? "var(--ds-text)" : "var(--ds-bg)"; });
    var top = [0, 0], enb = 1;
    var m = [evrisim(KER[0]), evrisim(KER[1])];
    m.forEach(function (mm) { mm.forEach(function (row) { row.forEach(function (v) { enb = Math.max(enb, v); }); }); });
    m.forEach(function (mm, k) {
      for (var r = 0; r < N; r++) for (var c = 0; c < N; c++) {
        var v = mm[r][c]; top[k] += v;
        harita[k][r * N + c].style.fill = "color-mix(in srgb, var(--ds-link) " + Math.round(8 + 87 * v / 6) + "%, var(--ds-bg))";
      }
    });
    var H = top[0], V = top[1];
    var z = [0.15 * (H - V), 0.15 * (V - H), 0.08 * (H + V) - 3 - 0.1 * Math.abs(H - V)];
    var mx = Math.max.apply(null, z), ex = z.map(function (v) { return Math.exp(v - mx); });
    var sm = ex[0] + ex[1] + ex[2], p = ex.map(function (v) { return v / sm; });
    var adlar = ["yatay çizgi", "dikey çizgi", "artı"], en = p.indexOf(Math.max.apply(null, p));
    var bos = Math.max(H, V) < 20;
    outR.innerHTML = "Yatay haritanın toplamı <b>" + H + "</b>, dikeyin <b>" + V + "</b>.<br>" +
      (bos ? "Tahmin: <b>belirsiz</b>. Süzgeçler bu desende yatay ya da dikey çizgi görmüyor." : "Tahmin: <b>" + adlar[en] + "</b> (%" + Math.round(100 * p[en]) + ")");
    outK.innerHTML = "<div style=\"font-size:13px;margin-bottom:3px\">Sınıf olasılıkları (softmax)</div>" + adlar.map(function (a, k) {
      return "<div class=\"ai-bar\"><span>" + a + "</span><i style=\"width:" + Math.round(150 * p[k]) + "px\"></i><span>%" + Math.round(100 * p[k]) + "</span></div>";
    }).join("");
  }
  root.querySelectorAll("[data-p]").forEach(function (b) {
    b.addEventListener("click", function () { hazir(b.getAttribute("data-p")); guncelle(); });
  });
  hazir("a"); img[6][1] = 1;
  guncelle();
''',
    'not': ('Süzgeçteki dokuz sayı elle yazıldı; derin ağ ise bu sayıları <b>verilerden öğrenir</b> ve katmanları üst üste '
            'koyarak kenardan şekle, şekilden nesneye çıkar.'),
}
