---
title: 'Causality: Why Correlation Is Not Enough'
permalink: /nature/067-causality-why-correlation-is-not-enough/
chapter: 4
chapter_title: 'Knowing and the Philosophy of Science'
order: 67
tags:
   - causality
   - correlation
   - confounding
   - intervention
   - counterfactuals
---

Two things move together.

Does one cause the other?

Sometimes yes. Sometimes no.

This is one of the most important distinctions in science.

Correlation can reveal a pattern. Causation tells us something about the structure producing the pattern.

Confusing the two creates false explanations, bad policy, ineffective medicine, and misleading science.

## What Is Correlation?

Two variables are correlated when their values vary together in a systematic way.

As X increases, Y may tend to increase. Or Y may tend to decrease.

Correlation can be strong or weak, positive or negative, linear or nonlinear.

But correlation alone does not say why the relationship exists.

## Ice Cream and Sunburn

Ice-cream sales rise in summer.

Sunburn cases also rise.

The variables are correlated.

Does ice cream cause sunburn?

No.

Temperature and sunlight affect both.

This is a classic example of **confounding**.

The observed relationship is real. The causal interpretation is wrong.

## Confounding

A confounder influences both the suspected cause and the outcome.

Suppose coffee drinkers have higher rates of a disease.

Possible explanations include:

- coffee causes the disease,
- disease risk changes coffee consumption,
- smoking increases both coffee drinking and disease risk,
- some combination of factors produces the association.

Without addressing confounders, correlation cannot identify one causal pathway uniquely.

## Reverse Causation

Sometimes the direction is reversed.

Suppose people who take more medication are less healthy.

It would be absurd to conclude immediately that medication causes poor health.

People in worse health may need more medication.

The outcome influences the exposure.

This is **reverse causation**.

## Common Causes

Two effects may share one cause.

A falling barometer and dark clouds correlate.

Neither causes the other.

Both arise from changing atmospheric conditions.

Common causes are everywhere: genes influence several traits, economic shocks affect multiple markets, and one pathogen can produce many symptoms.

## Spurious Correlations

With enough variables, accidental correlations appear.

A dataset containing thousands of time series will contain pairs that move together by chance.

The lesson is not that correlation is useless.

It is that statistical association must be tested against chance and causal structure.

## Correlation Is Still Valuable

Correlation often gives the first clue.

Smoking correlated with lung cancer before every biological mechanism was known.

Cholera cases clustered geographically before germ theory matured.

Astronomical correlations reveal relationships no experiment can manipulate directly.

Correlation is evidence.

It is simply not sufficient by itself for causation.

## Temporal Order

A cause should normally precede its effect.

If Y occurs before X, X is unlikely to be the ordinary cause of Y.

Temporal order therefore helps constrain causal interpretation.

But precedence alone is not enough.

Sunrise often precedes breakfast. It does not determine which cereal someone chooses.

## Mechanism

Causal confidence increases when a plausible mechanism is known.

Smoking introduces carcinogens.

These damage DNA.

Mutations alter cellular regulation.

Cancer risk rises.

Mechanism connects association to process.

But lack of a known mechanism does not prove absence of causation. Sometimes causal evidence arrives before the detailed mechanism is understood.

## Dose-Response Relationships

If increasing exposure produces an increasing effect, causation becomes more plausible.

More radiation can increase biological damage.

Higher drug dosage may produce a stronger response within a range.

This is a **dose-response relationship**.

It supports causality but is not conclusive.

## Controlled Experiments

The strongest way to establish causation is often intervention.

Change X deliberately.

Hold other relevant factors as constant as possible.

Observe whether Y changes.

Randomized controlled trials are powerful because random assignment reduces confounding.

The experiment creates a controlled counterfactual comparison.

## Randomization

Randomization helps distribute known and unknown confounders across groups.

If treatment and control groups differ mainly in the assigned intervention, differences in outcome can be attributed more credibly to that intervention.

Randomization does not guarantee perfection.

It strengthens causal interpretation.

## Counterfactuals

Causation is often expressed through counterfactual questions:

**What would have happened if X had been different?**

A treatment caused recovery if, under relevant conditions, the patient would probably not have recovered without it.

A support failure caused bridge collapse if the bridge would likely have remained intact had the support not failed.

Counterfactual dependence captures an important aspect of causal explanation.

## Potential Outcomes

Modern causal inference often formalizes counterfactuals using **potential outcomes**.

For each unit, imagine:

- outcome if treated,
- outcome if untreated.

Only one can be observed for the same unit at the same time.

The causal effect is the difference between these potential outcomes.

Experiments estimate this hidden difference using comparable groups.

## The Fundamental Problem of Causal Inference

We cannot observe both counterfactual worlds simultaneously.

A patient cannot both receive and not receive a treatment under identical circumstances.

This is why causal inference requires design and assumptions.

