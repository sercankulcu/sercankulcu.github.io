---
title: 'Software Bug Of Therac-25'
date: 2020-06-02
permalink: /posts/2020/06/software-bug-of-therac-25/
tags:
  - self-improvement
---

The Therac-25 is one of the most disturbing cases in software-engineering history because the consequences of failure were not lost files or a crashed program. People were injured and killed.

Therac-25 was a computer-controlled radiation therapy machine developed by Atomic Energy of Canada Limited. Between 1985 and 1987, several patients received massive radiation overdoses.

The accidents were not caused by one simple programming mistake. They came from a dangerous combination of software defects, race conditions, poor interface design, weak testing, and excessive trust in software.

Earlier machines had more hardware safety mechanisms. Therac-25 relied more heavily on software to prevent dangerous states. That decision increased the importance of software correctness.

Operators sometimes entered commands quickly and reached combinations of states that developers had not handled safely. Error messages were also difficult to understand. The machine could report a malfunction without making the seriousness of the situation clear.

I think this is the most important part of the story. A safety-critical system is not only an algorithm. It includes the software, hardware, interface, operator, documentation, testing process, and organization around it. If any of these parts encourages unsafe assumptions, the whole system can become dangerous.

The Therac-25 accidents changed how many people think about software safety. They are still discussed in computer-science and engineering courses because the lessons remain relevant.

Testing matters. Independent safety mechanisms matter. Clear error messages matter. And when software controls something that can physically harm a person, "probably correct" is not a good enough standard.
