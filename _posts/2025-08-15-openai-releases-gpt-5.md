---
title: OpenAI Releases GPT-5
date: 2025-08-15
permalink: /posts/2025/08/openai-releases-gpt-5/
tags:
  - technology
  - computing-history
  - history
---

OpenAI released GPT-5 on August 7, 2025, available to ChatGPT users across Free, Plus ($20/month), and Pro ($200/month) tiers and via the API. Rather than launching as a separate model requiring users to switch manually from GPT-4o or o3, GPT-5 was positioned as a unified system: it handled conversational and creative tasks with the low latency of earlier models while applying extended reasoning — essentially the o-series chain-of-thought approach — automatically when the system judged a problem hard enough to warrant it.

OpenAI reported GPT-5 scored 80.7% on HLE (Humanity's Last Exam), a benchmark of expert-level questions across mathematics, science, law, and medicine where GPT-4o had scored around 10%. On SWE-bench Verified, a software engineering coding benchmark, GPT-5 resolved 70%+ of real GitHub issues — a substantial improvement over GPT-4o's roughly 33%. Visual understanding expanded to include longer video reasoning and structured document analysis. Tool use became more reliable across multi-step agentic tasks, addressing a known failure mode where models would abandon tool loops after unexpected intermediate outputs.

The unified architecture represented a product decision as much as a technical one: OpenAI's prior model lineup (GPT-4o for speed, o1/o3 for reasoning, o4-mini for affordable reasoning) required users to select the right model per task, creating friction and support load. GPT-5 internalized the routing decision, with the system dynamically allocating inference-time compute to the difficulty of each request. The practical trade-off was that simple queries might still invoke the slower reasoning pathway if the routing heuristic misjudged, and pricing remained on a per-token basis that favored heavier extended-reasoning use on the Pro tier.
