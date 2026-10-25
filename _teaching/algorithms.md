---
title: "Algorithms"
collection: teaching
type: "Undergraduate"
permalink: /teaching/algorithms
venue: "Giresun University, Computer Engineering"
date: 2026-01-07
location: "Giresun, Turkey"
---

![algorithms](/images/teaching/teaching-algorithms.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} 
An algorithm is a finite and well-defined sequence of steps for solving a problem or performing a computation. Algorithms form the foundation of software systems and are used in tasks ranging from sorting and searching to graph processing, optimization, text analysis, and scientific computing. This course examines fundamental algorithm-design techniques, correctness, time and space complexity, and the practical trade-offs between alternative solutions.

---

## Başlangıç Kaynakları

* [Algoritmalarda Önemli İsimler (HTML)](../files/algorithms/Algorithms_Important_People.html)
* [Algoritmalar İçin Ön Bilgiler (HTML)](../files/algorithms/Algorithms_Prerequisites.html)
* [Terim Sözlüğü (HTML)](../files/algorithms/sozluk.html)

---

## Kısım I: Temeller

### Bölüm 1: Giriş ve Algoritma Karmaşıklığı

Algoritma, bir problemi sonlu sayıda ve iyi tanımlanmış adımla çözen yöntemdir. Bölümün ilk kısmında algoritma kavramı gündelik örneklerle tanıtılır; sabit, doğrusal, karekök, kübik, faktöriyel ve üstel zaman alan örnekler üzerinden çalışma süresinin girdi boyutuyla nasıl büyüdüğü gösterilir ve Öklid algoritmasının neden hızlı olduğu açıklanır. İkinci kısımda adım sayma, en iyi, en kötü ve ortalama durum, alan karmaşıklığı ile Büyük O, Omega ve Teta gösterimleri ele alınır. Döngülerin toplam formülleriyle çözümlenmesi, özyineleme bağıntılarının kurulup Ana Teorem ile çözülmesi örnek fonksiyonlar üzerinde işlenir; amortize analize de kısaca değinilir.

- [🖼️Sunum-Giriş (HTML)](../files/algorithms/slides/Bolum_01_01_Giris.html)
- [📄Sunum-Giriş (PDF)](../files/algorithms/pdf/Bolum_01_01_Giris.pdf)
- [📝Çalışma Soruları - Giriş (HTML)](../files/algorithms/slides/Bolum_01_01_Giris_Calisma_Sorulari.html)
  - [🕹️Algoritma Karmaşıklığı Analizi (HTML)](../files/algorithms/slides/Chapter_01_Algorithm_Complexity.html)
- [🖼️Sunum-Karmaşıklık (HTML)](../files/algorithms/slides/Bolum_01_02_Karmasiklik.html)
- [📄Sunum-Karmaşıklık (PDF)](../files/algorithms/pdf/Bolum_01_02_Karmasiklik.pdf)
- [📝Çalışma Soruları - Karmaşıklık (HTML)](../files/algorithms/slides/Bolum_01_02_Karmasiklik_Calisma_Sorulari.html)
  - [🕹️Asimptotik Büyüme Gezgini (HTML)](../files/algorithms/slides/Chapter_01_Asymptotic_Growth_Explorer.html)
  - [🕹️Özyineleme ve Ana Teorem (HTML)](../files/algorithms/slides/Chapter_01_Recurrence_Master_Theorem.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter01/src)

---

### Bölüm 2: Sıralama Algoritmaları

Sıralama, verinin belirli bir düzene sokulmasıdır ve pek çok algoritmanın ön adımını oluşturur. Bölümde kabarcık, eklemeli, seçimli ve kabuk sıralaması gibi temel yöntemler ile birleştirme sıralaması, hızlı sıralama ve yığın sıralaması adım adım izlenir ve Java kodlarıyla çözümlenir. Karşılaştırmaya dayalı sıralamanın Ω(n log n) alt sınırı gösterilir; saymalı, basamak ve kova sıralaması gibi doğrusal zamanlı yöntemlerle gerçek kütüphanelerde kullanılan Timsort tanıtılır. Algoritmalar kararlılık, ek bellek ve karmaşıklık bakımından karşılaştırılır.

