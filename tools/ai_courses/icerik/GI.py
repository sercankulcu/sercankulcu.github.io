# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 17: Görüntü İşleme dersinin tanıtımı; piksel işlemleri, süzgeçler, '
             'kenar bulma, bölütleme, sıkıştırma, bilgisayarlı görüden farkı, kısa tarihçe, komşu dersler ve ayrışma noktaları.'),
    gundem=['Görüntü nedir?', 'İyileştirme', 'Süzgeç ve evrişim', 'Kenar ve bölütleme', 'Sıkıştırma', 'Komşu dersler'],
    tanim=('Görüntü işleme, bir görüntüyü alıp <b>yeni bir görüntüye</b> ya da bölgelere dönüştüren yöntemleri inceler: '
           'gürültüyü azaltmak, karşıtlığı artırmak, kenarları ve nesne sınırlarını bulmak. Girdi de çıktı da görüntüdür; '
           'görüntüde ne olduğunu anlamak bilgisayarlı görünün işidir.'),
    tarihce=[
        ('1920\'ler', 'Bartlane sistemi gazete fotoğraflarını Atlantik ötesine kabloyla, sayısal kodlanmış olarak iletir.'),
        ('1957', 'Russell Kirsch ilk sayısal taranmış fotoğrafı oluşturur: bebek oğlunun 176×176 piksellik görüntüsü.'),
        ('1964', 'JPL, Ranger 7 sondasının Ay görüntülerini bilgisayarla düzeltir; sayısal görüntü işleme doğar.'),
        ('1979', 'Otsu, histogramdan otomatik eşik seçen yöntemini yayımlar; bugün de en çok kullanılan eşikleme.'),
        ('1986', 'Canny kenar bulucusu yayımlanır: gürültüye dayanıklı, ince ve sürekli kenarlar.'),
        ('1992', 'JPEG standardı kabul edilir; DCT tabanlı kayıplı sıkıştırma fotoğrafın ortak dili olur.'),
    ],
    kavramlar=[
        ('Piksel ve kanal', 'Görüntü bir sayı matrisidir; renkte üç kanal.'),
        ('Histogram', 'Parlaklık dağılımı; histogram eşitleme ile karşıtlık.'),
        ('Uzamsal süzgeç', 'Komşu piksellerle evrişim: bulanıklaştırma, keskinleştirme.'),
        ('Frekans uzayı', '2B Fourier dönüşümü; periyodik gürültüyü süzme.'),
        ('Kenar bulma', 'Gradyan, Sobel ve Canny ile parlaklık sıçramaları.'),
        ('Eşikleme', 'Ön planı arka plandan ayırmak; Otsu yöntemi.'),
        ('Morfoloji', 'Aşındırma, genişletme: ikili şekilleri düzeltme.'),
        ('Bölütleme', 'Görüntüyü bölgelere ayırmak: bölge büyütme, havza.'),
    ],
    akis=[('Edin', 'kamera,\ntarayıcı'), ('Ön işle', 'gürültü,\nkarşıtlık'), ('Dönüştür', 'süzgeç,\nFourier'),
          ('Bölütle', 'eşik, kenar,\nbölge'), ('Görüntü\nçıktısı', 'temiz görüntü\nya da maske')],
    akis_ornek=('<b>Örnek:</b> Taranmış eski bir belge önce medyan süzgeçle lekelerden arındırılır, histogram eşitleme ile '
                'karşıtlığı artırılır, Otsu eşiğiyle siyah-beyaza çevrilir ve morfolojik işlemlerle harfler düzeltilir. '
                'Çıktı temiz bir görüntüdür; harfleri okumak ise bilgisayarlı görünün işidir.'),
    onkosul_ek=[
        ('Doğrusal cebir ve analiz', 'matris işlemleri, türev ve gradyan: süzgeç ve kenarın dili', None),
        ('Programlama', 'Python ya da C ile iki boyutlu dizilerde döngüler', '/teaching/computer-and-introduction-to-programming/'),
        ('Veri Yapıları', 'kuyruk ve birleşim-bul: bölge büyütme ve bağlı bileşen etiketleme', '/teaching/data-structures/'),
    ],
    ayrisma=[
        ('BG', 'Görüntü işlemede girdi de çıktı da görüntüdür; bilgisayarlı görüde girdi görüntü, çıktı anlamdır: etiket, kutu, derinlik.'),
        ('SSI', 'Sinyal işleme bir boyutlu zaman sinyaliyle çalışır; görüntü işleme aynı evrişim ve Fourier araçlarını iki boyuta taşır.'),
        ('BGR', 'Grafik sahne tanımından görüntü üretir; görüntü işleme var olan bir görüntüyü alıp dönüştürür.'),
        ('TGI', 'Tıbbi görüntü işleme bu dersin yöntemlerini BT ve MR gibi tıbbi görüntülere, klinik kısıtlarıyla birlikte uygular.'),
    ],
    uygulamalar=[
        ('Fotoğraf düzenleme', 'Parlaklık, keskinlik, gürültü azaltma.'),
        ('Belge tarama', 'Eğriliği düzeltme, siyah-beyaza çevirme.'),
        ('Sıkıştırma', 'JPEG, PNG ve video kodlama.'),
        ('Endüstriyel denetim', 'Üründe çizik ve leke bölgelerini ayırmak.'),
        ('Mikroskopi', 'Hücreleri bölütleme ve sayma.'),
        ('Ön işleme', 'Görü ve tıbbi modellere temiz girdi.'),
    ],
    araclar=['OpenCV', 'scikit-image', 'Pillow', 'ImageJ / Fiji', 'MATLAB Image Processing Toolbox', 'GIMP'],
    veri_baslik='Klasik test görüntüleri ve veri setleri',
    veriler=['USC-SIPI test görüntüleri', 'Kodak görüntü seti', 'BSDS500 (Berkeley bölütleme)', 'DIV2K (süper çözünürlük)', 'Cameraman ve Peppers'],
    araclar_not='Görüntü işlemede çoğu zaman <b>tek bir görüntü</b> yeter: yöntem önceden tanımlıdır, veriden öğrenilmez. Büyük etiketli veri setleri bilgisayarlı görünün ihtiyacıdır.',
    yanilgilar=[
        ('Görüntü işleme ile bilgisayarlı görü aynı şeydir.', 'Görüntü işleme görüntüyü dönüştürür; görü görüntüden anlam çıkarır. Biri ötekinin ön adımıdır.'),
        ('Keskinleştirme kaybolan ayrıntıyı geri getirir.', 'Keskinleştirme var olan kenarları belirginleştirir; kaydedilmemiş ayrıntı geri gelmez.'),
        ('Artık her şeyi derin öğrenme yapıyor.', 'Kalibrasyon, sıkıştırma, ön işleme ve hızlı endüstriyel denetimde klasik yöntemler hâlâ esastır.'),
        ('Görüntüyü büyütmek çözünürlüğü artırır.', 'Ara değerleme yeni piksel üretir ama yeni bilgi üretmez; görüntü yalnızca büyür.'),
    ],
    meslekler=['Görüntü işleme mühendisi', 'Gömülü görü mühendisi', 'Kalite kontrol sistemleri mühendisi', 'Biyomedikal görüntüleme uzmanı'],
    sonra=('Görüntü işleme, görüntüyle çalışan bütün derslerin ortak ön adımıdır. Görüntüden anlam çıkarmak için '
           'bilgisayarlı görüye, uygulamaya yönelmek için tıbbi görüntü işleme ya da uzaktan algılamaya geçilir. '
           'Ters yönde, görüntü üretmeyi bilgisayar grafiği inceler.'),
    kaynaklar=[
        'Gonzalez ve Woods, <em>Digital Image Processing</em>, 4. baskı, Pearson, 2018.',
        'Jain, <em>Fundamentals of Digital Image Processing</em>, Prentice Hall, 1989.',
        'Burger ve Burge, <em>Digital Image Processing: An Algorithmic Introduction</em>, 3. baskı, Springer, 2022.',
        'Canny, "A Computational Approach to Edge Detection", <em>IEEE Transactions on Pattern Analysis and Machine Intelligence</em> 8(6), 1986.',
    ],
)
