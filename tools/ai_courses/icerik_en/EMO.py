# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 10 slides: Evolutionary and Metaheuristic Optimization — genetic '
             'algorithms, annealing, swarm intelligence, multi-objective search and neighboring courses.'),
    gundem=['Population and fitness', 'Genetic algorithms', 'Local search', 'Swarm intelligence', 'Multi-objective search', 'Neighboring courses'],
    tanim=('Evolutionary and metaheuristic optimization searches for a good solution to problems without derivatives or '
           'with huge search spaces through a loop of <b>trying, selecting and varying</b>. Inspired by processes such as '
           'natural selection, annealing of metals or ant colonies, these methods do not guarantee the optimum but find a good solution quickly.'),
    tarihce=[
        ('1975', 'Holland publishes "Adaptation in Natural and Artificial Systems", laying the basis of genetic algorithms.'),
        ('1983', 'Kirkpatrick, Gelatt and Vecchi introduce simulated annealing.'),
        ('1992', 'Dorigo proposes ant colony optimization in his PhD thesis.'),
        ('1995', 'Kennedy and Eberhart publish particle swarm optimization (PSO).'),
        ('1997', 'Wolpert and Macready publish the "no free lunch" theorem: no method wins on all problems.'),
        ('2002', 'Deb and colleagues publish NSGA-II for multi-objective search.'),
    ],
    kavramlar=[
        ('Representation', 'How a solution is encoded: bit string, permutation, real vector.'),
        ('Fitness', 'The objective value that says how good a solution is.'),
        ('Selection', 'Giving good solutions more offspring: tournament, roulette.'),
        ('Crossover', 'Combining parts of two parents into a new solution.'),
        ('Mutation', 'Changing a solution by small random steps to add diversity.'),
        ('Exploration vs. exploitation', 'Balance between searching new regions and refining a good one.'),
        ('Local search', 'Hill climbing, simulated annealing, tabu search.'),
        ('Pareto front', 'Solutions in a multi-objective problem that do not dominate each other.'),
    ],
    akis=[('Initialize', 'random\npopulation'), ('Evaluate', 'compute\nfitness'), ('Select', 'good parents'),
          ('Crossover,\nmutate', 'new solutions'), ('Stop?', 'generation cap,\nconvergence')],
    akis_ornek=('<b>Example:</b> A courier company wants the shortest tour through 50 stops. 100 random tours are '
                'generated, each tour\'s length is measured, short tours are selected as parents, their orders are '
                'combined and a few stops are swapped. After hundreds of generations a tour close to the best known solution is found.'),
    onkosul_ek=[
        ('Algorithms', 'complexity, NP-hard problems and greedy methods', '/teaching/algorithms/?lang=en'),
        ('Programming', 'arrays, random number generation and loops', '/teaching/computer-and-introduction-to-programming/?lang=en'),
    ],
    ayrisma=[
        ('OPT', 'Optimization reaches a provable optimum using derivatives and convexity; this course teaches derivative-free search with no guarantee but wide applicability.'),
        ('YZ', 'Searches such as A* in AI find a path to a goal in a state space; this course searches directly for a good complete solution.'),
        ('PO', 'RL learns a policy from states to actions by interacting with an environment; this course seeks a good solution for a single objective function.'),
        ('YSA', 'Neural networks train weights with gradients; this course searches without gradients, for example evolving network structure or hyperparameters.'),
    ],
    uygulamalar=[
        ('Vehicle routing', 'Shortening courier and delivery tours.'),
        ('Scheduling', 'Timetables, production and shift plans.'),
        ('Engineering design', 'Designing antenna, wing and structural shapes.'),
        ('Hyperparameter search', 'Finding settings for learning models.'),
        ('Layout', 'Circuit component and facility placement.'),
        ('Portfolio selection', 'Multi-objective trade-off between return and risk.'),
    ],
    araclar=['DEAP', 'pymoo', 'jMetal', 'PyGAD', 'ECJ', 'MATLAB Global Optimization Toolbox', 'Optuna'],
    veri_baslik='Classic benchmark problems',
    veriler=['TSPLIB (traveling salesman)', 'Knapsack problem', 'OneMax', 'Rastrigin and Ackley functions', 'ZDT and DTLZ multi-objective tests', 'CEC benchmark functions'],
    araclar_not='This course uses <b>benchmark problems</b> instead of datasets: methods are compared on the same problems with the same evaluation budget.',
    yanilgilar=[
        ('A genetic algorithm finds the optimal solution.', 'Metaheuristics do not guarantee the optimum; they aim for a good solution in reasonable time.'),
        ('Nature-inspired methods are more powerful.', 'The inspiration does not determine performance; many newly named methods are minor variants of older ones.'),
        ('One method is best for every problem.', 'By the "no free lunch" theorem, no method is better on average over all problems.'),
        ('Use evolutionary methods even when derivatives exist.', 'When derivatives are available, gradient methods usually reach the result with far fewer evaluations.'),
    ],
    meslekler=['Operations researcher', 'Logistics and planning engineer', 'Design optimization engineer', 'Machine learning engineer'],
    sonra=('This course goes beyond where classical optimization reaches. Next you can take Optimization for provable '
           'methods, Artificial Neural Networks to evolve network structures, or Multi-Agent Systems for an agent view '
           'of swarm behavior.'),
    kaynaklar=[
        'Goldberg, <em>Genetic Algorithms in Search, Optimization, and Machine Learning</em>, Addison-Wesley, 1989.',
        'Eiben and Smith, <em>Introduction to Evolutionary Computing</em>, 2nd ed., Springer, 2015.',
        'Talbi, <em>Metaheuristics: From Design to Implementation</em>, Wiley, 2009.',
        'Luke, <em>Essentials of Metaheuristics</em>, 2nd ed., Lulu, 2013.',
    ],
    islenenler=[
        'Optimization problems, search spaces, representations',
        'Local search: hill climbing, tabu search',
        'Simulated annealing and cooling schedules',
        'Genetic algorithms: selection, crossover, mutation',
        'Evolution strategies and CMA-ES',
        'Differential evolution',
        'Genetic programming',
        'Ant colony optimization',
        'Particle swarm optimization',
        'Constraint handling: penalties and repair',
        'Multi-objective search: Pareto, NSGA-II',
        'Experimental design and statistical comparison',
    ],
    beceriler=['building evolutionary algorithms with DEAP', 'multi-objective search with pymoo', 'hyperparameter search with Optuna',
               'choosing a representation for a problem', 'fair comparisons over many runs'],
    hazirlik=[
        ('Can you state the time complexity of an algorithm in big-O notation?', 'Complexity and NP-hardness from an algorithms course'),
        ('Can you find the minimum of a function by taking its derivative?', '@OPT'),
        ('Can you explain mean, standard deviation and a hypothesis test?', '@OI'),
        ('Can you write a small Python program with arrays, loops and random numbers?', 'An intro programming course, then a short NumPy tutorial'),
    ],
    riskler=[
        ('Loopholes in the fitness function', 'Search finds and exploits flaws in the objective: the score rises but the intended behaviour never appears; evolution runs often show this.'),
        ('Unfair comparisons', 'A single run, unequal evaluation budgets or tuning only your own method make a new algorithm look better than it is.'),
        ('Designs proven only in simulation', 'An antenna or structure that looks great in simulation can fail in reality because of effects the model leaves out.'),
        ('Compute and energy cost', 'Running expensive simulations over thousands of generations can burn days of processor time and a lot of energy.'),
    ],
)
