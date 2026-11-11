# -*- coding: utf-8 -*-
"""Java ile Nesne Yonelimli Programlama kitabi: 11 bolum, 23 ders notu (Bolum 1-4 birden cok
nottan) + terim sozlugu eki.

Ortak kalip notes_book.py'de; burada yalnizca bu derse ozgu olanlar var.
"""
import notes_book

# Taslak: icerik ders sayfasindaki kisim duzeninden ve notlarin ortak yapisindan
# turetildi. Yazar gozden gecirmeli.
PREFACE = '''
<p>Bu kitap programlamanın temellerinden başlayıp nesne yönelimli programlamaya ve Java ile
gerçek uygulamalara uzanır: sınıflar ve nesneler, sarmalama, kalıtım, çok biçimlilik ve
soyutlama; koleksiyonlar, istisnalar, test, dosya işlemleri, grafik arayüzler, iş
parçacıkları ve veri tabanı programlama. Kitap, Giresun Üniversitesi Bilgisayar
Mühendisliği Bölümü'nde verilen Java ile Nesne Yönelimli Programlama dersinin notlarından
oluşur ve bölümleri dersteki sırayla izler.</p>

<p>Kitap dört kısımdır. __PARTS__</p>
''' + notes_book.MULTI_NOTE + notes_book.STRUCTURE + '''
<p>Bölümlerin kodu derse eşlik eden
<span class="u">github.com/sercankulcu/object-oriented-programming-java</span> deposundadır;
klasörün adı bölümün başında yazılıdır. Sunumlar ve çalışma soruları ders sayfasındadır.</p>
'''

notes_book.setup(
    globals(),
    folder='java',
    course_page='oop-with-java.md',
    # dersin haritasi: icindekilerin en ustunde, Kisim I'den once
    intro=[('ders_haritasi.html', 'harita')],
    title='Java ile Nesne Yönelimli Programlama',
    subtitle='',
    output='java/Java-ile-Nesne-Yonelimli-Programlama.pdf',   # courses-pdfs/ altinda
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Java ile Nesne Yönelimli Programlama ders kitabı: sınıflar, kalıtım, çok '
                      'biçimlilik, koleksiyonlar, istisnalar, test, G/Ç, grafikler, iş parçacıkları, veri tabanı',
          '/Keywords': 'Java, nesne yönelimli programlama, kalıtım, çok biçimlilik, ders kitabı'},
    preface=PREFACE,
    colophon='''<p>Sunumlar ve çalışma soruları o sayfadadır. Bölümlerin kodu
     <span class="u">github.com/sercankulcu/object-oriented-programming-java</span> deposundadır.</p>''',
)
