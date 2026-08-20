---
title: 'Frames and Conceptual Dependency'
permalink: /nature/281-frames-and-conceptual-dependency/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 281
tags:
   - frames
   - conceptual-dependency
   - knowledge-representation
   - artificial-intelligence
   - semantics
---

Early artificial intelligence faced a problem that still exists:

How can a machine represent ordinary meaning?

A sentence is not merely a string.

It describes:

- objects,
- events,
- intentions,
- roles.

Two influential approaches were:

- frames,
- conceptual dependency.

Both tried to move from surface language to structured knowledge.

## Frames Revisited

A **frame** represents a stereotyped object or situation.

It contains:

- slots,
- default values,
- relations.

The idea is associated especially with Marvin Minsky.

## Restaurant Frame

A restaurant frame may contain:

```text
customer:
server:
menu:
food:
bill:
```

The frame organizes expectations.

## Defaults

A slot may contain a default.

Example:

Bird:
can-fly = usually true.

Defaults support commonsense reasoning.

## Exceptions

Penguin:

can-fly = false.

The specific frame overrides the inherited default.

This produces nonmonotonic behavior.

## Why Frames Matter

Frames reduce the need to encode every fact explicitly.

Once a frame is active, many unstated assumptions become available.

This makes understanding efficient.

## Frame Activation

The word:

restaurant

can activate knowledge about:

- ordering,
- tables,
- payment.

Comprehension becomes prediction.

## Slots and Fillers

A slot is a role.

A filler is a value.

For:

John bought a car,

a commercial-event frame might include:

buyer = John.

goods = car.

## Inheritance

Frames can form hierarchies.

A:

sports car

inherits properties from:

car.

This supports structured reuse.

## Procedural Attachments

Minsky's frame ideas allowed some slots to trigger procedures when information was needed.

Knowledge was not purely static.

A frame could contain instructions about how to obtain missing values.

## Scripts Revisited

Roger Schank and Robert Abelson developed **scripts** for stereotyped event sequences.

The classic example was a restaurant script.

Scripts represent:

what usually happens next.

## Script Structure

A restaurant script might include:

1. enter,
2. sit,
3. order,
4. eat,
5. pay.

This helps a system infer missing events in stories.

## Story Understanding

Suppose a story says:

"John went to a restaurant. He ordered pasta. He left a tip."

A script-based system can infer unstated events:

- he ate,
- he received a bill.

This is commonsense inference.

## Conceptual Dependency

Roger Schank developed **Conceptual Dependency**, often abbreviated CD.

The goal was to represent sentence meaning independently of specific wording.

Different sentences with the same meaning should map to similar internal structures.

## Surface Form vs Deep Meaning

Consider:

John gave Mary a book.

Mary received a book from John.

The surface syntax differs.

The underlying transfer event is similar.

CD tries to represent the common meaning.

## Primitive Acts

Conceptual Dependency used a small set of primitive actions.

Examples traditionally included:

- ATRANS,
- PTRANS,
- MTRANS,
- INGEST,
- EXPEL.

These represented basic conceptual event types.

## ATRANS

**ATRANS** represents transfer of an abstract relationship such as:

- possession,
- ownership.

Example:

John gave Mary a book.

Ownership transfers.

## PTRANS

**PTRANS** represents physical movement from one location to another.

Example:

John traveled to Paris.

The actor changes location.

## MTRANS

**MTRANS** represents transfer of mental information.

Example:

John told Mary the news.

Information moves from one mind to another.

## INGEST

**INGEST** represents taking something into the body.

Examples:

- eat,
- drink.

Different verbs can map to the same conceptual primitive.

## Why Primitives?

The goal was semantic normalization.

Many words could reduce to a smaller set of conceptual acts.

This might make reasoning easier.

## Language Independence

If different languages describe the same event, a conceptual representation could in principle be shared.

Meaning would be separated from surface grammar.

This is an attractive goal.

## Causal Structure

Conceptual Dependency also represented relations such as:

- cause,
- intention,
- state change.

The aim was not just labeling events.

It was modeling their internal structure.

## Example

Sentence:

"John opened the door."

A deeper representation may include:

- John performed an action,
- door changed state,
- closed → open.

This supports inference.

## Inference from Meaning

If someone ingests food, we can infer:

the food enters their body.

If ownership transfers, we can update:

who possesses the object.

Structured semantics enables reasoning.

