---
title: "Data Structures"
collection: teaching
type: "Undergraduate"
permalink: /teaching/data-structures
venue: "Giresun University, Computer Engineering"
date: 2026-07-14
location: "Giresun, Turkey"
---

![data structure](/images/teaching/teaching-data-structures.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} 
Data structures provide systematic ways to organize, store, and access data. Choosing an appropriate structure directly affects the efficiency of operations such as searching, insertion, deletion, and traversal. This course examines algorithm analysis, arrays, recursion, linked lists, lists, stacks, queues, trees, search trees, priority queues and heaps, hash tables, sets and disjoint sets, and graphs, with an emphasis on their implementations, complexity, and practical applications.

---

## Başlangıç Kaynakları

* [Veri Yapılarında Önemli İsimler (HTML)](../files/data_structures/Data_Structures_Important_People.html)
* [Veri Yapıları İçin Ön Bilgiler (HTML)](../files/data_structures/Data_Structures_Prerequisites.html)
* [Terim Sözlüğü (HTML)](../files/data_structures/sozluk.html)

---

## Kısım I: Temeller

### Bölüm 1: Giriş

Veri yapıları, verinin bellekte nasıl düzenleneceğini ve ona nasıl erişileceğini belirler. Bu bölümde verinin sayısal ortamda nasıl temsil edildiği, Java'daki ilkel ve referans tipler, referans kopyalama ve jenerikler ele alınır. Soyut veri tipi (hangi işlemlerin sunulduğu) ile veri yapısı (bu işlemlerin nasıl gerçeklendiği) arasındaki ayrım bir yığın örneğiyle gösterilir. Bölüm, veri yapısı seçimi ve dersteki temel yapıların kısa bir karşılaştırma tablosuyla kapanır.

- [🖼️Sunum-Giriş (HTML)](../files/data_structures/slides/Bolum_01_Giris.html)
- [📄Sunum-Giriş (PDF)](../files/data_structures/pdf/Bolum_01_Giris.pdf)
- [📖Ders Notu - Giriş (HTML)](../files/data_structures/notlar/Bolum_01_Giris_Ders_Notu.html)
- [📝Çalışma Soruları - Giriş (HTML)](../files/data_structures/slides/Bolum_01_Giris_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders01/src)

---

### Bölüm 2: Algoritma Analizi

Algoritma analizi, çözümleri uygulamadan önce karşılaştırmayı sağlar. Deneysel ölçüm ve katlama deneyi çalışma süresinin pratikte nasıl büyüdüğünü gösterir; ilkel işlemleri saymak ise makineden bağımsız bir ölçü verir. Büyük O, Büyük Omega ve Büyük Teta üst, alt ve sıkı sınırları anlatır; en iyi, ortalama ve en kötü durum ayrı ayrı incelenir. Döngü kalıpları, doğrusal ve ikili arama ile önek ortalamaları kodun yapısının karmaşıklığı nasıl belirlediğini gösterir. Alan karmaşıklığı, doğruluk ve sağlamlık da bu bölümdedir.

- [🖼️Sunum-Algoritma Analizi (HTML)](../files/data_structures/slides/Bolum_02_Algoritma_Analizi.html)
- [📄Sunum-Algoritma Analizi (PDF)](../files/data_structures/pdf/Bolum_02_Algoritma_Analizi.pdf)
- [📖Ders Notu - Algoritma Analizi (HTML)](../files/data_structures/notlar/Bolum_02_Algoritma_Analizi_Ders_Notu.html)
- [📝Çalışma Soruları - Algoritma Analizi (HTML)](../files/data_structures/slides/Bolum_02_Algoritma_Analizi_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders01/src)

---

### Bölüm 3: Diziler

Dizi, öğeleri bellekte bitişik yerleşen en temel veri yapısıdır; her öğeye indisiyle sabit sürede erişilir. Java'da dizi tanımlama, kopyalama, java.util.Arrays ve çok boyutlu diziler; ortalama, ortanca, mod ve tersine çevirme gibi temel dizi algoritmaları; matris işlemleri ve küçük bir XOX oyunu bu bölümde yer alır. Erişimin O(1), araya ekleme ve silmenin ise öğe kaydırma yüzünden O(n) olduğu gösterilir; seçimli ve eklemeli sıralama da dizi üzerinde incelenir.

