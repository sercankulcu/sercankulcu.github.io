# -*- coding: utf-8 -*-
"""courses-pdfs icin Google Scholar acilis sayfalari ve site haritasi uretir.

    python tools/make_pdf_pages.py

Her kitap, makale ve tez icin _pages/scholar/ altina sitenin without-sidebar duzeninde bir
sayfa yazar: kitaplar /books/<pdf-adi>/, makaleler /publications/<pdf-adi>/, tez
/publications/2022-phd-thesis/. citation_* etiketleri on bilgideki scholar_meta listesinden
_includes/head/custom.html ile <head>'e girer; JSON-LD (Book, ScholarlyArticle, Thesis) on
bilgideki json_ld'den ayni yolla girer. og:image icin 1200x630 bir paylasim karti (kitaplarda dersin gorseli,
makale ve tezde PDF'in ilk sayfasi) courses-pdfs/covers/ altina JPEG olarak yazilir (ders sayfalari da kitabin kapagini og_image olarak kullanir). Sayfada baslik,
yazarlar, tarih, ozet ve PDF baglantisi vardir. Makale ve tez PDF'lerinin baslik,
yazar ve konu bilgisini de doldurur. Son olarak courses-pdfs/sitemap.xml'i butun
PDF'lerle yeniden yazar (sitenin robots.txt dosyasi onu gosterir).

make_book.py ve make_slide_pdf.py is bitince bunu kendiliginden calistirir.
Kitaplarin baslik, konu ve sayfa sayisi PDF'in kendisinden okunur.
"""
import glob, html, json, os, re, sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
PDF_REPO = os.path.join(os.path.dirname(REPO), 'courses-pdfs')
SITE = 'https://sercankulcu.github.io'
BASE = SITE + '/courses-pdfs/'
OUT_DIR = os.path.join(REPO, '_pages', 'scholar')
ME = ('Sercan', 'Külcü')
YEAR_BOOKS = '2026'
COVER_DIR = 'covers'      # courses-pdfs/covers/<pdf-adi>.jpg: 1200x630 paylasim karti (og:image, JSON-LD image)
CARDS = []                # build() sirasinda toplanir, render_cards() hepsini tek tarayici oturumunda cizer
PERSON = {'@type': 'Person', 'name': 'Sercan Külcü', 'url': SITE + '/',
          'affiliation': {'@type': 'CollegeOrUniversity', 'name': 'Giresun University'}}

# kitap PDF'i -> (dil, ders sayfasi)
BOOKS = [
    ('agt/Algoritmik-Oyun-Kurami.pdf', 'tr', '/teaching/algorithmic-game-theory/'),
    ('algorithms/Algoritmalar.pdf', 'tr', '/teaching/algorithms/'),
    ('advanced_algorithms/Ileri-Algoritmalar.pdf', 'tr', '/teaching/advanced-algorithms/'),
    ('computer/Bilgisayar-ve-Programlamaya-Giris.pdf', 'tr', '/teaching/computer-and-introduction-to-programming/'),
    ('data_structures/Veri-Yapilari.pdf', 'tr', '/teaching/data-structures/?lang=tr'),
    ('data_structures/Data-Structures.pdf', 'en', '/teaching/data-structures/?lang=en'),
    ('dsa_c/C-ile-Veri-Yapilari-ve-Algoritmalar.pdf', 'tr', '/teaching/data-structures-and-algorithms-with-c/'),
    ('java/Java-ile-Nesne-Yonelimli-Programlama.pdf', 'tr', '/teaching/object-oriented-programming-with-java/'),
    ('microprocessors/Mikroislemciler.pdf', 'tr', '/teaching/microprocessors/'),
    ('os/Isletim-Sistemleri.pdf', 'tr', '/teaching/operating-systems/'),
    ('c/Programming-with-C.pdf', 'en', '/teaching/programming-with-c/'),
]

