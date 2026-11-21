# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 38: Siber Güvenlikte Yapay Zekâ dersinin tanıtımı; saldırı tespiti, '
             'zararlı yazılım, dengesiz veri, düşmanca saldırılar, kısa tarihçe, komşu dersler, örtüşme ve ayrışma noktaları.'),
    gundem=['Saldırı tespiti', 'Zararlı yazılım', 'Dengesiz veri', 'Düşmanca saldırılar', 'YZ\'nin güvenliği', 'Komşu dersler'],
    tanim=('Siber güvenlikte yapay zekâ iki soruyu birlikte sorar: makine öğrenmesi saldırıları, zararlı yazılımları ve '
           'oltalamayı nasıl yakalar; YZ sistemlerinin kendisi nasıl kandırılır? Alanı ayıran şey <b>düşmanca ortamdır</b>: '
           'karşıda modeli atlatmaya çalışan bir saldırgan vardır.'),
    tarihce=[
        ('1987', 'Denning, saldırı tespitini olağandışı davranışı yakalayan bir model olarak tanımlar.'),
        ('1999', 'KDD Cup 1999 saldırı tespiti veri seti yayımlanır; uzun yıllar ölçüt olarak kullanılır.'),
        ('2002', 'Paul Graham, "A Plan for Spam" ile Bayesçi istenmeyen e-posta süzgecini yaygınlaştırır.'),
        ('2014', 'Szegedy ve ark. düşmanca örnekleri gösterir: gözle görülmeyen değişiklik sınıflandırıcıyı yanıltır.'),
        ('2016', 'DARPA Cyber Grand Challenge: makineler insan müdahalesi olmadan açık bulup yamalar.'),
        ('2023', 'OWASP büyük dil modeli uygulamaları için ilk Top 10 listesini yayımlar; istem enjeksiyonu başta gelir.'),
    ],
    kavramlar=[
        ('Saldırı tespiti', 'İmza tabanlı ve anormallik tabanlı yaklaşımlar.'),
        ('Zararlı yazılım', 'Dosyayı statik ya da davranışsal özniteliklerle sınıflama.'),
        ('Oltalama tespiti', 'Sahte e-posta, alan adı ve web sayfalarını ayırmak.'),
        ('Dengesiz veri', 'Saldırılar normal trafiğin yanında çok nadirdir.'),
        ('Yanlış alarm', 'Kesinlik, duyarlılık; analistin yorulması.'),
        ('Düşmanca örnekler', 'Modeli yanıltmak için özenle bozulmuş girdiler.'),
        ('Veri zehirleme', 'Eğitim verisine kötü niyetli örnek sokmak.'),
        ('İstem enjeksiyonu', 'Dil modeline gizli talimatla amacını değiştirtmek.'),
    ],
    akis=[('Topla', 'ağ akışı,\nkayıtlar'), ('Öznitelik\nçıkar', 'bayt, akış,\ndavranış'),
          ('Sınıfla ya\nda puanla', 'MÖ modeli,\nanormallik'), ('Uyar', 'analist\nkuyruğu'),
          ('Uyum\nsağla', 'yeni saldırı,\nyeniden eğitim')],
    akis_ornek=('<b>Örnek:</b> Bir kurumun ağ geçidi bağlantı kayıtlarını toplar; her bağlantı için süre, bayt sayısı ve '
                'port gibi öznitelikler çıkarılır. Bir model şüpheli akışları puanlar ve yalnız en yüksek puanlılar '
                'analiste gider. Analistin kararları yeni etiketlere dönüşür ve model güncellenir.'),
    onkosul_ek=[
        ('İşletim Sistemleri', 'süreçler, dosya sistemi ve izinler: saldırıların hedef aldığı katman', '/teaching/operating-systems/'),
        ('Bilgisayar Ağları', 'TCP/IP, port ve paketler: ağ trafiğini okuyabilmek', None),
        ('C ile Programlama', 'bellek ve işaretçiler: taşma açıklarının nasıl oluştuğunu görmek', '/teaching/programming-with-c/'),
    ],
    ayrisma=[
        ('MO', 'MÖ veri dağılımının sabit kaldığını varsayar; bu derste karşı taraf modeli atlatmak için girdiyi bilerek değiştirir.'),
        ('AYE', 'Açıklanabilir YZ güvenilirliği genel olarak ele alır; bu ders saldırgana karşı dayanıklılığa ve saldırıyı yakalamaya odaklanır.'),
        ('BIO', 'Biyometri kişiyi tanıyarak kimlik doğrular; bu ders ağdan dosyaya, e-postadan modele kadar geniş saldırı yüzeyine bakar.'),
        ('VM', 'Veri madenciliği olağandışı örüntüleri keşif için arar; bu ders onları saldırı olarak yorumlar ve alarma dönüştürür.'),
    ],
    uygulamalar=[
        ('Saldırı tespiti', 'Ağ trafiğinde olağandışı bağlantıları bulmak.'),
        ('Zararlı yazılım', 'Dosyayı çalıştırmadan zararlı mı diye kestirmek.'),
        ('Oltalama ve spam', 'Sahte e-posta ve web sayfalarını ayıklamak.'),
        ('Sahtekârlık', 'Şüpheli işlem ve hesap ele geçirme tespiti.'),
        ('Güvenlik operasyonu', 'Binlerce uyarıyı önceliklendirip sunmak.'),
        ('YZ\'yi korumak', 'Düşmanca örnek, zehirleme, istem enjeksiyonu.'),
    ],
    araclar=['scikit-learn', 'Zeek', 'Suricata', 'Wireshark', 'YARA', 'Elastic Stack', 'Adversarial Robustness Toolbox'],
    veriler=['KDD Cup 1999 / NSL-KDD', 'CICIDS2017', 'UNSW-NB15', 'EMBER (zararlı yazılım)', 'Enron-Spam', 'PhishTank'],
    araclar_not='Eski veri setleri (KDD Cup 1999) hâlâ çok kullanılır ama bugünün trafiğini yansıtmaz; sonuçlar güncel veri setlerinde de sınanmalıdır.',
    yanilgilar=[
        ('%99 doğruluk iyi bir saldırı tespitidir.', 'Saldırılar çok nadirse her şeye normal diyen model de %99 doğrudur; kesinlik ve yanlış alarm oranı bakılır.'),
        ('Model bir kez eğitilince saldırıları yakalar.', 'Saldırganlar yöntem değiştirir; model yeni örneklerle sürekli güncellenmelidir.'),
        ('YZ güvenlik analistinin yerini alır.', 'YZ uyarıları süzer ve önceliklendirir; karar ve soruşturma hâlâ insandadır.'),
        ('Derin ağlar saldırıya karşı dayanıklıdır.', 'Göze görünmeyen küçük değişiklikler (düşmanca örnekler) modelin kararını kolayca değiştirebilir.'),
    ],
    meslekler=['Güvenlik analisti (SOC)', 'Tehdit avcısı', 'Zararlı yazılım analisti', 'Güvenlik veri bilimcisi',
               'YZ güvenliği uzmanı'],
    sonra=('Bu ders iki yöne açılır: güvenlik tarafında ağ güvenliği, adli bilişim ve zararlı yazılım analizi; yapay zekâ '
           'tarafında düşmanca dayanıklılık, gizliliği koruyan öğrenme ve büyük dil modellerinin güvenliği. '
           'Açıklanabilir YZ ve etik dersi bu ikinci yolun doğal komşusudur.'),
    kaynaklar=[
        'Chio ve Freeman, <em>Machine Learning and Security</em>, O\'Reilly, 2018.',
        'Denning, "An Intrusion-Detection Model", <em>IEEE Transactions on Software Engineering</em> 13(2), 1987.',
        'Sommer ve Paxson, "Outside the Closed World: On Using Machine Learning for Network Intrusion Detection", <em>IEEE Symposium on Security and Privacy</em>, 2010.',
        'Goodfellow, Shlens ve Szegedy, "Explaining and Harnessing Adversarial Examples", <em>ICLR</em>, 2015.',
    ],
    islenenler=[
        'Tehdit modeli ve güvenlikte MÖ\'nün sınırları',
        'Ağ trafiği ve kayıtlardan öznitelik çıkarma',
        'İmza ve anormallik tabanlı saldırı tespiti',
        'Dengesiz veri, yanlış alarm ve uygun ölçütler',
        'Zararlı yazılım: statik ve davranışsal analiz',
        'Oltalama, spam ve kötü niyetli URL tespiti',
        'Sahtekârlık ve hesap ele geçirme tespiti',
        'Kavram kayması ve saldırganın uyum sağlaması',
        'Düşmanca örnekler ve kaçınma saldırıları',
        'Veri zehirleme ve arka kapılar',
        'Model çalma, üyelik çıkarımı ve mahremiyet',
        'Dil modeli güvenliği: istem enjeksiyonu',
    ],
    beceriler=['Wireshark ve Zeek ile trafik okumak', 'scikit-learn ile saldırı sınıflandırıcı', 'YARA kuralı yazmak', 'dengesiz veride doğru ölçütü seçmek', 'ART ile düşmanca saldırı denemek'],
    hazirlik=[
        ('Dengesiz bir veri setinde kesinlik ve duyarlılığı yorumlayabiliyor musun?', '@MO'),
        ('Bir TCP bağlantısının nasıl kurulduğunu ve portun ne olduğunu açıklayabiliyor musun?', 'Bilgisayar ağları dersindeki TCP/IP konuları'),
        ('Linux\'ta süreçleri, dosya izinlerini ve sistem kayıtlarını inceleyebiliyor musun?', 'İşletim sistemleri dersi ve Linux komut satırı'),
        ('Bir arabellek taşmasının bellekte nasıl oluştuğunu açıklayabiliyor musun?', 'C ile Programlama dersindeki işaretçi ve diziler'),
    ],
    riskler=[
        ('Çift kullanım', 'Tespit için öğrenilen teknikler, tespiti atlatan zararlı yazılım ya da ikna edici oltalama e-postası üretmekte de kullanılır.'),
        ('İzinsiz test', 'Başkasının ağını ya da sistemini izinsiz taramak suçtur; deneyler yalnız yalıtılmış laboratuvarda ve yazılı izinle yapılır.'),
        ('Çalışanların gözetlenmesi', 'İç tehdit tespiti çalışanların e-posta ve davranışlarını izler; orantılılık ve KVKK sınırları gözetilmelidir.'),
        ('Otomatik müdahale', 'Modelin kararıyla bağlantıyı ya da hesabı kendiliğinden kesmek, yanlış alarmda meşru kullanıcıları ve işi durdurur.'),
    ],
)
