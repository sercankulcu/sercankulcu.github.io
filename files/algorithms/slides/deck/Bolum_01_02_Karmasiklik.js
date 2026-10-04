/* Bölüm 1.2: f1-f6 adım sayacı (Algoritma Karmaşıklığı) */
(function () {
  document.querySelectorAll('.ds-deck [data-demo="a012-say"]').forEach(function (demo) {
    var range = demo.querySelector(".a012-lab__n");
    var out = demo.querySelector(".a012-lab__val");
    var body = demo.querySelector(".a012-lab__tbl tbody");
    var status = demo.querySelector(".a012-lab__status");
    var MIN = 1, MAX = 40;

    /* adım sayıları kodun mantığıyla: f1, f2, f6 için x++; f3, f4 için çağrı; f5 için çağrı + f1 adımları */
    function f2(n) { var s = 0; for (var i = 0; i < n; i++) s += i * i; return s; }
    function f3(n) { return n <= 1 ? 1n : (1n << BigInt(n)) - 1n; }
    function f4(n) { return n <= 1 ? 1 : 1 + 2 * f4(Math.floor(n / 2)); }
    function f5(n) { return n <= 1 ? 1 : 1 + n + 2 * f5(Math.floor(n / 2)); }
    function f6(n) { var x = 0; for (var i = 0; i < n; i = Math.pow(2, i)) x++; return x; }

    var rows = [
      ["f1", "Θ(n)", function (n) { return BigInt(n); }],
      ["f2", "Θ(n³)", function (n) { return BigInt(f2(n)); }],
      ["f3", "Θ(2ⁿ)", f3],
      ["f4", "Θ(n)", function (n) { return BigInt(f4(n)); }],
      ["f5", "Θ(n log n)", function (n) { return BigInt(f5(n)); }],
      ["f6", "Θ(log* n)", function (n) { return BigInt(f6(n)); }]
    ];
    var prev = null;

    function fmt(b) { return b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
    function lg(b) { var s = b.toString(); return (s.length - 1) + Math.log10(Number(s.slice(0, 15)) / Math.pow(10, Math.min(15, s.length) - 1)); }

    function draw() {
      var n = parseInt(range.value, 10);
      out.textContent = n;
      var vals = rows.map(function (r) { return r[2](n); });
      var top = Math.log10(Math.pow(2, MAX)) + 0.5;
      var html = "";
      rows.forEach(function (r, k) {
        var v = vals[k];
        var w = Math.max(1, Math.round(100 * (lg(v) + 0.3) / top));
        html += "<tr><td><code>" + r[0] + "</code> " + r[1] + "</td><td class=\"num\">" + fmt(v) +
          "</td><td><span class=\"a012-lab__bar" + (w > 60 ? " is-big" : "") + "\" style=\"width:" + w + "%\"></span></td></tr>";
      });
      body.innerHTML = html;
      if (prev && prev.n * 2 === n) {
        var r1 = Number(vals[0]) / Number(prev.v[0]);
        var r2 = Number(vals[1]) / Math.max(1, Number(prev.v[1]));
        status.innerHTML = "n iki katına çıktı: f1 × <b>" + r1.toFixed(1) + "</b>, f2 × <b>" + r2.toFixed(1) + "</b>, f3 × <b>" + fmt(vals[2] / (prev.v[2] || 1n)) + "</b>.";
      } else {
        status.innerHTML = "n = <b>" + n + "</b>: f3 tek başına <b>" + fmt(vals[2]) + "</b> çağrı yapar.";
      }
      prev = { n: n, v: vals };
    }

    range.addEventListener("input", draw);
    demo.querySelectorAll("[data-op]").forEach(function (b) {
      b.addEventListener("click", function () {
        var n = parseInt(range.value, 10);
        n = b.dataset.op === "dbl" ? Math.min(MAX, n * 2) : Math.max(MIN, Math.floor(n / 2));
        range.value = n;
        draw();
      });
    });
    draw();
  });
})();
