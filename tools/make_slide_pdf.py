# -*- coding: utf-8 -*-
"""HTML sunumlardan (deck.js) PDF uretir ve courses-pdfs/<ders>/pdf/ altina koyar.

PDF'ler ayri depodadir (GitHub/courses-pdfs, bu deponun yaninda klonlanmis olmali);
sitede https://sercankulcu.github.io/courses-pdfs/<ders>/pdf/ adresinden yayimlanir.

    python tools/make_slide_pdf.py computer                  # dersin tum sunumlari
    python tools/make_slide_pdf.py computer Bolum_10_Diziler # yalnizca verilenler
    python tools/make_slide_pdf.py data_structures --stale   # PDF'i sunumundan eski olanlar

Her slayt ve her animasyon adimi ayri sayfadir (800x600 px). Sunum, deck.js'in
kendi "ileri" dugmesiyle bastan sona gezilir; her durumda etkin slaydin o anki
hali toplanir, sonra hepsi tek belgede tek seferde basilir. Boylece yazi
tipleri dosyaya bir kez gomulur.

Sayfalar yerel dosyalardan basilir (henuz yayimlanmamis degisiklikler de
girer); her sayfa, canli sitedeki sayfa duzeninin (tema, sarmalayicilar, MathJax)
icine yerlestirilir. Boylece deck.js'in otomatik sigdirmasi yayimdaki olculeri gorur.
Chrome ya da Edge ve Python paketi playwright gerekir.
"""
import argparse, os, re, subprocess, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
PDF_REPO = os.path.join(os.path.dirname(REPO), 'courses-pdfs')
SITE = 'https://sercankulcu.github.io'
# sayfa duzeni (tema, .page__content sarmalayicisi, MathJax) bu yayimlanmis sunumdan alinir
# duzeni alinan ornek sunum: adi degismeyen bir sunum secin (yeniden adlandirilan sunum
# yayina cikana kadar 404 verir)
SHELL_URL = SITE + '/files/os/slides/Bolum_01_Giris.html'

PRINT_CSS = """
@page { size: 800px 600px; margin: 0; }
*, *::before, *::after { animation: none !important; transition: none !important; }
html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
.pdf-page { width: 800px; height: 600px; overflow: hidden; break-after: page; position: relative; }
.pdf-page:last-child { break-after: auto; }
#main, #main .page, #main .page__inner-wrap, #main .page__content { margin: 0 !important; padding: 0 !important;
  width: 800px !important; max-width: none !important; float: none !important; }
.pdf-page .ds-deck { width: 800px !important; margin: 0 !important; }
.pdf-page .ds-deck__screen { position: relative !important; width: 800px !important; height: 600px !important; }
.pdf-page .ds-deck__stage { position: absolute !important; top: 0; left: 0; transform: none !important;
  border: 0 !important; border-radius: 0 !important; box-shadow: none !important; }
.pdf-page .ds-deck__stepnav button { display: none !important; }
.pdf-note { position: absolute; left: 0; right: 0; bottom: 0; z-index: 10; padding: 4px 12px 5px;
  font: 10.5px/1.3 system-ui, "Segoe UI", Arial, sans-serif; color: #555; text-align: center;
  background: rgba(255, 255, 255, .92); border-top: 1px solid #ddd; }
.pdf-note a { color: #1a5fb4; text-decoration: none; }
"""

# ilk sayfanin altindaki not: telif satiri ve sunumun HTML surumunun adresi (sunum diline gore)
NOTE = {
    'tr': '&copy; Sercan K\u00fclc\u00fc. T\u00fcm haklar\u0131 sakl\u0131d\u0131r. &middot; '
          'Sunumun etkile\u015fimli HTML s\u00fcr\u00fcm\u00fc: <a href="%s">%s</a>',
    'en': '&copy; Sercan K\u00fclc\u00fc. All rights reserved. &middot; '
          'Interactive HTML version of these slides: <a href="%s">%s</a>',
}


