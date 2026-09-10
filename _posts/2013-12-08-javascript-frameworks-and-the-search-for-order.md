---
title: 'JavaScript Frameworks And The Search For Order'
date: 2013-12-08
permalink: /posts/2013/12/javascript-frameworks-and-the-search-for-order/
tags:
  - javascript
  - web
  - software
---

JavaScript applications have grown large enough that writing them as a collection of event handlers is no longer comfortable. Gmail, Google Maps, Trello, and similar applications live entirely in the browser and behave like desktop software: state changes without page loads, data synchronizes with a server in the background, and user interactions update multiple parts of the interface simultaneously. Managing this complexity in unstructured JavaScript produces code that becomes difficult to understand and modify after a certain size.

This has created a search for structure, and in 2013 that search has produced several competing frameworks, each with a different answer.

## The current landscape

**Backbone.js** (Jeremy Ashkenas, 2010) is the most minimal of the major frameworks. It provides Models (data with events), Collections (arrays of models), Views (that render HTML and listen to model events), and a Router for mapping URLs to application states. Backbone makes few decisions for you and requires more code for common patterns, but it is easier to understand and debug than more opinionated systems.

**AngularJS** (Google, 2010) takes the opposite approach: ambitious, opinionated, and comprehensive. Its core idea is two-way data binding — changes to a model automatically update the view, and changes to the view (through user input) automatically update the model. Directives allow extending HTML with custom attributes and elements. Dependency injection wires components together. AngularJS produces more structured applications with less plumbing code, but has a steeper learning curve and a vocabulary (directives, scopes, services, providers) that requires time to internalize.

**Ember.js** (Yehuda Katz, 2011) follows a "convention over configuration" approach inspired by Rails. It makes strong choices about routing, state management, and component structure, which reduces decision fatigue but requires accepting those choices. It has the smallest community of the three but arguably the most coherent opinionated model.

Facebook released React in May 2013 — only seven months ago. Its approach is different from all of the above: instead of two-way data binding or a full MVC framework, React introduces a component model and a virtual DOM that re-renders components when their state changes. It is currently experimental and not yet widely adopted, but the idea of building interfaces from composable components is being discussed seriously.

## What they are all trying to solve

Every framework is trying to answer the same underlying question: how do we prevent a growing JavaScript application from becoming an unmanageable pile of connected callbacks and global state?

The specific problems are: where does state live? How does a change in one part of the application notify other parts that care about it? How does the URL correspond to application state so that links and back buttons work? How do we write the code so that testing is possible?

These are not JavaScript-specific problems. They are software architecture problems that appear in any sufficiently large application. Frameworks provide one set of answers; understanding the problems helps you evaluate whether a given set of answers fits your situation.

## The risk of framework-first thinking

A developer can spend more time comparing framework options than building the application. Every framework has enthusiastic advocates, and every framework has critical essays from developers who moved to a different one. The landscape in 2013 is moving fast enough that the "right" choice may look different in two years.

The more durable investment is understanding the underlying problems: why does data binding reduce code, and what does it cost? What does model-view separation accomplish? What is a single-page application routing system actually doing? These concepts survive longer than any particular framework version. A developer who understands the problems can evaluate new tools on their merits rather than following adoption curves.
