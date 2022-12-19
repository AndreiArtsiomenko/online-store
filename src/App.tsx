import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CartPage from './pages/CartPage/CartPage';
import ProductPage from './pages/ProductPage/ProductPage';
import NoFoundPage from './pages/NoFoundPage/NoFoundPage';
import MainLayout from './layouts/MainLayout/MainLayout';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NoFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
