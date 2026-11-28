# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 15 slides: Explainable AI and AI Ethics — model explanation, '
             'fairness, accountability, regulation, history and neighboring courses.'),
    gundem=['Why explain?', 'Explanation methods', 'Bias and fairness', 'Accountability', 'Regulation', 'Neighboring courses'],
    tanim=('This course studies how to <b>explain</b> an AI system\'s decisions in a way people can understand, and how '
           'to make the system fair, reliable and accountable. The technical question is "why did the model decide '
           'this?"; the ethical question is "whom can this decision harm, and who is responsible?"'),
    tarihce=[
        ('2016', 'ProPublica publishes an analysis arguing that the COMPAS recidivism score is biased against Black defendants.'),
        ('2016', 'Ribeiro, Singh and Guestrin introduce LIME: explaining one prediction with a simple local model.'),
        ('2017', 'Lundberg and Lee publish SHAP: feature contributions from game-theoretic Shapley values.'),
        ('2018', 'The EU General Data Protection Regulation (GDPR) takes effect, granting a right to contest automated decisions.'),
        ('2018', 'The Gender Shades study shows commercial face analysis systems err far more often on darker-skinned women.'),
        ('2024', 'The EU AI Act is adopted: systems are classified by risk level.'),
    ],
    kavramlar=[
        ('Black-box model', 'A model whose inner workings people cannot follow.'),
        ('Interpretability', 'A model readable by design, such as a decision tree or a linear model.'),
        ('Local explanation', 'Explaining one prediction: LIME, SHAP values.'),
        ('Global explanation', 'The model\'s overall behavior: feature importance, PDP.'),
        ('Counterfactual', '"Had your income been this much, the loan would be approved."'),
        ('Data bias', 'Imbalance in training data carried into decisions.'),
        ('Fairness metrics', 'Demographic parity, equal opportunity, calibration.'),
        ('Accountability', 'Auditing, logging and ownership of a decision.'),
    ],
    akis=[('Set the\ncontext', 'who is hit,\nwhat risk?'), ('Audit\nthe data', 'coverage,\nbias'),
          ('Explain\nthe model', 'SHAP, LIME,\ncounterfactual'), ('Measure\nfairness', 'error rates\nby group'),
          ('Document,\nmonitor', 'model card,\naudit')],
    akis_ornek=('<b>Example:</b> A bank\'s credit model rejects an application. SHAP values show the rejection comes mostly '
                'from the debt ratio; a comparison across groups reveals markedly higher rejection rates in some '
                'neighborhoods. The team removes the feature that indirectly encodes neighborhood and documents the decision in the model card.'),
    onkosul_ek=[
        ('Programming', 'training models in Python and analyzing results', '/teaching/computer-and-introduction-to-programming/?lang=en'),
        ('Algorithmic Game Theory', 'the Shapley value: the theoretical root of SHAP explanations', '/teaching/algorithmic-game-theory/?lang=en'),
        ('Philosophy or law', 'ethical theories, personal data rights and the notion of responsibility', None),
    ],
    ayrisma=[
        ('MO', 'ML focuses on the model predicting correctly; this course asks why it predicts and whom it affects, and how.'),
        ('VB', 'Data science draws conclusions from data; this course checks whether those conclusions are biased, fair or explainable.'),
        ('SGY', 'Cybersecurity protects against attackers; this course studies the harm a system does to people even without an attack.'),
        ('US', 'Expert systems are already transparent through their rules; this course seeks ways to explain black-box models after the fact.'),
    ],
    uygulamalar=[
        ('Credit decisions', 'Explaining a rejection to the applicant.'),
        ('Medical diagnosis', 'Showing the physician what the model looked at.'),
        ('Hiring', 'Gender and age bias in résumé screening.'),
        ('Justice and public sector', 'Auditing whether risk scores are fair.'),
        ('Face recognition', 'Measuring error gaps between groups.'),
        ('Regulatory compliance', 'Documentation for the EU AI Act and KVKK.'),
    ],
    araclar=['SHAP', 'LIME', 'Captum', 'InterpretML', 'Fairlearn', 'AI Fairness 360', 'What-If Tool'],
    veriler=['COMPAS (ProPublica)', 'Adult (income)', 'German Credit', 'CelebA', 'Pilot Parliaments Benchmark'],
    araclar_not='In this course datasets are often used <b>to expose a problem</b>: COMPAS and Adult are the classic examples of how bias is measured.',
    yanilgilar=[
        ('Removing the protected attribute (gender, race) is enough.', 'Proxy features such as postal code or name can carry the same information; the bias remains.'),
        ('An algorithm is neutral because it works with numbers.', 'A model learns the bias in past decisions from the data and scales it up.'),
        ('An explanation shows how the model really works.', 'Methods such as LIME and SHAP are approximations; the explanation itself can mislead.'),
        ('All fairness metrics can be satisfied at once.', 'When base rates differ between groups, calibration and equal error rates usually cannot hold together.'),
    ],
    meslekler=['Responsible AI specialist', 'Model auditor', 'AI policy and compliance specialist', 'Data scientist', 'Researcher'],
    sonra=('This course adds a lens to every applied course: explaining a diagnosis in medical image processing, fooling '
           'a model in cybersecurity and monitoring a model in MLOps rest on the same questions. On the technical side you '
           'can continue with causal inference and adversarial robustness; on the social side, with law and policy.'),
    kaynaklar=[
        'Molnar, <em>Interpretable Machine Learning</em>, 2nd ed., self-published (online), 2022.',
        'Barocas, Hardt and Narayanan, <em>Fairness and Machine Learning: Limitations and Opportunities</em>, MIT Press, 2023.',
        'O\'Neil, <em>Weapons of Math Destruction</em>, Crown, 2016.',
        'Ribeiro, Singh and Guestrin, "Why Should I Trust You?: Explaining the Predictions of Any Classifier", <em>KDD</em>, 2016.',
        'Lundberg and Lee, "A Unified Approach to Interpreting Model Predictions", <em>NeurIPS</em>, 2017.',
    ],
    islenenler=[
        'Interpretable models: linear models and trees',
        'Feature importance and partial dependence (PDP, ICE)',
        'Local explanations: LIME',
        'Shapley values and SHAP',
        'Saliency maps for deep networks',
        'Counterfactual explanations and recourse',
        'Evaluating explanations: faithfulness and stability',
        'Fairness metrics and the conflicts between them',
        'Bias mitigation: pre-, in- and post-processing',
        'Privacy: anonymization and differential privacy',
        'Accountability: model cards, datasheets, audits',
        'Regulation: GDPR, KVKK and the EU AI Act',
    ],
    beceriler=['explaining models with SHAP and LIME', 'measuring group fairness with Fairlearn',
               'generating counterfactual explanations', 'writing a model card', 'assessing the risks of a system'],
    hazirlik=[
        ('Can you train a classifier in Python and evaluate it on a test set?', '@MO'),
        ('Can you compute false positive and false negative rates?', 'A short reading on confusion matrices and classification metrics'),
        ('Can you explain conditional probability and base rates?', '@OI'),
        ('Can you explain what the Shapley value means in game theory?', 'The Shapley value topic of the Algorithmic Game Theory course'),
    ],
    riskler=[
        ('Misleading explanations', 'LIME and SHAP are approximations; an adversarial model can look innocent to the explainer while hiding its real decision rule.'),
        ('Ethics washing', 'An ethics principles document or a single fairness score can serve as a showcase in place of real auditing.'),
        ('The wrong fairness metric', 'Choosing a metric is a value judgement: COMPAS could look fair under one metric and biased under another.'),
        ('Over-trusting explanations', 'A plausible-looking explanation can lead users to follow a wrong decision without question.'),
    ],
)
