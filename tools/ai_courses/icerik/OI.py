# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 32: Olasılık ve İstatistik dersinin tanıtımı; olasılık, dağılımlar, '
             'Bayes kuralı, kestirim, hipotez testi, yapay zekâda neden gerektiği, kısa tarihçe ve komşu dersler.'),
    gundem=['Olasılık ve Bayes', 'Dağılımlar', 'Kestirim', 'Hipotez testi', 'YZ\'de nerede', 'Komşu dersler'],
    tanim=('Olasılık belirsizliği ölçmenin dilidir; istatistik bu dili kullanarak <b>sınırlı veriden</b> genel sonuç '
           'çıkarır. Yapay zekâ ve veri derslerindeki her model bir belirsizlikle çalışır: tahminin ne kadar güvenilir '
           'olduğunu ancak bu ders söyleyebilir.'),
    tarihce=[
        ('1654', 'Pascal ve Fermat, yarıda kalan bir şans oyununun paylaşımı üzerine mektuplaşır.'),
        ('1763', 'Bayes\'in makalesi ölümünden sonra yayımlanır: kanıtla güncellenen olasılık.'),
        ('1908', 'Gosset, "Student" takma adıyla küçük örneklemler için t dağılımını yayımlar.'),
        ('1925', 'Fisher\'ın Statistical Methods for Research Workers kitabı anlamlılık testini yaygınlaştırır.'),
        ('1933', 'Kolmogorov olasılığı aksiyomlarla kurar; olasılık kuramı ölçü kuramına dayanır.'),
        ('1979', 'Efron bootstrap yöntemini önerir: belirsizliği yeniden örneklemeyle ölçmek.'),
    ],
    kavramlar=[
        ('Koşullu olasılık', 'Bir bilgi verildiğinde olasılığın değişmesi.'),
        ('Bayes kuralı', 'Önsel inancı kanıtla sonsal inanca çevirmek.'),
        ('Rastgele değişken', 'Beklenen değer, varyans ve dağılım.'),
        ('Normal dağılım', 'Merkezi limit kuramı: ortalamalar normale yaklaşır.'),
        ('En çok olabilirlik', 'Veriyi en olası kılan parametreyi seçmek.'),
        ('Güven aralığı', 'Kestirimin belirsizliğini bir aralıkla vermek.'),
        ('Hipotez testi', 'Gözlenen fark rastlantı mı, gerçek mi?'),
        ('Regresyon', 'Bir değişkeni ötekilerle açıklamak ve sınamak.'),
    ],
    akis=[('Soru sor', 'neyi merak\nediyoruz?'), ('Örnekle', 'rastgele\nörneklem'), ('Modelle', 'dağılım\nvarsayımı'),
          ('Kestir', 'parametre,\naralık'), ('Karar ver', 'test, risk')],
    akis_ornek=('<b>Örnek:</b> Bir YZ ekibi yeni öneri modelinin tıklamayı artırıp artırmadığını sorar. Kullanıcıların '
                'yarısı rastgele yeni modeli görür (A/B testi), tıklama oranları kestirilir, farkın güven aralığı '
                'hesaplanır ve fark rastlantıyla açıklanamıyorsa model yayına alınır.'),
    onkosul_ek=[
        ('Analiz (Kalkülüs)', 'integral ve türev: sürekli dağılımlar ve en çok olabilirlik', None),
        ('Ayrık Matematik', 'kümeler ve sayma (permütasyon, kombinasyon)', None),
    ],
    ayrisma=[
        ('MO', 'MÖ tahmin başarımını öne çıkarır; istatistik modelin anlamını, varsayımlarını ve belirsizliğini sorar.'),
        ('VB', 'Veri bilimi bütün süreci (veri, çözümleme, iletişim) kapsar; bu ders o sürecin çıkarım kuramını verir.'),
        ('OGM', 'Olasılıksal grafik modeller çok değişkenli dağılımları çizgeyle yapılandırır; bu ders tek ve az değişkenle başlar.'),
        ('BK', 'Bilgi kuramı belirsizliği entropiyle ölçer; bu ders olasılıkla kestirim ve karar üzerine kuruludur.'),
    ],
    uygulamalar=[
        ('A/B testi', 'Yeni modelin gerçekten daha iyi olup olmadığı.'),
        ('Naive Bayes', 'Metin ve istenmeyen e-posta sınıflandırma.'),
        ('Belirsizlik', 'Tahminin güven aralığı ve kalibrasyonu.'),
        ('Model karşılaştırma', 'İki modelin farkı anlamlı mı?'),
        ('Üretken modeller', 'Verinin dağılımını öğrenip örneklemek.'),
        ('Tıbbi testler', 'Duyarlılık, özgüllük ve taban oranı.'),
    ],
    araclar=['R', 'SciPy (scipy.stats)', 'statsmodels', 'pandas', 'PyMC', 'Stan'],
    veri_baslik='Klasik örnek problemler',
    veriler=['Monty Hall', 'Doğum günü paradoksu', 'Tıbbi test ve taban oranı', 'Galton\'un boy verisi', 'A/B testi',
             'Kumarbaz yanılgısı'],
    yanilgilar=[
        ('p = 0,03 ise hipotezin doğru olma olasılığı %97\'dir.', 'p değeri, sıfır hipotezi doğruysa bu kadar uç verinin görülme olasılığıdır; hipotezin olasılığı değildir.'),
        ('İlinti varsa neden-sonuç vardır.', 'Ortak bir neden ya da rastlantı da ilinti üretir; nedensellik için deney gerekir.'),
        ('Test %99 doğruysa pozitif çıkan kişi %99 olasılıkla hastadır.', 'Hastalık nadirse pozitiflerin çoğu yanlış alarm olabilir; Bayes kuralı taban oranını katar.'),
        ('Çok veri varsa istatistiğe gerek kalmaz.', 'Büyük veride önemsiz farklar bile "anlamlı" çıkar; etki büyüklüğü ve yanlılık hâlâ sorulur.'),
    ],
    meslekler=['İstatistikçi', 'Veri bilimci', 'Makine öğrenmesi araştırmacısı', 'Biyoistatistikçi', 'Aktüer'],
    sonra=('Bu dersten sonra makine öğrenmesine, olasılıksal grafik modellere, örüntü tanımaya ve bilgi kuramına geçmek '
           'kolaylaşır. Bayesçi istatistik ve nedensel çıkarım, belirsizliği ve neden-sonuç ilişkisini daha derin '
           'ele alan iki doğal devam yoludur.'),
    kaynaklar=[
        'Wasserman, <em>All of Statistics</em>, Springer, 2004.',
        'DeGroot ve Schervish, <em>Probability and Statistics</em>, 4. baskı, Pearson, 2012.',
        'Blitzstein ve Hwang, <em>Introduction to Probability</em>, 2. baskı, CRC Press, 2019.',
        'Gelman, Carlin, Stern, Dunson, Vehtari ve Rubin, <em>Bayesian Data Analysis</em>, 3. baskı, CRC Press, 2013.',
    ],
    islenenler=[
        'Sayma, olasılık aksiyomları ve koşullu olasılık',
        'Bayes kuralı ve bağımsızlık',
        'Kesikli dağılımlar: Bernoulli, binom, Poisson',
        'Sürekli dağılımlar: düzgün, üstel, normal',
        'Beklenen değer, varyans ve kovaryans',
        'Ortak ve koşullu dağılımlar',
        'Büyük sayılar yasası ve merkezi limit kuramı',
        'Nokta kestirimi: moment yöntemi, en çok olabilirlik',
        'Güven aralıkları ve bootstrap',
        'Hipotez testi: t testi, ki-kare, p değeri',
        'Doğrusal regresyon ve çıkarım',
        'Bayesçi çıkarım: önsel ve sonsal dağılım',
    ],
    beceriler=[
        'scipy.stats ile test yapmak',
        'R ya da statsmodels ile regresyon',
        'güven aralığı hesaplamak',
        'benzetimle olasılık sınamak',
        'A/B testi tasarlamak',
    ],
    hazirlik=[
        ('Bir fonksiyonun integralini alıp eğri altındaki alanı bulabiliyor musun?', 'Analiz dersindeki belirli integral'),
        ('Bir fonksiyonun en büyük değerini türev alarak bulabiliyor musun?', 'Analiz dersindeki türev ve uç değerler'),
        ('Permütasyon ve kombinasyonla seçim sayısını hesaplayabiliyor musun?', 'Ayrık matematikteki sayma konuları'),
        ("Python'da bir listenin ortalamasını hesaplayıp histogramını çizebiliyor musun?", "Programlamaya giriş, ardından NumPy'a kısa bir giriş"),
    ],
    riskler=[
        ('p-hacking', 'Pek çok analiz seçeneğini deneyip yalnız "anlamlı" çıkanı raporlamak, rastlantıyı bulgu gibi gösterir.'),
        ('Çoklu test', 'Yüz karşılaştırmada 0,05 düzeyinde yaklaşık beş yanlış pozitif beklenir; düzeltme yapılmazsa sahte bulgu çıkar.'),
        ('Simpson paradoksu', 'Gruplar birleştirilince eğilim tersine dönebilir; 1973 Berkeley lisansüstü kabul verisi bilinen örnektir.'),
        ('Seçilim yanlılığı', 'Rastgele olmayan örneklem ne kadar büyük olursa olsun yanıltır; 1936 Literary Digest anketi bunu gösterdi.'),
    ],
)
