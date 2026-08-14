---
title: Meltdown and Spectre Expose CPU Speculation Risks
date: 2018-01-15
permalink: /posts/2018/01/meltdown-and-spectre-expose-cpu-speculation-risks/
tags:
  - hardware
  - computing
  - history
---

Meltdown and Spectre were publicly disclosed in January 2018, revealing that speculative execution in modern processors could leak information across security boundaries through side channels.

CPUs often execute instructions before they know whether those instructions are actually needed. If the speculation is wrong, architectural results are discarded, but microarchitectural effects—especially changes in CPU caches—can remain. Attackers can measure tiny timing differences to infer data that should have been inaccessible.

Meltdown mainly affected privilege separation on several Intel processors and could be mitigated with stronger page-table isolation. Spectre described broader techniques for manipulating branch prediction and affected processors from multiple vendors. The vulnerabilities were a reminder that security cannot be defined only by the instruction-set specification; hidden performance mechanisms can become observable.
