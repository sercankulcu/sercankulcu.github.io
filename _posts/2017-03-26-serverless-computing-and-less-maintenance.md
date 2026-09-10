---
title: 'Serverless Computing And The Idea Of Less Maintenance'
date: 2017-03-26
permalink: /posts/2017/03/serverless-computing-and-less-maintenance/
tags:
  - cloud
  - serverless
  - software
---

The word "serverless" is a little funny because the servers do not actually disappear. They are still there — running in AWS data centers in Virginia or Oregon or wherever the platform routes your traffic. The servers become less visible to the developer, which is different from not existing.

AWS Lambda launched in November 2014. Azure Functions followed in 2016. Google Cloud Functions has been in beta. By March 2017, the model has moved from announcement to something teams are actively deploying. The premise is simple: write a function, define what event triggers it, deploy it, and let the cloud platform handle scaling, availability, and the underlying operating system.

## What serverless actually removes

The operational burden of a traditional server includes:

- Provisioning capacity before traffic arrives
- Patching the operating system and runtime
- Configuring monitoring for the process
- Handling what happens when the server crashes
- Managing the difference between expected and actual traffic

A small side project — an image resizing endpoint, a webhook handler, a scheduled report — does not justify this overhead. Before Lambda, the realistic options were a small VPS that required administration, or a platform-as-a-service that simplified deployment but still charged for idle time. Lambda charges per invocation and per 100ms of execution time. If the function runs a thousand times per month, you pay for a thousand invocations. When it is not running, it costs nothing.

A simple example: a function that receives a file upload notification from S3, resizes the image, and saves the result to another S3 bucket.

```python
import boto3
from PIL import Image
import io

def handler(event, context):
    s3 = boto3.client('s3')
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    obj = s3.get_object(Bucket=bucket, Key=key)
    image = Image.open(io.BytesIO(obj['Body'].read()))
    image.thumbnail((800, 800))
    
    buffer = io.BytesIO()
    image.save(buffer, format='JPEG')
    s3.put_object(Bucket='resized-bucket', Key=key, Body=buffer.getvalue())
```

This function runs only when a file arrives. It scales automatically if a thousand files arrive at once. It does not need a server running between uploads.

## The costs that appear later

The abstraction removes maintenance work. It also removes visibility.

**Cold starts.** Lambda functions are not always running. When a function has not been invoked recently, the platform initializes a new container before executing — a cold start that can add 100–1000ms of latency. For latency-sensitive applications this matters. For background processing it usually does not.

**Debugging difficulty.** A function that fails in production leaves a CloudWatch log entry. Reproducing the exact environment locally — the specific Lambda runtime version, the execution role permissions, the exact event payload — requires effort. Local testing of serverless functions is improving but not yet seamless.

**Cost unpredictability.** Per-invocation pricing is cheap at low volume and potentially expensive at high volume. A function triggered by a busy event stream can generate unexpected costs if no budget alerts are configured.

**Vendor lock-in.** An AWS Lambda function using API Gateway, S3 events, CloudWatch, and DynamoDB is deeply integrated with one provider's services. Migrating to Azure or Google Cloud is not a simple redeployment.

## The abstraction ladder

The trajectory from hardware to virtual machines to containers to functions is a consistent progression toward hiding details. Each step removes responsibility and reduces control in the same movement.

The useful question is not whether the control is worth having in general. It is whether your specific application needs it. A function that processes webhook events from Stripe does not benefit from configuring the Linux kernel. A real-time trading system that needs predictable latency within microseconds probably should not be serverless. Most applications fall somewhere in between, and the right answer depends on what the application does and what the team is good at maintaining.
