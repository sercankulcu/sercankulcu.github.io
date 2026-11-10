# -*- coding: utf-8 -*-
"""book-overlay.pdf -> book-final.pdf: icerik akislarini yeniden sikistirir."""
import os, sys, time
sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)
from pypdf import PdfWriter
import common

C = common.course()
OUTDIR = common.build_dir(C)
SRC = os.path.join(OUTDIR, 'book-overlay.pdf')
DST = os.path.join(OUTDIR, 'book-final.pdf')

w = PdfWriter(clone_from=SRC)          # yer imleri, sayfa etiketleri ve kunye korunur
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
