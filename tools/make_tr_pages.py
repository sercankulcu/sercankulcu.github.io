# -*- coding: utf-8 -*-
"""Turkish addresses for the English apps and games, English addresses for the Turkish games.

    python tools/make_tr_pages.py           # write
    python tools/make_tr_pages.py --check   # exit 1 if a copy is out of date (check_site runs this)

For every page in tools/tr_pages.py:
1. apps/tr/<slug>.html or game/tr/<slug>.html (address = the file's place): the English page's body unchanged, with Turkish
   front matter (title, excerpt, seo_title, lang: tr, ui_lang: tr). ui_lang makes the interface open
   in Turkish (head/custom.html sets window.PZ_PAGE_LANG; assets/js/tool-i18n.js reads it).
   The copies are generated: edit the English page, then run this script.
   The copy's language is also written into its HTML (for crawlers without JavaScript):
   data-i18n / data-i18n-html / data-i18n-attr elements get the strings of the page's table
   (tools/i18n_tables.js reads it with Node; data-i18n-vars="n=0; best=0" fills the string's {n}
   and {best} placeholders, as tool-i18n.js does at runtime), text nodes that are exactly a table
   string (or an item of a list of strings) get its translation, and an H1 the table does not
   cover gets the copy's title. Pages with their own language system name their en/tr table with
   data-i18n-table="name"; their data-i18n* marks only serve this script (their own code switches). Strings the page would
   otherwise read back from its HTML go into window.PZ_I18N_ORIG (tool-i18n.js restores them),
   so the TR/EN switch still works both ways. --report prints what was done per copy.
2. hreflang {en, tr} in the front matter of both pages (head/custom.html prints the alternates).
3. _pages/araclar.md and _pages/oyunlar.md: Turkish hubs. Turkish-only games link to their own page.
4. _data/tr_urls.yml: English URL -> Turkish URL, used on Turkish pages for "Continue with" links.
5. game/en/<slug>.html: English copies of the Turkish games (tools/en_pages.py, ui_lang: en); the
   Turkish page gets ui_lang: tr and hreflang. The /games/ hub links the English copies.
Then run tools/make_related.py (the strip under each page also covers the Turkish pages).
"""
import io, json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import make_app_pages as A
import make_game_pages as G
import make_related as M
import tr_pages as T
import en_pages as E

REPO = A.REPO
SITE = A.SITE
CHECK = '--check' in sys.argv
changed = []


def write(path, text, newline='\n'):
    full = os.path.join(REPO, *path.split('/'))
    old = io.open(full, encoding='utf-8', newline='').read() if os.path.exists(full) else None
    if old == text:
        return
    changed.append(path)
    if not CHECK:
        os.makedirs(os.path.dirname(full), exist_ok=True)
        io.open(full, 'w', encoding='utf-8', newline='').write(text)


def split(path):
    s = io.open(path, encoding='utf-8', newline='').read()
    nl = '\r\n' if s.startswith('---\r\n') else '\n'
    end = s.index(nl + '---' + nl, 3)
    return s[3 + len(nl):end], s[end + len(nl) * 2 + 3:], nl


def fm_value(fm, key):
    for line in fm.splitlines():
        if line.startswith(key + ':'):
            return line.split(':', 1)[1].strip()
    return None


def hreflang(en, tr):
    return 'hreflang: {en: "%s", tr: "%s"}' % (en, tr)


# ---------------------------------------------------------------------------------------------
# Writing the copy's language into its HTML. The pages switch language at runtime
# (assets/js/tool-i18n.js, data-i18n / data-i18n-html / data-i18n-attr); without this the copy's
# body would hold the source language until JavaScript runs, and search engines would index an
# English H1 under a Turkish title. The data-* attributes stay, so the switch still works both ways.

I18N_TABLES = {}          # source page (repo-relative) -> {lang: {key: string}} or {'error': ...}
REPORT = []               # one line per copy, printed with --report
STATS = {}


