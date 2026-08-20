---
title: 'How Machines Represent Knowledge'
permalink: /nature/280-how-machines-represent-knowledge/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 280
tags:
   - knowledge-representation
   - artificial-intelligence
   - symbols
   - ontologies
   - reasoning
---

An intelligent system must do more than store data.

It must represent:

- objects,
- properties,
- relations,
- events,
- rules.

The problem is not only:

What does the system know?

It is also:

How is that knowledge structured so the system can use it?

This is the problem of **knowledge representation**.

## Data Is Not Yet Knowledge

A list of facts can be large.

But if the system cannot connect them, infer from them, or use them in context, the list has limited intelligence.

Knowledge requires organization.

## Representation Revisited

A representation allows one thing to stand for another.

A machine may represent:

Paris

using:

- a symbol,
- a database record,
- a vector.

Different representations support different operations.

## Symbolic Representation

Classical AI often used explicit symbols.

For example:

```text
CITY(Paris)
CAPITAL_OF(Paris, France)
```

The symbols are discrete.

Their relations are explicit.

## Predicates

Predicates express properties or relations.

Examples:

\[
Bird(Tweety)
\]

\[
LivesIn(Alice, Istanbul)
\]

This connects AI to formal logic.

## Facts

A fact is a represented assertion.

For example:

\[
Human(Socrates)
\]

Facts form a knowledge base.

## Rules

Rules allow inference.

Example:

\[
Human(x)\rightarrow Mortal(x)
\]

Combine this rule with:

\[
Human(Socrates)
\]

to infer:

\[
Mortal(Socrates)
\]

Knowledge becomes active.

## Knowledge Base

A **knowledge base** contains structured statements about a domain.

It may include:

- facts,
- rules,
- definitions.

A reasoning engine derives consequences.

## Declarative Knowledge

Declarative knowledge describes:

what is true.

Example:

Paris is the capital of France.

It is distinct from procedural knowledge.

## Procedural Knowledge

Procedural knowledge describes:

how to do something.

Example:

an algorithm for sorting.

AI systems may store knowledge in both forms.

## Semantic Networks

A **semantic network** represents concepts as nodes and relations as edges.

Example:

```text
Canary --is-a--> Bird
Bird --is-a--> Animal
Bird --has--> Wings
```

Knowledge becomes a graph.

## Inheritance

If:

Canary is-a Bird

and:

Bird has Wings,

we may infer:

Canary has Wings.

Hierarchies reduce duplication.

## Exceptions Again

But default inheritance can fail.

Birds normally fly.

Penguins do not.

Knowledge representation must handle exceptions.

## Frames

Frames represent stereotyped structures.

A frame for:

car

may contain slots such as:

- engine,
- wheels,
- owner.

Frames support defaults and expectations.

## Scripts

Scripts represent common event sequences.

Restaurant script:

- enter,
- order,
- eat,
- pay.

Scripts help interpret narratives.

## Ontologies

An **ontology** formally specifies categories and relations in a domain.

It answers questions such as:

- What kinds of entities exist?
- How are they related?

Ontologies are widely used in information systems.

## Class and Instance

A class represents a category.

An instance represents a particular member.

Example:

Dog = class.

Fido = instance.

## Subclass

A subclass inherits structure from a broader class.

Example:

Labrador ⊆ Dog.

This creates taxonomic organization.

## Description Logics

Some ontology languages are based on **description logics**.

These balance:

- expressive power,
- computational tractability.

They support automated reasoning about classes.

## Semantic Web

Technologies such as RDF and OWL were developed to represent machine-readable relationships on the web.

The goal was to make structured meaning more explicit.

## RDF Triples

RDF represents statements as triples:

subject,
predicate,
object.

Example:

```text
Paris --capitalOf--> France
```

This is graph-like representation.

## Knowledge Graphs

A **knowledge graph** stores entities and relations in graph form.

Examples include:

- people,
- organizations,
- places,
- events.

Graphs support relational queries and inference.

## Entity Resolution

One challenge is determining when two records refer to the same entity.

Example:

"IBM"

and:

"International Business Machines."

Identity is a representation problem.

## Open World vs Closed World

Some systems assume:

if a fact is not in the database, it is false.

This is the **closed-world assumption**.

Others treat missing information as unknown.

This is the **open-world assumption**.

## Database Logic

Ordinary databases often use closed-world reasoning.

Knowledge representation on the open web often requires open-world semantics.

The distinction changes inference.

## Negation

There is a major difference between:

not known to be true

and:

known to be false.

AI systems must represent this carefully.

## Uncertainty

Real knowledge is rarely perfectly certain.

A system may need statements like:

There is a 70% chance of rain.

Symbolic true/false logic is not enough.

## Bayesian Networks

A **Bayesian network** represents probabilistic dependencies among variables.

Edges encode conditional structure.

The system can update beliefs from evidence.

## Example

Suppose:

Rain influences WetRoad.

Then observing a wet road changes the probability of rain.

Knowledge becomes probabilistic.

## Markov Models

Temporal systems may represent state transitions probabilistically.

Examples include:

- Hidden Markov Models,
- dynamic Bayesian networks.

Knowledge can include uncertain dynamics.

## Fuzzy Representation

