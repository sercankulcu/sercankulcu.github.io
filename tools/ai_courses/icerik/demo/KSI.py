# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Akıllı Ev Komutu Tanıyor',
    'problem': ('Akıllı ev asistanı dört sesli komutu tanımalı: evet, hayır, dur, başla. Bir komut seçin, konuşmacıyı '
                'değiştirin, gürültüyü artırın; sistem sesi kayıtlı şablonlarla karşılaştırır.'),
    'html': '''
<svg viewBox="0 0 400 252" width="400" height="252" role="img" aria-label="Komutun dalga biçimi ve spektrogramı"></svg>
<div class="ai-side">
  <div class="ai-ctl"><button type="button" data-w="0" class="is-on">evet</button><button type="button" data-w="1">hayır</button><button type="button" data-w="2">dur</button><button type="button" data-w="3">başla</button></div>
  <div class="ai-ctl"><button type="button" data-a="yeni">Başka konuşmacı</button><label>Ortam gürültüsü: <b class="ai-g">0</b></label></div>
  <input type="range" min="0" max="10" step="1" value="2" aria-label="Gürültü düzeyi">
  <div class="ai-out ai-o1"></div>
  <div class="ai-out ai-o2" style="font-size:13px"></div>
</div>''',
    'css': '''
.ds-deck .ai-demo .ai-bar { display: flex; align-items: center; gap: 6px; margin: 0; line-height: 1.3; }
.ds-deck .ai-demo .ai-bar span:first-child { width: 42px; }
.ds-deck .ai-demo .ai-bar i { display: block; height: 9px; border-radius: 5px; background: var(--ds-link); }''',
    'js': r'''
  var svg = root.querySelector("svg"), o1 = root.querySelector(".ai-o1"), o2 = root.querySelector(".ai-o2");
  var range = root.querySelector("input"), gEl = root.querySelector(".ai-g");
  var SR = 8000, NS = 4800, NF = 256, HOP = 128, NFR = Math.floor((NS - NF) / HOP) + 1;
  var ADLAR = ["evet", "hayır", "dur", "başla"];
  var KEL = [
    [["v", 110, 500, 1900], ["g", 50, 300, 1400, 0.3], ["v", 120, 500, 1900], ["b", 60]],
    [["n", 70, 0.25], ["v", 130, 750, 1250], ["g", 50, 300, 2200, 0.5], ["v", 100, 380, 1550], ["g", 60, 400, 1300, 0.35]],
    [["b", 40], ["v", 170, 330, 800], ["g", 80, 400, 1300, 0.35]],
    [["b", 30], ["v", 100, 750, 1250], ["h", 100, 0.4], ["g", 50, 350, 1200, 0.5], ["v", 120, 750, 1250]]
  ];
  var BANT = [0, 250, 500, 750, 1000, 1500, 2000, 3000, 4000];
  var tohum = 1;
  function rnd() { tohum = (tohum * 16807) % 2147483647; return tohum / 2147483647; }
  function sentez(w, tf, f0, fs, bas, s) {
    tohum = s;
    var x = new Float64Array(NS), t0 = Math.round(bas * SR), onceki = 0;
    var NH = Math.floor(3900 / f0);
    KEL[w].forEach(function (seg) {
      var n = Math.round(seg[1] * tf * SR / 1000), amp = [], tip = seg[0];
      if (tip === "v" || tip === "g") for (var h = 1; h <= NH; h++) {
        var f = h * f0, F1 = seg[2] * fs, F2 = seg[3] * fs;
        amp.push((Math.exp(-Math.pow((f - F1) / 160, 2)) + 0.6 * Math.exp(-Math.pow((f - F2) / 220, 2)) + 0.02) * (tip === "g" ? seg[4] : 1));
      }
      for (var i = 0; i < n && t0 + i < NS; i++) {
        var k = t0 + i, t = k / SR, env = Math.min(1, i / 60, (n - i) / 60), v = 0, r = rnd() * 2 - 1;
        if (tip === "v" || tip === "g") { for (var hh = 0; hh < NH; hh++) v += amp[hh] * Math.sin(2 * Math.PI * (hh + 1) * f0 * t); v *= 0.25; }
        else if (tip === "n") v = seg[2] * r;
        else if (tip === "h") v = seg[2] * (r - onceki) * 1.4;
        else if (tip === "b") v = i > n * 0.6 ? 0.5 * r * Math.exp(-(i - n * 0.6) / 40) : 0;
        onceki = r;
        x[k] = v * env;
      }
      t0 += n;
    });
    var mx = 0; for (var j = 0; j < NS; j++) mx = Math.max(mx, Math.abs(x[j]));
    for (var j2 = 0; j2 < NS; j2++) x[j2] /= mx;
    return x;
  }
  var COS = new Float64Array(NF), SIN = new Float64Array(NF), HANN = new Float64Array(NF);
  for (var q = 0; q < NF; q++) { COS[q] = Math.cos(2 * Math.PI * q / NF); SIN[q] = Math.sin(2 * Math.PI * q / NF); HANN[q] = 0.5 - 0.5 * Math.cos(2 * Math.PI * q / NF); }
  function spektro(x) {
    var S = [], fr = new Float64Array(NF);
    for (var m = 0; m < NFR; m++) {
      for (var n = 0; n < NF; n++) fr[n] = x[m * HOP + n] * HANN[n];
      var e = [0, 0, 0, 0, 0, 0, 0, 0];
      for (var k = 1; k < NF / 2; k++) {
        var re = 0, im = 0;
        for (var n2 = 0; n2 < NF; n2++) { var id = (k * n2) % NF; re += fr[n2] * COS[id]; im -= fr[n2] * SIN[id]; }
        var hz = k * SR / NF, b = 0;
        while (hz >= BANT[b + 1]) b++;
        e[b] += re * re + im * im;
      }
      S.push(e.map(function (v) { return 10 * Math.log10(v + 1e-6); }));
    }
    var mx = -1e9; S.forEach(function (f) { f.forEach(function (v) { mx = Math.max(mx, v); }); });
    return S.map(function (f) { return f.map(function (v) { return Math.max(-50, v - mx); }); });
  }
  function uclar(S) {
    var en = S.map(function (f) { var t = 0; f.forEach(function (v) { t += Math.pow(10, v / 10); }); return 10 * Math.log10(t); });
    var mx = Math.max.apply(null, en), a = 0, b = S.length - 1;
    while (a < b && en[a] < mx - 15) a++;
    while (b > a && en[b] < mx - 15) b--;
    return [a, b];
  }
  function dtw(A, B) {
    var n = A.length, m = B.length, D = [];
    for (var i = 0; i <= n; i++) { D.push([]); for (var j = 0; j <= m; j++) D[i].push(Infinity); }
    D[0][0] = 0;
    for (var i2 = 1; i2 <= n; i2++) for (var j2 = 1; j2 <= m; j2++) {
      var c = 0; for (var b = 0; b < 8; b++) { var d = (A[i2 - 1][b] - B[j2 - 1][b]) / 10; c += d * d; }
      D[i2][j2] = Math.sqrt(c) + Math.min(D[i2 - 1][j2], D[i2][j2 - 1], D[i2 - 1][j2 - 1]);
    }
    return D[n][m] / (n + m);
  }
  function kes(S) { var u = uclar(S); return S.slice(u[0], u[1] + 1); }
  var SABLON = [0, 1, 2, 3].map(function (w) { return kes(spektro(sentez(w, 1, 125, 1, 0.05, 17 + w))); });
  var kelime = 0, kayit = 1, temiz = null, temizS = null;
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function yeniKayit() {
    tohum = kayit * 7919 + kelime * 31 + 3; rnd(); rnd();
    var tf = 0.8 + 0.4 * rnd(), f0 = 100 + 70 * rnd(), fs = 0.94 + 0.12 * rnd(), bas = 0.03 + 0.12 * rnd();
    temizS = [tf, f0];
    temiz = sentez(kelime, tf, f0, fs, bas, kayit * 13 + 5);
  }
  var X0 = 30, PW = 366, WY = 50, SY = 106, BH = 15;
  function hesapla() {
    var g = +range.value; gEl.textContent = g;
    var sig = 0.025 * g, x = new Float64Array(NS), ps = 0, pn = 0;
    tohum = kayit * 101 + 9;
    for (var i = 0; i < NS; i++) { var nz = sig * (rnd() + rnd() + rnd() - 1.5) * 2; x[i] = temiz[i] + nz; ps += temiz[i] * temiz[i]; pn += nz * nz; }
    var S = spektro(x), u = uclar(S), K = S.slice(u[0], u[1] + 1);
    var d = SABLON.map(function (T) { return dtw(K, T); });
    var ex = d.map(function (v) { return Math.exp(-v / 0.18); }), top = ex.reduce(function (a, b) { return a + b; }, 0);
    var p = ex.map(function (v) { return v / top; }), en = p.indexOf(Math.max.apply(null, p));
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.appendChild(mk("text", { x: 0, y: 12, "class": "lbl" }, "Dalga biçimi (0,6 s)"));
    var yol = "";
    for (var c = 0; c < PW; c++) {
      var a0 = Math.floor(c * NS / PW), a1 = Math.floor((c + 1) * NS / PW), lo = 0, hi = 0;
      for (var k = a0; k < a1; k++) { lo = Math.max(-1, Math.min(lo, x[k])); hi = Math.min(1, Math.max(hi, x[k])); }
      yol += "M" + (X0 + c + 0.5) + " " + (WY - hi * 28).toFixed(1) + " V" + (WY - lo * 28 + 0.5).toFixed(1);
    }
    var wv = mk("path", { d: yol }); wv.style.stroke = "var(--ds-link)"; wv.style.strokeWidth = 1; svg.appendChild(wv);
    svg.appendChild(mk("text", { x: 0, y: SY - 8, "class": "lbl" }, "Spektrogram: 8 frekans bandının enerjisi (Hz)"));
    var cw = PW / NFR;
    for (var m = 0; m < NFR; m++) for (var b = 0; b < 8; b++) {
      var r = mk("rect", { x: X0 + m * cw, y: SY + (7 - b) * BH, width: cw + 0.4, height: BH + 0.4 });
      r.style.fill = "color-mix(in srgb, var(--ds-link) " + Math.round(Math.max(0, 100 * (1 + S[m][b] / 45))) + "%, var(--ds-bg))";
      svg.appendChild(r);
    }
    [[0, "4k"], [4, "1k"], [8, "0"]].forEach(function (e) { svg.appendChild(mk("text", { x: X0 - 4, y: SY + e[0] * BH + 4, "text-anchor": "end", "class": "lbl" }, e[1])).style.fontSize = "11px"; });
    [u[0], u[1] + 1].forEach(function (f) {
      var l = mk("path", { d: "M" + (X0 + f * cw) + " " + (SY - 3) + " V" + (SY + 8 * BH + 3) });
      l.style.stroke = "var(--ds-accent)"; l.style.strokeWidth = 2.5; svg.appendChild(l);
    });
    svg.appendChild(mk("text", { x: X0 + (u[0] + u[1] + 1) / 2 * cw, y: SY + 8 * BH + 16, "text-anchor": "middle", "class": "lbl" }, "algılanan konuşma"));
    svg.appendChild(mk("text", { x: X0 + PW, y: SY + 8 * BH + 16, "text-anchor": "end", "class": "lbl" }, "zaman →"));
    var snr = pn > 0 ? 10 * Math.log10(ps / pn) : Infinity;
    var dogru = en === kelime;
    o1.innerHTML = "Söylenen: “" + ADLAR[kelime] + "” (" + (snr === Infinity ? "gürültüsüz" : "SNR " + Math.round(snr) + " dB") + ")<br>Tanınan: <b>" + ADLAR[en] +
      "</b> · güven %" + Math.round(100 * p[en]) + (dogru ? " ✓" : " ✗ yanlış");
    o2.innerHTML = "Şablonlara DTW uzaklığı (küçük = benzer)" + d.map(function (v, k) {
      return "<div class=\"ai-bar\"><span>" + ADLAR[k] + "</span><i style=\"width:" + Math.round(Math.min(150, v * 90)) + "px;" + (k === en ? "background:var(--ds-accent)" : "") + "\"></i><span>" + v.toFixed(2).replace(".", ",") + "</span></div>";
    }).join("");
  }
  root.querySelectorAll("[data-w]").forEach(function (bt) {
    bt.addEventListener("click", function () {
      kelime = +bt.getAttribute("data-w");
      root.querySelectorAll("[data-w]").forEach(function (o) { o.classList.toggle("is-on", o === bt); });
      yeniKayit(); hesapla();
    });
  });
  root.querySelector("[data-a=yeni]").addEventListener("click", function () { kayit++; yeniKayit(); hesapla(); });
  range.addEventListener("input", hesapla);
  yeniKayit(); hesapla();
''',
    'not': ('Ses önce <b>spektrograma</b>, yani zaman–frekans resmine çevrilir. Aynı sözcük hızlı ya da yavaş söylenebilir; DTW '
            'zaman eksenini esneterek eşleştirir. Gürültü arttıkça güven düşer.'),
}
