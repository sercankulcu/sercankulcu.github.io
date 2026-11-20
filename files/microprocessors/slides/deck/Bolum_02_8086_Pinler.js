/* Bölüm 2: 8086 Pinler demoları */
(function () {
  const EN = String((document.getElementById("ds-deck") || document.documentElement).getAttribute("lang")).toLowerCase().indexOf("en") === 0;
  const tx = (tr, en) => EN ? en : tr;
  var IN = tx("giriş", "input"), OUT = tx("çıkış", "output"), IO = tx("G/Ç", "I/O");
  var AD = tx("Adres/veri yolu hattı. T1'de adres biti (A), T2–T4'te veri biti (D) taşır. Çift yönlü; okumada T2'de yüzer duruma geçer.",
    "Address/data bus line. Carries an address bit (A) in T1 and a data bit (D) in T2–T4. Bidirectional; floats in T2 of a read.");
  var AS = tx("Adres/durum hattı. T1'de yüksek adres biti; T2–T4'te durum biti. G/Ç erişiminde T1'de 0'dır.",
    "Address/status line. A high address bit in T1, a status bit in T2–T4. Low in T1 of an I/O access.");
  var INFO = {
    1: ["GND", "—", tx("Toprak. 8086'nın iki toprak pini (1 ve 20) vardır; ikisi de bağlanmalıdır.", "Ground. The 8086 has two ground pins (1 and 20); both must be connected.")],
    20: ["GND", "—", tx("Toprak (ikinci toprak pini).", "Ground (second ground pin).")],
    40: ["VCC", "—", tx("+5 V DC besleme (± %10).", "+5 V DC supply (± 10%).")],
    17: ["NMI", IN, tx("Maskelenemez kesme. Kenar tetiklemeli (0 → 1); her zaman tip 2 kesmeye yol açar, IF ile kapatılamaz.", "Non-maskable interrupt. Edge-triggered (0 → 1); always causes a type 2 interrupt and cannot be disabled by IF.")],
    18: ["INTR", IN, tx("Kesme isteği. Düzey tetiklemeli, aktif yüksek; her komutun sonunda örneklenir, IF = 1 ise kabul edilir.", "Interrupt request. Level-triggered, active high; sampled at the end of each instruction and accepted if IF = 1.")],
    19: ["CLK", IN, tx("Saat girişi. 8284A'dan gelir; %33 görev çevrimli asimetrik kare dalga (5 / 8 / 10 MHz).", "Clock input from the 8284A; an asymmetric square wave with 33% duty cycle (5 / 8 / 10 MHz).")],
    21: ["RESET", IN, tx("Aktif yüksek; en az 4 saat turu 1 olmalı. Sonrasında CS = FFFFh, IP = 0000h → ilk komut FFFF0h'de.", "Active high; must stay 1 for at least 4 clock cycles. Afterwards CS = FFFFh, IP = 0000h → first instruction at FFFF0h.")],
    22: ["READY", IN, tx("Aktif yüksek. Bellek/G-Ç aktarımı tamamlayabildiğini bildirir; 0 ise T3 ile T4 arasına bekleme (Tw) eklenir. 8284A ile eş zamanlanır.", "Active high. Memory or I/O signals it can complete the transfer; if 0, wait states (Tw) are inserted between T3 and T4. Synchronized by the 8284A.")],
    23: ["TEST'", IN, tx("WAIT komutu tarafından sınanır: 0 ise yürütme sürer, 1 ise işlemci boşta bekler. Tipik olarak 8087 BUSY çıkışına bağlanır.", "Tested by the WAIT instruction: if 0, execution continues; if 1, the CPU idles. Usually wired to the 8087 BUSY output.")],
    32: ["RD'", OUT, tx("Okuma, aktif düşük. Bellek veya G/Ç okuma döngüsünün T2, T3, Tw durumlarında 0.", "Read, active low. 0 during T2, T3 and Tw of a memory or I/O read cycle.")],
    33: ["MN/MX'", IN, tx("Mod seçimi: VCC'ye bağlı → minimum mod; GND'ye bağlı → maksimum mod. Pin 24–31'in anlamını belirler.", "Mode select: tied to VCC → minimum mode; tied to GND → maximum mode. Decides what pins 24–31 mean.")],
    34: ["BHE'/S7", OUT, tx("Bus High Enable, aktif düşük: T1'de veri yolunun üst yarısının (D8–D15) kullanılacağını bildirir (A0 ile birlikte banka seçimi). T2–T4'te S7 (yedek durum biti).", "Bus High Enable, active low: in T1 it signals that the upper half of the data bus (D8–D15) is used (bank select together with A0). S7 (spare status bit) in T2–T4.")],
    35: ["A19/S6", OUT, AS + tx(" S6 her zaman 0'dır.", " S6 is always 0.")],
    36: ["A18/S5", OUT, AS + tx(" S5 = IF bayrağının durumu.", " S5 = state of the IF flag.")],
    37: ["A17/S4", OUT, AS + tx(" S4 ve S3 birlikte kullanılan kesimi gösterir (00 ES, 01 SS, 10 CS/yok, 11 DS).", " S4 and S3 together give the segment in use (00 ES, 01 SS, 10 CS/none, 11 DS).")],
    38: ["A16/S3", OUT, AS + tx(" S4 ve S3 birlikte kullanılan kesimi gösterir.", " S4 and S3 together give the segment in use.")]
  };
  var MODE = {
    24: [["QS1", OUT, tx("Kuyruk durumu biti 1 (QS0 ile): 00 işlem yok, 01 ilk opcode baytı, 10 kuyruk boşaltıldı, 11 sonraki bayt.", "Queue status bit 1 (with QS0): 00 no operation, 01 first opcode byte, 10 queue emptied, 11 subsequent byte.")],
         ["INTA'", OUT, tx("Kesme kabul, aktif düşük. İki ardışık INTA döngüsünün T2, T3, Tw durumlarında 0; ikincisinde tip numarası okunur.", "Interrupt acknowledge, active low. 0 during T2, T3 and Tw of two back-to-back INTA cycles; the type number is read in the second.")]],
    25: [["QS0", OUT, tx("Kuyruk durumu biti 0 (QS1 ile birlikte). 8087 bu pinlerle 8086'nın kuyruğunu izler.", "Queue status bit 0 (with QS1). The 8087 tracks the 8086 queue through these pins.")],
         ["ALE", OUT, tx("Adres kilidi etkinleştirme, aktif yüksek darbe (T1). 8282/8283 kilitlerine adresi yükletir. Hiçbir zaman yüzer duruma geçmez.", "Address latch enable, an active-high pulse in T1. Loads the address into the 8282/8283 latches. Never floated.")]],
    26: [["S0'", OUT, tx("Durum biti 0. S2'–S0' birlikte döngü türünü kodlar; 8288 çözer.", "Status bit 0. S2'–S0' together encode the cycle type; the 8288 decodes it.")],
         ["DEN'", OUT, tx("Veri etkinleştirme, aktif düşük. 8286/8287 alıcı-vericisinin OE' girişine bağlanır.", "Data enable, active low. Drives the OE' input of the 8286/8287 transceiver.")]],
    27: [["S1'", OUT, tx("Durum biti 1 (okuma/yazma ayrımı).", "Status bit 1 (read vs. write).")],
         ["DT/R'", OUT, tx("Veri gönder/al: 1 → CPU'dan dışarı (yazma), 0 → dışarıdan CPU'ya (okuma). Alıcı-vericinin yönünü belirler.", "Data transmit/receive: 1 → out of the CPU (write), 0 → into the CPU (read). Sets the transceiver direction.")]],
    28: [["S2'", OUT, tx("Durum biti 2: 1 → bellek döngüsü, 0 → G/Ç / kesme kabul / durdurma.", "Status bit 2: 1 → memory cycle, 0 → I/O / interrupt acknowledge / halt.")],
         ["M/IO'", OUT, tx("Bellek/G-Ç ayrımı: 1 → bellek, 0 → G/Ç işlemi.", "Memory vs. I/O: 1 → memory, 0 → I/O operation.")]],
    29: [["LOCK'", OUT, tx("Kilit, aktif düşük. LOCK önekli komut boyunca diğer yol yöneticilerinin yolu almasını engeller.", "Lock, active low. Keeps other bus masters off the bus for the duration of a LOCK-prefixed instruction.")],
         ["WR'", OUT, tx("Yazma, aktif düşük. Yazma döngüsünün T2, T3, Tw durumlarında 0.", "Write, active low. 0 during T2, T3 and Tw of a write cycle.")]],
    30: [["RQ'/GT1'", IO, tx("İstek/bağış 1. Çift yönlü tek hat üzerinde darbelerle yol isteği ve bağışı. GT0'dan düşük öncelikli.", "Request/grant 1. Bus request and grant as pulses on one bidirectional line. Lower priority than GT0.")],
         ["HLDA", OUT, tx("Tutma kabul, aktif yüksek. HOLD isteğine onay; işlemci yolları yüzer duruma alır.", "Hold acknowledge, active high. Grants a HOLD request; the CPU floats its buses.")]],
    31: [["RQ'/GT0'", IO, tx("İstek/bağış 0. En yüksek öncelikli yol isteği (ör. 8087).", "Request/grant 0. Highest-priority bus request (e.g. the 8087).")],
         ["HOLD", IN, tx("Tutma isteği, aktif yüksek. Başka bir yönetici (DMA) yolu istiyor.", "Hold request, active high. Another bus master (DMA) wants the bus.")]]
  };
  for (var n = 2; n <= 16; n++) INFO[n] = ["AD" + (16 - n), IO, AD];
  INFO[39] = ["AD15", IO, AD];

  document.querySelectorAll('.ds-deck [data-demo="m02-pins"]').forEach(function (demo) {
    var info = demo.querySelector(".m02-info");
    var status = demo.querySelector(".ds-deck__status");
    var pins = demo.querySelectorAll(".m-pin");
    var modeBtns = demo.querySelectorAll("[data-mode]");
    var mode = "max", sel = null;
    function modeName() { return mode === "max" ? tx("maksimum", "maximum") : tx("minimum", "minimum"); }
    function show() {
      if (!sel) { info.innerHTML = '<h3>8086</h3><div class="m02-meta">40 pin · ' + modeName() + tx(' mod</div>Pin 24–31\'in adı moda göre değişir. Mod düğmeleriyle karşılaştır.', ' mode</div>Pins 24–31 change name with the mode. Compare using the mode buttons.'); return; }
      var n = +sel.getAttribute("data-pin");
      var d = MODE[n] ? MODE[n][mode === "max" ? 0 : 1] : INFO[n];
      info.innerHTML = "<h3>" + d[0] + "</h3><div class=\"m02-meta\">Pin " + n + " · " + d[1] + (MODE[n] ? " · " + modeName() + tx(" mod", " mode") : "") + "</div>" + d[2];
      status.textContent = MODE[n] ? tx("Bu pin moda bağlı: diğer modda ", "This pin depends on the mode: in the other mode it is ") + MODE[n][mode === "max" ? 1 : 0][0] + "." : tx("Bu pinin işlevi her iki modda aynı.", "This pin does the same job in both modes.");
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
    [tx("Kesme kabul", "Interrupt acknowledge"), "INTA'", tx("8259A tip numarasını veri yoluna koyar.", "The 8259A puts the type number on the data bus.")],
    [tx("G/Ç portu oku", "Read I/O port"), "IORC'", tx("IN komutu; adres yolunda port numarası (A0–A15).", "IN instruction; port number on the address bus (A0–A15).")],
    [tx("G/Ç portuna yaz", "Write I/O port"), "IOWC', AIOWC'", tx("OUT komutu.", "OUT instruction.")],
    [tx("Durdurma (HLT)", "Halt (HLT)"), "—", tx("İşlemci kesme veya RESET bekler.", "The CPU waits for an interrupt or RESET.")],
    [tx("Kod erişimi", "Code access"), "MRDC'", tx("Önden getirme kuyruğu için komut baytı okunur.", "An instruction byte is read for the prefetch queue.")],
    [tx("Bellek oku", "Read memory"), "MRDC'", tx("Ör. MOV AL, [BX].", "E.g. MOV AL, [BX].")],
    [tx("Belleğe yaz", "Write memory"), "MWTC', AMWC'", tx("Ör. MOV [BX], AL.", "E.g. MOV [BX], AL.")],
    [tx("Pasif", "Passive"), "—", tx("Yol döngüsü yok (T3/Tw sonu ya da boşta).", "No bus cycle (end of T3/Tw, or idle).")]
  ];
  var SEG = [tx("ES (ek kesim)", "ES (extra segment)"), tx("SS (yığın)", "SS (stack)"), tx("CS veya kesim yok", "CS or no segment"), tx("DS (veri)", "DS (data)")];
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
        "<tr><th>" + tx("8288 komutu", "8288 command") + "</th><td><code>" + c[1] + "</code></td></tr>" +
        "<tr><th>" + tx("Açıklama", "Description") + "</th><td>" + c[2] + "</td></tr>" +
        "<tr><th>S4 S3</th><td><code>" + st.s4 + st.s3 + "</code> → " + sg + "</td></tr></tbody></table>";
      status.innerHTML = code === 7 ? tx("Pasif kod: yeni döngü, bu koddan başka bir koda geçişle (T4'te) başlar.", "Passive code: a new cycle starts when the code changes from this one (in T4).") :
        (st.s2 ? tx("S2' = 1 → bellek döngüsü", "S2' = 1 → memory cycle") : tx("S2' = 0 → G/Ç veya özel döngü", "S2' = 0 → I/O or special cycle"));
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () { var k = b.getAttribute("data-bit"); st[k] ^= 1; render(); });
    });
    render();
  });
})();
