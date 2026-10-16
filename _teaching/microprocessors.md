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

Each chapter comes with interactive HTML presentations that include step-by-step animations, 8086 code traces showing register, flag, and stack values, and small in-browser demos. Use the arrow keys or space bar to move through the slides and **F** for full screen.

---

## Preliminary Materials

* [Important People in Microprocessors (HTML)](../files/microprocessors/Microprocessors_Important_People.html)
* [Prerequisites for Microprocessors (HTML)](../files/microprocessors/Microprocessors_Prerequisites.html)
* [Terim Sözlüğü / Glossary (HTML)](../files/microprocessors/sozluk.html)

---

## Resources

- [8086 Emulator (ZIP)](../files/microprocessors/8086emulator.zip)
- [🕹️CPU Simulator (HTML)](../files/microprocessors/slides/CPU_Simulator.html)

---

## Chapter 1: Introduction to Microprocessors and the 8086 Architecture

This chapter introduces the basic concepts of microprocessors: the fetch–decode–execute cycle, processor structure and clock speed, CISC and RISC designs, and the evolution of the Intel x86 family. It then examines the 8086 architecture, including the bus interface unit and execution unit, the prefetch queue, the register set, and segmented memory. It also compares machine language, assembly language, and high-level languages.

- [🖼️Sunum-Giriş (HTML)](../files/microprocessors/slides/Bolum_01_Giris.html)  
- [📄Sunum-Giriş (PDF)](../files/microprocessors/pdf/Bolum_01_Giris.pdf)  
- [📝Çalışma Soruları - Giriş (HTML)](../files/microprocessors/slides/Bolum_01_Giris_Calisma_Sorulari.html)  
- [🖼️Sunum-8086 Mimarisi (HTML)](../files/microprocessors/slides/Bolum_01_8086_Mimarisi.html)  
- [📄Sunum-8086 Mimarisi (PDF)](../files/microprocessors/pdf/Bolum_01_8086_Mimarisi.pdf)  
- [📝Çalışma Soruları - 8086 Mimarisi (HTML)](../files/microprocessors/slides/Bolum_01_8086_Mimarisi_Calisma_Sorulari.html)  
- [🖼️Sunum-Programlama Dilleri (HTML)](../files/microprocessors/slides/Bolum_01_Programlama_Dilleri.html)  
- [📄Sunum-Programlama Dilleri (PDF)](../files/microprocessors/pdf/Bolum_01_Programlama_Dilleri.pdf)  
- [📝Çalışma Soruları - Programlama Dilleri (HTML)](../files/microprocessors/slides/Bolum_01_Programlama_Dilleri_Calisma_Sorulari.html)  

---

## Chapter 2: 8086 Registers and Pins

Registers are small, high-speed storage locations used during instruction execution. This chapter introduces the general-purpose, segment, pointer, index, and status registers of the 8086. It also examines the processor's external pins, including address, data, control, interrupt, and timing signals.

- [🖼️Sunum-8086 Pinler (HTML)](../files/microprocessors/slides/Bolum_02_8086_Pinler.html)  
- [📄Sunum-8086 Pinler (PDF)](../files/microprocessors/pdf/Bolum_02_8086_Pinler.pdf)  
- [📝Çalışma Soruları - 8086 Pinler (HTML)](../files/microprocessors/slides/Bolum_02_8086_Pinler_Calisma_Sorulari.html)  
- [🖼️Sunum-8086 Yazmaçlar (HTML)](../files/microprocessors/slides/Bolum_02_8086_Yazmaclar.html)  
- [📄Sunum-8086 Yazmaçlar (PDF)](../files/microprocessors/pdf/Bolum_02_8086_Yazmaclar.pdf)  
- [📝Çalışma Soruları - 8086 Yazmaçlar (HTML)](../files/microprocessors/slides/Bolum_02_8086_Yazmaclar_Calisma_Sorulari.html)  
- [🕹️Register Explorer (HTML)](../files/microprocessors/slides/Chapter_02_Register-Explorer.html)  

---

## Chapter 3: Number Systems and Assembly Language

Binary, hexadecimal, and BCD representations, conversions between bases, one's and two's complement, signed numbers, and floating-point formats are essential for handling data at the processor level. The chapter then introduces assembly language, which provides symbolic representations of machine instructions, registers, memory operands, and control-flow operations. An assembler translates the source code into machine code that the processor can execute.

