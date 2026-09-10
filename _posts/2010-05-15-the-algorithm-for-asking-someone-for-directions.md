---
title: "The Algorithm for Asking Someone for Directions"
date: 2010-05-15
permalink: /posts/2010/05/the-algorithm-for-asking-someone-for-directions/
tags:
   - programming
   - university
   - humor
   - overthinking
   - memories
---

There is a special kind of problem that exists only because you decided to think about it too much. Asking someone for directions is a good example. You are somewhere unfamiliar, you do not know where to go, and there are people around. The sensible solution is obvious: ask one of them. That should be the entire algorithm — input: lost person, process: ask nearby person, output: direction, complexity: almost constant.

Human beings, unfortunately, are capable of improving this simple algorithm until it no longer works. Years ago, I wrote about the problem of choosing the right person to ask for directions. My conclusion was that the selection process itself would probably crash with a segmentation fault or enter an endless loop, and even if it somehow survived, the computational complexity would be so terrible that anyone designing such an algorithm deserved to fail Data Structures and Algorithms. That was the joke. But it was also a fairly accurate description of overthinking, because the moment you stop asking "who is nearby?" and start asking "who is the best person to ask?" you have created a search problem.

That man looks local — maybe, but he is walking quickly, probably in a hurry. That woman looks approachable, but maybe she is also lost. The older man might know the area well, unless he is visiting. That group looks like students, and students know everything around here, except they may give directions based entirely on landmarks that no longer exist. The person at the bus stop probably knows, unless they are waiting for the same bus for the first time. This person looks friendly, that person looks informed, the other person looks like they might actually stop. Now compare them, assign weights: local knowledge 0.7, probability of answering 0.8, walking-speed penalty -0.3, headphone penalty -0.5, eye-contact bonus +0.2. Congratulations. You are still lost.

The beautiful thing about overthinking is that it feels productive while preventing action. You are not doing nothing — you are evaluating, optimizing, considering alternatives, avoiding error. From the outside, however, you are standing on a pavement looking at strangers. No progress has been made.

This is where programmers can become especially ridiculous. We are trained to think about efficiency, correctness, edge cases, optimal solutions. What happens if the input is wrong? What happens if the process fails? Can the solution scale? Useful questions, very useful questions — but not every part of life deserves an optimal algorithm. Sometimes you just need an answer. That distinction is harder than it sounds.

In software, choosing the wrong algorithm can matter enormously. A solution that works for ten elements may collapse at a million; an inefficient search may become unusable; a bad data structure may create problems everywhere else. So we learn to respect design before action. Then the habit escapes the computer. Now you are choosing a restaurant, a route, a movie, a phone, a person to ask for directions — and you begin optimizing decisions whose cost of failure is almost zero. What if I ask the wrong person? Then they say, "I don't know." That is the failure mode. You survive. You ask someone else.

This is an important category of problem: problems where trying the wrong solution is cheaper than thinking about the perfect one. We often treat them as if they are the opposite, maybe because thinking feels safer. Action creates the possibility of embarrassment. You ask a stranger, they do not hear you, you repeat yourself, they misunderstand, you realize you were standing fifty meters from the place you were looking for. All mildly unpleasant. So the brain proposes analysis as protection: wait, choose carefully, find the ideal person, then there will be no awkwardness. This strategy can reduce awkwardness to zero by making sure you never ask anyone. A flawless system — no incorrect answers, no correct answers either.

I think this is why the old entry ended with practical advice: ask the nearest breathing woman, and even if she gives you the wrong answer, the important thing is beginning. The gendered joke belonged very much to the younger version of me and the tone of those entries; the underlying advice is better if simplified — ask the nearest available person. The first answer does not need to be perfect. You can verify it, ask again, look for a sign, adjust. Movement gives you new information. Standing still does not.

There is a programming lesson here too. Sometimes developers try to design the entire system before building the smallest working piece. Every future possibility enters the architecture: what if we later need ten million users, what if this module eventually supports seventeen different protocols, what if the data model changes completely, what if somebody wants to run it on a refrigerator in 2042? Soon the design is magnificent. The software does not exist.

The opposite approach can feel intellectually less impressive: build something small, test it, learn, change it. But a working imperfect system provides information that a perfect imaginary system cannot. The same is true in ordinary life. Apply for the job, send the message, ask the question, take the first route, try the restaurant, start the project. You are allowed to update the plan afterward. The world is interactive; it gives feedback. This seems obvious until fear enters.

Fear loves optimization. If there is one perfect choice, then delaying the decision becomes responsible — you are not avoiding action, you are searching for the optimum. Very respectable. The search may continue forever. In computer science, an endless loop is easy to recognize: the program keeps running, nothing useful changes. Human endless loops are less visible — should I? Maybe. But what if? Then perhaps... No, because... Return to beginning. The processor is your brain. The electricity bill is your life.

This is why I still like the idea of describing social hesitation with programming errors. A segmentation fault is what happens when a program touches memory it should not. An endless loop is what happens when it never reaches an exit condition. Both are excellent metaphors for a mind that has turned a trivial interaction into a systems-design problem — sometimes we crash because we reached too far, sometimes we remain stuck because we refuse to move at all.

The cure is often embarrassingly simple. Reduce the problem: what do I actually need? Directions. Who can possibly provide them? Someone nearby. Ask. That is enough. Not every decision needs a scoring function. Not every interaction needs prediction. Not every uncertainty needs elimination before action. There are moments when the complexity of choosing exceeds the complexity of recovering from a bad choice, and those moments deserve simpler algorithms.

Maybe that is one of the most useful things programming eventually teaches you: good engineering is not always about building the most sophisticated solution, but about matching the solution to the problem. If asking for directions takes longer than walking randomly until you find the place, your algorithm has failed. And if you are still evaluating candidates while everyone else has already crossed the street, you may have optimized the wrong thing. So ask someone. If they do not know, ask another person. The important thing is not finding the perfect first node in the search graph. The important thing is finally moving.
