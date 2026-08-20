---
title: 'Machine Learning'
permalink: /nature/285-machine-learning/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 285
tags:
   - machine-learning
   - artificial-intelligence
   - generalization
   - supervised-learning
   - reinforcement-learning
---

Traditional programming tells a machine exactly what procedure to follow.

Machine learning changes the relationship.

Instead of writing every rule, we provide:

- data,
- objectives,
- feedback.

The system discovers useful patterns.

This is **machine learning**.

## Learning from Experience

A machine-learning system improves performance using experience.

The exact meaning of:

- task,
- performance,
- experience

depends on the problem.

## A Classic Definition

Tom Mitchell gave an influential formulation:

A program learns from experience E with respect to tasks T and performance measure P if its performance at T, as measured by P, improves with E.

The value of the definition is structural.

Learning requires measurable improvement.

## Why Learning Matters

Hand-coded rules are expensive.

Some patterns are too complex to specify manually.

Examples:

- recognizing faces,
- understanding speech.

Learning lets data shape the model.

## Training Data

A model learns from examples called **training data**.

The data represents experience.

If the data is poor, learning may be poor.

## Features

A **feature** is a measurable representation used by a model.

Examples:

- pixel intensity,
- word frequency,
- age.

Older machine learning relied heavily on handcrafted features.

## Representation Learning

Modern systems often learn features automatically.

Deep learning is largely about learning useful internal representations.

This reduces manual feature engineering.

## Supervised Learning

In supervised learning, examples include:

- input,
- target output.

The model learns a mapping:

\[
x\rightarrow y
\]

## Classification

Classification predicts discrete categories.

Examples:

- spam vs not spam,
- cat vs dog.

The output is a class label.

## Regression

Regression predicts continuous values.

Examples:

- house price,
- temperature.

The output is numerical.

## Loss Function

Training requires a measure of error.

A **loss function** quantifies how wrong a prediction is.

The learning algorithm tries to minimize loss.

## Mean Squared Error

For regression, a common loss is:

\[
L=\frac{1}{n}\sum_{i=1}^{n}(y_i-\hat y_i)^2
\]

Large errors are penalized strongly.

## Cross-Entropy

Classification often uses cross-entropy loss.

It compares predicted probability distributions with correct labels.

Probability becomes part of learning.

## Parameters

A model contains parameters.

Training adjusts them.

Examples include:

- linear coefficients,
- neural-network weights.

Learning is parameter adaptation.

## Optimization

Training often becomes:

\[
\theta^*=\arg\min_{\theta} L(\theta)
\]

The goal is to find parameter values minimizing loss.

## Gradient Descent

Gradient descent updates parameters in the direction reducing loss:

\[
\theta_{t+1}=\theta_t-\eta\nabla_\theta L
\]

where \(\eta\) is the learning rate.

## Training Is Not the Goal

Low training error alone is not enough.

A model should perform well on unseen data.

This is **generalization**.

## Generalization

Generalization means learning the underlying pattern rather than memorizing examples.

This is one of machine learning's central problems.

## Training Set and Test Set

Data is usually separated into:

- training set,
- test set.

The test set estimates performance on unseen cases.

It should not influence training directly.

## Validation Set

A validation set helps choose:

- hyperparameters,
- model architecture.

It sits between training and final testing.

## Overfitting

A model **overfits** when it fits training data too closely and performs poorly on new data.

It learns noise or accidental detail.

## Underfitting

A model **underfits** when it is too simple to capture important structure.

It performs poorly even on training data.

## Bias–Variance Tradeoff

Simplified language:

high bias → model too rigid.

high variance → model too sensitive to training sample.

Good generalization balances them.

## Regularization

Regularization discourages overly complex solutions.

Examples:

- weight penalties,
- dropout,
- early stopping.

The goal is better generalization.

## Occam's Razor Returns

Simpler models often generalize better.

But "simple" depends on representation.

Machine learning operationalizes an old philosophical idea.

## Inductive Bias

No learner can generalize without assumptions.

An **inductive bias** determines which patterns are preferred.

Examples include:

- smoothness,
- locality,
- sparsity.

Learning is never assumption-free.

## No Free Lunch Again

No algorithm is best across all possible data-generating processes.

Success requires matching bias to structure.

This is a fundamental limit.

## Unsupervised Learning

In unsupervised learning, data has no explicit target labels.

The system tries to discover structure.

Examples include:

- clustering,
- dimensionality reduction.

## Clustering

Clustering groups similar data points.

The meaning of a cluster depends on:

- distance measure,
- representation.

The algorithm does not automatically discover "true" categories.

## Dimensionality Reduction

High-dimensional data may contain lower-dimensional structure.

Techniques compress data while preserving important relationships.

This connects to representation learning.

## Principal Component Analysis

PCA finds directions of maximum variance.

It creates a lower-dimensional linear representation.

This is a classical example.

## Self-Supervised Learning

Self-supervised learning creates prediction targets from the data itself.

Example:

predict a missing word.

Large language models rely heavily on this idea.

## Pretraining

A model can learn broad structure from huge datasets before being adapted to a specific task.

This is **pretraining**.

It enables transfer.

## Fine-Tuning

