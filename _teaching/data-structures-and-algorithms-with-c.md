---
title: "Data Structures and Algorithms with C"
collection: teaching
type: "Undergraduate"
permalink: /teaching/data-structures-and-algorithms-with-c
venue: "Giresun University, Computer Engineering"
date: 2025-09-28
location: "Giresun, Turkey"
---

![data structures and algorithms with c](/images/teaching/teaching-data-structures.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} 
This course studies data structures and algorithms through their memory representation and their implementation in C. Each topic is developed from the abstract data type to a working C99/C11 implementation with pointers, dynamic memory, and structures, together with its complexity analysis. The course covers arrays and structures, linked lists, stacks, queues, lists, trees, priority queues and heaps, hash tables, search trees, graphs, sets and union-find, as well as recursion, backtracking, spanning trees, shortest paths, and sorting algorithms.

---

## Başlangıç Kaynakları

* [C ile Veri Yapılarında Önemli İsimler (HTML)](../files/dsa_c/DSA_C_Important_People.html)
* [C ile Veri Yapıları İçin Ön Bilgiler (HTML)](../files/dsa_c/DSA_C_Prerequisites.html)
* [Terim Sözlüğü (HTML)](../files/dsa_c/sozluk.html)

---

## Kısım I: Temeller

### Bölüm 1: Giriş ve Algoritma Analizi

Bir yazılımın gereksinimlerden doğrulamaya uzanan yaşam döngüsü, algoritma kavramı ve soyut veri tiplerinin C'de başlık dosyalarıyla nasıl ifade edildiği ele alınır. Seçimli sıralama, C kodu ve SWAP makrosuyla birlikte ilk örnek olarak işlenir. Programların başarımı alan ve zaman karmaşıklığı üzerinden incelenir; adım sayma, en iyi, ortalama ve en kötü durum ile O, Ω ve Θ gösterimleri örneklerle açıklanır. Sihirli kare problemi ve sıralama ile doğrusal aramanın çalışma süresinin ölçülmesi, kuramsal analizi uygulamayla buluşturur.

- [🖼️Sunum-Giriş ve Algoritma Analizi (HTML)](../files/dsa_c/slides/Bolum_01_Giris_Algoritma_Analizi.html)

---

### Bölüm 2: Diziler ve Yapılar

Dizi soyut veri tipi ve C'de dizilerle işaretçiler arasındaki yakın ilişki konunun başlangıç noktasıdır. malloc ile dinamik diziler ve büyüyen dizilerin amortize maliyeti, iki ve daha çok boyutlu dizilerde satır ve sütun öncelikli adres hesabı işlenir. Alt üçgen ve kuşak matrislerin tek boyutlu dizilerde yer kazandıran biçimde saklanması gösterilir. Konu struct, union ve hizalama, karakter dizisi olarak dizgeler ve matris çarpımıyla tamamlanır.

- [🖼️Sunum-Diziler ve Yapılar (HTML)](../files/dsa_c/slides/Bolum_02_Diziler_ve_Yapilar.html)

---

### Bölüm 3: Özyineleme, İkili Arama ve Geri İzleme

Özyinelemeli algoritmalar yığın çerçeveleri üzerinden izlenir; özyineleme ile döngü arasındaki ilişki ve kuyruk özyinelemesi açıklanır. İkili aramanın döngüsel ve özyinelemeli sürümleri ile logaritmik karmaşıklığı adım adım gösterilir. Hanoi kuleleri ve permütasyon üretimi özyinelemeli düşünmenin klasik örnekleri olarak çözümlenir. Geri izleme ise satisfiability, n-vezir, alt küme üretimi ve Warnsdorff kuralıyla at gezisi problemleri üzerinde işlenir.

- [🖼️Sunum-Özyineleme, İkili Arama ve Geri İzleme (HTML)](../files/dsa_c/slides/Bolum_03_Ozyineleme_Ikili_Arama_ve_Geri_Izleme.html)

---

## Kısım II: Doğrusal Yapılar

### Bölüm 4: Bağlı Listeler

Dizinin yetersiz kaldığı durumlardan yola çıkılarak düğümlerden oluşan bağlı liste malloc ve free ile kurulur. Tek yönlü bağlı listede gezinme, başa, sona, araya ve sıralı ekleme, silme ve arama yordamları adım adım izlenir. Listeyi ters çevirme, iki listeyi birleştirme, orta düğümü bulma ve Floyd'un döngü tespiti algoritması klasik yordamlar arasında yer alır. Dairesel ve çift yönlü bağlı listeler, başlık düğümü ve serbest düğümleri yeniden kullanan kullanılabilir düğüm listesi de incelenir.

