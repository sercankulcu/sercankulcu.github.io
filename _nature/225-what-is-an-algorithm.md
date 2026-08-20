---
title: 'What Is an Algorithm?'
permalink: /nature/225-what-is-an-algorithm/
chapter: 13
chapter_title: 'Computation and Computer Science'
order: 225
tags:
   - algorithms
   - computation
   - procedures
   - correctness
   - computer-science
---

An algorithm is a procedure.

But not every procedure deserves the name.

A recipe says:

"cook until ready."

An algorithm demands more precision.

It specifies a sequence or structure of effective steps for solving a class of problems.

## The Basic Idea

An algorithm takes:

- input,

performs:

- well-defined operations,

and produces:

- output.

For example:

input: two integers.

task: compute their greatest common divisor.

output: the gcd.

## Euclid's Algorithm

One of the oldest known algorithms computes:

\[
\gcd(a,b)
\]

by repeated remainder operations.

For:

\[
a>b
\]

replace:

\[
(a,b)
\]

with:

\[
(b,a\bmod b)
\]

until the remainder becomes zero.

The last nonzero divisor is the gcd.

## Example

Find:

\[
\gcd(48,18)
\]

Compute:

\[
48=2\cdot18+12
\]

Then:

\[
18=1\cdot12+6
\]

Then:

\[
12=2\cdot6+0
\]

Therefore:

\[
\gcd(48,18)=6
\]

Finite steps.

Definite answer.

## Finiteness of Description

An algorithm should have a finite description.

It may operate on arbitrarily large inputs.

But the procedure itself is specified finitely.

Finite rules can govern infinite input domains.

## Definiteness

Each step must be precise enough to execute.

Instructions like:

"choose a good number"

are not algorithmic unless "good" is operationally defined.

Ambiguity must be removed.

## Effective Steps

Operations should be mechanically realizable in the intended model.

For example:

- compare two finite integers,
- add numbers,
- move a tape head.

An algorithm cannot contain an oracle step like:

"determine whether this arbitrary program will ever halt."

## Input

An algorithm generally accepts input from a specified domain.

Examples:

- arrays,
- graphs,
- integers,
- strings.

The representation of input affects implementation.

## Output

Correctness requires a defined relationship between input and output.

For sorting:

Input:

\[
[a_1,\ldots,a_n]
\]

Output:

the same elements arranged in nondecreasing order.

The specification comes before the implementation.

## Termination

Traditional algorithms are expected to terminate for every valid input.

This distinguishes an algorithm that computes a total function from a procedure that may diverge.

But computer science also studies partial algorithms and ongoing processes.

## Partial Computation

A program may halt only on some inputs.

It computes a **partial function**.

Theoretical computability includes such cases.

So the word "algorithm" can be used more narrowly or broadly depending on context.

## Reactive Systems

An operating system is not supposed to terminate.

Neither is a web server.

Such systems perform ongoing computation.

The classical input-process-output model must be generalized for interactive systems.

## Correctness

An algorithm is correct if it satisfies its specification.

Two aspects are often separated:

- partial correctness,
- termination.

Together they imply total correctness.

## Partial Correctness

Partial correctness says:

If the algorithm terminates, the result is correct.

It does not guarantee termination.

## Total Correctness

Total correctness says:

- the algorithm terminates,
- the result is correct.

This is the stronger property.

## Loop Invariants

A **loop invariant** is a property that remains true across loop iterations.

Invariants help prove algorithms correct.

They connect procedural execution to mathematical reasoning.

## Example: Sum Loop

Suppose a loop accumulates the sum of the first k elements.

An invariant may state:

After k iterations, variable `sum` equals:

\[
a_1+\cdots+a_k
\]

At termination, the invariant gives the final result.

## Recursion

Algorithms can also be recursive.

A recursive algorithm solves a problem by reducing it to smaller instances.

Example:

factorial.

\[
n! = n(n-1)!
\]

with base case:

\[
0!=1
\]

## Recursion Must Progress

A recursive definition does not automatically terminate.

Each call must move toward a base case.

Otherwise recursion can continue indefinitely.

## Deterministic Algorithms

A deterministic algorithm makes one prescribed next move from each state.

Same input:

same execution path,

assuming the environment is fixed.

## Randomized Algorithms

A randomized algorithm uses random choices.

The same input may produce different execution paths.

Correctness may be probabilistic.

Examples include:

