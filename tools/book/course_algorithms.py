# -*- coding: utf-8 -*-
"""Algoritmalar kitabi: 14 bolum, 20 ders notu (Bolum 1, 4 ve 5 birden cok nottan) + terim sozlugu eki.

Ortak kalip notes_book.py'de; burada yalnizca bu derse ozgu olanlar var.
"""
import notes_book

# Taslak: icerik ders sayfasindaki kisim duzeninden ve notlarin ortak yapisindan
# turetildi. Yazar gozden gecirmeli.
PREFACE = '''
<p>Algoritma, bir problemi çözmek ya da bir hesabı yapmak için sonlu ve iyi tanımlanmış
adımlar dizisidir. Bu kitap temel algoritma tasarım tekniklerini, algoritmaların doğruluğunu,
zaman ve bellek karmaşıklığını ve farklı çözümler arasındaki ödünleşimleri inceler. Kitap,
Giresun Üniversitesi Bilgisayar Mühendisliği Bölümü'nde verilen Algoritmalar dersinin
notlarından oluşur ve bölümleri dersteki sırayla izler. Örnekler Java ile yazılmıştır.</p>

<p>Kitap beş kısımdır. __PARTS__</p>
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
          '/Subject': 'Algoritmalar ders kitabı: karmaşıklık, sıralama, arama, çizge ve dizgi '
                      'algoritmaları, böl ve fethet, açgözlü, dinamik programlama, geri izleme, '
                      'yaklaşım, rastgele, çevrim içi ve paralel algoritmalar',
          '/Keywords': 'algoritmalar, karmaşıklık, sıralama, çizge, dinamik programlama, Java, ders kitabı'},
    preface=PREFACE,
    colophon='''<p>Sunumlar, çalışma soruları ve simülatörler o sayfadadır. Bölümlerin kodu
     <span class="u">github.com/sercankulcu/algorithms-java</span> deposundadır.</p>''',
)
