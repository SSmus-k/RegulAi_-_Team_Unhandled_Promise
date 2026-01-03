# How RegulAI Works

RegulAI is an AI-powered compliance platform for SMEs in Nepal. It converts complex legal and tax regulations into clear, actionable steps.

## Flow Diagram

```
+-------------------+
|   User Interface  |
+-------------------+
          |
          v
+-------------------+
|  REST API (Django)|
+-------------------+
          |
          v
+-------------------+
|  AI/Logic Layer   |
+-------------------+
          |
          v
+-------------------+
|  Compliance Steps |
+-------------------+
```

## Steps
1. User registers/logs in
2. User selects business type and action
3. System matches action to regulations
4. Returns compliance checklist, approvals, deadlines, sources
5. User downloads checklist as PDF

---
Timestamp: 2025-12-29 (UTC)
