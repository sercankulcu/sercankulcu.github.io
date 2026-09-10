---
title: Windows 11 Is Released
date: 2021-10-15
permalink: /posts/2021/10/windows-11-is-released/
tags:
  - software
  - programming
  - computing-history
---

Windows 11 released on October 5, 2021 as a free upgrade for eligible Windows 10 PCs, with a phased rollout that Microsoft controlled through hardware compatibility scoring — PCs meeting all requirements received a notification over weeks rather than all at once. The visual design replaced Windows 10's left-anchored Start menu with a centered taskbar and Start button (repositionable to the left via settings), added rounded window corners, a redesigned Snap Layouts interface (Windows key + Z showing snap zone presets for 2–4 windows), and a new Widgets panel (news, weather, and calendar tiles). The Microsoft Store was rebuilt to accept Win32 applications (not only UWP apps), and Microsoft added DirectStorage API support — the same technology in Xbox Series X/S that allows the GPU to decompress NVMe SSD data directly, bypassing CPU and reducing game load times. Auto HDR automatically upgraded DirectX 11 and DirectX 12 games to use HDR color on supported displays.

The hardware requirements were the most discussed element of the launch. Microsoft required a 64-bit CPU from the 8th generation Intel Core or AMD Ryzen 2000 series or later, 4 GB RAM, 64 GB storage, UEFI firmware with Secure Boot enabled, and TPM 2.0 (Trusted Platform Module). The TPM requirement meant that millions of PCs from 2018 and earlier — including 7th-generation Intel Core systems — were officially ineligible even though they could run the software without performance issues. Microsoft released the PC Health Check tool to let users verify compatibility. The mandatory requirements enabled Virtualization-Based Security (VBS) and Hypervisor-Protected Code Integrity (HVCI) as defaults on new hardware, isolating kernel memory from userspace processes through Hyper-V even on consumer PCs. Credential Guard (protecting NTLM hashes from pass-the-hash attacks) also became more common as a result.

The gradual rollout used machine learning on hardware telemetry data to prioritize upgrading machines with the lowest risk of driver or application incompatibility, reflecting Microsoft's post-Windows 10 anniversary update (2016) policy change after that update caused significant hardware compatibility problems at wide deployment. Android application support — announced as a Windows 11 feature via the Amazon Appstore and Windows Subsystem for Android — did not ship with the October 2021 release; it entered public beta in February 2022, with the US as the initial market. Windows 10 end of mainstream support was announced for October 14, 2025, giving users four years to migrate. The Windows Subsystem for Linux (WSL 2, available since May 2020) continued unchanged, and Windows 11 added GUI Linux application support through WSLg (Linux kernel 5.10 with Wayland/X11 integration).
