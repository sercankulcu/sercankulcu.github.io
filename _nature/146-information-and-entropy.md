---
title: 'Information and Entropy'
permalink: /nature/146-information-and-entropy/
chapter: 8
chapter_title: 'Information and Representation'
order: 146
tags:
   - entropy
   - information
   - thermodynamics
   - shannon
   - statistical-mechanics
---

The word **entropy** appears in two major scientific contexts.

Thermodynamics uses entropy to describe physical systems.

Information theory uses entropy to describe uncertainty in probability distributions.

The equations look strikingly similar.

But similarity does not mean identity.

To understand the connection, we must keep the levels separate.

## Thermodynamic Entropy

In thermodynamics, entropy is a state function.

It is related to:

- heat transfer,
- irreversibility,
- accessible microstates.

For a reversible heat transfer:

\[
dS=rac{\delta Q_{	ext{rev}}}{T}
\]

This is a physical quantity with units.

## Statistical Entropy

Boltzmann connected thermodynamic entropy to microscopic possibilities.

His famous relation is:

\[
S=k_B\ln \Omega
\]

where:

- \(k_B\) is Boltzmann's constant,
- \(\Omega\) is the number of compatible microstates.

More compatible microstates mean greater entropy.

## Shannon Entropy

Shannon entropy is:

\[
H=-\sum_i p_i\log p_i
\]

It measures uncertainty in a probability distribution.

The mathematical form resembles statistical-mechanical entropy.

This is not accidental.

Both involve distributions over possibilities.

## Microstates and Macrostates

A **macrostate** might specify:

- pressure,
- volume,
- temperature.

Many microscopic arrangements can realize the same macrostate.

Entropy reflects how many microstates are compatible with the macroscopic description.

More hidden possibilities mean greater uncertainty about microscopic detail.

## Coin Analogy

Suppose many coins lie on a table.

One macro-description might be:

about half heads, half tails.

Many micro-configurations satisfy that description.

Another macrostate:

all heads.

Only one micro-configuration satisfies it.

The first is combinatorially more probable.

## Disorder Is an Imperfect Metaphor

Entropy is often described as "disorder."

This can help intuition.

But it can mislead.

Entropy is more precisely related to:

- multiplicity,
- probability,
- missing microscopic information.

A highly symmetric state is not always simply "more disordered."

## Entropy and Missing Information

From one perspective, thermodynamic entropy reflects how much microscopic detail is unspecified by the macrostate.

This creates a conceptual bridge to information theory.

But the bridge depends on physical modeling.

Thermodynamic entropy is not merely subjective ignorance.

## Gibbs Entropy

Statistical mechanics uses expressions such as:

\[
S=-k_B\sum_i p_i\ln p_i
\]

This is mathematically Shannon-like.

The factor \(k_B\) gives physical units.

The same probability structure appears in both fields.

## Why Similar Equations Appear

Both theories ask about distributions over alternatives.

Information theory:

Which message occurred?

Statistical mechanics:

Which microstate occurred?

Uncertainty over possibilities leads naturally to logarithmic measures.

## Second Law

The second law of thermodynamics says that entropy of an isolated system does not spontaneously decrease in ordinary macroscopic evolution.

This gives time a statistical arrow.

Low-entropy states evolve toward overwhelmingly more numerous high-entropy macrostates.

## Information Loss?

Does rising entropy mean information is literally destroyed?

Not necessarily.

Microscopic dynamics may preserve information in fine correlations.

What is lost is practical access to detailed structure.

Coarse-grained descriptions become less informative.

## Mixing

Imagine cream spreading through coffee.

Initially:

cream and coffee are separated.

Later:

they are mixed.

The mixed state corresponds to many more microscopic arrangements.

Macroscopic entropy increases.

## Reversibility Puzzle

Many microscopic laws are approximately time-reversible.

Yet macroscopic processes are irreversible.

This creates the famous arrow-of-time problem.

Statistical mechanics explains much of the asymmetry through boundary conditions and overwhelming combinatorial probability.

## Maxwell's Demon

James Clerk Maxwell imagined a tiny demon that sorts fast and slow molecules.

The demon appears able to reduce entropy without work.

This thought experiment connects information to thermodynamics.

The demon must measure and store information.

## Szilard Engine

Leo Szilard analyzed a related one-particle engine.

Knowing which side of a box contains a molecule can, in principle, be used to extract work.

Information appears to have thermodynamic value.

This deepened the information-physics connection.

## Landauer's Principle

Rolf Landauer argued that logically irreversible erasure of one bit has a minimum thermodynamic cost under suitable conditions:

\[
k_B T\ln 2
\]

of heat dissipated per erased bit in the ideal limit.

This does not mean every bit operation costs exactly this amount.

It sets a theoretical lower bound for erasure.

## Erasure Matters

Why erasure?

Because mapping multiple logical states into one destroys logical distinguishability.

For example:

0 → 0

1 → 0.

The operation is logically irreversible.

The physical implementation must eventually dump entropy somewhere.

## Reversible Computing

Some logical operations can, in principle, be performed reversibly.

Reversible computation attempts to reduce dissipation by avoiding unnecessary information erasure.

This shows that computation and thermodynamics are linked through physical implementation.

## Information Is Not Free

Abstract information can be copied or manipulated mathematically.

Physical information processing requires:

- matter,
- energy,
- time.

Storage and computation occur in physical devices.

Information theory meets thermodynamics at implementation.

## Entropy and Compression

High Shannon entropy means a source is less compressible on average.

High thermodynamic entropy means a macrostate corresponds to many microstates.

The analogy is deep but context-specific.

One should not casually substitute one entropy for the other.

## Black Holes

Black-hole physics introduces another profound connection.

Black holes possess entropy proportional to horizon area.

This links:

- gravity,
- thermodynamics,
- quantum theory,
- information.

The subject suggests that information may be deeply woven into physical law.

## The Information Paradox

Hawking radiation raised the question:

Can information about matter falling into a black hole be lost?

Modern work strongly suggests unitarity and information preservation remain central constraints.

The exact resolution depends on quantum gravity.

Information becomes a physical consistency condition.

## Entropy and Knowledge

Does entropy depend on what an observer knows?

Some formulations emphasize coarse-graining and description.

Others emphasize objective physical ensembles or microstate counts.

The philosophical interpretation is subtle.

Entropy has both epistemic-looking and physical aspects.

## The Arrow of Time

Entropy increase helps distinguish past from future.

Broken eggs do not spontaneously reassemble.

Heat flows from hot to cold.

The thermodynamic arrow is tied to the universe's remarkably low-entropy past.

Why the early universe had such low entropy remains a deep question.

## The Next Question

If bits must be stored physically, erasure has thermodynamic cost, and black-hole physics treats information as a fundamental constraint, perhaps information is itself physical.

But what exactly would that mean?

Is information a substance?

A property?

A relation?

The next question is:

**Is information physical?**
