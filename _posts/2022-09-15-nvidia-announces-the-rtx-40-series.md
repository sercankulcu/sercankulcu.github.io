---
title: NVIDIA Announces the RTX 40 Series
date: 2022-09-15
permalink: /posts/2022/09/nvidia-announces-the-rtx-40-series/
tags:
  - hardware
  - computing
  - history
---

NVIDIA unveiled the GeForce RTX 40 series at a September 20, 2022 event, with the RTX 4090 and two versions of RTX 4080 (16GB and 12GB) announced. The RTX 4090 launched October 12 at $1,599; the 16GB RTX 4080 launched November 16 at $1,199. The 12GB "4080" was withdrawn after public backlash over the naming and re-released in January 2023 as the RTX 4070 Ti at $799. All used the Ada Lovelace architecture on TSMC's 4N process node (a customized version of 5nm). The RTX 4090 contained 76.3 billion transistors on the AD102 die, nearly double the RTX 3090 Ti's 40.4 billion on Samsung 8N.

Ada's third-generation RT Cores doubled ray/triangle intersection throughput compared to Ampere; fourth-generation Tensor Cores added FP8 (8-bit floating point) support for faster DLSS inference. DLSS 3 introduced Frame Generation: the optical-flow accelerator analyzed motion vectors between two consecutive rendered frames and generated a synthetic intermediate frame using a neural network running on Tensor Cores. On an RTX 4090, Frame Generation could raise displayed frame rates from 60 fps to over 100 fps in CPU-bottlenecked scenarios at the cost of increased input latency because generated frames were not rendered from actual simulation state.

The RTX 4090's 450W TDP (up from 350W for the RTX 3090 Ti) required a 16-pin 12VHPWR connector; early adapters were prone to melting connectors when users bent them too sharply, leading to widespread user reports and a quiet revision of the adapter design. The power increase reflected NVIDIA's strategy of maximizing performance-per-generation by removing the watt ceiling rather than optimizing efficiency. AMD's RX 7900 XTX, released December 2022 at $999, offered competitive performance to the RTX 4080 at lower cost but without DLSS 3, which remained exclusive to NVIDIA hardware.

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in hardware, computing, history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
