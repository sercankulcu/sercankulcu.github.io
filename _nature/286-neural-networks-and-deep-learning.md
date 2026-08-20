---
title: 'Neural Networks and Deep Learning'
permalink: /nature/286-neural-networks-and-deep-learning/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 286
tags:
   - neural-networks
   - deep-learning
   - backpropagation
   - representation-learning
   - artificial-intelligence
---

Neural networks are among the most influential ideas in modern artificial intelligence.

Their name comes from biology.

But artificial neural networks are not literal digital brains.

They are mathematical models built from interconnected computational units.

Their power comes from learning internal representations from data.

## The Artificial Neuron

A simple artificial neuron receives inputs:

\[
x_1,x_2,\ldots,x_n
\]

Each input has a weight:

\[
w_1,w_2,\ldots,w_n
\]

The unit computes something like:

\[
z=\sum_i w_i x_i+b
\]

and then applies an activation function.

## Activation

The activation function transforms the weighted sum.

Examples include:

- sigmoid,
- tanh,
- ReLU.

Without nonlinearity, stacking many layers would collapse into one linear transformation.

## Perceptron

The perceptron is an early trainable neural model associated with Frank Rosenblatt.

It can learn a linear decision boundary.

For suitable problems, it separates classes using a hyperplane.

## Linear Separability

Some classification problems are linearly separable.

Others are not.

The XOR problem became a famous demonstration that a single-layer perceptron cannot solve every simple logical relation.

## XOR

For XOR:

\[
0\oplus0=0
\]
\[
0\oplus1=1
\]
\[
1\oplus0=1
\]
\[
1\oplus1=0
\]

No single straight line separates the positive from negative cases.

Hidden layers solve this limitation.

## Minsky and Papert

Marvin Minsky and Seymour Papert analyzed limitations of perceptrons in their 1969 book.

Their work was mathematically important.

It is sometimes oversimplified as having "killed neural networks."

The historical story is more complicated.

## Multilayer Networks

A multilayer network contains:

- input layer,
- hidden layers,
- output layer.

Hidden units learn intermediate representations.

This dramatically expands expressive power.

## Forward Pass

During a forward pass, information moves through successive layers.

Each layer transforms the representation.

The final layer produces a prediction.

## Loss

The prediction is compared with a target through a loss function.

Training aims to reduce this loss.

The challenge is assigning responsibility to millions or billions of parameters.

## Backpropagation

**Backpropagation** efficiently computes gradients through a layered network.

It applies the chain rule of calculus repeatedly from output toward input.

This tells each parameter how changing it would affect the loss.

## Chain Rule

If:

\[
y=f(g(x))
\]

then:

\[
\frac{dy}{dx}=\frac{df}{dg}\frac{dg}{dx}
\]

Backpropagation applies this idea across computational graphs.

## Gradient Descent

After gradients are computed, parameters are updated:

\[
\theta\leftarrow\theta-\eta\nabla_\theta L
\]

This process repeats across data.

Learning emerges from optimization.

## Stochastic Gradient Descent

Rather than compute the gradient over an entire dataset for every update, stochastic or mini-batch gradient descent uses subsets of examples.

This reduces computational cost.

It also introduces useful noise.

## Learning Rate

The learning rate \(\eta\) controls update size.

Too large:

training may become unstable.

Too small:

learning may be painfully slow.

Optimization itself has hyperparameters.

## Hidden Representations

The central achievement of deep learning is not merely fitting outputs.

Hidden layers discover representations useful for prediction.

Earlier layers may encode simpler structure.

Later layers may encode more abstract combinations.

## Representation Learning

This replaces some manual feature engineering.

Instead of telling the model exactly which features matter, we let training discover them.

The representation becomes learned.

## Convolutional Neural Networks

Convolutional neural networks, or CNNs, became especially influential in vision.

They exploit:

- local receptive fields,
- shared weights,
- spatial structure.

This gives an inductive bias appropriate for images.

## Convolution

A small filter slides across the image.

