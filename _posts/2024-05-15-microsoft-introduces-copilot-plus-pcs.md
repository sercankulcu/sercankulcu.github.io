---
title: Microsoft Introduces Copilot Plus PCs
date: 2024-05-15
permalink: /posts/2024/05/microsoft-introduces-copilot-plus-pcs/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Microsoft announced Copilot+ PCs on May 20, 2024, defining a hardware category requiring a minimum 40 TOPS (tera-operations per second) NPU (Neural Processing Unit) — more than any existing Windows laptop NPU at the time. The first wave of Copilot+ PCs launched June 18, 2024, using Qualcomm's Snapdragon X Elite and Snapdragon X Plus processors, which contained an Oryon CPU (derived from Nuvia's acquisition), an Adreno GPU, and a Hexagon NPU rated at 45 TOPS. Devices from Surface, Samsung, Dell, HP, ASUS, Lenovo, and Acer launched simultaneously, priced from $999. Intel and AMD Copilot+ PC laptops (using Intel Lunar Lake and AMD Strix Point with their respective 47–50 TOPS NPUs) followed in fall 2024.

Recall was the headline Copilot+ PC feature: it captured snapshots of the screen every few seconds, ran OCR and semantic indexing on the images using the NPU, and stored a searchable timeline of everything the user had done — websites visited, documents read, conversations had in apps — accessible through natural-language search ("find the email about the Seattle project from two weeks ago"). Microsoft demonstrated Recall as showing what computing with a photographic memory felt like. Security researchers and privacy advocates immediately raised concerns: the database was stored unencrypted on disk, accessible to any process with local user permissions, meaning malware could exfiltrate the entire history of a user's on-screen activity. Microsoft postponed Recall's launch to a later Windows Insider preview (July 2024), moved it behind Windows Hello biometric authentication, encrypted the database, and added opt-out by default before eventually shipping it more broadly in late 2024.

Copilot+ also included Live Captions with real-time translation (converting speech in any language to English text using the NPU without sending audio to a server), AI image generation in Paint (Cocreator), and Super Resolution for video upscaling. The category marked a reversal for Arm-based Windows: Windows RT (2012) had failed commercially because it could not run x86 applications; Snapdragon X Elite with Prism, a new x64 emulation layer, ran most existing Windows applications at competitive performance, addressing the core failure mode that had doomed the earlier Arm attempt.

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in artificial-intelligence, software, computing-history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
