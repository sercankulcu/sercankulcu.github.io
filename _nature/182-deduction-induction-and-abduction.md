---
title: 'Deduction, Induction, and Abduction'
permalink: /nature/182-deduction-induction-and-abduction/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 182
tags:
   - deduction
   - induction
   - abduction
   - inference
   - reasoning
---

A detective sees wet pavement.

A scientist sees an unexpected measurement.

A mathematician begins from axioms.

All three reason.

But they may be using different kinds of inference.

Three major forms are:

- deduction,
- induction,
- abduction.

They answer different questions.

## Deduction

**Deduction** asks:

What must follow if these premises are true?

Example:

All copper conducts electricity.

This wire is copper.

Therefore this wire conducts electricity.

The conclusion is contained in the logical consequences of the premises.

## Deductive Guarantee

A valid deductive argument cannot have:

true premises

and

false conclusion.

Deduction is therefore truth-preserving.

It does not create empirical certainty about the premises.

It preserves certainty conditionally.

## Mathematics

Mathematical proof is the clearest deductive domain.

Start with:

- axioms,
- definitions,
- established theorems.

Apply valid inference rules.

Derive a conclusion.

The theorem follows from the formal system.

## Deduction in Science

Science also uses deduction.

A theory plus initial conditions produces predictions.

For example:

If the model is correct and the parameters have certain values, then the observed trajectory should lie within some range.

Deduction connects theory to testable consequences.

## Induction

**Induction** moves from observed cases toward broader claims.

Example:

This metal expanded when heated.

That metal expanded when heated.

Many tested metals expanded when heated.

Therefore metals generally expand when heated.

The conclusion goes beyond the observations.

## Induction Is Ampliative

Induction is **ampliative**.

It adds something not logically guaranteed by the premises.

This makes it powerful.

It also makes it fallible.

Future evidence can overturn the generalization.

## Prediction

Prediction is a common inductive form.

The sun has risen every observed morning.

Therefore it will rise tomorrow.

The inference is rational.

It is not deductively valid.

## Hume's Problem

David Hume asked what justifies induction.

Past regularity does not logically guarantee future regularity.

Any defense that says:

"induction worked before"

appears itself inductive.

This is the classic problem of induction.

## Statistical Induction

Modern induction often uses statistics.

A sample is observed.

We infer properties of a population.

The inference depends on assumptions about:

- sampling,
- distributions,
- independence.

Probability makes inductive support quantitative.

## Abduction

**Abduction** is often described as inference to the best explanation.

We observe evidence.

We ask:

What hypothesis would best explain it?

Example:

The lawn is wet.

The sky is cloudy.

A rain gauge contains water.

It probably rained.

## Abduction Is Not Deduction

From:

If it rained, the lawn would be wet.

The lawn is wet.

we cannot deductively conclude:

It rained.

Other causes exist.

Abduction selects among explanations rather than proving one.

## Medical Diagnosis

A patient has:

- fever,
- cough,
- fatigue.

A physician considers multiple hypotheses.

The goal is not merely to find any condition consistent with the symptoms.

It is to identify the best-supported explanation.

Diagnosis is abductive.

## Scientific Discovery

Science often advances abductively.

Anomalous observations suggest a new mechanism.

A theory is preferred because it explains:

- more evidence,
- with fewer assumptions,
- while making successful predictions.

Abduction helps generate and compare theories.

## The Same Wet Street

One event can illustrate all three forms.

### Deduction
If heavy rain occurred, the unprotected street would be wet.

Heavy rain occurred.

Therefore the street is wet.

### Induction
After many rainstorms, this street has usually been wet.

A similar storm is coming.

Therefore the street will probably become wet.

### Abduction
The street is wet.

Rain would explain this.

Rain is the best current explanation.

Therefore it probably rained.

Different inferential goals, same domain.

## Deduction Moves Downward

A rough metaphor:

general rule
→ particular consequence.

But deduction need not always move from general to particular.

A deductive argument can connect propositions in many directions.

Its defining feature is necessity, not direction.

## Induction Does Not Simply Mean Particular to General

Induction can also support:

- prediction,
- parameter estimation,
- causal inference.

The old formula "particular to general" is too narrow.

What matters is probabilistic extension beyond observed cases.

## Abduction Does Not Simply Mean Guessing

Abduction is constrained by evidence.

Good explanations are judged by criteria such as:

- fit,
- simplicity,
- coherence,
- predictive success.

It is not arbitrary imagination.

## Ockham's Razor

Simplicity often matters in abduction.

If two hypotheses explain the same data, the simpler one may be preferred.

This is related to Ockham's razor.

But "simpler" itself can be difficult to define.

## Bayesian Perspective

Bayesian reasoning can unify parts of induction and abduction.

A hypothesis receives a prior probability.

Evidence updates that probability.

Bayes' theorem gives:

\[
P(H \mid E)=\frac{P(E \mid H)P(H)}{P(E)}
\]

Explanatory fit and prior plausibility interact.

## Abduction and Bayes

A good explanation often makes the evidence probable.

Bayesian reasoning makes this explicit through:

\[
P(E \mid H)
\]

But high likelihood alone is not enough.

A hypothesis may also have a very low prior probability.

## Induction and Bayes

Repeated observations can update beliefs about:

- parameters,
- hypotheses,
- future events.

Bayesian updating provides one formal account of inductive learning.

It does not eliminate philosophical questions about priors and model choice.

## Machine Learning

Machine learning combines all three modes in practice.

Training data support inductive generalization.

Model structure encodes assumptions.

Inference produces predictions.

Error analysis may lead to abductive hypotheses about failure.

Computational reasoning mixes forms.

## Deduction Can Be Mechanized Well

Formal deduction is especially suitable for machines.

Proof assistants and theorem provers can follow explicit inference rules.

Induction and abduction are harder because they depend on:

- uncertainty,
- relevance,
- model selection.

## Abduction and Creativity

Generating explanations requires exploring possibilities.

This connects abduction to:

- creativity,
- scientific discovery,
- diagnosis.

The reasoning is constrained but open-ended.

## Induction and Uncertainty

Induction forces us to reason under incomplete knowledge.

Its conclusions can be justified without certainty.

This is one of the most important lessons of rational thought:

uncertainty does not imply irrationality.

## Deduction and Garbage In

A perfectly valid deduction from false premises produces no guarantee about reality.

Formal certainty cannot rescue bad inputs.

This is why evidence and logic must cooperate.

## Abduction Can Be Wrong Even When Elegant

A beautiful explanation may fail when new evidence appears.

History contains many elegant theories later rejected.

Explanatory power is evidence, not infallibility.

## The Three Work Together

Scientific reasoning often follows a cycle:

1. observations suggest a hypothesis through abduction,
2. the hypothesis yields predictions through deduction,
3. repeated evidence updates confidence inductively.

The methods reinforce one another.

## The Philosophical Lesson

Deduction preserves truth.

Induction extends knowledge under uncertainty.

Abduction searches for explanation.

No single mode replaces the others.

Reason is plural.

## The Next Question

To formalize reasoning, we need units smaller than full arguments.

Logic distinguishes:

- propositions,
- predicates,
- variables,
- modifiers.

The next essay begins building this vocabulary:

**propositions, predicates, qualifiers, and descriptors.**
