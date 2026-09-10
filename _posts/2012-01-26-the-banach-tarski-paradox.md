---
title: 'The Banach-tarski Paradox'
date: 2012-01-26
permalink: /posts/2012/01/the-banach-tarski-paradox/
tags:
  - math
  - paradox
  - self-improvement
---

The Banach-Tarski Paradox is a theorem in mathematics stating that a solid ball in three-dimensional space can be decomposed into a finite number of disjoint subsets, which can then be reassembled — using only rigid motions: rotations and translations — into two solid balls each identical in size to the original. One ball becomes two. No stretching, no scaling, no adding material.

<img width="200" alt="banach tarski paradox" src="/images/posts/the-banach-tarski-paradox.webp" style="float: left; margin-right: 10px;" />

This cannot be done with a physical orange. The important word is *mathematical*. The pieces in the Banach-Tarski construction are not objects that could be cut with a knife or described with a recipe. They are what mathematicians call non-measurable sets.

## What non-measurable means

Measure theory is the branch of mathematics that formalizes the idea of size — length, area, volume — in a way that is consistent and well-behaved. A "measurable" set is one to which you can assign a well-defined size. Most sets we encounter in everyday mathematics are measurable.

A non-measurable set is one for which no consistent assignment of size is possible. The first example was constructed by Giuseppe Vitali in 1905: using a choice axiom, he built a set of real numbers on the unit interval that cannot be given a length without creating a contradiction. If you assign it a length of zero, infinitely many translated copies of it fit inside a finite interval. If you assign it any positive length, finitely many copies would exceed the interval.

The pieces used in the Banach-Tarski decomposition are similarly pathological — infinitely intricate collections of points, not regions with smooth boundaries. Volume does not apply to them in any meaningful way.

## The Axiom of Choice

Stefan Banach and Alfred Tarski published the result in 1924. The proof depends on the Axiom of Choice (AC): a principle in set theory stating that, given any collection of non-empty sets, it is possible to select exactly one element from each set — even when the collection is infinite and no explicit rule for choosing exists.

AC is accepted in most of modern mathematics because it is useful and because its negation creates equally strange results. But theorems that depend heavily on AC often produce conclusions that are impossible to realize in physical terms, and Banach-Tarski is the most striking example.

## What the paradox actually says

The result holds in three-dimensional space but fails in one and two dimensions. This is because the group of rotations of three-dimensional space (SO(3)) contains a "free group on two generators" as a subgroup — a structure that allows the paradoxical decomposition. Two-dimensional space lacks this structure.

The theorem uses roughly five pieces. With more pieces, the decomposition can be made more explicit; the minimum number of pieces required was shown to be five by Robinson in 1947.

## What it tells us

The theorem is not telling us that matter can be created from nothing. It is telling us that the intuitive concept of "size" breaks down when applied to arbitrary subsets of three-dimensional space — that our physical intuition about volume, which developed from experience with measurable objects, cannot be extended to all mathematical objects without contradiction.

I like the Banach-Tarski Paradox because it is a clean demonstration that mathematics is not just a formalization of physical intuition. The formal rules allow structures that physical reality does not. Understanding where that divergence occurs is part of understanding what mathematics actually is.
