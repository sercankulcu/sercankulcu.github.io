---
title: "Advanced Algorithms"
lang_toggle: true
collection: teaching
type: "Undergraduate"
permalink: /teaching/advanced-algorithms/
venue: "Giresun University, Computer Engineering"
date: 2026-01-06 12:00:00
location: "Giresun, Turkey"
og_image: https://sercankulcu.github.io/courses-pdfs/covers/ileri-algoritmalar.jpg
course_language: [tr, en]
textbook:
  name: "İleri Algoritmalar"
  url: /books/ileri-algoritmalar/
---

![advanced algorithms](/images/teaching/teaching-advanced-algorithms.webp){: .align-left width="200" height="150" style="float: left; margin-right: 10px;"} 
This course is the continuation of [Algorithms](/teaching/algorithms/). It studies the main algorithm-design paradigms (divide and conquer, greedy algorithms and dynamic programming), methods for hard problems (backtracking, branch and bound and approximation algorithms), and other models of computation: randomized, online and parallel algorithms. For each technique the course examines correctness, running time and the kinds of problems it suits, and compares the techniques on shared examples such as the knapsack and travelling salesman problems.


<div data-lt="tr" lang="tr" markdown="1">

---

## Ders Kitabı

[📕 İleri Algoritmalar: Zor Problemler İçin Teknikler (PDF, 9 MB)](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/Ileri-Algoritmalar.pdf)

---

## Başlangıç Kaynakları

* [Ön Koşul: Algoritmalar Dersi (Bölüm 1–11)](/teaching/algorithms/)
* [İleri Algoritmalarda Önemli İsimler (HTML)](/files/advanced_algorithms/Advanced_Algorithms_Important_People.html)
* [İleri Algoritmalar İçin Ön Bilgiler (HTML)](/files/advanced_algorithms/Advanced_Algorithms_Prerequisites.html)
* [Dersin Haritası (HTML)](/files/advanced_algorithms/Ders_Haritasi.html)
* [Terim Sözlüğü (HTML)](/files/advanced_algorithms/Sozluk.html)

---

## Kısım I: Tasarım Paradigmaları

### Bölüm 1: Böl ve Fethet Yaklaşımı

Böl ve fethet yaklaşımı, bir problemi aynı türden daha küçük alt problemlere böler, bunları özyinelemeli olarak çözer ve sonuçları birleştirir. Bölümde genel şablon ile buna karşılık gelen yineleme bağıntısı, Ana Teorem ile çözümleme, birleştirme sıralaması, hızlı sıralama ve hızlı üs alma örnekleri ele alınır; alt problemler örtüştüğünde yaklaşımın neden verimsizleştiği gösterilir. Geometriden Quickhull ile dışbükey örtü ve en yakın nokta çifti, aritmetikten Karatsuba tam sayı çarpımı ve Strassen matris çarpımı ayrıntılı biçimde incelenir.

- [🖼️ Sunum](/files/advanced_algorithms/sunumlar/Bolum_01_Bol_ve_Fethet_Yaklasimi.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Bolum_01_Bol_ve_Fethet_Yaklasimi.pdf) · [📖 Ders notu](/files/advanced_algorithms/notlar/Bolum_01_Bol_ve_Fethet_Yaklasimi_Ders_Notu.html) · [📝 Sorular](/files/advanced_algorithms/sunumlar/Bolum_01_Bol_ve_Fethet_Yaklasimi_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/advanced-algorithms-java/tree/main/Bolum01/src)
- 🕹️ **Simülatörler:** [Özyineleme ve Ana Teorem](/files/algorithms/sunumlar/Bolum_02_Recurrence_Master_Theorem.html) · [Sıralama Algoritmaları](/files/algorithms/sunumlar/Bolum_03_Sorting.html)

---

### Bölüm 2: Açgözlü Algoritmalar

Açgözlü algoritmalar çözümü adım adım kurar, her adımda o an en iyi görünen seçimi yapar ve bu seçimi sonradan değiştirmez. Bölümde açgözlü seçim özelliği ile optimal alt yapı koşulları anlatılır; para üstü problemi üzerinden yaklaşımın hangi durumda en iyi sonucu verdiği, hangi durumda yanıldığı gösterilir. Etkinlik seçimi, son tarihli iş sıralama ve kesirli sırt çantası problemleri, kesim özelliğine dayanan minimum kapsayan ağaç algoritmaları ve Huffman kodlaması işlenir; Huffman kodunun neden en iyi önek kodu olduğu da gerekçelendirilir.

