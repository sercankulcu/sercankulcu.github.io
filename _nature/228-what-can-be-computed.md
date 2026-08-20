---
title: 'What Can Be Computed?'
permalink: /nature/228-what-can-be-computed/
chapter: 13
chapter_title: 'Computation and Computer Science'
order: 228
tags:
   - computability
   - turing-computability
   - church-turing-thesis
   - undecidability
   - algorithms
---

Computers keep getting faster.

Memory grows.

Algorithms improve.

It is tempting to imagine that enough engineering can eventually solve every precisely stated problem.

Computability theory says no.

Some problems are not merely difficult.

They are impossible for any algorithm in the classical sense.

## Computable Function

A function:

\[
f:\mathbb{N}\rightarrow\mathbb{N}
\]

is computable if there exists an effective procedure that, for every valid input n:

- halts,
- returns \(f(n)\).

The exact machine model does not matter if it has ordinary Turing power.

## Many Models, Same Boundary

The following models compute the same broad class of functions:

- Turing machines,
- lambda calculus,
- partial recursive functions,
- register machines.

This convergence is one reason computability theory is so robust.

## Church–Turing Thesis

The Church–Turing thesis states, roughly:

Anything that can be computed by an effective mechanical procedure can be computed by a Turing machine.

It connects the informal concept:

effective method

with a formal model.

## Computable Numbers

A real number is **computable** if there is an algorithm that can generate approximations to arbitrary precision.

Examples include:

- rational numbers,
- \(\sqrt2\),
- \(\pi\),
- \(e\).

Many familiar constants are computable.

## Most Real Numbers Are Not Computable

There are only countably many finite programs.

Therefore only countably many computable real numbers.

But the real numbers are uncountable.

So most real numbers are uncomputable.

This is a cardinality argument.

## Why This Is Strange

Most real numbers cannot be individually specified by any finite program that computes their digits.

Yet we rarely encounter such numbers explicitly.

Definable mathematics occupies a tiny structured subset of the real line.

## Decision Problems

Computability also applies to yes/no questions.

A set is decidable if an algorithm always determines membership.

Examples:

- even number?
- prime number?
- propositional formula satisfiable?

Some problems are decidable.

Others are not.

## Recognition

A problem may be recognizable without being decidable.

If the answer is yes, a program eventually confirms it.

If no, the program may run forever.

The halting problem has this structure.

## Halting Problem Preview

Given program P and input x:

Will P halt?

Turing proved no general algorithm can decide this for every P and x.

The next essay will examine the proof in detail.

## Uncomputable Functions

An uncomputable function has no algorithm that returns the correct result for every input.

This is stronger than saying:

we have not found an algorithm.

It means no such algorithm exists within the computational model.

## Busy Beaver

The **Busy Beaver** function is a famous example.

For a given machine size n, ask for the maximum number of steps taken by any halting n-state Turing machine before it halts.

The function grows faster than every computable function.

It is uncomputable.

## Why Busy Beaver Is So Extreme

If we could compute Busy Beaver exactly, we could solve corresponding halting questions.

So its values eventually outrun every algorithmic growth pattern.

Uncomputability can manifest as extreme growth.

## Program Equivalence

Can an algorithm determine whether two arbitrary programs compute the same function?

In general, no.

Program semantics contains undecidable properties.

## Rice's Theorem

**Rice's theorem** says, roughly:

Every nontrivial semantic property of the function computed by an arbitrary program is undecidable.

Examples include:

- Does this program ever output 0?
- Does it compute a constant function?
- Does it accept every input?

General semantic analysis hits a wall.

## Syntax vs Semantics Again

Syntactic questions are often decidable:

- Is this program grammatically valid?

Semantic questions can be undecidable:

- Will it ever produce this behavior?

Meaning is computationally harder than form.

## Hilbert's Tenth Problem

Given a polynomial equation with integer coefficients:

Does it have an integer solution?

There is no algorithm that always decides the answer.

A concrete problem in number theory is uncomputable.

## Word Problems

Many algebraic systems have **word problems**:

Do two symbolic expressions represent the same element?

Some specific systems have algorithms.

Others have undecidable word problems.

Uncomputability appears throughout mathematics.

## Domino Problem

Given a finite set of tile types with matching rules:

Can they tile the infinite plane?

