# -*- coding: utf-8 -*-
"""Ingilizce ders bloklarinda sunum satirlarina PDF baglantisi ekler.

    python tools/add_en_pdf_links.py          # _teaching/*.md
    python tools/add_en_pdf_links.py --dry

<div data-lt="en"> blogundaki her "[🖼️ Slides](/files/<ders>/slides/Chapter_X.html)" baglantisinin
hemen arkasina, ../courses-pdfs/<ders>/pdf/Chapter_X.pdf varsa
" · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/<ders>/pdf/Chapter_X.pdf)" eklenir.
Zaten PDF baglantisi olan satirlara dokunulmaz.
"""
import glob, io, os, re, sys

sys.stdout.reconfigure(encoding='utf-8')
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_REPO = os.path.join(os.path.dirname(REPO), 'courses-pdfs')
LINK = re.compile(r'\[🖼️ Slides\]\(/files/(?P<c>[a-z_]+)/slides/(?P<n>Chapter_[^)]+)\.html\)(?! · \[📄 PDF\])')
DRY = '--dry' in sys.argv

for p in sorted(glob.glob(os.path.join(REPO, '_teaching', '*.md'))):
    s = io.open(p, encoding='utf-8').read()
    i = s.find('<div data-lt="en"')
    if i < 0:
        continue
    head, en = s[:i], s[i:]
    added, missing = [], []

    def add(m):
        pdf = os.path.join(PDF_REPO, m.group('c'), 'pdf', m.group('n') + '.pdf')
        if not os.path.exists(pdf):
            missing.append(m.group('n'))
            return m.group(0)
        added.append(m.group('n'))
        return m.group(0) + ' · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/%s/pdf/%s.pdf)' % (m.group('c'), m.group('n'))

    new = LINK.sub(add, en)
    if added or missing:
        print('%-45s +%d PDF%s' % (os.path.basename(p), len(added), ('  (PDF yok: %s)' % ', '.join(missing)) if missing else ''))
    if new != en and not DRY:
        io.open(p, 'w', encoding='utf-8', newline='').write(head + new)
