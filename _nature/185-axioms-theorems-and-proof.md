---
title: 'Axioms, Theorems, and Proof'
permalink: /nature/185-axioms-theorems-and-proof/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 185
tags:
   - axioms
   - theorems
   - proof
   - mathematics
   - formal-systems
---

Mathematics does not usually begin from nothing.

It begins from assumptions.

Some statements are accepted as starting points.

Rules of inference are applied.

New statements are derived.

This gives us:

- axioms,
- theorems,
- proofs.

These concepts form the architecture of formal reasoning.

## Axioms

An **axiom** is a statement accepted as a starting point within a formal system.

It is not proved inside that system from earlier statements.

The axiom provides a foundation for derivation.

## Axioms Are System-Relative

Calling a statement an axiom does not mean:

"this is obviously true in every possible sense."

It means:

within this system, we begin here.

Different formal systems can choose different axioms.

## Euclid

Euclidean geometry famously begins from axioms and postulates.

From them, geometric results are derived.

For centuries, Euclid shaped the ideal of mathematical proof.

A small set of assumptions generates a large theory.

## The Parallel Postulate

Euclid's parallel postulate became especially important.

Mathematicians tried for centuries to derive it from other axioms.

Eventually they discovered consistent geometries in which it is replaced.

This led to:

- hyperbolic geometry,
- elliptic geometry.

An axiom can define a mathematical world.

## Theorem

A **theorem** is a statement proved from:

- axioms,
- definitions,
- earlier theorems

using accepted inference rules.

The theorem is not merely believed.

It is derivable.

## Lemma

A **lemma** is a theorem used mainly to help prove another theorem.

The distinction is pragmatic.

A lemma is not logically weaker because of its name.

It is a supporting result.

## Corollary

A **corollary** follows relatively directly from a theorem.

Again, the label describes role.

Formal status remains theorem-like.

## Proof

A **proof** is a finite sequence of justified steps leading from accepted premises to a conclusion.

Each step must follow by:

- definition,
- axiom,
- inference rule,
- previously proved result.

Proof turns intuition into accountable structure.

## Proof Is More Than Persuasion

A persuasive explanation may feel convincing.

A proof must satisfy explicit standards.

Mathematical culture demands that each inference be checkable.

The goal is not merely confidence.

It is necessity relative to assumptions.

## Direct Proof

A **direct proof** begins from assumptions and derives the target conclusion straightforwardly.

For example, to prove that the sum of two even integers is even:

Let:

\[
a=2m
\]

and:

\[
b=2n
\]

Then:

\[
a+b=2m+2n=2(m+n)
\]

Therefore the sum is even.

## Proof by Contradiction

In **proof by contradiction**, we assume the negation of what we want to prove.

If that assumption leads to contradiction, we reject it.

This method is powerful in classical logic.

It relies on specific logical principles.

## Example: Irrationality of \(\sqrt{2}\)

The classical proof assumes:

\[
\sqrt{2}=\frac{p}{q}
\]

in lowest terms.

Algebra then implies both p and q are even.

That contradicts the assumption that the fraction was reduced.

Therefore \(\sqrt{2}\) is irrational.

## Contrapositive Proof

To prove:

\[
P \rightarrow Q
\]

we may instead prove:

\[
\neg Q \rightarrow \neg P
\]

These are logically equivalent in classical logic.

Sometimes the contrapositive is easier.

## Mathematical Induction

**Mathematical induction** is a deductive proof method.

It should not be confused with empirical induction.

To prove a statement for all natural numbers:

1. prove a base case,
2. prove that if it holds for n, it holds for n+1.

Then the statement holds for all natural numbers under the induction principle.

## Structural Induction

The same idea applies to recursively defined structures.

To prove a property for all trees or formulas:

- prove base structures,
- show constructors preserve the property.

Recursion and proof mirror one another.

## Constructive Proof

A constructive proof may show existence by explicitly building an example.

To prove:

There exists an object with property P,

we construct one.

This provides more information than a purely nonconstructive proof.

## Nonconstructive Proof

A nonconstructive proof may establish that something exists without exhibiting it.

Classical mathematics permits many such arguments.

Constructivist traditions place stricter requirements on existence proofs.

## Existence and Proof Style

Different philosophies of mathematics disagree about what counts as acceptable proof.

For example:

- classical mathematics accepts excluded middle broadly,
- intuitionistic mathematics restricts some uses.

Logic and philosophy meet inside proof practice.

## Definitions

Proofs also depend on definitions.

A definition does not normally assert an empirical fact.

It fixes meaning within a formal context.

For example:

An even integer is an integer divisible by 2.

Definitions create the vocabulary of proof.

## Hidden Assumptions

Informal proofs can accidentally rely on unstated assumptions.

Formalization helps expose them.

This is one reason proof assistants are valuable.

They force every dependency to be explicit.

## Proof Assistants

Modern systems such as Lean, Coq, and Isabelle can verify formal proofs.

A proof is represented in machine-checkable form.

The computer checks whether each step follows from accepted rules.

Mathematical rigor becomes computational.

## Automated Theorem Proving

Some systems search for proofs automatically.

Given:

- axioms,
- conjecture,

the program explores possible derivations.

This connects logic directly to artificial intelligence.

## Proof Search Can Be Hard

Even when a theorem has a short proof, finding it may be difficult.

Verification and discovery are different tasks.

Proof complexity matters.

A system may know how to check a proof without knowing how to find one efficiently.

## Formal Proof vs Human Proof

A formal proof may contain thousands of tiny steps.

A human proof compresses them into conceptual moves.

Humans value:

- insight,
- structure,
- elegance.

Machines value explicit validity.

Both represent the same underlying derivation at different levels.

## Theorem Depends on Axioms

A statement can be provable in one system and not another.

Change the axioms.

Change the theorems.

For example, geometric propositions vary across Euclidean and non-Euclidean systems.

Mathematical truth must be related carefully to model and axiom system.

## Consistency

A formal system should ideally be **consistent**.

It should not prove both:

\[
P
\]

and:

\[
\neg P
\]

for the same proposition.

In classical logic, inconsistency threatens triviality through explosion.

## Independence

A statement is **independent** of a set of axioms if neither it nor its negation can be proved from those axioms.

The parallel postulate provides a historical geometric example.

Set theory later produced profound independence results.

## Proof as Compression

A proof can be viewed as a compressed explanation of why a theorem follows.

Instead of checking every possible case, we exploit structure.

A short proof can establish infinitely many instances.

This is one of mathematics' deepest efficiencies.

## Proof and Understanding

A proof can be valid without being illuminating.

A long machine-generated proof may establish truth without giving human insight.

This creates a distinction between:

- proof,
- explanation.

Mathematics values both.

## The Philosophical Lesson

Axioms define starting points.

Inference rules define permitted moves.

Proof connects them.

Theorems are what becomes derivable.

Formal mathematics is therefore not a collection of isolated truths.

It is a structured consequence system.

## The Next Question

But now a subtle problem appears.

If a statement is true, must there always be a proof?

And if there is a proof, does that make the statement true?

These questions sound similar.

They are not.

The next essay asks:

**Why is truth not the same as proof?**
