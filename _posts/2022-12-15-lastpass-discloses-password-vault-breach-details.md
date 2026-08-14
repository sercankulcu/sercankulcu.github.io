---
title: LastPass Discloses Password Vault Breach Details
date: 2022-12-15
permalink: /posts/2022/12/lastpass-discloses-password-vault-breach-details/
tags:
  - technology
  - computing-history
  - history
---

LastPass disclosed in December 2022 that attackers had obtained backups containing customer vault data after an earlier breach of its development environment.

Sensitive password fields inside LastPass vaults were encrypted, but other metadata was not protected in the same way. Attackers could obtain website URLs and encrypted vault blobs, then attempt offline password guessing against users whose master passwords were weak. Because the attacker already had the ciphertext, rate limiting on LastPass servers could not stop those guesses.

The incident showed why password-manager security depends heavily on key derivation. A strong master password and a deliberately expensive derivation function increase the cost of each offline guess. It also demonstrated how one compromised developer environment can become the first stage of a much larger cloud-data breach.
