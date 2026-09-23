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

  /* Mesh with a colour per corner, for Gouraud shading: 12 position and 12 colour values per quad. */
  function GMesh() { this.p = []; this.c = []; }
  GMesh.prototype.quad = function (ax, ay, az, bx, by, bz, cx, cy, cz, dx, dy, dz, r, g, b) {
    this.p.push(ax, ay, az, bx, by, bz, cx, cy, cz, dx, dy, dz);
    this.c.push(r, g, b, r, g, b, r, g, b, r, g, b);
  };
  GMesh.prototype.quadG = function (ax, ay, az, bx, by, bz, cx, cy, cz, dx, dy, dz, ca, cb, cc, cd) {
    this.p.push(ax, ay, az, bx, by, bz, cx, cy, cz, dx, dy, dz);
    this.c.push(ca[0], ca[1], ca[2], cb[0], cb[1], cb[2], cc[0], cc[1], cc[2], cd[0], cd[1], cd[2]);
  };
  GMesh.prototype.clear = function () { this.p.length = 0; this.c.length = 0; };
  A.GMesh = GMesh;

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

  /* 64x64 void-and-cluster blue noise, one byte per texel. */
  var BLUE = (function (b64) {
    var bin = atob(b64), out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  })("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");
  A.BLUE = BLUE;
  var BLUE_D = new Float32Array(4096);
  for (var bi = 0; bi < 4096; bi++) BLUE_D[bi] = (BLUE[bi] + 0.5) / 16 - 8;

  /*
   * Final print: vignette, film grain and blue-noise dither, then reduction to the palette.
   * p: { vig, grain, grainOff, dither }. Grain uses the transposed texture shifted every
   * frame so it never lines up with the static dither.
   */
  A.print = function (px, W, H, lut, fr, p) {
    var cx = W * 0.5, cy = H * 0.5, rmax = Math.sqrt(cx * cx + cy * cy);
    var ox = (fr * 37) & 63, oy = (fr * 23) & 63;
    var gk = p.grain * 17 / 256;
    for (var y = 0; y < H; y++) {
      var dy2 = (y - cy) / rmax, row = (y & 63) << 6, gy = (y + oy) & 63;
      for (var x = 0; x < W; x++) {
        var o = (y * W + x) * 4;
        var dx2 = (x - cx) / rmax;
        var v = 1 - (dx2 * dx2 + dy2 * dy2) * p.vig;
        var n = BLUE[(((x + ox) & 63) << 6) | gy] * gk - p.grainOff;
        var dth = BLUE_D[row | (x & 63)] * p.dither;
        var r = px[o] * v + n + dth, g = px[o + 1] * v + n + dth, b = px[o + 2] * v + n + dth;
        r = r < 0 ? 0 : (r > 255 ? 255 : r);
        g = g < 0 ? 0 : (g > 255 ? 255 : g);
        b = b < 0 ? 0 : (b > 255 ? 255 : b);
        var li = ((((r | 0) >> 3) << 10) | (((g | 0) >> 3) << 5) | ((b | 0) >> 3)) * 3;
        px[o] = lut[li]; px[o + 1] = lut[li + 1]; px[o + 2] = lut[li + 2];
      }
    }
  };

  /*
   * Halation around bright pixels: what exceeds the threshold is gathered at one-eighth
   * resolution (16 samples per 8x8 block), blurred with two box passes each way, and
   * added back bilinearly. p: { threshold, strength, radius (in quarter-res px), tint }
   */
  var BW = 0, BH = 0, bloomA = null, bloomB = null, bloomOn = null;
  var upX0 = null, upX1 = null, upWX = null, upY0 = null, upY1 = null, upWY = null;
  A.bloom = function (px, W, H, p) {
    var w = W >> 3, h = H >> 3, n = w * h * 3, i, x, y, c;
    if (w !== BW || h !== BH) {
      BW = w; BH = h; bloomA = new Float32Array(n); bloomB = new Float32Array(n); bloomOn = new Uint8Array(w * h);
      upX0 = new Int32Array(W); upX1 = new Int32Array(W); upWX = new Float32Array(W);
      upY0 = new Int32Array(H); upY1 = new Int32Array(H); upWY = new Float32Array(H);
      for (x = 0; x < W; x++) {
        var fx = (x + 0.5) / 8 - 0.5, x0 = Math.max(0, Math.floor(fx));
        upX0[x] = x0; upX1[x] = Math.min(w - 1, x0 + 1); upWX[x] = Math.min(1, Math.max(0, fx - x0));
      }
      for (y = 0; y < H; y++) {
        var fy = (y + 0.5) / 8 - 0.5, y0 = Math.max(0, Math.floor(fy));
        upY0[y] = y0; upY1[y] = Math.min(h - 1, y0 + 1); upWY[y] = Math.min(1, Math.max(0, fy - y0));
      }
    }
    var a = bloomA, b = bloomB, on = bloomOn, th = p.threshold, tint = p.tint || [1, 1, 1], any = false;
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      var sr = 0, sg = 0, sb = 0;
      for (var yy = 0; yy < 8; yy += 2) {
        var o = (((y << 3) + yy) * W + (x << 3)) * 4;
        for (var xx = 0; xx < 4; xx++, o += 8) {
          var l = px[o] * 0.3 + px[o + 1] * 0.55 + px[o + 2] * 0.15 - th;
          if (l > 0) { var k = l / (l + th * 0.5 + 1); sr += px[o] * k; sg += px[o + 1] * k; sb += px[o + 2] * k; any = true; }
        }
      }
      i = (y * w + x) * 3; a[i] = sr / 16; a[i + 1] = sg / 16; a[i + 2] = sb / 16;
    }
    if (!any) return;
    var R = Math.max(1, Math.round(p.radius / 2)), inv = 1 / (2 * R + 1);
    for (var pass = 0; pass < 2; pass++) {
      for (y = 0; y < h; y++) for (c = 0; c < 3; c++) {
        var acc = 0, rb = y * w;
        for (x = -R; x <= R; x++) acc += a[(rb + (x < 0 ? 0 : (x > w - 1 ? w - 1 : x))) * 3 + c];
        for (x = 0; x < w; x++) {
          b[(rb + x) * 3 + c] = acc * inv;
          var xa = x + R + 1, xs = x - R;
          acc += a[(rb + (xa > w - 1 ? w - 1 : xa)) * 3 + c] - a[(rb + (xs < 0 ? 0 : xs)) * 3 + c];
        }
      }
      for (x = 0; x < w; x++) for (c = 0; c < 3; c++) {
        var acc2 = 0;
        for (y = -R; y <= R; y++) acc2 += b[((y < 0 ? 0 : (y > h - 1 ? h - 1 : y)) * w + x) * 3 + c];
        for (y = 0; y < h; y++) {
          a[(y * w + x) * 3 + c] = acc2 * inv;
          var ya = y + R + 1, ys = y - R;
          acc2 += b[((ya > h - 1 ? h - 1 : ya) * w + x) * 3 + c] - b[((ys < 0 ? 0 : ys) * w + x) * 3 + c];
        }
      }
    }
    var s = p.strength, tr = s * tint[0], tg = s * tint[1], tb = s * tint[2];
    /* Cells whose glow would add less than one step after quantisation are skipped. */
    var cut = 1.2 / Math.max(tr, tg, tb);
    for (i = 0; i < w * h; i++) on[i] = Math.max(a[i * 3], a[i * 3 + 1], a[i * 3 + 2]) > cut ? 1 : 0;
    for (y = 0; y < H; y++) {
      var r0 = upY0[y] * w, r1 = upY1[y] * w, wy = upWY[y], q = y * W * 4;
      for (x = 0; x < W; x++, q += 4) {
        var c0 = upX0[x], c1 = upX1[x];
        if (!(on[r0 + c0] | on[r0 + c1] | on[r1 + c0] | on[r1 + c1])) continue;
        var wx = upWX[x];
        var w00 = (1 - wx) * (1 - wy), w01 = wx * (1 - wy), w10 = (1 - wx) * wy, w11 = wx * wy;
        var i00 = (r0 + c0) * 3, i01 = (r0 + c1) * 3, i10 = (r1 + c0) * 3, i11 = (r1 + c1) * 3;
        px[q] += (a[i00] * w00 + a[i01] * w01 + a[i10] * w10 + a[i11] * w11) * tr;
        px[q + 1] += (a[i00 + 1] * w00 + a[i01 + 1] * w01 + a[i10 + 1] * w10 + a[i11 + 1] * w11) * tg;
        px[q + 2] += (a[i00 + 2] * w00 + a[i01 + 2] * w01 + a[i10 + 2] * w10 + a[i11 + 2] * w11) * tb;
      }
    }
  };

  /*
   * Soft contact shadow for an object whose footprint is the ellipse (rx, rz) on the
   * horizontal plane y = wy, centred on (wx, wz). The shadow spreads to 1.7x the footprint
   * and fades with a smoothstep. Only pixels whose depth matches that plane are darkened,
   * so the object standing on it stays untouched. cam: { pos, F, R, U, tanH, aspect }.
   */
  A.shadow = function (px, zbuf, W, H, cam, wx, wy, wz, rx, rz, strength) {
    rx *= 1.7; rz *= 1.7;
    var P = cam.pos, F = cam.F, Rr = cam.R, U = cam.U, th = cam.tanH, ta = cam.tanH * cam.aspect;
    var minX = W, maxX = -1, minY = H, maxY = -1, k, a;
    for (k = 0; k < 12; k++) {
      a = k / 12 * Math.PI * 2;
      var ox = wx + Math.cos(a) * rx - P[0], oy = wy - P[1], oz = wz + Math.sin(a) * rz - P[2];
      var vz = ox * F[0] + oy * F[1] + oz * F[2];
      if (vz < 0.05) return;
      var sx = ((ox * Rr[0] + oy * Rr[1] + oz * Rr[2]) / vz / ta * 0.5 + 0.5) * W;
      var sy = (0.5 - (ox * U[0] + oy * U[1] + oz * U[2]) / vz / th * 0.5) * H;
      if (sx < minX) minX = sx; if (sx > maxX) maxX = sx;
      if (sy < minY) minY = sy; if (sy > maxY) maxY = sy;
    }
    var x0 = Math.max(0, Math.floor(minX)), x1 = Math.min(W - 1, Math.ceil(maxX));
    var y0 = Math.max(0, Math.floor(minY)), y1 = Math.min(H - 1, Math.ceil(maxY));
    for (var y = y0; y <= y1; y++) {
      var uy = (1 - ((y + 0.5) / H) * 2) * th;
      for (var x = x0; x <= x1; x++) {
        var ux = (((x + 0.5) / W) * 2 - 1) * ta;
        var dx = F[0] + Rr[0] * ux + U[0] * uy, dy = F[1] + Rr[1] * ux + U[1] * uy, dz = F[2] + Rr[2] * ux + U[2] * uy;
        if (dy > -1e-6 && dy < 1e-6) continue;
        var t = (wy - P[1]) / dy;
        if (t <= 0) continue;
        var idx = y * W + x, zd = zbuf[idx];
        if (Math.abs(zd - t) > 0.02 + t * 0.012) continue;
        var ex = (P[0] + dx * t - wx) / rx, ez = (P[2] + dz * t - wz) / rz, e = ex * ex + ez * ez;
        if (e >= 1) continue;
        var f = 1 - e; f = f * f * (3 - 2 * f) * strength;
        var o = idx * 4, m = 1 - f;
        px[o] *= m; px[o + 1] *= m; px[o + 2] *= m;
      }
    }
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
