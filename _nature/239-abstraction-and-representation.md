---
title: 'Abstraction and Representation'
permalink: /nature/239-abstraction-and-representation/
chapter: 13
chapter_title: 'Computation and Computer Science'
order: 239
tags:
   - abstraction
   - representation
   - computer-science
   - models
   - information
---

Computer science does not manipulate reality directly.

It manipulates **representations**.

A map represents roads.

A variable represents a value.

A graph represents relationships.

A file represents an image.

The quality of computation depends heavily on how the world is represented.

## Representation Revisited

A representation is something that stands for something else.

We encountered this earlier with:

- symbols,
- language,
- information.

Computer science turns representation into an engineering discipline.

## Same Object, Different Representations

The number ten can be written as:

\[
10
\]

in decimal,

\[
1010
\]

in binary,

\[
A
\]

in hexadecimal.

The number is the same.

The representation changes.

## Representation Changes Operations

In Roman numerals, large arithmetic is awkward.

In positional notation, it becomes systematic.

A representational change can unlock algorithms.

This is one of the deepest lessons in computing.

## Data Model

A data model decides which entities and relationships exist in a computational system.

For example, a university system might represent:

- students,
- courses,
- enrollments.

The model determines what questions are easy to ask.

## Abstraction

Abstraction removes details that are not relevant to the current purpose.

A function may hide its internal implementation.

A network API may hide machine architecture.

A data type may hide memory layout.

Abstraction creates manageable boundaries.

## Information Hiding

A module exposes:

what users need to know.

It hides:

how the implementation works.

This allows internal changes without breaking external users.

Abstraction supports evolution.

## Interface

An interface defines the contract between components.

It specifies:

- allowed operations,
- inputs,
- outputs,
- guarantees.

The implementation may vary behind the interface.

## Example: Stack

A stack offers operations such as:

- push,
- pop,
- top.

It can be implemented using:

- array,
- linked list.

The abstract data type stays the same.

Implementation is separated from behavior.

## Levels of Abstraction

A computer system can be described at many levels:

1. transistors,
2. logic gates,
3. machine instructions,
4. operating system,
5. programming language,
6. application.

Each layer suppresses details below.

## Why Layers Work

No human could design a complex web application while simultaneously reasoning about every transistor transition.

Abstraction reduces cognitive complexity.

It lets us reason locally.

## Leaky Abstractions

No abstraction is perfect.

Sometimes hidden details matter.

A database abstraction may hide storage layout until performance becomes poor.

A network abstraction may hide packet loss until reliability breaks.

Joel Spolsky popularized the phrase:

**the law of leaky abstractions.**

## Representation and Performance

The same abstract information can have very different computational costs depending on representation.

A set represented as:

- unsorted list,
- balanced tree,
- hash table

supports different performance characteristics.

Representation is algorithmic strategy.

## Sparse vs Dense

Consider a matrix mostly filled with zeros.

A dense representation stores every entry.

A sparse representation stores only nonzero values.

The same mathematical object can require radically different memory and computation.

## Graph Representations

A graph can be stored as:

- adjacency matrix,
- adjacency list,
- edge list.

Each supports different operations efficiently.

There is no universally best representation.

## Coordinates

A point in the plane can be represented by:

- Cartesian coordinates,
- polar coordinates.

Some problems are simpler in one system.

Symmetry becomes visible or hidden depending on representation.

## Fourier Representation

A signal can be represented in:

- time domain,
- frequency domain.

A complicated waveform in time may become a simple set of frequencies.

Transformation of representation can expose structure.

## Compression as Representation Change

Compression replaces one representation with another that uses fewer bits.

Lossless compression preserves exact reconstruction.

Lossy compression preserves selected features.

Representation is always tied to purpose.

## Canonical Representation

Sometimes many encodings correspond to the same object.

A **canonical form** chooses one standard representation.

This simplifies:

- equality testing,
- caching,
- comparison.

Normalization is a representational strategy.

## Hashing

A hash function maps large data to a compact value.

