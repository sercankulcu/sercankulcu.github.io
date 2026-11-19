# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 3: Makine Öğrenmesi dersinin tanıtımı; denetimli ve denetimsiz '
             'öğrenme, model ve kayıp, genelleme, değerlendirme, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Öğrenme türleri', 'Model ve kayıp', 'Genelleme', 'Değerlendirme', 'Temel algoritmalar', 'Komşu dersler'],
    tanim=('Makine öğrenmesi, açıkça programlanmadan <b>örneklerden öğrenen</b> ve öğrendiğini yeni örneklere genelleyen '
           'algoritmaları inceler. Mitchell\'in tanımıyla bir program, T görevindeki P ile ölçülen başarımı E deneyimiyle '
           'artıyorsa öğreniyordur.'),
    tarihce=[
        ('1957', 'Rosenblatt algılayıcıyı (perceptron) tanıtır: ağırlıklarını örneklerden ayarlayan ilk modellerden.'),
        ('1959', 'Samuel\'in dama programı kendi kendine oynayarak gelişir; "makine öğrenmesi" adı yaygınlaşır.'),
        ('1986', 'Quinlan\'ın ID3 karar ağacı yayımlanır; aynı yıl geri yayılım sinir ağlarını yeniden canlandırır.'),
        ('1995', 'Cortes ve Vapnik destek vektör makinelerini (SVM) yayımlar.'),
        ('2001', 'Breiman rastgele ormanları tanıtır: çok sayıda ağacın oylaması.'),
        ('2012', 'AlexNet ImageNet yarışmasını büyük farkla kazanır; derin öğrenme dönemi başlar.'),
    ],
    kavramlar=[
        ('Denetimli öğrenme', 'Etiketli örneklerle sınıflandırma ve regresyon.'),
        ('Denetimsiz öğrenme', 'Etiketsiz veride kümeleme ve boyut indirgeme.'),
        ('Model ve hipotez', 'Öğrenilecek fonksiyonun biçimi ve parametreleri.'),
        ('Kayıp fonksiyonu', 'Tahminin ne kadar yanlış olduğunu ölçer; eğitim onu küçültür.'),
        ('Genelleme', 'Eğitimde görülmeyen örneklerde de doğru tahmin.'),
        ('Aşırı uydurma', 'Eğitim verisini ezberleme; yanlılık-varyans dengesi.'),
        ('Doğrulama', 'Eğitim, doğrulama ve test kümeleri; çapraz doğrulama.'),
        ('Öznitelikler', 'Ham veriyi modele uygun sayılara dönüştürmek.'),
    ],
    akis=[('Veri topla', 'örneklem,\netiketler'), ('Hazırla', 'temizleme,\nöznitelik'), ('Eğit', 'kaybı\nen küçükle'),
          ('Değerlendir', 'ayrı test\nkümesi'), ('Dağıt ve\nizle', 'üretim,\nveri kayması')],
    akis_ornek=('<b>Örnek:</b> İstenmeyen e-posta süzgeci geçmiş iletileri ve etiketlerini toplar, sözcük sayılarını '
                'öznitelik yapar, lojistik regresyon eğitir, ayrılmış test iletilerinde doğruluğu ölçer ve gelen yeni '
                'iletileri sınıflandırır. Kurallar elle yazılmaz, veriden öğrenilir.'),
    onkosul_ek=[
        ('Programlama', 'Python ya da Java ile veri okuma, döngü ve fonksiyonlar', '/teaching/computer-and-introduction-to-programming/'),
        ('Analiz (Kalkülüs)', 'türev, kısmi türev ve zincir kuralı: gradyan inişinin dili', None),
    ],
    ayrisma=[
        ('YZ', 'YZ çerçevedir; MÖ bu çerçevede yalnızca veriden öğrenmeye odaklanır.'),
        ('VM', 'Aynı algoritmaları kullanırlar; MÖ yeni örnekte tahmini, veri madenciliği veride keşfi amaçlar.'),
        ('OI', 'İstatistik modelin anlamını ve belirsizliğini, MÖ tahmin başarımını öne çıkarır.'),
        ('DO', 'Derin öğrenme MÖ\'nün bir koludur; öznitelikleri elle tasarlamak yerine ham veriden öğrenir.'),
    ],
    uygulamalar=[
        ('İstenmeyen ileti süzme', 'E-postaları içeriğine göre sınıflandırmak.'),
        ('Kredi puanlama', 'Başvuranın geri ödeme riskini tahmin etmek.'),
        ('Öneri', 'Kullanıcının beğenebileceği ürün ya da içerik.'),
        ('Tıbbi tahmin', 'Hasta verisinden hastalık riskini kestirmek.'),
        ('Talep tahmini', 'Satış ve stok planlaması.'),
        ('Sahtekârlık tespiti', 'Olağandışı kart işlemlerini yakalamak.'),
    ],
    araclar=['scikit-learn', 'pandas', 'NumPy', 'XGBoost', 'Weka', 'R'],
    veriler=['Iris', 'MNIST', 'UCI Machine Learning Repository', 'Titanic (Kaggle)', 'Adult (gelir)', 'Wine'],
    yanilgilar=[
        ('Daha karmaşık model her zaman daha iyidir.', 'Karmaşık model eğitim verisini ezberleyebilir (aşırı uydurma) ve yeni veride kötüleşir.'),
        ('Eğitim doğruluğu başarıyı gösterir.', 'Başarı, eğitimde hiç kullanılmamış test verisinde ölçülür.'),
        ('Çok veri her sorunu çözer.', 'Yanlı ya da gürültülü veri çoğaldıkça yanlışı da çoğaltır.'),
        ('Model neden-sonuç ilişkisini öğrenir.', 'MÖ ilinti bulur; nedensellik için deney ya da nedensel çıkarım gerekir.'),
    ],
    meslekler=['Makine öğrenmesi mühendisi', 'Veri bilimci', 'Araştırmacı', 'MLOps mühendisi'],
    sonra=('Makine öğrenmesi haritanın kavşağıdır: sinir ağları ve pekiştirmeli öğrenme onun dallarıdır; MLOps, siber '
           'güvenlik ve biyoenformatik onun yöntemlerini uygular. Bu dersten sonra ister derinleşmek (YSA, derin öğrenme), '
           'ister bir uygulama alanına geçmek mümkündür.'),
    kaynaklar=[
        'Mitchell, <em>Machine Learning</em>, McGraw-Hill, 1997.',
        'Bishop, <em>Pattern Recognition and Machine Learning</em>, Springer, 2006.',
        'Hastie, Tibshirani ve Friedman, <em>The Elements of Statistical Learning</em>, 2. baskı, Springer, 2009.',
        'Alpaydın, <em>Introduction to Machine Learning</em>, 4. baskı, MIT Press, 2020.',
        'Géron, <em>Hands-On Machine Learning with Scikit-Learn, Keras and TensorFlow</em>, 3. baskı, O\'Reilly, 2022.',
    ],
)
