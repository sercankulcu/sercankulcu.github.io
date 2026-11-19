# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 4: Yapay Sinir Ağları dersinin tanıtımı; yapay nöron, algılayıcı, '
             'çok katmanlı ağ, geri yayılım, eğitim, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Yapay nöron', 'Algılayıcı', 'Çok katmanlı ağ', 'Geri yayılım', 'Eğitim ve genelleme', 'Komşu dersler'],
    tanim=('Yapay sinir ağları, ağırlıklı toplam alıp bir etkinleştirme fonksiyonundan geçiren basit birimlerin '
           'katmanlar hâlinde bağlanmasıyla kurulan modelleri inceler. Öğrenme, kayıp fonksiyonunu küçültecek biçimde '
           '<b>ağırlıkları ayarlamaktır</b>; bunun temel aracı geri yayılım ve gradyan inişidir.'),
    tarihce=[
        ('1943', 'McCulloch ve Pitts, eşik değerli mantıksal birimlerle ilk yapay nöron modelini önerir.'),
        ('1949', 'Hebb, birlikte etkinleşen nöronların bağının güçlendiğini öne sürer: Hebb öğrenme kuralı.'),
        ('1957', 'Rosenblatt algılayıcıyı (perceptron) tanıtır; ağırlıklar örneklerden ayarlanır.'),
        ('1969', 'Minsky ve Papert, tek katmanlı algılayıcının XOR gibi problemleri çözemeyeceğini gösterir.'),
        ('1982', 'Hopfield, belleği enerji en küçüklemesiyle geri çağıran yinelemeli ağı yayımlar.'),
        ('1986', 'Rumelhart, Hinton ve Williams geri yayılımı yaygınlaştırır; çok katmanlı ağlar eğitilebilir olur.'),
    ],
    kavramlar=[
        ('Yapay nöron', 'Girdilerin ağırlıklı toplamı, eşik (bias) ve çıkış.'),
        ('Etkinleştirme', 'Sigmoid, tanh, ReLU: ağa doğrusal olmama katar.'),
        ('Algılayıcı', 'Doğrusal ayrılabilen sınıfları ayıran tek katmanlı ağ.'),
        ('Çok katmanlı ağ', 'Gizli katmanlarla doğrusal olmayan sınırlar öğrenilir.'),
        ('İleri yayılım', 'Girdiden çıkışa katman katman tahmin hesaplamak.'),
        ('Geri yayılım', 'Zincir kuralıyla her ağırlığın gradyanını bulmak.'),
        ('Gradyan inişi', 'Ağırlıkları kaybın azaldığı yöne küçük adımlarla taşır.'),
        ('Düzenlileştirme', 'Ağırlık cezası ve erken durdurma ile aşırı uydurmayı önler.'),
    ],
    akis=[('Ağırlıkları\nbaşlat', 'küçük rastgele\ndeğerler'), ('İleri\nyayılım', 'tahmin\nhesapla'), ('Kaybı\nölç', 'hata,\nçapraz entropi'),
          ('Geri\nyayılım', 'gradyanlar'), ('Güncelle', 'öğrenme hızı,\ndönem dönem')],
    akis_ornek=('<b>Örnek:</b> El yazısı rakam tanıyan küçük bir ağ, 28×28 piksellik görüntüyü 784 girdi olarak alır, '
                'gizli katmandan geçirip 10 sınıfa olasılık verir. Yanlış tahminde kayıp büyür; geri yayılım her ağırlığın '
                'payını hesaplar ve gradyan inişi ağırlıkları biraz düzeltir.'),
    onkosul_ek=[
        ('Analiz (Kalkülüs)', 'türev, kısmi türev ve zincir kuralı: geri yayılımın matematiği', None),
        ('Programlama', 'Python ile diziler, döngüler ve fonksiyonlar', '/teaching/computer-and-introduction-to-programming/'),
    ],
    ayrisma=[
        ('MO', 'MÖ karar ağacından SVM\'ye birçok model ailesini kapsar; bu ders yalnız nöronlardan kurulan ağlara odaklanır.'),
        ('DO', 'Derin öğrenme evrişimli, yinelemeli ve dönüştürücü mimarilere geçer; bu ders bunların dayandığı temel ağı ve eğitimini kurar.'),
        ('OPT', 'Optimizasyon gradyan yöntemlerini genel olarak inceler; bu ders onları ağırlıkları öğrenmek için kullanır.'),
        ('EMO', 'Nöroevrim ağırlıkları ya da mimariyi evrimle arar; bu ders ağırlıkları gradyanla, geri yayılımla öğrenir.'),
    ],
    uygulamalar=[
        ('Rakam tanıma', 'Posta kodu ve çek üzerindeki el yazısı rakamlar.'),
        ('Tablo verisi', 'Kredi riski, müşteri kaybı gibi sınıflandırmalar.'),
        ('Fonksiyon yaklaşıklama', 'Ölçümlerden doğrusal olmayan ilişki öğrenmek.'),
        ('Denetim', 'Basit robot ve süreç denetleyicileri.'),
        ('Sinyal sınıflandırma', 'Sensör verisinden arıza ya da hareket tanıma.'),
        ('İlişkisel bellek', 'Hopfield ağıyla bozuk örüntüyü tamamlamak.'),
    ],
    araclar=['NumPy', 'PyTorch', 'Keras', 'scikit-learn (MLPClassifier)', 'TensorFlow Playground', 'MATLAB Deep Learning Toolbox'],
    veriler=['XOR problemi', 'Iris', 'MNIST', 'Fashion-MNIST', 'İki sarmal (two spirals)', 'CIFAR-10'],
    araclar_not='Bu derste bir ağı önce <b>NumPy ile elle</b> yazmak, geri yayılımın gerçekten ne yaptığını görmenin en iyi yoludur.',
    yanilgilar=[
        ('Yapay sinir ağları beyni taklit eder.', 'Esin kaynağı biyolojidir; ama yapay nöron çok kaba bir modeldir ve öğrenme kuralı beyninkinden farklıdır.'),
        ('Daha çok nöron her zaman daha iyidir.', 'Büyük ağ eğitim verisini ezberleyebilir; boyut doğrulama kümesiyle seçilir.'),
        ('Geri yayılım ayrı bir öğrenme yöntemidir.', 'Geri yayılım yalnız gradyanı hesaplar; ağırlıkları güncelleyen gradyan inişidir.'),
        ('Eğitim her seferinde aynı sonucu verir.', 'Rastgele başlangıç ve karıştırma yüzünden farklı yerel en küçüklere varılabilir.'),
    ],
    meslekler=['Makine öğrenmesi mühendisi', 'Derin öğrenme mühendisi', 'Araştırmacı', 'Gömülü YZ geliştiricisi'],
    sonra=('Bu ders derin öğrenmenin kapısıdır: evrişimli ağlar, yinelemeli ağlar ve dönüştürücüler burada kurulan nöron, '
           'kayıp ve geri yayılım fikirlerinin üzerine kurulur. Optimizasyon ve doğrusal cebir bilgisini de pekiştirir.'),
    kaynaklar=[
        'Haykin, <em>Neural Networks and Learning Machines</em>, 3. baskı, Pearson, 2009.',
        'Bishop, <em>Neural Networks for Pattern Recognition</em>, Oxford University Press, 1995.',
        'Nielsen, <em>Neural Networks and Deep Learning</em>, Determination Press, 2015 (çevrimiçi kitap).',
        'Rumelhart, Hinton ve Williams, "Learning representations by back-propagating errors", <em>Nature</em> 323, 1986.',
    ],
)