The hash is not the original data.

It is a lossy fingerprint.

Different objects may collide.

Representation can trade completeness for efficiency.

## Symbolic Representation

Traditional AI often represented knowledge explicitly using:

- rules,
- predicates,
- frames.

The advantage is interpretability.

The disadvantage can be brittleness and manual construction.

## Distributed Representation

Neural networks often use distributed representations.

A concept may not correspond to one symbol.

Instead it is encoded across many numerical activations.

Meaning becomes geometric and statistical.

## Embeddings

An embedding maps objects into a vector space.

For example:

\[
word \rightarrow \mathbb{R}^n
\]

Distances or directions in that space may capture useful relationships.

Representation learning is central to modern AI.

## Learned Representations

Instead of engineers specifying every feature, machine-learning systems can learn representations from data.

This is one reason deep learning became powerful.

The representation itself becomes part of optimization.

## Good Representation Reduces Complexity

A difficult problem may become easy after the right encoding.

For example:

sorting points by angle may simplify a geometric problem.

Using logarithms transforms multiplication into addition.

Representation can change computational structure.

## Coordinate Transformation

Physics often changes coordinate systems to exploit symmetry.

Computer science does the same conceptually.

Change the language of the problem.

The solution may become obvious.

## State-Space Representation

In AI planning, a problem is represented by:

- states,
- actions,
- goal test.

This turns planning into graph search.

Representation creates an algorithmic landscape.

## Constraint Representation

A scheduling problem can be represented as variables with constraints.

Then generic constraint-solving methods can be used.

The problem becomes an instance of a broader formal class.

## Representation Bias

Every representation emphasizes some distinctions.

It suppresses others.

This creates **representation bias**.

In machine learning, the chosen features or architecture influence what patterns are easy to learn.

## Ontologies

An ontology defines categories and relations in a domain.

For example:

- person,
- organization,
- location,
- membership.

Ontology design is representation at a conceptual level.

## Categories Are Choices

Real-world categories are not always clean.

Examples:

- species,
- disease,
- occupation,
- identity.

Encoding them as fixed classes may introduce assumptions.

Representation has social consequences.

## Lossy Abstraction

Suppose age is reduced to:

- child,
- adult,
- senior.

The abstraction may be useful.

But exact age is lost.

Every abstraction creates blind spots.

## Model vs Reality

A representation is a model.

The map is not the territory.

A computational system can be internally correct and still fail because its representation omitted something important.

## Bugs of Representation

Some failures are not coding bugs.

The program may implement the specification perfectly.

The specification may represent the world badly.

These are modeling failures.

## Ontological Errors

A system may assume an entity type exists when reality is more fluid.

Or it may merge distinct concepts into one field.

Bad ontology produces bad computation.

## Abstraction Barrier

A good abstraction protects users from unnecessary detail while preserving the properties they need.

This is an **abstraction barrier**.

Crossing the barrier should be rare.

## Information Loss

The higher the abstraction, the more details disappear.

This is often beneficial.

But if a later question requires those details, they may no longer be recoverable.

Abstraction creates irreversible epistemic choices.

## Representation and Explanation

Scientists also choose representations.

A gas can be represented as:

- individual molecules,
- pressure and temperature fields.

Different representations explain different phenomena.

Computer science shares this multi-level structure.

## Representation and Intelligence

Much of intelligence may consist in choosing useful internal representations.

A problem solver that encodes the task badly may search forever.

A better representation can collapse the search space.

## The Philosophical Lesson

Representation is not a passive container for information.

It shapes:

- which distinctions exist,
- which operations are easy,
- which patterns become visible.

Abstraction gains power by forgetting detail.

Computer science advances by choosing what to preserve and what to hide.

## The Next Question

One of the clearest examples of representation shaping computation is the **data structure**.

The same information can be organized as:

- array,
- stack,
- queue,
- tree,
- graph,
- hash table.

Different shapes enable different operations.

The next essay asks:

**How do data structures give information shape?**
