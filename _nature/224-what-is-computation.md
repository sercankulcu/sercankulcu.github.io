---
title: 'What Is Computation?'
permalink: /nature/224-what-is-computation/
chapter: 13
chapter_title: 'Computation and Computer Science'
order: 224
tags:
   - computation
   - computer-science
   - information-processing
   - turing-machines
   - philosophy-of-computation
---

A laptop computes.

A calculator computes.

Does a brain compute?

Does a cell compute?

Does the universe compute?

Before answering, we need to know what **computation** is.

The word is familiar.

The concept is surprisingly deep.

## The Everyday Meaning

In ordinary language, computation often means:

performing calculations.

Add numbers.

Multiply matrices.

Evaluate formulas.

Computer science uses a broader idea.

## Computation as Transformation

At a basic level, computation transforms:

input

into:

output

according to rules.

We can write:

\[
f(x)=y
\]

A computational process realizes some transformation from x to y.

## But Every Change Is Not Obviously Computation

A rock falls.

Its state changes.

Did it compute its final position?

If every physical transformation counts as computation, the concept may become too broad to explain anything.

We need constraints.

## Representation

Many accounts of computation require states to represent something.

A bit pattern may represent:

- an integer,
- a character,
- an instruction.

The same physical state can participate in different computations depending on interpretation.

## Formal Computation

In theoretical computer science, computation can be defined without physical interpretation.

A formal machine:

- has states,
- follows transition rules,
- manipulates symbols.

The computation is the sequence of formal configurations.

## Turing Machines

A Turing machine contains:

- a finite control,
- an unbounded tape in the mathematical model,
- a read/write head,
- transition rules.

Despite its simplicity, it can represent general algorithmic computation.

## Machine Configuration

At any moment, the computation is described by:

- current state,
- tape contents,
- head position.

A transition rule maps one configuration to the next.

Computation becomes state evolution under formal rules.

## Deterministic Computation

A deterministic machine has at most one next move for each configuration.

Given:

- program,
- input,

the future execution is fixed.

## Nondeterministic Computation

A nondeterministic model may allow several possible next states.

This is not necessarily physical randomness.

It is a formal way of representing branching computation.

Nondeterminism is central in complexity theory.

## Probabilistic Computation

A probabilistic algorithm makes random choices according to specified distributions.

The same input may produce different execution paths.

Randomness becomes part of the computational model.

## Quantum Computation

Quantum computers process quantum states.

Their computational state can include:

- superposition,
- interference,
- entanglement.

The model changes.

The question "what is computable?" remains related to classical computability, while efficiency can change dramatically.

## Computation as Rule-Governed Process

A broad definition is:

computation is a rule-governed transformation of structured states.

But this still leaves questions:

- What counts as a rule?
- What counts as a state?
- Must states represent something?

Philosophy of computation begins here.

## Syntax and Semantics Again

A CPU manipulates bit patterns.

At one level:

pure syntax.

At another:

those bits represent:

- numbers,
- images,
- instructions.

Computation often spans both levels.

## Programs as Descriptions

A program specifies a computation.

But program and computation are not identical.

The program is static description.

The computation is the unfolding process.

Code is recipe.

Execution is event.

## Algorithm vs Computation

An algorithm is an abstract procedure.

A computation is an execution or realization of such a procedure.

One algorithm can generate many computations on different inputs.

This distinction will matter in the next essay.

## Computable Functions

A function is computable if there exists an effective procedure that returns the correct output for every valid input and halts.

This turns computation into a mathematical property.

## Models of Computation

Several formal models capture the same computable functions:

- Turing machines,
- lambda calculus,
- partial recursive functions,
- register machines.

Their convergence is remarkable.

## Church–Turing Thesis

The **Church–Turing thesis** says, roughly:

Every effectively calculable function is computable by a Turing machine.

It is not an ordinary theorem because "effectively calculable" began as an informal concept.

The thesis connects intuition with formal models.

## Why the Thesis Is Persuasive

Many independently invented models of effective computation turned out to be equivalent.

