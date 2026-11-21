# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 10: Evrimsel ve Metasezgisel Optimizasyon dersinin tanıtımı; '
             'genetik algoritma, tavlama, sürü zekâsı, çok amaçlı arama, kısa tarihçe, komşu dersler ve ayrışma noktaları.'),
    gundem=['Popülasyon ve uygunluk', 'Genetik algoritma', 'Yerel arama', 'Sürü zekâsı', 'Çok amaçlı arama', 'Komşu dersler'],
    tanim=('Evrimsel ve metasezgisel optimizasyon, türevi olmayan ya da arama uzayı çok büyük problemlerde iyi bir '
           'çözümü <b>deneme, seçme ve değiştirme</b> döngüsüyle arar. Doğal seçilim, metal tavlama ya da karınca '
           'kolonisi gibi süreçlerden esinlenen bu yöntemler en iyi çözümü garanti etmez, kısa sürede iyi bir çözüm verir.'),
    tarihce=[
        ('1975', 'Holland, genetik algoritmanın temelini atan "Adaptation in Natural and Artificial Systems"i yayımlar.'),
        ('1983', 'Kirkpatrick, Gelatt ve Vecchi benzetilmiş tavlamayı (simulated annealing) tanıtır.'),
        ('1992', 'Dorigo doktora tezinde karınca kolonisi optimizasyonunu önerir.'),
        ('1995', 'Kennedy ve Eberhart parçacık sürüsü optimizasyonunu (PSO) yayımlar.'),
        ('1997', 'Wolpert ve Macready "bedava öğle yemeği yok" teoremini yayımlar: tüm problemlerde üstün yöntem yok.'),
        ('2002', 'Deb ve arkadaşları çok amaçlı arama için NSGA-II algoritmasını yayımlar.'),
    ],
    kavramlar=[
        ('Gösterim', 'Çözümün kodlanışı: ikili dizi, permütasyon, gerçel vektör.'),
        ('Uygunluk', 'Bir çözümün ne kadar iyi olduğunu söyleyen amaç değeri.'),
        ('Seçilim', 'İyi çözümlere çoğalma şansı vermek: turnuva, rulet.'),
        ('Çaprazlama', 'İki ebeveynin parçalarını birleştirip yeni çözüm kurmak.'),
        ('Mutasyon', 'Çözümü rastgele küçük adımlarla değiştirip çeşitlilik katmak.'),
        ('Keşif ve sömürü', 'Yeni bölgeleri aramak ile iyi bölgeyi incelemek arasında denge.'),
        ('Yerel arama', 'Tepe tırmanma, benzetilmiş tavlama, tabu araması.'),
        ('Pareto cephesi', 'Çok amaçlı problemde birbirine üstün olmayan çözümler.'),
    ],
    akis=[('Başlat', 'rastgele\npopülasyon'), ('Değerlendir', 'uygunluk\nhesabı'), ('Seç', 'iyi ebeveynler'),
          ('Çaprazla,\nmutasyon', 'yeni çözümler'), ('Durdur?', 'nesil sınırı,\nyakınsama')],
    akis_ornek=('<b>Örnek:</b> Bir kargo firması 50 durağı en kısa turla dolaşmak ister. Rastgele 100 tur üretilir, '
                'her turun uzunluğu ölçülür, kısa turlar ebeveyn seçilir, sıraları birleştirilip birkaç durak yer '
                'değiştirilir. Yüzlerce nesil sonra en iyi bilinen çözüme yakın bir tur bulunur.'),
    onkosul_ek=[
        ('Algoritmalar', 'karmaşıklık, NP-zor problemler ve açgözlü yöntemler', '/teaching/algorithms/'),
        ('Programlama', 'diziler, rastgele sayı üretimi ve döngüler', '/teaching/computer-and-introduction-to-programming/'),
    ],
    ayrisma=[
        ('OPT', 'Optimizasyon türev ve konvekslikle kanıtlanabilir en iyiye ulaşır; bu ders türevsiz, garantisiz ama geniş uygulanabilir aramayı öğretir.'),
        ('YZ', 'YZ\'deki A* gibi aramalar durum uzayında hedefe giden yolu bulur; bu ders doğrudan iyi bir tam çözüm arar.'),
        ('PO', 'PÖ ortamla etkileşerek durumdan eyleme bir politika öğrenir; bu ders tek bir amaç fonksiyonu için iyi çözüm arar.'),
        ('YSA', 'YSA ağırlıkları gradyanla eğitir; bu ders gradyan olmadan, örneğin ağ yapısını ya da hiperparametreleri evrimle arar.'),
    ],
    uygulamalar=[
        ('Araç rotalama', 'Kargo ve dağıtım turlarını kısaltmak.'),
        ('Çizelgeleme', 'Ders programı, üretim ve vardiya planı.'),
        ('Mühendislik tasarımı', 'Anten, kanat ve yapı biçimi tasarlamak.'),
        ('Hiperparametre arama', 'Öğrenme modellerinin ayarlarını bulmak.'),
        ('Yerleşim', 'Devre elemanı ve tesis yerleşimi.'),
        ('Portföy seçimi', 'Getiri ile risk arasında çok amaçlı denge.'),
    ],
    araclar=['DEAP', 'pymoo', 'jMetal', 'PyGAD', 'ECJ', 'MATLAB Global Optimization Toolbox', 'Optuna'],
    veri_baslik='Klasik örnek problemler',
    veriler=['TSPLIB (gezgin satıcı)', 'Sırt çantası problemi', 'OneMax', 'Rastrigin ve Ackley fonksiyonları', 'ZDT ve DTLZ çok amaçlı testler', 'CEC kıyaslama fonksiyonları'],
    araclar_not='Bu derste veri seti yerine <b>kıyaslama problemleri</b> kullanılır: yöntemler aynı problemlerde aynı değerlendirme bütçesiyle karşılaştırılır.',
    yanilgilar=[
        ('Genetik algoritma en iyi çözümü bulur.', 'Metasezgiseller en iyiyi garanti etmez; makul sürede iyi bir çözüm bulmayı hedefler.'),
        ('Doğadan esinlenen yöntem daha güçlüdür.', 'Esin kaynağı başarımı belirlemez; yeni adlı birçok yöntem eskilerin küçük çeşitlemesidir.'),
        ('Bir yöntem her probleme en iyisidir.', '"Bedava öğle yemeği yok" teoremine göre tüm problemler üzerinde ortalamada hiçbir yöntem üstün değildir.'),
        ('Türev varken de evrimsel yöntem seçilmeli.', 'Türev kullanılabiliyorsa gradyan yöntemleri çoğunlukla çok daha az değerlendirmeyle sonuca ulaşır.'),
    ],
    meslekler=['Yöneylem araştırmacısı', 'Lojistik ve planlama mühendisi', 'Tasarım optimizasyonu mühendisi', 'Makine öğrenmesi mühendisi'],
    sonra=('Bu ders klasik optimizasyonun eriştiği yerin ötesine geçer. Sonrasında kanıtlanabilir yöntemler için '
           'optimizasyona, ağ yapılarını evrimle aramak için yapay sinir ağlarına ya da sürü davranışının etmen '
           'bakışı için çok etmenli sistemlere geçilebilir.'),
    kaynaklar=[
        'Goldberg, <em>Genetic Algorithms in Search, Optimization, and Machine Learning</em>, Addison-Wesley, 1989.',
        'Eiben ve Smith, <em>Introduction to Evolutionary Computing</em>, 2. baskı, Springer, 2015.',
        'Talbi, <em>Metaheuristics: From Design to Implementation</em>, Wiley, 2009.',
        'Luke, <em>Essentials of Metaheuristics</em>, 2. baskı, Lulu, 2013.',
    ],
    islenenler=[
        'Optimizasyon problemi, arama uzayı ve gösterim',
        'Yerel arama: tepe tırmanma, tabu araması',
        'Benzetilmiş tavlama ve soğutma çizelgesi',
        'Genetik algoritma: seçilim, çaprazlama, mutasyon',
        'Evrim stratejileri ve CMA-ES',
        'Diferansiyel evrim',
        'Genetik programlama',
        'Karınca kolonisi optimizasyonu',
        'Parçacık sürüsü optimizasyonu',
        'Kısıtları ele alma: ceza ve onarım',
        'Çok amaçlı arama: Pareto, NSGA-II',
        'Deney tasarımı ve istatistiksel karşılaştırma',
    ],
    beceriler=['DEAP ile evrimsel algoritma kurmak', 'pymoo ile çok amaçlı arama', 'Optuna ile hiperparametre arama',
               'probleme uygun gösterim seçmek', 'çok koşulu adil karşılaştırma yapmak'],
    hazirlik=[
        ('Bir algoritmanın zaman karmaşıklığını O gösterimiyle söyleyebiliyor musun?', 'Algoritmalar dersindeki karmaşıklık ve NP-zorluk'),
        ('Türev alarak bir fonksiyonun en küçük noktasını bulabiliyor musun?', '@OPT'),
        ('Ortalama, standart sapma ve bir hipotez testini açıklayabiliyor musun?', '@OI'),
        ("Python'da dizi, döngü ve rastgele sayıyla küçük bir program yazabiliyor musun?", "Programlamaya giriş, ardından NumPy'a kısa bir giriş"),
    ],
    riskler=[
        ('Uygunluk fonksiyonunun açığı', 'Arama, amacın kusurunu bulup sömürür: puan yükselir ama istenen davranış çıkmaz; evrimsel deneylerde sık görülür.'),
        ('Haksız karşılaştırma', 'Tek koşu, farklı değerlendirme bütçesi ya da yalnız kendi yöntemine ayar yapmak yeni algoritmayı olduğundan iyi gösterir.'),
        ('Benzetimde kalan tasarım', 'Benzetimde iyi görünen anten ya da yapı, modelin dışında kalan etkiler yüzünden gerçekte başarısız olabilir.'),
        ('Hesaplama ve enerji maliyeti', 'Pahalı benzetimleri binlerce nesil boyunca çalıştırmak günlerce işlemci zamanı ve ciddi enerji tüketir.'),
    ],
)
