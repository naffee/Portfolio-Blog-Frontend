---
title: Auth Service Microkernel
category: Software Development
tags: [Go, PostgreSQL, OAuth]
imageUrl: https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000
featured: false
slug: auth-service-microkernel
description: A reusable authentication core supporting OAuth2, SAML, and WebAuthn. Designed for modular integration into existing ecosystems.
links: [{"label": "GitHub", "url": "https://github.com/naffee", "icon": "github"}]
---

A modular auth microkernel engineered in **Go** to serve as the unified authentication provider across multiple client domains.

### Highlights
- **Multi-protocol support**: Integrated OAuth2 client credentials/authorization code flows, SAML 2.0 assertions, and passwordless WebAuthn.
- **Microkernel design**: Core services are thin and extensible through plugin hooks, enabling services to customize token payloads or validation routines.
- **Secure by Default**: Passes strict OWASP top 10 security audits and contains database-level row encryption for user keys.
