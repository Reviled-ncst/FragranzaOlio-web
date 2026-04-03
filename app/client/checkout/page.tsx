'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCartSummary, clearCart } from '@/app/lib/cartService';
import {
  getAddresses,
  addAddress,
  getDefaultAddress,
  createOrder,
  type Address,
} from '@/app/lib/addressService';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState(getCartSummary());
  const [addresses, setAddresses] = useState<Address[]>(getAddresses());
  const [selectedShippingId, setSelectedShippingId] = useState<string | null>(
    getDefaultAddress()?.id || null
  );
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formStep, setFormStep] = useState<'shipping' | 'billing'>('shipping');
  const [processing, setProcessing] = useState(false);

  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });

  const shippingAddress = addresses.find((a) => a.id === selectedShippingId);
  const billingAddress = useSameAddress ? shippingAddress : null;

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const added = addAddress({
      ...newAddress,
      isDefault: addresses.length === 0,
    });
    setAddresses([...addresses, added]);
    setSelectedShippingId(added.id);
    setShowAddressForm(false);
    setNewAddress({
      fullName: '',
      phone: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
    });
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress || (!useSameAddress && !billingAddress)) {
      alert('Please select/add addresses');
      return;
    }

    setProcessing(true);
    try {
      const order = createOrder(
        cart.items,
        shippingAddress,
        billingAddress || shippingAddress,
        cart.total
      );
      clearCart();
      router.push(`/client/orders/${order.id}`);
    } catch (error) {
      alert('Error placing order');
      setProcessing(false);
    }
  };

  const tax = cart.total * 0.1;
  const shipping = 0;
  const total = cart.total + tax + shipping;

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-gray-400">Complete your purchase</p>
        </motion.div>

        {cart.items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 mb-6">Your cart is empty</p>
            <button
              onClick={() => router.push('/fragranza/products')}
              className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg"
            >
              Continue Shopping
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900/50 to-black/50"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Shipping Address</h2>

                {addresses.length > 0 && !showAddressForm && (
                  <div className="space-y-4 mb-6">
                    {addresses.map((addr) => (
                      <motion.label
                        key={addr.id}
                        className="flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all"
                        whileHover={{ borderColor: 'rgba(255, 215, 0, 0.5)' }}
                        style={{
                          borderColor:
                            selectedShippingId === addr.id
                              ? 'rgba(255, 215, 0, 0.5)'
                              : 'rgba(255, 215, 0, 0.2)',
                          backgroundColor:
                            selectedShippingId === addr.id
                              ? 'rgba(255, 215, 0, 0.05)'
                              : 'transparent',
                        }}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={addr.id}
                          checked={selectedShippingId === addr.id}
                          onChange={(e) => setSelectedShippingId(e.target.value)}
                          className="mt-1 w-5 h-5"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-white">{addr.fullName}</p>
                          <p className="text-sm text-gray-400">{addr.street}</p>
                          <p className="text-sm text-gray-400">
                            {addr.city}, {addr.state} {addr.zipCode}
                          </p>
                          <p className="text-sm text-gray-400">{addr.phone}</p>
                        </div>
                        {addr.isDefault && (
                          <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">
                            Default
                          </span>
                        )}
                      </motion.label>
                    ))}
                  </div>
                )}

                {showAddressForm ? (
                  <form onSubmit={handleAddAddress} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        required
                        className="col-span-2 px-4 py-2 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={newAddress.email}
                        onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
                        required
                        className="px-4 py-2 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        required
                        className="px-4 py-2 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60"
                      />
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        required
                        className="col-span-2 px-4 py-2 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        required
                        className="px-4 py-2 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        required
                        className="px-4 py-2 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60"
                      />
                      <input
                        type="text"
                        placeholder="Zip Code"
                        value={newAddress.zipCode}
                        onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                        required
                        className="px-4 py-2 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60"
                      />
                      <select
                        value={newAddress.country}
                        onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                        className="px-4 py-2 bg-white/5 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500/60"
                      >
                        <option>USA</option>
                        <option>Canada</option>
                        <option>UK</option>
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="flex-1 py-2 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/10"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="w-full py-3 border-2 border-dashed border-yellow-500/30 text-yellow-400 rounded-lg hover:border-yellow-500/60 transition-all font-semibold"
                  >
                    + Add New Address
                  </button>
                )}
              </motion.div>

              {/* Billing Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900/50 to-black/50"
              >
                <h2 className="text-2xl font-bold text-white mb-4">Billing Address</h2>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={useSameAddress}
                    onChange={(e) => setUseSameAddress(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-300">Same as shipping address</span>
                </label>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 h-fit"
            >
              <div className="p-8 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-slate-900/50 to-black/50">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                <div className="space-y-3 max-h-64 overflow-y-auto mb-6 pb-6 border-b border-yellow-500/20">
                  {cart.items.map((item) => (
                    <div key={`${item.productId}-${item.variation.oil}`} className="text-sm text-gray-400">
                      <div className="flex justify-between">
                        <span>{item.productName}</span>
                        <span className="text-white">${(item.variation.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {item.variation.oil}% × {item.variation.volume} × {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-yellow-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-yellow-500/20">
                    <span className="font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-yellow-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  onClick={handlePlaceOrder}
                  disabled={!shippingAddress || processing}
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-yellow-200 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold rounded-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {processing ? 'Processing...' : 'Place Order'}
                </motion.button>

                <button
                  onClick={() => router.push('/client/cart')}
                  className="w-full mt-3 py-2 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/10 transition-all"
                >
                  Back to Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
