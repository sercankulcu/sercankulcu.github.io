# -*- coding: utf-8 -*-
"""HTML sunumlardan (deck.js) PDF uretir ve files/<ders>/pdf/ altina koyar.

    python tools/make_slide_pdf.py computer                  # dersin tum sunumlari
    python tools/make_slide_pdf.py computer Bolum_10_Diziler # yalnizca verilenler
    python tools/make_slide_pdf.py data_structures --stale   # PDF'i sunumundan eski olanlar

Her slayt ve her animasyon adimi ayri sayfadir (800x600 px). Sunum, deck.js'in
kendi "ileri" dugmesiyle bastan sona gezilir; her durumda etkin slaydin o anki
hali toplanir, sonra hepsi tek belgede tek seferde basilir. Boylece yazi
tipleri dosyaya bir kez gomulur.

Sayfalar yerel dosyalardan basilir (henuz yayimlanmamis degisiklikler de
girer); site temasi (yazi tipi, --global-* renkleri) canli siteden eklenir.
Chrome ya da Edge ve Python paketi playwright gerekir.
"""
import argparse, functools, gzip, http.server, os, re, subprocess, sys, threading

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
THEME_CSS = 'https://sercankulcu.github.io/assets/css/main.css'

PRINT_CSS = """
@page { size: 800px 600px; margin: 0; }
*, *::before, *::after { animation: none !important; transition: none !important; }
html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
.pdf-page { width: 800px; height: 600px; overflow: hidden; break-after: page; position: relative; }
.pdf-page:last-child { break-after: auto; }
.pdf-page .ds-deck { width: 800px !important; margin: 0 !important; }
.pdf-page .ds-deck__screen { position: relative !important; width: 800px !important; height: 600px !important; }
.pdf-page .ds-deck__stage { position: absolute !important; top: 0; left: 0; transform: none !important;
  border: 0 !important; border-radius: 0 !important; box-shadow: none !important; }
.pdf-page .ds-deck__stepnav button { display: none !important; }
"""

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


class Handler(http.server.SimpleHTTPRequestHandler):
    """Gzip'li sunucu: buyuk sunumlar sikistirmasiz gonderilince baglanti kopabiliyor."""
    TYPES = {'html': 'text/html; charset=utf-8', 'css': 'text/css', 'js': 'application/javascript',
             'svg': 'image/svg+xml', 'png': 'image/png', 'jpg': 'image/jpeg', 'webp': 'image/webp'}

    def do_GET(self):
        path = self.translate_path(self.path.split('?')[0].split('#')[0])
        if not os.path.isfile(path):
            return super().do_GET()
        with open(path, 'rb') as f:
            data = gzip.compress(f.read())
        self.send_response(200)
        self.send_header('Content-Type', self.TYPES.get(path.rsplit('.', 1)[-1].lower(), 'application/octet-stream'))
        self.send_header('Content-Encoding', 'gzip')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, *a):
        pass


def decks(slides):
    """deck.js kullanan ana sunumlar (calisma sorulari ve simulatorler haric)."""
    out = []
    for f in sorted(os.listdir(slides)):
        if not re.match(r'Bolum_\d\d_.*\.html$', f) or f.endswith('_Calisma_Sorulari.html'):
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


def render(page, url, theme):
    page.goto(url, wait_until='networkidle')
    page.wait_for_selector('#ds-deck-next', state='attached')
    if theme:
        # yerel dosyada site temasi yok: ana stil dosyasini basa ekle (deck.css sonra gelsin)
        page.evaluate("""(u) => new Promise(r => { const l = document.createElement('link');
            l.rel = 'stylesheet'; l.href = u; l.onload = l.onerror = r; document.head.prepend(l); })""", theme)
    page.add_style_tag(content='*,*::before,*::after{animation:none!important;transition:none!important}')
    expected = page.evaluate(EXPECTED)
    snaps = []
    while True:
        page.wait_for_timeout(30)
        snaps.append(page.evaluate(SNAP))
        if page.evaluate(DONE) or len(snaps) > expected + 5:
            break
        page.evaluate("document.getElementById('ds-deck-next').click()")
    # sayfayi statik durum kopyalariyla degistir: stiller head'e alinir, betikler yeniden calismaz
    page.evaluate("""(html) => {
        document.querySelectorAll('body link[rel="stylesheet"], body style').forEach(s => document.head.appendChild(s));
        document.querySelectorAll('body script').forEach(s => s.remove());
        document.body.innerHTML = html; }""", ''.join(snaps))
    page.add_style_tag(content=PRINT_CSS)
    page.emulate_media(media='screen')
    page.wait_for_timeout(500)
    return snaps, expected


def main():
    ap = argparse.ArgumentParser(description='HTML sunumlardan PDF uretir.')
    ap.add_argument('course', help='files/ altindaki ders klasoru, ornegin computer, data_structures, agt')
    ap.add_argument('names', nargs='*', help='sunum dosya adlari (.html olmadan); verilmezse tumu')
    ap.add_argument('--stale', action='store_true', help='yalnizca PDF\'i olmayan ya da sunumundan eski olanlar')
    ap.add_argument('--out', help='cikti klasoru (varsayilan files/<ders>/pdf)')
    ap.add_argument('--no-theme', action='store_true', help='canli site temasini ekleme (cevrimdisi)')
    a = ap.parse_args()

    slides = os.path.join(REPO, 'files', a.course, 'slides')
    if not os.path.isdir(slides):
        sys.exit('Klasor yok: ' + slides)
    pdfdir = a.out or os.path.join(REPO, 'files', a.course, 'pdf')
    os.makedirs(pdfdir, exist_ok=True)
    names = a.names or decks(slides)
    for n in names:
        if not os.path.exists(os.path.join(slides, n + '.html')):
            sys.exit('Sunum yok: ' + n)
    if a.stale:
        names = [n for n in names if is_stale(slides, pdfdir, n)]
    if not names:
        print('Guncel olmayan PDF yok.')
        return

    from playwright.sync_api import sync_playwright
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Handler, directory=slides))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    base = 'http://127.0.0.1:%d' % srv.server_address[1]
    theme = None if a.no_theme else THEME_CSS
    bad = 0
    with sync_playwright() as p:
        browser = launch(p)
        for n in names:
            page = browser.new_page(viewport={'width': 800, 'height': 600})
            snaps, expected = render(page, '%s/%s.html#1' % (base, n), theme)
            out = os.path.join(pdfdir, n + '.pdf')
            page.pdf(path=out, width='800px', height='600px', print_background=True,
                     margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}, prefer_css_page_size=True)
            ok = len(snaps) == expected
            bad += not ok
            print('%-45s %4d sayfa%s  %5d KB' % (n, len(snaps), '' if ok else ' (beklenen %d!)' % expected,
                                                 os.path.getsize(out) // 1024))
            page.close()
        browser.close()
    srv.shutdown()
    if bad:
        sys.exit('%d sunumda sayfa sayisi adim sayisiyla tutmadi.' % bad)


if __name__ == '__main__':
    main()
