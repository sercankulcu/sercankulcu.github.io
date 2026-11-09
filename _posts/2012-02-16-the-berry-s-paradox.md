---
title: 'The Berrys Paradox'
date: 2012-02-16
permalink: /posts/2012/02/the-berry-s-paradox/
tags:
  - math
  - paradox
  - self-improvement
---

Berry's Paradox lives in the uncomfortable space between language and mathematics — the space where ordinary words meet formal definitions and produce results neither can handle alone.

The paradox was communicated to Bertrand Russell in a letter around 1905 by G. G. Berry, a librarian at the Bodleian Library at Oxford. Russell published it in his 1908 paper "Mathematical Logic as Based on the Theory of Types," where he used it as evidence that naive self-reference in language leads to contradiction.

<img width="200" alt="berry paradox" src="/images/posts/the-berry-s-paradox.webp" style="float: left; margin-right: 10px;" />

The standard form: consider "the smallest positive integer that cannot be described in fewer than twenty words." Count the words: *the-smallest-positive-integer-that-cannot-be-described-in-fewer-than-twenty-words* is fourteen words. So the sentence is itself a description of a number — in fewer than twenty words — that claims to be indescribable in fewer than twenty words.

If the definition succeeds, it refutes itself. The number exists but cannot be pinned down without the definition collapsing.

## Why the contradiction appears

The problem is the word "described." It sounds precise. In practice it conceals several decisions:

- Described in which language? English, French, a formal notation?
- By whose reading? Does "the successor of the number of days in a year" describe 366?
- Are synonymous descriptions the same description?
- Can a description contain references to other descriptions?

Natural language has enough flexibility that "describable in fewer than twenty words" is not a well-defined predicate. It depends on what we count as a description, and any definition we give is subject to the same kind of recursive problem that produced the paradox in the first place.

## The connection to Gödel and complexity

Berry's Paradox anticipates several important ideas that were made precise in the twentieth century.

Gödel's 1931 incompleteness theorems use a structure closely related to Berry's argument. Gödel assigned each mathematical statement a unique number (a "Gödel number"), allowing mathematical statements to refer to other mathematical statements as numbers. He then constructed the mathematical equivalent of "the smallest number whose associated statement is not provable" — and showed that this encoding, in a consistent formal system, leads to a statement that is true but unprovable. The paradox was not just a curiosity; it was a template for one of the most important results in logic.

Kolmogorov complexity — developed independently in the 1960s by Kolmogorov, Chaitin, and Solomonoff — formalizes the idea of "the shortest description of a number" in terms of the length of programs that generate it. A number that requires a long program to generate is "complex." Berry's Paradox appears directly here: Chaitin showed that the statement "the smallest number with Kolmogorov complexity greater than n bits" cannot be proved in a formal system of complexity less than n bits — for essentially the same reason that Berry's description refutes itself.

## What it means in practice

In computer science and formal methods, we try to remove the ambiguity that makes Berry's Paradox possible by defining things with explicit syntax and semantics. A formal language specifies exactly what counts as a valid expression and exactly what meaning it carries. This eliminates the flexibility that allows the paradox to arise.

Natural language is harder to control. Words look precise while their meanings shift subtly with context. Berry's Paradox is a sharp reminder of that flexibility — a sentence that appears to be making a specific mathematical claim but actually depends on conceptual imprecision that makes the claim self-defeating. The sentence looks like a programming statement. Run it and you get a runtime error.