- [🖼️Sunum-Diziler (HTML)](../files/data_structures/slides/Bolum_03_Diziler.html)
- [📄Sunum-Diziler (PDF)](../files/data_structures/pdf/Bolum_03_Diziler.pdf)
- [📖Ders Notu - Diziler (HTML)](../files/data_structures/notlar/Bolum_03_Diziler_Ders_Notu.html)
- [📝Çalışma Soruları - Diziler (HTML)](../files/data_structures/slides/Bolum_03_Diziler_Calisma_Sorulari.html)
- [🕹️Dizi Simülatörü (HTML)](../files/data_structures/slides/Bolum_03_Arrays.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders02/src)

---

### Bölüm 4: Özyineleme

Özyineleme, bir problemi taban durumuna ulaşana kadar aynı problemin daha küçük örneklerine indirger. Her özyinelemeli çağrı çağrı yığınında kendi çerçevesini alır; bir özyinelemeli metodu izlemek bu çerçevelerin eklenip çıkarılmasını izlemektir. Doğrusal özyineleme (toplam, tersine çevirme, hızlı üs alma), ikili özyineleme (Fibonacci, ikili arama), Hanoi Kuleleri ve geri izleme örnekleri (alt kümeler, permütasyonlar) adım adım incelenir. Yineleme bağıntıları özyinelemeli algoritmaların zaman ve alan maliyetini verir; kuyruk özyinelemesi ve döngüye çevirme ile bölüm tamamlanır.

- [🖼️Sunum-Özyineleme (HTML)](../files/data_structures/slides/Bolum_04_Ozyineleme.html)
- [📄Sunum-Özyineleme (PDF)](../files/data_structures/pdf/Bolum_04_Ozyineleme.pdf)
- [📖Ders Notu - Özyineleme (HTML)](../files/data_structures/notlar/Bolum_04_Ozyineleme_Ders_Notu.html)
- [📝Çalışma Soruları - Özyineleme (HTML)](../files/data_structures/slides/Bolum_04_Ozyineleme_Calisma_Sorulari.html)
- [🕹️Hanoi Kuleleri Simülatörü (HTML)](../files/data_structures/slides/Bolum_04_Tower_of_Hanoi.html)

---

## Kısım II: Doğrusal Yapılar

### Bölüm 5: Bağlı Listeler

Bağlı liste, her biri veri ve bir sonraki düğüme referans taşıyan düğümlerden oluşur. Bitişik bellek gerektirmediği için başa ekleme ve silme sabit sürede yapılır; buna karşılık rastgele erişim yoktur ve bir öğeye ulaşmak için baştan gezinmek gerekir. Tek yönlü listede gezinme, ekleme, silme, tersine çevirme, tekrarları kaldırma ve sıralı listeleri birleştirme; çift yönlü listede bekçi düğümler; dairesel listede döngü tespiti ve döndürme bu bölümün konularıdır.

- [🖼️Sunum-Bağlı Liste (HTML)](../files/data_structures/slides/Bolum_05_Bagli_Liste.html)
- [📄Sunum-Bağlı Liste (PDF)](../files/data_structures/pdf/Bolum_05_Bagli_Liste.pdf)
- [📖Ders Notu - Bağlı Liste (HTML)](../files/data_structures/notlar/Bolum_05_Bagli_Liste_Ders_Notu.html)
- [📝Çalışma Soruları - Bağlı Liste (HTML)](../files/data_structures/slides/Bolum_05_Bagli_Liste_Calisma_Sorulari.html)
- [🕹️Bağlı Liste Simülatörü (HTML)](../files/data_structures/slides/Bolum_05_Linked_List.html)
- [🕹️Çift Yönlü Bağlı Liste Simülatörü (HTML)](../files/data_structures/slides/Bolum_05_Doubly_Linked_List.html)
- [🕹️Dairesel Bağlı Liste Simülatörü (HTML)](../files/data_structures/slides/Bolum_05_Circular_Linked_List.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders03/src)

