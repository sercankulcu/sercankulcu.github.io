# -*- coding: utf-8 -*-
"""Uygulamalar: /apps/ sayfasi, uygulama sayfalarinin arama on bilgisi ve paylasim kartlari.

    python tools/make_app_pages.py

1. _pages/apps.md'yi kart duzeniyle yeniden yazar. Gruplar, siralama ve emojiler asagidaki
   GROUPS listesindedir; aciklama her uygulamanin kendi excerpt'inden gelir. Yeni uygulama
   eklemek icin sayfasini apps/ altina koyup GROUPS'a bir satir ekleyin.
2. Her uygulama sayfasinin on bilgisine seo_title, og_image ve web_app (schema.org
   applicationCategory) yazar; _includes/head/custom.html web_app'tan WebApplication
   JSON-LD'si kurar. Bu uc anahtari betik yonetir, elle degistirmeyin (her calismada yenilenir).
3. Her uygulama icin 1200x630 paylasim karti cizer: images/apps/<ad>.jpg
   (Chrome ya da Edge ve playwright gerekir; make_slide_pdf.launch kullanilir).
"""
import html, io, json, os, pathlib, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SITE = 'https://sercankulcu.github.io'
CARD_DIR = 'images/apps'
CARD_BASE = SITE + '/' + CARD_DIR + '/'

# (emoji, grup adi, vurgu rengi, schema.org applicationCategory, dosya isleyen arac mi, uygulamalar)
GROUPS = [
    ('📄', 'PDF & document tools', '#c0392b', 'BusinessApplication', True, [
        ('✍️', '/apps/pdf-signer/'), ('📝', '/apps/pdf-form-filler/'), ('📎', '/apps/pdf-merger/'),
        ('✂️', '/apps/pdf-splitter/'), ('🗜️', '/apps/pdf-compressor/'), ('📑', '/apps/pdf-page-organizer/'),
        ('📐', '/apps/pdf-to-a4/'), ('🖼️', '/apps/pdf-to-image/'), ('📄', '/apps/image-to-a4-pdf/'),
        ('🗂️', '/apps/images-to-pdf/'), ('🔎', '/apps/pdf-diff/'), ('🛡️', '/apps/pdf-review-integrity-scanner/'),
        ('📷', '/apps/document-scanner/'), ('✒️', '/apps/signature-maker/')]),
    ('🖼️', 'Image tools', '#2f8a6b', 'MultimediaApplication', True, [
        ('✂️', '/apps/image-background-remover/'), ('🗜️', '/apps/image-compressor-resizer/'),
        ('🕵️', '/apps/image-redactor/'), ('🔄', '/apps/image-format-converter/'), ('🎨', '/apps/image-color-palette/')]),
    ('🛠️', 'Utilities', '#1f6fb2', 'UtilitiesApplication', False, [
        ('📲', '/apps/qr-code-generator/'), ('🔐', '/apps/password-generator/'), ('📏', '/apps/unit-converter/'),
        ('🌐', '/apps/favicon-generator/'), ('⏱️', '/apps/minimal-timer/'), ('🍅', '/apps/pomodoro-timer/')]),
    ('🔍', 'Document & metadata tools', '#7b3fa0', 'BusinessApplication', True, [
        ('📝', '/apps/word-document-diff/'), ('🔎', '/apps/pdf-metadata-viewer/'),
        ('🗂️', '/apps/office-metadata-viewer/'), ('🏷️', '/apps/image-metadata-viewer/')]),
    ('🧠', 'Tests', '#e08a00', 'EducationalApplication', False, [
        ('⚡', '/apps/reaction-time-test/'), ('🧠', '/apps/memory-test/'),
        ('🧩', '/apps/cognitive-reasoning-test/'), ('🌟', '/apps/personality-test/')]),
    ('🔮', 'Fun', '#6a3fa0', 'EntertainmentApplication', False, [
        ('🔮', '/apps/fortune-teller/'), ('🃏', '/apps/tarot/tarot-reader/')]),
    ('🏔️', 'Other projects', '#2d6a4f', 'LifestyleApplication', False, [
        ('🧘', '/apps/mantra/'), ('🏔️', 'https://dorukdayim.netlify.app')]),
]
EXTERNAL = {'https://dorukdayim.netlify.app': ('Dorukdayım', 'A separate project site, in Turkish.')}
MANAGED = ('seo_title', 'og_image', 'web_app')

# kartta tekrar etmesin: giris paragrafi zaten "tarayicida calisir" diyor
TRIM = re.compile(r'\s*(—\s*)?(directly|locally|entirely|securely)? ?in your browser'
                  r'(\s*(—|,)\s*no (upload|server)(,? no (upload|server))?)?', re.I)


