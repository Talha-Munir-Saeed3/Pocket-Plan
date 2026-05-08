import React, { useState } from "react";
import { Payment } from "../types";
import "./Payments.css";

export const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      userId: "u1",
      userName: "Ahmed Khan",
      amount: 499,
      status: "completed",
      date: "2026-04-21",
      method: "Card",
      description: "Monthly subscription",
    },
    {
      id: "2",
      userId: "u2",
      userName: "Sara Ali",
      amount: 3499,
      status: "completed",
      date: "2026-04-21",
      method: "Bank Transfer",
      description: "Yearly subscription",
    },
    {
      id: "3",
      userId: "u3",
      userName: "Hassan Raza",
      amount: 499,
      status: "pending",
      date: "2026-04-20",
      method: "Card",
      description: "Monthly subscription",
    },
    {
      id: "4",
      userId: "u4",
      userName: "Fatima Ahmed",
      amount: 499,
      status: "failed",
      date: "2026-04-20",
      method: "Card",
      description: "Monthly subscription",
    },
    {
      id: "5",
      userId: "u5",
      userName: "Ali Hussain",
      amount: 3499,
      status: "completed",
      date: "2026-04-19",
      method: "Bank Transfer",
      description: "Yearly subscription",
    },
    {
      id: "6",
      userId: "u6",
      userName: "Zainab Khan",
      amount: 499,
      status: "completed",
      date: "2026-04-19",
      method: "JazzCash",
      description: "Monthly subscription",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "failed":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusTextColor = (status: string) => {
    // Ensure good contrast: use dark text on yellow (pending), white on others
    switch (status) {
      case "pending":
        return "#1f2937"; // dark slate
      default:
        return "#ffffff";
    }
  };

  const filteredPayments =
    filterStatus === "all"
      ? payments
      : payments.filter((p) => p.status === filterStatus);

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const completedAmount = filteredPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="payments">
      <h1>Payment Management</h1>

      {/* Stats */}
      <div className="payment-stats">
        <div className="stat-card">
          <div className="stat-label">Total Transactions</div>
          <div className="stat-value">{filteredPayments.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Amount</div>
          <div className="stat-value">Rs {totalAmount.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completed</div>
          <div className="stat-value">Rs {completedAmount.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Success Rate</div>
          <div className="stat-value">
            {payments.length > 0
              ? (
                  (payments.filter((p) => p.status === "completed").length /
                    payments.length) *
                  100
                ).toFixed(1)
              : 0}
            %
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="payment-filter">
        <button
          className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
          onClick={() => setFilterStatus("all")}
        >
          All ({payments.length})
        </button>
        <button
          className={`filter-btn ${filterStatus === "completed" ? "active" : ""}`}
          onClick={() => setFilterStatus("completed")}
        >
          Completed (
          {payments.filter((p) => p.status === "completed").length})
        </button>
        <button
          className={`filter-btn ${filterStatus === "pending" ? "active" : ""}`}
          onClick={() => setFilterStatus("pending")}
        >
          Pending ({payments.filter((p) => p.status === "pending").length})
        </button>
        <button
          className={`filter-btn ${filterStatus === "failed" ? "active" : ""}`}
          onClick={() => setFilterStatus("failed")}
        >
          Failed ({payments.filter((p) => p.status === "failed").length})
        </button>
      </div>

      {/* Table */}
      <div className="payment-table-card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <div className="user-cell">
                      <span className="avatar">👤</span>
                      <div>
                        <div className="user-name">{payment.userName}</div>
                        <div className="user-id">{payment.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="amount">Rs {payment.amount.toLocaleString()}</td>
                  <td>{payment.method}</td>
                  <td>{payment.description}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(payment.status),
                        color: getStatusTextColor(payment.status),
                      }}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.date}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view-btn">👁️</button>
                      {payment.status === "pending" && (
                        <button className="action-btn retry-btn">🔄</button>
                      )}
                      {payment.status === "completed" && (
                        <button className="action-btn refund-btn">↩️</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
