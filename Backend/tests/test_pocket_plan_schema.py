import pytest
from pydantic import ValidationError

from app.models.pocket_plan_schema import SavingsAction, SavingsGoal, Transaction, TransactionType


def _base_payload() -> dict:
    return {
        "user_id": "user_1",
        "account_id": "acct_1",
        "type": TransactionType.EXPENSE,
        "amount": 2000,
        "category": "food",
    }


def test_expense_requires_category() -> None:
    payload = _base_payload()
    payload["category"] = None

    with pytest.raises(ValidationError):
        Transaction(**payload)


def test_transfer_requires_to_account_id() -> None:
    payload = _base_payload()
    payload["type"] = TransactionType.TRANSFER
    payload["category"] = None

    with pytest.raises(ValidationError):
        Transaction(**payload)


def test_borrow_requires_contact_name() -> None:
    payload = _base_payload()
    payload["type"] = TransactionType.BORROW
    payload["category"] = None

    with pytest.raises(ValidationError):
        Transaction(**payload)


def test_recurring_requires_frequency() -> None:
    payload = _base_payload()
    payload["is_recurring"] = True

    with pytest.raises(ValidationError):
        Transaction(**payload)


def test_valid_income_without_category() -> None:
    payload = _base_payload()
    payload["type"] = TransactionType.INCOME
    payload["category"] = None

    trx = Transaction(**payload)
    assert trx.type == TransactionType.INCOME


def test_savings_goal_requires_positive_target_amount() -> None:
    with pytest.raises(ValidationError):
        SavingsGoal(
            user_id="user_1",
            name="Emergency Fund",
            target_amount=0,
        )


def test_savings_transaction_requires_goal_fields() -> None:
    payload = _base_payload()
    payload["type"] = TransactionType.SAVINGS
    payload["category"] = None
    payload["savings_action"] = SavingsAction.TRANSFER
    payload["savings_goal_id"] = "goal_1"

    with pytest.raises(ValidationError):
        Transaction(**payload)
