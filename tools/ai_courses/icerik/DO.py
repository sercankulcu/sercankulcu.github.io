# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 5: Derin Öğrenme dersinin tanıtımı; temsil öğrenme, evrişimli ve '
             'yinelemeli ağlar, dönüştürücüler, eğitim teknikleri, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Temsil öğrenme', 'Evrişimli ağlar', 'Yinelemeli ağlar', 'Dönüştürücüler', 'Eğitim teknikleri', 'Komşu dersler'],
    tanim=('Derin öğrenme, çok katmanlı sinir ağlarının ham veriden (piksel, ses, metin) işe yarar ara temsilleri '
           'katman katman kendisinin öğrenmesini inceler. Öznitelikleri elle tasarlamak yerine <b>temsil öğrenme</b> '
           'esastır; bunu büyük veri, GPU ve iyi mimariler mümkün kılar.'),
    tarihce=[
        ('1997', 'Hochreiter ve Schmidhuber LSTM\'yi önerir: uzun dizilerde gradyanın sönmesine çare.'),
        ('1998', 'LeCun ve arkadaşlarının LeNet-5 evrişimli ağı el yazısı rakamları tanır.'),
        ('2006', 'Hinton ve arkadaşları derin inanç ağlarını katman katman ön eğitimle eğitir; ilgi yeniden canlanır.'),
        ('2012', 'AlexNet, GPU\'da eğitilen evrişimli ağla ImageNet yarışmasını büyük farkla kazanır.'),
        ('2015', 'He ve arkadaşlarının artık ağları (ResNet) 152 katmanla ImageNet yarışmasını kazanır.'),
        ('2017', 'Vaswani ve arkadaşları dönüştürücü (transformer) mimarisini tanıtır: yalnız dikkat mekanizması.'),
    ],
    kavramlar=[
        ('Temsil öğrenme', 'Katmanlar kenardan nesneye giderek soyut öznitelikler öğrenir.'),
        ('Evrişim', 'Küçük süzgeçler görüntü üzerinde kayar; ağırlıklar paylaşılır.'),
        ('Havuzlama', 'Uzamsal boyutu küçültür, küçük kaymalara dayanıklılık sağlar.'),
        ('Yinelemeli ağ', 'RNN ve LSTM: diziyi adım adım işler, durum taşır.'),
        ('Dikkat', 'Her öğe dizinin hangi öğelerine bakacağını ağırlıkla seçer.'),
        ('Artık bağlantı', 'Katmanı atlayan yol; çok derin ağları eğitilebilir kılar.'),
        ('Normalizasyon', 'Toplu (batch) ve katman normalizasyonu eğitimi kararlı kılar.'),
        ('Aktarım öğrenmesi', 'Büyük veride eğitilmiş modeli yeni göreve uyarlamak.'),
    ],
    akis=[('Ham veri', 'piksel, ses,\nmetin'), ('Mimari\nseç', 'CNN, RNN,\ndönüştürücü'), ('GPU\'da\neğit', 'mini yığın,\nAdam'),
          ('Düzenle', 'dropout,\nveri artırma'), ('İnce ayar', 'aktarım\nöğrenmesi')],
    akis_ornek=('<b>Örnek:</b> Bitki hastalığı tanıyan bir uygulama yaprak fotoğraflarını toplar, ImageNet\'te önceden '
                'eğitilmiş bir ResNet alır, son katmanını hastalık sınıflarıyla değiştirir ve GPU\'da veri artırmayla '
                'ince ayar yapar. Hiçbir öznitelik elle tanımlanmaz.'),
    onkosul_ek=[
        ('Analiz (Kalkülüs)', 'çok değişkenli türev ve zincir kuralı', None),
        ('Programlama', 'Python, NumPy ve bir derin öğrenme kütüphanesine alışkanlık', '/teaching/computer-and-introduction-to-programming/'),
    ],
    ayrisma=[
        ('YSA', 'YSA nöron, kayıp ve geri yayılımı küçük ağlarda kurar; bu ders derin mimarileri ve onları eğitmenin pratiğini işler.'),
        ('MO', 'Klasik MÖ elle tasarlanmış özniteliklerle çalışır; derin öğrenme öznitelikleri ham veriden kendisi öğrenir.'),
        ('BG', 'Bilgisayarlı görü görüntüyü anlama problemidir; derin öğrenme ise görü, dil ve seste ortak kullanılan araç takımıdır.'),
        ('UM', 'Üretken modeller veri dağılımından örnek üretmeyi amaçlar; bu ders çoğunlukla ayırt edici, tahmin yapan ağlara odaklanır.'),
    ],
    uygulamalar=[
        ('Görüntü sınıflandırma', 'Fotoğraftaki nesneyi ya da hastalığı tanımak.'),
        ('Konuşma tanıma', 'Ses kaydını metne dönüştürmek.'),
        ('Makine çevirisi', 'Dönüştürücü tabanlı çeviri sistemleri.'),
        ('Nesne tespiti', 'Otonom araçta yaya ve araç bulmak.'),
        ('Protein yapısı', 'Amino asit dizisinden üç boyutlu yapı tahmini.'),
        ('Oyun oynama', 'Derin pekiştirmeli öğrenmeyle Atari ve Go.'),
    ],
    araclar=['PyTorch', 'TensorFlow', 'Keras', 'JAX', 'Hugging Face', 'CUDA', 'TensorBoard'],
    veriler=['ImageNet', 'CIFAR-10/100', 'MNIST', 'COCO', 'LibriSpeech', 'Wikipedia metinleri'],
    yanilgilar=[
        ('Derin öğrenme her problemde en iyisidir.', 'Küçük tablo verisinde gradyan artırmalı ağaçlar çoğu zaman daha iyi ve daha ucuzdur.'),
        ('Derin ağ kara kutudur, hiç incelenemez.', 'Gradyan tabanlı belirginlik haritaları, dikkat ağırlıkları gibi araçlar kısmi açıklama verir.'),
        ('Derin öğrenme 2012\'de icat edildi.', 'Fikirler onlarca yıllıktır; 2012\'deki sıçramayı büyük veri ve GPU getirdi.'),
        ('Katman sayısı arttıkça başarı artar.', 'Artık bağlantı ve normalizasyon olmadan çok derin ağlar eğitilemeyebilir.'),
    ],
    meslekler=['Derin öğrenme mühendisi', 'Bilgisayarlı görü mühendisi', 'Araştırmacı', 'ML altyapı mühendisi', 'Uygulamalı bilimci'],
    sonra=('Derin öğrenme bugün haritanın en çok kullanılan aracıdır: bilgisayarlı görü, doğal dil işleme, konuşma tanıma, '
           'üretken modeller ve derin pekiştirmeli öğrenme onun üzerine kurulur. Sistem tarafında GPU programlama, gömülü '
           'YZ ve MLOps bu modelleri hızlandırmayı ve üretime taşımayı öğretir.'),
    kaynaklar=[
        'Goodfellow, Bengio ve Courville, <em>Deep Learning</em>, MIT Press, 2016.',
        'Zhang, Lipton, Li ve Smola, <em>Dive into Deep Learning</em>, Cambridge University Press, 2023.',
        'Prince, <em>Understanding Deep Learning</em>, MIT Press, 2023.',
        'Chollet, <em>Deep Learning with Python</em>, 2. baskı, Manning, 2021.',
        'LeCun, Bengio ve Hinton, "Deep learning", <em>Nature</em> 521, 2015.',
    ],
)
