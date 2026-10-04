/* Bölüm 1: Giriş - büyüme hesaplayıcı (işlem sayısı ve tahmini süre) */
(function () {
  document.querySelectorAll('.ds-deck [data-demo="a011-growth"]').forEach(function (demo) {
    var input = demo.querySelector(".a011-lab__n");
    var tbody = demo.querySelector(".a011-lab__table tbody");
    var status = demo.querySelector(".a011-lab__status");
    var SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
    var LN10 = Math.log(10);
    /* her fonksiyon işlem sayısının log10 değerini döndürür */
    function lgFact(n) {
      if (n < 2) return 0;
      if (n < 171) { var s = 0; for (var k = 2; k <= n; k++) s += Math.log10(k); return s; }
      return (n * Math.log(n) - n + 0.5 * Math.log(2 * Math.PI * n)) / LN10;
    }
    var FUNCS = [
      ["1", function () { return 0; }],
      ["log₂ n", function (n) { return n > 1 ? Math.log10(Math.log2(n)) : -Infinity; }],
      ["√n", function (n) { return 0.5 * Math.log10(n); }],
      ["n", function (n) { return Math.log10(n); }],
      ["n log₂ n", function (n) { return n > 1 ? Math.log10(n) + Math.log10(Math.log2(n)) : -Infinity; }],
      ["n²", function (n) { return 2 * Math.log10(n); }],
      ["n³", function (n) { return 3 * Math.log10(n); }],
      ["2ⁿ", function (n) { return n * Math.log10(2); }],
      ["n!", function (n) { return lgFact(n); }]
    ];
    function sup(e) { return String(e).split("").map(function (c) { return c === "-" ? "⁻" : SUP.charAt(+c); }).join(""); }
    function fmtCount(lg) {
      if (lg === -Infinity) return "0";
      if (lg < 7) {
        var v = Math.pow(10, lg);
        if (Math.abs(v - Math.round(v)) < 1e-6) return Math.round(v).toLocaleString("tr-TR");
        return v.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
      }
      var e = Math.floor(lg), m = Math.pow(10, lg - e);
      return m.toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " · 10" + sup(e);
    }
    function fmtTime(lg) {
      if (lg === -Infinity) return "0";
      var sec = lg - 9;
      if (sec > 12) return "≈ 10" + sup(Math.floor(sec - Math.log10(31536000))) + " yıl";
      var s = Math.pow(10, sec);
      var units = [[31536000, "yıl"], [86400, "gün"], [3600, "sa"], [60, "dk"], [1, "s"], [1e-3, "ms"], [1e-6, "µs"], [1e-9, "ns"]];
      for (var i = 0; i < units.length; i++) {
        if (s >= units[i][0] || i === units.length - 1) {
          return (s / units[i][0]).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " " + units[i][1];
        }
      }
      return "";
    }
    function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
    function render() {
      var n = Math.floor(Number(input.value));
      if (!isFinite(n) || n < 1) { status.innerHTML = "n en az 1 olmalıdır."; return; }
      if (n > 1e9) { n = 1e9; input.value = n; }
      var rows = [];
      FUNCS.forEach(function (f) {
        var lg = f[1](n);
        var w = lg === -Infinity ? 0 : Math.max(2, Math.min(120, (lg + 1) * 8));
        var over = lg - 9 > Math.log10(3600);
        rows.push("<tr><td><strong>" + f[0] + "</strong></td><td class=\"num\">" + fmtCount(lg) + "</td><td class=\"num\">" + fmtTime(lg) +
          "</td><td><span class=\"a011-lab__bar" + (over ? " is-over" : "") + "\" style=\"width:" + w + "px\"></span></td></tr>");
      });
      tbody.innerHTML = rows.join("");
      status.innerHTML = "n = <b>" + esc(n.toLocaleString("tr-TR")) + "</b> · çubuk: işlem sayısının basamak sayısı (log ölçek) · kırmızı: 1 saatten uzun";
    }
    input.addEventListener("input", render);
    demo.querySelectorAll("[data-n]").forEach(function (b) {
      b.addEventListener("click", function () { input.value = b.getAttribute("data-n"); render(); });
    });
    demo.querySelectorAll("[data-x]").forEach(function (b) {
      b.addEventListener("click", function () { input.value = Math.min(1e9, Math.floor(Number(input.value) || 1) * 2); render(); });
    });
    input.addEventListener("keydown", function (e) { e.stopPropagation(); });
    render();
  });
})();
