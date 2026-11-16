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

## Google Scholar açılış sayfaları ve PDF site haritası

```bash
python tools/make_pdf_pages.py
```

Her kitap, makale ve doktora tezi için `_pages/scholar/` altına sitenin
`without-sidebar` düzeninde bir sayfa yazar: kitaplar `/books/<pdf-adı>/`, makaleler
`/publications/<pdf-adı>/`, tez `/publications/2022-phd-thesis/`. Sayfada başlık,
yazarlar, özet ve courses-pdfs'teki PDF'in bağlantısı vardır; Google Scholar'ın okuduğu
`citation_*` etiketleri ön bilgideki `scholar_meta:` listesindedir (tema `citation` anahtarını "Recommended citation" satırı için kullanıyor) ve
`_includes/head/custom.html` onları `<head>`'e yazar. Makale ve tez PDF'lerinin
başlık/yazar bilgisini de doldurur ve `courses-pdfs/sitemap.xml` dosyasını (yalnız
PDF'ler) yeniden yazar; sitenin kökündeki `robots.txt` bu haritayı gösterir. Kitap
bilgisi (başlık, konu, sayfa sayısı) PDF'in künyesinden okunur. Makale ve tez bilgisi
betiğin başındaki `PAPERS` ve `THESIS` içindedir; yeni yayın oraya eklenir, yayınlar
sayfasındaki "Paper" bağlantısı da o sayfaya verilir. `_pages/scholar/` dosyalarını
elle düzenlemeyin, betik üzerine yazar.
Her sayfanın ön bilgisinde ayrıca `og_image` (1200×630 paylaşım kartı: kitaplarda
dersin görseli ve vurgu rengi `ART` içinde, makale ve tezde PDF'in ilk sayfası; betik
kartları Chrome/Edge ile çizip `courses-pdfs/covers/<pdf-adı>.jpg` olarak yazar) ve hazır bir schema.org `json_ld`
(Book, ScholarlyArticle, Thesis) bulunur; `_includes/seo.html` ile `head/custom.html`
bunları okur. Ders sayfaları (`_teaching/*.md`) kitabın kapağını `og_image` olarak
kullanır; `course_language` ve `textbook` alanlarından `head/custom.html` bir Course
JSON-LD'si kurar.
`make_book.py` ve `make_slide_pdf.py` iş bitince bunu kendiliğinden çalıştırır.
Sunum PDF'lerinde başlıktaki site adını atıp yazarı yazan adımı `make_slide_pdf.py`
kendisi yapar (`set_pdf_info`).

## Uygulamalar sayfası

```
python tools/make_app_pages.py
```

`/apps/` sayfasını (`_pages/apps.md`) kart düzeniyle yeniden yazar; gruplar, sıra ve
emojiler betiğin başındaki `GROUPS` listesindedir, kart açıklaması her uygulamanın kendi
`excerpt`'inden gelir. Her uygulama sayfasının ön bilgisine `seo_title`, `og_image` ve
`web_app` (schema.org applicationCategory; `head/custom.html` bundan WebApplication
JSON-LD'si kurar) yazar ve 1200×630 paylaşım kartlarını `images/apps/` altına
çizer (kart başına ~50 KB). Yeni uygulama: sayfasını `apps/` altına koyun, `GROUPS`'a ekleyin, betiği
çalıştırın.

## Oyunlar sayfası

```
python tools/make_game_pages.py
```

`make_app_pages.py` ile aynı işi `/games/` için yapar: `_pages/games.md`'yi kartlarla
yazar, her oyun sayfasına `lang`, `seo_title`, `og_image` ve `game_genre` (VideoGame
JSON-LD için) ekler, kartları `images/games/` altına çizer. Oyunun arayüz dili `GROUPS`
içinde (`tr`/`en`); ad ve açıklama oyun sayfasının `title` ve `excerpt`'inden gelir, o
yüzden bir oyunun adını değiştirmek için sayfasındaki `title`'ı değiştirip betiği
çalıştırın.

## Benzer araçlar / diğer oyunlar şeridi

```
python tools/make_related.py
```

İki betiğin `GROUPS` listelerinden `_data/related_tools.yml`'i yazar: her uygulama ve oyun
için aynı gruptan sıradaki dört sayfa ve hub adresi. `_includes/related-tools.html` bunu
`without-sidebar` düzeninde içeriğin altına basar (Türkçe sayfalarda "Diğer oyunlar",
İngilizcelerde "More games / More tools"). Grup ya da ad değişince, hub betiklerinden sonra
bunu da çalıştırın.

## Türkçe adresli kopyalar

```
python tools/make_tr_pages.py
python tools/make_related.py
```

İngilizce 36 araç ve 17 oyunun `/tr/araclar/<ad>/` ve `/tr/oyunlar/<ad>/` adresli Türkçe kopyalarını
`tr/` altına yazar. Adres, arama başlığı ve açıklama `tools/tr_pages.py`'de, görünen Türkçe ad
`make_related.TR_TITLES`'ta. Gövde İngilizce sayfanınkiyle aynı; ön bilgideki `ui_lang: tr`
arayüzü Türkçe açar. İki sayfa birbirini `hreflang` ile gösterir. `_pages/araclar.md` ve
`_pages/oyunlar.md` Türkçe hub'lardır. **Kopyaları elle değiştirmeyin:** İngilizce sayfayı
değiştirip betiği çalıştırın. `check_site.py`, kopya eskiyse hata verir.

Aynı betik ters yönde de çalışır: 14 Türkçe oyunun İngilizce kopyalarını `en/games/<ad>.html`
(`/en/games/<ad>/`, `ui_lang: en`) olarak yazar. Adres ve metinler `tools/en_pages.py`'de. Türkçe asıl
`/game/<ad>/` adresinde kalır ve `ui_lang: tr` ile her zaman Türkçe açılır. `/games/` hub'ı İngilizce
kopyaları listeler, `/tr/oyunlar/` Türkçe asılları. Kelime oyunlarında kelimeler iki dilde de Türkçedir.
Hub betiklerini çalıştırdıktan sonra bu betiği yeniden çalıştırın; hub betikleri ön bilgi satırlarının
yerini değiştirir.

Dosya araçları sonucu birbirine `assets/js/tool-handoff.js` ile aktarır: sonuç dosyası
tarayıcının IndexedDB'sinde en çok 10 dakika bekler, hedef sayfa `?handoff=1` ile açılınca
alınıp silinir. Hiçbir şey sunucuya gitmez.

## Kitap

```bash
python tools/make_book.py c      # Programming with C     -> courses-pdfs/c/Programming-with-C.pdf
python tools/make_book.py agt    # Algoritmik Oyun Kuramı -> courses-pdfs/agt/Algoritmik-Oyun-Kurami.pdf
python tools/make_book.py ds     # Veri Yapıları          -> courses-pdfs/data_structures/Veri-Yapilari.pdf
python tools/make_book.py os     # İşletim Sistemleri     -> courses-pdfs/os/Isletim-Sistemleri.pdf
python tools/make_book.py dsa_c           # C ile Veri Yapıları ve Algoritmalar
python tools/make_book.py algorithms      # Algoritmalar
python tools/make_book.py computer        # Bilgisayar ve Programlamaya Giriş
python tools/make_book.py java            # Java ile Nesne Yönelimli Programlama
python tools/make_book.py microprocessors # Mikroişlemciler
```

Bir dersin notlarını tek bir A4 PDF'e dönüştürür. Chrome (veya Edge) gerekir; C kitabı
10–20, AGT ve Veri Yapıları kitapları ~10'ar dakika sürer. Her ders `book/course_<ders>.py` içinde tanımlıdır:
not sırası ve kısımlar, dil, etiketler (Chapter/Bölüm, Part/Kısım…), ön kısım (kapak,
künye, önsöz), CSS dosyaları, PDF künyesi ve çıktı yolu. Yeni ders için bir
`course_<ders>.py` yazmak yeter; `load()` fonksiyonunun döndürdüğü yapı `book/build.py`
başında anlatılır.

Türkçe "ders notu" kalıbındaki dersler (C dışındaki bütün dersler: `files/<ders>/notlar/`,
ortak `notlar.css`, `sozluk.html`) için ortak tanım `book/notes_book.py` içindedir;
`course_<ders>.py` dosyaları yalnızca derse özgü ayarları (başlık, önsöz, künye,
ek betikler) verir. Kısımlar ve bölüm sırası ders sayfasındaki `## Kısım …` /
`### Bölüm N: …` başlıklarından okunur, kitap o sırayla kalır. Terim sözlüğü Ek A
olur. Her bölümün başına ders sayfasındaki "💻 Kod Örnekleri" / "🧪 Laboratuvar Çalışması"
bağlantılarından klasörler yazılır.

Bir bölüm birden çok nottan oluşabilir (Algoritmalar 4.1–4.4, Java 4.1–4.5 gibi). Hangi
notun hangi bölüme ait olduğu ders sayfasındaki "📖 Ders Notu" bağlantılarından okunur;
ders sayfasında bağı olmayan not kitaba girmez ve derleme uyarı verir. Çok notlu bölüm,
ders sayfasındaki ad ve açıklamayla bir açılış sayfası alır; notlar onun altında yeni
sayfada başlayan alt bölümler olur ve içindekilerde alt bölüm olarak listelenir.

Ekler: Ek A terim sözlüğü (`sozluk.html`; ders modülünde `glossary=` ile başka dosya, ör. Veri Yapıları `Sozluk.html` / `Dictionary.html`), Ek B "Ön Bilgiler" (`*Prerequisites*.html`, `On_Bilgiler.html`),
Ek C "Önemli İsimler" (`*Important_People*.html` / `Pioneers*.html` / `Onemli_Isimler.html`). B ve C web'de
etkileşimli sayfalardır; kitapta arama, süzgeç, sıralama ve düğmeler atılır, gizli
"Ayrıntılar" açılır, sayfanın kendi `<style>` bloğu kalır. C kitabında aynı iki sayfa
Appendix A/B olur (`course_c.py`, `_appendix`).

İsteğe bağlı giriş sayfaları (`notes_book.setup(..., intro=[('dosya.html', 'kimlik')])`)
Kısım I'den önce basılır ve içindekilerin en üstünde yer alır; Türkçe derslerin hepsinde
dersin haritası (`files/<ders>/ders_haritasi.html`) böyledir.

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
- **Noktalı çizgiler:** İçindekilerdeki noktalı çizgide `transform` kullanmayın. Chrome
  transform'lu öğeyi her sayfaya yeniden çiziyor; AGT kitabında sayfa başına 21.000 nokta
  vardı. `position: relative; top: …` aynı görünümü bu bedel olmadan verir.
- **Sayfa akışı:** `notlar.css` baskıda her `h2.nt-pb` başlığını yeni sayfaya atıyor ve
  bütün kutuları bölünmez yapıyor; kitapta bunlar `book/book_notes.css` ile gevşetilir.
  Çok adımlı şekiller (birden çok SVG) adımlar arasından bölünebilir.

Ortak ön kısım ve içindekiler düzeni `book/book-front.css`, C bölüm gövdesi
`book/book.css`, AGT ve Veri Yapıları bölüm gövdesi `files/<ders>/notlar/notlar.css` + `book/book_notes.css`
içindedir.

## Ders haritaları

```bash
python tools/course_map.py               # bütün dersler
python tools/course_map.py os java       # yalnızca verilenler
```

`files/<ders>/ders_haritasi.html` sayfalarını `tools/course_maps.py` içindeki tanımlardan
üretir: satır satır bölüm numaraları, oklar ve bağ tablosu. Bölüm adları ders sayfasındaki
`### Bölüm N: Ad` başlıklarından okunur; bölüm adı değişirse haritayı yeniden üretin. Oklar
yalnızca aynı satırdaki komşu iki kutu ya da ardışık iki satır arasında çizilir, böylece
hiçbir ok bir kutunun üstünden geçmez; daha uzak bağlar tabloda yazılır. Ders sayfasında
olup haritada ya da tabloda olmayan bölüm derlemeyi durdurur. AGT haritası elle
yazılmıştır ve üreteçte yoktur.

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
  - **Satır içi betikler:** `//` satır yorumu hata sayılır, çünkü canlı sitenin compress
    düzeni satırları birleştirir ve yorum betiğin geri kalanını yutar (yerelde çalışır,
    canlıda kırılır); `/* */` kullanın. Satırları birleştirilmiş her betik ayrıca `node`
    ile ayrıştırılır. Kod örneği taşıyan `text/x-asm`, `text/x-java` vb. betikler atlanır.
  - **Uygulamalar ve oyunlar:** Ders verilmezse `apps/`, `game/` ve `mantra/` sayfaları da
    denetlenir: betik ve Liquid kuralları, üreteç betiklerinin yazdığı ön bilgi (`seo_title`,
    `og_image`, `web_app`/`game_genre` …) ve paylaşım kartı dosyasının varlığı.
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
