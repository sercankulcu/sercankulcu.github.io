---
title: '6TiSCH protocol'
date: 2019-04-22
permalink: /posts/2019/04/six-tisch-protocol/
tags:
  - career
  - software
---

Low-power wireless devices have a difficult problem.

They need reliable communication, but they cannot keep their radios active all the time because energy is limited.

6TiSCH is an approach designed for this kind of network.

The name combines IPv6 with Time-Slotted Channel Hopping, or TSCH.

TSCH comes from the IEEE 802.15.4e family of low-power wireless networking techniques. Time is divided into slots, and devices communicate according to a schedule.

This reduces collisions and allows radios to sleep when they are not needed.

Channel hopping adds another advantage. Instead of always using the same radio channel, communication can move across channels over time.

This can improve reliability in environments where interference changes.

6TiSCH brings IP networking into this structure.

IPv6 allows low-power devices to participate in Internet-style networks, while mechanisms such as 6LoWPAN help adapt IPv6 to constrained links.

Routing can be handled with protocols designed for low-power and lossy networks, such as RPL.

The interesting part is that reliability, energy use, scheduling, and routing all influence one another.

A schedule that saves energy may reduce capacity.

A schedule with too many active cells may waste power.

Industrial and Internet-of-Things applications often care about predictable communication, so this trade-off matters.

I like 6TiSCH because it shows that networking is not only about sending packets from one address to another.

The physical limits of the device shape the entire protocol design.

A tiny battery can influence decisions all the way up the network stack.