def load_tables(srcs):
    """Each page's table, from tools/i18n_tables.js (Node runs the page's inline scripts in a sandbox)."""
    import subprocess
    rels = [os.path.relpath(s, REPO).replace(os.sep, '/') for s in srcs]
    try:
        r = subprocess.run(['node', os.path.join(REPO, 'tools', 'i18n_tables.js')] + rels, cwd=REPO,
                           capture_output=True, text=True, encoding='utf-8')
    except OSError:
        sys.exit('make_tr_pages.py needs Node (node) to read the pages\' language tables.')
    if r.returncode:
        sys.exit('tools/i18n_tables.js failed:\n' + r.stderr)
    for rel, v in json.loads(r.stdout).items():
        I18N_TABLES[rel] = v.get('tables') or {'error': v.get('error')}


VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
TAG = re.compile(r'<(/?)([a-zA-Z][\w-]*)((?:\s+[^\s=>/"\']+(?:\s*=\s*(?:"[^"]*"|\'[^\']*\'|[^\s>"\']+))?)*)\s*(/?)>')
ATTR = re.compile(r'([^\s=>/"\']+)(?:\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>"\']+))?')
RAW = re.compile(r'<(script|style|textarea)\b[^>]*>.*?</\1\s*>', re.S | re.I)
EMOJI = re.compile(r':[a-z0-9_+-]+:')


def esc_text(s):
    s = s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    return s.replace('{', '&#123;').replace('}', '&#125;')


def esc_attr(s):
    return esc_text(s).replace('"', '&quot;')


def liquid_safe(s):
    """HTML from a table: braces would be read by Liquid, ':name:' by jemoji."""
    return re.sub(r'\{(?=[{%])', '&#123;', s)


def attrs_of(attr_text):
    out = []
    for m in ATTR.finditer(attr_text):
        v = m.group(2)
        if v and v[0] in '"\'':
            v = v[1:-1]
        out.append((m.group(1), v))
    return out


def set_attr(attr_text, name, value):
    """attr_text with name="value" (replaced in place, or appended)."""
    new = '%s="%s"' % (name, esc_attr(value))
    for m in ATTR.finditer(attr_text):
        if m.group(1).lower() == name.lower():
            return attr_text[:m.start()] + new + attr_text[m.end():]
    return attr_text + ' ' + new


def closing(html, start, name):
    """Index of the '</name>' that closes the element whose start tag ends at start, and its end."""
    depth = 1
    raw = [(m.start(), m.end()) for m in RAW.finditer(html, start)]
    pos = start
    while True:
        m = TAG.search(html, pos)
        if not m:
            return None
        inside = next((r for r in raw if r[0] <= m.start() < r[1]), None)
        if inside:
            pos = inside[1]
            continue
        if m.group(2).lower() == name:
            if m.group(1):
                depth -= 1
                if depth == 0:
                    return m.start(), m.end()
            elif not m.group(4):
                depth += 1
        pos = m.end()


def fill_vars(s, spec):
    """s with the {name} placeholders of a data-i18n-vars spec ("n=0; best=0") filled in."""
    if not spec or not isinstance(s, str):
        return s
    for part in spec.split(';'):
        if '=' in part:
            k, v = part.split('=', 1)
            s = s.replace('{%s}' % k.strip(), v.strip())
    return s


