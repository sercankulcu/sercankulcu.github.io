---
title: 'Can Simulations Teach Us About Reality?'
permalink: /nature/063-can-simulations-teach-us-about-reality/
chapter: 4
chapter_title: 'Knowing and the Philosophy of Science'
order: 63
tags:
   - simulation
   - models
   - computation
   - epistemology
   - scientific-method
---

A simulation can create a hurricane on a screen.

A galaxy.

An epidemic.

A protein.

A nuclear collision.

A climate.

None of these simulated objects is the physical thing itself.

The simulated hurricane does not make the computer wet.

The simulated supernova does not explode the laboratory.

Yet simulations can teach us real things about hurricanes and supernovae.

How?

Because the simulation can preserve relevant structure.

Its epistemic value depends on the connection between model and world.

## A Simulation Is an Executed Model

A simulation begins with a model.

The model contains:

- variables,
- rules,
- equations,
- parameters,
- initial conditions,
- boundary conditions.

The computer then evolves that representation.

So a simulation does not escape the map-territory distinction.

It is a map in motion.

The question is whether the moving map preserves the relationships we care about.

## Simulation Does Not Create Evidence Automatically

Suppose a climate model predicts warming.

The output is not independent evidence merely because millions of calculations produced it.

The model was built using physical laws and empirical parameters.

Its projection derives from those assumptions.

The evidential force comes from how well the model has been tested against observations and how robust the result is across validated models.

Simulation output must inherit credibility.

## Verification First

Before asking whether a simulation represents reality, ask:

**Did the program correctly implement the model?**

This is verification.

Researchers test:

- code correctness,
- conservation laws,
- numerical convergence,
- benchmark cases,
- analytic solutions where available.

A coding error can produce physically persuasive nonsense.

## Validation Second

Then ask:

**Does the model represent the relevant real system adequately?**

This is validation.

A weather model can be compared with observed weather.

A fluid code can be compared with wind-tunnel experiments.

A particle simulation can be compared with detector data.

Validation connects computational behavior to nature.

## Calibration

Many simulations contain parameters that must be estimated.

Researchers calibrate them using observations or experiments.

This can improve realism.

But calibration creates a danger.

A highly flexible model may fit past data without genuinely capturing mechanism.

The strongest simulations should perform well on observations not used for calibration.

## Out-of-Sample Testing

If a model is tuned to one dataset, test it on another.

Predict a different region.

A different time.

A different experiment.

A different variable.

Success outside the calibration data provides stronger evidence that the model captured transferable structure rather than merely memorizing details.

## Hindcasting

Climate science often uses **hindcasting**.

A model is initialized in the past and asked to reproduce later conditions already observed.

This tests whether known physics and parameterizations can reconstruct historical behavior.

Hindcasting is not the same as future prediction because the past data may influence model development.

But carefully designed hindcasts remain valuable validation tools.

## Ensemble Simulations

One simulation run is often not enough.

Initial conditions may be uncertain.

Some processes may be stochastic.

Researchers therefore run **ensembles**.

Slightly vary:

- initial state,
- parameter values,
- random seeds.

The spread of outcomes reveals sensitivity and uncertainty.

Science learns from distributions, not one visually impressive movie.

## Robustness

A conclusion is more credible if it survives reasonable modeling choices.

Different numerical methods.

Different grid sizes.

Different parameterizations.

Different initial conditions.

If the qualitative result persists, confidence increases.

This is **robustness analysis**.

A fragile result may reflect an artifact of one implementation.

## Grid Dependence

Many simulations divide continuous space into discrete cells.

A coarse grid may miss small structures.

A fine grid is computationally expensive.

Researchers test whether results converge as resolution improves.

If the answer changes dramatically every time the grid is refined, the simulation has not yet stabilized.

## Parameterization

Some processes occur below the resolution of a model.

Climate models cannot simulate every cloud droplet.

Galaxy simulations cannot resolve every star in every cosmological volume.

These unresolved processes are represented through **parameterizations** or subgrid models.

Such approximations are scientifically necessary.

They also create model uncertainty.

## Emergence in Simulation

Simulations can reveal structures not explicitly programmed at the high level.

A programmer writes local gravitational rules.

Galactic spirals emerge.

A flocking model specifies local responses.

Collective motion appears.

This can teach us that certain macroscopic structures are consequences of simpler interactions.

The pattern is not hand-coded even though the rules are.

## Does Emergence Prove the Mechanism?

No.

If a simulation produces a pattern resembling reality, that shows the mechanism is **sufficient** under the model assumptions.

It does not prove the mechanism is uniquely responsible in nature.

Different models can sometimes produce similar patterns.

This is a form of underdetermination.

Similarity is evidence, not proof.

## Multiple Realizability

A macroscopic pattern may arise from different microscopic mechanisms.

Network clustering.

Power laws.

Oscillations.

Pattern formation.

If multiple models reproduce the same visible structure, matching the pattern alone cannot identify the true mechanism.

Scientists need additional discriminating observations.

## The Danger of Visual Realism

Modern simulations can look spectacular.

Clouds swirl.

Galaxies collide.

Fluids splash.

The image can create psychological confidence.

But visual realism is not scientific validation.

