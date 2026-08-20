---
title: 'Decision Theory'
permalink: /nature/200-decision-theory/
chapter: 11
chapter_title: 'Logic and Reasoning'
order: 200
tags:
   - decision-theory
   - expected-utility
   - rational-choice
   - uncertainty
   - probability
---

Reasoning often ends with a decision.

Which action should be chosen?

Which risk should be accepted?

Which outcome matters more?

**Decision theory** studies rational choice under:

- uncertainty,
- competing outcomes,
- preferences.

It connects logic, probability, economics, psychology, and artificial intelligence.

## Decisions Have Structure

A decision problem usually contains:

- possible actions,
- possible states of the world,
- possible outcomes,
- preferences over outcomes.

Uncertainty connects actions to consequences.

## Decision Matrix

Suppose you can choose:

Action A.

Action B.

The world may be in:

State 1.

State 2.

Each action-state pair produces an outcome.

This can be represented as a decision table.

Decision theory asks how to choose among actions.

## Utility

A **utility function** assigns numbers to outcomes according to preference.

Higher utility means:

the outcome is preferred.

Utility is not necessarily:

- money,
- happiness.

It is a formal representation of preference.

## Expected Utility

If action \(A\) can produce outcomes \(o_i\) with probabilities \(p_i\), expected utility is:

\[
EU(A)=\sum_i p_i U(o_i)
\]

A standard decision rule is:

choose the action with maximum expected utility.

## Why Expected Value Is Not Enough

Suppose a gamble offers:

50% chance of $100.

50% chance of $0.

Expected monetary value:

$50.

But people may value money nonlinearly.

The utility of $100 may not be twice the utility of $50.

## Risk Aversion

A risk-averse person prefers a certain moderate outcome over a gamble with the same expected monetary value.

This can be represented by a concave utility function.

Utility captures attitude toward risk.

## Risk Seeking

A risk-seeking agent may prefer variability.

The utility function can reflect that too.

Decision theory separates:

objective outcomes

from

subjective preferences.

## Preferences

Classical decision theory often assumes preference relations are:

- complete,
- transitive.

Completeness means the agent can compare any two options.

Transitivity means:

if A is preferred to B,

and B to C,

then A should be preferred to C.

## Preference Cycles

If preferences form:

A > B,

B > C,

C > A,

the agent has a cycle.

Such preferences can create exploitable or unstable choices.

Rational-choice theory tries to rule these out.

## Von Neumann–Morgenstern Utility

Under certain axioms about rational preferences over lotteries, preferences can be represented by an expected utility function.

This is the **von Neumann–Morgenstern utility theorem**.

It provides a formal foundation for expected utility.

## Savage's Framework

Leonard Savage developed a theory of decision under subjective uncertainty.

Probabilities and utilities can both be derived from coherent preference behavior under suitable axioms.

This links Bayesian belief and rational choice.

## Decision Under Risk

When probabilities are known, we speak of **decision under risk**.

Example:

insurance pricing using known probability models.

The uncertainty is quantified.

## Decision Under Uncertainty

When probabilities are themselves unclear, the situation is harder.

This is sometimes called **decision under uncertainty** in the Knightian sense.

The agent may need:

- robust strategies,
- ranges,
- scenarios.

## Maximin

A conservative rule is **maximin**.

For each action, look at its worst possible outcome.

Choose the action whose worst outcome is best.

This protects against catastrophe.

But it can be overly cautious.

## Maximax

The opposite rule is **maximax**.

Choose the action with the best possible upside.

This is extremely optimistic.

It ignores downside risk.

## Minimax Regret

Another strategy minimizes the worst regret.

For each state, compare the chosen action with the best action that could have been chosen.

Then choose to minimize maximum lost opportunity.

This models anticipated regret.

## Dominance

Action A **dominates** B if A is at least as good in every relevant state and better in at least one.

A dominated action should normally be rejected.

Dominance reasoning requires no probability estimates.

## Newcomb's Problem

Newcomb's problem creates a conflict between:

- dominance reasoning,
- expected-value reasoning tied to prediction.

Different decision theories recommend different actions.

The puzzle shows that "rational choice" is not always uniquely defined.

## Causal Decision Theory

**Causal Decision Theory** asks:

What consequences would my action cause?

It evaluates interventions.

This aligns decision-making with causal structure.

## Evidential Decision Theory

**Evidential Decision Theory** asks:

