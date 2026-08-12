import { useEffect, useState } from 'react';
import api from '../api/axios';

const statusColor = {
  Processing: 'text-orange-500',
  Shipped: 'text-blue-500',
  Delivered: 'text-green-600',
  Cancelled: 'text-red-500',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api.get('/orders/my').then((res) => setOrders(res.data)).catch(() => {});
  }, []);

  const filtered = filter === 'All' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">My Orders</h1>
      <div className="flex gap-4 border-b mb-4 text-sm">
        {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`pb-2 ${filter === tab ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-sm">Order #{order._id.slice(-8).toUpperCase()}</p>
              <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()} • {order.items.length} items</p>
            </div>
            <p className="font-semibold">₹{order.totalAmount}</p>
            <p className={`text-sm font-medium ${statusColor[order.status]}`}>{order.status}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-400 text-center py-10">No orders found.</p>}
      </div>
    </div>
  );
}