Fine-tuning adjusts a pretrained model on a narrower dataset or objective.

General knowledge becomes specialized.

## Transfer Learning

Transfer learning reuses knowledge from one task for another.

This reduces required data.

It is central to modern AI.

## Reinforcement Learning

Reinforcement learning differs from supervised learning.

An agent acts.

It receives reward.

It learns which actions produce good long-term outcomes.

## State, Action, Reward

The basic elements are:

- state \(s\),
- action \(a\),
- reward \(r\).

The agent learns a policy.

## Return

The agent often maximizes discounted cumulative reward:

\[
G_t=\sum_{k=0}^{\infty}\gamma^k r_{t+k+1}
\]

Future reward matters.

## Value Function

A value function estimates expected future return from a state:

\[
V(s)
\]

This supports planning and learning.

## Q-Function

An action-value function estimates return for taking action \(a\) in state \(s\):

\[
Q(s,a)
\]

The policy can choose high-value actions.

## Q-Learning

Q-learning updates estimates using:

\[
Q(s,a)\leftarrow Q(s,a)+\alpha[r+\gamma\max_{a'}Q(s',a')-Q(s,a)]
\]

This is a temporal-difference rule.

## Exploration vs Exploitation

The agent must balance:

- trying known good actions,
- exploring uncertain ones.

This is a central learning dilemma.

## Reward Design

A reinforcement learner optimizes the reward it receives.

If the reward is poorly specified, behavior may be undesirable.

This connects to alignment.

## Machine Learning and Statistics

Machine learning overlaps strongly with statistics.

Both study:

- inference,
- prediction,
- uncertainty.

Machine learning often emphasizes scalable computation and predictive performance.

## Data Distribution

Training data is sampled from some distribution.

A model performs best when future data resembles it.

If the distribution changes, performance may degrade.

## Distribution Shift

A model trained on one environment may encounter another.

This is **distribution shift**.

Robust intelligence requires adaptation.

## Covariate Shift

One kind occurs when input distribution changes while the underlying relation remains similar.

Other shifts alter labels or causal structure.

The distinctions matter.

## Out-of-Distribution Data

A system may face examples unlike anything in training.

Confidence can become misleading.

Detecting novelty is difficult.

## Data Leakage

If information from the test set enters training, evaluation becomes invalid.

This is **data leakage**.

Apparently strong performance may be an artifact.

## Class Imbalance

If one category dominates the dataset, accuracy can be misleading.

A model may ignore rare but important cases.

Evaluation metrics must match goals.

## Precision and Recall

For classification:

**precision** asks:

Of predicted positives, how many were correct?

**recall** asks:

Of real positives, how many were found?

Different applications value them differently.

## ROC and Thresholds

Many classifiers output scores rather than fixed labels.

Choosing a threshold changes:

- false positives,
- false negatives.

There is no universally optimal threshold.

## Data Quality

More data is not automatically better.

Bad labels, duplication, and bias can degrade models.

Quality matters as much as quantity.

## Dataset Bias

Training data reflects the world that produced it.

Historical inequality and measurement choices can enter the model.

Learning can reproduce social bias.

## Correlation vs Causation

Most machine learning learns predictive associations.

A model may predict well without understanding causes.

Causal inference requires stronger assumptions and designs.

## Shortcut Learning

A model may exploit an easy correlation.

For example, it identifies wolves by snowy backgrounds.

The prediction is correct for the wrong reason.

Generalization then fails.

## Interpretability

We may want to know:

Why did the model predict this?

Interpretability methods attempt to expose:

- features,
- patterns,
- internal mechanisms.

No method provides perfect transparency.

## Calibration

A probabilistic model should be calibrated.

If it predicts 80% confidence repeatedly, it should be correct about 80% of the time.

Confidence quality matters.

## Robustness

Small input changes can sometimes cause large output changes.

Robustness asks whether predictions remain stable under reasonable perturbations.

## Adversarial Examples

Specially designed perturbations can fool some models while remaining nearly invisible to humans.

This reveals differences between machine and human representations.

## Learning Curves

Performance as a function of data or computation can reveal:

- underfitting,
- overfitting,
- scaling behavior.

Learning is empirical.

## Scaling

Many modern models improve predictably as:

- data,
- parameters,
- computation

increase.

But scaling does not solve every problem.

Architecture and objectives still matter.

## Memorization vs Generalization

Large models can both:

- memorize examples,
- generalize patterns.

These are not mutually exclusive.

Evaluation must distinguish them.

## Machine Learning Is Not Magic

A model cannot extract information that is absent from:

- data,
- objective,
- inductive bias.

Learning transforms structure.

It does not create truth from nothing.

## Human Learning

Humans learn from:

- few examples,
- instruction,
- social interaction,
- embodied experience.

Machine learning captures some mechanisms.

It does not yet reproduce human learning as a whole.

## The Philosophical Lesson

Machine learning replaces explicit programming with adaptation from experience.

Its central challenge is not fitting data.

It is learning patterns that remain useful beyond the data already seen.

Generalization is the heart of learning.

## The Next Question

One family of machine-learning models has become especially influential.

Inspired loosely by biological nervous systems, these models learn through networks of weighted units.

The next essay examines:

**Neural Networks and Deep Learning.**
