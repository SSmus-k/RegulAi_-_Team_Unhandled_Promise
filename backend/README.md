# RegulAI Backend

Production-ready Django backend for RegulAI – Regulation-to-Action Engine

## Features
- Django REST Framework
- PostgreSQL-ready
- JWT authentication
- CORS enabled
- API versioning (/api/v1/)
- Modular apps: users, compliance, regulations
- Admin for regulations, rules, compliance mappings
- Seed data management commands
- Environment-based settings

## Setup

1. Clone repo
2. Copy `.env.example` to `.env` and update values
3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Seed data:
   ```bash
   python manage.py seed_users
   python manage.py seed_regulations
   ```
6. Run server:
   ```bash
   python manage.py runserver
   ```

## Environment Variables
See `.env.example` for all required variables.

## Timestamp
2025-12-29 (UTC)
