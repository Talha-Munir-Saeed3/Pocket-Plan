**POCKET PLAN**

Personal Finance Management Mobile Application

**Epics Register \| Team CPS**

This document lists all epics across the ten product themes for Pocket
Plan. Each entry includes the epic\'s ID, title, description, business
value, associated theme, and the user stories that fall under it and
which were taught in class.

**Epic Index**

  -----------------------------------------------------------------------------
  **Epic ID** **Theme**   **Epic Title**                        **User
                                                                Stories**
  ----------- ----------- ------------------------------------- ---------------
  **E1.1**    T1          User Registration & Sign-Up           US-001, US-002,
                                                                US-003

  **E1.2**    T1          User Sign-In & Authentication         US-004, US-005

  **E1.3**    T1          Google Sign-In                        US-006

  **E1.4**    T1          Password Reset & Recovery             US-007

  **E1.5**    T1          Sign-Out & Session Management         US-008

  **E2.1**    T2          Add / Edit / Delete Transactions      US-009, US-010,
                                                                US-011, US-012

  **E2.2**    T2          Transaction Categorization            US-013, US-014

  **E2.3**    T2          Recurring Transactions                US-015

  **E2.4**    T2          Borrow & Lend Logging                 US-016, US-017

  **E2.5**    T2          Transaction Notes                     US-018

  **E3.1**    T3          Monthly Budget Setup                  US-019, US-020

  **E3.2**    T3          Category-Specific Budget Management   US-021, US-022

  **E3.3**    T3          Real-Time Budget Tracking             US-023

  **E3.4**    T3          Budget Carry-Forward                  US-024

  **E4.1**    T4          Dashboard Overview                    US-025

  **E4.2**    T4          Spending Breakdown & Visual Charts    US-026, US-027

  **E4.3**    T4          Savings Trend Reporting               US-028

  **E4.4**    T4          Report Export                         US-029, US-030

  **E4.5**    T4          Transaction History & Filtering       US-031, US-032,
                                                                US-033

  **E5.1**    T5          Asset Management                      US-034, US-035

  **E5.2**    T5          Liability Management                  US-036, US-037

  **E5.3**    T5          Net Worth Calculation & Display       US-038

  **E6.1**    T6          Personalized Saving Advice            US-039

  **E6.2**    T6          Overspending Detection & Alerts       US-040

  **E6.3**    T6          Budget Adjustment Suggestions         US-041

  **E6.4**    T6          Natural Language Transaction Input    US-042

  **E7.1**    T7          Daily Transaction Logging Reminders   US-043, US-044

  **E7.2**    T7          Monthly Savings Goal Progress         US-045, US-046
                          Notifications                         

  **E8.1**    T8          App Lock (PIN & Biometrics)           US-047, US-048

  **E8.2**    T8          Balance Visibility Controls           US-049

  **E8.3**    T8          Data Encryption                       US-050

  **E8.4**    T8          Privacy Policy                        US-051

  **E9.1**    T9          Premium Feature Access Control        US-052, US-053

  **E9.2**    T9          Subscription Management               US-054, US-055

  **E9.3**    T9          Advanced Exports (Premium)            US-056

  **E9.4**    T9          Priority Chatbot Access (Premium)     US-057

  **E10.1**   T10         Profile Management                    US-058

  **E10.2**   T10         Colour Theme Selection                US-059, US-060

  **E10.3**   T10         Notification Preference Controls      US-061

  **E10.4**   T10         Account Management & Deletion         US-062
  -----------------------------------------------------------------------------

**T1 Identity & Access Management**

  -------------------------------------------------------------------------
  **E1.1**   **User Registration & Sign-Up**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Covers the full sign-up flow for new users creating an  |
