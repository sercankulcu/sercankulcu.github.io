---
title: Meta Releases a New Llama Generation
date: 2025-04-15
permalink: /posts/2025/04/meta-releases-a-new-llama-generation/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Meta released Llama 4 Scout and Maverick in April 2025, moving the Llama family to mixture-of-experts designs. In an MoE model, only a subset of specialized parameter groups is activated for each token.

That structure allows the model to contain a very large total parameter count without paying the full compute cost on every forward pass. Scout was also designed for extremely long context, while Maverick targeted stronger general capability.

The release showed how open-weight model development was adopting architectural techniques previously associated with large proprietary systems. It also made serving more complicated: efficiently routing tokens through experts and distributing those experts across GPUs requires careful memory and communication design.
