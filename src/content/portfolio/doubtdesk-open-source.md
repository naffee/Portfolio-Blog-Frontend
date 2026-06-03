---
title: "Documenting Open-Source Environment Variables (DoubtDesk)"
category: "Open Source"
tags: ["Developer Onboarding", "Env Vars", "Markdown", "Open Source"]
imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
featured: true
slug: "doubtdesk-open-source"
description: "Successfully merged contribution to the DoubtDesk repository, resolving Issue #530 by providing clear local onboarding documentation."
links: [{"label": "View Merged PR", "url": "https://github.com/DoubtDesk/doubtdesk/issues/530", "icon": "github"}]
---

A successful open-source contribution to the DoubtDesk repository, resolving an open issue by providing clear onboarding documentation for local environment variables.

### Overview
- **Goal**: To resolve an open GitHub issue (#530) by providing clear onboarding documentation for local environment variables.
- **Intended Audience**: Open-source contributors cloning the `DoubtDesk` repository for the first time.
- **Key Skills Demonstrated**: Open-source contribution, developer onboarding, documenting external API dependencies, and writing local setup checks.

---

# Local Environment Setup

To run DoubtDesk locally, you need to configure your environment variables. These variables connect the application to its database and external services like Clerk (Authentication) and Groq (AI).

Follow these steps to set up your `.env` file correctly.

## 1. Create your Environment File
In the root directory of the project, copy the example environment file to create your own local configuration:

```bash
cp .env.example .env
```

## 2. Configure Required Variables

Open the newly created `.env` file and fill in the required values.

### Database (PostgreSQL)
DoubtDesk uses PostgreSQL (hosted via Neon) for data storage.
- `DATABASE_URL`: Your connection string. Make sure to append `?sslmode=require` if you are using Neon or another remote provider.

### Authentication (Clerk)
We use [Clerk](https://clerk.com/) for user authentication. You will need to create a free Clerk application to get these keys.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key (starts with `pk_test_`).
- `CLERK_SECRET_KEY`: Your Clerk secret key (starts with `sk_test_`).
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: Set these to `/sign-in` and `/sign-up` respectively.

### AI Engine (Groq)
DoubtDesk's AI features are powered by [Groq](https://groq.com/).
- `GROQ_API_KEY`: Create a free API key in the Groq console (starts with `gsk_`).

### Site Configuration
- `NEXT_PUBLIC_SITE_URL` & `NEXT_PUBLIC_APP_URL`: Leave these as `http://localhost:3000` for local development.
- `UNSUBSCRIBE_SECRET`: Generate a long, random string. This is used to cryptographically sign email unsubscribe links.

## 3. Configure Optional Variables

Some services are only strictly required for production deployment, but you can configure them locally if you are working on those specific features.

### Background Jobs (Inngest)
- `INNGEST_EVENT_KEY` / `INNGEST_SIGNING_KEY`: Used for background job queues. These can be left blank for standard local UI development unless you are testing asynchronous tasks.

### Rate Limiting (Upstash Redis)
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`: Used to prevent API abuse. This is strictly required for production, but can be bypassed during local UI development.

## 4. Local Setup Checks

Before starting the development server, run through this quick checklist to ensure your environment is ready:

- [ ] `.env` file exists in the root directory.
- [ ] `DATABASE_URL` is populated with a valid PostgreSQL string.
- [ ] Both Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`) are populated.
- [ ] `GROQ_API_KEY` is populated.

Once verified, you can start the development server:
```bash
npm run dev
```

If the server crashes immediately on startup or throws authorization errors, double-check your `.env` file for missing variables or syntax errors!
