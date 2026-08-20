---
title: 'Formal Systems: Symbols, Syntax, and Rules'
permalink: /nature/201-formal-systems-symbols-syntax-and-rules/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 201
tags:
   - formal-systems
   - syntax
   - axioms
   - inference-rules
   - metalogic
---

A formal system is a world built from rules.

It contains:

- symbols,
- rules for forming expressions,
- starting statements,
- rules for deriving new statements.

Once these are fixed, reasoning becomes mechanical in principle.

The system no longer asks:

"What did the author intend?"

It asks:

"Is this string well formed?"

"Can this expression be derived?"

## Why Formalize?

Natural language is flexible.

It is also:

- ambiguous,
- context-sensitive,
- incomplete.

Formal systems remove much of that ambiguity.

They trade expressive richness for precision.

## Alphabet

A formal system begins with an **alphabet**.

This is a finite or specified set of symbols.

For example:

\[
\{0,1,+,=,(,)\}
\]

The symbols themselves need not have meaning.

They are marks governed by rules.

## Strings

Symbols can be combined into **strings**.

Some strings are legal.

Others are not.

The system needs syntax to distinguish them.

## Well-Formed Formulas

A legal expression is often called a **well-formed formula**, or WFF.

For example:

\[
P \rightarrow Q
\]

may be well formed.

But:

\[
\rightarrow P Q )
\]

may not be.

Syntax determines legality.

## Formation Rules

Formation rules define how valid expressions are built.

Example:

If P and Q are formulas, then:

\[
(P \land Q)
\]

is also a formula.

Recursive rules generate infinitely many expressions from finite instructions.

## Syntax First

A formal system can manipulate expressions without interpreting them.

This is crucial.

The rules operate on form.

Meaning can be added later.

Formal systems separate:

- syntax,
- semantics.

## Axioms

Some well-formed formulas are selected as **axioms**.

They are starting points.

Example:

\[
P \rightarrow (Q \rightarrow P)
\]

might be an axiom schema in a logical calculus.

Different systems choose different axioms.

## Axiom Schemas

An **axiom schema** represents infinitely many axioms through one pattern.

Variables in the schema can be replaced by formulas.

Finite notation describes an infinite family.

## Inference Rules

Inference rules tell us how to derive new formulas.

A classic rule is modus ponens:

From:

\[
P
\]

and:

\[
P \rightarrow Q
\]

infer:

\[
Q
\]

The rule is purely structural.

## Derivations

A **derivation** is a finite sequence of formulas where each line is:

- an axiom,
- an assumption,
- derived by an inference rule.

If the final line is Q, we have derived Q.

## Theorems

A **theorem** is a formula derivable from the axioms without additional assumptions.

The theorem belongs to the formal system because a legal derivation exists.

## Proof as Symbol Manipulation

At the formal level, proof is symbol manipulation.

A proof checker does not need philosophical understanding.

It only needs to verify:

- syntax,
- rule application.

This makes proof mechanizable.

## Mechanical Reasoning

A formal system is attractive because a machine can, in principle, check every step.

This was one dream of twentieth-century logic:

turn reasoning into explicit procedure.

But formalization would later reveal its own limits.

## Semantics

A formal system can also be given an interpretation.

Suppose:

\[
P
\]

means:

It is raining.

Now formulas have truth conditions.

Semantics connects symbolic structure to a model.

## Model

A **model** assigns meaning to nonlogical symbols and determines which formulas are true.

The same syntax can have different models.

This separates:

- what can be proved,
- what is true under an interpretation.

## Object System and Metasystem

We can reason **inside** the formal system.

Or we can study the system from outside.

Questions like:

- Is it consistent?
- Is it complete?
- Is it decidable?

belong to the **metatheory**.

## Metalogic

**Metalogic** studies formal systems themselves.

It asks about properties such as:

- soundness,
- completeness,
- consistency,
- decidability.

Logic becomes its own object.

This is a new level.

## Strings About Strings

A formal system manipulates symbols.

Metalogic talks about those manipulations.

The move resembles:

object language → metalanguage.

Self-reference is approaching again.

## Formalization of Mathematics

Mathematics can be encoded into formal systems.

Arithmetic can be represented using symbols and axioms.

Proofs become finite strings.

Once proofs are symbolic objects, mathematics can talk about mathematical proofs.

This is the doorway to Gödel.

## Hilbert's Program

David Hilbert sought secure foundations for mathematics.

A major goal was to formalize mathematics and prove properties such as:

- consistency,
- completeness

using rigorous finitary methods.

The ambition was enormous.

## "We Must Know"

Hilbert's optimism is often associated with the idea that mathematical problems should, in principle, be solvable.

Formalization seemed capable of turning mathematical truth into systematic procedure.

Gödel and Turing later showed fundamental limits.

## Rules Do Not Need Meaning

Imagine a person manipulating symbols according to rules without knowing what the symbols mean.

If the rules are followed correctly, formal derivations remain valid.

This is why formal systems are substrate-independent.

## MU Puzzle

Hofstadter's **MIU system** is a famous toy formal system.

It uses strings and transformation rules.

The challenge is not to understand English meaning.

It is to determine which strings are reachable.

Simple rules can create surprisingly difficult questions.

## Formal Games

A formal system resembles a game.

It has:

- legal positions,
- legal moves,
- starting conditions.

Chess pieces have symbolic roles.

But unlike ordinary games, formal systems may be designed to represent mathematics.

## Syntax Can Become Extremely Powerful

Even simple symbolic rules can encode:

- arithmetic,
- computation,
- proof.

Complex meaning can emerge from formal structure once interpretation is added.

This is one of the central themes of logic.

## Formal Systems and Computers

Computers execute formal rules.

Programming languages define:

- syntax,
- operational semantics.

Compilers and interpreters implement them.

A computer is a natural environment for formal systems.

## Formal Systems and AI

Automated theorem provers search formal derivations.

Expert systems manipulate rules.

Symbolic AI grew directly from the idea that reasoning could be formalized.

Later AI would add statistical methods.

## Formal Systems Are Not Reality

A formal system is a representation.

Its theorems are consequences of:

- axioms,
- rules.

Whether the system describes reality depends on interpretation.

The map is not the territory returns again.

## Strength of a System

Some formal systems are weak.

They can express only simple relations.

Others are strong enough to represent arithmetic and computation.

Strength brings expressive power.

It also brings self-referential risk.

## Consistency

A system is consistent if it does not derive both:

\[
P
\]

and:

\[
\neg P
\]

for the same proposition.

Consistency prevents collapse.

Later we will ask whether a system can prove its own consistency.

## Completeness

A system may be complete in different senses.

One question is whether every semantically valid formula is provable.

Another is whether every relevant statement or its negation is decidable within a theory.

Terminology must be handled carefully.

## Decidability

A formal system is **decidable** if there is an algorithm that can determine, for every relevant expression, whether it has the specified property.

For example:

Is this formula a theorem?

Some systems allow such algorithms.

Others do not.

## Formal System as Universe

Once rules are fixed, the system defines a space of possible expressions and derivations.

We can explore that space.

The system becomes a mathematical universe.

Then we can ask:

What can this universe say about itself?

## The Philosophical Lesson

A formal system turns reasoning into explicit structure:

symbols,
syntax,
axioms,
rules.

This precision enables mechanical proof.

It also makes the limits of formal reasoning mathematically visible.

The very act of formalization prepares the stage for incompleteness.

## The Next Question

Before reaching Gödel, we need to examine several formal languages more closely.

We begin with the simplest major one:

**propositional calculus.**
