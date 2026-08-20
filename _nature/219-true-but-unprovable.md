---
title: 'True but Unprovable'
permalink: /nature/219-true-but-unprovable/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 219
tags:
   - truth
   - unprovability
   - godel
   - arithmetic
   - metamathematics
---

Few phrases in logic are as famous as:

**true but unprovable.**

Few are as easy to misunderstand.

Gödel's incompleteness theorem does not reveal mysterious truths floating beyond all reason.

It shows that truth and provability depend on different structures.

To understand the phrase, we must always ask:

- true where?
- unprovable from what?

## Truth Requires an Interpretation

A formal sentence has meaning only relative to an interpretation.

For arithmetic, the intended structure is usually the standard natural numbers:

\[
\mathbb{N}=\{0,1,2,3,\ldots\}
\]

When logicians call a Gödel sentence true, they normally mean:

true in this standard model.

## Provability Requires a Formal Theory

Provability is relative to:

- axioms,
- inference rules.

A sentence may be unprovable in Peano Arithmetic but provable in a stronger theory.

So:

"unprovable"

without naming a system is incomplete.

## Two Relations

Semantic truth:

\[
\mathbb{N}\models G
\]

Formal provability:

\[
T\vdash G
\]

Gödel shows these can come apart for sufficiently strong effective theories T.

## The Gödel Sentence

For a suitable theory T, construct G such that:

\[
G\leftrightarrow \neg Prov_T(\ulcorner G\urcorner)
\]

Informally:

G says:

"G has no proof in T."

If T is appropriately sound, then G is indeed true but not provable in T.

## Why We Need a Meta-Level

T itself cannot prove G.

But from outside T, we may reason about:

- T's axioms,
- T's proof rules,
- T's consistency.

The metatheory can establish facts the object theory cannot.

This is not cheating.

It is a change of level.

## Stronger System

Suppose stronger theory U can prove:

\[
Con(T)
\]

and enough metamathematics about T.

Then U may be able to prove G.

So G is not absolutely beyond mathematics.

It is beyond T.

## The Ladder

We can imagine:

\[
T_0
\]

then a stronger:

\[
T_1
\]

then:

\[
T_2
\]

Each system may settle statements undecidable in weaker systems.

But each suitable effective consistent system acquires new undecidable statements of its own.

There is no final rung produced by this method.

## Truth Is Not "What We Can Prove"

If truth were defined simply as:

provable in T,

then incompleteness would disappear by definition.

But we would no longer be talking about truth in the standard natural numbers.

We would be talking about theoremhood.

The distinction is substantive.

## Proof Does Not Create Truth

A proof demonstrates that a conclusion follows from axioms under rules.

It does not cause the represented mathematical fact to become true.

This is especially intuitive for mathematical realists.

Other philosophies interpret the relation differently.

## Formalism

A strict formalist may resist talk of an independently existing realm of mathematical truth.

For a formalist, theoremhood inside systems may be primary.

Even then, model theory still provides a precise distinction between:

- derivability,
- satisfaction.

The mathematics of the distinction remains.

## Platonism

A Platonist may say:

mathematical truths exist independently of our proof systems.

On this view, Gödel naturally shows that formal systems only capture fragments of a larger mathematical reality.

This interpretation is philosophically attractive to some mathematicians.

It is not itself a theorem of Gödel.

## Intuitionism

An intuitionist links mathematical truth more closely to constructive proof.

So the slogan:

true but unprovable

requires careful reinterpretation.

Different philosophies of mathematics understand "truth" differently.

The formal theorem does not settle the philosophy by itself.

## Standard Model Is External

A subtle question appears:

How do we specify the "standard natural numbers" from outside?

First-order axioms alone cannot uniquely characterize them up to isomorphism.

Our intended interpretation relies on metamathematical understanding.

Formalization never completely eliminates interpretation.

## Nonstandard Models

A theory such as Peano Arithmetic has nonstandard models.

A Gödel sentence G that is true in the standard model may be false in some nonstandard model of the theory.

How?

A nonstandard model can contain what it regards as a "proof" whose length is nonstandard.

Internally, its arithmetic can behave differently from our standard perspective.

## Internal vs External Finiteness

From the model's point of view, some coded object may count as a finite proof.

From the external standard perspective, it does not correspond to any ordinary finite proof.

Nonstandard models make the syntax/semantics boundary subtle.

## "We Can See G Is True"

Popular explanations often say:

"We can see G is true even though the system cannot."

That is only justified if we assume enough about T, such as appropriate soundness.

If T were inconsistent or badly related to standard arithmetic, the inference would fail.

The meta-level assumptions matter.

## Consistency vs Soundness

