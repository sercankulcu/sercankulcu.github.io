---
title: 'What Is Information?'
permalink: /nature/130-what-is-information/
chapter: 8
chapter_title: 'Information and Representation'
order: 130
tags:
   - information
   - representation
   - communication
   - entropy
   - computation
---

Information is everywhere.

A DNA sequence carries information.

A message contains information.

A hard drive stores information.

A thermometer gives information about temperature.

A footprint gives information about an animal that passed.

But what exactly is information?

The word is used in several different senses.

Confusing them creates deep philosophical mistakes.

## Information as Difference

At the most basic level, information depends on distinguishable alternatives.

A system can be:

- on or off,
- 0 or 1,
- A or B.

If only one state is possible, observing it tells us nothing new.

Information appears when several possibilities exist and one is selected.

## Uncertainty

Information is closely connected to uncertainty.

Before receiving a message, several outcomes may be possible.

After receiving it, uncertainty decreases.

In this sense, information is not the same as meaning.

It is related to how much a signal narrows possibilities.

## Shannon Information

Claude Shannon formalized this idea in communication theory.

A rare event carries more information than a predictable event.

If an event has probability \(p\), its information content is often written:

\[
I=-\log_2 p
\]

The less expected the event, the larger the information.

## The Bit

A **bit** is the basic unit of binary information.

If two alternatives are equally likely, learning which one occurred gives one bit.

For example:

heads or tails.

0 or 1.

yes or no.

A bit measures distinction, not meaning.

## Shannon Entropy

For a set of possible outcomes with probabilities \(p_i\), Shannon entropy is:

\[
H=-\sum_i p_i\log_2 p_i
\]

Entropy measures expected uncertainty before the outcome is known.

More uncertainty means more potential information in observing the result.

## Information Without Meaning

Suppose a communication channel transmits:

`01001101`

Shannon theory can quantify the information in the sequence without knowing what it means.

It might represent:

- a letter,
- a number,
- part of an image,
- an instruction.

Meaning belongs to another level.

## Syntax vs Semantics

This distinction is fundamental.

### Syntax
The structure and arrangement of symbols.

### Semantics
What those symbols mean.

Information theory can often operate at the syntactic level.

Semantics requires interpretation.

Later essays will return to this divide repeatedly.

## Information as Correlation

There is another sense of information.

One variable carries information about another when they are correlated.

A dark cloud gives information about possible rain.

A fossil gives information about ancient life.

A thermometer reading gives information about temperature.

Information can therefore be relational.

## Mutual Information

Information theory quantifies shared dependence using **mutual information**.

If knowing variable \(X\) reduces uncertainty about variable \(Y\), then \(X\) carries information about \(Y\).

This idea appears in:

- statistics,
- neuroscience,
- machine learning,
- genetics.

## Physical Signals

Information requires some physical carrier when it is stored or transmitted.

Examples include:

- voltage,
- light,
- magnetic orientation,
- chemical concentration,
- sound waves.

But information is not identical to any one carrier.

The same message can travel through many media.

## Substrate Independence

The word "hello" can be represented as:

- ink,
- sound,
- electrical signal,
- digital code.

The physical realizations differ.

The informational pattern can remain the same.

This makes information partly substrate-independent.

## Pattern

Information often concerns pattern rather than material.

A sequence can be copied from one medium to another.

The physical atoms change.

The arrangement or relation is preserved.

This is why information becomes central to computation and biology.

## Information in DNA

DNA contains sequences built from four nucleotide bases.

The sequence influences:

- protein synthesis,
- regulation,
- development.

Biology legitimately uses informational language because sequence differences can have systematic functional consequences.

But DNA information is not identical to ordinary human language.

## Genetic Information Is Contextual

A DNA sequence has biological effects only inside a cellular system.

The same sequence without:

- ribosomes,
- enzymes,
- regulatory networks

does nothing by itself.

Information is not magically active.

It requires an interpreter or mechanism.

## Information and Causation

Some signals trigger actions.

A hormone binds a receptor.

A control bit changes processor behavior.

A traffic light changes driver behavior.

In these systems, information is causally effective because a mechanism responds to differences.

The physical signal and the system's organization work together.

## Gregory Bateson's Phrase

Gregory Bateson famously described information as:

"a difference that makes a difference."

The phrase is useful because it emphasizes both distinction and effect.

But it is not a complete mathematical definition.

It points toward relational and causal information.

## Information and Knowledge

Information is not the same as knowledge.

A database can contain information nobody understands.

Knowledge usually implies:

- interpretation,
- justification,
- integration with beliefs.

Information can exist without a knower in the ordinary epistemic sense.

## Data vs Information

The distinction between **data** and **information** is context-dependent.

One common usage is:

data = recorded symbols or measurements,

information = structure extracted from those data.

But disciplines use the terms differently.

There is no universal boundary.

## Information and Meaning

Meaning depends on relations among:

- symbols,
- interpreters,
- context,
- conventions,
- goals.

The same information-bearing pattern can mean different things in different systems.

This will become a major theme.

## Information in Physics

Physics increasingly uses informational concepts.

Examples include:

- entropy,
- quantum information,
- black-hole information.

But "information" in physics usually has technical meanings.

It should not automatically be interpreted as semantic information.

The universe does not need to "understand" bits.

## Quantum Information

Quantum systems carry information differently from classical systems.

A qubit can exist in superpositions.

Entanglement creates correlations unavailable classically.

Quantum information theory studies these possibilities.

This does not mean information replaces matter.

It describes physical states and transformations.

## Is Information Physical?

Rolf Landauer famously emphasized that information processing has physical consequences.

Erasing information can require energy dissipation under suitable conditions.

This links abstract bits to thermodynamics.

Later we will ask directly whether information is physical.

## Copying Information

Information can be replicated.

A digital file can be copied.

DNA can be copied.

The physical carriers multiply.

The pattern persists.

This is one reason information is central to heredity and communication.

## Noise

Communication channels are imperfect.

Signals can be corrupted.

Noise changes the received pattern.

Information theory studies how to transmit reliably despite such errors.

This led to error-correcting codes.

## Redundancy

Redundancy can protect information.

Repeating or structuring data allows errors to be detected and corrected.

Natural language contains redundancy.

Genetic systems also contain forms of redundancy.

Efficiency and robustness often trade off.

## Compression

If a message contains predictable structure, it can often be compressed.

Repeated patterns need not be stored repeatedly.

Compression reveals regularity.

A random-looking sequence is often harder to compress.

This connects information with complexity.

## Algorithmic Information

Another perspective asks:

How short is the shortest program that generates an object?

This is related to **algorithmic information theory**.

A simple repetitive string has a short description.

A truly irregular string may not.

Information becomes connected to description length.

## Information Is Relational

A pattern counts as information only relative to some distinction or system.

The voltage 5V may mean:

- logical 1,
- sensor reading,
- irrelevant noise.

Context determines role.

There is no universal semantic label inside the voltage itself.

## The Danger of Metaphor

Modern discussions sometimes say:

"Everything is information."

This may be profound.

It may also be vague.

We must ask:

Which definition of information?

Shannon information?

Semantic content?

Physical state distinction?

Without clarification, the statement explains little.

## A Working Definition

For this series, a useful broad definition is:

**Information is structured difference capable of distinguishing among possibilities, often encoded in a physical medium and interpreted or used within a system.**

Different theories emphasize different parts of this definition.

## The Next Question

Information needs representation.

A difference must be carried by something.

A mark.

A sound.

A voltage.

A nucleotide.

These carriers can function as **symbols**.

So the next question is:

**What is a symbol?**
