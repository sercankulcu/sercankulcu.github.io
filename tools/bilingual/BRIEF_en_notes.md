# Yönerge: Algoritmalar ders notlarının İngilizce sürümü

Depo: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io` (Jekyll / GitHub Pages). Algoritmalar dersinin 11 Türkçe ders notu (`files/algorithms/notlar/Bolum_NN_…_Ders_Notu.html`, her biri 150–370 KB, çoğu SVG) İngilizceye aktarılıyor. Model: Veri Yapıları'nın onaylanmış İngilizce notları. Önce yan yana oku:
- Türkçe `files/data_structures/notlar/Bolum_03_Diziler_Ders_Notu.html`
- İngilizce `files/data_structures/notes/Chapter_03_Arrays_Lecture_Notes.html`

## Dil: çeviri DEĞİL, doğal İngilizce
- Konuyu bilen, İngilizce ders veren bir öğretim üyesinin aynı notu nasıl yazacağını düşün: ders kitabı İngilizcesi (Cormen, Sedgewick, Kleinberg–Tardos tonu). Türkçe cümle yapısını ve "Bu bölümde … göreceğiz" gibi kalıp geçişleri taşıma. Paragraflar serbestçe yeniden kurulabilir; içerik, sayılar, örnekler, başlık sırası, şekiller ve kod izlemeleri aynı kalır. Kısaltma, içerik çıkarma YOK.
- Terimler: alanın yerleşik İngilizce terimleri (stable sort, inversion, adjacency list, relaxation, cut property, augmenting path, residual graph, failure function, suffix array …). Türkçe terimi parantezde verme.
- Örnek kişi adları (Ayşe, Ali …) ve Türkiye'ye özgü örnekler (şehirler, TL) KALIR; yalnız cümle İngilizce olur.

## Kod: tamamen İngilizce
- Sınıf, metot, değişken adları, yorumlar, yazdırılan metinler İngilizce; adlar kısa ve deyimsel (Java kuralları), bütün notta tutarlı. Yorumlar kısa (uzun yorum `<pre>`'yi yatay taşırır).
- Kod izlemelerinde (`ds-trace` ve `data-line`, `data-vars`, `data-stack`, `data-out` öznitelikleri) değişken adları ve çıktı kodla birebir aynı olmalı; satır sayısı değişmemeli. Mantık ve sayısal sonuçlar aynı.
- SVG içindeki yazılar (etiketler, aria-label, title, desc) İngilizce; koordinatlara dokunma, metin uzarsa kısalt.

## Dosya ve front matter
- Dosya adı: `files/algorithms/notes/<en_file>_Lecture_Notes.html`; `<en_file>` ve başlık `tools/bilingual/chapters.tsv` tablosundan (algorithms satırları), değiştirme. Ör. `Bolum_03_Siralama_Algoritmalari_Ders_Notu.html` → `notes/Chapter_03_Sorting_Algorithms_Lecture_Notes.html`.
- Yöntem: Türkçe dosyayı İngilizce adla `notes/` içine kopyala, sonra metni yer değiştirerek İngilizceleştir (Python betiği ya da Edit). Dosyayı elle baştan yazma; yapı, sınıflar, id'ler, `data-*` öznitelikleri, `<style>` bloğu ve betik etiketleri korunur. id'leri değiştirme (iç bağlantılar `#…` bozulur).
- `<link rel="stylesheet" href="notlar.css">` → `href="../notlar/notlar.css"`.
- `<article class="ds-notes" id="ds-notes" lang="tr">` → `lang="en"`. Başlıktaki kicker: `Algorithms · Lecture Notes`. Bölüm başlıkları DS modelindeki gibi ("Learning outcomes", "Summary" …).
- Front matter:
  ```
  layout: without-sidebar
  title: "Chapter N: <English Title> — Lecture Notes"
  permalink: /files/algorithms/notes/Chapter_NN_<…>_Lecture_Notes.html
  excerpt: "Lecture notes for Chapter N of Algorithms: <konuların doğal İngilizce listesi>; with worked examples and code traces."
  lang: en
  seo_title: "Chapter N: <English Title> · Algorithms Lecture Notes"
  og_image: <Türkçe nottaki ile aynı>
  hreflang:
    tr: /files/algorithms/notlar/Bolum_NN_…_Ders_Notu.html
    en: /files/algorithms/notes/Chapter_NN_…_Lecture_Notes.html
  resource: "Lecture notes"
  course:
    name: "Algorithms"
    url: "/teaching/algorithms/?lang=en"
  ```
  Türkçe ikizin front matter'ına da aynı `hreflang` bloğunu ekle (`lang: tr`'den sonra) ve `course.url`'ü `/teaching/algorithms/?lang=tr` yap. Türkçe dosyada başka bir şeye dokunma.
