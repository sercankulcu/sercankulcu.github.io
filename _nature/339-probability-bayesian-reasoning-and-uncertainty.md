---
title: 'Probability, Bayesian Reasoning, and Uncertainty'
permalink: /nature/339-probability-bayesian-reasoning-and-uncertainty/
chapter: 18
chapter_title: 'Belief, Patterns, and Uncertainty'
order: 339
tags:
   - probability
   - bayesian-reasoning
   - uncertainty
   - statistics
   - epistemology
---

Most important questions are not answered with certainty.

Will it rain?

Is the treatment effective?

Is this hypothesis correct?

Probability gives us a language for reasoning when knowledge is incomplete.

## Probability as Degree of Uncertainty

A probability lies between:

\[
0 \leq P(A) \leq 1
\]

where:

- 0 means impossible under the model,
- 1 means certain under the model.

Values between represent uncertainty.

## Several Interpretations

What does probability mean?

Major interpretations include:

- frequentist,
- Bayesian,
- propensity-based.

They agree mathematically in many applications but differ philosophically.

## Frequentist Probability

A frequentist interprets probability through long-run frequencies.

For a fair coin:

about half of many flips should be heads.

Probability is tied to repeated trials.

## Bayesian Probability

A Bayesian interprets probability as rational degree of belief.

You can assign probabilities even to one-time events:

Will this candidate win?

Probability represents uncertainty.

## Propensity

A propensity interpretation treats probability as a physical tendency of a system.

A radioactive atom has a certain propensity to decay.

This is more ontological.

## Probability Rules

For any event \(A\):

\[
0 \leq P(A) \leq 1
\]

and:

\[
P(\neg A)=1-P(A)
\]

These simple rules constrain coherent beliefs.

## Addition Rule

For mutually exclusive events \(A\) and \(B\):

\[
P(A \cup B)=P(A)+P(B)
\]

If they can overlap:

\[
P(A \cup B)=P(A)+P(B)-P(A \cap B)
\]

## Conditional Probability

The probability of \(A\) given \(B\) is:

\[
P(A|B)=\frac{P(A \cap B)}{P(B)}
\]

provided:

\[
P(B)>0
\]

Conditional probability is central to evidence.

## Independence

Events \(A\) and \(B\) are independent when:

\[
P(A \cap B)=P(A)P(B)
\]

Equivalently:

\[
P(A|B)=P(A)
\]

Learning B does not change probability of A.

## Independence Is Often Assumed Too Easily

Medical symptoms,

economic variables,

social behaviors

often share hidden causes.

Treating correlated evidence as independent exaggerates confidence.

## Bayes' Theorem

Bayes' theorem follows from conditional probability:

\[
P(H|E)=\frac{P(E|H)P(H)}{P(E)}
\]

It tells us how evidence should update belief in hypothesis \(H\).

## Prior

\[
P(H)
\]

is the **prior probability**.

It represents belief before new evidence.

## Likelihood

\[
P(E|H)
\]

is the **likelihood** of observing evidence if the hypothesis is true.

## Posterior

\[
P(H|E)
\]

is the **posterior probability** after evidence is observed.

## Evidence Term

\[
P(E)
\]

normalizes probabilities across competing hypotheses.

In practice, hypothesis comparison often uses ratios.

## Odds Form

Bayesian updating becomes especially intuitive in odds form:

\[
\text{Posterior Odds}
=
\text{Prior Odds}
\times
\text{Likelihood Ratio}
\]

This separates prior belief from evidential strength.

## Likelihood Ratio

For hypotheses \(H_1\) and \(H_0\):

\[
LR=\frac{P(E|H_1)}{P(E|H_0)}
\]

If:

\[
LR=10
\]

the evidence is ten times more expected under \(H_1\) than \(H_0\).

## Evidence Is Comparative

Evidence does not support a hypothesis simply because:

the hypothesis predicts it.

We must ask:

Would alternatives predict it too?

This is one of Bayesian reasoning's deepest lessons.

## Medical Test Example

Suppose:

disease prevalence = 1%.

Test sensitivity = 99%.

Specificity = 95%.

A positive test feels alarming.

But what is:

\[
P(\text{disease}|\text{positive})?
\]

## Natural Frequencies

Imagine 10,000 people.

About:

100 have the disease.

Of those, 99 test positive.

Of 9,900 healthy people, 5% test positive:

495 false positives.

Total positives:

594.

True positives:

99.

Therefore:

\[
P(\text{disease}|\text{positive})
\approx
\frac{99}{594}
\approx
16.7\%
\]

## Base-Rate Neglect

Ignoring the 1% prior can make people think the answer is near:

99%.

This is **base-rate neglect**.

The test can be excellent and still yield many false positives when disease is rare.

## Prosecutor's Fallacy

Suppose DNA evidence would match a random innocent person with probability:

1 in a million.

It does not follow that:

