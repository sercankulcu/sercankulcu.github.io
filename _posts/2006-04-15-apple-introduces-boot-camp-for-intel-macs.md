---
title: Apple Introduces Boot Camp for Intel Macs
excerpt: "Apple's April 2006 Boot Camp beta let Intel Macs dual-boot Windows XP; how EFI-to-BIOS emulation worked and why it ended with Apple silicon in 2020."
date: 2006-04-15
permalink: /posts/2006/04/apple-introduces-boot-camp-for-intel-macs/
tags:
  - hardware
  - computing
  - history
---

Apple released Boot Camp as a public beta on April 5, 2006, three months after the first Intel Macs shipped in January 2006. The software was a free download including a startup disk partition assistant, a Windows driver disc creator (packaging Apple's drivers for the GPU, audio, keyboard, trackpad, iSight camera, and Bluetooth onto a CD for installation inside Windows), and firmware updates enabling a dual-boot menu at startup.

The Intel transition began January 10, 2006 with the MacBook Pro and iMac (both using the Intel Core Duo), replacing PowerPC chips that Apple had used since 1994. PowerPC Macs could not run Windows natively — Windows required x86 architecture — but Intel Macs shared their processor architecture with every Windows PC. The remaining obstacle was drivers and firmware: Windows XP required a BIOS (Basic Input/Output System) firmware interface, while Intel Macs used EFI (Extensible Firmware Interface). Apple's Boot Camp included MBR (Master Boot Record) emulation in the firmware so Windows XP saw a familiar BIOS-style boot environment while macOS continued using EFI natively.

Boot Camp initially supported Windows XP; Windows Vista support came with Boot Camp 1.2 in March 2007. Apple included Boot Camp as a standard utility in Mac OS X 10.5 Leopard (October 2007), ending the "beta" label. The capability changed the purchase argument for Mac significantly: a buyer who needed Windows-only enterprise software or games could use a single Mac as both a Mac and a Windows PC, eliminating the need for a separate Windows machine. Boot Camp was discontinued with Apple silicon Macs starting in November 2020 — the M1's ARM architecture cannot run x86 Windows natively — ending a 14-year capability that had been a practical selling point throughout the Intel Mac era.

**Sources:** [Apple Introduces Boot Camp (Apple Newsroom)](https://www.apple.com/newsroom/2006/04/05Apple-Introduces-Boot-Camp/)
