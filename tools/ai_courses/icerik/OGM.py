# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 12: Olasılıksal Grafik Modeller dersinin tanıtımı; Bayes ağları, '
             'Markov ağları, saklı Markov modeli, çıkarım ve öğrenme, kısa tarihçe, komşu dersler ve ayrışma noktaları.'),
    gundem=['Bayes ağları', 'Markov ağları', 'Koşullu bağımsızlık', 'Çıkarım', 'Parametre öğrenme', 'Komşu dersler'],
    tanim=('Olasılıksal grafik modeller, çok sayıda belirsiz değişkenin ortak dağılımını bir <b>çizge</b> ile gösterir: '
           'düğümler değişkenler, kenarlar doğrudan bağımlılıklardır. Çizgenin söylediği koşullu bağımsızlıklar dev bir '
           'dağılımı küçük parçalara böler; böylece hem modellemek hem de sorgulamak mümkün olur.'),
    tarihce=[
        ('1906', 'Markov, bir sonraki durumun yalnız şimdiki duruma bağlı olduğu zincirleri inceler.'),
        ('1966', 'Baum ve Petrie saklı Markov modelinin (HMM) istatistiksel temelini yayımlar.'),
        ('1977', 'Dempster, Laird ve Rubin, eksik veriyle öğrenmek için EM algoritmasını yayımlar.'),
        ('1988', 'Pearl "Probabilistic Reasoning in Intelligent Systems" kitabıyla Bayes ağlarını YZ\'ye taşır.'),
        ('1989', 'Rabiner\'in HMM öğretici makalesi konuşma tanımada standart başvuru olur.'),
        ('2001', 'Lafferty, McCallum ve Pereira dizi etiketleme için koşullu rastgele alanları (CRF) önerir.'),
    ],
    kavramlar=[
        ('Ortak dağılım', 'Bütün değişkenlerin birlikte alabileceği değerlerin olasılığı.'),
        ('Koşullu bağımsızlık', 'Bir değişken bilinince ötekiler birbirini etkilemez.'),
        ('Bayes ağı', 'Yönlü, döngüsüz çizge; her düğümde koşullu olasılık tablosu.'),
        ('Markov ağı', 'Yönsüz çizge; ilişkiler potansiyel fonksiyonlarıyla.'),
        ('Saklı Markov modeli', 'Gözlenmeyen durum zinciri ve her durumdan bir gözlem.'),
        ('Kesin çıkarım', 'Değişken eleme, kavşak ağacı (junction tree).'),
        ('Yaklaşık çıkarım', 'Örnekleme (MCMC), döngülü inanç yayılımı, değişimsel.'),
        ('Öğrenme', 'Parametreler (EM) ve yapı: çizgenin kendisini veriden bulmak.'),
    ],
    akis=[('Değişkenleri\nseç', 'neler belirsiz?'), ('Çizgeyi\nkur', 'bağımlılıklar'), ('Olasılıkları\nver', 'uzman ya da\nveri (EM)'),
          ('Kanıt gir', 'gözlenenler'), ('Sorgula', 'koşullu\nolasılık')],
    akis_ornek=('<b>Örnek:</b> Bir tanı ağında sigara, kanser ve öksürük düğümleri vardır. Hekim tablolarını literatürden '
                'doldurur. Hasta öksürüyor ve sigara içiyorsa bu iki kanıt girilir; ağ kanser olasılığını yeniden hesaplar '
                've hangi testin belirsizliği en çok azaltacağını gösterir.'),
    onkosul_ek=[
        ('Algoritmalar', 'çizge dolaşma, dinamik programlama (Viterbi, ileri-geri)', '/teaching/algorithms/'),
        ('Veri Yapıları', 'çizge gösterimi, ağaç ve öncelik kuyruğu', '/teaching/data-structures/'),
    ],
    ayrisma=[
        ('OI', 'Olasılık ve istatistik birkaç değişkenin dağılımını inceler; bu ders yüzlerce değişkeni çizgeyle parçalayarak modellemeyi öğretir.'),
        ('MO', 'MÖ çoğu zaman tek bir hedefi tahmin eder; OGM bütün değişkenlerin ortak dağılımını kurar ve herhangi birini sorgulatır.'),
        ('UM', 'Üretken modeller örnek üretmek için büyük sinir ağları kullanır; bu ders açık, yorumlanabilir yapı ve kesin çıkarım üzerinde durur.'),
        ('US', 'Uzman sistemler bilgiyi keskin kurallarla yazar; OGM aynı bilgiyi olasılıklarla yazar ve kanıtları tutarlı biçimde birleştirir.'),
    ],
    uygulamalar=[
        ('Tıbbi tanı', 'Belirti ve testlerden hastalık olasılığı.'),
        ('Konuşma tanıma', 'HMM ile sesten sözcük dizisi.'),
        ('Dizi etiketleme', 'Sözcük türü ve varlık adı bulma (CRF).'),
        ('Biyoenformatik', 'Gen bulma ve dizi hizalama.'),
        ('Arıza teşhisi', 'Gözlenen belirtilerden en olası arıza.'),
        ('Görüntü bölütleme', 'Komşu piksellerin etiket uyumu (MRF).'),
    ],
    araclar=['pgmpy', 'PyMC', 'Stan', 'hmmlearn', 'Pyro', 'GeNIe ve SMILE', 'bnlearn (R)'],
    veri_baslik='Klasik ağlar ve veri setleri',
    veriler=['Asia (göğüs kliniği) ağı', 'ALARM ağı', 'Yağmur-fıskiye ağı', 'Insurance ağı', 'CoNLL-2003', 'TIMIT'],
    yanilgilar=[
        ('Kenar neden-sonuç ilişkisi demektir.', 'Bayes ağında kenar yalnız olasılıksal bağımlılıktır; nedensellik ayrıca varsayım ya da deney ister.'),
        ('Bağlantı yoksa değişkenler bağımsızdır.', 'Bağımsızlık koşulludur; iki düğüm ortak bir çocukları gözlenince bağımlı hâle gelebilir.'),
        ('Çıkarım her zaman kolayca hesaplanır.', 'Genel çizgelerde kesin çıkarım NP-zordur; büyük modellerde yaklaşık yöntemler gerekir.'),
        ('Derin öğrenme bu alanı gereksiz kıldı.', 'Az veri, açıklanabilirlik ve belirsizlik ölçümü gereken yerlerde OGM hâlâ güçlüdür; ikisi birleştirilir de.'),
    ],
    meslekler=['Makine öğrenmesi araştırmacısı', 'Veri bilimci', 'Biyoistatistikçi', 'Konuşma ve dil teknolojileri mühendisi'],
    sonra=('Olasılıksal grafik modeller olasılığı yapıyla buluşturur. Bu dersten sonra gizil değişkenli üretken '
           'modellere, dizi modelleriyle doğal dil işlemeye ve biyoenformatiğe ya da nedensel çıkarıma geçmek '
           'doğal adımlardır.'),
    kaynaklar=[
        'Koller ve Friedman, <em>Probabilistic Graphical Models: Principles and Techniques</em>, MIT Press, 2009.',
        'Pearl, <em>Probabilistic Reasoning in Intelligent Systems</em>, Morgan Kaufmann, 1988.',
        'Murphy, <em>Machine Learning: A Probabilistic Perspective</em>, MIT Press, 2012.',
        'Darwiche, <em>Modeling and Reasoning with Bayesian Networks</em>, Cambridge University Press, 2009.',
        'Rabiner, "A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition", <em>Proceedings of the IEEE</em> 77(2), 1989.',
    ],
    islenenler=[
        'Olasılık tekrarı; ortak dağılım ve çarpanlara ayırma',
        'Bayes ağları ve d-ayrılma',
        'Markov ağları ve çarpan çizgeleri',
        'Kesin çıkarım: değişken eleme',
        'İnanç yayılımı ve kavşak ağacı',
        'Örneklemeyle çıkarım: Gibbs, MCMC',
        'Değişimsel çıkarım',
        'Saklı Markov modelleri: ileri-geri, Viterbi',
        'Koşullu rastgele alanlar ve dizi etiketleme',
        'Parametre öğrenme: en çok olabilirlik, Bayesçi',
        'Eksik veriyle öğrenme: EM algoritması',
        'Yapı öğrenme ve nedensel çıkarıma giriş',
    ],
    beceriler=['pgmpy ile Bayes ağı kurmak', 'hmmlearn ile dizi modellemek', 'PyMC ya da Stan ile Bayesçi model',
               'koşullu bağımsızlığı çizgeden okumak', 'çıkarım sonucunu yorumlamak'],
    hazirlik=[
        ('Bayes kuralıyla bir koşullu olasılığı hesaplayabiliyor musun?', '@OI'),
        ('Bir çizgeyi komşuluk listesiyle gösterip dolaşabiliyor musun?', 'Veri Yapıları dersindeki çizge gösterimi'),
        ('Bir problemi dinamik programlamayla alt problemlere bölüp çözebiliyor musun?', 'Algoritmalar dersindeki dinamik programlama'),
        ('En çok olabilirlik kestirimini bir örnekle açıklayabiliyor musun?', '@MO'),
    ],
    riskler=[
        ('Tahminle doldurulan tablolar', 'Veri yoksa olasılık tabloları uzman tahminiyle dolar; yüzde 83 gibi kesin görünen sonuç bu tahminlerin belirsizliğini gizler.'),
        ('Yanlış bağımsızlık varsayımı', 'Gerçekte bağımlı iki kanıtı bağımsız saymak aynı bilgiyi iki kez sayar; model aşırı emin bir sonuca varır.'),
        ('Mahkemede olasılık hatası', 'Kanıtın olasılığını suçluluğun olasılığı sanmak (savcı yanılgısı) ve taban oranını unutmak masum birini suçlu gösterebilir.'),
        ('Yakınsamamış örnekleme', 'MCMC zinciri erken durdurulursa sonsal dağılım yanlış çıkar; yakınsama tanıları raporlanmadan sonuç güvenilmez.'),
    ],
)
