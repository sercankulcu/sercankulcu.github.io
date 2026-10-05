/* Bölüm 2: 8086 Pinler demoları */
(function () {
  var AD = "Adres/veri yolu hattı. T1'de adres biti (A), T2–T4'te veri biti (D) taşır. Çift yönlü; okumada T2'de yüzer duruma geçer.";
  var AS = "Adres/durum hattı. T1'de yüksek adres biti; T2–T4'te durum biti. G/Ç erişiminde T1'de 0'dır.";
  var INFO = {
    1: ["GND", "—", "Toprak. 8086'nın iki toprak pini (1 ve 20) vardır; ikisi de bağlanmalıdır."],
    20: ["GND", "—", "Toprak (ikinci toprak pini)."],
    40: ["VCC", "—", "+5 V DC besleme (± %10)."],
    17: ["NMI", "giriş", "Maskelenemeyen kesme. Kenar tetiklemeli (0 → 1); her zaman tip 2 kesmeye yol açar, IF ile kapatılamaz."],
    18: ["INTR", "giriş", "Kesme isteği. Seviye tetiklemeli, aktif yüksek; her komutun sonunda örneklenir, IF = 1 ise kabul edilir."],
    19: ["CLK", "giriş", "Saat girişi. 8284A'dan gelir; %33 görev çevrimli asimetrik kare dalga (5 / 8 / 10 MHz)."],
    21: ["RESET", "giriş", "Aktif yüksek; en az 4 saat çevrimi 1 olmalı. Sonrasında CS = FFFFh, IP = 0000h → ilk komut FFFF0h'de."],
    22: ["READY", "giriş", "Aktif yüksek. Bellek/G-Ç aktarımı tamamlayabildiğini bildirir; 0 ise T3 ile T4 arasına bekleme (Tw) eklenir. 8284A ile senkronlanır."],
    23: ["TEST'", "giriş", "WAIT komutu tarafından sınanır: 0 ise yürütme sürer, 1 ise işlemci boşta bekler. Tipik olarak 8087 BUSY çıkışına bağlanır."],
    32: ["RD'", "çıkış", "Okuma, aktif düşük. Bellek veya G/Ç okuma döngüsünün T2, T3, Tw durumlarında 0."],
    33: ["MN/MX'", "giriş", "Mod seçimi: VCC'ye bağlı → minimum mod; GND'ye bağlı → maksimum mod. Pin 24–31'in anlamını belirler."],
    34: ["BHE'/S7", "çıkış", "Bus High Enable, aktif düşük: T1'de veri yolunun üst yarısının (D8–D15) kullanılacağını bildirir (A0 ile birlikte banka seçimi). T2–T4'te S7 (yedek durum biti)."],
    35: ["A19/S6", "çıkış", AS + " S6 her zaman 0'dır."],
    36: ["A18/S5", "çıkış", AS + " S5 = IF bayrağının durumu."],
    37: ["A17/S4", "çıkış", AS + " S4 ve S3 birlikte kullanılan kesimi gösterir (00 ES, 01 SS, 10 CS/yok, 11 DS)."],
    38: ["A16/S3", "çıkış", AS + " S4 ve S3 birlikte kullanılan kesimi gösterir."]
  };
  var MODE = {
    24: [["QS1", "çıkış", "Kuyruk durumu biti 1 (QS0 ile): 00 işlem yok, 01 ilk opcode baytı, 10 kuyruk boşaltıldı, 11 sonraki bayt."],
         ["INTA'", "çıkış", "Kesme kabul, aktif düşük. İki ardışık INTA döngüsünün T2, T3, Tw durumlarında 0; ikincisinde tip numarası okunur."]],
    25: [["QS0", "çıkış", "Kuyruk durumu biti 0 (QS1 ile birlikte). 8087 bu pinlerle 8086'nın kuyruğunu izler."],
         ["ALE", "çıkış", "Adres kilidi etkinleştirme, aktif yüksek darbe (T1). 8282/8283 kilitlerine adresi yükletir. Hiçbir zaman yüzer duruma geçmez."]],
    26: [["S0'", "çıkış", "Durum biti 0. S2'–S0' birlikte döngü türünü kodlar; 8288 çözer."],
         ["DEN'", "çıkış", "Veri etkinleştirme, aktif düşük. 8286/8287 alıcı-vericisinin OE' girişine bağlanır."]],
    27: [["S1'", "çıkış", "Durum biti 1 (okuma/yazma ayrımı)."],
         ["DT/R'", "çıkış", "Veri gönder/al: 1 → CPU'dan dışarı (yazma), 0 → dışarıdan CPU'ya (okuma). Alıcı-vericinin yönünü belirler."]],
    28: [["S2'", "çıkış", "Durum biti 2: 1 → bellek döngüsü, 0 → G/Ç / kesme kabul / durdurma."],
         ["M/IO'", "çıkış", "Bellek/G-Ç ayrımı: 1 → bellek, 0 → G/Ç işlemi."]],
    29: [["LOCK'", "çıkış", "Kilit, aktif düşük. LOCK önekli komut boyunca diğer yol yöneticilerinin yolu almasını engeller."],
         ["WR'", "çıkış", "Yazma, aktif düşük. Yazma döngüsünün T2, T3, Tw durumlarında 0."]],
    30: [["RQ'/GT1'", "G/Ç", "İstek/bağış 1. Çift yönlü tek hat üzerinde darbelerle yol isteği ve bağışı. GT0'dan düşük öncelikli."],
         ["HLDA", "çıkış", "Tutma kabul, aktif yüksek. HOLD isteğine onay; işlemci yolları yüzer duruma alır."]],
    31: [["RQ'/GT0'", "G/Ç", "İstek/bağış 0. En yüksek öncelikli yol isteği (ör. 8087)."],
         ["HOLD", "giriş", "Tutma isteği, aktif yüksek. Başka bir yönetici (DMA) yolu istiyor."]]
  };
  for (var n = 2; n <= 16; n++) INFO[n] = ["AD" + (16 - n), "G/Ç", AD];
  INFO[39] = ["AD15", "G/Ç", AD];

  document.querySelectorAll('.ds-deck [data-demo="m02-pins"]').forEach(function (demo) {
    var info = demo.querySelector(".m02-info");
    var status = demo.querySelector(".ds-deck__status");
    var pins = demo.querySelectorAll(".m-pin");
    var modeBtns = demo.querySelectorAll("[data-mode]");
    var mode = "max", sel = null;
    function show() {
      if (!sel) { info.innerHTML = '<h3>8086</h3><div class="m02-meta">40 pin · ' + (mode === "max" ? "maksimum" : "minimum") + ' mod</div>Pin 24–31\'in adı moda göre değişir. Mod düğmeleriyle karşılaştır.'; return; }
      var n = +sel.getAttribute("data-pin");
      var d = MODE[n] ? MODE[n][mode === "max" ? 0 : 1] : INFO[n];
      info.innerHTML = "<h3>" + d[0] + "</h3><div class=\"m02-meta\">Pin " + n + " · " + d[1] + (MODE[n] ? " · " + (mode === "max" ? "maksimum" : "minimum") + " mod" : "") + "</div>" + d[2];
      status.textContent = MODE[n] ? "Bu pin moda bağlı: diğer modda " + MODE[n][mode === "max" ? 1 : 0][0] + "." : "Bu pinin işlevi her iki modda aynı.";
    }
    pins.forEach(function (g) {
      function pick() {
        pins.forEach(function (x) { x.classList.remove("is-sel"); });
        g.classList.add("is-sel"); sel = g; show();
      }
      g.addEventListener("click", pick);
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); pick(); } });
    });
    modeBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        mode = b.getAttribute("data-mode");
        modeBtns.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        show();
      });
    });
    show();
  });

  /* durum kodu çözücü */
  var CYC = [
    ["Kesme kabul", "INTA'", "8259A tip numarasını veri yoluna koyar."],
    ["G/Ç portu oku", "IORC'", "IN komutu; adres yolunda port numarası (A0–A15)."],
    ["G/Ç portuna yaz", "IOWC', AIOWC'", "OUT komutu."],
    ["Durdurma (HLT)", "—", "İşlemci kesme veya RESET bekler."],
    ["Kod erişimi", "MRDC'", "Önden getirme kuyruğu için komut baytı okunur."],
    ["Bellek oku", "MRDC'", "Ör. MOV AL, [BX]."],
    ["Belleğe yaz", "MWTC', AMWC'", "Ör. MOV [BX], AL."],
    ["Pasif", "—", "Yol döngüsü yok (T3/Tw sonu ya da boşta)."]
  ];
  var SEG = ["ES (ek kesim)", "SS (yığın)", "CS veya kesim yok", "DS (veri)"];
  document.querySelectorAll('.ds-deck [data-demo="m02-status"]').forEach(function (demo) {
    var st = { s2: 1, s1: 0, s0: 1, s4: 1, s3: 1 };
    var names = { s2: "S2'", s1: "S1'", s0: "S0'", s4: "S4", s3: "S3" };
    var out = demo.querySelector(".m02-out");
    var status = demo.querySelector(".ds-deck__status");
    var btns = demo.querySelectorAll("[data-bit]");
    function render() {
      btns.forEach(function (b) {
        var k = b.getAttribute("data-bit");
        b.textContent = names[k] + " = " + st[k];
        b.classList.toggle("is-one", st[k] === 1);
      });
      var code = st.s2 * 4 + st.s1 * 2 + st.s0, c = CYC[code];
      var sg = SEG[st.s4 * 2 + st.s3];
      out.innerHTML = '<table class="ds-deck__table"><tbody>' +
        "<tr><th>S2' S1' S0'</th><td><code>" + st.s2 + st.s1 + st.s0 + "</code> → <strong>" + c[0] + "</strong></td></tr>" +
        "<tr><th>8288 komutu</th><td><code>" + c[1] + "</code></td></tr>" +
        "<tr><th>Açıklama</th><td>" + c[2] + "</td></tr>" +
        "<tr><th>S4 S3</th><td><code>" + st.s4 + st.s3 + "</code> → " + sg + "</td></tr></tbody></table>";
      status.innerHTML = code === 7 ? "Pasif kod: yeni döngü, bu koddan başka bir koda geçişle (T4'te) başlar." :
        (st.s2 ? "S2' = 1 → bellek döngüsü" : "S2' = 0 → G/Ç veya özel döngü");
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () { var k = b.getAttribute("data-bit"); st[k] ^= 1; render(); });
    });
    render();
  });
})();
