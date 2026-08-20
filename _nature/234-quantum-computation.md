---
title: 'Quantum Computation'
permalink: /nature/234-quantum-computation/
chapter: 13
chapter_title: 'Computation and Computer Science'
order: 234
tags:
   - quantum-computation
   - qubits
   - quantum-information
   - complexity
   - entanglement
---

Classical computers process bits.

Quantum computers process **qubits**.

That sounds like a small change.

It is not.

Quantum states obey a mathematical structure that allows:

- superposition,
- interference,
- entanglement.

Quantum algorithms exploit these features to reorganize computational possibility.

## Classical Bit

A classical bit has one of two states:

\[
0
\]

or:

\[
1
\]

A classical register of n bits occupies one definite bit string at a time.

## Qubit

A qubit can be in a state:

\[
|\psi\rangle=\alpha|0\rangle+\beta|1\rangle
\]

where \(\alpha\) and \(\beta\) are complex amplitudes satisfying:

\[
|\alpha|^2+|\beta|^2=1
\]

This is a quantum superposition.

## Superposition Is Not "Both Values" in the Ordinary Sense

Popular explanations often say a qubit is:

0 and 1 at the same time.

That is suggestive but imprecise.

A qubit is in a quantum state whose measurement statistics are determined by amplitudes.

It is not simply a classical hidden pair of values.

## Measurement

When measured in the computational basis, the qubit yields:

0

with probability:

\[
|\alpha|^2
\]

and:

1

with probability:

\[
|\beta|^2
\]

Measurement converts quantum possibilities into classical outcomes.

## Amplitudes vs Probabilities

Quantum algorithms manipulate **amplitudes**, not just probabilities.

Amplitudes can:

- reinforce,
- cancel.

This interference is where quantum advantage often comes from.

## Interference

Suppose two computational paths contribute amplitudes to the same output.

Their amplitudes can combine:

constructively,

or:

destructively.

A good quantum algorithm arranges interference so desirable answers become more likely.

## Multiple Qubits

A two-qubit system has basis states:

\[
|00\rangle,\ |01\rangle,\ |10\rangle,\ |11\rangle
\]

A general state is a superposition of all four.

For n qubits, the state vector has:

\[
2^n
\]

complex amplitudes.

## The Exponential State Space

This exponential representation is one reason quantum systems are difficult to simulate classically.

But it does not mean a quantum computer simply evaluates all \(2^n\) answers and lets us read them out.

Measurement returns limited classical information.

Algorithm design must exploit interference.

## Entanglement

Two qubits can occupy a state that cannot be factored into separate individual states.

Example:

\[
\frac{|00\rangle+|11\rangle}{\sqrt2}
\]

This is an entangled state.

The joint system has structure not reducible to independent qubit states.

## Entanglement Is Correlation Plus Quantum Structure

Entanglement produces correlations impossible to reproduce with ordinary local hidden-variable models.

Bell's theorem makes this precise.

But entanglement does not permit faster-than-light messaging.

## Quantum Gates

Quantum computation applies reversible transformations called **quantum gates**.

Examples include:

- X gate,
- Hadamard gate,
- phase gates,
- controlled-NOT.

Mathematically, these are unitary transformations.

## Hadamard Gate

The Hadamard gate can transform:

\[
|0\rangle
\]

into:

\[
\frac{|0\rangle+|1\rangle}{\sqrt2}
\]

It creates a balanced superposition.

It is one of the basic tools of quantum algorithms.

## Reversibility

Closed quantum evolution is unitary and therefore reversible.

This differs from many classical logic operations that erase information.

Quantum circuit design is fundamentally reversible until measurement.

## No-Cloning Theorem

An unknown quantum state cannot be copied perfectly.

This is the **no-cloning theorem**.

Classical bits can be duplicated freely.

Quantum information obeys different rules.

## Quantum Teleportation

Quantum teleportation transfers an unknown quantum state using:

- shared entanglement,
- classical communication.

No matter or usable information travels faster than light.

The name can mislead if taken literally.

## Quantum Parallelism

A quantum circuit acts on a superposition of basis states simultaneously in the linear-algebraic sense.

But useful speedup requires extracting a global property through interference.

Raw parallel evaluation alone is not enough.

## Deutsch–Jozsa

Early quantum algorithms such as Deutsch–Jozsa demonstrated that quantum query models could distinguish certain function classes with fewer queries than deterministic classical methods.

The problem is artificial but conceptually important.

## Simon's Algorithm

Simon's algorithm finds a hidden XOR structure exponentially faster in query complexity than classical randomized approaches.

