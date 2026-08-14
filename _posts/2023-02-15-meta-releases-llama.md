---
title: Meta Releases LLaMA
date: 2023-02-15
permalink: /posts/2023/02/meta-releases-llama/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Meta released LLaMA in February 2023 as a family of research language models with 7, 13, 33, and 65 billion parameters. The work challenged the idea that competitive language models always had to grow toward hundreds of billions of parameters.

LLaMA used a decoder-only transformer architecture but trained smaller models on unusually large amounts of text. The 13-billion-parameter version was reported to outperform GPT-3 on several benchmarks despite GPT-3 having 175 billion parameters. The lesson was that training-token count and data strategy can be as important as parameter count.

Meta initially distributed the weights under a research license, but copies quickly spread. The models triggered rapid experimentation with quantization and fine-tuning, helping create the modern local-LLM ecosystem.
