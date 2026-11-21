# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 24: Biyometrik Sistemler dersinin tanıtımı; kayıt, doğrulama '
             've tanımlama, hata oranları, canlılık tespiti, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Biyometrik özellikler', 'Doğrulama, tanımlama', 'Hata oranları', 'Sahtecilik', 'Gizlilik', 'Komşu dersler'],
    tanim=('Biyometrik sistemler, kişiyi yüz, parmak izi, iris ya da ses gibi <b>bedensel ve davranışsal özelliklerinden</b> '
           'tanır. Ders bir örnekten şablon çıkarmayı, iki şablonu eşlemeyi ve eşik seçerek kabul ya da ret kararı vermeyi '
           'inceler; güvenlik ve gizlilik bu kararın ayrılmaz parçasıdır.'),
    tarihce=[
        ('1892', 'Galton "Finger Prints" kitabını yayımlar: parmak izinin kişiye özgü ve kalıcı olduğu gösterilir.'),
        ('1901', 'Scotland Yard parmak izlerini Henry sınıflandırma sistemiyle kullanmaya başlar.'),
        ('1991', 'Turk ve Pentland yüz tanımada özyüzleri (eigenfaces) yayımlar.'),
        ('1993', 'Daugman iris tanıma yöntemini yayımlar; bugünkü iris sistemlerinin temeli olur.'),
        ('2013', 'Parmak izi algılayıcısı (Touch ID) akıllı telefonlarda yaygınlaşmaya başlar.'),
        ('2014', 'DeepFace ve ardından gelen derin ağlar yüz doğrulamada insan düzeyine yaklaşır.'),
    ],
    kavramlar=[
        ('Kayıt', 'Kişinin örneğinden şablon çıkarıp veri tabanına yazmak.'),
        ('Şablon', 'Ham görüntü yerine saklanan öznitelik vektörü.'),
        ('Doğrulama (1:1)', '"Bu kişi iddia ettiği kişi mi?" sorusu.'),
        ('Tanımlama (1:N)', '"Bu kişi kayıtlılardan hangisi?" sorusu.'),
        ('FAR ve FRR', 'Yanlış kabul ve yanlış ret oranı; eşik ikisini dengeler.'),
        ('EER ve DET eğrisi', 'İki hatanın eşitlendiği nokta; sistemleri kıyaslamak.'),
        ('Canlılık tespiti', 'Fotoğraf, maske ya da kalıp parmakla saldırıyı yakalamak.'),
        ('Çok kipli biyometri', 'Yüz ile sesi ya da parmak izi ile irisi birleştirmek.'),
    ],
    akis=[('Yakala', 'kamera,\nalgılayıcı'), ('Ön işle', 'kalite,\nhizalama'), ('Öznitelik', 'şablon ya da\ngömme'),
          ('Eşle', 'benzerlik\nskoru'), ('Karar ver', 'eşik: kabul\nya da ret')],
    akis_ornek=('<b>Örnek:</b> Telefonun yüz kilidi kızılötesi kamerayla yüzü yakalar, yüzü bulup hizalar, derin bir ağla '
                'gömme vektörü çıkarır, kayıtlı şablonla benzerliği ölçer ve skor eşiği geçerse kilidi açar. Canlılık '
                'denetimi fotoğrafla açılmasını engeller.'),
    onkosul_ek=[
        ('Programlama', 'Python ile görüntü okuma, vektörlerle çalışma', '/teaching/computer-and-introduction-to-programming/'),
        ('Veri Yapıları', '1:N aramada milyonlarca şablonu hızla taramak için dizinleme', '/teaching/data-structures/'),
    ],
    ayrisma=[
        ('OT', 'Örüntü tanıma bir örneği sınıflara ayırır; biyometri kişiyi tanır, sınıf sayısı kişi sayısı kadardır ve sürekli artar.'),
        ('BG', 'Bilgisayarlı görü görüntüdeki her şeyi anlamaya çalışır; biyometri yalnız kimliği soran dar ve güvenlik odaklı bir görevdir.'),
        ('SGY', 'Siber güvenlikte YZ saldırıları yakalar; biyometri kimlik doğrulamanın kendisidir ve sahte örnek saldırılarına karşı korunur.'),
        ('KSI', 'Konuşma tanıma ne söylendiğini çıkarır; konuşmacı tanıma, yani biyometri, kimin konuştuğunu çıkarır.'),
    ],
    uygulamalar=[
        ('Telefon kilidi', 'Yüz ve parmak iziyle cihaz açma.'),
        ('Sınır kapısı', 'E-pasaport fotoğrafıyla otomatik geçiş.'),
        ('Adli bilimler', 'Olay yeri izlerini veri tabanında aramak.'),
        ('Bankacılık', 'Uzaktan müşteri doğrulama, ödeme onayı.'),
        ('Giriş denetimi', 'Bina ve personel giriş-çıkış kaydı.'),
        ('Nüfus kaydı', 'Ulusal kimlik sistemlerinde mükerrer kayıt önleme.'),
    ],
    araclar=['OpenCV', 'dlib', 'InsightFace', 'NIST NBIS', 'SpeechBrain'],
    veriler=['LFW (Labeled Faces in the Wild)', 'VGGFace2', 'FVC2004 (parmak izi)', 'CASIA-Iris', 'VoxCeleb (konuşmacı)'],
    araclar_not='Biyometrik veri <b>kişisel veridir</b>: KVKK ve GDPR kapsamındadır; bazı yüz veri setleri bu yüzden yayından kaldırılmıştır.',
    yanilgilar=[
        ('Biyometrik sistemler hata yapmaz.', 'Her sistem yanlış kabul ve yanlış ret yapar; eşik bu iki hatadan birini seçer.'),
        ('Biyometrik veri parola gibi değiştirilir.', 'Yüz ya da parmak izi değiştirilemez; sızan şablon kalıcı risktir, şablon koruma gerekir.'),
        ('Doğruluk herkes için aynıdır.', 'Başarım yaşa, ten rengine ve algılayıcıya göre değişebilir; değerlendirme gruplara ayrılarak yapılır.'),
        ('Eşleşme varsa kişi oradadır.', 'Fotoğraf, maske ya da kayıt sesle sunum saldırısı yapılabilir; canlılık tespiti gerekir.'),
    ],
    meslekler=['Biyometri mühendisi', 'Bilgisayarlı görü mühendisi', 'Kimlik ve erişim yönetimi uzmanı', 'Adli bilişim uzmanı'],
    sonra=('Biyometri, örüntü tanıma ve görünün güvenlikle buluştuğu yerdir. Buradan derin yüz tanıma ve '
           'konuşmacı tanımaya, sahtecilik tespitiyle siber güvenliğe ya da adalet ve gizlilik sorularıyla '
           'açıklanabilir YZ ve etiğe geçilebilir.'),
    kaynaklar=[
        'Jain, Ross ve Nandakumar, <em>Introduction to Biometrics</em>, Springer, 2011.',
        'Li ve Jain (ed.), <em>Handbook of Face Recognition</em>, 2. baskı, Springer, 2011.',
        'Maltoni, Maio, Jain ve Feng, <em>Handbook of Fingerprint Recognition</em>, 3. baskı, Springer, 2022.',
        'Daugman, "How Iris Recognition Works", <em>IEEE Transactions on Circuits and Systems for Video Technology</em> 14(1), 2004.',
    ],
    islenenler=[
        'Biyometrik sistem: kayıt, doğrulama, tanımlama',
        'Başarım ölçümü: FAR, FRR, ROC, DET, EER',
        'Parmak izi: ön işleme, minütyeler, eşleme',
        'Yüz algılama ve hizalama',
        'Yüz tanıma: özyüzler, LBP, derin gömmeler',
        'İris: bölütleme, Daugman kodu, Hamming uzaklığı',
        'Sesle konuşmacı doğrulama',
        'Davranışsal biyometri: imza, yürüyüş, tuş vuruşu',
        'Çok kipli biyometri ve skor birleştirme',
        'Sunum saldırıları ve canlılık tespiti',
        'Şablon koruma ve iptal edilebilir biyometri',
        'Büyük ölçekli tanımlama, dizinleme ve standartlar',
    ],
    beceriler=['OpenCV ve dlib ile yüz işleme', 'InsightFace ile yüz gömmesi çıkarmak', 'DET eğrisi çizip EER hesaplamak',
               'eşiği uygulamanın riskine göre seçmek', 'başarımı gruplara ayırarak ölçmek'],
    hazirlik=[
        ('Bir görüntüyü okuyup kırpabiliyor ve gri tona çevirebiliyor musun?', '@GI'),
        ('Bir sınıflandırıcının ROC eğrisini ve yanlış pozitif oranını açıklayabiliyor musun?', '@OT'),
        ('İki vektör arasındaki kosinüs benzerliğini hesaplayabiliyor musun?', '@DC'),
        ('Python\'da NumPy dizileriyle bir klasördeki görüntüleri işleyebiliyor musun?', 'Programlamaya giriş, ardından NumPy\'a kısa bir giriş'),
    ],
    riskler=[
        ('Kitlesel gözetim', 'Kamusal alanda gerçek zamanlı yüz tanıma, kimseye sorulmadan herkesi izlemeyi mümkün kılar; birçok ülke bunu yasayla sınırlar.'),
        ('Yanlış eşleşmeyle gözaltı', 'ABD\'de yüz tanımanın yanlış eşleşmesine dayanılarak suçsuz kişilerin gözaltına alındığı belgelenmiş olaylar vardır.'),
        ('Amaç dışı kullanım', 'Kapı girişi için alınan yüz ya da parmak izi başka amaçla kullanılabilir; KVKK biyometrik veriyi özel nitelikli sayar.'),
        ('Merkezî şablon deposu', 'Milyonlarca şablonu tek yerde toplamak sızıntıda herkesi birden etkiler; 2015\'te ABD OPM sızıntısında 5,6 milyon parmak izi çalındı.'),
    ],
)
