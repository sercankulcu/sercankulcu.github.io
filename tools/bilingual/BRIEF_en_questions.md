# Yönerge: Algoritmalar çalışma sorularının İngilizce sürümü

Depo: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io`. Algoritmalar dersinin 11 Türkçe çalışma sorusu destesi (`files/algorithms/sunumlar/Bolum_NN_<Ad>_Calisma_Sorulari.html`) İngilizceye aktarılıyor. İngilizce sunumlar (`files/algorithms/slides/Chapter_NN_….html`) ve notlar (`files/algorithms/notes/…`) zaten var; terimleri ve kod adlarını onlarla tutarlı seç (aynı bölümün İngilizce notuna ve sunumuna göz at).

Model — önce yan yana oku:
- Türkçe `files/data_structures/sunumlar/Bolum_03_Diziler_Calisma_Sorulari.html`
- İngilizce `files/data_structures/slides/Chapter_03_Arrays_Study_Questions.html`

## Dil ve kod
- Doğal ders kitabı İngilizcesi; cümle cümle çeviri değil. Soru sayısı, sırası, şıklar, doğru cevap, sayılar ve çözümler aynı kalır.
- Kod tamamen İngilizce (adlar, yorumlar, yazdırılan metin); adları o bölümün İngilizce notundaki/sunumundaki adlarla aynı seç. Çıktı soruları: çıktı metni kodla birebir tutmalı.
- SVG yazıları İngilizce; koordinatlara dokunma.
- Kişi adları ve Türkiye'ye özgü örnekler kalır. Sayılar İngilizce biçimde (5.5, 1,000).
- Şık uzunlukları: doğru şık ötekilerden belirgin uzun olmasın (site denetimi bunu uyarı sayar); gerekirse yanlış şıkları biraz uzat ya da doğruyu kısalt.
- İngilizce metin Türkçesinden uzun olmasın (slayt taşmasın).

## Dosya
- Ad: `files/algorithms/slides/<en_file>_Study_Questions.html`; `<en_file>` `tools/bilingual/chapters.tsv`'den (algorithms satırları).
- Türkçe dosyayı bu adla kopyala, metni yer değiştirerek İngilizceleştir; yapı, sınıflar, id'ler, `data-*` öznitelikleri (doğru şık işaretleri dahil), `<style>` korunur.
- `../slides/deck/…` → `deck/…`. `<div class="ds-deck" … lang="tr">` → `lang="en"`; `aria-label` vb. İngilizce.
- Son slayttaki bağlantı satırı: `<small>Lecture slides: <a href="Chapter_NN_<…>.html">Chapter N: <Title></a> · <a href="../notes/Chapter_NN_<…>_Lecture_Notes.html">Lecture notes</a></small>`. Sözlük (`../Sozluk.html`) ve Türkçe sunum/simülatör bağlantıları çıkar.
- Front matter:
  ```
  layout: without-sidebar
  title: "Chapter N: <English Title>: Study Questions"
  permalink: /files/algorithms/slides/Chapter_NN_<…>_Study_Questions.html
  excerpt: "Algorithms, Chapter N: <English Title> study questions: multiple-choice, output, step-by-step and classic questions with answers (<konular>)."
  lang: en
  seo_title: "Chapter N: <English Title> · Algorithms Study Questions"
  og_image: <Türkçedeki ile aynı>
  hreflang:
    tr: /files/algorithms/sunumlar/Bolum_NN_<Ad>_Calisma_Sorulari.html
    en: /files/algorithms/slides/Chapter_NN_<…>_Study_Questions.html
  resource: "Practice questions"
  course:
    name: "Algorithms"
    url: "/teaching/algorithms/?lang=en"
  ```
  Türkçe ikizin front matter'ına aynı `hreflang` bloğunu ekle (`lang: tr`'den sonra) ve `course.url`'ü `/teaching/algorithms/?lang=tr` yap; Türkçe dosyada başka şeye dokunma.
- İngilizce notun (`files/algorithms/notes/Chapter_NN_…_Lecture_Notes.html`) üstteki `nt-links` listesine Slides'tan sonra `<li><a href="../slides/Chapter_NN_<…>_Study_Questions.html">Study questions</a></li>` ekle; notta başka şeye dokunma.
- `ds-guard` bloğunu AYNEN koru (içindeki adlara dokunma). Paylaşılan betiklere (`deck.js`, `calisma.js` …) dokunma.

## Yasaklar
- Inline `<script>` içinde `//` yorum yok (`/* */`); hiçbir yerde `{{` / `{%` yok; `:kelime:` biçimi yok (jemoji).
- Yalnız görevindeki dosyalar. Commit, `git stash/checkout/reset`, `check_site` yok. Geçici dosyalar scratchpad içinde kendine ait alt klasörde.

## Doğrulama (her deste)
1. `[çğıİöşüÇĞÖŞÜ]` ve Türkçe kelime taraması (` ve `, ` bir `, `için`, `ile `, `Cevap`, `Soru`, `Doğru`): yalnız ds-guard, kişi/yer adları, kasıtlı örnek kelimeler kalabilir.
2. Slayt sayısı, soru sayısı, şık sayısı ve doğru-şık işaretleri Türkçe ile aynı (betikle karşılaştır).
3. Inline betikler `node --check`; HTML etiket dengesi (html.parser).

Son mesajında kısaca: dosyalar, çıkardığın bağlantılar, doğrulama sonucu.
