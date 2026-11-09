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

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in artificial-intelligence, software, computing-history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
