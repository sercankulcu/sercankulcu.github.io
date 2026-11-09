---
title: 'JavaScript Is Growing Up'
date: 2010-07-25
permalink: /posts/2010/07/javascript-is-growing-up/
tags:
  - javascript
  - web
  - programming
---

JavaScript once felt like the language used for small tricks inside a web page — validate a form, open a popup, change an image on hover. The serious programming happened on the server. JavaScript was often treated as a detail that backend developers delegated to someone else, or worked around entirely.

That picture is changing in 2010, and changing faster than most people expected.

## What has shifted

Google Maps (2005) and Gmail (2004) were early demonstrations that JavaScript could support applications, not just pages. Both relied on XMLHttpRequest — asynchronous communication with a server without reloading the page — to create experiences that felt more like desktop software than a web document. That approach, named Ajax in a 2005 essay by Jesse James Garrett, established that the browser could be an application container.

jQuery, released in 2006 by John Resig, made browser differences manageable. Internet Explorer 6, Firefox, Safari, and Chrome each implemented the DOM differently; jQuery provided a consistent API that worked across all of them. By 2010 it has become the standard starting point for any JavaScript project, and the phrase "write less, do more" captures what it delivered.

ECMAScript 5, finalized in December 2009, added features the language had been missing: `Array.prototype.forEach`, `Object.create`, strict mode to disable some of the worst quirks, and native JSON parsing (`JSON.parse`). The standard took years to reach full browser implementation, but it signals that the language itself is being taken seriously again.

## Node.js and the server

The stranger development is Node.js, created by Ryan Dahl and announced at JSConf EU in November 2009. It runs JavaScript outside the browser using Google's V8 engine — the same engine that made Chrome's JavaScript dramatically faster when Chrome launched in 2008. Node uses an event-driven, non-blocking I/O model that makes it well-suited for network applications handling many simultaneous connections, the kind of workload that can block conventional thread-per-request servers.

The possibility of using the same language on client and server is being discussed as a genuine advantage, not a novelty. Code that validates data could run on both sides. Templates could render in the browser or on the server. This is still early, but the direction is clear.

## The honest problems

JavaScript has historical decisions that cannot be undone because too much of the web depends on compatibility. Type coercion produces results like `[] + {}` evaluating to `"[object Object]"`. Global variables can collide silently. `this` behaves differently depending on how a function is called.

Douglas Crockford's 2008 O'Reilly book *JavaScript: The Good Parts* is worth reading because it takes the language seriously enough to say which parts to avoid and why. The book is short partly because Crockford chose not to document the bad parts. That kind of discipline is what larger JavaScript programs need.

The web gives JavaScript one advantage that no other language can replicate: it runs in every browser without requiring users to install anything. A program written in JavaScript reaches more users more easily than any equivalent native application. That accessibility is not a technical virtue, but it is a powerful one. Technologies that benefit from network effects tend to improve faster because more people are using them, writing about them, and building tools for them.

JavaScript was designed in ten days in 1995 for a young web. Fifteen years later it is being asked to support applications that a browser of 1995 could not have run at all. That is a strange success story, and it is probably not finished.
