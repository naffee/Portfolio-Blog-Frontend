---
title: Scalable API Gateway
category: Software Development
tags: [FastAPI, PostgreSQL, Redis]
imageUrl: https://images.unsplash.com/photo-1558494949-ef526b01201b?auto=format&fit=crop&q=80&w=1000
featured: true
slug: scalable-api-gateway
description: A high-performance entry point for microservices using FastAPI and Redis for rate limiting. Supports dynamic routing and JWT authentication.
links: [{"label": "GitHub", "url": "https://github.com/naffee", "icon": "github"}, {"label": "Live Demo", "url": "#", "icon": "external"}]
---

A high-performance api gateway developed with **FastAPI** to serve as the unified entry point for a distributed microservice ecosystem.

### Core Features
- **Token Bucket Rate Limiting**: Implemented via Redis to shield backend microservices from denial of service and scraping attempts.
- **Dynamic Routing**: Routes requests dynamically based on path rules mapped in Redis, eliminating the need to redeploy the gateway on service configuration changes.
- **Unified Authentication**: Centralized JWT authorization and scope validation, reducing redundant auth code across backend APIs.
