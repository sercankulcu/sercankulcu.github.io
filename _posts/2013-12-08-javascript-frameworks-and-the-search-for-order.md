---
title: 'JavaScript Frameworks And The Search For Order'
date: 2013-12-08
permalink: /posts/2013/12/javascript-frameworks-and-the-search-for-order/
tags:
  - javascript
  - web
  - software
---

JavaScript applications are becoming large enough that writing everything as a collection of event handlers is no longer comfortable. The browser now hosts email clients, dashboards, editors, social applications, and many interfaces that behave more like desktop software than traditional pages.

This growth has created a search for structure.

Backbone.js offers a relatively small set of ideas for models, views, and routing. AngularJS takes a more ambitious approach with data binding, directives, controllers, and dependency injection. Ember.js has its own conventions for building larger applications. Each framework is trying to answer the same basic question: how do we stop a growing JavaScript application from becoming a pile of connected callbacks?

I find the competition useful and confusing at the same time. A developer can spend so much time comparing frameworks that the original application never gets built. Every tool has enthusiastic supporters, and every tool seems to have a list of problems written by people who left it for another one.

The deeper lesson is that front-end development now needs software architecture. When pages were mostly documents with a little behavior, structure could remain simple. When the browser becomes the application, state, navigation, data synchronization, testing, and component organization become serious design problems.

Frameworks can reduce repetitive work, but they also create dependence. Learning the framework can become almost as important as learning JavaScript itself. If the tool changes or loses popularity, some of that knowledge may age quickly.

I prefer to understand the problem before becoming loyal to the solution. Why does data binding help? Why should views be separated from models? What problem does routing solve inside a single-page application? These ideas survive longer than one library version.

The JavaScript ecosystem is moving quickly in 2013. That makes it exciting, but it also makes patience useful. Not every new framework needs to become part of the next project.
