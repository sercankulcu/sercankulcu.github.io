---
title: "Data Structures"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/data-structures
venue: "University of Giresun, Department of Computer Engineering"
date: 2024-09-05
location: "Giresun, Turkey"
---

<img align="left" width="200" alt="data structure" src="/images/teaching/data-structures-course.webp" style="float: left; margin-right: 10px;"> Data structures are fundamental components in computer science, serving as the building blocks for organizing, managing, and storing data efficiently. They enable the systematic arrangement of data to facilitate various operations such as searching, sorting, inserting, and deleting. Common data structures include arrays, linked lists, stacks, queues, trees, and graphs, each with unique properties and use cases. These fundamental concepts are the cornerstone of computer science and programming, and a deep understanding of them empowers us to write more efficient, organized, and robust code.

* Ders Öğretim Planı <a href="../files/data_structures/slides/Bolum_00_Ders_Ogretim_Planı.pdf">[pdf]</a>

Announcements:
---


The resources:
---

* Data Structures and Algorithms in Java 6th Edition by Michael T. Goodrich, Roberto Tamassia, Michael H. Goldwasser <a href="https://bcs.wiley.com/he-bcs/Books?action=index&itemId=1118771338&bcsId=8635">[book]</a>
* CS-61B: Data Structures course page <a href="https://sp23.datastructur.es/">[website]</a>
* CENG-213: Data Structures course page <a href="https://user.ceng.metu.edu.tr/~ys/ceng213-ds">[website]</a>
* Data Structures Easy to Advanced Course <a href="https://www.youtube.com/watch?v=RBSGKlAvoiM">[youtube]</a>
* Veri Yapıları ve Algoritmalar, Ders Notları, Mustafa Ege.
* The Algorithms Github project <a href="https://github.com/TheAlgorithms/Java">[website]</a>

Past Exams:
---

* 2024-2025 <a href="../files/data_structures/slides/2024-2025-data-vize-a-cevaplar.pdf">[vize a]</a> <a href="../files/data_structures/slides/2024-2025-data-vize-b-cevaplar.pdf">[vize b]</a> <a href="../files/data_structures/slides/2024-2025-data-telafi-cevaplar.pdf">[telafi]</a> 
* 2023-2024 <a href="../files/data_structures/slides/2023-2024-data-vize-cevaplar.pdf">[vize]</a> <a href="../files/data_structures/slides/2023-2024-data-final-cevaplar.pdf">[final]</a> <a href="../files/data_structures/slides/2023-2024-data-butunleme-cevaplar.pdf">[bütünleme]</a>
* Çalışma Soruları <a href="../files/data_structures/slides/vize_calisma.txt">[vize]</a> <a href="../files/data_structures/slides/final_calisma.txt">[final]</a>

Chapter 1: Introduction
---

Data structures are the backbone of computer science, serving as the fundamental building blocks that enable us to efficiently store, organize, and manipulate data. Each data structure has its own unique characteristics, advantages, and trade-offs, making them suitable for different scenarios and requirements. Understanding these structures is crucial for writing efficient code and solving complex computational problems.

* Sunum-Giriş <a href="../files/data_structures/slides/Bolum_01_Giris.pdf">[pdf]</a>
* Data Structures <a href="../teaching/data-structures/intro-simulator">[html]</a>
* Lecture Notes <a href="../files/data_structures/Chapter_01_Introduction.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders01/src">[link]</a>

Chapter 2: Arrays
---

Arrays are like the bread and butter of programming. An array is the most fundamental data structure, consisting of a collection of elements stored in contiguous memory locations. Think of it as a row of boxes, each containing a value, where you can instantly access any element using its index number. Arrays excel at random access operations and are perfect for situations where you know the size of your data in advance. However, they can be inefficient when it comes to insertions and deletions, as these operations might require shifting many elements.

* Sunum-Diziler <a href="../files/data_structures/slides/Bolum_02_Diziler.pdf">[pdf]</a>
* Array Simulator <a href="../teaching/data-structures/array-simulator">[html]</a>
* Lecture Notes <a href="../files/data_structures/Chapter_02_Arrays_Linked_Lists.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders02/src">[link]</a>

Chapter 3: Linked Lists
---

Linked lists are dynamic and flexible data structures that consist of nodes connected through pointers. A linked list is like a chain of connected nodes, where each node contains both data and a reference (or link) to the next node in the sequence. Unlike arrays, linked lists don't require contiguous memory allocation, making them more flexible for insertions and deletions. They're particularly useful when you need to frequently add or remove elements from the middle of the data structure. However, they sacrifice random access capability, as you must traverse from the beginning to reach any particular element. 

