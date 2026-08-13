---
title: 'Apple Silicon And The Return Of Processor Diversity'
date: 2021-01-31
permalink: /posts/2021/01/apple-silicon-and-the-return-of-processor-diversity/
tags:
  - hardware
  - processors
  - technology
---

Apple's first Macs with the M1 processor have made processor architecture visible to ordinary users again. For many years, most personal computers followed the x86 world closely enough that software developers could often ignore the architecture underneath the operating system.

The M1 changes that assumption. Apple has moved its Mac line toward ARM-based processors designed by the company itself. The same broad architecture family has dominated phones and tablets for years, but a high-performance desktop and laptop transition makes the comparison more interesting.

Early results are impressive, especially in performance per watt. Laptops can deliver strong performance while using relatively little power, which helps battery life and reduces heat. The system-on-chip design also integrates CPU cores, graphics, memory-related components, and other specialized hardware closely.

The difficult part is software compatibility. Applications compiled for Intel processors cannot simply become ARM applications by changing a setting. Apple uses Rosetta 2 to translate many existing applications, while developers can build universal binaries that contain versions for both architectures.

For programmers, the transition is a reminder that abstractions are not permanent. A language runtime, operating system, or compiler usually hides processor details until some assumption breaks. Native libraries, virtual machines, containers, and development tools all need to adapt.

I like seeing competition return to a part of computing that had become easy to treat as settled. Architecture matters because efficiency matters.

The fastest computer is not always the one that consumes the most power. Sometimes a different design changes the question.
