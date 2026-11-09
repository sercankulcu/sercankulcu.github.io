---
title: NVIDIA Launches the Kepler GPU Architecture
date: 2012-03-15
permalink: /posts/2012/03/nvidia-launches-the-kepler-gpu-architecture/
tags:
  - hardware
  - computing
  - history
---

NVIDIA launched the Kepler architecture on March 22, 2012 with the GeForce GTX 680 at $499. The GK104 die at the heart of the GTX 680 contained 3.54 billion transistors on a 28nm TSMC process, delivering 3.09 TFLOPS of single-precision compute. The GTX 680 matched or outperformed AMD's Radeon HD 7970 (launched January 2012 at $549) in most games while drawing significantly less power — 195W vs. 250W under load. NVIDIA followed with the GTX 670 in May 2012 at $399, using a cut-down GK104 that offered most of the GTX 680's performance at lower cost.

Kepler replaced Fermi's 32-core SMs with 192-core SMX units, running the shaders at lower clock rates (1006 MHz base on GTX 680 vs. Fermi's 1401 MHz on GTX 580) while multiplying throughput via parallelism rather than raw clock speed. The architecture also introduced GPU Boost, which monitored power and temperature headroom and automatically raised GPU clock above the base frequency when conditions allowed — an approach subsequently adopted by AMD and Intel. NVIDIA's Kepler compute cards (K20, K40) used the GK110 die with 7.08 billion transistors and Dynamic Parallelism, which allowed a GPU kernel to launch child kernels from the GPU itself, enabling recursive algorithms and adaptive mesh refinement without stalling the device to return control to the CPU.

In 2012, GPU computing was gaining traction beyond graphics: the ImageNet 2012 competition was won in September by Alex Krizhevsky and Geoffrey Hinton using a convolutional neural network trained on two GTX 580s, demonstrating a 10.9 percentage-point accuracy advantage over the next best entry and effectively launching the modern deep-learning era. Kepler's GK110 became the GPU of choice for early deep-learning research through 2013–2014, before NVIDIA began explicitly targeting the market with the K80 and the CUDA deep neural network library (cuDNN) released in 2014.

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in hardware, computing, history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
