---
title: Microsoft Opens More of Its Server Protocol Documentation
date: 2008-02-15
permalink: /posts/2008/02/microsoft-opens-more-of-its-server-protocol-documentation/
tags:
  - cloud
  - software
  - distributed-systems
---

On February 21, 2008, Microsoft announced that it would publish technical specifications for more than 30,000 pages of Windows client and server protocol documentation, committing to make these specifications freely available online. The announcement directly responded to the European Commission's 2004 antitrust ruling, which had ordered Microsoft to provide "complete and accurate" interoperability documentation for its server protocols to allow competing server and workgroup software to interoperate with Windows clients. Microsoft had been slow to comply: the Commission fined Microsoft €280.5 million in July 2006 and €899 million in February 2008 for insufficient compliance — the €899 million fine was one of the largest EU antitrust penalties at the time, announced the same week as the documentation commitment.

The protocols covered the core Windows networking stack: MS-SMB (Server Message Block, used for file and printer sharing), MS-RPCE (Remote Procedure Call extensions), NTLM and Kerberos authentication protocol extensions, Active Directory replication protocols, Group Policy object formats, and Exchange Server's MAPI communications. Together these protocols defined how Windows clients communicated with Windows servers for authentication, file access, directory services, and email — the foundation of corporate Windows networks since Windows NT 4.0 in 1996. Without accurate specifications, competing products had to reverse-engineer behavior from network captures, a laborious process prone to subtle incompatibilities that caused enterprise interoperability failures.

The most significant beneficiary was the Samba project, created by Andrew Tridgell in 1992 to implement SMB on Unix without access to Microsoft's specifications. Samba 3.x had achieved reliable Windows client file access and could join a Windows domain as a member server, but Active Directory domain controller functionality (allowing Linux to replace a Windows Server in a Windows network) required detailed protocol understanding that reverse engineering alone struggled to provide. Microsoft's 2008 specification publication, combined with the Open Specification Promise (a patent non-assertion commitment covering implementations of published protocols), accelerated Samba 4's Active Directory domain controller implementation — Samba 4.0 shipped December 11, 2012, fully implementing an Active Directory-compatible domain controller for the first time on Linux. This enabled enterprises to host Windows domain authentication services on Linux hardware without Windows Server licenses.
