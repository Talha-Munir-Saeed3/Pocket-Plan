# Pocket Plan — Savings & Budget Logic

**Team CPS · Sprint 0 · v1.0**

---

## Core Concept

Budget and Savings are two completely separate buckets. They do not automatically touch each other.

```
Budget  = your spending plan   "I will spend max PKR 75,000 this month"
Savings = your keep pile       "I want to keep PKR 12,000 this month"
```

They both come from the same income but they are tracked independently.

---

## 1. End of Month — What Happens

**Budget resets to zero on the 1st of every month.**

- April's spent amount is gone, fresh start
- May needs a new allocation

**Savings does NOT reset.**

- PKR 42,500 saved in April stays as PKR 42,500
- May's savings adds on top of it
- It grows like a running total across months

### Optional Carry Forward Setting

> Not implemented yet — planned as a future settings option

| Setting                     | Behaviour                                                             |
| --------------------------- | --------------------------------------------------------------------- |
| Carry forward OFF (default) | Unspent budget disappears at month end. Next month starts fresh.      |
| Carry forward ON            | Unspent budget automatically moves into savings balance at month end. |

**Example:**

```
User spent PKR 60,000 out of PKR 75,000 budget
Unspent = PKR 15,000

Carry forward OFF → PKR 15,000 gone, May budget starts at PKR 75,000
Carry forward ON  → PKR 15,000 moves to savings, May budget still PKR 75,000
```

---

## 2. If User Spends from Savings

This is a **withdrawal** from the goal. Think of it like a piggy bank.

```
Goal: New Laptop
Saved so far: PKR 42,500

User withdraws PKR 10,000

New saved balance: PKR 32,500
Progress drops:    28% → 22%
ETA recalculates:  immediately based on new balance
```

### Rules

- Deduct only the used amount from goal saved balance
- Recalculate progress and ETA immediately after withdrawal
- Log the withdrawal as a transaction of type `savings_withdrawal`
- Goal does not disappear or reset to zero
- Full history of withdrawals is kept per goal

---

## 3. If User Deletes a Goal

**Never hard delete.** Think of it like an archive.

### Goal Status Values

| Status        | Meaning                             |
| ------------- | ----------------------------------- |
| `in_progress` | Currently active, ETA running       |
| `achieved`    | Hit 100%, marked with achieved date |
| `cancelled`   | User manually deleted / closed it   |
| `archived`    | User paused it without deleting     |

### Rules

- All statuses are kept in Goals History
- User can see their full goal journey at any time
- AI chatbot can reference past goals for personalised advice
  - e.g. _"You achieved your New Laptop goal in 9 months last year — want to set a new one?"_

---

## 4. If Goal is Achieved

```
Saved balance reaches PKR 150,000 (100%)

→ App marks goal as Achieved
→ Records the achieved date
→ Stops ETA calculation
→ Shows a celebration state (confetti / milestone screen)
→ Moves goal to Completed Goals list
```

### Important

The money does not disappear. PKR 150,000 remains in their savings balance.
Achieving the goal just means the **tracking is done**.
What the user does with the money is their choice:

- Buy the item
- Start a new goal
- Leave it in savings

---

## 5. How ETA Works — Dynamic Calculation

### Formula

```
ETA = Remaining Amount ÷ Monthly Saving Rate
      rounded up to the nearest full month
```

### Example

```
Target:          PKR 150,000
Saved so far:    PKR 42,500
Remaining:       PKR 107,500
Monthly saving:  PKR 12,000

ETA = 107,500 ÷ 12,000 = 8.96 → rounds up to 9 months
```

### ETA Recalculates Automatically When

- User receives income (savings goes up → ETA drops)
- User withdraws from savings (ETA goes up)
- User changes their monthly saving target
- End of month calculation runs
- User adds or deletes a transaction

### Edge Cases

