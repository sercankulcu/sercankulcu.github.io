---
title: Google Introduces the Tensor Processing Unit
date: 2016-05-15
permalink: /posts/2016/05/google-introduces-the-tensor-processing-unit/
tags:
  - technology
  - computing-history
  - history
---

Google announced the Tensor Processing Unit (TPU) at Google I/O on May 18, 2016, with Jeff Dean revealing that TPUs had already been deployed in Google's data centers since 2013 — three years of silent production use. The TPU v1 was an inference-only ASIC built on a 28nm process, consuming 40 watts (roughly a quarter of an equivalent GPU), and connected to a host CPU via PCIe. It targeted deployed inference rather than training, focusing entirely on the matrix operations that dominate neural network forward passes during serving.

The TPU v1's core was a 256×256 systolic array of 8-bit multiply-accumulate units — 65,536 multiply-accumulators operating in parallel — achieving 92 tera-operations per second (TOPS) at INT8 precision. Data flowed through the array in a wave pattern, reusing weights loaded from a 28MB on-chip weight SRAM without repeated memory fetches, addressing the "memory wall" bottleneck that limited GPU efficiency on smaller batch sizes common in real-time serving. A 2017 paper in IEEE Micro reported the TPU was 15–30× faster than contemporary Haswell Xeon CPUs and 30–80× more efficient (performance per watt) than NVIDIA K80 GPUs on representative Google inference workloads — with the caveat that these were Google's own workloads, tuned for TPU characteristics. DeepMind used TPUs to run AlphaGo during the March 2016 matches against Lee Sedol; Google Search, Street View image annotation, and Google Translate all used TPU inference by the time of the announcement.

TPU v2, announced at Google I/O in May 2017, added bfloat16 floating-point support enabling training (not just inference), delivered 180 TFLOPS per chip, used 64GB high-bandwidth memory (HBM), and became available as Cloud TPU in beta — opening Google's custom silicon to external researchers for the first time. TPU v3 (May 2018) doubled performance to 420 TFLOPS per chip and added liquid cooling. The TPU announcements prompted Intel (acquisition of Nervana, August 2016), Microsoft (Project Brainwave using FPGAs, 2017), and Amazon (Inferentia, 2018) to announce their own ML inference accelerators, making custom ML silicon a requirement for major cloud providers rather than a Google-specific advantage.
