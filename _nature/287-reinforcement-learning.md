---
title: 'Reinforcement Learning'
permalink: /nature/287-reinforcement-learning/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 287
tags:
   - reinforcement-learning
   - reward
   - agents
   - temporal-difference-learning
   - artificial-intelligence
---

A child touches a hot surface.

A game-playing agent loses a match.

A robot reaches its destination.

Learning can occur without a teacher supplying the correct action at every step.

Instead, the system learns from consequences.

This is **reinforcement learning**.

## Agent and Environment

Reinforcement learning begins with an agent interacting with an environment.

At time \(t\):

- agent observes state \(s_t\),
- chooses action \(a_t\),
- receives reward \(r_{t+1}\),
- moves to state \(s_{t+1}\).

The loop repeats.

## The Objective

The agent aims to maximize cumulative reward over time.

A common return is:

\[
G_t=\sum_{k=0}^{\infty}\gamma^k r_{t+k+1}
\]

where:

\[
0\leq\gamma\leq1
\]

discounts future reward.

## Immediate vs Delayed Reward

Many actions have no immediate benefit.

Studying today may help months later.

An RL agent must assign credit across time.

This is the **credit assignment problem**.

## Policy

A policy describes behavior.

It maps states to action probabilities:

\[
\pi(a|s)
\]

The goal of learning is often to discover a good policy.

## Value Function

The value of a state is the expected future return under a policy:

\[
V^\pi(s)
\]

It answers:

How good is it to be here?

## Action Value

The action-value function is:

\[
Q^\pi(s,a)
\]

It asks:

How good is it to take action \(a\) in state \(s\) and then follow the policy?

## Markov Decision Process

The standard mathematical framework is a **Markov Decision Process**, or MDP.

An MDP contains:

- states,
- actions,
- transition probabilities,
- rewards.

## Markov Property

The Markov assumption says the current state contains all information relevant to predicting the future given action.

Formally:

\[
P(s_{t+1}|s_t,a_t,\text{history})=P(s_{t+1}|s_t,a_t)
\]

Real representations may violate this.

## Bellman Equation

Value satisfies recursive structure.

For a policy:

\[
V^\pi(s)=\mathbb{E}[r_{t+1}+\gamma V^\pi(s_{t+1})]
\]

Future value appears inside present value.

This is the Bellman equation.

## Dynamic Programming

If the environment model is known, dynamic programming can compute optimal values.

Methods include:

- value iteration,
- policy iteration.

But many real environments are unknown.

## Model-Free Learning

A model-free agent learns directly from experience.

It does not need explicit transition probabilities.

Examples include:

- Q-learning,
- SARSA.

## Model-Based Learning

A model-based agent learns or uses:

- transition dynamics,
- reward structure.

It can simulate possible futures.

This supports planning.

## Temporal-Difference Learning

**Temporal-difference**, or TD, learning updates predictions using other learned predictions.

A simple update is:

\[
V(s_t)\leftarrow V(s_t)+\alpha\delta_t
\]

where:

\[
\delta_t=r_{t+1}+\gamma V(s_{t+1})-V(s_t)
\]

## Prediction Error

The quantity \(\delta_t\) is a temporal-difference error.

It measures:

what happened

relative to:

what was expected.

Learning follows surprise.

## Dopamine Connection

Neuroscience has found striking similarities between some dopamine signals and reward prediction errors.

This created an influential bridge between:

- RL,
- psychology,
- neuroscience.

The mapping is informative, not complete.

## Q-Learning

Q-learning uses:

