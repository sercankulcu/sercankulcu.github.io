---
title: Intel and the Industry Push Multi-Core Computing
date: 2007-07-15
permalink: /posts/2007/07/intel-and-the-industry-push-multi-core-computing/
tags:
  - hardware
  - computing
  - history
---

By 2007, dual-core processors were becoming standard in mainstream PCs, and the industry was clearly moving away from the old strategy of increasing clock speed every generation. Power density and heat had made that path increasingly difficult.

A multi-core processor puts several execution cores on one chip, but software does not automatically become twice as fast. Programs must expose work that can run in parallel, and shared resources such as caches and memory bandwidth can become bottlenecks. Operating systems also need schedulers capable of distributing threads efficiently across cores.

This shift changed software engineering. Developers who had spent years relying on faster future CPUs now had to think about threads, synchronization, data races, and parallel algorithms. The core counts of modern desktop and server processors are much higher, but the basic challenge remains the same: useful parallelism has to come from software.
