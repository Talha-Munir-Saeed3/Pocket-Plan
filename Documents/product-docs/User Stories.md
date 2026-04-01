**POCKET PLAN**

Personal Finance Management Mobile Application

**User Stories & Acceptance Criteria | Team CPS**

This document contains all user stories and their acceptance criteria for Pocket Plan, organized by theme and epic. Each user story follows the standard format: As a \[user\], I want \[goal\], so that \[reason\]. Acceptance criteria define the conditions that must be met for the story to be considered complete.

**User Story Index**

| Story ID | Epic ID | Theme | Title |
| --- | --- | --- | --- |
| US-001 | E1.1 | T1 | Create account with email & password |
| US-002 | E1.1 | T1 | View password while typing |
| US-003 | E1.1 | T1 | See validation errors on sign-up form |
| US-004 | E1.2 | T1 | Sign in with email and password |
| US-005 | E1.2 | T1 | Stay signed in between sessions |
| US-006 | E1.3 | T1 | Sign up and sign in with Google |
| US-007 | E1.4 | T1 | Request a password reset email |
| US-008 | E1.5 | T1 | Sign out of the app |
| US-009 | E2.1 | T2 | Add a new transaction |
| US-010 | E2.1 | T2 | Edit an existing transaction |
| US-011 | E2.1 | T2 | Delete a transaction |
| US-012 | E2.1 | T2 | Add a transaction using the Quick Add button |
| US-013 | E2.2 | T2 | Assign a category to a transaction |
| US-014 | E2.2 | T2 | Create a custom category |
| US-015 | E2.3 | T2 | Set a transaction to repeat on a schedule |
| US-016 | E2.4 | T2 | Log money borrowed or lent |
| US-017 | E2.4 | T2 | Mark a borrow or lend entry as settled |
| US-018 | E2.5 | T2 | Add a note to a transaction |
| US-019 | E3.1 | T3 | Set a monthly spending budget |
| US-020 | E3.1 | T3 | Edit the monthly budget |
| US-021 | E3.2 | T3 | Set a budget for a specific category |
| US-022 | E3.2 | T3 | See a warning when approaching a category budget limit |
| US-023 | E3.3 | T3 | View remaining budget in real time |
| US-024 | E3.4 | T3 | Carry unused budget to the next month |
| US-025 | E4.1 | T4 | View financial summary on the dashboard |
| US-026 | E4.2 | T4 | View spending breakdown by category |
| US-027 | E4.2 | T4 | View income vs. expense bar chart |
| US-028 | E4.3 | T4 | View savings trend over time |
| US-029 | E4.4 | T4 | Export financial report as PDF |
| US-030 | E4.4 | T4 | Export transactions as CSV |
| US-031 | E4.5 | T4 | View full transaction history |
| US-032 | E4.5 | T4 | Filter transactions by date, category, or type |
| US-033 | E4.5 | T4 | Search transactions by keyword |
| US-034 | E5.1 | T5 | Add an asset |
| US-035 | E5.1 | T5 | Edit or delete an asset |
| US-036 | E5.2 | T5 | Add a liability |
| US-037 | E5.2 | T5 | Edit or delete a liability |
| US-038 | E5.3 | T5 | View my net worth |
| US-039 | E6.1 | T6 | Receive saving tips based on my spending |
| US-040 | E6.2 | T6 | Get alerted by the chatbot about overspending |
| US-041 | E6.3 | T6 | Get chatbot suggestions for adjusting my budget |
| US-042 | E6.4 | T6 | Log a transaction by typing a message to the chatbot |
| US-043 | E7.1 | T7 | Receive a daily reminder to log transactions |
| US-044 | E7.1 | T7 | Set the time for my daily reminder |
| US-045 | E7.2 | T7 | Receive a notification when I hit a savings milestone |
| US-046 | E7.2 | T7 | Receive a mid-month savings progress update |
| US-047 | E8.1 | T8 | Enable app lock with PIN |
| US-048 | E8.1 | T8 | Enable app lock with biometrics |
| US-049 | E8.2 | T8 | Hide my balance on the dashboard |
| US-050 | E8.3 | T8 | Have my data stored securely |
| US-051 | E8.4 | T8 | View the privacy policy in the app |
| US-052 | E9.1 | T9 | See which features require premium |
| US-053 | E9.1 | T9 | Access extended transaction history as a premium user |
| US-054 | E9.2 | T9 | Subscribe to the premium plan |
| US-055 | E9.2 | T9 | View and manage my subscription |
| US-056 | E9.3 | T9 | Export a detailed report as a premium user |
| US-057 | E9.4 | T9 | Get more chatbot credits as a premium user |
| US-058 | E10.1 | T10 | View and edit my profile |
| US-059 | E10.2 | T10 | Switch between light and dark mode |
| US-060 | E10.2 | T10 | Choose an app colour theme |
| US-061 | E10.3 | T10 | Enable or disable specific notifications |
| US-062 | E10.4 | T10 | Delete my account and all my data |

