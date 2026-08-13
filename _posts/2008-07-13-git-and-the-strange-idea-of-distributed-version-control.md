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

Git approaches this problem differently from centralized systems such as CVS or Subversion. Instead of treating one remote server as the place where the real history lives, every working copy can contain the complete repository history. At first, this feels unnecessary. Why should every developer need so much information locally?

After using the idea for a while, the advantages become clearer. Commits can be created without a network connection. Branches are cheap and fast. Different lines of development can exist without immediately disturbing the main work. A developer can experiment more freely because history is close.

Git was created by Linus Torvalds in 2005 for Linux kernel development, so its design reflects the needs of a large distributed project. It can feel difficult at first because the mental model is different. Commands such as `commit`, `branch`, `merge`, `rebase`, `push`, and `pull` describe relationships between histories rather than only copying newer files to a server.

The command line is not always friendly either. Git can produce messages that make sense only after the underlying model becomes familiar. I have learned that memorizing commands without understanding commits, branches, and the working tree leads to confusion very quickly.

Still, distributed version control feels like an important direction. Open-source development increasingly involves people who may never meet and who work from different locations. A system designed around independent copies and later synchronization fits this world naturally.

GitHub, a new hosting service built around Git, is also making the workflow more visible on the web. It is still early, and I do not know how large it will become, but the social side of code hosting is interesting.

Version control used to feel like a safety system around programming. Git makes it feel more like part of the way programming itself is organized.
