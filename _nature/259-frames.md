---
title: 'Frames'
permalink: /nature/259-frames/
chapter: 14
chapter_title: 'Brain, Mind, and Self'
order: 259
tags:
   - frames
   - knowledge-representation
   - cognition
   - context
   - artificial-intelligence
---

Context tells us how to interpret a situation.

A **frame** goes further.

It organizes what we expect the situation to contain.

When you enter a restaurant, you do not see:

random people,
random furniture,
random actions.

You immediately recognize a structured scene involving:

- tables,
- menus,
- servers,
- ordering,
- paying.

The frame supplies what is normally there.

## What Is a Frame?

In cognitive science and artificial intelligence, a frame is a structured representation of a familiar situation or object.

It contains slots for expected features.

A restaurant frame might include:

- customer,
- table,
- menu,
- food,
- server,
- bill.

## Defaults

Frames often contain **default values**.

A bird normally:

- has wings,
- has feathers,
- can fly.

But defaults allow exceptions.

Penguins remain birds.

A frame is more flexible than a strict definition.

## Slots

A frame can be imagined as containing named slots.

For example:

```text
PERSON
name:
age:
occupation:
location:
```

Specific instances fill the slots.

Structured knowledge becomes computationally manageable.

## Minsky's Frames

Marvin Minsky developed frames as a way to represent stereotyped knowledge.

The idea was that intelligence requires more than isolated facts.

It needs structured expectations about situations.

## Why Isolated Facts Are Not Enough

Suppose a system knows:

- restaurants contain tables,
- food can be ordered,
- bills are paid.

Unless these facts are connected into a coherent structure, understanding a restaurant scene remains difficult.

Frames provide organization.

## Expectations

Frames let us predict missing information.

If someone says:

"I went to a restaurant and ordered soup,"

we assume many unstated details.

Perhaps:

- there was a menu,
- someone served the food,
- payment occurred.

The frame supplies defaults.

## Compression Through Shared Knowledge

This dramatically compresses communication.

We do not need to describe every familiar detail.

Speaker and listener rely on the same frame.

## Frames and Scripts

Frames represent structured situations.

**Scripts** emphasize typical sequences of events.

Restaurant script:

1. enter,
2. sit,
3. order,
4. eat,
5. pay,
6. leave.

The concepts overlap.

## Slots and Fillers

A slot is a role.

A filler is the particular value occupying that role.

For example:

restaurant customer → Alice.

server → Bob.

Frames turn scenes into relational structures.

## Inheritance

Frames can be arranged hierarchically.

A:

golden retriever

inherits properties from:

dog,

which inherits from:

mammal.

Inheritance reduces repetition.

## Exceptions

Inheritance creates a famous difficulty.

Birds normally fly.

Penguins do not.

Knowledge systems need mechanisms for overriding defaults.

## Nonmonotonic Reasoning

Classical logic is monotonic:

adding premises cannot invalidate previous conclusions.

Everyday reasoning is often **nonmonotonic**.

We infer:

Tweety is a bird → Tweety probably flies.

Then learn:

Tweety is a penguin.

The conclusion is withdrawn.

## Default Logic

Formal systems such as default logic attempt to model this kind of reasoning.

Typical rule:

Birds normally fly,

unless evidence indicates otherwise.

This is closer to human commonsense reasoning.

## Frames and Context

Context helps select the active frame.

The word:

"pitch"

means something different in:

- baseball,
- music,
- sales.

Once the frame is selected, interpretation narrows.

## Frame Switching

A person can reinterpret the same event under a different frame.

A loud argument may be:

- conflict,
- theater rehearsal,
- negotiation exercise.

Changing frame changes meaning.

## Framing Effect

In decision psychology, framing also refers to how equivalent information is presented.

This is related but not identical to Minsky-style knowledge frames.

The shared idea is:

representation shapes interpretation.

## Semantic Frames

Linguistics studies **frame semantics**, associated with Charles Fillmore.

A word evokes a structured conceptual scene.

For example:

buy

implies roles such as:

- buyer,
- seller,
- goods,
- money.

Meaning is relational.

## Verb Meaning

Consider:

sell.

The same commercial event can be described from another role perspective.

Frames explain why different words highlight different participants.

## Frames and Memory

Memories are often reconstructed using schematic knowledge.

If an event is incomplete, the mind may fill in expected details.

This helps comprehension.

It can also create false memories.

## Schema

The term **schema** is closely related.

A schema is a generalized structure of knowledge guiding:

- perception,
- memory,
- action.

Frames are often treated as a more structured computational version of schemas.

## Bartlett Again

Bartlett's memory experiments showed that unfamiliar stories were often remembered in ways that fit familiar schemas.

Memory is shaped by expectation.

Frames can overwrite detail.

## Frames and Perception

When walking into a classroom, we recognize:

- instructor area,
- student seating,
- board.

