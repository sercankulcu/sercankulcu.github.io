---
title: 'Decidability'
permalink: /nature/217-decidability/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 217
tags:
   - decidability
   - algorithms
   - logic
   - computability
   - decision-problems
---

A mathematical problem may have a correct answer for every input.

That does not mean there is an algorithm that can always find it.

This distinction is the heart of **decidability**.

A problem is decidable when there exists a mechanical procedure that:

- receives any valid input,
- eventually halts,
- returns the correct yes-or-no answer.

## Decision Problems

A **decision problem** asks a binary question.

Examples:

- Is this integer prime?
- Is this Boolean formula satisfiable?
- Does this program halt?
- Is this first-order formula logically valid?

Each input must receive:

yes

or:

no.

## Decider

A **decider** is an algorithm that always halts.

If input belongs to the target set, it says yes.

If not, it says no.

Termination on every input is essential.

## Decidable Set

A set \(A\) is decidable if there is an algorithm computing its characteristic function:

\[
\chi_A(x)=
\begin{cases}
1 & x\in A\\
0 & x\notin A
\end{cases}
\]

The algorithm always finishes.

## Example: Even Numbers

Given n, test:

\[
n\bmod 2
\]

If the remainder is 0, answer yes.

Otherwise, no.

The set of even numbers is decidable.

## Example: Prime Numbers

Primality is also decidable.

There are algorithms that always determine whether a finite integer is prime.

The computation may vary in efficiency.

But it terminates.

## Decidability Is Not Efficiency

A decidable problem may require enormous resources.

A procedure can be:

- exponential,
- impractical,
- astronomically slow.

It is still decidable if it eventually halts.

Complexity asks:

How costly?

Computability asks:

Possible at all?

## SAT

Boolean satisfiability, SAT, asks whether a propositional formula has at least one satisfying assignment.

SAT is decidable.

A brute-force algorithm can test all assignments.

For n variables, there are:

\[
2^n
\]

possibilities.

The problem may be hard, but it is decidable.

## Propositional Validity

Propositional validity is also decidable.

Build a truth table.

Check every assignment.

Finite structure guarantees termination.

## First-Order Validity

First-order logic is different.

Gödel's completeness theorem guarantees:

every valid first-order formula has a formal proof.

So valid formulas can be recognized by systematic proof search.

But this does not provide a decider.

## Church's Theorem

Church showed that first-order validity is undecidable.

There is no algorithm that always halts and correctly determines whether an arbitrary first-order formula is valid.

This was a negative solution to the Entscheidungsproblem.

## Turing's Route

Turing reached a related result through computation.

He proved that there is no general solution to the **halting problem**.

The undecidability of logical validity and computation became deeply connected.

## Halting Problem

The halting problem asks:

Given program P and input x, will P eventually halt on x?

Suppose we had:

\[
H(P,x)
\]

that always returns the correct answer.

Turing showed such a universal algorithm cannot exist.

## The Diagonal Idea

The proof constructs a program that behaves contrary to what the hypothetical halting decider predicts about itself.

Self-reference enters computation.

The structure resembles:

- Cantor diagonalization,
- Gödel self-reference.

Different fields meet at the same pattern.

## Recognizable but Not Decidable

The halting set is recognizable.

Simulate P on x.

If it halts, eventually observe that fact.

If it does not halt, the simulation never confirms nonhalting.

So:

yes is detectable.

no may not be.

## Semi-Decidability

This leads to **semi-decidable** problems.

A recognizer may halt on yes instances but run forever on no instances.

Decidability requires both sides to be computationally confirmable.

## Theoremhood

In many effectively axiomatized theories, theoremhood is recursively enumerable.

Enumerate all proofs.

If formula F has a proof, eventually find it.

If F has no proof, search may continue forever.

## Complete Theory Does Not Automatically Mean Decidable

Suppose a theory proves either:

\[
P
\]

or:

\[
\neg P
\]

