---
title: 'When Solid State Drives Start To Feel Real'
date: 2009-12-13
permalink: /posts/2009/12/when-solid-state-drives-start-to-feel-real/
tags:
  - hardware
  - computers
  - technology
---

Hard drives have always made computers feel mechanical. You can hear them spin up at startup, click during seeks, and spin down when idle. A significant part of the computer is electronic, but for decades storage has depended on a physical disk rotating at 5,400 or 7,200 RPM and a read/write head moving across its surface. The average seek time for a 7,200 RPM hard drive — the time required to physically position the head over the right track — is around 8–10 milliseconds.

Solid-state drives remove that movement. Data is stored in NAND flash memory cells, which have no moving parts and can be read in microseconds rather than milliseconds. That difference is roughly three orders of magnitude.

## What the difference feels like

The subjective experience of a system with an SSD is different in kind, not just degree. The operating system boots in seconds rather than a minute. Applications launch almost instantly rather than during a perceptible delay. Opening a large document or project does not require waiting. These tasks involve many small random reads — exactly what hard drives are slowest at — and SSDs handle them at speeds hard drives cannot approach.

The improvement is most noticeable on systems where the processor has excess capacity. A computer that feels slow on a hard drive because the processor is spending most of its time waiting for storage can become noticeably faster with an SSD without any change to the CPU.

## The state in December 2009

The Intel X25-M, released in 2008, established SSDs as a serious product category for the first time. At around $400 for the 80 GB model in late 2009, it is expensive but measurably better than what came before. OCZ's Vertex series (using the Indilinx Barefoot controller) represents the competitive alternative.

The price per gigabyte for SSDs in December 2009 is approximately $5–8 per gigabyte. A 2 TB hard drive costs $100–120 — roughly $0.05–0.06 per gigabyte. The difference is more than 100x.

This makes the purchase decision straightforward: SSDs are impractical as primary storage for photographs, video libraries, and bulk data. As the system drive — holding the operating system, applications, and active working files — they are transformative.

## The technical concerns

Not all SSDs in 2009 perform consistently. The controller is as important as the flash chips. Some early drives with poor controllers perform well when freshly written but degrade significantly as free space is consumed — a phenomenon that TRIM support (added to Windows 7 and Linux 2.6.33) addresses by allowing the OS to inform the drive which blocks are no longer needed.

Flash memory cells also have a finite write endurance — typically tens of thousands of write cycles for MLC (multi-level cell) NAND used in most consumer SSDs. Wear-leveling algorithms in the controller spread writes across all cells to extend practical lifetime. For typical consumer usage patterns, the endurance is not a practical concern, but it is a legitimate technical question for drives in high-write workloads.

## The direction

For laptops specifically, the case for SSDs is already compelling. Mechanical drives are fragile — a laptop dropped while a hard drive is spinning can cause head crashes and data loss. SSDs survive ordinary physical shock. They also use less power during operation, which helps battery life on a portable machine.

The price barrier will fall. Flash memory manufacturing is a high-volume semiconductor process, subject to the same economic pressure as all semiconductor production. What costs $400 for 80 GB in 2009 will cost a fraction of that within a few years.

Storage is often the most overlooked component in a system's performance. Improving the slowest subsystem matters more than making an already-fast component faster. The SSD is the most significant single upgrade available for most computers in 2009, and the feeling of using one makes the argument more convincingly than any benchmark chart.
