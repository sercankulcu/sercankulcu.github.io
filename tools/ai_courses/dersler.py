# -*- coding: utf-8 -*-
"""Yapay zeka dersleri tanitim dersinin tek kaynagi: ders listesi ve dersler arasi iliskiler.

Butun sunumlar ortusme/ayrisma slaytlarini bu tablodan alir; boylece A'nin sunumu B icin
ne diyorsa B'nin sunumu da A icin ayni iliskiyi tersinden soyler.

    python tools/ai_courses/dersler.py          # iliskiler.md'yi yeniden yazar
"""
import os

KISIMLAR = [
    (1, 'Çekirdek'),
    (2, 'Yapay Zekânın Dalları'),
    (3, 'Sinyal, Görüntü ve Ses'),
    (4, 'Veri'),
    (5, 'Matematik Temeli'),
    (6, 'Sistem ve Uygulama'),
]

# (kod, bolum no, kisim, ad, dosya adi govdesi, temel soru)
DERSLER = [
    ('YZ',   2, 1, 'Yapay Zekâ', 'Yapay_Zeka',
     'Bir makine arayarak, çıkarım yaparak ve plan kurarak nasıl akıllıca davranır?'),
    ('MO',   3, 1, 'Makine Öğrenmesi', 'Makine_Ogrenmesi',
     'Bir program örneklerden nasıl genelleme yapar?'),
    ('YSA',  4, 1, 'Yapay Sinir Ağları', 'Yapay_Sinir_Aglari',
     'Basit birimlerden kurulan ağlar ağırlıklarını ayarlayarak nasıl öğrenir?'),
    ('DO',   5, 1, 'Derin Öğrenme', 'Derin_Ogrenme',
     'Çok katmanlı ağlar ham veriden kullanışlı temsilleri nasıl kendisi öğrenir?'),
    ('NLP',  6, 2, 'Doğal Dil İşleme ve Metin Madenciliği', 'Dogal_Dil_Isleme',
     'Bilgisayar insan dilini nasıl çözümler, anlar ve üretir?'),
    ('PO',   7, 2, 'Pekiştirmeli Öğrenme', 'Pekistirmeli_Ogrenme',
     'Yalnız ödül sinyaliyle, deneme yanılma yoluyla iyi kararlar nasıl öğrenilir?'),
    ('OT',   8, 2, 'Örüntü Tanıma', 'Oruntu_Tanima',
     'Ölçümlerden bir nesnenin hangi sınıfa ait olduğuna nasıl karar verilir?'),
    ('BM',   9, 2, 'Bulanık Mantık ve Bulanık Sistemler', 'Bulanik_Mantik',
     '"Sıcak", "hızlı" gibi keskin sınırı olmayan kavramlarla nasıl akıl yürütülür?'),
    ('EMO', 10, 2, 'Evrimsel ve Metasezgisel Optimizasyon', 'Evrimsel_ve_Metasezgisel_Optimizasyon',
     'Türev yokken ya da arama uzayı çok büyükken iyi bir çözüm nasıl bulunur?'),
    ('US',  11, 2, 'Uzman Sistemler ve Bilgi Temsili', 'Uzman_Sistemler',
     'Bir uzmanın bilgisi nasıl yazıya dökülür ve çıkarım için kullanılır?'),
    ('OGM', 12, 2, 'Olasılıksal Grafik Modeller', 'Olasiliksal_Grafik_Modeller',
     'Birbirine bağlı, belirsiz çok sayıda değişken nasıl modellenir ve sorgulanır?'),
    ('UM',  13, 2, 'Üretken Modeller', 'Uretken_Modeller',
     'Bir model gerçek veriye benzeyen yeni örnekleri nasıl üretir?'),
    ('CES', 14, 2, 'Çok Etmenli Sistemler', 'Cok_Etmenli_Sistemler',
     'Birden çok özerk etmen birlikte ya da birbirine karşı nasıl karar verir?'),
    ('AYE', 15, 2, 'Açıklanabilir Yapay Zekâ ve Yapay Zekâ Etiği', 'Aciklanabilir_YZ_ve_Etik',
     'Bir yapay zekâ sisteminin kararına nasıl güvenilir ve sonucundan kim sorumludur?'),
    ('SSI', 16, 3, 'Sayısal Sinyal İşleme', 'Sayisal_Sinyal_Isleme',
     'Örneklenmiş sinyaller nasıl çözümlenir, süzülür ve dönüştürülür?'),
    ('GI',  17, 3, 'Görüntü İşleme', 'Goruntu_Isleme',
     'Bir görüntü nasıl iyileştirilir, dönüştürülür ve parçalara ayrılır?'),
    ('BG',  18, 3, 'Bilgisayarlı Görü', 'Bilgisayarli_Goru',
     'Bilgisayar bir görüntüde ya da videoda ne olduğunu nasıl anlar?'),
    ('KSI', 19, 3, 'Konuşma Tanıma ve Ses İşleme', 'Konusma_ve_Ses_Isleme',
     'Ses dalgasından sözcükler, konuşmacı ve olaylar nasıl çıkarılır?'),
    ('TGI', 20, 3, 'Tıbbi Görüntü İşleme', 'Tibbi_Goruntu_Isleme',
     'Röntgen, BT ve MR görüntüleri tanıya ve tedaviye nasıl yardım eder?'),
    ('UA',  21, 3, 'Uzaktan Algılama', 'Uzaktan_Algilama',
     'Uydu ve hava görüntülerinden yeryüzü hakkında ne öğrenilir?'),
    ('BGR', 22, 3, 'Bilgisayar Grafiği', 'Bilgisayar_Grafigi',
     'Bir sahnenin tanımından gerçekçi bir görüntü nasıl üretilir?'),
    ('ROB', 23, 3, 'Robotik ve Robot Görüsü', 'Robotik',
     'Bir makine fiziksel dünyayı nasıl algılar, konumunu nasıl bilir ve nasıl hareket eder?'),
    ('BIO', 24, 3, 'Biyometrik Sistemler', 'Biyometrik_Sistemler',
     'Bir kişi yüzünden, parmak izinden ya da sesinden nasıl tanınır?'),
    ('VM',  25, 4, 'Veri Madenciliği', 'Veri_Madenciligi',
     'Büyük veri yığınlarındaki gizli ve işe yarar örüntüler nasıl bulunur?'),
    ('VB',  26, 4, 'Veri Bilimi', 'Veri_Bilimi',
     'Veriden doğru soruları sorup karara dönüşen sonuçlar nasıl çıkarılır?'),
    ('BV',  27, 4, 'Büyük Veri Sistemleri', 'Buyuk_Veri_Sistemleri',
     'Tek bir makineye sığmayan veri nasıl saklanır ve işlenir?'),
    ('BE',  28, 4, 'Bilgi Erişimi ve Öneri Sistemleri', 'Bilgi_Erisimi_ve_Oneri_Sistemleri',
     'Kullanıcıya en ilgili belge ya da ürün milyonlarca aday içinden nasıl getirilir?'),
    ('ZS',  29, 4, 'Zaman Serisi Analizi ve Tahmin', 'Zaman_Serisi_Analizi',
     'Zamana bağlı ölçümlerden yapı nasıl çıkarılır ve gelecek nasıl tahmin edilir?'),
    ('SAA', 30, 4, 'Sosyal Ağ Analizi', 'Sosyal_Ag_Analizi',
     'Kişiler ve ilişkilerden oluşan ağlar nasıl çözümlenir?'),
    ('DC',  31, 5, 'Doğrusal Cebir', 'Dogrusal_Cebir',
     'Vektörler ve matrisler veriyi ve dönüşümleri nasıl temsil eder?'),
    ('OI',  32, 5, 'Olasılık ve İstatistik', 'Olasilik_ve_Istatistik',
     'Belirsizlik nasıl ölçülür ve sınırlı veriden nasıl güvenilir sonuç çıkarılır?'),
    ('OPT', 33, 5, 'Optimizasyon', 'Optimizasyon',
     'Bir amaç fonksiyonunu en iyi yapan değerler nasıl bulunur?'),
    ('BK',  34, 5, 'Bilgi Kuramı', 'Bilgi_Kurami',
     'Bilgi nasıl ölçülür, en az kayıpla nasıl sıkıştırılır ve iletilir?'),
    ('MLOPS', 35, 6, 'Makine Öğrenmesi Sistemleri ve MLOps', 'MLOps',
     'Bir model laboratuvardan üretime nasıl taşınır ve orada nasıl ayakta tutulur?'),
    ('GYZ', 36, 6, 'Gömülü Yapay Zekâ', 'Gomulu_Yapay_Zeka',
     'Yapay zekâ modelleri küçük, düşük güçlü cihazlarda nasıl çalışır?'),
    ('GPU', 37, 6, 'GPU Programlama ve Paralel Hesaplama', 'GPU_ve_Paralel_Hesaplama',
     'Binlerce çekirdek aynı hesabı nasıl paylaşır?'),
    ('SGY', 38, 6, 'Siber Güvenlikte Yapay Zekâ', 'Siber_Guvenlikte_Yapay_Zeka',
     'Yapay zekâ saldırıları nasıl yakalar ve kendisi nasıl saldırıya uğrar?'),
    ('BIN', 39, 6, 'Biyoenformatik', 'Biyoenformatik',
     'Biyolojik diziler ve moleküler veriler hesaplamayla nasıl çözümlenir?'),
]

