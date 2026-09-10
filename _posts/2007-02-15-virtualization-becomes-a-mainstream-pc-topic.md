---
title: Virtualization Becomes a Mainstream PC Topic
date: 2007-02-15
permalink: /posts/2007/02/virtualization-becomes-a-mainstream-pc-topic/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Intel shipped VT-x (Vanderpool Technology) in mainstream processors beginning with the Pentium 4 600 series in June 2005, and AMD shipped AMD-V (Pacifica) with Athlon 64 X2 processors beginning in May 2006. By February 2007, both Intel Core 2 and AMD Athlon 64 processors sold in standard retail configurations included hardware virtualization support, making the technology available to any developer or power user who bought a modern PC. Before hardware virtualization, VMware had used binary translation — rewriting x86 privileged instructions in real time to safe equivalents — and achieved surprisingly good performance, but at significant engineering complexity. Intel VT-x and AMD-V added a new CPU execution mode (VMX/SVM mode) in which the hypervisor ran at a higher privilege level than ring 0, so guest OS code could execute native privileged instructions that would trap to the hypervisor for emulation rather than causing system failures.

On desktops, the beneficiaries were most visible on Apple's Intel Macs: Parallels Desktop for Mac (launched June 2006) sold over one million copies in its first 18 months, enabling Mac users to run Windows XP or Vista in a window alongside macOS — a critical selling point for switchers who needed Windows for corporate software or games. VMware Fusion (launched August 2007) competed with Parallels for the Mac virtualization market. VMware Workstation 6 (May 2007) served Windows and Linux developers who needed to test across multiple OS configurations. Microsoft released Virtual PC 2007 as a free download in February 2007. VirtualBox (originally InnoTek, acquired by Sun Microsystems in January 2008) provided a free open-source option. In enterprise, VMware ESX Server was consolidating server workloads onto fewer physical machines — VMware's revenue exceeded $1 billion in fiscal 2007, primarily from server virtualization.

The same hardware virtualization that enabled developer productivity on desktops was already powering Amazon EC2 (launched October 2006), which ran customer VMs as Xen hypervisor guests on Amazon's physical servers. Xen had used paravirtualization (requiring guest OS modifications) before AMD-V and VT-x, which enabled "hardware virtual machine" (HVM) mode for unmodified guest kernels — making arbitrary operating systems hostable without source changes. Microsoft Hyper-V, integrated directly into Windows Server 2008 (released February 2008), brought hypervisor technology into the standard server OS, completing the transformation of virtualization from specialty infrastructure to a default computing layer.
