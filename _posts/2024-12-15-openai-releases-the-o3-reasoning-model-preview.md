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
