import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const categories = ['Pain Relief', 'Vitamins & Supplements', 'Antibiotics', 'Diabetes Care', 'Heart Care', 'Digestive Care', 'Skin Care', 'Baby Care'];

export default function Medicines() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [medicines, setMedicines] = useState([]);
  const [sort, setSort] = useState('popularity');
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (sort) params.set('sort', sort);
    api.get(`/medicines?${params.toString()}`).then((res) => setMedicines(res.data.medicines)).catch(() => {});
  }, [category, search, sort]);

  const toggleCategory = (cat) => {
    setSearchParams(cat === category ? {} : { category: cat });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      <aside className="w-56 shrink-0">
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2 mb-6">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={category === cat} onChange={() => toggleCategory(cat)} />
              {cat}
            </label>
          ))}
        </div>
        <h3 className="font-semibold mb-3">Sort By</h3>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm">
          <option value="popularity">Popularity</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </aside>

      <main className="flex-1">
        <h1 className="text-xl font-semibold mb-4">All Medicines</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {medicines.map((med) => (
            <ProductCard key={med._id} medicine={med} />
          ))}
        </div>
        {medicines.length === 0 && <p className="text-gray-400 mt-10 text-center">No medicines found.</p>}
      </main>
    </div>
  );
}
