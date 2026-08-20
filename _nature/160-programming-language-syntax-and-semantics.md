---
title: 'Programming Language Syntax and Semantics'
permalink: /nature/160-programming-language-syntax-and-semantics/
chapter: 9
chapter_title: 'Language, Syntax, and Meaning'
order: 160
tags:
   - programming-languages
   - syntax
   - semantics
   - computation
   - formal-languages
---

Programming languages are designed languages.

They must be precise enough for machines to process.

This makes them ideal for examining the difference between:

- syntax,
- semantics.

A program can be syntactically valid and still behave incorrectly.

Structure and meaning remain distinct even in formal systems.

## Syntax

**Syntax** specifies which symbol sequences are legal programs.

For example:

```text
if x > 0:
    print(x)
```

may be syntactically valid in one language.

A missing delimiter or malformed expression may cause a syntax error.

The parser checks form.

## Grammar

Programming-language syntax is often described formally using grammars.

A grammar can specify categories such as:

- expression,
- statement,
- identifier,
- literal.

This allows a parser to construct a structured representation of the program.

## Tokens

Before parsing, source code is usually broken into **tokens**.

For example:

```text
x = y + 1
```

may become:

identifier,
assignment,
identifier,
plus,
integer literal.

Lexical analysis identifies basic units.

## Parse Trees

The parser groups tokens into hierarchical structure.

For:

```text
a + b * c
```

the parse tree captures operator precedence.

Usually multiplication groups more tightly:

```text
a + (b * c)
```

The structure determines later meaning.

## Abstract Syntax Trees

Compilers often simplify parse trees into **abstract syntax trees**, or ASTs.

An AST keeps computational structure while discarding unnecessary punctuation.

The source program becomes a recursive data structure.

## Static Semantics

Some languages check constraints before execution.

Examples:

- variable declared?
- type compatible?
- function called with right number of arguments?

These rules are sometimes called **static semantics**.

They go beyond grammar but can still be checked without running the program.

## Dynamic Semantics

**Dynamic semantics** describes what happens during execution.

What does:

```text
x = x + 1
```

do to machine state?

Which memory location changes?

What value results?

Semantics connects syntax to behavior.

## Operational Semantics

One approach is **operational semantics**.

It defines meaning through execution steps.

A statement means, roughly, the state transitions it causes.

This is close to an interpreter or abstract machine.

## Denotational Semantics

**Denotational semantics** assigns mathematical objects to program constructs.

An expression may denote a function.

A command may denote a transformation of state.

Meaning becomes a mathematical mapping.

## Axiomatic Semantics

**Axiomatic semantics** describes program meaning through logical assertions.

Hoare logic uses forms such as:

\[
\{P\}\ C\ \{Q\}
\]

meaning:

if precondition \(P\) holds and command \(C\) executes correctly, then postcondition \(Q\) holds.

Semantics becomes reasoning about correctness.

## Same Syntax, Different Language

The symbol:

```text
+
```

may mean:

- integer addition,
- floating-point addition,
- string concatenation,
- overloaded custom operation.

The visible token is not enough.

Type and language context determine semantics.

## Undefined Behavior

Some languages leave certain operations without defined semantics.

A program may be syntactically valid yet have **undefined behavior**.

This is stronger than "wrong answer."

The language specification may place no requirements on the outcome.

## Type Systems

Types constrain meaning.

An expression may be legal only for certain operand types.

Type systems prevent classes of nonsensical operations.

They act as semantic guards.

## Static vs Dynamic Typing

In statically typed languages, many type constraints are checked before execution.

In dynamically typed languages, type decisions may occur at runtime.

Both approaches assign meaning through type information.

They differ in when constraints are enforced.

## Variables

A variable name is a symbol.

Its meaning depends on:

- scope,
- binding,
- environment.

The same name can refer to different storage locations in different scopes.

Formal languages contain context-sensitive interpretation.

## Scope

Consider:

```text
x = 10

def f():
    x = 3
```

The two occurrences of `x` may refer to different bindings.

The symbol is identical.

The environment changes its meaning.

## Binding

A **binding** connects a name to something:

- value,
- function,
- type,
- memory location.

Programming semantics depends heavily on binding structure.

## Functions

A function definition creates a mapping from inputs to outputs or effects.

Its syntax may be short.

Its semantics can involve:

- control flow,
- state,
- exceptions,
- side effects.

Meaning in programming is operationally rich.

## Side Effects

Not all expressions merely return values.

A command can:

- modify memory,
- write a file,
- send a message.

Semantics includes effects on the surrounding world.

Programming languages are languages of action.

## Programs Can Be Syntactically Correct but Wrong

Consider a sorting program that accidentally sorts descending instead of ascending.

The parser accepts it.

The program runs.

The result violates intention.

Syntactic validity is not correctness.

## Specification

Correctness requires a specification.

What was the program supposed to do?

Without a specification, "correct" is incomplete.

Programming meaning ultimately includes relation to intended behavior.

## Compiler

A compiler translates one formal representation into another.

Source code becomes:

- intermediate representation,
- machine code.

If the compiler is correct, semantics should be preserved.

Translation is not merely textual substitution.

## Semantic Preservation

A compiler optimization may completely change machine instructions while preserving observable behavior.

This resembles translation between representations.

Different syntax can carry equivalent semantics.

## Interpreter

An interpreter executes source or intermediate code directly.

It implements the language's operational meaning.

The same source language can have multiple interpreters.

They should agree on defined behavior.

## Programming Languages and Natural Languages

Programming languages are far less ambiguous.

Machines cannot routinely infer missing intention the way humans do.

Therefore programming languages push more structure into explicit syntax and formal semantics.

## Error Messages

A compiler can often detect syntax errors.

It may detect type errors.

It cannot always detect:

- wrong algorithm,
- misunderstood requirement,
- bad assumption.

Higher-level meaning remains a human problem.

## Formal Precision Has Limits

Even a perfectly defined programming language cannot guarantee a correct program.

The program may encode the wrong specification.

Formal language solves ambiguity in execution.

It does not solve ambiguity in human goals.

## The Next Question

Programming languages make symbol manipulation precise.

But human language evolved in biological organisms.

Are humans unique?

Other animals communicate richly.

Some learn symbols.

Some combine signals.

So the next question is:

**Can animals have language?**
