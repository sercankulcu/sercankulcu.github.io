# Yönerge: bir dersin Türkçe sunumunun İngilizce sürümünü yazmak

Depo: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io` (Jekyll / GitHub Pages). Bütün dersler Veri Yapıları gibi iki dilli yapılıyor. Bu işte YALNIZ ana sunumların İngilizcesi yazılıyor; notlar, çalışma soruları, simülatörler, kitap ve kod reposu bu aşamada çevrilmiyor.

## Dil: çeviri DEĞİL, doğal İngilizce
- Metni cümle cümle çevirme. Konuyu bilen, İngilizce ders veren bir öğretim üyesinin aynı slaytı nasıl yazacağını düşün: kısa, doğrudan, ders kitabı İngilizcesi (Cormen, Sedgewick, Kleinberg–Tardos tonu). Türkçe cümle yapısını, "Bu bölümde … göreceğiz" gibi kalıp geçişleri ve uzun yan cümleleri taşıma.
- Madde ve paragraflar serbest yeniden kurulabilir; içerik, sayılar, örnekler, sıra ve slayt sayısı aynı kalır. İngilizce metin Türkçesinden uzun olmasın (slayt taşmasın).
- Terimler: alanın yerleşik İngilizce terimleri (divide and conquer, memoization, branch and bound, competitive ratio, speedup, work–span …). Türkçe terimi parantezde verme.
- Örnek kişi adları (Ayşe, Ali …) ve Türkiye'ye özgü örnekler (şehirler, TL) KALIR (kullanıcı kararı); yalnız cümle İngilizce olur.
- Üslup örneği: `files/data_structures/sunumlar/Bolum_03_Diziler.html` (Türkçe) ve onaylanmış İngilizcesi `files/data_structures/slides/Chapter_03_Arrays.html`. Önce bu ikisinden birkaç slaytı yan yana oku.

## Kod: tamamen İngilizce
- Sınıf, metot, değişken adları, yorumlar, yazdırılan metinler İngilizce (ör. `birlestir` → `merge`, `dizi` → `arr`/`a`, `sonuc` → `result`). Adları kısa ve deyimsel seç; aynı ad bütün sunumda (ve aynı dersin öteki İngilizce sunumlarında) tutarlı olsun — derste paylaşılan bir ad tablosu varsa (`tools/bilingual/<ders>_names.tsv`) ona uy, yeni adları oraya ekle.
- Kod izleme slaytlarında (`<pre class="ds-trace__code">` + adımlarda `data-line`, `data-vars`, `data-stack`, `data-out`) değişken adları, yığın çerçeveleri ve çıktı metni kodla birebir aynı olmalı. Satır sayısı değişmemeli (değişirse data-line'ları kaydır). Kod mantığı ve sayısal sonuçlar aynı kalır.
- SVG içindeki yazılar (etiketler, eksenler, düğüm adları, aria-label, title) İngilizce olur; koordinatlara dokunma, metin uzarsa kısalt.

## Dosya ve front matter
- Türkçe sunum `files/<ders>/sunumlar/Bolum_NN_<Ad>.html`. İngilizcesi `files/<ders>/slides/Chapter_NN_<English_Title>.html` (ASCII, kelimeler `_` ile, ör. `Chapter_01_Divide_and_Conquer.html`). Bölüm numarası aynı kalır.
- Kopyala ve dönüştür: Türkçe dosyayı İngilizce adla `slides/` içine kopyala, sonra metni İngilizceleştir. Yapı, sınıflar, slayt sırası, `data-*` öznitelikleri, betik etiketleri korunur. Büyük dosyalarda (MB'larca SVG) metni Python betiğiyle yer değiştirerek düzenle; dosyayı elle baştan yazma.
- `../slides/deck/…` yolları İngilizce dosyada `deck/…` olur (aynı klasör); `../slides/img/…` → `img/…`.
- `<div class="ds-deck" … lang="tr">` → `lang="en"` (deck.js arayüz metinlerini buna göre İngilizce gösterir).
- Front matter (Veri Yapıları İngilizce sunumundaki gibi):
  ```
  title: "Chapter N: <English Title>"
  permalink: /files/<ders>/slides/Chapter_NN_<English_Title>.html
  excerpt: "<Course English name>, Chapter N slides: <doğal İngilizce özet, ≤ 200 karakter>"
  lang: en
  seo_title: "Chapter N: <English Title> · <Course English name> Slides"
  og_image: <Türkçe sunumdaki ile aynı>
  hreflang:
    tr: /files/<ders>/sunumlar/Bolum_NN_<Ad>.html
    en: /files/<ders>/slides/Chapter_NN_<English_Title>.html
  resource: "Presentation"
  course:
    name: "<Course English name>"
    url: "/teaching/<ders-sayfasi>/?lang=en"
  ```
  Türkçe ikizin front matter'ına da aynı `hreflang` bloğunu ekle (lang'den sonra) ve `course.url`'ün sonuna `?lang=tr` ekle.
- `ds-guard` bloğunu (sayfa başındaki telif/koruma betiği) Türkçe dosyadan AYNEN koru; içindeki hiçbir adı değiştirme (bir ajan `window.top`'u `window.total` yapıp sayfayı canlıda kilitlemişti). Yalnız görünen telif cümlesi "Tüm hakları saklıdır" → İngilizce sunumda "All rights reserved" olabilir, betik kodu değişmez.

## Bağlantılar (kullanıcı kararı: çevrilmeyen Türkçe kaynaklar İngilizce tarafta GÖSTERİLMEZ)
- İngilizce sunumdan Türkçe nota, çalışma sorularına, Türkçe simülatörlere, sözlüğe, Türkçe ders haritasına ve başka derslerin Türkçe sayfalarına bağlantı VERME. Bu bağlantılar bir slaytın tek içeriğiyse (ör. "Etkileşimli Simülatörler", "Çalışma Soruları") o slaytı çıkar ya da yalnız İngilizce kaynaklarla (dış kaynaklar, aynı dersin öteki Chapter_ sunumları) bırak. Kaynakça/okuma listesi (kitaplar, makaleler) kalır.
- Önceki/sonraki bölüm bağlantıları İngilizce Chapter_ dosyalarına gider (adlarını ders brifindeki tablodan al).

## Derse özel betikler
- `files/<ders>/slides/deck/` altında bir sunuma özel betik varsa (ör. `Bolum_02_Acgozlu_Algoritmalar.js`) ve içinde kullanıcıya görünen Türkçe metin varsa, betiği iki dilli yap: `deck.js`'teki gibi `const EN = String(document.getElementById("ds-deck").getAttribute("lang")).toLowerCase().indexOf("en") === 0; const tx = (tr, en) => EN ? en : tr;` ve görünen her metni `tx("…", "…")` ile ver. Türkçe sunumun davranışı birebir aynı kalmalı. Betiğin adı değişmez, iki sunum da aynı dosyayı kullanır.
- Inline `<script>` içinde `//` satır yorumu YAZMA (`/* */` kullan); `{{` ya da `{%` YAZMA; `:kelime:` biçiminde iki nokta arasında kelime YAZMA (jemoji). Bunlar canlıda sayfayı bozar.

## Doğrulama (her sunum için)
1. Türkçe karakter taraması: `[çğıİöşüÇĞÖŞÜ]` İngilizce dosyada yalnız kişi/yer adlarında ve ds-guard telif yorumunda kalabilir; kalan her eşleşmeyi gözden geçir.
2. Slayt sayısı ve `data-line` aralıkları Türkçe ile aynı (betikle say).
3. Inline betikleri çıkarıp `node --check`.
4. Bitince depo kökünde `python tools/check_site.py <ders> --browser` (−I olmadan; birkaç dakika sürer) 0 hata / 0 uyarı vermeli; taşan slaytta metni kısalt, yazı boyutunu küçültme.
5. Commit etme; `git stash/checkout/reset` kullanma.

Son mesajında: oluşturduğun dosyalar, iki dilli yaptığın betikler, çıkardığın/ değiştirdiğin bağlantı slaytları, ad tablosuna eklediğin adlar ve doğrulama sonucu.
