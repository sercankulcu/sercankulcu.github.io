# -*- coding: utf-8 -*-
"""courses-pdfs icin Google Scholar acilis sayfalari ve site haritasi uretir.

    python tools/make_pdf_pages.py

Her kitap, makale ve tez icin PDF'in yanina ayni adla bir HTML sayfasi yazar
(ornegin data_structures/Veri-Yapilari.pdf -> data_structures/Veri-Yapilari.html).
Sayfada Google Scholar'in okudugu citation_* etiketleri (Highwire Press), baslik,
yazarlar, tarih, ozet ve PDF baglantisi vardir. Makale ve tez PDF'lerinin baslik,
yazar ve konu bilgisini de doldurur. Son olarak courses-pdfs/sitemap.xml'i butun
PDF'ler ve bu sayfalarla yeniden yazar (sitenin robots.txt dosyasi onu gosterir).

make_book.py ve make_slide_pdf.py is bitince bunu kendiliginden calistirir.
Kitaplarin baslik, konu ve sayfa sayisi PDF'in kendisinden okunur.
"""
import glob, html, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
PDF_REPO = os.path.join(os.path.dirname(REPO), 'courses-pdfs')
SITE = 'https://sercankulcu.github.io'
BASE = SITE + '/courses-pdfs/'
ME = ('Sercan', 'Külcü')
YEAR_BOOKS = '2026'

# kitap PDF'i -> (dil, ders sayfasi)
BOOKS = [
    ('agt/Algoritmik-Oyun-Kurami.pdf', 'tr', '/teaching/algorithmic-game-theory/'),
    ('algorithms/Algoritmalar.pdf', 'tr', '/teaching/algorithms/'),
    ('computer/Bilgisayar-ve-Programlamaya-Giris.pdf', 'tr', '/teaching/computer-and-introduction-to-programming/'),
    ('data_structures/Veri-Yapilari.pdf', 'tr', '/teaching/data-structures/?lang=tr'),
    ('data_structures/Data-Structures.pdf', 'en', '/teaching/data-structures/?lang=en'),
    ('dsa_c/C-ile-Veri-Yapilari-ve-Algoritmalar.pdf', 'tr', '/teaching/data-structures-and-algorithms-with-c/'),
    ('java/Java-ile-Nesne-Yonelimli-Programlama.pdf', 'tr', '/teaching/object-oriented-programming-with-java/'),
    ('microprocessors/Mikroislemciler.pdf', 'tr', '/teaching/microprocessors/'),
    ('os/Isletim-Sistemleri.pdf', 'tr', '/teaching/operating-systems/'),
    ('c/Programming-with-C.pdf', 'en', '/teaching/programming-with-c/'),
]

HAZEL_AUTHORS = [('Özgür', 'Tomak'), ('Mehmet Cem', 'Dikbaş'), ME]
HAZEL_CONF = ('11th International Azerbaijan Congress on Life, Engineering, Mathematical, '
              'and Applied Sciences')
HAZEL_BOOK = HAZEL_CONF + ', Congress Proceedings Book, Vol. I'

PAPERS = [
    dict(pdf='papers/2025-hazelnut-resnet50-vs-shufflenet.pdf', lang='en',
         title='Comparison of the Performance of ResNet-50 and ShuffleNet Deep Learning Algorithms '
               'in Classification of Hazelnut Fruit',
         authors=HAZEL_AUTHORS, date='2025', conference=HAZEL_CONF, book=HAZEL_BOOK,
         publisher='BZT Turan Publishing House', isbn='978-9952-8573-6-8', pages=(55, 63)),
    dict(pdf='papers/2025-hazelnut-shufflenet-parameter-selection.pdf', lang='en',
         title='Selection of the Most Suitable Parameters for Classification of Hazelnut Fruit '
               'Using ShuffleNet Deep Learning Algorithm',
         authors=HAZEL_AUTHORS, date='2025', conference=HAZEL_CONF, book=HAZEL_BOOK,
         publisher='BZT Turan Publishing House', isbn='978-9952-8573-6-8', pages=(64, 73)),
]

THESIS = dict(
    pdf='presentations/766420.pdf', lang='tr',
    title='IoT Ağlar İçin Akıllı Anten Tabanlı Çizelgeleme '
          'Algoritmalarının İncelenmesi',
    title_en='Analysis of Smart Antenna Based Scheduling Algorithms for IoT Networks',
    authors=[ME], date='2022/09',
    institution='Karadeniz Teknik Üniversitesi',
    institution_en='Karadeniz Technical University',
    degree='Doktora Tezi', supervisor='Doç. Dr. Sedat Görmüş')

