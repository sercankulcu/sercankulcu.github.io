---
title: 'Staying Engaged In Computer Science Classes'
date: 2023-10-21
permalink: /posts/2023/10/staying-engaged-in-computer-science-classes/
tags:
  - education
  - computer-science
  - students
---

Computer science classes can become difficult for a reason that has nothing to do with intelligence: the subject moves from concrete to abstract unusually fast. A student learns to write a loop on Monday and hears about time complexity, memory models, and formal proofs before the month ends. It is easy to lose the thread between what you can see on the screen and what the teacher is now talking about.

Here is what I have found actually helps.

## Ask the next question, not just the current one

The most common engagement mistake is treating a class as a series of facts to record. If the lecture explains how a binary search tree works, writing down the definition is the minimum. The more useful habit is asking what it does not do: what happens when the tree becomes unbalanced? How does it compare to a hash table? When would I choose one over the other?

This kind of question forces you to connect the concept to something you already know. It also makes the concept memorable in a way that a clean copy of the slide does not.

One practical technique: before the teacher runs example code, predict the output. Write down what you expect to happen. Then watch what actually happens. When your prediction is wrong — and it will be wrong regularly at first — the discrepancy tells you exactly where your mental model needs repair. This is far more efficient than reviewing notes after the fact.

## Find the concrete version of every abstraction

Computer science abstractions exist because concrete implementations are tedious to work with directly. But understanding the abstraction requires having experienced the concrete version first.

If the class is covering queues, implement one. Not a sophisticated one — twenty lines of code using an array, with enqueue and dequeue operations. Then use it for something: simulate a print queue, process items in order, anything. The abstract definition of a queue as a FIFO data structure becomes obvious once you have written `enqueue` and `dequeue` a few times.

If the class is covering graph algorithms, draw a small graph on paper and trace the algorithm by hand before trying to understand the code. Seven nodes, some edges, a starting point. Follow Dijkstra's algorithm step by step. The code will make much more sense because you have already performed the computation manually.

Operating system concepts are particularly abstract. "Process scheduling" means very little until you observe it. On Linux, `htop` shows running processes and their CPU usage in real time. Watching the scheduler switch between processes while you run a CPU-intensive task beside normal work turns a textbook paragraph into something observable.

## Take notes in your own words

Copying slides produces a record. Rewriting ideas in your own words produces understanding.

The test for whether you have actually processed a concept: can you explain it to someone who was not in the class, without looking at the slides? If you can write two sentences about what a hash collision is and how it is handled — in your own language, not the textbook's — you understood it. If you can only recognize the correct answer among options, you have memorized rather than understood.

During lecture, write the idea in your own words immediately after hearing it, even if what you write is imperfect. The imperfection is useful — it shows you where the concept is still unclear, while the class is still happening and a question is still possible.

## Study groups work when people teach, not when people divide

Study groups can be extremely useful or a complete waste of time, depending on how they function.

The useful version: someone attempts to explain a concept to the group without looking at notes. Others interrupt with corrections and questions. The explanation is refined. Someone else tries a different explanation. Everyone leaves having heard multiple framings of the same idea.

The unproductive version: different people complete different parts of a problem set and share answers. Everyone walks away with completed homework and no additional understanding.

Teaching a concept to another person is one of the fastest ways to discover gaps in your own understanding. You cannot easily fake an explanation the way you can fake recognition. If you cannot explain it, you do not yet understand it — and this is good information to have before the exam.

## Engagement follows effort, not the reverse

Not every topic will feel immediately interesting. Some subjects require working through a period of confusion and difficulty before interest develops. The natural-language processing lecture is incomprehensible until the third one. The dynamic programming problem seems impossible until you have solved three examples and the pattern appears.

Interest and engagement are often the result of effort rather than the precondition for it. A topic that seems dry or abstract frequently becomes interesting once you are good enough at it to see something more than the surface. Waiting to feel engaged before engaging is usually the wrong order.
