---
title: "Microprocessors"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/microprocessors
venue: "University of Giresun, Department of Electrical Electronics Engineering"
date: 2024-01-05
location: "Giresun, Turkey"
---

<img align="left" width="200" alt="microprocessor" src="/images/teaching/microprocessor-course.png" style="float: left; margin-right: 10px;"> Microprocessors act as the heartbeat of modern computing systems, executing numerous tasks with remarkable speed and precision. The x86 architecture, renowned for its adaptability and extensive use in personal computers and servers, provides a foundation for understanding the inner workings of contemporary processors. Microprocessor architecture is the driving force behind computation, makes these small but powerful devices. The complexity of the x86 instruction set and the fundamentals of assembly language programming are essential to directly communicating with the microprocessor. This includes covering the binary world and using the symbolic language of assembly to manipulate registers, control flow, and interact with memory.

* Ders Öğretim Planı <a href="../files/microprocessors/slides/Bolum_00_Ders_Ogretim_Planı.pdf">[pdf]</a>

* Soru-Cevap <a href="../files/microprocessors/slides/Bolum_12_Soru_Cevap.pdf">[Vize]</a><a href="../files/microprocessors/slides/Bolum_13_Soru_Cevap.pdf">[Final]</a>

* 2023-2024 Vize <a href="../files/microprocessors/slides/2023-2024-vize-cevap.pdf">[pdf]</a>

Duyurular
---

The resources:
---

* Emu8086 Microprocessor Emulator <a href="https://emu8086-microprocessor-emulator.en.softonic.com/">[website]</a>
* CPU Emulator <a href="https://www.cmpe.boun.edu.tr/~tugcu/animations/cpu-simulator/cpu-simulator.html">[website]</a>
* Barry B. Brey, The Intel Microprocessors, Pearson.
* Topaloğlu, Nurettin, “X86 Tabanlı Mikroişlemci Mimarisi ve Assembly Dili”, Seçkin Yayınevi.
* Mikroişlemcilere Giriş Assembler ile Yazılım ve Arayüz Mehmet Bodur <a href="../files/microprocessors/Mikroislemcilere_giris.pdf">[pdf]</a>
* Intel 8086 ile Mikroişlemci Programlamaya Giriş Şadi Çağatay Öztürk <a href="../files/microprocessors/Intel_8086_ile.pdf">[pdf]</a>


Chapter 1: Introduction, 8086 Architecture
---

This chapter provides a foundational overview of microprocessor basics. It introduces the fundamental concepts of microprocessors and explores the significance of the 8086 architecture in computer systems. The content focuses on essential principles, helping students grasp the core workings of microprocessors.

* Sunum-Giriş <a href="../files/microprocessors/slides/Bolum_01_Giris.pdf">[pdf]</a>
* Sunum-Mimari <a href="../files/microprocessors/slides/Bolum_01_8086_Mimarisi.pdf">[pdf]</a>
* Sunum-Programlama Dilleri <a href="../files/microprocessors/slides/Bolum_01_Programlama_Dilleri.pdf">[pdf]</a>

Chapter 2: 8086 Registers, Pins
---

Registers, acting as small, fast storage locations, play a crucial role in executing instructions and temporarily storing data. This chapter also covers the essential pins that facilitate communication and data transfer within the microprocessor. Understanding the interplay between registers and pins is foundational for understanding the complex operations of the 8086 architecture.

* Sunum-Pinler <a href="../files/microprocessors/slides/Bolum_02_8086_Pinler.pdf">[pdf]</a>
* Sunum-Yazmaçlar <a href="../files/microprocessors/slides/Bolum_02_8086_Yazmaclar.pdf">[pdf]</a>

Chapter 3: Numbering systems, What is assembly language?
---

Understanding numbering systems, which include binary and hexadecimal, is crucial for effectively handling data in microprocessor contexts. At the same time, the section examines the characteristics and importance of assembly language, explaining its role as the bridge between human-readable code and machine-executable instructions. This detailed approach prepares the groundwork for a thorough exploration of microprocessor architecture and the complex interaction between hardware and software that shapes the field of computing.

* Sunum-Sayı Sistemleri <a href="../files/microprocessors/slides/Bolum_03_Sayi_Sistemleri.pdf">[pdf]</a>
* Sunum-Assembly Dili <a href="../files/microprocessors/slides/Bolum_03_Assembly.pdf">[pdf]</a>

