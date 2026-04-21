import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>Pocket Plan</h1>
        <p>Admin Portal</p>
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/"
          className={`nav-link ${isActive("/") ? "active" : ""}`}
        >
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </Link>
        <Link
          to="/payments"
          className={`nav-link ${isActive("/payments") ? "active" : ""}`}
        >
          <span className="nav-icon">💳</span>
          <span>Payments</span>
        </Link>
        <Link
          to="/support"
          className={`nav-link ${isActive("/support") ? "active" : ""}`}
        >
          <span className="nav-icon">🎟️</span>
          <span>Support Tickets</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">Logout</button>
      </div>
    </aside>
  );
};
