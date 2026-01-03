# RegulAI Architecture

## Overview
RegulAI is a monorepo with Django backend and Next.js frontend. The backend exposes a REST API consumed by the frontend dashboard.

## Structure
```
regulai/
├── backend/      # Django backend
├── frontend/     # Next.js frontend
├── scripts/      # System explanations
├── docs/         # Architecture & API docs
├── docker/       # Deployment
└── README.md
```

## Components
- **Backend:** Django REST, JWT, PostgreSQL, modular apps
- **Frontend:** Next.js, TypeScript, Tailwind CSS, dashboard UI
- **AI Layer:** NLP + rule engine (extensible)

---
Timestamp: 2025-12-29 (UTC)