- randomized quicksort,
- Monte Carlo methods.

## Las Vegas Algorithms

A **Las Vegas** algorithm always returns a correct result but its runtime is random.

Randomness affects efficiency, not correctness.

## Monte Carlo Algorithms

A **Monte Carlo** algorithm has bounded runtime characteristics but may have a small probability of error.

Repeated execution can often reduce that probability.

## Approximation Algorithms

Some optimization problems are too expensive to solve exactly at useful scales.

An approximation algorithm guarantees a solution within a known factor of optimal.

Correctness becomes quantitative.

## Heuristics

A heuristic may work well without a formal guarantee.

Examples include:

- greedy guesses,
- local search strategies.

A heuristic is not necessarily an algorithm with guaranteed quality, though it is implemented algorithmically.

## Algorithm vs Program

An algorithm is abstract.

A program is a concrete implementation in a language.

The same sorting algorithm can be implemented in:

- C,
- Python,
- Java.

One algorithm, many programs.

## Algorithm vs Code

Code contains implementation details:

- memory layout,
- APIs,
- error handling.

The algorithm abstracts from many of them.

This is why algorithms can be studied mathematically.

## Data Structures Matter

An algorithm does not operate in a vacuum.

The representation of data affects operations.

Searching an unsorted array differs from searching a balanced tree.

Algorithm and data structure are often designed together.

## Complexity

Two algorithms can compute the same function but require very different resources.

We measure:

- time,
- memory,
- communication,
- randomness.

Correctness alone is not enough.

## Big-O Notation

Asymptotic notation describes growth.

For example:

\[
O(n)
\]

means runtime grows at most linearly up to constant factors in the asymptotic sense.

\[
O(n^2)
\]

grows quadratically.

## Worst Case

Worst-case analysis asks:

How much resource can the algorithm require on the hardest input of size n?

This provides guarantees.

## Average Case

Average-case analysis depends on a distribution over inputs.

It may better reflect practical performance.

But the assumed distribution matters.

## Amortized Analysis

Some individual operations are expensive.

Yet over a sequence, average cost per operation may be small.

**Amortized analysis** captures this.

Dynamic arrays are a classic example.

## Correct but Impractical

An exponential-time algorithm can be perfectly correct and still useless for large inputs.

Algorithm design balances:

- correctness,
- efficiency,
- simplicity.

## Algorithms Before Computers

Algorithms are older than electronic computers.

Examples include:

- Euclid's algorithm,
- long division,
- methods for solving equations.

Computer science did not invent algorithms.

It made them central.

## Algorithms as Knowledge

An algorithm captures procedural knowledge.

Instead of merely knowing:

the answer,

we know:

how to obtain answers for an entire class of inputs.

Algorithms compress infinitely many problem solutions into finite instructions.

## Algorithms and Explanation

Sometimes an algorithm also explains structure.

Euclid's algorithm reveals relationships among divisibility and remainders.

Other algorithms merely produce results efficiently.

Computation and understanding are related but not identical.

## Algorithms in Nature?

Can biological processes be called algorithms?

DNA replication follows highly structured mechanisms.

Development follows regulatory processes.

But calling them algorithms is most useful when the analogy specifies:

- states,
- rules,
- information flow.

Otherwise the term can become metaphorical.

## Social Algorithms

Institutions also use procedures:

- election rules,
- matching procedures,
- allocation mechanisms.

Algorithms increasingly organize social decisions.

Their design embeds values.

## Algorithmic Bias

An algorithm can be mathematically correct relative to its specification and still produce unfair outcomes.

Why?

Because:

- data,
- objective function,
- categories

may reflect social choices.

Correctness is not ethics.

## The Algorithm Does Not Choose Its Goal

An optimization algorithm finds what its objective asks for.

If the objective is wrong, better optimization can worsen the result.

This becomes critical in AI.

## Church–Turing Boundary

An algorithm, in the classical sense, must be an effective procedure.

The Church–Turing thesis claims such procedures are captured by Turing-computable processes.

This gives the concept mathematical boundaries.

## The Philosophical Lesson

An algorithm is a finite, precise, effective procedure for transforming inputs into outputs or governing a computation.

Its quality depends on more than correctness.

We also care about:

- termination,
- efficiency,
- robustness,
- purpose.

## The Next Question

Algorithms transform something.

But what exactly is being processed?

Numbers?

Symbols?

Signals?

Representations?

The next essay turns to:

**information processing.**
