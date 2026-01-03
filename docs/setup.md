# Setup Instructions

## Backend
1. Install Python & PostgreSQL
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

## Frontend
1. Install Node.js
2. Copy `.env.example` to `.env.local` and update values
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run development server:
   ```bash
   npm run dev
   ```

---
Timestamp: 2025-12-29 (UTC)
