import React from 'react';

// PUBLIC_INTERFACE
export default function ProductTable({ products, onEdit, onDelete }) {
  /** Render tabular product list */
  if (!products || products.length === 0) {
    return <div className="empty">No products found.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th className="th left">Name</th>
            <th className="th left">Category</th>
            <th className="th right">Price</th>
            <th className="th right">Stock</th>
            <th className="th center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id || p._id}>
              <td className="td left">{p.name}</td>
              <td className="td left">{p.category || '-'}</td>
              <td className="td right">${Number(p.price || 0).toFixed(2)}</td>
              <td className="td right">{Number(p.stock || 0)}</td>
              <td className="td center">
                <div className="row-actions">
                  <button className="btn btn-text" onClick={() => onEdit && onEdit(p)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete && onDelete(p)}
                    aria-label={`Delete ${p.name}`}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
