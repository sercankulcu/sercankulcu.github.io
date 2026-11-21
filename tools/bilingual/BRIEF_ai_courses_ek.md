# Yönerge: YZ Dersleri Rehberi'ne üç yeni slaytın içeriği

Depo: `C:\Users\Sercan\Documents\GitHub\sercankulcu.github.io`. "Yapay Zekâ ve Veri Dersleri Rehberi" sunumları `tools/ai_courses/make_decks.py` üretecinden çıkar. Üretece üç yeni slayt eklendi; bunlar bir dersin içerik dosyasında ilgili alan varsa görünür:

| Alan | Slayt | Biçim |
|---|---|---|
| `islenenler` | Derste Neler İşlenir? | 12 dizgelik liste: tipik bir dönemin konu akışı, sırayla |
| `beceriler` | (aynı slayt, çipler) | 4–6 kısa dizge: dersin kazandırdığı somut beceriler/araçlar |
| `hazirlik` | Bu Ders Sana Göre mi? | 4 adet (soru, "hayırsa önce") ikilisi |
| `riskler` | Riskler ve Etik | 4 adet (başlık, açıklama) ikilisi |

Pilot olarak üç ders yazıldı ve onaylandı; ÜSLUP, UZUNLUK ve BİÇİM için önce bunları oku:
`tools/ai_courses/icerik/MO.py`, `BG.py`, `VB.py` (Türkçe) ve `tools/ai_courses/icerik_en/MO.py`, `BG.py`, `VB.py` (İngilizce). Dosyaların sonundaki `islenenler=…` ile başlayan blok.

## Görevin
Görevindeki her ders KOD için:
1. `tools/ai_courses/icerik/KOD.py` dosyasının sonuna (son `)` satırından hemen önce) Türkçe bloğu ekle.
2. `tools/ai_courses/icerik_en/KOD.py` dosyasının sonuna aynı yere İngilizce bloğu ekle.
Önce dersin mevcut içeriğini (tanım, kavramlar, ön koşullar, uygulamalar, yanılgılar) oku; yeni slaytlar onunla tutarlı olsun ve onu tekrar etmesin. Dosyanın başka hiçbir yerine, üretece ve başka derslerin dosyalarına dokunma. Üreteci çalıştırma.

## İçerik kuralları
- **islenenler:** Bu dersi gerçek bir üniversitede (ör. iyi bilinen ders izlenceleri: Stanford, MIT, CMU ya da yerleşik ders kitaplarının içindekiler sırası) alan bir öğrencinin dönem boyunca göreceği konular. Tam 12 madde, her biri en çok ~55 karakter. Mantıklı öğretim sırası. Konu adları, "giriş" gibi boş maddeler yok.
- **beceriler:** Somut ve ders sonunda gerçekten kazanılan: araç/kütüphane adları (dersin `araclar` listesiyle tutarlı) ve yetiler ("deney tasarlamak", "kanıt yazmak"). 4–6 madde, her biri en çok ~45 karakter.
- **hazirlik:** 4 soru, "…yapabiliyor musun? / …açıklayabiliyor musun?" biçiminde, ölçülebilir (öğrenci evet/hayır diyebilmeli). Soru en çok ~85, ipucu en çok ~70 karakter. İpucu sütunu öğrenciyi başlanacak yere yönlendirir: rehberdeki bir derse yönlendirirken yalnız `@KOD` yaz (ör. `'@DC'`; üreteç bunu o dersin sunumuna bağlantıya çevirir; kodlar: YZ MO YSA DO NLP PO OT BM EMO US OGM UM CES AYE SSI GI BG KSI TGI UA BGR ROB BIO VM VB BV BE ZS SAA DC OI OPT BK MLOPS GYZ GPU SGY BIN). Rehber dışı bir kaynaksa kısa düz metin ("Programlamaya giriş, ardından NumPy'a kısa bir giriş", "Analiz dersindeki türev ve zincir kuralı"). Kendi dersine (@ kendi kodu) yönlendirme. Sorular dersin ön koşul tablosuyla tutarlı olsun.
- **riskler:** O dersin KENDİNE ÖZGÜ 4 riski ya da etik sorunu; genel "veri yanlılığı" tekrarından kaçın, dersin kendi örneklerini kullan. Başlık en çok ~35, açıklama en çok ~140 karakter. Somut ve doğru olsun (gerçek olay anılıyorsa doğru anılsın; emin değilsen genel ama somut yaz). Metodolojik riskler (ör. veri sızıntısı, p-hacking) de olabilir. Matematik derslerinde (DC, OI, OPT, BK) riskler o aracın yanlış kullanımından doğanlar olur (ör. sayısal kararsızlık, çoklu test, yanlış amaç fonksiyonu). AYE dersinin kendisinde riskler, açıklanabilirlik ve etik uygulamasının kendi tuzakları olur (ör. yanıltıcı açıklamalar, "etik yıkama").
- Türkçe: doğal, kısa, TDK yazımı; terimler sitedeki gibi ("öznitelik", "kümeleme", "pekiştirmeli öğrenme"…). İngilizce: doğal ders kitabı İngilizcesi; Türkçe metnin çevirisi değil, aynı içeriğin İngilizce yazılmışı. İki dilde madde sayısı ve sıra aynı.
- Türkiye'ye özgü yasa (KVKK) Türkçede geçebilir; İngilizcede "GDPR and similar laws" gibi genel yaz.
- Yasaklar (canlı sitede sayfayı bozar): hiçbir yerde `{{` ya da `{%`; iki nokta arasında tek kelime (`:kelime:`) yazma. Python dizgelerinde kesme işaretini `\'` ile kaçır ya da çift tırnak kullan.

## Doğrulama (her ders için)
- İki dosya da Python ile yüklenir: `importlib.util.spec_from_file_location` ile `ICERIK` okunur; `islenenler` 12, `hazirlik` 4, `riskler` 4 öğe; `beceriler` 4–6. TR ve EN uzunlukları aynı.
- İngilizce dosyada eklediğin blokta Türkçe karakter (`[çğıİöşüÇĞÖŞÜ]`) yok (özel adlar dışında).
- `@KOD` ipuçları yalnız geçerli kodlar.
Geçici dosyalar: `C:\Users\Sercan\AppData\Local\Temp\claude\7124c11a2bd23ac0\c11f1130-2317-4334-bfff-5d20b38079f6\scratchpad\ek_<grup>\`. Commit etme; git stash/checkout/reset kullanma.

Son mesajın kısa olsun (Türkçe): yazdığın dersler, doğrulama sonucu, emin olamadığın olgular.
