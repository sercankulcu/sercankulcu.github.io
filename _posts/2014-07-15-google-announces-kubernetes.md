---
title: Google Announces Kubernetes
date: 2014-07-15
permalink: /posts/2014/07/google-announces-kubernetes/
tags:
  - cloud
  - software
  - distributed-systems
---

Google announced Kubernetes as an open-source project in 2014, drawing on its internal experience running large clusters with systems such as Borg. Kubernetes was designed to manage containers across many machines rather than treat each container as an isolated unit.

Its core idea was declarative desired state. A user described what should be running—such as three replicas of an application—and controllers continuously tried to make reality match that description. Pods grouped containers, Services provided stable network identities, and the scheduler placed workloads onto available nodes.

This control-loop model made failure recovery automatic: if a container or machine disappeared, Kubernetes could create replacements elsewhere. The project later became one of the foundations of cloud-native infrastructure.
