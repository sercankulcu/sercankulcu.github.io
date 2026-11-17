# -*- coding: utf-8 -*-
"""Turkish addresses for the English apps and games, English addresses for the Turkish games.

    python tools/make_tr_pages.py           # write
    python tools/make_tr_pages.py --check   # exit 1 if a copy is out of date (check_site runs this)

For every page in tools/tr_pages.py:
1. apps/tr/<slug>.html or game/tr/<slug>.html (address = the file's place): the English page's body unchanged, with Turkish
   front matter (title, excerpt, seo_title, lang: tr, ui_lang: tr). ui_lang makes the interface open
   in Turkish (head/custom.html sets window.PZ_PAGE_LANG; assets/js/tool-i18n.js reads it).
   The copies are generated: edit the English page, then run this script.
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


def copies():
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
        text = nl.join(lines) + nl + body
        assert '{{' not in body and '{%' not in body, en_url
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
        assert '{{' not in body and '{%' not in body, tr_page
        write(E.PREFIX.strip('/') + '/%s.html' % slug, nl.join(lines) + nl + body)

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
        print('%d files written' % len(changed))
        for c in changed:
            print('  ' + c)
