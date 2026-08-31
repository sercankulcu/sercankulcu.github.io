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
Data structures provide systematic ways to organize, store, and access data. Choosing an appropriate structure directly affects the efficiency of operations such as searching, insertion, deletion, and traversal. This course examines arrays, linked structures, stacks, queues, trees, hash tables, graphs, and sets, with an emphasis on their implementations, complexity, and practical applications.

## Ders Öğretim Planı  
[Ders Öğretim Planı (PDF)](../files/data_structures/slides/Bolum_00_Ders_Ogretim_Planı.pdf)

---

## Announcements  

There are currently no announcements.

---

## Course resources  

- **books**  
  [Data Structures and Algorithms in Java by Goodrich](https://bcs.wiley.com/he-bcs/Books?action=index&itemId=1118771338&bcsId=8635) | 
  [Data Structures and Algorithms Made Easy](https://www.amazon.com/gp/product/819324527X) | 
  [Algorithms Unlocked](https://www.amazon.com/gp/product/0262518805)

- **course webpages**  
  [CS-61B](https://sp23.datastructur.es) | 
  [CENG-213](https://user.ceng.metu.edu.tr/~ys/ceng213-ds)

- **youtube**  
  [Data Structures Easy to Advanced Course](https://www.youtube.com/watch?v=RBSGKlAvoiM)

- **lecture notes**  
  [Mustafa Ege (1)](../files/data_structures/Veri_Yapilari_ve_Algoritmalar_1_Mustafa_Ege.pdf) | 
  [Mustafa Ege (2)](../files/data_structures/Veri_Yapilari_ve_Algoritmalar_2_Mustafa_Ege.pdf) | 
  [Aybars Uğur](../files/data_structures/Veri_Yapilari_Aybars_Ugur.pdf)

- **github**  
  [The Algorithms](https://github.com/TheAlgorithms/Java) | 
  [DSA Bootcamp](https://github.com/kunal-kushwaha/DSA-Bootcamp-Java) | 
  [Awesome leetcode resources](https://github.com/ashishps1/awesome-leetcode-resources)

---

## Past Exams  

- **2025-2026**  
  [vize](../files/data_structures/slides/2025-2026-data-vize-cevaplar.pdf) | 
  [final](../files/data_structures/slides/2025-2026-data-final-cevaplar.pdf) | 
  [but](../files/data_structures/slides/2025-2026-data-butunleme-cevaplar.pdf)

- **2024-2025**  
  [vize A](../files/data_structures/slides/2024-2025-data-vize-a-cevaplar.pdf) | 
  [vize B](../files/data_structures/slides/2024-2025-data-vize-b-cevaplar.pdf) | 
  [telafi](../files/data_structures/slides/2024-2025-data-telafi-cevaplar.pdf) | 
  [final](../files/data_structures/slides/2024-2025-data-final-cevaplar.pdf) | 
  [but](../files/data_structures/slides/2024-2025-data-butunleme-cevaplar.pdf)

- **2023-2024**  
  [vize](../files/data_structures/slides/2023-2024-data-vize-cevaplar.pdf) | 
  [final](../files/data_structures/slides/2023-2024-data-final-cevaplar.pdf) | 
  [but](../files/data_structures/slides/2023-2024-data-butunleme-cevaplar.pdf)

---

## Preliminary Materials: 

* [Important People in Data Structures (HTML)](../files/data_structures/Data_Structures_Important_People.html)
* [Prerequisites for Data Structures (HTML)](../files/data_structures/Data_Structures_Prerequisites.html)

---

## Chapter 1: Introduction  

Data structures are the backbone of computer science, serving as the fundamental building blocks that enable us to efficiently store, organize, and manipulate data. Each data structure has its own unique characteristics, advantages, and trade-offs, making them suitable for different scenarios and requirements. Understanding these structures is crucial for writing efficient code and solving complex computational problems.

- [🖼️Sunum-Giriş (PDF)](../files/data_structures/slides/Bolum_01_Giris.pdf)  
- [🕹️Data Structures (HTML)](../files/data_structures/slides/Bolum_01_Intro.html)  
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_01_Introduction.pdf)  
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders01/src)  

---

## Chapter 2: Arrays  

Arrays are like the bread and butter of programming. An array is the most fundamental data structure, consisting of a collection of elements stored in contiguous memory locations. Think of it as a row of boxes, each containing a value, where you can instantly access any element using its index number. Arrays excel at random access operations and are perfect for situations where you know the size of your data in advance. However, they can be inefficient when it comes to insertions and deletions, as these operations might require shifting many elements.

- [🖼️Sunum-Diziler (PDF)](../files/data_structures/slides/Bolum_02_Diziler.pdf)  
- [🕹️Array Simulator (HTML)](../files/data_structures/slides/Bolum_02_Arrays.html)  
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_02_Arrays_Linked_Lists.pdf)  
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders02/src)  

---

## Chapter 3: Linked Lists  

Linked lists are dynamic and flexible data structures that consist of nodes connected through pointers. A linked list is like a chain of connected nodes, where each node contains both data and a reference (or link) to the next node in the sequence. Unlike arrays, linked lists don't require contiguous memory allocation, making them more flexible for insertions and deletions. They're particularly useful when you need to frequently add or remove elements from the middle of the data structure. However, they sacrifice random access capability, as you must traverse from the beginning to reach any particular element. 

- [🖼️Sunum-Bağlı-Liste (PDF)](../files/data_structures/slides/Bolum_03_Bagli_Liste.pdf)  
- [🕹️Linked List Simulator (HTML)](../files/data_structures/slides/Bolum_03_Linked_List.html)  
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_02_Arrays_Linked_Lists.pdf)  
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders03/src)  

---

## Chapter 4: Stacks  

A stack operates on the Last-In-First-Out (LIFO) principle, much like a stack of plates where you can only add or remove from the top. This data structure is fundamental in programming for managing function calls, handling undo operations, or parsing expressions. The key operations, push (add) and pop (remove), make it perfect for tracking state or handling recursion. Think of browsing history in a web browser, where each new page is pushed onto the stack, and hitting the back button pops the most recent page.

- [🖼️Sunum-Yığın (PDF)](../files/data_structures/slides/Bolum_04_Yigin.pdf)  
- [🕹️Stack Simulator (HTML)](../files/data_structures/slides/Bolum_04_Stack.html)  
- 🕹️Applications:
  - [Hanoi Towers](../files/data_structures/slides/Bolum_04_Tower_of_Hanoi.html)
  - [Stock Span](../files/data_structures/slides/Bolum_04_Stock_Span.html)
  - [Infix to Prefix](../files/data_structures/slides/Bolum_04_Infix_to_Prefix.html)
  - [Infix to Postfix](../files/data_structures/slides/Bolum_04_Infix_to_Postfix.html)
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_03_Stacks_Queues_Deques.pdf)  
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders04/src)  

---

## Chapter 5: Queues  

A queue follows the First-In-First-Out (FIFO) principle, similar to a line of people waiting for a service. Elements are added at one end (enqueue) and removed from the other end (dequeue), making it ideal for managing tasks that need to be processed in the order they were received. Queues are extensively used in scenarios like print job scheduling, handling requests in web servers, or managing any kind of service where maintaining order of arrival is important.

- [🖼️Sunum-Kuyruk (PDF)](../files/data_structures/slides/Bolum_05_Kuyruk.pdf)  
- 🕹️Simulators:
  - [Queue Simulator (HTML)](../files/data_structures/slides/Bolum_05_Queue.html)
  - [Deque Simulator (HTML)](../files/data_structures/slides/Bolum_05_Deque.html)
- 🕹️Applications:
  - [Scheduler](../files/data_structures/slides/Bolum_05_Scheduler.html)
  - [Priority Scheduler](../files/data_structures/slides/Bolum_05_Priority_Scheduler.html)
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_03_Stacks_Queues_Deques.pdf)  
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders05/src)  

