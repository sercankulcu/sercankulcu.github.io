/* Bölüm 13: N vezir geri dönüşlü arama deneme alanı */
(function () {
  document.querySelectorAll('.ds-deck [data-demo="a13-vezir"]').forEach(function (demo) {
    var view = demo.querySelector(".a13-lab__view");
    var status = demo.querySelector(".a13-lab__status");
    var sel = demo.querySelector(".a13-lab__n");
    var playBtn = demo.querySelector('[data-op="play"]');
    var QUEEN = "♛";
    /* Türkçe ek uyumu: 0..9 için bulunma (-de), ayrılma (-den) ve yönelme (-e) ekleri */
    var EK_DE = ["'da", "'de", "'de", "'te", "'te", "'te", "'da", "'de", "'de", "'da"];
    var EK_E = ["'a", "'e", "'ye", "'e", "'e", "'e", "'ya", "'ye", "'e", "'a"];
    function ekDe(k) { return k + (EK_DE[k % 10] || "'de"); }
    function ekDen(k) { return k + (EK_DE[k % 10] || "'de").replace(/^'(.)(.)$/, "'$1$2n"); }
    function ekE(k) { return k + (EK_E[k % 10] || "'e"); }
    var n, col, r, c, places, backs, sols, last, after, done, timer = null;

    function reset() {
      stop();
      n = parseInt(sel.value, 10) || 6;
      col = [];
      for (var i = 0; i < n; i++) col.push(-1);
      r = 0; c = 0; places = 0; backs = 0; sols = 0; last = null; after = false; done = false;
      render("Boş tahta (n = " + n + "). Vezirler satır satır yerleştirilir; her satırda sütunlar soldan sağa denenir.");
    }

    function safe(row, cc) {
      for (var i = 0; i < row; i++) {
        if (col[i] === cc || Math.abs(col[i] - cc) === row - i) return false;
      }
      return true;
    }

    function backtrack() {
      r--;
      var old = col[r];
      col[r] = -1;
      c = old + 1;
      backs++;
      last = null;
      return "Geri dön: satır " + r + " sütun " + old + " kaldırıldı; satır " + r + " için sütun " + ekDen(c) + " devam.";
    }

    /* one search step; returns {msg, kind} */
    function step() {
      if (done) return { msg: "Arama bitti: toplam " + sols + " çözüm.", kind: "end" };
      if (after) {
        after = false;
        return { msg: backtrack(), kind: "back" };
      }
      if (r === n) {
        sols++;
        after = true;
        return { msg: "Çözüm " + sols + " bulundu: [" + col.join(", ") + "].", kind: "sol" };
      }
      if (c >= n) {
        if (r === 0) {
          done = true;
          last = null;
          return { msg: "Satır 0'da denenecek sütun kalmadı: arama bitti, toplam " + sols + " çözüm.", kind: "end" };
        }
        return { msg: "Satır " + ekDe(r) + " güvenli sütun kalmadı → " + backtrack(), kind: "back" };
      }
      var ok = safe(r, c);
      last = { r: r, c: c, ok: ok };
      var m;
      if (ok) {
        col[r] = c;
        places++;
        m = "(" + r + ", " + c + ") güvenli → vezir yerleştirildi, satır " + ekE(r + 1) + " inilir.";
        r++;
        c = 0;
      } else {
        m = "(" + r + ", " + c + ") tehdit altında → sonraki sütun.";
        c++;
      }
      return { msg: m, kind: "try" };
    }

    function render(msg, solved) {
      var s = 40, out = [], i, j;
      var W = n * s + 4;
      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          var att = false;
          for (var q = 0; q < n; q++) {
            if (col[q] < 0 || q === i) continue;
            if (col[q] === j || Math.abs(col[q] - j) === Math.abs(q - i)) att = true;
          }
          if (col[i] === j) att = false;
          var cls = att ? "a13-att" : ((i + j) % 2 === 0 ? "a13-sqL" : "a13-sqD");
          out.push('<rect class="' + cls + '" x="' + (2 + j * s) + '" y="' + (2 + i * s) + '" width="' + s + '" height="' + s + '"/>');
        }
      }
      out.push('<rect class="a13-frame" x="2" y="2" width="' + (n * s) + '" height="' + (n * s) + '"/>');
      if (last) {
        out.push('<rect class="' + (last.ok ? "a13-curok" : "a13-curc") + '" x="' + (2 + last.c * s + 2) + '" y="' + (2 + last.r * s + 2) + '" width="' + (s - 4) + '" height="' + (s - 4) + '"/>');
      }
      for (i = 0; i < n; i++) {
        if (col[i] < 0) continue;
        out.push('<text class="' + (solved ? "a13-qok" : "a13-q") + '" x="' + (2 + col[i] * s + s / 2) + '" y="' + (2 + i * s + s / 2 + 10) + '" text-anchor="middle" style="font-size:29px">' + QUEEN + "</text>");
      }
      view.innerHTML = '<svg class="ds-svg" viewBox="0 0 ' + W + " " + W + '" role="img" aria-label="' + n + ' vezir tahtası">' + out.join("") + "</svg>";
      status.textContent = msg + "  ·  yerleştirme: " + places + ", geri dönüş: " + backs + ", çözüm: " + sols;
    }

    function doStep() {
      var e = step();
      render(e.msg, e.kind === "sol");
      return e;
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      if (playBtn) playBtn.textContent = "oynat";
    }

    demo.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-op]");
      if (!b) return;
      var op = b.getAttribute("data-op");
      if (op === "step") { stop(); doStep(); }
      else if (op === "reset") reset();
      else if (op === "play") {
        if (timer) { stop(); return; }
        playBtn.textContent = "durdur";
        timer = setInterval(function () {
          var e = doStep();
          if (e.kind === "sol" || e.kind === "end") stop();
        }, 380);
      } else if (op === "next") {
        stop();
        var e, k = 0;
        do { e = step(); k++; } while (e.kind !== "sol" && e.kind !== "end" && k < 500000);
        render(e.msg, e.kind === "sol");
      }
    });
    sel.addEventListener("change", reset);
    reset();
  });
})();
