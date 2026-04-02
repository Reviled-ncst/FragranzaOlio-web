'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { getProductsByGender, filterProducts, type Product } from '@/app/lib/productData';

export default function ClientShopPage() {
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all');
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [cart, setCart] = useState<Map<string, number>>(new Map());

  // Get products based on gender filter
  const products = useMemo(() => {
    const baseProducts = selectedGender === 'all'
      ? getProductsByGender('all')
      : getProductsByGender(selectedGender);

    return filterProducts(baseProducts, {
      notes: selectedNotes.length > 0 ? selectedNotes : undefined,
    });
  }, [selectedGender, selectedNotes]);

  // Extract unique notes for filter buttons
  const allNotes = useMemo(() => {
    const notes = new Set<string>();
    getProductsByGender('all').forEach(product => {
      product.notes.forEach(note => notes.add(note));
    });
    return Array.from(notes).sort();
  }, []);

  const toggleNote = (note: string) => {
    setSelectedNotes(prev =>
      prev.includes(note)
        ? prev.filter(n => n !== note)
        : [...prev, note]
    );
  };

  const addToCart = (productId: string) => {
    const newCart = new Map(cart);
    newCart.set(productId, (newCart.get(productId) || 0) + 1);
    setCart(newCart);
  };

  const cartCount = Array.from(cart.values()).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Premium Fragrance Collection</h2>
          <p className="text-gray-400">Discover our exclusive selection of {products.length} fragrances</p>
        </div>
        {cartCount > 0 && (
          <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
            Cart: {cartCount} items
          </div>
        )}
      </div>

      {/* Gender Filter */}
      <div className="flex gap-3 flex-wrap">
        {(['all', 'men', 'women'] as const).map(gender => (
          <motion.button
            key={gender}
            onClick={() => setSelectedGender(gender)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedGender === gender
                ? 'bg-yellow-500 text-black'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {gender === 'all' ? 'All Fragrances' : gender.charAt(0).toUpperCase() + gender.slice(1) + "'s"}
          </motion.button>
        ))}
      </div>

      {/* Notes Filter */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Filter by Notes</h3>
        <div className="flex gap-2 flex-wrap">
          {allNotes.map(note => (
            <motion.button
              key={note}
              onClick={() => toggleNote(note)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedNotes.includes(note)
                  ? 'bg-yellow-500/80 text-black font-semibold'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {note}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              layoutId={product.id}
              className="group rounded-lg overflow-hidden bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/60 transition-all cursor-pointer flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
            >
              {/* Image Container */}
              <div className="relative w-full h-56 bg-slate-800 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Gender Badge */}
                <div className="absolute top-2 right-2 bg-yellow-500/80 text-black px-2 py-1 rounded text-xs font-semibold">
                  {product.gender === 'men' ? 'Men' : 'Women'}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                <p className="text-xs text-gray-400 mb-2 line-clamp-2">{product.description}</p>

                {/* Notes */}
                <div className="flex gap-1 flex-wrap mb-3">
                  {product.notes.slice(0, 2).map(note => (
                    <span key={note} className="text-xs bg-slate-700/50 text-gray-300 px-2 py-0.5 rounded">
                      {note}
                    </span>
                  ))}
                </div>

                {/* Intensity */}
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-xs text-gray-400">Intensity:</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < product.intensity ? 'bg-yellow-500' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-yellow-500/20">
                  <span className="text-lg font-bold text-yellow-400">{product.price}</span>
                  <motion.button
                    onClick={() => addToCart(product.id)}
                    className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded text-sm transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {products.length === 0 && (
        <motion.div
          className="p-12 rounded-lg bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">No fragrances match your filters</h3>
          <p className="text-gray-400">Try adjusting your preferences to find more options</p>
        </motion.div>
      )}

      {/* Shopping Cart Notice */}
      {cartCount > 0 && (
        <motion.div
          className="p-6 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">✓ {cartCount} item{cartCount !== 1 ? 's' : ''} added to cart</h3>
          <p className="text-gray-400 mb-3">Full e-commerce checkout will be available soon</p>
          <motion.button
            onClick={() => setCart(new Map())}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Cart
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
