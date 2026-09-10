---
title: 'Machine Learning Is Becoming A Normal Software Tool'
date: 2018-10-21
permalink: /posts/2018/10/machine-learning-is-becoming-a-normal-software-tool/
tags:
  - machine-learning
  - artificial-intelligence
  - software
---

Machine learning is no longer something I hear about only in research papers. TensorFlow was open-sourced in November 2015. Keras made it more approachable. PyTorch, released by Facebook's research lab in 2016, has been gaining traction in the research community. scikit-learn has made classical machine-learning algorithms available in Python with a consistent API since 2011. Cloud platforms — AWS SageMaker, Google Cloud ML Engine, Azure Machine Learning — now offer managed environments for training and deploying models without running your own infrastructure.

The result is that machine learning is available to software developers who are not machine-learning researchers. This changes the question from "can we use machine learning?" to "when should we, and how do we do it carefully?"

## When machine learning makes sense

Traditional programming is the right choice when the rule is clear and can be stated precisely. Tax calculation, date validation, sorting — these have exact definitions, and writing the rule directly is simpler, faster to test, and easier to explain when it fails.

Machine learning becomes valuable when the rule is difficult to articulate but examples are available. Spam detection is a canonical case: the definition of spam is fuzzy, varies by user and context, and evolves as spammers adapt. But large labeled datasets of spam and not-spam exist, and classifiers trained on those datasets can generalize well. Image classification, speech recognition, and anomaly detection in log files share this structure: the pattern exists but is too complex to express as explicit rules.

A useful test: if you could write the decision procedure by hand and it would work reliably, write it by hand. If you cannot, look at your data.

## The evaluation trap

The new accessibility creates a specific failure mode: training a model before understanding what it is actually learning.

A model trained on customer data to predict churn might achieve 95% accuracy. Before celebrating, check what the baseline is — if 95% of customers do not churn in any given period, a model that predicts "never churns" for every customer would also achieve 95% accuracy while being completely useless.

Other problems to check:

**Data leakage**: a feature in the training data that implicitly encodes the label. A model that learns "customers who cancel their subscription churn" is circular — the cancellation is the churn.

**Distribution shift**: a model trained on last year's data applied to this year's traffic. Customer behavior, spam patterns, and fraud techniques change. A model can degrade silently as the world shifts away from its training distribution.

**Overfitting**: a model that memorizes training examples rather than learning generalizable patterns. It performs extremely well on training data and poorly on new data. The train/test split exists to detect this, but only if the split is honest — test data must not have been used in any way during training or feature selection.

## What developers need to understand

A software engineer integrating a trained model into a production system needs to understand:

- The difference between training accuracy and evaluation on a held-out test set
- What the model is likely to do on inputs outside its training distribution
- Whether the model's predictions can be audited or explained when they are wrong
- How the model will be retrained and how often

A prediction is not an explanation. A model that predicts loan default based on zip code might be accurate in backtesting while encoding geographic discrimination. "The model said so" is not a sufficient answer when the output affects people.

The skill that is becoming valuable is not the ability to implement a neural network from scratch. It is the ability to use the tools critically: know when a high accuracy number means something, know when it does not, and understand what the model is actually doing well enough to be responsible for what it produces.
