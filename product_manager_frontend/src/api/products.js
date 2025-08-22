/**
 * PUBLIC_INTERFACE
 * Product API module for CRUD operations against REST endpoints.
 * Endpoints assumed:
 *  GET    /api/products           -> list products, supports ?q= and other filters
 *  POST   /api/products           -> create product
 *  GET    /api/products/:id       -> get single product
 *  PUT    /api/products/:id       -> update product
 *  DELETE /api/products/:id       -> delete product
 */
import { httpGet, httpPost, httpPut, httpDelete } from './client.js';

// PUBLIC_INTERFACE
export function listProducts(params = {}) {
  /** List products with optional query params like q, category, minPrice, maxPrice */
  return httpGet('/api/products', { query: params });
}

// PUBLIC_INTERFACE
export function createProduct(payload) {
  /** Create a new product */
  return httpPost('/api/products', payload);
}

// PUBLIC_INTERFACE
export function updateProduct(id, payload) {
  /** Update product by id */
  return httpPut(`/api/products/${encodeURIComponent(id)}`, payload);
}

// PUBLIC_INTERFACE
export function deleteProduct(id) {
  /** Delete product by id */
  return httpDelete(`/api/products/${encodeURIComponent(id)}`);
}

// PUBLIC_INTERFACE
export function getProduct(id) {
  /** Fetch single product by id */
  return httpGet(`/api/products/${encodeURIComponent(id)}`);
}