- [🖼️Sunum-Bağlı Listeler (HTML)](../files/dsa_c/slides/Bolum_04_Bagli_Listeler.html)

---

### Bölüm 5: Polinomlar ve Seyrek Matrisler

Polinom soyut veri tipi, katsayı dizisi ve terim dizisi gösterimleriyle tanıtılır; padd yordamıyla polinom toplama ve analizi yapılır. Polinomların bağlı listeyle gösterimi ve bu gösterimle polinom çarpımı ele alınır. Seyrek matrisler üçlü tablo biçiminde saklanır; transpose ve hızlı fast_transpose yordamları ile seyrek matris çarpımı maliyetleriyle birlikte işlenir. CSR gösterimi ve bağlı seyrek matris de seçenek olarak tanıtılır.

- [🖼️Sunum-Polinomlar ve Seyrek Matrisler (HTML)](../files/dsa_c/slides/Bolum_05_Polinomlar_ve_Seyrek_Matrisler.html)

---

### Bölüm 6: Yığınlar

Son giren ilk çıkar (LIFO) ilkesiyle çalışan yığın, soyut veri tipi ve kullanım alanlarıyla tanıtılır. Dizi üzerinde push ve pop işlemleri, taşma ve alt taşma durumları ile küresel dizi yerine struct kullanan daha düzenli bir gerçekleme C koduyla gösterilir. Bağlı liste ile yığın gerçeklemesi dizi tabanlı sürümle karşılaştırılır. Fonksiyon çağrılarının çağrı yığınındaki karşılığı, tek dizide birden çok yığın tutma yöntemi ve hangi çıkış sıralarının mümkün olduğu da incelenir.

- [🖼️Sunum-Yığınlar (HTML)](../files/dsa_c/slides/Bolum_06_Yiginlar.html)

---

### Bölüm 7: Kuyruklar

İlk giren ilk çıkar (FIFO) ilkesiyle çalışan kuyruk, soyut veri tipi ve kullanım alanlarıyla ele alınır. Dizi ile doğrusal kuyruğun kayma sorunu, modüler aritmetiğe dayanan dairesel kuyrukla çözülür; kuyruğun dolu ya da boş olduğunu ayırt etmenin yolları karşılaştırılır. Bağlı kuyruk gerçeklemesi ve dizi tabanlı sürümle farkları işlenir. Deque, çoklu kuyruk, iş zamanlama benzetimi ve iki yığınla kuyruk kurma konuyu tamamlar.

- [🖼️Sunum-Kuyruklar (HTML)](../files/dsa_c/slides/Bolum_07_Kuyruklar.html)

---

### Bölüm 8: Yığın ve Kuyruk Uygulamaları

Yığın ve kuyruğun gerçek problemlerdeki kullanımı iki büyük uygulama üzerinden incelenir. Labirent problemi hareket tablosu ve yığın yardımıyla geri izlenerek çözülür ve karmaşıklığı değerlendirilir. İşlem önceliği ve birleşme kuralları ışığında infix, postfix ve prefix gösterimler tanıtılır; postfix ifadelerin hesaplanması ve isp ile icp öncelikleri kullanılarak infix ifadelerin postfix biçime çevrilmesi adım adım gösterilir. Prefix hesaplama, parantez denetimi ve diğer uygulamalar da ele alınır.

- [🖼️Sunum-Yığın ve Kuyruk Uygulamaları (HTML)](../files/dsa_c/slides/Bolum_08_Yigin_ve_Kuyruk_Uygulamalari.html)

---

### Bölüm 9: Liste ADT ve Genelleştirilmiş Listeler

Liste soyut veri tipinin sözleşmesi ile dizi ve bağlı liste gerçeklemeleri karşılaştırılır. Öğeleri hem atom hem de alt liste olabilen genelleştirilmiş listeler, çok değişkenli polinom örneği ve bellek görünümüyle tanıtılır. Kopyalama, eşitlik, gezinme, derinlik ve ters çevirme yordamları özyinelemeli olarak yazılır ve adım adım izlenir. Ağacın listeyle kurulması, paylaşılan listeler, referans sayma ve çöp toplama fikri de incelenir.

- [🖼️Sunum-Liste ADT ve Genelleştirilmiş Listeler (HTML)](../files/dsa_c/slides/Bolum_09_Liste_ADT_ve_Genellestirilmis_Listeler.html)

---

## Kısım III: Ağaçlar

### Bölüm 10: Ağaçlar