- [🖼️Sunum-Sayı Sistemleri (HTML)](../files/microprocessors/slides/Bolum_03_Sayi_Sistemleri.html)  
- [📄Sunum-Sayı Sistemleri (PDF)](../files/microprocessors/pdf/Bolum_03_Sayi_Sistemleri.pdf)  
- [📝Çalışma Soruları - Sayı Sistemleri (HTML)](../files/microprocessors/slides/Bolum_03_Sayi_Sistemleri_Calisma_Sorulari.html)  
- [🖼️Sunum-Assembly (HTML)](../files/microprocessors/slides/Bolum_03_Assembly.html)  
- [📄Sunum-Assembly (PDF)](../files/microprocessors/pdf/Bolum_03_Assembly.pdf)  
- [📝Çalışma Soruları - Assembly (HTML)](../files/microprocessors/slides/Bolum_03_Assembly_Calisma_Sorulari.html)  
- [🕹️Two's Complement Lab (HTML)](../files/microprocessors/slides/Chapter_03_Twos-Complement-Lab.html)  

---

## Chapter 4: Memory Access and Variables

This chapter examines how the 8086 addresses memory using segment and offset values. It introduces physical address calculation, memory operands, data declarations, variable sizes, addressing modes, and the movement of data between registers and memory.

- [🖼️Sunum-Bellek Erişimi (HTML)](../files/microprocessors/slides/Bolum_04_Bellek_Erisimi.html)  
- [📄Sunum-Bellek Erişimi (PDF)](../files/microprocessors/pdf/Bolum_04_Bellek_Erisimi.pdf)  
- [📝Çalışma Soruları - Bellek Erişimi (HTML)](../files/microprocessors/slides/Bolum_04_Bellek_Erisimi_Calisma_Sorulari.html)  
- [🖼️Sunum-Değişkenler (HTML)](../files/microprocessors/slides/Bolum_04_Degiskenler.html)  
- [📄Sunum-Değişkenler (PDF)](../files/microprocessors/pdf/Bolum_04_Degiskenler.pdf)  
- [📝Çalışma Soruları - Değişkenler (HTML)](../files/microprocessors/slides/Bolum_04_Degiskenler_Calisma_Sorulari.html)  
- [🕹️Segment:Offset Calculator (HTML)](../files/microprocessors/slides/Chapter_04_Segment-Offset.html)  
- [🕹️Addressing Modes (HTML)](../files/microprocessors/slides/Chapter_04_Addressing-Modes.html)  

---

## Chapter 5: Interrupt Fundamentals and the emu8086.inc Library

Interrupts let the processor respond to external events and request system services. This chapter covers hardware and software interrupts, the interrupt vector table, and the INT and IRET sequence. It also introduces the macros and procedures of the emu8086.inc library for screen output, cursor control, and number input and output.

- [🖼️Sunum-Kesmeler (HTML)](../files/microprocessors/slides/Bolum_05_Kesmeler.html)  
- [📄Sunum-Kesmeler (PDF)](../files/microprocessors/pdf/Bolum_05_Kesmeler.pdf)  
- [📝Çalışma Soruları - Kesmeler (HTML)](../files/microprocessors/slides/Bolum_05_Kesmeler_Calisma_Sorulari.html)  
- [🖼️Sunum-emu8086.inc Kütüphanesi (HTML)](../files/microprocessors/slides/Bolum_05_Kutuphane.html)  
- [📄Sunum-emu8086.inc Kütüphanesi (PDF)](../files/microprocessors/pdf/Bolum_05_Kutuphane.pdf)  
- [📝Çalışma Soruları - emu8086.inc Kütüphanesi (HTML)](../files/microprocessors/slides/Bolum_05_Kutuphane_Calisma_Sorulari.html)  
- [🕹️Interrupt Vector Table (HTML)](../files/microprocessors/slides/Chapter_05_Interrupt-Vector.html)  

---

## Chapter 6: Arithmetic and Logic Instructions

Arithmetic and logic instructions are essential for performing mathematical operations and logical comparisons. This chapter covers arithmetic, logical, shift, and rotate instructions. It also examines how these operations affect status flags such as Carry, Zero, Sign, Overflow, and Parity, which are later used by conditional jumps.

- [🖼️Sunum-Aritmetik ve Mantıksal İşlemler (HTML)](../files/microprocessors/slides/Bolum_06_Aritmetik_Mantik.html)  
- [📄Sunum-Aritmetik ve Mantıksal İşlemler (PDF)](../files/microprocessors/pdf/Bolum_06_Aritmetik_Mantik.pdf)  
- [📝Çalışma Soruları - Aritmetik ve Mantıksal İşlemler (HTML)](../files/microprocessors/slides/Bolum_06_Aritmetik_Mantik_Calisma_Sorulari.html)  
- [🕹️Flags Lab (HTML)](../files/microprocessors/slides/Chapter_06_Flags-Lab.html)  

---

## Chapter 7: Flow Control and Procedures

Flow control mechanisms determine the sequence of execution within a program. This chapter covers unconditional and conditional jumps, comparisons with CMP, signed and unsigned conditions, and loops with LOOP and CX. It also introduces procedures, which are modular and reusable code blocks defined with PROC and ENDP and invoked with CALL and RET.

- [🖼️Sunum-Akış Kontrolü (HTML)](../files/microprocessors/slides/Bolum_07_Akis_Kontrol.html)  
- [📄Sunum-Akış Kontrolü (PDF)](../files/microprocessors/pdf/Bolum_07_Akis_Kontrol.pdf)  
- [📝Çalışma Soruları - Akış Kontrolü (HTML)](../files/microprocessors/slides/Bolum_07_Akis_Kontrol_Calisma_Sorulari.html)  
- [🖼️Sunum-Prosedürler (HTML)](../files/microprocessors/slides/Bolum_07_Prosedurler.html)  
- [📄Sunum-Prosedürler (PDF)](../files/microprocessors/pdf/Bolum_07_Prosedurler.pdf)  
- [📝Çalışma Soruları - Prosedürler (HTML)](../files/microprocessors/slides/Bolum_07_Prosedurler_Calisma_Sorulari.html)  
- [🕹️Jump Conditions (HTML)](../files/microprocessors/slides/Chapter_07_Jump-Conditions.html)  

---

## Chapter 8: Stack and Macros

The 8086 stack is addressed through the SS and SP registers. It stores return addresses, saved register values, parameters, and temporary data during procedure calls. This chapter covers PUSH, POP, CALL, RET, and stack discipline. Macros encapsulate and reuse code blocks. Unlike procedures, macros are expanded by the assembler at each point of use. This may reduce call overhead but can increase program size.

- [🖼️Sunum-Yığın (HTML)](../files/microprocessors/slides/Bolum_08_Yigin.html)  
- [📄Sunum-Yığın (PDF)](../files/microprocessors/pdf/Bolum_08_Yigin.pdf)  
- [📝Çalışma Soruları - Yığın (HTML)](../files/microprocessors/slides/Bolum_08_Yigin_Calisma_Sorulari.html)  
- [🖼️Sunum-Makrolar (HTML)](../files/microprocessors/slides/Bolum_08_Makrolar.html)  
- [📄Sunum-Makrolar (PDF)](../files/microprocessors/pdf/Bolum_08_Makrolar.pdf)  
- [📝Çalışma Soruları - Makrolar (HTML)](../files/microprocessors/slides/Bolum_08_Makrolar_Calisma_Sorulari.html)  
- [🕹️Stack, CALL and RET (HTML)](../files/microprocessors/slides/Chapter_08_Stack-Call.html)  

---

## Chapter 9: Input/Output and External Device Control

This chapter introduces input/output ports and the IN and OUT instructions. It examines how assembly programs communicate with external devices and how device status, control, and data registers are accessed.

- [🖼️Sunum-Aygıt Kontrolü (HTML)](../files/microprocessors/slides/Bolum_09_Aygit_Kontrolu.html)  
- [📄Sunum-Aygıt Kontrolü (PDF)](../files/microprocessors/pdf/Bolum_09_Aygit_Kontrolu.pdf)  
- [📝Çalışma Soruları - Aygıt Kontrolü (HTML)](../files/microprocessors/slides/Bolum_09_Aygit_Kontrolu_Calisma_Sorulari.html)  
- [🕹️I/O Port Device Control (HTML)](../files/microprocessors/slides/Chapter_09_IO-Ports.html)  

---

## Chapter 10: 8086 Instruction Set Review

The 8086 instruction set defines the operations the microprocessor can execute. This chapter reviews the data transfer, arithmetic, logic, shift and rotate, string, control transfer, and processor control instructions, together with instruction encoding, addressing modes, and their effects on the flags.

- [🖼️Sunum-Komut Kümesi (HTML)](../files/microprocessors/slides/Bolum_10_Komut_Kumesi.html)  
- [📄Sunum-Komut Kümesi (PDF)](../files/microprocessors/pdf/Bolum_10_Komut_Kumesi.pdf)  
- [📝Çalışma Soruları - Komut Kümesi (HTML)](../files/microprocessors/slides/Bolum_10_Komut_Kumesi_Calisma_Sorulari.html)  
- [🕹️Instruction Encoding (HTML)](../files/microprocessors/slides/Chapter_10_Instruction-Encoding.html)  
- [🕹️Shift and Rotate (HTML)](../files/microprocessors/slides/Chapter_10_Shift-Rotate.html)  

---

## Chapter 11: BIOS and DOS Interrupt Services

This chapter covers BIOS and DOS interrupt services, their register parameters, character and string output, keyboard input, and program termination. These services are provided by system software through the 8086 interrupt mechanism.

- [🖼️Sunum-Kesme Fonksiyonları (HTML)](../files/microprocessors/slides/Bolum_11_Kesme_Fonksiyonlari.html)  
- [📄Sunum-Kesme Fonksiyonları (PDF)](../files/microprocessors/pdf/Bolum_11_Kesme_Fonksiyonlari.pdf)  
- [📝Çalışma Soruları - Kesme Fonksiyonları (HTML)](../files/microprocessors/slides/Bolum_11_Kesme_Fonksiyonlari_Calisma_Sorulari.html)  