---

## Chapter 6: The List ADT and Java List Implementations

A list is an abstract data type representing an ordered sequence of elements. It can grow or shrink dynamically and supports operations such as insertion, deletion, access, and traversal. Lists may be implemented using dynamic arrays, linked structures, or other underlying representations. In Java, commonly used implementations include ArrayList and LinkedList, each offering different performance characteristics.

- [🖼️Sunum-Liste (PDF)](../files/data_structures/slides/Bolum_06_Liste.pdf)
- [🕹️List ADT Simulator (HTML)](../files/data_structures/slides/Bolum_06_List_ADT.html)
- [🖼️Sunum-Sorular (PDF)](../files/data_structures/slides/Bolum_06_Sorular.pdf)
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_04_Lists.pdf)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders06/src)

---

## Chapter 7: Trees  

A tree is a hierarchical data structure composed of nodes connected by edges, similar to a family tree or organizational chart. Each node can have multiple children but only one parent, creating a branching structure that starts from a root node. Trees are invaluable for representing hierarchical relationships, such as file systems, HTML DOM, or category classifications. They provide efficient operations for insertion, deletion, and searching, particularly when balanced properly. The efficiency of tree operations depends heavily on the tree's height, making balance an important consideration in search-oriented tree structures.

- [🖼️Sunum-Ağaçlar (PDF)](../files/data_structures/slides/Bolum_07_Agac.pdf)  
- 🕹️Simulators:
  - [General Tree Simulator (HTML)](../files/data_structures/slides/Bolum_07_General_Tree.html)  
  - [Binary Tree Simulator (HTML)](../files/data_structures/slides/Bolum_07_Tree.html)  
  - [B-tree Simulator (HTML)](../files/data_structures/slides/Bolum_07_BTree.html)  
  - [B-plus-tree Simulator (HTML)](../files/data_structures/slides/Bolum_07_BPlusTree.html)  
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_06_Trees.pdf)  
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders07/src)  

