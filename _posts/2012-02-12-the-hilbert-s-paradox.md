---
title: 'The Hilberts Paradox'
date: 2012-02-12
permalink: /posts/2012/02/the-hilbert-s-paradox/
tags:
  - math
  - paradox
  - self-improvement
---

Hilbert's Hotel is one of my favorite ways to think about infinity. The thought experiment was introduced by David Hilbert, the German mathematician, around 1924, and it remains the clearest illustration I know of why infinity does not behave like a very large finite number.

Imagine a hotel with infinitely many rooms, numbered 1, 2, 3, and so on forever. Every room is occupied. A new guest arrives. In an ordinary hotel with a finite number of rooms, this is simply impossible — all full means all full.

<img width="200" alt="hilbert hotel" src="/images/posts/the-hilbert-s-paradox.webp" style="float: left; margin-right: 10px;" />

In the infinite hotel, the manager has a solution. Ask every current guest to move from room n to room n+1. The guest in room 1 moves to room 2, the guest in room 2 moves to room 3, and so on, forever. Room 1 is now empty. The hotel accommodated a new guest without displacing anyone.

The hotel was full. It accepted a new guest. Both statements are true.

The situation becomes stranger when an infinite bus arrives, carrying countably infinitely many new passengers. The manager asks every current guest to move from room n to room 2n — the doubling map. All existing guests now occupy the even-numbered rooms. Every odd-numbered room is empty. An infinite set of new guests moves into rooms 1, 3, 5, 7, ... The full hotel has doubled its occupancy.

## What this is actually showing

The hotel is an illustration of a precise mathematical concept developed by Georg Cantor in the 1870s and 1880s: the cardinality of infinite sets.

Two sets have the same cardinality if their elements can be put into a one-to-one correspondence — a bijection — with each other. The set of natural numbers (1, 2, 3, ...) can be put into bijection with the set of even numbers (2, 4, 6, ...) by the map n → 2n. Every natural number corresponds to exactly one even number, and every even number corresponds to exactly one natural number. So despite the even numbers appearing to be "half" of the natural numbers, they have the same cardinality. This cardinality is called ℵ₀ (aleph-null) — the smallest infinite cardinal.

The hotel thought experiment demonstrates this: adding one to ℵ₀ gives ℵ₀. Adding ℵ₀ to ℵ₀ gives ℵ₀. The ordinary arithmetic of finite numbers breaks down.

Cantor also showed that not all infinities are equal. His diagonal argument proves that the real numbers cannot be put into bijection with the natural numbers — the real numbers form a strictly larger infinite set, with cardinality called ℵ₁ or "uncountably infinite." No Hilbert Hotel trick can accommodate the real numbers if the rooms are numbered with natural numbers.

## Why it matters outside mathematics

Hilbert's Hotel is not just an amusement. It encodes a genuine tension between the infinity we can count through (like the natural numbers) and the infinity we cannot (like the real number line). This distinction appears in computer science: problems where the solution space is countably infinite can sometimes be enumerated; problems over the real numbers or continuous spaces require different tools.

It also challenges a basic intuition — that "the part is smaller than the whole" — that holds for every finite collection but fails for infinite ones. Understanding exactly where and why our intuitions break down is part of what makes mathematics interesting.
