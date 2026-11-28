# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 26 slides: Data Science — asking questions, data wrangling, '
             'exploratory analysis, visualization, inference, history, neighboring courses and overlaps.'),
    gundem=['Question and data', 'Data wrangling', 'Exploratory analysis', 'Visualization', 'Inference and story', 'Neighboring courses'],
    tanim=('Data science is the process that starts with a question and covers finding, cleaning and analyzing data, '
           'then communicating the result so that it <b>leads to a decision</b>. It combines statistics, programming '
           'and domain knowledge; data mining and machine learning are its tools.'),
    tarihce=[
        ('1962', 'In "The Future of Data Analysis", Tukey argues for data analysis as a science separate from statistics.'),
        ('1977', 'Tukey publishes "Exploratory Data Analysis": look first, then model.'),
        ('2001', 'Cleveland proposes "data science" as an academic field that extends statistics.'),
        ('2010', 'Kaggle is founded; data science competitions and open datasets spread.'),
        ('2012', 'Harvard Business Review calls data scientist "the sexiest job of the 21st century".'),
        ('2014', 'Project Jupyter splits from IPython; code, plots and text meet in one notebook.'),
    ],
    kavramlar=[
        ('Defining the question', 'What do we want to know, and what decision will follow?'),
        ('Tidy data', 'Each row an observation, each column a variable.'),
        ('Data cleaning', 'Fixing missing, wrong and inconsistent records.'),
        ('Exploratory analysis', 'Getting to know data with summaries and plots.'),
        ('Visualization', 'Showing the pattern and result with the right chart.'),
        ('Hypothesis testing', 'Checking whether a difference is due to chance.'),
        ('A/B testing', 'Comparing two options with a randomized experiment.'),
        ('Reproducibility', 'Getting the same result again with code, data and versions.'),
    ],
    akis=[('Ask', 'decision and\nmetric'), ('Get data', 'SQL, files,\nAPI'), ('Clean', 'missing, wrong,\ninconsistent'),
          ('Explore and\nmodel', 'plots, tests,\nregression'), ('Communicate', 'report,\ndashboard')],
    akis_ornek=('<b>Example:</b> A city council asks, "Should we add more bus trips?" Card tap records are collected, '
                'bad timestamps removed, occupancy by line and hour explored with plots, demand estimated with '
                'regression, and the result presented to the decision maker in a one-page report.'),
    onkosul_ek=[
        ('Programming', 'reading files, loops and functions in Python or R', '/teaching/computer-and-introduction-to-programming/?lang=en'),
        ('Databases and SQL', 'querying, joining and grouping data', None),
    ],
    ayrisma=[
        ('VM', 'Data mining focuses on finding patterns in large data; data science covers the whole path from question to decision.'),
        ('MO', 'ML builds models that predict well on new examples; data science uses a model as one tool for answering a question.'),
        ('OI', 'Statistics provides the theory of inference; data science combines it with programming, messy real data and storytelling.'),
        ('BV', 'Big data systems store and process the data; data science draws meaning and decisions from it.'),
    ],
    uygulamalar=[
        ('A/B testing', 'Is the new design really better?'),
        ('Marketing analytics', 'Which campaign brings customers?'),
        ('Public health', 'Tracking outbreaks and disease trends.'),
        ('Sports analytics', 'Measuring player and team performance.'),
        ('Public policy', 'Evaluating services with open data.'),
        ('Product metrics', 'What keeps users, and what drives them away?'),
    ],
    araclar=['Python', 'pandas', 'Jupyter', 'R and tidyverse', 'Matplotlib and seaborn', 'SQL', 'statsmodels'],
    veriler=['Titanic (Kaggle)', 'Gapminder', 'NYC taxi trips', 'Palmer Penguins', 'House Prices (Kaggle)', 'Anscombe\'s quartet'],
    yanilgilar=[
        ('Data science is training models.', 'Most of the time goes into sharpening the question, finding and cleaning data, and communicating results.'),
        ('Data speaks for itself.', 'Without a question, context and domain knowledge, the same data can lead to wrong conclusions.'),
        ('A significant p-value is an important result.', 'Statistical significance says nothing about effect size; many tests produce misleading results.'),
        ('A chart is decoration for the result.', 'Anscombe\'s quartet shows it: data with identical summaries look completely different when plotted.'),
    ],
    meslekler=['Data scientist', 'Data analyst', 'Product analyst', 'Business intelligence specialist', 'Research analyst'],
    sonra=('Data science is the umbrella of the data courses. From here you can move to machine learning to deepen '
           'predictive modeling, to data mining for discovery, to big data systems for scale, or to explainable AI '
           'and ethics for questions of fairness and bias.'),
    kaynaklar=[
        'Wickham, Çetinkaya-Rundel and Grolemund, <em>R for Data Science</em>, 2nd ed., O\'Reilly, 2023.',
        'McKinney, <em>Python for Data Analysis</em>, 3rd ed., O\'Reilly, 2022.',
        'James, Witten, Hastie and Tibshirani, <em>An Introduction to Statistical Learning</em>, 2nd ed., Springer, 2021.',
        'Tukey, <em>Exploratory Data Analysis</em>, Addison-Wesley, 1977.',
    ],
    islenenler=[
        'The data science process and asking good questions',
        'Reading data in Python or R; tidy data',
        'Data cleaning: missing values and outliers',
        'Exploratory data analysis',
        'Principles of visualization',
        'Sampling and descriptive statistics',
        'Confidence intervals and hypothesis tests',
        'A/B testing and experimental design',
        'Regression and predictive models',
        'Correlation, causation, confounders',
        'Getting data from a database: SQL',
        'Reproducible reports and telling the story',
    ],
    beceriler=['pandas or the tidyverse', 'SQL', 'Matplotlib and seaborn', 'interpreting hypothesis and A/B tests',
               'reproducible reports in Jupyter'],
    hazirlik=[
        ('Can you explain the mean, median, standard deviation and the normal distribution?', '@OI'),
        ('Can you read a table in Python or R and group it by a column?', 'An intro programming course, then a short pandas or dplyr tutorial'),
        ('Can you write a simple SQL query with SELECT, WHERE and GROUP BY?', 'The SQL part of a database course, or online SQL exercises'),
        ('Can you tell when a chart is misleading?', 'Not required; the course teaches it. If curious, see Tufte\'s book'),
    ],
    riskler=[
        ('Confusing correlation with causation', 'Reading causes into correlations leads to wrong decisions: ice cream sales and drownings rise together because both happen in summer.'),
        ('p-hacking', 'Run enough tests and something will come out "significant"; the hypothesis must be fixed before looking at the data.'),
        ('Re-identification', 'In data with names removed, ZIP code, birth date and sex are enough to re-identify most people.'),
        ('Misleading charts', 'A truncated axis or a cherry-picked time window can tell the opposite story with the same data.'),
    ],
)
