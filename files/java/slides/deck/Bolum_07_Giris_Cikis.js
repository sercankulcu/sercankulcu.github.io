/* Bölüm 7: Giriş Çıkış - karakter kodlama ve ByteBuffer deneme alanları */
(function () {
  function hex(n) { var s = n.toString(16).toUpperCase(); return s.length < 2 ? "0" + s : s; }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---------- karakter kodlama ---------- */
  var LATIN5 = { 286: 0xD0, 304: 0xDD, 350: 0xDE, 287: 0xF0, 305: 0xFD, 351: 0xFE };
  var LATIN5_YOK = { 0xD0: 1, 0xDD: 1, 0xDE: 1, 0xF0: 1, 0xFD: 1, 0xFE: 1 };
  function utf8(cp) {
    if (cp < 0x80) return [cp];
    if (cp < 0x800) return [0xC0 | (cp >> 6), 0x80 | (cp & 63)];
    if (cp < 0x10000) return [0xE0 | (cp >> 12), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63)];
    return [0xF0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63)];
  }
  function utf16(cp) {
    if (cp < 0x10000) return [cp >> 8, cp & 255];
    var v = cp - 0x10000, hi = 0xD800 + (v >> 10), lo = 0xDC00 + (v & 1023);
    return [hi >> 8, hi & 255, lo >> 8, lo & 255];
  }
  function latin5(cp) {
    if (LATIN5[cp] !== undefined) return LATIN5[cp];
    if (cp < 256 && !LATIN5_YOK[cp]) return cp;
    return -1;
  }
  document.querySelectorAll('.ds-deck [data-demo="j071-kod"]').forEach(function (demo) {
    var input = demo.querySelector("input");
    var body = demo.querySelector("tbody");
    var footCells = demo.querySelectorAll("tfoot td");
    var status = demo.querySelector(".ds-deck__status");
    function cell(bytes, bad) {
      return "<td" + (bad ? ' class="is-bad"' : "") + ">" + bytes.map(hex).join(" ") + "</td>";
    }
    function ciz() {
      var chars = Array.from(input.value).slice(0, 12);
      var tA = 0, tL = 0, t8 = 0, t16 = 0, kayip = 0, rows = "";
      chars.forEach(function (ch) {
        var cp = ch.codePointAt(0);
        var a = cp < 128 ? [cp] : [0x3F];
        var l = latin5(cp); var lb = l < 0 ? [0x3F] : [l];
        var u8 = utf8(cp), u16 = utf16(cp);
        if (cp >= 128) kayip++;
        tA += 1; tL += 1; t8 += u8.length; t16 += u16.length;
        var shown = ch === " " ? "␣" : ch;
        rows += "<tr><td>" + esc(shown) + "</td><td>" + cp + "</td>" + cell(a, cp >= 128) + cell(lb, l < 0) +
          cell(u8, false) + cell(u16, false) + "</tr>";
      });
      body.innerHTML = rows;
      footCells[2].textContent = tA + " byte";
      footCells[3].textContent = tL + " byte";
      footCells[4].textContent = t8 + " byte";
      footCells[5].textContent = t16 + " byte";
      if (!chars.length) status.innerHTML = "Bir metin yazın.";
      else if (kayip) status.innerHTML = "<b>" + kayip + "</b> karakter ASCII dışında: ASCII ile kaydedilirse <b>kaybolur</b>. UTF-8 hepsini korur.";
      else status.innerHTML = "Tümü ASCII: ASCII, ISO-8859-9 ve UTF-8 <b>aynı byte'ları</b> üretir.";
    }
    input.addEventListener("input", ciz);
    ciz();
  });

  /* ---------- ByteBuffer ---------- */
  document.querySelectorAll('.ds-deck [data-demo="j071-tampon"]').forEach(function (demo) {
    var CAP = 8;
    var data, pos, lim, mark;
    var cellsBox = demo.querySelector(".j071-buf");
    var marks = demo.querySelector(".j071-buf__m");
    var stateBox = demo.querySelector(".j071-lab__st");
    var code = demo.querySelector(".j071-lab__code");
    var status = demo.querySelector(".ds-deck__status");
    var chIn = demo.querySelector(".j071-lab__ch");
    var lastRead = -1;
    function ciz() {
      var c = "", m = "";
      for (var i = 0; i < CAP; i++) {
        var cls = "j071-buf__c";
        if (i >= pos && i < lim) cls += " is-data";
        else if (data[i] !== null) cls += " is-out";
        c += '<div class="' + cls + '"><small>' + i + "</small>" + (data[i] === null ? "" : esc(data[i])) + "</div>";
        var t = [];
        if (i === pos) t.push('<b class="is-p">pos</b>');
        if (i === lim) t.push('<b class="is-l">lim</b>');
        m += "<span>" + (t.join("<br>") || "") + "</span>";
      }
      var t2 = [];
      if (pos === CAP) t2.push('<b class="is-p">pos</b>');
      if (lim === CAP) t2.push('<b class="is-l">lim</b>');
      m += "<span>" + t2.join("<br>") + "</span>";
      cellsBox.innerHTML = c + '<div class="j071-buf__c" style="border-style:dashed;color:var(--ds-muted);font-size:12px">cap</div>';
      marks.innerHTML = m;
      stateBox.textContent = "position=" + pos + "  limit=" + lim + "  capacity=" + CAP + "  remaining=" + (lim - pos);
    }
    function islem(op) {
      var msg = "";
      if (op === "put") {
        var ch = (chIn.value || "?").charAt(0);
        code.textContent = "b.put((byte) '" + ch + "');";
        if (pos >= lim) { msg = "<b>BufferOverflowException</b>: position = limit, yazacak yer yok."; }
        else { data[pos] = ch; pos++; msg = "'" + esc(ch) + "' yazıldı, position bir arttı."; }
      } else if (op === "get") {
        code.textContent = "char c = (char) b.get();";
        if (pos >= lim) { msg = "<b>BufferUnderflowException</b>: okunacak veri kalmadı (position = limit)."; }
        else { lastRead = pos; msg = "Okunan: <b>" + esc(data[pos] === null ? "0" : data[pos]) + "</b>, position bir arttı."; pos++; }
      } else if (op === "flip") {
        code.textContent = "b.flip();";
        lim = pos; pos = 0; mark = -1;
        msg = "Okuma moduna geçildi: limit = eski position, position = 0.";
      } else if (op === "rewind") {
        code.textContent = "b.rewind();";
        pos = 0; mark = -1;
        msg = "position = 0, limit değişmedi: aynı veri baştan yeniden okunabilir.";
      } else if (op === "clear") {
        code.textContent = "b.clear();";
        pos = 0; lim = CAP; mark = -1;
        msg = "Yazma moduna geçildi: position = 0, limit = capacity. Byte'lar <b>silinmedi</b>, üzerine yazılacak.";
      } else if (op === "compact") {
        code.textContent = "b.compact();";
        var kalan = lim - pos;
        for (var k = 0; k < kalan; k++) data[k] = data[pos + k];
        pos = kalan; lim = CAP; mark = -1;
        msg = "Okunmamış " + kalan + " byte başa taşındı; position = " + kalan + ", limit = capacity. Yazmaya devam edilebilir.";
      } else if (op === "reset") {
        data = []; for (var r = 0; r < CAP; r++) data.push(null);
        pos = 0; lim = CAP; mark = -1;
        code.textContent = "ByteBuffer b = ByteBuffer.allocate(8);";
        msg = "Boş tampon: yazma modunda, position = 0, limit = capacity = 8.";
      }
      status.innerHTML = msg;
      ciz();
    }
    demo.querySelectorAll("[data-op]").forEach(function (btn) {
      btn.addEventListener("click", function () { islem(btn.getAttribute("data-op")); });
    });
    chIn.addEventListener("keydown", function (ev) { if (ev.key === "Enter") islem("put"); });
    islem("reset");
  });
})();
