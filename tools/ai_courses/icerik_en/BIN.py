# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 39 slides: Bioinformatics — sequence alignment, genome assembly, '
             'gene expression, protein structure, history, prerequisites, neighbors, overlaps.'),
    gundem=['Biological data', 'Sequence alignment', 'Genome assembly', 'Gene expression', 'Protein structure', 'Neighboring courses'],
    tanim=('Bioinformatics analyzes biological data such as DNA, RNA and protein sequences with algorithms and statistics. '
           'The course covers problems such as <b>sequence alignment</b>, genome assembly, gene expression analysis and '
           'protein structure prediction, using methods that cope with the size and noise of this data.'),
    tarihce=[
        ('1953', 'Watson and Crick, drawing also on Franklin\'s data, propose the double-helix structure of DNA.'),
        ('1970', 'Needleman and Wunsch publish a global sequence alignment algorithm based on dynamic programming.'),
        ('1981', 'Smith and Waterman publish the local sequence alignment algorithm.'),
        ('1990', 'BLAST is published: fast, heuristic similarity search in large databases.'),
        ('2003', 'The Human Genome Project is completed; sequencing costs begin to fall rapidly.'),
        ('2020', 'AlphaFold 2 predicts protein structure at CASP14 with accuracy close to experimental methods.'),
    ],
    kavramlar=[
        ('Sequence alignment', 'Global and local alignment; scoring matrices.'),
        ('Sequence databases', 'GenBank, UniProt, PDB; similarity search.'),
        ('Hidden Markov model', 'Gene finding and protein family profiles.'),
        ('Genome assembly', 'Building a genome from short reads; de Bruijn graphs.'),
        ('Gene expression', 'Measuring how active each gene is with RNA-seq.'),
        ('Phylogenetics', 'Building the family tree of species from sequences.'),
        ('Protein structure', 'Predicting 3D shape from the amino acid sequence.'),
        ('Multiple testing', 'Controlling the false discovery rate over thousands of genes.'),
    ],
    akis=[('Sequence', 'sequencing\nmachine'), ('Clean and\nassemble', 'QC, genome\nassembly'),
          ('Align', 'to reference,\nto database'), ('Analyze', 'variants,\nexpression'), ('Interpret', 'biological\nfunction')],
    akis_ornek=('<b>Example:</b> A bacterium taken from a patient is sequenced, the short reads are assembled into a genome, '
                'and its genes are compared with known sequences in a database using BLAST. If antibiotic resistance genes '
                'are found, the physician is told which drugs will not work.'),
    onkosul_ek=[
        ('Algorithms', 'dynamic programming: the method behind sequence alignment', '/teaching/algorithms/?lang=en'),
        ('Data Structures', 'hash tables, trees and graphs: k-mer counting and genome assembly', '/teaching/data-structures/?lang=en'),
        ('Biology', 'the basics of DNA, RNA, proteins and gene expression', None),
    ],
    ayrisma=[
        ('MO', 'ML develops general-purpose learning methods; this course applies them to sequence and expression data together with biological knowledge.'),
        ('VM', 'Data mining looks for patterns in any data; this course uses alignment and motif methods specific to DNA and protein sequences.'),
        ('OGM', 'Probabilistic graphical models are a general framework; this course uses hidden Markov models for gene finding and protein families.'),
        ('TGI', 'Medical image processing analyzes images of organs and tissue; this course analyzes sequence and expression data at the molecular level.'),
    ],
    uygulamalar=[
        ('Personalized medicine', 'Choosing treatment by genetic variants.'),
        ('Outbreak tracking', 'Tracing spread through virus genomes.'),
        ('Drug discovery', 'Predicting target protein and molecule interactions.'),
        ('Cancer genomics', 'Finding tumor-specific mutations.'),
        ('Agriculture', 'Breeding productive and resilient crop varieties.'),
        ('Evolution studies', 'Building species relationships from sequences.'),
    ],
    araclar=['BLAST', 'Biopython', 'Bioconductor (R)', 'BWA', 'SAMtools', 'HMMER', 'PyMOL'],
    veriler=['GenBank', 'UniProt', 'Protein Data Bank (PDB)', 'Gene Expression Omnibus (GEO)', '1000 Genomes Project',
             'The Cancer Genome Atlas (TCGA)'],
    yanilgilar=[
        ('One gene means one trait.', 'Most traits come from many genes and the environment together; few are set by a single gene.'),
        ('Once a genome is sequenced, its function is known.', 'A sequence is only a string of letters; finding what genes do is a separate, hard analysis.'),
        ('Bioinformatics is only for biologists.', 'The core of the field is algorithms, data structures and statistics; computer engineers are central.'),
        ('When thousands of genes are tested, the significant ones are real.', 'Multiple testing inflates false positives; corrections such as the false discovery rate are needed.'),
    ],
    meslekler=['Bioinformatician', 'Computational biologist', 'Genomics data scientist', 'Biostatistician',
               'AI researcher in drug discovery'],
    sonra=('Bioinformatics brings machine learning, data mining and probabilistic models together in one application '
           'area. After this course, computational genomics, structural biology and protein language models, or '
           'neighboring health courses such as medical image processing, are natural next steps.'),
    kaynaklar=[
        'Durbin, Eddy, Krogh and Mitchison, <em>Biological Sequence Analysis</em>, Cambridge University Press, 1998.',
        'Jones and Pevzner, <em>An Introduction to Bioinformatics Algorithms</em>, MIT Press, 2004.',
        'Compeau and Pevzner, <em>Bioinformatics Algorithms: An Active Learning Approach</em>, 3rd ed., Active Learning Publishers, 2018.',
        'Altschul et al., "Basic Local Alignment Search Tool", <em>Journal of Molecular Biology</em> 215(3), 1990.',
    ],
    islenenler=[
        'A molecular biology primer and biological databases',
        'Pairwise alignment: Needleman-Wunsch, Smith-Waterman',
        'Scoring matrices and similarity search with BLAST',
        'Multiple sequence alignment',
        'Hidden Markov models and gene finding',
        'Motif finding',
        'Genome assembly: de Bruijn graphs',
        'Read mapping and variant calling',
        'Phylogenetic trees',
        'Gene expression with RNA-seq; multiple testing',
        'Clustering and classifying gene expression',
        'Protein structure prediction and AlphaFold',
    ],
    beceriler=['handling sequences with Biopython', 'similarity search with BLAST', 'read mapping with BWA and SAMtools', 'expression analysis with Bioconductor', 'implementing an alignment algorithm'],
    hazirlik=[
        ('Can you find the longest common subsequence of two strings by dynamic programming?', 'Dynamic programming from an algorithms course'),
        ('Can you explain how information flows from DNA to RNA to protein?', 'High school biology or a short molecular biology primer'),
        ('Can you count all substrings of length k in a text with a hash table?', 'Hash tables from a data structures course'),
        ('Can you train a classifier and interpret the result of a clustering?', '@MO'),
    ],
    riskler=[
        ('Genetic privacy', 'A genome identifies a person and their relatives; identities have been recovered from genetic data thought anonymous.'),
        ('Ancestry-biased data', 'Genomic databases come mostly from people of European ancestry; risk scores are less accurate for other ancestries.'),
        ('Batch effects', 'When samples are processed on different days or machines, a technical difference can look like a biological finding.'),
        ('Clinical overinterpretation', 'Treating a variant of uncertain significance as a cause of disease can lead a patient to needless treatment or worry.'),
    ],
)
