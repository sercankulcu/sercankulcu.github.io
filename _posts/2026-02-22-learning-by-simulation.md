---
title: 'Learning by Simulation'
date: 2026-02-22
permalink: /posts/2026/02/learning-by-simulation/
tags:
  - education
  - simulation
  - algorithms
  - teaching
---

Some ideas become easier the moment they start moving. A static diagram can explain a binary search tree, but watching a node rotate during an AVL rebalancing — seeing the pointers change in sequence — creates a different kind of understanding. A paragraph can describe a CPU scheduling algorithm, but watching processes arrive, wait in the queue, and get CPU time in a step-through simulation makes the policy feel concrete rather than abstract.

This is why I find small interactive simulations useful in teaching, and why I keep building them.

## What a simulation provides that a diagram cannot

Algorithms are processes. They happen step by step across time, and the important content is often in the transitions — the moment when a pointer changes, when an element swaps position, when a path extends toward the goal — not in the before and after state. A static diagram captures two frames. A simulation captures all of them, and lets the student control the speed.

The tools that do this well tend to be simple ones. VisuAlgo (visualgo.net) provides step-by-step animations for sorting, graph algorithms, and data structure operations. Red Blob Games (redblobgames.com), Amit Patel's site, gives interactive explanations of pathfinding and hex grids where sliders and clicks change the example in real time. These work not because of impressive production values but because the interaction is tightly connected to the concept being explained.

The student who clicks "add node 7" and watches it descend through a BST — turning left at 12, right at 3, landing at 5 — has traced one insertion themselves. The student who reads "smaller values go left, larger values go right" has read one sentence. Both pieces of information are present in both experiences, but the physical act of following the process seems to leave a different kind of trace.

## What students can ask

A passive explanation can only say what the teacher decided to show. A simulation lets students ask "what if?" — what if the list is already sorted when I run insertion sort? What if I remove the edge between these two nodes? What if I change the heuristic to Manhattan distance instead of Euclidean?

These are not always questions the teacher planned for, and that is the point. When a student changes something unexpected and the simulation responds, they are doing a small experiment. If the result surprises them, they ask why. That "why" is more valuable than the explanation they were given, because it comes from their own curiosity about a specific case they constructed.

## The design constraint

There is a temptation to add more: more colors, more buttons, more options, more animation. This usually makes the simulation worse. The student now has two things to learn — the concept, and the tool — and the tool's complexity competes with the concept for attention.

The useful test: if a student can explain back to me what the simulation showed after using it for three minutes, the simulation is doing its job. If they need five minutes just to figure out which button to press, it is not.

## What building a simulation teaches

Turning a concept into a working interactive explanation requires deciding what the important steps are. You cannot animate everything; you have to choose which transitions to show and which to skip. Making that choice forces a kind of clarity that explaining in words does not always require. I have understood my own explanations better after building the tool for them — not because the tool taught me something, but because the constraint of specifying every step in code exposed places where my mental model was vague.

This is probably the more general lesson: anything that forces you to make your understanding explicit will expose the parts that are not yet fully formed. Writing code is one version of this. Building a simulation is another.
