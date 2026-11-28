# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 7: Pekiştirmeli Öğrenme dersinin tanıtımı; etmen ve çevre, Markov '
             'karar süreci, değer ve politika, keşif, derin PÖ, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Etmen ve çevre', 'Markov karar süreci', 'Değer fonksiyonu', 'Keşif ve sömürü', 'Derin PÖ', 'Komşu dersler'],
    tanim=('Pekiştirmeli öğrenme, bir etmenin çevreyle etkileşerek, yalnız aldığı <b>ödül sinyaline</b> bakıp uzun vadede '
           'toplam ödülü en büyük yapan davranışı deneme yanılmayla öğrenmesini inceler. Doğru eylem önceden söylenmez; '
           'eylemlerin sonucu çoğu zaman gecikmeli gelir.'),
    tarihce=[
        ('1957', 'Bellman, Dynamic Programming kitabıyla Bellman denklemini ve değer fonksiyonu fikrini ortaya koyar.'),
        ('1988', 'Sutton zamansal fark (TD) öğrenmesini yayımlar: tahmini bir sonraki tahminle düzeltmek.'),
        ('1989', 'Watkins doktora tezinde Q-öğrenmeyi önerir.'),
        ('1992', 'Tesauro\'nun TD-Gammon programı kendine karşı oynayarak tavlada usta düzeyine yaklaşır.'),
        ('2015', 'DeepMind\'ın derin Q-ağı (DQN) Atari oyunlarını ham piksellerden öğrenir (Nature).'),
        ('2016', 'AlphaGo, Go\'da Lee Sedol\'ü yener: ağaç araması, derin ağlar ve pekiştirmeli öğrenme birlikte.'),
    ],
    kavramlar=[
        ('Etmen ve çevre', 'Etmen eylem yapar; çevre yeni durum ve ödül döndürür.'),
        ('Markov karar süreci', 'Durumlar, eylemler, geçiş olasılıkları ve ödüller.'),
        ('Getiri', 'İndirimli (discounted) gelecekteki ödüllerin toplamı.'),
        ('Politika', 'Her durumda hangi eylemin seçileceğini söyleyen kural.'),
        ('Değer fonksiyonu', 'Bir durumdan ya da eylemden beklenen getiri.'),
        ('Keşif ve sömürü', 'Yeni eylem denemek ile bilineni kullanmak arasındaki denge.'),
        ('Zamansal fark', 'TD, Q-öğrenme, SARSA: modelsiz, adım adım öğrenme.'),
        ('Politika gradyanı', 'Politikayı doğrudan, getirinin gradyanıyla iyileştirmek.'),
    ],
    akis=[('Durumu\ngözle', 'çevreden'), ('Eylem seç', 'politika,\nε-açgözlü'), ('Ödül al', 'yeni durum'),
          ('Değeri\ngüncelle', 'TD hatası'), ('Politikayı\niyileştir', 'binlerce\nbölüm')],
    akis_ornek=('<b>Örnek:</b> Bir depo robotu ızgara üzerinde konumunu gözler, çoğu zaman en iyi bildiği yönü bazen de '
                'rastgele bir yönü seçer, rafa ulaşınca +10, duvara çarpınca −1 ödül alır. Q-öğrenme her adımda eylem '
                'değerlerini günceller; binlerce denemeden sonra kısa ve güvenli yol ortaya çıkar.'),
    onkosul_ek=[
        ('Algoritmalar', 'dinamik programlama ve çizgede en kısa yol', '/teaching/algorithms/'),
        ('Programlama', 'Python ile benzetim döngüleri ve diziler', '/teaching/computer-and-introduction-to-programming/'),
    ],
    ayrisma=[
        ('MO', 'Denetimli öğrenmede her örneğin doğru yanıtı verilir; PÖ\'de yalnız gecikmeli bir ödül vardır ve veri etmenin kendi eylemleriyle toplanır.'),
        ('OPT', 'Optimizasyon modeli bilinen bir problemi çözer; PÖ çevrenin modelini bilmeden etkileşerek öğrenir.'),
        ('CES', 'Çok etmenli sistemler etmenlerin eşgüdümünü ve çatışmasını inceler; bu ders çoğunlukla tek etmenin öğrenmesine odaklanır.'),
        ('ROB', 'Robotik algılama, kinematik ve denetimi kapsar; PÖ bunlardan yalnız davranışın deneyimle öğrenilmesine katkı yapar.'),
    ],
    uygulamalar=[
        ('Oyunlar', 'Go, satranç, Atari ve strateji oyunları.'),
        ('Robot denetimi', 'Yürüme, kavrama ve hareket öğrenme.'),
        ('Kaynak yönetimi', 'Veri merkezi soğutma, ağ trafiği yönlendirme.'),
        ('Öneri sistemleri', 'Uzun vadeli kullanıcı memnuniyetini gözetmek.'),
        ('Trafik sinyalleri', 'Kavşaklarda bekleme süresini azaltmak.'),
        ('Dil modeli ince ayarı', 'İnsan geri bildirimiyle pekiştirme (RLHF).'),
    ],
    araclar=['Gymnasium', 'Stable-Baselines3', 'PyTorch', 'RLlib', 'MuJoCo', 'PettingZoo'],
    veri_baslik='Klasik ortamlar',
    veriler=['Izgara dünyası (gridworld)', 'Çok kollu haydut', 'CartPole', 'MountainCar', 'Atari oyunları (ALE)', 'MuJoCo denetim görevleri'],
    araclar_not='PÖ\'de hazır veri seti yerine <b>ortam</b> verilir: etmen veriyi kendi eylemleriyle üretir, bu yüzden benzetim dersin laboratuvarıdır.',
    yanilgilar=[
        ('PÖ denetimli öğrenmenin başka bir adıdır.', 'Doğru eylem hiç söylenmez; etmen yalnız ödülden ve kendi topladığı deneyimden öğrenir.'),
        ('Ödülü yazmak kolaydır.', 'Kötü tasarlanmış ödülü etmen beklenmedik kestirmelerle sömürür (reward hacking).'),
        ('Benzetimde öğrenen robot gerçekte de çalışır.', 'Benzetim ile gerçek dünya arasındaki fark (sim-to-real) ayrıca ele alınmalıdır.'),
        ('PÖ yalnız oyunlar içindir.', 'Denetim, kaynak yönetimi ve dil modellerinin insan geri bildirimiyle eğitimi de PÖ kullanır.'),
    ],
    meslekler=['Pekiştirmeli öğrenme mühendisi', 'Robotik yazılım mühendisi', 'Oyun YZ geliştiricisi', 'Araştırmacı'],
    sonra=('Pekiştirmeli öğrenmeden sonra birden çok etmenin birlikte öğrenmesi için çok etmenli sistemlere, fiziksel '
           'dünyada öğrenen makineler için robotiğe geçilebilir. Derin öğrenme bilgisi derin PÖ\'nün, optimizasyon bilgisi '
           'ise politika gradyanı yöntemlerinin anlaşılmasını kolaylaştırır.'),
    kaynaklar=[
        'Sutton ve Barto, <em>Reinforcement Learning: An Introduction</em>, 2. baskı, MIT Press, 2018.',
        'Szepesvári, <em>Algorithms for Reinforcement Learning</em>, Morgan &amp; Claypool, 2010.',
        'Bertsekas, <em>Reinforcement Learning and Optimal Control</em>, Athena Scientific, 2019.',
        'Mnih ve ark., "Human-level control through deep reinforcement learning", <em>Nature</em> 518, 2015.',
    ],
    islenenler=[
        'Çok kollu haydut problemi ve keşif',
        'Markov karar süreçleri ve Bellman denklemleri',
        'Dinamik programlama: politika ve değer yinelemesi',
        'Monte Carlo yöntemleri',
        'Zamansal fark öğrenmesi: TD(0) ve SARSA',
        'Q-öğrenme ve politika dışı öğrenme',
        'n-adımlı yöntemler ve uygunluk izleri',
        'Fonksiyon yaklaşıklamayla değer kestirimi',
        'Derin Q-ağları: deneyim tekrarı, hedef ağ',
        'Politika gradyanı ve REINFORCE',
        'Aktör-eleştirmen yöntemleri ve PPO',
        'Model tabanlı PÖ ve Monte Carlo ağaç araması',
    ],
    beceriler=['Gymnasium ile ortam kurmak', 'Q-öğrenmeyi sıfırdan yazmak', 'Stable-Baselines3 ile etmen eğitmek',
               'ödül fonksiyonu tasarlamak', 'çok tohumlu deney yürütüp raporlamak'],
    hazirlik=[
        ('Beklenen değeri ve koşullu olasılığı hesaplayabiliyor musun?', '@OI'),
        ('Dinamik programlamayla bir en kısa yol problemini çözebiliyor musun?', 'Algoritmalar dersindeki dinamik programlama konusu'),
        ('Kayıp fonksiyonunu ve gradyan inişini açıklayabiliyor musun?', '@MO'),
        ('Python\'da bir benzetim döngüsü yazıp sonucu grafikle çizebiliyor musun?', 'Programlamaya giriş, ardından Matplotlib\'e kısa bir giriş'),
    ],
    riskler=[
        ('Ödül sömürüsü', 'OpenAI\'ın tekne yarışı etmeni yarışı bitirmek yerine aynı puan hedeflerini vurmak için durmadan daire çizdi.'),
        ('Güvensiz keşif', 'Deneme yanılma gerçek dünyada pahalıdır: keşif yapan bir robot ya da tedavi politikası denerken zarar verebilir.'),
        ('Tekrarlanamayan sonuçlar', 'Aynı algoritma farklı rastgele tohumlarla çok farklı sonuç verir; az tohumla raporlanan üstünlük yanıltıcı olabilir.'),
        ('Kullanıcıyı şekillendirmek', 'Tıklamayı en büyük yapan öneri politikası kullanıcıyı daha uç içeriğe ve bağımlılığa itebilir.'),
    ],
)
