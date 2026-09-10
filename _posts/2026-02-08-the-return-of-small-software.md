---
title: 'The Return Of Small Software'
date: 2026-02-08
permalink: /posts/2026/02/the-return-of-small-software/
tags:
  - software
  - web
  - projects
---

Software has become incredibly capable, and that capability has brought weight. A task that should take thirty seconds — resizing an image, converting a file format, extracting text from a PDF — can now require creating an account, accepting a terms of service agreement, waiting for an upload, and navigating an interface designed for users who do this professionally every day.

In 2026, as AI-powered tools compete to automate everything comprehensively, I find myself returning to small software with renewed appreciation. Not because it is simpler to build, but because it is often genuinely better for the user.

## What small software means

Small software does one job clearly, without a surrounding platform. It does not need your email address. It does not have a subscription tier. It does not learn from your uploads. It does not send telemetry about how you used the button in the top right corner.

The examples are mundane precisely because mundane tasks are where software overhead is most disproportionate:

- Merge two PDF files
- Resize a batch of images for a specific width
- Convert a CSV to a JSON file
- Calculate the difference between two dates
- Generate a QR code from a URL
- Format a JSON blob for readability
- Check the contrast ratio between two colors

None of these require a product team, a backend, or a growth strategy. They require thirty to three hundred lines of code and a clear interface.

## The browser as a platform for small tools

The modern browser is a surprisingly capable execution environment. JavaScript running locally can read files from disk (with user permission), process images using the Canvas API, parse and transform text, manipulate PDFs using libraries like pdf-lib, and save results back to the user's device — all without sending a single byte to a server.

A single HTML file containing the interface, the logic, and the styling can deliver a complete utility. The user opens the file or a URL, does the task, and closes the tab. There is nothing to install, nothing to update, no account to create, and — if the tool is designed correctly — no data leaves the device.

This approach has become more viable as browser APIs have expanded. File System Access API allows reading and writing local files with user permission. OffscreenCanvas enables image processing without a visible element. WebAssembly allows running computationally intensive code (image compression, cryptography, format conversion) at near-native speed in the browser.

## Privacy as a design property

A small browser-based tool that processes files locally is private by construction. The file you are converting does not travel over a network. It is not stored on someone's server. It is not associated with an account or an identity. The transformation happens on the device and the result stays on the device.

This is not primarily a security argument — it is a simpler claim. Many tasks do not require network access. Requiring a file upload to perform a local transformation is an architecture choice, not a necessity. A tool designed with local processing first avoids a category of risks entirely rather than managing them.

## The satisfaction of finishing something

There is a particular satisfaction in building small software that large projects cannot provide: you can actually finish it.

A large project creates a roadmap that extends indefinitely. There is always a next feature, a performance improvement, a user request that should be addressed. The project is never done. This is not a failure of the project — it is the nature of building something that many people use and that evolves with their needs.

A small tool can reach a state that is genuinely complete. It does the thing. Edge cases are handled. The interface is clear. There is nothing to add that would make it more useful without making it more complex than the problem requires. Shipping that and moving on is a different kind of satisfaction than maintaining a platform indefinitely.

## What this looks like in practice

In 2026, AI-assisted code generation has made building small tools faster than it has ever been. A utility that would have taken a weekend to build from scratch can be prototyped in an afternoon. The barrier to making a tool that solves your own specific problem — one that no existing product addresses exactly right — is lower than at any point before.

There is a temptation in software to prove seriousness through complexity: more architecture, more services, more dependencies, more configuration options. Sometimes that complexity is genuinely necessary. Often, the most professional decision is to stop before the tool has become larger than the problem it was built to solve.