- [🖼️ Sunum](/files/advanced_algorithms/sunumlar/Bolum_02_Acgozlu_Algoritmalar.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Bolum_02_Acgozlu_Algoritmalar.pdf) · [📖 Ders notu](/files/advanced_algorithms/notlar/Bolum_02_Acgozlu_Algoritmalar_Ders_Notu.html) · [📝 Sorular](/files/advanced_algorithms/sunumlar/Bolum_02_Acgozlu_Algoritmalar_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/advanced-algorithms-java/tree/main/Bolum02/src)
- 🕹️ **Simülatörler:** [Minimum Kapsayan Ağaç Simülatörü](/files/algorithms/sunumlar/Bolum_07_MST.html) · [Dizgi Sıkıştırma Algoritmaları](/files/algorithms/sunumlar/Bolum_09_String_Compression.html)

---

### Bölüm 3: Dinamik Programlama

Dinamik programlama, örtüşen alt problemleri bir kez çözüp sonuçlarını saklayarak üstel maliyetli özyinelemeleri polinom zamana indirir. Bölümde optimal alt yapı ve örtüşen alt problemler özellikleri, bir DP çözümü tasarlamanın adımları, bellekleme ile tablolama arasındaki fark ve yaklaşımın böl ve fethet ile açgözlü yöntemlerden ayrıldığı noktalar Fibonacci örneği üzerinden açıklanır. Ardından 0/1 ve sınırsız sırt çantası, alt küme toplamı, en uzun artan alt dizi, en uzun ortak alt dizgi ve en uzun ortak alt dizi problemleri tablolar adım adım doldurularak çözülür. En uzun artan alt dizi için ikili aramaya dayanan O(n log n) çözüm de verilir.

- [🖼️ Sunum](/files/advanced_algorithms/sunumlar/Bolum_03_Dinamik_Programlama.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Bolum_03_Dinamik_Programlama.pdf) · [📖 Ders notu](/files/advanced_algorithms/notlar/Bolum_03_Dinamik_Programlama_Ders_Notu.html) · [📝 Sorular](/files/advanced_algorithms/sunumlar/Bolum_03_Dinamik_Programlama_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/advanced-algorithms-java/tree/main/Bolum03/src)

---

## Kısım II: Zor Problemler

### Bölüm 4: Geri İzleme Algoritmaları

Geri izleme, kısmi çözümleri adım adım genişleten ve geçerli bir çözüme ulaşamayacağı anlaşılan daldan vazgeçip önceki karar noktasına dönen sistematik bir arama yöntemidir. Bölüm P, NP ve NP-zor problemlere kısa bir girişle başlar; durum uzayı ağacı ve seç–keşfet–geri al şablonu labirent ve permütasyon örnekleriyle tanıtılır. n-vezir, Sudoku, çizge boyama, Hamilton yolu ve kelime arama problemleri Java kodlarıyla çözülür; en az çakışma sezgiseli yerel onarıma dayalı bir seçenek olarak gösterilir. Geri izlemenin en kötü durum maliyeti ve budamayı güçlendiren sezgiseller de tartışılır.

- [🖼️ Sunum](/files/advanced_algorithms/sunumlar/Bolum_04_Geri_Izleme_Algoritmalari.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Bolum_04_Geri_Izleme_Algoritmalari.pdf) · [📖 Ders notu](/files/advanced_algorithms/notlar/Bolum_04_Geri_Izleme_Algoritmalari_Ders_Notu.html) · [📝 Sorular](/files/advanced_algorithms/sunumlar/Bolum_04_Geri_Izleme_Algoritmalari_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/advanced-algorithms-java/tree/main/Bolum04/src)

---

### Bölüm 5: Dal Sınır Algoritmaları

Dal sınır yöntemi, durum uzayı ağacını tararken her düğüm için bir sınır hesaplar ve en iyi çözümü içeremeyeceği kesinleşen dalları budar. Bölümde sınırın seçimi, budama koşulları ve FIFO, LIFO ve en düşük maliyetli (LC) arama stratejileri anlatılır; yöntemin geri izlemeden farkı ortaya konur. 0/1 sırt çantası problemi kesirli gevşetmeyle, gezgin satıcı problemi giderek sıkılaşan üç alt sınırla çözülür; atama problemi, tam sayılı doğrusal programlama ve maksimum klik de örnek olarak işlenir. Dal sınırın A* ile ilişkisi kurulur ve tasarım paradigmaları birlikte karşılaştırılır.

