# Pocket Plan

This repository uses a simple SaaS-oriented structure:

- Frontend/ - UI application (currently active workstream)
- Frontend-Admin/ - admin portal frontend for support, payments, and payment-status operations
- Backend/ - API and server-side logic
- Documents/ - architecture, decisions, and security notes
- AI Integration/ - prompts, eval assets, and AI-related artifacts

## Environment Files

- `.env.example` contains placeholder keys and is safe to commit.
- `.env` contains real secrets and must never be committed.

Copy `.env.example` to `.env` and fill real values when needed.

## Current Focus

Frontend setup is initialized with React + TypeScript + Vite and Axios through a dedicated service layer.

## Axios And Security Audit

- Axios is managed in Frontend/package.json and should be kept updated.
- Run npm audit inside the Frontend folder to check dependency vulnerabilities.
- Current moderate audit findings are from Vite/esbuild tooling, not Axios.
