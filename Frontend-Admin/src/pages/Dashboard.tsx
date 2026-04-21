import React, { useState, useEffect } from "react";
import { MetricsData, Payment, SupportTicket } from "../types";
import "./Dashboard.css";

export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsData>({
    activeUsers: 1250,
    mrr: 24500,
    totalRevenue: 185000,
    conversionRate: 8.5,
  });

  const [recentPayments, setRecentPayments] = useState<Payment[]>([
    {
      id: "1",
      userId: "u1",
      userName: "Ahmed Khan",
      amount: 499,
      status: "completed",
      date: "2026-04-21",
      method: "Card",
    },
    {
      id: "2",
      userId: "u2",
      userName: "Sara Ali",
      amount: 3499,
      status: "completed",
      date: "2026-04-21",
      method: "Bank",
    },
    {
      id: "3",
      userId: "u3",
      userName: "Hassan Raza",
      amount: 499,
      status: "pending",
      date: "2026-04-20",
      method: "Card",
    },
  ]);

  const [recentTickets, setRecentTickets] = useState<SupportTicket[]>([
    {
      id: "t1",
      userId: "u1",
      userName: "Ahmed Khan",
      subject: "Cannot add transaction",
      status: "open",
      priority: "high",
      createdAt: "2026-04-21",
      messages: 2,
    },
    {
      id: "t2",
      userId: "u2",
      userName: "Sara Ali",
      subject: "Subscription renewal issue",
      status: "in-progress",
      priority: "medium",
      createdAt: "2026-04-20",
      messages: 5,
    },
    {
      id: "t3",
      userId: "u3",
      userName: "Hassan Raza",
      subject: "App crash on iOS",
      status: "resolved",
      priority: "high",
      createdAt: "2026-04-19",
      messages: 8,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "resolved":
      case "active":
        return "#10b981";
      case "pending":
      case "in-progress":
        return "#f59e0b";
      case "failed":
      case "open":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">👥</span>
            <span className="metric-label">Active Users</span>
          </div>
          <div className="metric-value">{metrics.activeUsers.toLocaleString()}</div>
          <div className="metric-change positive">+12% from last month</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">💰</span>
            <span className="metric-label">Monthly Revenue</span>
          </div>
          <div className="metric-value">Rs {metrics.mrr.toLocaleString()}</div>
          <div className="metric-change positive">+8% from last month</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">💵</span>
            <span className="metric-label">Total Revenue</span>
          </div>
          <div className="metric-value">Rs {metrics.totalRevenue.toLocaleString()}</div>
          <div className="metric-change">Lifetime total</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">📊</span>
            <span className="metric-label">Conversion Rate</span>
          </div>
          <div className="metric-value">{metrics.conversionRate}%</div>
          <div className="metric-change positive">+0.5% from last month</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <div className="activity-card">
          <div className="section-header">
            <h2>Recent Payments</h2>
            <a href="/payments" className="view-all">View All →</a>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <div className="user-cell">
                        <span className="avatar">👤</span>
                        <span>{payment.userName}</span>
                      </div>
                    </td>
                    <td className="amount">Rs {payment.amount}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: getStatusColor(payment.status),
                          color: "white",
                        }}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td>{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="activity-card">
          <div className="section-header">
            <h2>Support Queue</h2>
            <a href="/support" className="view-all">View All →</a>
          </div>

          <div className="tickets-list">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="ticket-item">
                <div className="ticket-left">
                  <div
                    className="priority-dot"
                    style={{
                      backgroundColor: getPriorityColor(ticket.priority),
                    }}
                  />
                  <div className="ticket-info">
                    <h3>{ticket.subject}</h3>
                    <p>{ticket.userName}</p>
                  </div>
                </div>
                <div className="ticket-right">
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: getStatusColor(ticket.status),
                      color: "white",
                    }}
                  >
                    {ticket.status}
                  </span>
                  <span className="messages">{ticket.messages} msg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
