---
title: 'Obligation and Deontic Logic'
permalink: /nature/197-obligation-and-deontic-logic/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 197
tags:
   - deontic-logic
   - obligation
   - permission
   - norms
   - ethics
---

Logic can describe what is true.

Modal logic can describe what is possible.

But human life also contains norms.

Some actions are:

- obligatory,
- permitted,
- forbidden.

The formal study of such normative notions is called **deontic logic**.

## Basic Operators

A common notation uses:

\[
O P
\]

for:

P is obligatory.

\[
P P
\]

is sometimes used for permission, though notation varies.

To avoid ambiguity, we can also write:

\[
Perm(P)
\]

for:

P is permitted.

And:

\[
F P
\]

for:

P is forbidden.

## Obligation Is Not Truth

If:

\[
O P
\]

it does not follow that P actually occurs.

"You must submit the form"

does not imply:

"You submitted the form."

Norms can be violated.

## Permission

Permission is often defined through absence of prohibition.

For example:

\[
Perm(P) \equiv \neg O(\neg P)
\]

This says:

P is permitted iff not-P is not obligatory.

Different deontic systems formalize this differently.

## Prohibition

Similarly, prohibition can be represented as:

\[
F(P) \equiv O(\neg P)
\]

P is forbidden if not-P is obligatory.

These dualities resemble modal logic.

## Possible-World Interpretation

Deontic logic can use possible worlds too.

The accessible worlds are not merely possible worlds.

They are **normatively ideal** worlds.

Then:

\[
O P
\]

means:

P holds in all ideal worlds.

This explains the modal structure.

## Ideal vs Actual

The actual world may violate obligations.

An ideal world represents compliance.

This makes deontic logic inherently comparative:

actual behavior

vs

normative standard.

## Legal Reasoning

Law is an obvious application.

Rules may state:

- contracts must be honored,
- taxes must be paid,
- some actions are prohibited.

Legal systems contain structured obligations and permissions.

## Ethical Reasoning

Moral reasoning also uses deontic concepts.

Questions include:

- What ought I do?
- What may I do?
- What must I not do?

Formal logic can represent structure.

It cannot by itself determine which moral principles are true.

## Norm Source

An obligation needs a source.

Possibilities include:

- law,
- contract,
- morality,
- institutional rule.

The logic of obligation is separate from the authority generating it.

## Contrary-to-Duty Obligations

A major challenge occurs when norms specify what should happen after a violation.

Example:

You ought not steal.

But if you steal, you ought to return the property.

The second obligation applies only because the first was violated.

This creates **contrary-to-duty** structures.

## Chisholm's Paradox

A famous deontic puzzle concerns statements like:

1. A person ought to help a neighbor.
2. If they help, they ought to announce it.
3. If they do not help, they ought not announce it.
4. They do not help.

Naive formalization can generate conflicting obligations.

Deontic logic must handle conditional norms carefully.

## Ross's Paradox

Suppose:

You ought to mail the letter.

In standard modal logic, from P we can infer:

P or Q.

So one might derive:

You ought to mail the letter or burn it.

That sounds wrong.

This is **Ross's paradox**.

It shows that ordinary logical closure can distort normative meaning.

## Why Ross's Paradox Matters

In classical logic:

\[
P \vdash P \lor Q
\]

But obligation is not simple truth.

From an obligation to do one action, it does not follow that any broader disjunction containing that action is an equally good norm.

Normative relevance matters.

## Conflicting Obligations

What if two rules require incompatible actions?

For example:

\[
O(P)
\]

and:

\[
O(\neg P)
\]

A strict system becomes inconsistent.

Real legal and moral systems handle conflicts through:

- priority,
- exceptions,
- context.

## Prima Facie Obligations

W. D. Ross introduced the idea of **prima facie duties**.

A duty may count in favor of an action without being decisive.

Several obligations may compete.

Final judgment weighs them.

This is more realistic than one flat rule set.

## Permissions as Exceptions

Legal systems often work through defaults and exceptions.

General rule:

Vehicles may not enter.

Exception:

Emergency vehicles may enter.

Normative systems require structured override.

## Defeasible Logic

**Defeasible logic** allows conclusions to be withdrawn when stronger contrary information appears.

This fits legal and commonsense reasoning.

Not every rule is absolute.

## Norm Hierarchies

Legal systems often rank rules.

A constitution may override ordinary legislation.

A specific rule may override a general one.

Earlier rules may be superseded by later ones.

Norm conflict needs meta-rules.

## Obligation and Time

Norms are often temporal.

"You must pay by Friday."

The obligation exists within a time window.

This connects deontic logic with temporal logic.

## Obligation and Knowledge

Can someone be obligated to do something they cannot know about?

Legal and moral theory often considers:

- ignorance,
- foreseeability,
- notice.

This links deontic logic to epistemic logic.

## Ought Implies Can

A famous principle says:

**ought implies can.**

If someone is obligated to do P, then P must be possible for them.

Symbolically:

\[
O(P) \rightarrow \Diamond P
\]

The principle is plausible but debated.

## Impossible Obligations

A rule requiring the impossible seems defective.

But real institutions can accidentally impose incompatible or impossible requirements.

Logic helps expose such failures.

## Responsibility

Obligation connects to responsibility.

If someone violates a rule, we may ask:

- Could they comply?
- Did they know?
- Were they coerced?

Normative reasoning depends on agency.

This foreshadows the later free-will section.

## Machine Ethics

Autonomous systems also face norms.

A robot may be required to:

- obey safety constraints,
- respect permissions,
- avoid forbidden actions.

Deontic logic can encode such policies.

## Policy Verification

A security system may specify:

- admins may access resource X,
- guests may not,
- auditors may access logs.

Formal logic can detect policy conflicts.

Norms become machine-checkable.

## Norms vs Goals

A goal says:

achieve P.

An obligation says:

you ought to ensure P.

The two can overlap.

But a rational agent may have goals that conflict with obligations.

Decision theory and ethics then interact.

## Norms and Culture

Norms vary across societies and institutions.

The formal structure:

obligatory,
permitted,
forbidden

can remain stable while content changes.

Logic abstracts from normative source.

## The Philosophical Lesson

Deontic logic formalizes the grammar of norms.

It helps distinguish:

- what is true,
- what is possible,
- what ought to be.

But real normative systems contain:

- conflicts,
- exceptions,
- priorities.

Formal clarity does not eliminate moral complexity.

## The Next Question

So far, many logics have treated uncertainty qualitatively.

But real reasoning often needs numbers.

How likely is an event?

How strongly should evidence change belief?

To answer that, we turn to:

**probability and probabilistic reasoning.**