Some concepts have degrees.

For example:

tall.

Fuzzy systems assign graded membership rather than binary membership.

This is useful for vague categories.

## Case-Based Representation

Instead of abstract rules, a system may store examples.

New problems are solved by retrieving similar past cases.

This mirrors human reasoning.

## Distributed Representation

Modern neural networks represent knowledge differently.

A concept may be encoded across many numerical dimensions.

No single explicit symbol is required.

## Embeddings

An embedding maps items into vectors.

Nearby vectors often represent semantically related items.

For example:

doctor

may be closer to:

hospital

than to:

volcano.

## Geometry as Knowledge

Vector spaces encode relationships through geometry.

Meaning appears as:

- distance,
- direction,
- clustering.

This is fundamentally different from symbolic graphs.

## Latent Representation

Neural representations are often **latent**.

The model uses them internally.

Humans may not be able to interpret each dimension.

The knowledge is usable without being explicit.

## Symbolic vs Distributed

Symbolic systems offer:

- interpretability,
- compositional structure.

Distributed systems offer:

- statistical learning,
- robustness,
- generalization.

Neither is universally superior.

## Neuro-Symbolic AI

**Neuro-symbolic AI** attempts to combine:

- neural learning,
- symbolic reasoning.

The goal is to gain both flexibility and explicit structure.

## Representation Determines Reasoning

A fact stored as:

text

is harder to reason over formally than the same relation encoded as:

predicate.

Representation creates computational affordances.

## Search Revisited

A good representation reduces search.

If a problem is encoded badly, the state space explodes.

Knowledge representation and problem solving are inseparable.

## Commonsense Knowledge

Humans know countless ordinary facts:

- unsupported objects fall,
- containers can hold things,
- people have goals.

Encoding this background knowledge has been a long-standing AI challenge.

## Cyc

The Cyc project attempted to build a huge explicit commonsense knowledge base.

The project illustrates both the ambition and difficulty of hand-encoding ordinary knowledge.

## The Knowledge Acquisition Bottleneck

Experts know much more than they can easily state.

Extracting knowledge into formal structures is slow.

This limited expert systems.

## Learning Knowledge Automatically

Modern systems increasingly learn representations from data.

The advantage is scale.

The disadvantage is reduced explicitness and controllability.

## Grounding

A symbol such as:

apple

must connect somehow to:

- perception,
- action,
- real apples.

Otherwise meaning may remain purely relational.

This is the symbol-grounding problem.

## Multimodal Grounding

Models trained on:

- text,
- images,
- audio

can connect concepts across modalities.

This may improve grounding.

It does not automatically solve philosophical semantics.

## Representation and Bias

A knowledge structure can encode:

- omissions,
- stereotypes,
- historical inequality.

Representation is not neutral.

What categories exist affects what conclusions can be drawn.

## Ontological Commitment

To represent a domain is to commit to certain entities and distinctions.

A database schema says:

these categories matter.

Representation carries ontology.

## Granularity

Should a system represent:

car

or:

vehicle

or:

metal object?

The useful level depends on task.

Too much detail wastes computation.

Too little loses meaning.

## Context

The same symbol may need different interpretation in different contexts.

Knowledge representation must therefore interact with:

- frames,
- goals,
- discourse.

Static meaning is often insufficient.

## Temporal Knowledge

Facts can change.

A person may:

live in Ankara in 2020

and:

Istanbul in 2026.

Knowledge representation needs time.

## Event Representation

Events have:

- participants,
- causes,
- consequences.

Representing events is harder than representing static objects.

This motivated theories such as conceptual dependency.

## Causal Knowledge

Intelligent systems need more than association.

They need to know:

what causes what.

Causal graphs and structural models represent intervention structure.

## Counterfactual Knowledge

A causal model supports questions like:

What would happen if X had not occurred?

This goes beyond ordinary correlation.

## Knowledge and Truth

A machine's stored representation can be wrong.

Knowledge systems therefore need:

- provenance,
- confidence,
- revision.

Representation does not guarantee truth.

## Belief Revision

When new evidence conflicts with old information, the system must decide:

- what to retract,
- what to preserve.

This is the problem of belief revision.

## Truth Maintenance Systems

AI researchers developed **truth maintenance systems** to track dependencies among beliefs.

If one assumption is withdrawn, dependent conclusions can also be revised.

Knowledge must be maintainable.

## Explanation

Explicit representations can support explanation.

A system can show:

which rule,
which fact,
which inference

produced a conclusion.

This is harder with opaque learned representations.

## Knowledge Is Structured Possibility

A useful representation does not merely store facts.

It constrains:

- what can be inferred,
- what can happen,
- what actions make sense.

Knowledge shapes the possible future.

## The Philosophical Lesson

Machines can represent knowledge using:

- symbols,
- graphs,
- probabilities,
- vectors,
- learned latent spaces.

Each representation highlights some structure and hides others.

There is no neutral representation.

How knowledge is represented partly determines what intelligence can do.

## The Next Question

Two influential symbolic approaches tried to encode ordinary structured knowledge more explicitly.

One used:

**frames.**

Another used:

**conceptual dependency.**

How did these systems try to represent meaning?

That is the next topic:

**Frames and Conceptual Dependency.**
