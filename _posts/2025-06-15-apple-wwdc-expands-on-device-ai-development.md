---
title: Apple WWDC Expands On-Device AI Development
excerpt: "Apple's Foundation Models framework at WWDC 2025: guided generation, tool calling, adapters and Private Cloud Compute for developers."
date: 2025-06-15
permalink: /posts/2025/06/apple-wwdc-expands-on-device-ai-development/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Apple's WWDC 2025 (June 9–13, Cupertino) introduced iOS 26, iPadOS 26, and macOS Tahoe 26, with a significant portion of the developer keynote dedicated to the new Foundation Models framework, which opened the on-device model behind Apple Intelligence to third-party apps. The Foundation Models framework allowed third-party applications to call Apple's on-device approximately-3-billion-parameter language model without packaging model weights in the app bundle or routing requests to external APIs. The framework offered guided generation (constraining output to Swift types) and tool calling, and Apple's foundation models understood image and text inputs. Apple also provided a Python toolkit for training rank-32 adapters, lightweight layers that specialize the system model for domain-specific tasks without replacing the base model.

The on-device model ran on the Neural Engine in A-series and M-series chips — Apple Silicon required for Apple Intelligence, meaning devices prior to the A17 Pro (iPhone 15 Pro and later) or M1 (iPad and Mac) were excluded. Apple extended Private Cloud Compute — the server-side complement to on-device inference, designed so that user data is not stored or shared with Apple — to handle requests that the on-device model could not complete within quality or context-length limits. Users could also opt in to route requests to ChatGPT, with nothing sent to ChatGPT without the user's permission.

The approach changes application design because model availability and capability depend on the user's device. For developers, Foundation Models shifted inference cost from per-request API billing to the device hardware already owned by the user, making AI features in apps with large user bases financially viable without metering. WWDC 2025 turned on-device inference from an internal capability of Apple Intelligence into an API surface that developers could begin building products around ahead of the iOS 26 launch in the fall of 2025.

**Sources:** [Apple supercharges its tools and technologies for developers](https://www.apple.com/newsroom/2025/06/apple-supercharges-its-tools-and-technologies-for-developers/), [Updates to Apple's On-Device and Server Foundation Language Models](https://machinelearning.apple.com/research/apple-foundation-models-2025-updates)