- [🖼️ Sunum](/files/advanced_algorithms/sunumlar/Bolum_05_Dal_Sinir_Algoritmalari.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Bolum_05_Dal_Sinir_Algoritmalari.pdf) · [📖 Ders notu](/files/advanced_algorithms/notlar/Bolum_05_Dal_Sinir_Algoritmalari_Ders_Notu.html) · [📝 Sorular](/files/advanced_algorithms/sunumlar/Bolum_05_Dal_Sinir_Algoritmalari_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/advanced-algorithms-java/tree/main/Bolum05/src)
- 🕹️ **Simülatörler:** [Gezgin Satıcı Problemi Simülatörü](/files/advanced_algorithms/sunumlar/Bolum_05_TSP.html)

---

### Bölüm 6: Yaklaşım Algoritmaları

Yaklaşım algoritmaları, en iyi çözümü bulmanın çok pahalı olduğu NP-zor problemlerde polinom zamanda ve kanıtlanmış bir oran içinde en iyiye yakın çözümler üretir. Bölümde yaklaşım oranı kavramı ve yaklaşım algoritmasının sezgiselden ve yaklaşım şemalarından farkı açıklanır. Gezgin satıcı problemi için en yakın komşu sezgiseli, metrik TSP'de MST tabanlı 2-yaklaşım ve 2-opt yerel arama; iş çizelgelemede liste çizelgeleme ve en uzun iş önce (LPT) kuralı; düğüm kapsama için 2-yaklaşım algoritması ve 3-SAT'tan indirgeme işlenir. Sırt çantası için oran sıralı açgözlü yaklaşım ve baskın özvektörü bulan kuvvet yinelemesi (power iteration) de ele alınır.

- [🖼️ Sunum](/files/advanced_algorithms/sunumlar/Bolum_06_Yaklasim_Algoritmalari.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Bolum_06_Yaklasim_Algoritmalari.pdf) · [📖 Ders notu](/files/advanced_algorithms/notlar/Bolum_06_Yaklasim_Algoritmalari_Ders_Notu.html) · [📝 Sorular](/files/advanced_algorithms/sunumlar/Bolum_06_Yaklasim_Algoritmalari_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/advanced-algorithms-java/tree/main/Bolum06/src)
- 🕹️ **Simülatörler:** [Gezgin Satıcı Problemi Simülatörü](/files/advanced_algorithms/sunumlar/Bolum_05_TSP.html)

---

## Kısım III: Diğer Hesaplama Modelleri

### Bölüm 7: Rastgele Algoritmalar

Rastgele algoritmalar, çalışma sırasında rastgele seçimler yaparak daha yalın bir tasarıma, daha iyi bir beklenen çalışma süresine ya da kötü girdilere karşı dayanıklılığa ulaşır. Bölümde Las Vegas ve Monte Carlo türleri ile hata olasılığının tekrarlı çalıştırmayla küçültülmesi anlatılır. Fisher–Yates karıştırması ve saf karıştırmanın yanlılığı, BogoSort, rastgele pivotlu hızlı sıralama ve beklenen karşılaştırma sayısı ile QuickSelect incelenir. Monte Carlo yöntemiyle π tahmini, Miller–Rabin asallık testi, Karger minimum kesim algoritması ve sözde rastgele sayı üretimi de bölümün konuları arasındadır.

- [🖼️ Sunum](/files/advanced_algorithms/sunumlar/Bolum_07_Rastgele_Algoritmalar.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Bolum_07_Rastgele_Algoritmalar.pdf) · [📖 Ders notu](/files/advanced_algorithms/notlar/Bolum_07_Rastgele_Algoritmalar_Ders_Notu.html) · [📝 Sorular](/files/advanced_algorithms/sunumlar/Bolum_07_Rastgele_Algoritmalar_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/advanced-algorithms-java/tree/main/Bolum07/src)
- 🕹️ **Simülatörler:** [Monte Carlo ile π Tahmini](/files/advanced_algorithms/sunumlar/Bolum_07_Monte_Carlo_Pi.html)

---

### Bölüm 8: Çevrim İçi Algoritmalar

