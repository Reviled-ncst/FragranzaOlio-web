'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOrders, type Order } from '@/app/lib/addressService';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedOrders = getOrders();
    setOrders(fetchedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  }, []);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'shipped':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'delivered':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-400">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Your Orders</h1>
          <p className="text-gray-400">View and track your purchases</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl font-bold text-white mb-2">No orders yet</h3>
            <p className="text-gray-400 mb-8">Start shopping to place your first order</p>
            <Link
              href="/fragranza/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-300 text-black font-bold rounded-lg"
            >
              Shop Now
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {orders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={`/client/orders/${order.id}`}>
                  <div className="p-6 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900/50 to-black/50 hover:border-yellow-500/50 cursor-pointer group">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Order ID</p>
                        <p className="font-mono text-white text-sm">{order.id}</p>
                      </div>
                      <div className="px-4 py-2 rounded-lg border bg-yellow-500/20 text-yellow-300 border-yellow-500/30 font-semibold text-sm capitalize">
                        {order.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-1 uppercase">Order Date</p>
                        <p className="text-white font-semibold">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1 uppercase">Items</p>
                        <p className="text-white font-semibold">{order.items.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1 uppercase">Total</p>
                        <p className="text-yellow-400 font-bold">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1 uppercase">Shipping</p>
                        <p className="text-white font-semibold">
                          {order.shippingAddress.city}, {order.shippingAddress.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
