---
title: Google Reveals Imagen
date: 2022-05-15
permalink: /posts/2022/05/google-reveals-imagen/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Google Research published the Imagen paper on May 23, 2022, alongside a website showing examples — but without releasing the model or a public API. Imagen combined a frozen 4.6-billion-parameter T5-XXL text encoder (the same language model used for NLP tasks) with a pipeline of three cascaded diffusion models: a base model generating 64×64 images from text, then two super-resolution diffusion models upscaling to 256×256 and 1024×1024. The T5-XXL encoder had been trained on text only, not image-text pairs, and Google's finding was that using a large language model's text representations as conditioning signals produced better text-image alignment than training a custom CLIP-style encoder specifically for image generation — suggesting that language understanding, not vision-specific training, drove Imagen's prompt adherence.

On the DrawBench benchmark (a set of 200 prompts designed to test difficult compositional, counterfactual, and spatial relationships), Imagen outscored DALL-E 2 (OpenAI, April 2022) and DALL-E 1 in human preference evaluations. On COCO (Common Objects in Context) with an FID score of 7.27, Imagen was competitive with state-of-the-art models. The researchers also noted that Imagen showed signs of social bias — encoding stereotyped gender and racial associations in professions and activities — inherited from both the T5 training data and the image-text pairs in the LAION-400M dataset used for the diffusion models.

Stable Diffusion, released August 22, 2022 by Stability AI using LAION-5B training data and a Latent Diffusion Model architecture from the CompVis lab, made high-quality image generation publicly available as open-source weights that anyone could run locally. OpenAI launched DALL-E 2 publicly (after a waitlist) in September 2022. Google launched Imagen as part of Vertex AI in October 2022 for enterprise customers and incorporated it into consumer products (Bard, Google Photos Magic Editor) through 2023. The diffusion-model generation of text-to-image tools, spanning roughly six months from April to October 2022, transformed image generation from a research topic to a widely available creative tool.