| cription** | account with email and password.                        |
+============+=========================================================+
| **Business | Every user starts here. A smooth registration flow is   |
| Value**    | the first thing a user experiences and directly affects |
|            | whether they continue using the app.                    |
+------------+---------------------------------------------------------+
| **Theme**  | T1 --- Identity & Access Management                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-001** Create account with email & password     |
| Stories**  |                                                         |
|            | -   **US-002** View password while typing               |
|            |                                                         |
|            | -   **US-003** See validation errors on sign-up form    |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E1.2**   **User Sign-In & Authentication**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Handles returning users logging in with email/password  |
| cription** | credentials.                                            |
+============+=========================================================+
| **Business | Returning users need fast, reliable access. Any         |
| Value**    | friction here risks users abandoning the app.           |
+------------+---------------------------------------------------------+
| **Theme**  | T1 --- Identity & Access Management                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-004** Sign in with email and password          |
| Stories**  |                                                         |
|            | -   **US-005** Stay signed in between sessions          |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E1.3**   **Google Sign-In**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to authenticate using their Google account |
| cription** | via OAuth.                                              |
+============+=========================================================+
| **Business | Reduces sign-up and login friction for users who prefer |
| Value**    | not to manage a separate password.                      |
+------------+---------------------------------------------------------+
| **Theme**  | T1 --- Identity & Access Management                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-006** Sign up and sign in with Google          |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E1.4**   **Password Reset & Recovery**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to reset a forgotten password via email.   |
| cription** |                                                         |
+============+=========================================================+
| **Business | Prevents permanent account loss due to forgotten        |
| Value**    | passwords, reducing support burden and user drop-off.   |
+------------+---------------------------------------------------------+
| **Theme**  | T1 --- Identity & Access Management                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-007** Request a password reset email           |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E1.5**   **Sign-Out & Session Management**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Covers the ability to sign out and manage active        |
| cription** | sessions.                                               |
+============+=========================================================+
| **Business | Users need clear control over when their session ends,  |
| Value**    | especially on shared devices.                           |
+------------+---------------------------------------------------------+
| **Theme**  | T1 --- Identity & Access Management                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-008** Sign out of the app                      |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

**T2 Financial Tracking & Transaction Management**

  -------------------------------------------------------------------------
  **E2.1**   **Add / Edit / Delete Transactions**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Core CRUD operations for income and expense             |
| cription** | transactions.                                           |
+============+=========================================================+
| **Business | The primary daily action users take in the app. Speed   |
| Value**    | and reliability here directly determines daily active   |
|            | usage.                                                  |
+------------+---------------------------------------------------------+
| **Theme**  | T2 --- Financial Tracking & Transaction Management      |
+------------+---------------------------------------------------------+
| **User     | -   **US-009** Add a new transaction                    |
| Stories**  |                                                         |
|            | -   **US-010** Edit an existing transaction             |
|            |                                                         |
|            | -   **US-011** Delete a transaction                     |
|            |                                                         |
|            | -   **US-012** Add a transaction using the Quick Add    |
|            |     > button                                            |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E2.2**   **Transaction Categorization**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to assign categories to transactions for   |
| cription** | tracking and reporting purposes.                        |
+============+=========================================================+
| **Business | Categories are what make reports meaningful. Without    |
| Value**    | them, users cannot understand their spending patterns.  |
+------------+---------------------------------------------------------+
| **Theme**  | T2 --- Financial Tracking & Transaction Management      |
+------------+---------------------------------------------------------+
| **User     | -   **US-013** Assign a category to a transaction       |
| Stories**  |                                                         |
|            | -   **US-014** Create a custom category                 |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E2.3**   **Recurring Transactions**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to set up transactions that repeat         |
| cription** | automatically on a schedule.                            |
+============+=========================================================+
| **Business | Reduces daily logging effort for fixed expenses like    |
| Value**    | rent or subscriptions, improving data completeness.     |
+------------+---------------------------------------------------------+
| **Theme**  | T2 --- Financial Tracking & Transaction Management      |
+------------+---------------------------------------------------------+
| **User     | -   **US-015** Set a transaction to repeat on a         |
| Stories**  |     > schedule                                          |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E2.4**   **Borrow & Lend Logging**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to record money they have borrowed from or |
| cription** | lent to other people.                                   |
+============+=========================================================+
| **Business | A core need for the student segment --- one of the      |
| Value**    | primary target audiences. Tracking informal             |
|            | transactions helps users maintain accurate personal     |
|            | balances.                                               |
+------------+---------------------------------------------------------+
| **Theme**  | T2 --- Financial Tracking & Transaction Management      |
+------------+---------------------------------------------------------+
| **User     | -   **US-016** Log money borrowed or lent               |
| Stories**  |                                                         |
|            | -   **US-017** Mark a borrow or lend entry as settled   |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E2.5**   **Transaction Notes**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to attach a short note or description to   |
| cription** | any transaction.                                        |
+============+=========================================================+
| **Business | Notes give users context for transactions they may not  |
| Value**    | remember weeks later, improving the usefulness of       |
|            | transaction history.                                    |
+------------+---------------------------------------------------------+
| **Theme**  | T2 --- Financial Tracking & Transaction Management      |
+------------+---------------------------------------------------------+
| **User     | -   **US-018** Add a note to a transaction              |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

