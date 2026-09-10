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
