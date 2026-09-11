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

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in technology, computing-history, history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
