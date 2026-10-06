/* Bölüm 3: Örnek Çıktılar - desen laboratuvarı */
(function () {
  /* Java metotlarının birebir karşılığı: sonuç, cizdir(n) çağrısının yazdığı metin (sondaki boş satır hariç) */
  function desen(tur, n) {
    var s = "", i, j;
    function tekrar(c, k) { var r = ""; for (var t = 0; t < k; t++) r += c; return r; }
    if (tur === "satir") return tekrar("*", n) + "\n";
    for (i = 0; i < n; i++) {
      if (tur === "kare") s += tekrar("* ", n);
      else if (tur === "ucgen") s += tekrar("*", i + 1);
      else if (tur === "piramit") s += tekrar(" ", n - i - 1) + tekrar("*", 2 * i + 1);
      else if (tur === "ters") s += tekrar(" ", i) + tekrar("*", 2 * (n - i) - 1);
      else if (tur === "cerceve") {
        for (j = 0; j < n; j++) s += (j === 0 || j === n - 1 || i === 0 || i === n - 1) ? "* " : "  ";
      } else if (tur === "toplam") {
        for (j = 0; j < n; j++) s += String(i + j);
      } else if (tur === "indis") {
        for (j = 0; j < n; j++) s += String(i) + String(j) + " ";
      } else if (tur === "carpim") {
        for (j = 1; j <= n; j++) {
          var c = (i + 1) * j;
          s += (c < 10 ? "0" : "") + c + " ";
        }
      }
      s += "\n";
    }
    return s;
  }
  var KURAL = {
    satir: "Tek döngü: <code>sayi</code> kez <code>\"*\"</code>",
    kare: "Her satırda <code>sayi</code> kez <code>\"* \"</code>",
    ucgen: "i. satırda <code>i + 1</code> yıldız",
    piramit: "i. satırda <code>sayi − i − 1</code> boşluk + <code>2i + 1</code> yıldız",
    ters: "i. satırda <code>i</code> boşluk + <code>2(sayi − i) − 1</code> yıldız",
    cerceve: "Kenarda <code>\"* \"</code>, içeride <code>\"  \"</code>",
    toplam: "Her hücrede <code>i + j</code> (ayraç yok)",
    indis: "Her hücrede <code>i + \"\" + j + \" \"</code>",
    carpim: "Her hücrede <code>i * j</code>, 10'dan küçükse başına 0"
  };
  function esc(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  document.querySelectorAll('.ds-deck [data-demo="j035-lab"]').forEach(function (demo) {
    var kind = demo.querySelector(".j035-lab__kind");
    var nIn = demo.querySelector(".j035-lab__n");
    var nv = demo.querySelector(".j035-lab__nv");
    var rule = demo.querySelector(".j035-lab__rule");
    var out = demo.querySelector(".j035-lab__out");
    function draw() {
      var n = parseInt(nIn.value, 10) || 1, tur = kind.value;
      var metin = desen(tur, n);
      nv.textContent = String(n);
      var yildiz = (metin.match(/\*/g) || []).length;
      var satir = metin.split("\n").length - 1;
      rule.innerHTML = KURAL[tur] + " · " + satir + " satır" + (yildiz ? " · " + yildiz + " yıldız" : "");
      out.innerHTML = metin.replace(/\n$/, "").split("\n").map(function (ln) {
        return esc(ln).replace(/ /g, '<span class="j035-lab__sp">·</span>');
      }).join("\n");
    }
    kind.addEventListener("change", draw);
    nIn.addEventListener("input", draw);
    draw();
  });
})();
