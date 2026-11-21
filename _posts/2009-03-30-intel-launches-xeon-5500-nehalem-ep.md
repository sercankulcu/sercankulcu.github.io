---
title: Intel Launches Xeon 5500 Nehalem-EP
excerpt: "Intel's Xeon 5500 (Nehalem-EP), March 2009: the memory controller moves on-die, QPI replaces the front-side bus, and Hyper-Threading returns."
date: 2009-03-30
permalink: /posts/2009/03/intel-launches-xeon-5500-nehalem-ep/
tags:
  - technology
  - computing-history
  - history
---

Intel launched the Xeon 5500 series (Nehalem-EP) on March 30, 2009, in a joint announcement with HP and Dell at their respective server events. The lineup ran from the Xeon E5502 (2 cores, 1.86 GHz, $188) to the Xeon X5570 (4 cores, 2.93 GHz, 8MB L3, $1,386), manufactured on Intel's 45nm High-K metal-gate process. Nehalem-EP supported two-socket configurations — the "EP" designation indicated dual-processor capable — with triple-channel DDR3 memory per socket (up to 144GB per socket at launch).

The architectural change was the elimination of the front-side bus. Prior Intel server CPUs shared a single FSB between the processor and a northbridge chipset that sat between the CPU, memory, and PCIe. All memory requests from all cores competed for that bus, creating a bandwidth bottleneck that worsened as core count grew. Nehalem moved the memory controller onto the CPU die, giving each socket direct access to its local DDR3 channels at 32 GB/s, and replaced FSB with QuickPath Interconnect (QPI) — a point-to-point serial link running at 6.4 GT/s for direct socket-to-socket communication. In two-socket servers, a CPU could access remote memory (attached to the other socket) over QPI, creating a NUMA (Non-Uniform Memory Access) topology where local memory access was faster than remote.

Hyper-Threading — Intel's simultaneous multithreading, first introduced in Pentium 4 in 2002 then removed with Core 2 in 2006 — returned with Nehalem. Each physical core appeared as two logical cores to the OS, improving throughput on workloads with sufficient parallelism. Turbo Boost automatically raised individual core frequencies above the rated TDP when power and thermal headroom allowed, taking advantage of load imbalance across cores. SPECint_rate2006 benchmarks placed dual Xeon X5570 systems (8 cores total, 16 threads with HT) roughly 2× ahead of dual Xeon X5450 Harpertown systems (8 cores, no HT), confirming that the Nehalem architectural changes — not just frequency — drove the improvement.

The [Microprocessors course](/teaching/microprocessors/?lang=en) on this site covers processor architecture from the ground up.

**Sources:** [Intel Xeon Processor 5500 series launch press release (Intel)](https://intel.com/pressroom/archive/releases/2009/20090330corp_sm.htm), [Intel startet Nehalem-basierte Xeon-5500-Serie (ComputerBase)](https://www.computerbase.de/2009-03/intel-startet-nehalem-basierte-xeon-5500-serie/)
