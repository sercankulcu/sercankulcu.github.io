---
title: 'Computational Complexity'
permalink: /nature/231-computational-complexity/
chapter: 13
chapter_title: 'Computation and Computer Science'
order: 231
tags:
   - computational-complexity
   - complexity-theory
   - p-vs-np
   - algorithms
   - resources
---

Computability asks:

Can a problem be solved by an algorithm at all?

Computational complexity asks:

How many resources are required?

This difference is crucial.

A problem can be perfectly computable and still be effectively impossible at realistic scales.

## Resources

The most common computational resources are:

- time,
- memory.

Other resources include:

- communication,
- randomness,
- parallel processors,
- energy.

Complexity theory studies how resource needs grow with input size.

## Input Size

Suppose an algorithm receives an integer n.

The relevant input size is usually not n itself.

It is the number of bits needed to represent n:

\[
\Theta(\log n)
\]

Representation matters.

## Time Complexity

If an algorithm takes \(T(n)\) steps on inputs of size n, we study how \(T(n)\) grows.

Examples:

\[
O(n)
\]

\[
O(n\log n)
\]

\[
O(n^2)
\]

\[
O(2^n)
\]

Growth rate matters more than small constant factors at large scale.

## Big-O

Big-O notation gives an asymptotic upper bound.

If:

\[
T(n)=O(n^2)
\]

then beyond some point, runtime grows no faster than a constant multiple of \(n^2\).

It describes scale, not exact seconds.

## Omega and Theta

\[
\Omega(f(n))
\]

gives an asymptotic lower bound.

\[
\Theta(f(n))
\]

means upper and lower bounds match asymptotically.

These symbols help describe algorithmic growth precisely.

## Polynomial Time

Algorithms with runtime:

\[
O(n^k)
\]

for fixed k are called polynomial-time.

Polynomial time is often treated as a rough mathematical model of efficient computation.

This is imperfect but foundational.

## Exponential Time

An algorithm requiring:

\[
O(2^n)
\]

grows much faster.

Doubling input size can square the effective search space.

Exponential algorithms quickly become impractical.

## Example

Suppose a machine checks one billion possibilities per second.

For:

\[
2^{30}
\]

possibilities, brute force is manageable.

For:

\[
2^{100}
\]

it is not.

Hardware improvements cannot easily defeat exponential growth.

## Class P

**P** is the class of decision problems solvable in polynomial time by deterministic algorithms.

Examples include many forms of:

- sorting-related decisions,
- shortest paths,
- linear programming.

P represents efficiently solvable problems in classical complexity theory.

## Class NP

**NP** is the class of decision problems whose yes answers can be verified in polynomial time given a suitable certificate.

Equivalently, NP can be defined using nondeterministic polynomial-time machines.

## Verification vs Discovery

This distinction is intuitive.

Finding a Sudoku solution may be hard.

Checking a completed valid solution is easy.

NP formalizes this kind of asymmetry.

## P Is Contained in NP

If a problem can be solved quickly, its answer can certainly be verified quickly.

Therefore:

\[
P\subseteq NP
\]

The famous question is whether the inclusion is strict.

## P vs NP

Does:

\[
P=NP
\]

or:

\[
P\neq NP?
\]

We do not know.

This is one of the most important open problems in mathematics and computer science.

## Why P vs NP Matters

If P = NP, then every efficiently verifiable problem would also be efficiently solvable in the asymptotic sense.

This would transform:

- optimization,
- theorem search,
- cryptography.

But polynomial exponents and constants would still matter in practice.

## NP-Complete Problems

A problem is **NP-complete** if:

- it is in NP,
- every problem in NP can be reduced to it in polynomial time.

NP-complete problems are the hardest problems in NP under this reduction notion.

## SAT

Boolean satisfiability was the first problem proved NP-complete.

This is the Cook–Levin theorem.

If SAT has a polynomial-time algorithm, then:

\[
P=NP
\]

## Reductions Again

Complexity reductions transfer efficient solvability.

If problem A reduces efficiently to problem B, then a fast algorithm for B gives a fast algorithm for A.

Reductions create a map of problem difficulty.

## Traveling Salesperson

The decision version of the Traveling Salesperson Problem asks:

Is there a tour of total length at most K?

It is NP-complete.

The optimization version seeks the shortest possible tour.

## Clique

Given a graph, does it contain a complete subgraph of size k?

This **Clique** problem is NP-complete.

Graph structure can encode general combinatorial difficulty.

## Independent Set

Does a graph contain k vertices with no edges among them?

This is another NP-complete problem.

Many apparently different problems share one computational core.

## Polynomial-Time Equivalence

The discovery of NP-completeness showed that:

- scheduling,
- logic,
- graph problems,
- puzzles

can be computationally equivalent under efficient reductions.

This is one of computer science's most surprising unifications.

## co-NP

The class **co-NP** contains complements of NP problems.

For example, propositional tautology is co-NP-complete.

Whether:

\[
NP=coNP
\]

