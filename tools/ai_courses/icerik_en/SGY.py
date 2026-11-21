# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 38 slides: AI in Cybersecurity — intrusion detection, malware, '
             'imbalanced data, adversarial attacks, history, neighbours, overlaps.'),
    gundem=['Intrusion detection', 'Malware', 'Imbalanced data', 'Adversarial attacks', 'Security of AI', 'Neighbouring courses'],
    tanim=('AI in cybersecurity asks two questions together: how can machine learning catch intrusions, malware and '
           'phishing, and how can AI systems themselves be fooled? What sets the field apart is the <b>adversarial '
           'setting</b>: on the other side is an attacker trying to evade the model.'),
    tarihce=[
        ('1987', 'Denning defines intrusion detection as a model that catches abnormal behaviour.'),
        ('1999', 'The KDD Cup 1999 intrusion detection dataset is released; it serves as a benchmark for many years.'),
        ('2002', 'Paul Graham popularizes the Bayesian spam filter with "A Plan for Spam".'),
        ('2014', 'Szegedy et al. show adversarial examples: an invisible change fools a classifier.'),
        ('2016', 'DARPA Cyber Grand Challenge: machines find and patch vulnerabilities with no human help.'),
        ('2023', 'OWASP publishes its first Top 10 for LLM applications, led by prompt injection.'),
    ],
    kavramlar=[
        ('Intrusion detection', 'Signature-based and anomaly-based approaches.'),
        ('Malware', 'Classifying files by static or behavioural features.'),
        ('Phishing detection', 'Telling fake emails, domains and web pages apart.'),
        ('Imbalanced data', 'Attacks are very rare next to normal traffic.'),
        ('False alarms', 'Precision, recall; analyst fatigue.'),
        ('Adversarial examples', 'Inputs carefully perturbed to fool a model.'),
        ('Data poisoning', 'Slipping malicious samples into training data.'),
        ('Prompt injection', 'Hidden instructions that change a language model\'s goal.'),
    ],
    akis=[('Collect', 'network flows,\nlogs'), ('Extract\nfeatures', 'bytes, flows,\nbehaviour'),
          ('Classify\nor score', 'ML model,\nanomaly'), ('Alert', 'analyst\nqueue'),
          ('Adapt', 'new attacks,\nretraining')],
    akis_ornek=('<b>Example:</b> An organization\'s gateway collects connection logs; features such as duration, byte count '
                'and port are extracted for each connection. A model scores suspicious flows and only the highest-scoring '
                'ones go to an analyst. The analyst\'s decisions become new labels and the model is updated.'),
    onkosul_ek=[
        ('Operating Systems', 'processes, file systems and permissions: the layer attacks target', '/teaching/operating-systems/?lang=en'),
        ('Computer Networks', 'TCP/IP, ports and packets: being able to read network traffic', None),
        ('Programming with C', 'memory and pointers: seeing how overflow vulnerabilities arise', '/teaching/programming-with-c/?lang=en'),
    ],
    ayrisma=[
        ('MO', 'ML assumes the data distribution stays fixed; here the other side deliberately changes the input to evade the model.'),
        ('AYE', 'Explainable AI treats trustworthiness in general; this course focuses on robustness against attackers and on catching attacks.'),
        ('BIO', 'Biometrics verifies identity by recognizing a person; this course covers a wide attack surface, from networks and files to email and models.'),
        ('VM', 'Data mining looks for unusual patterns to discover them; this course interprets them as attacks and turns them into alerts.'),
    ],
    uygulamalar=[
        ('Intrusion detection', 'Finding unusual connections in network traffic.'),
        ('Malware', 'Judging whether a file is malicious without running it.'),
        ('Phishing and spam', 'Filtering out fake emails and web pages.'),
        ('Fraud', 'Detecting suspicious transactions and account takeover.'),
        ('Security operations', 'Prioritizing and triaging thousands of alerts.'),
        ('Protecting AI', 'Adversarial examples, poisoning, prompt injection.'),
    ],
    araclar=['scikit-learn', 'Zeek', 'Suricata', 'Wireshark', 'YARA', 'Elastic Stack', 'Adversarial Robustness Toolbox'],
    veriler=['KDD Cup 1999 / NSL-KDD', 'CICIDS2017', 'UNSW-NB15', 'EMBER (malware)', 'Enron-Spam', 'PhishTank'],
    araclar_not='Old datasets (KDD Cup 1999) are still widely used but do not reflect today\'s traffic; results should also be tested on recent datasets.',
    yanilgilar=[
        ('99% accuracy means good intrusion detection.', 'If attacks are very rare, a model that calls everything normal is also 99% accurate; look at precision and false alarm rate.'),
        ('Once trained, a model keeps catching attacks.', 'Attackers change tactics; the model must be updated continuously with new samples.'),
        ('AI replaces the security analyst.', 'AI filters and prioritizes alerts; decisions and investigation still rest with people.'),
        ('Deep networks are robust to attacks.', 'Small, invisible changes (adversarial examples) can easily flip a model\'s decision.'),
    ],
    meslekler=['Security analyst (SOC)', 'Threat hunter', 'Malware analyst', 'Security data scientist',
               'AI security specialist'],
    sonra=('This course opens in two directions: on the security side, network security, digital forensics and malware '
           'analysis; on the AI side, adversarial robustness, privacy-preserving learning and LLM security. '
           'Explainable AI and AI Ethics is the natural neighbour on the second path.'),
    kaynaklar=[
        'Chio and Freeman, <em>Machine Learning and Security</em>, O\'Reilly, 2018.',
        'Denning, "An Intrusion-Detection Model", <em>IEEE Transactions on Software Engineering</em> 13(2), 1987.',
        'Sommer and Paxson, "Outside the Closed World: On Using Machine Learning for Network Intrusion Detection", <em>IEEE Symposium on Security and Privacy</em>, 2010.',
        'Goodfellow, Shlens and Szegedy, "Explaining and Harnessing Adversarial Examples", <em>ICLR</em>, 2015.',
    ],
)
