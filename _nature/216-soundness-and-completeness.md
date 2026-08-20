---
title: 'Soundness and Completeness'
permalink: /nature/216-soundness-and-completeness/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 216
tags:
   - soundness
   - completeness
   - semantics
   - syntax
   - first-order-logic
---

Formal logic has two worlds.

One is syntactic:

- axioms,
- formulas,
- proofs.

The other is semantic:

- interpretations,
- models,
- truth.

**Soundness** and **completeness** describe how well these worlds fit together.

## Two Symbols

Recall:

\[
\Gamma\vdash\varphi
\]

means:

\(\varphi\) is formally derivable from premises \(\Gamma\).

And:

\[
\Gamma\models\varphi
\]

means:

every model satisfying \(\Gamma\) also satisfies \(\varphi\).

One is proof.

The other is semantic consequence.

## Soundness

A proof system is **sound** if:

\[
\Gamma\vdash\varphi
\]

implies:

\[
\Gamma\models\varphi
\]

Everything provable is semantically valid.

## Why Soundness Matters

If a proof system were unsound, it could certify invalid inferences.

A formally correct-looking proof might lead from true premises to a false conclusion.

The proof rules would be unreliable.

## Local Rule Soundness

Soundness is often established by showing each inference rule preserves truth.

For example, modus ponens:

From:

\[
P
\]

and:

\[
P\rightarrow Q
\]

infer:

\[
Q
\]

If both premises are true, Q must be true.

The rule preserves truth.

## Proof by Induction on Derivations

Once every axiom is valid and every rule preserves validity, we can prove:

every derivable theorem is valid.

The proof often proceeds by induction on proof length.

Meta-reasoning validates object-level reasoning.

## Completeness

A proof system is **complete** if:

\[
\Gamma\models\varphi
\]

implies:

\[
\Gamma\vdash\varphi
\]

Everything semantically entailed can be formally proved.

No valid consequence escapes the proof system.

## Sound but Incomplete

A proof system may derive only valid conclusions but fail to derive some valid ones.

Then it is:

sound,
but incomplete.

It is trustworthy but too weak.

## Complete but Unsound

A system could derive every semantically valid statement and also derive invalid ones.

Then it might count as complete in one narrow sense but not sound.

Such a proof system is not useful for reliable reasoning.

## Sound and Complete

The ideal is:

\[
\Gamma\vdash\varphi
\quad\text{iff}\quad
\Gamma\models\varphi
\]

Proof and semantic consequence coincide.

For classical propositional and first-order logic, suitable proof systems achieve this.

## Propositional Completeness

Every propositional tautology can be proved in a complete propositional proof system.

Because truth tables provide a finite semantics, this may feel unsurprising.

First-order completeness is much deeper.

## Gödel's Completeness Theorem

In 1929, Gödel proved the completeness of first-order logic.

If a first-order sentence is true in every model satisfying the premises, then there is a formal proof.

Symbolically:

\[
\Gamma\models\varphi
\Rightarrow
\Gamma\vdash\varphi
\]

This was a major triumph of formal logic.

## Why Completeness Is Surprising

Semantic consequence quantifies over all models.

There may be infinitely many, of many different sizes.

Yet a finite symbolic proof system captures every valid consequence.

Infinite semantic universality is matched by finite derivability.

## Consistency and Models

The completeness theorem has an important consequence:

If a first-order theory is syntactically consistent, then it has a model.

Otherwise, if it had no model, every formula would be semantically entailed, and completeness would make contradiction provable.

Syntax and model existence align.

## Compactness Follows

Completeness helps establish the compactness theorem:

If every finite subset of a first-order theory is satisfiable, the whole theory is satisfiable.

This produces surprising models.

## Nonstandard Arithmetic

Compactness helps explain why first-order arithmetic has nonstandard models.

The axioms cannot uniquely isolate the standard natural numbers among all models.

Logical completeness coexists with theory-level incompleteness.

## The Famous Apparent Contradiction

Students often ask:

How can Gödel prove both:

- completeness,
- incompleteness?

The answer is that the theorems concern different things.

## Completeness of Logic

Gödel's **completeness theorem** says:

all first-order logical validities are provable.

It concerns the proof system of first-order logic relative to all models.

## Incompleteness of Arithmetic Theories

Gödel's **incompleteness theorem** says:

certain sufficiently strong effectively axiomatized consistent theories cannot decide every arithmetic statement.

It concerns a particular theory inside first-order logic.

No contradiction exists.

## Logical Validity vs Arithmetic Truth

A sentence true in the standard natural numbers is not necessarily logically valid.

Logical validity means:

true in every relevant model.

Arithmetic truth means:

true in one intended structure.

This distinction resolves much confusion.

## Example

The statement:

\[
0+0=0
\]

is true in standard arithmetic.

But interpreted in an arbitrary first-order structure with arbitrary symbols, its formal analogue need not be logically valid unless axioms constrain those symbols.

Theory supplies meaning beyond pure logic.

## Theory Completeness

A theory T is sometimes called **complete** if for every sentence \(\varphi\):

\[
T\vdash\varphi
\]

or:

\[
T\vdash\neg\varphi
\]

This is a different use of "complete."

Context matters.

## Semantic Completeness of a Theory

One may also discuss whether a theory characterizes intended models sufficiently.

Again, terminology varies.

Logical writing must distinguish:

- completeness of a proof calculus,
- completeness of a theory.

## Decidability Is Different Again

Even if a logical system is complete, it need not be decidable.

First-order logic is complete.

But first-order validity is undecidable.

Every valid formula has a proof.

There is no algorithm that always determines validity.

## Why Proof Search Is Not a Decider

Since proofs are enumerable, we can search for a proof of \(\varphi\).

If \(\varphi\) is valid, completeness guarantees eventual success.

If it is invalid, search may continue forever.

Completeness gives semi-decidability, not full decidability.

## Soundness and Trust

When a machine checks a proof, we trust:

- the proof kernel,
- the formal rules,
- the hardware and implementation.

Formal soundness reduces the trusted base.

It does not eliminate all assumptions.

## Proof Assistants

Proof assistants are designed around small trusted kernels.

A large automated tactic may produce a proof term.

The kernel checks it.

This architecture separates:

- creative search,
- trusted verification.

## Semantic Models in Verification

Software verification also mirrors soundness and completeness.

A verifier may be sound:

whenever it says "safe," the program really satisfies the modeled property.

But it may be incomplete:

some safe programs cannot be proved safe by the tool.

This is a common engineering tradeoff.

## Static Analysis

Many static analyzers intentionally prefer soundness over completeness.

They may report false alarms rather than miss real errors.

Other tools choose different tradeoffs.

Metalogical concepts become engineering design choices.

## Natural-Language Reasoning

Human reasoning is neither a clean proof calculus nor a complete semantic engine.

We use:

- heuristics,
- analogy,
- incomplete models.

Formal soundness/completeness provide ideals, not descriptions of cognition.

## Tarski's Perspective

Semantics requires a metalanguage in which truth for the object language can be defined.

This is one reason truth and proof occupy different levels.

Tarski will later sharpen the limits of self-contained truth definitions.

## The Philosophical Lesson

Soundness asks:

Does proof ever go beyond truth?

Completeness asks:

Does truth ever go beyond proof?

For first-order logical validity, the two align beautifully.

For sufficiently rich mathematical theories, the story becomes more complicated.

## The Next Question

Even a sound and complete logical proof system may face another problem.

Can an algorithm always determine whether a sentence is derivable or valid?

This is the question of:

**decidability.**