---

## Chapter 8: Priority Queues and Heaps

A heap is a specialized tree-based data structure that satisfies the heap property - in a max heap, for any given node, the parent's value is greater than or equal to its children's values (or less than or equal to in a min heap). Heaps are particularly efficient for implementing priority queues and finding the maximum/minimum element quickly. They're commonly used in algorithms like heap sort and in systems where you need to repeatedly find and remove the highest (or lowest) priority item.

- [🖼️Sunum-Öncelikli Kuyruk (PDF)](../files/data_structures/slides/Bolum_08_Oncelikli_Kuyruk.pdf)
- 🕹️Simulators:
  - [Heap Simulator (HTML)](../files/data_structures/slides/Bolum_08_Heap.html)
  - [Priority Queue Simulator (HTML)](../files/data_structures/slides/Bolum_08_Priority_Queue.html)
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_08_Heaps_Priority_Queues.pdf)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders08/src)

---

## Chapter 9: Maps and Hash Tables

A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. Using a hash function to compute an index into an array of buckets or slots, hash tables provide rapid data access. Hash tables provide O(1) average-case insertion, deletion, and lookup when the hash function distributes keys effectively. In the worst case, these operations may take O(n) time. They're widely used in database indexing, caches, and implementing sets. However, they must handle collisions (when different keys hash to the same index) and may require resizing as they grow.


- [🖼️Sunum-Hash Tabloları (PDF)](../files/data_structures/slides/Bolum_09_Hash_Tablosu.pdf)
- [🕹️Hash Table Simulator (HTML)](../files/data_structures/slides/Bolum_09_Hash_Table.html)
- [🕹️Map Simulator (HTML)](../files/data_structures/slides/Bolum_09_Map.html)
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_05_Maps_Hash_Tables_Sets.pdf)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders09/src)

---

## Chapter 10: Search Trees  

