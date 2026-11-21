# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 25 slides: Data Mining — the knowledge discovery process, '
             'association rules, clustering, outliers, history, neighboring courses and overlaps.'),
    gundem=['Knowledge discovery', 'Association rules', 'Clustering', 'Outliers', 'Interestingness measures', 'Neighboring courses'],
    tanim=('Data mining studies how to <b>discover patterns</b> in large data collections that are previously unknown, '
           'valid and useful. It uses the same algorithms as machine learning, but the goal is not prediction on new '
           'examples; it is finding rules, clusters and anomalies in the data itself.'),
    tarihce=[
        ('1967', 'MacQueen publishes the clustering method he names "k-means".'),
        ('1989', 'The first workshop on knowledge discovery in databases (KDD) is held; the field gets its name.'),
        ('1994', 'Agrawal and Srikant popularize association rule mining with the Apriori algorithm.'),
        ('1996', 'Fayyad and colleagues define the KDD process; density-based DBSCAN is published the same year.'),
        ('2000', 'CRISP-DM 1.0 is released: an industry-neutral process model for data mining projects.'),
        ('2006', 'The Netflix Prize opens: one million dollars for improving recommendation accuracy by 10 percent.'),
    ],
    kavramlar=[
        ('Knowledge discovery (KDD)', 'Selection, preprocessing, transformation, mining, interpretation.'),
        ('Frequent itemsets', 'Products often bought together: Apriori, FP-growth.'),
        ('Association rule', 'If X then Y; measured by support, confidence and lift.'),
        ('Clustering', 'k-means, hierarchical, DBSCAN; unlabeled groups.'),
        ('Outlier', 'A record unlike the rest: an error or fraud?'),
        ('Descriptive model', 'Readable, explanatory models such as decision trees.'),
        ('Preprocessing', 'Missing values, noise, discretization, normalization.'),
        ('Sequential pattern', 'Event sequences that recur in time order.'),
    ],
    akis=[('Select', 'relevant data,\ntarget group'), ('Preprocess', 'cleaning,\nmissing data'), ('Transform', 'discretizing,\nreduction'),
          ('Mine', 'rules, clusters,\nanomalies'), ('Interpret', 'interest,\nexpert review')],
    akis_ornek=('<b>Example:</b> A supermarket selects a year of receipts, removes returns and bad records, turns each '
                'receipt into an itemset, finds rules such as "customers who buy pasta also buy sauce" with Apriori, '
                'and presents the high-lift rules to the manager for shelf layout.'),
    onkosul_ek=[
        ('Databases and SQL', 'tables, joins and grouping: where the data comes from', None),
        ('Data Structures', 'hash tables and trees: building blocks of algorithms such as FP-growth', '/teaching/data-structures/?lang=en'),
        ('Algorithms', 'complexity: understanding the exponential growth of candidate sets', '/teaching/algorithms/?lang=en'),
    ],
    ayrisma=[
        ('MO', 'They share algorithms; ML aims at prediction on new examples, data mining at discovery in the data at hand.'),
        ('VB', 'Data science covers the whole path from question to decision; data mining focuses on the pattern-finding step.'),
        ('BV', 'Big data systems store and process data in a distributed way; data mining asks which patterns to look for in it.'),
        ('OI', 'Statistics tests a hypothesis set in advance; data mining generates hypotheses from data, which must then be tested.'),
    ],
    uygulamalar=[
        ('Market basket', 'Items bought together, shelves and promotions.'),
        ('Customer segmentation', 'Grouping similar customers.'),
        ('Fraud detection', 'Flagging unusual transactions.'),
        ('Web usage', 'Visitors\' navigation patterns.'),
        ('Failure logs', 'Error codes that occur together.'),
        ('Medical records', 'Diagnoses and drugs that occur together.'),
    ],
    araclar=['Weka', 'KNIME', 'Orange', 'RapidMiner', 'scikit-learn', 'mlxtend', 'R (arules)'],
    veriler=['Groceries (arules)', 'Online Retail (UCI)', 'Instacart Market Basket', 'Adult (income)', 'KDD Cup 1999', 'Mushroom'],
    yanilgilar=[
        ('Data mining is collecting data.', 'The name misleads: what is mined is knowledge, not data; the data already exists.'),
        ('Every rule found is useful.', 'Thousands of rules come out; most are obvious or accidental. Interestingness measures and expert review are needed.'),
        ('A strong association means causation.', 'Occurring together does not mean one causes the other; there may be a common cause.'),
        ('Clustering has one right answer.', 'The result depends on the number of clusters, distance and scaling; different choices, different clusters.'),
    ],
    meslekler=['Data mining specialist', 'Data analyst', 'Business intelligence specialist', 'Customer analytics specialist', 'Fraud analyst'],
    sonra=('Data mining is the discovery side of the data courses. From here you can move to recommender systems through '
           'rules, to social network analysis through community detection, to big data systems through scalable '
           'mining, or to machine learning to focus on prediction.'),
    kaynaklar=[
        'Han, Kamber and Pei, <em>Data Mining: Concepts and Techniques</em>, 3rd ed., Morgan Kaufmann, 2011.',
        'Tan, Steinbach, Karpatne and Kumar, <em>Introduction to Data Mining</em>, 2nd ed., Pearson, 2019.',
        'Witten, Frank, Hall and Pal, <em>Data Mining: Practical Machine Learning Tools and Techniques</em>, 4th ed., Morgan Kaufmann, 2017.',
        'Leskovec, Rajaraman and Ullman, <em>Mining of Massive Datasets</em>, 3rd ed., Cambridge University Press, 2020.',
    ],
    islenenler=[
        'The data mining process: KDD and CRISP-DM',
        'Getting to know data: attribute types, similarity',
        'Preprocessing: cleaning, integration, reduction',
        'Data warehouses and OLAP cubes',
        'Frequent itemsets: Apriori and FP-growth',
        'Association rules and interestingness measures',
        'Classification: decision trees, rule-based methods',
        'Evaluating classifiers and imbalanced classes',
        'Clustering: k-means and hierarchical methods',
        'Density-based clustering and cluster validity',
        'Outlier detection',
        'Sequential pattern, text and graph mining',
    ],
    beceriler=['data preparation with pandas and SQL', 'mining association rules with mlxtend', 'quick experiments in Weka or Orange',
               'measuring and interpreting clusters', 'translating findings for the business'],
    hazirlik=[
        ('Can you join and group two tables in one SQL query?', 'SQL from a database course: JOIN and GROUP BY'),
        ('Can you explain conditional probability and independence with an example?', '@OI'),
        ('Can you explain when a hash table beats a tree?', 'A data structures course: hash tables and trees'),
        ('Can you read a CSV file in Python and count its missing values?', 'An intro programming course, then a short pandas tutorial'),
    ],
    riskler=[
        ('Inferring sensitive facts', 'Pregnancy, illness or money trouble can be inferred from a shopping basket, even if the person never shared it.'),
        ('Anonymous data is not anonymous', 'Netflix Prize data was linked to IMDb ratings to identify some users; the planned second contest was cancelled over it.'),
        ('Data dredging', 'Search for enough patterns and chance ones look significant; multiple comparison corrections and testing on fresh data are needed.'),
        ('Discriminatory profiling', 'Customer segments built from postcodes or shopping patterns can indirectly give some groups different prices and service.'),
    ],
)
