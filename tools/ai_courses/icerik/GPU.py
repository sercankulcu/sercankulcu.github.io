# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 37: GPU Programlama ve Paralel Hesaplama dersinin tanıtımı; '
             'iş parçacığı modeli, bellek hiyerarşisi, paralel desenler, hızlanma, kısa tarihçe, komşu dersler ve ayrışma noktaları.'),
    gundem=['CPU ve GPU', 'İş parçacığı modeli', 'Bellek hiyerarşisi', 'Paralel desenler', 'Başarım ölçümü', 'Komşu dersler'],
    tanim=('GPU programlama, aynı işlemi binlerce veri öğesine aynı anda uygulayan <b>veri paralel</b> hesaplamayı '
           'inceler. Ders CUDA gibi bir model üzerinden iş parçacıklarını düzenlemeyi, bellek hiyerarşisini verimli '
           'kullanmayı ve hızlanmayı ölçmeyi öğretir; derin öğrenmeyi pratikte mümkün kılan da bu donanımdır.'),
    tarihce=[
        ('1966', 'Flynn bilgisayarları SISD, SIMD, MISD ve MIMD olarak sınıflandırır.'),
        ('1967', 'Amdahl, sıralı kalan kısmın paralel hızlanmayı sınırladığını gösterir (Amdahl yasası).'),
        ('1999', 'NVIDIA GeForce 256, "GPU" adıyla piyasaya çıkar.'),
        ('2007', 'NVIDIA CUDA\'yı yayımlar: GPU, C benzeri bir dille genel amaçlı programlanabilir olur.'),
        ('2012', 'AlexNet iki GPU üzerinde eğitilip ImageNet\'i kazanır; GPU derin öğrenmenin motoru olur.'),
        ('2017', 'Volta mimarisi tensör çekirdeklerini getirir: matris çarpımına özel donanım birimleri.'),
    ],
    kavramlar=[
        ('SIMT ve warp', '32 iş parçacığı aynı komutu birlikte yürütür.'),
        ('İş parçacığı düzeni', 'Izgara (grid), blok ve iş parçacığı hiyerarşisi.'),
        ('Bellek hiyerarşisi', 'Yazmaç, paylaşılan bellek, global bellek.'),
        ('Birleşik erişim', 'Komşu iş parçacıkları komşu adreslere erişmeli.'),
        ('Eşzamanlama', 'Bariyer, atomik işlemler ve yarış durumu.'),
        ('Amdahl yasası', 'Sıralı kalan kısım hızlanmanın üst sınırını koyar.'),
        ('Doluluk', 'Çekirdekleri meşgul tutacak kadar iş parçacığı.'),
        ('Paralel desenler', 'Map, indirgeme, önek toplamı, stencil.'),
    ],
    akis=[('Paralellik\nbul', 'veri paralel\ndöngüler'), ('Veriyi\naktar', 'CPU → GPU\nbelleği'),
          ('Çekirdeği\nbaşlat', 'ızgara, blok,\niş parçacığı'), ('Sonucu\ngetir', 'GPU → CPU'),
          ('Ölç ve\niyileştir', 'profil,\nbellek erişimi')],
    akis_ornek=('<b>Örnek:</b> İki milyon elemanlı iki vektörü toplamak için her elemana bir iş parçacığı atanır: '
                'diziler GPU belleğine kopyalanır, 256 iş parçacıklı bloklarla çekirdek başlatılır ve sonuç geri alınır. '
                'Ölçüm çoğu zaman sürenin hesapta değil, veri kopyalamada geçtiğini gösterir.'),
    onkosul_ek=[
        ('C ile Programlama', 'işaretçiler, diziler ve bellek ayırma: CUDA C\'nin temeli', '/teaching/programming-with-c/'),
        ('İşletim Sistemleri', 'iş parçacıkları, eşzamanlama ve yarış durumu', '/teaching/operating-systems/'),
        ('Mikroişlemciler', 'yazmaç, önbellek ve bellek hiyerarşisi', '/teaching/microprocessors/'),
    ],
    ayrisma=[
        ('DO', 'Derin öğrenme GPU\'yu hazır kütüphanelerle kullanır; bu ders o kütüphanelerin altındaki çekirdekleri ve bellek erişimini yazar.'),
        ('BV', 'Büyük veri sistemleri işi çok sayıda makineye dağıtır; bu ders tek bir cihazdaki binlerce çekirdeği verimli kullanır.'),
        ('BGR', 'Bilgisayar grafiği GPU\'yu gölgelendiricilerle görüntü çizmek için programlar; bu ders onu genel amaçlı hesap için kullanır.'),
        ('GYZ', 'Gömülü YZ az güçle yetinmeyi öğretir; bu ders en büyük hızlandırıcıdan en yüksek başarımı almayı öğretir.'),
    ],
    uygulamalar=[
        ('Derin öğrenme', 'Matris çarpımı ve evrişim tensör çekirdeklerinde.'),
        ('Bilimsel benzetim', 'Akışkanlar, iklim ve moleküler dinamik.'),
        ('Görüntü ve video', 'Gerçek zamanlı süzgeçler, kodlama ve çözme.'),
        ('Finans', 'Monte Carlo ile risk ve fiyatlama hesabı.'),
        ('Biyoenformatik', 'Dizi hizalama ve protein yapısı hesapları.'),
        ('Veri analitiği', 'GPU üzerinde tablo ve veri tabanı işlemleri.'),
    ],
    araclar=['CUDA', 'OpenCL', 'OpenMP', 'MPI', 'Numba', 'CuPy', 'NVIDIA Nsight'],
    veri_baslik='Klasik örnek problemler',
    veriler=['Vektör toplama', 'Matris çarpımı', 'Paralel indirgeme', 'Önek toplamı (tarama)', 'Histogram', 'N-cisim benzetimi'],
    araclar_not='Ölçüt <b>hızlanmadır</b>: aynı problemin sıralı CPU sürümü ile paralel GPU sürümü aynı girdide karşılaştırılır.',
    yanilgilar=[
        ('GPU her programı hızlandırır.', 'Yalnız çok sayıda bağımsız ve benzer işlem içeren kısımlar hızlanır; dallanan ve sıralı kısımlar hızlanmaz.'),
        ('Çekirdek sayısı iki katına çıkınca süre yarıya iner.', 'Amdahl yasası: sıralı kalan kısım, elde edilebilecek hızlanmanın üst sınırını belirler.'),
        ('En pahalı iş hesaptır.', 'Çoğu GPU programında darboğaz bellek bant genişliği ve CPU ile GPU arasındaki veri aktarımıdır.'),
        ('Paralel programlama yalnız derin öğrenme içindir.', 'Benzetim, grafik ve bilimsel hesap GPU\'yu derin öğrenmeden önce de kullanıyordu.'),
    ],
    meslekler=['GPU yazılım mühendisi', 'Yüksek başarımlı hesaplama (HPC) uzmanı', 'MÖ altyapı mühendisi',
               'Oyun ve grafik motoru geliştiricisi', 'Bilimsel hesaplama araştırmacısı'],
    sonra=('GPU programlama, derin öğrenmenin ve grafiğin altındaki motoru açar. Buradan dağıtık eğitim, derleyiciler '
           've hızlandırıcı tasarımı gibi sistem konularına ya da büyük veri sistemleri ve gömülü YZ gibi rehberdeki '
           'komşu derslere geçilebilir.'),
    kaynaklar=[
        'Kirk, Hwu ve El Hajj, <em>Programming Massively Parallel Processors</em>, 4. baskı, Morgan Kaufmann, 2022.',
        'Sanders ve Kandrot, <em>CUDA by Example</em>, Addison-Wesley, 2010.',
        'Hennessy ve Patterson, <em>Computer Architecture: A Quantitative Approach</em>, 6. baskı, Morgan Kaufmann, 2017.',
        'Amdahl, "Validity of the Single Processor Approach to Achieving Large Scale Computing Capabilities", <em>AFIPS Conference Proceedings</em> 30, 1967.',
    ],
)
