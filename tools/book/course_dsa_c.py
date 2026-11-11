# -*- coding: utf-8 -*-
"""C ile Veri Yapilari ve Algoritmalar kitabi: 20 ders notu (Bolum 1-20) + terim sozlugu eki.

Ortak kalip notes_book.py'de; burada yalnizca bu derse ozgu olanlar var.
"""
import notes_book

# Taslak: icerik ders sayfasindaki kisim duzeninden ve notlarin ortak yapisindan
# turetildi. Yazar gozden gecirmeli.
PREFACE = '''
<p>Bu kitap veri yapılarını ve algoritmaları bellekteki gösterimleri ve C ile
gerçeklenmeleri üzerinden inceler. Her konu soyut veri tipinden başlar; işaretçiler, dinamik
bellek ve yapılarla çalışan bir C99/C11 gerçeklemesine ve onun karmaşıklık çözümlemesine
ulaşır. Kitap, Giresun Üniversitesi Bilgisayar Mühendisliği Bölümü'nde verilen C ile Veri
Yapıları ve Algoritmalar dersinin notlarından oluşur ve bölümleri dersteki sırayla izler.</p>

<p>Kitap beş kısımdır. __PARTS__</p>
''' + notes_book.STRUCTURE + '''
<p>Sunumlar ve çalışma soruları ders sayfasındadır.</p>
'''

notes_book.setup(
    globals(),
    folder='dsa_c',
    course_page='data-structures-and-algorithms-with-c.md',
    title='C ile Veri Yapıları ve Algoritmalar',
    subtitle='',
    output='dsa_c/C-ile-Veri-Yapilari-ve-Algoritmalar.pdf',   # courses-pdfs/ altinda
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'C ile Veri Yapıları ve Algoritmalar ders kitabı: diziler, bağlı listeler, yığın, '
                      'kuyruk, ağaçlar, heap, hash, çizgeler, union-find, en kısa yol, sıralama',
          '/Keywords': 'veri yapıları, algoritmalar, C, işaretçi, dinamik bellek, ders kitabı'},
    preface=PREFACE,
    colophon='<p>Sunumlar ve çalışma soruları o sayfadadır.</p>',
)