def e(s):
    return html.escape(s, quote=True)


def short(desc):
    d = TRIM.sub('', desc).strip()
    d = d.replace(' — with ', ', with ').replace('RGB, and HSL', 'RGB and HSL')
    return d if d.endswith('.') else d + '.'


def page_file(url):
    if url == '/apps/mantra/':
        return os.path.join(REPO, 'apps', 'mantra', 'index.html')
    return os.path.join(REPO, *url.strip('/').split('/')) + '.html'


def read_meta(url):
    s = io.open(page_file(url), encoding='utf-8').read()
    fm = s[4:s.index('\n---\n', 4)]
    g = lambda k: json.loads(re.search(r'^%s: (".*")$' % k, fm, re.M).group(1))
    assert re.search(r'^permalink: %s$' % re.escape(url), fm, re.M), url
    return g('title'), g('excerpt')


def slug(url):
    return url.strip('/').split('/')[-1]


def seo_title(title, files):
    return '%s · Free Online%s' % (title, ', No Upload' if files else '')


def update_front_matter(url, add, path=None, managed=MANAGED):
    path = path or page_file(url)
    s = io.open(path, encoding='utf-8').read()
    end = s.index('\n---\n', 4)
    lines = [l for l in s[4:end].split('\n') if not l.startswith(tuple(k + ':' for k in managed))]
    new = '---\n' + '\n'.join(lines + add) + s[end:]
    if new != s:
        io.open(path, 'w', encoding='utf-8', newline='').write(new)
        print('yazildi', os.path.relpath(path, REPO))


HUB_CSS = """
.apps-intro { font-size: 1.05em; margin: 0 0 1.6em; }
.apps-group { margin: 2em 0 .8em; font-size: 1.15em; }
.apps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px; margin: 0 0 1em; }
a.app-card { display: flex; flex-direction: column; gap: .35em; padding: .9em 1em; border: 1px solid var(--global-border-color);
  border-radius: 10px; background: var(--global-bg-color); color: var(--global-text-color); text-decoration: none;
  transition: border-color .15s, transform .15s, box-shadow .15s; }
a.app-card:hover, a.app-card:focus-visible { border-color: var(--global-link-color); transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,.08); }
.app-head { display: flex; align-items: center; gap: .5em; font-weight: 600; color: var(--global-link-color); }
.app-ico { font-size: 1.3em; line-height: 1; }
.app-desc { font-size: .85em; line-height: 1.45; color: var(--global-text-color-light); }
"""

CARD_HTML = """<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
body { display: flex; background: #fbfaf7; font-family: 'Segoe UI', Arial, sans-serif; color: #1d1d1f; }
.txt { position: relative; width: 700px; box-sizing: border-box; padding: 70px 40px 64px 76px; display: flex; flex-direction: column; }
.bar { width: 72px; height: 8px; border-radius: 4px; background: %(accent)s; margin-bottom: 26px; }
.kick { font-size: 22px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: %(accent)s; }
h1 { font-family: Georgia, 'Times New Roman', serif; font-weight: 700; font-size: %(size)dpx; line-height: 1.08; margin: 18px 0 0; }
.desc { margin-top: 22px; font-size: 27px; line-height: 1.35; color: #3a3a3c; }
.lines { margin-top: auto; }
.l2 { font-size: 24px; font-weight: 600; color: %(accent)s; }
.site { margin-top: 10px; font-size: 21px; color: #8e8e93; letter-spacing: .02em; }
.art { flex: 1; display: flex; align-items: center; justify-content: center; background: %(accent)s1a; }
.ico { font-family: 'Segoe UI Emoji', 'Noto Color Emoji', 'Apple Color Emoji', sans-serif; font-size: 230px; line-height: 1;
  filter: drop-shadow(0 14px 24px rgba(0,0,0,.18)); }
.foot { position: absolute; left: 0; right: 0; bottom: 0; height: 12px; background: %(accent)s; }
</style></head><body>
<div class="txt"><div class="bar"></div><div class="kick">%(kicker)s</div><h1>%(title)s</h1><div class="desc">%(desc)s</div>
<div class="lines"><div class="l2">%(l2)s</div><div class="site">sercankulcu.github.io</div></div></div>
<div class="art"><div class="ico">%(ico)s</div></div><div class="foot"></div>
</body></html>"""