probability defendant is innocent = 1 in a million.

That confuses:

\[
P(E|\text{innocent})
\]

with:

\[
P(\text{innocent}|E)
\]

## Transposed Conditional

This error is common.

In general:

\[
P(A|B) \neq P(B|A)
\]

Bayes' theorem tells us how to connect them.

## Rain Example

Suppose dark clouds occur:

90% of the time before rain.

That does not mean:

90% of dark-cloud days rain.

You also need:

how common rain is,
how common dark clouds are without rain.

## Priors Matter

People sometimes object:

"Bayesian reasoning is subjective because priors are subjective."

But ignoring priors does not remove them.

It hides them.

## Objective Priors?

Some methods use:

- reference priors,
- symmetry.

Others use empirical historical frequencies.

There is no universal prior rule.

Good analysis tests sensitivity to plausible priors.

## Prior Sensitivity

If conclusions change dramatically under small prior changes, evidence is weak.

If many reasonable priors converge to the same posterior, evidence is robust.

## Strong Evidence Overwhelms Priors

Repeated high-likelihood evidence can dominate initial disagreement.

Bayesian agents with different reasonable priors can converge.

This explains why replication matters.

## Dogmatic Priors

A prior of exactly:

0

can never update upward under ordinary Bayes.

If you assign literal impossibility too easily, no evidence can change your mind.

Epistemic humility avoids unnecessary zeros and ones.

## Cromwell's Rule

A principle associated with Dennis Lindley advises:

do not assign probability 0 or 1 to empirical claims unless logically forced.

Leave room to learn.

## Bayesian Confirmation

Evidence confirms H when:

\[
P(H|E)>P(H)
\]

A hypothesis can be confirmed without becoming probable overall.

This distinction is subtle.

## Example

Suppose prior probability is:

0.001.

Evidence multiplies odds by 10.

The hypothesis is strongly confirmed relative to before.

Yet posterior remains low.

## Confirmation vs Acceptance

"Evidence supports H" does not mean:

"H is probably true."

It may simply mean:

H became less unlikely.

## Sequential Updating

New evidence arrives over time.

Bayesian updating can be repeated:

prior → posterior → new prior.

Learning is iterative.

## Order Independence

For conditionally appropriate evidence, updating on all evidence yields the same final result regardless of order.

But human psychology often shows order effects.

## Correlated Evidence Again

If two reports copy the same source, multiplying them as independent likelihoods overcounts evidence.

Bayesian models must represent dependence.

## Bayesian Networks

A **Bayesian network** represents conditional dependencies among variables.

Nodes represent variables.

Directed edges encode dependencies.

This helps reason with complex causal structure.

## Example Network

Rain influences:

- wet grass,
- umbrellas.

Wet grass and umbrellas are correlated partly because of rain.

Conditioning on rain changes their relation.

## Common Cause

Two observations may appear to support each other.

But if both arise from one common source, their evidential independence is limited.

## Explaining Away

Suppose an alarm can be caused by:

- burglary,
- earthquake.

If the alarm sounds, burglary probability rises.

If you then learn there was an earthquake, burglary probability can fall.

This is **explaining away**.

## Bayes and Causation

Bayesian probability describes uncertainty.

Causal inference requires additional assumptions.

Correlation structure alone does not determine causal direction.

## Prediction vs Intervention

Ask:

\[
P(Y|X)
\]

What happens when X is observed?

Causal questions ask:

What happens if we **intervene** on X?

These are not always the same.

## Uncertainty Types

Not all uncertainty is alike.

We can distinguish:

- aleatoric uncertainty,
- epistemic uncertainty.

## Aleatoric Uncertainty

Aleatoric uncertainty comes from irreducible variability or randomness in the process.

Example:

a genuinely stochastic outcome.

More data may not remove it.

## Epistemic Uncertainty

Epistemic uncertainty comes from lack of knowledge.

More information can reduce it.

Example:

unknown parameter value.

## Model Uncertainty

A further uncertainty concerns whether:

the model itself

is appropriate.

This is often underestimated.

## Known Unknowns

We may know:

which parameter is uncertain.

This is manageable.

## Unknown Unknowns

We may fail to imagine:

relevant variables,
failure modes.

These are harder.

Robust planning must account for model surprise.

## Confidence Intervals

Frequentist confidence intervals quantify procedure-based uncertainty.

A 95% confidence interval is often misread as:

95% probability the fixed parameter lies here.

That is not the standard frequentist interpretation.

## Credible Intervals

A Bayesian credible interval can directly express:

posterior probability that a parameter lies in a range,

given the model and prior.

The philosophical interpretation differs.

## Forecast Calibration

If a forecaster assigns:

70%

to many events, about 70% should occur.

This is **calibration**.

## Sharpness

A forecast can be well calibrated but uninformative by always saying:

50%.

Good forecasting seeks both:

- calibration,
- sharpness.

