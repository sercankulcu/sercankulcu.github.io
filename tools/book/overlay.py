# -*- coding: utf-8 -*-
"""raw2.pdf -> sayfa numarasi, ust bilgi, yer imleri, sayfa etiketleri, kunye."""
import io, os, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
import common

from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from io import BytesIO

C = common.course()
OUTDIR = common.build_dir(C)
SRC = os.path.join(OUTDIR, 'raw2.pdf')
DST = os.path.join(OUTDIR, 'book-overlay.pdf')
MM = 2.8346
L = C.LABELS

book = common.read_json(C, 'book.json')
pg = common.read_json(C, 'pages.json')
dests, first_body = pg['dests'], pg['first_body']

# Helvetica (WinAnsi) Turkce harflerin bir kismini (g, s, i noktasiz) basamaz;
# ders bir TTF verirse o kullanilir.
FONT = 'Helvetica'
for path in (getattr(C, 'FONT', None) or []):
    if os.path.exists(path):
        from reportlab.pdfbase import pdfmetrics
        from reportlab.pdfbase.ttfonts import TTFont
        pdfmetrics.registerFont(TTFont('BookSans', path))
        FONT = 'BookSans'
        break

print('sayfalar okunuyor...')
reader = PdfReader(SRC)
n = len(reader.pages)

# her sayfanin sahibi olan bolum/ek (ust bilgi icin)
units = [(dests[c['id']], c['header']) for c in book['chapters']] + \
        [(dests[a['id']], a['header']) for a in book['appendices']] + \
        [(dests[u['id']], u['header']) for u in book.get('intro', [])]
starts = {p for p, _ in units}
partp = {dests[p['id']] for p in book['parts']}
owner, cur = {}, None
heads = dict(units)
for i in range(n):
    if i in heads:
        cur = heads[i]
    owner[i] = cur
print('%d sayfa | %d bolum | %d kisim | %d ek | govde s%d' %
      (n, len(book['chapters']), len(book['parts']), len(book['appendices']), first_body + 1))

W, H = A4
writer = PdfWriter()
# Butun bindirmeler TEK tuvalde: her sayfa icin ayri tuval acmak gomulu yazi tipini
# (TTF kullanildiginda) her sayfaya ayrica gomuyordu; AGT kitabinda 800 kopya, 15 MB.
buf = BytesIO()
c = canvas.Canvas(buf, pagesize=A4)
for i in range(first_body, n):
    num = i - first_body + 1
    c.setFont(FONT, 8.5)
    c.setFillGray(0.35)
    c.drawCentredString(W / 2, 13 * MM, str(num))
    if i not in starts and i not in partp:
        head = C.TITLE if num % 2 == 0 else (owner[i] or C.TITLE)
        if len(head) > 60:
            head = head[:58] + '…'
        c.setFont(FONT, 7.6)
        c.setFillGray(0.45)
        if num % 2 == 0:
            c.drawString(25 * MM, H - 16 * MM, head)
        else:
            c.drawRightString(W - 25 * MM, H - 16 * MM, head)
        c.setStrokeGray(0.82)
        c.setLineWidth(0.3)
        c.line(25 * MM, H - 17.6 * MM, W - 25 * MM, H - 17.6 * MM)
    c.showPage()          # <- bu olmadan tuval bos PDF uretiyordu
c.save()
buf.seek(0)
over = PdfReader(buf).pages

for i, page in enumerate(reader.pages):
    if i >= first_body:
        page.merge_page(over[i - first_body])
    writer.add_page(page)
    if (i + 1) % 100 == 0:
        print('  %d/%d' % (i + 1, n))

print('yer imleri...')
writer.add_outline_item(L['title_page'], 0)
for key in ('preface', 'contents'):
    if key in pg['front']:
        writer.add_outline_item(L[key], pg['front'][key])
chap = {c['num']: c for c in book['chapters']}
for u in book.get('intro', []):
    writer.add_outline_item(u['title'], dests[u['id']])
for p in book['parts']:
    parent = writer.add_outline_item('%s %s — %s' % (L['part'], C.part_number(p['num']), p['name']),
                                     dests[p['id']])
    for num in p['chapters']:
        ch = chap[num]
        item = writer.add_outline_item('%s. %s' % (num, ch['title']), dests[ch['id']], parent)
        if C.BOOKMARK_SECTIONS:
            for s in ch['sections']:
                if s['id'] in dests:
                    writer.add_outline_item('%s %s' % (s['num'], s['title']), dests[s['id']], item)
for a in book['appendices']:
    writer.add_outline_item('%s. %s' % (a['label'], a['title']), dests[a['id']])

# goruntuleyicideki sayfa numarasi basiliyla ayni olsun: on kisim i, ii, ...; govde 1, 2, ...
try:
    if first_body:
        writer.set_page_label(0, first_body - 1, style='/r')
    writer.set_page_label(first_body, n - 1, style='/D', start=1)
except Exception as e:
    print('  sayfa etiketleri atlandi:', e)

meta = {'/Title': C.TITLE}
meta.update(C.META)
writer.add_metadata(meta)
from pypdf.generic import NameObject, TextStringObject
writer._root_object[NameObject('/Lang')] = TextStringObject(C.LANG)   # ekran okuyucu, heceleme
with open(DST, 'wb') as f:
    writer.write(f)
print('bitti: %s  %.1f MB' % (os.path.basename(DST), os.path.getsize(DST) / 1048576))
