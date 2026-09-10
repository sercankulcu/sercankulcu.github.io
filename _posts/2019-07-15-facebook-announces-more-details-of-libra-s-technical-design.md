---
title: Facebook Announces More Details of Libra's Technical Design
date: 2019-07-15
permalink: /posts/2019/07/facebook-announces-more-details-of-libra-s-technical-design/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Facebook published the Libra whitepaper on June 18, 2019, through its Calibra subsidiary, proposing a global digital currency backed by a reserve basket of low-volatility assets — approximately 70% USD, 26% EUR, and smaller allocations to JPY and GBP government securities and money market funds. The Libra Association, incorporated in Geneva, Switzerland, launched with 28 founding members (later expanded to 100 targeted) including Visa, Mastercard, PayPal, Stripe, Uber, Lyft, and Spotify, each contributing $10 million. Facebook's own subsidiary Calibra (later Novi) would build the consumer wallet, while the Association would govern the protocol.

The technical design chose permissioned Byzantine fault-tolerant (BFT) consensus rather than Bitcoin's proof-of-work: LibraBFT, based on the HotStuff algorithm from VMware Research, required two-thirds of validator nodes to agree before finalizing a block — tolerating up to one-third Byzantine nodes. The transaction language, Move, was a resource-oriented programming language where monetary values were typed as resources that could not be copied or silently discarded, unlike Solidity's unconstrained integer arithmetic that had led to Ethereum smart contract bugs. The Libra blockchain used a Merkle tree structure to allow lightweight proof of transaction inclusion. The whitepaper projected that the permissioned network would transition to permissionless operation as the ecosystem matured, though no concrete timeline was given.

Regulatory response was immediate and hostile: U.S. Senate Banking Committee hearings on July 16, 2019 and House Financial Services Committee hearings on July 17 grilled Facebook's David Marcus over monetary sovereignty, privacy (given Facebook's Cambridge Analytica history), and systemic financial risk. By October 2019, PayPal, Visa, Mastercard, eBay, and Stripe had all withdrawn from the Association, citing regulatory uncertainty. The project rebranded as Diem in December 2020 with a simpler single-currency stablecoin design; Meta sold Diem's assets to Silvergate Bank in January 2022 and abandoned the project entirely. The Move programming language outlived the project: the Aptos and Sui blockchains, both founded by former Meta engineers in 2022, adopted Move as their smart contract language.
