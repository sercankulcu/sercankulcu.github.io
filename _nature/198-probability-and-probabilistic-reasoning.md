---
title: 'Probability and Probabilistic Reasoning'
permalink: /nature/198-probability-and-probabilistic-reasoning/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 198
tags:
   - probability
   - uncertainty
   - bayes
   - reasoning
   - statistics
---

Logic asks whether a conclusion follows.

Probability asks how uncertainty should be distributed.

Many real questions are not:

true or false?

They are:

how likely?

How confident?

How should new evidence change belief?

This is the domain of **probabilistic reasoning**.

## Probability

A probability assigns a number between:

\[
0
\]

and:

\[
1
\]

to an event.

A probability near 1 means highly likely.

A probability near 0 means highly unlikely.

Exactly what probability means is philosophically contested.

## Kolmogorov Axioms

Modern probability theory is commonly built from three axioms.

For an event \(A\):

\[
P(A) \geq 0
\]

The probability of the entire sample space is:

\[
P(\Omega)=1
\]

For mutually exclusive events:

\[
P(A \cup B)=P(A)+P(B)
\]

These simple rules generate a rich theory.

## Complement Rule

The probability that A does not occur is:

\[
P(\neg A)=1-P(A)
\]

If rain probability is 0.3, then no-rain probability is 0.7.

## Joint Probability

For two events A and B:

\[
P(A \land B)
\]

means:

the probability that both occur.

Joint probabilities capture interaction.

## Conditional Probability

The probability of A given B is:

\[
P(A \mid B)=\frac{P(A \land B)}{P(B)}
\]

when:

\[
P(B)>0
\]

Conditional probability is one of the foundations of rational updating.

## Independence

Events A and B are independent if:

\[
P(A \land B)=P(A)P(B)
\]

Equivalently, learning B does not change the probability of A.

Independence is an assumption that must be justified.

## Coin Tosses

For a fair coin:

\[
P(H)=\frac12
\]

Two independent heads:

\[
P(HH)=\frac12 \times \frac12=\frac14
\]

Simple examples build intuition.

Real systems are rarely so clean.

## Probability Is Not Possibility

An event can be possible but extremely unlikely.

Possibility asks:

Can it happen?

Probability asks:

How likely is it under a model?

These are different questions.

## Frequentist Interpretation

A **frequentist** interpretation connects probability to long-run frequencies.

A fair coin has probability 1/2 for heads because repeated tosses converge toward that frequency.

This works naturally for repeatable experiments.

## Bayesian Interpretation

A **Bayesian** interpretation treats probability as rational degree of belief.

Probability can apply to unique events:

- Will it rain tomorrow?
- Is this hypothesis correct?

Belief is updated as evidence arrives.

## Objective Chance

Another view treats some probabilities as physical features of the world.

Quantum mechanics is often discussed this way.

Then probability may describe genuine chance, not merely ignorance.

## Classical Ignorance

In classical mechanics, probability may instead reflect incomplete information.

The system may have a definite state.

We simply do not know it.

Probability can encode ignorance.

## Bayes' Theorem

Bayes' theorem is:

\[
P(H \mid E)=\frac{P(E \mid H)P(H)}{P(E)}
\]

It tells us how to update belief in hypothesis H after evidence E.

## Prior

\[
P(H)
\]

is the **prior probability**.

It represents belief before the new evidence.

Priors can encode:

- background knowledge,
- base rates.

Ignoring priors leads to common reasoning errors.

## Likelihood

\[
P(E \mid H)
\]

is the **likelihood**.

It asks:

If H were true, how expected would the evidence be?

Good hypotheses often make observed evidence likely.

## Posterior

\[
P(H \mid E)
\]

is the **posterior probability**.

It combines:

- prior plausibility,
- evidential fit.

Bayesian reasoning formalizes belief revision.

## Medical Testing

Suppose a disease affects:

1% of people.

A test is highly accurate.

A positive result does not automatically imply a 99% chance of disease.

Base rates matter.

Bayesian reasoning corrects this intuition.

## Base-Rate Neglect

People often focus on:

P(positive | disease)

and ignore:

P(disease).

This is **base-rate neglect**.

The inverse probability is not the same quantity.

## Prosecutor's Fallacy

A tiny probability of observing evidence if someone were innocent does not imply a tiny probability that they are innocent given the evidence.

Confusing:

\[
P(E \mid Innocent)
\]

with:

\[
P(Innocent \mid E)
\]

is a serious error.

## Monty Hall Again

The Monty Hall problem shows that probability depends on the information-generating process.

The host's behavior matters.

Conditional probability is not merely counting remaining doors.

## Birthday Paradox