---

### Bölüm 6: Liste ADT ve Java Koleksiyonları

Liste, öğelerin sıralı bir dizisini temsil eden soyut veri tipidir; büyüyüp küçülebilir ve ekleme, silme, erişim ve gezinme işlemlerini destekler. Java'nın koleksiyon hiyerarşisi (Iterable, Collection, List), Iterator ve ListIterator ile gezinme ve gezinirken güvenli silme bu bölümde ele alınır. ArrayList'in dinamik dizi olarak büyümesi ve amortize analizi, LinkedList ile karşılaştırması, konumsal liste ADT'si, Vector, CopyOnWriteArrayList ve Arrays.asList de incelenir.

- [🖼️Sunum-Liste (HTML)](../files/data_structures/slides/Bolum_06_Liste.html)
- [📄Sunum-Liste (PDF)](../files/data_structures/pdf/Bolum_06_Liste.pdf)
- [📖Ders Notu - Liste (HTML)](../files/data_structures/notlar/Bolum_06_Liste_Ders_Notu.html)
- [📝Çalışma Soruları - Liste (HTML)](../files/data_structures/slides/Bolum_06_Liste_Calisma_Sorulari.html)
- [🕹️Liste ADT Simülatörü (HTML)](../files/data_structures/slides/Bolum_06_List_ADT.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders06/src)

---

### Bölüm 7: Yığınlar

Yığın, son giren ilk çıkar (LIFO) ilkesiyle çalışır: ekleme (push) ve çıkarma (pop) yalnızca üstten yapılır. Yığın ADT'si, dizi ve bağlı liste ile gerçeklenmesi ve işlemlerin maliyeti ele alınır. Geri/ileri gezinme, çağrı yığını, parantez kontrolü, sonraki büyük öğe, en küçük öğeyi tutan yığın, Hanoi Kulelerinin yığınla çözümü ve stock span problemi yığının uygulamalarıdır. Infix, prefix ve postfix gösterimleri arasında dönüşüm ve postfix ifadelerin değerlendirilmesi bölümü tamamlar.

- [🖼️Sunum-Yığın (HTML)](../files/data_structures/slides/Bolum_07_Yigin.html)
- [📄Sunum-Yığın (PDF)](../files/data_structures/pdf/Bolum_07_Yigin.pdf)
- [📖Ders Notu - Yığın (HTML)](../files/data_structures/notlar/Bolum_07_Yigin_Ders_Notu.html)
- [📝Çalışma Soruları - Yığın (HTML)](../files/data_structures/slides/Bolum_07_Yigin_Calisma_Sorulari.html)
- [🕹️Yığın Simülatörü (HTML)](../files/data_structures/slides/Bolum_07_Stack.html)
- [🕹️Stock Span Simülatörü (HTML)](../files/data_structures/slides/Bolum_07_Stock_Span.html)
- [🕹️Infix → Prefix Dönüştürücü (HTML)](../files/data_structures/slides/Bolum_07_Infix_to_Prefix.html)
- [🕹️Infix → Postfix Dönüştürücü (HTML)](../files/data_structures/slides/Bolum_07_Infix_to_Postfix.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders04/src)

---

### Bölüm 8: Kuyruklar ve Deque

Kuyruk, ilk giren ilk çıkar (FIFO) ilkesiyle çalışır: öğeler bir uçtan eklenir (enqueue), öbür uçtan çıkarılır (dequeue). Basit dizi kuyruğunun sorunu, dairesel kuyruk ve indis formülleri, dolu/boş ayrımı, kuyruğun büyütülmesi ve bağlı liste ile gerçekleme bu bölümdedir. İki uçtan da ekleme ve çıkarmaya izin veren deque, kayan pencere maksimumu gibi problemlerde kullanılır. Round robin çizelgeleme, Josephus problemi, ikilik sayıların üretilmesi ve iki yığınla kuyruk uygulama örnekleridir.