L = {
    'tr': dict(pdf='PDF\'i indir', pages='%d sayfa', course='Dersin sayfası', abstract='Özet', about='Hakkında',
               keywords='Anahtar kelimeler', book='Ders kitabı', cite='Atıf',
               rights='© %s Sercan Külcü. Tüm hakları saklıdır.',
               pubs='Yayınlar', home='Ana sayfa'),
    'en': dict(pdf='Download PDF', pages='%d pages', course='Course page', abstract='Abstract', about='About',
               keywords='Keywords', book='Textbook', cite='How to cite',
               rights='© %s Sercan Külcü. All rights reserved.',
               pubs='Publications', home='Home'),
}

CSS = """
:root { --bg: #fff; --fg: #1d1f21; --muted: #5b6168; --line: #dde1e5; --link: #1a5fb4; --btn: #1a5fb4; --btnfg: #fff; }
@media (prefers-color-scheme: dark) {
  :root { --bg: #16181b; --fg: #e6e8ea; --muted: #a2a9b0; --line: #2c3036; --link: #8ab4f8; --btn: #8ab4f8; --btnfg: #111; }
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--fg);
  font: 17px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; }
main { max-width: 760px; margin: 0 auto; padding: 40px 16px 56px; }
a { color: var(--link); }
.kind { margin: 0 0 6px; color: var(--muted); font-size: 14px; text-transform: uppercase; letter-spacing: .06em; }
h1 { margin: 0 0 12px; font-size: 30px; line-height: 1.25; }
.sub { margin: -4px 0 14px; color: var(--muted); font-style: italic; }
.authors { margin: 0 0 4px; font-size: 18px; }
.meta { margin: 0 0 22px; color: var(--muted); font-size: 15px; }
.btn { display: inline-block; padding: 10px 18px; border-radius: 6px; background: var(--btn); color: var(--btnfg);
  font-weight: 600; text-decoration: none; }
.links { display: flex; flex-wrap: wrap; gap: 10px 18px; align-items: center; margin: 0 0 30px; }
h2 { margin: 30px 0 8px; font-size: 19px; }
@media (min-width: 640px) { .abstract { text-align: justify; hyphens: auto; } }
.cite { padding: 12px 14px; border-left: 3px solid var(--line); color: var(--muted); font-size: 15px; }
footer { margin-top: 44px; padding-top: 14px; border-top: 1px solid var(--line); color: var(--muted); font-size: 14px; }
"""


def e(s):
    return html.escape(s, quote=True)


def full(a):
    return '%s %s' % a


def flow(text):
    """PDF'ten alinan metni paragraf yapar: satir sonlari bosluk, tire ile bolunmus kelimeler birlesir."""
    text = re.sub(r'(\w)-\s*\n\s*(\w)', r'\1\2', text)
    return re.sub(r'\s+', ' ', text).strip()


def pdf_info(rel):
    import pymupdf
    d = pymupdf.open(os.path.join(PDF_REPO, rel))
    m = dict(d.metadata)
    m['pages'] = d.page_count
    m['_doc'] = d
    return m


def set_info(rel, title, author, subject, keywords):
    import pymupdf
    path = os.path.join(PDF_REPO, rel)
    d = pymupdf.open(path)
    m = dict(d.metadata)
    want = dict(title=title, author=author, subject=subject, keywords=keywords)
    if all((m.get(k) or '') == v for k, v in want.items()):
        d.close()
        return
    m.update(want)
    d.set_metadata({k: m.get(k) or '' for k in ('title', 'author', 'subject', 'keywords', 'creator',
                                               'producer', 'creationDate', 'modDate')})
    d.saveIncr()
    d.close()


def page(lang, title, kind, meta_tags, body, rel_pdf, year):
    t = L[lang]
    url = BASE + rel_pdf[:-4] + '.html'
    tags = '\n'.join('<meta name="%s" content="%s">' % (k, e(v)) for k, v in meta_tags)
    return """<!doctype html>
<html lang="%(lang)s">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%(title)s</title>
<link rel="canonical" href="%(url)s">
<meta name="description" content="%(desc)s">
%(tags)s
<style>%(css)s</style>
</head>
<body>
<main>
<p class="kind">%(kind)s</p>
%(body)s
<footer>%(rights)s &middot; <a href="%(site)s/">sercankulcu.github.io</a> &middot; <a href="%(site)s/publications/">%(pubs)s</a></footer>
</main>
</body>
</html>
""" % dict(lang=lang, title=e(title), url=e(url), desc=e(dict(meta_tags).get('description', title)),
           tags=tags, css=CSS, kind=e(kind), body=body, rights=e(t['rights'] % year), site=SITE,
           pubs=e(t['pubs']))


