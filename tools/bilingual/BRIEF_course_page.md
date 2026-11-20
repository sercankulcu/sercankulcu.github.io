# Yönerge: ders sayfasına TR/EN düğmesi ve İngilizce blok eklemek

Depo: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io`. Örnek (onaylı): `_teaching/advanced-algorithms.md` ve `_teaching/data-structures.md`. Önce İleri Algoritmalar sayfasını baştan sona oku; aynı yapıyı kur.

## Yapılacaklar
1. Front matter: `title:` satırından sonra `lang_toggle: true`; `course_language: tr` → `course_language: [tr, en]`. Başka alana dokunma.
2. Sayfanın girişi (resim + İngilizce tanıtım paragrafı) blok dışında kalır, olduğu gibi. Girişten sonraki bütün Türkçe içerik (`## Ders Kitabı`'ndan sayfa sonuna kadar) `<div data-lt="tr" lang="tr" markdown="1">` … `</div>` içine alınır; Türkçe metinde HİÇBİR şey değişmez.
3. Ardından `<div data-lt="en" lang="en" markdown="1">` … `</div>` İngilizce blok:
   - `## Getting Started`: yalnız İngilizce kaynaklar. Türkçe sayfadaki "Başlangıç Kaynakları" listesinden yalnız başka bir dersin sayfasına (`/teaching/...`) giden ön koşul bağlantıları `?lang=en` ekiyle kalabilir; Türkçe PDF, Türkçe html (Important_People, Prerequisites, sözlük, ders haritası) ve kitap bağlantıları VERİLMEZ. Gösterilecek bir şey kalmıyorsa bu bölümü hiç koyma. Araçlar bölümü (ör. emu8086 indirme, dış siteler) İngilizce kaynaksa kalabilir.
   - Kısımlar: `## Part I: <doğal İngilizce ad>` … Türkçe sayfadaki kısım yapısı ve sırası aynı.
   - Her bölüm: `### Chapter N: <İngilizce ad>`, sonra 3–4 cümlelik DOĞAL İngilizce açıklama (Türkçe paragrafı cümle cümle çevirme; bölümün ne öğrettiğini İngilizce ders kataloğu tonunda yaz; Türkçedeki konu listesi ve sırası korunsun), sonra yalnız İngilizce sunum bağlantıları:
     `- [🖼️Slides – <Title> (HTML)](/files/<ders>/slides/<en_file>.html)`
     Alt bölümlü derslerde (Bölüm 1.1, 1.2 …) bir bölümün altındaki her alt sunum için bir satır, başlık olarak alt bölümün İngilizce adı: `- [🖼️Slides – 1.1 Introduction (HTML)](...)`.
   - Dosya adları ve İngilizce başlıklar `tools/bilingual/chapters.tsv` tablosundan; o tabloda olmayan bir sunuma bağlantı verme.
   - PDF, not, çalışma soruları, simülatör, GitHub kod reposu, kitap bağlantısı YOK (kullanıcı kararı: çevrilmeyen kaynaklar İngilizce tarafta gösterilmez; İngilizce PDF'ler sonraya bırakıldı).
   - Bölümler arası `---` ayırıcıları Türkçe bloktaki gibi.
   - Türkçe sayfa sonunda başka derse yönlendiren bir "Devamı" bölümü varsa İngilizcesini (`?lang=en` ile) koy.
4. İngilizce blokta Türkçe karakter kalmasın (kişi adları hariç). `{{`, `{%` yazma.

Commit etme. Son mesajda: değiştirdiğin dosya, İngilizce bloktaki kısım/bölüm sayısı ve verdiğin bağlantı sayısı.
