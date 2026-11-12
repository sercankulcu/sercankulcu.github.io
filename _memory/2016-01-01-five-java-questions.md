---
title: "Five Java Questions"
date: 2016-01-01
description: "An academic exam I won in 2016 included five short Java questions. None of them was difficult, and every one of them asked whether I could see exactly what a few lines of code do."
tags:
   - academia
   - programming
   - java
   - exams
---

In 2016 I sat an academic exam, and part of it was five short Java questions. Each one fit in a few lines. Each one asked the same thing: what does this code print?

The exam went well. I won it.

What stayed with me afterwards was not the result but the questions. They looked almost too simple for an exam of that kind, and that was exactly their point. None of them tested whether I knew a library or remembered a syntax rule. Each one tested whether I could read a small piece of code and see what it actually does, rather than what it seems to do at a glance.

The first one read a line of text and copied it into a character array backwards. The answer is the reversed line, but the interesting part is the last statement, `System.out.println(backup)`. It works only because Java has a special `println` for character arrays. Put the same array into a string with `+` and Java prints something like `[C@1b6d3586` instead. The code is correct almost by accident.

The second was an `if` followed by an `else if`. The first condition is false, so its two lines never run. A hurried reader runs them anyway and gets 12210. The answer is 9900.

The third and fourth added up the numbers below 1000, once with a `for` loop and once with a `while` loop. The answer is 499500, not the 500500 that the famous formula gives for 1 to 1000. The pair also quietly asks whether you see that the two loops are the same loop written two ways.

The fifth halved 32 until it reached 1 and counted the steps. Five. It is a logarithm hiding in a `while` loop, with an unused variable placed beside it to see whether you would look for a purpose that was not there.

None of these is hard. That is why they are good questions. The mistakes they invite are the ones every programmer makes on a tired day: reading the code you expect instead of the code that is written, being off by one at a boundary, trusting a line that works for a reason you have not noticed. An exam can reward speed or memory. These five rewarded attention.

I teach programming now, and I still find that the most useful question to ask about a piece of code is the plainest one: what exactly does this print?

The five questions, the original exam code and the answers are in a small repository: [five-java-questions](https://github.com/sercankulcu/five-java-questions). Try them before you open the answers.

## After Five Java Questions

Some exams are remembered for their difficulty. This one I remember for its restraint: five small programs, each asking for nothing more than careful reading, and each a little harder to get right than it looks.