- [🖼️Sunum-Sıralama Algoritmaları (HTML)](../files/algorithms/slides/Bolum_02_Siralama.html)
- [📄Sunum-Sıralama Algoritmaları (PDF)](../files/algorithms/pdf/Bolum_02_Siralama.pdf)
- [📝Çalışma Soruları - Sıralama Algoritmaları (HTML)](../files/algorithms/slides/Bolum_02_Siralama_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter02/src)

- [🕹️Sıralama Algoritmaları (HTML)](../files/algorithms/slides/Chapter_02_Sorting.html)
- [🕹️Sıralama Yarışı (HTML)](../files/algorithms/slides/Chapter_02_Sorting_Race.html)
- [🕹️Sıralama Özellikleri Laboratuvarı (HTML)](../files/algorithms/slides/Chapter_02_Sorting_Properties_Lab.html)

---

### Bölüm 3: Arama Algoritmaları

Arama, bir veri kümesinde istenen öğenin yerini bulma problemidir. Bölümde bekçili sürümüyle birlikte doğrusal arama, sıralı dizide ikili arama ve bu yöntemin örtük bir ikili arama ağacı olarak yorumu, tekrarlı öğelerde ilk konumun bulunması anlatılır. Hash fonksiyonları, doğrusal yoklama ve zincirleme ile hash tablosunda arama ve yük faktörünün maliyete etkisi incelenir. Ara değer arama, atlayarak arama ve üstel arama da ele alınır; algoritmalar aynı dizideki yoklama sayılarıyla karşılaştırılır ve hangi durumda hangisinin uygun olduğu tartışılır.

- [🖼️Sunum-Arama Algoritmaları (HTML)](../files/algorithms/slides/Bolum_03_Arama.html)
- [📄Sunum-Arama Algoritmaları (PDF)](../files/algorithms/pdf/Bolum_03_Arama.pdf)
- [📝Çalışma Soruları - Arama Algoritmaları (HTML)](../files/algorithms/slides/Bolum_03_Arama_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter03/src)

- [🕹️Arama Algoritmaları (HTML)](../files/algorithms/slides/Chapter_03_Search.html)
- [🕹️Hash ve Ara Değer Arama (HTML)](../files/algorithms/slides/Chapter_03_Hash_Interpolation_Search.html)
- [🕹️Üstel Arama (HTML)](../files/algorithms/slides/Chapter_03_Exponential_Search.html)

---

## Kısım II: Çizge ve Dizgi Algoritmaları

### Bölüm 4: Çizge Algoritmaları

Çizgeler, yol ağlarından sosyal ağlara kadar düğümler ve bağlantılarla ifade edilebilen her yapıyı modellemekte kullanılır. Bölüm, çizgenin bellekte gösterimi, derinlik öncelikli (DFS) ve genişlik öncelikli (BFS) gezinme, Tarjan ve Kosaraju algoritmalarıyla güçlü bağlantılı bileşenler, topolojik sıralama ve iki parçalılık testiyle başlar. Ardından gevşetme işlemi üzerine kurulan Dijkstra, Bellman-Ford, Floyd-Warshall ve A* en kısa yol algoritmaları, kesim ve döngü özelliklerine dayanan Kruskal, Prim, Borůvka ve ters silme minimum kapsayan ağaç algoritmaları işlenir. Son kısımda artık ağ, artış yolu ve maksimum akış–minimum kesim teoremi ile Ford-Fulkerson, Edmonds-Karp, Dinic ve itme–yeniden etiketleme algoritmaları ele alınır.

