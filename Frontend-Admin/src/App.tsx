import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./layout/Sidebar";
import { Header } from "./layout/Header";
import { Dashboard } from "./pages/Dashboard";
import { Payments } from "./pages/Payments";
import { Support } from "./pages/Support";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
