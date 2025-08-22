import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function Filters({ onChange }) {
  /** Filters for category and price range */
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      onChange &&
        onChange({
          category: category || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        });
    }, 300);
    return () => clearTimeout(t);
  }, [category, minPrice, maxPrice, onChange]);

  return (
    <div className="filters">
      <div className="filter-item">
        <label className="label">Category</label>
        <input
          className="input"
          placeholder="e.g. Electronics"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="filter-item">
        <label className="label">Min Price</label>
        <input
          type="number"
          min="0"
          step="0.01"
          className="input"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="0.00"
        />
      </div>
      <div className="filter-item">
        <label className="label">Max Price</label>
        <input
          type="number"
          min="0"
          step="0.01"
          className="input"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="1000.00"
        />
      </div>
    </div>
  );
}