# kitap PDF'i -> (ders sayfasindaki gorsel, kartin vurgu rengi)
ART = {
    'agt/Algoritmik-Oyun-Kurami.pdf': ('teaching-algorithmic-game-theory.webp', '#7048c8'),
    'algorithms/Algoritmalar.pdf': ('teaching-algorithms.webp', '#3b5bdb'),
    'advanced_algorithms/Ileri-Algoritmalar.pdf': ('teaching-advanced-algorithms.webp', '#7048c8'),
    'computer/Bilgisayar-ve-Programlamaya-Giris.pdf': ('teaching-computer-and-programming.webp', '#3b5bdb'),
    'data_structures/Veri-Yapilari.pdf': ('teaching-data-structures.webp', '#2f9e6e'),
    'data_structures/Data-Structures.pdf': ('teaching-data-structures.webp', '#2f9e6e'),
    'dsa_c/C-ile-Veri-Yapilari-ve-Algoritmalar.pdf': ('teaching-dsa-c.webp', '#2f9e6e'),
    'java/Java-ile-Nesne-Yonelimli-Programlama.pdf': ('teaching-object-oriented-programming.webp', '#d9483b'),
    'microprocessors/Mikroislemciler.pdf': ('teaching-microprocessors.webp', '#2f9e6e'),
    'os/Isletim-Sistemleri.pdf': ('teaching-operating-systems.webp', '#3b5bdb'),
    'c/Programming-with-C.pdf': ('teaching-procedural-programming-c.webp', '#d9483b'),
}

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
    authors=[ME], date='2022/09', permalink='/publications/2022-phd-thesis/',
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
.sch-kind { margin: 0 0 .3em; color: var(--global-text-color-light); font-size: .8em; text-transform: uppercase; letter-spacing: .06em; }
.sch h1 { margin: 0 0 .4em; }
.sch-sub { margin: -.2em 0 .8em; color: var(--global-text-color-light); font-style: italic; }
.sch-authors { margin: 0 0 .2em; font-size: 1.1em; }
.sch-meta { margin: 0 0 1.2em; color: var(--global-text-color-light); font-size: .9em; }
.sch-links { display: flex; flex-wrap: wrap; gap: .6em 1.2em; align-items: center; margin: 0 0 1.6em; }
.sch-btn { display: inline-block; padding: .5em 1.1em; border: 1px solid var(--global-link-color); border-radius: 6px; font-weight: 600; text-decoration: none; }
.sch-cite { padding: .7em .9em; border-left: 3px solid var(--global-border-color); color: var(--global-text-color-light); font-size: .9em; }
@media (min-width: 640px) { .sch-abstract { text-align: justify; hyphens: auto; } }
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


def cover(rel, card):
    """Paylasim kartini siraya koyar (render_cards cizer) ve adresini dondurur.
    card: kicker, title, lines (alt satirlar), accent, art (ders gorseli) ya da yoksa PDF'in ilk sayfasi."""
    CARDS.append((rel, card))
    return BASE + COVER_DIR + '/' + slug(rel) + '.jpg'


CARD_HTML = """<!doctype html><html lang="%(lang)s"><head><meta charset="utf-8"><style>
html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
body { display: flex; background: #fbfaf7; font-family: 'Segoe UI', 'Open Sans', Arial, sans-serif; color: #1d1d1f; }
.txt { position: relative; width: 640px; box-sizing: border-box; padding: 70px 40px 64px 76px; display: flex; flex-direction: column; }
.bar { width: 72px; height: 8px; border-radius: 4px; background: %(accent)s; margin-bottom: 26px; }
.kick { font-size: 22px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: %(accent)s; }
h1 { font-family: Georgia, 'Times New Roman', serif; font-weight: 700; font-size: %(size)dpx; line-height: 1.08; margin: 18px 0 0; letter-spacing: -.01em; }
.lines { margin-top: auto; }
.l1 { font-size: %(l1size)dpx; font-weight: 600; }
.l2 { font-size: 23px; color: #6e6e73; margin-top: 6px; }
.site { margin-top: 22px; font-size: 21px; color: #8e8e93; letter-spacing: .02em; }
.art { flex: 1; position: relative; overflow: hidden; background: %(artbg)s; }
.art img.ill { position: absolute; left: 50%%; top: 50%%; width: 100%%; transform: translate(-50%%, -50%%); }
.art img.pg { position: absolute; left: 50%%; top: 50%%; height: 520px; transform: translate(-50%%, -50%%) rotate(3deg);
  box-shadow: 0 18px 40px rgba(0,0,0,.25); border-radius: 3px; background: #fff; }
.foot { position: absolute; left: 0; right: 0; bottom: 0; height: 12px; background: %(accent)s; }
</style></head><body>
<div class="txt"><div class="bar"></div><div class="kick">%(kicker)s</div><h1>%(title)s</h1>
<div class="lines"><div class="l1">%(l1)s</div><div class="l2">%(l2)s</div><div class="site">sercankulcu.github.io</div></div></div>
<div class="art">%(img)s</div><div class="foot"></div>
</body></html>"""