**T3 Budget Planning & Control**

  -------------------------------------------------------------------------
  **E3.1**   **Monthly Budget Setup**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to define a total spending budget for the  |
| cription** | current month.                                          |
+============+=========================================================+
| **Business | Setting a monthly budget is the first step toward       |
| Value**    | financial discipline. Users who set budgets have a      |
|            | reason to check the app regularly.                      |
+------------+---------------------------------------------------------+
| **Theme**  | T3 --- Budget Planning & Control                        |
+------------+---------------------------------------------------------+
| **User     | -   **US-019** Set a monthly spending budget            |
| Stories**  |                                                         |
|            | -   **US-020** Edit the monthly budget                  |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E3.2**   **Category-Specific Budget Management**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to set individual spending limits for each |
| cription** | transaction category.                                   |
+============+=========================================================+
| **Business | Category budgets give users granular control over where |
| Value**    | their money goes, making the app more useful than a     |
|            | single total limit.                                     |
+------------+---------------------------------------------------------+
| **Theme**  | T3 --- Budget Planning & Control                        |
+------------+---------------------------------------------------------+
| **User     | -   **US-021** Set a budget for a specific category     |
| Stories**  |                                                         |
|            | -   **US-022** See a warning when approaching a         |
|            |     > category budget limit                             |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E3.3**   **Real-Time Budget Tracking**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Shows users how much of their budget has been used as   |
| cription** | transactions are logged.                                |
+============+=========================================================+
| **Business | Without live feedback, a budget is just a number.       |
| Value**    | Real-time tracking makes it actionable.                 |
+------------+---------------------------------------------------------+
| **Theme**  | T3 --- Budget Planning & Control                        |
+------------+---------------------------------------------------------+
| **User     | -   **US-023** View remaining budget in real time       |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E3.4**   **Budget Carry-Forward**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows unused budget from one month to roll over into   |
| cription** | the next.                                               |
+============+=========================================================+
| **Business | Rewards users who stay under budget by giving unused    |
| Value**    | amounts continued value, encouraging consistent use.    |
+------------+---------------------------------------------------------+
| **Theme**  | T3 --- Budget Planning & Control                        |
+------------+---------------------------------------------------------+
| **User     | -   **US-024** Carry unused budget to the next month    |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

**T4 Financial Insights & Reporting**

  -------------------------------------------------------------------------
  **E4.1**   **Dashboard Overview**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | The main screen users see after logging in --- showing  |