def localize(body, tables, lang, src_lang, title):
    """body with the strings of tables[lang] written in; returns (body, original strings, notes)."""
    to = tables.get(lang) or {}
    have = tables.get(src_lang) or {}
    orig, skipped, missing = {}, [], []
    raw = [(m.start(), m.end()) for m in RAW.finditer(body)]
    edits = []                                     # (start, end, replacement, kind), applied back to front
    for m in TAG.finditer(body):
        if m.group(1) or any(a <= m.start() < b for a, b in raw):
            continue
        attrs = dict((k.lower(), v) for k, v in attrs_of(m.group(3)))
        if not any(k.startswith('data-i18n') for k in attrs):
            continue
        name = m.group(2).lower()
        new_attrs = m.group(3)
        to_k = lambda k, v=attrs.get('data-i18n-vars'): fill_vars(to[k], v)
        for spec in (attrs.get('data-i18n-attr') or '').split(';'):
            p = spec.split(':')
            if len(p) != 2 or not p[0].strip():
                continue
            a, k = p[0].strip(), p[1].strip()
            if k not in to:
                missing.append(k)
                continue
            if not isinstance(to[k], str) or '{' in to_k(k):
                skipped.append(k)
                continue
            if k not in have and a.lower() in attrs and attrs[a.lower()] is not None:
                orig.setdefault(k, attrs[a.lower()])
            new_attrs = set_attr(new_attrs, a, to_k(k))
        inner = None
        for kind in ('data-i18n', 'data-i18n-html'):
            k = attrs.get(kind)
            if k is None:
                continue
            if name in VOID:
                break
            close = closing(body, m.end(), name)
            if not close:
                missing.append(k + ' (unclosed <%s>)' % name)
                break
            if k not in to:
                missing.append(k)
                break
            if not isinstance(to[k], str) or (kind == 'data-i18n' and '{' in to_k(k)):
                skipped.append(k)
                break
            old = body[m.end():close[0]]
            if k not in have:
                orig.setdefault(k, html_unescape(re.sub(r'<[^>]*>', '', old)) if kind == 'data-i18n' else old)
            inner = (close[0], esc_text(to_k(k)) if kind == 'data-i18n' else liquid_safe(to_k(k)))
            break
        if new_attrs != m.group(3):
            edits.append((m.start(), m.end(), body[m.start():m.end()].replace(m.group(3), new_attrs, 1), 'tag'))
        if inner:
            edits.append((m.end(), inner[0], inner[1], 'inner'))
    # nested data-i18n elements inside a replaced one disappear with it: keep the outermost edit
    inners = [(x[0], x[1]) for x in edits if x[3] == 'inner']
    kept = [x for x in edits if not any(a <= x[0] and x[1] <= b and (a, b) != (x[0], x[1]) for a, b in inners)]
    for s, e, rep, _ in sorted(kept, key=lambda e: e[0], reverse=True):
        body = body[:s] + rep + body[e:]

    # text the script writes at start (status lines, "Choose an image to begin."): a text node that
    # is exactly one of the source-language strings of the table gets its translation
    pairs = {}
    for k, v in have.items():
        w = to.get(k)
        if isinstance(v, list) and isinstance(w, list) and len(v) == len(w):
            items = zip(v, w)                      # e.g. the help rules of hangman
        else:
            items = [(v, w)]
        for v, w in items:
            if isinstance(v, str) and isinstance(w, str) and '{' not in v + w and '<' not in v + w:
                pairs.setdefault(v.strip(), set()).add(w)
    pairs = dict((v, t.pop()) for v, t in pairs.items() if len(t) == 1 and v)
    raw = [(m.start(), m.end()) for m in RAW.finditer(body)]
    parts, last, matched = [], 0, 0
    for m in re.finditer(r'>([^<>]+)<', body):
        a, b = m.start(1), m.end(1)
        if any(x <= a < y for x, y in raw):
            continue
        text = html_unescape(m.group(1)).strip()
        if text in pairs and not re.search(r'[{}]', m.group(1)):
            lead = m.group(1)[:len(m.group(1)) - len(m.group(1).lstrip())]
            trail = m.group(1)[len(m.group(1).rstrip()):]
            parts += [body[last:a], lead + esc_text(pairs[text]) + trail]
            last, matched = b, matched + 1
    body = ''.join(parts) + body[last:]
    STATS['text'] = matched

    # the visible H1: written by the table above, else the copy's title
    h1 = None
    for m in TAG.finditer(body):
        if not m.group(1) and m.group(2).lower() == 'h1' and not any(a <= m.start() < b for a, b in raw):
            h1 = m
            break
    if h1:
        close = closing(body, h1.end(), 'h1')
        text = re.sub(r'<[^>]*>', '', body[h1.end():close[0]]).strip() if close else ''
        localized = 'data-i18n' in h1.group(3) and any(
            k == dict((a.lower(), v) for a, v in attrs_of(h1.group(3))).get('data-i18n') for k in to)
        if close and not localized and '<' not in body[h1.end():close[0]].strip():
            if text != title:
                body = body[:h1.end()] + esc_text(title) + body[close[0]:]
    return body, orig, sorted(set(skipped)), sorted(set(missing))


