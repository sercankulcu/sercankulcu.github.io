---
title: 'The Liar Paradox'
permalink: /nature/168-the-liar-paradox/
chapter: 10
chapter_title: 'Self-Reference, Self-Representation, and Life'
order: 168
tags:
   - liar-paradox
   - self-reference
   - truth
   - logic
   - paradox
---

Consider the sentence:

**This sentence is false.**

Is it true?

If it is true, then what it says is correct.

So it is false.

But if it is false, then what it says is not correct.

So perhaps it is true.

The sentence appears to flip endlessly between truth and falsity.

This is the **Liar paradox**.

## Ancient Roots

Versions of the paradox are ancient.

The philosopher Eubulides of Miletus is associated with an early formulation:

"A man says that he is lying. Is what he says true or false?"

The puzzle has survived because it exposes deep problems in the concept of truth.

## The Simple Loop

Let sentence `L` say:

`L is false.`

Assume `L` is true.

Then its content is correct.

Therefore `L` is false.

Now assume `L` is false.

Then what it says is not the case.

Therefore it is not false.

So it seems true.

Classical bivalent logic cannot assign a stable value.

## Is It Just Wordplay?

No.

The paradox is not merely a linguistic joke.

It arises from a dangerous combination:

- self-reference,
- semantic predicates,
- classical truth rules.

Formal versions can be constructed without using the phrase "this sentence."

The problem is structural.

## Truth Predicate

The key expression is:

"is false."

The sentence applies a truth-related predicate to itself.

Self-reference alone is harmless.

"This sentence is in English."

No paradox.

Truth predicates make the loop semantic.

## Use–Mention Structure

The Liar depends on a sentence somehow referring to itself as an object.

That requires a bridge between expression used and expression mentioned.

The paradox therefore sits directly on the use–mention boundary.

## Object Language and Metalanguage

Tarski's response was to separate levels.

An object language should not contain its own unrestricted truth predicate.

Truth for the object language belongs in a metalanguage.

Then "This sentence is false" cannot be formed in the dangerous unrestricted way.

## Tarski's Solution

Tarski's hierarchy blocks semantic self-reference.

Language `L0` contains ordinary sentences.

Language `L1` can say which `L0` sentences are true.

But `L1`'s own truth predicate would require `L2`.

The loop is prevented through stratification.

## Is That the Final Answer?

Not everyone is satisfied.

Natural language appears semantically closed.

We routinely say:

"Everything she said is true."

including statements that themselves discuss truth.

A strict hierarchy does not closely match ordinary language.

Alternative theories attempt to preserve more expressive freedom.

## Truth-Value Gaps

One response says the Liar is neither true nor false.

It lacks a truth value.

This rejects the assumption that every meaningful statement must be one or the other.

Such approaches use **truth-value gaps**.

## Kripke's Approach

Saul Kripke developed a theory of truth using partial valuations and fixed points.

Some sentences receive truth values.

Some paradoxical sentences remain undefined.

Truth can be built iteratively without forcing every sentence into true or false.

## Dialetheism

A more radical response says some contradictions are genuinely true.

This view is called **dialetheism**.

The Liar may be both true and false.

To avoid triviality, dialetheists use **paraconsistent logics** where one contradiction does not imply everything.

## Classical Explosion

In classical logic, a contradiction can support arbitrary conclusions under standard rules.

This is sometimes called **explosion**.

If the Liar is simply both true and false within ordinary classical logic, the system risks collapse.

Paraconsistent logic modifies this consequence relation.

## Revenge Paradoxes

Many proposed solutions face **revenge paradoxes**.

Suppose we say:

"This sentence is either false or undefined."

If the theory assigns it undefined status, the sentence may seem to say something correct after all.

Semantic paradoxes often return in modified form.

## The Strengthened Liar

Another version says:

"This sentence is not true."

This can threaten theories that escape the original by introducing a third value.

The paradox adapts to the semantic vocabulary available.

## Curry's Paradox

Self-reference can cause trouble even without negation.

A sentence can be constructed roughly as:

"If this sentence is true, then P."

Under certain logical assumptions, one can derive arbitrary `P`.

This is **Curry's paradox**.

The issue is broader than simple lying.

## Russell's Paradox Analogy

Russell's paradox in set theory has a similar self-applicative shape.

Consider the set of all sets that are not members of themselves.

Is it a member of itself?

The problem arises when a system is too unrestricted in forming self-referential collections.

## Set-Theoretic Repair

Modern set theories avoid Russell's paradox by restricting set formation.

Not every definable collection is automatically a set.

One general lesson is:

unrestricted self-application is dangerous.

## Gödel Is Different

Gödel's incompleteness theorem also uses self-reference.

But it does not create a semantic contradiction.

A Gödel sentence says roughly:

"I am not provable in this system."

Under suitable assumptions, the statement can be true but unprovable.

Self-reference produces limitation rather than inconsistency.

## The Importance of Controlled Self-Reference

This contrast is crucial.

Self-reference can produce paradox, fixed points, incompleteness, or self-reproduction.

The outcome depends on the surrounding rules.

Self-reference is a structural tool, not automatically a contradiction.

## Natural Language Handles Paradox Informally

Humans often recognize the Liar as pathological and move on.

Formal systems cannot do that casually.

A mathematical theory needs exact rules for truth, reference, and inference.

Paradox reveals hidden assumptions.

## What Does the Liar Teach About Truth?

At minimum, it shows that truth is not a trivial predicate we can add freely to any sufficiently expressive language.

A theory of truth must account for semantic ascent, self-reference, and consistency.

Truth interacts with language architecture.

## Is Truth Definable?

Tarski showed that sufficiently rich formal languages face strict limits on defining their own truth predicate.

This foreshadows later results in metalogic.

A system may express arithmetic while being unable to capture its own truth completely.

## The Philosophical Lesson

The Liar paradox is not simply a sentence that confuses itself.

It reveals a general problem:

**when a representational system can refer to its own semantic status, ordinary logical rules can become unstable.**

The paradox teaches us to respect levels.

## The Next Question

Some self-referential systems do not collapse.

Instead, they loop through levels and return to themselves in structured ways.

Douglas Hofstadter gave these structures a memorable name:

**strange loops.**
