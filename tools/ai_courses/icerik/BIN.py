# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 39: Biyoenformatik dersinin tanıtımı; dizi hizalama, genom '
             'birleştirme, gen ifadesi, protein yapısı, kısa tarihçe, ön koşullar, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Biyolojik veri', 'Dizi hizalama', 'Genom birleştirme', 'Gen ifadesi', 'Protein yapısı', 'Komşu dersler'],
    tanim=('Biyoenformatik, DNA, RNA ve protein dizileri gibi biyolojik verileri algoritma ve istatistikle çözümler. '
           'Ders <b>dizi hizalama</b>, genom birleştirme, gen ifadesi analizi ve protein yapısı tahmini gibi problemleri, '
           'bu verinin büyüklüğü ve gürültüsüyle başa çıkan yöntemlerle ele alır.'),
    tarihce=[
        ('1953', 'Watson ve Crick, Franklin\'in verilerinden de yararlanarak DNA\'nın çift sarmal yapısını önerir.'),
        ('1970', 'Needleman ve Wunsch dinamik programlamayla global dizi hizalama algoritmasını yayımlar.'),
        ('1981', 'Smith ve Waterman yerel dizi hizalama algoritmasını yayımlar.'),
        ('1990', 'BLAST yayımlanır: büyük veritabanlarında hızlı, sezgisel benzerlik araması.'),
        ('2003', 'İnsan Genom Projesi tamamlanır; dizileme maliyeti hızla düşmeye başlar.'),
        ('2020', 'AlphaFold 2, CASP14\'te protein yapısını deneysel yöntemlere yakın doğrulukla tahmin eder.'),
    ],
    kavramlar=[
        ('Dizi hizalama', 'Global ve yerel hizalama; puanlama matrisleri.'),
        ('Dizi veritabanları', 'GenBank, UniProt, PDB; benzerlik araması.'),
        ('Saklı Markov modeli', 'Gen bulma ve protein ailesi profilleri.'),
        ('Genom birleştirme', 'Kısa okumalardan genomu kurmak; de Bruijn çizgesi.'),
        ('Gen ifadesi', 'RNA-seq ile hangi genin ne kadar çalıştığını ölçmek.'),
        ('Filogenetik', 'Dizilerden türlerin akrabalık ağacını kurmak.'),
        ('Protein yapısı', 'Amino asit dizisinden üç boyutlu biçimi tahmin.'),
        ('Çoklu test', 'Binlerce gen sınanınca yanlış keşif oranını denetlemek.'),
    ],
    akis=[('Diziyi\noku', 'dizileme\ncihazı'), ('Temizle ve\nbirleştir', 'kalite, genom\nbirleştirme'),
          ('Hizala', 'referansa,\nveritabanına'), ('Çözümle', 'varyant, ifade,\nmotif'), ('Yorumla', 'biyolojik\nişlev')],
    akis_ornek=('<b>Örnek:</b> Hastadan alınan bir bakteri dizilenir, kısa okumalar bir genoma birleştirilir ve genler '
                'BLAST ile veritabanındaki bilinen dizilerle karşılaştırılır. Antibiyotik direnci genleri bulunursa '
                'hekime hangi ilacın işe yaramayacağı bildirilir.'),
    onkosul_ek=[
        ('Algoritmalar', 'dinamik programlama: dizi hizalamanın temelindeki yöntem', '/teaching/algorithms/'),
        ('Veri Yapıları', 'karma tablolar, ağaçlar ve çizgeler: k-mer sayımı ve genom birleştirme', '/teaching/data-structures/'),
        ('Biyoloji', 'DNA, RNA, protein ve gen ifadesinin temel işleyişi', None),
    ],
    ayrisma=[
        ('MO', 'MÖ genel amaçlı öğrenme yöntemleri geliştirir; bu ders onları dizi ve ifade verisine biyolojik bilgiyle birlikte uygular.'),
        ('VM', 'Veri madenciliği her türlü veride örüntü arar; bu ders DNA ve protein dizilerine özgü hizalama ve motif yöntemlerini kullanır.'),
        ('OGM', 'Olasılıksal grafik modeller genel bir çerçevedir; bu ders saklı Markov modelini gen bulma ve protein ailelerinde kullanır.'),
        ('TGI', 'Tıbbi görüntü işleme organ ve dokunun görüntüsünü çözümler; bu ders moleküler düzeyde dizi ve ifade verisini çözümler.'),
    ],
    uygulamalar=[
        ('Kişiye özel tıp', 'Genetik varyantlara göre tedavi seçimi.'),
        ('Salgın takibi', 'Virüs genomlarıyla yayılma yolunu izlemek.'),
        ('İlaç keşfi', 'Hedef protein ve molekül etkileşimini öngörmek.'),
        ('Kanser genomiği', 'Tümöre özgü mutasyonları bulmak.'),
        ('Tarım', 'Verimli ve dayanıklı bitki çeşidi ıslahı.'),
        ('Evrim çalışmaları', 'Türler arası akrabalığı dizilerle kurmak.'),
    ],
    araclar=['BLAST', 'Biopython', 'Bioconductor (R)', 'BWA', 'SAMtools', 'HMMER', 'PyMOL'],
    veriler=['GenBank', 'UniProt', 'Protein Data Bank (PDB)', 'Gene Expression Omnibus (GEO)', '1000 Genom Projesi',
             'The Cancer Genome Atlas (TCGA)'],
    yanilgilar=[
        ('Bir gen, bir özellik demektir.', 'Çoğu özellik birçok genin ve çevrenin ortak etkisidir; tek genin belirlediği özellikler azdır.'),
        ('Genom dizilenince işlevi de bilinir.', 'Dizi yalnızca bir harf dizisidir; genlerin ne yaptığını bulmak ayrı ve zor bir çözümlemedir.'),
        ('Biyoenformatik yalnız biyologlar içindir.', 'Alanın çekirdeği algoritma, veri yapısı ve istatistiktir; bilgisayar mühendisleri merkezdedir.'),
        ('Binlerce gen sınanınca anlamlı çıkanlar gerçektir.', 'Çoklu test yanlış pozitifleri çoğaltır; yanlış keşif oranı gibi düzeltmeler gerekir.'),
    ],
    meslekler=['Biyoenformatik uzmanı', 'Hesaplamalı biyolog', 'Genomik veri bilimci', 'Biyoistatistikçi',
               'İlaç keşfinde YZ araştırmacısı'],
    sonra=('Biyoenformatik makine öğrenmesini, veri madenciliğini ve olasılıksal modelleri tek bir uygulama alanında '
           'buluşturur. Bu dersten sonra hesaplamalı genomik, yapısal biyoloji ve protein dil modelleri ya da tıbbi '
           'görüntü işleme gibi sağlık alanındaki komşu dersler doğal devamdır.'),
    kaynaklar=[
        'Durbin, Eddy, Krogh ve Mitchison, <em>Biological Sequence Analysis</em>, Cambridge University Press, 1998.',
        'Jones ve Pevzner, <em>An Introduction to Bioinformatics Algorithms</em>, MIT Press, 2004.',
        'Compeau ve Pevzner, <em>Bioinformatics Algorithms: An Active Learning Approach</em>, 3. baskı, Active Learning Publishers, 2018.',
        'Altschul ve ark., "Basic Local Alignment Search Tool", <em>Journal of Molecular Biology</em> 215(3), 1990.',
    ],
)