def card_html(rel, c):
    import pathlib, pymupdf
    if c.get('art'):
        img = '<img class="ill" src="%s">' % pathlib.Path(REPO, 'images', 'teaching', c['art']).as_uri()
        artbg = '#ffffff'
    else:
        d = pymupdf.open(os.path.join(PDF_REPO, rel))
        png = os.path.join(os.environ.get('TEMP', '/tmp'), 'card-page-%s.png' % slug(rel))
        d[0].get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5)).save(png)
        d.close()
        img = '<img class="pg" src="%s">' % pathlib.Path(png).as_uri()
        artbg = c['accent'] + '1f'
    n = len(c['title'])
    size = 76 if n <= 16 else 64 if n <= 28 else 54 if n <= 45 else 44 if n <= 80 else 34
    longest = max(len(w) for w in c['title'].split())
    size = min(size, int(524 / (0.64 * longest)))
    return CARD_HTML % dict(lang=c.get('lang', 'tr'), l1size=30 if len(c['lines'][0]) <= 30 else 24, accent=c['accent'], artbg=artbg, kicker=e(c['kicker']), title=e(c['title']),
                            size=size, l1=e(c['lines'][0]), l2=e(c['lines'][1]), img=img)


def render_cards():
    """Siradaki kartlari 1200x630 JPEG olarak courses-pdfs/covers/ altina yazar; ayni cikan dosyaya dokunmaz."""
    if not CARDS:
        return
    import pathlib
    sys.path.insert(0, HERE)
    import make_slide_pdf
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        br = make_slide_pdf.launch(p)
        pg = br.new_page(viewport={'width': 1200, 'height': 630})
        for rel, c in CARDS:
            tmp = os.path.join(os.environ.get('TEMP', '/tmp'), 'og-card.html')
            with open(tmp, 'w', encoding='utf-8') as f:
                f.write(card_html(rel, c))
            pg.goto(pathlib.Path(tmp).as_uri(), wait_until='load')
            data = pg.screenshot(type='jpeg', quality=88)
            out = os.path.join(PDF_REPO, COVER_DIR, slug(rel) + '.jpg')
            old = open(out, 'rb').read() if os.path.exists(out) else None
            if old != data:
                os.makedirs(os.path.dirname(out), exist_ok=True)
                with open(out, 'wb') as f:
                    f.write(data)
                print('yazildi', COVER_DIR + '/' + slug(rel) + '.jpg')
        br.close()
    del CARDS[:]


def ld(obj):
    """JSON-LD nesnesi: on bilgide json_ld olarak durur, _includes/head/custom.html <head>'e yazar."""
    return dict({'@context': 'https://schema.org'}, **obj)


def pdf_media(rel):
    return {'@type': 'MediaObject', 'contentUrl': BASE + rel, 'encodingFormat': 'application/pdf'}


