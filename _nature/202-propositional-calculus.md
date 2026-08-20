---
title: 'Propositional Calculus'
permalink: /nature/202-propositional-calculus/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 202
tags:
   - propositional-logic
   - truth-tables
   - inference
   - formal-systems
   - logic
---

Propositional calculus is one of the simplest formal systems in logic.

It treats complete propositions as indivisible units.

Instead of analyzing:

"Socrates is mortal"

into subject and predicate, it simply calls the entire statement:

\[
P
\]

Then it studies how such propositions combine.

## Propositional Variables

Symbols such as:

\[
P,\ Q,\ R
\]

stand for propositions.

Each proposition is assigned a truth value:

- true,
- false.

The internal content of the proposition is ignored.

## Logical Connectives

Propositional calculus builds complex formulas using connectives such as:

- negation,
- conjunction,
- disjunction,
- conditional,
- biconditional.

These connectives are truth-functional.

## Negation

Negation is written:

\[
\neg P
\]

If P is true, \(\neg P\) is false.

If P is false, \(\neg P\) is true.

Negation reverses truth value.

## Conjunction

Conjunction is written:

\[
P \land Q
\]

It is true only when both P and Q are true.

This corresponds roughly to:

P and Q.

## Disjunction

Disjunction is written:

\[
P \lor Q
\]

In classical logic, this is usually inclusive.

It is true when:

- P is true,
- Q is true,
- both are true.

## Conditional

A conditional is written:

\[
P \rightarrow Q
\]

It is false only when:

- P is true,
- Q is false.

This is the classical **material conditional**.

## Why the Conditional Feels Strange

In ordinary language:

"If P, then Q"

often suggests:

- causation,
- relevance,
- temporal order.

Material implication does not require these.

It records a truth-functional relation.

This creates cases that feel unintuitive.

## False Antecedents

If P is false, then:

\[
P \rightarrow Q
\]

is true regardless of Q.

This is sometimes called a **vacuous truth**.

The formal definition prioritizes truth conditions over everyday conversational meaning.

## Biconditional

A biconditional is written:

\[
P \leftrightarrow Q
\]

It is true when P and Q have the same truth value.

It means roughly:

P if and only if Q.

## Truth Tables

A **truth table** lists every possible assignment of truth values.

For conjunction:

| P | Q | \(P \land Q\) |
|---|---|---|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

Truth tables provide a mechanical decision procedure.

## Tautology

A formula is a **tautology** if it is true under every truth assignment.

Example:

\[
P \lor \neg P
\]

This is the law of excluded middle in classical logic.

## Contradiction

A formula is a **contradiction** if it is false under every truth assignment.

Example:

\[
P \land \neg P
\]

It cannot be true in classical logic.

## Contingency

A formula is **contingent** if it is true under some assignments and false under others.

Most ordinary propositions are contingent.

## Logical Equivalence

Two formulas are logically equivalent if they have the same truth value under every assignment.

For example:

\[
P \rightarrow Q
\]

is equivalent to:

\[
\neg P \lor Q
\]

Truth tables can verify this.

## De Morgan's Laws

Important equivalences include:

\[
\neg(P \land Q) \equiv \neg P \lor \neg Q
\]

and:

\[
\neg(P \lor Q) \equiv \neg P \land \neg Q
\]

These laws appear throughout logic and computing.

## Double Negation

In classical logic:

\[
\neg\neg P \equiv P
\]

Some nonclassical systems treat negation differently.

Again, formal rules depend on the logic chosen.

## Modus Ponens

A standard inference rule is:

\[
P
\]

\[
P \rightarrow Q
\]

therefore:

\[
Q
\]

This is modus ponens.

## Modus Tollens

Another valid rule is:

\[
P \rightarrow Q
\]

\[
\neg Q
\]

therefore:

\[
\neg P
\]

Both can be justified semantically by truth tables.

## Proof Systems

Instead of using truth tables, propositional calculus can be formulated through axioms and inference rules.

Then theorems are formulas derivable by proof.

This creates a syntactic system.

## Semantics

Truth tables provide semantics.

They tell us what formulas mean in terms of truth values.

The same formal language therefore has two perspectives:

- syntax,
- semantics.

## Soundness

A propositional proof system is sound if every provable formula is semantically valid.

No theorem should fail under a truth assignment.

Soundness connects proof to truth.

## Completeness

A propositional proof system is complete if every tautology is provable.

Then syntax captures all semantic validity in the system.

Propositional logic has this property.

## Decidability

Propositional validity is decidable.

Given any finite propositional formula, we can construct a truth table and determine whether it is a tautology.

The procedure may be inefficient.

But it terminates.

## Exponential Growth

If a formula contains \(n\) independent propositional variables, a truth table has:

\[
2^n
\]

rows.

The method scales poorly.

Decidable does not mean computationally easy.

## SAT

The **Boolean satisfiability problem**, SAT, asks:

Is there some truth assignment making a propositional formula true?

SAT is one of the most famous problems in computer science.

It was the first problem shown to be NP-complete.

## Why SAT Matters

Many practical problems can be translated into SAT:

- scheduling,
- circuit design,
- planning,
- verification.

A simple logical language can encode enormous computational complexity.

## Boolean Algebra

Propositional logic is closely related to Boolean algebra.

Truth values correspond to:

- 0,
- 1.

Logical connectives correspond to algebraic operations.

This bridge made logic useful in digital engineering.

## Digital Circuits

AND gates implement conjunction.

OR gates implement disjunction.

NOT gates implement negation.

Physical hardware realizes propositional operations.

Logic became circuitry.

## Logic Gates and Composition

Complex circuits are built from simple gates.

Likewise, complex propositions are built from simple connectives.

Finite rules create large structures.

This echoes themes from recursion and computation.

## Limitations of Propositional Logic

Propositional calculus cannot naturally express:

"All humans are mortal."

It can only treat the whole statement as one symbol.

It cannot analyze:

- individuals,
- properties,
- quantifiers.

For that, we need predicate calculus.

## Expressive Power vs Simplicity

Propositional calculus is limited.

That limitation makes it tractable.

As formal languages become more expressive, their computational and logical behavior becomes more complex.

This tradeoff will recur.

## The Philosophical Lesson

Propositional calculus shows how reasoning can be reduced to explicit symbolic rules over truth-functional structures.

It is simple enough to mechanize completely.

That success naturally invites the next step:

Can we formalize statements about objects, properties, and relations?

That leads to:

**predicate calculus.**
