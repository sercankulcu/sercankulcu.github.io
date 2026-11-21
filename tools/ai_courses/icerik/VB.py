# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 26: Veri Bilimi dersinin tanıtımı; soru sorma, veri '
             'düzenleme, keşifsel analiz, görselleştirme, çıkarım, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Soru ve veri', 'Veri düzenleme', 'Keşifsel analiz', 'Görselleştirme', 'Çıkarım ve anlatı', 'Komşu dersler'],
    tanim=('Veri bilimi, bir soruyla başlayıp veriyi bulmayı, temizlemeyi, çözümlemeyi ve sonucu <b>karara dönüşecek</b> '
           'biçimde anlatmayı kapsayan süreçtir. İstatistik, programlama ve alan bilgisini birleştirir; veri madenciliği '
           've makine öğrenmesi bu sürecin araçlarıdır.'),
    tarihce=[
        ('1962', 'Tukey "The Future of Data Analysis" makalesinde veri analizini istatistikten ayrı bir bilim olarak savunur.'),
        ('1977', 'Tukey "Exploratory Data Analysis" kitabını yayımlar: önce bak, sonra modelle.'),
        ('2001', 'Cleveland "veri bilimi"ni istatistiği genişleten bir akademik alan olarak önerir.'),
        ('2010', 'Kaggle kurulur; veri bilimi yarışmaları ve açık veri setleri yaygınlaşır.'),
        ('2012', 'Harvard Business Review veri bilimciyi "21. yüzyılın en çekici mesleği" diye tanıtır.'),
        ('2014', 'Jupyter projesi IPython\'dan ayrılır; kod, grafik ve metin aynı defterde birleşir.'),
    ],
    kavramlar=[
        ('Soru tanımı', 'Ne bilinmek isteniyor, hangi karar verilecek?'),
        ('Düzenli veri', 'Her satır bir gözlem, her sütun bir değişken (tidy data).'),
        ('Veri temizleme', 'Eksik, hatalı ve tutarsız kayıtları düzeltmek.'),
        ('Keşifsel analiz', 'Özet istatistik ve grafikle veriyi tanımak.'),
        ('Görselleştirme', 'Doğru grafikle örüntüyü ve sonucu göstermek.'),
        ('Hipotez testi', 'Farkın tesadüf olup olmadığını sınamak.'),
        ('A/B testi', 'Rastgele deneyle iki seçeneği karşılaştırmak.'),
        ('Tekrarlanabilirlik', 'Kod, veri ve sürümle aynı sonucu yeniden üretmek.'),
    ],
    akis=[('Soru sor', 'karar ve\nölçüt'), ('Veri edin', 'SQL, dosya,\nAPI'), ('Temizle', 'eksik, hatalı,\ntutarsız'),
          ('Keşfet ve\nmodelle', 'grafik, test,\nregresyon'), ('Anlat', 'rapor,\npano')],
    akis_ornek=('<b>Örnek:</b> Bir belediye "otobüs seferi artırılmalı mı?" diye sorar. Kart geçiş kayıtları toplanır, '
                'hatalı saatler ayıklanır, hat ve saat bazında doluluk grafiklerle incelenir, yoğunluk regresyonla '
                'kestirilir ve sonuç tek sayfalık bir raporla karar vericiye sunulur.'),
    onkosul_ek=[
        ('Programlama', 'Python ya da R ile dosya okuma, döngü ve fonksiyonlar', '/teaching/computer-and-introduction-to-programming/'),
        ('Veritabanı ve SQL', 'veriyi sorgulamak, birleştirmek ve gruplamak', None),
    ],
    ayrisma=[
        ('VM', 'Veri madenciliği büyük veride örüntü bulmaya odaklanır; veri bilimi sorudan karara bütün süreci kapsar.'),
        ('MO', 'MÖ yeni örnekte iyi tahmin eden modeli kurar; veri bilimi modeli bir soruyu yanıtlayan araçlardan biri olarak kullanır.'),
        ('OI', 'İstatistik çıkarımın kuramını verir; veri bilimi onu programlama, dağınık gerçek veri ve anlatıyla birleştirir.'),
        ('BV', 'Büyük veri sistemleri verinin saklanıp işlenmesini sağlar; veri bilimi o veriden anlam ve karar çıkarır.'),
    ],
    uygulamalar=[
        ('A/B testi', 'Yeni tasarım gerçekten daha mı iyi?'),
        ('Pazarlama analitiği', 'Hangi kampanya müşteri getiriyor?'),
        ('Halk sağlığı', 'Salgın ve hastalık eğilimlerini izlemek.'),
        ('Spor analitiği', 'Oyuncu ve takım başarımını ölçmek.'),
        ('Kamu politikası', 'Açık veriyle hizmetleri değerlendirmek.'),
        ('Ürün metrikleri', 'Kullanıcıyı tutan ya da kaçıran ne?'),
    ],
    araclar=['Python', 'pandas', 'Jupyter', 'R ve tidyverse', 'Matplotlib ve seaborn', 'SQL', 'statsmodels'],
    veriler=['Titanic (Kaggle)', 'Gapminder', 'NYC taksi yolculukları', 'Palmer Penguins', 'House Prices (Kaggle)', 'Anscombe dörtlüsü'],
    yanilgilar=[
        ('Veri bilimi model eğitmektir.', 'Zamanın çoğu soruyu netleştirmeye, veriyi bulup temizlemeye ve sonucu anlatmaya gider.'),
        ('Veri kendi kendine konuşur.', 'Soru, bağlam ve alan bilgisi olmadan aynı veri yanlış sonuca da götürebilir.'),
        ('Anlamlı p değeri önemli sonuçtur.', 'İstatistiksel anlamlılık etkinin büyüklüğünü söylemez; çok sayıda test yanıltıcı sonuç üretir.'),
        ('Grafik sonucu süsleyen bir eklentidir.', 'Anscombe dörtlüsü gösterir: özet istatistikleri aynı veriler grafikte bambaşka çıkar.'),
    ],
    meslekler=['Veri bilimci', 'Veri analisti', 'Ürün analisti', 'İş zekâsı uzmanı', 'Araştırma analisti'],
    sonra=('Veri bilimi, veri kısmının çatısıdır. Buradan tahmin modellerini derinleştirmek için makine öğrenmesine, '
           'keşif için veri madenciliğine, ölçek için büyük veri sistemlerine ya da adalet ve yanlılık soruları için '
           'açıklanabilir YZ ve etiğe geçilebilir.'),
    kaynaklar=[
        'Wickham, Çetinkaya-Rundel ve Grolemund, <em>R for Data Science</em>, 2. baskı, O\'Reilly, 2023.',
        'McKinney, <em>Python for Data Analysis</em>, 3. baskı, O\'Reilly, 2022.',
        'James, Witten, Hastie ve Tibshirani, <em>An Introduction to Statistical Learning</em>, 2. baskı, Springer, 2021.',
        'Tukey, <em>Exploratory Data Analysis</em>, Addison-Wesley, 1977.',
    ],
    islenenler=[
        'Veri bilimi süreci ve iyi soru sormak',
        'Python ya da R ile veri okuma; düzenli veri',
        'Veri temizleme: eksik ve aykırı değerler',
        'Keşifsel veri analizi',
        'Görselleştirme ilkeleri',
        'Örnekleme ve betimsel istatistik',
        'Güven aralıkları ve hipotez testleri',
        'A/B testi ve deney tasarımı',
        'Regresyon ve tahmin modelleri',
        'Korelasyon, nedensellik, karıştırıcı değişkenler',
        'Veritabanından veri çekmek: SQL',
        'Tekrarlanabilir rapor ve sonucu anlatmak',
    ],
    beceriler=['pandas ya da tidyverse', 'SQL', 'Matplotlib ve seaborn', 'hipotez ve A/B testini yorumlamak',
               'Jupyter ile tekrarlanabilir rapor'],
    hazirlik=[
        ('Ortalama, ortanca, standart sapma ve normal dağılımı açıklayabiliyor musun?', '@OI'),
        ('Python ya da R ile bir tablo okuyup sütunlara göre gruplayabiliyor musun?', 'Programlamaya giriş, ardından pandas ya da dplyr\'a kısa bir giriş'),
        ('SELECT, WHERE ve GROUP BY ile basit bir SQL sorgusu yazabiliyor musun?', 'Bir veritabanı dersinin SQL bölümü ya da çevrim içi SQL alıştırmaları'),
        ('Bir grafiğin yanıltıcı olduğunu fark edebiliyor musun?', 'Şart değil, bunu ders öğretir; merak ediyorsan Tufte\'nin kitabı'),
    ],
    riskler=[
        ('Nedensellik yanılgısı', 'Korelasyondan neden çıkarmak yanlış kararlara götürür: dondurma satışı ile boğulmalar birlikte artar, çünkü ikisi de yazın olur.'),
        ('p-hacking', 'Yeterince çok test yapılınca bir şey mutlaka "anlamlı" çıkar; hipotez veriye bakmadan önce belirlenmelidir.'),
        ('Yeniden tanımlama', 'Adı silinmiş veride posta kodu, doğum tarihi ve cinsiyet çoğu kişiyi yeniden tanımlatmaya yeter.'),
        ('Yanıltıcı grafik', 'Kesik bir eksen ya da seçilmiş bir zaman aralığı, aynı veriyle ters bir hikâye anlatabilir.'),
    ],
)
