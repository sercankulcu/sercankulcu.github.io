---
title: 'Edsger Wybe Dijkstra'
date: 2015-09-09
permalink: /posts/2015/09/edsger-wybe-dijkstra/
tags:
  - biography
  - career
---

Edsger Wybe Dijkstra was one of the people who helped turn programming from a practical craft into a serious intellectual discipline. He was born in Rotterdam in 1930. His parents were both highly educated, and Dijkstra initially studied theoretical physics at Leiden University.

<img width="200" alt="Edsger Dijkstra" src="/images/posts/edsger-wybe-dijkstra.webp" style="float: left; margin-right: 10px;" />

While still a student, he began working as a programmer at the Mathematical Centre in Amsterdam in 1952. At the time, programming was so new that it was not yet a normal profession. Dijkstra later joked that when he wanted to record "programmer" as his profession, the authorities did not consider it a proper occupation. His work quickly became important.

## Dijkstra's algorithm

In 1956, while thinking about how to find the shortest route between cities for a demonstration, he developed what we now call Dijkstra's shortest-path algorithm. The algorithm solves the single-source shortest path problem on a weighted graph with non-negative edge weights. Starting from a source vertex, it maintains a priority queue of unvisited vertices sorted by their current best-known distance. At each step it extracts the nearest unvisited vertex, finalises its distance, and relaxes the distances to its neighbours. The process repeats until all vertices are settled. With a binary heap the complexity is O((V + E) log V); with a Fibonacci heap it improves to O(E + V log V). Dijkstra said he designed the algorithm in twenty minutes while sitting in a café in Amsterdam, without paper, and published it in a three-page paper in 1959. It remains one of the most widely taught and used algorithms in computer science, embedded in GPS routing, network packet routing (OSPF protocol), and shortest-path libraries across every programming language.

## Semaphores and concurrent programming

In the early 1960s, Dijkstra made major contributions to the emerging problem of concurrent programming. He coined the term *semaphore* for a synchronisation primitive: a shared counter that processes can increment (signal) and decrement (wait, blocking if the counter reaches zero). Semaphores provided a general tool for mutual exclusion and coordination that was cleaner than the busy-waiting loops that had been common. He formulated the *dining philosophers problem* as a pedagogical illustration of deadlock, and contributed to the understanding of how concurrent processes could be designed to avoid it. Dijkstra became a professor at Eindhoven University of Technology in 1962.

## Structured programming and the go-to debate

In 1968, he submitted a short letter to *Communications of the ACM* under the title "Go To Statement Considered Harmful." He argued that uncontrolled jumps made programs much harder to understand and prove correct, because the execution path through a program with many GOTOs could not be easily traced by a human reader. The title became famous; the larger idea mattered more. Programs should be written so human beings can reason about them. Control structures — if, while, for — express intent. An unconditional jump obscures it. Dijkstra received the ACM Turing Award in 1972.

## The EWD collection

One unusual part of his legacy is the collection of handwritten documents known as EWDs — named for his initials and a sequence number (EWD001, EWD002, ...). Dijkstra wrote technical notes, arguments, lectures, and reflections by hand, had them photocopied, and mailed copies to colleagues around the world. The collection eventually reached 1,316 documents and is archived at the University of Texas at Austin. Reading them is an experience in clarity. He had no patience for vague language, and his writing could be sharp — sometimes deliberately provocative. He held that BASIC caused "irreparable mental damage" in students who learned it as a first language, and he was equally critical of tools he believed trained bad habits. The severity came from a genuine belief that computing deserved mathematical rigour.

He said: "Computer science is no more about computers than astronomy is about telescopes." He meant that the field's subject is computation and its properties — not the particular machines that happen to implement it.

Dijkstra died in 2002. His questions remain alive. How do we make software easier to reason about? How do we control complexity? How do we write programs for people, not only machines? Computers have changed enormously since he began programming. Those questions have not.
