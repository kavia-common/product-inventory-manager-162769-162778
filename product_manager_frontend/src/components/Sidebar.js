import React from 'react';

const navItems = [
  { key: 'products', label: 'Products', icon: '📦' },
  { key: 'add', label: 'Add Product', icon: '➕' },
];

// PUBLIC_INTERFACE
export default function Sidebar({ active, onNavigate }) {
  /** Sidebar with navigation items */
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">🧭</span>
        <span className="brand-text">Product Manager</span>
      </div>
      <nav className="nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${active === item.key ? 'active' : ''}`}
            onClick={() => onNavigate(item.key)}
            aria-current={active === item.key ? 'page' : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
