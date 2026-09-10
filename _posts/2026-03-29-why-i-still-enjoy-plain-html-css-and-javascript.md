---
title: 'Why I Still Enjoy Plain HTML, CSS, and JavaScript'
date: 2026-03-29
permalink: /posts/2026/03/why-i-still-enjoy-plain-html-css-and-javascript/
tags:
  - html
  - css
  - javascript
  - web
---

In March 2026, the modern web development landscape includes dozens of frameworks, meta-frameworks built on top of frameworks, build tools that compile JavaScript that compiles to JavaScript, AI-assisted scaffolding that generates entire project structures before you have written a line of code, and package managers competing to install those structures most efficiently.

I still enjoy opening an empty HTML file and starting with almost nothing.

## What the short feedback loop actually gives you

The distance between idea and result in a plain HTML page is very short. Write a button, save, refresh — the button is there. Change the color in CSS, save, refresh — the color changed. No build step, no hot-reload server to configure, no TypeScript compilation to watch.

This is not merely a preference for simplicity. The short feedback loop changes how you think about the problem. When the result is immediate, you experiment more freely. When each change takes four seconds to rebuild, you plan more carefully before making it. Both modes have their place. The immediate mode is particularly useful when you are still figuring out what you want.

## What a single HTML file can actually contain

People sometimes underestimate what is possible without a build system. A single HTML file can contain:

- A working countdown timer with CSS animations
- A quiz with instant feedback and a final score
- A canvas-based drawing tool or simple game
- A form that validates input and sends a fetch request to an API
- A Markdown preview editor using a CDN-loaded library
- An image resizer that processes files locally using the Canvas API without any upload

None of these require React, a bundler, a package.json, or a node_modules directory. The browser is a capable runtime that has been standardized across devices for years. Most of what makes websites useful lives inside it already.

## Why the self-contained file is genuinely valuable

When an entire project fits in one HTML file, you can read it in one pass. The structure is in the HTML. The styles are in the CSS block at the top. The behavior is in the JavaScript section at the bottom. A new reader can scroll from beginning to end and understand most of the code without navigating directories or learning which file imports which.

This property matters for small tools shared between colleagues, for teaching examples that students can inspect and modify, for personal utilities that need to work in five years without a build environment, and for any project where the code surviving as-is for a long time is more important than it being architecturally impressive.

## When frameworks are the right answer

I am not making an argument against frameworks. A large application with many contributors needs shared conventions, explicit dependency management, and type checking. A team of ten engineers working on a complex user interface will not maintain a self-contained HTML file — the file size alone would make it unworkable, and the lack of structure would cause collisions.

The frameworks exist because they solve real problems at scale. The issue is not that they are wrong to use. The issue is that they are sometimes chosen by default for projects that do not have the problems they solve, because they feel more professional or because the team already knows them.

A project that is complete as one file should be one file. Adding a build step and a framework to a project that does not need them creates maintenance overhead the project should not have — dependency updates, build configuration, an environment that must be reproduced to make changes.

There is something the early web got right that is easy to forget in the current environment: the source was visible, the result was immediate, and the distance between learning to write HTML and being able to make something real was genuinely short. That entry point was valuable. I like keeping a little of it available.
