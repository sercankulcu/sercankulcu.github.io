/* Bölüm 4.1: BFS / DFS deneme alanı (adım adım gezinme) */
(function () {
  document.querySelectorAll('.ds-deck [data-demo="a041-gez"]').forEach(function (demo) {
    var view = demo.querySelector(".a041-lab__view");
    var status = demo.querySelector(".a041-lab__status");
    var sel = demo.querySelector(".a041-lab__start");
    var NAMES = ["A", "B", "C", "D", "E", "F", "G", "H"];
    var POS = [[40, 120], [125, 45], [125, 195], [215, 45], [215, 120], [215, 195], [305, 80], [385, 150]];
    var EDGES = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [5, 7], [6, 7]];
    var adj = NAMES.map(function () { return []; });
    EDGES.forEach(function (e) { adj[e[0]].push(e[1]); adj[e[1]].push(e[0]); });
    adj.forEach(function (l) { l.sort(function (a, b) { return a - b; }); });
    var st = null;

    NAMES.forEach(function (n, i) {
      var o = document.createElement("option");
      o.value = i; o.textContent = n; sel.appendChild(o);
    });

    function start(kind) {
      var s = +sel.value;
      st = { kind: kind, seen: {}, done: {}, order: [], box: [s], cur: -1, tree: {}, msg: "" };
      if (kind === "bfs") st.seen[s] = true;
      st.msg = (kind === "bfs" ? "BFS: " : "DFS: ") + NAMES[s] + (kind === "bfs" ? " işaretlendi ve kuyruğa kondu." : " yığına itildi.");
      render();
    }

    function step() {
      if (!st) { start("bfs"); return false; }
      if (!st.box.length) { st.cur = -1; st.msg = "Bitti. Sıra: " + st.order.map(function (i) { return NAMES[i]; }).join(" "); render(); return false; }
      var v, nw = [];
      if (st.kind === "bfs") {
        v = st.box.shift();
        adj[v].forEach(function (w) {
          if (!st.seen[w]) { st.seen[w] = true; st.box.push(w); st.tree[v + "-" + w] = true; nw.push(NAMES[w]); }
        });
        st.order.push(v); st.done[v] = true; st.cur = v;
        st.msg = "Kuyruktan " + NAMES[v] + " alındı" + (nw.length ? "; " + nw.join(", ") + " kuyruğa eklendi." : "; yeni komşu yok.");
      } else {
        v = st.box.pop();
        if (st.done[v]) { st.cur = v; st.msg = NAMES[v] + " çekildi ama zaten ziyaret edilmiş: atlandı."; render(); return true; }
        st.done[v] = true; st.order.push(v); st.cur = v;
        if (st.from && st.from[v] !== undefined) st.tree[st.from[v] + "-" + v] = true;
        st.from = st.from || {};
        var rev = adj[v].slice().reverse();
        rev.forEach(function (w) {
          if (!st.done[w]) { st.box.push(w); st.seen[w] = true; st.from[w] = v; nw.push(NAMES[w]); }
        });
        st.msg = NAMES[v] + " ziyaret edildi" + (nw.length ? "; " + nw.reverse().join(", ") + " yığına itildi (ters sırada)." : "; itilecek komşu yok.");
      }
      render();
      return true;
    }

    function render() {
      var out = [];
      EDGES.forEach(function (e) {
        var a = POS[e[0]], b = POS[e[1]];
        var t = st && (st.tree[e[0] + "-" + e[1]] || st.tree[e[1] + "-" + e[0]]);
        out.push('<line class="line' + (t ? " a041-tree" : "") + '" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '"/>');
      });
      NAMES.forEach(function (n, i) {
        var cls = "a041-un";
        if (st) {
          if (st.box.indexOf(i) >= 0 || st.seen[i]) cls = "a041-seen";
          if (st.done[i]) cls = "a041-done";
          if (st.cur === i) cls = "a041-cur";
        }
        out.push('<circle class="' + cls + '" cx="' + POS[i][0] + '" cy="' + POS[i][1] + '" r="17"/>');
        out.push('<text class="txt" x="' + POS[i][0] + '" y="' + POS[i][1] + '" text-anchor="middle" dominant-baseline="central">' + n + "</text>");
      });
      view.innerHTML = '<svg class="ds-svg" viewBox="0 0 425 240" role="img" aria-label="Sekiz düğümlü yönsüz çizge">' + out.join("") + "</svg>";
      if (!st) { status.innerHTML = "Bir başlangıç düğümü seçip <b>BFS</b> ya da <b>DFS</b>'e basın, sonra <b>adım</b> ile ilerleyin."; return; }
      var boxName = st.kind === "bfs" ? "Kuyruk (ön → arka)" : "Yığın (alt → üst)";
      status.innerHTML = st.msg + "<br><b>" + boxName + ":</b> [" + st.box.map(function (i) { return NAMES[i]; }).join(", ") +
        "] · <b>Sıra:</b> " + (st.order.map(function (i) { return NAMES[i]; }).join(" ") || "—");
    }

    demo.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-op]");
      if (!b) return;
      var op = b.getAttribute("data-op");
      if (op === "bfs" || op === "dfs") start(op);
      else if (op === "step") step();
      else if (op === "all") { var k = 0; while (step() && k < 100) k++; }
      else if (op === "reset") { st = null; render(); }
    });
    sel.addEventListener("change", function () { st = null; render(); });
    render();
  });
})();
