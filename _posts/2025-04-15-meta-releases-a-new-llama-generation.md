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
