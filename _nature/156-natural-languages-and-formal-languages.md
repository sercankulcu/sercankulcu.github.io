---
title: 'Natural Languages and Formal Languages'
permalink: /nature/156-natural-languages-and-formal-languages/
chapter: 9
chapter_title: 'Language, Syntax, and Meaning'
order: 156
tags:
   - natural-language
   - formal-language
   - grammar
   - programming-languages
   - logic
---

English is a language.

Turkish is a language.

Python is called a programming language.

Predicate logic is a formal language.

These systems all use symbols and rules.

But they are not the same kind of thing.

A major distinction is between:

- **natural languages**,
- **formal languages**.

## Natural Languages

Natural languages arise historically in human communities.

Examples include:

- English,
- Turkish,
- Japanese,
- Arabic.

They evolve through use rather than being fully designed in advance.

## Formal Languages

A formal language is mathematically specified.

It consists of:

- an alphabet,
- formation rules,
- a set of valid strings.

Examples include:

- logical calculi,
- programming-language syntax,
- regular expressions.

Formal languages aim for explicit structure.

## Origin

Natural languages emerge.

Formal languages are usually designed.

No committee invented English grammar from scratch.

A programming language, by contrast, has a specification.

This difference affects precision.

## Ambiguity

Natural language is highly ambiguous.

"Flying planes can be dangerous."

Does it mean:

piloting planes is dangerous?

or

planes that are flying can be dangerous?

Humans often resolve ambiguity using context.

Formal systems try to eliminate or control it.

## Precision

A formal language should make interpretation explicit enough for:

- proof,
- computation,
- verification.

Ambiguity can cause failure.

Programming languages therefore define grammar carefully.

Natural languages tolerate flexibility because human interpreters bring context.

## Context

Natural language relies heavily on shared knowledge.

"Put it there."

A human can understand this in context.

A formal system usually requires explicit identifiers.

Context is minimized or formalized.

## Error Tolerance

Humans can understand imperfect sentences.

"Yesterday me go shop."

The grammar is nonstandard.

Meaning remains accessible.

Compilers are usually less forgiving.

A missing symbol may cause failure.

## Syntax

Formal languages distinguish sharply between:

valid string

and

invalid string.

Natural-language grammaticality is often more graded.

Some sentences feel awkward rather than simply impossible.

Human language is probabilistic as well as rule-governed.

## Semantics

Formal languages can have precisely defined semantics.

In a programming language, an expression may denote a computational operation.

In logic, an expression may be true relative to a model.

Natural-language semantics is richer and more context-dependent.

## Pragmatics

Natural language contains pragmatics.

A sentence can imply more than it states.

Formal systems usually try to avoid reliance on unstated intention.

This is a major difference.

## Evolution

Natural languages change continuously.

Words shift meaning.

Pronunciation evolves.

Grammar changes.

Formal languages can also evolve through versions.

But changes are explicit and documented.

## Redundancy

Natural language is redundant.

This helps humans communicate through noise.

Formal languages often prefer compactness and precision.

Still, programming languages also include redundancy for readability.

Design involves tradeoffs.

## Creativity

Natural-language speakers produce novel expressions.

Formal languages can also generate infinitely many valid expressions.

The difference is not generativity itself.

The difference lies in how meaning and use are grounded.

## Grammar

Both kinds of language have grammar.

But natural grammar is inferred from speaker behavior.

Formal grammar is explicitly specified.

This makes formal language easier to analyze mathematically.

## BNF

Programming-language syntax is often described using formalisms such as **Backus-Naur Form**.

For example:

```text
<expr> ::= <expr> "+" <term> | <term>
```

This is a formal generative rule.

It defines legal structures.

## Automata

Formal language theory studies which machines can recognize which languages.

Finite automata recognize regular languages.

Pushdown automata recognize a broader class of context-free languages.

This connects language to computation.

## Chomsky Hierarchy

The Chomsky hierarchy organizes formal grammars by expressive power:

- regular,
- context-free,
- context-sensitive,
- recursively enumerable.

The hierarchy became central to theoretical computer science.

## Human Language and the Hierarchy

Natural language has inspired formal grammar theory.

But no simple claim that all human language belongs neatly to one Chomsky class captures the full phenomenon.

Natural syntax includes complexities beyond simple toy grammars.

## Programming Languages

Programming languages occupy an interesting middle ground.

Their syntax is formal.

Their use is human.

Programmers rely on:

- naming,
- comments,
- conventions,
- intention.

A program has machine semantics and human meaning simultaneously.

## Natural-Language-Like Programming

Some programming languages use English-like keywords.

For example:

`if`

`while`

`return`

But surface resemblance does not make them natural languages.

Their syntax and semantics remain formally constrained.

## Logic

Logical languages are even more abstract.

Symbols such as:

\[
orall,\ \exists,\ \land,\ \lor
\]

are assigned precise rules.

Logic sacrifices much of natural-language richness to gain formal clarity.

## Mathematics

Mathematics mixes natural and formal language.

A proof may contain:

- prose,
- equations,
- diagrams.

Mathematical communication relies on both rigorous notation and human explanation.

No single layer suffices.

## Controlled Natural Language

Some systems restrict natural language to reduce ambiguity.

For example, technical specifications may use standardized wording.

This creates **controlled natural language**.

It lies between everyday language and formal notation.

## Legal Language

Legal writing attempts precision but remains natural language.

Ambiguity cannot be eliminated entirely.

Interpretation depends on:

- precedent,
- context,
- institutional practice.

This shows why formalization is difficult in human domains.

## Translation

Natural-language translation involves more than symbol substitution.

The translator must preserve:

- meaning,
- tone,
- cultural implication.

Formal-language translation can sometimes be more exact because semantics is explicitly defined.

## Compilers

A compiler translates from one formal representation to another.

Source code becomes:

- intermediate representation,
- machine code.

The translation is systematic.

This is representation transformation, not human interpretation.

## Formal Languages Need Interpretation Too

A formal language is not meaningful merely because syntax is exact.

Its symbols still require semantics.

A logical formula needs a model.

A program needs an execution model.

Formal precision does not eliminate interpretation.

It formalizes it.

## Natural Languages Exploit Human Intelligence

Natural languages remain efficient because humans fill gaps.

We infer:

- reference,
- intention,
- context.

What looks underspecified formally can be perfectly adequate socially.

Human intelligence is part of the communication system.

## Formal Languages Outsource Less to Context

Formal languages move more information into explicit rules.

This reduces ambiguity.

The price can be rigidity.

Natural language is flexible partly because interpretation is distributed across speaker and listener.

## The Philosophical Lesson

Natural and formal languages differ less in whether they have structure than in:

- how explicit the structure is,
- how much context is permitted,
- how semantics is fixed,
- how error is handled.

Both are representational systems.

They optimize for different goals.

## The Next Question

Natural language is not merely used.

It is acquired.

Children learn complex linguistic structure with remarkable speed.

How do they do it?

What is learned?

What might be innate?

The next question is:

**How do children acquire language?**
