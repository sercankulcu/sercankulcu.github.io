---
title: Kubernetes 1.13 Strengthens Cloud-Native Infrastructure
date: 2018-12-15
permalink: /posts/2018/12/kubernetes-1-13-strengthens-cloud-native-infrastructure/
tags:
  - cloud
  - software
  - distributed-systems
---

Kubernetes 1.13 was released in December 2018 with kubeadm declared generally available. Kubeadm provided a supported way to bootstrap a Kubernetes control plane and join worker nodes without hiding the cluster behind a vendor-specific installer.

The release also continued work on container storage through the Container Storage Interface. CSI separated Kubernetes from individual storage implementations, allowing vendors to write standardized drivers rather than patch core Kubernetes code.

These features were less visible than a new user interface, but they mattered for production adoption. A platform becomes infrastructure when installation, upgrades, networking, storage, security, and recovery are predictable enough for other systems to depend on it.
