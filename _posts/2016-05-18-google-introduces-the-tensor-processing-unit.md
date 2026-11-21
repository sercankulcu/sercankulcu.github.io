---
title: Google Introduces the Tensor Processing Unit
excerpt: "Google's 2016 Tensor Processing Unit: a 256x256 systolic array for neural-network inference, its performance claims, and how TPU v2 and v3 pushed rivals."
date: 2016-05-18
permalink: /posts/2016/05/google-introduces-the-tensor-processing-unit/
tags:
  - technology
  - computing-history
  - history
---

Google announced the Tensor Processing Unit (TPU) at Google I/O on May 18, 2016, with Google revealing that TPUs had already been running in its data centers for more than a year — silent production use since 2015. The TPU v1 was an inference-only ASIC built on a 28nm process, consuming about 40 watts when busy, and connected to a host CPU via PCIe. It targeted deployed inference rather than training, focusing entirely on the matrix operations that dominate neural network forward passes during serving.

The TPU v1's core was a 256×256 systolic array of 8-bit multiply-accumulate units — 65,536 multiply-accumulators operating in parallel — achieving 92 tera-operations per second (TOPS) at INT8 precision. Data flowed through the array in a wave pattern, reusing weights staged through an on-chip Weight FIFO fed from 8 GiB of off-chip DRAM, with 28 MiB of software-managed on-chip memory, without repeated memory fetches, addressing the "memory wall" bottleneck that limited GPU efficiency on smaller batch sizes common in real-time serving. A 2017 ISCA paper reported the TPU was 15–30× faster than contemporary Haswell Xeon CPUs and NVIDIA K80 GPUs and 30–80× more efficient (performance per watt) on representative Google inference workloads — with the caveat that these were Google's own workloads, tuned for TPU characteristics. DeepMind used TPUs to run AlphaGo during the March 2016 matches against Lee Sedol; Google Search (RankBrain) and Street View both used TPU inference by the time of the announcement.

TPU v2, announced at Google I/O in May 2017, added bfloat16 floating-point support enabling training (not just inference), delivered 180 TFLOPS per device, used 64GB high-bandwidth memory (HBM), and became available as Cloud TPU in beta — opening Google's custom silicon to external researchers for the first time. TPU v3 (May 2018) doubled performance to 420 TFLOPS per device and added liquid cooling. The TPU announcements prompted Intel (acquisition of Nervana, August 2016), Microsoft (Project Brainwave using FPGAs, 2017), and Amazon (Inferentia, 2018) to announce their own ML inference accelerators, making custom ML silicon a requirement for major cloud providers rather than a Google-specific advantage.

**Sources:** [Google supercharges machine learning tasks with TPU custom chip (Google Cloud Blog)](https://cloud.google.com/blog/products/ai-machine-learning/google-supercharges-machine-learning-tasks-with-custom-chip), [In-Datacenter Performance Analysis of a Tensor Processing Unit (Jouppi et al., ISCA 2017)](https://arxiv.org/abs/1704.04760), [Build and train machine learning models on our new Google Cloud TPUs (Google Blog)](https://blog.google/products/google-cloud/google-cloud-offer-tpus-machine-learning/)
