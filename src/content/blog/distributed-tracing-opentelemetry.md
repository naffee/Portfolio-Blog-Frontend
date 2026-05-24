---
title: Distributed Tracing with OpenTelemetry and Jaeger
date: 2026-09-12
readTime: 8 MIN READ
category: OBSERVABILITY
tags: [opentelemetry, microservices, monitoring]
slug: distributed-tracing-opentelemetry
thumbnail: https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=1000
excerpt: Lessons learned from instrumenting a polyglot microservice environment. Why spans matter more than logs and how to effectively track requests across boundaries.
---

When a request travels through 15 microservices across a Kubernetes cluster, local application logs are no longer sufficient to troubleshoot failures. An error in a downstream payment gateway might propagate as a generic `500 Internal Server Error` to the gateway API. Identifying the exact failure point requires tracing requests across networks.

This is where **Distributed Tracing** and **OpenTelemetry (OTel)** become essential. Let's look at the implementation details and real-world lessons from instrumenting a polyglot service mesh.

## Logs vs. Metrics vs. Spans

Logs tell you *what* happened in a single process, and metrics tell you *how much* resource it consumed. But **Spans** capture the parent-child relationship of calls across networks. They represent the unit of work in a trace.

An OpenTelemetry trace is a Directed Acyclic Graph (DAG) of spans. The primary task when tracing is **Context Propagation**: inject the Trace Context header into external client calls and extract it in the receiving services.

## W3C Trace Context Standard

OpenTelemetry utilizes the **W3C Trace Context** HTTP headers by default:
- `traceparent`: `00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`
  - `4bf92f3577b34da6a3ce929d0e0e4736` is the Trace ID.
  - `00f067aa0ba902b7` is the Parent Span ID.
  - `01` represents tracing options (enabled/disabled).

Let's look at how to instrument an HTTP middleware in Go to extract trace context from inbound requests.

## Implementation: Inbound HTTP Middleware

```go
package observability

import (
	"net/http"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/propagation"
	semconv "go.opentelemetry.io/otel/semconv/v1.4.0"
	"go.opentelemetry.io/otel/trace"
)

func TracingMiddleware(next http.Handler) http.Handler {
	propagator := otel.GetTextMapPropagator()
	tracer := otel.Tracer("http-server")

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 1. Extract context from inbound headers
		ctx := propagator.Extract(r.Context(), propagation.HeaderCarrier(r.Header))

		// 2. Start a new span with the extracted context as parent
		ctx, span := tracer.Start(ctx, r.URL.Path,
			trace.WithSpanKind(trace.SpanKindServer),
			trace.WithAttributes(semconv.HTTPTargetKey.String(r.URL.Path)),
		)
		defer span.End()

		// 3. Pass trace context down the request context
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}
```

## Configuring the Jaeger Exporter

Once spans are generated, they must be batched and exported to a collector. The OpenTelemetry Collector receives the spans and pushes them to your storage/visualization backends like **Jaeger**.

Here is a typical OTel configuration block for a Jaeger exporter:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:
    timeout: 1s
    send_batch_size: 1024

exporters:
  otlp/jaeger:
    endpoint: "jaeger-collector.monitoring.svc.cluster.local:4317"
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp/jaeger]
```

## Summary of Lessons Learned

1. **Avoid Over-instrumentation**: Do not start a new span for every helper function. Focus on network boundaries, database queries, and significant business logic.
2. **Standardize Attribute Tags**: Use OpenTelemetry Semantic Conventions (e.g., `http.status_code`, `db.system`) so that visualization dashboards can correctly index spans.
3. **Propagate Context in Goroutines**: If you spawn background routines, remember to pass the tracing `context.Context` object, otherwise trace graphs will break.
