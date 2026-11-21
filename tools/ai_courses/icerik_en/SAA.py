# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 30 slides: Social Network Analysis — graphs, centrality, community '
             'detection, small worlds, diffusion, history and neighboring courses.'),
    gundem=['Networks and graphs', 'Centrality', 'Community detection', 'Network models', 'Diffusion', 'Neighboring courses'],
    tanim=('Social network analysis studies the <b>graph</b> formed by treating people as nodes and relationships as edges. '
           'The question is not the traits of individuals but the structure of their ties: who is central, which groups '
           'exist, and how a rumor or a disease spreads through the network.'),
    tarihce=[
        ('1736', 'Euler solves the Königsberg bridges problem; graph theory is born.'),
        ('1934', 'Moreno draws relationships in diagrams he calls sociograms.'),
        ('1967', 'Milgram\'s letter experiment popularizes the idea of "six degrees".'),
        ('1973', 'Granovetter shows "the strength of weak ties": job leads come from distant acquaintances.'),
        ('1998', 'Watts and Strogatz publish the small-world network model.'),
        ('2008', 'The Louvain method makes fast community detection possible on networks with millions of nodes.'),
    ],
    kavramlar=[
        ('Nodes and edges', 'Directed or undirected, weighted or unweighted.'),
        ('Degree distribution', 'A few highly connected nodes, many with few links.'),
        ('Centrality', 'Degree, betweenness, closeness and eigenvector measures.'),
        ('Clustering coefficient', 'How many of my friends know each other.'),
        ('Small world', 'High clustering but short average paths.'),
        ('Community', 'Nodes densely linked inside, sparsely to the outside.'),
        ('Modularity', 'How good a partition into communities is.'),
        ('Diffusion models', 'Spread of information or disease on a network (SIR).'),
    ],
    akis=[('Build\nnetwork', 'who with whom,\nwhat tie'), ('Describe', 'degree,\npath length'), ('Centrality', 'important\nnodes'),
          ('Find\ncommunities', 'Louvain,\nmodularity'), ('Interpret', 'visualization,\ntesting')],
    akis_ornek=('<b>Example:</b> A researcher builds a network from a school\'s friendship survey, looks at the degree '
                'distribution, finds "bridge" students with high betweenness, extracts friend groups that cross classes '
                'with Louvain, and discusses the drawn result with the teachers.'),
    onkosul_ek=[
        ('Data Structures', 'adjacency lists and matrices: storing a graph in memory', '/teaching/data-structures/?lang=en'),
        ('Algorithms', 'BFS, DFS and shortest paths: the basis of centrality computations', '/teaching/algorithms/?lang=en'),
        ('Discrete Mathematics', 'graph theory, sets and counting', None),
    ],
    ayrisma=[
        ('VM', 'Data mining looks for patterns in tabular records; this course studies the structure of the links between records.'),
        ('BE', 'Information retrieval uses PageRank as a ranking signal; this course asks what centrality says about the network.'),
        ('DC', 'Linear algebra computes the eigenvalues of the adjacency matrix; this course reads them as communities and importance.'),
        ('CES', 'Multi-agent systems model how agents make decisions; this course analyzes the observed network of ties.'),
    ],
    uygulamalar=[
        ('Social media', 'Influencers and echo chambers.'),
        ('Epidemiology', 'Disease spread on contact networks.'),
        ('Fraud', 'Rings of linked fake accounts.'),
        ('Science networks', 'Citation and co-authorship analysis.'),
        ('Workplace networks', 'How knowledge flows in a company.'),
        ('Friend suggestions', 'Link prediction from mutual friends.'),
    ],
    araclar=['NetworkX', 'igraph', 'Gephi', 'graph-tool', 'Neo4j', 'PyTorch Geometric'],
    veriler=['Zachary\'s karate club', 'Les Misérables character network', 'Enron e-mails', 'SNAP network collection',
             'DBLP co-authorship network', 'Facebook ego networks (SNAP)'],
    yanilgilar=[
        ('The person with the most friends is the most influential.', 'Degree is one measure; a bridge joining two groups (betweenness) can matter more.'),
        ('Looking at a network drawing is enough to understand it.', 'Large networks draw as a "hairball"; numerical measures and tests are needed.'),
        ('Community detection has one right answer.', 'Different methods give different partitions; results are read with domain knowledge.'),
        ('Connected people have influenced each other.', 'Similar people choose each other anyway (homophily); influence is hard to separate from selection.'),
    ],
    meslekler=['Network scientist', 'Data scientist', 'Social media analyst', 'Fraud analyst', 'Computational social scientist'],
    sonra=('After this course you can move on to learning on networks with graph neural networks, link-based ranking with '
           'information retrieval, and diffusion models with epidemiology. Computational social science is an '
           'interdisciplinary field that applies these methods to questions about society.'),
    kaynaklar=[
        'Wasserman and Faust, <em>Social Network Analysis: Methods and Applications</em>, Cambridge University Press, 1994.',
        'Easley and Kleinberg, <em>Networks, Crowds, and Markets</em>, Cambridge University Press, 2010.',
        'Newman, <em>Networks</em>, 2nd ed., Oxford University Press, 2018.',
        'Barabási, <em>Network Science</em>, Cambridge University Press, 2016.',
    ],
)
