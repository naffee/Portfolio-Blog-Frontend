---
title: "Migrating to the OpenAI Responses API"
category: "Migration Guide"
tags: ["OpenAI API", "Migration Guide", "Developer Docs"]
imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
featured: true
slug: "openai-responses-api-migration"
description: "A practical, step-by-step migration guide for developers moving from Chat Completions to the new Responses API."
links: []
---

## Introduction

OpenAI's new **Responses API** is a significant upgrade designed to streamline the way you build agentic applications. If you have been relying on the older **Chat Completions API**, migrating to the Responses API will unlock native support for multi-turn interactions, built-in tool calling (like web search and file search), and better state management. 

This guide provides a clear, step-by-step process to help you transition your existing codebase with minimal friction.

## Prerequisites

Before starting the migration, ensure you have:
- An active OpenAI API key.
- An existing project using the older Chat Completions API.
- The latest version of the official OpenAI SDK installed (Python or Node.js).

## Side-by-Side Comparison

The Responses API introduces a few core conceptual changes to simplify your code:

| Chat Completions API | Responses API |
| :--- | :--- |
| Array of `messages` | Uses `items` to represent actions and history |
| `n` parameter for multiple generations | `n` parameter removed (single generation per call) |
| Stateless by default (pass full history) | Native stateful context using `store: true` |
| Extract output from `choices[0].message` | Simplified output structure |

## Migration Steps

### Step 1: Installing the SDK & Client Setup

Ensure you are using the latest version of the OpenAI SDK.

**Python:**
```bash
pip install --upgrade openai
```

**Node.js:**
```bash
npm install openai@latest
```

Your client initialization remains the same:
```python
from openai import OpenAI
client = OpenAI()
```

### Step 2: Modifying a Basic API Call

The structure of the request and response has been streamlined. Here is how a basic text generation call changes.

**Before (Chat Completions API):**
```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is the capital of France?"}
    ]
)

print(response.choices[0].message.content)
```

*Sample Response Object:*
```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The capital of France is Paris."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": { "prompt_tokens": 16, "completion_tokens": 7, "total_tokens": 23 }
}
```

**After (Responses API):**
```python
response = client.responses.create(
    model="gpt-4o",
    instructions="You are a helpful assistant.",
    items=[
        {"role": "user", "content": "What is the capital of France?"}
    ]
)

# Output structure is more direct
print(response.output_text)
```

*Sample Response Object:*
```json
{
  "id": "resp_123",
  "object": "response",
  "created_at": 1756315696,
  "model": "gpt-4o",
  "output": [
    {
      "id": "msg_123",
      "type": "message",
      "status": "completed",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "The capital of France is Paris."
        }
      ]
    }
  ]
}
```

### Step 3: Adapting for New Features

The Responses API shines when building multi-turn conversations. Instead of sending the entire conversation history back to OpenAI on every request, you can use the new `store` feature.

```python
response = client.responses.create(
    model="gpt-4o",
    instructions="You are a helpful assistant.",
    store=True, # Persists the conversation state on the server
    items=[
        {"role": "user", "content": "My name is Alice."}
    ]
)
```

### Step 4: Testing and Verification

After updating your code, verify your migration:
1. Run your basic test suite to ensure text generation outputs match expected formats.
2. Check your billing dashboard to monitor token usage—using `store: true` correctly should optimize your context window caching.
3. Test your error handling, as the structure of error responses may have slightly shifted.

## Troubleshooting & Common Pitfalls

- **Error: `n` parameter not supported:** The Responses API only generates one output per request. If your old code relied on `n=3`, you will need to execute the API call three times or handle multiple generations on the client side.
- **Missing History:** If your multi-turn chat stops remembering context, ensure you are either passing the history manually or properly utilizing `store: true` to manage state.

## Conclusion & Next Steps

Migrating to the Responses API sets your application up for the future, providing a cleaner developer experience and native access to advanced tools. For a deep dive into advanced tool calling and custom functions, visit the full [OpenAI Responses API Documentation](https://platform.openai.com/docs).
