---
title: 'GitHub And The Social Side Of Code'
date: 2011-07-17
permalink: /posts/2011/07/github-and-the-social-side-of-code/
tags:
  - github
  - programming
  - open-source
---

Source-code hosting used to feel like infrastructure — a necessary utility, not a social space. Sourceforge (launched 1999) and Google Code (launched 2006) provided repositories, bug trackers, and download pages. They were functional. You submitted a project, it hosted the files, other developers found it through search.

GitHub, launched in April 2008 by Tom Preston-Werner, Chris Wanstrath, and P.J. Hyett, is doing something different. It is turning code into a social object.

## What GitHub adds to Git

Git, created by Linus Torvalds in 2005 for Linux kernel development, is a distributed version control system. Every clone of a repository contains the full history. Branches are cheap. Working independently from a central server is natural. Git makes forks technically trivial: create your own branch or clone, develop independently, and merge selectively.

GitHub adds a web interface, profile pages, a following system, and — most importantly — the pull request. A pull request is a formalized way to propose that changes from one branch or fork be merged into another. It includes a diff, a comment thread, and an integration point for code review. This workflow gives open-source collaboration a visible, structured process that Sourceforge's patch tracker or mailing-list submissions never had.

By July 2011, GitHub has roughly one million users and two million repositories. Projects that once lived on Sourceforge or in tarballs on personal websites have migrated.

## The fork as a social gesture

What I find most interesting about GitHub is how the fork changes the dynamics of contribution. Under the traditional model, contributing to an open-source project began with asking for permission — requesting commit access, submitting a patch to a mailing list, waiting to be recognized by the maintainer. The barrier was partly social before it was technical.

On GitHub, I can fork a repository immediately, without asking anyone. I develop my change in my own copy, then open a pull request to propose it. The social negotiation happens after technical work already exists and is visible. The maintainer sees what I actually built, not a description of what I plan to build.

This lowers the cost of the first contribution. It also means that a fork does not require intent to merge — forks exist as standalone projects, as experiments, as personal archives of a version at a specific point in time.

## The profile as a professional record

A GitHub profile accumulates a history of public contributions: repositories created, commits made, pull requests opened and merged, issues commented on. This creates something that a résumé cannot: a visible record of how someone actually works, what they work on, and how they interact with collaborators.

This has obvious career implications, and I have mixed feelings about them. Code that was written for learning, for experimentation, or for a problem long since solved now potentially serves as a portfolio piece. Some developers are already starting to treat their public GitHub activity as a performance — committing regularly to maintain the green activity chart, making repositories public that might be better left private. That seems like the wrong incentive structure for learning, which benefits from unobserved failure.

## A note on centralization

The tension in GitHub's success is that it is creating a central hub for a technology — Git — that was specifically designed to avoid centralization. A distributed version control system where most of the world's open-source projects live on a single company's servers is, at some level, not as distributed as it appears. If GitHub's servers go down, development on those projects stops. If GitHub changes its terms of service, projects may have nowhere convenient to go.

This is worth noticing. The convenience that GitHub provides is real. The dependency it creates is also real.
