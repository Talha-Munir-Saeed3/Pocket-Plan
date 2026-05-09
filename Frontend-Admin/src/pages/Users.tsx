import React, { useMemo, useState } from "react";
import { User } from "../types";
import "./Users.css";

const USERS: User[] = [
  {
    id: "u1",
    name: "Ahmed Khan",
    email: "ahmed@example.com",
    phone: "+92 300 1111111",
    status: "active",
    subscriptionPlan: "monthly",
    joinedAt: "2026-01-12"
  },
  {
    id: "u2",
    name: "Sara Ali",
    email: "sara@example.com",
    phone: "+92 301 2222222",
    status: "active",
    subscriptionPlan: "yearly",
    joinedAt: "2025-11-03"
  },
  {
    id: "u3",
    name: "Hassan Raza",
    email: "hassan@example.com",
    status: "inactive",
    subscriptionPlan: "free",
    joinedAt: "2026-03-22"
  },
  {
    id: "u4",
    name: "Fatima Ahmed",
    email: "fatima@example.com",
    status: "suspended",
    subscriptionPlan: "monthly",
    joinedAt: "2025-12-18"
  }
];

export const Users: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<"all" | User["status"]>("all");
  const [planFilter, setPlanFilter] = useState<"all" | User["subscriptionPlan"]>("all");

  const filteredUsers = useMemo(() => {
    return USERS.filter((user) => {
      const statusMatch = statusFilter === "all" || user.status === statusFilter;
      const planMatch = planFilter === "all" || user.subscriptionPlan === planFilter;
      return statusMatch && planMatch;
    });
  }, [statusFilter, planFilter]);

  const getStatusColor = (status: User["status"]) => {
    if (status === "active") return "#10b981";
    if (status === "inactive") return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="users-page">
      <h1>User Management</h1>

      <div className="users-filters">
        <div className="filter-group">
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Plan</label>
          <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value as any)}>
            <option value="all">All</option>
            <option value="free">Free</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="users-table-card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Plan</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <span className="avatar">👤</span>
                      <div>
                        <div className="user-name">{user.name}</div>
                        <div className="user-id">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone || "-"}</td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: getStatusColor(user.status), color: "#fff" }}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <span className="plan-badge">{user.subscriptionPlan}</span>
                  </td>
                  <td>{user.joinedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
