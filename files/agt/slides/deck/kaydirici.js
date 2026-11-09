/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* Algoritmik Oyun Kuramı sunumları: etkileşimli kaydırıcı slaytları
   Kullanım (deck.js'den sonra yüklenir):
     <link rel="stylesheet" href="deck/kaydirici.css">
     <div class="ds-widget" data-widget="cournot"></div>
     <script src="deck/kaydirici.js"></script>
   Bileşenler: cournot, denetim, tetik, kirpma, pigou. Her biri kaydırıcı(lar), canlı sayı çıktısı
   (aria-live) ve SVG grafik çizer; varsayılan değerle çizilmiş hâl statik olarak da anlamlıdır. */
(function () {
  if (["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) < 0) return;
  const NS = "http://www.w3.org/2000/svg";

  /* ---------- yardımcılar ---------- */
  function fmt(x, d) {
    if (d === undefined) d = 2;
    const k = Math.pow(10, d);
    let t = (Math.round(x * k) / k).toFixed(d);
    if (t.indexOf(".") >= 0) t = t.replace(/0+$/, "").replace(/\.$/, "");
    if (t === "-0") t = "0";
    return t.replace("-", "−").replace(".", ",");
  }
  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { const t = a % b; a = b; b = t; }
    return a;
  }
  /* a/b (tam sayılar) sadeleştirilmiş kesir */
  function frac(a, b) {
    if (b < 0) { a = -a; b = -b; }
    const g = gcd(a, b) || 1;
    a /= g; b /= g;
    if (b === 1) return fmt(a);
    return (a < 0 ? "−" : "") + Math.abs(a) + "/" + b;
  }
  /* kesir ve (gerekirse) ondalık: "1/2 = 0,5", "1/3 ≈ 0,333" */
  function fracDec(a, b, d) {
    const f = frac(a, b), v = a / b, s = fmt(v, d || 3);
    if (f.indexOf("/") < 0) return f;
    return f + (Math.abs(parseFloat(s.replace("−", "-").replace(",", ".")) - v) < 1e-12 ? " = " : " ≈ ") + s;
  }
  function el(parent, name, attrs, text) {
    const e = document.createElementNS(NS, name);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    parent.appendChild(e);
    return e;
  }
  /* metin + üst simge: parts = ["x", ["p"], " yolu"] (dizi içindeki parça üst simge) */
  function rich(parent, attrs, parts) {
    const t = el(parent, "text", attrs);
    let up = false;
    parts.forEach(function (p) {
      if (Array.isArray(p)) {
        el(t, "tspan", { dy: "-5", style: "font-size:10px" }, p[0]);
        up = true;
      } else {
        el(t, "tspan", up ? { dy: "5" } : {}, p);
        up = false;
      }
    });
    return t;
  }
  /* eksen çerçevesi: o = {x0, x1, y0 (üst), y1 (alt), xmin, xmax, ymin, ymax, xt, yt, xf, yf, xlabel, ylabel} */
  function frame(g, o) {
    const X = function (v) { return o.x0 + (v - o.xmin) / (o.xmax - o.xmin) * (o.x1 - o.x0); };
    const Y = function (v) { return o.y1 - (v - o.ymin) / (o.ymax - o.ymin) * (o.y1 - o.y0); };
    const xf = o.xf || function (v) { return fmt(v); }, yf = o.yf || function (v) { return fmt(v); };
    o.yt.forEach(function (v) {
      if (v !== o.ymin) el(g, "path", { class: "grid", d: "M" + o.x0 + " " + Y(v).toFixed(1) + " H" + o.x1 });
      el(g, "text", { class: "lbl", x: o.x0 - 6, y: (Y(v) + 4).toFixed(1), "text-anchor": "end" }, yf(v));
    });
    o.xt.forEach(function (v) {
      el(g, "text", { class: "lbl", x: X(v).toFixed(1), y: o.y1 + 15, "text-anchor": "middle" }, xf(v));
    });
    el(g, "path", { class: "axis", d: "M" + o.x0 + " " + o.y0 + " V" + o.y1 + " H" + o.x1 });
    if (o.xlabel) {
      if (Array.isArray(o.xlabel)) rich(g, { class: "lbl", x: (o.x0 + o.x1) / 2, y: o.y1 + 32, "text-anchor": "middle", style: "font-weight:700" }, o.xlabel);
      else el(g, "text", { class: "lbl", x: (o.x0 + o.x1) / 2, y: o.y1 + 32, "text-anchor": "middle", style: "font-weight:700" }, o.xlabel);
    }
    if (o.ylabel) {
      const cy = (o.y0 + o.y1) / 2, cx = o.ylx || 18;
      el(g, "text", { class: "lbl", x: cx, y: cy, "text-anchor": "middle", transform: "rotate(-90 " + cx + " " + cy + ")", style: "font-weight:700" }, o.ylabel);
    }
    return { X: X, Y: Y };
  }
  /* f'nin [a, b] üzerindeki eğrisi; ymax'ı aşınca kesilir (artan eğriler için) */
  function curve(g, f, a, b, F, ymax, style) {
    let d = "";
    const n = 240;
    let px = a, py = f(a);
    for (let i = 0; i <= n; i++) {
      const x = a + (b - a) * i / n, y = f(x);
      if (ymax !== undefined && y > ymax) {
        const t = (ymax - py) / (y - py), cx = px + (x - px) * t;
        if (i > 0) d += " L" + F.X(cx).toFixed(1) + " " + F.Y(ymax).toFixed(1);
        break;
      }
      d += (d ? " L" : "M") + F.X(x).toFixed(1) + " " + F.Y(y).toFixed(1);
      px = x; py = y;
    }
    return el(g, "path", { class: "curve", d: d, style: style });
  }
  function dot(g, x, y, r, style) {
    return el(g, "circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: r, style: style });
  }
  function dash(g, d, style) {
    return el(g, "path", { d: d, style: "fill:none;stroke-dasharray:4 4;stroke-width:1.5;" + style });
  }
  /* gösterge (lejant): items = [{x, text, color, kind: "line" | "dash" | "box"}] */
  function legend(g, y, items) {
    items.forEach(function (it) {
      if (it.kind === "box") el(g, "rect", { x: it.x, y: y - 10, width: 16, height: 12, rx: 2, style: "fill:" + it.color + ";stroke:" + (it.stroke || "none") });
      else el(g, "path", { d: "M" + it.x + " " + (y - 4) + " h18", style: "fill:none;stroke-width:3;stroke:" + it.color + (it.kind === "dash" ? ";stroke-dasharray:5 4" : "") });
      const at = { class: "lbl", x: it.x + 23, y: y, style: "fill:" + (it.tcolor || "var(--ds-text)") };
      if (Array.isArray(it.text)) rich(g, at, it.text); else el(g, "text", at, it.text);
    });
  }
  function chip(html) { return '<span class="ds-kd__chip">' + html + "</span>"; }

  /* ---------- ortak iskelet ---------- */
  const KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
  function build(box, spec) {
    box.classList.add("ds-kd");
    box.innerHTML = "";
    const ctls = document.createElement("div");
    ctls.className = "ds-kd__ctls";
    box.appendChild(ctls);
    const vals = {}, inputs = {};
    const out = document.createElement("div");
    out.className = "ds-kd__out";
    out.setAttribute("aria-live", "polite");
    const svg = el(box, "svg", { class: "ds-svg ds-kd__svg", viewBox: "0 0 720 " + (spec.height || 236), role: "img", "aria-label": spec.label });
    box.insertBefore(out, svg);
    function redraw() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      out.innerHTML = spec.draw(vals, svg);
    }
    spec.sliders.forEach(function (s) {
      const lab = document.createElement("label");
      lab.className = "ds-kd__ctl";
      const name = document.createElement("span");
      name.className = "ds-kd__name";
      name.textContent = s.name + " =";
      const inp = document.createElement("input");
      inp.type = "range";
      inp.min = s.min; inp.max = s.max; inp.step = s.step; inp.value = s.value;
      inp.setAttribute("value", s.value);
      inp.setAttribute("aria-label", s.aria);
      const val = document.createElement("output");
      val.className = "ds-kd__val";
      lab.appendChild(name); lab.appendChild(inp); lab.appendChild(val);
      ctls.appendChild(lab);
      inputs[s.key] = inp;
      const show = s.show || function (v) { return fmt(v); };
      function update() {
        vals[s.key] = parseFloat(inp.value);
        val.textContent = show(vals[s.key]);
        inp.setAttribute("aria-valuetext", s.name + " = " + show(vals[s.key]));
      }
      update();
      inp.addEventListener("input", function () { update(); redraw(); });
      /* ok tuşları kaydırıcının: sunumun slayt geçişine ulaşmasın */
      inp.addEventListener("keydown", function (e) { if (KEYS.indexOf(e.key) >= 0) e.stopPropagation(); });
      /* dokunmatik sürükleme slayt kaydırma sayılmasın */
      ["touchstart", "touchmove", "touchend"].forEach(function (t) {
        inp.addEventListener(t, function (e) { e.stopPropagation(); }, { passive: true });
      });
    });
    redraw();
  }

  const C_LINK = "var(--ds-link)", C_ACC = "var(--ds-accent)", C_GOOD = "var(--ds-good)", C_BAD = "var(--ds-bad)", C_MUT = "var(--ds-muted)";
  const W = {};

  /* ---------- 1. Cournot en iyi tepkisi: P = 12 − y₁ − y₂, maliyet 0 ---------- */
  W.cournot = function (box) {
    build(box, {
      label: "Cournot: rakibin miktarı y₂'ye göre kâr eğrisi u₁(y₁) ve en iyi tepki doğrusu",
      sliders: [{ key: "r", name: "y₂", min: 0, max: 14, step: 0.5, value: 4, aria: "Rakibin üretim miktarı y₂" }],
      draw: function (v, svg) {
        const r = v.r, br = Math.max(0, (12 - r) / 2), price = Math.max(0, 12 - br - r), prof = br * price;
        const u = function (y) { return y * Math.max(0, 12 - y - r); };
        /* sol: kâr eğrisi */
        const L = frame(svg, { x0: 56, x1: 420, y0: 40, y1: 196, xmin: 0, xmax: 12, ymin: 0, ymax: 36,
          xt: [0, 2, 4, 6, 8, 10, 12], yt: [0, 9, 18, 27, 36], xlabel: "y₁ (benim miktarım)", ylabel: "kâr u₁" });
        legend(svg, 14, [{ x: 56, color: C_LINK, kind: "line", text: "u₁(y₁) = y₁ · max{0, 12 − y₁ − y₂}" }]);
        curve(svg, u, 0, 12, L, undefined, "stroke:" + C_LINK);
        const px = L.X(br), py = L.Y(prof);
        dash(svg, "M" + px.toFixed(1) + " " + py.toFixed(1) + " V196", "stroke:" + C_ACC);
        dot(svg, px, py, 6, "fill:" + C_ACC + ";stroke:var(--ds-bg);stroke-width:2");
        const right = br <= 8;
        el(svg, "text", { class: "lbl halo", x: (px + (right ? 12 : -12)).toFixed(1), y: (py - 8).toFixed(1), "text-anchor": right ? "start" : "end", style: "font-weight:700;fill:" + C_ACC },
          prof > 0 ? "en iyi: y₁ = " + fmt(br) + ", kâr " + fmt(prof) : "üretmemek en iyisi (y₁ = 0)");
        /* sağ: en iyi tepki doğrusu */
        const R = frame(svg, { x0: 500, x1: 704, y0: 40, y1: 196, xmin: 0, xmax: 14, ymin: 0, ymax: 6,
          xt: [0, 4, 8, 12], yt: [0, 2, 4, 6], xlabel: "y₂ (rakibin miktarı)" });
        el(svg, "text", { class: "lbl", x: 500, y: 14, style: "font-weight:700;fill:var(--ds-text)" }, "en iyi tepki BR₁(y₂)");
        el(svg, "path", { class: "curve", d: "M" + R.X(0) + " " + R.Y(6) + " L" + R.X(12).toFixed(1) + " " + R.Y(0) + " L" + R.X(14) + " " + R.Y(0), style: "stroke:" + C_LINK });
        dot(svg, R.X(4), R.Y(4), 8, "fill:none;stroke:" + C_GOOD + ";stroke-width:2.5");
        el(svg, "text", { class: "lbl halo", x: (R.X(4) + 11).toFixed(1), y: (R.Y(4) - 9).toFixed(1), style: "font-weight:700;fill:" + C_GOOD }, "denge (4, 4)");
        const qx = R.X(r), qy = R.Y(br);
        dash(svg, "M" + qx.toFixed(1) + " " + qy.toFixed(1) + " V196 M" + qx.toFixed(1) + " " + qy.toFixed(1) + " H500", "stroke:" + C_ACC);
        dot(svg, qx, qy, 5, "fill:" + C_ACC);
        return chip("BR₁(" + fmt(r) + ") = max{0, (12 − " + fmt(r) + ")/2} = <b>" + fmt(br) + "</b>") +
          chip("fiyat = <b>" + fmt(price) + "</b>") + chip("en iyi kâr = <b>" + fmt(prof) + "</b>");
      }
    });
  };

  /* ---------- 2. Denetim oyunu: işçinin tek kazancı c (Kaytar–Denetle) ---------- */
  W.denetim = function (box) {
    build(box, {
      label: "Denetim oyunu: yakalanan kaytarıcının kazancı c değişince karışık denge olasılıkları",
      sliders: [{ key: "c", name: "c", min: -6, max: 1, step: 0.5, value: 0, aria: "Yakalanan kaytarıcının kazancı c" }],
      draw: function (v, svg) {
        const c = v.c, q = 2 / (4 - c), p = 0.75;
        /* matris */
        el(svg, "text", { class: "lbl", x: 146, y: 14, "text-anchor": "middle", style: "font-weight:700;fill:" + C_LINK }, "Müdür");
        el(svg, "text", { class: "lbl", x: 18, y: 90, "text-anchor": "middle", transform: "rotate(-90 18 90)", style: "font-weight:700;fill:" + C_LINK }, "İşçi");
        el(svg, "text", { class: "lbl", x: 106, y: 40, "text-anchor": "middle", style: "font-weight:700;fill:var(--ds-text)" }, "Denetle");
        el(svg, "text", { class: "lbl", x: 186, y: 40, "text-anchor": "middle", style: "font-weight:700;fill:var(--ds-text)" }, "Denetleme");
        el(svg, "text", { class: "lbl", x: 60, y: 74, "text-anchor": "end", style: "font-weight:700;fill:var(--ds-text)" }, "Çalış");
        el(svg, "text", { class: "lbl", x: 60, y: 114, "text-anchor": "end", style: "font-weight:700;fill:var(--ds-text)" }, "Kaytar");
        const cells = [[66, 50, "(2, 1)"], [146, 50, "(2, 2)"], [66, 90, "(" + fmt(c) + ", −1)"], [146, 90, "(4, −4)"]];
        cells.forEach(function (k, i) {
          const hot = i === 2;
          el(svg, "rect", { x: k[0], y: k[1], width: 80, height: 40, style: "fill:" + (hot ? "var(--ds-hot)" : "var(--ds-bg)") + ";stroke:" + (hot ? C_ACC : "var(--ds-border)") + ";stroke-width:" + (hot ? 2.5 : 1.5) });
          el(svg, "text", { class: "txt", x: k[0] + 40, y: k[1] + 25, "text-anchor": "middle" }, k[2]);
        });
        el(svg, "text", { class: "lbl", x: 126, y: 154, "text-anchor": "middle" }, "hücre: (işçi, müdür)");
        el(svg, "text", { class: "lbl", x: 126, y: 174, "text-anchor": "middle" }, "c: yakalanan kaytarıcının");
        el(svg, "text", { class: "lbl", x: 126, y: 190, "text-anchor": "middle" }, "kazancı");
        /* işçinin beklenen kazanç doğruları */
        const F = frame(svg, { x0: 290, x1: 500, y0: 40, y1: 196, xmin: 0, xmax: 1, ymin: -6, ymax: 4,
          xt: [0, 0.5, 1], yt: [-6, -4, -2, 0, 2, 4], xlabel: "q (Denetle olasılığı)" });
        legend(svg, 14, [{ x: 290, color: C_GOOD, kind: "line", text: "E[Çalış]" }, { x: 390, color: C_BAD, kind: "line", text: "E[Kaytar]" }]);
        el(svg, "path", { class: "curve", d: "M" + F.X(0) + " " + F.Y(2).toFixed(1) + " H" + F.X(1), style: "stroke:" + C_GOOD });
        el(svg, "path", { class: "curve", d: "M" + F.X(0) + " " + F.Y(4).toFixed(1) + " L" + F.X(1) + " " + F.Y(c).toFixed(1), style: "stroke:" + C_BAD });
        const ix = F.X(q), iy = F.Y(2);
        dash(svg, "M" + ix.toFixed(1) + " " + iy.toFixed(1) + " V196", "stroke:" + C_ACC);
        dot(svg, ix, iy, 5.5, "fill:" + C_ACC + ";stroke:var(--ds-bg);stroke-width:2");
        el(svg, "text", { class: "lbl halo", x: ix.toFixed(1), y: (iy - 11).toFixed(1), "text-anchor": "middle", style: "font-weight:700;fill:" + C_ACC }, "q*");
        /* olasılık çubukları */
        const B = frame(svg, { x0: 572, x1: 712, y0: 40, y1: 196, xmin: 0, xmax: 1, ymin: 0, ymax: 1, xt: [], yt: [0, 0.5, 1] });
        el(svg, "text", { class: "lbl", x: 552, y: 14, style: "font-weight:700;fill:var(--ds-text)" }, "denge olasılıkları");
        [[p, 584, C_GOOD, "p*", "işçi"], [q, 654, C_LINK, "q*", "müdür"]].forEach(function (b) {
          el(svg, "rect", { x: b[1], y: B.Y(b[0]).toFixed(1), width: 46, height: (196 - B.Y(b[0])).toFixed(1), rx: 3, style: "fill:" + b[2] });
          el(svg, "text", { class: "lbl", x: b[1] + 23, y: (B.Y(b[0]) - 6).toFixed(1), "text-anchor": "middle", style: "font-weight:700;fill:var(--ds-text)" }, b[3] + " = " + fmt(b[0], 3));
          el(svg, "text", { class: "lbl", x: b[1] + 23, y: 214, "text-anchor": "middle", style: "font-weight:700;fill:var(--ds-text)" }, b[4]);
        });
        return chip("q* = 2/(4 − c) = <b>" + fracDec(4, 8 - 2 * c) + "</b>") +
          chip("p* = <b>3/4</b>, c'den bağımsız") + chip("işçinin denge kazancı = <b>2</b>");
      }
    });
  };

  /* ---------- 3. Tekrarlanan Mahkûmun İkilemi: kinci tetik ve δ eşiği ---------- */
  W.tetik = function (box) {
    const R = 3, P = 1;
    build(box, {
      height: 212,
      label: "Kinci tetik stratejisi: uymanın ve sapmanın değeri δ'ya göre, eşik δ*",
      sliders: [
        { key: "d", name: "δ", min: 0, max: 0.99, step: 0.01, value: 0.6, aria: "İskonto faktörü δ" },
        { key: "t", name: "cazibe", min: 3.5, max: 10, step: 0.5, value: 5, aria: "Cazibe kazancı" }
      ],
      draw: function (v, svg) {
        const d = v.d, T = v.t, ds = (T - R) / (T - P);
        const uy = function (x) { return R / (1 - x); }, sp = function (x) { return T + x * P / (1 - x); };
        const ok = d >= ds - 1e-9;
        const F = frame(svg, { x0: 56, x1: 704, y0: 34, y1: 172, xmin: 0, xmax: 1, ymin: 0, ymax: 20,
          xt: [0, 0.2, 0.4, 0.6, 0.8, 1], yt: [0, 5, 10, 15, 20], xlabel: "δ (oyunun bir tur daha sürme olasılığı)", ylabel: "toplam puan" });
        el(svg, "rect", { x: F.X(ds).toFixed(1), y: 34, width: (F.X(1) - F.X(ds)).toFixed(1), height: 138, style: "fill:color-mix(in srgb, var(--ds-good) 10%, transparent)" });
        legend(svg, 14, [{ x: 56, color: C_GOOD, kind: "line", text: "uymak: 3/(1 − δ)" }, { x: 236, color: C_BAD, kind: "line", text: "sapmak: cazibe + δ/(1 − δ)" }]);
        curve(svg, uy, 0, 0.99, F, 20, "stroke:" + C_GOOD);
        curve(svg, sp, 0, 0.99, F, 20, "stroke:" + C_BAD);
        /* eşik */
        const ex = F.X(ds), ey = F.Y(uy(ds));
        dash(svg, "M" + ex.toFixed(1) + " " + ey.toFixed(1) + " V172", "stroke:" + C_MUT);
        dot(svg, ex, ey, 5.5, "fill:var(--ds-bg);stroke:var(--ds-text);stroke-width:2");
        el(svg, "text", { class: "lbl halo", x: (ex + 9).toFixed(1), y: (ey + 17).toFixed(1), style: "font-weight:700;fill:var(--ds-text)" }, "δ* = " + fmt(ds, 3));
        /* mevcut δ */
        const cx = F.X(d);
        el(svg, "path", { d: "M" + cx.toFixed(1) + " 34 V172", style: "fill:none;stroke:" + C_ACC + ";stroke-width:2;stroke-dasharray:6 4" });
        if (uy(d) <= 20) dot(svg, cx, F.Y(uy(d)), 4.5, "fill:" + C_GOOD);
        if (sp(d) <= 20) dot(svg, cx, F.Y(sp(d)), 4.5, "fill:" + C_BAD);
        el(svg, "text", { class: "lbl halo", x: 698, y: 164, "text-anchor": "end", style: "font-weight:700;fill:" + C_GOOD }, "δ ≥ δ*: işbirliği sürer");
        return chip("uymak = <b>" + fmt(uy(d), 2) + "</b>") +
          chip("sapmak = " + fmt(T) + " + δ/(1 − δ) = <b>" + fmt(sp(d), 2) + "</b>") +
          chip("eşik δ* = <b>" + fracDec(2 * T - 6, 2 * T - 2) + "</b>") +
          '<span class="ds-kd__badge ' + (ok ? "ds-kd__badge--ok" : "ds-kd__badge--no") + '">' + (ok ? "İşbirliği sürdürülebilir" : "İşbirliği sürdürülemez") + "</span>";
      }
    });
  };

  /* ---------- 4. Birinci fiyat: teklif kırpma ve teklifçi sayısı ---------- */
  W.kirpma = function (box) {
    build(box, {
      label: "Birinci fiyatta denge teklifi b = (n − 1)v/n, dürüst teklif b = v ve beklenen gelir",
      sliders: [{ key: "n", name: "n", min: 2, max: 10, step: 1, value: 2, aria: "Teklifçi sayısı n" }],
      draw: function (v, svg) {
        const n = v.n, k = (n - 1) / n, b8 = 0.8 * k, rev = (n - 1) / (n + 1);
        const F = frame(svg, { x0: 56, x1: 400, y0: 40, y1: 196, xmin: 0, xmax: 1, ymin: 0, ymax: 1,
          xt: [0, 0.2, 0.4, 0.6, 0.8, 1], yt: [0, 0.2, 0.4, 0.6, 0.8, 1], xlabel: "v (değer)", ylabel: "teklif b" });
        el(svg, "path", { d: "M" + F.X(0) + " " + F.Y(0) + " L" + F.X(1) + " " + F.Y(1) + " L" + F.X(1) + " " + F.Y(k).toFixed(1) + " Z", style: "fill:var(--ds-hot);opacity:.85" });
        legend(svg, 14, [
          { x: 56, color: C_MUT, kind: "dash", text: "dürüst: b = v" },
          { x: 174, color: C_LINK, kind: "line", text: "denge: b = (n − 1)v/n" },
          { x: 342, color: "var(--ds-hot)", kind: "box", text: "kırpma" }
        ]);
        el(svg, "path", { class: "curve", d: "M" + F.X(0) + " " + F.Y(0) + " L" + F.X(1) + " " + F.Y(1), style: "stroke:" + C_MUT + ";stroke-width:2;stroke-dasharray:6 5" });
        el(svg, "path", { class: "curve", d: "M" + F.X(0) + " " + F.Y(0) + " L" + F.X(1) + " " + F.Y(k).toFixed(1), style: "stroke:" + C_LINK });
        const x8 = F.X(0.8);
        dash(svg, "M" + x8.toFixed(1) + " " + F.Y(b8).toFixed(1) + " V196", "stroke:" + C_MUT);
        el(svg, "path", { d: "M" + x8.toFixed(1) + " " + F.Y(0.8).toFixed(1) + " V" + F.Y(b8).toFixed(1), style: "fill:none;stroke:" + C_ACC + ";stroke-width:3.5" });
        dot(svg, x8, F.Y(0.8), 4.5, "fill:" + C_MUT);
        dot(svg, x8, F.Y(b8), 5.5, "fill:" + C_ACC + ";stroke:var(--ds-bg);stroke-width:2");
        /* beklenen gelir çubukları */
        const B = frame(svg, { x0: 500, x1: 704, y0: 40, y1: 196, xmin: 0, xmax: 1, ymin: 0, ymax: 1, xt: [], yt: [0, 0.5, 1] });
        rich(svg, { class: "lbl", x: 470, y: 14, style: "font-weight:700;fill:var(--ds-text)" }, ["beklenen gelir = (n − 1)/(n + 1)"]);
        [[520, C_LINK, "birinci fiyat"], [620, C_GOOD, "ikinci fiyat"]].forEach(function (b) {
          el(svg, "rect", { x: b[0], y: B.Y(rev).toFixed(1), width: 70, height: (196 - B.Y(rev)).toFixed(1), rx: 3, style: "fill:" + b[1] });
          el(svg, "text", { class: "lbl", x: b[0] + 35, y: (B.Y(rev) - 6).toFixed(1), "text-anchor": "middle", style: "font-weight:700;fill:var(--ds-text)" }, fmt(rev, 3));
          el(svg, "text", { class: "lbl", x: b[0] + 35, y: 214, "text-anchor": "middle", style: "font-weight:700;fill:var(--ds-text)" }, b[2]);
        });
        return chip("v = 0,8: teklif b = <b>" + fmt(b8, 3) + "</b>") + chip("kırpma v/n = <b>" + fmt(0.8 / n, 3) + "</b>") +
          chip("beklenen gelir = <b>" + fracDec(n - 1, n + 1) + "</b> (iki kuralda aynı)");
      }
    });
  };

  /* ---------- 5. Pigou ağı: üst yol x^p, alt yol 1 ---------- */
  function pigou(p) {
    const x = Math.pow(p + 1, -1 / p), opt = 1 - p * Math.pow(p + 1, -(p + 1) / p);
    return { x: x, opt: opt, poa: 1 / opt };
  }
  W.pigou = function (box) {
    build(box, {
      label: "Pigou ağında gecikme üssü p'ye göre Anarşinin Bedeli ve optimum trafik payları",
      sliders: [{ key: "p", name: "p", min: 1, max: 10, step: 1, value: 1, aria: "Üst yol gecikme üssü p" }],
      draw: function (v, svg) {
        const p = v.p, r = pigou(p);
        const F = frame(svg, { x0: 56, x1: 440, y0: 40, y1: 196, xmin: 1, xmax: 10, ymin: 1, ymax: 4,
          xt: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], yt: [1, 2, 3, 4], xlabel: "p (üst yol gecikmesinin üssü)", ylabel: "PoA" });
        legend(svg, 14, [{ x: 56, color: C_LINK, kind: "line", text: "PoA = C(denge) / C(OPT) = 1 / C(OPT)" }]);
        dash(svg, "M56 " + F.Y(4 / 3).toFixed(1) + " H440", "stroke:" + C_MUT);
        el(svg, "text", { class: "lbl", x: 446, y: (F.Y(4 / 3) + 4).toFixed(1), style: "font-weight:700" }, "4/3");
        curve(svg, function (t) { return pigou(t).poa; }, 1, 10, F, undefined, "stroke:" + C_LINK);
        for (let k = 1; k <= 10; k++) dot(svg, F.X(k), F.Y(pigou(k).poa), 3, "fill:var(--ds-bg);stroke:" + C_LINK + ";stroke-width:1.5");
        const px = F.X(p), py = F.Y(r.poa);
        dash(svg, "M" + px.toFixed(1) + " " + py.toFixed(1) + " V196 M" + px.toFixed(1) + " " + py.toFixed(1) + " H56", "stroke:" + C_ACC);
        dot(svg, px, py, 6, "fill:" + C_ACC + ";stroke:var(--ds-bg);stroke-width:2");
        /* trafik payları */
        el(svg, "text", { class: "lbl", x: 520, y: 14, style: "font-weight:700;fill:var(--ds-text)" }, "trafik payları");
        const X0 = 520, WD = 184;
        function bar(y, share, title) {
          el(svg, "text", { class: "lbl", x: X0, y: y - 8, style: "font-weight:700;fill:var(--ds-text)" }, title);
          const w = WD * share;
          el(svg, "rect", { x: X0, y: y, width: w.toFixed(1), height: 26, style: "fill:" + C_LINK });
          if (share < 1) el(svg, "rect", { x: (X0 + w).toFixed(1), y: y, width: (WD - w).toFixed(1), height: 26, style: "fill:var(--ds-node);stroke:" + C_LINK + ";stroke-width:1" });
          if (w > 40) el(svg, "text", { class: "lbl", x: (X0 + w / 2).toFixed(1), y: y + 18, "text-anchor": "middle", style: "font-weight:700;fill:var(--ds-bg)" }, "%" + fmt(100 * share, 0));
          if (WD - w > 40) el(svg, "text", { class: "lbl", x: (X0 + w + (WD - w) / 2).toFixed(1), y: y + 18, "text-anchor": "middle", style: "font-weight:700;fill:var(--ds-text)" }, "%" + fmt(100 * (1 - share), 0));
        }
        bar(58, 1, "denge (maliyet 1)");
        bar(122, r.x, "optimum (maliyet " + fmt(r.opt, 3) + ")");
        legend(svg, 180, [{ x: X0, color: C_LINK, kind: "box", text: ["üst yol: x", ["p"]] }]);
        legend(svg, 200, [{ x: X0, color: "var(--ds-node)", stroke: C_LINK, kind: "box", text: "alt yol: 1" }]);
        return chip("x* = (p + 1)<sup>−1/p</sup> = <b>" + fmt(r.x, 3) + "</b>") +
          chip("C(OPT) = 1 − p(p + 1)<sup>−(p+1)/p</sup> = <b>" + fmt(r.opt, 3) + "</b>") +
          chip("C(denge) = <b>1</b>") + chip("PoA = <b>" + fmt(r.poa, 3) + "</b>");
      }
    });
  };

  document.querySelectorAll(".ds-widget[data-widget]").forEach(function (box) {
    const f = W[box.dataset.widget];
    if (f && !box.dataset.ready) { f(box); box.dataset.ready = "1"; }
  });
})();
