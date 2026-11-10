# -*- coding: utf-8 -*-
"""Bir dersin notlarindan tek parca PDF kitap uretir ve courses-pdfs/ altina koyar.

    python tools/make_book.py c       # Programming with C   -> courses-pdfs/c/Programming-with-C.pdf
    python tools/make_book.py agt     # Algoritmik Oyun Kurami -> courses-pdfs/agt/...

Ders tanimlari tools/book/course_<ders>.py icindedir. Dort asama: kitap HTML'i ->
Chrome ile iki baski (ikincisi icindekiler sayfa numaralariyla) -> sayfa numarasi/
ust bilgi/yer imi bindirmesi -> sikistirma. Ara ciktilar tools/book/build/<ders>/
altinda kalir; yalnizca son PDF kopyalanir.
"""
import os, shutil, subprocess, sys, time

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
HERE = os.path.dirname(os.path.abspath(__file__))
BOOK = os.path.join(HERE, 'book')
sys.path.insert(0, BOOK)
import common


def run(script, key):
    t0 = time.time()
    env = dict(os.environ, BOOK_COURSE=key)
    r = subprocess.run([sys.executable, '-u', os.path.join(BOOK, script)],
                       cwd=common.SITE, capture_output=True, text=True, encoding='utf-8',
                       errors='replace', env=env)
    for l in (r.stdout or '').splitlines():
        if l.strip():
            print('    ' + l.strip())
    if r.returncode:
        print((r.stderr or '')[-1500:])
        sys.exit('%s basarisiz' % script)
    print('    (%.0f sn)' % (time.time() - t0))


if __name__ == '__main__':
    if len(sys.argv) != 2 or sys.argv[1] not in common.courses():
        sys.exit('kullanim: python tools/make_book.py <ders>\ndersler: %s'
                 % ', '.join(common.courses()))
    key = sys.argv[1]
    C = common.course(key)
    if not common.CHROME:
        sys.exit('Chrome/Edge bulunamadi; tools/book/common.py icindeki CHROME_CANDIDATES listesine ekleyin.')
    print('1/4  kitap HTML\'i')
    run('build.py', key)
    print('2/4  iki baski ve icindekiler sayfa numaralari')
    run('finalize.py', key)
    print('3/4  sayfa numarasi, ust bilgi, yer imleri')
    run('overlay.py', key)
    print('4/4  sikistirma')
    run('compress.py', key)

    final = common.final_pdf(C)
    os.makedirs(os.path.dirname(final), exist_ok=True)
    shutil.copyfile(os.path.join(common.build_dir(C), 'book-final.pdf'), final)
    mb = os.path.getsize(final) / 1048576
    from pypdf import PdfReader
    pages = len(PdfReader(final).pages)
    print('\nbitti: courses-pdfs/%s  %d sayfa, %.1f MB' % (C.OUTPUT, pages, mb))
    print('ders sayfasindaki sayfa sayisi ve boyutu elle guncelleyin.')