ACILIS = (1, 'Alanın Haritası', 'Alanin_Haritasi')
KAPANIS = (40, 'Karşılaştırma ve Yol Haritaları', 'Karsilastirma_ve_Yol_Haritalari')

# Iliski turleri (A, tur, B):
#   alt      A, B'nin alt alanidir
#   temel    A, B'yi temel alir (B onceden bilinmeli)
#   yontem   A ile B yontem paylasir (simetrik)
#   uygulama A, B'nin yontemlerini belirli bir alana uygular
TURLER = {
    'alt': ('alt alanıdır', 'alt alanıdır'),
    'temel': ('temel alır', 'temel alınır'),
    'yontem': ('yöntem paylaşır', 'yöntem paylaşır'),
    'uygulama': ('uygulama alanıdır', 'uygulanır'),
}

ILISKILER = [
    # Cekirdek
    ('MO', 'alt', 'YZ', 'veriden öğrenen etmen; arama yerine istatistiksel genelleme'),
    ('YSA', 'alt', 'MO', 'parametrik model, kayıp fonksiyonu, gradyan inişi'),
    ('DO', 'alt', 'YSA', 'çok katmanlı ağlar, geri yayılım, etkinleştirme fonksiyonları'),
    ('YZ', 'temel', 'OI', 'belirsizlik altında akıl yürütme, Bayes kuralı'),
    ('YZ', 'yontem', 'OPT', 'durum uzayında arama, kısıt sağlama'),
    ('MO', 'temel', 'DC', 'öznitelik vektörleri, matris çarpımı, PCA'),
    ('MO', 'temel', 'OI', 'genelleme hatası, yanlılık-varyans, olasılıksal modeller'),
    ('MO', 'temel', 'OPT', 'kayıp en küçükleme, düzenlileştirme'),
    ('YSA', 'temel', 'DC', 'ağırlık matrisleri, vektörleştirilmiş hesap'),
    ('YSA', 'temel', 'OPT', 'gradyan inişi, öğrenme hızı'),
    ('DO', 'temel', 'GPU', 'büyük ağların paralel eğitimi, tensör işlemleri'),
    # Dallar
    ('NLP', 'alt', 'YZ', 'dil anlama ve üretme'),
    ('NLP', 'yontem', 'DO', 'sözcük gömmeleri, dönüştürücü (transformer) mimarisi'),
    ('NLP', 'yontem', 'BE', 'metin temsili, TF-IDF, anlamsal arama'),
    ('NLP', 'yontem', 'VM', 'metin sınıflandırma, konu modelleme'),
    ('NLP', 'yontem', 'KSI', 'dil modeli, konuşmadan metne'),
    ('PO', 'alt', 'MO', 'etiket yerine ödülle öğrenme'),
    ('PO', 'yontem', 'OPT', 'dinamik programlama, politika gradyanı'),
    ('PO', 'yontem', 'CES', 'çok etmenli pekiştirmeli öğrenme, oyun kuramı'),
    ('PO', 'yontem', 'ROB', 'denetim, hareket öğrenme'),
    ('PO', 'yontem', 'DO', 'derin Q-ağları, derin politika ağları'),
    ('OT', 'yontem', 'MO', 'sınıflandırıcılar, karar sınırları'),
    ('OT', 'temel', 'OI', 'Bayes karar kuramı, yoğunluk kestirimi'),
    ('OT', 'yontem', 'GI', 'öznitelik çıkarma, şablon eşleme'),
    ('BM', 'alt', 'YZ', 'yaklaşık akıl yürütme'),
    ('BM', 'yontem', 'US', 'EĞER-İSE kural tabanı, çıkarım motoru'),
    ('BM', 'yontem', 'ROB', 'bulanık denetleyiciler'),
    ('EMO', 'alt', 'YZ', 'sezgisel arama'),
    ('EMO', 'yontem', 'OPT', 'türevsiz ve global optimizasyon'),
    ('EMO', 'yontem', 'YSA', 'nöroevrim, hiperparametre arama'),
    ('US', 'alt', 'YZ', 'sembolik yapay zekâ, mantık ve kurallar'),
    ('US', 'yontem', 'OGM', 'belirsizlik altında çıkarım'),
    ('US', 'yontem', 'AYE', 'okunabilir kurallarla açıklanabilir karar'),
    ('OGM', 'yontem', 'MO', 'olasılıksal sınıflandırıcılar, EM algoritması'),
    ('OGM', 'temel', 'OI', 'koşullu bağımsızlık, ortak dağılım'),
    ('OGM', 'yontem', 'UM', 'gizil değişkenli modeller, değişimsel çıkarım'),
    ('OGM', 'yontem', 'NLP', 'saklı Markov modeli, koşullu rastgele alan'),
    ('UM', 'alt', 'DO', 'GAN, VAE, difüzyon, büyük dil modelleri'),
    ('UM', 'yontem', 'BGR', 'görüntü ve sahne sentezi'),
    ('UM', 'yontem', 'NLP', 'metin üretimi'),
    ('UM', 'temel', 'BK', 'KL ıraksaması, olabilirlik'),
    ('CES', 'alt', 'YZ', 'etmen kavramı, ortak karar'),
    ('CES', 'yontem', 'ROB', 'sürü robotlar, eşgüdüm'),
    ('AYE', 'yontem', 'MO', 'model açıklama, öznitelik önemi'),
    ('AYE', 'yontem', 'VB', 'veri yanlılığı, adalet ölçütleri'),
    ('AYE', 'yontem', 'SGY', 'güvenilirlik, düşmanca örnekler'),
    # Sinyal, goruntu, ses
    ('GI', 'temel', 'SSI', 'iki boyutlu sinyal, evrişim, Fourier dönüşümü'),
    ('BG', 'temel', 'GI', 'kenar, filtre, bölütleme'),
    ('BG', 'yontem', 'DO', 'evrişimli sinir ağları, görüntü dönüştürücüleri'),
    ('BG', 'yontem', 'BGR', 'kamera modeli; grafik sahneden görüntü, görü görüntüden sahne'),
    ('BG', 'yontem', 'OT', 'nesne sınıflandırma'),
    ('KSI', 'temel', 'SSI', 'spektrogram, MFCC, süzgeçler'),
    ('KSI', 'yontem', 'DO', 'uçtan uca konuşma tanıma'),
    ('TGI', 'uygulama', 'GI', 'gürültü giderme, bölütleme, çakıştırma'),
    ('TGI', 'uygulama', 'BG', 'lezyon bulma, sınıflandırma'),
    ('TGI', 'yontem', 'AYE', 'tanıda açıklanabilirlik ve sorumluluk'),
    ('UA', 'uygulama', 'GI', 'çok bantlı görüntü, düzeltme'),
    ('UA', 'uygulama', 'BG', 'arazi sınıflandırma, değişim tespiti'),
    ('UA', 'yontem', 'ZS', 'çok zamanlı görüntü serileri'),
    ('BGR', 'temel', 'DC', 'dönüşüm matrisleri, izdüşüm'),
    ('BGR', 'yontem', 'GPU', 'grafik boru hattı, gölgelendiriciler'),
    ('ROB', 'temel', 'DC', 'koordinat dönüşümleri, kinematik'),
    ('ROB', 'yontem', 'BG', 'robot görüsü, SLAM'),
    ('ROB', 'yontem', 'GYZ', 'cihaz üzerinde gerçek zamanlı çıkarım'),
    ('BIO', 'uygulama', 'OT', 'eşleme, doğrulama ve tanımlama'),
    ('BIO', 'uygulama', 'BG', 'yüz tanıma'),
    ('BIO', 'yontem', 'SGY', 'kimlik doğrulama, sahtecilik tespiti'),
    # Veri
    ('VM', 'yontem', 'MO', 'aynı algoritmalar; amaç tahmin değil keşif'),
    ('VM', 'yontem', 'BV', 'ölçeklenebilir madencilik'),
    ('VM', 'temel', 'OI', 'destek, güven, anlamlılık'),
    ('VB', 'temel', 'OI', 'hipotez testi, regresyon, görselleştirme'),
    ('VB', 'yontem', 'VM', 'keşifsel veri analizi'),
    ('VB', 'yontem', 'MO', 'tahmin modelleri'),
    ('BV', 'yontem', 'GPU', 'paralel ve dağıtık hesaplama'),
    ('BV', 'yontem', 'MLOPS', 'veri boru hatları'),
    ('BE', 'yontem', 'VM', 'birliktelik, işbirlikçi süzme'),
    ('BE', 'temel', 'DC', 'vektör uzayı modeli, matris ayrıştırma'),
    ('ZS', 'temel', 'OI', 'durağanlık, öz ilinti, ARIMA'),
    ('ZS', 'yontem', 'SSI', 'frekans analizi, süzgeçleme'),
    ('ZS', 'yontem', 'DO', 'yinelemeli ağlar, dikkat temelli tahmin'),
    ('SAA', 'yontem', 'VM', 'topluluk bulma'),
    ('SAA', 'yontem', 'BE', 'PageRank, bağlantı çözümlemesi'),
    ('SAA', 'temel', 'DC', 'komşuluk matrisi, spektral yöntemler'),
    # Matematik
    ('OPT', 'temel', 'DC', 'gradyan, Hessian, konvekslik'),
    ('BK', 'yontem', 'OI', 'entropi, ortak bilgi'),
    ('BK', 'yontem', 'MO', 'çapraz entropi kaybı, karar ağacı bölme ölçütü'),
    ('BK', 'yontem', 'SSI', 'sıkıştırma, örnekleme, kanal'),
    # Sistem ve uygulama
    ('MLOPS', 'uygulama', 'MO', 'modeli dağıtma, izleme, yeniden eğitme'),
    ('MLOPS', 'yontem', 'GYZ', 'modeli cihazlara dağıtma ve güncelleme'),
    ('MLOPS', 'yontem', 'VB', 'deney takibi, veri sürümleme'),
    ('GYZ', 'uygulama', 'DO', 'nicemleme, budama, küçük modeller'),
    ('GYZ', 'yontem', 'GPU', 'donanım hızlandırıcılar'),
    ('SGY', 'uygulama', 'MO', 'saldırı tespiti, kötü amaçlı yazılım sınıflandırma'),
    ('BIN', 'uygulama', 'MO', 'gen ifadesi sınıflandırma, protein yapısı'),
    ('BIN', 'uygulama', 'VM', 'dizi motifleri, kümeleme'),
    ('BIN', 'yontem', 'OGM', 'dizi hizalamada saklı Markov modeli'),
]

