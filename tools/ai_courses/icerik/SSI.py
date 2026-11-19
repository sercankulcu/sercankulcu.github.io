# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 16: Sayısal Sinyal İşleme dersinin tanıtımı; örnekleme, evrişim, '
             'Fourier dönüşümü, süzgeç tasarımı, kısa tarihçe, ön koşullar, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Örnekleme', 'Doğrusal sistemler', 'Fourier ve FFT', 'Süzgeç tasarımı', 'Spektral analiz', 'Komşu dersler'],
    tanim=('Sayısal sinyal işleme, belirli aralıklarla <b>örneklenmiş</b> ses, titreşim, EKG ya da radyo sinyallerini '
           'matematiksel dönüşümlerle çözümler, süzer ve dönüştürür. Ders öğrenmeye değil kesin matematiğe dayanır; '
           'ses, görüntü ve haberleşme derslerinin ortak temelidir.'),
    tarihce=[
        ('1822', 'Fourier, ısı üzerine kitabında fonksiyonları sinüslerin toplamı olarak yazmayı önerir.'),
        ('1949', 'Shannon örnekleme kuramını yayımlar: bant sınırlı sinyal, yeterli hızla örneklenirse tam geri kazanılır.'),
        ('1965', 'Cooley ve Tukey hızlı Fourier dönüşümünü (FFT) yayımlar; spektrum hesabı pratik hâle gelir.'),
        ('1974', 'Ahmed, Natarajan ve Rao ayrık kosinüs dönüşümünü (DCT) tanıtır; JPEG ve MP3 bunun üzerine kurulur.'),
        ('1975', 'Oppenheim ve Schafer\'in Digital Signal Processing kitabı çıkar; alan bir ders olarak yerleşir.'),
        ('1978', 'Texas Instruments\'ın Speak &amp; Spell oyuncağı, tek yongada sayısal konuşma sentezini evlere taşır.'),
    ],
    kavramlar=[
        ('Örnekleme', 'Sürekli sinyali eşit aralıklarla ölçüp sayı dizisine çevirmek.'),
        ('Nyquist ölçütü', 'En yüksek frekansın iki katından hızlı örnekle.'),
        ('Örtüşme (aliasing)', 'Yetersiz örneklemede yüksek frekansın alçak görünmesi.'),
        ('Nicemleme', 'Genliği sınırlı sayıda düzeye yuvarlamak; bit derinliği.'),
        ('Evrişim', 'Doğrusal, zamanla değişmeyen sistemin girdiye yanıtı.'),
        ('Fourier ve FFT', 'Sinyali frekans bileşenlerine ayırmanın hızlı yolu.'),
        ('FIR ve IIR süzgeç', 'Alçak, yüksek ve bant geçiren sayısal süzgeçler.'),
        ('z-dönüşümü', 'Süzgecin kutup ve sıfırları; kararlılık çözümlemesi.'),
    ],
    akis=[('Örnekle', 'ADC, örnekleme\nhızı'), ('Dönüştür', 'FFT,\nspektrum'), ('Süz', 'FIR / IIR\nsüzgeç'),
          ('Çözümle', 'tepe, enerji,\nöznitelik'), ('Geri\ndönüştür', 'DAC ya da\nsonraki adım')],
    akis_ornek=('<b>Örnek:</b> Bir EKG cihazı kalp sinyalini saniyede 360 kez örnekler. Spektrumda 50 Hz şebeke gürültüsü '
                'görülür; bir çentik süzgeci yalnız bu frekansı bastırır. Temizlenen sinyalde R tepeleri bulunur ve '
                'aralarındaki süreden kalp hızı hesaplanır. Hiçbir adımda öğrenme yoktur.'),
    onkosul_ek=[
        ('Analiz (Kalkülüs)', 'integral, seriler ve karmaşık sayılar: Fourier dönüşümünün dili', None),
        ('Diferansiyel Denklemler', 'doğrusal sistemlerin davranışı ve kararlılığı', None),
        ('C ile Programlama', 'gerçek zamanlı süzgeçleri gömülü cihazlarda yazmak için', '/teaching/programming-with-c/'),
    ],
    ayrisma=[
        ('GI', 'Sinyal işleme bir boyutlu, zamana bağlı sinyalle çalışır; görüntü işleme aynı araçları iki boyutlu piksel ızgarasına taşır.'),
        ('KSI', 'Sinyal işleme genel araçları verir; konuşma tanıma bunları dil modeli ve öğrenmeyle birleştirip sözcük çıkarır.'),
        ('ZS', 'İkisi de zamana bağlı veriye bakar; zaman serisi analizi tahmin ve istatistik, sinyal işleme frekans ve süzgeç ister.'),
        ('BK', 'Bilgi kuramı bilginin ölçüsünü ve sıkıştırmanın sınırını, sinyal işleme sinyali somut olarak işleyen algoritmaları verir.'),
    ],
    uygulamalar=[
        ('Ses ve müzik', 'Ekolayzer, gürültü bastırma, MP3 sıkıştırma.'),
        ('Haberleşme', 'Modem, Wi-Fi, 4G/5G modülasyonu.'),
        ('Biyomedikal', 'EKG, EEG süzme ve tepe bulma.'),
        ('Radar ve sonar', 'Yankıdan mesafe ve hız ölçmek.'),
        ('Titreşim izleme', 'Makinelerde arızayı spektrumdan sezmek.'),
        ('Görüntü ve video', 'JPEG ve video kodlamadaki dönüşümler.'),
    ],
    araclar=['MATLAB', 'GNU Octave', 'NumPy', 'SciPy (scipy.signal)', 'librosa', 'GNU Radio'],
    veri_baslik='Örnek sinyaller ve veri setleri',
    veriler=['MIT-BIH Aritmi (EKG)', 'PhysioNet', 'TIMIT (konuşma)', 'CWRU yatak titreşim verisi', 'Sentetik sinüs ve gürültü'],
    araclar_not='Derste çoğu zaman <b>sentetik sinyal</b> yeterlidir: bilinen frekansları toplayıp gürültü eklemek, süzgecin ne yaptığını açıkça gösterir.',
    yanilgilar=[
        ('Örnekleme hızı arttıkça hep daha iyi olur.', 'Nyquist sınırını aşınca bilgi artmaz; yalnız veri ve hesap yükü artar.'),
        ('FFT, Fourier dönüşümünden farklı bir dönüşümdür.', 'FFT, ayrık Fourier dönüşümünü (DFT) hızlı hesaplayan bir algoritmadır; sonuç aynıdır.'),
        ('Süzgeç gürültüyü sinyalden ayırt edip siler.', 'Süzgeç frekansa göre ayırır; gürültü sinyalle aynı bantta ise süzgeç onu ayıramaz.'),
        ('Derin öğrenme geldi, sinyal işleme eskidi.', 'Ses ve sensör modellerinin girdisi çoğu zaman spektrogram ya da süzülmüş sinyaldir.'),
    ],
    meslekler=['DSP mühendisi', 'Ses yazılım mühendisi', 'Haberleşme mühendisi', 'Gömülü sistem mühendisi', 'Biyomedikal mühendisi'],
    sonra=('Sayısal sinyal işleme üçüncü kısmın kapısıdır: iki boyuta genişleyince görüntü işleme, dil modeliyle birleşince '
           'konuşma tanıma olur. Zaman serisi analizi ve bilgi kuramı da onun araçlarını kullanır. Donanım tarafında gömülü '
           'yapay zekâ ve haberleşmeye geçilebilir.'),
    kaynaklar=[
        'Oppenheim ve Schafer, <em>Discrete-Time Signal Processing</em>, 3. baskı, Pearson, 2010.',
        'Proakis ve Manolakis, <em>Digital Signal Processing: Principles, Algorithms, and Applications</em>, 4. baskı, Pearson, 2007.',
        'Smith, <em>The Scientist and Engineer\'s Guide to Digital Signal Processing</em>, California Technical Publishing, 1997.',
        'Cooley ve Tukey, "An Algorithm for the Machine Calculation of Complex Fourier Series", <em>Mathematics of Computation</em> 19(90), 1965.',
    ],
)
