---
title: Node.js Gains Attention as Server-Side JavaScript
date: 2010-07-15
permalink: /posts/2010/07/node-js-gains-attention-as-server-side-javascript/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Ryan Dahl created Node.js and first presented it at JSConf EU on November 8, 2009, releasing version 0.1.100 that evening. By mid-2010, it had attracted significant developer attention following the release of Express.js (the first major web framework for Node, June 2010) and the creation of npm (Node Package Manager, January 2010) by Isaac Schlueter. Node 0.2 shipped in August 2010, stabilizing the API enough for production experiments. Microsoft, Joyent (which hired Dahl and was paying for the project), and Heroku were all actively supporting or evaluating Node deployments by late 2010.

Node's architectural novelty was running a single-threaded event loop backed by libuv's non-blocking I/O — the same pattern Nginx had used for HTTP serving since 2004, but exposed as a JavaScript programming model. A PHP or Rails application typically allocated one OS thread per request, blocking that thread while waiting for a database query or file read; Node handled thousands of concurrent connections in one thread by registering callbacks that fired when I/O completed, never blocking execution. This "C10K problem" handling was significant when most web servers struggled above a few hundred concurrent connections; Node could sustain 10,000+ with modest memory.

The trade-off was callback complexity: deeply nested asynchronous callbacks became difficult to read and reason about — "callback hell." The community developed patterns (promises, then async/await in ES2017) to manage it. npm's growth was the larger story: by 2015 it was the largest software registry in the world by package count, hosting over 200,000 packages; by 2020 it had over 1.3 million packages. The npm ecosystem became the default dependency system for JavaScript tooling even outside Node — webpack, Babel, TypeScript, and browser-side build tools all distributed through npm — making Node infrastructure for an entire programming ecosystem beyond server-side applications.
