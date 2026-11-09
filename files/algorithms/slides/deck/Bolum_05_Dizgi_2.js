/* Bölüm 5 (2): düzenli ifade sınayıcı */
(function () {
  document.querySelectorAll('.ds-deck [data-demo="a052-regex"]').forEach(function (demo) {
    var pat = demo.querySelector(".a052-lab__pat");
    var text = demo.querySelector(".a052-lab__text");
    var ci = demo.querySelector(".a052-lab__ci");
    var view = demo.querySelector(".a052-lab__view");
    var status = demo.querySelector(".a052-lab__status");
    var MAXM = 200;

    function esc(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function run() {
      var re;
      var src = text.value;
      try {
        re = new RegExp(pat.value, "g" + (ci.checked ? "i" : ""));
      } catch (err) {
        view.innerHTML = esc(src);
        status.textContent = "Geçersiz düzenli ifade: " + err.message;
        return;
      }
      if (pat.value === "") {
        view.innerHTML = esc(src);
        status.textContent = "Bir örüntü yazın.";
        return;
      }
      var out = "", last = 0, n = 0, groups = [], m;
      while ((m = re.exec(src)) !== null && n < MAXM) {
        if (m[0] === "") { re.lastIndex++; continue; }
        out += esc(src.slice(last, m.index)) + '<mark class="a052-m">' + esc(m[0]) + "</mark>";
        last = m.index + m[0].length;
        n++;
        if (m.length > 1 && groups.length < 4) {
          groups.push('"' + m[0] + '" → ' + m.slice(1).map(function (g, i) {
            return "grup " + (i + 1) + ' = "' + (g === undefined ? "" : g) + '"';
          }).join(", "));
        }
      }
      out += esc(src.slice(last));
      view.innerHTML = out + (groups.length ? '<div class="a052-lab__groups">' + esc(groups.join(" · ")) + "</div>" : "");
      status.textContent = n ? n + " eşleşme bulundu." : "Eşleşme yok.";
    }

    pat.addEventListener("input", run);
    text.addEventListener("input", run);
    ci.addEventListener("change", run);
    demo.querySelectorAll("[data-ex]").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-ex");
        pat.value = v.slice(0, v.lastIndexOf("|"));
        text.value = v.slice(v.lastIndexOf("|") + 1);
        run();
      });
    });
    [pat, text].forEach(function (inp) {
      inp.addEventListener("keydown", function (ev) { ev.stopPropagation(); });
    });
    run();
  });
})();
