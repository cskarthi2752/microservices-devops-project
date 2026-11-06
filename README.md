# Microservices DevOps Project

## Project Overview
A microservices application with containerized deployment,
centralized monitoring, metrics collection and alert management.

## Technology Stack
- Docker
- Docker Compose
- Prometheus
- Grafana
- Alertmanager
- Node Exporter
- Git and GitHub

## Microservices
- User Service
- Product Service
- Order Service

## Monitoring Architecture
- Prometheus collects application and system metrics.
- Node Exporter exposes system metrics.
- Alert rules monitor service availability, CPU and memory.
- Alertmanager handles notification routing.
- Grafana provides monitoring dashboards.

## Validation Results
- Prometheus targets: 5/5 UP
- Alert rules: 3 loaded and healthy
- Alertmanager: Healthy
- Grafana: Healthy
- Docker Compose configuration: Valid
- Git working tree: Clean

## Alert Notification
Gmail delivery is not yet verified.

## Conclusion
The microservices deployment and monitoring stack
have passed the reported health and configuration checks.

## Architecture Diagram

``mermaid
flowchart TD
    A[Microservices Application] --> B[User Service]
    A --> C[Product Service]
    A --> D[Order Service]
    B --> E[Prometheus]
    C --> E
    D --> E
    F[Node Exporter] --> E
    E --> G[Alert Rules]
    G --> H[Alertmanager]
    H --> I[Gmail Notifications]
    E --> J[Grafana Dashboard]
