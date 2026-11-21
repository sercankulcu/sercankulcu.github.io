# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 7 slides: Reinforcement Learning — agent and environment, Markov '
             'decision processes, value and policy, exploration, deep RL and neighboring courses.'),
    gundem=['Agent and environment', 'Markov decision process', 'Value functions', 'Exploration vs. exploitation', 'Deep RL', 'Neighboring courses'],
    tanim=('Reinforcement learning studies how an agent, interacting with its environment and guided only by a <b>reward '
           'signal</b>, learns by trial and error the behavior that maximizes total reward in the long run. The right '
           'action is never given in advance, and the effects of actions often arrive with a delay.'),
    tarihce=[
        ('1957', 'Bellman\'s Dynamic Programming introduces the Bellman equation and the idea of a value function.'),
        ('1988', 'Sutton publishes temporal-difference (TD) learning: correcting a prediction with the next prediction.'),
        ('1989', 'Watkins proposes Q-learning in his PhD thesis.'),
        ('1992', 'Tesauro\'s TD-Gammon nears expert level at backgammon by playing against itself.'),
        ('2015', 'DeepMind\'s deep Q-network (DQN) learns Atari games from raw pixels (Nature).'),
        ('2016', 'AlphaGo beats Lee Sedol at Go: tree search, deep networks and reinforcement learning together.'),
    ],
    kavramlar=[
        ('Agent and environment', 'The agent acts; the environment returns a new state and a reward.'),
        ('Markov decision process', 'States, actions, transition probabilities and rewards.'),
        ('Return', 'The sum of discounted future rewards.'),
        ('Policy', 'A rule that says which action to choose in each state.'),
        ('Value function', 'The expected return from a state or an action.'),
        ('Exploration vs. exploitation', 'Balancing trying new actions against using what is known.'),
        ('Temporal difference', 'TD, Q-learning, SARSA: model-free, step-by-step learning.'),
        ('Policy gradient', 'Improving the policy directly with the gradient of the return.'),
    ],
    akis=[('Observe\nstate', 'from the\nenvironment'), ('Choose\naction', 'policy,\nε-greedy'), ('Get reward', 'new state'),
          ('Update\nvalue', 'TD error'), ('Improve\npolicy', 'thousands of\nepisodes')],
    akis_ornek=('<b>Example:</b> A warehouse robot observes its position on a grid, usually picks the best direction it knows '
                'and sometimes a random one, and gets +10 for reaching the shelf and −1 for hitting a wall. Q-learning updates '
                'action values at every step; after thousands of trials a short, safe path emerges.'),
    onkosul_ek=[
        ('Algorithms', 'dynamic programming and shortest paths in graphs', '/teaching/algorithms/?lang=en'),
        ('Programming', 'simulation loops and arrays in Python', '/teaching/computer-and-introduction-to-programming/?lang=en'),
    ],
    ayrisma=[
        ('MO', 'In supervised learning every example comes with the right answer; in RL there is only a delayed reward, and data is collected by the agent\'s own actions.'),
        ('OPT', 'Optimization solves a problem whose model is known; RL learns by interacting, without knowing the environment\'s model.'),
        ('CES', 'Multi-agent systems study coordination and conflict among agents; this course mostly focuses on a single agent learning.'),
        ('ROB', 'Robotics covers perception, kinematics and control; RL contributes only learning behavior from experience.'),
    ],
    uygulamalar=[
        ('Games', 'Go, chess, Atari and strategy games.'),
        ('Robot control', 'Learning to walk, grasp and move.'),
        ('Resource management', 'Data center cooling, network traffic routing.'),
        ('Recommender systems', 'Caring about long-term user satisfaction.'),
        ('Traffic signals', 'Reducing waiting times at intersections.'),
        ('Language model fine-tuning', 'Reinforcement learning from human feedback (RLHF).'),
    ],
    araclar=['Gymnasium', 'Stable-Baselines3', 'PyTorch', 'RLlib', 'MuJoCo', 'PettingZoo'],
    veri_baslik='Classic environments',
    veriler=['Gridworld', 'Multi-armed bandit', 'CartPole', 'MountainCar', 'Atari games (ALE)', 'MuJoCo control tasks'],
    araclar_not='RL gives you an <b>environment</b> instead of a ready-made dataset: the agent produces data by its own actions, so simulation is the course\'s lab.',
    yanilgilar=[
        ('RL is just another name for supervised learning.', 'The right action is never given; the agent learns only from rewards and the experience it collects.'),
        ('Writing the reward is easy.', 'An agent exploits a poorly designed reward with unexpected shortcuts (reward hacking).'),
        ('A robot that learns in simulation works in reality.', 'The gap between simulation and the real world (sim-to-real) must be handled separately.'),
        ('RL is only for games.', 'Control, resource management and training language models from human feedback also use RL.'),
    ],
    meslekler=['Reinforcement learning engineer', 'Robotics software engineer', 'Game AI developer', 'Researcher'],
    sonra=('After reinforcement learning you can move to multi-agent systems, where many agents learn together, or to robotics, '
           'for machines that learn in the physical world. Deep learning helps with deep RL, and optimization makes policy '
           'gradient methods easier to understand.'),
    kaynaklar=[
        'Sutton and Barto, <em>Reinforcement Learning: An Introduction</em>, 2nd ed., MIT Press, 2018.',
        'Szepesvári, <em>Algorithms for Reinforcement Learning</em>, Morgan &amp; Claypool, 2010.',
        'Bertsekas, <em>Reinforcement Learning and Optimal Control</em>, Athena Scientific, 2019.',
        'Mnih et al., "Human-level control through deep reinforcement learning", <em>Nature</em> 518, 2015.',
    ],
)
