---
title: 'Daily Life Of A Software Engineer'
date: 2019-08-14
permalink: /posts/2019/08/daily-life-of-a-software-engineer/
tags:
  - personal development
  - self-improvement
  - time management
---

The daily life of a software engineer is usually less dramatic than movies make programming look. There are no montages of cascading green characters or last-minute keystrokes that save cities. Most days are a mixture of reading, testing, discussing, debugging, and — somewhere in the middle — writing code.

## The morning

A typical morning begins with messages and notifications. GitHub pull request comments, Slack threads that continued overnight, a CI build that failed at 2 AM, an issue in the tracker that was updated by a colleague in a different time zone. The first task is often understanding the current state of things before deciding what to do next.

After that, a standup meeting — fifteen minutes, what I worked on yesterday, what I am working on today, anything blocking progress. Done well, this removes ambiguity about what the team is doing. Done badly, it is just a status recitation that could have been a message.

## The middle of the day

The largest block of productive work usually falls in the mid-morning. This is the period that matters most, and it is also the period most likely to be interrupted.

Writing code is often not the first step even then. Before code, there is understanding: reading the existing code around the area I am about to change, checking what the tests currently cover, reading the ticket to understand what the requirement actually means versus what the words say. Requirements written by someone who was not a developer often describe the desired outcome without specifying the case that is actually causing the problem.

When the actual coding begins, most individual changes are small: add a condition, fix a null check, update a query parameter, add a test. Large systems grow through many small, careful changes. The dramatic refactoring sessions that produce hundreds of changed lines in a single commit are the exception, not the day-to-day.

A pull request review is also a standard part of the day. Reading another engineer's code carefully enough to give useful feedback — not just checking that tests pass, but understanding the approach and seeing whether it handles the cases that are not in the tests — takes genuine effort.

## Debugging

Debugging deserves its own category because it does not fit comfortably into either "coding" or "reading." It is its own kind of work: forming a hypothesis about why something is wrong, designing a way to test the hypothesis, discovering that the hypothesis was wrong, forming a new one.

A bug that takes two days to find may ultimately require changing one line. The lines changed do not measure the difficulty. A subtle concurrency issue — something that only occurs when two operations interleave in a specific order under specific timing — can consume days of careful investigation and produce a fix that looks trivially small.

## Junior versus senior days

The shape of the day changes significantly with experience.

A junior engineer spends more time in a confused state — not sure where to look, not sure whether the current approach is the right one, not sure whether to ask for help or keep trying. This is not a failure; it is the normal condition of learning a new codebase and domain. The mistake is waiting too long to ask.

A senior engineer spends more time on questions at a higher level: is this the right thing to build? Is there a simpler design that avoids this complexity entirely? Why does the specification say this and what happens when the edge case the specification does not mention actually occurs? Less time is spent confused about the mechanics; more time is spent thinking about whether the mechanics are solving the right problem.

## The honest part

Software engineering can be tiring. Sustained concentration is the job's core resource, and it depletes. A day of four hours of real focused work with meetings and context-switches mixed in is genuinely tiring, even though it looks like a day of sitting at a desk.

It can also be satisfying in a specific way: problems have answers. Not always good answers, not always fast answers, but answers. There is almost always another problem waiting to be understood. For people who find that appealing, the daily work tends to stay interesting for a long time.