**T1 Identity & Access Management**

| E1.1 | User Registration & Sign-Up |
| --- | --- |
| US-001 | Create account with email & password |
| --- | --- |
| User Story | As a new user, I want to create an account using my email and password so that I can access Pocket Plan. |
| --- | --- |
| Epic | E1.1 — User Registration & Sign-Up |
| AcceptanceCriteria | Sign-up form accepts name, email, and passwordPassword must be at least 8 characters with one numberDuplicate email shows a clear error messageOn success, user is redirected to the dashboardVerification email is sent after registration |
| US-002 | View password while typing |
| --- | --- |
| User Story | As a new user, I want to toggle password visibility during sign-up so that I can confirm I have typed it correctly. |
| --- | --- |
| Epic | E1.1 — User Registration & Sign-Up |
| AcceptanceCriteria | Eye icon toggles password between hidden and visibleToggle works on both password and confirm password fields |
| US-003 | See validation errors on sign-up form |
| --- | --- |
| User Story | As a new user, I want to see inline validation errors on the sign-up form so that I know exactly what to fix. |
| --- | --- |
| Epic | E1.1 — User Registration & Sign-Up |
| AcceptanceCriteria | Errors appear below each field on submitEmpty fields show 'This field is required'Invalid email format shows 'Enter a valid email address' |
| E1.2 | User Sign-In & Authentication |
| --- | --- |
| US-004 | Sign in with email and password |
| --- | --- |
| User Story | As a returning user, I want to sign in with my email and password so that I can access my financial data. |
| --- | --- |
| Epic | E1.2 — User Sign-In & Authentication |
| AcceptanceCriteria | Login form accepts email and passwordWrong credentials show 'Incorrect email or password'Successful login redirects to dashboardSession persists until user signs out |
| US-005 | Stay signed in between sessions |
| --- | --- |
| User Story | As a returning user, I want to remain signed in when I reopen the app so that I do not have to log in every time. |
| --- | --- |
| Epic | E1.2 — User Sign-In & Authentication |
| AcceptanceCriteria | App restores session on relaunch if not signed outSession only clears on explicit sign-out or account deletion |
| E1.3 | Google Sign-In |
| --- | --- |
| US-006 | Sign up and sign in with Google |
| --- | --- |
| User Story | As a user, I want to sign in using my Google account so that I can access the app without creating a separate password. |
| --- | --- |
| Epic | E1.3 — Google Sign-In |
| AcceptanceCriteria | Google Sign-In button is visible on both sign-up and sign-in screensTapping it opens the Google OAuth flowOn success, user account is created or matched in FirebaseUser is redirected to dashboard after authentication |
| E1.4 | Password Reset & Recovery |
| --- | --- |
| US-007 | Request a password reset email |
| --- | --- |
| User Story | As a user who has forgotten my password, I want to receive a reset link by email so that I can regain access to my account. |
| --- | --- |
| Epic | E1.4 — Password Reset & Recovery |
| AcceptanceCriteria | 'Forgot password?' link is visible on sign-in screenUser enters their email and receives a reset linkInvalid or unregistered email shows appropriate messageReset link expires after 24 hours |
| E1.5 | Sign-Out & Session Management |
| --- | --- |
| US-008 | Sign out of the app |
| --- | --- |
| User Story | As a signed-in user, I want to sign out so that my account is not accessible to others using my device. |
| --- | --- |
| Epic | E1.5 — Sign-Out & Session Management |
| AcceptanceCriteria | Sign-out option is available in settingsSigning out clears session and redirects to sign-in screenAll locally cached data is cleared on sign-out |

