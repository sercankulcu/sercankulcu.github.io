# -*- coding: utf-8 -*-
"""Turkish-address copies of the English apps and games: slug, search title and description.

Used by tools/make_tr_pages.py (the copies) and tools/make_related.py (the strip). The visible
Turkish name comes from make_related.TR_TITLES (each page's own Turkish h1).
"""

TOOLS_HUB = '/apps/tr/'
GAMES_HUB = '/game/tr/'

# English URL: (Turkish slug, seo_title, excerpt)
APPS = {
    '/apps/pdf-signer/': ('pdf-imzala', 'PDF İmzala · Ücretsiz Online PDF İmzalama, Yüklemeden',
        'İmzanızı çizin, PDF sayfasına yerleştirin ve imzalı PDF\'yi indirin. Dosyanız cihazınızdan çıkmaz.'),
    '/apps/pdf-form-filler/': ('pdf-doldur', 'PDF Form Doldurma · Ücretsiz Online, Yüklemeden',
        'PDF sayfalarına yazı, tarih ve onay işareti ekleyin; Türkçe karakterler doğru çıkar. Tarayıcıda çalışır.'),
    '/apps/pdf-merger/': ('pdf-birlestir', 'PDF Birleştir · Ücretsiz Online PDF Birleştirme',
        'Birden çok PDF dosyasını sırasını seçerek tek PDF\'de birleştirin. Dosyalar hiçbir yere yüklenmez.'),
    '/apps/pdf-splitter/': ('pdf-bol', 'PDF Bölme · Sayfa Ayırma ve Aralık Çıkarma, Ücretsiz',
        'PDF\'yi tek tek sayfalara bölün ya da istediğiniz sayfa aralığını ayrı PDF olarak alın. Yükleme yok.'),
    '/apps/pdf-compressor/': ('pdf-sikistir', 'PDF Sıkıştırma · PDF Boyutu Küçültme, Ücretsiz',
        'Görsel ağırlıklı PDF\'lerin boyutunu küçültün. Sıkıştırma tarayıcınızda yapılır, dosya yüklenmez.'),
    '/apps/pdf-page-organizer/': ('pdf-sayfa-duzenle', 'PDF Sayfa Düzenleme · Sırala, Sil, Döndür',
        'PDF sayfalarını yeniden sıralayın, silin ya da döndürün ve yeni PDF\'yi indirin. Tarayıcıda çalışır.'),
    '/apps/pdf-to-a4/': ('pdf-a4', 'PDF\'yi A4\'e Çevir · Sayfa Boyutu Ayarlama, Ücretsiz',
        'Bütün PDF sayfalarını içeriği bozmadan standart A4 boyutuna getirin. Dosya cihazınızda işlenir.'),
    '/apps/pdf-to-image/': ('pdf-gorsele-cevir', 'PDF\'den JPG ve PNG\'ye Çevir · Ücretsiz Online',
        'PDF sayfalarını PNG ya da JPG görsellere dönüştürün, tek tek ya da ZIP olarak indirin. Yükleme yok.'),
    '/apps/image-to-a4-pdf/': ('gorselden-a4-pdf', 'Uzun Görseli A4 PDF\'ye Çevir · Ekran Görüntüsünden PDF',
        'Uzun bir görseli ya da web sayfası ekran görüntüsünü A4 sayfalara bölüp PDF olarak kaydedin.'),
    '/apps/images-to-pdf/': ('gorsellerden-pdf', 'JPG\'den PDF\'ye · Görselleri Tek PDF Yapma, Ücretsiz',
        'Birden çok fotoğrafı ya da görseli sırasını seçerek tek bir PDF\'de birleştirin. Dosyalar yüklenmez.'),
    '/apps/pdf-diff/': ('pdf-karsilastir', 'PDF Karşılaştırma · İki PDF Arasındaki Farkları Bul',
        'İki PDF dosyasını sayfa sayfa karşılaştırın; metin ve görünüm farklarını işaretli olarak görün.'),
    '/apps/pdf-review-integrity-scanner/': ('pdf-hakem-butunlugu', 'PDF Hakem Bütünlüğü Tarayıcı · Gizli Talimat Tespiti',
        'Gönderilen makale PDF\'lerinde hakem değerlendirmesini etkilemeye yönelik gizli ya da şüpheli talimatları arayın.'),
    '/apps/document-scanner/': ('belge-tarayici', 'Belge Tarayıcı · Fotoğraftan PDF, Ücretsiz Online',
        'Belge fotoğraflarını düzeltip netleştirin, JPG ya da A4 PDF olarak kaydedin. Tarayıcıda çalışır.'),
    '/apps/signature-maker/': ('imza-olustur', 'İmza Oluşturucu · Şeffaf PNG İmza Yapma',
        'İmzanızı çizin ya da kâğıttaki imzanızın fotoğrafını işleyin, arka planı şeffaf PNG olarak indirin.'),
    '/apps/image-background-remover/': ('arka-plan-sil', 'Arka Plan Silme · Fotoğraf Arka Planını Kaldır, Ücretsiz',
        'Yapay zekâ ile fotoğrafların arka planını kaldırın. İşlem tarayıcınızda yapılır, görsel yüklenmez.'),
    '/apps/image-compressor-resizer/': ('gorsel-sikistir', 'Görsel Sıkıştırma ve Boyutlandırma · JPG Küçültme',
        'Görselleri yeniden boyutlandırın, sıkıştırın ve biçimini değiştirin. Hepsi cihazınızda yapılır.'),
    '/apps/image-redactor/': ('gorsel-karart', 'Görsel Karartma · Ekran Görüntüsünde Bilgi Gizleme',
        'Ekran görüntülerinde ve fotoğraflarda kişisel bilgileri karartın ya da bulanıklaştırın. Yükleme yok.'),
    '/apps/image-format-converter/': ('gorsel-donustur', 'Görsel Dönüştürücü · JPG, PNG, WebP Çevirme',
        'Görselleri JPEG, PNG ve WebP biçimleri arasında toplu olarak dönüştürün. Dosyalar yüklenmez.'),
    '/apps/image-color-palette/': ('renk-paleti', 'Görselden Renk Paleti Çıkarma · HEX, RGB, HSL',
        'Bir görselin baskın renklerini çıkarın; HEX, RGB ve HSL değerlerini kopyalayın.'),
    '/apps/qr-code-generator/': ('qr-kod-olustur', 'QR Kod Oluşturucu · Ücretsiz QR Kod Yapma',
        'Bağlantı, metin, Wi-Fi ağı ve e-posta için QR kod oluşturun, PNG olarak indirin.'),
    '/apps/password-generator/': ('sifre-olustur', 'Şifre Oluşturucu · Güçlü ve Rastgele Şifre Üret',
        'Güçlü rastgele şifreler ve akılda kalan parolalar üretin. Şifreler yalnız tarayıcınızda oluşturulur.'),
    '/apps/unit-converter/': ('birim-donustur', 'Birim Dönüştürücü · Uzunluk, Ağırlık, Sıcaklık Çevirme',
        'Uzunluk, kütle, sıcaklık, alan, hacim, hız, zaman ve veri birimlerini anında dönüştürün.'),
    '/apps/favicon-generator/': ('favicon-olustur', 'Favicon Oluşturucu · Görselden Favicon Yapma',
        'Bir görselden bütün boyutlarda favicon PNG dosyaları ve kullanıma hazır paket oluşturun.'),
    '/apps/minimal-timer/': ('geri-sayim', 'Geri Sayım Sayacı · Online Zamanlayıcı',
        'Hazır süreler, klavye kısayolları, tam ekran ve bildirimle sade bir geri sayım sayacı.'),
    '/apps/pomodoro-timer/': ('pomodoro', 'Pomodoro Sayacı · Online Odaklanma Zamanlayıcısı',
        '25 dakikalık çalışma, kısa ve uzun molalarla Pomodoro tekniği; oturum takibi ve bildirimler.'),
    '/apps/word-document-diff/': ('word-karsilastir', 'Word Belgesi Karşılaştırma · Değişiklikleri PDF\'de Göster',
        'İki Word belgesini karşılaştırın; eklenen ve silinen yerleri işaretleyen bir PDF oluşturun.'),
    '/apps/pdf-metadata-viewer/': ('pdf-meta-veri', 'PDF Meta Veri Görüntüleyici · PDF Özellikleri',
        'PDF belge bilgilerini, XMP meta verisini ve sayfa boyutlarını görün. Dosya yüklenmez.'),
    '/apps/office-metadata-viewer/': ('office-meta-veri', 'Office Meta Veri Görüntüleyici · DOCX, XLSX, PPTX',
        'DOCX, XLSX ve PPTX dosyalarının içindeki yazar, tarih ve diğer meta verileri görün.'),
    '/apps/image-metadata-viewer/': ('exif-goruntule', 'EXIF Görüntüleyici · Fotoğraf Meta Verisi',
        'Fotoğrafların boyutlarını, dosya özelliklerini ve EXIF bilgilerini görün. Görsel yüklenmez.'),
    '/apps/reaction-time-test/': ('tepki-suresi-testi', 'Tepki Süresi Testi · Refleks Ölçme',
        'Beş denemelik görsel testle tepki hızınızı milisaniye cinsinden ölçün.'),
    '/apps/memory-test/': ('bellek-testi', 'Bellek Testi · Sayı, Sıra ve Görsel Hafıza',
        'Zorluğu giderek artan sayı, sıra ve görsel hafıza testleriyle belleğinizi sınayın.'),
    '/apps/cognitive-reasoning-test/': ('bilissel-test', 'Bilişsel Akıl Yürütme Testi · 30 Soru',
        'Sayısal, mantıksal, sözel ve örüntü akıl yürütmesini ölçen 30 soruluk bir test.'),
    '/apps/personality-test/': ('kisilik-testi', 'Kişilik Testi · Beş Boyutlu Kelime Testi',
        'Seçtiğiniz kelimelerden beş boyutlu bir kişilik profili çıkaran kelime testi.'),
    '/apps/fortune-teller/': ('fal', 'Mistik Fal Küresi · Günlük Fal',
        'Kristal küreye dokunun, günün falını ve sembollerini görün.'),
    '/apps/tarot/tarot-reader/': ('tarot', 'Tarot Falı · Üç Kartlık Geçmiş, Şimdi, Gelecek',
        'Büyük Arkana kartlarıyla geçmiş, şimdi ve gelecek için üç kartlık bir tarot açılımı yapın.'),
    '/apps/mantra/': ('mantra', 'Mantra · Tekrarla Odaklanma Egzersizi',
        'Düşünceleri gözlemlemek, yavaşlamak ve tekrarla odaklanmak için rehberli bir mantra egzersizi.'),
}

