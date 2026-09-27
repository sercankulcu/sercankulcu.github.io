(function () {
  document.querySelectorAll('[data-demo="b03-list"]').forEach(function (demo) {
    var box = demo.querySelector(".b03-list");
    var status = demo.querySelector(".ds-deck__status");
    var tail = demo.querySelector('[data-op="tail"]');
    var MAX = 6, list, hot, hotLbl;
    function reset() { list = [7, 2, 9]; hot = -1; hotLbl = ""; }
    function rnd() { return 1 + Math.floor(Math.random() * 99); }
    function render() {
      var n = list.length, step = 108, x0 = 20, y = 58, W = 700;
      var s = '<svg class="ds-svg" viewBox="0 0 ' + W + ' 150" role="img" aria-label="Bağlı liste: ' +
        (n ? list.join(", ") : "boş") + '"><defs><marker id="b03-ah-demo" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="ah" d="M0 0 L10 5 L0 10z"/></marker></defs>';
      function lbl(name, cx, top, isHot) {
        var ty = top ? y - 30 : y + 72, a = top ? (y - 24) + " V" + (y - 3) : (y + 56) + " V" + (y + 37);
        if (isHot) s += '<rect x="' + (cx - name.length * 4.5 - 6) + '" y="' + (ty - 15.5) + '" width="' + (name.length * 9 + 12) + '" height="21" rx="5" style="fill:var(--ds-hot)"/>';
        s += '<text class="txt" x="' + cx + '" y="' + ty + '" text-anchor="middle">' + name + '</text>';
        s += '<path class="line" d="M' + cx + ' ' + a + '" marker-end="url(#b03-ah-demo)"/>';
      }
      if (!n) {
        s += '<text class="lbl" x="350" y="' + (y + 22) + '" text-anchor="middle">null</text>';
        lbl("bas", 350, true, false);
      }
      for (var i = 0; i < n; i++) {
        var x = x0 + i * step;
        s += '<rect class="box" x="' + x + '" y="' + y + '" width="46" height="34"' + (i === hot ? ' style="fill:var(--ds-hot)"' : '') + '/>';
        s += '<rect class="box-empty" x="' + (x + 46) + '" y="' + y + '" width="26" height="34"/>';
        s += '<text class="txt" x="' + (x + 23) + '" y="' + (y + 22) + '" text-anchor="middle">' + list[i] + '</text>';
        var sx = x + 59, ex = (i < n - 1) ? x + step - 2 : x + 106;
        s += '<circle class="ah" cx="' + sx + '" cy="' + (y + 17) + '" r="3"/>';
        s += '<path class="line" d="M' + sx + ' ' + (y + 17) + ' H' + ex + '" marker-end="url(#b03-ah-demo)"/>';
        if (i === n - 1) s += '<text class="lbl" x="' + (x + 110) + '" y="' + (y + 22) + '">null</text>';
      }
      if (n) {
        lbl("bas", x0 + 23, true, hotLbl === "bas");
        if (tail.checked) lbl("son", x0 + (n - 1) * step + 23, false, hotLbl === "son");
      }
      box.innerHTML = s + "</svg>";
    }
    function act(op) {
      var v, n = list.length;
      hot = -1; hotLbl = "";
      if (op === "reset") { reset(); status.innerHTML = "Liste: 7 → 2 → 9"; }
      else if (op === "basaEkle" || op === "sonaEkle") {
        if (n >= MAX) { status.innerHTML = "Demo için en fazla " + MAX + " düğüm."; render(); return; }
        v = rnd();
        if (op === "basaEkle") {
          list.unshift(v); hot = 0; hotLbl = "bas";
          status.innerHTML = "<b>basaEkle(" + v + ")</b>: yeni düğüm eski başı gösterir, bas = yeni. <b>O(1)</b>";
        } else {
          list.push(v); hot = list.length - 1; hotLbl = "son";
          status.innerHTML = tail.checked ? "<b>sonaEkle(" + v + ")</b>: son.sonraki = yeni; son = yeni. Gezinme yok: <b>O(1)</b>"
            : "<b>sonaEkle(" + v + ")</b>: sona ulaşmak için " + Math.max(n, 0) + " düğüm gezildi: <b>O(n)</b>";
        }
      } else if (!n) { status.innerHTML = "Liste boş: silinecek düğüm yok."; }
      else if (op === "bastanSil") {
        v = list.shift(); hotLbl = list.length ? "bas" : "";
        status.innerHTML = "<b>bastanSil()</b>: " + v + " silindi, bas = bas.sonraki. <b>O(1)</b>";
      } else if (op === "sondanSil") {
        v = list.pop(); hotLbl = list.length ? "son" : "";
        status.innerHTML = "<b>sondanSil()</b>: " + v + " silindi. Sondan bir önceki düğüm için " + Math.max(n - 1, 0) + " düğüm gezildi: <b>O(n)</b>" + (tail.checked ? " (son işaretçisi olsa bile)" : "");
      }
      render();
    }
    demo.addEventListener("click", function (e) {
      var op = e.target.dataset && e.target.dataset.op;
      if (op && op !== "tail") act(op);
    });
    tail.addEventListener("change", function () {
      render();
      status.innerHTML = tail.checked ? "son işaretçisi açık: sonaEkle O(1)." : "son işaretçisi kapalı: sonaEkle O(n).";
    });
    reset(); render();
    status.innerHTML = "Butonlarla listeyi değiştirin; maliyetler durum satırında.";
  });
})();
