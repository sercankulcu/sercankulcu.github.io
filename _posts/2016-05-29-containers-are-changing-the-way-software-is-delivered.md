---
title: 'Containers Are Changing The Way Software Is Delivered'
date: 2016-05-29
permalink: /posts/2016/05/containers-are-changing-the-way-software-is-delivered/
tags:
  - docker
  - containers
  - software
---

Deployment problems are often environment problems. A program works correctly on a developer's machine, then fails on a staging server because a library is a different version, a configuration file has a different path, or a system dependency is missing. Debugging these discrepancies is time-consuming and tedious because the mismatch can be anywhere in a large stack.

Docker, released publicly in March 2013 and reaching version 1.0 in June 2014, made containers accessible to mainstream software development. By May 2016 it has become the standard way to describe and ship application environments.

## What a container is, technically

A container is not a virtual machine. A virtual machine runs a complete operating system — kernel included — on top of a hypervisor. This isolation is thorough but comes with significant overhead: a full VM image is gigabytes, and startup time is measured in seconds to minutes.

A container shares the host operating system's kernel and uses two Linux kernel features to create isolation:

- **Namespaces** partition kernel resources — each container gets its own view of the process tree, network interfaces, filesystem mounts, and user IDs. A process inside a container cannot see or interact with processes in other containers or on the host.
- **cgroups** (control groups) limit how much CPU, memory, and I/O each container can use.

The result: a container can start in under a second, uses only the memory its processes actually consume, and an image might be tens of megabytes rather than gigabytes. A Docker image is a layered filesystem — each instruction in the Dockerfile adds a layer, and layers are shared between images that have common base layers.

## A minimal Dockerfile

A Dockerfile describes the environment as code:

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

`FROM` specifies the base image — in this case, an official Python image from Docker Hub, the public registry where Docker stores and distributes images. `RUN` executes a command during the build (the result is committed as a new layer). `CMD` specifies what runs when the container starts.

This Dockerfile can be built with `docker build` and run with `docker run`. The developer commits the Dockerfile alongside the code, and anyone who builds it gets the same environment — on a Mac, on Linux, on a CI server.

## Containers and microservices

Containers fit naturally with microservices architecture. Instead of deploying one large application, a system is built from smaller services that communicate over HTTP or message queues. Each service can be developed, deployed, and scaled independently — in its own container with its own dependencies, without interfering with other services.

The practical benefit in 2016 is that services can now use different language runtimes and library versions in the same system. A Python service and a Go service and a Node.js service can each run in their own container on the same host.

## The complexity that moves

Containers solve the "works on my machine" problem but create new questions. When containers need to communicate with each other, someone must configure networking between them. When a service should run on multiple machines for reliability or load, something must decide how many containers to start and where to place them — this is orchestration. Docker's own tool for this is Docker Compose (for local multi-container setups) and Docker Swarm (for clusters). Google's Kubernetes, which became open source in June 2014, is becoming the serious choice for production orchestration.

Persistent data is another question containers raise. A container's filesystem is ephemeral — it disappears when the container stops. Databases and file uploads need to be stored in volumes that persist outside the container lifecycle.

Technology rarely removes complexity. It usually moves it. Containers shift complexity from the deployment manual into the Dockerfile, the image registry configuration, and the orchestration layer. These are better places for complexity to live — they are explicit, version-controlled, and reproducible — but they are not nothing.

Repeatable environments are worth the effort. A developer who joins the project next year should be able to run the application without inheriting undocumented knowledge about what packages to install on their laptop.
