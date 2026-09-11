---
title: GDPR Changes How Software Handles Personal Data
date: 2018-05-15
permalink: /posts/2018/05/gdpr-changes-how-software-handles-personal-data/
tags:
  - technology
  - computing-history
  - history
---

The EU's General Data Protection Regulation (GDPR) became enforceable on May 25, 2018, two years after its adoption in April 2016. It applied to any organization processing personal data of EU residents, regardless of where the organization was headquartered — making it effectively a global regulation for any company with EU users. Maximum fines were €20 million or 4% of global annual turnover, whichever was higher. The first major fine came in January 2019: France's CNIL fined Google €50 million for insufficient transparency in its Android onboarding consent flow. British Airways received a £183 million fine (later reduced to £20 million) in 2020 for a 2018 data breach affecting 500,000 customers.

GDPR codified six lawful bases for processing personal data (including consent, legitimate interest, and contractual necessity) and established eight data subject rights: access, rectification, erasure (“right to be forgotten”), restriction of processing, data portability, objection, and rights related to automated decision-making. The right to erasure and right to data portability in particular forced engineering teams to build infrastructure that had previously been deferred: a “delete my account” endpoint that scrubbed data from production databases, analytics pipelines, recommendation models, search indexes, backup archives, and third-party processors required coordinated work across systems that had often been designed without deletion in mind. Data portability required a machine-readable export of all personal data the organization held — prompting many companies to build DSAR (Data Subject Access Request) tooling for the first time.

The consent requirement — that freely given, specific, informed, unambiguous consent was required before placing non-essential cookies — drove the explosion of cookie consent banners visible on websites worldwide. The regulation distinguished between strictly necessary cookies (exempt from consent) and analytics, advertising, and social cookies (requiring explicit opt-in). By 2019, the majority of major websites served visitors a consent modal before loading any analytics or advertising code, a visible and often-criticized user-experience change that became synonymous with GDPR compliance to non-technical users.

## Why This Moment Mattered

The topic is useful because it captures a broader shift in how people build, use, and understand technology. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in technology, computing-history, history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
