---
title: "Data Structures"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/data-structures
venue: "University of Giresun, Department of Computer Engineering"
date: 2024-09-05
location: "Giresun, Turkey"
---

![data structure](/images/teaching/data-structures-course.webp){: .align-left width="200" style="float: left; margin-right: 10px;"}  
Data structures are fundamental components in computer science, serving as the building blocks for organizing, managing, and storing data efficiently. They enable the systematic arrangement of data to facilitate various operations such as searching, sorting, inserting, and deleting. Common data structures include arrays, linked lists, stacks, queues, trees, and graphs, each with unique properties and use cases. These fundamental concepts are the cornerstone of computer science and programming, and a deep understanding of them empowers us to write more efficient, organized, and robust code.

## Ders Öğretim Planı  
[Ders Öğretim Planı (PDF)](../files/data_structures/slides/Bolum_00_Ders_Ogretim_Planı.pdf)

---

## Announcements  

---

## The resources  

- Data Structures and Algorithms in Java 6th Edition by Michael T. Goodrich, Roberto Tamassia, Michael H. Goldwasser [(book)](https://bcs.wiley.com/he-bcs/Books?action=index&itemId=1118771338&bcsId=8635)
- CS-61B: Data Structures [(course page)](https://sp23.datastructur.es/)
- CENG-213: Data Structures [(course page)](https://user.ceng.metu.edu.tr/~ys/ceng213-ds)
- Data Structures Easy to Advanced Course [(youTube)](https://www.youtube.com/watch?v=RBSGKlAvoiM)
- Veri Yapıları ve Algoritmalar, Ders Notları, Mustafa Ege.
- The Algorithms [(github project)](https://github.com/TheAlgorithms/Java)

---

## Past Exams  

- **2024-2025**  
  [vize A](../files/data_structures/slides/2024-2025-data-vize-a-cevaplar.pdf) | 
  [vize B](../files/data_structures/slides/2024-2025-data-vize-b-cevaplar.pdf) | 
  [telafi](../files/data_structures/slides/2024-2025-data-telafi-cevaplar.pdf) | 
  [final](../files/data_structures/slides/2024-2025-data-final-cevaplar.pdf) | 
  [bütünleme](../files/data_structures/slides/2024-2025-data-butunleme-cevaplar.pdf)

- **2023-2024**  
  [vize](../files/data_structures/slides/2023-2024-data-vize-cevaplar.pdf) | 
  [final](../files/data_structures/slides/2023-2024-data-final-cevaplar.pdf) | 
  [bütünleme](../files/data_structures/slides/2023-2024-data-butunleme-cevaplar.pdf)

- **Çalışma Soruları**  
  [vize](../files/data_structures/slides/vize_calisma.txt) | 
  [final](../files/data_structures/slides/final_calisma.txt)

---

## Chapter 1: Introduction  

Data structures are the backbone of computer science, serving as the fundamental building blocks that enable us to efficiently store, organize, and manipulate data. Each data structure has its own unique characteristics, advantages, and trade-offs, making them suitable for different scenarios and requirements. Understanding these structures is crucial for writing efficient code and solving complex computational problems.

- [Sunum-Giriş (PDF)](../files/data_structures/slides/Bolum_01_Giris.pdf)  
- [Data Structures (HTML)](../teaching/data-structures/intro-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_01_Introduction.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders01/src)  

---

## Chapter 2: Arrays  

Arrays are like the bread and butter of programming. An array is the most fundamental data structure, consisting of a collection of elements stored in contiguous memory locations. Think of it as a row of boxes, each containing a value, where you can instantly access any element using its index number. Arrays excel at random access operations and are perfect for situations where you know the size of your data in advance. However, they can be inefficient when it comes to insertions and deletions, as these operations might require shifting many elements.

- [Sunum-Diziler (PDF)](../files/data_structures/slides/Bolum_02_Diziler.pdf)  
- [Array Simulator (HTML)](../teaching/data-structures/array-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_02_Arrays_Linked_Lists.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders02/src)  

---

## Chapter 3: Linked Lists  

Linked lists are dynamic and flexible data structures that consist of nodes connected through pointers. A linked list is like a chain of connected nodes, where each node contains both data and a reference (or link) to the next node in the sequence. Unlike arrays, linked lists don't require contiguous memory allocation, making them more flexible for insertions and deletions. They're particularly useful when you need to frequently add or remove elements from the middle of the data structure. However, they sacrifice random access capability, as you must traverse from the beginning to reach any particular element. 

- [Sunum-Bağlı-Liste (PDF)](../files/data_structures/slides/Bolum_03_Bagli_Liste.pdf)  
- [Linked List Simulator (HTML)](../teaching/data-structures/linked-list-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_02_Arrays_Linked_Lists.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders03/src)  

---

## Chapter 4: Stacks  

A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. Imagine a stack of plates where you can only add or remove the top plate. Stacks are widely used in scenarios like undo functionality in text editors, parsing expressions, and managing function calls in programming. They are simple yet powerful and can be implemented using arrays or linked lists.

- [Sunum-Stack (PDF)](../files/data_structures/slides/Bolum_04_Stack.pdf)  
- [Stack Simulator (HTML)](../teaching/data-structures/stack-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_03_Stacks_Queues.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders04/src)  

---

## Chapter 5: Queues  

A queue is another linear data structure but follows the First In, First Out (FIFO) principle, much like a line of people waiting for service. Queues are essential for managing tasks in operating systems, scheduling, and breadth-first search in graphs. Variants like circular queues, priority queues, and dequeues extend its capabilities to solve specialized problems.

- [Sunum-Queue (PDF)](../files/data_structures/slides/Bolum_05_Queue.pdf)  
- [Queue Simulator (HTML)](../teaching/data-structures/queue-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_03_Stacks_Queues.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders05/src)  

---

## Chapter 6: Trees  

Trees are hierarchical data structures that resemble a tree with a root and branches. The most common types are binary trees, binary search trees, and AVL trees. They are excellent for representing hierarchical relationships like file systems and organizational structures. Operations like searching, inserting, and deleting can be very efficient in well-balanced trees.

- [Sunum-Ağaçlar (PDF)](../files/data_structures/slides/Bolum_06_Agaclar.pdf)  
- [Tree Simulator (HTML)](../teaching/data-structures/tree-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_04_Trees.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders06/src)  

---

## Chapter 7: Graphs  

Graphs consist of vertices (nodes) connected by edges. They are versatile structures used to model networks like social media, transportation, and communication. Algorithms such as Dijkstra's, Kruskal's, and BFS/DFS help solve graph-based problems efficiently.

- [Sunum-Grafikler (PDF)](../files/data_structures/slides/Bolum_07_Grafikler.pdf)  
- [Graph Simulator (HTML)](../teaching/data-structures/graph-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_05_Graphs.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders07/src)  

---

## Chapter 8: Hash Tables  

Hash tables use a hash function to map keys to indices in an array, providing constant-time complexity for lookups, insertions, and deletions. They are fundamental in databases, caching, and associative arrays. Collision handling techniques like chaining and open addressing are key to maintaining efficiency.

- [Sunum-Hash Tabloları (PDF)](../files/data_structures/slides/Bolum_08_Hash_Tablolari.pdf)  
- [Hash Table Simulator (HTML)](../teaching/data-structures/hash-table-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_06_Hash_Tables.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders08/src)  

---

## Chapter 9: Heaps and Priority Queues  

Heaps are specialized binary trees that maintain the heap property, where the parent node is always greater (max-heap) or smaller (min-heap) than its children. Priority queues, built on heaps, allow efficient retrieval of the highest or lowest priority element. These structures are essential in algorithms like Dijkstra's and Huffman coding.

- [Sunum-Heaps (PDF)](../files/data_structures/slides/Bolum_09_Heaps.pdf)  
- [Heap Simulator (HTML)](../teaching/data-structures/heap-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_07_Heaps_Priority_Queues.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders09/src)  

---

## Chapter 10: Search Trees  

A search tree, particularly a Binary Search Tree (BST), is a binary tree data structure where each node's left subtree contains only nodes with keys less than the node's key, and the right subtree contains only nodes with keys greater than the node's key. This property makes them extremely efficient for searching, inserting, and deleting elements, typically in O(log n) time when balanced. They're fundamental in implementing databases, file systems, and for maintaining sorted data in a dynamic setting. They underpin many searching and sorting algorithms, making them indispensable for computer scientists and programmers alike.  

- [Sunum-Arama Ağaçları (PDF)](../files/data_structures/slides/Bolum_10_Arama_Agaclari.pdf)  
- Simulators:  
  - [BST Simulator (HTML)](../teaching/data-structures/binary-search-tree-simulator)  
  - [Red-Black Tree Simulator (HTML)](../teaching/data-structures/red-black-tree-simulator)  
  - [AVL Tree Simulator (HTML)](../teaching/data-structures/avl-tree-simulator)  
  - [Splay Tree Simulator (HTML)](../teaching/data-structures/splay-tree-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_06_Trees.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders10/src)  

---

## Chapter 11: Graphs  

A graph is a versatile data structure consisting of vertices (or nodes) connected by edges, representing relationships between objects. Unlike trees, graphs can have cycles and multiple paths between nodes. They can be directed (edges have direction) or undirected, weighted or unweighted. Graphs are essential for modeling complex networks like social connections, road maps, computer networks, or any system where relationships between entities need to be represented and analyzed. They support various algorithms for traversal, shortest path finding, and network analysis. Understanding graph theory and traversal algorithms is essential for solving complex problems.  

- [Sunum-Çizge (PDF)](../files/data_structures/slides/Bolum_11_Cizge.pdf)  
- [Graph Simulator (HTML)](../teaching/data-structures/graph-simulator)  
- [Dijkstra Simulator (HTML)](../teaching/data-structures/dijkstra-algorithm-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_07_Graphs.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders11/src)  

---

## Chapter 12: Sets  

A set is a collection of distinct elements where order doesn't matter and duplicates are not allowed. Think of it as a mathematical set, perfect for maintaining a unique collection of items. Sets support operations like union, intersection, and difference, making them invaluable for comparing collections of data or removing duplicates. They're typically implemented using hash tables underneath, providing fast lookup and insertion operations. Sets are extensively used in database queries, finding unique values, and checking for membership in a collection.  

- [Sunum-Kümeler (PDF)](../files/data_structures/slides/Bolum_12_Kumeler.pdf)  
- [Sets Simulator (HTML)](../teaching/data-structures/sets-simulator)  
- [Lecture Notes (PDF)](../files/data_structures/Chapter_07_Graphs.pdf)  
- [Code Examples (Github)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders12/src)  

---

## Lecture Notes  

- [Advanced Data Structures (PDF)](../files/data_structures/Chapter_09_Advanced_Data_Structures.pdf)  
- [Advanced Topics (PDF)](../files/data_structures/Chapter_10_Advanced_Topics.pdf)  
- [Applications (PDF)](../files/data_structures/Chapter_11_Applications.pdf)  