def note_html(lang, url):
    import html as _h
    u = _h.escape(url, quote=True)
    return '<div class="pdf-note">' + NOTE['en' if lang == 'en' else 'tr'] % (u, _h.escape(url)) + '</div>'

# etkin slaydin anlik hali (form ogelerinin degerleri isaretlemeye yazilir)
SNAP = """() => {
  const deck = document.getElementById('ds-deck');
  const slide = document.querySelector('.ds-deck__slide.is-active');
  slide.querySelectorAll('input').forEach(i => { i.setAttribute('value', i.value);
    if (i.checked) i.setAttribute('checked', ''); else i.removeAttribute('checked'); });
  slide.querySelectorAll('select').forEach(s => [...s.options].forEach(o =>
    o.selected ? o.setAttribute('selected', '') : o.removeAttribute('selected')));
  return '<div class="pdf-page"><div class="' + deck.className + '" lang="' + (deck.getAttribute('lang') || 'tr') +
    '" style="' + (deck.getAttribute('style') || '') + '"><div class="ds-deck__screen"><div class="ds-deck__stage">' +
    '<div class="ds-deck__viewport">' + slide.outerHTML + '</div></div></div></div></div>';
}"""

DONE = """() => {
  const nx = document.getElementById('ds-deck-next');
  const cur = document.querySelector('.ds-deck__slide.is-active');
  const pending = cur && [...cur.querySelectorAll('.ds-deck__stepnav [data-step="1"]')].some(b => !b.disabled);
  return nx.disabled && !pending; }"""

EXPECTED = """() => [...document.querySelectorAll('.ds-deck__slide')]
  .reduce((n, s) => n + Math.max(1, s.querySelectorAll('.ds-deck__step').length), 0)"""


# Yerel dosyalar Playwright'in istek yakalamasiyla dogrudan tarayiciya verilir; yerel bir HTTP
# sunucusu kullanilmaz (bu makinede 64 KB'tan buyuk yanitlarda baglanti ara sira kopuyordu).
# Adres "localhost" olmali: ds-guard yalnizca sitenin kendi adresinde ve yerelde calisir.
BASE = 'http://localhost:8765'
TYPES = {'html': 'text/html; charset=utf-8', 'css': 'text/css', 'js': 'application/javascript',
         'svg': 'image/svg+xml', 'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg',
         'webp': 'image/webp', 'gif': 'image/gif', 'json': 'application/json', 'woff2': 'font/woff2'}


def local_file(root, path, shell=None):
    """Adresin yolundaki dosyanin icerigi ve turu (yoksa None). shell verilirse .html, Jekyll'in
    yaptigi gibi on bilgisi atilarak yayimdaki sayfa duzeninin (once, sonra) arasina konur."""
    import urllib.parse
    rel = urllib.parse.unquote(path.split('?')[0].split('#')[0]).lstrip('/')
    f = os.path.normpath(os.path.join(root, rel))
    if not f.startswith(os.path.normpath(root)) or not os.path.isfile(f):
        return None, None
    with open(f, 'rb') as h:
        data = h.read()
    ext = f.rsplit('.', 1)[-1].lower()
    if shell and ext == 'html':
        data = re.sub(rb'\A---\r?\n.*?\r?\n---\r?\n', b'', data, count=1, flags=re.S)
        data = shell[0] + data + shell[1]
    return data, TYPES.get(ext, 'application/octet-stream')


def serve(context, root, shell=None):
    """BASE altindaki istekleri root klasorunden karsila (tarayici baglami icin)."""
    import urllib.parse

    def handle(route):
        data, ctype = local_file(root, urllib.parse.urlsplit(route.request.url).path, shell)
        if data is None:
            route.fulfill(status=404, body='')
        else:
            route.fulfill(status=200, body=data, headers={'Content-Type': ctype})
    context.route(BASE + '/**', handle)


