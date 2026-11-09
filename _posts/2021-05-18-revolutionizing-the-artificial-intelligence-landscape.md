---
title: 'Revolutionizing The Artificial Intelligence Landscape'
date: 2021-05-18
permalink: /posts/2021/05/revolutionizing-the-artificial-intelligence-landscape/
tags:
  - self-improvement
  - career
---

Artificial intelligence in 2021 is surrounded by excitement that sometimes makes it difficult to see clearly. The same conversation that includes genuine technical milestones also includes cryptocurrency speculation, NFT marketplaces, and metaverse announcements. The noise makes it harder to identify what is real and durable.

I think several recent developments in AI deserve serious attention precisely because they are already changing specific fields in verifiable ways — not as promises, but as accomplished results.

## AlphaFold and what it demonstrates

The most significant AI development of the past year may not be the one that received the most public attention. In November 2020, DeepMind published AlphaFold 2, a system that predicts the three-dimensional structure of proteins from their amino acid sequences with accuracy comparable to experimental methods.

Protein structure determines function. Understanding how a protein folds has implications for drug discovery, disease research, and our understanding of biology at the molecular level. For fifty years, predicting protein structure was considered one of the hardest open problems in computational biology. AlphaFold did not partially improve on existing methods — it largely solved the problem.

This matters beyond the specific application. AlphaFold demonstrates something important about where deep learning is effective: problems with vast amounts of training data (protein sequences and known structures), a clear and measurable evaluation criterion, and high-dimensional pattern recognition that is too complex for human-designed rules. It did not require that the model "understand" biology. It required that the model learn to recognize structural patterns in data at a scale humans cannot process.

## GPT-3 and the language question

OpenAI released GPT-3 in mid-2020, and its capabilities with text — writing, summarization, translation, question answering, and even simple coding — were far beyond previous language models. In 2021, applications built on GPT-3 are appearing in writing assistance, customer support, search, and content generation.

GPT-3 also illustrates the limitations clearly. The model produces text that sounds confident and plausible. It does not distinguish between what it knows and what it is confabulating. Asked a factual question, it may produce a false answer in a tone indistinguishable from a correct one. The system has no model of the world — it has learned statistical patterns over text and generates outputs that are consistent with those patterns.

This is not a minor limitation. It is a fundamental characteristic of how these models work. The applications that handle this limitation well constrain the model to domains where generated text can be verified or where plausibility is sufficient. Applications that ignore this limitation can cause real harm.

## The transformer architecture as infrastructure

Both AlphaFold and GPT-3 are built on the transformer architecture, introduced in the 2017 paper "Attention Is All You Need." The transformer's attention mechanism — which allows the model to weigh the relevance of different parts of an input when producing each part of the output — has proved applicable to sequences of almost any kind: text, protein sequences, images, audio, code.

In 2021, nearly every state-of-the-art result in natural language processing, and an increasing number of results in other domains, uses transformer-based models. This convergence toward a common architecture is unusual in the history of machine learning. It suggests that the research community has found an approach that generalizes across problems in a way that previous approaches did not.

## What the caution looks like in practice

At the same time, some important caveats:

**Benchmark performance does not equal real-world reliability.** A model that achieves high accuracy on a standard dataset may perform poorly on inputs from a slightly different distribution — different vocabulary, different formatting, different domain. The gap between benchmark and deployment is often larger than papers describe.

**Scale has costs.** Large language models require enormous amounts of compute and energy to train. GPT-3 has 175 billion parameters. The resources required to train and run these models are available to a small number of organizations, which raises questions about concentration of capability.

**Bias in, bias out.** A model trained on data that reflects historical inequalities will reflect those inequalities in its outputs. This is not a solvable problem in the same sense that a bug in code can be fixed — it is a consequence of what the model learned from.

The useful question in 2021 is not whether AI is revolutionary in general. It is specific: for which problems does this approach work, and for which problems does it fail? AlphaFold answers that question clearly for protein folding. The answers for language, vision, and other domains are more qualified — impressive in many settings, unreliable in specific ways that matter. The work of the next years is making those qualifications more precise.