def html_unescape(s):
    import html as H
    return H.unescape(s)


def orig_script(lang, strings):
    """window.PZ_I18N_ORIG: the strings this copy replaced that the page's own table does not hold
    (tool pages take them from the HTML at start). tool-i18n.js puts them back into the table."""
    def enc(s):
        s = json.dumps(s, ensure_ascii=False)
        for a, b in ((':', '\\u003a'), ('/', '\\/'), ('{', '\\u007b'), ('}', '\\u007d'), ('<', '\\u003c')):
            s = s.replace(a, b)
        return s
    if not strings:
        return ''
    return ('<script>window.PZ_I18N_ORIG = {"lang": %s, "strings": {%s}};</script>\n'
            % (enc(lang), ', '.join('%s: %s' % (enc(k), enc(v)) for k, v in sorted(strings.items()))))


def localized_body(src, body, lang, src_lang, title, label):
    rel = os.path.relpath(src, REPO).replace(os.sep, '/')
    tables = I18N_TABLES.get(rel) or {}
    if 'error' in tables or lang not in tables:
        new, orig, skipped, missing = localize(body, {}, lang, src_lang, title)
        REPORT.append('%s: no table (%s); H1 only' % (label, tables.get('error') or 'none'))
        return new
    new, orig, skipped, missing = localize(body, tables, lang, src_lang, title)
    REPORT.append('%s: %d original strings kept for the switch; %d start-up texts matched; placeholders skipped: %s; keys without %s: %s'
                  % (label, len(orig), STATS.get('text', 0), ', '.join(skipped) or '-', lang, ', '.join(missing) or '-'))
    return orig_script(src_lang, orig) + new


def copies():
    load_tables([A.page_file(u) for u, _ in T.all_pages()] + [A.page_file(u) for u in E.GAMES])
    for en_url, hub in T.all_pages():
        table = T.APPS if en_url in T.APPS else T.GAMES
        slug, seo, excerpt = table[en_url]
        tr_url = T.tr_url(en_url)
        src = A.page_file(en_url)
        fm, body, nl = split(src)
        title = M.TR_TITLES.get(en_url) or json.loads(fm_value(fm, 'title'))
        lines = ['---',
                 '# tools/make_tr_pages.py writes this copy of %s; edit that page, then run the script.'
                 % os.path.relpath(src, REPO).replace(os.sep, '/'),
                 'layout: without-sidebar',
                 'title: ' + json.dumps(title, ensure_ascii=False),
                 'permalink: ' + tr_url,
                 'excerpt: ' + json.dumps(excerpt, ensure_ascii=False),
                 'lang: tr',
                 'ui_lang: tr',
                 'seo_title: ' + json.dumps(seo, ensure_ascii=False)]
        for key in ('og_image', 'web_app', 'game_genre'):
            v = fm_value(fm, key)
            if v:
                lines.append('%s: %s' % (key, v))
        lines.append(hreflang(en_url, tr_url))
        lines.append('---')
        tr_body = localized_body(src, body, 'tr', 'en', title, tr_url)
        text = nl.join(lines) + nl + tr_body
        assert '{{' not in tr_body and '{%' not in tr_body, en_url
        folder = T.TOOLS_HUB.strip('/') if hub == T.TOOLS_HUB else T.GAMES_HUB.strip('/')
        write('%s/%s.html' % (folder, slug), text)

        # the English page points back at its Turkish address
        want = [hreflang(en_url, tr_url)]
        if [l for l in fm.splitlines() if l.startswith('hreflang:')] != want:
            en_lines = [l for l in fm.splitlines() if not l.startswith('hreflang:')] + want
            new = '---' + nl + nl.join(en_lines) + nl + '---' + nl + body
            changed.append(os.path.relpath(src, REPO).replace(os.sep, '/'))
            if not CHECK:
                io.open(src, 'w', encoding='utf-8', newline='').write(new)


