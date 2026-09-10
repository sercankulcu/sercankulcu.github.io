---
title: Microsoft Introduces the Maia 200 AI Accelerator
date: 2026-01-15
permalink: /posts/2026/01/microsoft-introduces-the-maia-200-ai-accelerator/
tags:
  - hardware
  - computing
  - history
---

Microsoft introduced Maia 200 at its January 2026 Azure hardware event as the successor to the first-generation Maia 100 accelerator (announced November 2023, deployed in Azure in 2024). Maia 200 is manufactured on TSMC's 3nm process and contains 216 GB of HBM3e memory across six stacks, delivering approximately 7 TB/s of memory bandwidth — roughly 1.75× the bandwidth of an NVIDIA H100 SXM5 (3.35 TB/s) and competitive with the H200 (4.8 TB/s). The chip includes 272 MB of on-chip SRAM, 10+ petaFLOPS at FP4, and 5+ petaFLOPS at FP8 for matrix operations used in transformer inference.

Maia 200 was designed around the economics of token generation: serving large language models is primarily memory-bandwidth-bound rather than compute-bound, because for each generated token the entire model weight must be read from memory. Higher memory bandwidth allows faster token generation at the same model size, or the same generation rate at lower power. Microsoft designed Maia 200's memory system with this constraint as the primary optimization target, in contrast to training accelerators that optimize for compute throughput on large batches. Azure deployed Maia 200 in custom rack configurations using Microsoft's own ND (Network-Direct) interconnect fabric, reducing dependence on NVIDIA's proprietary NVLink for multi-chip scaling.

Microsoft's motivation for custom silicon was both economic and strategic. By 2025, Azure was spending billions of dollars per quarter on third-party GPUs — primarily from NVIDIA — to serve OpenAI's models (Microsoft had committed $13 billion to OpenAI) and Azure AI customers. A custom chip optimized for inference workloads could reduce per-token serving costs and give Microsoft control over hardware roadmap timing, supply, and pricing that GPU scarcity at NVIDIA had made unpredictable. Google had pursued a similar strategy with TPUs since 2016; Amazon with Trainium and Inferentia since 2019. Maia 200 represented Microsoft's most direct bet that custom silicon would be a meaningful differentiator in cloud AI economics.
