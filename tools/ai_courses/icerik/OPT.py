# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 33: Optimizasyon dersinin tanıtımı; amaç ve kısıt, doğrusal '
             'programlama, konvekslik, gradyan yöntemleri, yapay zekâda neden gerektiği, kısa tarihçe ve komşu dersler.'),
    gundem=['Amaç ve kısıt', 'Doğrusal programlama', 'Konvekslik', 'Gradyan yöntemleri', 'YZ\'de nerede', 'Komşu dersler'],
    tanim=('Optimizasyon, kısıtlara uyarak bir <b>amaç fonksiyonunu</b> en küçük ya da en büyük yapan değerleri bulmayı '
           'inceler. Yapay zekâda bir modeli eğitmek, kayıp fonksiyonunu en küçükleyen ağırlıkları aramaktır; bu yüzden '
           'her öğrenme algoritmasının içinde bir optimizasyon yöntemi çalışır.'),
    tarihce=[
        ('1847', 'Cauchy, denklem sistemlerini çözmek için en dik iniş (gradyan inişi) yöntemini önerir.'),
        ('1947', 'Dantzig doğrusal programlama için simpleks yöntemini geliştirir.'),
        ('1951', 'Kuhn ve Tucker, kısıtlı problemlerde en iyiliğin koşullarını (KKT) yayımlar.'),
        ('1957', 'Bellman\'ın Dynamic Programming kitabı yayımlanır.'),
        ('1984', 'Karmarkar, doğrusal programlama için polinom zamanlı iç nokta yöntemini tanıtır.'),
        ('2014', 'Kingma ve Ba, derin ağların eğitiminde yaygınlaşacak Adam yöntemini önerir.'),
    ],
    kavramlar=[
        ('Amaç fonksiyonu', 'En küçüklenecek maliyet ya da kayıp.'),
        ('Kısıtlar', 'Çözümün uyması gereken eşitlik ve eşitsizlikler.'),
        ('Doğrusal programlama', 'Doğrusal amaç ve kısıtlar; simpleks yöntemi.'),
        ('Konvekslik', 'Her yerel en iyi aynı zamanda global en iyidir.'),
        ('Gradyan inişi', 'Eğimin tersi yönünde küçük adımlar atmak.'),
        ('Stokastik gradyan', 'Her adımda verinin küçük bir parçasını kullanmak.'),
        ('Lagrange çarpanları', 'Kısıtları amaca katarak çözmek; KKT koşulları.'),
        ('Tam sayılı programlama', 'Değişkenler tam sayı; çoğu zaman çok zordur.'),
    ],
    akis=[('Modelle', 'değişken, amaç,\nkısıt'), ('Sınıflandır', 'doğrusal mı,\nkonveks mi?'), ('Yöntem seç', 'simpleks,\ngradyan, ...'),
          ('Çöz', 'yakınsamayı\nizle'), ('Doğrula', 'duyarlılık,\nkısıt denetimi')],
    akis_ornek=('<b>Örnek:</b> Bir sinir ağını eğitmek bir optimizasyon problemidir: değişkenler ağırlıklar, amaç ortalama '
                'kayıptır. Problem konveks değildir; bu yüzden küçük gruplarla stokastik gradyan inişi ya da Adam '
                'kullanılır ve kayıp eğrisi doğrulama kümesinde izlenir.'),
    onkosul_ek=[
        ('Analiz (Kalkülüs)', 'türev, kısmi türev ve Taylor açılımı: gradyanın ve Hessian\'ın dili', None),
        ('Algoritmalar', 'dinamik programlama, açgözlü yöntemler ve karmaşıklık', '/teaching/algorithms/'),
    ],
    ayrisma=[
        ('EMO', 'Evrimsel yöntemler türev kullanmadan arar; bu ders problemin yapısını (türev, konvekslik) kullanan yöntemleri öğretir.'),
        ('YZ', 'YZ işe problemi etmen ve çevre olarak modellemekle başlar; optimizasyon matematiksel olarak kurulmuş problemi çözer.'),
        ('MO', 'MÖ eğitim kaybını küçültürken yeni veride başarıyı da ister; optimizasyon yalnız verilen amacı en iyi yapar.'),
        ('PO', 'Pekiştirmeli öğrenme ödülü deneme yanılmayla en büyükler; bu derste amaç fonksiyonu baştan açıkça yazılıdır.'),
    ],
    uygulamalar=[
        ('Model eğitimi', 'Kaybı en küçükleyen ağırlıkları bulmak.'),
        ('SVM', 'En geniş aralıklı ayırıcı: konveks problem.'),
        ('Hiperparametre arama', 'Öğrenme hızı ve düzenlileştirme seçimi.'),
        ('Lojistik', 'Rota, taşıma ve depo yerleşimi.'),
        ('Çizelgeleme', 'Vardiya, üretim ve ders programı.'),
        ('Portföy seçimi', 'Getiri ile riski dengelemek.'),
    ],
    araclar=['SciPy (scipy.optimize)', 'CVXPY', 'Google OR-Tools', 'PuLP', 'Gurobi', 'PyTorch (torch.optim)'],
    veri_baslik='Klasik örnek problemler',
    veriler=['Diyet problemi', 'Taşıma problemi', 'Sırt çantası problemi', 'Gezgin satıcı', 'Markowitz portföyü',
             'Rosenbrock fonksiyonu'],
    yanilgilar=[
        ('Gradyan inişi her zaman en iyi çözümü bulur.', 'Konveks olmayan problemlerde yerel bir en iyide ya da eyer noktasında kalabilir.'),
        ('Öğrenme hızı ne kadar büyükse o kadar hızlı.', 'Çok büyük adım minimumu aşar ve kayıp ıraksar; çok küçüğü ise eğitimi uzatır.'),
        ('Tam sayılı problemler yuvarlayarak çözülür.', 'Doğrusal çözümü yuvarlamak kısıtları bozabilir ya da en iyiden çok uzak kalabilir.'),
        ('Kayıp en küçükse model en iyisidir.', 'Eğitim kaybını sıfırlamak aşırı uydurma demek olabilir; YZ\'de amaç genellemedir.'),
    ],
    meslekler=['Yöneylem araştırmacısı', 'Makine öğrenmesi mühendisi', 'Lojistik ve planlama analisti', 'Kantitatif analist'],
    sonra=('Bu dersten sonra makine öğrenmesi ve sinir ağlarında eğitimin nasıl işlediği açıklık kazanır. Türev '
           'kullanılamayan problemler için evrimsel ve metasezgisel optimizasyona, ardışık kararlar için pekiştirmeli '
           'öğrenmeye, kaynak paylaşımı için yöneylem araştırmasına geçilebilir.'),
    kaynaklar=[
        'Boyd ve Vandenberghe, <em>Convex Optimization</em>, Cambridge University Press, 2004.',
        'Nocedal ve Wright, <em>Numerical Optimization</em>, 2. baskı, Springer, 2006.',
        'Bertsimas ve Tsitsiklis, <em>Introduction to Linear Optimization</em>, Athena Scientific, 1997.',
        'Bottou, Curtis ve Nocedal, "Optimization Methods for Large-Scale Machine Learning", <em>SIAM Review</em> 60(2), 2018.',
    ],
)
