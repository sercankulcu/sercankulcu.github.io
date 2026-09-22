import os, sys, time
sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
from pypdf import PdfReader, PdfWriter

HERE = os.path.dirname(os.path.abspath(__file__))
OUTDIR = os.path.join(HERE, 'build')          # ara ciktilar; .gitignore'da
os.makedirs(OUTDIR, exist_ok=True)
SRC = os.path.join(OUTDIR, 'Programming-with-C.pdf')
DST = os.path.join(OUTDIR, 'book-final.pdf')

r = PdfReader(SRC)
w = PdfWriter(clone_from=SRC)          # yer imleri ve kunye korunur
t0 = time.time()
for i, p in enumerate(w.pages):
    p.compress_content_streams()       # merge_page akislari acik birakmisti
    if (i + 1) % 150 == 0:
        print('  %d/%d  %.0fs' % (i + 1, len(w.pages), time.time() - t0))
try:                                   # pypdf 6.x adlari; eskisi 7.0'da kalkiyor
    w.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
except TypeError:
    w.compress_identical_objects(remove_identicals=True, remove_orphans=True)
except Exception as e:
    print('  dedup atlandi:', e)
with open(DST, 'wb') as f:
    w.write(f)
print('once  : %.1f MB' % (os.path.getsize(SRC) / 1048576))
print('sonra : %.1f MB' % (os.path.getsize(DST) / 1048576))
