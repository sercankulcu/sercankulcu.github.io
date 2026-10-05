/* Bölüm 9 Aygıt Kontrolü: trafik lambası bit düzenleyici, termostat simülatörü ve 8255 kontrol sözcüğü oluşturucu */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  function hex4(v) { return ("0000" + (v & 0xFFFF).toString(16).toUpperCase()).slice(-4) + "h"; }
  function bin16(v) {
    var s = ("0000000000000000" + (v & 0xFFFF).toString(2)).slice(-16);
    return s.slice(0, 4) + "_" + s.slice(4, 8) + "_" + s.slice(8, 12) + "_" + s.slice(12);
  }

  /* ---------- traffic lights (port 4) ---------- */
  var POS = [[232, 150], [232, 14], [38, 14], [38, 150]];
  var POLE = ["sağ alt", "sağ üst", "sol üst", "sol alt"];
  var COLORS = ["kırmızı", "sarı", "yeşil"], CLS = ["lamp-r", "lamp-y", "lamp-g"];
  var PRESET = { all_red: 0x0249, situation: 0x030C, s1: 0x069A, s2: 0x0861, s4: 0x04D3, clear: 0 };

  function trafficSvg(w) {
    var p = ['<rect class="road" x="110" y="0" width="80" height="230"/><rect class="road" x="0" y="80" width="300" height="70"/>',
      '<path class="axis" d="M150 0 V80 M150 150 V230 M0 115 H110 M190 115 H300" style="stroke-dasharray:6 6"/>'];
    POS.forEach(function (xy, g) {
      var x = xy[0], y = xy[1];
      p.push('<rect class="pole" x="' + x + '" y="' + y + '" width="28" height="66" rx="5"/>');
      for (var k = 0; k < 3; k++) {
        var bit = 3 * g + k, on = (w >> bit) & 1, cy = y + 11 + k * 22;
        p.push('<circle cx="' + (x + 14) + '" cy="' + cy + '" r="8" class="' + (on ? CLS[k] : "lamp-off") + '"/>');
        var lx = x < 150 ? x - 6 : x + 34;
        p.push('<text class="lbl mono" x="' + lx + '" y="' + (cy + 4) + '" text-anchor="' + (x < 150 ? "end" : "start") + '">' + bit.toString(16).toUpperCase() + "</text>");
      }
    });
    return '<svg class="ds-svg" xmlns="' + NS + '" viewBox="0 0 300 236" role="img" aria-label="Kavşak, port 4 = ' + hex4(w) + '" style="max-width:300px;width:100%">' + p.join("") + "</svg>";
  }

  document.querySelectorAll('.ds-deck [data-demo="m09-traffic"]').forEach(function (demo) {
    var svgBox = demo.querySelector(".m09-svg"), bitsBox = demo.querySelector(".m09-bits");
    var code = demo.querySelector(".m09-code"), status = demo.querySelector(".ds-deck__status");
    var w = PRESET.situation, buttons = [];
    for (var b = 15; b >= 0; b--) {
      (function (bit) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = bit.toString(16).toUpperCase();
        if (bit > 11) btn.disabled = true;
        btn.addEventListener("click", function () { w ^= (1 << bit); draw(); });
        bitsBox.appendChild(btn);
        buttons[bit] = btn;
      })(b);
    }
    function draw() {
      svgBox.innerHTML = trafficSvg(w);
      for (var i = 0; i < 16; i++) {
        buttons[i].classList.toggle("is-on", ((w >> i) & 1) === 1);
        buttons[i].setAttribute("aria-label", "bit " + i + ((w >> i) & 1 ? " açık" : " kapalı"));
      }
      code.textContent = "mov ax, " + bin16(w) + "b   ; " + hex4(w) + "\nout 4, ax";
      var parts = [], warn = [];
      for (var g = 0; g < 4; g++) {
        var on = [];
        for (var k = 0; k < 3; k++) if ((w >> (3 * g + k)) & 1) on.push(COLORS[k]);
        parts.push(POLE[g] + ": <b>" + (on.length ? on.join(" + ") : "sönük") + "</b>");
        if (((w >> (3 * g)) & 1) && ((w >> (3 * g + 2)) & 1)) warn.push(POLE[g] + " direğinde kırmızı ve yeşil birlikte");
      }
      var g0 = (w >> 2) & 1 || (w >> 8) & 1, g1 = (w >> 5) & 1 || (w >> 11) & 1;
      if (g0 && g1) warn.push("iki kesişen yön aynı anda yeşil: kaza riski!");
      status.innerHTML = parts.join(" · ") + (warn.length ? '<br><b style="color:var(--ds-bad)">Uyarı:</b> ' + warn.join("; ") + "." : "");
    }
    demo.addEventListener("click", function (e) {
      var p = e.target.closest("[data-set]");
      if (!p) return;
      w = PRESET[p.dataset.set];
      draw();
    });
    draw();
  });

  /* ---------- thermostat (ports 125 / 127) ---------- */
  var LINES = ["in  al, 125", "cmp al, 60", "jl  low", "cmp al, 80", "jle ok", "jg  high", "low:  mov al, 1", "      out 127, al", "high: mov al, 0", "      out 127, al", "ok:   jmp start"];

  function thermoSvg(t, heater) {
    var h = Math.max(0, Math.min(170, (t + 40) * 1.0625));
    var p = ['<rect class="box-empty" x="40" y="10" width="26" height="180" rx="12"/>',
      '<rect x="46" y="' + (186 - h).toFixed(0) + '" width="14" height="' + h.toFixed(0) + '" rx="6" class="lamp-r"/>',
      '<circle cx="53" cy="200" r="14" class="lamp-r"/>'];
    [-40, 0, 40, 80, 120].forEach(function (v) {
      var y = 186 - (v + 40) * 1.0625;
      p.push('<path class="axis" d="M70 ' + y.toFixed(0) + ' H80"/><text class="lbl mono" x="84" y="' + (y + 4).toFixed(0) + '">' + v + "</text>");
    });
    [60, 80].forEach(function (v) {
      var y = 186 - (v + 40) * 1.0625;
      p.push('<path class="line" d="M30 ' + y.toFixed(0) + ' H76" style="stroke:var(--ds-good);stroke-dasharray:4 3"/>');
    });
    p.push('<text class="txt" x="130" y="60">port 125: <tspan class="mono">' + t + " °C</tspan></text>");
    p.push('<rect x="130" y="100" width="120" height="40" rx="8" class="' + (heater ? "lamp-y" : "lamp-off") + '"/><text class="txt" x="190" y="126" text-anchor="middle">ısıtıcı ' + (heater ? "AÇIK" : "KAPALI") + "</text>");
    p.push('<text class="lbl" x="130" y="160">port 127 = ' + heater + "</text>");
    return '<svg class="ds-svg" xmlns="' + NS + '" viewBox="0 0 270 220" role="img" aria-label="Termometre ' + t + ' derece" style="max-width:280px;width:100%">' + p.join("") + "</svg>";
  }

  document.querySelectorAll('.ds-deck [data-demo="m09-thermo"]').forEach(function (demo) {
    var svgBox = demo.querySelector(".m09-svg"), path = demo.querySelector(".m09-path");
    var slider = demo.querySelector('[data-k="t"]'), tOut = demo.querySelector('[data-o="t"]');
    var status = demo.querySelector(".ds-deck__status"), runBtn = demo.querySelector('[data-op="run"]');
    var heater = 0, timer = null, ticks = 0;
    path.innerHTML = LINES.map(function (l) { return "<span>" + l + "</span>"; }).join("");
    var spans = path.querySelectorAll("span");

    /* one pass of the program loop; returns executed line indices */
    function step(t) {
      var ex = [0, 1];
      if (t < 60) { ex.push(2, 6, 7, 10); heater = 1; return [ex, "JL alındı: " + t + " &lt; 60 → ısıtıcı <b>açık</b>."]; }
      ex.push(2, 3, 4);
      if (t <= 80) { ex.push(10); return [ex, "60 ≤ " + t + " ≤ 80 → JLE alındı, ısıtıcıya dokunulmadı (" + (heater ? "açık" : "kapalı") + " kalır)."]; }
      ex.push(5, 8, 9, 10); heater = 0;
      return [ex, "JG alındı: " + t + " &gt; 80 → ısıtıcı <b>kapalı</b>."];
    }
    function show(t) {
      var r = step(t);
      spans.forEach(function (s, i) { s.classList.toggle("is-on", r[0].indexOf(i) >= 0); s.classList.toggle("is-off", r[0].indexOf(i) < 0); });
      svgBox.innerHTML = thermoSvg(t, heater);
      tOut.textContent = t;
      var b = t < 0 ? (t + 256) : t;
      status.innerHTML = r[1] + "<br>AL = " + ("0" + b.toString(16).toUpperCase()).slice(-2) + "h" + (t < 0 ? " (işaretli: " + t + "; işaretsiz JB/JA kullanılsaydı " + b + " sanılırdı)" : "");
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; runBtn.textContent = "▶ zamanı akıt"; } }
    slider.addEventListener("input", function () { stop(); show(parseInt(slider.value, 10)); });
    runBtn.addEventListener("click", function () {
      if (timer) { stop(); return; }
      ticks = 0;
      runBtn.textContent = "❚❚ durdur";
      timer = setInterval(function () {
        var t = parseInt(slider.value, 10) + (heater ? 2 : -2);
        t = Math.max(-40, Math.min(120, t));
        slider.value = t;
        show(t);
        if (++ticks > 60) stop();
      }, 250);
    });
    show(parseInt(slider.value, 10));
  });

  /* ---------- 8255 kontrol sözcüğü oluşturucu ---------- */
  var PPI = [
    { bit: 4, name: "Port A", pins: "PA7–PA0", addr: "310h", y: 46 },
    { bit: 3, name: "Port C üst", pins: "PC7–PC4", addr: "312h", y: 100 },
    { bit: 1, name: "Port B", pins: "PB7–PB0", addr: "311h", y: 154 },
    { bit: 0, name: "Port C alt", pins: "PC3–PC0", addr: "312h", y: 208 }
  ];
  var CWNAME = ["PC alt", "PB", "B mod", "PC üst", "PA", "A mod", "A mod", "mod"];
  function hex2(v) { return ("0" + (v & 0xFF).toString(16).toUpperCase()).slice(-2); }
  function bin8(v) { return ("0000000" + (v & 0xFF).toString(2)).slice(-8); }

  function ppiSvg(cw) {
    var bsr = !(cw & 0x80);
    var p = ['<defs><marker id="m09p-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0 0 L10 5 L0 10 z"/></marker></defs>',
      '<rect class="box" x="20" y="20" width="110" height="214" rx="6"/>',
      '<text class="txt" x="75" y="130" text-anchor="middle">8255</text>'];
    PPI.forEach(function (g) {
      var input = (cw >> g.bit) & 1;
      var d = input ? "M270 " + g.y + " H134" : "M132 " + g.y + " H268";
      p.push('<path class="line" d="' + d + '" marker-end="url(#m09p-ah)"' + (bsr ? ' style="opacity:.35"' : "") + "/>");
      p.push('<text class="lbl mono" x="200" y="' + (g.y - 7) + '" text-anchor="middle">' + g.pins + "</text>");
      p.push('<text class="txt" x="200" y="' + (g.y + 20) + '" text-anchor="middle" style="font-size:13px">' + (bsr ? "—" : input ? "giriş" : "çıkış") + "</text>");
    });
    return '<svg class="ds-svg" xmlns="' + NS + '" viewBox="0 0 280 250" role="img" aria-label="8255 port yönleri, kontrol sözcüğü ' + hex2(cw) + 'h" style="max-width:290px;width:100%">' + p.join("") + "</svg>";
  }

  document.querySelectorAll('.ds-deck [data-demo="m09-ppi"]').forEach(function (demo) {
    var svgBox = demo.querySelector(".m09-svg"), dirs = demo.querySelector(".m09-dirs");
    var cwBox = demo.querySelector(".m09-cw"), code = demo.querySelector(".m09-code");
    var inp = demo.querySelector('[data-in="cw"]'), status = demo.querySelector(".ds-deck__status");
    var cw = 0x82, btns = [];
    PPI.forEach(function (g) {
      var lab = document.createElement("span");
      lab.textContent = g.name + " (" + g.pins + ")";
      var b = document.createElement("button");
      b.type = "button";
      b.className = "ds-deck__button ds-deck__button--sm";
      b.addEventListener("click", function () { cw = (cw | 0x80) ^ (1 << g.bit); draw(true); });
      dirs.appendChild(lab);
      dirs.appendChild(b);
      btns.push(b);
    });
    function draw(fromButtons) {
      if (fromButtons || document.activeElement !== inp) inp.value = hex2(cw);
      svgBox.innerHTML = ppiSvg(cw);
      var html = "";
      for (var i = 7; i >= 0; i--) {
        html += '<span title="D' + i + '"><span class="b' + ((cw >> i) & 1 ? " is-on" : "") + '">' + ((cw >> i) & 1) + "</span>" + CWNAME[i] + "</span>";
      }
      cwBox.innerHTML = html;
      var bsr = !(cw & 0x80);
      PPI.forEach(function (g, k) {
        btns[k].textContent = bsr ? "—" : (cw >> g.bit) & 1 ? "giriş (1)" : "çıkış (0)";
        btns[k].classList.toggle("is-on", !bsr && ((cw >> g.bit) & 1) === 1);
      });
      var lines = ["mov dx, 313h   ; kontrol yazmacı", "mov al, " + hex2(cw) + "h    ; " + bin8(cw) + "b", "out dx, al"];
      if (bsr) {
        var n = (cw >> 1) & 7, v = cw & 1;
        status.innerHTML = "D7 = 0: <b>bit kur/sil</b> (BSR) sözcüğü. Port yönleri değişmez; yalnız <b>PC" + n + " ← " + v + "</b> olur." +
          ((cw & 0x70) ? " (D6–D4 kullanılmaz.)" : "");
        lines[1] = "mov al, " + hex2(cw) + "h    ; PC" + n + " = " + v;
      } else {
        var parts = PPI.map(function (g) { return g.name + " <b>" + ((cw >> g.bit) & 1 ? "giriş" : "çıkış") + "</b>"; });
        var ma = (cw >> 5) & 3, mb = (cw >> 2) & 1, warn = "";
        if (ma || mb) warn = "<br>A grubu mod " + (ma > 1 ? 2 : ma) + ", B grubu mod " + mb + ": el sıkışmalı modlar; burada yalnız mod 0 yönleri gösterilir.";
        status.innerHTML = parts.join(" · ") + warn;
        PPI.forEach(function (g) {
          if (g.bit === 0 && ((cw >> 3) & 1) === ((cw >> 0) & 1)) return;
          var isIn = (cw >> g.bit) & 1;
          var nm = g.bit === 3 && ((cw >> 3) & 1) === (cw & 1) ? "Port C" : g.name;
          lines.push("; " + nm + " (DX = " + g.addr + "): " + (isIn ? "in  al, dx" : "out dx, al"));
        });
      }
      code.textContent = lines.join("\n");
    }
    inp.addEventListener("input", function () {
      var t = inp.value.trim();
      if (/^[0-9a-fA-F]{1,2}$/.test(t)) { cw = parseInt(t, 16); draw(false); }
    });
    inp.addEventListener("keydown", function (e) { e.stopPropagation(); });
    inp.addEventListener("blur", function () { inp.value = hex2(cw); });
    draw(true);
  });
})();
