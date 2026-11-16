---
title: "Algorithms"
collection: teaching
type: "Undergraduate"
permalink: /teaching/algorithms/
venue: "Giresun University, Computer Engineering"
date: 2026-01-07
location: "Giresun, Turkey"
og_image: https://sercankulcu.github.io/courses-pdfs/covers/algoritmalar.jpg
course_language: tr
textbook:
  name: "Algoritmalar"
  url: /books/algoritmalar/
---

![algorithms](/images/teaching/teaching-algorithms.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} 
An algorithm is a finite and well-defined sequence of steps for solving a problem or performing a computation. Algorithms form the foundation of software systems and are used in tasks ranging from sorting and searching to graph processing, optimization, text analysis, and scientific computing. This course lays the foundations: how to measure an algorithm's running time and memory use with asymptotic notation, recurrences and the Master Theorem, and how these tools apply to fundamental problems. It covers sorting and searching, graph algorithms (traversal, shortest paths, minimum spanning trees and network flow) and string algorithms (pattern matching, compression and tries), comparing alternative solutions by correctness, complexity and practical trade-offs. Algorithm-design paradigms, hard problems and other models of computation continue in [Advanced Algorithms](/teaching/advanced-algorithms/).

---

## Ders Kitabı

[📕 Algoritmalar (PDF, 11 MB)](https://sercankulcu.github.io/courses-pdfs/algorithms/Algoritmalar.pdf)

---

## Başlangıç Kaynakları

* [Algoritmalarda Önemli İsimler (HTML)](/files/algorithms/Algorithms_Important_People.html)
* [Algoritmalar İçin Ön Bilgiler (HTML)](/files/algorithms/Algorithms_Prerequisites.html)
* [Dersin Haritası (HTML)](/files/algorithms/ders_haritasi.html)
* [Terim Sözlüğü (HTML)](/files/algorithms/sozluk.html)

---

## Kısım I: Temeller

### Bölüm 1: Giriş ve Algoritma Karmaşıklığı

Algoritma, bir problemi sonlu sayıda ve iyi tanımlanmış adımla çözen yöntemdir. Bölümün ilk kısmında algoritma kavramı gündelik örneklerle tanıtılır; sabit, doğrusal, karekök, kübik, faktöriyel ve üstel zaman alan örnekler üzerinden çalışma süresinin girdi boyutuyla nasıl büyüdüğü gösterilir ve Öklid algoritmasının neden hızlı olduğu açıklanır. İkinci kısımda adım sayma, en iyi, en kötü ve ortalama durum, alan karmaşıklığı ile Büyük O, Omega ve Teta gösterimleri ele alınır. Döngülerin toplam formülleriyle çözümlenmesi, yineleme bağıntılarının kurulup Ana Teorem ile çözülmesi örnek fonksiyonlar üzerinde işlenir; amortize analize de kısaca değinilir.

- [🖼️Sunum-Giriş (HTML)](/files/algorithms/slides/Bolum_01_01_Giris.html)
- [📄Sunum-Giriş (PDF)](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_01_01_Giris.pdf)
- [📖Ders Notu - Giriş (HTML)](/files/algorithms/notlar/Bolum_01_01_Giris_Ders_Notu.html)
- [📝Çalışma Soruları - Giriş (HTML)](/files/algorithms/slides/Bolum_01_01_Giris_Calisma_Sorulari.html)
  - [🕹️Algoritma Karmaşıklığı Analizi (HTML)](/files/algorithms/slides/Bolum_01_Algorithm_Complexity.html)
- [🖼️Sunum-Algoritma Karmaşıklığı (HTML)](/files/algorithms/slides/Bolum_01_02_Algoritma_Karmasikligi.html)
- [📄Sunum-Algoritma Karmaşıklığı (PDF)](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_01_02_Algoritma_Karmasikligi.pdf)
- [📖Ders Notu - Algoritma Karmaşıklığı (HTML)](/files/algorithms/notlar/Bolum_01_02_Algoritma_Karmasikligi_Ders_Notu.html)
- [📝Çalışma Soruları - Algoritma Karmaşıklığı (HTML)](/files/algorithms/slides/Bolum_01_02_Algoritma_Karmasikligi_Calisma_Sorulari.html)
  - [🕹️Asimptotik Büyüme Gezgini (HTML)](/files/algorithms/slides/Bolum_01_Asymptotic_Growth_Explorer.html)
  - [🕹️Özyineleme ve Ana Teorem (HTML)](/files/algorithms/slides/Bolum_01_Recurrence_Master_Theorem.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum01/src)

---

### Bölüm 2: Sıralama Algoritmaları

Sıralama, verinin belirli bir düzene sokulmasıdır ve pek çok algoritmanın ön adımını oluşturur. Bölümde kabarcık, eklemeli, seçimli ve Shell sıralaması gibi temel yöntemler ile birleştirme sıralaması, hızlı sıralama ve heap sort adım adım izlenir ve Java kodlarıyla çözümlenir. Karşılaştırmaya dayalı sıralamanın Ω(n log n) alt sınırı gösterilir; saymalı, basamak ve kova sıralaması gibi doğrusal zamanlı yöntemlerle gerçek kütüphanelerde kullanılan Timsort tanıtılır. Algoritmalar kararlılık, ek bellek ve karmaşıklık bakımından karşılaştırılır.

- [🖼️Sunum-Sıralama Algoritmaları (HTML)](/files/algorithms/slides/Bolum_02_Siralama_Algoritmalari.html)
- [📄Sunum-Sıralama Algoritmaları (PDF)](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_02_Siralama_Algoritmalari.pdf)
- [📖Ders Notu - Sıralama Algoritmaları (HTML)](/files/algorithms/notlar/Bolum_02_Siralama_Algoritmalari_Ders_Notu.html)
- [📝Çalışma Soruları - Sıralama Algoritmaları (HTML)](/files/algorithms/slides/Bolum_02_Siralama_Algoritmalari_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum02/src)

- [🕹️Sıralama Algoritmaları (HTML)](/files/algorithms/slides/Bolum_02_Sorting.html)
- [🕹️Sıralama Yarışı (HTML)](/files/algorithms/slides/Bolum_02_Sorting_Race.html)
- [🕹️Sıralama Özellikleri Laboratuvarı (HTML)](/files/algorithms/slides/Bolum_02_Sorting_Properties_Lab.html)

---

### Bölüm 3: Arama Algoritmaları

Arama, bir veri kümesinde istenen öğenin yerini bulma problemidir. Bölümde bekçili sürümüyle birlikte doğrusal arama, sıralı dizide ikili arama ve bu yöntemin örtük bir ikili arama ağacı olarak yorumu, tekrarlı öğelerde ilk konumun bulunması anlatılır. Hash fonksiyonları, doğrusal yoklama ve zincirleme ile hash tablosunda arama ve yük faktörünün maliyete etkisi incelenir. Ara değer arama, atlayarak arama ve üstel arama da ele alınır; algoritmalar aynı dizideki yoklama sayılarıyla karşılaştırılır ve hangi durumda hangisinin uygun olduğu tartışılır.

- [🖼️Sunum-Arama Algoritmaları (HTML)](/files/algorithms/slides/Bolum_03_Arama_Algoritmalari.html)
- [📄Sunum-Arama Algoritmaları (PDF)](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_03_Arama_Algoritmalari.pdf)
- [📖Ders Notu - Arama Algoritmaları (HTML)](/files/algorithms/notlar/Bolum_03_Arama_Algoritmalari_Ders_Notu.html)
- [📝Çalışma Soruları - Arama Algoritmaları (HTML)](/files/algorithms/slides/Bolum_03_Arama_Algoritmalari_Calisma_Sorulari.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum03/src)

- [🕹️Arama Algoritmaları (HTML)](/files/algorithms/slides/Bolum_03_Search.html)
- [🕹️Hash ve Ara Değer Arama (HTML)](/files/algorithms/slides/Bolum_03_Hash_Interpolation_Search.html)
- [🕹️Üstel Arama (HTML)](/files/algorithms/slides/Bolum_03_Exponential_Search.html)

---

## Kısım II: Çizge ve Dizgi Algoritmaları

### Bölüm 4: Çizge Algoritmaları

Çizgeler, yol ağlarından sosyal ağlara kadar düğümler ve bağlantılarla ifade edilebilen her yapıyı modellemekte kullanılır. Bölüm, çizgenin bellekte gösterimi, derinlik öncelikli (DFS) ve genişlik öncelikli (BFS) gezinme, Tarjan ve Kosaraju algoritmalarıyla güçlü bağlantılı bileşenler, topolojik sıralama ve iki parçalılık testiyle başlar. Ardından gevşetme işlemi üzerine kurulan Dijkstra, Bellman-Ford, Floyd-Warshall ve A* en kısa yol algoritmaları, kesim ve döngü özelliklerine dayanan Kruskal, Prim, Borůvka ve ters silme minimum kapsayan ağaç algoritmaları işlenir. Son kısımda artık ağ, artış yolu ve maksimum akış–minimum kesim teoremi ile Ford-Fulkerson, Edmonds-Karp, Dinic ve itme–yeniden etiketleme algoritmaları ele alınır.

- [🖼️Sunum-Çizge Gezinme Algoritmaları (HTML)](/files/algorithms/slides/Bolum_04_01_Cizge_Gezinme_Algoritmalari.html)
- [📄Sunum-Çizge Gezinme Algoritmaları (PDF)](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_04_01_Cizge_Gezinme_Algoritmalari.pdf)
- [📖Ders Notu - Çizge Gezinme Algoritmaları (HTML)](/files/algorithms/notlar/Bolum_04_01_Cizge_Gezinme_Algoritmalari_Ders_Notu.html)
- [📝Çalışma Soruları - Çizge Gezinme Algoritmaları (HTML)](/files/algorithms/slides/Bolum_04_01_Cizge_Gezinme_Algoritmalari_Calisma_Sorulari.html)
  - [🕹️Çizge Gezinme Simülatörü (HTML)](/files/algorithms/slides/Bolum_04_Graph_Traversal.html)
  - [🕹️Çizge Yapısı Algoritmaları Simülatörü (HTML)](/files/algorithms/slides/Bolum_04_Graph_Structure_Algorithms.html)
  - [🕹️İki Parçalılık, Döngü ve Köprü Simülatörü (HTML)](/files/algorithms/slides/Bolum_04_Bipartite_Cycle_Bridge.html)
- [🖼️Sunum-En Kısa Yol Algoritmaları (HTML)](/files/algorithms/slides/Bolum_04_02_En_Kisa_Yol_Algoritmalari.html)
- [📄Sunum-En Kısa Yol Algoritmaları (PDF)](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_04_02_En_Kisa_Yol_Algoritmalari.pdf)
- [📖Ders Notu - En Kısa Yol Algoritmaları (HTML)](/files/algorithms/notlar/Bolum_04_02_En_Kisa_Yol_Algoritmalari_Ders_Notu.html)
- [📝Çalışma Soruları - En Kısa Yol Algoritmaları (HTML)](/files/algorithms/slides/Bolum_04_02_En_Kisa_Yol_Algoritmalari_Calisma_Sorulari.html)
  - [🕹️En Kısa Yol Algoritmaları Simülatörü (HTML)](/files/algorithms/slides/Bolum_04_Shortest_Path.html)
  - [🕹️A* Yol Bulma Simülatörü (HTML)](/files/algorithms/slides/Bolum_04_AStar.html)
- [🖼️Sunum-Minimum Kapsayan Ağaç Algoritmaları (HTML)](/files/algorithms/slides/Bolum_04_03_Minimum_Kapsayan_Agac_Algoritmalari.html)
- [📄Sunum-Minimum Kapsayan Ağaç Algoritmaları (PDF)](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_04_03_Minimum_Kapsayan_Agac_Algoritmalari.pdf)
- [📖Ders Notu - Minimum Kapsayan Ağaç Algoritmaları (HTML)](/files/algorithms/notlar/Bolum_04_03_Minimum_Kapsayan_Agac_Algoritmalari_Ders_Notu.html)
- [📝Çalışma Soruları - Minimum Kapsayan Ağaç Algoritmaları (HTML)](/files/algorithms/slides/Bolum_04_03_Minimum_Kapsayan_Agac_Algoritmalari_Calisma_Sorulari.html)
  - [🕹️Minimum Kapsayan Ağaç Simülatörü (HTML)](/files/algorithms/slides/Bolum_04_MST.html)
- [🖼️Sunum-Ağ Akışı (HTML)](/files/algorithms/slides/Bolum_04_04_Ag_Akisi.html)
- [📄Sunum-Ağ Akışı (PDF)](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_04_04_Ag_Akisi.pdf)
- [📖Ders Notu - Ağ Akışı (HTML)](/files/algorithms/notlar/Bolum_04_04_Ag_Akisi_Ders_Notu.html)
- [📝Çalışma Soruları - Ağ Akışı (HTML)](/files/algorithms/slides/Bolum_04_04_Ag_Akisi_Calisma_Sorulari.html)
  - [🕹️Ağ Akışı Simülatörü (HTML)](/files/algorithms/slides/Bolum_04_Network_Flow.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum04/src)

---

### Bölüm 5: Dizgi Algoritmaları

Dizgi algoritmaları metin arama, veri sıkıştırma ve biyolojik dizi çözümlemesi gibi alanların temelini oluşturur. Bölümün ilk kısmında kaba kuvvet, Knuth-Morris-Pratt, Boyer-Moore ve Rabin-Karp örüntü eşleştirme algoritmaları ile RLE, LZW ve LZ78 sıkıştırma yöntemleri işlenir. İkinci kısım sözlüksel sıra ve LSD/MSD basamak sıralamasıyla dizgi sıralamayı, düzenli ifadeleri, sonlu durum makinelerini, Levenshtein düzenleme uzaklığını, sonek dizisini ve Burrows–Wheeler dönüşümünü kapsar. Üçüncü kısımda önek ağacı (trie) ekleme, arama, silme ve otomatik tamamlama işlemleriyle anlatılır; üçlü arama trie'si, sıkıştırılmış trie, sonek trie'si ve Aho–Corasick algoritması da tanıtılır.

- [🖼️Sunum-Dizgi Eşleştirme ve Sıkıştırma (HTML)](/files/algorithms/slides/Bolum_05_01_Dizgi_Eslestirme_ve_Sikistirma.html)
- [📄Sunum-Dizgi Eşleştirme ve Sıkıştırma (PDF)](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_05_01_Dizgi_Eslestirme_ve_Sikistirma.pdf)
- [📖Ders Notu - Dizgi Eşleştirme ve Sıkıştırma (HTML)](/files/algorithms/notlar/Bolum_05_01_Dizgi_Eslestirme_ve_Sikistirma_Ders_Notu.html)
- [📝Çalışma Soruları - Dizgi Eşleştirme ve Sıkıştırma (HTML)](/files/algorithms/slides/Bolum_05_01_Dizgi_Eslestirme_ve_Sikistirma_Calisma_Sorulari.html)
  - [🕹️Dizgi Eşleştirme Algoritmaları (HTML)](/files/algorithms/slides/Bolum_05_String_Matching.html)
  - [🕹️Önek Fonksiyonu ve Z Algoritması (HTML)](/files/algorithms/slides/Bolum_05_Prefix_Z_Algorithms.html)
  - [🕹️Dizgi Sıkıştırma Algoritmaları (HTML)](/files/algorithms/slides/Bolum_05_String_Compression.html)
- [🖼️Sunum-İleri Dizgi Algoritmaları (HTML)](/files/algorithms/slides/Bolum_05_02_Ileri_Dizgi_Algoritmalari.html)
- [📄Sunum-İleri Dizgi Algoritmaları (PDF)](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_05_02_Ileri_Dizgi_Algoritmalari.pdf)
- [📖Ders Notu - İleri Dizgi Algoritmaları (HTML)](/files/algorithms/notlar/Bolum_05_02_Ileri_Dizgi_Algoritmalari_Ders_Notu.html)
- [📝Çalışma Soruları - İleri Dizgi Algoritmaları (HTML)](/files/algorithms/slides/Bolum_05_02_Ileri_Dizgi_Algoritmalari_Calisma_Sorulari.html)
  - [🕹️Dizgi Sıralama: LSD Basamak Sıralaması (HTML)](/files/algorithms/slides/Bolum_05_String_Sorting.html)
  - [🕹️Sonlu Durum Makinesiyle Dizgi Ayrıştırma (HTML)](/files/algorithms/slides/Bolum_05_String_Parsing.html)
  - [🕹️Dizgi Benzerliği: Levenshtein Uzaklığı (HTML)](/files/algorithms/slides/Bolum_05_String_Similarity.html)
  - [🕹️Dizgi Dönüşümü: Burrows–Wheeler Dönüşümü (HTML)](/files/algorithms/slides/Bolum_05_String_Transformation.html)
- [🖼️Sunum-Trie Veri Yapısı (HTML)](/files/algorithms/slides/Bolum_05_03_Trie_Veri_Yapisi.html)
- [📄Sunum-Trie Veri Yapısı (PDF)](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_05_03_Trie_Veri_Yapisi.pdf)
- [📖Ders Notu - Trie Veri Yapısı (HTML)](/files/algorithms/notlar/Bolum_05_03_Trie_Veri_Yapisi_Ders_Notu.html)
- [📝Çalışma Soruları - Trie Veri Yapısı (HTML)](/files/algorithms/slides/Bolum_05_03_Trie_Veri_Yapisi_Calisma_Sorulari.html)
  - [🕹️Trie ve Sonek Algoritmaları (HTML)](/files/algorithms/slides/Bolum_05_Trie_Suffix_Algorithms.html)
- [💻Kod Örnekleri (GitHub)](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum05/src)

---

## Devamı: İleri Algoritmalar

Tasarım paradigmaları (böl ve fethet, açgözlü algoritmalar, dinamik programlama), zor problemler (geri izleme, dal sınır, yaklaşım algoritmaları) ve diğer hesaplama modelleri (rastgele, çevrim içi ve paralel algoritmalar) [İleri Algoritmalar](/teaching/advanced-algorithms/) dersinde işlenir.
