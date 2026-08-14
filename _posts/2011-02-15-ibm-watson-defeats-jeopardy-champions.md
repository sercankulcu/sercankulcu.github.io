---
title: IBM Watson Defeats Jeopardy Champions
date: 2011-02-15
permalink: /posts/2011/02/ibm-watson-defeats-jeopardy-champions/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

IBM's Watson defeated former Jeopardy! champions Ken Jennings and Brad Rutter in February 2011. The system had to solve a problem very different from ordinary database lookup: clues often depended on wordplay, ambiguity, culture, and indirect references.

Watson used IBM's DeepQA architecture. It generated many candidate answers, searched large collections of text, extracted evidence, scored that evidence with hundreds of features, and combined the scores using machine-learning models. The machine did not simply search the web; the competition system was largely self-contained and ran on a large cluster of IBM POWER7 servers.

The most interesting part was confidence estimation. Watson had to decide not only what answer seemed best, but whether it was confident enough to buzz before a human opponent. That combination of retrieval, language processing, ranking, and confidence scoring anticipated many later question-answering systems.
