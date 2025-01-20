---
title: "Microprocessors"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/microprocessors
venue: "University of Giresun, Department of Electrical Electronics Engineering"
date: 2024-01-05
location: "Giresun, Turkey"
---

![microprocessor](/images/teaching/microprocessor-course.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} 
Microprocessors act as the heartbeat of modern computing systems, executing numerous tasks with remarkable speed and precision. The x86 architecture, renowned for its adaptability and extensive use in personal computers and servers, provides a foundation for understanding the inner workings of contemporary processors. Microprocessor architecture is the driving force behind computation, makes these small but powerful devices. The complexity of the x86 instruction set and the fundamentals of assembly language programming are essential to directly communicating with the microprocessor. This includes covering the binary world and using the symbolic language of assembly to manipulate registers, control flow, and interact with memory.

## Ders Öğretim Planı
- [Ders Öğretim Planı (pdf)](../files/microprocessors/slides/Bolum_00_Ders_Ogretim_Planı.pdf)

---

## Announcements

---

## The Resources

- [Emu8086 Microprocessor Emulator](https://emu8086-microprocessor-emulator.en.softonic.com/)
- [CPU Emulator](https://www.cmpe.boun.edu.tr/~tugcu/animations/cpu-simulator/cpu-simulator.html)
- Barry B. Brey, *The Intel Microprocessors*, Pearson.
- Topaloğlu, Nurettin, *X86 Tabanlı Mikroişlemci Mimarisi ve Assembly Dili*, Seçkin Yayınevi.
- [Mikroişlemcilere Giriş Assembler ile Yazılım ve Arayüz - Mehmet Bodur (pdf)](../files/microprocessors/Mikroislemcilere_giris.pdf)
- [Intel 8086 ile Mikroişlemci Programlamaya Giriş - Şadi Çağatay Öztürk (pdf)](../files/microprocessors/Intel_8086_ile.pdf)

---

## Past Exams:

- **2023-2024**  
  [vize (pdf)](../files/microprocessors/slides/2023-2024-microprocessor-vize-cevap.pdf) | 
  [final (pdf)](../files/microprocessors/slides/2023-2024-microprocessor-final-cevap.pdf) | 
  [bütünleme (pdf)](../files/microprocessors/slides/2023-2024-microprocessor-butunleme-cevap.pdf)
  
- **Soru Cevap**
  [vize (pdf)](../files/microprocessors/slides/Bolum_12_Soru_Cevap.pdf) | 
  [final (pdf)](../files/microprocessors/slides/Bolum_13_Soru_Cevap.pdf)

---

## Chapter 1: Introduction, 8086 Architecture

This chapter provides a foundational overview of microprocessor basics. It introduces the fundamental concepts of microprocessors and explores the significance of the 8086 architecture in computer systems. The content focuses on essential principles, helping students grasp the core workings of microprocessors.

- [Sunum - Giriş (pdf)](../files/microprocessors/slides/Bolum_01_Giris.pdf)
- [Sunum - Mimari (pdf)](../files/microprocessors/slides/Bolum_01_8086_Mimarisi.pdf)
- [Sunum - Programlama Dilleri (pdf)](../files/microprocessors/slides/Bolum_01_Programlama_Dilleri.pdf)

---

## Chapter 2: 8086 Registers, Pins

Registers, acting as small, fast storage locations, play a crucial role in executing instructions and temporarily storing data. This chapter also covers the essential pins that facilitate communication and data transfer within the microprocessor. Understanding the interplay between registers and pins is foundational for understanding the complex operations of the 8086 architecture.

- [Sunum - Pinler (pdf)](../files/microprocessors/slides/Bolum_02_8086_Pinler.pdf)
- [Sunum - Yazmaçlar (pdf)](../files/microprocessors/slides/Bolum_02_8086_Yazmaclar.pdf)

---

## Chapter 3: Numbering systems, What is assembly language?

Understanding numbering systems, which include binary and hexadecimal, is crucial for effectively handling data in microprocessor contexts. At the same time, the section examines the characteristics and importance of assembly language, explaining its role as the bridge between human-readable code and machine-executable instructions.

- [Sunum - Sayı Sistemleri (pdf)](../files/microprocessors/slides/Bolum_03_Sayi_Sistemleri.pdf)
- [Sunum - Assembly Dili (pdf)](../files/microprocessors/slides/Bolum_03_Assembly.pdf)

---

## Chapter 4: Memory access, Variables

Understanding the details of memory access is important, as it dictates how data is stored and retrieved. This chapter will systematically examine the mechanisms and principles controlling the memory operations in microprocessors. At the same time, this section covers the idea of variables, explaining how they work in storing and handling data.

- [Sunum - Bellek Erişimi (pdf)](../files/microprocessors/slides/Bolum_04_Bellek_Erisimi.pdf)
- [Sunum - Değişkenler (pdf)](../files/microprocessors/slides/Bolum_04_Degiskenler.pdf)

---

## Chapter 5: Interrupts, Common functions - emu8086.inc

Interrupts, as a pivotal mechanism, play a crucial role in managing the flow of execution and responding to external events. This chapter explores the concepts and functionalities associated with interrupts, and it covers common functions encapsulated in the emu8086.inc library.

- [Sunum - Kesmeler (pdf)](../files/microprocessors/slides/Bolum_05_Kesmeler.pdf)
- [Sunum - Kütüphane (pdf)](../files/microprocessors/slides/Bolum_05_Kutuphane.pdf)

---

## Chapter 6: Arithmetic and logic instructions

Arithmetic and logic instructions are essential for performing mathematical operations and logical comparisons. This chapter examines their operational mechanisms and practical applications in assembly language programming.

- [Sunum - Aritmetik ve Mantıksal İşlemler (pdf)](../files/microprocessors/slides/Bolum_06_Aritmetik_Mantik.pdf)

---

## Chapter 7: Flow control, Procedures

Flow control mechanisms determine the sequence of execution within a program. This chapter also covers procedures, modular and reusable code blocks fundamental for structured programming.

- [Sunum - Akış Kontrolü (pdf)](../files/microprocessors/slides/Bolum_07_Akis_Kontrol.pdf)
- [Sunum - Prosedürler (pdf)](../files/microprocessors/slides/Bolum_07_Prosedurler.pdf)

---

## Chapter 8: Stack, Macros

The stack facilitates subroutine calls, parameter passing, and local variable storage. Concurrently, macros encapsulate and reuse code blocks efficiently.

- [Sunum - Yığın (pdf)](../files/microprocessors/slides/Bolum_08_Yigin.pdf)
- [Sunum - Makrolar (pdf)](../files/microprocessors/slides/Bolum_08_Makrolar.pdf)

---

## Chapter 9: Controlling external devices

This chapter navigates through controlling external devices, explaining methods and protocols for interfacing with peripheral hardware.

- [Sunum - Aygıt Kontrolü (pdf)](../files/microprocessors/slides/Bolum_09_Aygit_Kontrolu.pdf)

---

## Chapter 10: 8086 Instruction Set

The 8086 instruction set defines the operations the microprocessor can execute, covering their classifications, formats, and practical applications.

- [Sunum - Komut Kümesi (pdf)](../files/microprocessors/slides/Bolum_10_Komut_Kumesi.pdf)

---

## Chapter 11: 8086 Interrupt Functions

Interrupts enable the system to respond promptly to external events and prioritize tasks. This chapter examines the diverse interrupt functions of the 8086 architecture.

- [Sunum - Kesme Fonksiyonları (pdf)](../files/microprocessors/slides/Bolum_11_Kesme_Fonksiyonlari.pdf)