**T2 Financial Tracking & Transaction Management**

| E2.1 | Add / Edit / Delete Transactions |
| --- | --- |
| US-009 | Add a new transaction |
| --- | --- |
| User Story | As a user, I want to add a transaction by entering the amount, category, type, and date so that my financial record stays up to date. |
| --- | --- |
| Epic | E2.1 — Add / Edit / Delete Transactions |
| AcceptanceCriteria | Form includes amount, type (income/expense), category, date, and optional notesTransaction is saved and appears in history immediatelyDate defaults to today but can be changedAmount field only accepts valid numeric input |
| US-010 | Edit an existing transaction |
| --- | --- |
| User Story | As a user, I want to edit a transaction I have already logged so that I can correct any mistakes. |
| --- | --- |
| Epic | E2.1 — Add / Edit / Delete Transactions |
| AcceptanceCriteria | Edit option is accessible from transaction detail and history listAll fields are pre-filled with existing valuesChanges are saved and reflected in reports immediately |
| US-011 | Delete a transaction |
| --- | --- |
| User Story | As a user, I want to delete a transaction so that I can remove entries that were logged by mistake. |
| --- | --- |
| Epic | E2.1 — Add / Edit / Delete Transactions |
| AcceptanceCriteria | Delete option is available on the transaction detail screenConfirmation prompt appears before deletionTransaction is permanently removed and totals update immediately |
| US-012 | Add a transaction using the Quick Add button |
| --- | --- |
| User Story | As a user, I want to log a transaction quickly from the dashboard so that I do not have to navigate through multiple screens. |
| --- | --- |
| Epic | E2.1 — Add / Edit / Delete Transactions |
| AcceptanceCriteria | Quick Add button is visible on the dashboardOpens a simplified form with required fields onlyTransaction is saved and dashboard totals update |
| E2.2 | Transaction Categorization |
| --- | --- |
| US-013 | Assign a category to a transaction |
| --- | --- |
| User Story | As a user, I want to assign a category to each transaction so that my spending is organized by type. |
| --- | --- |
| Epic | E2.2 — Transaction Categorization |
| AcceptanceCriteria | Category selector is shown when adding or editing a transactionDefault categories include Food, Transport, Rent, Shopping, Health, Entertainment, OtherSelected category is saved with the transaction |
| US-014 | Create a custom category |
| --- | --- |
| User Story | As a user, I want to create my own spending category so that I can track expenses that do not fit the defaults. |
| --- | --- |
| Epic | E2.2 — Transaction Categorization |
| AcceptanceCriteria | Option to add a custom category is available in the category selectorCustom category name must be unique and non-emptyCustom categories appear alongside default ones |
| E2.3 | Recurring Transactions |
| --- | --- |
| US-015 | Set a transaction to repeat on a schedule |
| --- | --- |
| User Story | As a user, I want to mark a transaction as recurring so that it is automatically logged without manual entry each time. |
| --- | --- |
| Epic | E2.3 — Recurring Transactions |
| AcceptanceCriteria | Recurring option is available on the add/edit transaction formUser can select frequency: daily, weekly, or monthlyRecurring transactions auto-generate on their scheduled dateUser can cancel a recurring transaction at any time |
| E2.4 | Borrow & Lend Logging |
| --- | --- |
| US-016 | Log money borrowed or lent |
| --- | --- |
| User Story | As a user, I want to log an amount I have lent to or borrowed from someone so that I can keep track of informal transactions. |
| --- | --- |
| Epic | E2.4 — Borrow & Lend Logging |
| AcceptanceCriteria | Borrow/Lend is available as a transaction typeUser enters name, amount, and optional due dateLogged entries appear separately in history with a distinct label |
| US-017 | Mark a borrow or lend entry as settled |
| --- | --- |
| User Story | As a user, I want to mark a borrow or lend record as settled so that I know it has been resolved. |
| --- | --- |
| Epic | E2.4 — Borrow & Lend Logging |
| AcceptanceCriteria | Settle option is available on borrow/lend entriesSettled entries are visually distinct from open onesSettling does not delete the record |
| E2.5 | Transaction Notes |
| --- | --- |
| US-018 | Add a note to a transaction |
| --- | --- |
| User Story | As a user, I want to add a short note to a transaction so that I can remember what it was for. |
| --- | --- |
| Epic | E2.5 — Transaction Notes |
| AcceptanceCriteria | Notes field is optional and available on add/edit transaction formMax 200 charactersNote is displayed on the transaction detail screen |

