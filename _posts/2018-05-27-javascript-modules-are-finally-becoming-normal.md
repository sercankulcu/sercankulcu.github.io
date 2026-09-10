---
title: 'JavaScript Modules Are Finally Becoming Normal'
date: 2018-05-27
permalink: /posts/2018/05/javascript-modules-are-finally-becoming-normal/
tags:
  - javascript
  - web
  - programming
---

For most of JavaScript's history, the language had no built-in way to split code across files and have those files depend on each other explicitly. This is a basic feature that Python, Java, and Ruby all had from early on. JavaScript's absence of a module system was a genuine hole, and the ecosystem filled it with workarounds that accumulated into something genuinely complicated.

## The problem that modules solve

Before native modules, sharing code between JavaScript files required one of several unsatisfying approaches.

The oldest was global variables. Every library attached itself to the global `window` object. jQuery was `window.$`. Underscore was `window._`. As applications grew, global variable conflicts became common and difficult to debug — two libraries both trying to define `window.utils` would silently overwrite each other.

**CommonJS** arrived with Node.js in 2009. The `require()` function and `module.exports` gave Node.js a workable module system, but it was synchronous — designed for file system access, not for loading resources over a network. CommonJS modules in the browser required a bundler to package all the dependencies into a single file before sending it to the client.

**AMD (Asynchronous Module Definition)** — implemented by RequireJS — designed around browser loading by making everything asynchronous. The syntax was verbose:

```javascript
define(['jquery', 'underscore'], function($, _) {
    return { /* module code */ };
});
```

Readable if you were used to it; opaque if you were not.

## ES modules: the standard

ES2015 (ES6), published in June 2015, specified a module syntax as part of the language:

```javascript
// math.js
export function add(a, b) { return a + b; }
export const PI = 3.14159;

// app.js
import { add, PI } from './math.js';
console.log(add(2, 3));
```

The syntax is clear and the semantics are explicit: you can see exactly what a file provides and exactly what it depends on. Dependencies become part of the code, not configuration.

Browser support was the bottleneck. Chrome and Firefox added support incrementally; widespread native support across current versions is essentially where we are in May 2018. Using `<script type="module">` in HTML loads an ES module correctly:

```html
<script type="module" src="./app.js"></script>
```

## What Webpack still does

Native ES module support in modern browsers does not eliminate the need for build tools, at least not yet.

**Older browsers.** Supporting browsers from two or three years ago — including many corporate environments where browser upgrades are slow — still requires transpiling modern JavaScript to an older syntax. Babel handles this transformation; Webpack manages the pipeline.

**Tree shaking.** When a bundler can analyze the import/export graph, it can remove exported values that are never imported — dead code elimination at the module boundary. Rollup pioneered this for ES modules; Webpack 2 and later support it. The result is smaller bundles because unused library features are not shipped.

**Non-JavaScript assets.** Webpack can import CSS, images, and other assets as if they were JavaScript modules, giving a uniform dependency graph for everything a component needs. This is not part of the ES module specification.

**Development experience.** Hot module replacement, source maps, and development servers are tooling features that live above the module system itself.

## The direction it points

The ES module specification matters beyond the immediate syntax improvement. Static imports — import declarations at the top of a file, not inside functions or conditions — allow tools to analyze the complete dependency graph before running any code. This enables optimizations that were impossible with dynamic `require()` calls.

JavaScript's module story took a long time to resolve. The standard exists, browser support is arriving, and the tooling is adapting. The next few years of JavaScript development will be notably easier to explain to someone new to the ecosystem than the previous ten were.