def en_copies():
    """English-address copies of the Turkish games (tools/en_pages.py); the Turkish page keeps opening in Turkish."""
    for tr_page, (slug, title, seo, excerpt) in E.GAMES.items():
        en = E.en_url(tr_page)
        src = A.page_file(tr_page)
        fm, body, nl = split(src)
        lines = ['---',
                 '# tools/make_tr_pages.py writes this copy of %s; edit that page, then run the script.'
                 % os.path.relpath(src, REPO).replace(os.sep, '/'),
                 'layout: without-sidebar',
                 'title: ' + json.dumps(title, ensure_ascii=False),
                 'permalink: ' + en,
                 'excerpt: ' + json.dumps(excerpt, ensure_ascii=False),
                 'lang: en',
                 'ui_lang: en',
                 'seo_title: ' + json.dumps(seo, ensure_ascii=False)]
        for key in ('og_image', 'game_genre'):
            v = fm_value(fm, key)
            if v:
                lines.append('%s: %s' % (key, v))
        lines.append(hreflang(en, tr_page))
        lines.append('---')
        en_body = localized_body(src, body, 'en', 'tr', title, en)
        assert '{{' not in en_body and '{%' not in en_body, tr_page
        write(E.PREFIX.strip('/') + '/%s.html' % slug, nl.join(lines) + nl + en_body)

        # the Turkish page: opens in Turkish and points at its English address
        want = ['ui_lang: tr', hreflang(en, tr_page)]
        if sorted(l for l in fm.splitlines() if l.startswith(('hreflang:', 'ui_lang:'))) != sorted(want):
            tr_lines = [l for l in fm.splitlines() if not l.startswith(('hreflang:', 'ui_lang:'))] + want
            new = '---' + nl + nl.join(tr_lines) + nl + '---' + nl + body
            changed.append(os.path.relpath(src, REPO).replace(os.sep, '/'))
            if not CHECK:
                io.open(src, 'w', encoding='utf-8', newline='').write(new)


# Kartta yalnız işi anlatan cümle kalsın: sayfanın girişi zaten her şeyin tarayıcıda yapıldığını söylüyor.
# Arama açıklaması (excerpt) olduğu gibi kalır.
TRIM_TR = re.compile(r'\s+(Dosya(lar|nız)?\b[^.]*|Görsel yüklenmez|Hepsi cihazınızda yapılır|Sıkıştırma tarayıcınızda[^.]*'
                     r'|Tarayıcıda çalışır|Yükleme yok|İşlem tarayıcınızda[^.]*|Şifreler yalnız tarayıcınızda[^.]*)\.$')


def card_desc(desc):
    return TRIM_TR.sub('', desc)


def card(url, ico, name, desc):
    return ('<a class="app-card" href="%s"><span class="app-head"><span class="app-ico" aria-hidden="true">%s</span>'
            '%s</span><span class="app-desc">%s</span></a>' % (url, ico, A.e(name), A.e(desc)))


TOOL_GROUPS_TR = ['PDF ve belge araçları', 'Görsel araçları', 'Yardımcı araçlar', 'Belge ve meta veri araçları',
                  'Testler', 'Eğlence', 'Diğer projeler']
GAME_GROUPS_TR = ['Arcade ve aksiyon', 'Bulmaca ve mantık', 'Kelime oyunları', 'Bilgi yarışması ve zekâ', 'Klasik ve gündelik']


