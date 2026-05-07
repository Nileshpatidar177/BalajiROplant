import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Layout.css';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/orders', label: 'Orders', icon: '📦' },
  { to: '/products', label: 'Products', icon: '🧊' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

const Layout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <span>❄️</span>
          <div>
            <div className="logo-title">Patidar Admin</div>
            <div className="logo-sub">Management Panel</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <span className="topbar-title">Patidar Ice & RO — Admin Panel</span>
          <button className="logout-btn-top" onClick={onLogout}>Logout 🚪</button>
        </header>
        <main className="content">{children}</main>
      </div>

      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};

export default Layout;
