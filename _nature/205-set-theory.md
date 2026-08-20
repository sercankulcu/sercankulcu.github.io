---
title: 'Set Theory'
permalink: /nature/205-set-theory/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 205
tags:
   - set-theory
   - foundations
   - membership
   - infinity
   - mathematics
---

A set is a collection.

That simple idea became one of the foundations of modern mathematics.

Set theory provides a language for talking about:

- collections,
- membership,
- functions,
- relations,
- infinity.

It also revealed some of the deepest paradoxes in formal thought.

## Membership

The basic relation is:

\[
x \in A
\]

meaning:

x is a member of set A.

Set theory begins with this relation.

## Extensionality

Two sets are equal if they have exactly the same members.

This is the principle of **extensionality**.

If:

\[
\forall x\,(x\in A \leftrightarrow x\in B)
\]

then:

\[
A=B
\]

A set is determined by its membership structure.

## Empty Set

The **empty set** contains no elements.

It is written:

\[
\varnothing
\]

or:

\[
\{\}
\]

It is one of the most important objects in mathematics.

## Building Numbers from Sets

One standard construction defines:

\[
0=\varnothing
\]

Then:

\[
1=\{0\}
\]

\[
2=\{0,1\}
\]

\[
3=\{0,1,2\}
\]

Natural numbers can be built from sets.

## Subsets

A set A is a subset of B if every element of A belongs to B.

We write:

\[
A\subseteq B
\]

The subset relation is itself a structural relation among sets.

## Power Set

The **power set** of A is the set of all subsets of A.

It is written:

\[
\mathcal{P}(A)
\]

If A has \(n\) elements, then:

\[
|\mathcal{P}(A)|=2^n
\]

for finite A.

## Cantor's Theorem

Cantor proved something stronger:

For every set A,

\[
|A|<|\mathcal{P}(A)|
\]

No set has the same cardinality as its power set.

This creates an endless hierarchy of larger infinities.

## Infinite Sets

A set can be infinite.

The natural numbers:

\[
\mathbb{N}
\]

are infinite.

So are:

- integers,
- rationals,
- reals.

But not all infinities have the same size.

## Countable Infinity

A set is countably infinite if its elements can be put into one-to-one correspondence with natural numbers.

The integers are countable.

Surprisingly, the rationals are also countable.

## Uncountable Infinity

The real numbers are uncountable.

Cantor's diagonal argument proves there is no complete list of real numbers.

So:

\[
|\mathbb{R}|>|\mathbb{N}|
\]

Infinity has structure.

## Russell's Paradox

Naive set theory allowed:

the set of all objects satisfying any property.

Then consider:

\[
R=\{x\mid x\notin x\}
\]

Ask:

\[
R\in R?
\]

If yes, then no.

If no, then yes.

The system collapses.

## The Lesson of Russell

The problem was not sets themselves.

It was unrestricted comprehension.

Not every definable collection can safely be treated as a set.

Formal foundations needed stronger discipline.

## Zermelo–Fraenkel Set Theory

Modern mathematics often uses **Zermelo–Fraenkel set theory**, or ZF.

Instead of arbitrary set formation, it uses axioms controlling how sets may be constructed.

With the Axiom of Choice, the system is called **ZFC**.

## Separation

One key idea is restricted separation.

Given an existing set A, we may form:

the subset of elements of A satisfying a property.

This avoids creating unrestricted universal collections.

## Pairing

The pairing axiom allows sets such as:

\[
\{a,b\}
\]

to exist.

From simple axioms, complex structures can be built.

## Union

The union axiom allows us to combine members of members.

For a set A:

\[
\bigcup A
\]

contains elements belonging to sets inside A.

## Infinity Axiom

One axiom asserts the existence of an infinite set.

Without it, ordinary finite set constructions would not automatically generate the natural numbers as an infinite totality.

Infinity enters axiomatically.

## Replacement

The replacement axiom allows definable transformations of set elements to generate new sets.

This is powerful enough to support large portions of mathematics.

## Foundation

The axiom of foundation prevents infinitely descending membership chains of the ordinary kind.

It rules out structures such as:

\[
x\in x
\]

in standard ZF set theory.

This prevents certain self-membership pathologies.

## Choice

The **Axiom of Choice** says, roughly, that given a collection of nonempty sets, one can choose one element from each.

For finite collections this seems obvious.

For infinite collections, the axiom has surprisingly strong consequences.

## Equivalent Forms of Choice

The Axiom of Choice is equivalent, within standard set theory, to several powerful statements.

One famous equivalent is the **Well-Ordering Theorem**.

Another is **Zorn's Lemma**.

These forms appear throughout mathematics.

## Banach–Tarski

The Banach–Tarski paradox depends on the Axiom of Choice.

Abstract sets can be decomposed and rearranged in counterintuitive ways.

This does not describe physically realizable cutting of matter.

It reveals the power of infinite set construction.

## Relations as Sets

A relation can be represented as a set of ordered pairs.

For example:

\[
R\subseteq A\times B
\]

Functions can also be represented set-theoretically.

Set theory becomes a universal mathematical language.

## Functions as Sets

A function can be defined as a set of ordered pairs satisfying a uniqueness condition.

Thus objects that appear conceptually different can be encoded through sets.

This supports the foundational role of set theory.

## Structures

Groups, graphs, topological spaces, and other mathematical structures can be represented using sets equipped with additional relations or operations.

Set theory becomes a substrate.

## Is Everything a Set?

In standard foundations, mathematical objects can often be represented as sets.

That does not necessarily mean mathematicians think:

numbers really are sets.

Foundational representation is not always metaphysical identity.

## Alternative Foundations

Set theory is not the only possible foundation.

Alternatives include:

- type theory,
- category-theoretic foundations.

Modern proof assistants often use type-theoretic systems.

Foundations are choices of formal architecture.

## Set Theory and Logic

Set theory itself is usually formulated in first-order logic.

The logic supplies:

- variables,
- quantifiers,
- inference.

The set-theoretic axioms supply content.

Logic and theory must be distinguished.

## Independence

Some statements cannot be decided from ZFC, assuming consistency.

The Continuum Hypothesis is a famous example.

Gödel showed it cannot be disproved from ZF plus Choice, assuming consistency.

Cohen later showed it cannot be proved either.

## Continuum Hypothesis

The Continuum Hypothesis asks whether there is a cardinality strictly between:

\[
|\mathbb{N}|
\]

and:

\[
|\mathbb{R}|
\]

Within ZFC, the question is independent.

A foundational system can leave meaningful mathematical questions unresolved.

## Large Cardinals

Set theorists study strong axioms asserting the existence of very large infinite cardinals.

These axioms extend ordinary ZFC.

They reveal that mathematics can have hierarchies of foundational strength.

## Sets and Information

A set can represent:

- possible states,
- accepted strings,
- database records.

Set membership provides one of the simplest ways to classify information.

Formal systems often reduce questions to set membership.

## Recursive Sets Preview

Later we will ask whether membership in certain sets can be determined by algorithms.

This leads to:

- recursive sets,
- recursively enumerable sets.

Set theory connects directly to computation.

## The Philosophical Lesson

Set theory turned the idea of collection into a formal foundation for mathematics.

Its history teaches two lessons.

Simple ideas can generate enormous structure.

And unrestricted self-reference can generate contradiction.

## The Next Question

Set theory provides the universe of mathematical objects.

But one of mathematics' oldest and deepest domains is arithmetic itself.

What patterns are hidden in the integers?

That leads to:

**number theory.**
