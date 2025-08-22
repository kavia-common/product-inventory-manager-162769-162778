# Backend Proxy Setup (Optional)

If your backend runs on another origin/port (e.g., http://localhost:4000), you can let Create React App proxy API calls during development.

1) In product_manager_frontend/package.json, add this property at the root level:
{
  "proxy": "http://localhost:4000"
}

2) Ensure your frontend uses relative API paths like /api/products (this project does).

Alternatively, set the base URL in src/api/client.js if you prefer explicit absolute URLs.
