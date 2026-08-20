---
title: 'L-Systems: How Rules Grow Forms'
permalink: /nature/121-l-systems-how-rules-grow-forms/
chapter: 7
chapter_title: 'Chaos, Fractals, and Recursion'
order: 121
tags:
   - l-systems
   - recursion
   - growth
   - formal-grammars
   - fractals
---

A tree does not grow by drawing itself from the outside.

It grows by applying local rules repeatedly.

Branches extend.

New branches form.

Patterns propagate through development.

This idea inspired a mathematical framework called an **L-system**, short for **Lindenmayer system**.

L-systems show how symbolic rewriting rules can generate complex forms.

They connect:

- recursion,
- formal language,
- biology,
- computer graphics.

## Aristid Lindenmayer

Aristid Lindenmayer introduced L-systems in the 1960s while studying the growth of simple organisms.

His goal was biological.

He wanted to model development through repeated local transformations.

Later, the framework became famous for generating plant-like geometry.

## Symbols Before Shapes

An L-system begins with symbols.

For example:

\[
A,\ B,\ +,\ -
\]

At first, these symbols need not mean anything spatial.

They belong to a formal language.

The system evolves by rewriting them according to rules.

## The Axiom

An L-system starts with an initial string called the **axiom**.

For example:

\[
A
\]

This is generation zero.

The axiom acts like the seed of the construction.

## Production Rules

A production rule tells us how each symbol changes.

For example:

\[
A ightarrow AB
\]

\[
B ightarrow A
\]

Starting from \(A\):

Generation 0:

\[
A
\]

Generation 1:

\[
AB
\]

Generation 2:

\[
ABA
\]

Generation 3:

\[
ABAAB
\]

A complex string grows through repeated rewriting.

## Parallel Rewriting

One defining feature of classical L-systems is **parallel rewriting**.

Every applicable symbol is replaced simultaneously in each generation.

This differs from many ordinary formal grammars, where one production may be applied at a time.

Parallelism makes L-systems natural models of growth.

Many parts of an organism develop at once.

## From Strings to Drawings

How does a string become a plant-like picture?

We interpret symbols as drawing instructions.

A common system uses **turtle graphics**.

For example:

- \(F\): move forward and draw,
- \(+\): turn right,
- \(-\): turn left.

Now a symbolic string becomes geometry.

## Branching

Special symbols can represent branching.

A common convention uses:

- \([ \): save current position and direction,
- \(] \): return to saved state.

This allows one string to describe a branching tree.

The grammar becomes a growth program.

## A Simple Plant Rule

Suppose the rule is:

\[
F ightarrow F[+F]F[-F]F
\]

Start with:

\[
F
\]

After one iteration, one branch becomes several.

Repeat the rewriting.

The pattern becomes increasingly tree-like.

The final image is not stored explicitly.

It grows from the rule.

## Generative Geometry

This is different from drawing an image point by point.

An L-system describes **how to generate the form**.

The description is procedural.

It encodes development.

This is why L-systems are more than decorative fractal tools.

They are models of form-producing processes.

## Recursion

L-systems are deeply recursive.

A branch produces smaller branch structures.

Those structures produce more.

The same rule acts on the results of previous applications.

Finite rules create indefinitely extensible form.

This is one of the central themes of the Nature project.

## Exact vs Biological Growth

A mathematical L-system can produce exact repeated structure.

Real plants do not grow with perfect repetition.

Biological development depends on:

- light,
- gravity,
- nutrients,
- hormones,
- damage,
- competition.

So deterministic L-systems are idealizations.

## Stochastic L-Systems

To model variation, rules can be probabilistic.

Instead of one fixed replacement, a symbol may have several possible productions.

For example:

\[
F ightarrow F[+F]F
\]

or

\[
F ightarrow F[-F]F
\]

chosen with certain probabilities.

This generates more natural variation.

## Context-Sensitive L-Systems

Some systems let a symbol's rewriting depend on neighboring symbols.

This creates **context-sensitive** development.

Now local environment matters.

The same cell-like unit can behave differently depending on surrounding state.

This is closer to biological regulation.

## Parametric L-Systems

Symbols can also carry parameters.

A branch may have:

- length,
- age,
- thickness.

Rules can modify these values mathematically.

This allows continuous growth and more realistic geometry.

## Growth as Computation

An L-system can be viewed as a computer.

Input:

an initial symbolic state.

Program:

rewriting rules.

Output:

an evolving structure.

The system computes form through iteration.

This connects biological development with computation.

## Development Is Not a Blueprint

The L-system perspective challenges a simplistic idea of genes as blueprints.

A blueprint explicitly specifies final geometry.

Developmental rules do something different.

They generate structure through interaction and growth.

Biology often works more like a program than a static drawing.

Even that analogy has limits.

## DNA and Rules

DNA contains sequences that influence:

- proteins,
- regulation,
- development.

But DNA alone does not encode a literal geometric picture of the organism.

Form emerges through networks of rules interacting with cellular context.

L-systems provide a conceptual bridge to this idea.

## Morphogenesis

Morphogenesis asks how biological shape develops.

L-systems model one family of mechanisms:

growth through repeated local rules.

Other mechanisms include:

- chemical gradients,
- mechanical forces,
- cell migration,
- reaction-diffusion.

No single formalism explains all development.

## Plant Architecture

L-systems have been used to model:

- stems,
- leaves,
- branching,
- flowers.

Computer graphics adopted them because a short grammar can produce convincing organic forms.

A small rule set can generate enormous visual complexity.

## Formal Grammar Connection

L-systems are grammars.

This creates an important conceptual link.

The same basic idea appears in:

- language,
- programming,
- mathematics,
- biological growth.

Symbols are transformed by rules.

Structure emerges from syntax.

Later, Nature will return to formal languages in detail.

## Picture Grammars

More generally, **picture grammars** describe images through symbolic rules.

Instead of storing every pixel, they describe how components relate and transform.

This is another form of generative representation.

Images can have syntax.

## Rule vs Result

A rule can be tiny.

Its result can be enormous.

This is one of the deepest lessons of recursive systems.

Description length and output complexity are not the same thing.

A short grammar can generate a forest of structure.

## Natural Forms Are Historical

The form produced after ten iterations depends on all earlier rewriting.

Growth has memory through state.

The final shape is a record of recursive history.

This parallels:

- evolution,
- river growth,
- branching networks.

Form is process made visible.

## Deterministic and Random Growth

Real growth combines:

- deterministic constraints,
- environmental variation,
- stochastic events.

L-systems can model both.

The important point is not whether the rules are perfectly deterministic.

It is that local generative rules can create global form.

## Why L-Systems Matter

L-systems reveal a general principle:

**Complex structure can be generated through repeated symbolic transformations rather than explicitly specified detail.**

This principle connects:

- biology,
- computation,
- recursion,
- representation.

## The Next Question

L-systems generate branching form through rewriting.

The next object generates complexity through repeated arithmetic.

One equation.

One complex number.

One question:

Does the sequence remain bounded?

From that simple test emerges one of mathematics' most famous objects.

**The Mandelbrot set.**
