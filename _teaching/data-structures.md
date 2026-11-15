---
title: "Data Structures"
lang_toggle: true
collection: teaching
type: "Undergraduate"
permalink: /teaching/data-structures/
venue: "Giresun University, Computer Engineering"
date: 2026-07-14
location: "Giresun, Turkey"
---

![data structure](/images/teaching/teaching-data-structures.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} 
Data structures provide systematic ways to organize, store, and access data. Choosing an appropriate structure directly affects the efficiency of operations such as searching, insertion, deletion, and traversal. This course examines algorithm analysis, arrays, recursion, linked lists, lists, stacks, queues, trees, search trees, priority queues and heaps, hash tables, sets and disjoint sets, and graphs, with an emphasis on their implementations, complexity, and practical applications.

<div data-lt="tr" lang="tr" markdown="1">

---

## Ders Kitabı

[📕 Veri Yapıları (PDF, 19 MB)](https://sercankulcu.github.io/courses-pdfs/data_structures/Veri-Yapilari.pdf)

---

## Başlangıç Kaynakları

* [Veri Yapılarında Önemli İsimler (HTML)](/files/data_structures/Data_Structures_Important_People.html)
* [Veri Yapıları İçin Ön Bilgiler (HTML)](/files/data_structures/Data_Structures_Prerequisites.html)
* [Dersin Haritası (HTML)](/files/data_structures/ders_haritasi.html)
* [Terim Sözlüğü (HTML)](/files/data_structures/sozluk.html)

---

## Kısım I: Temeller

### Bölüm 1: Giriş

Veri yapıları, verinin bellekte nasıl düzenleneceğini ve ona nasıl erişileceğini belirler. Bu bölümde verinin sayısal ortamda nasıl temsil edildiği, Java'daki ilkel ve referans tipler, referans kopyalama ve jenerikler ele alınır. Soyut veri tipi (hangi işlemlerin sunulduğu) ile veri yapısı (bu işlemlerin nasıl gerçeklendiği) arasındaki ayrım bir yığın örneğiyle gösterilir. Bölüm, veri yapısı seçimi ve dersteki temel yapıların kısa bir karşılaştırma tablosuyla kapanır.

- [🖼️Sunum-Giriş (HTML)](/files/data_structures/slides/Bolum_01_Giris.html)
- [📄Sunum-Giriş (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_01_Giris.pdf)
- [📖Ders Notu - Giriş (HTML)](/files/data_structures/notlar/Bolum_01_Giris_Ders_Notu.html)
- [📝Çalışma Soruları - Giriş (HTML)](/files/data_structures/slides/Bolum_01_Giris_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum01/src)

---

### Bölüm 2: Algoritma Analizi

Algoritma analizi, çözümleri uygulamadan önce karşılaştırmayı sağlar. Deneysel ölçüm ve katlama deneyi çalışma süresinin pratikte nasıl büyüdüğünü gösterir; ilkel işlemleri saymak ise makineden bağımsız bir ölçü verir. Büyük O, Büyük Omega ve Büyük Teta üst, alt ve sıkı sınırları anlatır; en iyi, ortalama ve en kötü durum ayrı ayrı incelenir. Döngü kalıpları, doğrusal ve ikili arama ile önek ortalamaları kodun yapısının karmaşıklığı nasıl belirlediğini gösterir. Alan karmaşıklığı, doğruluk ve sağlamlık da bu bölümdedir.

- [🖼️Sunum-Algoritma Analizi (HTML)](/files/data_structures/slides/Bolum_02_Algoritma_Analizi.html)
- [📄Sunum-Algoritma Analizi (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_02_Algoritma_Analizi.pdf)
- [📖Ders Notu - Algoritma Analizi (HTML)](/files/data_structures/notlar/Bolum_02_Algoritma_Analizi_Ders_Notu.html)
- [📝Çalışma Soruları - Algoritma Analizi (HTML)](/files/data_structures/slides/Bolum_02_Algoritma_Analizi_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum02/src)

---

### Bölüm 3: Diziler

Dizi, öğeleri bellekte ardışık yerleşen en temel veri yapısıdır; her öğeye indisiyle sabit sürede erişilir. Java'da dizi tanımlama, kopyalama, java.util.Arrays ve çok boyutlu diziler; ortalama, ortanca, mod ve tersine çevirme gibi temel dizi algoritmaları; matris işlemleri ve küçük bir XOX oyunu bu bölümde yer alır. Erişimin O(1), araya ekleme ve silmenin ise öğe kaydırma yüzünden O(n) olduğu gösterilir; seçimli ve eklemeli sıralama da dizi üzerinde incelenir.

- [🖼️Sunum-Diziler (HTML)](/files/data_structures/slides/Bolum_03_Diziler.html)
- [📄Sunum-Diziler (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_03_Diziler.pdf)
- [📖Ders Notu - Diziler (HTML)](/files/data_structures/notlar/Bolum_03_Diziler_Ders_Notu.html)
- [📝Çalışma Soruları - Diziler (HTML)](/files/data_structures/slides/Bolum_03_Diziler_Calisma_Sorulari.html)
- [🕹️Dizi Simülatörü (HTML)](/files/data_structures/slides/Bolum_03_Arrays.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum03/src)

---

### Bölüm 4: Özyineleme

Özyineleme, bir problemi taban durumuna ulaşana kadar aynı problemin daha küçük örneklerine indirger. Her özyinelemeli çağrı çağrı yığınında kendi çerçevesini alır; bir özyinelemeli metodu izlemek bu çerçevelerin eklenip çıkarılmasını izlemektir. Doğrusal özyineleme (toplam, tersine çevirme, hızlı üs alma), ikili özyineleme (Fibonacci, ikili arama), Hanoi Kuleleri ve geri izleme örnekleri (alt kümeler, permütasyonlar) adım adım incelenir. Yineleme bağıntıları özyinelemeli algoritmaların zaman ve alan maliyetini verir; kuyruk özyinelemesi ve döngüye çevirme ile bölüm tamamlanır.

- [🖼️Sunum-Özyineleme (HTML)](/files/data_structures/slides/Bolum_04_Ozyineleme.html)
- [📄Sunum-Özyineleme (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_04_Ozyineleme.pdf)
- [📖Ders Notu - Özyineleme (HTML)](/files/data_structures/notlar/Bolum_04_Ozyineleme_Ders_Notu.html)
- [📝Çalışma Soruları - Özyineleme (HTML)](/files/data_structures/slides/Bolum_04_Ozyineleme_Calisma_Sorulari.html)
- [🕹️Hanoi Kuleleri Simülatörü (HTML)](/files/data_structures/slides/Bolum_04_Tower_of_Hanoi.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum04/src)

---

## Kısım II: Doğrusal Yapılar

### Bölüm 5: Bağlı Listeler

Bağlı liste, her biri veri ve bir sonraki düğüme referans taşıyan düğümlerden oluşur. Ardışık bellek gerektirmediği için başa ekleme ve silme sabit sürede yapılır; buna karşılık rastgele erişim yoktur ve bir öğeye ulaşmak için baştan gezinmek gerekir. Tek yönlü listede gezinme, ekleme, silme, tersine çevirme, tekrarları kaldırma ve sıralı listeleri birleştirme; çift yönlü listede bekçi düğümler; dairesel listede döngü tespiti ve döndürme bu bölümün konularıdır.

- [🖼️Sunum-Bağlı Listeler (HTML)](/files/data_structures/slides/Bolum_05_Bagli_Listeler.html)
- [📄Sunum-Bağlı Listeler (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_05_Bagli_Listeler.pdf)
- [📖Ders Notu - Bağlı Listeler (HTML)](/files/data_structures/notlar/Bolum_05_Bagli_Listeler_Ders_Notu.html)
- [📝Çalışma Soruları - Bağlı Listeler (HTML)](/files/data_structures/slides/Bolum_05_Bagli_Listeler_Calisma_Sorulari.html)
- [🕹️Bağlı Liste Simülatörü (HTML)](/files/data_structures/slides/Bolum_05_Linked_List.html)
- [🕹️Çift Yönlü Bağlı Liste Simülatörü (HTML)](/files/data_structures/slides/Bolum_05_Doubly_Linked_List.html)
- [🕹️Dairesel Bağlı Liste Simülatörü (HTML)](/files/data_structures/slides/Bolum_05_Circular_Linked_List.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum05/src)

---

### Bölüm 6: Liste ADT ve Java Koleksiyonları

Liste, öğelerin sıralı bir dizisini temsil eden soyut veri tipidir; büyüyüp küçülebilir ve ekleme, silme, erişim ve gezinme işlemlerini destekler. Java'nın koleksiyon hiyerarşisi (Iterable, Collection, List), Iterator ve ListIterator ile gezinme ve gezinirken güvenli silme bu bölümde ele alınır. ArrayList'in dinamik dizi olarak büyümesi ve amortize analizi, LinkedList ile karşılaştırması, konumsal liste ADT'si, Vector, CopyOnWriteArrayList ve Arrays.asList de incelenir.

- [🖼️Sunum-Liste ADT ve Java Koleksiyonları (HTML)](/files/data_structures/slides/Bolum_06_Liste_ADT_ve_Java_Koleksiyonlari.html)
- [📄Sunum-Liste ADT ve Java Koleksiyonları (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_06_Liste_ADT_ve_Java_Koleksiyonlari.pdf)
- [📖Ders Notu - Liste ADT ve Java Koleksiyonları (HTML)](/files/data_structures/notlar/Bolum_06_Liste_ADT_ve_Java_Koleksiyonlari_Ders_Notu.html)
- [📝Çalışma Soruları - Liste ADT ve Java Koleksiyonları (HTML)](/files/data_structures/slides/Bolum_06_Liste_ADT_ve_Java_Koleksiyonlari_Calisma_Sorulari.html)
- [🕹️Liste ADT Simülatörü (HTML)](/files/data_structures/slides/Bolum_06_List_ADT.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum06/src)

---

### Bölüm 7: Yığınlar

Yığın, son giren ilk çıkar (LIFO) ilkesiyle çalışır: ekleme (push) ve çıkarma (pop) yalnızca üstten yapılır. Yığın ADT'si, dizi ve bağlı liste ile gerçeklenmesi ve işlemlerin maliyeti ele alınır. Geri/ileri gezinme, çağrı yığını, parantez kontrolü, sonraki büyük öğe, en küçük öğeyi tutan yığın, Hanoi Kulelerinin yığınla çözümü ve stock span problemi yığının uygulamalarıdır. Ara ek (infix), önek (prefix) ve sonek (postfix) gösterimleri arasında dönüşüm ve sonek ifadelerin değerlendirilmesi bölümü tamamlar.

- [🖼️Sunum-Yığınlar (HTML)](/files/data_structures/slides/Bolum_07_Yiginlar.html)
- [📄Sunum-Yığınlar (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_07_Yiginlar.pdf)
- [📖Ders Notu - Yığınlar (HTML)](/files/data_structures/notlar/Bolum_07_Yiginlar_Ders_Notu.html)
- [📝Çalışma Soruları - Yığınlar (HTML)](/files/data_structures/slides/Bolum_07_Yiginlar_Calisma_Sorulari.html)
- [🕹️Yığın Simülatörü (HTML)](/files/data_structures/slides/Bolum_07_Stack.html)
- [🕹️Stock Span Simülatörü (HTML)](/files/data_structures/slides/Bolum_07_Stock_Span.html)
- [🕹️Infix → Prefix Dönüştürücü (HTML)](/files/data_structures/slides/Bolum_07_Infix_to_Prefix.html)
- [🕹️Infix → Postfix Dönüştürücü (HTML)](/files/data_structures/slides/Bolum_07_Infix_to_Postfix.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum07/src)

---

### Bölüm 8: Kuyruklar ve Deque

Kuyruk, ilk giren ilk çıkar (FIFO) ilkesiyle çalışır: öğeler bir uçtan eklenir (enqueue), öbür uçtan çıkarılır (dequeue). Basit dizi kuyruğunun sorunu, dairesel kuyruk ve indis formülleri, dolu/boş ayrımı, kuyruğun büyütülmesi ve bağlı liste ile gerçekleme bu bölümdedir. İki uçtan da ekleme ve çıkarmaya izin veren deque, kayan pencere maksimumu gibi problemlerde kullanılır. Round robin çizelgeleme, Josephus problemi, ikilik sayıların üretilmesi ve iki yığınla kuyruk uygulama örnekleridir.

- [🖼️Sunum-Kuyruklar ve Deque (HTML)](/files/data_structures/slides/Bolum_08_Kuyruklar_ve_Deque.html)
- [📄Sunum-Kuyruklar ve Deque (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_08_Kuyruklar_ve_Deque.pdf)
- [📖Ders Notu - Kuyruklar ve Deque (HTML)](/files/data_structures/notlar/Bolum_08_Kuyruklar_ve_Deque_Ders_Notu.html)
- [📝Çalışma Soruları - Kuyruklar ve Deque (HTML)](/files/data_structures/slides/Bolum_08_Kuyruklar_ve_Deque_Calisma_Sorulari.html)
- [🕹️Kuyruk Simülatörü (HTML)](/files/data_structures/slides/Bolum_08_Queue.html)
- [🕹️Deque Simülatörü (HTML)](/files/data_structures/slides/Bolum_08_Deque.html)
- [🕹️Dairesel Kuyruk Simülatörü (HTML)](/files/data_structures/slides/Bolum_08_Circular_Queue.html)
- [🕹️Round Robin Çizelgeleyici (HTML)](/files/data_structures/slides/Bolum_08_Scheduler.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum08/src)

---

## Kısım III: Ağaçlar

### Bölüm 9: Ağaçlar

Ağaç, düğümlerin kenarlarla bağlandığı hiyerarşik bir yapıdır: bir kökten başlar, her düğümün tek ebeveyni ve birden çok çocuğu olabilir. Dosya sistemleri, kurum şemaları ve HTML belgeleri ağaçla temsil edilir. Derece, derinlik ve yükseklik gibi temel kavramlar, ikili ağaç türleri (dolu, tam, mükemmel) ve özellikleri, dizi ve bağlı gösterimler incelenir. Kök önde, kök ortada, kök sonda ve düzey sırası gezinmeleri hem özyinelemeli hem yığın ve kuyrukla gerçeklenir; ifade ağaçları ve özyinelemeli ağaç fonksiyonları (boyut, yükseklik, yaprak sayısı) uygulamalardır.

- [🖼️Sunum-Ağaçlar (HTML)](/files/data_structures/slides/Bolum_09_Agaclar.html)
- [📄Sunum-Ağaçlar (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_09_Agaclar.pdf)
- [📖Ders Notu - Ağaçlar (HTML)](/files/data_structures/notlar/Bolum_09_Agaclar_Ders_Notu.html)
- [📝Çalışma Soruları - Ağaçlar (HTML)](/files/data_structures/slides/Bolum_09_Agaclar_Calisma_Sorulari.html)
- [🕹️Genel Ağaç Simülatörü (HTML)](/files/data_structures/slides/Bolum_09_General_Tree.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum09/src)

---

### Bölüm 10: Arama Ağaçları

İkili arama ağacında (BST) her düğümün sol alt ağacındaki anahtarlar düğümünkinden küçük, sağ alt ağacındakiler büyüktür. Arama, ekleme ve silme O(h) sürer; h ağacın yüksekliğidir. Dengeli ağaçta bu O(log n) olur, en kötü durumda O(n)'ye düşer. BST'de arama, ekleme, ardıl ve öncül, üç durumlu silme ve aralık sorguları incelendikten sonra yüksekliği sınırlı tutan AVL, kırmızı-siyah ve splay ağaçları ele alınır. Diskteki veriler için B-ağacı ve B+ ağacı gibi çok yollu arama ağaçları düğüm başına çok sayıda anahtar tutarak ağacı sığ tutar.

- [🖼️Sunum-Arama Ağaçları (HTML)](/files/data_structures/slides/Bolum_10_Arama_Agaclari.html)
- [📄Sunum-Arama Ağaçları (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_10_Arama_Agaclari.pdf)
- [📖Ders Notu - Arama Ağaçları (HTML)](/files/data_structures/notlar/Bolum_10_Arama_Agaclari_Ders_Notu.html)
- [📝Çalışma Soruları - Arama Ağaçları (HTML)](/files/data_structures/slides/Bolum_10_Arama_Agaclari_Calisma_Sorulari.html)
- [🕹️İkili Arama Ağacı Simülatörü (HTML)](/files/data_structures/slides/Bolum_10_BST.html)
- [🕹️İkili Arama Ağacı Gezinme Simülatörü (HTML)](/files/data_structures/slides/Bolum_10_Tree.html)
- [🕹️Kırmızı-Siyah Ağaç Simülatörü (HTML)](/files/data_structures/slides/Bolum_10_Red_Black.html)
- [🕹️AVL Ağacı Simülatörü (HTML)](/files/data_structures/slides/Bolum_10_AVL.html)
- [🕹️Splay Ağacı Simülatörü (HTML)](/files/data_structures/slides/Bolum_10_Splay.html)
- [🕹️B-Ağacı Simülatörü (HTML)](/files/data_structures/slides/Bolum_10_BTree.html)
- [🕹️B+ Ağacı Simülatörü (HTML)](/files/data_structures/slides/Bolum_10_BPlusTree.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum10/src)

---

### Bölüm 11: Öncelikli Kuyruklar ve Heap

Öncelikli kuyruk, her seferinde en yüksek (ya da en düşük) öncelikli öğeyi çıkaran soyut veri tipidir. Sırasız ve sıralı listeyle gerçeklemenin maliyetleri karşılaştırıldıktan sonra ikili heap incelenir: max-heap'te her ebeveyn çocuklarından büyük ya da onlara eşittir. Dizi gösterimi, yukarı ve aşağı süzmeyle (up-heap, down-heap) ekleme ve silme, uyarlanabilir öncelikli kuyruk, O(n) sürede heap oluşturma ve heap sort bu bölümdedir. Java'nın PriorityQueue sınıfı, k'ıncı en büyük öğe ve öncelikli çizelgeleyici uygulama örnekleridir.

- [🖼️Sunum-Öncelikli Kuyruklar ve Heap (HTML)](/files/data_structures/slides/Bolum_11_Oncelikli_Kuyruklar_ve_Heap.html)
- [📄Sunum-Öncelikli Kuyruklar ve Heap (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_11_Oncelikli_Kuyruklar_ve_Heap.pdf)
- [📖Ders Notu - Öncelikli Kuyruklar ve Heap (HTML)](/files/data_structures/notlar/Bolum_11_Oncelikli_Kuyruklar_ve_Heap_Ders_Notu.html)
- [📝Çalışma Soruları - Öncelikli Kuyruklar ve Heap (HTML)](/files/data_structures/slides/Bolum_11_Oncelikli_Kuyruklar_ve_Heap_Calisma_Sorulari.html)
- [🕹️İkili Heap Simülatörü (HTML)](/files/data_structures/slides/Bolum_11_Heap.html)
- [🕹️Öncelikli Kuyruk Simülatörü (HTML)](/files/data_structures/slides/Bolum_11_Priority_Queue.html)
- [🕹️Öncelikli Çizelgeleyici Simülatörü (HTML)](/files/data_structures/slides/Bolum_11_Priority_Scheduler.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum11/src)

---

## Kısım IV: Eşlemeler, Kümeler ve Çizgeler

### Bölüm 12: Eşlemeler ve Hash Tabloları

Eşleme (map), anahtarları değerlere bağlayan soyut veri tipidir. Hash tablosu, bir hash fonksiyonuyla anahtardan bir kova indisi hesaplar ve iyi dağılan anahtarlarla ekleme, silme ve aramayı ortalamada O(1) sürede yapar; en kötü durumda bu O(n)'ye çıkabilir. İyi bir hash fonksiyonunun özellikleri, Java'daki equals/hashCode sözleşmesi, çakışmaları çözmek için ayrı zincirleme ve açık adresleme (doğrusal yoklama, karesel yoklama, çift hash), yük faktörü ve yeniden boyutlandırma bu bölümün konularıdır. Java HashMap'in iç yapısı ve iki toplam gibi uygulamalarla bölüm tamamlanır.

- [🖼️Sunum-Eşlemeler ve Hash Tabloları (HTML)](/files/data_structures/slides/Bolum_12_Eslemeler_ve_Hash_Tablolari.html)
- [📄Sunum-Eşlemeler ve Hash Tabloları (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_12_Eslemeler_ve_Hash_Tablolari.pdf)
- [📖Ders Notu - Eşlemeler ve Hash Tabloları (HTML)](/files/data_structures/notlar/Bolum_12_Eslemeler_ve_Hash_Tablolari_Ders_Notu.html)
- [📝Çalışma Soruları - Eşlemeler ve Hash Tabloları (HTML)](/files/data_structures/slides/Bolum_12_Eslemeler_ve_Hash_Tablolari_Calisma_Sorulari.html)
- [🕹️Hash Tablosu Simülatörü (HTML)](/files/data_structures/slides/Bolum_12_Hash_Table.html)
- [🕹️Eşleme Simülatörü (HTML)](/files/data_structures/slides/Bolum_12_Map.html)
- [🕹️Açık Adresleme Simülatörü (HTML)](/files/data_structures/slides/Bolum_12_Open_Addressing.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum12/src)

---

### Bölüm 13: Kümeler ve Ayrık Kümeler

Küme, birbirinden farklı öğelerin sırasız topluluğudur; tekrar eden öğe içermez. Birleşim, kesişim ve fark işlemleri, Java'nın Set arayüzü ve hash tabanlı, ağaç tabanlı ve bit vektörü ile gerçeklemeler karşılaştırılır; çoklu küme ve çoklu eşleme de ele alınır. Ayrık kümeler (union-find) yapısı, boyuta ya da rütbeye göre birleştirme ve yol kısaltmayla bağlantı sorgularını neredeyse sabit amortize sürede yanıtlar; bağlantılı bileşen sayma bunun bir uygulamasıdır.

- [🖼️Sunum-Kümeler ve Ayrık Kümeler (HTML)](/files/data_structures/slides/Bolum_13_Kumeler_ve_Ayrik_Kumeler.html)
- [📄Sunum-Kümeler ve Ayrık Kümeler (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_13_Kumeler_ve_Ayrik_Kumeler.pdf)
- [📖Ders Notu - Kümeler ve Ayrık Kümeler (HTML)](/files/data_structures/notlar/Bolum_13_Kumeler_ve_Ayrik_Kumeler_Ders_Notu.html)
- [📝Çalışma Soruları - Kümeler ve Ayrık Kümeler (HTML)](/files/data_structures/slides/Bolum_13_Kumeler_ve_Ayrik_Kumeler_Calisma_Sorulari.html)
- [🕹️Küme ADT Simülatörü (HTML)](/files/data_structures/slides/Bolum_13_Set_ADT.html)
- [🕹️Ayrık Kümeler Simülatörü (HTML)](/files/data_structures/slides/Bolum_13_Disjoint_Set_Union.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum13/src)

---

### Bölüm 14: Çizgeler

Çizge, nesneler arasındaki ilişkileri düğümler ve kenarlarla temsil eder. Ağaçlardan farklı olarak döngü ve iki düğüm arasında birden çok yol içerebilir; yönlü ya da yönsüz, ağırlıklı ya da ağırlıksız olabilir. Sosyal ağlar, yol haritaları ve bilgisayar ağları çizgeyle modellenir. Komşuluk matrisi ve komşuluk listesi gösterimleri, genişlik öncelikli (BFS) ve derinlik öncelikli (DFS) arama, bağlantılı bileşenler, iki parçalı çizgeler, topolojik sıralama ve yönlü döngü tespiti incelenir. Ağırlıksız en kısa yol ve Dijkstra algoritmasından sonra minimum kapsayan ağaç problemi ayrık kümelerle Kruskal, öncelikli kuyrukla Prim algoritması üzerinden çözülür.

- [🖼️Sunum-Çizgeler (HTML)](/files/data_structures/slides/Bolum_14_Cizgeler.html)
- [📄Sunum-Çizgeler (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_14_Cizgeler.pdf)
- [📖Ders Notu - Çizgeler (HTML)](/files/data_structures/notlar/Bolum_14_Cizgeler_Ders_Notu.html)
- [📝Çalışma Soruları - Çizgeler (HTML)](/files/data_structures/slides/Bolum_14_Cizgeler_Calisma_Sorulari.html)
- [🕹️Yönsüz Çizge Simülatörü (HTML)](/files/data_structures/slides/Bolum_14_Graph.html)
- [🕹️Yönlü Çizge Simülatörü (HTML)](/files/data_structures/slides/Bolum_14_Directed_Graph.html)
- [🕹️Dijkstra Algoritması Simülatörü (HTML)](/files/data_structures/slides/Bolum_14_Dijkstra.html)
- [🕹️Ders Ön Koşul Planlayıcısı (HTML)](/files/data_structures/slides/Bolum_14_Course_Planner.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Bolum14/src)

</div>

<div data-lt="en" lang="en" markdown="1">

---

## Textbook

[📕 Data Structures — the course book (PDF, 17 MB)](https://sercankulcu.github.io/courses-pdfs/data_structures/Data-Structures.pdf)

---

## Getting Started

* [Important People in Data Structures (HTML)](/files/data_structures/Data_Structures_Important_People_en.html)
* [Prerequisites for Data Structures (HTML)](/files/data_structures/Data_Structures_Prerequisites_en.html)
* [Course Map (HTML)](/files/data_structures/ders_haritasi_en.html)
* [Glossary of Terms (HTML, English–Turkish)](/files/data_structures/sozluk.html)

---

## Part I: Foundations

### Chapter 1: Introduction

Data structures determine how data is laid out in memory and how it is accessed. This chapter covers how data is represented digitally, Java's primitive and reference types, reference copying and generics. The distinction between an abstract data type (which operations are offered) and a data structure (how those operations are implemented) is shown with a stack example. The chapter closes with choosing a data structure and a short comparison table of the course's core structures.

- [🖼️Slides – Introduction (HTML)](/files/data_structures/slides/Bolum_01_Giris_en.html)
- [📄Slides – Introduction (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_01_Giris_en.pdf)
- [📖Lecture Notes – Introduction (HTML)](/files/data_structures/notlar/Bolum_01_Giris_Ders_Notu_en.html)
- [📝Study Questions – Introduction (HTML)](/files/data_structures/slides/Bolum_01_Giris_Calisma_Sorulari_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter01/src)

---

### Chapter 2: Algorithm Analysis

Algorithm analysis lets us compare solutions before implementing them. Empirical timing and the doubling experiment show how running time grows in practice; counting primitive operations gives a machine-independent measure. Big O, Big Omega and Big Theta describe upper, lower and tight bounds, and the best, average and worst cases are studied separately. Loop patterns, linear and binary search, and prefix averages show how the structure of code determines its complexity. Space complexity, correctness and robustness are also covered.

- [🖼️Slides – Algorithm Analysis (HTML)](/files/data_structures/slides/Bolum_02_Algoritma_Analizi_en.html)
- [📄Slides – Algorithm Analysis (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_02_Algoritma_Analizi_en.pdf)
- [📖Lecture Notes – Algorithm Analysis (HTML)](/files/data_structures/notlar/Bolum_02_Algoritma_Analizi_Ders_Notu_en.html)
- [📝Study Questions – Algorithm Analysis (HTML)](/files/data_structures/slides/Bolum_02_Algoritma_Analizi_Calisma_Sorulari_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter02/src)

---

### Chapter 3: Arrays

An array is the most basic data structure, with its elements stored contiguously in memory; each element is reached by its index in constant time. The chapter covers declaring and copying arrays in Java, java.util.Arrays and multidimensional arrays; basic array algorithms such as mean, median, mode and reversal; matrix operations and a small tic-tac-toe game. It shows that access is O(1) while inserting and deleting in the middle are O(n) because elements must shift; selection sort and insertion sort are also studied on arrays.

- [🖼️Slides – Arrays (HTML)](/files/data_structures/slides/Bolum_03_Diziler_en.html)
- [📄Slides – Arrays (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_03_Diziler_en.pdf)
- [📖Lecture Notes – Arrays (HTML)](/files/data_structures/notlar/Bolum_03_Diziler_Ders_Notu_en.html)
- [📝Study Questions – Arrays (HTML)](/files/data_structures/slides/Bolum_03_Diziler_Calisma_Sorulari_en.html)
- [🕹️Array Simulator (HTML)](/files/data_structures/slides/Bolum_03_Arrays_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter03/src)

---

### Chapter 4: Recursion

Recursion reduces a problem to smaller instances of the same problem until it reaches a base case. Each recursive call gets its own frame on the call stack; tracing a recursive method means following frames as they are pushed and popped. Linear recursion (sum, reversal, fast exponentiation), binary recursion (Fibonacci, binary search), the Towers of Hanoi and backtracking examples (subsets, permutations) are worked step by step. Recurrence relations give the time and space cost of recursive algorithms; tail recursion and conversion to loops complete the chapter.

- [🖼️Slides – Recursion (HTML)](/files/data_structures/slides/Bolum_04_Ozyineleme_en.html)
- [📄Slides – Recursion (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_04_Ozyineleme_en.pdf)
- [📖Lecture Notes – Recursion (HTML)](/files/data_structures/notlar/Bolum_04_Ozyineleme_Ders_Notu_en.html)
- [📝Study Questions – Recursion (HTML)](/files/data_structures/slides/Bolum_04_Ozyineleme_Calisma_Sorulari_en.html)
- [🕹️Tower of Hanoi Simulator (HTML)](/files/data_structures/slides/Bolum_04_Tower_of_Hanoi_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter04/src)

---

## Part II: Linear Structures

### Chapter 5: Linked Lists

A linked list is made of nodes, each holding data and a reference to the next node. Because it needs no contiguous memory, inserting and deleting at the head take constant time; in exchange there is no random access, and reaching an element means walking from the head. Traversal, insertion, deletion, reversal, removing duplicates and merging sorted lists in a singly linked list; sentinel nodes in a doubly linked list; and cycle detection and rotation in a circular list are the topics of this chapter.

- [🖼️Slides – Linked Lists (HTML)](/files/data_structures/slides/Bolum_05_Bagli_Listeler_en.html)
- [📄Slides – Linked Lists (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_05_Bagli_Listeler_en.pdf)
- [📖Lecture Notes – Linked Lists (HTML)](/files/data_structures/notlar/Bolum_05_Bagli_Listeler_Ders_Notu_en.html)
- [📝Study Questions – Linked Lists (HTML)](/files/data_structures/slides/Bolum_05_Bagli_Listeler_Calisma_Sorulari_en.html)
- [🕹️Linked List Simulator (HTML)](/files/data_structures/slides/Bolum_05_Linked_List_en.html)
- [🕹️Doubly Linked List Simulator (HTML)](/files/data_structures/slides/Bolum_05_Doubly_Linked_List_en.html)
- [🕹️Circular Linked List Simulator (HTML)](/files/data_structures/slides/Bolum_05_Circular_Linked_List_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter05/src)

---

### Chapter 6: The List ADT and Java Collections

A list is an abstract data type for an ordered sequence of elements; it can grow and shrink and supports insertion, deletion, access and traversal. The chapter covers Java's collection hierarchy (Iterable, Collection, List), traversal with Iterator and ListIterator, and safe removal during traversal. It also studies how ArrayList grows as a dynamic array and its amortized analysis, its comparison with LinkedList, the positional list ADT, Vector, CopyOnWriteArrayList and Arrays.asList.

- [🖼️Slides – The List ADT and Java Collections (HTML)](/files/data_structures/slides/Bolum_06_Liste_ADT_ve_Java_Koleksiyonlari_en.html)
- [📄Slides – The List ADT and Java Collections (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_06_Liste_ADT_ve_Java_Koleksiyonlari_en.pdf)
- [📖Lecture Notes – The List ADT and Java Collections (HTML)](/files/data_structures/notlar/Bolum_06_Liste_ADT_ve_Java_Koleksiyonlari_Ders_Notu_en.html)
- [📝Study Questions – The List ADT and Java Collections (HTML)](/files/data_structures/slides/Bolum_06_Liste_ADT_ve_Java_Koleksiyonlari_Calisma_Sorulari_en.html)
- [🕹️List ADT Simulator (HTML)](/files/data_structures/slides/Bolum_06_List_ADT_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter06/src)

---

### Chapter 7: Stacks

A stack works last in, first out (LIFO): insertion (push) and removal (pop) happen only at the top. The stack ADT, its implementation with an array and with a linked list, and the cost of its operations are covered. Back/forward navigation, the call stack, bracket matching, the next greater element, a stack that tracks its minimum, solving the Towers of Hanoi with a stack and the stock span problem are applications. Conversion between infix, prefix and postfix notations and evaluating postfix expressions complete the chapter.

- [🖼️Slides – Stacks (HTML)](/files/data_structures/slides/Bolum_07_Yiginlar_en.html)
- [📄Slides – Stacks (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_07_Yiginlar_en.pdf)
- [📖Lecture Notes – Stacks (HTML)](/files/data_structures/notlar/Bolum_07_Yiginlar_Ders_Notu_en.html)
- [📝Study Questions – Stacks (HTML)](/files/data_structures/slides/Bolum_07_Yiginlar_Calisma_Sorulari_en.html)
- [🕹️Stack Simulator (HTML)](/files/data_structures/slides/Bolum_07_Stack_en.html)
- [🕹️Stock Span Simulator (HTML)](/files/data_structures/slides/Bolum_07_Stock_Span_en.html)
- [🕹️Infix → Prefix Converter (HTML)](/files/data_structures/slides/Bolum_07_Infix_to_Prefix_en.html)
- [🕹️Infix → Postfix Converter (HTML)](/files/data_structures/slides/Bolum_07_Infix_to_Postfix_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter07/src)

---

### Chapter 8: Queues and Deques

A queue works first in, first out (FIFO): elements are added at one end (enqueue) and removed at the other (dequeue). The problem with a simple array queue, the circular queue and its index formulas, telling full from empty, growing the queue and a linked-list implementation are covered. The deque, which allows insertion and removal at both ends, is used in problems such as the sliding-window maximum. Round-robin scheduling, the Josephus problem, generating binary numbers and a queue built from two stacks are examples.

- [🖼️Slides – Queues and Deques (HTML)](/files/data_structures/slides/Bolum_08_Kuyruklar_ve_Deque_en.html)
- [📄Slides – Queues and Deques (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_08_Kuyruklar_ve_Deque_en.pdf)
- [📖Lecture Notes – Queues and Deques (HTML)](/files/data_structures/notlar/Bolum_08_Kuyruklar_ve_Deque_Ders_Notu_en.html)
- [📝Study Questions – Queues and Deques (HTML)](/files/data_structures/slides/Bolum_08_Kuyruklar_ve_Deque_Calisma_Sorulari_en.html)
- [🕹️Queue Simulator (HTML)](/files/data_structures/slides/Bolum_08_Queue_en.html)
- [🕹️Deque Simulator (HTML)](/files/data_structures/slides/Bolum_08_Deque_en.html)
- [🕹️Circular Queue Simulator (HTML)](/files/data_structures/slides/Bolum_08_Circular_Queue_en.html)
- [🕹️Round-Robin Scheduler (HTML)](/files/data_structures/slides/Bolum_08_Scheduler_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter08/src)

---

## Part III: Trees

### Chapter 9: Trees

A tree is a hierarchical structure of nodes connected by edges: it starts at a root, and each node has one parent and may have several children. File systems, organization charts and HTML documents are represented as trees. Basic notions such as degree, depth and height, the kinds of binary trees (full, complete, perfect) and their properties, and array and linked representations are studied. Preorder, inorder, postorder and level-order traversals are implemented both recursively and with a stack and a queue; expression trees and recursive tree functions (size, height, leaf count) are applications.

- [🖼️Slides – Trees (HTML)](/files/data_structures/slides/Bolum_09_Agaclar_en.html)
- [📄Slides – Trees (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_09_Agaclar_en.pdf)
- [📖Lecture Notes – Trees (HTML)](/files/data_structures/notlar/Bolum_09_Agaclar_Ders_Notu_en.html)
- [📝Study Questions – Trees (HTML)](/files/data_structures/slides/Bolum_09_Agaclar_Calisma_Sorulari_en.html)
- [🕹️General Tree Simulator (HTML)](/files/data_structures/slides/Bolum_09_General_Tree_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter09/src)

---

### Chapter 10: Search Trees

In a binary search tree (BST), the keys in each node's left subtree are smaller than its key and those in the right subtree are larger. Search, insertion and deletion take O(h), where h is the height of the tree: O(log n) when the tree is balanced, degrading to O(n) in the worst case. After search, insertion, successor and predecessor, three-case deletion and range queries in a BST, the AVL, red-black and splay trees, which keep the height bounded, are covered. For data on disk, multiway search trees such as the B-tree and the B+ tree keep many keys per node so the tree stays shallow.

- [🖼️Slides – Search Trees (HTML)](/files/data_structures/slides/Bolum_10_Arama_Agaclari_en.html)
- [📄Slides – Search Trees (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_10_Arama_Agaclari_en.pdf)
- [📖Lecture Notes – Search Trees (HTML)](/files/data_structures/notlar/Bolum_10_Arama_Agaclari_Ders_Notu_en.html)
- [📝Study Questions – Search Trees (HTML)](/files/data_structures/slides/Bolum_10_Arama_Agaclari_Calisma_Sorulari_en.html)
- [🕹️Binary Search Tree Simulator (HTML)](/files/data_structures/slides/Bolum_10_BST_en.html)
- [🕹️Binary Search Tree Traversal Simulator (HTML)](/files/data_structures/slides/Bolum_10_Tree_en.html)
- [🕹️Red-Black Tree Simulator (HTML)](/files/data_structures/slides/Bolum_10_Red_Black_en.html)
- [🕹️AVL Tree Simulator (HTML)](/files/data_structures/slides/Bolum_10_AVL_en.html)
- [🕹️Splay Tree Simulator (HTML)](/files/data_structures/slides/Bolum_10_Splay_en.html)
- [🕹️B-Tree Simulator (HTML)](/files/data_structures/slides/Bolum_10_BTree_en.html)
- [🕹️B+ Tree Simulator (HTML)](/files/data_structures/slides/Bolum_10_BPlusTree_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter10/src)

---

### Chapter 11: Priority Queues and Heaps

A priority queue is an abstract data type that always removes the element with the highest (or lowest) priority. After comparing the costs of unsorted and sorted list implementations, the binary heap is studied: in a max-heap every parent is greater than or equal to its children. The array representation, insertion and removal with up-heap and down-heap, the adaptable priority queue, building a heap in O(n) and heap sort are in this chapter. Java's PriorityQueue class, the k-th largest element and a priority scheduler are example applications.

- [🖼️Slides – Priority Queues and Heaps (HTML)](/files/data_structures/slides/Bolum_11_Oncelikli_Kuyruklar_ve_Heap_en.html)
- [📄Slides – Priority Queues and Heaps (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_11_Oncelikli_Kuyruklar_ve_Heap_en.pdf)
- [📖Lecture Notes – Priority Queues and Heaps (HTML)](/files/data_structures/notlar/Bolum_11_Oncelikli_Kuyruklar_ve_Heap_Ders_Notu_en.html)
- [📝Study Questions – Priority Queues and Heaps (HTML)](/files/data_structures/slides/Bolum_11_Oncelikli_Kuyruklar_ve_Heap_Calisma_Sorulari_en.html)
- [🕹️Binary Heap Simulator (HTML)](/files/data_structures/slides/Bolum_11_Heap_en.html)
- [🕹️Priority Queue Simulator (HTML)](/files/data_structures/slides/Bolum_11_Priority_Queue_en.html)
- [🕹️Priority Scheduler Simulator (HTML)](/files/data_structures/slides/Bolum_11_Priority_Scheduler_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter11/src)

---

## Part IV: Maps, Sets and Graphs

### Chapter 12: Maps and Hash Tables

A map is an abstract data type that associates keys with values. A hash table computes a bucket index from a key with a hash function and, with well-distributed keys, performs insertion, deletion and lookup in O(1) on average; in the worst case this can rise to O(n). The properties of a good hash function, Java's equals/hashCode contract, separate chaining and open addressing (linear probing, quadratic probing, double hashing) for resolving collisions, the load factor and resizing are the topics of this chapter. It ends with the internals of Java's HashMap and applications such as two-sum.

- [🖼️Slides – Maps and Hash Tables (HTML)](/files/data_structures/slides/Bolum_12_Eslemeler_ve_Hash_Tablolari_en.html)
- [📄Slides – Maps and Hash Tables (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_12_Eslemeler_ve_Hash_Tablolari_en.pdf)
- [📖Lecture Notes – Maps and Hash Tables (HTML)](/files/data_structures/notlar/Bolum_12_Eslemeler_ve_Hash_Tablolari_Ders_Notu_en.html)
- [📝Study Questions – Maps and Hash Tables (HTML)](/files/data_structures/slides/Bolum_12_Eslemeler_ve_Hash_Tablolari_Calisma_Sorulari_en.html)
- [🕹️Hash Table Simulator (HTML)](/files/data_structures/slides/Bolum_12_Hash_Table_en.html)
- [🕹️Map Simulator (HTML)](/files/data_structures/slides/Bolum_12_Map_en.html)
- [🕹️Open Addressing Simulator (HTML)](/files/data_structures/slides/Bolum_12_Open_Addressing_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter12/src)

---

### Chapter 13: Sets and Disjoint Sets

A set is an unordered collection of distinct elements; it contains no duplicates. Union, intersection and difference, Java's Set interface, and hash-based, tree-based and bit-vector implementations are compared; multisets and multimaps are also covered. The disjoint-set (union-find) structure, with union by size or rank and path compression, answers connectivity queries in nearly constant amortized time; counting connected components is one application.

- [🖼️Slides – Sets and Disjoint Sets (HTML)](/files/data_structures/slides/Bolum_13_Kumeler_ve_Ayrik_Kumeler_en.html)
- [📄Slides – Sets and Disjoint Sets (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_13_Kumeler_ve_Ayrik_Kumeler_en.pdf)
- [📖Lecture Notes – Sets and Disjoint Sets (HTML)](/files/data_structures/notlar/Bolum_13_Kumeler_ve_Ayrik_Kumeler_Ders_Notu_en.html)
- [📝Study Questions – Sets and Disjoint Sets (HTML)](/files/data_structures/slides/Bolum_13_Kumeler_ve_Ayrik_Kumeler_Calisma_Sorulari_en.html)
- [🕹️Set ADT Simulator (HTML)](/files/data_structures/slides/Bolum_13_Set_ADT_en.html)
- [🕹️Disjoint Sets Simulator (HTML)](/files/data_structures/slides/Bolum_13_Disjoint_Set_Union_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter13/src)

---

### Chapter 14: Graphs

A graph represents relationships between objects with vertices and edges. Unlike trees, it may contain cycles and several paths between two vertices; it may be directed or undirected, weighted or unweighted. Social networks, road maps and computer networks are modeled as graphs. Adjacency-matrix and adjacency-list representations, breadth-first search (BFS) and depth-first search (DFS), connected components, bipartite graphs, topological sorting and directed cycle detection are studied. After unweighted shortest paths and Dijkstra's algorithm, the minimum spanning tree problem is solved with Kruskal's algorithm using disjoint sets and Prim's algorithm using a priority queue.

- [🖼️Slides – Graphs (HTML)](/files/data_structures/slides/Bolum_14_Cizgeler_en.html)
- [📄Slides – Graphs (PDF)](https://sercankulcu.github.io/courses-pdfs/data_structures/pdf/Bolum_14_Cizgeler_en.pdf)
- [📖Lecture Notes – Graphs (HTML)](/files/data_structures/notlar/Bolum_14_Cizgeler_Ders_Notu_en.html)
- [📝Study Questions – Graphs (HTML)](/files/data_structures/slides/Bolum_14_Cizgeler_Calisma_Sorulari_en.html)
- [🕹️Undirected Graph Simulator (HTML)](/files/data_structures/slides/Bolum_14_Graph_en.html)
- [🕹️Directed Graph Simulator (HTML)](/files/data_structures/slides/Bolum_14_Directed_Graph_en.html)
- [🕹️Dijkstra's Algorithm Simulator (HTML)](/files/data_structures/slides/Bolum_14_Dijkstra_en.html)
- [🕹️Course Prerequisite Planner (HTML)](/files/data_structures/slides/Bolum_14_Course_Planner_en.html)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java-en/tree/main/Chapter14/src)

</div>
