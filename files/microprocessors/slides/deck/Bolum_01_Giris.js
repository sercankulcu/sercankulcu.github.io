/* Bölüm 1 Giriş: saat hızı, periyot ve çalışma süresi hesaplayıcı */
document.querySelectorAll('.ds-deck [data-demo="m01g-clock"]').forEach(function (demo) {
  var inF = demo.querySelector('[data-in="f"]');
  var inC = demo.querySelector('[data-in="cpi"]');
  var inN = demo.querySelector('[data-in="n"]');
  var status = demo.querySelector(".ds-deck__status");
  function out(name) { return demo.querySelector('[data-out="' + name + '"]'); }

  function fmt(x, digits) {
    return x.toLocaleString("tr-TR", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
  }
  function time(sec) {
    if (sec >= 1) return fmt(sec, 3) + " s";
    if (sec >= 1e-3) return fmt(sec * 1e3, 3) + " ms";
    if (sec >= 1e-6) return fmt(sec * 1e6, 3) + " µs";
    if (sec >= 1e-9) return fmt(sec * 1e9, 3) + " ns";
    return fmt(sec * 1e12, 1) + " ps";
  }

  function update() {
    var fMHz = parseFloat(inF.value), cpi = parseFloat(inC.value), nM = parseFloat(inN.value);
    if (!(fMHz > 0) || !(cpi > 0) || !(nM >= 0)) {
      ["t", "bus", "mips", "time"].forEach(function (k) { out(k).textContent = "—"; });
      status.innerHTML = "f ve CPI sıfırdan büyük olmalı.";
      return;
    }
    var f = fMHz * 1e6, T = 1 / f;
    var mips = fMHz / cpi;
    var sec = nM * 1e6 * cpi / f;
    out("t").textContent = time(T);
    out("bus").textContent = time(4 * T);
    out("mips").textContent = fmt(mips, 2);
    out("time").textContent = time(sec);
    status.innerHTML = "T = 1 / " + fmt(fMHz, 3) + " MHz = <b>" + time(T) + "</b> · süre = N × CPI / f = " +
      fmt(nM, 3) + "·10⁶ × " + fmt(cpi, 2) + " / " + fmt(fMHz, 3) + "·10⁶ Hz = <b>" + time(sec) + "</b>";
  }

  [inF, inC, inN].forEach(function (el) { el.addEventListener("input", update); });
  demo.querySelectorAll("[data-f]").forEach(function (b) {
    b.addEventListener("click", function () {
      inF.value = b.dataset.f;
      inC.value = b.dataset.cpi;
      update();
    });
  });
  update();
});
