import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const categories = ['Pain Relief', 'Vitamins & Supplements', 'Antibiotics', 'Diabetes Care', 'Baby Care', 'Personal Care'];

export default function Home() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    api.get('/medicines?limit=6&sort=popularity').then((res) => setPopular(res.data.medicines)).catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-primary-light rounded-xl p-10 flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">Your Health,<br />Our Priority</h1>
          <p className="text-gray-600 mt-3 max-w-md">Order medicines and healthcare products from the comfort of your home.</p>
          <Link to="/medicines" className="inline-block mt-5 bg-primary text-white px-6 py-2.5 rounded-md font-medium hover:bg-primary-dark">
            Order Now
          </Link>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-10">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/medicines?category=${encodeURIComponent(cat)}`}
            className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow bg-white"
          >
            <div className="h-16 bg-gray-50 rounded mb-2"></div>
            <p className="text-sm font-medium">{cat}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Popular Medicines</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {popular.map((med) => (
          <ProductCard key={med._id} medicine={med} />
        ))}
      </div>
    </div>
  );
}
