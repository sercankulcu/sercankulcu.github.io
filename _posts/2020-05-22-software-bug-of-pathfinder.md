---
title: 'Software bug of Pathfinder'
date: 2020-05-22
permalink: /posts/2020/05/software-bug-of-pathfinder/
tags:
  - self-improvement
---

<img width="200" alt="Pathfinder" src="/images/posts/software-bug-of-pathfinder.webp" style="float: left; margin-right: 10px;" /> The landing of the Mars Pathfinder spacecraft on July 4, 1997, was a major achievement for NASA and the scientific community. The mission's primary goal was to demonstrate the feasibility of delivering a set of science instruments to the surface of Mars, and to return data to Earth. The landing itself was flawless, with the spacecraft successfully touching down on the Martian surface and transmitting data back to Earth. However, days after the successful landing, the Pathfinder spacecraft began to experience a series of system resets, which caused significant data loss. The system resets were caused by a software bug in the operating system of the spacecraft, which was known as VxWorks.

VxWorks is a real-time operating system (RTOS) that provides preemptive priority scheduling of threads. This means that tasks on the spacecraft are executed as threads, and each thread is assigned a priority level based on the relative urgency of the task. The higher the priority level, the more quickly the task will be executed by the system.

The software bug that caused the system resets on the Pathfinder spacecraft was related to the way in which VxWorks handled the scheduling of threads. Specifically, the bug caused the system to incorrectly prioritize certain threads, which led to a race condition. This race condition caused the system to lock up and reset, resulting in data loss.

The problem with the race condition on Pathfinder mission was that it was caused by a design flaw in the software. The system was not able to handle errors or unexpected situations and that led to the system resetting itself. This led to a loss of valuable scientific data, and also caused the mission to be cut short.

After the problem was identified, the software was quickly patched and the mission was able to continue. However, the incident served as a reminder of the importance of thorough testing and robust software design in the development of space missions. It also highlights the importance of a proper error management in the software design and having a proper plan for handling unexpected situations.

In conclusion, the landing of the Mars Pathfinder spacecraft was a major achievement for NASA and the scientific community. However, the subsequent system resets and data loss were a reminder of the potential risks associated with software bugs, particularly those related to the scheduling of threads. The incident highlights the importance of thorough testing and robust software design in the development of space missions, as well as the importance of proper error management and planning for unexpected situations.