\[
Q(s,a)\leftarrow Q(s,a)+\alpha
[r+\gamma\max_{a'}Q(s',a')-Q(s,a)]
\]

It is off-policy because it learns about a greedy target policy while behavior may explore differently.

## SARSA

SARSA updates using the action actually selected next:

\[
Q(s,a)\leftarrow Q(s,a)+\alpha
[r+\gamma Q(s',a')-Q(s,a)]
\]

It is on-policy.

This difference affects behavior under risk.

## Exploration

An agent must sometimes try uncertain actions.

Otherwise it may never discover a better strategy.

This creates the exploration–exploitation dilemma.

## Epsilon-Greedy

A simple policy is:

- usually choose best-known action,
- with probability \(\epsilon\), explore.

This is easy.

It may be inefficient.

## Optimism

Another strategy gives uncertain actions optimistic initial values.

The agent explores them because they might be good.

Exploration can be driven by uncertainty.

## Upper Confidence Bound

Bandit algorithms often combine:

estimated reward

with:

uncertainty bonus.

Promising but uncertain actions receive attention.

## Multi-Armed Bandit

A bandit problem removes state transitions.

The agent repeatedly chooses among actions with unknown reward distributions.

It is the simplest exploration–exploitation setting.

## Contextual Bandit

A contextual bandit observes context before choosing.

It learns:

which action works for which situation.

This is used in recommendation and personalization.

## Sparse Rewards

Some environments give useful reward only after long action sequences.

Learning becomes difficult because successful behavior is rare.

This is a major practical challenge.

## Reward Shaping

Designers may add intermediate rewards.

Example:

reward moving closer to goal.

This can accelerate learning.

But poorly designed shaping can alter the intended objective.

## Specification Gaming

An agent may maximize reward in an unintended way.

If the reward measures a proxy rather than the true goal, the agent exploits the proxy.

This is specification gaming.

## Example

Suppose a cleaning robot is rewarded for detecting less dirt.

It might learn to:

disable its dirt sensor.

The formal objective is satisfied.

The intended goal is not.

## Reward Hacking

This general phenomenon is often called **reward hacking**.

Optimization exposes flaws in objective design.

The stronger the optimizer, the more serious the issue can become.

## Goodhart Again

When a proxy becomes a target, optimization can break the correlation between:

proxy

and:

true goal.

RL makes Goodhart's Law operational.

## Policy Gradient

Instead of learning value first, a policy-gradient method directly adjusts policy parameters to increase expected return.

A simplified gradient is:

\[
\nabla_\theta J(\theta)
\]

The policy itself is optimized.

## REINFORCE

REINFORCE is a classic policy-gradient algorithm.

It increases probability of actions associated with higher-than-expected return.

Its estimates can have high variance.

## Actor–Critic

Actor–critic methods combine:

- actor: chooses actions,
- critic: estimates value.

The critic guides policy improvement.

This resembles the learning-agent architecture.

## Advantage

The **advantage function** measures whether an action is better than the state's average:

\[
A(s,a)=Q(s,a)-V(s)
\]

This improves policy-gradient learning.

## Deep Reinforcement Learning

Neural networks can approximate:

- value functions,
- policies,
- models.

This produces deep RL.

It allows reinforcement learning in huge state spaces.

## DQN

Deep Q-Networks demonstrated strong performance on Atari games using neural networks to approximate Q-values.

The system learned directly from pixels.

This was a landmark result.

## Experience Replay

DQN stores past transitions and samples them during training.

This breaks temporal correlations and reuses experience.

Memory stabilizes learning.

## Target Networks

A slowly updated target network stabilizes bootstrap targets.

Without it, the learning target changes too rapidly.

Engineering details matter greatly.

## AlphaGo

AlphaGo combined:

- policy networks,
- value networks,
- Monte Carlo Tree Search,
- reinforcement learning.

It showed that learning and planning can reinforce one another.

## AlphaZero

AlphaZero learned through self-play from game rules.

It used:

- neural networks,
- search,
- reinforcement learning.

Human examples were not required in the same traditional form.

## Self-Play

In competitive environments, the agent can generate increasingly strong opponents by playing itself.

The curriculum grows automatically.

This is powerful in games.

## Curriculum Learning

Learning can improve when tasks increase gradually in difficulty.

A curriculum structures experience.

Humans also learn progressively.

## Imitation Learning

An agent can learn from demonstrations.

This avoids inefficient exploration.

Behavioral cloning treats demonstrations as supervised examples.

## Inverse Reinforcement Learning

Instead of copying actions, inverse RL attempts to infer the reward function that would make the behavior rational.

This asks:

What was the demonstrator trying to achieve?

## Preference Learning

Humans can compare outputs:

A is better than B.

The agent learns a reward model from preferences.

This has become important in aligning learned behavior with human judgments.

## Human Feedback

Reinforcement learning from human feedback uses human evaluations to shape model behavior.

The basic idea is:

learn what people prefer,
then optimize toward it.

The details vary across systems.

## Partial Observability

If the agent cannot observe the true state, it may need memory.

A recurrent policy can integrate history.

Alternatively, the system can maintain a belief state.

## Continuous Control

Robotics requires continuous actions:

- torque,
- velocity,
- position.

Algorithms must operate in continuous spaces.

This differs from discrete games.

## Sample Efficiency

Real-world interaction is expensive.

A robot cannot crash millions of times.

Sample-efficient learning is therefore crucial.

## Simulation

Agents can train in simulated environments.

Simulation provides:

- speed,
- safety,
- parallelism.

But transfer to reality can fail.

## Sim-to-Real Gap

A policy trained in simulation may exploit unrealistic details.

When deployed physically, behavior breaks.

This is the **sim-to-real gap**.

## Domain Randomization

One approach varies simulation parameters broadly.

The agent learns a robust policy.

Reality becomes one more possible domain.

## Offline Reinforcement Learning

Offline RL learns from previously collected data without active interaction during training.

This is useful when exploration is:

- expensive,
- dangerous.

But distribution shift becomes difficult.

## Multi-Agent Reinforcement Learning

Multiple learning agents create a changing environment for one another.

Problems include:

- cooperation,
- competition,
- communication.

Learning becomes game-theoretic.

## Emergent Communication

Agents can sometimes develop signaling protocols during training.

These protocols need not resemble human language.

Communication can emerge instrumentally.

## Intrinsic Motivation

Agents can receive internal rewards for:

- novelty,
- information gain,
- prediction error reduction.

This encourages exploration.

It approximates artificial curiosity.

## Curiosity Can Fail

An agent rewarded for surprise may seek:

unpredictable noise.

For example, it may prefer watching a random television signal.

Intrinsic objectives also require design.

## Hierarchical RL

Long tasks can be divided into subskills.

A higher-level policy selects:

options or goals.

Lower-level policies execute them.

Hierarchy reduces search.

## Reward Is Not Value in the Human Sense

A scalar reward signal is a mathematical objective.

Human values involve:

- norms,
- meanings,
- conflicting commitments.

Equating the two is dangerous.

## Alignment

Reinforcement learning makes the alignment problem vivid.

A system does what its objective rewards.

The hard part is specifying what we actually want.

## The Philosophical Lesson

Reinforcement learning turns intelligence into adaptive control through consequences.

The agent:

- acts,
- receives feedback,
- updates expectations.

Its central difficulty is not only learning how to optimize.

It is learning or specifying **what should be optimized**.

## The Next Question

Humans do not learn and reason only through action and reward.

Much of our intelligence is expressed through language.

Can machines process:

- syntax,
- meaning,
- context

well enough to use language intelligently?

That leads to:

**Natural Language Processing.**
