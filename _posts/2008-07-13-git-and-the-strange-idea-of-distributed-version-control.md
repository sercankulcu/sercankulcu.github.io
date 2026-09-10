---
title: 'Git And The Strange Idea Of Distributed Version Control'
date: 2008-07-13
permalink: /posts/2008/07/git-and-the-strange-idea-of-distributed-version-control/
tags:
  - git
  - programming
  - software
---

Version control becomes important the first time a project grows large enough that "final", "final2", and "really-final" stop being funny file names. A proper system keeps the history of changes and allows us to return to an older version when something goes wrong.

## Why Git exists

For most of the 2000s, Subversion (SVN) was the dominant version control system for open-source projects. It improved on CVS by treating commits as atomic snapshots, but it still used a single central repository as the source of truth. Every commit required a network connection to the central server. Branches were expensive — creating one meant duplicating the entire directory tree. Working offline meant working without version control.

The Linux kernel project used a commercial distributed system called BitKeeper from 2002 until April 2005, when BitKeeper revoked the free licence for open-source projects. Linus Torvalds, unwilling to go back to a centralized system for a project with thousands of contributors across dozens of time zones, spent April and May 2005 writing a replacement. The first version of Git was self-hosting by June 2005. The kernel project migrated to it the same month.

## How the mental model differs

Git approaches version control through content-addressed storage. Every object — a file, a directory tree, a commit — is stored by the SHA-1 hash of its contents. A commit records a snapshot of the entire project tree plus a pointer to its parent commit. The result is a directed acyclic graph (DAG) of immutable snapshots rather than a list of file diffs. Two commits that produce the same tree produce the same SHA-1 hash; corruption is detectable because the hash no longer matches.

The staging area (also called the index) is another unusual concept. Between a working tree and a commit, there is an intermediate space where the developer explicitly marks which changes belong in the next snapshot. This feels strange at first — why not just commit everything — but it becomes valuable when a working session touches several unrelated things and the developer wants to record them as separate, coherent commits.

Because every working copy contains the full history, several things that were expensive become cheap. Creating a branch is creating a pointer to a commit — it costs almost nothing and takes milliseconds. Switching between branches is fast. Comparing any two commits requires no network access. A developer can commit freely during an exploratory session, reorganize those commits before sharing them, and push only when the work is ready.

Commands such as `commit`, `branch`, `merge`, `rebase`, `push`, and `pull` describe operations on this graph of snapshots rather than copying files to a server. The unfamiliar vocabulary reflects a genuinely different model, and I have found that memorizing commands without understanding the graph leads to confusion quickly. Once the graph becomes familiar, the commands make sense.

## GitHub

GitHub launched in April 2008 — only three months ago as I write this. It is a hosting service built around Git that adds a web interface, issue tracking, and crucially a mechanism for proposing changes through pull requests. Forking a repository creates a personal copy that can be modified independently, and the pull request proposes merging those changes back. This makes the contribution workflow visible and social in a way that mailing patches to a mailing list never was.

It is still early. I do not know how large GitHub will become, but the combination of Git's distributed model and a hosting platform that makes contribution low-friction feels like it could change how open-source development is organized.

Version control used to feel like a safety system around programming. Git makes it feel more like part of the way programming itself is organized — a continuous conversation about what the project was, is, and should become.
