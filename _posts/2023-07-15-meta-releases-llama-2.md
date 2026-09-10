---
title: Meta Releases Llama 2
date: 2023-07-15
permalink: /posts/2023/07/meta-releases-llama-2/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Meta released Llama 2 on July 18, 2023 in partnership with Microsoft, distributing weights through Hugging Face and llama.meta.com. The three model sizes — 7, 13, and 70 billion parameters — came in both base and chat-tuned variants under a license that permitted most commercial uses, a major change from the research-only distribution of the first LLaMA.

The chat variants were trained with supervised fine-tuning and reinforcement learning from human feedback using over one million human annotations. Meta also trained on approximately 40% more data than the first generation and doubled the context window to 4,096 tokens. The 70B chat model benchmarked competitively against GPT-3.5 on several tasks.

Because the weights were downloadable, companies could host the model on their own servers, quantize it to 4-bit precision using tools such as llama.cpp to run on consumer hardware, or fine-tune it on private data without sending that data to a third-party API. Llama 2 demonstrated that a commercially usable open-weight model at near-GPT-3.5 quality was achievable, fundamentally changing the open-source AI ecosystem.
