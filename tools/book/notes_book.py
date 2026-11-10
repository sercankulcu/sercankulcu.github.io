# -*- coding: utf-8 -*-
"""Turkce "ders notu" kalibindaki dersler icin ortak kitap tanimi (AGT, Veri Yapilari).

Bu derslerin notlari ayni kalipta: files/<ders>/notlar/Bolum_NN_*_Ders_Notu.html,
ortak notlar.css, terim sozlugu files/<ders>/sozluk.html, ders sayfasinda
"## Kısım I: ..." / "### Bölüm N: ..." duzeni. Ders modulu yalnizca farklari verir:

    import notes_book
    notes_book.setup(globals(), folder='agt', course_page='algorithmic-game-theory.md', ...)

setup() build.py'nin bekledigi adlari (TITLE, LANG, OUTPUT, CSS_FILES, load, ...)
modulun icine yazar. Kisimlar ve bolum sirasi ders sayfasindan okunur; kitap o
sayfayla ayni sirada kalir.
"""
import glob, html, io, os, re

from common import SITE, strip_tags
from hyphenate_tr import hyphenate_html

SITE_URL = 'https://sercankulcu.github.io'
FONT = [r'C:\Windows\Fonts\segoeui.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/Library/Fonts/Arial Unicode.ttf']
LABELS = {'chapter': 'Bölüm', 'chapters': 'Bölüm', 'part': 'Kısım',
          'title_page': 'Kapak', 'preface': 'Önsöz', 'contents': 'İçindekiler',
          'appendices': 'Ekler'}
ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos',
          'Eylül', 'Ekim', 'Kasım', 'Aralık']
DS_GUARD_RE = re.compile(r'<!-- ds-guard:begin -->.*?<!-- ds-guard:end -->\n*', re.S)
HOST_GUARD_RE = re.compile(r'^\s*if \(\[[^\]]*"sercankulcu\.github\.io"[^\n]*return;\n', re.M)

