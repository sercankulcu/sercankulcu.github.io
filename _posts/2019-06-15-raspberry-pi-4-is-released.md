---
title: Raspberry Pi 4 Is Released
date: 2019-06-15
permalink: /posts/2019/06/raspberry-pi-4-is-released/
tags:
  - technology
  - computing-history
  - history
---

The Raspberry Pi 4 Model B was released on June 24, 2019, in three RAM variants: 1GB ($35), 2GB ($45), and 4GB ($55) LPDDR4 — replacing the Raspberry Pi 3 B+ (launched March 2018) as the current flagship. The BCM2711 SoC used a quad-core ARM Cortex-A72 at 1.5 GHz, an out-of-order execution microarchitecture significantly more capable than the Pi 3's in-order Cortex-A53 at 1.4 GHz. Sysbench CPU benchmarks showed roughly 2–3× improvement in integer throughput; the out-of-order pipeline allowed the Cortex-A72 to extract instruction-level parallelism that the A53 executed strictly in sequence.

The connectivity redesign was the most notable change from Pi 3. Prior Raspberry Pi boards ran all USB ports and Ethernet through a single USB controller (the LAN9514/LAN7515 chips), which shared a single USB 2.0 bus to the SoC — creating a shared 480 Mbps ceiling across all USB ports and the network interface simultaneously. Pi 4 moved Gigabit Ethernet and four USB ports to a separate VL805 USB 3.0 controller connected via PCIe Gen 2 (the BCM2711 exposed a PCIe 2.0 lane), allowing USB 3.0 transfer rates up to 5 Gbps per port without Ethernet bandwidth contention. The display output moved to two micro-HDMI ports (replacing one full-size HDMI), supporting simultaneous 4K30 or dual 1080p60 outputs. Power input switched to USB-C at 5V 3A (15W), replacing the micro-USB connector used since Pi 1.

The Pi 4 B also arrived with VideoCore VI GPU (replacing the VideoCore IV used since Pi 1), which supported OpenGL ES 3.1 and Vulkan 1.0 via the open-source Mesa driver. The performance jump made a Pi 4 with USB 3.0 SSD (bypassing the SD card bottleneck) a usable light-duty desktop: Chromium ran at interactive frame rates, LibreOffice loaded quickly, and lightweight server workloads (nginx, PostgreSQL, Python APIs) ran without constant swapping. Early units shipped with a thermal throttling firmware issue where the BCM2711 ran hot under sustained load; Raspberry Pi Foundation released a firmware fix in September 2019 that reduced steady-state temperatures by 15–20°C. An 8GB variant launched in May 2020 ($75), and the Pi 400 (November 2020, $70) built the Pi 4 into a keyboard form factor for desktop computing use.
