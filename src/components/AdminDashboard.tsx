import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(); // Connects to the same server

export const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState('');

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));

    socket.on('new_order', (order) => {
      setOrders(prev => [order, ...prev]);
    });

    return () => {
      socket.off('new_order');
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/chat/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
    });
    const data = await res.json();
    if (data.authenticated) setAuthenticated(true);
    else alert('Invalid PIN');
  };

  if (!authenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <form onSubmit={handleLogin} className="p-8 bg-gray-800 rounded">
          <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter Admin PIN" className="text-black p-2 rounded mb-2 w-full" />
          <button type="submit" className="w-full bg-blue-500 p-2 rounded">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Real-time Order Feed</h1>
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order._id} className="p-4 bg-gray-800 rounded shadow">
            <p className="font-bold">{order.name} ({order.email})</p>
            <p className="text-sm text-gray-400">{order.projectType}</p>
            <p className="mt-2">{order.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