FRONT = '''
<section class="bk-title">
  <p class="bk-kicker">Ders kitabı</p>
  <h1>__TITLE__</h1>
  __SUBTITLE__
  <p class="bk-author">Sercan K&uuml;lc&uuml;</p>
  <p class="bk-aff">Giresun Üniversitesi &middot; Bilgisayar Mühendisliği Bölümü</p>
</section>

<section class="bk-colophon">
  <p>__TITLE__</p>
  <p>Sercan K&uuml;lc&uuml;<br>Giresun Üniversitesi, Bilgisayar Mühendisliği Bölümü<br>Giresun, Türkiye</p>
  <p>Bu kitap, şu adreste yayımlanan ders notlarının basılı hâlidir:<br>
     <span class="u">__URL__</span></p>
  __COLOPHON__
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


def part_number(k):
    return ROMAN[k]


def toc_part(p):
    return 'Kısım %s · %s' % (ROMAN[p['num']], p['name'])


def date_text(d):
    return '%d %s %d' % (d.day, MONTHS[d.month - 1], d.year)


def parts_sentence(parts):
    """'Kısımlar sırasıyla şunlardır: A (Bölüm 1–4), ... ve E (Bölüm 13–14).'"""
    names = ['<strong>%s</strong> (Bölüm %d&ndash;%d)' % (p['name'], p['chapters'][0], p['chapters'][-1])
             if len(p['chapters']) > 1 else '<strong>%s</strong> (Bölüm %d)' % (p['name'], p['chapters'][0])
             for p in parts]
    return 'Kısımlar sırasıyla şunlardır: ' + ', '.join(names[:-1]) + ' ve ' + names[-1] + '.'


class _Course:
    def __init__(self, folder, course_page, title, subtitle, output, meta, preface,
                 colophon, extra_css=(), scripts=(), code_note=None):
        self.dir = os.path.join(SITE, 'files', folder)
        self.notes = os.path.join(self.dir, 'notlar')
        self.notes_url = '/files/%s/notlar' % folder
        self.course_page = os.path.join(SITE, '_teaching', course_page)
        self.course_url = 'sercankulcu.github.io/teaching/%s/' % course_page[:-3]
        self.title, self.subtitle, self.output = title, subtitle, output
        self.meta, self.preface, self.colophon = meta, preface, colophon
        self.extra_css = [os.path.join(self.dir, p) for p in extra_css]
        self.scripts = [os.path.join(self.dir, p) for p in scripts]
        self.code_note = code_note          # bolum no -> HTML (or. kod deposundaki klasor)
        self.note_num = {}                  # not dosya adi -> bolum no

    # ------------------------------------------------------------ ders sayfasi
    def outline(self):
        """[(kisim no, kisim adi, [(bolum no, bolum adi), ...])] ders sayfasindaki sirayla."""
        parts = []
        for line in io.open(self.course_page, encoding='utf-8'):
            m = re.match(r'##\s+Kısım\s+([IVX]+):\s*(.+?)\s*$', line)
            if m:
                parts.append((ROMAN.index(m.group(1)), m.group(2), []))
                continue
            m = re.match(r'###\s+Bölüm\s+(\d+):\s*(.+?)\s*$', line)
            if m and parts:
                parts[-1][2].append((int(m.group(1)), m.group(2)))
        if not parts:
            raise SystemExit('ders sayfasinda "## Kısım" / "### Bölüm" basligi yok: %s' % self.course_page)
        return parts

    # ------------------------------------------------------------ bolumler
    def note_file(self, n):
        f = glob.glob(os.path.join(self.notes, 'Bolum_%02d_*_Ders_Notu.html' % n))
        if len(f) != 1:
            raise SystemExit('Bolum %d icin tek not bekleniyordu: %r' % (n, f))
        return f[0]

    def link(self, href, n):
        """Notun icindeki bir bagi kitapta gecerli hale getirir."""
        if href.startswith('#'):
            return '#c%d-%s' % (n, href[1:])
        if re.match(r'(https?:|mailto:)', href):
            return href
        path, _, frag = href.partition('#')
        base = os.path.basename(path)
        if base == 'sozluk.html':
            return '#ek-sozluk'
        if base in self.note_num:
            k = self.note_num[base]
            return '#c%d-%s' % (k, frag) if frag else '#ch%d' % k
        # sunumlar, oyunlar, on bilgiler: sitedeki adres
        absp = os.path.normpath(os.path.join(self.notes_url, path)).replace('\\', '/')
        return SITE_URL + absp + ('#' + frag if frag else '')

    def transform(self, src, n, part_num, title):
        b = src.split('---', 2)[-1]
        # ds-guard yalnizca izinli adreste gosterir; kitap file:/// uzerinden basilir.
        b = DS_GUARD_RE.sub('', b)
        b = re.sub(r'<link[^>]*>\s*', '', b)
        b = re.sub(r'<script.*?</script>\s*', '', b, flags=re.S)
        b = b.strip()
        # notun kendi <style> bloklari (bolume ozgu SVG siniflari) kalir; yalniz sarmalayici gider
        b = re.sub(r'<article class="ds-notes" id="ds-notes" lang="tr">', '', b, count=1)
        b = re.sub(r'</article>\s*$', '', b).strip()
        # web'e ozgu parcalar: bag seridi, bolum ici icindekiler, alt bilgi
        b = re.sub(r'\s*<ul class="nt-links".*?</ul>', '', b, count=1, flags=re.S)
        b = re.sub(r'<nav class="nt-toc".*?</nav>\s*', '', b, count=1, flags=re.S)
        b = re.sub(r'<p class="nt-foot">.*?</p>\s*', '', b, flags=re.S)
        # baslik: ust satir "Kisim I · Bolum 3", h1 yalnizca ad
        b = re.sub(r'<p class="nt-kicker">.*?</p>',
                   '<p class="nt-kicker">Kısım %s · Bölüm %d</p>' % (ROMAN[part_num], n), b, count=1, flags=re.S)
        b = re.sub(r'<h1>.*?</h1>', '<h1>%s</h1>' % html.escape(title), b, count=1, flags=re.S)
        if self.code_note:
            b = re.sub(r'(</header>)', r'\1\n<p class="bk-code-note">%s</p>' % self.code_note(n),
                       b, count=1)
        # kitapta cevaplar acik
        b = re.sub(r'<details>', '<details open>', b)
        # kimlikler bolume ozgu olsun: ayni id (ciktilar, sekil-..., SVG marker'lari)
        # birden cok notta geciyor; tek belgede cakisirlarsa bag ve ok uclari sasar
        b = re.sub(r'\bid="([^"]+)"', lambda m: 'id="c%d-%s"' % (n, m.group(1)), b)
        b = re.sub(r'url\(#([^)]+)\)', lambda m: 'url(#c%d-%s)' % (n, m.group(1)), b)
        b = re.sub(r'\b((?:xlink:)?href)="([^"]*)"',
                   lambda m: '%s="%s"' % (m.group(1), self.link(m.group(2), n)), b)
        b = re.sub(r'\baria-labelledby="([^"]+)"', lambda m: 'aria-labelledby="c%d-%s"' % (n, m.group(1)), b)
        b = hyphenate_html(b)
        secs = [{'id': 'c%d-%s' % (n, m.group(1)), 'num': m.group(2),
                 'title': strip_tags(m.group(3)).replace('\u00ad', '')}
                for m in re.finditer(r'<h2 [^>]*id="c\d+-([^"]+)"[^>]*><span class="nt-num">([^<]+)</span>(.*?)</h2>',
                                     b, re.S)]
        page = ('<section class="bk-chapter" id="ch%d">\n<article class="ds-notes" lang="tr">\n%s\n'
                '</article>\n</section>' % (n, b))
        return page, secs

    # ------------------------------------------------------------ sozluk eki
    def glossary(self):
        s = io.open(os.path.join(self.dir, 'sozluk.html'), encoding='utf-8').read()
        rows = re.findall(r'<tr data-ch="(\d+)"><td lang="en">(.*?)</td><td>(.*?)</td>', s)
        groups, cur = [], None
        for ch, en, tr in rows:
            # DS sozlugu bazi terimlere kisa bir baglam notu ekliyor (soz__ctx)
            tr = tr.replace('<span class="soz__ctx">', '<span class="bk-gloss-ctx">')
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

    # ------------------------------------------------------------ butun kitap
    def load(self):
        for f in glob.glob(os.path.join(self.notes, 'Bolum_*_Ders_Notu.html')):
            self.note_num[os.path.basename(f)] = int(re.search(r'Bolum_(\d+)', f).group(1))
        outline = self.outline()
        chapters, parts = [], []
        for k, pname, chs in outline:
            parts.append({'id': 'part%d' % k, 'num': k, 'name': pname, 'sub': '',
                          'chapters': [n for n, _ in chs]})
            for n, _course_title in chs:
                src = io.open(self.note_file(n), encoding='utf-8').read()
                h1 = strip_tags(re.search(r'<h1>(.+?)</h1>', src, re.S).group(1))
                title = re.sub(r'^Bölüm\s+\d+:\s*', '', h1)
                page, secs = self.transform(src, n, k, title)
                chapters.append({'id': 'ch%d' % n, 'num': n, 'title': title,
                                 'header': '%d · %s' % (n, title), 'html': page, 'sections': secs})
        gloss, nterms = self.glossary()
        preface = self.preface.replace('__PARTS__', parts_sentence(parts))
        sub = '<p class="bk-sub">%s</p>' % self.subtitle if self.subtitle else ''
        front = (FRONT.replace('__TITLE__', html.escape(self.title)).replace('__SUBTITLE__', sub)
                 .replace('__URL__', self.course_url).replace('__COLOPHON__', self.colophon)
                 .replace('__PREFACE__', hyphenate_html(preface)))
        tail = []
        for path in self.scripts:
            js = io.open(path, encoding='utf-8').read()
            # betik yalnizca site adresinde calisir; kitap file:/// uzerinden basilir
            js = HOST_GUARD_RE.sub('', js, count=1)
            js = js.replace('</script', '<\\/script')    # yorumdaki etiket betigi erken kapatmasin
            tail.append('<script>\n%s\n</script>' % js)
        return {'front': front, 'parts': parts, 'chapters': chapters,
                'appendices': [{'id': 'ek-sozluk', 'label': 'Ek A', 'title': 'Terim Sözlüğü',
                                'header': 'Ek A · Terim Sözlüğü', 'html': gloss}],
                'tail': '\n'.join(tail), 'outline': outline, 'terms': nterms}


def setup(g, **cfg):
    """Ders modulunun globals()'ina build.py'nin bekledigi adlari yazar."""
    c = _Course(**cfg)
    g.update(TITLE=c.title, LANG='tr', OUTPUT=c.output, FONT=FONT, META=c.meta,
             LABELS=LABELS, TOC_SECTIONS=True, BOOKMARK_SECTIONS=True,
             CSS_FILES=['book-front.css', os.path.join(c.notes, 'notlar.css')] + c.extra_css
                       + ['book_notes.css'],
             part_number=part_number, toc_part=toc_part, date_text=date_text,
             load=c.load, COURSE=c)
