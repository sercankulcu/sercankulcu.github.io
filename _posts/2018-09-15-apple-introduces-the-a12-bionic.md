---
title: Apple Introduces the A12 Bionic
date: 2018-09-15
permalink: /posts/2018/09/apple-introduces-the-a12-bionic/
tags:
  - hardware
  - computing
  - history
---

Apple announced the A12 Bionic on September 12, 2018 alongside the iPhone XS ($999), XS Max ($1099), and XR ($749 — releasing October 26). Manufactured on TSMC's first-generation 7nm process (N7, not yet EUV-based) with approximately 6.9 billion transistors, the A12 was one of the first mass-production chips built at 7nm — Qualcomm's Snapdragon 855 remained on 7nm TSMC but didn't ship until December 2018, and Samsung's 7nm processes weren't available until 2019. The A12's CPU used two Vortex high-performance cores (2.49 GHz) and four Tempest efficiency cores — Apple's first chip with a heterogeneous big.LITTLE-style CPU arrangement, following ARM's own design pattern — plus a four-core GPU that Apple claimed was 50% faster than the A11's GPU.

The A12's second-generation Neural Engine had eight dedicated cores capable of 5 trillion operations per second, compared to the A11 Bionic's two-core, 600 GOPS Neural Engine introduced in 2017 (the industry's first production smartphone neural processing unit). Apple exposed the Neural Engine through Core ML (released at WWDC 2017), allowing third-party applications to run on-device inference for image recognition, NLP, and augmented reality without sending data to external APIs. Core ML 2 (shipped with iOS 12 in September 2018) added batch processing, model quantization to 4-bit weights, and Create ML for training custom models on a Mac. The iPhone XS camera used the Neural Engine for Smart HDR — capturing multiple frames at different exposures and using neural semantic segmentation to identify sky, foliage, skin tones, and shadows, merging them with different tonal adjustments applied per-region rather than globally.

The A12 Bionic's die illustrated the architectural direction that smartphone SoC design had been taking since Apple's A7 (2013): a heterogeneous collection of specialized silicon blocks rather than a single fast CPU. The A12 die included Vortex/Tempest CPU clusters, the four-core GPU, the Neural Engine, a dedicated image signal processor (ISP), a video encode/decode block (H.264/HEVC hardware acceleration), the Secure Enclave (hardware cryptographic processor for Face ID and key storage), a display engine, and memory controller — all on a single 7nm die. Software accessed each block through Apple's frameworks (AVFoundation for video, Core Image for ISP, ARKit for AR, Core ML for Neural Engine) without requiring developers to manage hardware scheduling. By 2018, the Neural Engine's 5 TOPS exceeded the inference throughput of many cloud-deployed GPU servers from 2015, running in a phone that consumed 3–5 watts; the equivalent inference workload on a desktop GPU consumed 75–150 watts.