def hubs():
    out, n = [], 0
    for (gi, gname, accent, category, files, apps), gtr in zip(A.GROUPS, TOOL_GROUPS_TR):
        cards = []
        for ico, url in apps:
            if url in A.EXTERNAL:
                name, desc = A.EXTERNAL[url]
                cards.append('<a class="app-card" href="%s" rel="noopener"><span class="app-head"><span class="app-ico" '
                             'aria-hidden="true">%s</span>%s ↗</span><span class="app-desc">Ayrı bir proje sitesi.</span></a>'
                             % (url, ico, A.e(name)))
            elif url in T.APPS:
                n += 1
                cards.append(card(T.tr_url(url), ico, M.TR_TITLES.get(url, A.read_meta(url)[0]), card_desc(T.APPS[url][2])))
        out.append('<h2 class="apps-group">%s %s</h2>\n<div class="apps-grid">\n%s\n</div>' % (gi, A.e(gtr), '\n'.join(cards)))
    tools_hub = """---
layout: archive
permalink: %s
title: "Araçlar"
lang: tr
seo_title: "Ücretsiz Online PDF, Görsel ve Yardımcı Araçlar · Yüklemeden"
description: "PDF birleştirme, bölme, sıkıştırma ve imzalama; arka plan silme, görsel dönüştürme, QR kod ve daha fazlası. Hepsi tarayıcıda çalışır, dosyalar yüklenmez."
author_profile: true
hreflang: {en: "/apps/", tr: "%s"}
---

<style>%s</style>

<p class="apps-intro">Günlük PDF, görsel ve belge işleri için %d ücretsiz araç. Hepsi tarayıcınızda çalışır:
dosyalarınız kendi cihazınızda işlenir, hiçbir sunucuya yüklenmez. Üyelik yok, sınır yok.
<a href="/apps/" hreflang="en" lang="en">English</a></p>

%s
""" % (T.TOOLS_HUB, T.TOOLS_HUB, A.HUB_CSS.strip(), n, '\n'.join(out))

    out, n = [], 0
    for (gi, gname, accent, category, games), gtr in zip(G.GROUPS, GAME_GROUPS_TR):
        cards = []
        for ico, name, lang in games:
            url = '/game/%s/' % name
            title, excerpt = A.read_meta(url)
            n += 1
            if url in T.GAMES:
                cards.append(card(T.tr_url(url), ico, M.TR_TITLES.get(url, title), T.GAMES[url][2]))
            else:
                cards.append(card(url, ico, title, excerpt))
        for ico, url, _t, _d, title_tr, desc_tr in G.COURSE_GAMES.get(category, []):
            n += 1
            cards.append(card(url, ico, title_tr, desc_tr))
        out.append('<h2 class="apps-group">%s %s</h2>\n<div class="apps-grid">\n%s\n</div>' % (gi, A.e(gtr), '\n'.join(cards)))
    games_hub = """---
layout: archive
permalink: %s
title: "Oyunlar"
lang: tr
seo_title: "Ücretsiz Online Oyunlar · Kelime, Bulmaca ve Bilgi Yarışması"
description: "Beş Harf, Mayın Tarlası, Sudoku, Bağlantılar, bilgi yarışmaları ve arcade oyunları. Ücretsiz, üyeliksiz, tarayıcıda oynanır."
author_profile: true
hreflang: {en: "/games/", tr: "%s"}
---

<style>%s</style>

<p class="apps-intro">Tarayıcıda oynanan %d ücretsiz oyun: kelime oyunları, bulmacalar, bilgi yarışmaları ve arcade.
İndirme ve üyelik gerekmez. <a href="/games/" hreflang="en" lang="en">English</a></p>

%s
""" % (T.GAMES_HUB, T.GAMES_HUB, A.HUB_CSS.strip(), n, '\n'.join(out))
    for text in (tools_hub, games_hub):
        assert '{{' not in text and '{%' not in text
    write('_pages/araclar.md', tools_hub)
    write('_pages/oyunlar.md', games_hub)


def urls_data():
    lines = ['# tools/make_tr_pages.py writes this file; English URL -> Turkish URL.']
    for en_url, _ in T.all_pages():
        lines.append('%s: %s' % (json.dumps(en_url), json.dumps(T.tr_url(en_url))))
    write('_data/tr_urls.yml', '\n'.join(lines) + '\n')


if __name__ == '__main__':
    copies()
    en_copies()
    hubs()
    urls_data()
    if CHECK:
        if changed:
            print('Turkish copies out of date (run python tools/make_tr_pages.py):\n  ' + '\n  '.join(changed))
            sys.exit(1)
        print('Turkish copies up to date')
    else:
        if '--report' in sys.argv:
            print('\n'.join(REPORT))
        print('%d files written' % len(changed))
        for c in changed:
            print('  ' + c)