**T3 Budget Planning & Control**

| E3.1 | Monthly Budget Setup |
| --- | --- |
| US-019 | Set a monthly spending budget |
| --- | --- |
| User Story | As a user, I want to set a total budget for the month so that I have a spending limit to work within. |
| --- | --- |
| Epic | E3.1 — Monthly Budget Setup |
| AcceptanceCriteria | Budget setup is accessible from the budget screenUser enters a numeric amountBudget is applied to the current month and resets each monthDashboard shows progress against the budget |
| US-020 | Edit the monthly budget |
| --- | --- |
| User Story | As a user, I want to update my monthly budget amount so that I can adjust it if my financial situation changes. |
| --- | --- |
| Epic | E3.1 — Monthly Budget Setup |
| AcceptanceCriteria | Edit option is available on the budget screenNew amount applies from the point of change, not retroactively |
| E3.2 | Category-Specific Budget Management |
| --- | --- |
| US-021 | Set a budget for a specific category |
| --- | --- |
| User Story | As a user, I want to set a spending limit for each category so that I can control how much I spend in each area. |
| --- | --- |
| Epic | E3.2 — Category-Specific Budget Management |
| AcceptanceCriteria | Category budget option is available on the budget screenUser can set limits for each available categoryCategory progress is tracked and shown separately |
| US-022 | See a warning when approaching a category budget limit |
| --- | --- |
| User Story | As a user, I want to be warned when I am close to a category limit so that I can adjust my spending before going over. |
| --- | --- |
| Epic | E3.2 — Category-Specific Budget Management |
| AcceptanceCriteria | Warning indicator appears when spending reaches 80% of a category limitLimit exceeded is shown in red |
| E3.3 | Real-Time Budget Tracking |
| --- | --- |
| US-023 | View remaining budget in real time |
| --- | --- |
| User Story | As a user, I want to see how much budget I have left at any point in the month so that I can make informed spending decisions. |
| --- | --- |
| Epic | E3.3 — Real-Time Budget Tracking |
| AcceptanceCriteria | Dashboard shows total spent vs. total budgetRemaining amount updates immediately after each transactionProgress bar visually represents budget usage |
| E3.4 | Budget Carry-Forward |
| --- | --- |
| US-024 | Carry unused budget to the next month |
| --- | --- |
| User Story | As a user, I want any unspent budget from this month to carry forward so that I am not penalised for spending less. |
| --- | --- |
| Epic | E3.4 — Budget Carry-Forward |
| AcceptanceCriteria | Carry-forward setting can be toggled on or offIf enabled, remaining balance is added to next month's budget automaticallyDashboard shows carried-forward amount separately |

**T4 Financial Insights & Reporting**

