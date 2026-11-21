# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 8: Örüntü Tanıma dersinin tanıtımı; öznitelik çıkarma, '
             'Bayes karar kuramı, sınıflandırıcılar, kümeleme, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Öznitelik çıkarma', 'Bayes kararı', 'Sınıflandırıcılar', 'Kümeleme', 'Başarım ölçme', 'Komşu dersler'],
    tanim=('Örüntü tanıma, ölçümlerden çıkarılan <b>öznitelik vektörüne</b> bakarak bir nesnenin hangi sınıfa ait '
           'olduğuna karar vermeyi inceler. Ders algılayıcıdan karara uzanan zinciri bütün olarak ele alır: ön işleme, '
           'öznitelik seçimi, sınıflandırıcı tasarımı ve hata çözümlemesi.'),
    tarihce=[
        ('1936', 'Fisher doğrusal ayırtaç analizini yayımlar; makalede kullandığı Iris verisi bugün de ilk örnektir.'),
        ('1962', 'Hu, öteleme, ölçek ve dönmeye karşı değişmeyen moment özniteliklerini tanıtır.'),
        ('1967', 'Cover ve Hart, en yakın komşu kuralının hatasının Bayes hatasının iki katını aşmadığını gösterir.'),
        ('1973', 'Duda ve Hart, alanın temel ders kitabı "Pattern Classification and Scene Analysis"i yayımlar.'),
        ('1991', 'Turk ve Pentland özyüzlerle (eigenfaces) yüz tanımayı PCA üzerine kurar.'),
        ('1998', 'LeCun ve arkadaşları LeNet-5\'i ve MNIST el yazısı rakam verisini yayımlar.'),
    ],
    kavramlar=[
        ('Öznitelik vektörü', 'Nesneyi temsil eden ölçümler: uzunluk, renk, doku.'),
        ('Öznitelik uzayı', 'Her örnek bir nokta; sınıflar bu uzayda bölgeler.'),
        ('Bayes karar kuramı', 'Sonsal olasılığı en büyük sınıfı seçmek; en az hata.'),
        ('Karar sınırı', 'Öznitelik uzayını sınıf bölgelerine ayıran yüzey.'),
        ('Yoğunluk kestirimi', 'Parametrik (Gauss) ya da parametresiz (Parzen).'),
        ('En yakın komşu', 'Yeni örneği en yakın etiketli örneklerin sınıfına ata.'),
        ('Boyut indirgeme', 'PCA ve LDA ile az ama ayırt edici öznitelik.'),
        ('Karışıklık matrisi', 'Hangi sınıfın hangisiyle karıştığını gösterir.'),
    ],
    akis=[('Algıla', 'kamera,\nmikrofon'), ('Ön işle', 'gürültü,\nnormalleştirme'),
          ('Öznitelik\nçıkar', 'ayırt edici\nölçümler'), ('Sınıflandır', 'karar kuralı'), ('Değerlendir', 'hata oranı,\nkarışıklık')],
    akis_ornek=('<b>Örnek:</b> Bir posta ayırma makinesi zarftaki posta kodunu tarar, görüntüyü ikili hâle getirip '
                'rakamlara böler, her rakamdan biçim öznitelikleri çıkarır, en yakın komşu ya da SVM ile hangi rakam '
                'olduğuna karar verir ve yanlış okunan zarfları elle ayırmaya gönderir.'),
    onkosul_ek=[
        ('Programlama', 'Python ya da Java ile dizi, döngü ve fonksiyonlar', '/teaching/computer-and-introduction-to-programming/'),
        ('Doğrusal Cebir', 'vektör, uzaklık, özdeğer: PCA ve LDA\'nın dili', None),
    ],
    ayrisma=[
        ('MO', 'MÖ öğrenme algoritmalarını genel olarak inceler; bu ders ölçümden sınıf kararına giden tasarımı ve Bayes hatasını odağa alır.'),
        ('BG', 'Bilgisayarlı görü görüntüde sahneyi anlamaya çalışır; bu ders herhangi bir ölçüm türünden sınıf kararı vermeyi genel olarak ele alır.'),
        ('GI', 'Görüntü işleme görüntüyü iyileştirip dönüştürür, sonuç yine görüntüdür; bu dersin çıktısı bir sınıf etiketidir.'),
        ('BIO', 'Biyometri örüntü tanımanın bir uygulamasıdır; bu ders kişiye özgü değil, genel karar yöntemlerini öğretir.'),
    ],
    uygulamalar=[
        ('El yazısı tanıma', 'Posta kodu, banka çeki, form okuma.'),
        ('Optik karakter tanıma', 'Taranmış belgeyi düzenlenebilir metne çevirme.'),
        ('Yüz ve parmak izi', 'Kimlik doğrulama ve tanımlama.'),
        ('Endüstriyel denetim', 'Üretim hattında kusurlu ürünü ayırma.'),
        ('Tıbbi tanı', 'EKG, kan tahlili ya da doku örneğini sınıflama.'),
        ('Konuşmacı tanıma', 'Sesten kimin konuştuğunu bulma.'),
    ],
    araclar=['scikit-learn', 'NumPy', 'OpenCV', 'MATLAB Statistics and ML Toolbox', 'Weka', 'PRTools'],
    veriler=['Iris', 'MNIST', 'Optical Recognition of Handwritten Digits (UCI)', 'Wisconsin Breast Cancer', 'AT&amp;T (ORL) yüz veri seti', 'EMNIST'],
    yanilgilar=[
        ('Örüntü tanıma makine öğrenmesinin eski adıdır.', 'İki alan büyük ölçüde örtüşür; örüntü tanıma algılama ve öznitelik tasarımını da kapsayan mühendislik bakışıdır.'),
        ('Sınıflandırıcı seçimi en önemli adımdır.', 'Çoğu problemde başarıyı belirleyen <b>öznitelik seçimidir</b>; kötü öznitelikle iyi sınıflandırıcı kurtarmaz.'),
        ('Doğru öznitelikle hata sıfıra iner.', 'Sınıflar örtüşüyorsa en iyi karar bile Bayes hatası kadar yanılır.'),
        ('Ne kadar çok öznitelik, o kadar iyi.', 'Boyut arttıkça örnekler seyrekleşir (boyut laneti); gereksiz öznitelik başarımı düşürür.'),
    ],
    meslekler=['Görüntü ve sinyal işleme mühendisi', 'Makine öğrenmesi mühendisi', 'Biyometri uzmanı', 'Kalite denetim sistemleri mühendisi'],
    sonra=('Örüntü tanıma bilgisayarlı görü, konuşma tanıma ve biyometrinin ortak çekirdeğidir. Bu dersten sonra bir '
           'algılama alanına (görü, ses, biyometri) geçilebilir ya da öznitelikleri de veriden öğrenen derin öğrenmeye '
           'ilerlenebilir.'),
    kaynaklar=[
        'Duda, Hart ve Stork, <em>Pattern Classification</em>, 2. baskı, Wiley, 2001.',
        'Bishop, <em>Pattern Recognition and Machine Learning</em>, Springer, 2006.',
        'Theodoridis ve Koutroumbas, <em>Pattern Recognition</em>, 4. baskı, Academic Press, 2009.',
        'Fukunaga, <em>Introduction to Statistical Pattern Recognition</em>, 2. baskı, Academic Press, 1990.',
    ],
    islenenler=[
        'Örüntü tanıma sistemi: algılama, öznitelik, karar',
        'Bayes karar kuramı, risk ve kayıp',
        'Normal dağılım ve ayırtaç fonksiyonları',
        'Parametre kestirimi: en büyük olabilirlik, Bayes',
        'Parametresiz yoğunluk kestirimi: Parzen',
        'En yakın komşu kuralı ve uzaklık ölçüleri',
        'Doğrusal ayırtaçlar ve algılayıcı',
        'Destek vektör makineleri',
        'Öznitelik çıkarma, seçme ve boyut laneti',
        'PCA ve Fisher doğrusal ayırtaç analizi (LDA)',
        'Sınıflandırıcıları değerlendirme ve karşılaştırma',
        'Kümeleme ve Gauss karışım modelleri',
    ],
    beceriler=['ölçümden öznitelik tasarlamak', 'Bayes sınıflandırıcı kurmak', 'scikit-learn ile k-NN ve SVM',
               'OpenCV ile görüntüden öznitelik çıkarmak', 'karışıklık matrisiyle hata çözümlemek'],
    hazirlik=[
        ('Normal dağılımı, ortalamayı ve kovaryansı açıklayabiliyor musun?', '@OI'),
        ('Öklid uzaklığını, özdeğeri ve özvektörü açıklayabiliyor musun?', '@DC'),
        ('Bir fonksiyonun en küçük değerini türev alarak bulabiliyor musun?', 'Analiz dersindeki türev ve uç değer konuları'),
        ('Python\'da NumPy dizileriyle bir veri setini okuyup işleyebiliyor musun?', 'Programlamaya giriş, ardından NumPy\'a kısa bir giriş'),
    ],
    riskler=[
        ('Rızasız yüz tanıma', 'Yüz tanıma kişileri habersiz izlemeye yarar; Clearview AI internetten topladığı yüzler için birçok Avrupa ülkesinde cezalandırıldı.'),
        ('Gruplar arası hata farkı', 'Gender Shades çalışmasında ticari cinsiyet sınıflandırıcıları koyu tenli kadınlarda açık tenli erkeklerden çok daha sık yanıldı.'),
        ('Eşit sayılan hatalar', 'Kanseri kaçırmak ile yanlış alarm aynı tartılırsa toplam hata düşük, sonuç tehlikeli olur; kayıp matrisi bilinçle seçilmeli.'),
        ('Seçimde sızıntı', 'Öznitelikleri tüm veride seçip sonra çapraz doğrulama yapmak hatayı olduğundan çok düşük gösterir.'),
    ],
)
