---
title: Meta Releases Llama 2
date: 2023-07-15
permalink: /posts/2023/07/meta-releases-llama-2/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Meta released Llama 2 on July 18, 2023 in partnership with Microsoft, distributing model weights through Hugging Face, llama.meta.com, and Microsoft Azure. The release included three sizes — 7B, 13B, and 70B parameters — in both base (pretrained) and Chat (RLHF-aligned) variants, under a custom commercial license that permitted use by organizations with fewer than 700 million monthly active users without additional licensing, and required a separate agreement from Meta for larger deployments. This was a significant change from the first LLaMA (February 2023), which had been released for research-only use and whose weights leaked via torrent within a week.

Llama 2 was trained on approximately 2 trillion tokens of publicly available text — roughly 40% more than LLaMA 1 — from Common Crawl, C4, GitHub, Wikipedia, and books, with explicit filtering to remove data from Meta's own products. The context window doubled from 2,048 to 4,096 tokens. The Chat variants used supervised fine-tuning on 27,540 instruction-response pairs followed by RLHF (reinforcement learning from human feedback) using over 1 million human preference annotations comparing model responses, plus a technique called Ghost Attention to maintain instruction adherence across multi-turn conversations. The 70B Chat model scored 63.8% on the 5-shot MMLU benchmark — below GPT-3.5 Turbo's approximately 70% but well above previous open-weight models. Meta also published extensive red-teaming results and safety evaluations, making Llama 2 one of the most documented open model releases to that date.

Because Llama 2's weights were downloadable, developers could fine-tune on private data without sending it to a third-party API, quantize to 4-bit precision using llama.cpp (developed by Georgi Gerganov, the same tool built for LLaMA 1) to run on consumer GPUs with 6–8 GB VRAM or Apple Silicon Macs, and deploy behind their own infrastructure with no per-token costs. Meta released Code Llama (a Llama 2 fine-tune specialized for code) on August 24, 2023. Mistral AI released Mistral 7B in September 2023 — not a Llama derivative but a competitor that outperformed Llama 2 13B with 7 billion parameters, demonstrating that architecture improvements beyond scale were possible. The cumulative effect of Llama 2 and its fine-tuned variants shifted the enterprise AI conversation from "which closed API to use" toward open-weight deployments as a viable option for privacy-sensitive applications.