def book_page(rel, lang, course):
    t = L[lang]
    m = pdf_info(rel)
    title, subject, kw, n = m['title'], m.get('subject') or '', m.get('keywords') or '', m['pages']
    m['_doc'].close()
    desc = subject.split(':', 1)[1].strip() if ':' in subject else subject
    tags = [('description', subject or title),
            ('citation_title', title), ('citation_author', '%s, %s' % (ME[1], ME[0])),
            ('citation_publication_date', YEAR_BOOKS), ('citation_language', lang),
            ('citation_pdf_url', BASE + rel), ('citation_keywords', kw.replace(',', ';')),
            ('DC.type', 'Text.Book'), ('og:title', title), ('og:type', 'book')]
    body = """<h1>%s</h1>
<p class="authors">%s</p>
<p class="meta">%s &middot; %s</p>
<div class="links"><a class="btn" href="%s">%s</a> <a href="%s%s">%s</a></div>
%s
%s""" % (e(title), e(full(ME)), YEAR_BOOKS, e(t['pages'] % n), e(os.path.basename(rel)), e(t['pdf']),
         SITE, e(course), e(t['course']),
         '<h2>%s</h2>\n<p>%s</p>' % (e(t['about']), e(desc[:1].upper() + desc[1:] + '.')) if desc else '',
         '<p class="meta">%s: %s</p>' % (e(t['keywords']), e(kw)) if kw else '')
    return page(lang, title, t['book'], tags, body, rel, YEAR_BOOKS)


def paper_page(p):
    t = L[p['lang']]
    m = pdf_info(p['pdf'])
    first = m['_doc'][0].get_text()
    m['_doc'].close()
    ab = re.search(r'ABSTRACT\s*(.*?)\s*Keywords?:\s*(.*?)\n\s*\n', first, re.S)
    abstract, kw = flow(ab.group(1)), flow(ab.group(2)).rstrip('.')
    authors = ', '.join(full(a) for a in p['authors'])
    set_info(p['pdf'], p['title'], authors, p['book'], kw)
    tags = [('description', abstract[:300])]
    tags += [('citation_title', p['title'])]
    tags += [('citation_author', '%s, %s' % (a[1], a[0])) for a in p['authors']]
    tags += [('citation_publication_date', p['date']), ('citation_conference_title', p['conference']),
             ('citation_inbook_title', p['book']), ('citation_publisher', p['publisher']),
             ('citation_isbn', p['isbn']), ('citation_firstpage', str(p['pages'][0])),
             ('citation_lastpage', str(p['pages'][1])), ('citation_language', p['lang']),
             ('citation_keywords', kw.replace(',', ';')), ('citation_pdf_url', BASE + p['pdf'])]
    names = ['%s, %s' % (a[1], ' '.join(x[0] + '.' for x in a[0].split())) for a in p['authors']]
    short = ', '.join(names[:-1]) + ', & ' + names[-1] if len(names) > 1 else names[0]
    cite = '%s (%s). %s. In <em>%s</em>, pp. %d&ndash;%d. %s.' % (
        e(short), p['date'][:4], e(p['title']), e(p['book']), p['pages'][0], p['pages'][1], e(p['publisher']))
    body = """<h1>%s</h1>
<p class="authors">%s</p>
<p class="meta">%s, pp. %d&ndash;%d &middot; %s &middot; ISBN %s</p>
<div class="links"><a class="btn" href="%s">%s</a></div>
<h2>%s</h2>
<p class="abstract">%s</p>
<p class="meta">%s: %s</p>
<h2>%s</h2>
<p class="cite">%s</p>""" % (e(p['title']), e(authors), e(p['book']), p['pages'][0], p['pages'][1],
                             e(p['publisher']), e(p['isbn']), e(os.path.basename(p['pdf'])), e(t['pdf']),
                             e(t['abstract']), e(abstract), e(t['keywords']), e(kw), e(t['cite']), cite)
    return page(p['lang'], p['title'], 'Conference paper', tags, body, p['pdf'], p['date'][:4])


