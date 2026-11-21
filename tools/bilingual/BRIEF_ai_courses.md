# Yönerge: YZ Dersleri Rehberi'nin İngilizce içeriği

Depo: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io`. "Yapay Zekâ ve Veri Dersleri Rehberi" (İngilizce adı **Guide to AI and Data Courses**) 40 sunumdan oluşur ve elle yazılmaz: `tools/ai_courses/make_decks.py` üreteci sunumları Python veri dosyalarından kurar. Türkçe kaynaklar:

- `tools/ai_courses/icerik/KOD.py` → `ICERIK = dict(...)`: dersin metni.
- `tools/ai_courses/icerik/demo/KOD.py` → `DEMO = {...}`: sunumdaki etkileşimli "Dene" slaytı (HTML + JS).

Senin işin, görevindeki dersler için bu iki dosyanın İngilizcesini yazmak:

- `tools/ai_courses/icerik_en/KOD.py` (aynı `ICERIK` anahtarları)
- `tools/ai_courses/icerik_en/demo/KOD.py` (aynı `DEMO` anahtarları)

Klasörler yoksa oluştur. Üreteci ana oturum değiştiriyor; `make_decks.py`, `dersler.py`, `profiller.py` ve Türkçe dosyalara DOKUNMA. Üreteci çalıştırma.

## Dil: çeviri değil, doğal İngilizce
- Alanı bilen ve İngilizce ders veren bir öğretim üyesinin yazacağı gibi yaz: kısa, doğrudan, ders kitabı İngilizcesi. Türkçe cümle yapısını taşıma.
- İçerik, sayılar, tarihler, örnekler ve öğe sırası aynı kalır. Liste uzunlukları aynı kalır (tarihce, kavramlar, uygulamalar, yanilgilar … aynı sayıda öğe).
- Metin Türkçesinden uzun olmasın: slaytlar sabit 800×600, kartlar ve tablo hücreleri dar.
- Terimler: alanın yerleşik İngilizce terimleri. Türkçe terimi parantezde verme.
- Türkiye'ye özgü örnekler (şehirler, TL, kişi adları) kalır; yalnız cümle İngilizce olur.
- HTML etiketleri (`<b>`, `<i>`, `<a href>` …) ve `\n` satır bölmeleri (akis kutularında) korunur.

## Anahtarlara göre notlar
- `excerpt`: `"Guide to AI and Data Courses, Chapter N slides: <ders adı> — <kısa özet>"`. En çok 200 karakter.
- `gundem`: 4–6 kısa madde (her biri en çok 3–4 sözcük).
- `akis`: (kutu başlığı, alt etiket) çiftleri. Kutular dar: başlık en çok ~12 karakter (gerekirse `\n`), alt etiket satırı en çok ~14 karakter.
- `onkosul_ek`: (ad, neden, url). Site içi ders adreslerinin sonuna `?lang=en` ekle (ör. `/teaching/data-structures/?lang=en`). `None` olan url `None` kalır. Ad İngilizce olur (ör. "Veri Yapıları" → "Data Structures"). Sitedeki derslerin İngilizce adları:
  - `/teaching/algorithms/` "Algorithms"
  - `/teaching/data-structures/` "Data Structures"
  - `/teaching/computer-and-introduction-to-programming/` "Computer Fundamentals and Introduction to Programming"
  - `/teaching/programming-with-c/` "Programming with C"
  - `/teaching/object-oriented-programming-with-java/` "Object Oriented Programming with Java"
  - `/teaching/operating-systems/` "Operating Systems"
  - `/teaching/microprocessors/` "Microprocessors"
  - `/teaching/algorithmic-game-theory/` "Algorithmic Game Theory"
- `ayrisma`: (ders kodu, cümle). Kodlar aynen kalır.
- `kaynaklar`: kitap ve makale künyeleri. Türkçe kaynak varsa olduğu gibi kalabilir; açıklama cümleleri İngilizce olur.
- `araclar`, `veriler`: ürün ve veri seti adları zaten özel ad. Türkçe açıklama varsa çevir.
- `veri_baslik`, `araclar_not`, `not_`: varsa çevir.

## Ders adları (sabit, metinde geçerse bunları kullan)
YZ Artificial Intelligence · MO Machine Learning · YSA Artificial Neural Networks · DO Deep Learning · NLP Natural Language Processing and Text Mining · PO Reinforcement Learning · OT Pattern Recognition · BM Fuzzy Logic and Fuzzy Systems · EMO Evolutionary and Metaheuristic Optimization · US Expert Systems and Knowledge Representation · OGM Probabilistic Graphical Models · UM Generative Models · CES Multi-Agent Systems · AYE Explainable AI and AI Ethics · SSI Digital Signal Processing · GI Image Processing · BG Computer Vision · KSI Speech Recognition and Audio Processing · TGI Medical Image Processing · UA Remote Sensing · BGR Computer Graphics · ROB Robotics and Robot Vision · BIO Biometric Systems · VM Data Mining · VB Data Science · BV Big Data Systems · BE Information Retrieval and Recommender Systems · ZS Time Series Analysis and Forecasting · SAA Social Network Analysis · DC Linear Algebra · OI Probability and Statistics · OPT Optimization · BK Information Theory · MLOPS Machine Learning Systems and MLOps · GYZ Embedded AI · GPU GPU Programming and Parallel Computing · SGY AI in Cybersecurity · BIN Bioinformatics

## Demo dosyaları
- `baslik`, `problem`, `not` ve `html` içindeki görünen her metni İngilizce yaz: düğme yazıları, etiketler, `aria-label`, SVG `<text>`, `title`, açıklama paragrafları.
- `js` içinde yalnız **kullanıcıya görünen dizgeler** İngilizce olur: innerHTML/textContent'e yazılan metinler, SVG'ye eklenen etiketler, çıktı cümleleri. Değişken ve fonksiyon adlarını DEĞİŞTİRME; mantık, sayılar, rastgele tohumlar ve koordinatlar aynı kalır. Sayı biçimi: Türkçe ondalık virgül üreten kod varsa (`.replace(".", ",")`, `toLocaleString("tr")` gibi) İngilizce sürümde ondalık noktaya çevir.
- `html` içindeki `data-*` değerleri, sınıf adları ve id'ler JS'nin okuduğu anahtarlarsa (ör. `data-s="bul"`) AYNEN kalır; yalnız görünen yazı değişir.
- SVG koordinatlarına dokunma. İngilizce etiket uzarsa kısalt.
- `css` varsa aynen kopyala (içinde Türkçe `content:` metni varsa çevir).
- Kesin yasaklar (canlı sitede sayfayı bozar): JS'de `//` satır yorumu yazma (`/* */` kullan; dizgelerdeki `//` da tehlikeli: `"http:" + "/" + "/..."` gibi böl); hiçbir yerde `{{` ya da `{%` yazma; `:kelime:` biçiminde iki nokta arasında tek kelime yazma (jemoji). Türkçe dosyada nasıl kaçınıldıysa aynısını koru.

## Doğrulama (her ders için)
1. İki dosya da Python ile yüklenir: `python -c "import importlib.util as u; ..."`. `ICERIK` ve `DEMO` anahtar kümeleri ve liste uzunlukları Türkçesiyle aynı.
2. Türkçe karakter taraması: `[çğıİöşüÇĞÖŞÜâ]` yalnız özel adlarda (kişi, şehir, Türkçe kitap künyesi) kalabilir.
3. JS sözdizimi: `DEMO['js']` metnini `(function(){ var root=null; ... })` içine sarıp bir .js dosyasına yaz ve `node --check` ile denetle.
4. `//` taraması: JS'de dizge dışında `//` yok; `{{`, `{%` yok.

Geçici dosyaları scratchpad'in DOĞRUDAN içine değil, kendine ait alt klasöre yaz: `C:\Users\Sercan\AppData\Local\Temp\claude\7124c11a2bd23ac0\c11f1130-2317-4334-bfff-5d20b38079f6\scratchpad\ai_<grup>\`. Commit etme; git stash/checkout/reset kullanma.

Son mesajın kısa olsun: yazdığın dosyalar, doğrulama sonucu ve emin olamadığın noktalar (varsa).
