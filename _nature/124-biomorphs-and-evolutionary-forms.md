---
title: 'Biomorphs and Evolutionary Forms'
permalink: /nature/124-biomorphs-and-evolutionary-forms/
chapter: 7
chapter_title: 'Chaos, Fractals, and Recursion'
order: 124
tags:
   - biomorphs
   - evolution
   - genotype
   - phenotype
   - artificial-selection
---

How can a small genetic description generate a large variety of forms?

Richard Dawkins explored this question with simple computer-generated creatures he called **biomorphs**.

The biomorphs were not simulations of real organisms.

They were conceptual models.

A compact set of numerical "genes" controlled the rules used to draw branching figures.

Small genetic changes produced visible changes in form.

The experiment made evolution into something you could watch on a screen.

## From Genes to Shapes

A biomorph begins with a small genotype.

In one well-known version, nine numerical genes influence features such as:

- branch length,
- angle,
- recursion depth,
- directional bias.

The computer interprets these values through a developmental drawing rule.

The result is the **phenotype**:

the visible biomorph.

## Genotype and Phenotype

The distinction is central to biology.

### Genotype
The inherited information.

### Phenotype
The resulting observable form or behavior.

The relationship between them is not simply one gene = one feature.

Genes interact through development.

Biomorphs simplify this relationship, but they make the principle visible.

## Developmental Mapping

A genotype does not directly contain a picture.

It specifies parameters used by a generative process.

The program grows the phenotype.

This resembles the lesson from L-systems:

complex form can be produced by a compact developmental rule.

The phenotype is generated, not stored pixel by pixel.

## Mutation

Create an offspring biomorph by changing one gene slightly.

Perhaps:

- increase an angle,
- lengthen a branch,
- deepen recursion.

The new phenotype resembles its parent but differs.

This is a simplified form of **mutation**.

## Variation

A population needs variation for evolution.

If every offspring were identical, selection would have nothing to choose among.

Biomorphs generate variation through small changes in genotype.

The resulting visual space can become surprisingly diverse.

## Artificial Selection

Dawkins often let the human user choose which biomorph should reproduce.

This is **artificial selection**.

The user acts like a breeder.

Choose one form.

Generate mutated descendants.

Choose again.

Repeat.

Over many generations, forms can move far from the starting point.

## Cumulative Selection

The key is **cumulative selection**.

A complex form does not appear in one random leap.

Small changes are preserved when selected.

Each generation starts from the previous one.

Variation accumulates.

This is the same broad logic that makes biological evolution powerful.

## Random Variation, Nonrandom Selection

A crucial distinction:

mutation can be random with respect to future usefulness.

Selection is not random in the same sense.

Some variants reproduce more.

Others disappear.

Evolution combines stochastic variation with systematic differential survival.

## Search Space

Every possible combination of gene values defines a point in a **genotype space**.

Each genotype maps to a phenotype.

Evolution moves through this space.

The total number of possible forms can be enormous even when the number of genes is small.

## Neighboring Forms

Mutations often move to nearby points in genotype space.

This means evolution usually explores locally.

It does not jump randomly to every imaginable organism.

The topology of the search space matters.

Some forms are accessible through gradual paths.

Others may not be.

## Fitness Landscapes

Evolutionary theory often uses the metaphor of a **fitness landscape**.

Genotypes occupy locations.

Height represents reproductive success.

Evolution tends to move populations toward locally successful regions.

The landscape may contain:

- peaks,
- valleys,
- ridges.

Biomorph selection creates a visually intuitive version of this idea.

## Local Optima

Selection does not guarantee a global optimum.

A population can become trapped near a local peak.

Reaching a better peak may require crossing a region of lower fitness.

This is one reason evolution produces good-enough solutions rather than perfect designs.

## Human Choice Is Not Natural Selection

Biomorph experiments often use a human selector.

Real natural selection has no human choosing desired forms.

The environment filters reproduction through:

- survival,
- mating,
- resource competition,
- ecological interaction.

The biomorph interface is pedagogical.

It should not be mistaken for a literal model of nature.

## Selection Creates Direction Without Foresight

A human breeder may have a goal.

Natural selection does not.

Yet natural selection can still produce directional adaptation because variants differ in reproductive success.

The future is not planned.

The past is filtered.

## Development Constrains Evolution

Not every imaginable form is reachable.

The developmental program allows some changes and blocks others.

This is important biologically.

Evolution works with available developmental pathways.

Variation is structured.

It is not an unrestricted generator of arbitrary forms.

## Gene Interactions

A small mutation can have large effects if genes interact.

One parameter may influence several branches.

Changing recursion depth may alter the entire figure.

This resembles **pleiotropy** in biology, where one genetic change can affect multiple traits.

## Neutral Mutations

Some genotype changes may produce little visible difference.

These can be thought of as simplified analogues of **neutral mutations**.

A population can move through genotype space without obvious phenotypic change.

Neutral variation can matter later.

## Robustness

Some phenotypes are robust.

Small genetic changes leave the form mostly intact.

Others are fragile.

Tiny changes alter structure dramatically.

The geometry of genotype–phenotype mapping influences evolvability.

## Evolvability

**Evolvability** is the capacity of a system to generate heritable, viable variation.

A developmental architecture that produces useful variation can evolve more effectively than one where almost every mutation is catastrophic.

Biomorphs hint at this deeper idea.

## Combinatorial Explosion

Nine genes may sound small.

But if each can take many values, the number of combinations grows rapidly.

This is a combinatorial explosion.

Evolution cannot test every possibility.

It explores through local mutation, recombination, and selection.

## Evolution as Search

It is tempting to describe evolution as a search algorithm.

This analogy is useful.

Evolution explores a large space of possible forms.

But biological evolution differs from engineered optimization.

It has:

- changing environments,
- multiple objectives,
- historical constraints,
- no fixed final target.

The "search" is open-ended.

## Dawkins's Point

The philosophical lesson of biomorphs is not that biological organisms are simple computer drawings.

It is that cumulative variation and selection can generate surprising complexity from simple generative rules.

Complex form does not need to appear all at once.

History can build it.

## From Biomorphs to Artificial Life

Biomorphs helped popularize a larger family of ideas:

- evolutionary computation,
- genetic algorithms,
- artificial life.

Computer populations can mutate and compete.

Selection can solve engineering problems or create novel forms.

Evolution becomes a computational principle.

## Genotype as Program

A biomorph genotype resembles a small program.

The phenotype is the program's output.

This analogy becomes powerful in biology.

DNA does not simply describe an organism.

It participates in a developmental system that generates one.

Genetic information is executable only within cellular context.

## Phenotype as Process

The phenotype is also not merely a final static object.

Real organisms develop, act, and interact.

Their phenotypes unfold over time.

A better analogy is:

genotype + environment + development → phenotype.

Biomorphs simplify this equation.

## Selection and Creativity

Biomorph evolution can produce forms the programmer did not explicitly design.

The programmer designed the rules.

The search process discovered particular outcomes.

This raises a recurring question:

When a generative system produces something unexpected, where does creativity reside?

Later, artificial intelligence will make this question central.

## Simple Rules, Evolutionary Diversity

Biomorphs extend the theme of the previous essays.

L-systems:

simple rules generate branching forms.

Mandelbrot iteration:

simple equation generates infinite detail.

Biomorphs:

simple genotype plus mutation and selection generates a landscape of possible organisms.

Iteration is joined by selection.

## The Next Question

All these systems depend on one structural idea.

A rule acts on the result of its own previous application.

A branch contains smaller branches.

A definition refers to simpler versions of itself.

This is **recursion**.

The next question is:

**What is recursion?**
