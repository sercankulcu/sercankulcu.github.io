/* Bölüm 9: açık adresleme deneme alanı */
(function () {
  document.querySelectorAll('[data-demo="b09-probe"]').forEach(function (demo) {
    var N = 11, DEL = {};
    var box = demo.querySelector(".b09-lab__cells");
    var status = demo.querySelector(".b09-lab__status");
    var modeSel = demo.querySelector(".b09-lab__mode");
    var keyIn = demo.querySelector(".b09-lab__key");
    var table, n;
    function de(j) {
      var ek = ["da", "de", "de", "te", "te", "te", "da", "de", "de", "da", "da"];
      return j + "'" + (j < ek.length ? ek[j] : "de");
    }
    function h2(k) { return 7 - (k % 7); }
    function probe(k, i) {
      var h = k % N, m = modeSel.value;
      if (m === "lin") return (h + i) % N;
      if (m === "quad") return (h + i * i) % N;
      return (h + i * h2(k)) % N;
    }
    function render(probes, hot) {
      box.innerHTML = "";
      var marks = {};
      (probes || []).forEach(function (p, idx) { if (!(p in marks)) marks[p] = "i=" + idx; });
      for (var j = 0; j < N; j++) {
        var c = document.createElement("div");
        var v = table[j];
        c.className = "b09-lab__cell" + (v === null ? " is-empty" : "") + (v === DEL ? " is-del" : "") +
          (j === hot ? " is-hot" : (j in marks && v !== null ? " is-probe" : ""));
        c.innerHTML = "<span>" + j + "</span><span>" + (v === null ? "" : v === DEL ? "✗" : v) + "</span><span>" + (marks[j] || "") + "</span>";
        box.appendChild(c);
      }
    }
    function lam() { return " · λ = " + n + "/" + N + " = " + (n / N).toFixed(2).replace(".", ","); }
    function head(k) {
      var s = "h(" + k + ") = " + k + " mod " + N + " = <b>" + (k % N) + "</b>";
      if (modeSel.value === "dbl") s += ", h₂ = 7 − " + (k % 7) + " = " + h2(k);
      return s;
    }
    /* returns {found: idx or -1, avail: first free/DEL idx or -1, seq: [...]} */
    function search(k) {
      var avail = -1, seq = [];
      for (var i = 0; i < N; i++) {
        var j = probe(k, i);
        seq.push(j);
        var v = table[j];
        if (v === null || v === DEL) {
          if (avail < 0) avail = j;
          if (v === null) return { found: -1, avail: avail, seq: seq };
        } else if (v === k) return { found: j, avail: avail, seq: seq };
      }
      return { found: -1, avail: avail, seq: seq };
    }
    function readKey() {
      var k = parseInt(keyIn.value, 10);
      if (!(k >= 0 && k <= 999)) { status.innerHTML = "0 ile 999 arasında bir tam sayı girin."; return null; }
      return k;
    }
    function insert(k, quiet) {
      var r = search(k);
      if (r.found >= 0) { if (!quiet) { render(r.seq, r.found); status.innerHTML = head(k) + " → " + k + " zaten yuva " + de(r.found) + " (güncelleme)."; } return; }
      if (r.avail < 0) { if (!quiet) { render(r.seq, -1); status.innerHTML = head(k) + " → denenen: " + r.seq.join(", ") + " → <b>boş yuva bulunamadı!</b>" + (modeSel.value === "quad" ? " (karesel yoklama her yuvayı denemez)" : " (tablo dolu)"); } return; }
      table[r.avail] = k; n++;
      if (!quiet) {
        render(r.seq, r.avail);
        status.innerHTML = head(k) + " → denenen: " + r.seq.join(", ") + " → <b>yuva " + r.avail + "</b> (" + r.seq.length + " yoklama)" + lam();
      }
    }
    function reset() { table = []; for (var j = 0; j < N; j++) table.push(null); n = 0; }
    demo.addEventListener("click", function (e) {
      var op = e.target.dataset && e.target.dataset.op;
      if (!op) return;
      if (op === "reset") { reset(); render(); status.innerHTML = "Tablo boş" + lam(); return; }
      if (op === "demo") {
        reset();
        [18, 41, 22, 44, 59, 32].forEach(function (k) { insert(k, true); });
        render(); status.innerHTML = "18, 41, 22, 44, 59, 32 eklendi (" + modeSel.options[modeSel.selectedIndex].text + ")" + lam(); return;
      }
      var k = readKey();
      if (k === null) return;
      if (op === "ins") insert(k);
      else {
        var r = search(k);
        if (r.found < 0) { render(r.seq, -1); status.innerHTML = head(k) + " → denenen: " + r.seq.join(", ") + " → <b>bulunamadı</b>"; return; }
        if (op === "get") { render(r.seq, r.found); status.innerHTML = head(k) + " → denenen: " + r.seq.join(", ") + " → <b>yuva " + de(r.found) + " bulundu</b>"; }
        else { table[r.found] = DEL; n--; render(r.seq, r.found); status.innerHTML = head(k) + " → yuva " + r.found + " <b>silindi (✗)</b>: arama zinciri kopmasın diye boşaltılmaz" + lam(); }
      }
    });
    keyIn.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); var k = readKey(); if (k !== null) insert(k); } });
    modeSel.addEventListener("change", function () { reset(); render(); status.innerHTML = "Yöntem değişti, tablo sıfırlandı" + lam(); });
    reset(); render();
    status.innerHTML = "Bir anahtar girip <b>ekle</b>'ye basın ya da <b>örnek doldur</b> ile başlayın.";
  });
})();