KOD = {d[0]: d for d in DERSLER}


def ad(kod):
    return KOD[kod][3]


def dosya(kod):
    d = KOD[kod]
    return 'Bolum_%02d_%s.html' % (d[1], d[4])


def komsular(kod):
    """kod dersinin butun iliskileri: (diger ders, bu dersin gozunden iliski, ortak konu)."""
    out = []
    for a, t, b, konu in ILISKILER:
        if a == kod:
            out.append((b, '%s, %s %s' % (ad(a), ad(b) + (' dersinin' if t in ('alt', 'uygulama') else ' dersini' if t == 'temel' else ' ile'), TURLER[t][0]), konu))
        elif b == kod:
            if t == 'alt':
                s = '%s, bu dersin alt alanıdır' % ad(a)
            elif t == 'temel':
                s = '%s bu dersi temel alır' % ad(a)
            elif t == 'uygulama':
                s = '%s bu dersin yöntemlerini uygular' % ad(a)
            else:
                s = '%s ile yöntem paylaşır' % ad(a)
            out.append((a, s, konu))
    return out


def yaz_md():
    for a, t, b, _ in ILISKILER:
        assert a in KOD and b in KOD and t in TURLER, (a, t, b)
    L = ['# Ders listesi ve ilişki tablosu', '',
         'Bu dosya `dersler.py` tarafından üretilir; elle düzenlemeyin.', '',
         '## Dersler', '',
         '| Bölüm | Kısım | Ders | Temel soru | Dosya |', '|---|---|---|---|---|',
         '| %d | — | %s | — | Bolum_%02d_%s.html |' % (ACILIS[0], ACILIS[1], ACILIS[0], ACILIS[2])]
    kad = dict(KISIMLAR)
    for d in DERSLER:
        L.append('| %d | %s | %s | %s | %s |' % (d[1], kad[d[2]], d[3], d[5], dosya(d[0])))
    L.append('| %d | — | %s | — | Bolum_%02d_%s.html |' % (KAPANIS[0], KAPANIS[1], KAPANIS[0], KAPANIS[2]))
    L += ['', '## İlişkiler (%d)' % len(ILISKILER), '',
          'Türler: **alt** (A, B\'nin alt alanıdır), **temel** (A, B\'yi temel alır), '
          '**yöntem** (yöntem paylaşırlar), **uygulama** (A, B\'nin yöntemlerini bir alana uygular).', '',
          '| A | Tür | B | Ortak konu |', '|---|---|---|---|']
    for a, t, b, konu in ILISKILER:
        L.append('| %s | %s | %s | %s |' % (ad(a), t, ad(b), konu))
    L += ['', '## Ders başına komşu sayısı', '']
    for d in DERSLER:
        L.append('- %s: %d' % (d[3], len(komsular(d[0]))))
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'iliskiler.md')
    open(p, 'w', encoding='utf-8', newline='\n').write('\n'.join(L) + '\n')
    print(p)


if __name__ == '__main__':
    yaz_md()