* Sunum-Bağlı-Liste <a href="../files/data_structures/slides/Bolum_03_Bagli_Liste.pdf">[pdf]</a>
* Linked List Simulator <a href="../teaching/data-structures/linked-list-simulator">[html]</a>
* Lecture Notes <a href="../files/data_structures/Chapter_02_Arrays_Linked_Lists.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders03/src">[link]</a>

Chapter 4: Stacks
---

A stack operates on the Last-In-First-Out (LIFO) principle, much like a stack of plates where you can only add or remove from the top. This data structure is fundamental in programming for managing function calls, handling undo operations, or parsing expressions. The key operations - push (add) and pop (remove) - make it perfect for tracking state or handling recursion. Think of browsing history in a web browser, where each new page is pushed onto the stack, and hitting the back button pops the most recent page.

* Sunum-Yığın <a href="../files/data_structures/slides/Bolum_04_Yigin.pdf">[pdf]</a>
* Stack Simulator <a href="../teaching/data-structures/stack-simulator">[html]</a>
* Applications <a href="../teaching/data-structures/hanoi-towers-game">[Hanoi Towers]</a>
<a href="../teaching/data-structures/stock-span-problem">[Stock Span]</a>
<a href="../teaching/data-structures/infix-to-prefix-converter">[Infix to Prefix]</a>
<a href="../teaching/data-structures/infix-to-postfix-converter">[Infix to Postfix]</a>
* Lecture Notes <a href="../files/data_structures/Chapter_03_Stacks_Queues_Deques.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders04/src">[link]</a>

Chapter 5: Queues
---

A queue follows the First-In-First-Out (FIFO) principle, similar to a line of people waiting for a service. Elements are added at one end (enqueue) and removed from the other end (dequeue), making it ideal for managing tasks that need to be processed in the order they were received. Queues are extensively used in scenarios like print job scheduling, handling requests in web servers, or managing any kind of service where maintaining order of arrival is important.

* Sunum-Kuyruk <a href="../files/data_structures/slides/Bolum_05_Kuyruk.pdf">[pdf]</a>
* Queue Simulator <a href="../teaching/data-structures/queue-simulator">[html]</a>
* Applications <a href="../teaching/data-structures/process-scheduler">[Scheduler]</a>
<a href="../teaching/data-structures/priority-queue-scheduler">[Priority Scheduler]</a>
* Lecture Notes <a href="../files/data_structures/Chapter_03_Stacks_Queues_Deques.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders05/src">[link]</a>

Chapter 6: Lists
---

A list is a versatile data structure that can be implemented in various ways, typically as a dynamic array or linked list. Unlike fixed-size arrays, lists can grow or shrink as needed, making them extremely flexible for storing collections of data. They support operations like insertion, deletion, and traversal, and are particularly useful when you need a sequence of elements but don't know the size in advance. Most modern programming languages provide built-in list implementations with rich functionality.

* Sunum-Liste <a href="../files/data_structures/slides/Bolum_06_Liste.pdf">[pdf]</a>
* Sunum-Sorular <a href="../files/data_structures/slides/Bolum_06_Sorular.pdf">[pdf]</a>
* Lecture Notes <a href="../files/data_structures/Chapter_04_Lists.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders06/src">[link]</a>

Chapter 7: Trees
---

A tree is a hierarchical data structure composed of nodes connected by edges, similar to a family tree or organizational chart. Each node can have multiple children but only one parent, creating a branching structure that starts from a root node. Trees are invaluable for representing hierarchical relationships, such as file systems, HTML DOM, or category classifications. They provide efficient operations for insertion, deletion, and searching, particularly when balanced properly. Trees consist of nodes connected in a hierarchical and branched structure, allowing us to represent complex relationships between data elements. 

* Sunum-Ağaç <a href="../files/data_structures/slides/Bolum_07_Agac.pdf">[pdf]</a>
* Simulators <a href="../teaching/data-structures/binary-tree-simulator">[Binary Tree]</a> 
<a href="../teaching/data-structures/b-tree-simulator">[BTrees]</a> 
* Lecture Notes <a href="../files/data_structures/Chapter_06_Trees.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders07/src">[link]</a>

Chapter 8: Priority Queues, Heaps
---

A heap is a specialized tree-based data structure that satisfies the heap property - in a max heap, for any given node, the parent's value is greater than or equal to its children's values (or less than or equal to in a min heap). Heaps are particularly efficient for implementing priority queues and finding the maximum/minimum element quickly. They're commonly used in algorithms like heap sort and in systems where you need to repeatedly find and remove the highest (or lowest) priority item.

