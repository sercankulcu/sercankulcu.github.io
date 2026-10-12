/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* Algoritmalar simülatörleri: başlığın (h1) yanına ⛶ düğmesi ekler; düğme simülatörün kök kapsayıcısını
   tam ekrana alır (Esc ya da düğmeyle çıkılır). Kullanım: <script src="deck/sim.js"></script> (sayfanın sonunda). */
(function () {
  /* yalnızca sercankulcu.github.io adresinde (ve yerel önizlemede) çalışır (© Sercan Külcü) */
  if (["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) < 0) return;

  function start() {
    var content = document.querySelector(".page__content") || document.body;
    var h1 = content.querySelector("h1");
    if (!h1 || document.querySelector(".alg-sim__full")) return;
    /* kök kapsayıcı: h1'in, içerik bölümünün doğrudan çocuğu olan atası */
    var root = h1;
    while (root.parentElement && root.parentElement !== content) root = root.parentElement;
    if (root === h1 || root.parentElement !== content) return;
    var request = root.requestFullscreen || root.webkitRequestFullscreen;
    var exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (!request || !exit) return; /* tam ekran desteklenmiyorsa düğme hiç eklenmez */

    if (!document.getElementById("alg-sim-style")) {
      var css = document.createElement("style");
      css.id = "alg-sim-style";
      css.textContent =
        ".alg-sim__host{position:relative}" +
        ".alg-sim__title{padding-right:46px}" +
        ".alg-sim__title--center{padding-left:46px}" +
        ".alg-sim button.alg-sim__full{position:absolute;top:.75rem;right:.75rem;z-index:2;display:inline-flex;align-items:center;" +
        "justify-content:center;width:36px;min-width:36px;height:36px;min-height:36px;margin:0;padding:0;" +
        "border:2px solid var(--global-link-color);border-radius:50%;background:var(--global-bg-color);" +
        "color:var(--global-text-color);font:700 19px/1 system-ui,sans-serif;letter-spacing:0;text-transform:none;opacity:1;transform:none;cursor:pointer;box-shadow:none}" +
        ".alg-sim button.alg-sim__full:hover,.alg-sim button.alg-sim__full[aria-pressed=\"true\"]{background:var(--global-link-color);color:var(--global-bg-color)}" +
        ".alg-sim button.alg-sim__full:focus-visible{outline:2px solid var(--global-link-color);outline-offset:2px}" +
        /* tam ekran: tema arka planı, içerik kaydırılabilir, sayfadaki genişliğiyle ortalanır */
        ".alg-sim:fullscreen{box-sizing:border-box;overflow:auto;margin:0;background:var(--global-bg-color);" +
        "color:var(--global-text-color);padding:16px max(16px,calc((100vw - var(--alg-sim-w,1150px)) / 2))}" +
        ".alg-sim:-webkit-full-screen{box-sizing:border-box;overflow:auto;margin:0;background:var(--global-bg-color);" +
        "color:var(--global-text-color);padding:16px max(16px,calc((100vw - var(--alg-sim-w,1150px)) / 2))}" +
        ".alg-sim::backdrop{background:var(--global-bg-color)}";
      document.head.appendChild(css);
    }

    root.classList.add("alg-sim");
    var host = h1.parentElement;
    if (host !== root || getComputedStyle(host).position === "static") host.classList.add("alg-sim__host");
    h1.classList.add("alg-sim__title");
    if (getComputedStyle(h1).textAlign === "center") h1.classList.add("alg-sim__title--center");

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "alg-sim__full";
    btn.textContent = "⛶";
    host.insertBefore(btn, h1.nextSibling);
    /* bazı simülatörler çalışırken kökteki tüm düğmeleri devre dışı bırakır; ⛶ her zaman kullanılabilir kalsın */
    if (window.MutationObserver) {
      new MutationObserver(function () { if (btn.disabled) btn.disabled = false; })
        .observe(btn, { attributes: true, attributeFilter: ["disabled"] });
    }

    function isFull() { return (document.fullscreenElement || document.webkitFullscreenElement) === root; }
    function label() {
      var t = isFull() ? "Tam ekrandan çık" : "Tam ekran";
      btn.setAttribute("aria-label", t);
      btn.title = t;
      btn.setAttribute("aria-pressed", String(isFull()));
    }
    btn.addEventListener("click", function () {
      if (isFull()) { exit.call(document); return; }
      /* tam ekranda içerik, sayfadaki genişliğiyle ortada durur */
      root.style.setProperty("--alg-sim-w", root.getBoundingClientRect().width + "px");
      var r = request.call(root);
      if (r && r.catch) r.catch(function () {});
    });
    function changed() {
      label();
      /* tuval/çizim kullanan simülatörler boyutlarını yeniden hesaplasın */
      window.dispatchEvent(new Event("resize"));
    }
    document.addEventListener("fullscreenchange", changed);
    document.addEventListener("webkitfullscreenchange", changed);
    label();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
