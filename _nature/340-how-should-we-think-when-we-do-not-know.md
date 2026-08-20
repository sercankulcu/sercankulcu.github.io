---
title: 'How Should We Think When We Do Not Know?'
permalink: /nature/340-how-should-we-think-when-we-do-not-know/
chapter: 18
chapter_title: 'Belief, Patterns, and Uncertainty'
order: 340
tags:
   - uncertainty
   - decision-making
   - epistemology
   - risk
   - reasoning
---

Sometimes uncertainty is not a temporary inconvenience.

We genuinely do not know:

- which model is right,
- which probability is correct,
- which future will occur.

What should a rational agent do then?

The answer is not:

pretend to know.

It is to reason well **under uncertainty**.

## Admit the State

The first step is epistemic honesty.

Say:

- what is known,
- what is uncertain,
- what is assumed.

Uncertainty hidden behind confidence is more dangerous than uncertainty stated openly.

## Unknown Does Not Mean Unknowable

Some questions are unknown because:

- data are missing,
- measurement is difficult.

Others may be unknowable in principle.

Do not confuse temporary ignorance with fundamental limits.

## Degrees of Ignorance

There are several forms:

- known probabilities,
- uncertain probabilities,
- unknown variables,
- unknown model structure.

Not all uncertainty is the same.

## Risk

Under **risk**, probabilities are reasonably known.

Example:

a fair die.

Decision theory handles this well.

## Knightian Uncertainty

Frank Knight distinguished risk from deeper **uncertainty** where probabilities themselves are unclear.

Many real-world decisions have this form.

## Deep Uncertainty

Climate policy,
pandemic response,
AI governance

can involve disagreement about:

- models,
- probabilities,
- values.

A single expected-value calculation may be too fragile.

## Scenario Thinking

When precise probabilities are unreliable, build multiple plausible scenarios.

Ask:

What happens if:

- optimistic case,
- central case,
- adverse case?

This broadens reasoning.

## Scenario ≠ Prediction

A scenario is not:

what will happen.

It is:

what could happen under a coherent set of assumptions.

Its purpose is preparation.

## Robust Decisions

A **robust** decision performs reasonably well across many plausible futures.

It may not be optimal in any one scenario.

It avoids catastrophic failure across several.

## Optimization vs Robustness

Optimization asks:

What is best if model M is correct?

Robustness asks:

What is acceptable if M might be wrong?

Under deep uncertainty, robustness can dominate precision.

## Minimax

A cautious strategy is **minimax**:

choose the option whose worst outcome is least bad.

This can be overly conservative.

But it is useful when downside is catastrophic.

## Minimax Regret

Another criterion minimizes maximum **regret**.

Regret compares your chosen outcome with what would have been best in hindsight.

This can balance optimism and caution.

## Expected Utility

When probabilities are credible, expected utility remains powerful:

\[
EU(a)=\sum_i P(s_i)U(a,s_i)
\]

But the quality of the decision depends on:

- probability model,
- utility assumptions.

## Model Uncertainty

If several models are plausible, average over them or test decisions across them.

Do not hide model disagreement inside one number.

## Sensitivity Analysis

Change important assumptions.

Does the conclusion survive?

If yes, it is robust.

If no, identify which assumption matters most.

## Tornado Diagram

In applied decision analysis, sensitivity plots can show which variables dominate outcome uncertainty.

The conceptual lesson is simple:

find the levers.

## Value of Information

Sometimes the best action is:

learn more first.

The **value of information** asks how much better decisions could become if uncertainty were reduced.

## Perfect Information

The expected value of perfect information is the gain you would obtain if the true state were revealed before acting.

This creates an upper bound on what additional research is worth.

## Partial Information

Often one experiment reduces only one uncertainty.

Its value depends on whether the result could change the decision.

## Decision-Relevant Research

Not all interesting information is useful.

Ask:

Would this evidence alter what I do?

If not, the measurement may have low decision value.

## Explore vs Exploit

Agents face an **exploration–exploitation tradeoff**.

Exploit:

use the best-known option.

Explore:

gather information that may improve future choices.

## Multi-Armed Bandit Connection

Earlier we saw this in reinforcement learning.

