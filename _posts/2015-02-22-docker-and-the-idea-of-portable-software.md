---
title: 'Docker and the Idea of Portable Software'
date: 2015-02-22
permalink: /posts/2015/02/docker-and-the-idea-of-portable-software/
tags:
  - docker
  - software
  - devops
  - programming
---

One sentence has caused programmers pain for a very long time:

"It works on my machine."

A program depends on more than its source code. It may need a certain library version, a service, a configuration file, or a particular operating system setting. Moving software from one computer to another can turn a working project into a collection of mysterious errors.

This is why I find Docker interesting.

Containers offer a practical way to package an application together with much of the environment it needs. Instead of describing twenty setup steps and hoping another machine looks the same, we can describe the environment more directly.

The idea feels simple after you understand it: make the program's surroundings easier to reproduce.

Of course, Docker is not magic. Containers add their own concepts and problems. Images can become large. Networking can be confusing. Data still needs careful handling.

But the direction is useful.

Software development is becoming more connected to deployment. Writing code is only one part of the job. We also need to think about where the code will run and how another person can reproduce the same environment.

I especially like tools that remove "special knowledge" from one machine.

If a project only works because one developer remembers five hidden setup steps, the project is fragile.

Turning those steps into something repeatable makes the software less dependent on memory.

That feels like progress.
