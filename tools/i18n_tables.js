/*
  Prints the language tables a tool / game page hands to its interface switch, as JSON.

    node tools/i18n_tables.js apps/pdf-splitter.html [more pages...]
    -> { "apps/pdf-splitter.html": { "tables": { "en": {...}, "tr": {...} } }, ... }
       or { "...": { "error": "..." } }

  Used by tools/make_tr_pages.py to write the Turkish (or English) strings into the HTML of the
  generated copies. The page's inline scripts run in a sandbox with a do-nothing DOM; the table is
  the first argument of ToolI18n.setup(...) (or, for word-document-diff, its own "translations"
  object). Nothing is parsed with regexes except the static "import ... from" lines of module
  scripts, which become empty stubs. Harvest helpers that copy DOM text into the table see no
  elements, so the result holds only the strings written in the script itself.
*/
'use strict';
const fs = require('fs');
const vm = require('vm');

const STOP = { stop: true };

function makeStub() {
  const target = function () {};
  let stub;
  const handler = {
    get(t, prop) {
      if (prop === Symbol.toPrimitive) return () => '';
      if (prop === Symbol.iterator) return function* () {};
      if (prop === Symbol.asyncIterator) return undefined;
      if (prop === 'then') return () => stub;
      if (prop === 'length' || prop === 'size') return 0;
      if (prop === 'toString' || prop === 'valueOf') return () => '';
      if (prop === 'addEventListener') {
        return (type, cb) => {
          if ((type === 'DOMContentLoaded' || type === 'load') && typeof cb === 'function') {
            try { cb(stub); } catch (e) { if (e === STOP) throw e; }
          }
        };
      }
      if (prop === 'readyState') return 'complete';
      if (typeof prop === 'symbol') return undefined;
      return stub;
    },
    set() { return true; },
    has() { return true; },
    apply() { return stub; },
    construct() { return stub; },
    deleteProperty() { return true; },
  };
  stub = new Proxy(target, handler);
  return stub;
}

function inlineScripts(html) {
  const out = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[1];
    if (/\bsrc\s*=/.test(attrs)) continue;
    const type = (attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i) || [])[1] || '';
    if (type && !/^(module|text\/javascript|application\/javascript)$/i.test(type)) continue;
    out.push({ module: /^module$/i.test(type), code: m[2] });
  }
  return out;
}

function stubImports(code) {
  return code
    .replace(/^\s*import\s+\*\s+as\s+([\w$]+)\s+from\s+["'][^"']*["'];?/gm, 'const $1 = __stub;')
    .replace(/^\s*import\s+\{([^}]*)\}\s+from\s+["'][^"']*["'];?/gm, (m, names) =>
      names.split(',').map(n => n.trim()).filter(Boolean)
        .map(n => 'const ' + n.split(/\s+as\s+/).pop() + ' = __stub;').join(' '))
    .replace(/^\s*import\s+([\w$]+)\s+from\s+["'][^"']*["'];?/gm, 'const $1 = __stub;')
    .replace(/^\s*import\s+["'][^"']*["'];?/gm, '');
}

async function tablesOf(file) {
  const html = fs.readFileSync(file, 'utf8');
  const stub = makeStub();
  let found = null;
  const ToolI18n = {
    setup(table) { found = table; throw STOP; },
    current() { return 'en'; },
    relabel() {},
    KEY: 'pz:lang',
  };
  const holder = {};
  const base = {
    __holder: holder,
    __stub: stub, ToolI18n, console: { log() {}, warn() {}, error() {}, info() {}, debug() {} },
    setTimeout() { return 0; }, setInterval() { return 0; }, clearTimeout() {}, clearInterval() {},
    requestAnimationFrame() { return 0; }, cancelAnimationFrame() {}, queueMicrotask() {},
    JSON: { stringify: JSON.stringify, parse(t, r) { try { return JSON.parse(t, r); } catch (e) { return stub; } } },
    Math, Object, Array, String, Number, Boolean, Date, RegExp, Map, Set, WeakMap, WeakSet,
    Promise, Symbol, Error, TypeError, RangeError, Intl, parseInt, parseFloat, isNaN, isFinite,
    Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array, Int8Array, Int16Array, Int32Array,
    Float32Array, Float64Array, ArrayBuffer, DataView, BigInt, Proxy, Reflect, encodeURIComponent,
    decodeURIComponent, encodeURI, decodeURI, escape, unescape, TextEncoder, TextDecoder,
    structuredClone, atob, btoa, URL, URLSearchParams, undefined, NaN, Infinity,
  };
  const g = new Proxy(base, {
    has(t, p) { return true; },
    get(t, p) {
      if (p in t) return t[p];
      if (p === 'window' || p === 'self' || p === 'globalThis') return g;
      if (typeof p === 'symbol') return undefined;
      return stub;
    },
    set(t, p, v) { t[p] = v; return true; },
  });
  base.window = base.self = base.globalThis = g;
  const ctx = vm.createContext({ __g: g });
  const errors = [];
  for (const s of inlineScripts(html)) {
    if (found) break;
    let code = s.module ? stubImports(s.code) : s.code;
    /* Record the table when it is declared too, in case the do-nothing DOM stops the script
       before it reaches ToolI18n.setup (word-document-diff and pdf-merger keep their own
       "translations" object). */
    const arg = (code.match(/ToolI18n\.setup\(\s*([A-Za-z_$][\w$]*)\s*[,)]/) || [])[1];
    for (const name of [arg, 'translations']) {
      if (!name) continue;
      const decl = new RegExp('\\b(const|let|var)\\s+' + name.replace(/\$/g, '\\$') + '\\s*=');
      code = code.replace(decl, (m) => m + ' __holder.declared = ');
    }
    const wrapped = 'with (__g) { (async function () {\n' + code + '\n}).call(__g); }';
    let p;
    try {
      p = new vm.Script(wrapped, { filename: file }).runInContext(ctx, { timeout: 2000 });
    } catch (e) {
      if (e !== STOP && !found) errors.push(String(e && e.message || e));
      continue;
    }
    try {
      await Promise.race([p, new Promise(r => setTimeout(r, 300))]);
    } catch (e) {
      if (e !== STOP && !found) errors.push(String(e && e.message || e));
    }
  }
  if (!found && holder.declared) found = holder.declared;
  if (!found) return { error: errors.length ? errors.join(' | ') : 'no ToolI18n.setup table' };
  return { tables: JSON.parse(JSON.stringify(found, (k, v) => (typeof v === 'function' ? undefined : v))) };
}

(async () => {
  const out = {};
  for (const f of process.argv.slice(2)) {
    try { out[f] = await tablesOf(f); } catch (e) { out[f] = { error: String(e && e.message || e) }; }
  }
  process.stdout.write(JSON.stringify(out));
  process.exit(0);
})();
