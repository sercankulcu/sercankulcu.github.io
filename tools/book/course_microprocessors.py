# -*- coding: utf-8 -*-
"""Mikroislemciler kitabi: 11 bolum, 19 ders notu (cogu bolum iki nottan) + terim sozlugu eki.

Ortak kalip notes_book.py'de; burada yalnizca bu derse ozgu olanlar var.
"""
import notes_book

# Taslak: icerik ders sayfasindaki kisim duzeninden ve notlarin ortak yapisindan
# turetildi. Yazar gozden gecirmeli.
PREFACE = '''
<p>Mikroişlemciler komutları yürütür, veriyi işler ve bir bilgisayar sisteminin bütün
işlemlerini düzenler. Bu kitap işlemci düzenini, yazmaçları, bellek erişimini, komutların
yürütülmesini ve düşük düzeyli programlamayı 8086 mimarisi üzerinden inceler. Bugünkü
x86-64 işlemciler çok daha karmaşık olsa da 8086; yazmaçları, bölütlemeyi, adresleme
kiplerini, kesmeleri ve assembly programlamayı tanıtmak için hâlâ iyi bir temeldir. Kitap,
Giresun Üniversitesi Bilgisayar Mühendisliği Bölümü'nde verilen Mikroişlemciler dersinin
notlarından oluşur ve bölümleri dersteki sırayla izler.</p>

<p>Kitap dört kısımdır. __PARTS__</p>
''' + notes_book.MULTI_NOTE + notes_book.STRUCTURE + '''
<p>Örnekler emu8086 ile çalıştırılabilir. Emülatör, işlemci simülatörü, sunumlar ve
çalışma soruları ders sayfasındadır.</p>
'''

notes_book.setup(
    globals(),
    folder='microprocessors',
    course_page='microprocessors.md',
    # dersin haritasi: icindekilerin en ustunde, Kisim I'den once
    intro=[('ders_haritasi.html', 'harita')],
    title='Mikroişlemciler',
    subtitle='',
    output='microprocessors/Mikroislemciler.pdf',   # courses-pdfs/ altinda
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Mikroişlemciler ders kitabı: 8086 mimarisi, yazmaçlar, assembly, bellek erişimi, '
                      'kesmeler, komutlar, yığın ve prosedürler, makrolar, donanım, komut kodlama',
          '/Keywords': 'mikroişlemciler, 8086, assembly, x86, ders kitabı'},
    preface=PREFACE,
    colophon='<p>Emülatör, işlemci simülatörü, sunumlar ve çalışma soruları o sayfadadır.</p>',
)
