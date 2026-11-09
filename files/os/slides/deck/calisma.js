/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* Çalışma soruları: çoktan seçmeli şıklar ve puan sayacı */
(function () {
  /* yalnızca sercankulcu.github.io adresinde (ve yerel önizlemede) çalışır (© Sercan Külcü) */
  if (["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) < 0) return;
  var boxes = Array.prototype.slice.call(document.querySelectorAll(".dsq-mc"));
  if (!boxes.length) return;

  /* ---------- sayaç: yalnızca çoktan seçmeliler (.dsq-mc) sayılır ---------- */
  var css = document.createElement("style");
  css.textContent =
    ".dsq-score{display:flex;align-items:center;gap:6px;flex:none;color:var(--ds-text,inherit);font-size:13px;white-space:nowrap}" +
    ".dsq-score__txt{font-variant-numeric:tabular-nums}" +
    ".dsq-score__txt b{color:var(--ds-good,inherit)}" +
    ".dsq-score .dsq-score__reset{min-width:0;height:28px;padding:0 10px;font-size:13px}" +
    ".dsq-score--page{justify-content:center;margin:8px 0 0}" +
    ".ds-deck__bar:has(.dsq-score) .ds-deck__select{width:150px}" +
    ".ds-deck.is-fluid .ds-deck__bar:has(.dsq-score){flex-wrap:wrap;height:auto;min-height:48px;padding:6px 14px;row-gap:6px}" +
    ".ds-deck.is-fluid .ds-deck__bar .dsq-score{order:10;flex-basis:100%;justify-content:center}" +
    "@media print{.dsq-score{display:none}}";
  document.head.appendChild(css);

  var score = document.createElement("div");
  score.className = "dsq-score";
  score.innerHTML = '<span class="dsq-score__txt" aria-live="polite" aria-atomic="true"></span>' +
    '<button type="button" class="ds-deck__button dsq-score__reset" title="Çoktan seçmeli soruları baştan başlat">Sıfırla</button>';
  var txt = score.querySelector(".dsq-score__txt");
  var bar = document.querySelector(".ds-deck__bar");
  var full = document.getElementById("ds-deck-full");
  if (bar && full && full.parentNode === bar) bar.insertBefore(score, full);
  else if (bar) bar.appendChild(score);
  else {
    /* sunum çubuğu yoksa sayfada, soruların altında küçük bir satır */
    score.classList.add("dsq-score--page");
    var host = document.getElementById("ds-deck") || boxes[boxes.length - 1];
    host.parentNode.insertBefore(score, host.nextSibling);
  }

  function update() {
    var answered = 0, right = 0;
    boxes.forEach(function (box) {
      if (!box.classList.contains("is-done")) return;
      answered++;
      if (!box.querySelector(".dsq-opt.is-wrong")) right++;
    });
    txt.innerHTML = "Doğru <b>" + right + "</b> / Yanıtlanan " + answered + " · Toplam " + boxes.length;
    txt.setAttribute("aria-label", "Doğru " + right + ", yanıtlanan " + answered + ", toplam " + boxes.length + " çoktan seçmeli soru");
  }

  score.querySelector(".dsq-score__reset").addEventListener("click", function () {
    boxes.forEach(function (box) {
      box.classList.remove("is-done");
      box.querySelectorAll(".dsq-opt").forEach(function (o) {
        o.classList.remove("is-right", "is-wrong");
        o.disabled = false;
      });
    });
    update();
  });

  /* ---------- şıklar ---------- */
  boxes.forEach(function (box) {
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".dsq-opt");
      if (!b || box.classList.contains("is-done")) return;
      box.querySelectorAll(".dsq-opt").forEach(function (o) {
        if (o.hasAttribute("data-ok")) o.classList.add("is-right");
        o.disabled = true;
      });
      if (!b.hasAttribute("data-ok")) b.classList.add("is-wrong");
      box.classList.add("is-done");
      update();
    });
  });
  update();
})();
