import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import ProductTable from '../components/ProductTable';
import { listProducts, deleteProduct } from '../api/products';

// PUBLIC_INTERFACE
export default function ProductList({ onAdd, onEdit }) {
  /** Product listing page with search and filters */
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const params = useMemo(() => {
    const q = { ...(filters || {}) };
    if (query) q.q = query;
    return q;
  }, [filters, query]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listProducts(params);
      setItems(Array.isArray(data) ? data : data?.items || []);
    } catch (e) {
      setError(e.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (product) => {
    if (!product) return;
    const name = product.name || 'this product';
    const ok = window.confirm(`Delete ${name}?`);
    if (!ok) return;
    try {
      await deleteProduct(product.id || product._id);
      await fetchData();
    } catch (e) {
      alert(e.message || 'Failed to delete');
    }
  };

  return (
    <div className="card">
      <div className="card-header row-space">
        <div className="row">
          <SearchBar onSearch={setQuery} />
        </div>
        <div className="row">
          <button className="btn btn-accent" onClick={onAdd}>Add Product</button>
        </div>
      </div>

      <div className="card-body">
        <Filters onChange={setFilters} />

        {error && <div className="alert alert-error">{error}</div>}
        {loading ? (
          <div className="loading">Loading products…</div>
        ) : (
          <ProductTable products={items} onEdit={onEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
