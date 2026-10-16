---
title: "Operating Systems"
collection: teaching
type: "Undergraduate"
permalink: /teaching/operating-systems
venue: "Giresun University, Computer Engineering"
date: 2026-01-06
location: "Giresun, Turkey"
---

![operating systems](/images/teaching/teaching-operating-systems.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} 
Operating systems are a fundamental part of modern computing. Operating systems manage hardware resources and provide abstractions and services for application software. They coordinate processor time, memory, storage, devices, and communication while supporting protection, isolation, and controlled resource sharing. An operating system provides a platform for programs to run. It acts as a bridge between hardware and software applications. This ensures that applications can interact with hardware using a standardized interface. The operating system handles tasks like memory management, process scheduling, and input/output operations. Without it, a computer is just a collection of hardware components.

---

## Preliminary Materials

* [Important People in Operating Systems (HTML)](../files/os/Pioneers_of_Operating_Systems.html)
* [Prerequisites for Operating Systems (HTML)](../files/os/Prerequisites_for_Operating_Systems.html)
* [Terim Sözlüğü / Glossary (HTML)](../files/os/sozluk.html)

---

## Chapter 1: Introduction  

As the bridge between hardware and software, operating systems serve as the foundation for modern computing, providing the necessary abstractions and services to enable applications to run efficiently and securely on diverse hardware platforms. 

- [🖼️Sunum-Giriş (HTML)](../files/os/slides/Bolum_01_Giris.html)  
- [📄Sunum-Giriş (PDF)](../files/os/pdf/Bolum_01_Giris.pdf)  
- [📝Çalışma Soruları - Giriş (HTML)](../files/os/slides/Bolum_01_Giris_Calisma_Sorulari.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter01/src)  
- [💻Code Examples, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab01)  

---

## Chapter 2: Structures  

The design and organization of an operating system's internal components and mechanisms, collectively referred to as its structure, play a critical role in determining its performance, reliability, and functionality.

- [🖼️Sunum-İşletim Sistemi Yapıları (HTML)](../files/os/slides/Bolum_02_Yapilar.html)  
- [📄Sunum-İşletim Sistemi Yapıları (PDF)](../files/os/pdf/Bolum_02_Yapilar.pdf)  
- [📝Çalışma Soruları - İşletim Sistemi Yapıları (HTML)](../files/os/slides/Bolum_02_Yapilar_Calisma_Sorulari.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter02/src)  
- [💻Code Examples, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab02)  

---

## Chapter 3: Processes  

Processes serve as the cornerstone of multi-tasking and concurrency, enabling multiple applications to execute simultaneously while sharing resources efficiently and securely.

- [🖼️Sunum-Süreçler (HTML)](../files/os/slides/Bolum_03_Surecler.html)  
- [📄Sunum-Süreçler (PDF)](../files/os/pdf/Bolum_03_Surecler.pdf)  
- [📝Çalışma Soruları - Süreçler (HTML)](../files/os/slides/Bolum_03_Surecler_Calisma_Sorulari.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter03/src)  
- [💻Code Examples, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab03)  

---

## Chapter 4: Threads  

Threads, as lightweight execution units within a process, provide a powerful mechanism for achieving concurrency and parallelism in modern operating systems, enabling applications to take full advantage of multi-core processors and other hardware resources.

- [🖼️Sunum-İş Parçacıkları (HTML)](../files/os/slides/Bolum_04_Is_Parcaciklari.html)  
- [📄Sunum-İş Parçacıkları (PDF)](../files/os/pdf/Bolum_04_Is_Parcaciklari.pdf)  
- [📝Çalışma Soruları - İş Parçacıkları (HTML)](../files/os/slides/Bolum_04_Is_Parcaciklari_Calisma_Sorulari.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter04/src)  
- [💻Code Examples, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab04)  

---

## Chapter 5: Scheduling  

CPU scheduling is a critical component of any operating system, responsible for determining which processes and threads should be executed by the CPU at any given time, in order to maximize system throughput, responsiveness, and fairness.

- [🖼️Sunum-CPU Çizelgeleme (HTML)](../files/os/slides/Bolum_05_Cizelgeleme.html)  
- [📄Sunum-CPU Çizelgeleme (PDF)](../files/os/pdf/Bolum_05_Cizelgeleme.pdf)  
- [📝Çalışma Soruları - CPU Çizelgeleme (HTML)](../files/os/slides/Bolum_05_Cizelgeleme_Calisma_Sorulari.html)  
- [🕹️CPU Scheduling Simulator (HTML)](../files/os/slides/Chapter_05_CPU_Scheduling.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter05/src)  
- [💻Code Examples, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab05)  

---

