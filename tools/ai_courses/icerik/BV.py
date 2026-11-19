# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 27: Büyük Veri Sistemleri dersinin tanıtımı; dağıtık depolama, '
             'MapReduce, Spark, akış işleme, NoSQL, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Üç V', 'Dağıtık depolama', 'MapReduce ve Spark', 'Akış işleme', 'NoSQL ve CAP', 'Komşu dersler'],
    tanim=('Büyük veri sistemleri, <b>tek bir makineye sığmayan</b> ya da tek makinenin yetişemeyeceği hızda gelen veriyi '
           'çok sayıda makineye dağıtarak saklamayı ve işlemeyi inceler. Ders bölümleme, kopyalama, hata toleransı ve '
           'tutarlılık arasındaki ödünleşimlerle ilgilenir.'),
    tarihce=[
        ('2001', 'Laney veri yönetimindeki zorluğu hacim, hız ve çeşitlilik (3V) olarak tanımlar.'),
        ('2003', 'Google File System makalesi: ucuz makinelerden kurulan, hataya dayanıklı dağıtık dosya sistemi.'),
        ('2004', 'Dean ve Ghemawat MapReduce\'u yayımlar: binlerce makinede basit bir programlama modeli.'),
        ('2006', 'Hadoop, GFS ve MapReduce\'un açık kaynak karşılığı olarak ayrı bir Apache projesi olur.'),
        ('2010', 'Spark açık kaynak olarak yayımlanır: ara sonuçları bellekte tutarak yinelemeli işleri hızlandırır.'),
        ('2011', 'LinkedIn Kafka\'yı açık kaynak yapar: olay akışları için dağıtık kayıt (log) sistemi.'),
    ],
    kavramlar=[
        ('Hacim, hız, çeşitlilik', 'Verinin boyutu, geliş hızı ve biçim çokluğu.'),
        ('Dağıtık dosya sistemi', 'Dosyayı bloklara bölüp makinelere kopyalamak.'),
        ('MapReduce', 'Eşle, karıştır, indirge: veriye hesabı götürmek.'),
        ('Bellek içi işleme', 'Spark: ara sonuçları diske yazmadan zincirlemek.'),
        ('Akış işleme', 'Veri gelirken, sınırsız olay akışını işlemek.'),
        ('NoSQL', 'Anahtar-değer, belge, sütun ailesi ve çizge depoları.'),
        ('CAP teoremi', 'Ağ bölünmesinde tutarlılık ile erişilebilirlik arası seçim.'),
        ('Bölümleme, kopyalama', 'Yükü dağıtmak ve makine bozulunca veri kaybetmemek.'),
    ],
    akis=[('Topla', 'Kafka,\nolay akışı'), ('Sakla', 'HDFS, nesne\ndeposu'), ('İşle', 'Spark, Flink'),
          ('Sorgula', 'dağıtık SQL'), ('Sun', 'pano, model,\nrapor')],
    akis_ornek=('<b>Örnek:</b> Bir video sitesi günde milyarlarca izleme olayını Kafka ile toplar, nesne deposunda '
                'tarih bazında bölümler, Spark ile gecelik olarak kullanıcı başına izleme özetleri çıkarır ve sonuçları '
                'analistlerin SQL ile sorgulayabileceği tablolara yazar.'),
    onkosul_ek=[
        ('İşletim Sistemleri', 'süreç, iş parçacığı, dosya sistemi ve G/Ç maliyeti', '/teaching/operating-systems/'),
        ('Java ile Nesneye Yönelik Programlama', 'Hadoop, Spark ve Kafka JVM üzerinde çalışır', '/teaching/object-oriented-programming-with-java/'),
        ('Veritabanı ve SQL', 'ilişkisel model, dizin, işlem (transaction)', None),
    ],
    ayrisma=[
        ('VM', 'Veri madenciliği hangi örüntünün aranacağını sorar; büyük veri sistemleri o aramanın çok makinede nasıl çalışacağını.'),
        ('VB', 'Veri bilimi veriden soru ve sonuç çıkarır; büyük veri sistemleri bunu veri tek makineye sığmadığında mümkün kılar.'),
        ('GPU', 'GPU tek makinede binlerce çekirdekle hesabı hızlandırır; büyük veri sistemleri veriyi makinelere dağıtır, darboğaz ağ ve disktir.'),
        ('MLOPS', 'MLOps modelin yaşam döngüsünü yönetir; büyük veri sistemleri onu besleyen veri boru hatlarını ve depolamayı kurar.'),
    ],
    uygulamalar=[
        ('Günlük analizi', 'Sunucu günlüklerinden hata ve trafik.'),
        ('Tıklama akışı', 'Kullanıcı davranışını anlık izlemek.'),
        ('Öneri altyapısı', 'Milyonlarca kullanıcının geçmişi.'),
        ('Nesnelerin interneti', 'Algılayıcılardan sürekli gelen ölçüm.'),
        ('Finansal işlemler', 'Anlık sahtekârlık uyarısı.'),
        ('Arama dizini', 'Web sayfalarını taramak ve dizinlemek.'),
    ],
    araclar=['Apache Hadoop', 'Apache Spark', 'Apache Kafka', 'Apache Flink', 'Apache Cassandra', 'MongoDB', 'Apache Hive'],
    veriler=['Common Crawl', 'Wikipedia dökümleri', 'NYC TLC taksi kayıtları', 'GDELT', 'Google Books Ngram'],
    yanilgilar=[
        ('Büyük veri çok veri demektir.', 'Ölçüt boyut kadar hız ve çeşitliliktir; asıl soru verinin tek makineye sığıp sığmadığıdır.'),
        ('Dağıtık sistem her zaman daha hızlıdır.', 'Küçük veride tek makine (pandas, SQL) çoğu zaman daha hızlıdır; dağıtmanın ek yükü vardır.'),
        ('Makineyi iki katına çıkarmak süreyi yarılar.', 'Karıştırma (shuffle), ağ trafiği ve en yavaş görev hızlanmayı sınırlar.'),
        ('NoSQL, SQL\'in yerini aldı.', 'NoSQL farklı tutarlılık ödünleşimleri sunar; Spark SQL ve Hive gibi SQL motorları yaygındır.'),
    ],
    meslekler=['Veri mühendisi', 'Büyük veri mimarı', 'Veri platformu mühendisi', 'Bulut mühendisi'],
    sonra=('Büyük veri sistemleri, veri kısmının altyapısıdır. Buradan modelleri üretime taşıyan MLOps\'a, hesabı '
           'hızlandıran GPU ve paralel hesaplamaya ya da bu altyapının üzerinde çalışan veri madenciliği ve veri '
           'bilimine geçilebilir.'),
    kaynaklar=[
        'Kleppmann, <em>Designing Data-Intensive Applications</em>, O\'Reilly, 2017.',
        'White, <em>Hadoop: The Definitive Guide</em>, 4. baskı, O\'Reilly, 2015.',
        'Chambers ve Zaharia, <em>Spark: The Definitive Guide</em>, O\'Reilly, 2018.',
        'Dean ve Ghemawat, "MapReduce: Simplified Data Processing on Large Clusters", <em>OSDI</em>, 2004.',
    ],
)
