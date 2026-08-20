---
title: 'Modal Logic'
permalink: /nature/193-modal-logic/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 193
tags:
   - modal-logic
   - necessity
   - possibility
   - possible-worlds
   - accessibility
---

Classical propositional logic asks whether propositions are:

- true,
- false.

Modal logic asks more.

Is a proposition:

- necessarily true?
- possibly true?

This adds a new layer to reasoning.

## Modal Operators

The two basic modal operators are:

Necessity:

\[
\Box P
\]

Possibility:

\[
\Diamond P
\]

Read them as:

- necessarily P,
- possibly P.

## Duality

In standard systems:

\[
\Diamond P \equiv \neg \Box \neg P
\]

and:

\[
\Box P \equiv \neg \Diamond \neg P
\]

Possibility and necessity are dual.

## Possible-World Semantics

A common semantics interprets modal logic using **possible worlds**.

A possible world is a way things might be.

Then:

\[
\Box P
\]

means:

P is true in all accessible worlds.

And:

\[
\Diamond P
\]

means:

P is true in at least one accessible world.

## Accessibility Relation

Not every possible world must be relevant to every other.

An **accessibility relation** determines which worlds count as alternatives from a given world.

Different accessibility structures produce different modal logics.

## Kripke Frames

A Kripke frame consists of:

- a set of worlds,
- an accessibility relation.

A model adds truth assignments at those worlds.

Modal truth depends on both:

- local truth,
- relational structure.

## System K

The basic normal modal logic is usually called **K**.

It includes the distribution principle:

\[
\Box(P \rightarrow Q) \rightarrow (\Box P \rightarrow \Box Q)
\]

and a rule allowing necessary truths to be inferred from theorems under suitable conditions.

K assumes relatively little about accessibility.

## System T

System **T** adds:

\[
\Box P \rightarrow P
\]

This corresponds to reflexive accessibility.

Every world accesses itself.

If something is necessary, it is true in the current world.

## System S4

S4 adds a principle like:

\[
\Box P \rightarrow \Box\Box P
\]

This corresponds, in standard Kripke semantics, to transitive accessibility in addition to reflexivity.

Necessity becomes stable across accessible worlds.

## System S5

S5 treats accessibility in a highly symmetric way.

One characteristic principle is:

\[
\Diamond P \rightarrow \Box\Diamond P
\]

If something is possible, then necessarily it is possible.

S5 is often used for strong metaphysical necessity.

## Different Modalities Need Different Systems

"Necessary" can mean different things.

Examples:

- logically necessary,
- physically necessary,
- legally required,
- known to be true.

Different notions may require different accessibility relations.

Modal logic is a family of systems.

## Modal Logic Is Not Only About Metaphysics

The same formal structure can model many ideas.

Replace:

"accessible world"

with:

"future state"

or:

"epistemically possible state."

Now modal logic becomes:

- temporal logic,
- epistemic logic.

The machinery is reusable.

## Necessity and Laws of Nature

Suppose we want physical necessity.

Accessible worlds might be those that obey the same physical laws.

Then:

\[
\Box P
\]

means:

P holds in every physically allowed world.

This is weaker than logical necessity.

## Logical Possibility

For logical possibility, accessible worlds may be any worlds consistent with logic.

A contradiction such as:

\[
P \land \neg P
\]

is not logically possible in classical semantics.

## Metaphysical Possibility

Metaphysical possibility is harder to define.

It asks what could exist or occur given the essences of things.

Modal logic provides structure.

Metaphysics provides interpretation.

## De Re and De Dicto

Modal statements can have different scopes.

Consider:

Necessarily, the president is a citizen.

This may mean something about the role.

Now consider:

The president is necessarily a citizen.

This may sound like a claim about a particular person.

The distinction between **de dicto** and **de re** modality is important.

## Scope Matters

Compare:

\[
\Box \exists x\, P(x)
\]

with:

\[
\exists x\, \Box P(x)
\]

The first says:

necessarily, there exists some P.

The second says:

there exists one thing that is necessarily P.

These are not equivalent.

## Quantified Modal Logic

Once quantifiers and modalities interact, deep questions appear.

Do the same objects exist in every possible world?

Can an object have different properties across worlds?

What does it mean for one object to be identical across worlds?

## Rigid Designators

Saul Kripke introduced the idea of a **rigid designator**.

A rigid designator refers to the same object in every possible world where that object exists.

Proper names are often treated this way in Kripke's theory.

This helps explain necessary identity claims.

## Necessary Identity

If:

\[
a=b
\]

and both names rigidly designate the same object, then Kripke argues the identity is necessary.

The discovery may be empirical.

The necessity is modal.

## Contingent Descriptions

A description such as:

"the tallest person in the room"

may refer to different individuals in different possible worlds.

Descriptions need not be rigid.

Reference and modality interact.

## Counterfactuals

Modal logic is related to counterfactual reasoning.

"If the match had been lit, the paper would have burned."

Ordinary counterfactuals require more than mere accessibility.

We care about the closest relevant alternatives.

This led to richer semantics developed by thinkers such as Lewis and Stalnaker.

## Lewis and Possible Worlds

David Lewis defended a strong realism about possible worlds.

On his view, possible worlds are concrete realities as real as the actual world, though causally isolated.

Most philosophers do not accept such strong realism.

But the theory made modal discourse highly systematic.

## Actualism

Actualists reject the claim that possible worlds are concrete universes.

They may treat them as:

- descriptions,
- abstract structures,
- ways reality could be.

Modal logic itself does not force one metaphysical interpretation.

## Modal Collapse

A theory suffers **modal collapse** if everything true becomes necessary.

Then the distinction between:

- actual,
- possible,
- necessary

disappears.

Many philosophical systems try to avoid this.

## Modal Reasoning in Planning

An intelligent agent reasons:

If I choose A, outcome X is possible.

If I choose B, outcome Y is possible.

Planning explores modal alternatives.

The agent compares unrealized worlds.

## Verification

Computer science uses modal-style reasoning to verify systems.

A system may be required to satisfy:

- something is always true,
- something is eventually true,
- something is reachable.

This leads directly to temporal logic.

## The Philosophical Lesson

Modal logic formalizes the space between:

- what is,
- what must be,
- what could be.

Possible-world semantics turns modality into relational structure.

Different accessibility relations create different notions of necessity.

## The Next Question

Many possibilities differ specifically by time.

What is true now?

What will always be true?

What must eventually happen?

To reason about these questions, we use:

**temporal logic.**