The same logic applies to:

- careers,
- treatments,
- research.

Learning itself has value.

## Reversibility

When uncertain, prefer reversible actions when possible.

A reversible decision preserves future options.

Irreversible choices require stronger justification.

## Option Value

Keeping options open has value under uncertainty.

This is why flexibility can be rational even if one path currently looks best.

## Real Options

Finance formalizes this as **real options**.

Waiting,
piloting,
staging

can be valuable because new information may arrive.

## Pilot Projects

Instead of full deployment, test a smaller version.

A pilot reduces:

- cost of error,
- uncertainty.

Experimentation turns ignorance into information.

## Adaptive Policy

An adaptive policy specifies:

If X happens, do A.

If Y happens, do B.

This is better than pretending one fixed plan fits every future.

## Trigger Points

Define thresholds in advance.

Example:

if hospital occupancy exceeds level L, activate additional capacity.

Precommitted triggers reduce ad hoc reasoning.

## Precautionary Principle

The **precautionary principle** says lack of certainty should not automatically block action when potential harm is severe.

But vague versions can justify anything.

It requires structure.

## Strong vs Weak Precaution

A strong version says:

avoid any action with possible serious harm.

This can paralyze decision-making.

A weaker version says:

take plausible severe risks seriously even before certainty.

## Risk–Risk Tradeoff

Precautions also have costs.

Banning one technology may create another risk.

Good precaution compares:

action risk

with:

inaction risk.

## Asymmetric Loss

When one kind of error is much more costly, decision thresholds should shift.

Signal detection theory applies here too.

## Medical Example

Missing a lethal disease may be worse than ordering an extra test.

The decision threshold should reflect the asymmetry.

## Catastrophic Risk

Very low-probability but enormous harms create difficult choices.

Expected-value reasoning can make them important.

But probabilities are often deeply uncertain.

## Fat-Tailed Distributions

Some domains have heavy tails.

Extreme outcomes are rare but disproportionately important.

Average-case intuition fails.

## Black Swans

Nassim Nicholas Taleb popularized **black swan** events:

rare,
high-impact,
retrospectively explainable.

The key lesson is model fragility.

## Unknown Unknowns

You cannot assign probabilities to possibilities you never imagined.

This limits formal optimization.

Robust systems should tolerate surprise.

## Redundancy

Engineering manages uncertainty using:

- backups,
- redundancy,
- fail-safes.

Epistemic humility becomes architecture.

## Defense in Depth

No single safeguard should carry all responsibility.

Independent layers reduce correlated failure.

This principle appeared earlier in AI alignment.

## Margin of Safety

Engineers build structures stronger than expected loads.

The difference is a **margin of safety**.

Decision-making can do the same.

## Antifragility

Some systems benefit from variability or stress.

The concept of **antifragility** emphasizes designs that improve under certain disturbances.

Not every system can be made antifragile.

## Robustness vs Antifragility

Robust system:

resists disturbance.

Antifragile system:

benefits from some disturbance.

The distinction is useful but should not be overstretched.

## Diversification

Do not place all resources on one uncertain hypothesis.

Diversification reduces exposure to one model being wrong.

This applies beyond finance.

## Portfolio Thinking

A research program can fund:

- several hypotheses,
- several technologies.

This sacrifices some concentration for resilience.

## Ensemble Models

Machine learning often combines models.

An ensemble can outperform one model because errors differ.

Epistemic diversity can increase robustness.

## Correlated Failure

Diversity helps only if failures are not perfectly correlated.

Ten copies of one model are not true diversity.

## Independent Criticism

Organizations should preserve:

- dissent,
- red teams,
- adversarial review.

Homogeneous confidence can hide shared blind spots.

## Devil's Advocate

Assigning someone to challenge the consensus can expose assumptions.

But ritual dissent without genuine independence may become performative.

## Pre-Mortem Again

Assume the decision failed badly.

Ask:

What caused it?

This generates possibilities optimism may suppress.

## Reference Classes

When uncertain about a project, compare it with similar historical cases.

The outside view anchors imagination.

## Forecasting

Good forecasts:

- decompose problems,
- use base rates,
- update often.

