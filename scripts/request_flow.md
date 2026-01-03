# Request Flow

This explains how frontend, backend, and AI logic interact.

## Flow Diagram

```
User (Frontend)
   |
   v
REST API (Backend)
   |
   v
AI/Logic Layer
   |
   v
Response (Checklist)
```

## Steps
1. User submits compliance request
2. Frontend sends REST API request with token
3. Backend authenticates and processes request
4. AI/Logic layer matches action to rules
5. Backend returns checklist to frontend
6. User views/downloads checklist

---
Timestamp: 2025-12-29 (UTC)