The same detector is applied at many positions.

This creates translation-related efficiency.

## Hierarchical Vision Features

Early CNN layers may respond to:

- edges,
- textures.

Deeper layers combine them into:

- shapes,
- object parts,
- categories.

This resembles, only loosely, hierarchical visual processing in brains.

## Pooling

Pooling reduces spatial resolution while retaining salient information.

It can increase invariance.

Modern architectures vary in how much explicit pooling they use.

## Recurrent Neural Networks

Recurrent neural networks, or RNNs, process sequences through internal state.

They were widely used for:

- language,
- speech,
- time series.

The state carries information across steps.

## Vanishing Gradient

Training long recurrent sequences can suffer from vanishing gradients.

Signals shrink as they propagate backward through many steps.

This makes long-term dependency learning difficult.

## LSTM

Long Short-Term Memory networks introduced gated mechanisms helping preserve relevant information over longer times.

LSTMs became a standard sequence model before transformers dominated many domains.

## Attention

Attention mechanisms allow models to focus selectively on different input elements.

Instead of compressing an entire sequence into one fixed state, attention dynamically retrieves relevant information.

## Transformer

The transformer architecture made attention central.

It processes tokens through:

- self-attention,
- feed-forward layers,
- normalization.

It reduced dependence on recurrence.

## Self-Attention

Each token computes relationships with other tokens.

A simplified attention formula is:

\[
Attention(Q,K,V)=softmax\left(\frac{QK^T}{\sqrt{d_k}}\right)V
\]

The model learns which elements should influence each other.

## Queries, Keys, and Values

Each token is transformed into:

- query,
- key,
- value.

Similarity between queries and keys determines how values are combined.

This creates context-sensitive representations.

## Multi-Head Attention

Multiple attention heads learn different relation patterns.

One head may focus on local syntax.

Another may capture longer-range dependencies.

Interpretation of specific heads should be cautious.

## Positional Information

Attention alone is largely permutation-invariant.

Sequence models therefore need positional information.

Transformers incorporate position through:

- explicit encodings,
- learned embeddings,
- relative schemes.

## Depth

A deep network stacks many transformations.

Depth allows complex functions to be represented compositionally.

But deeper is not automatically better.

Optimization and architecture matter.

## Width

Wider layers increase representational capacity.

Modern scaling involves choices about:

- width,
- depth,
- data,
- computation.

Performance emerges from their interaction.

## Residual Connections

Residual connections let layers learn modifications to existing representations.

They improve optimization in deep networks.

Instead of learning:

\[
H(x)
\]

directly, a block may learn:

\[
F(x)+x
\]

## Normalization

Normalization methods stabilize training.

Examples include:

- batch normalization,
- layer normalization.

They shape optimization dynamics.

## Embeddings

Discrete items such as words can be mapped to dense vectors.

These vectors capture statistical relationships.

Embeddings transform symbolic inputs into geometry.

## Distributed Representation

A concept is not stored in one unit.

It is encoded across many dimensions.

Likewise, each dimension contributes to many concepts.

Knowledge is distributed.

## Feature Superposition

A model may encode more features than available explicit dimensions by sharing representational directions.

This is sometimes called **superposition**.

It increases capacity but complicates interpretation.

## Nonlinear Feature Learning

Deep networks construct features by repeated nonlinear transformations.

The result is a hierarchy of latent spaces.

This is one reason they can model highly complex patterns.

## Universal Approximation

Certain neural networks can approximate broad classes of functions given sufficient capacity.

But existence theorems do not tell us:

- how much data is needed,
- whether training will succeed,
- whether generalization will be good.

Expressiveness is not learnability.

## Optimization Landscape

Training deep networks means navigating a high-dimensional loss landscape.

The surface may contain:

- saddle points,
- flat regions,
- many good minima.

Modern optimization succeeds more often than early intuition suggested.

## Generalization Puzzle

Large neural networks can have far more parameters than training examples.

Classical intuition might predict severe overfitting.

