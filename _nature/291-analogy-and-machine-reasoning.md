---
title: 'Analogy and Machine Reasoning'
permalink: /nature/291-analogy-and-machine-reasoning/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 291
tags:
   - analogy
   - machine-reasoning
   - abstraction
   - cognition
   - artificial-intelligence
---

A child learns that water flows through pipes.

Later, electricity is explained as if current flows through a circuit.

The domains are different.

The relational structure is similar.

This is **analogy**.

Analogy allows a mind to transfer understanding from one domain to another.

## Surface Similarity

Two things may look alike.

That is surface similarity.

A whale and a submarine both have streamlined shapes.

But analogy can go deeper.

## Structural Similarity

A strong analogy preserves relations.

For example:

planet orbits star

is structurally similar to:

electron around nucleus

in some limited historical models.

The important part is relational correspondence.

## Source and Target

Analogy usually has:

- source domain,
- target domain.

Knowledge from the source is mapped onto the target.

The mapping supports inference.

## Mapping

Suppose source relations are:

A supports B.

B contains C.

If the target has corresponding entities:

X supports Y,

then we may infer something about relations involving Y and its components.

Analogy transfers structure.

## Analogy Is Not Identity

No analogy is perfect.

Electric current is not literally water.

The useful question is:

Which relations carry over?

Which do not?

## Good Analogy

A good analogy preserves causally or logically important structure.

A bad analogy relies on superficial resemblance.

Reasoning requires selecting the right correspondences.

## Structure-Mapping Theory

Dedre Gentner's **structure-mapping theory** emphasizes relational structure over object similarity.

Higher-order relations matter especially.

This became influential in cognitive science.

## Systematicity Principle

People prefer analogies involving connected systems of relations rather than isolated matches.

A coherent relational network transfers better.

This is the **systematicity principle**.

## Example: Solar System and Atom

Historically, the solar-system analogy helped people imagine atomic structure.

Source:

planets orbit sun.

Target:

electrons around nucleus.

The analogy supported visualization.

But quantum mechanics later showed major limitations.

## Analogy Can Mislead

If we carry too much structure from source to target, the analogy breaks.

Electrons are not tiny planets.

Useful analogy requires knowing where to stop.

## Abstraction

Analogy can reveal a more abstract pattern.

For example:

water flow,
traffic flow,
data flow

share concepts such as:

- bottleneck,
- throughput,
- capacity.

The abstraction becomes reusable.

## Schema Induction

Repeated analogies can produce a general schema.

We stop thinking only about examples.

We discover structure.

This is a route to concept formation.

## Analogical Transfer

A solution in one problem can help solve another structurally similar problem.

But humans often fail to notice the analogy unless prompted.

Retrieval is as important as mapping.

## Duncker's Radiation Problem

A classic psychology experiment involved destroying a tumor with rays that are harmful at high intensity.

The solution is to use several low-intensity rays converging on the target.

A structurally similar military story can help people solve it.

But spontaneous transfer is limited.

## Retrieval Problem

To use analogy, the mind must first retrieve a relevant source.

Surface cues often dominate retrieval.

Deep structural similarity may be missed.

This is a major challenge for machine analogy too.

## Mapping Problem

After retrieving a source, the system must align:

which source element corresponds to which target element?

There may be many possible mappings.

This is combinatorial.

## Candidate Correspondence

Objects may match by:

- attributes,
- relations,
- roles.

A robust analogy system should prioritize structural consistency.

## One-to-One Mapping

Many analogy models prefer one-to-one correspondence:

one source entity maps to one target entity.

This avoids contradictory alignments.

## Relational Consistency

If:

A causes B

maps to:

X causes Y,

then A should map consistently to X wherever the relation appears.

Global coherence matters.

## Analogical Inference

Once mapping is established, unmapped source knowledge can suggest target hypotheses.

This is the productive step.

Analogy generates new predictions.

## Example

Source:

heat flows from hot to cold.

Target:

perhaps some abstract quantity moves down a gradient.

The analogy can inspire formal modeling.

But it requires validation.

## Analogy in Science

Scientific history is full of analogy.

Examples include:

- fluid models of electricity,
- wave models of light,
- genetic code.

Analogies generate theories.

Experiments decide whether they survive.

## Analogy in Mathematics

Mathematicians often transfer structures across domains.

A theorem in one setting suggests an analogue elsewhere.

Category theory formalizes some forms of structural relationship at a much higher level.

## Analogy and Creativity

Analogy can produce novelty by combining previously separate domains.

A metaphor may reveal a new conceptual structure.

This connects reasoning to creativity.

## Case-Based Reasoning

Case-based reasoning solves a new problem by retrieving a similar previous case.

The system then adapts the old solution.

This is practical analogical reasoning.

## Steps in Case-Based Reasoning

A common cycle is:

1. retrieve,
2. reuse,
3. revise,
4. retain.

Experience becomes a library of strategies.

## Legal Reasoning

