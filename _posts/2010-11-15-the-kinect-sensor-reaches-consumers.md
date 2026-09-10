---
title: The Kinect Sensor Reaches Consumers
date: 2010-11-15
permalink: /posts/2010/11/the-kinect-sensor-reaches-consumers/
tags:
  - technology
  - computing-history
  - history
---

Microsoft launched Kinect for Xbox 360 on November 4, 2010 in North America, priced at $149.99 standalone or $299 bundled with an Xbox 360 and Kinect Adventures. It was the fastest-selling consumer electronics device at the time, selling 8 million units in 60 days according to Microsoft — faster than the iPhone or iPad had sold in comparable launch windows. The device sat below or beside a TV and required approximately 6 feet of clearance between the player and the sensor.

The Kinect hardware combined three sensor units: a VGA RGB camera (640×480, 30 fps), a structured-light infrared depth camera (320×240, 30 fps), and a four-microphone array with beamforming. The depth system used PrimeSense's technology — an infrared projector casting a known dot pattern across the room, with the IR camera measuring dot displacement caused by surface depth (parallax effect) to compute a real-time depth map accurate to approximately 1 centimeter at 3 meters. The software stack (the Kinect SDK for Windows, released June 2011) converted raw depth data into a 20-joint skeletal model updated at 30 fps using a random decision forest classifier trained on millions of synthetic human pose images — a machine-learning approach that was novel for real-time embedded gesture recognition at consumer price points.

The Kinect SDK for Windows launched June 2011, three days after which Adafruit Industries had already offered a $3,000 bounty for the first open-source driver (won by Hector Martin on November 10, 2010, six days after launch). Universities and researchers used Kinect for simultaneous localization and mapping (SLAM) in robotics, real-time 3D reconstruction (Microsoft's own KinectFusion project, 2011), prosthetics control, and rehabilitation monitoring. PrimeSense (the Kinect depth camera maker) was acquired by Apple in November 2013 for approximately $345 million; the technology later appeared in the iPhone X TrueDepth camera (2017) used for Face ID.
