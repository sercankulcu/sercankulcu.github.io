---
title: 'Uncomputable Functions'
permalink: /nature/230-uncomputable-functions/
chapter: 13
chapter_title: 'Computation and Computer Science'
order: 230
tags:
   - uncomputable-functions
   - busy-beaver
   - computability
   - diagonalization
   - turing
---

A computable function has an algorithm.

Give it an input.

The algorithm eventually returns the correct output.

An **uncomputable function** has no such algorithm.

Not a slow algorithm.

Not an unknown algorithm.

No algorithm at all, within the standard model of effective computation.

## Count Programs

Every program has a finite description.

Finite strings over a finite alphabet are countable.

Therefore all programs can, in principle, be listed:

\[
P_1,P_2,P_3,\ldots
\]

So there are only countably many programs.

## Count Computable Functions

Each program computes at most one partial function under a fixed interpretation.

Therefore there are only countably many computable functions.

But how many functions are there from:

\[
\mathbb{N}\rightarrow\{0,1\}?
\]

Uncountably many.

## Cardinality Argument

Every such function corresponds to an infinite binary sequence.

The set of infinite binary sequences is uncountable.

Therefore:

most functions from natural numbers to bits are uncomputable.

This proves uncomputable functions exist without identifying a specific one.

## Existence vs Explicit Example

The counting argument is powerful.

But it is nonconstructive in spirit.

It says:

there must be uncomputable functions.

A more satisfying question is:

Can we define one explicitly?

Yes.

## Halting Function

Define:

\[
H(P,x)=
\begin{cases}
1 & P\text{ halts on }x\\
0 & P\text{ does not halt on }x
\end{cases}
\]

If H were computable, the halting problem would be decidable.

It is not.

Therefore H is uncomputable.

## Diagonal Function

Suppose we enumerate computable binary functions:

\[
f_1,f_2,f_3,\ldots
\]

Define:

\[
g(n)=1-f_n(n)
\]

Then g differs from each \(f_n\) at input n.

So g is not on the list.

This is another diagonal argument.

## Why the Diagonal Method Is So Powerful

The construction does not search outside the list randomly.

It creates a function guaranteed to disagree with each listed function in a designated position.

Cantor used the same structural idea for real numbers.

Gödel and Turing adapted it to self-reference.

## Busy Beaver

One of the most fascinating explicit uncomputable functions is **Busy Beaver**.

Informally, for machines of size n, ask:

Among all n-state machines that eventually halt, what is the maximum number of steps performed before halting?

Call this:

\[
BB(n)
\]

Exact definitions vary by machine convention.

## Busy Beaver Grows Enormously

Busy Beaver eventually grows faster than every computable function.

No algorithm can compute all its values.

Even modest input sizes become extraordinarily difficult.

## Why BB Is Uncomputable

Suppose we could compute:

\[
BB(n)
\]

Then for any n-state machine, simulate it for BB(n) steps.

If it has not halted by then, it never will.

That would decide halting for those machines.

Extending this gives a contradiction.

## Growth Beyond Algorithms

For every computable function f, eventually:

\[
BB(n)>f(n)
\]

Busy Beaver outruns:

- polynomials,
- exponentials,
- towers of exponentials,
- every computable growth function.

Its growth is not merely "very fast."

It crosses the computability boundary.

## Chaitin's Omega

Another famous uncomputable object is **Chaitin's constant**, often written:

\[
\Omega
\]

It encodes the halting probability of a universal prefix-free machine.

Its binary digits contain highly compressed information about halting.

## Omega and Algorithmic Randomness

The digits of \(\Omega\) are algorithmically random in a strong formal sense.

No program significantly shorter than the relevant prefix can generate arbitrarily long initial segments.

Uncomputability connects to information theory.

## Machine Dependence

The exact value of \(\Omega\) depends on the chosen universal machine.

So there is no single universal numerical constant with machine-independent digits.

The structural phenomenon is what matters.

## Computable Real Numbers

A real number is computable if an algorithm can approximate it to arbitrary precision.

Examples:

\[
\sqrt2,\ \pi,\ e
\]

These numbers may have infinitely many digits.

Infinite length does not imply uncomputability.

## Definable but Uncomputable

A number or function can have a finite mathematical definition and still be uncomputable.

This distinction is important.

"Definable" does not mean:

algorithmically generable.

## Most Reals Are Undefinable Too

There are only countably many finite descriptions in any fixed countable language.

There are uncountably many real numbers.

Therefore most real numbers cannot even be uniquely described by finite expressions in that language.

The mathematical continuum vastly exceeds explicit naming.

## Computable vs Recursive

Historically, computable functions are closely tied to:

- recursive functions,
- Turing-computable functions,
- lambda-definable functions.

Different formalisms converge on the same class.

## Partial Functions

Some programs fail to halt on certain inputs.

They compute **partial functions**.

Computability theory often studies partial computable functions because nontermination is itself fundamental.

## Total Uncomputable Functions

A function may have a mathematically defined output for every input and still be uncomputable.

The halting characteristic function is total:

every program either halts or does not.

Yet no algorithm computes that bit for all cases.

## Mathematical Existence Exceeds Algorithmic Access

This reveals a conceptual gap.

A function can be perfectly well-defined mathematically.

But there may be no effective method to calculate its values.

Definition is broader than computation.

## Uncomputable Does Not Mean Incomprehensible

We can prove properties of uncomputable functions.

For Busy Beaver, we know:

- it is defined,
- it is uncomputable,
- it dominates computable functions.

We can understand structure without being able to calculate every value.

## Individual Values May Be Knowable

Some early values of Busy Beaver are known.

An uncomputable function can have specific values that are provable.

What fails is one algorithm computing all values.

Again, universal limitation does not erase local knowledge.

## Oracles

Imagine a hypothetical oracle that answers halting questions.

With it, we could compute functions ordinary Turing machines cannot.

But relative to that stronger machine, new uncomputable functions appear.

There is no simple final escape.

## Turing Jump

The **Turing jump** takes a computational problem and forms a harder halting problem relative to it.

This generates hierarchies of uncomputability.

The landscape beyond computability is structured.

## Uncomputable Functions in Mathematics

Many mathematical objects can encode undecidable information.

Examples arise in:

- number theory,
- dynamical systems,
- tilings,
- group theory.

Uncomputability is not confined to artificial computer puzzles.

## Physical Meaning

Can an uncomputable function be physically realized by nature?

If physical processes could reliably compute one, they would exceed Turing computation.

No accepted empirical evidence currently establishes such hypercomputation.

## Analog Precision

Some mathematical physical models appear to manipulate exact real numbers containing infinite information.

But a physical device would need to:

- prepare,
- preserve,
- measure

infinite precision.

That is a severe obstacle.

## Prediction and Uncomputability

If a physical system can encode universal computation, some prediction questions about it can become undecidable.

Then even perfect knowledge of local laws may not yield a universal predictive algorithm.

Computability can limit scientific prediction.

## The Universe and Uncomputable Structure

Whether fundamental physics itself contains uncomputable quantities is a deep question.

Mathematical models may include arbitrary real-valued parameters.

But physical measurability may restrict operational access.

## The Philosophical Lesson

Uncomputable functions show that mathematical definition is larger than algorithmic procedure.

There are precise input-output relations that no general program can calculate.

Computation occupies a vast but bounded region of mathematical possibility.

## The Next Question

Most everyday computer science lives inside the computable region.

There, the question changes from:

Can it be computed?

to:

Can it be computed efficiently?

That is the subject of:

**computational complexity.**