is unknown.

## Certificates

For SAT:

a satisfying assignment is a short certificate.

For a tautology, there is no similarly obvious short certificate known for all cases.

This asymmetry connects proof complexity to complexity theory.

## PSPACE

**PSPACE** contains problems solvable using polynomial memory, even if they require much more time.

Some games and logical problems are PSPACE-complete.

Space can be reused.

Time and memory create different complexity landscapes.

## EXPTIME

**EXPTIME** contains problems solvable in exponential time.

Complexity classes form hierarchies.

Unlike P vs NP, we know:

\[
P\neq EXPTIME
\]

by time hierarchy results.

## Complexity Hierarchy

A simplified picture is:

\[
P\subseteq NP\subseteq PSPACE\subseteq EXPTIME
\]

Some containments may be equalities.

Some are known strict.

The map is only partially resolved.

## Space Complexity

An algorithm might take enormous time but little memory.

Another may be fast but memory-intensive.

Complexity is multidimensional.

No single "cost" captures everything.

## Randomized Complexity

Randomized algorithms introduce classes such as:

- BPP,
- RP.

Randomness can make algorithms dramatically faster in practice.

Whether it fundamentally expands efficient computation is a deep question.

## Quantum Complexity

Quantum computation introduces **BQP**.

Problems such as integer factoring have efficient known quantum algorithms.

Factoring is not known to be NP-complete.

Quantum computers reshape complexity without solving all hard problems.

## Shor's Algorithm

Shor's algorithm factors integers in polynomial time on an ideal quantum computer.

This threatens cryptosystems based on factoring hardness.

Complexity assumptions have practical consequences.

## Grover's Algorithm

Grover's algorithm provides a quadratic speedup for unstructured search.

Classically:

\[
O(N)
\]

queries.

Quantumly:

\[
O(\sqrt N)
\]

This is powerful but not an exponential miracle.

## Lower Bounds

To prove a problem is hard, we want lower bounds.

But lower bounds for general computational models are notoriously difficult.

P vs NP is fundamentally a lower-bound question.

## Complexity vs Undecidability

An undecidable problem has no algorithm.

An NP-complete problem has algorithms.

The issue is whether efficient ones exist.

Never confuse:

"computationally hard"

with:

"uncomputable."

## Practical Algorithms

Worst-case complexity does not always predict real performance.

SAT solvers handle many enormous industrial instances efficiently despite NP-completeness.

Instance structure matters.

## Parameterized Complexity

Parameterized complexity asks whether hardness can be isolated in some small parameter k.

A problem may be difficult in general but efficient when k is small.

This refines the simple polynomial/exponential distinction.

## Fixed-Parameter Tractability

A problem is fixed-parameter tractable if runtime has form roughly:

\[
f(k)n^{O(1)}
\]

The potentially expensive part depends mainly on parameter k.

This is useful for structured real-world problems.

## Approximation

For difficult optimization problems, exact optimum may be too expensive.

Approximation algorithms seek near-optimal solutions with guarantees.

Computational reality changes what "solution" means.

## Heuristics

Heuristics sacrifice guarantees for practical success.

Modern optimization often combines:

- exact algorithms,
- approximation,
- heuristics.

The best method depends on stakes and scale.

## Average-Case Complexity

Worst-case analysis may focus on rare pathological inputs.

Average-case complexity studies expected difficulty under an input distribution.

But choosing the distribution can be difficult.

## Cryptography

Cryptography relies on asymmetry:

some tasks should be easy with secret information and hard without it.

Security rests on computational difficulty, not mathematical impossibility.

Complexity assumptions become social infrastructure.

## One-Way Functions

A one-way function is easy to compute but hard to invert.

Their rigorous existence is linked to major unresolved complexity assumptions.

Modern cryptography depends on candidate constructions.

## Complexity and Intelligence

Intelligent behavior often requires searching enormous spaces.

Examples:

- planning,
- game playing,
- theorem proving.

Good intelligence does not merely compute.

It manages combinatorial explosion.

## Heuristic Search

A heuristic estimates which branch is promising.

A* search, for example, uses cost estimates to avoid exploring every path.

Intelligence often means exploiting structure to beat brute force.

## Complexity and Nature

If natural systems efficiently solve problems believed classically hard, this can reveal new computational resources.

Quantum computing is one example.

Physical law constrains the complexity of realizable computation.

## Complexity as a Scientific Constraint

A theory may predict something in principle.

But if extracting the prediction requires astronomical computation, operational predictability is limited.

Complexity creates an epistemic boundary inside computability.

## The Philosophical Lesson

Computability separates possible algorithmic tasks from impossible ones.

Complexity divides the possible tasks by resource demands.

Inside the computable world, scale creates another horizon.

A solution that exists mathematically may still be unreachable in practice.

## The Next Question

Computation is not restricted to silicon.

Cells regulate genes.

Brains process signals.

Immune systems adapt.

Can living systems themselves be understood as computational systems?

The next topic is:

**computation in living systems.**
