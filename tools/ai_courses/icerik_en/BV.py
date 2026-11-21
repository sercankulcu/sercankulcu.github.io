# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 27 slides: Big Data Systems — distributed storage, MapReduce, '
             'Spark, stream processing, NoSQL, history, neighboring courses and overlaps.'),
    gundem=['The three Vs', 'Distributed storage', 'MapReduce and Spark', 'Stream processing', 'NoSQL and CAP', 'Neighboring courses'],
    tanim=('Big data systems study how to store and process data that <b>does not fit on one machine</b>, or arrives '
           'faster than one machine can keep up, by spreading it over many machines. The course deals with the '
           'trade-offs between partitioning, replication, fault tolerance and consistency.'),
    tarihce=[
        ('2001', 'Laney describes the data management challenge as volume, velocity and variety (the 3 Vs).'),
        ('2003', 'The Google File System paper: a fault-tolerant distributed file system built from cheap machines.'),
        ('2004', 'Dean and Ghemawat publish MapReduce: a simple programming model across thousands of machines.'),
        ('2006', 'Hadoop, an open-source counterpart of GFS and MapReduce, becomes its own Apache project.'),
        ('2010', 'Spark is released as open source: keeping intermediate results in memory speeds up iterative jobs.'),
        ('2011', 'LinkedIn open-sources Kafka: a distributed log system for event streams.'),
    ],
    kavramlar=[
        ('Volume, velocity, variety', 'The size of data, how fast it arrives, how many formats.'),
        ('Distributed file system', 'Splitting files into blocks and replicating them across machines.'),
        ('MapReduce', 'Map, shuffle, reduce: moving computation to the data.'),
        ('In-memory processing', 'Spark: chaining steps without writing to disk.'),
        ('Stream processing', 'Processing an unbounded event stream as it arrives.'),
        ('NoSQL', 'Key-value, document, wide-column and graph stores.'),
        ('CAP theorem', 'Under a network partition, choosing consistency or availability.'),
        ('Partitioning, replication', 'Spreading load and not losing data when a machine fails.'),
    ],
    akis=[('Collect', 'Kafka,\nevent streams'), ('Store', 'HDFS, object\nstorage'), ('Process', 'Spark, Flink'),
          ('Query', 'distributed SQL'), ('Serve', 'dashboard,\nmodel, report')],
    akis_ornek=('<b>Example:</b> A video site collects billions of view events a day with Kafka, partitions them by date '
                'in object storage, computes nightly per-user viewing summaries with Spark and writes the results to '
                'tables that analysts can query with SQL.'),
    onkosul_ek=[
        ('Operating Systems', 'processes, threads, file systems and the cost of I/O', '/teaching/operating-systems/?lang=en'),
        ('Object Oriented Programming with Java', 'Hadoop, Spark and Kafka run on the JVM', '/teaching/object-oriented-programming-with-java/?lang=en'),
        ('Databases and SQL', 'the relational model, indexes, transactions', None),
    ],
    ayrisma=[
        ('VM', 'Data mining asks which patterns to look for; big data systems ask how that search runs on many machines.'),
        ('VB', 'Data science draws questions and conclusions from data; big data systems make that possible when data outgrows one machine.'),
        ('GPU', 'A GPU speeds up computation with thousands of cores in one machine; big data systems spread data over machines, where network and disk are the bottleneck.'),
        ('MLOPS', 'MLOps manages the model life cycle; big data systems build the data pipelines and storage that feed it.'),
    ],
    uygulamalar=[
        ('Log analysis', 'Errors and traffic from server logs.'),
        ('Clickstream', 'Tracking user behavior in real time.'),
        ('Recommendation backends', 'The histories of millions of users.'),
        ('Internet of Things', 'Continuous measurements from sensors.'),
        ('Financial transactions', 'Real-time fraud alerts.'),
        ('Search index', 'Crawling and indexing web pages.'),
    ],
    araclar=['Apache Hadoop', 'Apache Spark', 'Apache Kafka', 'Apache Flink', 'Apache Cassandra', 'MongoDB', 'Apache Hive'],
    veriler=['Common Crawl', 'Wikipedia dumps', 'NYC TLC taxi records', 'GDELT', 'Google Books Ngram'],
    yanilgilar=[
        ('Big data just means a lot of data.', 'Velocity and variety matter as much as size; the real question is whether the data fits on one machine.'),
        ('A distributed system is always faster.', 'On small data a single machine (pandas, SQL) is often faster; distribution has overhead.'),
        ('Doubling the machines halves the time.', 'Shuffles, network traffic and the slowest task limit the speedup.'),
        ('NoSQL has replaced SQL.', 'NoSQL offers different consistency trade-offs; SQL engines such as Spark SQL and Hive are widespread.'),
    ],
    meslekler=['Data engineer', 'Big data architect', 'Data platform engineer', 'Cloud engineer'],
    sonra=('Big data systems are the infrastructure of the data courses. From here you can move to MLOps, which takes '
           'models to production, to GPU and parallel computing, which speeds up computation, or to the data mining '
           'and data science that run on top of this infrastructure.'),
    kaynaklar=[
        'Kleppmann, <em>Designing Data-Intensive Applications</em>, O\'Reilly, 2017.',
        'White, <em>Hadoop: The Definitive Guide</em>, 4th ed., O\'Reilly, 2015.',
        'Chambers and Zaharia, <em>Spark: The Definitive Guide</em>, O\'Reilly, 2018.',
        'Dean and Ghemawat, "MapReduce: Simplified Data Processing on Large Clusters", <em>OSDI</em>, 2004.',
    ],
    islenenler=[
        'The scaling problem: scaling up and scaling out',
        'Distributed file systems: GFS and HDFS',
        'The MapReduce programming model',
        'Spark: RDDs, DataFrames and Spark SQL',
        'Data models: relational, document, wide-column',
        'Storage engines: LSM trees, B-trees, columnar files',
        'Partitioning and load balancing',
        'Replication and consistency models',
        'CAP, distributed transactions, consensus: Paxos, Raft',
        'Event streams: Kafka and publish-subscribe',
        'Stream processing: windows, event time, Flink',
        'Data lakes, warehouses and workflow orchestration',
    ],
    beceriler=['writing distributed jobs in PySpark', 'writing Kafka producers and consumers', 'columnar storage with Parquet',
               'data modelling in Cassandra or MongoDB', 'diagnosing a slow Spark job'],
    hazirlik=[
        ('Can you explain the difference between a process and a thread?', 'An operating systems course: processes and concurrency'),
        ('Can you write an SQL query with JOIN and GROUP BY?', 'SQL and the relational model from a database course'),
        ('Can you write a program with classes and collections in Java or Python?', 'An object-oriented programming course in Java'),
        ('Can you move files and run a script from the Linux command line?', 'A short introduction to the Linux command line'),
    ],
    riskler=[
        ('Silent data loss', 'Misconfigured replication or Kafka records deleted when retention expires can destroy data without anyone noticing.'),
        ('Keep-everything habits', 'Collecting personal data because storage is cheap widens the breach surface; GDPR and similar laws require purpose limits.'),
        ('Honouring the right to erasure', 'A person\'s data spreads into backups, replicas and derived tables; fully honouring a deletion request is hard.'),
        ('Cloud bills and energy', 'A cluster left running or an unnecessary full table scan means a large bill and wasted energy.'),
    ],
)
