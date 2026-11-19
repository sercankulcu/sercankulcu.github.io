# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 23: Robotik ve Robot Görüsü dersinin tanıtımı; kinematik, '
             'denetim, konum kestirimi, SLAM, yol planlama, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Kinematik', 'Denetim', 'Konum kestirimi', 'Robot görüsü', 'Yol planlama', 'Komşu dersler'],
    tanim=('Robotik, fiziksel dünyayı algılayıp onda <b>hareket eden makineleri</b> tasarlamayı ve denetlemeyi inceler. '
           'Ders algılama, konum kestirimi, planlama ve denetimi gürültülü ölçümler ve gerçek zaman kısıtı altında '
           'birleştirir; robot görüsü bu döngünün gözüdür.'),
    tarihce=[
        ('1961', 'İlk endüstriyel robot Unimate, General Motors fabrikasında çalışmaya başlar.'),
        ('1966', 'SRI\'da Shakey projesi başlar: algılayıp plan kuran ilk gezgin robot; A* bu proje için geliştirilir.'),
        ('1986', 'Brooks katmanlı (subsumption) mimariyi önerir: plan yerine doğrudan algı-eylem davranışları.'),
        ('1997', 'Sojourner gezgini Mars Pathfinder göreviyle Mars yüzeyinde dolaşır.'),
        ('2002', 'Roomba robot süpürge satışa çıkar; gezgin robotlar evlere girer.'),
        ('2005', 'Stanford\'un Stanley aracı DARPA Grand Challenge çöl yarışını sürücüsüz tamamlayıp kazanır.'),
    ],
    kavramlar=[
        ('Serbestlik derecesi', 'Robotun bağımsız hareket edebildiği eksen sayısı.'),
        ('Koordinat çerçevesi', 'Dünya, robot, kamera; aralarında dönüşüm matrisleri.'),
        ('İleri kinematik', 'Eklem açılarından uç noktanın konumunu bulmak.'),
        ('Ters kinematik', 'İstenen uç konumu için gereken eklem açılarını bulmak.'),
        ('PID denetim', 'Hatayı orantı, integral ve türevle düzelten geri besleme.'),
        ('Konum kestirimi', 'Kalman ve parçacık süzgeciyle gürültülü ölçümden konum.'),
        ('SLAM', 'Haritayı çıkarırken aynı anda haritadaki konumu bulmak.'),
        ('Yol planlama', 'A*, RRT: engellere çarpmadan hedefe giden yol.'),
    ],
    akis=[('Algıla', 'kamera, lidar,\nIMU'), ('Konum\nkestir', 'süzgeç,\nSLAM'), ('Planla', 'yol ve\nyörünge'),
          ('Denetle', 'PID, motor\nkomutları'), ('Eyle', 'tekerlek,\neklemler')],
    akis_ornek=('<b>Örnek:</b> Bir depo robotu lidar ve kamerayla çevresini tarar, haritadaki konumunu parçacık '
                'süzgeciyle kestirir, A* ile raflar arasında yol planlar ve tekerlek hızlarını PID ile ayarlar. Döngü '
                'saniyede onlarca kez döner; her turda ölçüm planı düzeltir.'),
    onkosul_ek=[
        ('Fizik (mekanik)', 'kuvvet, tork, hız ve ivme: robot dinamiğinin dili', None),
        ('Mikroişlemciler', 'algılayıcı okuma, motor sürme ve gerçek zamanlı yazılım', '/teaching/microprocessors/'),
        ('C ile Programlama', 'gömülü denetim yazılımı çoğunlukla C/C++ ile yazılır', '/teaching/programming-with-c/'),
    ],
    ayrisma=[
        ('BG', 'Bilgisayarlı görü sahnede ne olduğunu anlar; robot görüsü görüntüyü konum ve hareket kararına dönüştürür.'),
        ('YZ', 'YZ planlamayı soyut durumlarda yapar; robotik aynı planı sürekli, gürültülü ve fiziksel bir dünyada uygular.'),
        ('PO', 'Pekiştirmeli öğrenme denetimi deneme yanılmayla öğrenir; robotik çoğunlukla model ve denetim kuramıyla tasarlar.'),
        ('GYZ', 'Gömülü YZ modeli küçük cihaza sığdırır; robotik o cihazı algılayıcı ve motorlarla bir döngüye bağlar.'),
    ],
    uygulamalar=[
        ('Endüstriyel kollar', 'Kaynak, boyama, montaj hatları.'),
        ('Depo robotları', 'Raf taşıma ve sipariş toplama.'),
        ('Otonom araçlar', 'Algılama, konum kestirimi ve planlama.'),
        ('Cerrahi robotlar', 'Cerrahın hareketini hassaslaştırmak.'),
        ('Gezegen keşfi', 'Mars gezginleri, uzaktan özerk sürüş.'),
        ('Ev robotları', 'Robot süpürgeler, çim biçme robotları.'),
    ],
    araclar=['ROS 2', 'Gazebo', 'MoveIt', 'OpenCV', 'Point Cloud Library', 'Webots'],
    veriler=['KITTI', 'TUM RGB-D', 'EuRoC MAV', 'nuScenes', 'YCB nesne seti'],
    araclar_not='Robotikte çoğu deneme önce <b>benzetimde</b> yapılır; gerçek robota geçişte sürtünme, gürültü ve gecikme yeni sorunlar doğurur.',
    yanilgilar=[
        ('Robotik yalnızca mekanik ve elektroniktir.', 'Bugünkü robotların zorluğu çoğunlukla yazılımdadır: algılama, konum kestirimi ve planlama.'),
        ('İyi bir plan robotu hedefe götürür.', 'Tekerlek kayar, ölçüm gürültülüdür; plan ancak sürekli geri beslemeyle tutar.'),
        ('Benzetimde çalışan gerçekte de çalışır.', 'Benzetim ile gerçek arasındaki fark (sim-to-real) robotikte ayrı bir araştırma konusudur.'),
        ('Robot görüsü bilgisayarlı görüyle aynıdır.', 'Robot görüsü derinlik, poz ve gerçek zamanı öne çıkarır; sonucu bir harekettir.'),
    ],
    meslekler=['Robotik yazılım mühendisi', 'Denetim mühendisi', 'Algılama mühendisi', 'Otonom sürüş mühendisi', 'Mekatronik mühendisi'],
    sonra=('Robotik, görüyü, öğrenmeyi ve denetimi tek bir fiziksel sistemde buluşturur. Buradan pekiştirmeli öğrenmeyle '
           'hareket öğrenmeye, sürü robotlarla çok etmenli sistemlere ya da gömülü YZ ile cihaz üzerinde çıkarıma '
           'geçilebilir.'),
    kaynaklar=[
        'Siegwart, Nourbakhsh ve Scaramuzza, <em>Introduction to Autonomous Mobile Robots</em>, 2. baskı, MIT Press, 2011.',
        'Thrun, Burgard ve Fox, <em>Probabilistic Robotics</em>, MIT Press, 2005.',
        'Lynch ve Park, <em>Modern Robotics: Mechanics, Planning, and Control</em>, Cambridge University Press, 2017.',
        'Corke, <em>Robotics, Vision and Control</em>, 2. baskı, Springer, 2017.',
    ],
)