| E4.1 | Dashboard Overview |
| --- | --- |
| US-025 | View financial summary on the dashboard |
| --- | --- |
| User Story | As a user, I want to see my income, expenses, and savings progress on the dashboard so that I have an immediate overview of my finances. |
| --- | --- |
| Epic | E4.1 — Dashboard Overview |
| AcceptanceCriteria | Dashboard shows total income, total expenses, and net for the current monthSavings goal progress bar is visibleRecent transactions list shows the last 5 entriesBudget usage indicator is displayed |
| E4.2 | Spending Breakdown & Visual Charts |
| --- | --- |
| US-026 | View spending breakdown by category |
| --- | --- |
| User Story | As a user, I want to see a breakdown of my spending by category so that I know where my money is going. |
| --- | --- |
| Epic | E4.2 — Spending Breakdown & Visual Charts |
| AcceptanceCriteria | Pie chart shows spending proportion per categoryEach category is labelled with amount and percentageTapping a category shows its transactions |
| US-027 | View income vs. expense bar chart |
| --- | --- |
| User Story | As a user, I want to see a bar chart comparing my income and expenses so that I can gauge my monthly financial balance. |
| --- | --- |
| Epic | E4.2 — Spending Breakdown & Visual Charts |
| AcceptanceCriteria | Bar chart shows income and expense side by sideChart covers the current month by defaultUser can switch between monthly and weekly view |
| E4.3 | Savings Trend Reporting |
| --- | --- |
| US-028 | View savings trend over time |
| --- | --- |
| User Story | As a user, I want to see a line chart of my savings over the past months so that I can track whether I am saving more or less over time. |
| --- | --- |
| Epic | E4.3 — Savings Trend Reporting |
| AcceptanceCriteria | Line chart shows monthly savings across the last 6 monthsChart is accessible from the reports or statistics screen |
| E4.4 | Report Export |
| --- | --- |
| US-029 | Export financial report as PDF |
| --- | --- |
| User Story | As a user, I want to export my monthly report as a PDF so that I have a formatted record I can save or share. |
| --- | --- |
| Epic | E4.4 — Report Export |
| AcceptanceCriteria | Export button is available on the reports screenPDF includes income, expenses, category breakdown, and savings for the selected periodFile is saved to device or shared via share sheet |
| US-030 | Export transactions as CSV |
| --- | --- |
| User Story | As a user, I want to export my transactions as a CSV file so that I can use the data in a spreadsheet. |
| --- | --- |
| Epic | E4.4 — Report Export |
| AcceptanceCriteria | CSV includes date, type, category, amount, and notes columnsFile is saved to device or shared via share sheet |
| E4.5 | Transaction History & Filtering |
| --- | --- |
| US-031 | View full transaction history |
| --- | --- |
| User Story | As a user, I want to see all my past transactions in a list so that I have a complete record of my financial activity. |
| --- | --- |
| Epic | E4.5 — Transaction History & Filtering |
| AcceptanceCriteria | History screen shows all transactions in reverse chronological orderEach entry shows date, category, type, and amount |
| US-032 | Filter transactions by date, category, or type |
| --- | --- |
| User Story | As a user, I want to filter my transaction history so that I can find specific entries without scrolling through everything. |
| --- | --- |
| Epic | E4.5 — Transaction History & Filtering |
| AcceptanceCriteria | Filter options include date range, category, and income/expense typeFilters can be combinedResults update immediately when filters are appliedClear filter option resets the view |
| US-033 | Search transactions by keyword |
| --- | --- |
| User Story | As a user, I want to search my transactions by keyword so that I can quickly find a specific entry. |
| --- | --- |
| Epic | E4.5 — Transaction History & Filtering |
| AcceptanceCriteria | Search bar is available on the history screenResults match against category name, amount, and notesResults update as the user types |

**T5 Assets, Liabilities & Net Worth**

| E5.1 | Asset Management |
| --- | --- |
| US-034 | Add an asset |
| --- | --- |
| User Story | As a user, I want to add an asset with a name and value so that I can track what I own. |
| --- | --- |
| Epic | E5.1 — Asset Management |
| AcceptanceCriteria | Form includes asset name and valueAsset is saved and appears in the assets listTotal asset value is reflected in net worth calculation |
| US-035 | Edit or delete an asset |
| --- | --- |
| User Story | As a user, I want to edit or delete an asset so that I can keep my records accurate. |
| --- | --- |
| Epic | E5.1 — Asset Management |
| AcceptanceCriteria | Edit and delete options are available on each asset entryChanges immediately update the net worth calculation |
| E5.2 | Liability Management |
| --- | --- |
| US-036 | Add a liability |
| --- | --- |
| User Story | As a user, I want to add a liability with a name and amount so that I can track what I owe. |
| --- | --- |
| Epic | E5.2 — Liability Management |
| AcceptanceCriteria | Form includes liability name and amountLiability is saved and reflected in net worth calculation |
| US-037 | Edit or delete a liability |
| --- | --- |
| User Story | As a user, I want to edit or delete a liability so that I can keep my debt records up to date. |
| --- | --- |
| Epic | E5.2 — Liability Management |
| AcceptanceCriteria | Edit and delete options are available on each liability entryChanges immediately update the net worth calculation |
| E5.3 | Net Worth Calculation & Display |
| --- | --- |
| US-038 | View my net worth |
| --- | --- |
| User Story | As a user, I want to see my net worth calculated from my assets and liabilities so that I have a clear picture of my overall financial position. |
| --- | --- |
| Epic | E5.3 — Net Worth Calculation & Display |
| AcceptanceCriteria | Net worth is displayed as total assets minus total liabilitiesUpdates automatically when assets or liabilities changePositive net worth is shown in green, negative in red |

