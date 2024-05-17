---
title: "Algorithms"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/algorithms
venue: "University of Giresun, Department of Computer Engineering"
date: 2024-01-07
location: "Giresun, Turkey"
---

<img align="left" width="200" alt="algorithms" src="/images/teaching/algorithms-course.png"> Algorithms are at the heart of computer science and play a crucial role in many applications, from machine learning and computational biology to cryptography and network routing. This course covers a wide range of topics, including sorting and searching algorithms, graph algorithms, dynamic programming, advanced data structures, algorithm design techniques, and the practical implementation of algorithms. Understanding these topics is critical to developing efficient and effective software systems.

* Ders Öğretim Planı <a href="../files/algorithms/slides/Bolum_00_Ders_Ogretim_Planı.pdf">[pdf]</a>

Duyurular
---

* ödev 2 verildi <a href="../files/algorithms/slides/odev2.html">[html]</a>
* Vize sonuçları <a href="../files/algorithms/slides/algoritmalarsonuc.htm">[html]</a>
* ödev 1 verildi <a href="../files/algorithms/slides/odev1.html">[html]</a>

The resources: 
-----

* Soru Cevap <a href="../files/algorithms/slides/Bolum_15_Soru_Cevap.pdf">[Vize]</a> <a href="../files/algorithms/slides/Bolum_16_Soru_Cevap_2.pdf">[Final]</a>
* 2023-2024 Vize <a href="../files/algorithms/slides/2023-2024-vize-cevap.pdf">[pdf]</a>
* Algorithms Visual Algo <a href="https://visualgo.net/en">[website]</a>
* Algorithms Visual Algo Code <a href="https://github.com/stevenhalim/cpbook-code/tree/master/">[github]</a>
* Algorithms Algoanim <a href="http://www.algoanim.ide.sk/">[website]</a>
* Algorithms Yong Danielli <a href="https://yongdanielliang.github.io/animation/animation.html">[website]</a>
* Algorithms USFCA <a href="https://www.cs.usfca.edu/~galles/visualization/Algorithms.html">[website]</a>
* Algorithms Anim IDE <a href="https://anim.ide.sk/">[website]</a>
* Algorithms DSALGO Visualizer <a href="https://github.com/jhabarsingh/DSALGO-VISUALIZER">[website]</a>

Chapter 1: Introduction to Algorithms
---

Algorithms serve as the fundamental building blocks of computer engineering, defining step-by-step procedures to solve computational problems. Their importance lies in their ability to streamline processes, optimize resource utilization, and facilitate efficient problem-solving in various domains. Algorithms come in diverse types, ranging from sorting and searching to graph traversal and machine learning. These algorithms are classified based on their functionality, complexity, and problem-solving approach. Asymptotic analysis is crucial in evaluating algorithm performance, offering insights into their efficiency and scalability as input size grows. It involves assessing algorithmic complexity, which quantifies the resources, such as time and space, required for execution. Big-O notation emerges as a standardized way to express algorithmic complexity, providing a concise representation of an algorithm's worst-case scenario and enabling comparisons between different algorithms to determine their efficiency and suitability for specific tasks.

* Sunum-Giriş <a href="../files/algorithms/slides/Bolum_01_Giris.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_01_Introduction.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter1">[link]</a>


Chapter 2: Sorting Algorithms
---

Sorting algorithms are used to organize data in a meaningful way, such as by increasing or decreasing order. They are used in a wide variety of applications, such as searching, data compression, and statistical analysis. Bubble Sort, though simple, works by repeatedly swapping adjacent elements until the entire list is sorted. Insertion Sort, on the other hand, is like sorting a deck of cards, one card at a time, inserting each card into its correct position among the already sorted cards. Selection Sort is like finding the smallest (or largest) card from an unsorted deck and placing it in its proper position in the sorted deck. Merge Sort employs a divide-and-conquer strategy, breaking the list into smaller parts, sorting them, and then merging them back together. Finally, Quick Sort is known for its speed, sorting the list by repeatedly dividing it based on a chosen pivot element. 

* Sunum-Sıralama Algoritmaları <a href="../files/algorithms/slides/Bolum_02_Siralama.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_02_Sorting.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter2">[link]</a>


