# -*- coding: utf-8 -*-
"""Ileri Algoritmalar kitabi: 9 bolum, 9 ders notu + terim sozlugu eki.

Algoritmalar dersinin devami (eski Bolum 6-14). Ortak kalip notes_book.py'de.
"""
import notes_book

PREFACE = '''
<p>Bu kitap, Giresun Üniversitesi Bilgisayar Mühendisliği Bölümü'nde verilen İleri Algoritmalar
dersinin notlarından oluşur ve <em>Algoritmalar</em> kitabının devamıdır. Algoritma
karmaşıklığı, sıralama, arama, çizge ve dizgi algoritmaları o kitapta anlatılır; burada
bilindikleri varsayılır. Kitap, algoritma tasarımının temel yöntemlerini, zor problemlerle
başa çıkma yollarını ve sıralı, belirlenimci modelin dışındaki hesaplama modellerini
inceler. Bölümler dersteki sırayı izler; örnekler Java ile yazılmıştır.</p>

<p>Kitap üç kısımdır. __PARTS__</p>
''' + notes_book.STRUCTURE + '''
<p>Bölümlerin kodu derse eşlik eden <span class="u">github.com/sercankulcu/advanced-algorithms-java</span>
deposunda, her bölüm için ayrı bir klasördedir; klasörün adı bölümün başında yazılıdır.
Sunumlar, çalışma soruları ve algoritmaları adım adım çalıştıran simülatörler ders
sayfasındadır.</p>
'''

notes_book.setup(
    globals(),
    folder='advanced_algorithms',
    course_page='advanced-algorithms.md',
    # dersin haritasi: icindekilerin en ustunde, Kisim I'den once
    intro=[('Ders_Haritasi.html', 'harita')],
    title='İleri Algoritmalar',
    subtitle='Zor Problemler İçin Teknikler',
    output='advanced_algorithms/Ileri-Algoritmalar.pdf',   # courses-pdfs/ altinda
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'İleri Algoritmalar ders kitabı: böl ve fethet, açgözlü algoritmalar, dinamik '
                      'programlama, geri izleme, dal sınır, yaklaşım, rastgele, çevrim içi ve paralel algoritmalar',
          '/Keywords': 'algoritmalar, algoritma tasarımı, dinamik programlama, NP-zor, yaklaşım, Java, ders kitabı'},
    preface=PREFACE,
    colophon='''<p>Sunumlar, çalışma soruları ve simülatörler o sayfadadır. Bölümlerin kodu
     <span class="u">github.com/sercankulcu/advanced-algorithms-java</span> deposundadır.</p>''',
)
