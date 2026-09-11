---
title: Raspberry Pi Hardware Design Nears Production
date: 2011-11-15
permalink: /posts/2011/11/raspberry-pi-hardware-design-nears-production/
tags:
  - technology
  - computing-history
  - history
---

By November 2011, the Raspberry Pi Foundation — founded by Eben Upton, Rob Mullins, Jack Lang, and Alan Mycroft at the University of Cambridge — had finalized the hardware design of the Raspberry Pi Model B and contracted manufacturing. The project had grown from a 2006 idea about a cheap programmable computer to teach Python to children. The final spec: Broadcom BCM2835 SoC (ARM11 core at 700 MHz plus VideoCore IV GPU capable of 1080p H.264 decode), 256MB of LPDDR2 RAM, HDMI output, composite video, 3.5mm audio, two USB 2.0 ports, 100Mbps Ethernet, SD card for storage, and a 26-pin GPIO header — all for a target retail price of $35 (Model B) or $25 (Model A, without Ethernet, one USB port).

The Broadcom BCM2835 was specifically chosen because Upton had connections at Broadcom (he later became a Broadcom employee) and could negotiate a price well below standard chip distributor pricing. The chip's VideoCore IV GPU was Broadcom's mobile multimedia processor, capable of playing 1080p H.264 video at 30fps — initially the most impressive capability of the hardware, since the ARM11 CPU was far slower than contemporary smartphones but sufficient for Python, Scratch, and Linux desktop use. Manufacturing was contracted to a Welsh electronics factory (Sony's Pencoed plant) after initial manufacturing quotes from the Far East proved compatible with the price target.

The Raspberry Pi Model B launched on February 29, 2012 — demand crashed the foundation's website within hours and sold out the initial batch of 10,000 units on RS Components and element14/Newark within minutes. 600,000 units were ordered in the first year. The 26-pin GPIO header became the defining feature for the maker and IoT communities: Python libraries like RPi.GPIO and later GPIO Zero allowed a 10-year-old to blink an LED with five lines of code, while professional engineers used the same interface to prototype industrial sensors, robotics, and home automation. Over 50 million Raspberry Pi boards had been sold by 2022.

## Why This Moment Mattered

The topic is useful because it captures a broader shift in how people build, use, and understand technology. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in technology, computing-history, history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
