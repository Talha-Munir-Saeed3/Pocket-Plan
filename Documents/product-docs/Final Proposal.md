**POCKET PLAN**

Personal Finance Management Mobile Application

Project Proposal \| Team CPS

  -----------------------------------------------------------------------
  **Team Name**          CPS
  ---------------------- ------------------------------------------------
  **Project Name**       Pocket Plan

  **Project Type**       Mobile Application (Cross-Platform)

  **Tech Framework**     React Native + Python + Firebase

  **Document Version**   Final
  -----------------------------------------------------------------------

# **1. Project Description**

This project is a personal finance management mobile application that
allows users to track their income, expenses, budgets, and savings goals
in one place. The app provides visual reports, transaction history with
filters, and an AI-powered chatbot assistant that offers personalized
saving advice. It includes secure sign-in and sign-up functionality and
push notifications for budget alerts. The goal is to make personal
financial management simple and accessible for everyday users.

# **2. Target Audience**

Pocket Plan is designed for financially active individuals who want a
simple yet intelligent way to manage their personal finances without the
complexity of traditional budgeting tools. Our three primary user
segments are:

  -------------------------------------------------------------------------
  **Segment**       **Profile**              **Why Pocket Plan**
  ----------------- ------------------------ ------------------------------
  **Students        Ages 17--25, limited and Simple UI, borrow/lend
  (Primary)**       irregular income, pocket tracking, low-effort daily
                    money, part-time jobs.   logging.

  **Young           Ages 22--30, first       Reports, savings goals,
  Professionals**   salary, managing rent,   premium tier, AI budget
                    bills, and loan          advice.
                    repayments.              

  **Freelancers &   Ages 20--35, unstable    Statistics, income tracking,
  Gig Workers**     income, need financial   exportable reports.
                    visibility month to      
                    month.                   
  -------------------------------------------------------------------------

# **3. Feature List**

## **3.1 Authentication**

-   Sign Up

-   Sign In

-   Sign Out

-   Password Reset

-   Google Sign In

## **3.2 Dashboard**

-   Budget Overview

-   Income vs Expense Summary

-   Savings Progress Bar

-   Recent Transactions Preview

-   Quick Add Button

-   Spending Alerts

## **3.3 Transaction Management**

-   Add Transaction

-   Edit Transaction

-   Delete Transaction

-   Categorize Transaction

-   Add Notes to Transaction

-   Recurring Transactions

-   Borrow / Lend Logging

## **3.4 Budget Management**

-   Set Monthly Budget

-   Category-Specific Budgets

-   Real-Time Budget Tracking

-   Carry Forward Unspent Budget

## **3.5 Assets & Liabilities**

-   Add Assets

-   Add Liabilities

-   Net Worth Calculator

## **3.6 Statistics & Reports**

-   Spending Breakdown by Category

-   Income vs Expense Bar Chart

-   Savings Trend Over Time

-   Pie Chart of Spending

-   Export Report (PDF / CSV)

## **3.7 Transaction History**

-   Full History View

-   Filter by Date Range

-   Filter by Category

-   Filter by Type (Income / Expense)

-   Search Transactions

## **3.8 Chatbot Assistant**

-   Personalized Saving Tips

-   Overspending Alerts & Insights

-   Budget Adjustment Suggestions

-   Natural Language Transaction Input

## **3.9 Notifications**

-   Budget Limit Alert

-   Monthly Summary Notification

-   Daily Logging Reminder

-   Savings Milestone Alert

## **3.10 Privacy & Security**

-   App Lock with PIN / Biometrics

-   Hide Balance on Dashboard

-   Data Encryption

-   Privacy Policy Screen

## **3.11 Premium Tier**

-   Extended Transaction History

-   Advanced Report Exports

-   Multiple Budget Profiles

-   Priority Chatbot Responses

-   Ad-Free Experience

## **3.12 Settings**

-   Edit Profile

-   Change Currency

-   Toggle Notifications

-   Manage Subscription

-   Delete Account

# 4**. Potential Threats & Risks**

-   Missed Deadlines --- Feature creep or unclear task ownership can
    > cause sprints to overrun. Mitigation: strict sprint planning and
    > daily standups.

-   Technical Difficulties --- Firebase configuration, React Native
    > environment setup, or API integration issues can block progress
    > early on.

-   AI Chatbot Costs --- If the Gemini API free tier is exceeded,
    > unexpected costs may arise. Mitigation: monitor usage and set API
    > call limits.

-   Team Availability --- Exam schedules, personal commitments, or
    > unequal contribution can affect delivery. Mitigation: clear task
    > assignments on the project board.

-   Scope Creep --- Adding unplanned features mid-sprint disrupts
    > timelines. Mitigation: new ideas go to backlog and are reviewed
    > only at sprint planning.

-   Data Security Risk --- Mishandling user financial data could expose
    > privacy. Mitigation: enforce Firebase security rules and data
    > encryption from day one.

# 5**. Out of Scope --- What We Will Not Build**

-   Bank integration or automatic transaction importing

-   Investment tracking or stock portfolio management

-   Real-time multi-currency conversion

-   Shared or family group budgets

-   Web or desktop version of the application

-   Tax calculation or filing assistance

-   Loan EMI or amortization calculators

-   Business or enterprise accounting features

-   In-app live customer support chat

-   Social features such as comparing spending with friends

# 6**. Te**ch Stack

  ------------------------------------------------------------------------
  **Layer**             **Technology**      **Purpose**
  --------------------- ------------------- ------------------------------
  **Mobile Frontend**   React Native        Cross-platform app for Android
                                            & iOS from one codebase

  **Backend API**       Python + FastAPI    Business logic, data
                                            processing, chatbot
                                            integration

  **Database**          Firebase Firestore  NoSQL cloud database storing
                                            all user and transaction data

  **Authentication**    Firebase Auth       Sign up, sign in, Google
                                            login, password reset

  **Push                Firebase Cloud      Budget alerts, reminders,
  Notifications**       Messaging (FCM)     monthly summaries

  **AI Chatbot**        Gemini API          Personalized financial advice
                                            powered by Google AI

  **Backend Hosting**   Railway or Render   Free cloud hosting for the
                                            Python FastAPI server

  **Project Management  Jira                User stories and tasks
  Tool**                                    
  ------------------------------------------------------------------------
