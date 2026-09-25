/* Veri Yapıları sunumları: gezinme, ölçekleme ve demolar */
(function () {
  const deck = document.getElementById("ds-deck");
  const screen = document.getElementById("ds-deck-screen");
  const stage = document.getElementById("ds-deck-stage");
  const slides = Array.from(stage.querySelectorAll(".ds-deck__slide"));
  const prev = document.getElementById("ds-deck-prev");
  const next = document.getElementById("ds-deck-next");
  const counter = document.getElementById("ds-deck-counter");
  const progress = document.getElementById("ds-deck-progress");
  const jump = document.getElementById("ds-deck-jump");
  const full = document.getElementById("ds-deck-full");
  const sectionLabel = document.getElementById("ds-deck-section");
  const W = 800, H = 600, FLUID_BELOW = 560;
  let current = 0;

  /* ---------- scaling ---------- */
  function fit() {
    const isFull = document.fullscreenElement === screen;
    const width = isFull ? window.innerWidth : deck.clientWidth;
    const fluid = !isFull && width < FLUID_BELOW;
    deck.classList.toggle("is-fluid", fluid);
    if (fluid) {
      screen.style.height = "";
      stage.style.transform = "";
      return;
    }
    const height = isFull ? window.innerHeight : Infinity;
    const scale = Math.min(width / W, height / H);
    const x = isFull ? (width - W * scale) / 2 : 0;
    const y = isFull ? (height - H * scale) / 2 : 0;
    stage.style.transform = "translate(" + x + "px," + y + "px) scale(" + scale + ")";
    screen.style.height = isFull ? "" : (H * scale) + "px";
  }

  if (window.ResizeObserver) new ResizeObserver(fit).observe(deck);
  window.addEventListener("resize", fit);
  document.addEventListener("fullscreenchange", fit);

  /* ---------- navigation ---------- */
  slides.forEach(function (slide, i) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = (i + 1) + ". " + (slide.dataset.title || "");
    jump.appendChild(option);
  });

  /* ---------- steps (animation builds inside a slide) ----------
     <div class="ds-deck__steps" [data-mode="build"]>
       <div class="ds-deck__step">…</div> …
     </div>
     replace (default): only the current step is visible.
     build: steps up to the current one stay visible (bullet builds). */
  const stepSets = slides.map(function (slide) {
    return Array.from(slide.querySelectorAll(".ds-deck__steps")).map(function (box) {
      const steps = Array.from(box.children).filter(function (c) { return c.classList.contains("ds-deck__step"); });
      const nav = document.createElement("div");
      nav.className = "ds-deck__stepnav";
      nav.innerHTML = '<button type="button" class="ds-deck__button ds-deck__button--sm" data-step="-1" aria-label="Önceki adım">‹</button>' +
        '<span class="ds-deck__stepcount" aria-live="polite"></span>' +
        '<button type="button" class="ds-deck__button ds-deck__button--sm" data-step="1" aria-label="Sonraki adım">›</button>';
      box.appendChild(nav);
      const set = { box: box, steps: steps, nav: nav, index: 0, build: box.dataset.mode === "build" };
      nav.addEventListener("click", function (e) {
        const d = e.target.dataset && e.target.dataset.step;
        if (d) setStep(set, set.index + parseInt(d, 10));
      });
      return set;
    });
  });

  function setStep(set, i) {
    set.index = Math.max(0, Math.min(set.steps.length - 1, i));
    set.steps.forEach(function (st, k) {
      const on = set.build ? k <= set.index : k === set.index;
      st.classList.toggle("is-on", on);
      st.classList.toggle("is-current", k === set.index);
    });
    set.nav.querySelector(".ds-deck__stepcount").textContent = "Adım " + (set.index + 1) + " / " + set.steps.length;
    set.nav.querySelector('[data-step="-1"]').disabled = set.index === 0;
    set.nav.querySelector('[data-step="1"]').disabled = set.index === set.steps.length - 1;
  }

  /* first step set on the slide that still has steps left in the given direction */
  function pendingSet(dir) {
    const sets = stepSets[current];
    if (dir > 0) return sets.find(function (s) { return s.index < s.steps.length - 1; });
    for (let k = sets.length - 1; k >= 0; k--) if (sets[k].index > 0) return sets[k];
    return null;
  }

  function go(dir) {
    const set = pendingSet(dir);
    if (set) setStep(set, set.index + dir);
    else show(current + dir, true, dir < 0);
  }

  function show(index, updateHash, atEnd) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach(function (slide, i) {
      const active = i === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
      slide.inert = !active;
    });
    stepSets[current].forEach(function (set) { setStep(set, atEnd ? set.steps.length - 1 : 0); });
    counter.textContent = (current + 1) + " / " + slides.length;
    progress.style.width = ((current + 1) / slides.length * 100) + "%";
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    jump.value = current;
    sectionLabel.textContent = slides[current].dataset.section || "Sercan KÜLCÜ, Tüm hakları saklıdır.";
    if (updateHash !== false) history.replaceState(null, "", "#" + (current + 1));
  }

  function fromHash() {
    const n = parseInt(location.hash.slice(1), 10);
    return Number.isFinite(n) ? n - 1 : 0;
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (screen.requestFullscreen) screen.requestFullscreen();
  }

  prev.addEventListener("click", function () { go(-1); });
  next.addEventListener("click", function () { go(1); });
  jump.addEventListener("change", function () { show(parseInt(jump.value, 10)); });
  full.addEventListener("click", toggleFullscreen);
  window.addEventListener("hashchange", function () { show(fromHash(), false); });

  document.addEventListener("keydown", function (event) {
    const tag = (event.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === " " && (tag === "button" || tag === "summary")) return;
    switch (event.key) {
      case "ArrowRight": case "PageDown": case " ":
        event.preventDefault(); go(1); break;
      case "ArrowLeft": case "PageUp":
        event.preventDefault(); go(-1); break;
      case "Home":
        event.preventDefault(); show(0); break;
      case "End":
        event.preventDefault(); show(slides.length - 1); break;
      case "f": case "F":
        toggleFullscreen(); break;
    }
  });

  let touchX = null;
  screen.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  screen.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX = null;
  });

  /* ---------- Big O growth chart ---------- */
  (function drawGrowth() {
    const svg = document.getElementById("ds-growth");
    if (!svg) return;
    const NS = "http://www.w3.org/2000/svg";
    const L = 40, R = 330, T = 12, B = 250, XMAX = 12, YMAX = 60;
    const sx = function (x) { return L + (x / XMAX) * (R - L); };
    const sy = function (y) { return B - (Math.min(y, YMAX) / YMAX) * (B - T); };
    function el(name, attrs, text) {
      const e = document.createElementNS(NS, name);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      if (text) e.textContent = text;
      svg.appendChild(e);
      return e;
    }
    for (let y = 20; y <= YMAX; y += 20) el("path", { class: "grid", d: "M" + L + " " + sy(y) + " H" + R });
    el("path", { class: "axis", d: "M" + L + " " + T + " V" + B + " H" + R });
    el("text", { class: "lbl", x: R - 4, y: B + 20, "text-anchor": "end" }, "girdi boyutu n →");
    el("text", { class: "lbl", x: L - 6, y: T + 4, "text-anchor": "end" }, "iş");
    const series = [
      { f: function () { return 1; }, label: "O(1)", color: "#2a9d8f", dy: 7 },
      { f: function (n) { return Math.log2(n); }, label: "O(log n)", color: "#3b82f6", dy: -5 },
      { f: function (n) { return n; }, label: "O(n)", color: "#8b5cf6" },
      { f: function (n) { return n * Math.log2(n); }, label: "O(n log n)", color: "#e9a23b" },
      { f: function (n) { return n * n; }, label: "O(n²)", color: "#e76f51" },
      { f: function (n) { return Math.pow(2, n); }, label: "O(2ⁿ)", color: "#d62839" }
    ];
    series.forEach(function (s) {
      let d = "", endX = XMAX, endY = s.f(XMAX);
      for (let x = 1; x <= XMAX + 1e-9; x += 0.05) {
        const y = s.f(x);
        d += (d ? " L" : "M") + sx(x).toFixed(1) + " " + sy(y).toFixed(1);
        if (y >= YMAX) { endX = x; endY = YMAX; break; }
      }
      el("path", { class: "curve", d: d, stroke: s.color });
      const lx = endY >= YMAX ? sx(endX) : sx(XMAX) + 6;
      const ly = endY >= YMAX ? T - 2 : sy(endY) + 4 + (s.dy || 0);
      el("text", { class: "lbl", x: lx, y: ly, fill: s.color, style: "font-weight:700;fill:" + s.color, "text-anchor": endY >= YMAX ? "middle" : "start" }, s.label);
    });
  })();

  /* ---------- array demo ---------- */
  stage.querySelectorAll('[data-demo="array"]').forEach(function (demo) {
    const values = [7, 2, 9, 5, 1];
    const row = demo.querySelector(".ds-deck__arr");
    const status = demo.querySelector(".ds-deck__status");
    values.forEach(function (v, i) {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "İndis " + i + ", değer " + v);
      b.innerHTML = "<span>" + i + "</span><span>" + v + "</span>";
      b.addEventListener("click", function () {
        row.querySelectorAll("button").forEach(function (x) { x.classList.toggle("is-hot", x === b); });
        status.innerHTML = "<b>A[" + i + "] = " + v + "</b> · adres = başlangıç + " + i + " × 4 bayt → tek adımda erişim, <b>O(1)</b>";
      });
      row.appendChild(b);
    });
  });

  /* ---------- stack demo ---------- */
  stage.querySelectorAll('[data-demo="stack"]').forEach(function (demo) {
    const box = demo.querySelector(".ds-deck__stackbox");
    const status = demo.querySelector(".ds-deck__status");
    const MAX = 6;
    let items, nextVal;
    function reset() { items = [1, 2, 3, 4]; nextVal = 5; render(null); status.innerHTML = "Üstteki öğe: <b>4</b>"; }
    function render(hot) {
      box.innerHTML = "";
      items.forEach(function (v, i) {
        const d = document.createElement("div");
        d.className = "ds-deck__item" + (i === items.length - 1 && hot ? " is-hot" : "");
        d.textContent = v;
        if (i === items.length - 1) d.dataset.label = "← üst";
        box.appendChild(d);
      });
    }
    demo.addEventListener("click", function (e) {
      const op = e.target.dataset && e.target.dataset.op;
      if (!op) return;
      if (op === "push") {
        if (items.length >= MAX) { status.innerHTML = "Yığın dolu (en fazla " + MAX + " öğe)."; return; }
        items.push(nextVal); render(true);
        status.innerHTML = "<b>push(" + nextVal + ")</b> → en üste eklendi"; nextVal++;
      } else if (op === "pop") {
        if (!items.length) { status.innerHTML = "Yığın boş: pop yapılamaz."; return; }
        const v = items.pop(); render(false);
        status.innerHTML = "<b>pop() → " + v + "</b> · son giren ilk çıktı";
      } else reset();
    });
    reset();
  });

  /* ---------- queue demo ---------- */
  stage.querySelectorAll('[data-demo="queue"]').forEach(function (demo) {
    const box = demo.querySelector(".ds-deck__queuebox");
    const status = demo.querySelector(".ds-deck__status");
    const MAX = 6;
    let items, nextVal;
    function reset() { items = [7, 2, 9, 5]; nextVal = 1; render(-1); status.innerHTML = "Ön: <b>7</b> · Arka: <b>5</b>"; }
    function render(hot) {
      box.innerHTML = "";
      items.forEach(function (v, i) {
        const d = document.createElement("div");
        d.className = "ds-deck__item" + (i === hot ? " is-hot" : "");
        d.textContent = v;
        const labels = [];
        if (i === 0) labels.push("ön");
        if (i === items.length - 1) labels.push("arka");
        if (labels.length) d.dataset.label = labels.join(" / ");
        box.appendChild(d);
      });
    }
    demo.addEventListener("click", function (e) {
      const op = e.target.dataset && e.target.dataset.op;
      if (!op) return;
      if (op === "enqueue") {
        if (items.length >= MAX) { status.innerHTML = "Kuyruk dolu (en fazla " + MAX + " öğe)."; return; }
        items.push(nextVal); render(items.length - 1);
        status.innerHTML = "<b>enqueue(" + nextVal + ")</b> → arkaya eklendi"; nextVal++;
      } else if (op === "dequeue") {
        if (!items.length) { status.innerHTML = "Kuyruk boş: dequeue yapılamaz."; return; }
        const v = items.shift(); render(-1);
        status.innerHTML = "<b>dequeue() → " + v + "</b> · ilk giren ilk çıktı";
      } else reset();
    });
    reset();
  });

  fit();
  show(fromHash(), false);
})();
