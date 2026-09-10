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
