# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 30: Sosyal Ağ Analizi dersinin tanıtımı; çizge, merkezilik, '
             'topluluk bulma, küçük dünya, yayılım, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Ağ ve çizge', 'Merkezilik', 'Topluluk bulma', 'Ağ modelleri', 'Yayılım', 'Komşu dersler'],
    tanim=('Sosyal ağ analizi kişileri düğüm, ilişkileri bağlantı sayarak oluşan <b>çizgeyi</b> inceler. Soru tek tek '
           'kişilerin özelliği değil, ilişkilerin yapısıdır: kim merkezde, hangi gruplar var, bir söylenti ya da '
           'hastalık ağda nasıl yayılır.'),
    tarihce=[
        ('1736', 'Euler, Königsberg köprüleri problemini çözer; çizge kuramı doğar.'),
        ('1934', 'Moreno, ilişkileri sosyogram adını verdiği çizimlerle gösterir.'),
        ('1967', 'Milgram\'ın mektup deneyi "altı adım" düşüncesini yayar.'),
        ('1973', 'Granovetter "zayıf bağların gücü"nü gösterir: iş fırsatları uzak tanıdıklardan gelir.'),
        ('1998', 'Watts ve Strogatz küçük dünya ağ modelini yayımlar.'),
        ('2008', 'Louvain yöntemi, milyonlarca düğümlü ağlarda hızlı topluluk bulmayı mümkün kılar.'),
    ],
    kavramlar=[
        ('Düğüm ve bağlantı', 'Yönlü ya da yönsüz, ağırlıklı ya da ağırlıksız.'),
        ('Derece dağılımı', 'Az sayıda çok bağlı düğüm, çok sayıda az bağlı.'),
        ('Merkezilik', 'Derece, arasındalık, yakınlık ve özvektör ölçüleri.'),
        ('Kümelenme katsayısı', 'Arkadaşlarımın birbirini tanıma oranı.'),
        ('Küçük dünya', 'Yüksek kümelenme ama kısa ortalama yol.'),
        ('Topluluk', 'İçeride sık, dışarıyla seyrek bağlı düğüm grubu.'),
        ('Modülerlik', 'Bir topluluk bölünmesinin ne kadar iyi olduğu.'),
        ('Yayılım modelleri', 'Bilgi ya da salgının ağda yayılması (SIR).'),
    ],
    akis=[('Ağı kur', 'kim kimle,\nne ilişki'), ('Betimle', 'derece,\nyol uzunluğu'), ('Merkezilik', 'önemli\ndüğümler'),
          ('Topluluk\nbul', 'Louvain,\nmodülerlik'), ('Yorumla', 'görselleştirme,\nsınama')],
    akis_ornek=('<b>Örnek:</b> Bir araştırmacı bir okulun arkadaşlık anketinden ağı kurar, derece dağılımına bakar, '
                'arasındalığı yüksek "köprü" öğrencileri bulur, sınıfları aşan arkadaş gruplarını Louvain ile çıkarır '
                've sonucu çizerek öğretmenlerle tartışır.'),
    onkosul_ek=[
        ('Veri Yapıları', 'komşuluk listesi ve matrisi: çizgeyi bellekte tutmak', '/teaching/data-structures/'),
        ('Algoritmalar', 'BFS, DFS ve en kısa yol: merkezilik hesaplarının temeli', '/teaching/algorithms/'),
        ('Ayrık Matematik', 'çizge kuramı, kümeler ve sayma', None),
    ],
    ayrisma=[
        ('VM', 'Veri madenciliği tablo halindeki kayıtlarda örüntü arar; bu ders kayıtlar arasındaki bağlantıların yapısını inceler.'),
        ('BE', 'Bilgi erişimi PageRank\'i sıralama sinyali olarak kullanır; bu ders merkeziliğin ağ hakkında ne söylediğini sorar.'),
        ('DC', 'Doğrusal cebir komşuluk matrisinin özdeğerlerini hesaplatır; bu ders onları topluluk ve önem olarak yorumlar.'),
        ('CES', 'Çok etmenli sistemler etmenlerin nasıl karar verdiğini modeller; bu ders gözlenen ilişki ağını çözümler.'),
    ],
    uygulamalar=[
        ('Sosyal medya', 'Etkileyici kişiler ve yankı odaları.'),
        ('Salgın bilimi', 'Temas ağında hastalığın yayılması.'),
        ('Sahtekârlık', 'Bağlantılı sahte hesap halkaları.'),
        ('Bilim ağları', 'Atıf ve ortak yazarlık çözümlemesi.'),
        ('Kurum içi ağlar', 'Bilginin şirkette nasıl dolaştığı.'),
        ('Arkadaş önerisi', 'Ortak tanıdığa göre bağlantı tahmini.'),
    ],
    araclar=['NetworkX', 'igraph', 'Gephi', 'graph-tool', 'Neo4j', 'PyTorch Geometric'],
    veriler=['Zachary karate kulübü', 'Les Misérables karakter ağı', 'Enron e-postaları', 'SNAP ağ koleksiyonu',
             'DBLP ortak yazarlık ağı', 'Facebook ego ağları (SNAP)'],
    yanilgilar=[
        ('En çok arkadaşı olan kişi en etkilidir.', 'Derece tek ölçüdür; iki grubu birleştiren köprü kişi (arasındalık) daha kritik olabilir.'),
        ('Ağ çizimine bakmak ağı anlamak için yeter.', 'Büyük ağların çizimi "kıl yumağı"dır; sayısal ölçüler ve sınama gerekir.'),
        ('Topluluk bulmanın tek doğru cevabı vardır.', 'Farklı yöntemler farklı bölünmeler verir; sonuç alan bilgisiyle yorumlanır.'),
        ('Bağlantılı kişiler birbirini etkilemiştir.', 'Benzerler zaten birbirini seçer (homofili); etki ile seçimi ayırmak zordur.'),
    ],
    meslekler=['Ağ bilimci', 'Veri bilimci', 'Sosyal medya analisti', 'Sahtekârlık analisti', 'Hesaplamalı sosyal bilimci'],
    sonra=('Bu dersten sonra çizge sinir ağlarıyla ağ üzerinde öğrenmeye, bilgi erişimiyle bağlantı temelli sıralamaya, '
           'salgın bilimiyle yayılım modellerine geçilebilir. Hesaplamalı sosyal bilimler, bu dersin yöntemlerini '
           'toplum sorularına uygulayan disiplinler arası bir alandır.'),
    kaynaklar=[
        'Wasserman ve Faust, <em>Social Network Analysis: Methods and Applications</em>, Cambridge University Press, 1994.',
        'Easley ve Kleinberg, <em>Networks, Crowds, and Markets</em>, Cambridge University Press, 2010.',
        'Newman, <em>Networks</em>, 2. baskı, Oxford University Press, 2018.',
        'Barabási, <em>Network Science</em>, Cambridge University Press, 2016.',
    ],
    islenenler=[
        'Çizge temelleri: düğüm, bağlantı, komşuluk matrisi',
        'Ağ verisi toplama: anket, iz verisi, ego ağları',
        'Derece dağılımı, yol uzunluğu ve çap',
        'Merkezilik: derece, arasındalık, yakınlık',
        'Özvektör merkeziliği ve PageRank',
        'Kümelenme, üçlü kapanma ve zayıf bağlar',
        'Homofili ve derece uyumu',
        'Rastgele çizgeler ve küçük dünya modeli',
        'Ölçekten bağımsız ağlar ve tercihli bağlanma',
        'Topluluk bulma: modülerlik ve Louvain',
        'Yayılım: SIR modeli ve bilgi yayılması',
        'Bağlantı tahmini ve ağ görselleştirme',
    ],
    beceriler=[
        'NetworkX ile ağ çözümlemek',
        'Gephi ile ağ görselleştirmek',
        'merkezilik ölçülerini yorumlamak',
        'topluluk bulmak ve sınamak',
        'yayılım benzetimi yazmak',
    ],
    hazirlik=[
        ('BFS ile bir çizgede iki düğüm arasındaki en kısa yolu bulabiliyor musun?', 'Algoritmalar dersindeki çizge aramaları'),
        ('Bir matrisin özvektörünün ne anlama geldiğini açıklayabiliyor musun?', '@DC'),
        ('Bir dağılımın ortalamasını ve varyansını hesaplayabiliyor musun?', '@OI'),
        ("Python'da sözlük kullanarak bir kenar listesi dosyasını okuyabiliyor musun?", "Programlamaya giriş, ardından NetworkX'e kısa bir giriş"),
    ],
    riskler=[
        ('Paylaşılmamış bilginin sızması', 'Arkadaşlık ağı, kişinin hiç paylaşmadığı siyasi görüş ya da cinsel yönelim gibi bilgileri tahmin ettirebilir.'),
        ('Adı silmek yetmez', 'Adları silinmiş bir ağda bile bağlantı örüntüsü kişiyi tanıtabilir; yapısal yeniden tanımlama saldırıları bunu gösterdi.'),
        ('Rıza ve veri kazıma', 'Cambridge Analytica olayında bir kişilik testi uygulaması, katılanların arkadaşlarının verisini de rızaları olmadan topladı.'),
        ('Eksik ağ, yanlış sonuç', 'Ankette unutulan ya da platformda görünmeyen bağlar, merkezilik sıralamasını ve toplulukları ciddi biçimde değiştirebilir.'),
    ],
)
