'use client';

import { motion } from 'framer-motion';

export default function ClientShopPage() {
  const products = [
    { id: 1, name: 'Notte Stellata', price: '$89', notes: 'Floral, Woody', image: '🌠' },
    { id: 2, name: 'Oud Magnifico', price: '$129', notes: 'Oriental, Amber', image: '🌙' },
    { id: 3, name: 'Garden Rose', price: '$75', notes: 'Floral', image: '🌹' },
    { id: 4, name: 'Fresh Citrus', price: '$65', notes: 'Fresh, Zesty', image: '🍊' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to Our Shop</h2>
        <p className="text-gray-400">Discover our exclusive collection of premium fragrances</p>
      </div>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/60 transition-all cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="text-5xl mb-4 text-center">{product.image}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{product.notes}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-yellow-400">{product.price}</span>
              <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded text-sm transition-all">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Coming Soon */}
      <motion.div
        className="p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-2">Shopping Cart Coming Soon</h3>
        <p className="text-gray-400">Full e-commerce functionality will be available soon</p>
      </motion.div>
    </motion.div>
  );
}
