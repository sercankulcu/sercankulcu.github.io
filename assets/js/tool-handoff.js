/*
  Tool handoff: pass a result file from one app page to the next without uploading anything.
  The files wait in this browser's IndexedDB for at most ten minutes and are removed when read.

    ToolHandoff.take()                      Promise<File[] | null>  files waiting for this page (or null)
    ToolHandoff.put(files)                  Promise                 store files for the next page
    ToolHandoff.renderNext(el, kind, getFiles, opts)
        Fills `el` with "Continue with" buttons for `kind` ("pdf" or "image"). getFiles() returns
        (a Promise of) File/Blob objects to pass on; Blobs need a name: pass {blob, name}.
        opts.exclude: tool paths to leave out (the current page is always left out).
        opts.label: heading text (default "Continue with" / "Şununla devam et" by the shared language).
        Call renderNext again after a language switch to relabel the buttons.
    ToolHandoff.onPaste(cb)                 calls cb(File[]) for images pasted with Ctrl+V / Cmd+V
                                            (ignored while typing in a text field)
*/
(function () {
  var DB = 'tool-handoff', STORE = 'files', KEY = 'pending', MAX_AGE = 10 * 60 * 1000;

  var TOOLS = {
    pdf: [
      ['/apps/pdf-compressor/', 'Compress'],
      ['/apps/pdf-merger/', 'Merge'],
      ['/apps/pdf-splitter/', 'Split'],
      ['/apps/pdf-page-organizer/', 'Organize pages'],
      ['/apps/pdf-signer/', 'Sign'],
      ['/apps/pdf-form-filler/', 'Fill form'],
      ['/apps/pdf-to-a4/', 'Fit to A4'],
      ['/apps/pdf-to-image/', 'Convert to images'],
      ['/apps/pdf-metadata-viewer/', 'View metadata']
    ],
    image: [
      ['/apps/image-compressor-resizer/', 'Compress / resize'],
      ['/apps/image-format-converter/', 'Convert format'],
      ['/apps/image-background-remover/', 'Remove background'],
      ['/apps/image-redactor/', 'Redact'],
      ['/apps/image-color-palette/', 'Extract colors'],
      ['/apps/image-to-a4-pdf/', 'Image to A4 PDF'],
      ['/apps/images-to-pdf/', 'Images to PDF'],
      ['/apps/image-metadata-viewer/', 'View metadata'],
      ['/apps/favicon-generator/', 'Make favicon'],
      ['/apps/signature-maker/', 'Signature from photo']
    ]
  };

  /* Turkish names; the language is the shared tool choice (assets/js/tool-i18n.js, "pz:lang") */
  var TR = {
    'Compress': 'Sıkıştır', 'Merge': 'Birleştir', 'Split': 'Böl', 'Organize pages': 'Sayfaları düzenle',
    'Sign': 'İmzala', 'Fill form': 'Formu doldur', 'Fit to A4': "A4'e sığdır", 'Convert to images': 'Görsele dönüştür',
    'View metadata': 'Üst verileri gör', 'Compress / resize': 'Sıkıştır / boyutlandır', 'Convert format': 'Biçim dönüştür',
    'Remove background': 'Arka planı kaldır', 'Redact': 'Karart', 'Extract colors': 'Renkleri çıkar',
    'Image to A4 PDF': "A4 PDF'e çevir", 'Images to PDF': 'Görsellerden PDF', 'Make favicon': 'Favicon yap',
    'Signature from photo': 'Fotoğraftan imza', 'Continue with': 'Şununla devam et'
  };

  function lang() {
    if (window.ToolI18n) return window.ToolI18n.current();
    try { var v = localStorage.getItem('pz:lang'); if (v === 'tr' || v === 'en') return v; } catch (e) { }
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < list.length; i++) { if (/^tr/i.test(list[i] || '')) return 'tr'; }
    return 'en';
  }

  function name(s) { return lang() === 'tr' && TR[s] ? TR[s] : s; }

  function open() {
    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) { reject(new Error('no indexedDB')); return; }
      var req = indexedDB.open(DB, 1);
      req.onupgradeneeded = function () { req.result.createObjectStore(STORE); };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function tx(mode, fn) {
    return open().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(STORE, mode), store = t.objectStore(STORE), out;
        out = fn(store);
        t.oncomplete = function () { db.close(); resolve(out && 'result' in out ? out.result : undefined); };
        t.onerror = t.onabort = function () { db.close(); reject(t.error); };
      });
    });
  }

  function toFile(x) {
    if (!x) return null;
    if (typeof File !== 'undefined' && x instanceof File) return x;
    var blob = x.blob || x, name = x.name || 'file';
    try { return new File([blob], name, { type: blob.type || x.type || '' }); }
    catch (e) { blob.name = name; return blob; }
  }

  function put(files) {
    var list = [].concat(files).map(toFile).filter(Boolean).map(function (f) {
      return { name: f.name, type: f.type, blob: f };
    });
    return tx('readwrite', function (s) { return s.put({ t: Date.now(), files: list }, KEY); });
  }

  function take() {
    var params = new URLSearchParams(location.search);
    if (!params.has('handoff')) return Promise.resolve(null);
    if (history.replaceState) {
      params.delete('handoff');
      var q = params.toString();
      history.replaceState(null, '', location.pathname + (q ? '?' + q : '') + location.hash);
    }
    var rec;
    return tx('readwrite', function (s) {
      var r = s.get(KEY);
      r.onsuccess = function () { rec = r.result; s.delete(KEY); };
      return null;
    }).then(function () {
      if (!rec || Date.now() - rec.t > MAX_AGE || !rec.files || !rec.files.length) return null;
      return rec.files.map(function (f) { return toFile({ blob: f.blob, name: f.name }); });
    }).catch(function () { return null; });
  }

  function renderNext(el, kind, getFiles, opts) {
    opts = opts || {};
    if (!el || !TOOLS[kind]) return;
    var here = location.pathname.replace(/\/?$/, '/');
    var skip = (opts.exclude || []).concat([here]);
    el.innerHTML = '';
    el.classList.add('tool-next');
    var h = document.createElement('p');
    h.className = 'tool-next-label';
    h.textContent = opts.label || name('Continue with');
    var row = document.createElement('div');
    row.className = 'tool-next-row';
    TOOLS[kind].forEach(function (t) {
      if (skip.indexOf(t[0]) !== -1) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'tool-next-btn';
      b.textContent = name(t[1]) + ' →';
      b.addEventListener('click', function () {
        b.disabled = true;
        Promise.resolve(getFiles()).then(function (files) {
          files = [].concat(files || []).filter(Boolean);
          if (!files.length) { b.disabled = false; return; }
          return put(files).then(function () {
            location.href = t[0] + '?handoff=1';
          }, function () {
            /* no IndexedDB (private mode): open the tool without the file */
            location.href = t[0];
          });
        }, function () { b.disabled = false; });
      });
      row.appendChild(b);
    });
    el.appendChild(h);
    el.appendChild(row);
  }

  function onPaste(cb, accept) {
    var re = accept || /^image\//;
    document.addEventListener('paste', function (e) {
      var a = document.activeElement;
      if (a && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && !/^(button|file|checkbox|radio|range)$/.test(a.type || ''))) return;
      var items = (e.clipboardData && e.clipboardData.items) || [];
      var files = [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].kind === 'file' && re.test(items[i].type)) {
          var f = items[i].getAsFile();
          if (f) {
            var ext = (f.type.split('/')[1] || 'png').replace('jpeg', 'jpg');
            files.push(toFile({ blob: f, name: f.name && f.name !== 'image.png' ? f.name : 'pasted-image.' + ext }));
          }
        }
      }
      if (files.length) { e.preventDefault(); cb(files); }
    });
  }

  if (!document.getElementById('tool-next-css')) {
    var css = document.createElement('style');
    css.id = 'tool-next-css';
    css.textContent =
      '.tool-next{margin-top:14px;padding-top:12px;border-top:1px solid var(--global-border-color)}' +
      '.tool-next-label{margin:0 0 8px;font-size:.8rem;font-weight:800;color:var(--global-text-color-light)}' +
      '.tool-next-row{display:flex;flex-wrap:wrap;gap:8px}' +
      '.tool-next-btn{min-height:44px;padding:0 14px;border:1px solid var(--global-border-color);border-radius:999px;' +
      'background:transparent;color:var(--global-text-color);font:inherit;font-size:.85rem;font-weight:800;cursor:pointer}' +
      '.tool-next-btn:hover:not(:disabled){border-color:var(--global-link-color)}' +
      '.tool-next-btn:focus-visible{outline:3px solid var(--global-link-color);outline-offset:2px}' +
      '.tool-next-btn:disabled{opacity:.6;cursor:progress}';
    document.head.appendChild(css);
  }

  window.ToolHandoff = { put: put, take: take, renderNext: renderNext, onPaste: onPaste, tools: TOOLS };
})();
