---
title: 'Variables and Quantifiers'
permalink: /nature/184-variables-and-quantifiers/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 184
tags:
   - variables
   - quantifiers
   - predicate-logic
   - logic
   - scope
---

Logic becomes much more powerful when it stops treating whole sentences as indivisible blocks.

Instead of:

P.

Q.

R.

we can talk about:

- objects,
- properties,
- relations,
- variables ranging over objects.

This is the role of **predicate logic**.

Two of its central tools are:

- variables,
- quantifiers.

## Variables

A **variable** is a symbol that can stand for different objects.

Common examples are:

\[
x,\ y,\ z
\]

The expression:

\[
Human(x)
\]

does not yet make a complete claim about one particular individual.

It says:

x has the property of being human.

The truth depends on what x refers to.

## Constants

A **constant** names a particular object.

For example:

\[
Human(Socrates)
\]

Here `Socrates` is treated as a name for one individual.

Variables range.

Constants designate.

## Predicates Need Arguments

A predicate such as:

\[
Tall(x)
\]

contains an open place.

Supply an object:

\[
Tall(Ali)
\]

and the expression becomes a proposition.

It can now be true or false.

## Open Formulas

A formula containing an unbound variable is often called an **open formula**.

For example:

\[
x > 5
\]

has no fixed truth value until we specify:

- what domain x belongs to,
- what value x takes.

Variables create possibility.

Quantifiers control that possibility.

## Universal Quantifier

The symbol:

\[
\forall
\]

means roughly:

**for all**.

For example:

\[
\forall x\, Human(x)
\]

would say:

Everything in the domain is human.

Usually we need a more careful conditional form.

## All Humans Are Mortal

The statement:

All humans are mortal.

is represented as:

\[
\forall x\,(Human(x) \rightarrow Mortal(x))
\]

Read:

For every x, if x is human, then x is mortal.

This captures the universal structure.

## Existential Quantifier

The symbol:

\[
\exists
\]

means:

**there exists at least one**.

For example:

\[
\exists x\, Philosopher(x)
\]

means:

At least one object in the domain is a philosopher.

## Some Humans Are Philosophers

A more explicit form is:

\[
\exists x\,(Human(x) \land Philosopher(x))
\]

This says there is at least one x that is both:

- human,
- philosopher.

## "Some" Does Not Mean "Only Some"

In ordinary language, "some" can suggest:

some but not all.

In classical logic, existential quantification means only:

at least one.

It does not exclude all.

This is another natural-language/formal-language difference.

## Quantifiers Depend on a Domain

Suppose we write:

\[
\forall x\, Red(x)
\]

Is it true?

That depends on the **domain of discourse**.

If the domain contains only red objects, perhaps yes.

If it contains every physical object, almost certainly not.

Quantification is always relative to some universe of objects.

## Domain of Discourse

The domain determines what variables range over.

Possible domains include:

- integers,
- people,
- planets,
- books.

Without a domain, quantified statements may be ambiguous.

Formal systems make the domain explicit or implicitly fixed.

## Free Variables

A variable is **free** when it is not governed by a quantifier.

Example:

\[
Loves(x, Maria)
\]

The variable x is free.

The formula becomes true or false only relative to an assignment for x.

## Bound Variables

A variable is **bound** when a quantifier governs it.

Example:

\[
\exists x\, Loves(x, Maria)
\]

Now x is bound.

The statement says:

Someone loves Maria.

It no longer depends on a particular assignment to x.

## Scope

A quantifier has a **scope**.

The scope is the part of the formula it governs.

For example:

\[
\forall x\,(Human(x) \rightarrow Mortal(x))
\]

the quantifier governs the entire expression in parentheses.

Scope matters because different scopes can change meaning dramatically.

## Quantifier Order

Consider:

\[
\forall x\,\exists y\, Loves(x,y)
\]

This means:

Everyone loves someone.

The person loved may be different for each x.

Now compare:

\[
\exists y\,\forall x\, Loves(x,y)
\]

This means:

There is one person whom everyone loves.

Same symbols.

Different order.

Different claim.

## Natural-Language Ambiguity

The sentence:

"Every student read a book."

can mean:

- each student read possibly different books,
- there was one book read by every student.

Predicate logic forces us to choose.

Formalization exposes hidden ambiguity.

## Negating Quantifiers

Quantifiers interact with negation.

The negation of:

\[
\forall x\, P(x)
\]

is equivalent to:

\[
\exists x\, \neg P(x)
\]

Meaning:

Not everything is P

equals

Something is not P.

## Another Quantifier Negation

Similarly:

\[
\neg \exists x\,P(x)
\]

is equivalent to:

\[
\forall x\,\neg P(x)
\]

Meaning:

There does not exist any P

equals

Everything is non-P.

These equivalences are basic logical tools.

## "No"

The statement:

No cats are reptiles.

can be represented as:

\[
\forall x\,(Cat(x) \rightarrow \neg Reptile(x))
\]

or equivalently:

\[
\neg \exists x\,(Cat(x) \land Reptile(x))
\]

Different forms can express the same logical content.

## Existence Is Explicit

Predicate logic forces us to distinguish:

- naming something,
- asserting that it exists.

This matters for descriptions such as:

"the present king of France."

A grammatical phrase does not guarantee a referent.

## Empty Domains

Classical first-order logic is often formulated with nonempty domains.

Some alternative systems allow empty domains.

Technical choices like this affect the behavior of existential and universal statements.

Even basic logic rests on conventions.

## Identity

Predicate logic can include the identity symbol:

\[
=
\]

This allows claims such as:

\[
x = y
\]

and formal treatment of uniqueness.

For example:

there exists exactly one object satisfying some predicate.

## Exactly One

"There is exactly one king" can be formalized as:

\[
\exists x\,(King(x) \land \forall y\,(King(y) \rightarrow y=x))
\]

The formula contains both:

- existence,
- uniqueness.

Natural-language phrases can hide complex logical structure.

## Relations

Quantifiers become especially powerful with relations.

For example:

Everyone has a parent.

\[
\forall x\,\exists y\, ParentOf(y,x)
\]

This structure cannot be represented adequately in simple propositional logic.

## Nested Quantification

Predicate logic supports deeply nested patterns.

Mathematics depends on them.

For example, continuity in analysis involves statements with structures like:

for every epsilon,
there exists a delta,
such that for every x...

Quantifier order carries mathematical meaning.

## Logic as Variable Binding

The idea of **binding** appears beyond logic.

Programming languages bind variables to:

- values,
- scopes.

Lambda calculus binds variables.

Natural language binds pronouns and quantified expressions.

Binding is a general representational mechanism.

## Quantifiers and Computing

Database queries also use quantifier-like ideas.

"Find every customer who has at least one unpaid invoice."

This has implicit structure:

for every customer,
there exists an invoice,
with specified properties.

Logic underlies data retrieval.

## Quantifiers and Science

Scientific laws are often universal in form.

For example:

For every object of type X under conditions C, property Y holds.

Experiments then test whether observations support such generalized claims.

Science constantly moves between instances and quantified statements.

## The Philosophical Lesson

Variables make expressions general.

Quantifiers determine how widely claims apply.

Together they let logic represent:

- all,
- some,
- none,
- exactly one.

They turn ordinary language into explicit structure.

## The Next Question

Once a formal language contains precise expressions, we can build systems of reasoning inside it.

Some statements are taken as starting points.

Others are derived.

This leads to three foundational concepts:

**axioms, theorems, and proof.**
