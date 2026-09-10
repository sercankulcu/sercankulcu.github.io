---
title: 'Docker And The Idea Of Portable Software'
date: 2015-02-22
permalink: /posts/2015/02/docker-and-the-idea-of-portable-software/
tags:
  - docker
  - software
  - devops
  - programming
---

One sentence has caused programmers pain for a very long time: "It works on my machine." Docker, which released version 1.0 last June and has grown quickly since then, is the most practical answer I have seen to this problem.

## Why "it works on my machine" is a real problem

A program depends on more than its source code. It may need a specific version of a language runtime. It may need certain libraries installed in specific locations. It may depend on environment variables, configuration files, or services running in the background. It may behave differently depending on the operating system version.

When a developer builds something on their laptop and then hands it to another person to run — or deploys it to a production server — every one of these dependencies is an opportunity for something to differ. The result is often hours of debugging to discover that the problem was a library version mismatch, or that a configuration step in the setup instructions was ambiguous.

Previous solutions tried to solve this problem in different ways. Configuration management tools like Chef and Puppet can automate the setup of a server, but they describe a process rather than a state, and they run on the host operating system rather than creating isolation. Vagrant, which creates virtual machines from descriptions, is closer to Docker's approach but uses full virtual machines that are heavier and slower to start.

## What Docker actually does

Docker uses Linux kernel features — specifically namespaces and control groups — to create isolated environments called containers. A container shares the host operating system's kernel but has its own filesystem, network, and process space. It cannot see or affect other containers or the host system unless explicitly allowed.

The isolation is not as complete as a virtual machine, but it is enough for most purposes and much lighter. A container starts in seconds rather than minutes. Many containers can run on the same machine with low overhead.

The key artifact is the **image** — a snapshot of the filesystem that a container starts from. An image is built from a `Dockerfile`, a text file that describes a starting point and then a sequence of commands:

```dockerfile
FROM ubuntu:14.04
RUN apt-get update && apt-get install -y python3 python3-pip
COPY requirements.txt /app/
RUN pip3 install -r /app/requirements.txt
COPY . /app/
WORKDIR /app
CMD ["python3", "server.py"]
```

This Dockerfile says: start from Ubuntu 14.04, install Python 3, install the project's dependencies, copy the application code, and set the default command to run the server. Anyone who builds this Dockerfile on any machine that can run Docker will get an environment with the same contents.

Images are also layered. Each instruction in a Dockerfile creates a layer. If two images share the same base — the same Ubuntu starting point, the same Python installation — those shared layers are stored once and reused. This makes images more efficient than they might first appear.

## Docker Hub and sharing

Docker Hub is a public registry where images can be published and shared, similar to GitHub for code. Official images for popular software — PostgreSQL, Redis, nginx, Node.js, many others — are already available. Instead of installing a database service on a development machine, a developer can run a database container, use it, and discard it when done.

This is useful for development environments but also for testing. Running a test suite against a fresh database container, then discarding it, gives the kind of clean, reproducible environment that is otherwise difficult to maintain.

## What Docker does not solve

Containers do not remove the need to understand what is inside them. A large, poorly maintained image with many dependencies can be harder to understand than a simple setup. Images need to be kept updated as dependencies change. Networking between containers adds concepts and configuration that take time to learn.

Persistent data is also a real consideration. A container's filesystem is temporary — it disappears when the container stops. Data that needs to persist, such as a database, requires volumes or other mechanisms to survive container restarts.

These are real limitations, but they are the right kind of limitations: specific, understandable, and solvable. The underlying idea — describe the environment as code, reproduce it reliably — addresses a problem that has made software deployment unnecessarily painful for years. That direction feels correct.
