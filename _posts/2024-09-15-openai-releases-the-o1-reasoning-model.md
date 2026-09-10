---
title: OpenAI Releases the o1 Reasoning Model
date: 2024-09-15
permalink: /posts/2024/09/openai-releases-the-o1-reasoning-model/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

OpenAI released o1 on September 12, 2024 — initially called “o1-preview” for ChatGPT Plus and Team subscribers at $20/month, with API access at $15 per million input tokens and $60 per million output tokens. A smaller, faster variant called o1-mini launched the same day at $3/$12 per million tokens, designed for coding and STEM tasks on a tighter budget. The full o1 model (removing the “preview” label) launched December 5, 2024.

o1 used reinforcement learning to train the model to “think” before answering — generating an internal chain-of-thought scratch pad that was visible to the model but summarized for users. On the AIME 2024 mathematics competition, o1 scored 74% where GPT-4o scored 13%. On Codeforces competitive programming problems, o1 reached the 89th percentile. On a set of PhD-level science questions (GPQA Diamond), o1 scored 78% vs. GPT-4o's 56%. The model reasoned through problems by generating hypotheses, checking them, backtracking on failed approaches, and building up multi-step solutions in ways that single-pass generation could not replicate.

The release reframed how the field thought about scaling. From 2018 to 2023, the dominant paradigm was that more parameters and more training tokens produced smarter models (pretraining scaling). o1 demonstrated that spending more computation at inference time — generating more tokens of internal reasoning before producing a final answer — could yield comparable or larger capability gains without growing the model. OpenAI released o3 in December 2024 at significantly higher test-time compute, scoring 87.7% on ARC-AGI compared to 5% for GPT-4o, establishing test-time compute scaling as a second major axis of AI progress alongside pretraining.