def card_html(title, desc, ico, accent, files, kicker='Free browser tool', l2=None, lang='en'):
    n = len(title)
    size = 72 if n <= 14 else 62 if n <= 22 else 52 if n <= 32 else 44
    longest = max(len(w) for w in title.split())
    size = min(size, int(584 / (0.62 * longest)))
    if len(desc) > 140:
        desc = desc[:desc.rfind(' ', 0, 137)].rstrip(',;:—') + '…'
    if l2 is None:
        l2 = 'Free · Runs in your browser · No upload' if files else 'Free · Runs in your browser'
    return (CARD_HTML % dict(accent=accent, kicker=e(kicker), title=e(title), desc=e(desc),
                             l2=e(l2), ico=ico, size=size)).replace('<html lang="en">', '<html lang="%s">' % lang)


def render_cards(cards, card_dir=CARD_DIR):
    sys.path.insert(0, HERE)
    import make_slide_pdf
    from playwright.sync_api import sync_playwright
    tmp = os.path.join(os.environ.get('TEMP', '/tmp'), 'app-card.html')
    with sync_playwright() as p:
        br = make_slide_pdf.launch(p)
        pg = br.new_page(viewport={'width': 1200, 'height': 630})
        for name, content in cards:
            with open(tmp, 'w', encoding='utf-8') as f:
                f.write(content)
            pg.goto(pathlib.Path(tmp).as_uri(), wait_until='load')
            for attempt in range(3):
                try:
                    data = pg.screenshot(type='jpeg', quality=88)
                    break
                except Exception:
                    if attempt == 2:
                        raise
                    pg.wait_for_timeout(500)
            out = os.path.join(REPO, card_dir, name + '.jpg')
            old = open(out, 'rb').read() if os.path.exists(out) else None
            if old != data:
                os.makedirs(os.path.dirname(out), exist_ok=True)
                with open(out, 'wb') as f:
                    f.write(data)
                print('yazildi', card_dir + '/' + name + '.jpg')
        br.close()


def build():
    items, out, cards, n = [], [], [], 0
    for gi, gname, accent, category, files, apps in GROUPS:
        out.append('<h2 class="apps-group">%s %s</h2>' % (gi, e(gname)))
        out.append('<div class="apps-grid">')
        for ico, url in apps:
            if url in EXTERNAL:
                name, desc = EXTERNAL[url]
                out.append('<a class="app-card" href="%s" rel="noopener"><span class="app-head"><span class="app-ico" '
                           'aria-hidden="true">%s</span>%s ↗</span><span class="app-desc">%s</span></a>'
                           % (url, ico, e(name), e(desc)))
                continue
            name, excerpt = read_meta(url)
            desc = short(excerpt)
            out.append('<a class="app-card" href="%s"><span class="app-head"><span class="app-ico" aria-hidden="true">'
                       '%s</span>%s</span><span class="app-desc">%s</span></a>' % (url, ico, e(name), e(desc)))
            if url.startswith('/apps/'):
                n += 1
                items.append({'@type': 'ListItem', 'position': n, 'url': SITE + url, 'name': name})
            update_front_matter(url, ['seo_title: ' + json.dumps(seo_title(name, files), ensure_ascii=False),
                                      'og_image: ' + CARD_BASE + slug(url) + '.jpg',
                                      'web_app: ' + category])
            cards.append((slug(url), card_html(name, desc, ico, accent, files)))
        out.append('</div>')

    ld = {'@context': 'https://schema.org', '@type': 'ItemList', 'name': 'Free browser-based tools',
          'numberOfItems': n, 'itemListElement': items}
    desc = ('%d free tools that run entirely in your browser: sign, merge, split and compress PDFs, '
            'remove image backgrounds, convert images, generate QR codes and more. '
            'Your files never leave your device.' % n)
    hub = """---
layout: archive
permalink: /apps/
title: "Apps"
seo_title: "Free Browser-Based PDF, Image and Utility Tools"
description: %s
author_profile: true
json_ld: %s
hreflang: {en: "/apps/", tr: "/apps/tr/"}
---

<style>%s</style>

<p class="apps-intro">%d free tools for everyday PDF, image and document work. Everything runs in your browser:
your files are processed on your own device and are never uploaded to a server. No sign-up, no limits.
<a href="/apps/tr/" hreflang="tr" lang="tr">Türkçe</a></p>

%s
""" % (json.dumps(desc, ensure_ascii=False), json.dumps(json.dumps(ld, ensure_ascii=False), ensure_ascii=False),
           HUB_CSS.strip(), n, '\n'.join(out))
    assert '{{' not in hub and '{%' not in hub
    path = os.path.join(REPO, '_pages', 'apps.md')
    old = io.open(path, encoding='utf-8').read() if os.path.exists(path) else None
    if old != hub:
        io.open(path, 'w', encoding='utf-8', newline='\n').write(hub)
        print('yazildi _pages/apps.md')
    render_cards(cards)


if __name__ == '__main__':
    build()
