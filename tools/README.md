# tools

Ders notlarından **türetilmiş çıktıları** üreten betikler: PDF kitaplar (C, AGT) ve
*Programming with C* notlarının içindeki adımlayıcı figürler. Ayrıca
`deck.js` kullanan HTML sunumlardan (computer, data_structures, agt) PDF üreten
betik.

Site bu klasöre bağımlı değildir. Jekyll onu yok sayar (`_config.yml` →
`exclude`) ve **ders sayfasından buraya bağlantı verilmez** — burası yazarın
mutfağı, öğrencinin değil.

Python 3.9+ yeter. Yalnızca kitap ve sunum PDF üreteçleri dış paket ister:

```bash
pip install -r tools/requirements.txt
```

Bütün betikler depo kökünden çalıştırılmak üzere yazılmıştır ve kendi
konumlarından yolları kendileri bulur; mutlak yol gömülü değildir.

## Kitap

```bash
python tools/make_book.py c      # Programming with C     -> courses-pdfs/c/Programming-with-C.pdf
python tools/make_book.py agt    # Algoritmik Oyun Kuramı -> courses-pdfs/agt/Algoritmik-Oyun-Kurami.pdf
```

Bir dersin notlarını tek bir A4 PDF'e dönüştürür. Chrome (veya Edge) gerekir; C kitabı
10–20, AGT kitabı ~10 dakika sürer. Her ders `book/course_<ders>.py` içinde tanımlıdır:
not sırası ve kısımlar, dil, etiketler (Chapter/Bölüm, Part/Kısım…), ön kısım (kapak,
künye, önsöz), CSS dosyaları, PDF künyesi ve çıktı yolu. Yeni ders için bir
`course_<ders>.py` yazmak yeter; `load()` fonksiyonunun döndürdüğü yapı `book/build.py`
başında anlatılır. AGT kısımları ve bölüm sırasını ders sayfasından
(`_teaching/algorithmic-game-theory.md`) okur, kitap o sırayla kalır.

| Aşama | Dosya | İş |
|---|---|---|
| 1 | `book/build.py` | Notları tek `book.html` içinde birleştirir; kısım sayfalarını ve içindekileri kurar, CSS'i gömer |
| 2 | `book/finalize.py` | Chrome ile iki kez basar: ilk baskının sayfa haritasından içindekiler gerçek sayfa numaralarıyla dolar |
| 3 | `book/overlay.py` | reportlab ile sayfa numarası, üst bilgi, PDF yer imleri ve sayfa etiketleri (i, ii… / 1, 2…) |
| 4 | `book/compress.py` | İçerik akışlarını yeniden sıkıştırır (C: 143 MB → ~10 MB) |

Ara çıktılar `tools/book/build/<ders>/` altında kalır ve git'e girmez. Sayfa sayısı
değişirse ders sayfasındaki sayfa sayısını ve boyutu elle güncelleyin.

Sayfa numaraları PDF metninden değil **adlandırılmış hedeflerden** okunur: içindekilerdeki
her satır hedefine (`#ch3`, `#part2`, `#c3-s3-1` …) bağ verir, Chrome da bağ verilen her
kimlik için PDF'e bir hedef yazar. Bağ verilmeyen kimliğin hedefi olmaz; bölümü
içindekilerden çıkarırsanız sayfası da bulunmaz.

Dikkat edilecekler (hepsi denendi):

- **Türkçe heceleme:** Chrome'un Windows sürümü `lang="tr"` için heceleme sözlüğü
  taşımıyor, `hyphens: auto` Türkçe metinde hiçbir sözcüğü bölmüyor.
  `book/hyphenate_tr.py` hece sınırlarına yumuşak tire (`&shy;`) koyar; kitap
  `hyphens: manual` ve iki yana yaslı basılır. Kod, formül (`class="m"`), SVG,
  başlıklar ve `lang="en"` metin bölünmez.
- **Kimlikler:** AGT notlarında aynı `id` (ör. `ciktilar`, SVG `marker`) birden çok notta
  geçiyor. Tek belgede çakışmasınlar diye her bölümün kimlikleri `c<N>-` ile öneklenir;
  bölüm içi bağlar, `url(#…)` ve notlar arası bağlar buna göre yeniden yazılır. Sözlüğe
  bağlar kitabın Ek A'sına, sunum ve oyun bağları sitedeki mutlak adrese gider.
