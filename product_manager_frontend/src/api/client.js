/**
 * Lightweight REST client with base utilities for JSON APIs.
 * No env is required yet; update BASE_URL when backend URL is known.
 */
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// PUBLIC_INTERFACE
export async function httpGet(path, opts = {}) {
  /** Perform a GET request */
  const res = await fetch(buildUrl(path, opts.query), {
    method: 'GET',
    headers: { ...DEFAULT_HEADERS, ...(opts.headers || {}) },
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function httpPost(path, body, opts = {}) {
  /** Perform a POST request */
  const res = await fetch(buildUrl(path, opts.query), {
    method: 'POST',
    headers: { ...DEFAULT_HEADERS, ...(opts.headers || {}) },
    body: JSON.stringify(body ?? {}),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function httpPut(path, body, opts = {}) {
  /** Perform a PUT request */
  const res = await fetch(buildUrl(path, opts.query), {
    method: 'PUT',
    headers: { ...DEFAULT_HEADERS, ...(opts.headers || {}) },
    body: JSON.stringify(body ?? {}),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function httpDelete(path, opts = {}) {
  /** Perform a DELETE request */
  const res = await fetch(buildUrl(path, opts.query), {
    method: 'DELETE',
    headers: { ...DEFAULT_HEADERS, ...(opts.headers || {}) },
  });
  return handleResponse(res);
}

function buildUrl(path, query) {
  const base = getBaseUrl().replace(/\/+$/, '');
  const cleanPath = String(path || '').replace(/^\/+/, '');
  const url = new URL(`${base}/${cleanPath}`);
  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).length > 0) {
        url.searchParams.set(k, String(v));
      }
    });
  }
  return url.toString();
}

function getBaseUrl() {
  // Adjust BASE_URL to your backend; for now assumes same origin proxy or absolute paths.
  // For local dev, you may set up CRA proxy or replace with http://localhost:4000
  const BASE_URL = '';
  return BASE_URL || '';
}

async function handleResponse(res) {
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || res.statusText;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}
