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

## Why This Moment Mattered

The topic is useful because it captures a broader shift in how people build, use, and understand technology. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in artificial-intelligence, software, computing-history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
