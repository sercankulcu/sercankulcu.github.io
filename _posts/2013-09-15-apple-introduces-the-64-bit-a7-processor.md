---
title: Apple Introduces the 64-Bit A7 Processor
date: 2013-09-15
permalink: /posts/2013/09/apple-introduces-the-64-bit-a7-processor/
tags:
  - hardware
  - computing
  - history
---

Apple announced the iPhone 5s on September 10, 2013, introducing the A7 — which Apple described as the first 64-bit processor in a consumer smartphone. The A7 used Apple's Cyclone CPU cores, designed in-house around the ARMv8 architecture, and contained 1 billion transistors manufactured on Samsung's 28nm process. Cyclone's dual high-performance cores ran at up to 1.3 GHz; Apple claimed 2× CPU and 2× GPU performance compared to the A6. The chip paired with 1GB of LPDDR3 RAM — the same as the iPhone 5, and nowhere near the 4GB minimum where a 64-bit address space provides a practical RAM benefit.

Qualcomm VP of product management Anand Chandrasekher publicly dismissed the 64-bit marketing as "speed-bumping," noting the iPhone 5s had only 1GB RAM. Qualcomm retracted the statement the following week after engineers internally concluded that the ARMv8 ISA's larger general-purpose register file (31 64-bit registers vs. ARMv7's 16 32-bit registers), improved floating-point pipeline, and new instruction encodings provided genuine CPU efficiency improvements independent of addressing space. ARM-based Android SoCs did not adopt 64-bit until late 2014 (Qualcomm's Snapdragon 410) and 2015 (Snapdragon 810 and 820).

The strategic value of the A7's 64-bit transition was that Apple controlled the entire software stack. Apple compiled iOS 7 as a 64-bit binary for A7 hardware while maintaining a 32-bit fallback for older devices. Third-party developers recompiled for ARMv8 through Xcode. By 2015, Apple required all new App Store submissions to include 64-bit binaries. Android's fragmented update model meant manufacturers and carriers controlled OS updates, making an equivalent coordinated transition far slower — a concrete example of how vertical integration affected Apple's ability to upgrade the platform rapidly.
