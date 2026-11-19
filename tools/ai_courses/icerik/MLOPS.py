# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 35: Makine Öğrenmesi Sistemleri ve MLOps dersinin tanıtımı; '
             'model yaşam döngüsü, sürümleme, dağıtım, izleme, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Yaşam döngüsü', 'Sürümleme', 'Dağıtım', 'İzleme ve kayma', 'Otomasyon', 'Komşu dersler'],
    tanim=('MLOps, makine öğrenmesi modellerini üretime taşıyıp orada güvenilir biçimde çalıştırmak için yazılım '
           'mühendisliği ve DevOps alışkanlıklarını MÖ\'ye uygular. Ders veriyi, kodu ve modeli birlikte sürümlemeyi, '
           '<b>boru hattını</b> otomatikleştirmeyi, dağıtmayı ve üretimdeki modeli izlemeyi inceler.'),
    tarihce=[
        ('2009', 'İlk DevOpsDays Ghent\'te yapılır; geliştirme ve işletmeyi birleştiren DevOps akımı yayılır.'),
        ('2014', 'Docker 1.0 yayımlanır, Kubernetes duyurulur: kapsayıcılar dağıtımın ortak birimi olur.'),
        ('2015', 'Sculley ve ark. MÖ sistemlerindeki gizli teknik borcu gösterir: model kodu sistemin küçük bir parçasıdır.'),
        ('2017', 'Google TFX\'i, Uber Michelangelo\'yu tanıtır; şirket içi MÖ platformları görünür olur.'),
        ('2018', 'Databricks MLflow\'u açık kaynak olarak duyurur: deney takibi ve model kaydı.'),
        ('2021', 'Andrew Ng veri merkezli YZ çağrısını yapar: modelden çok veri kalitesine odaklanmak.'),
    ],
    kavramlar=[
        ('Boru hattı', 'Veri hazırlamadan dağıtıma kadar otomatik adımlar.'),
        ('Sürümleme', 'Veri, kod ve modelin birlikte izlenmesi ve geri alınması.'),
        ('Deney takibi', 'Her eğitimin parametre, ölçüt ve çıktısını kaydetmek.'),
        ('Model kaydı', 'Onaylı model sürümlerinin tek bir yerde tutulması.'),
        ('Öznitelik deposu', 'Eğitim ve üretimde aynı özniteliklerin kullanılması.'),
        ('CI/CD/CT', 'Sürekli tümleştirme, dağıtım ve sürekli yeniden eğitim.'),
        ('Model sunma', 'Çevrimiçi API ya da toplu tahmin işi olarak çalıştırma.'),
        ('Veri kayması', 'Üretim verisinin eğitimdekinden uzaklaşması; izlenmeli.'),
    ],
    akis=[('Veriyi\nhazırla', 'sürümlü\nveri seti'), ('Eğit ve\nkaydet', 'deney takibi,\nmodel kaydı'),
          ('Paketle', 'kapsayıcı,\nAPI'), ('Dağıt', 'kanarya,\nA/B testi'), ('İzle', 'kayma,\nyeniden eğitim')],
    akis_ornek=('<b>Örnek:</b> Bir bankanın kredi modeli her ay yeni başvurularla yeniden eğitilir. Kayda geçen en iyi '
                'sürüm bir kapsayıcıya paketlenir, önce trafiğin küçük bir kısmına açılır, sorun çıkmazsa herkese '
                'yayılır. Başvuru dağılımı kaydığında izleme panosu ekibi uyarır ve döngü yeniden başlar.'),
    onkosul_ek=[
        ('İşletim Sistemleri', 'süreçler, bellek ve kaynak yönetimi: kapsayıcıların dayandığı kavramlar', '/teaching/operating-systems/'),
        ('Nesneye Yönelik Programlama', 'modüler ve test edilebilir kod yazma alışkanlığı', '/teaching/object-oriented-programming-with-java/'),
        ('Yazılım Mühendisliği', 'sürüm denetimi (Git), test ve sürekli tümleştirme', None),
    ],
    ayrisma=[
        ('MO', 'MÖ iyi bir model kurmayı öğretir; bu ders o modelin üretimde aylarca güvenilir çalışmasını sağlamayı öğretir.'),
        ('BV', 'Büyük veri sistemleri veriyi ölçekli saklar ve işler; bu ders o veriyle eğitilen modelin yaşam döngüsünü yönetir.'),
        ('VB', 'Veri bilimi bir soruyu yanıtlayan analiz yapar; bu ders sürekli çalışan, izlenen ve yenilenen bir hizmet kurar.'),
        ('GYZ', 'Gömülü YZ modeli küçük bir cihaza sığdırır; bu ders modeli sunucularda dağıtır, sürümler ve izler.'),
    ],
    uygulamalar=[
        ('Öneri hizmetleri', 'Günde milyonlarca isteğe yanıt veren modeller.'),
        ('Sahtekârlık tespiti', 'Milisaniyede karar, sık yeniden eğitim.'),
        ('Talep tahmini', 'Her gece çalışan toplu tahmin işleri.'),
        ('Arama sıralaması', 'A/B testiyle sürekli denenen modeller.'),
        ('Kredi riski', 'Denetlenebilir, sürümlü ve izlenen modeller.'),
        ('Dil modeli hizmetleri', 'Büyük modellerin ölçekli ve maliyetli sunumu.'),
    ],
    araclar=['MLflow', 'DVC', 'Docker', 'Kubernetes', 'Kubeflow', 'Apache Airflow', 'Prometheus'],
    veri_baslik='Klasik örnek senaryolar',
    veriler=['Aylık yeniden eğitilen kredi modeli', 'Gece çalışan talep tahmini', 'Gerçek zamanlı sahtekârlık sunumu',
             'A/B testli öneri modeli', 'Veri kayması benzetimi', 'Hatalı sürümü geri alma'],
    araclar_not='Ders bir algoritma değil bir <b>süreç</b> öğretir: küçük bir model eğitimden izlemeye kadar uçtan uca bir boru hattına dönüştürülür.',
    yanilgilar=[
        ('Model eğitilince iş biter.', 'Üretimde veri değişir; izlenmeyen model zamanla sessizce kötüleşir.'),
        ('MLOps yalnızca araç kurmaktır.', 'Araçlar süreci destekler; asıl iş sürümleme, test, sorumluluk ve geri alma düzenidir.'),
        ('Test doğruluğu yüksekse üretimde de iyidir.', 'Üretim verisi eğitimdekinden farklı olabilir; gecikme ve maliyet de başarının parçasıdır.'),
        ('Bir MÖ sisteminin çoğu modeldir.', 'Model kodu; veri, yapılandırma, sunum ve izleme altyapısı yanında küçük bir parçadır.'),
    ],
    meslekler=['MLOps mühendisi', 'Makine öğrenmesi mühendisi', 'Veri mühendisi', 'Platform mühendisi',
               'Site güvenilirlik mühendisi (SRE)'],
    sonra=('MLOps rehberin sistem kısmının omurgasıdır: büyük veri sistemleri eğitim verisini, GPU programlama eğitim '
           'hızını, gömülü YZ ise uçtaki dağıtımı ele alır. Bu dersten sonra bulut platformları, dağıtık eğitim ya da '
           'büyük dil modellerinin sunumu doğal sonraki adımlardır.'),
    kaynaklar=[
        'Huyen, <em>Designing Machine Learning Systems</em>, O\'Reilly, 2022.',
        'Burkov, <em>Machine Learning Engineering</em>, True Positive Inc., 2020.',
        'Lakshmanan, Robinson ve Munn, <em>Machine Learning Design Patterns</em>, O\'Reilly, 2020.',
        'Sculley ve ark., "Hidden Technical Debt in Machine Learning Systems", <em>NeurIPS</em>, 2015.',
    ],
)
