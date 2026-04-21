import React, { useState } from "react";
import { SupportTicket } from "../types";
import "./Support.css";

export const Support: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "t1",
      userId: "u1",
      userName: "Ahmed Khan",
      subject: "Cannot add transaction - app crashes",
      status: "open",
      priority: "high",
      createdAt: "2026-04-21",
      updatedAt: "2026-04-21",
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
      updatedAt: "2026-04-21",
      messages: 5,
    },
    {
      id: "t3",
      userId: "u3",
      userName: "Hassan Raza",
      subject: "App crash on iOS 18",
      status: "resolved",
      priority: "high",
      createdAt: "2026-04-19",
      updatedAt: "2026-04-20",
      messages: 8,
    },
    {
      id: "t4",
      userId: "u4",
      userName: "Fatima Ahmed",
      subject: "Question about budget feature",
      status: "open",
      priority: "low",
      createdAt: "2026-04-21",
      updatedAt: "2026-04-21",
      messages: 1,
    },
    {
      id: "t5",
      userId: "u5",
      userName: "Ali Hussain",
      subject: "Payment failed but amount deducted",
      status: "in-progress",
      priority: "high",
      createdAt: "2026-04-20",
      updatedAt: "2026-04-21",
      messages: 4,
    },
    {
      id: "t6",
      userId: "u6",
      userName: "Zainab Khan",
      subject: "Feature request: dark mode",
      status: "open",
      priority: "low",
      createdAt: "2026-04-18",
      updatedAt: "2026-04-18",
      messages: 3,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "#10b981";
      case "in-progress":
        return "#f59e0b";
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

  const filteredTickets = tickets.filter((ticket) => {
    const statusMatch = filterStatus === "all" || ticket.status === filterStatus;
    const priorityMatch =
      filterPriority === "all" || ticket.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const openCount = tickets.filter((t) => t.status === "open").length;
  const inProgressCount = tickets.filter(
    (t) => t.status === "in-progress"
  ).length;
  const resolvedCount = tickets.filter((t) => t.status === "resolved").length;

  return (
    <div className="support">
      <h1>Support Tickets</h1>

      {/* Stats */}
      <div className="ticket-stats">
        <div className="stat-card">
          <div className="stat-label">Open</div>
          <div className="stat-value" style={{ color: "#ef4444" }}>
            {openCount}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">In Progress</div>
          <div className="stat-value" style={{ color: "#f59e0b" }}>
            {inProgressCount}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Resolved</div>
          <div className="stat-value" style={{ color: "#10b981" }}>
            {resolvedCount}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Tickets</div>
          <div className="stat-value">{tickets.length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Priority</label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="support-layout">
        <div className="tickets-list-container">
          <div className="tickets-list">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`ticket-card ${
                    selectedTicket?.id === ticket.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="ticket-header">
                    <div className="ticket-title">{ticket.subject}</div>
                    <span
                      className="priority-badge"
                      style={{
                        backgroundColor: getPriorityColor(ticket.priority),
                        color: "white",
                      }}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="ticket-meta">
                    <span className="user-info">👤 {ticket.userName}</span>
                    <span className="message-count">💬 {ticket.messages}</span>
                  </div>
                  <div className="ticket-footer">
                    <span className="date">{ticket.createdAt}</span>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(ticket.status),
                        color: "white",
                      }}
                    >
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-tickets">No tickets found</div>
            )}
          </div>
        </div>

        {/* Detail View */}
        <div className="ticket-detail-container">
          {selectedTicket ? (
            <div className="ticket-detail">
              <div className="detail-header">
                <h2>{selectedTicket.subject}</h2>
                <span
                  className="status-badge"
                  style={{
                    backgroundColor: getStatusColor(selectedTicket.status),
                    color: "white",
                  }}
                >
                  {selectedTicket.status}
                </span>
              </div>

              <div className="detail-info">
                <div className="info-row">
                  <span className="label">User:</span>
                  <span className="value">
                    {selectedTicket.userName} ({selectedTicket.userId})
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Priority:</span>
                  <span
                    className="value"
                    style={{
                      color: getPriorityColor(selectedTicket.priority),
                      fontWeight: 600,
                    }}
                  >
                    {selectedTicket.priority}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Created:</span>
                  <span className="value">{selectedTicket.createdAt}</span>
                </div>
                <div className="info-row">
                  <span className="label">Last Updated:</span>
                  <span className="value">{selectedTicket.updatedAt}</span>
                </div>
                <div className="info-row">
                  <span className="label">Messages:</span>
                  <span className="value">{selectedTicket.messages}</span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn btn-primary">Assign to Me</button>
                <button className="btn btn-secondary">
                  Change Status
                </button>
                <button className="btn btn-danger">Close Ticket</button>
              </div>

              <div className="conversation">
                <h3>Conversation</h3>
                <div className="message-item">
                  <div className="message-sender">User</div>
                  <div className="message-content">
                    I'm unable to add transactions to my budget. The app keeps
                    crashing when I try to click the + button.
                  </div>
                  <div className="message-time">2026-04-21 10:30 AM</div>
                </div>
                <div className="message-item admin">
                  <div className="message-sender">Support Team</div>
                  <div className="message-content">
                    Thank you for reporting this issue. We're investigating.
                    Could you please provide:
                    <ul>
                      <li>Your device model and iOS version</li>
                      <li>When this started happening</li>
                    </ul>
                  </div>
                  <div className="message-time">2026-04-21 11:00 AM</div>
                </div>
              </div>

              <div className="reply-box">
                <textarea
                  placeholder="Type your response..."
                  className="reply-input"
                ></textarea>
                <button className="btn btn-primary">Send Reply</button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a ticket to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