def page(lang, title, kind, meta_tags, body, rel_pdf, year, permalink, json_ld=None, og_type='article', card=None):
    """Sitenin without-sidebar duzeninde bir Jekyll sayfasi. citation_* etiketleri on bilgideki
    scholar_meta listesinden, JSON-LD json_ld'den _includes/head/custom.html ile <head>'e yazilir;
    og_image (PDF'in ilk sayfasi) ve og_type _includes/seo.html'de okunur."""
    t = L[lang]
    tags = [(k, v) for k, v in meta_tags if k != 'description']
    fm = ['---', 'layout: without-sidebar', 'author_profile: false',
          'title: ' + json.dumps(title, ensure_ascii=False),
          'description: ' + json.dumps(dict(meta_tags).get('description', title), ensure_ascii=False),
          'permalink: ' + permalink, 'lang: ' + lang,
          'og_image: ' + cover(rel_pdf, card), 'og_type: ' + og_type]
    if json_ld:
        fm.append('json_ld: ' + json.dumps(json.dumps(ld(json_ld), ensure_ascii=False), ensure_ascii=False))
    fm.append('scholar_meta:')
    fm += ['  - [%s, %s]' % (k, json.dumps(v, ensure_ascii=False)) for k, v in tags]
    fm += ['---', '']
    html_body = """<style>%(css)s</style>
<div class="sch">
<p class="sch-kind">%(kind)s</p>
%(body)s
<p class="sch-meta" style="margin-top:2.4em">%(rights)s</p>
</div>
""" % dict(css=CSS.strip(), kind=e(kind), body=body, rights=e(t['rights'] % year))
    out = '\n'.join(fm) + html_body
    assert '{{' not in out and '{%' not in out
    return out


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
            ('DC.type', 'Text.Book')]
    body = """<h1>%s</h1>
<p class="sch-authors">%s</p>
<p class="sch-meta">%s &middot; %s</p>
<div class="sch-links"><a class="sch-btn" href="%s">%s</a> <a href="%s%s">%s</a></div>
%s
%s""" % (e(title), e(full(ME)), YEAR_BOOKS, e(t['pages'] % n), e(BASE + rel), e(t['pdf']),
         SITE, e(course), e(t['course']),
         '<h2>%s</h2>\n<p>%s</p>' % (e(t['about']), e(desc[:1].upper() + desc[1:] + '.')) if desc else '',
         '<p class="sch-meta">%s: %s</p>' % (e(t['keywords']), e(kw)) if kw else '')
    url = '/books/%s/' % slug(rel)
    book = {'@type': 'Book', 'name': title, 'author': PERSON, 'datePublished': YEAR_BOOKS,
            'inLanguage': lang, 'numberOfPages': n, 'bookFormat': 'https://schema.org/EBook',
            'learningResourceType': 'Textbook', 'isAccessibleForFree': True,
            'url': SITE + url, 'image': BASE + COVER_DIR + '/' + slug(rel) + '.jpg',
            'description': desc[:1].upper() + desc[1:] if desc else title,
            'keywords': kw, 'encoding': pdf_media(rel)}
    art, accent = ART.get(rel, (None, '#34508f'))
    card = dict(kicker=t['book'], title=title, accent=accent, art=art, lang=lang,
                lines=(full(ME), '%s · %s' % (t['pages'] % n, 'Ücretsiz PDF' if lang == 'tr' else 'Free PDF')))
    return page(lang, title, t['book'], tags, body, rel, YEAR_BOOKS, url, book, 'book', card)


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
<p class="sch-authors">%s</p>
<p class="sch-meta">%s, pp. %d&ndash;%d &middot; %s &middot; ISBN %s</p>
<div class="sch-links"><a class="sch-btn" href="%s">%s</a></div>
<h2>%s</h2>
<p class="sch-abstract">%s</p>
<p class="sch-meta">%s: %s</p>
<h2>%s</h2>
<p class="sch-cite">%s</p>""" % (e(p['title']), e(authors), e(p['book']), p['pages'][0], p['pages'][1],
                             e(p['publisher']), e(p['isbn']), e(BASE + p['pdf']), e(t['pdf']),
                             e(t['abstract']), e(abstract), e(t['keywords']), e(kw), e(t['cite']), cite)
    url = '/publications/%s/' % slug(p['pdf'])
    art = {'@type': 'ScholarlyArticle', 'headline': p['title'], 'name': p['title'],
           'author': [PERSON if a == ME else {'@type': 'Person', 'name': full(a)} for a in p['authors']],
           'datePublished': p['date'], 'inLanguage': p['lang'], 'abstract': abstract, 'keywords': kw,
           'pageStart': str(p['pages'][0]), 'pageEnd': str(p['pages'][1]),
           'isPartOf': {'@type': 'Book', 'name': p['book'], 'isbn': p['isbn'],
                        'publisher': {'@type': 'Organization', 'name': p['publisher']}},
           'url': SITE + url, 'image': BASE + COVER_DIR + '/' + slug(p['pdf']) + '.jpg',
           'encoding': pdf_media(p['pdf'])}
    card = dict(kicker='Conference paper', title=p['title'], accent='#b5651d', art=None, lang='en',
                lines=(', '.join(full(a) for a in p['authors']), '%s · pp. %d–%d' % (p['date'][:4], p['pages'][0], p['pages'][1])))
    return page(p['lang'], p['title'], 'Conference paper', tags, body, p['pdf'], p['date'][:4], url, art, card=card)


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
<p class="sch-sub" lang="en">%s</p>
<p class="sch-authors">%s</p>
<p class="sch-meta">%s &middot; Danışman: %s &middot; Eylül 2022 &middot; %d sayfa</p>
<div class="sch-links"><a class="sch-btn" href="%s">PDF'i indir</a></div>
<h2>Özet</h2>
<p class="sch-abstract">%s</p>
<p class="sch-meta">Anahtar kelimeler: %s</p>
<div lang="en">
<h2>Summary</h2>
<p class="sch-abstract">%s</p>
<p class="sch-meta">Keywords: %s</p>
</div>
<h2>Atıf</h2>
<p class="sch-cite">Külcü, S. (2022). <em>%s</em> [Doktora tezi, %s].</p>""" % (
        e(p['title']), e(p['title_en']), e(full(ME)), e(p['institution']),
        e(p['supervisor']), m['pages'], e(BASE + p['pdf']), e(ozet), e(kw_tr), e(summary),
        e(kw_en), e(p['title']), e(p['institution']))
    th = {'@type': 'Thesis', 'name': p['title'], 'alternateName': p['title_en'], 'author': PERSON,
          'datePublished': p['date'].replace('/', '-'), 'inLanguage': 'tr', 'inSupportOf': 'PhD',
          'abstract': ozet, 'keywords': kw_tr,
          'sourceOrganization': {'@type': 'CollegeOrUniversity', 'name': p['institution']},
          'url': SITE + p['permalink'], 'image': BASE + COVER_DIR + '/' + slug(p['pdf']) + '.jpg',
          'encoding': pdf_media(p['pdf'])}
    card = dict(kicker='Doktora tezi', title=p['title'], accent='#1f5f8b', art=None,
                lines=(full(ME), '%s · 2022' % p['institution']))
    return page('tr', p['title'], 'Doktora tezi', tags, body, p['pdf'], '2022', p['permalink'], th, card=card)


def slug(rel):
    return os.path.basename(rel)[:-4].lower()


def write(name, content):
    out = os.path.join(OUT_DIR, name + '.html')
    old = open(out, encoding='utf-8').read() if os.path.exists(out) else None
    if old != content:
        os.makedirs(OUT_DIR, exist_ok=True)
        with open(out, 'w', encoding='utf-8', newline='\n') as f:
            f.write(content)
        print('yazildi', os.path.relpath(out, REPO))


def write_sitemap():
    urls = []
    for f in sorted(glob.glob(os.path.join(PDF_REPO, '**', '*.*'), recursive=True)):
        rel = os.path.relpath(f, PDF_REPO).replace(os.sep, '/')
        if rel.startswith('.') or not rel.endswith('.pdf'):
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
            write('book-' + slug(rel), book_page(rel, lang, course))
    for p in PAPERS:
        write('paper-' + slug(p['pdf']), paper_page(p))
    write('thesis-2022', thesis_page(THESIS))
    render_cards()
    write_sitemap()


if __name__ == '__main__':
    build()
