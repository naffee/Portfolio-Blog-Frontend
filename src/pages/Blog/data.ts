export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
    slug: string; // For routing to individual post (future)
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Optimizing Kafka Consumer Groups for High-Throughput Workloads',
        excerpt: 'Deep dive into partition rebalancing strategies, offset management, and how to minimize consumer lag in large-scale event-driven architectures using Go.',
        date: 'OCTOBER 24, 2026',
        readTime: '12 MIN READ',
        category: 'ARCHITECTURE',
        tags: ['distributed_systems', 'golang', 'kubernetes', 'database_internals'],
        slug: 'optimizing-kafka-consumer-groups'
    },
    {
        id: '2',
        title: 'Distributed Tracing with OpenTelemetry and Jaeger',
        excerpt: 'Lessons learned from instrumenting a polyglot microservice environment. Why spans matter more than logs and how to effectively track requests across boundaries.',
        date: 'SEPTEMBER 12, 2026',
        readTime: '8 MIN READ',
        category: 'OBSERVABILITY',
        tags: ['opentelemetry', 'microservices', 'monitoring'],
        slug: 'distributed-tracing-opentelemetry'
    },
    {
        id: '3',
        title: 'Zero-Trust Networking in Kubernetes Clusters',
        excerpt: 'Implementing mTLS with Istio and Cilium. A comprehensive guide to securing pod-to-pod communication without sacrificing performance or developer velocity.',
        date: 'AUGUST 05, 2026',
        readTime: '15 MIN READ',
        category: 'SECURITY',
        tags: ['kubernetes', 'security', 'istio'],
        slug: 'zero-trust-kubernetes'
    },
    {
        id: '4',
        title: 'PostgreSQL Performance Tuning: From Vacuum to Indexes',
        excerpt: 'Solving the N+1 query problem is just the beginning. Understanding how Postgres plans queries and how to use EXPLAIN ANALYZE to identify bottlenecks.',
        date: 'JULY 20, 2026',
        readTime: '6 MIN READ',
        category: 'DATABASES',
        tags: ['postgresql', 'sql', 'performance'],
        slug: 'postgresql-performance-tuning'
    }
];
