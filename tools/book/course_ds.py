# -*- coding: utf-8 -*-
"""Veri Yapilari kitabi: 14 ders notu (Bolum 1-14) + terim sozlugu eki.

Ortak kalip notes_book.py'de; burada yalnizca bu derse ozgu olanlar var. Her bolumun
basina, ders sayfasindaki "Kod Ornekleri" baglantisindan kod klasoru yazilir.
"""
import io, os, re

import notes_book
from common import SITE

COURSE_PAGE = 'data-structures.md'


def _code_dirs():
    """bolum no -> github.com/... klasoru, ders sayfasindaki 'Kod Ornekleri' baglantisindan."""
    out, cur = {}, None
    for line in io.open(os.path.join(SITE, '_teaching', COURSE_PAGE), encoding='utf-8'):
        m = re.match(r'###\s+Bölüm\s+(\d+):', line)
        if m:
            cur = int(m.group(1))
        m = re.search(r'Kod Örnekleri \(GitHub\)\]\(https://(github\.com/[^)\s]+)\)', line)
        if m and cur is not None:
            out[cur] = re.sub(r'/tree/main/', '/', m.group(1))
    return out


CODE = _code_dirs()


def code_note(n):
    d = CODE.get(n)
    if not d:
        return ''
    return '<strong>Bu bölümün kodu:</strong> <span class="u">%s</span>' % d


# Taslak: icerik ders sayfasindaki kisim duzeninden ve notlarin ortak yapisindan
# turetildi. Yazar gozden gecirmeli.
PREFACE = '''
<p>Veri yapıları, verinin bellekte nasıl düzenleneceğini ve ona nasıl erişileceğini
belirler; doğru yapıyı seçmek arama, ekleme, silme ve gezinme gibi işlemlerin hızını
doğrudan etkiler. Bu kitap, Giresun Üniversitesi Bilgisayar Mühendisliği Bölümü'nde
verilen Veri Yapıları dersinin notlarından oluşur ve bölümleri dersteki sırayla izler.
Örnekler Java ile yazılmıştır.</p>

<p>Kitap dört kısımdır. __PARTS__</p>

<p>Her bölüm aynı düzeni izler. Başta öğrenme çıktıları yer alır. Biçimsel tanımlar,
teoremler ve çözülmüş örnekler adlandırılmış kutulardadır. <em>Sık yapılan hata</em>
kutuları, öğrencilerin en sık düştüğü yanılgıları gösterir. Kod izlemeleri, bir işlemin
yapıyı adım adım nasıl değiştirdiğini gösterir. Bölüm; bir özet, bir kavram listesi,
cevaplarıyla birlikte <em>Kendini Dene</em> soruları, ileri okuma önerileri ve kaynakçayla
kapanır. Kitabın sonundaki terim sözlüğü, her İngilizce terim için notlarda kullanılan tek
Türkçe karşılığı verir.</p>

<p>Bölümlerin kodu derse eşlik eden <span class="u">github.com/sercankulcu/data-structures-java</span>
deposunda, her bölüm için ayrı bir klasördedir; klasörün adı bölümün başında yazılıdır.
Sunumlar, çalışma soruları ve yapıları adım adım çalıştıran simülatörler ders
sayfasındadır.</p>
'''

notes_book.setup(
    globals(),
    folder='data_structures',
    course_page=COURSE_PAGE,
    title='Veri Yapıları',
    subtitle='',
    output='data_structures/Veri-Yapilari.pdf',     # courses-pdfs/ altinda
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Veri Yapıları ders kitabı: algoritma analizi, diziler, özyineleme, bağlı '
                      'listeler, yığın ve kuyruk, ağaçlar, öncelikli kuyruk, hash tabloları, kümeler, çizgeler',
          '/Keywords': 'veri yapıları, algoritma analizi, Java, bağlı liste, ağaç, hash tablosu, '
                       'çizge, ders kitabı'},
    preface=PREFACE,
    colophon='''<p>Sunumlar, çalışma soruları ve simülatörler o sayfadadır. Bölümlerin kodu
     <span class="u">github.com/sercankulcu/data-structures-java</span> deposundadır.</p>''',
    code_note=code_note,
)
