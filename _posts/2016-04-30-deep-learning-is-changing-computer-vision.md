---
title: 'Deep Learning Is Changing Computer Vision'
date: 2016-04-30
permalink: /posts/2016/04/deep-learning-is-changing-computer-vision/
tags:
  - computer-vision
  - deep-learning
  - machine-learning
---

Computer vision has always fascinated me because the task sounds simple when we describe it in human language: "Find the object in this image." "Recognize this face." "Tell me what is happening in this picture." Humans do these things before they can write. For computers, the same tasks have been among the hardest problems in artificial intelligence for decades.

The story of why that changed so sharply in the past few years is worth telling specifically.

## The ImageNet moment

ImageNet is a dataset of over a million labeled images across a thousand categories — dogs, cars, chairs, instruments, foods, hundreds more. Since 2010, researchers have competed annually in the ImageNet Large Scale Visual Recognition Challenge (ILSVRC) to see which system could classify images most accurately. For the first two years, the best systems achieved error rates around 25-26%, using hand-engineered features.

In 2012, a team from the University of Toronto — Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton — submitted a convolutional neural network called AlexNet. It achieved a top-5 error rate of 15.3%, compared to the second-place entry's 26.2%. The gap was so large that the competition effectively ended the era of hand-designed features for image classification.

AlexNet's key ingredients: convolutional layers that learned spatial features from the images themselves rather than accepting features designed by humans, rectified linear unit (ReLU) activations that trained faster than sigmoid functions, dropout regularization to reduce overfitting, and — critically — training on two NVIDIA GTX 580 GPUs, which made it feasible to train a network with 60 million parameters in about a week.

## What followed

The ILSVRC results from 2012 to now tell the story clearly:

| Year | Winner       | Error rate |
|------|--------------|------------|
| 2011 | Conventional | 25.8%      |
| 2012 | AlexNet      | 15.3%      |
| 2014 | VGGNet       | 7.3%       |
| 2015 | ResNet       | 3.57%      |

Humans, by comparison, perform at approximately 5% error on the same task. ResNet — from Microsoft Research — surpassed human performance in 2015. The improvement from 2012 to 2015 was driven by deeper networks, better training techniques, and increased GPU power.

## How convolutional networks work

The architecture that made this possible — the convolutional neural network — is designed around the structure of images. Images are spatial: nearby pixels are related, and patterns can appear anywhere in the frame.

A convolutional layer applies learned filters to local regions of the image, detecting edges, curves, textures, and eventually higher-level features. The same filter is applied across the entire image (weight sharing), which reduces the number of parameters dramatically compared to a fully connected network. Pooling layers reduce spatial dimensions, making the representation more compact and somewhat invariant to small translations.

After several convolutional and pooling layers, fully connected layers combine the features into a final classification decision.

## The tools available now

Training these networks requires significant computing resources, but frameworks released in the past year have made experimentation much more accessible. Google released TensorFlow as open source in November 2015. Caffe from Berkeley has been widely used in research. These frameworks handle the gradient calculations and GPU operations, letting researchers focus on architecture design rather than numerical implementation.

Still, training a serious model on ImageNet requires GPU clusters. Researchers without institutional computing resources work with pre-trained models through transfer learning — taking a network trained on ImageNet and fine-tuning it for a more specific task with a smaller dataset.

## Where caution belongs

A system that performs at 3.57% error on ImageNet does not "understand" images in any philosophically meaningful sense. It has learned statistical patterns from labeled training data. Applied outside the distribution it was trained on — different lighting, unusual angles, images that were deliberately perturbed by a few pixels — it can fail in ways that no human would.

The adversarial example problem is striking: images that appear identical to a human can be processed very differently by a neural network, because the network has learned different features than humans use to perceive the image. This is not a bug in any specific implementation; it reflects the nature of what these networks have learned.

The progress is real and the applications are real — Google Photos can recognize faces and scenes in your library; medical imaging research is producing results in skin cancer detection and radiology. At the same time, the failures are real and the gap between benchmark performance and deployed reliability remains significant. This is a field in the middle of a genuine revolution, with everything that implies: rapid progress, incomplete understanding, and important open questions about where the current approach reaches its limits.
