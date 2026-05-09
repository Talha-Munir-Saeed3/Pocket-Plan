from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class AuthProvider(str, Enum):
    EMAIL = "email"
    GOOGLE = "google"


class AccountType(str, Enum):
    PERSONAL = "personal"
    TRAVEL = "travel"
    BUSINESS = "business"
    SAVINGS = "savings"
    OTHER = "other"


class TransactionType(str, Enum):
    EXPENSE = "expense"
    INCOME = "income"
    TRANSFER = "transfer"
    BORROW = "borrow"
    LEND = "lend"
    SAVINGS = "savings"


class SavingsAction(str, Enum):
    DEPOSIT = "savings_deposit"
    WITHDRAWAL = "savings_withdrawal"
    TRANSFER = "goal_transfer"


class RecurringFrequency(str, Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"


class Theme(str, Enum):
    DEFAULT = "default"


class Language(str, Enum):
    EN = "en"


class SubscriptionPlan(str, Enum):
    FREE = "free"
    MONTHLY = "monthly"
    YEARLY = "yearly"


class SubscriptionStatus(str, Enum):
    ACTIVE = "active"
    CANCELLED = "cancelled"
    EXPIRED = "expired"


class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"


class ExpenseCategory(str, Enum):
    FOOD = "food"
    TRANSPORT = "transport"
    SHOPPING = "shopping"
    RENT = "rent"
    HEALTH = "health"
    ENTERTAINMENT = "entertainment"
    EDUCATION = "education"
    UTILITIES = "utilities"
    TRAVEL = "travel"
    BUSINESS = "business"
    PERSONAL_CARE = "personal_care"
    CLOTHING = "clothing"
    GROCERIES = "groceries"
    SUBSCRIPTIONS = "subscriptions"
    CHARITY = "charity"
    REPAIRS = "repairs"
    INSURANCE = "insurance"
    TAXES = "taxes"
    GIFTS = "gifts"
    SPORTS = "sports"
    EQUIPMENT = "equipment"
    EVENTS = "events"
    OTHER = "other"


class MongoDocumentModel(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, use_enum_values=True)


class TimestampedModel(MongoDocumentModel):
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)


class User(TimestampedModel):
    full_name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    hashed_password: str = Field(min_length=20)
    is_active: bool = True
    is_verified: bool = False
    google_id: str | None = None
    auth_provider: AuthProvider = AuthProvider.EMAIL


class UserProfile(TimestampedModel):
    user_id: str = Field(min_length=1)
    avatar: int = Field(default=1, ge=1, le=3)
    monthly_income: float | None = Field(default=None, ge=0)


class UserPreferences(TimestampedModel):
    user_id: str = Field(min_length=1)
    currency: str = Field(default="PKR", min_length=3, max_length=3)
    theme: Theme = Theme.DEFAULT
    language: Language = Language.EN
    goal_progress_alerts: bool = True
    monthly_summary: bool = True
    daily_reminder: bool = True
    hide_balance: bool = False


class Account(TimestampedModel):
    user_id: str = Field(min_length=1)
    name: str = Field(min_length=1, max_length=80)
    type: AccountType
    account_icon: int = Field(default=1, ge=1, le=5)
    color: str | None = Field(default=None, pattern=r"^#(?:[0-9a-fA-F]{3}){1,2}$")
    is_default: bool = False
    is_premium_account: bool = False
    balance: float = 0.0
    currency: str = Field(default="PKR", min_length=3, max_length=3)
    is_active: bool = True


