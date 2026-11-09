---
title: 'The Birthday Paradox'
date: 2012-02-08
permalink: /posts/2012/02/the-birthday-paradox/
tags:
  - math
  - paradox
  - self-improvement
---

The Birthday Paradox is not a real contradiction. It is a collision between probability and intuition — and the gap between them is large enough that the result consistently surprises people even after they have heard the explanation before.

The question: in a room of 23 people, what is the probability that at least two of them share the same birthday?

<img width="200" alt="birthday paradox" src="/images/posts/the-birthday-paradox.webp" style="float: left; margin-right: 10px;" />

Most people guess something small — 5%, 10%, maybe 15%. The actual answer, assuming 365 possible birthdays and uniform distribution, is just above 50%.

## The calculation

The direct calculation — "what is the probability that someone shares my birthday?" — is the wrong question. With 22 other people and 365 days, the chance that none of them matches your specific birthday is (364/365)^22 ≈ 94%. Small probability of a match. Intuition confirmed.

But the question is not about your birthday. It is about whether any two people in the room share a birthday with each other. The correct frame is counting pairs.

With 23 people, the number of unique pairs is:

23 × 22 / 2 = **253 pairs**

Each pair has a 1/365 chance of sharing a birthday. 253 pairs is a lot of chances.

The clean way to calculate it: find the probability that no two people share a birthday (the complement), then subtract from 1.

Person 1 can have any birthday: **365/365**  
Person 2 must avoid person 1's birthday: **364/365**  
Person 3 must avoid 2 birthdays: **363/365**  
...  
Person 23 must avoid 22 birthdays: **343/365**

Multiply these together:

P(all different) = (365 × 364 × 363 × ... × 343) / 365^22

This works out to approximately 0.493.

P(at least one match) = 1 - 0.493 = **0.507**

Just over 50%. With 30 people, the probability rises to about 71%. With 50 people, it is approximately 97%.

## Why the intuition fails

The intuition asks: "Is 23 a large fraction of 365?" It is not — about 6%. But this question assumes we are comparing against a fixed reference point (one specific birthday). The actual question compares every person against every other person simultaneously.

The number of comparisons grows quadratically with the group size: adding one more person to a group of n creates n new pairs. A small increase in group size produces a large increase in opportunities for a match.

This is the general pattern behind many counterintuitive probability results: the intuition counts one thing (people versus days) when the relevant quantity is another (pairs of people).

## The same pattern in other contexts

The birthday paradox appears directly in computing. A hash function maps input values to a fixed-size output space — say, a 64-bit space with 2^64 possible values. A birthday attack exploits the paradox to find hash collisions much faster than brute force: if you want two inputs with the same hash, you do not need to try 2^64 inputs. You need roughly 2^32 — the square root — because you are looking for any pair to match, not a specific target.

This is why cryptographic hash functions aim for 256-bit output spaces or larger: a birthday attack on a 256-bit hash still requires approximately 2^128 operations, which is computationally infeasible.

The paradox is also relevant to probability estimation in general: a situation can feel unlikely because we are asking the wrong version of the question. Changing the question — from "does this match a specific thing" to "does any pair among these match" — changes the calculation completely.
