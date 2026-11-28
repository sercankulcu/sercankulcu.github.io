# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 36: Gömülü Yapay Zekâ dersinin tanıtımı; kaynak kısıtları, '
             'nicemleme, budama, damıtma, verimli mimariler, TinyML, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Kaynak kısıtları', 'Nicemleme', 'Budama ve damıtma', 'Verimli mimariler', 'Cihaz ve hızlandırıcı', 'Komşu dersler'],
    tanim=('Gömülü yapay zekâ, eğitilmiş modelleri telefon, kamera ya da mikrodenetleyici gibi belleği, işlem gücü ve '
           'enerjisi kısıtlı cihazlarda çalıştırmayı inceler. Ders modeli <b>nicemleme</b>, budama ve damıtmayla '
           'küçültmeyi, cihaza taşımayı ve gecikmeyle enerjiyi ölçmeyi kapsar; en uç biçimine TinyML denir.'),
    tarihce=[
        ('2015', 'Hinton, Vinyals ve Dean bilgi damıtmayı tanıtır: büyük modelin bilgisi küçük modele aktarılır.'),
        ('2016', 'Han ve ark. Deep Compression ile budama ve nicemlemeyi birleştirip ağları onlarca kat küçültür.'),
        ('2017', 'MobileNets yayımlanır, TensorFlow Lite duyurulur: telefonda derin ağ çalıştırmak olağanlaşır.'),
        ('2018', 'Google, uç cihazlar için Edge TPU hızlandırıcısını duyurur.'),
        ('2019', 'İlk tinyML zirvesi yapılır; Warden ve Situnayake TinyML kitabını yayımlar.'),
        ('2020', 'MCUNet, ImageNet sınıflandırmasını bir mikrodenetleyicide %70\'in üzerinde doğrulukla çalıştırır.'),
    ],
    kavramlar=[
        ('Nicemleme', '32 bit kayan nokta yerine 8 bit ya da daha az tamsayı.'),
        ('Budama', 'Önemsiz ağırlık, kanal ya da katmanları atmak.'),
        ('Bilgi damıtma', 'Küçük öğrenci model büyük öğretmeni taklit eder.'),
        ('Verimli mimariler', 'MobileNet, derinlemesine ayrılabilir evrişim.'),
        ('Çıkarım motoru', 'Modeli cihazda çalıştıran küçük yazılım katmanı.'),
        ('Hızlandırıcılar', 'NPU, DSP, Edge TPU: sinir ağına özel donanım.'),
        ('Bellek bütçesi', 'Birkaç yüz KB SRAM ve flash: ağırlık ve ara sonuçlar.'),
        ('Gecikme ve enerji', 'Doğruluk kadar önemli iki başarım ölçütü.'),
    ],
    akis=[('Eğit', 'sunucuda,\ntam duyarlık'), ('Küçült', 'nicemleme,\nbudama'), ('Dönüştür', 'TFLite, ONNX'),
          ('Cihaza\nyükle', 'MCU, telefon,\nkamera'), ('Çalıştır\nve ölç', 'gecikme,\nenerji')],
    akis_ornek=('<b>Örnek:</b> Anahtar sözcük algılayan küçük bir ağ bilgisayarda 32 bitlik kayan noktayla eğitilir, '
                '8 bitlik tamsayıya nicemlenir ve birkaç yüz kilobayt belleği olan bir mikrodenetleyiciye yüklenir. '
                'Cihaz mikrofonu sürekli dinler, sesi buluta göndermez ve çok az güç harcar.'),
    onkosul_ek=[
        ('Mikroişlemciler', 'bellek, yazmaç, kesme ve çevre birimleri: cihazın kısıtlarını anlamak', '/teaching/microprocessors/'),
        ('C ile Programlama', 'gömülü yazılımın dili; işaretçiler ve sabit bellek yönetimi', '/teaching/programming-with-c/'),
    ],
    ayrisma=[
        ('DO', 'Derin öğrenme doğruluk için modeli büyütür; bu ders aynı modeli doğruluğu az kaybederek küçültür.'),
        ('GPU', 'GPU programlama büyük hızlandırıcılardan en yüksek başarımı alır; bu ders birkaç miliwatt ile çalışan cihazlarda çıkarım yapar.'),
        ('MLOPS', 'MLOps modeli sunucularda dağıtır ve izler; bu ders modeli bağlantısı olmayabilen cihazların içine yerleştirir.'),
        ('ROB', 'Robotik algı, konum ve hareketi bütün olarak ele alır; bu ders robottaki modelin gerçek zamanda çalışmasını sağlar.'),
    ],
    uygulamalar=[
        ('Uyandırma sözcüğü', 'Hoparlör ve telefonda sürekli dinleyen model.'),
        ('Akıllı kamera', 'Görüntüyü buluta göndermeden nesne algılama.'),
        ('Giyilebilir cihazlar', 'Saatte düşme, adım ve kalp ritmi analizi.'),
        ('Kestirimci bakım', 'Motor titreşiminden arıza belirtisi yakalamak.'),
        ('Telefonda YZ', 'Fotoğraf iyileştirme, çevrimdışı çeviri.'),
        ('Tarım ve çevre', 'Pille çalışan sensörlerde ses ve zararlı böcek tespiti.'),
    ],
    araclar=['TensorFlow Lite', 'ONNX Runtime', 'ExecuTorch', 'Edge Impulse', 'CMSIS-NN', 'Arduino', 'NVIDIA Jetson'],
    veriler=['Speech Commands', 'Visual Wake Words', 'MNIST', 'CIFAR-10', 'ImageNet', 'MLPerf Tiny'],
    araclar_not='Başarı yalnız doğrulukla ölçülmez: aynı tabloya model boyutu, tepe bellek, gecikme ve enerji de yazılır.',
    yanilgilar=[
        ('Küçük cihazda model eğitilir.', 'Eğitim çoğunlukla sunucuda yapılır; cihazda yalnızca çıkarım çalışır.'),
        ('Nicemleme doğruluğu mutlaka bozar.', '8 bitlik nicemleme çoğu modelde doğruluğu çok az düşürür; nicemlemeye duyarlı eğitim kaybı daha da azaltır.'),
        ('Daha az parametre, daha hızlı modeldir.', 'Hız bellek erişimine, işlem türüne ve donanım desteğine bağlıdır; parametre sayısı yetmez.'),
        ('Gömülü YZ yalnız internet yoksa gerekir.', 'Gizlilik, gecikme ve enerji için bağlantı olsa bile veriyi cihazda işlemek tercih edilir.'),
    ],
    meslekler=['Gömülü yazılım mühendisi', 'Uç YZ mühendisi', 'Makine öğrenmesi mühendisi',
               'Donanım-yazılım tasarımcısı', 'IoT çözüm mimarı'],
    sonra=('Gömülü YZ, derin öğrenmeyi donanıma bağlar: buradan robotik, otonom araçlar ve nesnelerin interneti '
           'uygulamalarına geçilir. Donanımda derinleşmek isteyenler için hızlandırıcı tasarımı ve derleyiciler, '
           'yazılımda ise MLOps ile cihaz filolarının güncellenmesi sonraki adımlardır.'),
    kaynaklar=[
        'Warden ve Situnayake, <em>TinyML</em>, O\'Reilly, 2019.',
        'Sze, Chen, Yang ve Emer, <em>Efficient Processing of Deep Neural Networks</em>, Morgan &amp; Claypool, 2020.',
        'Han, Mao ve Dally, "Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding", <em>ICLR</em>, 2016.',
        'Howard ve ark., "MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications", <em>arXiv:1704.04861</em>, 2017.',
        'Hinton, Vinyals ve Dean, "Distilling the Knowledge in a Neural Network", <em>arXiv:1503.02531</em>, 2015.',
    ],
    islenenler=[
        'Gömülü donanım: MCU, bellek ve enerji bütçesi',
        'Sensör verisi toplama ve ön işleme',
        'Küçük sinir ağları ve verimli mimariler',
        'Eğitim sonrası nicemleme',
        'Nicemlemeye duyarlı eğitim',
        'Budama ve seyrek ağlar',
        'Bilgi damıtma',
        'Model dönüştürme: TensorFlow Lite ve ONNX',
        'Mikrodenetleyicide çıkarım: TFLite Micro, CMSIS-NN',
        'Hızlandırıcılar: NPU, DSP ve Edge TPU',
        'Gecikme, bellek ve enerji ölçümü; MLPerf Tiny',
        'Cihazda öğrenme ve uzaktan model güncelleme',
    ],
    beceriler=['TensorFlow Lite ile model dönüştürmek', '8 bitlik nicemleme uygulamak', 'Arduino\'ya model yüklemek', 'Edge Impulse ile uçtan uca proje', 'gecikme, bellek ve enerji ölçmek'],
    hazirlik=[
        ('Bir evrişimli ağı eğitip doğrulama doğruluğunu raporlayabiliyor musun?', '@DO'),
        ('C\'de işaretçilerle ve dinamik bellek ayırmadan kod yazabiliyor musun?', 'C ile Programlama dersi'),
        ('Bir mikrodenetleyiciye program yükleyip sensörden veri okuyabiliyor musun?', 'Mikroişlemciler dersi ve bir Arduino başlangıç seti'),
        ('Bir sayının 8 bitlik tamsayıyla nasıl temsil edildiğini açıklayabiliyor musun?', 'Sayısal tasarımdaki ikili sayılar ve sabit nokta'),
    ],
    riskler=[
        ('Küçültmenin gizli bedeli', 'Nicemleme ve budamada ortalama doğruluk az düşer ama nadir sınıflar ve azınlık gruplar orantısız kayıp yaşayabilir.'),
        ('Güncellenemeyen cihaz', 'Sahaya dağılmış binlerce cihazdaki hatalı ya da açığı olan model kolayca geri çağrılamaz.'),
        ('Fark edilmeyen gözetim', 'Sürekli dinleyen mikrofon ve kameralar, veri cihazda kalsa bile çevredekileri habersizce izleyebilir.'),
        ('Model çalınması', 'Cihazdaki model dosyası okunup kopyalanabilir; tersine mühendislikle düşmanca saldırılara da açık hâle gelir.'),
    ],
)
