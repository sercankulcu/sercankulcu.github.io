/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* Veri Yapıları simülatörleri: 800x600 sahneyi ekrana sığdırma ve tam ekran */
(function () {
  /* yalnızca sercankulcu.github.io adresinde (ve yerel önizlemede) çalışır (© Sercan Külcü) */
  if (["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) < 0) return;
  const root = document.getElementById("ds-sim");
  const screen = document.getElementById("ds-sim-screen");
  const stage = document.getElementById("ds-sim-stage");
  const full = document.getElementById("ds-sim-full");
  if (!root || !screen || !stage) return;
  if (!root.getAttribute("lang")) root.setAttribute("lang", "tr");
  const W = 800, H = 600;

  /* sahne hem genişliğe hem görünen yüksekliğe sığar: sayfayı kaydırmak gerekmez */
  function fit() {
    const isFull = document.fullscreenElement === screen;
    const width = isFull ? window.innerWidth : root.clientWidth;
    let height = window.innerHeight;
    if (!isFull) {
      const top = root.getBoundingClientRect().top + window.scrollY;
      height = window.innerHeight - Math.min(top, window.innerHeight * 0.35) - 12;
    }
    const scale = Math.max(0.3, Math.min(width / W, height / H));
    const x = (width - W * scale) / 2;
    const y = isFull ? (window.innerHeight - H * scale) / 2 : 0;
    stage.style.transform = "translate(" + x + "px," + y + "px) scale(" + scale + ")";
    screen.style.height = isFull ? "" : (H * scale) + "px";
    root.style.setProperty("--ds-sim-scale", scale);
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (screen.requestFullscreen) screen.requestFullscreen();
  }

  if (full) full.addEventListener("click", toggleFullscreen);
  document.addEventListener("keydown", function (e) {
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "f" || e.key === "F") toggleFullscreen();
  });

  if (window.ResizeObserver) new ResizeObserver(fit).observe(root);
  window.addEventListener("resize", fit);
  document.addEventListener("fullscreenchange", fit);
  fit();

  /* ölçeklenmiş sahnede fare konumunu 800x600 koordinatlarına çevirir:
     DsSim.point(event, element) → {x, y} (öğenin ölçeklenmemiş piksel koordinatları) */
  window.DsSim = {
    scale: function () {
      const r = stage.getBoundingClientRect();
      return r.width / W || 1;
    },
    point: function (event, el) {
      const r = el.getBoundingClientRect();
      const s = r.width / (el.offsetWidth || r.width) || 1;
      const src = event.touches && event.touches[0] ? event.touches[0] : event;
      return { x: (src.clientX - r.left) / s, y: (src.clientY - r.top) / s };
    }
  };
})();
