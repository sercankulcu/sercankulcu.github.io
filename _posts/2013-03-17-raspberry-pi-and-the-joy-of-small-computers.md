---
title: 'Raspberry Pi And The Joy Of Small Computers'
date: 2013-03-17
permalink: /posts/2013/03/raspberry-pi-and-the-joy-of-small-computers/
tags:
  - raspberry-pi
  - hardware
  - programming
  - education
---

The Raspberry Pi is one year old. It launched in February 2012, and in the time since, about a million boards have been sold — far more than the Raspberry Pi Foundation expected when they planned the initial production run of ten thousand.

The device is a credit-card-sized computer built around a Broadcom BCM2835 system-on-chip. The Model B version has a 700 MHz ARM processor, 512 megabytes of RAM (upgraded from 256MB last October), HDMI and composite video outputs, USB ports, an Ethernet port, and a row of GPIO pins along one edge. It runs from a microSD card. It costs $35.

Those specifications are not impressive by the standards of 2013. What is interesting is why it exists and what people are doing with it.

## Why the Foundation built it

The Raspberry Pi Foundation is a UK charity, and its founders — Eben Upton, Rob Mullins, Jack Lang, and Alan Mycroft, researchers at Cambridge — started the project out of a specific concern. They noticed over several years that undergraduate students arriving at Cambridge to study computer science were increasingly less technically prepared than students had been in the late 1980s and 1990s.

Their hypothesis was that the shift to more controlled, expensive, and closed personal computers had removed something important. In the era of the BBC Micro and early home computers, a motivated teenager could learn machine code, write assembly, and understand how the hardware worked because the machine was simple enough to be comprehensible and cheap enough to experiment with without fear. By the 2000s, computers were powerful and user-friendly in ways that made them genuinely better — and also opaque in ways that made them harder to learn from.

The Raspberry Pi was designed as a partial answer to this. A computer cheap enough that schools could buy them in quantity, or that a student could buy without a significant family investment. A computer running Linux, which rewards curiosity. A computer with a row of GPIO pins for interacting with the physical world.

## Python as a deliberate choice

Python is the primary language on the Raspberry Pi, and this choice reflects the educational mission more than it might seem.

Python is readable enough that a beginner can understand a short program without being fluent in the language. The interactive interpreter — type a line, see the result immediately — lowers the distance between an idea and its execution. The ecosystem includes libraries for almost everything a beginner might want to do: GPIO control, image processing, networking, data.

The Foundation chose Python because the learning path it provides is gentler than C and more transferable than Scratch. Students who progress past introductory Python are well positioned to continue in either direction — toward systems programming, toward web development, toward data science.

## GPIO and why it matters for learning

The GPIO pins — General Purpose Input/Output — are a physical interface on the board's edge. Connect them correctly to external components and you can read a button press, light an LED, read a temperature sensor, drive a small motor, or control a relay.

This matters pedagogically because it makes the computer's output tangible. When a student writes a loop that blinks an LED, the program is not an abstract thing running invisibly inside a machine. It causes a physical change in the world, on a schedule the student controls. The gap between the program and its effect is very short.

This is what makes the Raspberry Pi more than a cheap desktop computer. The GPIO is the part that turns the board from a cost-reduced PC into a learning tool. It is why a teacher can set a student the task of building a temperature logger, and the student has to understand both the software and the electronics to make it work.

## What the first year has shown

The uses people have found are wider than the Foundation expected. The Pi is running as a home media center with Kodi. It is working as a network-attached storage device. It is inside weather stations sending data to the internet. It is a small web server for personal projects. Students have used it for robotics competitions.

The educational use cases are there too, but the Pi has found an audience beyond schools — hobbyists, makers, and developers who want a cheap Linux machine they can leave running and destroy without regret.

That willingness to experiment — to connect strange wires, install something unfamiliar, restart and try again — is itself a form of learning. The $35 price makes it possible in a way that a machine you depend on for daily work cannot be.
