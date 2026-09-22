"""book.html -> Chrome -> sayfa numarasi/ust bilgi/ic kapak numaralari/yer imleri."""
import io, os, re, sys, subprocess, json

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
HERE = os.path.dirname(os.path.abspath(__file__))
OUTDIR = os.path.join(HERE, 'build')          # ara ciktilar; .gitignore'da
os.makedirs(OUTDIR, exist_ok=True)
CHROME = next((c for c in (
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
) if os.path.exists(c)), None)
HTML = os.path.join(OUTDIR, 'book.html')


def render(out):
    subprocess.run([CHROME, '--headless', '--disable-gpu', '--no-pdf-header-footer',
                    '--print-to-pdf=' + out, 'file:///' + HTML.replace('\\', '/')],
                   capture_output=True)
    return out


def page_text(pdf):
    from pypdf import PdfReader
    r = PdfReader(pdf)
    return [(p.extract_text() or '') for p in r.pages]


CHAP_RE = re.compile(r'(?:BASIC|INTERMEDIATE|ADVANCED|PROFESSIONAL)·CHAPTER(\d+)')
PART_RE = re.compile(r'PART([1-4])')


def analyse(texts):
    """Her bolumun ve kismin basladigi sayfa; govdenin ilk sayfasi.

    Baslik satirlarinda letter-spacing var, cikarimda 'B A S I C  ·  C H A P T E R  1'
    olarak geliyor; bu yuzden eslestirmeden once butun bosluklar atiliyor.
    """
    chap_start, part_start = {}, {}
    for i, t in enumerate(texts):
        head = re.sub(r'\s+', '', t[:140])
        m = CHAP_RE.search(head)
        if m:
            chap_start.setdefault(int(m.group(1)), i)
        p = PART_RE.match(head)
        if p and 'Chapters' in t:
            part_start.setdefault(int(p.group(1)), i)
    if not chap_start:
        raise SystemExit('bolum basligi bulunamadi; ornek metin: %r' % texts[6][:120])
    first_body = min(list(chap_start.values()) + list(part_start.values()))
    return chap_start, part_start, first_body


if __name__ == '__main__':
    # overlay.py'nin ihtiyaci; 10 dakikalik baskiya girmeden once var mi diye bak
    json.load(io.open(os.path.join(OUTDIR, 'titles.json'), encoding='utf-8'))

    print('  1/4 ilk baski...')
    raw = render(os.path.join(OUTDIR, 'raw1.pdf'))
    print('  2/4 sayfa haritasi...')
    page_texts = page_text(raw)
    chap_start, part_start, first_body = analyse(page_texts)
    print('      %d bolum, %d kisim bulundu, govde s%d' %
          (len(chap_start), len(part_start), first_body + 1))

    # icindekiler sayfa numaralari
    doc = io.open(HTML, encoding='utf-8').read()
    def fill(m):
        ch = int(m.group(1))
        pg = chap_start.get(ch)
        return '<span class="p" data-ch="%d">%s</span>' % (ch, (pg - first_body + 1) if pg is not None else '')
    doc = re.sub(r'<span class="p" data-ch="(\d+)">.*?</span>', fill, doc)
    io.open(HTML, 'w', encoding='utf-8', newline='\n').write(doc)

    print('  3/4 ikinci baski...')
    raw2 = render(os.path.join(OUTDIR, 'raw2.pdf'))
    page_texts = page_text(raw2)
    chap_start, part_start, first_body = analyse(page_texts)

    print('  hazir: raw2.pdf (bindirmeyi overlay.py yapar)')