Çevrim içi algoritmalar girdiyi parça parça alır ve geleceği bilmeden geri alınamaz kararlar verir. Bu algoritmaların başarısı, tüm girdiyi önceden bilen en iyi çevrim dışı algoritmayla karşılaştıran rekabetçi analiz ve düşman modeliyle ölçülür. Bölümde kayak kiralama problemi ve alt sınırı, FIFO, LRU ve OPT politikalarıyla sayfalama, Belady anomalisi ve rastgele işaretleme algoritması, liste güncellemede öne taşı (MTF) kuralı ele alınır. Veri akışı modelinde hareketli ortalama, çevrim içi ortanca, rezervuar örnekleme ve kayan hash ile örüntü arama, son olarak da artımlı öğrenme incelenir.

- [🖼️ Sunum](/files/advanced_algorithms/sunumlar/Bolum_08_Cevrim_Ici_Algoritmalar.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Bolum_08_Cevrim_Ici_Algoritmalar.pdf) · [📖 Ders notu](/files/advanced_algorithms/notlar/Bolum_08_Cevrim_Ici_Algoritmalar_Ders_Notu.html) · [📝 Sorular](/files/advanced_algorithms/sunumlar/Bolum_08_Cevrim_Ici_Algoritmalar_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/advanced-algorithms-java/tree/main/Bolum08/src)

---

### Bölüm 9: Paralel Algoritmalar

Paralel algoritmalar, hesaplamayı birden çok işlem birimine bölerek çalışma süresini kısaltmayı ve büyük veri kümelerini işlenebilir kılmayı amaçlar. Bölümde Flynn sınıflandırması, bellek mimarileri ve PRAM modeli ile hızlanma, verimlilik, maliyet, Amdahl yasası ve iş–derinlik ölçütleri tanıtılır. Paralel toplama ve önek toplamı (Hillis–Steele ve Blelloch), boru hattı ve boru hatlı ağaç, paralel birleştirme sıralaması, MapReduce ve veri paralelliğiyle matris çarpımı örnekleri işlenir. Yarış durumu, eşzamanlı çizge gezinme ve Java'daki paralellik araçları da ele alınır.

