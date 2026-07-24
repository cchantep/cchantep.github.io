---
layout: portfolio
title: 'Unified Data Platform for Supply Chain & Product Information Management'
from: 02-2017
to: 10-2017
environment: 'Kafka, Akka, Scala, Cassandra, Elasticsearch, ELK Stack, MongoDB, REST APIs, Distributed Systems, Event-Driven Architecture'
short_description: "Designed and evolved a unified data platform for supply chain and product information management, consolidating data from multiple retail brands and countries."
image: portfolio-3.png
---

Designed and evolved a unified data platform for supply chain and product information management, consolidating data from multiple retail brands and countries into a consistent domain model. The platform integrates product catalogs, point-of-sale inventory, marketplace information, and enterprise PIM systems such as Akeneo and Mirakl through a unified API layer for downstream applications and services.

## Key responsibilities and achievements

- Designed and implemented a distributed event-driven with **Kappa architecture**, enabling continuous synchronization and transformation of business data across heterogeneous source systems

- Built Kafka-based streaming pipelines with **Akka** services to ingest, process, and transform product, inventory, and commercial data into optimized read models

- Designed a unified API layer exposing consistent access to business data independently of underlying source systems, simplifying integration for downstream applications

- Optimized platform scalability, reliability, and performance to support daily synchronization of all points of sale within a strict four-hour overnight processing window, including:
  - Performance optimization and endurance testing
  - Continuous monitoring and operational diagnostics
  - Metrics collection and observability through the **ELK stack**
  - Production reliability improvements under sustained high throughput

- Managed and optimized distributed data stores operated by the engineering team, including **Cassandra** and **Elasticsearch**, with focus on:
  - Database tuning and capacity planning
  - Performance optimization and reliability improvements
  - Collaboration with infrastructure teams on production operations
  - Evaluation of MongoDB for specific data access patterns

- Contributed to technical leadership within a cross-functional squad, collaborating with software engineers, infrastructure specialists, and product owners on architecture decisions, technical trade-offs, and platform evolution

- Established modular architecture principles allowing ingestion, synchronization, storage, and data exposure capabilities to evolve independently while sharing common data models and operational standards
