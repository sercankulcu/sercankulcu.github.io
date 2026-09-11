---
title: Meta Releases Llama 3
date: 2024-04-15
permalink: /posts/2024/04/meta-releases-llama-3/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Meta released Llama 3 on April 18, 2024, with 8-billion and 70-billion parameter models in both base and instruction-tuned variants, distributed through Hugging Face, llama.meta.com, and major cloud providers (AWS Bedrock, Google Vertex AI, Azure AI). The 8B and 70B Instruct variants outperformed comparable open-weight models (Mistral 7B, Gemma 7B) on standard benchmarks and approached GPT-3.5 Turbo performance on tasks like MMLU (79.5% for Llama 3 70B vs GPT-3.5's ~70%) and coding. Meta announced that a Llama 3 model exceeding 400 billion parameters was in training.

The Llama 3 architecture used Grouped Query Attention (GQA) for inference efficiency, a context window of 8,192 tokens (unchanged from Llama 2's 4,096 in this release — extended in later variants), and a significantly expanded tokenizer vocabulary of 128,000 tokens (versus Llama 2's 32,000). The larger vocabulary reduced the number of tokens required to represent code, non-English text, and technical content, improving efficiency particularly for coding tasks. Meta trained the 8B model on more than 15 trillion tokens — over seven times Llama 2's 2 trillion tokens — with a filtering pipeline emphasizing data quality: web text was filtered for educational value and diversity, and the 8B model received proportionally more training compute per parameter than the 70B to compensate for its smaller capacity.

The 8B model ran in 16-bit precision on a single consumer GPU with 16 GB VRAM (NVIDIA RTX 4070 or above), and in 4-bit quantized form (via llama.cpp or Ollama) on GPUs with 6–8 GB VRAM or on unified-memory Apple Silicon Macs with 8–16 GB RAM. The 70B model in 4-bit quantization required approximately 40 GB memory, fitting on a dual-GPU workstation or a high-RAM Mac Studio. Meta released the Llama 3 405B on July 23, 2024 — a model competitive with GPT-4o on MMLU and coding benchmarks — extending open-weight model capabilities to the frontier tier. The 405B required a multi-GPU server for inference but was downloadable and modifiable, establishing a precedent that frontier-scale models could be open-weight.

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in artificial-intelligence, software, computing-history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
