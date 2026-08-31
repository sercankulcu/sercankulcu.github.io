---
title: "Microprocessors"
collection: teaching
type: "Undergraduate"
permalink: /teaching/microprocessors
venue: "Giresun University, Electrical Electronics Engineering"
date: 2024-01-05
location: "Giresun, Turkey"
---

![microprocessor](/images/teaching/teaching-microprocessors.webp){: .align-left width="200" style="float: left; margin-right: 10px;"} 
Microprocessors execute instructions, process data, and coordinate the operations of modern computing systems. The 8086 architecture provides a useful foundation for studying processor organization, registers, memory access, instruction execution, and low-level programming. The 8086 is an early member of the x86 family. Although modern x86-64 processors are substantially more complex, the 8086 remains useful for introducing registers, segmentation, instruction execution, addressing modes, interrupts, and assembly programming.

## Ders Öğretim Planı
- [Ders Öğretim Planı (pdf)](../files/microprocessors/slides/Bolum_00_Ders_Ogretim_Planı.pdf)

---

## Announcements

There are currently no announcements.

---

## The Resources

- [Emu8086 Microprocessor Emulator](https://emu8086-microprocessor-emulator.en.softonic.com/)
- [CPU Emulator](../files/microprocessors/CPU_Emulator/emulator.html) adapted [from](https://www.cmpe.boun.edu.tr/~tugcu/animations/cpu-simulator/cpu-simulator.html)
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

## Preliminary Materials: 

* Prerequisites for preparation [pdf](../files/microprocessors/Microprocessors_Prerequisites.html)
* Key figures who have shaped the field [pdf](../files/microprocessors/Microprocessors_Important_People.html)

---

## Chapter 1: Introduction to Microprocessors and the 8086 Architecture

This chapter provides a foundational overview of microprocessor basics. It introduces the fundamental concepts of microprocessors and explores the significance of the 8086 architecture in computer systems. The content focuses on essential principles, helping students grasp the core workings of microprocessors.

- [🖼️Sunum - Giriş (pdf)](../files/microprocessors/slides/Bolum_01_Giris.pdf)
- [🖼️Sunum - Mimari (pdf)](../files/microprocessors/slides/Bolum_01_8086_Mimarisi.pdf)
- [🖼️Sunum - Programlama Dilleri (pdf)](../files/microprocessors/slides/Bolum_01_Programlama_Dilleri.pdf)

---

## Chapter 2: 8086 Registers and Pins

Registers are small, high-speed storage locations used during instruction execution. This chapter introduces the general-purpose, segment, pointer, index, and status registers of the 8086. It also examines the processor's external pins, including address, data, control, interrupt, and timing signals.

- [🖼️Sunum - Pinler (pdf)](../files/microprocessors/slides/Bolum_02_8086_Pinler.pdf)
- [🖼️Sunum - Yazmaçlar (pdf)](../files/microprocessors/slides/Bolum_02_8086_Yazmaclar.pdf)

---

## Chapter 3: Number Systems and Assembly Language

Understanding numbering systems, which include binary and hexadecimal, is crucial for effectively handling data in microprocessor contexts. At the same time, the section examines the characteristics and importance of assembly language, explaining its role. Assembly language provides symbolic representations of machine instructions,
registers, memory operands, and control-flow operations. An assembler translates the source code into machine code that the processor can execute.

- [🖼️Sunum - Sayı Sistemleri (pdf)](../files/microprocessors/slides/Bolum_03_Sayi_Sistemleri.pdf)
- [🖼️Sunum - Assembly Dili (pdf)](../files/microprocessors/slides/Bolum_03_Assembly.pdf)

---

## Chapter 4: Memory access, Variables

Understanding the details of memory access is important, as it dictates how data is stored and retrieved. This chapter examines how the 8086 addresses memory using segment and offset values. It introduces physical address calculation, memory operands, data declarations, variable sizes, and the movement of data between registers and memory.

- [🖼️Sunum - Bellek Erişimi (pdf)](../files/microprocessors/slides/Bolum_04_Bellek_Erisimi.pdf)
- [🖼️Sunum - Değişkenler (pdf)](../files/microprocessors/slides/Bolum_04_Degiskenler.pdf)

---

## Chapter 5: Interrupt Fundamentals and the emu8086.inc Library

Interrupts, as a pivotal mechanism, play a crucial role in managing the flow of execution and responding to external events. This chapter explores the concepts and functionalities associated with interrupts, and it covers common functions encapsulated in the emu8086.inc library.

- [🖼️Sunum - Kesmeler (pdf)](../files/microprocessors/slides/Bolum_05_Kesmeler.pdf)
- [🖼️Sunum - Kütüphane (pdf)](../files/microprocessors/slides/Bolum_05_Kutuphane.pdf)

---

## Chapter 6: Arithmetic and Logic Instructions

Arithmetic and logic instructions are essential for performing mathematical operations and logical comparisons. This chapter covers arithmetic, logical, shift, and rotate instructions. It also examines how these operations affect status flags such as Carry, Zero, Sign, Overflow, and Parity, which are later used by conditional jumps.

- [🖼️Sunum - Aritmetik ve Mantıksal İşlemler (pdf)](../files/microprocessors/slides/Bolum_06_Aritmetik_Mantik.pdf)

---

## Chapter 7: Flow Control and Procedures

Flow control mechanisms determine the sequence of execution within a program. This chapter also introduces procedures, which are modular and reusable code
blocks that support structured assembly-language programming.

- [🖼️Sunum - Akış Kontrolü (pdf)](../files/microprocessors/slides/Bolum_07_Akis_Kontrol.pdf)
- [🖼️Sunum - Prosedürler (pdf)](../files/microprocessors/slides/Bolum_07_Prosedurler.pdf)

---

## Chapter 8: Stack, Macros

The 8086 stack is addressed through the SS and SP registers. It stores return addresses, saved register values, parameters, and temporary data during procedure calls. This chapter covers PUSH, POP, CALL, RET, and stack discipline. Concurrently, macros encapsulate and reuse code blocks efficiently. Unlike procedures, macros are expanded by the assembler at each point of use. This may reduce call overhead but can increase program size.

- [🖼️Sunum - Yığın (pdf)](../files/microprocessors/slides/Bolum_08_Yigin.pdf)
- [🖼️Sunum - Makrolar (pdf)](../files/microprocessors/slides/Bolum_08_Makrolar.pdf)

---

## Chapter 9: Input/Output and External Device Control

This chapter introduces input/output ports and the IN and OUT instructions. It examines how assembly programs communicate with external devices and how device status, control, and data registers are accessed.

- [🖼️Sunum - Aygıt Kontrolü (pdf)](../files/microprocessors/slides/Bolum_09_Aygit_Kontrolu.pdf)

---

## Chapter 10: 8086 Instruction Set Review

The 8086 instruction set defines the operations the microprocessor can execute, covering their classifications, formats, and practical applications.

- [🖼️Sunum - Komut Kümesi (pdf)](../files/microprocessors/slides/Bolum_10_Komut_Kumesi.pdf)

---

## Chapter 11: BIOS and DOS Interrupt Services

Interrupts enable the system to respond promptly to external events and prioritize tasks. This chapter examines the diverse interrupt functions of the 8086 architecture.

- [🖼️Sunum - Kesme Fonksiyonları (pdf)](../files/microprocessors/slides/Bolum_11_Kesme_Fonksiyonlari.pdf)
