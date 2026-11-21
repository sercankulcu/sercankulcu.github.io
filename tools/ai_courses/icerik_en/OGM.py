# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 12 slides: Probabilistic Graphical Models — Bayesian networks, Markov '
             'networks, hidden Markov models, inference and learning, and neighboring courses.'),
    gundem=['Bayesian networks', 'Markov networks', 'Conditional independence', 'Inference', 'Parameter learning', 'Neighboring courses'],
    tanim=('Probabilistic graphical models represent the joint distribution of many uncertain variables with a '
           '<b>graph</b>: nodes are variables and edges are direct dependencies. The conditional independences encoded '
           'by the graph break a huge distribution into small pieces, making it possible both to model and to query it.'),
    tarihce=[
        ('1906', 'Markov studies chains in which the next state depends only on the current one.'),
        ('1966', 'Baum and Petrie publish the statistical basis of the hidden Markov model (HMM).'),
        ('1977', 'Dempster, Laird and Rubin publish the EM algorithm for learning with missing data.'),
        ('1988', 'Pearl\'s "Probabilistic Reasoning in Intelligent Systems" brings Bayesian networks into AI.'),
        ('1989', 'Rabiner\'s HMM tutorial becomes the standard reference in speech recognition.'),
        ('2001', 'Lafferty, McCallum and Pereira propose conditional random fields (CRFs) for sequence labeling.'),
    ],
    kavramlar=[
        ('Joint distribution', 'Probability of every combination of values of all variables.'),
        ('Conditional independence', 'Once one variable is known, the others no longer affect each other.'),
        ('Bayesian network', 'Directed acyclic graph; a conditional probability table at each node.'),
        ('Markov network', 'Undirected graph; relations given by potential functions.'),
        ('Hidden Markov model', 'An unobserved chain of states, each emitting an observation.'),
        ('Exact inference', 'Variable elimination, junction tree.'),
        ('Approximate inference', 'Sampling (MCMC), loopy belief propagation, variational.'),
        ('Learning', 'Parameters (EM) and structure: finding the graph itself from data.'),
    ],
    akis=[('Choose\nvariables', 'what is\nuncertain?'), ('Build\ngraph', 'dependencies'), ('Assign\nprobabilities', 'expert or\ndata (EM)'),
          ('Enter\nevidence', 'observations'), ('Query', 'conditional\nprobability')],
    akis_ornek=('<b>Example:</b> A diagnostic network has nodes for smoking, cancer and cough. A physician fills the tables '
                'from the literature. If a patient coughs and smokes, these two pieces of evidence are entered; the network '
                'recomputes the probability of cancer and shows which test would reduce uncertainty the most.'),
    onkosul_ek=[
        ('Algorithms', 'graph traversal, dynamic programming (Viterbi, forward-backward)', '/teaching/algorithms/?lang=en'),
        ('Data Structures', 'graph representation, trees and priority queues', '/teaching/data-structures/?lang=en'),
    ],
    ayrisma=[
        ('OI', 'Probability and statistics studies distributions of a few variables; this course teaches modeling hundreds of variables by factoring them with a graph.'),
        ('MO', 'ML usually predicts a single target; a PGM builds the joint distribution of all variables and lets you query any of them.'),
        ('UM', 'Generative models use large neural networks to produce samples; this course focuses on explicit, interpretable structure and exact inference.'),
        ('US', 'Expert systems write knowledge as crisp rules; a PGM writes the same knowledge with probabilities and combines evidence consistently.'),
    ],
    uygulamalar=[
        ('Medical diagnosis', 'Disease probability from symptoms and tests.'),
        ('Speech recognition', 'Word sequences from audio with HMMs.'),
        ('Sequence labeling', 'Part-of-speech and named entity tagging (CRF).'),
        ('Bioinformatics', 'Gene finding and sequence alignment.'),
        ('Fault diagnosis', 'Most likely fault from observed symptoms.'),
        ('Image segmentation', 'Label agreement of neighboring pixels (MRF).'),
    ],
    araclar=['pgmpy', 'PyMC', 'Stan', 'hmmlearn', 'Pyro', 'GeNIe and SMILE', 'bnlearn (R)'],
    veri_baslik='Classic networks and datasets',
    veriler=['Asia (chest clinic) network', 'ALARM network', 'Rain-sprinkler network', 'Insurance network', 'CoNLL-2003', 'TIMIT'],
    yanilgilar=[
        ('An edge means cause and effect.', 'In a Bayesian network an edge is only a probabilistic dependency; causality needs extra assumptions or experiments.'),
        ('Unconnected variables are independent.', 'Independence is conditional; two nodes can become dependent once a common child is observed.'),
        ('Inference is always easy to compute.', 'Exact inference on general graphs is NP-hard; large models need approximate methods.'),
        ('Deep learning made this field obsolete.', 'PGMs remain strong where data is scarce and explainability or uncertainty estimates matter; the two are also combined.'),
    ],
    meslekler=['Machine learning researcher', 'Data scientist', 'Biostatistician', 'Speech and language technology engineer'],
    sonra=('Probabilistic graphical models bring probability and structure together. Natural next steps are generative '
           'models with latent variables, natural language processing and bioinformatics with sequence models, or '
           'causal inference.'),
    kaynaklar=[
        'Koller and Friedman, <em>Probabilistic Graphical Models: Principles and Techniques</em>, MIT Press, 2009.',
        'Pearl, <em>Probabilistic Reasoning in Intelligent Systems</em>, Morgan Kaufmann, 1988.',
        'Murphy, <em>Machine Learning: A Probabilistic Perspective</em>, MIT Press, 2012.',
        'Darwiche, <em>Modeling and Reasoning with Bayesian Networks</em>, Cambridge University Press, 2009.',
        'Rabiner, "A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition", <em>Proceedings of the IEEE</em> 77(2), 1989.',
    ],
)
