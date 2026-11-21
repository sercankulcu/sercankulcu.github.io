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
