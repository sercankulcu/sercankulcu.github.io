const questions = [
  {
    question: "Türkiye'nin başkenti neresidir?",
    options: ["İstanbul", "Ankara", "İzmir", "Bursa"],
    correct: 1,
    level: 1
  },
  {
    question: "Hangi gezegen 'Kızıl Gezegen' olarak adlandırılır?",
    options: ["Venüs", "Mars", "Jüpiter", "Satürn"],
    correct: 1,
    level: 2
  },
  {
    question: "Türk bayrağındaki yıldız kaç köşelidir?",
    options: ["4", "5", "6", "7"],
    correct: 1,
    level: 3
  },
  {
    question: "Hangi elementin sembolü 'Au'dur?",
    options: ["Gümüş", "Altın", "Bakır", "Demir"],
    correct: 1,
    level: 4
  },
  {
    question: "Dünyanın en yüksek dağı hangisidir?",
    options: ["Everest", "K2", "Kanchenjunga", "Lhotse"],
    correct: 0,
    level: 5
  },
  {
    question: "Hangi gezegen Dünya'nın en yakınıdır?",
    options: ["Venüs", "Mars", "Merkür", "Jüpiter"],
    correct: 2,
    level: 6
  },
  {
    question: "Türk mutfağının ünlü yemeği 'Kebap' hangi şehirle özdeşleşmiştir?",
    options: ["Ankara", "İstanbul", "Bursa", "Adana"],
    correct: 3,
    level: 7
  },
  {
    question: "Ay'a ilk insan ne zaman ayak bastı?",
    options: ["1965", "1969", "1972", "1980"],
    correct: 1,
    level: 8
  },
  {
    question: "Hangisi bir okyanus değildir?",
    options: ["Atlas Okyanusu", "Pasifik Okyanusu", "Arktik Okyanusu", "Hazar Denizi"],
    correct: 3,
    level: 1
  },
  {
    question: "Einstein'ın ünlü denklemi nedir?",
    options: ["E=mc^2", "F=ma", "V=IR", "P=F/A"],
    correct: 0,
    level: 10
  },
  {
    question: "Hangi hayvan en hızlıdır?",
    options: ["Çita", "Aslan", "Köpekbalığı", "Zebra"],
    correct: 0,
    level: 3
  },
  {
    question: "Türkiye'nin en büyük gölü hangisidir?",
    options: ["Tuz Gölü", "Van Gölü", "Eğirdir Gölü", "Beyşehir Gölü"],
    correct: 1,
    level: 1
  },
  {
    question: "İlk Türk alfabesi hangisidir?",
    options: ["Latin Alfabesi", "Göktürk Alfabesi", "Arap Alfabesi", "Uygur Alfabesi"],
    correct: 1,
    level: 2
  },
  {
    question: "Hangi gezegen en büyük hacme sahiptir?",
    options: ["Dünya", "Mars", "Jüpiter", "Neptün"],
    correct: 2,
    level: 3
  },
  {
    question: "Elektrik akımını ölçmek için hangi cihaz kullanılır?",
    options: ["Voltmeter", "Ohmmeter", "Ampermetre", "Barometre"],
    correct: 2,
    level: 4
  },
  {
    question: "Hangi kıta en fazla ülkeye sahiptir?",
    options: ["Asya", "Afrika", "Avrupa", "Güney Amerika"],
    correct: 1,
    level: 5
  },
  {
    question: "Hangi bileşik suyun kimyasal formülüdür?",
    options: ["CO₂", "H₂O", "NaCl", "O₂"],
    correct: 1,
    level: 6
  },
  {
    question: "En uzun kara sınırına sahip iki ülke hangileridir?",
    options: ["ABD-Kanada", "Rusya-Çin", "Hindistan-Pakistan", "Brezilya-Arjantin"],
    correct: 0,
    level: 7
  },
  {
    question: "Ses hangi ortamda en hızlı yayılır?",
    options: ["Hava", "Su", "Çelik", "Boşluk"],
    correct: 2,
    level: 8
  },
  {
    question: "Hangi gezegenin en fazla uydusu vardır?",
    options: ["Jüpiter", "Satürn", "Mars", "Neptün"],
    correct: 1,
    level: 9
  },
  {
    question: "Hangi matematikçi 'Pisagor Teoremi' ile ünlüdür?",
    options: ["Öklid", "Pisagor", "Arşimet", "Newton"],
    correct: 1,
    level: 2
  },
  {
    question: "Hangi element insan vücudunda en çok bulunur?",
    options: ["Oksijen", "Karbon", "Hidrojen", "Azot"],
    correct: 0,
    level: 11
  },
  {
    question: "Türkiye'nin en uzun nehri hangisidir?",
    options: ["Kızılırmak", "Fırat", "Dicle", "Sakarya"],
    correct: 0,
    level: 1
  },
  {
    question: "Hangi gezegen Güneş Sistemi'nde en küçüktür?",
    options: ["Mars", "Venüs", "Merkür", "Neptün"],
    correct: 2,
    level: 2
  },
  {
    question: "Bir üçgenin iç açılarının toplamı kaç derecedir?",
    options: ["180", "360", "90", "270"],
    correct: 0,
    level: 3
  },
  {
    question: "Hangi gezegenin kendine ait bir uydusu yoktur?",
    options: ["Dünya", "Mars", "Merkür", "Jüpiter"],
    correct: 2,
    level: 4
  },
  {
    question: "Türkiye hangi kıtada yer alır?",
    options: ["Asya", "Avrupa", "Afrika", "Hem Asya hem Avrupa"],
    correct: 3,
    level: 5
  },
  {
    question: "Bir yıl kaç haftadır?",
    options: ["48", "50", "52", "54"],
    correct: 2,
    level: 6
  },
  {
    question: "Hangi hayvan memeli değildir?",
    options: ["Yunus", "Balina", "Köpekbalığı", "Fok"],
    correct: 2,
    level: 7
  },
  {
    question: "Gökkuşağı kaç renkten oluşur?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    level: 8
  },
  {
    question: "Hangi ülke yüz ölçümü bakımından en büyüktür?",
    options: ["ABD", "Kanada", "Çin", "Rusya"],
    correct: 3,
    level: 9
  },
  {
    question: "Hangi organ oksijen taşıyan kan hücrelerini üretir?",
    options: ["Kalp", "Böbrek", "Kemik iliği", "Akciğer"],
    correct: 2,
    level: 10
  },
  {
    question: "Dünya’nın uydusu hangisidir?",
    options: ["Mars", "Ay", "Güneş", "Jüpiter"],
    correct: 1,
    level: 11
  },
  {
    question: "Hangi gezegenin halkaları vardır?",
    options: ["Mars", "Venüs", "Satürn", "Merkür"],
    correct: 2,
    level: 2
  },
  {
    question: "Bir saatte kaç dakika vardır?",
    options: ["30", "45", "60", "90"],
    correct: 2,
    level: 3
  },
  {
    question: "Bir kilogram kaç gramdır?",
    options: ["100", "500", "1000", "1500"],
    correct: 2,
    level: 4
  },
  {
    question: "Hangi madde elektriği iletmez?",
    options: ["Bakır", "Demir", "Plastik", "Altın"],
    correct: 2,
    level: 5
  },
  {
    question: "Hangi spor dalında 'şut' terimi kullanılır?",
    options: ["Tenis", "Futbol", "Basketbol", "Yüzme"],
    correct: 1,
    level: 8
  },
  {
    question: "Hangi mevsimde en uzun gece yaşanır?",
    options: ["İlkbahar", "Yaz", "Sonbahar", "Kış"],
    correct: 3,
    level: 9
  },
  {
    question: "Türkiye'nin en yüksek dağı hangisidir?",
    options: ["Erciyes", "Uludağ", "Ağrı Dağı", "Kaçkar Dağı"],
    correct: 2,
    level: 10
  },
  {
    question: "Ay'ın Dünya etrafında dönme süresi yaklaşık kaç gündür?",
    options: ["15", "27", "30", "365"],
    correct: 1,
    level: 11
  },
  {
    question: "Hangi organ kanı vücuda pompalar?",
    options: ["Akciğer", "Beyin", "Karaciğer", "Kalp"],
    correct: 3,
    level: 3
  },
  {
    question: "Bir dikdörtgenin alanı nasıl hesaplanır?",
    options: ["Uzunluk + Genişlik", "Uzunluk x Genişlik", "Uzunluk ÷ Genişlik", "Uzunluk - Genişlik"],
    correct: 1,
    level: 4
  },
  {
    question: "Hangisi bir sürüngendir?",
    options: ["Kurbağa", "Kaplumbağa", "Kartal", "Balina"],
    correct: 1,
    level: 5
  },
  {
    question: "Türkiye'nin en doğusundaki şehir hangisidir?",
    options: ["Van", "Ağrı", "Hakkari", "Iğdır"],
    correct: 3,
    level: 6
  },
  {
    question: "Hangi ülkenin bayrağı kırmızı zemin üzerine beyaz hilal ve yıldızdan oluşur?",
    options: ["Almanya", "Türkiye", "Fransa", "İtalya"],
    correct: 1,
    level: 7
  },
  {
    question: "Hangi bilim insanı yerçekimi kanununu bulmuştur?",
    options: ["Einstein", "Newton", "Galileo", "Darwin"],
    correct: 1,
    level: 8
  },
  {
    question: "Bir hafta kaç saattir?",
    options: ["24", "48", "168", "720"],
    correct: 2,
    level: 9
  },
  {
    question: "Hangi şehir İstanbul’un komşusudur?",
    options: ["Ankara", "Edirne", "Bursa", "İzmir"],
    correct: 2,
    level: 10
  },
  {
    question: "Türkiye'nin en büyük adası hangisidir?",
    options: ["Bozcaada", "Gökçeada", "Büyükada", "Avşa Adası"],
    correct: 1,
    level: 11
  },
  {
    question: "Hangi gezegen halkalarıyla ünlüdür?",
    options: ["Mars", "Venüs", "Satürn", "Merkür"],
    correct: 2,
    level: 1
  },
  {
    question: "Bir yılda kaç gün vardır?",
    options: ["365", "360", "366", "364"],
    correct: 0,
    level: 3
  },
  {
    question: "Hangisi bir elektrikli iletken maddesidir?",
    options: ["Plastik", "Cam", "Bakır", "Tahta"],
    correct: 2,
    level: 4
  },
  {
    question: "Hangi gezegen en sıcak gezegen olarak bilinir?",
    options: ["Merkür", "Venüs", "Mars", "Dünya"],
    correct: 1,
    level: 5
  },
  {
    question: "İnsan vücudunda en büyük organ hangisidir?",
    options: ["Beyin", "Karaciğer", "Deri", "Mide"],
    correct: 2,
    level: 7
  },
  {
    question: "Hangisi bir yazılım programlama dilidir?",
    options: ["Python", "HTML", "CSS", "XML"],
    correct: 0,
    level: 9
  },
  {
    question: "Ay hangi gök cismine aittir?",
    options: ["Venüs", "Mars", "Dünya", "Jüpiter"],
    correct: 2,
    level: 10
  },
  {
    question: "Hangi bilim insanı radyoaktivite üzerine çalışmalarıyla tanınmıştır?",
    options: ["Isaac Newton", "Albert Einstein", "Marie Curie", "Galileo Galilei"],
    correct: 2,
    level: 11
  },
  {
    question: "Mona Lisa tablosunun ressamı kimdir?",
    options: ["Michelangelo", "Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso"],
    correct: 1,
    level: 1
  },
  {
    question: "Hangisi bir müzik aletidir?",
    options: ["Palet", "Obua", "Heykel", "Fırça"],
    correct: 1,
    level: 2
  },
  {
    question: "Hangi sanat dalı tiyatro ile ilgilidir?",
    options: ["Resim", "Müzik", "Dram", "Heykel"],
    correct: 2,
    level: 3
  },
  {
    question: "Michelangelo'nun ünlü Davut (David) heykeli hangi malzemeden yapılmıştır?",
    options: ["Taş", "Ahşap", "Mermer", "Metal"],
    correct: 2,
    level: 4
  },
  {
    question: "Hangisi ünlü bir bestecidir?",
    options: ["Claude Monet", "Wolfgang Amadeus Mozart", "Salvador Dalí", "Andy Warhol"],
    correct: 1,
    level: 5
  },
  {
    question: "Barok dönemin en ünlü sanatçılarından biri kimdir?",
    options: ["Rembrandt", "Edvard Munch", "Paul Cézanne", "Georges Seurat"],
    correct: 0,
    level: 6
  },
  {
    question: "Hangi sanat akımı soyut sanatın öncülerindendir?",
    options: ["Kübizm", "Gotik", "Rönesans", "Barok"],
    correct: 0,
    level: 7
  },
  {
    question: "Hangi müzik türü klasik müzik içerisinde yer almaz?",
    options: ["Senfoni", "Sonat", "Opera", "Rock"],
    correct: 3,
    level: 8
  },
  {
    question: "Pablo Picasso hangi sanat akımının öncülerindendir?",
    options: ["Dadaizm", "Sürrealizm", "Kübizm", "Empresyonizm"],
    correct: 2,
    level: 9
  },
  {
    question: "Bir tiyatro oyununda sahnenin dekor ve tasarımından sorumlu kişi kimdir?",
    options: ["Dramaturg", "Rejisör", "Sanat yönetmeni", "Sahne tasarımcısı"],
    correct: 3,
    level: 10
  },
  {
    question: "Hangi sanat dalı üç boyutlu eserler oluşturmayı içerir?",
    options: ["Mimari", "Heykel", "Seramik", "Mozaik"],
    correct: 1,
    level: 11
  },
  {
    question: "Ekonomide 'arz' neyi ifade eder?",
    options: ["Tüketicilerin satın almak istediği miktarı", "Üreticilerin satmak istediği mal miktarını", "Devletin belirlediği fiyatı", "İthal edilen ürün miktarını"],
    correct: 1,
    level: 1
  },
  {
    question: "Talep yasasına göre, bir malın fiyatı artarsa ne olur?",
    options: ["Talep artar", "Talep azalır", "Talep değişmez", "Üretim azalır"],
    correct: 1,
    level: 2
  },
  {
    question: "Bir ülkenin ekonomik büyümesini ölçmek için hangi gösterge kullanılır?",
    options: ["Enflasyon oranı", "İşsizlik oranı", "Gayri Safi Yurt İçi Hasıla (GSYİH)", "Faiz oranı"],
    correct: 2,
    level: 3
  },
  {
    question: "Enflasyon nedir?",
    options: ["Ürün fiyatlarının sürekli artması", "Üretimin artması", "İşsizlik oranının düşmesi", "İhracatın artması"],
    correct: 0,
    level: 4
  },
  {
    question: "Merkez Bankası'nın temel görevi nedir?",
    options: ["Vergi toplamak", "Para basmak ve para politikasını yönetmek", "İthalatı artırmak", "Bankalara kredi vermek"],
    correct: 1,
    level: 5
  },
  {
    question: "Hangi sektör 'birincil sektör' olarak adlandırılır?",
    options: ["Tarım ve madencilik", "Sanayi ve üretim", "Hizmet sektörü", "Turizm ve eğlence"],
    correct: 0,
    level: 6
  },
  {
    question: "Bir ülkenin ithalatı ihracatından fazla ise ne olur?",
    options: ["Bütçe fazlası oluşur", "Dış ticaret açığı oluşur", "Ekonomi büyür", "Enflasyon düşer"],
    correct: 1,
    level: 7
  },
  {
    question: "'Piyasa ekonomisi' hangi prensibe dayanır?",
    options: ["Devletin tüm üretimi kontrol etmesine", "Bireylerin ve işletmelerin serbestçe karar almasına", "Fiyatların devlet tarafından belirlenmesine", "Tek bir şirketin piyasaya hakim olmasına"],
    correct: 1,
    level: 8
  },
  {
    question: "Hangi para birimi Avrupa Birliği'nin ortak para birimidir?",
    options: ["Euro", "Dolar", "Sterlin", "Yen"],
    correct: 0,
    level: 9
  },
  {
    question: "Bir ülkede işsizlik oranının artması genellikle ne anlama gelir?",
    options: ["Ekonominin büyüdüğüne", "İnsanların daha fazla tasarruf ettiğine", "Üretimin düştüğüne ve ekonomik sorunların arttığına", "Fiyatların yükseldiğine"],
    correct: 2,
    level: 10
  },
  {
    question: "Hangi ekonomi sistemi özel mülkiyet ve serbest piyasa temellerine dayanır?",
    options: ["Kapitalizm", "Sosyalizm", "Komünizm", "Feodalizm"],
    correct: 0,
    level: 11
  },
  {
    question: "Mickey Mouse'un en yakın arkadaşı kimdir?",
    options: ["Donald Duck", "Goofy", "Pluto", "Tom"],
    correct: 1,
    level: 1
  },
  {
    question: "Tom ve Jerry çizgi filminde hangi hayvanlar yer alır?",
    options: ["Köpek ve kedi", "Fare ve kedi", "Tavşan ve ördek", "Aslan ve zebra"],
    correct: 1,
    level: 2
  },
  {
    question: "Çizgi film dünyasında 'Anka Kuşu' temalı karakter hangi dizide yer alır?",
    options: ["Avatar: Son Hava Bükücü", "Looney Tunes", "Transformers", "DuckTales"],
    correct: 0,
    level: 3
  },
  {
    question: "Süper kahraman 'Örümcek Adam' gerçek hayatta hangi isimle bilinir?",
    options: ["Bruce Wayne", "Tony Stark", "Peter Parker", "Clark Kent"],
    correct: 2,
    level: 4
  },
  {
    question: "Scooby-Doo'nun sahibinin adı nedir?",
    options: ["Shaggy", "Fred", "Daphne", "Velma"],
    correct: 0,
    level: 5
  },
  {
    question: "Bugs Bunny'nin meşhur repliği nedir?",
    options: ["What's up, doc?", "I'm Batman!", "To infinity and beyond!", "Cowabunga!"],
    correct: 0,
    level: 6
  },
  {
    question: "Şirinler köyünde hangi kötü karakter onlara sürekli tuzak kurar?",
    options: ["Gargamel", "Hades", "Joker", "Megatron"],
    correct: 0,
    level: 7
  },
  {
    question: "Ninja Kaplumbağalar'dan biri değildir?",
    options: ["Leonardo", "Michelangelo", "Donatello", "Pikachu"],
    correct: 3,
    level: 8
  },
  {
    question: "Walt Disney'in yarattığı ilk çizgi film karakteri kimdir?",
    options: ["Mickey Mouse", "Oswald the Lucky Rabbit", "Donald Duck", "Goofy"],
    correct: 1,
    level: 9
  },
  {
    question: "Hangi çizgi film karakteri bir deniz süngeridir?",
    options: ["Patrick", "Squidward", "Sandy", "SpongeBob"],
    correct: 3,
    level: 10
  },
  {
    question: "Looney Tunes karakterlerinden biri değildir?",
    options: ["Daffy Duck", "Tweety", "Porky Pig", "Optimus Prime"],
    correct: 3,
    level: 11
  },
  {
    question: "Hangisi zamir (adıl) değildir?",
    options: ["Ben", "Bu", "Büyük", "O"],
    correct: 2,
    level: 3
  },
  {
    question: "Türkçede kaç tane sesli harf vardır?",
    options: ["6", "8", "10", "12"],
    correct: 1,
    level: 4
  },
  {
    question: "Aşağıdakilerden hangisi bir cümlede özne olabilir?",
    options: ["Fiil", "Zamir", "Zarf", "Edat"],
    correct: 1,
    level: 5
  },
  {
    question: "Hangisi asal sayıdır?",
    options: ["15", "21", "23", "27"],
    correct: 2,
    level: 6
  },
  {
    question: "5! (5 faktöriyel) işleminin sonucu kaçtır?",
    options: ["60", "100", "120", "150"],
    correct: 2,
    level: 7
  },
  {
    question: "3x + 5 = 17 denklemini sağlayan x değeri kaçtır?",
    options: ["2", "3", "4", "5"],
    correct: 2,
    level: 8
  },
  {
    question: "Bir doğru çizmek için en az kaç nokta gerekir?",
    options: ["1", "2", "3", "Sonsuz"],
    correct: 1,
    level: 9
  },
  {
    question: "Hangisi bir ülkenin başkenti değildir?",
    options: ["Berlin", "Paris", "Londra", "Barselona"],
    correct: 3,
    level: 10
  },
  {
    question: "Hangi ülke Avrupa kıtasında yer almaz?",
    options: ["İspanya", "İtalya", "Almanya", "Meksika"],
    correct: 3,
    level: 2
  },
  {
    question: "Hangi ülke Asya kıtasında yer almaz?",
    options: ["Hindistan", "Japonya", "Türkiye", "Mısır"],
    correct: 3,
    level: 3
  },
  {
    question: "Hangi ülke Afrika kıtasında yer almaz?",
    options: ["Mısır", "Nijerya", "Gana", "Hindistan"],
    correct: 3,
    level: 5
  },
  {
    question: "Hangi ülke Kuzey Amerika kıtasında yer almaz?",
    options: ["ABD", "Kanada", "Meksika", "Küba"],
    correct: 3,
    level: 6
  },
  {
    question: "Hangi ülke Avustralya kıtasında yer almaz?",
    options: ["Avustralya", "Yeni Zelanda", "Endonezya", "Japonya"],
    correct: 3,
    level: 7
  },
  {
    question: "Hangi renk gökkuşağında bulunmaz?",
    options: ["Kırmızı", "Mor", "Siyah", "Yeşil"],
    correct: 2,
    level: 4
  },
  {
    question: "Hangi oyun kart oyunudur?",
    options: ["Satranç", "Poker", "Go", "Tavla"],
    correct: 1,
    level: 5
  },
  {
    question: "Hangi ay 30 gün çekmez?",
    options: ["Mart", "Nisan", "Şubat", "Haziran"],
    correct: 2,
    level: 3
  },
  {
    question: "Dünyanın en derin okyanusu hangisidir?",
    options: ["Atlas", "Hint", "Pasifik", "Arktik"],
    correct: 2,
    level: 10
  },
  {
    question: "Bir düzine kaç birimdir?",
    options: ["10", "12", "15", "20"],
    correct: 1,
    level: 1
  }
];

const prizes = [
  "500 TL",
  "1.000 TL",
  "2.000 TL",
  "5.000 TL",
  "10.000 TL",
  "20.000 TL",
  "50.000 TL",
  "100.000 TL",
  "250.000 TL",
  "500.000 TL",
  "1.000.000 TL"
];

export { questions, prizes };
