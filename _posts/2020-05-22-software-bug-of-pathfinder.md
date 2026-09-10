---
title: 'Software Bug Of Pathfinder'
date: 2020-05-22
permalink: /posts/2020/05/software-bug-of-pathfinder/
tags:
  - self-improvement
---

Mars Pathfinder landed successfully on July 4, 1997 — the first Mars lander since the Viking missions of 1976. The entry, descent, and landing were flawless. Within days, the spacecraft and its small rover Sojourner were returning data and images. Then the resets began.

The flight computer would periodically restart itself, losing science data and requiring engineers on Earth to re-establish state. The resets happened irregularly, which made diagnosis difficult. Fortunately, NASA's Jet Propulsion Laboratory engineers had designed Pathfinder to preserve its state across resets and to continue operating — so the spacecraft was not lost, but the problem needed to be found and corrected.

## The bug: priority inversion

Pathfinder ran VxWorks, a real-time operating system designed for embedded and spacecraft applications. VxWorks scheduled tasks based on priority: higher-priority tasks preempt lower-priority ones. The system worked correctly under most conditions. The problem emerged from a specific sequence of events involving three tasks of different priority levels.

The system had:
- A **high-priority task** responsible for managing the information bus connecting the spacecraft's components — critical for coordination
- A **medium-priority task** handling communication processing
- A **low-priority task** collecting meteorological data

The low-priority meteorological task and the high-priority bus management task shared a mutex — a mutual exclusion lock that allowed only one task at a time to access a shared data structure. During normal operation, the low-priority task would briefly hold the mutex, complete its work, and release it.

The problem occurred when the medium-priority communication task became ready to run at exactly the moment the low-priority task held the mutex. The medium-priority task preempted the low-priority task — this is correct behavior in a priority-based scheduler. But the medium-priority task ran for long enough that the high-priority bus management task eventually needed the mutex and could not acquire it, because the low-priority task still held it and was blocked from running by the medium-priority task.

The high-priority task was effectively blocked by a lower-priority task — through the intermediary of the medium-priority task — for longer than the system's watchdog timer allowed. The watchdog, designed to detect a non-responsive system, concluded that the system had hung and forced a reset.

This is the classic priority inversion problem. The system behaved consistently with its rules. The rules, in this configuration, produced an outcome nobody intended.

## The fix, sent from Earth

VxWorks included a mechanism called priority inheritance, which addresses exactly this problem. When a high-priority task waits for a mutex held by a lower-priority task, priority inheritance temporarily elevates the lower-priority task to match the waiting high-priority task. This prevents medium-priority tasks from running ahead of the lower-priority task and breaking the lock. Once the lock is released, priorities return to normal.

Priority inheritance had not been enabled for the shared mutex in question. It had been disabled as a performance optimization — it adds overhead to every mutex operation. On the ground, during testing, the timing conditions that triggered the inversion apparently did not occur.

The remarkable detail is that the fix was deployed remotely. JPL engineers, working from descriptions of the failure pattern returned in diagnostic data, identified the likely cause, tested the fix in a duplicate environment on Earth, and uploaded a patch to a spacecraft 190 million kilometers away. The resets stopped.

## What this incident demonstrates

The Pathfinder bug is cited in software engineering courses for several reasons.

It shows that correctness in concurrent systems is not just about whether code works in the normal case — it is about whether the scheduling and synchronization rules produce the right behavior under all possible interleavings. A system can behave correctly for months and fail only when a specific timing sequence occurs for the first time.

It shows that configuration is part of the software. The bug was not in an algorithm; it was in a single disabled setting. The VxWorks feature existed. The choice not to enable it, made for defensible performance reasons, was the source of the problem.

And it shows that a fix can be small relative to the work required to find it. The final change was enabling one flag. The process of identifying which flag, understanding why, and verifying the fix across 190 million kilometers of space was weeks of careful engineering.
