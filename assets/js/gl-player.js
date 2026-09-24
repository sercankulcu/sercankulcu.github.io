/*
 * Player shell for the WebGL studies under /art/webgl/: the same controls, keys and
 * fullscreen as the pixel scenes, but the scene draws itself at full resolution with
 * three.js. Time is continuous and wraps every `duration` seconds.
 *
 * mount({ prefix, app, duration, t0, renderer, render(t), resize(w, h), startAudio, gain })
 * Elements are found by id: <prefix>-screen, -play, -sound, -full, -scrub, -clock
 * and their -ico-* paths. The renderer's canvas is placed inside <prefix>-screen.
 */

var PLAY_D = "M4 2l9 6-9 6z", PAUSE_D = "M4 2h3v12H4zM9 2h3v12H9z";
var SND_ON = "M3 6h2.5L9 3v10L5.5 10H3zM11.2 5.1l1-1c2.4 2 2.4 5.8 0 7.8l-1-1c1.7-1.5 1.7-4.3 0-5.8z";
var SND_OFF = "M3 6h2.5L9 3v10L5.5 10H3zM11 6.4l1.1 1.1 1.1-1.1.9.9-1.1 1.1 1.1 1.1-.9.9-1.1-1.1-1.1 1.1-.9-.9L11.1 8.4 10 7.3z";
var FULL_IN = "M2 2h5v2H4v3H2zM9 2h5v5h-2V4H9zM2 9h2v3h3v2H2zM12 9h2v5H9v-2h3z";
var FULL_OUT = "M5 2h2v5H2V5h3zM9 2h2v3h3v2H9zM2 9h5v5H5v-3H2zM9 9h5v2h-3v3H9z";
var SCRUB_STEPS = 30;

function two(n) { return String(n).padStart(2, "0"); }
function mmss(s) { return two(Math.floor(s / 60)) + ":" + two(s % 60); }

export function mount(o) {
  function $(id) { return document.getElementById(o.prefix + "-" + id); }
  var appEl = document.getElementById(o.app);
  var screenEl = $("screen"), scrub = $("scrub"), clock = $("clock");
  var btnPlay = $("play"), btnSound = $("sound"), btnFull = $("full");
  var icoPlay = $("ico-play"), icoSound = $("ico-sound"), icoFull = $("ico-full");
  var D = o.duration, total = " / " + mmss(Math.round(D));
  var renderer = o.renderer, canvas = renderer.domElement;
  screenEl.appendChild(canvas);

  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var playing = !calm, onScreen = true, soundOn = false, audio = null;
  var t = o.t0 || 0, last = 0;
  /* ?t=12 opens the loop paused at that second, for stills and links to a moment. */
  var q = window.URLSearchParams ? new URLSearchParams(window.location.search) : null;
  if (q && q.has("t")) { t = (((parseFloat(q.get("t")) || 0) % D) + D) % D; playing = false; }

  function resize() {
    var w = Math.max(64, screenEl.clientWidth), h = Math.max(36, screenEl.clientHeight);
    var fit = Math.min(w / 16, h / 9);
    var cw = Math.floor(fit * 16), ch = Math.floor(fit * 9);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(cw, ch, true);
    if (o.resize) o.resize(cw, ch);
  }

  function show() {
    o.render(t);
    var s = Math.floor(t);
    clock.textContent = mmss(s) + total;
    var v = String(Math.floor(t * SCRUB_STEPS));
    if (scrub.value !== v) scrub.value = v;
  }

  function setPlaying(v) {
    playing = v;
    icoPlay.setAttribute("d", v ? PAUSE_D : PLAY_D);
    btnPlay.setAttribute("aria-label", v ? "Pause" : "Play");
    btnPlay.title = btnPlay.getAttribute("aria-label") + " (Space)";
    if (audio) audio.ctx[v && onScreen ? "resume" : "suspend"]();
  }

  function setSoundLabel() {
    icoSound.setAttribute("d", soundOn ? SND_ON : SND_OFF);
    btnSound.setAttribute("aria-label", soundOn ? "Sound off" : "Sound on");
    btnSound.title = btnSound.getAttribute("aria-label") + " (M)";
  }

  function toggleSound() {
    if (!audio) audio = o.startAudio ? o.startAudio() : null;
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
    btnFull.setAttribute("aria-label", on ? "Exit fullscreen" : "Fullscreen");
    btnFull.title = btnFull.getAttribute("aria-label") + " (F)";
    resize(); show();
  }

  function seek(sec) { t = ((t + sec) % D + D) % D; show(); }

  btnPlay.addEventListener("click", function () { setPlaying(!playing); });
  btnSound.addEventListener("click", toggleSound);
  scrub.addEventListener("input", function () { t = (Number(scrub.value) | 0) / SCRUB_STEPS; show(); });
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
  window.addEventListener("resize", function () { resize(); show(); });

  if (window.IntersectionObserver) {
    new IntersectionObserver(function (es) {
      onScreen = es[0].isIntersecting;
      if (audio) { if (onScreen && playing) audio.ctx.resume(); else audio.ctx.suspend(); }
    }, { threshold: 0.04 }).observe(appEl);
  }

  function loop(now) {
    if (!last) last = now;
    var dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    if (playing && onScreen) {
      t = (t + dt) % D;
      show();
    }
    requestAnimationFrame(loop);
  }

  setSoundLabel();
  scrub.max = String(Math.floor(D * SCRUB_STEPS) - 1);
  resize();
  setPlaying(playing);
  show();
  requestAnimationFrame(loop);
  return { show: show, resize: resize };
}
