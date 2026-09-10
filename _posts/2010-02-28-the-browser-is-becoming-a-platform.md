---
title: 'The Browser Is Becoming A Platform'
date: 2010-02-28
permalink: /posts/2010/02/the-browser-is-becoming-a-platform/
tags:
  - web
  - html5
  - javascript
  - technology
---

For most of the web's history, a browser was a program for reading documents. HTML was a document format. JavaScript was a scripting language for small interactive touches — form validation, a dropdown menu, an image that changes when you hover over it. Serious applications ran on the desktop.

That description is becoming outdated, and the speed of the change in the past two years has been surprising.

## What changed: Chrome and the JavaScript speed problem

When Google released Chrome in September 2008, one of its main selling points was JavaScript performance. The V8 engine compiled JavaScript to native machine code instead of interpreting it. Benchmarks showed it running JavaScript five to ten times faster than the competition at launch.

This mattered more than it might seem. JavaScript's reputation as a slow language was partly a self-fulfilling constraint: because JavaScript was slow, developers avoided using it for complex tasks, which meant the pressure to make it faster was lower. Chrome disrupted that. When JavaScript can run quickly, the set of things it is reasonable to build with it expands considerably.

Mozilla, Opera, and eventually Microsoft responded. The JavaScript speed competition improved every major browser within months of Chrome's release. The platform all of them share is now much more capable than it was two years ago.

## What the HTML5 draft is adding

The HTML5 specification is still a draft, but browsers are already implementing parts of it, and the new capabilities matter:

- **Canvas element** — a drawing surface that JavaScript can paint on freely, making browser-based graphics and games practical without Flash
- **Video and audio elements** — embedding media without a plugin, directly in the page
- **Web Storage** — a way to save data in the browser between sessions, separate from cookies and without their limitations
- **Web Workers** — JavaScript running in a background thread, so a complex calculation does not freeze the page
- **Geolocation API** — with user permission, a web page can know approximately where the device is

None of these require installing anything. They run in the browser the user already has.

## Google Docs as the current example

Google Docs is the application I show people when they ask what this looks like in practice. It is a word processor, a spreadsheet, and a presentation tool that runs entirely in the browser. Multiple people can edit the same document at the same time and see each other's changes in real time. It was not possible to build something like this in a browser a few years ago, and now it works reliably across different operating systems without installing anything.

This is not a demo or a prototype. People use it for real work every day. That matters.

## What the browser still cannot do well

Offline use is a real problem. Most web applications stop working without an internet connection. HTML5 includes an Application Cache that can help, but it is not yet widely supported and has significant limitations.

Performance for computation-heavy work is still a gap. The browser is not where you run video editing software or a physics simulation. Certain things — audio production, professional graphics, scientific computing — still belong on the desktop.

Browser differences are also still a source of frustration for developers. Internet Explorer 8, which many users are still running, supports very little of what I described above. Building a web application means either limiting yourself to what older browsers support or maintaining separate code paths for different environments.

## Why this direction is interesting

What I find significant is not any individual feature but the cumulative effect. The browser is becoming an environment that developers target seriously, not just a document viewer. The deployment story — update the server, everyone sees the new version, no installer — is genuinely different from desktop software. The cross-platform nature — the same code running on Windows, macOS, and Linux with the same behavior — solves a problem that has always been expensive.

The line between a website and an application is dissolving. In a few years, the tasks we currently perform in separate desktop programs may commonly happen in a browser instead. That is a large shift, and we are in the middle of it.
