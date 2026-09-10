---
title: 'Why We Need Operating Systems?'
date: 2023-02-02
permalink: /posts/2023/02/why-we-need-operating-systems/
tags:
  - operating-systems
  - computer-science
  - software
---

A computer without an operating system would still be a computer. The processor would still execute instructions. Memory would still store values. But using it would require detailed knowledge of the specific hardware — the exact memory addresses where data should be placed, the precise sequence of instructions to communicate with a storage device, the mechanism for switching between different tasks. Early computers operated this way. Human operators loaded programs manually, assigned resources directly, and managed the hardware as closely as the machine itself.

As computers became faster and as multiple programs needed to share a single machine, this approach stopped scaling. Operating systems emerged as the answer: a layer of software that manages the hardware on behalf of all other software and gives programs a consistent, protected interface to the machine beneath.

## Process and CPU management

A modern processor can execute billions of instructions per second. It can also only do one thing at a time per core. The illusion of running many programs simultaneously — your browser, your text editor, your music player — is created by the operating system's scheduler, which rapidly switches CPU time between processes.

Linux uses the Completely Fair Scheduler (CFS), which tracks how much CPU time each process has received and allocates time to the process that has received the least — aiming for proportional fairness among processes with the same priority. Windows and macOS use different scheduling policies, but the fundamental problem is the same: allocate a finite resource among competing demands in a way that is fair and responsive.

When a process calls a system function that requires waiting — reading from a slow disk, waiting for a network response — the scheduler does not leave the CPU idle. It switches to another process that has work to do. This is the mechanism behind why other applications remain responsive while a file is downloading.

## Memory management and virtual address spaces

Memory management has a second goal beyond allocation: isolation. A bug in one program should not corrupt the memory of another program. A malicious program should not be able to read the memory of a different process.

The operating system gives each process a virtual address space — a private view of memory that appears to start at address zero and extend to however much memory the process can address. Physical RAM is shared across all processes, but each process sees only its own portion, mapped by the operating system's memory management unit. Address 0x1000 in process A refers to a different physical memory location than address 0x1000 in process B. Neither can access the other's memory directly.

When a process accesses a virtual address that has not been mapped to physical RAM — because the operating system has swapped it to disk, or because the address is invalid — the hardware raises a page fault. The operating system handles the fault: loading the page from disk if it exists, or terminating the process with a segmentation fault if the address was invalid.

## File systems and device abstractions

A file is an abstraction. On disk, storage is organized as sectors, cylinders, and blocks — details specific to the physical storage device. The operating system's file system layer (ext4 on most Linux systems, NTFS on Windows, APFS on modern macOS) organizes these physical blocks into the directory trees and file names that applications work with.

A program that opens a file using `open()` does not need to know whether the data is on a hard drive, an SSD, a network filesystem, or a memory-mapped region. The operating system provides a uniform interface. The same `read()` call that reads from a local file works for reading from stdin, a network socket, or a device file.

This abstraction is why software can be portable across hardware configurations that differ significantly underneath.

## Security and privilege separation

The operating system enforces a boundary between user-level code and kernel-level code. A normal application runs in user mode, where it cannot directly access hardware, modify memory belonging to other processes, or change system configuration. It requests these services through system calls — controlled entry points into the kernel.

This separation is why a buggy application can crash without taking down the entire system, and why applications cannot arbitrarily read each other's data. The boundary is imperfect — privilege escalation vulnerabilities in kernels exist and are serious — but it provides a first line of defense that would be completely absent without the operating system's enforcement.

## Why it matters to understand this

I teach operating systems because they make visible what is otherwise invisible. Every file save, every network connection, every context switch between applications is managed by a system most developers interact with only through high-level abstractions. Understanding what happens underneath those abstractions helps explain why systems behave the way they do under load, why certain failures occur in predictable patterns, and why the design decisions made in the 1960s and 1970s still shape the systems we use today.
