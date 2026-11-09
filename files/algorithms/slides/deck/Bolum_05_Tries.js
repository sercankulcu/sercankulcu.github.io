/* Bölüm 5: Trie deneme alanı (ekle, ara, önek / tamamla, sil) */
(function () {
  document.querySelectorAll('.ds-deck [data-demo="a053-trie"]').forEach(function (demo) {
    var view = demo.querySelector(".a053-lab__view");
    var status = demo.querySelector(".a053-lab__status");
    var input = demo.querySelector(".a053-lab__word");
    var MAXW = 14, MAXL = 10;
    var root;

    function mk() { return { kids: {}, end: false }; }
    function reset() { root = mk(); }
    function where(k) { return k ? "\"" + esc(k) + "\" düğümünde" : "kökte"; }
    function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

    function words(n, pre, acc) {
      if (n.end) acc.push(pre);
      Object.keys(n.kids).sort().forEach(function (c) { words(n.kids[c], pre + c, acc); });
      return acc;
    }
    function count(n) {
      var s = 1;
      Object.keys(n.kids).forEach(function (c) { s += count(n.kids[c]); });
      return s;
    }

    /* hl: {key: "cur"|"path"}; miss: key of a missing node to draw dashed (its parent must exist) */
    function render(hl, miss) {
      hl = hl || {};
      var nodes = [], slot = 0, dx = 40, dy = 44, r = 13;
      function lay(n, key, ch, depth) {
        var rec = { key: key, ch: ch, depth: depth, end: n.end, kids: [], ghost: false };
        var ks = Object.keys(n.kids).sort();
        var missHere = miss && miss.length === key.length + 1 && miss.slice(0, key.length) === key;
        if (missHere) {
          var ins = ks.concat([miss.charAt(key.length)]).sort();
          ks = ins;
        }
        ks.forEach(function (c) {
          if (n.kids[c]) rec.kids.push(lay(n.kids[c], key + c, c, depth + 1));
          else rec.kids.push({ key: key + c, ch: c, depth: depth + 1, end: false, kids: [], ghost: true, x: dx * slot++ });
        });
        if (!rec.kids.length) rec.x = dx * slot++;
        else rec.x = (rec.kids[0].x + rec.kids[rec.kids.length - 1].x) / 2;
        nodes.push(rec);
        return rec;
      }
      var top = lay(root, "", "", 0);
      var maxd = 0, minx = Infinity, maxx = -Infinity;
      function each(n, f) { f(n); n.kids.forEach(function (k) { each(k, f); }); }
      each(top, function (n) { maxd = Math.max(maxd, n.depth); minx = Math.min(minx, n.x); maxx = Math.max(maxx, n.x); });
      var off = 40 - minx, W = Math.max(300, maxx - minx + 110), H = 16 + maxd * dy + r + 26;
      var out = [];
      each(top, function (n) {
        var x = n.x + off, y = 16 + n.depth * dy;
        n.kids.forEach(function (k) {
          var cls = k.ghost ? "a053-dash" : "line" + ((hl[k.key]) ? " a053-eh" : "");
          out.push('<path class="' + cls + '" d="M' + x + " " + (y + (n.depth ? r : 13)) + " L" + (k.x + off) + " " + (16 + k.depth * dy - r) + '"/>');
        });
      });
      each(top, function (n) {
        var x = n.x + off, y = 16 + n.depth * dy;
        if (!n.depth) {
          out.push('<rect class="' + (hl[""] === "cur" ? "a053-cur" : hl[""] ? "a053-path" : "box") + '" x="' + (x - 30) + '" y="' + (y - 13) + '" width="60" height="26" rx="13"/>');
          out.push('<text class="txt a053-rt" x="' + x + '" y="' + (y + 5) + '" text-anchor="middle">kök</text>');
          return;
        }
        if (n.ghost) {
          out.push('<circle class="a053-miss" cx="' + x + '" cy="' + y + '" r="' + r + '"/>');
          out.push('<text class="txt a053-misst" x="' + x + '" y="' + (y + 5) + '" text-anchor="middle">' + n.ch + "</text>");
          return;
        }
        if (n.end) out.push('<circle class="a053-ring" cx="' + x + '" cy="' + y + '" r="' + (r + 4) + '"/>');
        var c = hl[n.key] === "cur" ? "a053-cur" : hl[n.key] ? "a053-path" : "box";
        out.push('<circle class="' + c + '" cx="' + x + '" cy="' + y + '" r="' + r + '"/>');
        out.push('<text class="txt" x="' + x + '" y="' + (y + 5) + '" text-anchor="middle">' + n.ch + "</text>");
      });
      var n = words(root, "", []).length;
      view.innerHTML = '<svg class="ds-svg" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Trie: ' + n + ' kelime">' + out.join("") + "</svg>";
    }

    function read() {
      var w = (input.value || "").trim().toLowerCase();
      if (!/^[a-z]+$/.test(w) || w.length > MAXL) {
        status.innerHTML = "Yalnızca a–z harflerinden oluşan, en fazla " + MAXL + " harflik bir kelime girin.";
        return null;
      }
      return w;
    }
    function pathHl(w, upto) {
      var hl = { "": "path" };
      for (var i = 1; i <= upto; i++) hl[w.slice(0, i)] = "path";
      hl[w.slice(0, upto)] = "cur";
      return hl;
    }
    /* walk: returns depth reached (number of chars matched) and node */
    function walk(w) {
      var n = root, i = 0;
      while (i < w.length && n.kids[w.charAt(i)]) { n = n.kids[w.charAt(i)]; i++; }
      return { n: n, d: i };
    }
    function ins(w, quiet) {
      var n = root, made = 0;
      var ex = walk(w);
      if (words(root, "", []).length >= MAXW && !(ex.d === w.length && ex.n.end)) {
        if (!quiet) status.innerHTML = "En fazla " + MAXW + " kelime: önce bir kelime silin ya da sıfırlayın.";
        return;
      }
      for (var i = 0; i < w.length; i++) {
        var c = w.charAt(i);
        if (!n.kids[c]) { n.kids[c] = mk(); made++; }
        n = n.kids[c];
      }
      var was = n.end;
      n.end = true;
      if (!quiet) {
        render(pathHl(w, w.length));
        status.innerHTML = "ekle(\"" + esc(w) + "\"): " + (was ? "kelime zaten vardı, değişiklik yok." :
          made + " yeni düğüm, " + (w.length - made) + " düğüm paylaşıldı. Toplam " + count(root) + " düğüm (kök dahil).");
      }
    }
    function find(w) {
      var r = walk(w);
      if (r.d < w.length) {
        render(pathHl(w, r.d), w.slice(0, r.d + 1));
        status.innerHTML = "ara(\"" + esc(w) + "\") → <b>false</b>: " + where(w.slice(0, r.d)) + " '" + w.charAt(r.d) + "' dalı yok (" + (r.d + 1) + ". karakter).";
        return;
      }
      render(pathHl(w, w.length));
      status.innerHTML = "ara(\"" + esc(w) + "\") → <b>" + r.n.end + "</b>" + (r.n.end ? ": yol tamam, kelimeSonu = true." : ": yol var ama kelimeSonu = false (yalnızca önek).");
    }
    function pre(w) {
      var r = walk(w);
      if (r.d < w.length) {
        render(pathHl(w, r.d), w.slice(0, r.d + 1));
        status.innerHTML = "onekVarMi(\"" + esc(w) + "\") → <b>false</b>: tamamlanacak kelime yok.";
        return;
      }
      var hl = pathHl(w, w.length), list = words(r.n, w, []);
      render(hl);
      status.innerHTML = "onekVarMi(\"" + esc(w) + "\") → <b>true</b> · tamamla → [" + list.map(esc).join(", ") + "]";
    }
    function del(w) {
      var removed = 0, found = false;
      function rec(n, j) {
        if (j === w.length) {
          if (!n.end) return false;
          found = true;
          n.end = false;
          return Object.keys(n.kids).length === 0;
        }
        var c = w.charAt(j), k = n.kids[c];
        if (!k) return false;
        if (rec(k, j + 1)) { delete n.kids[c]; removed++; return !n.end && Object.keys(n.kids).length === 0; }
        return false;
      }
      rec(root, 0);
      var r = walk(w);
      render(pathHl(w, r.d));
      status.innerHTML = "sil(\"" + esc(w) + "\"): " + (!found ? "kelime trie'de yok, değişiklik yok." :
        removed ? removed + " düğüm silindi; " + where(w.slice(0, r.d)) + " durdu." : "yalnızca kelimeSonu işareti kaldırıldı (düğümün çocuğu var).");
    }
    function sample() {
      reset();
      ["and", "ant", "dad", "do"].forEach(function (w) { ins(w, true); });
      render({});
      status.innerHTML = "Örnek trie: and, ant, dad, do (" + count(root) + " düğüm, kök dahil). Bir kelime yazıp bir işlem seçin.";
    }

    demo.addEventListener("click", function (e) {
      var op = e.target && e.target.getAttribute && e.target.getAttribute("data-op");
      if (!op) return;
      if (op === "reset") { reset(); render({}); status.innerHTML = "Trie boşaltıldı: yalnızca kök."; return; }
      if (op === "demo") { sample(); return; }
      var w = read();
      if (w === null) return;
      if (op === "ins") ins(w);
      else if (op === "find") find(w);
      else if (op === "pre") pre(w);
      else if (op === "del") del(w);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); var w = read(); if (w !== null) ins(w); }
      e.stopPropagation();
    });
    sample();
  });
})();
