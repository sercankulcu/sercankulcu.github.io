# -*- coding: utf-8 -*-
"""Bilgisayar ve Programlamaya Giris kitabi: 12 bolum, 21 ders notu (Bolum 1-4 birden cok
nottan) + terim sozlugu eki.

Ortak kalip notes_book.py'de; burada yalnizca bu derse ozgu olanlar var.
"""
import notes_book

# Taslak: icerik ders sayfasindaki kisim duzeninden ve notlarin ortak yapisindan
# turetildi. Yazar gozden gecirmeli.
PREFACE = '''
<p>Bu kitap bilgisayarın ve bilgi teknolojilerinin temellerinden başlar: donanım, işletim
sistemleri, İnternet ve ofis uygulamaları. Ardından algoritma ve akış diyagramlarıyla
programlamaya geçer ve Java ile değişkenlerden özyinelemeye kadar programlamanın temel
yapılarını işler. Kitap, Giresun Üniversitesi Bilgisayar Mühendisliği Bölümü'nde verilen
Bilgisayar ve Programlamaya Giriş dersinin notlarından oluşur ve bölümleri dersteki sırayla
izler.</p>

<p>Kitap üç kısımdır. __PARTS__</p>
''' + notes_book.MULTI_NOTE + notes_book.STRUCTURE + '''
<p>Programlama bölümlerinin kodu derse eşlik eden
<span class="u">github.com/sercankulcu/computer-programming-java</span> deposundadır;
klasörün adı bölümün başında yazılıdır. Sunumlar ve çalışma soruları ders sayfasındadır.</p>
'''

notes_book.setup(
    globals(),
    folder='computer',
    course_page='computer-and-programming.md',
    title='Bilgisayar ve Programlamaya Giriş',
    subtitle='',
    output='computer/Bilgisayar-ve-Programlamaya-Giris.pdf',   # courses-pdfs/ altinda
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Bilgisayar ve Programlamaya Giriş ders kitabı: donanım, işletim sistemleri, '
                      'İnternet, ofis uygulamaları, algoritmalar, Java ile programlama',
          '/Keywords': 'bilgisayar, programlama, algoritma, Java, ders kitabı'},
    preface=PREFACE,
    colophon='''<p>Sunumlar ve çalışma soruları o sayfadadır. Programlama bölümlerinin kodu
     <span class="u">github.com/sercankulcu/computer-programming-java</span> deposundadır.</p>''',
)
