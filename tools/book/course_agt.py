# -*- coding: utf-8 -*-
"""Algoritmik Oyun Kurami kitabi: 15 ders notu (Bolum 0-14) + terim sozlugu eki.

Kisimlar ve bolum sirasi ders sayfasindan (_teaching/algorithmic-game-theory.md)
okunur; kitap o sayfayla ayni sirada kalir. Bolum govdesi notun kendisidir ve
notlar.css ile basilir; book_agt.css yalnizca kitap duzenini ekler.
"""
import glob, html, io, os, re

from common import SITE, strip_tags
from hyphenate_tr import hyphenate_html

TITLE = 'Algoritmik Oyun Kuramı'
LANG = 'tr'
OUTPUT = 'agt/Algoritmik-Oyun-Kurami.pdf'       # courses-pdfs/ altinda
AGT = os.path.join(SITE, 'files', 'agt')
NOTES = os.path.join(AGT, 'notlar')
COURSE_PAGE = os.path.join(SITE, '_teaching', 'algorithmic-game-theory.md')
SITE_URL = 'https://sercankulcu.github.io'
CSS_FILES = ['book-front.css',
             os.path.join(NOTES, 'notlar.css'),
             os.path.join(AGT, 'slides', 'deck', 'kaydirici.css'),
             'book_agt.css']
FONT = [r'C:\Windows\Fonts\segoeui.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/Library/Fonts/Arial Unicode.ttf']
META = {'/Author': 'Sercan Külcü',
        '/Subject': 'Algoritmik Oyun Kuramı ders kitabı: oyunlar, denge, mekanizma tasarımı, '
                    'açık artırmalar, oylama, ağlar, öğrenme',
        '/Keywords': 'oyun kuramı, algoritmik oyun kuramı, Nash dengesi, mekanizma tasarımı, '
                     'açık artırma, ders kitabı'}
LABELS = {'chapter': 'Bölüm', 'chapters': 'Bölüm', 'part': 'Kısım',
          'title_page': 'Kapak', 'preface': 'Önsöz', 'contents': 'İçindekiler',
          'appendices': 'Ekler'}
TOC_SECTIONS = True
BOOKMARK_SECTIONS = True

ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos',
          'Eylül', 'Ekim', 'Kasım', 'Aralık']


def part_number(k):
    return ROMAN[k]


def toc_part(p):
    return 'Kısım %s · %s' % (ROMAN[p['num']], p['name'])


def date_text(d):
    return '%d %s %d' % (d.day, MONTHS[d.month - 1], d.year)


# ---------------------------------------------------------------- ders sayfasi
def course_outline():
    """[(kisim no, kisim adi, [(bolum no, bolum adi), ...])] ders sayfasindaki sirayla."""
    parts = []
    for line in io.open(COURSE_PAGE, encoding='utf-8'):
        m = re.match(r'##\s+Kısım\s+([IVX]+):\s*(.+?)\s*$', line)
        if m:
            parts.append((ROMAN.index(m.group(1)), m.group(2), []))
            continue
        m = re.match(r'###\s+Bölüm\s+(\d+):\s*(.+?)\s*$', line)
        if m and parts:
            parts[-1][2].append((int(m.group(1)), m.group(2)))
    return parts


# ---------------------------------------------------------------- bolumler
DS_GUARD_RE = re.compile(r'<!-- ds-guard:begin -->.*?<!-- ds-guard:end -->\n*', re.S)


def note_file(n):
    f = glob.glob(os.path.join(NOTES, 'Bolum_%02d_*_Ders_Notu.html' % n))
    if len(f) != 1:
        raise SystemExit('Bolum %d icin tek not bekleniyordu: %r' % (n, f))
    return f[0]


NOTE_NUM = {}            # not dosya adi -> bolum no (notlar arasi baglar icin)


def _link(href, n):
    """Notun icindeki bir bagi kitapta gecerli hale getirir."""
    if href.startswith('#'):
        return '#c%d-%s' % (n, href[1:])
    if re.match(r'(https?:|mailto:)', href):
        return href
    path, _, frag = href.partition('#')
    base = os.path.basename(path)
    if base == 'sozluk.html':
        return '#ek-sozluk'
    if base in NOTE_NUM:
        k = NOTE_NUM[base]
        return '#c%d-%s' % (k, frag) if frag else '#ch%d' % k
    # sunumlar, oyunlar, on bilgiler: sitedeki adres
    absp = os.path.normpath(os.path.join('/files/agt/notlar', path)).replace('\\', '/')
    return SITE_URL + absp + ('#' + frag if frag else '')


