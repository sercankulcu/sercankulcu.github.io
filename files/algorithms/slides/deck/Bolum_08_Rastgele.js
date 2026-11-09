/* Bölüm 8: Monte Carlo ile π tahmini deneme alanı */
(function () {
  document.querySelectorAll('.ds-deck [data-demo="a08-pi"]').forEach(function (demo) {
    var view = demo.querySelector(".a08-lab__view");
    var status = demo.querySelector(".a08-lab__status");
    var NS = "http://www.w3.org/2000/svg";
    var SZ = 280, O = 10, MAXDRAW = 3000;
    var n = 0, inside = 0, drawn = 0;
    var svg, dots;

    function el(name, attrs) {
      var e = document.createElementNS(NS, name);
      Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
      return e;
    }
    function build() {
      view.innerHTML = "";
      svg = el("svg", { "class": "ds-svg", viewBox: "0 0 " + (SZ + 2 * O) + " " + (SZ + 2 * O), role: "img", "aria-label": "Birim kare ve çeyrek daire içinde rastgele noktalar" });
      svg.appendChild(el("rect", { "class": "box-empty", x: O, y: O, width: SZ, height: SZ }));
      svg.appendChild(el("path", { "class": "a08-arcq", d: "M" + O + " " + O + " A" + SZ + " " + SZ + " 0 0 1 " + (O + SZ) + " " + (O + SZ) }));
      dots = el("g", {});
      svg.appendChild(dots);
      view.appendChild(svg);
    }
    function fmt(x, d) { return x.toFixed(d).replace(".", ","); }
    function set(k, v) { demo.querySelector('[data-k="' + k + '"]').textContent = v; }
    function show() {
      set("n", String(n));
      set("in", String(inside));
      if (n) {
        var est = 4 * inside / n;
        set("pi", fmt(est, 4));
        set("err", fmt(Math.abs(est - Math.PI), 4));
        set("sd", fmt(1.642 / Math.sqrt(n), 4));
        status.innerHTML = "π ≈ 4 · " + inside + " / " + n + " = <b>" + fmt(est, 4) + "</b>" + (drawn >= MAXDRAW ? " (çizim 3000 noktada durdu)" : "");
      } else {
        set("pi", "—"); set("err", "—"); set("sd", "—");
        status.textContent = "Nokta eklemek için bir düğmeye basın.";
      }
    }
    function add(k) {
      var frag = document.createDocumentFragment();
      for (var t = 0; t < k; t++) {
        var x = Math.random(), y = Math.random();
        var inn = x * x + y * y <= 1;
        n++;
        if (inn) inside++;
        if (drawn < MAXDRAW) {
          frag.appendChild(el("circle", { "class": inn ? "a08-in" : "a08-out", cx: (O + x * SZ).toFixed(1), cy: (O + SZ - y * SZ).toFixed(1), r: 2.2 }));
          drawn++;
        }
      }
      dots.appendChild(frag);
      show();
    }
    function reset() { n = 0; inside = 0; drawn = 0; build(); show(); }

    demo.querySelectorAll("button[data-n]").forEach(function (b) {
      b.addEventListener("click", function () { add(parseInt(b.getAttribute("data-n"), 10)); });
    });
    demo.querySelector('button[data-op="reset"]').addEventListener("click", reset);
    reset();
  });
})();
