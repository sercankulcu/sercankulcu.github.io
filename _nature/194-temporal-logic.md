---
title: 'Temporal Logic'
permalink: /nature/194-temporal-logic/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 194
tags:
   - temporal-logic
   - time
   - verification
   - computation
   - modal-logic
---

Ordinary logic treats propositions as if their truth does not change with time.

But many claims are temporal.

The door is open now.

It was closed earlier.

It will open again.

To reason formally about changing truth, we need **temporal logic**.

## Time Changes Truth

Consider:

"The server is running."

This may be true at one moment and false at another.

Classical propositional logic alone does not encode this temporal structure.

Temporal logic adds operators for time.

## Basic Temporal Operators

Different systems use different notation.

Common future-time operators include:

- **G P**: P is always true from now on.
- **F P**: P will eventually be true.
- **X P**: P is true at the next moment.
- **P U Q**: P remains true until Q becomes true.

These operators are central in computer verification.

## Always

\[
G P
\]

means:

P holds at every future point.

Example:

"The safety valve is never simultaneously open with the ignition valve."

This is a safety property.

## Eventually

\[
F P
\]

means:

At some future point, P holds.

Example:

"Every submitted request is eventually answered."

This is a liveness property.

## Next

\[
X P
\]

means:

P holds in the next state.

This operator fits discrete systems such as:

- software states,
- digital circuits.

It is less natural for continuous time unless time is discretized.

## Until

\[
P\ U\ Q
\]

means roughly:

P continues to hold until Q becomes true.

This captures ordered temporal behavior.

Example:

"The warning light remains on until the fault is cleared."

## Past Operators

Temporal logic can also include past-time operators.

Examples:

- previously,
- always in the past,
- since.

Not every application requires them.

Future-only systems are common.

## Linear Time

In **Linear Temporal Logic**, or LTL, time is represented as one path:

state 0
→ state 1
→ state 2
→ ...

There is one unfolding history.

Properties are evaluated along that path.

## Branching Time

But future possibilities may branch.

From one current state, several future states may be possible.

**Branching-time logics** represent this tree-like structure.

## CTL

**Computation Tree Logic**, or CTL, combines:

- path quantifiers,
- temporal operators.

It distinguishes claims like:

"on every possible future path, eventually P"

from:

"there exists some path where eventually P."

This is critical in nondeterministic systems.

## Path Quantifiers

Common path ideas are:

- A: for all paths,
- E: there exists a path.

Then expressions can say things such as:

- AG P: P always holds on all paths,
- EF P: there exists a path where P eventually holds.

## Safety Properties

A **safety property** says:

something bad never happens.

Examples:

- two trains never occupy the same block,
- a locked account never authorizes access.

Safety is about forbidden states.

## Liveness Properties

A **liveness property** says:

something good eventually happens.

Examples:

- a request eventually receives a response,
- a process eventually enters the critical section.

A system can be safe but useless if nothing ever happens.

## Fairness

Verification often needs **fairness assumptions**.

Suppose one process could theoretically be postponed forever.

In practice, the scheduler may guarantee eventual service.

Fairness constraints remove unrealistic paths.

## Model Checking

Temporal logic became powerful because formulas can be checked automatically against state-transition models.

This is **model checking**.

A tool asks:

Does every allowed execution satisfy the required temporal property?

## State Explosion

The challenge is combinatorial.

A system with many components can have an enormous number of possible states.

This is the **state explosion problem**.

Verification requires clever representations and abstractions.

## Hardware Verification

Temporal logic is widely used to verify digital circuits.

Designers can specify:

- request implies eventual grant,
- reset eventually clears state,
- forbidden signal combinations never occur.

These become machine-checkable requirements.

## Software Verification

The same ideas apply to concurrent and distributed software.

Temporal properties can describe:

- deadlock freedom,
- eventual response,
- ordering constraints.

This is logic applied to behavior over time.

## Deadlock

A deadlock occurs when processes wait forever.

A temporal property can express that progress must eventually occur.

Without temporal logic, "correct state" alone may miss the problem.

## Distributed Systems

Distributed systems are temporal by nature.

Messages arrive:

- later,
- out of order,
- sometimes never.

Correctness depends on sequences of events.

Temporal logic helps formalize these guarantees.

## Temporal Logic and Natural Language

Human language also contains temporal structure:

- yesterday,
- soon,
- always,
- until.

Formal temporal logic is much more precise.

Natural temporal expressions are context-sensitive and vague.

## Time as Linear or Branching

Temporal logic encodes assumptions about time.

Is there:

- one future,
- many possible futures?

Is time:

- discrete,
- continuous?

Formal choice reflects metaphysical and engineering assumptions.

## Temporal Logic and Physics

Physics studies time as part of spacetime.

Temporal logic does not directly replace physical theories.

It formalizes ordering and persistence of propositions.

The two operate at different explanatory levels.

## Temporal Logic and Planning

An agent may require:

"Eventually reach the destination while always avoiding hazards."

This is a temporal specification.

Planning becomes a search for trajectories satisfying logical constraints.

## Robotics

Robots can receive high-level instructions such as:

"Visit room A, then room B, while never entering restricted zone C."

Temporal logic can encode such goals.

It becomes a bridge between language and control.

## Temporal Logic and AI

AI systems increasingly need guarantees about sequences, not isolated actions.

Examples:

- never reveal secret data,
- eventually complete assigned task,
- obey order constraints.

Temporal reasoning becomes part of safe agency.

## The Philosophical Lesson

Temporal logic adds time to formal reasoning.

It distinguishes:

- now,
- next,
- eventually,
- always.

Once truth can vary across time, logic becomes dynamic.

## The Next Question

Time is not the only dimension that changes truth.

What one agent knows may differ from what another knows.

A statement may be true without being known.

A person may know that another person knows something.

To formalize these structures, we turn to:

**epistemic logic.**
