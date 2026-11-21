/*
  Shared Turkish / English interface for the app pages.

  The language is remembered across all tools (localStorage "pz:lang"). Without a saved choice
  it follows the browser: Turkish when any preferred browser language is Turkish, else English.

  Markup:
    data-i18n="key"                       textContent from the table
    data-i18n-html="key"                  innerHTML (static strings from the page's own table only)
    data-i18n-attr="aria-label:key; placeholder:key2; title:key3"
    data-i18n-vars="n=0; best=0"          fills {n} / {best} in the element's strings (the start
                                          state; the page's callback writes the live values)
    <button data-lang-toggle></button>    becomes the TR/EN switch (44x44, like the "?" button)

  Script:
    const i18n = ToolI18n.setup({ en: {...}, tr: {...} }, lang => { re-render dynamic text });
    i18n.t("key", { name: "x.pdf" })      "{name}" placeholders are filled in
    i18n.lang                             current language ("en" or "tr")
    ToolI18n.current()                    saved / browser language without a table
  setup() applies the language at once and calls the callback once at start and on every switch.
*/
(function () {
  var KEY = 'pz:lang';

  function saved() {
    try { var v = localStorage.getItem(KEY); return v === 'tr' || v === 'en' ? v : null; } catch (e) { return null; }
  }

  function browser() {
    var list = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']);
    for (var i = 0; i < list.length; i++) { if (/^tr\b/i.test(list[i] || '')) return 'tr'; }
    return 'en';
  }

  /* A Turkish-address copy (/apps/tr/..., /game/tr/...) sets window.PZ_PAGE_LANG = "tr" in the
     head: it opens in Turkish whatever was chosen before; the switch still changes it. */
  function current() {
    var p = window.PZ_PAGE_LANG;
    return (p === 'tr' || p === 'en') ? p : (saved() || browser());
  }

  var RELATED = {
    tr: { 'More tools': 'Diğer araçlar', 'All tools': 'Tüm araçlar', 'More games': 'Diğer oyunlar', 'All games': 'Tüm oyunlar' },
    en: { 'Diğer araçlar': 'More tools', 'Tüm araçlar': 'All tools', 'Diğer oyunlar': 'More games', 'Tüm oyunlar': 'All games' }
  };

  function relabelRelated(lang) {
    var t = document.querySelector('.tool-related__title'), a = document.querySelector('.tool-related__all');
    var map = RELATED[lang];
    if (t && map[t.textContent.trim()]) t.textContent = map[t.textContent.trim()];
    if (a) {
      var txt = a.textContent.replace(/\s*→\s*$/, '').trim();
      if (map[txt]) a.textContent = map[txt] + ' →';
    }
    [].forEach.call(document.querySelectorAll('.tool-related__name[data-' + lang + ']'), function (n) {
      n.textContent = n.getAttribute('data-' + lang);
    });
  }

  function setup(table, onChange) {
    var api = { lang: current(), t: null, set: null };

    /* A generated copy (tools/make_tr_pages.py) has the other language written into its HTML, so a
       table filled from the HTML at start got those strings: the copy keeps the originals here. */
    var orig = window.PZ_I18N_ORIG;
    if (orig && orig.strings && table[orig.lang]) {
      for (var ok in orig.strings) { if (Object.prototype.hasOwnProperty.call(orig.strings, ok)) table[orig.lang][ok] = orig.strings[ok]; }
    }

    api.t = function (key, vars) {
      var s = (table[api.lang] && table[api.lang][key]);
      if (s == null) s = (table.en && table.en[key]);
      if (s == null) s = key;
      if (vars) s = String(s).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
      return s;
    };

    function varsOf(el) {
      var spec = el.getAttribute('data-i18n-vars'), out = null;
      if (!spec) return null;
      spec.split(';').forEach(function (part) {
        var i = part.indexOf('=');
        if (i > 0) { out = out || {}; out[part.slice(0, i).trim()] = part.slice(i + 1).trim(); }
      });
      return out;
    }

    function apply() {
      var lang = api.lang;
      document.documentElement.lang = lang;
      [].forEach.call(document.querySelectorAll('[data-i18n]'), function (el) { el.textContent = api.t(el.getAttribute('data-i18n'), varsOf(el)); });
      [].forEach.call(document.querySelectorAll('[data-i18n-html]'), function (el) { el.innerHTML = api.t(el.getAttribute('data-i18n-html'), varsOf(el)); });
      [].forEach.call(document.querySelectorAll('[data-i18n-attr]'), function (el) {
        el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
          var p = pair.split(':');
          if (p.length === 2 && p[0].trim()) el.setAttribute(p[0].trim(), api.t(p[1].trim(), varsOf(el)));
        });
      });
      [].forEach.call(document.querySelectorAll('[data-lang-toggle]'), function (b) {
        var other = lang === 'tr' ? 'en' : 'tr';
        b.textContent = other.toUpperCase();
        b.setAttribute('lang', other);
        b.setAttribute('aria-label', other === 'tr' ? 'Türkçe arayüz' : 'English interface');
        b.setAttribute('title', other === 'tr' ? 'Türkçe' : 'English');
      });
      relabelRelated(lang);
      if (onChange) onChange(lang);
    }

    api.set = function (lang) {
      if (lang !== 'tr' && lang !== 'en') return;
      api.lang = lang;
      try { localStorage.setItem(KEY, lang); } catch (e) { }
      apply();
    };

    [].forEach.call(document.querySelectorAll('[data-lang-toggle]'), function (b) {
      if (!b.getAttribute('type')) b.setAttribute('type', 'button');
      b.addEventListener('click', function () { api.set(api.lang === 'tr' ? 'en' : 'tr'); });
    });

    apply();
    /* the site prints the "More tools" strip after the page's own script: relabel it once it exists */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { relabelRelated(api.lang); });
    }
    return api;
  }

  /* Pages with their own language menu (pdf-merger, word-document-diff, tests, tarot) set <html lang>
     themselves: follow it for the "More tools" strip, now and whenever it changes. */
  function followHtmlLang() {
    var l = (document.documentElement.lang || '').toLowerCase();
    if (/^tr\b/.test(l)) relabelRelated('tr');
    else if (/^en\b/.test(l)) relabelRelated('en');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', followHtmlLang);
  else followHtmlLang();
  if (window.MutationObserver) {
    new MutationObserver(followHtmlLang).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  window.ToolI18n = { setup: setup, current: current, KEY: KEY, relabel: relabelRelated };
})();
