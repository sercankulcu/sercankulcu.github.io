/* Çalışma soruları: çoktan seçmeli şıklar */
(function () {
  document.querySelectorAll(".dsq-mc").forEach(function (box) {
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".dsq-opt");
      if (!b || box.classList.contains("is-done")) return;
      box.querySelectorAll(".dsq-opt").forEach(function (o) {
        if (o.hasAttribute("data-ok")) o.classList.add("is-right");
        o.disabled = true;
      });
      if (!b.hasAttribute("data-ok")) b.classList.add("is-wrong");
      box.classList.add("is-done");
    });
  });
})();