def _transform(src, n, part_num, title):
    b = src.split('---', 2)[-1]
    # ds-guard yalnizca izinli adreste gosterir; kitap file:/// uzerinden basilir.
    b = DS_GUARD_RE.sub('', b)
    b = re.sub(r'<link[^>]*>\s*', '', b)
    b = re.sub(r'<script.*?</script>\s*', '', b, flags=re.S)
    b = b.strip()
    b = re.sub(r'^<article class="ds-notes" id="ds-notes" lang="tr">|</article>$', '', b).strip()
    # web'e ozgu parcalar: bag seridi, bolum ici icindekiler, alt bilgi
    b = re.sub(r'\s*<ul class="nt-links".*?</ul>', '', b, count=1, flags=re.S)
    b = re.sub(r'<nav class="nt-toc".*?</nav>\s*', '', b, count=1, flags=re.S)
    b = re.sub(r'<p class="nt-foot">.*?</p>\s*', '', b, flags=re.S)
    # baslik: ust satir "Kisim I · Bolum 3", h1 yalnizca ad
    b = re.sub(r'<p class="nt-kicker">.*?</p>',
               '<p class="nt-kicker">Kısım %s · Bölüm %d</p>' % (ROMAN[part_num], n), b, count=1, flags=re.S)
    b = re.sub(r'<h1>.*?</h1>', '<h1>%s</h1>' % html.escape(title), b, count=1, flags=re.S)
    # kitapta cevaplar acik
    b = re.sub(r'<details>', '<details open>', b)
    # kimlikler bolume ozgu olsun: ayni id (ciktilar, sekil-..., SVG marker'lari)
    # birden cok notta geciyor; tek belgede cakisirlarsa bag ve ok uclari sasar
    b = re.sub(r'\bid="([^"]+)"', lambda m: 'id="c%d-%s"' % (n, m.group(1)), b)
    b = re.sub(r'url\(#([^)]+)\)', lambda m: 'url(#c%d-%s)' % (n, m.group(1)), b)
    b = re.sub(r'\b((?:xlink:)?href)="([^"]*)"', lambda m: '%s="%s"' % (m.group(1), _link(m.group(2), n)), b)
    b = re.sub(r'\baria-labelledby="([^"]+)"', lambda m: 'aria-labelledby="c%d-%s"' % (n, m.group(1)), b)
    b = hyphenate_html(b)
    secs = [{'id': 'c%d-%s' % (n, m.group(1)), 'num': m.group(2),
             'title': strip_tags(m.group(3)).replace('\u00ad', '')}
            for m in re.finditer(r'<h2 [^>]*id="c\d+-([^"]+)"[^>]*><span class="nt-num">([^<]+)</span>(.*?)</h2>', b, re.S)]
    page = ('<section class="bk-chapter" id="ch%d">\n<article class="ds-notes" lang="tr">\n%s\n'
            '</article>\n</section>' % (n, b))
    return page, secs


# ---------------------------------------------------------------- sozluk eki
def glossary():
    s = io.open(os.path.join(AGT, 'sozluk.html'), encoding='utf-8').read()
    rows = re.findall(r'<tr data-ch="(\d+)"><td lang="en">(.*?)</td><td>(.*?)</td>', s)
    groups, cur = [], None
    for ch, en, tr in rows:
        letter = strip_tags(en)[:1].upper()
        letter = letter if letter.isalpha() else '#'
        if letter != cur:
            groups.append((letter, []))
            cur = letter
        groups[-1][1].append((int(ch), en, tr))
    out = ['<section class="bk-chapter bk-appendix" id="ek-sozluk">',
           '<article class="ds-notes" lang="tr">',
           '<header class="nt-head"><p class="nt-kicker">Ek A</p><h1>Terim Sözlüğü</h1>',
           '<p class="nt-lead">%s</p></header>' % hyphenate_html(
               'Kitapta geçen İngilizce terimler ve her biri için kullanılan tek Türkçe karşılık. '
               'Sağdaki sayı, terimin ayrıntılı anlatıldığı bölümdür. Sözlüğün aranabilir '
               'hâli ders sayfasındadır.'),
           '<div class="bk-gloss">']
    for letter, items in groups:
        out.append('<h3 class="bk-gloss-l">%s</h3>' % letter)
        for ch, en, tr in items:
            out.append('<p class="bk-g"><span lang="en">%s</span> &rarr; %s'
                       ' <span class="bk-gloss-ch">%d</span></p>' % (en, tr, ch))
    out.append('</div></article></section>')
    return '\n'.join(out), len(rows)


# ---------------------------------------------------------------- on kisim
FRONT = '''
<section class="bk-title">
  <p class="bk-kicker">Ders kitabı</p>
  <h1>Algoritmik Oyun Kuramı</h1>
  <p class="bk-sub">Oyunlar, denge, mekanizmalar ve hesaplama</p>
  <p class="bk-author">Sercan K&uuml;lc&uuml;</p>
  <p class="bk-aff">Giresun Üniversitesi &middot; Bilgisayar Mühendisliği Bölümü</p>
</section>

<section class="bk-colophon">
  <p>Algoritmik Oyun Kuramı</p>
  <p>Sercan K&uuml;lc&uuml;<br>Giresun Üniversitesi, Bilgisayar Mühendisliği Bölümü<br>Giresun, Türkiye</p>
  <p>Bu kitap, şu adreste yayımlanan ders notlarının basılı hâlidir:<br>
     <span class="u">sercankulcu.github.io/teaching/algorithmic-game-theory/</span></p>
  <p>Sunumlar, çalışma soruları, canlı sınıf oyunları ve notlardaki etkileşimli şekillerin
     çalışan hâlleri o sayfadadır. Kitaptaki etkileşimli şekiller varsayılan değerleriyle
     basılmıştır.</p>
  <p>&copy; Sercan K&uuml;lc&uuml;. Tüm hakları saklıdır.</p>
  <p class="bk-ver">Notların __DATE__ tarihli hâlinden üretilmiştir.</p>
</section>

<section class="bk-preface">
  <h1>Önsöz</h1>
  __PREFACE__
  <p class="bk-sig">Sercan K&uuml;lc&uuml;<br>Giresun</p>
</section>

<section class="bk-toc">
  <h1>İçindekiler</h1>
  <ul>__TOC__</ul>
</section>
'''

