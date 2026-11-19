# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'Mesajı Daha Az Bitle Gönder',
    'problem': ('Pille çalışan bir sensör mesajlarını radyoyla yolluyor; her bit enerji harcar. Bir metin yazın ya da hazır '
                'metin seçin: Huffman ağacı sık harfe kısa kod verir. Ağaçta bir harfe tıklayıp kodunu görün.'),
    'html': '''
<svg viewBox="0 0 390 284" width="390" height="284" role="img" aria-label="Huffman ağacı ve kodlanmış bitler"></svg>
<div class="ai-side">
  <label>Gönderilecek metin</label>
  <input type="text" maxlength="44" value="abrakadabra" aria-label="Metin">
  <div class="ai-ctl"><button type="button" data-t="a" class="is-on">abrakadabra</button><button type="button" data-t="b">tekerleme</button><button type="button" data-t="c">çok tekrarlı</button><button type="button" data-t="d">hepsi eşit</button></div>
  <div class="ai-out"></div>
  <div class="ai-out"></div>
</div>''',
    'css': '''
.ds-deck .ai-demo input[type=text] { width: 100%; box-sizing: border-box; padding: 5px 9px; border: 1.5px solid var(--ds-border); border-radius: 8px; background: var(--ds-bg); color: var(--ds-text); font-family: monospace; font-size: 14px; }
.ds-deck .ai-demo input[type=text]:focus { outline: none; border-color: var(--ds-link); }''',
    'js': r'''
  var svg = root.querySelector("svg"), inp = root.querySelector("input[type=text]");
  var outs = root.querySelectorAll(".ai-out"), tuslar = root.querySelectorAll("[data-t]");
  var hazir = { a: "abrakadabra", b: "bir berber bir berbere gel beraber", c: "aaaaaaaaaaaaaaabbbbcd", d: "abcdefgh" };
  var secili = null;
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt !== undefined) e.textContent = txt; return e; }
  function goster(c) { return c === " " ? "␣" : c; }
  function f(v, n) { return v.toFixed(n).replace(".", ","); }
  function kur(s) {
    var say = {}, liste = [], id = 0;
    for (var i = 0; i < s.length; i++) { var c = s.charAt(i); if (!say[c]) { say[c] = 0; liste.push(c); } say[c]++; }
    var kuyruk = liste.map(function (c) { return { c: c, w: say[c], id: id++ }; });
    while (kuyruk.length > 1) {
      kuyruk.sort(function (a, b) { return a.w - b.w || a.id - b.id; });
      var a = kuyruk.shift(), b = kuyruk.shift();
      kuyruk.push({ w: a.w + b.w, id: id++, sol: a, sag: b });
    }
    return { kok: kuyruk[0], say: say, liste: liste };
  }
  function ciz() {
    var s = inp.value.toLocaleLowerCase("tr");
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (!s.length) {
      svg.appendChild(mk("text", { x: 195, y: 140, "text-anchor": "middle", "class": "lbl" }, "Bir metin yazın."));
      outs[0].innerHTML = "Metin boş."; outs[1].innerHTML = ""; return;
    }
    var h = kur(s), kok = h.kok, yap = [], dmax = 0, kod = {};
    function gez(d, derin, yol) {
      d.derin = derin; if (derin > dmax) dmax = derin;
      if (d.c !== undefined) { d.sira = yap.length; yap.push(d); kod[d.c] = yol || "0"; return; }
      gez(d.sol, derin + 1, yol + "0"); gez(d.sag, derin + 1, yol + "1");
    }
    gez(kok, 0, "");
    if (secili === null || !h.say[secili]) {
      secili = h.liste[0];
      h.liste.forEach(function (c) { if (h.say[c] > h.say[secili]) secili = c; });
    }
    var bos = 372 / yap.length, dy = Math.min(48, 172 / Math.max(1, dmax));
    function konum(d) {
      if (d.c !== undefined) d.x = 9 + bos * (d.sira + 0.5);
      else { konum(d.sol); konum(d.sag); d.x = (d.sol.x + d.sag.x) / 2; }
      d.y = 18 + d.derin * dy;
    }
    konum(kok);
    var yolKod = kod[secili];
    function kenar(d, yol) {
      if (d.c !== undefined) return;
      [[d.sol, "0"], [d.sag, "1"]].forEach(function (p) {
        var c = p[0], y2 = yol + p[1], uzerinde = yolKod.indexOf(y2) === 0;
        var l = mk("line", { x1: d.x, y1: d.y, x2: c.x, y2: c.y, "class": "line" });
        if (uzerinde) { l.style.stroke = "var(--ds-accent)"; l.style.strokeWidth = 3; }
        svg.appendChild(l);
        if (uzerinde || bos > 15) {
          var t = mk("text", { x: (d.x + c.x) / 2 + (p[1] === "0" ? -6 : 6), y: (d.y + c.y) / 2 + 3, "text-anchor": "middle" }, p[1]);
          t.style.fontSize = "10px"; t.style.fill = uzerinde ? "var(--ds-accent)" : "var(--ds-muted)"; t.style.fontWeight = uzerinde ? 700 : 400;
          svg.appendChild(t);
        }
        kenar(c, y2);
      });
    }
    kenar(kok, "");
    var r = Math.max(5, Math.min(13, bos / 2 - 1));
    function dugum(d) {
      if (d.c === undefined) {
        dugum(d.sol); dugum(d.sag);
        var ic = mk("circle", { cx: d.x, cy: d.y, r: 8 });
        ic.style.fill = "var(--ds-bg)"; ic.style.stroke = "var(--ds-border)"; ic.style.strokeWidth = 1.5;
        svg.appendChild(ic);
        var w = mk("text", { x: d.x, y: d.y + 3, "text-anchor": "middle" }, d.w);
        w.style.fontSize = "9px"; w.style.fill = "var(--ds-muted)";
        svg.appendChild(w);
        return;
      }
      var on = d.c === secili;
      var g = mk("g", {}); g.style.cursor = "pointer";
      var cc = mk("circle", { cx: d.x, cy: d.y, r: r });
      cc.style.fill = on ? "color-mix(in srgb, var(--ds-accent) 30%, var(--ds-bg))" : "color-mix(in srgb, var(--ds-link) 22%, var(--ds-bg))";
      cc.style.stroke = on ? "var(--ds-accent)" : "var(--ds-link)"; cc.style.strokeWidth = on ? 2.5 : 1.3;
      g.appendChild(cc);
      var t = mk("text", { x: d.x, y: d.y + 4, "text-anchor": "middle" }, goster(d.c));
      t.style.fontSize = r > 10 ? "15px" : (r > 7 ? "12px" : "10px"); t.style.fontWeight = 700; t.style.fill = "var(--ds-text)";
      g.appendChild(t);
      var n = mk("text", { x: d.x, y: d.y + r + 11, "text-anchor": "middle" }, d.w);
      n.style.fontSize = "10.5px"; n.style.fill = "var(--ds-muted)";
      g.appendChild(n);
      g.addEventListener("click", function () { secili = d.c; ciz(); });
      svg.appendChild(g);
    }
    dugum(kok);
    var bas = mk("text", { x: 6, y: 234, "class": "lbl" }, "Gönderilen bitler (harf harf):");
    bas.style.fontSize = "12px"; svg.appendChild(bas);
    var satirlar = [mk("text", { x: 6, y: 254 }), mk("text", { x: 6, y: 274 })], sat = 0, uz = 0, toplam = 0, tasti = false;
    satirlar.forEach(function (x) { x.style.fontFamily = "monospace"; x.style.fontSize = "13.5px"; svg.appendChild(x); });
    for (var i = 0; i < s.length; i++) {
      var kc = kod[s.charAt(i)];
      toplam += kc.length;
      if (tasti) continue;
      if (uz + kc.length > 46) { sat++; uz = 0; }
      if (sat > 1) { tasti = true; satirlar[1].appendChild(mk("tspan", {}, "…")); continue; }
      var ts = mk("tspan", {}, kc);
      ts.style.fill = s.charAt(i) === secili ? "var(--ds-accent)" : (i % 2 ? "var(--ds-link)" : "var(--ds-text)");
      if (s.charAt(i) === secili) ts.style.fontWeight = 700;
      satirlar[sat].appendChild(ts);
      uz += kc.length;
    }
    var H = 0, L = 0, n = s.length;
    h.liste.forEach(function (c) { var p = h.say[c] / n; H -= p * Math.log(p) / Math.LN2; L += p * kod[c].length; });
    outs[0].innerHTML = "Harf “" + goster(secili) + "”: " + h.say[secili] + " kez geçiyor, kodu <b>" + kod[secili] + "</b> (" + kod[secili].length + " bit).";
    outs[1].innerHTML = h.liste.length + " farklı harf, " + n + " harf<br>Entropi H = <b>" + f(H, 2) + "</b> bit/harf<br>Huffman ortalaması L = <b>" + f(L, 2) + "</b> bit/harf<br>" +
      "8 bitlik kodla " + (8 * n) + " bit → Huffman <b>" + toplam + " bit</b> (%" + Math.round(100 * (1 - toplam / (8 * n))) + " kazanç)";
  }
  inp.addEventListener("input", function () { secili = null; tuslar.forEach(function (b) { b.classList.remove("is-on"); }); ciz(); });
  tuslar.forEach(function (b) {
    b.addEventListener("click", function () {
      inp.value = hazir[b.dataset.t]; secili = null;
      tuslar.forEach(function (x) { x.classList.toggle("is-on", x === b); });
      ciz();
    });
  });
  ciz();
''',
    'not': ('Bilgi kuramı sınırı koyar: kayıpsız hiçbir kod ortalamada <b>entropiden</b> kısa olamaz. Huffman bu sınıra bir bitten '
            'yakın kalır. Harfler eşit sıklıktaysa kazanç yalnız alfabenin küçüklüğünden gelir.'),
}
