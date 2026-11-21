# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 2: Yapay Zekâ dersinin tanıtımı; akıllı etmen, arama, '
             'mantık, belirsizlik, planlama, kısa tarihçe, ön koşullar, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Akıllı etmen', 'Arama', 'Bilgi ve mantık', 'Belirsizlik', 'Planlama', 'Komşu dersler'],
    tanim=('Yapay zekâ, çevresini algılayıp amacına en uygun eylemi seçen <b>akıllı etmenler</b> tasarlamayı inceler. '
           'Ders arama, mantıksal çıkarım, olasılıklı akıl yürütme, planlama ve öğrenmeyi tek bir çerçevede toplar. '
           'Makine öğrenmesi bu çerçevenin bir parçasıdır, tamamı değildir.'),
    not_=None,
    tarihce=[
        ('1950', 'Turing, "Computing Machinery and Intelligence" makalesinde taklit oyununu (Turing testi) önerir.'),
        ('1956', 'Dartmouth yaz okulu: "yapay zekâ" adı konur, alan kurulur.'),
        ('1980\'ler', 'Uzman sistemler (MYCIN, XCON) ticarileşir; beklentiler karşılanmayınca "YZ kışı" gelir.'),
        ('1997', 'Deep Blue satrançta Kasparov\'u yener: güçlü arama ve elle yazılmış değerlendirme.'),
        ('2016', 'AlphaGo, Go\'da Lee Sedol\'ü yener: ağaç araması, derin ağlar ve pekiştirmeli öğrenme birlikte.'),
        ('2022', 'Büyük dil modelleri sohbet arayüzleriyle geniş kitlelere ulaşır.'),
    ],
    kavramlar=[
        ('Akıllı etmen', 'Algılayıcılarla çevreyi algılar, eyleyicilerle onu etkiler.'),
        ('Rasyonellik', 'Başarım ölçütünü en büyük yapması beklenen eylemi seçmek.'),
        ('Durum uzayı araması', 'BFS, DFS, A*; sezgisel (heuristic) fonksiyonlar.'),
        ('Düşmanca arama', 'Oyunlarda minimaks ve alfa-beta budama.'),
        ('Kısıt sağlama', 'Değişken, alan, kısıt: Sudoku, ders programı.'),
        ('Mantık ve bilgi', 'Önerme ve yüklem mantığı, çıkarım kuralları.'),
        ('Belirsizlik', 'Bayes kuralı, Bayes ağları, karar kuramı.'),
        ('Planlama', 'Başlangıçtan hedefe götüren eylem dizisini kurmak.'),
    ],
    akis=[('Algıla', 'algılayıcılar'), ('Temsil et', 'durum,\nbilgi tabanı'), ('Ara ya da\nçıkarım yap', 'arama, mantık,\nolasılık'),
          ('Seç', 'başarım ölçütü'), ('Eyle', 'eyleyiciler')],
    akis_ornek=('<b>Örnek:</b> Bir navigasyon uygulaması konumu algılar, yol ağını bir çizge olarak temsil eder, A* ile '
                'yolları arar, en kısa sürede varılan rotayı seçer ve sürücüyü sesle yönlendirir. Bu döngüde hiçbir şey '
                '"öğrenilmez"; yine de sistem yapay zekâdır.'),
    onkosul_ek=[
        ('Veri Yapıları', 'yığın, kuyruk, öncelik kuyruğu ve çizge: arama algoritmalarının yapı taşları', '/teaching/data-structures/'),
        ('Algoritmalar', 'çizge arama, en kısa yol ve karmaşıklık çözümlemesi', '/teaching/algorithms/'),
        ('Ayrık Matematik', 'önermeler mantığı, kümeler ve ispat yöntemleri', None),
    ],
    ayrisma=[
        ('MO', 'YZ hedefe nasıl ulaşılacağını arayarak ya da çıkarım yaparak bulabilir; MÖ aynı davranışı veriden genelleme yaparak öğrenir.'),
        ('US', 'Uzman sistemler YZ\'nin tek bir yaklaşımıdır (kurallar ve mantık); YZ arama, olasılık ve öğrenmeyi de kapsar.'),
        ('OPT', 'Optimizasyon matematiksel olarak kurulmuş bir problemi çözer; YZ işe problemi etmen, çevre ve hedef olarak modellemekle başlar.'),
        ('CES', 'YZ tek bir etmenin kararına odaklanır; çok etmenli sistemler birbirini etkileyen etmenlerin ortak davranışını inceler.'),
    ],
    uygulamalar=[
        ('Oyunlar', 'Satranç ve Go motorları, oyunlardaki bilgisayar rakipler.'),
        ('Rota planlama', 'Navigasyon, lojistik, depo robotlarının yolu.'),
        ('Çizelgeleme', 'Ders programı, uçuş ekibi ve vardiya planı.'),
        ('Sanal asistanlar', 'Konuşmayı anlayıp göreve dönüştüren sistemler.'),
        ('Otonom araçlar', 'Algılama, tahmin ve planlamanın birleştiği yer.'),
        ('Karar destek', 'Tıpta tanı önerisi, mühendislikte arıza teşhisi.'),
    ],
    araclar=['Python', 'Prolog', 'PDDL planlayıcıları', 'Google OR-Tools', 'Gymnasium', 'pgmpy (Bayes ağları)'],
    veri_baslik='Klasik örnek problemler',
    veriler=['8-bulmaca', 'n-vezir', 'Sudoku', 'Wumpus dünyası', 'Gezgin satıcı', 'Satranç ve Go'],
    araclar_not='YZ dersinde veri seti yerine çoğu zaman <b>problem tanımı</b> verilir: durumlar, eylemler ve hedef bilindiğinde çözüm aranarak bulunur.',
    yanilgilar=[
        ('Yapay zekâ ile makine öğrenmesi aynı şeydir.', 'MÖ, YZ\'nin bir alt alanıdır. Arama, planlama ve mantık öğrenme olmadan da YZ\'dir.'),
        ('YZ insan gibi düşünmeyi amaçlar.', 'Ders çoğunlukla <b>rasyonel davranmayı</b> amaçlar; insanı taklit etmek yaklaşımlardan yalnız biridir.'),
        ('Satranç motorları oynayarak öğrenir.', 'Deep Blue gibi klasik motorlar arama ve elle yazılmış değerlendirme kullanır; öğrenme şart değildir.'),
        ('Sohbet robotları YZ\'nin tamamıdır.', 'Büyük dil modelleri NLP ve üretken modellerin ürünüdür; YZ çok daha geniş bir alandır.'),
    ],
    meslekler=['YZ mühendisi', 'Araştırmacı', 'Oyun YZ geliştiricisi', 'Robotik yazılım mühendisi', 'Karar destek uzmanı'],
    sonra=('YZ bu rehberin çatısıdır: makine öğrenmesi, doğal dil işleme, bulanık mantık, evrimsel optimizasyon, '
           'uzman sistemler ve çok etmenli sistemler onun dallarıdır. Hangi dalın ilginizi çektiğine karar vermek için '
           'önce bu dersin arama, mantık ve belirsizlik konularını görmek iyi bir başlangıçtır.'),
    kaynaklar=[
        'Russell ve Norvig, <em>Artificial Intelligence: A Modern Approach</em>, 4. baskı, Pearson, 2020.',
        'Poole ve Mackworth, <em>Artificial Intelligence: Foundations of Computational Agents</em>, 3. baskı, Cambridge University Press, 2023.',
        'Nilsson, <em>The Quest for Artificial Intelligence</em>, Cambridge University Press, 2010 (alanın tarihi).',
        'Turing, "Computing Machinery and Intelligence", <em>Mind</em> 59(236), 1950.',
    ],
    islenenler=[
        'Akıllı etmenler ve çevre türleri',
        'Bilgisiz arama: BFS, DFS, düzgün maliyetli arama',
        'Sezgisel arama: açgözlü arama ve A*',
        'Yerel arama: tepe tırmanma, benzetimli tavlama',
        'Düşmanca arama: minimaks ve alfa-beta budama',
        'Kısıt sağlama problemleri ve geri izleme',
        'Önerme mantığı ve çözümleme ile çıkarım',
        'Yüklem mantığı ve bilgi temsili',
        'Klasik planlama: STRIPS ve PDDL',
        'Olasılık, Bayes kuralı ve Bayes ağları',
        'Karar kuramı ve Markov karar süreçleri',
        'Örneklerden öğrenme ve pekiştirmeli öğrenme',
    ],
    beceriler=['problemi durum uzayı olarak kurmak', 'A* ve sezgisel fonksiyon yazmak', 'Prolog ile mantık programlama',
               'PDDL ile planlama problemi tanımlamak', 'pgmpy ile Bayes ağı kurmak', 'algoritmaları karmaşıklıkça karşılaştırmak'],
    hazirlik=[
        ('Bir çizgede BFS ve DFS\'yi kâğıt üzerinde adım adım yürütebiliyor musun?', 'Veri Yapıları dersindeki çizge ve kuyruk konuları'),
        ('Öncelik kuyruğunu ve büyük-O gösterimini açıklayabiliyor musun?', 'Algoritmalar dersindeki karmaşıklık çözümlemesi'),
        ('"ve, veya, ise" bağlaçlarıyla doğruluk tablosu kurabiliyor musun?', 'Ayrık matematikteki önermeler mantığı'),
        ('Koşullu olasılığı ve Bayes kuralını açıklayabiliyor musun?', '@OI'),
    ],
    riskler=[
        ('Yanlış başarım ölçütü', 'Etmen ölçütü harfiyen en büyük yapar: yalnız süreyi kısaltan bir rota planlayıcı trafiği dar sokaklara ve okul önlerine yığabilir.'),
        ('Ölçeklenmeyen arama', 'Durum uzayı üstel büyür; oyuncak problemde saniyeler süren arama gerçek boyutta bellek ve zaman sınırını aşar.'),
        ('Eksik bilgi tabanı', 'Kural tabanında olmayanı yanlış sayan sistem, unutulmuş bir kural yüzünden kendinden emin ama hatalı sonuç çıkarır.'),
        ('Özerk kararın sorumluluğu', 'Otonom araç ya da silah sistemi kendi başına karar verdiğinde hatanın hesabını kimin vereceği belirsizleşir.'),
    ],
)
