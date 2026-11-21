# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 6: Doğal Dil İşleme ve Metin Madenciliği dersinin tanıtımı; '
             'metin ön işleme, metin temsili, dil modelleri, dönüştürücüler, kısa tarihçe, komşu dersler, örtüşme ve ayrışma.'),
    gundem=['Metin ön işleme', 'Metin temsili', 'Dil modelleri', 'Dönüştürücüler', 'Metin madenciliği', 'Komşu dersler'],
    tanim=('Doğal dil işleme, bilgisayarın insan dilini çözümlemesini, anlamasını ve üretmesini inceler; metin '
           'madenciliği ise büyük metin yığınlarından bilgi ve örüntü çıkarır. Dersin merkezinde metni sayılara çeviren '
           '<b>metin temsili</b> ve sıradaki sözcüğü tahmin eden dil modelleri vardır.'),
    tarihce=[
        ('1954', 'Georgetown-IBM deneyi: altmışı aşkın Rusça cümle otomatik olarak İngilizceye çevrilir.'),
        ('1966', 'Weizenbaum\'un ELIZA programı basit kalıp eşlemeyle bir terapisti taklit eder.'),
        ('1990\'lar', 'İstatistiksel yöntemler kural tabanlı sistemlerin yerini alır; IBM çeviri modelleri öne çıkar.'),
        ('2013', 'Mikolov ve arkadaşlarının word2vec yöntemi sözcükleri anlamı yansıtan vektörlere gömer.'),
        ('2017', 'Dönüştürücü (transformer) mimarisi tanıtılır; ardından BERT ve GPT gibi önceden eğitilmiş modeller gelir.'),
        ('2022', 'Büyük dil modelleri sohbet arayüzleriyle geniş kitlelere ulaşır.'),
    ],
    kavramlar=[
        ('Belirteçleme', 'Metni sözcük ya da alt sözcük birimlerine bölmek.'),
        ('Biçimbilim', 'Kök ve ek çözümleme; Türkçe gibi eklemeli dillerde kritik.'),
        ('Sözcük torbası', 'Sırayı yok sayıp sözcük sayılarıyla metni temsil etmek.'),
        ('TF-IDF', 'Belgede sık, derlemde seyrek sözcüklere yüksek ağırlık.'),
        ('Sözcük gömmeleri', 'Anlamca yakın sözcükler vektör uzayında yakın durur.'),
        ('Dil modeli', 'Sıradaki sözcüğün olasılığını tahmin eden model.'),
        ('Varlık tanıma', 'Metindeki kişi, yer ve kurum adlarını bulmak.'),
        ('Konu modelleme', 'LDA gibi yöntemlerle belgelerdeki gizli konuları bulmak.'),
    ],
    akis=[('Metni\ntopla', 'derlem'), ('Ön işle', 'belirteçleme,\nkök bulma'), ('Temsil et', 'TF-IDF,\ngömmeler'),
          ('Modelle', 'sınıflandırıcı,\ndönüştürücü'), ('Değerlendir', 'F1, BLEU')],
    akis_ornek=('<b>Örnek:</b> Bir e-ticaret sitesi ürün yorumlarını toplar, metni belirteçlere ayırıp ekleri çözümler, '
                'yorumları önceden eğitilmiş bir dönüştürücüyle vektöre çevirir, olumlu ve olumsuz duygu sınıflandırıcısı '
                'eğitir ve F1 puanıyla ölçer. Sonuç, şikâyetlerin hangi konularda toplandığını gösterir.'),
    onkosul_ek=[
        ('Programlama', 'Python ile dizgi işleme, dosya okuma ve düzenli ifadeler', '/teaching/computer-and-introduction-to-programming/'),
        ('Veri Yapıları', 'sözlük, hash tablosu ve trie: sözcük dağarcığını tutmak için', '/teaching/data-structures/'),
    ],
    ayrisma=[
        ('KSI', 'Konuşma tanıma ses dalgasından metne ulaşır; NLP metin elde edildikten sonra anlamı çözümler.'),
        ('BE', 'Bilgi erişimi sorguya en ilgili belgeyi getirir; NLP belgenin içindeki dili ayrıntılı olarak çözümler ve üretir.'),
        ('VM', 'Veri madenciliği her tür veride örüntü arar; bu ders dilin kendine özgü yapısını (sözcük, ek, cümle) işler.'),
        ('UM', 'Üretken modeller görüntü ve ses dahil her türlü örnek üretir; NLP dili anlama ve çözümleme görevlerini de kapsar.'),
    ],
    uygulamalar=[
        ('Makine çevirisi', 'Diller arasında otomatik çeviri.'),
        ('Duygu çözümlemesi', 'Yorum ve paylaşımlardaki tutumu bulmak.'),
        ('Soru yanıtlama', 'Belgeden ya da bilgi tabanından yanıt bulmak.'),
        ('Özetleme', 'Uzun metni kısa ve öz hâle getirmek.'),
        ('Sohbet asistanları', 'Kullanıcıyla doğal dilde konuşan sistemler.'),
        ('Belge sınıflandırma', 'Haber, dilekçe ya da e-postayı konusuna ayırmak.'),
    ],
    araclar=['NLTK', 'spaCy', 'Hugging Face Transformers', 'Gensim', 'Stanza', 'Zemberek (Türkçe)'],
    veriler=['Penn Treebank', 'CoNLL-2003', 'SQuAD', 'GLUE', 'IMDb film yorumları', 'Wikipedia dökümleri'],
    yanilgilar=[
        ('Model metni insan gibi anlar.', 'Dil modelleri istatistiksel örüntü öğrenir; akıcı metin her zaman doğru ya da tutarlı değildir.'),
        ('İngilizce için yapılan her yöntem Türkçede de çalışır.', 'Eklemeli Türkçede bir kök yüzlerce biçim alır; belirteçleme ve biçimbilim ayrı ele alınır.'),
        ('Büyük dil modelleri çıkınca klasik NLP bitti.', 'TF-IDF, düzenli ifadeler ve küçük modeller hâlâ hızlı, ucuz ve çoğu iş için yeterlidir.'),
        ('Metin madenciliği sözcük saymaktır.', 'Sayım başlangıçtır; varlık, ilişki ve konu çıkarmak dilin yapısını gerektirir.'),
    ],
    meslekler=['NLP mühendisi', 'Hesaplamalı dilbilimci', 'Veri bilimci', 'Arama ve öneri mühendisi', 'Araştırmacı'],
    sonra=('NLP\'den sonra konuşma tanıma ile sözlü dile, bilgi erişimi ile anlamsal aramaya, üretken modeller ile büyük dil '
           'modellerinin iç yapısına geçilebilir. Açıklanabilir YZ ve etik dersi ise dil modellerinin yanlılık ve güvenilirlik '
           'sorunlarını ele alır.'),
    kaynaklar=[
        'Jurafsky ve Martin, <em>Speech and Language Processing</em>, 2. baskı, Prentice Hall, 2009.',
        'Manning ve Schütze, <em>Foundations of Statistical Natural Language Processing</em>, MIT Press, 1999.',
        'Bird, Klein ve Loper, <em>Natural Language Processing with Python</em>, O\'Reilly, 2009.',
        'Eisenstein, <em>Introduction to Natural Language Processing</em>, MIT Press, 2019.',
        'Vaswani ve ark., "Attention Is All You Need", <em>Advances in Neural Information Processing Systems</em> 30, 2017.',
    ],
    islenenler=[
        'Düzenli ifadeler, belirteçleme, normalleştirme',
        'Biçimbilim: kök bulma ve ek çözümleme',
        'n-gram dil modelleri ve yumuşatma',
        'Naive Bayes ve lojistik regresyonla metin sınıflama',
        'Vektör anlambilimi: TF-IDF ve word2vec',
        'Sözcük türü etiketleme ve gizli Markov modelleri',
        'Varlık tanıma ve dizi etiketleme (CRF)',
        'Sözdizimsel çözümleme: bağlılık ağaçları',
        'Yinelemeli ağlarla dil modelleme',
        'Dönüştürücüler, BERT ve önceden eğitme',
        'Makine çevirisi ve BLEU ile değerlendirme',
        'Konu modelleme (LDA) ve bilgi çıkarımı',
    ],
    beceriler=['spaCy ve NLTK ile metin işleme', 'düzenli ifadelerle metin temizlemek', 'Zemberek ile Türkçe biçimbilim',
               'Gensim ile sözcük gömmeleri', 'Hugging Face modeline ince ayar', 'F1 ve BLEU ile değerlendirme'],
    hazirlik=[
        ('Python\'da dizgi işleyip düzenli ifadeyle metin arayabiliyor musun?', 'Programlamaya giriş, ardından düzenli ifadelere kısa bir giriş'),
        ('Sözlük (hash tablosu) kullanarak sözcük sıklığı sayabiliyor musun?', 'Veri Yapıları dersindeki hash tablosu konusu'),
        ('Koşullu olasılığı ve Bayes kuralını açıklayabiliyor musun?', '@OI'),
        ('Bir sınıflandırıcıyı kesinlik, duyarlılık ve F1 ile ölçebiliyor musun?', '@MO'),
    ],
    riskler=[
        ('Uydurma (halüsinasyon)', 'Dil modelleri var olmayan kaynakları akıcı biçimde uydurur; ABD\'de avukatların mahkemeye uydurma içtihat sunduğu davalar oldu.'),
        ('Gömmelerdeki kalıp yargılar', 'Gömmeler "erkek-programcı, kadın-ev hanımı" benzetmesi kurar; çeviri sistemleri cinsiyetsiz "o"yu kalıp yargıyla çevirir.'),
        ('Az kaynaklı diller', 'Modeller en iyi İngilizcede çalışır; Türkçe ve verisi az dillerde aynı sistem belirgin biçimde daha çok hata yapar.'),
        ('Metinle gözetim', 'E-posta, mesaj ve paylaşımlar kişisel veridir (KVKK); metin madenciliği kişileri izlemek ve fişlemek için de kullanılabilir.'),
    ],
)
