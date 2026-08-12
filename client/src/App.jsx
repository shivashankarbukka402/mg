import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Medicines from './pages/Medicines';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/medicines/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}