- [🖼️ Sunum](/files/advanced_algorithms/sunumlar/Bolum_09_Paralel_Algoritmalar.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Bolum_09_Paralel_Algoritmalar.pdf) · [📖 Ders notu](/files/advanced_algorithms/notlar/Bolum_09_Paralel_Algoritmalar_Ders_Notu.html) · [📝 Sorular](/files/advanced_algorithms/sunumlar/Bolum_09_Paralel_Algoritmalar_Calisma_Sorulari.html) · [💻 Kod](https://github.com/sercankulcu/advanced-algorithms-java/tree/main/Bolum09/src)

</div>

<div data-lt="en" lang="en" markdown="1">

---

## Textbook

[📕 Advanced Algorithms: Techniques for Hard Problems — the course book (PDF, 8 MB)](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/Advanced-Algorithms.pdf)

---

## Getting Started

* [Prerequisite: Algorithms (Chapters 1–11)](/teaching/algorithms/?lang=en)
* [Important People in Advanced Algorithms (HTML)](/files/advanced_algorithms/Important_People.html)
* [Prerequisites for Advanced Algorithms (HTML)](/files/advanced_algorithms/Prerequisites.html)
* [Course Map (HTML)](/files/advanced_algorithms/Course_Map.html)
* [Dictionary of Terms (HTML)](/files/advanced_algorithms/Dictionary.html)

---

## Part I: Design Paradigms

### Chapter 1: Divide and Conquer

Divide and conquer splits a problem into smaller instances of the same problem, solves them recursively and combines the answers. We set up the general template and its recurrence, solve recurrences with the Master Theorem, and revisit merge sort, quicksort and fast exponentiation in this light, noting why the approach breaks down when subproblems overlap. The chapter then works through Quickhull for convex hulls, the closest pair of points, Karatsuba's integer multiplication and Strassen's matrix multiplication.

- [🖼️ Slides](/files/advanced_algorithms/slides/Chapter_01_Divide_and_Conquer.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Chapter_01_Divide_and_Conquer.pdf) · [📖 Notes](/files/advanced_algorithms/notes/Chapter_01_Divide_and_Conquer_Lecture_Notes.html) · [📝 Questions](/files/advanced_algorithms/slides/Chapter_01_Divide_and_Conquer_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/advanced-algorithms-java-en/tree/main/Chapter01/src)
- 🕹️ **Simulators:** [Recurrences and the Master Theorem](/files/algorithms/slides/Chapter_02_Recurrence_Master_Theorem.html) · [Sorting Algorithms](/files/algorithms/slides/Chapter_03_Sorting.html)

---

### Chapter 2: Greedy Algorithms

A greedy algorithm builds its answer one step at a time, always taking the choice that looks best right now and never revisiting it. We state the greedy-choice property and optimal substructure, and use coin change to see when greed is optimal and when it fails. Activity selection, scheduling with deadlines, the fractional knapsack, minimum spanning trees through the cut property, and Huffman coding follow, together with a proof that Huffman's code is an optimal prefix code.

- [🖼️ Slides](/files/advanced_algorithms/slides/Chapter_02_Greedy_Algorithms.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Chapter_02_Greedy_Algorithms.pdf) · [📖 Notes](/files/advanced_algorithms/notes/Chapter_02_Greedy_Algorithms_Lecture_Notes.html) · [📝 Questions](/files/advanced_algorithms/slides/Chapter_02_Greedy_Algorithms_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/advanced-algorithms-java-en/tree/main/Chapter02/src)
- 🕹️ **Simulators:** [Minimum Spanning Tree Simulator](/files/algorithms/slides/Chapter_07_MST.html) · [String Compression Algorithms](/files/algorithms/slides/Chapter_09_String_Compression.html)

---

### Chapter 3: Dynamic Programming

Dynamic programming solves each overlapping subproblem once and stores the result, turning exponential recursions into polynomial-time algorithms. Using Fibonacci, we cover optimal substructure and overlapping subproblems, the steps of designing a DP solution, memoization versus tabulation, and how DP differs from divide and conquer and from greedy methods. We then fill in the tables step by step for 0/1 and unbounded knapsack, subset sum, longest increasing subsequence (including the O(n log n) binary-search version), longest common substring and longest common subsequence.

- [🖼️ Slides](/files/advanced_algorithms/slides/Chapter_03_Dynamic_Programming.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Chapter_03_Dynamic_Programming.pdf) · [📖 Notes](/files/advanced_algorithms/notes/Chapter_03_Dynamic_Programming_Lecture_Notes.html) · [📝 Questions](/files/advanced_algorithms/slides/Chapter_03_Dynamic_Programming_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/advanced-algorithms-java-en/tree/main/Chapter03/src)

---

## Part II: Hard Problems

### Chapter 4: Backtracking

Backtracking extends a partial solution step by step and, as soon as a branch cannot lead to a valid solution, abandons it and returns to the last decision point. After a short introduction to P, NP and NP-hard problems, we present the state-space tree and the choose–explore–undo template with mazes and permutations. We solve n-queens, Sudoku, graph coloring, Hamiltonian paths and word search in Java, look at the min-conflicts heuristic as a local-repair alternative, and discuss the worst-case cost of backtracking and the heuristics that make pruning stronger.

- [🖼️ Slides](/files/advanced_algorithms/slides/Chapter_04_Backtracking.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Chapter_04_Backtracking.pdf) · [📖 Notes](/files/advanced_algorithms/notes/Chapter_04_Backtracking_Lecture_Notes.html) · [📝 Questions](/files/advanced_algorithms/slides/Chapter_04_Backtracking_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/advanced-algorithms-java-en/tree/main/Chapter04/src)

---

### Chapter 5: Branch and Bound

Branch and bound explores the state-space tree while computing a bound at every node, and prunes any branch that provably cannot contain the best solution. We discuss how to choose bounds and when to prune, compare FIFO, LIFO and least-cost (LC) search, and contrast the method with backtracking. The 0/1 knapsack is solved with the fractional relaxation and the traveling salesman problem with three progressively tighter lower bounds; the assignment problem, integer linear programming and maximum clique serve as further examples. We close by relating branch and bound to A* and comparing the design paradigms side by side.

- [🖼️ Slides](/files/advanced_algorithms/slides/Chapter_05_Branch_and_Bound.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Chapter_05_Branch_and_Bound.pdf) · [📖 Notes](/files/advanced_algorithms/notes/Chapter_05_Branch_and_Bound_Lecture_Notes.html) · [📝 Questions](/files/advanced_algorithms/slides/Chapter_05_Branch_and_Bound_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/advanced-algorithms-java-en/tree/main/Chapter05/src)
- 🕹️ **Simulators:** [Traveling Salesman Problem Simulator](/files/advanced_algorithms/slides/Chapter_05_TSP.html)

---

### Chapter 6: Approximation Algorithms

When finding the optimum of an NP-hard problem is too expensive, an approximation algorithm runs in polynomial time and returns a solution within a proven factor of the best one. We define the approximation ratio and separate approximation algorithms from heuristics and from approximation schemes. Topics include the nearest-neighbor heuristic, the MST-based 2-approximation for metric TSP and 2-opt local search; list scheduling and the longest-processing-time (LPT) rule; a 2-approximation for vertex cover and a reduction from 3-SAT; the ratio-sorted greedy method for knapsack; and power iteration for the dominant eigenvector.

- [🖼️ Slides](/files/advanced_algorithms/slides/Chapter_06_Approximation_Algorithms.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Chapter_06_Approximation_Algorithms.pdf) · [📖 Notes](/files/advanced_algorithms/notes/Chapter_06_Approximation_Algorithms_Lecture_Notes.html) · [📝 Questions](/files/advanced_algorithms/slides/Chapter_06_Approximation_Algorithms_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/advanced-algorithms-java-en/tree/main/Chapter06/src)
- 🕹️ **Simulators:** [Traveling Salesman Problem Simulator](/files/advanced_algorithms/slides/Chapter_05_TSP.html)

---

## Part III: Other Models of Computation

### Chapter 7: Randomized Algorithms

Randomized algorithms make random choices while they run, which can buy a simpler design, a better expected running time or robustness against bad inputs. We distinguish Las Vegas from Monte Carlo algorithms and show how repeated runs drive the error probability down. The chapter covers the Fisher–Yates shuffle and the bias of the naive shuffle, BogoSort, randomized quicksort with its expected number of comparisons, and QuickSelect, followed by Monte Carlo estimation of π, the Miller–Rabin primality test, Karger's minimum-cut algorithm and pseudorandom number generation.

- [🖼️ Slides](/files/advanced_algorithms/slides/Chapter_07_Randomized_Algorithms.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Chapter_07_Randomized_Algorithms.pdf) · [📖 Notes](/files/advanced_algorithms/notes/Chapter_07_Randomized_Algorithms_Lecture_Notes.html) · [📝 Questions](/files/advanced_algorithms/slides/Chapter_07_Randomized_Algorithms_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/advanced-algorithms-java-en/tree/main/Chapter07/src)
- 🕹️ **Simulators:** [Estimating π with Monte Carlo](/files/advanced_algorithms/slides/Chapter_07_Monte_Carlo_Pi.html)

---

### Chapter 8: Online Algorithms

An online algorithm receives its input piece by piece and must make irrevocable decisions without knowing the future. We measure such algorithms by competitive analysis against an adversary, comparing them with the best offline algorithm that sees the whole input in advance. Topics include ski rental and its lower bound, paging with FIFO, LRU and OPT, Belady's anomaly and the randomized marking algorithm, and the move-to-front rule for list update; in the data-stream model we look at moving averages, the running median, reservoir sampling and pattern search with a rolling hash, and finish with incremental learning.

- [🖼️ Slides](/files/advanced_algorithms/slides/Chapter_08_Online_Algorithms.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Chapter_08_Online_Algorithms.pdf) · [📖 Notes](/files/advanced_algorithms/notes/Chapter_08_Online_Algorithms_Lecture_Notes.html) · [📝 Questions](/files/advanced_algorithms/slides/Chapter_08_Online_Algorithms_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/advanced-algorithms-java-en/tree/main/Chapter08/src)

---

### Chapter 9: Parallel Algorithms

Parallel algorithms split a computation across several processing units to cut the running time and to make large data sets tractable. We introduce Flynn's taxonomy, memory architectures and the PRAM model, together with speedup, efficiency, cost, Amdahl's law and the work–span measures. Worked examples include parallel sum and prefix sums (Hillis–Steele and Blelloch), pipelines and pipelined trees, parallel merge sort, MapReduce and data-parallel matrix multiplication; race conditions, concurrent graph traversal and Java's parallelism tools round out the chapter.

- [🖼️ Slides](/files/advanced_algorithms/slides/Chapter_09_Parallel_Algorithms.html) · [📄 PDF](https://sercankulcu.github.io/courses-pdfs/advanced_algorithms/pdf/Chapter_09_Parallel_Algorithms.pdf) · [📖 Notes](/files/advanced_algorithms/notes/Chapter_09_Parallel_Algorithms_Lecture_Notes.html) · [📝 Questions](/files/advanced_algorithms/slides/Chapter_09_Parallel_Algorithms_Study_Questions.html) · [💻 Code](https://github.com/sercankulcu/advanced-algorithms-java-en/tree/main/Chapter09/src)

</div>
