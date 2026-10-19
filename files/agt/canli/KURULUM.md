---
layout: without-sidebar
title: "Canlı Sınıf Oyunları: Kurulum ve Kullanım"
permalink: /files/agt/canli/KURULUM
excerpt: "Canlı sınıf oyunları için Firebase kurulumu ve sınıfta kullanım kılavuzu."
---

# Canlı Sınıf Oyunları: Kurulum ve Kullanım

Dört oyun derslerin "Oyunla Başlangıç" slaytlarındaki oyunlarla aynıdır:

| Oyun | Bölüm | Öğrenci ne yapar? |
|---|---|---|
| 2/3 Ortalaması | 2 | 0 ile 90 arasında bir sayı yazar (ondalık olabilir) |
| Kapalı Zarf Açık Artırma | 5 | Telefonda gördüğü özel değere (0–100 TL) göre teklif yazar (0–200 TL) |
| Mahkûmun İkilemi | 3 | Eşine karşı Sessiz ya da İhanet seçer (Sam–John matrisi, kazanç = −hapis yılı) |
| Condorcet Oylaması | 7 | Üç adayı tercih sırasına dizer |

Öğretmen ekranı: `https://sercankulcu.github.io/files/agt/canli/`
Öğrenci ekranı: `https://sercankulcu.github.io/files/agt/canli/katil.html` (QR kod bu adrese oda koduyla gider)

Sunucu yoktur; bütün kod tarayıcıda çalışır. Veriler Firebase Realtime Database'de tutulur,
öğrenciler hesap açmaz (Firebase anonim oturum). Yalnızca takma ad saklanır.

## 1. Firebase projesi (bir kez, yaklaşık 10 dakika)

1. <https://console.firebase.google.com> adresinde **Add project** ile yeni proje açın
   (ör. `agt-canli`). Google Analytics gerekmez.
2. **Build → Authentication → Get started → Sign-in method**: **Anonymous** yöntemini
   etkinleştirin.
3. **Authentication → Settings → Authorized domains**: listede `sercankulcu.github.io`
   yoksa ekleyin (`localhost` zaten vardır).
4. **Build → Realtime Database → Create database**: konum olarak `europe-west1` (Belçika)
   önerilir; "locked mode" ile başlayın.
5. Realtime Database'in **Rules** sekmesine bu klasördeki `database.rules.json` dosyasının
   tamamını yapıştırıp **Publish** deyin.
6. **Project settings (dişli) → General → Your apps → Web (`</>`)**: uygulamayı kaydedin
   (Hosting gerekmez). Gösterilen `firebaseConfig` nesnesini kopyalayın.
