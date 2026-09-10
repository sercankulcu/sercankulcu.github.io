---
title: GPT-3 Demonstrates the Scale of Large Language Models
date: 2020-07-15
permalink: /posts/2020/07/gpt-3-demonstrates-the-scale-of-large-language-models/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

OpenAI published the GPT-3 paper ("Language Models are Few-Shot Learners") on arXiv May 28, 2020, and opened a private API beta in June 2020. The model contained 175 billion parameters — 117 times larger than GPT-2's 1.5 billion — trained on approximately 300 billion tokens drawn from a filtered version of Common Crawl (60%), WebText2 (the web corpus from GPT-2, 22%), two book datasets (16%), and English Wikipedia (3%). The transformer architecture used 96 layers, 96 attention heads, and 12,288-dimensional embeddings, requiring approximately 800 GB to store in 16-bit floating-point precision. Estimated training cost was roughly $4.6 million at then-current V100 cloud GPU prices, requiring several thousand GPUs for months.

The paper's central finding was in-context learning: GPT-3 could perform tasks — translation, question answering, arithmetic, code generation — by seeing a small number of examples (few-shot) or a single example (one-shot) or just a task description (zero-shot) in the input prompt, without any gradient update to the model's weights. This was qualitatively different from GPT-2, which could continue text plausibly but not reliably follow task instructions. GPT-3 wrote convincing prose, generated syntactically correct Python and SQL, answered trivia questions, summarized articles, and produced creative content in specific styles — all from a single model without fine-tuning. The API allowed third-party developers to build applications on top of GPT-3: early users included search tools, writing assistants, code generators, and chatbots.

Microsoft licensed exclusive access to GPT-3's underlying model in September 2020, though OpenAI continued to offer API access to other developers. OpenAI fine-tuned GPT-3 into Codex (specialized for code, August 2021), which powered GitHub Copilot's June 2021 launch — the first widely deployed commercial product built on GPT-3's architecture. GPT-3 also prompted responses from Google (PaLM), Meta (OPT, LLaMA), and DeepMind (Gopher, Chinchilla), all racing to match or exceed GPT-3's capabilities. GPT-4 was released March 14, 2023, and InstructGPT (the fine-tuned GPT-3 behind ChatGPT's December 2022 launch) demonstrated that alignment fine-tuning could dramatically improve usefulness without requiring a larger base model.
