'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { SearchIcon, FilterIcon } from '../components/Icons/SocialIcons';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const products = [
    { id: 1, name: 'Notte Stellata', price: '$85', category: 'All Fragrances', notes: 'Woody', intensity: 'Strong' },
    { id: 2, name: 'Oud Magnifico', price: '$120', category: 'All Fragrances', notes: 'Woody', intensity: 'Intense' },
    { id: 3, name: 'Rose Garden', price: '$75', category: 'All Fragrances', notes: 'Floral', intensity: 'Moderate' },
    { id: 4, name: 'Citrus Bliss', price: '$65', category: 'New Arrivals', notes: 'Fresh', intensity: 'Light' },
    { id: 5, name: 'Vanilla Elegance', price: '$80', category: 'Best Sellers', notes: 'Oriental', intensity: 'Moderate' },
    { id: 6, name: 'Lavender Dreams', price: '$70', category: 'All Fragrances', notes: 'Floral', intensity: 'Soft' },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedFilter === 'all' || p.category === selectedFilter)
  );

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
            Our <span className="text-yellow-400">Fragrances</span>
          </h1>
          <p className="text-gray-400 text-lg">Discover our exquisite collection of premium artisanal perfumes</p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Search */}
          <div className="relative">
            <SearchIcon size={20} color="#d4af37" className="absolute left-3 top-3.5 text-yellow-500" />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/60"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <FilterIcon size={20} color="#d4af37" className="absolute left-3 top-3.5 text-yellow-500" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-yellow-500/30 rounded-lg text-white focus:outline-none focus:border-yellow-500/60 appearance-none"
            >
              <option value="all">All Products</option>
              <option value="All Fragrances">All Fragrances</option>
              <option value="Best Sellers">Best Sellers</option>
              <option value="New Arrivals">New Arrivals</option>
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              className="group rounded-2xl bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-black/50 border border-yellow-500/20 p-6 hover:border-yellow-500/50 transition-all overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10 }}
            >
              {/* Product Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-yellow-500/20 to-amber-500/10 rounded-xl mb-6 flex items-center justify-center group-hover:from-yellow-500/30 group-hover:to-amber-500/20 transition-all">
                <svg
                  className="w-20 h-20 text-yellow-500/50 group-hover:text-yellow-500/70 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>

              {/* Product Details */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{product.name}</h3>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-400">
                  <span className="text-yellow-400 font-medium">Notes:</span> {product.notes}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="text-yellow-400 font-medium">Intensity:</span> {product.intensity}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-yellow-500/20">
                <span className="text-2xl font-bold text-yellow-400">{product.price}</span>
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-lg text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400 text-lg">No products found. Try adjusting your search.</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
