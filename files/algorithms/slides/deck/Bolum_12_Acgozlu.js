/* Bölüm 12: Açgözlü para üstü ile dinamik programlama (en iyi) karşılaştırması */
(function () {
  document.querySelectorAll('.ds-deck [data-demo="a12-coin"]').forEach(function (demo) {
    var view = demo.querySelector(".a12-lab__view");
    var status = demo.querySelector(".a12-lab__status");
    var coinsIn = demo.querySelector(".a12-lab__coins");
    var amtIn = demo.querySelector(".a12-lab__amt");

    function parse() {
      var parts = coinsIn.value.split(/[\s,;]+/).filter(function (s) { return s.length; });
      var set = {};
      for (var i = 0; i < parts.length; i++) {
        if (!/^\d+$/.test(parts[i])) return null;
        var v = parseInt(parts[i], 10);
        if (v < 1 || v > 999) return null;
        set[v] = true;
      }
      var coins = Object.keys(set).map(Number).sort(function (a, b) { return b - a; });
      if (!coins.length || coins.length > 8) return null;
      return coins;
    }

    function greedy(coins, t) {
      var out = [];
      coins.forEach(function (p) { while (t >= p) { t -= p; out.push(p); } });
      return { list: out, rest: t };
    }

    function best(coins, t) {
      var INF = 1e9, dp = [0], from = [0];
      for (var x = 1; x <= t; x++) {
        dp[x] = INF; from[x] = 0;
        coins.forEach(function (p) {
          if (p <= x && dp[x - p] + 1 < dp[x]) { dp[x] = dp[x - p] + 1; from[x] = p; }
        });
      }
      if (dp[t] >= INF) return null;
      var out = [];
      while (t > 0) { out.push(from[t]); t -= from[t]; }
      out.sort(function (a, b) { return b - a; });
      return out;
    }

    function box(title, list, extra, cls) {
      var h = '<div class="a12-lab__box ' + cls + '"><h3>' + title + '</h3><div class="a12-lab__coinrow">';
      var shown = list.slice(0, 24);
      shown.forEach(function (c) { h += '<span class="a12-lab__coin">' + c + '</span>'; });
      if (list.length > shown.length) h += '<span class="a12-lab__coin">+' + (list.length - shown.length) + '</span>';
      h += '</div><p class="a12-lab__n">' + extra + '</p></div>';
      return h;
    }

    function run() {
      var coins = parse();
      var t = parseInt(amtIn.value, 10);
      if (!coins) { status.innerHTML = "Paralar: virgülle ayrılmış 1–999 arası tam sayılar (en fazla 8 tür)."; return; }
      if (!(t >= 1 && t <= 999)) { status.innerHTML = "Tutar 1 ile 999 arasında olmalı."; return; }
      var g = greedy(coins, t), b = best(coins, t);
      var gtxt = g.rest ? "<b>" + g.rest + "</b> ödenemedi (çözüm yok)" : "<b>" + g.list.length + "</b> para";
      var btxt = b ? "<b>" + b.length + "</b> para" : "tutar bu paralarla ödenemez";
      var ok = b && !g.rest && g.list.length === b.length;
      view.innerHTML = box("Açgözlü", g.list, gtxt, ok ? "a12-win" : "a12-lose") + box("En iyi (DP)", b || [], btxt, "a12-win");
      if (!b) status.innerHTML = "Bu para kümesiyle " + t + " tutarı hiç ödenemez (1 yok).";
      else if (ok) status.innerHTML = "Açgözlü sonuç <b>en iyi</b>: " + t + " = " + g.list.join(" + ") + ".";
      else status.innerHTML = "Açgözlü <b>en iyi değil</b>: " + (g.rest ? "takıldı" : g.list.length + " para") + ", en iyi " + b.length + " para (" + b.join(" + ") + ").";
    }

    demo.addEventListener("click", function (e) {
      var op = e.target && e.target.getAttribute && e.target.getAttribute("data-op");
      if (!op) return;
      if (op === "tr") { coinsIn.value = "1, 5, 10, 25, 50, 100"; amtIn.value = "68"; }
      if (op === "bad") { coinsIn.value = "1, 7, 10"; amtIn.value = "14"; }
      run();
    });
    [coinsIn, amtIn].forEach(function (el) {
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); run(); }
        e.stopPropagation();
      });
    });
    run();
  });
})();