What does choosing this action tell me about the likely state of the world?

An action can be evidence even when it does not cause the relevant outcome.

This difference drives Newcomb-style disputes.

## Counterfactual Decision Theory

More recent approaches try to reason about counterfactual dependence in richer ways.

They ask:

What would happen if the agent chose differently?

Decision theory therefore connects to modal and causal logic.

## Prisoner's Dilemma

Two rational agents may each have an incentive to defect.

Yet mutual cooperation produces a better joint outcome.

The **Prisoner's Dilemma** shows that individual rationality and collective welfare can diverge.

Decision theory becomes strategic.

## Game Theory

When outcomes depend on other decision-makers, we enter **game theory**.

Each agent reasons about:

- actions,
- beliefs,
- incentives.

Decision theory is the single-agent foundation beneath strategic interaction.

## Utility Is Not Morality

Maximizing utility does not automatically mean acting ethically.

The utility function determines what is valued.

An agent could maximize:

- profit,
- welfare,
- power.

Decision theory formalizes choice.

Ethics evaluates goals.

## Multi-Objective Decisions

Real decisions often involve multiple criteria:

- cost,
- safety,
- speed,
- fairness.

Reducing all of them to one utility number can be difficult.

Multi-criteria decision methods preserve several dimensions.

## Pareto Improvement

An outcome is a **Pareto improvement** if at least one person becomes better off and nobody becomes worse off.

An outcome is **Pareto optimal** if no further Pareto improvement exists.

Pareto optimality does not imply fairness.

## Decision Trees

A **decision tree** represents:

- choices,
- chance events,
- outcomes.

Expected utilities can be propagated backward.

This makes complex sequential decisions easier to analyze.

## Value of Information

Information can improve decisions.

The **value of information** asks:

How much would it be worth to learn something before acting?

An expensive test may be worthwhile if it changes action enough to improve expected outcomes.

## Perfect Information

Perfect information reveals the relevant state before decision.

Its value is the difference between:

expected utility with information

and

without it.

Information acquires decision-theoretic value.

## Partial Information

Most information is imperfect.

A diagnostic test changes probabilities rather than revealing certainty.

The value depends on:

- accuracy,
- cost,
- consequences.

Bayesian updating and utility combine naturally.

## Sunk Cost Fallacy

Past costs that cannot be recovered should not determine future choices.

Yet humans often continue bad projects because:

"We have already invested so much."

This is the **sunk cost fallacy**.

Rational decisions should focus on future consequences.

## Loss Aversion

Behavioral economics shows people often weight losses more heavily than equivalent gains.

This is **loss aversion**.

Human decision-making systematically departs from simple expected utility.

## Prospect Theory

Daniel Kahneman and Amos Tversky developed **prospect theory**.

It models:

- loss aversion,
- nonlinear probability weighting,
- reference dependence.

Descriptive decision-making differs from normative rational-choice models.

## Framing Effects

Choices can change depending on how identical outcomes are described.

"90% survival"

may feel different from:

"10% mortality."

This is a framing effect.

Representation changes decision.

## Bounded Rationality

Herbert Simon argued that real agents have limited:

- time,
- memory,
- computation.

They often **satisfice** rather than optimize.

A good-enough choice may be rational under resource constraints.

## Satisficing

Instead of searching for the absolute best option, an agent searches until an acceptable threshold is reached.

This can be computationally rational.

Perfect optimization may cost more than it is worth.

## Decision Theory and AI

AI agents require:

- beliefs,
- goals,
- utility or reward structure,
- action selection.

Decision theory provides the formal core.

Reinforcement learning later builds on related ideas.

## Decision Theory and Alignment

If an intelligent system optimizes the wrong objective, excellent decision-making can produce harmful outcomes.

The quality of reasoning does not guarantee the quality of goals.

This becomes central in AI alignment.

## The Philosophical Lesson

Decision theory combines:

- belief about what may happen,
- value of what may happen,
- choice among actions.

Rationality is not merely logical validity.

It is action under uncertainty.

## The End of Part XI

This section began with:

What is logic?

It moved through:

- arguments,
- validity,
- quantifiers,
- proof,
- paradox,
- modal logics,
- probability,
- decision.

We now have the tools needed to examine something deeper.

What happens when logic itself becomes an object of formal study?

The next part turns from reasoning inside systems to reasoning about systems.

That is the beginning of:

**formal systems and metalogic.**
