---
title: 'Why Do Computers Use 1s And 0s?'
date: 2023-02-03
permalink: /posts/2023/02/why-do-computers-use-1s-and-0s/
tags:
  - computer-science
  - hardware
  - binary
---

People often ask why computers use 1s and 0s when we normally count with ten digits. The answer starts with the hardware — but the real reason runs deeper than transistors.

## The hardware reason: reliability

A transistor can behave like a tiny switch. Apply enough voltage and it conducts; reduce the voltage and it stops. In a simplified model, "conducting" represents 1 and "not conducting" represents 0.

Why two states instead of, say, ten — one for each of our digits? Because distinguishing two states reliably is far easier than distinguishing ten. Imagine representing the digit 7 as 0.7 volts, and 8 as 0.8 volts. A tiny fluctuation in temperature, manufacturing variation, or electrical noise could make 0.76 volts ambiguous — is it 7 or 8? 

With binary, you define two broad ranges: anything below some threshold is 0, anything above is 1. A signal would have to drift significantly before becoming ambiguous. This is why digital circuits are robust enough to pack billions of transistors into a chip and still operate reliably for years.

## Binary as a number system

Binary is a number system that uses only two digits (0 and 1) instead of the ten we are used to. The same positional logic applies:

| Decimal | Binary |
|---|---|
| 0 | 0 |
| 1 | 1 |
| 2 | 10 |
| 5 | 101 |
| 10 | 1010 |
| 255 | 11111111 |

In our usual (decimal) system, each position is a power of ten. In binary, each position is a power of two. The number 101 in binary means (1 × 4) + (0 × 2) + (1 × 1) = 5.

Eight bits grouped together form a **byte**, which can represent 256 different values (0 through 255).

## How everything else becomes bits

Numbers are the easy part. The interesting question is how text, images, audio, and programs are all stored as the same kind of binary data.

**Text:** Each character is assigned a number. In ASCII, the letter A is 65, B is 66, a space is 32. The string "Hello" becomes: 72, 101, 108, 108, 111 — stored as five bytes. Unicode extended this to cover virtually every writing system in the world.

**Images:** A pixel's color can be described by three numbers — one each for red, green, and blue — each from 0 to 255. A 1920×1080 image has about two million pixels, each requiring three bytes. That is about six megabytes for an uncompressed photograph.

**Sound:** A microphone converts sound into a continuous electrical signal. That signal is sampled at regular intervals — typically 44,100 times per second for audio CD quality — and each sample is stored as a number. The sequence of numbers, when converted back to a signal and played through a speaker, reconstructs the original sound.

**Programs:** Instructions to a processor are also encoded as numbers. The binary sequence `10110000 01100001` means something specific to an x86 processor (it moves the value 97 into a register). Compilers translate the code humans write into these numeric instruction codes.

## Logic gates and why they matter

The arithmetic operations computers perform are built from simple logical gates: AND, OR, NOT, XOR. An AND gate outputs 1 only when both inputs are 1. A NOT gate flips 0 to 1 and 1 to 0.

By combining these gates, engineers build adders — circuits that add two binary numbers. By combining adders and memory elements, they build processors capable of arithmetic, comparisons, and branching. The entire power of a modern CPU is built from these simple two-state operations, repeated at billions of cycles per second.

## What this means

A photograph, a piece of music, a word processing document, a video game, a running web browser — all of these exist in the computer as sequences of numbers stored in binary. The hardware never knows the difference between an image and a program. It processes binary data according to instructions that are themselves binary data.

Complexity grows from combinations of simple things, repeated at enormous speed. That is the principle behind digital computing. The screen full of colors and movement is ultimately the result of billions of very small decisions between two states.
