---
title: 'When Mathematics Talks About Itself'
permalink: /nature/212-when-mathematics-talks-about-itself/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 212
tags:
   - self-reference
   - metamathematics
   - godel
   - provability
   - formal-systems
---

Mathematics normally talks about:

- numbers,
- sets,
- functions,
- spaces.

But after Gödel numbering, mathematics can also talk about:

- formulas,
- proofs,
- provability.

The formal system becomes one of its own subjects.

This is **metamathematics internalized**.

## Outside and Inside

From outside a formal system, we can say:

"This sequence is a valid proof."

That is a metamathematical statement.

Gödel's technique translates it into an arithmetic statement inside the system.

The distinction between object and meta level remains.

But a coded bridge now connects them.

## Arithmetic as a Mirror

Suppose proof relation is represented as:

\[
Proof(x,y)
\]

Then arithmetic can express:

"There exists a number x encoding a proof of formula y."

That is:

\[
\exists x\,Proof(x,y)
\]

Arithmetic mirrors statements about its own proof machinery.

## Provability Is Representable

Define:

\[
Prov(y)\equiv \exists x\,Proof(x,y)
\]

Now a formula can say:

"The formula with code y is provable."

This is a formal predicate inside arithmetic.

## Self-Application

The next step is to construct a sentence that applies this provability predicate to its own code.

The diagonal lemma guarantees such fixed points.

The sentence can talk about itself indirectly.

## Gödel's Sentence

A Gödel sentence G is constructed so that, informally:

\[
G \leftrightarrow \neg Prov(\ulcorner G\urcorner)
\]

G says:

"G is not provable."

Or more naturally:

"I am not provable in this system."

## Suppose G Were Provable

If the system proves G, then the system proves a statement asserting:

G is not provable.

If the provability predicate correctly represents proof and the system is suitably consistent, trouble follows.

A consistent system cannot prove G in the ordinary Gödel construction.

## Suppose G Is Not Provable

Then what G says is correct.

So, under appropriate soundness assumptions, G is true in the intended arithmetic interpretation.

We obtain:

true but unprovable.

This is the core intuition behind the first incompleteness theorem.

## Not Every Detail Fits in the Slogan

The exact theorem depends on technical assumptions.

We need conditions such as:

- effective axiomatizability,
- sufficient arithmetic strength,
- consistency or related stronger hypotheses depending on formulation.

The informal slogan is useful.

The theorem itself is precise.

## Truth Is Outside the Proof Relation

This is why our earlier distinction mattered:

truth ≠ proof.

If truth and provability were identical, the Gödel construction would collapse into contradiction.

Instead, it exposes a gap.

## The System Cannot Capture All Arithmetic Truth

A sufficiently strong consistent formal theory cannot prove every true arithmetic sentence.

No finite or recursively enumerable axiom system of the relevant kind captures all truths of standard arithmetic.

There will always be sentences outside its provable reach.

## Add the Gödel Sentence as an Axiom?

Perhaps we can repair the system.

Add G as a new axiom.

Now G becomes provable.

But the strengthened system can generate a new Gödel sentence.

The horizon moves.

No one fixed effective system closes the gap completely.

## An Endless Extension

We can create:

System 0.

Add its Gödel sentence.

Get System 1.

Add the next Gödel sentence.

Get System 2.

And so on.

Each extension may prove more.

But no single effectively axiomatized sufficiently strong consistent system captures all arithmetic truth.

## Formal Truth vs Mathematical Insight

Does Gödel show that humans can always see truths machines cannot?

Not so quickly.

The theorem applies to fixed formal systems.

Humans are not obviously one consistent formal system.

Nor are humans guaranteed infallible access to Gödel sentences.

Overstating the theorem creates mythology.

## Lucas–Penrose Arguments

Some philosophers, including J. R. Lucas and Roger Penrose, have argued that Gödel shows human minds cannot be purely algorithmic.

These arguments remain controversial.

Critics point out that human consistency and formal characterization cannot simply be assumed.

Gödel does not straightforwardly prove mind exceeds computation.

## Formal Systems Can Be Stronger Than Us

Humans routinely fail at mathematics.

Formal systems can verify proofs too long for any person to inspect manually.

The incompleteness theorem limits formal systems in principle.

It does not rank humans above computers in practice.

## Self-Reference Without Paradox

The Gödel sentence is a beautiful case of stable self-reference.

It does not say:

"I am false."

It says:

"I am not provable."

The result is not semantic collapse.

It is incompleteness.

## Provability Logic

Mathematicians later developed **provability logic** to study formal principles governing statements like:

"It is provable that P."

The provability predicate itself has a rich logical structure.

Self-reference becomes an entire mathematical field.

## Löb's Theorem Preview

One remarkable result, Löb's theorem, says roughly that if a suitable theory proves:

"If P is provable, then P,"

then under appropriate conditions the theory already proves P.

Provability behaves differently from ordinary necessity.

We will not develop this in detail here.

## Reflection Principles

A **reflection principle** says, in effect:

Whatever the system proves is true.

From outside, this may seem reasonable if we trust the system.

But internalizing reflection without restriction can create problems.

A system cannot casually certify all of its own reliability.

## Consistency as Self-Knowledge

The statement:

"This system is consistent"

can itself be represented arithmetically.

Gödel's second incompleteness theorem will show a major limit:

a sufficiently strong consistent system cannot prove its own consistency by its ordinary internal means.

Formal self-knowledge has boundaries.

## Mathematics as Self-Model

Earlier we asked whether a system can contain a model of itself.

Gödel gives a precise logical case.

Arithmetic can encode substantial information about its own proofs.

But complete self-certification is impossible under the relevant assumptions.

Self-modeling is powerful and incomplete.

## Strange Loops Return

The formal system:

- generates statements,
- numbers those statements,
- talks about those numbers,
- thereby talks about itself.

This is a strange loop.

Levels remain conceptually distinct.

Encoding closes the loop.

## Hofstadter's Central Fascination

This structure fascinated Hofstadter because it connects:

- Gödel,
- self-reference,
- symbols,
- mind.

A system becomes rich enough to represent its own activity.

Self-reference then produces unexpected emergent limits.

## The Philosophical Lesson

When mathematics talks about itself, it discovers boundaries that cannot be seen from ordinary arithmetic alone.

Formalization creates self-reflection.

Self-reflection reveals incompleteness.

The system's greatest power exposes its own limits.

## The Next Question

Self-reference often depends on what stands out as the object of attention and what recedes into context.

A drawing can switch between:

- figure,
- background.

A statement can shift between:

- object,
- meta-level.

This leads to a broader conceptual theme:

**figure and ground.**
