# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 6 slides: Natural Language Processing and Text Mining — preprocessing, '
             'text representation, language models, transformers and neighboring courses.'),
    gundem=['Text preprocessing', 'Text representation', 'Language models', 'Transformers', 'Text mining', 'Neighboring courses'],
    tanim=('Natural language processing studies how computers analyze, understand and generate human language; text mining '
           'extracts information and patterns from large collections of text. At the heart of the course are '
           '<b>text representation</b>, which turns text into numbers, and language models that predict the next word.'),
    tarihce=[
        ('1954', 'Georgetown-IBM experiment: more than sixty Russian sentences are translated into English automatically.'),
        ('1966', 'Weizenbaum\'s ELIZA imitates a therapist with simple pattern matching.'),
        ('1990s', 'Statistical methods replace rule-based systems; IBM\'s translation models lead the way.'),
        ('2013', 'Mikolov et al.\'s word2vec embeds words as vectors that reflect meaning.'),
        ('2017', 'The transformer architecture is introduced, followed by pretrained models such as BERT and GPT.'),
        ('2022', 'Large language models reach a mass audience through chat interfaces.'),
    ],
    kavramlar=[
        ('Tokenization', 'Splitting text into word or subword units.'),
        ('Morphology', 'Root and suffix analysis; critical in agglutinative languages like Turkish.'),
        ('Bag of words', 'Representing text by word counts, ignoring order.'),
        ('TF-IDF', 'High weight for words frequent in a document but rare in the corpus.'),
        ('Word embeddings', 'Words with similar meanings lie close in vector space.'),
        ('Language model', 'A model that predicts the probability of the next word.'),
        ('Named entity recognition', 'Finding names of people, places and organizations in text.'),
        ('Topic modeling', 'Finding hidden topics in documents with methods such as LDA.'),
    ],
    akis=[('Collect\ntext', 'corpus'), ('Preprocess', 'tokenizing,\nstemming'), ('Represent', 'TF-IDF,\nembeddings'),
          ('Model', 'classifier,\ntransformer'), ('Evaluate', 'F1, BLEU')],
    akis_ornek=('<b>Example:</b> An online store collects product reviews, tokenizes the text and analyzes suffixes, turns '
                'the reviews into vectors with a pretrained transformer, trains a positive/negative sentiment classifier and '
                'measures it with the F1 score. The result shows which topics the complaints cluster around.'),
    onkosul_ek=[
        ('Programming', 'string handling, file reading and regular expressions in Python', '/teaching/computer-and-introduction-to-programming/?lang=en'),
        ('Data Structures', 'dictionaries, hash tables and tries: for storing a vocabulary', '/teaching/data-structures/?lang=en'),
    ],
    ayrisma=[
        ('KSI', 'Speech recognition goes from the sound wave to text; NLP analyzes meaning once the text is available.'),
        ('BE', 'Information retrieval fetches the documents most relevant to a query; NLP analyzes and generates the language inside them in detail.'),
        ('VM', 'Data mining looks for patterns in any kind of data; this course handles the structure specific to language (words, suffixes, sentences).'),
        ('UM', 'Generative models produce all kinds of samples, including images and audio; NLP also covers understanding and analysis tasks.'),
    ],
    uygulamalar=[
        ('Machine translation', 'Automatic translation between languages.'),
        ('Sentiment analysis', 'Finding the attitude in reviews and posts.'),
        ('Question answering', 'Finding answers in documents or a knowledge base.'),
        ('Summarization', 'Making a long text short and to the point.'),
        ('Chat assistants', 'Systems that talk with users in natural language.'),
        ('Document classification', 'Sorting news, petitions or emails by topic.'),
    ],
    araclar=['NLTK', 'spaCy', 'Hugging Face Transformers', 'Gensim', 'Stanza', 'Zemberek (Turkish)'],
    veriler=['Penn Treebank', 'CoNLL-2003', 'SQuAD', 'GLUE', 'IMDb movie reviews', 'Wikipedia dumps'],
    yanilgilar=[
        ('The model understands text like a human.', 'Language models learn statistical patterns; fluent text is not always correct or consistent.'),
        ('Any method built for English works for Turkish.', 'In agglutinative Turkish one root takes hundreds of forms; tokenization and morphology need separate care.'),
        ('Large language models ended classic NLP.', 'TF-IDF, regular expressions and small models are still fast, cheap and enough for most jobs.'),
        ('Text mining is just counting words.', 'Counting is the start; extracting entities, relations and topics requires language structure.'),
    ],
    meslekler=['NLP engineer', 'Computational linguist', 'Data scientist', 'Search and recommendation engineer', 'Researcher'],
    sonra=('After NLP you can move to spoken language with speech recognition, to semantic search with information retrieval, '
           'or to the inner workings of large language models with generative models. The Explainable AI and AI Ethics course '
           'covers the bias and reliability problems of language models.'),
    kaynaklar=[
        'Jurafsky and Martin, <em>Speech and Language Processing</em>, 2nd ed., Prentice Hall, 2009.',
        'Manning and Schütze, <em>Foundations of Statistical Natural Language Processing</em>, MIT Press, 1999.',
        'Bird, Klein and Loper, <em>Natural Language Processing with Python</em>, O\'Reilly, 2009.',
        'Eisenstein, <em>Introduction to Natural Language Processing</em>, MIT Press, 2019.',
        'Vaswani et al., "Attention Is All You Need", <em>Advances in Neural Information Processing Systems</em> 30, 2017.',
    ],
)
