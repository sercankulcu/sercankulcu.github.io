# -*- coding: utf-8 -*-
"""Algoritmalar kitabi: 5 bolum, 12 ders notu (Bolum 1, 4 ve 5 birden cok nottan) + terim sozlugu eki.

Bolum 6-14 Ileri Algoritmalar kitabindadir (course_advanced_algorithms.py).

Ortak kalip notes_book.py'de; burada yalnizca bu derse ozgu olanlar var.
"""
import notes_book

# Taslak: icerik ders sayfasindaki kisim duzeninden ve notlarin ortak yapisindan
# turetildi. Yazar gozden gecirmeli.
PREFACE = '''
<p>Algoritma, bir problemi çözmek ya da bir hesabı yapmak için sonlu ve iyi tanımlanmış
adımlar dizisidir. Bu kitap algoritmaların doğruluğunu, zaman ve bellek karmaşıklığının
ölçülmesini ve bu araçların sıralama, arama, çizge ve dizgi problemlerine uygulanışını; farklı
çözümler arasındaki ödünleşimlerle birlikte inceler. Kitap,
Giresun Üniversitesi Bilgisayar Mühendisliği Bölümü'nde verilen Algoritmalar dersinin
notlarından oluşur ve bölümleri dersteki sırayla izler. Örnekler Java ile yazılmıştır.</p>

<p>Kitap iki kısımdır. __PARTS__ Tasarım paradigmaları, zor problemler ve diğer hesaplama
modelleri dersin devamı olan <em>İleri Algoritmalar</em> kitabındadır.</p>
''' + notes_book.MULTI_NOTE + notes_book.STRUCTURE + '''
<p>Bölümlerin kodu derse eşlik eden <span class="u">github.com/sercankulcu/algorithms-java</span>
deposunda, her bölüm için ayrı bir klasördedir; klasörün adı bölümün başında yazılıdır.
Sunumlar, çalışma soruları ve algoritmaları adım adım çalıştıran simülatörler ders
sayfasındadır.</p>
'''

notes_book.setup(
    globals(),
    folder='algorithms',
    course_page='algorithms.md',
    # dersin haritasi: icindekilerin en ustunde, Kisim I'den once
    intro=[('ders_haritasi.html', 'harita')],
    title='Algoritmalar',
    subtitle='',
    output='algorithms/Algoritmalar.pdf',           # courses-pdfs/ altinda
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Algoritmalar ders kitabı: karmaşıklık, sıralama, arama, çizge ve dizgi algoritmaları',
          '/Keywords': 'algoritmalar, karmaşıklık, sıralama, arama, çizge, dizgi, Java, ders kitabı'},
    preface=PREFACE,
    colophon='''<p>Sunumlar, çalışma soruları ve simülatörler o sayfadadır. Bölümlerin kodu
     <span class="u">github.com/sercankulcu/algorithms-java</span> deposundadır.</p>''',
)