## Conceptual Dependency and Scripts

CD represented event meaning.

Scripts represented stereotyped sequences.

Together they supported story understanding.

## SAM

Schank's **Script Applier Mechanism**, or SAM, used scripts to understand narratives.

It could fill in missing expected events.

This was an ambitious early natural-language system.

## Memory Organization

Schank later developed ideas such as:

- memory organization packets,
- case-based reasoning.

Knowledge was organized around episodes and expectations.

## Strength of Frames

Frames are good at representing:

- objects,
- situations,
- defaults.

They model structured context.

## Strength of Conceptual Dependency

CD is good at representing:

- events,
- actions,
- semantic relations.

It aims for language-independent meaning.

## Limitation: Hand Engineering

Both approaches required designers to specify:

- slots,
- primitives,
- rules.

This does not scale easily to the complexity of everyday knowledge.

## Limitation: Choosing Primitives

Why should one set of conceptual primitives be fundamental?

Different domains may require different distinctions.

The choice can become arbitrary.

## Limitation: Exceptions

Everyday situations contain endless exceptions.

A restaurant can be:

- self-service,
- prepaid,
- takeout.

Rigid scripts become brittle.

## The Brittleness Problem

Symbolic systems often perform impressively inside expected structures.

Outside them, they can fail abruptly.

Commonsense is more open-ended than hand-coded frames suggest.

## Frame Problem Again

Representing a situation does not solve how to update everything after action.

What changes?

What remains?

This remains a deep reasoning problem.

## Statistical Learning Arrives

Modern machine learning often learns semantic patterns from data instead of encoding them manually.

Embeddings capture similarity without explicit frames.

The representation is less interpretable.

## Neural Language Models

Modern language models can infer:

- event roles,
- likely sequences,
- semantic similarity

from statistical training.

They may implicitly learn frame-like structure.

## Frame Semantics in NLP

Modern natural-language processing still uses ideas related to **frame semantics**.

Resources such as FrameNet represent events and their roles explicitly.

The old idea survives in new forms.

## Semantic Role Labeling

A system may identify:

who did what to whom.

Roles include:

- agent,
- patient,
- instrument.

This resembles structured event representation.

## Knowledge Graphs and Frames

Knowledge graphs encode explicit relations.

Frames encode contextual structure.

These approaches can be combined.

Modern AI increasingly mixes representation styles.

## Neural-Symbolic Combination

A neural model may extract an event from text.

A symbolic layer may reason over it.

This combines learned perception with explicit structure.

## Conceptual Dependency and Modern Events

Modern event representations no longer use Schank's exact primitive system widely.

But the core problem remains:

map diverse language into structured event meaning.

This is still central to NLP.

## Meaning Is More Than Words

Frames and CD both embody a crucial insight:

two sentences can differ linguistically yet mean nearly the same thing.

A machine must operate beyond surface form.

## Context Matters

The same word can activate different frames.

"bank" in:

river bank

and:

financial bank

belongs to different structures.

Meaning depends on selected schema.

## Defaults Are Powerful

Defaults let systems reason efficiently.

Most birds fly.

Most restaurants require payment.

But intelligent systems must know when defaults fail.

## Nonmonotonicity Again

Learning:

Tweety is a penguin

forces revision of:

Tweety flies.

Commonsense reasoning is defeasible.

It can retract conclusions.

## World Knowledge

Language understanding requires background knowledge.

The sentence:

"John dropped the glass. It shattered."

is easy because we know:

- glass is fragile,
- falling can cause impact.

Syntax alone is not enough.

## Narrative Understanding

Stories require:

- event order,
- causality,
- goals,
- unstated knowledge.

Frames and scripts were early attempts to represent this hidden structure.

## From Explicit to Learned Structure

The history of AI moves from:

hand-coded frames

toward:

learned representations.

But the underlying requirement did not disappear.

Intelligence still needs structured expectations.

## The Philosophical Lesson

Frames and Conceptual Dependency were attempts to make meaning computational.

Frames represented:

what normally belongs in a situation.

Conceptual Dependency represented:

what an event fundamentally means.

Their specific machinery is historically dated.

Their central problem remains alive.

## The Next Question

Once knowledge is represented, a machine can try to derive new conclusions.

Can reasoning itself be automated?

Can a machine prove mathematical theorems by formal rules?

That leads to:

**Automated Reasoning and Theorem Proving.**
