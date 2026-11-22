---
title: 'The Morris Worm: The Internet''s First Major Security Incident'
excerpt: "On 2 November 1988 a small program slowed much of the early Internet. Here is how the Morris worm worked, why it did so much damage, and what it still teaches."
date: 2026-11-02
permalink: /posts/2026/11/the-morris-worm/
tags:
  - security
  - computing-history
  - software
  - programming
  - history
---

On the evening of 2 November 1988, a program began to spread between university and research computers in the United States. Within hours, machines at Cornell, MIT, Stanford and elsewhere were slowing to a crawl, and administrators were disconnecting their networks to protect themselves. The program was later called the Morris worm, and it became the first widely known security incident on the Internet.

What makes the story worth retelling is not the drama. It is that the worm used ordinary, preventable weaknesses, and that most of those weaknesses still exist today in other forms.

## A small program with a big effect

The worm was written by Robert T. Morris, then a graduate student at Cornell. According to the MIT analysis by Mark Eichin and Jon Rochlis, the earliest logged activity was at about 5 p.m. EST on 2 November. Stanford reported infection around 9 p.m., and the first public warning came from NASA Ames at 2:28 a.m. on 3 November. The worm is widely reported to have been launched from a machine at MIT, so that it would not point straight back to Cornell.

It targeted two kinds of Unix systems: 4.3BSD on VAX computers and Sun machines. At the time the Internet was small, with roughly 60,000 hosts. Mostly universities, laboratories and government sites were connected, and the people there largely knew and trusted one another. That trust is part of the story.

## How it got in

The worm did not rely on one trick. It tried several ways into a machine, and Eichin and Rochlis describe the main ones.

**Sendmail in debug mode.** The mail program `sendmail` had a debug command that let a message name a program, instead of a person, as its recipient. In the 4.3BSD and Sun releases of the time, debug mode was enabled by default. The worm sent itself as a "mail message" and had the remote machine run it.

**A buffer overflow in fingerd.** The `finger` daemon read its input with the C function `gets`, which does no length checking on its destination buffer. The worm sent a string longer than the buffer, overwrote data on the stack, and made the program run code the worm had supplied. In the analysis, this attack was used only against VAX machines running 4.3BSD; the exploit code did not work on Sun systems.

**Trusted hosts and weak passwords.** The commands `rsh` and `rexec` were designed for convenience. Through files such as `/etc/hosts.equiv` and per-user `.rhosts`, one machine could trust another by its network address, and the worm used those trust relationships. It also guessed passwords, using a built-in list of 432 words and, in a later phase, the 24,474-word system dictionary. Credentials that it had verified on one machine were then tried on others.

Each of these was a design decision or a default, not a clever new attack. That is exactly why the incident was so instructive.

## The reinfection bug that did the damage

If the worm had copied itself once per machine and then stayed quiet, it might have been a curiosity. The damage came from how it decided whether a machine was already infected.

Before infecting a host, each copy checked whether another copy was already running there. But on a one-in-seven chance, according to the MIT analysis, it skipped that check and went ahead anyway. On a busy machine, copies therefore accumulated. Every copy kept trying to infect other machines, and the load grew until the computers were barely usable.

The MIT paper notes that the worm spread much more quickly than its author expected, and that the extra processes are what made the infection so easy to notice. A program that was meant to be unobtrusive was undone by its own design.

## How many machines, and what it cost

Numbers from 1988 should be treated with care. The commonly repeated figure is about 6,000 infected machines, which comes from guessing that around 10 percent of the roughly 60,000 hosts were hit. Eichin and Rochlis themselves call the MIT figure, a 10 percent infection of about 2,000 local hosts, a guess. Clifford Stoll later suggested that only a couple of thousand machines were affected. The honest summary is that nobody counted, and the published estimates range from a couple of thousand to about 6,000.

Cost estimates are similarly wide. The US appeals court that heard Morris's case noted cleanup costs of 200 to 53,000 dollars per installation, and Clifford Stoll estimated the total economic impact at 100,000 to 10 million dollars. These are rough figures, but they show that clearing the worm took days of human work at many sites.

## The aftermath: CERT and the law

Two lasting changes followed. First, the Defense Advanced Research Projects Agency (DARPA) asked Carnegie Mellon's Software Engineering Institute to set up a computer emergency response team. That became the CERT Coordination Center, created in 1988 in the aftermath of the worm. During the incident, the people who understood the worm had struggled to reach each other; a standing team gave the community a place to report problems and share fixes.

Second, Morris was convicted under the Computer Fraud and Abuse Act of 1986 in United States v. Morris, widely described as the first conviction under that law. He was sentenced to three years of probation, 400 hours of community service and a fine of 10,050 dollars, plus the costs of supervision.

## Lessons that still apply

**Memory safety matters.** The fingerd attack is a textbook stack buffer overflow. A function that never checks the size of its destination will eventually be abused. This is why careful input handling belongs in the first weeks of a C course, and the [Programming with C course](/teaching/programming-with-c/) covers the buffer-overflow lesson in detail.

**Defaults are decisions.** A debug feature that was switched on by default became an open door. Secure defaults, and the habit of disabling features nobody needs, still prevent more incidents than clever detection does.

**Trust should be explicit.** Authentication by network address and passwords that a dictionary can guess show how convenience quietly becomes risk. The same questions about privileges, isolation and protection come up in the [Operating Systems course](/teaching/operating-systems/?lang=en).

**Watch your systems.** Administrators noticed the worm because machine load climbed and processes multiplied. Monitoring and fast communication limit damage, and CERT turned that idea into an institution.

Few programs have taught the field as much as this one did, and almost all of it was avoidable.

**Sources:** [With Microscope and Tweezers: An Analysis of the Internet Virus of November 1988 (Eichin and Rochlis, MIT)](https://web.mit.edu/eichin/www/virus/main.html), [Eichin and Rochlis, full text](https://people.eecs.berkeley.edu/~daw/teaching/cs261-f98/papers/internet_worm.txt), [Fostering Growth in Professional Cyber Incident Management (Software Engineering Institute, Carnegie Mellon)](https://www.sei.cmu.edu/history-of-innovation/fostering-growth-in-professional-cyber-incident-management/), [Morris worm (Wikipedia)](https://en.wikipedia.org/wiki/Morris_worm)
