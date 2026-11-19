# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 18: Bilgisayarlı Görü dersinin tanıtımı; tanıma, nesne bulma, '
             'bölütleme, kamera geometrisi, görüntü işlemeden farkı, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Görüntüden anlam', 'Öznitelikler', 'Tanıma ve nesne bulma', 'Kamera ve 3B', 'Video ve hareket', 'Komşu dersler'],
    tanim=('Bilgisayarlı görü, bir görüntüden ya da videodan <b>anlam çıkarmayı</b> inceler: hangi nesneler var, nerede, '
           'sahne nasıl bir üç boyutlu yapıya sahip. Girdi görüntüdür ama çıktı görüntü değil; etiket, kutu, maske ya da '
           'derinliktir. Görüntüyü dönüştürmek görüntü işlemenin işidir.'),
    tarihce=[
        ('1963', 'Larry Roberts\'ın doktora tezi, çizgi çizimlerinden üç boyutlu blokları çıkarır: alanın ilk çalışması.'),
        ('1966', 'MIT\'de "Summer Vision Project": görünün bir yaz projesiyle çözülebileceği düşünülür; çözülmez.'),
        ('1982', 'Marr\'ın Vision kitabı yayımlanır: görüyü katmanlı bir hesaplama süreci olarak tanımlar.'),
        ('1999', 'Lowe SIFT özniteliklerini tanıtır: ölçek ve dönmeden etkilenmeyen yerel nokta eşleme.'),
        ('2001', 'Viola ve Jones gerçek zamanlı yüz bulucuyu yayımlar; dijital fotoğraf makinelerine girer.'),
        ('2012', 'AlexNet ImageNet yarışmasını büyük farkla kazanır; görüde derin öğrenme dönemi başlar.'),
    ],
    kavramlar=[
        ('Yerel öznitelikler', 'Köşe ve anahtar noktalar: Harris, SIFT, ORB.'),
        ('Sınıflandırma', 'Görüntünün bütününe etiket vermek: "kedi".'),
        ('Nesne bulma', 'Her nesneye kutu ve etiket: YOLO, Faster R-CNN.'),
        ('Anlamsal bölütleme', 'Her piksele bir sınıf: yol, yaya, araç.'),
        ('Kamera modeli', 'İğne deliği modeli, kalibrasyon, iç ve dış parametre.'),
        ('Çoklu görüş', 'Stereo, epipolar geometri, hareketten yapı.'),
        ('Hareket ve izleme', 'Optik akış; videoda nesneyi kareden kareye izleme.'),
        ('Evrişimli ağlar', 'CNN ve görüntü dönüştürücüleri (ViT).'),
    ],
    akis=[('Görüntü\nal', 'kamera,\nvideo'), ('Ön işle', 'görüntü işleme\nadımları'), ('Temsil\nçıkar', 'öznitelik,\nCNN'),
          ('Yorumla', 'sınıf, kutu,\nderinlik'), ('Karar ver', 'fren, alarm,\nsayım')],
    akis_ornek=('<b>Örnek:</b> Sürücü destek sistemi ön kameradan kare alır, parlaklığı dengeler, evrişimli bir ağla '
                'öznitelik çıkarır ve yayaları kutularla işaretler; stereo kameradan uzaklıklarını da kestirir. Çıktı bir '
                'görüntü değil, "8 metrede yaya var" bilgisidir; sistem buna göre fren uyarısı verir.'),
    onkosul_ek=[
        ('Doğrusal cebir', 'matris, öz değer ve izdüşüm: kamera geometrisinin dili', None),
        ('Programlama', 'Python ile dizi işlemleri ve kütüphane kullanımı', '/teaching/computer-and-introduction-to-programming/'),
        ('Algoritmalar', 'arama, eşleme ve karmaşıklık: öznitelik eşleme ve izleme', '/teaching/algorithms/'),
    ],
    ayrisma=[
        ('GI', 'Görüntü işlemede girdi de çıktı da görüntüdür; bilgisayarlı görüde girdi görüntü, çıktı anlamdır: etiket, kutu, derinlik.'),
        ('DO', 'Derin öğrenme genel bir araçtır; görü onu kamera geometrisi, çoklu görüş ve hareket bilgisiyle birlikte kullanır.'),
        ('BGR', 'Grafik sahne tanımından görüntü üretir; görü tersini yapar, görüntüden sahneyi kurmaya çalışır.'),
        ('OT', 'Örüntü tanıma her tür ölçümü sınıflandırır; görü sınıflandırmayı uzamsal yapı, konum ve 3B ile birlikte ele alır.'),
    ],
    uygulamalar=[
        ('Otonom sürüş', 'Şerit, yaya ve trafik işareti algılama.'),
        ('Yüz tanıma', 'Telefon kilidi, geçiş kontrolü.'),
        ('Perakende', 'Kasasız mağaza, raf takibi.'),
        ('Artırılmış gerçeklik', 'Kameranın konumunu bulup sahneye nesne eklemek.'),
        ('Endüstri', 'Hatalı ürünü tanıyıp hattan ayırmak.'),
        ('Spor analizi', 'Oyuncu ve top izleme, istatistik.'),
    ],
    araclar=['OpenCV', 'PyTorch / torchvision', 'Ultralytics YOLO', 'Detectron2', 'COLMAP', 'Open3D'],
    veriler=['ImageNet', 'COCO', 'PASCAL VOC', 'KITTI', 'Cityscapes', 'ADE20K'],
    araclar_not='Görü, görüntü işlemenin aksine <b>çok sayıda etiketli görüntüye</b> ihtiyaç duyar; COCO\'da her nesne için kutu ve maske elle çizilmiştir.',
    yanilgilar=[
        ('Bilgisayarlı görü, görüntü işlemenin başka adıdır.', 'Görüntü işleme görüntüyü dönüştürür; görü görüntüden anlam çıkarır. Görü, görüntü işlemeyi ön adım olarak kullanır.'),
        ('Görü artık çözülmüş bir problemdir.', 'Ağlar, eğitim verisinden farklı ışık, hava ya da kamerada hâlâ belirgin biçimde yanılabilir.'),
        ('Görü yalnızca derin öğrenmedir.', 'Kalibrasyon, stereo, SLAM ve 3B yeniden yapılandırma büyük ölçüde geometriye dayanır.'),
        ('Model nesneyi insan gibi "görür".', 'Ağlar dokuya ve bağlama aşırı güvenebilir; küçük bir piksel değişikliği kararı çevirebilir.'),
    ],
    meslekler=['Bilgisayarlı görü mühendisi', 'Otonom sistemler mühendisi', 'AR/VR geliştiricisi', 'Robotik algı mühendisi', 'Araştırmacı'],
    sonra=('Bilgisayarlı görü üçüncü kısmın merkezidir: robotik, biyometri, tıbbi görüntü işleme ve uzaktan algılama onun '
           'yöntemlerini kendi alanlarına uygular. Derinleşmek için derin öğrenme ve üretken modeller, geometri tarafında '
           'bilgisayar grafiği ve robotik ile devam edilebilir.'),
    kaynaklar=[
        'Szeliski, <em>Computer Vision: Algorithms and Applications</em>, 2. baskı, Springer, 2022.',
        'Hartley ve Zisserman, <em>Multiple View Geometry in Computer Vision</em>, 2. baskı, Cambridge University Press, 2004.',
        'Prince, <em>Computer Vision: Models, Learning, and Inference</em>, Cambridge University Press, 2012.',
        'Marr, <em>Vision</em>, W. H. Freeman, 1982.',
    ],
)
