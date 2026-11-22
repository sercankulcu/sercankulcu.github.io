---
title: "Algorithms"
lang_toggle: true
collection: teaching
type: "Undergraduate"
permalink: /teaching/algorithms/
venue: "Giresun University, Computer Engineering"
date: 2026-01-07
location: "Giresun, Turkey"
og_image: https://sercankulcu.github.io/courses-pdfs/covers/algoritmalar.jpg
course_language: [tr, en]
textbook:
  name: "Algoritmalar"
  url: /books/algoritmalar/
---

![algorithms](/images/teaching/teaching-algorithms.webp){: .align-left width="200" height="150" style="float: left; margin-right: 10px;"} 
An algorithm is a finite and well-defined sequence of steps for solving a problem or performing a computation. Algorithms form the foundation of software systems and are used in tasks ranging from sorting and searching to graph processing, optimization, text analysis, and scientific computing. This course lays the foundations: how to measure an algorithm's running time and memory use with asymptotic notation, recurrences and the Master Theorem, and how these tools apply to fundamental problems. It covers sorting and searching, graph algorithms (traversal, shortest paths, minimum spanning trees and network flow) and string algorithms (pattern matching, compression and tries), comparing alternative solutions by correctness, complexity and practical trade-offs. Algorithm-design paradigms, hard problems and other models of computation continue in [Advanced Algorithms](/teaching/advanced-algorithms/).


<div data-lt="tr" lang="tr" markdown="1">

---

## Ders Kitabı