Law often relies on precedent.

A new case is compared with earlier cases.

The argument concerns:

which similarities matter?

This is structured analogy.

## Medical Reasoning

Clinicians may recognize:

this case resembles a previous pattern.

Analogical memory can guide diagnosis.

But superficial similarity can also mislead.

## Analogical AI

AI researchers have built systems for:

- structure mapping,
- case-based reasoning,
- relational learning.

The challenge is representing relations flexibly.

## SME

The **Structure-Mapping Engine**, associated with Gentner and colleagues, computationally models structural analogy.

It searches for consistent relational correspondences.

This operationalizes psychological theory.

## Copycat

Douglas Hofstadter and Melanie Mitchell's **Copycat** explored analogy in a microworld of letter strings.

It modeled flexible perception and conceptual slippage.

The system became famous for emphasizing analogy as fluid cognition.

## Example Copycat Task

Given:

abc → abd

what is:

ijk → ?

A rigid system might answer:

ijl.

But context can support multiple interpretations.

Copycat explored how concepts flex.

## Conceptual Slippage

A relation such as:

successor

might shift into another concept under context.

Analogy requires flexible representation.

This is difficult to formalize.

## Vector Similarity

Modern machine learning represents items as vectors.

Analogical relationships can sometimes appear as geometric transformations.

This made analogy seem naturally compatible with embeddings.

## Famous Word Vector Example

Relations such as:

king - man + woman ≈ queen

became a famous demonstration.

The exact reliability of such arithmetic varies.

The broader point is that relational structure can emerge geometrically.

## Relational Embeddings

Knowledge-graph embeddings also encode relationships as transformations in vector space.

This supports link prediction.

Analogical structure becomes numerical.

## Neural Analogy

Neural networks can learn relational tasks.

Transformers are particularly good at comparing patterns across sequences.

But success on benchmark analogy does not guarantee general analogical reasoning.

## In-Context Analogy

Large language models can infer patterns from examples in context.

This can look like analogy:

Example A maps to B.

New case C requires corresponding D.

The model transfers local structure.

## Surface Bias in Machines

Machine systems can also over-rely on surface cues.

A model may match words rather than relations.

Robust analogy requires invariance to superficial variation.

## Abstract Reasoning Benchmarks

Tasks such as Raven's Progressive Matrices test pattern and relation inference.

AI systems have improved substantially on such tasks.

But benchmark success depends heavily on representation and training distribution.

## Bongard Problems

Bongard problems require discovering a rule distinguishing two groups of visual examples.

They test:

- abstraction,
- relational concept formation.

They remain conceptually challenging.

## ARC

The Abstraction and Reasoning Corpus, or ARC, was designed to test generalization from very few examples using abstract visual transformations.

It emphasizes:

- compositionality,
- abstraction,
- analogy-like transfer.

## Few-Shot Reasoning

Analogy is naturally few-shot.

You may see one example and transfer the relation.

This is one reason analogical reasoning is central to general intelligence.

## Why Analogy Is Hard

A system must decide:

- what objects exist,
- which relations matter,
- which source is relevant,
- what can transfer.

Every stage depends on representation.

## Analogy and Causality

Superficial correlation is not enough.

The strongest analogies often preserve causal structure.

A system that understands causes can transfer more reliably.

## Analogy and Language

Metaphor is a linguistic form of analogy.

We say:

time is money.

This maps:

- spending,
- saving,
- wasting

from economic structure onto time.

Language encodes conceptual transfer.

## Machine Metaphor

A machine can generate metaphors statistically.

Whether it understands the transferred structure depends on how robustly it can use the mapping.

Generation is not the only test.

## Analogy as Compression

A good analogy lets one model explain another domain.

Instead of learning from scratch, reuse structure.

Analogy is therefore a form of cognitive compression.

## Analogy and Transfer Learning

Machine-learning transfer learning and human analogy share a broad goal:

reuse knowledge.

But neural transfer often occurs through shared parameters rather than explicit relational mapping.

The mechanisms differ.

## Analogical Failure

An analogy fails when irrelevant source structure is imported.

This can produce:

- bad scientific models,
- misleading arguments.

Analogy needs validation.

## False Analogy Fallacy

A rhetorical argument may say:

A resembles B in one way.

Therefore A resembles B in another unrelated way.

This is a **false analogy**.

Similarity is not proof.

## Evaluation

An analogical inference should be treated as:

hypothesis,

not:

deduction.

Evidence must test whether transferred structure is real.

## The Philosophical Lesson

Analogy is a bridge between:

- memory,
- abstraction,
- creativity,
- reasoning.

It lets intelligence reuse structure across domains.

For machines, analogy exposes a deep challenge:

general intelligence requires recognizing relations that remain stable when surface details change.

## The Next Question

If analogy can create new connections, perhaps machines can do more than reason.

Can they produce something genuinely new?

Can a machine be:

**creative**?

That leads to:

**Can Machines Be Creative?**
