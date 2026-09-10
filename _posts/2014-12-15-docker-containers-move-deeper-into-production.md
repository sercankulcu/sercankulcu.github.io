---
title: Docker Containers Move Deeper Into Production
date: 2014-12-15
permalink: /posts/2014/12/docker-containers-move-deeper-into-production/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Docker had released version 1.0 in June 2014 — its first production-ready release — and by December 2014 adoption was accelerating past developer experimentation into actual production deployments. Docker Hub, the public registry, hosted over 60,000 images by the end of 2014. Major cloud providers were integrating Docker support: Amazon ECS (Elastic Container Service) launched in November 2014 as Amazon's first managed container service, and Google Container Engine (later renamed GKE) launched in beta in November 2014 built on Kubernetes, which Google had open-sourced in June.

Docker's Union File System (UnionFS) layering was the core efficiency advantage: a container image consisted of read-only filesystem layers, with each Dockerfile instruction creating a new layer. Images with the same base layer (ubuntu:14.04, node:0.10) shared those layers in the local Docker cache and on registries, reducing disk space and pull times for teams running many related services. Linux namespaces (PID, network, IPC, mount, UTS) isolated container processes from each other and the host, while cgroups limited CPU, memory, I/O, and network bandwidth per container — the same kernel mechanisms OpenVZ and LXC had used, but with a dramatically simpler toolchain.

Production deployments exposed the gaps Docker itself did not fill: connecting containers across multiple hosts required manual configuration or a separate overlay network tool (Weave and Flannel emerged for this); service discovery (knowing the current IP and port of a running service) had no Docker-native solution; secrets (API keys, database passwords) had to be passed as environment variables, which leaked into docker inspect output; and replacing a failed container meant a restart policy but not health checking against application readiness. These gaps — networking, service discovery, scheduling across a cluster, health checks, and secrets management — created the demand for orchestration tools: Apache Mesos (from Twitter/Airbnb), Docker Swarm (announced December 2014), and Kubernetes, which emerged as the dominant solution by 2017.
