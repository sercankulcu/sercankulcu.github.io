---
title: AMD Launches the Threadripper Platform
excerpt: "AMD's Threadripper in 2017: 16 cores, a multi-chip design on Infinity Fabric, 64 PCIe lanes, and how it pushed Intel to ship higher core counts."
date: 2017-08-15
permalink: /posts/2017/08/amd-launches-the-threadripper-platform/
tags:
  - hardware
  - computing
  - history
---

AMD launched Ryzen Threadripper on August 10, 2017, with the Threadripper 1950X (16 cores, 32 threads) at $999 and the Threadripper 1920X (12 cores, 24 threads) at $799. Both used AMD's TR4 socket, a physically massive 4094-pin LGA package on the X399 chipset. The 1950X was priced directly against Intel's new Core i9-7900X (10 cores, $999 launched two months earlier) and offered 60% more cores for the same price — a competitive statement rather than a niche positioning.

Threadripper used AMD's Multi-Chip Module (MCM) design: two 8-core Zen dies (the same silicon used in standard Ryzen CPUs) mounted side by side and connected through the Infinity Fabric — AMD's proprietary high-speed inter-die interconnect. Each die had its own 16MB L3 cache, memory controller, and PCIe lanes; the two dies together provided 64 PCIe 3.0 lanes (vs. 44 on Intel's i9-7900X), allowing users to run three-way GPU setups, multiple NVMe drives, and high-speed networking simultaneously without lane sharing. The Infinity Fabric introduced a NUMA-like topology on the desktop: accessing memory attached to the same die (local) was faster than accessing memory on the other die (remote), a nuance that mattered for memory-latency-sensitive workloads.

Intel's response came in September 2017 with the Skylake-X 16-core i9-7960X at $1,699 and 18-core i9-7980XE at $1,999 — core counts Intel had not planned to ship in 2017 before AMD's Threadripper announcement forced the acceleration. Blender 3D rendering, Handbrake video encoding, and large C++ software compilations scaled well across Threadripper's 16 cores, giving content creators and developers a workstation-class machine at desktop prices for the first time. AMD's second-generation Threadripper 2990WX (32 cores, $1,799, released August 2018) and third-generation Threadripper 3970X (32 cores, 7nm Zen 2, $1,999, released November 2019) continued to push core counts and force Intel to respond.

**Sources:** [AMD Launches the Highest-Performance Desktop Processor, Ever, with Ryzen Threadripper](https://ir.amd.com/news-events/press-releases/detail/786/amd-launches-the-highest-performance-desktop-processor-ever-with-ryzen-threadripper-high-end-desktop-processors), [AMD Announces Ryzen Threadripper, Challenges Intel With 12C/16C For $799 and $999 (Tom's Hardware)](https://www.tomshardware.com/news/amd-threadripper-1920x-1950x-intel,34999.html)
