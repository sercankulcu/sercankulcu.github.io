---
title: Meta Releases a New Llama Generation
date: 2025-04-15
permalink: /posts/2025/04/meta-releases-a-new-llama-generation/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Meta released Llama 4 Scout and Maverick on April 5, 2025, marking the Llama family's shift from dense transformers to mixture-of-experts (MoE) architecture. Scout had 17 billion active parameters out of 109 billion total (16 experts, one selected per token), and a 10 million token context window — the longest of any openly released model at the time. Maverick had 17 billion active parameters out of 400 billion total (128 experts) and achieved competitive scores against GPT-4o and Gemini 2.0 Flash on coding and reasoning benchmarks. A third model, Llama 4 Behemoth at over 2 trillion total parameters, was announced as still in training.

MoE architecture lets a model contain far more total parameters than it activates for any single token, keeping inference compute costs similar to a smaller dense model while the full parameter space provides specialized capacity. Google's Gemini 1.5 and Mistral's Mixtral had popularized MoE at scale in 2024; Llama 4 brought the approach to the open-weight ecosystem. Meta distributed the weights under the Llama 4 Community License, free for most commercial uses up to 700 million monthly active users.

Efficient MoE serving required routing each token to the correct expert set and keeping those experts accessible with low memory latency — a harder scheduling problem than dense inference. Meta published reference server code for multi-GPU expert distribution, but the operational complexity meant that Llama 4 was significantly more demanding to deploy than Llama 3 had been, reinforcing a divide between organizations with large GPU clusters and smaller teams running quantized models on consumer hardware.

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in artificial-intelligence, software, computing-history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
