---
title: Google Announces the Go Programming Language
date: 2009-11-15
permalink: /posts/2009/11/google-announces-the-go-programming-language/
tags:
  - software
  - programming
  - computing-history
---

Google introduced the Go programming language publicly in November 2009. Its designers, including Robert Griesemer, Rob Pike, and Ken Thompson, wanted a compiled language that kept systems programming relatively simple while handling modern multi-core and networked software.

Go used garbage collection, static typing, fast compilation, and a deliberately small language syntax. Its most distinctive concurrency feature was the goroutine: a lightweight function execution unit scheduled by the Go runtime rather than directly mapped one-to-one to operating-system threads. Channels provided a structured way for goroutines to communicate.

The language avoided many features common in C++ and Java, including class inheritance and elaborate type hierarchies. That simplicity made Go attractive for servers, networking tools, and infrastructure software. Projects such as Docker and Kubernetes later helped make it one of the characteristic languages of cloud-native development.
