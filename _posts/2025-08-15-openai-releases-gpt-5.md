---
title: OpenAI Releases GPT-5
excerpt: "OpenAI's GPT-5 combined fast chat and extended reasoning in one system; the post covers the reported benchmarks and the routing trade-off."
date: 2025-08-15
permalink: /posts/2025/08/openai-releases-gpt-5/
tags:
  - technology
  - computing-history
  - history
---

OpenAI released GPT-5 on August 7, 2025, available to ChatGPT users across Free, Plus ($20/month), and Pro ($200/month) tiers and via the API. Rather than launching as a separate model requiring users to switch manually from GPT-4o or o3, GPT-5 was positioned as a unified system: it handled conversational and creative tasks with the low latency of earlier models while applying extended reasoning — essentially the o-series chain-of-thought approach — automatically when the system judged a problem hard enough to warrant it.

On SWE-bench Verified, a software engineering coding benchmark, OpenAI reported that GPT-5 resolved 74.9% of real GitHub issues. Visual understanding expanded to include longer video reasoning and structured document analysis. Tool use became more reliable across multi-step agentic tasks, addressing a known failure mode where models would abandon tool loops after unexpected intermediate outputs.

The unified architecture represented a product decision as much as a technical one: OpenAI's prior model lineup (GPT-4o for speed, o1/o3 for reasoning, o4-mini for affordable reasoning) required users to select the right model per task, creating friction and support load. GPT-5 internalized the routing decision, with the system dynamically allocating inference-time compute to the difficulty of each request. The practical trade-off was that simple queries might still invoke the slower reasoning pathway if the routing heuristic misjudged, and pricing remained on a per-token basis that favored heavier extended-reasoning use on the Pro tier.

**Sources:** [Introducing GPT-5 (OpenAI)](https://openai.com/index/introducing-gpt-5/), [GPT-5 System Card (OpenAI)](https://openai.com/index/gpt-5-system-card/)
