# tools

*Programming with C* ders notlarından **türetilmiş çıktıları** üreten betikler:
dizin sayfası, PDF kitap ve notların içindeki adımlayıcı figürler.

Site bu klasöre bağımlı değildir. Jekyll onu yok sayar (`_config.yml` →
`exclude`) ve **ders sayfasından buraya bağlantı verilmez** — burası yazarın
mutfağı, öğrencinin değil.

Python 3.9+ yeter. Yalnızca kitap üreteci dış paket ister:

```bash
pip install -r tools/requirements.txt
```

Bütün betikler depo kökünden çalıştırılmak üzere yazılmıştır ve kendi
konumlarından yolları kendileri bulur; mutlak yol gömülü değildir.

## Dizin

```bash
python tools/make_index.py
```

`files/c/Index.html` dosyasını sıfırdan üretir: 56 nottaki `<code>` terimleri ve
bölüm başlıkları taranır, her terim için *öğretildiği* hafta (koyu) ile
*kullanıldığı* haftalar (soluk) listelenir. Terim ayıklama kuralları
`index_terms.py` içindedir; tek başına çalıştırılırsa istatistik ve örnek döker:

```bash
python tools/index_terms.py
```

Bir terim yanlış haftaya bağlanıyorsa çare, notu değiştirmek değil,
`index_terms.py` içindeki `DROP_EXACT` / `GENERIC` / `acceptable()` kurallarını
düzeltmektir. "Öğretildiği hafta" olarak yalnızca *Worked example* başlığından
önceki bölgeye bakılır; sonrası uygulamadır, tanım değil.

Betik ayrıca `week.css` içine dizin stillerini (bir kez) ekler ve her haftanın
gezinme satırına Index bağlantısını koyar. İkisi de zaten varsa dokunmaz.

## Kitap

```bash
python tools/make_book.py
```

56 notu tek bir A4 PDF'e dönüştürür ve `files/c/Programming-with-C.pdf`
üzerine yazar. 10–20 dakika sürer, Chrome (veya Edge) gerekir. Dört aşama:

| Aşama | Dosya | İş |
|---|---|---|
| 1 | `book/build.py` | 56 notu tek `book.html` içinde birleştirir; başlıkları bölüm/kısım hiyerarşisine çevirir, `book.css` gömer |
| 2 | `book/finalize.py` | Chrome ile iki kez basar: ilk baskı sayfa haritasını çıkarır, ikincisi içindekiler tablosunu gerçek sayfa numaralarıyla doldurur |
| 3 | `book/overlay.py` | reportlab ile sayfa numarası, üst bilgi ve PDF yer imlerini bindirir |
| 4 | `book/compress.py` | İçerik akışlarını yeniden sıkıştırır (136 MB → ~10 MB) |

Ara çıktılar `tools/book/build/` altında kalır ve git'e girmez. Sayfa sayısı
değişirse ders sayfasındaki "781 pages, 9.7 MB" ifadesini elle güncelleyin.

Sayfa düzeni `book/book.css` içindedir. Bölüm tespiti PDF metninden yapıldığı
için `letter-spacing` kullanan başlıklarda karşılaştırmadan önce boşluklar
atılır — `finalize.py` içindeki normalizasyonu kaldırmayın.

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
