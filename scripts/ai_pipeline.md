# AI Pipeline Overview

RegulAI uses an NLP and rule-based engine to parse regulations and generate compliance steps.

## Flow Diagram

```
+-------------------+
| Regulation Source |
+-------------------+
          |
          v
+-------------------+
|   NLP Parser      |
+-------------------+
          |
          v
+-------------------+
| Rule Engine       |
+-------------------+
          |
          v
+-------------------+
| Compliance Output |
+-------------------+
```

## Explanation
- Regulations are parsed (PDF/text)
- NLP extracts key requirements
- Rule engine matches business actions to regulations
- Output is a checklist with steps, deadlines, approvals

---
Timestamp: 2025-12-29 (UTC)