class Transaction(TimestampedModel):
    user_id: str = Field(min_length=1)
    account_id: str = Field(min_length=1)
    type: TransactionType
    amount: float = Field(gt=0)
    currency: str = Field(default="PKR", min_length=3, max_length=3)
    category: ExpenseCategory | None = None
    description: str | None = None
    notes: str | None = None
    date: datetime = Field(default_factory=utc_now)
    to_account_id: str | None = None
    contact_name: str | None = None
    is_recurring: bool = False
    recurring_frequency: RecurringFrequency | None = None
    parent_transaction_id: str | None = None
    savings_action: SavingsAction | None = None
    savings_goal_id: str | None = None
    target_goal_id: str | None = None

    @model_validator(mode="after")
    def validate_type_specific_fields(self) -> Transaction:
        if self.type == TransactionType.EXPENSE and self.category is None:
            raise ValueError("category is required for expense transactions")

        if self.type != TransactionType.EXPENSE and self.category is not None:
            raise ValueError("category must be null for non-expense transactions")

        if self.type == TransactionType.TRANSFER and not self.to_account_id:
            raise ValueError("to_account_id is required for transfer transactions")

        if self.type in {TransactionType.BORROW, TransactionType.LEND} and not self.contact_name:
            raise ValueError("contact_name is required for borrow/lend transactions")

        if self.is_recurring and self.recurring_frequency is None:
            raise ValueError("recurring_frequency is required when is_recurring is true")

        if not self.is_recurring and self.recurring_frequency is not None:
            raise ValueError("recurring_frequency must be null when is_recurring is false")

        if self.type == TransactionType.SAVINGS:
            if self.savings_action is None:
                raise ValueError("savings_action is required for savings transactions")
            if not self.savings_goal_id:
                raise ValueError("savings_goal_id is required for savings transactions")
            if self.savings_action == SavingsAction.TRANSFER and not self.target_goal_id:
                raise ValueError("target_goal_id is required for savings transfer transactions")
            if self.savings_action != SavingsAction.TRANSFER and self.target_goal_id is not None:
                raise ValueError("target_goal_id must be null unless savings_action is goal_transfer")

        if self.type != TransactionType.SAVINGS and (self.savings_action is not None or self.savings_goal_id is not None or self.target_goal_id is not None):
            raise ValueError("savings fields are only valid for savings transactions")

        return self


class CategoryLimit(MongoDocumentModel):
    category: ExpenseCategory
    limit: float = Field(gt=0)
    spent: float = Field(default=0.0, ge=0)
    alert_sent: bool = False


class Budget(TimestampedModel):
    user_id: str = Field(min_length=1)
    account_id: str = Field(min_length=1)
    month: int = Field(ge=1, le=12)
    year: int = Field(ge=2000, le=2100)
    total_budget: float = Field(gt=0)
    total_spent: float = Field(default=0.0, ge=0)
    savings_goal: float | None = Field(default=None, ge=0)
    savings_current: float = 0.0
    category_limits: list[CategoryLimit] = Field(default_factory=list)


class ChatMessage(MongoDocumentModel):
    role: MessageRole
    content: str = Field(min_length=1)
    timestamp: datetime = Field(default_factory=utc_now)


class ChatHistory(TimestampedModel):
    user_id: str = Field(min_length=1)
    account_id: str | None = None
    messages: list[ChatMessage] = Field(default_factory=list)


class Subscription(MongoDocumentModel):
    user_id: str = Field(min_length=1)
    plan: SubscriptionPlan = SubscriptionPlan.FREE
    status: SubscriptionStatus = SubscriptionStatus.ACTIVE
    started_at: datetime = Field(default_factory=utc_now)
    expires_at: datetime | None = None
    revenuecat_id: str | None = None


class SavingsGoal(TimestampedModel):
    user_id: str = Field(min_length=1)
    account_id: str | None = None
    name: str = Field(min_length=1, max_length=120)
    target_amount: float = Field(gt=0)
    current_amount: float = Field(default=0.0, ge=0)
    monthly_contribution: float = Field(default=0.0, ge=0)
    target_date: datetime | None = None
    is_primary: bool = False
    is_active: bool = True


class SavingsGoalUpdate(MongoDocumentModel):
    account_id: str | None = None
    name: str | None = Field(default=None, min_length=1, max_length=120)
    target_amount: float | None = Field(default=None, gt=0)
    current_amount: float | None = Field(default=None, ge=0)
    monthly_contribution: float | None = Field(default=None, ge=0)
    target_date: datetime | None = None
    is_primary: bool | None = None
    is_active: bool | None = None