The missing alternative world must be approximated.

## Causal Graphs

Causal relationships can be represented using directed graphs.

Variables are nodes.

Arrows represent causal influence.

For example:

Smoking → Lung Cancer

Smoking ← Social Factor → Alcohol Use

Such diagrams help identify confounders, mediators, colliders, and appropriate adjustment strategies.

They force causal assumptions into explicit form.

## Seeing vs Doing

Judea Pearl and others emphasized a crucial distinction between **observing X** and **intervening to set X**.

Observational probability asks what happens among cases where X is seen.

Causal probability asks what would happen if X were deliberately changed.

These are not always the same.

## Mediators

A variable can lie on the causal pathway.

Exercise may reduce blood pressure partly by improving cardiovascular fitness.

Fitness is a **mediator**.

If we statistically control for the mediator, we may remove part of the genuine causal effect.

Not every correlated variable should be adjusted away.

## Colliders

A **collider** is caused by two other variables.

Conditioning on a collider can create a false association between otherwise independent causes.

This is one of the most counterintuitive lessons of causal inference.

More statistical adjustment is not always better.

Controlling the wrong variable can introduce bias.

## Selection Bias

Suppose we study only hospitalized patients.

If several causes influence hospitalization, restricting analysis to hospitalized people can create misleading associations among those causes.

The selected sample is not neutral.

How data enter a dataset is itself part of the causal structure.

## Natural Experiments

Randomized experiments are not always possible.

Researchers then look for situations where external events approximate random assignment.

Examples include:

- policy thresholds,
- lotteries,
- geographic boundaries,
- natural disasters,
- genetic variation.

These **natural experiments** can provide strong causal evidence when their assumptions are credible.

## Instrumental Variables

An **instrumental variable** influences exposure but affects the outcome only through that exposure, under specified assumptions.

Instrumental-variable methods can estimate causal effects when direct randomization is impossible.

The method is powerful.

Its assumptions are strong and often difficult to verify.

## Regression Discontinuity

Suppose treatment is assigned when a score crosses a threshold.

Individuals just above and below the cutoff may be very similar except for treatment status.

Comparing them can approximate an experiment.

This is **regression discontinuity**.

## Difference-in-Differences

Policy researchers often compare changes over time between treated and untreated groups.

If both groups would otherwise have followed parallel trends, the difference in their changes can estimate a causal effect.

This is **difference-in-differences**.

Again, the conclusion depends on assumptions.

## Granger Causality

In time-series analysis, one variable may improve prediction of another beyond the second variable's own history.

This is called **Granger causality**.

Despite the name, it is not automatically full philosophical causation.

Predictive precedence can be useful, but common causes and model errors may remain.

## Causation in Physics

Physics often appears to contain cleaner causal structures.

Forces alter motion.

Fields influence particles.

Signals propagate within light cones.

Yet causation becomes subtle even here.

Fundamental equations can be time-symmetric, and quantum entanglement challenges classical intuitions.

Causality is not one simple universal relation.

## Causation and Relativity

Relativity constrains causal influence.

An event can influence another only if the second lies within its future light cone, under ordinary relativistic propagation.

Spacelike-separated events cannot exchange signals faster than light.

Geometry becomes causal structure.

## Causation and Quantum Mechanics

Entangled particles display correlations stronger than classical local hidden-variable theories allow.

But those correlations cannot be used for faster-than-light communication.

Quantum theory challenges classical intuitions without simply discarding causal order.

Interpretations differ about what the correlations mean.

## Probabilistic Causation

A cause need not guarantee its effect.

Smoking causes cancer risk to increase, but not every smoker gets cancer.

Vaccination can reduce disease risk without guaranteeing immunity.

Causal relations can change probabilities.

Deterministic causation is only one special case.

## Necessary and Sufficient Causes

A cause can be:

- necessary but not sufficient,
- sufficient but not necessary,
- neither individually necessary nor sufficient.

Oxygen is necessary for ordinary combustion but not sufficient.

A genetic variant may raise risk without being either necessary or sufficient for disease.

These distinctions make causal claims more precise.

## Causal Inference Is Model-Based

There is no button that converts correlation into causation.

Every causal conclusion relies on assumptions about variables, pathways, sampling, interventions, and background knowledge.

Good causal science makes those assumptions explicit and tests them where possible.

## Why Correlation Is Not Enough

Correlation describes co-variation.

Causation explains how changing one part of a system would change another under specified conditions.

To move from correlation to causation, we need more:

- temporal structure,
- intervention,
- mechanisms,
- causal models,
- counterfactual reasoning,
- converging evidence.

The difference is not statistical decoration.

It is a difference in the claim being made.

## The Next Question

Once we take causation seriously, a deeper question appears.

Does every event need a cause?

Does the universe itself need one?

Does quantum randomness violate causality?

Could causal explanation terminate somewhere?

**Does everything need a cause?**
