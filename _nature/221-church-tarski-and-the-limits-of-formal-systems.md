---
title: 'Church, Tarski, and the Limits of Formal Systems'
permalink: /nature/221-church-tarski-and-the-limits-of-formal-systems/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 221
tags:
   - church
   - tarski
   - undecidability
   - truth
   - formal-limits
---

Gödel showed that sufficiently strong formal theories are incomplete.

But incompleteness is only one kind of limit.

Two other major results reshape the picture:

- Church's undecidability theorem,
- Tarski's undefinability theorem.

Together they show that:

- not every formal question can be decided mechanically,
- not every truth predicate can be safely defined inside the language it describes.

## Three Different Limits

It helps to separate them.

### Gödel
Limits what sufficiently strong effective theories can prove.

### Church
Limits what algorithms can decide.

### Tarski
Limits how truth can be defined inside sufficiently expressive languages.

The results interact.

They are not identical.

## Church and the Decision Problem

Hilbert's Entscheidungsproblem asked:

Is there a mechanical procedure that determines whether any first-order formula is logically valid?

Alonzo Church proved:

No.

First-order validity is undecidable.

## Why Completeness Does Not Save Decidability

First-order logic is complete.

Every valid formula has a proof.

Therefore we can enumerate proofs until a proof appears.

But for an invalid formula, proof search may run forever.

Completeness gives recognition of validity.

Not a terminating decision procedure.

## Church's Lambda Calculus

Church formalized effective computation using lambda calculus.

He showed that certain decision problems cannot be solved by any lambda-definable procedure.

This gave a rigorous negative answer to Hilbert's dream.

## Turing's Independent Route

Alan Turing developed Turing machines and reached an equivalent boundary.

His halting problem made undecidability computationally vivid.

Different formalisms converged.

This convergence supports the Church–Turing thesis.

## Effective Procedure Becomes Formal

Before Church and Turing, "mechanical method" was intuitive.

After them, effective computation had precise mathematical models.

That made impossibility provable.

We could finally prove that no algorithm exists for some tasks.

## Tarski and Truth

Alfred Tarski studied another dangerous concept:

**truth**.

Can a sufficiently expressive formal language contain a predicate:

\[
True(x)
\]

that correctly applies to exactly the codes of its own true sentences?

For arithmetic-like languages, Tarski's answer is no under standard assumptions.

## Undefinability of Truth

Very roughly, Tarski's theorem says:

The set of true sentences of arithmetic cannot be defined within arithmetic itself in the required full way.

A sufficiently rich language cannot contain its own unrestricted truth predicate while satisfying the expected truth conditions.

## T-Schema

Tarski captured ordinary truth through patterns such as:

"Snow is white" is true iff snow is white.

Formally:

\[
True(\ulcorner P\urcorner)\leftrightarrow P
\]

for sentences P.

The problem arises if a language can apply such a truth predicate to all of its own sentences.

## The Liar Returns

Suppose the language can define unrestricted truth for itself.

Then diagonalization can produce a sentence L saying:

"L is not true."

We recover the Liar structure.

Self-reference plus an unrestricted truth predicate creates contradiction.

## Tarski's Hierarchy

One solution is a hierarchy of languages.

Object language:

\[
L_0
\]

cannot define its own truth predicate.

A metalanguage:

\[
L_1
\]

can define truth for \(L_0\).

A still higher language:

\[
L_2
\]

can discuss truth in \(L_1\).

And so on.

## Semantic Closure Has a Price

Natural languages like English seem semantically closed.

We can say:

"This English sentence is false."

That flexibility generates paradox.

Formal languages can avoid paradox by controlling expressive closure.

Precision requires restrictions.

## Truth vs Provability Again

Gödel uses a predicate for:

provability.

Tarski restricts:

truth.

This difference is fundamental.

Provability is syntactic and effectively representable.

Full arithmetic truth is semantically richer.

## Arithmetic Truth Is Not Computably Enumerable

