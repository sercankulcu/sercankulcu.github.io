---
title: NVIDIA Unveils Vera Rubin at GTC
date: 2026-03-15
permalink: /posts/2026/03/nvidia-unveils-vera-rubin-at-gtc/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

NVIDIA held GTC 2026 in San Jose in March, with Jensen Huang's keynote presenting the Vera Rubin platform as a fully integrated AI computing system rather than a discrete GPU. Vera Rubin paired the Rubin GPU with the Vera CPU — NVIDIA's first custom Arm-based server processor, moving away from the AMD EPYC CPUs used in previous DGX systems. Vera CPUs were connected to Rubin GPUs using NVLink-C2C, the same chip-to-chip interconnect used internally within Grace Hopper Superchips, providing bandwidth of 900 GB/s between CPU and GPU — roughly 7× PCIe 5.0. This allowed Vera Rubin compute nodes to treat CPU and GPU memory as a single flat address space rather than copying data across a PCIe bus.

The Rubin GPU generation used HBM4 memory with higher bandwidth than the HBM3e in Blackwell Ultra, and NVLink 6 for multi-GPU connectivity within a rack, with each NVLink 6 port providing 1.8 TB/s of bidirectional bandwidth. NVIDIA announced NVLink Fusion, extending NVLink connectivity to third-party accelerators and custom silicon from cloud providers, allowing a mixed rack to contain both NVIDIA GPUs and custom inference ASICs communicating over a common high-speed fabric — a significant change from NVIDIA's previous closed NVLink topology that required all devices to be NVIDIA hardware.

The strategic emphasis at GTC 2026 was on system-level performance for models too large to fit on a single GPU or even a single rack: frontier AI models at 100+ billion to 1+ trillion parameters required tight coordination of memory bandwidth, interconnect topology, and power delivery at the scale of thousands of GPUs. NVIDIA's GB200 NVL72 racks (72 Blackwell GPUs sharing NVLink in one rack) had already established rack-scale coherent memory as a competitive baseline; Vera Rubin extended the same principle to CPU-GPU compute nodes, positioning NVIDIA's value proposition as the entire data-center stack rather than any individual accelerator.
