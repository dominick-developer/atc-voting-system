# ATC Online Voting System

Electronic Student Election Management Platform for Arusha Technical College (ATC).

Supports SOATECO General Elections and Class Leadership Elections with:
- Dual student data integration (ATC API + Excel/CSV import)
- Hybrid on-campus voting (>=50 dedicated computers + smartphones in 100m geofence)
- Anonymous ballots with strict identity/ballot separation
- Automated tallying with Commission declaration
- Tamper-evident audit logging
- Complaints, notifications, observer portal

## Quick Start

    npm install
    Copy-Item .env.example .env
    docker compose up -d
    npm run db:api:generate
    npm run db:api:migrate
    npm run db:voting:generate
    npm run db:voting:migrate
    npm run dev

- Web:      http://localhost:3000
- API:      http://localhost:4000/api
- Voting:   http://localhost:4100
- API Docs: http://localhost:4000/api/docs

## Security

Do not deploy for a real election until independent security review,
procedure approval and acceptance testing are complete.
