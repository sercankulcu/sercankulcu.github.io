# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 31: Doğrusal Cebir dersinin tanıtımı; vektör ve matris, '
             'doğrusal dönüşüm, özdeğer, SVD, yapay zekâda neden gerektiği, kısa tarihçe, komşu dersler ve ayrışma noktaları.'),
    gundem=['Vektör ve matris', 'Denklem sistemleri', 'Özdeğer', 'SVD ve PCA', 'YZ\'de nerede', 'Komşu dersler'],
    tanim=('Doğrusal cebir vektörleri, matrisleri ve <b>doğrusal dönüşümleri</b> inceler. Yapay zekâ ve veri derslerinde '
           'neredeyse her şey bir vektördür: bir görüntü, bir sözcük, bir kullanıcı. Bir sinir ağı katmanı da büyük '
           'ölçüde bir matris çarpımıdır.'),
    tarihce=[
        ('1844', 'Grassmann, çok boyutlu vektör uzayı düşüncesini ilk kez sistemli biçimde ortaya koyar.'),
        ('1858', 'Cayley matrisleri kendi başına cebirsel nesneler olarak ele alır; matris çarpımı tanımlanır.'),
        ('1901', 'Pearson, verideki en iyi uyan doğru ve düzlemleri bulur: temel bileşenler analizi (PCA).'),
        ('1936', 'Eckart ve Young, SVD ile bir matrisin en iyi düşük ranklı yaklaşımını gösterir.'),
        ('1965', 'Golub ve Kahan, SVD\'yi bilgisayarda kararlı biçimde hesaplayan yöntemi verir.'),
        ('1979', 'BLAS yayımlanır: bugünkü bilimsel ve YZ kütüphanelerinin altındaki temel matris işlemleri.'),
    ],
    kavramlar=[
        ('Vektör ve uzay', 'Veriyi çok boyutlu bir noktaya çevirmek.'),
        ('Matris çarpımı', 'Bir dönüşümü ya da bir ağ katmanını uygulamak.'),
        ('İç çarpım ve norm', 'Benzerlik (kosinüs) ve uzaklık ölçmek.'),
        ('Rank ve taban', 'Verinin gerçekte kaç bağımsız yöne yayıldığı.'),
        ('Doğrusal sistemler', 'Ax = b; en küçük kareler çözümü.'),
        ('Özdeğer, özvektör', 'Dönüşümün yönünü değiştirmediği vektörler.'),
        ('SVD', 'Her matrisi döndürme, ölçekleme, döndürmeye ayırmak.'),
        ('İzdüşüm', 'Bir vektörün bir alt uzaydaki en yakın karşılığı.'),
    ],
    akis=[('Veriyi\nvektörle', 'öznitelik,\ngömme'), ('Matrise\ndiz', 'örnek ×\nöznitelik'), ('Dönüştür', 'ağırlık\nmatrisi'),
          ('Ayrıştır', 'özdeğer, SVD'), ('Yorumla', 'boyut indirgeme,\nbenzerlik')],
    akis_ornek=('<b>Örnek:</b> Yüz tanımada her yüz görüntüsü uzun bir piksel vektörüdür. Yüzler bir matrise dizilir, '
                'ortalama çıkarılır, SVD ile en önemli birkaç yön (özyüzler) bulunur ve her yüz bu az sayıdaki yönün '
                'ağırlıklarıyla temsil edilip karşılaştırılır.'),
    onkosul_ek=[
        ('Lise matematiği', 'denklem çözme, fonksiyon ve koordinat düzlemi', None),
        ('Programlama', 'diziler ve döngüler: matris işlemlerini kodla denemek', '/teaching/computer-and-introduction-to-programming/'),
    ],
    ayrisma=[
        ('OPT', 'Optimizasyon en iyi değerleri arar; doğrusal cebir bu aramada kullanılan gradyan, Hessian ve sistem çözümünü sağlar.'),
        ('OI', 'Olasılık belirsizliği ölçer; doğrusal cebir veriyi ve kovaryans matrisini temsil edip ayrıştırır.'),
        ('MO', 'MÖ veriden model öğrenir; doğrusal cebir o modelin içinde dönen hesabın dilidir, kendisi öğrenmez.'),
        ('BGR', 'Bilgisayar grafiği 3B dönüşüm matrislerini uygular; bu ders bu matrislerin genel kuramını verir.'),
    ],
    uygulamalar=[
        ('Sinir ağları', 'Katman = matris çarpımı ve etkinleştirme.'),
        ('PCA', 'Boyut indirgeme ve görselleştirme.'),
        ('Öneri sistemleri', 'Kullanıcı-ürün matrisini ayrıştırma.'),
        ('Sözcük gömmeleri', 'Anlam benzerliği = vektör yakınlığı.'),
        ('PageRank', 'Bağlantı matrisinin baskın özvektörü.'),
        ('Görüntü işleme', 'Dönüşümler, sıkıştırma ve süzgeçler.'),
    ],
    araclar=['NumPy', 'SciPy (scipy.linalg)', 'PyTorch', 'MATLAB', 'GNU Octave', 'LAPACK ve BLAS'],
    veri_baslik='Klasik örnek problemler',
    veriler=['En küçük kareler ile doğru uydurma', 'Özyüzler (eigenfaces)', 'PageRank özvektörü', 'SVD ile görüntü sıkıştırma',
             'Netflix Prize matris ayrıştırma', 'Markov zinciri kararlı durumu'],
    araclar_not='Matris işlemleri elle değil, yılların emeği olan <b>LAPACK ve BLAS</b> üzerinden yapılır; NumPy ve PyTorch da bunları çağırır.',
    yanilgilar=[
        ('Doğrusal cebir yalnızca denklem çözmektir.', 'Asıl güç dönüşümleri ve ayrıştırmaları anlamaktadır: PCA, SVD ve gömmeler bunun üstüne kurulur.'),
        ('Ters matrisi hesaplayıp çarpmak doğru yoldur.', 'Pratikte ters alınmaz; LU, QR ya da Cholesky ile sistem çözülür, daha hızlı ve kararlıdır.'),
        ('Yüksek boyutlu uzay 3B gibi davranır.', 'Yüksek boyutta noktalar birbirine benzer uzaklıkta durur; sezgi yanıltır (boyut laneti).'),
        ('Kütüphaneler varken kuramı bilmek gereksiz.', 'Rank kaybı, kötü koşulluluk ve boyut hataları ancak kuram bilinirse anlaşılır.'),
    ],
    meslekler=['Makine öğrenmesi mühendisi', 'Veri bilimci', 'Bilgisayar grafiği geliştiricisi', 'Sayısal hesaplama uzmanı'],
    sonra=('Doğrusal cebir rehberdeki hemen her dersin önkoşuludur. Bu dersten sonra optimizasyona, makine öğrenmesine, '
           'sinir ağlarına ve bilgisayar grafiğine rahatça geçilebilir. Sayısal doğrusal cebir ve GPU programlama, '
           'aynı hesapları büyük ölçekte hızlı yapmayı öğretir.'),
    kaynaklar=[
        'Strang, <em>Introduction to Linear Algebra</em>, 6. baskı, Wellesley-Cambridge Press, 2023.',
        'Strang, <em>Linear Algebra and Learning from Data</em>, Wellesley-Cambridge Press, 2019.',
        'Trefethen ve Bau, <em>Numerical Linear Algebra</em>, SIAM, 1997.',
        'Deisenroth, Faisal ve Ong, <em>Mathematics for Machine Learning</em>, Cambridge University Press, 2020.',
    ],
)
