---
title: GitLab Faces a Major Database Incident and Shares the Recovery Publicly
date: 2017-01-15
permalink: /posts/2017/01/gitlab-faces-a-major-database-incident-and-shares-the-recovery-publicly/
tags:
  - technology
  - computing-history
  - history
---

On January 31, 2017 at approximately 5:20 PM UTC, a GitLab database administrator accidentally deleted 300 GB of production PostgreSQL data from db1.cluster.gitlab.com while attempting to remove a directory on a staging server. The error occurred while manually remediating a replication lag incident under time pressure: the administrator ran `rm -rf` targeting a directory path but was connected to the production server rather than staging. GitLab's CEO Sid Sijbrandij and the engineering team made an unusual decision: they live-streamed the recovery effort on YouTube, opened a public Google Doc tracking the incident state, and posted updates in real time to Twitter — narrating the disaster as it unfolded rather than waiting until service was restored.

The deletion exposed five backup mechanisms that were all unusable. The most recent automated pg_dump backup was from six hours earlier — and was itself unusable because the backup server's disk had filled silently, causing backups to fail for days without alerting anyone. Database replication to a secondary had propagated the deletion within seconds. An LVM snapshot was too old. Azure disk snapshots had not been configured on the production servers. A staging environment database was hours stale but was the only usable recovery option. The team restored service using the staging database, losing approximately 5,037 projects, 4,893 comments, 707 user accounts, and 6 hours of production changes created between 5:20 PM and the restoration point.

GitLab published a detailed postmortem within 24 hours covering every backup that failed and why. The incident became the most-cited real-world example of backup failure modes in DevOps training material: “a backup job that reports success is not the same as a restorable backup,” “replication is not backup,” and “test restores, not just backup jobs.” GitLab subsequently implemented regular restore drills, separate failure-domain storage for backups, monitoring on backup success and recency, and clearer tooling to prevent production-vs-staging confusion. The transparency — livestreaming a catastrophic outage — was itself widely studied as crisis communication, generating coverage that did less reputational damage than the incident might have caused if handled opaquely.

## Why This Moment Mattered

The topic is useful because it captures a broader shift in how people build, use, and understand technology. In the short term, it gave users and developers something concrete to react to. In the longer term, it became part of a larger pattern in technology, computing-history, history: hardware, software, services, and user expectations were all changing at the same time.

A good technology milestone usually matters for more than one audience. Enthusiasts notice the specifications or the interface first. Developers ask what new assumptions they can make. Companies look at cost, compatibility, and strategy. Ordinary users mostly notice whether the result makes their devices faster, easier, safer, or more useful.

## The Broader Context

This period of computing was shaped by several overlapping transitions: faster networks, more capable mobile devices, cloud infrastructure, stronger security expectations, and software that changed continuously after release. Against that background, the milestone was not an isolated headline. It was one piece of a much larger movement away from static products and toward connected platforms.

That context helps explain why some announcements that looked modest at the time became important later. A browser feature, processor change, development tool, or platform policy can alter what future products are able to assume. Once enough users, developers, and vendors adapt, the new assumption becomes normal.

## Looking Back

The value of revisiting the moment is that it shows how technology history is built from many medium-sized steps. Some are celebrated immediately, while others become meaningful only after the ecosystem catches up.

Looking back also keeps the story balanced. Progress usually brings tradeoffs: performance against power use, openness against consistency, convenience against control, and speed against stability. The most interesting milestones are the ones that reveal those tradeoffs clearly. This one belongs in that category because it helps explain not just what changed, but why the direction of computing kept moving the way it did.
