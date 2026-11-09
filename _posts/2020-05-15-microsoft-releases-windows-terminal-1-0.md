---
title: Microsoft Releases Windows Terminal 1.0
date: 2020-05-15
permalink: /posts/2020/05/microsoft-releases-windows-terminal-1-0/
tags:
  - software
  - programming
  - computing-history
---

Microsoft released Windows Terminal 1.0 in May 2020, roughly a year after its first public preview at Microsoft Build 2019. The application replaced decades-old infrastructure: Command Prompt ran on conhost.exe, a host that dated to Windows NT and had no support for modern text rendering, multiple tabs, or proper Unicode.

Windows Terminal used DirectWrite and DirectX for GPU-accelerated text rendering, supported multiple panes and tabs, handled the full Unicode range including emoji and CJK characters, allowed customizable key bindings, and stored all configuration in a JSON file under the user's roaming profile. It ran PowerShell, Command Prompt, Azure Cloud Shell, and any WSL distribution as separate tab profiles. That same month, WSL2 launched, adding a real Linux kernel running in a lightweight virtual machine inside Windows.

Windows Terminal was open sourced on GitHub from the first preview, giving developers visibility into how Microsoft was building it and allowing contributions. It reflected a larger reorientation: Windows under CEO Satya Nadella was increasingly expected to be a good host for Linux tools, containers, SSH, and cross-platform workflows rather than an environment where every developer tool had to be a native Windows application.

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in software, programming, and computing history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