| cription** | key financial metrics at a glance.                      |
+============+=========================================================+
| **Business | The dashboard is the most-visited screen. A clear,      |
| Value**    | accurate overview determines whether users feel the app |
|            | is useful on any given day.                             |
+------------+---------------------------------------------------------+
| **Theme**  | T4 --- Financial Insights & Reporting                   |
+------------+---------------------------------------------------------+
| **User     | -   **US-025** View financial summary on the dashboard  |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E4.2**   **Spending Breakdown & Visual Charts**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Provides charts that show how spending is distributed   |
| cription** | across categories.                                      |
+============+=========================================================+
| **Business | Visual breakdowns help users identify patterns they     |
| Value**    | would not notice by scanning a list of numbers.         |
+------------+---------------------------------------------------------+
| **Theme**  | T4 --- Financial Insights & Reporting                   |
+------------+---------------------------------------------------------+
| **User     | -   **US-026** View spending breakdown by category      |
| Stories**  |                                                         |
|            | -   **US-027** View income vs. expense bar chart        |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E4.3**   **Savings Trend Reporting**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Shows how the user\'s savings have changed over time.   |
| cription** |                                                         |
+============+=========================================================+
| **Business | Progress visibility motivates continued saving          |
| Value**    | behaviour. Seeing an upward trend reinforces positive   |
|            | financial habits.                                       |
+------------+---------------------------------------------------------+
| **Theme**  | T4 --- Financial Insights & Reporting                   |
+------------+---------------------------------------------------------+
| **User     | -   **US-028** View savings trend over time             |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E4.4**   **Report Export**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to export their financial data as a PDF or |
| cription** | CSV file.                                               |
+============+=========================================================+
| **Business | Some users need records outside the app for tax         |
| Value**    | purposes, personal filing, or sharing. Export adds      |
|            | lasting utility to the data already in the app.         |
+------------+---------------------------------------------------------+
| **Theme**  | T4 --- Financial Insights & Reporting                   |
+------------+---------------------------------------------------------+
| **User     | -   **US-029** Export financial report as PDF           |
| Stories**  |                                                         |
|            | -   **US-030** Export transactions as CSV               |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E4.5**   **Transaction History & Filtering**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | A full list of all past transactions with search and    |
| cription** | filter capabilities.                                    |
+============+=========================================================+
| **Business | Users need to find specific transactions when reviewing |
| Value**    | spending. Filtering by date, category, or type makes    |
|            | large histories manageable.                             |
+------------+---------------------------------------------------------+
| **Theme**  | T4 --- Financial Insights & Reporting                   |
+------------+---------------------------------------------------------+
| **User     | -   **US-031** View full transaction history            |
| Stories**  |                                                         |
|            | -   **US-032** Filter transactions by date, category,   |
|            |     > or type                                           |
|            |                                                         |
|            | -   **US-033** Search transactions by keyword           |
+------------+---------------------------------------------------------+

**T5 Assets, Liabilities & Net Worth**

  -------------------------------------------------------------------------
  **E5.1**   **Asset Management**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to log and manage assets such as savings   |
| cription** | accounts or valuables.                                  |
+============+=========================================================+
| **Business | Assets give users a fuller picture of what they own,    |
| Value**    | making net worth tracking possible.                     |
+------------+---------------------------------------------------------+
| **Theme**  | T5 --- Assets, Liabilities & Net Worth                  |
+------------+---------------------------------------------------------+
| **User     | -   **US-034** Add an asset                             |
| Stories**  |                                                         |
|            | -   **US-035** Edit or delete an asset                  |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E5.2**   **Liability Management**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to log debts and liabilities such as       |
| cription** | loans.                                                  |
+============+=========================================================+
| **Business | Liabilities are as important as assets for              |
| Value**    | understanding true financial health. Without them, net  |
|            | worth would be misleading.                              |
+------------+---------------------------------------------------------+
| **Theme**  | T5 --- Assets, Liabilities & Net Worth                  |
+------------+---------------------------------------------------------+
| **User     | -   **US-036** Add a liability                          |
| Stories**  |                                                         |
|            | -   **US-037** Edit or delete a liability               |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E5.3**   **Net Worth Calculation & Display**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Calculates and displays the user\'s net worth based on  |
| cription** | their logged assets and liabilities.                    |
+============+=========================================================+
| **Business | Net worth is the single most useful number for          |
| Value**    | understanding overall financial position. Displaying it |
|            | clearly gives users a meaningful benchmark to track     |
|            | over time.                                              |
+------------+---------------------------------------------------------+
| **Theme**  | T5 --- Assets, Liabilities & Net Worth                  |
+------------+---------------------------------------------------------+
| **User     | -   **US-038** View my net worth                        |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

