# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 28: Bilgi Erişimi ve Öneri Sistemleri dersinin tanıtımı; '
             'dizinleme, sıralama, işbirlikçi süzme, değerlendirme, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Dizinleme', 'Sorgu ve sıralama', 'İşbirlikçi süzme', 'Değerlendirme', 'Yoğun vektör araması', 'Komşu dersler'],
    tanim=('Bilgi erişimi, bir sorguya karşılık milyonlarca belge arasından en ilgili olanları bulup <b>sıralayan</b> '
           'sistemleri inceler. Öneri sistemleri aynı işi sorgu olmadan yapar: kullanıcının geçmişinden neyi '
           'beğeneceğini kestirir. İkisinin de çıktısı bir yanıt değil, sıralı bir listedir.'),
    tarihce=[
        ('1972', 'Spärck Jones ters belge sıklığını (IDF) önerir: nadir terim daha çok şey söyler.'),
        ('1975', 'Salton ve arkadaşları vektör uzayı modelini yayımlar: belge ve sorgu birer terim vektörüdür.'),
        ('1992', 'Xerox PARC\'ın Tapestry sistemi "işbirlikçi süzme" adını kullanır.'),
        ('1998', 'Brin ve Page, PageRank\'e dayanan Google arama motorunu tanıtır.'),
        ('2006', 'Netflix Prize başlar; kazanan çözümlerde matris ayrıştırma öne çıkar.'),
        ('2020', 'Yoğun vektörlerle erişim ve erişimle desteklenen üretim (RAG) yaygınlaşmaya başlar.'),
    ],
    kavramlar=[
        ('Ters dizin', 'Her terimden onu içeren belgelere giden liste.'),
        ('TF-IDF ve BM25', 'Terim sıklığı ve nadirliğiyle belge puanlamak.'),
        ('Vektör uzayı modeli', 'Benzerliği kosinüs açısıyla ölçmek.'),
        ('Kesinlik, duyarlılık', 'Getirilenlerin ne kadarı ilgili, ilgililerin ne kadarı geldi.'),
        ('Sıralama ölçütleri', 'MAP, MRR, NDCG: sıradaki yer de önemlidir.'),
        ('İşbirlikçi süzme', 'Benzer kullanıcıların beğenisinden öneri yapmak.'),
        ('Matris ayrıştırma', 'Kullanıcı-ürün tablosunu gizli etkenlere bölmek.'),
        ('Soğuk başlangıç', 'Geçmişi olmayan yeni kullanıcı ya da ürün sorunu.'),
    ],
    akis=[('Topla', 'tarama,\netkileşim kaydı'), ('Dizinle', 'ters dizin,\nvektör dizini'), ('Aday getir', 'binlerce\nhızlı aday'),
          ('Sırala', 'öğrenen\nsıralayıcı'), ('Değerlendir', 'NDCG,\nA/B testi')],
    akis_ornek=('<b>Örnek:</b> Bir video platformu izleme kayıtlarını toplar, videoları vektörlerle dizinler, milyonlarca '
                'videodan birkaç yüz aday getirir, bunları izlenme olasılığına göre sıralar ve yeni sıralayıcıyı A/B '
                'testiyle eskisiyle karşılaştırır.'),
    onkosul_ek=[
        ('Veri Yapıları', 'karma tablosu, ağaçlar ve öncelik kuyruğu: dizin ve ilk k sonuç', '/teaching/data-structures/'),
        ('Algoritmalar', 'sıralama, birleştirme ve karmaşıklık: büyük dizinlerde hız', '/teaching/algorithms/'),
    ],
    ayrisma=[
        ('VM', 'Veri madenciliği veride örüntü keşfeder; bu ders keşfi bir kullanıcının o anki ihtiyacına göre sıralı listeye çevirir.'),
        ('NLP', 'NLP dilin yapısını ve anlamını çözümler; bu ders metni yalnızca ilgililik puanı için temsil eder ve sıralar.'),
        ('MO', 'MÖ tek tek örnekleri doğru tahmin etmeye çalışır; bu ders listenin sırasını, özellikle ilk birkaç sonucu önemser.'),
        ('SAA', 'Sosyal ağ analizi ilişkilerin yapısını inceler; bu ders o yapıyı (ör. PageRank) yalnız sıralama sinyali olarak kullanır.'),
    ],
    uygulamalar=[
        ('Web arama', 'Sorguya en ilgili sayfaları sıralamak.'),
        ('E-ticaret önerisi', 'Bunu alanlar şunları da aldı.'),
        ('Video ve müzik', 'Kişiye özel akış ve çalma listeleri.'),
        ('Kurumsal arama', 'Şirket belgeleri ve e-postalarda arama.'),
        ('Haber akışı', 'Gönderileri ilgiye göre sıralamak.'),
        ('RAG', 'Dil modeline doğru belgeleri getirmek.'),
    ],
    araclar=['Apache Lucene', 'Elasticsearch', 'FAISS', 'Pyserini', 'Surprise', 'scikit-learn'],
    veriler=['MovieLens', 'Netflix Prize', 'MS MARCO', 'TREC koleksiyonları', 'Cranfield koleksiyonu', 'Amazon ürün yorumları'],
    yanilgilar=[
        ('Arama motoru sorgudaki sözcükleri bulmaktan ibarettir.', 'Asıl iş eşleşen binlerce belgeyi <b>sıralamaktır</b>; kullanıcı çoğu zaman yalnız ilk sayfaya bakar.'),
        ('En yüksek puanlı ürünleri önermek yeterlidir.', 'Herkese aynı listeyi vermek kişiselleştirme değildir; çeşitlilik ve yenilik de ölçülür.'),
        ('Doğruluk yüksekse öneri iyidir.', 'Puan tahmini hatası düşük bir model kötü sıralama yapabilir; NDCG gibi sıra ölçütleri gerekir.'),
        ('Yoğun vektörler klasik aramayı tamamen bitirdi.', 'BM25 hâlâ güçlü bir taban çizgisidir; birçok sistem ikisini birlikte kullanır.'),
    ],
    meslekler=['Arama mühendisi', 'Öneri sistemi mühendisi', 'Veri bilimci', 'Sıralama (ranking) araştırmacısı'],
    sonra=('Bu dersten sonra doğal dil işlemeyle anlamsal aramaya, sosyal ağ analiziyle bağlantı temelli sıralamaya, '
           'büyük veri sistemleriyle milyarlarca belgeyi dizinlemeye geçilebilir. Erişimle desteklenen üretim, bu dersi '
           'büyük dil modelleriyle doğrudan buluşturur.'),
    kaynaklar=[
        'Manning, Raghavan ve Schütze, <em>Introduction to Information Retrieval</em>, Cambridge University Press, 2008.',
        'Baeza-Yates ve Ribeiro-Neto, <em>Modern Information Retrieval</em>, 2. baskı, Addison-Wesley, 2011.',
        'Aggarwal, <em>Recommender Systems: The Textbook</em>, Springer, 2016.',
        'Koren, Bell ve Volinsky, "Matrix Factorization Techniques for Recommender Systems", <em>IEEE Computer</em> 42(8), 2009.',
    ],
)
