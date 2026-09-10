---
title: Apple Releases the First M1 Macs
date: 2020-11-15
permalink: /posts/2020/11/apple-releases-the-first-m1-macs/
tags:
  - hardware
  - computing
  - history
---

Apple released the MacBook Air, 13-inch MacBook Pro, and Mac mini with M1 on November 17, 2020. The MacBook Air started at $999, the MacBook Pro at $1,299, and the Mac mini at $699 — unchanged prices from their Intel predecessors. Apple had announced the transition from Intel to Apple silicon at WWDC in June 2020, promising a two-year transition window; the first M1 Macs arrived only five months later.

M1 was manufactured on TSMC's 5nm process and contained 16 billion transistors. It integrated four high-performance CPU cores (Firestorm) and four efficiency cores (Icestorm), an eight-core GPU, a 16-core Neural Engine capable of 11 trillion operations per second, a unified memory bus shared by all components, and dedicated media encode/decode engines for H.264, HEVC, and ProRes. “Unified memory” meant CPU and GPU read and wrote the same physical pool (8GB or 16GB of LPDDR4X at 68.25 GB/s) with no copy overhead — on Intel Macs, the discrete GPU had its own GDDR memory, requiring data to be copied over the PCIe bus. Geekbench 5 single-core scores around 1,750 placed M1 ahead of any Intel Mac Apple had ever sold, including the 2019 Mac Pro.

Rosetta 2 — Apple's binary translation layer for running x86-64 applications on ARM64 — was substantially faster than earlier translation efforts. Many Rosetta 2-translated applications benchmarked within 80% of native Intel speed, and in some workloads (where the M1's superior architecture compensated) faster. The MacBook Air, now fanless (no cooling fan at all), sustained full performance under load without thermal throttling that earlier fanless designs had required. Apple completed the Mac transition to Apple silicon in June 2023 when the last Intel Mac Pro was discontinued, fulfilling the two-year timeline two months early.
