---
title: 'How Arithmetic Becomes Symbol Manipulation'
permalink: /nature/209-how-arithmetic-becomes-symbol-manipulation/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 209
tags:
   - arithmetic
   - symbol-manipulation
   - syntax
   - formalization
   - proof
---

When a child learns:

\[
2+3=5
\]

the symbols usually carry meaning.

Two apples plus three apples make five apples.

Formal mathematics can remove that intuitive picture.

The expression becomes a string governed by rules.

Arithmetic becomes **symbol manipulation**.

## Why Strip Away Meaning?

Meaning is powerful.

It is also slippery.

People may disagree about intuition.

Formalization asks for something stricter:

Can each step be checked without guessing what the symbols mean?

That is the appeal of syntax.

## Symbol Tokens

Consider:

\[
2+3=5
\]

At one level, this contains tokens:

- `2`,
- `+`,
- `3`,
- `=`,
- `5`.

A formal system treats these according to grammar and rules.

## Numerals Are Representations

The symbol:

`5`

is not the number five itself.

Other representations include:

`V`

in Roman numerals.

`101`

in binary.

`SSSSS0`

in successor notation.

One abstract number can have many symbolic forms.

## Representation vs Object

This repeats a central lesson:

the word is not the thing.

Likewise:

the numeral is not the number.

Formal systems manipulate numerals.

Semantics relates them to mathematical objects.

## Syntax

Syntax says which strings are legal.

For example:

\[
(2+3)=5
\]

may be legal.

A malformed string may not be.

Formal correctness begins with grammar.

## Rewriting

Arithmetic can be viewed through rewriting rules.

Example:

\[
a+0 \rightarrow a
\]

and:

\[
a+S(b)\rightarrow S(a+b)
\]

Repeated rewrites compute sums.

Calculation becomes transformation of strings.

## Example: 2 + 1

Using successor notation:

\[
SS0+S0
\]

Apply:

\[
a+S(b)\rightarrow S(a+b)
\]

giving:

\[
S(SS0+0)
\]

Then:

\[
a+0\rightarrow a
\]

giving:

\[
SSS0
\]

The result corresponds to 3.

## Computation as Normalization

A calculation can be seen as reducing an expression to a **normal form**.

The starting expression is transformed until no rule applies.

Lambda calculus used the same idea.

Computation and proof share structural themes.

## Algebraic Manipulation

Consider:

\[
x+2=5
\]

Subtracting 2 from both sides yields:

\[
x=3
\]

Formally, this is not "moving the 2."

It is applying equality-preserving transformations justified by rules.

School shortcuts hide formal structure.

## Equality Rules

Equality supports principles such as substitution:

if:

\[
a=b
\]

then expressions containing a can often replace it with b under suitable conditions.

This is one reason equality is so powerful.

## Proof as Rewriting

Many proofs can be viewed as sequences of transformations preserving truth or derivability.

The mathematician sees meaning.

The formal checker sees legal steps.

Both operate on the same symbolic object at different levels.

## Algorithms Are Symbol Rules

Long addition is mechanical.

So is long multiplication.

An algorithm specifies:

- local transformations,
- control order.

Arithmetic procedures are formal symbol-processing systems.

## Carrying Digits

When we add:

```
  58
+ 67
```

we manipulate decimal digits according to place-value rules.

The carry operation encodes base-10 arithmetic.

The algorithm works because the notation has structure.

## Different Bases

The same arithmetic works in:

- binary,
- decimal,
- hexadecimal.

The symbol rules change.

The underlying number relations do not.

Representation and arithmetic must be distinguished.

## Machines Exploit Representation

Computers usually represent integers in binary.

Addition is implemented through digital circuits.

At the hardware level:

- voltages,
- logic gates.

At the software level:

- bit patterns.

At the mathematical level:

- integers.

One computation spans multiple representational layers.

## Formal Derivation vs Calculation

A **calculation** transforms an expression to a value.

A **proof** establishes that a proposition follows.

The distinction can blur.

For example, evaluating both sides of an equation may prove equality for a concrete case.

## Proof Checking Can Ignore Meaning

Suppose a proof is fully formalized.

A checker only asks:

- is line 7 legal?
- does it follow from lines 3 and 5?

It does not need to know what multiplication "really means."

This is the dream of mechanical verification.

## Semantic Interpretation Returns

But why care whether the final string is derivable?

Because the formal system is interpreted as mathematics.

Syntax produces consequence.

Semantics gives consequence significance.

## Formalization Creates Distance

When arithmetic becomes symbol manipulation, we gain:

- rigor,
- mechanization,
- reproducibility.

We lose some immediate intuitive meaning.

The formal layer is deliberately austere.

## Multiple Models

A formal arithmetic theory can have models beyond the intended natural numbers.

So the same symbolic derivations may be true in multiple structures.

Formal syntax cannot by itself force the intended interpretation completely.

## Meta-Mathematics

Once proofs are strings, they can be studied mathematically.

We can ask:

- How long is this proof?
- Does this sequence obey the rules?
- Is this formula derivable?

Proofs become data.

## Encoding Strings

Any finite string over a finite alphabet can be encoded as a natural number.

This is straightforward in principle.

For example, assign each symbol a number and encode the sequence systematically.

Now syntax becomes arithmetic.

## Prime-Power Encoding

One classic encoding method uses prime numbers.

Suppose symbols have codes:

\[
a_1,a_2,\ldots,a_n
\]

Then encode the sequence as:

\[
2^{a_1}3^{a_2}5^{a_3}\cdots p_n^{a_n}
\]

Unique prime factorization lets us recover the sequence.

## Why Unique Factorization Matters

The Fundamental Theorem of Arithmetic guarantees a unique prime decomposition.

So one natural number can unambiguously encode one finite symbol sequence under the scheme.

Number theory becomes a storage medium.

## Syntax Becomes Arithmetic Property

Once formulas are numbers, the property:

"x encodes a valid formula"

can itself be represented arithmetically.

Likewise:

"x encodes a proof of formula y."

This is the crucial transition.

## A System Talking About Its Own Strings

Normally, statements about formulas belong to a metalanguage.

Encoding moves those statements into arithmetic.

Arithmetic can now represent metamathematical claims about arithmetic syntax.

The object/meta distinction folds inward.

## Formal Self-Reference Approaches

Self-reference no longer requires the phrase:

"This sentence."

A statement can refer to the number encoding itself.

Indirect self-reference becomes precise.

This is far more powerful than linguistic trickery.

## Mechanization Creates Its Own Limits

The irony is profound.

Formalizing mathematics makes it mechanical.

That mechanization allows formulas and proofs to be encoded.

That encoding allows self-reference.

Self-reference then reveals limits of the formal system.

The path to incompleteness begins with successful formalization.

## The Philosophical Lesson

Arithmetic becomes symbol manipulation when we separate:

- formal representation,
- semantic interpretation.

This separation allows machines to calculate and verify.

It also allows mathematics to treat its own expressions as mathematical objects.

## The Next Question

To make that step precise, we need a systematic encoding.

Gödel's great technical move was to assign numbers to:

- symbols,
- formulas,
- proofs.

This is called:

**Gödel numbering.**
