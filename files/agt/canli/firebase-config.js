/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* Canlı sınıf oyunları: Firebase yapılandırması.

   Bu değer null olursa oyunlar çalışmaz ("Kurulum tamamlanmadı"). Adresin sonuna ?test=1
   eklenirse yapılandırma dolu olsa bile yerel deneme modu açılır (Firebase'e bağlanılmaz;
   aynı tarayıcıdaki sekmeler arasında çalışır).

   Kendi Firebase projenizi bağlamak için (ayrıntılar KURULUM.md dosyasında):
   1. https://console.firebase.google.com adresinde yeni bir proje oluşturun.
   2. Build > Authentication > Sign-in method: "Anonymous" (Anonim) yöntemini etkinleştirin.
   3. Build > Realtime Database: veritabanı oluşturun (konum: europe-west1 önerilir),
      "Rules" sekmesine database.rules.json dosyasının içeriğini yapıştırıp yayımlayın.
   4. Project settings > General > Your apps: "</>" (Web) uygulaması ekleyin.
      Firebase'in gösterdiği firebaseConfig nesnesini aşağıya, null yerine yapıştırın.
      databaseURL alanı mutlaka bulunmalıdır (yoksa Realtime Database sayfasındaki adresi ekleyin).
   5. Authentication > Settings > Authorized domains listesinde sercankulcu.github.io bulunmalıdır.

   Bu değerler gizli değildir (her web uygulamasında tarayıcıya gider); güvenliği
   database.rules.json içindeki kurallar sağlar.

   Örnek:
   window.CANLI_FIREBASE = {
     apiKey: "AIza...",
     authDomain: "proje-adi.firebaseapp.com",
     databaseURL: "https://proje-adi-default-rtdb.europe-west1.firebasedatabase.app",
     projectId: "proje-adi",
     storageBucket: "proje-adi.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef"
   };
*/
window.CANLI_FIREBASE = {
  apiKey: "AIzaSyBKlaUs8zKBvzt5Iz2CjugWqnN8w8hlP5o",
  authDomain: "agt-canli.firebaseapp.com",
  databaseURL: "https://agt-canli-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "agt-canli",
  storageBucket: "agt-canli.firebasestorage.app",
  messagingSenderId: "751251876089",
  appId: "1:751251876089:web:0577cb6d14594ecad55a28"
};
