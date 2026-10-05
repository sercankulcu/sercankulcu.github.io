/* Bölüm 4: Değişkenler — veri tanımından bellek baytlarına (DB / DW / DD, DUP, ?, 'metin') */
(function () {
  function hex(v, n) { var s = v.toString(16).toUpperCase(); while (s.length < n) s = "0" + s; return s; }

  function parseNum(tok) {
    var s = tok.trim(), neg = false;
    if (s[0] === "-" || s[0] === "+") { neg = s[0] === "-"; s = s.slice(1).trim(); }
    var v = null;
    if (/^0x[0-9a-f]+$/i.test(s)) v = parseInt(s.slice(2), 16);
    else if (/^[0-9][0-9a-f]*h$/i.test(s)) v = parseInt(s.slice(0, -1), 16);
    else if (/^[01]+b$/i.test(s)) v = parseInt(s.slice(0, -1), 2);
    else if (/^[0-7]+[oq]$/i.test(s)) v = parseInt(s.slice(0, -1), 8);
    else if (/^[0-9]+d?$/i.test(s)) v = parseInt(s, 10);
    if (v === null || isNaN(v)) throw new Error("sayı anlaşılamadı: " + tok.trim());
    return neg ? -v : v;
  }

  /* split by commas at depth 0, outside quotes */
  function splitTop(s) {
    var parts = [], depth = 0, q = false, cur = "";
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (c === "'") q = !q;
      if (!q && c === "(") depth++;
      if (!q && c === ")") depth--;
      if (!q && depth === 0 && c === ",") { parts.push(cur); cur = ""; continue; }
      cur += c;
    }
    if (q) throw new Error("kapanmayan tırnak");
    if (depth !== 0) throw new Error("parantezler dengeli değil");
    parts.push(cur);
    return parts.map(function (p) { return p.trim(); });
  }

  function items(s, size) {
    var out = [];
    splitTop(s).forEach(function (it) {
      if (it === "") throw new Error("boş öğe");
      var m = /^(.+?)\s+DUP\s*\((.*)\)$/i.exec(it);
      if (m) {
        var n = parseNum(m[1]);
        if (n < 1 || n > 200) throw new Error("DUP sayısı 1–200 olmalı (demo sınırı)");
        var inner = items(m[2], size);
        for (var k = 0; k < n; k++) out = out.concat(inner);
        return;
      }
      if (it === "?") { for (var z = 0; z < size; z++) out.push({ v: null }); return; }
      if (it[0] === "'") {
        if (!/^'[^']*'$/.test(it)) throw new Error("hatalı metin: " + it);
        var txt = it.slice(1, -1);
        if (size !== 1 && txt.length > 1) throw new Error("metin dizgisi yalnızca DB ile tanımlanabilir");
        if (size !== 1) { var cv = txt.charCodeAt(0) || 0; for (var w = 0; w < size; w++) out.push({ v: w === 0 ? cv : 0 }); return; }
        for (var j = 0; j < txt.length; j++) {
          var cc = txt.charCodeAt(j);
          if (cc > 255) throw new Error("ASCII dışı karakter: " + txt[j]);
          out.push({ v: cc, ch: txt[j] });
        }
        return;
      }
      var v = parseNum(it);
      var max = Math.pow(2, 8 * size);
      if (v < -max / 2 || v >= max) throw new Error(v + " değeri " + size + " bayta sığmaz");
      if (v < 0) v += max;
      for (var b = 0; b < size; b++) { out.push({ v: Math.floor(v / Math.pow(256, b)) % 256 }); }
    });
    return out;
  }

  document.querySelectorAll('.ds-deck [data-demo="m04d-def"]').forEach(function (demo) {
    var inp = demo.querySelector("[data-in]");
    var box = demo.querySelector("[data-cells]");
    var status = demo.querySelector(".ds-deck__status");
    function upd() {
      box.innerHTML = "";
      try {
        var m = /^\s*(?:([A-Za-z_][A-Za-z0-9_]*)\s+)?(DB|DW|DD)\s+(.+)$/i.exec(inp.value);
        if (!m) throw new Error("biçim: [ad] DB|DW|DD değer, değer, …");
        var size = { DB: 1, DW: 2, DD: 4 }[m[2].toUpperCase()];
        var bytes = items(m[3], size);
        if (!bytes.length) throw new Error("değer yok");
        var shown = bytes.slice(0, 48);
        box.innerHTML = shown.map(function (b, i) {
          var val = b.v === null ? "??" : hex(b.v, 2);
          var hot = Math.floor(i / size) % 2 === 0;
          return '<span' + (hot ? ' class="is-hot"' : "") + "><i>+" + i + "</i><b>" + val + "</b></span>";
        }).join("");
        var name = m[1] || "(adsız)";
        status.innerHTML = "<b>" + name + "</b>: " + bytes.length + " bayt" + (bytes.length > 48 ? " (ilk 48'i gösteriliyor)" : "") +
          " · öğe boyutu " + size + " bayt · renk değişimi = bir öğe" + (size > 1 ? " · düşük bayt önce (little-endian)" : "");
      } catch (e) {
        status.innerHTML = '<span class="m-bad">Hata: ' + String(e.message).replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</span>";
      }
    }
    inp.addEventListener("input", upd);
    demo.querySelectorAll("[data-ex]").forEach(function (b) {
      b.addEventListener("click", function () { inp.value = b.getAttribute("data-ex"); upd(); });
    });
    upd();
  });
})();
