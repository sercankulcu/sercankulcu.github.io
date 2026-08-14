---
title: Google Introduces the Tensor Processing Unit
date: 2016-05-15
permalink: /posts/2016/05/google-introduces-the-tensor-processing-unit/
tags:
  - technology
  - computing-history
  - history
---

Google revealed the Tensor Processing Unit, or TPU, in 2016 as a custom accelerator designed specifically for machine-learning inference. Instead of trying to be a general-purpose CPU or graphics processor, the first TPU focused heavily on the matrix operations common in neural networks.

The chip used a systolic-array style matrix multiplication unit that moved data through many arithmetic cells with high reuse. It also supported lower-precision integer computation, which can be much more efficient than full floating-point arithmetic when serving trained models.

Google had already deployed TPUs internally for products such as Search and Street View. The announcement showed that machine-learning workloads had become large and predictable enough to justify custom silicon. Later TPU generations added training support and became a major part of Google Cloud's AI infrastructure.
