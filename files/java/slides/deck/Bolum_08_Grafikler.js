/* Bölüm 8: Grafikler - Swing pencerelerinin tarayıcıdaki etkileşimli benzerleri */
(function () {
  var SVGNS = "http://www.w3.org/2000/svg";

  function konum(svg, ev) {
    var r = svg.getBoundingClientRect();
    var vb = svg.viewBox.baseVal;
    return {
      x: Math.round((ev.clientX - r.left) * vb.width / r.width),
      y: Math.round((ev.clientY - r.top) * vb.height / r.height)
    };
  }

  /* Fare olayları: MouseListener ve MouseMotionListener karşılıkları */
  document.querySelectorAll('.ds-deck [data-demo="j081-fare"]').forEach(function (demo) {
    var pad = demo.querySelector('[data-k="pad"]');
    var svg = pad.querySelector("svg");
    var dots = svg.querySelector('[data-k="dots"]');
    var slide = demo.closest(".ds-deck__slide");
    var log = slide.querySelector('[data-k="log"]');
    var status = demo.querySelector(".ds-deck__status");
    var satirlar = [];
    var basili = false, sonSurukle = 0, inX = 0, inY = 0;

    function yaz(ad, ev, p) {
      var dugme = ev.button === 2 ? "BUTTON3" : (ev.button === 1 ? "BUTTON2" : "BUTTON1");
      var ek = "";
      if (ev.shiftKey) ek += " shift";
      if (ev.ctrlKey) ek += " ctrl";
      if (ev.altKey) ek += " alt";
      var s = (ad + "            ").slice(0, 14) + "x=" + p.x + " y=" + p.y;
      if (ad === "mousePressed" || ad === "mouseReleased" || ad === "mouseClicked") s += " " + dugme;
      s += ek;
      satirlar.push(s);
      if (satirlar.length > 9) satirlar.shift();
      log.textContent = satirlar.join("\n");
    }
    function nokta(p, r) {
      var c = document.createElementNS(SVGNS, "circle");
      c.setAttribute("cx", p.x); c.setAttribute("cy", p.y); c.setAttribute("r", r);
      c.setAttribute("class", "j081-dot");
      dots.appendChild(c);
      while (dots.childNodes.length > 60) dots.removeChild(dots.firstChild);
    }
    svg.addEventListener("contextmenu", function (ev) { ev.preventDefault(); });
    svg.addEventListener("pointerenter", function (ev) { yaz("mouseEntered", ev, konum(svg, ev)); });
    svg.addEventListener("pointerleave", function (ev) { basili = false; yaz("mouseExited", ev, konum(svg, ev)); });
    svg.addEventListener("pointerdown", function (ev) {
      var p = konum(svg, ev);
      basili = true; inX = p.x; inY = p.y;
      try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* yok say */ }
      nokta(p, 5);
      yaz("mousePressed", ev, p);
      status.innerHTML = "Son olay: <b>mousePressed</b> (" + p.x + ", " + p.y + ")";
    });
    svg.addEventListener("pointermove", function (ev) {
      if (!basili) return;
      var t = Date.now();
      if (t - sonSurukle < 90) return;
      sonSurukle = t;
      var p = konum(svg, ev);
      nokta(p, 2);
      yaz("mouseDragged", ev, p);
    });
    svg.addEventListener("pointerup", function (ev) {
      if (!basili) return;
      basili = false;
      var p = konum(svg, ev);
      yaz("mouseReleased", ev, p);
      if (Math.abs(p.x - inX) < 4 && Math.abs(p.y - inY) < 4) yaz("mouseClicked", ev, p);
      status.innerHTML = "Son olay: <b>mouseReleased</b> (" + p.x + ", " + p.y + ")";
    });
  });

  /* Basit çizim programı: List<List<Point>> egriler */
  document.querySelectorAll('.ds-deck [data-demo="j081-cizim"]').forEach(function (demo) {
    var svg = demo.querySelector('[data-k="pad"] svg');
    var ink = svg.querySelector('[data-k="ink"]');
    var nEl = demo.querySelector('[data-k="n"]');
    var pEl = demo.querySelector('[data-k="p"]');
    var egriler = [];
    var basili = false, son = null;

    function say() {
      var t = 0;
      egriler.forEach(function (e) { t += e.pts.length; });
      nEl.textContent = egriler.length;
      pEl.textContent = t;
    }
    function ciz(e) {
      e.el.setAttribute("points", e.pts.map(function (p) { return p.x + "," + p.y; }).join(" "));
    }
    svg.addEventListener("pointerdown", function (ev) {
      ev.preventDefault();
      var p = konum(svg, ev);
      var el = document.createElementNS(SVGNS, "polyline");
      el.setAttribute("class", "j081-ink");
      ink.appendChild(el);
      son = { pts: [p], el: el };
      egriler.push(son);
      ciz(son);
      basili = true;
      try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* yok say */ }
      say();
    });
    svg.addEventListener("pointermove", function (ev) {
      if (!basili) return;
      var p = konum(svg, ev);
      var q = son.pts[son.pts.length - 1];
      if (Math.abs(p.x - q.x) + Math.abs(p.y - q.y) < 3) return;
      son.pts.push(p);
      ciz(son);
      say();
    });
    function bitir() { basili = false; }
    svg.addEventListener("pointerup", bitir);
    svg.addEventListener("pointercancel", bitir);
    demo.querySelector('[data-op="clear"]').addEventListener("click", function () {
      egriler = [];
      while (ink.firstChild) ink.removeChild(ink.firstChild);
      say();
    });
  });

  /* Sayaç düğmesi */
  document.querySelectorAll('.ds-deck [data-demo="j081-dugme"]').forEach(function (demo) {
    var sayac = 0;
    var etiket = demo.querySelector('[data-k="etiket"]');
    var status = demo.querySelector(".ds-deck__status");
    demo.querySelector('[data-op="tik"]').addEventListener("click", function () {
      sayac++;
      etiket.textContent = sayac + " kez tıklandı";
      status.innerHTML = "<code>actionPerformed</code> çağrıldı, <code>sayac</code> = <b>" + sayac + "</b>";
    });
  });

  /* JTextField: Enter ile ActionEvent */
  document.querySelectorAll('.ds-deck [data-demo="j081-ad"]').forEach(function (demo) {
    var ad = demo.querySelector('[data-k="ad"]');
    var selam = demo.querySelector('[data-k="selam"]');
    var status = demo.querySelector(".ds-deck__status");
    ad.addEventListener("keydown", function (ev) {
      ev.stopPropagation();
      if (ev.key !== "Enter") return;
      selam.textContent = "Merhaba, " + ad.value + "!";
      status.innerHTML = "Enter: <code>actionPerformed</code> → <code>selam.setText(…)</code>";
    });
  });

  /* Büyük / küçük harf çevirici */
  document.querySelectorAll('.ds-deck [data-demo="j081-harf"]').forEach(function (demo) {
    var alan = demo.querySelector('[data-k="alan"]');
    var status = demo.querySelector(".ds-deck__status");
    alan.addEventListener("keydown", function (ev) { ev.stopPropagation(); });
    demo.querySelector('[data-op="buyuk"]').addEventListener("click", function () {
      alan.value = alan.value.toLocaleUpperCase("tr-TR");
      status.innerHTML = "<code>alan.setText(alan.getText().toUpperCase())</code>";
    });
    demo.querySelector('[data-op="kucuk"]').addEventListener("click", function () {
      alan.value = alan.value.toLocaleLowerCase("tr-TR");
      status.innerHTML = "<code>alan.setText(alan.getText().toLowerCase())</code>";
    });
  });

  /* Para üstü: DocumentListener her değişiklikte raporu yeniler */
  document.querySelectorAll('.ds-deck [data-demo="j081-para"]').forEach(function (demo) {
    var miktarAlani = demo.querySelector('[data-k="miktar"]');
    var rapor = demo.querySelector('[data-k="rapor"]');
    var nEl = demo.querySelector('[data-k="n"]');
    var olay = 0;
    function raporuGuncelle() {
      var s = miktarAlani.value;
      if (!/^[-+]?[0-9]+$/.test(s) || Number(s) > 2147483647 || Number(s) < -2147483648) {
        rapor.textContent = "Tam sayı değil veya aralık dışında";
        return;
      }
      var miktar = parseInt(s, 10);
      var metin = miktar + " kuruş yapmak için kullanılacaklar:\n";
      [50, 25, 10, 5, 1].forEach(function (x) {
        metin += Math.trunc(miktar / x) + " " + x + " kuruş\n";
        miktar = miktar % x;
      });
      rapor.textContent = metin;
    }
    miktarAlani.addEventListener("keydown", function (ev) { ev.stopPropagation(); });
    miktarAlani.addEventListener("input", function () {
      olay++;
      nEl.textContent = olay;
      raporuGuncelle();
    });
    raporuGuncelle();
  });
})();