Yet large models often generalize well.

Understanding why remains an active theoretical topic.

## Double Descent

In some regimes, test error can:

- decrease,
- increase,
- then decrease again

as model capacity grows.

This is called **double descent**.

It challenges simple bias–variance stories.

## Regularization

Regularization can arise explicitly through:

- weight decay,
- dropout.

It can also arise implicitly through:

- optimization,
- architecture,
- data augmentation.

Generalization is a system property.

## Data Augmentation

Training examples can be transformed while preserving label.

Examples:

- crop,
- rotate,
- perturb.

This teaches invariances.

The augmentation itself encodes assumptions.

## Transfer Learning

Features learned on one large dataset can support many downstream tasks.

This made pretrained deep models extremely valuable.

Representation becomes reusable infrastructure.

## Foundation Models

Large pretrained models can support many applications through:

- prompting,
- fine-tuning,
- adapters.

The model becomes a general representation engine.

## Scaling Laws

Empirical work has found relatively smooth relationships among:

- model size,
- data,
- compute,
- loss

over significant ranges.

Scaling can produce predictable improvements.

It is not a guarantee of every desired capability.

## Emergent-Looking Abilities

Some abilities appear to improve abruptly when measured with thresholded benchmarks.

Whether this represents true phase transitions or measurement effects depends on the case.

Claims of emergence require careful analysis.

## Deep Learning and Vision

Deep networks transformed:

- image classification,
- object detection,
- segmentation.

They learned visual features more effectively than many hand-engineered pipelines.

## Deep Learning and Speech

Neural models improved:

- speech recognition,
- synthesis.

Sequence modeling reduced dependence on manually designed components.

## Deep Learning and Language

Transformers enabled large language models capable of:

- generation,
- translation,
- summarization,
- coding.

Language became one of deep learning's most visible domains.

## Deep Learning and Science

Neural systems are used in:

- protein structure prediction,
- weather forecasting,
- materials science.

They can learn complex relationships from high-dimensional data.

## Correlation and Causation Again

A deep model can predict extremely well using correlations.

Prediction does not guarantee causal understanding.

This remains a fundamental limitation.

## Distribution Shift

Deep models can fail when the world changes.

A model trained on one distribution may behave unexpectedly on another.

Scale reduces some failures.

It does not eliminate the problem.

## Adversarial Examples

Small carefully designed perturbations can cause misclassification.

This reveals that learned decision boundaries may differ from human perception.

Robustness is not automatic.

## Hallucination-Like Errors

Generative models can produce plausible but incorrect outputs.

The model optimizes sequence prediction, not guaranteed truth.

Fluency and factual reliability are distinct.

## Interpretability

Deep networks contain many internal features.

Understanding what they represent is difficult.

Interpretability research studies:

- activations,
- circuits,
- features,
- causal interventions.

## Mechanistic Interpretability

One ambitious goal is to reverse-engineer learned computation.

Which internal mechanisms implement:

- copying,
- induction,
- arithmetic,
- factual recall?

This treats neural models as scientific objects.

## Biological Similarity

Artificial neural networks were inspired by brains.

But they differ in:

- learning rule,
- architecture,
- timing,
- embodiment,
- energy.

The analogy should not be taken literally.

## Backpropagation and the Brain

Whether biological brains implement something functionally equivalent to backpropagation remains debated.

There are proposed approximations.

No consensus says cortical learning is ordinary backpropagation.

## Deep Learning as Engineering

Its success does not require biological realism.

Aircraft fly without flapping like birds.

An artificial system can solve a function differently from nature.

## The Philosophical Lesson

Neural networks show how complex behavior can emerge from:

- simple local operations,
- learned weights,
- distributed representations.

Deep learning's central power is representation learning.

Its central weakness is that powerful internal structure can remain opaque and brittle.

## The Next Question

Learning from labeled examples is only one form of intelligence.

An agent can also learn through:

action,
consequence,
reward.

This is the domain of:

**Reinforcement Learning.**
