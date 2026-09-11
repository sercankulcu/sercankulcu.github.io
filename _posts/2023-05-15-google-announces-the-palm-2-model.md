---
title: Google Announces the PaLM 2 Model
date: 2023-05-15
permalink: /posts/2023/05/google-announces-the-palm-2-model/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Google announced PaLM 2 at Google I/O on May 10, 2023, as the successor to PaLM (Pathways Language Model, April 2022, 540 billion parameters). PaLM 2 was offered in four sizes — Gecko (deployable on mobile devices), Otter, Bison, and Unicorn (the largest, with parameter count undisclosed) — allowing Google to serve the same model family from on-device inference to large cloud deployments. Google's technical report described PaLM 2 as trained on a significantly broader multilingual corpus (100+ languages and programming content spanning 20+ programming languages) than PaLM, with a smaller model-to-data ratio (a "chinchilla-optimal" approach, citing Hoffmann et al. 2022's finding that smaller models trained on more data outperform larger models on less data at the same compute budget).

PaLM 2 scored 86.8% on the 5-shot MMLU benchmark (Massive Multitask Language Understanding, 57 academic subjects), comparable to GPT-4's 86.4% at the time of announcement. Medical domain fine-tuning (Med-PaLM 2) scored above 85% on the US Medical Licensing Exam, surpassing the passing threshold for the first time for any AI system. Google also released Codey (PaLM 2 fine-tuned on code) powering AI coding completions in Google's IDX cloud IDE and Google Duet AI for Workspace, and Sec-PaLM (security domain fine-tune) for analyzing shell code, threat intelligence, and vulnerability descriptions. Bard (Google's conversational AI, launched February 2023 on LaMDA then upgraded to PaLM in April 2023) upgraded to PaLM 2 Bison on May 10.

The announcement came two months after GPT-4's release (March 14, 2023) — the most direct AI competitive timeline since Google and OpenAI had been racing to deploy capable models since ChatGPT's November 2022 launch. Google announced PaLM 2 availability through the PaLM API (formerly Generative Language API in preview), Vertex AI (Google's enterprise ML platform), and integration into Workspace (Gmail smart compose, Google Docs writing assistance, Google Sheets formula suggestions). PaLM 2 served as the production model for Bard and Workspace AI through November 2023, when Gemini's December 2023 announcement began the transition to the Gemini model family — with Bard rebranded as Gemini in February 2024.

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in artificial-intelligence, software, computing-history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