**T6 AI-Powered Chatbot Assistant**

  -------------------------------------------------------------------------
  **E6.1**   **Personalized Saving Advice**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | The chatbot provides saving tips tailored to the        |
| cription** | user\'s actual spending data.                           |
+============+=========================================================+
| **Business | Generic advice is easy to ignore. Advice based on the   |
| Value**    | user\'s own numbers is harder to dismiss and more       |
|            | likely to result in behaviour change.                   |
+------------+---------------------------------------------------------+
| **Theme**  | T6 --- AI-Powered Chatbot Assistant                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-039** Receive saving tips based on my spending |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E6.2**   **Overspending Detection & Alerts**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | The chatbot identifies categories where the user is     |
| cription** | spending more than usual or over budget.                |
+============+=========================================================+
| **Business | Users may not notice gradual overspending. Proactive    |
| Value**    | detection gives them a chance to course-correct before  |
|            | the month ends.                                         |
+------------+---------------------------------------------------------+
| **Theme**  | T6 --- AI-Powered Chatbot Assistant                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-040** Get alerted by the chatbot about         |
| Stories**  |     > overspending                                      |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E6.3**   **Budget Adjustment Suggestions**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | The chatbot suggests budget changes based on the        |
| cription** | user\'s spending patterns.                              |
+============+=========================================================+
| **Business | Users often set budgets without enough context.         |
| Value**    | Suggestions based on real data help them set budgets    |
|            | that are realistic and useful.                          |
+------------+---------------------------------------------------------+
| **Theme**  | T6 --- AI-Powered Chatbot Assistant                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-041** Get chatbot suggestions for adjusting my |
| Stories**  |     > budget                                            |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E6.4**   **Natural Language Transaction Input**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to log a transaction by typing a plain     |
| cription** | English sentence to the chatbot.                        |
+============+=========================================================+
| **Business | Reduces the effort required to log a transaction,       |
| Value**    | particularly for users who find form-filling tedious.   |
|            | Lower friction means more consistent logging.           |
+------------+---------------------------------------------------------+
| **Theme**  | T6 --- AI-Powered Chatbot Assistant                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-042** Log a transaction by typing a message to |
| Stories**  |     > the chatbot                                       |
+------------+---------------------------------------------------------+

**T7 Notifications & Reminders**

  -------------------------------------------------------------------------
  **E7.1**   **Daily Transaction Logging Reminders**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Sends a push notification reminding users to log their  |
| cription** | transactions for the day.                               |
+============+=========================================================+
| **Business | Consistent logging depends on habit formation. A daily  |
| Value**    | reminder reduces the chance of users forgetting and     |
|            | ending up with incomplete records.                      |
+------------+---------------------------------------------------------+
| **Theme**  | T7 --- Notifications & Reminders                        |
+------------+---------------------------------------------------------+
| **User     | -   **US-043** Receive a daily reminder to log          |
| Stories**  |     > transactions                                      |
|            |                                                         |
|            | -   **US-044** Set the time for my daily reminder       |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E7.2**   **Monthly Savings Goal Progress Notifications**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Notifies users about their progress toward their        |
| cription** | monthly savings goal.                                   |
+============+=========================================================+
| **Business | Progress updates keep users engaged with their goals    |
| Value**    | without requiring them to open the app. Milestone       |
|            | notifications reinforce positive saving behaviour.      |
+------------+---------------------------------------------------------+
| **Theme**  | T7 --- Notifications & Reminders                        |
+------------+---------------------------------------------------------+
| **User     | -   **US-045** Receive a notification when I hit a      |
| Stories**  |     > savings milestone                                 |
|            |                                                         |
|            | -   **US-046** Receive a mid-month savings progress     |
|            |     > update                                            |
+------------+---------------------------------------------------------+

