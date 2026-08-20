---
title: 'Propositions, Predicates, Qualifiers, and Descriptors'
permalink: /nature/183-propositions-predicates-qualifiers-and-descriptors/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 183
tags:
   - propositions
   - predicates
   - qualifiers
   - descriptors
   - logic
---

Logic needs a vocabulary for separating what is being said from what is being said about it.

Natural language hides structure inside grammar.

Formal logic tries to expose it.

Four useful concepts are:

- proposition,
- predicate,
- qualifier,
- descriptor.

They are related.

They play different roles.

## Proposition

A **proposition** is something that can be true or false.

For example:

Snow is white.

Paris is in France.

2 + 2 = 5.

The last proposition is false.

It is still a proposition.

Truth value and propositional status are different.

## Sentence vs Proposition

A sentence is a linguistic expression.

A proposition is the content expressed.

English:

"Snow is white."

Turkish:

"Kar beyazdır."

These can express the same proposition in different languages.

Logic often abstracts away from wording.

## Declarative Sentences

Declarative sentences commonly express propositions.

Questions and commands usually do not.

"Close the door."

is an instruction.

"Is the door closed?"

is a question.

Neither is straightforwardly true or false in the same way.

## Propositional Variables

Formal logic uses symbols such as:

\[
P,\ Q,\ R
\]

to stand for whole propositions.

For example:

`P`: It is raining.

`Q`: The street is wet.

Then:

\[
P \rightarrow Q
\]

represents a conditional relation.

## Predicate

A **predicate** expresses a property or relation.

Instead of treating:

"Socrates is mortal"

as one indivisible proposition, predicate logic analyzes it as:

\[
Mortal(Socrates)
\]

The predicate is:

`Mortal`.

The argument is:

`Socrates`.

## One-Place Predicates

A one-place predicate expresses a property.

Examples:

`Red(x)`

`Prime(x)`

`Sleeping(x)`

Each becomes a proposition when a suitable object replaces `x`.

## Two-Place Predicates

A two-place predicate expresses a relation.

Examples:

`Loves(x,y)`

`GreaterThan(x,y)`

`ParentOf(x,y)`

Relations are central to logical structure.

## Higher-Arity Predicates

Predicates can have more than two arguments.

For example:

`Between(x,y,z)`

might mean:

x lies between y and z.

The number of argument positions is called the predicate's **arity**.

## Open Sentence

Consider:

`x is taller than 2 meters.`

By itself, this is not yet a complete proposition if `x` is unspecified.

It is an **open sentence** or predicate expression.

Assign a value to `x`, and it becomes truth-evaluable.

## Descriptor

A **descriptor** identifies or characterizes an object.

Examples include:

- the tallest mountain,
- the current president of a country,
- the smallest prime number.

Descriptions can function like names while carrying internal structure.

## Definite Description

Bertrand Russell famously analyzed **definite descriptions** such as:

"the present king of France."

The phrase appears to refer to an object.

But what if no such object exists?

Logical analysis can reveal hidden existential claims.

## Russell's Analysis

A sentence like:

"The present king of France is bald"

can be analyzed roughly as saying:

1. there exists a present king of France,
2. there is only one,
3. that individual is bald.

If the existence condition fails, the sentence is false under Russell's analysis.

The description does not need to name a mysterious nonexistent object.

## Descriptors Compress Claims

A phrase such as:

"the author of *Hamlet*"

looks like one noun phrase.

But it encodes a relation:

someone wrote *Hamlet*.

Descriptions can hide propositions inside terms.

## Qualifier

A **qualifier** modifies the scope or force of a claim.

Natural language uses words such as:

- all,
- some,
- no,
- most,
- necessarily,
- possibly.

In formal logic, some of these become quantifiers or modal operators.

## Universal Qualification

"All humans are mortal."

This does not describe one human.

It makes a claim over an entire domain.

Predicate logic represents it using a universal quantifier:

\[
\forall x\,(Human(x) \rightarrow Mortal(x))
\]

## Existential Qualification

"Some human is a philosopher."

This can be written:

\[
\exists x\,(Human(x) \land Philosopher(x))
\]

The qualifier "some" becomes existential quantification.

## Negation

Negation changes the truth condition of a proposition.

If:

\[
P
\]

means:

It is raining,

then:

\[
\neg P
\]

means:

It is not raining.

Negation is one of logic's basic operators.

## Conjunction

A conjunction combines two propositions:

\[
P \land Q
\]

meaning:

P and Q.

It is true only when both are true in classical logic.

## Disjunction

A disjunction:

\[
P \lor Q
\]

means:

P or Q.

In classical logic, this is usually inclusive:

at least one is true.

Natural-language "or" can sometimes imply exclusivity.

## Conditional

A conditional:

\[
P \rightarrow Q
\]

means:

if P, then Q.

Formal semantics differs in subtle ways from ordinary language.

This difference will matter later.

## Biconditional

A biconditional:

\[
P \leftrightarrow Q
\]

means roughly:

P if and only if Q.

Each is both necessary and sufficient for the other.

## Predication

The act of applying a predicate to an object is **predication**.

`Red(apple)`

says that the apple has the property red.

Much of logic can be built from predication plus operators.

## Categories and Predicates

Predicates often correspond to categories.

`Bird(x)`

classifies an object as a bird.

But real categories can be:

- vague,
- context-sensitive.

Formal predicates idealize boundaries.

## Natural Language Is Richer

Words such as:

usually,
almost,
roughly,
normally

do not fit neatly into elementary classical logic.

Natural language contains graded and contextual qualifiers.

Formal systems choose which distinctions to represent.

## Descriptions and Reference

A proper name may directly refer.

A description refers through properties.

Compare:

"Venus"

and:

"the brightest planet visible from Earth."

They may pick out the same object through different representational routes.

## Frege Returns

This recalls Frege's distinction between sense and reference.

Different descriptors can have the same referent while presenting it differently.

Logical form and cognitive significance are not identical.

## Predicates Can Be False of Everything

The predicate:

`SquareCircle(x)`

may have no instances.

The predicate remains syntactically meaningful even if nothing satisfies it.

Formal language can describe empty categories.

## Predicates Can Be True of Many Things

`Mammal(x)`

is true for:

- humans,
- whales,
- bats.

Predicates allow generality.

Without them, logic would be limited to isolated propositions.

## Why Predicates Matter

Propositional logic treats whole statements as units.

Predicate logic opens them up.

Instead of merely:

P,
Q,
R,

we can analyze:

- objects,
- properties,
- relations.

This makes formal reasoning far more expressive.

## The Philosophical Lesson

Logical analysis reveals hidden structure.

A simple sentence can contain:

- objects,
- predicates,
- descriptions,
- qualifiers.

Once these are separated, we can ask precisely:

Who?

What property?

How many?

Under what scope?

## The Next Question

The next step is to formalize generality.

How do we say:

everything,
something,
nothing?

For that we need:

**variables and quantifiers.**
