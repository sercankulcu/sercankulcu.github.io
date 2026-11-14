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

# Notlarin ortak duzenini anlatan onsoz paragrafi; ders modulleri onsozde kullanir.
STRUCTURE = '''<p>Her bölüm aynı düzeni izler. Başta öğrenme çıktıları yer alır. Biçimsel tanımlar,
teoremler ve çözülmüş örnekler adlandırılmış kutulardadır. <em>Sık yapılan hata</em>
kutuları, öğrencilerin en sık düştüğü yanılgıları gösterir. Kod izlemeleri, bir programın
ya da algoritmanın adım adım nasıl çalıştığını gösterir. Bölüm; bir özet, bir kavram
listesi, cevaplarıyla birlikte <em>Kendini Dene</em> soruları, ileri okuma önerileri ve
kaynakçayla kapanır. Kitabın sonundaki terim sözlüğü, her İngilizce terim için notlarda
kullanılan tek Türkçe karşılığı verir.</p>'''

# Cok notlu bolumleri olan dersler icin onsoz cumlesi
MULTI_NOTE = '''<p>Bazı bölümler birden çok ders notundan oluşur. Bu bölümler kısa bir açılış
sayfasıyla başlar; notlar ardından 4.1, 4.2 gibi numaralı alt bölümler olarak gelir.</p>'''

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


def code_links(course_page):
    """bolum no -> [(etiket, klasor)], ders sayfasindaki GitHub baglantilarindan.

    "[💻Kod Örnekleri (GitHub)](…)" -> "Bu bölümün kodu", "[💻Kod Örnekleri, Java (GitHub)](…)" -> "Kod (Java)",
    "[🧪Laboratuvar Çalışması, C (GitHub)](…)" -> "Laboratuvar"; ötekiler kendi adlarıyla.
    """
    out, cur = {}, None
    for line in io.open(course_page, encoding='utf-8'):
        m = re.match(r'###\s+Bölüm\s+(\d+):', line)
        if m:
            cur = int(m.group(1))
            continue
        m = re.search(r'\[(?:💻|🧪)\s*([^\]]+?) \(GitHub\)\]\(https://(github\.com/[^)\s]+)\)', line)
        if m and cur is not None:
            name = m.group(1)
            lang = re.search(r', (\w+)$', name)
            if name.startswith('Kod Örnekleri'):
                label = 'Kod (%s)' % lang.group(1) if lang else 'Bu bölümün kodu'
            elif name.startswith('Laboratuvar'):
                label = 'Laboratuvar'
            else:
                label = re.sub(r', \w+$', '', name)
            out.setdefault(cur, []).append((label, m.group(2).replace('/tree/main/', '/')))
    return out


def parts_sentence(parts):
    """'Kısımlar sırasıyla şunlardır: A (Bölüm 1–4), ... ve E (Bölüm 13–14).'"""
    names = ['<strong>%s</strong> (Bölüm %d&ndash;%d)' % (p['name'], p['chapters'][0], p['chapters'][-1])
             if len(p['chapters']) > 1 else '<strong>%s</strong> (Bölüm %d)' % (p['name'], p['chapters'][0])
             for p in parts]
    return 'Kısımlar sırasıyla şunlardır: ' + ', '.join(names[:-1]) + ' ve ' + names[-1] + '.'


