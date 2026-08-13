---
title: 'Containers Are Changing The Way Software Is Delivered'
date: 2016-05-29
permalink: /posts/2016/05/containers-are-changing-the-way-software-is-delivered/
tags:
  - docker
  - containers
  - software
---

Docker has made the word "container" common in software development. The basic idea is attractive because deployment problems often come from differences between environments. A program works on one machine, then behaves differently on a server because a library, configuration, or dependency is not the same.

A container packages an application with much of what it needs to run. It does not behave exactly like a full virtual machine. Containers usually share the host operating-system kernel, which makes them lighter and faster to start than traditional virtual machines.

This changes the way developers can think about environments. Instead of writing a long document explaining which packages to install, we can describe the environment in a Dockerfile. That description can become part of the project itself and can be version controlled beside the code.

Containers also fit well with microservices, another architecture that is receiving a lot of attention. A large application can be divided into smaller services, and each service can be packaged independently. This sounds clean, but it also moves complexity into networking, monitoring, deployment, and service coordination.

That is an important reminder. Technology rarely removes complexity completely. It usually moves complexity to another place. A container can solve the "works on my machine" problem and create new questions about images, registries, persistent data, and orchestration.

I still find the direction useful. Repeatable environments are valuable even for small projects. A future developer should be able to understand how the application runs without depending on hidden knowledge stored in one person's laptop.

Good software is not only code that works. It is also software that another machine and another person can reproduce.