- [🖼️Sunum-Çizge Gezinme (HTML)](../files/algorithms/slides/Bolum_04_01_Cizge_Gezinme.html)
- [📄Sunum-Çizge Gezinme (PDF)](../files/algorithms/pdf/Bolum_04_01_Cizge_Gezinme.pdf)
- [📝Çalışma Soruları - Çizge Gezinme (HTML)](../files/algorithms/slides/Bolum_04_01_Cizge_Gezinme_Calisma_Sorulari.html)
  - [🕹️Çizge Gezinme Simülatörü (HTML)](../files/algorithms/slides/Chapter_04_Graph_Traversal.html)
  - [🕹️Çizge Yapısı Algoritmaları Simülatörü (HTML)](../files/algorithms/slides/Chapter_04_Graph_Structure_Algorithms.html)
  - [🕹️İki Parçalılık, Döngü ve Köprü Simülatörü (HTML)](../files/algorithms/slides/Chapter_04_Bipartite_Cycle_Bridge.html)
- [🖼️Sunum-Çizge En Kısa Yol (HTML)](../files/algorithms/slides/Bolum_04_02_En_Kisa_Yol.html)
- [📄Sunum-Çizge En Kısa Yol (PDF)](../files/algorithms/pdf/Bolum_04_02_En_Kisa_Yol.pdf)
- [📝Çalışma Soruları - Çizge En Kısa Yol (HTML)](../files/algorithms/slides/Bolum_04_02_En_Kisa_Yol_Calisma_Sorulari.html)
  - [🕹️En Kısa Yol Algoritmaları Simülatörü (HTML)](../files/algorithms/slides/Chapter_04_Shortest_Path.html)
  - [🕹️A* Yol Bulma Simülatörü (HTML)](../files/algorithms/slides/Chapter_04_AStar.html)
- [🖼️Sunum-Çizge Minimum Kapsayan (HTML)](../files/algorithms/slides/Bolum_04_03_Min_Kapsayan.html)
- [📄Sunum-Çizge Minimum Kapsayan (PDF)](../files/algorithms/pdf/Bolum_04_03_Min_Kapsayan.pdf)
- [📝Çalışma Soruları - Çizge Minimum Kapsayan (HTML)](../files/algorithms/slides/Bolum_04_03_Min_Kapsayan_Calisma_Sorulari.html)
  - [🕹️Minimum Kapsayan Ağaç Simülatörü (HTML)](../files/algorithms/slides/Chapter_04_MST.html)
- [🖼️Sunum-Çizge Ağ Akış (HTML)](../files/algorithms/slides/Bolum_04_04_Ag_Akis.html)
- [📄Sunum-Çizge Ağ Akış (PDF)](../files/algorithms/pdf/Bolum_04_04_Ag_Akis.pdf)
- [📝Çalışma Soruları - Çizge Ağ Akış (HTML)](../files/algorithms/slides/Bolum_04_04_Ag_Akis_Calisma_Sorulari.html)
  - [🕹️Ağ Akışı Simülatörü (HTML)](../files/algorithms/slides/Chapter_04_Network_Flow.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter04/src)

---

### Bölüm 5: Dizgi Algoritmaları

Dizgi algoritmaları metin arama, veri sıkıştırma ve biyolojik dizi çözümlemesi gibi alanların temelini oluşturur. Bölümün ilk kısmında kaba kuvvet, Knuth-Morris-Pratt, Boyer-Moore ve Rabin-Karp örüntü eşleştirme algoritmaları ile RLE, LZW ve LZ78 sıkıştırma yöntemleri işlenir. İkinci kısım sözlüksel sıra ve LSD/MSD basamak sıralamasıyla dizgi sıralamayı, düzenli ifadeleri, sonlu durum makinelerini, Levenshtein düzenleme uzaklığını, sonek dizisini ve Burrows–Wheeler dönüşümünü kapsar. Üçüncü kısımda önek ağacı (trie) ekleme, arama, silme ve otomatik tamamlama işlemleriyle anlatılır; üçlü arama trie'si, sıkıştırılmış trie, sonek trie'si ve Aho–Corasick algoritması da tanıtılır.

