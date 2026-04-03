'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCartSummary, removeFromCart, updateQuantity, clearCart, type Cart } from '@/app/lib/cartService';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const summary = getCartSummary();
    setCart(summary);
    setLoading(false);
  }, []);

  const handleRemoveItem = (productId: string, variation: any) => {
    removeFromCart(productId, variation);
    const updatedCart = getCartSummary();
    setCart(updatedCart);
  };

  const handleUpdateQuantity = (productId: string, variation: any, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId, variation);
    } else {
      updateQuantity(productId, variation, newQuantity);
      const updatedCart = getCartSummary();
      setCart(updatedCart);
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
      setCart({ items: [], total: 0, itemCount: 0 });
    }
  };

  const handleCheckout = () => {
    router.push('/client/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-gray-400">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
          <p className="text-gray-400">{cart?.itemCount || 0} items in your cart</p>
        </motion.div>

        {cart && cart.items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {cart.items.map((item, idx) => (
                  <motion.div
                    key={`${item.productId}-${item.variation.oil}-${item.variation.volume}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 p-6 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900/50 to-black/50 hover:border-yellow-500/50 transition-all"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-white mb-1">{item.productName}</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {item.variation.oil}% Oil • {item.variation.volume}
                      </p>
                      <p className="text-yellow-400 font-semibold">${item.variation.price}/unit</p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="flex items-center border border-yellow-500/30 rounded-lg">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.productId, item.variation, item.quantity - 1)
                          }
                          className="px-3 py-1 text-gray-400 hover:text-yellow-300 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-white font-semibold min-w-[50px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.productId, item.variation, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-400 hover:text-yellow-300 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="text-right">
                        <p className="text-yellow-400 font-bold text-lg">
                          ${(item.variation.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.productId, item.variation)}
                          className="text-xs text-red-400 hover:text-red-300 mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Continue Shopping */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Link
                  href="/fragranza/products"
                  className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 h-fit"
            >
              <div className="p-8 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900/50 to-black/50">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-yellow-500/20">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-yellow-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax (estimated)</span>
                    <span>${(cart.total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-3xl font-bold text-yellow-400">
                    ${(cart.total * 1.1).toFixed(2)}
                  </span>
                </div>

                <motion.button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-bold rounded-lg transition-all mb-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>

                <motion.button
                  onClick={handleClear}
                  className="w-full py-2 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 font-semibold rounded-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear Cart
                </motion.button>

                {/* Info */}
                <div className="mt-6 pt-6 border-t border-yellow-500/20 space-y-2 text-xs text-gray-400">
                  <div className="flex gap-2">
                    <svg className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>30-day satisfaction guarantee</span>
                  </div>
                  <div className="flex gap-2">
                    <svg className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Free standard shipping</span>
                  </div>
                  <div className="flex gap-2">
                    <svg className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-yellow-500/20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Your cart is empty</h3>
            <p className="text-gray-400 mb-8">Start shopping to add fragrance to your cart</p>
            <Link
              href="/fragranza/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-bold rounded-lg transition-all"
            >
              Shop Now
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