The frame guides attention.

We do not inspect every object equally.

## Attention

Frames prioritize what matters.

In a medical examination, a physician notices different details from a tourist.

Expertise activates richer frames.

## Expertise

Experts possess specialized frames.

A novice sees:

a chessboard full of pieces.

An expert sees:

- tactical motifs,
- weak squares,
- familiar structures.

Knowledge changes perception.

## Frames and Problem Solving

A problem may appear difficult because it is represented under the wrong frame.

Reframing can reveal a solution.

This connects frames to abstraction.

## Functional Fixedness

A classic cognitive bias occurs when an object is trapped inside its familiar frame.

A box is seen only as:

container.

Its potential use as:

platform

may be missed.

This is **functional fixedness**.

## Reframing

Creative problem solving often requires breaking the default frame.

Ask:

What else could this object be?

What assumption am I taking for granted?

Creativity can begin as frame change.

## Political and Social Frames

Public communication often frames issues.

An economic policy can be described as:

- investment,
- spending,
- burden,
- protection.

Different frames highlight different values and causal stories.

Frames influence judgment.

## Frames Are Not Neutral

A frame determines:

- what is foreground,
- what is ignored,
- which roles exist.

Selecting a frame is already a conceptual act.

## Cognitive Economy

Frames reduce processing cost.

Instead of reasoning from scratch, we reuse structured knowledge.

This makes cognition efficient.

It also makes cognition vulnerable to stereotype.

## Stereotypes as Social Frames

A stereotype is a simplified frame applied to social groups.

It may provide expectations.

But it can:

- overgeneralize,
- ignore individuality,
- reproduce bias.

Efficiency can conflict with fairness.

## Frame Problem in AI

Artificial intelligence has a famous **frame problem**.

If an agent performs an action, what remains unchanged?

A robot moves a cup.

Do we need to explicitly state that:

- wall color did not change,
- the moon still exists,
- every unrelated object remains where it was?

Naive logical systems face enormous bookkeeping.

## The Original Frame Problem

The frame problem emerged in formal reasoning about action.

A system must represent:

- what changes,
- what persists.

Most facts stay the same after most actions.

Encoding all nonchanges explicitly is impractical.

## Persistence

Humans assume persistence automatically.

If I move a book, I do not reconsider the entire universe.

Commonsense reasoning uses defaults.

## Qualification Problem

Relatedly, actions depend on hidden preconditions.

Turning a key normally starts a car.

Unless:

- battery is dead,
- fuel is absent,
- engine is broken.

We cannot list every possible exception.

This is the **qualification problem**.

## Ramification Problem

Actions can have many indirect consequences.

Turning on a heater changes:

- temperature,
- energy use,
- perhaps thermostat behavior.

Representing all consequences is difficult.

This is the **ramification problem**.

## Commonsense Knowledge

These problems reveal why general intelligence is hard.

Humans possess enormous background knowledge about:

- objects,
- causality,
- persistence,
- social rules.

Most of it is implicit.

## Frames in Modern AI

Modern machine learning often does not use explicit hand-coded frames.

Yet models still learn structured contextual regularities.

The architecture differs.

The problem of organizing background knowledge remains.

## Language Models

A language model may infer a frame from text.

Mention:

"boarding pass"

and it activates patterns related to:

- airport,
- flight,
- gate.

The structure is learned statistically rather than manually encoded.

## Statistical Frames

Learned representations can approximate frame-like organization.

But they may be:

- implicit,
- distributed,
- difficult to inspect.

The old problem survives in a new form.

## Frames and Prediction

Frames are predictive.

Once a frame is active, the mind expects:

what usually comes next.

This accelerates perception and comprehension.

## Frames and Surprise

When events violate a frame, they become salient.

A waiter lying under a restaurant table attracts attention because it violates expectation.

Surprise is model error.

## Frame Revision

Repeated violations can force a frame to change.

Learning is not only filling slots.

Sometimes the structure itself must be rewritten.

## Scientific Frames

Scientific paradigms are larger than ordinary cognitive frames, but there is a family resemblance.

A framework tells researchers:

- what entities matter,
- what questions make sense,
- what counts as evidence.

Conceptual revolutions involve reframing.

## Self Frames

We also maintain frames about ourselves.

For example:

"I am good at mathematics."

This affects:

- expectations,
- persistence,
- interpretation of failure.

Self-models can become self-reinforcing.

## The Philosophical Lesson

Frames organize knowledge by providing:

- roles,
- defaults,
- expectations,
- relationships.

They make cognition efficient because the world is rarely interpreted from scratch.

But the same efficiency can trap thought inside inherited assumptions.

## The Next Question

Frames structure how we interpret the world.

But how well can the mind inspect itself?

When we look inward, do we directly observe our own mental processes?

Or do we infer them from partial evidence?

The next topic is:

**Introspection.**
