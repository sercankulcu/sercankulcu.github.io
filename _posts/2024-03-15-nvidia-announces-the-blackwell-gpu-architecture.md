---
title: NVIDIA Announces the Blackwell GPU Architecture
date: 2024-03-15
permalink: /posts/2024/03/nvidia-announces-the-blackwell-gpu-architecture/
tags:
  - hardware
  - computing
  - history
---

NVIDIA announced the Blackwell GPU architecture at GTC on March 18, 2024 in a keynote where Jensen Huang said the company was “not in the semiconductor business — we're in the infrastructure business.” The flagship B200 GPU used two connected dies (the GB202 silicon) totaling 208 billion transistors on TSMC's 4NP custom process — more than double the H100's 80 billion transistors on 4N. The B200 delivered 20 petaFLOPS at FP4, compared to the H100's 4 petaFLOPS at FP8 (halving precision doubles throughput, so the increase was partly from precision and partly from transistor count). HBM3e memory reached 192 GB per B200 with 8 TB/s bandwidth — nearly 2.4× the H100's 3.35 TB/s.

Blackwell's second-generation Transformer Engine added FP4 (4-bit floating point) support for inference, extending the first-generation H100 Transformer Engine's FP8. The engine dynamically selected precision per layer — using FP8 for layers where accuracy loss was minimal and FP16 or BF16 for sensitive attention layers — allowing inference at 2–4× the throughput of FP8 without retraining models from scratch. Fifth-generation NVLink (NVLink 5) provided 1.8 TB/s bidirectional bandwidth between GPUs in a DGX B200 system (8 GPUs) and scaled to 576 GPUs in a single NVLink fabric domain via NVLink switches.

The GB200 NVL72 — 36 Grace CPUs and 72 B200 GPUs in a single rack connected through NVLink 5 — was the primary reference architecture: 72 GPUs sharing a coherent memory pool of 13.8 TB of HBM3e, enabling a single model too large for any individual GPU to run across the full rack as one logical compute unit. Blackwell NVL72 racks consumed up to 120 kW — requiring purpose-built liquid cooling at the rack level — and were projected to start shipping to cloud providers in Q3 2024. Microsoft, Google, Oracle, and Amazon all pre-announced purchases at the GTC announcement.
