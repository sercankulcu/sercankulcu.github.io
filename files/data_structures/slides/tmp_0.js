
(function () {
  var HOST = "sercankulcu.github.io";
  var izinli = function (h) { return h === HOST || h === "localhost" || h === "127.0.0.1" || h === "[::1]"; };
  var ok = izinli(location.hostname);
  try { if (window.top !== window.self && !izinli(window.top.location.hostname)) ok = false; } catch (e) { ok = false; }
  if (ok) return;
  document.documentElement.style.visibility = "hidden";
  document.addEventListener("DOMContentLoaded", function () {
    document.body.innerHTML = '<p style="max-width:560px;margin:60px auto;padding:0 16px;font:16px/1.6 system-ui,sans-serif;text-align:center">' +
      'Bu içerik yalnızca <a href="https://' + HOST + '">' + HOST + '</a> adresinde görüntülenebilir.<br>' +
      'This content is only available at <a href="https://' + HOST + '">' + HOST + '</a>.<br>&copy; Sercan Külcü</p>';
    document.documentElement.style.visibility = "visible";
  });
})();
