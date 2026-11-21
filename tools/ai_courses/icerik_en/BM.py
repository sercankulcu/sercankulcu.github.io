# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 9 slides: Fuzzy Logic and Fuzzy Systems — fuzzy sets, '
             'membership functions, linguistic rules, fuzzy control, history and neighboring courses.'),
    gundem=['Fuzzy sets', 'Membership functions', 'Linguistic rules', 'Fuzzy inference', 'Fuzzy control', 'Neighboring courses'],
    tanim=('Fuzzy logic drops the sharp line between belonging and not belonging to a set; it gives each element a '
           '<b>degree of membership</b> between 0 and 1. Rules can then be written with linguistic terms such as "hot" '
           'or "fairly fast", and these rules produce a numeric decision or control signal.'),
    tarihce=[
        ('1965', 'Zadeh publishes "Fuzzy Sets", introducing sets with partial membership.'),
        ('1973', 'Zadeh introduces linguistic variables and approximate reasoning with fuzzy IF-THEN rules.'),
        ('1975', 'Mamdani and Assilian control a steam engine with the first fuzzy controller.'),
        ('1985', 'Takagi and Sugeno propose the fuzzy model whose rule outputs are functions (TS model).'),
        ('1987', 'The Sendai subway in Japan opens, accelerating and braking under fuzzy control.'),
        ('1993', 'Jang publishes ANFIS, which trains fuzzy rules like a neural network.'),
    ],
    kavramlar=[
        ('Fuzzy set', 'Each element has a membership degree between 0 and 1.'),
        ('Membership function', 'Triangle, trapezoid, Gaussian: maps a value to a degree.'),
        ('Linguistic variable', 'A variable whose values are words: low, medium, high.'),
        ('Fuzzy operators', 'Minimum for AND, maximum for OR, 1-µ for NOT.'),
        ('Rule base', 'Rules like IF temperature is high THEN fan is fast.'),
        ('Mamdani inference', 'Rule outputs are fuzzy sets, later defuzzified.'),
        ('Sugeno inference', 'Rule outputs are functions of the inputs; fast to compute.'),
        ('Defuzzification', 'Reducing the fuzzy result to one number: the centroid.'),
    ],
    akis=[('Measure', 'crisp input'), ('Map to\nmembership', 'fuzzification'), ('Apply\nrules', 'IF-THEN\nbase'),
          ('Aggregate', 'output set'), ('Defuzzify', 'crisp output')],
    akis_ornek=('<b>Example:</b> An air conditioner measures 27 °C in a room; this value belongs to "hot" with degree 0.7 '
                'and to "warm" with degree 0.3. The rules "if hot, cool strongly" and "if warm, cool moderately" fire with '
                'these degrees, their outputs are aggregated, and the centroid gives the compressor a single power value such as 72 percent.'),
    onkosul_ek=[
        ('Discrete Mathematics', 'sets, relations and propositional logic', None),
        ('Programming', 'writing functions and building simple simulations', '/teaching/computer-and-introduction-to-programming/?lang=en'),
        ('Control Systems', 'feedback and the PID controller', None),
    ],
    ayrisma=[
        ('OI', 'Probability measures uncertainty about whether an event will happen; this course measures how far a concept applies, that is, a vague boundary.'),
        ('US', 'Expert systems mostly run rules with crisp logic; this course builds approximate reasoning where rules can be partly true.'),
        ('ROB', 'Robotics covers control as a whole; this course teaches the fuzzy controller as a model-free option.'),
        ('YSA', 'Neural networks learn rules from data as unreadable weights; a fuzzy system\'s rules come from an expert and are readable.'),
    ],
    uygulamalar=[
        ('Home appliances', 'Washing machines, air conditioners, rice cookers.'),
        ('Transportation', 'Subway acceleration and braking, automatic gearboxes.'),
        ('Industrial control', 'Kiln temperature, cement and chemical processes.'),
        ('Cameras', 'Autofocus and image stabilization.'),
        ('Decision support', 'Risk assessment, supplier selection.'),
        ('Medicine', 'Approximate diagnosis from symptoms, dose advice.'),
    ],
    araclar=['MATLAB Fuzzy Logic Toolbox', 'scikit-fuzzy', 'jFuzzyLogic', 'fuzzylite', 'Simpful'],
    veri_baslik='Classic benchmark problems',
    veriler=['Tipping problem', 'Inverted pendulum', 'Truck backer-upper', 'Washing machine control', 'Water tank level', 'Mackey-Glass time series'],
    araclar_not='Fuzzy systems are usually built from <b>expert knowledge</b> rather than data; data is used to fine-tune the rules in methods such as ANFIS.',
    yanilgilar=[
        ('Fuzzy logic is imprecise, sloppy logic.', 'Rules use vague concepts, but the computation is exact; the same input always gives the same output.'),
        ('A membership degree is a probability.', '0.7 is the degree of being "hot", not the chance of being hot; degrees need not sum to 1.'),
        ('Fuzzy logic is an old, abandoned field.', 'It is widely used in appliances and industrial control, and its combination with neural networks continues.'),
        ('A fuzzy system learns from data.', 'A basic fuzzy system takes its rules from an expert; learning is added by hybrid methods such as ANFIS.'),
    ],
    meslekler=['Control systems engineer', 'Embedded software engineer', 'Automation engineer', 'Decision support analyst'],
    sonra=('Fuzzy logic shares the rule base with expert systems and control with robotics. After this course you can move '
           'to neuro-fuzzy systems to learn rules from data, or to probabilistic graphical models to handle uncertainty '
           'with probability.'),
    kaynaklar=[
        'Zadeh, "Fuzzy Sets", <em>Information and Control</em> 8(3), 1965.',
        'Klir and Yuan, <em>Fuzzy Sets and Fuzzy Logic: Theory and Applications</em>, Prentice Hall, 1995.',
        'Ross, <em>Fuzzy Logic with Engineering Applications</em>, 4th ed., Wiley, 2017.',
        'Jang, Sun and Mizutani, <em>Neuro-Fuzzy and Soft Computing</em>, Prentice Hall, 1997.',
    ],
)