- `ds-guard` bloğunu AYNEN koru (içindeki hiçbir adı değiştirme; bir ajan `window.top`'u bozup sayfayı kilitlemişti).

## Bağlantılar (kullanıcı kararı: çevrilmemiş Türkçe kaynaklar İngilizce tarafta gösterilmez)
- Üstteki `nt-links` listesi yalnız şunlar: `<li><a href="../slides/Chapter_NN_<…>.html">Slides</a></li>` ve `<li><a href="https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_NN_<…>.pdf">Slides PDF</a></li>`. Çalışma soruları, sözlük, simülatör bağlantıları çıkar.
- Metin içindeki sözlük bağlantıları (`../Sozluk.html#…`): bağlantıyı kaldır, metni (İngilizce terim) bırak.
- Türkçe simülatörlere/sunumlara (`../sunumlar/…`), Türkçe kod reposuna (`algorithms-java`) bağlantı VERME; tek içerik onlarsa o kutuyu/paragrafı çıkar. Başka bölüme gönderme varsa `Chapter_NN_…_Lecture_Notes.html` (aynı klasör) adlarıyla ver. Kaynakça (kitap, makale, dış site) kalır.

## Yasaklar
- `nt-proof` kutularına elle "Proof." / "<em>Proof.</em>" YAZMA: CSS İngilizce notlarda "Proof." etiketini kendisi ekler (elle yazılınca "Proof. Proof." çıkıyor).
- Kod adlarını önce o bölümün İngilizce sunumundaki (slides/) koddan al; sunumda olmayanlara kısa, deyimsel İngilizce ad ver. Kod reposu bu notlara göre düzenlenecek.
- Inline `<script>` içinde `//` satır yorumu yazma (`/* */`); hiçbir yerde `{{` ya da `{%` yazma (Liquid derlemeyi düşürür); `:kelime:` biçiminde iki nokta arasında kelime yazma (jemoji).
- Yalnız görevindeki dosyalara dokun (ders sayfası, chapters.tsv, ortak betikler ana oturumda). Commit etme; `git stash/checkout/reset` kullanma. `check_site` çalıştırma.
- Geçici dosyaları scratchpad'in içinde kendine ait benzersiz bir alt klasöre yaz (ör. `scratchpad/alg_notes_03/`).

## Doğrulama (her not için)
1. `[çğıİöşüÇĞÖŞÜ]` taraması: İngilizce dosyada yalnız kişi/yer adlarında ve ds-guard telif yorumunda kalabilir. Ayrıca Türkçe kelime kalıntısı ara (` ve `, ` bir `, `için`, `ile `, `dizi`, `düğüm`, `kenar`, `Örnek`, `Adım`).
2. Başlık (`<h2>`, `<h3>`), `<svg>`, `<pre>`, `ds-trace` sayıları Türkçe ile aynı (betikle say).
3. Inline betikleri çıkarıp `node --check`.
4. HTML iyi biçimli mi: `python -c` ile html.parser'dan geçir, açık/kapalı etiket dengesine bak.

Son mesajında kısaca: oluşturduğun dosya(lar), çıkardığın bağlantılar ve doğrulama sonucu.