**T6 AI-Powered Chatbot Assistant**

| E6.1 | Personalized Saving Advice |
| --- | --- |
| US-039 | Receive saving tips based on my spending |
| --- | --- |
| User Story | As a user, I want the chatbot to give me saving tips based on my actual transactions so that the advice is relevant to my situation. |
| --- | --- |
| Epic | E6.1 — Personalized Saving Advice |
| AcceptanceCriteria | Chatbot has access to the user's recent transaction dataTips reference specific categories where the user is overspendingResponse is generated within a reasonable time |
| E6.2 | Overspending Detection & Alerts |
| --- | --- |
| US-040 | Get alerted by the chatbot about overspending |
| --- | --- |
| User Story | As a user, I want the chatbot to alert me when I am overspending in a category so that I can adjust before I exceed my budget. |
| --- | --- |
| Epic | E6.2 — Overspending Detection & Alerts |
| AcceptanceCriteria | Chatbot detects when spending in a category exceeds 80% of its limitAlert includes the category name, amount spent, and remaining budgetAlert is shown as a chatbot message, not a push notification |
| E6.3 | Budget Adjustment Suggestions |
| --- | --- |
| US-041 | Get chatbot suggestions for adjusting my budget |
| --- | --- |
| User Story | As a user, I want the chatbot to suggest budget adjustments based on how I have been spending so that my budget reflects my actual habits. |
| --- | --- |
| Epic | E6.3 — Budget Adjustment Suggestions |
| AcceptanceCriteria | Chatbot analyses the last month of transactionsSuggestions include specific categories and recommended amountsUser can dismiss or acknowledge the suggestion |
| E6.4 | Natural Language Transaction Input |
| --- | --- |
| US-042 | Log a transaction by typing a message to the chatbot |
| --- | --- |
| User Story | As a user, I want to type something like 'spent 500 on food today' to the chatbot and have it log the transaction for me so that I can record expenses without filling out a form. |
| --- | --- |
| Epic | E6.4 — Natural Language Transaction Input |
| AcceptanceCriteria | Chatbot extracts amount, category, and date from natural language inputParsed transaction is shown to the user for confirmation before savingOn confirmation, transaction is saved to the user's historyIf parsing fails, chatbot asks the user to clarify |

**T7 Notifications & Reminders**

| E7.1 | Daily Transaction Logging Reminders |
| --- | --- |
| US-043 | Receive a daily reminder to log transactions |
| --- | --- |
| User Story | As a user, I want to receive a daily push notification reminding me to log my transactions so that I do not fall behind on my records. |
| --- | --- |
| Epic | E7.1 — Daily Transaction Logging Reminders |
| AcceptanceCriteria | Notification is sent once per day at a user-configured timeNotification text is short and clearTapping the notification opens the app to the add transaction screenReminder can be disabled from notification settings |
| US-044 | Set the time for my daily reminder |
| --- | --- |
| User Story | As a user, I want to choose what time I receive the daily reminder so that it fits my routine. |
| --- | --- |
| Epic | E7.1 — Daily Transaction Logging Reminders |
| AcceptanceCriteria | Time picker is available in notification settingsSelected time is saved and applied immediatelyDefault time is 9:00 PM if not configured |
| E7.2 | Monthly Savings Goal Progress Notifications |
| --- | --- |
| US-045 | Receive a notification when I hit a savings milestone |
| --- | --- |
| User Story | As a user, I want to receive a notification when I reach a savings milestone so that I know my goal is progressing. |
| --- | --- |
| Epic | E7.2 — Monthly Savings Goal Progress Notifications |
| AcceptanceCriteria | Notifications are sent when savings reach 25%, 50%, 75%, and 100% of the monthly goalEach message is distinct and reflects the milestone reachedTapping the notification opens the savings progress screen |
| US-046 | Receive a mid-month savings progress update |
| --- | --- |
| User Story | As a user, I want a notification around mid-month telling me how my savings are tracking so that I can adjust if needed. |
| --- | --- |
| Epic | E7.2 — Monthly Savings Goal Progress Notifications |
| AcceptanceCriteria | Notification is sent on the 15th of each monthMessage includes current savings amount and remaining goalOnly sent if a savings goal has been set |

