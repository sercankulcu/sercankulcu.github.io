---
title: "Gödel's First Incompleteness Theorem"
permalink: /nature/218-godels-first-incompleteness-theorem/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 218
tags:
   - godel
   - incompleteness
   - arithmetic
   - provability
   - formal-systems
---

In 1931, Kurt Gödel proved one of the most important results in modern logic.

Very roughly:

Any sufficiently strong, effectively axiomatized, consistent formal system capable of expressing basic arithmetic contains statements it cannot decide.

The theorem changed how we understand the limits of formal reasoning.

## What the Theorem Does Not Say

It does not say:

- mathematics is unreliable,
- nothing can be proved,
- every truth is unknowable,
- computers are useless,
- humans are automatically superior to machines.

It says something precise about a certain class of formal systems.

## The Kind of System Gödel Targets

The system must be sufficiently strong to represent enough arithmetic.

It must also be effectively axiomatized.

That means, roughly, that its axioms and proof rules are given in a way suitable for mechanical proof checking and enumeration.

And it must satisfy an appropriate consistency condition.

## Why Arithmetic Matters

Arithmetic can encode:

- finite sequences,
- formulas,
- proofs,
- computation.

Gödel numbering converts syntax into arithmetic.

Once this is possible, a theory can represent statements about its own proof machinery.

## Step 1: Encode Syntax

Every symbol receives a number.

Every formula receives a number.

Every proof receives a number.

Then relations such as:

"p is a valid proof of formula q"

become arithmetic relations.

## Step 2: Represent Provability

Inside the arithmetic theory, define a formula corresponding to:

\[
Prov(x)
\]

meaning, informally:

"The sentence with Gödel number x is provable in this theory."

The theory can now speak about its own provability relation in coded form.

## Step 3: Diagonalization

The diagonal lemma allows construction of a sentence \(G\) satisfying:

\[
T\vdash G\leftrightarrow \neg Prov(\ulcorner G\urcorner)
\]

Informally:

G says:

**G is not provable in T.**

## Suppose T Proves G

Assume:

\[
T\vdash G
\]

Then there actually is a formal proof of G.

Under the intended representation of provability, the system can recognize the existence of that proof strongly enough for the Gödel argument.

But G asserts that no such proof exists.

Under the required consistency conditions, this cannot happen.

So:

\[
T\nvdash G
\]

## What G Says

G says:

"I am not provable in T."

And we have just argued:

G is indeed not provable in T.

So from the external metatheoretic standpoint, under suitable soundness assumptions, G is true in the standard natural numbers.

## Why G Is Not a Liar Sentence

The Liar says:

"This sentence is false."

If true, false.

If false, true.

Gödel's sentence says:

"This sentence is not provable."

Truth and provability are not identical.

That difference converts paradox into incompleteness.

## Does T Prove Not-G?

For incompleteness, we want neither side to be provable.

Gödel's original proof used a stronger hypothesis called **\(\omega\)-consistency** to establish that:

\[
T\nvdash \neg G
\]

Later results, especially Rosser's improvement, weakened the requirement.

## Rosser's Improvement

J. Barkley Rosser showed that ordinary consistency is enough for a strengthened incompleteness construction.

This is why modern summaries often state the theorem using consistency alone, with appropriate formal assumptions.

Technical formulation matters.

## The First Incompleteness Theorem

One standard modern form is:

Any consistent, effectively axiomatized theory strong enough to represent a suitable amount of arithmetic is incomplete.

There exists a sentence G such that:

\[
T\nvdash G
\]

and:

\[
T\nvdash\neg G
\]

## Theory-Level Incompleteness

Here **incomplete** means:

there is some sentence the theory does not decide.

It does not mean the proof calculus of first-order logic is incomplete.

Gödel's completeness theorem remains true.

## Completeness Theorem vs Incompleteness Theorem

### Completeness theorem
Every first-order logical consequence has a formal proof.

### Incompleteness theorem
A particular sufficiently strong arithmetic theory cannot decide every sentence in its language.

Different targets.

No contradiction.

## Why First-Order Arithmetic Has Nonstandard Models

If T does not decide G, then both:

\[
T+G
\]

and:

\[
T+\neg G
\]

may be consistent relative to T under suitable conditions.

These theories have different models.

The formal axioms do not isolate only one intended arithmetic structure.

