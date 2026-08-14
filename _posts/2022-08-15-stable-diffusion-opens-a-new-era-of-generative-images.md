---
title: Stable Diffusion Opens a New Era of Generative Images
date: 2022-08-15
permalink: /posts/2022/08/stable-diffusion-opens-a-new-era-of-generative-images/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Stable Diffusion was released publicly in August 2022 and changed text-to-image generation by making model weights available for people to run on their own hardware.

Instead of performing diffusion directly over full-resolution pixels, Stable Diffusion worked in a compressed latent space produced by an autoencoder. This greatly reduced computation. A text encoder represented the prompt, and a U-Net repeatedly denoised the latent representation before the decoder converted it back into an image.

Because the model could run on high-end consumer GPUs, developers quickly built interfaces, plug-ins, fine-tuning methods, and specialized models around it. The open weights also intensified debates about training data, artist consent, deepfakes, and the legal status of generated images.