**T8 Privacy, Security & Data Protection**

| E8.1 | App Lock (PIN & Biometrics) |
| --- | --- |
| US-047 | Enable app lock with PIN |
| --- | --- |
| User Story | As a user, I want to set a PIN that locks the app when I leave it so that my data is protected. |
| --- | --- |
| Epic | E8.1 — App Lock (PIN & Biometrics) |
| AcceptanceCriteria | PIN setup is available in security settingsApp locks automatically when moved to backgroundUser must enter PIN to return to the appThree consecutive wrong PINs log the user out |
| US-048 | Enable app lock with biometrics |
| --- | --- |
| User Story | As a user, I want to use my fingerprint or face ID to unlock the app so that I can get in quickly without typing a PIN. |
| --- | --- |
| Epic | E8.1 — App Lock (PIN & Biometrics) |
| AcceptanceCriteria | Biometric option is shown if device supports itFalls back to PIN if biometrics failBiometrics can be enabled or disabled in settings |
| E8.2 | Balance Visibility Controls |
| --- | --- |
| US-049 | Hide my balance on the dashboard |
| --- | --- |
| User Story | As a user, I want to hide all monetary amounts on the dashboard so that others cannot see my balance when I am in public. |
| --- | --- |
| Epic | E8.2 — Balance Visibility Controls |
| AcceptanceCriteria | Hide balance toggle is available on the dashboard or in settingsAll amounts are replaced with '****' when enabledToggle persists between sessionsRe-enabling instantly shows the values again |
| E8.3 | Data Encryption |
| --- | --- |
| US-050 | Have my data stored securely |
| --- | --- |
| User Story | As a user, I want my financial data to be encrypted so that it is protected even if there is a security incident. |
| --- | --- |
| Epic | E8.3 — Data Encryption |
| AcceptanceCriteria | All data in Firestore is stored under authenticated access rulesData is transmitted over HTTPS onlyFirebase security rules prevent unauthenticated access to any user data |
| E8.4 | Privacy Policy |
| --- | --- |
| US-051 | View the privacy policy in the app |
| --- | --- |
| User Story | As a user, I want to read the privacy policy from within the app so that I understand how my data is handled. |
| --- | --- |
| Epic | E8.4 — Privacy Policy |
| AcceptanceCriteria | Privacy policy is accessible from the settings screenContent is readable without requiring an internet connectionLast updated date is shown at the top |

**T9 Premium Subscription & Monetization**

