# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 22: Bilgisayar Grafiği dersinin tanıtımı; dönüşümler, '
             'grafik boru hattı, aydınlatma, ışın izleme, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Dönüşümler', 'Grafik boru hattı', 'Aydınlatma', 'Işın izleme', 'Animasyon', 'Komşu dersler'],
    tanim=('Bilgisayar grafiği, geometri, malzeme, ışık ve kamera ile tanımlanmış bir sahneden <b>görüntü üretmeyi</b> '
           '(rendering) inceler. Bilgisayarlı görünün tersidir: görü görüntüden sahneyi çıkarır, grafik sahneden '
           'görüntüyü üretir.'),
    tarihce=[
        ('1963', 'Sutherland\'ın Sketchpad\'i ekranda kalemle çizim yapmayı gösterir; etkileşimli grafiğin başlangıcı.'),
        ('1975', 'Phong yansıma modelini ve gölgelendirme yöntemini yayımlar; parlak yüzeyler gerçekçileşir.'),
        ('1980', 'Whitted ışın izlemeyle yansıma, kırılma ve gölgeyi tek bir yöntemde toplar.'),
        ('1986', 'Kajiya görüntüleme denklemini (rendering equation) yayımlar: fiziğe dayalı görüntülemenin temeli.'),
        ('1995', 'Toy Story, tamamen bilgisayarla üretilmiş ilk uzun metrajlı film olur.'),
        ('2018', 'Donanım destekli ışın izleme tüketici GPU\'larına gelir; gerçek zamanlı ışın izleme başlar.'),
    ],
    kavramlar=[
        ('Homojen koordinat', 'Öteleme, döndürme ve ölçeklemeyi 4×4 matrislerle yazmak.'),
        ('Model-görüş-izdüşüm', 'Nesne uzayından ekran uzayına giden dönüşüm zinciri.'),
        ('Üçgen ağı', 'Yüzeyleri köşe ve üçgenlerle temsil etmek.'),
        ('Rasterleştirme', 'Üçgenin kapladığı pikselleri bulmak.'),
        ('Z-tampon', 'Her piksel için en yakın yüzeyi tutarak görünürlük.'),
        ('Aydınlatma modeli', 'Ortam, yayınık ve parlak yansıma: Phong, Blinn-Phong.'),
        ('Doku kaplama', 'Yüzeye resim ya da desen giydirmek; UV koordinatları.'),
        ('Işın izleme', 'Kameradan ışın gönderip ışığın yolunu geriye izlemek.'),
    ],
    akis=[('Sahne', 'model, ışık,\nkamera'), ('Köşe\nişleme', 'dönüşüm\nmatrisleri'), ('Raster', 'üçgenden\npiksele'),
          ('Parça\ngölgelendir', 'ışık, doku,\nmalzeme'), ('Görüntü', 'çerçeve\ntamponu')],
    akis_ornek=('<b>Örnek:</b> Bir oyunda karakterin üçgen ağı dünya ve kamera matrisleriyle ekrana izdüşürülür, '
                'rasterleştirme her üçgenin kapladığı pikselleri bulur, gölgelendirici her pikselin rengini ışık ve '
                'dokuya göre hesaplar. Bu iş saniyede 60 kez yinelenir.'),
    onkosul_ek=[
        ('C ile Programlama', 'OpenGL ve Vulkan gibi arayüzler C/C++ ile kullanılır', '/teaching/programming-with-c/'),
        ('Analitik geometri', 'vektör, düzlem, doğru-düzlem kesişimi: ışın izlemenin dili', None),
    ],
    ayrisma=[
        ('BG', 'Bilgisayarlı görü görüntüden sahneyi çıkarmaya çalışır; bilgisayar grafiği sahneden görüntüyü üretir.'),
        ('GI', 'Görüntü işleme var olan bir görüntüyü dönüştürür; bilgisayar grafiği görüntüyü geometri ve ışıktan sıfırdan üretir.'),
        ('UM', 'Üretken modeller görüntüyü veriden öğrenerek sentezler; bilgisayar grafiği onu fizik ve geometri kurallarıyla hesaplar.'),
        ('GPU', 'GPU programlama genel paralel hesaba odaklanır; bilgisayar grafiği GPU\'yu görüntü üretmenin aracı olarak kullanır.'),
    ],
    uygulamalar=[
        ('Oyunlar', 'Saniyede onlarca kare üreten gerçek zamanlı grafik.'),
        ('Film ve animasyon', 'Fiziğe dayalı, kare başına dakikalar süren görüntüleme.'),
        ('CAD ve mimari', 'Tasarımı üretmeden önce görmek.'),
        ('Benzetim', 'Uçuş ve sürüş benzetimcileri.'),
        ('Sanal gerçeklik', 'İki göz için düşük gecikmeli görüntü.'),
        ('Bilimsel görselleme', 'Tıbbi hacim verisi, akış ve hava modelleri.'),
    ],
    araclar=['OpenGL', 'Vulkan', 'WebGL ve three.js', 'Blender', 'Unity', 'Unreal Engine'],
    veri_baslik='Klasik test sahneleri',
    veriler=['Utah çaydanlığı', 'Stanford tavşanı', 'Cornell kutusu', 'Sponza atriyumu', 'Suzanne (Blender)'],
    araclar_not='Grafik dersinde veri seti yerine <b>sahne</b> verilir: geometri, malzeme, ışık ve kamera bilindiğinde görüntü hesaplanır.',
    yanilgilar=[
        ('Bilgisayar grafiği yalnızca oyun yapmaktır.', 'Film, mimari, tıp, benzetim ve bilimsel görselleme de grafiğin uygulamalarıdır.'),
        ('Işın izleme yeni bir buluştur.', 'Yöntem 1980\'den beri bilinir; yeni olan, onu gerçek zamanda çalıştıran donanımdır.'),
        ('Grafik ile bilgisayarlı görü aynıdır.', 'Biri birbirinin tersidir; kamera modelini paylaşırlar ama yönleri zıttır.'),
        ('Gerçekçilik için daha çok üçgen yeter.', 'Işık, gölge ve malzeme çoğu zaman geometrinin ayrıntısından daha belirleyicidir.'),
    ],
    meslekler=['Grafik programcısı', 'Oyun motoru geliştiricisi', 'Teknik sanatçı', 'XR geliştiricisi', 'Görselleme mühendisi'],
    sonra=('Grafik, doğrusal cebiri ve GPU programlamayı en somut biçimde kullanan derstir. Buradan gerçek zamanlı '
           'görüntülemeye, fiziğe dayalı görüntülemeye ya da ters yönde bilgisayarlı görüye geçilebilir; üretken '
           'modeller ve nöral görüntüleme iki alanı giderek birleştirmektedir.'),
    kaynaklar=[
        'Marschner ve Shirley, <em>Fundamentals of Computer Graphics</em>, 4. baskı, CRC Press, 2016.',
        'Hughes, van Dam, McGuire ve ark., <em>Computer Graphics: Principles and Practice</em>, 3. baskı, Addison-Wesley, 2013.',
        'Akenine-Möller, Haines, Hoffman ve ark., <em>Real-Time Rendering</em>, 4. baskı, CRC Press, 2018.',
        'Pharr, Jakob ve Humphreys, <em>Physically Based Rendering</em>, 4. baskı, MIT Press, 2023.',
    ],
    islenenler=[
        'Raster görüntü, renk ve gama',
        'Vektörler, matrisler ve 2B/3B dönüşümler',
        'Görüntüleme: kamera, izdüşüm, görüş hacmi',
        'Üçgen ağları ve yüzey temsili',
        'Rasterleştirme ve z-tamponla görünürlük',
        'Gölgelendirme: Phong ve Blinn-Phong',
        'Doku kaplama, UV koordinatları ve mipmap',
        'Grafik boru hattı ve GPU gölgelendiricileri',
        'Işın izleme ve hızlandırma yapıları (BVH)',
        'Eğriler ve yüzeyler: Bézier, B-spline',
        'Görüntüleme denklemi ve Monte Carlo yol izleme',
        'Animasyon: anahtar kare, iskelet, fizik benzetimi',
    ],
    beceriler=['OpenGL ya da WebGL ile çizim', 'GLSL gölgelendirici yazmak', 'three.js ile 3B sahne kurmak',
               'basit bir ışın izleyici yazmak', 'Blender\'da model ve sahne hazırlamak'],
    hazirlik=[
        ('Bir noktayı 4×4 matrisle döndürüp öteleyebiliyor musun?', '@DC'),
        ('Bir ışının bir düzlemi kestiği noktayı bulabiliyor musun?', 'Analitik geometride doğru ve düzlem denklemleri'),
        ('C ya da C++ ile dizi ve struct kullanan bir program yazabiliyor musun?', 'C ile Programlama dersi, ardından C++\'a kısa bir giriş'),
        ('GPU\'nun neden binlerce iş parçacığını paralel çalıştırdığını açıklayabiliyor musun?', '@GPU'),
    ],
    riskler=[
        ('Fotogerçekçi sahte görüntü', 'Gerçekçi görüntüleme, hiç yaşanmamış bir olayın fotoğrafını ya da videosunu inandırıcı biçimde üretmeyi kolaylaştırır.'),
        ('Işığa duyarlı epilepsi', 'Hızlı yanıp sönen parlak desenler nöbet tetikleyebilir; 1997\'de Japonya\'da bir Pokémon bölümü yüzlerce çocuğu hastaneye taşıdı.'),
        ('Sanal gerçeklik tutması', 'Yüksek gecikme ya da düşük kare hızı VR\'da baş dönmesi ve bulantı yapar; zamanlama da görüntü kadar güvenlik konusudur.'),
        ('İkna edici ama yanlış', 'Mimari ya da bilimsel görsellemede ışık ve malzeme yaklaşık hesaplanır; güzel bir görüntü yanlış bir kararı haklı gösterebilir.'),
    ],
)