Precision can improve with feedback.

## Superforecasting Habits

Effective forecasters often:

- revise incrementally,
- avoid ideological certainty.

They treat beliefs as estimates.

## Confidence Intervals for Beliefs

Instead of:

"I think X."

say:

"I am about 60–70% confident."

This forces attention to uncertainty.

## Avoid Fake Precision

Do not say:

63.17%

when evidence only supports:

roughly two-thirds.

Numerical display should match epistemic resolution.

## Decision Thresholds

You do not need 100% certainty before acting.

A threshold depends on:

- stakes,
- reversibility,
- alternatives.

## Fire Alarm Example

You do not wait for certainty before leaving a building when:

smoke,
alarm

suggest fire.

The cost of unnecessary evacuation is small relative to catastrophic risk.

## Courtroom Example

Criminal conviction uses a very high evidential threshold because:

false conviction

is considered especially costly.

Different domains require different thresholds.

## Scientific Thresholds

Science often separates:

- evidence sufficient for publication,
- evidence sufficient for policy.

The thresholds need not match.

## Policy Under Uncertainty

Policymakers must act before science achieves perfect confidence.

Waiting is itself a decision with consequences.

## Update Policies

A good policy should specify how new evidence changes action.

This keeps uncertainty dynamic.

## Stop Rules

Define when to stop:

- trial,
- deployment.

Clear stop rules prevent sunk-cost escalation.

## Bayesian Updating Without Numbers

Bayesian thinking does not always require numerical probability.

You can reason qualitatively:

this evidence is much more expected under H1.

Therefore H1 should gain confidence.

## Competing Hypotheses

Always ask:

What else could explain this?

Uncertainty becomes manageable when alternatives are explicit.

## Model Comparison

A hypothesis that predicts everything explains little.

Prefer models that make:

- differentiated,
- risky predictions.

## Triangulation

Use different evidence sources with different failure modes.

Convergent support is stronger.

## Epistemic Portfolio

A rational worldview should not rely on one source:

- intuition,
- authority,
- data.

Combine methods.

## Uncertainty and Emotion

Uncertainty generates anxiety.

Humans may seek certainty for emotional relief.

This creates epistemic temptation.

## Need for Closure

Psychology studies **need for cognitive closure**:

the desire for definite answers.

High need for closure can encourage premature belief.

## Tolerating Ambiguity

Epistemic maturity includes the ability to say:

I do not know yet.

This is not weakness.

It prevents forced conclusions.

## Agnosticism

Sometimes the rational state is:

suspend judgment.

Not every question requires immediate belief.

## Degrees of Agnosticism

You can be:

- 50/50,
- weakly leaning.

Suspension need not mean complete neutrality.

## Ignorance and Action

Even when belief is uncertain, action may be necessary.

Decision theory separates:

epistemic confidence

from:

action choice.

## Expected Loss

Choose actions based on consequences, not only most likely state.

An unlikely catastrophe can justify action.

## Robust Epistemology

A robust thinker asks:

If my favorite model is wrong, what breaks?

This is deeper than confidence estimation.

## Error-Correcting Mindset

The goal is not:

never be wrong.

It is:

discover error quickly,
update cheaply.

This mirrors resilient engineering.

## Reversible Beliefs

Hold low-evidence beliefs lightly.

Strong attachment raises the cost of revision.

Belief should become more rigid only as evidence strengthens.

## Intellectual Optionality

Do not commit identity to uncertain claims.

Maintain ability to update without social or psychological collapse.

This is epistemic option value.

## The End of Part XVIII

Part XVIII began with:

belief.

It moved through:

- knowledge,
- evidence,
- skepticism,
- bias,
- probability.

The conclusion is not certainty.

It is disciplined uncertainty.

## The Philosophical Lesson

When we do not know, rationality does not require paralysis.

We can:

- assign ranges,
- compare scenarios,
- preserve options,
- seek information,
- design robust decisions.

The mature answer to uncertainty is not fake confidence.

It is **adaptive reasoning**.

## The Next Question

We now arrive at the final section.

All our beliefs, models, perceptions, and theories point toward one question:

What is actually there?

Part XIX begins with:

**What Is Real?**