def fetch_shell(url=SHELL_URL):
    """Yayimdaki sayfanin icerik oncesi ve sonrasi; site koku goreli adresler mutlak yapilir."""
    import urllib.request
    html = urllib.request.urlopen(url, timeout=30).read()
    html = re.sub(rb'''((?:href|src)=["'])/(?!/)''', lambda m: m.group(1) + SITE.encode() + b'/', html)
    a = re.search(rb'<section class="page__content"[^>]*>', html)
    b = html.rfind(b'</section><footer class="page__meta">')
    if not a or b < a.end():
        sys.exit('Sayfa duzeni okunamadi: ' + url)
    return html[:a.end()], html[b:]


def decks(slides):
    """deck.js kullanan ana sunumlar (calisma sorulari ve simulatorler haric)."""
    out = []
    for f in sorted(os.listdir(slides)):
        if not re.match(r'(Bolum|Chapter)_\d\d_.*\.html$', f) or '_Calisma_Sorulari' in f or '_Study_Questions' in f:
            continue
        with open(os.path.join(slides, f), encoding='utf-8') as h:
            if 'id="ds-deck-next"' in h.read():
                out.append(f[:-5])
    return out


def commit_time(path):
    r = subprocess.run(['git', 'log', '-1', '--format=%ct', '--', path], cwd=REPO,
                       capture_output=True, text=True)
    return int(r.stdout.strip() or 0)


def is_stale(slides, pdfdir, name):
    pdf = os.path.join(pdfdir, name + '.pdf')
    html = os.path.join(slides, name + '.html')
    if not os.path.exists(pdf):
        return True
    if os.path.getmtime(html) > os.path.getmtime(pdf):  # commitlenmemis degisiklik
        return True
    return commit_time(html) > commit_time(pdf)


def launch(p):
    for channel in ('chrome', 'msedge', None):
        try:
            return p.chromium.launch(channel=channel) if channel else p.chromium.launch()
        except Exception:
            continue
    sys.exit('Chrome ya da Edge bulunamadi (ya da "playwright install chromium" calistirin).')


def render(page, url, public_url=None):
    page.goto(url, wait_until='networkidle')
    page.wait_for_selector('#ds-deck-next', state='attached')
    page.add_style_tag(content='*,*::before,*::after{animation:none!important;transition:none!important}')
    expected = page.evaluate(EXPECTED)
    snaps = []
    while True:
        page.wait_for_timeout(30)
        snaps.append(page.evaluate(SNAP))
        if page.evaluate(DONE) or len(snaps) > expected + 5:
            break
        page.evaluate("document.getElementById('ds-deck-next').click()")
    if public_url and snaps:
        lang = page.evaluate("(document.getElementById('ds-deck').getAttribute('lang') || 'tr')")
        assert snaps[0].endswith('</div>')
        snaps[0] = snaps[0][:-len('</div>')] + note_html(lang, public_url) + '</div>'
    # sayfayi statik durum kopyalariyla degistir: stiller head'e alinir, betikler yeniden calismaz
    page.evaluate("""(html) => {
        document.querySelectorAll('body link[rel="stylesheet"], body style').forEach(s => document.head.appendChild(s));
        document.querySelectorAll('body script').forEach(s => s.remove());
        /* temanin .page__content gibi ust sarmalayicilarla yazdigi kurallar PDF'te de gecerli kalsin */
        document.body.innerHTML = '<div id="main"><article class="page page--without-sidebar"><div class="page__inner-wrap">' +
          '<section class="page__content">' + html + '</section></div></article></div>'; }""", ''.join(snaps))
    page.add_style_tag(content=PRINT_CSS)
    page.emulate_media(media='screen')
    page.wait_for_timeout(500)
    return snaps, expected


AUTHOR = 'Sercan Külcü'


