---
title: OpenAI Releases the o3 Reasoning Model Preview
date: 2024-12-15
permalink: /posts/2024/12/openai-releases-the-o3-reasoning-model-preview/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

OpenAI previewed o3 on December 20, 2024 in a "12 Days of OpenAI" event, releasing benchmark results before the model was publicly available. The headline number was 87.7% on ARC-AGI (Abstraction and Reasoning Corpus for Artificial General Intelligence), a benchmark of visual pattern-recognition puzzles that had been specifically designed to resist language models through its emphasis on systematic generalization rather than pattern matching from training data. GPT-4o had scored 5% on the same benchmark; the previous state-of-the-art AI system had reached 53%. ARC-AGI creator François Chollet had explicitly stated that the benchmark could not be gamed by scale alone, making o3's score the most discussed AI capability result of 2024.

o3 used substantially more inference-time compute than o1: the "high compute" setting that achieved the ARC-AGI score spent on the order of $3,000 per task in inference compute at then-current API pricing. A "low compute" setting achieved 80% on the same benchmark at roughly 6% of the cost. This compute-performance trade-off at inference time (separate from training cost) became the defining characteristic of the o-series: unlike scaling training, which required a one-time expense, inference scaling meant every request could consume variable resources, making cost per query a first-class concern for deployers. On AIME 2024, o3 solved 96.7% of problems (vs. o1's 83.3%); on SWE-bench Verified (real software engineering tasks from GitHub issues), o3 achieved 71.7%.

OpenAI released o3 and o3-mini for public access in January and April 2025 respectively. The preview generated significant discussion about benchmark contamination — whether o3's training data had included examples similar to ARC-AGI tasks — and about whether impressive scores on curated benchmarks translated to reliable performance on open-ended real-world problems. Both concerns reflected the broader difficulty of evaluating reasoning capability as opposed to pattern completion, a distinction that became more pressing as the community debated what o3's scores actually implied for AI progress.

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in artificial-intelligence, software, computing-history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