Ordinary consistency may suffice for incompleteness in Rosser's form.

But to infer that a specific self-referential sentence is true in standard arithmetic, stronger semantic trust may be needed depending on the construction.

Do not blur:

consistent

with:

all theorems are true in \(\mathbb{N}\).

## Natural Independent Statements

The deepest significance of incompleteness becomes clearer with mathematically natural examples.

A statement need not mention:

- Gödel numbers,
- proofs,
- self-reference

in its surface form to be unprovable in a theory.

## Goodstein's Theorem

Goodstein sequences are generated by:

- changing numerical bases,
- subtracting one.

The numbers can initially grow explosively.

Yet every Goodstein sequence eventually reaches zero.

This is true.

Peano Arithmetic cannot prove the general theorem.

Stronger ordinal reasoning can.

## Why Goodstein Is Striking

The statement concerns ordinary finite natural numbers.

No explicit self-reference appears.

Yet its proof requires strength beyond Peano Arithmetic.

Incompleteness enters ordinary arithmetic.

## Paris–Harrington

The Paris–Harrington theorem strengthens a finite combinatorial principle related to Ramsey theory.

It is true in standard arithmetic.

It is not provable in Peano Arithmetic.

Again, natural mathematics crosses a formal boundary.

## Continuum Hypothesis Is Different

The Continuum Hypothesis is independent of ZFC, assuming consistency.

But calling it simply:

"true but unprovable"

would be misleading.

Within ordinary ZFC foundations, both CH and its negation are compatible with the axioms.

Its truth depends on what additional set-theoretic framework one accepts.

## Independence Does Not Automatically Pick a True Side

If T cannot prove P or not-P, that alone does not tell us which is true in an intended structure.

For arithmetic with a fixed standard model, there may be a determinate semantic answer.

For foundational set-theoretic questions, intended semantics can itself be philosophically contested.

## Proof Relative to Axioms

A mathematical theorem is never just:

"proved."

More precisely:

it is derived from assumptions.

Usually the assumptions are so standardized that we omit them.

In foundations, we must make them visible.

## Euclidean Geometry Analogy

The parallel postulate is not provable from the remaining Euclidean axioms.

Add it:

Euclidean geometry.

Replace it:

non-Euclidean geometry.

The statement is not globally "unprovable."

Its status is relative to an axiom system.

## Computer Proof Systems

The same lesson applies to proof assistants.

A machine-checked theorem is proved relative to:

- formal definitions,
- imported axioms,
- trusted kernel.

Formal certainty is conditional.

## Scientific Truth Is Different

In science, "unprovable" has a different flavor.

Empirical claims are normally not proved deductively from axioms.

They are supported by evidence.

Gödel's theorem is not a theorem about experimental uncertainty.

It concerns formal mathematical systems.

## Unprovability Is Not Unknowability

A sentence unprovable in T may be:

- provable in U,
- established by metatheory,
- accepted for other mathematical reasons.

So:

unprovable in T

does not imply:

unknowable by any means.

## Unprovability Is Not Meaninglessness

An undecidable arithmetic sentence can still have a clear semantic meaning.

The theory's inability to settle it does not make it vague.

Formal limitation is not semantic emptiness.

## Unprovability Is Not Randomness

A statement does not become arbitrary because T cannot decide it.

It may have a fixed truth value in the intended model.

Undecidability means the axioms do not determine it proof-theoretically.

## Can We Capture All True Arithmetic Sentences?

There is a complete set:

all sentences true in standard arithmetic.

But this set is not effectively axiomatizable.

No algorithm can enumerate exactly all standard arithmetic truths as theorems of a complete effective proof system.

## Effective Formalization Is the Price Point

If we abandon effectiveness, we can simply take all true arithmetic sentences as axioms.

Then the theory is complete.

But it no longer provides the mechanical formal system Hilbert hoped for.

The tradeoff is:

complete truth

vs

effective axiomatization.

## The Boundary Moves with the System

Every formal theory draws a boundary around what it can prove.

Stronger axioms move that boundary.

Gödel says no suitable fixed effective system removes the boundary entirely.

Formal reasoning is extensible but not finally closed.

## The Philosophical Lesson

"True but unprovable" should always be expanded into something like:

**true in a specified intended structure but not derivable from a specified formal theory.**

That sentence is less dramatic.

It is also more accurate.

The power of Gödel lies in the precision.

## The Next Question

Gödel's first theorem limits what a theory can prove about arithmetic.

The second turns the system's attention toward itself.

Can a sufficiently strong consistent theory prove:

**I am consistent**?

The answer reveals an even deeper limit.

That is:

**Gödel's Second Incompleteness Theorem.**
