---
title: Apple Introduces the A12 Bionic
date: 2018-09-15
permalink: /posts/2018/09/apple-introduces-the-a12-bionic/
tags:
  - hardware
  - computing
  - history
---

Apple introduced the A12 Bionic with the iPhone XS, XS Max, and XR in September 2018. Manufactured on TSMC's 7nm process with approximately 6.9 billion transistors, the A12 was one of the first mass-market chips produced at that node, ahead of comparable 7nm products from Qualcomm and Samsung. The CPU used two high-performance cores and four efficiency cores — Apple's first to use this heterogeneous arrangement — plus a four-core GPU.

The A12's second-generation Neural Engine contained eight dedicated cores capable of 5 trillion operations per second, compared to the A11 Bionic's two-core Neural Engine. Apple exposed this hardware through Core ML, allowing applications to run on-device machine-learning inference for tasks such as image recognition, natural-language understanding, and augmented reality without sending data to the cloud. The iPhone XS camera used the Neural Engine for semantic rendering — identifying sky, foliage, skin, and other regions and applying separate tonal adjustments to each.

The A12 illustrated the direction smartphone silicon was heading: performance no longer came from one large general-purpose CPU core. Instead, the die area was divided among a CPU, GPU, image signal processor, Secure Enclave, media encode/decode blocks, and the Neural Engine. Each block was optimized for its specific workload, and software accessed the most appropriate hardware through high-level frameworks. By 2018, the combined throughput of these specialized blocks in a flagship phone had exceeded what a mid-range laptop CPU could manage for many real-time tasks.
