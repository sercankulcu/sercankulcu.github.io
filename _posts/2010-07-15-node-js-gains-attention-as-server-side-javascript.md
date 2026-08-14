---
title: Node.js Gains Attention as Server-Side JavaScript
date: 2010-07-15
permalink: /posts/2010/07/node-js-gains-attention-as-server-side-javascript/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Node.js was still young in 2010, but developers were rapidly noticing its unusual approach to server programming: JavaScript running outside the browser on Google's V8 engine with asynchronous, event-driven I/O.

Instead of creating a blocking thread for every network request, Node encouraged callbacks and a single event loop to coordinate many concurrent operations. This model was especially effective for workloads that spent much of their time waiting for databases, files, or network responses rather than performing heavy CPU calculations.

The design also changed JavaScript's role. A language associated mainly with browser interfaces could now be used for servers, command-line tools, build systems, and eventually desktop applications. The npm package ecosystem grew around Node and became one of the largest software registries in the world.
