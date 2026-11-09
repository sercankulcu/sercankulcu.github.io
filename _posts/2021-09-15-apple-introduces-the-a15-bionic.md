---
title: Apple Introduces the A15 Bionic
date: 2021-09-15
permalink: /posts/2021/09/apple-introduces-the-a15-bionic/
tags:
  - hardware
  - computing
  - history
---

Apple announced the A15 Bionic on September 14, 2021 with the iPhone 13 lineup: iPhone 13 ($799), 13 Mini ($699), 13 Pro ($999), and 13 Pro Max ($1,099). The A15 was manufactured on TSMC's enhanced 5nm process (N5P), containing 15 billion transistors compared to the A14's 11.8 billion. The CPU used 2 Avalanche high-performance cores and 4 Blizzard efficiency cores — Apple claimed 50% faster CPU performance than competitors at the time (targeting Qualcomm's Snapdragon 888, which used Samsung 5nm and measured roughly 30–35% behind the A15 in single-thread benchmarks). The 16-core Neural Engine delivered 15.8 TOPS, up from the A14's 11 TOPS, supporting the new Cinematic Mode video feature.

Apple differentiated A15 GPU configurations across product lines: the iPhone 13 and 13 Mini received a 4-core GPU, while the 13 Pro and 13 Pro Max received a 5-core GPU — the first time Apple shipped a different GPU configuration within the same chip generation to segment performance between standard and Pro models. The 5-core GPU enabled ProRes video recording (compressed at 6 Gbps in 4K30, requiring both compute and memory bandwidth at sustained levels the 4-core GPU couldn't maintain), a capability restricted to iPhone 13 Pro models. The 13 Pro and Pro Max also introduced ProMotion — adaptive refresh rates from 1 Hz to 120 Hz (first time in iPhone, common in Android flagships since 2019) — which required the GPU to maintain low-latency rendering at variable rates without GPU scheduling overhead.

Cinematic Mode demonstrated the A15's heterogeneous compute architecture: recording video in Cinematic Mode required the image signal processor (ISP) capturing 12MP frames, the Neural Engine running person segmentation at 30 fps (each frame processed within one 33ms frame budget), the ISP applying depth-based blur to background regions identified by the Neural Engine, and the video encoder compressing to HEVC simultaneously — all within 3–5 watts. The A15 later powered the iPhone SE 3rd generation (March 2022), iPad mini 6th generation (September 2021, same launch), Apple TV 4K 3rd generation (November 2022), and served as the base chip in the iPhone 14 non-Pro (September 2022) when Apple separated the chip generations between Pro and non-Pro iPhone lines for the first time — Pro models receiving the A16 Bionic while iPhone 14 reused the A15.