- [🖼️Sunum-Dizgi Algoritmaları (1) (HTML)](../files/algorithms/slides/Bolum_05_Dizgi.html)
- [📄Sunum-Dizgi Algoritmaları (1) (PDF)](../files/algorithms/pdf/Bolum_05_Dizgi.pdf)
- [📝Çalışma Soruları - Dizgi Algoritmaları (1) (HTML)](../files/algorithms/slides/Bolum_05_Dizgi_Calisma_Sorulari.html)
  - [🕹️Dizgi Eşleştirme Algoritmaları (HTML)](../files/algorithms/slides/Chapter_05_String_Matching.html)
  - [🕹️Önek Fonksiyonu ve Z Algoritması (HTML)](../files/algorithms/slides/Chapter_05_Prefix_Z_Algorithms.html)
  - [🕹️Dizgi Sıkıştırma Algoritmaları (HTML)](../files/algorithms/slides/Chapter_05_String_Compression.html)
- [🖼️Sunum-Dizgi Algoritmaları (2) (HTML)](../files/algorithms/slides/Bolum_05_Dizgi_2.html)
- [📄Sunum-Dizgi Algoritmaları (2) (PDF)](../files/algorithms/pdf/Bolum_05_Dizgi_2.pdf)
- [📝Çalışma Soruları - Dizgi Algoritmaları (2) (HTML)](../files/algorithms/slides/Bolum_05_Dizgi_2_Calisma_Sorulari.html)
  - [🕹️Dizgi Sıralama: LSD Basamak Sıralaması (HTML)](../files/algorithms/slides/Chapter_05_String_Sorting.html)
  - [🕹️Sonlu Durum Makinesiyle Dizgi Ayrıştırma (HTML)](../files/algorithms/slides/Chapter_05_String_Parsing.html)
  - [🕹️Dizgi Benzerliği: Levenshtein Uzaklığı (HTML)](../files/algorithms/slides/Chapter_05_String_Similarity.html)
  - [🕹️Dizgi Dönüşümü: Burrows–Wheeler Dönüşümü (HTML)](../files/algorithms/slides/Chapter_05_String_Transformation.html)
- [🖼️Sunum-Trie (HTML)](../files/algorithms/slides/Bolum_05_Tries.html)
- [📄Sunum-Trie (PDF)](../files/algorithms/pdf/Bolum_05_Tries.pdf)
- [📝Çalışma Soruları - Trie (HTML)](../files/algorithms/slides/Bolum_05_Tries_Calisma_Sorulari.html)
  - [🕹️Trie ve Sonek Algoritmaları (HTML)](../files/algorithms/slides/Chapter_05_Trie_Suffix_Algorithms.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter05/src)

---

## Kısım III: Tasarım Paradigmaları

### Bölüm 6: Böl ve Fethet Yaklaşımı

Böl ve fethet yaklaşımı, bir problemi aynı türden daha küçük alt problemlere böler, bunları özyinelemeli olarak çözer ve sonuçları birleştirir. Bölümde genel şablon ile buna karşılık gelen özyineleme bağıntısı, Ana Teorem ile çözümleme, birleştirme sıralaması, hızlı sıralama ve hızlı üs alma örnekleri ele alınır; alt problemler örtüştüğünde yaklaşımın neden verimsizleştiği gösterilir. Geometriden Quickhull ile dışbükey örtü ve en yakın nokta çifti, aritmetikten Karatsuba tam sayı çarpımı ve Strassen matris çarpımı ayrıntılı biçimde incelenir.

