---
title: Docker Reaches Its First Major Wave of Adoption
date: 2013-12-15
permalink: /posts/2013/12/docker-reaches-its-first-major-wave-of-adoption/
tags:
  - cloud
  - software
  - distributed-systems
---

Docker was released as an open-source project on March 20, 2013 by Solomon Hykes in a five-minute lightning talk at PyCon US, presented as an internal tool from dotCloud (a platform-as-a-service company). The GitHub repository went from 0 to 6,700 stars within six months, an unusually fast adoption curve for infrastructure tooling. By December 2013, Docker had attracted commitments from Red Hat (including Docker in RHEL), Google (integrating Docker with GCE), IBM, Rackspace, and Amazon Web Services (announcing Docker support on EC2), establishing it as the emerging standard for Linux container packaging even before version 1.0.

The technical innovation was layering and distribution on top of existing Linux kernel primitives. Linux namespaces — available since kernel 2.6.24 (2008) — isolate a process's view of the system: process IDs, network interfaces, mount points, hostname, and inter-process communication each had their own namespace. Control groups (cgroups, added in kernel 2.6.24) limited and accounted for a group of processes' CPU, memory, disk I/O, and network usage. LXC (Linux Containers) had used these since 2008, but required complex manual configuration. Docker wrapped them in a Dockerfile build format, a union file system for layered images (AUFS initially, so an image layer could be shared between containers using the same base), and a registry (Docker Hub) for distributing images. `docker build`, `docker push`, `docker pull`, `docker run` were the entire operational vocabulary for packaging an application and all its Linux userspace dependencies into a portable artifact that ran identically on a developer laptop or a production server.

This solved the “it works on my machine” problem at the OS dependency level, not just the language package level. A Node.js app requiring specific npm packages and a particular glibc version could be frozen into a Docker image that ran identically from a MacBook running Docker in a Linux VM to a production Ubuntu server. dotCloud renamed itself Docker Inc. in October 2013. Docker 1.0 (“production ready”) shipped June 9, 2014, by which point Docker Hub hosted over 14,000 public images and the Docker community had driven development far beyond what dotCloud had originally built. The container image format Docker established — layered union filesystem snapshots with a manifest — became the basis for the OCI (Open Container Initiative) standard formalized in 2015.