No accepted ordinary algorithmic procedure has been found that exceeds Turing computability.

This convergence gives the thesis extraordinary credibility.

## Physical Church–Turing Thesis

A stronger claim says:

Every physically realizable computation can be simulated by a Turing machine.

Versions differ.

Quantum computing complicates efficiency claims but does not currently provide known hypercomputation beyond Turing computability.

## Computation and Physics

Every real computer is physical.

Its computation depends on:

- electrons,
- photons,
- thermodynamics.

So computation is abstract in theory but physically instantiated in practice.

## Multiple Realizability

The same computation can be implemented using:

- silicon,
- relays,
- mechanical gears,
- perhaps biological tissue.

This suggests computation is substrate-independent at an abstract level.

## Implementation

But not every physical system implements every computation.

A serious implementation relation must preserve causal and structural organization.

Otherwise, arbitrary interpretation could make any object "compute" anything.

## The Pancomputationalist Temptation

Some philosophers suggest:

the universe computes its own evolution.

This may be illuminating if physical law can be understood computationally.

But if every physical process counts automatically, "computation" risks becoming synonymous with "change."

## Digital vs Analog Computation

Digital computers manipulate discrete representations.

Analog computers use continuous physical quantities to represent variables.

Both can compute under suitable definitions.

Computation is not identical to binary arithmetic.

## Analog Devices

Historical analog computers represented quantities through:

- voltages,
- rotations,
- fluid levels.

Physical dynamics directly modeled mathematical relations.

Representation was continuous rather than digital.

## Neuromorphic Computing

Neuromorphic systems imitate aspects of neural organization.

They may use:

- spikes,
- event-driven processing,
- analog dynamics.

New hardware challenges narrow images of computation.

## Biological Computation

Cells respond to:

- chemical signals,
- regulatory networks,
- environmental inputs.

Calling this "computation" can be useful if information-processing structure is specified carefully.

The term should not replace biological explanation.

## DNA Computing

Molecular systems can perform computational operations.

DNA strands can encode information and participate in parallel molecular procedures.

Computation need not occur inside conventional electronics.

## Computation and Information

Computation transforms information-bearing states.

But information alone does not compute.

A book contains information.

It does not autonomously execute transformation rules.

Dynamics matter.

## Computation and Causation

A physical computer works because internal states cause later states in structured ways.

Implementation is causal, not merely symbolic.

The physical system must realize the transition architecture.

## Universal Computation

A **universal computer** can simulate any computation in a broad class when given:

- an encoded program,
- its input.

The same machine becomes many machines through software.

This is one of computation's deepest ideas.

## Programs as Data

Universal computation depends on treating program descriptions as data.

A machine can:

- read,
- store,
- modify,
- execute

descriptions of other computations.

Self-reference returns.

## Computation Is Not Intelligence

A pocket calculator computes.

It is not generally considered intelligent.

Computation is a process category.

Intelligence involves broader capacities such as:

- adaptation,
- learning,
- goal-directed action.

The concepts overlap but are not identical.

## Computation Is Not Consciousness

A system can compute without subjective experience.

At least, ordinary computers appear to.

Whether certain computations could generate consciousness is a later question.

Do not build consciousness into the definition of computation.

## Computation Is Not Meaning

A processor can manipulate encoded symbols without understanding what they represent.

This echoes the syntax/semantics distinction.

Computation alone does not settle semantic understanding.

## The Philosophical Lesson

Computation is best understood as structured transformation under rules, instantiated formally or physically.

It can manipulate representations.

It can be realized by many substrates.

But the concept needs constraints if it is to explain rather than label.

## The Beginning of Part XIII

We now move from:

formal systems

to:

computation and computer science.

The key questions become:

- What procedures exist?
- What can they calculate?
- What resources do they require?
- Can nature itself be understood computationally?

## The Next Question

Every computation seems to follow some procedure.

But what exactly makes a procedure an **algorithm**?

Must it terminate?

Must every step be precise?

Can an algorithm use randomness?

The next essay asks:

**What Is an Algorithm?**
