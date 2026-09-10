---
title: Google Open-Sources TensorFlow
date: 2015-11-15
permalink: /posts/2015/11/google-open-sources-tensorflow/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

Google open-sourced TensorFlow on November 9, 2015 under the Apache 2.0 license. The project emerged from DistBelief, Google's internal first-generation distributed deep-learning system used to train the 2012 ImageNet model that sparked the deep-learning surge. TensorFlow was a complete rewrite, designed to be more flexible, faster on single machines, and easier to use outside Google. The initial release supported Python and C++ on Linux and Mac, with CUDA GPU acceleration available from day one.

TensorFlow represented computations as a static dataflow graph: Python code defined operations (convolution, matrix multiply, activation functions) and the tensors flowing between them, then a session compiled and executed that graph on whatever hardware was available. Automatic differentiation — computing the gradient of every operation with respect to its inputs — was built into the graph compiler, allowing backpropagation to happen automatically for any model architecture a developer could describe. This was a significant practical improvement over writing gradient computations by hand, which was error-prone and time-consuming.

Theano (from Université de Montréal) and Caffe (from UC Berkeley) had preceded TensorFlow as open deep-learning frameworks, but TensorFlow's production pedigree, Google's support, and its ability to scale from a laptop to hundreds of distributed machines using the same API gave it rapid adoption. By 2017 it was the most starred machine-learning project on GitHub. Facebook open-sourced PyTorch in January 2017, offering a dynamic computation graph (define-by-run rather than define-then-run) that made debugging and experimentation faster; by 2019 PyTorch had overtaken TensorFlow in research paper citations. TensorFlow 2.0, released September 2019, made eager execution the default to close that gap.
