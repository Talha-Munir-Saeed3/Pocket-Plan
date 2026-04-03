from app.models.emoji_reference import ACCOUNT_ICON_EMOJIS, EXPENSE_CATEGORY_EMOJIS
from app.models.pocket_plan_schema import ExpenseCategory


def test_account_icon_emoji_mapping_complete() -> None:
    assert set(ACCOUNT_ICON_EMOJIS.keys()) == {1, 2, 3, 4, 5}


def test_expense_category_emoji_mapping_matches_schema() -> None:
    expected_categories = {category.value for category in ExpenseCategory}
    assert set(EXPENSE_CATEGORY_EMOJIS.keys()) == expected_categories
