# -*- coding: utf-8 -*-
"""Isletim Sistemleri kitabi: 15 ders notu (Bolum 1-15) + terim sozlugu eki.

Ortak kalip notes_book.py'de; burada yalnizca bu derse ozgu olanlar var. Her bolumun
basina, ders sayfasindaki "Kod Ornekleri" ve "Laboratuvar Calismasi" baglantilarindan
kod ve laboratuvar klasorleri yazilir.
"""
import notes_book

COURSE_PAGE = 'operating-systems.md'


# Taslak: icerik ders sayfasindaki kisim duzeninden ve notlarin ortak yapisindan
# turetildi. Yazar gozden gecirmeli.
PREFACE = '''
<p>İşletim sistemi donanım ile uygulamalar arasında duran yazılımdır: işlemci zamanını,
belleği, depolamayı ve aygıtları yönetir, programlara bunları güvenle ve paylaşarak
kullanabilecekleri soyutlamalar sunar. Bu kitap, Giresun Üniversitesi Bilgisayar
Mühendisliği Bölümü'nde verilen İşletim Sistemleri dersinin notlarından oluşur ve
bölümleri dersteki sırayla izler. Örnekler C ile, dört bölümde ayrıca Java ile
yazılmıştır.</p>

<p>Kitap dört kısımdır. __PARTS__</p>

<p>Her bölüm aynı düzeni izler. Başta öğrenme çıktıları yer alır. Biçimsel tanımlar,
teoremler ve çözülmüş örnekler adlandırılmış kutulardadır. <em>Sık yapılan hata</em>
kutuları, öğrencilerin en sık düştüğü yanılgıları gösterir. Kod izlemeleri, bir programın
ya da algoritmanın adım adım nasıl çalıştığını gösterir. Bölüm; bir özet, bir kavram
listesi, cevaplarıyla birlikte <em>Kendini Dene</em> soruları, ileri okuma önerileri ve
kaynakçayla kapanır. Kitabın sonundaki terim sözlüğü, her İngilizce terim için notlarda
kullanılan tek Türkçe karşılığı verir.</p>

<p>Bölümlerin kodu ve laboratuvar çalışmaları derse eşlik eden
<span class="u">github.com/sercankulcu/operating-systems-labs</span>, Java örnekleri
<span class="u">github.com/sercankulcu/operating-systems-java</span> deposundadır; ilgili
klasörlerin adı her bölümün başında yazılıdır. Sunumlar ve çalışma soruları ders
sayfasındadır.</p>
'''

notes_book.setup(
    globals(),
    folder='os',
    course_page=COURSE_PAGE,
    title='İşletim Sistemleri',
    subtitle='',
    output='os/Isletim-Sistemleri.pdf',             # courses-pdfs/ altinda
    meta={'/Author': 'Sercan Külcü',
          '/Subject': 'İşletim Sistemleri ders kitabı: süreçler, iş parçacıkları, çizelgeleme, '
                      'senkronizasyon, kilitlenme, bellek, sanal bellek, dosya sistemleri, G/Ç, güvenlik, Linux',
          '/Keywords': 'işletim sistemleri, süreç, iş parçacığı, çizelgeleme, sanal bellek, '
                       'dosya sistemi, Linux, ders kitabı'},
    preface=PREFACE,
    colophon='''<p>Sunumlar ve çalışma soruları o sayfadadır. Bölümlerin kodu ve laboratuvar
     çalışmaları <span class="u">github.com/sercankulcu/operating-systems-labs</span>, Java örnekleri
     <span class="u">github.com/sercankulcu/operating-systems-java</span> deposundadır.</p>''',
)