- [🖼️Sunum-Böl Fethet Yaklaşımı (HTML)](../files/algorithms/slides/Bolum_06_Bol_Fethet.html)
- [📄Sunum-Böl Fethet Yaklaşımı (PDF)](../files/algorithms/pdf/Bolum_06_Bol_Fethet.pdf)
- [📝Çalışma Soruları - Böl Fethet Yaklaşımı (HTML)](../files/algorithms/slides/Bolum_06_Bol_Fethet_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter11/src)

- [🕹️Özyineleme ve Ana Teorem (HTML)](../files/algorithms/slides/Chapter_01_Recurrence_Master_Theorem.html)
- [🕹️Sıralama Algoritmaları (HTML)](../files/algorithms/slides/Chapter_02_Sorting.html)

---

### Bölüm 7: Açgözlü Algoritmalar

Açgözlü algoritmalar çözümü adım adım kurar, her adımda o an en iyi görünen seçimi yapar ve bu seçimi sonradan değiştirmez. Bölümde açgözlü seçim özelliği ile en iyi alt yapı koşulları anlatılır; para üstü problemi üzerinden yaklaşımın hangi durumda en iyi sonucu verdiği, hangi durumda yanıldığı gösterilir. Etkinlik seçimi, son tarihli iş sıralama ve kesirli sırt çantası problemleri, kesim özelliğine dayanan minimum kapsayan ağaç algoritmaları ve Huffman kodlaması işlenir; Huffman kodunun neden en iyi önek kodu olduğu da gerekçelendirilir.

- [🖼️Sunum-Açgözlü Algoritmalar (HTML)](../files/algorithms/slides/Bolum_07_Acgozlu.html)
- [📄Sunum-Açgözlü Algoritmalar (PDF)](../files/algorithms/pdf/Bolum_07_Acgozlu.pdf)
- [📝Çalışma Soruları - Açgözlü Algoritmalar (HTML)](../files/algorithms/slides/Bolum_07_Acgozlu_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter12/src)

- [🕹️Minimum Kapsayan Ağaç Simülatörü (HTML)](../files/algorithms/slides/Chapter_04_MST.html)
- [🕹️Dizgi Sıkıştırma Algoritmaları (HTML)](../files/algorithms/slides/Chapter_05_String_Compression.html)

---

### Bölüm 8: Dinamik Programlama

Dinamik programlama, örtüşen alt problemleri bir kez çözüp sonuçlarını saklayarak üstel maliyetli özyinelemeleri polinom zamana indirir. Bölümde en iyi alt yapı ve örtüşen alt problemler özellikleri, bir DP çözümü tasarlamanın adımları, bellekleme ile tablolama arasındaki fark ve yaklaşımın böl ve fethet ile açgözlü yöntemlerden ayrıldığı noktalar Fibonacci örneği üzerinden açıklanır. Ardından 0/1 ve sınırsız sırt çantası, alt küme toplamı, en uzun artan alt dizi, en uzun ortak alt dizgi ve en uzun ortak alt dizi problemleri tablolar adım adım doldurularak çözülür. En uzun artan alt dizi için ikili aramaya dayanan O(n log n) çözüm de verilir.

- [🖼️Sunum-Dinamik Programlama (HTML)](../files/algorithms/slides/Bolum_08_Dinamik.html)
- [📄Sunum-Dinamik Programlama (PDF)](../files/algorithms/pdf/Bolum_08_Dinamik.pdf)
- [📝Çalışma Soruları - Dinamik Programlama (HTML)](../files/algorithms/slides/Bolum_08_Dinamik_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter06/src)

---

## Kısım IV: Zor Problemler

### Bölüm 9: Geri İzleme Algoritmaları

Geri izleme, kısmi çözümleri adım adım genişleten ve geçerli bir çözüme ulaşamayacağı anlaşılan daldan vazgeçip önceki karar noktasına dönen sistematik bir arama yöntemidir. Bölüm P, NP ve NP-zor problemlere kısa bir girişle başlar; durum uzayı ağacı ve seç–keşfet–geri al şablonu labirent ve permütasyon örnekleriyle tanıtılır. N vezir, Sudoku, çizge boyama, Hamilton yolu ve kelime arama problemleri Java kodlarıyla çözülür; en az çakışma sezgiseli yerel onarıma dayalı bir seçenek olarak gösterilir. Geri izlemenin en kötü durum maliyeti ve budamayı güçlendiren sezgiseller de tartışılır.

