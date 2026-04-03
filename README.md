# Pocket Plan

This repository uses a simple SaaS-oriented structure:

- Frontend/ - UI application (currently active workstream)
- Frontend-Admin/ - admin portal frontend for support, payments, and payment-status operations
- Backend/ - API and server-side logic
- Documents/ - architecture, decisions, and security notes
- AI Integration/ - prompts, eval assets, and AI-related artifacts

## Environment Files

- Each app keeps its own `.env.example` file with placeholders.
- Real `.env` files contain secrets and must never be committed.

Copy the relevant app-level template to `.env` when needed:

- `Backend/.env.example` -> `Backend/.env`
- `Frontend/.env.example` -> `Frontend/.env` (if/when needed)
- `Frontend-Admin/.env.example` -> `Frontend-Admin/.env` (if/when needed)

## Current Focus

Frontend is now an Expo Router mobile app with a feature-grouped src structure.

## Run Frontend

1. Open terminal in Frontend.
2. Install dependencies if needed.
3. Start Expo in tunnel mode.

```bash
cd Frontend
npm install
npx expo start --tunnel
```

## Axios And Security Audit

- Axios is managed in Frontend/package.json and should be kept updated.
- Run npm audit inside the Frontend folder to check dependency vulnerabilities.
- Current moderate audit findings are from Vite/esbuild tooling, not Axios.
