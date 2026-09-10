---
title: 'The Liar Paradox'
date: 2012-01-19
permalink: /posts/2012/01/the-liar-paradox/
tags:
  - math
  - paradox
  - self-improvement
---

Consider the sentence: "This statement is false." It is only four words, but it creates a problem that has troubled philosophers and logicians for more than two thousand years.

<img width="200" alt="liar paradox" src="/images/posts/the-liar-paradox.webp" style="float: left; margin-right: 10px;" />

Suppose the sentence is true. If it is true, then what it says must be correct. But it says that it is false. So if it is true, it is false. Suppose instead that it is false. Then the statement "this statement is false" is not accurate — which means the statement is true. We move in a circle.

Neither truth value works. Assigning true produces false. Assigning false produces true. The sentence resists classification.

## The history of the problem

The oldest known version appears in the writings attributed to Epimenides of Crete, around 600 BCE: a Cretan who declares that all Cretans are liars. If the statement is true, Epimenides is a liar, which means the statement is false. The Apostle Paul references this puzzle in the letter to Titus. Versions of the paradox were discussed by the Megarian and Stoic schools of philosophy in ancient Greece.

The modern, precise form — "this sentence is false" or "this proposition is not true" — became a serious subject for mathematical logic in the late nineteenth and early twentieth centuries, when logicians were trying to build formal systems that could capture all of mathematics.

## Russell and the connection to mathematics

Bertrand Russell encountered a closely related problem in 1901 while studying set theory: consider the set of all sets that do not contain themselves. Does that set contain itself? If it does, then by definition it should not. If it does not, then by definition it should. Russell's Paradox broke the naïve foundation of set theory that Gottlob Frege had been building, forcing the development of more careful axiomatic foundations.

Russell's response was type theory — a hierarchy of levels where statements about sets at one level can only be made from a higher level. This prevents the self-reference that produces the contradiction.

## Gödel and incompleteness

In 1931, Kurt Gödel used the structure of the Liar Paradox as the core technique in his incompleteness theorems. Gödel showed how to construct a mathematical statement that encodes the claim "this statement is not provable" — using a numbering system (now called Gödel numbering) that lets arithmetic statements refer to themselves. The theorem that followed was remarkable: in any consistent formal system powerful enough to express basic arithmetic, there will be true statements that cannot be proved within that system.

The Liar Paradox was not just a puzzle about language. It was a structural feature of self-reference that, when translated into mathematics, revealed fundamental limits on what formal systems can know about themselves.

## Why the problem persists

Several responses exist. Alfred Tarski proposed distinguishing between the object language (the language we talk about) and the metalanguage (the language we use to make truth claims about the object language). In this hierarchy, "this statement is false" cannot be a truth-apt sentence in its own language — it would require a metalanguage statement to evaluate it. The hierarchy eliminates the paradox at the cost of preventing certain kinds of self-reference entirely.

Other approaches use three-valued logic (true, false, and indeterminate) or treat paradoxical statements as lacking a truth value rather than having a contradictory one.

What interests me is less which resolution is correct and more what the paradox reveals: that the concepts we use most freely — truth, falsity, proof, definition — become complicated quickly when a system can refer to itself. The Liar Paradox is four words. It took two thousand years and some of the most careful mathematical reasoning of the twentieth century to understand why those four words are so difficult.
