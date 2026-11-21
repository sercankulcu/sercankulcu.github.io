# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 11 slides: Expert Systems and Knowledge Representation — rules, '
             'inference engines, ontologies, knowledge graphs, prerequisites and neighboring courses.'),
    gundem=['Knowledge representation', 'Rule base', 'Inference engine', 'Ontologies', 'Knowledge acquisition', 'Neighboring courses'],
    tanim=('An expert system writes a domain expert\'s knowledge into a <b>knowledge base</b> of rules and facts and '
           'draws conclusions from it with an inference engine. Knowledge representation studies how to encode knowledge '
           'so that a computer can reason with it: logic, frames, semantic networks and ontologies.'),
    tarihce=[
        ('1965', 'DENDRAL starts at Stanford: the first expert system, inferring molecular structure from mass spectra.'),
        ('1972', 'Colmerauer and Roussel develop Prolog: logic programming is born.'),
        ('1970s', 'MYCIN recommends antibiotics for blood infections, adding certainty factors to its rules.'),
        ('1980', 'R1 (XCON) starts configuring computer orders at DEC: the first big commercial success.'),
        ('1984', 'Lenat launches Cyc, aiming to hand-code common-sense knowledge.'),
        ('2012', 'Google announces the Knowledge Graph; knowledge graphs spread in search.'),
    ],
    kavramlar=[
        ('Knowledge base', 'Domain facts and IF-THEN rules.'),
        ('Inference engine', 'Applies rules to facts to derive new conclusions.'),
        ('Forward chaining', 'Start from facts and derive every reachable conclusion.'),
        ('Backward chaining', 'Start from a goal and look for facts that support it.'),
        ('Explanation facility', 'Shows which rules led to a conclusion.'),
        ('Frames and networks', 'Representing objects with slots and relations.'),
        ('Ontology', 'A domain\'s concepts, classes and relations: OWL.'),
        ('Knowledge acquisition', 'Eliciting knowledge from experts; the bottleneck.'),
    ],
    akis=[('Interview\nexpert', 'acquisition'), ('Encode', 'rules,\nontology'), ('Collect\nfacts', 'user\nanswers'),
          ('Infer', 'forward or\nbackward'), ('Explain', 'result and\nreasons')],
    akis_ornek=('<b>Example:</b> A fault diagnosis system turns technicians\' experience into rules such as "if the engine '
                'won\'t start and battery voltage is low, replace the battery". It asks the user about symptoms, chains '
                'the rules to find the fault and shows step by step which rules it used.'),
    onkosul_ek=[
        ('Discrete Mathematics', 'propositional and predicate logic, inference rules', None),
        ('Data Structures', 'trees, graphs and hash tables: storing rules and facts', '/teaching/data-structures/?lang=en'),
        ('Object Oriented Programming with Java', 'classes and inheritance: a bridge to frames and Drools', '/teaching/object-oriented-programming-with-java/?lang=en'),
    ],
    ayrisma=[
        ('MO', 'ML learns knowledge from examples and often gives no reasons; an expert system takes knowledge from experts and explains its result with rules.'),
        ('BM', 'Fuzzy logic lets rules be partly true; this course teaches representing knowledge and chaining rules in general.'),
        ('OGM', 'PGMs model uncertainty consistently with probability distributions; expert systems mostly write knowledge as crisp rules.'),
        ('AYE', 'XAI seeks explanations for learned models after the fact; an expert system explains itself because it is built from readable rules.'),
    ],
    uygulamalar=[
        ('Clinical decision support', 'Diagnosis and treatment advice from symptoms and tests.'),
        ('Fault diagnosis', 'Finding machine, vehicle and network problems.'),
        ('Product configuration', 'Building orders from compatible parts.'),
        ('Business rules', 'Loan approval, insurance and compliance checks.'),
        ('Knowledge graphs', 'Entity and relation data in search engines.'),
        ('Semantic web', 'Linking data through ontologies.'),
    ],
    araclar=['CLIPS', 'Drools', 'SWI-Prolog', 'Protégé', 'Apache Jena', 'Neo4j'],
    veri_baslik='Well-known knowledge bases',
    veriler=['Wikidata', 'DBpedia', 'WordNet', 'Gene Ontology', 'SNOMED CT', 'Protégé Pizza ontology'],
    yanilgilar=[
        ('Expert systems were a 1980s fad.', 'Under new names, business rule engines and knowledge graphs are used today in banking, healthcare and search.'),
        ('An expert system knows as much as the expert.', 'It knows only what was encoded; it fails quickly outside its domain or when common sense is needed.'),
        ('Writing the rules is easy.', 'Much expert knowledge is tacit; turning it into rules (knowledge acquisition) is the hardest and costliest step.'),
        ('Large language models made knowledge representation obsolete.', 'Language models can produce false facts; they are paired with knowledge graphs for verifiable results.'),
    ],
    meslekler=['Knowledge engineer', 'Ontology specialist', 'Decision support systems developer', 'Business rules analyst'],
    sonra=('This course is the gateway to symbolic AI. Next you can take Probabilistic Graphical Models to handle '
           'uncertainty consistently, Fuzzy Logic for partial truth, or Explainable AI and AI Ethics for explaining '
           'decisions and accountability.'),
    kaynaklar=[
        'Jackson, <em>Introduction to Expert Systems</em>, 3rd ed., Addison-Wesley, 1999.',
        'Brachman and Levesque, <em>Knowledge Representation and Reasoning</em>, Morgan Kaufmann, 2004.',
        'Giarratano and Riley, <em>Expert Systems: Principles and Programming</em>, 4th ed., Thomson Course Technology, 2005.',
        'Buchanan and Shortliffe (eds.), <em>Rule-Based Expert Systems: The MYCIN Experiments of the Stanford Heuristic Programming Project</em>, Addison-Wesley, 1984.',
    ],
    islenenler=[
        'The knowledge representation and reasoning problem',
        'Propositional and first-order logic; resolution',
        'Logic programming: Prolog',
        'Rule-based systems; forward and backward chaining',
        'The Rete algorithm and rule engines: CLIPS, Drools',
        'Frames, semantic networks and inheritance',
        'Description logics',
        'Ontologies: RDF, OWL and Protégé',
        'Knowledge graphs and SPARQL queries',
        'Uncertainty: certainty factors, default reasoning',
        'Knowledge acquisition and expert interviews',
        'Explanation, verification and knowledge base upkeep',
    ],
    beceriler=['writing rules in CLIPS or Drools', 'logic programming in Prolog', 'building ontologies in Protégé',
               'querying knowledge graphs with SPARQL', 'eliciting expert knowledge as rules'],
    hazirlik=[
        ('Can you write a sentence such as "all humans are mortal" in first-order logic?', 'Propositional and predicate logic from discrete mathematics'),
        ('Can you run depth-first and breadth-first search on an example?', '@YZ'),
        ('Can you use a hash map and a graph in a program?', 'Hash tables and graphs from a data structures course'),
        ('Can you explain classes, objects and inheritance with an example?', 'An intro to object-oriented programming in Java'),
    ],
    riskler=[
        ('Bias written into rules', "An expert's habits and an institution's old practices become rules; credit or insurance rules can quietly exclude some groups."),
        ('Rule conflicts and upkeep', 'Thousands of rules can shadow and contradict each other; in large systems such as XCON, maintaining the rules became a burden of its own.'),
        ('Unclear responsibility', 'After a wrong diagnosis or a rejected application, it is unclear whether the fault lies with the expert, the knowledge engineer or the user.'),
        ('Errors in knowledge bases', 'Wrong or outdated facts in open knowledge bases spread to the search and chat systems built on them.'),
    ],
)
