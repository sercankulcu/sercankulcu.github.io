---
title: 'Number Theory'
permalink: /nature/206-number-theory/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 206
tags:
   - number-theory
   - arithmetic
   - primes
   - integers
   - mathematics
---

Number theory studies integers.

That sounds narrow.

It is not.

From the simple sequence:

\[
0,1,2,3,\ldots
\]

emerge questions involving:

- primes,
- divisibility,
- equations,
- infinity,
- computation.

Number theory became central to both pure mathematics and modern cryptography.

## Integers

The integers are:

\[
\mathbb{Z}=\{\ldots,-2,-1,0,1,2,\ldots\}
\]

Their basic operations are:

- addition,
- subtraction,
- multiplication.

Division introduces complications.

## Divisibility

We say:

\[
a\mid b
\]

if there exists an integer k such that:

\[
b=ak
\]

Divisibility organizes arithmetic structure.

## Prime Numbers

A positive integer greater than 1 is **prime** if its only positive divisors are:

- 1,
- itself.

Examples:

\[
2,3,5,7,11,\ldots
\]

Primes are the building blocks of integers.

## Fundamental Theorem of Arithmetic

Every integer greater than 1 can be factored uniquely into primes, apart from order.

For example:

\[
60=2^2\cdot3\cdot5
\]

This is the **Fundamental Theorem of Arithmetic**.

It gives integers a unique multiplicative structure.

## Infinitely Many Primes

Euclid proved there are infinitely many primes.

Suppose there were only finitely many:

\[
p_1,p_2,\ldots,p_n
\]

Consider:

\[
N=p_1p_2\cdots p_n+1
\]

N is not divisible by any listed prime.

So another prime must exist.

## Distribution of Primes

Primes become less frequent as numbers grow.

But they never disappear.

Their distribution is irregular enough to appear mysterious and regular enough to admit deep theorems.

## Prime Number Theorem

The Prime Number Theorem says the number of primes up to x is approximately:

\[
\frac{x}{\ln x}
\]

for large x.

A seemingly chaotic sequence has asymptotic structure.

## Greatest Common Divisor

The **greatest common divisor** of a and b is the largest positive integer dividing both.

It is written:

\[
\gcd(a,b)
\]

The Euclidean algorithm computes it efficiently.

## Euclidean Algorithm

Repeated division with remainder gives:

\[
\gcd(a,b)
\]

This is one of the oldest algorithms in mathematics.

Number theory and computation have been linked for millennia.

## Modular Arithmetic

In modular arithmetic, numbers are considered according to their remainder.

We write:

\[
a\equiv b \pmod n
\]

if n divides \(a-b\).

This creates a cyclic arithmetic.

## Clock Arithmetic

Modulo 12:

\[
10+5\equiv3\pmod{12}
\]

This resembles a clock.

Modular arithmetic is fundamental in cryptography and computer science.

## Congruence Classes

Modulo n, integers are partitioned into equivalence classes.

Numbers with the same remainder are treated as equivalent.

This connects arithmetic to the broader concept of equivalence relations.

## Fermat's Little Theorem

If p is prime and a is not divisible by p, then:

\[
a^{p-1}\equiv1\pmod p
\]

This theorem is important in modular arithmetic and cryptographic algorithms.

## Euler's Theorem

A generalization uses Euler's totient function \(\varphi(n)\):

\[
a^{\varphi(n)}\equiv1\pmod n
\]

when a and n are coprime.

This sits behind RSA-style reasoning.

## Diophantine Equations

A **Diophantine equation** seeks integer solutions to polynomial equations.

Example:

\[
x^2+y^2=z^2
\]

Integer solutions form Pythagorean triples.

## Fermat's Last Theorem

Fermat claimed that for integers \(n>2\):

\[
x^n+y^n=z^n
\]

has no positive integer solutions.

The theorem resisted proof for centuries.

Andrew Wiles finally proved it in the 1990s using deep modern mathematics.

A simple statement can require enormous theory.

## Pell's Equation

Another classical form is:

\[
x^2-Dy^2=1
\]

for nonsquare D.

It has rich infinite families of integer solutions.

Number theory repeatedly turns simple equations into deep structure.

## Perfect Numbers

A perfect number equals the sum of its proper positive divisors.

For example:

\[
6=1+2+3
\]

The concept connects to Mersenne primes.

Ancient arithmetic questions remain active today.

## Twin Primes

Twin primes differ by 2:

\[
(3,5), (5,7), (11,13)
\]

Are there infinitely many?

This remains unproved.

Number theory contains elementary questions beyond current knowledge.

## Goldbach's Conjecture

Goldbach's conjecture says every even integer greater than 2 is the sum of two primes.

It has been checked computationally for huge ranges.

No general proof is known.

Evidence is not proof.

## Patterns and Proof

Number theory vividly separates:

- observed regularity,
- deductive theorem.

A conjecture can survive trillions of tests and still lack proof.

Finite computation cannot automatically establish a universal claim over all integers.

## Counterexamples

One counterexample can destroy a universal conjecture.

This asymmetry is central.

Verification may require infinite coverage.

Refutation may require one case.

## Number Theory and Logic

Arithmetic is expressive enough to encode:

- sequences,
- proofs,
- computations.

This fact becomes crucial for Gödel.

Number theory is not just about numbers.

It can encode syntax.

## Gödel Numbering Preview

Gödel assigned numbers to:

- symbols,
- formulas,
- proofs.

Arithmetic could then represent metamathematical statements.

Number theory became a language in which mathematics could talk about mathematics.

## Recursive Functions

Many number-theoretic functions are computable.

Examples include:

- addition,
- multiplication,
- gcd.

But not every arithmetically definable relation is decidable by an algorithm.

This will matter later.

## Hilbert's Tenth Problem

Hilbert asked for a general algorithm to decide whether any Diophantine equation has an integer solution.

Matiyasevich, building on work by Davis, Putnam, and Robinson, showed that no such algorithm exists.

Number theory contains undecidable questions.

## Cryptography

Modern public-key cryptography relies on number-theoretic problems.

Examples include:

- integer factorization,
- discrete logarithms.

Pure mathematics became infrastructure.

## RSA

RSA uses properties of modular arithmetic and large primes.

Its security depends on computational difficulty, not logical impossibility.

A problem can be decidable but practically hard.

## Complexity vs Computability

This distinction is essential.

Some questions are:

- computable but expensive.

Others are:

- uncomputable in principle.

Number theory contains examples relevant to both.

## Random-Looking Determinism

Prime numbers are completely deterministic.

Yet their local distribution often appears irregular.

This reminds us that:

deterministic

does not mean:

simple or predictable.

## The Philosophical Lesson

Number theory reveals how much complexity can emerge from elementary arithmetic.

Integers are simple to define.

Their global structure is not.

This makes arithmetic the perfect testing ground for formal reasoning.

## The Next Question

If arithmetic can be formalized, perhaps mathematics can become mechanical.

Could a procedure:

- generate proofs,
- settle every theorem,
- replace mathematical insight?

That was one of the great dreams of modern logic.

The next question is:

**Can mathematics be mechanized?**
