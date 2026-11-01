/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* 8086 laboratuvarı: sunuma gömülü adım adım 8086 yürütücüsü (deck.js ve mini8086.js'ten sonra yüklenir).
   <div class="ds-deck__demo m-lab" data-demo="m-lab">
     <script type="text/x-asm" data-name="Örnek adı">ORG 100h …</script>  (bir ya da daha çok hazır örnek)
     isteğe bağlı başlangıç belleği: data-init='{"mem": {"DS:0500h": ["25h", "17h"]}}' ya da '{"mem": {"DS:0200h": "ABC"}}'
     REP önekli dizgi komutları tur tur yürütülür (her tur bir adım; emu8086.py rep_step=True ile aynı).
   </div>
   Arayüz bu betikte kurulur: solda kod (o anki satır vurgulu; Düzenle ile textarea), ortada yazmaçlar ve bayraklar,
   sağda DS bellek dökümü, SS:SP çevresi ve çıktı; altta her adımın Türkçe açıklaması.
   Geri düğmesi programı baştan k − 1 adım yeniden yürütür (yorumlayıcı belirlenimcidir). */
(function () {
  "use strict";
  if (["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) < 0) return;
  var M = window.Mini8086;
  if (!M) return;
  var hx = M.hx, MAX_RUN = 5000, PLAY_MS = 650;
  var GP = ["AX", "BX", "CX", "DX"], PAIRS = [["SI", "DI", "BP"], ["SP", "CS", "IP"], ["DS", "ES", "SS"]];
  var FL = ["OF", "DF", "IF", "TF", "SF", "ZF", "AF", "PF", "CF"];
  var MEM_ROWS = 5, STACK_ROWS = 5;

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function h4(v) { return hx(v).slice(0, 4); }
  function h2(v) { return hx(v, 1).slice(0, 2); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function btn(act, text, label) {
    var b = el("button", "ds-deck__button ds-deck__button--sm", esc(text));
    b.type = "button"; b.dataset.act = act;
    if (label) b.setAttribute("aria-label", label);
    return b;
  }

  document.querySelectorAll('.ds-deck [data-demo="m-lab"]').forEach(function (demo) {
    var examples = Array.from(demo.querySelectorAll('script[type="text/x-asm"]')).map(function (s) {
      var init = null;
      try { if (s.dataset.init) init = JSON.parse(s.dataset.init); } catch (e) { init = null; }
      return { name: s.dataset.name || "Örnek", init: init, src:s.textContent.replace(/^\n/, "").replace(/\s+$/, "") + "\n" };
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
    var codeTitle = el("p", "m-lab__title", "Kod");
    var code = el("div", "m-lab__code");
    code.setAttribute("aria-label", "Program kodu");
    var src = el("textarea", "m-lab__src");
    src.spellcheck = false; src.hidden = true; src.setAttribute("aria-label", "Program kaynağı (düzenlenebilir)");
    pCode.appendChild(codeTitle); pCode.appendChild(code); pCode.appendChild(src);

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
        if (!r) return;
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
    pSide.appendChild(el("p", "m-lab__title", "Yığın <b>SS:SP</b>")).style.marginTop = "4px";
    var stackBox = pSide.appendChild(el("div", "m-lab__stack"));
    pSide.appendChild(el("p", "m-lab__title", "Çıktı")).style.marginTop = "4px";
    var outBox = pSide.appendChild(el("div", "m-lab__out"));
    outBox.setAttribute("aria-live", "polite");
    main.appendChild(pCode); main.appendChild(pCpu); main.appendChild(pSide);

    var status = el("p", "m-lab__status");
    status.setAttribute("aria-live", "polite");
    demo.appendChild(bar); demo.appendChild(main); demo.appendChild(status);

    /* ---------- durum ---------- */
    var text = "", prog = null, mach = null, n = 0, rec = null, done = null, err = null, timer = null, editing = false;
    var memBase = 0, lineEls = [], varAt = {}, init = null;

    /* örnek etiketindeki data-init: {"mem": {"DS:0500h": ["25h", "17h"]}} ya da {"mem": {"DS:0200h": "ABC"}} */
    function initNote() {
      if (!init || !init.mem) return "";
      return Object.keys(init.mem).map(function (k) {
        var v = init.mem[k], bytes = typeof v === "string" ? v.split("").map(function (c) { return c.charCodeAt(0); }) :
          (Array.isArray(v) ? v : [v]).map(function (x) { return typeof x === "string" ? M.parseNumber(x) : x; });
        return esc(k) + " = " + bytes.map(function (x) { return h2(x) + "h"; }).join(", ") + (typeof v === "string" ? " ('" + esc(v) + "')" : "");
      }).join("; ");
    }
    function initBase() {
      if (!init || !init.mem) return null;
      var mm = /:\s*([0-9A-F]+)h?$/i.exec(Object.keys(init.mem)[0]);
      return mm ? parseInt(mm[1], 16) : null;
    }
    function load(source, newInit) {
      if (newInit !== undefined) init = newInit;
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
      drawCode();
      reset();
    }
    function firstVar() {
      var best = null;
      for (var k in prog.syms) { var y = prog.syms[k]; if (y.kind === "var" && (best == null || y.off < best)) best = y.off; }
      return best == null ? 0x100 : best;
    }
    function reset() {
      stop();
      n = 0; rec = null; done = null;
      if (err && err.asm) { mach = null; render(); return; }
      err = null;
      try { mach = new M.Machine(prog, { cxSize: true, repStep: true, init: init || undefined }); }
      catch (e) { if (!(e instanceof M.EmuError)) throw e; mach = new M.Machine(prog, { cxSize: true, repStep: true }); }
      var ib = initBase();
      memBase = Math.max(0, ((ib != null ? ib : firstVar()) & ~7));
      render();
    }
    /* bir adım; false: ilerlenemedi */
    function stepOnce() {
      if (!mach || done || err) return false;
      try {
        var r = mach.stepRecord();
        if (r == null) { done = mach.halted; return false; }
        rec = r; n++;
        if (mach.halted) done = mach.halted;
        followMem(r);
        return true;
      } catch (e) {
        if (!(e instanceof M.EmuError)) throw e;
        err = { msg: e.message };
        return false;
      }
    }
    var STACKY = { PUSH: 1, POP: 1, PUSHF: 1, POPF: 1, CALL: 1, RET: 1, RETN: 1, RETF: 1, INT: 1, IRET: 1, INTO: 1, _BIOS: 1 };
    function followMem(r) {
      var ds = mach.s[3], hit = null;
      if (!r.st || STACKY[r.st.op]) return;
      r.mem.forEach(function (w) { if (hit == null && w[1] === ds) hit = w[2]; });
      r.pre.forEach(function (p) { if (hit == null && p.ea && p.ea[0] === ds) hit = p.ea[1]; });
      if (hit == null) return;
      if (hit < memBase || hit >= memBase + 8 * MEM_ROWS) memBase = Math.max(0, (hit & ~7) - 8);
    }
    function goTo(k) {
      var keepBase = memBase;
      reset();
      while (n < k && stepOnce()) { /* yeniden yürüt */ }
      if (k > 0) memBase = keepBase;
      render();
    }
    function stop() {
      if (!timer) return;
      clearInterval(timer); timer = null;
      bPlay.textContent = "Oynat"; bPlay.setAttribute("aria-label", "Adımları otomatik oynat");
    }
    function play() {
      if (timer) { stop(); render(); return; }
      if (done || err) reset();
      bPlay.textContent = "Durdur"; bPlay.setAttribute("aria-label", "Otomatik oynatmayı durdur");
      timer = setInterval(function () {
        if (!slide.classList.contains("is-active")) { stop(); render(); return; }
        if (!stepOnce() || done || err) stop();
        render();
      }, PLAY_MS);
    }
    function runAll() {
      if (editing) { setEditing(false); }
      stop();
      if (err && err.asm) return;
      if (done || err) reset();
      var k = 0;
      while (k++ < MAX_RUN && stepOnce()) { /* sonuna kadar */ }
      if (!done && !err) err = { msg: MAX_RUN + " adımda bitmedi; sonsuz döngü olabilir. Geri ya da Sıfırla ile incelenebilir." , soft: true };
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
        if (src.value !== text) load(src.value.replace(/\s+$/, "") + "\n"); else render();
      }
    }

    /* ---------- çizim ---------- */
    function drawCode() {
      code.innerHTML = "";
      lineEls = [];
      text.replace(/\n$/, "").split("\n").forEach(function (ln, i) {
        var d = el("div", "m-lab__ln", "<i>" + (i + 1) + "</i><span>" + (esc(ln) || " ") + "</span>");
        code.appendChild(d); lineEls.push(d);
      });
    }
    function curLine() {
      if (!mach || done) return 0;
      try {
        var cs = mach.s[1], st = prog.code[mach.phys(cs, mach.ip)];
        return st ? st.line : 0;
      } catch (e) { return 0; }
    }
    function render() {
      var regs = mach ? mach.regs() : null, before = rec ? rec.before : null, line = curLine();
      /* kod */
      var prevLine = rec && rec.st ? rec.st.line : 0;
      lineEls.forEach(function (d, i) {
        d.classList.toggle("is-current", i + 1 === line);
        d.classList.toggle("is-prev", i + 1 === prevLine && i + 1 !== line);
        d.classList.toggle("is-error", !!(err && err.asm && err.line === i + 1));
      });
      var focus = lineEls[(line || prevLine || (err && err.line) || 1) - 1];
      if (focus && !code.hidden) {
        var top = focus.offsetTop - code.offsetTop, lh = focus.offsetHeight;
        if (top < code.scrollTop + lh || top + 3 * lh > code.scrollTop + code.clientHeight) code.scrollTop = Math.max(0, top - code.clientHeight / 3);
      }
      if (!editing) codeTitle.innerHTML = "Kod" + (prog ? " · <b>" + prog.image.reduce(function (a, im) { return a + im[1].length; }, 0) + " bayt</b>" : "");
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
      /* bellek */
      if (mach) {
        var ds = mach.s[3], written = {};
        if (rec) rec.mem.forEach(function (w) { written[w[0]] = 1; });
        memTitle.innerHTML = "Bellek <b>DS = " + h4(ds) + "h</b>";
        var rows = "";
        for (var r = 0; r < MEM_ROWS; r++) {
          var off = (memBase + 8 * r) & 0xFFFF, bytes = "";
          for (var b = 0; b < 8; b++) {
            var o2 = (off + b) & 0xFFFF, ph = mach.phys(ds, o2), v = mach.mem[ph], nm = varAt[ph];
            var cls = (written[ph] ? "is-changed" : "") + (nm ? " is-var" : "");
            bytes += '<span class="' + cls + '"' + (nm ? ' title="' + esc(nm) + '"' : "") + ">" + h2(v) + "</span>";
          }
          rows += "<div><i>" + h4(off) + '</i><span class="m-lab__bytes">' + bytes + "</span></div>";
        }
        memBox.innerHTML = rows;
        /* yığın */
        var sp = mach.r[4], ss = mach.s[2], top = mach.initSp, start, srows = "";
        start = sp >= top - 2 * (STACK_ROWS - 1) ? top - 2 * (STACK_ROWS - 1) : sp;
        if (start < 0) start = 0;
        for (var q = 0; q < STACK_ROWS; q++) {
          var a = (start + 2 * q) & 0xFFFF, isSp = a === sp, free = a < sp;
          srows += '<div class="' + (isSp ? "is-sp" : free ? "is-free" : "") + '"><i>' + h4(a) + "</i><span>" + h4(mach.rd16(ss, a)) + "</span>" + (isSp ? "<span>◀ SP</span>" : "") + "</div>";
        }
        stackBox.innerHTML = srows;
        outBox.textContent = mach.out.replace(/\r\n/g, "\n").replace(/\r/g, "");
      } else {
        memTitle.innerHTML = "Bellek"; memBox.innerHTML = ""; stackBox.innerHTML = ""; outBox.textContent = "";
      }
      /* düğmeler */
      var stuck = !mach || !!done || !!(err && !err.soft) || editing;
      bStep.disabled = stuck; bPlay.disabled = (!mach || editing) && !timer;
      bBack.disabled = !mach || n === 0 || editing; bReset.disabled = !mach || editing;
      bRun.disabled = !!(err && err.asm) && !editing;
      pick.disabled = editing;
      /* durum satırı */
      status.classList.toggle("is-error", !!err && !err.soft);
      status.innerHTML = statusText();
    }
    function statusText() {
      if (editing) return "Kod düzenlenebilir. Bitti düğmesi programı yeniden assemble eder; Çalıştır düğmesi programı sonuna kadar yürütür.";
      if (err && err.asm) return "<b>Assembly hatası" + (err.line ? " (satır " + err.line + ")" : "") + ":</b> " + esc(err.msg) + ".";
      var s = rec ? esc(rec.text) : "";
      if (err) return (s ? s + " " : "") + "<b>" + (err.soft ? "Durduruldu:" : "Çalışma hatası:") + "</b> " + esc(err.msg) + ".";
      if (done) {
        if (/^kod sonu/.test(done)) return (s ? s + " " : "") + "<b>IP = " + h4(mach.ip) + "h adresinde komut yok; program burada durur.</b>";
        return s + " <b>Program bitti (" + n + " adım).</b>";
      }
      if (rec) return s;
      var size = prog.image.reduce(function (a, im) { return a + im[1].length; }, 0);
      var note = initNote();
      return "Program yüklendi: " + size + " bayt, CS:IP = " + h4(mach.s[1]) + ":" + h4(mach.ip) + "h. " +
        (note ? "Başlangıç belleği slayttaki varsayımla doldurulur: <b>" + note + "</b>. " : prog.com ?"emu8086'daki gibi CX başlangıçta program boyutunu (" + hx(size) + ") gösterir. " : "") +
        "Adım düğmesiyle komutlar tek tek yürütülür; vurgulu satır sıradaki komuttur.";
    }

    /* ---------- olaylar ---------- */
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-act]");
      if (!b || b.disabled) return;
      var act = b.dataset.act;
      if (act === "edit") { setEditing(!editing); return; }
      if (act === "run") { if (editing) { editing = false; src.hidden = true; code.hidden = false; bEdit.textContent = "Düzenle"; if (src.value !== text) load(src.value.replace(/\s+$/, "") + "\n"); } runAll(); return; }
      if (act === "step") { stop(); stepOnce(); render(); return; }
      if (act === "back") { stop(); goTo(n - 1); return; }
      if (act === "play") { play(); return; }
      if (act === "reset") { reset(); }
    });
    pick.addEventListener("change", function () { var ex = examples[+pick.value]; load(ex.src, ex.init); });
    load(examples[0].src, examples[0].init);
  });
})();