## Chapter 6: Synchronization  

In a multi-threaded or multi-process environment, synchronization mechanisms provide the means for coordinating access to shared resources and ensuring consistency and correctness in the face of concurrent access and modification.

- [🖼️Sunum-Senkronizasyon (HTML)](../files/os/slides/Bolum_06_Senkronizasyon.html)  
- [📄Sunum-Senkronizasyon (PDF)](../files/os/pdf/Bolum_06_Senkronizasyon.pdf)  
- [📝Çalışma Soruları - Senkronizasyon (HTML)](../files/os/slides/Bolum_06_Senkronizasyon_Calisma_Sorulari.html)  
- [🕹️Synchronization Lab (HTML)](../files/os/slides/Chapter_06_Synchronization_Lab.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter06/src)  
- [💻Code Examples, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab06)  

---

## Chapter 7: Deadlocks  

A deadlock occurs when a set of processes or threads waits indefinitely for resources held by one another. This chapter covers deadlock conditions, resource-allocation graphs, prevention, avoidance, detection, and recovery.

- [🖼️Sunum-Kilitlenme (HTML)](../files/os/slides/Bolum_07_Kilitlenme.html)  
- [📄Sunum-Kilitlenme (PDF)](../files/os/pdf/Bolum_07_Kilitlenme.pdf)  
- [📝Çalışma Soruları - Kilitlenme (HTML)](../files/os/slides/Bolum_07_Kilitlenme_Calisma_Sorulari.html)  
- [🕹️Deadlock & Banker's Algorithm Simulator (HTML)](../files/os/slides/Chapter_07_Deadlock_Bankers.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter07/src)  
- [💻Code Examples, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab07)  

---

## Chapter 8: Memory management  

Memory management, which involves the allocation, monitoring, and protection of a computer's physical memory resources, is a critical component of any operating system, providing the foundation for efficient and reliable application execution.

- [🖼️Sunum-Bellek Yönetimi (HTML)](../files/os/slides/Bolum_08_Bellek_Yonetimi.html)  
- [📄Sunum-Bellek Yönetimi (PDF)](../files/os/pdf/Bolum_08_Bellek_Yonetimi.pdf)  
- [📝Çalışma Soruları - Bellek Yönetimi (HTML)](../files/os/slides/Bolum_08_Bellek_Yonetimi_Calisma_Sorulari.html)  
- [🕹️Memory Allocation Simulator (HTML)](../files/os/slides/Chapter_08_Memory_Allocation.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter08/src)  
- [💻Code Examples, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab08)  

---

## Chapter 9: Virtual memory  

Virtual memory gives each process an isolated virtual address space and maps virtual addresses to physical memory or secondary storage. It supports memory protection, controlled sharing, flexible allocation, and demand paging.

- [🖼️Sunum-Sanal Bellek (HTML)](../files/os/slides/Bolum_09_Sanal_Bellek.html)  
- [📄Sunum-Sanal Bellek (PDF)](../files/os/pdf/Bolum_09_Sanal_Bellek.pdf)  
- [📝Çalışma Soruları - Sanal Bellek (HTML)](../files/os/slides/Bolum_09_Sanal_Bellek_Calisma_Sorulari.html)  
- [🕹️Page Replacement Simulator (HTML)](../files/os/slides/Chapter_09_Page_Replacement.html)  
- [🕹️Paging & Address Translation Visualizer (HTML)](../files/os/slides/Chapter_09_Address_Translation.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter09/src)  
- [💻Code Examples, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab09)  

---

## Chapter 10: File systems  

File systems organize named data and metadata and provide abstractions for storing, retrieving, protecting, and sharing information across persistent, networked, virtual, or memory-backed storage.

- [🖼️Sunum-Dosya Sistemleri (HTML)](../files/os/slides/Bolum_10_Dosya_Sistemleri.html)  
- [📄Sunum-Dosya Sistemleri (PDF)](../files/os/pdf/Bolum_10_Dosya_Sistemleri.pdf)  
- [📝Çalışma Soruları - Dosya Sistemleri (HTML)](../files/os/slides/Bolum_10_Dosya_Sistemleri_Calisma_Sorulari.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter10/src)  
- [💻Code Examples, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab10)  

---

## Chapter 11: Input/output  

The operating system manages communication between applications and hardware or virtual devices through drivers, interrupts, buffering, caching, and device-independent I/O interfaces.

- [🖼️Sunum-Giriş/Çıkış (HTML)](../files/os/slides/Bolum_11_Giris_Cikis.html)  
- [📄Sunum-Giriş/Çıkış (PDF)](../files/os/pdf/Bolum_11_Giris_Cikis.pdf)  
- [📝Çalışma Soruları - Giriş/Çıkış (HTML)](../files/os/slides/Bolum_11_Giris_Cikis_Calisma_Sorulari.html)  
- [🕹️Disk Scheduling Simulator (HTML)](../files/os/slides/Chapter_11_Disk_Scheduling.html)  
- [🕹️Interrupt, DMA & I/O Flow Visualizer (HTML)](../files/os/slides/Chapter_11_IO_Interrupt_DMA.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter11/src)  
- [💻Code Examples, C (GitHub)](https://github.com/sercankulcu/operating-systems-labs/tree/main/lab11)  

---

## Chapter 12: Multiprocessor Systems  

Multiprocessor systems introduce challenges involving parallel scheduling, cache coherence, synchronization, processor affinity, load balancing, and memory-access topology across multicore, SMP, and NUMA architectures.

- [🖼️Sunum-Çok İşlemcili Sistemler (HTML)](../files/os/slides/Bolum_12_Cok_Islemcili_Sistemler.html)  
- [📄Sunum-Çok İşlemcili Sistemler (PDF)](../files/os/pdf/Bolum_12_Cok_Islemcili_Sistemler.pdf)  
- [📝Çalışma Soruları - Çok İşlemcili Sistemler (HTML)](../files/os/slides/Bolum_12_Cok_Islemcili_Sistemler_Calisma_Sorulari.html)  
- [🕹️Multicore Scheduling & Load Balancing Simulator (HTML)](../files/os/slides/Chapter_12_Multicore_Scheduling.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter12/src)  

---

## Chapter 13: Security  

Security is a critical concern in modern computing environments, and operating systems play a central role in providing the necessary mechanisms and policies to protect system resources, data, and applications from unauthorized access, modification, and other forms of attack.

- [🖼️Sunum-Güvenlik (HTML)](../files/os/slides/Bolum_13_Guvenlik.html)  
- [📄Sunum-Güvenlik (PDF)](../files/os/pdf/Bolum_13_Guvenlik.pdf)  
- [📝Çalışma Soruları - Güvenlik (HTML)](../files/os/slides/Bolum_13_Guvenlik_Calisma_Sorulari.html)  
- [🕹️OS Protection & Permissions Lab (HTML)](../files/os/slides/Chapter_13_Permissions_Security.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter13/src)  

---

## Chapter 14: Multimedia  

With the growing demand for multimedia applications such as audio and video playback, real-time communication, and graphical rendering, operating systems must provide specialized support and optimizations to ensure efficient and responsive performance on a diverse range of hardware platforms.

- [🖼️Sunum-Çoklu Ortam Sistemleri (HTML)](../files/os/slides/Bolum_14_Coklu_Ortam.html)  
- [📄Sunum-Çoklu Ortam Sistemleri (PDF)](../files/os/pdf/Bolum_14_Coklu_Ortam.pdf)  
- [📝Çalışma Soruları - Çoklu Ortam Sistemleri (HTML)](../files/os/slides/Bolum_14_Coklu_Ortam_Calisma_Sorulari.html)  
- [💻Code Examples, Java (GitHub)](https://github.com/sercankulcu/operating-systems-java/tree/main/Chapter14/src)  

---

## Chapter 15: Operating system design  

Operating system design involves the careful consideration of a wide range of factors, including performance, reliability, security, compatibility, and usability, and requires a deep understanding of the underlying hardware and software components, as well as the needs and expectations of end-users and developers. 

- [🖼️Sunum-İşletim Sistemi Tasarımı (HTML)](../files/os/slides/Bolum_15_Isletim_Sistemi_Tasarimi.html)  
- [📄Sunum-İşletim Sistemi Tasarımı (PDF)](../files/os/pdf/Bolum_15_Isletim_Sistemi_Tasarimi.pdf)  
- [📝Çalışma Soruları - İşletim Sistemi Tasarımı (HTML)](../files/os/slides/Bolum_15_Isletim_Sistemi_Tasarimi_Calisma_Sorulari.html)  
- [🕹️Real-Time Scheduling Simulator (HTML)](../files/os/slides/Chapter_15_Real_Time_Scheduling.html)  

---

## Chapter 16: Case studies  

**UNIX - Linux**
- [🖼️Sunum-Linux (HTML)](../files/os/slides/Bolum_16_Linux.html)  
- [📄Sunum-Linux (PDF)](../files/os/pdf/Bolum_16_Linux.pdf)  
- [📝Çalışma Soruları - Linux (HTML)](../files/os/slides/Bolum_16_Linux_Calisma_Sorulari.html)  
- [🕹️Linux Process Explorer (HTML)](../files/os/slides/Chapter_16_Linux_Process_Explorer.html)  