**T8 Privacy, Security & Data Protection**

  -------------------------------------------------------------------------
  **E8.1**   **App Lock (PIN & Biometrics)**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Locks the app when not in use and requires PIN or       |
| cription** | biometric authentication to re-enter.                   |
+============+=========================================================+
| **Business | Financial data is sensitive. App lock prevents          |
| Value**    | unauthorized access if a device is picked up by someone |
|            | else.                                                   |
+------------+---------------------------------------------------------+
| **Theme**  | T8 --- Privacy, Security & Data Protection              |
+------------+---------------------------------------------------------+
| **User     | -   **US-047** Enable app lock with PIN                 |
| Stories**  |                                                         |
|            | -   **US-048** Enable app lock with biometrics          |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E8.2**   **Balance Visibility Controls**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to hide all monetary values on the         |
| cription** | dashboard with a single toggle.                         |
+============+=========================================================+
| **Business | Users in public settings may not want their balances    |
| Value**    | visible. A quick hide option gives them control without |
|            | leaving the app.                                        |
+------------+---------------------------------------------------------+
| **Theme**  | T8 --- Privacy, Security & Data Protection              |
+------------+---------------------------------------------------------+
| **User     | -   **US-049** Hide my balance on the dashboard         |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E8.3**   **Data Encryption**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Ensures all user financial data is encrypted in transit |
| cription** | and at rest.                                            |
+============+=========================================================+
| **Business | Non-negotiable for any app handling financial data.     |
| Value**    | Encryption protects users from data exposure in the     |
|            | event of a breach.                                      |
+------------+---------------------------------------------------------+
| **Theme**  | T8 --- Privacy, Security & Data Protection              |
+------------+---------------------------------------------------------+
| **User     | -   **US-050** Have my data stored securely             |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E8.4**   **Privacy Policy**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | An in-app screen that displays Pocket Plan\'s privacy   |
| cription** | policy.                                                 |
+============+=========================================================+
| **Business | Required for trust and compliance. Users should be able |
| Value**    | to understand how their data is used from within the    |
|            | app.                                                    |
+------------+---------------------------------------------------------+
| **Theme**  | T8 --- Privacy, Security & Data Protection              |
+------------+---------------------------------------------------------+
| **User     | -   **US-051** View the privacy policy in the app       |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

**T9 Premium Subscription & Monetization**

  -------------------------------------------------------------------------
  **E9.1**   **Premium Feature Access Control**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Controls which features are available to free users vs. |
| cription** | premium subscribers.                                    |
+============+=========================================================+
| **Business | Clear feature gating gives free users a reason to       |
| Value**    | upgrade and ensures premium subscribers receive         |
|            | distinct value.                                         |
+------------+---------------------------------------------------------+
| **Theme**  | T9 --- Premium Subscription & Monetization              |
+------------+---------------------------------------------------------+
| **User     | -   **US-052** See which features require premium       |
| Stories**  |                                                         |
|            | -   **US-053** Access extended transaction history as a |
|            |     > premium user                                      |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E9.2**   **Subscription Management**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Covers the in-app flow for subscribing to and managing  |
| cription** | a premium plan.                                         |
+============+=========================================================+
| **Business | A clear and functional subscription flow is necessary   |
| Value**    | for the app to generate revenue.                        |
+------------+---------------------------------------------------------+
| **Theme**  | T9 --- Premium Subscription & Monetization              |
+------------+---------------------------------------------------------+
| **User     | -   **US-054** Subscribe to the premium plan            |
| Stories**  |                                                         |
|            | -   **US-055** View and manage my subscription          |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E9.3**   **Advanced Exports (Premium)**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Provides premium users with additional export options   |
| cription** | and formatting.                                         |
+============+=========================================================+
| **Business | Advanced exports are a clear premium differentiator for |
| Value**    | users such as freelancers and young professionals who   |
|            | need detailed financial records.                        |
+------------+---------------------------------------------------------+
| **Theme**  | T9 --- Premium Subscription & Monetization              |
+------------+---------------------------------------------------------+
| **User     | -   **US-056** Export a detailed report as a premium    |
| Stories**  |     > user                                              |
+------------+---------------------------------------------------------+

  -------------------------------------------------------------------------
  **E9.4**   **Priority Chatbot Access (Premium)**
  ---------- --------------------------------------------------------------

  -------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Premium users receive a higher chatbot usage allowance. |
