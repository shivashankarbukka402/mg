import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center gap-6 px-4 py-3">
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-2xl font-bold text-primary">MedStore</span>
          <span className="text-xs text-gray-500">Your Health, Our Priority</span>
        </Link>

        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search for medicines and healthcare products..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate(`/medicines?search=${e.target.value}`);
            }}
          />
        </div>

        <nav className="flex items-center gap-5 text-sm text-gray-700">
          {user ? (
            <>
              <Link to="/orders" className="hover:text-primary">My Orders</Link>
              <button onClick={logout} className="hover:text-primary">Logout ({user.name})</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-primary">Login / Register</Link>
          )}
          <Link to="/cart" className="relative hover:text-primary">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
      <div className="bg-primary-light border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-sm py-2 text-gray-700">
          <Link to="/medicines" className="hover:text-primary font-medium">Medicines</Link>
          <Link to="/" className="hover:text-primary">Lab Tests</Link>
          <Link to="/" className="hover:text-primary">Healthcare</Link>
          <Link to="/" className="hover:text-primary">Wellness</Link>
        </div>
      </div>
    </header>
  );
}
