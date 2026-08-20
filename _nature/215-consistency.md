---
title: 'Consistency'
permalink: /nature/215-consistency/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 215
tags:
   - consistency
   - formal-systems
   - contradiction
   - foundations
   - metamathematics
---

A formal system is useful only if its conclusions do not collapse into chaos.

One of the most fundamental requirements is **consistency**.

Informally:

A consistent system does not prove both a statement and its negation.

## Syntactic Consistency

A theory T is syntactically consistent if there is no sentence \(P\) such that:

\[
T\vdash P
\]

and:

\[
T\vdash \neg P
\]

Both cannot be derivable.

## Why This Matters

In classical logic, contradiction can trigger explosion.

If a theory proves:

\[
P
\]

and:

\[
\neg P
\]

then arbitrary formulas may become derivable.

The theory becomes trivial.

## Triviality

A theory is **trivial** if every sentence is provable.

Then:

\[
2+2=4
\]

and:

\[
2+2=5
\]

are both theorems.

Proof no longer distinguishes anything.

Consistency prevents this collapse.

## An Equivalent Classical Form

For many ordinary classical formal systems, consistency is equivalent to:

not every sentence is provable.

Or to:

a fixed contradiction such as:

\[
0=1
\]

is not provable.

The exact formulation depends on the system.

## Consistency Is Metatheoretic

A formal theory proves statements inside itself.

Consistency is a statement **about** the theory.

So consistency naturally belongs to metamathematics.

But Gödel numbering can encode such claims internally.

This creates the conditions for the second incompleteness theorem.

## Semantic Consistency

There is also a semantic perspective.

A set of sentences is satisfiable if there exists a model in which all of them are true.

For first-order logic, satisfiability and syntactic consistency are closely connected by completeness.

## Model Existence

If a first-order theory has a model, it cannot prove a contradiction in a sound proof system.

Why?

A contradiction cannot be true in that model.

A model provides evidence of consistency.

## Completeness Connection

Gödel's completeness theorem gives, for first-order logic:

If a set of sentences is syntactically consistent, then it has a model.

This is a major bridge between:

- proof,
- semantics.

Consistency becomes model existence.

## Absolute Consistency Proofs

Could we prove the consistency of arithmetic using unquestionable principles?

This was central to Hilbert's program.

The challenge is that the proof itself must rely on some background system.

Then we can ask:

Why trust that background system?

## Relative Consistency

Often mathematics proves **relative consistency**.

Example:

If theory A is consistent, then theory B is consistent.

Symbolically:

\[
Con(A)\rightarrow Con(B)
\]

This transfers trust rather than creating it from nothing.

## Model-Based Relative Consistency

To show a theory B is consistent relative to A, construct a model of B inside A.

Then:

If A is consistent,

B must also be consistent.

This method is common in foundations.

## Non-Euclidean Geometry

Historically, consistency questions arose in geometry.

If non-Euclidean geometry can be modeled inside Euclidean or analytic geometry, then a contradiction in the former would imply one in the latter.

This established relative consistency.

## Set Theory and Independence

Gödel and Cohen's work on the Continuum Hypothesis is also relative.

Roughly:

if ZFC is consistent, then adding CH is consistent;

and if ZFC is consistent, then adding not-CH is also consistent.

Independence is tied to relative consistency.

## Stronger Theories

A stronger theory can sometimes prove the consistency of a weaker one.

For example, a system with stronger axioms may formalize enough reasoning to establish:

\[
Con(T)
\]

for weaker T.

This does not violate Gödel's second theorem.

## A Theory Proving Its Own Consistency

The surprising question is:

Can a sufficiently strong consistent theory prove:

"I am consistent"?

Gödel's second incompleteness theorem says, under standard conditions:

no.

## The Second Incompleteness Theorem Preview

For a suitable effectively axiomatized consistent theory T strong enough to represent arithmetic:

\[
T\nvdash Con(T)
\]

