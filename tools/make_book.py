# -*- coding: utf-8 -*-
"""Ders notlarindan tek parca PDF kitabi uretir ve files/c/ altina koyar.

    python tools/make_book.py

Dort asama: kitap HTML'i -> Chrome ile iki baski (ikincisi icindekiler sayfa
numaralariyla) -> sayfa numarasi/ust bilgi/yer imi bindirmesi -> sikistirma.
Ara ciktilar tools/book/build/ altinda kalir; yalnizca son PDF kopyalanir.
Toplam 10-20 dakika surer.
"""
import io, json, os, re, glob, shutil, subprocess, sys, time

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
BOOK = os.path.join(HERE, 'book')
BUILD = os.path.join(BOOK, 'build')
FINAL = os.path.join(REPO, 'files', 'c', 'Programming-with-C.pdf')

CHROME_CANDIDATES = [
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
]


def need_chrome():
    for c in CHROME_CANDIDATES:
        if os.path.exists(c):
            return c
    sys.exit('Chrome bulunamadi. tools/book/finalize.py icindeki CHROME yolunu duzeltin.')


def run(script):
    t0 = time.time()
    r = subprocess.run([sys.executable, '-u', os.path.join(BOOK, script)],
                       cwd=REPO, capture_output=True, text=True, encoding='utf-8',
                       errors='replace')
    for l in (r.stdout or '').splitlines():
        if l.strip():
            print('    ' + l.strip())
    if r.returncode:
        print((r.stderr or '')[-1500:])
        sys.exit('%s basarisiz' % script)
    print('    (%.0f sn)' % (time.time() - t0))


def write_titles():
    """overlay.py ust bilgide bolum adlarini kullanir."""
    t = {}
    for f in glob.glob(os.path.join(REPO, 'files', 'c', 'Week_*.html')):
        n = int(re.search(r'Week_(\d+)', f).group(1))
        s = io.open(f, encoding='utf-8').read()
        t[n] = re.sub('<[^>]+>', '', re.search(r'<h1>(.+?)</h1>', s, re.S).group(1)).strip()
    os.makedirs(BUILD, exist_ok=True)
    json.dump(t, io.open(os.path.join(BUILD, 'titles.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=0)
    return len(t)


if __name__ == '__main__':
    need_chrome()
    print('1/5  bolum basliklari')
    print('    %d bolum' % write_titles())
    print('2/5  kitap HTML\'i')
    run('build.py')
    print('3/5  iki baski ve icindekiler sayfa numaralari')
    run('finalize.py')
    print('4/5  sayfa numarasi, ust bilgi, yer imleri')
    run('overlay.py')
    print('5/5  sikistirma')
    run('compress.py')

    src = os.path.join(BUILD, 'book-final.pdf')
    shutil.copyfile(src, FINAL)
    mb = os.path.getsize(FINAL) / 1048576
    try:
        from pypdf import PdfReader
        pages = len(PdfReader(FINAL).pages)
        print('\nbitti: files/c/Programming-with-C.pdf  %d sayfa, %.1f MB' % (pages, mb))
        print('ders sayfasindaki sayfa sayisi ve boyutu elle guncelleyin.')
    except Exception:
        print('\nbitti: files/c/Programming-with-C.pdf  %.1f MB' % mb)
