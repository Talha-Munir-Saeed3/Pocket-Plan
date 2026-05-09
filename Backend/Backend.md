# Backend API And Frontend Mapping

This file lists the currently implemented backend APIs and maps the active frontend payloads to backend schema fields.

## Implemented APIs

### Health

- `GET /health`
  - Response: `{ "status": "ok" }`
- `GET /health/db`
  - Response `200`: `{ "status": "ok", "database": "connected" }`
  - Response `503`: `{ "status": "error", "database": "disconnected", "detail": "..." }`

### Transactions

- `POST /transactions`
  - Request model: `Transaction`
  - Required: `user_id`, `account_id`, `type`, `amount`
  - Conditional:
    - `category` required only when `type=expense`
    - `to_account_id` required when `type=transfer`
    - `contact_name` required when `type=borrow|lend`
    - `savings_action` + `savings_goal_id` required when `type=savings`
    - `target_goal_id` required when `savings_action=goal_transfer`
- `GET /transactions?user_id=...&limit=...&skip=...`
- `GET /transactions/recent?user_id=...&limit=...`
- `GET /transactions/history?user_id=...&months=...`

### Budgets

- `POST /budgets`
  - Request model: `Budget`
  - Upsert key: `user_id + account_id + month + year`
- `GET /budgets?user_id=...`
- `GET /budgets/current?user_id=...&account_id=...&month=...&year=...`

### Savings Goals

- `POST /savings-goals`
  - Request model: `SavingsGoal`
- `GET /savings-goals?user_id=...`
- `PATCH /savings-goals/{goal_id}`
  - Request model: `SavingsGoalUpdate`
  - `goal_id` must be a Mongo ObjectId (24 hex chars)

### Reports

- `GET /reports/summary?user_id=...&month=...&year=...`
  - Response includes: period, totals, transaction_count, category_breakdown, recent_transactions, budget

## Frontend To Backend Field Mapping

### Add Transaction Screen (`Frontend/src/screens/transactions/addTransactionScreen.jsx`)

- Frontend payload -> Backend `Transaction`
  - `user_id` -> `user_id`
  - `account_id` -> `account_id`
  - `type` -> `type`
  - `amount` -> `amount`
  - `currency` -> `currency`
  - `category` -> `category` (only when expense)
  - `title` -> `description`
  - `description` -> `notes`
  - `date` -> `date`
  - `to_account_id` -> `to_account_id` (transfer only)
  - `contact_name` -> `contact_name` (borrow/lend only)
  - `is_recurring` -> `is_recurring`
  - `recurring_frequency` -> `recurring_frequency`
  - `parent_transaction_id` -> `parent_transaction_id`
  - `savings_action` -> `savings_action` (savings only)
  - `savings_goal_id` -> `savings_goal_id` (savings only)
  - `target_goal_id` -> `target_goal_id` (goal transfer only)

### Budget Screen (`Frontend/src/screens/budget/budgetScreen.jsx`)

- Frontend payload -> Backend `Budget`
  - `user_id` -> `user_id`
  - `account_id` -> `account_id`
  - `month` -> `month`
  - `year` -> `year`
  - `total_budget` -> `total_budget`
  - `total_spent` -> `total_spent`
  - `savings_goal` -> `savings_goal`
  - `savings_current` -> `savings_current`
  - `category_limits[]` -> `category_limits[]`

### Savings Goal Screen (`Frontend/src/screens/savings/savingsGoalScreen.jsx`)

- Frontend payload -> Backend `SavingsGoal` / `SavingsGoalUpdate`
  - `user_id` -> `user_id`
  - `account_id` -> `account_id`
  - `name` -> `name`
  - `target_amount` -> `target_amount`
  - `current_amount` -> `current_amount`
  - `monthly_contribution` -> `monthly_contribution`
  - `target_date` -> `target_date`
  - `is_primary` -> `is_primary`
  - `is_active` -> `is_active`

## Models Present In Backend But Not Yet Exposed As API

The following models exist in `pocket_plan_schema.py` but currently have no active router endpoints in this project state:

- `User`
- `UserProfile`
- `UserPreferences`
- `Account`
- `ChatHistory`
- `Subscription`

These are future-ready and intentionally not required by current mobile screens until their routes/auth flow are introduced.
