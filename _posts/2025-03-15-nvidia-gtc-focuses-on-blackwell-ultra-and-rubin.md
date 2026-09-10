---
title: NVIDIA GTC Focuses on Blackwell Ultra and Rubin
date: 2025-03-15
permalink: /posts/2025/03/nvidia-gtc-focuses-on-blackwell-ultra-and-rubin/
tags:
  - hardware
  - computing
  - history
---

NVIDIA held GTC 2025 in San Jose from March 17–21, with Jensen Huang's keynote detailing the Blackwell Ultra accelerator and announcing the Rubin architecture roadmap. Blackwell Ultra — the B200 Ultra — raised HBM3e memory to 288 GB per GPU (up from 192 GB on the B200) and increased FP4 throughput to support the larger context windows and reasoning chains frontier models were beginning to require. NVLink 6 connected up to 576 B200 Ultra GPUs within a single NVLink domain, enabling the full weight matrix of a large model to reside in fast GPU memory rather than requiring frequent host-memory transfers.

The Rubin architecture, planned for 2026, was announced alongside the Vera CPU — NVIDIA's first custom Arm CPU for server use — to form a paired CPU-GPU compute node. Rubin GPUs would use HBM4 memory and a new NVLink generation, with NVIDIA signaling that power delivery and cooling for 1,000+ watt per-GPU envelopes were now first-class engineering problems requiring liquid cooling from the factory rather than an afterthought handled by data-center operators.

The GTC cadence itself was noteworthy: NVIDIA had shifted from roughly two-year product cycles to annual major releases to match the pace of model scaling. Each generation arriving a year before the next had been announced created continuous demand pressure on data-center customers who had to decide whether to deploy current-generation hardware immediately or wait. By March 2025, NVIDIA's data-center revenue had grown from $3.8 billion per quarter in early 2023 to over $30 billion per quarter, making GPU availability the binding constraint for AI labs worldwide.