Ağaç terminolojisi ve derinlik tanımlarından sonra ikili ağaç, tam ve tam dolu ağaç kavramları ile düğüm sayısı ilişkileri ele alınır. İkili ağacın dizi ve bağlı gösterimleri karşılaştırılır; genel ağacın ikili ağaca dönüştürülmesi gösterilir. Kök önde, kök ortada ve kök sonda gezinmeler özyinelemeli yordamlarla ve ifade ağacı örneğiyle işlenir, ardından yığın kullanan iteratif sürümlere geçilir. Kuyrukla seviye seviye gezinme, ağaç kopyalama, eşitlik denetimi ve çocukların yer değiştirmesi de incelenir.

- [🖼️Sunum-Ağaçlar (HTML)](../files/dsa_c/slides/Bolum_10_Agaclar.html)

---

### Bölüm 11: Arama Ağaçları

İkili arama ağacının tanımı ve ekleme sırasının ağacın biçimine etkisi örneklerle gösterilir. Ekleme, döngüsel ve özyinelemeli arama ile derinlik hesaplama yordamları C koduyla yazılır; özyinelemeli aramadaki tuzaklar ve ek parametre kullanımı tartışılır. Silme işleminin durumları ve farklı silme yöntemleri adım adım işlenir. Dengesizliğin maliyeti AVL ağaçları, tek ve çift döndürmelerle giderilir; kırmızı-siyah ağaçlar ve B-ağaçları da kısaca tanıtılır.

- [🖼️Sunum-Arama Ağaçları (HTML)](../files/dsa_c/slides/Bolum_11_Arama_Agaclari.html)

---

### Bölüm 12: Kılavuzlu İkili Ağaçlar

n düğümlü bir ikili ağaçta boş kalan n+1 NULL işaretçinin kılavuz olarak değerlendirilmesi fikri Perlis ve Thornton'a dayanır. Kılavuzların kurma kuralları, kılavuz bayrakları ve başlık düğümü örneklerle açıklanır. Kök ortada ardılın bulunması ve yığın kullanmadan gezinme adım adım izlenir; Morris gezinmesi de tanıtılır. Kılavuzlu ağaca sağa ve sola düğüm ekleme durumları ayrıntılı olarak işlenir.

- [🖼️Sunum-Kılavuzlu İkili Ağaçlar (HTML)](../files/dsa_c/slides/Bolum_12_Kilavuzlu_Ikili_Agaclar.html)

---

### Bölüm 13: Öncelikli Kuyruk ve Heap

Öncelikli kuyruk kavramı, gereksinimi ve soyut veri tipi tanıtılır. Tam ikili ağacın dizide saklanmasına dayanan maksimum ve minimum heap yapısı, ikili arama ağacından farklarıyla birlikte açıklanır. Yukarı kaydırmayla ekleme ve aşağı kaydırmayla silme yordamları C koduyla yazılır ve adım adım izlenir; heap diğer yapılarla sayısal örnekler üzerinden karşılaştırılır. Aşağıdan yukarı heap kurmanın neden O(n) sürdüğü, d-ary heap ve uygulamalar da ele alınır.

- [🖼️Sunum-Öncelikli Kuyruk ve Heap (HTML)](../files/dsa_c/slides/Bolum_13_Oncelikli_Kuyruk_ve_Heap.html)

---

## Kısım IV: Hash, Çizgeler ve Kümeler

### Bölüm 14: Hash Tabloları

Doğrudan adreslemeden yola çıkılarak hash fikri ve sözlük soyut veri tipi tanıtılır. Bölme, çarpma, katlama ve orta-kare yöntemleri ile dizgiler için hash fonksiyonları incelenir. Çakışmaların çözümü için doğrusal ve karesel yoklama ile çift hash kullanan açık adresleme ve zincirleme C koduyla işlenir. Açık adreslemede silindi işaretiyle silme, yük faktörü ve yeniden boyutlandırma da ele alınır; iki yaklaşım karşılaştırılır.

- [🖼️Sunum-Hash Tabloları (HTML)](../files/dsa_c/slides/Bolum_14_Hash_Tablolari.html)

---

### Bölüm 15: Çizgeler

Königsberg köprüleri probleminden başlanarak çizge tanımı, komşuluk, yol, bağlantılılık ve derece kavramları açıklanır. Komşuluk matrisi, komşuluk listesi, sıralı dizi, ortogonal gösterim ve çok bağlı liste olmak üzere beş gerçekleme karşılaştırılır; ağırlıklı çizgelerin gösterimine de değinilir. Derinlik öncelikli (DFS) ve genişlik öncelikli (BFS) gezinme C koduyla yazılır ve adım adım izlenir. Bağlantılı bileşenlerin bulunması, döngü tespiti ve iki parçalı çizgeler de incelenir.