- [🖼️Sunum-Geri İzleme Algoritmaları (HTML)](../files/algorithms/slides/Bolum_09_Geri_Donuslu.html)
- [📄Sunum-Geri İzleme Algoritmaları (PDF)](../files/algorithms/pdf/Bolum_09_Geri_Donuslu.pdf)
- [📝Çalışma Soruları - Geri İzleme Algoritmaları (HTML)](../files/algorithms/slides/Bolum_09_Geri_Donuslu_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter13/src)

---

### Bölüm 10: Dal Sınır Algoritmaları

Dal sınır yöntemi, durum uzayı ağacını tararken her düğüm için bir sınır hesaplar ve en iyi çözümü içeremeyeceği kesinleşen dalları budar. Bölümde sınırın seçimi, budama koşulları ve FIFO, LIFO ve en düşük maliyetli (LC) arama stratejileri anlatılır; yöntemin geri izlemeden farkı ortaya konur. 0/1 sırt çantası problemi kesirli gevşetmeyle, gezgin satıcı problemi giderek sıkılaşan üç alt sınırla çözülür; atama problemi, tam sayılı doğrusal programlama ve maksimum klik de örnek olarak işlenir. Dal sınırın A* ile ilişkisi kurulur ve tasarım paradigmaları birlikte karşılaştırılır.

- [🖼️Sunum-Dal Sınır Algoritmaları (HTML)](../files/algorithms/slides/Bolum_10_Dal_Sinir.html)
- [📄Sunum-Dal Sınır Algoritmaları (PDF)](../files/algorithms/pdf/Bolum_10_Dal_Sinir.pdf)
- [📝Çalışma Soruları - Dal Sınır Algoritmaları (HTML)](../files/algorithms/slides/Bolum_10_Dal_Sinir_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter14/src)

- [🕹️Gezgin Satıcı Problemi Simülatörü (HTML)](../files/algorithms/slides/Chapter_04_TSP.html)

---

### Bölüm 11: Yaklaşım Algoritmaları

Yaklaşım algoritmaları, en iyi çözümü bulmanın çok pahalı olduğu NP-zor problemlerde polinom zamanda ve kanıtlanmış bir oran içinde en iyiye yakın çözümler üretir. Bölümde yaklaşım oranı kavramı ve yaklaşım algoritmasının sezgiselden ve yaklaşım şemalarından farkı açıklanır. Gezgin satıcı problemi için en yakın komşu sezgiseli, metrik TSP'de MST tabanlı 2-yaklaşım ve 2-opt yerel arama; iş çizelgelemede liste çizelgeleme ve en uzun iş önce (LPT) kuralı; düğüm kapsama için 2-yaklaşım algoritması ve 3-SAT'tan indirgeme işlenir. Sırt çantası için oran sıralı açgözlü yaklaşım ve baskın özvektörü bulan kuvvet yinelemesi (power iteration) de ele alınır.

- [🖼️Sunum-Yaklaşım Algoritmaları (HTML)](../files/algorithms/slides/Bolum_11_Yakinsama.html)
- [📄Sunum-Yaklaşım Algoritmaları (PDF)](../files/algorithms/pdf/Bolum_11_Yakinsama.pdf)
- [📝Çalışma Soruları - Yaklaşım Algoritmaları (HTML)](../files/algorithms/slides/Bolum_11_Yakinsama_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter07/src)

- [🕹️Gezgin Satıcı Problemi Simülatörü (HTML)](../files/algorithms/slides/Chapter_04_TSP.html)

---

