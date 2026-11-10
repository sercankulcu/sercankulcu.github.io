# -*- coding: utf-8 -*-
"""Kitap hattinin ortak parcalari: ders secimi, yollar, Chrome, PDF hedefleri.

Her ders tools/book/course_<ad>.py icinde tanimlidir (bkz. course_c.py,
course_agt.py). Asamalar dersi BOOK_COURSE ortam degiskeninden okur;
make_book.py bunu kendisi ayarlar.
"""
import importlib, io, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
TOOLS = os.path.dirname(HERE)
SITE = os.path.dirname(TOOLS)
PDFS = os.path.join(os.path.dirname(SITE), 'courses-pdfs')   # ayri depo, yan yana klonlu

CHROME_CANDIDATES = [
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
]
CHROME = next((c for c in CHROME_CANDIDATES if os.path.exists(c)), None)


def courses():
    return sorted(f[7:-3] for f in os.listdir(HERE)
                  if f.startswith('course_') and f.endswith('.py'))


def course(key=None):
    key = key or os.environ.get('BOOK_COURSE')
    if not key:
        sys.exit('BOOK_COURSE tanimli degil (dersler: %s)' % ', '.join(courses()))
    if HERE not in sys.path:
        sys.path.insert(0, HERE)
    m = importlib.import_module('course_' + key)
    m.KEY = key
    return m


def build_dir(c):
    # BOOK_BUILD_DIR yalnizca deneme icin: ara ciktilari baska bir klasore yazar.
    d = os.environ.get('BOOK_BUILD_DIR') or os.path.join(HERE, 'build', c.KEY)
    os.makedirs(d, exist_ok=True)
    return d


def final_pdf(c):
    return os.path.join(PDFS, *c.OUTPUT.split('/'))


def read_json(c, name):
    return json.load(io.open(os.path.join(build_dir(c), name), encoding='utf-8'))


def write_json(c, name, data):
    json.dump(data, io.open(os.path.join(build_dir(c), name), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=1)


def dest_pages(pdf):
    """Adlandirilmis hedef -> sayfa indeksi (0 tabanli).

    Chrome, kitap icinden bag verilen her id icin PDF'e bir hedef yazar. Icindekiler
    tablosu her bolume, kisma ve alt bolume bag verdigi icin bunlarin hepsi burada.
    """
    from pypdf import PdfReader
    r = PdfReader(pdf)
    idx = {p.indirect_reference.idnum: i for i, p in enumerate(r.pages)}
    out = {}
    for name, d in r.named_destinations.items():
        try:
            out[name.lstrip('/')] = idx[d.page.idnum]
        except Exception:
            pass
    return out, len(r.pages)


def strip_tags(s):
    return re.sub(r'\s+', ' ', re.sub('<[^>]+>', '', s)).strip()
