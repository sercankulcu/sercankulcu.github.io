# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 34: Bilgi Kuramı dersinin tanıtımı; entropi, ortak bilgi, '
             'sıkıştırma, kanal kapasitesi, hata düzelten kodlar, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Entropi', 'Sıkıştırma', 'Kanal kapasitesi', 'Hata düzelten kodlar', 'MÖ\'deki ölçüler', 'Komşu dersler'],
    tanim=('Bilgi kuramı, bir mesajın taşıdığı bilgiyi olasılıkla ölçer: az beklenen olay daha çok bilgi taşır ve '
           'ortalama bilgi <b>entropi</b> ile ifade edilir. Ders, verinin en çok ne kadar sıkıştırılabileceğini ve '
           'gürültülü bir kanaldan ne hızla güvenle iletilebileceğini gösteren sınırları kurar.'),
    tarihce=[
        ('1928', 'Hartley bilgiyi olası mesaj sayısının logaritmasıyla ölçmeyi önerir.'),
        ('1948', 'Shannon, "A Mathematical Theory of Communication" ile entropiyi ve kanal kapasitesini tanımlar.'),
        ('1951', 'Kullback ve Leibler iki olasılık dağılımı arasındaki ıraksama ölçüsünü yayımlar.'),
        ('1952', 'Huffman, ortalama uzunluğu en kısa önek kodunu kuran algoritmayı yayımlar.'),
        ('1977', 'Lempel ve Ziv sözlük tabanlı LZ77 sıkıştırmasını yayımlar; ZIP ve PNG\'nin atası.'),
        ('1993', 'Turbo kodlar tanıtılır: pratik bir kod Shannon sınırına yarım desibel kadar yaklaşır.'),
    ],
    kavramlar=[
        ('Entropi', 'Bir kaynağın sembol başına ortalama bilgisi, bit cinsinden.'),
        ('Koşullu entropi', 'Bir değişken bilindiğinde ötekinde kalan belirsizlik.'),
        ('Ortak bilgi', 'İki değişkenin birbiri hakkında ne kadar bilgi taşıdığı.'),
        ('KL ıraksaması', 'Bir dağılımı ötekiyle kodlamanın fazladan maliyeti.'),
        ('Çapraz entropi', 'Sınıflandırmada en yaygın kayıp fonksiyonu.'),
        ('Kaynak kodlama', 'Kayıpsız sıkıştırma: Huffman, aritmetik kodlama, LZ.'),
        ('Kanal kapasitesi', 'Gürültülü kanaldan güvenle geçebilecek en yüksek hız.'),
        ('Hata düzelten kodlar', 'Artıklık ekleyerek hataları bulmak ve düzeltmek.'),
    ],
    akis=[('Kaynak', 'mesaj,\nolasılıklar'), ('Sıkıştır', 'kaynak\nkodlama'), ('Koru', 'kanal kodlama,\nartıklık'),
          ('Gönder', 'gürültülü\nkanal'), ('Çöz', 'hata düzeltme,\naçma')],
    akis_ornek=('<b>Örnek:</b> Telefonla gönderilen bir fotoğraf önce JPEG ile sıkıştırılır; ardından kablosuz ağın '
                'kanal kodu buna denetimli artıklık ekler. Havada bozulan bitler alıcıda bu artıklıkla düzeltilir ve '
                'fotoğraf açılır. Sıkıştırma ve koruma birbirinin tersi gibi görünse de ikisi de aynı kuramdan çıkar.'),
    onkosul_ek=[
        ('Ayrık Matematik', 'logaritma, kümeler, sayma ve ikili gösterim', None),
        ('Algoritmalar', 'açgözlü algoritmalar ve öncelik kuyruğu: Huffman kodunun kuruluşu', '/teaching/algorithms/'),
    ],
    ayrisma=[
        ('OI', 'Olasılık ve istatistik dağılımları ve belirsizliği tanımlar; bu ders aynı dağılımlardan bilgi miktarını ve iletim sınırlarını çıkarır.'),
        ('SSI', 'Sinyal işleme sinyali süzer ve dönüştürür; bu ders o sinyalin taşıyabileceği bilginin ve iletim hızının sınırını sorar.'),
        ('MO', 'MÖ çapraz entropiyi kayıp fonksiyonu olarak kullanır; bu ders o ölçünün nereden geldiğini ve ne anlama geldiğini açıklar.'),
        ('UM', 'Üretken modeller KL ıraksamasını eğitimde küçültür; bu ders ıraksamanın kendisini ve kod uzunluğuyla bağını inceler.'),
    ],
    uygulamalar=[
        ('Dosya sıkıştırma', 'ZIP, gzip ve PNG: kayıpsız sıkıştırma.'),
        ('Görüntü ve ses', 'JPEG ve MP3: kayıplı sıkıştırma.'),
        ('Mobil iletişim', '4G\'de turbo, 5G\'de LDPC ve polar kodlar.'),
        ('Veri depolama', 'QR kod, CD ve SSD\'de hata düzelten kodlar.'),
        ('Makine öğrenmesi', 'Çapraz entropi kaybı, karar ağacında bilgi kazancı.'),
        ('Öznitelik seçimi', 'Ortak bilgiyle en bilgilendirici öznitelikler.'),
    ],
    araclar=['Python', 'NumPy', 'SciPy', 'zlib', 'scikit-learn', 'MATLAB'],
    veri_baslik='Klasik örnek problemler',
    veriler=['Hileli zar ve yazı-tura', 'İkili simetrik kanal', 'İngilizce metnin entropisi', 'Huffman ağacı kurma',
             'Yirmi soru oyunu', 'Canterbury derlemi'],
    araclar_not='Bilgi kuramı çoğunlukla ispat ve hesapla çalışılır; kod, entropiyi ölçmek ve sıkıştırma oranını gerçek dosyalarda denemek için yazılır.',
    yanilgilar=[
        ('Bilgi, mesajın anlamıyla ölçülür.', 'Shannon bilgisi anlamla ilgilenmez; mesajın ne kadar beklenmedik olduğuyla, yani olasılıkla ölçülür.'),
        ('İyi bir program her dosyayı küçültebilir.', 'Hiçbir kayıpsız yöntem her girdiyi küçültemez; veri entropisinin altına sıkıştırılamaz.'),
        ('Gürültülü kanalda hatasız iletim imkânsızdır.', 'Kapasitenin altındaki hızlarda hata olasılığı istenildiği kadar küçültülebilir (Shannon).'),
        ('KL ıraksaması bir uzaklıktır.', 'Simetrik değildir ve üçgen eşitsizliğini sağlamaz: p\'den q\'ya ve q\'dan p\'ye değerler farklıdır.'),
    ],
    meslekler=['Haberleşme mühendisi', 'Sıkıştırma ve kodek geliştiricisi', 'Makine öğrenmesi araştırmacısı',
               'Kriptografi uzmanı', 'Veri depolama mühendisi'],
    sonra=('Bilgi kuramı, matematik temelinin MÖ\'ye açılan kapısıdır: çapraz entropi, KL ıraksaması ve ortak bilgi '
           'üretken modellerde, karar ağaçlarında ve temsil öğrenmede yeniden karşınıza çıkar. Haberleşme yönünde ise '
           'sayısal sinyal işleme ve kodlama kuramıyla devam edilir.'),
    kaynaklar=[
        'Cover ve Thomas, <em>Elements of Information Theory</em>, 2. baskı, Wiley, 2006.',
        'MacKay, <em>Information Theory, Inference, and Learning Algorithms</em>, Cambridge University Press, 2003.',
        'Shannon, "A Mathematical Theory of Communication", <em>Bell System Technical Journal</em> 27, 1948.',
        'Shannon ve Weaver, <em>The Mathematical Theory of Communication</em>, University of Illinois Press, 1949.',
    ],
    islenenler=[
        'Entropi, ortak ve koşullu entropi',
        'Ortak bilgi ve KL ıraksaması',
        'Jensen ve veri işleme eşitsizlikleri',
        'Tipik kümeler ve asimptotik eşbölüşüm (AEP)',
        'Kaynak kodlama teoremi ve Kraft eşitsizliği',
        'Huffman kodları ve aritmetik kodlama',
        'Evrensel sıkıştırma: Lempel-Ziv',
        'Kanal kapasitesi ve kanal kodlama teoremi',
        'Diferansiyel entropi ve sürekli değişkenler',
        'Gauss kanalı ve Shannon-Hartley formülü',
        'Hız-bozulma kuramı ve kayıplı sıkıştırma',
        'Hata düzelten kodlar: Hamming, LDPC',
    ],
    beceriler=[
        'entropi ve ortak bilgi hesaplamak',
        'Huffman kodlayıcısı yazmak',
        'zlib ile sıkıştırma ölçmek',
        'kanal kapasitesini hesaplamak',
        'eşitsizliklerle kanıt yazmak',
    ],
    hazirlik=[
        ('Logaritma kurallarını kullanıp 2 tabanında hesap yapabiliyor musun?', 'Lise matematiğindeki logaritma konusu'),
        ('Koşullu olasılığı ve beklenen değeri açıklayabiliyor musun?', '@OI'),
        ('Bir sayıyı ikili tabanda yazıp kaç bit gerektiğini bulabiliyor musun?', 'Ayrık matematikteki sayı tabanları'),
        ('Öncelik kuyruğu kullanan açgözlü bir algoritma yazabiliyor musun?', 'Algoritmalar dersindeki açgözlü yöntemler ve yığınlar'),
    ],
    riskler=[
        ('Az veriyle ortak bilgi', 'Az örnekte histogramla kestirilen ortak bilgi yukarı yanlıdır; ilgisiz bir öznitelik bilgilendirici görünür.'),
        ('Yanlış KL yönü', 'KL(p‖q) ile KL(q‖p) farklı modeller üretir: biri bütün kipleri örtmeye, öteki tek bir kipe kilitlenmeye iter.'),
        ('Sıkıştırmadan sızan sır', "Gizli veri ile saldırganın metni birlikte sıkıştırılınca boyut sırrı ele verir; TLS'e yönelik CRIME saldırısı buydu."),
        ('Bağımsızlık varsayımı', 'Sembolleri bağımsız saymak entropiyi olduğundan büyük gösterir; sıkıştırma ve rastgelelik değerlendirmesi yanılır.'),
    ],
)
