# -*- coding: utf-8 -*-
DEMO = {
    'baslik': 'A Robot Arm Picks Up a Part',
    'problem': ('The tip of a two-joint arm on an assembly line must reach a part on the table, but motors take joint angles, not tip positions. '
                'Click a target: inverse kinematics computes the angles and the arm turns there.'),
    'html': '''
<svg viewBox="0 0 390 290" width="390" height="290" role="img" aria-label="Two-joint robot arm and its workspace"></svg>
<div class="ai-side">
  <label>Upper arm L1 = <b class="ai-l1">110</b> mm</label>
  <input type="range" class="ai-r1" min="60" max="140" step="5" value="110" aria-label="Upper arm length">
  <label>Forearm L2 = <b class="ai-l2">80</b> mm</label>
  <input type="range" class="ai-r2" min="40" max="120" step="5" value="80" aria-label="Forearm length">
  <div class="ai-ctl"><button type="button" data-d="-1" class="is-on">Elbow up</button><button type="button" data-d="1">Elbow down</button></div>
  <div class="ai-out"></div>
  <div class="ai-out ai-o2" style="font-size:13px"></div>
</div>''',
    'js': r'''
  var svg = root.querySelector("svg"), outs = root.querySelectorAll(".ai-out");
  var r1 = root.querySelector(".ai-r1"), r2 = root.querySelector(".ai-r2");
  var BX = 195, BY = 250, ZEMIN = 250;
  var hedef = [125, 95], dirsek = -1, aci = [1.2, 1.4], timer = null;
  function f(v, d) { return v.toFixed(d); }
  function mk(tag, at, txt) { var e = document.createElementNS(SVGNS, tag); for (var a in at) e.setAttribute(a, at[a]); if (txt) e.textContent = txt; return e; }
  function sx(x) { return BX + x; }
  function sy(y) { return BY - y; }
  function ik(x, y, L1, L2, d) {
    var c = (x * x + y * y - L1 * L1 - L2 * L2) / (2 * L1 * L2);
    var ulas = c >= -1 && c <= 1;
    c = Math.max(-1, Math.min(1, c));
    var t2 = d * Math.acos(c);
    var t1 = Math.atan2(y, x) - Math.atan2(L2 * Math.sin(t2), L1 + L2 * Math.cos(t2));
    return { t1: t1, t2: t2, ulas: ulas };
  }
  function ileri(t1, t2, L1, L2) {
    var ex = L1 * Math.cos(t1), ey = L1 * Math.sin(t1);
    return [ex, ey, ex + L2 * Math.cos(t1 + t2), ey + L2 * Math.sin(t1 + t2)];
  }
  function derece(r) { var d = r * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d; }
  var g = mk("g"); svg.appendChild(g);
  function sahne(a) {
    var L1 = +r1.value, L2 = +r2.value;
    while (g.firstChild) g.removeChild(g.firstChild);
    var dis = mk("circle", { cx: BX, cy: BY, r: L1 + L2 });
    dis.style.fill = "color-mix(in srgb, var(--ds-good) 12%, var(--ds-bg))"; dis.style.stroke = "var(--ds-good)"; dis.style.strokeDasharray = "4 4";
    g.appendChild(dis);
    var ic = mk("circle", { cx: BX, cy: BY, r: Math.abs(L1 - L2) });
    ic.style.fill = "var(--ds-bg)"; ic.style.stroke = "var(--ds-good)"; ic.style.strokeDasharray = "4 4";
    g.appendChild(ic);
    var zem = mk("rect", { x: 0, y: ZEMIN, width: 390, height: 40 });
    zem.style.fill = "color-mix(in srgb, var(--ds-muted) 22%, var(--ds-bg))";
    g.appendChild(zem);
    g.appendChild(mk("text", { x: 8, y: ZEMIN + 26, "class": "lbl" }, "table"));
    g.appendChild(mk("text", { x: 382, y: 16, "class": "lbl", "text-anchor": "end" }, "green: reachable area"));
    var hx = sx(hedef[0]), hy = sy(hedef[1]);
    var ht = mk("path", { d: "M" + (hx - 8) + " " + hy + " H" + (hx + 8) + " M" + hx + " " + (hy - 8) + " V" + (hy + 8), "stroke-width": 2.5 });
    ht.style.stroke = "var(--ds-accent)"; g.appendChild(ht);
    var hc = mk("circle", { cx: hx, cy: hy, r: 6, fill: "none", "stroke-width": 2 }); hc.style.stroke = "var(--ds-accent)"; g.appendChild(hc);
    var p = ileri(a[0], a[1], L1, L2);
    var carp = p[1] < 0;
    var k1 = mk("path", { d: "M" + BX + " " + BY + " L" + sx(p[0]) + " " + sy(p[1]), "stroke-width": 11, "stroke-linecap": "round" });
    k1.style.stroke = carp ? "var(--ds-bad)" : "var(--ds-link)"; g.appendChild(k1);
    var k2 = mk("path", { d: "M" + sx(p[0]) + " " + sy(p[1]) + " L" + sx(p[2]) + " " + sy(p[3]), "stroke-width": 8, "stroke-linecap": "round" });
    k2.style.stroke = "#e9a23b"; g.appendChild(k2);
    [[BX, BY, 9], [sx(p[0]), sy(p[1]), 6.5]].forEach(function (e) {
      var c = mk("circle", { cx: e[0], cy: e[1], r: e[2], "stroke-width": 3 }); c.style.fill = "var(--ds-bg)"; c.style.stroke = "var(--ds-text)"; g.appendChild(c);
    });
    var uc = mk("path", { d: "M" + (sx(p[2]) - 5) + " " + (sy(p[3]) - 5) + " L" + sx(p[2]) + " " + sy(p[3]) + " L" + (sx(p[2]) + 5) + " " + (sy(p[3]) - 5), fill: "none", "stroke-width": 2.5 });
    uc.style.stroke = "var(--ds-text)"; g.appendChild(uc);
    g.appendChild(mk("text", { x: BX + 14, y: BY + 16, "class": "lbl" }, "θ1 = " + f(derece(a[0]), 0) + "°"));
    g.appendChild(mk("text", { x: sx(p[0]) + 10, y: sy(p[1]) - 8, "class": "lbl" }, "θ2 = " + f(derece(a[1]), 0) + "°"));
    return { p: p, carp: carp };
  }
  function coz(anim) {
    var L1 = +r1.value, L2 = +r2.value;
    root.querySelector(".ai-l1").textContent = L1; root.querySelector(".ai-l2").textContent = L2;
    var s = ik(hedef[0], hedef[1], L1, L2, dirsek);
    var bas = aci.slice(), son = [s.t1, s.t2];
    var d0 = son[0] - bas[0]; while (d0 > Math.PI) d0 -= 2 * Math.PI; while (d0 < -Math.PI) d0 += 2 * Math.PI;
    son[0] = bas[0] + d0;
    var uz = Math.hypot(hedef[0], hedef[1]);
    function yaz(r) {
      var hata = Math.hypot(r.p[2] - hedef[0], r.p[3] - hedef[1]);
      outs[0].innerHTML = "Target (" + f(hedef[0], 0) + ", " + f(hedef[1], 0) + ") mm, distance from base " + f(uz, 0) + " mm<br>" +
        "θ1 = <b>" + f(derece(son[0]), 1) + "°</b>, θ2 = <b>" + f(derece(son[1]), 1) + "°</b><br>" +
        (s.ulas ? "Forward kinematics check: tip is " + f(hata, 1) + " mm from the target." :
          "<b>Unreachable:</b> distance is " + (uz > L1 + L2 ? "outside" : "inside") + " the limit " + (uz > L1 + L2 ? "L1 + L2 = " + (L1 + L2) : "|L1 − L2| = " + Math.abs(L1 - L2)) + ". The arm reaches toward the nearest point; the tip falls " + f(hata, 0) + " mm short.");
      outs[1].innerHTML = r.carp ? "<b>Warning:</b> in this solution the elbow goes below the table (collision). Try the other elbow solution." :
        "Two angle pairs reach the same tip position: elbow up and elbow down. The planner picks the collision-free one.";
    }
    if (timer) { clearInterval(timer); timer = null; }
    if (!anim) { aci = son; yaz(sahne(aci)); return; }
    var adim = 0, ADIM = 18;
    timer = setInterval(function () {
      adim++;
      var t = adim / ADIM; t = t * t * (3 - 2 * t);
      aci = [bas[0] + (son[0] - bas[0]) * t, bas[1] + (son[1] - bas[1]) * t];
      var r = sahne(aci);
      if (adim >= ADIM) { clearInterval(timer); timer = null; aci = son; yaz(r); }
    }, 20);
  }
  svg.addEventListener("click", function (ev) {
    var b = svg.getBoundingClientRect();
    var vx = (ev.clientX - b.left) / b.width * 390, vy = (ev.clientY - b.top) / b.height * 290;
    if (vy > ZEMIN) vy = ZEMIN;
    hedef = [vx - BX, BY - vy];
    coz(true);
  });
  root.querySelectorAll("[data-d]").forEach(function (b) {
    b.addEventListener("click", function () {
      dirsek = +b.dataset.d;
      root.querySelectorAll("[data-d]").forEach(function (x) { x.classList.toggle("is-on", x === b); });
      coz(true);
    });
  });
  r1.addEventListener("input", function () { coz(false); });
  r2.addEventListener("input", function () { coz(false); });
  coz(false);
''',
    'not': ('Robotics turns “where?” into “which angles?”: <b>inverse kinematics</b>, workspace limits and choosing '
            'the collision-free one among several solutions. A real arm has 6 joints and obstacles.'),
    'css': '.ds-deck .ai-demo svg { overflow: hidden; }',
}
