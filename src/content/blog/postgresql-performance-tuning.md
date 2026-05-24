---
title: "PostgreSQL Performance Tuning: From Vacuum to Indexes"
date: 2026-07-20
readTime: 6 MIN READ
category: DATABASES
tags: [postgresql, sql, performance]
slug: postgresql-performance-tuning
thumbnail: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000
excerpt: Solving the N+1 query problem is just the beginning. Understanding how Postgres plans queries and how to use EXPLAIN ANALYZE to identify bottlenecks.
---

When developing application backends, solving the N+1 query problem with ORMs is typically the first optimization step. However, as tables grow to tens of millions of rows, database-level tuning becomes critical.

To write fast queries, developers must understand PostgreSQL internals, execution plans, index utilization, and how the **autovacuum** process prevents table bloat.

## Reading execution plans with EXPLAIN ANALYZE

To diagnose query performance, append `EXPLAIN (ANALYZE, BUFFERS)` to your SQL query. The `ANALYZE` flag executes the query and prints actual execution times alongside estimations, while the `BUFFERS` flag shows cache hits and disk reads.

Consider a simple query scanning users:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE status = 'pending' AND created_at > '2026-01-01';
```

The output might reveal a **Seq Scan** (Sequential Scan):

```text
Seq Scan on orders  (cost=0.00..3421.00 rows=154 width=244) (actual time=0.012..85.431 rows=162 loops=1)
  Filter: ((status = 'pending'::text) AND (created_at > '2026-01-01 00:00:00'::timestamp))
  Rows Removed by Filter: 154823
  Buffers: shared read=2311
```

A Sequential Scan means PostgreSQL read the entire table from disk because no appropriate index was available or the query planner decided scanning was faster than indexing.

## Creating Multi-Column (Composite) Indexes

To speed up the query above, we can create an index. But should we create single indexes on both columns, or a single composite index?
Generally, a **Composite Index** is superior for queries with multiple `AND` filters.

```sql
CREATE INDEX idx_orders_status_created ON orders (status, created_at);
```

When building a composite index, order matters:
1. Put fields queried with equality (`=`) filters first (e.g., `status`).
2. Put fields queried with range (`>`, `<`, `BETWEEN`) filters last (e.g., `created_at`).

Running the `EXPLAIN` query again will show an **Index Scan**:

```text
Index Scan using idx_orders_status_created on orders  (cost=0.43..22.45 rows=154 width=244) (actual time=0.021..1.104 rows=162 loops=1)
  Index Cond: ((status = 'pending'::text) AND (created_at > '2026-01-01 00:00:00'::timestamp))
  Buffers: shared hit=8
```

Notice the buffers block: `shared hit=8` instead of `shared read=2311`. This means Postgres fetched only 8 pages from the memory cache instead of reading 2311 pages from disk!

## The Role of Autovacuum and MVCC

PostgreSQL uses Multi-Version Concurrency Control (MVCC) to support concurrent transactions. When you run an `UPDATE` or `DELETE`, Postgres doesn't overwrite or delete the row on disk immediately. Instead, it marks the old row as "dead" (a tuple stub) and writes a new row elsewhere.

Over time, these dead rows lead to **table bloat**, increasing table size and slowing down sequential scans.

The **VACUUM** command cleans up these dead tuples, making the disk space reusable. PostgreSQL runs an automated daemon called **Autovacuum** to perform this. Under heavy write workloads, you should tune your autovacuum parameters to trigger vacuuming more aggressively:

```sql
-- Custom table settings for high-write tables
ALTER TABLE orders SET (
    autovacuum_vacuum_scale_factor = 0.05, -- Trigger vacuum when 5% of rows change
    autovacuum_vacuum_threshold = 1000     -- Minimum changed rows threshold
);
```

By adjusting threshold parameters, you ensure that dead rows are cleaned up promptly, preventing the tables from bloating and maintaining consistent index traversal times.
