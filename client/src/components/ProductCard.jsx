import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ medicine }) {
  const { addToCart } = useCart();

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col bg-white hover:shadow-md transition-shadow">
      <Link to={`/medicines/${medicine._id}`}>
        <div className="h-32 bg-gray-50 rounded flex items-center justify-center mb-3 overflow-hidden">
          {medicine.image ? (
            <img src={medicine.image} alt={medicine.name} className="h-full object-contain" />
          ) : (
            <span className="text-gray-300 text-sm">No image</span>
          )}
        </div>
        <h3 className="font-medium text-gray-800 text-sm">{medicine.name}</h3>
        <p className="text-xs text-gray-400">{medicine.category}</p>
      </Link>
      <p className="font-semibold text-gray-900 mt-1">₹{medicine.price}</p>
      <button
        onClick={() => addToCart(medicine, 1)}
        className="mt-2 border border-primary text-primary text-sm font-medium rounded py-1.5 hover:bg-primary hover:text-white transition-colors"
      >
        ADD TO CART
      </button>
    </div>
  );
}
