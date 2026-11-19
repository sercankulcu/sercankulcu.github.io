# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Yapay Zekâ ve Veri Dersleri Rehberi Bölüm 9: Bulanık Mantık ve Bulanık Sistemler dersinin tanıtımı; '
             'bulanık küme, üyelik fonksiyonu, dilsel kurallar, bulanık denetim, kısa tarihçe, komşu dersler ve ayrışma noktaları.'),
    gundem=['Bulanık kümeler', 'Üyelik fonksiyonu', 'Dilsel kurallar', 'Bulanık çıkarım', 'Bulanık denetim', 'Komşu dersler'],
    tanim=('Bulanık mantık, bir ögenin bir kümeye ya ait olduğu ya da olmadığı keskin ayrımı bırakır; ögeye 0 ile 1 '
           'arasında bir <b>üyelik derecesi</b> verir. Böylece "sıcak", "biraz hızlı" gibi dilsel kavramlarla kurallar '
           'yazılır ve bu kurallardan sayısal bir karar ya da denetim sinyali üretilir.'),
    tarihce=[
        ('1965', 'Zadeh "Fuzzy Sets" makalesini yayımlar: kısmi üyelikli küme kavramı doğar.'),
        ('1973', 'Zadeh dilsel değişkenleri ve bulanık EĞER-İSE kurallarıyla yaklaşık akıl yürütmeyi tanıtır.'),
        ('1975', 'Mamdani ve Assilian bir buhar makinesini ilk bulanık denetleyiciyle denetler.'),
        ('1985', 'Takagi ve Sugeno, kural sonuçları fonksiyon olan bulanık modeli (TS modeli) önerir.'),
        ('1987', 'Japonya\'da Sendai metrosu bulanık denetimle hızlanıp durarak hizmete girer.'),
        ('1993', 'Jang, bulanık kuralları sinir ağı gibi eğiten ANFIS\'i yayımlar.'),
    ],
    kavramlar=[
        ('Bulanık küme', 'Her ögenin 0 ile 1 arasında bir üyelik derecesi var.'),
        ('Üyelik fonksiyonu', 'Üçgen, yamuk, Gauss: değeri dereceye çevirir.'),
        ('Dilsel değişken', 'Değerleri sözcük olan değişken: düşük, orta, yüksek.'),
        ('Bulanık işlemler', 'VE için en küçük, VEYA için en büyük, DEĞİL için 1-µ.'),
        ('Kural tabanı', 'EĞER sıcaklık yüksek İSE fan hızlı biçiminde kurallar.'),
        ('Mamdani çıkarımı', 'Kural sonuçları bulanık küme; sonra durulaştırılır.'),
        ('Sugeno çıkarımı', 'Kural sonuçları girdilerin fonksiyonu; hesabı hızlı.'),
        ('Durulaştırma', 'Bulanık sonucu tek sayıya indirmek: ağırlık merkezi.'),
    ],
    akis=[('Ölç', 'keskin girdi'), ('Üyeliğe\nçevir', 'bulanıklaştırma'), ('Kuralları\nuygula', 'EĞER-İSE\ntabanı'),
          ('Birleştir', 'sonuç kümesi'), ('Durulaştır', 'keskin çıktı')],
    akis_ornek=('<b>Örnek:</b> Bir klima odayı 27 °C ölçer; bu değer "sıcak" kümesine 0,7, "ılık" kümesine 0,3 '
                'derecesiyle üyedir. "Sıcaksa soğutma güçlü" ve "ılıksa soğutma orta" kuralları bu derecelerle '
                'çalışır, sonuçlar birleşir ve ağırlık merkezi kompresöre yüzde 72 gibi tek bir güç değeri verir.'),
    onkosul_ek=[
        ('Ayrık Matematik', 'kümeler, bağıntılar ve önermeler mantığı', None),
        ('Programlama', 'fonksiyon yazma ve basit benzetim kurma', '/teaching/computer-and-introduction-to-programming/'),
        ('Denetim Sistemleri', 'geri besleme ve PID denetleyici kavramı', None),
    ],
    ayrisma=[
        ('OI', 'Olasılık bir olayın olup olmayacağındaki belirsizliği ölçer; bu ders bir kavramın ne ölçüde geçerli olduğunu, yani belirsiz sınırı ölçer.'),
        ('US', 'Uzman sistemler kuralları çoğunlukla keskin mantıkla işletir; bu ders kuralların kısmen doğru olabildiği yaklaşık akıl yürütmeyi kurar.'),
        ('ROB', 'Robotik denetimin tamamını ele alır; bu ders bulanık denetleyiciyi model gerektirmeyen bir seçenek olarak öğretir.'),
        ('YSA', 'YSA kuralları veriden ağırlık olarak öğrenir ve okunmaz; bulanık sistemin kuralları uzmandan gelir ve okunabilir.'),
    ],
    uygulamalar=[
        ('Ev aletleri', 'Çamaşır makinesi, klima, pirinç pişirici.'),
        ('Ulaşım', 'Metro hızlanıp durma, otomatik vites.'),
        ('Endüstriyel denetim', 'Fırın sıcaklığı, çimento ve kimya süreçleri.'),
        ('Fotoğraf makinesi', 'Otomatik odaklama ve görüntü sabitleme.'),
        ('Karar destek', 'Risk değerlendirme, tedarikçi seçimi.'),
        ('Tıp', 'Belirtilerden yaklaşık tanı ve doz önerisi.'),
    ],
    araclar=['MATLAB Fuzzy Logic Toolbox', 'scikit-fuzzy', 'jFuzzyLogic', 'fuzzylite', 'Simpful'],
    veri_baslik='Klasik örnek problemler',
    veriler=['Bahşiş problemi', 'Ters sarkaç', 'Kamyonu geri park etme', 'Çamaşır makinesi denetimi', 'Su deposu düzeyi', 'Mackey-Glass zaman serisi'],
    araclar_not='Bulanık sistemler çoğunlukla veriyle değil <b>uzman bilgisiyle</b> kurulur; veri, ANFIS gibi yöntemlerde kuralları ince ayarlamak için kullanılır.',
    yanilgilar=[
        ('Bulanık mantık kesin olmayan, özensiz mantıktır.', 'Kurallar bulanık kavramlarla yazılır ama hesap kesindir; aynı girdi her zaman aynı çıktıyı verir.'),
        ('Üyelik derecesi bir olasılıktır.', '0,7 "sıcak" olmanın derecesidir, sıcak olma şansı değildir; dereceler toplamı 1 olmak zorunda da değildir.'),
        ('Bulanık mantık eski ve terk edilmiş bir alandır.', 'Ev aletlerinde ve endüstriyel denetimde yaygın kullanılır; sinir ağlarıyla birleşimi de sürer.'),
        ('Bulanık sistem veriden öğrenir.', 'Temel bulanık sistem kurallarını uzmandan alır; öğrenme ANFIS gibi melez yöntemlerle eklenir.'),
    ],
    meslekler=['Denetim sistemleri mühendisi', 'Gömülü yazılım mühendisi', 'Otomasyon mühendisi', 'Karar destek analisti'],
    sonra=('Bulanık mantık, uzman sistemlerle kural tabanını, robotikle denetimi paylaşır. Bu dersten sonra kuralları '
           'veriden öğrenmek için sinir-bulanık sistemlere, belirsizliği olasılıkla ele almak için olasılıksal grafik '
           'modellere geçilebilir.'),
    kaynaklar=[
        'Zadeh, "Fuzzy Sets", <em>Information and Control</em> 8(3), 1965.',
        'Klir ve Yuan, <em>Fuzzy Sets and Fuzzy Logic: Theory and Applications</em>, Prentice Hall, 1995.',
        'Ross, <em>Fuzzy Logic with Engineering Applications</em>, 4. baskı, Wiley, 2017.',
        'Jang, Sun ve Mizutani, <em>Neuro-Fuzzy and Soft Computing</em>, Prentice Hall, 1997.',
    ],
)
