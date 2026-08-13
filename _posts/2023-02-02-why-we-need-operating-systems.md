---
title: 'Why We Need Operating Systems?'
date: 2023-02-02
permalink: /posts/2023/02/why-we-need-operating-systems/
tags:
  - operating-systems
  - computer-science
  - software
---

A computer without an operating system would still be a computer. It would also be much harder to use.

Early computers required operators to load programs manually and manage hardware very directly. As systems became more complex, this approach became inefficient.

Operating systems appeared to manage the machine on behalf of programs and users. At the simplest level, an operating system manages resources. The CPU can run only a limited number of instructions at a time, so the operating system schedules processes and threads. Memory is limited, so the operating system decides how it is allocated and protected. Storage needs files and directories.

Devices need drivers. Programs need controlled ways to communicate with hardware. The operating system creates these abstractions. A program can open a file without knowing the physical details of the disk. It can create a process without manually configuring the processor.

It can use a network socket without controlling every electrical signal. This abstraction is one of the reasons modern software is possible. Security is another important role. The operating system separates users and processes, controls permissions, and prevents ordinary applications from freely accessing everything on the machine. Modern systems such as Linux, Windows, macOS, Android, and iOS make different design choices, but the basic responsibilities are similar.

I like teaching operating systems because they reveal what happens under the comfortable surface of a computer. A window opens. A program runs. A file is saved. Behind these simple actions, the operating system is constantly making decisions.
