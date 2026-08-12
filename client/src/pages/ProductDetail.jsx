import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/medicines/${id}`).then((res) => setMedicine(res.data)).catch(() => {});
  }, [id]);

  if (!medicine) return <div className="max-w-7xl mx-auto px-4 py-10">Loading...</div>;

  const discount = medicine.mrp > medicine.price
    ? Math.round(((medicine.mrp - medicine.price) / medicine.mrp) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 flex gap-8">
        <div className="w-64 h-64 bg-gray-50 rounded flex items-center justify-center shrink-0">
          {medicine.image ? (
            <img src={medicine.image} alt={medicine.name} className="h-full object-contain" />
          ) : (
            <span className="text-gray-300">No image</span>
          )}
        </div>
        <div>
          <p className="text-xs text-gray-400">{medicine.category}</p>
          <h1 className="text-2xl font-semibold mt-1">{medicine.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold">₹{medicine.price}</span>
            {medicine.mrp > medicine.price && (
              <>
                <span className="line-through text-gray-400">₹{medicine.mrp}</span>
                <span className="text-green-600 text-sm font-medium">{discount}% OFF</span>
              </>
            )}
          </div>
          <p className="text-gray-600 mt-4 text-sm max-w-lg">{medicine.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border rounded">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1.5">-</button>
              <span className="px-4">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1.5">+</button>
            </div>
            <button
              onClick={() => addToCart(medicine, qty)}
              className="bg-primary text-white px-6 py-2 rounded font-medium hover:bg-primary-dark"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-5 h-fit">
        <h3 className="font-semibold mb-3">Delivery Details</h3>
        <ul className="text-sm text-gray-600 space-y-1.5">
          <li>✓ Top Brand</li>
          <li>✓ Genuine Products</li>
          <li>✓ Secure Payments</li>
          <li>✓ Easy Returns</li>
        </ul>
      </div>
    </div>
  );
}
