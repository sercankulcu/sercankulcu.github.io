# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 25: Veri Madenciliği dersinin tanıtımı; bilgi keşfi süreci, '
             'birliktelik kuralları, kümeleme, aykırı değerler, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Bilgi keşfi süreci', 'Birliktelik kuralları', 'Kümeleme', 'Aykırı değerler', 'İlginçlik ölçütleri', 'Komşu dersler'],
    tanim=('Veri madenciliği, büyük veri yığınlarında önceden bilinmeyen, geçerli ve işe yarar <b>örüntüleri keşfetmeyi</b> '
           'inceler. Makine öğrenmesiyle aynı algoritmaları kullanır; ama amaç yeni örnekte tahmin değil, verinin '
           'kendisi hakkında kural, küme ve aykırılık bulmaktır.'),
    tarihce=[
        ('1967', 'MacQueen "k-ortalamalar" (k-means) adını verdiği kümeleme yöntemini yayımlar.'),
        ('1989', 'İlk "veri tabanlarında bilgi keşfi" (KDD) çalıştayı düzenlenir; alan adını bulur.'),
        ('1994', 'Agrawal ve Srikant Apriori algoritmasıyla birliktelik kuralı madenciliğini yaygınlaştırır.'),
        ('1996', 'Fayyad ve arkadaşları KDD sürecini tanımlar; aynı yıl yoğunluğa dayalı DBSCAN yayımlanır.'),
        ('2000', 'CRISP-DM 1.0 yayımlanır: veri madenciliği projeleri için sektörden bağımsız süreç modeli.'),
        ('2006', 'Netflix Prize açılır: öneri doğruluğunu yüzde 10 artırana bir milyon dolar ödül.'),
    ],
    kavramlar=[
        ('Bilgi keşfi (KDD)', 'Seçme, ön işleme, dönüştürme, madencilik, yorum.'),
        ('Sık öğe kümeleri', 'Birlikte sık görülen ürünler: Apriori, FP-growth.'),
        ('Birliktelik kuralı', 'X ise Y; destek, güven ve kaldıraç (lift) ile ölçülür.'),
        ('Kümeleme', 'k-ortalamalar, hiyerarşik, DBSCAN; etiketsiz gruplar.'),
        ('Aykırı değer', 'Çoğunluğa benzemeyen kayıt: hata mı, sahtekârlık mı?'),
        ('Tanımlayıcı model', 'Karar ağacı gibi okunabilir, açıklayan modeller.'),
        ('Ön işleme', 'Eksik değer, gürültü, ayrıklaştırma, normalleştirme.'),
        ('Dizisel örüntü', 'Zaman sırasıyla tekrarlanan olay dizileri.'),
    ],
    akis=[('Seç', 'ilgili veri,\nhedef kitle'), ('Ön işle', 'temizleme,\neksik değer'), ('Dönüştür', 'ayrıklaştırma,\nboyut azaltma'),
          ('Madencilik', 'kural, küme,\naykırılık'), ('Yorumla', 'ilginçlik,\nuzman görüşü')],
    akis_ornek=('<b>Örnek:</b> Bir market bir yılın kasa fişlerini seçer, iadeleri ve hatalı kayıtları ayıklar, her fişi '
                'ürün kümesine dönüştürür, Apriori ile "makarna alan sos da alır" gibi kurallar bulur ve kaldıracı '
                'yüksek kuralları raf düzeni için yöneticiye sunar.'),
    onkosul_ek=[
        ('Veritabanı ve SQL', 'tablo, birleştirme ve gruplama: verinin kaynağı', None),
        ('Veri Yapıları', 'karma tablo ve ağaç: FP-growth gibi algoritmaların yapı taşları', '/teaching/data-structures/'),
        ('Algoritmalar', 'karmaşıklık: aday kümelerin üstel büyümesini anlamak', '/teaching/algorithms/'),
    ],
    ayrisma=[
        ('MO', 'Aynı algoritmaları kullanırlar; MÖ yeni örnekte tahmini, veri madenciliği eldeki veride keşfi amaçlar.'),
        ('VB', 'Veri bilimi sorudan karara bütün süreci kapsar; veri madenciliği bu süreçteki örüntü bulma adımına odaklanır.'),
        ('BV', 'Büyük veri sistemleri veriyi saklar ve dağıtık işler; veri madenciliği o veride hangi örüntünün aranacağını sorar.'),
        ('OI', 'İstatistik önceden kurulmuş bir hipotezi sınar; veri madenciliği hipotezi veriden üretir, sonra sınanması gerekir.'),
    ],
    uygulamalar=[
        ('Market sepeti', 'Birlikte alınan ürünler, raf ve kampanya.'),
        ('Müşteri bölütleme', 'Benzer müşterileri gruplamak.'),
        ('Sahtekârlık tespiti', 'Olağandışı işlemleri öne çıkarmak.'),
        ('Web kullanım', 'Ziyaretçilerin gezinme örüntüleri.'),
        ('Arıza kayıtları', 'Birlikte görülen hata kodları.'),
        ('Tıbbi kayıtlar', 'Birlikte görülen tanı ve ilaçlar.'),
    ],
    araclar=['Weka', 'KNIME', 'Orange', 'RapidMiner', 'scikit-learn', 'mlxtend', 'R (arules)'],
    veriler=['Groceries (arules)', 'Online Retail (UCI)', 'Instacart Market Basket', 'Adult (gelir)', 'KDD Cup 1999', 'Mushroom'],
    yanilgilar=[
        ('Veri madenciliği veri toplamaktır.', 'Ad yanıltıcıdır: kazılan veri değil bilgidir; veri zaten vardır, örüntü aranır.'),
        ('Bulunan her kural işe yarar.', 'Binlerce kural çıkar; çoğu bariz ya da tesadüfidir. İlginçlik ölçütleri ve uzman süzgeci gerekir.'),
        ('Güçlü birliktelik neden-sonuçtur.', 'Birlikte görülmek birinin ötekine yol açtığını göstermez; ortak bir neden olabilir.'),
        ('Kümelemenin tek doğru sonucu vardır.', 'Sonucu küme sayısı, uzaklık ölçüsü ve ölçekleme belirler; farklı seçim, farklı küme.'),
    ],
    meslekler=['Veri madenciliği uzmanı', 'Veri analisti', 'İş zekâsı uzmanı', 'Müşteri analitiği uzmanı', 'Dolandırıcılık analisti'],
    sonra=('Veri madenciliği, veri kısmının keşif ayağıdır. Buradan kurallarla öneri sistemlerine, topluluk bulmayla '
           'sosyal ağ analizine, ölçeklenebilir madencilikle büyük veri sistemlerine ya da tahmine odaklanmak için '
           'makine öğrenmesine geçilebilir.'),
    kaynaklar=[
        'Han, Kamber ve Pei, <em>Data Mining: Concepts and Techniques</em>, 3. baskı, Morgan Kaufmann, 2011.',
        'Tan, Steinbach, Karpatne ve Kumar, <em>Introduction to Data Mining</em>, 2. baskı, Pearson, 2019.',
        'Witten, Frank, Hall ve Pal, <em>Data Mining: Practical Machine Learning Tools and Techniques</em>, 4. baskı, Morgan Kaufmann, 2017.',
        'Leskovec, Rajaraman ve Ullman, <em>Mining of Massive Datasets</em>, 3. baskı, Cambridge University Press, 2020.',
    ],
    islenenler=[
        'Veri madenciliği süreci: KDD ve CRISP-DM',
        'Veriyi tanımak: öznitelik türleri, benzerlik',
        'Ön işleme: temizleme, bütünleştirme, indirgeme',
        'Veri ambarı ve OLAP küpleri',
        'Sık öğe kümeleri: Apriori ve FP-growth',
        'Birliktelik kuralları ve ilginçlik ölçütleri',
        'Sınıflandırma: karar ağaçları, kural tabanlı yöntemler',
        'Sınıflandırıcı değerlendirme ve dengesiz sınıflar',
        'Kümeleme: k-ortalamalar ve hiyerarşik yöntemler',
        'Yoğunluğa dayalı kümeleme ve küme geçerliliği',
        'Aykırı değer tespiti',
        'Dizisel örüntü, metin ve çizge madenciliği',
    ],
    beceriler=['pandas ve SQL ile veri hazırlamak', 'mlxtend ile birliktelik kuralı çıkarmak', 'Weka ya da Orange ile hızlı deney',
               'kümeleme sonucunu ölçüp yorumlamak', 'bulguyu iş diline çevirmek'],
    hazirlik=[
        ('İki tabloyu bir SQL sorgusuyla birleştirip gruplayabiliyor musun?', 'Bir veritabanı dersindeki SQL: JOIN ve GROUP BY'),
        ('Koşullu olasılığı ve bağımsızlığı bir örnekle açıklayabiliyor musun?', '@OI'),
        ('Karma tablosunun ne zaman ağaçtan iyi olduğunu açıklayabiliyor musun?', 'Veri Yapıları dersi: karma tabloları ve ağaçlar'),
        ('Python\'da bir CSV dosyasını okuyup eksik değerleri sayabiliyor musun?', 'Programlamaya giriş, ardından pandas\'a kısa bir giriş'),
    ],
    riskler=[
        ('Hassas bilgiyi çıkarsamak', 'Alışveriş sepetinden hamilelik, hastalık ya da maddi sıkıntı çıkarılabilir; kişi bunu hiç paylaşmamış olsa bile.'),
        ('Anonim veri anonim kalmaz', 'Netflix Prize verisi IMDb puanlarıyla eşleştirilip bazı kullanıcılar tanındı; ikinci yarışma bu yüzden iptal edildi.'),
        ('Veri tarama', 'Yeterince çok örüntü aranırsa tesadüfi olanlar da anlamlı görünür; çoklu karşılaştırma düzeltmesi ve yeni veride sınama gerekir.'),
        ('Ayrımcı profilleme', 'Posta koduna ya da alışveriş örüntüsüne göre kurulan müşteri kümeleri, bazı gruplara dolaylı olarak farklı fiyat ve hizmet getirir.'),
    ],
)
