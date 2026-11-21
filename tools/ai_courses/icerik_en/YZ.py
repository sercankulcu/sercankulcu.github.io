# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 2 slides: Artificial Intelligence — intelligent agents, search, '
             'logic, uncertainty, planning, history, prerequisites and neighboring courses.'),
    gundem=['Intelligent agents', 'Search', 'Knowledge and logic', 'Uncertainty', 'Planning', 'Neighboring courses'],
    tanim=('Artificial intelligence studies how to design <b>intelligent agents</b> that perceive their environment and choose '
           'the action that best serves their goal. The course brings search, logical inference, probabilistic reasoning, '
           'planning and learning into one framework. Machine learning is part of that framework, not all of it.'),
    not_=None,
    tarihce=[
        ('1950', 'Turing proposes the imitation game (the Turing test) in "Computing Machinery and Intelligence".'),
        ('1956', 'Dartmouth summer workshop: the name "artificial intelligence" is coined and the field is born.'),
        ('1980s', 'Expert systems (MYCIN, XCON) go commercial; unmet expectations bring an "AI winter".'),
        ('1997', 'Deep Blue beats Kasparov at chess: powerful search and a hand-written evaluation.'),
        ('2016', 'AlphaGo beats Lee Sedol at Go: tree search, deep networks and reinforcement learning together.'),
        ('2022', 'Large language models reach a mass audience through chat interfaces.'),
    ],
    kavramlar=[
        ('Intelligent agent', 'Perceives the environment through sensors, acts on it through actuators.'),
        ('Rationality', 'Choosing the action expected to maximize the performance measure.'),
        ('State-space search', 'BFS, DFS, A*; heuristic functions.'),
        ('Adversarial search', 'Minimax and alpha-beta pruning in games.'),
        ('Constraint satisfaction', 'Variables, domains, constraints: Sudoku, timetabling.'),
        ('Logic and knowledge', 'Propositional and first-order logic, inference rules.'),
        ('Uncertainty', 'Bayes\' rule, Bayesian networks, decision theory.'),
        ('Planning', 'Building a sequence of actions from start to goal.'),
    ],
    akis=[('Perceive', 'sensors'), ('Represent', 'state,\nknowledge base'), ('Search or\ninfer', 'search, logic,\nprobability'),
          ('Choose', 'performance\nmeasure'), ('Act', 'actuators')],
    akis_ornek=('<b>Example:</b> A navigation app senses its location, represents the road network as a graph, searches '
                'routes with A*, picks the fastest one and guides the driver by voice. Nothing in this loop is '
                '"learned"; the system is still AI.'),
    onkosul_ek=[
        ('Data Structures', 'stacks, queues, priority queues and graphs: the building blocks of search', '/teaching/data-structures/?lang=en'),
        ('Algorithms', 'graph search, shortest paths and complexity analysis', '/teaching/algorithms/?lang=en'),
        ('Discrete Mathematics', 'propositional logic, sets and proof techniques', None),
    ],
    ayrisma=[
        ('MO', 'AI can find how to reach a goal by search or inference; ML learns the same behavior by generalizing from data.'),
        ('US', 'Expert systems are one approach within AI (rules and logic); AI also covers search, probability and learning.'),
        ('OPT', 'Optimization solves a problem already stated mathematically; AI starts by modeling it as agent, environment and goal.'),
        ('CES', 'AI focuses on the decisions of a single agent; multi-agent systems study agents that affect one another.'),
    ],
    uygulamalar=[
        ('Games', 'Chess and Go engines, computer opponents in games.'),
        ('Route planning', 'Navigation, logistics, paths of warehouse robots.'),
        ('Scheduling', 'Class timetables, flight crews and shift plans.'),
        ('Virtual assistants', 'Systems that understand speech and turn it into tasks.'),
        ('Autonomous vehicles', 'Where perception, prediction and planning meet.'),
        ('Decision support', 'Diagnosis suggestions in medicine, fault diagnosis in engineering.'),
    ],
    araclar=['Python', 'Prolog', 'PDDL planners', 'Google OR-Tools', 'Gymnasium', 'pgmpy (Bayesian networks)'],
    veri_baslik='Classic example problems',
    veriler=['8-puzzle', 'n-queens', 'Sudoku', 'Wumpus world', 'Traveling salesman', 'Chess and Go'],
    araclar_not='An AI course usually gives a <b>problem definition</b> instead of a dataset: once states, actions and the goal are known, the solution is found by search.',
    yanilgilar=[
        ('AI and machine learning are the same thing.', 'ML is a subfield of AI. Search, planning and logic are AI even without learning.'),
        ('AI aims to think like humans.', 'The course mostly aims at <b>acting rationally</b>; imitating humans is only one approach.'),
        ('Chess engines learn by playing.', 'Classic engines like Deep Blue use search and a hand-written evaluation; learning is not required.'),
        ('Chatbots are all of AI.', 'Large language models come from NLP and generative models; AI is a much broader field.'),
    ],
    meslekler=['AI engineer', 'Researcher', 'Game AI developer', 'Robotics software engineer', 'Decision support specialist'],
    sonra=('AI is the roof of this guide: machine learning, natural language processing, fuzzy logic, evolutionary '
           'optimization, expert systems and multi-agent systems are its branches. To decide which branch interests you, '
           'a good start is to see this course\'s search, logic and uncertainty topics first.'),
    kaynaklar=[
        'Russell and Norvig, <em>Artificial Intelligence: A Modern Approach</em>, 4th ed., Pearson, 2020.',
        'Poole and Mackworth, <em>Artificial Intelligence: Foundations of Computational Agents</em>, 3rd ed., Cambridge University Press, 2023.',
        'Nilsson, <em>The Quest for Artificial Intelligence</em>, Cambridge University Press, 2010 (history of the field).',
        'Turing, "Computing Machinery and Intelligence", <em>Mind</em> 59(236), 1950.',
    ],
)