| E9.1 | Premium Feature Access Control |
| --- | --- |
| US-052 | See which features require premium |
| --- | --- |
| User Story | As a free user, I want to clearly see which features are premium so that I can decide whether to upgrade. |
| --- | --- |
| Epic | E9.1 — Premium Feature Access Control |
| AcceptanceCriteria | Premium-only features are marked with a visible badgeTapping a locked feature shows a brief explanation and upgrade promptNo features are hidden — they are visible but gated |
| US-053 | Access extended transaction history as a premium user |
| --- | --- |
| User Story | As a premium user, I want to access my full transaction history beyond three months so that I have long-term records available. |
| --- | --- |
| Epic | E9.1 — Premium Feature Access Control |
| AcceptanceCriteria | Free users see up to 3 months of historyPremium users have no history limitUpgrade prompt shown to free users when they scroll past the 3-month mark |
| E9.2 | Subscription Management |
| --- | --- |
| US-054 | Subscribe to the premium plan |
| --- | --- |
| User Story | As a user, I want to subscribe to Pocket Plan premium from within the app so that I can unlock additional features. |
| --- | --- |
| Epic | E9.2 — Subscription Management |
| AcceptanceCriteria | Subscription screen shows plan details and pricingPayment is processed securely through the platform (App Store / Play Store)Premium status is activated immediately after successful payment |
| US-055 | View and manage my subscription |
| --- | --- |
| User Story | As a premium user, I want to view my subscription status and manage or cancel it so that I have control over my billing. |
| --- | --- |
| Epic | E9.2 — Subscription Management |
| AcceptanceCriteria | Subscription status is shown in settingsLink to platform subscription management is providedCancellation takes effect at end of billing period |
| E9.3 | Advanced Exports (Premium) |
| --- | --- |
| US-056 | Export a detailed report as a premium user |
| --- | --- |
| User Story | As a premium user, I want to export a more detailed financial report so that I have comprehensive records for my own use. |
| --- | --- |
| Epic | E9.3 — Advanced Exports (Premium) |
| AcceptanceCriteria | Premium export includes net worth summary, full history, and category breakdownAvailable in both PDF and CSV formatsExport covers a user-selected date range |
| E9.4 | Priority Chatbot Access (Premium) |
| --- | --- |
| US-057 | Get more chatbot credits as a premium user |
| --- | --- |
| User Story | As a premium user, I want to have a higher chatbot usage limit so that I can use the assistant more freely. |
| --- | --- |
| Epic | E9.4 — Priority Chatbot Access (Premium) |
| AcceptanceCriteria | Free users have a limited number of chatbot queries per monthPremium users receive a significantly higher monthly limitRemaining credits are visible in the chatbot screen |

**T10 Settings & User Preferences**

| E10.1 | Profile Management |
| --- | --- |
| US-058 | View and edit my profile |
| --- | --- |
| User Story | As a user, I want to view and update my name and profile details so that my account information stays accurate. |
| --- | --- |
| Epic | E10.1 — Profile Management |
| AcceptanceCriteria | Profile screen shows current name and emailName field is editableChanges are saved to Firebase on submissionEmail change requires re-authentication |
| E10.2 | Colour Theme Selection |
| --- | --- |
| US-059 | Switch between light and dark mode |
| --- | --- |
| User Story | As a user, I want to switch between light and dark mode so that the app is comfortable to use in different lighting conditions. |
| --- | --- |
| Epic | E10.2 — Colour Theme Selection |
| AcceptanceCriteria | Toggle for light/dark mode is available in settingsMode applies immediately without restarting the appSelected mode persists between sessions |
| US-060 | Choose an app colour theme |
| --- | --- |
| User Story | As a user, I want to select a colour theme for the app so that I can personalise how it looks. |
| --- | --- |
| Epic | E10.2 — Colour Theme Selection |
| AcceptanceCriteria | A set of colour theme options is available in settingsSelected theme applies across the whole app immediatelyTheme choice is saved and persists between sessions |
| E10.3 | Notification Preference Controls |
| --- | --- |
| US-061 | Enable or disable specific notifications |
| --- | --- |
| User Story | As a user, I want to choose which notifications I receive so that I only get the ones I find useful. |
| --- | --- |
| Epic | E10.3 — Notification Preference Controls |
| AcceptanceCriteria | Settings screen shows toggles for each notification typeChanges take effect immediatelyDisabling all notifications is allowed |
| E10.4 | Account Management & Deletion |
| --- | --- |
| US-062 | Delete my account and all my data |
| --- | --- |
| User Story | As a user, I want to permanently delete my account and all associated data so that nothing is retained after I leave. |
| --- | --- |
| Epic | E10.4 — Account Management & Deletion |
| AcceptanceCriteria | Delete account option is available in settingsConfirmation dialog warns the user that this action cannot be undoneAll user data is deleted from Firestore and Firebase AuthUser is signed out and returned to the sign-in screen |