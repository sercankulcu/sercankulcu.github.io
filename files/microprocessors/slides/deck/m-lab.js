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
     data-dev="trafik|led|gosterge|termometre|port"        sanal aygıt çizimleri (port 4, 199, 310h/312h, 125/127)
     data-view="kesme|ekran|aygit"                         yan panelin düzeni; data-acilim="1": makro açılımı açık
     data-clock="14,35,7,42"  data-date="2026,1,7,3"      INT 21h/2Ch, 2Ah ve INT 1Ah için sabit saat/tarih
   Arayüz bu betikte kurulur: solda kod (o anki satır vurgulu; Düzenle ile textarea; makro açılımı; Girdi kutusu), ortada
   yazmaçlar ve bayraklar, sağda bellek dökümü, SS:SP çevresi (itilen FLAGS/CS/IP etiketli), ekran ya da aygıtlar;
   altta her adımın Türkçe açıklaması. REP önekli dizgi komutları tur tur yürütülür.
   Geri düğmesi programı baştan k − 1 adım yeniden yürütür (girdiler ve ayarlanan port değerleri kayıttan okunur). */
(function () {
  "use strict";
  if (["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) < 0) return;
  var M = window.Mini8086;
  if (!M) return;
  var hx = M.hx, MAX_RUN = 5000, PLAY_MS = 650;
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
  /* 7 bölütlü gösterge: bit 0-6 = a-g */
  var SEG7 = { "0": 0x3F, "1": 0x06, "2": 0x5B, "3": 0x4F, "4": 0x66, "5": 0x6D, "6": 0x7D, "7": 0x07, "8": 0x7F, "9": 0x6F, "-": 0x40, " ": 0 };

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function h4(v) { return hx(v).slice(0, 4); }
  function h2(v) { return hx(v, 1).slice(0, 2); }
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
  function attrName(a) { return "öznitelik " + hx(a, 1) + ": " + CNAME[(a >> 4) & 7] + " zemin, " + CNAME[a & 15] + " yazı"; }

  /* ---------- aygıt çizimleri (sunumdaki SVG üslubu, var(--ds-*) renkleri) ---------- */
  var TPOS = [[232, 150], [232, 14], [38, 14], [38, 150]], TCLS = ["m-lab-lamp-r", "m-lab-lamp-y", "m-lab-lamp-g"];
  var TPOLE = ["sağ alt", "sağ üst", "sol üst", "sol alt"], TCOL = ["kırmızı", "sarı", "yeşil"];
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
    return svgWrap("0 0 300 232", "Kavşak, port 4 = " + hx(w), p.join(""), h);
  }
  function trafficText(w) {
    var parts = [];
    for (var g = 0; g < 4; g++) {
      var on = [];
      for (var k = 0; k < 3; k++) if ((w >> (3 * g + k)) & 1) on.push(TCOL[k]);
      parts.push(TPOLE[g] + " " + (on.length ? on.join(" + ") : "sönük"));
    }
    return "Trafik ışıkları: " + parts.join(", ") + ".";
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
    p.push('<text class="lbl mono" x="150" y="120" text-anchor="middle">port 199 = ' + hx(v) + " (" + sv + ")</text>");
    return svgWrap("0 0 300 126", "LED gösterge: " + sv, p.join(""), h);
  }
  function gaugeSvg(st, h) {
    var p = ['<rect class="m-lab-panel" x="0" y="0" width="300" height="96" rx="10"/>'];
    for (var i = 0; i < 4; i++) {
      var lit = (st.sel >> i) & 1;
      p.push(digitSvg(30 + i * 66, 14, 1.6, st.shown[i], lit ? true : false));
      p.push('<circle cx="' + (44 + i * 66) + '" cy="88" r="3" class="' + (lit ? "m-lab-lamp-g" : "m-lab-lamp-off") + '"/>');
    }
    p.push('<text class="lbl mono" x="150" y="120" text-anchor="middle">310h (bölüt) = ' + h2(st.a) + "h · 312h (hane) = " + h2(st.sel) + "h</text>");
    return svgWrap("0 0 300 126", "4 haneli 7 bölütlü gösterge", p.join(""), h);
  }
  function thermoSvg(t, heater, h) {
    var hh = Math.max(0, Math.min(170, (t + 40) * 1.0625)), p = [
      '<rect class="box-empty" x="40" y="10" width="26" height="180" rx="12"/>',
      '<rect x="46" y="' + (186 - hh).toFixed(0) + '" width="14" height="' + hh.toFixed(0) + '" rx="6" class="m-lab-lamp-r"/>',
      '<circle cx="53" cy="200" r="14" class="m-lab-lamp-r"/>'];
    [-40, 0, 40, 80, 120].forEach(function (v) {
      var y = 186 - (v + 40) * 1.0625;
      p.push('<path class="axis" d="M70 ' + y.toFixed(0) + ' H80"/><text class="lbl mono" x="84" y="' + (y + 4).toFixed(0) + '">' + v + "</text>");
    });
    [60, 80].forEach(function (v) {
      var y = 186 - (v + 40) * 1.0625;
      p.push('<path class="line" d="M30 ' + y.toFixed(0) + ' H76" style="stroke:var(--ds-good);stroke-dasharray:4 3"/>');
    });
    p.push('<text class="txt" x="130" y="60">port 125: <tspan class="mono">' + t + " °C</tspan></text>");
    p.push('<rect x="130" y="96" width="140" height="44" rx="8" class="' + (heater ? "m-lab-lamp-y" : "m-lab-lamp-off") + '"/><text class="txt" x="200" y="124" text-anchor="middle">ısıtıcı ' + (heater ? "AÇIK" : "KAPALI") + "</text>");
    p.push('<text class="lbl mono" x="130" y="166">port 127 = ' + heater + "</text>");
    return svgWrap("0 0 280 220", "Termometre " + t + " derece, ısıtıcı " + (heater ? "açık" : "kapalı"), p.join(""), h);
  }

  document.querySelectorAll('.ds-deck [data-demo="m-lab"]').forEach(function (demo) {
    var examples = Array.from(demo.querySelectorAll('script[type="text/x-asm"]')).map(function (s) {
      var init = null, ports = null;
      try { if (s.dataset.init) init = JSON.parse(s.dataset.init); } catch (e) { init = null; }
      try { if (s.dataset.ports) ports = JSON.parse(s.dataset.ports); } catch (e) { ports = null; }
      return { name: s.dataset.name || "Örnek", init: init, ports: ports, input: s.dataset.input != null ? s.dataset.input.replace(/\\r/g, "\r").replace(/\\b/g, "\b").replace(/\\e/g, "\x1b") : null,
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
    pick.setAttribute("aria-label", "Hazır örnek");
    examples.forEach(function (ex, i) { var o = el("option", null, esc(ex.name)); o.value = i; pick.appendChild(o); });
    var btns = el("div", "m-lab__btns");
    var bEdit = btn("edit", "Düzenle"), bRun = btn("run", "Çalıştır", "Programı sonuna kadar çalıştır");
    var bBack = btn("back", "◀ Geri", "Bir adım geri"), bStep = btn("step", "Adım ▶", "Bir komut yürüt");
    var bPlay = btn("play", "Oynat", "Adımları otomatik oynat"), bReset = btn("reset", "Sıfırla", "Programı başa al");
    [bEdit, bRun, bBack, bStep, bPlay, bReset].forEach(function (b) { btns.appendChild(b); });
    bar.appendChild(pick); bar.appendChild(btns);

    var main = el("div", "m-lab__main");
    var pCode = el("div", "m-lab__panel");
    var codeHead = el("div", "m-lab__head");
    var codeTitle = el("p", "m-lab__title", "Kod");
    var bExp = el("button", "m-lab__toggle", "Açılım");
    bExp.type = "button"; bExp.setAttribute("aria-pressed", "false");
    bExp.title = "Makro açılımını göster ya da gizle";
    codeHead.appendChild(codeTitle); codeHead.appendChild(bExp);
    var code = el("div", "m-lab__code");
    code.setAttribute("aria-label", "Program kodu");
    var src = el("textarea", "m-lab__src");
    src.spellcheck = false; src.hidden = true; src.setAttribute("aria-label", "Program kaynağı (düzenlenebilir)");
    var kbd = el("div", "m-lab__kbd");
    var kbdIn = el("input");
    kbdIn.type = "text"; kbdIn.setAttribute("aria-label", "Klavye girdisi: yazılan tuşlar programa gider (Enter, geri silme ve Esc de)");
    kbdIn.placeholder = "tuş yaz"; kbdIn.autocomplete = "off"; kbdIn.spellcheck = false;
    var kbdQ = el("span", "m-lab__queue");
    kbd.appendChild(el("b", null, "Girdi")); kbd.appendChild(kbdIn); kbd.appendChild(kbdQ);
    pCode.appendChild(codeHead); pCode.appendChild(code); pCode.appendChild(src); pCode.appendChild(kbd);

    var pCpu = el("div", "m-lab__panel m-lab__mono");
    pCpu.appendChild(el("p", "m-lab__title", "Yazmaçlar"));
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
    pCpu.appendChild(el("p", "m-lab__title", "Bayraklar")).style.marginTop = "6px";
    pCpu.appendChild(flagBox); pCpu.appendChild(ipNote);

    var pSide = el("div", "m-lab__panel m-lab__mono");
    var memTitle = pSide.appendChild(el("p", "m-lab__title"));
    var memBox = pSide.appendChild(el("div", "m-lab__mem"));
    var stackTitle = pSide.appendChild(el("p", "m-lab__title m-lab__sub", "Yığın <b>SS:SP</b>"));
    var stackBox = pSide.appendChild(el("div", "m-lab__stack"));
    var scrTitle = pSide.appendChild(el("p", "m-lab__title m-lab__sub", "Çıktı"));
    var mini = pSide.appendChild(el("canvas", "m-lab__mini"));
    mini.setAttribute("aria-hidden", "true");
    var outBox = pSide.appendChild(el("div", "m-lab__out"));
    outBox.setAttribute("aria-live", "polite");
    var devTitle = pSide.appendChild(el("p", "m-lab__title m-lab__sub", "Aygıtlar"));
    var devBox = pSide.appendChild(el("div", "m-lab__dev"));
    var devSvg = devBox.appendChild(el("div", "m-lab__devsvg"));
    var devCtl = devBox.appendChild(el("div", "m-lab__devctl"));
    var devPorts = devBox.appendChild(el("div", "m-lab__ports"));
    main.appendChild(pCode); main.appendChild(pCpu); main.appendChild(pSide);

    var status = el("p", "m-lab__status");
    status.setAttribute("aria-live", "polite");
    demo.appendChild(bar); demo.appendChild(main); demo.appendChild(status);

    /* ---------- durum ---------- */
    var ex = examples[0], text = "", prog = null, mach = null, n = 0, rec = null, done = null, err = null, timer = null, editing = false;
    var memBase = 0, memSeg = null, rows = [], varAt = {}, init = null, showExp = false, hasExp = false;
    var typed = "", waiting = null, resume = null, stackTag = {}, inLog = {}, inIdx = {}, adj = {}, gauge = null, view = VIEWS.normal;
    var chW = 0;

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
        rng.setAttribute("aria-label", (a.v.ad || "port " + a.port) + " değeri");
        var val = el("b", "m-lab__mono", String(adj[a.port]));
        rng.addEventListener("input", function () {
          adj[a.port] = parseInt(rng.value, 10);
          val.textContent = rng.value;
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
      if (view.scr) scrTitle.textContent = view.scr;
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
      if (full) { typed = ""; for (var k in inLog) inLog[k] = []; }
      for (var p in inIdx) inIdx[p] = 0;
      gauge = { a: 0, sel: 0, shown: [0, 0, 0, 0] };
      if (err && err.asm) { mach = null; render(); return; }
      err = null;
      var o = { cxSize: true, repStep: true, init: init || undefined, input: (ex.input || "") + typed, ports: buildPorts(),
        clock: ex.clock, date: ex.date, pollDelay: ex.poll };
      try { mach = new M.Machine(prog, o); }
      catch (e) { if (!(e instanceof M.EmuError)) throw e; delete o.init; mach = new M.Machine(prog, o); }
      var ib = initBase();
      memSeg = null;
      memBase = Math.max(0, ((ib != null ? ib : firstVar()) & ~7));
      if (prog.com && ex.view === "kesme") stackTag[mach.initSp & 0xFFFF] = "DOS dönüşü";
      render();
    }
    /* bir adım; false: ilerlenemedi */
    function stepOnce() {
      if (!mach || done || (err && !err.soft)) return false;
      try {
        var r = mach.stepRecord();
        if (r == null) { done = mach.halted; return false; }
        rec = r; n++; waiting = null;
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
        if (st.far) { stackTag[sp] = "dönüş IP"; stackTag[(sp + 2) & 0xFFFF] = "dönüş CS"; }
        else stackTag[sp] = "dönüş adresi";
      } else if (op === "PUSH") stackTag[sp] = st.ops[0].kind === "imm" ? "sabit" : (st.ops[0].reg || st.ops[0].text);
      else if (op === "PUSHF") stackTag[sp] = "FLAGS";
    }
    /* aygıt durumları port yazımlarından */
    function devices(r) {
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
      if (!timer) return;
      clearInterval(timer); timer = null;
      bPlay.textContent = "Oynat"; bPlay.setAttribute("aria-label", "Adımları otomatik oynat");
    }
    function play() {
      if (timer) { stop(); resume = null; render(); return; }
      if (done || (err && !err.soft)) reset(true);
      resume = "play";
      bPlay.textContent = "Durdur"; bPlay.setAttribute("aria-label", "Otomatik oynatmayı durdur");
      timer = setInterval(function () {
        if (!slide.classList.contains("is-active")) { stop(); render(); return; }
        if (!stepOnce() && !waiting) stop();
        else if (done || (err && !err.soft)) stop();
        render();
      }, PLAY_MS);
    }
    function runAll() {
      if (editing) setEditing(false);
      stop();
      if (err && err.asm) return;
      if (done || (err && !err.soft)) reset(true);
      var k = 0;
      resume = "run";
      while (k++ < MAX_RUN && stepOnce()) {
        if (mach.pollEmpty && !mach.input.length) { waiting = { poll: true }; break; }
      }
      if (!done && !err && !waiting) err = { msg: MAX_RUN + " adımda bitmedi; sonsuz döngü olabilir. Adım, Geri ya da Sıfırla ile incelenebilir", soft: true };
      render();
    }
    function setEditing(on) {
      if (on) {
        editing = true; stop();
        src.value = text; src.hidden = false; code.hidden = true;
        codeTitle.textContent = "Kod (düzenleniyor)";
        bEdit.textContent = "Bitti";
        render();
        src.focus();
      } else {
        editing = false;
        src.hidden = true; code.hidden = false;
        bEdit.textContent = "Düzenle";
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
          e.title = l.macro + " açılımı";
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
      return nm ? nm + " = " + h4(seg) + "h" : "kesim " + h4(seg) + "h";
    }
    function memNote(seg) {
      if (seg === 0 && memBase < 0x400) return " · IVT";
      if (seg === 0xB800) return " · ekran";
      return "";
    }
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
      outBox.title = "Satır " + r0 + "–" + Math.min(24, r0 + nrows - 1) + ", sütun " + c0 + "–" + Math.min(79, c0 + cols - 1) + "; imleç (" + mach.cursor[0] + ", " + mach.cursor[1] + ")";
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
      devPorts.innerHTML = list.length ? list.join("") : '<span class="is-none">henüz port erişimi yok</span>';
    }
    function devNote() {
      if (!rec || !rec.st || !rec.info) return "";
      var p = rec.info.port;
      if (rec.st.op === "OUT") {
        if (p === 4 && ex.dev.indexOf("trafik") >= 0) return " " + trafficText(rec.info.v);
        if (p === 199 && ex.dev.indexOf("led") >= 0) { var v = rec.info.v; return " LED göstergede " + (v & 0x8000 ? v - 0x10000 : v) + " görünür (işaretli onluk)."; }
        if (p === 127 && ex.dev.indexOf("termometre") >= 0) return " Isıtıcı " + (rec.info.v ? "açılır." : "kapanır.");
        if (p === 0x310 && ex.dev.indexOf("gosterge") >= 0) return " Port A bölüt desenini (" + h2(rec.info.v) + "h) taşır; hane seçimi açık olan hanede görünür.";
        if (p === 0x312 && ex.dev.indexOf("gosterge") >= 0) return rec.info.v & 15 ? " Port C'de bit " + Math.log2(rec.info.v & 15) + " = 1: yalnız o hane yanar." : " Port C = 0: bütün haneler sönük.";
      }
      if (rec.st.op === "IN" && p === 125 && ex.dev.indexOf("termometre") >= 0) {
        var t = rec.info.v & 0x80 ? rec.info.v - 256 : rec.info.v;
        return " Termometre " + t + " °C gösteriyor" + (t < 0 ? " (işaretli bayt " + h2(rec.info.v) + "h)" : "") + ".";
      }
      return "";
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
        if (top < code.scrollTop + lh || top + 3 * lh > code.scrollTop + code.clientHeight) code.scrollTop = Math.max(0, top - code.clientHeight / 3);
      }
      if (!editing) codeTitle.innerHTML = "Kod" + (prog ? " · <b>" + prog.image.reduce(function (a, im) { return a + im[1].length; }, 0) + " bayt</b>" : "");
      kbd.hidden = !needsInput();
      kbd.classList.toggle("is-wait", !!waiting);
      if (!kbd.hidden) {
        var all = mach ? (ex.input || "") + typed : "", used = mach ? mach.keysRead : 0, q = "";
        var from = Math.max(0, all.length - 14);
        for (var i = from; i < all.length; i++) q += '<span class="' + (i < used ? "is-used" : "") + '">' + esc(keyGlyph(all.charAt(i))) + "</span>";
        kbdQ.innerHTML = q || '<span class="is-none">kuyruk boş</span>';
        kbdQ.title = "Okunan tuşlar soluk, sıradakiler koyu gösterilir.";
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
        c.title = f + (und ? " (8086'da tanımsız)" : "");
      });
      ipNote.textContent = mach ? "CS:IP = " + h4(mach.s[1]) + ":" + h4(mach.ip) + " · adım " + n : "";
      if (mach) {
        /* bellek */
        var seg = memSeg == null ? mach.s[3] : memSeg, written = {};
        if (rec) rec.mem.forEach(function (w) { written[w[0]] = 1; });
        memTitle.innerHTML = "Bellek <b>" + segName(memSeg) + "</b>" + memNote(seg);
        var mrows = "";
        for (var r = 0; r < view.mem; r++) {
          var off = (memBase + 8 * r) & 0xFFFF, bytes = "";
          for (var b = 0; b < 8; b++) {
            var o2 = (off + b) & 0xFFFF, ph = mach.phys(seg, o2), v = mach.mem[ph], nm = varAt[ph];
            if (!nm && ph < 0x400) nm = "INT " + h2(ph >> 2) + "h vektörü: " + ((ph & 3) < 2 ? "IP" : "CS") + ((ph & 1) ? " yüksek bayt" : " düşük bayt");
            var cls = (written[ph] ? "is-changed" : "") + (varAt[ph] ? " is-var" : "");
            bytes += '<span class="' + cls + '"' + (nm ? ' title="' + esc(nm) + '"' : "") + ">" + h2(v) + "</span>";
          }
          mrows += "<div><i>" + h4(off) + '</i><span class="m-lab__bytes">' + bytes + "</span></div>";
        }
        memBox.innerHTML = mrows;
        /* yığın */
        if (view.stack) {
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
        if (view.scr) renderScreen();
        if (view.dev) renderDevices();
      } else {
        memTitle.innerHTML = "Bellek"; memBox.innerHTML = ""; stackBox.innerHTML = ""; outBox.innerHTML = ""; devSvg.innerHTML = ""; devPorts.innerHTML = "";
      }
      /* düğmeler */
      var stuck = !mach || !!done || !!(err && !err.soft) || editing;
      bStep.disabled = stuck; bPlay.disabled = (!mach || editing) && !timer;
      bBack.disabled = !mach || n === 0 || editing; bReset.disabled = !mach || editing;
      bRun.disabled = !!(err && err.asm) && !editing;
      pick.disabled = editing; bExp.disabled = editing;
      /* durum satırı */
      status.classList.toggle("is-error", !!err && !err.soft);
      status.classList.toggle("is-wait", !!waiting);
      status.innerHTML = statusText();
    }
    function statusText() {
      if (editing) return "Kod düzenlenebilir. Bitti düğmesi programı yeniden assemble eder; Çalıştır düğmesi programı sonuna kadar yürütür.";
      if (err && err.asm) return "<b>Assembly hatası" + (err.line ? " (satır " + err.line + ")" : "") + ":</b> " + esc(err.msg) + ".";
      var s = rec ? esc(rec.text) + esc(devNote()) : "";
      if (waiting) {
        var w = waiting.poll ? "<b>Program tuş yokluyor:</b> Girdi kutusuna bir tuş yazılınca devam eder." :
          "<b>Girdi bekleniyor:</b> " + esc(waiting.what) + (/0Ah/.test(waiting.what || "") ? " Enter ile biten bir satır okur" : " bir tuş okur") +
          "; Girdi kutusuna yazılınca program kaldığı yerden sürer.";
        return (s ? s + " " : "") + w;
      }
      if (err) return (s ? s + " " : "") + "<b>" + (err.soft ? "Durduruldu:" : "Çalışma hatası:") + "</b> " + esc(err.msg) + ".";
      if (done) {
        if (/^kod sonu/.test(done)) return (s ? s + " " : "") + "<b>IP = " + h4(mach.ip) + "h adresinde komut yok; program burada durur.</b>";
        return s + " <b>Program bitti (" + n + " adım).</b>";
      }
      if (rec) return s;
      var size = prog.image.reduce(function (a, im) { return a + im[1].length; }, 0);
      var note = initNote(), extra = [];
      if (ex.input) extra.push("Girdi kuyruğunda hazır tuşlar var: <b>" + esc(ex.input.split("").map(keyGlyph).join(" ")) + "</b>; başka tuşlar Girdi kutusuna yazılabilir.");
      else if (needsInput()) extra.push("Program klavyeden okuyunca Girdi kutusuna yazılan tuşları alır.");
      if (adjustables().length) extra.push("Termometre değeri kaydırıcıyla değiştirilebilir.");
      if (hasExp && !showExp) extra.push("Açılım düğmesi makroların ürettiği satırları gösterir.");
      return "Program yüklendi: " + size + " bayt, CS:IP = " + h4(mach.s[1]) + ":" + h4(mach.ip) + "h. " +
        (note ? "Başlangıç belleği slayttaki varsayımla doldurulur: <b>" + note + "</b>. " : prog.com && !extra.length ? "emu8086'daki gibi CX başlangıçta program boyutunu (" + hx(size) + ") gösterir. " : "") +
        (extra.length ? extra.join(" ") + " " : "") +
        "Adım düğmesiyle komutlar tek tek yürütülür; vurgulu satır sıradaki komuttur.";
    }

    /* ---------- olaylar ---------- */
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-act]");
      if (!b || b.disabled) return;
      var act = b.dataset.act;
      if (act === "edit") { setEditing(!editing); return; }
      if (act === "run") { if (editing) { editing = false; src.hidden = true; code.hidden = false; bEdit.textContent = "Düzenle"; if (src.value !== text) load(src.value.replace(/\s+$/, "") + "\n", true); } runAll(); return; }
      if (act === "step") { stop(); resume = "step"; stepOnce(); render(); return; }
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
    /* tema değişince küçük ekran haritası yeniden boyanır */
    if (window.MutationObserver) new MutationObserver(function () { if (mach && view.mini) render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    if (window.matchMedia) { var mq = window.matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", function () { if (mach && view.mini) render(); }); }
    choose(0);
  });
})();
