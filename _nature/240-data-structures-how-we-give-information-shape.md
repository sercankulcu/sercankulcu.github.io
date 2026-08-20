---
title: 'Data Structures: How We Give Information Shape'
permalink: /nature/240-data-structures-how-we-give-information-shape/
chapter: 13
chapter_title: 'Computation and Computer Science'
order: 240
tags:
   - data-structures
   - representation
   - algorithms
   - abstraction
   - information
---

Information has no single natural shape inside a computer.

We choose one.

The same collection of values can be organized as:

- an array,
- a linked list,
- a tree,
- a graph,
- a hash table.

These choices are called **data structures**.

They determine what becomes easy and what becomes expensive.

## Data Structure

A data structure is an organized representation of data together with operations that make use of that organization.

It is not merely storage.

It is a computational commitment.

## Same Data, Different Shape

Suppose we store:

\[
10,20,30,40
\]

In an array, the elements occupy indexed positions.

In a linked list, each element points to the next.

The values are the same.

The structure changes.

## Why Shape Matters

In an array:

random indexed access can be fast.

In a linked list:

insertion at a known position can be simple.

Different structures optimize different operations.

## There Is No Best Data Structure

The correct question is not:

Which data structure is best?

It is:

Best for what workload?

Design depends on:

- operations,
- frequency,
- constraints.

## Abstract Data Type

An **abstract data type** specifies behavior without fixing implementation.

A stack supports:

- push,
- pop,
- top.

Whether implemented by array or linked list is secondary.

Abstraction separates interface from structure.

## Stack

A stack follows:

**Last In, First Out**

or LIFO.

Like a stack of plates:

the most recently added item leaves first.

## Stack Applications

Stacks appear in:

- function calls,
- undo systems,
- expression evaluation,
- depth-first search.

A simple structural rule organizes many processes.

## Queue

A queue follows:

**First In, First Out**

or FIFO.

Like a line of waiting customers:

the earliest arrival leaves first.

## Queue Applications

Queues appear in:

- scheduling,
- buffering,
- breadth-first search,
- message systems.

Order captures fairness or temporal sequence.

## Priority Queue

A priority queue removes the item with highest or lowest priority rather than earliest arrival.

This is useful in:

- schedulers,
- pathfinding,
- simulations.

It is commonly implemented with a heap.

## Array

An array stores elements in indexed order.

It supports efficient direct access:

\[
A[i]
\]

Arrays exploit contiguous or logically indexed structure.

## Linked List

A linked list stores each element with a reference to another element.

It trades direct indexing for flexible local insertion and deletion.

The representation changes the cost model.

## Tree

A tree represents hierarchical structure.

Examples include:

- file systems,
- organizational charts,
- syntax trees.

Each node may have descendants.

Hierarchy becomes explicit.

## Binary Search Tree

A binary search tree maintains an ordering relation.

Values smaller than a node typically go left.

Larger values go right.

When balanced, search can be efficient.

## Balance Matters

A perfectly balanced tree can have height roughly:

\[
O(\log n)
\]

A badly skewed tree can degrade toward:

\[
O(n)
\]

Structure quality affects algorithmic complexity.

## AVL and Red-Black Trees

Balanced search trees such as:

- AVL trees,
- red-black trees

perform rotations and maintain invariants.

They spend effort preserving structure to guarantee future efficiency.

## Heap

A heap is a partially ordered tree-like structure.

A min-heap maintains:

parent ≤ children.

This makes the minimum easy to access.

Heap organization is designed for priority operations.

## Hash Table

A hash table maps keys to positions using a hash function.

Average lookup can be close to:

\[
O(1)
\]

under good assumptions.

This is achieved by changing representation.

## Collision

Two keys may map to the same location.

This is a **collision**.

Hash tables therefore need strategies such as:

- chaining,
- open addressing.

Representation creates new failure modes.

## Graph

A graph represents arbitrary relationships.

It contains:

- vertices,
- edges.

Unlike trees, graphs can contain:

- cycles,
- multiple paths,
- dense connectivity.

## Graph Applications

Graphs model:

- roads,
- social networks,
- web links,
- dependencies,
- biological interactions.

Many real systems are naturally relational.

## Adjacency Matrix

A graph can be represented as a matrix.

For n vertices, an adjacency matrix uses roughly:

\[
O(n^2)
\]

space.

Edge queries can be very fast.

## Adjacency List

An adjacency list stores neighbors for each vertex.

For sparse graphs, it can use approximately:

\[
O(n+m)
\]

