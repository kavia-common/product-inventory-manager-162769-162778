import React, { useMemo, useState } from 'react';
import './App.css';
import './styles/theme.css';
import './styles/layout.css';
import './styles/components.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';

/**
 * PUBLIC_INTERFACE
 * App is the main entry rendering a responsive dashboard layout.
 * It provides navigation between product list and product form views and sets theme variables.
 */
function App() {
  const [route, setRoute] = useState('products'); // 'products' | 'add' | 'edit'
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = (nextRoute, state = {}) => {
    if (nextRoute === 'edit') {
      setEditingProduct(state.product || null);
    } else {
      setEditingProduct(null);
    }
    setRoute(nextRoute);
  };

  const content = useMemo(() => {
    switch (route) {
      case 'add':
        return (
          <ProductForm
            onCancel={() => navigate('products')}
            onSaved={() => navigate('products')}
          />
        );
      case 'edit':
        return (
          <ProductForm
            product={editingProduct}
            onCancel={() => navigate('products')}
            onSaved={() => navigate('products')}
          />
        );
      case 'products':
      default:
        return (
          <ProductList
            onAdd={() => navigate('add')}
            onEdit={(p) => navigate('edit', { product: p })}
          />
        );
    }
  }, [route, editingProduct]);

  return (
    <div className="app-shell" data-theme="light">
      <Sidebar
        onNavigate={(r) => navigate(r)}
        active={route}
      />
      <div className="main-area">
        <Topbar
          title={route === 'products' ? 'Products' : route === 'add' ? 'Add Product' : 'Edit Product'}
          primaryAction={
            route !== 'products'
              ? { label: 'Back to Products', onClick: () => navigate('products') }
              : null
          }
        />
        <main className="content">{content}</main>
        <footer className="footer">Product Manager • Minimal React UI</footer>
      </div>
    </div>
  );
}

export default App;
