---
title: 'Four Years After ChatGPT: What Changed in Learning and Teaching'
excerpt: "ChatGPT launched on 30 November 2022. A computer engineering teacher looks at what changed for students, what did not, and what is worth teaching now."
date: 2026-11-22
permalink: /posts/2026/11/four-years-after-chatgpt/
tags:
  - artificial-intelligence
  - education
---

On 30 November 2022, OpenAI published a short post announcing a "research preview" of a chatbot called ChatGPT. Nobody in a classroom had a policy for it. A week from now it will be four years old, which is long enough to stop talking about a novelty and start talking about a habit.

This is a reflection from the teacher's side of the desk. It is not a study, and it does not claim to speak for every classroom. It tries to separate what has really changed in learning and teaching from what only feels different.

## What changed: the first draft is free

The biggest change is simple. A student who is stuck no longer has to wait for office hours, a forum answer, or a lucky search result. An assistant is available at any hour, never loses patience, and will explain the same idea five different ways.

For programming, this is a real gain. Error messages that used to be a wall of text can be translated into plain language. A first version of a function, a unit test, or a regular expression appears in seconds. Boilerplate that once consumed an evening is gone.

The scale of this shift shows in developer surveys. In the 2025 Stack Overflow Developer Survey, 84% of respondents said they use or plan to use AI tools, and 47.1% said they use them daily. Students are entering a profession where this is the normal environment, so pretending otherwise would be poor preparation.

## What did not change: understanding still happens in someone's head

The same survey contains a warning. 66% of developers named "AI solutions that are almost right, but not quite" as their top frustration, and 45.7% said they distrust the accuracy of AI output. OpenAI itself said in the 2022 announcement that the model sometimes writes "plausible-sounding but incorrect" answers.

"Almost right" is the key phrase for a teacher. Code that is almost right passes a quick look, passes the first test, and fails on the edge case. To notice that, you need to know what the code should do and why. That knowledge is exactly what a course is supposed to build: what a pointer is, why a loop terminates, what a sorted insert costs, what happens to the stack when a function returns.

Nothing about the fundamentals became optional. If anything, they became the filter that separates a person who uses an assistant from a person who is led by it.

## Debugging is the skill that gained value

A generated solution is a hypothesis, not an answer. The work that remains with the human is to read it, run it, predict its behavior, and find where reality disagrees.

That is debugging, and it cannot be skipped. A student who has never traced a program by hand tends to accept whatever the assistant produces. A student who has debugged hundreds of small failures reads the output with suspicion, which is the right attitude.

There is also research that warns against assuming speed is automatic. In a randomized controlled trial published by METR in July 2025, 16 experienced open-source developers worked on 246 real issues in repositories they knew well. When AI tools were allowed, they took 19% longer. They had expected to be 24% faster, and even afterward they believed they had been 20% faster. The study was small, it covered experienced people on familiar code, and the tools have moved on since; METR itself notes that newer data exists. The lasting lesson is not "AI is slow." It is that our feeling of productivity is a poor instrument, and measurement matters.

## Assessment had to be rethought

Take-home assignments used to say something about the student who submitted them. Now they say something about the student and the tools they chose. This does not make every assignment worthless, but a grade on an unsupervised exercise is weaker evidence than before.

The adjustments that make sense are not dramatic:

- Put more weight on supervised work: written exams, lab sessions, short oral explanations of one's own code.
- Ask questions that test reasoning, such as "what does this program print, and why?" or "find the bug in this code."
- Make the process visible. A short note on what was tried, what failed, and what was changed tells more than the final file.
- Keep assignments that are meant for learning low-stakes, so the temptation to outsource them is small.

None of this is a defense against cheating. It is a way of keeping the grade connected to what the student can actually do.

## Honest use, written down

Students need a clear rule, not a vague suspicion. A workable version is short: use an assistant to explain, to check, to generate examples, and to review; do not submit what you cannot explain line by line; say when and how you used it.

The last part matters. In professional life, nobody is embarrassed that an assistant helped. People are embarrassed when code reaches review and its author cannot say why it works. Disclosure turns the tool from a secret into a normal part of the workflow, and it lets the teacher respond to what the student really did.

It also helps to model good use in class. Showing a wrong answer from an assistant, and then fixing it together with the students, teaches more about verification than a lecture on the subject.

## What to teach now

If the first draft is free, the scarce skills are the ones around it:

1. **Specification.** Describing a problem precisely, with inputs, outputs, and constraints, is half of solving it. An assistant is only as good as the question.
2. **Reading code.** Students will read more code than they write, including code nobody on the team wrote.
3. **Testing and verification.** Choosing the edge cases that would break a solution is now a core skill.
4. **Fundamentals.** Algorithms, data structures, memory, operating systems, and low-level machines are still the vocabulary for judging any answer.
5. **Judgment about limits.** Knowing when a model is likely to be wrong, and when to stop asking and read the documentation.

For the broader picture, the [AI and Data Courses guide](/teaching/ai-courses/?lang=en) collects the AI and data material on this site. The day the tool appeared is recorded in an earlier post, [OpenAI Releases ChatGPT](/posts/2022/11/openai-releases-chatgpt/), and the move of assistants into the editor is covered in [AI Coding Assistants Are Becoming Part of the Editor](/posts/2024/03/ai-coding-assistants-are-becoming-part-of-the-editor/).

## A short closing

Four years on, the most accurate summary may be that ChatGPT changed how quickly answers arrive, but not how understanding is built. Understanding still comes from effort, practice, and being wrong in a way you can learn from. The teacher's job is to keep that effort meaningful, while letting students use the best tools of their time.

**Sources:** [OpenAI, "Introducing ChatGPT" (30 November 2022)](https://openai.com/index/chatgpt/), [METR, early-2025 AI and experienced open-source developer productivity study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), [Stack Overflow Developer Survey 2025, AI section](https://survey.stackoverflow.co/2025/ai)
