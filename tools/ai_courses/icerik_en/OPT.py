# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 33 slides: Optimization — objectives and constraints, linear '
             'programming, convexity, gradient methods, why AI needs it, history and neighboring courses.'),
    gundem=['Objective, constraints', 'Linear programming', 'Convexity', 'Gradient methods', 'Where in AI', 'Neighboring courses'],
    tanim=('Optimization studies how to find the values that minimize or maximize an <b>objective function</b> while '
           'respecting constraints. Training an AI model means searching for the weights that minimize a loss function, '
           'so an optimization method runs inside every learning algorithm.'),
    tarihce=[
        ('1847', 'Cauchy proposes steepest descent (gradient descent) for solving systems of equations.'),
        ('1947', 'Dantzig develops the simplex method for linear programming.'),
        ('1951', 'Kuhn and Tucker publish optimality conditions for constrained problems (KKT).'),
        ('1957', 'Bellman\'s book Dynamic Programming is published.'),
        ('1984', 'Karmarkar introduces a polynomial-time interior point method for linear programming.'),
        ('2014', 'Kingma and Ba propose Adam, soon widely used to train deep networks.'),
    ],
    kavramlar=[
        ('Objective function', 'The cost or loss to be minimized.'),
        ('Constraints', 'Equalities and inequalities a solution must satisfy.'),
        ('Linear programming', 'Linear objective and constraints; the simplex method.'),
        ('Convexity', 'Every local optimum is also the global optimum.'),
        ('Gradient descent', 'Small steps against the slope.'),
        ('Stochastic gradient', 'Using a small part of the data at each step.'),
        ('Lagrange multipliers', 'Folding constraints into the objective; KKT conditions.'),
        ('Integer programming', 'Integer variables; often very hard.'),
    ],
    akis=[('Model', 'variables,\ngoal, limits'), ('Classify', 'linear?\nconvex?'), ('Pick method', 'simplex,\ngradient, ...'),
          ('Solve', 'watch\nconvergence'), ('Validate', 'sensitivity,\nconstraints')],
    akis_ornek=('<b>Example:</b> Training a neural network is an optimization problem: the variables are the weights '
                'and the objective is the average loss. The problem is not convex, so stochastic gradient descent on '
                'mini-batches or Adam is used, and the loss curve is watched on a validation set.'),
    onkosul_ek=[
        ('Calculus', 'derivatives, partial derivatives and Taylor series: the language of gradients and Hessians', None),
        ('Algorithms', 'dynamic programming, greedy methods and complexity', '/teaching/algorithms/?lang=en'),
    ],
    ayrisma=[
        ('EMO', 'Evolutionary methods search without derivatives; this course teaches methods that exploit problem structure (derivatives, convexity).'),
        ('YZ', 'AI starts by modeling a problem as an agent and an environment; optimization solves a mathematically stated problem.'),
        ('MO', 'ML lowers training loss but also wants success on new data; optimization only makes the given objective as good as possible.'),
        ('PO', 'Reinforcement learning maximizes reward by trial and error; here the objective function is written down explicitly from the start.'),
    ],
    uygulamalar=[
        ('Model training', 'Finding the weights that minimize the loss.'),
        ('SVM', 'The maximum-margin separator: a convex problem.'),
        ('Hyperparameter search', 'Choosing learning rate and regularization.'),
        ('Logistics', 'Routing, transport and warehouse location.'),
        ('Scheduling', 'Shifts, production and timetables.'),
        ('Portfolio selection', 'Balancing return against risk.'),
    ],
    araclar=['SciPy (scipy.optimize)', 'CVXPY', 'Google OR-Tools', 'PuLP', 'Gurobi', 'PyTorch (torch.optim)'],
    veri_baslik='Classic example problems',
    veriler=['Diet problem', 'Transportation problem', 'Knapsack problem', 'Traveling salesman', 'Markowitz portfolio',
             'Rosenbrock function'],
    yanilgilar=[
        ('Gradient descent always finds the best solution.', 'On non-convex problems it can get stuck in a local optimum or at a saddle point.'),
        ('The larger the learning rate, the faster.', 'Too large a step overshoots the minimum and the loss diverges; too small a step drags training out.'),
        ('Integer problems are solved by rounding.', 'Rounding the linear solution can break constraints or land far from the optimum.'),
        ('The lowest loss means the best model.', 'Driving training loss to zero can mean overfitting; in AI the goal is generalization.'),
    ],
    meslekler=['Operations researcher', 'Machine learning engineer', 'Logistics and planning analyst', 'Quantitative analyst'],
    sonra=('After this course, how training works in machine learning and neural networks becomes clear. From here you can '
           'move to evolutionary and metaheuristic optimization for problems without derivatives, reinforcement learning '
           'for sequential decisions, and operations research for allocating resources.'),
    kaynaklar=[
        'Boyd and Vandenberghe, <em>Convex Optimization</em>, Cambridge University Press, 2004.',
        'Nocedal and Wright, <em>Numerical Optimization</em>, 2nd ed., Springer, 2006.',
        'Bertsimas and Tsitsiklis, <em>Introduction to Linear Optimization</em>, Athena Scientific, 1997.',
        'Bottou, Curtis and Nocedal, "Optimization Methods for Large-Scale Machine Learning", <em>SIAM Review</em> 60(2), 2018.',
    ],
    islenenler=[
        'Formulating problems: variables, objective, constraints',
        'Linear programming and the simplex method',
        'Duality and sensitivity analysis',
        'Convex sets and convex functions',
        'Convex problems: QP, SOCP, SDP',
        'Optimality conditions: Lagrange and KKT',
        'Gradient descent and step size selection',
        'Newton and quasi-Newton methods (BFGS)',
        'Constrained optimization and interior point methods',
        'Stochastic gradient, momentum and Adam',
        'Integer programming and branch and bound',
        'Dynamic programming',
    ],
    beceriler=[
        'modelling convex problems in CVXPY',
        'writing linear models with PuLP',
        'using scipy.optimize',
        'proving convexity',
        'monitoring and tuning convergence',
    ],
    hazirlik=[
        ('Can you compute the gradient of a function of several variables?', 'Partial derivatives and the chain rule from calculus'),
        ('Can you write the Taylor expansion of a function up to the second term?', 'Taylor series from calculus'),
        ('Can you multiply a matrix by a vector and solve a linear system?', '@DC'),
        ('Can you update NumPy arrays step by step inside a loop in Python?', 'An intro programming course, then a short NumPy tutorial'),
    ],
    riskler=[
        ('The wrong objective', 'Optimizing what is measurable can defeat the real goal: a system that maximizes clicks alone promotes clickbait.'),
        ('A forgotten constraint', 'A constraint left out of the model is ignored: the cheapest route may use a banned road, the best rota may skip legal rest.'),
        ('Fragile optima', 'An optimum computed from estimated parameters can degrade badly under small errors; Markowitz portfolios are notoriously sensitive.'),
        ('Poor scaling', 'Variables on wildly different scales slow a solver down or can lead it to a false "infeasible" verdict.'),
    ],
)
