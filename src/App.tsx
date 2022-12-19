import { Routes, Route} from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import CartPage from './pages/CartPage/CartPage';
import ProductPage from './pages/ProductPage/ProductPage';
import NoFoundPage from './pages/NoFoundPage/NoFoundPage';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/product' element={<ProductPage />} />
      <Route path='*' element={<NoFoundPage />} />
    </Routes>
    </>
  );
}

export default App;
