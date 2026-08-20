---
title: 'Lambda Calculus'
permalink: /nature/204-lambda-calculus/
chapter: 12
chapter_title: 'Formal Systems, Metalogic, and Gödel'
order: 204
tags:
   - lambda-calculus
   - computation
   - functions
   - church
   - formal-systems
---

A programming language can contain:

- variables,
- functions,
- conditions,
- data structures.

How much of this is really necessary?

Lambda calculus gives a startling answer.

A tiny formal system built almost entirely from:

- variables,
- function abstraction,
- function application

is powerful enough to express general computation.

## Alonzo Church

Lambda calculus was developed by **Alonzo Church** in the 1930s.

Church was studying:

- logic,
- functions,
- effective calculability.

The system became one of the foundations of theoretical computer science.

## The Core Syntax

The untyped lambda calculus has only three basic forms.

### Variable

\[
x
\]

### Abstraction

\[
\lambda x.M
\]

### Application

\[
M\,N
\]

That is essentially the whole language.

## Abstraction

The expression:

\[
\lambda x.M
\]

means:

a function of x whose body is M.

For example:

\[
\lambda x.x
\]

is the identity function.

It returns its argument unchanged.

## Application

If:

\[
F=\lambda x.x
\]

then:

\[
F\,a
\]

reduces to:

\[
a
\]

Function application performs computation.

## Beta Reduction

The main computational rule is **beta reduction**.

Example:

\[
(\lambda x.x)\,a
\]

reduces to:

\[
a
\]

More generally:

\[
(\lambda x.M)\,N
\]

reduces by replacing free occurrences of x in M with N.

## Substitution

Substitution sounds simple.

But variable binding creates subtle issues.

Careless replacement can accidentally change which variables are bound.

This is called **variable capture**.

## Alpha Conversion

Bound variable names are often irrelevant.

These expressions represent the same function:

\[
\lambda x.x
\]

and:

\[
\lambda y.y
\]

Renaming bound variables is **alpha conversion**.

The name is not the function.

## Free Variables

In:

\[
\lambda x.(x\,y)
\]

x is bound.

y is free.

The expression still depends on y from the surrounding context.

The free/bound distinction returns from predicate logic.

## Scope

The lambda binder has scope.

In:

\[
\lambda x.M
\]

the variable x is bound within M.

Programming-language scope inherits this idea.

## Functions as First-Class Objects

Lambda calculus treats functions as values.

A function can:

- receive another function,
- return a function.

This is **higher-order** computation.

## Higher-Order Functions

Consider a function that takes a function f and applies it twice:

\[
\lambda f.\lambda x.f(f(x))
\]

Functions become manipulable objects.

This idea is central to functional programming.

## Currying

A function of two arguments can be represented as a function returning another function.

Instead of:

\[
f(x,y)
\]

we can write:

\[
f(x)(y)
\]

This technique is called **currying**, after Haskell Curry.

## Church Numerals

Lambda calculus can represent natural numbers using functions.

For example:

Zero:

\[
\lambda f.\lambda x.x
\]

One:

\[
\lambda f.\lambda x.f(x)
\]

Two:

\[
\lambda f.\lambda x.f(f(x))
\]

A number becomes repeated function application.

## Arithmetic from Functions

Once numbers are encoded as Church numerals, lambda terms can implement:

- successor,
- addition,
- multiplication.

Arithmetic emerges from pure function manipulation.

## Booleans

Even truth values can be encoded.

For example:

True:

\[
\lambda x.\lambda y.x
\]

False:

\[
\lambda x.\lambda y.y
\]

A Boolean becomes a function choosing one of two arguments.

## Conditionals

Using those encodings, an if-then-else structure can be represented.

True selects the first branch.

False selects the second.

Control flow emerges from function application.

## Data Structures

Pairs and lists can also be encoded with functions.

The calculus contains no primitive pair object.

Yet functional behavior can represent one.

This demonstrates the power of abstraction.

## Recursion Without Named Recursion

