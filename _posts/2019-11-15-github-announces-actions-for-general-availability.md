---
title: GitHub Announces Actions for General Availability
date: 2019-11-15
permalink: /posts/2019/11/github-announces-actions-for-general-availability/
tags:
  - artificial-intelligence
  - software
  - computing-history
---

GitHub Actions reached general availability on November 13, 2019, extending a beta period that began in August 2018. The feature added a built-in CI/CD system to GitHub repositories, letting developers define automated workflows in YAML files stored at `.github/workflows/`. A workflow specified triggers (push to a branch, pull request opened, release created, scheduled cron, or manual dispatch), jobs (each running in an isolated virtual machine), and steps (shell commands or reusable “actions” from the GitHub Marketplace). GitHub provided hosted runners on Ubuntu (2-core, 7GB RAM), Windows, and macOS at no cost for public repositories, with paid minutes for private repositories starting at $0.008 per minute for Linux.

The GitHub Marketplace launched simultaneously with over 4,000 community-contributed actions for common steps: `actions/checkout` to clone a repository, `actions/setup-node` or `actions/setup-python` to configure a language runtime, deployment actions for AWS, Azure, and Google Cloud, and security scanning integrations. Because actions were just Docker containers or JavaScript modules, any team could publish a reusable step. The self-hosted runner option (launched November 2019) allowed jobs to run on a team's own hardware, addressing compliance requirements or performance needs that GitHub-hosted runners couldn't meet.

Before GitHub Actions, the dominant CI/CD tools in open-source projects were Travis CI (which had long offered free pipelines for GitHub repositories) and CircleCI. The integration of CI directly into the platform reduced the friction of setting up a pipeline from authorizing an external OAuth app and configuring webhooks to adding a YAML file. Travis CI's subsequent deprecation of free tiers in November 2020 (for open-source projects) accelerated migration to GitHub Actions. By 2021, GitHub Actions had become the most commonly used CI platform for new open-source projects on GitHub, with Jenkins, GitLab CI, and CircleCI as primary alternatives in enterprise contexts.
