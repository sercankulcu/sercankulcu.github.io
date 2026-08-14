---
title: Docker Announces Built-In Swarm Mode
date: 2016-06-15
permalink: /posts/2016/06/docker-announces-built-in-swarm-mode/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Docker announced a redesigned Swarm mode at DockerCon in June 2016, integrating cluster orchestration directly into the Docker Engine rather than requiring a separate orchestration product.

A group of Docker hosts could form a swarm, elect manager nodes through the Raft consensus algorithm, and schedule replicated services across workers. Desired-state configuration meant an operator could request a number of replicas and let the system replace failed tasks automatically. Built-in service discovery and mutual TLS reduced the amount of external infrastructure needed for a basic cluster.

Swarm mode showed how quickly container tooling had moved beyond packaging. The difficult problem was now coordinating many containers across unreliable machines. Kubernetes ultimately won the larger orchestration ecosystem, but Swarm made those distributed-systems ideas accessible through familiar Docker commands.
