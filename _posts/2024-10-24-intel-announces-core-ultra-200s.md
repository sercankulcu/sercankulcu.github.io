---
title: Intel Announces Core Ultra 200S
excerpt: "Intel's Core Ultra 200S (Arrow Lake) dropped HyperThreading, used a tiled design with TSMC and added an NPU; see how reviews judged it against Raptor Lake."
date: 2024-10-24
permalink: /posts/2024/10/intel-announces-core-ultra-200s/
tags:
  - hardware
  - computing
  - history
---

Intel released Core Ultra 200S desktop processors (codenamed Arrow Lake) on October 24, 2024 for the LGA1851 socket. The flagship Core Ultra 9 285K featured 8 Lion Cove P-cores and 16 Skymont E-cores — 24 cores total — with no HyperThreading on any core: Intel removed simultaneous multithreading (SMT) from Lion Cove's design entirely, arguing that the wider out-of-order execution engine in Lion Cove (larger instruction window, more execution units per core than Raptor Lake's Golden Cove) made SMT less valuable than adding real cores. The 285K had a 125W TDP base and 250W max turbo power, with boost clocks to 5.7 GHz. The design was a disaggregated package: the CPU compute tile was manufactured on TSMC N3B, the GPU tile on TSMC N5P, and the SoC and I/O tiles on TSMC N6, all connected via Intel's Foveros packaging — the same approach Intel used for Meteor Lake mobile (December 2023) now arriving at the desktop.

The integrated GPU (Xe-LPG architecture, as in Meteor Lake) included 4 Xe cores and hardware ray tracing, a significant upgrade from the UHD Graphics 770 in 13th/14th gen. Every Core Ultra 200S also included an NPU (Neural Processing Unit) rated at 13 TOPS, enabling Windows features like Live Captions, AI Explorer, and background removal without cloud round-trips. The memory platform moved from DDR5-5600 (13th/14th gen) to DDR5-6400, and PCIe 5.0 (×16 for primary GPU) remained from the previous generation.

Independent reviews at launch showed mixed results: in single-threaded benchmarks (Cinebench R23, SPEC CPU), the Core Ultra 9 285K outperformed its predecessor Core i9-14900K in efficiency but often matched rather than surpassed it in raw throughput despite the newer architecture, partly because Lion Cove's clock speed ceiling (~5.7 GHz) was lower than Raptor Cove's (~6.0 GHz on the Core i9-14900K). AMD's Ryzen 9000 series (Zen 5, launched July 2024 on TSMC N4) offered competition at similar price points. The removal of HyperThreading drew scrutiny in heavily threaded workloads (Blender, video encoding) where Raptor Lake's 32-thread configuration had exceeded the 285K's 24-thread (no-SMT) throughput in some tests — though Intel emphasized that the use case for the E-cores versus logical SMT threads was fundamentally different for scheduling efficiency under mixed loads.

**Sources:** [Intel Core Ultra 9 Processor 285K specifications (Intel)](https://www.intel.com/content/www/us/en/products/sku/241060/intel-core-ultra-9-processor-285k-36m-cache-up-to-5-70-ghz/specifications.html), [Intel Launches Arrow Lake Core Ultra 200S (Tom's Hardware)](https://www.tomshardware.com/pc-components/cpus/intel-launches-arrow-lake-core-ultra-200s-big-gains-in-productivity-and-power-efficiency-but-not-in-gaming)
