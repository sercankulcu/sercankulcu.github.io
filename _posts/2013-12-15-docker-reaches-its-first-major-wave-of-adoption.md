---
title: Docker Reaches Its First Major Wave of Adoption
date: 2013-12-15
permalink: /posts/2013/12/docker-reaches-its-first-major-wave-of-adoption/
tags:
  - cloud
  - software
  - distributed-systems
---

Docker gained major developer attention in 2013 by making Linux containers far easier to build, distribute, and run. Containers were not a new kernel technology; Linux already had namespaces and control groups. Docker packaged those primitives into a practical workflow.

Namespaces isolate process IDs, networks, mounts, and other resources, while cgroups limit and account for CPU and memory use. Docker added layered images, a registry, a simple command-line interface, and repeatable image builds. A container could therefore bundle an application and its user-space dependencies without carrying a full guest operating system.

That lightweight packaging changed deployment practices. Developers could run nearly the same environment on a laptop, test server, or production host, reducing “works on my machine” problems and preparing the way for container orchestration systems such as Kubernetes.
