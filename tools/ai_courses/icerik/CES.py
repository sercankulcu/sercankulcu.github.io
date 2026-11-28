# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 14: Çok Etmenli Sistemler dersinin tanıtımı; özerk etmen, '
             'iletişim, eşgüdüm, uzlaşma, oyun kuramı, kısa tarihçe, ön koşullar, komşu dersler ve ayrışma noktaları.'),
    gundem=['Özerk etmen', 'İletişim', 'Eşgüdüm', 'Uzlaşma ve ihale', 'Oyun kuramı', 'Komşu dersler'],
    tanim=('Çok etmenli sistemler, her biri kendi hedefi ve bilgisiyle karar veren birden çok <b>özerk etmenin</b> aynı '
           'ortamda nasıl birlikte çalıştığını ya da yarıştığını inceler. Tek etmenin en iyi kararı yetmez: öteki '
           'etmenlerin ne yapacağı da hesaba katılmalı, ortak davranış iletişim ve kurallarla yönlendirilmelidir.'),
    tarihce=[
        ('1950', 'Nash, her oyuncunun ötekilere göre en iyi yanıt verdiği denge kavramını tanımlar.'),
        ('1980', 'Smith, görevleri etmenler arasında ihaleyle dağıtan Sözleşme Ağı (Contract Net) protokolünü yayımlar.'),
        ('1987', 'Reynolds, üç basit kuralla sürü davranışı üreten boids benzetimini tanıtır.'),
        ('1991', 'Rao ve Georgeff, inanç-istek-niyet (BDI) etmen mimarisini biçimsel olarak tanımlar.'),
        ('1994', 'Littman, Markov oyunlarını çok etmenli pekiştirmeli öğrenmenin çerçevesi olarak önerir.'),
        ('1997', 'İlk RoboCup robot futbol turnuvası Nagoya\'da düzenlenir.'),
    ],
    kavramlar=[
        ('Özerk etmen', 'Dışarıdan yönetilmeden kendi hedefi için karar verir.'),
        ('BDI mimarisi', 'İnanç, istek ve niyetle akıl yürüten etmen modeli.'),
        ('İletişim dili', 'FIPA ACL gibi önerme, istek, bildirim mesajları.'),
        ('Eşgüdüm', 'Etmenlerin eylemlerini çakışmadan uyumlu kılmak.'),
        ('Uzlaşma', 'Çıkarları farklı etmenlerin anlaşmaya varması: pazarlık.'),
        ('İhale ve görev dağıtma', 'Sözleşme Ağı ve açık artırmayla iş bölümü.'),
        ('Nash dengesi', 'Hiçbir etmenin tek başına stratejisini değiştirmek istemediği durum.'),
        ('Ortaya çıkan davranış', 'Basit yerel kurallardan doğan küresel düzen.'),
    ],
    akis=[('Algıla', 'ortam ve\nöteki etmenler'), ('Akıl yürüt', 'inanç,\nhedef'), ('Haberleş', 'mesaj, teklif'),
          ('Eşgüdümle', 'uzlaşma,\nihale'), ('Eyle', 'ortak sonuç')],
    akis_ornek=('<b>Örnek:</b> Bir depoda yüz robot siparişleri toplar. Yeni bir sipariş gelince her robot konumuna göre '
                'teklif verir, en uygun teklif işi alır; robotlar yollarını birbirine bildirerek koridorda çarpışmadan '
                'geçer. Merkezde her şeyi bilen bir planlayıcı yoktur.'),
    onkosul_ek=[
        ('Algoritmik Oyun Kuramı', 'Nash dengesi, mekanizma tasarımı ve açık artırmalar', '/teaching/algorithmic-game-theory/'),
        ('Java ile NYP', 'nesne ve mesajlaşma: JADE gibi etmen platformlarının dili', '/teaching/object-oriented-programming-with-java/'),
        ('Algoritmalar', 'çizge algoritmaları ve dağıtık problemlerin karmaşıklığı', '/teaching/algorithms/'),
    ],
    ayrisma=[
        ('YZ', 'YZ tek etmenin çevresine karşı en iyi kararını arar; bu ders öteki etmenlerin de karar verdiği ortamda ortak davranışı inceler.'),
        ('PO', 'PÖ tek etmenin ödülle öğrenmesini inceler; bu ders öğrenme olsun olmasın iletişim, uzlaşma ve eşgüdüm kurallarını da kapsar.'),
        ('ROB', 'Robotik tek bir makinenin algılama ve hareketini çözer; bu ders birçok robotun ya da yazılım etmeninin iş bölümünü ele alır.'),
        ('EMO', 'Sürü zekâsı algoritmaları sürüyü bir problemi çözmek için araç olarak kullanır; bu derste etmenlerin kendisi ve etkileşimi konudur.'),
    ],
    uygulamalar=[
        ('Depo robotları', 'Yüzlerce robotun görev ve yol paylaşımı.'),
        ('Akıllı şebeke', 'Üretici ve tüketicilerin enerji ticareti.'),
        ('Trafik yönetimi', 'Kavşakların ve araçların eşgüdümü.'),
        ('Otomatik pazarlık', 'Çevrim içi ihale ve reklam açık artırması.'),
        ('Oyunlar', 'Takım hâlinde oynayan bilgisayar rakipler.'),
        ('Toplum benzetimi', 'Salgın, pazar ve kalabalık davranışı.'),
    ],
    araclar=['JADE', 'NetLogo', 'Mesa', 'PettingZoo', 'Jason (AgentSpeak)', 'Repast', 'MASON'],
    veri_baslik='Klasik örnek problemler',
    veriler=['Mahkûm ikilemi', 'Avcı-av problemi', 'RoboCup futbolu', 'StarCraft Çok Etmenli Meydan Okuması (SMAC)', 'Schelling ayrışma modeli', 'Sürü (boids) benzetimi'],
    araclar_not='Bu derste veri çoğunlukla toplanmaz, <b>benzetimle üretilir</b>: etmenlerin kuralları yazılır ve ortak davranış çalıştırılarak gözlenir.',
    yanilgilar=[
        ('Çok etmenli sistem, çok çekirdekli programdır.', 'Paralel programda parçalar tek bir hedefe hizmet eder; etmenler özerktir ve hedefleri çatışabilir.'),
        ('Her etmen en iyisini yaparsa toplam da en iyidir.', 'Mahkûm ikileminde olduğu gibi bireysel olarak akılcı seçimler herkes için kötü bir sonuca varabilir.'),
        ('Eşgüdüm için merkezî bir yönetici gerekir.', 'Sürüler ve ihale protokolleri yerel kurallar ve mesajlarla merkezsiz eşgüdüm kurar.'),
        ('Etmenler hep işbirliği yapar.', 'Etmenler rakip de olabilir; ders işbirliğini, rekabeti ve ikisinin karışımını birlikte inceler.'),
    ],
    meslekler=['Robotik yazılım mühendisi', 'Benzetim ve modelleme uzmanı', 'Oyun YZ geliştiricisi', 'Lojistik sistemleri mühendisi', 'Araştırmacı'],
    sonra=('Çok etmenli sistemler YZ\'yi toplumsal bir bakışla genişletir. Bu dersten sonra öğrenen etmenler için '
           'çok etmenli pekiştirmeli öğrenmeye, fiziksel ekipler için sürü robotiğine, teşvik ve kural tasarımı için '
           'algoritmik oyun kuramına geçilebilir.'),
    kaynaklar=[
        'Wooldridge, <em>An Introduction to MultiAgent Systems</em>, 2. baskı, Wiley, 2009.',
        'Shoham ve Leyton-Brown, <em>Multiagent Systems: Algorithmic, Game-Theoretic, and Logical Foundations</em>, Cambridge University Press, 2009.',
        'Weiss (ed.), <em>Multiagent Systems</em>, 2. baskı, MIT Press, 2013.',
        'Albrecht, Christianos ve Schäfer, <em>Multi-Agent Reinforcement Learning: Foundations and Modern Approaches</em>, MIT Press, 2024.',
    ],
    islenenler=[
        'Akıllı etmenler ve ortam türleri',
        'Tümdengelimli ve tepkisel etmen mimarileri',
        'BDI mimarisi ve pratik akıl yürütme',
        'Etmen iletişimi: söz edimleri, FIPA ACL',
        'Etmen platformları: JADE, Jason',
        'Görev paylaşımı: Sözleşme Ağı, dağıtık planlama',
        'Oyun kuramı: Nash dengesi, mahkûm ikilemi',
        'Toplumsal seçim ve oylama',
        'Açık artırmalar ve mekanizma tasarımı',
        'Pazarlık ve uzlaşma protokolleri',
        'Etmen tabanlı benzetim ve ortaya çıkan davranış',
        'Çok etmenli pekiştirmeli öğrenme',
    ],
    beceriler=['JADE ile etmen ve mesajlaşma yazmak', 'NetLogo ya da Mesa ile benzetim', 'PettingZoo ile öğrenen etmenler',
               'küçük oyunlarda Nash dengesi bulmak', 'ihale ve pazarlık protokolü tasarlamak'],
    hazirlik=[
        ('İki oyunculu bir ödeme matrisinde Nash dengesini bulabiliyor musun?', 'Algoritmik Oyun Kuramı dersinin ilk bölümleri'),
        ('Durum uzayında arama yapan tek bir etmeni açıklayabiliyor musun?', '@YZ'),
        ('Sınıf yazıp nesneler arasında yöntem çağrısıyla mesaj gönderebiliyor musun?', 'Java ile nesne yönelimli programlamaya giriş'),
        ('Bir çizgede en kısa yolu bulan algoritmayı yazabiliyor musun?', 'Algoritmalar dersindeki çizge algoritmaları'),
    ],
    riskler=[
        ('Öngörülemeyen ortak davranış', "Tek tek doğru çalışan etmenler birlikte beklenmedik sonuç doğurur: 2010 Flash Crash'te otomatik işlemler çöküşü hızlandırdı."),
        ('Konuşmadan kartel', 'Fiyat belirleyen öğrenen etmenler, hiç anlaşmadan birbirini cezalandırmayı öğrenip rekabetten yüksek fiyatta buluşabilir.'),
        ('Kuralı oyuna getirmek', 'İhale ya da oylama kuralındaki bir açığı bulan etmen yanlış teklif ya da oy vererek sonucu kendi lehine çevirir.'),
        ('Benzetimi gerçek sanmak', 'Etmen tabanlı salgın ya da pazar benzetiminin sonucu varsayılan kurallara bağlıdır; politika kararına doğrudan taşınmamalı.'),
    ],
)
