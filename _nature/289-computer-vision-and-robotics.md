---
title: 'Computer Vision and Robotics'
permalink: /nature/289-computer-vision-and-robotics/
chapter: 15
chapter_title: 'Intelligence and Artificial Intelligence'
order: 289
tags:
   - computer-vision
   - robotics
   - perception
   - control
   - artificial-intelligence
---

A language model can manipulate words.

A robot must survive contact with the world.

It has to determine:

- where objects are,
- what they are,
- how they move,
- what action is safe.

Computer vision and robotics bring artificial intelligence into physical reality.

## Computer Vision

**Computer vision** tries to extract useful structure from images and video.

A camera produces arrays of pixel values.

Intelligence requires turning pixels into:

- objects,
- depth,
- motion,
- scenes.

## Pixels Are Not Objects

An image does not arrive labeled:

cat,
door,
pedestrian.

The system must infer structure.

Perception is an inverse problem.

## The Inverse Problem

The world produces an image through:

- geometry,
- lighting,
- material,
- camera position.

Vision tries to infer causes from the resulting image.

Many different worlds can produce similar images.

## Ill-Posedness

Vision is often underdetermined.

One image may be compatible with multiple:

- shapes,
- depths,
- illuminations.

Perception therefore needs priors.

## Edges

Classical vision systems often began with edges.

Edges correspond to sharp changes in intensity.

They can indicate:

- object boundaries,
- texture,
- lighting changes.

But not every edge is a real object boundary.

## Features

Older systems used handcrafted features such as:

- SIFT,
- HOG,
- corners.

These represented local visual structure.

Deep learning later learned features automatically.

## Image Classification

Classification asks:

What category does this image belong to?

Examples:

- dog,
- airplane,
- tumor type.

The output is typically one or more labels.

## Object Detection

Detection asks:

What objects are present, and where?

The output includes:

- class,
- bounding box.

This is harder than classification.

## Segmentation

Segmentation assigns labels to individual pixels.

### Semantic segmentation
Classifies each pixel by category.

### Instance segmentation
Distinguishes separate objects of the same class.

## Depth

Robots need distance information.

Depth can be estimated using:

- stereo vision,
- lidar,
- monocular cues.

Depth supports navigation and manipulation.

## Stereo Vision

Two cameras observe the scene from slightly different positions.

Disparity between corresponding points helps estimate depth.

This resembles binocular vision.

## Motion

Video provides temporal information.

Optical flow estimates apparent motion between frames.

Motion helps infer:

- object movement,
- camera movement.

## Tracking

A vision system may identify the same object across frames.

Tracking requires maintaining identity over time.

This connects perception to memory.

## Scene Understanding

A scene is more than objects.

A kitchen contains relationships:

- cup on table,
- person near sink.

Scene understanding requires relational representation.

## Context in Vision

Context can disambiguate perception.

An object with a long handle and metal head is likely a:

hammer

if it appears in a toolbox.

The same shape in another context might be interpreted differently.

## Deep Vision

Convolutional neural networks transformed computer vision.

They learned hierarchical visual features directly from data.

Later transformer-based vision models expanded the architecture space.

## Vision Transformers

Vision Transformers divide images into patches and process them with attention.

This reduces reliance on convolution-specific inductive bias.

Different architectures can learn similar tasks.

## Multimodal Models

Modern systems can connect:

- images,
- text,
- audio.

An image can be described linguistically.

A text prompt can guide image analysis.

This builds cross-modal representations.

## Grounding

Vision helps ground language.

The word:

red

can connect to visual patterns.

The word:

cup

can connect to objects in scenes.

This reduces purely text-internal semantics.

## Adversarial Vision

Small perturbations can fool visual classifiers.

This shows that learned representations may rely on features unlike human perception.

Robustness remains difficult.

## Distribution Shift

A system trained on sunny streets may fail in:

- snow,
- fog,
- unusual cities.

Real-world vision must handle changing conditions.

## Dataset Bias

If training data underrepresents certain environments or populations, performance can be uneven.

Perception systems inherit data bias.

This has practical and ethical consequences.

## Robotics

Robotics combines:

- perception,
- planning,
- control,
- actuation.

The robot must physically interact with the world.

Errors have real consequences.

## Sense–Plan–Act

A classical architecture is:

1. sense,
2. build world model,
3. plan,
4. act.

This works well in structured settings.

It can be too slow for dynamic environments.

## Reactive Robotics

Reactive systems link perception more directly to action.

Examples:

IF obstacle left → turn right.

This reduces planning overhead.

It can improve responsiveness.

## Subsumption Architecture

Rodney Brooks proposed **subsumption architecture**.

Simple behavior layers interact.

Higher-level behaviors can suppress or coordinate lower-level ones.

The approach challenged heavy symbolic world modeling.

## Intelligence Without Representation?

Brooks famously argued for embodied intelligence with minimal internal representation.

His slogan "the world is its own best model" captured the idea.

The strongest form remains debated.

## Localization

A mobile robot needs to know:

Where am I?

Localization estimates robot pose:

- position,
- orientation.

