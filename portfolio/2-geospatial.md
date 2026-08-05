---
layout: portfolio
title: 'Distributed Geospatial Imaging Platform (R&D)'
from: 2015-10-01
to: 2017-01-30
environment: 'Apache Spark, Kafka, MongoDB, AWS, Ceph, Google Cloud, JNI'
keywords:
  - spark
  - s3
  - aws
  - ceph
  - kafka
  - mongodb
  - jni
  - geospatial
short_description: "Designed a proof of concept for a scalable geospatial data platform exploring efficient ingestion, processing, and serving of large-scale satellite imagery."
image: portfolio-2.png
---

Designed and implemented an R&D project focused on exploring scalable approaches for ingesting, processing, and serving large-scale geospatial imagery through a modular tile-based distributed architecture. The project investigated architectural patterns combining near real-time visualization and large-scale asynchronous processing while remaining storage- and technology-agnostic.

## Key responsibilities & achievements

- Designed a **distributed architecture** composed of loosely coupled services responsible for ingestion, processing, storage, and visualization, enabling each subsystem to evolve independently.

- Built **Apache Spark** ingestion pipelines to import and pre-process large raster datasets, generating optimized tile representations stored in object storage while maintaining dedicated metadata indexes.

- Developed scalable geospatial APIs using **Play Framework** and **Akka** to dynamically assemble and render only the data required for each request, minimizing storage access, network transfers, and computation overhead.

- Engineered the platform for scalability, resilience, and performance through:
  - Distributed ingestion and parallel processing based on a **Kappa architecture** using **Kafka** and **MongoDB**,
  - Incremental dataset validation,
  - Tailor made tile-based storage using S3-compatible **object stores** (AWS S3, Ceph) and Google Cloud Storage,
  - Asynchronous processing and multi-level caching (Redis, LevelDB),
  - Low-latency access patterns suitable for interactive geospatial visualization.

- Developed reusable libraries for geospatial algorithms, image processing, rendering, and workflow orchestration, enabling reuse across REST services, distributed Spark jobs, and batch processing pipelines.

- Integrated high-performance native C++ image-processing components through custom **JVM bindings**, combining native execution performance with the JVM ecosystem.

- Validated architectural patterns for modular geospatial data platforms, enabling independent evolution of ingestion, processing, storage, and visualization components while sharing common data models, APIs, and infrastructure.
