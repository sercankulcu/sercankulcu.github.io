---
title: Google Releases the Pixel 2
date: 2017-10-15
permalink: /posts/2017/10/google-releases-the-pixel-2/
tags:
  - hardware
  - software
  - technology-history
---

Google announced the Pixel 2 and Pixel 2 XL on October 4, 2017. The standard Pixel 2 had a 5-inch 1080p OLED display and sold for $649; the Pixel 2 XL had a 6-inch 2880×1440 pOLED display and sold for $849. Both used the Snapdragon 835, 4GB RAM, and a single 12.2 MP rear camera with an f/1.8 aperture — no telephoto lens, no wide-angle, just one sensor with a dual-pixel autofocus array. The iPhone 8 Plus released the same month had a dual 12MP setup (wide + telephoto), and Samsung's Galaxy Note 8 also shipped with two rear cameras.

Google Portrait Mode on Pixel 2 derived depth from the dual-pixel structure: each photosite on the sensor contained two sub-pixels with slightly different left-right viewpoints, providing a disparity map without a second lens. A neural network refined the depth estimate and created a smooth edge mask for background defocus (simulated f/1.8 to f/1.5 transition). DxOMark rated the Pixel 2 camera at 98, the highest score at the time, ahead of the iPhone 8 Plus at 94. HDR+ had been available since the original Pixel: the camera fired a rapid burst of short-exposure frames, aligned them to correct hand motion, and merged them using the Haiku noise-reduction algorithm running on the Hexagon DSP.

The Pixel Visual Core, Google's first custom image processor, shipped inside the Pixel 2 but was inactive at launch. Google enabled it via a software update in December 2017, offloading HDR+ processing to the dedicated chip and reducing photo processing time from roughly five seconds to one. The Visual Core was built on TSMC 28nm and contained eight cores each with 512 fixed-function multiply-accumulate units arranged for the specific convolution patterns used in HDR+ — a preview of the dedicated image-processing silicon that would become standard in flagship phones.
