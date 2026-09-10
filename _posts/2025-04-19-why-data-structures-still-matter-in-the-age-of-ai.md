---
title: 'Why Data Structures Still Matter in the Age of AI'
date: 2025-04-19
permalink: /posts/2025/04/why-data-structures-still-matter-in-the-age-of-ai/
tags:
  - algorithms
  - data-structures
  - artificial-intelligence
  - education
---

AI can write code very quickly now. It can produce a function, explain an error, or suggest a solution in seconds. Because of this, I sometimes hear a simple question: if AI can write the code, do students still need to learn data structures?

I think they do. Maybe they need them even more.

## A working program is not always a good program

Two solutions can produce the same result and still be very different. Consider a simple search problem: given a list of one million names, check whether a specific name appears. A linear scan through an array checks each element in turn — O(n) time, meaning one million comparisons in the worst case. The same lookup in a hash table takes O(1) average time, regardless of how many names are stored. Both programs produce the correct yes/no answer. One is milliseconds; the other is barely perceptible. If you do not understand the underlying structures, you cannot tell whether the AI-generated solution is the fast one or the slow one.

The performance difference often does not appear in small test cases. A list of ten names searches in microseconds either way. The difference emerges at scale, under load, or in production — exactly where a subtle design error is most expensive to fix.

## The ideas behind the structures

A stack is not only a topic for an exam. It is a way to think about last-in, first-out behaviour. Function call stacks in every programming language implement this idea; so does the undo history in every editor you have used. A queue helps us think about waiting and fairness — operating system process schedulers, message queues in distributed systems, and print spoolers all depend on queues. A tree gives us a way to represent hierarchy and enable fast search: a balanced binary search tree finds any element in O(log n) comparisons, which for one million entries means roughly twenty comparisons instead of one million. A graph helps us understand connections — route planning, dependency resolution in package managers, and social network analysis are all fundamentally graph problems.

These structures appear in browsers, operating systems, networks, games, and databases. The DOM that a browser uses to represent an HTML page is a tree. The network routing tables that deliver your packets use graphs and priority queues. The search index behind most databases is a tree variant. The structures are not abstract exercises — they are the material from which software is made.

## What AI can hide

AI can easily hide a bad structural decision behind clean-looking code. The variable names may be good. The comments may sound confident. The program may even pass a few tests. But if the underlying data structure is wrong for the problem — an O(n²) sort where an O(n log n) sort was needed, or a list where a set would have made membership checks instant — the solution is still poor. A developer who cannot evaluate the structure cannot catch the error.

## How to use AI productively for learning

I do not think students should avoid AI tools. That would not be realistic, and it would also miss an opportunity. I prefer using them as a second voice. Ask why a heap is better than a sorted array for a priority queue. Ask for an alternative solution and compare the two. Ask what happens to the performance when the input grows from one thousand items to one million. Then test the answer. Draw the structure on paper. Trace through a small example by hand. Change the input and see what breaks.

Programming tools are becoming faster, but learning still needs some slow moments. Sometimes five boxes drawn on paper explain an array better than a long piece of code. Sometimes a tree drawn by hand makes a rotation much easier to remember than reading it in a textbook.

The age of AI changes some parts of programming education, but it does not remove the need for understanding. Syntax becomes easier to obtain. Judgment becomes more important. That is why I still believe in teaching fundamentals — not because the tools haven't changed, but because the habit of thinking clearly about structure lasts much longer than any particular tool.
