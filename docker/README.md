# RegulAI Docker Deployment Guide

## Prerequisites
- Docker and Docker Compose installed

## Steps

1. Copy and update environment files:
   - backend/.env.example → backend/.env
   - frontend/uifor/.env.example → frontend/uifor/.env.local

2. Build and start all services:
   ```bash
   docker-compose -f docker/docker-compose.yml up --build
   ```

3. The following services will be available:
   - Backend API: http://localhost:8000
   - Frontend: http://localhost:3000
   - PostgreSQL: localhost:5432

4. To run Django migrations and seed data:
   ```bash
   docker-compose -f docker/docker-compose.yml exec backend python manage.py migrate
   docker-compose -f docker/docker-compose.yml exec backend python manage.py seed_users
   docker-compose -f docker/docker-compose.yml exec backend python manage.py seed_regulations
   ```

5. To stop services:
   ```bash
   docker-compose -f docker/docker-compose.yml down
   ```

---
Timestamp: 2025-12-29 (UTC)
