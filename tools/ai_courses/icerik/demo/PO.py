# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Süpürge Şarjı Kendi Buluyor',
    'problem': ('Robot süpürgeye harita verilmedi; her adım −1, şarj istasyonu +10, merdivenden düşmek −10 puan. '
                'Bölümler boyunca deneyerek öğrensin: eğitin, sonra robotu sol üst köşeden gönderin.'),
    'html': '''
<svg viewBox="0 0 400 290" width="400" height="290" role="img" aria-label="Ev ızgarası, öğrenilen politika okları ve bölüm uzunluğu eğrisi"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-n="10">10 bölüm eğit</button><button type="button" data-n="100">100 bölüm eğit</button></div>
  <div class="ai-ctl"><button type="button" data-a="git">Robotu gönder</button><button type="button" data-a="sifir">Sıfırla</button></div>
  <label>Keşif oranı ε = <b class="ai-e">0,20</b></label>
  <input type="range" min="0" max="0.5" step="0.05" value="0.2" aria-label="Keşif oranı">
  <div class="ai-out ai-o1"></div>
  <div class="ai-out ai-o2" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), o1 = root.querySelector(".ai-o1"), o2 = root.querySelector(".ai-o2");
  var range = root.querySelector("input"), eEl = root.querySelector(".ai-e");
  var HARITA = ["....#...", ".##.#.M.", "........", ".#.###..", ".#.....S"];
  var W = 8, H = 5, S = 44, X0 = 24, Y0 = 4, ALFA = 0.5, GAMA = 0.95;
  var DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0], OK = ["↑", "→", "↓", "←"];
  var tohum, Q, uzunluk, dusme, timer = null, robot = null, iz = [];
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function hucre(x, y) { return HARITA[y].charAt(x); }
  function sifirla() {
    tohum = 42; Q = []; uzunluk = []; dusme = []; robot = null; iz = [];
    for (var i = 0; i < W * H; i++) Q.push([0, 0, 0, 0]);
  }
  function enIyi(s) { var q = Q[s], b = 0; for (var a = 1; a < 4; a++) if (q[a] > q[b]) b = a; return b; }
  function adim(x, y, a) {
    var nx = x + DX[a], ny = y + DY[a];
    if (nx < 0 || ny < 0 || nx >= W || ny >= H || hucre(nx, ny) === "#") { nx = x; ny = y; }
    var c = hucre(nx, ny);
    if (c === "S") return [nx, ny, 9, true];
    if (c === "M") return [nx, ny, -11, true];
    return [nx, ny, -1, false];
  }
  function bolum(eps) {
    var x, y;
    do { x = Math.floor(rnd() * W); y = Math.floor(rnd() * H); } while (hucre(x, y) !== ".");
    for (var t = 1; t <= 100; t++) {
      var s = y * W + x, a;
      if (rnd() < eps) a = Math.floor(rnd() * 4);
      else { var m = Math.max.apply(null, Q[s]), adaylar = []; for (var k = 0; k < 4; k++) if (Q[s][k] === m) adaylar.push(k); a = adaylar[Math.floor(rnd() * adaylar.length)]; }
      var r = adim(x, y, a), s2 = r[1] * W + r[0];
      var hedef = r[2] + (r[3] ? 0 : GAMA * Math.max.apply(null, Q[s2]));
      Q[s][a] += ALFA * (hedef - Q[s][a]);
      x = r[0]; y = r[1];
      if (r[3]) { uzunluk.push(t); dusme.push(hucre(x, y) === "M" ? 1 : 0); return; }
    }
    uzunluk.push(100); dusme.push(0);
  }
  function yol() {
    var x = 0, y = 0, p = [[0, 0]];
    for (var t = 0; t < 40; t++) {
      var r = adim(x, y, enIyi(y * W + x)); x = r[0]; y = r[1]; p.push([x, y]);
      if (r[3]) return [p, hucre(x, y)];
    }
    return [p, "."];
  }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt !== undefined) e.textContent = txt; return e; }
  function ciz() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
      var c = hucre(x, y), s = y * W + x, gx = X0 + x * S, gy = Y0 + y * S;
      var r = mk("rect", { x: gx, y: gy, width: S - 2, height: S - 2, rx: 5 });
      var v = Math.max.apply(null, Q[s]), gez = Q[s].some(function (q) { return q !== 0; });
      if (c === "#") r.style.fill = "var(--ds-muted)";
      else if (c === "S") r.style.fill = "color-mix(in srgb, var(--ds-good) 70%, var(--ds-bg))";
      else if (c === "M") r.style.fill = "color-mix(in srgb, var(--ds-bad) 70%, var(--ds-bg))";
      else if (!gez) r.style.fill = "var(--ds-bg)";
      else r.style.fill = "color-mix(in srgb, " + (v >= 0 ? "var(--ds-good)" : "var(--ds-bad)") + " " + Math.round(Math.min(60, Math.abs(v) * 6)) + "%, var(--ds-bg))";
      r.style.stroke = "var(--ds-border)";
      svg.appendChild(r);
      var cx = gx + S / 2 - 1;
      if (c === "S" || c === "M") {
        var t = mk("text", { x: cx, y: gy + S / 2 + 3, "text-anchor": "middle", "class": "txt" }, c === "S" ? "şarj" : "merdiven");
        t.style.fontSize = c === "S" ? "12px" : "8px"; svg.appendChild(t);
      } else if (c === "." && gez) {
        var o = mk("text", { x: cx, y: gy + 21, "text-anchor": "middle", "class": "txt" }, OK[enIyi(s)]); o.style.fontSize = "17px"; svg.appendChild(o);
        var d = mk("text", { x: cx, y: gy + 37, "text-anchor": "middle", "class": "lbl" }, v.toFixed(1).replace(".", ",")); d.style.fontSize = "9.5px"; svg.appendChild(d);
      }
    }
    if (iz.length > 1) {
      var p = mk("path", { d: iz.map(function (q, i) { return (i ? "L" : "M") + (X0 + q[0] * S + S / 2 - 1) + " " + (Y0 + q[1] * S + S / 2 - 1); }).join(" ") });
      p.style.fill = "none"; p.style.stroke = "#e9a23b"; p.style.strokeWidth = 4; p.style.strokeLinejoin = "round"; p.style.opacity = 0.85; svg.appendChild(p);
    }
    if (robot) {
      var rb = mk("circle", { cx: X0 + robot[0] * S + S / 2 - 1, cy: Y0 + robot[1] * S + S / 2 - 1, r: 13 });
      rb.style.fill = "var(--ds-link)"; rb.style.stroke = "var(--ds-bg)"; rb.style.strokeWidth = 2; svg.appendChild(rb);
      var rt = mk("text", { x: X0 + robot[0] * S + S / 2 - 1, y: Y0 + robot[1] * S + S / 2 + 4, "text-anchor": "middle", "class": "txt" }, "R");
      rt.style.fill = "var(--ds-bg)"; rt.style.fontSize = "12px"; svg.appendChild(rt);
    }
    var CY = 286, CH = 42, CX = X0, CW = W * S - 2;
    svg.appendChild(mk("path", { d: "M" + CX + " " + (CY - CH) + " V" + CY + " H" + (CX + CW), "class": "axis" }));
    var n = uzunluk.length;
    if (n > 1) {
      var ort = [], top = 0;
      for (var i = 0; i < n; i++) { top += uzunluk[i]; if (i >= 10) top -= uzunluk[i - 10]; ort.push(top / Math.min(i + 1, 10)); }
      var c2 = mk("path", { d: ort.map(function (v, i) { return (i ? "L" : "M") + (CX + i / (n - 1) * CW).toFixed(1) + " " + (CY - v / 100 * CH).toFixed(1); }).join(" ") });
      c2.style.fill = "none"; c2.style.stroke = "var(--ds-accent)"; c2.style.strokeWidth = 2; svg.appendChild(c2);
    }
    var cl = mk("text", { x: CX + CW, y: CY - CH - 4, "text-anchor": "end", "class": "lbl" }, "bölüm başına adım (10’luk ortalama) →"); cl.style.fontSize = "11px"; svg.appendChild(cl);
    var son = uzunluk.slice(-10), so = son.reduce(function (a, b) { return a + b; }, 0) / Math.max(1, son.length);
    var sd = dusme.slice(-10).reduce(function (a, b) { return a + b; }, 0);
    o1.innerHTML = "Toplam <b>" + n + "</b> bölüm. Son 10 bölümde ortalama <b>" + so.toFixed(1).replace(".", ",") + "</b> adım, " + sd + " kez merdivenden düştü.";
  }
  function egit(k) {
    if (timer) { clearInterval(timer); timer = null; }
    var eps = +range.value; robot = null; iz = [];
    for (var i = 0; i < k; i++) bolum(eps);
    var y = yol();
    o2.innerHTML = "Okların gösterdiği yol sol üstten " + (y[1] === "S" ? "<b>" + (y[0].length - 1) + " adımda</b> şarja varıyor (en kısa: 11)." : y[1] === "M" ? "merdivene çıkıyor: daha çok eğitin." : "henüz şarja varmıyor: daha çok eğitin.");
    ciz();
  }
  root.querySelectorAll("[data-n]").forEach(function (b) { b.addEventListener("click", function () { egit(+b.getAttribute("data-n")); }); });
  root.querySelector("[data-a=sifir]").addEventListener("click", function () { if (timer) { clearInterval(timer); timer = null; } sifirla(); egit(3); });
  root.querySelector("[data-a=git]").addEventListener("click", function () {
    if (timer) clearInterval(timer);
    var y = yol(), i = 0; iz = [];
    timer = setInterval(function () {
      robot = y[0][i]; iz.push(robot); ciz(); i++;
      if (i >= y[0].length) { clearInterval(timer); timer = null;
        o2.innerHTML = y[1] === "S" ? "Robot şarja <b>" + (y[0].length - 1) + " adımda</b> vardı." : y[1] === "M" ? "Robot <b>merdivenden düştü</b>: politika henüz kötü." : "Robot <b>dolanıp kaldı</b>: politika henüz tamamlanmadı.";
      }
    }, 160);
  });
  range.addEventListener("input", function () { eEl.textContent = (+range.value).toFixed(2).replace(".", ","); });
  sifirla(); egit(3);
''',
    'not': ('Kimse robota yol göstermedi: Q-öğrenme her adımdan sonra o karedeki eylemin değerini <b>ödül + gelecekteki en iyi değer</b> '
            'ile günceller. Keşif yoksa yeni yollar bulunmaz, çoksa robot sık düşer.'),
}
