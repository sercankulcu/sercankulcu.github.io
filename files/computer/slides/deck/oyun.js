/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* Algoritmik Oyun Kuramı oyunları: 800×600 sahneyi ölçekler, ? düğmesiyle açıklama penceresini açar. */
(function () {
  var stages = Array.prototype.slice.call(document.querySelectorAll(".agt-oyun--stage"));
  var W = 800, H = 600;

  stages.forEach(function (stage) {
    var frame = document.createElement("div");
    frame.className = "agt-oyun-frame";
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
    var head = stage.querySelector(".agt-oyun__head");
    if (head && frame.requestFullscreen) {
      var full = document.createElement("button");
      full.type = "button";
      full.className = "agt-oyun__full";
      full.textContent = "⛶";
      var help = head.querySelector(".agt-oyun__help");
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

  /* <button class="agt-oyun__help" aria-controls="dialog-id">?</button> */
  document.querySelectorAll(".agt-oyun__help").forEach(function (btn) {
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
      if (outside || e.target.closest(".agt-oyun__close")) { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
    });
  });
})();