7. `files/agt/canli/firebase-config.js` dosyasında `window.CANLI_FIREBASE = null;` satırını
   şöyle değiştirin (değerler sizin projenizden):

   ```js
   window.CANLI_FIREBASE = {
     apiKey: "AIza...",
     authDomain: "agt-canli.firebaseapp.com",
     databaseURL: "https://agt-canli-default-rtdb.europe-west1.firebasedatabase.app",
     projectId: "agt-canli",
     storageBucket: "agt-canli.appspot.com",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

   `databaseURL` mutlaka bulunmalıdır; yoksa Realtime Database sayfasının üstündeki adresi
   ekleyin. Bu değerler gizli değildir; erişimi kurallar (`database.rules.json`) sınırlar.
8. Değişikliği commit edip gönderin. GitHub Pages güncellenince öğretmen ekranı "Kurulum
   tamamlanmadı" yerine oyun seçimini gösterir.

Ücretsiz Spark planı bir sınıf için fazlasıyla yeterlidir (100 eşzamanlı bağlantı,
1 GB veri). 100'den kalabalık bir grupta Blaze planı gerekir.

## 2. Sınıfta kullanım

1. Projeksiyonda öğretmen ekranını açın, oyunu seçin. Büyük oda kodu ve QR kod görünür.
2. Öğrenciler telefon kamerasıyla QR kodu okutur (ya da `katil.html` adresini açıp
   4 haneli kodu yazar), isterse takma ad girer ve **Katıl** der. Takma ad boş kalırsa
   "Öğrenci 17" gibi bir ad verilir. Katılımcı sayısı tahtada canlı artar.
3. **Turu başlat**: soru öğrencilerin telefonunda açılır.
   - Açık artırmada her öğrenciye bu anda 0–100 TL arası rastgele özel değer verilir.
   - Mahkûmun İkilemi'nde öğrenciler bu anda rastgele ikili eşleşir; tek sayıda kalan
     öğrenci bilgisayarla eşleşir (bilgisayar Tit-for-Tat: ilk tur sessiz, sonra öğrencinin
     bir önceki seçimini kopyalar).
   - Tur açıkken gelen öğrenci de değerini ya da (bilgisayar) eşini alır.
4. Tahtada kaç kişinin cevap verdiği görünür (cevapların kendisi gizlidir). Öğrenci tur
   kapanana kadar cevabını değiştirebilir.
5. **Cevapları kapat**, sonra **Sonuçları göster**. (Doğrudan **Sonuçları göster** de
   cevapları kapatır.) Her öğrenci kendi sonucunu telefonunda görür.
6. **Yeni tur**: aynı oyun bir sonraki turla sürer. Turlar boyunca:
   - 2/3 ortalamasında ortalama ve hedefin 0'a (dengeye) doğru inişi çizilir.
   - Mahkûmun İkilemi'nde "Aynı eşleşmeyle tekrarla" işaretlenirse eşler değişmez
     (tekrarlı oyun); her öğrencinin toplam kazancı tutulur.
7. Ders bitince **Odayı kapat**: odanın bütün verileri silinir. Kapatılmayan odalar,
   aynı tarayıcıda öğretmen ekranı bir sonraki açılışta 24 saati geçmişse silinir;
   başka bir öğretmen aynı kodu alırsa 24 saatten eski oda yine silinir.

Oyun ayarları (tur başlamadan önce, sağ panelde):

- **Açık artırma**: "4'erli rastgele gruplar" (varsayılan) ya da "Tüm sınıf tek açık artırma".
  Aynı teklifler hem birinci fiyat (kazanan kendi teklifini öder) hem ikinci fiyat (kazanan
  ikinci en yüksek teklifi öder) kuralıyla sonuçlanır. En yüksek teklifte eşitlik olursa
  önce gönderen kazanır; tek kişilik grupta ikinci fiyat 0'dır.
- **Mahkûmun İkilemi**: "Aynı eşleşmeyle tekrarla".
- **Condorcet oylaması**: üç adayın adı (varsayılan A, B, C).

Sonuç ekranları:

- **2/3 ortalaması**: histogram, ortalama, hedef = 2/3 × ortalama, kazanan(lar) (hedefe en
  yakın; eşitlikte paylaşılır), turlar boyunca ortalama ve hedef.
- **Açık artırma**: her grup için kazanan, ödenen fiyat ve kazanç (değer − fiyat) iki kurala
  göre; satıcı geliri; teklif–değer saçılımı, y = x (ikinci fiyatta dürüst teklif) ve
  b = (n−1)v/n (birinci fiyatta teklif kırpma) doğruları.
- **Mahkûmun İkilemi**: seçim oranları, eşleşme sonuçları (Sessiz–Sessiz, Sessiz–İhanet,
  İhanet–İhanet), ortalama kazanç ve "herkes sessiz kalsaydı" (−1) karşılaştırması.
- **Condorcet oylaması**: tercih profili, ikili karşılaştırma matrisi ve çizgesi (Condorcet
  kazananı ya da döngü), çoğulluk, Borda sayımı (3 aday: 2, 1, 0 puan) ve anında ikinci tur
  kazananları. Anında ikinci turda en az birinci tercih alan elenir; en azda eşitlik varsa
  eşit adaylar birlikte elenir, kalanların hepsi eşitse sonuç beraberliktir.

## 3. Kurulumsuz deneme (test modu)

Adresin sonuna `?test=1` ekleyin: `.../files/agt/canli/?test=1`. Veriler yalnızca bu
tarayıcıda (localStorage) tutulur ve aynı tarayıcının sekmeleri arasında paylaşılır. QR kod
ve katılım adresi de `test=1` taşır; öğrenci sekmelerini aynı tarayıcıda açarak oyunu
baştan sona deneyebilirsiniz. Telefonlar test modunda bağlanamaz. Test modunda güvenlik
kuralları uygulanmaz.

## 4. Veri modeli

```
rooms/{kod}/meta             { oyun, durum: bekliyor|acik|kapali|sonuc, tur, sahip, olusturma, ayar }
rooms/{kod}/players/{uid}    { ad, katilma }
rooms/{kod}/answers/{tur}/{uid}  { sayi | teklif | secim | sira, zaman }
rooms/{kod}/private/{uid}    { deger, tur }      açık artırmada özel değer
rooms/{kod}/pairs/{tur}      { uid: rakipUid | "_pc" }   Mahkûmun İkilemi eşleşmesi
rooms/{kod}/results/{tur}    sonuç özeti ve her öğrencinin kendi sonucu
```

Kurallar (`database.rules.json`): her okuma ve yazma oturum ister. `meta`, `pairs` ve
`results` yalnızca odanın sahibi (oluşturan öğretmen) tarafından yazılır. Öğrenci yalnızca
kendi `players/{uid}` kaydını ve tur açıkken kendi cevabını yazar; cevap değerleri
denetlenir (sayı 0–90, teklif 0–200, seçim S/İ, sıralama üç adayın bir permütasyonu).
Öğrenci başkalarının cevaplarını okuyamaz; özel değeri yalnızca kendisi ve sahip okur.
Odayı sahibi siler; 24 saatten eski bir odayı herkes silebilir.

## 5. Sorun giderme

- **"Kurulum tamamlanmadı"**: `firebase-config.js` boş ya da `databaseURL` eksik.
- **"auth/operation-not-allowed"**: Anonymous oturum açma etkin değil (adım 2).
- **"auth/unauthorized-domain"**: alan adı yetkili listede değil (adım 3).
- **Öğrenci "Bu kodla açık bir oda yok" görüyor**: kod yanlış ya da oda kapatılmış.
- **"PERMISSION_DENIED"**: kurallar yayımlanmamış (adım 5) ya da cevap tur kapandıktan
  sonra gönderilmiş.
- Öğretmen sayfayı yenilerse aynı odaya döner (oda kodu tarayıcıda saklanır).
  Öğrenci sayfayı yenilerse QR adresinden aynı odaya ve aynı takma adla döner.