| Situation             | ETA Behaviour                              |
| --------------------- | ------------------------------------------ |
| Monthly saving = 0    | ETA shows as "—" or "Set a monthly target" |
| Goal already achieved | ETA stops, shows achieved date instead     |
| Goal cancelled        | ETA stops                                  |
| Saving rate increased | ETA drops immediately                      |
| Saving rate decreased | ETA increases immediately                  |

---

## 6. Budget vs Savings — The Relationship

```
Income comes in           PKR 85,000
Budget takes its share  - PKR 75,000   (spending plan)
What is actually left   = PKR 10,000   (real savings this month)

User set a savings goal of PKR 12,000/month

Gap = PKR 12,000 (target) - PKR 10,000 (actual) = PKR 2,000 behind
```

The **savings goal** is a target.
The **actual savings** is what really happened based on transactions.
The **gap between the two** is what the AI chatbot uses to give advice.

> _"You planned to save PKR 12,000 this month but you are on track for PKR 10,000. Here are 3 ways to close the gap."_

---

## 7. Summary Table

| Scenario                      | What Happens                                             |
| ----------------------------- | -------------------------------------------------------- |
| Month ends                    | Budget resets, savings balance continues                 |
| Unspent budget                | Stays as unspent unless carry forward is ON              |
| Withdrawal from savings       | Deducted from goal balance, ETA recalculates immediately |
| Goal deleted                  | Archived not deleted, status = `cancelled`               |
| Goal achieved                 | Marked `achieved`, celebration shown, moves to history   |
| Monthly saving target changes | ETA recalculates immediately                             |
| No monthly saving set         | ETA shows as unknown                                     |
| Carry forward ON at month end | Unspent budget moves to savings automatically            |

---

## 8. Backend Implementation Notes

> These rules are **not yet implemented** in the backend. Currently frontend/session logic only.

### Fields needed on the `budgets` collection

- `carry_forward_enabled: Boolean` — default false
- `unspent_at_month_end: Float` — calculated on last day of month

### Fields needed on the savings goal (inside `budgets` or separate `goals` collection)

- `status: Enum` — `in_progress`, `achieved`, `cancelled`, `archived`
- `achieved_at: DateTime` — filled when status becomes `achieved`
- `monthly_saving_rate: Float` — user's target per month
- `withdrawal_history: Array` — list of withdrawals with amount and date

### ETA Calculation (backend or frontend helper)

```python
import math

def calculate_eta(remaining: float, monthly_rate: float) -> int:
    if monthly_rate <= 0:
        return None  # unknown
    return math.ceil(remaining / monthly_rate)
```

### Transaction type to add for withdrawals

```
type: "savings_withdrawal"
amount: Float
goal_id: String   → ref to the goal
date: DateTime
notes: Optional String
```

### Frontend Savings Transaction Scope

These are the savings transaction actions currently being handled in the frontend screens:

| Type                 | Status   | Notes                                                                         |
| -------------------- | -------- | ----------------------------------------------------------------------------- |
| `savings_deposit`    | Frontend | Manual deposit into a single goal                                             |
| `savings_withdrawal` | Frontend | Manual withdrawal from a single goal                                          |
| `goal_transfer`      | Frontend | Move money between two goals                                                  |
| `savings_split`      | Frontend | Split one savings plan across multiple goals in the Plan tab                  |
| `budget_to_savings`  | Deferred | Move unused budget into savings will be handled from the budget section later |

### Frontend Goal Picker Rules

- Deposit and withdrawal use one goal selector box.
- Goal transfer uses two goal selector boxes.
- Source and target goals cannot be the same.
- The target goal selector hides the currently selected source goal.
- Savings split starts with a count picker in the Plan tab, then shows one row per selected goal.
- Split percentages are capped so the total never exceeds 100%.
- Premium users can activate extra goals and then add more split rows manually.

---

_Pocket Plan · Savings & Budget Logic · Team CPS · Sprint 0 · v1.0_