Sensors are noisy.

## Mapping

The robot may also need a map of:

- walls,
- obstacles,
- landmarks.

Mapping and localization interact.

## SLAM

**Simultaneous Localization and Mapping**, or SLAM, solves both problems together.

The robot estimates:

- its own trajectory,
- the map.

This is a central robotics problem.

## Uncertainty

Sensor readings are imperfect.

Robots often maintain probabilistic beliefs about state.

Bayesian estimation becomes practical control.

## Kalman Filters

Kalman filters estimate hidden state in systems with:

- linear dynamics,
- Gaussian noise.

Variants extend the idea to nonlinear systems.

They fuse noisy measurements.

## Particle Filters

Particle filters represent uncertainty using many sampled hypotheses.

They are useful for nonlinear, non-Gaussian state estimation.

Localization is one common application.

## Planning in Geometry

A robot must find collision-free paths.

This involves:

- configuration spaces,
- obstacles,
- motion constraints.

Planning becomes continuous geometry.

## Configuration Space

A robot arm with multiple joints has a high-dimensional configuration space.

A point represents one full joint configuration.

Motion planning becomes pathfinding through that space.

## Sampling-Based Planning

Algorithms such as:

- RRT,
- PRM

sample configuration space rather than exploring it exhaustively.

This makes high-dimensional planning tractable.

## Control

A plan specifies where to go.

Control determines how to move there.

Feedback corrects errors during execution.

## PID Control

A classic controller uses:

- proportional,
- integral,
- derivative

terms.

PID control is simple but powerful.

Many systems rely on it.

## Model Predictive Control

Model Predictive Control repeatedly:

- predicts future behavior,
- optimizes actions,
- executes the first action,
- replans.

It resembles receding-horizon reasoning.

## Manipulation

Robotic manipulation requires:

- grasping,
- force control,
- object modeling.

Hands are mechanically complex.

Human dexterity is difficult to reproduce.

## Grasp Planning

A robot must estimate:

- where to contact,
- how much force,
- whether the object will slip.

Vision and control must cooperate.

## Tactile Sensing

Touch provides information unavailable to vision.

Examples:

- pressure,
- texture,
- slip.

Robust manipulation often needs multimodal sensing.

## Embodiment

Robots reveal why embodiment matters.

A good controller can exploit:

- body geometry,
- passive dynamics.

Not all intelligence belongs in software.

## Soft Robotics

Soft robots use compliant materials.

Their bodies adapt naturally to contact.

Mechanical structure performs part of the control.

This is morphological computation again.

## Sim-to-Real

Robots are often trained in simulation.

The challenge is transferring learned behavior to physical hardware.

Differences in:

- friction,
- lighting,
- dynamics

can break policies.

## Domain Randomization

Vary simulation broadly.

Train under many conditions.

Then the real world becomes less surprising.

This is one strategy for transfer.

## Imitation Learning

Robots can learn from human demonstrations.

This reduces difficult exploration.

But demonstrations may be imperfect.

The system still needs generalization.

## Reinforcement Learning in Robotics

RL can learn:

- locomotion,
- manipulation,
- control.

But physical interaction is expensive and risky.

Sample efficiency matters greatly.

## Safety

A robot can:

- crash,
- injure,
- damage property.

Safety constraints cannot be treated like ordinary benchmark errors.

Real-world agency raises stakes.

## Human–Robot Interaction

A robot working with people needs:

- legible motion,
- predictable behavior,
- social awareness.

Optimal physical action may not be optimal social action.

## Autonomous Vehicles

Self-driving systems combine:

- perception,
- prediction,
- planning,
- control.

They illustrate the full agent loop under uncertainty.

## Prediction of Other Agents

A vehicle must predict:

- pedestrians,
- cyclists,
- drivers.

These agents have intentions.

Physical prediction becomes social prediction.

## Closed-Loop Evaluation

Vision accuracy alone is not enough.

A small perception error matters only if it affects action.

Robotic evaluation must consider the entire closed loop.

## Perception–Action Coupling

Perception is shaped by what the agent needs to do.

A robot does not need a perfect reconstruction of reality.

It needs sufficient information for action.

## Affordances in Robotics

Robots can represent objects in terms of possible actions:

- graspable,
- pushable,
- traversable.

This links Gibson's affordances to engineering.

## Active Perception

A robot can move to improve perception.

It may:

- change viewpoint,
- approach object,
- turn on a light.

Sensing itself becomes an action.

## Vision Is Not Passive

Active perception reinforces a major theme:

intelligence is not merely receiving data.

It is controlling information acquisition.

## The Philosophical Lesson

Computer vision and robotics show that intelligence becomes harder when symbols must connect to physical reality.

A successful embodied agent must integrate:

- perception,
- uncertainty,
- planning,
- control.

The world does not provide clean labels.

It pushes back.

## The Next Question

Robots are engineered.

But complex adaptive behavior can also emerge through:

- variation,
- selection,
- self-organization.

Can artificial systems evolve?

Can life-like behavior emerge computationally?

That leads to:

**Artificial Life and Evolutionary Computation.**
