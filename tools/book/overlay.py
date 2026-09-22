"""raw2.pdf hazir: yalnizca sayfa numarasi / ust bilgi / yer imi ekler."""
import io, os, re, sys, json

sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
HERE = os.path.dirname(os.path.abspath(__file__))
OUTDIR = os.path.join(HERE, 'build')          # ara ciktilar; .gitignore'da
os.makedirs(OUTDIR, exist_ok=True)
SRC = os.path.join(OUTDIR, 'raw2.pdf')
DST = os.path.join(OUTDIR, 'Programming-with-C.pdf')
TITLE = 'Programming with C'
MM = 2.8346

CHAP_RE = re.compile(r'(?:BASIC|INTERMEDIATE|ADVANCED|PROFESSIONAL)·CHAPTER(\d+)')
PART_RE = re.compile(r'PART([1-4])')

from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from io import BytesIO

titles = {int(k): v for k, v in
          json.load(io.open(os.path.join(OUTDIR, 'titles.json'), encoding='utf-8')).items()}

print('metin cikariliyor...')
reader = PdfReader(SRC)
texts = [(p.extract_text() or '') for p in reader.pages]
n = len(texts)

chap_start, part_start = {}, {}
pref = toc = None
for i, t in enumerate(texts):
    head = re.sub(r'\s+', '', t[:140])
    m = CHAP_RE.search(head)
    if m:
        chap_start.setdefault(int(m.group(1)), i)
    p = PART_RE.match(head)
    if p and 'Chapters' in t:
        part_start.setdefault(int(p.group(1)), i)
    if pref is None and t.strip().startswith('Preface'):
        pref = i
    if toc is None and t.strip().startswith('Contents'):
        toc = i
first_body = min(list(chap_start.values()) + list(part_start.values()))
print('%d sayfa | %d bolum | %d kisim | govde s%d' %
      (n, len(chap_start), len(part_start), first_body + 1))

starts = {v: k for k, v in chap_start.items()}
partp = set(part_start.values())
owner, cur = {}, None
for i in range(n):
    if i in starts:
        cur = starts[i]
    owner[i] = cur

W, H = A4
writer = PdfWriter()
for i, page in enumerate(reader.pages):
    if i >= first_body:
        num = i - first_body + 1
        buf = BytesIO()
        c = canvas.Canvas(buf, pagesize=A4)
        c.setFont('Helvetica', 8.5)
        c.setFillGray(0.35)
        c.drawCentredString(W / 2, 13 * MM, str(num))
        if i not in starts and i not in partp:
            head = TITLE if num % 2 == 0 else (titles.get(owner[i]) or TITLE)
            if len(head) > 60:
                head = head[:58] + '…'
            c.setFont('Helvetica', 7.6)
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
        page.merge_page(PdfReader(buf).pages[0])
    writer.add_page(page)
    if (i + 1) % 100 == 0:
        print('  %d/%d' % (i + 1, n))

print('yer imleri...')
writer.add_outline_item('Title page', 0)
if pref is not None:
    writer.add_outline_item('Preface', pref)
if toc is not None:
    writer.add_outline_item('Contents', toc)
PARTNAMES = {1: 'Basic', 2: 'Intermediate', 3: 'Advanced', 4: 'Professional'}
RANGES = {1: (1, 14), 2: (15, 28), 3: (29, 42), 4: (43, 56)}
for p in sorted(part_start):
    parent = writer.add_outline_item('Part %d — %s' % (p, PARTNAMES[p]), part_start[p])
    a, b = RANGES[p]
    for ch in range(a, b + 1):
        if ch in chap_start:
            writer.add_outline_item('%d. %s' % (ch, titles.get(ch, '')), chap_start[ch], parent)

writer.add_metadata({'/Title': TITLE, '/Author': 'Sercan Külcü',
                     '/Subject': 'A complete course in C, in fifty-six chapters',
                     '/Keywords': 'C, programming, systems, embedded, course'})
with open(DST, 'wb') as f:
    writer.write(f)
print('bitti: %s  %.1f MB' % (os.path.basename(DST), os.path.getsize(DST) / 1048576))
