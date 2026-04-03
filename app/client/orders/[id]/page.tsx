'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getOrder, type Order } from '@/app/lib/addressService';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getOrder(params.id);
    setOrder(found);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-400">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-6">
        <p className="text-gray-400 text-lg">Order not found</p>
        <Link
          href="/client/orders"
          className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
          whileHover={{ x: -4 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Orders
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Order {order.id}</h1>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-1">Order Placed</p>
              <p className="text-white font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className={`px-6 py-3 rounded-lg border font-semibold capitalize ${
              order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
              order.status === 'processing' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
              order.status === 'shipped' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
              'bg-green-500/20 text-green-300 border-green-500/30'
            }`}>
              {order.status}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900/50 to-black/50"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 p-4 rounded-lg border border-yellow-500/10 bg-white/2"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white">{item.productName}</p>
                      <p className="text-sm text-gray-400">
                        {item.variation.oil}% Oil × {item.variation.volume}
                      </p>
                      <p className="text-yellow-400 font-semibold mt-1">${item.variation.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm mb-1">Qty</p>
                      <p className="text-white font-bold text-lg">{item.quantity}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900/50 to-black/50"
            >
              <h3 className="text-xl font-bold text-white mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>${(order.total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-yellow-400">Free</span>
                </div>
                <div className="border-t border-yellow-500/20 pt-3 flex justify-between">
                  <span className="font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold text-yellow-400">${(order.total * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900/50 to-black/50"
            >
              <h3 className="text-lg font-bold text-white mb-3">Shipping Address</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <p className="font-semibold">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className="text-gray-400 mt-2">{order.shippingAddress.phone}</p>
              </div>
            </motion.div>

            {order.trackingNumber && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-black/50"
              >
                <h3 className="text-lg font-bold text-white mb-2">Tracking</h3>
                <p className="font-mono text-yellow-400 text-sm break-all">{order.trackingNumber}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
