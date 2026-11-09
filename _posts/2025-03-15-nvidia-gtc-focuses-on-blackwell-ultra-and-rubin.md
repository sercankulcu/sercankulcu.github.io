---
title: NVIDIA GTC Focuses on Blackwell Ultra and Rubin
date: 2025-03-15
permalink: /posts/2025/03/nvidia-gtc-focuses-on-blackwell-ultra-and-rubin/
tags:
  - hardware
  - computing
  - history
---

NVIDIA held GTC 2025 in San Jose from March 17–21, with Jensen Huang's keynote detailing the Blackwell Ultra accelerator and announcing the Rubin architecture roadmap. Blackwell Ultra — the B200 Ultra — raised HBM3e memory to 288 GB per GPU (up from 192 GB on the B200) and increased FP4 throughput to support the larger context windows and reasoning chains frontier models were beginning to require. NVLink 6 connected up to 576 B200 Ultra GPUs within a single NVLink domain, enabling the full weight matrix of a large model to reside in fast GPU memory rather than requiring frequent host-memory transfers.

The Rubin architecture, planned for 2026, was announced alongside the Vera CPU — NVIDIA's first custom Arm CPU for server use — to form a paired CPU-GPU compute node. Rubin GPUs would use HBM4 memory and a new NVLink generation, with NVIDIA signaling that power delivery and cooling for 1,000+ watt per-GPU envelopes were now first-class engineering problems requiring liquid cooling from the factory rather than an afterthought handled by data-center operators.

The GTC cadence itself was noteworthy: NVIDIA had shifted from roughly two-year product cycles to annual major releases to match the pace of model scaling. Each generation arriving a year before the next had been announced created continuous demand pressure on data-center customers who had to decide whether to deploy current-generation hardware immediately or wait. By March 2025, NVIDIA's data-center revenue had grown from $3.8 billion per quarter in early 2023 to over $30 billion per quarter, making GPU availability the binding constraint for AI labs worldwide.

## Why This Moment Mattered

The topic is useful because it captures a broader shift in how people build, use, and understand technology. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in hardware, computing, history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