Pure lambda calculus has no primitive "recursive function" keyword.

Yet recursion can be expressed using fixed-point combinators.

The most famous is the **Y combinator**.

## Fixed Points

A fixed-point combinator constructs a value satisfying:

\[
F(X)=X
\]

This connects lambda calculus to the self-reference themes we encountered earlier.

Recursion arises from self-application.

## Y Combinator

The Y combinator allows a function to refer effectively to itself without naming itself directly.

This is one of the clearest formal examples of productive self-reference.

Self-application creates recursion.

## Self-Application

Consider:

\[
x\,x
\]

A function is applied to itself.

This looks simple.

Self-application is powerful enough to produce:

- recursion,
- nontermination,
- paradox-like structures.

The same pattern appeared in logic.

## Omega

A famous nonterminating term is built from self-application.

Let:

\[
\omega=\lambda x.x\,x
\]

Then:

\[
\omega\,\omega
\]

reduces to itself forever.

Computation can diverge.

## Normal Forms

A lambda term is in **normal form** if no beta reduction remains.

Some terms reach normal form.

Some do not.

This foreshadows the halting problem.

## Evaluation Strategies

Different strategies choose reductions in different orders.

Examples:

- normal order,
- applicative order.

The final result can depend on whether evaluation terminates.

Programming languages embody similar choices.

## Call by Value

In **call-by-value**, arguments are evaluated before function application.

Many mainstream programming languages use variants of this strategy.

## Call by Name

In **call-by-name**, argument expressions are substituted without first being fully evaluated.

This can avoid unnecessary computation.

Lazy evaluation grows from related ideas.

## Confluence

Lambda calculus has a remarkable property associated with the **Church–Rosser theorem**.

If a term can reduce to a normal form, different valid reduction paths will not produce conflicting normal forms.

Computation has structural coherence.

## Typed Lambda Calculus

The untyped lambda calculus allows unrestricted self-application.

Typed lambda calculi restrict which functions can apply to which arguments.

Types prevent certain nonsensical or paradoxical constructions.

## Simply Typed Lambda Calculus

In simply typed lambda calculus, terms receive types such as:

\[
A \rightarrow B
\]

meaning:

a function from A to B.

Typing creates stronger guarantees.

## Types and Logic

A profound connection called the **Curry–Howard correspondence** links:

- propositions,
- types,
- proofs,
- programs.

Very roughly:

propositions are types,

proofs are programs.

This unifies logic and computation.

## Functional Programming

Languages such as:

- Haskell,
- Lisp,
- Scheme,
- ML

draw heavily from lambda-calculus ideas.

Anonymous functions in modern languages are called **lambdas** for this reason.

## Anonymous Functions

A modern expression like:

```text
x => x + 1
```

or:

```text
lambda x: x + 1
```

is a direct descendant of Church's notation.

The formal system entered everyday programming.

## Church–Turing Thesis

Lambda calculus turned out to define the same broad class of computable functions as Turing machines.

This convergence supported the **Church–Turing thesis**:

all effectively calculable functions are computable by these equivalent formal models.

The thesis is not a mathematical theorem about an independently formalized notion of "effective."

It is a foundational identification.

## Equivalent Models

Other computational models include:

- Turing machines,
- recursive functions,
- register machines.

Despite very different appearances, they capture the same class of computable functions.

This is one of computer science's deepest discoveries.

## Minimalism

Lambda calculus teaches a striking lesson.

Complex computation does not require a complex primitive language.

A tiny set of operations can generate enormous expressive power.

Finite rules, infinite behavior.

## The Philosophical Lesson

Lambda calculus reduces computation to function abstraction and application.

It shows that:

- substitution,
- binding,
- self-application

are enough to build rich computational worlds.

The border between logic and computation becomes thin.

## The Next Question

Formal systems need domains in which their symbols can operate.

One of the most foundational is the theory of collections.

How can mathematics be built from:

- membership,
- sets,
- empty set?

The next topic is:

**set theory.**
