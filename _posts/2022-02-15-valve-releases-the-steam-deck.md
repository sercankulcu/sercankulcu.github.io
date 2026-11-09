---
title: Valve Releases the Steam Deck
date: 2022-02-15
permalink: /posts/2022/02/valve-releases-the-steam-deck/
tags:
  - hardware
  - software
  - technology-history
---

Valve began shipping Steam Deck units on February 25, 2022, fulfilling reservations placed starting July 2021 in order of the $5 deposit queue (over 100,000 units were pre-ordered in the first 48 hours). The hardware was built around AMD's “Van Gogh” APU (internally codenamed “Aerith”): a Zen 2 quad-core/8-thread CPU (2.4–3.5 GHz) paired with an RDNA 2 GPU with 8 compute units (1.0–1.6 GHz, 1.6 TFLOPS FP32), 16 GB LPDDR5 RAM in a unified memory architecture, and a 40 Whr battery providing roughly 2–8 hours depending on the game's GPU load. Three models shipped: 64 GB eMMC at $399, 256 GB NVMe PCIe 3.0 at $529, and 512 GB NVMe at $649. The 7-inch 1280×800 IPS display ran at 60 Hz with 400 nits brightness. All models included the same APU and memory — only storage and screen coating differed.

SteamOS 3.0 (Arch Linux base with KDE Plasma desktop) ran in the background behind the game-oriented “Gaming Mode” interface, but users could switch to full KDE desktop to install any Linux application. The critical software layer was Proton — Valve's Wine-based compatibility layer (first released August 2018) — which translated Windows API calls (Win32, DirectX) into Linux equivalents using DXVK (DirectX 9/10/11 to Vulkan via Zink), VKD3D-Proton (DirectX 12 to Vulkan), and esync/fsync for threading. Valve classified each game in the Steam library as “Deck Verified” (fully tested with gamepad, display, and performance), “Playable” (works with minor issues such as small text or required touch input), or “Unsupported.” Easy Anti-Cheat and BattlEye — the two most common anti-cheat systems — both added native Linux/Proton support in 2021 specifically in preparation for the Steam Deck launch, significantly expanding the compatible title list.

The Steam Deck mainstreamed PC gaming handhelds after a decade of niche devices (GPD Win, One XPlayer) that struggled with software compatibility. Valve's shader pre-caching system downloaded pre-compiled Vulkan shaders in the background before a game launched, reducing in-game stutter from on-the-fly shader compilation — a major source of frame time hitches in early Proton games. The device also shipped with a Dock accessory (sold separately, available August 2022) enabling USB-C DisplayPort output, Ethernet, and USB-A ports for desktop-style use. By end of 2022 Valve reported thousands of Deck Verified and Playable titles, and the product's success demonstrated that Steam's 50,000-title Windows game library could serve as a Linux gaming catalog with compatibility software. An OLED model launched in November 2023 with a Samsung 90Hz OLED display and improved battery life.
