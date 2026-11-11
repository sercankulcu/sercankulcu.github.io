# -*- coding: utf-8 -*-
"""book.html -> Chrome ile iki baski; ikincisinde icindekiler gercek sayfa numaralariyla.

Sayfa numaralari PDF metninden degil, Chrome'un yazdigi adlandirilmis hedeflerden
okunur: icindekilerdeki her satir hedefine bag verdigi icin her bolumun, kismin ve
alt bolumun basladigi sayfa PDF'te kayitlidir. Cikti: raw2.pdf ve pages.json.
"""
import io, os, re, sys, subprocess

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import common

C = common.course()
OUTDIR = common.build_dir(C)
HTML = os.path.join(OUTDIR, 'book.html')


def render(out):
    if os.path.exists(out):
        os.remove(out)
    subprocess.run([common.CHROME, '--headless', '--disable-gpu', '--no-pdf-header-footer',
                    '--print-to-pdf=' + out, 'file:///' + HTML.replace('\\', '/')],
                   capture_output=True)
    if not os.path.exists(out):
        sys.exit('Chrome PDF uretmedi: %s' % out)
    return out


def analyse(pdf, book):
    dests, n = common.dest_pages(pdf)
    want = [p['id'] for p in book['parts']] + [c['id'] for c in book['chapters']] + \
           [a['id'] for a in book['appendices']] + [u['id'] for u in book.get('intro', [])]
    missing = [w for w in want if w not in dests]
    if missing:
        sys.exit('PDF hedefi bulunamadi: %s' % ', '.join(missing[:10]))
    first_body = min(dests[w] for w in want)
    return dests, n, first_body


def front_pages(pdf, first_body):
    """On kisimdaki onsoz ve icindekiler sayfalari (yer imleri icin)."""
    from pypdf import PdfReader
    r = PdfReader(pdf)
    found = {}
    for i in range(first_body):
        t = (r.pages[i].extract_text() or '').strip()
        for key in ('preface', 'contents'):
            if key not in found and L.get(key) and t.startswith(L[key]):
                found[key] = i
    return found


L = C.LABELS

if __name__ == '__main__':
    book = common.read_json(C, 'book.json')

    print('  1/3 ilk baski...')
    raw = render(os.path.join(OUTDIR, 'raw1.pdf'))
    dests, n, first_body = analyse(raw, book)
    print('      %d sayfa, %d hedef, govde s%d' % (n, len(dests), first_body + 1))

    doc = io.open(HTML, encoding='utf-8').read()
    def fill(m):
        pg = dests.get(m.group(1))
        return '<span class="p" data-dest="%s">%s</span>' % (
            m.group(1), (pg - first_body + 1) if pg is not None else '')
    doc = re.sub(r'<span class="p" data-dest="([^"]+)">.*?</span>', fill, doc)
    io.open(HTML, 'w', encoding='utf-8', newline='\n').write(doc)

    print('  2/3 ikinci baski...')
    raw2 = render(os.path.join(OUTDIR, 'raw2.pdf'))
    dests2, n2, first_body2 = analyse(raw2, book)
    moved = [k for k in dests if dests2.get(k, -1) - first_body2 != dests[k] - first_body]
    if moved:
        # numaralar sayfa akisini degistirmez; degistirirse icindekiler yanlis olur
        sys.exit('ikinci baskida %d hedef kaydi (or. %s); icindekiler tutarsiz' %
                 (len(moved), moved[:5]))

    print('  3/3 sayfa haritasi')
    common.write_json(C, 'pages.json', {'pages': n2, 'first_body': first_body2,
                                        'dests': dests2,
                                        'front': front_pages(raw2, first_body2)})
    print('  hazir: raw2.pdf, %d sayfa (bindirmeyi overlay.py yapar)' % n2)
