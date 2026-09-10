---
title: 'About Social Network Analysis'
date: 2016-11-12
permalink: /posts/2016/11/about-social-network-analysis/
tags:
  - career
  - software
---

Social network analysis studies relationships rather than only individuals. That small shift in perspective — from nodes to edges, from people to the structure between them — can reveal things that individual-level data cannot.

## The model and its history

A social network is a graph: a set of nodes (people, organizations, computers, any actors) connected by edges (friendships, communications, collaborations, citations, any relationships). Once a group is represented this way, structural questions become answerable: who is most central? Which people or nodes connect otherwise separate clusters? How quickly does information or a disease spread through the network? Where are the bottlenecks?

The intellectual history is longer than the digital platforms associated with the term today. Jacob Moreno, a sociologist, drew what he called sociograms in the 1930s — visual maps of interpersonal relationships in classrooms and communities. Stanley Milgram's 1967 "small world" experiment, where letters were passed through personal acquaintances to reach a distant target, produced the first empirical evidence for the "six degrees of separation" idea. Mark Granovetter's 1973 paper "The Strength of Weak Ties" observed that weak connections (acquaintances rather than close friends) are often more valuable for receiving new information, because strong ties tend to connect people who already share the same information.

## Centrality measures

The same graph produces different answers to "who is important" depending on how importance is defined:

- **Degree centrality**: number of direct connections. High degree nodes are locally active.
- **Betweenness centrality**: how often a node lies on the shortest path between two other nodes. High betweenness nodes are bridges — removing them can disconnect communities.
- **Closeness centrality**: average distance from a node to all others. High closeness nodes can reach the rest of the network quickly.
- **Eigenvector centrality**: a node is important if it is connected to other important nodes. Google's PageRank algorithm is a variant of this, applied to web pages rather than people.

These measures often disagree. A person with many connections (high degree) may not be a bridge between communities (low betweenness). A person with few connections may be uniquely positioned between groups that would not otherwise communicate.

## Scale-free networks

Real social networks exhibit a pattern described by Barabási and Albert in 1999: most nodes have few connections, while a small number of "hubs" have many — a power-law degree distribution. This is the opposite of a random network where connections are uniformly distributed. The mechanism they proposed, preferential attachment, means that new nodes are more likely to connect to already-highly-connected nodes. This model describes the web's link structure, citation networks, and social platforms.

## Applications

Information spreads through networks following predictable patterns — a useful property for both understanding how good ideas propagate and how diseases or misinformation spread. Epidemiologists model disease transmission through contact networks; marketers model viral sharing through social graphs; security analysts model attack propagation through infrastructure networks.

LinkedIn's connection graph surfaces people who might be useful introductions. Facebook's algorithm infers relationships and community structure from interactions. Recommendation systems use collaborative filtering, which is essentially a network problem: what do people connected to you prefer?

Python's `networkx` library and the visualization tool Gephi are common tools for analysis. Networks with millions of nodes require more efficient approaches.

## The ethical dimension

A social network can reveal sensitive information even when individual data appears harmless. The pattern of connections may reveal political affiliation, sexual orientation, health conditions, or financial relationships that no individual would volunteer. The ability to analyze social structure at scale creates a responsibility to consider what the analysis is used for.

People do not exist in isolation, and data analysis that treats them as isolated individuals misses the structure that often explains the most interesting things.
