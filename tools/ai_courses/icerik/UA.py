# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 21: Uzaktan Algılama dersinin tanıtımı; uydu ve algılayıcılar, '
             'spektral bantlar, düzeltmeler, arazi sınıflandırma, değişim tespiti, kısa tarihçe, komşu dersler ve ayrışma noktaları.'),
    gundem=['Uydu ve algılayıcı', 'Spektral bantlar', 'Düzeltmeler', 'Sınıflandırma', 'Değişim tespiti', 'Komşu dersler'],
    tanim=('Uzaktan algılama, yeryüzüne dokunmadan, uydu, uçak ya da insansız hava aracındaki algılayıcılarla '
           '<b>yansıyan ve yayılan enerjiyi</b> ölçerek bilgi çıkarır. Görüntü yalnızca renkli bir fotoğraf değil, '
           'her bandı farklı bir fiziksel ölçüm taşıyan çok bantlı bir veridir.'),
    tarihce=[
        ('1858', 'Nadar, bir balondan Paris\'in fotoğrafını çeker: bilinen ilk hava fotoğrafı.'),
        ('1960', 'İlk meteoroloji uydusu TIROS-1 fırlatılır; bulutlar uzaydan düzenli görüntülenir.'),
        ('1972', 'Landsat 1 fırlatılır: yeryüzünü çok bantlı izleyen ilk sivil uydu programı.'),
        ('1978', 'Seasat, uzaydan sentetik açıklıklı radar (SAR) görüntüsü alan ilk sivil uydu olur.'),
        ('2008', 'ABD Jeoloji Araştırmaları Kurumu (USGS), Landsat arşivini herkese ücretsiz açar.'),
        ('2015', 'Sentinel-2A fırlatılır; Copernicus programının açık verisiyle sık ve ücretsiz görüntü çağı başlar.'),
    ],
    kavramlar=[
        ('Elektromanyetik tayf', 'Görünür, kızılötesi, termal ve mikrodalga bantlar.'),
        ('Pasif ve aktif', 'Güneş ışığını ölçen optik ya da kendi sinyalini yollayan radar.'),
        ('Çözünürlük türleri', 'Uzamsal, spektral, zamansal ve radyometrik.'),
        ('Spektral imza', 'Su, bitki ve toprak her bantta farklı yansıtır.'),
        ('Bant indeksleri', 'NDVI ile bitki örtüsü, NDWI ile su.'),
        ('Düzeltmeler', 'Atmosfer, yer şekli ve geometrik düzeltme.'),
        ('Arazi sınıflandırma', 'Her pikseli orman, tarla, kent, su olarak etiketlemek.'),
        ('Değişim tespiti', 'Farklı tarihlerin görüntülerini karşılaştırmak.'),
    ],
    akis=[('Algıla', 'uydu, uçak,\nİHA'), ('Düzelt', 'atmosfer,\ngeometri'), ('Bant\nhesapla', 'NDVI,\nbileşim'),
          ('Sınıflandır', 'arazi örtüsü,\nnesne'), ('Haritala', 'CBS, değişim\nraporu')],
    akis_ornek=('<b>Örnek:</b> Bir orman yangınından önce ve sonra çekilen Sentinel-2 görüntüleri atmosfer için düzeltilir. '
                'Yakın kızılötesi ve kısa dalga kızılötesi bantlardan yanma indeksi hesaplanır; iki tarih arasındaki fark '
                'yanan alanı ortaya çıkarır. Sonuç hektar olarak ölçülüp haritaya işlenir.'),
    onkosul_ek=[
        ('Fizik', 'elektromanyetik dalga, yansıma ve soğurma', None),
        ('Coğrafi bilgi sistemleri', 'koordinat sistemleri, harita izdüşümleri ve katmanlar', None),
        ('Programlama', 'Python ile büyük dizi ve dosya işlemleri', '/teaching/computer-and-introduction-to-programming/'),
    ],
    ayrisma=[
        ('GI', 'Görüntü işleme genel yöntemleri verir; uzaktan algılama onları çok bantlı, fiziksel ölçüm taşıyan uydu görüntülerine uygular.'),
        ('BG', 'Görü sıradan fotoğrafta nesne tanır; uzaktan algılama spektral imza ve konum bilgisiyle yeryüzünü haritalar.'),
        ('ZS', 'Zaman serisi analizi genel yöntemleri verir; uzaktan algılama aynı yerin yıllar boyu görüntüsünde değişimi izler.'),
        ('TGI', 'İkisi de görüntüyü fiziksel bir ölçüm olarak ele alır; tıbbi görüntü vücudu, uzaktan algılama yeryüzünü ölçer.'),
    ],
    uygulamalar=[
        ('Tarım', 'Ürün sağlığı, verim tahmini, sulama.'),
        ('Ormancılık', 'Yangın alanı, ormansızlaşma takibi.'),
        ('Afet yönetimi', 'Deprem ve sel sonrası hasar haritası.'),
        ('Kent planlama', 'Yapılaşma ve kentsel genişleme.'),
        ('İklim ve çevre', 'Buzul, deniz yüzeyi ve kuraklık izleme.'),
        ('Savunma', 'Keşif ve hedef bölgesi analizi.'),
    ],
    araclar=['Google Earth Engine', 'QGIS', 'GDAL', 'rasterio', 'ESA SNAP', 'TorchGeo'],
    veriler=['Landsat arşivi', 'Sentinel-1 ve Sentinel-2', 'EuroSAT', 'BigEarthNet', 'SpaceNet', 'UC Merced Land Use'],
    araclar_not='Uydu görüntüsü <b>bol ve ücretsizdir</b>, ama doğru etiket sınırlıdır: yer doğrulaması için sahaya gitmek gerekir.',
    yanilgilar=[
        ('Uydu görüntüsü sıradan bir renkli fotoğraftır.', 'Görüntüde gözün göremediği kızılötesi, termal ve radar bantları da vardır.'),
        ('Daha yüksek uzamsal çözünürlük hep daha iyidir.', 'Geniş alan ve sık tekrar için orta çözünürlük çoğu zaman daha uygundur.'),
        ('Bulut varsa uydu bir şey göremez.', 'Optik algılayıcı göremez; radar (SAR) bulutun ve gecenin içinden görür.'),
        ('Bu yalnızca bir görüntü işleme dersidir.', 'Algılayıcı fiziği, atmosfer, harita izdüşümü ve saha doğrulaması da dersin parçasıdır.'),
    ],
    meslekler=['Uzaktan algılama uzmanı', 'CBS uzmanı', 'Tarım teknolojileri mühendisi', 'Çevre ve iklim veri analisti', 'Harita mühendisi'],
    sonra=('Uzaktan algılama, görüntü işleme ve bilgisayarlı görünün yeryüzüne uygulanmasıdır; zaman serisi analizi ve '
           'büyük veri sistemleriyle birleşir. Buradan iklim ve tarım veri bilimine, coğrafi bilgi sistemlerine ya da '
           'derin öğrenmeyle uydu görüntüsü çözümlemeye geçilebilir.'),
    kaynaklar=[
        'Lillesand, Kiefer ve Chipman, <em>Remote Sensing and Image Interpretation</em>, 7. baskı, Wiley, 2015.',
        'Jensen, <em>Remote Sensing of the Environment: An Earth Resource Perspective</em>, 2. baskı, Pearson, 2007.',
        'Campbell ve Wynne, <em>Introduction to Remote Sensing</em>, 5. baskı, Guilford Press, 2011.',
        'Richards, <em>Remote Sensing Digital Image Analysis</em>, 5. baskı, Springer, 2013.',
    ],
    islenenler=[
        'Elektromanyetik ışınım ve yüzeyle etkileşimi',
        'Algılayıcılar, platformlar ve çözünürlük türleri',
        'Radyometrik ve atmosferik düzeltme',
        'Geometrik düzeltme, koordinat sistemleri, izdüşüm',
        'Görüntü iyileştirme ve renk bileşimleri',
        'Spektral indeksler: NDVI, NDWI',
        'Denetimli ve denetimsiz arazi sınıflandırması',
        'Doğruluk değerlendirmesi ve yer doğrulaması',
        'Değişim tespiti ve zaman serisi çözümlemesi',
        'Termal algılama ve LiDAR',
        'Radar (SAR) görüntüleri ve interferometri',
        'Uydu görüntüsünde derin öğrenme',
    ],
    beceriler=['QGIS ile raster ve vektör katmanlar', 'Google Earth Engine ile zaman serisi', 'GDAL ve rasterio ile görüntü işlemek',
               'doğruluk tablolu arazi haritası', 'NDVI gibi indeksleri yorumlamak'],
    hazirlik=[
        ('Elektromanyetik tayfın görünür ve kızılötesi bölgelerini açıklayabiliyor musun?', 'Lise fiziğindeki elektromanyetik dalgalar konusu'),
        ('Enlem-boylam ile izdüşümlü (metre) koordinat farkını açıklayabiliyor musun?', 'QGIS ile kısa bir CBS giriş eğitimi'),
        ('Bir görüntüye histogram ve eşikleme uygulayabiliyor musun?', '@GI'),
        ('Bir sınıflandırıcı eğitip karışıklık matrisini yorumlayabiliyor musun?', '@MO'),
    ],
    riskler=[
        ('Gözetim ve mahremiyet', 'Yüksek çözünürlüklü uydu ve İHA görüntüsü, kişilerin evini, aracını ve hareketlerini izinsiz izlemeye yarayabilir.'),
        ('Yer doğrulamasız harita', 'Sahada denetlenmemiş bir sınıflandırma haritası, yüksek doğruluk raporlasa da tarım ya da afet kararını yanıltabilir.'),
        ('Bulut ve gölge', 'Maskelenmeyen bulut ve gölgeler, değişim tespitinde sahte orman kaybı ya da sel gibi görünür.'),
        ('Aktarılamayan model', 'Avrupa verisiyle eğitilen model başka iklim ve tarım düzeninde sessizce yanılır; her bölgede yeniden doğrulanmalı.'),
    ],
)
