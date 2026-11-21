# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 15: Açıklanabilir Yapay Zekâ ve Yapay Zekâ Etiği dersinin tanıtımı; '
             'model açıklama, adalet, sorumluluk, düzenlemeler, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Neden açıklama?', 'Açıklama yöntemleri', 'Yanlılık ve adalet', 'Sorumluluk', 'Düzenlemeler', 'Komşu dersler'],
    tanim=('Bu ders, bir yapay zekâ sisteminin kararını insanların anlayabileceği biçimde <b>açıklamayı</b> ve sistemin '
           'adil, güvenilir ve hesap verebilir olmasını inceler. Teknik soru "model neden bu kararı verdi?", etik soru '
           '"bu karar kime zarar verebilir ve sorumlusu kim?" sorusudur.'),
    tarihce=[
        ('2016', 'ProPublica, COMPAS suç riski puanının siyahi sanıklar aleyhine yanlı olduğunu öne süren analizi yayımlar.'),
        ('2016', 'Ribeiro, Singh ve Guestrin LIME yöntemini tanıtır: tek bir tahmini yerel, basit bir modelle açıklamak.'),
        ('2017', 'Lundberg ve Lee SHAP yöntemini yayımlar: oyun kuramındaki Shapley değerleriyle öznitelik katkısı.'),
        ('2018', 'AB Genel Veri Koruma Tüzüğü (GDPR) yürürlüğe girer; otomatik kararlara itiraz hakkı tanınır.'),
        ('2018', 'Gender Shades çalışması, ticari yüz analizi sistemlerinin koyu tenli kadınlarda çok daha sık yanıldığını gösterir.'),
        ('2024', 'AB Yapay Zekâ Yasası (AI Act) kabul edilir: sistemler risk düzeyine göre sınıflandırılır.'),
    ],
    kavramlar=[
        ('Kara kutu model', 'İç işleyişi insan tarafından izlenemeyen model.'),
        ('Yorumlanabilirlik', 'Doğası gereği okunabilen model: karar ağacı, doğrusal.'),
        ('Yerel açıklama', 'Tek bir tahmini açıklamak: LIME, SHAP değerleri.'),
        ('Genel açıklama', 'Modelin bütün davranışı: öznitelik önemi, PDP.'),
        ('Karşı olgusal', '"Gelirin şu kadar olsaydı kredi onaylanırdı."'),
        ('Veri yanlılığı', 'Eğitim verisindeki dengesizliğin karara taşınması.'),
        ('Adalet ölçütleri', 'Demografik eşitlik, eşit fırsat, kalibrasyon.'),
        ('Hesap verebilirlik', 'Kararın denetlenmesi, kaydı ve sorumlusu.'),
    ],
    akis=[('Bağlamı\nbelirle', 'kim etkilenir,\nrisk ne?'), ('Veriyi\ndenetle', 'temsil,\nyanlılık'),
          ('Modeli\naçıkla', 'SHAP, LIME,\nkarşı olgusal'), ('Adaleti\nölç', 'gruplar arası\nhata oranı'),
          ('Belgele ve\nizle', 'model kartı,\ndenetim')],
    akis_ornek=('<b>Örnek:</b> Bir bankanın kredi modeli başvuru reddeder. SHAP değerleri reddin en çok borç oranından '
                'kaynaklandığını gösterir; gruplar arası karşılaştırma bazı semtlerde ret oranının belirgin yüksek olduğunu '
                'ortaya çıkarır. Ekip semti dolaylı yoldan temsil eden özniteliği çıkarır ve kararı model kartında belgeler.'),
    onkosul_ek=[
        ('Programlama', 'Python ile model eğitme ve sonuçları çözümleme', '/teaching/computer-and-introduction-to-programming/'),
        ('Algoritmik Oyun Kuramı', 'Shapley değeri: SHAP açıklamalarının kuramsal kökeni', '/teaching/algorithmic-game-theory/'),
        ('Felsefe ya da hukuk', 'etik kuramlar, kişisel veri hakları ve sorumluluk kavramı', None),
    ],
    ayrisma=[
        ('MO', 'MÖ modelin doğru tahmin etmesine odaklanır; bu ders tahminin nedenini ve kimi nasıl etkilediğini sorgular.'),
        ('VB', 'Veri bilimi veriden sonuç çıkarır; bu ders o sonucun yanlı, adil ya da açıklanabilir olup olmadığını denetler.'),
        ('SGY', 'Siber güvenlik saldırgana karşı korur; bu ders sistemin saldırı olmadan da insanlara verdiği zararı inceler.'),
        ('US', 'Uzman sistemler kurallarıyla zaten açıktır; bu ders kara kutu modelleri sonradan açıklamanın yollarını arar.'),
    ],
    uygulamalar=[
        ('Kredi kararları', 'Ret gerekçesini başvurana açıklamak.'),
        ('Tıbbi tanı', 'Hekime modelin neye baktığını göstermek.'),
        ('İşe alım', 'Özgeçmiş elemede cinsiyet ve yaş yanlılığı.'),
        ('Yargı ve kamu', 'Risk puanlarının adil olup olmadığını denetlemek.'),
        ('Yüz tanıma', 'Gruplar arası hata farklarını ölçmek.'),
        ('Mevzuata uyum', 'AB YZ Yasası ve KVKK için belgeleme.'),
    ],
    araclar=['SHAP', 'LIME', 'Captum', 'InterpretML', 'Fairlearn', 'AI Fairness 360', 'What-If Tool'],
    veriler=['COMPAS (ProPublica)', 'Adult (gelir)', 'German Credit', 'CelebA', 'Pilot Parliaments Benchmark'],
    araclar_not='Bu derste veri setleri çoğu zaman <b>bir sorunu göstermek</b> için kullanılır: COMPAS ve Adult, yanlılığın nasıl ölçüldüğünün klasik örnekleridir.',
    yanilgilar=[
        ('Korunan özniteliği (cinsiyet, ırk) çıkarmak yeter.', 'Posta kodu ya da isim gibi vekil öznitelikler aynı bilgiyi taşıyabilir; yanlılık sürer.'),
        ('Algoritma sayılarla çalıştığı için tarafsızdır.', 'Model, geçmiş kararlardaki yanlılığı veriden öğrenir ve ölçekler.'),
        ('Açıklama modelin gerçek işleyişini gösterir.', 'LIME ve SHAP gibi yöntemler yaklaşıktır; açıklamanın kendisi de yanıltıcı olabilir.'),
        ('Bütün adalet ölçütleri birlikte sağlanabilir.', 'Gruplar arasında taban oranlar farklıysa kalibrasyon ve eşit hata oranları çoğu zaman birlikte sağlanamaz.'),
    ],
    meslekler=['Sorumlu YZ uzmanı', 'Model denetçisi', 'YZ politika ve uyum uzmanı', 'Veri bilimci', 'Araştırmacı'],
    sonra=('Bu ders bütün uygulama derslerine bir mercek ekler: tıbbi görüntü işlemede tanının açıklanması, siber '
           'güvenlikte modelin aldatılması, MLOps\'ta modelin izlenmesi aynı sorulara dayanır. Teknik tarafta nedensel '
           'çıkarım ve düşmanca dayanıklılık, toplumsal tarafta hukuk ve politika ile devam edilebilir.'),
    kaynaklar=[
        'Molnar, <em>Interpretable Machine Learning</em>, 2. baskı, kendi yayını (çevrim içi), 2022.',
        'Barocas, Hardt ve Narayanan, <em>Fairness and Machine Learning: Limitations and Opportunities</em>, MIT Press, 2023.',
        'O\'Neil, <em>Weapons of Math Destruction</em>, Crown, 2016.',
        'Ribeiro, Singh ve Guestrin, "Why Should I Trust You?: Explaining the Predictions of Any Classifier", <em>KDD</em>, 2016.',
        'Lundberg ve Lee, "A Unified Approach to Interpreting Model Predictions", <em>NeurIPS</em>, 2017.',
    ],
    islenenler=[
        'Yorumlanabilir modeller: doğrusal modeller, ağaçlar',
        'Öznitelik önemi ve kısmi bağımlılık (PDP, ICE)',
        'Yerel açıklamalar: LIME',
        'Shapley değerleri ve SHAP',
        'Derin ağlarda belirginlik haritaları',
        'Karşı olgusal açıklamalar ve başvuru yolu',
        'Açıklamaları değerlendirmek: sadakat ve kararlılık',
        'Adalet ölçütleri ve aralarındaki çelişkiler',
        'Yanlılığı azaltmak: ön, iç ve son işleme',
        'Mahremiyet: anonimleştirme, diferansiyel mahremiyet',
        'Hesap verebilirlik: model kartı, veri sayfası, denetim',
        'Düzenlemeler: GDPR, KVKK, AB Yapay Zekâ Yasası',
    ],
    beceriler=['SHAP ve LIME ile açıklama üretmek', 'Fairlearn ile grup adaletini ölçmek', 'karşı olgusal açıklama üretmek',
               'model kartı yazmak', 'bir sistemin risklerini değerlendirmek'],
    hazirlik=[
        ('Python ile bir sınıflandırıcı eğitip test kümesinde değerlendirebiliyor musun?', '@MO'),
        ('Yanlış pozitif ve yanlış negatif oranlarını hesaplayabiliyor musun?', 'Karışıklık matrisi ve sınıflandırma metrikleri üzerine bir okuma'),
        ('Koşullu olasılığı ve taban oranı açıklayabiliyor musun?', '@OI'),
        ('Shapley değerinin oyun kuramındaki anlamını açıklayabiliyor musun?', 'Algoritmik Oyun Kuramı dersinin Shapley değeri konusu'),
    ],
    riskler=[
        ('Yanıltıcı açıklama', 'LIME ve SHAP yaklaşıktır; kötü niyetli bir model açıklama yöntemine masum görünüp asıl karar kuralını gizleyebilir.'),
        ('Etik yıkama', 'Bir etik ilkeler belgesi ya da tek bir adalet puanı, gerçek denetimin yerine vitrin olarak kullanılabilir.'),
        ('Yanlış adalet ölçütü', 'Ölçüt seçimi bir değer yargısıdır: COMPAS bir ölçüte göre adil, ötekine göre yanlı çıkabildi.'),
        ('Açıklamaya aşırı güven', 'Makul görünen bir açıklama, kullanıcının yanlış bir karara da sorgusuz uymasına yol açabilir.'),
    ],
)
