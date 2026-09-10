---
title: 'Popular Questions About Software'
date: 2018-08-14
permalink: /posts/2018/08/popular-questions-about-software/
tags:
  - career
  - software
---

People who are not software developers often have remarkably good questions about how software works. Here are some of the ones I hear most often, along with honest answers.

## What is the difference between hardware and software?

Hardware is physical. You can hold a processor, a memory module, or a storage drive. Hardware performs operations, but by itself it does not know what to do with them.

Software is the set of instructions that tells hardware what to do and in what order. When you open a photo editor, you are running a program — a large collection of instructions that tells the processor how to read an image file, display colors on screen, and respond to mouse movements. The hardware does the work, but software decides what that work is.

## What does an operating system actually do?

An operating system such as Windows, macOS, or Linux is the layer between your programs and the physical machine. It manages who gets processor time, how memory is divided among running programs, how files are stored and retrieved from disk, and how input from the keyboard or mouse reaches the right application.

Without an operating system, every application would need to manage all of this itself. The OS turns a collection of hardware into something programs can rely on.

## Why does software have bugs?

Software is created by people, and people make mistakes. But bugs are not simply the result of careless work. Large programs contain millions of lines of code, and those lines interact in ways that are difficult to predict completely.

A small mistake in logic can produce correct behavior in ninety-nine situations and fail in the hundredth. An unexpected combination of inputs can trigger a code path that was never tested. A timing issue between two parts of a system can cause problems that only appear under load.

In 2018, a single modern application may depend on dozens of external libraries, each written by different people, each with their own assumptions. The interactions between these pieces create enormous complexity. Testing reduces the number of bugs that reach users, but no testing process catches everything.

## Why does software need updates?

Software updates serve several purposes. Security updates fix vulnerabilities that have been discovered after release — sometimes by researchers, sometimes by attackers first. Bug fixes correct errors that users have reported or that developers found internally. Feature updates add new capabilities. Compatibility updates keep software working as operating systems, hardware, and other dependencies change around it.

The software that was correct and secure when it was released may not stay that way. The environment it runs in changes. The threats it faces change. Regular updates are how software stays reliable over time, not just at launch.

## What is the difference between compiled and interpreted languages?

When a program is compiled, a tool translates the entire source code into machine instructions before the program runs. The result is a binary file the hardware can execute directly. C and C++ work this way. The compilation step adds time upfront, but the resulting program can run very efficiently.

Interpreted languages work differently. A program called an interpreter reads and executes the source code at runtime, translating it into machine operations as it goes. Python and JavaScript are commonly described this way, though modern JavaScript engines do considerable optimization behind the scenes.

Some languages use a middle approach. Java compiles source code into an intermediate format called bytecode, which a virtual machine then executes. This allows the same Java program to run on different hardware and operating systems without recompilation.

## Is software engineering just writing code?

Writing code is an important part, but a fairly small slice of the whole activity. Building useful software includes understanding what the software should do (requirements), deciding how to structure it (design), verifying that it works (testing), managing changes over time (version control), keeping it running and fixing problems (maintenance), explaining how it works (documentation), and coordinating with other people (communication).

A developer who writes excellent code but cannot communicate clearly, understand requirements, or read someone else's work is limited. Software engineering is a collaborative discipline more than an individual skill. The code is important. But the code lives inside a much larger process.
