---
title: 'What Is Quantum Computing?'
date: 2020-12-08
permalink: /posts/2020/12/what-is-quantum-computing/
tags:
  - career
  - quantum
  - software
---

Quantum computing is often described as a technology that will make computers unbelievably fast. That description is too simple and somewhat misleading. A quantum computer is not a faster version of an ordinary computer for every task. It is a different model of computation that can offer major advantages for specific kinds of problems — and very little advantage for most of the things ordinary computers do every day.

## The basic concepts

Classical computers use bits: each bit holds either 0 or 1. Quantum computers use qubits. A qubit can exist in a superposition — a quantum state that is a combination of 0 and 1 simultaneously — until it is measured, at which point it collapses to a definite value. This is not the same as saying the qubit is "both 0 and 1 at once" in a classical sense; the superposition is a probability amplitude that describes what the measurement result will be.

Qubits can also become entangled, meaning the state of one qubit is correlated with another in a way that has no classical equivalent. Measuring one entangled qubit instantly determines the measurement outcome of its partner, regardless of physical distance.

Quantum algorithms exploit superposition and entanglement by carefully controlling interference — the quantum equivalent of wave interference — so that the computational paths leading to wrong answers cancel out, while paths leading to correct answers reinforce. The algorithm does not "try every answer at once." It engineers an interference pattern that amplifies the probability of measuring the correct answer.

## Algorithms with proven quantum advantages

**Shor's algorithm** (Peter Shor, 1994) solves integer factorization — finding the prime factors of a large number — exponentially faster than the best known classical algorithms. This matters because RSA public-key cryptography depends on the difficulty of factoring large numbers on classical computers. A sufficiently large fault-tolerant quantum computer could break RSA encryption for current key sizes. Sufficiently large is the key qualifier: current machines are nowhere near the required scale.

**Grover's algorithm** (Lov Grover, 1996) provides a quadratic speedup for unstructured search. To find one item in an unsorted list of N items, a classical computer needs O(N) operations; Grover's algorithm needs O(√N). This is useful but not transformative for most practical problems.

**Quantum simulation** is widely considered the application where quantum computers will first show undeniable real-world value. Classical computers struggle to simulate quantum systems — the full quantum state of even a few dozen particles requires exponential classical memory. Quantum hardware can naturally represent and evolve quantum states, which makes it potentially valuable for simulating molecular chemistry, discovering new materials, and drug discovery.

## Where the technology is in December 2020

Google announced "quantum supremacy" in October 2019 when its 54-qubit Sycamore processor completed a specific mathematical task in 200 seconds that Google claimed would take the world's fastest classical supercomputer 10,000 years. IBM disputed the claim, arguing their Summit supercomputer could complete the task in 2.5 days with different optimization. The disagreement is partly about what "the task" means, but the milestone marked a notable demonstration.

IBM's Falcon processor (27 qubits) and Hummingbird (65 qubits) are accessible through IBM Quantum Experience, a cloud service that allows researchers and developers to run quantum circuits on real hardware. IBM tracks progress through "quantum volume," a metric incorporating qubit count, connectivity, and error rates. Current machines have quantum volumes of 32–64.

The fundamental problem is noise. Qubits are fragile; thermal fluctuations, electromagnetic interference, and imperfect control signals introduce errors. Current devices are what researchers call NISQ — Noisy Intermediate-Scale Quantum — machines: 50–100 qubits with error rates too high for deep circuits. Quantum error correction can in principle make reliable logical qubits out of noisy physical qubits, but this requires roughly 1,000 physical qubits per logical qubit at current error rates. No machine close to that scale exists in December 2020.

The realistic near-term picture is hybrid computation: classical computers continue doing most work, while quantum processors are used for specific subroutines where they offer an advantage. Full large-scale fault-tolerant quantum computing — the kind that would threaten RSA — remains years to decades away. What attracts me to the field is not the promise of magical speed but the more fundamental question: what becomes computable when you change the physical rules of how information is processed.
