/* Bölüm 3: arama yarışı (doğrusal, ikili, atlayarak, ara değer, üstel) */
(function () {
  document.querySelectorAll('.ds-deck [data-demo="a03-race"]').forEach(function (demo) {
    var view = demo.querySelector(".a03-lab__view");
    var status = demo.querySelector(".a03-lab__status");
    var log = demo.querySelector(".a03-lab__log");
    var input = demo.querySelector(".a03-lab__num");
    var UNI = [3, 8, 15, 21, 27, 34, 40, 46, 52, 59, 65, 71, 78, 84, 90, 97];
    var SKEW = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 500];
    var dizi = UNI.slice();
    var NAMES = { lin: "Doğrusal", bin: "İkili", jmp: "Atlayarak", int: "Ara değer", exp: "Üstel" };

    /* her fonksiyon {r: sonuç indisi, p: yoklanan indisler} döndürür */
    function lin(a, x) {
      var p = [];
      for (var i = 0; i < a.length; i++) { p.push(i); if (a[i] === x) return { r: i, p: p }; }
      return { r: -1, p: p };
    }
    function binR(a, x, bas, son, p) {
      while (bas <= son) {
        var orta = Math.floor((bas + son) / 2);
        p.push(orta);
        if (x < a[orta]) son = orta - 1;
        else if (x > a[orta]) bas = orta + 1;
        else return { r: orta, p: p };
      }
      return { r: -1, p: p };
    }
    function bin(a, x) { return binR(a, x, 0, a.length - 1, []); }
    function jmp(a, x) {
      var n = a.length, blok = Math.floor(Math.sqrt(n)), atlama = blok, konum = 0, p = [];
      while (true) {
        var j = Math.min(atlama, n) - 1;
        p.push(j);
        if (!(a[j] < x)) break;
        konum = atlama; atlama += blok;
        if (konum >= n) return { r: -1, p: p };
      }
      while (true) {
        p.push(konum);
        if (!(a[konum] < x)) break;
        konum++;
        if (konum === Math.min(atlama, n)) return { r: -1, p: p };
      }
      return { r: a[konum] === x ? konum : -1, p: p };
    }
    function itp(a, x) {
      var bas = 0, son = a.length - 1, p = [];
      while (bas <= son && x >= a[bas] && x <= a[son]) {
        if (a[son] === a[bas]) { p.push(bas); return { r: a[bas] === x ? bas : -1, p: p }; }
        var k = bas + Math.floor((x - a[bas]) * (son - bas) / (a[son] - a[bas]));
        p.push(k);
        if (a[k] === x) return { r: k, p: p };
        if (a[k] < x) bas = k + 1; else son = k - 1;
      }
      return { r: -1, p: p };
    }
    function exp(a, x) {
      var n = a.length, p = [0];
      if (a[0] === x) return { r: 0, p: p };
      var k = 1;
      while (k < n) { p.push(k); if (a[k] <= x) k *= 2; else break; }
      return binR(a, x, Math.floor(k / 2), Math.min(k, n - 1), p);
    }
    var F = { lin: lin, bin: bin, jmp: jmp, int: itp, exp: exp };

    function render(res) {
      var cw = 44, out = [], n = dizi.length, order = {};
      if (res) res.p.forEach(function (i, k) { order[i] = (order[i] ? order[i] + "," : "") + (k + 1); });
      for (var i = 0; i < n; i++) {
        var x = 4 + i * cw, cls = "box";
        if (order[i]) cls = "a03-seen";
        if (res && res.r === i) cls = "a03-ok";
        out.push('<text class="a03-ptr" x="' + (x + cw / 2) + '" y="14" text-anchor="middle">' + (order[i] || "") + "</text>");
        out.push('<rect class="' + cls + '" x="' + x + '" y="22" width="' + cw + '" height="34"/>');
        out.push('<text class="txt" x="' + (x + cw / 2) + '" y="44" text-anchor="middle">' + dizi[i] + "</text>");
        out.push('<text class="lbl" x="' + (x + cw / 2) + '" y="72" text-anchor="middle">' + i + "</text>");
      }
      view.innerHTML = '<svg class="ds-svg" viewBox="0 0 ' + (8 + n * cw) + ' 78" role="img" aria-label="Dizi ve yoklama sırası">' + out.join("") + "</svg>";
    }
    function table(x) {
      var h = '<table class="ds-deck__table"><thead><tr><th>aranan ' + x + '</th>';
      var b = "<tr><td>yoklama</td>";
      Object.keys(F).forEach(function (k) {
        h += '<th class="c">' + NAMES[k] + "</th>";
        b += '<td class="c">' + F[k](dizi, x).p.length + "</td>";
      });
      log.innerHTML = h + "</tr></thead><tbody>" + b + "</tr></tbody></table>";
    }
    function run(op) {
      var x = parseInt(input.value, 10);
      if (isNaN(x)) { status.textContent = "Bir tamsayı girin."; return; }
      var res = F[op](dizi, x);
      render(res);
      table(x);
      status.innerHTML = "<b>" + NAMES[op] + "</b> arama: " + res.p.length + " yoklama (" + res.p.join(", ") + ") → " +
        (res.r >= 0 ? "indis <b>" + res.r + "</b>" : "<b>bulunamadı</b> (−1)");
    }
    demo.addEventListener("click", function (e) {
      var b = e.target.closest("[data-op]");
      if (!b) return;
      var op = b.getAttribute("data-op");
      if (op === "uni" || op === "skew") {
        dizi = (op === "uni" ? UNI : SKEW).slice();
        input.value = op === "uni" ? 65 : 15;
        render(null); log.innerHTML = "";
        status.textContent = op === "uni" ? "Düzgün dağılımlı dizi yüklendi." : "Çarpık dizi yüklendi (son eleman 500). Ara değer aramayı 15 ile deneyin.";
        return;
      }
      run(op);
    });
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); run("bin"); } });
    render(null);
    status.textContent = "Bir değer girip algoritma seçin (Enter = ikili).";
  });
})();