## Brier Score

For binary outcomes, one scoring rule is:

\[
(\text{forecast probability}-\text{outcome})^2
\]

Lower average Brier score is better.

Scoring rules reward calibrated probabilistic belief.

## Log Score

Another proper scoring rule uses logarithmic loss.

It penalizes assigning tiny probability to events that occur.

Overconfidence becomes costly.

## Why Scoring Rules Matter

They make epistemic accuracy measurable.

Repeated feedback can train better judgment.

## Expected Value

Decision-making combines probabilities with outcomes.

Expected value:

\[
EV=\sum_i P_i V_i
\]

A low-probability high-impact event can matter greatly.

## Probability vs Value

Probability tells us:

what is likely.

Value tells us:

what matters.

Decision theory combines them.

## Expected Utility

When value is nonlinear, decision theory often uses utility:

\[
EU=\sum_i P_i U(x_i)
\]

This models risk preferences.

## Risk vs Uncertainty

Frank Knight distinguished:

- risk:
  known probabilities,
- uncertainty:
  probabilities themselves unclear.

Many real decisions involve the second.

## Deep Uncertainty

Climate policy,
AI risk,
geopolitics

can involve models with poorly known probabilities.

Exact numbers may create false precision.

## Probability Ranges

Sometimes it is more honest to provide:

- ranges,
- scenarios.

Quantification should not exceed evidence.

## Bayesian Humility

Bayesianism is not a machine for manufacturing precise numbers.

Poor priors and poor models produce poor posteriors.

The framework disciplines assumptions; it does not eliminate them.

## Reference Classes

When estimating probability, ask:

What happened in comparable cases?

Base rates can anchor forecasts.

This is often stronger than narrative intuition.

## Inside vs Outside View

The inside view examines detailed specifics.

The outside view uses reference classes.

Good forecasting combines both.

## Updating on Failure

A prediction that fails should reduce confidence.

How much?

That depends on how surprising failure was under the hypothesis.

## Falsification and Bayes

Popperian falsification and Bayesian updating are not enemies.

A severe failed prediction can produce a tiny likelihood and sharply reduce posterior belief.

## Scientific Theories

Science rarely assigns literal probabilities to every theory.

But Bayesian logic captures an ideal:

belief strength should shift with evidential performance.

## Extraordinary Evidence

Low-prior claims can become credible if evidence has enormous likelihood ratio.

Bayesian reasoning explains the logic behind:

extraordinary claims require extraordinary evidence.

## Conspiracy Example

A coincidence may be:

10 times more likely under conspiracy.

But if conspiracies of that specific kind have prior probability:

one in a million,

the posterior may still remain small.

Large priors differences matter.

## Diagnostic Evidence

Some evidence is highly diagnostic.

It sharply separates hypotheses.

Other evidence is compatible with almost everything.

Diagnosticity matters more than drama.

## Prediction Markets

Aggregating probabilistic beliefs can improve forecasts.

Markets incorporate:

- diverse information.

They also have limitations:

- liquidity,
- incentives,
- manipulation.

## Superforecasting

Research on forecasting tournaments suggests some people can improve through:

- decomposition,
- base rates,
- frequent updating,
- calibration.

Probabilistic thinking is trainable.

## Fermi Estimates

When exact data is unavailable, break a problem into components.

Estimate each.

Multiply.

This reveals which assumptions dominate uncertainty.

## Monte Carlo Thinking

For complex systems, sample many plausible parameter combinations.

Observe outcome distribution.

This is often more informative than one point estimate.

## Sensitivity Analysis

Ask:

Which assumptions change the conclusion most?

This identifies what new evidence would be most valuable.

## Value of Information

Information is valuable when it can change a decision.

A test may be scientifically interesting but decision-irrelevant.

Decision theory formalizes this.

## Probability and Language

Words like:

- likely,
- possible,
- almost certain

are interpreted differently by different people.

Numerical probabilities can improve clarity when appropriate.

## But Numbers Can Mislead

"67%" may imply more evidence than exists.

Precision should match knowledge.

Sometimes:

roughly two-thirds

is more honest.

## Uncertainty Communication

Good communication states:

- estimate,
- uncertainty,
- assumptions.

Hiding uncertainty undermines trust when predictions fail.

## Bayesian Reasoning and Belief

Belief need not be binary.

We can hold:

degrees of confidence

and update gradually.

This is psychologically and scientifically realistic.

## The Philosophical Lesson

Probability is a language for disciplined uncertainty.

Bayesian reasoning says:

start with prior beliefs,
compare how well hypotheses predict evidence,
update proportionally.

The goal is not certainty.

It is calibrated belief.

## The Next Question

Even with probability, real decisions remain difficult.

Sometimes:

- models conflict,
- evidence is sparse,
- stakes are high.

How should we reason when we genuinely do not know?

The next essay asks:

**How Should We Think When We Do Not Know?**