| cription** |                                                         |
+============+=========================================================+
| **Business | The chatbot is a key engagement feature. Offering more  |
| Value**    | credits to premium users creates a tangible incentive   |
|            | to upgrade.                                             |
+------------+---------------------------------------------------------+
| **Theme**  | T9 --- Premium Subscription & Monetization              |
+------------+---------------------------------------------------------+
| **User     | -   **US-057** Get more chatbot credits as a premium    |
| Stories**  |     > user                                              |
+------------+---------------------------------------------------------+

**T10 Settings & User Preferences**

  --------------------------------------------------------------------------
  **E10.1**   **Profile Management**
  ----------- --------------------------------------------------------------

  --------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to view and edit their personal profile    |
| cription** | information.                                            |
+============+=========================================================+
| **Business | Users need to be able to keep their account details     |
| Value**    | accurate. Basic profile management is expected in any   |
|            | account-based app.                                      |
+------------+---------------------------------------------------------+
| **Theme**  | T10 --- Settings & User Preferences                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-058** View and edit my profile                 |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

  --------------------------------------------------------------------------
  **E10.2**   **Colour Theme Selection**
  ----------- --------------------------------------------------------------

  --------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to switch between light and dark mode, or  |
| cription** | choose an accent colour theme.                          |
+============+=========================================================+
| **Business | Personalization increases comfort and perceived         |
| Value**    | quality. Theme control is a small but meaningful        |
|            | feature that improves daily usability.                  |
+------------+---------------------------------------------------------+
| **Theme**  | T10 --- Settings & User Preferences                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-059** Switch between light and dark mode       |
| Stories**  |                                                         |
|            | -   **US-060** Choose an app colour theme               |
+------------+---------------------------------------------------------+

  --------------------------------------------------------------------------
  **E10.3**   **Notification Preference Controls**
  ----------- --------------------------------------------------------------

  --------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to control which notifications they        |
| cription** | receive from the app.                                   |
+============+=========================================================+
| **Business | Forcing all notifications on all users leads to them    |
| Value**    | being turned off entirely. Giving control reduces       |
|            | notification fatigue and keeps alerts meaningful.       |
+------------+---------------------------------------------------------+
| **Theme**  | T10 --- Settings & User Preferences                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-061** Enable or disable specific notifications |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+

  --------------------------------------------------------------------------
  **E10.4**   **Account Management & Deletion**
  ----------- --------------------------------------------------------------

  --------------------------------------------------------------------------

+------------+---------------------------------------------------------+
| **Des      | Allows users to delete their account and all associated |
| cription** | data from Pocket Plan.                                  |
+============+=========================================================+
| **Business | Account deletion is a trust signal. Users are more      |
| Value**    | willing to share data when they know they can remove it |
|            | completely.                                             |
+------------+---------------------------------------------------------+
| **Theme**  | T10 --- Settings & User Preferences                     |
+------------+---------------------------------------------------------+
| **User     | -   **US-062** Delete my account and all my data        |
| Stories**  |                                                         |
+------------+---------------------------------------------------------+
