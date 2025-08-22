import React, { useEffect, useMemo, useState } from 'react';
import { createProduct, updateProduct } from '../api/products';

// PUBLIC_INTERFACE
export default function ProductForm({ product, onCancel, onSaved }) {
  /** Form to add or edit a product */
  const isEdit = useMemo(() => !!(product && (product.id || product._id)), [product]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        category: product.category || '',
        price: product.price ?? '',
        stock: product.stock ?? '',
        description: product.description || '',
      });
    }
  }, [product]);

  const updateField = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const validate = () => {
    if (!form.name || String(form.name).trim().length === 0) {
      return 'Name is required';
    }
    const price = Number(form.price);
    if (Number.isNaN(price) || price < 0) {
      return 'Price must be a positive number';
    }
    const stock = Number(form.stock);
    if (!Number.isFinite(stock) || stock < 0) {
      return 'Stock must be a positive integer';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name.trim(),
        category: form.category.trim() || undefined,
        price: Number(form.price),
        stock: Number(form.stock),
        description: form.description.trim() || undefined,
      };
      if (isEdit) {
        await updateProduct(product.id || product._id, payload);
      } else {
        await createProduct(payload);
      }
      onSaved && onSaved();
    } catch (e) {
      setError(e.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{isEdit ? 'Edit Product' : 'Add Product'}</h2>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-error">{error}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label className="label">Name</label>
              <input
                className="input"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Product name"
                required
              />
            </div>
            <div className="form-field">
              <label className="label">Category</label>
              <input
                className="input"
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                placeholder="Category"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="label">Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="input"
                value={form.price}
                onChange={(e) => updateField('price', e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="form-field">
              <label className="label">Stock</label>
              <input
                type="number"
                min="0"
                step="1"
                className="input"
                value={form.stock}
                onChange={(e) => updateField('stock', e.target.value)}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field full">
              <label className="label">Description</label>
              <textarea
                className="input textarea"
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Optional notes..."
                rows={4}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-text" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
