# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 23 slides: Robotics and Robot Vision — kinematics, control, '
             'localization, SLAM, path planning, history, neighboring courses and overlaps.'),
    gundem=['Kinematics', 'Control', 'Localization', 'Robot vision', 'Path planning', 'Neighboring courses'],
    tanim=('Robotics studies how to design and control <b>machines that sense and move</b> in the physical world. '
           'The course combines perception, localization, planning and control under noisy measurements and '
           'real-time constraints; robot vision is the eye of this loop.'),
    tarihce=[
        ('1961', 'Unimate, the first industrial robot, starts work at a General Motors plant.'),
        ('1966', 'The Shakey project starts at SRI: the first mobile robot to sense and plan; A* is developed for it.'),
        ('1986', 'Brooks proposes the subsumption architecture: direct sense-act behaviors instead of planning.'),
        ('1997', 'The Sojourner rover explores the surface of Mars on the Mars Pathfinder mission.'),
        ('2002', 'The Roomba vacuum goes on sale; mobile robots enter homes.'),
        ('2005', 'Stanford\'s Stanley completes and wins the DARPA Grand Challenge desert race with no driver.'),
    ],
    kavramlar=[
        ('Degrees of freedom', 'The number of axes along which a robot can move independently.'),
        ('Coordinate frame', 'World, robot, camera; transformation matrices between them.'),
        ('Forward kinematics', 'Finding the end-effector position from joint angles.'),
        ('Inverse kinematics', 'Finding the joint angles for a desired end-effector position.'),
        ('PID control', 'Feedback that corrects error by proportional, integral and derivative terms.'),
        ('Localization', 'Position from noisy measurements with Kalman and particle filters.'),
        ('SLAM', 'Building a map while locating yourself in it.'),
        ('Path planning', 'A*, RRT: a collision-free path to the goal.'),
    ],
    akis=[('Sense', 'camera, lidar,\nIMU'), ('Localize', 'filters,\nSLAM'), ('Plan', 'path and\ntrajectory'),
          ('Control', 'PID, motor\ncommands'), ('Act', 'wheels,\njoints')],
    akis_ornek=('<b>Example:</b> A warehouse robot scans its surroundings with lidar and a camera, estimates its position '
                'on the map with a particle filter, plans a path between shelves with A* and sets wheel speeds with PID. '
                'The loop runs tens of times a second; each pass, measurements correct the plan.'),
    onkosul_ek=[
        ('Physics (mechanics)', 'force, torque, velocity and acceleration: the language of robot dynamics', None),
        ('Microprocessors', 'reading sensors, driving motors and real-time software', '/teaching/microprocessors/?lang=en'),
        ('Programming with C', 'embedded control software is mostly written in C/C++', '/teaching/programming-with-c/?lang=en'),
    ],
    ayrisma=[
        ('BG', 'Computer vision understands what is in a scene; robot vision turns the image into position and motion decisions.'),
        ('YZ', 'AI plans over abstract states; robotics carries out the plan in a continuous, noisy, physical world.'),
        ('PO', 'Reinforcement learning learns control by trial and error; robotics mostly designs it from models and control theory.'),
        ('GYZ', 'Embedded AI fits the model onto a small device; robotics ties that device into a loop with sensors and motors.'),
    ],
    uygulamalar=[
        ('Industrial arms', 'Welding, painting, assembly lines.'),
        ('Warehouse robots', 'Moving shelves and picking orders.'),
        ('Autonomous vehicles', 'Perception, localization and planning.'),
        ('Surgical robots', 'Making the surgeon\'s motion more precise.'),
        ('Planetary exploration', 'Mars rovers, autonomous driving at a distance.'),
        ('Home robots', 'Robot vacuums and lawn mowers.'),
    ],
    araclar=['ROS 2', 'Gazebo', 'MoveIt', 'OpenCV', 'Point Cloud Library', 'Webots'],
    veriler=['KITTI', 'TUM RGB-D', 'EuRoC MAV', 'nuScenes', 'YCB object set'],
    araclar_not='In robotics most experiments run first in <b>simulation</b>; moving to a real robot brings friction, noise and latency.',
    yanilgilar=[
        ('Robotics is only mechanics and electronics.', 'Today\'s hard problems are mostly in software: perception, localization and planning.'),
        ('A good plan gets the robot to the goal.', 'Wheels slip and sensors are noisy; a plan holds only with continuous feedback.'),
        ('What works in simulation works in reality.', 'The sim-to-real gap is a research topic of its own in robotics.'),
        ('Robot vision is the same as computer vision.', 'Robot vision stresses depth, pose and real time; its output is a motion.'),
    ],
    meslekler=['Robotics software engineer', 'Control engineer', 'Perception engineer', 'Autonomous driving engineer', 'Mechatronics engineer'],
    sonra=('Robotics brings vision, learning and control together in one physical system. From here you can move to '
           'learning motion with reinforcement learning, to multi-agent systems with robot swarms, or to on-device '
           'inference with embedded AI.'),
    kaynaklar=[
        'Siegwart, Nourbakhsh and Scaramuzza, <em>Introduction to Autonomous Mobile Robots</em>, 2nd ed., MIT Press, 2011.',
        'Thrun, Burgard and Fox, <em>Probabilistic Robotics</em>, MIT Press, 2005.',
        'Lynch and Park, <em>Modern Robotics: Mechanics, Planning, and Control</em>, Cambridge University Press, 2017.',
        'Corke, <em>Robotics, Vision and Control</em>, 2nd ed., Springer, 2017.',
    ],
)
