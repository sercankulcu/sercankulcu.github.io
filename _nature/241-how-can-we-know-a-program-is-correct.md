---
title: 'How Can We Know a Program Is Correct?'
permalink: /nature/241-how-can-we-know-a-program-is-correct/
chapter: 13
chapter_title: 'Computation and Computer Science'
order: 241
tags:
   - program-correctness
   - verification
   - testing
   - hoare-logic
   - formal-methods
---

A program runs.

It produces output.

It passes tests.

Is it correct?

That question is deeper than it first appears.

To call a program correct, we need more than successful execution.

We need a specification of what the program is supposed to do.

## Correct Relative to What?

A program cannot be correct in the abstract.

It is correct relative to a **specification**.

Suppose a sorting function receives:

\[
[a_1,a_2,\ldots,a_n]
\]

A reasonable specification might require:

- output contains exactly the same elements,
- output is in nondecreasing order.

Only then can correctness be evaluated.

## Specification Comes First

Without a specification, observed behavior may look acceptable while violating the actual goal.

A program that always returns:

`42`

is perfectly predictable.

It is not a correct sorting algorithm.

Correctness is a relation between:

- implementation,
- intended behavior.

## Functional Correctness

Functional correctness asks whether the program returns the right result.

For a function computing factorial:

\[
f(n)=n!
\]

we want:

\[
program(n)=n!
\]

for every valid n.

## Partial Correctness

A program is partially correct if:

whenever it terminates,

its result satisfies the specification.

This does not guarantee termination.

An infinite loop can be partially correct in a vacuous sense if it never returns an incorrect result.

## Total Correctness

Total correctness requires:

- partial correctness,
- termination.

So the program must:

1. eventually finish,
2. produce the correct result.

This is usually what users mean by "works."

## Testing

The most common way to gain confidence is testing.

Run the program on selected inputs.

Compare actual output with expected output.

Testing is essential.

But testing has limits.

## Dijkstra's Observation

A famous principle attributed to Edsger Dijkstra is that testing can reveal the presence of bugs, but not prove their absence.

The reason is simple.

A program may have infinitely many possible inputs or states.

A finite test suite samples only some of them.

## Exhaustive Testing

For small finite domains, exhaustive testing may be possible.

A Boolean function with three inputs has only:

\[
2^3=8
\]

cases.

Test all eight.

But real systems often have enormous state spaces.

## State Explosion

Suppose a system has 100 Boolean state variables.

Then there are:

\[
2^{100}
\]

possible configurations.

Exhaustive testing becomes impossible.

Combinatorial explosion limits brute-force confidence.

## Edge Cases

Good testing seeks inputs likely to reveal mistakes:

- empty input,
- minimum values,
- maximum values,
- duplicate values,
- malformed input.

Boundary conditions often expose hidden assumptions.

## Property-Based Testing

Instead of listing expected outputs manually, property-based testing specifies general properties.

For sorting:

- result is ordered,
- result is a permutation of input.

The testing framework generates many examples.

This improves coverage.

But it still does not prove universality.

## Random Testing

Random inputs can expose unexpected bugs.

They are especially useful when the input space is large.

Yet randomness can miss rare failures.

Probability of detection is not proof of absence.

## Fuzzing

Fuzzing generates unusual, malformed, or adversarial inputs.

It has become extremely effective in security testing.

Fuzzers discover crashes that human-written tests may overlook.

Again, discovery of bugs is easier than certification of no bugs.

## Static Analysis

Static analysis examines code without executing every possible run.

It can infer properties such as:

- variable initialization,
- possible null references,
- unreachable code.

Static analysis trades precision against tractability.

## Sound Analysis

A sound analyzer may guarantee:

If it says a certain error cannot occur, then the error really cannot occur within the model.

To remain sound, it may produce false alarms.

## Incomplete Analysis

Because general semantic program properties are undecidable, no static analyzer can be both:

- perfect,
- universally applicable

for arbitrary programs.

Undecidability becomes an engineering fact.

## Assertions

An assertion states a condition expected to be true at some point.

Example:

```text
assert balance >= 0
```

Assertions convert assumptions into executable checks.

They make hidden expectations visible.

## Preconditions

A **precondition** describes what must hold before a function runs.

For division:

\[
b\neq0
\]

may be required.

Correctness can depend on callers satisfying the precondition.

## Postconditions

A **postcondition** describes what must hold after execution.

For:

\[
max(a,b)
\]

we might require:

\[
result\geq a
\]

and:

\[
result\geq b
\]

and:

\[
result=a \lor result=b
\]

## Hoare Triples

Tony Hoare introduced a notation:

\[
\{P\}\ C\ \{Q\}
\]

where:

- P is precondition,
- C is program,
- Q is postcondition.

It means:

If P holds before C, and C terminates appropriately, then Q holds afterward.

## Example

For:

```text
x := x + 1
```

we may write:

\[
\{x=4\}\ x:=x+1\ \{x=5\}
\]

This turns program behavior into logical reasoning.

## Hoare Logic

Hoare logic provides rules for reasoning about:

- assignments,
- sequences,
- conditionals,
- loops.

Programs become mathematical objects.

Correctness becomes proof.

## Loop Invariants

Loops are especially difficult.

A **loop invariant** is a property true:

- before the loop,
- after every iteration.

At termination, the invariant helps establish the postcondition.

## Example: Summation

Suppose after k iterations:

\[
sum=a_1+\cdots+a_k
\]

If this invariant is preserved, then when k reaches n:

