---
title: OpenAI Releases GPT-2 in Stages
date: 2019-08-15
permalink: /posts/2019/08/openai-releases-gpt-2-in-stages/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

OpenAI published its research paper on GPT-2 in February 2019 and released the model in stages across the year: the 117M parameter version in February, the 345M version in May, the 774M version in August, and the full 1.558 billion parameter model in November 2019. The staged release was explicitly justified by OpenAI's concerns about potential misuse for generating disinformation and spam at scale — the first time a major AI lab publicly withheld model weights for safety rather than commercial reasons.

GPT-2 was trained on 40GB of text scraped from Reddit links with at least three upvotes (approximately 8 million documents), using a standard language-modeling objective: predict the next token given all prior tokens. The transformer architecture (48 layers, 1.6 billion parameters) generalized well enough that the model could continue stories, translate (without explicit training for it), answer factual questions when primed with question-answer examples, and summarize articles when given a TL;DR prompt — all emergent behaviors from next-token prediction. Researchers found the model could produce paragraphs that passed as human-written text in online studies, with no fine-tuning for any specific task.

When OpenAI finally released the 1.5B model in November 2019 after six months, no significant misuse incidents had emerged — partly because independent researchers had already replicated the model from the paper's description, and several open reproductions were publicly available. The episode crystallized a division in the AI research community between those who argued that transparency and replication require open publication of weights and those who argued that capability thresholds imposed corresponding safety obligations. This debate intensified substantially when larger models arrived: GPT-3 (175B parameters, June 2020) was never released as open weights, and the open vs. closed model debate continued through the LLaMA releases of 2023–2024.