- **Betikler:** Kitap `file:///` üzerinden basılır. `ds-guard` bloğu atılır; AGT'nin
  `kaydirici.js` betiği satır içine alınır ve adres denetimi satırı çıkarılır, yoksa
  etkileşimli şekiller çizilmez.
- **Yazı tipleri:** Üst bilgi için reportlab'in Helvetica'sı Türkçe harflerin bir kısmını
  basamaz; ders `FONT` ile bir TTF verir. Bütün bindirmeler tek tuvalde çizilir: sayfa
  başına ayrı tuval, TTF'yi her sayfaya ayrıca gömüyordu (AGT'de 800 kopya, 15 MB).
  `system-ui` Windows'ta değişken yazı tipine gidiyor ve Chrome onu Type3 olarak gömüyor;
  kitap CSS'i SVG'lerde Segoe UI, kodda Consolas kullanır.
- **Sayfa akışı:** `notlar.css` baskıda her `h2.nt-pb` başlığını yeni sayfaya atıyor ve
  bütün kutuları bölünmez yapıyor; kitapta bunlar `book/book_agt.css` ile gevşetilir.

Ortak ön kısım ve içindekiler düzeni `book/book-front.css`, C bölüm gövdesi
`book/book.css`, AGT bölüm gövdesi `files/agt/notlar/notlar.css` + `book/book_agt.css`
içindedir.

## Sunum PDF'leri

```bash
python tools/make_slide_pdf.py computer                     # dersin tüm sunumları
python tools/make_slide_pdf.py computer Bolum_10_Diziler    # yalnızca verilenler
python tools/make_slide_pdf.py data_structures --stale      # PDF'i sunumundan eski olanlar
```

`files/<ders>/slides/` altındaki `deck.js` sunumlarını `../courses-pdfs/<ders>/pdf/`
altına PDF olarak basar; çalışma soruları ve simülatörler atlanır. Her slayt ve
her animasyon adımı ayrı bir sayfadır (800×600). Chrome ya da Edge gerekir
(`playwright` sistemdeki tarayıcıyı kullanır).

Betik sunumu `deck.js`'in kendi "ileri" düğmesiyle baştan sona gezer, her
durumda etkin slaydın anlık hâlini toplar ve sonunda hepsini **tek seferde**
basar. Her durumu ayrı ayrı basıp birleştirmek yazı tiplerini her sayfaya
yeniden gömer ve dosyayı ~4 kat büyütür — denendi.

Sayfalar yerel dosyalardan basılır, yani commitlenmemiş değişiklikler de
girer. Yerel dosyada sitenin sayfa düzeni yoktur. Bu yüzden canlı siteden bir
sunumun düzeni alınır (tema, `.page__content` sarmalayıcısı, MathJax) ve yerel
içerik, Jekyll'deki gibi ön bilgisi atılarak bunun içine konur. Böylece
`deck.js`'in otomatik sığdırması da yayımdaki ölçüleri görür. Çevrimdışıysanız
`--no-theme` verin; o zaman yazılar küçük çıkar ve sığdırma farklı olur. Yerel
HTTP sunucusu kullanılmaz: dosyalar Playwright'ın istek yakalamasıyla
(`http://localhost:8765/…` adresinden) doğrudan tarayıcıya verilir. Yerel sunucu
bu makinede 64 KB'tan büyük yanıtlarda bağlantıyı ara sıra koparıyor, büyük
sunumlar yarım yükleniyordu.

Her sunum için basılan sayfa sayısı, sunumdaki adım sayısıyla karşılaştırılır;
tutmazsa betik hata koduyla çıkar. `--stale`, PDF'i olmayan ya da HTML'i
PDF'inden sonra değişmiş (dosya zamanı veya son commit) sunumları seçer.
Sunumu güncelledikten sonra:

```bash
python tools/make_slide_pdf.py <ders> --stale
```

## Göndermeden önce denetim

