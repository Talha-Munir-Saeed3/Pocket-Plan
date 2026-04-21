import React from "react";
import "./Header.css";

export const Header: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="header">
      <div className="header-content">
        <h2>Admin Dashboard</h2>
      </div>
      <div className="header-right">
        <span className="time">{currentTime}</span>
        <div className="admin-profile">
          <div className="avatar">👤</div>
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};