It influenced Shor's factoring algorithm.

## Shor's Algorithm

Peter Shor discovered a polynomial-time quantum algorithm for:

- integer factoring,
- discrete logarithms.

This was a breakthrough.

These problems underpin widely used public-key cryptographic systems.

## Why Factoring Matters

Classically, no polynomial-time factoring algorithm is known.

Quantumly, Shor's algorithm provides one in the ideal circuit model.

This changes the complexity landscape.

## Shor Does Not Solve NP-Complete Problems in General

A common misconception is:

quantum computers make all hard problems easy.

No known quantum algorithm efficiently solves all NP-complete problems.

Quantum speedup is selective.

## Grover's Algorithm

Grover's algorithm searches an unstructured space of N candidates in roughly:

\[
O(\sqrt N)
\]

oracle queries rather than:

\[
O(N)
\]

classically.

This is a quadratic speedup.

Not exponential, but broadly applicable.

## BQP

The class **BQP** contains decision problems solvable efficiently by a quantum computer with bounded error.

BQP is the quantum analogue of an efficient probabilistic complexity class.

Its exact relationship to NP is not fully known.

## Quantum Does Not Mean Uncomputable

Standard quantum computation is still believed to remain within the Church–Turing computability boundary.

It can change:

how efficiently,

not:

what is computable at all.

No accepted quantum algorithm solves the halting problem.

## Church–Turing vs Extended Church–Turing

The ordinary Church–Turing thesis concerns computability.

The **extended Church–Turing thesis** concerns efficient simulation.

Quantum computing challenges some strong versions of the extended thesis.

The distinction is important.

## Quantum Simulation

Richard Feynman emphasized that quantum systems may be naturally simulated by quantum computers.

Classical simulation of generic quantum states scales badly.

A quantum machine uses quantum physics as the computational substrate.

## Quantum Chemistry

One major application area is simulation of:

- molecules,
- materials,
- chemical reactions.

Quantum computers may represent certain quantum systems more naturally than classical machines.

## Optimization

Quantum methods are also explored for optimization.

But claims of broad practical quantum advantage must be evaluated carefully.

Many proposed algorithms do not yet demonstrate decisive superiority at useful scale.

## Quantum Error Correction

Quantum states are fragile.

Noise causes decoherence and errors.

Quantum error correction protects logical qubits using entangled encodings across many physical qubits.

Reliable quantum computation requires substantial redundancy.

## Surface Codes

Surface-code families are leading approaches to fault-tolerant quantum computing.

They trade many physical qubits for robust logical qubits.

Engineering scale is a major challenge.

## Decoherence

Interaction with the environment can destroy useful quantum coherence.

Isolation and control must be balanced.

A quantum computer must interact enough to be programmed and measured, but not so much that noise overwhelms the computation.

## Fault Tolerance

The **threshold theorem** says, roughly, that arbitrarily long quantum computation is possible in principle if physical error rates are below suitable thresholds and enough error-correction overhead is available.

This is a theoretical foundation of scalable quantum computing.

## Quantum Supremacy and Advantage

Researchers distinguish demonstrations of quantum computation beyond practical classical simulation from useful **quantum advantage** on real tasks.

Terminology changes.

The core question is practical superiority.

## Quantum Randomness

Measurement outcomes are probabilistic according to quantum theory.

This supplies physical randomness.

But random outputs alone do not create computational intelligence.

Algorithm structure still matters.

## Quantum Information Is Physical

Quantum computing reinforces the idea that information is constrained by physical law.

Rules such as:

- no cloning,
- entanglement monogamy,
- measurement disturbance

are information-theoretic facts rooted in quantum mechanics.

## Does a Quantum Computer Try Every Answer?

No.

This popular metaphor is misleading.

The state can contain amplitudes over many basis states.

But measurement does not reveal all branch values.

Successful algorithms engineer interference so the desired global information is amplified.

## Does Quantum Computing Use Other Universes?

Some interpretations of quantum mechanics encourage many-worlds descriptions of quantum computation.

Others do not.

Quantum algorithms work experimentally regardless of which interpretation one adopts.

The engineering does not settle metaphysics.

## The Philosophical Lesson

Quantum computation shows that the laws of physics shape the resources available for information processing.

Computation is not independent of nature.

Different physical theories permit different computational strategies.

But quantum computers expand efficiency, not known computability.

## The Next Question

If computation depends on physical law, perhaps the relationship goes deeper.

Could the universe itself be understood as carrying out a computation?

Are physical laws update rules?

The next essay asks:

**Is the Universe Computing?**