In a group of only 23 people, the probability that at least two share a birthday exceeds 50%, under standard simplifying assumptions.

Why?

Because the number of pairs grows quickly.

Human intuition underestimates combinatorics.

## Expected Value

Probability supports decision-making through **expected value**.

If outcome \(i\) has value \(v_i\) and probability \(p_i\):

\[
E[V]=\sum_i p_i v_i
\]

This combines uncertainty and consequence.

## Expected Utility

Real decisions are not always linear in money or outcomes.

Decision theory often uses **utility** rather than raw value.

A person may care differently about:

- gaining $1000,
- losing $1000.

Expected utility models preference under uncertainty.

## Risk vs Uncertainty

Frank Knight distinguished roughly between:

- risk: probabilities are known,
- uncertainty: probabilities themselves are unclear.

Many real decisions involve the second.

Probability models still require judgment.

## Calibration

A probabilistic forecaster is **well calibrated** if events assigned 70% probability occur about 70% of the time across comparable cases.

Calibration measures reliability of confidence.

It is an important property of forecasting systems.

## Overconfidence

Humans are often overconfident.

We assign confidence ranges that are too narrow.

Probabilistic thinking encourages explicit uncertainty.

Knowing that we do not know becomes measurable.

## Brier Score

Forecast quality can be scored.

For binary events, the **Brier score** compares predicted probability with outcome.

This rewards:

- calibration,
- resolution.

Probabilities become accountable.

## Likelihood Ratios

Evidence can be measured by how much more likely it is under one hypothesis than another.

The **likelihood ratio** is:

\[
\frac{P(E \mid H_1)}{P(E \mid H_2)}
\]

This expresses evidential discrimination.

## Bayesian Updating as Odds

Bayes can also be written:

posterior odds

=

prior odds

× likelihood ratio.

This is often a useful way to see evidence accumulating.

## Probability and Induction

Inductive reasoning becomes clearer when represented probabilistically.

Instead of saying:

"this evidence supports H,"

we ask:

How much should it change \(P(H)\)?

Support becomes quantitative.

## Probability and Abduction

Inference to the best explanation often overlaps with Bayesian comparison.

A hypothesis that strongly predicts evidence gains support.

But simplicity and prior plausibility also matter.

## Correlation

Probability also formalizes correlation.

Two variables may co-vary.

This does not establish causation.

Probabilistic dependence and causal dependence are different.

## Causal Models

Modern causal inference adds structure beyond probability.

A causal model asks what would happen under intervention.

This distinguishes:

seeing X

from

doing X.

Probability alone is not a full theory of causation.

## Rare Events

Low probability does not mean impossible.

A one-in-a-million event can occur.

Given enough opportunities, rare events become expected.

This matters when interpreting coincidences.

## Law of Large Numbers

As independent observations accumulate, sample averages tend to approach expected values under suitable conditions.

This is the **law of large numbers**.

It explains why repeated trials stabilize frequencies.

## Central Limit Theorem

Under broad conditions, sums of many independent contributions tend toward a normal distribution after suitable scaling.

This is the **central limit theorem**.

It helps explain why bell-shaped patterns appear frequently.

## Probability Models Are Models

A probability is always relative to assumptions.

If assumptions change, probabilities change.

Questions include:

- independent?
- identically distributed?
- stationary?

Mathematical precision does not eliminate modeling judgment.

## Zero Probability Does Not Always Mean Impossible

In continuous distributions, individual exact values can have probability zero while still being possible.

For example, selecting a real number uniformly from an interval gives each exact point probability zero.

Probability zero and logical impossibility differ.

## One Does Not Always Mean Necessary

Similarly, probability 1 need not always mean logical necessity in measure-theoretic settings.

An event can occur almost surely without being true in every conceivable case.

Probability and modality remain distinct.

## Probabilistic Logic

Some formal systems combine logic with probability.

Instead of:

P is true,

we may reason:

P has probability at least 0.9.

This is useful for uncertain knowledge bases.

## Machine Learning

Modern machine learning is deeply probabilistic.

Models estimate:

- classes,
- sequences,
- latent variables.

Even deterministic neural networks often represent uncertainty through probabilistic objectives.

## The Philosophical Lesson

Probability gives rational structure to uncertainty.

It does not eliminate uncertainty.

It disciplines it.

Good probabilistic reasoning requires:

- correct conditioning,
- attention to base rates,
- explicit assumptions.

## The Next Question

Probability assigns numbers to uncertainty.

But some concepts are not merely uncertain.

They are graded.

An object may be:

somewhat tall,
very warm,
partly red.

This leads to a different formal idea:

**fuzzy logic and degrees of truth.**
