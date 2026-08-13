---
title: 'Software Bug Of Pathfinder'
date: 2020-05-22
permalink: /posts/2020/05/software-bug-of-pathfinder/
tags:
  - self-improvement
---

Mars Pathfinder landed successfully on Mars on July 4, 1997. Soon after, however, the spacecraft began experiencing unexpected system resets.

The problem became a famous software-engineering story because the cause was not a damaged sensor or broken hardware. It involved task scheduling in the VxWorks real-time operating system.

Pathfinder used several concurrent tasks with different priorities. Under certain conditions, a lower-priority task could hold a resource needed by a high-priority task. A medium-priority task could then run and delay the lower-priority task.

The high-priority task was left waiting. This situation is known as priority inversion. A watchdog timer eventually decided that the system was not responding correctly and forced a reset.

The important detail is that VxWorks already supported priority inheritance, a technique designed to reduce this problem. The mechanism had not been enabled for the relevant synchronization object.

Once engineers understood the cause, they were able to change the configuration remotely and stop the resets. I like this incident because the final repair sounds small compared with the difficulty of finding it. That is common in software. A one-line or one-setting fix may represent days of reasoning.

The Pathfinder story also shows why real-time systems need more than code that works in ordinary conditions. Timing, scheduling, resource sharing, and rare sequences of events can become part of correctness.

The spacecraft survived the problem. That was fortunate. The lesson survived too: concurrency bugs can hide inside systems that appear perfectly healthy until the timing is just wrong.
