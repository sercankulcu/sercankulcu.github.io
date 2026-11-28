# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 28 slides: Information Retrieval and Recommender Systems — indexing, '
             'ranking, collaborative filtering, evaluation, history and neighboring courses.'),
    gundem=['Indexing', 'Query and ranking', 'Collaborative filtering', 'Evaluation', 'Dense vector search', 'Neighboring courses'],
    tanim=('Information retrieval studies systems that find the documents most relevant to a query among millions and '
           '<b>rank</b> them. Recommender systems do the same job without a query: they predict what a user will like '
           'from past behavior. Both return a ranked list, not an answer.'),
    tarihce=[
        ('1972', 'Spärck Jones proposes inverse document frequency (IDF): a rare term says more.'),
        ('1975', 'Salton and colleagues publish the vector space model: documents and queries are term vectors.'),
        ('1992', 'Xerox PARC\'s Tapestry system coins the term "collaborative filtering".'),
        ('1998', 'Brin and Page introduce the Google search engine, built on PageRank.'),
        ('2006', 'The Netflix Prize begins; matrix factorization stands out in the winning solutions.'),
        ('2020', 'Dense vector retrieval and retrieval-augmented generation (RAG) begin to spread.'),
    ],
    kavramlar=[
        ('Inverted index', 'For each term, a list of the documents containing it.'),
        ('TF-IDF and BM25', 'Scoring documents by term frequency and rarity.'),
        ('Vector space model', 'Measuring similarity by the cosine of the angle.'),
        ('Precision, recall', 'Share of results that are relevant; share of relevant ones found.'),
        ('Ranking metrics', 'MAP, MRR, NDCG: position in the list matters.'),
        ('Collaborative filtering', 'Recommending from what similar users liked.'),
        ('Matrix factorization', 'Splitting the user-item table into latent factors.'),
        ('Cold start', 'New users or items with no history.'),
    ],
    akis=[('Collect', 'crawls,\ninteraction logs'), ('Index', 'inverted index,\nvector index'), ('Retrieve', 'thousands of\nfast candidates'),
          ('Rank', 'learned\nranker'), ('Evaluate', 'NDCG,\nA/B test')],
    akis_ornek=('<b>Example:</b> A video platform collects watch logs, indexes videos as vectors, retrieves a few hundred '
                'candidates from millions, ranks them by probability of being watched, and compares the new ranker '
                'with the old one in an A/B test.'),
    onkosul_ek=[
        ('Data Structures', 'hash tables, trees and priority queues: the index and the top k results', '/teaching/data-structures/?lang=en'),
        ('Algorithms', 'sorting, merging and complexity: speed on large indexes', '/teaching/algorithms/?lang=en'),
    ],
    ayrisma=[
        ('VM', 'Data mining discovers patterns in data; this course turns discovery into a ranked list for one user\'s current need.'),
        ('NLP', 'NLP analyzes the structure and meaning of language; this course represents text only to score and rank relevance.'),
        ('MO', 'ML tries to predict individual examples correctly; this course cares about list order, above all the top few results.'),
        ('SAA', 'Social network analysis studies the structure of ties; this course uses that structure (e.g. PageRank) only as a ranking signal.'),
    ],
    uygulamalar=[
        ('Web search', 'Ranking the pages most relevant to a query.'),
        ('E-commerce', 'Customers who bought this also bought...'),
        ('Video and music', 'Personal feeds and playlists.'),
        ('Enterprise search', 'Searching company documents and e-mail.'),
        ('News feeds', 'Ranking posts by relevance.'),
        ('RAG', 'Fetching the right documents for a language model.'),
    ],
    araclar=['Apache Lucene', 'Elasticsearch', 'FAISS', 'Pyserini', 'Surprise', 'scikit-learn'],
    veriler=['MovieLens', 'Netflix Prize', 'MS MARCO', 'TREC collections', 'Cranfield collection', 'Amazon product reviews'],
    yanilgilar=[
        ('A search engine just finds the words in the query.', 'The real work is <b>ranking</b> thousands of matches; users rarely look past the first page.'),
        ('Recommending the top-rated items is enough.', 'The same list for everyone is not personalization; diversity and novelty are measured too.'),
        ('High accuracy means good recommendations.', 'A model with low rating error can still rank badly; rank metrics such as NDCG are needed.'),
        ('Dense vectors have made classic search obsolete.', 'BM25 is still a strong baseline; many systems combine the two.'),
    ],
    meslekler=['Search engineer', 'Recommender systems engineer', 'Data scientist', 'Ranking researcher'],
    sonra=('After this course you can move on to semantic search with natural language processing, link-based ranking '
           'with social network analysis, and indexing billions of documents with big data systems. Retrieval-augmented '
           'generation connects this course directly to large language models.'),
    kaynaklar=[
        'Manning, Raghavan and Schütze, <em>Introduction to Information Retrieval</em>, Cambridge University Press, 2008.',
        'Baeza-Yates and Ribeiro-Neto, <em>Modern Information Retrieval</em>, 2nd ed., Addison-Wesley, 2011.',
        'Aggarwal, <em>Recommender Systems: The Textbook</em>, Springer, 2016.',
        'Koren, Bell and Volinsky, "Matrix Factorization Techniques for Recommender Systems", <em>IEEE Computer</em> 42(8), 2009.',
    ],
    islenenler=[
        'Boolean retrieval and the inverted index',
        'Index construction, compression and dictionaries',
        'Text preprocessing: tokenization, stemming',
        'Scoring: TF-IDF and the vector space model',
        'Probabilistic retrieval and BM25',
        'Evaluating retrieval: precision, MAP, NDCG',
        'Link analysis: PageRank and HITS',
        'Learning to rank',
        'Dense retrieval and approximate nearest neighbors',
        'Content-based recommendation',
        'Collaborative filtering and matrix factorization',
        'Evaluating recommenders: offline metrics, A/B tests',
    ],
    beceriler=['building a search index in Elasticsearch', 'BM25 experiments with Pyserini', 'vector search with FAISS',
               'training recommenders with Surprise', 'measuring rankings with NDCG and MAP'],
    hazirlik=[
        ('Can you compute and interpret the cosine similarity of two vectors?', '@DC'),
        ('Can you explain why lookup in a hash table takes constant time?', 'A data structures course: hash tables and trees'),
        ('Can you compute precision and recall from a confusion matrix?', '@MO'),
        ('Can you split a text into words and count word frequencies?', '@NLP'),
    ],
    riskler=[
        ('Filter bubbles', 'Always showing more of what a user liked narrows the range of views; polarization from news and video feeds is debated.'),
        ('Popularity bias', 'Popular items get recommended more, so they get clicked more; new and small producers stay invisible.'),
        ('Query logs can identify people', 'From search logs that AOL anonymized and released in 2006, journalists identified some of the users.'),
        ('Ranking manipulation', 'Link farms, fake reviews and keyword stuffing distort rankings; the system must be designed against adversaries.'),
    ],
)
