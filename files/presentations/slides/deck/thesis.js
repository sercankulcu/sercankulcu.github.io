/* Copyright (c) Sercan Külcü. All rights reserved. */
/* PhD thesis "Analysis of Smart Antenna Based Scheduling Algorithms for IoT Networks" (KTÜ, 2022):
   interactive slides for the English and the Turkish deck. Results come from Tables 3, 4, 5 and 7 and
   Eq. (2)-(7) of the thesis; the spatial-reuse lab is a simplified illustration and says so on its slide. */
(function () {
  if (!window.PV || !PV.allowed) return;
  const $ = function (id) { return document.getElementById(id); };
  const deck = $("ds-deck");
  const TR = deck && deck.lang === "tr";
  const T = function (en, tr) { return TR ? tr : en; };
  const num = function (v, d) { const s = Number(v).toFixed(d === undefined ? 0 : d); return TR ? s.replace(".", ",") : s; };
  const COL = { omni: "var(--pv-base)", sw2: "#1baf7a", sw3: "var(--pv-s1)", steer: "var(--pv-s2)" };
  const NAME = {
    omni: T("Omnidirectional", "Tüm yönlü"), sw2: T("2 switched beams", "2 anahtarlanabilir huzme"),
    sw3: T("3 switched beams", "3 anahtarlanabilir huzme"), steer: T("Steerable", "Döner yönlü")
  };

  /* ---------- 1. the crowded 2.4 GHz band (Fig. 1) ---------- */
  (function band() {
    const host = $("th-band");
    if (!host) return;
    const box = $("th-wifi"), note = $("th-band-note");
    const on = new Set([1, 6, 11]);
    function draw() {
      const W = 720, H = 190, L = 30, R = 700, x = PV.linear(2400, 2485, L, R);
      const c = PV.svg(host, W, H, T("IEEE 802.15.4 and Wi-Fi channels in the 2.4 GHz band", "2,4 GHz bandında IEEE 802.15.4 ve Wi-Fi kanalları"));
      const g = c.svg;
      for (let f = 2400; f <= 2485; f += 10) {
        PV.el(g, "line", { x1: x(f), x2: x(f), y1: 20, y2: 150, class: "gl" });
        PV.el(g, "text", { x: x(f), y: 166, "text-anchor": "middle", class: "tk" }, f);
      }
      PV.el(g, "text", { x: (L + R) / 2, y: 184, "text-anchor": "middle", class: "tk" }, T("frequency (MHz)", "frekans (MHz)"));
      on.forEach(function (w) {
        const f = 2407 + 5 * w;
        const p = "M" + x(f - 11) + " 150 Q" + x(f) + " -10 " + x(f + 11) + " 150";
        PV.el(g, "path", { d: p, fill: "var(--pv-base)", "fill-opacity": 0.18, stroke: "var(--pv-base)", "stroke-width": 1.5 });
        PV.el(g, "text", { x: x(f), y: 40, "text-anchor": "middle", class: "tt" }, "Wi-Fi " + w);
      });
      const clean = [];
      for (let k = 11; k <= 26; k++) {
        const f = 2405 + 5 * (k - 11);
        let hit = false;
        on.forEach(function (w) { if (Math.abs(f - (2407 + 5 * w)) < 12) hit = true; });
        if (!hit) clean.push(k);
        PV.el(g, "rect", { x: x(f - 1), y: 100, width: x(f + 1) - x(f - 1), height: 50, rx: 2, fill: hit ? "var(--pv-s2)" : "#1baf7a", "fill-opacity": hit ? 0.55 : 0.9 });
        PV.el(g, "text", { x: x(f), y: 95, "text-anchor": "middle", class: "tk", style: "font-size:10px" }, k);
        const hitR = PV.el(g, "rect", { x: x(f - 2.5), y: 20, width: x(f + 2.5) - x(f - 2.5), height: 130, class: "hit", "aria-label": "802.15.4 " + k });
        PV.hover(c, hitR, "<b>802.15.4 " + T("channel", "kanal") + " " + k + "</b><br>" + f + " MHz<br>" + (hit ? T("overlaps an active Wi-Fi channel", "etkin bir Wi-Fi kanalıyla çakışıyor") : T("free of the selected Wi-Fi channels", "seçili Wi-Fi kanallarından bağımsız")));
      }
      note.innerHTML = T("Free 802.15.4 channels: ", "Boş kalan 802.15.4 kanalları: ") + "<b>" + clean.length + " / 16</b>" +
        (clean.length ? " (" + clean.join(", ") + ")" : "") + ". " +
        T("With Wi-Fi on 1, 6 and 11 only channels 15, 20, 25 and 26 stay clean: channel hopping loses most of its diversity, so a new dimension is needed.",
          "Wi-Fi 1, 6 ve 11 açıkken yalnızca 15, 20, 25 ve 26 numaralı kanallar temiz kalır: frekans atlama çeşitliliğinin çoğunu kaybeder, yeni bir boyut gerekir.");
    }
    box.addEventListener("click", function (e) {
      const b = e.target.closest("button");
      if (!b) return;
      const w = +b.dataset.v;
      if (on.has(w)) on.delete(w); else on.add(w);
      b.classList.toggle("is-on", on.has(w));
      b.setAttribute("aria-pressed", on.has(w));
      draw();
    });
    box.querySelectorAll("button").forEach(function (b) { b.classList.toggle("is-on", on.has(+b.dataset.v)); b.setAttribute("aria-pressed", on.has(+b.dataset.v)); });
    draw();
  })();

  /* antenna gain in dBi towards a direction offset d (radians) from where the antenna points, Eq. (3) */
  function gainOf(mode, d, k) {
    if (mode === "omni") return 0;
    if (mode === "steer") return 10 * (1 + Math.cos(d)) - 15;
    const w = Math.PI * 2 / k;
    let a = ((d + w / 2) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    return a < w ? 0 : -Infinity;
  }
  /* received signal strength, Eq. (4): Ptx 0 dBm, Ppl -40 dB, K 2.5, d0 1 m */
  function rssOf(d, g1, g2) { return -40 - 25 * Math.log10(Math.max(1, d)) + g1 + g2; }
  const SENS = rssOf(50, 0, 0); /* omni link range of 50 m in Cooja → about -82.5 dBm */

  /* ---------- 2. antenna lab: pattern and link budget ---------- */
  (function antenna() {
    const host = $("th-ant");
    if (!host) return;
    const sa = $("th-ant-a"), sb = $("th-ant-b"), sd = $("th-ant-d"), out = $("th-ant-out");
    let mode = "steer";
    const K = { omni: 1, sw2: 2, sw3: 3, steer: 1 };
    function pattern(g, cx, cy, R, point, col) {
      let d = "";
      for (let i = 0; i <= 360; i += 3) {
        const th = i * Math.PI / 180;
        let v = gainOf(mode, th, K[mode]);
        v = v === -Infinity ? 0 : Math.max(0, (v + 20) / 25);
        const px = cx + R * v * Math.cos(th + point), py = cy - R * v * Math.sin(th + point);
        d += (i ? " L" : "M") + px.toFixed(1) + " " + py.toFixed(1);
      }
      PV.el(g, "path", { d: d + " Z", fill: col, "fill-opacity": 0.25, stroke: col, "stroke-width": 1.5 });
    }
    function draw() {
      const a = +sa.value * Math.PI / 180, b = +sb.value * Math.PI / 180, dist = +sd.value;
      $("th-ant-a-out").textContent = sa.value + "°";
      $("th-ant-b-out").textContent = sb.value + "°";
      $("th-ant-d-out").textContent = dist + " m";
      const W = 720, H = 170, g = PV.svg(host, W, H, T("Antenna patterns of two nodes", "İki düğümün anten örüntüleri")).svg;
      const ax = 100, bx = 100 + Math.min(330, dist * 2.2), cy = 85;
      /* B lies at 0 rad from A; A lies at π from B */
      pattern(g, ax, cy, 62, a, "var(--pv-s1)");
      pattern(g, bx, cy, 62, Math.PI + b, "var(--pv-s2)");
      PV.el(g, "line", { x1: ax, x2: bx, y1: cy, y2: cy, stroke: "var(--ds-border-base)", "stroke-dasharray": "4 3" });
      [[ax, "A"], [bx, "B"]].forEach(function (p) {
        PV.el(g, "circle", { cx: p[0], cy: cy, r: 6, fill: "var(--ds-text)" });
        PV.el(g, "text", { x: p[0], y: cy + 22, "text-anchor": "middle", class: "tt" }, p[1]);
      });
      const gA = gainOf(mode, -a, K[mode]), gB = gainOf(mode, -b, K[mode]);
      const r = gA === -Infinity || gB === -Infinity ? -Infinity : rssOf(dist, gA, gB);
      const up = r >= SENS;
      const tx = 500;
      PV.el(g, "text", { x: tx, y: 22, class: "tt" }, T("Gain of A towards B: ", "A'nın B yönündeki kazancı: ") + (gA === -Infinity ? "–" : num(gA, 1) + " dBi"));
      PV.el(g, "text", { x: tx, y: 44, class: "tt" }, T("Gain of B towards A: ", "B'nin A yönündeki kazancı: ") + (gB === -Infinity ? "–" : num(gB, 1) + " dBi"));
      PV.el(g, "text", { x: tx, y: 72, class: "tt", style: "font-size:15px" }, "RSS = " + (r === -Infinity ? "–" : num(r, 1) + " dBm"));
      PV.el(g, "text", { x: tx, y: 94, class: "tk" }, T("threshold ", "eşik ") + num(SENS, 1) + " dBm " + T("(omni range 50 m)", "(tüm yönlü menzil 50 m)"));
      PV.el(g, "rect", { x: tx, y: 108, width: 190, height: 30, rx: 6, fill: up ? "#1baf7a" : "var(--pv-s2)", "fill-opacity": 0.85 });
      PV.el(g, "text", { x: tx + 95, y: 128, "text-anchor": "middle", class: "tt", style: "fill:#fff" }, up ? T("link up", "bağlantı var") : T("no link", "bağlantı yok"));
      const both = rssOf(1, gainOf(mode, 0, K[mode]), gainOf(mode, 0, K[mode])) - SENS;
      const reach = Math.pow(10, both / 25);
      out.innerHTML = mode === "steer" ?
        T("Steerable antenna, Eq. (3): G(θ) = 10(1 + cos θ) − 15 dBi, so +5 dBi on boresight, −5 dBi at 90° and −15 dBi behind. Two aligned antennas reach about <b>",
          "Döner yönlü anten, Denklem (3): G(θ) = 10(1 + cos θ) − 15 dBi; tam karşıda +5 dBi, 90°'de −5 dBi, arkada −15 dBi. Birbirine bakan iki anten yaklaşık <b>") + num(reach) + T(" m</b> under this threshold (the thesis reports up to 80 m); facing away they hear each other only within a few metres.", " m</b> uzağa ulaşır (tezde en çok 80 m); sırt sırta durduklarında yalnızca birkaç metreden duyulurlar.") :
        mode === "omni" ? T("Omnidirectional: 0 dBi in every direction, 50 m range, and every neighbour within 100 m is disturbed.", "Tüm yönlü: her yönde 0 dBi, 50 m menzil; 100 m içindeki her komşu girişimden etkilenir.") :
          T("Switched beams: each antenna covers a fixed sector (", "Anahtarlanabilir huzme: her anten sabit bir dilimi kapsar (") + (360 / K[mode]) + T("°). Only the antenna that faces the neighbour is used for unicast, so the other sectors stay quiet.", "°). Tekil gönderimde yalnızca komşuya bakan anten kullanılır, diğer dilimler sessiz kalır.");
    }
    PV.seg($("th-ant-m"), function (v) { mode = v; draw(); });
    [sa, sb, sd].forEach(function (e) { e.addEventListener("input", draw); });
  })();

  /* ---------- 3. spatial-reuse lab: a greedy TASA-like scheduler on a 5 × 5 grid ---------- */
  (function lab() {
    const host = $("th-lab");
    if (!host) return;
    const grid = $("th-lab-grid"), slot = $("th-lab-slot"), out = $("th-lab-out");
    const n = 5, sp = 40, cN = (n - 1) / 2, N = [];
    for (let r = 0; r < n; r++) for (let q = 0; q < n; q++) N.push({ x: q * sp, y: r * sp, gx: q, gy: r });
    N.forEach(function (a) {
      const dx = a.gx - cN, dy = a.gy - cN;
      a.hop = Math.abs(dx) + Math.abs(dy);
      if (!a.hop) { a.parent = -1; return; }
      let px = a.gx, py = a.gy;
      if (Math.abs(dx) >= Math.abs(dy)) px -= Math.sign(dx); else py -= Math.sign(dy);
      a.parent = py * n + px;
    });
    const root = N.findIndex(function (a) { return a.parent < 0; });
    const ang = function (a, b) { return Math.atan2(b.y - a.y, b.x - a.x); };
    const OFF = { sw2: -Math.PI / 4, sw3: -Math.PI / 12 };
    function sec(th, k, off) { const w = Math.PI * 2 / k; return Math.floor((((th - off) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / w); }
    function g(mode, a, b, t) {
      if (mode === "omni") return 0;
      if (mode === "steer") return 10 * (1 + Math.cos(ang(a, b) - ang(a, t))) - 15;
      const k = mode === "sw2" ? 2 : 3;
      return sec(ang(a, b), k, OFF[mode]) === sec(ang(a, t), k, OFF[mode]) ? 0 : -Infinity;
    }
    /* interference if the interferer's signal at a receiver is above -90 dBm (100 m for omni antennas) */
    function hurts(mode, s2, p1, p2, s1) {
      const d = Math.hypot(s2.x - p1.x, s2.y - p1.y);
      return -40 - 25 * Math.log10(d) + g(mode, s2, p1, p2) + g(mode, p1, s2, s1) >= -90;
    }
    function run(mode, nch, tr) {
      const q = N.map(function (a) { return a.parent < 0 ? 0 : tr; });
      let left = (N.length - 1) * tr, t = 0;
      const S = [];
      while (left > 0 && t < 400) {
        const cand = N.map(function (_, i) { return i; }).filter(function (i) { return i !== root && q[i] > 0; });
        cand.sort(function (a, b) { return q[b] - q[a] || N[b].hop - N[a].hop || a - b; });
        const busy = new Set(), sel = [];
        cand.forEach(function (s) {
          const p = N[s].parent;
          if (busy.has(s) || busy.has(p)) return;
          for (let c = 0; c < nch; c++) {
            const ok = sel.every(function (l) {
              return l.c !== c || (!hurts(mode, N[l.s], N[p], N[l.p], N[s]) && !hurts(mode, N[s], N[l.p], N[p], N[l.s]));
            });
            if (ok) { sel.push({ s: s, p: p, c: c }); busy.add(s); busy.add(p); break; }
          }
        });
        sel.forEach(function (l) { q[l.s]--; if (l.p === root) left--; else q[l.p]++; });
        S.push(sel); t++;
      }
      return S;
    }
    let mode = "omni", nch = 1, tr = 1, S = [];
    const CH = ["var(--pv-s1)", "var(--pv-s2)", "#1baf7a", "#9b59b6"];
    const SC = 1.3, O = 21;
    const px = function (a) { return [O + a.x * SC, O + a.y * SC]; };
    /* area in which a sender disturbs a receiver listening omnidirectionally: RSS ≥ -90 dBm, i.e. 100 m × 10^(G/25) */
    function footprint(a, p) {
      const th0 = ang(a, p), pts = [];
      for (let i = 0; i <= 72; i++) {
        const th = th0 + i * Math.PI / 36, gn = g(mode, a, { x: a.x + Math.cos(th), y: a.y + Math.sin(th) }, p);
        const r = gn === -Infinity ? 0 : 100 * Math.pow(10, gn / 25) * SC, c = px(a);
        pts.push((i ? "L" : "M") + (c[0] + r * Math.cos(th)).toFixed(1) + " " + (c[1] + r * Math.sin(th)).toFixed(1));
      }
      return pts.join(" ") + " Z";
    }
    const CAP = {
      omni: T("Omni: every sender disturbs all nodes within 100 m (shaded), so neighbouring links must take turns or other channels.",
        "Tüm yönlü: her gönderici 100 m içindeki tüm düğümleri etkiler (gölgeli alan); komşu bağlantılar sırayla ya da farklı kanallarda iletmek zorundadır."),
      sw2: T("2 switched beams: only the 180° antenna facing the parent transmits, so the other half of the neighbourhood stays free.",
        "2 anahtarlanabilir huzme: yalnızca ataya bakan 180° anten yayın yapar, komşuluğun diğer yarısı serbest kalır."),
      sw3: T("3 switched beams: a 120° sector transmits; links that point away from each other share the slot and the channel.",
        "3 anahtarlanabilir huzme: 120° dilim yayın yapar; birbirinden uzağa bakan bağlantılar dilimi ve kanalı paylaşır."),
      steer: T("Steerable: the beam reaches further ahead (+5 dBi) but much less sideways and behind (−5 / −15 dBi).",
        "Döner yönlü: huzme önde daha uzağa (+5 dBi), yanlara ve arkaya çok daha az (−5 / −15 dBi) ulaşır.")
    };
    function drawTopo(k) {
      const W = 250, H = 250;
      const c = PV.svg(host, W, H, T("Grid network and the links active in the selected slot", "Izgara ağ ve seçili zaman dilimindeki etkin bağlantılar"));
      const gg = c.svg;
      N.forEach(function (a) { if (a.parent >= 0) { const q = px(a), r = px(N[a.parent]); PV.el(gg, "line", { x1: q[0], y1: q[1], x2: r[0], y2: r[1], stroke: "var(--ds-border-base)", "stroke-width": 1 }); } });
      const act = S[k] || [];
      act.forEach(function (l) { PV.el(gg, "path", { d: footprint(N[l.s], N[l.p]), fill: CH[l.c], "fill-opacity": 0.16, stroke: CH[l.c], "stroke-opacity": 0.7, "stroke-width": 1.2, "stroke-dasharray": "4 3" }); });
      act.forEach(function (l) {
        const q = px(N[l.s]), r = px(N[l.p]);
        PV.el(gg, "line", { x1: q[0], y1: q[1], x2: r[0], y2: r[1], stroke: CH[l.c], "stroke-width": 5, "stroke-linecap": "round" });
      });
      const tx = new Map(act.map(function (l) { return [l.s, l.c]; }));
      N.forEach(function (a, i) {
        const q = px(a);
        PV.el(gg, "circle", { cx: q[0], cy: q[1], r: i === root ? 8 : 6, fill: tx.has(i) ? CH[tx.get(i)] : (i === root ? "var(--ds-text)" : "var(--ds-bg)"), stroke: "var(--ds-text)", "stroke-width": 1.5 });
      });
      $("th-lab-cap").innerHTML = CAP[mode] + " " + T("Slot ", "Dilim ") + (k + 1) + ": <b>" + act.length + "</b> " + T(act.length === 1 ? "parallel link." : "parallel links.", "paralel bağlantı.");
    }
    function drawGrid() {
      const len = S.length, L = 40, W = 400, cw = (W - L - 6) / Math.max(len, 1), rh = 6, H = rh * (N.length - 1) + 28;
      const c = PV.svg(grid, W, H, T("Schedule: rows are nodes, columns are slots", "Çizelge: satırlar düğümler, sütunlar zaman dilimleri"));
      const gg = c.svg;
      const rows = N.map(function (_, i) { return i; }).filter(function (i) { return i !== root; }).sort(function (a, b) { return N[a].hop - N[b].hop || a - b; });
      rows.forEach(function (id, r) { if (!r || N[rows[r - 1]].hop !== N[id].hop) PV.el(gg, "text", { x: L - 4, y: 8 + r * rh + 6, "text-anchor": "end", class: "tk", style: "font-size:12px" }, "hop " + N[id].hop); });
      S.forEach(function (sel, k) {
        sel.forEach(function (l) {
          const r = rows.indexOf(l.s);
          PV.el(gg, "rect", { x: L + k * cw, y: 8 + r * rh, width: Math.max(1, cw - 0.6), height: rh - 1, fill: CH[l.c] });
        });
      });
      const k = +slot.value;
      PV.el(gg, "rect", { x: L + k * cw - 0.5, y: 4, width: cw + 1, height: rh * rows.length + 6, fill: "none", stroke: "var(--ds-text)", "stroke-width": 1.2 });
      PV.el(gg, "text", { x: L, y: H - 3, class: "tk", style: "font-size:12px" }, T("slot 1", "dilim 1"));
      PV.el(gg, "text", { x: L + cw * len, y: H - 3, "text-anchor": "end", class: "tk", style: "font-size:12px" }, T("slot ", "dilim ") + len);
      const hit = PV.el(gg, "rect", { x: L, y: 0, width: cw * len, height: H, class: "hit" });
      hit.addEventListener("click", function (e) {
        const box = gg.getBoundingClientRect(), vb = gg.viewBox.baseVal, sx = vb && vb.width ? vb.width / box.width : 1;
        const kk = Math.floor(((e.clientX - box.left) * sx - L) / cw);
        if (kk >= 0 && kk < len) { slot.value = kk; show(); }
      });
    }
    function show() {
      const k = +slot.value;
      $("th-lab-slot-out").textContent = (k + 1) + " / " + S.length;
      drawTopo(k);
      drawGrid();
    }
    function update() {
      S = run(mode, nch, tr);
      slot.max = S.length - 1;
      if (+slot.value > S.length - 1) slot.value = 0;
      const links = S.reduce(function (a, s) { return a + s.length; }, 0), bound = (N.length - 1) * tr;
      const base = run("omni", nch, tr).length;
      out.innerHTML = T("Schedule length: <b>", "Çizelge uzunluğu: <b>") + S.length + T(" slots</b> (lower bound ", " dilim</b> (alt sınır ") + bound +
        T(": the sink receives one packet per slot) · ", ": toplayıcı her dilimde bir paket alır) · ") +
        T("average parallel links per slot: <b>", "dilim başına ortalama paralel bağlantı: <b>") + num(links / S.length, 2) + "</b>" +
        (mode === "omni" ? "" : " · " + T("vs omni: ", "tüm yönlüye göre: ") + "<b>" + (S.length <= base ? "−" : "+") + (TR ? "%" : "") + num(Math.abs(1 - S.length / base) * 100) + (TR ? "" : "%") + "</b>");
      show();
    }
    PV.seg($("th-lab-m"), function (v) { mode = v; update(); });
    PV.seg($("th-lab-ch"), function (v) { nch = +v; update(); });
    PV.seg($("th-lab-tr"), function (v) { tr = +v; update(); });
    slot.addEventListener("input", show);
  })();

  /* ---------- 4. Tables 3 and 4: performance against network size ---------- */
  (function results() {
    const host = $("th-res");
    if (!host) return;
    const X = [25, 49, 73, 81, 101];
    const D = {
      omni: { pdr: [94.87, 83.55, 61.04, 57.12, 39.13], lat: [1267, 1560, 2254, 2433, 3145], en: [3.21, 3.65, 4.09, 4.23, 5.08] },
      sw2: { pdr: [97.94, 87.61, 63.49, 58.73, 42.17], lat: [595, 1174, 1594, 1665, 2324], en: [1.55, 1.82, 1.89, 2.01, 2.31] },
      sw3: { pdr: [100, 88.77, 66.74, 61.34, 44.06], lat: [536, 1094, 1544, 1613, 1793], en: [1.26, 1.49, 1.65, 1.78, 1.77] },
      steer: { pdr: [100, 98.44, null, 82.64, null], lat: [544, 1031, null, 1278, null], en: [2.98, 3.21, null, 3.87, null] }
    };
    const M = {
      pdr: [T("Packet delivery ratio (%)", "Paket iletim oranı (%)"), 0, 100],
      lat: [T("End-to-end delay (ms)", "Uçtan uca gecikme (ms)"), 0, 3500],
      en: [T("Energy consumption (mWh)", "Enerji tüketimi (mWh)"), 0, 6]
    };
    const N = {
      pdr: T("Delivery drops with network size for every antenna, but directional antennas stay ahead; the steerable antenna keeps 82.6% at 81 nodes where omni falls to 57.1%.",
        "Ağ büyüdükçe tüm antenlerde iletim oranı düşer, ancak yönlü antenler önde kalır; 81 düğümde döner yönlü anten %82,6 iletirken tüm yönlü anten %57,1'e iner."),
      lat: T("Switched beams roughly halve the delay of small networks (1267 → 595 ms at 25 nodes); the steerable antenna has the lowest delay at 81 nodes.",
        "Anahtarlanabilir huzme küçük ağlarda gecikmeyi yaklaşık yarıya indirir (25 düğümde 1267 → 595 ms); 81 düğümde en düşük gecikme döner yönlü antende."),
      en: T("Switched beams save the most energy, since transmit power is modelled proportional to beamwidth. The steerable antenna spends as much as an omni radio and pays for duplicated broadcasts.",
        "En çok enerjiyi anahtarlanabilir huzme kazandırır, çünkü gönderim gücü huzme genişliğiyle orantılı modellenmiştir. Döner yönlü anten tüm yönlü radyo kadar güç harcar ve çoğaltılan tümegönderimlerin bedelini öder.")
    };
    PV.seg($("th-res-m"), function (k) {
      const W = 720, H = 270, L = 60, R = 640, Tp = 10, B = 236;
      const c = PV.svg(host, W, H, M[k][0]);
      const gg = c.svg, x = PV.linear(20, 106, L, R), y = PV.linear(M[k][1], M[k][2], B, Tp);
      for (let i = 0; i <= 5; i++) {
        const v = M[k][1] + (M[k][2] - M[k][1]) * i / 5;
        PV.el(gg, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
        PV.el(gg, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, num(v, k === "en" ? 1 : 0));
      }
      X.forEach(function (v) { PV.el(gg, "text", { x: x(v), y: B + 16, "text-anchor": "middle", class: "tk" }, v); });
      PV.el(gg, "text", { x: (L + R) / 2, y: H - 2, "text-anchor": "middle", class: "tk" }, T("number of nodes", "düğüm sayısı"));
      const labs = [];
      Object.keys(D).forEach(function (m) {
        const pts = X.map(function (v, i) { return [v, D[m][k][i]]; }).filter(function (p) { return p[1] !== null; });
        PV.el(gg, "path", { d: pts.map(function (p, i) { return (i ? "L" : "M") + x(p[0]) + " " + y(p[1]); }).join(" "), fill: "none", stroke: COL[m], "stroke-width": 2.5 });
        pts.forEach(function (p) {
          PV.el(gg, "circle", { cx: x(p[0]), cy: y(p[1]), r: 4.5, fill: COL[m], stroke: "var(--ds-bg)", "stroke-width": 1.5 });
          const hit = PV.el(gg, "circle", { cx: x(p[0]), cy: y(p[1]), r: 10, class: "hit", "aria-label": NAME[m] + " " + p[0] });
          PV.hover(c, hit, "<b>" + NAME[m] + "</b><br>" + p[0] + T(" nodes", " düğüm") + "<br>" + M[k][0] + ": " + num(p[1], k === "lat" ? 0 : 2));
        });
        const last = pts[pts.length - 1];
        labs.push({ m: m, x: x(last[0]) + 8, y: y(last[1]) + 4 });
      });
      /* keep end labels at least 13 px apart */
      labs.sort(function (a, b) { return a.y - b.y; });
      labs.forEach(function (l, i) { if (i && l.x === labs[i - 1].x && l.y - labs[i - 1].y < 13) l.y = labs[i - 1].y + 13; });
      labs.forEach(function (l) { PV.el(gg, "text", { x: l.x, y: l.y, class: "tk", style: "fill:" + COL[l.m] }, NAME[l.m]); });
      $("th-res-note").textContent = N[k];
    });
  })();

  /* ---------- 5. autonomous cells, Eq. (5)-(7) ---------- */
  (function hash() {
    const io = $("th-hash-o");
    if (!io) return;
    const ik = $("th-hash-k"), out = $("th-hash-out");
    let L = 4;
    const LOTO = 251;
    function cell(o, k) { return { tx: ((k + 1) * 7 + (o + 1) * 13) % LOTO, rx: ((o + 1) * 7 + (k + 1) * 13) % LOTO, ch: (o + k) % L }; }
    function draw() {
      const o = Math.max(1, Math.min(250, Math.round(+io.value || 1))), k = Math.max(1, Math.min(250, Math.round(+ik.value || 2)));
      const a = cell(o, k), b = cell(k, o);
      out.innerHTML =
        "<tr><th></th><th class='num'>TX</th><th class='num'>RX</th><th class='num'>" + T("channel", "kanal") + "</th></tr>" +
        "<tr><td>" + o + " → " + k + "</td><td class='num'><b>" + a.tx + "</b></td><td class='num'>" + a.rx + "</td><td class='num'>" + a.ch + "</td></tr>" +
        "<tr><td>" + k + " → " + o + "</td><td class='num'>" + b.tx + "</td><td class='num'><b>" + b.rx + "</b></td><td class='num'>" + b.ch + "</td></tr>";
      $("th-hash-note").innerHTML = (o !== k && a.tx === b.rx && a.rx === b.tx ?
        T("One node's TX slot is the other's RX slot on the same channel: no 6P negotiation needed. ",
          "Bir düğümün TX dilimi diğerinin aynı kanaldaki RX dilimidir: 6P anlaşması gerekmez. ") : "") +
        (o === k ? T("Pick two different IDs.", "İki farklı kimlik seçin.") :
          a.tx === a.rx ? T("Here TX and RX fall into the same slot: a collision the hash cannot avoid.", "Burada TX ve RX aynı dilime düşüyor: karmanın önleyemediği bir çakışma.") :
            T("Slotframe of ", "Özerk çerçeve ") + LOTO + T(" slots, ", " dilim, ") + L + T(" hopping channels.", " atlama kanalı."));
    }
    PV.seg($("th-hash-l"), function (v) { L = +v; draw(); });
    [io, ik].forEach(function (e) { e.addEventListener("input", draw); });
  })();

  /* grouped bars helper */
  function bars(host, groups, series, vals, label, unit, max) {
    const W = 720, H = 200, L = 60, R = 700, Tp = 10, B = 162;
    const c = PV.svg(host, W, H, label);
    const gg = c.svg, y = PV.linear(0, max, B, Tp), gw = (R - L) / groups.length, bw = Math.min(34, (gw - 24) / series.length);
    for (let i = 0; i <= 4; i++) {
      const v = max * i / 4;
      PV.el(gg, "line", { x1: L, x2: R, y1: y(v), y2: y(v), class: "gl" });
      PV.el(gg, "text", { x: L - 8, y: y(v) + 4, "text-anchor": "end", class: "tk" }, num(v));
    }
    groups.forEach(function (gn, i) {
      const x0 = L + gw * i + (gw - bw * series.length) / 2;
      PV.el(gg, "text", { x: L + gw * i + gw / 2, y: B + 18, "text-anchor": "middle", class: "tt" }, gn);
      series.forEach(function (s, j) {
        const v = vals[i][j];
        PV.vbar(gg, x0 + j * bw, B, bw - 3, B - y(v), "mk", s.col);
        PV.el(gg, "text", { x: x0 + j * bw + (bw - 3) / 2, y: y(v) - 4, "text-anchor": "middle", class: "vl", style: "font-size:10.5px" }, num(v));
        const hit = PV.el(gg, "rect", { x: x0 + j * bw, y: Tp, width: bw - 3, height: B - Tp, class: "hit", "aria-label": s.n + " " + gn });
        PV.hover(c, hit, "<b>" + s.n + "</b><br>" + gn + "<br>" + num(v) + " " + unit);
      });
    });
  }

  /* ---------- 6. Table 5: schedule length of the centralized scheduler ---------- */
  (function table5() {
    const host = $("th-t5");
    if (!host) return;
    const D = { 30: [[173, 131], [94, 80], [89, 80]], 40: [[146, 113], [80, 80], [80, 80]] };
    const S = [{ n: NAME.omni, col: COL.omni }, { n: NAME.steer, col: COL.steer }];
    PV.seg($("th-t5-d"), function (v) {
      bars(host, [1, 2, 3].map(function (c) { return c + T(" channel", " kanal") + (c > 1 && !TR ? "s" : ""); }), S, D[v],
        T("Schedule length by antenna and number of channels", "Anten ve kanal sayısına göre çizelge uzunluğu"), T("slots", "dilim"), 180);
      $("th-t5-note").textContent = v === "30" ?
        T("81-node grid, data packets only. With nodes 30 m apart (more neighbours, more interference) and a single channel, the steerable antenna needs 131 slots instead of 173 (−24%).",
          "81 düğümlü ızgara, yalnızca veri paketleri. Düğümler 30 m aralıklıyken (daha çok komşu, daha çok girişim) ve tek kanalda döner yönlü anten 173 yerine 131 dilim kullanır (−%24).") :
        T("81-node grid, data packets only. At 40 m spacing: 113 instead of 146 slots with one channel (−23%). From two channels on, both reach 80 slots: frequency diversity is then enough.",
          "81 düğümlü ızgara, yalnızca veri paketleri. 40 m aralıkta tek kanalda 146 yerine 113 dilim (−%23). İki kanaldan itibaren ikisi de 80 dilime iner: frekans çeşitliliği artık yeterlidir.");
    });
  })();

  /* ---------- 7. Table 7: end-to-end delay of centralized and distributed scheduling ---------- */
  (function table7() {
    const host = $("th-t7");
    if (!host) return;
    const S = [
      { n: T("Centralized · omni", "Merkezi · tüm yönlü"), col: "var(--pv-base)" },
      { n: T("Centralized · steerable", "Merkezi · döner yönlü"), col: "var(--pv-s2)" },
      { n: T("Distributed · omni", "Dağıtık · tüm yönlü"), col: "#9a9890" },
      { n: T("Distributed · steerable", "Dağıtık · döner yönlü"), col: "#f0a07e" }
    ];
    const V = [[957, 1460, 1778, 2129], [1452, 1922, 2347, 2652], [2336, 2444, 3056, 2984]];
    bars(host, [25, 35, 49].map(function (v) { return v + T(" nodes", " düğüm"); }), S, V, T("End-to-end delay (ms)", "Uçtan uca gecikme (ms)"), "ms", 3200);
  })();

  const t = $("th-rel");
  if (t) PV.sortable(t);
})();
