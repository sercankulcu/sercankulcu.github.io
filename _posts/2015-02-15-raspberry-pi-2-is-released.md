---
title: Raspberry Pi 2 Is Released
date: 2015-02-15
permalink: /posts/2015/02/raspberry-pi-2-is-released/
tags:
  - technology
  - computing-history
  - history
---

The Raspberry Pi 2 Model B was released on February 2, 2015 at the same $35 price as the Pi 1 Model B+, replacing the BCM2835 SoC (single ARM11 core at 700 MHz) with the BCM2836 (quad-core ARM Cortex-A7 at 900 MHz). The Cortex-A7 delivered approximately 6× the raw compute performance of the ARM11 in multithreaded workloads, and the upgrade to 1 GB LPDDR2 RAM (from 512 MB) made concurrent processes, browser tabs, and compiled code workloads materially faster. Microsoft announced Windows 10 IoT Core support for the Pi 2 the same day as the hardware release — the first Raspberry Pi to support any version of Windows, enabled by the ARMv7-A instruction set that Windows requires (the Pi 1's ARMv6 was incompatible with Windows Phone and Windows RT binary distributions).

The ARMv7 instruction set change was the more consequential architectural difference from Pi 1. The Pi 1's ARMv6 core required separately compiled binaries and excluded the Pi from the standard "armhf" (hard float) binary repositories that Debian, Ubuntu, and Fedora distributed — Pi 1 users had to use Raspbian, a custom Debian fork with ARMv6-compatible compilation. Pi 2's ARMv7 support meant standard Debian armhf, Ubuntu MATE, Fedora ARM, and Arch Linux ARM all ran natively without modification. The GPIO header (26 pins on Pi 1, expanded to 40 pins since Pi 1 Model B+) remained physically and electrically compatible, preserving the hardware accessory ecosystem of add-on boards, HATs, sensors, and electronics projects built around the standard 40-pin layout.

By February 2015, the Raspberry Pi Foundation had sold approximately 4 million Pi 1 boards. The Pi 2 extended the platform to more demanding workloads: the Chromium browser ran at interactive speed, OpenCV-based computer vision was tractable for teaching, and lightweight server workloads (Node.js APIs, Python Flask, SQLite-backed web apps) ran without the constant process-swapping that made Pi 1 feel sluggish under load. A later Pi 2 v1.2 revision (October 2016) swapped the BCM2836 for the BCM2837 (ARM Cortex-A53, the same chip used in the Raspberry Pi 3), unifying the silicon platform ahead of the Pi 3's February 2016 launch.

## Why This Moment Mattered

The event is useful to read as a platform signal, not only as a product announcement. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in technology, computing-history, history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
