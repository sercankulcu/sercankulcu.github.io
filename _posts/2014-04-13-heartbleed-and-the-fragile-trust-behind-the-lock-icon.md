---
title: 'Heartbleed And The Fragile Trust Behind The Lock Icon'
date: 2014-04-13
permalink: /posts/2014/04/heartbleed-and-the-fragile-trust-behind-the-lock-icon/
tags:
  - security
  - web
  - software
---

On April 7, 2014, a security bug called Heartbleed was publicly disclosed, making a library most people had never heard of suddenly important to millions of people. The bug — CVE-2014-0160 — affected OpenSSL, the open-source cryptographic library used by the majority of servers to provide HTTPS connections.

## The specific technical mistake

The TLS protocol includes a "heartbeat" extension: a way for a client to tell a server that the connection is still alive, by sending a small payload and requesting the same payload back. The extension sends a payload along with a field specifying the payload's length.

The bug: OpenSSL did not verify that the stated length actually matched the real payload length. An attacker could send a heartbeat message with a 1-byte payload but claim the payload was 64 kilobytes. OpenSSL would respond with 64 kilobytes of memory from the server process — whatever happened to be stored adjacent to the actual payload.

Those 64 kilobytes might contain nothing interesting. Or they might contain passwords, session tokens, private keys for the server's SSL certificate, or private messages. Because the attack is a normal heartbeat request from the server's perspective, it typically leaves no trace in server logs.

The bug was introduced in OpenSSL 1.0.1 (March 2012) and went undetected for approximately two years. Neel Mehta of Google Security and researchers at Codenomicon independently discovered it around the same time. An estimated 17% of all HTTPS-enabled servers were vulnerable at disclosure.

## What it requires to fix

Patching is necessary but not sufficient. Servers running affected OpenSSL versions need to update. But if a private SSL key was exposed before the patch — and there is no way to know whether it was — patching alone does not close the risk. The exposed key can still be used to impersonate the server or decrypt previously intercepted traffic. Affected servers need to generate new private keys, obtain new certificates, and revoke the old certificates.

Changing user passwords on a service is only useful after the server itself is patched and re-certificated; changing a password before that does not help and may transmit the new password through the same vulnerable channel.

## What this reveals about infrastructure

For most users, Heartbleed was confusing because we are taught that HTTPS and the lock icon mean a connection is protected. They do — but "protected" means the encryption algorithm is sound and the connection is authenticated. It does not mean the software implementing the encryption is free of bugs.

The OpenSSL Foundation, at the time of the disclosure, was maintained by a small number of people with minimal funding, despite being critical infrastructure for a significant portion of the internet's security. The source code was publicly available for inspection, but "open source" does not automatically mean "extensively reviewed." It means the source can be reviewed. Whether it is, and by whom, depends on resources, attention, and priority. Heartbleed was a two-year-old bug in one of the most security-sensitive libraries in wide use.

Security is not a feature added at the end. It is a chain of software, configuration, processes, and human decisions, and a failure at any link can propagate to every system that depends on the chain above it.
