---
title: 'Object Language and Metalanguage'
permalink: /nature/167-object-language-and-metalanguage/
chapter: 10
chapter_title: 'Self-Reference, Self-Representation, and Life'
order: 167
tags:
   - object-language
   - metalanguage
   - logic
   - truth
   - self-reference
---

Language can talk about the world.

It can also talk about language.

That second ability creates a hierarchy.

The language being discussed is the **object language**.

The language used to discuss it is the **metalanguage**.

This distinction is central to logic, semantics, programming, and self-reference.

## Ordinary Example

Suppose the object-language sentence is:

Snow is white.

Now consider:

"'Snow is white' is true."

The second sentence talks about the first.

It belongs to a meta level.

## Same Natural Language, Different Role

We can use English as both object language and metalanguage.

That can hide the distinction.

The level depends on function, not vocabulary.

One sentence describes snow.

Another describes a sentence about snow.

## Why Levels Matter

Without levels, expressions can become entangled with claims about their own truth, provability, or meaning.

This creates semantic loops.

Some are harmless.

Some generate paradox.

## Syntax in the Metalanguage

A metalanguage can describe formal properties of expressions.

For example:

"'P ∧ Q' contains a conjunction."

This statement is about syntax.

It treats the formula as an object.

## Semantics in the Metalanguage

A metalanguage can also assign meaning.

For example:

"'Snow is white' is true if and only if snow is white."

This kind of structure became famous in Alfred Tarski's work on truth.

## T-Schema

Tarski used instances of a form like:

"Snow is white" is true if and only if snow is white.

The quoted expression occurs on one side.

Its interpreted condition occurs on the other.

This separates sentence from statement about its truth.

## Truth Predicates

A language becomes dangerous when it contains an unrestricted truth predicate applying to its own sentences.

Then it can construct sentences like:

"This sentence is not true."

The object/meta boundary collapses.

The Liar paradox appears.

## Tarski's Hierarchy

Tarski's strategy was to stratify languages.

A language `L0` talks about ordinary objects.

A metalanguage `L1` can talk about sentences of `L0`, including their truth.

A higher metalanguage `L2` can then discuss `L1`.

This blocks some self-referential loops.

## The Cost of Hierarchy

The hierarchy avoids paradox by forbidding one level from containing its own fully general truth predicate.

But the strategy creates an open-ended tower.

Each level requires a higher level for its truth concept.

There is no single final all-inclusive truth language inside the same scheme.

## Formal Syntax as Mathematics

In logic, formulas can be represented as strings, trees, or numbers.

Once represented, statements about syntax become ordinary mathematics.

This is crucial for Gödel.

Mathematics can then talk about mathematical expressions.

## Gödel's Move

Gödel encoded formulas and proofs using numbers.

Arithmetic could thereby express claims about formulas and provability.

A formal system acquired a kind of internal metalanguage through arithmetic coding.

Self-reference became mathematically precise.

## Programming Analogy

Programming languages also have meta-level tools.

A program can analyze source code.

A compiler takes a program as input.

A debugger inspects runtime state.

A reflection system allows code to query code.

These are computational analogues of metalanguage.

## Compiler as Meta-System

Consider:

source program → compiler → machine program.

The compiler treats the source language as an object.

Its own implementation exists at another level.

Then a compiler can itself be compiled.

Levels can loop through bootstrapping.

## Metaprogramming

**Metaprogramming** means writing programs that generate or manipulate programs.

Examples include macros, code generators, and template systems.

Code becomes data.

The distinction between use and mention becomes operational.

## Quotation in Programming

Lisp famously makes code and data structurally similar.

Quotation tells the interpreter:

do not execute this expression; treat it as data.

This is a direct computational form of the use–mention distinction.

## Evaluation

An evaluation operation can reverse the move:

data → executable expression.

Quoting moves upward toward mention.

Evaluation moves downward toward use.

Systems that move between these levels gain great flexibility.

They also gain risk.

## Reflection and Self-Modification

A reflective program may inspect itself.

A self-modifying program may alter its own code.

Now object language and metalanguage can inhabit one running system.

Careful control becomes essential.

## Natural Language Is Less Disciplined

Human language freely mixes levels.

We say:

"That statement is false."

"This sentence is confusing."

"The word 'word' is a word."

Usually context saves us.

Formal logic cannot always rely on contextual rescue.

## Semantic Closure

A language is **semantically closed** if it can express claims about its own expressions and semantic predicates such as truth applying to them.

This expressive power is attractive.

It is also a source of paradox.

## Why Not Ban Self-Reference Entirely?

Because self-reference is useful.

Mathematics needs metatheory.

Programs need reflection.

Humans need introspection.

The goal is not to eliminate self-reference.

It is to understand which forms are safe.

## Object and Meta Are Relative

"Meta" is not an absolute category.

A metalanguage at one stage can become the object language of a higher-level analysis.

The relation is hierarchical, not metaphysical.

## Levels in Science

Science also uses object/meta distinctions.

A scientific theory describes a system.

Philosophy of science may analyze the theory.

Metascience may analyze scientific practice.

Higher levels study representations produced at lower levels.

## Levels in Mind

A belief can be:

"It is raining."

A metabelief can be:

"I believe that it is raining."

A higher belief can be:

"I am unsure whether my belief is justified."

Cognition can form recursive representational layers.

## The Philosophical Lesson

Object language and metalanguage let us separate talking about things from talking about representations of things.

The distinction protects reasoning from category confusion.

But once a system becomes expressive enough to represent its own expressions, the levels can fold back together.

## The Next Question

What happens when a sentence uses that expressive power to deny its own truth?

The result is one of philosophy's oldest and deepest puzzles:

**the Liar paradox.**
