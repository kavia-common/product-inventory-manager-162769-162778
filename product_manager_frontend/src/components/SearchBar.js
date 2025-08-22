import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ placeholder = 'Search products...', defaultValue = '', onSearch }) {
  /** A debounced search input */
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const t = setTimeout(() => {
      onSearch && onSearch(value.trim());
    }, 350);
    return () => clearTimeout(t);
  }, [value, onSearch]);

  return (
    <div className="searchbar">
      <span className="search-icon">🔍</span>
      <input
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
      {value && (
        <button className="btn btn-text" onClick={() => setValue('')} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  );
}