def thesis_page(p):
    m = pdf_info(p['pdf'])
    d = m['_doc']
    text = {}
    for i in range(min(30, d.page_count)):
        s = d[i].get_text()
        for head, key, stop in (('ÖZET', 'tr', 'Anahtar Kelimeler'), ('SUMMARY', 'en', 'Key Words')):
            if key not in text and re.search(r'^\s*%s\s*$' % head, s, re.M):
                body = re.split(r'\d{4}, \d+ (?:Sayfa|Pages)\s*', s, maxsplit=1)[-1]
                parts = re.split(r'\s*%s\s*:\s*' % stop, body, maxsplit=1)
                text[key] = (flow(parts[0]), flow(parts[1]).rstrip('.') if len(parts) > 1 else '')
    d.close()
    ozet, kw_tr = text['tr']
    summary, kw_en = text['en']
    set_info(p['pdf'], p['title'], full(ME), '%s, %s' % (p['degree'], p['institution']), kw_tr)
    tags = [('description', ozet[:300]), ('citation_title', p['title']),
            ('citation_author', '%s, %s' % (ME[1], ME[0])), ('citation_publication_date', p['date']),
            ('citation_dissertation_institution', p['institution']), ('citation_language', 'tr'),
            ('citation_keywords', kw_tr.replace(',', ';')), ('citation_pdf_url', BASE + p['pdf'])]
    body = """<h1>%s</h1>
<p class="sub" lang="en">%s</p>
<p class="authors">%s</p>
<p class="meta">%s &middot; Danışman: %s &middot; Eylül 2022 &middot; %d sayfa</p>
<div class="links"><a class="btn" href="%s">PDF'i indir</a></div>
<h2>Özet</h2>
<p class="abstract">%s</p>
<p class="meta">Anahtar kelimeler: %s</p>
<div lang="en">
<h2>Summary</h2>
<p class="abstract">%s</p>
<p class="meta">Keywords: %s</p>
</div>
<h2>Atıf</h2>
<p class="cite">Külcü, S. (2022). <em>%s</em> [Doktora tezi, %s].</p>""" % (
        e(p['title']), e(p['title_en']), e(full(ME)), e(p['institution']),
        e(p['supervisor']), m['pages'], e(os.path.basename(p['pdf'])), e(ozet), e(kw_tr), e(summary),
        e(kw_en), e(p['title']), e(p['institution']))
    return page('tr', p['title'], 'Doktora tezi', tags, body, p['pdf'], '2022')


def write(rel_pdf, content):
    out = os.path.join(PDF_REPO, rel_pdf[:-4] + '.html')
    old = open(out, encoding='utf-8').read() if os.path.exists(out) else None
    if old != content:
        with open(out, 'w', encoding='utf-8', newline='\n') as f:
            f.write(content)
        print('yazildi', os.path.relpath(out, PDF_REPO))


def write_sitemap():
    urls = []
    for f in sorted(glob.glob(os.path.join(PDF_REPO, '**', '*.*'), recursive=True)):
        rel = os.path.relpath(f, PDF_REPO).replace(os.sep, '/')
        if rel.startswith('.') or rel == 'index.html' or not rel.endswith(('.pdf', '.html')):
            continue
        urls.append(BASE + '/'.join(map(lambda s: __import__('urllib.parse').parse.quote(s), rel.split('/'))))
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
           ''.join('  <url><loc>%s</loc></url>\n' % e(u) for u in urls) + '</urlset>\n')
    out = os.path.join(PDF_REPO, 'sitemap.xml')
    old = open(out, encoding='utf-8').read() if os.path.exists(out) else None
    if old != xml:
        with open(out, 'w', encoding='utf-8', newline='\n') as f:
            f.write(xml)
        print('yazildi sitemap.xml (%d adres)' % len(urls))


def build():
    if not os.path.isdir(PDF_REPO):
        print('courses-pdfs bulunamadi, acilis sayfalari atlandi:', PDF_REPO)
        return
    for rel, lang, course in BOOKS:
        if os.path.exists(os.path.join(PDF_REPO, rel)):
            write(rel, book_page(rel, lang, course))
    for p in PAPERS:
        write(p['pdf'], paper_page(p))
    write(THESIS['pdf'], thesis_page(THESIS))
    write_sitemap()


if __name__ == '__main__':
    build()
