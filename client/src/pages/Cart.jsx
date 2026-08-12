import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalAmount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const deliveryCharge = totalAmount > 500 || totalAmount === 0 ? 0 : 40;
  const toPay = totalAmount + deliveryCharge;

  const handleCheckout = () => {
    if (!user) return navigate('/login');
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-400">
        Your cart is empty. <Link to="/medicines" className="text-primary underline">Browse medicines</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-xl font-semibold mb-4">My Cart ({cartItems.length} Items)</h1>
        <table className="w-full text-sm">
          <thead className="text-left text-gray-400 border-b">
            <tr>
              <th className="py-2">Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-3">{item.name}</td>
                <td>₹{item.price}</td>
                <td>
                  <div className="flex items-center border rounded w-fit">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2">-</button>
                    <span className="px-3">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2">+</button>
                  </div>
                </td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 text-xs">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border rounded-lg p-5 h-fit">
        <h3 className="font-semibold mb-3">Price Details</h3>
        <div className="text-sm space-y-2">
          <div className="flex justify-between"><span>Total MRP</span><span>₹{totalAmount}</span></div>
          <div className="flex justify-between"><span>Delivery Charges</span><span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span></div>
          <div className="flex justify-between font-semibold border-t pt-2"><span>To be Paid</span><span>₹{toPay}</span></div>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full mt-4 bg-primary text-white py-2.5 rounded font-medium hover:bg-primary-dark"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
}