The set of all true sentences of standard arithmetic is not recursively enumerable.

If it were effectively enumerable, it could serve as the theorem set of a complete effective theory.

Gödel prevents that.

Truth outruns effective theorem enumeration.

## Provability Is Computably Enumerable

For an effectively axiomatized theory, proofs can be enumerated.

Therefore its theorem set is recursively enumerable.

This contrast is central:

provability is mechanically enumerable.

Arithmetic truth is not.

## Church, Gödel, Tarski as a Triangle

We can summarize:

### Church
No general decider for first-order validity.

### Gödel
No complete effective consistent theory of sufficient arithmetic strength.

### Tarski
No full internal truth definition for arithmetic.

The limits concern:

- algorithm,
- proof,
- semantics.

## Why These Results Were Surprising

Formalization began as a project of control.

Make reasoning precise.

Make proof mechanical.

Remove ambiguity.

The surprising outcome was that formalization made limits visible.

The stronger the formal tools became, the more precisely they could prove where they fail.

## Limits Are Not Defects

A limitation theorem is not evidence that formal logic is weak.

Quite the opposite.

Only a powerful formal system can express and establish such limits.

A ruler that reveals its own finite length is not useless.

It is calibrated.

## Restricted Systems Can Escape

Not every formal system is incomplete or undecidable.

Propositional logic is decidable.

Presburger arithmetic is decidable.

Weak systems can have strong metatheoretic properties.

The limits emerge when expressive power crosses certain thresholds.

## Expressiveness vs Control

There is a recurring tradeoff:

more expressive language

→ more things can be represented,

but often:

→ less decidability,
→ less completeness,
→ more self-reference.

Power has formal costs.

## Type Systems as Control

Type systems can prevent dangerous self-application.

Tarski-style hierarchies prevent unrestricted self-truth.

Restricted languages often sacrifice expressive freedom to gain safety.

This pattern appears across logic and computing.

## Databases

Database query languages illustrate the tradeoff too.

Restricting expressive power can guarantee:

- termination,
- optimization,
- decidability.

Adding unrestricted recursion may increase power while complicating analysis.

Formal design is balancing expressiveness and tractability.

## Verification

A verifier cannot decide every interesting semantic property of arbitrary programs.

So verification systems restrict:

- programming language,
- specification language,
- analysis domain.

Again, practical success comes from controlled expressiveness.

## Does Tarski Mean Truth Is Impossible?

No.

Tarski does not deny truth.

He provides rigorous semantic definitions of truth for formal languages from suitably stronger metalanguages.

The limitation concerns self-contained unrestricted truth definition.

## Does Church Mean Reasoning Is Impossible?

No.

Church does not say no logical questions are decidable.

Many are.

The theorem says no one algorithm solves all first-order validity instances.

## Does Gödel Mean Proof Is Futile?

No.

Most mathematics remains provable.

Gödel shows that no suitable fixed effective formal system captures all arithmetic truth.

Mathematics becomes open-ended, not meaningless.

## A Shared Structural Theme

All three results involve boundaries between levels:

- object and meta,
- syntax and semantics,
- program and description.

Self-representation pushes against these boundaries.

The resulting limitations are not accidental.

## Formal Systems Cannot Contain Everything at Once

We often want a system that is simultaneously:

- expressive,
- complete,
- consistent,
- decidable,
- self-verifying,
- semantically closed.

The great limit theorems show that these goals cannot all be combined freely.

Formal architecture requires tradeoffs.

## The Philosophical Lesson

Church, Gödel, and Tarski replaced vague claims about "the limits of reason" with precise mathematical theorems.

They showed specific limits of:

- algorithms,
- proof systems,
- truth definitions.

The lesson is not that reason fails.

It is that reason can map some of its own boundaries.

## The Next Question

But how far should we generalize from these theorems?

Do formal limits imply limits to:

- human thought,
- science,
- explanation,
- knowledge itself?

That broader question is much harder.

The next essay asks:

**Are there limits to reason?**