def set_pdf_info(path):
    """PDF bilgisini duzeltir: baslik sayfa basligindan site adi (" - Point Zero") atilarak,
    yazar AUTHOR. Arama motorlari (Google, Google Scholar) bu alanlari okur."""
    import pymupdf
    d = pymupdf.open(path)
    m = dict(d.metadata)
    title = re.sub(r'\s+-\s+Point Zero\s*$', '', m.get('title') or '')
    if m.get('title') == title and m.get('author') == AUTHOR:
        d.close()
        return False
    d.set_metadata({'title': title, 'author': AUTHOR, 'subject': m.get('subject') or '',
                    'keywords': m.get('keywords') or '', 'creator': m.get('creator') or '',
                    'producer': m.get('producer') or '', 'creationDate': m.get('creationDate') or '',
                    'modDate': m.get('modDate') or ''})
    d.saveIncr()
    d.close()
    return True


def main():
    ap = argparse.ArgumentParser(description='HTML sunumlardan PDF uretir.')
    ap.add_argument('course', help='files/ altindaki ders klasoru, ornegin computer, data_structures, agt')
    ap.add_argument('names', nargs='*', help='sunum dosya adlari (.html olmadan); verilmezse tumu')
    ap.add_argument('--stale', action='store_true', help='yalnizca PDF\'i olmayan ya da sunumundan eski olanlar')
    ap.add_argument('--out', help='cikti klasoru (varsayilan ../courses-pdfs/<ders>/pdf)')
    ap.add_argument('--no-theme', action='store_true', help='canli site duzenini kullanma (cevrimdisi)')
    a = ap.parse_args()

    # sunumlar files/<ders>/slides altinda; Veri Yapilari'nda Turkce sunumlar sunumlar/,
    # Ingilizceler slides/ altindadir (ortak deck/ betikleri slides/deck'te)
    course_dir = os.path.join(REPO, 'files', a.course)
    folders = [d for d in ('slides', 'sunumlar') if os.path.isdir(os.path.join(course_dir, d))]
    if not folders:
        sys.exit('Klasor yok: ' + os.path.join(course_dir, 'slides'))
    pdfdir = a.out or os.path.join(PDF_REPO, a.course, 'pdf')
    os.makedirs(pdfdir, exist_ok=True)
    where = {}
    for d in folders:
        for n in decks(os.path.join(course_dir, d)):
            where[n] = d
    names = a.names or sorted(where)
    for n in names:
        if n not in where:
            found = [d for d in folders if os.path.exists(os.path.join(course_dir, d, n + '.html'))]
            if not found:
                sys.exit('Sunum yok: ' + n)
            where[n] = found[0]
    if a.stale:
        names = [n for n in names if is_stale(os.path.join(course_dir, where[n]), pdfdir, n)]
    if not names:
        print('Guncel olmayan PDF yok.')
        return

    from playwright.sync_api import sync_playwright
    shell = None if a.no_theme else fetch_shell()
    bad = 0
    with sync_playwright() as p:
        browser = launch(p)
        context = browser.new_context(viewport={'width': 1280, 'height': 900})
        serve(context, course_dir, shell)
        for n in names:
            # buyuk sunumlar ara sira yuklenemiyor (zaman asimi): birkac kez dene
            for attempt in range(3):
                page = context.new_page()
                try:
                    snaps, expected = render(page, '%s/%s/%s.html#1' % (BASE, where[n], n),
                                             '%s/files/%s/%s/%s.html' % (SITE, a.course, where[n], n))
                    break
                except Exception as e:
                    page.close()
                    if attempt == 2:
                        raise
                    print('%s: yeniden deneniyor (%s)' % (n, str(e).splitlines()[0][:80]))
            out = os.path.join(pdfdir, n + '.pdf')
            page.pdf(path=out, width='800px', height='600px', print_background=True,
                     margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}, prefer_css_page_size=True)
            set_pdf_info(out)
            ok = len(snaps) == expected
            bad += not ok
            print('%-45s %4d sayfa%s  %5d KB' % (n, len(snaps), '' if ok else ' (beklenen %d!)' % expected,
                                                 os.path.getsize(out) // 1024))
            page.close()
        browser.close()
    if not a.out:
        import make_pdf_pages
        make_pdf_pages.write_sitemap()
    if bad:
        sys.exit('%d sunumda sayfa sayisi adim sayisiyla tutmadi.' % bad)


if __name__ == '__main__':
    main()
