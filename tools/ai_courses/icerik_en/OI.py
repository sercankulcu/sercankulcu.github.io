# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 32 slides: Probability and Statistics — probability, distributions, '
             'Bayes\' rule, estimation, hypothesis testing, why AI needs it, history and neighboring courses.'),
    gundem=['Probability and Bayes', 'Distributions', 'Estimation', 'Hypothesis testing', 'Where in AI', 'Neighboring courses'],
    tanim=('Probability is the language for measuring uncertainty; statistics uses it to draw general conclusions from '
           '<b>limited data</b>. Every model in AI and data courses works under uncertainty, and only this course can '
           'say how far a prediction can be trusted.'),
    tarihce=[
        ('1654', 'Pascal and Fermat exchange letters on dividing the stakes of an unfinished game of chance.'),
        ('1763', 'Bayes\'s essay is published after his death: probability updated by evidence.'),
        ('1908', 'Gosset, writing as "Student", publishes the t distribution for small samples.'),
        ('1925', 'Fisher\'s Statistical Methods for Research Workers popularizes significance testing.'),
        ('1933', 'Kolmogorov builds probability on axioms; probability theory rests on measure theory.'),
        ('1979', 'Efron proposes the bootstrap: measuring uncertainty by resampling.'),
    ],
    kavramlar=[
        ('Conditional probability', 'How a probability changes given information.'),
        ('Bayes\' rule', 'Turning a prior belief into a posterior with evidence.'),
        ('Random variable', 'Expected value, variance and distribution.'),
        ('Normal distribution', 'Central limit theorem: averages tend to normal.'),
        ('Maximum likelihood', 'Choosing the parameter that makes the data most likely.'),
        ('Confidence interval', 'Reporting an estimate\'s uncertainty as a range.'),
        ('Hypothesis testing', 'Is the observed difference chance or real?'),
        ('Regression', 'Explaining one variable by others, and testing it.'),
    ],
    akis=[('Ask', 'what do we\nwant to know?'), ('Sample', 'random\nsample'), ('Model', 'distribution\nassumption'),
          ('Estimate', 'parameter,\ninterval'), ('Decide', 'test, risk')],
    akis_ornek=('<b>Example:</b> An AI team asks whether a new recommendation model raises clicks. Half of the users '
                'see the new model at random (an A/B test), click rates are estimated, a confidence interval for the '
                'difference is computed, and if chance cannot explain the difference the model ships.'),
    onkosul_ek=[
        ('Calculus', 'integrals and derivatives: continuous distributions and maximum likelihood', None),
        ('Discrete Mathematics', 'sets and counting (permutations, combinations)', None),
    ],
    ayrisma=[
        ('MO', 'ML puts predictive performance first; statistics asks about a model\'s meaning, assumptions and uncertainty.'),
        ('VB', 'Data science covers the whole process (data, analysis, communication); this course gives the theory of inference behind it.'),
        ('OGM', 'Probabilistic graphical models structure multivariate distributions with graphs; this course starts with one or a few variables.'),
        ('BK', 'Information theory measures uncertainty with entropy; this course is built on estimation and decisions with probability.'),
    ],
    uygulamalar=[
        ('A/B testing', 'Whether a new model is really better.'),
        ('Naive Bayes', 'Text and spam classification.'),
        ('Uncertainty', 'Confidence intervals and calibration of predictions.'),
        ('Model comparison', 'Is the gap between two models significant?'),
        ('Generative models', 'Learning a data distribution and sampling it.'),
        ('Medical tests', 'Sensitivity, specificity and base rate.'),
    ],
    araclar=['R', 'SciPy (scipy.stats)', 'statsmodels', 'pandas', 'PyMC', 'Stan'],
    veri_baslik='Classic example problems',
    veriler=['Monty Hall', 'Birthday paradox', 'Medical test and base rate', 'Galton\'s height data', 'A/B test',
             'Gambler\'s fallacy'],
    yanilgilar=[
        ('If p = 0.03, the hypothesis is 97% likely to be true.', 'The p-value is the probability of data this extreme if the null hypothesis holds; it is not the probability of the hypothesis.'),
        ('Correlation implies causation.', 'A common cause or chance also produces correlation; causation needs an experiment.'),
        ('If a test is 99% accurate, a positive means 99% disease.', 'If the disease is rare, most positives may be false alarms; Bayes\' rule brings in the base rate.'),
        ('With enough data, statistics is unnecessary.', 'In big data even trivial differences come out "significant"; effect size and bias still matter.'),
    ],
    meslekler=['Statistician', 'Data scientist', 'Machine learning researcher', 'Biostatistician', 'Actuary'],
    sonra=('After this course, machine learning, probabilistic graphical models, pattern recognition and information '
           'theory become easier to approach. Bayesian statistics and causal inference are two natural next steps that '
           'treat uncertainty and cause and effect in more depth.'),
    kaynaklar=[
        'Wasserman, <em>All of Statistics</em>, Springer, 2004.',
        'DeGroot and Schervish, <em>Probability and Statistics</em>, 4th ed., Pearson, 2012.',
        'Blitzstein and Hwang, <em>Introduction to Probability</em>, 2nd ed., CRC Press, 2019.',
        'Gelman, Carlin, Stern, Dunson, Vehtari and Rubin, <em>Bayesian Data Analysis</em>, 3rd ed., CRC Press, 2013.',
    ],
    islenenler=[
        'Counting, probability axioms, conditional probability',
        "Bayes' rule and independence",
        'Discrete distributions: Bernoulli, binomial, Poisson',
        'Continuous distributions: uniform, exponential, normal',
        'Expectation, variance and covariance',
        'Joint and conditional distributions',
        'Law of large numbers and central limit theorem',
        'Point estimation: method of moments, maximum likelihood',
        'Confidence intervals and the bootstrap',
        'Hypothesis testing: t-test, chi-square, p-values',
        'Linear regression and inference',
        'Bayesian inference: priors and posteriors',
    ],
    beceriler=[
        'running tests with scipy.stats',
        'regression in R or statsmodels',
        'computing confidence intervals',
        'checking probabilities by simulation',
        'designing an A/B test',
    ],
    hazirlik=[
        ('Can you integrate a function to find the area under a curve?', 'Definite integrals from calculus'),
        ('Can you find the maximum of a function by taking its derivative?', 'Derivatives and extreme values from calculus'),
        ('Can you count selections with permutations and combinations?', 'Counting from discrete mathematics'),
        ('Can you compute the mean of a list in Python and plot its histogram?', 'An intro programming course, then a short NumPy tutorial'),
    ],
    riskler=[
        ('p-hacking', 'Trying many analysis choices and reporting only the "significant" one makes chance look like a finding.'),
        ('Multiple testing', 'At the 0.05 level, a hundred comparisons yield about five false positives; without a correction, spurious findings appear.'),
        ("Simpson's paradox", 'A trend can reverse when groups are combined; the 1973 Berkeley graduate admissions data is the well-known example.'),
        ('Selection bias', 'A non-random sample misleads however large it is, as the 1936 Literary Digest poll showed.'),
    ],
)
