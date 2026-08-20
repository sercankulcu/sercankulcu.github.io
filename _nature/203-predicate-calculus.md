---
title: 'Predicate Calculus'
permalink: /nature/203-predicate-calculus/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 203
tags:
   - predicate-logic
   - first-order-logic
   - quantifiers
   - models
   - formal-systems
---

Propositional logic treats entire statements as atoms.

That is useful.

It is also limiting.

Consider:

All humans are mortal.

Socrates is human.

Therefore Socrates is mortal.

To represent the structure properly, logic must talk about:

- objects,
- properties,
- relations,
- quantifiers.

This is the domain of **predicate calculus**.

## First-Order Logic

The most important form is **first-order logic**.

It extends propositional logic with:

- variables,
- predicates,
- functions,
- constants,
- quantifiers.

Its expressive power is dramatically greater.

## Constants

A constant symbol names a particular object.

Examples:

\[
a,\ b,\ c
\]

or more suggestively:

\[
Socrates
\]

The symbol need not resemble the object.

It is part of the formal language.

## Variables

Variables such as:

\[
x,\ y,\ z
\]

range over objects in the domain.

They allow general statements.

## Predicates

A one-place predicate expresses a property:

\[
Human(x)
\]

A two-place predicate expresses a relation:

\[
Loves(x,y)
\]

Predicates expose internal logical structure.

## Functions

Function symbols map objects to objects.

Example:

\[
FatherOf(x)
\]

or:

\[
x+1
\]

Functions create terms.

They are distinct from predicates because they denote objects rather than truth values.

## Terms

A **term** refers to an object.

Terms can be:

- constants,
- variables,
- function applications.

For example:

\[
FatherOf(Socrates)
\]

is a term.

## Atomic Formulas

An atomic formula applies a predicate to terms.

Example:

\[
Human(Socrates)
\]

or:

\[
GreaterThan(x,y)
\]

Complex formulas are built from atomic formulas.

## Quantifiers

The universal quantifier:

\[
\forall
\]

means:

for all.

The existential quantifier:

\[
\exists
\]

means:

there exists.

These create generality.

## Universal Example

All humans are mortal:

\[
\forall x\,(Human(x)\rightarrow Mortal(x))
\]

This says:

for every object x, if x is human, then x is mortal.

## Existential Example

Some humans are philosophers:

\[
\exists x\,(Human(x)\land Philosopher(x))
\]

This says:

at least one object satisfies both predicates.

## Free and Bound Variables

A variable is **bound** if governed by a quantifier.

Example:

\[
\forall x\,Human(x)
\]

The x is bound.

In:

\[
Human(x)
\]

x is free.

Free variables require an assignment for interpretation.

## Scope

Quantifiers have scope.

Compare:

\[
\forall x\,\exists y\,Loves(x,y)
\]

with:

\[
\exists y\,\forall x\,Loves(x,y)
\]

The first says:

everyone loves someone.

The second says:

there is someone everyone loves.

Quantifier order matters.

## Domain

Every model includes a **domain of discourse**.

This is the collection of objects variables may range over.

Possible domains include:

- natural numbers,
- people,
- planets.

Truth depends on the domain.

## Interpretation

A model assigns meanings to:

- constants,
- predicates,
- functions.

For example:

`Socrates` → a particular person.

`Human` → a subset of the domain.

The formal symbols acquire semantics through interpretation.

## Models

A formula can be true in one model and false in another.

First-order logic therefore studies:

- formulas,
- structures,
- satisfaction.

Model theory grows from this perspective.

## Satisfaction

A model **satisfies** a formula if the formula is true under that interpretation.

We write:

\[
\mathcal{M}\models \varphi
\]

to say:

model \(\mathcal{M}\) satisfies \(\varphi\).

## Logical Validity

A formula is logically valid if it is true in every model.

This is stronger than being true in one intended interpretation.

Validity is structural.

## Logical Consequence

If every model satisfying premises \(\Gamma\) also satisfies conclusion \(\varphi\), then:

\[
\Gamma \models \varphi
\]

This is semantic consequence.

## Proof

A formal proof system provides syntactic derivability:

\[
\Gamma \vdash \varphi
\]

The distinction between:

\[
\models
\]

and:

\[
\vdash
\]

returns.

## Gödel's Completeness Theorem

Gödel proved that first-order logic is complete in the following sense:

If:

\[
\Gamma \models \varphi
\]

then:

\[
\Gamma \vdash \varphi
\]

Every semantically valid first-order consequence is formally derivable.

## Why This Does Not Contradict Incompleteness

Gödel's incompleteness theorems concern particular sufficiently strong theories, such as arithmetic.

The completeness theorem concerns first-order logical validity across all models.

Different level.

Different claim.

## Compactness

First-order logic has the **compactness theorem**.

Roughly:

If every finite subset of a theory has a model, then the entire theory has a model.

This has surprising consequences.

Infinite behavior can be constrained by finite consistency conditions.

## Löwenheim–Skolem

Another remarkable result is the Löwenheim–Skolem theorem.

If a first-order theory has an infinite model, under standard conditions it also has models of different infinite cardinalities.

This leads to the so-called Skolem paradox.

Formal expressiveness has unexpected limits.

## Categoricity

A theory is **categorical** if all its models of a certain size are isomorphic.

First-order arithmetic is not categorical in the unrestricted sense mathematicians might initially hope.

It has nonstandard models.

## Nonstandard Models

A first-order theory of arithmetic can have models containing elements beyond the standard natural numbers.

From inside the model, these elements behave arithmetically.

This reveals a gap between:

formal axioms

and

intended interpretation.

## Expressive Power

First-order logic can express an enormous range of mathematics.

It is strong enough for:

- arithmetic,
- algebra,
- graph theory.

Yet it cannot express every mathematically natural property.

## What First-Order Logic Cannot Express Easily

Some global properties are not first-order definable in standard settings.

Examples include certain forms of:

- finiteness,
- reachability.

This matters in logic and database theory.

## Second-Order Logic

Second-order logic allows quantification over:

- properties,
- relations,
- sets.

This increases expressive power.

But it changes metatheoretic behavior.

The elegant completeness theorem no longer carries over in the same way under standard semantics.

## Tradeoff

More expressive systems can describe more.

But they may lose desirable properties such as:

- effective axiomatizability,
- completeness,
- decidability.

Formalization is always a tradeoff.

## Predicate Logic and Databases

Relational databases are closely related to first-order logic.

A query can ask:

Find every student x such that there exists a course y with specified properties.

Quantification becomes data retrieval.

## Predicate Logic and AI

Knowledge representation systems have long used:

- predicates,
- relations,
- quantifiers.

They allow machines to represent structured facts.

But full first-order inference can be computationally expensive.

## The Philosophical Lesson

Predicate calculus exposes the internal structure hidden inside propositions.

It lets logic speak about:

- objects,
- properties,
- relations,
- existence,
- universality.

This expressive leap made modern logic possible.

## The Next Question

But logic is not only about truth.

Computation is also about applying functions.

Can the essence of computation be reduced to:

- variables,
- abstraction,
- application?

One of the most elegant answers is:

**lambda calculus.**