Chapter 3: Searching Algorithms
---

Searching algorithms are used to find a specific value in a dataset. They are used in a wide variety of applications, such as finding a file on a computer, finding a customer in a database, and finding a word in a document. Linear search, although basic, traverses the dataset sequentially until it finds the desired value. Binary search, renowned for its efficiency with sorted arrays, repeatedly divides the dataset in half, narrowing down the search space until the value is found. Jump search optimizes linear search by jumping ahead in fixed-size steps, reducing the number of comparisons needed. Interpolation search, on the other hand, leverages the distribution of data to predict the probable location of the target value, making it especially efficient for uniformly distributed datasets.

* Sunum-Arama Algoritmaları <a href="../files/algorithms/slides/Bolum_03_Arama.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_03_Searching.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter3">[link]</a>


Chapter 4: Graph Algorithms
---

Graphs, composed of nodes and edges, are ubiquitous in various domains, including social networks, transportation systems, and computational biology. Graph algorithms enable us to explore, analyze, and manipulate these complex structures efficiently. Graph traversal algorithms like Breadth-first search (BFS) and Depth-first search (DFS) enable us to explore the intricacies of graphs, uncovering their structure and connections. When it comes to finding the shortest path between nodes, Dijkstra's Algorithm and Bellman-Ford Algorithm come to the rescue, efficiently navigating through the labyrinth of edges and vertices. Minimum Spanning Tree algorithms, such as Prim's Algorithm and Kruskal's Algorithm, help us identify the most cost-effective way to connect all nodes in a graph. And when tackling network flow problems, like determining the maximum flow in a network, Ford-Fulkerson Algorithm and Edmonds-Karp Algorithm offer ingenious solutions, optimizing resource utilization and enhancing efficiency. 

* Sunum-Çizge Gezinme <a href="../files/algorithms/slides/Bolum_04_01_Cizge_Gezinme.pdf">[pdf]</a>
* Sunum-Çizge En Kısa Yol <a href="../files/algorithms/slides/Bolum_04_02_En_Kisa_Yol.pdf">[pdf]</a>
* Sunum-Çizge Minimum Kapsayan <a href="../files/algorithms/slides/Bolum_04_03_Min_Kapsayan.pdf">[pdf]</a>
* Sunum-Çizge Ağ Akış <a href="../files/algorithms/slides/Bolum_04_04_Ag_Akis.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_04_Graph.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter4">[link]</a>


Chapter 5: String Algorithms
---

Have you ever wondered how your computer or smartphone handles text so efficiently? Whether you're searching for a specific word in a document, analyzing DNA sequences, or even just sending a text message, string algorithms are working behind the scenes to make it happen smoothly. String algorithms enable us to manipulate and analyze text data effectively. From searching for specific patterns within a string to comparing and modifying strings, these algorithms are incredibly versatile and find applications in various fields, including natural language processing, bioinformatics, and data processing. Whether it's finding the occurrence of a substring within a larger string, determining the longest common subsequence between two strings, or performing efficient string matching operations, string algorithms offer efficient and elegant solutions to a myriad of problems.

* Sunum-Dizgi Eşleme <a href="../files/algorithms/slides/Bolum_05_01_Dizgi_Esleme.pdf">[pdf]</a>
* Sunum-Dizgi Sıkıştırma <a href="../files/algorithms/slides/Bolum_05_02_Dizgi_Sikistirma.pdf">[pdf]</a>
* Sunum-Dizgi Sıralama <a href="../files/algorithms/slides/Bolum_05_03_Dizgi_Siralama.pdf">[pdf]</a>
* Sunum-Dizgi Ayrıştırma <a href="../files/algorithms/slides/Bolum_05_04_Dizgi_Ayristirma.pdf">[pdf]</a>
* Sunum-Dizgi Düzenleme <a href="../files/algorithms/slides/Bolum_05_05_Dizgi_Duzenleme_Mesafe.pdf">[pdf]</a>
* Sunum-Dizgi Dönüştürme <a href="../files/algorithms/slides/Bolum_05_06_Dizgi_Donusturme.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_05_.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter5">[link]</a>


