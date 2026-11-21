---
title: Raspberry Pi 4 Is Released
excerpt: "Raspberry Pi 4 in 2019: the Cortex-A72 CPU, RAM options and prices, the separate USB 3.0 and Gigabit Ethernet design, and the VideoCore VI GPU."
date: 2019-06-24
permalink: /posts/2019/06/raspberry-pi-4-is-released/
tags:
  - technology
  - computing-history
  - history
---

The Raspberry Pi 4 Model B was released on June 24, 2019, in three RAM variants: 1GB ($35), 2GB ($45), and 4GB ($55) LPDDR4 — replacing the Raspberry Pi 3 B+ (launched March 2018) as the current flagship. The BCM2711 SoC used a quad-core ARM Cortex-A72 at 1.5 GHz, an out-of-order execution microarchitecture significantly more capable than the Pi 3's in-order Cortex-A53 at 1.4 GHz. Raspberry Pi reported roughly 2–4× the performance of the Pi 3B+, depending on the benchmark; the out-of-order pipeline allowed the Cortex-A72 to extract instruction-level parallelism that the A53 executed strictly in sequence.

The connectivity redesign was the most notable change from Pi 3. Prior Raspberry Pi boards ran all USB ports and Ethernet through a single USB controller (the LAN9514/LAN7515 chips), which shared a single USB 2.0 bus to the SoC — creating a shared 480 Mbps ceiling across all USB ports and the network interface simultaneously. Pi 4 connected Gigabit Ethernet directly to the SoC and moved the four USB ports to a separate VL805 USB 3.0 controller connected via a single PCIe Gen 2 lane (the BCM2711 exposed a PCIe 2.0 lane), so USB traffic no longer competed with Ethernet for bandwidth. The display output moved to two micro-HDMI ports (replacing one full-size HDMI), supporting dual monitors at up to 4K. Power input switched to USB-C at 5V 3A (15W), replacing the micro-USB connector used since Pi 1.

The Pi 4 B also arrived with VideoCore VI GPU (replacing the VideoCore IV used since Pi 1), which supported OpenGL ES 3.x via the open-source Mesa V3D driver. The performance jump made a Pi 4 with USB 3.0 SSD (bypassing the SD card bottleneck) a usable light-duty desktop: Chromium ran at interactive frame rates, LibreOffice loaded quickly, and lightweight server workloads (nginx, PostgreSQL, Python APIs) ran without constant swapping. Early units shipped with a thermal throttling firmware issue where the BCM2711 ran hot under sustained load; Raspberry Pi Foundation released a firmware update in September 2019 that lowered temperatures. An 8GB variant launched in May 2020 ($75), and the Pi 400 (November 2020, $70) built the Pi 4 into a keyboard form factor for desktop computing use.

**Sources:** [Raspberry Pi 4 on sale now from $35 (Raspberry Pi)](https://www.raspberrypi.com/news/raspberry-pi-4-on-sale-now-from-35/)
