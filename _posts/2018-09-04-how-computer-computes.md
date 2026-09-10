---
title: 'How Computer Computes?'
date: 2018-09-04
permalink: /posts/2018/09/how-computer-computes/
tags:
  - career
  - self-improvement
---

A computer looks complicated from the outside, but its basic operation can be described with a simple cycle repeated billions of times per second. Understanding that cycle helps explain why software behaves the way it does — why some operations are fast, others slow, and what actually happens when code runs.

## The fetch-decode-execute cycle

At the center of computation is the CPU. A program is stored as a sequence of instructions in memory. The CPU repeatedly does three things:

1. **Fetch** — read the next instruction from memory
2. **Decode** — determine what the instruction means
3. **Execute** — carry out the operation

This cycle runs continuously. A modern processor can complete several billion of these cycles per second, often executing multiple instructions in parallel through a technique called pipelining.

Inside the processor, **registers** are very small, very fast memory locations — a handful of slots that hold the values currently being worked on. The **arithmetic logic unit** (ALU) performs mathematical and logical operations. The **control unit** coordinates which instruction runs next and how data moves between registers, the ALU, and memory.

## Following one line of code through the machine

A programmer may write something as simple as:

```java
a = b + c;
```

This looks like one operation. But the CPU may need four or five separate steps to execute it:

```
LOAD  R1, [address of b]   // copy b from memory into register R1
LOAD  R2, [address of c]   // copy c from memory into register R2
ADD   R3, R1, R2           // add R1 and R2, store result in R3
STORE R3, [address of a]   // write R3 back to memory where a lives
```

The compiler or interpreter translates the high-level line into these lower-level instructions automatically. The programmer does not need to think in registers, but knowing this layer exists helps explain things that would otherwise seem mysterious — like why accessing a value repeatedly in a tight loop is faster than reading it from disk each time, or why a function call has overhead.

## Memory is a hierarchy

RAM holds programs and data that are currently active. It is fast compared to disk storage, but slow compared to registers. Modern processors bridge this gap with **cache memory** — small, fast memory layers (L1, L2, L3) that sit between the registers and main RAM.

When the CPU needs a value, it first checks the cache. If the value is there (a cache hit), it is retrieved quickly. If not (a cache miss), the processor must fetch it from RAM, which takes far longer. This is why the order in which a program accesses memory can matter more than the number of operations it performs.

## Everything is binary

At the lowest level, all data is represented as patterns of bits — 0s and 1s. Numbers, letters, images, audio, program instructions — all of it ultimately becomes binary data that the hardware processes.

The letter A might be stored as `01000001` in ASCII. The integer 42 becomes `00101010`. A floating-point number like 3.14 follows a different encoding. A program instruction that says "add these two values" has its own binary representation that the CPU recognizes during the decode step.

Programming languages exist precisely to hide this level from developers. But the binary layer is always there, executing beneath every abstraction.

## Why this matters

A screen can show a photograph, a game, or a complex document. Underneath, the machine is still performing very small operations — loads, additions, comparisons, stores — at enormous speed. The complexity we see in software is not a property of the hardware. It grows from simple steps repeated many times, structured carefully by compilers and operating systems and runtime environments that most programs never need to think about.

That is one of the things I find genuinely interesting about computing. The gap between what a programmer writes and what the machine executes is enormous. But each layer of that gap exists for a clear reason, and following one line of code all the way down is a useful exercise at least once.