## Kısım V: Diğer Hesaplama Modelleri

### Bölüm 12: Rastgele Algoritmalar

Rastgele algoritmalar, çalışma sırasında rastgele seçimler yaparak daha yalın bir tasarıma, daha iyi bir beklenen çalışma süresine ya da kötü girdilere karşı dayanıklılığa ulaşır. Bölümde Las Vegas ve Monte Carlo türleri ile hata olasılığının tekrarlı çalıştırmayla küçültülmesi anlatılır. Fisher–Yates karıştırması ve saf karıştırmanın yanlılığı, BogoSort, rastgele pivotlu hızlı sıralama ve beklenen karşılaştırma sayısı ile QuickSelect incelenir. Monte Carlo yöntemiyle π tahmini, Miller–Rabin asallık testi, Karger minimum kesim algoritması ve sözde rastgele sayı üretimi de bölümün konuları arasındadır.

- [🖼️Sunum-Rastgele Algoritmalar (HTML)](../files/algorithms/slides/Bolum_12_Rastgele.html)
- [📄Sunum-Rastgele Algoritmalar (PDF)](../files/algorithms/pdf/Bolum_12_Rastgele.pdf)
- [📝Çalışma Soruları - Rastgele Algoritmalar (HTML)](../files/algorithms/slides/Bolum_12_Rastgele_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter08/src)

---

### Bölüm 13: Çevrimiçi Algoritmalar

Çevrimiçi algoritmalar girdiyi parça parça alır ve geleceği bilmeden geri alınamaz kararlar verir. Bu algoritmaların başarısı, tüm girdiyi önceden bilen en iyi çevrimdışı algoritmayla kıyaslayan rekabetçi analiz ve düşman modeliyle ölçülür. Bölümde kayak kiralama problemi ve alt sınırı, FIFO, LRU ve OPT politikalarıyla sayfalama, Belady anomalisi ve rastgele işaretleme algoritması, liste güncellemede öne taşı (MTF) kuralı ele alınır. Veri akışı modelinde hareketli ortalama, çevrimiçi ortanca, rezervuar örnekleme ve kayan hash ile örüntü arama, son olarak da artımlı öğrenme incelenir.

- [🖼️Sunum-Çevrimiçi Algoritmalar (HTML)](../files/algorithms/slides/Bolum_13_Cevrimici.html)
- [📄Sunum-Çevrimiçi Algoritmalar (PDF)](../files/algorithms/pdf/Bolum_13_Cevrimici.pdf)
- [📝Çalışma Soruları - Çevrimiçi Algoritmalar (HTML)](../files/algorithms/slides/Bolum_13_Cevrimici_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter09/src)

---

### Bölüm 14: Paralel Algoritmalar

Paralel algoritmalar, hesaplamayı birden çok işlem birimine bölerek çalışma süresini kısaltmayı ve büyük veri kümelerini işlenebilir kılmayı amaçlar. Bölümde Flynn sınıflandırması, bellek mimarileri ve PRAM modeli ile hızlanma, verimlilik, maliyet, Amdahl yasası ve iş–derinlik ölçütleri tanıtılır. Paralel toplama ve önek toplamı (Hillis–Steele ve Blelloch), boru hattı ve boru hatlı ağaç, paralel birleştirme sıralaması, MapReduce ve veri paralelliğiyle matris çarpımı örnekleri işlenir. Yarış durumu, eşzamanlı çizge gezinme ve Java'daki paralellik araçları da ele alınır.

- [🖼️Sunum-Paralel Algoritmalar (HTML)](../files/algorithms/slides/Bolum_14_Paralel.html)
- [📄Sunum-Paralel Algoritmalar (PDF)](../files/algorithms/pdf/Bolum_14_Paralel.pdf)
- [📝Çalışma Soruları - Paralel Algoritmalar (HTML)](../files/algorithms/slides/Bolum_14_Paralel_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms/tree/main/Chapter10/src)