- [🖼️Sunum-Kuyruk (HTML)](../files/data_structures/slides/Bolum_08_Kuyruk.html)
- [📄Sunum-Kuyruk (PDF)](../files/data_structures/pdf/Bolum_08_Kuyruk.pdf)
- [📖Ders Notu - Kuyruk (HTML)](../files/data_structures/notlar/Bolum_08_Kuyruk_Ders_Notu.html)
- [📝Çalışma Soruları - Kuyruk (HTML)](../files/data_structures/slides/Bolum_08_Kuyruk_Calisma_Sorulari.html)
- [🕹️Kuyruk Simülatörü (HTML)](../files/data_structures/slides/Bolum_08_Queue.html)
- [🕹️Deque Simülatörü (HTML)](../files/data_structures/slides/Bolum_08_Deque.html)
- [🕹️Dairesel Kuyruk Simülatörü (HTML)](../files/data_structures/slides/Bolum_08_Circular_Queue.html)
- [🕹️Round Robin Çizelgeleyici (HTML)](../files/data_structures/slides/Bolum_08_Scheduler.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders05/src)

---

## Kısım III: Ağaçlar

### Bölüm 9: Ağaçlar

Ağaç, düğümlerin kenarlarla bağlandığı hiyerarşik bir yapıdır: bir kökten başlar, her düğümün tek ebeveyni ve birden çok çocuğu olabilir. Dosya sistemleri, kurum şemaları ve HTML belgeleri ağaçla temsil edilir. Derece, derinlik ve yükseklik gibi temel kavramlar, ikili ağaç türleri (dolu, tam, mükemmel) ve özellikleri, dizi ve bağlı gösterimler incelenir. Kök başta, kök ortada, kök sonda ve seviye sırası gezinmeleri hem özyinelemeli hem yığın ve kuyrukla gerçeklenir; ifade ağaçları ve özyinelemeli ağaç fonksiyonları (boyut, yükseklik, yaprak sayısı) uygulamalardır.

- [🖼️Sunum-Ağaçlar (HTML)](../files/data_structures/slides/Bolum_09_Agac.html)
- [📄Sunum-Ağaçlar (PDF)](../files/data_structures/pdf/Bolum_09_Agac.pdf)
- [📖Ders Notu - Ağaçlar (HTML)](../files/data_structures/notlar/Bolum_09_Agac_Ders_Notu.html)
- [📝Çalışma Soruları - Ağaçlar (HTML)](../files/data_structures/slides/Bolum_09_Agac_Calisma_Sorulari.html)
- [🕹️Genel Ağaç Simülatörü (HTML)](../files/data_structures/slides/Bolum_09_General_Tree.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders07/src)

---

### Bölüm 10: Arama Ağaçları

İkili arama ağacında (BST) her düğümün sol alt ağacındaki anahtarlar düğümünkinden küçük, sağ alt ağacındakiler büyüktür. Arama, ekleme ve silme O(h) sürer; h ağacın yüksekliğidir. Dengeli ağaçta bu O(log n) olur, en kötü durumda O(n)'ye düşer. BST'de arama, ekleme, ardıl ve öncül, üç durumlu silme ve aralık sorguları incelendikten sonra yüksekliği sınırlı tutan AVL, kırmızı-siyah ve splay ağaçları ele alınır. Diskteki veriler için B-ağacı ve B+ ağacı gibi çok yollu arama ağaçları düğüm başına çok sayıda anahtar tutarak ağacı sığ tutar.

- [🖼️Sunum-Arama Ağaçları (HTML)](../files/data_structures/slides/Bolum_10_Arama_Agaclari.html)
- [📄Sunum-Arama Ağaçları (PDF)](../files/data_structures/pdf/Bolum_10_Arama_Agaclari.pdf)
- [📖Ders Notu - Arama Ağaçları (HTML)](../files/data_structures/notlar/Bolum_10_Arama_Agaclari_Ders_Notu.html)
- [📝Çalışma Soruları - Arama Ağaçları (HTML)](../files/data_structures/slides/Bolum_10_Arama_Agaclari_Calisma_Sorulari.html)
- [🕹️İkili Arama Ağacı Simülatörü (HTML)](../files/data_structures/slides/Bolum_10_BST.html)
- [🕹️İkili Arama Ağacı Gezinme Simülatörü (HTML)](../files/data_structures/slides/Bolum_10_Tree.html)
- [🕹️Kırmızı-Siyah Ağaç Simülatörü (HTML)](../files/data_structures/slides/Bolum_10_Red_Black.html)
- [🕹️AVL Ağacı Simülatörü (HTML)](../files/data_structures/slides/Bolum_10_AVL.html)
- [🕹️Splay Ağacı Simülatörü (HTML)](../files/data_structures/slides/Bolum_10_Splay.html)
- [🕹️B-Ağacı Simülatörü (HTML)](../files/data_structures/slides/Bolum_10_BTree.html)
- [🕹️B+ Ağacı Simülatörü (HTML)](../files/data_structures/slides/Bolum_10_BPlusTree.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders10/src)

