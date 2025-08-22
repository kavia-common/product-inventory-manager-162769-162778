import React from 'react';

// PUBLIC_INTERFACE
export default function Topbar({ title, primaryAction }) {
  /** Simple top bar with title and an optional primary button */
  return (
    <header className="topbar">
      <h1 className="topbar-title">{title}</h1>
      <div className="topbar-actions">
        {primaryAction ? (
          <button className="btn btn-primary" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </button>
        ) : null}
      </div>
    </header>
  );
}
