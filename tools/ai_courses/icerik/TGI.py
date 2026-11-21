# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 20: Tıbbi Görüntü İşleme dersinin tanıtımı; görüntüleme yöntemleri, '
             'DICOM, bölütleme, çakıştırma, tanı desteği, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Görüntüleme türleri', 'DICOM ve 3B hacim', 'Bölütleme', 'Çakıştırma', 'Tanı desteği', 'Komşu dersler'],
    tanim=('Tıbbi görüntü işleme, röntgen, BT, MR ve ultrason görüntülerini <b>tanı ve tedaviye</b> yardım edecek biçimde '
           'iyileştirir, bölütler, ölçer ve karşılaştırır. Görüntü işleme ve bilgisayarlı görü yöntemlerini, az veri, '
           'pahalı etiket ve hasta güvenliği kısıtları altında uygular.'),
    tarihce=[
        ('1895', 'Röntgen X ışınlarını keşfeder; ilk tıbbi görüntü, eşinin elinin röntgenidir.'),
        ('1972', 'Hounsfield\'in bilgisayarlı tomografi (BT) tarayıcısı tanıtılır: kesit görüntü hesapla elde edilir.'),
        ('1973', 'Lauterbur manyetik rezonansla ilk görüntüleme makalesini yayımlar; MR\'nin temeli atılır.'),
        ('1993', 'DICOM 3.0 standardı yayımlanır; farklı üreticilerin cihazları aynı dosya biçimini konuşur.'),
        ('2015', 'U-Net yayımlanır: az etiketli tıbbi görüntüde bölütleme için kodlayıcı-çözücü ağ.'),
        ('2018', 'ABD\'de FDA, diyabetik retinopatiyi hekimsiz tarayan IDx-DR sistemine izin verir.'),
    ],
    kavramlar=[
        ('Görüntüleme türleri', 'Röntgen, BT, MR, ultrason, PET: her biri farklı fizik.'),
        ('DICOM', 'Görüntü ve hasta bilgisini birlikte taşıyan standart.'),
        ('Voksel ve hacim', 'BT ve MR üç boyutludur; piksel yerine voksel.'),
        ('Gürültü giderme', 'Düşük dozlu BT\'de ve MR\'de kaliteyi korumak.'),
        ('Bölütleme', 'Organ, tümör ya da damarın sınırını çizmek.'),
        ('Çakıştırma', 'İki görüntüyü (önce/sonra, BT/MR) üst üste getirmek.'),
        ('Destekli tanı (CAD)', 'Bilgisayarın şüpheli bölgeyi hekime işaretlemesi.'),
        ('Klinik değerlendirme', 'Duyarlılık, özgüllük, Dice; hekimle kıyas.'),
    ],
    akis=[('Görüntüle', 'BT, MR,\nröntgen'), ('Ön işle', 'gürültü,\nnormalleştirme'), ('Bölütle', 'organ,\nlezyon'),
          ('Ölç ve\nsınıfla', 'hacim,\nrisk'), ('Hekime\nsun', 'rapor,\nişaret')],
    akis_ornek=('<b>Örnek:</b> Akciğer BT taramasındaki yüzlerce kesit DICOM olarak okunur, akciğer bölgesi bölütlenir ve '
                'bir ağ şüpheli nodülleri işaretler. Önceki taramayla çakıştırılınca nodülün hacmindeki büyüme ölçülür. '
                'Son kararı radyolog verir; sistem yalnız dikkat çeker.'),
    onkosul_ek=[
        ('Programlama', 'Python ile çok boyutlu dizilerle çalışma', '/teaching/computer-and-introduction-to-programming/'),
        ('Fizik', 'X ışını soğurması ve manyetik rezonansın temelleri', None),
        ('Anatomi ve fizyolojiye giriş', 'organları ve görüntüdeki karşılıklarını tanımak', None),
    ],
    ayrisma=[
        ('GI', 'Görüntü işleme genel yöntemleri verir; bu ders onları 3B tıbbi hacimlere, cihaz fiziği ve klinik kısıtlarla uygular.'),
        ('BG', 'Görü milyonlarca etiketli fotoğrafla çalışır; tıbbi görüntüde etiket azdır, uzman ister ve hatanın bedeli yüksektir.'),
        ('AYE', 'Etik dersi açıklanabilirliği genel olarak ele alır; bu ders onu hekimin karara güvenmesi ve sorumluluk için kullanır.'),
        ('BIN', 'Biyoenformatik dizi ve molekül verisine, tıbbi görüntü işleme organ ve doku görüntüsüne bakar.'),
    ],
    uygulamalar=[
        ('Radyoloji', 'Akciğer nodülü ve kırık bulma.'),
        ('Onkoloji', 'Tümör bölütleme, radyoterapi planı.'),
        ('Göz hastalıkları', 'Retina görüntüsünde retinopati taraması.'),
        ('Nöroloji', 'Beyin MR\'ında lezyon ve hacim ölçümü.'),
        ('Patoloji', 'Doku kesitlerinde hücre sayımı.'),
        ('Cerrahi', 'Ameliyat öncesi 3B model ve gezinim.'),
    ],
    araclar=['3D Slicer', 'ITK / SimpleITK', 'MONAI', 'nnU-Net', 'pydicom', 'NiBabel', 'ITK-SNAP'],
    veriler=['BraTS (beyin tümörü)', 'LIDC-IDRI (akciğer BT)', 'ChestX-ray14', 'CheXpert', 'Medical Segmentation Decathlon'],
    araclar_not='Tıbbi veri setleri <b>kişisel sağlık verisidir</b>: anonimleştirme, etik kurul izni ve kullanım sözleşmesi olmadan paylaşılamaz.',
    yanilgilar=[
        ('YZ yakında radyoloğun yerini alacak.', 'Sistemler dar görevlerde destek verir; tanı, bağlam ve sorumluluk hekimde kalır.'),
        ('Yüksek doğruluk klinikte başarı demektir.', 'Az görülen hastalıkta duyarlılık ve özgüllük önemlidir; başka hastanede başarım düşebilir.'),
        ('Tıbbi görüntü sıradan bir fotoğraftır.', 'BT ve MR çoğu zaman 3B\'dir, piksel değerleri fiziksel anlam taşır (Hounsfield birimi).'),
        ('Çok veri toplamak kolaydır.', 'Etiket uzman zamanı ister ve veri gizlilik yasalarıyla korunur.'),
    ],
    meslekler=['Tıbbi görüntüleme mühendisi', 'Biyomedikal yazılım geliştiricisi', 'Klinik YZ araştırmacısı', 'Medikal cihaz düzenleme uzmanı'],
    sonra=('Tıbbi görüntü işleme, görüntü işleme ve bilgisayarlı görünün en sıkı denetlenen uygulama alanıdır. Buradan '
           'derin öğrenmeyle bölütlemeye, açıklanabilir yapay zekâyla klinik güvene, biyoenformatikle moleküler '
           'düzeye geçilebilir.'),
    kaynaklar=[
        'Suetens, <em>Fundamentals of Medical Imaging</em>, 3. baskı, Cambridge University Press, 2017.',
        'Bankman (ed.), <em>Handbook of Medical Image Processing and Analysis</em>, 2. baskı, Academic Press, 2008.',
        'Ronneberger, Fischer ve Brox, "U-Net: Convolutional Networks for Biomedical Image Segmentation", <em>MICCAI</em>, 2015.',
        'Litjens ve diğerleri, "A Survey on Deep Learning in Medical Image Analysis", <em>Medical Image Analysis</em> 42, 2017.',
    ],
    islenenler=[
        'Görüntüleme fiziği: röntgen, BT, MR, ultrason',
        'DICOM, NIfTI ve tıbbi görüntü verisi',
        'Görüntü oluşturma: süzgeçli geri izdüşüm',
        'Gürültü giderme ve görüntü iyileştirme',
        'Klasik bölütleme: eşik, bölge büyütme, seviye kümesi',
        'Derin bölütleme: U-Net ve nnU-Net',
        'Katı ve esnek çakıştırma',
        'Atlas tabanlı çözümleme ve hacim ölçümü',
        'Sınıflandırma ve bilgisayar destekli tanı',
        'Az veriyle öğrenme: veri artırma, aktarım öğrenmesi',
        'Klinik doğrulama: Dice, ROC, okuyucu çalışmaları',
        'Mevzuat, gizlilik ve kliniğe geçiş',
    ],
    beceriler=['pydicom ile DICOM okumak', '3D Slicer ile görüntü etiketlemek', 'MONAI ile bölütleme modeli eğitmek',
               'SimpleITK ile çakıştırma', 'Dice ve ROC ile başarım raporlamak'],
    hazirlik=[
        ('Bir görüntüye süzgeç, eşikleme ve kenar bulma uygulayabiliyor musun?', '@GI'),
        ('Evrişimli bir sinir ağının nasıl eğitildiğini açıklayabiliyor musun?', '@DO'),
        ('Duyarlılık ve özgüllüğü hesaplayıp yorumlayabiliyor musun?', '@OI'),
        ('Python ile üç boyutlu bir NumPy dizisini dilimleyebiliyor musun?', 'Programlamaya giriş, ardından NumPy\'a kısa bir giriş'),
    ],
    riskler=[
        ('Kestirme öğrenme', 'Model hastalık yerine cihaz etiketini ya da hastane işaretini öğrenebilir; göğüs röntgeni modellerinde bu gösterildi.'),
        ('Başka hastanede çöküş', 'Farklı tarayıcı, protokol ve hasta kitlesinde başarım düşer; tek merkezde doğrulama yetmez.'),
        ('Yeniden tanımlama', 'DICOM başlığı kimlik taşır, kafa MR\'ından yüz yeniden oluşturulabilir; anonimleştirme yalnız ad silmek değildir.'),
        ('Otomasyon yanlılığı', 'Hekim modelin işaretlemediği lezyonu gözden kaçırabilir; destek aracı insan denetimini gevşetebilir.'),
    ],
)
