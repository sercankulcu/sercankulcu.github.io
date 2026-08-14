---
title: Google Reveals Imagen
date: 2022-05-15
permalink: /posts/2022/05/google-reveals-imagen/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Google Research revealed Imagen in May 2022, a text-to-image diffusion model that produced unusually detailed images from natural-language prompts. Imagen combined a large pretrained text encoder with a cascade of diffusion models that progressively generated and upscaled images.

Diffusion models learn to reverse a process that gradually adds noise to data. During generation, the model starts from noise and repeatedly predicts how to remove it while conditioning the process on a text representation. Imagen used the language understanding of a large text model to improve alignment between prompts and images.

Google did not release Imagen publicly at the time, partly because of concerns about harmful content and biases in training data. The work appeared just before public systems such as Stable Diffusion made text-to-image generation widely accessible.