Chapter 4: Memory access, Variables
---

Understanding the details of memory access is important, as it dictates how data is stored and retrieved. This chapter will systematically examine the mechanisms and principles controlling the memory operations in microprocessors. At the same time, this section covers the idea of variables, explaining how they work in storing and handling data.

* Sunum-Bellek Erişimi <a href="../files/microprocessors/slides/Bolum_04_Bellek_Erisimi.pdf">[pdf]</a>
* Sunum-Değişkenler <a href="../files/microprocessors/slides/Bolum_04_Degiskenler.pdf">[pdf]</a>

Chapter 5: Interrupts, Common functions - emu8086.inc
---

Interrupts, as a pivotal mechanism, play a crucial role in managing the flow of execution and responding to external events. This chapter systematically explores the concepts and functionalities associated with interrupts, providing insights into their significance in microprocessor programming. Additionally, this section covers common functions encapsulated in the emu8086.inc library, express the essential features of their utility and integration within the broader context of assembly language programming. 

* Sunum-Kesmeler <a href="../files/microprocessors/slides/Bolum_05_Kesmeler.pdf">[pdf]</a>
* Sunum-Kütüphane <a href="../files/microprocessors/slides/Bolum_05_Kutuphane.pdf">[pdf]</a>

Chapter 6: Arithmetic and logic instructions
---

As the building blocks of computational processes, arithmetic and logic instructions are essential for performing mathematical operations and logical comparisons within the microprocessor architecture. This chapter systematically examines the complexity of arithmetic and logic instructions, providing a detailed analysis of their operational mechanisms and practical applications in assembly language programming. 

* Sunum-Aritmetik ve Mantıksal İşlemler <a href="../files/microprocessors/slides/Bolum_06_Aritmetik_Mantik.pdf">[pdf]</a>

Chapter 7: Flow control, Procedures
---

Flow control mechanisms determine the sequence of execution within a program, enabling efficient decision-making and iterative processes. This chapter systematically examines the various forms of flow control instructions and their applications in assembly language programming. Additionally, this chapter covers procedures, modular and reusable code blocks, fundamental for structured programming.

* Sunum-Akış Kontrolü <a href="../files/microprocessors/slides/Bolum_07_Akis_Kontrol.pdf">[pdf]</a>
* Sunum-Prosedürler <a href="../files/microprocessors/slides/Bolum_07_Prosedurler.pdf">[pdf]</a>

Chapter 8: Stack, Macros
---

The stack, a dynamic data structure, plays a fundamental role in facilitating subroutine calls, parameter passing, and local variable storage. This chapter systematically dissects the mechanisms and functionalities associated with stack operations, shedding light on its significance in the context of assembly language programming. Concurrently, this chapter covers macros, which offer a means of encapsulating and reusing code blocks.

* Sunum-Yığın <a href="../files/microprocessors/slides/Bolum_08_Yigin.pdf">[pdf]</a>
* Sunum-Makrolar <a href="../files/microprocessors/slides/Bolum_08_Makrolar.pdf">[pdf]</a>

Chapter 9: Controlling external devices
---

This chapter navigates through the critical aspect of controlling external devices, explains the methods and protocols for interfacing with peripheral hardware. 

* Sunum-Aygıt Kontrolü <a href="../files/microprocessors/slides/Bolum_09_Aygit_Kontrolu.pdf">[pdf]</a>

Chapter 10: 8086 Instruction Set
---

As the foundation of x86 architecture, the 8086 instruction set defines the repertoire of operations that the microprocessor can execute. This chapter systematically dissects the instructions available, covering their classifications, formats, and practical applications in assembly language programming. 

* Sunum-Komut Kümesi <a href="../files/microprocessors/slides/Bolum_10_Komut_Kumesi.pdf">[pdf]</a>

Chapter 11: 8086 Interrupt Functions 
---

Interrupts, fundamental to microprocessor operations, enable the system to respond promptly to external events and prioritize certain tasks. This chapter systematically examines the diverse interrupt functions of the 8086 architecture, examining their classifications, vectors, and practical implementations in assembly language programming.

* Sunum-Kesme Fonksiyonları <a href="../files/microprocessors/slides/Bolum_11_Kesme_Fonksiyonlari.pdf">[pdf]</a>