A search tree, particularly a Binary Search Tree (BST), is a binary tree data structure where each node's left subtree contains only nodes with keys less than the node's key, and the right subtree contains only nodes with keys greater than the node's key. This property makes them extremely efficient. Search, insertion, and deletion take O(h) time, where h is the height of the tree. This becomes O(log n) in a balanced tree but may degrade to O(n) in the worst case. They're fundamental in implementing databases, file systems, and for maintaining sorted data in a dynamic setting. They underpin many searching and sorting algorithms, making them indispensable for computer scientists and programmers alike.


- [🖼️Sunum-Arama Ağaçları (PDF)](../files/data_structures/slides/Bolum_10_Arama_Agaclari.pdf)  
- 🕹️Simulators:  
  - [BST Simulator (HTML)](../files/data_structures/slides/Bolum_10_BST.html)  
  - [Red-Black Tree Simulator (HTML)](../files/data_structures/slides/Bolum_10_Red_Black.html)  
  - [AVL Tree Simulator (HTML)](../files/data_structures/slides/Bolum_10_AVL.html)  
  - [Splay Tree Simulator (HTML)](../files/data_structures/slides/Bolum_10_Splay.html)  
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_06_Trees.pdf)  
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders10/src)  

---

## Chapter 11: Graphs  

A graph is a versatile data structure consisting of vertices (or nodes) connected by edges, representing relationships between objects. Unlike trees, graphs can have cycles and multiple paths between nodes. They can be directed (edges have direction) or undirected, weighted or unweighted. Graphs are essential for modeling complex networks like social connections, road maps, computer networks, or any system where relationships between entities need to be represented and analyzed. They support various algorithms for traversal, shortest path finding, and network analysis. Understanding graph theory and traversal algorithms is essential for solving complex problems.

- [🖼️Sunum-Çizge (PDF)](../files/data_structures/slides/Bolum_11_Cizge.pdf)  
- 🕹️Simulators:
  - [Graph Simulator (HTML)](../files/data_structures/slides/Bolum_11_Graph.html)
  - [Directed Graph Simulator (HTML)](../files/data_structures/slides/Bolum_11_Directed_Graph.html)
  - [Dijkstra Simulator (HTML)](../files/data_structures/slides/Bolum_11_Dijkstra.html)
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_07_Graphs.pdf)  
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders11/src)  

---

## Chapter 12: Sets  

A set is a collection of distinct elements where order doesn't matter and duplicates are not allowed. Think of it as a mathematical set, perfect for maintaining a unique collection of items. Sets support operations like union, intersection, and difference, making them invaluable for comparing collections of data or removing duplicates. Sets are commonly implemented using hash tables for average-case constant-time operations or balanced search trees when sorted iteration and ordered operations are required. Sets are extensively used in database queries, finding unique values, and checking for membership in a collection.

- [🖼️Sunum-Kümeler (PDF)](../files/data_structures/slides/Bolum_12_Kumeler.pdf)  
- 🕹️Simulators:
  - [🕹️Set ADT Simulator (HTML)](../files/data_structures/slides/Bolum_12_Set_ADT.html)
  - [🕹️Disjoint Set Union Simulator (HTML)](../files/data_structures/slides/Bolum_12_Disjoint_Set_Union.html)  
- [🗒️Lecture Notes (PDF)](../files/data_structures/Chapter_05_Maps_Hash_Tables_Sets.pdf)
- [💻Code Examples (GitHub)](https://github.com/sercankulcu/data-structures-java/tree/main/Ders12/src)  

---

## Lecture Notes  

- [🗒️Advanced Data Structures (PDF)](../files/data_structures/Chapter_09_Advanced_Data_Structures.pdf)  
- [🗒️Advanced Topics (PDF)](../files/data_structures/Chapter_10_Advanced_Topics.pdf)  
- [🗒️Applications (PDF)](../files/data_structures/Chapter_11_Applications.pdf)  