GAMES = {
    '/game/car-race/': ('araba-yarisi', 'Araba Yarışı · Ücretsiz Online Oyun',
        'Trafikten kaçın, kıl payı geçişlerle kombo yapın ve rekorunuzu kırın.'),
    '/game/basketball/': ('basketbol', 'Basketbol · Ücretsiz Online Basket Atma Oyunu',
        'Topu potaya fırlatın, 30 saniyede olabildiğince çok basket atın.'),
    '/game/fastreflex/': ('hizli-refleks', 'Hızlı Refleks · Ücretsiz Online Refleks Oyunu',
        'Doğru hedeflere hızla dokunun, tuzaklardan kaçının ve 30 saniyede rekorunuzu geçin.'),
    '/game/squid/': ('kirmizi-isik-yesil-isik', 'Kırmızı Işık, Yeşil Işık · Ücretsiz Online Oyun',
        'Yalnız yeşil ışıkta ilerleyerek bitiş çizgisine ulaşın; kırmızıda kıpırdamayın.'),
    '/game/pong/': ('pong', 'Pong · Ücretsiz Online Oyna',
        'Bilgisayara karşı klasik Pong: üç zorluk seviyesi, 7 sayıya ilk ulaşan kazanır.'),
    '/game/minesweeper/': ('mayin-tarlasi', 'Mayın Tarlası · Ücretsiz Online Oyna',
        'Üç zorluk seviyesi, dokunmatik kontroller ve en iyi sürelerle klasik Mayın Tarlası.'),
    '/game/sudoku/': ('sudoku', 'Sudoku · Ücretsiz Online Sudoku Oyna',
        'Notlar, ipuçları ve geri alma özelliğiyle tek çözümlü klasik Sudoku bulmacaları.'),
    '/game/connections/': ('baglantilar', 'Bağlantılar · Kelime Gruplama Oyunu',
        '16 kelimeyi bağlantılı dört gruba ayırın. Her gün yeni bir bulmaca (kelimeler İngilizce).'),
    '/game/memory/': ('hafiza-oyunu', 'Hafıza Oyunu · Kart Eşleştirme, Ücretsiz',
        'Kartların eşini bulun; hamle sayınızı ve sürenizi takip edin.'),
    '/game/bulls-and-cows/': ('boga-ve-inek', 'Boğa ve İnek · Sayı Tahmin Oyunu',
        'Her tahminden sonra gelen boğa ve inek ipuçlarıyla gizli dört basamaklı sayıyı bulun.'),
    '/game/flagquiz/': ('bayrak-quiz', 'Bayrak Quiz · Ülke Bayraklarını Bil',
        'Ülke bayraklarını tanıyın: 10 soruluk bayrak bilgi yarışması.'),
    '/game/mathmaster/': ('matematik-ustasi', 'Matematik Ustası · Hızlı İşlem Oyunu',
        'İki dakikada olabildiğince çok dört işlem sorusu çözün.'),
    '/game/capital-city-quiz/': ('baskent-quiz', 'Başkentler Quiz · Ülke ve Başkent Bilgi Yarışması',
        'Ülkeleri ve başkentlerini ne kadar iyi bildiğinizi farklı quiz modlarıyla sınayın.'),
    '/game/movie-quiz/': ('film-quiz', 'Film Quiz · Sinema Bilgi Yarışması',
        '200 popüler film üzerine çıkış yılı, yönetmen, oyuncu ve tür soruları.'),
    '/game/yazitura/': ('yazi-tura', 'Yazı Tura At · Online Yazı Tura',
        'Yazı ya da turayı seçin, sanal bahsinizi koyun ve sonuçlarınızı takip edin.'),
    '/game/connectfour/': ('dort-tas', 'Dört Taş · Connect Four Oyna',
        'Bir arkadaşınıza ya da üç seviyeli bilgisayara karşı Dört Taş (Connect Four) oynayın.'),
    '/game/tictactoe/': ('xox', 'XOX · Tic Tac Toe Oyna',
        'Üç zorluk seviyeli bilgisayara karşı XOX oynayın.'),
}


def tr_url(en_url):
    if en_url in APPS:
        return TOOLS_HUB + APPS[en_url][0] + '/'
    if en_url in GAMES:
        return GAMES_HUB + GAMES[en_url][0] + '/'
    return None


def all_pages():
    return [(u, TOOLS_HUB) for u in APPS] + [(u, GAMES_HUB) for u in GAMES]