where \(Con(T)\) is the formalized statement expressing T's own consistency.

The details matter.

The philosophical effect is profound.

## Why This Is Not "Nothing Can Prove Consistency"

A stronger system can prove consistency of a weaker one.

Humans can also reason informally about formal systems.

Gödel does not say consistency can never be established.

It says a system cannot, under the relevant assumptions, fully certify itself using only its ordinary internal resources.

## Consistency vs Soundness

A consistent theory can still prove false statements relative to an intended interpretation.

Consistency only prevents direct contradiction.

Soundness is stronger.

A theory might consistently describe the wrong structure.

## Example of a Consistent but False Theory

Suppose a theory includes:

\[
0=1
\]

but uses a nonclassical setup or altered interpretation where this is not treated as ordinary arithmetic equality.

Then labels matter.

More simply, a theory about the physical world can be internally consistent and empirically false.

Consistency is not truth.

## Consistency vs Completeness

A theory may be:

- consistent but incomplete,
- complete but inconsistent in trivial senses,
- both consistent and complete in weak domains.

For sufficiently strong arithmetic theories, Gödel constrains the combination.

These are different properties.

## Omega-Consistency

Gödel's original first incompleteness theorem used a stronger condition called **\(\omega\)-consistency**.

Later refinements weakened assumptions.

Historical formulations matter when reading older accounts.

## Simple Consistency

Modern presentations often use ordinary consistency plus additional representability conditions, depending on theorem version.

The exact hypothesis should not be reduced to slogans.

Logical results are assumption-sensitive.

## Proof-Theoretic Consistency

Proof theory studies consistency by analyzing formal derivations.

The goal is often:

show no derivation of contradiction exists.

Gentzen gave a famous consistency proof for arithmetic using transfinite induction up to a certain ordinal.

## Gentzen

Gerhard Gentzen proved the consistency of Peano Arithmetic using methods stronger than the arithmetic system itself.

This is a beautiful example of relative foundational strength.

Gödel's barrier is respected.

## Hilbert's Dream Revisited

Hilbert wanted finitary consistency proofs securing mathematics from below.

Gödel showed that sufficiently strong systems cannot prove their own consistency by ordinary internal means.

This forced foundational programs to become more nuanced.

## Consistency Strength

Theories can be compared by the consistency statements they can prove.

One theory may establish:

\[
Con(T)
\]

while another cannot.

This creates hierarchies of proof-theoretic strength.

## Large Cardinals and Strength

In set theory, stronger axioms often carry stronger consistency commitments.

Large cardinal axioms illustrate this hierarchy.

Foundational mathematics does not rest on one flat layer.

## Trust Never Starts from Nothing

Any consistency argument uses:

- logic,
- meta-theory,
- assumptions.

There is no view from nowhere.

Foundational justification can be transferred, compared, and strengthened, but not magically detached from all premises.

## Consistency in Software

The concept has practical analogues.

A specification containing incompatible requirements may permit no implementation.

For example:

- output must always be encrypted,
- output must never be encrypted.

Formal methods can detect inconsistent specifications.

## Databases

Databases may contain inconsistent records.

Classical reasoning from all records can become problematic.

Practical systems often tolerate local inconsistency rather than exploding globally.

Consistency matters differently across domains.

## Paraconsistent Alternatives

Paraconsistent logics reject explosion.

They allow some contradictions without triviality.

In such systems, consistency remains desirable but is not always required for useful inference.

The role of contradiction depends on the logic.

## The Philosophical Lesson

Consistency means a formal system does not defeat itself by deriving incompatible claims.

It is a minimum condition for classical mathematical reliability.

But proving consistency raises a deeper question:

What resources may the system use to certify itself?

Gödel's answer will impose a limit.

## The Next Question

Consistency is only one relationship between proof and truth.

Two other central ideas are:

- soundness,
- completeness.

Does proof ever derive something semantically invalid?

Does semantic truth ever escape proof?

The next topic is:

**soundness and completeness.**
