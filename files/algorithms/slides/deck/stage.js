/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* Algoritmalar simülatörleri: 800×600 sahneyi ölçekler, ? düğmesiyle açıklama penceresini açar. */
(function () {
  var stages = Array.prototype.slice.call(document.querySelectorAll(".algo-stage--stage"));
  var W = 800, H = 600;
  /* kaydırma çubuğunun yeri sabit: çubuk açılıp kapanınca genişlik ve ölçek salınmasın */
  if (stages.length) document.documentElement.style.scrollbarGutter = "stable";

  stages.forEach(function (stage) {
    var frame = document.createElement("div");
    frame.className = "algo-stage-frame";
    stage.parentNode.insertBefore(frame, stage);
    frame.appendChild(stage);
    function isFull() { return document.fullscreenElement === frame; }
    function fit() {
      if (isFull()) {
        /* tam ekran: sahne pencereye sığacak kadar büyür ve ortalanır */
        var s = Math.min(window.innerWidth / W, window.innerHeight / H);
        var x = (window.innerWidth - W * s) / 2, y = (window.innerHeight - H * s) / 2;
        stage.style.transform = "translate(" + x + "px," + y + "px) scale(" + s + ")";
        frame.style.height = "";
        return;
      }
      var scale = Math.min(1, frame.clientWidth / W);
      stage.style.transform = scale < 1 ? "scale(" + scale + ")" : "";
      frame.style.height = (H * scale) + "px";
    }
    if (window.ResizeObserver) new ResizeObserver(fit).observe(frame);
    window.addEventListener("resize", fit);

    /* ⛶ düğmesi: sahneyi tam ekrana alır (Esc ya da düğmeyle çıkılır) */
    var head = stage.querySelector(".algo-stage__head");
    if (head && frame.requestFullscreen) {
      var full = document.createElement("button");
      full.type = "button";
      full.className = "algo-stage__full";
      full.textContent = "⛶";
      var help = head.querySelector(".algo-stage__help");
      head.insertBefore(full, help || null);
      var label = function () {
        var t = isFull() ? "Tam ekrandan çık" : "Tam ekran";
        full.setAttribute("aria-label", t);
        full.title = t;
        full.setAttribute("aria-pressed", String(isFull()));
      };
      full.addEventListener("click", function () {
        if (isFull()) document.exitFullscreen();
        else frame.requestFullscreen().catch(function () {});
      });
      document.addEventListener("fullscreenchange", function () { label(); fit(); });
      label();
    }
    fit();
  });

  /* <button class="algo-stage__help" aria-controls="dialog-id">?</button> */
  document.querySelectorAll(".algo-stage__help").forEach(function (btn) {
    var dlg = document.getElementById(btn.getAttribute("aria-controls"));
    if (!dlg) return;
    btn.setAttribute("aria-haspopup", "dialog");
    if (!btn.getAttribute("aria-label")) btn.setAttribute("aria-label", "Açıklama ve kurallar");
    /* dialog sahnenin dışında, belgenin kökünde dursun: ölçeklenmesin */
    document.body.appendChild(dlg);
    btn.addEventListener("click", function () {
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    });
    dlg.addEventListener("click", function (e) {
      var r = dlg.getBoundingClientRect();
      var outside = e.target === dlg && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom);
      if (outside || e.target.closest(".algo-stage__close")) { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
    });
  });
})();