* Sunum-Öncelikli Kuyruk <a href="../files/data_structures/slides/Bolum_08_Oncelikli_Kuyruk.pdf">[pdf]</a>
* Max-Heap Simulator <a href="../teaching/data-structures/heap-simulator">[html]</a>
* Min-Heap Simulator <a href="../teaching/data-structures/min-heap-simulator">[html]</a>
* Priority Queue Simulator <a href="../teaching/data-structures/priority-queue-simulator">[html]</a>
* Lecture Notes <a href="../files/data_structures/Chapter_08_Heaps_Priority_Queues.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders08/src">[link]</a>

Chapter 9: Maps, Hash Tables
---

A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. Using a hash function to compute an index into an array of buckets or slots, hash tables provide rapid data access - typically O(1) time complexity for insertions, deletions, and lookups. They're widely used in database indexing, caches, and implementing sets. However, they must handle collisions (when different keys hash to the same index) and may require resizing as they grow.

* Sunum-Hash Tabloları <a href="../files/data_structures/slides/Bolum_09_Hash_Tablosu.pdf">[pdf]</a>
* Hash Table Simulator <a href="../files/data_structures/slides/Bolum_09_Hash_Tablosu.html">[html]</a>
* Map Simulator <a href="../files/data_structures/slides/Bolum_09_Map.html">[html]</a>
* Lecture Notes <a href="../files/data_structures/Chapter_05_Maps_Hash_Tables_Sets.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders09/src">[link]</a>

Chapter 10: Search Trees
---

A search tree, particularly a Binary Search Tree (BST), is a binary tree data structure where each node's left subtree contains only nodes with keys less than the node's key, and the right subtree contains only nodes with keys greater than the node's key. This property makes them extremely efficient for searching, inserting, and deleting elements, typically in O(log n) time when balanced. They're fundamental in implementing databases, file systems, and for maintaining sorted data in a dynamic setting. They underpin many searching and sorting algorithms, making them indispensable for computer scientists and programmers alike.

* Sunum-Arama Ağaçları <a href="../files/data_structures/slides/Bolum_10_Arama_Agaclari.pdf">[pdf]</a>
* Simulators <a href="../files/data_structures/slides/Bolum_10_BST.html">[BST]</a>
<a href="../files/data_structures/slides/Bolum_10_AgacRB.html">[Red Black Tree]</a> 
<a href="../files/data_structures/slides/Bolum_10_AgacAVL.html">[AVL Tree]</a>
<a href="../files/data_structures/slides/Bolum_10_AgacSplay.html">[Splay Tree]</a>
* Lecture Notes <a href="../files/data_structures/Chapter_06_Trees.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders10/src">[link]</a>

Chapter 11: Graphs
---

A graph is a versatile data structure consisting of vertices (or nodes) connected by edges, representing relationships between objects. Unlike trees, graphs can have cycles and multiple paths between nodes. They can be directed (edges have direction) or undirected, weighted or unweighted. Graphs are essential for modeling complex networks like social connections, road maps, computer networks, or any system where relationships between entities need to be represented and analyzed. They support various algorithms for traversal, shortest path finding, and network analysis. Understanding graph theory and traversal algorithms is essential for solving complex problems.


* Sunum-Çizge <a href="../files/data_structures/slides/Bolum_11_Cizge.pdf">[pdf]</a>
* Graph Simulator <a href="../files/data_structures/slides/Bolum_11_Graph.html">[html]</a>
* Dijkstra Simulator <a href="../files/data_structures/slides/Bolum_11_Dijkstra.html">[html]</a>
* Lecture Notes <a href="../files/data_structures/Chapter_07_Graphs.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders11/src">[link]</a>

Chapter 12: Sets
---

A set is a collection of distinct elements where order doesn't matter and duplicates are not allowed. Think of it as a mathematical set, perfect for maintaining a unique collection of items. Sets support operations like union, intersection, and difference, making them invaluable for comparing collections of data or removing duplicates. They're typically implemented using hash tables underneath, providing fast lookup and insertion operations. Sets are extensively used in database queries, finding unique values, and checking for membership in a collection.

* Sunum-Kümeler <a href="../files/data_structures/slides/Bolum_12_Kumeler.pdf">[pdf]</a>
* Sets Simulator <a href="../files/data_structures/slides/Bolum_12_Sets.html">[html]</a>
* Lecture Notes <a href="../files/data_structures/Chapter_07_Graphs.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/data-structures-java/tree/main/Ders12/src">[link]</a>

Lecture Notes:
---

* Advanced Data Structures <a href="../files/data_structures/Chapter_09_Advanced_Data_Structures.pdf">[pdf]</a>
* Advanced Topics <a href="../files/data_structures/Chapter_10_Advanced_Topics.pdf">[pdf]</a>
* Applications <a href="../files/data_structures/Chapter_11_Applications.pdf">[pdf]</a>
