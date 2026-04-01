**POCKET PLAN**

Personal Finance Management Mobile Application

**Product Themes Document | Team CPS**

This document defines the ten product themes for Pocket Plan. Each theme groups a set of related epics around a shared area of the application. For each theme, the title, description, business value, and associated epics are provided as per taught in class.

**Theme Index**

| ID | Theme Title |
| --- | --- |
| T1 | Identity & Access Management |
| T2 | Financial Tracking & Transaction Management |
| T3 | Budget Planning & Control |
| T4 | Financial Insights & Reporting |
| T5 | Assets, Liabilities & Net Worth |
| T6 | AI-Powered Chatbot Assistant |
| T7 | Notifications & Reminders |
| T8 | Privacy, Security & Data Protection |
| T9 | Premium Subscription & Monetization |
| T10 | Settings & User Preferences |
| T1 |  |
| --- | --- |

**Identity & Access Management**

| Description | Covers how users create accounts, log in, and maintain secure access to the app. This includes email/password sign-up, Google Sign-In, password recovery, and sign-out handling. |
| --- | --- |
| Business Value | A reliable and smooth authentication flow is the entry point to everything else in the app. If users cannot get in quickly or securely, nothing else matters. This theme directly affects first-run experience and user trust. |
| Associated Epics | User Registration & Sign-UpUser Sign-In & AuthenticationPassword Reset & RecoveryGoogle Sign-In (OAuth)Sign-Out & Session Management |
| T2 |  |
| --- | --- |

**Financial Tracking & Transaction Management**

| Description | Covers the logging, editing, deletion, and categorization of financial transactions. Includes income and expense entries, recurring transactions, borrow/lend records, and the ability to attach notes to individual entries. |
| --- | --- |
| Business Value | This is what users open the app for every day. The more reliable and fast this flow is, the more consistently users will log — which improves data quality and keeps them coming back. |
| Associated Epics | Add / Edit / Delete TransactionsTransaction CategorizationRecurring TransactionsBorrow & Lend LoggingTransaction Notes & Descriptions |
| T3 |  |
| --- | --- |

**Budget Planning & Control**

| Description | Covers setting and monitoring budgets — both at a monthly level and per spending category. Includes real-time tracking against those limits and the option to carry unused budget forward to the next month. |
| --- | --- |
| Business Value | Budget management separates Pocket Plan from a basic expense log. Users who set budgets have a concrete reason to check the app regularly, which increases session frequency and long-term retention. |
| Associated Epics | Monthly Budget SetupCategory-Specific Budget ManagementReal-Time Budget TrackingBudget Carry-Forward |
| T4 |  |
| --- | --- |

**Financial Insights & Reporting**

| Description | Provides visual summaries and exportable reports of a user's financial activity. Covers the dashboard overview, spending breakdowns by category, income vs. expense charts, savings trends, and report exports in PDF or CSV format. |
| --- | --- |
| Business Value | Raw numbers mean little without context. Visual reports help users understand where their money actually goes, making the app feel useful rather than just functional. Export capability adds value for users who want records outside the app. |
| Associated Epics | Dashboard OverviewSpending Breakdown & Visual ChartsSavings Trend ReportingReport Export (PDF / CSV)Transaction History & Filtering |
| T5 |  |
| --- | --- |

**Assets, Liabilities & Net Worth**

| Description | Allows users to record their assets (savings accounts, valuables) and liabilities (loans, debts) and see their calculated net worth. Gives a broader financial snapshot beyond just day-to-day transactions. |
| --- | --- |
| Business Value | This moves Pocket Plan beyond spending tracking into a fuller financial picture. It adds meaningful depth for users who want to manage their overall financial health, not just monitor daily expenses. |
| Associated Epics | Asset ManagementLiability ManagementNet Worth Calculation & Display |
| T6 |  |
| --- | --- |

**AI-Powered Chatbot Assistant**

| Description | An in-app assistant powered by the Gemini API. It offers personalized saving tips, flags overspending based on the user's own data, suggests budget adjustments, and allows users to log transactions through natural language input. |
| --- | --- |
| Business Value | The chatbot is a key differentiator from other budgeting apps in the same space. It reduces friction in daily use and provides advice that feels relevant to the individual user rather than generic. |
| Associated Epics | Personalized Saving AdviceOverspending Detection & AlertsBudget Adjustment Suggestions via AINatural Language Transaction Input |
| T7 |  |
| --- | --- |

**Notifications & Reminders**

| Description | Handles push notifications delivered via Firebase Cloud Messaging. Covers two main use cases: reminding users to log their daily transactions, and updating them on their monthly savings goal progress. |
| --- | --- |
| Business Value | Timely reminders reduce the chance of users forgetting to log, which keeps their data accurate. Savings progress updates give users a reason to stay engaged with their goals without having to open the app first. |
| Associated Epics | Daily Transaction Logging RemindersMonthly Savings Goal Progress Notifications |
| T8 |  |
| --- | --- |

**Privacy, Security & Data Protection**

| Description | Covers the measures in place to protect user data and control access to the app. Includes PIN or biometric app lock, the option to hide account balances on the dashboard, data encryption, and an in-app privacy policy screen. |
| --- | --- |
| Business Value | Financial data is among the most sensitive information a user can store on their phone. Users need to trust the app before they'll put real numbers into it. Strong security defaults reduce both user hesitation and the risk of data exposure. |
| Associated Epics | App Lock (PIN & Biometrics)Balance Visibility ControlsData EncryptionPrivacy Policy & Compliance |
| T9 |  |
| --- | --- |

**Premium Subscription & Monetization**

| Description | Covers the premium tier offering, which includes extended transaction history access, advanced report exports, multiple budget profiles, and priority chatbot response handling. Also covers the in-app subscription management flow. |
| --- | --- |
| Business Value | This is Pocket Plan's primary revenue stream. Clear feature differentiation between free and premium gives users a concrete reason to upgrade as their usage grows. |
| Associated Epics | Premium Feature Access ControlSubscription ManagementMultiple Budget Profiles (Premium)Extended History & Advanced Exports (Premium) |
| T10 |  |
| --- | --- |

**Settings & User Preferences**

| Description | Covers all configurable options available to the user — profile information, app appearance including colour themes, notification toggles, and account management actions such as account deletion. Currency selection is planned for a future release. |
| --- | --- |
| Business Value | Giving users control over how the app looks and behaves reduces friction and makes the experience feel personalized. Account management options also ensure users are not locked in, which builds trust. |
| Associated Epics | Profile ManagementColour Theme SelectionNotification Preference ControlsAccount Management & Deletion |