## Standard Truth

When we say G is "true," we usually mean:

true in the standard model:

\[
\mathbb{N}=\{0,1,2,\ldots\}
\]

This distinction is essential.

Some nonstandard models of T may satisfy \(\neg G\).

Truth must be tied to interpretation.

## Can We Just Add G?

Yes.

Create:

\[
T'=T+G
\]

Now G is an axiom.

The new theory proves it.

But if T' remains effectively axiomatized, consistent, and sufficiently strong, Gödel applies again.

There is another undecidable sentence \(G'\).

## No Final Effective Completion

We can repeatedly strengthen theories.

But there is no single consistent effectively axiomatized sufficiently strong theory that captures every standard arithmetic truth.

The gap cannot be closed once and for all by an effective axiom list.

## True Arithmetic

Consider the set of all first-order sentences true in the standard natural numbers.

This theory is complete:

for each sentence P, either P or not-P is true.

But the complete theory of standard arithmetic is not effectively axiomatizable.

Completeness can be bought only by giving up effective axiomatization.

## Why This Matters for Mechanization

A mechanical proof system needs effective rules.

Gödel shows that if such a system is sufficiently strong and consistent, some arithmetic truths lie beyond its proof reach.

Mechanization has a structural ceiling.

## Incompleteness Is Not Mere Human Ignorance

The undecidable sentence is not merely:

"Nobody has found a proof yet."

Relative to T:

there is no proof.

That is a mathematical statement about the formal system.

## Incompleteness Is Theory-Relative

A statement unprovable in T may be provable in a stronger theory U.

So "unprovable" must always be read as:

unprovable from which axioms?

There is no absolute unprovability without specifying a framework.

## Independence in Mathematics

Gödel's theorem opened the door to broader independence phenomena.

Later mathematics discovered natural statements independent of familiar axiom systems.

Examples include:

- Continuum Hypothesis relative to ZFC,
- certain combinatorial principles,
- large-cardinal-related statements.

Not all independence results arise through exactly the same construction.

## Goodstein's Theorem

Goodstein's theorem is a striking arithmetic example.

Its statement is elementary to formulate.

It is true in standard arithmetic.

Yet it cannot be proved in Peano Arithmetic.

A stronger system can prove it.

This gives a more natural example than the self-referential Gödel sentence.

## Paris–Harrington Theorem

The Paris–Harrington theorem is another natural combinatorial statement independent of Peano Arithmetic.

It strengthened the philosophical significance of incompleteness:

unprovability is not limited to artificial self-referential sentences.

## Does Gödel Show Mathematics Is Inexhaustible?

In one important sense, yes.

Any fixed effective sufficiently strong consistent formal theory can be extended with truths it cannot prove.

But the phrase "inexhaustible" should not be turned into mysticism.

The theorem is formal and conditional.

## Human Mind Claims

Some arguments claim:

Humans can see G is true,
therefore humans are not machines.

The reasoning is too quick.

To infer G's truth, we assume facts such as the consistency or soundness of T.

Humans may not be able to establish those assumptions infallibly.

## Machines Can Move to Stronger Systems Too

A machine is not required to remain inside one fixed theory forever.

It can be programmed to:

- extend axioms,
- use stronger systems,
- reason metatheoretically.

Gödel limits each appropriate fixed effective system.

It does not freeze all computation into one theory.

## The Theorem Is Constructive in Spirit

Gödel did not merely say:

"Some truth must be missing."

His method shows how, given an appropriate system T, one can construct a sentence related to T's own provability limitations.

The missing statement is tied to the system itself.

## The Deep Pattern

The architecture is:

1. formalize arithmetic,
2. encode syntax,
3. represent proof,
4. diagonalize,
5. create self-reference,
6. expose a limit.

The result is not an accident.

It grows from self-representation.

## The Philosophical Lesson

Gödel's first incompleteness theorem shows that formal rigor does not imply formal completeness.

A system can be:

- precise,
- consistent,
- mechanically checkable,
- mathematically powerful,

and still fail to decide every arithmetic statement expressible within it.

The limit comes from strength, not weakness.

## The Next Question

The phrase most associated with Gödel is:

**true but unprovable.**

But that phrase can easily mislead.

True in what model?

Unprovable in what theory?

And how can we know such a statement is true if the theory itself cannot prove it?

That is the next topic.
