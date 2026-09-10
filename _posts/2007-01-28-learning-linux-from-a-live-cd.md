---
title: 'Learning Linux From A Live CD'
date: 2007-01-28
permalink: /posts/2007/01/learning-linux-from-a-live-cd/
tags:
  - linux
  - software
  - learning
---

Trying another operating system used to feel like a significant commitment. Installing it meant repartitioning a drive, potentially overwriting the existing system, configuring a bootloader, and accepting some risk that something would go wrong. For a curious user, the barrier was technical and emotional at once.

Live CDs remove that barrier entirely.

## What a live CD is

Klaus Knopper developed Knoppix in 2000 as a Debian-based Linux distribution that could boot directly from a CD without installation. The entire operating system runs from the CD, loading components into RAM as needed. The hard drive is not touched. When the computer restarts without the CD, it boots normally into whatever was already installed.

Ubuntu 6.06 LTS "Dapper Drake" — the current long-term support version as of January 2007 — ships as both a live CD and an installer. Booting from the Ubuntu CD gives you a GNOME desktop, a web browser (Firefox), an office suite (OpenOffice.org), media players, and access to the terminal — a working environment for an afternoon of exploration.

## What you learn from an afternoon of exploration

Linux in 2007 looks visibly different from Windows. The filesystem hierarchy uses `/home`, `/etc`, `/usr`, `/var` rather than drive letters. Applications are installed through a package manager (`apt-get` on Ubuntu) rather than downloaded and run as individual installers. Many configuration files are plain text stored in `/etc`, editable with a text editor.

Small differences prompt useful questions: why does this work differently? Why does Unix keep configuration in text files? Why is there no registry? These are questions about design decisions that have decades of history. Encountering them through a working system is a different kind of learning than reading about them.

The live environment also demonstrates something about abstraction. The same physical hardware — keyboard, processor, memory, disk — produces an entirely different experience depending on which software starts first. This makes the operating system feel like a choice rather than an inherent property of the machine, which is a useful mental model for anyone who works with computers professionally.

## The practical limitations

Running from a CD is slower than a proper installation. The CD drive is much slower than a hard drive, and reading even simple operations requires mechanical movement. Ubuntu has extended the live CD with a casper-rw file for persistence on USB drives, but by default, anything you change disappears at restart.

Wireless networking is the most common source of frustration. Many wireless cards in 2007 — Broadcom cards especially — require non-free firmware that Ubuntu does not include by default. Getting wireless working may require finding the firmware name, installing it through a terminal, and reloading the driver module. This is exactly the kind of problem that sends new Linux users to forums, and it is also the kind of problem that teaches you something about how drivers and firmware work.

When you are not in a hurry, this kind of problem becomes educational. A small hardware compatibility issue leads to reading about kernel modules, firmware, and device drivers — subjects that a working out-of-box experience would never require engaging with.

A live CD makes the first step low-stakes. Curiosity does not require a permanent decision. Sometimes the safest way to learn something unfamiliar is to make the first step reversible, and the live CD is precisely that: a complete operating environment that leaves no trace when you are done with it.