\[
sum=a_1+\cdots+a_n
\]

The invariant compresses reasoning across arbitrarily many iterations.

## Termination Proofs

Correct output is not enough.

We also need to show a loop terminates.

A common method uses a **variant** or ranking function that:

- decreases each iteration,
- cannot decrease forever.

Natural numbers provide a well-founded order.

## Structural Recursion

Functional programs often guarantee termination by recursive calls on structurally smaller data.

A tree function calls itself on subtrees.

The structure itself provides a termination measure.

## Formal Verification

Formal verification uses mathematical proof to establish program properties.

Instead of testing examples, we prove:

for every allowed input,

the specification holds.

This can provide extremely strong assurance.

## Proof Assistants

Systems such as:

- Coq,
- Lean,
- Isabelle

allow machine-checked proofs.

A human constructs or guides the proof.

A small trusted kernel checks correctness.

## Model Checking

Model checking explores state-transition models automatically.

It verifies properties such as:

- safety,
- liveness,
- deadlock freedom.

For finite-state systems, model checking can be exhaustive.

## Temporal Logic

Properties of reactive systems often concern time.

Examples:

- request is eventually answered,
- two processes are never simultaneously in a critical section.

Temporal logic expresses such requirements.

## Safety

A safety property says:

something bad never happens.

Example:

Two trains never occupy the same track section.

A finite bad prefix can often demonstrate failure.

## Liveness

A liveness property says:

something good eventually happens.

Example:

Every accepted request eventually receives a response.

Liveness is different from absence of error.

## Refinement

Large systems can be verified through refinement.

Start with an abstract specification.

Gradually introduce implementation detail.

At each step, prove behavior is preserved.

This manages complexity.

## Type Systems

Type systems are lightweight formal verification.

A compiler may prove properties such as:

- this operation receives an integer,
- this reference cannot be null,
- this value has the required ownership.

Types eliminate whole categories of mistakes.

## Dependent Types

Dependent type systems allow types to express richer properties involving values.

For example, a vector type might encode its length.

Programs and proofs begin to merge.

## Curry–Howard Returns

The Curry–Howard correspondence relates:

- propositions to types,
- proofs to programs.

A program inhabiting a type can serve as evidence for a proposition.

Logic and computation meet again.

## Verified Compilers

A verified compiler has machine-checked proofs that compilation preserves specified program semantics.

This reduces one part of the trusted computing base.

But hardware and specifications still matter.

## Specification Bugs

A program can be verified against the wrong specification.

Formal proof then guarantees the wrong thing perfectly.

Verification cannot rescue a mistaken goal.

## The Specification Problem

Suppose an autonomous vehicle is specified to:

"minimize travel time."

The implementation may satisfy this exactly.

But the specification may omit:

- safety,
- comfort,
- legality.

Correctness is only as meaningful as the specification.

## Security Correctness

Security introduces adversaries.

A program may be functionally correct yet vulnerable to:

- side channels,
- injection,
- privilege escalation.

Security properties require explicit threat models.

## Probabilistic Programs

Some algorithms are randomized.

Correctness may be expressed probabilistically:

\[
Pr[\text{correct output}] \geq 1-\epsilon
\]

Verification must then reason about distributions.

## Numerical Programs

Floating-point arithmetic introduces approximation.

A mathematically correct real-number algorithm can behave differently in finite precision.

Correctness may require error bounds.

## Concurrency

Concurrent programs are especially hard to reason about.

Possible interleavings can explode combinatorially.

Bugs may appear only under rare timing conditions.

## Race Conditions

A race condition occurs when result depends on uncontrolled ordering of concurrent events.

Traditional deterministic testing may miss it.

Correctness must include synchronization properties.

## Distributed Systems

Distributed systems introduce:

- delay,
- message loss,
- partial failure.

No component sees the whole system instantly.

Correctness must be defined under explicit assumptions about the network.

## Fault Models

A distributed protocol may be correct if:

- at most f nodes fail,
- messages are eventually delivered.

Change the assumptions and the proof may no longer apply.

Correctness is conditional.

## The Real Meaning of a Proof

A correctness proof establishes:

Given these assumptions,

this implementation satisfies this specification.

That is enormously valuable.

It is not metaphysical certainty about the entire physical world.

## Hardware Faults

Formal software proofs usually assume hardware behaves according to a model.

Cosmic rays, manufacturing faults, or malicious hardware may violate it.

Every proof has a boundary.

## Compiler and Toolchain

Source-level correctness may depend on the compiler preserving semantics.

Compilers themselves can have bugs.

Verified toolchains reduce this risk.

Trust can be narrowed but not eliminated entirely.

## Human Review

Code review remains useful because many failures involve:

- misunderstood requirements,
- maintainability,
- architecture.

Formal methods answer precise questions.

Humans decide which questions matter.

## Testing and Proof Are Complementary

Testing is excellent for:

- discovering unexpected behavior,
- validating assumptions about real environments.

Proof is excellent for:

- universal claims inside a model.

Strong engineering uses both.

## The Philosophical Lesson

Program correctness is never just:

"It seems to work."

It is a structured relationship among:

- specification,
- implementation,
- assumptions,
- proof or evidence.

Formal verification can provide remarkable certainty.

But certainty is always relative to what has been formalized.

## The Next Question

Computer science gives us models powerful enough to:

- predict,
- simulate,
- verify,
- explain.

But how far can computational explanation go?

Can computation explain:

- life,
- mind,
- physical law?

Or is it only one level among many?

The next essay asks:

**Can Computation Explain Nature?**