The general problem is undecidable.

A geometric-looking puzzle can encode computation.

## Post Correspondence Problem

Given pairs of strings, ask whether a sequence can be chosen so concatenated top and bottom strings match.

This simple-looking problem is undecidable.

Computational universality hides in symbolic puzzles.

## Reductions

How do we prove new problems undecidable?

A central technique is **reduction**.

If problem A is already known undecidable, and an algorithm for B would solve A, then B must also be undecidable.

Hardness transfers.

## Many-One Reduction

A many-one reduction transforms any instance x of A into instance \(f(x)\) of B such that:

\[
x\in A \iff f(x)\in B
\]

If B were decidable, A would be too.

So B inherits impossibility.

## Reductions as Explanation

A reduction does more than prove hardness.

It reveals structural similarity.

A scheduling problem may secretly contain SAT.

A geometry problem may secretly contain computation.

Reduction uncovers hidden computational content.

## Semi-Decidable Boundaries

Some undecidable problems remain recursively enumerable.

Others are not even recognizable.

Computability has a hierarchy.

"Uncomputable" is not one uniform category.

## Arithmetic Hierarchy Preview

Sets can be classified by increasing logical complexity involving alternating quantifiers over computable relations.

This leads to the **arithmetical hierarchy**.

The landscape beyond decidability has internal structure.

## Oracle Machines

What if a machine receives perfect answers to the halting problem?

Then it can solve more problems.

Such a hypothetical device is an **oracle machine**.

But a new, harder halting problem appears relative to the oracle.

The hierarchy continues.

## Turing Degrees

Uncomputable sets can be compared by how much computational power they contain.

This leads to **Turing degrees**.

Some uncomputable problems are strictly more informative than others.

Uncomputability has levels.

## Hypercomputation

Researchers have proposed hypothetical models that exceed Turing machines.

Examples invoke:

- infinite time,
- exotic spacetime,
- exact real-number operations.

Whether any such model is physically realizable is highly doubtful and unresolved in some formulations.

## Physical Constraints Matter

Mathematical models can assume:

- infinite precision,
- infinite memory,
- unbounded acceleration.

Physical reality may not permit them.

A model exceeding Turing computation is not automatically an engineering possibility.

## Quantum Computers

Quantum computers can outperform known classical algorithms on important problems.

But standard quantum computation is not believed to compute uncomputable functions.

It changes complexity.

Not the classical computability boundary.

## Analog Computers

Idealized analog models with exact real numbers can appear to exceed Turing power.

But exact infinite precision is physically problematic.

Implementation assumptions determine claimed power.

## Computable vs Feasible

A problem can be computable yet infeasible.

Factorization is computable.

Exhaustive chess search is finite in principle.

Resource requirements may still be overwhelming.

Computability gives the outer boundary.

Complexity studies life inside it.

## Finite Problems

Any single finite instance can, in a trivial sense, have its answer encoded in a lookup table.

Undecidability concerns one algorithm handling an infinite class of instances.

This distinction prevents confusion.

## "Could a Bigger Computer Solve It?"

For an undecidable problem:

no finite increase in:

- speed,
- memory,
- parallelism

creates a universal decider.

The obstacle is not resource quantity.

It is logical structure.

## Human Mathematicians

A human may solve particular instances of an undecidable problem.

That does not produce a universal method.

Undecidable means:

no algorithm solves all cases.

Individual success remains possible.

## Proof Systems

A formal theory may prove many cases of a problem.

But no fixed effective theory of sufficient arithmetic strength decides every relevant truth.

Gödel and Turing illuminate different sides of the same landscape.

## Computation Has a Horizon

The boundary of computability is remarkable because it is mathematically sharp.

We can prove:

no algorithm exists.

This is stronger than empirical pessimism.

It is impossibility from formal assumptions.

## The Philosophical Lesson

Computation is enormously powerful but not universal.

There are:

- functions no algorithm computes,
- properties no program decides,
- truths no fixed effective formal theory captures completely.

The existence of these boundaries is itself one of computation's greatest discoveries.

## The Next Question

The most famous computational impossibility is the one Turing used to reveal the boundary.

Given an arbitrary program and input:

Will the program ever stop?

No universal algorithm can always answer.

The next essay is:

**The Halting Problem.**
