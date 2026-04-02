'use client';

import { motion } from 'framer-motion';

export default function OrdersPage() {
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-11-20',
      items: 'Notte Stellata x1, Garden Rose x1',
      total: '$164.00',
      status: 'Delivered',
      statusColor: 'green',
    },
    {
      id: 'ORD-002',
      date: '2024-11-15',
      items: 'Oud Magnifico x2',
      total: '$258.00',
      status: 'Shipped',
      statusColor: 'blue',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">My Orders</h2>
        <p className="text-gray-400">View your purchase history and order status</p>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/60 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{order.id}</h3>
                  <p className="text-sm text-gray-400">Ordered on {order.date}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    order.statusColor === 'green'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-400 mb-4">{order.items}</p>

              <div className="flex items-center justify-between pt-4 border-t border-yellow-500/10">
                <span className="text-gray-400">Total</span>
                <span className="text-2xl font-bold text-yellow-400">{order.total}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="p-12 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-400 mb-4">No orders yet</p>
          <p className="text-sm text-gray-500">Start shopping to place your first order</p>
        </motion.div>
      )}
    </motion.div>
  );
}
