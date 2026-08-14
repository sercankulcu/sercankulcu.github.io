---
title: Microsoft Releases Ubuntu on Windows Preview
date: 2016-04-15
permalink: /posts/2016/04/microsoft-releases-ubuntu-on-windows-preview/
tags:
  - software
  - programming
  - computing-history
---

Microsoft surprised many developers in 2016 by introducing the Windows Subsystem for Linux and making an Ubuntu user space available on Windows 10. This was not a traditional virtual machine and did not initially run a Linux kernel.

The first WSL implementation translated Linux system calls into Windows NT kernel operations. Ubuntu command-line programs could therefore run ELF binaries while Windows handled the underlying processes, files, and networking. Developers gained tools such as Bash, ssh, grep, apt, and programming-language runtimes without dual booting.

The feature reflected Microsoft's changing relationship with open source and developer tooling. Later WSL 2 replaced syscall translation with a lightweight virtual machine running a real Linux kernel, greatly improving compatibility with containers and complex Linux software.
