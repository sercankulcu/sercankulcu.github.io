---
title: 'How Statements Become Numbers'
permalink: /nature/211-how-statements-become-numbers/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 211
tags:
   - godel-numbering
   - encoding
   - arithmetic
   - syntax
   - self-reference
---

A mathematical statement looks like language.

A natural number looks like quantity.

Gödel's insight was that this difference can be bridged.

A statement can be assigned a number.

A proof can be assigned a number.

Then arithmetic can reason about statements and proofs through those numbers.

This is the heart of **arithmetization of syntax**.

## Start with a Finite Alphabet

A formal language uses a finite or effectively enumerable set of symbols.

For example:

- 0,
- S,
- +,
- ×,
- =,
- (,
- ),
- \(\neg\),
- \(\forall\),
- variables.

Assign each symbol a unique code.

## Symbol Codes

Suppose, purely for illustration:

`0 → 1`

`S → 2`

`+ → 3`

`= → 4`

`( → 5`

`) → 6`

The exact numbers do not matter.

The mapping only needs to be:

- unique,
- effective.

## A Formula Is a Sequence

The formula:

\[
S0+S0=SS0
\]

is a sequence of symbols.

Using our toy codes, it becomes a sequence of natural numbers.

Now we need to turn the whole sequence into one number.

## Sequence Encoding

One method uses successive primes.

If a sequence has codes:

\[
a_1,a_2,\ldots,a_n
\]

encode it as:

\[
2^{a_1}3^{a_2}5^{a_3}\cdots p_n^{a_n}
\]

Unique prime factorization guarantees recoverability.

## Why One Number Is Enough

Because each prime occupies a fixed position.

The exponent attached to:

- 2 gives the first symbol code,
- 3 gives the second,
- 5 gives the third.

The number stores the ordered sequence.

This is a mathematical serialization format.

## Gödel Number

The resulting natural number is called a **Gödel number** under that coding scheme.

Every formula gets a code.

Every proof gets a code.

Every finite syntactic object can, in principle, become arithmetic data.

## Statements Are Not Literally Numbers

This distinction matters.

The statement is not metaphysically identical to the number.

The number **encodes** the statement.

Representation returns once again.

A book is not its ISBN.

A program is not its file hash.

But coding can be precise enough for reasoning.

## Decoding

A good Gödel numbering must be effectively decodable.

Given the code, we can determine:

- which symbols occur,
- in what order.

This makes syntactic questions computable.

## Well-Formedness Becomes Arithmetic

Suppose we ask:

"Is n the Gödel number of a well-formed formula?"

That sounds like a syntactic question.

But because the coding is mechanical, the property can be represented as an arithmetic relation.

Syntax has become number theory.

## Variables Become Numbers Too

Variables themselves have codes.

Substitution operations can therefore be encoded arithmetically.

We can represent operations like:

"replace variable x in formula y with numeral z."

This is crucial for formal self-reference.

## Proof Sequences

A proof is a finite list of formulas.

A list of formula codes can itself be encoded as one number.

So one number can represent an entire proof.

Nested representation is routine.

## Checking a Proof

Given a candidate proof code, we can mechanically ask:

1. Does it decode to a finite sequence of formulas?
2. Is each formula well formed?
3. Is each line an axiom or legal consequence?
4. Is the final line the target?

Proof verification becomes arithmetic.

## Primitive Recursive Relations

Many syntactic relations involved in proof checking are **primitive recursive** or otherwise effectively representable.

This means arithmetic can express them internally.

The metatheory can be mirrored inside number theory.

## "x Is a Proof of y"

We can define a relation:

\[
Proof(x,y)
\]

meaning:

x encodes a valid proof of the formula with Gödel number y.

This is an arithmetic relation between natural numbers.

## Provability Predicate

Then:

\[
Prov(y)\equiv \exists x\,Proof(x,y)
\]

means:

there exists some encoded proof of y.

A meta-level statement about proof has been translated into arithmetic.

## From Formula to Numeral

Suppose formula \(F\) has Gödel number 527381.

Arithmetic can contain a numeral denoting:

527381.

The formal language can therefore mention the code of F using ordinary arithmetic notation.

## Quotation by Number

Natural language uses quotation marks:

"Snow is white."

Gödel numbering provides an arithmetic analogue.

Instead of quoting a formula textually, we can refer to its code numerically.

Numbers become names for formulas.

## Diagonalization

Now imagine a formula:

\[
A(x)
\]

with one free variable.

What happens if we substitute into x the number coding A itself?

The formula is applied to its own description.

This is the formal analogue of self-application.

## The Diagonal Function

One can define an effective function that takes the Gödel number of a one-variable formula and returns the Gödel number of the result of substituting that very code into the formula.

This kind of operation is often called **diagonalization**.

The system can represent it arithmetically.

## Self-Reference Without "This"

A natural-language sentence says:

"This sentence is unprovable."

Formal arithmetic has no magical pronoun "this."

Instead, self-reference is engineered through:

- coding,
- substitution,
- diagonalization.

The result is more rigorous than ordinary self-reference.

## The Diagonal Lemma

A central result says roughly:

For any suitable formula \(F(x)\), there exists a sentence \(G\) such that:

\[
G \leftrightarrow F(\ulcorner G\urcorner)
\]

is provable.

Here:

\[
\ulcorner G\urcorner
\]

denotes the Gödel number of G.

This is a fixed-point theorem for formal language.

## Fixed Points Return

We encountered fixed points in:

- dynamical systems,
- quines,
- lambda calculus.

Now they appear in logic.

A formula is constructed whose content is equivalent to applying a property to its own code.

Self-reference is a fixed point of representation.

## The Gödel Sentence

Let \(F(x)\) mean:

"x is not provable."

Then diagonalization yields a sentence G satisfying:

\[
G \leftrightarrow \neg Prov(\ulcorner G\urcorner)
\]

Informally:

G says of itself:

"I am not provable."

## Why This Does Not Immediately Contradict Itself

Compare the Liar:

"This sentence is false."

with the Gödel sentence:

"This sentence is not provable."

Truth and provability are different.

A statement can be:

true,
but unprovable.

That gap prevents direct paradox under suitable assumptions.

## Arithmetic Becomes Metamathematics

Once statements and proofs have numerical codes, arithmetic can express claims about:

- formulas,
- derivations,
- theoremhood.

Number theory becomes a mirror of formal syntax.

## Encoding Is Not the Deepest Step

Gödel numbering itself is straightforward.

The deeper achievement is showing that the formal system is expressive enough to represent the coding operations and proof relations internally.

The system does not merely have external codes.

It can reason about them.

## Universal Computation Parallel

A universal computer does something similar.

It receives a program description as data.

Then it interprets that description.

Programs can process programs.

Arithmetic can process encoded arithmetic syntax.

The architecture is the same.

## Security and Serialization Analogy

Modern systems constantly convert structured objects into numbers or byte strings.

Examples include:

- serialization,
- machine code,
- cryptographic encodings.

Gödel numbering is conceptually familiar today because computation made representation ubiquitous.

## The Philosophical Lesson

Statements become numbers when syntax is encoded effectively.

Once that happens:

- proof becomes arithmetic,
- syntax becomes data,
- self-reference becomes possible.

The boundary between object language and metalanguage begins to fold inward.

## The Next Question

What happens when mathematics uses this bridge to make claims about its own formal activity?

Arithmetic can now say:

- "this formula is provable,"
- "this formula is not provable."

The next essay asks:

**What happens when mathematics talks about itself?**
