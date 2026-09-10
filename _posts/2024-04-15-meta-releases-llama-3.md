---
title: Meta Releases Llama 3
date: 2024-04-15
permalink: /posts/2024/04/meta-releases-llama-3/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Meta released Llama 3 on April 18, 2024, launching 8-billion and 70-billion parameter models at Meta AI and on Hugging Face. The 8B and 70B Instruct variants matched or exceeded competing open-weight models and closed the gap with GPT-3.5 and Claude 3 Haiku on several benchmarks. Meta signaled that a 400B+ model was in training.

The new generation used a tokenizer with a 128,000-token vocabulary — more than twice Llama 2's 32,000 — which represents code and multilingual text more efficiently because common sequences require fewer tokens. Meta trained on more than 15 trillion tokens, more than seven times the data volume used for Llama 2, and used careful data quality filtering rather than simply scaling token count.

The 8B model ran comfortably on consumer GPUs with 8–16 GB of VRAM. For the 70B model, developers could run it in 4-bit quantized form on a single high-end workstation GPU or deploy it on cloud instances. Llama 3 made 2024 the year when open-weight models became genuinely competitive with hosted commercial models for many use cases.
