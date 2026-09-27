  /* ArrayList kapasite demosu: size / capacity, dolunca 1,5 kat büyütme */
  document.querySelectorAll('.ds-deck [data-demo="b06-grow"]').forEach(function (demo) {
    var box = demo.querySelector(".b06-cap");
    var status = demo.querySelector(".ds-deck__status");
    var MAXCAP = 14;
    var items, cap, next, copies, adds;
    function render(hot) {
      box.innerHTML = "";
      for (var i = 0; i < cap; i++) {
        var s = document.createElement("span");
        if (i < items.length) { s.textContent = items[i]; s.className = i === hot ? "is-hot" : "is-full"; }
        else s.className = "is-free";
        box.appendChild(s);
      }
      box.setAttribute("aria-label", "size " + items.length + ", kapasite " + cap);
    }
    function info() { return "size = <b>" + items.length + "</b> · kapasite = <b>" + cap + "</b> · toplam kopya = " + copies + " (" + adds + " eklemede)"; }
    function reset() { items = [1, 2, 3]; cap = 4; next = 4; copies = 0; adds = 0; render(-1); status.innerHTML = info(); }
    demo.addEventListener("click", function (e) {
      var op = e.target.dataset && e.target.dataset.op;
      if (!op) return;
      if (op === "add") {
        var grew = "";
        if (items.length === cap) {
          var ncap = Math.max(cap + (cap >> 1), cap + 1);
          if (ncap > MAXCAP) { status.innerHTML = "Demo sınırı: daha fazla büyütülmüyor. " + info(); return; }
          copies += items.length;
          grew = "Dizi doluydu → kapasite " + cap + " → " + ncap + ", " + items.length + " öğe kopyalandı. ";
          cap = ncap;
        }
        items.push(next++); adds++;
        render(items.length - 1);
        status.innerHTML = grew + info();
      } else if (op === "remove") {
        if (!items.length) { status.innerHTML = "Liste boş."; return; }
        items.pop(); render(-1);
        status.innerHTML = "Son öğe silindi; kapasite küçülmez. " + info();
      } else if (op === "trim") {
        cap = Math.max(items.length, 1); render(-1);
        status.innerHTML = "trimToSize(): kapasite = size. " + info();
      } else reset();
    });
    reset();
  });
