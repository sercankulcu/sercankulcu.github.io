---
title: Apple Releases the First M1 Macs
date: 2020-11-15
permalink: /posts/2020/11/apple-releases-the-first-m1-macs/
tags:
  - hardware
  - computing
  - history
---

Apple released the MacBook Air, 13-inch MacBook Pro, and Mac mini with M1 on November 17, 2020. The MacBook Air started at $999, the MacBook Pro at $1,299, and the Mac mini at $699 — unchanged prices from their Intel predecessors. Apple had announced the transition from Intel to Apple silicon at WWDC in June 2020, promising a two-year transition window; the first M1 Macs arrived only five months later.

M1 was manufactured on TSMC's 5nm process and contained 16 billion transistors. It integrated four high-performance CPU cores (Firestorm) and four efficiency cores (Icestorm), an eight-core GPU, a 16-core Neural Engine capable of 11 trillion operations per second, a unified memory bus shared by all components, and dedicated media encode/decode engines for H.264, HEVC, and ProRes. “Unified memory” meant CPU and GPU read and wrote the same physical pool (8GB or 16GB of LPDDR4X at 68.25 GB/s) with no copy overhead — on Intel Macs, the discrete GPU had its own GDDR memory, requiring data to be copied over the PCIe bus. Geekbench 5 single-core scores around 1,750 placed M1 ahead of any Intel Mac Apple had ever sold, including the 2019 Mac Pro.

Rosetta 2 — Apple's binary translation layer for running x86-64 applications on ARM64 — was substantially faster than earlier translation efforts. Many Rosetta 2-translated applications benchmarked within 80% of native Intel speed, and in some workloads (where the M1's superior architecture compensated) faster. The MacBook Air, now fanless (no cooling fan at all), sustained full performance under load without thermal throttling that earlier fanless designs had required. Apple completed the Mac transition to Apple silicon in June 2023 when the last Intel Mac Pro was discontinued, fulfilling the two-year timeline two months early.

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in hardware, computing, history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
