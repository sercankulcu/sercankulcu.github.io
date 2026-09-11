---
title: Meta Releases LLaMA
date: 2023-02-15
permalink: /posts/2023/02/meta-releases-llama/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Meta released LLaMA (Large Language Model Meta AI) on February 24, 2023, as a family of decoder-only transformer models at four sizes: 7B, 13B, 33B, and 65B parameters. Training used 1 to 1.4 trillion tokens drawn from Common Crawl (67%), GitHub, Wikipedia, books, ArXiv papers, and Stack Exchange — a much larger dataset than GPT-3's 300 billion tokens. The 13B model matched or exceeded GPT-3 (175B parameters) on most standard benchmarks, demonstrating that smaller models trained longer on cleaner data could match much larger models trained on fewer tokens, a finding that echoed the "Chinchilla scaling laws" paper DeepMind had published in March 2022.

Meta distributed LLaMA weights under a non-commercial research license, requiring an application form. Within a week, the full 65B weights had been leaked via a torrent link posted to 4chan. Rather than attempting to suppress the leak, the open-source community treated the release as a starting point: within days, Georgi Gerganov adapted llama.cpp to run quantized LLaMA inference on a MacBook Pro using Apple's Metal GPU framework, then on CPUs. By March 2023, Stanford researchers had fine-tuned LLaMA-7B on 52,000 ChatGPT instruction-response pairs for less than $600 to create Alpaca, a conversational model running on a consumer laptop.

The downstream effect was a rapid proliferation of fine-tuned variants — Vicuna, WizardLM, Koala — and the establishment of 4-bit and 8-bit quantization formats (GGML, then GGUF) as standard ways to run large models on hardware without expensive GPUs. When Meta released LLaMA 2 in July 2023 with a more permissive commercial license, the ecosystem of tools, quantization libraries, and fine-tuning workflows built around the original LLaMA made adoption nearly immediate.

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in artificial-intelligence, software, computing-history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
