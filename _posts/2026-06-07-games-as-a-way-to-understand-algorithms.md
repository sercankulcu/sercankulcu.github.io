---
title: 'Games as a Way to Understand Algorithms'
date: 2026-06-07
permalink: /posts/2026/06/games-as-a-way-to-understand-algorithms/
tags:
  - games
  - algorithms
  - education
  - programming
---

Games are full of algorithms, but we rarely notice them because we are busy trying to win. A path has to be found. An opponent has to decide what to do. A score has to be updated. Behind many small game actions is a computer science problem that has a real name and a real solution.

This is one reason I find games useful as teaching tools. The algorithm is not abstract — it is doing something you can watch.

## Pathfinding in games

Breadth-first search (BFS) visits nodes level by level, guaranteeing the shortest path in terms of number of steps. Placed inside a grid maze — walls, open cells, a start position, and a goal — it becomes immediately concrete. The frontier expands outward from the start in all reachable directions simultaneously, like water spreading across the floor. When it reaches the goal, the shortest path is the one it took to get there.

A* (A-star) extends BFS with a heuristic — a function that estimates how close each cell is to the goal, typically the straight-line distance. By prioritizing cells that are closer to the goal as well as closer to the start, A* reaches the goal much faster than BFS in large spaces, at the cost of not always finding the absolute shortest path if the heuristic is imperfect.

Video games use A* extensively for enemy navigation — pathfinding around obstacles, finding a route from an enemy's position to the player's position in a changing map. The same algorithm that finds a path in Pacman's pursuit of the player can be traced directly to a textbook description of A* with a Manhattan distance heuristic.

## Decision-making and minimax

Two-player zero-sum games — chess, checkers, tic-tac-toe — have a natural algorithmic structure: one player tries to maximize their advantage, the other tries to minimize it. The minimax algorithm searches the game tree, evaluating positions at the leaves and propagating values up: at nodes where the maximizing player acts, take the maximum of children; at nodes where the minimizing player acts, take the minimum.

Alpha-beta pruning eliminates branches of the tree that cannot affect the result — if we already know the maximizing player can guarantee a score of 5, we can stop examining a subtree where the minimizing player can force the value below 5. Alpha-beta allows the same minimax decision with roughly half the tree nodes examined.

A student who has played tic-tac-toe and then implements minimax for it discovers immediately that the algorithm is mechanical — it does not "understand" the game. It just searches. The insight that machine intelligence can come from exhaustive search rather than understanding is one of the foundational ideas of the field, and games make it concrete.

## Randomness and probability in games

Games with randomness — dice, card draws, random enemy spawns — require reasoning about probability rather than fixed outcomes. Expected value: if an action gives a 30% chance of a large reward and a 70% chance of a small reward, is it better or worse than a safe action with a moderate certain reward?

This is directly the same question as in decision theory and reinforcement learning. Games that force this kind of decision — do I take the risky chance or the safe path? — give students an intuition for probability and expected value that pure calculation problems rarely provide, because the decision has a consequence they feel when it goes wrong.

## Programming a game to teach algorithms

Implementing a game is algorithmically dense in ways that are invisible from the player side. Consider tic-tac-toe:

- Representing the board state (array, bitmask, or object)
- Validating that a move is legal (checking the cell is empty)
- Detecting a win (checking rows, columns, and diagonals)
- Generating all legal next moves from a position
- Implementing minimax to make the computer play optimally

Each of these is a small algorithm problem. Together they are a complete programming project. The student who implements all of them has practiced data representation, loop design, recursion, and basic game tree search — connected by a context that makes the relationship between input and output immediately visible.

Games make failure normal. A wrong move has an immediate and reversible consequence. That is a healthier feeling for learning than answers that are graded as correct or incorrect once, after the thinking is done.