A beautiful animation may use incorrect physics.

A crude plot may represent a highly accurate calculation.

Appearance and truth are different dimensions.

## Agent-Based Models

Some simulations represent individual agents.

Each agent follows local behavioral rules.

The system then develops collective behavior.

Agent-based models are used for:

- epidemics,
- traffic,
- markets,
- ecology,
- social systems.

They are especially useful when heterogeneity and interaction matter.

But assumptions about agent behavior can dominate results.

## Molecular Dynamics

Molecular dynamics simulates atoms moving according to specified force models.

It can reveal:

- folding,
- diffusion,
- phase behavior,
- molecular interactions.

The method connects microscopic dynamics to macroscopic properties.

But accuracy depends on the force field or quantum approximation used.

Again, computation is only as physical as the model beneath it.

## Cosmological Simulation

Cosmological simulations start from early density fluctuations and evolve matter under gravity and other physics.

They generate:

- dark-matter halos,
- filaments,
- galaxies,
- clusters.

Agreement with observed large-scale structure is an important success of the standard cosmological framework.

Disagreement can reveal missing baryonic physics, numerical limitations, or problems with the underlying theory.

## Simulation as Counterfactual Laboratory

Simulations can explore worlds we cannot physically create.

What if the cosmological constant were larger?

What if this gene were removed?

What if a hurricane took another track?

What if an epidemic intervention began earlier?

These counterfactuals help scientists reason about causality and sensitivity.

But the conclusions remain conditional on the model.

## Impossible Experiments

Some physical experiments are impossible.

We cannot create another Earth.

We cannot rerun the Big Bang.

We cannot wait billions of years to watch galaxy evolution.

Simulation gives access to otherwise unreachable regimes.

This makes it indispensable in historical and large-scale sciences.

## Dangerous Experiments

Some experiments would be unethical or dangerous.

Pandemic spread.

Nuclear accidents.

Climate interventions.

Simulation can explore consequences without causing harm.

This does not eliminate uncertainty.

It changes the ethical and practical boundary of experimentation.

## Repeated Worlds

A simulation also lets scientists repeat a system.

Change one parameter.

Run again.

This is impossible for many natural phenomena.

We only have one actual Earth and one observable cosmic history.

Computation can create controlled counterfactual ensembles.

The advantage is enormous.

The limitation is equally clear:

the repeated worlds are models, not new universes.

## Simulation and Explanation

A simulation can show **that** a pattern emerges.

It may not explain **why**.

Suppose a model produces oscillations.

Scientists still seek a conceptual explanation:

feedback loop,
instability,
resonance,
phase transition.

Simulation can produce phenomena faster than understanding catches up.

Theoretical compression remains valuable.

## Simulation and Prediction

A validated simulation can make predictions.

Weather models predict storms.

Engineering simulations predict structural failure.

Cosmological models predict distributions.

The predictive success of a simulation supports the underlying model.

But prediction should include uncertainty.

A precise-looking output with no uncertainty is often misleading.

## Model Ensembles

Climate science and other fields use multiple models.

Why not choose the single best one?

Because structural uncertainty matters.

Different models make different approximations.

If many independently constructed models agree on a broad result, that agreement can be informative.

If they diverge, the spread reveals uncertainty.

## Can Simulation Replace Experiment?

Usually no.

Simulation can reduce the number of physical experiments needed.

It can guide them.

It can interpret them.

But unless the underlying model is already independently established, simulation cannot fully replace empirical contact.

A simulated drug cannot establish clinical safety.

A simulated particle cannot establish existence.

Nature remains the final constraint.

## Can Experiment Replace Simulation?

Also no.

Modern experiments often generate data too complex to interpret without simulation.

Particle detectors need simulated detector responses.

Astronomers need simulated structure formation.

Engineering experiments need numerical models to generalize beyond tested cases.

The two methods increasingly depend on each other.

## Epistemic Circularity

A danger appears when a model is calibrated using data and then praised because it reproduces those same data.

This is partly circular.

The remedy is independent testing.

Use one dataset to build.

Another to test.

Seek new predictions.

Compare multiple observables.

Scientific credibility increases when the model succeeds where it was not forced to.

## Simulation and Reality

So can simulations teach us about reality?

Yes—when:

- the underlying model is independently justified,
- implementation is verified,
- parameters are constrained,
- outputs are validated,
- uncertainty is quantified,
- conclusions are robust,
- predictions survive new observations.

Simulation is not reality.

But neither is a telescope image.

Both are mediated representations whose reliability depends on a chain of tested relationships.

## The Deeper Lesson

Scientific knowledge often comes from structures we cannot see directly.

Equations.

Models.

Algorithms.

Representations.

Their value does not depend on visual resemblance.

It depends on whether the relationships they encode survive contact with nature.

The map can teach us about the territory precisely because it is not the territory.

## From Simulation to Reasoning

We have now examined three modes of scientific inquiry:

theory,
experiment,
computation.

All three depend on reasoning.

But reasoning itself comes in different forms.

Sometimes we derive consequences with certainty.

Sometimes we generalize from examples.

Sometimes we infer the best explanation.

These are not the same intellectual operation.

So the next question is:

**What is the difference between deduction, induction, and abduction?**
