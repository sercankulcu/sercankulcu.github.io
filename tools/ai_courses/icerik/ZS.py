# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 29: Zaman Serisi Analizi ve Tahmin dersinin tanıtımı; eğilim, '
             'mevsimsellik, durağanlık, ARIMA, derin tahmin, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Eğilim ve mevsim', 'Durağanlık', 'ARIMA ve düzleştirme', 'Derin tahmin', 'Değerlendirme', 'Komşu dersler'],
    tanim=('Zaman serisi analizi, sırası önemli olan ölçümleri inceler: dünkü değer bugünkünü etkiler. Ders seriyi '
           'eğilim, mevsimsellik ve gürültüye ayırmayı, <b>öz ilintiyi</b> modellemeyi ve geleceği belirsizliğiyle '
           'birlikte tahmin etmeyi öğretir.'),
    tarihce=[
        ('1927', 'Yule, güneş lekesi sayılarını özbağlanımlı (AR) bir modelle açıklar.'),
        ('1960', 'Kalman filtresi yayımlanır: gürültülü ölçümlerden gizli durumu adım adım kestirir.'),
        ('1970', 'Box ve Jenkins\'in kitabı ARIMA modellerini ve kurma yöntemini yerleştirir.'),
        ('1982', 'Engle, oynaklığın zamanla değiştiği ARCH modelini önerir.'),
        ('1997', 'Hochreiter ve Schmidhuber LSTM\'yi tanıtır; uzun bağımlılıklar öğrenilebilir olur.'),
        ('2017', 'Facebook, mevsimsellik ve tatilleri ayrıştıran Prophet kütüphanesini açık kaynak yapar.'),
    ],
    kavramlar=[
        ('Eğilim ve mevsimsellik', 'Uzun vadeli yön ve düzenli yinelenen döngüler.'),
        ('Durağanlık', 'Ortalama ve varyansın zamanla değişmemesi.'),
        ('Öz ilinti (ACF)', 'Serinin kendi geçmiş değerleriyle ilintisi.'),
        ('Fark alma', 'Eğilimi silip seriyi durağan yapmak.'),
        ('ARIMA', 'Özbağlanım, fark alma ve hareketli ortalama birlikte.'),
        ('Üstel düzleştirme', 'Yakın geçmişe daha çok ağırlık veren tahmin.'),
        ('Tahmin aralığı', 'Tek sayı değil, belirsizliğiyle birlikte tahmin.'),
        ('Zamana göre bölme', 'Test hep eğitimden sonra gelir; karıştırılmaz.'),
    ],
    akis=[('Görselleştir', 'çizim,\nayrıştırma'), ('Dönüştür', 'fark alma,\nlogaritma'), ('Model seç', 'ACF, PACF,\nAIC'),
          ('Kaydırarak\ndoğrula', 'zamana göre\nbölme'), ('Tahmin et', 'nokta ve\naralık')],
    akis_ornek=('<b>Örnek:</b> Bir elektrik şirketi saatlik tüketimi çizer, günlük ve haftalık döngüleri ayırır, sıcaklığı '
                'da girdi alan bir model kurar, geçmiş haftalar üzerinde kaydırarak sınar ve ertesi günün yükünü '
                'yüzde 95 tahmin aralığıyla verir.'),
    onkosul_ek=[
        ('Analiz (Kalkülüs)', 'seriler, türev ve integral: modellerin ve süzgeçlerin dili', None),
        ('Programlama', 'Python ile dosya okuma, tarih işleme ve çizim', '/teaching/computer-and-introduction-to-programming/'),
    ],
    ayrisma=[
        ('OI', 'İstatistik çoğunlukla bağımsız gözlem varsayar; bu ders gözlemlerin birbirine bağlı olduğu sıralı veriyle uğraşır.'),
        ('SSI', 'Sinyal işleme sinyali süzer ve frekansına bakar; bu ders aynı araçları geleceği tahmin etmek için kullanır.'),
        ('DO', 'Derin öğrenme tahmin için güçlü bir model ailesi verir; bu ders ne zaman basit bir modelin yeteceğini de öğretir.'),
        ('MO', 'MÖ örnekleri karıştırıp rastgele böler; bu derste zaman sırası bozulmaz, model yalnız geçmişle eğitilir.'),
    ],
    uygulamalar=[
        ('Talep tahmini', 'Satış, stok ve üretim planlaması.'),
        ('Enerji yükü', 'Elektrik tüketimi ve yenilenebilir üretim.'),
        ('Finans', 'Oynaklık, risk ve getiri modelleri.'),
        ('Hava ve iklim', 'Sıcaklık, yağış ve CO₂ serileri.'),
        ('Anomali tespiti', 'Sunucu ve sensör ölçümlerinde sapma.'),
        ('Ekonomi', 'Enflasyon, işsizlik ve büyüme tahmini.'),
    ],
    araclar=['pandas', 'statsmodels', 'Prophet', 'sktime', 'Darts', 'R forecast / fable'],
    veriler=['Hava yolu yolcuları (Box-Jenkins)', 'Güneş lekesi sayıları', 'M4 ve M5 yarışmaları', 'UCI Electricity Load Diagrams',
             'Mauna Loa CO₂ ölçümleri', 'Jena iklim verisi'],
    yanilgilar=[
        ('Zaman serisi verisi rastgele bölünerek sınanabilir.', 'Gelecekteki değerler eğitime sızar; sınama hep zaman sırasına göre yapılır.'),
        ('Derin ağlar her seride klasik modelleri geçer.', 'M yarışmalarında basit ve istatistiksel yöntemler çoğu zaman çok güçlü çıkmıştır.'),
        ('İyi model tek bir doğru sayı verir.', 'Tahmin belirsizdir; karar için <b>tahmin aralığı</b> en az nokta tahmini kadar önemlidir.'),
        ('Geçmişte işleyen model hep işler.', 'Yapısal kırılmalar (salgın, kriz) seriyi değiştirir; model izlenip yenilenmelidir.'),
    ],
    meslekler=['Tahmin analisti', 'Veri bilimci', 'Kantitatif analist', 'Talep planlama uzmanı', 'Enerji veri analisti'],
    sonra=('Bu dersten sonra sinyal işlemeyle frekans çözümlemesine, derin öğrenmeyle dönüştürücü tabanlı tahmine, '
           'uzaktan algılamayla çok zamanlı uydu görüntülerine geçilebilir. Ekonometri ve durum uzayı modelleri de '
           'doğal devam yollarıdır.'),
    kaynaklar=[
        'Hyndman ve Athanasopoulos, <em>Forecasting: Principles and Practice</em>, 3. baskı, OTexts, 2021.',
        'Box, Jenkins, Reinsel ve Ljung, <em>Time Series Analysis: Forecasting and Control</em>, 5. baskı, Wiley, 2015.',
        'Shumway ve Stoffer, <em>Time Series Analysis and Its Applications</em>, 4. baskı, Springer, 2017.',
        'Brockwell ve Davis, <em>Introduction to Time Series and Forecasting</em>, 3. baskı, Springer, 2016.',
    ],
    islenenler=[
        'Seri bileşenleri: eğilim, mevsimsellik, gürültü',
        'Görselleştirme ve STL ayrıştırması',
        'Durağanlık, fark alma ve birim kök testleri',
        'Öz ilinti ve kısmi öz ilinti (ACF, PACF)',
        'Üstel düzleştirme ve Holt-Winters',
        'AR, MA ve ARMA modelleri',
        'ARIMA ve mevsimsel ARIMA (SARIMA)',
        'Dışsal değişkenli regresyon ve dinamik modeller',
        'Tahmin değerlendirme ve kaydırmalı doğrulama',
        'Oynaklık modelleri: ARCH ve GARCH',
        'Durum uzayı modelleri ve Kalman filtresi',
        'Makine öğrenmesi ve derin ağlarla tahmin',
    ],
    beceriler=[
        'pandas ile tarih indeksli veri',
        'statsmodels ile ARIMA kurmak',
        'Prophet ve sktime',
        'kaydırmalı doğrulama tasarlamak',
        'tahmin aralığı vermek ve yorumlamak',
    ],
    hazirlik=[
        ('Ortalama, varyans ve ilinti katsayısını açıklayabiliyor musun?', '@OI'),
        ('Doğrusal regresyon kurup katsayılarını yorumlayabiliyor musun?', '@MO'),
        ('Geometrik bir serinin toplamını hesaplayabiliyor musun?', 'Analiz dersindeki diziler ve seriler konusu'),
        ("Python'da tarih sütunlu bir CSV dosyasını okuyup çizebiliyor musun?", "Programlamaya giriş, ardından pandas'a kısa bir giriş"),
    ],
    riskler=[
        ('Geleceğe sızan bilgi', 'Rastgele bölme ya da bütün seriyle yapılan ölçekleme gelecekteki değerleri eğitime taşır; sınamadaki başarı sahte çıkar.'),
        ('Yapısal kırılma', '2020 salgınında talep ve trafik serileri birden değişti; geçmişe iyi uyan modeller haftalarca yanlış tahmin verdi.'),
        ('Aralığı olmayan tahmin', 'Tek sayıyla verilen tahmin kesinlik izlenimi verir; stok ya da enerji kararı belirsizlik bilinmeden alınır.'),
        ('Davranışı değiştiren tahmin', 'Herkes aynı fiyat ya da talep tahminine göre davranınca seri değişir; tahmin kendini doğrulayabilir ya da bozabilir.'),
    ],
)
