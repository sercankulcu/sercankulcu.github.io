---
title: 'The Beauty of Simple Algorithms'
date: 2025-08-24
permalink: /posts/2025/08/the-beauty-of-simple-algorithms/
tags:
  - algorithms
  - programming
  - computer-science
---

I like clever algorithms, but I often enjoy simple algorithms more. There is something satisfying about a solution that looks almost obvious after you understand it — where the entire idea fits in your head at once.

Before that moment, the problem can look genuinely hard. Then a small insight appears and suddenly the structure is clear. The algorithm is short not because the problem was easy, but because someone found the right way to look at it.

## Some algorithms that have this quality

**Binary search** is the standard example. If the data is sorted, do not search from the beginning. Look at the middle element. If the target is smaller, discard the right half. If larger, discard the left half. Repeat. After each step, the search space is cut in half — so a list of a million elements requires at most 20 comparisons (log₂ 1,000,000 ≈ 20). This is the O(log n) property, and it emerges directly from the idea of eliminating half the remaining possibilities on every step.

**Euclid's algorithm for greatest common divisor** is over 2,300 years old and requires only a few lines:

```
gcd(a, b):
  if b == 0: return a
  return gcd(b, a mod b)
```

The key insight: the GCD of two numbers also divides their difference, so you can replace the larger number with the remainder without changing the GCD. This runs in O(log min(a, b)) steps. It is ancient, it is brief, and it still ships in standard libraries.

**Fisher-Yates shuffle** produces a uniformly random permutation of a list in O(n) time. Starting from the last element, swap each element with a randomly chosen element at or before its position. The elegance is that each permutation is equally likely by construction — not approximately, but exactly — and the proof is a single paragraph.

**Quicksort** (Tony Hoare, 1959) chooses a pivot element and partitions the list into elements less than the pivot and elements greater. Then it recurses on both sides. Average case: O(n log n). The insight is that placing one element in its final position — the pivot — and dividing the problem into two smaller subproblems is enough structure to produce an efficient sort.

## Why they look obvious afterward

Each of these algorithms exploits a property of the problem that was always present but easy to miss. Binary search exploits the sorted order — a property that most people notice but then ignore in favor of checking items one by one. Euclid exploits the arithmetic relationship between GCD and remainder. Fisher-Yates exploits that a correct shuffle can be built incrementally, one position at a time.

The frustrating thing about simple algorithms is that this insight is invisible until someone shows it. I have read descriptions of algorithms I had never encountered and immediately thought "of course" — but I had not found it myself. This is not unique to algorithms. Mathematics is full of proofs that seem obvious after the key step is revealed, proofs that took decades for the original discoverer to find.

This suggests the real skill is not learning more algorithms but developing the habit of asking what property of this specific problem might let me reduce work. Sometimes the answer is "none, and the brute-force approach is fine." But sometimes the right question reveals a structure that was there all along.

Students often assume a hard problem needs complicated code. This is understandable — difficulty should map to complexity. But the best solutions are sometimes short because the thinking happened before the code. A good algorithm changes the shape of the problem, not just the speed of solving it.
