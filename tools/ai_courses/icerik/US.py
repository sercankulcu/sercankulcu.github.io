# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 11: Uzman Sistemler ve Bilgi Temsili dersinin tanıtımı; '
             'kurallar, çıkarım motoru, ontoloji, bilgi çizgesi, kısa tarihçe, ön koşullar, komşu dersler ve ayrışma noktaları.'),
    gundem=['Bilgi temsili', 'Kural tabanı', 'Çıkarım motoru', 'Ontolojiler', 'Bilgi edinme', 'Komşu dersler'],
    tanim=('Uzman sistemler, bir alan uzmanının bilgisini kurallar ve olgular biçiminde bir <b>bilgi tabanına</b> yazar '
           've bir çıkarım motoruyla bu bilgiden sonuç çıkarır. Bilgi temsili ise bilginin bilgisayarın akıl '
           'yürütebileceği biçimde nasıl kodlanacağını inceler: mantık, çerçeveler, anlamsal ağlar ve ontolojiler.'),
    tarihce=[
        ('1965', 'Stanford\'da DENDRAL başlar: kütle spektrumundan molekül yapısı çıkaran ilk uzman sistem.'),
        ('1972', 'Colmerauer ve Roussel Prolog dilini geliştirir: mantık programlama doğar.'),
        ('1970\'ler', 'MYCIN kan enfeksiyonlarında antibiyotik önerir; kurallarına güven çarpanları ekler.'),
        ('1980', 'DEC\'te R1 (XCON) bilgisayar siparişlerini yapılandırmaya başlar; ilk büyük ticari başarı.'),
        ('1984', 'Lenat, sağduyu bilgisini elle kodlamayı amaçlayan Cyc projesini başlatır.'),
        ('2012', 'Google Knowledge Graph\'ı duyurur; bilgi çizgeleri aramada yaygınlaşır.'),
    ],
    kavramlar=[
        ('Bilgi tabanı', 'Alanla ilgili olgular ve EĞER-İSE kuralları.'),
        ('Çıkarım motoru', 'Kuralları olgulara uygulayıp yeni sonuç üreten bölüm.'),
        ('İleri zincirleme', 'Olgulardan başlayıp ulaşılabilen sonuçları türetmek.'),
        ('Geri zincirleme', 'Hedeften başlayıp onu destekleyen olguları aramak.'),
        ('Açıklama birimi', 'Sonuca hangi kurallarla varıldığını gösterir.'),
        ('Çerçeve ve ağ', 'Nesneleri yuva (slot) ve ilişkilerle temsil etmek.'),
        ('Ontoloji', 'Bir alanın kavramları, sınıfları ve ilişkileri: OWL.'),
        ('Bilgi edinme', 'Uzmandan bilgiyi çıkarma; sistemin darboğazı.'),
    ],
    akis=[('Uzmanla\ngörüş', 'bilgi edinme'), ('Kodla', 'kurallar,\nontoloji'), ('Olguları\nal', 'kullanıcı\nyanıtları'),
          ('Çıkarım\nyap', 'ileri ya da\ngeri zincir'), ('Açıkla', 'sonuç ve\ngerekçe')],
    akis_ornek=('<b>Örnek:</b> Bir arıza teşhis sistemi teknisyenlerin deneyimini "motor çalışmıyor ve akü gerilimi '
                'düşükse aküyü değiştir" gibi kurallara döker. Kullanıcıya belirtileri sorar, kuralları zincirleyerek '
                'arızayı bulur ve hangi kuralları kullandığını adım adım gösterir.'),
    onkosul_ek=[
        ('Ayrık Matematik', 'önerme ve yüklem mantığı, çıkarım kuralları', None),
        ('Veri Yapıları', 'ağaç, çizge ve eşleme tabloları: kural ve olgu deposu', '/teaching/data-structures/'),
        ('Java ile NYP', 'sınıf ve kalıtım: çerçeve temsiline ve Drools\'a köprü', '/teaching/object-oriented-programming-with-java/'),
    ],
    ayrisma=[
        ('MO', 'MÖ bilgiyi örneklerden öğrenir ve çoğu zaman gerekçe vermez; uzman sistem bilgiyi uzmandan alır ve sonucunu kurallarla açıklar.'),
        ('BM', 'Bulanık mantık kuralların kısmen doğru olmasına izin verir; bu ders bilgiyi temsil etmeyi ve kuralları zincirlemeyi genel olarak öğretir.'),
        ('OGM', 'OGM belirsizliği olasılık dağılımlarıyla tutarlı biçimde modeller; uzman sistemler bilgiyi çoğunlukla keskin kurallarla yazar.'),
        ('AYE', 'AYE öğrenilmiş modellere sonradan açıklama arar; uzman sistem baştan okunabilir kurallarla kurulduğu için kendini açıklar.'),
    ],
    uygulamalar=[
        ('Tıbbi karar destek', 'Belirti ve tahlilden tanı ve tedavi önerisi.'),
        ('Arıza teşhisi', 'Makine, araç ve ağ sorunlarını bulmak.'),
        ('Ürün yapılandırma', 'Uyumlu parçalardan sipariş kurmak.'),
        ('İş kuralları', 'Kredi onayı, sigorta ve mevzuat denetimi.'),
        ('Bilgi çizgeleri', 'Arama motorlarında varlık ve ilişki bilgisi.'),
        ('Anlamsal web', 'Verileri ontolojilerle birbirine bağlamak.'),
    ],
    araclar=['CLIPS', 'Drools', 'SWI-Prolog', 'Protégé', 'Apache Jena', 'Neo4j'],
    veri_baslik='Tanınmış bilgi tabanları',
    veriler=['Wikidata', 'DBpedia', 'WordNet', 'Gene Ontology', 'SNOMED CT', 'Protégé Pizza ontolojisi'],
    yanilgilar=[
        ('Uzman sistemler 1980\'lerde kalmış bir modadır.', 'Adı değişse de iş kuralı motorları ve bilgi çizgeleri bugün bankacılıkta, sağlıkta ve aramada kullanılır.'),
        ('Uzman sistem uzman kadar bilir.', 'Yalnız kodlanan bilgiyi bilir; alanın dışına çıkınca ya da sağduyu gerektiğinde hızla yanılır.'),
        ('Kuralları yazmak kolaydır.', 'Uzman bilgisinin çoğu örtüktür; onu kurala dökmek (bilgi edinme) en zor ve pahalı adımdır.'),
        ('Büyük dil modelleri bilgi temsilini gereksiz kıldı.', 'Dil modelleri yanlış bilgi üretebilir; doğrulanabilir sonuç için bilgi çizgeleriyle birlikte kullanılır.'),
    ],
    meslekler=['Bilgi mühendisi', 'Ontoloji uzmanı', 'Karar destek sistemleri geliştiricisi', 'İş kuralları analisti'],
    sonra=('Bu ders sembolik yapay zekânın kapısıdır. Sonrasında belirsizliği tutarlı biçimde ele almak için olasılıksal '
           'grafik modellere, kısmi doğruluk için bulanık mantığa, kararların açıklanması ve sorumluluğu için açıklanabilir '
           'YZ ve etiğe geçilebilir.'),
    kaynaklar=[
        'Jackson, <em>Introduction to Expert Systems</em>, 3. baskı, Addison-Wesley, 1999.',
        'Brachman ve Levesque, <em>Knowledge Representation and Reasoning</em>, Morgan Kaufmann, 2004.',
        'Giarratano ve Riley, <em>Expert Systems: Principles and Programming</em>, 4. baskı, Thomson Course Technology, 2005.',
        'Buchanan ve Shortliffe (ed.), <em>Rule-Based Expert Systems: The MYCIN Experiments of the Stanford Heuristic Programming Project</em>, Addison-Wesley, 1984.',
    ],
)
