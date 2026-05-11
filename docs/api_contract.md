# RegulAI API Contract

## Authentication
- POST `/api/v1/auth/token/` (username, password)
- POST `/api/v1/auth/token/refresh/`

## Users
- GET/POST `/api/v1/users/`

## Compliance
- GET/POST `/api/v1/compliance/`

## Regulations
- GET/POST `/api/v1/regulations/`
- GET/POST `/api/v1/regulations/rules/`

## All endpoints require Bearer JWT token

## Timestamp
2025-12-29 (UTC)
