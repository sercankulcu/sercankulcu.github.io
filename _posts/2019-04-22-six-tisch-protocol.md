---
title: '6TiSCH Protocol'
date: 2019-04-22
permalink: /posts/2019/04/six-tisch-protocol/
tags:
  - career
  - software
---

Low-power wireless devices face a fundamental tension. They need reliable communication, but their batteries may need to last months or years in places where replacing them is difficult or expensive. Keeping a radio active continuously is not an option. 6TiSCH is a protocol architecture designed to resolve this tension — allowing constrained devices to participate in Internet-style networks while managing energy carefully.

## What the name means

6TiSCH combines IPv6 with TSCH, which stands for Time-Slotted Channel Hopping. Both parts matter.

**TSCH** comes from the IEEE 802.15.4e amendment to the low-power wireless standard. Instead of letting devices transmit whenever they want and handle collisions as they occur, TSCH divides time into fixed slots and assigns communication according to a shared schedule. A device knows in advance exactly when it needs to transmit or receive. Between those moments, it can turn off its radio entirely.

**Channel hopping** is layered on top of the schedule. Instead of using the same radio frequency for every transmission, the schedule specifies which channel to use at each slot. If one channel experiences interference at a given moment, the next transmission may use a different one. This improves reliability in industrial environments where frequency-selective interference is common.

## The protocol stack

6TiSCH defines how multiple protocol layers work together:

- **IEEE 802.15.4e (TSCH)** — the radio and MAC layer, handling slot timing and channel selection
- **6LoWPAN** — compression and adaptation layer that makes IPv6 headers fit within the small frames that 802.15.4 allows (typically 127 bytes)
- **IPv6** — full Internet addressing, so each device has an IP address and can be reached from outside the network
- **RPL** — a routing protocol designed for low-power and lossy networks, which forms routing topologies suited to sensor-style deployments

This stack allows a small sensor with a coin-cell battery to be addressed directly over IP, something that was much harder to achieve cleanly before 6TiSCH.

## A practical scenario

Consider a factory floor in 2019, where dozens of sensors monitor machine temperature, vibration, and power draw. The sensors cannot be wired easily because machinery moves or the installation cost is too high. They run on batteries. They need to report readings reliably and with predictable latency, because an alarm about an overheating motor cannot wait.

With 6TiSCH, each sensor is assigned slots in the schedule. A sensor might be active for only a few milliseconds per second, spending the rest of its time in a low-power sleep state. The channel hopping makes communication resilient to interference from other wireless equipment on the factory floor. RPL organizes the sensors into a routing topology that reaches a gateway connected to the wider network.

The result is a network that looks like the Internet — IP addresses, standard protocols — but runs efficiently on hardware that would die in days if the radio never slept.

## The trade-offs are real

6TiSCH requires devices to maintain synchronized time. If clocks drift, devices may miss their transmission slots. Maintaining time synchronization across a large network consumes some of the energy it was designed to save.

Schedule design is also non-trivial. A schedule with too few active slots conserves energy but limits throughput and increases latency. A schedule with too many active slots wastes the energy saved by sleeping. Finding the right balance depends on application requirements, network topology, and traffic patterns.

What I find compelling about 6TiSCH is that it shows how tightly coupled the protocol layers can become when resources are constrained. The energy budget of a small battery influences decisions about timing, channel selection, addressing, and routing. A problem at the physical layer propagates all the way up the stack — and the design of the whole architecture has to account for it.
