/* Bölüm 6: Dinamik Programlama — dizgi DP tablosu demosu (LCS, ortak alt dizgi, düzenleme uzaklığı) */
(function () {
  var roots = document.querySelectorAll('.ds-deck [data-demo="a06-lcs"]');
  Array.prototype.forEach.call(roots, function (root) {
    var view = root.querySelector(".a06-lab__view");
    var status = root.querySelector(".a06-lab__status");
    var inX = root.querySelector('[data-k="x"]');
    var inY = root.querySelector('[data-k="y"]');
    var mode = "lcs";

    function esc(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function compute(x, y, m) {
      var n = y.length, k = x.length, T = [], i, j;
      for (i = 0; i <= n; i++) {
        T.push([]);
        for (j = 0; j <= k; j++) T[i].push(m === "ed" ? (i === 0 ? j : (j === 0 ? i : 0)) : 0);
      }
      var best = 0, bi = 0, bj = 0;
      for (i = 1; i <= n; i++) {
        for (j = 1; j <= k; j++) {
          var eq = y.charAt(i - 1) === x.charAt(j - 1);
          if (m === "lcs") T[i][j] = eq ? T[i - 1][j - 1] + 1 : Math.max(T[i - 1][j], T[i][j - 1]);
          else if (m === "sub") {
            T[i][j] = eq ? T[i - 1][j - 1] + 1 : 0;
            if (T[i][j] > best) { best = T[i][j]; bi = i; bj = j; }
          } else T[i][j] = Math.min(T[i - 1][j] + 1, T[i][j - 1] + 1, T[i - 1][j - 1] + (eq ? 0 : 1));
        }
      }
      var on = {}, res = "", msg;
      if (m === "lcs") {
        i = n; j = k;
        while (i > 0 && j > 0) {
          on[i + "," + j] = true;
          if (y.charAt(i - 1) === x.charAt(j - 1)) { res = y.charAt(i - 1) + res; i--; j--; }
          else if (T[i - 1][j] >= T[i][j - 1]) i--;
          else j--;
        }
        msg = "LCS uzunluğu <b>" + T[n][k] + "</b>: \"" + esc(res) + "\" (son hücre).";
      } else if (m === "sub") {
        for (var t = 0; t < best; t++) on[(bi - t) + "," + (bj - t)] = true;
        res = x.substring(bj - best, bj);
        msg = best ? "En uzun ortak alt dizgi <b>" + best + "</b>: \"" + esc(res) + "\" (tablonun maksimumu)." : "Ortak karakter yok: cevap 0.";
      } else {
        i = n; j = k;
        on[i + "," + j] = true;
        while (i > 0 || j > 0) {
          if (i > 0 && j > 0 && T[i][j] === T[i - 1][j - 1] + (y.charAt(i - 1) === x.charAt(j - 1) ? 0 : 1)) { i--; j--; }
          else if (i > 0 && T[i][j] === T[i - 1][j] + 1) i--;
          else j--;
          on[i + "," + j] = true;
        }
        msg = "Düzenleme uzaklığı (Y → X) <b>" + T[n][k] + "</b>: çapraz adım = eşleşme/değiştirme, aşağı = silme, sağa = ekleme.";
      }
      return { T: T, on: on, msg: msg, best: m === "sub" ? best : -1 };
    }

    function draw() {
      var x = inX.value.trim().slice(0, 9), y = inY.value.trim().slice(0, 7);
      if (!x || !y) { view.innerHTML = ""; status.innerHTML = "İki dizgi de en az bir karakter olmalı."; return; }
      var r = compute(x, y, mode), i, j;
      var h = '<table class="a06-lab__tbl"><tr><th></th><th></th>';
      for (j = 0; j < x.length; j++) h += "<th>" + esc(x.charAt(j)) + "</th>";
      h += "</tr>";
      for (i = 0; i <= y.length; i++) {
        h += "<tr><th>" + (i ? esc(y.charAt(i - 1)) : "") + "</th>";
        for (j = 0; j <= x.length; j++) {
          var cls = r.on[i + "," + j] ? ' class="a06-lab__on"' : (r.best > 0 && r.T[i][j] === r.best ? ' class="a06-lab__max"' : "");
          h += "<td" + cls + ">" + r.T[i][j] + "</td>";
        }
        h += "</tr>";
      }
      view.innerHTML = h + "</table>";
      status.innerHTML = r.msg;
      Array.prototype.forEach.call(root.querySelectorAll("[data-op]"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-op") === mode ? "true" : "false");
      });
    }

    Array.prototype.forEach.call(root.querySelectorAll("[data-op]"), function (b) {
      b.addEventListener("click", function () { mode = b.getAttribute("data-op"); draw(); });
    });
    [inX, inY].forEach(function (inp) {
      inp.addEventListener("input", draw);
      inp.addEventListener("keydown", function (e) { e.stopPropagation(); });
    });
    draw();
  });
})();