space, where m is the number of edges.

Representation should match density.

## Set

A set stores distinct elements.

Typical operations include:

- insert,
- delete,
- membership.

A set may be implemented using:

- hash table,
- balanced tree,
- bit vector.

The abstract concept does not determine representation.

## Map

A map associates keys with values.

Examples:

- student ID → student record,
- word → frequency.

Maps are among the most fundamental structures in software.

## Trie

A trie organizes strings by shared prefixes.

Words such as:

- car,
- card,
- care

share initial path structure.

The representation makes prefix search efficient.

## Union-Find

The union-find structure maintains disjoint groups.

It supports:

- find,
- union.

It is useful in connectivity problems such as Kruskal's minimum spanning tree algorithm.

## Data Structure and Algorithm Are Partners

An algorithm's performance often assumes a particular data structure.

Dijkstra's shortest-path algorithm behaves differently depending on the priority queue implementation.

Algorithm complexity cannot always be discussed independently of representation.

## Space–Time Tradeoffs

A structure may use more memory to save time.

For example:

precomputed indexes.

Caching.

Hash tables.

Computer science repeatedly trades one resource for another.

## Redundant Information Can Be Useful

A database index duplicates some information.

Why?

Because redundancy can accelerate retrieval.

Minimal storage is not always optimal.

## Cache

A cache stores recently or frequently used information closer to where it is needed.

It exploits locality.

The structure of access patterns matters.

## Locality

Programs often access:

- nearby memory,
- recently used data.

Data structures that respect locality can outperform theoretically similar alternatives on real hardware.

Asymptotic complexity is not the whole story.

## Memory Hierarchy

Modern computers have:

- registers,
- caches,
- RAM,
- storage.

Access times differ dramatically.

A good data structure works with this hierarchy.

## Persistent Data Structures

A persistent data structure preserves earlier versions after modification.

This is useful in:

- functional programming,
- versioning,
- undo systems.

The structure represents history.

## Immutable Structures

Immutable data cannot be modified after creation.

Updates produce new structures.

This can simplify reasoning and concurrency.

Representation affects correctness properties.

## Concurrent Data Structures

When multiple threads access data simultaneously, structure becomes more difficult.

We must consider:

- locks,
- atomic operations,
- race conditions.

A data structure also defines coordination.

## Distributed Data Structures

At network scale, data may be spread across machines.

Now representation includes:

- partitioning,
- replication,
- consistency models.

Physical location becomes part of logical design.

## B-Trees

Databases often use B-trees or related structures.

Why not ordinary binary trees?

Because disks and storage devices favor block access.

The data structure is adapted to hardware realities.

## Data Structures Are Frozen Algorithms

A useful intuition is:

a data structure is an algorithmic decision made in advance.

By organizing data now, we make future operations cheaper.

Indexes are computation prepaid.

## Shape Creates Constraints

A tree forbids arbitrary cycles.

A set forbids duplicates.

A queue imposes order.

Structure is not just storage.

It constrains legal relationships.

## Structure Carries Meaning

Suppose the same names are stored:

- in a list,
- in an organizational tree,
- in a social graph.

The elements may be identical.

The relationships encode different meaning.

Meaning can live partly in structure.

## Database Schema

A database schema defines:

- tables,
- fields,
- relationships,
- constraints.

This is a large-scale data structure.

It decides how an organization sees its information.

## Schema Evolution

Real systems change.

A data structure that fit yesterday's assumptions may become inadequate.

Changing representation can be expensive.

Early abstractions create future path dependence.

## Data Structures and Ontology

When software creates categories such as:

- user,
- administrator,
- customer,
- order,

it is making ontological commitments.

The software's world is built from its data structures.

## Machine Learning Data Structures

Modern AI also depends on structures such as:

- tensors,
- graphs,
- vector databases.

The chosen structure determines which operations scale.

Representation remains central even when models learn features automatically.

## Data Structures in Nature?

Biological and physical systems also have structure.

DNA is sequential.

Proteins fold spatially.

Neural networks are graphs.

But calling these "data structures" is most useful when we specify a computational interpretation.

## The Philosophical Lesson

A data structure gives information shape.

That shape determines:

- access,
- relation,
- cost,
- meaning.

Information is not computationally neutral.

How we organize it changes what can be done with it.

## The Next Question

Once algorithms and data structures are combined into programs, another question becomes unavoidable:

How do we know the program is correct?

Testing can show failures.

It cannot, by itself, prove absence of all failures.

The next essay asks:

**How Can We Know a Program Is Correct?**
