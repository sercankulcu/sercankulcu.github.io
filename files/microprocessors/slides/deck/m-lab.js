/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* 8086 laboratuvarı: sunuma gömülü adım adım 8086 yürütücüsü (deck.js ve mini8086.js'ten sonra yüklenir).
   <div class="ds-deck__demo m-lab" data-demo="m-lab">
     <script type="text/x-asm" data-name="Örnek adı">ORG 100h …</script>  (bir ya da daha çok hazır örnek)
   </div>
   Örnek etiketinin isteğe bağlı öznitelikleri:
     data-init='{"mem": {"DS:0500h": ["25h", "17h"]}}'   başlangıç belleği ("DS:0200h": "ABC" de olur)
     data-input="Ali\r"                                  hazır klavye girdisi (\r = Enter, \b = geri silme, \e = Esc)
     data-poll="2"                                         tuş yoklamasının ilk n sorgusu "tuş yok" döner
     data-ports='{"21h": {"ilk": "B8h"}, "125": {"ayar": 70}}'  IN değerleri: sabit, dizi (sırayla), ilk değer
                                                           (sonra son OUT) ya da kaydırıcıyla ayarlanabilir değer
     data-dev="trafik|led|gosterge|termometre|step|yazici|port"  sanal aygıt çizimleri (port 4, 199, 310h/312h, 125/127,
                                                           step motor port 7, yazıcı INT 21h/05h)
     data-view="kesme|ekran|aygit"                         yan panelin düzeni; data-acilim="1": makro açılımı açık
     data-clock="14,35,7,42"  data-date="2026,1,7,3"      INT 21h/2Ch, 2Ah ve INT 1Ah için sabit saat/tarih
   Arayüz bu betikte kurulur: solda kod (o anki satır vurgulu; Düzenle ile textarea; makro açılımı; Girdi kutusu), ortada
   yazmaçlar ve bayraklar, sağda bellek dökümü, SS:SP çevresi (itilen FLAGS/CS/IP etiketli), ekran ya da aygıtlar;
   altta her adımın Türkçe açıklaması. REP önekli dizgi komutları tur tur yürütülür. INT 10h ile mod 13h seçilince ekran
   paneli 320×200 piksellik bir tuval olur (A000h belleği; doğrudan yazımlar da görünür).
   Zaman: INT 15h/86h ve INT 1Ah sanal bir saate bağlıdır. Adım ve Çalıştır kiplerinde bekleme tek adımda tamamlanır; Oynat
   kipinde saat gerçek zamanla akar ve bekleme gerçek zamanda sürer (ikisi de Oynat hızıyla ölçeklenir).
   Geri düğmesi programı baştan k − 1 adım yeniden yürütür (girdiler ve ayarlanan port değerleri kayıttan okunur). */
(function () {
  "use strict";
  if (["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) < 0) return;
  var M = window.Mini8086;
  if (!M) return;
  var EN = String((document.getElementById("ds-deck") || document.documentElement).getAttribute("lang") || "").toLowerCase().indexOf("en") === 0;
  function tx(tr, en) { return EN ? en : tr; }
  /* sayıda ondalık ayırıcı: Türkçede virgül, İngilizcede nokta */
  function dec(v) { return EN ? String(v) : String(v).replace(".", ","); }
  /* VIEWS içindeki scr değerleri ("Çıktı", "Ekran") iç anahtar olarak da kullanılır; ekranda bu işlevle gösterilir */
  function scrLabel(s) { return s === "Ekran" ? tx("Ekran", "Screen") : tx("Çıktı", "Output"); }
  var hx = M.hx, MAX_RUN = 5000, PLAY_MS = 650, SPEEDS = [0.5, 1, 2, 5, 20, 100];
  var GP = ["AX", "BX", "CX", "DX"], PAIRS = [["SI", "DI", "BP"], ["SP", "CS", "IP"], ["DS", "ES", "SS"]];
  var FL = ["OF", "DF", "IF", "TF", "SF", "ZF", "AF", "PF", "CF"];
  var VIEWS = {
    normal: { mem: 5, stack: 5, scr: "Çıktı" },
    kesme: { mem: 3, stack: 7, scr: "Çıktı" },
    ekran: { mem: 3, stack: 0, scr: "Ekran", mini: true },
    aygit: { mem: 3, stack: 0, scr: null, dev: true }
  };
  var CLOCK = [14, 35, 7, 42], DATE = [2026, 1, 7, 3];
  var NS = "http://www.w3.org/2000/svg";
  /* CGA renkleri tema belirteçlerine eşlenir (sabit renk yok): zemin 0-7, yazı 0-15 */
  var BG = [null, "--ds-link", "--ds-good", "--ds-accent", "--ds-bad", "--ds-accent", "--ds-look", "--ds-surface-strong"];
  var FG = ["--ds-text", "--ds-link", "--ds-good", "--ds-accent", "--ds-bad", "--ds-accent", "--ds-look-ink", "--ds-text",
    "--ds-muted", "--ds-link", "--ds-good", "--ds-accent", "--ds-bad", "--ds-accent", "--ds-look", "--ds-text"];
  var CNAME = ["siyah", "mavi", "yeşil", "camgöbeği", "kırmızı", "eflatun", "kahverengi", "açık gri",
    "koyu gri", "açık mavi", "açık yeşil", "açık camgöbeği", "açık kırmızı", "açık eflatun", "sarı", "beyaz"];
  var CNAME_EN = ["black", "blue", "green", "cyan", "red", "magenta", "brown", "light gray",
    "dark gray", "light blue", "light green", "light cyan", "light red", "light magenta", "yellow", "white"];
  /* mod 13h: VGA'nın varsayılan 256 renkli paleti (6 bitlik DAC değerleri; ekran görüntüsü olduğu için tema dışı sabit renkler).
     0–15 metin renkleri, 16–31 gri tonlar, 32–247 üç parlaklık × üç doygunlukta 24 tonluk halkalar, 248–255 siyah. */
  var PAL = (function () {
    var p = [], i, k, E = [[0, 0, 0], [0, 0, 42], [0, 42, 0], [0, 42, 42], [42, 0, 0], [42, 0, 42], [42, 21, 0], [42, 42, 42],
      [21, 21, 21], [21, 21, 63], [21, 63, 21], [21, 63, 63], [63, 21, 21], [63, 21, 63], [63, 63, 21], [63, 63, 63]];
    var GRAY = [0, 5, 8, 11, 14, 17, 20, 24, 28, 32, 36, 40, 45, 50, 56, 63];
    var LV = [[0, 16, 31, 47, 63], [31, 39, 47, 55, 63], [45, 49, 54, 58, 63], [0, 7, 14, 21, 28], [14, 17, 21, 24, 28], [20, 22, 24, 26, 28],
      [0, 4, 8, 12, 16], [8, 10, 12, 14, 16], [11, 12, 13, 15, 16]];
    var RI = [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0], GI = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1],
      BI = [4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4];
    E.forEach(function (c) { p.push(c); });
    GRAY.forEach(function (g) { p.push([g, g, g]); });
    LV.forEach(function (l) { for (k = 0; k < 24; k++) p.push([l[RI[k]], l[GI[k]], l[BI[k]]]); });
    while (p.length < 256) p.push([0, 0, 0]);
    for (i = 0; i < 256; i++) p[i] = p[i].map(function (v) { return Math.round(v * 255 / 63); });
    return p;
  })();
  /* 7 bölütlü gösterge: bit 0-6 = a-g */
  var SEG7 = { "0": 0x3F, "1": 0x06, "2": 0x5B, "3": 0x4F, "4": 0x66, "5": 0x6D, "6": 0x7D, "7": 0x07, "8": 0x7F, "9": 0x6F, "-": 0x40, " ": 0 };

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function h4(v) { return hx(v).slice(0, 4); }
  function h2(v) { return hx(v, 1).slice(0, 2); }
  function sd(n) { return n < 0 ? "−" + -n : String(n); }
  function hp(v) { return v > 255 ? hx(v) : hx(v, 1); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function btn(act, text, label) {
    var b = el("button", "ds-deck__button ds-deck__button--sm", esc(text));
    b.type = "button"; b.dataset.act = act;
    if (label) b.setAttribute("aria-label", label);
    return b;
  }
  function num(x) { return typeof x === "string" ? M.parseNumber(x) : x; }
  function triple(s, def) {
    if (!s) return def;
    var a = s.split(",").map(function (x) { return parseInt(x, 10); });
    return a.length === def.length && a.every(function (x) { return !isNaN(x); }) ? a : def;
  }
  function keyGlyph(c) {
    return c === "\r" ? "⏎" : c === "\b" ? "⌫" : c === "\x1b" ? "Esc" : c === " " ? "␣" : c === "\t" ? "⇥" : c;
  }
  function attrStyle(a) {
    if (a === 0x07) return "";
    var bg = BG[(a >> 4) & 7], f = a & 15, fg = FG[f];
    if ((f === 7 || f === 15 || f === 0) && bg) fg = f === 0 ? "--ds-text" : "--ds-bg";
    if (fg === bg) fg = "--ds-bg";
    return (bg ? "background:var(" + bg + ");" : "") + "color:var(" + fg + ")";
  }
  function attrName(a) {
    if (EN) return "attribute " + hx(a, 1) + ": " + CNAME_EN[a & 15] + " on " + CNAME_EN[(a >> 4) & 7];
    return "öznitelik " + hx(a, 1) + ": " + CNAME[(a >> 4) & 7] + " zemin, " + CNAME[a & 15] + " yazı";
  }

  /* ---------- aygıt çizimleri (sunumdaki SVG üslubu, var(--ds-*) renkleri) ---------- */
  var TPOS = [[232, 150], [232, 14], [38, 14], [38, 150]], TCLS = ["m-lab-lamp-r", "m-lab-lamp-y", "m-lab-lamp-g"];
  var TPOLE = EN ? ["bottom right", "top right", "top left", "bottom left"] : ["sağ alt", "sağ üst", "sol üst", "sol alt"];
  var TCOL = EN ? ["red", "yellow", "green"] : ["kırmızı", "sarı", "yeşil"];
  function svgWrap(vb, label, inner, h) {
    return '<svg class="ds-svg m-lab__svg" xmlns="' + NS + '" viewBox="' + vb + '" role="img" aria-label="' + esc(label) + '" style="height:' + h + 'px">' + inner + "</svg>";
  }
  function trafficSvg(w, h) {
    var p = ['<rect class="m-lab-road" x="110" y="0" width="80" height="230"/><rect class="m-lab-road" x="0" y="80" width="300" height="70"/>',
      '<path class="axis" d="M150 0 V80 M150 150 V230 M0 115 H110 M190 115 H300" style="stroke-dasharray:6 6"/>'];
    TPOS.forEach(function (xy, g) {
      var x = xy[0], y = xy[1];
      p.push('<rect class="m-lab-pole" x="' + x + '" y="' + y + '" width="28" height="66" rx="5"/>');
      for (var k = 0; k < 3; k++) {
        var on = (w >> (3 * g + k)) & 1;
        p.push('<circle cx="' + (x + 14) + '" cy="' + (y + 11 + k * 22) + '" r="8" class="' + (on ? TCLS[k] : "m-lab-lamp-off") + '"/>');
      }
    });
    p.push('<text class="lbl mono" x="150" y="226" text-anchor="middle">port 4 = ' + hx(w) + "</text>");
    return svgWrap("0 0 300 232", tx("Kavşak, port 4 = ", "Intersection, port 4 = ") + hx(w), p.join(""), h);
  }
  function trafficText(w) {
    var parts = [];
    for (var g = 0; g < 4; g++) {
      var on = [];
      for (var k = 0; k < 3; k++) if ((w >> (3 * g + k)) & 1) on.push(TCOL[k]);
      parts.push(TPOLE[g] + " " + (on.length ? on.join(" + ") : tx("sönük", "off")));
    }
    return tx("Trafik ışıkları: ", "Traffic lights: ") + parts.join(", ") + ".";
  }
  /* bir hane: x, y sol üst; s ölçek; bits bölüt deseni */
  function digitSvg(x, y, s, bits, lit) {
    var W = 18 * s, H = 32 * s, t = 3.2 * s, p = [];
    var seg = [[x + t, y, W - 2 * t, t], [x + W - t, y + t, t, H / 2 - 1.5 * t], [x + W - t, y + H / 2 + 0.5 * t, t, H / 2 - 1.5 * t],
      [x + t, y + H - t, W - 2 * t, t], [x, y + H / 2 + 0.5 * t, t, H / 2 - 1.5 * t], [x, y + t, t, H / 2 - 1.5 * t], [x + t, y + H / 2 - t / 2, W - 2 * t, t]];
    seg.forEach(function (r, i) {
      var on = (bits >> i) & 1;
      p.push('<rect x="' + r[0].toFixed(1) + '" y="' + r[1].toFixed(1) + '" width="' + r[2].toFixed(1) + '" height="' + r[3].toFixed(1) + '" rx="' + (t / 2).toFixed(1) +
        '" class="' + (on ? (lit === false ? "m-lab-seg-dim" : "m-lab-seg-on") : "m-lab-seg-off") + '"/>');
    });
    return p.join("");
  }
  function ledSvg(v, h) {
    var sv = v & 0x8000 ? v - 0x10000 : v, txt = String(sv), p = ['<rect class="m-lab-panel" x="0" y="0" width="300" height="96" rx="10"/>'];
    while (txt.length < 6) txt = " " + txt;
    for (var i = 0; i < 6; i++) p.push(digitSvg(16 + i * 46, 14, 1.6, SEG7[txt.charAt(i)] || 0));
    p.push('<text class="lbl mono" x="150" y="120" text-anchor="middle">port 199 = ' + hx(v) + " (" + sd(sv) + ")</text>");
    return svgWrap("0 0 300 126", tx("LED gösterge: ", "LED display: ") + sd(sv), p.join(""), h);
  }
  function gaugeSvg(st, h) {
    var p = ['<rect class="m-lab-panel" x="0" y="0" width="300" height="96" rx="10"/>'];
    for (var i = 0; i < 4; i++) {
      var lit = (st.sel >> i) & 1;
      p.push(digitSvg(30 + i * 66, 14, 1.6, st.shown[i], lit ? true : false));
      p.push('<circle cx="' + (44 + i * 66) + '" cy="88" r="3" class="' + (lit ? "m-lab-lamp-g" : "m-lab-lamp-off") + '"/>');
    }
    p.push('<text class="lbl mono" x="150" y="120" text-anchor="middle">310h (' + tx("bölüt", "segments") + ") = " + h2(st.a) + "h · 312h (" + tx("hane", "digit") + ") = " + h2(st.sel) + "h</text>");
    return svgWrap("0 0 300 126", tx("4 haneli 7 bölütlü gösterge", "4-digit 7-segment display"), p.join(""), h);
  }
  function thermoSvg(t, heater, h) {
    var hh = Math.max(0, Math.min(170, (t + 40) * 1.0625)), p = [
      '<rect class="box-empty" x="40" y="10" width="26" height="180" rx="12"/>',
      '<rect x="46" y="' + (186 - hh).toFixed(0) + '" width="14" height="' + hh.toFixed(0) + '" rx="6" class="m-lab-lamp-r"/>',
      '<circle cx="53" cy="200" r="14" class="m-lab-lamp-r"/>'];
    [-40, 0, 40, 80, 120].forEach(function (v) {
      var y = 186 - (v + 40) * 1.0625;
      p.push('<path class="axis" d="M70 ' + y.toFixed(0) + ' H80"/><text class="lbl mono" x="84" y="' + (y + 4).toFixed(0) + '">' + sd(v) + "</text>");
    });
    [60, 80].forEach(function (v) {
      var y = 186 - (v + 40) * 1.0625;
      p.push('<path class="line" d="M30 ' + y.toFixed(0) + ' H76" style="stroke:var(--ds-good);stroke-dasharray:4 3"/>');
    });
    p.push('<text class="txt" x="130" y="60">port 125: <tspan class="mono">' + sd(t) + " °C</tspan></text>");
    p.push('<rect x="130" y="96" width="140" height="44" rx="8" class="' + (heater ? "m-lab-lamp-y" : "m-lab-lamp-off") + '"/><text class="txt" x="200" y="124" text-anchor="middle">' + tx("ısıtıcı ", "heater ") + (heater ? tx("AÇIK", "ON") : tx("KAPALI", "OFF")) + "</text>");
    p.push('<text class="lbl mono" x="130" y="166">port 127 = ' + heater + "</text>");
    return svgWrap("0 0 280 220", tx("Termometre " + sd(t) + " derece, ısıtıcı " + (heater ? "açık" : "kapalı"), "Thermometer " + sd(t) + " degrees, heater " + (heater ? "on" : "off")), p.join(""), h);
  }
  function deg(half) {
    var d = ((half * 11.25) % 360 + 360) % 360;
    return M.trNum(d, 2) + "°";
  }
  function bin3(v) { return ("00" + (v & 7).toString(2)).slice(-3) + "b"; }
  /* step motor (port 7): mil açısı, üç mıknatıs, hazır biti; st = Mini8086.stepper(portWrites) */
  function stepperSvg(st, ready, h) {
    var cx = 84, cy = 92, a = (st.half * 11.25 - 90) * Math.PI / 180, p = ['<circle cx="' + cx + '" cy="' + cy + '" r="62" class="box-empty"/>'];
    for (var k = 0; k < 32; k++) {
      var t = k * 11.25 * Math.PI / 180, big = k % 2 === 0, r1 = big ? 50 : 54;
      p.push('<path class="axis" d="M' + (cx + r1 * Math.sin(t)).toFixed(1) + " " + (cy - r1 * Math.cos(t)).toFixed(1) + " L" + (cx + 58 * Math.sin(t)).toFixed(1) + " " + (cy - 58 * Math.cos(t)).toFixed(1) + '"/>');
    }
    p.push('<text class="lbl" x="' + cx + '" y="' + (cy - 66) + '" text-anchor="middle">0°</text>');
    p.push('<circle cx="' + cx + '" cy="' + cy + '" r="40" class="m-lab-rotor"/>');
    p.push('<path class="m-lab-shaft" d="M' + cx + " " + cy + " L" + (cx + 44 * Math.cos(a)).toFixed(1) + " " + (cy + 44 * Math.sin(a)).toFixed(1) + '"/>');
    p.push('<circle cx="' + cx + '" cy="' + cy + '" r="5" class="m-lab-hub"/>');
    var mag = st.mag == null ? 0 : st.mag;
    for (var m = 2; m >= 0; m--) {
      var x = 176 + (2 - m) * 38, on = (mag >> m) & 1;
      p.push('<rect x="' + x + '" y="14" width="26" height="26" rx="4" class="' + (on ? "m-lab-lamp-r" : "m-lab-lamp-off") + '"/>');
      p.push('<text class="lbl mono" x="' + (x + 13) + '" y="54" text-anchor="middle">' + m + "</text>");
    }
    p.push('<text class="lbl" x="233" y="70" text-anchor="middle">' + tx("mıknatıslar (bit 2–0)", "magnets (bits 2–0)") + "</text>");
    p.push('<text class="txt" x="168" y="100">' + tx("mil", "shaft") + ' <tspan class="mono">' + deg(st.half) + "</tspan></text>");
    p.push('<text class="lbl" x="168" y="120">' + (st.half ? (st.half > 0 ? "+" : "−") + Math.abs(st.half) + tx(" yarım adım (", " half step" + (Math.abs(st.half) === 1 ? "" : "s") + " (") + (st.half > 0 ? "CW" : "CCW") + ")" : tx("başlangıç konumu", "start position")) + "</text>");
    p.push('<rect x="168" y="134" width="12" height="12" rx="6" class="' + (ready ? "m-lab-lamp-g" : "m-lab-lamp-off") + '"/><text class="lbl" x="186" y="145">bit 7: ' + (ready ? tx("hazır", "ready") : tx("meşgul", "busy")) + "</text>");
    p.push('<text class="lbl mono" x="168" y="170">port 7 = ' + (st.mag == null ? "–" : "00000" + bin3(st.mag)) + "</text>");
    return svgWrap("0 0 316 180", tx("Step motor: mil ", "Stepper motor: shaft ") + deg(st.half) + tx(", mıknatıslar ", ", magnets ") + (st.mag == null ? tx("kapalı", "off") : bin3(st.mag)), p.join(""), h);
  }
  /* yazıcı kâğıdı: pp = Mini8086.printerPaper(metin); son satırlar, kafa konumu */
  function paperSvg(pp0, h) {
    /* boş yeni sayfada son çıkan sayfa soluk gösterilir */
    var gone = !pp0.lines.join("").trim() && pp0.last && !pp0.row && !pp0.col;
    var pp = gone ? { lines: pp0.last, row: -1, col: 0, ejected: pp0.ejected } : pp0;
    var rows = 7, n = pp.lines.length, r0 = Math.max(0, Math.max(n, pp.row + 1) - rows), cols = 34, i;
    for (i = 0; i < n; i++) cols = Math.max(cols, pp.lines[i].length + 1);
    cols = Math.max(cols, pp.col + 1);
    var cw = 7.2, lh = 16, W = 24 + cols * cw, H = 24 + rows * lh, p = ['<rect class="m-lab-paper' + (gone ? " is-gone" : "") + '" x="6" y="4" width="' + (W - 12).toFixed(0) + '" height="' + (H - 4) + '" rx="3"/>'];
    for (i = 0; i < 12; i++) p.push('<circle cx="' + (W - 2) + '" cy="' + (12 + i * (H - 16) / 11).toFixed(1) + '" r="1.6" class="m-lab-hole"/><circle cx="2" cy="' + (12 + i * (H - 16) / 11).toFixed(1) + '" r="1.6" class="m-lab-hole"/>');
    for (i = 0; i < rows; i++) {
      var r = r0 + i, t = pp.lines[r] || "";
      if (t) p.push('<text class="m-lab-print mono' + (gone ? " is-gone" : "") + '" x="14" y="' + (20 + i * lh) + '" style="white-space:pre">' + esc(t) + "</text>");
    }
    if (pp.row >= r0 && pp.row < r0 + rows) p.push('<rect class="m-lab-head" x="' + (14 + pp.col * cw - 0.5).toFixed(1) + '" y="' + (8 + (pp.row - r0) * lh) + '" width="' + cw.toFixed(1) + '" height="15" rx="1.5"/>');
    var svg = svgWrap("0 0 " + W.toFixed(0) + " " + H, tx("Yazıcı kâğıdı: ", "Printer paper: ") + pp.lines.filter(Boolean).length + tx(" dolu satır", " printed lines"), p.join(""), h);
    return svg + '<p class="m-lab__papnote">' + (gone ? tx("sayfa " + pp.ejected + " çıktı (FF); yeni sayfa boş", "page " + pp.ejected + " ejected (FF); new page blank") :
      tx("kafa: satır ", "head: line ") + (pp.row + 1) + tx(", sütun ", ", column ") + (pp.col + 1) +
      (pp.ejected ? tx(" · çıkan sayfa: ", " · pages ejected: ") + pp.ejected : "")) + "</p>";
  }

  document.querySelectorAll('.ds-deck [data-demo="m-lab"]').forEach(function (demo) {
    var examples = Array.from(demo.querySelectorAll('script[type="text/x-asm"]')).map(function (s) {
      var init = null, ports = null;
      try { if (s.dataset.init) init = JSON.parse(s.dataset.init); } catch (e) { init = null; }
      try { if (s.dataset.ports) ports = JSON.parse(s.dataset.ports); } catch (e) { ports = null; }
      return { name: s.dataset.name || tx("Örnek", "Example"), init: init, ports: ports, input: s.dataset.input != null ? s.dataset.input.replace(/\\r/g, "\r").replace(/\\b/g, "\b").replace(/\\e/g, "\x1b") : null,
        poll: parseInt(s.dataset.poll || "0", 10) || 0, dev: s.dataset.dev ? s.dataset.dev.split(/\s+/) : [],
        view: VIEWS[s.dataset.view] ? s.dataset.view : "normal", exp: s.dataset.acilim === "1",
        clock: triple(s.dataset.clock, CLOCK), date: triple(s.dataset.date, DATE),
        src: s.textContent.replace(/^\n/, "").replace(/\s+$/, "") + "\n" };
    });
    if (!examples.length) return;
    var slide = demo.closest(".ds-deck__slide");

    /* ---------- arayüz ---------- */
    var bar = el("div", "m-lab__bar");
    var pick = el("select");
    pick.setAttribute("aria-label", tx("Hazır örnek", "Preset example"));
    examples.forEach(function (ex, i) { var o = el("option", null, esc(ex.name)); o.value = i; pick.appendChild(o); });
    var btns = el("div", "m-lab__btns");
    var bEdit = btn("edit", tx("Düzenle", "Edit")), bRun = btn("run", tx("Çalıştır", "Run"), tx("Programı sonuna kadar çalıştır", "Run the program to the end"));
    var bBack = btn("back", tx("◀ Geri", "◀ Back"), tx("Bir adım geri", "One step back")), bStep = btn("step", tx("Adım ▶", "Step ▶"), tx("Bir komut yürüt", "Execute one instruction"));
    var bPlay = btn("play", tx("Oynat", "Play"), tx("Adımları otomatik oynat", "Play the steps automatically")), bReset = btn("reset", tx("Sıfırla", "Reset"), tx("Programı başa al", "Restart the program"));
    var speedSel = el("select", "m-lab__speed");
    speedSel.setAttribute("aria-label", tx("Oynat hızı: adım sıklığı ve saatin akışı bu katsayıyla ölçeklenir", "Play speed: the step rate and the clock are scaled by this factor"));
    speedSel.title = tx("Oynat hızı", "Play speed");
    SPEEDS.forEach(function (v) { var o = el("option", null, "×" + dec(v)); o.value = v; if (v === 1) o.selected = true; speedSel.appendChild(o); });
    [bEdit, bRun, bBack, bStep, bPlay, speedSel, bReset].forEach(function (b) { btns.appendChild(b); });
    bar.appendChild(pick); bar.appendChild(btns);

    var main = el("div", "m-lab__main");
    var pCode = el("div", "m-lab__panel");
    var codeHead = el("div", "m-lab__head");
    var codeTitle = el("p", "m-lab__title", tx("Kod", "Code"));
    var bExp = el("button", "m-lab__toggle", tx("Açılım", "Expansion"));
    bExp.type = "button"; bExp.setAttribute("aria-pressed", "false");
    bExp.title = tx("Makro açılımını göster ya da gizle", "Show or hide the macro expansion");
    codeHead.appendChild(codeTitle); codeHead.appendChild(bExp);
    var code = el("div", "m-lab__code");
    code.setAttribute("aria-label", tx("Program kodu", "Program code"));
    var src = el("textarea", "m-lab__src");
    src.spellcheck = false; src.hidden = true; src.setAttribute("aria-label", tx("Program kaynağı (düzenlenebilir)", "Program source (editable)"));
    var kbd = el("div", "m-lab__kbd");
    var kbdIn = el("input");
    kbdIn.type = "text"; kbdIn.setAttribute("aria-label", tx("Klavye girdisi: yazılan tuşlar programa gider (Enter, geri silme ve Esc de)", "Keyboard input: typed keys go to the program (Enter, Backspace and Esc too)"));
    kbdIn.placeholder = tx("tuş yaz", "type keys"); kbdIn.autocomplete = "off"; kbdIn.spellcheck = false;
    var kbdQ = el("span", "m-lab__queue");
    kbd.appendChild(el("b", null, tx("Girdi", "Input"))); kbd.appendChild(kbdIn); kbd.appendChild(kbdQ);
    pCode.appendChild(codeHead); pCode.appendChild(code); pCode.appendChild(src); pCode.appendChild(kbd);

    var pCpu = el("div", "m-lab__panel m-lab__mono");
    pCpu.appendChild(el("p", "m-lab__title", tx("Yazmaçlar", "Registers")));
    var regBox = el("div", "m-lab__regs"), pairBox = el("div", "m-lab__regs is-pair"), cells = {};
    GP.forEach(function (r) {
      regBox.appendChild(el("b", null, r));
      cells[r] = regBox.appendChild(el("span"));
      regBox.appendChild(el("b", null, r.charAt(0) + "H"));
      cells[r.charAt(0) + "H"] = regBox.appendChild(el("span", "is-half"));
      regBox.appendChild(el("b", null, r.charAt(0) + "L"));
      cells[r.charAt(0) + "L"] = regBox.appendChild(el("span", "is-half"));
    });
    PAIRS.forEach(function (p) {
      p.forEach(function (r) {
        pairBox.appendChild(el("b", null, r));
        cells[r] = pairBox.appendChild(el("span"));
      });
    });
    var flagBox = el("div", "m-lab__flags"), fcells = {};
    FL.forEach(function (f) {
      var s = el("span", null, "<b>" + f.charAt(0) + "</b><em></em>");
      s.title = f;
      fcells[f] = s;
      flagBox.appendChild(s);
    });
    var ipNote = el("p", "m-lab__ipnote");
    pCpu.appendChild(regBox); pCpu.appendChild(pairBox);
    pCpu.appendChild(el("p", "m-lab__title", tx("Bayraklar", "Flags"))).style.marginTop = "6px";
    pCpu.appendChild(flagBox); pCpu.appendChild(ipNote);

    var pSide = el("div", "m-lab__panel m-lab__mono");
    var memTitle = pSide.appendChild(el("p", "m-lab__title"));
    var memBox = pSide.appendChild(el("div", "m-lab__mem"));
    var stackTitle = pSide.appendChild(el("p", "m-lab__title m-lab__sub", tx("Yığın", "Stack") + " <b>SS:SP</b>"));
    var stackBox = pSide.appendChild(el("div", "m-lab__stack"));
    var scrTitle = pSide.appendChild(el("p", "m-lab__title m-lab__sub", tx("Çıktı", "Output")));
    var mini = pSide.appendChild(el("canvas", "m-lab__mini"));
    mini.setAttribute("aria-hidden", "true");
    var outBox = pSide.appendChild(el("div", "m-lab__out"));
    outBox.setAttribute("aria-live", "polite");
    var gfx = pSide.appendChild(el("canvas", "m-lab__gfx"));
    gfx.width = 640; gfx.height = 400; gfx.hidden = true;
    gfx.setAttribute("role", "img");
    var gfxBuf = null;
    var devTitle = pSide.appendChild(el("p", "m-lab__title m-lab__sub", tx("Aygıtlar", "Devices")));
    var devBox = pSide.appendChild(el("div", "m-lab__dev"));
    var devSvg = devBox.appendChild(el("div", "m-lab__devsvg"));
    var devCtl = devBox.appendChild(el("div", "m-lab__devctl"));
    var devPorts = devBox.appendChild(el("div", "m-lab__ports"));
    var devOut = devBox.appendChild(el("p", "m-lab__devout"));
    main.appendChild(pCode); main.appendChild(pCpu); main.appendChild(pSide);

    var status = el("p", "m-lab__status");
    status.setAttribute("aria-live", "polite");
    demo.appendChild(bar); demo.appendChild(main); demo.appendChild(status);

    /* ---------- durum ---------- */
    var ex = examples[0], text = "", prog = null, mach = null, n = 0, rec = null, done = null, err = null, timer = null, editing = false;
    var memBase = 0, memSeg = null, rows = [], varAt = {}, init = null, showExp = false, hasExp = false;
    var typed = "", waiting = null, resume = null, stackTag = {}, inLog = {}, inIdx = {}, adj = {}, gauge = null, view = VIEWS.normal;
    var chW = 0;
    /* zaman: tlog[k] = (k+1). adımdan önceki sanal zaman (µs); Geri ile yeniden yürütmede aynı değerler kullanılır */
    var playing = false, speed = 1, tlog = [], tRef = 0, mode = "step", stepReady = null, lastPix = null;

    /* örnek etiketindeki data-init: {"mem": {"DS:0500h": ["25h", "17h"]}} ya da {"mem": {"DS:0200h": "ABC"}} */
    function initNote() {
      if (!init || !init.mem) return "";
      return Object.keys(init.mem).map(function (k) {
        var v = init.mem[k], bytes = typeof v === "string" ? v.split("").map(function (c) { return c.charCodeAt(0); }) :
          (Array.isArray(v) ? v : [v]).map(num);
        return esc(k) + " = " + bytes.map(function (x) { return h2(x) + "h"; }).join(", ") + (typeof v === "string" ? " ('" + esc(v) + "')" : "");
      }).join("; ");
    }
    function initBase() {
      if (!init || !init.mem) return null;
      var mm = /:\s*([0-9A-F]+)h?$/i.exec(Object.keys(init.mem)[0]);
      return mm ? parseInt(mm[1], 16) : null;
    }
    /* port girdileri: sabit, dizi, {"ilk": v} (sonra son OUT), {"ayar": v} (kaydırıcı; değerler Geri için kaydedilir) */
    function buildPorts() {
      var out = {};
      if (!ex.ports) return out;
      Object.keys(ex.ports).forEach(function (k) {
        var p = /^\d+$/.test(k) ? +k : M.parseNumber(k), v = ex.ports[k];
        if (Array.isArray(v)) out[p] = v.map(num);
        else if (v && typeof v === "object" && v.ilk != null) {
          var first = num(v.ilk);
          out[p] = function (pp, m) { return Object.prototype.hasOwnProperty.call(m.portLast, pp) ? m.portLast[pp] : first; };
        } else if (v && typeof v === "object" && v.ayar != null) {
          inIdx[p] = 0;
          out[p] = function (pp) {
            var log = inLog[pp] || (inLog[pp] = []);
            if (inIdx[pp] >= log.length) log.push(adj[pp]);
            var t = log[inIdx[pp]++];
            return t & 0xFF;
          };
        } else out[p] = num(v);
      });
      return out;
    }
    function adjustables() {
      var r = [];
      if (ex.ports) Object.keys(ex.ports).forEach(function (k) {
        var v = ex.ports[k];
        if (v && typeof v === "object" && v.ayar != null) r.push({ port: /^\d+$/.test(k) ? +k : M.parseNumber(k), v: v });
      });
      return r;
    }
    function setupDevCtl() {
      devCtl.innerHTML = "";
      adj = {}; inLog = {};
      adjustables().forEach(function (a) {
        adj[a.port] = num(a.v.ayar);
        var lab = el("label", "m-lab__adj");
        var name = el("span", null, esc(a.v.ad || ("port " + a.port)));
        var rng = el("input");
        rng.type = "range"; rng.min = a.v.min != null ? a.v.min : -40; rng.max = a.v.max != null ? a.v.max : 120; rng.value = adj[a.port];
        rng.setAttribute("aria-label", (a.v.ad || "port " + a.port) + tx(" değeri", " value"));
        var val = el("b", "m-lab__mono", sd(adj[a.port]));
        rng.addEventListener("input", function () {
          adj[a.port] = parseInt(rng.value, 10);
          val.textContent = sd(adj[a.port]);
          var log = inLog[a.port];
          if (log) log.length = inIdx[a.port] || 0;   /* sonraki IN okumaları yeni değeri alır */
          render();
        });
        lab.appendChild(name); lab.appendChild(rng); lab.appendChild(val);
        devCtl.appendChild(lab);
      });
    }
    function needsInput() {
      return ex.input != null || /\bint\s+16h|\bscan_num\b|\bget_string\b/i.test(text) ||
        (/\bint\s+21h/i.test(text) && /\bah\s*,\s*(0?[178]h?|0?0ah)\b/i.test(text)) || !!waiting;
    }
    function applyView() {
      view = VIEWS[ex.view] || VIEWS.normal;
      memBox.dataset.rows = view.mem;
      stackTitle.hidden = stackBox.hidden = !view.stack;
      scrTitle.hidden = outBox.hidden = !view.scr;
      mini.hidden = !view.mini;
      devTitle.hidden = devBox.hidden = !view.dev;
      if (view.scr) scrTitle.textContent = scrLabel(view.scr);
      demo.classList.toggle("is-ekran", !!view.mini);
      demo.classList.toggle("is-aygit", !!view.dev);
    }
    function load(source, keepEx) {
      text = source;
      stop();
      prog = null; err = null;
      try { prog = M.assemble(text); }
      catch (e) {
        if (!(e instanceof M.AsmError)) throw e;
        err = { asm: true, line: e.line, msg: e.msg };
      }
      varAt = {};
      if (prog) {
        for (var k in prog.syms) {
          var y = prog.syms[k];
          if (y.kind !== "var") continue;
          var ph0 = (prog.segs[y.seg].para << 4) + y.off;
          for (var i = 0; i < y.size * y.length; i++) varAt[ph0 + i] = (prog.rawName[k] || k) + (i ? "+" + i : "");
        }
      }
      hasExp = !!(prog && prog.lines.some(function (l) { return l.macro && l.macro !== "emu8086.inc"; }));
      if (!keepEx) showExp = ex.exp && hasExp;
      bExp.hidden = !hasExp;
      bExp.setAttribute("aria-pressed", showExp ? "true" : "false");
      drawCode();
      reset(true);
    }
    function firstVar() {
      var best = null;
      for (var k in prog.syms) { var y = prog.syms[k]; if (y.kind === "var" && (best == null || y.off < best)) best = y.off; }
      return best == null ? 0x100 : best;
    }
    /* full: girdi ve ayar kayıtları da silinir (Sıfırla, örnek değişimi); Geri yeniden yürütmesinde korunur */
    function reset(full) {
      stop();
      n = 0; rec = null; done = null; waiting = null; resume = null; stackTag = {};
      if (full) { typed = ""; tlog = []; for (var k in inLog) inLog[k] = []; }
      for (var p in inIdx) inIdx[p] = 0;
      gauge = { a: 0, sel: 0, shown: [0, 0, 0, 0] }; stepReady = null; lastPix = null;
      if (err && err.asm) { mach = null; render(); return; }
      err = null;
      var o = { cxSize: true, repStep: true, init: init || undefined, input: (ex.input || "") + typed, ports: buildPorts(),
        clock: ex.clock, date: ex.date, pollDelay: ex.poll };
      try { mach = new M.Machine(prog, o); }
      catch (e) { if (!(e instanceof M.EmuError)) throw e; delete o.init; mach = new M.Machine(prog, o); }
      var ib = initBase();
      memSeg = null;
      memBase = Math.max(0, ((ib != null ? ib : firstVar()) & ~7));
      if (prog.com && ex.view === "kesme") stackTag[mach.initSp & 0xFFFF] = tx("DOS dönüşü", "DOS return");
      render();
    }
    /* bir adım; false: ilerlenemedi */
    function stepOnce() {
      if (!mach || done || (err && !err.soft)) return false;
      /* sanal saat: Oynat kipinde gerçek zaman (× hız) eklenir; diğer kiplerde kayıtlı değer ya da olduğu gibi */
      if (playing) {
        var now = performance.now();
        if (now > tRef) { mach.us += Math.round((now - tRef) * 1000 * speed); tRef = now; }
        tlog.length = n; tlog[n] = mach.us;
      } else if (tlog[n] != null) mach.us = tlog[n];
      else tlog[n] = mach.us;
      mach.syncTicks();
      try {
        var r = mach.stepRecord();
        if (r == null) { done = mach.halted; return false; }
        rec = r; n++; waiting = null;
        r.kip = playing ? "play" : mode; r.speed = speed;
        r.mem.forEach(function (w) { if (w[0] >= 0xA0000 && w[0] < 0xA0000 + 64000) lastPix = w[0] - 0xA0000; });
        if (playing && r.svc && r.svc.wait) tRef = performance.now() + r.svc.wait / 1000 / speed;
        if (err && err.soft) err = null;
        if (mach.halted) done = mach.halted;
        followMem(r); tagStack(r); devices(r);
        return true;
      } catch (e) {
        if (e instanceof M.InputWait) { waiting = { what: e.what }; return false; }
        if (!(e instanceof M.EmuError)) throw e;
        err = { msg: e.message };
        return false;
      }
    }
    var STACKY = { PUSH: 1, POP: 1, PUSHF: 1, POPF: 1, CALL: 1, RET: 1, RETN: 1, RETF: 1, INT: 1, IRET: 1, INTO: 1, _BIOS: 1 };
    function followMem(r) {
      if (!r.st || STACKY[r.st.op]) return;
      var hit = null, VID = 0xB8000;
      r.mem.forEach(function (w) { if (hit == null && !(w[0] >= VID && w[0] < VID + 4000 && view.scr === "Ekran")) hit = [w[1], w[2]]; });
      r.pre.forEach(function (p) { if (hit == null && p.ea) hit = p.ea; });
      if (hit == null) return;
      var seg = hit[0] === mach.s[3] ? null : hit[0], off = hit[1];
      if (seg !== memSeg || off < memBase || off >= memBase + 8 * view.mem) memBase = Math.max(0, (off & ~7) - (view.mem > 3 ? 8 : 0));
      memSeg = seg;
    }
    /* yığın sözcüklerine kim itti: INT/bölme hatası → IP, CS, FLAGS; CALL → dönüş; PUSH → yazmaç adı */
    function tagStack(r) {
      var st = r.st, sp = r.regs.SP, op = st.op;
      if (r.irq) {
        var nm = "INT " + h2(r.irq.n) + "h";
        stackTag[sp] = nm + ": IP"; stackTag[(sp + 2) & 0xFFFF] = nm + ": CS"; stackTag[(sp + 4) & 0xFFFF] = nm + ": FLAGS";
      } else if (op === "CALL") {
        if (st.far) { stackTag[sp] = tx("dönüş IP", "return IP"); stackTag[(sp + 2) & 0xFFFF] = tx("dönüş CS", "return CS"); }
        else stackTag[sp] = tx("dönüş adresi", "return address");
      } else if (op === "PUSH") stackTag[sp] = st.ops[0].kind === "imm" ? tx("sabit", "immediate") : (st.ops[0].reg || st.ops[0].text);
      else if (op === "PUSHF") stackTag[sp] = "FLAGS";
    }
    /* aygıt durumları port yazımlarından */
    function devices(r) {
      if (r.st && r.st.op === "IN" && r.info && r.info.port === 7) stepReady = (r.info.v >> 7) & 1;
      if (!r.st || r.st.op !== "OUT" || !r.info) return;
      var p = r.info.port, v = r.info.v;
      if (p === 0x310) {
        gauge.a = v & 0xFF;
        for (var i = 0; i < 4; i++) if ((gauge.sel >> i) & 1) gauge.shown[i] = gauge.a;
      } else if (p === 0x312) {
        gauge.sel = v & 0x0F;
        for (var j = 0; j < 4; j++) if ((gauge.sel >> j) & 1) gauge.shown[j] = gauge.a;
      }
    }
    function goTo(k) {
      var keepBase = memBase, keepSeg = memSeg;
      reset(false);
      while (n < k && stepOnce()) { /* yeniden yürüt */ }
      if (k > 0) { memBase = keepBase; memSeg = keepSeg; }
      render();
    }
    function stop() {
      if (!playing) return;
      clearTimeout(timer); timer = null; playing = false;
      bPlay.textContent = tx("Oynat", "Play"); bPlay.setAttribute("aria-label", tx("Adımları otomatik oynat", "Play the steps automatically"));
    }
    /* Oynat: adımlar PLAY_MS / hız arayla; INT 15h/86h beklemesi gerçek zamanda (bekleme / hız) sürer */
    function schedule(ms) {
      timer = setTimeout(function () {
        if (!playing) return;
        if (!slide.classList.contains("is-active")) { stop(); render(); return; }
        var ok = stepOnce();
        if (!ok && !waiting) stop();
        else if (done || (err && !err.soft)) stop();
        render();
        if (!playing) return;
        var next = PLAY_MS / speed;
        if (ok && rec && rec.svc && rec.svc.wait) next = Math.max(next, rec.svc.wait / 1000 / speed);
        schedule(next);
      }, ms);
    }
    function play() {
      if (playing) { stop(); resume = null; render(); return; }
      if (done || (err && !err.soft)) reset(true);
      resume = "play"; playing = true; tRef = performance.now();
      bPlay.textContent = tx("Durdur", "Stop"); bPlay.setAttribute("aria-label", tx("Otomatik oynatmayı durdur", "Stop autoplay"));
      schedule(PLAY_MS / speed);
    }
    function runAll() {
      if (editing) setEditing(false);
      stop();
      if (err && err.asm) return;
      if (done || (err && !err.soft)) reset(true);
      var k = 0;
      resume = "run"; mode = "run";
      while (k++ < MAX_RUN && stepOnce()) {
        if (mach.pollEmpty && !mach.input.length) { waiting = { poll: true }; break; }
      }
      if (!done && !err && !waiting) err = { msg: tx(MAX_RUN + " adımda bitmedi; sonsuz döngü olabilir. Adım, Geri ya da Sıfırla ile incelenebilir",
          "Not finished after " + MAX_RUN + " steps; this may be an infinite loop. Inspect it with Step, Back or Reset") +
        (/\bint\s+1ah|\b0*6ch\b/i.test(text) ? tx(". Saat Çalıştır kipinde yalnız INT 15h beklemeleriyle ilerler; saati bekleyen döngü Oynat kipinde gerçek zamanla biter",
          ". In Run mode the clock advances only through INT 15h waits; a loop that waits for the clock finishes in Play mode in real time") : ""), soft: true };
      render();
    }
    function setEditing(on) {
      if (on) {
        editing = true; stop();
        src.value = text; src.hidden = false; code.hidden = true;
        codeTitle.textContent = tx("Kod (düzenleniyor)", "Code (editing)");
        bEdit.textContent = tx("Bitti", "Done");
        render();
        src.focus();
      } else {
        editing = false;
        src.hidden = true; code.hidden = false;
        bEdit.textContent = tx("Düzenle", "Edit");
        if (src.value !== text) load(src.value.replace(/\s+$/, "") + "\n", true); else render();
      }
    }
    /* klavye: yazılan her tuş kuyruğa eklenir; program bekliyorsa kaldığı kipte sürer */
    function pushKey(ch) {
      typed += ch;
      if (mach) mach.input.push(ch);
      if (waiting && mach && !done) {
        var how = resume;
        if (how === "run") { runAll(); return; }
        if (how !== "play") stepOnce();
      }
      render();
    }
    kbdIn.addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      var map = { Enter: "\r", Backspace: "\b", Escape: "\x1b" }, ch = null;
      if (map[e.key]) ch = map[e.key];
      else if (e.key.length === 1) ch = e.key;
      if (ch == null) return;
      e.preventDefault();
      if (editing || !mach) return;
      var code8 = ch.charCodeAt(0);
      if (code8 > 255) ch = "?";
      pushKey(ch);
    });
    kbdIn.addEventListener("input", function () {   /* dokunmatik klavyeler keydown göndermeyebilir */
      var v = kbdIn.value;
      kbdIn.value = "";
      if (!mach || editing) return;
      for (var i = 0; i < v.length; i++) pushKey(v.charCodeAt(i) > 255 ? "?" : v.charAt(i));
    });

    /* ---------- çizim ---------- */
    function drawCode() {
      code.innerHTML = "";
      rows = [];
      var lines = text.replace(/\n$/, "").split("\n"), exp = {};
      if (prog && showExp) prog.lines.forEach(function (l) {
        if (!l.macro || l.macro === "emu8086.inc") return;
        (exp[l.anchor] = exp[l.anchor] || []).push(l);
      });
      lines.forEach(function (ln, i) {
        var d = el("div", "m-lab__ln", "<i>" + (i + 1) + "</i><span>" + (esc(ln) || " ") + "</span>");
        code.appendChild(d); rows.push({ el: d, no: i + 1, eid: null });
        (exp[i + 1] || []).forEach(function (l) {
          var t = l.text.replace(/^\s+/, "");
          var e = el("div", "m-lab__ln is-exp", "<i>+</i><span>" + esc(t) + "</span>");
          e.title = l.macro + tx(" açılımı", " expansion");
          code.appendChild(e); rows.push({ el: e, no: i + 1, eid: l.eid });
        });
      });
      code.classList.toggle("has-exp", showExp);
    }
    function rowOf(st) {
      if (!st) return null;
      if (showExp && st.macro && st.macro !== "emu8086.inc") for (var i = 0; i < rows.length; i++) if (rows[i].eid === st.eid) return rows[i];
      for (var j = 0; j < rows.length; j++) if (rows[j].eid == null && rows[j].no === st.line) return rows[j];
      return null;
    }
    function curStmt() {
      if (!mach || done) return null;
      try { return prog.code[mach.phys(mach.s[1], mach.ip)] || null; } catch (e) { return null; }
    }
    function segName(seg) {
      if (seg == null) return "DS = " + h4(mach.s[3]) + "h";
      var nm = ["DS", "ES", "SS", "CS"].filter(function (k) { return mach.get(k) === seg; })[0];
      return nm ? nm + " = " + h4(seg) + "h" : tx("kesim ", "segment ") + h4(seg) + "h";
    }
    function memNote(seg) {
      if (seg === 0 && memBase < 0x400) return " · IVT";
      if (seg === 0xB800) return tx(" · ekran", " · screen");
      if (seg === 0xA000) return tx(" · grafik", " · graphics");
      if (seg === 0x40 || (seg === 0 && memBase >= 0x400 && memBase < 0x500)) return tx(" · BIOS verileri", " · BIOS data");
      return "";
    }
    /* mod 13h: A000h belleği 320×200 tuvale (2 kat), son adımda yazılan piksel halkayla işaretlenir */
    function drawGfx() {
      if (!gfxBuf) { gfxBuf = document.createElement("canvas"); gfxBuf.width = 320; gfxBuf.height = 200; }
      var bctx = gfxBuf.getContext("2d"), img = bctx.createImageData(320, 200), d = img.data, mem = mach.mem, cnt = 0, i, c, v;
      for (i = 0; i < 64000; i++) {
        v = mem[0xA0000 + i]; c = PAL[v];
        if (v) cnt++;
        d[4 * i] = c[0]; d[4 * i + 1] = c[1]; d[4 * i + 2] = c[2]; d[4 * i + 3] = 255;
      }
      bctx.putImageData(img, 0, 0);
      var g = gfx.getContext("2d");
      g.imageSmoothingEnabled = false;
      g.drawImage(gfxBuf, 0, 0, 640, 400);
      /* son yazılan piksel: bu adımda yazıldıysa dolu halka, daha önce yazıldıysa ince halka */
      var last = lastPix, now = !!(rec && rec.mem.some(function (w) { return w[0] >= 0xA0000 && w[0] < 0xA0000 + 64000; }));
      if (last != null) {
        var x = last % 320, y = Math.floor(last / 320), cs = getComputedStyle(demo);
        g.lineWidth = now ? 8 : 5; g.strokeStyle = "rgba(0,0,0,.75)";
        g.beginPath(); g.arc(2 * x + 1, 2 * y + 1, 17, 0, 2 * Math.PI); g.stroke();
        g.lineWidth = now ? 4 : 2; g.strokeStyle = cs.getPropertyValue("--ds-look").trim() || "orange";
        g.beginPath(); g.arc(2 * x + 1, 2 * y + 1, 17, 0, 2 * Math.PI); g.stroke();
      }
      gfx.setAttribute("aria-label", tx("Mod 13h ekranı, 320×200: ", "Mode 13h screen, 320×200: ") + cnt + tx(" piksel siyahtan farklı", " non-black pixels") +
        (last != null ? tx("; son yazılan piksel (", "; last pixel written (") + (last % 320) + ", " + Math.floor(last / 320) + ")" : ""));
    }
    gfx.addEventListener("mousemove", function (e) {
      if (!mach) return;
      var b = gfx.getBoundingClientRect(), s = Math.min(b.width / 320, b.height / 200), ox = (b.width - 320 * s) / 2, oy = (b.height - 200 * s) / 2;
      var x = Math.floor((e.clientX - b.left - ox) / s), y = Math.floor((e.clientY - b.top - oy) / s);
      if (x < 0 || y < 0 || x >= 320 || y >= 200) { gfx.title = ""; return; }
      var v = mach.mem[0xA0000 + y * 320 + x];
      gfx.title = "(" + x + ", " + y + ") · A000:" + h4(y * 320 + x) + "h = " + h2(v) + "h (" + M.colorName(v) + ")";
    });
    function renderScreen() {
      if (!chW) {
        var probe = el("span", null, "0000000000");
        probe.style.visibility = "hidden"; probe.style.position = "absolute";
        outBox.appendChild(probe); chW = probe.getBoundingClientRect().width / 10 || 7; outBox.removeChild(probe);
      }
      var base = 0xB8000, mem = mach.mem, cols = Math.max(8, Math.floor((outBox.clientWidth - 8) / chW));
      var lh = parseFloat(getComputedStyle(outBox).lineHeight) || 16, nrows = Math.max(1, Math.floor((outBox.clientHeight - 4) / lh));
      var maxRow = mach.cursor[0], maxCol = mach.cursor[1], r, c, any = false;
      for (r = 0; r < 25; r++) for (c = 0; c < 80; c++) {
        var ch = mem[base + 2 * (r * 80 + c)];
        if (ch !== 0x20 && ch !== 0) { any = true; if (r > maxRow) maxRow = r; if (c > maxCol) maxCol = c; }
      }
      var r0 = Math.max(0, maxRow - nrows + 1), c0 = maxCol >= cols ? maxCol - cols + 2 : 0, newCell = {};
      if (rec) {
        (rec.video || []).forEach(function (i) { newCell[i] = 1; });
        rec.mem.forEach(function (w) { if (w[0] >= base && w[0] < base + 4000) newCell[(w[0] - base) >> 1] = 1; });
      }
      var html = "";
      for (r = r0; r < Math.min(25, r0 + nrows); r++) {
        var line = "";
        for (c = c0; c < Math.min(80, c0 + cols); c++) {
          var a = base + 2 * (r * 80 + c), code8 = mem[a], at = mem[a + 1], chs = code8 < 32 || code8 > 126 ? " " : String.fromCharCode(code8);
          var cls = (r === mach.cursor[0] && c === mach.cursor[1] ? "is-cur " : "") + (newCell[r * 80 + c] ? "is-new" : "");
          var sty = attrStyle(at);
          if (cls || sty) line += '<span' + (cls ? ' class="' + cls.trim() + '"' : "") + (sty ? ' style="' + sty + '" title="' + esc(attrName(at)) + '"' : "") + ">" + esc(chs) + "</span>";
          else line += esc(chs);
        }
        html += "<div>" + line + "</div>";
      }
      outBox.innerHTML = html;
      outBox.dataset.empty = any ? "0" : "1";
      outBox.title = tx("Satır ", "Rows ") + r0 + "–" + Math.min(24, r0 + nrows - 1) + tx(", sütun ", ", columns ") + c0 + "–" + Math.min(79, c0 + cols - 1) + tx("; imleç (", "; cursor (") + mach.cursor[0] + ", " + mach.cursor[1] + ")";
      if (view.mini) drawMini(r0, c0, nrows, cols);
    }
    function drawMini(r0, c0, nrows, cols) {
      var dpr = window.devicePixelRatio || 1, W = 160, H = 50;
      if (mini.width !== W * dpr) { mini.width = W * dpr; mini.height = H * dpr; }
      var g = mini.getContext("2d"), cs = getComputedStyle(demo), cache = {};
      function col(tok) { return cache[tok] || (cache[tok] = cs.getPropertyValue(tok).trim() || "gray"); }
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.fillStyle = col("--ds-bg"); g.fillRect(0, 0, W, H);
      var base = 0xB8000, mem = mach.mem;
      for (var r = 0; r < 25; r++) for (var c = 0; c < 80; c++) {
        var a = base + 2 * (r * 80 + c), ch = mem[a], at = mem[a + 1], bg = BG[(at >> 4) & 7];
        if (bg) { g.fillStyle = col(bg); g.fillRect(c * 2, r * 2, 2, 2); }
        if (ch !== 0x20 && ch !== 0) {
          var fg = at === 0x07 ? "--ds-text" : FG[at & 15];
          if (bg && (fg === bg || (at & 7) === 7)) fg = "--ds-bg";
          g.fillStyle = col(fg); g.fillRect(c * 2, r * 2, 2, 2);
        }
      }
      g.strokeStyle = col("--ds-muted"); g.lineWidth = 1;
      g.strokeRect(c0 * 2 + 0.5, r0 * 2 + 0.5, Math.min(80 - c0, cols) * 2 - 1, Math.min(25 - r0, nrows) * 2 - 1);
      g.fillStyle = col("--ds-look-ink"); g.fillRect(mach.cursor[1] * 2, mach.cursor[0] * 2 + 1, 2, 1);
    }
    function renderDevices() {
      var html = [], h = 150 - 22 * adjustables().length;
      if (ex.dev.indexOf("trafik") >= 0) html.push(trafficSvg((mach.portLast[4] || 0) | ((mach.portLast[5] || 0) << 8), h));
      if (ex.dev.indexOf("led") >= 0) html.push(ledSvg((mach.portLast[199] || 0) | ((mach.portLast[200] || 0) << 8), Math.min(h, 96)));
      if (ex.dev.indexOf("gosterge") >= 0) html.push(gaugeSvg(gauge, Math.min(h, 96)));
      if (ex.dev.indexOf("termometre") >= 0) {
        var tp = adjustables()[0], t = tp ? adj[tp.port] : 0;
        html.push(thermoSvg(t, mach.portLast[127] || 0, h));
      }
      if (ex.dev.indexOf("step") >= 0) html.push(stepperSvg(M.stepper(mach.portWrites), stepReady, Math.min(h, 150)));
      if (ex.dev.indexOf("yazici") >= 0) html.push(paperSvg(M.printerPaper(mach.printer), Math.min(h - 46, 108)));
      devSvg.innerHTML = html.join("");
      /* port özeti: son yazılan ve okunan değerler */
      var seen = {}, list = [];
      for (var i = mach.portWrites.length - 1; i >= 0 && list.length < 4; i--) {
        var w = mach.portWrites[i];
        if (seen[w[1]]) continue;
        seen[w[1]] = 1;
        list.push("<span>" + hp(w[1]) + " ← " + (w[3] === 2 ? hx(w[2]) : hx(w[2], 1)) + "</span>");
      }
      if (rec && rec.st && rec.st.op === "IN" && rec.info) list.unshift('<span class="is-in">' + hp(rec.info.port) + " → " + hx(rec.info.v, rec.st.ops[0].size) + "</span>");
      devPorts.innerHTML = list.length ? list.join("") : ex.dev.join() === "yazici" ? "" : '<span class="is-none">' + tx("henüz port erişimi yok", "no port access yet") + "</span>";
      /* aygıt düzeninde ekran çıktısı (INT 21h/09h gibi) tek satırda */
      var o = mach.out.split(/[\r\n]/).filter(function (x) { return x.trim(); }).pop() || "";
      devOut.hidden = !o;
      devOut.innerHTML = o ? "<b>" + tx("Ekran", "Screen") + "</b> " + esc(o.length > 46 ? "…" + o.slice(-45) : o) : "";
    }
    function timeNote() {
      if (!rec || !rec.svc || rec.svc.wait == null) return "";
      var w = rec.svc.wait;
      if (rec.kip === "play") return tx(" Oynat kipinde bu bekleme gerçek zamanda ", " In Play mode this wait takes ") + M.secText(Math.round(w / rec.speed)) + tx(" sürer", " in real time") +
        (rec.speed !== 1 ? tx(" (hız ×", " (speed ×") + dec(rec.speed) + ")" : "") + ".";
      if (EN) return " In " + (rec.kip === "run" ? "Run" : "Step") + " mode the wait completes in a single step: " + M.trNum(w) + " µs are counted as elapsed.";
      return " " + (rec.kip === "run" ? "Çalıştır" : "Adım") + " kipinde bekleme tek adımda tamamlanır: " + M.trNum(w) + " µs geçmiş sayılır.";
    }
    function printerNote() {
      if (ex.dev.indexOf("yazici") < 0 || !rec || !rec.st || rec.st.op !== "INT" || rec.irq || (rec.before.regs.AX >> 8) !== 5) return "";
      if (!rec.st.ops[0] || rec.st.ops[0].val !== 0x21) return "";
      var c = rec.before.regs.DX & 0xFF, txt = mach.printer, pb = M.printerPaper(txt.slice(0, -1)), pa = M.printerPaper(txt);
      if (c === 13) return tx(" Yazıcı kafası satırın başına döner (CR); kâğıt ilerlemez.", " The print head returns to the start of the line (CR); the paper does not advance.");
      if (c === 10) return tx(" Kâğıt bir satır ilerler (LF); kafa aynı sütunda kalır.", " The paper advances one line (LF); the head stays in the same column.");
      if (c === 9) return tx(" Kafa sonraki sekme durağına, " + (pa.col + 1) + ". sütuna atlar (HT).", " The head jumps to the next tab stop, column " + (pa.col + 1) + " (HT).");
      if (c === 12) return pb.lines.join("").trim() ? tx(" Sayfa yazıcıdan çıkar (FF); yeni sayfa başlar.", " The page is ejected from the printer (FF); a new page begins.") :
        tx(" Kâğıt boş olduğu için yalnız yeni sayfanın başına geçilir (FF).", " The paper is blank, so the head only moves to the top of a new page (FF).");
      if (c < 32) return tx(" Bu denetim karakteri kâğıtta iz bırakmaz.", " This control character leaves no mark on the paper.");
      var old = (pb.lines[pb.row] || "").charAt(pb.col);
      if (EN) return " It is printed on the paper at line " + (pb.row + 1) + ", column " + (pb.col + 1) +
        (old && old !== " " ? "; '" + old + "' was already there, so the new character is printed over it" : "") + ".";
      return " Kâğıtta " + (pb.row + 1) + ". satır, " + (pb.col + 1) + ". sütuna basılır" +
        (old && old !== " " ? "; orada önceden '" + old + "' vardı, yeni karakter onun üzerine basılır" : "") + ".";
    }
    function devNote() {
      var tn = timeNote() + printerNote();
      if (!rec || !rec.st || !rec.info) return tn;
      var p = rec.info.port;
      if (p === 7 && ex.dev.indexOf("step") >= 0) {
        if (rec.st.op === "IN") return (rec.info.v & 0x80 ? tx(" Bit 7 = 1: motor yeni bayta hazır.", " Bit 7 = 1: the motor is ready for a new byte.") : tx(" Bit 7 = 0: motor meşgul; durum yeniden okunur.", " Bit 7 = 0: the motor is busy; the status is read again."));
        var sa = M.stepper(mach.portWrites), sb = M.stepper(mach.portWrites.slice(0, -1));
        /* stepper kind değerleri Mini8086'nın iç anahtarlarıdır (Türkçe); İngilizcede burada çevrilir */
        if (sa.kind === "ilk") return tx(" Step motor: " + bin3(sa.mag) + " mıknatısları açılır; mil " + deg(sa.half) + " konumunda kilitlenir.", " Stepper motor: magnets " + bin3(sa.mag) + " are energized; the shaft locks at " + deg(sa.half) + ".");
        if (sa.kind === "aynı") return tx(" Mıknatıs düzeni (" + bin3(sa.mag) + ") değişmediği için mil kıpırdamaz.", " The magnet pattern (" + bin3(sa.mag) + ") is unchanged, so the shaft does not move.");
        if (sa.kind === "tablo dışı") return tx(" " + bin3(sb.mag) + " → " + bin3(sa.mag) + " geçişi emu8086 örneğinin tablolarında yok; laboratuvarda mil yerinde kalır (" + deg(sa.half) + ").",
          " The transition " + bin3(sb.mag) + " → " + bin3(sa.mag) + " is not in the emu8086 example's tables; in the lab the shaft stays put (" + deg(sa.half) + ").");
        var KIND_EN = { "saat yönünde yarım adım": "half step clockwise", "saat yönünün tersine yarım adım": "half step counterclockwise",
          "saat yönünde tam adım": "full step clockwise", "saat yönünün tersine tam adım": "full step counterclockwise" };
        if (EN) return " Magnets " + bin3(sb.mag) + " → " + bin3(sa.mag) + ": " + (KIND_EN[sa.kind] || sa.kind) + " (" + (sa.delta > 0 ? "+" : "−") + dec(Math.abs(sa.delta) * 11.25) + "°); shaft at " + deg(sa.half) + ".";
        return " Mıknatıslar " + bin3(sb.mag) + " → " + bin3(sa.mag) + ": " + sa.kind + " (" + (sa.delta > 0 ? "+" : "−") + String(Math.abs(sa.delta) * 11.25).replace(".", ",") + "°); mil " + deg(sa.half) + ".";
      }
      if (rec.st.op === "OUT") {
        if (p === 4 && ex.dev.indexOf("trafik") >= 0) return " " + trafficText(rec.info.v);
        if (p === 199 && ex.dev.indexOf("led") >= 0) { var v = rec.info.v; return tx(" LED göstergede ", " The LED display shows ") + sd(v & 0x8000 ? v - 0x10000 : v) + tx(" görünür (işaretli onluk).", " (signed decimal)."); }
        if (p === 127 && ex.dev.indexOf("termometre") >= 0) return tx(" Isıtıcı " + (rec.info.v ? "açılır." : "kapanır."), " The heater turns " + (rec.info.v ? "on." : "off."));
        if (p === 0x310 && ex.dev.indexOf("gosterge") >= 0) return tx(" Port A bölüt desenini (" + h2(rec.info.v) + "h) taşır; hane seçimi açık olan hanede görünür.", " Port A carries the segment pattern (" + h2(rec.info.v) + "h); it shows on the selected digit.");
        if (p === 0x312 && ex.dev.indexOf("gosterge") >= 0) return rec.info.v & 15 ? tx(" Port C'de bit " + Math.log2(rec.info.v & 15) + " = 1: yalnız o hane yanar.", " Bit " + Math.log2(rec.info.v & 15) + " of port C = 1: only that digit lights up.") :
          tx(" Port C = 0: bütün haneler sönük.", " Port C = 0: all digits are off.");
      }
      if (rec.st.op === "IN" && p === 125 && ex.dev.indexOf("termometre") >= 0) {
        var t = rec.info.v & 0x80 ? rec.info.v - 256 : rec.info.v;
        return tx(" Termometre ", " The thermometer reads ") + sd(t) + tx(" °C gösteriyor", " °C") + (t < 0 ? tx(" (işaretli bayt ", " (signed byte ") + h2(rec.info.v) + "h)" : "") + ".";
      }
      return tn;
    }
    function render() {
      var regs = mach ? mach.regs() : null, before = rec ? rec.before : null;
      /* kod */
      var cur = rowOf(curStmt()), prev = rec && rec.st ? rowOf(rec.st) : null, errLine = err && err.asm ? err.line : 0;
      rows.forEach(function (r) {
        r.el.classList.toggle("is-current", r === cur);
        r.el.classList.toggle("is-prev", r === prev && r !== cur);
        r.el.classList.toggle("is-error", !!errLine && r.eid == null && r.no === errLine);
      });
      var focus = (cur || prev || (errLine && rows.filter(function (r) { return r.eid == null && r.no === errLine; })[0]) || rows[0] || {}).el;
      if (focus && !code.hidden) {
        var top = focus.offsetTop - code.offsetTop, lh = focus.offsetHeight;
        if (top < code.scrollTop + lh || top + 3 * lh > code.scrollTop + code.clientHeight) code.scrollTop = Math.max(0, Math.round((top - code.clientHeight / 3) / lh) * lh);
      }
      if (!editing) codeTitle.innerHTML = tx("Kod", "Code") + (prog ? " · <b>" + prog.image.reduce(function (a, im) { return a + im[1].length; }, 0) + tx(" bayt</b>", " bytes</b>") : "");
      kbd.hidden = !needsInput();
      kbd.classList.toggle("is-wait", !!waiting);
      if (!kbd.hidden) {
        var all = mach ? (ex.input || "") + typed : "", used = mach ? mach.keysRead : 0, q = "";
        var from = Math.max(0, all.length - 14);
        for (var i = from; i < all.length; i++) q += '<span class="' + (i < used ? "is-used" : "") + '">' + esc(keyGlyph(all.charAt(i))) + "</span>";
        kbdQ.innerHTML = q || '<span class="is-none">' + tx("kuyruk boş", "queue empty") + "</span>";
        kbdQ.title = tx("Okunan tuşlar soluk, sıradakiler koyu gösterilir.", "Keys already read are dimmed; pending keys are shown in bold.");
      }
      /* yazmaçlar */
      function put(name, v, w, old) {
        var c = cells[name];
        if (!c) return;
        c.textContent = v == null ? "····" : (w === 1 ? h2(v) : h4(v));
        c.classList.toggle("is-changed", old != null && v != null && old !== v);
      }
      GP.concat(["SI", "DI", "BP", "SP", "CS", "IP", "DS", "ES", "SS"]).forEach(function (r) {
        put(r, regs ? regs[r] : null, 2, before ? before.regs[r] : null);
      });
      GP.forEach(function (r) {
        var x = r.charAt(0), v = regs ? regs[r] : null, o = before ? before.regs[r] : null;
        put(x + "H", v == null ? null : v >> 8, 1, o == null ? null : o >> 8);
        put(x + "L", v == null ? null : v & 0xFF, 1, o == null ? null : o & 0xFF);
      });
      FL.forEach(function (f) {
        var c = fcells[f], v = mach ? mach.f[f] : null, und = mach && mach.undef[f];
        c.querySelector("em").textContent = v == null ? "·" : und ? "?" : String(v);
        c.classList.toggle("is-undef", !!und);
        c.classList.toggle("is-changed", !!(before && (before.flags[f] !== v || !!before.undef[f] !== !!und)));
        c.title = f + (und ? tx(" (8086'da tanımsız)", " (undefined on the 8086)") : "");
      });
      ipNote.textContent = mach ? "CS:IP = " + h4(mach.s[1]) + ":" + h4(mach.ip) + tx(" · adım ", " · step ") + n + (mach.us ? " · t = " + M.secText(mach.us) : "") : "";
      if (mach) {
        /* bellek */
        var seg = memSeg == null ? mach.s[3] : memSeg, written = {};
        if (rec) rec.mem.forEach(function (w) { written[w[0]] = 1; });
        memTitle.innerHTML = tx("Bellek", "Memory") + " <b>" + segName(memSeg) + "</b>" + memNote(seg);
        var mrows = "";
        for (var r = 0; r < view.mem; r++) {
          var off = (memBase + 8 * r) & 0xFFFF, bytes = "";
          for (var b = 0; b < 8; b++) {
            var o2 = (off + b) & 0xFFFF, ph = mach.phys(seg, o2), v = mach.mem[ph], nm = varAt[ph];
            if (!nm && ph < 0x400) nm = "INT " + h2(ph >> 2) + tx("h vektörü: ", "h vector: ") + ((ph & 3) < 2 ? "IP" : "CS") + ((ph & 1) ? tx(" yüksek bayt", " high byte") : tx(" düşük bayt", " low byte"));
            var cls = (written[ph] ? "is-changed" : "") + (varAt[ph] ? " is-var" : "");
            bytes += '<span class="' + cls + '"' + (nm ? ' title="' + esc(nm) + '"' : "") + ">" + h2(v) + "</span>";
          }
          mrows += "<div><i>" + h4(off) + '</i><span class="m-lab__bytes">' + bytes + "</span></div>";
        }
        memBox.innerHTML = mrows;
        /* yığın */
        if (view.stack && !stackBox.hidden) {
          var sp = mach.r[4], ss = mach.s[2], top = mach.initSp, k2 = view.stack, start, srows = "";
          start = sp >= top - 2 * (k2 - 1) ? top - 2 * (k2 - 1) : sp;
          if (start < 0) start = 0;
          for (var qq = 0; qq < k2; qq++) {
            var a = (start + 2 * qq) & 0xFFFF, isSp = a === sp, free = a < sp, tag = stackTag[a];
            srows += '<div class="' + (isSp ? "is-sp" : free ? "is-free" : "") + '"><i>' + h4(a) + "</i><span>" + h4(mach.rd16(ss, a)) + "</span>" +
              (isSp ? "<span>◀ SP</span>" : "") + (tag && !free ? '<em>' + esc(tag) + "</em>" : "") + "</div>";
          }
          stackBox.innerHTML = srows;
        }
        var g13 = !!view.scr && mach.videoMode === 0x13;
        outBox.hidden = !view.scr || g13; mini.hidden = !view.mini || g13; gfx.hidden = !g13;
        stackTitle.hidden = stackBox.hidden = !view.stack || g13;
        if (view.scr) scrTitle.innerHTML = g13 ? tx("Ekran <b>mod 13h · 320×200</b>", "Screen <b>mode 13h · 320×200</b>") : scrLabel(view.scr);
        if (g13) drawGfx();
        else if (view.scr) renderScreen();
        if (view.dev) renderDevices();
      } else {
        memTitle.innerHTML = tx("Bellek", "Memory"); memBox.innerHTML = ""; stackBox.innerHTML = ""; outBox.innerHTML = ""; devSvg.innerHTML = ""; devPorts.innerHTML = "";
      }
      /* düğmeler */
      var stuck = !mach || !!done || !!(err && !err.soft) || editing;
      bStep.disabled = stuck; bPlay.disabled = (!mach || editing) && !playing;
      bBack.disabled = !mach || n === 0 || editing; bReset.disabled = !mach || editing;
      bRun.disabled = !!(err && err.asm) && !editing;
      pick.disabled = editing; bExp.disabled = editing;
      /* durum satırı */
      status.classList.toggle("is-error", !!err && !err.soft);
      status.classList.toggle("is-wait", !!waiting);
      status.innerHTML = statusText();
    }
    function statusText() {
      if (editing) return tx("Kod düzenlenebilir. Bitti düğmesi programı yeniden çevirir; Çalıştır düğmesi programı sonuna kadar yürütür.", "The code is editable. Done reassembles the program; Run executes it to the end.");
      if (err && err.asm) return "<b>" + tx("Assembly hatası", "Assembly error") + (err.line ? tx(" (satır ", " (line ") + err.line + ")" : "") + ":</b> " + esc(err.msg) + ".";
      var s = rec ? esc(rec.text) + esc(devNote()) : "";
      if (waiting) {
        var w = waiting.poll ? tx("<b>Program tuş yokluyor:</b> Girdi kutusuna bir tuş yazılınca devam eder.", "<b>The program is polling for a key:</b> it continues when a key is typed in the Input box.") :
          tx("<b>Girdi bekleniyor:</b> ", "<b>Waiting for input:</b> ") + esc(waiting.what) + (/0Ah/.test(waiting.what || "") ? tx(" Enter ile biten bir satır okur", " reads a line ending with Enter") : tx(" bir tuş okur", " reads a key")) +
          tx("; Girdi kutusuna yazılınca program kaldığı yerden sürer.", "; type in the Input box and the program continues where it stopped.");
        return (s ? s + " " : "") + w;
      }
      if (err) return (s ? s + " " : "") + "<b>" + (err.soft ? tx("Durduruldu:", "Stopped:") : tx("Çalışma hatası:", "Runtime error:")) + "</b> " + esc(err.msg) + ".";
      if (done) {
        if (/^(kod sonu|end of code)/.test(done)) return (s ? s + " " : "") + "<b>" + tx("IP = " + h4(mach.ip) + "h adresinde komut yok; program burada durur.", "No instruction at IP = " + h4(mach.ip) + "h; the program stops here.") + "</b>";
        return s + " <b>" + tx("Program bitti (" + n + " adım).", "Program finished (" + n + " steps).") + "</b>";
      }
      if (rec) return s;
      var size = prog.image.reduce(function (a, im) { return a + im[1].length; }, 0);
      var note = initNote(), extra = [];
      if (ex.input) extra.push(tx("Girdi kuyruğunda hazır tuşlar var: <b>", "Keys are ready in the input queue: <b>") + esc(ex.input.split("").map(keyGlyph).join(" ")) + tx("</b>; başka tuşlar Girdi kutusuna yazılabilir.", "</b>; more keys can be typed in the Input box."));
      else if (needsInput()) extra.push(tx("Program klavyeden okuyunca Girdi kutusuna yazılan tuşları alır.", "When the program reads the keyboard, it takes the keys typed in the Input box."));
      if (adjustables().length) extra.push(tx("Termometre değeri kaydırıcıyla değiştirilebilir.", "The thermometer value can be changed with the slider."));
      if (/\bint\s+15h|\bint\s+1ah|\b0*6ch\b/i.test(text)) extra.push(tx("Saat sanaldır: Adım ve Çalıştır kiplerinde yalnız INT 15h beklemeleriyle ilerler, Oynat kipinde gerçek zamanla akar (hız ayarıyla ölçekli).",
        "The clock is virtual: in Step and Run modes it advances only through INT 15h waits; in Play mode it runs in real time (scaled by the speed setting)."));
      if (hasExp && !showExp) extra.push(tx("Açılım düğmesi makroların ürettiği satırları gösterir.", "The Expansion button shows the lines generated by macros."));
      return tx("Program yüklendi: ", "Program loaded: ") + size + tx(" bayt, CS:IP = ", " bytes, CS:IP = ") + h4(mach.s[1]) + ":" + h4(mach.ip) + "h. " +
        (note ? tx("Başlangıç belleği slayttaki varsayımla doldurulur: <b>", "Initial memory is filled as assumed on the slide: <b>") + note + "</b>. " :
          prog.com && !extra.length ? tx("emu8086'daki gibi CX başlangıçta program boyutunu (" + hx(size) + ") gösterir. ", "As in emu8086, CX initially holds the program size (" + hx(size) + "). ") : "") +
        (extra.length ? extra.join(" ") + " " : "") +
        tx("Adım düğmesiyle komutlar tek tek yürütülür; vurgulu satır sıradaki komuttur.", "The Step button executes instructions one at a time; the highlighted line is the next instruction.");
    }

    /* ---------- olaylar ---------- */
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-act]");
      if (!b || b.disabled) return;
      var act = b.dataset.act;
      if (act === "edit") { setEditing(!editing); return; }
      if (act === "run") { if (editing) { editing = false; src.hidden = true; code.hidden = false; bEdit.textContent = tx("Düzenle", "Edit"); if (src.value !== text) load(src.value.replace(/\s+$/, "") + "\n", true); } runAll(); return; }
      if (act === "step") { stop(); resume = "step"; mode = "step"; stepOnce(); render(); return; }
      if (act === "back") { stop(); resume = null; goTo(n - 1); return; }
      if (act === "play") { play(); return; }
      if (act === "reset") { reset(true); }
    });
    bExp.addEventListener("click", function () {
      showExp = !showExp;
      bExp.setAttribute("aria-pressed", showExp ? "true" : "false");
      drawCode(); render();
    });
    function choose(i) {
      ex = examples[i];
      init = ex.init;
      applyView();
      setupDevCtl();
      load(ex.src);
    }
    pick.addEventListener("change", function () { choose(+pick.value); });
    speedSel.addEventListener("change", function () {
      var v = parseFloat(speedSel.value) || 1;
      if (playing) { var now = performance.now(); if (now > tRef) { mach.us += Math.round((now - tRef) * 1000 * speed); tRef = now; } }
      speed = v;
    });
    /* tema değişince küçük ekran haritası yeniden boyanır */
    if (window.MutationObserver) new MutationObserver(function () { if (mach && view.mini) render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    if (window.matchMedia) { var mq = window.matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", function () { if (mach && view.mini) render(); }); }
    choose(0);
  });
})();
