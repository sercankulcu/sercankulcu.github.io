/* Copyright (c) Sercan Külcü. All rights reserved. */
/* "Computer Vision Technology on Food Science" (Karaelmas Science and Engineering Journal 8(1), 2018):
   interactive slides. The application explorer lists Tables 1–7 of the review; the vision-pipeline lab draws a
   synthetic apple and says so on its slide. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };

  /* Tables 1–7: product, application, technique, accuracy (%), reference */
  const APPS = {
    Meat: [
      ["Porcine meats", "Prediction of color and pH", "NIR hyperspectral", "72.6 and 86", "Liu et al. (2014)"],
      ["Pork muscles", "Classification", "IR hyperspectral", "93.14", "Pu (2015)"],
      ["Pork", "Detection of PSE (pale, soft, exudative)", "Image analysis", "–", "Chmiel et al. (2016)"],
      ["Pork", "Classification", "Image analysis", "89–100", "Zapotoczny et al. (2016)"],
      ["Beef", "Measuring meat color", "Image analysis", "–", "Girolami et al. (2013)"],
      ["Meat and turkey", "Assess quality parameters", "Multi-spectral", "95", "Daugaard et al. (2010)"],
      ["Lamb", "Prediction of tenderness", "Hyperspectral", "84", "Kamruzzaman et al. (2013)"],
      ["Beef, lamb, and pork", "Prediction of color", "Hyperspectral", "97, 84, and 82", "Kamruzzaman et al. (2016)"],
      ["Lamb", "Predicting chemical constituents", "Hyperspectral", "95, 80, and 91", "Pu et al. (2014)"]
    ],
    Poultry: [
      ["Broiler chickens", "Weight prediction", "3D camera", "92.2", "Mortensen et al. (2016)"],
      ["Poultry", "Classification", "Image analysis", "89–100", "Zapotoczny et al. (2016)"],
      ["Chicken", "Measuring color", "Image analysis", "–", "Girolami et al. (2013)"],
      ["Chicken", "Prediction of color", "Image analysis", "99, 74, and 88", "Barbin et al. (2016)"]
    ],
    Seafood: [
      ["Salmon", "Classification", "Hyperspectral", "98.2", "Xu et al. (2017)"],
      ["Grass carp fish", "Microbial contamination", "Hyperspectral", "–", "Cheng and Sun (2015)"],
      ["Shrimp", "Evaluating freshness", "Image analysis", "90", "Ghasemi-Varnamkhasti et al. (2016)"],
      ["Sea bream", "Evaluating freshness", "Image analysis", "99", "Dowlati et al. (2013)"],
      ["Salmon fillets", "Assessing tenderness", "Hyperspectral and chemometric", "90.5", "He et al. (2014)"],
      ["Shrimp", "Assess quality", "Multispectral", "76, 100", "Xiong et al. (2016)"]
    ],
    Fruit: [
      ["Blueberries", "Microbial contamination and quality parameters", "Image analysis", "–", "Matiacevich et al. (2011)"],
      ["Date fruits", "Determining viscoelastic characteristics", "Image analysis", "–", "Alirezaei et al. (2013)"],
      ["Apple", "Grading", "Image analysis", "92.5", "Moallem et al. (2016)"],
      ["Apple", "Detection of bruise", "Hyperspectral", "98", "Keresztes et al. (2016)"],
      ["Grape", "Prediction of quality", "3D imaging", "82, 83, and 71", "Ivorra et al. (2015)"],
      ["Mango", "Prediction of maturity", "NIR spectroscopy", "74, 68", "Jha et al. (2014)"],
      ["Papaya", "Prediction of shrinkage", "Image analysis", "85.2, 89.1", "Udomkun et al. (2016)"],
      ["Strawberry", "Evaluation of ripeness", "Hyperspectral", "95, 83.3", "Zhang et al. (2016)"],
      ["Cherries", "Classification", "Image analysis", "85", "Wang et al. (2012)"]
    ],
    Vegetables: [
      ["Potato", "Classification", "Image analysis", "94", "Dutta et al. (2015)"],
      ["Onion", "Classification", "Hyperspectral, 3D, and X-ray imaging", "88.9", "Wang et al. (2015)"],
      ["Tomato", "Evaluating the quality", "Image analysis", "96.47", "Arakeri et al. (2016)"],
      ["Potato", "Detection of blackspot", "Hyperspectral", "94", "López-Maestresalas et al. (2016)"],
      ["Soybean", "Prediction of color and moisture", "Hyperspectral", "86.2, 97.1", "Huang et al. (2014)"],
      ["Green peas", "Evaluating the quality", "Image analysis", "–", "Barzegar et al. (2015)"],
      ["Carrot", "Classification", "Computed tomography", "87.9", "Donis-González et al. (2016)"]
    ],
    Grain: [
      ["Rice", "Classification: texture, shape, texture & shape", "Image analysis", "82.61, 88.00, and 87.27", "Chaugule and Mali (2014)"],
      ["Rice", "Classification", "Image analysis", "98", "Pazoki et al. (2014)"],
      ["Rice kernels", "Evaluation of implicit properties", "Image analysis", "92", "Jinorose et al. (2014)"],
      ["Wheat, cassava and corn flour", "Analysis of flour adulteration", "Hyperspectral", "97", "Su et al. (2017)"],
      ["Wheat", "Classification", "Image analysis", "85.72", "Khoshroo et al. (2014)"]
    ],
    Bakery: [
      ["Corn tortillas", "Classification", "Image analysis", "95", "Domingo et al. (2010)"],
      ["Biscuits", "Detection of foreign bodies", "Infrared thermography", "–", "Senni et al. (2014)"],
      ["Potato chips", "Identification of acrylamide", "Image analysis", "94", "Dutta et al. (2015)"]
    ]
  };
  function group(t) {
    t = t.toLowerCase();
    if (t.indexOf("x-ray") >= 0) return "Multimodal";
    if (t.indexOf("hyperspectral") >= 0) return "Hyperspectral";
    if (t.indexOf("multi") >= 0) return "Multispectral";
    if (t.indexOf("3d") >= 0) return "3D imaging";
    if (t.indexOf("nir") >= 0) return "NIR spectroscopy";
    if (t.indexOf("tomography") >= 0) return "CT";
    if (t.indexOf("thermography") >= 0) return "Thermography";
    return "Image analysis (RGB)";
  }
  const ROWS = [];
  Object.keys(APPS).forEach(function (d) { APPS[d].forEach(function (r) { ROWS.push({ dom: d, p: r[0], a: r[1], t: r[2], acc: r[3], ref: r[4], g: group(r[2]) }); }); });

  /* ---------- 1. application explorer ---------- */
  (function explorer() {
    const body = $("cv-app-body"), chart = $("cv-app-chart"), note = $("cv-app-note");
    if (!body) return;
    const st = { dom: "All" };
    function draw() {
      const rows = ROWS.filter(function (r) { return st.dom === "All" || r.dom === st.dom; });
      body.innerHTML = rows.map(function (r) {
        return "<tr><td>" + r.p + "</td><td>" + r.a + "</td><td>" + r.t + "</td><td class='num'>" + r.acc + "</td><td>" + r.ref + "</td></tr>";
      }).join("");
      const cnt = {};
      rows.forEach(function (r) { cnt[r.g] = (cnt[r.g] || 0) + 1; });
      const keys = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; });
      const W = 260, rowH = 22, L = 120, R = 230, T = 16, H = T + rowH * keys.length + 6;
      const c = PV.svg(chart, W, H, "Studies by imaging technique"), g = c.svg;
      const max = Math.max.apply(null, keys.map(function (k) { return cnt[k]; }));
      const x = PV.linear(0, max, L, R);
      PV.el(g, "text", { x: 0, y: 10, class: "tk" }, "studies by technique");
      keys.forEach(function (k, i) {
        const y = T + i * rowH;
        PV.el(g, "text", { x: L - 6, y: y + 14, "text-anchor": "end", class: "tk" }, k);
        PV.hbar(g, x(0), y + 4, Math.max(2, x(cnt[k]) - x(0)), 14, "mk", k === "Image analysis (RGB)" ? "var(--pv-s1)" : "var(--pv-s2)");
        PV.el(g, "text", { x: x(cnt[k]) + 4, y: y + 15, class: "vl" }, cnt[k]);
      });
      note.textContent = rows.length + " applications" + (st.dom === "All" ? " across 7 food groups" : " for " + st.dom.toLowerCase()) + ". Click a column header to sort.";
    }
    PV.seg($("cv-app-dom"), function (v) { st.dom = v; draw(); });
    PV.sortable($("cv-app-table"));
  })();

  /* ---------- 2. vision pipeline lab on a synthetic apple ---------- */
  (function pipeline() {
    const canvas = $("cv-lab");
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const W = 240, H = 240;
    canvas.width = W; canvas.height = H;
    const sl = { light: $("cv-lab-light"), noise: $("cv-lab-noise"), thr: $("cv-lab-thr"), defect: $("cv-lab-def") };
    const out = $("cv-lab-out");
    let step = "classify";
    function render() {
      /* acquisition: an apple with a bruise on a grey belt, lit from the left */
      const light = +sl.light.value / 100, noise = +sl.noise.value, bruise = +sl.defect.value;
      let seed = 3;
      const rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      const img = ctx.createImageData(W, H), d = img.data;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const dx = x - 120, dy = y - 124, r = Math.hypot(dx * 1.05, dy);
        const inApple = r < 88 + 4 * Math.cos(Math.atan2(dy, dx) * 2);
        const bx = x - 150, by = y - 105, inBruise = inApple && bruise > 0 && Math.hypot(bx, by) < bruise;
        /* uneven illumination: brighter on the left, scaled by the lighting slider */
        const shade = (0.55 + 0.45 * light) * (1 - (1 - light) * 0.6 * (x / W));
        let rr, gg, bb;
        if (inBruise) { rr = 95; gg = 55; bb = 35; }
        else if (inApple) { const s = 1 - 0.25 * (r / 90); rr = 200 * s + 20; gg = 35 * s + 10; bb = 40 * s + 10; }
        else { rr = gg = bb = 150; }
        /* sensor noise, independent per channel */
        const k = 4 * (y * W + x);
        d[k] = Math.max(0, Math.min(255, rr * shade + (rnd() - 0.5) * noise * 2));
        d[k + 1] = Math.max(0, Math.min(255, gg * shade + (rnd() - 0.5) * noise * 2));
        d[k + 2] = Math.max(0, Math.min(255, bb * shade + (rnd() - 0.5) * noise * 2));
        d[k + 3] = 255;
      }
      /* preprocessing: 3 × 3 mean filter */
      const f = new Uint8ClampedArray(d.length);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) {
        let s = 0, m = 0;
        for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) { const xx = x + i, yy = y + j; if (xx >= 0 && yy >= 0 && xx < W && yy < H) { s += d[4 * (yy * W + xx) + c]; m++; } }
        f[4 * (y * W + x) + c] = s / m;
      }
      for (let i = 3; i < f.length; i += 4) f[i] = 255;
      /* segmentation: an apple pixel is "redder than grey" (R − G above the threshold) */
      const thr = +sl.thr.value, mask = new Uint8Array(W * H), def = new Uint8Array(W * H);
      let area = 0, dArea = 0, sumR = 0;
      for (let i = 0; i < W * H; i++) {
        const R = f[4 * i], G = f[4 * i + 1];
        if (R - G > thr) {
          mask[i] = 1; area++; sumR += R;
        }
      }
      /* feature extraction: inside the fruit, dark brown pixels (low red relative to the fruit average) are defects */
      const meanR = area ? sumR / area : 0;
      for (let i = 0; i < W * H; i++) if (mask[i] && f[4 * i] < 0.62 * meanR) { def[i] = 1; dArea++; }
      const o = ctx.createImageData(W, H), od = o.data;
      for (let i = 0; i < W * H; i++) {
        const k = 4 * i;
        if (step === "acquire") { od[k] = d[k]; od[k + 1] = d[k + 1]; od[k + 2] = d[k + 2]; }
        else if (step === "preprocess") { od[k] = f[k]; od[k + 1] = f[k + 1]; od[k + 2] = f[k + 2]; }
        else if (step === "segment") { const v = mask[i] ? 255 : 0; od[k] = od[k + 1] = od[k + 2] = v; }
        else { od[k] = def[i] ? 255 : f[k] * 0.55; od[k + 1] = def[i] ? 210 : f[k + 1] * 0.55; od[k + 2] = def[i] ? 0 : f[k + 2] * 0.55; if (!mask[i]) { od[k] = od[k + 1] = od[k + 2] = 30; } }
        od[k + 3] = 255;
      }
      ctx.putImageData(o, 0, 0);
      const pct = area ? dArea / area * 100 : 0;
      const diam = 2 * Math.sqrt(area / Math.PI);
      const grade = area < 8000 ? "Rejected: fruit not segmented" : pct > 3 ? "Grade B: visible defect" : "Grade A";
      out.innerHTML =
        "<tr><td>Fruit area / equivalent diameter</td><td class='num'>" + area.toLocaleString("en") + " px / " + diam.toFixed(0) + " px</td></tr>" +
        "<tr><td>Mean red level (colour feature)</td><td class='num'>" + meanR.toFixed(0) + "</td></tr>" +
        "<tr><td>Defect area (texture / colour)</td><td class='num'><b>" + pct.toFixed(1) + "%</b></td></tr>" +
        "<tr><td>Decision (rule: defect &gt; 3% → grade B)</td><td class='num'><b style='color:" + (grade === "Grade A" ? "var(--ds-good)" : "var(--ds-bad)") + "'>" + grade + "</b></td></tr>";
    }
    PV.seg($("cv-lab-step"), function (v) { step = v; render(); });
    Object.keys(sl).forEach(function (k) {
      sl[k].addEventListener("input", function () {
        $("cv-lab-" + (k === "defect" ? "def" : k) + "-out").textContent = sl[k].value + (k === "light" ? "%" : "");
        render();
      });
      $("cv-lab-" + (k === "defect" ? "def" : k) + "-out").textContent = sl[k].value + (k === "light" ? "%" : "");
    });
    render();
  })();

  /* ---------- 3. imaging modalities along the spectrum ---------- */
  (function spectrum() {
    const host = $("cv-spec");
    if (!host) return;
    const note = $("cv-spec-note");
    /* wavelength bands in nm, drawn on a log axis */
    const M = [
      { k: "X-ray / CT", a: 0.01, b: 10, g: ["CT", "Multimodal"], txt: "Penetrates the product: internal structure and defects (fibrous tissue in carrots, onion inspection)." },
      { k: "UV", a: 100, b: 400, g: [], txt: "Fluorescence of contaminants; mentioned as an acquisition option, no study in the tables." },
      { k: "Visible (RGB)", a: 400, b: 700, g: ["Image analysis (RGB)", "3D imaging"], txt: "Colour, size, shape and surface texture: the workhorse, used in most listed studies." },
      { k: "NIR / SWIR", a: 700, b: 2500, g: ["NIR spectroscopy"], txt: "Water, fat and protein absorption: maturity, moisture and chemical composition." },
      { k: "Hyper / multispectral", a: 400, b: 2500, g: ["Hyperspectral", "Multispectral"], txt: "A full spectrum per pixel (hyper) or a few chosen bands (multi): tenderness, bruises, contamination, adulteration." },
      { k: "Thermal IR", a: 8000, b: 14000, g: ["Thermography"], txt: "Temperature differences: foreign bodies in biscuits." }
    ];
    let sel = 2;
    function draw() {
      const W = 720, H = 190, L = 20, R = 700, T = 20;
      const c = PV.svg(host, W, H, "Imaging modalities along the electromagnetic spectrum"), g = c.svg;
      const x = PV.log(0.005, 30000, L, R);
      /* visible rainbow band for orientation */
      for (let nm = 400; nm < 700; nm += 10) {
        PV.el(g, "rect", { x: x(nm), y: T, width: x(nm + 10) - x(nm) + 0.5, height: 8, fill: "hsl(" + (270 - (nm - 400) * 0.9) + " 80% 55%)" });
      }
      [0.01, 1, 100, 1000, 10000].forEach(function (v) {
        PV.el(g, "line", { x1: x(v), x2: x(v), y1: T + 10, y2: H - 22, class: "gl" });
        PV.el(g, "text", { x: x(v), y: H - 8, "text-anchor": "middle", class: "tk" }, v >= 1000 ? (v / 1000) + " µm" : v + " nm");
      });
      M.forEach(function (m, i) {
        const y = T + 16 + i * 22, on = i === sel;
        const cnt = ROWS.filter(function (r) { return m.g.indexOf(r.g) >= 0; }).length;
        const bar = PV.el(g, "rect", { x: x(m.a), y: y, width: Math.max(4, x(m.b) - x(m.a)), height: 16, rx: 4, fill: on ? "var(--pv-s2)" : "var(--pv-s1)", opacity: on ? 1 : 0.55, style: "cursor:pointer" });
        PV.el(g, "text", { x: x(m.b) + 6 > R - 120 ? x(m.a) - 6 : x(m.b) + 6, y: y + 12, "text-anchor": x(m.b) + 6 > R - 120 ? "end" : "start", class: on ? "tt" : "vl" }, m.k + " · " + cnt + " studies");
        bar.addEventListener("click", function (e) { e.stopPropagation(); sel = i; draw(); });
        bar.setAttribute("tabindex", "0");
        bar.addEventListener("keydown", function (e) { if (e.key === "Enter") { sel = i; draw(); } });
      });
      const m = M[sel];
      const ex = ROWS.filter(function (r) { return m.g.indexOf(r.g) >= 0; }).slice(0, 3).map(function (r) { return r.p.toLowerCase() + " (" + r.a.toLowerCase() + ")"; });
      note.innerHTML = "<b>" + m.k + ".</b> " + m.txt + (ex.length ? " Examples: " + ex.join("; ") + "." : "");
    }
    draw();
  })();
})();
