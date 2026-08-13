---
title: 'JavaScript Modules Are Finally Becoming Normal'
date: 2018-05-27
permalink: /posts/2018/05/javascript-modules-are-finally-becoming-normal/
tags:
  - javascript
  - web
  - programming
---

For years, organizing JavaScript across several files has required conventions and tools that were not part of the language itself. Developers used patterns such as immediately invoked functions, CommonJS, AMD, and later bundlers to create some form of modular structure.

ES modules are finally becoming practical in modern browsers. The syntax is simple: one file can `export` values and another can `import` them. It feels ordinary because many other languages have had module systems for a long time.

The important change is not the syntax alone. Modules make dependencies explicit. A file can say what it needs and what it provides. This is much easier to understand than depending on several global variables that happen to exist because scripts were included in the correct order.

Build tools such as Webpack are still important, especially when projects need compatibility with older browsers, code transformation, asset handling, or optimized bundles. Native modules do not immediately remove the front-end toolchain.

Still, I like the direction. A platform becomes easier to learn when common needs are supported by the platform itself. Every custom solution adds vocabulary that a new developer has to understand before reaching the real problem.

JavaScript has spent many years growing from a small browser scripting language into the language of large applications. A standard module system is one of those changes that makes the language feel more complete.

Sometimes maturity is not adding a spectacular new feature. It is finally making an ordinary task boring.
