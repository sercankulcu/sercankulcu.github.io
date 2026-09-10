---
title: 'Java Superstars'
date: 2023-11-28
permalink: /posts/2023/11/java-superstars/
tags:
  - java
  - software
  - career
---

Java 21 arrived in September 2023 as the latest long-term support release, and it is a significant one. Virtual threads — the main deliverable of Project Loom — are now production-ready. Structured concurrency and scoped values are in preview. Pattern matching for switch is finalized. Record patterns work in instanceof checks. After years of shorter improvement cycles since Java 9, the platform has changed considerably. The people shaping this evolution are worth understanding, but so is the community structure that makes Java's development sustainable.

## The Java Champions program

The Java Champions program, run by Oracle, recognizes individuals who make sustained contributions to the Java ecosystem. Champions are not Oracle employees by definition — the program explicitly values independent voices. They may write books, build and maintain open-source projects, teach at universities, speak at conferences, run developer communities, create educational content, or contribute to the OpenJDK project directly.

In November 2023 there are several hundred Java Champions worldwide. What the list represents is not a ranking of the best Java developers in the world. It is a recognition of people who share their knowledge in ways that benefit others consistently over time.

## What sustained contribution actually looks like

**Heinz Kabutz** has published the Java Specialists' Newsletter since 2000 — more than 300 issues covering concurrency, JVM internals, performance, and language features at a depth that goes considerably beyond what most books cover. His coverage of the Java Memory Model, for example, includes the kind of detail that matters when something subtle goes wrong in production.

**Venkat Subramaniam** has written multiple books on Java and related topics and has given talks at JavaOne, Devoxx, and similar conferences for many years. His particular contribution is making difficult topics — functional programming in Java, concurrency, Kotlin — accessible to developers who did not come from a computer science background. Making complex ideas teachable is its own form of technical work.

**Jose Paumard** has become increasingly visible as Java Developer Advocate at Oracle, but his contributions as an educator predated that role. His work on the Stream API and the new concurrency features in recent Java versions — explained through code, not just slides — helps developers understand not only what changed but why the design is the way it is.

These are three examples from a large list. The point is not the names but the pattern: each person identified something valuable that was not well explained, built a reliable way to explain it, and kept doing that over years.

## The invisible majority

The Java Champions program captures a few hundred people. The actual community is much larger and mostly invisible.

OpenJDK — the open-source implementation of Java — receives contributions from many companies and individuals. Some of these contributors are full-time employees of Oracle, Red Hat, Amazon, Microsoft, or other organizations. Many are not. The bug reports, test cases, documentation improvements, and code reviews that maintain a platform at Java's scale involve more people than any named list would suggest.

Stack Overflow's Java tag has several million questions and answers accumulated over fifteen years. The developers who answered those questions, often in detail, built a resource that new Java developers still rely on. Most of them are not famous.

Library authors who maintain frameworks, testing tools, build systems, and serialization libraries are doing work that makes Java practical for others. When a library is well-designed and reliably maintained, its users mostly notice when something breaks. The steady, invisible maintenance does not generate recognition.

## What Java's longevity actually shows

Java is in its twenty-eighth year as a commercially relevant language. That is unusual. Languages that stay relevant for decades do so because communities keep investing in them — porting to new hardware, updating idioms, building new tooling, training new developers, and evolving the language itself in response to real problems.

Project Loom's virtual threads, now stable in Java 21, did not arrive because Oracle decided threads should be lighter. They arrived because a consistent community feedback signal over many years indicated that the thread-per-request model was limiting for certain workloads, and that the async alternatives required too much restructuring of existing code. The language followed the community's experience.

The famous names are useful as entry points. The community behind them is what actually keeps a platform alive.
