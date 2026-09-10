---
title: 'Raspberry Pi 3 And The Small Computer That Keeps Growing'
date: 2016-03-20
permalink: /posts/2016/03/raspberry-pi-3-and-the-small-computer-that-keeps-growing/
tags:
  - raspberry-pi
  - hardware
  - education
---

The Raspberry Pi 3 launched last month, and the specifications represent a meaningful jump from the Pi 2 — but the change I find most interesting is not the processor.

## What is new in the Pi 3

The Pi 3 uses a Broadcom BCM2837, a 64-bit quad-core ARM Cortex-A53 running at 1.2 GHz. The Pi 2 ran at 900 MHz, so this is roughly a 33% clock speed increase, plus the 64-bit architecture. In practice this means the Pi 3 can run 64-bit operating systems, though the official Raspbian image is still 32-bit for now because 64-bit Linux distributions for ARM are less mature.

RAM stays at 1 GB, which the Pi 2 also had. The USB and HDMI ports are unchanged. The GPIO header has the same 40-pin layout as the Pi 2, so boards and accessories designed for the Pi 2 work on the Pi 3 without modification.

The additions that change how the board is used are **802.11n Wi-Fi** and **Bluetooth 4.1**, both built directly into the board. These did not exist on the Pi 2. To add Wi-Fi to a Pi 2, you plugged in a USB dongle. This worked, but it used one of the two USB ports and required finding a compatible dongle.

## Why built-in Wi-Fi changes the use cases

The practical difference is significant. A Pi 3 can connect to a wireless network during initial setup, before any additional hardware is attached. It can be placed somewhere useful — a shelf, inside a project enclosure, mounted behind a screen — without needing to be near an Ethernet cable. Headless setups, where the Pi runs without a monitor and is accessed via SSH, become much simpler when you do not need a wired connection.

This matters most for the applications where the Pi 3 is genuinely good: home automation sensors, a small always-on server, a media player mounted behind a television, a network-attached storage device, a print server. These use cases benefit from being placed wherever makes sense physically, not wherever an Ethernet port happens to be.

The Bluetooth addition opens a different set of connections — wireless keyboards, game controllers, sensors that communicate over Bluetooth Low Energy, and integration with the growing ecosystem of Bluetooth IoT devices.

## Performance for real workloads

The Pi 3 is fast enough to run a desktop Linux environment comfortably for light tasks — web browsing with a few tabs, writing documents, running a terminal. Chromium runs reasonably on it. For a student who needs a machine to learn programming and does not have access to a better computer, the Pi 3 is genuinely usable for daily study, not just as a toy.

For server workloads — running a lightweight web server, a database, a home automation system, a file server — the performance is adequate. The bottleneck on those workloads is typically memory or I/O rather than raw CPU speed, and the Pi 3 is comparable to Pi 2 in those areas.

For computationally demanding tasks — video encoding, compiling large codebases, running machine learning inference — the Pi 3 is slow. It is not the right tool for those jobs, and the 64-bit capability does not change that meaningfully in practice.

## The GPIO still matters

The built-in Wi-Fi makes it easy to forget that the row of 40 pins along the board's edge is still there. GPIO is what distinguishes the Pi from a cheap Android mini-PC or a discarded thin client. The Pi 3 can control a servo, read a humidity sensor, drive an I2C display, manage a relay, or interface with a wide range of electronics components.

This connection to the physical world is the feature that makes the Pi useful for education in a way that a general-purpose cheap computer is not. When a student's Python program causes a fan to turn on because a temperature sensor exceeded a threshold, the software is no longer abstract. The Pi 3 keeps this, and the improved performance and wireless make it easier to build projects where the board is embedded in something rather than sitting on a desk.

The Foundation has now sold more than eight million boards since the original Pi launched in 2012. The Pi 3 continues a pattern that has been consistent since the beginning: meaningfully more capable with each generation, while keeping the price and the fundamental character of the device the same.
