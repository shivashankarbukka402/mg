import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/axios';

export default function Checkout() {
  const { cartItems, totalAmount, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!address.trim()) return alert('Please enter a delivery address');
    setPlacing(true);
    try {
      const items = cartItems.map((item) => ({
        medicine: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
      await api.post('/orders', { items, totalAmount, deliveryAddress: address });
      clearCart();
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-xl font-semibold mb-4">Checkout</h1>
      <label className="block text-sm font-medium mb-1">Delivery Address</label>
      <textarea
        className="w-full border rounded px-3 py-2 text-sm mb-4"
        rows={3}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter full delivery address"
      />
      <div className="flex justify-between font-semibold mb-4">
        <span>Total Payable</span>
        <span>₹{totalAmount}</span>
      </div>
      <button
        onClick={placeOrder}
        disabled={placing}
        className="w-full bg-primary text-white py-2.5 rounded font-medium hover:bg-primary-dark disabled:opacity-50"
      >
        {placing ? 'Placing Order...' : 'PLACE ORDER (Cash on Delivery)'}
      </button>
    </div>
  );
}