```bash
python tools/check_site.py computer data_structures agt algorithms           # dosya denetimleri, saniyeler
python tools/check_site.py algorithms --browser                              # + tarayıcıda, ders başına birkaç dakika
```

Ders verilmezse `files/` altında `slides/` klasörü olan bütün dersler denetlenir.
Hata varsa çıkış kodu 1'dir; uyarılar çıkış kodunu değiştirmez.

- **Dosya denetimleri:**
  - **Liquid:** Jekyll ön bilgili her sayfayı Liquid ile işler. Metinde `{{` ya da `{%`
    geçerse (ör. Java'da `int[][] a = {{1, 2}}`) bütün Pages derlemesi durur; ilk
    parantezi `&#123;` yazın.
  - **Etiket dengesi:** `section`, `details`, `svg` ve `pre` açılış/kapanış sayıları.
  - **Çoktan seçmeli:** Her soruda tam bir `data-ok` olmalı. Doğru şıkkın belirgin uzun
    olduğu sorular ve sayfa genelinde doğru şıkkın en uzun olma oranı %40'ı aşarsa uyarı.
  - **SVG kimlikleri:** Aynı `<marker>` kimliği birden çok çizimde tanımlanmışsa ok uçları
    kaybolur, çünkü tarayıcı tanımı gizli adımdaki çizimden alır.
  - **ds-guard** ve istenmeyen yönerge cümleleri.
- **`--browser` ile ek olarak:** Sayfalar `make_slide_pdf.py` gibi canlı site düzeninin
  içinde açılır.
  - Her slayt, bütün adımları ve cevapları açıkken taşma için ölçülür. Otomatik
    sığdırmanın %90'ın altına küçülttüğü slaytlar uyarı olarak listelenir.
  - Konsol hatası, yüklenemeyen dosya ve kırık iç bağlantı aranır.

## Figürler

```bash
python tools/figures/steps_1.py
```

`steps_1` … `steps_4`, notların içindeki SVG figürleri ve CSS-only
adımlayıcıları üretip yerine gömer. Her betik kendi haftalarından sorumludur:

| Betik | Haftalar |
|---|---|
| `steps_1.py` | 18, 19, 20, 33, 41 |
| `steps_2.py` | 25, 26, 27, 34, 39, 47, 50, 51, 54 |
| `steps_3.py` | 7, 28, 30, 46, 53 |
| `steps_4.py` | 29, 40, 45, 48 |

Betikler **etkisizdir (idempotent)**: yeniden çalıştırmak eskisini silip aynısını
yazar, çıktı büyümez. Eski bloğu silen `strip_generated()` satır bazlı çalışır ve
`<div>` derinliği sayar. Bunu regex'e çevirmeyin — denendi, beş notta 325 satır
silindi ve hatayı yalnızca doğrulama takımı yakaladı.

Notlarda **JavaScript yoktur ve olmamalıdır**: `_config.yml` içindeki
`compress_html` ayarı satır içi betiklerdeki `//` yorumlarını bozar. Adımlayıcılar
bu yüzden gizli radio input + `:checked ~` seçicisiyle yapılmıştır. Baskıda tüm
adımlar görünür, `prefers-reduced-motion` geçişleri kapatır.

## Değişiklikten sonra

Üretilen HTML'i her zaman doğrulayın — bu betikler canlı ders notlarının
üzerine yazar:

```bash
git diff --stat files/
```

## PDF'lerin yeri

Bütün PDF'ler (slayt PDF'leri, C kitabı, makaleler, sunumlar, CV) ayrı
[`courses-pdfs`](https://github.com/sercankulcu/courses-pdfs) deposundadır ve
`https://sercankulcu.github.io/courses-pdfs/` adresinden yayımlanır. Klasör
düzeni eski `files/` düzeninin aynısıdır: `files/algorithms/pdf/X.pdf` →
`courses-pdfs/algorithms/pdf/X.pdf`. Üreteçler o depoya yazar; iki depo
yan yana klonlanmış olmalıdır (`GitHub/courses-pdfs`). PDF'i güncelledikten
sonra o depoda commit ve push yapın. `check_site.py` sitedeki PDF
bağlantılarını o klasörde arar.