for every sentence P.

If proofs are effectively enumerable, then one might run searches for both in parallel.

Under suitable assumptions, one will terminate.

So an effectively axiomatized complete consistent theory can often yield decidability of its theorem set.

This connection becomes important for Gödel.

## Decidability of Arithmetic Fragments

Some restricted arithmetic theories are decidable.

For example, **Presburger arithmetic**, which uses natural numbers with addition but not full multiplication, is decidable.

Restrict expressive power, and decision procedures may become possible.

## Multiplication Changes the Landscape

Once sufficiently rich arithmetic with multiplication is available, undecidability appears.

A small increase in expressive power can cross a major computational boundary.

Formal strength has costs.

## Tarski's Result for Real Numbers

Interestingly, the first-order theory of real closed fields is decidable.

This includes much algebra over the reals.

So "more mathematically sophisticated" does not simply mean "undecidable."

Structure matters.

## Geometry

Tarski's decision procedure implies decidability of elementary Euclidean geometry in a suitable formalization.

Some infinite mathematical domains remain algorithmically manageable.

## Hilbert's Tenth Problem

Hilbert asked for an algorithm deciding whether arbitrary polynomial equations with integer coefficients have integer solutions.

The final answer was negative.

No universal algorithm exists.

Arithmetic undecidability appears in concrete equations.

## Decidability and Formal Languages

A formal language may have decidable syntax.

Given a string, a parser can decide:

Is this well formed?

But semantic questions about what formulas imply may be undecidable.

Syntax can be easy while meaning is hard.

## Type Checking

Many programming languages deliberately design type systems so that type checking is decidable.

A compiler must finish.

More expressive type systems can make inference or verification harder or even undecidable.

Language design trades power against mechanization.

## Static Analysis

A static analyzer asks questions such as:

Will this variable ever be null here?

Perfectly answering all interesting semantic program properties is impossible in general.

Undecidability forces approximations.

## Rice's Theorem Preview

A broad result in computability says that essentially every nontrivial semantic property of arbitrary programs is undecidable.

This is Rice's theorem.

The message is severe:

general program behavior resists perfect automatic classification.

## Approximation

Undecidability does not stop engineering.

Tools use:

- conservative approximations,
- time limits,
- restricted languages,
- heuristics.

A problem can be undecidable in general yet tractable in useful special cases.

## Humans Do Not Escape the Theorem Automatically

If no algorithm decides a problem, this does not mean humans can always decide it.

Humans also fail, disagree, and stop.

Undecidability is not evidence of magical human capability.

It is a limit on uniform effective procedure.

## The Entscheidungsproblem Dream

Hilbert hoped for a systematic method settling formal logical questions.

Church and Turing showed that no general method exists.

Formalization succeeded so well that it allowed mathematics to prove:

some formal questions cannot be mechanically settled.

## Decidable vs Provable

These notions must be separated.

A sentence can be:

- provable,
- disprovable,
- undecidable in a theory.

A decision problem can be:

- algorithmically decidable,
- undecidable.

The word "undecidable" is used in both proof theory and computability, and context matters.

## Independence vs Algorithmic Undecidability

If statement P is independent of theory T, then:

\[
T\nvdash P
\]

and:

\[
T\nvdash\neg P
\]

That is theory-relative undecidability.

Algorithmic undecidability says:

no single algorithm solves every instance of a problem class.

Related ideas, but not identical.

## The Philosophical Lesson

Decidability asks whether truth can be converted into a terminating procedure.

For some domains, yes.

For sufficiently expressive domains, no.

There are questions whose answers are mathematically definite while no universal algorithm can always determine them.

## The Next Question

Decidability already limits mechanical reasoning.

Gödel found another boundary.

Even before asking whether an algorithm can find every proof, we can ask:

Can one sufficiently strong consistent formal theory prove every arithmetic truth expressible in its own language?

The answer is no.

That is:

**Gödel's First Incompleteness Theorem.**
