---
title: Apple Announces Apple Intelligence
date: 2024-06-15
permalink: /posts/2024/06/apple-announces-apple-intelligence/
tags:
  - hardware
  - computing
  - history
---

Apple announced Apple Intelligence at WWDC on June 10, 2024, as a set of generative AI capabilities built into iOS 18, iPadOS 18, and macOS Sequoia. Initial features included Writing Tools (rewrite, proofread, and summarize text in any app), Image Playground (generating images from text prompts in three styles), Genmoji (custom emoji generated from descriptions), a redesigned Siri with conversational context and screen awareness, and a summarized notification inbox using on-device language models. Apple Intelligence launched in beta with iOS 18.1 in October 2024, initially for US English only, with language expansion planned through 2025.

Apple's architecture routed requests through three layers: an on-device language model (approximately 3 billion parameters, running on the Neural Engine) handled the majority of tasks; a Private Cloud Compute tier — Apple silicon servers (M2 Ultra) running a larger model in a hardware-verified secure enclave — handled tasks requiring more capability than the on-device model, with Apple claiming the servers were architecturally incapable of retaining user data; and an optional ChatGPT integration (via OpenAI's API) for user-initiated requests where the user explicitly consented to sending data to OpenAI. The choice of routing level was transparent to users, with a privacy indicator showing when a request left the device.

Apple Intelligence required an iPhone 15 Pro or iPhone 15 Pro Max (A17 Pro chip) at launch, then extended to iPhone 16 and all iPad and Mac models with Apple silicon as updates arrived. The A17 Pro requirement — excluding the standard iPhone 15 (A16) — meant Apple Intelligence was hardware-gated by Neural Engine performance, effectively making it a premium feature initially. The EU launch was delayed until April 2025 due to regulatory uncertainty under the Digital Markets Act; Apple cited interoperability obligations as complicating the private cloud compute architecture's legal status in the EU.
