/* Copyright (c) Sercan Külcü. All rights reserved. */
/* Publication presentations: small SVG chart helpers, tooltips, segmented controls and sortable tables.
   Load before the paper script and deck.js so every widget is drawn before the deck measures slide heights. */
window.PV = (function () {
  const NS = "http://www.w3.org/2000/svg";

  function el(parent, name, attrs, text) {
    const e = document.createElementNS(NS, name);
    for (const k in attrs) if (attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }

  /* fresh <svg> inside a .pv-chart host; returns { svg, tip, host } */
  function svg(host, w, h, label) {
    host.innerHTML = "";
    const s = el(host, "svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": label || "" });
    const tip = document.createElement("div");
    tip.className = "pv-tip";
    host.appendChild(tip);
    return { svg: s, tip: tip, host: host };
  }

  /* show the tooltip next to the pointer (or the mark's centre when focused by keyboard) */
  function showTip(c, html, evt, mark) {
    c.tip.innerHTML = html;
    c.tip.classList.add("is-on");
    const hb = c.host.getBoundingClientRect();
    let x, y;
    if (evt && evt.clientX !== undefined && evt.type !== "focus") { x = evt.clientX - hb.left; y = evt.clientY - hb.top; }
    else { const mb = mark.getBoundingClientRect(); x = mb.left + mb.width / 2 - hb.left; y = mb.top - hb.top; }
    /* the stage is CSS-scaled: convert screen px back to layout px */
    const k = c.host.offsetWidth / (hb.width || 1);
    x *= k; y *= k;
    const tw = c.tip.offsetWidth, th = c.tip.offsetHeight;
    let left = x + 12, top = y - th - 10;
    if (left + tw > c.host.offsetWidth) left = Math.max(0, x - tw - 12);
    if (top < 0) top = y + 14;
    c.tip.style.left = left + "px";
    c.tip.style.top = top + "px";
  }
  function hideTip(c) { c.tip.classList.remove("is-on"); }

  /* hover + keyboard tooltip on a mark (hit target may be larger than the mark) */
  function hover(c, target, html, onIn, onOut) {
    target.setAttribute("tabindex", "0");
    target.addEventListener("mousemove", function (e) { showTip(c, html, e, target); });
    target.addEventListener("mouseenter", function () { if (onIn) onIn(); });
    target.addEventListener("focus", function (e) { showTip(c, html, e, target); if (onIn) onIn(); });
    target.addEventListener("mouseleave", function () { hideTip(c); if (onOut) onOut(); });
    target.addEventListener("blur", function () { hideTip(c); if (onOut) onOut(); });
  }

  function linear(d0, d1, r0, r1) {
    const f = function (v) { return r0 + (v - d0) / (d1 - d0) * (r1 - r0); };
    return f;
  }
  function log(d0, d1, r0, r1) {
    const a = Math.log10(d0), b = Math.log10(d1);
    return function (v) { return r0 + (Math.log10(v) - a) / (b - a) * (r1 - r0); };
  }
  function nice(max, n) {
    const raw = max / n, p = Math.pow(10, Math.floor(Math.log10(raw)));
    const m = raw / p, step = (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
    return { step: step, max: Math.ceil(max / step) * step };
  }

  /* bar with 4px rounded data-end, square at the baseline (horizontal: baseline on the left) */
  function hbar(parent, x0, y, w, h, cls, fill) {
    const r = Math.min(4, w, h / 2);
    const d = "M" + x0 + " " + y + " H" + (x0 + w - r) + " Q" + (x0 + w) + " " + y + " " + (x0 + w) + " " + (y + r) +
      " V" + (y + h - r) + " Q" + (x0 + w) + " " + (y + h) + " " + (x0 + w - r) + " " + (y + h) + " H" + x0 + " Z";
    return el(parent, "path", { d: d, class: cls, fill: fill });
  }
  function vbar(parent, x, y0, w, h, cls, fill) {
    const r = Math.min(4, h, w / 2), top = y0 - h;
    const d = "M" + x + " " + y0 + " V" + (top + r) + " Q" + x + " " + top + " " + (x + r) + " " + top +
      " H" + (x + w - r) + " Q" + (x + w) + " " + top + " " + (x + w) + " " + (top + r) + " V" + y0 + " Z";
    return el(parent, "path", { d: d, class: cls, fill: fill });
  }

  /* <div class="pv-seg" data-pv="name"> with <button data-v="…"> children → onChange(value) */
  function seg(root, onChange) {
    const buttons = Array.from(root.querySelectorAll("button"));
    function set(v) {
      buttons.forEach(function (b) {
        const on = b.dataset.v === String(v);
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      onChange(v);
    }
    root.addEventListener("click", function (e) {
      const b = e.target.closest("button");
      if (b && root.contains(b)) set(b.dataset.v);
    });
    const start = buttons.find(function (b) { return b.classList.contains("is-on"); }) || buttons[0];
    set(start.dataset.v);
    return set;
  }

  /* click a <th> to sort; numbers sort numerically, "–" always last */
  function sortable(table) {
    const head = Array.from(table.querySelectorAll("thead th"));
    const body = table.querySelector("tbody");
    head.forEach(function (th, col) {
      th.setAttribute("tabindex", "0");
      th.setAttribute("aria-sort", "none");
      function sortBy() {
        const asc = !th.classList.contains("is-asc") && (th.classList.contains("is-desc") || th.dataset.first === "asc");
        head.forEach(function (h) { h.classList.remove("is-asc", "is-desc"); h.setAttribute("aria-sort", "none"); });
        th.classList.add(asc ? "is-asc" : "is-desc");
        th.setAttribute("aria-sort", asc ? "ascending" : "descending");
        const rows = Array.from(body.rows);
        rows.sort(function (a, b) {
          const x = a.cells[col].textContent.trim(), y = b.cells[col].textContent.trim();
          const nx = parseFloat(x), ny = parseFloat(y);
          const bx = isNaN(nx), by = isNaN(ny);
          if (bx && by) return x.localeCompare(y) * (asc ? 1 : -1);
          if (bx) return 1;
          if (by) return -1;
          return asc ? nx - ny : ny - nx;
        });
        rows.forEach(function (r) { body.appendChild(r); });
      }
      th.addEventListener("click", sortBy);
      th.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); sortBy(); } });
    });
  }

  /* before / after comparison: .pv-wipe holds two stacked images; the top one is clipped at the divider */
  function wipe(box) {
    const top = box.querySelector(".pv-wipe__top"), range = box.querySelector("input"), bar = box.querySelector(".pv-wipe__bar");
    function set(v) {
      top.style.clipPath = "inset(0 0 0 " + v + "%)";
      bar.style.left = v + "%";
      range.value = v;
    }
    function fromPointer(e) {
      const r = box.getBoundingClientRect();
      set(Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100)));
    }
    let drag = false;
    box.addEventListener("pointerdown", function (e) { drag = true; box.setPointerCapture(e.pointerId); fromPointer(e); e.stopPropagation(); });
    box.addEventListener("pointermove", function (e) { if (drag) fromPointer(e); });
    box.addEventListener("pointerup", function () { drag = false; });
    box.addEventListener("touchstart", function (e) { e.stopPropagation(); }, { passive: true });
    box.addEventListener("touchend", function (e) { e.stopPropagation(); });
    range.addEventListener("input", function () { set(+range.value); });
    set(50);
  }
  document.querySelectorAll("#ds-deck .pv-wipe").forEach(wipe);

  function fmt(v, d) { return v === null || v === undefined ? "–" : Number(v).toFixed(d === undefined ? 1 : d); }

  const allowed = ["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) >= 0;

  return { el: el, svg: svg, hover: hover, showTip: showTip, hideTip: hideTip, linear: linear, log: log, nice: nice,
    hbar: hbar, vbar: vbar, seg: seg, sortable: sortable, fmt: fmt, allowed: allowed };
})();