- [🖼️Sunum-Çizgeler (HTML)](../files/dsa_c/slides/Bolum_15_Cizgeler.html)

---

### Bölüm 16: Kümeler ve Union-Find

Ayrık kümeler ile birleşim ve küme bulma işlemleri, ata dizisine dayanan gerçeklemeyle tanıtılır. Basit yordamların kötü bir işlem dizisinde O(n²) maliyete ulaştığı gösterilir. Ağırlıklı kural ağacın derinliğini sınırlar, azaltma kuralı ise bulma sırasında yolu kısaltır; her iki iyileştirme de adım adım izlenir. Tarjan–van Leeuwen analizi, Ackermann fonksiyonu ve tersi ile bileşen sayma ve Kruskal algoritması gibi uygulamalar da ele alınır.

- [🖼️Sunum-Kümeler ve Union-Find (HTML)](../files/dsa_c/slides/Bolum_16_Kumeler_ve_Union_Find.html)

---

### Bölüm 17: Minimum Kapsayan Ağaçlar

Kapsayan ağaç kavramı, ağaç ve ağaç dışı kenarlar ile kapsayan ağaçların özellikleri üzerinden tanıtılır; eşbiçimlilik ve düzlemsellik konusuna da değinilir. Minimum maliyetli kapsayan ağaç problemi açgözlü yaklaşımla ele alınır. Kruskal algoritması kenarların sıralanması ve union-find ile, Prim algoritması ise ağacı tek düğümden büyüterek kodlanır ve adım adım izlenir; Prim'in heap ile gerçeklemesi de gösterilir. Sollin (Borůvka) algoritması, minimum kapsayan ağaç ile en kısa yol ağacı arasındaki fark ve Kruskal ile Prim'in karşılaştırılması konuyu tamamlar.

- [🖼️Sunum-Minimum Kapsayan Ağaçlar (HTML)](../files/dsa_c/slides/Bolum_17_Minimum_Kapsayan_Agaclar.html)

---

### Bölüm 18: En Kısa Yol ve Aktivite Ağları

Tek kaynaklı en kısa yol problemi kaba kuvvet analiziyle başlar ve açgözlü fikre dayanan Dijkstra algoritmasıyla çözülür; önceller dizisiyle yolun kendisi de bulunur. Negatif kenarlar için Bellman-Ford, tüm düğüm çiftleri için Floyd-Warshall algoritması adım adım işlenir. AoV ağlarında topolojik sıra, sayaçlı başlıklar kullanan bir yordamla bulunur. AoE ağlarında en erken ve en geç zamanlar, bolluklar ve kritik yol hesaplanır.

- [🖼️Sunum-En Kısa Yol ve Aktivite Ağları (HTML)](../files/dsa_c/slides/Bolum_18_En_Kisa_Yol_ve_Aktivite_Aglari.html)

---

## Kısım V: Sıralama

### Bölüm 19: Temel Sıralama Algoritmaları

Sıralama problemi, kararlılık ve yerinde sıralama kavramlarıyla birlikte ortak C makroları üzerinden tanıtılır. Seçimli, eklemeli ve kabarcık sıralaması adım adım izlenir ve analiz edilir; eklemeli sıralamanın ortalama durumu evrik sayısıyla hesaplanır. Doğrusal zamanlı sayarak sıralama, Shell sıralaması ve kova sıralaması da işlenir. Karar ağacı yardımıyla karşılaştırmaya dayalı sıralamanın alt sınırı kanıtlanır ve algoritmaların hangi durumda uygun olduğu tartışılır.

- [🖼️Sunum-Temel Sıralama Algoritmaları (HTML)](../files/dsa_c/slides/Bolum_19_Temel_Siralama_Algoritmalari.html)

---

### Bölüm 20: İleri Sıralama Algoritmaları

Hızlı sıralama bölümleme değişmezi üzerinden anlatılır; en kötü, en iyi ve ortalama durum analizleri yapılır. Özyinelemesiz sürüm, medyan-3 ve küçük alt diziler için eşik kullanan iyileştirilmiş hızlı sıralama ile C kitaplığındaki qsort ve hibrit sıralamalar ele alınır. Birleştirme sıralamasının dizi ve bağlı liste sürümleri, heap sıralaması ve çok anahtarlı verilerde basamağa göre sıralama adım adım izlenir ve analiz edilir. Algoritmaların hangi durumda tercih edileceği karşılaştırmalı olarak tartışılır.

- [🖼️Sunum-İleri Sıralama Algoritmaları (HTML)](../files/dsa_c/slides/Bolum_20_Ileri_Siralama_Algoritmalari.html)
