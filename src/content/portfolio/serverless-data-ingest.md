---
title: Serverless Data Ingest
category: Infra
tags: [AWS, Terraform, Lambda]
imageUrl: https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000
featured: false
slug: serverless-data-ingest
description: Infrastructure-as-Code implementation for an AWS Lambda-based data ingestion pipeline. Managed via Terraform.
links: [{"label": "View Scripts", "url": "https://github.com/naffee", "icon": "github"}]
---

A serverless data ingestion pipeline provisioning cloud components to ingest webhooks from third-party partners.

### Details
- **Infrastructure-as-Code**: Fully declared using Terraform modules, enabling single-command environment spin-ups.
- **Auto-Scaling Telemetry**: Leverages API Gateway and AWS Lambda to scale automatically from zero to thousands of requests without server provisioning.
- **Storage Layer**: Directs validated webhook events into Amazon S3 parquet formats, partitioned by date and partner ID for easy Athena queries.