# Taslak: icerik ders sayfasindaki kisim duzeninden ve notlarin ortak yapisindan
# turetildi. Yazar gozden gecirmeli.
PREFACE = '''
<p>Algoritmik oyun kuramı, kendi çıkarını gözeten tarafların etkileşimini hesaplama
gözüyle inceler: oyun kuramının modellerini algoritmalar ve karmaşıklık çözümlemesiyle
birleştirir. Bu kitap, Giresun Üniversitesi Bilgisayar Mühendisliği Bölümü'nde verilen
Algoritmik Oyun Kuramı dersinin notlarından oluşur ve bölümleri dersteki sırayla izler.</p>

<p>Kitap beş kısımdır. __PARTS__ Bölüm 0, derste gerçekten kullanılan matematiği oyun
örnekleri üzerinden yeniden kurar; bu konulara hâkim okur doğrudan Bölüm 1'den
başlayabilir.</p>

<p>Her bölüm aynı düzeni izler. Başta öğrenme çıktıları yer alır. Biçimsel tanımlar,
teoremler ve çözülmüş örnekler adlandırılmış kutulardadır. <em>Sık yapılan hata</em>
kutuları, öğrencilerin en sık düştüğü yanılgıları gösterir. Kod izlemeleri, hesapların
kısa Python fonksiyonlarıyla nasıl yapıldığını adım adım gösterir. Bölüm; bir özet, bir
kavram listesi, cevaplarıyla birlikte <em>Kendini Dene</em> soruları, ileri okuma önerileri
ve kaynakçayla kapanır. Kitabın sonundaki terim sözlüğü, her İngilizce terim için notlarda
kullanılan tek Türkçe karşılığı verir.</p>

<p>Bazı şekiller web sayfasında kaydırıcıyla değiştirilebilen etkileşimli çizimlerdir;
kitapta varsayılan değerleriyle basılmışlardır. Sunumlar, çalışma soruları ve sınıfta
oynanan oyunlar ders sayfasındadır.</p>
'''


def load():
    for f in glob.glob(os.path.join(NOTES, 'Bolum_*_Ders_Notu.html')):
        NOTE_NUM[os.path.basename(f)] = int(re.search(r'Bolum_(\d+)', f).group(1))
    outline = course_outline()
    chapters, parts = [], []
    for k, pname, chs in outline:
        parts.append({'id': 'part%d' % k, 'num': k, 'name': pname, 'sub': '',
                      'chapters': [n for n, _ in chs]})
        for n, _course_title in chs:
            src = io.open(note_file(n), encoding='utf-8').read()
            h1 = strip_tags(re.search(r'<h1>(.+?)</h1>', src, re.S).group(1))
            title = re.sub(r'^Bölüm\s+\d+:\s*', '', h1)
            page, secs = _transform(src, n, k, title)
            chapters.append({'id': 'ch%d' % n, 'num': n, 'title': title,
                             'header': '%d · %s' % (n, title), 'html': page, 'sections': secs})
    gloss, nterms = glossary()
    names = ['<strong>%s</strong> (Bölüm %d&ndash;%d)' % (p['name'], p['chapters'][0], p['chapters'][-1])
             if len(p['chapters']) > 1 else '<strong>%s</strong> (Bölüm %d)' % (p['name'], p['chapters'][0])
             for p in parts]
    preface = PREFACE.replace('__PARTS__', 'Kısımlar sırasıyla şunlardır: ' + ', '.join(names[:-1])
                              + ' ve ' + names[-1] + '.')
    front = FRONT.replace('__PREFACE__', hyphenate_html(preface))
    js = io.open(os.path.join(AGT, 'slides', 'deck', 'kaydirici.js'), encoding='utf-8').read()
    # betik yalnizca site adresinde calisir; kitap file:/// uzerinden basilir
    js = re.sub(r'^\s*if \(\[[^\]]*"sercankulcu\.github\.io"[^\n]*return;\n', '', js, count=1, flags=re.M)
    js = js.replace('</script', '<\\/script')    # yorumdaki etiket betigi erken kapatmasin
    tail = '<script>\n%s\n</script>' % js
    return {'front': front, 'parts': parts, 'chapters': chapters,
            'appendices': [{'id': 'ek-sozluk', 'label': 'Ek A', 'title': 'Terim Sözlüğü',
                            'header': 'Ek A · Terim Sözlüğü', 'html': gloss}],
            'tail': tail, 'outline': outline, 'terms': nterms}
