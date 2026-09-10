---
title: Microsoft Releases Windows Terminal 1.0
date: 2020-05-15
permalink: /posts/2020/05/microsoft-releases-windows-terminal-1-0/
tags:
  - software
  - programming
  - computing-history
---

Microsoft released Windows Terminal 1.0 in May 2020, roughly a year after its first public preview at Microsoft Build 2019. The application replaced decades-old infrastructure: Command Prompt ran on conhost.exe, a host that dated to Windows NT and had no support for modern text rendering, multiple tabs, or proper Unicode.

Windows Terminal used DirectWrite and DirectX for GPU-accelerated text rendering, supported multiple panes and tabs, handled the full Unicode range including emoji and CJK characters, allowed customizable key bindings, and stored all configuration in a JSON file under the user's roaming profile. It ran PowerShell, Command Prompt, Azure Cloud Shell, and any WSL distribution as separate tab profiles. That same month, WSL2 launched, adding a real Linux kernel running in a lightweight virtual machine inside Windows.

Windows Terminal was open sourced on GitHub from the first preview, giving developers visibility into how Microsoft was building it and allowing contributions. It reflected a larger reorientation: Windows under CEO Satya Nadella was increasingly expected to be a good host for Linux tools, containers, SSH, and cross-platform workflows rather than an environment where every developer tool had to be a native Windows application.
