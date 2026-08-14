---
title: Docker Introduces the Moby Project
date: 2017-04-15
permalink: /posts/2017/04/docker-introduces-the-moby-project/
tags:
  - cloud
  - software
  - distributed-systems
---

Docker announced the Moby Project in April 2017 to separate the open-source building blocks of its container platform from the commercially packaged Docker product.

Moby provided components for image building, container execution, networking, orchestration, and other low-level functions that could be assembled into different container systems. Docker itself would use those components to produce its desktop and enterprise products.

The change caused confusion because many developers had treated “Docker” as both a company, a product, a command-line tool, an image format, and an open-source project. Moby was an attempt to clarify those layers. It also reflected how mature container infrastructure had become: the ecosystem was no longer one monolithic tool but a collection of interchangeable runtimes, image builders, registries, and orchestration systems.
