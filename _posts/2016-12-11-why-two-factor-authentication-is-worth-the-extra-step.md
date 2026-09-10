---
title: 'Why Two Factor Authentication Is Worth The Extra Step'
date: 2016-12-11
permalink: /posts/2016/12/why-two-factor-authentication-is-worth-the-extra-step/
tags:
  - security
  - privacy
  - web
---

Passwords are structurally weak as the sole mechanism for account security, and the events of the past few years have made this concrete rather than theoretical. In 2012, LinkedIn suffered a breach that exposed 6.5 million password hashes; in 2016, it became clear that the actual number was 117 million. Yahoo's 2013 breach, disclosed in 2016, exposed credentials for 500 million accounts. Adobe, Dropbox, and dozens of other services have had major breaches. The stolen credentials from these breaches are traded and combined into large credential lists that attackers use in automated "credential stuffing" attacks — testing username and password combinations across many services simultaneously.

If you use the same password on multiple services, a breach at any one of them threatens the others. Most people reuse passwords, because remembering distinct strong passwords for dozens of accounts is genuinely difficult.

Two-factor authentication (2FA) changes the threat model. Even if an attacker has your username and password, they also need the second factor — and that factor is typically device-bound.

## How TOTP authenticators work

The most common form of second factor is a time-based one-time password (TOTP), standardized in RFC 6238. Apps like Google Authenticator, Authy, and Microsoft Authenticator implement this standard.

During setup, the server and your authenticator app share a secret key. Every 30 seconds, both the server and the app apply an HMAC-SHA1 function to the shared secret combined with the current timestamp, then truncate the result to a six-digit number. The numbers match because both sides are running the same computation with the same inputs. The code expires and a new one is generated every 30 seconds.

An attacker who steals your password but does not have your phone cannot generate valid codes. The window for using a stolen code is 30 seconds, and the code cannot be reused.

## SMS codes and their weakness

SMS authentication — receiving a code by text message — provides real protection against bulk credential-stuffing attacks, because most attackers cannot target millions of accounts via SMS. But it is weaker than TOTP against targeted attacks.

SIM swapping is the primary mechanism: an attacker contacts a mobile carrier, impersonates the account holder using personal information gathered from social engineering or public sources, and asks for the phone number to be transferred to a new SIM the attacker controls. The attacker then receives the victim's text messages. This technique has been used successfully against high-profile targets including cryptocurrency accounts and email accounts of journalists and executives.

For most accounts and most users, SMS 2FA is substantially better than no 2FA. For accounts where targeted attacks are plausible — senior employees, people with high-value accounts — TOTP or hardware tokens are worth the additional setup.

## Hardware tokens

YubiKey and similar hardware tokens implement the FIDO U2F (Universal 2nd Factor) and FIDO2 standards. The token plugs into a USB port (or taps via NFC) and signs a challenge from the server using a private key stored on the device. The private key never leaves the hardware. Phishing is defeated because the token verifies the domain of the request — a phishing site with a different domain cannot obtain a valid signature even if the user types their password there.

Major services including Google and GitHub support hardware tokens. Google reported in 2018 that after requiring hardware tokens for all employees, account takeovers dropped to zero among their 85,000-person workforce.

## Recovery matters as much as setup

2FA introduces a new problem: if the second factor is lost, the account may be inaccessible. Every service that offers 2FA should also offer backup codes — typically a set of ten or twenty single-use codes that bypass the normal second factor — which should be stored securely offline. Setting up 2FA without saving backup codes is a mistake that can result in permanent lockout.

The security improvement from 2FA is real and significant. A stolen password without the second factor is nearly worthless to an attacker. For email, cloud storage, and financial accounts especially, the extra step is proportional to what is being protected.
