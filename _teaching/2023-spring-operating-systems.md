---
title: "Operating Systems"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/2023-spring-operating-systems
venue: "University of Giresun, Department of Computer Engineering"
date: 2023-02-02
location: "Giresun, Turkey"
---

<img align="left" width="200" alt="operating systems" src="/images/teaching/operating-systems-course.jpg"> Operating systems are the foundation of modern computing. They manage the hardware and software resources of a computer, providing a platform for other programs to run on. Without an operating system, a computer would be nothing more than a collection of hardware components.

The resources: 
-----

* Modern Operating Systems, Andrew S. Tanenbaum <a href="https://www.amazon.com/Modern-Operating-Systems-Andrew-Tanenbaum/dp/013359162X">[book]</a>
* Operating System Concepts, A. SilberSchatz, P. Galvin, and G. Gagne <a href="https://www.os-book.com/OS10/index.html">[e-book]</a>
* Operating Systems: Three Easy Pieces <a href="https://pages.cs.wisc.edu/~remzi/OSTEP">[e-book]</a>
* İşletim Sistemleri, Prof. Dr. Kemal Bıçakcı <a href="https://www.youtube.com/watch?v=sqtkwd09KXs&list=PLmPsb7nQhv7NLRWdIiDVNBDCMOtuUn6WZ">[youtube]</a>
* Bilgisayar İşletim Sistemleri, Prof. Dr. Ali Saatçi, 2. Baskı.
* Operating System Development <a href="https://wiki.osdev.org/Main_Page">[website]</a>
* Operating Systems From 0 to 1 <a href="http://sercankulcu.github.io/files/os/Book_Operating_Systems_From_0_to_1.pdf">[pdf]</a>

Preface: 
-----

Welcome to the world of operating systems, where we delve into the fundamental concepts, design principles, and implementation techniques that form the basis of modern computing systems.

* The prerequisities <a href="http://sercankulcu.github.io/files/os/The_prerequisites.pdf">[pdf]</a>
* Important people <a href="http://sercankulcu.github.io/files/os/Important_people.pdf">[pdf]</a>
* Questions & Answers from OSTEP <a href="http://sercankulcu.github.io/files/os/QA_from_OSTEP.pdf">[pdf]</a>

Chapter 1: Introduction: 
-----

As the bridge between hardware and software, operating systems serve as the foundation for modern computing, providing the necessary abstractions and services to enable applications to run efficiently and securely on diverse hardware platforms.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_01_Giris.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_01.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter1">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_1_Introduction.txt">[txt]</a>

Chapter 2: Structures: 
-----

The design and organization of an operating system's internal components and mechanisms, collectively referred to as its structure, play a critical role in determining its performance, reliability, and functionality.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_02_Yapilar.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_02.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter2">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_2_Structures.txt">[txt]</a>

Chapter 3: Processes: 
-----

In the world of operating systems, processes serve as the cornerstone of multi-tasking and concurrency, enabling multiple applications to execute simultaneously while sharing resources efficiently and securely.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_03_Surecler.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_03.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter3">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_3_Processes.txt">[txt]</a>

Chapter 4: Threads: 
-----

Threads, as lightweight execution units within a process, provide a powerful mechanism for achieving concurrency and parallelism in modern operating systems, enabling applications to take full advantage of multi-core processors and other hardware resources.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_04_Is_Parcaciklari.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_04.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter4">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_4_Threads.txt">[txt]</a>

Chapter 5: Scheduling: 
-----

CPU scheduling is a critical component of any operating system, responsible for determining which processes and threads should be executed by the CPU at any given time, in order to maximize system throughput, responsiveness, and fairness.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_05_Cizelgeleme.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_05.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter5">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_5_Scheduling.txt">[txt]</a>

Chapter 6: Synchronization: 
-----

In a multi-threaded or multi-process environment, synchronization mechanisms provide the means for coordinating access to shared resources and ensuring consistency and correctness in the face of concurrent access and modification.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_06_Senkronizasyon.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_06.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter6">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_6_Synchronization.txt">[txt]</a>

Chapter 7: Deadlocks: 
-----

Deadlocks, which occur when multiple processes or threads are blocked and unable to proceed due to conflicting resource dependencies, are a common and challenging problem in operating system design and require careful consideration of resource allocation and scheduling policies to prevent and resolve.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_07_Kilitlenme.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_07.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter7">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_7_Deadlocks.txt">[txt]</a>


Chapter 8: Memory management: 
-----

Memory management, which involves the allocation, monitoring, and protection of a computer's physical memory resources, is a critical component of any operating system, providing the foundation for efficient and reliable application execution.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_08_Bellek_Yonetimi.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_08.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter8">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_8_Memory_management.txt">[txt]</a>

Chapter 9: Virtual memory: 
----- 

Virtual memory, a key technique used by modern operating systems to manage memory resources, enables applications to access a larger, virtual address space than is physically available, providing a powerful mechanism for efficient memory allocation, protection, and sharing.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_09_Sanal_Bellek.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_09.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter9">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_9_Virtual_memory.txt">[txt]</a>

Chapter 10: File systems: 
-----

File systems, which provide a hierarchical organization and management scheme for data storage on disk or other persistent storage devices, are a fundamental component of any modern operating system, enabling applications to store and access data efficiently and reliably.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_10_Dosya_Sistemleri.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_10.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter10">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_10_File_systems.txt">[txt]</a>

Chapter 11: Input/output: 
-----

IO operations, which involve the movement of data between a computer and external devices, are a critical component of any operating system, providing the means for applications to interact with the physical world and enabling efficient and reliable data transfer.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_11_Giris_Cikis.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_11.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter11">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_11_Input_output.txt">[txt]</a>


Chapter 12: Multiple processor systems: 
-----

As multi-core processors and distributed computing systems become increasingly prevalent, the design and implementation of operating systems for multiple processor systems presents unique challenges and opportunities, requiring careful consideration of issues such as process and thread scheduling, memory management, and communication and synchronization mechanisms.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_12_Cok_Islemcili_Sistemler.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_12.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter12">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_12_Multiple_processor_systems.txt">[txt]</a>

Chapter 13: Security: 
-----

Security is a critical concern in modern computing environments, and operating systems play a central role in providing the necessary mechanisms and policies to protect system resources, data, and applications from unauthorized access, modification, and other forms of attack.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_13_Guvenlik.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_13.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter13">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_13_Security.txt">[txt]</a>

Chapter 14: Multimedia: 
-----

With the growing demand for multimedia applications such as audio and video playback, real-time communication, and graphical rendering, operating systems must provide specialized support and optimizations to ensure efficient and responsive performance on a diverse range of hardware platforms.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_14_Coklu_Ortam.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_14.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter14">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_14_Multimedia.txt">[txt]</a>


Chapter 15: Operating system design: 
-----

Operating system design involves the careful consideration of a wide range of factors, including performance, reliability, security, compatibility, and usability, and requires a deep understanding of the underlying hardware and software components, as well as the needs and expectations of end-users and developers.

* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_15_Isletim_Sistemi_Tasarimi.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_15.pdf">[pdf]</a>
* Code Examples <a href="https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter15">[link]</a>
* Question & answers <a href="http://sercankulcu.github.io/files/os/questions/Chapter_15_Operating_system_design.txt">[txt]</a>

Chapter 16: Case studies:
-----

**UNIX - Linux**
* **Slides [TR]** <a href="http://sercankulcu.github.io/files/os/slides/Bolum_16_Linux.pdf">[pdf]</a>
* Lecture Notes <a href="http://sercankulcu.github.io/files/os/notes/Notes_16.pdf">[pdf]</a>
