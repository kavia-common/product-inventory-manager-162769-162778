# Product Manager Frontend

Modern, minimalistic React dashboard to manage products:
- List, search, and filter products
- Add new products
- Edit product details
- Delete products

Colors:
- Primary: #1e88e5
- Secondary: #3949ab
- Accent: #43a047
- Theme: Light

Routing:
- Internal state routing (no external router) with sidebar navigation:
  - Products (list/search/filter)
  - Add Product
  - Edit Product (via list action)

API
- Assumed REST endpoints:
  - GET    /api/products            -> list with optional ?q=&category=&minPrice=&maxPrice=
  - POST   /api/products            -> create { name, category?, price, stock, description? }
  - PUT    /api/products/:id        -> update
  - DELETE /api/products/:id        -> delete
- Configure proxy or set base URL in src/api/client.js if backend runs on another port/origin.

Local development
- npm start to run the app
- Optionally add "proxy": "http://localhost:4000" in package.json to forward /api calls to backend.
