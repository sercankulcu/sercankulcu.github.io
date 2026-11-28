# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 35 slides: Machine Learning Systems and MLOps — model lifecycle, '
             'versioning, deployment, monitoring, history, neighbors, overlaps.'),
    gundem=['Lifecycle', 'Versioning', 'Deployment', 'Monitoring and drift', 'Automation', 'Neighboring courses'],
    tanim=('MLOps applies software engineering and DevOps practice to ML so that models reach production and run '
           'reliably there. The course covers versioning data, code and models together, automating the '
           '<b>pipeline</b>, deploying, and monitoring the model in production.'),
    tarihce=[
        ('2009', 'The first DevOpsDays is held in Ghent; DevOps, uniting development and operations, spreads.'),
        ('2014', 'Docker 1.0 is released and Kubernetes announced: containers become the common unit of deployment.'),
        ('2015', 'Sculley et al. expose hidden technical debt in ML systems: model code is a small part of the system.'),
        ('2017', 'Google presents TFX and Uber presents Michelangelo; in-house ML platforms come into view.'),
        ('2018', 'Databricks open-sources MLflow: experiment tracking and a model registry.'),
        ('2021', 'Andrew Ng calls for data-centric AI: focus on data quality more than on the model.'),
    ],
    kavramlar=[
        ('Pipeline', 'Automated steps from data preparation to deployment.'),
        ('Versioning', 'Tracking and rolling back data, code and model together.'),
        ('Experiment tracking', 'Logging the parameters, metrics and outputs of every run.'),
        ('Model registry', 'Approved model versions kept in one place.'),
        ('Feature store', 'The same features used in training and in production.'),
        ('CI/CD/CT', 'Continuous integration, delivery and continuous training.'),
        ('Model serving', 'Running as an online API or as a batch prediction job.'),
        ('Data drift', 'Production data moving away from training data; must be monitored.'),
    ],
    akis=[('Prepare\ndata', 'versioned\ndataset'), ('Train and\nregister', 'experiments,\nmodel registry'),
          ('Package', 'container,\nAPI'), ('Deploy', 'canary,\nA/B test'), ('Monitor', 'drift,\nretraining')],
    akis_ornek=('<b>Example:</b> A bank\'s credit model is retrained every month on new applications. The best registered '
                'version is packaged in a container, first exposed to a small share of traffic, and rolled out to everyone '
                'if nothing breaks. When the applicant distribution drifts, the monitoring dashboard alerts the team and the cycle restarts.'),
    onkosul_ek=[
        ('Operating Systems', 'processes, memory and resource management: the concepts containers rely on', '/teaching/operating-systems/?lang=en'),
        ('Object Oriented Programming with Java', 'the habit of writing modular, testable code', '/teaching/object-oriented-programming-with-java/?lang=en'),
        ('Software Engineering', 'version control (Git), testing and continuous integration', None),
    ],
    ayrisma=[
        ('MO', 'ML teaches how to build a good model; this course teaches how to keep it running reliably in production for months.'),
        ('BV', 'Big data systems store and process data at scale; this course manages the lifecycle of models trained on that data.'),
        ('VB', 'Data science runs an analysis that answers a question; this course builds a service that runs, is monitored and is renewed.'),
        ('GYZ', 'Embedded AI fits the model onto a small device; this course deploys, versions and monitors it on servers.'),
    ],
    uygulamalar=[
        ('Recommendation services', 'Models answering millions of requests a day.'),
        ('Fraud detection', 'Decisions in milliseconds, frequent retraining.'),
        ('Demand forecasting', 'Batch prediction jobs that run every night.'),
        ('Search ranking', 'Models tested continuously with A/B tests.'),
        ('Credit risk', 'Auditable, versioned and monitored models.'),
        ('LLM services', 'Serving large models at scale and at high cost.'),
    ],
    araclar=['MLflow', 'DVC', 'Docker', 'Kubernetes', 'Kubeflow', 'Apache Airflow', 'Prometheus'],
    veri_baslik='Classic example scenarios',
    veriler=['Credit model retrained monthly', 'Nightly demand forecast', 'Real-time fraud serving',
             'Recommender with A/B testing', 'Simulating data drift', 'Rolling back a bad release'],
    araclar_not='The course teaches a <b>process</b>, not an algorithm: a small model is turned into an end-to-end pipeline, from training to monitoring.',
    yanilgilar=[
        ('Once the model is trained, the job is done.', 'Data changes in production; an unmonitored model silently degrades over time.'),
        ('MLOps is just installing tools.', 'Tools support the process; the real work is versioning, testing, ownership and rollback.'),
        ('High test accuracy means good production performance.', 'Production data may differ from training data; latency and cost are part of success too.'),
        ('Most of an ML system is the model.', 'Model code is a small part next to data, configuration, serving and monitoring infrastructure.'),
    ],
    meslekler=['MLOps engineer', 'Machine learning engineer', 'Data engineer', 'Platform engineer',
               'Site reliability engineer (SRE)'],
    sonra=('MLOps is the backbone of the systems part of the guide: big data systems handle the training data, GPU '
           'programming the training speed, and embedded AI deployment at the edge. After this course, cloud platforms, '
           'distributed training or serving large language models are natural next steps.'),
    kaynaklar=[
        'Huyen, <em>Designing Machine Learning Systems</em>, O\'Reilly, 2022.',
        'Burkov, <em>Machine Learning Engineering</em>, True Positive Inc., 2020.',
        'Lakshmanan, Robinson and Munn, <em>Machine Learning Design Patterns</em>, O\'Reilly, 2020.',
        'Sculley et al., "Hidden Technical Debt in Machine Learning Systems", <em>NeurIPS</em>, 2015.',
    ],
    islenenler=[
        'ML systems in production: requirements, technical debt',
        'Data pipelines, data validation and versioning',
        'Feature engineering and feature stores',
        'Experiment tracking and reproducible training',
        'Model evaluation: slice analysis and model tests',
        'Packaging: containers and the model registry',
        'Model serving: online APIs and batch prediction',
        'Faster inference: latency, scale and cost',
        'Deployment strategies: canary, shadow, A/B tests',
        'Monitoring: data drift, concept drift, alerts',
        'Continuous training and CI/CD pipelines',
        'Responsible ML: auditing, documentation, model cards',
    ],
    beceriler=['versioning with Git and DVC', 'experiment tracking with MLflow', 'packaging models with Docker', 'serving a model as a REST API', 'building pipelines with Airflow', 'monitoring dashboards in Prometheus'],
    hazirlik=[
        ('Can you train a classifier and evaluate it with cross-validation?', '@MO'),
        ('Can you create and merge branches in Git and resolve a merge conflict?', 'A short Git tutorial and a software engineering course'),
        ('Can you manage processes, environment variables and permissions from the shell?', 'An operating systems course and an intro to the Linux shell'),
        ('Can you write a modular Python project that has unit tests?', 'Object-oriented programming, then a short pytest tutorial'),
    ],
    riskler=[
        ('Silent decay', 'Without drift monitoring a model degrades with no errors; many demand forecasts lost their accuracy overnight when COVID-19 hit.'),
        ('Training-serving skew', 'If a feature is computed differently in training and production, a model that tested well predicts wrongly live.'),
        ('Feedback loops', 'A model retrained on the outcomes of its own decisions, such as a recommender or credit model, amplifies its own bias.'),
        ('Untraceable versions', 'A model whose training data and code are unknown cannot be explained in a complaint or audit, nor rolled back.'),
    ],
)
