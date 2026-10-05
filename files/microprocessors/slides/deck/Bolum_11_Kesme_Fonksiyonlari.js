/* Bölüm 11: Kesme Fonksiyonları demoları (öznitelik gezgini, klavye gezgini) */
(function () {
  function hex(v, n) { var s = v.toString(16).toUpperCase(); while (s.length < n) s = "0" + s; return s + "h"; }
  var NAMES = ["siyah", "mavi", "yeşil", "camgöbeği", "kırmızı", "eflatun", "kahverengi", "açık gri",
    "koyu gri", "açık mavi", "açık yeşil", "açık camgöbeği", "açık kırmızı", "açık eflatun", "sarı", "beyaz"];
  var RGB = ["#000000", "#0000AA", "#00AA00", "#00AAAA", "#AA0000", "#AA00AA", "#AA5500", "#AAAAAA",
    "#555555", "#5555FF", "#55FF55", "#55FFFF", "#FF5555", "#FF55FF", "#FFFF55", "#FFFFFF"];

  /* ---------- öznitelik gezgini ---------- */
  document.querySelectorAll('.ds-deck [data-demo="m11-attr"]').forEach(function (demo) {
    var fg = demo.querySelector('[data-in="fg"]');
    var bg = demo.querySelector('[data-in="bg"]');
    var blink = demo.querySelector('[data-in="blink"]');
    var ch = demo.querySelector('[data-in="ch"]');
    var scr = demo.querySelector(".m11-scr");
    var bits = demo.querySelector(".m11-bits");
    var big = demo.querySelector(".m11-big");
    var status = demo.querySelector(".ds-deck__status");
    NAMES.forEach(function (n, i) {
      var o = document.createElement("option");
      o.value = i; o.textContent = i.toString(16).toUpperCase() + " " + n;
      fg.appendChild(o);
      if (i < 8) bg.appendChild(o.cloneNode(true));
    });
    fg.value = "14"; bg.value = "4";

    function update() {
      var f = +fg.value, b = +bg.value, k = blink.checked ? 1 : 0;
      var a = (k << 7) | (b << 4) | f;
      var c = (ch.value || " ").charAt(0);
      var code = c.charCodeAt(0);
      var esc = c === "<" ? "&lt;" : c === "&" ? "&amp;" : c;
      scr.style.background = "#000";
      scr.innerHTML = "<span style=\"background:" + RGB[b] + ";color:" + RGB[f] + "\"" + (k ? " class=\"blink\"" : "") + ">" + esc + esc + esc + "</span>";
      var s = ("0000000" + a.toString(2)).slice(-8), html = "";
      for (var i = 0; i < 8; i++) { if (i === 1 || i === 4) html += "<span class=\"gap\"></span>"; html += "<span>" + s[i] + "</span>"; }
      bits.innerHTML = html;
      big.innerHTML = "BL = <b>" + hex(a, 2) + "</b>";
      status.innerHTML = "<code>mov ah, 09h</code> · <code>mov al, " + (code < 128 && code > 32 ? "'" + esc + "'" : hex(code & 255, 2)) +
        "</code> · <code>mov bh, 0</code> · <code>mov bl, " + hex(a, 2) + "</code> · <code>mov cx, 3</code> · <code>int 10h</code>" +
        (code > 127 ? " — dikkat: bu karakter 7 bit ASCII dışında" : "");
    }
    [fg, bg, blink, ch].forEach(function (el) { el.addEventListener("input", update); el.addEventListener("change", update); });
    update();
  });

  /* ---------- klavye gezgini ---------- */
  var SC = {
    Escape: 0x01, Minus: 0x0C, Equal: 0x0D, Backspace: 0x0E, Tab: 0x0F, BracketLeft: 0x1A, BracketRight: 0x1B,
    Enter: 0x1C, NumpadEnter: 0x1C, Semicolon: 0x27, Quote: 0x28, Backquote: 0x29, Backslash: 0x2B,
    Comma: 0x33, Period: 0x34, Slash: 0x35, NumpadMultiply: 0x37, Space: 0x39,
    Home: 0x47, ArrowUp: 0x48, PageUp: 0x49, NumpadSubtract: 0x4A, ArrowLeft: 0x4B, ArrowRight: 0x4D,
    NumpadAdd: 0x4E, End: 0x4F, ArrowDown: 0x50, PageDown: 0x51, Insert: 0x52, Delete: 0x53, F11: 0x85, F12: 0x86,
    IntlBackslash: 0x56
  };
  "1234567890".split("").forEach(function (d, i) { SC["Digit" + d] = 0x02 + i; });
  "QWERTYUIOP".split("").forEach(function (c, i) { SC["Key" + c] = 0x10 + i; });
  "ASDFGHJKL".split("").forEach(function (c, i) { SC["Key" + c] = 0x1E + i; });
  "ZXCVBNM".split("").forEach(function (c, i) { SC["Key" + c] = 0x2C + i; });
  for (var f = 1; f <= 10; f++) SC["F" + f] = 0x3A + f;
  var CTRLCODE = { Enter: 0x0D, NumpadEnter: 0x0D, Escape: 0x1B, Backspace: 0x08, Tab: 0x09, Space: 0x20 };
  var MODS = { ShiftLeft: 1, ShiftRight: 1, ControlLeft: 1, ControlRight: 1, AltLeft: 1, AltRight: 1, MetaLeft: 1, MetaRight: 1, CapsLock: 1, NumLock: 1, ScrollLock: 1 };

  document.querySelectorAll('.ds-deck [data-demo="m11-key"]').forEach(function (demo) {
    var inp = demo.querySelector('[data-in="key"]');
    var oAh = demo.querySelector('[data-out="ah"]');
    var oAl = demo.querySelector('[data-out="al"]');
    var oAx = demo.querySelector('[data-out="ax"]');
    var status = demo.querySelector(".ds-deck__status");
    status.innerHTML = "Alana tıklayın ve bir tuşa basın.";
    inp.addEventListener("keydown", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (MODS[e.code]) {
        status.innerHTML = "<b>" + e.code + "</b> tek başına tampona tuş koymaz; durumu INT 16h/<b>02h</b> ile okunur.";
        return;
      }
      var sc = SC[e.code];
      if (sc === undefined) { status.innerHTML = "<b>" + e.code + "</b>: bu tuş tabloda yok."; return; }
      var al = 0, note = "";
      if (CTRLCODE[e.code] !== undefined) al = CTRLCODE[e.code];
      else if (e.key.length === 1) al = e.key.charCodeAt(0);
      if (e.ctrlKey && /^Key[A-Z]$/.test(e.code)) { al = e.code.charCodeAt(3) - 64; note = " · Ctrl+harf → AL = harf − 40h"; }
      if (e.altKey) { al = 0; note = " · Alt+tuş → AL = 00h (genişletilmiş)"; }
      if (al > 127) { note = " · ASCII dışı karakter (kod sayfasına bağlı); BIOS'ta farklı bir değer dönebilir"; al = al & 255; }
      if (al === 0 && !note) note = " · ASCII karşılığı yok → AL = 00h, tuş AH'den tanınır";
      oAh.textContent = hex(sc, 2);
      oAl.textContent = hex(al, 2);
      oAx.textContent = hex((sc << 8) | al, 4);
      var shown = al >= 32 && al < 127 ? " ('" + String.fromCharCode(al) + "')" : "";
      status.innerHTML = "<b>" + e.code + "</b>" + shown + note;
    });
    inp.addEventListener("input", function () { inp.value = ""; });
  });
})();
