/*
 * Shared pieces of the /art/ scenes: palette reduction, frame buffers,
 * raster helpers and the player shell (controls, keys, fullscreen, loop).
 * Each scene keeps its own camera, geometry, shading, print pass and sound.
 */
(function () {
  "use strict";

  var A = {};

  A.hex = function (h) {
    return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  };

  A.ramp = function (a, b, n) {
    var ca = A.hex(a), cb = A.hex(b), out = [];
    for (var i = 0; i < n; i++) {
      var k = n === 1 ? 0 : i / (n - 1);
      out.push([ca[0] + (cb[0] - ca[0]) * k, ca[1] + (cb[1] - ca[1]) * k, ca[2] + (cb[2] - ca[2]) * k]);
    }
    return out;
  };

  A.hyp2 = function (a, b) { return Math.sqrt(a * a + b * b); };
  A.hyp3 = function (a, b, c) { return Math.sqrt(a * a + b * b + c * c); };
  A.frac = function (v) { return v - Math.floor(v); };
  A.hash = function (i) { return A.frac(Math.sin(i * 12.9898) * 43758.5453); };

  /* 15-bit colour -> nearest palette entry, weighted towards green. */
  A.lut = function (palette) {
    var lut = new Uint8Array(32 * 32 * 32 * 3);
    for (var r = 0; r < 32; r++) for (var g = 0; g < 32; g++) for (var b = 0; b < 32; b++) {
      var R = r * 8.226, G = g * 8.226, B = b * 8.226, best = 0, bd = 1e9;
      for (var p = 0; p < palette.length; p++) {
        var c = palette[p];
        var dr = R - c[0], dg = G - c[1], db = B - c[2];
        var d = dr * dr * 0.5 + dg * dg * 0.7 + db * db * 0.35;
        if (d < bd) { bd = d; best = p; }
      }
      var i = ((r << 10) | (g << 5) | b) * 3, c2 = palette[best];
      lut[i] = c2[0]; lut[i + 1] = c2[1]; lut[i + 2] = c2[2];
    }
    return lut;
  };

  A.BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

  /* Off-screen film the scene renders into, plus its depth buffer. */
  A.film = function (W, H) {
    var canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext("2d");
    var frame = ctx.createImageData(W, H);
    return { canvas: canvas, ctx: ctx, frame: frame, px: frame.data, zbuf: new Float32Array(W * H) };
  };

  function Mesh() { this.p = []; this.c = []; }
  Mesh.prototype.quad = function (ax, ay, az, bx, by, bz, cx, cy, cz, dx, dy, dz, r, g, b) {
    this.p.push(ax, ay, az, bx, by, bz, cx, cy, cz, dx, dy, dz);
    this.c.push(r, g, b);
  };
  Mesh.prototype.clear = function () { this.p.length = 0; this.c.length = 0; };
  A.Mesh = Mesh;

  /*
   * Columns of row centre q that can lie inside the triangle, written to A.span
   * (±1 px slack; the rasteriser's per-pixel test stays exact).
   */
  var span = A.span = { xs: 0, xe: -1 };
  A.rowSpan = function (q, x0, y0, x1, y1, x2, y2, inv, lo, hi) {
    var a0 = (x1 * (y2 - q) - x2 * (y1 - q)) * inv, b0 = (y1 - y2) * inv;
    var a1 = (x2 * (y0 - q) - x0 * (y2 - q)) * inv, b1 = (y2 - y0) * inv;
    var a2 = 1 - a0 - a1, b2 = -b0 - b1;
    var pl = -Infinity, ph = Infinity;
    if (b0 > 1e-12) pl = Math.max(pl, -a0 / b0); else if (b0 < -1e-12) ph = Math.min(ph, -a0 / b0); else if (a0 < -1e-9) ph = -Infinity;
    if (b1 > 1e-12) pl = Math.max(pl, -a1 / b1); else if (b1 < -1e-12) ph = Math.min(ph, -a1 / b1); else if (a1 < -1e-9) ph = -Infinity;
    if (b2 > 1e-12) pl = Math.max(pl, -a2 / b2); else if (b2 < -1e-12) ph = Math.min(ph, -a2 / b2); else if (a2 < -1e-9) ph = -Infinity;
    span.xs = Math.max(lo, Math.floor(pl - 0.5));
    span.xe = Math.min(hi, Math.ceil(ph - 0.5));
  };

  var PLAY_D = "M4 2l9 6-9 6z", PAUSE_D = "M4 2h3v12H4zM9 2h3v12H9z";
  var SND_ON = "M3 6h2.5L9 3v10L5.5 10H3zM11.2 5.1l1-1c2.4 2 2.4 5.8 0 7.8l-1-1c1.7-1.5 1.7-4.3 0-5.8z";
  var SND_OFF = "M3 6h2.5L9 3v10L5.5 10H3zM11 6.4l1.1 1.1 1.1-1.1.9.9-1.1 1.1 1.1 1.1-.9.9-1.1-1.1-1.1 1.1-.9-.9L11.1 8.4 10 7.3z";
  var FULL_IN = "M2 2h5v2H4v3H2zM9 2h5v5h-2V4H9zM2 9h2v3h3v2H2zM12 9h2v5H9v-2h3z";
  var FULL_OUT = "M5 2h2v5H2V5h3zM9 2h2v3h3v2H9zM2 9h5v5H5v-3H2zM9 9h5v2h-3v3H9z";

  var L = {
    pause: "Pause", play: "Play",
    soundOn: "Sound on", soundOff: "Sound off",
    full: "Fullscreen", fullExit: "Exit fullscreen"
  };

  function two(n) { return String(n).padStart(2, "0"); }
  function mmss(s) { return two(Math.floor(s / 60)) + ":" + two(s % 60); }

  /*
   * Wire a scene into its page. Elements are found by id: <prefix>-stage,
   * -screen, -play, -sound, -full, -scrub, -clock and their -ico-* paths.
   * o: { prefix, app, W, H, fps, frames, frame0, film, frameColor, gain, render, startAudio }
   */
  A.mount = function (o) {
    var W = o.W, H = o.H, FPS = o.fps, FRAMES = o.frames;
    function $(id) { return document.getElementById(o.prefix + "-" + id); }
    var appEl = document.getElementById(o.app);
    var stage = $("stage"), sctx = stage.getContext("2d");
    var screenEl = $("screen"), scrub = $("scrub"), clock = $("clock");
    var btnPlay = $("play"), btnSound = $("sound"), btnFull = $("full");
    var icoPlay = $("ico-play"), icoSound = $("ico-sound"), icoFull = $("ico-full");
    var total = " / " + mmss(Math.round(FRAMES / FPS));

    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var playing = !calm, onScreen = true;
    var fr = o.frame0, acc = 0, last = 0, soundOn = false, audio = null;

    function present() {
      var host = stage.parentNode;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var cw = Math.max(64, host.clientWidth), ch = Math.max(64, host.clientHeight);
      if (stage.width !== Math.floor(cw * dpr) || stage.height !== Math.floor(ch * dpr)) {
        stage.width = Math.floor(cw * dpr); stage.height = Math.floor(ch * dpr);
        stage.style.width = cw + "px"; stage.style.height = ch + "px";
      }
      var scale = Math.min(stage.width / W, stage.height / H);
      var dw = Math.round(W * scale), dh = Math.round(H * scale);
      sctx.imageSmoothingEnabled = false;
      sctx.fillStyle = o.frameColor;
      sctx.fillRect(0, 0, stage.width, stage.height);
      sctx.drawImage(o.film, 0, 0, W, H, Math.round((stage.width - dw) / 2), Math.round((stage.height - dh) / 2), dw, dh);
    }

    function show() {
      o.render(fr);
      present();
      clock.textContent = mmss(Math.floor(fr / FPS)) + total;
      if (scrub.value !== String(fr)) scrub.value = String(fr);
    }

    function setPlaying(v) {
      playing = v;
      icoPlay.setAttribute("d", v ? PAUSE_D : PLAY_D);
      btnPlay.setAttribute("aria-label", v ? L.pause : L.play);
      btnPlay.title = btnPlay.getAttribute("aria-label") + " (Space)";
      if (audio) audio.ctx[v && onScreen ? "resume" : "suspend"]();
    }

    function setSoundLabel() {
      icoSound.setAttribute("d", soundOn ? SND_ON : SND_OFF);
      btnSound.setAttribute("aria-label", soundOn ? L.soundOff : L.soundOn);
      btnSound.title = btnSound.getAttribute("aria-label") + " (M)";
    }

    function toggleSound() {
      if (!audio) audio = o.startAudio();
      if (!audio) return;
      soundOn = !soundOn;
      if (playing && onScreen) audio.ctx.resume();
      audio.out.gain.cancelScheduledValues(audio.ctx.currentTime);
      audio.out.gain.setTargetAtTime(soundOn ? o.gain : 0.0001, audio.ctx.currentTime, 0.6);
      setSoundLabel();
    }

    var canFull = !!(screenEl.requestFullscreen || screenEl.webkitRequestFullscreen);
    function fullEl() { return document.fullscreenElement || document.webkitFullscreenElement; }
    function toggleFull() {
      if (fullEl()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else if (screenEl.requestFullscreen) screenEl.requestFullscreen().catch(function () {});
      else if (screenEl.webkitRequestFullscreen) screenEl.webkitRequestFullscreen();
    }
    function onFullChange() {
      var on = fullEl() === screenEl;
      icoFull.setAttribute("d", on ? FULL_OUT : FULL_IN);
      btnFull.setAttribute("aria-label", on ? L.fullExit : L.full);
      btnFull.title = btnFull.getAttribute("aria-label") + " (F)";
      present();
    }

    function seek(sec) {
      fr = ((fr + sec * FPS) % FRAMES + FRAMES) % FRAMES;
      show();
    }

    btnPlay.addEventListener("click", function () { setPlaying(!playing); });
    btnSound.addEventListener("click", toggleSound);
    scrub.addEventListener("input", function () { fr = Number(scrub.value) | 0; show(); });
    if (canFull) {
      btnFull.addEventListener("click", toggleFull);
      document.addEventListener("fullscreenchange", onFullChange);
      document.addEventListener("webkitfullscreenchange", onFullChange);
    } else {
      btnFull.hidden = true;
    }
    screenEl.addEventListener("click", function () { setPlaying(!playing); screenEl.focus(); });
    screenEl.addEventListener("dblclick", function () { if (canFull) toggleFull(); });
    appEl.addEventListener("keydown", function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var tag = e.target.tagName, k = e.key;
      if (k === " " || k === "Enter") {
        if (tag === "BUTTON") return;
        e.preventDefault(); setPlaying(!playing);
      } else if ((k === "ArrowLeft" || k === "ArrowRight") && tag !== "INPUT") {
        e.preventDefault(); seek(k === "ArrowLeft" ? -1 : 1);
      } else if ((k === "f" || k === "F") && canFull) {
        e.preventDefault(); toggleFull();
      } else if (k === "m" || k === "M") {
        e.preventDefault(); toggleSound();
      }
    });
    window.addEventListener("resize", present);

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) {
        onScreen = es[0].isIntersecting;
        if (audio) { if (onScreen && playing) audio.ctx.resume(); else audio.ctx.suspend(); }
      }, { threshold: 0.04 }).observe(appEl);
    }

    function loop(now) {
      if (!last) last = now;
      var dt = Math.min(0.25, (now - last) / 1000);
      last = now;
      if (playing && onScreen) {
        acc += dt;
        var st = 1 / FPS, moved = false;
        while (acc >= st) { acc -= st; fr = (fr + 1) % FRAMES; moved = true; }
        if (moved) show();
      }
      requestAnimationFrame(loop);
    }

    setSoundLabel();
    btnFull.setAttribute("aria-label", L.full);
    btnFull.title = L.full + " (F)";
    scrub.max = String(FRAMES - 1);
    setPlaying(playing);
    show();
    requestAnimationFrame(loop);
    return { present: present };
  };

  window.ArtKit = A;
})();
