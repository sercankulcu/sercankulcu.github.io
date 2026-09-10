---
title: 'Apple Silicon And The Return Of Processor Diversity'
date: 2021-01-31
permalink: /posts/2021/01/apple-silicon-and-the-return-of-processor-diversity/
tags:
  - hardware
  - processors
  - technology
---

Apple announced its transition from Intel processors to its own Apple Silicon at WWDC in June 2020 and shipped the first M1 Macs — the MacBook Air, 13-inch MacBook Pro, and Mac mini — in November 2020. By January 2021, reviews and benchmarks have had time to accumulate, and the results are unusual enough to warrant serious attention.

## What the M1 actually is

The M1 is a system-on-chip (SoC) — a single piece of silicon that integrates the CPU, GPU, memory, and multiple specialized processors (for machine learning, media encoding, security, and more). Apple's previous Macs used separate chips from Intel (CPU), AMD (GPU in some models), and other suppliers. The M1 brings all of this onto one die, with a unified memory pool shared between the CPU and GPU.

The CPU consists of four high-performance cores and four high-efficiency cores. The high-performance cores are derived from Apple's A-series mobile chip designs, which have led ARM-based chips in single-core performance benchmarks for several years. The efficiency cores consume dramatically less power than the performance cores and handle background tasks.

The GPU has 8 cores (7 in the MacBook Air). Compared to the integrated Intel graphics that were standard in previous MacBook Airs, the M1 GPU is substantially faster.

## The benchmark results

Geekbench 5 single-core scores, which Apple's previous Macs handled reasonably well, show the M1 outperforming most Intel laptop chips and competing with many desktop processors. Multi-core scores are strong as well, though Intel and AMD high-core-count chips still dominate pure multi-threaded workloads.

What the benchmarks do not fully capture is what developers are actually experiencing: compilation tasks, image processing, and video encoding that previously required fan cooling and significant battery drain now run silently and for extended hours. The MacBook Air has no fan — the M1 is cool enough under most workloads to operate passively. Battery life for tasks that previously lasted four to five hours now runs to eight to ten hours in practice.

## The software compatibility question

Applications compiled for Intel processors cannot run on the M1 without translation. Apple's solution is Rosetta 2, an ahead-of-time binary translator that converts x86 code to ARM code at install time rather than during execution. Translated applications run without any user action — you simply open them — and performance is generally good. The translation overhead is real but usually not severe.

Native ARM applications (compiled with Apple's Xcode for Apple Silicon) run at full speed with no translation. Apple has rebuilt its own applications natively. Microsoft Office, Chrome, and Slack released ARM versions within weeks of the M1 launch. The pace of native support is faster than I expected.

Universal binaries — a format that packages both x86 and ARM code in a single application download — allow developers to ship one app that runs natively on both architectures. macOS selects the appropriate code automatically. This is the smoothest migration path and avoids any performance penalty for users on either architecture.

The remaining compatibility challenges are at the developer tooling level. Docker for Mac, as of January 2021, does not yet support Apple Silicon natively. Some CLI tools, development environments, and applications with native extensions that require x86 binaries will need time to catch up. This is the realistic friction for developers considering an M1 Mac as their primary development machine right now.

## What this means for computing more broadly

For most of the past two decades, processor architecture was largely invisible to software developers. Write code for the operating system; the operating system handles the chip. The M1 transition is a reminder that this abstraction is not permanent. Architecture choices — how memory is organized, how many cores, how they trade off performance against power, how the CPU and GPU interact — shape what software can practically do and how fast it can do it.

Apple's bet on a different architectural approach — ARM-based, efficiency-focused, deeply vertically integrated — appears to be delivering real benefits in the laptop form factor. Whether this forces a meaningful response from Intel or AMD in their design priorities, or whether it remains isolated to Apple's hardware, is a question with consequences for the whole industry. The answer is not clear yet.
