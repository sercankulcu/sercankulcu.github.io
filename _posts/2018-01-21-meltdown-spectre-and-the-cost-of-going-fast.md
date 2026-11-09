---
title: 'Meltdown Spectre And The Cost Of Going Fast'
date: 2018-01-21
permalink: /posts/2018/01/meltdown-spectre-and-the-cost-of-going-fast/
tags:
  - security
  - hardware
  - computer-science
---

On January 3, 2018, Google Project Zero published details of two classes of vulnerabilities affecting almost every modern processor: Meltdown and Spectre. The coordinated disclosure involved Intel, AMD, ARM, the major operating system vendors, and cloud providers — a coordination effort that had been running secretly since June 2017 while patches were developed.

The vulnerabilities affect hardware that ships in hundreds of millions of computers. Understanding why requires understanding a processor optimization that has been in use for decades.

## Speculative execution

Modern processors do not execute instructions in simple sequential order. They predict which instructions will be needed and execute them ahead of time — before the program has determined whether they should actually run. This is speculative execution.

The classic example: when a program reaches a conditional branch (`if x > 0 { ... }`), the processor predicts which branch will be taken and begins executing that branch before evaluating the condition. If the prediction is correct, the result is already computed when needed — a speedup. If the prediction is wrong, the speculatively executed results are discarded, the processor reverts to the correct state, and execution continues from the correct branch.

Architecturally, the discarded speculative results leave no trace. The processor's visible state — registers, memory — is as if the speculation never happened.

The key word is *architecturally*.

## The side channel

What the speculative execution does leave a trace in is the processor's microarchitectural state — specifically, the cache. If speculative execution loads data into the cache, that data remains cached even after the speculatively executed instructions are discarded. The cache is not part of the architectural state that gets rolled back.

An attacker can measure what is in the cache by timing how long memory accesses take. A cache hit (data present in cache) takes approximately 4 nanoseconds. A cache miss (data must be fetched from RAM) takes approximately 100 nanoseconds. By timing a series of memory accesses, an attacker can infer which cache lines were populated by speculative execution — and thereby infer the data that was speculatively loaded.

This is the core of both attacks.

## Meltdown (CVE-2017-5754)

Meltdown exploits a race condition between speculative execution and access permission checks on Intel processors. The kernel maps its own memory into each process's virtual address space for efficiency (user processes need to reference kernel memory addresses for system calls). These kernel pages are marked inaccessible to user-mode code, and an access to them should cause a fault.

On affected Intel processors, speculative execution proceeds into kernel memory before the access check completes. The check does catch the access and raises a fault — architecturally, the read fails. But during the speculative window, the kernel data was loaded into cache. An attacker can use a timing side channel to infer the kernel data that was speculatively read.

Meltdown allows any unprivileged process to read kernel memory, including other processes' data and cryptographic keys.

**Mitigation:** Kernel Page Table Isolation (KPTI), also called PTI — separating the kernel's page table from user-mode page tables so kernel memory is not mapped at all during user-mode execution. This eliminates the speculative access window. Performance cost: significant for workloads with many system calls (database servers, certain I/O-intensive applications). Benchmarks published in January 2018 showed 5–30% degradation on affected workloads.

## Spectre (CVE-2017-5753, CVE-2017-5715)

Spectre is harder to exploit and harder to mitigate. It exploits speculative execution across privilege boundaries by training the processor's branch predictor to make incorrect predictions.

A variant 1 attack trains a branch predictor within one context and then exploits that prediction in a different context. The attacker can craft an input that causes a program — a web browser's JavaScript engine, for example — to speculatively execute code that reads out-of-bounds data. The read fails architecturally, but leaves a cache trace an attacker can observe.

Variant 2 poisons the branch target buffer — the predictor the processor uses for indirect jumps — causing speculative execution to jump to attacker-controlled code locations in kernel or other privileged contexts.

**Mitigation:** Spectre mitigations are more varied and ongoing. Retpoline is a compiler-level technique that replaces indirect jumps with a construction that avoids the branch prediction mechanism. Microcode updates add new instructions (IBPB, IBRS, STIBP) that flush or isolate predictor state at privilege transitions.

## The architectural lesson

For thirty years, software developers have generally been able to treat the processor as a deterministic machine: given the same inputs and the same architecture, a program produces the same outputs. Security models assumed that two programs could not observe each other's behavior if they ran in separate processes or privilege levels.

Speculative execution violates this assumption in a precise way. The timing of memory operations is observable, and that timing depends on microarchitectural state that crosses security boundaries. An architectural guarantee (access control) was respected while a microarchitectural side effect (cache population) was not.

The mitigations — KPTI for Meltdown, retpoline and microcode patches for Spectre — are software and firmware corrections applied to hardware that was designed, manufactured, and shipped before the problem was identified. This is an unusual situation: a performance optimization built into hardware over decades turned out to contain security assumptions that do not hold. The correction will never be complete in existing hardware; only new processor designs can address the root cause architecturally.
