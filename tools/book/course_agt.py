# -*- coding: utf-8 -*-
"""Algoritmik Oyun Kurami kitabi: 15 ders notu (Bolum 0-14) + terim sozlugu eki.

Ortak kalip notes_book.py'de; burada yalnizca bu derse ozgu olanlar var.
"""
import notes_book

# Taslak: icerik ders sayfasindaki kisim duzeninden ve notlarin ortak yapisindan
# turetildi. Yazar gozden gecirmeli.
PREFACE = '''
<p>Algoritmik oyun kuramı, kendi çıkarını gözeten tarafların etkileşimini hesaplama
gözüyle inceler: oyun kuramının modellerini algoritmalar ve karmaşıklık çözümlemesiyle
birleştirir. Bu kitap, Giresun Üniversitesi Bilgisayar Mühendisliği Bölümü'nde verilen
Algoritmik Oyun Kuramı dersinin notlarından oluşur ve bölümleri dersteki sırayla izler.</p>

<p>Kitap beş kısımdır. __PARTS__ Bölüm 0, derste gerçekten kullanılan matematiği oyun
örnekleri üzerinden yeniden kurar; bu konulara hâkim okur doğrudan Bölüm 1'den
başlayabilir.</p>

<p>Her bölüm aynı düzeni izler. Başta öğrenme çıktıları yer alır. Biçimsel tanımlar,
teoremler ve çözülmüş örnekler adlandırılmış kutulardadır. <em>Sık yapılan hata</em>
kutuları, öğrencilerin en sık düştüğü yanılgıları gösterir. Kod izlemeleri, hesapların
kısa Python fonksiyonlarıyla nasıl yapıldığını adım adım gösterir. Bölüm; bir özet, bir
kavram listesi, cevaplarıyla birlikte <em>Kendini Dene</em> soruları, ileri okuma önerileri
ve kaynakçayla kapanır. Kitabın sonundaki terim sözlüğü, her İngilizce terim için notlarda
kullanılan tek Türkçe karşılığı verir.</p>

<p>Bazı şekiller web sayfasında kaydırıcıyla değiştirilebilen etkileşimli çizimlerdir;
kitapta varsayılan değerleriyle basılmışlardır. Sunumlar, çalışma soruları ve sınıfta
oynanan oyunlar ders sayfasındadır.</p>
'''

notes_book.setup(
    globals(),
    folder='agt',
    course_page='algorithmic-game-theory.md',
    title='Algoritmik Oyun Kuramı',
    subtitle='Oyunlar, denge, mekanizmalar ve hesaplama',
    output='agt/Algoritmik-Oyun-Kurami.pdf',          # courses-pdfs/ altinda
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'Algoritmik Oyun Kuramı ders kitabı: oyunlar, denge, mekanizma tasarımı, '
                      'açık artırmalar, oylama, ağlar, öğrenme',
          '/Keywords': 'oyun kuramı, algoritmik oyun kuramı, Nash dengesi, mekanizma tasarımı, '
                       'açık artırma, ders kitabı'},
    preface=PREFACE,
    colophon='''<p>Sunumlar, çalışma soruları, canlı sınıf oyunları ve notlardaki etkileşimli
     şekillerin çalışan hâlleri o sayfadadır. Kitaptaki etkileşimli şekiller varsayılan
     değerleriyle basılmıştır.</p>''',
    # dersin haritasi: icindekilerin en ustunde, Kisim I'den once
    intro=[('ders_haritasi.html', 'harita')],
    # etkilesimli sekiller (data-widget) bu betikle cizilir
    extra_css=['slides/deck/kaydirici.css'],
    scripts=['slides/deck/kaydirici.js'],
)