---

### Bölüm 11: Öncelikli Kuyruklar ve Heap

Öncelikli kuyruk, her seferinde en yüksek (ya da en düşük) öncelikli öğeyi çıkaran soyut veri tipidir. Sırasız ve sıralı listeyle gerçeklemenin maliyetleri karşılaştırıldıktan sonra ikili heap incelenir: max-heap'te her ebeveyn çocuklarından büyük ya da onlara eşittir. Dizi gösterimi, yukarı ve aşağı yönlü düzeltmeyle (up-heap, down-heap) ekleme ve silme, uyarlanabilir öncelikli kuyruk, O(n) sürede heap oluşturma ve heap sort bu bölümdedir. Java'nın PriorityQueue sınıfı, k'ıncı en büyük öğe ve öncelikli çizelgeleyici uygulama örnekleridir.

- [🖼️Sunum-Öncelikli Kuyruk (HTML)](../files/data_structures/slides/Bolum_11_Oncelikli_Kuyruk.html)
- [📄Sunum-Öncelikli Kuyruk (PDF)](../files/data_structures/pdf/Bolum_11_Oncelikli_Kuyruk.pdf)
- [📖Ders Notu - Öncelikli Kuyruk (HTML)](../files/data_structures/notlar/Bolum_11_Oncelikli_Kuyruk_Ders_Notu.html)
- [📝Çalışma Soruları - Öncelikli Kuyruk (HTML)](../files/data_structures/slides/Bolum_11_Oncelikli_Kuyruk_Calisma_Sorulari.html)
- [🕹️İkili Heap Simülatörü (HTML)](../files/data_structures/slides/Bolum_11_Heap.html)
- [🕹️Öncelikli Kuyruk Simülatörü (HTML)](../files/data_structures/slides/Bolum_11_Priority_Queue.html)
- [🕹️Öncelikli Çizelgeleyici Simülatörü (HTML)](../files/data_structures/slides/Bolum_11_Priority_Scheduler.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders08/src)

---

## Kısım IV: Eşlemeler, Kümeler ve Çizgeler

### Bölüm 12: Eşlemeler ve Hash Tabloları

Eşleme (map), anahtarları değerlere bağlayan soyut veri tipidir. Hash tablosu, bir hash fonksiyonuyla anahtardan bir kova indisi hesaplar ve iyi dağılan anahtarlarla ekleme, silme ve aramayı ortalamada O(1) sürede yapar; en kötü durumda bu O(n)'ye çıkabilir. İyi bir hash fonksiyonunun özellikleri, Java'daki equals/hashCode sözleşmesi, çakışmaları çözmek için ayrı zincirleme ve açık adresleme (doğrusal yoklama, karesel yoklama, çift hash), yük faktörü ve yeniden boyutlandırma bu bölümün konularıdır. Java HashMap'in iç yapısı ve iki toplam gibi uygulamalarla bölüm tamamlanır.

