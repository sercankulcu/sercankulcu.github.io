# Yönerge: İngilizce sunumlarda üslup cilası

Depo: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io`. İngilizce sunumlar (`files/<ders>/slides/Chapter_*.html`) Türkçe sunumlardan yazıldı; çoğu doğal ama yer yer Türkçe cümle yapısı seziliyor. Görev: bir dersin bütün İngilizce sunumlarını baştan sona okuyup İngilizceyi doğal, akıcı ders kitabı İngilizcesine getirmek.

## Neye bakılır
- Çeviri kokan cümleler: Türkçe söz dizimi, öznesiz cümleler ("Used in many areas such as…"), "In this section we will see…" türü kalıp geçişler, gereksiz "the"/eksik "the", yanlış eşdizimler (make/do, big/large), Türkçeden birebir deyimler, aşırı uzun yan cümleler.
- Dil bilgisi ve yazım hataları; tutarsız terimler (aynı kavram için iki farklı İngilizce terim — dersin bütününde tek terim kullan; alanın yerleşik terimini seç).
- Başlıklarda ve maddelerde paralel yapı; gereksiz tekrar.
- Ton: kısa, doğrudan, Cormen / Sedgewick / Silberschatz / Kurose tonu. Öğrenciye hitapta "we" doğal ölçüde.

## Dokunulmayacaklar
- Kod (`<pre>`, `text/x-*` betikleri), `data-*` öznitelikleri, değişken adları, çıktılar, sayılar, slayt sırası ve sayısı, HTML yapısı, sınıflar, SVG koordinatları.
- Türkçe dosyalar (`sunumlar/`), ders sayfaları, ortak betikler.
- Kişi/yer adları ve Türkiye'ye özgü örnekler (kullanıcı kararı).
- Ön bilgi (front matter) yalnız `excerpt` dil bakımından düzeltilebilir.

## Uzunluk kuralı
Slaytlar sığacak şekilde ayarlandı. Düzelttiğin metin eskisinden UZUN olmasın (eşit ya da kısa). Bir slayt içinde toplam metin artmamalı. SVG etiketlerine yalnız açık bir hata varsa dokun ve uzatma.

## Yöntem
- Dosyalar büyük; metin düğümlerini bir Python betiğiyle çıkar, oku, düzeltme çiftleriyle (eski → yeni, tam eşleşme, slayta kapsamlı) yerine koy. Yazma hatasında ("Errno 22") yeniden dene.
- Geçici dosyaları scratchpad içinde kendi alt klasörüne yaz: `C:\Users\Sercan\AppData\Local\Temp\claude\7124c11a2bd23ac0\c11f1130-2317-4334-bfff-5d20b38079f6\scratchpad\polish_<ders>\`.
- `check_site` ÇALIŞTIRMA (ana oturum en sonda çalıştırır). Inline `<script>` içine `//` yorum, `{{`, `{%`, `:kelime:` ekleme.
- Commit etme.

## Rapor
Sunum başına düzeltme sayısı, dersin bütününde birleştirdiğin terimler, ve 5 tipik önce/sonra örneği. Uzunluğu artan bir düzeltme yaptıysan listele.