[📕 Algoritmalar (PDF, 12 MB)](https://sercankulcu.github.io/courses-pdfs/algorithms/Algoritmalar.pdf)

---

## Başlangıç Kaynakları

* [Algoritmalarda Önemli İsimler (HTML)](/files/algorithms/Algorithms_Important_People.html)
* [Algoritmalar İçin Ön Bilgiler (HTML)](/files/algorithms/Algorithms_Prerequisites.html)
* [Dersin Haritası (HTML)](/files/algorithms/Ders_Haritasi.html)
* [Terim Sözlüğü (HTML)](/files/algorithms/Sozluk.html)

---

## Kısım I: Temeller

### Bölüm 1: Giriş

Algoritma, bir problemi sonlu sayıda ve iyi tanımlanmış adımla çözen yöntemdir. Bölümde algoritma kavramı ve bir algoritmanın taşıması gereken özellikler gündelik örneklerle tanıtılır; algoritmadan koda geçiş ve algoritma türleri ele alınır. Girdi boyutu, satır satır işlem sayımı ve büyüme tablosuyla sabit, doğrusal, karekök, kübik, faktöriyel ve üstel zaman alan örnekler üzerinden çalışma süresinin girdi boyutuyla nasıl büyüdüğü gösterilir ve Öklid algoritmasının neden hızlı olduğu açıklanır.

- [🖼️ Sunum](/files/algorithms/sunumlar/Bolum_01_Giris.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_01_Giris.pdf) · [📖 Ders notu](/files/algorithms/notlar/Bolum_01_Giris_Ders_Notu.html) · [📝 Sorular](/files/algorithms/sunumlar/Bolum_01_Giris_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum01/src)
- 🕹️ **Simülatörler:** [Algoritma Karmaşıklığı Analizi](/files/algorithms/sunumlar/Bolum_01_Algorithm_Complexity.html)

---

### Bölüm 2: Algoritma Karmaşıklığı

Bölümde adım sayma, en iyi, en kötü ve ortalama durum, alan karmaşıklığı ile Büyük O, Omega ve Teta gösterimleri ele alınır. Döngülerin toplam formülleriyle çözümlenmesi, yineleme bağıntılarının açma yöntemi ve özyineleme ağacıyla kurulup Ana Teorem ile çözülmesi örnek fonksiyonlar üzerinde işlenir; amortize analize de kısaca değinilir.

- [🖼️ Sunum](/files/algorithms/sunumlar/Bolum_02_Algoritma_Karmasikligi.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_02_Algoritma_Karmasikligi.pdf) · [📖 Ders notu](/files/algorithms/notlar/Bolum_02_Algoritma_Karmasikligi_Ders_Notu.html) · [📝 Sorular](/files/algorithms/sunumlar/Bolum_02_Algoritma_Karmasikligi_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum02/src)
- 🕹️ **Simülatörler:** [Asimptotik Büyüme Gezgini](/files/algorithms/sunumlar/Bolum_02_Asymptotic_Growth_Explorer.html) · [Özyineleme ve Ana Teorem](/files/algorithms/sunumlar/Bolum_02_Recurrence_Master_Theorem.html)

---

### Bölüm 3: Sıralama Algoritmaları

Sıralama, verinin belirli bir düzene sokulmasıdır ve pek çok algoritmanın ön adımını oluşturur. Bölümde kabarcık, eklemeli, seçimli ve Shell sıralaması gibi temel yöntemler ile birleştirme sıralaması, hızlı sıralama ve heap sort adım adım izlenir ve Java kodlarıyla çözümlenir. Karşılaştırmaya dayalı sıralamanın Ω(n log n) alt sınırı gösterilir; saymalı, basamak ve kova sıralaması gibi doğrusal zamanlı yöntemlerle gerçek kütüphanelerde kullanılan Timsort tanıtılır. Algoritmalar kararlılık, ek bellek ve karmaşıklık bakımından karşılaştırılır.

- [🖼️ Sunum](/files/algorithms/sunumlar/Bolum_03_Siralama_Algoritmalari.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_03_Siralama_Algoritmalari.pdf) · [📖 Ders notu](/files/algorithms/notlar/Bolum_03_Siralama_Algoritmalari_Ders_Notu.html) · [📝 Sorular](/files/algorithms/sunumlar/Bolum_03_Siralama_Algoritmalari_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum03/src)
- 🕹️ **Simülatörler:** [Sıralama Algoritmaları](/files/algorithms/sunumlar/Bolum_03_Sorting.html) · [Sıralama Yarışı](/files/algorithms/sunumlar/Bolum_03_Sorting_Race.html) · [Sıralama Özellikleri Laboratuvarı](/files/algorithms/sunumlar/Bolum_03_Sorting_Properties_Lab.html)

---

### Bölüm 4: Arama Algoritmaları

Arama, bir veri kümesinde istenen öğenin yerini bulma problemidir. Bölümde bekçili sürümüyle birlikte doğrusal arama, sıralı dizide ikili arama ve bu yöntemin örtük bir ikili arama ağacı olarak yorumu, tekrarlı öğelerde ilk konumun bulunması anlatılır. Hash fonksiyonları, doğrusal yoklama ve zincirleme ile hash tablosunda arama ve yük faktörünün maliyete etkisi incelenir. Ara değer arama, atlayarak arama ve üstel arama da ele alınır; algoritmalar aynı dizideki yoklama sayılarıyla karşılaştırılır ve hangi durumda hangisinin uygun olduğu tartışılır.

- [🖼️ Sunum](/files/algorithms/sunumlar/Bolum_04_Arama_Algoritmalari.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_04_Arama_Algoritmalari.pdf) · [📖 Ders notu](/files/algorithms/notlar/Bolum_04_Arama_Algoritmalari_Ders_Notu.html) · [📝 Sorular](/files/algorithms/sunumlar/Bolum_04_Arama_Algoritmalari_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum04/src)
- 🕹️ **Simülatörler:** [Arama Algoritmaları](/files/algorithms/sunumlar/Bolum_04_Search.html) · [Hash ve Ara Değer Arama](/files/algorithms/sunumlar/Bolum_04_Hash_Interpolation_Search.html) · [Üstel Arama](/files/algorithms/sunumlar/Bolum_04_Exponential_Search.html)

---

## Kısım II: Çizge Algoritmaları

### Bölüm 5: Çizge Gezinme Algoritmaları

Çizgeler, yol ağlarından sosyal ağlara kadar düğümler ve bağlantılarla ifade edilebilen her yapıyı modellemekte kullanılır. Bölüm, çizgenin bellekte komşuluk listesi ve matrisiyle gösterimi, derinlik öncelikli (DFS) ve genişlik öncelikli (BFS) gezinme ile başlar. Ardından Tarjan ve Kosaraju algoritmalarıyla güçlü bağlantılı bileşenler, Kahn algoritması ve DFS ile topolojik sıralama ve iki parçalılık testi işlenir.

- [🖼️ Sunum](/files/algorithms/sunumlar/Bolum_05_Cizge_Gezinme_Algoritmalari.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_05_Cizge_Gezinme_Algoritmalari.pdf) · [📖 Ders notu](/files/algorithms/notlar/Bolum_05_Cizge_Gezinme_Algoritmalari_Ders_Notu.html) · [📝 Sorular](/files/algorithms/sunumlar/Bolum_05_Cizge_Gezinme_Algoritmalari_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum05/src)
- 🕹️ **Simülatörler:** [Çizge Gezinme Simülatörü](/files/algorithms/sunumlar/Bolum_05_Graph_Traversal.html) · [Çizge Yapısı Algoritmaları Simülatörü](/files/algorithms/sunumlar/Bolum_05_Graph_Structure_Algorithms.html) · [İki Parçalılık, Döngü ve Köprü Simülatörü](/files/algorithms/sunumlar/Bolum_05_Bipartite_Cycle_Bridge.html)

---

### Bölüm 6: En Kısa Yol Algoritmaları

Bölümde en kısa yol problem türleri ve hepsinin üzerine kurulduğu gevşetme işlemi tanıtılır. Dijkstra algoritması öncelikli kuyrukla, negatif kenarlara izin veren Bellman-Ford algoritması negatif döngü tespitiyle, tüm çiftler arası en kısa yollar Floyd-Warshall algoritmasıyla çözülür. Sezgisel fonksiyonlarla yönlendirilen A* araması ve ağırlıksız çizgede BFS de ele alınır; algoritmalar örnek çizgeler üzerinde karşılaştırılır.

- [🖼️ Sunum](/files/algorithms/sunumlar/Bolum_06_En_Kisa_Yol_Algoritmalari.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_06_En_Kisa_Yol_Algoritmalari.pdf) · [📖 Ders notu](/files/algorithms/notlar/Bolum_06_En_Kisa_Yol_Algoritmalari_Ders_Notu.html) · [📝 Sorular](/files/algorithms/sunumlar/Bolum_06_En_Kisa_Yol_Algoritmalari_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum06/src)
- 🕹️ **Simülatörler:** [En Kısa Yol Algoritmaları Simülatörü](/files/algorithms/sunumlar/Bolum_06_Shortest_Path.html) · [A* Yol Bulma Simülatörü](/files/algorithms/sunumlar/Bolum_06_AStar.html)

---

### Bölüm 7: Minimum Kapsayan Ağaç Algoritmaları

Minimum kapsayan ağaç, bir çizgenin bütün düğümlerini en düşük toplam ağırlıkla birbirine bağlar. Bölümde kesim ve döngü özellikleri ile bunlara dayanan Kruskal, Prim, Borůvka ve ters silme algoritmaları işlenir. Kruskal için ayrık kümeler (union-find) yapısı yol kısaltma ve rütbeye göre birleştirmeyle anlatılır; Prim algoritmasının dizi ve öncelikli kuyruk sürümleri ile Dijkstra algoritmasından farkı gösterilir.

- [🖼️ Sunum](/files/algorithms/sunumlar/Bolum_07_Minimum_Kapsayan_Agac_Algoritmalari.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_07_Minimum_Kapsayan_Agac_Algoritmalari.pdf) · [📖 Ders notu](/files/algorithms/notlar/Bolum_07_Minimum_Kapsayan_Agac_Algoritmalari_Ders_Notu.html) · [📝 Sorular](/files/algorithms/sunumlar/Bolum_07_Minimum_Kapsayan_Agac_Algoritmalari_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum07/src)
- 🕹️ **Simülatörler:** [Minimum Kapsayan Ağaç Simülatörü](/files/algorithms/sunumlar/Bolum_07_MST.html)

---

### Bölüm 8: Ağ Akışı

Ağ akışı, kapasiteli bir ağda kaynaktan hedefe gönderilebilecek en büyük akışı arar. Bölümde kapasite ve korunum kısıtları, artık ağ, artış yolu ve darboğaz kavramları ile maksimum akış–minimum kesim teoremi anlatılır. Ford-Fulkerson yöntemi ile Edmonds-Karp, Dinic ve itme–yeniden etiketleme algoritmaları karmaşıklıkları ve uygulamalarıyla birlikte ele alınır.

- [🖼️ Sunum](/files/algorithms/sunumlar/Bolum_08_Ag_Akisi.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_08_Ag_Akisi.pdf) · [📖 Ders notu](/files/algorithms/notlar/Bolum_08_Ag_Akisi_Ders_Notu.html) · [📝 Sorular](/files/algorithms/sunumlar/Bolum_08_Ag_Akisi_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum08/src)
- 🕹️ **Simülatörler:** [Ağ Akışı Simülatörü](/files/algorithms/sunumlar/Bolum_08_Network_Flow.html)

---

## Kısım III: Dizgi Algoritmaları

### Bölüm 9: Dizgi Eşleştirme ve Sıkıştırma

Dizgi algoritmaları metin arama, veri sıkıştırma ve biyolojik dizi çözümlemesi gibi alanların temelini oluşturur. Bölümün ilk kısmında kaba kuvvet, Knuth-Morris-Pratt, Boyer-Moore ve Rabin-Karp örüntü eşleştirme algoritmaları işlenir ve karşılaştırılır. İkinci kısımda kayıpsız sıkıştırma; çalışma uzunluğu kodlaması (RLE), LZW ve LZ78 yöntemleriyle anlatılır.

- [🖼️ Sunum](/files/algorithms/sunumlar/Bolum_09_Dizgi_Eslestirme_ve_Sikistirma.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_09_Dizgi_Eslestirme_ve_Sikistirma.pdf) · [📖 Ders notu](/files/algorithms/notlar/Bolum_09_Dizgi_Eslestirme_ve_Sikistirma_Ders_Notu.html) · [📝 Sorular](/files/algorithms/sunumlar/Bolum_09_Dizgi_Eslestirme_ve_Sikistirma_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum09/src)
- 🕹️ **Simülatörler:** [Dizgi Eşleştirme Algoritmaları](/files/algorithms/sunumlar/Bolum_09_String_Matching.html) · [Önek Fonksiyonu ve Z Algoritması](/files/algorithms/sunumlar/Bolum_09_Prefix_Z_Algorithms.html) · [Dizgi Sıkıştırma Algoritmaları](/files/algorithms/sunumlar/Bolum_09_String_Compression.html)

---

### Bölüm 10: İleri Dizgi Algoritmaları

Bölüm, sözlüksel sıra ile LSD ve MSD basamak sıralamasıyla dizgi sıralamadan başlar. Düzenli ifadeler, sonlu durum makineleri ve örüntü eşleme otomatı, Levenshtein düzenleme uzaklığının dinamik programlamayla hesaplanması, sonek dizisi ve Burrows–Wheeler dönüşümü işlenir.

- [🖼️ Sunum](/files/algorithms/sunumlar/Bolum_10_Ileri_Dizgi_Algoritmalari.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_10_Ileri_Dizgi_Algoritmalari.pdf) · [📖 Ders notu](/files/algorithms/notlar/Bolum_10_Ileri_Dizgi_Algoritmalari_Ders_Notu.html) · [📝 Sorular](/files/algorithms/sunumlar/Bolum_10_Ileri_Dizgi_Algoritmalari_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum10/src)
- 🕹️ **Simülatörler:** [Dizgi Sıralama: LSD Basamak Sıralaması](/files/algorithms/sunumlar/Bolum_10_String_Sorting.html) · [Sonlu Durum Makinesiyle Dizgi Ayrıştırma](/files/algorithms/sunumlar/Bolum_10_String_Parsing.html) · [Dizgi Benzerliği: Levenshtein Uzaklığı](/files/algorithms/sunumlar/Bolum_10_String_Similarity.html) · [Dizgi Dönüşümü: Burrows–Wheeler Dönüşümü](/files/algorithms/sunumlar/Bolum_10_String_Transformation.html)

---

### Bölüm 11: Trie Veri Yapısı

Önek ağacı (trie), dizgileri ortak öneklerini paylaşarak saklar. Bölümde trie ekleme, arama, silme ve otomatik tamamlama işlemleriyle anlatılır; joker karakterli arama ve yazım denetimi örnekleri verilir. Üçlü arama trie'si, sıkıştırılmış trie, sonek trie'si ve birçok örüntüyü tek geçişte arayan Aho–Corasick algoritması da tanıtılır.

- [🖼️ Sunum](/files/algorithms/sunumlar/Bolum_11_Trie_Veri_Yapisi.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Bolum_11_Trie_Veri_Yapisi.pdf) · [📖 Ders notu](/files/algorithms/notlar/Bolum_11_Trie_Veri_Yapisi_Ders_Notu.html) · [📝 Sorular](/files/algorithms/sunumlar/Bolum_11_Trie_Veri_Yapisi_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/algorithms-java/tree/main/Bolum11/src)
- 🕹️ **Simülatörler:** [Trie ve Sonek Algoritmaları](/files/algorithms/sunumlar/Bolum_11_Trie_Suffix_Algorithms.html)

---

## Devamı: İleri Algoritmalar

Tasarım paradigmaları (böl ve fethet, açgözlü algoritmalar, dinamik programlama), zor problemler (geri izleme, dal sınır, yaklaşım algoritmaları) ve diğer hesaplama modelleri (rastgele, çevrim içi ve paralel algoritmalar) [İleri Algoritmalar](/teaching/advanced-algorithms/) dersinde işlenir.

</div>

<div data-lt="en" lang="en" markdown="1">

---

## Getting Started

* [Dictionary of Terms (HTML)](/files/algorithms/Dictionary.html)

---

## Part I: Foundations

### Chapter 1: Introduction

An algorithm is a method that solves a problem in a finite number of well-defined steps. This chapter introduces the idea of an algorithm and the properties every algorithm must have through everyday examples, then looks at how an algorithm becomes code and at the main kinds of algorithms. Using input size, line-by-line operation counts and a growth table, we follow examples that run in constant, linear, square-root, cubic, factorial and exponential time to see how running time grows with the input, and we explain why Euclid's algorithm is so fast.

- [🖼️ Slides](/files/algorithms/slides/Chapter_01_Introduction.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_01_Introduction.pdf) · [📖 Notes](/files/algorithms/notes/Chapter_01_Introduction_Lecture_Notes.html) · [📝 Questions](/files/algorithms/slides/Chapter_01_Introduction_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/algorithms-java-en/tree/main/Chapter01/src)

---

### Chapter 2: Algorithm Complexity

This chapter gives the tools for measuring cost: counting steps, best, worst and average cases, space complexity, and Big O, Omega and Theta notation. We analyze loops with summation formulas, set up recurrences by unrolling and with recursion trees, and solve them with the Master Theorem on a series of sample functions. A brief look at amortized analysis closes the chapter.

- [🖼️ Slides](/files/algorithms/slides/Chapter_02_Algorithm_Complexity.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_02_Algorithm_Complexity.pdf) · [📖 Notes](/files/algorithms/notes/Chapter_02_Algorithm_Complexity_Lecture_Notes.html) · [📝 Questions](/files/algorithms/slides/Chapter_02_Algorithm_Complexity_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/algorithms-java-en/tree/main/Chapter02/src)

---

### Chapter 3: Sorting Algorithms

Sorting puts data into a given order and is the first step of many other algorithms. We trace the elementary methods (bubble, insertion, selection and Shell sort) and then merge sort, quicksort and heapsort step by step, analyzing each with Java code. The chapter proves the Ω(n log n) lower bound for comparison sorting, introduces linear-time methods such as counting, radix and bucket sort along with Timsort, the algorithm real libraries use, and compares all of them by stability, extra memory and complexity.

- [🖼️ Slides](/files/algorithms/slides/Chapter_03_Sorting_Algorithms.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_03_Sorting_Algorithms.pdf) · [📖 Notes](/files/algorithms/notes/Chapter_03_Sorting_Algorithms_Lecture_Notes.html) · [📝 Questions](/files/algorithms/slides/Chapter_03_Sorting_Algorithms_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/algorithms-java-en/tree/main/Chapter03/src)

---

### Chapter 4: Searching Algorithms

Searching is the problem of locating a wanted item in a collection of data. We cover linear search and its sentinel version, binary search on a sorted array and its reading as an implicit binary search tree, and finding the first position among duplicates. Hash functions, hash-table lookup with linear probing and with chaining, and the effect of the load factor on cost come next, followed by interpolation, jump and exponential search. The algorithms are compared by the number of probes they make on the same array, with a discussion of which one suits which situation.

- [🖼️ Slides](/files/algorithms/slides/Chapter_04_Searching_Algorithms.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_04_Searching_Algorithms.pdf) · [📖 Notes](/files/algorithms/notes/Chapter_04_Searching_Algorithms_Lecture_Notes.html) · [📝 Questions](/files/algorithms/slides/Chapter_04_Searching_Algorithms_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/algorithms-java-en/tree/main/Chapter04/src)

---

## Part II: Graph Algorithms

### Chapter 5: Graph Traversal

Graphs model anything that can be described as nodes and connections, from road networks to social networks. The chapter starts with storing a graph as an adjacency list or an adjacency matrix and with depth-first (DFS) and breadth-first (BFS) traversal. It then covers strongly connected components with Tarjan's and Kosaraju's algorithms, topological sorting with Kahn's algorithm and with DFS, and testing whether a graph is bipartite.

- [🖼️ Slides](/files/algorithms/slides/Chapter_05_Graph_Traversal.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_05_Graph_Traversal.pdf) · [📖 Notes](/files/algorithms/notes/Chapter_05_Graph_Traversal_Lecture_Notes.html) · [📝 Questions](/files/algorithms/slides/Chapter_05_Graph_Traversal_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/algorithms-java-en/tree/main/Chapter05/src)

---

### Chapter 6: Shortest Paths

We introduce the kinds of shortest-path problems and the relaxation step that all shortest-path algorithms are built on. Dijkstra's algorithm is implemented with a priority queue, Bellman–Ford handles negative edges and detects negative cycles, and Floyd–Warshall computes shortest paths between all pairs. A* search guided by heuristic functions and BFS on unweighted graphs are also covered, and the algorithms are compared on sample graphs.

- [🖼️ Slides](/files/algorithms/slides/Chapter_06_Shortest_Paths.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_06_Shortest_Paths.pdf) · [📖 Notes](/files/algorithms/notes/Chapter_06_Shortest_Paths_Lecture_Notes.html) · [📝 Questions](/files/algorithms/slides/Chapter_06_Shortest_Paths_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/algorithms-java-en/tree/main/Chapter06/src)

---

### Chapter 7: Minimum Spanning Trees

A minimum spanning tree connects all the vertices of a graph at the lowest possible total weight. The chapter presents the cut and cycle properties and the algorithms built on them: Kruskal, Prim, Borůvka and reverse-delete. For Kruskal we develop the disjoint-set (union-find) structure with path compression and union by rank; for Prim we give both the array and the priority-queue versions and point out how it differs from Dijkstra's algorithm.

- [🖼️ Slides](/files/algorithms/slides/Chapter_07_Minimum_Spanning_Trees.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_07_Minimum_Spanning_Trees.pdf) · [📖 Notes](/files/algorithms/notes/Chapter_07_Minimum_Spanning_Trees_Lecture_Notes.html) · [📝 Questions](/files/algorithms/slides/Chapter_07_Minimum_Spanning_Trees_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/algorithms-java-en/tree/main/Chapter07/src)

---

### Chapter 8: Network Flow

Network flow asks for the largest flow that can be sent from a source to a sink through a network with capacities. We define capacity and conservation constraints, the residual network, augmenting paths and bottlenecks, and prove the max-flow min-cut theorem. The Ford–Fulkerson method, Edmonds–Karp, Dinic's algorithm and push–relabel are then studied together with their complexity and applications.

- [🖼️ Slides](/files/algorithms/slides/Chapter_08_Network_Flow.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_08_Network_Flow.pdf) · [📖 Notes](/files/algorithms/notes/Chapter_08_Network_Flow_Lecture_Notes.html) · [📝 Questions](/files/algorithms/slides/Chapter_08_Network_Flow_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/algorithms-java-en/tree/main/Chapter08/src)

---

## Part III: String Algorithms

### Chapter 9: String Matching and Compression

String algorithms underlie text search, data compression and the analysis of biological sequences. The first half of the chapter studies and compares the brute-force, Knuth–Morris–Pratt, Boyer–Moore and Rabin–Karp pattern-matching algorithms. The second half turns to lossless compression with run-length encoding (RLE), LZW and LZ78.

- [🖼️ Slides](/files/algorithms/slides/Chapter_09_String_Matching_and_Compression.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_09_String_Matching_and_Compression.pdf) · [📖 Notes](/files/algorithms/notes/Chapter_09_String_Matching_and_Compression_Lecture_Notes.html) · [📝 Questions](/files/algorithms/slides/Chapter_09_String_Matching_and_Compression_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/algorithms-java-en/tree/main/Chapter09/src)

---

### Chapter 10: Advanced String Algorithms

The chapter opens with string sorting: lexicographic order and LSD and MSD radix sort. It goes on to regular expressions, finite-state machines and pattern-matching automata, and computes the Levenshtein edit distance with dynamic programming. Suffix arrays and the Burrows–Wheeler transform complete the chapter.

- [🖼️ Slides](/files/algorithms/slides/Chapter_10_Advanced_String_Algorithms.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_10_Advanced_String_Algorithms.pdf) · [📖 Notes](/files/algorithms/notes/Chapter_10_Advanced_String_Algorithms_Lecture_Notes.html) · [📝 Questions](/files/algorithms/slides/Chapter_10_Advanced_String_Algorithms_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/algorithms-java-en/tree/main/Chapter10/src)

---

### Chapter 11: Tries

A trie, or prefix tree, stores strings so that common prefixes are shared. We implement insertion, search, deletion and autocomplete, and apply tries to wildcard search and spell checking. Ternary search tries, compressed tries, suffix tries and the Aho–Corasick algorithm, which finds many patterns in a single pass over the text, round out the chapter.

- [🖼️ Slides](/files/algorithms/slides/Chapter_11_Tries.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/algorithms/pdf/Chapter_11_Tries.pdf) · [📖 Notes](/files/algorithms/notes/Chapter_11_Tries_Lecture_Notes.html) · [📝 Questions](/files/algorithms/slides/Chapter_11_Tries_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/algorithms-java-en/tree/main/Chapter11/src)

---

## Next: Advanced Algorithms

Design paradigms (divide and conquer, greedy algorithms, dynamic programming), hard problems (backtracking, branch and bound, approximation algorithms) and other models of computation (randomized, online and parallel algorithms) are covered in [Advanced Algorithms](/teaching/advanced-algorithms/?lang=en).

</div>