- [🖼️Sunum-Hash Tabloları (HTML)](../files/data_structures/slides/Bolum_12_Hash_Tablosu.html)
- [📄Sunum-Hash Tabloları (PDF)](../files/data_structures/pdf/Bolum_12_Hash_Tablosu.pdf)
- [📖Ders Notu - Hash Tabloları (HTML)](../files/data_structures/notlar/Bolum_12_Hash_Tablosu_Ders_Notu.html)
- [📝Çalışma Soruları - Hash Tabloları (HTML)](../files/data_structures/slides/Bolum_12_Hash_Tablosu_Calisma_Sorulari.html)
- [🕹️Hash Tablosu Simülatörü (HTML)](../files/data_structures/slides/Bolum_12_Hash_Table.html)
- [🕹️Eşleme Simülatörü (HTML)](../files/data_structures/slides/Bolum_12_Map.html)
- [🕹️Açık Adresleme Simülatörü (HTML)](../files/data_structures/slides/Bolum_12_Open_Addressing.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders09/src)

---

### Bölüm 13: Kümeler ve Ayrık Kümeler

Küme, birbirinden farklı öğelerin sırasız topluluğudur; tekrar eden öğe içermez. Birleşim, kesişim ve fark işlemleri, Java'nın Set arayüzü ve hash tabanlı, ağaç tabanlı ve bit vektörü ile gerçeklemeler karşılaştırılır; çoklu küme ve çoklu eşleme de ele alınır. Ayrık kümeler (union-find) yapısı, boyuta ya da rütbeye göre birleştirme ve yol kısaltmayla bağlantı sorgularını neredeyse sabit amortize sürede yanıtlar; bağlantılı bileşen sayma bunun bir uygulamasıdır.

- [🖼️Sunum-Kümeler (HTML)](../files/data_structures/slides/Bolum_13_Kumeler.html)
- [📄Sunum-Kümeler (PDF)](../files/data_structures/pdf/Bolum_13_Kumeler.pdf)
- [📖Ders Notu - Kümeler (HTML)](../files/data_structures/notlar/Bolum_13_Kumeler_Ders_Notu.html)
- [📝Çalışma Soruları - Kümeler (HTML)](../files/data_structures/slides/Bolum_13_Kumeler_Calisma_Sorulari.html)
- [🕹️Küme ADT Simülatörü (HTML)](../files/data_structures/slides/Bolum_13_Set_ADT.html)
- [🕹️Ayrık Kümeler Simülatörü (HTML)](../files/data_structures/slides/Bolum_13_Disjoint_Set_Union.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders12/src)

---

### Bölüm 14: Çizgeler

Çizge, nesneler arasındaki ilişkileri düğümler ve kenarlarla temsil eder. Ağaçlardan farklı olarak döngü ve iki düğüm arasında birden çok yol içerebilir; yönlü ya da yönsüz, ağırlıklı ya da ağırlıksız olabilir. Sosyal ağlar, yol haritaları ve bilgisayar ağları çizgeyle modellenir. Komşuluk matrisi ve komşuluk listesi gösterimleri, genişlik öncelikli (BFS) ve derinlik öncelikli (DFS) arama, bağlantılı bileşenler, iki parçalı çizgeler, topolojik sıralama ve yönlü döngü tespiti incelenir. Ağırlıksız en kısa yol ve Dijkstra algoritmasından sonra minimum kapsayan ağaç problemi ayrık kümelerle Kruskal, öncelikli kuyrukla Prim algoritması üzerinden çözülür.

- [🖼️Sunum-Çizge (HTML)](../files/data_structures/slides/Bolum_14_Cizge.html)
- [📄Sunum-Çizge (PDF)](../files/data_structures/pdf/Bolum_14_Cizge.pdf)
- [📖Ders Notu - Çizge (HTML)](../files/data_structures/notlar/Bolum_14_Cizge_Ders_Notu.html)
- [📝Çalışma Soruları - Çizge (HTML)](../files/data_structures/slides/Bolum_14_Cizge_Calisma_Sorulari.html)
- [🕹️Yönsüz Çizge Simülatörü (HTML)](../files/data_structures/slides/Bolum_14_Graph.html)
- [🕹️Yönlü Çizge Simülatörü (HTML)](../files/data_structures/slides/Bolum_14_Directed_Graph.html)
- [🕹️Dijkstra Algoritması Simülatörü (HTML)](../files/data_structures/slides/Bolum_14_Dijkstra.html)
- [🕹️Ders Ön Koşul Planlayıcısı (HTML)](../files/data_structures/slides/Bolum_14_Course_Planner.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders11/src)
