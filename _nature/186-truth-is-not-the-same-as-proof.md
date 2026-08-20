---
title: 'Truth Is Not the Same as Proof'
permalink: /nature/186-truth-is-not-the-same-as-proof/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 186
tags:
   - truth
   - proof
   - semantics
   - syntax
   - logic
---

A statement may be true.

A statement may be provable.

These are not the same property.

This distinction is one of the most important in logic.

It separates:

- semantics,
- syntax.

Truth concerns what holds in an interpretation or structure.

Proof concerns what can be derived inside a formal system.

## Truth Is Semantic

Suppose we interpret arithmetic in the ordinary natural numbers:

\[
0,1,2,3,\ldots
\]

A statement is true if it correctly describes that structure.

For example:

\[
2+2=4
\]

is true in the standard natural numbers.

Truth depends on interpretation.

## Proof Is Syntactic

A proof is a sequence of formal expressions generated according to rules.

It depends on:

- axioms,
- inference rules,
- formal language.

Provability is a property inside a system.

## Model vs Proof System

A **model** gives meaning to symbols.

A **proof system** gives rules for deriving formulas.

These are conceptually different.

One is semantic.

The other is syntactic.

Metalogic studies the relationship between them.

## Semantic Consequence

We write:

\[
\Gamma \models \varphi
\]

to mean:

In every model where all statements in \(\Gamma\) are true, \(\varphi\) is also true.

This is semantic consequence.

## Syntactic Derivability

We write:

\[
\Gamma \vdash \varphi
\]

to mean:

There exists a formal proof of \(\varphi\) from assumptions \(\Gamma\).

This is derivability.

The symbols:

\[
\models
\]

and:

\[
\vdash
\]

represent different relations.

## Soundness

A proof system is **sound** if:

\[
\Gamma \vdash \varphi
\]

implies:

\[
\Gamma \models \varphi
\]

In words:

everything provable is semantically valid.

A sound system does not prove false consequences of true premises.

## Completeness

A proof system is **complete** if:

\[
\Gamma \models \varphi
\]

implies:

\[
\Gamma \vdash \varphi
\]

In words:

everything semantically entailed is provable.

Soundness and completeness connect syntax and semantics in opposite directions.

## First-Order Logic

Classical first-order logic has a celebrated completeness theorem.

Gödel proved that every semantically valid first-order formula is formally provable in an appropriate proof system.

This is **Gödel's completeness theorem**.

It should not be confused with his incompleteness theorems.

## Completeness vs Incompleteness

The words sound contradictory.

They are not.

### Completeness theorem
Concerns the proof system of first-order logic relative to all models.

### Incompleteness theorems
Concern sufficiently strong formal theories of arithmetic.

Different question.

Different level.

## Truth in a Particular Structure

A statement can be true in one model and false in another.

For example:

"Every element has an inverse"

may be true in one algebraic structure and false in another.

Truth is model-relative until an intended interpretation is specified.

## Arithmetic's Intended Model

When mathematicians talk about arithmetic truth, they often mean truth in the **standard natural numbers**.

A formal theory such as Peano Arithmetic attempts to capture those truths with axioms and rules.

The crucial question is:

Does the formal theory prove every true arithmetic statement?

Gödel will later show deep limits.

## Proof Depends on Axioms

Suppose a proposition is not derivable from your current axioms.

That does not automatically make it false.

Perhaps:

- the axioms are too weak,
- the statement is independent.

Provability is system-relative.

## Truth Does Not Depend on Our Discovery

A theorem may be true long before anyone finds a proof.

Mathematical discovery changes our knowledge.

It does not obviously change the mathematical structure.

This is one reason many mathematicians distinguish truth from known proof.

## But Philosophies Differ

A Platonist may say mathematical truths exist independently of proof.

A formalist may emphasize derivability within formal systems.

An intuitionist may tie mathematical truth more closely to constructive proof.

The relationship between truth and proof is philosophically contested.

## Intuitionism

In intuitionistic mathematics, asserting a proposition generally requires constructive evidence.

Truth is closely linked to provability.

Even there, "proof" is not simply any formal derivation.

It is tied to construction.

Different logics encode different philosophies.

## Empirical Truth

Outside mathematics, the distinction is even clearer.

"The Earth has one natural satellite."

This can be true because of the world.

A formal proof from axioms alone is not what establishes the fact.

Evidence and observation matter.

## Proof of a Scientific Claim?

Science sometimes uses mathematical proofs inside theories.

But empirical claims are not normally proved in the mathematical sense.

They are supported by:

- observation,
- experiment,
- inference.

Calling scientific results "proven" can hide this difference.

## Computer Verification

A program may be formally proved correct relative to a specification.

But if the specification is wrong, the software can still fail its real-world purpose.

Proof guarantees relation to assumptions.

It cannot guarantee assumptions match reality.

## Proof and Meaning

A formal derivation manipulates symbols.

For it to tell us something substantive, those symbols must be interpreted.

Syntax gives proof.

Semantics gives truth conditions.

Neither should be confused with the other.

## False but Provable?

In a sound system, a false statement is not provable relative to the intended semantics.

But an unsound or inconsistent system may prove falsehoods.

So provability alone does not guarantee truth unless we trust the system.

## True but Unprovable?

This is the more surprising possibility.

Can a statement be true in the intended interpretation but unprovable from the axioms?

For sufficiently rich arithmetic systems, yes.

That is the territory of Gödel's incompleteness theorem.

We will reach it later.

## Independence

An independent statement cannot be proved or refuted from a given axiom set.

Its truth may vary across models of those axioms.

This shows that axioms can underdetermine some questions.

## Continuum Hypothesis

A famous example is the **Continuum Hypothesis** relative to standard set-theoretic axioms.

Gödel and Cohen showed that, assuming consistency, it can neither be proved nor disproved from ZFC.

This is independence, not simple ignorance.

## Truth Predicate vs Provability Predicate

Truth and provability behave differently.

A theory may be able to represent claims about which statements are provable.

Defining its own full truth predicate is much harder.

Tarski's undefinability theorem will later make this precise.

## Proof Is Public

One advantage of proof is that it can be checked.

A proof externalizes justification.

It does not ask us to trust private intuition.

This public character makes mathematics cumulative.

## Truth Can Exceed Method

The deeper philosophical possibility is that a fixed formal method may not capture every truth in its intended domain.

If so, formalization has limits.

This does not make reasoning useless.

It tells us what kind of power formal reasoning has.

## The Philosophical Lesson

Truth asks:

**What is the case?**

Proof asks:

**What follows from these axioms by these rules?**

The two can align beautifully.

They are not identical.

Keeping them separate is essential for understanding:

- completeness,
- incompleteness,
- decidability.

## The Next Question

Logic aims to preserve consistency.

But what happens when a system contains both:

\[
P
\]

and:

\[
\neg P
\]

What exactly is a contradiction, and why is it so dangerous in classical logic?

That is the next topic:

**contradictions.**
