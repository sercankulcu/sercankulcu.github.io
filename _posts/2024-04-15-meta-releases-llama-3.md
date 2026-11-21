---
title: Meta Releases Llama 3
date: 2024-04-15
permalink: /posts/2024/04/meta-releases-llama-3/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Meta released Llama 3 on April 18, 2024, with 8-billion and 70-billion parameter models in both base and instruction-tuned variants, distributed through Hugging Face, llama.meta.com, and major cloud providers (AWS Bedrock, Google Vertex AI, Azure AI). The 8B and 70B Instruct variants outperformed comparable open-weight models (Mistral 7B, Gemma 7B) on standard benchmarks and approached GPT-3.5 Turbo performance on tasks like MMLU (79.5% for Llama 3 70B vs GPT-3.5's ~70%) and coding. Meta announced that a Llama 3 model exceeding 400 billion parameters was in training.

The Llama 3 architecture used Grouped Query Attention (GQA) for inference efficiency, a context window of 8,192 tokens (unchanged from Llama 2's 4,096 in this release — extended in later variants), and a significantly expanded tokenizer vocabulary of 128,000 tokens (versus Llama 2's 32,000). The larger vocabulary reduced the number of tokens required to represent code, non-English text, and technical content, improving efficiency particularly for coding tasks. Meta trained the 8B model on more than 15 trillion tokens — over seven times Llama 2's 2 trillion tokens — with a filtering pipeline emphasizing data quality: web text was filtered for educational value and diversity, and the 8B model received proportionally more training compute per parameter than the 70B to compensate for its smaller capacity.

The 8B model ran in 16-bit precision on a single consumer GPU with 16 GB VRAM (NVIDIA RTX 4070 or above), and in 4-bit quantized form (via llama.cpp or Ollama) on GPUs with 6–8 GB VRAM or on unified-memory Apple Silicon Macs with 8–16 GB RAM. The 70B model in 4-bit quantization required approximately 40 GB memory, fitting on a dual-GPU workstation or a high-RAM Mac Studio. Meta released the Llama 3 405B on July 23, 2024 — a model competitive with GPT-4o on MMLU and coding benchmarks — extending open-weight model capabilities to the frontier tier. The 405B required a multi-GPU server for inference but was downloadable and modifiable, establishing a precedent that frontier-scale models could be open-weight.
