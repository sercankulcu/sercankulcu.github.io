---
title: 'Gödel Numbering'
permalink: /nature/210-godel-numbering/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 210
tags:
   - godel-numbering
   - encoding
   - self-reference
   - arithmetic
   - metalogic
---

How can arithmetic talk about formulas?

Formulas are strings.

Numbers are numbers.

They seem to belong to different worlds.

Gödel's key insight was simple in principle:

**encode every finite symbolic object as a natural number.**

Then statements about syntax can become statements about arithmetic.

This is **Gödel numbering**.

## Step 1: Number the Symbols

Suppose our formal language contains symbols such as:

- 0,
- S,
- +,
- ×,
- =,
- (,
- ),
- variables,
- logical operators.

Assign each symbol a unique natural number.

For illustration:

`0 → 1`

`S → 2`

`+ → 3`

`= → 4`

The exact assignment is arbitrary.

What matters is uniqueness and effective recoverability.

## Step 2: Encode Sequences

A formula is not one symbol.

It is a sequence.

So we need a way to encode:

\[
a_1,a_2,\ldots,a_n
\]

as one natural number.

Prime factorization provides one elegant method.

## Prime-Power Encoding

Let the first primes be:

\[
2,3,5,7,11,\ldots
\]

Encode the sequence as:

\[
2^{a_1}3^{a_2}5^{a_3}\cdots p_n^{a_n}
\]

Because prime factorization is unique, the original sequence can be recovered.

## Example

Suppose the symbol codes are:

A → 1

B → 2

C → 3

Then the string:

ABC

could be encoded as:

\[
2^1\cdot3^2\cdot5^3
\]

That number uniquely carries the sequence under the chosen scheme.

## The Encoding Need Not Be This One

Gödel numbering is not one sacred numerical assignment.

Many effective encodings work.

The important property is that:

- encoding is mechanical,
- decoding is mechanical.

Syntax becomes arithmetic data.

## Formulas Become Numbers

Every well-formed formula receives a Gödel number.

We can now say:

number n encodes formula F.

A syntactic object has been arithmetized.

## Proofs Become Numbers

A proof is a finite sequence of formulas.

So proofs can also be encoded as numbers.

Now we can represent:

- formulas,
- derivations,
- proof sequences

inside arithmetic.

## "Is a Formula"

The property:

"x is the Gödel number of a well-formed formula"

can be translated into an arithmetic relation.

Because grammar checking is mechanical, the encoding of syntax can be represented arithmetically.

## "Is a Proof"

Likewise:

"x is the Gödel number of a valid proof of formula y"

can be represented by an arithmetic relation.

Call it informally:

\[
Proof(x,y)
\]

This says:

x codes a valid proof whose final formula has code y.

## Provability

Then we can define a provability predicate:

\[
Provable(y)\equiv \exists x\,Proof(x,y)
\]

In words:

formula y is provable if there exists a number x encoding a proof of it.

Provability becomes an arithmetic property.

## Why This Is Extraordinary

Before Gödel numbering, the statement:

"Formula F is provable"

seems metamathematical.

It talks about the formal system from outside.

After encoding, the system can represent a corresponding numerical statement internally.

Meta-language enters the object language.

## Arithmetic About Syntax

The system can express claims equivalent to:

- this number encodes a formula,
- this number encodes a proof,
- this formula has no proof.

Arithmetic becomes capable of describing its own formal machinery.

## Self-Reference Without Names

A formula does not need to contain its own text literally.

It can refer indirectly to its Gödel number.

This makes formal self-reference finite and exact.

## Diagonalization

The remaining challenge is:

How can a formula be constructed to refer to its own Gödel number?

The answer uses a technique related to **diagonalization**.

A formula with a free variable is made to receive its own code as input.

## Diagonal Lemma Preview

A central result called the **diagonal lemma** says, roughly:

For suitable formula \(F(x)\), there exists a sentence \(G\) such that:

\[
G \leftrightarrow F(\ulcorner G\urcorner)
\]

is provable in the system.

Here:

\[
\ulcorner G\urcorner
\]

means the Gödel number of G.

This is formal self-reference.

## "This Sentence Is Not Provable"

Choose \(F(x)\) to express:

"x is not provable."

Then the diagonal construction yields a sentence G that says, in effect:

**G is not provable in this system.**

This is the famous Gödel sentence.

## Not the Liar Paradox

The Gödel sentence resembles:

"This sentence is false."

But the structure is different.

The Liar talks about:

truth.

The Gödel sentence talks about:

provability.

Under suitable consistency assumptions, no contradiction follows.

Instead, incompleteness emerges.

## Why Number Theory Is Sufficient

Arithmetic can represent primitive recursive operations rich enough to encode:

- syntax,
- sequences,
- proof checking.

The system does not need a special "self-reference" primitive.

Ordinary arithmetic is expressive enough.

## Arithmetization of Syntax

The broader technique is called **arithmetization of syntax**.

Syntactic questions are converted into number-theoretic questions.

This is one of the great conceptual moves in logic.

## Representation vs Identity

A formula is not literally a number in the ordinary typographical sense.

It is **encoded** by a number.

Again:

representation is not identity.

But a reliable encoding is enough for formal reasoning.

## Computability Connection

Encoding programs as numbers later becomes central in computability theory.

A Turing machine can be encoded.

A program can receive the code of another program.

Universal computation depends on this idea.

## Universal Machines

A universal Turing machine takes as input:

- description of a machine,
- input for that machine.

It simulates the encoded machine.

Programs become data.

Gödel numbering and universal computation share the same structural principle.

## Quines Return

Quines also rely on code-as-data.

A program represents its own source and reconstructs it.

Gödel numbering is the mathematical version of a broader computational idea:

descriptions can describe descriptions.

## Proof Checking Is Arithmetic

Because proof checking is mechanical, arithmetic can encode each verification step.

The relation:

Proof(x,y)

is not mystical.

It represents a finite combinatorial procedure.

Self-reference is built from ordinary computation.

## The Object/Meta Boundary Folds

We began with:

object language,
metalanguage.

Gödel numbering does not abolish the distinction.

It creates a coded bridge.

The object language can represent aspects of the metatheory numerically.

That bridge is enough to produce deep limits.

## The Philosophical Lesson

Gödel numbering turns symbolic structure into arithmetic structure.

Symbols become numbers.

Formulas become numbers.

Proofs become numbers.

Then arithmetic can make statements about its own proofs.

Formal self-reference is no longer metaphor.

It is mathematics.

## The Next Question

Once statements become numbers, a new question appears.

How exactly can a sentence use that encoding to talk about itself?

How does mathematics move from:

"this number represents a formula"

to:

"a formula about its own code"?

The next essay is:

**How Statements Become Numbers.**
