---
title: 'Software Bug Of Therac-25'
date: 2020-06-02
permalink: /posts/2020/06/software-bug-of-therac-25/
tags:
  - self-improvement
---

The Therac-25 is one of the most studied cases in software-engineering history because the consequences of the bugs it contained were not degraded performance or corrupted data. Patients received radiation doses hundreds of times above therapeutic levels. At least six people were seriously injured. Three died.

The machine was a computer-controlled radiation therapy device developed by Atomic Energy of Canada Limited (AECL) and introduced around 1982. It replaced the Therac-6 and Therac-20, earlier machines that had relied heavily on hardware safety mechanisms — independent interlocks that physically prevented dangerous operating states. The Therac-25 was designed to replicate these protections in software, which reduced manufacturing cost and complexity but transferred the safety responsibility to code.

## The race condition

The accidents that occurred between 1985 and 1987 were traceable to several problems, but the most technically specific was a race condition in the operator interface.

The Therac-25's control software ran on a single PDP-11 minicomputer. The operator entered treatment parameters, including the treatment mode (electron beam vs. X-ray), and then confirmed the settings. The machine had two operating modes: an electron mode that delivered the beam directly, and an X-ray mode that passed the beam through a target assembly to produce X-rays, then filtered the result. The X-ray mode required the target assembly to be in position and the beam current to be set appropriately.

The race condition arose from the timing of screen updates and data reading. If an operator typed quickly — setting parameters and then changing one of them before the software had finished processing the previous state — the machine could read a partially updated state that combined elements of two different configurations. In particular, it was possible to configure the machine in electron mode while the software believed it was set for X-ray mode. In X-ray mode, higher beam power is used because the target filters most of it. Applying X-ray-level power in electron mode, with no filtering, meant the patient received the full, unattenuated beam.

The bug involved a single-byte counter that overflowed from 255 to 0 and was used as a test for setup completion. When the counter overflowed, a flag was set incorrectly, and safety checks that should have stopped the machine were bypassed.

## The failure of error messages

When the machine delivered an overdose, it displayed an error message — "MALFUNCTION 54" — and paused, waiting for the operator to press a key to continue or abort the treatment. The message gave no indication of the severity of what had occurred. Operators had seen malfunction messages many times before; most were minor. The standard response was to clear the error and resume treatment.

In several accidents, operators did exactly this. They saw a malfunction code that looked like dozens of previous minor errors, cleared it, and continued. The machine delivered another overdose.

The error message design assumed that operators would interpret an ambiguous message conservatively. Under real working conditions, operators who had learned that most malfunction codes were trivial made the reasonable extrapolation that this one was too. The design did not account for how people actually respond to information.

## The organizational failures

Nancy Leveson and Clark Turner, who published a detailed analysis of the Therac-25 accidents in 1993, identified organizational factors alongside the software bugs.

AECL's investigation of early accidents concluded that operator error was responsible, partly because the software could not reproduce the fault in testing. Race conditions that depend on specific timing are often not reproducible in a test environment with different load and different operator speed. The company did not believe the software was at fault.

Hospitals that reported problems were told that no similar incidents had been reported elsewhere — which was not accurate. The distributed nature of the machine's deployment, combined with the difficulty of reproducing the fault, meant that the connection between multiple incidents at different sites was not made quickly.

## What the case established

The Therac-25 is cited in engineering ethics courses, safety-critical systems courses, and software engineering courses because it makes concrete several principles that are otherwise abstract.

Software cannot replace hardware safety mechanisms for life-critical systems without independent verification at least as rigorous as the hardware it replaced. Error messages in safety-critical systems must communicate severity, not just the existence of a problem. Testing must specifically include boundary conditions, race conditions, and sequences of operator input that reflect how operators actually use the system under real conditions.

Most fundamentally: when software controls a device that can physically harm a person, confidence in normal operation is not sufficient. The question must also be "what happens in abnormal operation?" — and the answer must come from careful analysis, not from the absence of complaints during testing.