class _Course:
    def __init__(self, folder, course_page, title, subtitle, output, meta, preface,
                 colophon, extra_css=(), scripts=(), code_note=None, intro=()):
        self.dir = os.path.join(SITE, 'files', folder)
        self.notes = os.path.join(self.dir, 'notlar')
        self.notes_url = '/files/%s/notlar' % folder
        self.course_page = os.path.join(SITE, '_teaching', course_page)
        # kunyedeki adres: ders sayfasinin permalink'i (dosya adi her zaman ayni degil)
        fm = io.open(self.course_page, encoding='utf-8').read().split('---', 2)[1]
        self.course_url = 'sercankulcu.github.io' + re.search(r'^permalink:\s*(\S+)', fm, re.M).group(1)
        self.title, self.subtitle, self.output = title, subtitle, output
        self.meta, self.preface, self.colophon = meta, preface, colophon
        self.extra_css = [os.path.join(self.dir, p) for p in extra_css]
        self.scripts = [os.path.join(self.dir, p) for p in scripts]
        # Kisim I'den once, icindekilerin en ustunde: [(ders klasorundeki dosya, kimlik)]
        self.intro = list(intro)
        if code_note is None:               # varsayilan: ders sayfasindaki GitHub baglantilari
            links = code_links(self.course_page)
            code_note = lambda n: ' &middot; '.join(
                '<strong>%s:</strong> <span class="u">%s</span>' % x for x in links.get(n, []))
        self.code_note = code_note          # bolum no -> HTML (bos ise satir yazilmaz)
        self.note_ids = {}                  # not dosya adi -> (kimlik oneki, notun capasi); load() doldurur

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
    def chapter_info(self):
        """bolum no -> {'notes': [not dosya adi, ...], 'lead': aciklama}, ders sayfasindan.

        Bir bolum birden cok nottan olusabilir (Algoritmalar 4.1-4.4 gibi); notlar ders
        sayfasindaki "Ders Notu" baglantilarinin sirasiyla alinir. Baglanti yoksa
        Bolum_NN_*_Ders_Notu.html aranir.
        """
        info, cur = {}, None
        for line in io.open(self.course_page, encoding='utf-8'):
            m = re.match(r'###\s+Bölüm\s+(\d+):', line)
            if m:
                cur = info.setdefault(int(m.group(1)), {'notes': [], 'lead': ''})
                continue
            if line.startswith('#'):
                cur = None
                continue
            if cur is None:
                continue
            m = re.search(r'/notlar/(Bolum_[^)#\s]+_Ders_Notu\.html)', line)
            if m:
                if m.group(1) not in cur['notes']:
                    cur['notes'].append(m.group(1))
            elif line.strip() and not line.lstrip().startswith(('-', '*', '!', '<')) and not cur['lead']:
                cur['lead'] = line.strip()
        for n, c in info.items():
            if not c['notes']:
                c['notes'] = [os.path.basename(f) for f in
                              sorted(glob.glob(os.path.join(self.notes, 'Bolum_%02d_*_Ders_Notu.html' % n)))]
            for f in c['notes']:
                if not os.path.exists(os.path.join(self.notes, f)):
                    raise SystemExit('ders sayfasindaki not yok: %s' % f)
        return info

    def link(self, href, prefix, base_url=None):
        """Notun icindeki bir bagi kitapta gecerli hale getirir. base_url: goreli baglarin
        cozuldugu site klasoru (varsayilan: notlar klasoru)."""
        if href.startswith('#'):
            return '#%s-%s' % (prefix, href[1:])
        if re.match(r'(https?:|mailto:)', href):
            return href
        path, _, frag = href.partition('#')
        base = os.path.basename(path)
        if base == 'sozluk.html':
            return '#ek-sozluk'
        if base in self.note_ids:
            pre, anchor = self.note_ids[base]
            return '#%s-%s' % (pre, frag) if frag else '#' + anchor
        # sunumlar, oyunlar, on bilgiler: sitedeki adres
        absp = os.path.normpath(os.path.join(base_url or self.notes_url, path)).replace('\\', '/')
        return SITE_URL + absp + ('#' + frag if frag else '')

    def transform(self, src, prefix, kicker, title, wrap_id, wrap_class, code_html):
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
        b = re.sub(r'<p class="nt-kicker">.*?</p>', '<p class="nt-kicker">%s</p>' % kicker,
                   b, count=1, flags=re.S)
        b = re.sub(r'<h1>.*?</h1>', '<h1>%s</h1>' % html.escape(title), b, count=1, flags=re.S)
        if code_html:
            b = re.sub(r'(</header>)', r'\1\n<p class="bk-code-note">%s</p>' % code_html, b, count=1)
        # kitapta cevaplar acik
        b = re.sub(r'<details>', '<details open>', b)
        # kimlikler nota ozgu olsun: ayni id (ciktilar, sekil-..., SVG marker'lari)
        # birden cok notta geciyor; tek belgede cakisirlarsa bag ve ok uclari sasar
        b = re.sub(r'\bid="([^"]+)"', lambda m: 'id="%s-%s"' % (prefix, m.group(1)), b)
        b = re.sub(r'url\(#([^)]+)\)', lambda m: 'url(#%s-%s)' % (prefix, m.group(1)), b)
        b = re.sub(r'\b((?:xlink:)?href)="([^"]*)"',
                   lambda m: '%s="%s"' % (m.group(1), self.link(m.group(2), prefix)), b)
        b = re.sub(r'\baria-labelledby="([^"]+)"',
                   lambda m: 'aria-labelledby="%s-%s"' % (prefix, m.group(1)), b)
        b = hyphenate_html(b)
        secs = [{'id': '%s-%s' % (prefix, m.group(1)), 'num': m.group(2),
                 'title': strip_tags(m.group(3)).replace('­', '')}
                for m in re.finditer(r'<h2 [^>]*id="%s-([^"]+)"[^>]*><span class="nt-num">([^<]+)</span>(.*?)</h2>'
                                     % re.escape(prefix), b, re.S)]
        page = ('<section class="%s" id="%s">\n<article class="ds-notes" lang="tr">\n%s\n'
                '</article>\n</section>' % (wrap_class, wrap_id, b))
        return page, secs

    def chapter(self, n, part_num, course_title, info):
        """Bir bolumun kitap HTML'i: (baslik, HTML, icindekiler satirlari).

        Tek notlu bolum notun kendisidir. Cok notlu bolumde once ders sayfasindaki ad ve
        aciklamayla bir acilis gelir, ardindan her not yeni sayfada bir alt bolum
        (4.1, 4.2 ...) olur; icindekiler ve yer imleri alt bolumleri listeler."""
        code = self.code_note(n) if self.code_note else ''
        notes = info['notes']
        kick = 'Kısım %s · Bölüm %%s' % ROMAN[part_num]
        if len(notes) == 1:
            src = io.open(os.path.join(self.notes, notes[0]), encoding='utf-8').read()
            h1 = strip_tags(re.search(r'<h1>(.+?)</h1>', src, re.S).group(1))
            title = re.sub(r'^Bölüm\s+\d+:\s*', '', h1)
            page, secs = self.transform(src, 'c%d' % n, kick % n, title, 'ch%d' % n, 'bk-chapter', code)
            return title, page, secs
        subs, pages = [], []
        for k, f in enumerate(notes, 1):
            src = io.open(os.path.join(self.notes, f), encoding='utf-8').read()
            h1 = strip_tags(re.search(r'<h1>(.+?)</h1>', src, re.S).group(1))
            m = re.match(r'Bölüm\s+(\d+\.\d+):\s*(.+)$', h1)
            num, title = (m.group(1), m.group(2)) if m else ('%d.%d' % (n, k), h1)
            page, _ = self.transform(src, 'c%dn%d' % (n, k), kick % num, title,
                                     'ch%d-%d' % (n, k), 'bk-chapter bk-note', '')
            subs.append({'id': 'ch%d-%d' % (n, k), 'num': num, 'title': title})
            pages.append(page)
        items = ''.join('<li><span class="bk-subs-n">%s</span> %s</li>' % (s['num'], html.escape(s['title']))
                        for s in subs)
        lead = ('<p class="nt-lead">%s</p>' % hyphenate_html(html.escape(info['lead']))) if info['lead'] else ''
        opener = ('<section class="bk-chapter bk-opener" id="ch%d">\n<article class="ds-notes" lang="tr">\n'
                  '<header class="nt-head"><p class="nt-kicker">%s</p><h1>%s</h1>%s</header>\n%s'
                  '<div class="bk-subs"><p class="bk-subs-t">Bu bölümün notları</p><ol>%s</ol></div>\n'
                  '</article>\n</section>' % (n, kick % n, html.escape(course_title), lead,
                                              ('<p class="bk-code-note">%s</p>\n' % code) if code else '',
                                              items))
        return course_title, opener + '\n' + '\n'.join(pages), subs

    # ------------------------------------------------------------ on bilgiler / onemli isimler eki
    def extra_page(self, fname, uid, label):
        """Dersin "Ön Bilgiler" ya da "Önemli İsimler" sayfasini ek olarak basilir hale getirir.

        Bu sayfalar etkilesimli: arama, suzgec, siralama, "Ayrintilar" dugmesi ve gizli
        ayrintilar. Kitapta dugmeler ve araclar atilir, gizli ayrintilar acilir; sayfanin
        kendi <style> blogu kalir.
        """
        src = io.open(os.path.join(self.dir, fname), encoding='utf-8').read()
        b = src.split('---', 2)[-1]
        b = DS_GUARD_RE.sub('', b)
        b = re.sub(r'<link[^>]*>\s*', '', b)
        b = re.sub(r'<script.*?</script>\s*', '', b, flags=re.S)
        b = re.sub(r'<button\b.*?</button>', '', b, flags=re.S)
        b = re.sub(r'<select\b.*?</select>', '', b, flags=re.S)
        b = re.sub(r'<label\b[^>]*class="[^"]*search[^"]*"[^>]*>.*?</label>', '', b, flags=re.S)
        b = re.sub(r'<input\b[^>]*>', '', b)
        b = re.sub(r'<dialog\b.*?</dialog>', '', b, flags=re.S)
        # sayac ve "sonuc yok" satirlari
        b = re.sub(r'<(span|p|div)[^>]*class="[^"]*__(?:count|empty)\b[^"]*"[^>]*>.*?</\1>', '', b, flags=re.S)
        b = re.sub(r'\shidden(?=[\s>/])', '', b)
        # araclar atilinca bos kalan kutular (arama/suzgec cubugu)
        for _ in range(3):
            b = re.sub(r'<div[^>]*>\s*</div>\s*', '', b)
        title = strip_tags(re.search(r'<h1[^>]*>(.*?)</h1>', b, re.S).group(1))
        b = re.sub(r'<h1[^>]*>.*?</h1>', '', b, count=1, flags=re.S)
        b = re.sub(r'\bid="([^"]+)"', lambda m: 'id="%s-%s"' % (uid, m.group(1)), b)
        b = re.sub(r'url\(#([^)]+)\)', lambda m: 'url(#%s-%s)' % (uid, m.group(1)), b)
        base = '/files/' + os.path.basename(self.dir)
        b = re.sub(r'\b((?:xlink:)?href)="([^"]*)"',
                   lambda m: '%s="%s"' % (m.group(1), self.link(m.group(2), uid, base)), b)
        b = hyphenate_html(b)
        page = ('<section class="bk-chapter bk-appendix bk-extra" id="%s">\n<article class="ds-notes" lang="tr">\n'
                '<header class="nt-head"><p class="nt-kicker">%s</p><h1>%s</h1></header>\n%s\n'
                '</article>\n</section>' % (uid, label, html.escape(title), b))
        return {'id': uid, 'label': label, 'title': title, 'header': '%s · %s' % (label, title), 'html': page}

    def extra_files(self):
        """[(dosya, kimlik, etiket)]: Ek B Ön Bilgiler, Ek C Önemli İsimler (sayfa varsa)."""
        names = os.listdir(self.dir)
        pre = sorted(f for f in names if re.search(r'Prerequisites.*\.html$', f))
        ppl = sorted(f for f in names if re.search(r'(Important_People|Pioneers).*\.html$', f))
        out = []
        if pre:
            out.append((pre[0], 'ek-onbilgi', 'Ek B'))
        if ppl:
            out.append((ppl[0], 'ek-isimler', 'Ek C' if pre else 'Ek B'))
        return out

    # ------------------------------------------------------------ sozluk eki
    def glossary(self):
        s = io.open(os.path.join(self.dir, 'sozluk.html'), encoding='utf-8').read()
        rows = re.findall(r'<tr data-ch="(\d+)"><td lang="en">(.*?)</td><td>(.*?)</td>', s)
        groups, cur = [], None
        for ch, en, tr in rows:
            # DS sozlugu bazi terimlere kisa bir baglam notu ekliyor (soz__ctx)
            tr = tr.replace('<span class="soz__ctx">', '<span class="bk-gloss-ctx">')
            # IS sozlugu her terime bir tanim cumlesi ekliyor (soz__def)
            tr = tr.replace('<span class="soz__def">', '<span class="bk-gloss-def">')
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
                # bolum numarasi terimin yaninda; varsa tanim cumlesi alt satirda
                term, sep, rest = tr.partition('<span class="bk-gloss-def">')
                out.append('<p class="bk-g"><span lang="en">%s</span> &rarr; %s'
                           ' <span class="bk-gloss-ch">%d</span>%s</p>' % (en, term, ch, sep + rest))
        out.append('</div></article></section>')
        return '\n'.join(out), len(rows)

    # ------------------------------------------------------------ butun kitap
    def load(self):
        outline = self.outline()
        info = self.chapter_info()
        self.note_ids = {}                  # not dosya adi -> (kimlik oneki, notun capasi)
        for n, c in info.items():
            for k, f in enumerate(c['notes'], 1):
                self.note_ids[f] = ('c%d' % n, 'ch%d' % n) if len(c['notes']) == 1 \
                    else ('c%dn%d' % (n, k), 'ch%d-%d' % (n, k))
        for f, uid in self.intro:
            self.note_ids[os.path.basename(f)] = (uid, uid)
        for f, uid, label in self.extra_files():
            self.note_ids[f] = (uid, uid)
        stray = sorted(os.path.basename(f) for f in glob.glob(os.path.join(self.notes, 'Bolum_*_Ders_Notu.html'))
                       if os.path.basename(f) not in self.note_ids)
        if stray:
            print('  UYARI: ders sayfasinda bagi olmayan not(lar) kitaba girmedi: %s' % ', '.join(stray))
        chapters, parts = [], []
        for k, pname, chs in outline:
            parts.append({'id': 'part%d' % k, 'num': k, 'name': pname, 'sub': '',
                          'chapters': [n for n, _ in chs]})
            for n, course_title in chs:
                title, page, secs = self.chapter(n, k, course_title, info[n])
                chapters.append({'id': 'ch%d' % n, 'num': n, 'title': title,
                                 'header': '%d · %s' % (n, title), 'html': page, 'sections': secs})
        intro = []
        for f, uid in self.intro:
            src = io.open(os.path.join(self.dir, f), encoding='utf-8').read()
            title = strip_tags(re.search(r'<h1>(.+?)</h1>', src, re.S).group(1))
            page, _ = self.transform(src, uid, html.escape(self.title), title, uid, 'bk-chapter bk-intro', '')
            intro.append({'id': uid, 'title': title, 'header': title, 'html': page})
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
        return {'front': front, 'parts': parts, 'chapters': chapters, 'intro': intro,
                'appendices': [{'id': 'ek-sozluk', 'label': 'Ek A', 'title': 'Terim Sözlüğü',
                                'header': 'Ek A · Terim Sözlüğü', 'html': gloss}]
                          + [self.extra_page(f, uid, label) for f, uid, label in self.extra_files()],
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