Chapter 6: Dynamic Programming
---

Dynamic programming is a powerful technique for solving optimization problems by breaking them down into smaller subproblems. At its core, dynamic programming involves breaking down daunting tasks into smaller, more manageable subproblems, allowing us to systematically find optimal solutions. 

* Sunum-Dinamik Programlama <a href="../files/algorithms/slides/Bolum_06_Dinamik.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_05_Dynamic.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter6">[link]</a>


Chapter 7: Approximation algorithms
---

Approximation algorithms are a type of algorithm that provides a solution to a problem that is not necessarily optimal, but is guaranteed to be within a certain factor of the optimal solution. Approximation algorithms are often used to solve problems that are NP-hard, which means that there is no known polynomial-time algorithm that can find the optimal solution.

* Sunum-Yakınsama Algoritmaları <a href="../files/algorithms/slides/Bolum_07_Yakinsama.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_06_Approximation.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter7">[link]</a>


Chapter 8: Randomized algorithms
---

Randomized algorithms are a type of algorithm that uses randomness to improve its performance. Randomized algorithms are often used to solve problems that are difficult or impossible to solve using deterministic algorithms.

* Sunum-Rastgele Algoritmalar <a href="../files/algorithms/slides/Bolum_08_Rastgele.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_07_Randomized.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter8">[link]</a>


Chapter 9: Online algorithms
---

Online algorithms are a type of algorithm that makes decisions without knowing the complete input. Online algorithms are often used to solve problems in real time, where the input is not known in advance.

* Sunum-Çevrimiçi Algoritmalar <a href="../files/algorithms/slides/Bolum_09_Cevrimici.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_08_Online.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter9">[link]</a>


Chapter 10: Parallel algorithms
---

Parallel algorithms are a type of algorithm that can be executed on multiple processors or cores simultaneously. Parallel algorithms are often used to solve problems that are too large or too complex to be solved on a single processor.

* Sunum-Paralel Algoritmalar <a href="../files/algorithms/slides/Bolum_10_Paralel.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_09_Parallel.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter10">[link]</a>


Chapter 11: Divide-and-Conquer paradigm
---

The divide-and-conquer paradigm is an algorithmic design paradigm that breaks down a problem into smaller subproblems of the same or related type, until these become simple enough to be solved directly. The solutions to the sub-problems are then combined to give a solution to the original problem.

* Sunum-Böl Fethet Yaklaşımı <a href="../files/algorithms/slides/Bolum_11_Bol_Fethet.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_10_Divide_and_Conquer.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter11">[link]</a>


Chapter 12: Greedy algorithms
---

Greedy algorithms are a type of algorithm that makes decisions at each step based on the current state of the problem. Greedy algorithms are often used to solve problems that can be broken down into a sequence of decisions.

* Sunum-Açgözlü Algoritmalar <a href="../files/algorithms/slides/Bolum_12_Acgozlu.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_11_Greedy.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter12">[link]</a>


Chapter 13: Backtracking algorithms
---

Backtracking algorithms are a type of algorithm that solves problems by exploring all possible solutions and backtracking when a solution is found to be invalid. Backtracking algorithms are often used to solve problems that can be broken down into a tree of possible solutions.

* Sunum-Geri Dönüşlü Algoritmalar <a href="../files/algorithms/slides/Bolum_13_Geri_Donuslu.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_12_Backtracking.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter13">[link]</a>


Chapter 14: Branch-and-Bound algorithms
---

Branch and bound algorithms are a type of algorithm that solves optimization problems by breaking them down into smaller subproblems and using a bounding function to eliminate subproblems that cannot contain the optimal solution. It is an algorithm design paradigm for discrete and combinatorial optimization problems, as well as mathematical optimization. 

* Sunum-Dal Sınır Algoritmaları <a href="../files/algorithms/slides/Bolum_14_Dal_Sinir.pdf">[pdf]</a>
* Lecture Notes <a href="../files/algorithms/Chapter_13_Branch_and_Bound.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/algorithms/tree/main/Chapter14">[link]</a>
